"""Referee check (phase 4), T4: is the FLOOR in non-conserving cells an artifact of asking about the
instantaneous sigma_z of a precessing S?

For selected FLOOR cells (homogeneous g only, so the N_E comparison is not confounded by redrawn couplings),
exhaustive half-size fragments at N_E = 8, 10, 12, 14 (independent engine ref_core), and
  z   : delta_half with the pre-registered pointer (sigma_z of S at time t), normalised by chi(E) = S(rho_S)
  eig : the same with S measured in the eigenbasis of rho_S(t)
  opt : 1 - max_F max_n chi(S_n : F) / S(rho_S), S measured along the best Bloch direction n for that fragment
        (n optimised on the 6 best fragments from z and eig; any direction n has chi(S_n : E) = S(rho_S) because
        the branches on E are pure, so the normalisation is unchanged)
T4 class (pre-registered rule, 8 vs 12) under each, plus the N_E = 14 value; and the product-law prediction
from the single-site rates of the z pointer.
"""
import math
import os
import sys
import time

import numpy as np
from scipy.optimize import minimize

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ref_core as rc  # noqa: E402


def t4_class(d8, d12):
    if d12 >= 0.05 and d12 >= 0.8 * d8:
        return "FLOOR"
    if d12 < 0.01 or d12 <= 0.5 * d8:
        return "DECAY"
    return "UNDECIDED"


def S_of(G):
    p = float(np.real(np.trace(G)))
    return p, (rc.S_bits(G / p) if p > 1e-15 else 0.0)


def basis_U(th, ph):
    """Rows: <n_+|, <n_-| for Bloch direction (th, ph)."""
    a, b = math.cos(th / 2), np.exp(1j * ph) * math.sin(th / 2)
    up = np.array([a, b]); dn = np.array([-np.conj(b), a])
    return np.array([up.conj(), dn.conj()])


class Frag:
    def __init__(self, psi, N, F):
        P = psi.reshape(2, 2 ** N)
        Ms = [rc.mat(P[s].reshape((2,) * N), F, N) for s in (0, 1)]
        self.A = [[Ms[i] @ Ms[j].conj().T for j in (0, 1)] for i in (0, 1)]
        self.SF = rc.S_bits(self.A[0][0] + self.A[1][1])

    def chi(self, U):
        out = self.SF
        for s in (0, 1):
            G = sum(U[s, i] * np.conj(U[s, j]) * self.A[i][j] for i in (0, 1) for j in (0, 1))
            p, Sc = S_of(G)
            out -= p * Sc
        return out


def analyse(psi, N):
    rS = rc.rhoS(psi, N)
    SS = rc.S_bits(rS)
    w, Vv = np.linalg.eigh(rS)
    Ueig = Vv.conj().T
    m = N // 2
    vals = []
    for F in rc.all_frags(N, m):
        fr = Frag(psi, N, F)
        vals.append((F, fr, fr.chi(np.eye(2)), fr.chi(Ueig)))
    dz = 1 - max(v[2] for v in vals) / SS
    de = 1 - max(v[3] for v in vals) / SS
    cand = sorted(vals, key=lambda v: -v[2])[:3] + sorted(vals, key=lambda v: -v[3])[:3]
    best = 0.0
    for F, fr, cz, ce in cand:
        for x0 in ((0.01, 0.0), (math.pi / 2, 0.0), (math.pi / 2, math.pi / 2),
                   (math.acos(max(-1, min(1, float(np.real(Vv[0, 1] * np.conj(Vv[0, 1]) * 2 - 1))))), 0.0)):
            res = minimize(lambda a: -fr.chi(basis_U(a[0], a[1])), x0, method="Nelder-Mead",
                           options={"xatol": 1e-6, "fatol": 1e-10, "maxiter": 400})
            best = max(best, -res.fun, cz, ce)
    do = 1 - best / SS
    # z-pointer single-site rates -> product-law prediction at m = N/2 (min over fragments of D_ref)
    P = psi.reshape(2, 2 ** N)
    p = [np.vdot(P[s], P[s]).real for s in (0, 1)]
    xi = []
    for k in range(1, N + 1):
        r = [rc.mat(P[s].reshape((2,) * N), [k], N) for s in (0, 1)]
        xi.append(rc.qcb_nats(*(ri @ ri.conj().T / ps for ri, ps in zip(r, p))))
    xi = np.sort(xi)[::-1]
    pred = rc.dref(float(xi[:m].sum()), float(xi.sum()))
    return SS, dz, de, do, pred


CELLS = [  # (J, hS, var, t) -- homogeneous g, FLOOR in the run's T4
    (1.0, 0.75, "VB", 1.0), (2.0, 0.75, "V0", 1.5), (0.0, 0.75, "V0", 1.0), (0.5, 0.75, "VA", 2.0),
    (3.0, 0.5, "VC", 3.0),  # robustness-grid FLOOR cell
    (1.0, 0.0, "V0", 2.0),  # conserving control
]

if __name__ == "__main__":
    t0 = time.time()
    Ns = (8, 10, 12, 14)
    print("cell | N: S(rho_S), delta_half z / eig / opt, product-law prediction (z rates)")
    for (J, hS, var, t) in CELLS:
        res = {}
        for N in Ns:
            psi = rc.chain_state(N, J, hS, np.ones(N), var, t)
            res[N] = analyse(psi, N)
            print(f"  J={J} hS={hS} {var} t={t} N={N}: S={res[N][0]:.4f}  z {res[N][1]:.4f}  eig {res[N][2]:.4f}  "
                  f"opt {res[N][3]:.4f}  pred {res[N][4]:.4f}   ({time.time() - t0:.0f} s)", flush=True)
        line = []
        for i, lab in ((1, "z"), (2, "eig"), (3, "opt"), (4, "pred")):
            line.append(f"{lab}: {t4_class(res[8][i], res[12][i])} (d14/d8 = {res[14][i] / max(res[8][i], 1e-300):.3f})")
        print("   T4 class 8 vs 12 -> " + "; ".join(line), flush=True)
    print(f"(wall {time.time() - t0:.0f} s)")
