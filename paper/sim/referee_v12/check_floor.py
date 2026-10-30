"""Referee check, part 2: the floor constant a_c and the estimator's efficiency.

 (a) Independent first-order Monte Carlo (own product-SIC sampler and linear inversion,
     no crt.py): N * (E sqrt I_c-hat)^2 for rho = I/4, both batches LI.
 (b) The released pipeline (crt.simulate + crt.functional, gate_kind='v12') re-run
     with the authors' exact calibration seeds (seed(0,0,r), r < N_REPRO) and with
     fresh referee seeds.
 (c) Exact reproduction of one Simulation-1 cell (pi/4, m = 3) from its seeds.
 (d) Efficiency: the obvious classical estimator of the same quantity (plug-in
     I(r_A:r_B)/2 from the record counts, geometric mean of two batches).

    python3 check_floor.py     # about 10 minutes on 2 cores
"""
import math
import sys
import os
import time
import numpy as np
from multiprocessing import Pool

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import crt  # noqa: E402

N = 10_000
LN2 = math.log(2)


# ---------------- (a) own first-order Monte Carlo -------------------------------
def sic_qubit():
    a = [np.array([0, 0, 1.0]),
         np.array([2 * math.sqrt(2) / 3, 0, -1 / 3]),
         np.array([-math.sqrt(2) / 3, math.sqrt(2 / 3), -1 / 3]),
         np.array([-math.sqrt(2) / 3, -math.sqrt(2 / 3), -1 / 3])]
    return np.array(a)


A = sic_qubit()
PA = np.array([[1, 0], [0, 1]]), np.array([[0, 1], [1, 0]]), np.array([[0, -1j], [1j, 0]]), np.diag([1, -1])
SIG = [np.eye(2), np.array([[0, 1], [1, 0]]), np.array([[0, -1j], [1j, 0]]), np.diag([1.0, -1])]


def li_I4(rng, n):
    """LI estimate of I/4 from n shots of the product SIC (outcomes uniform)."""
    k = rng.multinomial(n, np.full(16, 1 / 16)).reshape(4, 4) / n
    # Bloch-coefficient estimates c_ij = E[ (3 a_k)_i (3 b_l)_j ] with c_00 = 1
    va = np.hstack([np.ones((4, 1)), 3 * A])            # (4 outcomes, 4 components)
    C = va.T @ k @ va                                    # c_ij
    rho = sum(C[i, j] * np.kron(SIG[i], SIG[j]) for i in range(4) for j in range(4)) / 4
    return rho


def S(r):
    ev = np.linalg.eigvalsh((r + r.conj().T) / 2)
    ev = ev[ev > 1e-15]
    return float(-(ev * np.log2(ev)).sum())


def psd(r):
    w, v = np.linalg.eigh((r + r.conj().T) / 2)
    w = np.clip(w, 0, None); w /= w.sum()
    return (v * w) @ v.conj().T


def Ic(r):
    t = r.reshape(2, 2, 2, 2)
    rA, rB = np.einsum("ijkj->ik", t), np.einsum("ijil->jl", t)
    return max(0.0, (S(rA) + S(rB) - S(r)) / 2)


def own_floor(nrep=3000, seed=4242):
    rng = np.random.default_rng(seed)
    g = []
    for _ in range(nrep):
        i1, i2 = Ic(psd(li_I4(rng, N))), Ic(psd(li_I4(rng, N)))
        g.append(math.sqrt(i1 * i2))
    g = np.array(g) * N
    return g.mean(), g.std() / math.sqrt(len(g))


# ---------------- (b), (c) released pipeline ------------------------------------
def run_pipeline(args):
    rho, sd, B = args
    raw = crt.simulate(rho, sd, crt.SimConfig(N=N, B_boot=B))
    f = crt.functional(raw, gate_kind="v12")
    f11 = crt.functional(raw, gate_kind="v11")
    return f["R12"], f["psi"], f["C_eff"], f11["R12"]


# ---------------- (d) classical plug-in estimator --------------------------------
def plugin_gate(P, rng, n=N, reps=4000):
    out = []
    for _ in range(reps):
        vals = []
        for _b in range(2):
            c = rng.multinomial(n, P.ravel()).reshape(2, 2) / n
            pa, pb = c.sum(1), c.sum(0)
            nz = c > 0
            I = float((c[nz] * np.log2(c[nz] / np.outer(pa, pb)[nz])).sum())
            vals.append(I / 2)
        out.append(math.sqrt(vals[0] * vals[1]))
    return np.array(out)


if __name__ == "__main__":
    t0 = time.time()
    m, se = own_floor()
    print(f"(a) own LI-PSD Monte Carlo, both batches LI, I/4, N=1e4, 3000 reps: N*(sqrt(Ic1 Ic2)) = {m:.2f} +/- {se:.2f}")
    print(f"    first-order theory (2.25/ln2)(sqrt2 G(5)/G(4.5))^2 = "
          f"{(2.25 / LN2) * (math.sqrt(2) * math.gamma(5) / math.gamma(4.5)) ** 2:.2f}")

    NREP = 300
    seedA = [(20261102, 0, 0, r) for r in range(NREP)]                # the authors' calibration seeds
    seedR = [(99173, 0, r) for r in range(NREP)]                       # referee seeds
    I4 = crt.maximally_mixed(4)
    with Pool(2) as pool:
        resA = pool.map(run_pipeline, [(I4, s, 2) for s in seedA])
        resR = pool.map(run_pipeline, [(I4, s, 2) for s in seedR])
        th = math.pi / 4
        c = math.cos(th)
        Pe = (1 - math.sqrt(1 - c ** 6)) / 2
        q = 2 * Pe * (1 - Pe)
        rhoR = np.diag([(1 - q) / 2, q / 2, q / 2, (1 - q) / 2]).astype(complex)
        cell = pool.map(run_pipeline, [(rhoR, (20261102, 1, 3, 3, r), 200) for r in range(40)])
    for name, res in (("authors' seeds r<300", resA), ("referee seeds", resR)):
        x = N * np.array([r[0] for r in res]); y = N * np.array([r[3] for r in res])
        print(f"(b) pipeline, {name}: N R12-hat v12 = {x.mean():.2f} +/- {x.std() / math.sqrt(len(x)):.2f}"
              f" (sd {x.std():.1f}); v11 = {y.mean():.2f} +/- {y.std() / math.sqrt(len(y)):.2f};"
              f" C_eff values {sorted(set(round(r[2], 3) for r in res))}")
    x = np.array([r[0] for r in cell]); p = np.array([r[1] for r in cell])
    print(f"(c) S1 cell pi/4 m=3 re-run from the authors' seeds: R12-hat = {x.mean():.4f} +/- {x.std(ddof=1) / math.sqrt(40):.4f},"
          f" Psi-hat = {p.mean():.4f}   (REPORT_phase2: 0.3341 +/- 0.0035, 0.1587)")

    rng = np.random.default_rng(5150)
    P0 = np.full((2, 2), 0.25)
    g0 = N * plugin_gate(P0, rng)
    print(f"(d) plug-in classical estimator at I/4: N * gate = {g0.mean():.3f} +/- {g0.std() / math.sqrt(len(g0)):.3f}"
          f"  (vs a_c = 27.9 for the tomographic Psi pipeline)")
    # smallest signal detectable at 2x floor: I_c such that mean gate = 2 * floor
    for qq in (0.49, 0.48, 0.47, 0.45):
        P = np.array([[(1 - qq) / 2, qq / 2], [qq / 2, (1 - qq) / 2]])
        Ix = 1 - float(-(qq * math.log2(qq) + (1 - qq) * math.log2(1 - qq)))
        g = N * plugin_gate(P, rng, reps=1000)
        print(f"    signal q={qq}: exact N I_c = {N * Ix / 2:.2f}; plug-in N*gate = {g.mean():.2f}")
    print(f"total {time.time() - t0:.0f} s")
