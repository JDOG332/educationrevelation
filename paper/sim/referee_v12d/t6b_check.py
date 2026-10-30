"""Referee check (phase 4): the T6(b) Section 8 flag.

1. The flagged state (M2, N_E = 8, J = 0, h_S = 0, inhomogeneous g, V0, t = 2, O = {S}): exact closed form,
   the run's float64 Uhlmann value, and an extended-precision (np.longdouble) evaluation of the same 2x2 Uhlmann
   matrix, to locate the error.
2. Re-runs the whole pre-registered T6(b) set (M2 N_E = 8 all main cells at t = 2; M4 N_E = 8 all main cells;
   M3 N_E = 8 three draws per cell; |O| <= 6) with the run's own D and F routines, and reports
   (a) the as-registered gap D - sqrt(1 - F^2) > 1e-9,
   (b) a well-conditioned form D^2 + F^2 - 1 > 1e-12 (no square root of a near-zero number),
   (c) the conditioning-aware form gap > 1e-9 + eps_F / sqrt(1 - F^2), eps_F = 1e-13.
3. Cross-checks the run's selfmeas curve on one state against reproduce.py.
"""
import itertools
import math
import os
import sys
import time

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import run_v12d as d  # noqa: E402

t0 = time.time()
N, n = 8, 9
g = d.m2_gk(N, "inh")
Vs = d.m2_evolve(N, 0.0, 0.0, "inh", "V0", 4.0, 16)
v0, v1 = Vs[8][:, 0], Vs[8][:, 1]
Pp, Pm = (v0 + v1) / math.sqrt(2), (v0 - v1) / math.sqrt(2)
D = d.trace_dist_marg(Pp, Pm, (0,), n)
F = d.root_fid_marg(Pp, Pm, (0,), n)
gam = float(np.prod(np.abs(np.cos(2.0 * g))))
print("1. Flagged state, O = {S}")
print(f"   closed form |gamma| = prod|cos(2 g_k)| = {gam:.12e}; exact F = sqrt(1-gamma^2), so D = sqrt(1-F^2) exactly")
print(f"   run (float64): D = {D:.12e}, F = {F:.17f}, 1-F^2 = {1 - F * F:.6e} (exact {gam ** 2:.6e})")
print(f"   gap D - sqrt(1-F^2) = {D - math.sqrt(max(0, 1 - F * F)):.3e};  F error = {F - math.sqrt(1 - gam ** 2):+.2e} "
      f"(= {(F - math.sqrt(1 - gam ** 2)) / np.finfo(float).eps:.0f} ulp)")
print(f"   norms: |Pp|^2-1 = {np.vdot(Pp, Pp).real - 1:+.2e}, |Pm|^2-1 = {np.vdot(Pm, Pm).real - 1:+.2e}")
Mp, Mm = d._mat_q(Pp, n, (0,)), d._mat_q(Pm, n, (0,))
LD = np.longdouble


def ld_dot(a, b):  # sum conj(a)*b in long double, real/imag separately
    ar, ai, br, bi = (np.asarray(x, LD) for x in (a.real, a.imag, b.real, b.imag))
    return (ar * br + ai * bi).sum(), (ar * bi - ai * br).sum()


# F = Tr sqrt(sqrt(rho) sigma sqrt(rho)) = sqrt(Tr(rho sigma) + 2 sqrt(det(rho sigma))) for 2x2 marginals,
# rho = Mp Mp^dag, sigma = Mm Mm^dag, evaluated in long double from the same float64 states.
def ld_gram(A, B):
    return [[ld_dot(A[i], B[j]) for j in range(2)] for i in range(2)]


rho, sig = ld_gram(Mp, Mp), ld_gram(Mm, Mm)


def cmul(x, y):
    return (x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0])


def mm(A, B):
    return [[tuple(np.add(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))) for j in range(2)] for i in range(2)]


# rho[i][j] = <row i|row j> conj-convention: ld_dot(a,b)=sum conj(a) b = (rho^T)_{ij}; transpose is harmless for
# Tr and det of a product of two transposed matrices (Tr(A^T B^T) = Tr(BA) = Tr(AB)).
P = mm(rho, sig)
tr = P[0][0][0] + P[1][1][0]
det = cmul(P[0][0], P[1][1])[0] - cmul(P[0][1], P[1][0])[0]
nr = rho[0][0][0] + rho[1][1][0]
ns = sig[0][0][0] + sig[1][1][0]
Fld = np.sqrt(tr + 2 * np.sqrt(max(det, LD(0)))) / np.sqrt(nr * ns)
gam_ld = np.prod(np.abs(np.cos(np.asarray(2.0 * g, LD))))
print(f"   long double from the same float64 states: F = {Fld:.20f}; 1-F^2 = {float(1 - Fld * Fld):.6e}")
print(f"   long double gap D - sqrt(1-F^2) = {D - float(np.sqrt(max(LD(0), 1 - Fld * Fld))):.3e} "
      f"(closed-form gamma in long double {float(gam_ld):.12e})")

print("\n2. Whole pre-registered T6(b) set, |O| <= 6")
states = []
for J in d.M2_J:
    for hS in d.M2_HS:
        for gopt in d.M2_G:
            for V in d.M2_V:
                Vs = d.m2_evolve(N, J, hS, gopt, V, 4.0, 16)
                a, b = Vs[8][:, 0], Vs[8][:, 1]
                states.append((f"M2 J{J} h{hS} {gopt} {V}", (a + b) / math.sqrt(2), (a - b) / math.sqrt(2)))
for gtn, gt in d.M4_GT.items():
    for lt in d.M4_LT:
        for mun, mu in d.M4_MU.items():
            states.append((f"M4 g{gtn} l{lt} mu{mun}", d.m4_run(N, gt, lt, mu, d.PLUS), d.m4_run(N, gt, lt, mu, d.MINUS)))
for thn, th in d.M3_THETAS.items():
    for dep in d.M3_D:
        for dr in range(3):
            rng = np.random.default_rng(d.seed(3, list(d.M3_THETAS).index(thn), dep, N, dr))
            E0, E1 = d.m3_branches(th, N, dep, rng)
            states.append((f"M3 {thn} d{dep} #{dr}", np.concatenate([E0, E1]) / math.sqrt(2),
                           np.concatenate([E0, -E1]) / math.sqrt(2)))
na = nb = nc = 0
worst_a = worst_b = (-1, None)
gaps = []
tot = 0
for lab, pp, pm in states:
    for k in range(1, 7):
        for O in itertools.combinations(range(n), k):
            D = d.trace_dist_marg(pp, pm, O, n)
            F = min(1.0, d.root_fid_marg(pp, pm, O, n))
            one = max(0.0, 1 - F * F)
            ga = D - math.sqrt(one)
            gb = D * D + F * F - 1
            tot += 1
            gaps.append(ga)
            if ga > 1e-9:
                na += 1
            if gb > 1e-12:
                nb += 1
            if ga > 1e-9 + 1e-13 / max(math.sqrt(one), 1e-300):
                nc += 1
            if ga > worst_a[0]:
                worst_a = (ga, (lab, O, D, one))
            if gb > worst_b[0]:
                worst_b = (gb, (lab, O, D, one))
gaps = np.array(gaps)
print(f"   {len(states)} states, {tot} (state, O) pairs")
print(f"   (a) as registered, gap > 1e-9: {na}; worst {worst_a[0]:.3e} at {worst_a[1][0]} O={worst_a[1][1]} "
      f"D={worst_a[1][2]:.3e}")
print(f"   (b) D^2 + F^2 - 1 > 1e-12: {nb}; worst {worst_b[0]:.3e} at {worst_b[1][0]} O={worst_b[1][1]}")
print(f"   (c) conditioning-aware: {nc}")
print(f"   gaps > 0: {(gaps > 0).sum()}, > 1e-12: {(gaps > 1e-12).sum()}, > 1e-11: {(gaps > 1e-11).sum()}, "
      f"> 1e-10: {(gaps > 1e-10).sum()}; second-largest gap {np.sort(gaps)[-2]:.3e}")
print(f"   bound saturated (|gap| < 1e-8): {(np.abs(gaps) < 1e-8).sum()} pairs")

print("\n3. Run's selfmeas on M2 J1 h0.25 hom VC t=2 (compare reproduce.py part C)")
Vs = d.m2_evolve(N, 1.0, 0.25, "hom", "VC", 4.0, 16)
a, b = Vs[8][:, 0], Vs[8][:, 1]
sm, _ = d.selfmeas((a + b) / math.sqrt(2), (a - b) / math.sqrt(2), n)
print(f"   run delta_self = {np.round(sm['delta_self'], 4).tolist()}, maxD_inE = {sm['maxD_inE']:.3e}")
print(f"(wall {time.time() - t0:.0f} s)")
