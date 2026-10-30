"""Probe the J = 0 law equality P_nat(s,a,b) = P_do(x=s,a,b): which measurements, which states."""
import numpy as np
from e4core import *
rng = np.random.default_rng(1)

def randproj(d, real=False):
    A = rng.normal(size=(d, d)) + (0 if real else 1j * rng.normal(size=(d, d)))
    w, v = np.linalg.eigh(A + A.conj().T)
    k = rng.integers(1, d) if d > 1 else 1
    return v[:, :k] @ v[:, :k].conj().T

def laws(ch, t, fA, fB, PA, PB):
    n = ch.n
    psi = {x: ch.psi(x, t) for x in (0, 1)}
    Pdo = np.zeros((2, 2, 2))
    for x in (0, 1):
        Pdo[x] = 0.5 * law(joint_S_A_B(psi[x], n, fA, fB), PA, PB).sum(0)
    Pnat = law(joint_S_A_B((psi[0] + psi[1]) / np.sqrt(2), n, fA, fB), PA, PB)
    return Pdo, Pnat

ne = 6
for J, h in ((0, 0.7), (0, 2.0), (0.5, 0.7)):
    ch = Chain(ne, J=J, h=h)
    t = 1.1
    # (1) full-E operator identity?
    psi = {x: ch.psi(x, t) for x in (0, 1)}
    nat = (psi[0] + psi[1]) / np.sqrt(2)
    Tn = nat.reshape(2, -1); A = [np.outer(Tn[s], Tn[s].conj()) for s in (0, 1)]
    B = [0.5 * psi[x].reshape(2, -1).T @ psi[x].reshape(2, -1).conj() for x in (0, 1)]
    print(f"J={J} h={h}: full-E ||A_s - B_s|| = {max(np.abs(A[s]-B[s]).max() for s in (0,1)):.2e}")
    # (2) random complex / real projectors on fragments, single-qubit and 2-qubit
    for real in (False, True):
        d = 0
        for _ in range(20):
            PA, PB = randproj(2, real), randproj(4, real)
            Pdo, Pnat = laws(ch, t, [1], [ne - 1, ne], PA, PB)
            d = max(d, np.abs(Pdo - Pnat).max())
        print(f"   random {'real' if real else 'complex'} projectors: max law diff {d:.2e}")
    # (3) Z-diagonal measurement (Local) and sigma_x measurement
    Xp = 0.5 * (np.eye(2) + X); Yp = 0.5 * (np.eye(2) + Y)
    for nm, P in (("Z", np.diag([1, 0]).astype(complex)), ("X", Xp), ("Y", Yp)):
        Pdo, Pnat = laws(ch, t, [1], [ne], P, P)
        print(f"   both measure {nm}: max law diff {np.abs(Pdo-Pnat).max():.2e}")
