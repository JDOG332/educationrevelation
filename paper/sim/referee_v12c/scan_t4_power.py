"""Referee: T4 in the regime where the H4 rule has power (signals >= 0.1 bit):
small h_S, larger g, J up to 4, fragments up to m = 3, t up to 6. Reports the
largest absolute gap, the largest relative gap among points with max >= 0.1,
and how many points break |gap| <= 0.1 and a stricter |gap| <= 0.05."""
import sys, time, numpy as np
from e4core import Chain, e4_point
T = [0.25 * k for k in range(1, 25)]
ne = int(sys.argv[1]) if len(sys.argv) > 1 else 10
configs = [(g, J, h) for g in (1.0, 2.0) for J in (1.0, 2.0, 4.0) for h in (0.25, 0.5)]
if ne > 10:
    configs = [(1.0, 1.0, 0.25), (1.0, 1.0, 1.0)]
t0 = time.time(); allrows = []
for g, J, h in configs:
    ch = Chain(ne, g=g, J=J, h=h)
    rows = []
    for t in T:
        for m in ((1, 2, 3) if ne <= 10 else (1, 2)):
            for o in ("Helstrom", "Local"):
                p = e4_point(ch, t, m, o)
                rows.append((g, J, h, t, m, o, p["RA"], p["Im"]))
    cnt = [r for r in rows if max(r[6], r[7]) >= 0.1]
    g1 = max(cnt, key=lambda r: abs(r[6] - r[7])) if cnt else None
    rel = max(cnt, key=lambda r: abs(r[6] - r[7]) / max(r[6], r[7])) if cnt else None
    print(f"g={g} J={J} h={h}: counted {len(cnt)}, viol>0.1: {sum(abs(r[6]-r[7])>0.1 for r in cnt)}, "
          f">0.05: {sum(abs(r[6]-r[7])>0.05 for r in cnt)}; worst abs {None if g1 is None else tuple(round(x,3) if isinstance(x,float) else x for x in g1[3:])}; "
          f"worst rel {None if rel is None else tuple(round(x,3) if isinstance(x,float) else x for x in rel[3:])}", flush=True)
    allrows += rows
cnt = [r for r in allrows if max(r[6], r[7]) >= 0.1]
print(f"N_E={ne}: {len(cnt)} counted points; violations of 0.1-bit rule: {sum(abs(r[6]-r[7])>0.1 for r in cnt)}; "
      f"max gap {max(abs(r[6]-r[7]) for r in cnt):.3f}; elapsed {time.time()-t0:.0f}s")
np.save(f"scan_t4_power_N{ne}.npy", np.array([[r[0], r[1], r[2], r[3], r[4], r[5] == 'Helstrom', r[6], r[7]] for r in allrows]))
