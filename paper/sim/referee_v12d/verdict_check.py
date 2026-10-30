"""Referee check (phase 4): do the verdicts follow the pre-stated rules, and which outcomes were reachable?

Works from results_v12d.json and the run's own rule functions.
"""
import json
import math
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import run_v12d as d  # noqa: E402

R = json.load(open(os.path.join(HERE, "..", "results", "v12", "results_v12d.json")))

print("T3 reachable outcomes")
m4 = [r for r in R["states"] if r["model"] == "M4" and r["open"]]
per_cell = {}
for r in m4:
    per_cell.setdefault(r["cell"], 0)
    per_cell[r["cell"]] += 1
print(f"   M4 main: {len(per_cell)} open cells, states per cell = {set(per_cell.values())} (< MIN_STATES = {d.MIN_STATES})"
      " -> M4 is INCONCLUSIVE whatever the data")
for m2v in ("COLLAPSE", "COLLAPSE UP TO PREFACTOR", "PARTIAL", "NO COLLAPSE", "INCONCLUSIVE"):
    mv = {"M2": {"verdict": m2v, "med_r": 0.1}, "M4": {"verdict": "INCONCLUSIVE", "med_r": 0.0}}
    print(f"   if M2 = {m2v:26s} -> overall (run's precedence) = {d.overall_t3(mv)}")
print("   Alternative reading (any INCONCLUSIVE model makes the overall INCONCLUSIVE): overall = INCONCLUSIVE")
r2 = {}
for r in R["states"]:
    if r["model"] == "M2R" and r["N"] == 10:
        r2[r["cell"]] = 1
print(f"   R grid: M2 at N_E = 10 has {len(r2)} cells (< 10 -> INCONCLUSIVE by construction); M4R cells hold one state"
      " -> T3-R is INCONCLUSIVE by construction, so T3 could never be ROBUST")

print("\nT3 sign: per-cell median r in M2")
med = [c["med_r"] for c in R["T3_cells"]["M2"].values() if c.get("elig")]
print(f"   {len(med)} cells; median {np.median(med):+.3f}; frac < 0 {np.mean(np.array(med) < 0):.3f}; "
      f"IQR [{np.percentile(med, 25):+.3f}, {np.percentile(med, 75):+.3f}]")

print("\nT4/S")
for k, v in R["T4"].items():
    print(f"   main {k}: counts {v['counts']}, frac FLOOR {v['frac_FLOOR']:.3f}, frac DECAY {v['frac_DECAY']:.3f}")
print(f"   S rule: SUPPORTED needs >= 2 models with FLOOR >= 0.5: none -> {d.s_verdict(R['T4'])}")
cons = {}
for r in R["states"]:
    if r["model"] in ("M2R", "M4R"):
        cons[r["tcell"]] = r["conserving"]
print(f"   R grid cells pointer-conserving: {sum(cons.values())} of {len(cons)} (all non-conserving: "
      f"h_S in {{0.5, 1}} with VC; lambda in {{0.25, 0.6}})")
print(f"   R verdict {R['R']['S']}, main {R['S_main']} -> S_final {R['S_final']}")

print("\nT5/H5")
rows = R["T5"]["rows"]
sel = [r for r in rows if r["model"] in ("M2", "M4") and 0.001 <= r["delta"] <= 0.9]
k1 = [r for r in sel if r["k"] == 1]
print(f"   eligible {len(sel)}, of which k = 1: {len(k1)} (log ratio identically "
      f"{max(abs(math.log(r['delta'] / r['delta_ci'])) for r in k1):.1e}: a single record is trivially its own CI law)")
prod = [r for r in sel if not r["open"]]
print(f"   product M4 point (lambda = mu = 0) rows in H5: {len(prod)}")
for lab, S_ in (("as run", sel), ("k>=2", [r for r in sel if r["k"] >= 2]),
                ("k>=2, open", [r for r in sel if r["k"] >= 2 and r["open"]])):
    ok = [abs(math.log(r["delta"] / r["delta_ci"])) <= math.log(1.25) for r in S_]
    print(f"   {lab:12s}: n = {len(S_)}, frac within ln1.25 = {np.mean(ok):.3f} -> "
          f"{'SUPPORTED' if np.mean(ok) >= 0.9 else 'NOT SUPPORTED'}")
hel = [r for r in sel if r["obs"] == "Helstrom" and r["k"] >= 2 and r["open"]]
loc = [r for r in sel if r["obs"] == "Local" and r["k"] >= 2 and r["open"]]
for lab, S_ in (("Helstrom", hel), ("Local", loc)):
    lr = [math.log(r["delta"] / r["delta_ci"]) for r in S_]
    print(f"   {lab}: median log(delta/delta_ci) = {np.median(lr):+.3f}, frac > 0 = {np.mean(np.array(lr) > 0):.3f}")

print("\nT2")
print(f"   (d) rows: {[(x['cell'], x['C1'], x['C2']) for x in R['T2']['d']['rows']][:6]}")
print("   verdict FAIL is the rule applied to a wrong prediction (C1 was predicted to fail and passes)")

print("\nT3c")
print(f"   d* = {sorted(set(v['d_star'] for v in R['T3c']['d_star'].values()))} in all cells: the pass fraction is already"
      " ~0 at the smallest non-zero depth, so the grid does not resolve a crossover")

print("\nT6(c) prior")
print(f"   {R['T6']['prior']}")
