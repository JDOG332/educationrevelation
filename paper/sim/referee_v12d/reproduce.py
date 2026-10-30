"""Referee check (phase 4): independent reproduction of key numbers with ref_core (no run_v12* engine).

Compared against results_v12d.json.
"""
import itertools
import json
import math
import os
import sys
import time

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ref_core as rc  # noqa: E402

R = json.load(open(os.path.join(HERE, "..", "results", "v12", "results_v12d.json")))
ST = R["states"]


def stored(model, **kw):
    out = [r for r in ST if r["model"] == model and all(r.get(k) == v for k, v in kw.items())]
    return out


def gk(N, opt):
    if opt == "hom":
        return np.ones(N)
    rng = np.random.default_rng(np.random.SeedSequence((20261104, 1, N)))
    return 1.0 + 0.3 * rng.normal(size=N)


t0 = time.time()
print("A. Product law, M1(a) theta = pi/4, N_E = 12: delta_chi(m) from dense partial traces vs D7 and stored")
N, th = 12, math.pi / 4
e0 = np.zeros(2 ** N, complex); e0[0] = 1
v = np.array([math.cos(th), math.sin(th)], complex)
e1 = np.array([1.0 + 0j])
for _ in range(N):
    e1 = np.kron(e1, v)
psi = np.concatenate([e0, e1]) / math.sqrt(2)
SS = rc.S_bits(rc.rhoS(psi, N))
Bs = rc.branches(psi, N)
xi = -math.log(math.cos(th) ** 2)
st = stored("M1a", N=12, theta="pi/4")[0]
worst = 0.0
for m in range(1, N):
    F = list(range(1, m + 1))
    dchi = 1 - rc.chi_frag(Bs, F, N) / SS
    ref = rc.dref(m * xi, N * xi)
    worst = max(worst, abs(dchi - ref), abs(dchi - st["best_d"][m - 1]))
    if m in (1, 3, 6, 9, 11):
        print(f"   m={m:2d}: mine {dchi:.12f}  D_ref {ref:.12f}  stored {st['best_d'][m - 1]:.12f}")
print(f"   max |mine - D_ref|, |mine - stored| over m: {worst:.2e}")

print("\nB. Chain cells: best half-size deficit vs N_E (exhaustive at every N_E, incl. all 924 at N_E = 12)")
cells = [(1.0, 0.25, "hom", "VC", 2.0), (1.0, 0.0, "hom", "V0", 2.0), (1.0, 0.75, "hom", "VB", 1.0),
         (2.0, 0.75, "hom", "V0", 1.5)]
for (J, hS, g, var, t) in cells:
    row = []
    for N in (8, 10, 12):
        psi = rc.chain_state(N, J, hS, gk(N, g), var, t)
        SS = rc.S_bits(rc.rhoS(psi, N))
        Bs = rc.branches(psi, N)
        m = N // 2
        best = min(1 - rc.chi_frag(Bs, F, N) / SS for F in rc.all_frags(N, m))
        s = [r for r in stored("M2", N=N, J=J, hS=hS, g=g, V=var) if abs(r["t"] - t) < 1e-9][0]
        row.append((N, best, s["best_d"][m - 1], s["SS"], SS))
    print(f"   J={J} hS={hS} {g} {var} t={t}:")
    for (N, b, sb, sss, ss) in row:
        print(f"      N={N}: mine {b:.6f}  stored {sb:.6f}  diff {sb - b:+.2e}   S(rho_S) mine {ss:.10f} stored {sss:.10f}")

print("\nC. Self-measurement D_O (T6), N_E = 8, independent marginals")


def tdist(Pp, Pm, O, n):
    def marg(psi):
        T = psi.reshape((2,) * n)
        rest = [q for q in range(n) if q not in O]
        M = np.transpose(T, list(O) + rest).reshape(2 ** len(O), -1)
        return M @ M.conj().T
    w = np.linalg.eigvalsh(marg(Pp) - marg(Pm))
    return 0.5 * float(np.abs(w).sum())


N = 8
n = N + 1
for (J, hS, g, var, t) in [(1.0, 0.25, "hom", "VC", 2.0), (0.0, 0.0, "inh", "V0", 2.0), (2.0, 0.75, "inh", "VA", 1.0)]:
    pp = rc.chain_state(N, J, hS, gk(N, g), var, t, s_init=[1 / math.sqrt(2), 1 / math.sqrt(2)])
    pm = rc.chain_state(N, J, hS, gk(N, g), var, t, s_init=[1 / math.sqrt(2), -1 / math.sqrt(2)])
    curve = []
    inE = 0.0
    for k in range(1, n + 1):
        best = 1.0
        for O in itertools.combinations(range(n), k):
            D = tdist(pp, pm, O, n)
            best = min(best, 1 - D)
            if 0 not in O:
                inE = max(inE, D)
        curve.append(best)
    print(f"   J={J} hS={hS} {g} {var} t={t}: delta_self(k=1..9) = {np.round(curve, 4).tolist()}; max D for O in E = {inE:.3e}")
    if J == 0.0 and hS == 0.0:
        gg = gk(N, g)
        Dsc = tdist(pp, pm, (0,), n)
        print(f"      D_(S alone) = {Dsc:.9e}; closed form prod|cos(g_k t)| = {np.prod(np.abs(np.cos(gg * t))):.9e}"
              f" (run's post-hoc: 2.586229e-06)")
print(f"\n(wall {time.time() - t0:.0f} s)")
