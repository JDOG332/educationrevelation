"""Referee check, part 4: the pre-registration's 'no-gap' step uses chi <= T for two
equiprobable states (Holevo quantity vs trace distance). Random and optimized search."""
import numpy as np
from scipy.optimize import minimize
rng = np.random.default_rng(31337)
def S(r):
    e = np.linalg.eigvalsh(r); e = e[e > 1e-14]; return float(-(e*np.log2(e)).sum())
def st(x, d, k):
    G = (x[:d*k] + 1j*x[d*k:]).reshape(d, k); r = G@G.conj().T; return r/np.trace(r).real
def gap(x, d, k):
    n = 2*d*k; r0, r1 = st(x[:n], d, k), st(x[n:], d, k)
    chi = S((r0+r1)/2) - (S(r0)+S(r1))/2
    T = 0.5*np.abs(np.linalg.eigvalsh(r0-r1)).sum()
    return T - chi
worst = (9, None)
for d in (2, 3, 4):
    for k in (1, 2, d):
        for _ in range(60):
            x0 = rng.normal(size=4*d*k)
            res = minimize(gap, x0, args=(d, k), method="Nelder-Mead", options={"maxiter": 3000, "xatol":1e-9,"fatol":1e-12})
            if res.fun < worst[0]: worst = (res.fun, (d, k))
print(f"min over optimized searches of T - chi: {worst[0]:.3e} at (d, rank) = {worst[1]}  (negative would refute chi <= T)")
