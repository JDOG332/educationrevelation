Referee report: "Convergent Recognition" v12, phase 3 (responsive agreement)

Commit: 9f84b0f, "v12 phase 3 referee checks", on paper-v12, not pushed. The scripts and their outputs are in /home/claude/educationrevelation/paper/sim/referee_v12c/: e4core.py, check_reproduce.py/.out, derive_j0.py/.out, probe_j0.py/.out, scan_t4.py/.out, scan_t4_power.py/.out with scan_t4_power_N10.npy, power_t4.py/.out, check_t2.py/.out. I did not write a REPORT.md; the full report text is below. No existing files were modified.

SUMMARY VERDICT

The code is correct. I rebuilt the spin chain independently, with no imports from run_v12c or crt, and reproduced all 288 E4 points (both RA and Im_rec) to 3.3e-15. The pre-registered docstring is byte-identical between 4733c03 and HEAD. The verdicts follow the rules as written.

The interpretation has problems:
- **The J = 0 "unexplained" equality has a short derivation.** It follows from two symmetries of the model (a reciprocity and a chiral time-reversal), so the J = 0 half of the "open" test T4 was derivable in advance.
- **H4 is a coincidence of the grid.** Just outside the grid, the pre-registered 0.1-bit rule fails: 9 violations, largest gap 0.141 bit.
- **"Tracks TYZ" holds only for a records-level analogue.** Against TYZ's actual fragment-level quantity the same rule fails in about half the counted points.
- **The intervention is not "no access to S".** It needs write access in the pointer basis, which in these models is operationally equivalent to read access. It also characterises the S→E process, not the existing records that the no-go is about.
- **RA itself is a known construction.** It is the co-information of a randomised input with two outputs, built from interventional mutual information (Ay–Polani information flow, Hoel–Tononi effective information).
- **T2's failure explanation is substantively right but understated.** Part (b) fails on the exact values, because the pre-registered expectation was wrongly derived. Part (c) was guaranteed to fail.

MAJOR ISSUES

1. The T4 equality at J = 0 is derivable, so T4 was only partly open.
   - What: the report says the equality RA = Im_rec(S) at J = 0 (all h_S, all t) is unexplained.
   - Derivation:
     - At J = 0, H = g P1 ⊗ N + h_S σ_x^S, where N = Σ_k Y_k is conserved. So U = Σ_n Π_n ⊗ V_n, with V_n = exp[−it(g n P1 + h_S σ_x)].
     - (i) Reciprocity: each generator is real symmetric, so V_n^T = V_n. Hence the E-vector "prepared 1, found 0", α1 = ⟨0|_S U|1,0_E⟩, equals the E-vector "prepared 0, found 1", β0 = ⟨1|_S U|0,0_E⟩.
     - (ii) Chiral symmetry: σ_z^S H* σ_z^S = −H, so U* = σ_z^S U σ_z^S. Then α0 and β1 are real, and α1 = β0 is purely imaginary (computational basis).
     - Take any E-operator M that is real in the computational basis. Then P_nat(s=0, M) = ½⟨α0+α1|M|α0+α1⟩ = ½(⟨α0|M|α0⟩ + ⟨α1|M|α1⟩), because the cross term is the real part of an imaginary number. That equals ½(⟨α0|M|α0⟩ + ⟨β0|M|β0⟩) = P_do(x=0, M). The case s = 1 is the same.
     - Both observer types use real POVMs. The Local one trivially; the Helstrom one because, by (ii), the do-fragment states are real.
     - So the joint law of (s(t), r_A, r_B) equals that of (X, r_A, r_B) for every g, h_S, t, N_E and fragment choice. Pointer conservation (L5) is the special case h_S = 0.
   - Evidence (derive_j0.out, probe_j0.out):
     - α1 = β0 to 4e-16, and σ_z H* σ_z + H = 0 exactly.
     - The identity holds for random real projectors (law gap ≤ 4e-16). It fails for complex ones (gap 0.06) and for a σ_y measurement (0.047).
     - It survives inhomogeneous g_k, an extra Σ Y_k field, and a real initial E (|+>^N).
     - It breaks, as predicted, when a symmetry is broken: a σ_y field on S (0.17), a σ_x + 0.5σ_z field (0.07), Σ Z_k on E (0.09), a YY Ising term (0.014; it keeps the controlled structure but breaks (ii)), a complex initial E (0.08), and hopping J = 0.1 (0.015).
   - Why it matters:
     - It is not conditional independence given the pointer history. It is a time-reversal / reciprocity identity of this particular model, so it says nothing general about interventions versus S access.
     - Of T4's 16 cells, 8 (J = 0) were derivable. Two more (J=1, h_S=1, m=1 and m=2, Local) have zero counted points, so they pass vacuously. The report's "0 of 16 cells violate" does not disclose that.
     - The open evidence is therefore 6 cells, 32 counted points, at a single hopping value J = 1.
   - Fix: give the derivation, and relabel the J = 0 cells as derivable controls. Report the vacuous cells. State that the difference between RA and Im_rec appears only when both symmetries are broken (J > 0 and h_S > 0).

2. H4 is not robust outside the pre-registered grid.
   - Evidence, scan_t4.out (12 configurations, t up to 6):
     - The 0.1-bit rule is never violated, but it is mostly vacuous: with h_S ≥ 2, J = 4, or g ≤ 0.5, zero points reach 0.1 bit.
   - Evidence, scan_t4_power.out (configurations where the rule has power: g ∈ {1,2}, J ∈ {1,2,4}, h_S ∈ {0.25,0.5}, m up to 3, t up to 6, N_E = 10):
     - 505 counted points, 9 violations, largest gap 0.141 bit.
     - The first violation sits at the grid's own g = 1 and J = 1, at t = 2.25 (inside the time range), with h_S = 0.5 (between the grid's 0.25 and 1) and m = 3: RA = 0.303, Im_rec = 0.161.
     - With m = 2: g = 2, J = 1, h_S = 0.5, t = 4.75 gives RA = 0.105 against Im_rec = −0.004. Interventions report responsive agreement where S-access consensus is zero.
     - Overall Pearson r = 0.98, but relative discrepancies near a factor of 2 are common at signals of 0.1–0.3 bit.
   - Inside the grid (power_t4.out, J = 1 cells): r = 0.992, and the median relative gap is 10%.
     - The rule does discriminate: the predictor "0" fails 30 times and C_rec fails 12 times.
     - But I(r_A:r_B) under P_do, which is not an S-specific quantity, fails only 4 times. The tolerance is lenient.
   - Fix: report RA and Im_rec as strongly correlated but not equal when J > 0 and h_S > 0. Show the violations above. Use a relative or stricter criterion if a new test is pre-registered. I did not run N_E = 12: it did not finish within the compute budget, so all my out-of-grid numbers are at N_E = 10.

3. "Tracks Touil–Yan–Zurek (TYZ)" holds only for the author's records-level analogue.
   - Evidence: against TYZ's actual quantum refined consensus Im(F:F'|S_Π), using the same counted rule, RA fails in 24 of 50 counted J = 1 rows and 31 of 66 J = 0 rows. The largest gap is 0.54 bit.
   - Im_rec is observer-dependent: it uses the same Helstrom or Local records as RA. TYZ's quantity is a property of the fragment states.
   - Fix: always write "records-level Im_rec with the same observers". Never write "TYZ's refined consensus" without that qualifier.

4. The intervention is not "without access to S", and it changes the object of study.
   - Write access: do(S = X) in the pointer basis, on a system in an unknown state, is a reset. A reset is either measure-and-correct or a swap with a fresh ancilla. Both give read access (swap S out, then measure the ancilla). L8 also requires the pointer basis to be known. "Observers who cannot read S" should become "observers who can reset S in the pointer basis and choose not to read it".
   - Change of object: the no-go concerns a state ρ_SE that already contains records. RA re-prepares S and then watches new records form. TYZ explicitly avoid measuring S because it "would re-prepare them and invalidate past records".
     - RA therefore certifies that the dynamics would write S into E. It cannot certify that existing records are about S.
     - The E1/twin pair separated in T1 are two different processes (S coupled versus S never coupled). They are not the two indistinguishable states of the no-go. The "resolution" works because the question changed from states to processes.
     - It also assumes repeatable, stationary dynamics, a free X, and that X reaches E only through S.
   - Fix: restate the claim as process discrimination under pointer-basis resets, and drop "resolves the no-go".

5. Novelty of the quantity.
   - I(X:r) under a uniform randomised do(X) is Ay & Polani's information flow and Hoel–Albantakis–Tononi's effective information.
   - RA = I(X:r_A) + I(X:r_B) − I(X:r_A r_B) is McGill's co-information (interaction information, redundancy minus synergy) of the intervened input and two outputs.
   - Separating common cause from cause-effect with interventions is the textbook classical case. Ried et al. 2015 note that the quantum advantage lies in doing it without interventions. Chiribella & Ebler 2019 treat cause-effect identification from interventions/queries.
   - Quantum Darwinism as a property of the channel S→fragments, for every input, is already in Brandão, Piani & Horodecki 2015 (and later work on general channels).
   - My search found no paper that names an "interventional refined consensus". That is the only thin novelty, and it is terminological.
   - The bounds are one-line identities: RA ≤ min(I(X:r_A), I(X:r_B)) from RA = I(X:r_A) − I(X:r_A|r_B), and RA = 0 whenever X is independent of the records. They must not be presented as results.

6. The T2 explanation is right in substance but mis-framed.
   - (b): the two failing points (E2, φ = π/4, θ = π/8, Local, m = 1 and 2) fail on the exact values: f_resp = 0.174.
     - The selection J ≤ 0.05, I ≥ 0.1 only implies f_resp ≤ J/I ≤ 0.5. For these points the bound is 0.307 (check_t2.out).
     - So the pre-registered "derivable" expectation was wrong; this was not an estimator effect. Since θ > 0, S really drives the records, and RA > 0 there is correct.
     - The report should say "my pre-registered derivation was wrong", not only "the window was too tight".
   - (c): with r_A = r_B = K, the plug-in RA equals I-hat(X:K) ≥ 0, so a percentile interval cannot contain 0.
     - My simulation: the pre-registered rule fails in 100% of 300 datasets. The failure was certain in advance.
     - Because X is randomised, a permutation test of X against (r_A, r_B) is valid by design. It has false-positive rates of 0.040 at α = 0.05 and 0.013 at α = 0.01. That is the fix, rather than per-level null calibration.

MINOR ISSUES

- The pre-registration says it is "pushed as a tag". Tag v12-phase3-prereg (→ 4733c03) exists only locally; `git ls-remote` shows no tags on origin. The external timestamp rests on the branch-creation time alone. The pre-registration and the implementation commits are 8 minutes apart, from the same AI session; pre-registration fixes the rules but cannot exclude prior exploration.
- f_resp-hat intervals are unstable when I is small (for example [−4576, −0.11] at E2, φ = π/4, θ = 0, m = 2). The 0.05-bit threshold is applied to the exact f_resp but not to the bootstrap.
- L5 and the J = 0 identity require the uniform X to match S starting in |+>. For any other natural state X must be biased to match, otherwise the comparison is not like for like.
- Helstrom observers in the twin are given the E1 states by assumption. Harmless, because RA(twin) = 0 for any measurement.
- In E3 (Haar-scrambled environment), m = 6 Helstrom gives RA ≈ 0.14. It is excluded from T3 as pre-registered, but should be mentioned next to the T3 PASS.
- The no-go is the one-line marginal argument already implicit in Poderini et al. 2022. Present it as framing, which the author partly does.

NUMBERS REPRODUCED (independent numpy code)

- All 288 E4 points: RA and Im_rec match to 3.3e-15.
- Largest counted T4 gap: 0.0561 (J=1, h_S=1, t=1.25, m=2, Helstrom). Largest uncounted gap: 0.066.
- Points with J = 0 and h_S > 0: law gap ≤ 4e-16.
- T2(b) exact f_resp = 0.174 at the failing points, with bound 0.307.
- T2(c): the rule fails at perfect agreement with probability 1.
- Not reproduced: the E1/E2/E3 tables, T1 and T3 (I checked them by inspection only), and N_E = 12 (budget).

CLAIMS THE PAPER MAY MAKE

- Statistics on E alone cannot separate a Darwinian ρ_SE from a twin with the same ρ_E (one line, elementary).
- If observers can reset S in the pointer basis at random, the co-information RA of the setting with two records is zero for any process in which S does not influence E. RA is bounded by each observer's interventional information, and it equals the records-level refined consensus when the pointer is conserved or, in this chain, when J = 0 (by the reciprocity and chiral symmetry above).
- In the 10-site XY chain with J > 0 and h_S > 0, RA and Im_rec are strongly correlated (r ≈ 0.98) but differ by up to 0.14 bit, with relative differences up to about a factor of 2.

CLAIMS THE PAPER MUST NOT MAKE

- That the method needs no access to S, or that it "resolves" the records-only no-go for existing records.
- That RA tracks TYZ's refined consensus (it tracks only the records-level analogue).
- That H4 shows interventions can replace S access when the pointer is not conserved.
- That the J = 0 equality is unexplained or surprising.
- That RA is a new information measure, or that T2 failed only because of rule design.

PLAIN-LANGUAGE NOVELTY SENTENCE

Nothing here is new physics or a new measure: it is the standard "randomise the cause and see whether the effects follow" test, written as a co-information. In this model it matches the S-access quantity exactly only because of a symmetry, and only roughly otherwise.

SOURCES

- Touil, Yan, Zurek, "Consensus About Classical Reality in a Quantum Universe": https://arxiv.org/abs/2503.14791 (Eqs. 19–23: refined consensus conditioned on a measurement of S; no intervention; direct measurement "would re-prepare" S).
- Poderini et al., "Witnessing the non-objectivity of an unknown quantum dynamics": https://arxiv.org/abs/2211.15638 (measurements on E only; no inputs chosen).
- Brandão, Piani, Horodecki, "Generic emergence of classical features in quantum Darwinism", Nat. Commun. 6, 7908 (2015): https://arxiv.org/abs/1310.8640 (channel formulation).
- Chiribella & Ebler, "Quantum speedup in the identification of cause–effect relations", Nat. Commun. 10, 1472 (2019): https://arxiv.org/abs/1806.06459
- Ay & Polani, "Information flows in causal networks", Adv. Complex Syst. 11, 17 (2008): https://uhra.herts.ac.uk/id/eprint/162
- Hoel, Albantakis & Tononi, PNAS 110, 19790 (2013), effective information under uniform interventions: https://pmc.ncbi.nlm.nih.gov/articles/PMC3856819
- Ried et al. 2015, arXiv:1406.5036; Costa & Shrapnel 2016; Allen et al. 2017, arXiv:1609.09487 (cited as in the pre-registration; I did not re-fetch them).
- Le & Olaya-Castro, arXiv:1908.08818 (non-objectivity witness using S).
- Tank, arXiv:2509.17775 (operational functional-information measure; no intervention test).
