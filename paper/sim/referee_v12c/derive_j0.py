"""Referee: derivation check of the T4 J = 0 'unexplained' equality.

Claim (derived in the report): at J = 0, H = sum_n Pi_n^(Y) (x) h_n with
h_n = g n P1 + h_S sigma_x (n = sum_k Y_k eigenvalue, conserved), so
U = sum_n Pi_n (x) V_n with V_n = exp(-i t h_n) complex SYMMETRIC (h_n real
symmetric). Hence the E-vectors alpha_1 = <0|U|1,0_E> and beta_0 = <1|U|0,0_E>
are equal (reciprocity). In addition sigma_z^S C (C = complex conjugation)
maps H -> -H, so U commutes with that antiunitary: alpha_0, beta_1 are real
and alpha_1 = beta_0 are imaginary. For any REAL symmetric E-observable M the
cross term Re<alpha_0|M|alpha_1> vanishes and
P_nat(s, M) = P_do(x = s, M) exactly, for every g, h_S, t, N_E, fragments.
Below: (1) the two structural facts, (2) which perturbations break it."""
import numpy as np
from functools import reduce
from e4core import I2, X, Y, Z, P1, op, rdm, law, joint_S_A_B, helstrom, coinfo

def evolve(H, n_env, t, env0=None):
    w, V = np.linalg.eigh(H)
    U = V @ np.diag(np.exp(-1j * w * t)) @ V.conj().T
    e0 = env0 if env0 is not None else np.eye(2 ** n_env)[0]
    return {x: U @ np.kron(np.eye(2)[x], e0) for x in (0, 1)}

def gap(psi, n, fA, fB, meas):
    if isinstance(meas, str):
        PA = helstrom(rdm(psi[0], n, fA), rdm(psi[1], n, fA)); PB = helstrom(rdm(psi[0], n, fB), rdm(psi[1], n, fB))
    else:
        PA = reduce(np.kron, [meas] * len(fA)); PB = reduce(np.kron, [meas] * len(fB))
    Pdo = np.zeros((2, 2, 2))
    for x in (0, 1):
        Pdo[x] = 0.5 * law(joint_S_A_B(psi[x], n, fA, fB), PA, PB).sum(0)
    Pnat = law(joint_S_A_B((psi[0] + psi[1]) / np.sqrt(2), n, fA, fB), PA, PB)
    return np.abs(Pdo - Pnat).max(), coinfo(Pdo) - coinfo(Pnat)

def build(ne, g=1.0, J=0.0, h=0.7, field=X, gk=None, extra=None):
    n = ne + 1
    gk = gk if gk is not None else [g] * ne
    H = sum(gk[k - 1] * op({0: P1, k: Y}, n) for k in range(1, n))
    H = H + sum((J / 2) * (op({k: X, k + 1: X}, n) + op({k: Y, k + 1: Y}, n)) for k in range(1, n - 1))
    H = H + h * op({0: field}, n)
    if extra is not None:
        H = H + extra(n)
    return H

ne, t = 6, 1.7
n = ne + 1
Zp = np.diag([1., 0.]).astype(complex); Xp = 0.5 * (I2 + X); Yp = 0.5 * (I2 + Y)
psi = evolve(build(ne), ne, t)
a0, b0 = psi[0].reshape(2, -1); a1, b1 = psi[1].reshape(2, -1)
print("(1) J=0: |alpha_1 - beta_0| =", f"{np.abs(a1 - b0).max():.1e}",
      "| Im alpha_0 | =", f"{np.abs(a0.imag).max():.1e}", "| Re alpha_1 | =", f"{np.abs(a1.real).max():.1e}")
H = build(ne)
C_Z = op({0: Z}, n)
print("    sigma_z^S conj(H) sigma_z^S + H =", f"{np.abs(C_Z @ H.conj() @ C_Z + H).max():.1e}")
print("(2) law gap max|P_do - P_nat| and RA - Im_rec, fragments [1] and [5,6]:")
rng = np.random.default_rng(3)
cases = {
    "baseline J=0, h=0.7 sigma_x": dict(),
    "J=0, h=3, g=0.4": dict(h=3.0, g=0.4),
    "J=0, inhomogeneous g_k": dict(gk=list(rng.uniform(0.2, 2, ne))),
    "J=0, field sigma_y on S": dict(field=Y),
    "J=0, field sigma_x + 0.5 sigma_z": dict(extra=lambda n: 0.5 * op({0: Z}, n)),
    "J=0, extra env field 0.3 sum Z_k": dict(extra=lambda n: 0.3 * sum(op({k: Z}, n) for k in range(1, n))),
    "J=0, extra env field 0.3 sum Y_k": dict(extra=lambda n: 0.3 * sum(op({k: Y}, n) for k in range(1, n))),
    "J=0, Ising Y_k Y_k+1 (commutes with control)": dict(extra=lambda n: 0.7 * sum(op({k: Y, k + 1: Y}, n) for k in range(1, n - 1))),
    "J=0.1 hopping": dict(J=0.1),
    "J=1 hopping": dict(J=1.0),
}
for nm, kw in cases.items():
    psi = evolve(build(ne, **kw), ne, t)
    out = []
    for meas, lab in ((Zp, "Z"), (Xp, "X"), (Yp, "Y"), ("Helstrom", "Hel")):
        d, dra = gap(psi, n, [1], [ne - 1, ne], meas)
        out.append(f"{lab}: {d:.1e}/{dra:+.1e}")
    print(f"   {nm:45s} " + "  ".join(out))
e_plus = reduce(np.kron, [np.array([1, 1]) / np.sqrt(2)] * ne).astype(complex)
psi = evolve(build(ne), ne, t, env0=e_plus)
print(f"   {'J=0, E starts in |+>^N (real)':45s} Z: {gap(psi, n, [1], [ne-1, ne], Zp)[0]:.1e}")
e_i = reduce(np.kron, [np.array([1, 1j * 0.6 + 0.8]) / np.sqrt(2)] * ne)
psi = evolve(build(ne), ne, t, env0=e_i)
print(f"   {'J=0, E starts in complex product state':45s} Z: {gap(psi, n, [1], [ne-1, ne], Zp)[0]:.1e}")
