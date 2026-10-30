"""Referee check (phase 4), T4: floor or slow decay? Exact large-N_E continuation of J = 0, homogeneous-g M2 cells.

At J = 0 with g_k = 1 (and V0/VA, which only add h_y sigma_y^S and b_z sum Z_k), H acts on S (x) the symmetric
(Dicke) subspace of E: H = P1 (x) 2 S_y + b_z 2 S_z + h_S sigma_x^S + h_y sigma_y^S, dimension 2(N_E + 1).
Every half-size fragment is equivalent; its reduced branch states live in the Dicke space of m qubits, obtained
from the Dicke split |N,k> = sum_j sqrt(C(m,j) C(N-m,k-j) / C(N,k)) |m,j>|N-m,k-j>.
Also covers the run's 'open' cells J = 1, VB/VC with homogeneous g, which coincide with J = 0, V0/VA
(isotropic Heisenberg point J = 2 Delta: the hopping is J * SWAP + const on the symmetric sector).
Validated against the brute-force values of t4_norm.out at N_E = 8..14.
"""
import math
import os
import sys
import time

import numpy as np
from scipy.linalg import expm
from scipy.optimize import minimize
from scipy.special import gammaln

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ref_core as rc  # noqa: E402
from t4_norm import basis_U, t4_class  # noqa: E402


def spin_ops(N):
    j = N / 2
    ms = j - np.arange(N + 1)  # k = number of |1> = spin down; |0> = Z = +1
    Sz = np.diag(ms).astype(complex)
    Sp = np.zeros((N + 1, N + 1), complex)
    for k in range(1, N + 1):  # S+ |m> -> |m+1>, i.e. k -> k-1
        m = ms[k]
        Sp[k - 1, k] = math.sqrt(j * (j + 1) - m * (m + 1))
    Sm = Sp.conj().T
    Sx = (Sp + Sm) / 2
    Sy = (Sp - Sm) / (2j)
    return Sx, Sy, Sz


def lnC(n, k):
    return gammaln(n + 1) - gammaln(k + 1) - gammaln(n - k + 1)


def split_coeffs(N, m):
    a = np.arange(m + 1)[:, None]
    b = np.arange(N - m + 1)[None, :]
    return np.exp(0.5 * (lnC(m, a) + lnC(N - m, b) - lnC(N, a + b)))


def state(N, hS, t, hy=0.0, bz=0.0):
    Sx, Sy, Sz = spin_ops(N)
    I = np.eye(N + 1)
    H = np.kron(rc.P1, 2 * Sy) + bz * np.kron(np.eye(2), 2 * Sz) + hS * np.kron(rc.X, I) + hy * np.kron(rc.Y, I)
    psi0 = np.zeros(2 * (N + 1), complex)
    psi0[0] = psi0[N + 1] = 1 / math.sqrt(2)
    return expm(-1j * t * H) @ psi0


def analyse(psi, N):
    m = N // 2
    P = psi.reshape(2, N + 1)
    rS = P @ P.conj().T
    SS = rc.S_bits(rS)
    C = split_coeffs(N, m)
    idx = np.arange(m + 1)[:, None] + np.arange(N - m + 1)[None, :]
    Ms = [P[s][idx] * C for s in (0, 1)]
    A = [[Ms[i] @ Ms[j].conj().T for j in (0, 1)] for i in (0, 1)]
    SF = rc.S_bits(A[0][0] + A[1][1])

    def chi(U):
        out = SF
        for s in (0, 1):
            G = sum(U[s, i] * np.conj(U[s, j]) * A[i][j] for i in (0, 1) for j in (0, 1))
            p = float(np.real(np.trace(G)))
            if p > 1e-15:
                out -= p * rc.S_bits(G / p)
        return out
    cz = chi(np.eye(2))
    best = cz
    for x0 in ((0.01, 0.0), (math.pi / 2, 0.0), (math.pi / 2, math.pi / 2), (math.pi / 4, 0.0), (3 * math.pi / 4, 0)):
        res = minimize(lambda a: -chi(basis_U(a[0], a[1])), x0, method="Nelder-Mead",
                       options={"xatol": 1e-7, "fatol": 1e-11, "maxiter": 600})
        best = max(best, -res.fun)
    # last fragment too (m = N - 1), z pointer
    return SS, 1 - cz / SS, 1 - best / SS


if __name__ == "__main__":
    t0 = time.time()
    Ns = (8, 10, 12, 14, 20, 40, 80, 160, 320)
    cases = [(0.75, 1.0, 0.0, 0.0, "J=0 h0.75 V0 t=1 (== run's J=1 VB hom)"),
             (0.75, 2.0, 0.0, 0.0, "J=0 h0.75 V0 t=2"),
             (0.25, 1.0, 0.0, 0.0, "J=0 h0.25 V0 t=1"),
             (0.25, 3.0, 0.0, 0.0, "J=0 h0.25 V0 t=3"),
             (0.75, 1.0, 0.25, 0.3, "J=0 h0.75 VA t=1 (== run's J=1 VC hom)"),
             (0.0, 1.0, 0.0, 0.0, "J=0 h0 V0 t=1 (product control)")]
    for hS, t, hy, bz, lab in cases:
        print(lab)
        res = {}
        for N in Ns:
            res[N] = analyse(state(N, hS, t, hy, bz), N)
            SS, dz, do = res[N]
            print(f"   N={N:4d}: S(rho_S)={SS:.4f}  delta_half z={dz:.4f}  opt-basis={do:.4f}", flush=True)
        print(f"   T4 rule (8 vs 12): z {t4_class(res[8][1], res[12][1])}, opt {t4_class(res[8][2], res[12][2])}; "
              f"z at N=320 / N=8 = {res[320][1] / max(res[8][1], 1e-300):.3f}, opt {res[320][2] / max(res[8][2], 1e-300):.3f}")
    print(f"(wall {time.time() - t0:.0f} s)")
