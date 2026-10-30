"""Referee: T2 failure explanations.
(b) bound: RA <= min(J_A, J_B) implies only f_resp <= J/I(r_A:r_B); with the
    selection J <= 0.05, I >= 0.1 this allows f_resp up to 0.5, so the
    window [-0.1, 0.1] was never implied. Failing points fail at the EXACT level.
(c) perfect agreement r_A = r_B = K independent of X: plug-in RA-hat = I-hat(X:K) >= 0,
    so the percentile interval cannot contain 0; failure rate of the rule at
    tau_RA = 1.97e-4, and a permutation test on the randomized X instead."""
import json, os, numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
R = json.load(open(os.path.join(HERE, "..", "results", "v12", "results_v12c.json")))
tau_RA = R["null"]["tau_RA"]
print("(b) E2 points selected by T2(b): exact f_resp vs bound J/I")
for r in R["rows"]:
    if r["env"] == "E2" and r["theta"] != "0" and r["J_A"] <= 0.05 and r["I_ab_do"] >= 0.1:
        f = r["RA"] / r["I_ab_do"]; bnd = min(r["J_A"], r["J_B"]) / r["I_ab_do"]
        flag = "  <-- exact f outside [-0.1,0.1]" if abs(f) > 0.1 else ""
        print(f"   phi={r['phi']} theta={r['theta']} m={r['m']} {r['obs']:8s} f={f:+.3f} bound={bnd:.3f}{flag}")

def H(p):
    p = p[p > 0]; return -(p * np.log2(p)).sum(-1) if p.ndim == 1 else None

def ra_from_counts(c):  # c: (..., 2, 2, 2)
    def Hn(a, ax):
        n = a.sum(ax, keepdims=True); p = a / n
        with np.errstate(divide="ignore", invalid="ignore"):
            return np.where(p > 0, -p * np.log2(np.where(p > 0, p, 1)), 0).sum(ax)
    ab = c.sum(-3); xa = c.sum(-1); xb = c.sum(-2)
    a = ab.sum(-1); b = ab.sum(-2); x = xa.sum(-1)
    Iab = Hn(a, -1) + Hn(b, -1) - Hn(ab.reshape(ab.shape[:-2] + (4,)), -1)
    Iabx = Hn(xa.reshape(xa.shape[:-2] + (4,)), -1) + Hn(xb.reshape(xb.shape[:-2] + (4,)), -1) \
        - Hn(c.reshape(c.shape[:-3] + (8,)), -1) - Hn(x, -1)
    return Iab - Iabx

rng = np.random.default_rng(20261103)
N, D, B, NP = 10_000, 300, 400, 400
P = np.zeros((2, 2, 2)); P[:, 0, 0] = 0.25; P[:, 1, 1] = 0.25    # r_A = r_B = K, K independent of X
fail_rule = 0; pvals = []
for d in range(D):
    c = rng.multinomial(N, P.ravel()).reshape(2, 2, 2)
    bs = rng.multinomial(N, c.ravel() / N, size=B).reshape(B, 2, 2, 2)
    ra_b = ra_from_counts(bs.astype(float))
    lo, hi = np.percentile(ra_b, [2.5, 97.5])
    if not ((lo <= 0 <= hi) or hi < tau_RA):
        fail_rule += 1
    # permutation test of X independent of (r_A, r_B): shuffle X labels across shots
    xs = np.repeat([0, 1], c.sum((1, 2))); ab = np.concatenate([np.repeat(np.arange(4), c[x].ravel()) for x in (0, 1)])
    obs = ra_from_counts(c.astype(float))
    perm = []
    for _ in range(NP):
        xp = rng.permutation(xs); cc = np.zeros((2, 4)); np.add.at(cc, (xp, ab), 1)
        perm.append(ra_from_counts(cc.reshape(2, 2, 2)))
    pvals.append((1 + np.sum(np.array(perm) >= obs)) / (NP + 1))
pvals = np.array(pvals)
print(f"(c) perfect-agreement common cause, {D} datasets of N={N}: pre-registered rule (CI contains 0 or hi < tau_RA={tau_RA:.2e}) "
      f"FAILS in {fail_rule / D:.0%} of datasets")
print(f"    permutation test of X vs (r_A,r_B): false-positive rate at alpha=0.05: {np.mean(pvals <= 0.05):.3f}, at 0.01: {np.mean(pvals <= 0.01):.3f}")
