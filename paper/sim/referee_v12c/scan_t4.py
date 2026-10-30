"""Referee: T4 outside the pre-registered grid (N_E = 10 unless stated).
H4 rule as pre-registered: |RA - Im_rec| <= 0.1 bit wherever max(RA, Im_rec) >= 0.1."""
import sys, time, numpy as np
from e4core import Chain, e4_point
T = [0.25 * k for k in range(1, 25)]           # t up to 6 (grid stopped at 3)
configs = [  # (g, J, h_S)
    (1.0, 1.0, 1.0), (1.0, 1.0, 2.0), (1.0, 1.0, 4.0),
    (1.0, 0.25, 1.0), (1.0, 0.5, 1.0), (1.0, 2.0, 1.0), (1.0, 4.0, 1.0),
    (0.5, 1.0, 1.0), (2.0, 1.0, 1.0), (0.3, 1.0, 0.5), (1.0, 2.0, 2.0), (0.5, 2.0, 0.5),
]
ne = int(sys.argv[1]) if len(sys.argv) > 1 else 10
t0 = time.time()
worst_all = []
for g, J, h in configs:
    ch = Chain(ne, g=g, J=J, h=h)
    rows = []
    for t in T:
        for m in (1, 2):
            for o in ("Helstrom", "Local"):
                p = e4_point(ch, t, m, o)
                rows.append((t, m, o, p["RA"], p["Im"]))
    cnt = [r for r in rows if max(r[3], r[4]) >= 0.1]
    gaps = [abs(r[3] - r[4]) for r in cnt]
    viol = [r for r in cnt if abs(r[3] - r[4]) > 0.1]
    viol_t3 = [r for r in viol if r[0] <= 3.0]
    # qualitative mismatch: one >= 0.05, other < half of it, or opposite sign
    qual = [r for r in rows if max(abs(r[3]), abs(r[4])) >= 0.05 and
            (r[3] * r[4] < 0 or min(abs(r[3]), abs(r[4])) < 0.5 * max(abs(r[3]), abs(r[4])))]
    w = max(cnt, key=lambda r: abs(r[3] - r[4])) if cnt else None
    print(f"g={g} J={J} h_S={h}: counted {len(cnt)}/{len(rows)}, max counted gap "
          f"{max(gaps) if gaps else 0:.3f}, violations {len(viol)} (t<=3: {len(viol_t3)}), "
          f"qualitative mismatches {len(qual)}; worst {tuple(round(v, 3) if isinstance(v, float) else v for v in w) if w else '-'}",
          flush=True)
    worst_all += viol
print(f"N_E={ne}; total violations of the H4 rule outside the grid: {len(worst_all)}; elapsed {time.time()-t0:.0f}s")
for r in sorted(worst_all, key=lambda r: -abs(r[3] - r[4]))[:8]:
    print("   ", tuple(round(v, 3) if isinstance(v, float) else v for v in r))
