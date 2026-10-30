"""
run_v12c.py: CRT v12, phase 3. Can observers who cannot read S, but can act
on it, separate redundant records of S from common-cause agreement?

THIS FILE IS A PRE-REGISTRATION ONLY. No phase-3 code exists yet and no
phase-3 quantity has been computed. The implementation will be appended
below this docstring in a later commit; this docstring will not be edited
after the pre-registration commit (corrections, if any, go in the report).
The commit is to be pushed as a tag to GitHub for an external timestamp
before anything is run.

Context: phase 1 (63a4baa, 89731a2), phase 2 (e4cd77b, 1568b26) and the
referee report paper/sim/referee_v12/REPORT.md (09eb0e7, 66b86e2). The
referee showed (check_common_cause.py) that a common-cause environment
gives strong record agreement with almost no information about S, so
record agreement (Psi_v11, Psi_v12, I(r_A:r_B)) is not a witness of
objectivity.

=============================================================================
0. What is already known (literature search, 2026-10-30; not exhaustive)
=============================================================================
- Interventions separate causation from confounding: standard causal
  inference (Pearl, Causality, 2nd ed. 2009; Spirtes, Glymour & Scheines
  2000). Quantum causal models: Ried, Agnew, Vermeyden, Janzing, Spekkens &
  Resch, Nat. Phys. 11, 414 (2015), arXiv:1406.5036 (common cause vs
  cause-effect between two quantum systems, with and without interventions);
  Costa & Shrapnel, New J. Phys. 18, 063032 (2016); Allen, Barrett,
  Horsman, Lee & Spekkens, PRX 7, 031021 (2017), arXiv:1609.09487.
- Consensus between fragments in quantum Darwinism: Touil, Yan & Zurek,
  arXiv:2503.14791 (2025) [TYZ]. Pairwise consensus I(F:F')/H_S and a
  refined consensus Im(F:F'|S_Lambda) = I(F:F') - I(F:F'|S_Lambda), where
  the conditioning is on a MEASUREMENT of the system observable Lambda (it
  needs access to S). It is introduced because I(F:F') can contain
  correlations not about S (e.g. direct fragment interaction). No
  intervention on S is used.
- Strong quantum Darwinism and spectrum broadcast structure require
  conditional independence of fragments given the pointer and are stated on
  the joint S-E state: Le & Olaya-Castro, PRL 122, 010403 (2019),
  arXiv:1803.08936; Korbicz, Horodecki & Horodecki, PRL 112, 120402 (2014),
  arXiv:1401.1712; non-objectivity witness without full tomography: Le &
  Olaya-Castro, arXiv:1908.08818 (uses S).
- Observers who see only the environment: Poderini et al., "Witnessing the
  non-objectivity of an unknown quantum dynamics", arXiv:2211.15638 (2022).
  They name the failure mode "collective hallucination" (observers agree,
  outcome uncorrelated with S) and detect it device-independently by a
  CHSH violation over the observers' own measurement settings. There is no
  intervention on S, and a classical hidden-bit common cause cannot violate
  CHSH, so their witness does not detect the classical common cause studied
  here.
- Recent operational measures (Kiely et al., arXiv:2510.12313; Tank,
  arXiv:2509.17775; Tran, Tran & Ho, arXiv:2610.07568) vary preparations
  only as design parameters, with no common-cause test.
Finding: I found no prior use of interventions on S, by observers without
read access to S, to separate S-caused record agreement from environmental
common cause. The underlying principle is textbook causal inference, and
for pointer-conserving dynamics the proposed quantity is identical to TYZ's
refined consensus at the level of records (Lemma L5 below). Any novelty is
therefore operational (do instead of see), and a difference from TYZ can
only appear for pointer-non-conserving dynamics. That is the open test
(Section 6, T4). The other tests are analytic or estimator checks and are
labelled so in advance.

=============================================================================
1. Records-only no-go (statement and proof)
=============================================================================
Claim. Let rho_SE be any state, and let the observers act only on E (any
instruments on any fragments, any number of shots, any classical
post-processing, any communication between them), with no operation on S.
Then every statistic they can obtain is a function of rho_E = Tr_S rho_SE
alone. For every rho_SE there is a "common-cause twin"
rho'_SE = |+><+|_S (x) rho_E, with the same rho_E and I(S:E) = 0. Hence no
function of the observers' record statistics, nor of full tomography of
E, can separate a state with redundant records of S (I(S:F) ~ H_S for
many fragments) from its twin, which has no information about S.
Proof. The probability of any outcome string of instruments acting on E is
Tr[(1_S (x) M) rho_SE] = Tr[M rho_E], and rho'_E = rho_E. QED.
Physical twin of the c-maybe state. Tr_S of the c-maybe state is
rho_E = (|E_0><E_0| + |E_1><E_1|)/2, |E_0> = |0>^N, |E_1> = |e>^N,
|e> = cos(theta)|0> + sin(theta)|1>: a hidden fair bit K selects one of two
product environment states, and S never interacts. This is the referee's
common-cause construction with the correlated states chosen to coincide
with the Darwinian branches.
Numerical check (test, pre-stated): trace distance between rho_E of the
c-maybe state and of its twin < 1e-12, and identical record laws for both
observer types, at N_E = 12, theta in {pi/8, pi/4, pi/2}.

=============================================================================
2. Interventions and the definition of responsive agreement
=============================================================================
Protocols (per shot; the observers never read S):
  P_nat  natural: S prepared in |+>, dynamics, both observers record.
  P_do   interventional: the observers draw a shared fair bit X, prepare S
         in |X> (pointer basis), i.e. do(S_pointer = X) at t = 0, then the
         same dynamics; both observers record and both know X.
Assumptions (stated, not tested): X is chosen independently of everything
else (free choice, the analogue of no-superdeterminism in Poderini et al.);
X influences E only through S (the actuator does not touch E); the
preparation acts on the pointer basis that the dynamics records. A phase-type
intervention (Z^X on |+>) or a flip of |+> leaves pointer records unchanged
and gives zero responsive agreement (limit L8): the intervention has to
change pointer populations.

Definition (responsive agreement, records-level, in bits). With the joint
law of (X, r_A, r_B) under P_do,
    RA := I(r_A:r_B) - I(r_A:r_B | X)
        = I(X:r_A) + I(X:r_B) - I(X:r_A r_B)       (co-information).
Responsive fraction: f_resp := RA / I(r_A:r_B) (reported when
I(r_A:r_B) >= 0.05 bit). Records-only consensus for comparison:
C_rec := I(r_A:r_B) under P_nat.
Why this form over the alternatives:
  - min(I(X:r_A), I(X:r_B)) scores what each observer knows about X, not
    whether they agree;
  - I(X : r_A r_B) scores the pair's total information, including synergy;
  - linear version Cov(r_A, r_B) - E_x Cov(r_A, r_B | x): reported as a
    secondary, since it misses nonlinear dependence.
  RA is the interventional analogue of TYZ's Im(F:F'|S_Lambda), with the
  observers' own setting X in place of a measurement of S.

Limit checks (each a unit test, pre-stated):
  L1 perfect redundant records (c-maybe theta = pi/2, product E, Helstrom):
     r_A = r_B = X, RA = 1 bit, f_resp = 1.
  L2 pure common cause (S uncoupled, theta = 0, or the twin of Section 1):
     records independent of X, RA = 0 exactly, for any I(r_A:r_B).
  L3 RA <= min(I(X:r_A), I(X:r_B)): responsive agreement cannot exceed
     either observer's interventional information about S. (Identity
     RA = I(X:r_A) - I(X:r_A | r_B).)
  L4 records conditionally independent given X (product environment):
     I(r_A:r_B | X) = 0, so RA = I(r_A:r_B) (TYZ: Im = I for branching states).
  L5 equivalence with TYZ: if the dynamics conserves the pointer
     ([Pi_s (x) 1, H] = 0) and S starts in |+>, the joint law of
     (s_pointer, r_A, r_B), with S measured in the pointer basis at the end
     of P_nat, equals the joint law of (X, r_A, r_B) under P_do. Then RA
     equals TYZ's refined consensus evaluated on the records, Im_rec(S) :=
     I(r_A:r_B) - I(r_A:r_B | s), computed with S access. Proof sketch:
     the pointer projectors commute with the evolution, so measuring s at
     the end equals measuring it at t = 0, which leaves S in |s> with
     probability 1/2; the off-diagonal terms do not contribute to
     statistics of operators diagonal in s.
  L6 RA can be negative (synergy): r_A = K, r_B = K xor X gives RA = -1.
     RA is reported signed; only RA > 0 counts as responsive agreement.
  L7 RA is invariant under relabelling either record and under X -> 1 - X.
  L8 a phase intervention (S in |+>, apply Z^X) gives RA = 0 for pointer
     records under pointer-conserving dynamics.

Quantum fragment-level comparison (where computable): TYZ's
Im(F_A:F_B|S_Pi) = I(F_A:F_B) - I(F_A:F_B|S_Pi) on the exact state at
time t, P_nat, for fragments of at most 3 qubits each (rho of S F_A F_B
of dimension <= 128).

=============================================================================
3. Environments (fixed now)
=============================================================================
  E1 c-maybe, product environment in |0>^N_E, N_E = 12, theta in
     {pi/8, pi/4, pi/2}, fragments m in {1, 2, 3, 4} (F_A = qubits 1..m,
     F_B = m+1..2m).
  E2 common cause, the referee's construction: rho_E = (|0><0|^N +
     |b><b|^N)/2, |b> = cos(phi)|0> + sin(phi)|1>, phi in {pi/4, pi/3},
     coupling theta in {0, pi/16, pi/8, pi/4}, N_E = 12, m in {1, 2, 4}.
     theta = 0 is a pure common cause.
  E1-twin the common-cause twin of E1 (Section 1), same grid as E1.
  E3 Haar-scrambled: E1 at theta = pi/2, N_E = 12, then a Haar unitary on E
     (exact branch-vector sampling as in phase 1), 100 Haar draws,
     m in {1, 2, 3, 6}.
  E4 spin chain with intra-environment coupling (the open test):
       H = g |1><1|_S (x) sum_k sigma_y^k
           + (J/2) sum_{k=1}^{N_E - 1} (sigma_x^k sigma_x^{k+1} + sigma_y^k sigma_y^{k+1})
           + h_S sigma_x^S,
     N_E = 10, E starts in |0>^N_E, g = 1, J in {0, 1}, h_S in
     {0, 0.25, 1.0}, times t in {0.25, 0.5, ..., 3.0} (12 points), exact
     statevector evolution (eigendecomposition of the 2^11 Hamiltonian).
     Fragments at the two ends of the chain: F_A = sites 1..m,
     F_B = sites N_E-m+1..N_E, m in {1, 2}. With J = 0 and h_S = 0 this is
     the c-maybe model with theta = g t. h_S = 0 conserves the pointer
     (L5 applies); h_S > 0 does not.

=============================================================================
4. Observers and estimators
=============================================================================
Observer types:
  Helstrom: as phases 1-2, minimum-error measurement between the fragment's
    pointer-conditional states (priors 1/2), fair coin on the tied subspace
    (phase-2 R1t rule). Pointer-conditional states are defined by P_do
    (preparation X = 0 or 1) at the same time t; the observers are assumed
    to know them (model-based). For E2 they average over the hidden bit, as
    in the referee script; for E1-twin they use the E1 states.
  Local: each qubit of the fragment measured in sigma_z, record = majority
    (1 if more ones than zeros), fair coin on ties. Model-free.
Estimators (finite counts):
  Primary: plug-in mutual informations from the 2x2x2 counts of
    (X, r_A, r_B), N_shots = 1e4 per protocol per point (P_do and P_nat each),
    giving RA-hat, C_rec-hat, f_resp-hat. Secondary: Miller-Madow
    bias-corrected versions.
  Baseline from phase 2: Psi_v12-hat (records state, crt pipeline,
    gate 'v12', B_boot = 200, 40 runs per point) under P_nat, for E1
    (theta = pi/4, m = 1..4), E2 (phi = pi/3, all theta, m = 1) and
    E1-twin (theta = pi/4, m = 1..4).
Intervals: percentile bootstrap over shots, B = 1000 resamples per dataset
  (95%: 2.5 and 97.5 percentiles). For E3, percentile intervals over the
  100 Haar draws (one dataset per draw).
Null calibration (run first, on a separate seed stream, study 0, before
  any test is evaluated): 2000 independent datasets of N_shots = 1e4 from
  a law with RA = 0 exactly and strong record agreement (E2 at theta = 0,
  phi = pi/3, m = 1, Local observer: its record reads the hidden bit), and
  2000 from fully independent unbiased records.
  tau_RA := 99th percentile of RA-hat over the first set;
  tau_C := 99th percentile of C_rec-hat over the second set.
Seeds: SeedSequence((MASTER_SEED_V12C = 20261103, study, item..., replicate)),
  disjoint from phases 1 and 2.

=============================================================================
5. Predictions
=============================================================================
Derivable in advance (consistency and estimator checks; their passing is
not evidence beyond the derivations): T1, T2, T3. Not derivable: T4.

=============================================================================
6. Tests, failure conditions, verdict rules
=============================================================================
T1 (no-go and its resolution; analytic, checked numerically). For each E1
  point and its twin: records-only statistics under P_nat identical (exact
  record laws equal to 1e-12, for both observer types); under P_do, exact
  RA(twin) = 0 and RA(E1) = I(r_A:r_B) (to 1e-12).
  FAIL if any equality is violated (that would be an error in the
  derivation or the code). Verdict PASS / FAIL.

T2 (separation on the common-cause grid; estimator check). Exact and
  finite-count, both observer types.
  (a) For every E1 point with exact I(r_A:r_B) >= 0.1 bit: the 95%
      percentile interval of f_resp-hat lies within [0.9, 1.1].
  (b) For every E2 point with theta > 0, exact J = I(X:r_A) <= 0.05 bit and
      exact I(r_A:r_B) >= 0.1 bit: the 95% interval of f_resp-hat lies
      within [-0.1, 0.1], while C_rec-hat > tau_C (records-only consensus
      reports agreement: the false positive that RA removes).
  (c) For every E2 point with theta = 0 and every E1-twin point: the 95%
      interval of RA-hat contains 0 or lies below tau_RA.
  If no grid point meets the selection condition of (a) or (b), that part
  is vacuous and is reported as such (it then neither passes nor fails).
  Verdict: PASS if (a), (b), (c) all hold; otherwise FAIL, listing points.

T3 (scrambled environment; derivable up to finite-size terms). E3, both
  observer types, m in {1, 2, 3}: the 95% percentile interval over Haar
  draws of RA-hat lies below 0.05 bit. Verdict PASS / FAIL.

T4 (OPEN TEST: interventions vs S access when the pointer is not
  conserved). E4 with h_S > 0 (J in {0, 1}, h_S in {0.25, 1.0}, m in
  {1, 2}, both observer types, 12 times): compare exact RA(t) (P_do,
  records plus the setting X, no S access) with TYZ's records-level refined
  consensus Im_rec(S)(t) = I(r_A:r_B) - I(r_A:r_B | s(t)) (P_nat, S
  measured in the pointer basis at time t; requires S access).
  Hypothesis H4: interventions reproduce the S-access quantity:
  |RA(t) - Im_rec(S)(t)| <= 0.1 bit at every grid time where
  max(RA, Im_rec(S)) >= 0.1 bit, in every (J, h_S, m, observer) cell.
  Control (derivable, L5): h_S = 0 cells give |RA - Im_rec(S)| < 1e-10 for
  every J.
  Why the outcome cannot be derived in advance: with h_S > 0 the pointer
  value at time t differs from the prepared X; records written at
  different times are correlated with different values of a precessing
  pointer, the natural protocol starts from |+> rather than a pointer
  state, and the intra-environment hopping moves records along the chain.
  Neither the sign nor the size of RA - Im_rec(S) is known to the author.
  Verdict: H4 SUPPORTED if the condition holds in every cell; NOT SUPPORTED
  otherwise, listing the cells and the largest gap. Both outcomes are
  reported as results; a negative outcome means the interventional
  quantity is a different object from TYZ's beyond pointer-conserving
  dynamics (it would then need its own justification); a positive one means
  interventions can replace S access in this model.
  Also reported for E4 (no verdict): the finite-count estimates (plug-in,
  percentile intervals) at each point, the quantum fragment-level TYZ
  Im(F_A:F_B|S_Pi) for m in {1, 2}, and the fraction of grid points with
  RA < 0.

Secondary, no verdict: Psi_v12-hat baselines (Section 4), showing the
  common-cause false positive in the CRT score; the linear covariance
  version of RA; Miller-Madow estimates; TYZ quantum Im(F:F'|S_Pi) for
  E1, E2, E3 with m <= 3.

Budget: exact quantities are small linear algebra (E4: one 2048 x 2048
eigendecomposition per (J, h_S) and two initial states); finite counts are
multinomial draws from exact laws; the Psi_v12 baselines are about
600 pipeline runs. Expected total under 30 minutes on 2 CPUs.
"""

# =============================================================================
# Implementation (appended after the pre-registration commit 4733c03; the
# docstring above is unchanged).
# =============================================================================

from __future__ import annotations  # noqa: E402

import argparse  # noqa: E402
import json  # noqa: E402
import math  # noqa: E402
import os  # noqa: E402
import platform  # noqa: E402
import sys  # noqa: E402
import time  # noqa: E402
from functools import reduce  # noqa: E402
from multiprocessing import Pool  # noqa: E402

import numpy as np  # noqa: E402
import scipy  # noqa: E402
import scipy.sparse as sp  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import crt  # noqa: E402
import run_v12 as v1  # noqa: E402
from run_v12b import helstrom_tiefix  # noqa: E402

MASTER_SEED_V12C = 20261103
OUT = os.path.join(HERE, "results", "v12")
N_SHOTS = 10_000
B_BOOT = 1000          # bootstrap resamples for percentile intervals
N_NULL = 2000
N_HAAR = 100
PSI_RUNS = 40
PSI_BBOOT = 200
LN2 = math.log(2)

E1_THETAS = {"pi/8": math.pi / 8, "pi/4": math.pi / 4, "pi/2": math.pi / 2}
E1_M = (1, 2, 3, 4)
E2_PHIS = {"pi/4": math.pi / 4, "pi/3": math.pi / 3}
E2_THETAS = {"0": 0.0, "pi/16": math.pi / 16, "pi/8": math.pi / 8, "pi/4": math.pi / 4}
E2_M = (1, 2, 4)
E3_M = (1, 2, 3, 6)
E4_J = (0.0, 1.0)
E4_H = (0.0, 0.25, 1.0)
E4_T = tuple(0.25 * k for k in range(1, 13))
E4_M = (1, 2)
N_E = 12
N_E4 = 10
OBS = ("Helstrom", "Local")


def seed(*items):
    return np.random.SeedSequence((MASTER_SEED_V12C,) + tuple(int(x) for x in items))


# ---------------------------------------------------------------------------
# Information quantities on joint laws / counts (vectorized over leading axes)
# ---------------------------------------------------------------------------

def _H(p, axis):
    p = np.asarray(p, float)
    with np.errstate(divide="ignore", invalid="ignore"):
        t = np.where(p > 0, -p * np.log2(np.where(p > 0, p, 1.0)), 0.0)
    return t.sum(axis=axis)


def _Hc(c, axes, mm):
    """Plug-in entropy (bits) of count arrays summed over `axes`; with mm,
    the Miller-Madow correction (k - 1)/(2 n ln 2), k = nonzero cells."""
    n = c.sum(axis=axes)
    p = c / np.expand_dims(n, axes) if isinstance(axes, int) else c / n.reshape(n.shape + (1,) * len(axes))
    h = _H(p, axes)
    if mm:
        k = (c > 0).sum(axis=axes)
        h = h + (k - 1) / (2 * n * LN2)
    return h


def info_xab(c, mm=False):
    """c: counts or probabilities, shape (..., 2, 2, 2) over (x, a, b).
    Returns dict of I(a:b), I(a:b|x), RA, I(x:a), I(x:b), linear cov version."""
    c = np.asarray(c, float)
    cab = c.sum(axis=-3)
    cxa = c.sum(axis=-1)
    cxb = c.sum(axis=-2)
    ca = cab.sum(axis=-1)
    cb = cab.sum(axis=-2)
    cx = cxa.sum(axis=-1)
    H = lambda arr, nd: _Hc(arr, tuple(range(-nd, 0)), mm)  # noqa: E731
    Hab, Ha, Hb = H(cab, 2), H(ca, 1), H(cb, 1)
    Hxab, Hxa, Hxb, Hx = H(c, 3), H(cxa, 2), H(cxb, 2), H(cx, 1)
    Iab = Ha + Hb - Hab
    Iab_x = Hxa + Hxb - Hxab - Hx
    n = c.sum(axis=(-1, -2, -3))
    P = c / n[..., None, None, None]
    pab = P.sum(-3)
    Eab = pab[..., 1, 1]
    cov = Eab - pab.sum(-1)[..., 1] * pab.sum(-2)[..., 1]
    px = P.sum((-1, -2))
    covx = 0.0
    for x in (0, 1):
        q = P[..., x, :, :] / px[..., x, None, None]
        covx = covx + px[..., x] * (q[..., 1, 1] - q.sum(-1)[..., 1] * q.sum(-2)[..., 1])
    return {"I_ab": Iab, "I_ab_x": Iab_x, "RA": Iab - Iab_x, "I_xa": Ha + Hx - Hxa, "I_xb": Hb + Hx - Hxb,
            "cov_resp": cov - covx}


def mi_ab(c, mm=False):
    c = np.asarray(c, float)
    return _Hc(c.sum(-1), (-1,), mm) + _Hc(c.sum(-2), (-1,), mm) - _Hc(c, (-2, -1), mm)


# ---------------------------------------------------------------------------
# States as ensembles {(weight, statevector)} on S (qubit 0) + E
# ---------------------------------------------------------------------------

def prod(vs):
    return reduce(np.kron, vs, np.array([1.0 + 0j]))


def ket1(theta):
    return np.array([math.cos(theta), math.sin(theta)], complex)


def basis(x):
    return np.array([1, 0], complex) if x == 0 else np.array([0, 1], complex)


PLUS = np.array([1, 1], complex) / math.sqrt(2)


def e1_ensembles(theta, n):
    """c-maybe, product environment. P_do: X=x; P_nat: S in |+>."""
    E0, E1 = prod([basis(0)] * n), prod([ket1(theta)] * n)
    do = {0: [(1.0, np.kron(basis(0), E0))], 1: [(1.0, np.kron(basis(1), E1))]}
    nat = [(1.0, (np.kron(basis(0), E0) + np.kron(basis(1), E1)) / math.sqrt(2))]
    return do, nat


def twin_ensembles(theta, n):
    """Common-cause twin: E in (|E0><E0| + |E1><E1|)/2 (hidden bit), S never couples."""
    E0, E1 = prod([basis(0)] * n), prod([ket1(theta)] * n)
    do = {x: [(0.5, np.kron(basis(x), E0)), (0.5, np.kron(basis(x), E1))] for x in (0, 1)}
    nat = [(0.5, np.kron(PLUS, E0)), (0.5, np.kron(PLUS, E1))]
    return do, nat


def e2_ensembles(phi, theta, n):
    """Referee's correlated environment: (|0><0|^n + |b><b|^n)/2, |b> = R(phi)|0>,
    then the c-maybe coupling (s = 1 rotates every qubit by R(theta))."""
    R = v1.rot(theta)
    ks = [basis(0), ket1(phi)]
    do = {0: [(0.5, np.kron(basis(0), prod([k] * n))) for k in ks],
          1: [(0.5, np.kron(basis(1), prod([R @ k] * n))) for k in ks]}
    nat = [(0.5, (np.kron(basis(0), prod([k] * n)) + np.kron(basis(1), prod([R @ k] * n))) / math.sqrt(2))
           for k in ks]
    return do, nat


def e3_ensembles(rng, n, theta=math.pi / 2):
    psi = v1.scrambled_psi(theta, n, rng)
    v0, v1_ = v1.branch_vectors(psi, n)
    do = {0: [(1.0, np.kron(basis(0), v0))], 1: [(1.0, np.kron(basis(1), v1_))]}
    nat = [(1.0, psi)]
    return do, nat


def _pauli_on(op, site, n):
    mats = [sp.identity(2, format="csr", dtype=complex)] * n
    mats = list(mats)
    mats[site] = sp.csr_matrix(op)
    return reduce(lambda a, b: sp.kron(a, b, format="csr"), mats)


def e4_hamiltonian(J, hS, n_env=N_E4, g=1.0):
    n = n_env + 1
    X, Y = crt.PAULI["X"], crt.PAULI["Y"]
    P1 = np.diag([0, 1]).astype(complex)
    H = sp.csr_matrix((2 ** n, 2 ** n), dtype=complex)
    for k in range(1, n):
        H = H + g * (_pauli_on(P1, 0, n) @ _pauli_on(Y, k, n))
    for k in range(1, n - 1):
        H = H + (J / 2) * (_pauli_on(X, k, n) @ _pauli_on(X, k + 1, n) + _pauli_on(Y, k, n) @ _pauli_on(Y, k + 1, n))
    if hS:
        H = H + hS * _pauli_on(X, 0, n)
    return H.toarray()


def e4_evolver(J, hS, n_env=N_E4):
    w, V = np.linalg.eigh(e4_hamiltonian(J, hS, n_env))
    E0 = prod([basis(0)] * n_env)
    init = {0: np.kron(basis(0), E0), 1: np.kron(basis(1), E0)}
    c0 = {x: np.conj(V.T) @ init[x] for x in (0, 1)}

    def at(t):
        ph = np.exp(-1j * w * t)
        vx = {x: V @ (ph * c0[x]) for x in (0, 1)}
        do = {x: [(1.0, vx[x])] for x in (0, 1)}
        nat = [(1.0, (vx[0] + vx[1]) / math.sqrt(2))]
        return do, nat
    return at


# ---------------------------------------------------------------------------
# Observers and exact record laws
# ---------------------------------------------------------------------------

def frag_dm(ens, n, frag):
    return sum(w * v1.reduced_dm_pure(psi, n, list(frag)) for w, psi in ens)


def local_majority_pi0(m):
    d = 2 ** m
    diag = np.zeros(d)
    for i in range(d):
        ones = bin(i).count("1")
        diag[i] = 1.0 if 2 * ones < m else (0.5 if 2 * ones == m else 0.0)
    return np.diag(diag).astype(complex)


def observer_pi0(kind, do_ref, n, frag):
    if kind == "Local":
        return local_majority_pi0(len(frag))
    r0, r1 = frag_dm(do_ref[0], n, frag), frag_dm(do_ref[1], n, frag)
    return helstrom_tiefix(r0, r1)[0]


def _expect(ens, n, fA, fB, MA, MB):
    """sum_w <psi| Pi_s (x) MA (x) MB |psi> for s = 0, 1 (S = qubit 0)."""
    out = np.zeros(2)
    dA, dB = 2 ** len(fA), 2 ** len(fB)
    for w, psi in ens:
        T = v1._matricize(psi, n, [0] + list(fA) + list(fB)).reshape(2, dA, dB, -1)
        val = np.einsum("sijr,ik,jl,sklr->s", np.conj(T), MA, MB, T, optimize=True)
        out += w * np.real(val)
    return out


def record_laws(do, nat, n, fA, fB, PiA0, PiB0):
    """P_do law P(x, a, b) (x fair) and P_nat law P(s, a, b) (S measured in the
    pointer basis at the end; the observers never see s)."""
    I = np.eye(PiA0.shape[0]), np.eye(PiB0.shape[0])
    MA = (PiA0, I[0] - PiA0)
    MB = (PiB0, I[1] - PiB0)
    Pdo = np.zeros((2, 2, 2))
    Pnat = np.zeros((2, 2, 2))
    for a in (0, 1):
        for b in (0, 1):
            for x in (0, 1):
                Pdo[x, a, b] = 0.5 * _expect(do[x], n, fA, fB, MA[a], MB[b]).sum()
            Pnat[:, a, b] = _expect(nat, n, fA, fB, MA[a], MB[b])
    return Pdo / Pdo.sum(), Pnat / Pnat.sum()


def tyz_quantum(nat, n, fA, fB):
    """TYZ Im(F_A:F_B|S_Pi) = I(F_A:F_B) - sum_s p_s I(F_A:F_B)_{rho|s}, P_nat."""
    rho = frag_dm(nat, n, [0] + list(fA) + list(fB))
    dA, dB = 2 ** len(fA), 2 ** len(fB)
    r = rho.reshape(2, dA * dB, 2, dA * dB)
    rFF = r[0, :, 0, :] + r[1, :, 1, :]
    I_all = crt.mutual_information_bits(rFF, dA, dB)
    cond = 0.0
    for s in (0, 1):
        blk = r[s, :, s, :]
        ps = float(np.real(np.trace(blk)))
        if ps > 1e-14:
            cond += ps * crt.mutual_information_bits(blk / ps, dA, dB)
    return I_all - cond


def exact_point(do, nat, n, fA, fB, kind, do_ref=None, tyz=True):
    ref = do if do_ref is None else do_ref
    PiA = observer_pi0(kind, ref, n, fA)
    PiB = observer_pi0(kind, ref, n, fB)
    Pdo, Pnat = record_laws(do, nat, n, fA, fB, PiA, PiB)
    q = info_xab(Pdo)
    qn = info_xab(Pnat)
    out = {"Pdo": Pdo.tolist(), "Pnat": Pnat.tolist(),
           "RA": float(q["RA"]), "I_ab_do": float(q["I_ab"]), "I_ab_x": float(q["I_ab_x"]),
           "J_A": float(q["I_xa"]), "J_B": float(q["I_xb"]), "cov_resp": float(q["cov_resp"]),
           "C_rec": float(mi_ab(Pnat.sum(0))), "Im_rec_S": float(qn["RA"]),
           "I_sa_nat": float(qn["I_xa"])}
    out["f_resp"] = out["RA"] / out["I_ab_do"] if out["I_ab_do"] >= 0.05 else None
    if tyz and len(fA) <= 3 and len(fB) <= 3:
        out["TYZ_quantum"] = float(tyz_quantum(nat, n, fA, fB))
    return out


# ---------------------------------------------------------------------------
# Finite counts: one dataset per protocol, percentile bootstrap
# ---------------------------------------------------------------------------

def _pct(a):
    a = np.asarray(a, float)
    a = a[np.isfinite(a)]
    return [float(np.percentile(a, 2.5)), float(np.percentile(a, 97.5))] if a.size else [None, None]


def finite_point(Pdo, Pnat, ss):
    r_do, r_nat, r_bs = [np.random.default_rng(s) for s in ss.spawn(3)]
    cdo = r_do.multinomial(N_SHOTS, np.clip(Pdo, 0, None).ravel() / np.clip(Pdo, 0, None).sum()).reshape(2, 2, 2)
    pab = np.clip(Pnat, 0, None).sum(0).ravel()
    cnat = r_nat.multinomial(N_SHOTS, pab / pab.sum()).reshape(2, 2)
    q = info_xab(cdo)
    qmm = info_xab(cdo, mm=True)
    bdo = r_bs.multinomial(N_SHOTS, cdo.ravel() / N_SHOTS, size=B_BOOT).reshape(B_BOOT, 2, 2, 2)
    bnat = r_bs.multinomial(N_SHOTS, cnat.ravel() / N_SHOTS, size=B_BOOT).reshape(B_BOOT, 2, 2)
    qb = info_xab(bdo)
    with np.errstate(divide="ignore", invalid="ignore"):
        fb = qb["RA"] / qb["I_ab"]
    Ihat = float(q["I_ab"])
    return {"RA_hat": float(q["RA"]), "RA_ci": _pct(qb["RA"]),
            "I_ab_do_hat": Ihat, "f_resp_hat": float(q["RA"]) / Ihat if Ihat > 0 else None,
            "f_resp_ci": _pct(fb), "C_rec_hat": float(mi_ab(cnat)), "C_rec_ci": _pct(mi_ab(bnat)),
            "RA_mm": float(qmm["RA"]), "C_rec_mm": float(mi_ab(cnat, mm=True)),
            "cov_resp_hat": float(q["cov_resp"])}


# ---------------------------------------------------------------------------
# Psi_v12 baseline worker
# ---------------------------------------------------------------------------

def task_psi(args):
    key, Pab, sd = args
    rho = np.diag(np.asarray(Pab, float).ravel()).astype(complex)
    raw = crt.simulate(rho, sd, crt.SimConfig(N=N_SHOTS, B_boot=PSI_BBOOT))
    f = crt.functional(raw, gate_kind="v12")
    return key, {k: f[k] for k in ("psi", "R12", "C_eff", "n_active", "n_unique")}


# ---------------------------------------------------------------------------
# Studies
# ---------------------------------------------------------------------------

def null_calibration(quick):
    nn = 200 if quick else N_NULL
    n = N_E
    do, nat = e2_ensembles(math.pi / 3, 0.0, n)
    ex = exact_point(do, nat, n + 1, [1], [2], "Local", tyz=False)
    Pdo = np.array(ex["Pdo"])
    rng = np.random.default_rng(seed(0, 1))
    c = rng.multinomial(N_SHOTS, Pdo.ravel(), size=nn).reshape(nn, 2, 2, 2)
    ra = info_xab(c)["RA"]
    rng2 = np.random.default_rng(seed(0, 2))
    ci = rng2.multinomial(N_SHOTS, np.full(4, 0.25), size=nn).reshape(nn, 2, 2)
    cr = mi_ab(ci)
    return {"tau_RA": float(np.percentile(ra, 99)), "tau_C": float(np.percentile(cr, 99)),
            "RA_null_mean": float(ra.mean()), "RA_null_sd": float(ra.std(ddof=1)),
            "RA_null_pct": [float(np.percentile(ra, p)) for p in (1, 50, 99)],
            "C_null_mean": float(cr.mean()), "C_null_pct": [float(np.percentile(cr, p)) for p in (1, 50, 99)],
            "null_exact": {"RA": ex["RA"], "I_ab_do": ex["I_ab_do"]}, "n": nn,
            "RA_null_samples": ra.tolist(), "C_null_samples": cr.tolist()}


def study_E1_twin_E2(quick):
    n = N_E
    rows = []
    th_e1 = dict(list(E1_THETAS.items())[1:2]) if quick else E1_THETAS
    for ti, (thn, th) in enumerate(th_e1.items()):
        do, nat = e1_ensembles(th, n)
        tdo, tnat = twin_ensembles(th, n)
        for m in (E1_M[:2] if quick else E1_M):
            fA, fB = list(range(1, m + 1)), list(range(m + 1, 2 * m + 1))
            for oi, kind in enumerate(OBS):
                e = exact_point(do, nat, n + 1, fA, fB, kind)
                t = exact_point(tdo, tnat, n + 1, fA, fB, kind, do_ref=do)
                e.update(finite_point(np.array(e["Pdo"]), np.array(e["Pnat"]), seed(1, ti, m, oi)))
                t.update(finite_point(np.array(t["Pdo"]), np.array(t["Pnat"]), seed(2, ti, m, oi)))
                rows.append({"env": "E1", "theta": thn, "m": m, "obs": kind, **e})
                rows.append({"env": "E1-twin", "theta": thn, "m": m, "obs": kind, **t})
    for pi_, (phn, ph) in enumerate(E2_PHIS.items()):
        for ti, (thn, th) in enumerate(E2_THETAS.items()):
            do, nat = e2_ensembles(ph, th, n)
            for m in (E2_M[:1] if quick else E2_M):
                fA, fB = list(range(1, m + 1)), list(range(m + 1, 2 * m + 1))
                for oi, kind in enumerate(OBS):
                    e = exact_point(do, nat, n + 1, fA, fB, kind)
                    e.update(finite_point(np.array(e["Pdo"]), np.array(e["Pnat"]), seed(3, pi_, ti, m, oi)))
                    rows.append({"env": "E2", "phi": phn, "theta": thn, "m": m, "obs": kind, **e})
    return rows


def study_E3(quick):
    n = N_E
    nd = 6 if quick else N_HAAR
    out = {f"{kind}|{m}": [] for kind in OBS for m in E3_M}
    for dr in range(nd):
        rng = np.random.default_rng(seed(40, dr))
        do, nat = e3_ensembles(rng, n)
        for m in E3_M:
            fA, fB = list(range(1, m + 1)), list(range(m + 1, 2 * m + 1))
            for oi, kind in enumerate(OBS):
                e = exact_point(do, nat, n + 1, fA, fB, kind, tyz=(m <= 3))
                f = finite_point(np.array(e["Pdo"]), np.array(e["Pnat"]), seed(41, dr, m, oi))
                out[f"{kind}|{m}"].append({k: e[k] for k in ("RA", "I_ab_do", "J_A", "C_rec", "Im_rec_S")}
                                          | {"TYZ_quantum": e.get("TYZ_quantum")}
                                          | {k: f[k] for k in ("RA_hat", "C_rec_hat", "RA_mm")})
    return out


def study_E4(quick):
    rows = []
    times = E4_T[::4] if quick else E4_T
    n = N_E4 + 1
    for J in E4_J:
        for h in E4_H:
            at = e4_evolver(J, h)
            for t in times:
                do, nat = at(t)
                for m in E4_M:
                    fA, fB = list(range(1, m + 1)), list(range(N_E4 - m + 1, N_E4 + 1))
                    for oi, kind in enumerate(OBS):
                        e = exact_point(do, nat, n, fA, fB, kind)
                        e.update(finite_point(np.array(e["Pdo"]), np.array(e["Pnat"]),
                                              seed(5, int(J * 10), int(h * 100), int(round(t * 100)), m, oi)))
                        rows.append({"env": "E4", "J": J, "h_S": h, "t": t, "m": m, "obs": kind, **e})
    return rows


def psi_tasks(rows, quick):
    nr = 4 if quick else PSI_RUNS
    sel = []
    for r in rows:
        if r["obs"] != "Helstrom":
            continue
        if r["env"] in ("E1", "E1-twin") and r["theta"] == "pi/4":
            sel.append(r)
        if r["env"] == "E2" and r["phi"] == "pi/3" and r["m"] == 1:
            sel.append(r)
    tasks = []
    for i, r in enumerate(sel):
        key = (r["env"], r.get("phi", "-"), r["theta"], r["m"])
        Pab = np.array(r["Pnat"]).sum(0)
        for k in range(nr):
            tasks.append((key, Pab.tolist(), (MASTER_SEED_V12C, 6, i, k)))
    return tasks


# ---------------------------------------------------------------------------
# No-go numerical check: trace distance between rho_E of E1 and of its twin
# ---------------------------------------------------------------------------

def rho_E_trace_distance(ensA, ensB, n_env):
    """rho_E = Tr_S of each ensemble; both have low rank: rho = C W C^dag,
    with nonzero spectrum of rho_A - rho_B equal to that of W C^dag C."""
    cols, signs = [], []
    for sgn, ens in ((1.0, ensA), (-1.0, ensB)):
        for w, psi in ens:
            M = psi.reshape(2, 2 ** n_env).T * math.sqrt(w)
            cols += [M[:, 0], M[:, 1]]
            signs += [sgn, sgn]
    C = np.array(cols).T
    # orthonormal basis of the span (QR), then a small Hermitian matrix: no
    # loss of precision from a non-symmetric eigenproblem
    Q, Rm = np.linalg.qr(C)
    D = Rm @ np.diag(signs) @ np.conj(Rm.T)
    ev = np.linalg.eigvalsh(0.5 * (D + np.conj(D.T)))
    return 0.5 * float(np.sum(np.abs(ev)))


# ---------------------------------------------------------------------------
# Verdicts (pre-stated rules, Section 6 of the docstring)
# ---------------------------------------------------------------------------

def _within(ci, lo, hi):
    return ci[0] is not None and lo <= ci[0] and ci[1] <= hi


def verdicts(null, rows, e3, e4, nogo):
    V = {}
    # T1
    t1_bad = []
    e1 = {(r["theta"], r["m"], r["obs"]): r for r in rows if r["env"] == "E1"}
    tw = {(r["theta"], r["m"], r["obs"]): r for r in rows if r["env"] == "E1-twin"}
    maxdiff = max_ra_twin = max_ra_e1 = 0.0
    for k, r in e1.items():
        t = tw[k]
        d = float(np.max(np.abs(np.array(r["Pnat"]).sum(0) - np.array(t["Pnat"]).sum(0))))
        maxdiff = max(maxdiff, d)
        max_ra_twin = max(max_ra_twin, abs(t["RA"]))
        max_ra_e1 = max(max_ra_e1, abs(r["RA"] - r["I_ab_do"]))
        if d >= 1e-12 or abs(t["RA"]) >= 1e-12 or abs(r["RA"] - r["I_ab_do"]) >= 1e-12:
            t1_bad.append(f"theta={k[0]} m={k[1]} {k[2]}")
    tdmax = max(nogo.values())
    if tdmax >= 1e-12:
        t1_bad.append(f"rho_E trace distance {tdmax:.1e}")
    V["T1"] = {"verdict": "PASS" if not t1_bad else "FAIL", "violations": t1_bad,
               "max_record_law_diff": maxdiff, "max_abs_RA_twin": max_ra_twin,
               "max_abs_RA_minus_I_E1": max_ra_e1, "rhoE_trace_distance": nogo}
    # T2
    a_pts, a_bad, b_pts, b_bad, c_pts, c_bad = [], [], [], [], [], []
    for r in rows:
        lab = (f"{r['env']} " + (f"phi={r['phi']} " if "phi" in r else "") + f"theta={r['theta']} m={r['m']} {r['obs']}")
        if r["env"] == "E1" and r["I_ab_do"] >= 0.1:
            a_pts.append(lab)
            if not _within(r["f_resp_ci"], 0.9, 1.1):
                a_bad.append(f"{lab}: CI {r['f_resp_ci']}")
        if r["env"] == "E2" and r["theta"] != "0" and r["J_A"] <= 0.05 and r["I_ab_do"] >= 0.1:
            b_pts.append(lab)
            okf = _within(r["f_resp_ci"], -0.1, 0.1)
            okc = r["C_rec_hat"] > null["tau_C"]
            if not (okf and okc):
                b_bad.append(f"{lab}: f_resp CI {r['f_resp_ci']}, C_rec-hat {r['C_rec_hat']:.4f}")
        if (r["env"] == "E2" and r["theta"] == "0") or r["env"] == "E1-twin":
            c_pts.append(lab)
            lo, hi = r["RA_ci"]
            if not ((lo <= 0 <= hi) or hi < null["tau_RA"]):
                c_bad.append(f"{lab}: RA CI {r['RA_ci']}")
    parts = {}
    for nm, pts, bad in (("a", a_pts, a_bad), ("b", b_pts, b_bad), ("c", c_pts, c_bad)):
        parts[nm] = {"n_points": len(pts), "violations": bad,
                     "status": "vacuous" if not pts else ("holds" if not bad else "fails"), "points": pts}
    t2_fail = any(p["status"] == "fails" for p in parts.values())
    V["T2"] = {"verdict": "FAIL" if t2_fail else "PASS", "parts": parts}
    # T3
    t3 = {}
    for kind in OBS:
        for m in (1, 2, 3):
            ra = np.array([d["RA_hat"] for d in e3[f"{kind}|{m}"]])
            p975 = float(np.percentile(ra, 97.5))
            t3[f"{kind}|{m}"] = {"pct_2.5": float(np.percentile(ra, 2.5)), "pct_97.5": p975,
                                 "ok": p975 < 0.05}
    V["T3"] = {"verdict": "PASS" if all(v["ok"] for v in t3.values()) else "FAIL", "cells": t3}
    # T4
    cells, ctrl_max = {}, 0.0
    for r in e4:
        key = f"J={r['J']:g} h_S={r['h_S']:g} m={r['m']} {r['obs']}"
        gap = r["RA"] - r["Im_rec_S"]
        if r["h_S"] == 0:
            ctrl_max = max(ctrl_max, abs(gap))
            continue
        c = cells.setdefault(key, {"max_abs_gap_counted": 0.0, "violations": [], "n_counted": 0,
                                   "max_abs_gap_all": 0.0})
        c["max_abs_gap_all"] = max(c["max_abs_gap_all"], abs(gap))
        if max(r["RA"], r["Im_rec_S"]) >= 0.1:
            c["n_counted"] += 1
            c["max_abs_gap_counted"] = max(c["max_abs_gap_counted"], abs(gap))
            if abs(gap) > 0.1:
                c["violations"].append({"t": r["t"], "RA": r["RA"], "Im_rec_S": r["Im_rec_S"], "gap": gap})
    supported = all(not c["violations"] for c in cells.values())
    V["T4"] = {"verdict": "H4 SUPPORTED" if supported else "H4 NOT SUPPORTED", "cells": cells,
               "control_max_abs_gap_hS0": ctrl_max, "control_ok": ctrl_max < 1e-10,
               "n_cells_violating": sum(bool(c["violations"]) for c in cells.values()),
               "largest_gap": max((c["max_abs_gap_counted"] for c in cells.values()), default=0.0),
               "frac_RA_negative": float(np.mean([r["RA"] < -1e-12 for r in e4]))}
    return V


# ---------------------------------------------------------------------------
# Figures
# ---------------------------------------------------------------------------

COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"]


def figures(R, suffix=""):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    plt.rcParams.update({"font.size": 9, "axes.spines.top": False, "axes.spines.right": False,
                         "axes.grid": True, "grid.color": "#e4e4e0", "grid.linewidth": 0.6})
    paths = []
    rows = R["rows"]
    # fig 1: records-only consensus vs responsive agreement
    fig, axes = plt.subplots(1, 2, figsize=(11, 4.4), sharey=True)
    for ax, kind in zip(axes, OBS):
        for ci, (env, mk) in enumerate((("E1", "o"), ("E1-twin", "s"), ("E2", "^"))):
            sel = [r for r in rows if r["env"] == env and r["obs"] == kind]
            ax.plot([r["C_rec"] for r in sel], [r["RA"] for r in sel], mk, color=COLORS[ci], ms=6,
                    mfc="white" if env == "E1-twin" else COLORS[ci], mew=1.5, ls="none", label=env)
        ax.plot([0, 1], [0, 1], color="#888", lw=1, ls=":")
        ax.set_title(f"{kind} observers")
        ax.set_xlabel("records-only consensus C_rec = I(r_A:r_B), natural protocol (bits)")
    axes[0].set_ylabel("responsive agreement RA (bits), interventional protocol")
    axes[0].legend(frameon=False, fontsize=8)
    fig.suptitle("Phase 3: the common-cause twin and the correlated environment have record agreement "
                 "but no responsive agreement (exact values)", fontsize=9)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig1_responsive_phase3{suffix}.png")
    fig.savefig(p, dpi=150); plt.close(fig); paths.append(p)
    # fig 2: E4 time series
    e4 = R["e4"]
    fig, axes = plt.subplots(len(E4_J), len(E4_H), figsize=(13, 6.5), sharex=True, sharey=True)
    for i, J in enumerate(E4_J):
        for j, h in enumerate(E4_H):
            ax = axes[i, j]
            k = 0
            for m in E4_M:
                for kind in OBS:
                    sel = sorted([r for r in e4 if r["J"] == J and r["h_S"] == h and r["m"] == m
                                  and r["obs"] == kind], key=lambda r: r["t"])
                    ts = [r["t"] for r in sel]
                    ax.plot(ts, [r["RA"] for r in sel], "-", color=COLORS[k], lw=2, label=f"RA, m={m}, {kind}")
                    ax.plot(ts, [r["Im_rec_S"] for r in sel], "--", color=COLORS[k], lw=1.2,
                            label=f"TYZ Im_rec(S), m={m}, {kind}")
                    k += 1
            ax.set_title(f"J = {J:g}, h_S = {h:g}")
            if i == len(E4_J) - 1:
                ax.set_xlabel("time t (g = 1)")
            if j == 0:
                ax.set_ylabel("bits")
    axes[0, 0].legend(fontsize=6, frameon=False, ncol=1)
    fig.suptitle("Phase 3, T4 (open test): responsive agreement RA(t) (records + intervention, no S access; "
                 "solid) vs TYZ refined consensus with S measured at t (dashed)", fontsize=9)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig2_spinchain_phase3{suffix}.png")
    fig.savefig(p, dpi=150); plt.close(fig); paths.append(p)
    # fig 3: null distributions and E3
    fig, axes = plt.subplots(1, 2, figsize=(11, 3.8))
    nl = R["null"]
    axes[0].hist(nl["RA_null_samples"], bins=50, color=COLORS[0], alpha=0.8)
    axes[0].axvline(nl["tau_RA"], color="k", ls="--", lw=1, label=f"tau_RA = {nl['tau_RA']:.2e}")
    axes[0].set_xlabel("RA-hat under the common-cause null (exact RA = 0), N = 1e4")
    axes[0].set_ylabel("datasets")
    axes[0].legend(frameon=False, fontsize=8)
    ax = axes[1]
    for k, kind in enumerate(OBS):
        for mi, m in enumerate(E3_M):
            ra = [d["RA_hat"] for d in R["e3"][f"{kind}|{m}"]]
            ax.boxplot([ra], positions=[mi + 0.2 * (k - 0.5) * 2], widths=0.3, patch_artist=True,
                       boxprops={"facecolor": COLORS[k], "alpha": 0.6}, showfliers=True)
    ax.set_xticks(range(len(E3_M)), [f"m={m}" for m in E3_M])
    ax.axhline(0.05, color="#888", ls=":", lw=1)
    ax.set_ylabel("RA-hat over Haar draws (bits)")
    ax.set_title("E3 scrambled: blue Helstrom, orange Local")
    fig.tight_layout()
    p = os.path.join(OUT, f"fig3_null_scrambled_phase3{suffix}.png")
    fig.savefig(p, dpi=150); plt.close(fig); paths.append(p)
    return paths


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def _f(x, nd=4):
    if x is None:
        return "-"
    if isinstance(x, (list, tuple)):
        return "[" + ", ".join(_f(v, nd) for v in x) + "]"
    if x == 0:
        return "0"
    if abs(x) < 1e-3 or abs(x) >= 1e4:
        return f"{x:.2e}"
    return f"{x:.{nd}f}"


def report(R, suffix=""):
    V, meta, nl = R["verdicts"], R["meta"], R["null"]
    L = []
    a = L.append
    a("# CRT v12, phase 3: responsive agreement (interventions instead of access to S)")
    a("")
    a(f"Generated by `python3 run_v12c.py{' --quick' if suffix else ''}` (master seed {MASTER_SEED_V12C}), Python "
      f"{meta['python']}, numpy {meta['numpy']}, scipy {meta['scipy']}, wall time {meta['wall_s']:.0f} s.")
    a("")
    a("Pre-registration: docstring of `run_v12c.py`, commit 4733c03, pushed to GitHub as branch `paper-v12` "
      "(GitHub branch creation 2026-10-30T18:43:26Z) before any phase-3 code existed. The implementation was "
      "appended below the docstring afterwards; the docstring is unchanged. Verdicts below apply the "
      "pre-stated rules only. Post-hoc observations are in a separate section.")
    a("")
    a("## Pre-registered results")
    a("")
    a("| Test | Kind (stated in advance) | Verdict | Key numbers |")
    a("|---|---|---|---|")
    t1, t2, t3, t4 = V["T1"], V["T2"], V["T3"], V["T4"]
    a(f"| T1 no-go and its resolution | analytic check | **{t1['verdict']}** | max record-law difference "
      f"{_f(t1['max_record_law_diff'])}; max abs RA(twin) {_f(t1['max_abs_RA_twin'])}; max abs RA - I (E1) "
      f"{_f(t1['max_abs_RA_minus_I_E1'])}; max rho_E trace distance {_f(max(t1['rhoE_trace_distance'].values()))} |")
    p = t2["parts"]
    a(f"| T2 separation on the common-cause grid | estimator check | **{t2['verdict']}** | (a) {p['a']['status']} "
      f"({p['a']['n_points']} points), (b) {p['b']['status']} ({p['b']['n_points']}), (c) {p['c']['status']} "
      f"({p['c']['n_points']}) |")
    worst3 = max(v["pct_97.5"] for v in t3["cells"].values())
    a(f"| T3 scrambled environment | derivable check | **{t3['verdict']}** | largest 97.5th percentile of RA-hat "
      f"over {N_HAAR} draws: {_f(worst3)} bit (limit 0.05) |")
    a(f"| T4 interventions vs S access, h_S > 0 | **open test** | **{t4['verdict']}** | "
      f"{t4['n_cells_violating']} of {len(t4['cells'])} cells violate; largest counted gap {_f(t4['largest_gap'])} bit; "
      f"control (h_S = 0) max gap {_f(t4['control_max_abs_gap_hS0'])} |")
    a("")
    a("### Null calibration (run first, separate seed stream)")
    a("")
    a(f"- Common-cause null (E2, theta = 0, phi = pi/3, m = 1, Local observer; exact RA = {_f(nl['null_exact']['RA'])}, "
      f"exact I(r_A:r_B) = {_f(nl['null_exact']['I_ab_do'])} bit), {nl['n']} datasets of N = {N_SHOTS}: RA-hat mean "
      f"{_f(nl['RA_null_mean'])}, SD {_f(nl['RA_null_sd'])}; 1st/50th/99th percentiles {_f(nl['RA_null_pct'])}. "
      f"**tau_RA = {_f(nl['tau_RA'])} bit.**")
    a(f"- Independent unbiased records, {nl['n']} datasets: C_rec-hat 1st/50th/99th percentiles "
      f"{_f(nl['C_null_pct'])}. **tau_C = {_f(nl['tau_C'])} bit.**")
    a("")
    a("### T1: no-go and its resolution")
    a("")
    a("- rho_E trace distance between each E1 state and its common-cause twin (N_E = 12): "
      + ", ".join(f"theta = {k}: {_f(v)}" for k, v in t1["rhoE_trace_distance"].items()) + ".")
    a(f"- Natural-protocol record laws of E1 and twin: max abs difference {_f(t1['max_record_law_diff'])} over all "
      "(theta, m, observer). Interventional: max abs RA(twin) = "
      f"{_f(t1['max_abs_RA_twin'])}, max abs (RA(E1) - I(r_A:r_B)) = {_f(t1['max_abs_RA_minus_I_E1'])}.")
    a(f"- Violations: {t1['violations'] or 'none'}.")
    a("")
    a("### T2: separation on the common-cause grid")
    a("")
    for nm, txt in (("a", "E1 points with I >= 0.1 bit: f_resp 95% CI within [0.9, 1.1]"),
                    ("b", "E2 points, theta > 0, J <= 0.05, I >= 0.1: f_resp CI within [-0.1, 0.1] and C_rec-hat > tau_C"),
                    ("c", "E2 theta = 0 and E1-twin points: RA CI contains 0 or lies below tau_RA")):
        pp = p[nm]
        a(f"- ({nm}) {txt}: **{pp['status']}**, {pp['n_points']} points; violations: {pp['violations'] or 'none'}.")
    a("")
    a("| env | phi | theta | m | observer | C_rec (nat) | C_rec-hat [95%] | I(r_A:r_B) do | J = I(X:r_A) | RA exact | "
      "RA-hat [95%] | f_resp exact | f_resp-hat [95%] | TYZ Im_rec(S) | TYZ quantum Im(F:F'|S) |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for r in R["rows"]:
        a(f"| {r['env']} | {r.get('phi', '-')} | {r['theta']} | {r['m']} | {r['obs']} | {_f(r['C_rec'])} | "
          f"{_f(r['C_rec_hat'])} {_f(r['C_rec_ci'])} | {_f(r['I_ab_do'])} | {_f(r['J_A'])} | {_f(r['RA'])} | "
          f"{_f(r['RA_hat'])} {_f(r['RA_ci'])} | {_f(r['f_resp'])} | {_f(r['f_resp_hat'])} {_f(r['f_resp_ci'])} | "
          f"{_f(r['Im_rec_S'])} | {_f(r.get('TYZ_quantum'))} |")
    a("")
    a("### T3: scrambled environment (100 Haar draws)")
    a("")
    a("| observer | m | RA-hat 2.5th pct | RA-hat 97.5th pct | mean exact RA | mean exact C_rec | mean TYZ quantum |")
    a("|---|---|---|---|---|---|---|")
    for kind in OBS:
        for m in E3_M:
            d = R["e3"][f"{kind}|{m}"]
            ra = [x["RA_hat"] for x in d]
            tq = [x["TYZ_quantum"] for x in d if x["TYZ_quantum"] is not None]
            a(f"| {kind} | {m} | {_f(float(np.percentile(ra, 2.5)))} | {_f(float(np.percentile(ra, 97.5)))} | "
              f"{_f(float(np.mean([x['RA'] for x in d])))} | {_f(float(np.mean([x['C_rec'] for x in d])))} | "
              f"{_f(float(np.mean(tq)) if tq else None)} |" + ("" if m <= 3 else " (m = 6 not in T3)"))
    a("")
    a("### T4: the open test")
    a("")
    a("Hypothesis H4 (pre-stated): |RA(t) - Im_rec(S)(t)| <= 0.1 bit at every time where max(RA, Im_rec(S)) >= "
      "0.1 bit, in every (J, h_S > 0, m, observer) cell. RA uses the records and the setting X only; Im_rec(S) "
      "needs S measured in the pointer basis at time t.")
    a("")
    a(f"**{t4['verdict']}.** Control (h_S = 0, derivable): max |RA - Im_rec(S)| = {_f(t4['control_max_abs_gap_hS0'])} "
      f"({'within' if t4['control_ok'] else 'NOT within'} 1e-10). Fraction of E4 points with RA < 0: "
      f"{_f(t4['frac_RA_negative'])}.")
    a("")
    a("| cell | points counted | max abs gap (counted) | max abs gap (all t) | violating times (t: RA, Im_rec(S)) |")
    a("|---|---|---|---|---|")
    for k, c in t4["cells"].items():
        vio = "; ".join(f"{v['t']:g}: {v['RA']:.3f}, {v['Im_rec_S']:.3f}" for v in c["violations"]) or "none"
        a(f"| {k} | {c['n_counted']} | {_f(c['max_abs_gap_counted'])} | {_f(c['max_abs_gap_all'])} | {vio} |")
    a("")
    a("Full E4 time series (exact; finite-count RA-hat with 95% percentile interval):")
    a("")
    a("| J | h_S | m | observer | t | C_rec (nat) | I(r_A:r_B) do | J = I(X:r_A) | I(s(t):r_A) nat | RA | Im_rec(S) | "
      "RA - Im_rec(S) | RA-hat [95%] | TYZ quantum |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for r in R["e4"]:
        a(f"| {r['J']:g} | {r['h_S']:g} | {r['m']} | {r['obs']} | {r['t']:g} | {_f(r['C_rec'])} | {_f(r['I_ab_do'])} | "
          f"{_f(r['J_A'])} | {_f(r['I_sa_nat'])} | {_f(r['RA'])} | {_f(r['Im_rec_S'])} | {_f(r['RA'] - r['Im_rec_S'])} | "
          f"{_f(r['RA_hat'])} {_f(r['RA_ci'])} | {_f(r.get('TYZ_quantum'))} |")
    a("")
    a("### Secondary (pre-stated, no verdict)")
    a("")
    a(f"Psi_v12-hat baseline on the natural-protocol record state (Helstrom records, gate 'v12', B_boot = {PSI_BBOOT}, "
      f"{PSI_RUNS} runs per point):")
    a("")
    a("| env | phi | theta | m | C_rec exact | RA exact | Psi_v12-hat (mean +/- SE) | N R12-hat | partitions |")
    a("|---|---|---|---|---|---|---|---|---|")
    for k, s in R["psi"].items():
        a(f"| {k} | {_f(s['C_rec'])} | {_f(s['RA'])} | {_f(s['psi'])} +/- {_f(s['psi_se'])} | {s['N_R12']:.0f} | "
          f"{s['partitions']} |")
    a("")
    a("Miller-Madow and linear (covariance) versions are in the JSON (`RA_mm`, `C_rec_mm`, `cov_resp`, "
      "`cov_resp_hat`) for every point.")
    a("")
    a(POSTHOC)
    a("")
    a(ATTACKS)
    a("")
    a("## Figures")
    a("")
    for pth in meta.get("figures", []):
        a(f"- `{os.path.relpath(pth, OUT)}`")
    path = os.path.join(OUT, f"REPORT_phase3{suffix}.md")
    with open(path, "w") as fh:
        fh.write("\n".join(L) + "\n")
    return path


POSTHOC = """## Post-hoc observations (after results; no verdict changed)

(to be written after the results are seen)"""

ATTACKS = """## What a referee would attack

(to be written after the results are seen)"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--report-only", action="store_true")
    ap.add_argument("--workers", type=int, default=2)
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    suffix = "_quick" if args.quick else ""
    jpath = os.path.join(OUT, f"results_v12c{suffix}.json")
    if args.report_only:
        with open(jpath) as fh:
            R = json.load(fh)
        R["meta"]["figures"] = figures(R, suffix)
        report(R, suffix)
        return
    t0 = time.time()
    log = open(os.path.join(OUT, f"run_v12c{suffix}.log"), "w")

    def say(msg):
        line = f"[{time.time() - t0:7.1f} s] {msg}"
        print(line, flush=True)
        log.write(line + "\n"); log.flush()

    say("null calibration (study 0), before any test")
    null = null_calibration(args.quick)
    say(f"tau_RA = {null['tau_RA']:.3e}, tau_C = {null['tau_C']:.3e}")
    say("T1/T2 grid (E1, twin, E2)")
    rows = study_E1_twin_E2(args.quick)
    nogo = {}
    for thn, th in E1_THETAS.items():
        _, nat = e1_ensembles(th, N_E)
        _, tnat = twin_ensembles(th, N_E)
        nogo[thn] = rho_E_trace_distance(nat, tnat, N_E)
    say("E3 scrambled")
    e3 = study_E3(args.quick)
    say("E4 spin chain")
    e4 = study_E4(args.quick)
    say("Psi_v12 baselines")
    tasks = psi_tasks(rows, args.quick)
    with Pool(args.workers) as pool:
        res = list(pool.imap_unordered(task_psi, tasks, chunksize=2))
    g = {}
    for k, o in res:
        g.setdefault(k, []).append(o)
    psi = {}
    for r in rows:
        key = (r["env"], r.get("phi", "-"), r["theta"], r["m"])
        if r["obs"] == "Helstrom" and key in g:
            runs = g[key]
            m_, se = v1.mean_se([x["psi"] for x in runs])
            parts = {}
            for x in runs:
                kk = f"n_active={x['n_active']},n_unique={x['n_unique']}"
                parts[kk] = parts.get(kk, 0) + 1
            psi[" | ".join(str(x) for x in key)] = {"psi": m_, "psi_se": se, "C_rec": r["C_rec"], "RA": r["RA"],
                                                    "N_R12": N_SHOTS * float(np.mean([x["R12"] for x in runs])),
                                                    "partitions": parts}
    say("verdicts")
    V = verdicts(null, rows, e3, e4, nogo)
    meta = {"python": platform.python_version(), "numpy": np.__version__, "scipy": scipy.__version__,
            "workers": args.workers, "master_seed": MASTER_SEED_V12C, "N_shots": N_SHOTS, "B_boot": B_BOOT,
            "quick": args.quick, "wall_s": time.time() - t0}
    R = v1.clean({"meta": meta, "null": null, "rows": rows, "e3": e3, "e4": e4, "psi": psi, "verdicts": V})
    R["meta"]["figures"] = figures(R, suffix)
    R["meta"]["wall_s"] = time.time() - t0
    with open(jpath, "w") as fh:
        json.dump(R, fh, indent=1)
    rp = report(R, suffix)
    say(f"verdicts: T1 {V['T1']['verdict']}, T2 {V['T2']['verdict']}, T3 {V['T3']['verdict']}, T4 {V['T4']['verdict']}")
    say(f"wrote {jpath}, {rp}")
    log.close()


if __name__ == "__main__":
    main()
