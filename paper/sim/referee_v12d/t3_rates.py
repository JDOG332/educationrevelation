"""Referee check (phase 4), T3: would a cluster- or fragment-level rate collapse the data?

Same states, same eligibility window, same C1/C2 and cell rule as the pre-registration (Section 5, T3), on
M2 at N_E = 8 (all main open cells, all 16 times, exhaustive fragments) and M4 at N_E = 8 (per state).
Three choices of the budget variable x(F) in r(F) = ln[delta_chi(F) / D_ref(x(F); x_E)]:
  single : sum of single-site Chernoff rates (the pre-registered D5; reproduces the run)
  pair   : F split into maximal contiguous runs, each run cut into consecutive pairs (last site alone if odd);
           x = sum of the Chernoff informations of these <=2-site clusters; x_E the same for E
  frag   : x = xi(F), the quantum Chernoff information of the fragment's two pointer-conditional states;
           x_E = xi(E) (= -ln|<E_0|E_1>|^2, the branches on E are pure)
'frag' is NOT a non-circular local test (it uses the fragment itself); it asks whether the deficit is a
single function of the fragment's own distinguishability, which is what ZRZ/Zwolak 2022 assert for
product environments.
"""
import json
import math
import os
import sys
import time
from multiprocessing import Pool

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
sys.path.insert(0, HERE)
import run_v12d as d  # noqa: E402  (State engine, model builders, d_ref: verified in reproduce.py)
import ref_core as rc  # noqa: E402  (independent Chernoff routine)

N = 8
FR = [F for m in range(1, N) for F in rc.all_frags(N, m)]


def pieces(F):
    F = sorted(F)
    runs, cur = [], [F[0]]
    for k in F[1:]:
        if k == cur[-1] + 1:
            cur.append(k)
        else:
            runs.append(cur); cur = [k]
    runs.append(cur)
    out = []
    for r in runs:
        for i in range(0, len(r), 2):
            out.append(tuple(r[i:i + 2]))
    return out


def analyse_state(psi):
    st = d.State(psi, N)
    SS = st.SS
    cache = {}

    def xi(F):
        F = tuple(F)
        if F not in cache:
            cache[F] = rc.qcb_nats(*st.cond(list(F)))
        return cache[F]
    E = tuple(range(1, N + 1))
    b0, b1 = st.T[0].reshape(-1), st.T[1].reshape(-1)
    ov = abs(np.vdot(b0, b1)) ** 2
    xE = {"single": sum(xi((k,)) for k in E), "pair": sum(xi(p) for p in pieces(E)),
          "frag": min(40.0, -math.log(max(ov, 1e-300)))}
    rows = []
    for F in FR:
        chi = st.info(list(F))[0]
        dd = (SS - chi) / SS
        rows.append((dd, sum(xi((k,)) for k in F), sum(xi(p) for p in pieces(F)), xi(F)))
    return SS, xE, np.array(rows)


def state_eval(SS, xE, rows, var):
    col = {"single": 1, "pair": 2, "frag": 3}[var]
    if SS < 0.5:
        return None
    dd, x = rows[:, 0], rows[:, col]
    mk = (dd >= 1e-4) & (dd <= 0.5) & (x >= 0.05)
    if mk.sum() < 10:
        return None
    ref = np.array([float(d.d_ref(xx, xE[var])) for xx in x[mk]])
    r = np.log(dd[mk] / np.maximum(ref, 1e-300))
    med = float(np.median(r))
    q1, q2 = float(np.quantile(np.abs(r), 0.95)), float(np.quantile(np.abs(r - med), 0.95))
    return (q1 <= math.log(1.25), q2 <= math.log(1.25), med, q2)


def job_m2(args):
    J, hS, gopt, V = args
    Vs = d.m2_evolve(N, J, hS, gopt, V, 4.0, 16)
    out = []
    for i in range(1, 17):
        psi = (Vs[i][:, 0] + Vs[i][:, 1]) / math.sqrt(2)
        out.append(analyse_state(psi))
    return args, out


def job_m4(args):
    gtn, lt, mun = args
    return args, [analyse_state(d.m4_run(N, d.M4_GT[gtn], lt, d.M4_MU[mun], d.PLUS))]


if __name__ == "__main__":
    t0 = time.time()
    m2 = [(J, hS, g, V) for J in d.M2_J for hS in d.M2_HS for g in d.M2_G for V in d.M2_V
          if not (J == 0 and hS == 0 and V == "V0")]
    m4 = [(gt, lt, mu) for gt in d.M4_GT for lt in d.M4_LT for mu in d.M4_MU if not (lt == 0 and mu == "0")]
    with Pool(2) as P:
        R2 = P.map(job_m2, m2)
        R4 = P.map(job_m4, m4)
    print(f"M2 N_E=8: {len(m2)} open cells x 16 times; M4 N_E=8: {len(m4)} open states  (wall {time.time() - t0:.0f} s)")
    summary = {}
    for var in ("single", "pair", "frag"):
        cells = []
        for args, sts in R2:
            ev = [state_eval(*s, var) for s in sts]
            ev = [e for e in ev if e is not None]
            if len(ev) < 3:
                continue
            c1 = np.mean([e[0] for e in ev]) >= 0.8
            c2 = np.mean([e[1] for e in ev]) >= 0.8
            cells.append((args, c1, c2, float(np.median([e[2] for e in ev])), float(np.median([e[3] for e in ev]))))
        n = len(cells)
        f1 = np.mean([c[1] for c in cells]); f2 = np.mean([c[2] for c in cells])
        cons = [c for c in cells if c[0][1] == 0 and d.M2_V[c[0][3]]["hy"] == 0]
        ncon = [c for c in cells if c not in cons]
        print(f"\n[{var}] M2: {n} eligible cells; frac C1 {f1:.3f}, frac C2 {f2:.3f}; median r {np.median([c[3] for c in cells]):+.3f}; "
              f"median per-cell q95|r-med| {np.median([c[4] for c in cells]):.3f} (tol {math.log(1.25):.3f})")
        for lab, cc in (("conserving", cons), ("non-conserving", ncon)):
            if cc:
                print(f"     {lab:15s}: {len(cc)} cells, frac C2 {np.mean([c[2] for c in cc]):.3f}, "
                      f"median r {np.median([c[3] for c in cc]):+.3f}, median q95|r-med| {np.median([c[4] for c in cc]):.3f}")
        ev4 = [state_eval(*s, var) for _, sts in R4 for s in sts]
        ev4 = [e for e in ev4 if e is not None]
        print(f"     M4 per state: {len(ev4)} eligible, frac C1 {np.mean([e[0] for e in ev4]):.3f}, "
              f"frac C2 {np.mean([e[1] for e in ev4]):.3f}, median r {np.median([e[2] for e in ev4]):+.3f}, "
              f"median q95|r-med| {np.median([e[3] for e in ev4]):.3f}")
        summary[var] = dict(M2_cells=n, M2_C1=float(f1), M2_C2=float(f2), M4_states=len(ev4),
                            M4_C2=float(np.mean([e[1] for e in ev4])))
    # additivity diagnostic: ratio xi(F)/sum xi_k on M2 states
    rat = []
    for args, sts in R2:
        for SS, xE, rows in sts:
            mk = rows[:, 1] > 0.05
            rat.append(np.median(rows[mk, 3] / rows[mk, 1]) if mk.any() else np.nan)
    rat = np.array(rat)
    print(f"\nadditivity: median over M2 states of median_F xi(F) / sum_k xi_k = {np.nanmedian(rat):.3f} "
          f"(p10 {np.nanpercentile(rat, 10):.3f}, p90 {np.nanpercentile(rat, 90):.3f}); <1 = subadditive local rates")
    json.dump(summary, open(os.path.join(HERE, "t3_rates.json"), "w"), indent=1)
    print(f"(wall {time.time() - t0:.0f} s)")
