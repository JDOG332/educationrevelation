"""
run_v12.py: Psi as an agreement-based witness of objectivity (quantum
Darwinism). Simulations for CRT v12.

    python3 run_v12.py                 # full run (about 10 minutes, 2 CPUs)
    python3 run_v12.py --quick         # smoke test (writes *_quick files)
    python3 run_v12.py --report-only   # rebuild REPORT.md and figures from results_v12.json

Outputs in results/v12/: results_v12.json, REPORT.md, fig1_plateau.png,
fig2_scrambled.png, fig3_discord.png, run_v12.log.
Seeds: SeedSequence((MASTER_SEED_V12, study, item..., replicate)).

=============================================================================
PRE-REGISTRATION. This docstring (predictions, failure conditions, verdict
rules, definitional choices) was written and committed before any result of
this script was computed. The git history of this file shows it.
=============================================================================

Common definitions (choices, all stated here before any result)
------------------------------------------------------------------
Model. A system qubit S starts in |+> = (|0> + |1>)/sqrt(2), so its pointer
entropy is H_S = h(1/2) = 1 bit. It decoheres into N_E environment qubits,
each starting in |0> (pure) or in the hazy state (1 - h)|0><0| + h I/2, by
the "c-maybe" coupling: a controlled rotation U = |0><0| (x) I + |1><1| (x) R(theta),
R(theta)|0> = cos(theta)|0> + sin(theta)|1> (theta = pi/2 is a CNOT). All
environment qubits have the same theta. Pure cases are exact statevectors;
hazy cases are exact density matrices built from the product structure.

Partial-information plot. I(S:F_m) = H(S) + H(F_m) - H(S F_m) (bits) for a
fragment F_m of m environment qubits, m = 0..N_E, plotted against
f = m / N_E. For permutation-symmetric models one fragment per m is exact;
for the scrambled model F_m is the first m qubits (by Haar invariance every
choice has the same distribution) and the curve is averaged over draws.

MI redundancy. delta = 0.1. m_delta^MI is the smallest m (linear
interpolation between integer m, with I(S:F_0) = 0) at which
I(S:F_m) >= (1 - delta) H_S; R_delta^MI = N_E / m_delta^MI.

Observers and records. Two observers hold disjoint fragments F_A, F_B of the
same size m (so m <= N_E / 2). Each makes the minimum-error (Helstrom)
two-outcome measurement that discriminates its fragment's pointer-conditional
states rho_{F|s} = <s| rho_{SF} |s> / p_s (s = 0, 1, priors p_s = 1/2),
and writes the outcome r (its guess of s) into a record bit. Projector on
the positive eigenspace of p_0 rho_{F|0} - p_1 rho_{F|1} (eigenvalues
> 1e-14) is r = 0; everything else is r = 1. The observers touch only their
fragments; S is never measured. The joint record distribution is
P(a, b) = Tr[(Pi_a^A (x) Pi_b^B) rho_{F_A F_B}], computed exactly.

Record state (primary, R1). rho_R = diag(P00, P01, P10, P11) on two record
qubits (A first), i.e. classical records held in qubit memories. Psi-hat is
the v11 functional, unchanged, applied to rho_R: crt.simulate + crt.functional
(primary 'sampling' rule), product SIC-POVM, LI-PSD on batch A and R rho R
MLE on batch B, models {LI, MLE} on A + B, B_boot = 20, D_hat = 0.95,
eps = 1e-8, delta_reg = 1e-6, N_counts = 1e4 counts per batch. This is the
v11 bipartite setup with (photon A, photon B) replaced by (record of
observer A, record of observer B); the two batches are disjoint sets of
shots. Why not one reconstruction per observer: with disjoint data each
observer can reconstruct only marginal content, and for p_s = 1/2 the
marginal record of a Helstrom observer is uniform at every theta, so a
per-observer state cannot see agreement; agreement is a property of the
shot-wise joint record. Secondary (R2, reported, never sets a verdict):
the same records after a shared random relabelling (both bits flipped by
one common fair coin per shot), P'(a,b) = [P(a,b) + P(1-a,1-b)]/2, which
removes record bias and keeps only the agreement rate.

Exact (N = infinity) companion: R12_inf = G_eps(rho_R~, rho_R~) =
I(rho_R~) (Lemma 4), with I(rho_R) = 1 - H(P)/2.

Psi redundancy. Psi_perf is the mean Psi-hat of the perfect-record state
(|00><00| + |11><11|)/2 (the theta = pi/2 rows, which are exactly that
state). m_delta^Psi is the smallest interpolated m <= N_E/2 at which
mean Psi-hat(m) >= (1 - delta) Psi_perf (with Psi-hat(0) := 0);
R_delta^Psi = N_E / m_delta^Psi.

The finite-sample floor. V2 of v11: for a source with I = 0,
R12-hat = a / N with a = 34.3 (band [31, 37] in V2's failure condition).
A control with rho_R = I/4 is run here as well.

Simulation 1: redundancy plateau (Darwinian c-maybe environment)
------------------------------------------------------------------
Grid: theta in {pi/8, pi/6, pi/4, pi/3, pi/2}, N_E in {6, 8, 10, 12}; Psi-hat
for m = 1..6, 40 seeds per (theta, m). For this model rho_R depends on
(theta, m) only, not on N_E, so one Psi-hat table serves every N_E.
Prediction: Psi-hat rises to a plateau over the same fragment-size range in
which I(S:F) reaches H_S.
Failure condition, per configuration (theta, N_E) with m_delta^MI <= N_E/2
(the MI plateau is reached within the pairable range):
  (a) mean Psi-hat is not monotone non-decreasing in m: some step
      falls by more than 2 standard errors of the difference; or
  (b) the onset ratio m_delta^Psi / m_delta^MI lies outside [1/2, 2]; or
  (c) Psi-hat never reaches (1 - delta) Psi_perf for m <= N_E/2 and
      (N_E/2) / m_delta^MI > 2 (the ratio is then provably > 2).
If Psi-hat never reaches the level and (N_E/2)/m_delta^MI <= 2, the
configuration is INCONCLUSIVE (the Psi plateau lies beyond the pairable range).
Verdict: FAIL if any configuration fails; PASS if none fails and at least
half of the applicable configurations pass; otherwise INCONCLUSIVE.
Disclosure: while designing (before running) the author of this code
estimated in closed form, for the pure c-maybe model at delta = 0.1, that
I reaches 0.9 bits when cos^m(theta) = 0.368 and the two-observer record
state reaches 0.9 of the perfect-record gate when cos^m(theta) = 0.161,
an onset ratio of about 1.83, independent of theta. Criterion (b) is
therefore not blind; the finite-count simulation and the configurations
with small N_E are the parts that are.

Simulation 2: scrambled (non-Darwinian) environment
---------------------------------------------------
Same S + E state as Simulation 1, then a Haar-random unitary on E alone
(S is untouched, so its decoherence and H(S) are exactly as in the
Darwinian case; only where the record sits changes). Implemented exactly:
U|E_0>, U|E_1> are drawn as a Haar vector v_0 and v_1 = g v_0 + sqrt(1-g^2) w,
w Haar on the complement of v_0, g = <E_0|E_1> = cos^{N_E}(theta), which has
the same joint law as applying a Haar U. Grid: theta = pi/2 at
N_E in {8, 10, 12}; theta = pi/4 at N_E = 12. 20 Haar draws per
configuration, one count seed per draw per record definition.
Predictions: (A) the partial-information plot has no classical plateau;
(B) Psi-hat between small fragments stays at the finite-sample floor.
Failure conditions:
  (A) for N_E in {10, 12}, mean I(S:F_m) >= 0.5 H_S for some m <= N_E/2 - 1;
  (B) at N_E = 12 (both theta), for some m in {1, 2, 3}, the 95% interval
      (mean +/- 1.96 SE over draws) of N_counts * R12-hat (primary
      records R1) lies entirely outside [31, 37].
Verdict: PASS if neither (A) nor (B) holds, FAIL otherwise.

Simulation 3: the discord gap
-----------------------------
Grid (fixed now, not extended after seeing results):
  pure c-maybe, theta in {pi/16, pi/8, pi/4, pi/2}, N_E in {4, 8, 12};
  hazy c-maybe, theta in {pi/4, pi/2}, haziness h in {0.3, 0.6}, N_E = 10;
  the Horodecki et al. two-qubit example quoted by Le and Olaya-Castro
  (PRL 122, 010403, Eq. C1, p = 0.8) as a single-fragment demonstration
  (no observer pair is possible, so no Psi).
Quantities per fragment size m <= N_E/2: I(S:F); the Holevo quantity
chi(S_Pi:F) in the pointer basis and maximized over projective
measurements of S (Le and Olaya-Castro use POVMs; projective is a
restriction); the discord measured on S, D_S = I - chi_max; the
Helstrom accessible information J_H = I(s : r) of one observer's record;
for m = 1 also J(S|F), maximized over projective measurements of the
fragment qubit, and D_F = I - J(S|F). Psi-hat as in Simulation 1
(N_counts = 1e4, 40 seeds per point; 30 for the hazy grid).
Prediction: there is a regime where MI-based redundancy reports
"objective" while agreement-based Psi stays near the floor.
Gap criterion: a configuration and a fragment size m <= N_E/2 with
(i) R_delta^MI >= 3, (ii) I(S:F_m) >= (1 - delta) H_S, and
(iii) mean R12-hat(m) <= 2 * 34.3 / N_counts (twice the floor).
Verdict: PASS if at least one such point exists; NULL if none does. The
gap is quantified in every case by R_delta under MI, chi, J_H and Psi.
Prior expectation stated before running: if rho_{SF} is classical-quantum
in the pointer basis (S decohered by the rest of E) then I(S:F) = chi, and
chi of two equiprobable states is at most their trace distance T (checked
numerically in test_v12.py, not proved here), so I >= 1 - delta forces a
Helstrom error <= delta/2 per observer, a disagreement rate q <= delta,
and a record gate I(rho_R) >= (1 - h(delta))/2 = 0.27 at delta = 0.1,
about 80 times the floor at N_counts = 1e4. A gap can therefore only
come from fragments whose joint state with S is not classical-quantum.
The author expected a NULL.
"""
