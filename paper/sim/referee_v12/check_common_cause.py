"""Referee check, part 3: a common-cause counterexample outside the pre-registered grid.

The environment starts classically correlated, rho_E = (|0..0><0..0| + |1..1><1..1|)/2,
instead of a product state, then the same c-maybe coupling to S in |+> is applied.
Observers make the same Helstrom measurement (pointer-conditional fragment states,
priors 1/2) on disjoint m-qubit fragments. Because their fragments share a hidden
bit k that has nothing to do with S, their records can agree far more than either
record says about S. The exact v12 record gate (I(r_A:r_B)/2) is compared with
one observer's information about the pointer, J_H = I(s:r_A), and with the
Touil-Yan-Zurek-style conditional quantity I(r_A:r_B | s).

    python3 check_common_cause.py      # seconds
"""
import math
import numpy as np
from functools import reduce


def H(p):
    p = np.asarray(p, float).ravel(); p = p[p > 1e-300]
    return float(-(p * np.log2(p)).sum())


def kron_n(v, n):
    return reduce(np.kron, [v] * n)


def run(theta, m, phi=math.pi / 2):
    c, s = math.cos(theta), math.sin(theta)
    R = np.array([[c, -s], [s, c]])
    kets = {0: [np.array([1.0, 0]), np.array([math.cos(phi), math.sin(phi)])]}   # hidden k = 0, 1 ; s = 0
    kets[1] = [R @ kets[0][0], R @ kets[0][1]]                     # s = 1
    # conditional fragment states rho_{F|s,k} = |x_k^s><x_k^s|^{(x) m}
    frag = {(sv, k): np.outer(kron_n(kets[sv][k], m), kron_n(kets[sv][k], m)) for sv in (0, 1) for k in (0, 1)}
    rho_s = {sv: 0.5 * (frag[(sv, 0)] + frag[(sv, 1)]) for sv in (0, 1)}
    w, U = np.linalg.eigh(0.5 * rho_s[0] - 0.5 * rho_s[1])
    Pi0 = U[:, w > 1e-14] @ U[:, w > 1e-14].T
    pr = {(sv, k): float(np.trace(Pi0 @ frag[(sv, k)])) for sv in (0, 1) for k in (0, 1)}   # P(r=0|s,k)
    # joint law P(s, a, b) = sum_k 1/2 * 1/2 * P(a|s,k) P(b|s,k)
    P = np.zeros((2, 2, 2))
    for sv in (0, 1):
        for k in (0, 1):
            pa = np.array([pr[(sv, k)], 1 - pr[(sv, k)]])
            P[sv] += 0.25 * np.outer(pa, pa)
    Pab = P.sum(0)
    I_ab = H(Pab.sum(1)) + H(Pab.sum(0)) - H(Pab)
    Psa = P.sum(2)
    J_H = H(Psa.sum(1)) + H(Psa.sum(0)) - H(Psa)
    # I(r_A:r_B|s)
    I_ab_s = sum(0.5 * (H(P[sv].sum(1) / 0.5) + H(P[sv].sum(0) / 0.5) - H(P[sv] / 0.5)) for sv in (0, 1))
    # what a conditionally independent (product-environment) pair with the same J_H would give
    from scipy.optimize import brentq
    Pe = brentq(lambda x: 1 - H([x, 1 - x]) - J_H, 1e-15, 0.5 - 1e-12) if J_H > 1e-12 else 0.5
    q = 2 * Pe * (1 - Pe)
    I_ab_ci = 1 - H([q, 1 - q])
    return J_H, I_ab, I_ab_s, I_ab_ci, Pab


print("(1) rho_E = (|0..0><0..0| + |1..1><1..1|)/2 (phi = pi/2): by the X-flip symmetry the Helstrom")
print("    record ignores k, so records stay conditionally independent and no false positive arises:")
print("theta   m   J_H(one obs)   I(rA:rB)   I(rA:rB|s)   I(rA:rB) if cond.-indep. with same J_H   gate v12 = I/2")
for th_name, th in (("pi/16", math.pi / 16), ("pi/8", math.pi / 8), ("pi/4", math.pi / 4)):
    for m in (1, 2, 3, 4, 5):
        J, Iab, Iabs, Ici, Pab = run(th, m)
        print(f"{th_name:6s} {m:2d}   {J:10.4f}   {Iab:9.4f}   {Iabs:9.4f}   {Ici:12.4f}   {Iab / 2:10.4f}")

print()
print("(2) rho_E = (|0..0><0..0| + |b..b><b..b|)/2, |b> = cos(phi)|0> + sin(phi)|1> (hidden bit k not")
print("    symmetric under the coupling): search over phi, theta, m <= 6 for the largest excess of")
print("    I(rA:rB) over the conditionally-independent value at the same J_H.")
best = []
for phi in np.linspace(0.1, math.pi - 0.1, 30):
    for th in np.linspace(0.05, math.pi / 2, 30):
        for m in range(1, 7):
            J, Iab, Iabs, Ici, Pab = run(th, m, phi)
            best.append((Iab - Ici, phi, th, m, J, Iab, Iabs, Ici))
best.sort(reverse=True)
print("   phi     theta    m    J_H      I(rA:rB)  I(rA:rB|s)  I_ci(same J_H)")
for b in best[:6]:
    print(f"   {b[1]:.3f}  {b[2]:.3f}  {b[3]:2d}   {b[4]:.4f}   {b[5]:.4f}    {b[6]:.4f}     {b[7]:.4f}")
# the cleanest false-positive style case: small J_H but large record agreement
fp = [b for b in best if b[4] < 0.2]
fp.sort(key=lambda b: -b[5])
print("   largest I(rA:rB) with J_H < 0.2 bit:")
for b in fp[:3]:
    print(f"   phi={b[1]:.3f} theta={b[2]:.3f} m={b[3]}: J_H={b[4]:.4f}, I(rA:rB)={b[5]:.4f} (gate {b[5]/2:.4f},"
          f" N*gate = {1e4*b[5]/2:.0f} vs floor 27.9), I(rA:rB|s)={b[6]:.4f}, cond.-indep. value {b[7]:.4f}")

print()
print("(3) hand-picked, non-degenerate points (phi = pi/3, pi/4):")
print("   phi    theta   m    J_H      I(rA:rB)  I(rA:rB|s)  I_ci(same J_H)  N*gate_v12 (N=1e4)")
for phn, ph in (("pi/3", math.pi / 3), ("pi/4", math.pi / 4)):
    for thn, th in (("pi/16", math.pi / 16), ("pi/8", math.pi / 8)):
        for m in (1, 2, 4):
            J, Iab, Iabs, Ici, Pab = run(th, m, ph)
            print(f"   {phn:5s} {thn:6s} {m:2d}   {J:.4f}   {Iab:.4f}    {Iabs:.4f}     {Ici:.4f}       {1e4 * Iab / 2:7.0f}")
