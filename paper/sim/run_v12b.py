"""
run_v12b.py: CRT v12, phase 2. The correlation gate, and Simulations 1 to 3
re-run with it on fresh seeds.

    python3 run_v12b.py                 # full run (about 30 minutes, 2 CPUs)
    python3 run_v12b.py --quick         # smoke test (writes *_quick files)
    python3 run_v12b.py --report-only   # rebuild REPORT_phase2.md and figures

Outputs in results/v12/: results_v12b.json, REPORT_phase2.md,
fig1_plateau_phase2.png, fig2_scrambled_phase2.png, fig3_discord_phase2.png,
run_v12b.log. Phase-1 files (run_v12.py, REPORT.md, results_v12.json,
fig1_plateau.png, ...) are not modified.
Seeds: SeedSequence((MASTER_SEED_V12B = 20261102, study, item..., replicate)),
disjoint from phase 1 (20261101).

=============================================================================
PHASE-2 PRE-REGISTRATION. Written and committed before any phase-2 result
was computed. The phase-1 pre-registration (docstring of run_v12.py, commit
63a4baa) is not edited; phase 1 stays reported as run (REPORT.md).
=============================================================================

Why a new gate
--------------
Phase 1, Simulation 2 failed because the v11 informativeness I(rho) =
1 - S(rho)/log2 d of the joint record state rewards record bias: a lopsided
record has low entropy whether or not the two observers share anything.

Exact identity (two qubits, d = d_A d_B = 4, all logs base 2):
    log d - S(rho) = [1 - S(rho_A)] + [1 - S(rho_B)] + I(A:B)_rho,
so
    I_v11(rho) = I_c(rho) + (1/2) [ I(rho_A) + I(rho_B) ],
    I_c(rho) := I(A:B)_rho / 2,     I(rho_X) = 1 - S(rho_X) (one qubit).
The v11 informativeness is the shared part I_c plus the mean local
informativeness of the two marginals. The local term is exactly the
"lopsidedness" that produced the phase-1 failure.

Definition (the v12 gate). For a bipartite state on C^{d_A} (x) C^{d_B},
    I_c(rho) := I(A:B)_rho / (2 log2 min(d_A, d_B))      in [0, 1],
the quantum mutual information between the two parties in bits, divided by
its maximum. For two qubits I_c = I(A:B)/2. The v12 gate is Eq. 5 with I
replaced by I_c:
    G_c(rho1, rho2) := sqrt( (I_c(rho1~) + eps)(I_c(rho2~) + eps) ) / (1 + eps),
on the regularized reconstructions rho~, and
    Psi_v12 := F(rho1~, rho2~) * G_c * C_eff * D_hat.
F, the reconstruction pipelines, regularization, C_eff (Algorithm 1, primary
'sampling' rule), D_hat, eps, delta_reg, eta, H_min, tau are the v11 ones,
unchanged. Bounds: I_c in [0, 1], so G_c in [eps/(1+eps), 1] and
Psi_v12 in [0, 1) as before. Implemented in crt.py as
`correlation_informativeness` and a `gate` argument of `functional`
('v11' default, so every earlier number is unchanged; 'v12' new).

Candidates weighed, and the reason for the choice.
  (1) I(r_A:r_B) / min(H(r_A), H(r_B)). Rejected: 0/0 for a constant record
      (exactly the theta = 0 / tie pathology), unstable when a record is nearly
      constant, scores biased-but-correlated records as fully informative, and
      for unbiased records equals 2 x the v11 value, so it does not reduce to
      v11. Defined for classical records only.
  (2) I(r_A:r_B) / (H(r_A) + H(r_B)) = 1 - H(r_A,r_B)/(H(r_A)+H(r_B)). Reduces
      to v11 for unbiased records, but is 0/0 for constant records, has a
      ratio of two small fluctuating quantities near the null (poor finite-N
      behaviour, the problem Open Question 7 records for JSD/H(w)), and is
      bias-invariant (a nearly constant record that agrees with the other one
      scores like a fair one).
  (3) I(A:B) / 1 bit. Same ordering as the chosen form but not bounded by 1
      for quantum record states (I(A:B) reaches 2 bits) and twice the v11
      value for unbiased records.
  (4) CHOSEN: I_c = I(A:B) / (2 log2 min(d_A, d_B)). Reasons: it is the v11
      informativeness minus exactly the marginal terms (the identity above),
      so it reduces to the v11 gate whenever both marginals are maximally
      mixed and nowhere else; it is smooth, has no 0/0, and is defined for any
      bipartite reconstructed state (quantum records too); it is zero exactly
      for product states (independent records, biased or not); and it keeps
      the bits-relative-to-maximum normalization of Eq. 4.

Identity and limit checks (each is a unit test in test_v12b.py):
  L1 Decomposition: I_v11 = I_c + (I(rho_A) + I(rho_B))/2 on random states.
  L2 Unbiased records (both marginals I/2): I_c = I_v11 exactly; for a
     classical record state, = I(r_A:r_B)/2.
  L3 Independent records, any bias: rho = rho_A (x) rho_B gives I_c = 0, so the
     exact gate is the eps floor. (v11 gives (I_A + I_B)/2 > 0 when biased.)
  L4 Perfect correlation: classical unbiased (|00><00| + |11><11|)/2 gives
     I_c = 1/2 (= v11), the maximum for classical two-bit records; biased
     perfect correlation p|00><00| + (1-p)|11><11| gives h(p)/2 (v11 gives
     1 - h(p)/2: v11 increases with bias, I_c decreases). I_c = 1 only for a
     maximally entangled pure record state (Bell: 1, = v11).
  L5 Local-unitary invariance: I_c(U_A (x) U_B rho U^dag) = I_c(rho).
  L6 Where it does NOT reduce to v11: whenever a marginal is not maximally
     mixed, I_c < I_v11, with difference (I(rho_A) + I(rho_B))/2. Examples:
     pure product |00> (v11 1, v12 0); the separable control
     sigma(p) = diag((1+3p)/4, (1-p)/4, (1-p)/4, (1-p)/4) of v11 Section 4.1
     has marginals diag((1+p)/2, (1-p)/2), so I_c(sigma(p)) < I_c(Werner(p))
     = I_v11(Werner(p)): the v12 gate is not a function of the spectrum alone,
     and Lemma 4's corollary must be restated for it (it is still not an
     entanglement witness: (|00><00| + |11><11|)/2, separable, has I_c = 1/2,
     above Werner(p) for p < 0.749). Also at finite N for any source: the
     reconstructed marginals are never exactly I/2, so Psi_v12-hat differs from
     Psi_v11-hat by O(1/N) even for unbiased sources; this changes the floor
     constant.

The floor constant for I/4 under the new gate
---------------------------------------------
Derivation (first order, as in v11 Section 8.1). For I/4 the linear-inversion
error Delta has covariance (times N) 2.25 on the 9-dimensional correlation
sector (sigma_i (x) sigma_j, i, j >= 1) and 0.75 on the 6-dimensional local
sectors. Near I/4, I_v11-hat ~ Tr Delta^2 / ln 2 (both sectors); the local
informativeness terms remove exactly the local sectors, so
I_c-hat ~ Tr Delta_corr^2 / ln 2, with N ln2 I_c-hat ~ 2.25 chi^2_9. The gate of
two independent batches has mean (E sqrt(I_c-hat))^2, so, assuming the
correlation sector is isotropic as v11 states,
    a_c = (2.25 / ln 2) (sqrt(2) Gamma(5) / Gamma(4.5))^2 = 27.64
(v11: 34.3). F = 1 - O(1/N) does not change the leading term.
Calibration (run first, separate seed stream, study id 0, before any test
is evaluated): rho_R = I/4, N = 1e4 per batch, 2000 runs; a_c,cal := mean
N R12-hat. The derivation is reported as confirmed if |a_c,cal - 27.64| <=
5% of 27.64, otherwise as failed (that alone is not a simulation verdict).
Floor band for every phase-2 test: a_c,cal x [31/34.3, 37/34.3]
(the relative width of v11's V2 band). The calibration also measures
independent biased record states diag(p, 1-p) (x) diag(p, 1-p) for
p = 0.4 and 0.3, 500 runs each (exact I_c = 0). Pre-stated: if a(p = 0.4)
falls outside the band, Simulation 2's verdict carries that caveat
(bias then moves the finite-N floor); the verdict rule is not changed.

Common to all three simulations (unchanged from phase 1 unless stated)
---------------------------------------------------------------------
Models, couplings, partial-information plot, MI redundancy R_delta (delta =
0.1), observers, Helstrom records (priors 1/2), primary record state
R1 = diag(P(r_A, r_B)), N_counts = 1e4 per batch, D_hat = 0.95: as in the
phase-1 docstring. Changes: (i) gate = 'v12' (G_c); (ii) fresh seeds;
(iii) B_boot = 200 for Simulations 1 and 3 and B_boot = 100 for Simulation 2
(R12 does not depend on B; only the delta_i thresholds of C_eff do);
(iv) Simulation 2 uses 100 Haar draws per configuration, one count seed
each. The v11-gate value on the same runs is reported alongside (same data,
same reconstructions). Psi_perf: mean v12 Psi-hat of the theta = pi/2 rows
(exactly the perfect-record state, where I_c = I_v11 = 1/2).
Pre-stated secondary record definition R1t (tie fix): Helstrom with
randomized tie-breaking, Pi_0 = P_+ + P_0 / 2, where P_+ projects on the
eigenvalues > 1e-14 of p0 rho0 - p1 rho1 and P_0 on those with absolute value
<= 1e-14 (still minimum-error). It changes only the hazy grid at even m
(pure c-maybe null spaces have no overlap with the conditional states;
Haar-scrambled differences have no exact ties). Reported, never sets a
verdict.

Simulation 1 (phase 2): redundancy plateau
------------------------------------------
Grid and seeds per point as phase 1 (theta in {pi/8, pi/6, pi/4, pi/3, pi/2},
N_E in {6, 8, 10, 12}, m = 1..6, 40 runs per (theta, m)), B = 200.
Prediction: Psi_v12-hat rises to a plateau over the same fragment-size range
in which I(S:F) reaches H_S. c-maybe records are unbiased, so the exact
(N = inf) record gate equals phase 1's; the outcome should match phase 1.
Failure condition and verdict rule: exactly phase 1's (a), (b), (c),
INCONCLUSIVE and overall rule, with Psi_perf the finite-N v12 reference.
Pre-stated secondary (no verdict): the onset ratio with the exact (Lemma 4)
record curve and exact reference 0.2375.

Simulation 2 (phase 2): scrambled environment
---------------------------------------------
Configurations as phase 1 (theta = pi/2, N_E in {8, 10, 12}; theta = pi/4,
N_E = 12), 100 Haar draws each, records R1, B = 100.
Predictions: (A) no classical plateau; (B) Psi_v12 between small fragments at
the finite-sample floor.
Failure conditions: (A) as phase 1: for N_E in {10, 12}, mean I(S:F_m) >=
0.5 H_S for some m <= N_E/2 - 1. (B) at N_E = 12 (both theta), for some m in
{1, 2, 3}, the 95% interval (mean +/- 1.96 SE over draws) of N_counts x
R12-hat lies entirely outside a_c,cal x [31/34.3, 37/34.3].
Verdict: PASS if neither holds, FAIL otherwise.
Expected size of the true signal at N_E = 12, m = 3 (phase-1 exact record
information about 2e-4 bits): N I_c about 1, inside the band.

Simulation 3 (phase 2): the discord gap
---------------------------------------
Grid as phase 1 (pure c-maybe theta in {pi/16, pi/8, pi/4, pi/2}, N_E in
{4, 8, 12}; hazy theta in {pi/4, pi/2}, h in {0.3, 0.6}, N_E = 10;
Horodecki example), 40 runs per c-maybe point (shared with Simulation 1),
30 per hazy point, B = 200.
Prediction: a regime where MI-based redundancy reports objective while
Psi_v12 stays near the floor.
Gap criterion: (i) R_delta^MI >= 3, (ii) I(S:F_m) >= 0.9 H_S, m <= N_E/2,
(iii) mean R12-hat(m) <= 2 a_c,cal / N_counts. PASS if any point meets it,
NULL otherwise. Prior expectation: NULL (for decohered S the phase-1 bound
gives I_c >= (H(r_A) - h(delta))/2, about 0.26, roughly 95 times the floor).

How Psi_v12 relates to accessible-information redundancy (pre-stated
analysis, no verdict). For records that are conditionally independent and
identically distributed given s with symmetric errors (pure c-maybe, and
hazy with the tie fix), I(r_A:r_B) = 1 - h(2 P_e (1 - P_e)) and the
one-observer accessible information is J_H = 1 - h(P_e); both are decreasing
in P_e on [0, 1/2], so the exact Psi_v12 is a strictly increasing function of
J_H there. Reported: the Spearman correlation between exact R12_inf(v12)
and J_H over all Simulation 3 points with m <= N_E/2 (primary records), and
over the tie-fixed hazy points; if it is 1 on the symmetric points, the
report says plainly that Psi_v12 is a monotone of accessible information
there, and therefore R_delta^Psi is an accessible-information redundancy
with a two-observer threshold.
"""
