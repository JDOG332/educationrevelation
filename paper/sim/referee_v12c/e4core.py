"""Independent re-implementation of the E4 spin chain (referee, phase 3).
No import from run_v12c / crt. S = qubit 0, E = qubits 1..n (big-endian)."""
import numpy as np
from functools import reduce

I2 = np.eye(2); X = np.array([[0, 1], [1, 0]], complex); Y = np.array([[0, -1j], [1j, 0]])
Z = np.diag([1., -1.]).astype(complex); P1 = np.diag([0., 1.]).astype(complex)


def op(ops, n):
    """ops: dict site->2x2; n total qubits."""
    return reduce(np.kron, [ops.get(k, I2) for k in range(n)])


def ham(n_env, g=1.0, J=0.0, h=0.0, hz=0.0, field_axis="x", open_bc=True):
    n = n_env + 1
    H = np.zeros((2 ** n, 2 ** n), complex)
    for k in range(1, n):
        H += g * op({0: P1, k: Y}, n)
    for k in range(1, n - 1):
        H += (J / 2) * (op({k: X, k + 1: X}, n) + op({k: Y, k + 1: Y}, n))
    F = {"x": X, "y": Y, "z": Z}[field_axis]
    if h:
        H += h * op({0: F}, n)
    if hz:
        H += hz * op({0: Z}, n)
    return H


class Chain:
    def __init__(self, n_env, **kw):
        self.n_env = n_env
        self.n = n_env + 1
        self.w, self.V = np.linalg.eigh(ham(n_env, **kw))
        e0 = np.zeros(2 ** n_env); e0[0] = 1
        self.init = {x: np.kron(np.eye(2)[x], e0).astype(complex) for x in (0, 1)}
        self.c = {x: self.V.conj().T @ self.init[x] for x in (0, 1)}

    def psi(self, x, t):
        return self.V @ (np.exp(-1j * self.w * t) * self.c[x])


def tensor(psi, n, keep):
    """Return psi as array with axes (keep..., rest)."""
    T = psi.reshape([2] * n)
    rest = [k for k in range(n) if k not in keep]
    return T.transpose(list(keep) + rest).reshape([2 ** 1] * 0 + [2] * len(keep) + [-1])


def rdm(psi, n, keep):
    T = tensor(psi, n, keep).reshape(2 ** len(keep), -1)
    return T @ T.conj().T


def helstrom(r0, r1, tol=1e-13):
    w, v = np.linalg.eigh(0.5 * (r0 - r1))
    P = v[:, w > tol] @ v[:, w > tol].conj().T + 0.5 * v[:, np.abs(w) <= tol] @ v[:, np.abs(w) <= tol].conj().T
    return P


def majority(m):
    d = np.zeros(2 ** m)
    for i in range(2 ** m):
        o = bin(i).count("1")
        d[i] = 1.0 if 2 * o < m else (0.5 if 2 * o == m else 0.0)
    return np.diag(d).astype(complex)


def joint_S_A_B(psi, n, fA, fB):
    """rho on S, F_A, F_B (S first)."""
    return rdm(psi, n, [0] + list(fA) + list(fB))


def law(rho, PA, PB):
    """P(s, a, b) with S measured in Z basis and record POVMs {PA, 1-PA}."""
    dA, dB = PA.shape[0], PB.shape[0]
    MA = [PA, np.eye(dA) - PA]; MB = [PB, np.eye(dB) - PB]
    out = np.zeros((2, 2, 2))
    R = rho.reshape(2, dA * dB, 2, dA * dB)
    for s in (0, 1):
        blk = R[s, :, s, :]
        for a in (0, 1):
            for b in (0, 1):
                out[s, a, b] = np.real(np.trace(blk @ np.kron(MA[a], MB[b])))
    return out


def H(p):
    p = np.asarray(p, float).ravel(); p = p[p > 1e-300]
    return float(-(p * np.log2(p)).sum())


def coinfo(P):
    """P over (x, a, b): returns I(a:b) - I(a:b|x)."""
    Pab, Pxa, Pxb = P.sum(0), P.sum(2), P.sum(1)
    Pa, Pb, Px = Pab.sum(1), Pab.sum(0), P.sum((1, 2))
    Iab = H(Pa) + H(Pb) - H(Pab)
    Iabx = H(Pxa) + H(Pxb) - H(P) - H(Px)
    return Iab - Iabx


def mi(P2):
    return H(P2.sum(1)) + H(P2.sum(0)) - H(P2)


def e4_point(ch, t, m, kind, fA=None, fB=None):
    n, ne = ch.n, ch.n_env
    fA = fA or list(range(1, m + 1)); fB = fB or list(range(ne - m + 1, ne + 1))
    psi = {x: ch.psi(x, t) for x in (0, 1)}
    if kind == "Local":
        PA, PB = majority(len(fA)), majority(len(fB))
    else:
        PA = helstrom(rdm(psi[0], n, fA), rdm(psi[1], n, fA))
        PB = helstrom(rdm(psi[0], n, fB), rdm(psi[1], n, fB))
    Pdo = 0.5 * sum(np.eye(2)[x][:, None, None] * law(joint_S_A_B(psi[x], n, fA, fB), PA, PB).sum(0)[None]
                    for x in (0, 1))
    nat = (psi[0] + psi[1]) / np.sqrt(2)
    Pnat = law(joint_S_A_B(nat, n, fA, fB), PA, PB)
    return {"RA": coinfo(Pdo), "Im": coinfo(Pnat), "Pdo": Pdo, "Pnat": Pnat,
            "Iab_do": mi(Pdo.sum(0)), "C_rec": mi(Pnat.sum(0)),
            "JA": mi(Pdo.sum(2)), "IsA_nat": mi(Pnat.sum(2))}
