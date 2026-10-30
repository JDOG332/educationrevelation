"""
run_phase3.py: referee follow-ups for CRT v11.

    python3 run_phase3.py               # full run (about 10 minutes, 2 CPUs)
    python3 run_phase3.py --report-only # rebuild REPORT3.md from results3.json

Studies
    F  floor constant: I/4 with 3000 seeds per N, N in {1e3, 3e3, 1e4, 3e4,
       1e5, 3e5, 1e6}; thermal q = 0.02 with 1000 seeds per N; high-precision
       Monte Carlo of the first-order prediction with its standard error.
    G  locally rotated Bell and |00> controls (5 Haar-random local unitaries
       plus the SIC-aligned state), 20 seeds, N = 1e4 and 1e5.
    H  LL gap LL(MLE) - LL(LI) for the aligned Bell state (200 seeds at 1e4,
       50 at 1e5) and for the rank-2 separable state (100 seeds at 1e4); the
       one-hot threshold ln((1 - eta)/eta).
    P  P3 small-angle exponents (theta = 0.01 to 0.04), normalized slope
       beta/(R_inf D_hat), and the sigma_y / x-y-plane variant.

Outputs in results/phase3/: results3.json, REPORT3.md, run3.log.
Seeds: SeedSequence((MASTER_SEED3, study, item..., replicate)).
"""

from __future__ import annotations

import argparse
import json
import math
import os
import platform
import sys
import time
from multiprocessing import Pool

import numpy as np
import scipy
from scipy.optimize import curve_fit

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import crt  # noqa: E402
from run_all import commutator_norm, fmt, haar_unitary, mstd, ols  # noqa: E402
from run_phase2 import clean, first_order_prediction, task_recognition, thermal  # noqa: E402

MASTER_SEED3 = 20261031
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "results", "phase3")
DHAT = crt.d_hat()
ETA = crt.ETA_DEFAULT
ONE_HOT_GAP = math.log((1 - ETA) / ETA)      # n = 2: smaller weight < eta iff gap > this

F_N = (1000, 3000, 10000, 30000, 100000, 300000, 1000000)


# ---------------------------------------------------------------------------
# Workers
# ---------------------------------------------------------------------------

def task_detail(args):
    """Full pipeline (primary rule) with weights and log-likelihoods."""
    tag, rho, seed, N, B = args
    raw = crt.simulate(rho, seed, crt.SimConfig(N=N, B_boot=B))
    o = crt.functional(raw)
    return {"tag": tag, "N": N, "psi": o["psi"], "R12": o["R12"], "F": o["F"], "I1": o["I1"], "I2": o["I2"],
            "C_eff": o["C_eff"], "n_active": o["n_active"], "n_unique": o["n_unique"],
            "w_raw": o["w_raw"], "LL": o["LL_nats"], "gap": o["LL_nats"][1] - o["LL_nats"][0],
            "delta_i": o["delta_i"], "JSD_LI_MLE": o["JSD_LI_MLE"]}


# ---------------------------------------------------------------------------
# F: floor constant
# ---------------------------------------------------------------------------

def mc_prediction(n=4_000_000, seed=7):
    """N E[sqrt(I1 I2)] = (E sqrt(N I_hat))^2 for I/4 under the first-order
    Gaussian approximation, with its Monte Carlo standard error."""
    fo = first_order_prediction(crt.maximally_mixed(), n_mc=1000)
    w = np.array(fo["cov_eigenvalues"])
    coef = fo["coef_I_per_TrDelta2"]
    rng = np.random.default_rng(seed)
    vals = []
    for _ in range(8):
        z = rng.normal(size=(n // 8, len(w)))
        vals.append(np.sqrt(coef * (z ** 2 @ w)))
    v = np.concatenate(vals)
    m, s = float(v.mean()), float(v.std(ddof=1) / math.sqrt(len(v)))
    return {"E_N_Ihat": fo["E_N_Ihat"], "pred": m * m, "pred_se": 2 * m * s, "n_mc": len(v)}


def fits(Ns, means, ses, offset):
    Ns = np.array(Ns, float); means = np.array(means); ses = np.array(ses)
    f = lambda n, a, b: a * n ** (-b) + offset  # noqa: E731
    p, c = curve_fit(f, Ns, means, p0=[34.0, 1.0], sigma=ses, absolute_sigma=True, maxfev=20000)
    chi_f = float(np.sum(((means - f(Ns, *p)) / ses) ** 2))
    g = lambda n, a: a / n + offset  # noqa: E731
    pa, ca = curve_fit(g, Ns, means, p0=[34.0], sigma=ses, absolute_sigma=True)
    chi_g = float(np.sum(((means - g(Ns, *pa)) / ses) ** 2))
    h = lambda n, a, c0: a / n + c0  # noqa: E731
    ph, ch = curve_fit(h, Ns, means, p0=[34.0, offset], sigma=ses, absolute_sigma=True)
    chi_h = float(np.sum(((means - h(Ns, *ph)) / ses) ** 2))
    return {"free_b": {"a": float(p[0]), "a_se": float(math.sqrt(c[0, 0])), "b": float(p[1]), "b_se": float(math.sqrt(c[1, 1])),
                       "chi2": chi_f, "dof": len(Ns) - 2},
            "b1": {"a": float(pa[0]), "a_se": float(math.sqrt(ca[0, 0])), "chi2": chi_g, "dof": len(Ns) - 1},
            "b1_free_offset": {"a": float(ph[0]), "a_se": float(math.sqrt(ch[0, 0])), "offset": float(ph[1]),
                               "offset_se": float(math.sqrt(ch[1, 1])), "chi2": chi_h, "dof": len(Ns) - 2},
            "offset_fixed": offset}


def study_F(pool, S_mm, S_th):
    states = {"I/4": (crt.maximally_mixed(), S_mm), f"thermal q=0.02": (thermal(0.02), S_th)}
    out = {"Ns": list(F_N), "states": {}}
    for i, (nm, (st, S)) in enumerate(states.items()):
        tasks = [(nm, st, (MASTER_SEED3, 1, i, j, s), N) for j, N in enumerate(F_N) for s in range(S)]
        res = pool.map(task_recognition, tasks, chunksize=25)
        ex = crt.exact_psi(st)
        R0 = crt.gate(ex["I_reg"], ex["I_reg"])
        pts = []
        for N in F_N:
            R = np.array([r["LI_MLE"]["R12"] for r in res if r["N"] == N])
            Rm = np.array([r["MLE_MLE"]["R12"] for r in res if r["N"] == N])
            pts.append({"N": N, "S": len(R), "R12_mean": float(R.mean()), "R12_se": float(R.std(ddof=1) / math.sqrt(len(R))),
                        "N_R12_minus_exact": float(N * (R.mean() - R0)), "N_R12_se": float(N * R.std(ddof=1) / math.sqrt(len(R))),
                        "max_abs_diff_pairings": float(np.max(np.abs(R - Rm)))})
        out["states"][nm] = {"I_exact": ex["I_reg"], "R12_exact": R0, "points": pts,
                             "fits": fits([p["N"] for p in pts], [p["R12_mean"] for p in pts], [p["R12_se"] for p in pts], R0),
                             "fits_N_ge_1e4": fits([p["N"] for p in pts if p["N"] >= 10000],
                                                   [p["R12_mean"] for p in pts if p["N"] >= 10000],
                                                   [p["R12_se"] for p in pts if p["N"] >= 10000], R0)}
        # pooled N (R12 - R0) over N >= 1e4, inverse-variance weighted
        sel = [p for p in pts if p["N"] >= 10000]
        wts = np.array([1 / p["N_R12_se"] ** 2 for p in sel])
        val = np.array([p["N_R12_minus_exact"] for p in sel])
        out["states"][nm]["pooled_N_R12_N_ge_1e4"] = {"value": float(np.sum(wts * val) / wts.sum()), "se": float(1 / math.sqrt(wts.sum()))}
    out["mc"] = mc_prediction()
    return out


# ---------------------------------------------------------------------------
# G and H: rotated controls and LL gaps
# ---------------------------------------------------------------------------

def study_GH(pool, S_rot, B):
    rng = np.random.default_rng(np.random.SeedSequence((MASTER_SEED3, 20)))
    rots = [np.eye(4, dtype=complex)] + [np.kron(haar_unitary(rng), haar_unitary(rng)) for _ in range(5)]
    base = {"Bell |Phi+>": crt.bell_phi_plus(), "|00>": crt.proj(crt.ket(1, 0, 0, 0))}
    tasks = []
    for i, (nm, st) in enumerate(base.items()):
        for k, U in enumerate(rots):
            s_ = crt.herm(U @ st @ np.conj(U.T))
            for j, N in enumerate((10000, 100000)):
                for s in range(S_rot):
                    tasks.append(((nm, k, N), s_, (MASTER_SEED3, 2, i, k, j, s), N, B))
    # H: LL gap distributions
    for s in range(200):
        tasks.append((("gapBell", 0, 10000), crt.bell_phi_plus(), (MASTER_SEED3, 3, 0, s), 10000, B))
    for s in range(50):
        tasks.append((("gapBell", 0, 100000), crt.bell_phi_plus(), (MASTER_SEED3, 3, 1, s), 100000, B))
    for s in range(100):
        tasks.append((("gapSep", 0, 10000), crt.separable_classical(), (MASTER_SEED3, 3, 2, s), 10000, B))
    res = pool.map(task_detail, tasks, chunksize=2)
    by = {}
    for r in res:
        by.setdefault(tuple(r["tag"]), []).append(r)
    rows = []
    for nm in base:
        for k in range(len(rots)):
            for N in (10000, 100000):
                rr = by[(nm, k, N)]
                g = np.array([r["gap"] for r in rr])
                rows.append({"state": nm, "rotation": "aligned (identity)" if k == 0 else f"Haar {k}", "N": N,
                             "n_active": {str(v): int(sum(r["n_active"] == v for r in rr)) for v in (1, 2)},
                             "n_unique": {str(v): int(sum(r["n_unique"] == v for r in rr)) for v in (1, 2)},
                             "w_LI_mean": float(np.mean([r["w_raw"][0] for r in rr])),
                             "w_LI_min": float(np.min([r["w_raw"][0] for r in rr])),
                             "w_LI_max": float(np.max([r["w_raw"][0] for r in rr])),
                             "gap_median": float(np.median(g)), "gap_min": float(g.min()), "gap_max": float(g.max()),
                             "psi": mstd([r["psi"] for r in rr]), "R12": mstd([r["R12"] for r in rr]),
                             "C_eff": mstd([r["C_eff"] for r in rr]),
                             "JSD_LI_MLE_median": float(np.median([r["JSD_LI_MLE"] for r in rr])),
                             "delta_max_median": float(np.median([max(r["delta_i"]) for r in rr]))})
    gaps = {}
    for key, lab in ((("gapBell", 0, 10000), "Bell aligned, N = 1e4"), (("gapBell", 0, 100000), "Bell aligned, N = 1e5"),
                     (("gapSep", 0, 10000), "separable (|00><00|+|11><11|)/2, N = 1e4")):
        rr = by[key]
        g = np.array([r["gap"] for r in rr])
        w = np.array([r["w_raw"][0] for r in rr])
        gaps[lab] = {"S": len(g), "median": float(np.median(g)), "mean": float(g.mean()), "sd": float(g.std(ddof=1)),
                     "p05": float(np.percentile(g, 5)), "p95": float(np.percentile(g, 95)),
                     "min": float(g.min()), "max": float(g.max()),
                     "frac_one_hot": float(np.mean(np.abs(g) > ONE_HOT_GAP)),
                     "frac_n_active1": float(np.mean([r["n_active"] == 1 for r in rr])),
                     "w_LI_median": float(np.median(w)), "w_LI_min": float(w.min()), "w_LI_max": float(w.max()),
                     "frac_w_between_0.03_0.97": float(np.mean((w > 0.03) & (w < 0.97))),
                     "psi": mstd([r["psi"] for r in rr])}
    return {"rotation_rows": rows, "gaps": gaps, "one_hot_gap": ONE_HOT_GAP, "S_rot": S_rot}


# ---------------------------------------------------------------------------
# P: P3 exponents
# ---------------------------------------------------------------------------

def p3_pair_axes(rho0, n1, n2, gamma):
    L = crt.lueders_channel_qubitA
    return L(L(rho0, n1, gamma), n2, gamma), L(L(rho0, n2, gamma), n1, gamma)


def study_P():
    from run_phase2 import p3_input_states
    inputs = p3_input_states()
    small = (0.01, 0.02, 0.03, 0.04)
    rng_ = (0.05, 0.1, 0.2)
    rows = []

    def dG(rho0, th, g, plane):
        if plane == "xz":
            n1, n2 = np.array([0, 0, 1.0]), np.array([math.sin(th), 0, math.cos(th)])
        else:   # O1 = sigma_y, O2 in the x-y plane
            n1, n2 = np.array([0, 1.0, 0]), np.array([math.sin(th), math.cos(th), 0])
        a, b = p3_pair_axes(rho0, n1, n2, g)
        return crt.exact_psi(a)["G_eps_reg"] - crt.exact_psi(b)["G_eps_reg"]

    cases = [(nm, r0, "xz") for nm, r0 in inputs.items() if not nm.startswith("Bell")]
    cases.append(("tilted (1,0,1)/sqrt2 (x) I/2", inputs["tilted (1,0,1)/sqrt2 (x) I/2"], "xy"))
    for nm, r0, plane in cases:
        for g in (0.5, 1.0):
            ys = np.array([dG(r0, t, g, plane) for t in small])
            xs = np.array([commutator_norm(t) for t in small])
            k = ols(np.log(xs), np.log(np.abs(ys))) if np.all(np.abs(ys) > 1e-14) else {"slope": float("nan"), "R2": float("nan")}
            yr = np.array([dG(r0, t, g, plane) for t in rng_]) * DHAT * 0.5
            xr = np.array([commutator_norm(t) for t in rng_])
            fS = ols(xr, yr)
            rows.append({"input": nm, "plane": "O1 = sigma_z, O2 in x-z" if plane == "xz" else "O1 = sigma_y, O2 in x-y",
                         "gamma": g, "dG_small": ys.tolist(), "k_small": k["slope"], "k_R2": k["R2"],
                         "beta_theta_le_0.2": fS["slope"], "beta_norm": fS["slope"] / (0.5 * DHAT),
                         "dPsi_theta_0.2": float(yr[-1])})
    return {"small_thetas": list(small), "rows": rows}


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def write_report(R, path):
    P = R["params"]
    L = []
    a = L.append
    a("# CRT v11 Phase 3: referee follow-ups")
    a("")
    a(f"Generated by `python3 run_phase3.py` (master seed {P['master_seed']}), Python {P['python']}, numpy {P['numpy']}, scipy {P['scipy']}, "
      f"{P['workers']} worker processes, wall time {P['wall_time_s']:.0f} s. Settings as Phase 1 (primary rule, B = {P['B']}, D_hat = {DHAT:.2f}).")
    a("")
    F = R["F"]
    mc = F["mc"]
    a("## 1. Floor constant")
    a("")
    a(f"First-order prediction (Gaussian delta method, exact SIC covariance, {mc['n_mc']:.0e} Monte Carlo draws): N E[sqrt(I_hat1 I_hat2)] = "
      f"{mc['pred']:.3f} +/- {mc['pred_se']:.3f}; N E[I_hat] = {mc['E_N_Ihat']:.3f}.")
    a("")
    for nm, e in F["states"].items():
        a(f"### {nm} (I exact = {fmt(e['I_exact'])}, R12 exact = {fmt(e['R12_exact'])})")
        a("")
        a("| N | runs | mean R12 | N (R12 - R12_exact) +/- SE | max abs diff LI/MLE vs MLE/MLE pairing |")
        a("|---|---|---|---|---|")
        for p in e["points"]:
            a(f"| {p['N']:.0e} | {p['S']} | {fmt(p['R12_mean'])} | {p['N_R12_minus_exact']:.2f} +/- {p['N_R12_se']:.2f} | {fmt(p['max_abs_diff_pairings'])} |")
        a("")
        a("| Fit (SE-weighted, absolute sigma) | N range | a | b or offset | chi^2 / dof |")
        a("|---|---|---|---|---|")
        for lab, key in (("1e3 to 1e6", "fits"), ("1e4 to 1e6", "fits_N_ge_1e4")):
            f = e[key]
            a(f"| a N^-b + R12_exact | {lab} | {f['free_b']['a']:.2f} +/- {f['free_b']['a_se']:.2f} | b = {f['free_b']['b']:.4f} +/- {f['free_b']['b_se']:.4f} | {f['free_b']['chi2']:.1f} / {f['free_b']['dof']} |")
            a(f"| a/N + R12_exact | {lab} | {f['b1']['a']:.2f} +/- {f['b1']['a_se']:.2f} | (offset fixed {fmt(f['offset_fixed'])}) | {f['b1']['chi2']:.1f} / {f['b1']['dof']} |")
            a(f"| a/N + c (c free) | {lab} | {f['b1_free_offset']['a']:.2f} +/- {f['b1_free_offset']['a_se']:.2f} | c = {fmt(f['b1_free_offset']['offset'])} +/- {fmt(f['b1_free_offset']['offset_se'])} | {f['b1_free_offset']['chi2']:.1f} / {f['b1_free_offset']['dof']} |")
        pc = e["pooled_N_R12_N_ge_1e4"]
        a("")
        a(f"Pooled N (R12 - R12_exact) over N >= 1e4 (inverse-variance weighted): {pc['value']:.2f} +/- {pc['se']:.2f}; "
          f"difference from the first-order prediction {pc['value'] - mc['pred']:+.2f} ({(pc['value'] - mc['pred']) / math.hypot(pc['se'], mc['pred_se']):+.1f} sigma).")
        a("")
    G = R["GH"]
    a("## 2. Locally rotated Bell and |00> controls")
    a("")
    a(f"Aligned = the state as written in the computational basis (Bell aligned with the product SIC so that 4 outcomes have probability 0); "
      f"Haar k = U_A (x) U_B rho (U_A (x) U_B)^dag with seeded Haar-random U_A, U_B. {G['S_rot']} seeds per row. gap = LL(MLE) - LL(LI) "
      f"(cross-validated, nats). One-hot threshold for n = 2: gap > ln((1 - eta)/eta) = {G['one_hot_gap']:.3f} nats.")
    a("")
    a("| State | Rotation | N | n_active 1 / 2 | n_unique 1 / 2 | w_LI mean [min, max] | gap median [min, max] | C_eff | Psi (mean +/- SD) | R12 | median JSD(LI, MLE) | median max delta_i |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|")
    for r in G["rotation_rows"]:
        a(f"| {r['state']} | {r['rotation']} | {r['N']:.0e} | {r['n_active']['1']} / {r['n_active']['2']} | {r['n_unique']['1']} / {r['n_unique']['2']} | "
          f"{r['w_LI_mean']:.3g} [{r['w_LI_min']:.2g}, {r['w_LI_max']:.2g}] | {r['gap_median']:.1f} [{r['gap_min']:.1f}, {r['gap_max']:.1f}] | "
          f"{r['C_eff'][0]:.3f} | {r['psi'][0]:.4f} +/- {r['psi'][1]:.4f} | {r['R12'][0]:.4f} | {fmt(r['JSD_LI_MLE_median'])} | {fmt(r['delta_max_median'])} |")
    a("")
    a("## 3. LL gap distributions and the one-hot threshold")
    a("")
    a("| Case | runs | gap median | mean +/- SD | 5th to 95th percentile | min to max | P(abs gap > threshold) | P(n_active = 1) | w_LI median [min, max] | P(0.03 < w_LI < 0.97) | Psi |")
    a("|---|---|---|---|---|---|---|---|---|---|---|")
    for lab, g in G["gaps"].items():
        a(f"| {lab} | {g['S']} | {g['median']:.1f} | {g['mean']:.1f} +/- {g['sd']:.1f} | {g['p05']:.1f} to {g['p95']:.1f} | {g['min']:.1f} to {g['max']:.1f} | "
          f"{g['frac_one_hot']:.2f} | {g['frac_n_active1']:.2f} | {g['w_LI_median']:.3g} [{g['w_LI_min']:.2g}, {g['w_LI_max']:.2g}] | {g['frac_w_between_0.03_0.97']:.2f} | "
          f"{g['psi'][0]:.4f} +/- {g['psi'][1]:.4f} |")
    a("")
    a(f"With two models, w_LI = 1/(1 + e^gap). The weaker model drops below eta = 1e-6 (n_active = 1) when abs(gap) > {G['one_hot_gap']:.2f} nats; "
      f"weights lie in [0.03, 0.97] when abs(gap) < ln(0.97/0.03) = {math.log(0.97 / 0.03):.2f} nats.")
    a("")
    Pp = R["P"]
    a("## 4. P3 exponents and the sigma_y variant")
    a("")
    a(f"Exponent k: log-log fit of abs(G(rho12) - G(rho21)) against the commutator norm 2 sin(theta) over theta = {', '.join(str(t) for t in Pp['small_thetas'])}. "
      "beta: slope of the signed Psi difference (D_hat = 0.95, C_eff = 0.5) against the norm over theta = 0.05, 0.1, 0.2; beta_norm = beta/(R_inf x D_hat) with R_inf = 0.5.")
    a("")
    a("| Input | Operators | gamma | abs dG at theta = 0.01 / 0.02 / 0.03 / 0.04 | k (theta 0.01 to 0.04) | beta (theta <= 0.2) | beta_norm | dPsi at theta = 0.2 |")
    a("|---|---|---|---|---|---|---|---|")
    for r in Pp["rows"]:
        k = r["k_small"]
        ks = "n/a" if (isinstance(k, str) or (isinstance(k, float) and math.isnan(k))) else f"{k:.3f}"
        a(f"| {r['input']} | {r['plane']} | {r['gamma']} | {' / '.join(f'{abs(v):.2e}' for v in r['dG_small'])} | {ks} | {fmt(r['beta_theta_le_0.2'])} | "
          f"{r['beta_norm']:.4f} | {fmt(r['dPsi_theta_0.2'])} |")
    a("")
    with open(path, "w") as fh:
        fh.write("\n".join(L) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--workers", type=int, default=min(2, os.cpu_count() or 1))
    ap.add_argument("--report-only", action="store_true")
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    jn = os.path.join(OUT, "results3_quick.json" if args.quick else "results3.json")
    if args.report_only:
        with open(jn) as fh:
            R = json.load(fh)
        write_report(R, os.path.join(OUT, "REPORT3.md"))
        return
    q = args.quick
    S_mm, S_th, S_rot, B = (20, 10, 2, 6) if q else (3000, 1000, 20, 20)
    t0 = time.time()
    times = {}
    with Pool(args.workers) as pool:
        t = time.time(); Fr = study_F(pool, S_mm, S_th); times["F"] = time.time() - t
        print(f"study F done in {times['F']:.0f} s", flush=True)
        t = time.time(); GH = study_GH(pool, S_rot, B); times["GH"] = time.time() - t
        print(f"study G, H done in {times['GH']:.0f} s", flush=True)
    t = time.time(); Pp = study_P(); times["P"] = time.time() - t
    params = {"quick": q, "master_seed": MASTER_SEED3, "workers": args.workers, "python": platform.python_version(),
              "numpy": np.__version__, "scipy": scipy.__version__, "wall_time_s": time.time() - t0, "stage_times_s": times,
              "B": B, "S": {"floor_I/4": S_mm, "floor_thermal": S_th, "rotations": S_rot}}
    R = clean({"params": params, "F": Fr, "GH": GH, "P": Pp})
    with open(jn, "w") as fh:
        json.dump(R, fh, indent=1)
    write_report(R, os.path.join(OUT, "REPORT3_quick.md" if q else "REPORT3.md"))
    print(f"total {time.time() - t0:.0f} s")


if __name__ == "__main__":
    main()
