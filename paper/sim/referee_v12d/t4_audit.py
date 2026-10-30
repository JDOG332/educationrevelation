"""Referee check (phase 4): what does the T4 FLOOR rule actually detect?

Works from results_v12d.json only (no recomputation).
1. Applies the pre-registered T4 rule to the exactly solvable product law D_ref with per-site rate xi
   (N_E = 8 vs 12, m = N_E/2) to find the rate below which an exponentially decaying deficit is called FLOOR.
2. Applies the rule to the derivable (product) cells that the run excluded from the counts.
3. For every eligible open (cell, t), computes the product-law prediction from that state's own measured
   single-site rates (D_ref at the best half fragment's x and x_E) and cross-tabulates observed vs predicted class.
4. Counts inhomogeneous-g cells where d12 > d8 (impossible for nested couplings under monotone imprinting;
   arises because g_k is redrawn per N_E).
"""
import json
import math
import os
import sys
from collections import Counter

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import run_v12d as d  # noqa: E402  (only d_ref, t4_class: closed-form helpers)

R = json.load(open(os.path.join(HERE, "..", "results", "v12", "results_v12d.json")))
states = R["states"]

print("1. Product law under the T4 rule (m = N/2, N = 8 vs 12)")
xs = np.linspace(0.005, 0.6, 600)
cls = [d.t4_class(float(d.d_ref(4 * x, 8 * x)), float(d.d_ref(6 * x, 12 * x))) for x in xs]
thr = max(x for x, c in zip(xs, cls) if c == "FLOOR")
print(f"   product law (decays to 0 exponentially) is classified FLOOR for every xi <= {thr:.3f} nats")
for x in (0.04, 0.1, 0.15, 0.3, 0.5):
    a, b = float(d.d_ref(4 * x, 8 * x)), float(d.d_ref(6 * x, 12 * x))
    print(f"   xi={x:.2f}: d8={a:.3f} d12={b:.3f} ratio={b / a:.3f} -> {d.t4_class(a, b)}")


def t4_points(models, open_flag):
    pts = {}
    for r in states:
        if r["model"] not in models or r["open"] != open_flag:
            continue
        key = (r["model"], r["tcell"], r.get("t"))
        pts.setdefault(key, {})[r["N"]] = r
    return pts


def predicted(r):
    N = r["N"]
    return float(d.d_ref(r["best_x"][N // 2 - 1], r["xE"]))


print("\n2. Derivable product cells (excluded from the counts) under the T4 rule")
for mdl in ("M2", "M4"):
    pts = t4_points((mdl,), False)
    c = Counter()
    for key, byN in pts.items():
        if not all(N in byN for N in (8, 10, 12)) or any(byN[N]["SS"] < 0.5 for N in (8, 10, 12)):
            continue
        d8, d12 = byN[8]["best_d"][3], byN[12]["best_d"][5]
        c[d.t4_class(d8, d12)] += 1
    print(f"   {mdl} derivable (cell, t) points: {dict(c)}")

print("\n3. Open cells: observed class vs product-law prediction from the state's own single-site rates")
for mdl in ("M2", "M4", "M3"):
    pts = t4_points((mdl,), True)
    tab = Counter()
    xi_floor = []
    n_elig = 0
    if mdl == "M3":
        g = {}
        for key, byN in pts.items():
            pass
        # M3: median over draws, per (tcell)
        grp = {}
        for r in states:
            if r["model"] == "M3":
                grp.setdefault((r["tcell"], r["N"]), []).append(r)
        cells = {tc for (tc, N) in grp}
        for tc in cells:
            if not all((tc, N) in grp for N in (8, 10, 12)):
                continue
            if any(np.median([x["SS"] for x in grp[(tc, N)]]) < 0.5 for N in (8, 10, 12)):
                continue
            n_elig += 1
            o8 = np.median([x["best_d"][3] for x in grp[(tc, 8)]])
            o12 = np.median([x["best_d"][5] for x in grp[(tc, 12)]])
            p8 = np.median([predicted(x) for x in grp[(tc, 8)]])
            p12 = np.median([predicted(x) for x in grp[(tc, 12)]])
            tab[(d.t4_class(o8, o12), d.t4_class(p8, p12))] += 1
    else:
        for key, byN in pts.items():
            if not all(N in byN for N in (8, 10, 12)) or any(byN[N]["SS"] < 0.5 for N in (8, 10, 12)):
                continue
            n_elig += 1
            o = d.t4_class(byN[8]["best_d"][3], byN[12]["best_d"][5])
            p = d.t4_class(predicted(byN[8]), predicted(byN[12]))
            tab[(o, p)] += 1
            if o == "FLOOR":
                xi_floor.append(np.mean(byN[12]["xi"]))
    print(f"   {mdl}: {n_elig} eligible points; (observed, product-law-predicted) counts:")
    for k, v in sorted(tab.items()):
        print(f"      {k}: {v}")
    if xi_floor:
        print(f"      mean single-site rate at N=12 in observed-FLOOR points: median {np.median(xi_floor):.3f}, "
              f"p90 {np.percentile(xi_floor, 90):.3f} nats")

print("\n4. Inhomogeneous g_k (redrawn per N_E): eligible M2 (cell, t) points with d12 > d8")
for gopt in ("hom", "inh"):
    pts = t4_points(("M2",), True)
    n = up = fl = 0
    for (mdl, tc, t), byN in pts.items():
        if f"|{gopt}|" not in tc + "|":
            continue
        if not all(N in byN for N in (8, 10, 12)) or any(byN[N]["SS"] < 0.5 for N in (8, 10, 12)):
            continue
        n += 1
        if byN[12]["best_d"][5] > byN[8]["best_d"][3]:
            up += 1
    print(f"   g={gopt}: {up} of {n} points have d12 > d8")
gk = {N: (1.0 + 0.3 * np.random.default_rng(d.seed(1, N)).normal(size=N)) for N in (8, 10, 12)}
for N, g in gk.items():
    print(f"   inhomogeneous g_k at N={N}: mean {g.mean():.3f}, first 4 {np.round(g[:4], 3).tolist()}")
