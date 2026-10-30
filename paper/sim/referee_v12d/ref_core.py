"""Independent minimal engine for the phase-4 referee checks (no imports from run_v12*, crt).

Conventions: qubit 0 = S (most significant), sites 1..N_E; |0> = (1,0).
"""
import itertools
import math

import numpy as np
import scipy.sparse as sp
from scipy.sparse.linalg import expm_multiply

X = np.array([[0, 1], [1, 0]], complex)
Y = np.array([[0, -1j], [1j, 0]], complex)
Z = np.array([[1, 0], [0, -1]], complex)
P1 = np.array([[0, 0], [0, 1]], complex)
I2 = np.eye(2, dtype=complex)


def op(single, n):
    """single: dict site -> 2x2; sparse kron over n qubits."""
    out = sp.identity(1, dtype=complex, format="csr")
    for q in range(n):
        out = sp.kron(out, sp.csr_matrix(single.get(q, I2)), format="csr")
    return out


def chain_H(N, J, hS, g, hy=0.0, bz=0.0, Delta=0.0):
    n = N + 1
    H = sp.csr_matrix((2 ** n, 2 ** n), dtype=complex)
    for k in range(1, n):
        H = H + g[k - 1] * op({0: P1, k: Y}, n)
    for k in range(1, n - 1):
        H = H + (J / 2) * (op({k: X, k + 1: X}, n) + op({k: Y, k + 1: Y}, n))
        if Delta:
            H = H + Delta * op({k: Z, k + 1: Z}, n)
    for k in range(1, n):
        if bz:
            H = H + bz * op({k: Z}, n)
    if hS:
        H = H + hS * op({0: X}, n)
    if hy:
        H = H + hy * op({0: Y}, n)
    return H.tocsr()


V = {"V0": dict(hy=0.0, bz=0.0, Delta=0.0), "VA": dict(hy=0.25, bz=0.3, Delta=0.0),
     "VB": dict(hy=0.0, bz=0.0, Delta=0.5), "VC": dict(hy=0.25, bz=0.3, Delta=0.5)}


def chain_state(N, J, hS, g, var, t, s_init=None):
    H = chain_H(N, J, hS, g, **V[var])
    psi0 = np.zeros(2 ** (N + 1), complex)
    s = np.array([1, 1], complex) / math.sqrt(2) if s_init is None else np.asarray(s_init, complex)
    psi0[0] = s[0]
    psi0[2 ** N] = s[1]
    return expm_multiply(-1j * t * H, psi0)


def S_bits(rho):
    w = np.linalg.eigvalsh((rho + rho.conj().T) / 2)
    w = w[w > 1e-15]
    return float(-(w * np.log2(w)).sum())


def branches(psi, N, U_S=None):
    """Unnormalised branch tensors (s=0,1) on E after an optional unitary on S (measure z afterwards)."""
    P = psi.reshape(2, 2 ** N)
    if U_S is not None:
        P = U_S @ P
    return [P[s].reshape((2,) * N) for s in (0, 1)]


def mat(T, F, N):
    ax = [k - 1 for k in F]
    rest = [i for i in range(N) if i not in set(ax)]
    return np.transpose(T, ax + rest).reshape(2 ** len(F), -1)


def chi_frag(Bs, F, N):
    """chi(S_Pi : F) in bits from unnormalised branches (dense, smaller-side not used: plain partial trace)."""
    M = [mat(B, F, N) for B in Bs]
    r = [Mi @ Mi.conj().T for Mi in M]
    p = [float(np.real(np.trace(ri))) for ri in r]
    out = S_bits(r[0] + r[1])
    for ri, pi in zip(r, p):
        if pi > 1e-15:
            out -= pi * S_bits(ri / pi)
    return out


def rhoS(psi, N):
    P = psi.reshape(2, 2 ** N)
    return P @ P.conj().T


def qcb_nats(r0, r1, cap=40.0):
    """Quantum Chernoff information (nats) via eigen-decompositions and a fine c scan + golden refine."""
    w0, V0 = np.linalg.eigh((r0 + r0.conj().T) / 2)
    w1, V1 = np.linalg.eigh((r1 + r1.conj().T) / 2)
    w0 = np.clip(w0, 0, None); w1 = np.clip(w1, 0, None)
    O = np.abs(V0.conj().T @ V1) ** 2
    k0 = w0 > 1e-14; k1 = w1 > 1e-14
    a, b, O = w0[k0], w1[k1], O[np.ix_(k0, k1)]
    la, lb = np.log(a), np.log(b)

    def f(c):
        return float(np.exp(c * la) @ O @ np.exp((1 - c) * lb))
    cs = np.linspace(1e-6, 1 - 1e-6, 41)
    vals = [f(c) for c in cs]
    i = int(np.argmin(vals))
    lo, hi = cs[max(0, i - 1)], cs[min(40, i + 1)]
    g = (math.sqrt(5) - 1) / 2
    for _ in range(60):
        c1, c2 = hi - g * (hi - lo), lo + g * (hi - lo)
        if f(c1) < f(c2):
            hi = c2
        else:
            lo = c1
    q = min(min(vals), f((lo + hi) / 2))
    if q <= math.exp(-cap):
        return cap
    return max(0.0, -math.log(q))


def h2(p):
    return 0.0 if p <= 0 or p >= 1 else -(p * math.log2(p) + (1 - p) * math.log2(1 - p))


def dref(x, xE):
    def g(x):
        return 1 - h2((1 + math.exp(-x / 2)) / 2)
    return (g(x) - g(xE)) / (1 - g(xE))


def all_frags(N, m):
    return list(itertools.combinations(range(1, N + 1), m))
