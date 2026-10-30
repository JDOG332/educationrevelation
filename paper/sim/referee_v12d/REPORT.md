Referee report: CRT v12, phase 4 ("how close can parts get to the whole?")

Commit a904fc3, "v12 phase 4 referee checks", on paper-v12. It is not pushed and changes no existing files. The scripts and their outputs are in /home/claude/educationrevelation/paper/sim/referee_v12d/:
- ref_core.py: an independent engine that imports nothing from run_v12* or crt.
- reproduce.py/.out
- t6b_check.py/.out
- t3_rates.py/.out/.json
- t4_audit.py/.out
- t4_norm.py/.out
- t4_dicke.py/.out
- verdict_check.py/.out
- heisenberg_point.out

I did not write a REPORT.md; the full text is below. Compute used was about 20 CPU-minutes.

Provenance check:
- The docstring (lines 1–557) is byte-identical between 0170e16 and HEAD.
- The GitHub activity API shows the push 9a0dd6c→0170e16 at 2026-10-30T20:56:47Z, and the results push 0170e16→b54bfe7 at 21:58:48Z.

SUMMARY VERDICT

The code is correct. Every number I recomputed independently agrees with the run, to between 1e-13 and 1e-15. The verdicts follow the rules as written.

The problem is what the headline verdicts can show. Neither open headline carries evidence for or against the thesis line:

- **T3 "NO COLLAPSE (subadditive)".** No other headline was reachable: with M4 unscorable, the design allowed only NO COLLAPSE or INCONCLUSIVE.
  - The non-collapse is expected, and coarser local rates (2-site clusters) do not change it.
  - The "subadditive" reading is not supported: r > 0 persists in pointer-conserving cells even when the fragment's own Chernoff information is the budget.
- **T4 "MIXED / grid-dependent", with floors where the pointer is not conserved.** This mostly measures slow decay over N_E = 8→12, not a floor:
  - The pre-registered FLOOR rule labels the exactly solvable, exponentially decaying product law a FLOOR whenever the per-site rate is at most 0.148 nats.
  - Every M4 FLOOR cell is predicted FLOOR by the product law with that cell's own local rates.
  - In the solvable cells I can continue exactly to large N_E, the "floors" decay: about N_E^-1/2, to 0.09 at N_E = 320.
- **The Section 8 stop condition (T6(b)).** It is round-off, as the run claims. I confirmed it in extended precision. The run's stated mechanism understates the error by about 40×, and the right way to report it is a declared protocol deviation (point 6 below).

MAJOR ISSUES

1. T3 could only ever return NO COLLAPSE or INCONCLUSIVE, and it could never be ROBUST (a pre-registration defect).
   - **What:**
     - Each M4 cell is one final state. The cell rule needs ≥ 3 eligible states, so M4 is INCONCLUSIVE whatever the data (96 of 96 cells hold one state).
     - The run's implementation choice puts NO COLLAPSE ahead of INCONCLUSIVE. So if M2 had been COLLAPSE, UP TO PREFACTOR or PARTIAL, the overall verdict would have been INCONCLUSIVE (verdict_check.out). If M2 is NO COLLAPSE, the overall is NO COLLAPSE.
     - On the robustness grid, M2 at N_E = 10 has 6 cells (fewer than 10 → INCONCLUSIVE) and the M4R cells hold one state each. So T3-R was INCONCLUSIVE by construction, and "T3 grid-dependent" carries no information.
   - **Why it matters:** the primary open test was one-sided. A positive result (collapse) could not have been reported. The pre-stated alternative H_alt was the only outcome that could be scored.
   - **Fix:**
     - Report T3 as "M2: NO COLLAPSE (C2 in 3 of 282 cells); M4 not scorable by design; the overall verdict is not scorable under the reading that an INCONCLUSIVE model blocks the overall."
     - Remove "across structurally different models" from every T3 sentence.
     - The M4 per-state reading (C2 in 0.175) may be given as post-hoc.

2. T3's non-collapse was predictable, and the sign interpretation ("subadditive: sites hold overlapping, correlated records") is not established.
   - **Derivation (pointer-conserving cells):**
     - With E starting in |0…0⟩ and V0, the s = 0 branch on any F stays the pure state |0_F⟩. The bracket ⟨·⟩ below is with respect to that branch's fragment state ρ_{F|1}.
     - For a pure state against a mixed one, min_c Tr ρ0^c ρ1^(1−c) is reached as c → 0, so ξ(F) = −ln⟨0_F|ρ_{F|1}|0_F⟩.
     - Single-site additivity Σ_k ξ_k = ξ(F) is then exactly the statement that P(all of F in 0 | s = 1) factorises over sites. Any correlation inside the environment breaks it.
     - On top of that, D_ref is the pure–pure formula. For mixed conditional states the prefactor depends on the spectrum and therefore on m, as the hazy case T2(c) already shows (C1 0.72).
     - So NO COLLAPSE was the expected outcome whenever correlations are not small. The test measured correlation strength, not a law.
   - **Test (t3_rates.out).** Setting: M2 at N_E = 8, all 94 open main cells × 16 times, exhaustive fragments, same window, same C1/C2 and cell rules. Three budgets:

     | budget | M2 frac C2 | median r | median q95\|r − med\| | conserving cells | M4 per state, C2 |
     |---|---|---|---|---|---|
     | single sites (reproduces the run) | 0.011 | +0.147 | 0.520 (tol 0.223) | — | 0.19 |
     | 2-site contiguous clusters | 0.011 | +0.127 | 0.542 | — | 0.19 |
     | fragment's own ξ(F), with x_E = ξ(E) (nearly circular) | 0.649 | — | 0.127 | 14 cells: C2 0.071, r ≈ +0.87 | 0.33 |

     - With ξ(F), the 80 non-conserving cells reach C2 = 0.75 with r ≈ −0.10.
     - Additivity diagnostic: the median over states of median_F ξ(F)/Σξ_k is 0.999, with p10 0.63 and p90 2.6. Local rates are both sub- and super-additive.
   - **Reading:**
     - A local cluster rate does not collapse the data.
     - Even the fragment's own distinguishability fails the pre-registered 90% bar. It fails worst in conserving cells, where r > 0 survives with no additivity assumption at all. So r > 0 there comes from the wrong functional form (pure-branch D_ref applied to mixed conditional states), not from "overlapping records".
   - **Fix:**
     - State the derivation above.
     - Report the sign as "δ above the pure-product law". Do not attribute it to correlated records.
     - If a law is wanted, test δ against a mixed-state-correct function of ξ(F) (Zwolak 2022 gives the shared exponent and model-dependent prefactors). That is a known statement, not a new one.

3. T4/S: the FLOOR rule cannot tell a floor from slow decay, and the comparison across N_E is confounded.
   Evidence from t4_audit.out:
   - **(a) Slow decay is called FLOOR.**
     - The exact product law D_ref decays to 0 exponentially, yet the pre-registered rule (δ12 ≥ 0.05 and δ12 ≥ 0.8 δ8) classifies it FLOOR for every per-site rate ξ ≤ 0.148 nats. Example: ξ = 0.10 gives δ8 = 0.321, δ12 = 0.278, ratio 0.866 → FLOOR.
     - In the excluded derivable product cells of M2, the rule fires FLOOR at 4 (cell, t) points.
   - **(b) Observed versus product-law predictions.** I took the product-law prediction from each state's own single-site rates and compared it with the observed class:
     - All 6 M4 FLOOR points are predicted FLOOR.
     - In M2, 340 of 617 FLOOR points are predicted FLOOR and 193 are predicted UNDECIDED. Only 84 are predicted DECAY.
     - The median single-site rate in M2 FLOOR points is 0.156 nats.
   - **(c) Redrawn couplings.** The inhomogeneous g_k are redrawn for each N_E, as pre-registered. Their means are 0.992 (N_E = 8), 1.033 (10) and 0.908 (12), so N_E = 12 is more weakly coupled.
     - In 162 of 743 inhomogeneous points δ12 > δ8; in homogeneous cells, 32 of 696.
     - So the "inh" cells compare different realisations, not different sizes.
   - **(d) Sampling bias at N_E = 12.** The N_E = 12 minimum is over a sampled fragment set, which is an upper bound and biases toward FLOOR.
     - Example: J = 1, h_S = 0, homogeneous g, V0, t = 2. The run has 0.004724; the exhaustive search over all 924 half-fragments gives 0.003981 (reproduce.out).
   - **(e) The robustness grid is all non-conserving.** None of its 14 T4 cells conserves the pointer (h_S ∈ {0.5, 1} with VC; λ ∈ {0.25, 0.6}). "R = SUPPORTED" is therefore a selection effect, not a robustness failure in either direction.
   - **(f) Decisive check: the floors decay at large N_E (t4_dicke.out).**
     - At J = 0 with homogeneous g (V0/VA), the dynamics stays in S ⊗ the symmetric (Dicke) subspace. All half-fragments are then equivalent, and I continued exactly to N_E = 320. The method reproduces the brute-force N_E = 8–14 values to 4 decimals.
     - J = 0, h_S = 0.75, V0, t = 1 (identical to the run's J = 1, VB, hom FLOOR cell; see point 5): δ_half = 0.407 (8), 0.364 (12), 0.304 (20), 0.231 (40), 0.172 (80), 0.124 (160), 0.089 (320). That is roughly N_E^-0.5.
     - h_S = 0.75, t = 2: 0.527 → 0.134.
     - h_S = 0.25, t = 3: 0.607 → 0.055.
     - VA, h_S = 0.75, t = 1 (= the run's J = 1, VC, hom cell): 0.387 → 0.022.
     - Every one of these is FLOOR under the 8-vs-12 rule, and every one decays.
   - **Fix:**
     - Do not report any cell as evidence of a structural floor.
     - Restate T4 as "δ_half decreases by less than 20% between N_E = 8 and 12 in X cells; in the cells continuable exactly to N_E = 320, it decays (roughly as N_E^-1/2 where the pointer is not conserved)."
     - A floor test would need a rate-aware criterion (compare with D_ref at the same local rates), nested couplings, exhaustive fragments, and a range of N_E large enough for x(F) to change by several units.

4. The normalisation question: the floor is partly an artifact of asking about the instantaneous σ_z of a precessing S, and partly an artifact of small N_E.
   - **What the run normalises by:**
     - The run normalises by χ(E) = S(ρ_S), not H(S_Π).
     - For a pure global state, χ(S_n : E) = S(ρ_S) for every measurement basis n of S, because the branches on E are pure. So the normalisation is the same for any pointer, and the question reduces to which basis the fragments record.
   - **Test (t4_norm.out).** Exhaustive half-fragments, N_E = 8, 10, 12, 14, best Bloch direction n per fragment:
     - J = 0, h_S = 0.75, t = 1: δ_half is 0.346 in z versus 0.189 in the optimal basis at N_E = 14.
     - The eigenbasis of ρ_S is much worse (0.85), so "time-averaged or eigen pointer" choices do not rescue it.
     - In 3 of the 5 non-conserving cells tested, the optimal-basis δ_half still does not decrease between N_E = 8 and 14 (opt-basis T4 class: FLOOR in 3, UNDECIDED in 1, with one pair of the five cells being the same physical cell).
     - The large-N_E continuation of point 3(f) then shows the optimal-basis deficit decaying too: 0.18 → 0.071 at N_E = 320.
     - Control: the conserving cell J = 1, h_S = 0, V0 gives z = opt = 0.0250 → 0.0019, DECAY.
   - **Fix:**
     - Report that the z-pointer deficit overstates the optimal-basis deficit by up to about 2× when S precesses.
     - Report that the residual "plateau" at N_E ≤ 14 is slow decay where it can be checked.
     - Normalising by I(S:E) (δ_I) is not a useful alternative: by antisymmetry it is about 1/2 at half size for any Darwinian state.

5. A quarter of the "J > 0" homogeneous M2 cells are J = 0 cells in disguise (the isotropic Heisenberg point).
   - **Why:**
     - VB sets Δ = 0.5. At J = 1 this is J = 2Δ, where (J/2)(XX + YY) + Δ ZZ = J·SWAP − J/2.
     - With homogeneous g, both branches stay permutation-symmetric, so SWAP acts trivially.
     - Hence J = 1/VB ≡ J = 0/V0, and J = 1/VC ≡ J = 0/VA.
   - **Evidence (heisenberg_point.out):**
     - The stored best_d and S(ρ_S) agree to 8e-14 and 1.9e-13 over all h_S, t and N_E.
     - Inhomogeneous g breaks the equivalence (differences up to 0.72).
   - **Consequences:**
     - 18 cells (6 per N_E) counted as "open, J > 0" have no intra-environment interaction.
     - The J = 1, h_S = 0, VB, hom cells are the derivable product law, counted as open: they pass C2 with r = 0.
     - The "M2 J > 0" breakdown and the T4 FLOOR cell J = 1, h_S = 0.75, hom, VB are J = 0 results.
   - **Fix:** relabel these cells as J = 0 equivalents, and the h_S = 0 ones as derivable. Recount.

6. The T6(b) stop condition: the diagnosis is right in substance but wrong in magnitude, and the reporting should be a declared deviation.
   - **Reproduction (t6b_check.out):**
     - Flagged state: M2, N_E = 8, J = 0, h_S = 0, inhomogeneous g, V0, t = 2, O = {S}.
     - Closed form: |γ| = Π|cos(2g_k)| = 2.586228507281e-06. The run's D = 2.586228507729e-06, so D is accurate to 4.5e-16.
     - The run's float64 Uhlmann fidelity F (the sum of singular values of a 256×256, rank-2 matrix) is off by +3.9e-15, which is 18 ulp. That is where the gap comes from: δ(1 − F²) = 7.7e-15, and 7.7e-15/(2D) = 1.49e-9.
     - The run says "round-off in F (about 1e-16) amplified by 1.93e5". That would give 2e-11, not 1.5e-9, so it understates the F error by about 40×.
     - The same 2×2 marginals in long double give 1 − F² = 6.688578e-12, equal to γ², and a gap of −1.4e-14. The bound holds with equality.
   - **Whole pre-registered T6(b) set** (186 states, 86,490 (state, O) pairs, the run's own D and F routines):
     - As registered: 1 violation. The second-largest gap is 7.7e-11.
     - Well-conditioned form D² + F² − 1 > 1e-12: 0 violations; worst 4.3e-14.
     - Conditioning-aware tolerance: 0 violations.
     - 8,110 pairs saturate the bound, which is why a 1e-9 absolute tolerance on a square root of a near-zero number was fragile.
   - **How to report it:**
     - (i) Keep T6(b) = FAIL as registered. Do not change the tolerance retroactively.
     - (ii) Open the report with a protocol-deviation statement, not a warning that sits beside the headline table.
     - (iii) Give the independent high-precision diagnosis and the amended, well-conditioned check, explicitly as a post-hoc amendment with its result.
     - (iv) State why the flagged routine cannot affect T1–T5: trace_dist_marg and root_fid_marg are used only in T6. T1–T5 can keep their status only on that argument, stated openly.
     - (v) Downgrade T6 to "code check, failed as registered, explained".
     - (vi) In future pre-registrations, use relative or conditioning-aware tolerances, and say what "stop" means (stop and fix then rerun, versus stop reporting).
     - Reporting everything with a post-hoc note is acceptable only with (ii)–(iv). As committed, it is close but has the wrong magnitude and no independent check.

MINOR ISSUES

- T2 "FAIL" is the rule applied to a wrong prediction (T2(d): C1 was predicted to fail, and it passes in 12 of 12 eligible states). It is not a failure of the product law.
  - p0 = 0.95 is ineligible by construction (χ(E) ≤ 0.29 < 0.5), so (d) tests only p0 = 0.8.
  - The headline should read "T2: product law confirmed; the pre-stated T2(d) expectation was wrong".
- H5 counts k = 1, where the log ratio is identically 0 (40 rows), and the product M4 point λ = μ = 0 (16 rows). Without them the fraction within ln 1.25 is 0.615 (k ≥ 2) and 0.582 (k ≥ 2, open), against 0.685 as run. The verdict (NOT SUPPORTED) does not change. Helstrom records pooled lose more than conditional independence predicts (median log ratio +0.33): the expected redundancy of correlated records.
- T3c: d* = 1 in all 9 (θ, N_E) cells. The pass fraction is already about 0 at the smallest non-zero depth, so the grid does not resolve a crossover. The prior "d* ≤ 3" is satisfied trivially, and r < 0 holds in 7 of 9, not 9.
- T4 uses three N_E values, 8 to 12, so no rule could separate a floor from algebraic decay. The δ_half(N_E − 1) table has the same limitation.
- T6(c) is descriptive. Its prior fails in M4 (0.28 of states) and in about 38% of M2/M3 states. The "whole cannot see itself" content is the derivable L6 identity.
- Cosmetic: bootstrap intervals are printed to 15 digits in the T3 table.

NUMBERS REPRODUCED (independent engine unless noted)

- M1(a) θ = π/4, N_E = 12, δ_χ(m) for m = 1..11. Mine agrees with D_ref and with the stored values to 3.1e-13. Examples: m = 1: 0.399018119940; m = 6: 0.011126433869; m = 11: 0.000176162763.
- Chain cells, exhaustive half-size minimum (stored values at N_E = 8, 10 agree to ≤ 6e-15; S(ρ_S) agrees to 10 digits):

  | cell | N_E = 8 | N_E = 10 | N_E = 12 |
  |---|---|---|---|
  | J = 1, h_S = 0.25, hom, VC, t = 2 | 0.164707 | 0.132169 (matches the run's spot check) | 0.111546 |
  | J = 2, h_S = 0.75, hom, V0, t = 1.5 | 0.481753 | 0.447643 | 0.399638 |
  | J = 1, h_S = 0, hom, V0, t = 2 | 0.025027 | 0.009741 | 0.003981 exhaustive; run 0.004724 from the sampled set |

- T6: D_{S alone} = 2.586228507e-06 in the flagged state, equal to the closed form. For J = 1, h_S = 0.25, hom, VC, t = 2, δ_self(|O| = 1..9) = 0.7948, 0.7541, 0.7265, 0.7000, 0.6648, 0.6012, 0.4887, 0.3112, 0, identical to the run's selfmeas. Max D for O inside E is 0.608 (non-conserving), and 0 in the conserving product cell.
- Chernoff routine: agrees with the run's qcb to about 4e-16 on M4 fragments.

CLAIMS THE PAPER MAY MAKE

- In finite qubit models (N_E ≤ 12), the pointer-information deficit of product environments follows the known Chernoff law exactly (K1; reproduced to 1e-13). Proper fragments miss quantum information by antisymmetry (K3). Proper observers inside pointer-conserving dynamics are blind to the relative phase, while S+E is not (K7/L6). All of these are known or derived results.
- For the chain environment M2 (and per state in M4), the pointer deficit is not predicted by single-site or 2-site Chernoff rates through the pure-product law.
  - The run's tolerance is ln 1.25; C2 passes in 1% of M2 cells.
  - Even the fragment's own Chernoff information collapses only 65% of cells (75% of non-conserving, 7% of conserving).
- When S has a self-Hamiltonian, fragments hold markedly less about the instantaneous σ_z than about the best basis (up to about 2× in deficit). In the solvable J = 0 cells, the half-fragment deficit decays slowly, roughly as N_E^-1/2 over N_E = 20–320, rather than exponentially.
  - This should be checked against the self-Hamiltonian quantum Darwinism and pointer-state literature before it is presented as anything more than an observation in these models.
- Pooled records from correlated fragments are less informative than the conditional-independence law predicts (H5 NOT SUPPORTED, robust to dropping k = 1).

CLAIMS THE PAPER MUST NOT MAKE

- That T3 found "no collapse across structurally different models", or that a collapse was tested and refuted. Collapse was unreachable by design, M4 is unscorable, and the robustness check was impossible.
- That the deficit is "subadditive because sites hold overlapping, correlated records". That attribution is not established (point 2).
- That any cell shows a structural floor, or that "never complete" is SUPPORTED (on the R grid or anywhere else). The FLOOR rule labels exponential decay as FLOOR, and the checkable floors decay.
- That the floors are tied to non-conservation as a finding. They are tied to slow imprinting, to the choice of pointer, and to N_E ≤ 12.
- That J > 0 results include the J = 1, VB/VC, homogeneous-g cells (point 5).
- That T6(b) passed, or that the stop rule was satisfied.
- That anything here is new relative to the literature (see below), or that it bears on awareness, consciousness or the universe (Section 9 of the pre-registration).

LITERATURE (is anything new?)

None of the results is new as a law.
- **Already known:**
  - The product-environment Chernoff law and its rescaling: Zwolak, Riedel & Zurek, PRL 112, 140406 (2014), https://ntt-research.com/wp-content/uploads/2022/09/Amplification-redundancy-and-quantum-Chernoff-information1.pdf; and Sci. Rep. 6, 25277 (2016), https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4872152/.
  - Hazy environments: Zwolak, Quan & Zurek, PRA 81, 062110 (2010), https://arxiv.org/pdf/0911.4307.
- **Interacting spin-chain environments, including XX chains:**
  - Riedel, Zurek & Zwolak, NJP 14, 083010 (2012). Its redundancy-to-encoding crossover is reproduced by Cao & Nussinov.
  - Giorgi, Galve & Zambrini, PRA 92, 022105 (2015): quantum Darwinism with an XX-chain environment, https://www.arxiv.org/pdf/1504.02105.
  - Galve, Zambrini & Maniscalco, "Non-Markovianity hinders quantum Darwinism", Sci. Rep. (2016), https://www.arxiv.org/pdf/1412.3316.
- **Collision models with memory (the M4 class):**
  - Campbell et al., PRA 99, 042103 (2019), https://ar5iv.arxiv.org/html/1901.03335.
  - Milazzo, Lorenzo, Paternostro & Palma, PRA 100, 012101 (2019), on information backflow, https://arxiv.org/pdf/1901.05826.
- **Records of a non-conserved or past pointer (relevant to the "floors"):** Riedel, Zurek & Zwolak, "Objective past of a quantum universe: redundant records of consistent histories", PRA 93, 032126 (2016), https://ar5iv.labs.arxiv.org/html/1312.0331. Also Blume-Kohout & Zurek, PRL 101, 240405 (2008), and Paz & Roncaglia, PRA 80, 042111 (2009) (cited from memory, not re-checked here): quantum Brownian motion with a self-Hamiltonian, where redundancy concerns a specific observable and records are imperfect.
- **Generic classicality of the recorded observable:** Brandão, Piani & Horodecki (2015), and Qi & Ranard, Quantum 5, 555 (2021), https://quantum-journal.org/papers/q-2021-09-28-555/. Fragments agree about some nearly common observable, not necessarily the one chosen by the analyst. This is the general reason the σ_z normalisation is the wrong yardstick when S precesses.
- **Model-specific exponents in thermalising environments:**
  - Ferté & Cao, https://arxiv.org/pdf/2305.03694, and https://arxiv.org/html/2312.04284v3.
  - Cao & Nussinov, "Redundancy from Subsystem Thermalization", arXiv:2603.15743, https://arxiv.org/html/2603.15743v2: the deficit is at most Ce^(−αn), with α set by large-deviation rate functions, and no universal curve is claimed.
- The phase 4 negative T3 result agrees with these: there is no reason to expect one local rate across models. The apparent N_E^-1/2 decay in the J = 0 self-Hamiltonian cells is the only item I did not find stated in this form. It is a referee observation in one solvable family, it needs its own literature check (Zeno and pointer-state work on self-Hamiltonian competition), and it should not be claimed as new on this basis.

WHAT "NEVER COMPLETE" HAS HONESTLY BEEN SHOWN TO MEAN

In these finite models, no proper part of the environment holds exactly all of what the whole environment holds, which is a known theorem. The shortfall usually shrinks as parts grow: exponentially in product environments, and more slowly (in the solvable cases checked, about as 1/√N_E) when the system's own dynamics competes with the recording. Nothing here shows a shortfall that persists as parts grow.
