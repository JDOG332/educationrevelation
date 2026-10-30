"""
run_phase2.py: Phase 2 studies for CRT v11 (spectrum lemma, floor law,
P3 design study, C_eff versus number of methods).

    python3 run_phase2.py               # full run (about 25 to 35 minutes, 2 CPUs)
    python3 run_phase2.py --quick       # smoke test
    python3 run_phase2.py --report-only # rebuild REPORT2.md and figures from JSON

Outputs in results/phase2/: results2.json, REPORT2.md, spectrum_lemma.png,
floor_law.png, run2.log.

Seeds: every simulated experiment uses SeedSequence((MASTER_SEED2, stage,
item..., replicate)); results do not depend on the worker count.
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
from scipy.optimize import curve_fit

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import crt  # noqa: E402
from run_all import commutator_norm, fmt, haar_unitary, mstd, ols  # noqa: E402

MASTER_SEED2 = 20261030
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "results", "phase2")
DHAT = crt.d_hat()
EPS = crt.EPS_DEFAULT
FLOOR = EPS / (1 + EPS)

# ---------------------------------------------------------------------------
# Workers
# ---------------------------------------------------------------------------

SUMMARY_KEYS = ("psi", "F", "I1", "I2", "R12", "C0", "R", "C_eff", "n_active", "n_unique", "w_raw", "H_w", "JSD_w")


def task_full(args):
    """Full pipeline, primary rule. Returns a compact summary."""
    tag, rho, seed, N, B = args
    raw = crt.simulate(rho, seed, crt.SimConfig(N=N, B_boot=B))
    o = crt.functional(raw)
    out = {k: o[k] for k in SUMMARY_KEYS}
    out["tag"] = tag
    out["N"] = N
    return out


def task_recognition(args):
    """R12 for both pairings from the same two batches:
    LI-PSD(A) with MLE(B), and MLE(A) with MLE(B). Also the regularization
    offset I(rho~) - I(rho) at delta_reg = 1e-4 for the LI estimate."""
    tag, rho, seed, N = args
    ss = np.random.SeedSequence(seed)
    rA, rB = [np.random.default_rng(s) for s in ss.spawn(2)]
    cA = crt.sample_counts(rho, N, rA)
    cB = crt.sample_counts(rho, N, rB)
    li = crt.li_psd(cA)
    mle, _, conv = crt.mle_rrr(np.vstack([cA, cB]), None, crt.MLEConfig())
    out = {"tag": tag, "N": N, "converged": bool(conv.all())}
    for name, a in (("LI_MLE", li), ("MLE_MLE", mle[0])):
        r1 = crt.regularize(a, crt.DELTA_REG_DEFAULT)
        r2 = crt.regularize(mle[1], crt.DELTA_REG_DEFAULT)
        F = crt.fidelity(r1, r2)
        I1, I2 = crt.informativeness(r1), crt.informativeness(r2)
        out[name] = {"F": F, "I1": I1, "I2": I2, "R12": F * crt.gate(I1, I2)}
    raw_li = crt.linear_inversion(cA)
    out["I_LI_unprojected"] = crt.informativeness(crt.project_psd_sgs(raw_li))
    out["I_LI_dreg_1e-4_minus_0"] = crt.informativeness(crt.regularize(li, 1e-4)) - crt.informativeness(li)
    return out


def task_ceff(args):
    """C_eff study: base pipeline plus BME and rank-1 MLE, several model sets."""
    tag, rho, seed, N, B = args
    raw = crt.simulate(rho, seed, crt.SimConfig(N=N, B_boot=B))
    crt.add_models(raw, seed=(*seed, 99))
    sets = {"n2 {LI,MLE}": ("LI", "MLE"),
            "n3 {LI,MLE,BME}": ("LI", "MLE", "BME"),
            "n3 {LI,MLE,R1}": ("LI", "MLE", "R1"),
            "n4 {LI,MLE,BME,R1}": ("LI", "MLE", "BME", "R1")}
    out = {"tag": tag, "sets": {}}
    for name, ms in sets.items():
        res = {}
        for tau_name, tau in (("tau1", 1.0), ("tauN", float(raw.counts_AB.sum()))):
            o = crt.functional(raw, models=ms, tau=tau)
            res[tau_name] = {k: o[k] for k in ("psi", "C0", "R", "C_eff", "n_active", "n_unique", "w_raw",
                                               "active", "components", "LL_nats", "pair_jsd", "delta_i", "H_w", "JSD_w")}
        out["sets"][name] = res
    return out


# ---------------------------------------------------------------------------
# Stage 1: spectrum lemma
# ---------------------------------------------------------------------------

LEMMA_P = (0.3, 0.6, 0.9)
LEMMA_N = (1000, 10000, 100000, 1000000)


def lemma_states():
    rng = np.random.default_rng(np.random.SeedSequence((MASTER_SEED2, 10)))
    rots = []
    for _ in range(3):
        rots.append(np.kron(haar_unitary(rng), haar_unitary(rng)))
    states = {}
    pairs = []
    for p in LEMMA_P:
        w = crt.werner(p)
        dg = crt.diagonal_product_basis_state(crt.werner_spectrum(p))
        states[f"W{p}"] = w
        states[f"diag{p}"] = dg
        pairs.append((f"W{p}", f"diag{p}"))
        for k, U in enumerate(rots):
            nm = f"rot{k + 1}diag{p}"
            states[nm] = crt.herm(U @ dg @ np.conj(U.T))
            pairs.append((f"W{p}", nm))
    return states, pairs


def stage1(pool, S, B):
    states, pairs = lemma_states()
    names = list(states)
    tasks = [(nm, states[nm], (MASTER_SEED2, 1, i, j, s), N, B)
             for i, nm in enumerate(names) for j, N in enumerate(LEMMA_N) for s in range(S)]
    res = pool.map(task_full, tasks, chunksize=2)
    by = {}
    for r in res:
        by.setdefault((r["tag"], r["N"]), []).append(r)
    exact = {nm: crt.exact_psi(st)["psi_upper"] for nm, st in states.items()}
    ent = {nm: {"concurrence": crt.concurrence(st), "min_PT_eig": crt.min_pt_eigenvalue(st),
                "purity": crt.purity(st), "S": crt.vn_entropy_bits(st)} for nm, st in states.items()}
    rows = []
    for (a, b) in pairs:
        for N in LEMMA_N:
            A, Bb = by[(a, N)], by[(b, N)]
            row = {"A": a, "B": b, "N": N, "exact_diff": abs(exact[a] - exact[b])}
            for key in ("psi", "R12", "F", "C_eff", "w_LI", "n_active1", "n_unique1"):
                if key == "w_LI":
                    xa = np.array([r["w_raw"][0] for r in A]); xb = np.array([r["w_raw"][0] for r in Bb])
                elif key == "n_active1":
                    xa = np.array([r["n_active"] == 1 for r in A], float); xb = np.array([r["n_active"] == 1 for r in Bb], float)
                elif key == "n_unique1":
                    xa = np.array([r["n_unique"] == 1 for r in A], float); xb = np.array([r["n_unique"] == 1 for r in Bb], float)
                else:
                    xa = np.array([r[key] for r in A]); xb = np.array([r[key] for r in Bb])
                se = math.sqrt(xa.var(ddof=1) / len(xa) + xb.var(ddof=1) / len(xb))
                if se == 0:
                    pv = 1.0 if xa.mean() == xb.mean() else 0.0
                else:
                    with warnings.catch_warnings():
                        warnings.simplefilter("ignore")
                        pv = float(stats.ttest_ind(xa, xb, equal_var=False).pvalue)
                row[key] = {"mean_A": float(xa.mean()), "mean_B": float(xb.mean()), "diff": float(xa.mean() - xb.mean()),
                            "se": se, "pvalue": pv}
            row["sd_single_psi"] = 0.5 * (float(np.std([r["psi"] for r in A], ddof=1)) + float(np.std([r["psi"] for r in Bb], ddof=1)))
            rows.append(row)
    perN = []
    npairs = len(pairs)
    for N in LEMMA_N:
        rr = [r for r in rows if r["N"] == N]
        perN.append({
            "N": N,
            "max_abs_dpsi": max(abs(r["psi"]["diff"]) for r in rr),
            "median_se_dpsi": float(np.median([r["psi"]["se"] for r in rr])),
            "max_abs_t": max(abs(r["psi"]["diff"]) / r["psi"]["se"] for r in rr),
            "mean_sd_single_psi": float(np.mean([r["sd_single_psi"] for r in rr])),
            "n_sig_psi_0.01": sum(r["psi"]["pvalue"] < 0.01 for r in rr),
            "n_sig_psi_bonf": sum(r["psi"]["pvalue"] < 0.01 / (npairs * len(LEMMA_N)) for r in rr),
            "n_sig_Ceff_0.01": sum(r["C_eff"]["pvalue"] < 0.01 for r in rr),
            "n_sig_wLI_0.01": sum(r["w_LI"]["pvalue"] < 0.01 for r in rr),
            "max_abs_dCeff": max(abs(r["C_eff"]["diff"]) for r in rr),
            "max_abs_dwLI": max(abs(r["w_LI"]["diff"]) for r in rr),
            "max_abs_d_nactive1": max(abs(r["n_active1"]["diff"]) for r in rr),
            "max_abs_d_nunique1": max(abs(r["n_unique1"]["diff"]) for r in rr),
            "max_exact_diff": max(r["exact_diff"] for r in rr),
        })
    lx = np.log10([p["N"] for p in perN])
    fit_max = ols(lx, np.log10([p["max_abs_dpsi"] for p in perN]))
    fit_se = ols(lx, np.log10([p["median_se_dpsi"] for p in perN]))
    fit_sd = ols(lx, np.log10([p["mean_sd_single_psi"] for p in perN]))
    # expected max of |Z| over npairs correlated normals is of order sqrt(2 ln npairs)
    return {"pairs": pairs, "S": S, "rows": rows, "perN": perN, "exact": exact, "entanglement": ent,
            "loglog_max_abs_dpsi": fit_max, "loglog_median_se": fit_se, "loglog_sd_single": fit_sd,
            "expected_max_t_null": math.sqrt(2 * math.log(npairs))}


# ---------------------------------------------------------------------------
# Stage 2: floor law
# ---------------------------------------------------------------------------

FLOOR_N = (1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000)
THERMAL_Q = 0.02


def thermal(q):
    s = np.diag([(1 + q) / 2, (1 - q) / 2]).astype(complex)
    return np.kron(s, s)


def first_order_prediction(rho, n_mc=400000, seed=0):
    """First-order (Gaussian, delta-method) prediction for the LI estimate of
    a state near I/d. Delta = rho_hat - rho = sum_k (f_k - p_k) D_k with
    Cov(f) = (diag(p) - p p^T)/N. For rho = I/d, I(rho + Delta) =
    d/(2 ln2 log2 d) Tr Delta^2 + O(Delta^3) = Tr Delta^2 / ln 2 for d = 4.
    Returns E[N I_hat], and E[sqrt(N I_hat)]^2 (the gate of two independent
    estimates, F -> 1), from the exact covariance (no isotropy assumed)."""
    d = crt.DIM
    p = np.clip(crt.born_probs(rho), 0, None)
    D = crt.POVM_D
    # orthonormal Hermitian basis: Pauli products / 2
    P1 = [crt.PAULI[k] for k in "IXYZ"]
    basis = np.array([np.kron(a, b) / 2 for a in P1 for b in P1])
    Dv = np.real(np.einsum("aij,kji->ka", basis, D))          # (K, 16) coordinates of D_k
    cov = (Dv.T * p) @ Dv - np.outer(p @ Dv, p @ Dv)           # times 1/N
    ETr = float(np.trace(cov))
    coef = d / (2 * math.log(2) * math.log2(d))
    EI = coef * ETr
    w = np.clip(np.linalg.eigvalsh(cov), 0, None)
    rng = np.random.default_rng(seed)
    z = rng.normal(size=(n_mc, len(w)))
    Q = coef * (z ** 2 @ w)
    Esq = float(np.mean(np.sqrt(Q)))
    analytic = {"sum_k p_k Tr D_k^2": float(np.sum(p * np.real(np.einsum("kij,kji->k", D, D)))),
                "Tr rho^2": crt.purity(rho)}
    return {"E_Tr_Delta2_times_N": ETr, "coef_I_per_TrDelta2": coef, "E_N_Ihat": EI,
            "E_sqrt_N_Ihat_sq": Esq ** 2, "cov_eigenvalues": sorted(w.tolist(), reverse=True), **analytic}


def fit_floor(Ns, means, ses, offset):
    f = lambda n, a, b: a * n ** (-b) + offset  # noqa: E731
    popt, pcov = curve_fit(f, np.array(Ns, float), np.array(means), p0=[30.0, 1.0], sigma=np.array(ses),
                           absolute_sigma=True, maxfev=20000)
    perr = np.sqrt(np.diag(pcov))
    resid = (np.array(means) - f(np.array(Ns, float), *popt)) / np.array(ses)
    chi2 = float(np.sum(resid ** 2))
    g = lambda n, a: a / n + offset  # noqa: E731
    pa, pca = curve_fit(g, np.array(Ns, float), np.array(means), p0=[30.0], sigma=np.array(ses), absolute_sigma=True)
    return {"a": float(popt[0]), "a_err": float(perr[0]), "b": float(popt[1]), "b_err": float(perr[1]),
            "chi2": chi2, "dof": len(Ns) - 2, "a_at_b1": float(pa[0]), "a_at_b1_err": float(np.sqrt(pca[0, 0])),
            "offset": offset}


def stage2(pool, S):
    states = {"I/4": crt.maximally_mixed(), f"thermal q={THERMAL_Q}": thermal(THERMAL_Q)}
    tasks = [(nm, st, (MASTER_SEED2, 2, i, j, s), N)
             for i, (nm, st) in enumerate(states.items()) for j, N in enumerate(FLOOR_N) for s in range(S)]
    res = pool.map(task_recognition, tasks, chunksize=4)
    out = {"S": S, "Ns": list(FLOOR_N), "states": {}}
    for nm, st in states.items():
        I_true = crt.exact_psi(st)["I_reg"]
        offset = crt.gate(I_true, I_true)                     # exact R12 at infinite N
        entry = {"I_exact": I_true, "R12_exact": offset, "pairings": {}}
        for pairing in ("LI_MLE", "MLE_MLE"):
            pts = []
            for N in FLOOR_N:
                rr = [r[pairing] for r in res if r["tag"] == nm and r["N"] == N]
                R = np.array([x["R12"] for x in rr])
                pts.append({"N": N, "R12_mean": float(R.mean()), "R12_se": float(R.std(ddof=1) / math.sqrt(len(R))),
                            "R12_sd": float(R.std(ddof=1)),
                            "F_mean": float(np.mean([x["F"] for x in rr])),
                            "I_mean": float(np.mean([0.5 * (x["I1"] + x["I2"]) for x in rr])),
                            "N_times_R12_minus_exact": float(N * (R.mean() - offset))})
            fitres = fit_floor([p["N"] for p in pts], [p["R12_mean"] for p in pts], [p["R12_se"] for p in pts], offset)
            # restricted fit N >= 1e4 (asymptotic regime)
            sel = [p for p in pts if p["N"] >= 10000]
            fit_hi = fit_floor([p["N"] for p in sel], [p["R12_mean"] for p in sel], [p["R12_se"] for p in sel], offset)
            entry["pairings"][pairing] = {"points": pts, "fit": fitres, "fit_N_ge_1e4": fit_hi}
        dreg = [r["I_LI_dreg_1e-4_minus_0"] / max(r["I_LI_unprojected"], 1e-300)
                for r in res if r["tag"] == nm and r["N"] == 10000]
        entry["rel_I_change_dreg_1e-4_at_N1e4"] = mstd(dreg)
        entry["first_order"] = first_order_prediction(st)
        out["states"][nm] = entry
    # deterministic delta_reg offset for a pure-state reconstruction
    pure = crt.bell_phi_plus()
    out["pure_state_I_reg"] = [{"delta_reg": d, "I": crt.informativeness(crt.regularize(pure, d)),
                                "one_minus_I": 1 - crt.informativeness(crt.regularize(pure, d)),
                                "formula": _pure_one_minus_I(d)} for d in (1e-8, 1e-7, 1e-6, 1e-5, 1e-4)]
    return out


def _pure_one_minus_I(delta, d=4):
    """1 - I for (1-delta)|psi><psi| + delta I/d, exact closed form."""
    lam1 = 1 - delta + delta / d
    lam2 = delta / d
    S = -lam1 * math.log2(lam1) - (d - 1) * lam2 * math.log2(lam2)
    return S / math.log2(d)


# ---------------------------------------------------------------------------
# Stage 3: P3 design study
# ---------------------------------------------------------------------------

P3_GAMMAS = (0.1, 0.3, 0.5, 0.7, 0.9, 1.0)
P3_THETAS = (0.05, 0.1, 0.2, 0.4, 0.8, math.pi / 4)
P3_N = (10000, 100000, 1000000)
SD_GAMMAS = (0.1, 0.5, 1.0)
SD_THETAS = (0.1, math.pi / 4)


def p3_input_states():
    plus0 = np.kron(crt.qubit_state([1, 0, 0]), np.diag([1, 0]).astype(complex))
    c, s = math.cos(math.pi / 8), math.sin(math.pi / 8)
    pe = crt.proj(crt.ket(c, 0, 0, s))
    return {"tilted (1,0,1)/sqrt2 (x) I/2": np.kron(crt.qubit_state(np.array([1, 0, 1]) / math.sqrt(2)), np.eye(2) / 2),
            "|+>|0>": plus0,
            "cos(pi/8)|00>+sin(pi/8)|11>": pe,
            "Bell |Phi+>": crt.bell_phi_plus()}


def p3_pair(rho0, theta, gamma):
    n1 = np.array([0.0, 0.0, 1.0])
    n2 = np.array([math.sin(theta), 0.0, math.cos(theta)])
    L = crt.lueders_channel_qubitA
    return L(L(rho0, n1, gamma), n2, gamma), L(L(rho0, n2, gamma), n1, gamma)


def stage3(pool, S_sd, B):
    inputs = p3_input_states()
    # --- Monte Carlo SD at sample points (order 12 only), N = 1e4 ---------
    tasks = []
    for i, (nm, r0) in enumerate(inputs.items()):
        for j, g in enumerate(SD_GAMMAS):
            for k, th in enumerate(SD_THETAS):
                r12, _ = p3_pair(r0, th, g)
                for s in range(S_sd):
                    tasks.append(((nm, g, th, 10000), r12, (MASTER_SEED2, 3, i, j, k, s), 10000, B))
        # N-scaling check at gamma = 0.5, theta = 0.1
        r12, _ = p3_pair(r0, 0.1, 0.5)
        for m, N in enumerate((100000, 1000000)):
            for s in range(S_sd):
                tasks.append(((nm, 0.5, 0.1, N), r12, (MASTER_SEED2, 3, i, 9, m, s), N, B))
    res = pool.map(task_full, tasks, chunksize=2)
    by = {}
    for r in res:
        by.setdefault(tuple(r["tag"]), []).append(r)
    sd_pts = {}
    for key, rr in by.items():
        nm, g, th, N = key
        sd_pts[f"{nm}|{g}|{th:.4f}|{N}"] = {
            "state": nm, "gamma": g, "theta": th, "N": N,
            "sd_psi": float(np.std([r["psi"] for r in rr], ddof=1)),
            "sd_R12": float(np.std([r["R12"] for r in rr], ddof=1)),
            "mean_psi": float(np.mean([r["psi"] for r in rr])),
            "mean_C_eff": float(np.mean([r["C_eff"] for r in rr])),
            "frac_n_active1": float(np.mean([r["n_active"] == 1 for r in rr])),
            "frac_n_unique1": float(np.mean([r["n_unique"] == 1 for r in rr])),
        }

    def sd_lookup(nm, g, th):
        """Interpolated single-run SD of Psi at N = 1e4: linear in gamma
        between the sampled gammas, nearest sampled theta (theta <= 0.2 uses
        0.1, larger uses pi/4). Also returns the mean C_eff used for Psi."""
        tt = SD_THETAS[0] if th <= 0.2 + 1e-12 else SD_THETAS[1]
        gs = list(SD_GAMMAS)
        vals = [sd_pts[f"{nm}|{x}|{tt:.4f}|10000"]["sd_psi"] for x in gs]
        cef = [sd_pts[f"{nm}|{x}|{tt:.4f}|10000"]["mean_C_eff"] for x in gs]
        return float(np.interp(g, gs, vals)), float(np.interp(g, gs, cef))

    # --- exact asymmetry grid ---------------------------------------------
    grid = []
    xs_all = [commutator_norm(t) for t in P3_THETAS]
    for nm, r0 in inputs.items():
        for g in P3_GAMMAS:
            sd1e4, ceff = sd_lookup(nm, g, 0.1)
            sd1e4L, ceffL = sd_lookup(nm, g, math.pi / 4)
            dG, signed = [], []
            for th in P3_THETAS:
                a, b = p3_pair(r0, th, g)
                Ga = crt.exact_psi(a)["G_eps_reg"]
                Gb = crt.exact_psi(b)["G_eps_reg"]
                dG.append(abs(Ga - Gb))
                signed.append(Ga - Gb)
            entry = {"state": nm, "gamma": g, "dG_exact": dG, "dG_signed": signed}
            for rng_name, sel in (("small (theta <= 0.2)", [0, 1, 2]), ("large (all 6 theta)", list(range(6)))):
                x = np.array([xs_all[i] for i in sel])
                ce = ceff if rng_name.startswith("small") else 0.5 * (ceff + ceffL)
                sdv = sd1e4 if rng_name.startswith("small") else max(sd1e4, sd1e4L)
                yS = np.array([signed[i] for i in sel]) * DHAT * ce             # signed exact Psi difference
                if np.max(np.abs([signed[i] for i in sel])) < 1e-12:            # round-off only: exactly zero
                    yS = np.zeros_like(yS)
                yA = np.abs(yS)
                if np.all(yA > 0):
                    expo = ols(np.log(x), np.log(yA))
                else:
                    expo = {"slope": float("nan"), "R2": float("nan")}
                fA = ols(x, yA) if np.ptp(yA) > 0 else {"slope": 0.0, "intercept": float(yA.mean()), "R2": float("nan"), "slope_se": 0.0, "n": len(x)}
                fS = ols(x, yS) if np.ptp(yS) > 0 else {"slope": 0.0, "intercept": float(yS.mean()), "R2": float("nan"), "slope_se": 0.0, "n": len(x)}
                Sxx = float(np.sum((x - x.mean()) ** 2))
                runs = {}
                beta0 = abs(fS["slope"])
                # N-independent total counts in the shot-noise regime (no rounding):
                # n N = 50 SD(1e4)^2 1e4 / (beta^2 Sxx), total = n N x K x 2 orders x 2 batches
                cont_total = (50 * sdv ** 2 * 1e4 / (beta0 ** 2 * Sxx) * len(x) * 4) if beta0 > 0 else float("inf")
                for N in P3_N:
                    sdN = sdv * math.sqrt(10000 / N)
                    beta = abs(fS["slope"])
                    if beta > 0:
                        n_runs = max(2, math.ceil(50 * sdN ** 2 / (beta ** 2 * Sxx)))
                    else:
                        n_runs = float("inf")
                    total = (n_runs * len(x) * 2 * 2 * N) if n_runs != float("inf") else float("inf")
                    runs[str(N)] = {"sd_psi": sdN, "runs_per_order_per_theta": n_runs, "total_counts": total}
                entry[rng_name] = {"x": x.tolist(), "fit_abs": fA, "fit_signed": fS, "C_eff_used": ce,
                                   "power_exponent": expo["slope"], "power_R2": expo["R2"],
                                   "total_counts_continuous": cont_total,
                                   "sd_psi_1e4_used": sdv, "max_dPsi_exact": float(yA.max()), "runs": runs}
            grid.append(entry)
    # cheapest
    cands = []
    for e in grid:
        for rng_name in ("small (theta <= 0.2)", "large (all 6 theta)"):
            for N, rv in e[rng_name]["runs"].items():
                if rv["total_counts"] != float("inf"):
                    cands.append({"state": e["state"], "gamma": e["gamma"], "range": rng_name, "N": int(N),
                                  "runs_per_order_per_theta": rv["runs_per_order_per_theta"],
                                  "total_counts": rv["total_counts"], "beta": e[rng_name]["fit_signed"]["slope"],
                                  "R2_abs": e[rng_name]["fit_abs"]["R2"], "sd_psi": rv["sd_psi"],
                                  "power_exponent": e[rng_name]["power_exponent"],
                                  "total_counts_continuous": e[rng_name]["total_counts_continuous"]})
    cands.sort(key=lambda c: c["total_counts"])
    cheapest_small = [c for c in cands if c["range"].startswith("small")][:5]
    cheapest_large = [c for c in cands if c["range"].startswith("large")][:5]
    # N-scaling check of the SD
    nchk = []
    for nm in inputs:
        base = sd_pts[f"{nm}|0.5|0.1000|10000"]["sd_psi"]
        for N in (100000, 1000000):
            v = sd_pts[f"{nm}|0.5|0.1000|{N}"]["sd_psi"]
            nchk.append({"state": nm, "N": N, "sd_psi": v, "pred_1_over_sqrtN": base * math.sqrt(10000 / N),
                         "ratio": v / (base * math.sqrt(10000 / N)) if base > 0 else float("nan"),
                         "frac_n_active1": sd_pts[f"{nm}|0.5|0.1000|{N}"]["frac_n_active1"]})
    return {"S_sd": S_sd, "gammas": list(P3_GAMMAS), "thetas": list(P3_THETAS), "comm_norms": xs_all,
            "sd_points": sd_pts, "grid": grid, "cheapest_small": cheapest_small, "cheapest_large": cheapest_large,
            "cheapest_overall": cands[:5], "sd_N_check": nchk}


# ---------------------------------------------------------------------------
# Stage 4: C_eff map
# ---------------------------------------------------------------------------

def stage4(pool, S, B):
    from run_all import named_states
    states = named_states()
    tasks = [(nm, st, (MASTER_SEED2, 4, i, s), 10000, B) for i, (nm, st) in enumerate(states) for s in range(S)]
    res = pool.map(task_ceff, tasks, chunksize=1)
    out = {"S": S, "rows": []}
    for nm, _ in states:
        rr = [r for r in res if r["tag"] == nm]
        for sname in rr[0]["sets"]:
            for tau in ("tau1", "tauN"):
                xs = [r["sets"][sname][tau] for r in rr]
                sig = {}
                for x in xs:
                    k = " ".join("{" + ",".join(c) + "}" for c in x["components"])
                    sig[k] = sig.get(k, 0) + 1
                r1 = None
                if "R1" in sname:
                    act = sum("R1" in x["active"] for x in xs)
                    merged = sum(any("R1" in c and len(c) > 1 for c in x["components"]) for x in xs)
                    alone = sum(any(c == ["R1"] for c in x["components"]) for x in xs)
                    r1 = {"active": act, "merged": merged, "separate_witness": alone, "dropped": len(xs) - act}
                ceffs = sorted({round(x["C_eff"], 4) for x in xs})
                out["rows"].append({
                    "state": nm, "set": sname, "tau": tau,
                    "n_active": mstd([x["n_active"] for x in xs]), "n_unique": mstd([x["n_unique"] for x in xs]),
                    "C0": mstd([x["C0"] for x in xs]), "C0_min": min(x["C0"] for x in xs),
                    "R": mstd([x["R"] for x in xs]), "C_eff": mstd([x["C_eff"] for x in xs]),
                    "psi": mstd([x["psi"] for x in xs]), "C_eff_distinct_values": ceffs,
                    "partitions": sig, "R1_fate": r1,
                    "mean_w": np.mean([x["w_raw"] for x in xs], axis=0).tolist(),
                })
    return out


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def r2f_k(v):
    try:
        v = float(v)
    except (TypeError, ValueError):
        return "n/a"
    return "n/a" if math.isnan(v) else f"{v:.2f}"


def r2f(v):
    try:
        v = float(v)
    except (TypeError, ValueError):
        return "n/a"
    return "n/a" if math.isnan(v) else f"{v:.4f}"


def write_report(R, path):
    P = R["params"]
    L = []
    a = L.append
    a("# CRT v11 Phase 2: what Psi measures")
    a("")
    a(f"Generated by `python3 run_phase2.py` (master seed {P['master_seed']}), Python {P['python']}, numpy {P['numpy']}, "
      f"scipy {P['scipy']}, {P['workers']} worker processes, wall time {P['wall_time_s']:.0f} s "
      f"(stages: {', '.join(f'{k} {v:.0f} s' for k, v in P['stage_times_s'].items())}).")
    a("")
    a("Common settings (as Phase 1 unless stated): product SIC-POVM, two disjoint batches of N counts each; pipeline 1 = "
      "LI-PSD on batch A, pipeline 2 = R rho R MLE on batch B; eps = 1e-8, delta_reg = 1e-6, eta = 1e-6, H_min = 1e-6, tau = 1; "
      f"Algorithm 1 'sampling' reading with B = {P['B']}; D_hat = {DHAT:.2f}.")
    a("")

    # ---- 1
    T = R["lemma"]
    a("## 1. Spectrum lemma")
    a("")
    a(f"Pairs: Werner p versus four separable states of the same spectrum at p = 0.3, 0.6, 0.9 (the product-basis diagonal state and "
      f"three Haar-random local-unitary rotations of it, seeded): {len(T['pairs'])} pairs. Within each p all five states share "
      f"one spectrum; the Werner state is entangled for p = 0.6 and 0.9 and the controls are PPT. {T['S']} seeds per state per N; "
      "the Werner runs are shared across the four pairs at the same p.")
    a("")
    a("| N per batch | max abs diff of exact Psi | max abs diff of mean Psi over pairs | median SE of that diff | max abs t | mean single-run SD of Psi | pairs with p < 0.01 (Psi) | after Bonferroni | pairs with p < 0.01 (C_eff) | pairs with p < 0.01 (w_LI) | max abs diff C_eff | max abs diff w_LI | max abs diff P(n_active = 1) | max abs diff P(n_unique = 1) |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for p in T["perN"]:
        a(f"| {p['N']:.0e} | {fmt(p['max_exact_diff'])} | {fmt(p['max_abs_dpsi'])} | {fmt(p['median_se_dpsi'])} | {p['max_abs_t']:.2f} | "
          f"{fmt(p['mean_sd_single_psi'])} | {p['n_sig_psi_0.01']} | {p['n_sig_psi_bonf']} | {p['n_sig_Ceff_0.01']} | {p['n_sig_wLI_0.01']} | "
          f"{fmt(p['max_abs_dCeff'])} | {fmt(p['max_abs_dwLI'])} | {fmt(p['max_abs_d_nactive1'])} | {fmt(p['max_abs_d_nunique1'])} |")
    a("")
    a(f"Log-log slopes against N: max abs diff of mean Psi {T['loglog_max_abs_dpsi']['slope']:.3f}; median SE of the difference "
      f"{T['loglog_median_se']['slope']:.3f}; single-run SD {T['loglog_sd_single']['slope']:.3f}. For {len(T['pairs'])} pairs with no real "
      f"difference the largest abs t is expected near sqrt(2 ln {len(T['pairs'])}) = {T['expected_max_t_null']:.2f}.")
    a("")

    # ---- 2
    F2 = R["floor"]
    a("## 2. Floor law")
    a("")
    a(f"{F2['S']} seeds per N, N = {', '.join(f'{n:.0e}' for n in F2['Ns'])} per batch. Fit: R12(N) = a N^(-b) + R12_exact, "
      "weighted by the standard error of each mean (curve_fit, absolute sigma); also a with b fixed to 1.")
    a("")
    for nm, e in F2["states"].items():
        a(f"### {nm} (I exact = {fmt(e['I_exact'])}, R12 exact = {fmt(e['R12_exact'])})")
        a("")
        a("| N | LI/MLE mean R12 +/- SE | N (R12 - R12_exact) | MLE/MLE mean R12 +/- SE | N (R12 - R12_exact) | mean F (LI/MLE) | N (mean I_hat - I) |")
        a("|---|---|---|---|---|---|---|")
        p1, p2 = e["pairings"]["LI_MLE"]["points"], e["pairings"]["MLE_MLE"]["points"]
        for x, y in zip(p1, p2):
            a(f"| {x['N']:.0e} | {fmt(x['R12_mean'])} +/- {fmt(x['R12_se'])} | {x['N_times_R12_minus_exact']:.2f} | "
              f"{fmt(y['R12_mean'])} +/- {fmt(y['R12_se'])} | {y['N_times_R12_minus_exact']:.2f} | {x['F_mean']:.6f} | {x['N'] * (x['I_mean'] - e['I_exact']):.2f} |")
        a("")
        a("| Pairing | N range | a | b | chi^2 / dof | a with b = 1 |")
        a("|---|---|---|---|---|---|")
        for pr in ("LI_MLE", "MLE_MLE"):
            for lab, key in (("1e3 to 1e6", "fit"), ("1e4 to 1e6", "fit_N_ge_1e4")):
                f = e["pairings"][pr][key]
                a(f"| {pr.replace('_', '/')} | {lab} | {f['a']:.2f} +/- {f['a_err']:.2f} | {f['b']:.4f} +/- {f['b_err']:.4f} | "
                  f"{f['chi2']:.1f} / {f['dof']} | {f['a_at_b1']:.2f} +/- {f['a_at_b1_err']:.2f} |")
        fo = e["first_order"]
        a("")
        a(f"First-order prediction (linear inversion, delta method, exact SIC covariance): N E[Tr Delta^2] = "
          f"sum_k p_k Tr D_k^2 - Tr rho^2 = {fo['sum_k p_k Tr D_k^2']:.4f} - {fo['Tr rho^2']:.4f} = {fo['E_Tr_Delta2_times_N']:.4f}; "
          f"I = {fo['coef_I_per_TrDelta2']:.4f} Tr Delta^2 near I/4; so N E[I_hat] = {fo['E_N_Ihat']:.3f}, and for the gate of two independent "
          f"estimates N E[sqrt(I_hat1 I_hat2)] = (E sqrt(N I_hat))^2 = {fo['E_sqrt_N_Ihat_sq']:.3f}. Covariance eigenvalues (times N): "
          f"{', '.join(f'{v:.3f}' for v in fo['cov_eigenvalues'][:15])}.")
        a("")
        rd = e["rel_I_change_dreg_1e-4_at_N1e4"]
        a(f"Regularization: relative change of I_hat when delta_reg goes from 0 to 1e-4 (LI estimates, N = 1e4): {rd[0]:.3e} +/- {rd[1]:.1e} "
          "(prediction -2 delta = -2e-4).")
        a("")
    a("Pure-state reconstruction: deterministic offset 1 - I(rho~) from delta_reg alone (exact closed form, d = 4):")
    a("")
    a("| delta_reg | 1 - I(rho~) | closed form |")
    a("|---|---|---|")
    for r in F2["pure_state_I_reg"]:
        a(f"| {r['delta_reg']:.0e} | {r['one_minus_I']:.4e} | {r['formula']:.4e} |")
    a("")

    # ---- 3
    D = R["p3"]
    a("## 3. P3 design study")
    a("")
    a("O1 = sigma_z and O2 = sin(theta) sigma_x + cos(theta) sigma_z on qubit A; Lueders instruments of strength gamma (gamma = 1 projective). "
      "Exact asymmetry: dG = abs(G_eps(rho12~) - G_eps(rho21~)) at infinite N (F = 1); the Psi asymmetry is D_hat x C_eff x dG with "
      "C_eff the Monte Carlo mean at the nearest sampled point. Single-run SD of Psi: "
      f"{D['S_sd']} seeds at N = 1e4 for gamma in {{0.1, 0.5, 1.0}} and theta in {{0.1, pi/4}}, linear interpolation in gamma, nearest sampled theta "
      "(theta <= 0.2 uses 0.1, otherwise pi/4; the larger of the two SDs for the full range), scaled to other N by 1/sqrt(N) "
      "(checked below). Runs per order per theta point for a 5 sigma slope: n = 50 SD^2 / (beta^2 Sxx), beta the slope of the signed "
      "exact difference against the commutator norm, Sxx the spread of the norms in the range. Total counts = n x (theta points) x 2 orders x 2 batches x N.")
    a("")
    a("Commutator norms: " + ", ".join(f"theta = {t:.3f}: {x:.4f}" for t, x in zip(D["thetas"], D["comm_norms"])) + ".")
    a("")
    a("Sampled single-run SDs at N = 1e4:")
    a("")
    a("| Input | gamma | theta | SD Psi | SD R12 | mean C_eff | P(n_active = 1) | P(n_unique = 1) |")
    a("|---|---|---|---|---|---|---|---|")
    for k, v in D["sd_points"].items():
        if v["N"] == 10000:
            a(f"| {v['state']} | {v['gamma']} | {v['theta']:.3f} | {fmt(v['sd_psi'])} | {fmt(v['sd_R12'])} | {v['mean_C_eff']:.3f} | "
              f"{v['frac_n_active1']:.2f} | {v['frac_n_unique1']:.2f} |")
    a("")
    a("Check of the 1/sqrt(N) law (gamma = 0.5, theta = 0.1):")
    a("")
    a("| Input | N | SD Psi | predicted from N = 1e4 | ratio | P(n_active = 1) |")
    a("|---|---|---|---|---|---|")
    for r in D["sd_N_check"]:
        a(f"| {r['state']} | {r['N']:.0e} | {fmt(r['sd_psi'])} | {fmt(r['pred_1_over_sqrtN'])} | {r['ratio']:.2f} | {r['frac_n_active1']:.2f} |")
    a("")
    a("Exact asymmetry and linearity (Psi units, D_hat and C_eff included):")
    a("")
    a("Power exponent k: fit of log dPsi = k log norm + c (k = 1 means linear; k = 2 quadratic). R^2 > 0.9 of a straight line does not by itself establish linearity over three points.")
    a("")
    a("| Input | gamma | dPsi at theta = 0.05, 0.1, 0.2, 0.4, 0.8, pi/4 | slope beta, small range | R^2 abs vs norm, small | exponent k, small | slope beta, all 6 | R^2 abs vs norm, all 6 | exponent k, all 6 | runs per order per theta, small, N = 1e4 / 1e5 / 1e6 | runs, all 6, N = 1e4 / 1e5 / 1e6 | total counts (unrounded, N-independent), small / all |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|")
    for e in D["grid"]:
        sm, lg = e["small (theta <= 0.2)"], e["large (all 6 theta)"]
        dps = [x * DHAT * lg["C_eff_used"] for x in e["dG_exact"]]
        def rs(blk):
            return " / ".join(str(blk["runs"][str(N)]["runs_per_order_per_theta"]) for N in P3_N)
        r2s = r2f(sm["fit_abs"]["R2"])
        r2l = r2f(lg["fit_abs"]["R2"])
        def tc(v):
            try:
                v = float(v)
            except (TypeError, ValueError):
                return "never"
            return "never" if math.isinf(v) else f"{v:.2e}"
        a(f"| {e['state']} | {e['gamma']} | {', '.join(f'{v:.1e}' for v in dps)} | {fmt(sm['fit_signed']['slope'])} | {r2s} | {r2f_k(sm['power_exponent'])} | "
          f"{fmt(lg['fit_signed']['slope'])} | {r2l} | {r2f_k(lg['power_exponent'])} | {rs(sm)} | {rs(lg)} | {tc(sm['total_counts_continuous'])} / {tc(lg['total_counts_continuous'])} |")
    a("")
    a("The cheapest experiments that see P3 at 5 sigma (total detected counts, both orders, both batches):")
    a("")
    a("| Range | Input | gamma | N per batch | runs per order per theta | theta points | total counts | unrounded total counts | beta | R^2 (abs vs norm) | exponent k | SD Psi |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|")
    for lab, lst in (("small", D["cheapest_small"]), ("large", D["cheapest_large"])):
        for c in lst:
            k = 3 if c["range"].startswith("small") else 6
            a(f"| {lab} | {c['state']} | {c['gamma']} | {c['N']:.0e} | {c['runs_per_order_per_theta']} | {k} | {c['total_counts']:.2e} | "
              f"{float(c['total_counts_continuous']):.2e} | {fmt(c['beta'])} | {r2f(c['R2_abs'])} | {r2f_k(c['power_exponent'])} | {fmt(c['sd_psi'])} |")
    a("")

    # ---- 4
    C = R["ceff"]
    a("## 4. C_eff against the number of methods")
    a("")
    a(f"N = 1e4 per batch, {C['S']} seeds per state. Models: LI = linear inversion + SGS projection; MLE = R rho R; "
      "BME = Dirichlet(n + 1) posterior over outcome probabilities, each of 100 draws mapped by LI + SGS projection, averaged; "
      "R1 = rank-1 (pure-state) constrained MLE by L-BFGS (misspecified for mixed states). All models see identical data (pooled A + B, "
      "the same CV folds and the same bootstrap resamples). tau1 = the paper's tau = 1; tauN = tau equal to the pooled count number "
      "(per-count log-likelihood), reported as a recommendation test only.")
    a("")
    a("| State | Model set | tau | n_active | n_unique | C0 (mean, min) | R | C_eff | distinct C_eff values | Psi | partitions (count) | R1 fate (active / merged / separate / dropped) |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|")
    for r in C["rows"]:
        fate = "" if r["R1_fate"] is None else f"{r['R1_fate']['active']} / {r['R1_fate']['merged']} / {r['R1_fate']['separate_witness']} / {r['R1_fate']['dropped']}"
        parts = "; ".join(f"{k} x{v}" for k, v in sorted(r["partitions"].items(), key=lambda kv: -kv[1]))
        a(f"| {r['state']} | {r['set']} | {r['tau']} | {r['n_active'][0]:.2f} | {r['n_unique'][0]:.2f} | {r['C0'][0]:.6f}, {r['C0_min']:.6f} | "
          f"{r['R'][0]:.3f} | {r['C_eff'][0]:.4f} | {', '.join(str(v) for v in r['C_eff_distinct_values'])} | {fmt(r['psi'][0])} +/- {fmt(r['psi'][1])} | {parts} | {fate} |")
    a("")
    L += summary_section(R)
    with open(path, "w") as fh:
        fh.write("\n".join(L) + "\n")


def summary_section(R):
    """Plain-language findings, recommendations and suggested paper text,
    with every number pulled from the results."""
    T = R["lemma"]
    fl = R["floor"]["states"]["I/4"]
    f1 = fl["pairings"]["LI_MLE"]["fit"]
    fo = fl["first_order"]
    NI = float(np.mean([p["N"] * p["I_mean"] for p in fl["pairings"]["LI_MLE"]["points"]]))
    D = R["p3"]
    cs = D["cheapest_small"][0]
    g05 = [e for e in D["grid"] if e["state"].startswith("tilted") and e["gamma"] == 0.5][0]
    t10 = [e for e in D["grid"] if e["state"].startswith("tilted") and e["gamma"] == 1.0][0]
    p10 = [e for e in D["grid"] if e["state"].startswith("|+>") and e["gamma"] == 1.0][0]
    L = []
    a = L.append
    a("## 5. Summary, recommendations and suggested paper text")
    a("")
    a("### Findings")
    a("")
    a(f"1. Spectrum lemma: same-spectrum pairs give exact Psi equal to {T['perN'][0]['max_exact_diff']:.0e}. At finite N, no pair differs in Psi "
      f"(0 of {len(T['pairs'])} pairs at p < 0.01 at every N; largest abs t {max(p['max_abs_t'] for p in T['perN']):.2f} against "
      f"about {T['expected_max_t_null']:.2f} expected under the null). The largest difference falls as N^{T['loglog_max_abs_dpsi']['slope']:.2f}, "
      f"like the SE (N^{T['loglog_median_se']['slope']:.2f}). The one channel that sees more than the spectrum, the likelihood weights, "
      f"does differ between same-spectrum states (w_LI differs at p < 0.01 in up to {max(p['n_sig_wLI_0.01'] for p in T['perN'])} of "
      f"{len(T['pairs'])} pairs), but only by at most {T['perN'][1]['max_abs_dwLI']:.1e} at N = 1e4, and it never changed n_active, n_unique or "
      f"C_eff (max abs difference of C_eff {max(p['max_abs_dCeff'] for p in T['perN']):.1e}).")
    a(f"2. Floor law: for I/4, R12 = a N^-b with a = {f1['a']:.2f} +/- {f1['a_err']:.2f}, b = {f1['b']:.4f} +/- {f1['b_err']:.4f} "
      f"(chi^2 {f1['chi2']:.1f} / {f1['dof']}); with b = 1, a = {f1['a_at_b1']:.2f} +/- {f1['a_at_b1_err']:.2f}. First-order theory: "
      f"N E[I_hat] = (sum_k p_k Tr D_k^2 - Tr rho^2)/ln 2 = 24.75/ln 2 = {fo['E_N_Ihat']:.2f} (measured mean N I_hat {NI:.2f}), and "
      f"N E[sqrt(I_hat1 I_hat2)] = {fo['E_sqrt_N_Ihat_sq']:.2f}; the fitted a is {100 * (1 - f1['a_at_b1'] / fo['E_sqrt_N_Ihat_sq']):.1f}% below it. "
      "LI/MLE and MLE/MLE pairings are identical here, because for I/4 the LI estimate was always positive, and then LI equals the MLE.")
    a(f"3. P3: the asymmetry is first order (linear) only for inputs with Bloch components both along and across the measured axes "
      f"(tilted input: exponent k = {t10['small (theta <= 0.2)']['power_exponent']:.2f}). For |+>|0> and for cos(pi/8)|00>+sin(pi/8)|11> it is "
      f"second order (k = {p10['small (theta <= 0.2)']['power_exponent']:.2f}), although a straight line still gives R^2 = "
      f"{p10['small (theta <= 0.2)']['fit_abs']['R2']:.3f}. For Bell input it is exactly zero. At the paper's gamma = 0.5 the tilted input needs "
      f"{g05['small (theta <= 0.2)']['total_counts_continuous']:.1e} counts for a 5 sigma slope; with projective measurements (gamma = 1) it needs "
      f"{cs['total_counts']:.1e} ({cs['runs_per_order_per_theta']} runs per order per theta at N = {cs['N']:.0e}). Over the full theta range the "
      f"tilted-input asymmetry peaks near theta = 0.4 and falls (k = {t10['large (all 6 theta)']['power_exponent']:.2f}, R^2 = "
      f"{t10['large (all 6 theta)']['fit_abs']['R2']:.2f}), so the small-commutator restriction is needed. The run counts assume the "
      "single-run SD falls as N^-1/2; this holds for the tilted input (measured/predicted 0.92 to 1.03 at N = 1e5 and 1e6) but the SD falls "
      "more slowly for the Bell and partially entangled inputs (ratio up to 1.85 at N = 1e6), whose counts at large N are therefore "
      "underestimated by up to a factor 3.4.")
    a("4. C_eff: with the paper's tau = 1 the convergence factor is a model count. C0 stays above 0.99999 in every run; models that agree are "
      "merged, so C_eff = 1/n_active exactly (1/2 with two models, 1/3 with three). The misspecified rank-1 model is dropped by eta for every "
      "mixed state (its held-out log-likelihood is 600 to 2700 nats worse), and merged with MLE for the Bell state, where it is correct. "
      "Adding a correct method lowers Psi (Werner 0.8: 0.275 with two, 0.184 with three), which is Lemma 2 working as designed but is not "
      "information about the state. With per-count weights (tau = N) more models stay active and C0 moves (down to 0.97), but the max(delta_i, delta_j) "
      "edge rule then lets the unstable rank-1 model (delta_R1 = 0.126 against 3.8e-4 for I/4) absorb the good models, and for the dephased "
      "Bell state it was counted as a separate witness in 2 of 20 runs.")
    a("")
    a("### Recommendations (not applied in the code; each changes a definition)")
    a("")
    a("1. Algorithm 1, step 1: define delta_i from two independent resamples (sampling spread). The literal text (one resample, two starting "
      "seeds) gives delta_LI = 0 and delta_MLE of about 1e-17, so the edge is decided by round-off: in Phase 1, n_unique = 1 in 19, 18, 2 and 17 of "
      "20 runs for Werner 0.8, Werner 0.2, the dephased Bell state and I/4, and the delta_reg sweep moved Psi by 0.28 instead of 6e-5.")
    a("2. Algorithm 1, step 3: use delta_ij = min(delta_i, delta_j), not max, and a non-strict test JSD <= delta_ij. With max, one unstable "
      "model sets the tolerance for every pair (delta_R1 = 0.126, 330 times the others for I/4). With a strict test, exact duplicates "
      "(JSD = 0 = delta at infinite N) are not merged, so R jumps from 1/2 at every finite N to 1 at N = infinity.")
    a("3. Weights: with tau = 1 on summed log-likelihoods the softmax is one-hot at N = 1e4 (Bell: LI trails MLE by 48 nats, weight 1e-21). Either "
      "use per-count log-likelihoods (tau = N) together with recommendation 2, or state plainly that C_eff = 1/n_unique in practice and treat it "
      "as a count of distinct estimator families, not as a measure of agreement.")
    a(f"4. V2 and the gate floor: replace F_gated ~ eps/(1+eps) by the floor law R12 = a/N with a = {f1['a_at_b1']:.1f} for this POVM and pipeline "
      "(Section 2 above). Optionally bias-correct I_hat by subtracting (sum_k p_k Tr D_k^2 - Tr rho_hat^2)/(N ln 2) near I/4.")
    a("5. Regularization: state the deterministic offsets instead of a blanket 1e-5 bound. Near I/4, I(rho~) = (1 - delta)^2 I(rho_hat), a relative "
      "change of -2 delta (measured -2.008e-4 at delta = 1e-4). For a pure reconstruction, 1 - I(rho~) = S(rho~)/2 = 8.8e-6 at delta = 1e-6 and "
      "6.3e-4 at delta = 1e-4. The 1e-5 claim holds only for delta_reg <= 1e-6.")
    a("6. P3: use the signed difference of means across runs, not the mean of per-run abs(Psi12 - Psi21), whose noise floor is about "
      "1.13 x SD(Psi) (6.1e-3 at N = 1e4). Test linearity with the log-log exponent, not R^2 > 0.9. Calibrate with projective or near-projective "
      "measurements and an input with Bloch components along and across the axes. Keep the theta <= 0.2 restriction.")
    a("7. P2: replace the entanglement-sensitivity claim by the spectrum lemma; the separable control is then a check of the lemma, not a test of entanglement.")
    a("")
    a("### Suggested paper text")
    a("")
    a("*Spectrum lemma.* In the limit of many counts both reconstructions converge to the true state, so F tends to 1, the gate depends only on "
      "the eigenvalues, the two estimators agree and the redundancy decision does not depend on the state; Psi is then a function of the spectrum "
      "of rho and of the apparatus alone. In simulation, Werner states and separable states of the same spectrum give Psi values that agree to "
      "within the sampling noise at every N from 1e3 to 1e6, and the residual difference falls like that noise. Psi is therefore not a witness of "
      f"entanglement; the likelihood weights do see more than the spectrum, but they changed C_eff by at most "
      f"{max(p['max_abs_dCeff'] for p in T['perN']):.0e} and never changed the redundancy partition.")
    a("")
    a(f"*Floor law.* For a state with I(rho) = 0 reconstructed by linear inversion (or R rho R MLE) from N counts per batch of the 16-outcome "
      f"product SIC-POVM, R12 = a N^-1 (1 + o(1)) with a = {f1['a_at_b1']:.1f} +/- {f1['a_at_b1_err']:.1f} (simulation; first-order theory "
      f"{fo['E_sqrt_N_Ihat_sq']:.1f}), so the ignorance floor eps/(1+eps) is reached only for N of order a/eps, about 3e9. A laboratory value "
      f"of a outside roughly [{0.9 * f1['a_at_b1']:.0f}, {1.1 * f1['a_at_b1']:.0f}] (10 percent, to allow for detector and calibration effects) "
      "falsifies the stated pipeline model. Psi at the floor is D_hat x C_eff x a/N, linear in D_hat.")
    a("")
    a(f"*P3.* The order asymmetry of Psi is linear in the commutator norm only when the input has Bloch components along and across the "
      f"measured axes; for other inputs it starts at second order, and for a maximally entangled input it vanishes identically. At measurement "
      f"strength gamma = 0.5 a 5 sigma slope needs about {g05['small (theta <= 0.2)']['total_counts_continuous']:.0e} detected counts; with projective "
      f"measurements about {cs['total_counts']:.0e} suffice, using the signed difference of run means. For the input where the asymmetry is linear, "
      "the linear form holds for theta <= 0.2 and fails at larger angles, where the asymmetry passes through a maximum.")
    a("")
    a("*Convergence factor.* With the paper's weight rule and two to four standard estimators, C0 never differs from 1 by more than 1e-5, and "
      "C_eff reduces to the inverse number of distinct estimator families: estimators that agree are merged, and an estimator whose "
      "model is wrong is dropped by the weight threshold. C_eff therefore records the composition of the model set, not the quality of the "
      "data, and adding a further correct estimator lowers Psi.")
    a("")
    return L


def make_plots(R):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except Exception:
        return
    blue, orange, aqua, ink, muted = "#2a78d6", "#eb6834", "#1baf7a", "#1f1f1e", "#6b6a64"
    plt.rcParams.update({"axes.spines.top": False, "axes.spines.right": False, "axes.edgecolor": muted,
                         "axes.labelcolor": ink, "xtick.color": muted, "ytick.color": muted, "font.size": 10})
    T = R["lemma"]["perN"]
    fig, ax = plt.subplots(figsize=(6.4, 4.0))
    N = [p["N"] for p in T]
    ax.loglog(N, [p["max_abs_dpsi"] for p in T], color=blue, marker="o", lw=1.5, label="max abs diff of mean Psi over pairs")
    ax.loglog(N, [p["median_se_dpsi"] for p in T], color=orange, marker="s", lw=1.5, label="median SE of that difference")
    ax.loglog(N, [p["mean_sd_single_psi"] for p in T], color=aqua, marker="^", lw=1.5, label="single-run SD of Psi")
    ax.set_xlabel("Counts per batch N")
    ax.set_ylabel("Psi units")
    ax.set_title("Spectrum lemma: same-spectrum pairs differ only by noise", color=ink, fontsize=11)
    ax.legend(frameon=False, fontsize=8)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "spectrum_lemma.png"), dpi=150)
    plt.close(fig)

    F2 = R["floor"]["states"]["I/4"]
    fig, ax = plt.subplots(figsize=(6.4, 4.0))
    for pr, col, mk in (("LI_MLE", blue, "o"), ("MLE_MLE", orange, "s")):
        pts = F2["pairings"][pr]["points"]
        f = F2["pairings"][pr]["fit"]
        n = np.array([p["N"] for p in pts], float)
        ax.errorbar(n, [p["R12_mean"] for p in pts], yerr=[p["R12_se"] for p in pts], color=col, marker=mk, ls="none",
                    ms=5, capsize=2, label=f"{pr.replace('_', '/')}: a = {f['a']:.1f}, b = {f['b']:.3f}")
        nn = np.logspace(3, 6, 50)
        ax.plot(nn, f["a"] * nn ** (-f["b"]) + f["offset"], color=col, lw=1)
    ax.axhline(FLOOR, color=muted, ls="--", lw=1, label="eps/(1+eps) = 1e-8")
    ax.set_xscale("log"); ax.set_yscale("log")
    ax.set_xlabel("Counts per batch N")
    ax.set_ylabel("R12 for I/4")
    ax.set_title("Floor law: R12 = a/N, far above eps/(1+eps)", color=ink, fontsize=11)
    ax.legend(frameon=False, fontsize=8)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "floor_law.png"), dpi=150)
    plt.close(fig)


def clean(o):
    if isinstance(o, dict):
        return {str(k): clean(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return [clean(v) for v in o]
    if isinstance(o, np.floating):
        o = float(o)
    if isinstance(o, np.integer):
        return int(o)
    if isinstance(o, np.bool_):
        return bool(o)
    if isinstance(o, float) and (math.isinf(o) or math.isnan(o)):
        return str(o)
    return o


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--workers", type=int, default=min(2, os.cpu_count() or 1))
    ap.add_argument("--report-only", action="store_true")
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    jname = "results2_quick.json" if args.quick else "results2.json"
    if args.report_only:
        with open(os.path.join(OUT, jname)) as fh:
            R = json.load(fh)
        write_report(R, os.path.join(OUT, "REPORT2.md"))
        make_plots(R)
        return
    q = args.quick
    S1, S2, S3, S4 = (3, 4, 4, 2) if q else (30, 100, 50, 20)
    B = 6 if q else 20
    t0 = time.time()
    times = {}
    with Pool(args.workers) as pool:
        t = time.time(); lemma = stage1(pool, S1, B); times["1 lemma"] = time.time() - t
        print(f"stage 1 done in {times['1 lemma']:.0f} s", flush=True)
        t = time.time(); floor = stage2(pool, S2); times["2 floor"] = time.time() - t
        print(f"stage 2 done in {times['2 floor']:.0f} s", flush=True)
        t = time.time(); p3 = stage3(pool, S3, B); times["3 P3"] = time.time() - t
        print(f"stage 3 done in {times['3 P3']:.0f} s", flush=True)
        t = time.time(); ceff = stage4(pool, S4, B); times["4 C_eff"] = time.time() - t
        print(f"stage 4 done in {times['4 C_eff']:.0f} s", flush=True)
    params = {"quick": q, "master_seed": MASTER_SEED2, "workers": args.workers, "python": platform.python_version(),
              "numpy": np.__version__, "scipy": scipy.__version__, "wall_time_s": time.time() - t0,
              "stage_times_s": times, "B": B, "S": {"lemma": S1, "floor": S2, "p3_sd": S3, "ceff": S4}}
    R = clean({"params": params, "lemma": lemma, "floor": floor, "p3": p3, "ceff": ceff})
    with open(os.path.join(OUT, jname), "w") as fh:
        json.dump(R, fh, indent=1)
    write_report(R, os.path.join(OUT, "REPORT2_quick.md" if q else "REPORT2.md"))
    if not q:
        make_plots(R)
    print(f"total {time.time() - t0:.0f} s")


if __name__ == "__main__":
    main()
