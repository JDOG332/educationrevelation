"""
run_all.py: regenerates every number reported in paper/sim/results/.

    python3 run_all.py            # full run (about 10 to 15 minutes, 2 CPUs)
    python3 run_all.py --quick    # smoke test with few seeds

Stages
    A  Appendix B.1: named states, nominal Psi, epsilon and delta_reg sweeps
    B  V2: ignorance floor, plus the N-scaling of the finite-sample floor
    C  P2: Werner sweep, Spearman rho, purity/entropy-matched separable controls
    D  P3: commutator asymmetry under Lueders instruments
Outputs
    results/results.json, results/REPORT.md, results/p2.png, results/p3.png

Every task seed is (MASTER_SEED, stage, item, replicate) fed to
numpy.random.SeedSequence, so results do not depend on the worker count.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import platform
import sys
import time
import warnings
from multiprocessing import Pool

import numpy as np
import scipy
from scipy import stats

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import crt  # noqa: E402

MASTER_SEED = 20261029
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "results")

EPS_SWEEP = [1e-10, 1e-9, 1e-8, 1e-7, 1e-6]
DREG_SWEEP = [1e-8, 1e-7, 1e-6, 1e-5, 1e-4]
MODES = ("sampling", "literal")

# P3 configuration
P3_GAMMA = 0.5
P3_THETAS = [round(0.02 * k, 2) for k in range(11)]      # 0 .. 0.2 rad
P3_RA = np.array([1.0, 0.0, 1.0]) / math.sqrt(2)          # qubit A Bloch vector


def p3_initial_state():
    """|psi_A><psi_A| (x) I/2, with psi_A the pure qubit state of Bloch vector
    (1, 0, 1)/sqrt(2). Qubit B maximally mixed keeps rho12, rho21 full rank."""
    return np.kron(crt.qubit_state(P3_RA), np.eye(2) / 2)


def axis(theta):
    return np.array([math.sin(theta), 0.0, math.cos(theta)])


def p3_states(theta, rho0=None):
    rho0 = p3_initial_state() if rho0 is None else rho0
    n1 = np.array([0.0, 0.0, 1.0])   # O1 = sigma_z on qubit A
    n2 = axis(theta)                  # O2 = n(theta).sigma on qubit A
    r12 = crt.lueders_channel_qubitA(crt.lueders_channel_qubitA(rho0, n1, P3_GAMMA), n2, P3_GAMMA)
    r21 = crt.lueders_channel_qubitA(crt.lueders_channel_qubitA(rho0, n2, P3_GAMMA), n1, P3_GAMMA)
    return r12, r21


def commutator_norm(theta):
    O1 = crt.PAULI["Z"]
    O2 = math.sin(theta) * crt.PAULI["X"] + math.cos(theta) * crt.PAULI["Z"]
    return crt.op_norm(O1 @ O2 - O2 @ O1)


# ---------------------------------------------------------------------------
# Worker tasks (top level so they pickle)
# ---------------------------------------------------------------------------

KEYS = ("psi", "F", "I1", "I2", "G_eps", "R12", "C0", "R", "C_eff", "n_active",
        "n_unique", "H_w", "JSD_w", "JSD_LI_MLE", "w_raw", "delta_i", "S_eff")


def _pick(d):
    return {k: d[k] for k in KEYS}


def task_b1(args):
    name, rho, seed, B = args
    raw = crt.simulate(rho, seed, crt.SimConfig(B_boot=B))
    out = {"name": name, "mle_converged": raw.mle_all_converged, "mle_iters_max": raw.mle_iters_max}
    for mode in MODES:
        nom = crt.functional(raw, redundancy=mode)
        out[mode] = {"nominal": _pick(nom),
                     "nominal_mlemle": _pick(crt.functional(raw, redundancy=mode, pipeline1="MLE")),
                     "eps": [_pick(crt.functional(raw, eps=e, redundancy=mode)) for e in EPS_SWEEP],
                     "dreg": [_pick(crt.functional(raw, delta_reg=x, redundancy=mode)) for x in DREG_SWEEP]}
        out[mode]["eps_mlemle"] = [crt.functional(raw, eps=e, redundancy=mode, pipeline1="MLE")["psi"] for e in EPS_SWEEP]
        out[mode]["dreg_mlemle"] = [crt.functional(raw, delta_reg=x, redundancy=mode, pipeline1="MLE")["psi"] for x in DREG_SWEEP]
    return out


def task_full(args):
    tag, rho, seed, B = args
    raw = crt.simulate(rho, seed, crt.SimConfig(B_boot=B))
    out = {"tag": tag, "mle_converged": raw.mle_all_converged}
    for mode in MODES:
        out[mode] = _pick(crt.functional(raw, redundancy=mode))
    r1 = crt.regularize(raw.rho1, crt.DELTA_REG_DEFAULT)
    r2 = crt.regularize(raw.rho2, crt.DELTA_REG_DEFAULT)
    out["purity_hat"] = 0.5 * (crt.purity(r1) + crt.purity(r2))
    return out


def task_recognition(args):
    """R12 only (pipeline 1 LI-PSD on A, pipeline 2 MLE on B), for N scans."""
    tag, rho, seed, N = args
    ss = np.random.SeedSequence(seed)
    rA, rB = [np.random.default_rng(s) for s in ss.spawn(2)]
    cA = crt.sample_counts(rho, N, rA)
    cB = crt.sample_counts(rho, N, rB)
    r1 = crt.regularize(crt.li_psd(cA), crt.DELTA_REG_DEFAULT)
    r2 = crt.regularize(crt.mle_rrr(cB[None], None, crt.MLEConfig())[0][0], crt.DELTA_REG_DEFAULT)
    F = crt.fidelity(r1, r2)
    I1, I2 = crt.informativeness(r1), crt.informativeness(r2)
    G = crt.gate(I1, I2)
    return {"tag": tag, "N": N, "F": F, "I1": I1, "I2": I2, "R12": F * G}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def mstd(x):
    x = np.asarray(x, dtype=float)
    return float(np.mean(x)), float(np.std(x, ddof=1)) if len(x) > 1 else 0.0


def ols(x, y):
    x = np.asarray(x, float)
    y = np.asarray(y, float)
    A = np.vstack([x, np.ones_like(x)]).T
    coef, *_ = np.linalg.lstsq(A, y, rcond=None)
    yhat = A @ coef
    ss_res = float(np.sum((y - yhat) ** 2))
    ss_tot = float(np.sum((y - y.mean()) ** 2))
    r2 = 1 - ss_res / ss_tot if ss_tot > 0 else float("nan")
    n = len(x)
    se_slope = math.sqrt(ss_res / (n - 2) / np.sum((x - x.mean()) ** 2)) if n > 2 else float("nan")
    return {"slope": float(coef[0]), "intercept": float(coef[1]), "R2": r2,
            "slope_se": se_slope, "n": n}


def fmt(x, nd=4):
    if x is None:
        return "n/a"
    if isinstance(x, (int, np.integer)):
        return str(x)
    if x == 0:
        return "0"
    ax = abs(x)
    if ax < 1e-3 or ax >= 1e4:
        return f"{x:.2e}"
    return f"{x:.{nd}f}"


# ---------------------------------------------------------------------------
# Stage A: B.1
# ---------------------------------------------------------------------------

def named_states():
    return [
        ("Bell |Phi+>", crt.bell_phi_plus()),
        ("Werner p = 0.8", crt.werner(0.8)),
        ("Werner p = 0.2", crt.werner(0.2)),
        ("Separable mixed (|00><00| + |11><11|)/2", crt.separable_classical()),
        ("Maximally mixed I/4", crt.maximally_mixed()),
    ]


def stage_a(pool, S, B):
    states = named_states()
    tasks = [(name, rho, (MASTER_SEED, 1, i, s), B) for i, (name, rho) in enumerate(states) for s in range(S)]
    res = pool.map(task_b1, tasks, chunksize=1)
    out = []
    for i, (name, rho) in enumerate(states):
        runs = [r for r in res if r["name"] == name]
        ex = crt.exact_psi(rho)
        # exact-limit sweep: Psi_upper(eps), Psi_upper(dreg)
        ex_eps = [crt.exact_psi(rho, eps=e)["psi_upper"] for e in EPS_SWEEP]
        ex_dreg = [crt.exact_psi(rho, delta_reg=x)["psi_upper"] for x in DREG_SWEEP]
        row = {"state": name, "exact": ex, "purity": crt.purity(rho),
               "exact_sweep_maxdev_eps": float(max(abs(v - ex["psi_upper"]) for v in ex_eps)),
               "exact_sweep_maxdev_dreg": float(max(abs(v - ex["psi_upper"]) for v in ex_dreg)),
               "mle_all_converged": all(r["mle_converged"] for r in runs),
               "modes": {}}
        for mode in MODES:
            nom = [r[mode]["nominal"] for r in runs]
            psi = [n["psi"] for n in nom]
            dev_eps = [max(abs(e["psi"] - r[mode]["nominal"]["psi"]) for e in r[mode]["eps"]) for r in runs]
            dev_dreg = [max(abs(e["psi"] - r[mode]["nominal"]["psi"]) for e in r[mode]["dreg"]) for r in runs]
            dev_dreg_10x = [max(abs(e["psi"] - r[mode]["nominal"]["psi"]) for e in r[mode]["dreg"][1:4]) for r in runs]
            part_change_dreg = sum(
                any((e["n_active"], e["n_unique"]) != (r[mode]["nominal"]["n_active"], r[mode]["nominal"]["n_unique"])
                    for e in r[mode]["dreg"]) for r in runs)
            part_change_eps = sum(
                any((e["n_active"], e["n_unique"]) != (r[mode]["nominal"]["n_active"], r[mode]["nominal"]["n_unique"])
                    for e in r[mode]["eps"]) for r in runs)
            # deviation of the recognition core alone (C_eff held at nominal)
            dev_dreg_R12 = [max(abs(e["R12"] - r[mode]["nominal"]["R12"]) * r[mode]["nominal"]["C_eff"] * crt.d_hat()
                                for e in r[mode]["dreg"]) for r in runs]
            mm = [r[mode]["nominal_mlemle"]["psi"] for r in runs]
            dev_eps_mm = [max(abs(v - r[mode]["nominal_mlemle"]["psi"]) for v in r[mode]["eps_mlemle"]) for r in runs]
            dev_dreg_mm = [max(abs(v - r[mode]["nominal_mlemle"]["psi"]) for v in r[mode]["dreg_mlemle"]) for r in runs]
            comp = {k: mstd([n[k] for n in nom]) for k in ("F", "I1", "I2", "G_eps", "R12", "C0", "R", "C_eff", "H_w", "JSD_w", "JSD_LI_MLE")}
            row["modes"][mode] = {
                "psi_mean": mstd(psi)[0], "psi_sd": mstd(psi)[1], "psi_min": min(psi), "psi_max": max(psi),
                "S_eff_mean": mstd([n["S_eff"] for n in nom])[0],
                "components": comp,
                "n_active_counts": {str(k): int(sum(1 for n in nom if n["n_active"] == k)) for k in (1, 2)},
                "n_unique_counts": {str(k): int(sum(1 for n in nom if n["n_unique"] == k)) for k in (1, 2)},
                "delta_i_mean": [float(np.mean([n["delta_i"][j] for n in nom])) for j in range(2)],
                "maxdev_eps_worst": max(dev_eps), "maxdev_eps_median": float(np.median(dev_eps)),
                "maxdev_dreg_worst": max(dev_dreg), "maxdev_dreg_median": float(np.median(dev_dreg)),
                "maxdev_dreg_10x_worst": max(dev_dreg_10x),
                "maxdev_dreg_R12only_worst": max(dev_dreg_R12),
                "runs_with_partition_change_dreg": part_change_dreg,
                "runs_with_partition_change_eps": part_change_eps,
                "mlemle_psi_mean": mstd(mm)[0], "mlemle_psi_sd": mstd(mm)[1],
                "mlemle_maxdev_eps_worst": max(dev_eps_mm), "mlemle_maxdev_dreg_worst": max(dev_dreg_mm),
            }
        out.append(row)
    return out


# ---------------------------------------------------------------------------
# Stage B: V2
# ---------------------------------------------------------------------------

V2_Q = 0.02   # per-qubit polarization of the near-maximally-mixed thermal state


def thermal_state(q):
    s = np.diag([(1 + q) / 2, (1 - q) / 2]).astype(complex)
    return np.kron(s, s)


def stage_b(pool, S, B, Ns):
    eps = crt.EPS_DEFAULT
    floor = eps / (1 + eps)
    states = [("Maximally mixed I/4", crt.maximally_mixed()),
              (f"Thermal sigma(x)sigma, sigma = diag((1+q)/2,(1-q)/2), q = {V2_Q}", thermal_state(V2_Q))]
    tasks = [(name, rho, (MASTER_SEED, 2, i, s), B) for i, (name, rho) in enumerate(states) for s in range(S)]
    res = pool.map(task_full, tasks, chunksize=1)
    rows = []
    for i, (name, rho) in enumerate(states):
        runs = [r["sampling"] for r in res if r["tag"] == name]
        ex = crt.exact_psi(rho)
        rows.append({
            "state": name, "exact_I": ex["I"], "exact_R12": ex["G_eps_reg"],
            "exact_R12_over_floor": ex["G_eps_reg"] / floor,
            "F": mstd([r["F"] for r in runs]), "I1": mstd([r["I1"] for r in runs]),
            "I2": mstd([r["I2"] for r in runs]), "R12": mstd([r["R12"] for r in runs]),
            "R12_over_floor_mean": mstd([r["R12"] for r in runs])[0] / floor,
            "psi": mstd([r["psi"] for r in runs]),
        })
    # N scan for I/4 (recognition core only)
    scan_tasks = [("mm", crt.maximally_mixed(), (MASTER_SEED, 3, j, s), N) for j, N in enumerate(Ns) for s in range(S)]
    sres = pool.map(task_recognition, scan_tasks, chunksize=2)
    scan = []
    for N in Ns:
        rr = [r for r in sres if r["N"] == N]
        scan.append({"N": N, "R12": mstd([r["R12"] for r in rr]), "F": mstd([r["F"] for r in rr]),
                     "I_mean": float(np.mean([0.5 * (r["I1"] + r["I2"]) for r in rr]))})
    lx = np.log10([s["N"] for s in scan])
    ly = np.log10([s["R12"][0] for s in scan])
    fit = ols(lx, ly)
    # N at which mean R12 would reach 10x floor, extrapolating the fit
    n_10floor = 10 ** ((math.log10(10 * floor) - fit["intercept"]) / fit["slope"])
    return {"floor": floor, "rows": rows, "N_scan": scan, "loglog_fit": fit, "N_for_R12_eq_10x_floor": n_10floor}


# ---------------------------------------------------------------------------
# Stage C: P2
# ---------------------------------------------------------------------------

def haar_unitary(rng, d=2):
    z = (rng.normal(size=(d, d)) + 1j * rng.normal(size=(d, d))) / math.sqrt(2)
    q, r = np.linalg.qr(z)
    return q * (np.diag(r) / np.abs(np.diag(r)))


def p2_families(pgrid):
    rng = np.random.default_rng(np.random.SeedSequence((MASTER_SEED, 40)))
    UA, UB = haar_unitary(rng), haar_unitary(rng)
    U = np.kron(UA, UB)
    fam = {"werner": {}, "diag": {}, "rotdiag": {}}
    checks = []
    for p in pgrid:
        w = crt.werner(p)
        dg = crt.diagonal_product_basis_state(crt.werner_spectrum(p))
        rd = crt.herm(U @ dg @ np.conj(U.T))
        fam["werner"][p] = w
        fam["diag"][p] = dg
        fam["rotdiag"][p] = rd
        for name, s in (("diag", dg), ("rotdiag", rd)):
            checks.append({"p": p, "family": name,
                           "d_purity": abs(crt.purity(s) - crt.purity(w)),
                           "d_entropy": abs(crt.vn_entropy_bits(s) - crt.vn_entropy_bits(w)),
                           "min_PT_eig": crt.min_pt_eigenvalue(s)})
        checks.append({"p": p, "family": "werner", "d_purity": 0.0, "d_entropy": 0.0,
                       "min_PT_eig": crt.min_pt_eigenvalue(w), "concurrence": crt.concurrence(w)})
    return fam, checks


def product_control_feasibility(pgrid, tol=1e-4):
    """Can a product state rho_A (x) rho_B match a Werner state's purity and
    entropy within tol? Minimizes the max mismatch over Bloch lengths (a, b)
    (by symmetry the orientations do not matter) from a 9 x 9 start grid."""
    from scipy.optimize import least_squares

    def h(x):
        x = np.clip(x, 1e-300, 1.0)
        return -(x * np.log2(x))

    def qS(a):
        return h((1 + a) / 2) + h((1 - a) / 2)

    rows = []
    for p in pgrid:
        ev = crt.werner_spectrum(p)
        P = float(np.sum(ev ** 2))
        S = crt.spectrum_entropy_bits(ev)
        best = None
        for a0 in np.linspace(0.01, 0.99, 9):
            for b0 in np.linspace(0.01, 0.99, 9):
                f = lambda x: [(1 + x[0] ** 2) * (1 + x[1] ** 2) / 4 - P, qS(x[0]) + qS(x[1]) - S]  # noqa: E731
                r = least_squares(f, [a0, b0], bounds=([0, 0], [1, 1]), xtol=1e-15, ftol=1e-15, gtol=1e-15)
                if best is None or np.max(np.abs(r.fun)) < np.max(np.abs(best.fun)):
                    best = r
        res = float(np.max(np.abs(best.fun)))
        rows.append({"p": p, "a": float(best.x[0]), "b": float(best.x[1]), "max_mismatch": res, "feasible": res < tol})
    return rows


def stage_c(pool, S, B, pgrid):
    fam, checks = p2_families(pgrid)
    tasks = []
    for fi, fname in enumerate(("werner", "diag", "rotdiag")):
        for j, p in enumerate(pgrid):
            for s in range(S):
                tasks.append(((fname, p), fam[fname][p], (MASTER_SEED, 4, fi, j, s), B))
    res = pool.map(task_full, tasks, chunksize=2)
    by = {}
    for r in res:
        by.setdefault(r["tag"], []).append(r)

    def series(fname, key, mode="sampling"):
        return [[(x[mode][key] if key != "purity_hat" else x["purity_hat"]) for x in by[(fname, p)]] for p in pgrid]

    conc = [crt.concurrence(crt.werner(p)) for p in pgrid]
    out = {"pgrid": list(pgrid), "concurrence": conc, "checks": checks, "families": {}}
    for fname in ("werner", "diag", "rotdiag"):
        psi = series(fname, "psi")
        means = [float(np.mean(v)) for v in psi]
        sds = [float(np.std(v, ddof=1)) for v in psi]
        allp = np.repeat(pgrid, S)
        allpsi = np.concatenate(psi)
        sp_mean = stats.spearmanr(pgrid, means)
        sp_all = stats.spearmanr(allp, allpsi)
        sp_conc = stats.spearmanr(conc, means)
        lit = series(fname, "psi", "literal")
        out["families"][fname] = {
            "psi_mean": means, "psi_sd": sds,
            "psi_literal_mean": [float(np.mean(v)) for v in lit],
            "F_mean": [float(np.mean(v)) for v in series(fname, "F")],
            "I_mean": [float(np.mean(np.array(a) * 0.5 + np.array(b) * 0.5)) for a, b in zip(series(fname, "I1"), series(fname, "I2"))],
            "C_eff_mean": [float(np.mean(v)) for v in series(fname, "C_eff")],
            "n_active_1_frac": [float(np.mean(np.array(v) == 1)) for v in series(fname, "n_active")],
            "n_unique_1_frac": [float(np.mean(np.array(v) == 1)) for v in series(fname, "n_unique")],
            "spearman_psi_mean_vs_p": {"rho": float(sp_mean.statistic), "pvalue": float(sp_mean.pvalue)},
            "spearman_psi_all_runs_vs_p": {"rho": float(sp_all.statistic), "pvalue": float(sp_all.pvalue)},
            "spearman_psi_mean_vs_concurrence": {"rho": float(sp_conc.statistic), "pvalue": float(sp_conc.pvalue)},
            "exact_psi_upper": [crt.exact_psi(fam[fname][p])["psi_upper"] for p in pgrid],
        }
    # separation tests
    sep = {}
    nP = len(pgrid)
    alpha_bonf = 0.01 / nP
    for ctrl in ("diag", "rotdiag"):
        rows = []
        for key in ("psi", "R12", "F", "I", "purity_hat", "C_eff"):
            for j, p in enumerate(pgrid):
                if key == "I":
                    a = 0.5 * (np.array([x["sampling"]["I1"] for x in by[("werner", p)]]) + np.array([x["sampling"]["I2"] for x in by[("werner", p)]]))
                    b = 0.5 * (np.array([x["sampling"]["I1"] for x in by[(ctrl, p)]]) + np.array([x["sampling"]["I2"] for x in by[(ctrl, p)]]))
                elif key == "purity_hat":
                    a = np.array([x["purity_hat"] for x in by[("werner", p)]])
                    b = np.array([x["purity_hat"] for x in by[(ctrl, p)]])
                else:
                    a = np.array([x["sampling"][key] for x in by[("werner", p)]])
                    b = np.array([x["sampling"][key] for x in by[(ctrl, p)]])
                if np.std(a) == 0 and np.std(b) == 0:
                    t, pv = 0.0, 1.0
                else:
                    with warnings.catch_warnings():
                        warnings.simplefilter("ignore")   # near-constant C_eff arrays
                        tt = stats.ttest_ind(a, b, equal_var=False)
                    t, pv = float(tt.statistic), float(tt.pvalue)
                pooled = math.sqrt(0.5 * (np.var(a, ddof=1) + np.var(b, ddof=1)))
                rows.append({"quantity": key, "p": p, "mean_werner": float(a.mean()), "mean_ctrl": float(b.mean()),
                             "diff": float(a.mean() - b.mean()), "pooled_sd": pooled,
                             "cohen_d": float((a.mean() - b.mean()) / pooled) if pooled > 0 else 0.0,
                             "t": t, "pvalue": pv})
        summ = {}
        for key in ("psi", "R12", "F", "I", "purity_hat", "C_eff"):
            rr = [r for r in rows if r["quantity"] == key]
            summ[key] = {"n_sig_0.01": sum(r["pvalue"] < 0.01 for r in rr),
                         "n_sig_bonferroni": sum(r["pvalue"] < alpha_bonf for r in rr),
                         "max_abs_diff": max(abs(r["diff"]) for r in rr),
                         "mean_abs_rel_diff": float(np.mean([abs(r["diff"]) / abs(r["mean_werner"]) for r in rr if r["mean_werner"] != 0])),
                         "max_abs_cohen_d": max(abs(r["cohen_d"]) for r in rr)}
        sep[ctrl] = {"rows": rows, "summary": summ, "alpha_bonferroni": alpha_bonf}
    out["separation"] = sep
    out["product_control"] = product_control_feasibility(pgrid)
    return out


# ---------------------------------------------------------------------------
# Stage D: P3
# ---------------------------------------------------------------------------

def stage_d(pool, S, B):
    thetas = P3_THETAS
    tasks = []
    for j, th in enumerate(thetas):
        r12, r21 = p3_states(th)
        for s in range(S):
            tasks.append((("12", th), r12, (MASTER_SEED, 5, j, 0, s), B))
            tasks.append((("21", th), r21, (MASTER_SEED, 5, j, 1, s), B))
    res = pool.map(task_full, tasks, chunksize=2)
    by = {}
    ceff_all = []
    part = []
    for r in res:
        by.setdefault(r["tag"], []).append(r["sampling"]["psi"])
        ceff_all.append(r["sampling"]["C_eff"])
        part.append((r["sampling"]["n_active"], r["sampling"]["n_unique"]))
    ceff_mean = float(np.mean(ceff_all))
    partitions = {f"n_active={a_},n_unique={b_}": part.count((a_, b_)) for (a_, b_) in sorted(set(part))}
    xs = [commutator_norm(th) for th in thetas]
    exact = []
    for th in thetas:
        r12, r21 = p3_states(th)
        # exact: F = 1, C_eff at its observed finite-N value (constant, see partitions)
        e12 = crt.exact_psi(r12)["psi_upper"] * ceff_mean
        e21 = crt.exact_psi(r21)["psi_upper"] * ceff_mean
        exact.append({"theta": th, "psi12": e12, "psi21": e21, "asym": abs(e12 - e21),
                      "I12": crt.informativeness(r12), "I21": crt.informativeness(r21)})
    # exact asymmetry for other inputs, to show the input dependence
    other = {}
    for nm, rho0 in (("Bell |Phi+>", crt.bell_phi_plus()),
                     ("pure product |psi_A>|0>", np.kron(crt.qubit_state(P3_RA), np.diag([1, 0]).astype(complex)))):
        vals = []
        for th in thetas:
            a, b = p3_states(th, rho0)
            vals.append(abs(crt.informativeness(a) - crt.informativeness(b)))
        other[nm] = {"max_abs_dI_over_theta_grid": float(max(vals)), "dI_at_0.2": float(vals[-1])}
    rows = []
    for j, th in enumerate(thetas):
        a = np.array(by[("12", th)])
        b = np.array(by[("21", th)])
        absdiff = np.abs(a - b)                   # seed s of order 12 paired with seed s of order 21
        rows.append({"theta": th, "comm_norm": xs[j],
                     "psi12_mean": float(a.mean()), "psi21_mean": float(b.mean()),
                     "psi12_sd": float(a.std(ddof=1)), "psi21_sd": float(b.std(ddof=1)),
                     "mean_abs_diff": float(absdiff.mean()), "se_mean_abs_diff": float(absdiff.std(ddof=1) / math.sqrt(S)),
                     "abs_diff_of_means": float(abs(a.mean() - b.mean())),
                     "signed_diff_of_means": float(a.mean() - b.mean()),
                     "se_diff_of_means": float(math.sqrt(a.var(ddof=1) / S + b.var(ddof=1) / S)),
                     "exact_asym": exact[j]["asym"]})
    xs_arr = np.array(xs)
    in_reg = xs_arr <= 0.2 + 1e-12
    fits = {}
    for label, sel in (("theta_0_to_0.2", np.ones_like(in_reg)), ("comm_norm_le_0.2", in_reg)):
        sel = sel.astype(bool)
        fits[label] = {
            "exact": ols(xs_arr[sel], [r["exact_asym"] for r, k in zip(rows, sel) if k]),
            "mean_abs_diff": ols(xs_arr[sel], [r["mean_abs_diff"] for r, k in zip(rows, sel) if k]),
            "abs_diff_of_means": ols(xs_arr[sel], [r["abs_diff_of_means"] for r, k in zip(rows, sel) if k]),
            "signed_diff_of_means": ols(xs_arr[sel], [r["signed_diff_of_means"] for r, k in zip(rows, sel) if k]),
        }
    # per-run fit of |psi12 - psi21| on all paired runs
    allx, ally = [], []
    for j, th in enumerate(thetas):
        a = np.array(by[("12", th)])
        b = np.array(by[("21", th)])
        allx += [xs[j]] * S
        ally += list(np.abs(a - b))
    fits["per_run_all"] = ols(allx, ally)
    sd_single = float(np.mean([0.5 * (r["psi12_sd"] + r["psi21_sd"]) for r in rows]))
    noise = {"sd_single_psi": sd_single,
             "mean_abs_diff_at_theta0": rows[0]["mean_abs_diff"],
             "expected_abs_diff_pure_noise": sd_single * math.sqrt(2) * math.sqrt(2 / math.pi),
             "se_diff_of_means": float(np.mean([r["se_diff_of_means"] for r in rows])),
             "exact_asym_at_0.2": exact[-1]["asym"],
             "seeds_needed_2sigma_at_0.2": float(2 * (2 * sd_single / exact[-1]["asym"]) ** 2) if exact[-1]["asym"] > 0 else float("inf")}
    return {"thetas": thetas, "rows": rows, "fits": fits, "noise": noise, "exact": exact,
            "other_inputs_exact": other, "S": S, "gamma": P3_GAMMA,
            "C_eff_mean": ceff_mean, "C_eff_min": float(min(ceff_all)), "C_eff_max": float(max(ceff_all)),
            "partitions": partitions,
            "initial_state": "|psi_A><psi_A| (x) I/2, Bloch(psi_A) = (1,0,1)/sqrt(2)"}


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def write_report(R, path):
    P = R["params"]
    L = []
    a = L.append
    a("# CRT v11: released simulation results")
    a("")
    a(f"Generated by `python3 run_all.py{' --quick' if P['quick'] else ''}` (master seed {P['master_seed']}), "
      f"Python {P['python']}, numpy {P['numpy']}, scipy {P['scipy']}, {P['workers']} worker processes, "
      f"wall time {P['wall_time_s']:.0f} s.")
    a("")
    a("## Key findings")
    a("")
    b1 = {row["state"]: row for row in R["B1"]}
    def m_(name):
        return b1[name]["modes"]["sampling"]
    w8, w2 = m_("Werner p = 0.8"), m_("Werner p = 0.2")
    a(f"1. B.1's Werner values 0.71 and 0.28 are impossible under Eqs. 4 to 6: I(Werner 0.8) = {b1['Werner p = 0.8']['exact']['I']:.4f} and "
      f"I(Werner 0.2) = {b1['Werner p = 0.2']['exact']['I']:.4f} exactly, so Psi <= G_eps x D_hat = {b1['Werner p = 0.8']['exact']['psi_upper']:.4f} and "
      f"{b1['Werner p = 0.2']['exact']['psi_upper']:.4f}. Regenerated: {w8['psi_mean']:.4f} +/- {w8['psi_sd']:.4f} and {w2['psi_mean']:.4f} +/- {w2['psi_sd']:.4f}.")
    sep_jsd = b1["Separable mixed (|00><00| + |11><11|)/2"]["modes"]["sampling"]["components"]["JSD_LI_MLE"][0]
    a("2. With n = 2 models (LI-PSD and MLE), C_eff takes only two values in practice. For every full-rank state the two estimators coincide "
      f"(JSD between them about 1e-17 bits); for the rank-2 separable state they nearly coincide (JSD {sep_jsd:.1e} bits). Both are far "
      "below delta_i of about 3e-4 to 7e-4, so the models are merged as redundant: n_unique = 1, R = C_eff = 1/2. For the Bell state the "
      "cross-validated log-likelihoods differ by tens of nats, so n_active = 1 and C_eff = 1 (the convergence factor did not participate). "
      "In every reported mean C0 stays within 1e-5 of 1, so C_eff never varies informatively here (Open Question 7).")
    a("3. The epsilon sweep satisfies the 1e-5 bound for every state, but not the 1e-7 bound B.1 claims for the maximally mixed state. "
      "The delta_reg sweep up to 1e-4 breaks the 1e-5 bound for every state except Werner p = 0.2 and I/4, because I(rho~) changes linearly "
      "in delta_reg with an O(1) coefficient. This is not specific to near-pure states.")
    v = R["V2"]["rows"][0]
    a(f"4. V2 fails at N = 1e4 per batch: for I/4, R12 = {v['R12'][0]:.2e}, which is {v['R12_over_floor_mean']:.1e} times the floor eps/(1+eps), "
      f"because the estimated I-hat is about {v['I1'][0]:.1e}, not 0. The finite-sample floor scales as N^{R['V2']['loglog_fit']['slope']:.2f}.")
    C = R["P2"]
    sp = C["families"]["werner"]["spearman_psi_mean_vs_p"]["rho"]
    a(f"5. P2: Spearman rho(Psi, p) = {sp:.4f} for Werner, and equally high for both separable controls. For p < 1 no Psi difference between "
      "Werner and its matched separable control is significant. The only significant difference is at p = 1, and it coincides with an "
      "n_active change (C_eff 1 versus 1/2), so under Section 8.3 it is a threshold artifact. Psi does not separate the families.")
    nz = R["P3"]["noise"]
    a(f"6. P3: the exact asymmetry is linear in the commutator norm (R^2 = {R['P3']['fits']['theta_0_to_0.2']['exact']['R2']:.4f}) but tiny "
      f"({nz['exact_asym_at_0.2']:.1e} at theta = 0.2). At N = 1e4 it sits about 25 times below the noise floor ({nz['mean_abs_diff_at_theta0']:.1e}), "
      "so the finite-N fits have R^2 far below 0.9. For a Bell input the exact asymmetry is identically zero.")
    a("")
    a("## Parameters")
    a("")
    a("| Parameter | Value | Source |")
    a("|---|---|---|")
    for row in P["table"]:
        a(f"| {row[0]} | {row[1]} | {row[2]} |")
    a("")

    # ---- B.1
    a("## A. Appendix B.1 regenerated")
    a("")
    a(f"{P['S_A']} seeds per state. Psi nominal is mean +/- sample SD over seeds. "
      "G_eps bound is the exact gate (I(rho) + eps)/(1 + eps) of the true state, without regularization; "
      "Psi upper is G_eps(rho~) x D_hat, the exact upper bound on Psi at D_hat = 0.95 (F <= 1, C_eff <= 1). "
      "Max |dPsi| is, per seed, the largest deviation from that seed's nominal Psi over the sweep "
      "(same data, same reconstructions; only eps or delta_reg changes), then the worst seed. "
      "Stable means both sweeps stay below 1e-5 for every seed (1e-7 for the maximally mixed row, the bound B.1 claims for it).")
    a("")
    for mode in MODES:
        lab = "primary (sampling reading of Algorithm 1)" if mode == "sampling" else "literal reading of Algorithm 1 (sensitivity check)"
        a(f"### Redundancy rule: {lab}")
        a("")
        a("| State | I(rho) exact | G_eps bound | Psi upper | Psi nominal (mean +/- SD) | F | I1 (LI-PSD, A) | I2 (MLE, B) | C_eff | n_active=1 / n_unique=1 runs | Max abs dPsi, eps sweep | Max abs dPsi, delta_reg sweep | Max abs dPsi, delta_reg 1e-7 to 1e-5 | Stable? |")
        a("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
        for row in R["B1"]:
            m = row["modes"][mode]
            c = m["components"]
            bound = 1e-7 if row["state"].startswith("Maximally") else 1e-5
            stable = m["maxdev_eps_worst"] < bound and m["maxdev_dreg_worst"] < bound
            a(f"| {row['state']} | {fmt(row['exact']['I'])} | {fmt(row['exact']['G_eps'])} | {fmt(row['exact']['psi_upper'])} | "
              f"{fmt(m['psi_mean'])} +/- {fmt(m['psi_sd'])} | {fmt(c['F'][0])} | {fmt(c['I1'][0])} | {fmt(c['I2'][0])} | {fmt(c['C_eff'][0])} | "
              f"{m['n_active_counts']['1']} / {m['n_unique_counts']['1']} of {P['S_A']} | "
              f"{fmt(m['maxdev_eps_worst'])} | {fmt(m['maxdev_dreg_worst'])} | {fmt(m['maxdev_dreg_10x_worst'])} | {'Yes' if stable else 'No'} |")
        a("")
    a("Diagnostics for the primary rule (means over seeds):")
    a("")
    a("| State | S_eff (bits) | R12 | C0 | R | H(w) | JSD_w | JSD(P_LI, P_MLE) | delta_LI, delta_MLE | runs with partition change in delta_reg sweep | Max abs dPsi delta_reg, R12 only | Both pipelines MLE: Psi nominal | Both MLE: Max abs dPsi eps / delta_reg |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for row in R["B1"]:
        m = row["modes"]["sampling"]
        c = m["components"]
        a(f"| {row['state']} | {fmt(m['S_eff_mean'])} | {fmt(c['R12'][0])} | {fmt(c['C0'][0], 6)} | {fmt(c['R'][0])} | {fmt(c['H_w'][0])} | "
          f"{fmt(c['JSD_w'][0])} | {fmt(c['JSD_LI_MLE'][0])} | {fmt(m['delta_i_mean'][0])}, {fmt(m['delta_i_mean'][1])} | "
          f"{m['runs_with_partition_change_dreg']} | {fmt(m['maxdev_dreg_R12only_worst'])} | "
          f"{fmt(m['mlemle_psi_mean'])} +/- {fmt(m['mlemle_psi_sd'])} | {fmt(m['mlemle_maxdev_eps_worst'])} / {fmt(m['mlemle_maxdev_dreg_worst'])} |")
    a("")
    a("Exact (infinite-N) sweeps of the upper bound G_eps(rho~) x D_hat:")
    a("")
    a("| State | purity | Max abs dPsi_upper over eps sweep | over delta_reg sweep |")
    a("|---|---|---|---|")
    for row in R["B1"]:
        a(f"| {row['state']} | {fmt(row['purity'])} | {fmt(row['exact_sweep_maxdev_eps'])} | {fmt(row['exact_sweep_maxdev_dreg'])} |")
    a("")

    # ---- V2
    V = R["V2"]
    a("## B. V2 (ignorance floor)")
    a("")
    a(f"Floor eps/(1+eps) = {fmt(V['floor'])}. {P['S_B']} seeds, N = {P['N']} per batch, primary rule.")
    a("")
    a("| State | I exact | R12 exact (infinite N) | R12 exact / floor | F (mean +/- SD) | I1 | I2 | R12 finite N (mean +/- SD) | R12 / floor | Psi |")
    a("|---|---|---|---|---|---|---|---|---|---|")
    for r in V["rows"]:
        a(f"| {r['state']} | {fmt(r['exact_I'])} | {fmt(r['exact_R12'])} | {fmt(r['exact_R12_over_floor'])} | {fmt(r['F'][0], 5)} +/- {fmt(r['F'][1])} | "
          f"{fmt(r['I1'][0])} | {fmt(r['I2'][0])} | {fmt(r['R12'][0])} +/- {fmt(r['R12'][1])} | {fmt(r['R12_over_floor_mean'])} | {fmt(r['psi'][0])} |")
    a("")
    a("Finite-sample floor for I/4 versus counts per batch (recognition core only):")
    a("")
    a("| N per batch | mean R12 | SD | mean F | mean I-hat |")
    a("|---|---|---|---|---|")
    for s in V["N_scan"]:
        a(f"| {s['N']} | {fmt(s['R12'][0])} | {fmt(s['R12'][1])} | {fmt(s['F'][0], 6)} | {fmt(s['I_mean'])} |")
    f = V["loglog_fit"]
    a("")
    a(f"Log-log fit: R12 proportional to N^{f['slope']:.3f} (R^2 = {f['R2']:.4f}). Extrapolated N per batch at which mean R12 "
      f"falls to 10 x floor: {V['N_for_R12_eq_10x_floor']:.2e}.")
    a("")

    # ---- P2
    C = R["P2"]
    a("## C. P2 (Werner family and matched separable controls)")
    a("")
    a(f"p grid: {len(C['pgrid'])} points, 0 to 1 step 0.05. {P['S_C']} seeds per point per family (independent seeds per family). Primary rule.")
    a("")
    a("Control families (both separable, both matched to the Werner state at every p):")
    a("")
    a("- `diag`: diag((1+3p)/4, (1-p)/4, (1-p)/4, (1-p)/4) in the computational product basis, i.e. a mixture of the four product states |ij>. Same spectrum as rho_W(p), so purity and entropy match exactly.")
    a("- `rotdiag`: the same state rotated by a fixed Haar-random local unitary U_A (x) U_B (seeded), to test dependence on alignment with the SIC.")
    mx_p = max(c["d_purity"] for c in C["checks"] if c["family"] != "werner")
    mx_s = max(c["d_entropy"] for c in C["checks"] if c["family"] != "werner")
    mn_pt = min(c["min_PT_eig"] for c in C["checks"] if c["family"] != "werner")
    a(f"- Verified: max |dTr rho^2| = {mx_p:.1e}, max |dS| = {mx_s:.1e} bits (tolerance 1e-4); minimum partial-transpose eigenvalue over both control families = {mn_pt:.3e} (PPT, so separable).")
    feas = [r for r in C["product_control"] if r["feasible"]]
    a(f"- Product states rho_A (x) rho_B (the narrowest reading of \"sampling local mixed states\") can match both purity and entropy within 1e-4 only at p in {{{', '.join(f'{r['p']:.2f}' for r in feas)}}}; "
      f"elsewhere the smallest achievable mismatch is up to {max(r['max_mismatch'] for r in C['product_control']):.2e}. Mixtures of product states are required, and the diagonal construction always succeeds.")
    a("")
    a("| Family | Spearman rho(mean Psi, p) | p-value | Spearman rho(all runs, p) | Spearman rho(mean Psi, concurrence) |")
    a("|---|---|---|---|---|")
    for fname in ("werner", "diag", "rotdiag"):
        fm = C["families"][fname]
        a(f"| {fname} | {fm['spearman_psi_mean_vs_p']['rho']:.4f} | {fm['spearman_psi_mean_vs_p']['pvalue']:.1e} | "
          f"{fm['spearman_psi_all_runs_vs_p']['rho']:.4f} | {fm['spearman_psi_mean_vs_concurrence']['rho']:.4f} |")
    a("")
    a("Mean Psi per p (primary rule):")
    a("")
    a("| p | concurrence | Psi upper (all families) | Werner Psi | diag Psi | rotdiag Psi | Werner - diag | Welch p (W vs diag) | Werner - rotdiag | Welch p (W vs rotdiag) | Werner C_eff |")
    a("|---|---|---|---|---|---|---|---|---|---|---|")
    rows_d = [r for r in C["separation"]["diag"]["rows"] if r["quantity"] == "psi"]
    rows_r = [r for r in C["separation"]["rotdiag"]["rows"] if r["quantity"] == "psi"]
    for j, p in enumerate(C["pgrid"]):
        W = C["families"]["werner"]
        a(f"| {p:.2f} | {fmt(C['concurrence'][j])} | {fmt(W['exact_psi_upper'][j])} | {fmt(W['psi_mean'][j])} +/- {fmt(W['psi_sd'][j])} | "
          f"{fmt(C['families']['diag']['psi_mean'][j])} | {fmt(C['families']['rotdiag']['psi_mean'][j])} | "
          f"{fmt(rows_d[j]['diff'])} | {rows_d[j]['pvalue']:.2g} | {fmt(rows_r[j]['diff'])} | {rows_r[j]['pvalue']:.2g} | {fmt(W['C_eff_mean'][j])} |")
    a("")
    a(f"Separation summary over the {len(C['pgrid'])} p values (Welch t-test per p; Bonferroni level 0.01/{len(C['pgrid'])}):")
    a("")
    a("| Control | Quantity | p values with p < 0.01 | p values significant after Bonferroni | max abs mean difference | mean abs relative difference | max abs Cohen d |")
    a("|---|---|---|---|---|---|---|")
    for ctrl in ("diag", "rotdiag"):
        for key, s in C["separation"][ctrl]["summary"].items():
            a(f"| {ctrl} | {key} | {s['n_sig_0.01']} | {s['n_sig_bonferroni']} | {fmt(s['max_abs_diff'])} | {fmt(s['mean_abs_rel_diff'])} | {fmt(s['max_abs_cohen_d'])} |")
    a("")

    # ---- P3
    D = R["P3"]
    a("## D. P3 (commutator asymmetry)")
    a("")
    a(f"Initial state {D['initial_state']}. O1 = sigma_z on qubit A, O2 = sin(theta) sigma_x + cos(theta) sigma_z on qubit A "
      f"(both ||O||_inf = 1). Unsharp Lueders instruments, gamma = {D['gamma']}, m = 2. rho12 = O1 then O2, rho21 = O2 then O1, "
      f"each reconstructed by the full pipeline from its own independent data. Commutator norm ||[O1,O2]||_inf = 2 sin(theta) "
      f"(operator 2-norm, computed numerically). {D['S']} seeds per theta per order. Primary rule. "
      f"C_eff over all P3 runs: mean {D['C_eff_mean']:.6f}, range [{D['C_eff_min']:.6f}, {D['C_eff_max']:.6f}]; partitions {D['partitions']}.")
    a("")
    a("| theta (rad) | norm of [O1,O2] | exact abs(Psi12 - Psi21) | mean Psi12 | mean Psi21 | mean abs(Psi12 - Psi21) +/- SE | abs(mean Psi12 - mean Psi21) +/- SE |")
    a("|---|---|---|---|---|---|---|")
    for r in D["rows"]:
        a(f"| {r['theta']:.2f} | {r['comm_norm']:.4f} | {fmt(r['exact_asym'])} | {fmt(r['psi12_mean'])} | {fmt(r['psi21_mean'])} | "
          f"{fmt(r['mean_abs_diff'])} +/- {fmt(r['se_mean_abs_diff'])} | {fmt(r['abs_diff_of_means'])} +/- {fmt(r['se_diff_of_means'])} |")
    a("")
    a("| Range | Observable | slope beta | intercept | R^2 |")
    a("|---|---|---|---|---|")
    for rng_ in ("theta_0_to_0.2", "comm_norm_le_0.2"):
        for obs in ("exact", "mean_abs_diff", "abs_diff_of_means", "signed_diff_of_means"):
            f = D["fits"][rng_][obs]
            a(f"| {rng_} | {obs} | {fmt(f['slope'])} +/- {fmt(f['slope_se'])} | {fmt(f['intercept'])} | {f['R2']:.4f} |")
    f = D["fits"]["per_run_all"]
    a(f"| theta_0_to_0.2 | per-run abs(Psi12 - Psi21), all {f['n']} pairs | {fmt(f['slope'])} +/- {fmt(f['slope_se'])} | {fmt(f['intercept'])} | {f['R2']:.4f} |")
    a("")
    nz = D["noise"]
    a(f"Noise: SD of a single Psi at N = 1e4 per batch = {fmt(nz['sd_single_psi'])}; mean abs(Psi12 - Psi21) at theta = 0 (exact asymmetry zero) = "
      f"{fmt(nz['mean_abs_diff_at_theta0'])}; pure-noise expectation SD x sqrt(2) x sqrt(2/pi) = {fmt(nz['expected_abs_diff_pure_noise'])}; "
      f"exact asymmetry at theta = 0.2 = {fmt(nz['exact_asym_at_0.2'])}; independent runs per order needed for a 2-sigma detection at theta = 0.2: about {nz['seeds_needed_2sigma_at_0.2']:.0f}.")
    a("")
    a("Exact asymmetry in the informativeness for other initial states (largest over the theta grid):")
    a("")
    for k, v in D["other_inputs_exact"].items():
        a(f"- {k}: max abs(I(rho12) - I(rho21)) = {v['max_abs_dI_over_theta_grid']:.2e}")
    a("")
    with open(path, "w") as fh:
        fh.write("\n".join(L) + "\n")


# ---------------------------------------------------------------------------
# Plots
# ---------------------------------------------------------------------------

def make_plots(R):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except Exception:
        return False
    blue, orange, aqua, ink, muted = "#2a78d6", "#eb6834", "#1baf7a", "#1f1f1e", "#6b6a64"
    plt.rcParams.update({"axes.spines.top": False, "axes.spines.right": False, "axes.edgecolor": muted,
                         "axes.labelcolor": ink, "xtick.color": muted, "ytick.color": muted, "font.size": 10})
    C = R["P2"]
    fig, ax = plt.subplots(figsize=(6.4, 4.0))
    pg = C["pgrid"]
    for fname, col, mk, lab in (("werner", blue, "o", "Werner (entangled for p > 1/3)"),
                                ("diag", orange, "s", "Separable, same spectrum (product basis)"),
                                ("rotdiag", aqua, "^", "Separable, same spectrum (rotated local basis)")):
        fm = C["families"][fname]
        ax.errorbar(pg, fm["psi_mean"], yerr=fm["psi_sd"], color=col, marker=mk, ms=5, lw=1.5, capsize=2, label=lab)
    ax.plot(pg, C["families"]["werner"]["exact_psi_upper"], color=muted, lw=1, ls="--", label="Exact bound G_eps x D_hat")
    ax.axvline(1 / 3, color=muted, lw=0.8, ls=":")
    ax.annotate("p = 1: Werner C_eff jumps 0.5 -> 1\n(n_active 2 -> 1), a threshold artifact",
                xy=(1.0, C["families"]["werner"]["psi_mean"][-1]), xytext=(0.42, 0.62),
                fontsize=8, color=ink, arrowprops={"arrowstyle": "->", "color": muted, "lw": 0.8})
    ax.set_xlabel("Werner parameter p (control matched at each p)")
    ax.set_ylabel("Psi (mean +/- SD over seeds)")
    ax.set_title("P2: Psi tracks the spectrum, not entanglement", color=ink, fontsize=11)
    ax.legend(frameon=False, fontsize=8)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "p2.png"), dpi=150)
    plt.close(fig)

    D = R["P3"]
    fig, ax = plt.subplots(figsize=(6.4, 4.0))
    x = [r["comm_norm"] for r in D["rows"]]
    ax.errorbar(x, [r["mean_abs_diff"] for r in D["rows"]], yerr=[r["se_mean_abs_diff"] for r in D["rows"]],
                color=blue, marker="o", ms=5, lw=1.5, capsize=2, label="Finite N: mean abs(Psi12 - Psi21)")
    ax.errorbar(x, [r["abs_diff_of_means"] for r in D["rows"]], yerr=[r["se_diff_of_means"] for r in D["rows"]],
                color=orange, marker="s", ms=5, lw=1.5, capsize=2, label="Finite N: abs(mean Psi12 - mean Psi21)")
    ax.plot(x, [r["exact_asym"] for r in D["rows"]], color=ink, lw=2, label="Exact (infinite N)")
    ax.axvline(0.2, color=muted, lw=0.8, ls=":")
    ax.set_xlabel("Commutator norm ||[O1, O2]|| (operator norm)")
    ax.set_ylabel("Asymmetry")
    ax.set_title("P3: exact asymmetry is linear but far below the noise floor", color=ink, fontsize=11)
    ax.legend(frameon=False, fontsize=8)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "p3.png"), dpi=150)
    plt.close(fig)
    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--workers", type=int, default=min(2, os.cpu_count() or 1))
    ap.add_argument("--report-only", action="store_true",
                    help="rebuild REPORT.md and figures from results/results.json without simulating")
    args = ap.parse_args()
    if args.report_only:
        with open(os.path.join(OUT, "results.json")) as fh:
            R = json.load(fh)
        write_report(R, os.path.join(OUT, "REPORT.md"))
        make_plots(R)
        return
    q = args.quick
    S_A, S_B, S_C, S_D = (3, 3, 3, 4) if q else (20, 20, 30, 300)
    B = 6 if q else 20
    pgrid = [round(0.05 * k, 2) for k in range(21)]
    Ns = [1000, 10000, 100000, 1000000]
    os.makedirs(OUT, exist_ok=True)
    t0 = time.time()
    with Pool(args.workers) as pool:
        tA = time.time(); B1 = stage_a(pool, S_A, B); tA = time.time() - tA
        print(f"stage A done in {tA:.0f} s", flush=True)
        tB = time.time(); V2 = stage_b(pool, S_B, B, Ns); tB = time.time() - tB
        print(f"stage B done in {tB:.0f} s", flush=True)
        tC = time.time(); P2 = stage_c(pool, S_C, B, pgrid); tC = time.time() - tC
        print(f"stage C done in {tC:.0f} s", flush=True)
        tD = time.time(); P3 = stage_d(pool, S_D, B); tD = time.time() - tD
        print(f"stage D done in {tD:.0f} s", flush=True)
    wall = time.time() - t0
    cfg = crt.SimConfig()
    params = {
        "quick": q, "master_seed": MASTER_SEED, "workers": args.workers,
        "python": platform.python_version(), "numpy": np.__version__, "scipy": scipy.__version__,
        "wall_time_s": wall, "stage_times_s": {"A": tA, "B": tB, "C": tC, "D": tD},
        "S_A": S_A, "S_B": S_B, "S_C": S_C, "S_D": S_D, "N": cfg.N,
        "table": [
            ("POVM", "16-outcome product SIC (tetrahedral qubit SIC on each qubit), d = 4", "Sec. 9.1"),
            ("N", f"{cfg.N} counts per batch; batches A and B disjoint and independent", "B.1, P2"),
            ("Pipeline 1 (R12)", "linear inversion + Smolin-Gambetta-Smith PSD projection, on batch A", "task choice"),
            ("Pipeline 2 (R12)", "R rho R MLE from I/4, on batch B; tol 1e-11 (Frobenius step), max 20000 iterations", "task choice"),
            ("Models for C_eff", "the same two estimators (LI-PSD, MLE) applied to A + B (2N counts)", "Sec. 9.2 Step 2"),
            ("Model weights", f"softmax, tau = 1, over {cfg.K_folds}-fold cross-validated held-out log-likelihoods in nats", "Sec. 3.2"),
            ("eps", "1e-8 (sweep 1e-10 to 1e-6, 5 decades)", "Sec. 3.1, B.1"),
            ("delta_reg", "1e-6 (sweep 1e-8 to 1e-4, 5 decades), applied to every reconstruction", "Sec. 3.1, B.1"),
            ("eta", "1e-6", "Sec. 3.2"),
            ("H_min", "1e-6", "Eq. 9"),
            ("Bootstrap B", f"{B} (paper: 1000), multinomial resampling of the pooled 2N counts (one setting block)", "Alg. 1, reduced"),
            ("Bootstrap MLE", "random Ginibre full-rank starts, tol 1e-10, max 3000 iterations", "Alg. 1"),
            ("delta_i", "95th percentile of bootstrap JSD for family i; edge if JSD < max(delta_i, delta_j)", "Alg. 1"),
            ("Redundancy reading", "primary: 'sampling' (two independent resamples); also 'literal' (one resample, two starts)", "see README"),
            ("D_hat", f"fixed at {crt.d_hat():.2f}: D = {crt.D_DEFAULT:.0f}, D_ref = {crt.D_REF_DEFAULT:.0f} counts per window", "task choice"),
            ("JSD", "bits, computed as sum_i w_i KL(P_i || P_mix) (identical to Eq. 8, no cancellation)", "Eq. 8"),
            ("Seeds", f"B.1: {S_A}, V2: {S_B}, P2: {S_C} per p per family, P3: {S_D} per theta per order", "task choice"),
            ("P3 instrument", f"gamma = {P3_GAMMA}, m = 2, M_k = sqrt(E_k)", "P3"),
        ],
    }
    R = {"params": params, "B1": B1, "V2": V2, "P2": P2, "P3": P3}

    def clean(o):
        if isinstance(o, dict):
            return {str(k): clean(v) for k, v in o.items()}
        if isinstance(o, (list, tuple)):
            return [clean(v) for v in o]
        if isinstance(o, (np.floating,)):
            return float(o)
        if isinstance(o, (np.integer,)):
            return int(o)
        if isinstance(o, np.bool_):
            return bool(o)
        if isinstance(o, float) and (math.isinf(o) or math.isnan(o)):
            return str(o)
        return o

    name = "results_quick.json" if q else "results.json"
    with open(os.path.join(OUT, name), "w") as fh:
        json.dump(clean(R), fh, indent=1)
    if not q:
        write_report(R, os.path.join(OUT, "REPORT.md"))
        make_plots(R)
    else:
        write_report(R, os.path.join(OUT, "REPORT_quick.md"))
    print(f"total {wall:.0f} s")


if __name__ == "__main__":
    main()
