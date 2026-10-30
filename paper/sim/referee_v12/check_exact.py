"""Referee check, part 1: exact quantities recomputed independently of run_v12.py.

Nothing here imports run_v12 / run_v12b. Closed forms are used where they exist,
brute-force linear algebra where they do not, and both are compared with the
numbers in results/v12/REPORT.md and REPORT_phase2.md.

    python3 check_exact.py      # about 1-2 minutes
"""
import math
import numpy as np
from functools import reduce

rng = np.random.default_rng(777001)
LOG2 = math.log(2)


def h(p):
    p = np.clip(np.asarray(p, float), 0, 1)
    with np.errstate(divide="ignore", invalid="ignore"):
        out = -(p * np.log2(p) + (1 - p) * np.log2(1 - p))
    return np.nan_to_num(out)


def S(rho):
    ev = np.linalg.eigvalsh((rho + rho.conj().T) / 2)
    ev = ev[ev > 1e-15]
    return float(-(ev * np.log2(ev)).sum())


def ptrace2(rho, dA, dB, keep):
    r = rho.reshape(dA, dB, dA, dB)
    return np.einsum("ijkj->ik", r) if keep == 0 else np.einsum("ijil->jl", r)


print("=" * 72)
print("1. Partial information I(S:F_m), pure c-maybe, closed form")
print("   I = h((1+c^N)/2) + h((1+c^m)/2) - h((1+c^(N-m))/2), c = cos(theta)")


def mi_cmaybe(theta, N):
    c = math.cos(theta)
    m = np.arange(N + 1)
    I = h((1 + c ** N) / 2) + h((1 + c ** m) / 2) - h((1 + c ** (N - m)) / 2)
    I[0] = 0.0
    return I


def brute_mi(theta, N):
    c, s = math.cos(theta), math.sin(theta)
    b0 = reduce(np.kron, [np.array([1, 0.0])] * N)
    b1 = reduce(np.kron, [np.array([c, s])] * N)
    psi = np.concatenate([b0, b1]) / math.sqrt(2)
    out = [0.0]
    for m in range(1, N + 1):
        T = psi.reshape(2, 2 ** m, 2 ** (N - m))
        # S F_m vs rest
        M_SF = T.reshape(2 ** (m + 1), -1)
        sv = np.linalg.svd(M_SF, compute_uv=False) ** 2
        HSF = float(-(sv[sv > 1e-15] * np.log2(sv[sv > 1e-15])).sum())
        M_F = T.transpose(1, 0, 2).reshape(2 ** m, -1)
        sv = np.linalg.svd(M_F, compute_uv=False) ** 2
        HF = float(-(sv[sv > 1e-15] * np.log2(sv[sv > 1e-15])).sum())
        sv = np.linalg.svd(psi.reshape(2, -1), compute_uv=False) ** 2
        HS = float(-(sv[sv > 1e-15] * np.log2(sv[sv > 1e-15])).sum())
        out.append(HS + HF - HSF)
    return np.array(out)


rep = {("pi/4", 12): [0.000, 0.601, 0.812, 0.909, 0.957, 0.983, 1.000, 1.017, 1.043, 1.091, 1.188, 1.399, 2.000]}
for name, th, N in [("pi/4", math.pi / 4, 12), ("pi/8", math.pi / 8, 8), ("pi/16", math.pi / 16, 12)]:
    a = mi_cmaybe(th, N)
    b = brute_mi(th, N)
    print(f"  theta={name} N_E={N}: closed form {np.round(a, 4).tolist()}")
    print(f"     max |closed - brute statevector| = {np.abs(a - b).max():.2e}")
    if (name, N) in rep:
        print(f"     max |closed - REPORT| = {np.abs(a - np.array(rep[(name, N)])).max():.4f}")


def crossing(ys, level):
    ys = np.asarray(ys)
    for m in range(1, len(ys)):
        if ys[m] >= level:
            return (m - 1) + (level - ys[m - 1]) / (ys[m] - ys[m - 1])
    return None


print("\n  m_delta^MI (delta=0.1), referee vs REPORT:")
rep_md = {("pi/8", 6): 4.03, ("pi/8", 12): 6.10, ("pi/6", 8): 3.83, ("pi/4", 10): 2.87,
          ("pi/4", 12): 2.91, ("pi/3", 6): 1.61, ("pi/3", 12): 1.62, ("pi/2", 12): 0.90}
TH = {"pi/16": math.pi / 16, "pi/8": math.pi / 8, "pi/6": math.pi / 6, "pi/4": math.pi / 4,
      "pi/3": math.pi / 3, "pi/2": math.pi / 2}
for (n, N), v in rep_md.items():
    md = crossing(mi_cmaybe(TH[n], N), 0.9)
    print(f"    {n:5s} N_E={N:2d}: {md:.3f}  (REPORT {v})")

print("=" * 72)
print("2. Helstrom records, pure c-maybe (closed forms)")
print("   P_e = (1 - sqrt(1 - c^(2m)))/2, q = 2 P_e (1 - P_e), I(r_A:r_B) = 1 - h(q), J_H = 1 - h(P_e)")


def rec(theta, m):
    c = math.cos(theta)
    Pe = (1 - math.sqrt(1 - c ** (2 * m))) / 2
    q = 2 * Pe * (1 - Pe)
    return Pe, q, 1 - float(h(q)), 1 - float(h(Pe))


def brute_rec(theta, m):
    c, s = math.cos(theta), math.sin(theta)
    r0 = reduce(np.kron, [np.diag([1.0, 0.0])] * m)
    e = np.array([c, s])
    r1 = reduce(np.kron, [np.outer(e, e)] * m)
    w, v = np.linalg.eigh(0.5 * r0 - 0.5 * r1)
    Pi0 = v[:, w > 1e-14] @ v[:, w > 1e-14].T
    p0 = np.trace(Pi0 @ r0); p1 = np.trace(Pi0 @ r1)   # P(r=0|s)
    PA = [np.array([p0, 1 - p0]), np.array([p1, 1 - p1])]
    P = 0.5 * np.outer(PA[0], PA[0]) + 0.5 * np.outer(PA[1], PA[1])
    Iab = float(h(P.sum(1)[0]) + h(P.sum(0)[0])) - float(-(P[P > 0] * np.log2(P[P > 0])).sum())
    return P, Iab


rep_rec = {("pi/4", 3): (0.0323, 0.0625, 0.6627, 0.7942), ("pi/8", 4): (0.1575, 0.2654, 0.1652, 0.3717),
           ("pi/6", 5): (0.0633, 0.1187, 0.4745, 0.6594), ("pi/16", 6): (0.2721, 0.3961, 0.0313, 0.1555)}
for (n, m), v in rep_rec.items():
    Pe, q, Iab, JH = rec(TH[n], m)
    P, Iab_b = brute_rec(TH[n], m)
    print(f"  {n:5s} m={m}: Pe={Pe:.4f} q={q:.4f} I(rA:rB)={Iab:.4f} (brute {Iab_b:.4f}) J_H={JH:.4f}   REPORT {v}")

print("\n  Onset ratio with exact curves (large-N_E MI; exact record gate, level 0.9 of 1/2):")
print("   MI: h((1+c^m)/2)=0.9 -> c^m = x1;  records: 1-h(2Pe(1-Pe)) = 0.9 -> c^m = x2")
from scipy.optimize import brentq
x1 = brentq(lambda x: float(h((1 + x) / 2)) - 0.9, 1e-9, 0.999)
q9 = brentq(lambda q: 1 - float(h(q)) - 0.9, 1e-12, 0.4)
Pe9 = (1 - math.sqrt(1 - 2 * q9)) / 2
x2 = math.sqrt(4 * Pe9 * (1 - Pe9))
print(f"   x1 = {x1:.4f}, x2 = {x2:.4f}, ratio ln x2 / ln x1 = {math.log(x2) / math.log(x1):.3f}"
      "  (pre-registration: 0.368, 0.161, 1.83)")

print("=" * 72)
print("3. Identity I_v11 = I_c + (I(rho_A) + I(rho_B))/2 on random two-qubit states")
worst = 0
for _ in range(2000):
    k = rng.integers(1, 5)
    G = rng.normal(size=(4, k)) + 1j * rng.normal(size=(4, k))
    rho = G @ G.conj().T; rho /= np.trace(rho).real
    Iv11 = 1 - S(rho) / 2
    rA, rB = ptrace2(rho, 2, 2, 0), ptrace2(rho, 2, 2, 1)
    Ic = (S(rA) + S(rB) - S(rho)) / 2
    worst = max(worst, abs(Iv11 - (Ic + ((1 - S(rA)) + (1 - S(rB))) / 2)))
print(f"   max deviation over 2000 states: {worst:.2e}  (an algebraic identity: log4 - S = [1-S_A]+[1-S_B]+I)")

print("   Separable (|00><00|+|11><11|)/2: I_c = 1/2; Werner(p) I_c = I_v11 = 1 - S/2. Crossing p:")
def werner_Ic(p):
    ev = np.array([(1 + 3 * p) / 4] + [(1 - p) / 4] * 3)
    return 1 - float(-(ev[ev > 0] * np.log2(ev[ev > 0])).sum()) / 2
print(f"   p* = {brentq(lambda p: werner_Ic(p) - 0.5, 0.1, 0.99):.4f} (phase-2 report corrects 0.749 -> 0.7476)")

print("=" * 72)
print("4. Scrambled environment (independent Haar sampling via full Haar unitary at N_E=8,")
print("   and via (v0, g v0 + sqrt(1-g^2) w) at N_E=12)")


def haar_unitary(d):
    Z = (rng.normal(size=(d, d)) + 1j * rng.normal(size=(d, d))) / math.sqrt(2)
    Q, R = np.linalg.qr(Z)
    return Q * (np.diag(R) / np.abs(np.diag(R)))


def ent_from_matrix(M):
    sv = np.linalg.svd(M, compute_uv=False) ** 2
    sv = sv[sv > 1e-15]
    return float(-(sv * np.log2(sv)).sum())


def mi_curve_branches(v0, v1, N):
    psi = np.concatenate([v0, v1]) / math.sqrt(2)
    HS = ent_from_matrix(psi.reshape(2, -1))
    out = [0.0]
    for m in range(1, N + 1):
        T = psi.reshape(2, 2 ** m, 2 ** (N - m))
        HSF = ent_from_matrix(T.reshape(2 ** (m + 1), -1))
        HF = ent_from_matrix(T.transpose(1, 0, 2).reshape(2 ** m, -1))
        out.append(HS + HF - HSF)
    return np.array(out)


def records_scrambled(v0, v1, N, m):
    """Helstrom records of observers on qubits [0,m), [m,2m); exact joint law."""
    dA = 2 ** m
    V = [v.reshape(dA, dA, -1) for v in (v0, v1)]
    Pis = []
    for side in (0, 1):
        r = []
        for X in V:
            M = X if side == 0 else X.transpose(1, 0, 2)
            M = M.reshape(dA, -1)
            r.append(M @ M.conj().T)
        w, U = np.linalg.eigh(0.5 * r[0] - 0.5 * r[1])
        P0 = U[:, w > 1e-14] @ U[:, w > 1e-14].conj().T
        Pis.append((P0, np.eye(dA) - P0))
    P = np.zeros((2, 2))
    for s in (0, 1):
        for a in (0, 1):
            W = np.einsum("ij,jbr->ibr", Pis[0][a], V[s])
            for b in (0, 1):
                X = np.einsum("bj,ijr->ibr", Pis[1][b], W)
                P[a, b] += 0.5 * float(np.vdot(X, X).real)
    return P / P.sum()


def gates_from_P(P):
    """Exact (N = inf, no regularization) v11 and v12 gates of diag(P)."""
    p = P.ravel(); p = p[p > 0]
    Hj = float(-(p * np.log2(p)).sum())
    Iab = float(h(P.sum(1)[0]) + h(P.sum(0)[0])) - Hj
    return 1 - Hj / 2, Iab / 2, Iab


N = 8
c0 = reduce(np.kron, [np.array([1, 0.0])] * N).astype(complex)
c1 = reduce(np.kron, [np.array([0, 1.0])] * N).astype(complex)   # theta = pi/2
curves = []
for _ in range(20):
    U = haar_unitary(2 ** N)
    curves.append(mi_curve_branches(U @ c0, U @ c1, N))
print(f"   pi/2 N_E=8, 20 full-Haar-unitary draws: mean I(S:F_m) = {np.round(np.mean(curves, 0), 3).tolist()}")
print("     REPORT phase 1:  0.000, 0.015, 0.064, 0.274, 1.000, 1.726, 1.931, 1.987, 2.000")

for th_name, th in [("pi/2", math.pi / 2), ("pi/4", math.pi / 4)]:
    N = 12
    g = math.cos(th) ** N
    d = 2 ** N
    curves, g11, g12, iab = [], {1: [], 2: [], 3: []}, {1: [], 2: [], 3: []}, {1: [], 2: [], 3: []}
    ndraw = 100
    for k in range(ndraw):
        v0 = rng.normal(size=d) + 1j * rng.normal(size=d); v0 /= np.linalg.norm(v0)
        w = rng.normal(size=d) + 1j * rng.normal(size=d); w -= v0 * np.vdot(v0, w); w /= np.linalg.norm(w)
        v1 = g * v0 + math.sqrt(1 - g * g) * w
        if k < 20:
            curves.append(mi_curve_branches(v0, v1, N))
        for m in (1, 2, 3):
            P = records_scrambled(v0, v1, N, m)
            a, b, c = gates_from_P(P)
            g11[m].append(a); g12[m].append(b); iab[m].append(c)
    print(f"   {th_name} N_E=12: mean I(S:F_m), 20 draws = {np.round(np.mean(curves, 0), 3).tolist()}")
    for m in (1, 2, 3):
        x11, x12 = 1e4 * np.array(g11[m]), 1e4 * np.array(g12[m])
        print(f"     m={m}: N*I_v11 exact mean {x11.mean():7.1f} (median {np.median(x11):6.2f}, max {x11.max():7.1f});"
              f"  N*I_c exact mean {x12.mean():5.2f};  I(rA:rB) mean {np.mean(iab[m]):.2e}")
print("   REPORT phase 2 (pi/2, N_E=12): N I_c 0.60/0.41/0.88, N I_v11 1.6/93.7/55.9;"
      " (pi/4): 0.54/0.51/0.83, 1.6/105.5/58.3")

print("=" * 72)
print("5. Horodecki example (Le & Olaya-Castro Eq. C1, p=0.8) and c-maybe m=1 discord")
p = 0.8
k1 = np.zeros(4, complex); k1[0] = math.sqrt(p); k1[3] = math.sqrt(1 - p)
k2 = np.zeros(4, complex); k2[2] = math.sqrt(p); k2[1] = math.sqrt(1 - p)
rho = p * np.outer(k1, k1.conj()) + (1 - p) * np.outer(k2, k2.conj())
rS, rE = ptrace2(rho, 2, 2, 0), ptrace2(rho, 2, 2, 1)
I = S(rS) + S(rE) - S(rho)


def holevo_measure_first(rho, n):
    """chi after projective measurement of qubit 1 (first factor) along Bloch n."""
    X, Y, Z = np.array([[0, 1], [1, 0]]), np.array([[0, -1j], [1j, 0]]), np.diag([1, -1])
    P = (np.eye(2) + n[0] * X + n[1] * Y + n[2] * Z) / 2
    r4 = rho.reshape(2, 2, 2, 2)
    rB = np.einsum("ajak->jk", r4)
    tot = 0
    for Pk in (P, np.eye(2) - P):
        rk = np.einsum("ab,bjak->jk", Pk, r4)
        pk = np.trace(rk).real
        if pk > 1e-14:
            tot += pk * S(rk / pk)
    return S(rB) - tot


def chi_max(rho):
    best = 0
    for t in np.linspace(0, math.pi, 181):
        for ph in np.linspace(0, 2 * math.pi, 73):
            n = [math.sin(t) * math.cos(ph), math.sin(t) * math.sin(ph), math.cos(t)]
            best = max(best, holevo_measure_first(rho, n))
    return best


print(f"   H(S)={S(rS):.4f} I(S:E)={I:.4f} chi_ptr={holevo_measure_first(rho, [0, 0, 1]):.4f}"
      f" chi_max(grid)={chi_max(rho):.4f}")
print("   REPORT: H(S)=0.9044 I=0.9044 chi_ptr=0.1825 chi_max=0.7219")
swap = rho.reshape(2, 2, 2, 2).transpose(1, 0, 3, 2).reshape(4, 4)
print(f"   J(S|E) (measure E, grid) = {chi_max(swap):.4f}  REPORT 0.5715")

# c-maybe pi/4 N_E=12, m=1: rho_SF exactly
th = math.pi / 4; N = 12; c, s = math.cos(th), math.sin(th)
e = np.array([c, s]); z = np.array([1.0, 0])
gam = c ** (N - 1)
rho = np.zeros((4, 4))
rho[:2, :2] = 0.5 * np.outer(z, z); rho[2:, 2:] = 0.5 * np.outer(e, e)
rho[:2, 2:] = 0.5 * gam * np.outer(z, e); rho[2:, :2] = 0.5 * gam * np.outer(e, z)
rS, rF = ptrace2(rho, 2, 2, 0), ptrace2(rho, 2, 2, 1)
I = S(rS) + S(rF) - S(rho)
sw = rho.reshape(2, 2, 2, 2).transpose(1, 0, 3, 2).reshape(4, 4)
print(f"   c-maybe pi/4 N_E=12 m=1: I={I:.4f} chi_ptr={holevo_measure_first(rho, [0, 0, 1]):.4f}"
      f" J(S|F)={chi_max(sw):.4f}  (REPORT 0.6011, 0.6009, 0.3992; J_H closed form {rec(th, 1)[3]:.4f})")
