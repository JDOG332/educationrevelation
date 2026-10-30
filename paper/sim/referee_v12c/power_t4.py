"""Referee: discriminating power of the H4 rule on the pre-registered J = 1 cells (from results_v12c.json).
Would trivial or unrelated 'predictors' of Im_rec(S) also pass the same rule?"""
import json, os, numpy as np
R = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "results", "v12", "results_v12c.json")))
e4 = [r for r in R["e4"] if r["h_S"] > 0 and r["J"] == 1.0]
preds = {"RA (author)": lambda r: r["RA"], "zero": lambda r: 0.0, "C_rec (records only, P_nat)": lambda r: r["C_rec"],
         "I(r_A:r_B) under P_do": lambda r: r["I_ab_do"], "J_A = I(X:r_A)": lambda r: r["J_A"],
         "min(J_A,J_B)": lambda r: min(r["J_A"], r["J_B"])}
print("J=1 cells, h_S in {0.25,1}: max over rows where max(pred, Im) >= 0.1 of |pred - Im|; #violations (>0.1)")
for nm, f in preds.items():
    gaps = [abs(f(r) - r["Im_rec_S"]) for r in e4 if max(f(r), r["Im_rec_S"]) >= 0.1]
    print(f"  {nm:30s} counted {len(gaps):3d}  max gap {max(gaps) if gaps else 0:.3f}  violations {sum(g > 0.1 for g in gaps)}")
mx = max(max(r["RA"], r["Im_rec_S"]) for r in e4)
print(f"largest max(RA, Im) on J=1, h_S>0 rows: {mx:.3f} bit")
ra = np.array([r["RA"] for r in e4]); im = np.array([r["Im_rec_S"] for r in e4])
print(f"J=1, h_S>0: Pearson r(RA, Im) = {np.corrcoef(ra, im)[0,1]:.3f}; median |gap|/max(|RA|,|Im|) over rows with max>=0.02: "
      f"{np.median([abs(a-b)/max(abs(a),abs(b)) for a,b in zip(ra,im) if max(abs(a),abs(b))>=0.02]):.2f}")
# sign disagreement
print("rows with opposite signs and max(|RA|,|Im|) >= 0.01:", sum(1 for a, b in zip(ra, im) if a * b < 0 and max(abs(a), abs(b)) >= 0.01))
# TYZ quantum vs records-level
tq = [(r["TYZ_quantum"], r["Im_rec_S"], r["RA"]) for r in e4 if r.get("TYZ_quantum") is not None]
print("J=1: TYZ quantum Im(F:F'|S) min/max:", round(min(x[0] for x in tq), 3), round(max(x[0] for x in tq), 3),
      "; fraction negative:", round(np.mean([x[0] < 0 for x in tq]), 2))
