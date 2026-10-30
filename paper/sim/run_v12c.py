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
