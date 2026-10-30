"""Reproduce T4 cells independently and compare with results_v12c.json."""
import json, os, sys, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from e4core import Chain, e4_point
R = json.load(open(os.path.join(os.path.dirname(__file__), "..", "results", "v12", "results_v12c.json")))
e4 = R["e4"]
maxd = 0; maxdIm = 0; cnt = 0
for J in (0.0, 1.0):
    for h in (0.0, 0.25, 1.0):
        ch = Chain(10, J=J, h=h)
        for r in [r for r in e4 if r["J"] == J and r["h_S"] == h]:
            p = e4_point(ch, r["t"], r["m"], r["obs"])
            maxd = max(maxd, abs(p["RA"] - r["RA"])); maxdIm = max(maxdIm, abs(p["Im"] - r["Im_rec_S"])); cnt += 1
            if r["t"] in (1.5, 1.75) and r["m"] == 2 and h == 1.0:
                print(f"J={J} h={h} t={r['t']} m={r['m']} {r['obs']}: mine RA={p['RA']:.4f} Im={p['Im']:.4f} | theirs RA={r['RA']:.4f} Im={r['Im_rec_S']:.4f}")
print(f"{cnt} points; max |RA mine - theirs| = {maxd:.2e}; max |Im mine - theirs| = {maxdIm:.2e}")
# largest gap among h>0
gaps = []
for J in (1.0,):
    for h in (0.25, 1.0):
        ch = Chain(10, J=J, h=h)
        for t in [0.25 * k for k in range(1, 13)]:
            for m in (1, 2):
                for o in ("Helstrom", "Local"):
                    p = e4_point(ch, t, m, o)
                    gaps.append((abs(p["RA"] - p["Im"]), max(p["RA"], p["Im"]) >= 0.1, J, h, t, m, o))
print("largest counted gap:", max(g for g in gaps if g[1]))
print("largest uncounted gap:", max(g for g in gaps if not g[1]))
