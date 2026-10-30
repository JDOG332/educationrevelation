# Referee report: CRT v12 simulations (phase 1 and phase 2)

**Scope.** I checked:
- `run_v12.py` (phase 1; pre-registration commit 63a4baa);
- `run_v12b.py` (phase 2; pre-registration commit e4cd77b);
- `crt.py` and the tests;
- `results/v12/REPORT.md`, `REPORT_phase2.md` and their JSON;
- `paper/CRT-v11.0.md`, for the definitions.

**Referee code.** All in this directory; none of it imports `run_v12` or `run_v12b`:

| File | What it checks | Runtime |
|---|---|---|
| `check_exact.py` | closed forms and brute-force linear algebra; Haar scrambling with full unitaries at N_E = 8 | 5 s |
| `check_floor.py` | floor constant with my own SIC sampler and linear inversion; the pipeline on the authors' seeds and on fresh seeds; a bit-exact rerun of one cell; a plain classical estimator for comparison | 70 s |
| `check_common_cause.py` | correlated-environment counterexample | 5 s |
| `check_chi_T.py` | optimized search for violations of χ ≤ T | 3 min |

## Summary verdict

**The numbers are right; the framing is too strong.** Every exact quantity I recomputed agrees with the reports, and one phase-2 cell reproduces bit-for-bit from the authors' seeds. The floor constant a_c ≈ 27.6–27.9 is confirmed three ways. The reports are unusually candid.

The evidential value of the verdicts is weak:
- S1 (PASS) and S3 (NULL) were analytically determined before running, as the pre-registration itself says.
- S2 was the only open test, and it failed.
- The phase-2 S2 pass belongs to a gate designed after that failure. Its outcome was predictable from phase-1 numbers and was predicted in the phase-2 pre-registration.

On every input studied, Ψ_v12 = 0.475 · F · I(r_A:r_B)/2, with F ∈ [0.976, 0.995]. That is, it is a constant times half the classical mutual information between the two records. Three consequences follow:
- Its "monotone relation to accessible information" is an identity for conditionally i.i.d. symmetric records.
- Outside that class the relation fails. A common cause gives Ψ at 77× the floor while each observer holds 0.007 bit about S. Ψ_v12 is therefore not a witness of objectivity.
- The idea itself, observer consensus measured by mutual information between fragments or records in the c-maybe model, is already in Touil, Yan & Zurek 2025.

What survives is narrow. For this pipeline, the floor of the correlation gate is a_c/N with a_c ≈ 27.6–27.9. Even that is about 120× worse than the obvious classical estimator.

**Recommendation:** major revision of the claims.

## Major issues

**1. The only open test failed; the phase-2 pass is of a repaired instrument with a known answer.**

*What.* Phase-1 S2 failed: N·R̂₁₂ = 97.8 and 90.2 at m = 3, outside [31, 37]. Phase 2 replaced the gate with I_c = I(A:B)/2, and the test then passed.

*Why it matters.* The phase-2 pre-registration (e4cd77b, 16:21) came 11 minutes after the phase-1 results (89731a2, 16:10), from the agent that had just diagnosed the cause as record bias. Phase 1 had already:
- shown the symmetrized records (R2) inside the band (33.9 and 32.0);
- computed the exact record mutual information (≈ 2e-4 bit).

The phase-2 docstring states the expected answer: "N I_c about 1, inside the band". The only open question was whether the finite-N floor stays in band under small bias. That is a calibration check, not a test of objectivity discrimination.

*Evidence.*
- `git log --date=iso` timeline: 15:55 / 16:02 / 16:10 / 16:21 / 16:29 / 17:03.
- `check_exact.py` §4: the exact v11 gate on scrambled records at θ=π/2, N_E=12, m=2 has median N·I_v11 = 1.1, mean 113, max 1920 over 100 draws. N·I_c ≈ 0.5.

*Fix.*
- Say in the abstract that the pre-specified v11-gate test failed.
- Call v12 a post-hoc modification, and its S2 pass a predicted consistency check.
- Any claim that Ψ_v12 separates objective from non-objective environments needs a new, externally pre-specified test on environments not used to design the gate: correlated or structured environments, spin chains with intra-environment coupling, local-measurement records.

**2. S1 and S3 are computations with known answers; S1's "10 passes" are 2 independent non-trivial curves.**

*S1.* The disclosed closed-form onset ratio is ln(0.1612)/ln(0.3680) = 1.826, independent of θ, against the window [1/2, 2]. The finite-N ratios (1.39–1.58) are lower only because of the finite-N reference (0.2191 or 0.2179 against the exact 0.2375). With the exact reference the ratio is 1.83, 9% from failure.

*S1 pass count.* The record law depends only on (θ, m), so:
- the four π/3 passes are one curve;
- the two π/4 passes are one curve;
- the four π/2 passes are tautological: Ψ_perf is the mean of those very rows, and both crossings are interpolations from m=0 (0.9/0.9).

The "at least half pass" rule therefore counts pseudo-replicates.

*S3.* The NULL follows from the pre-stated argument: I ≥ 0.9 forces P_e ≤ 0.05, which forces a gate ≥ 0.27, about 80× the floor. That argument covers classical-quantum ρ_SF, and the grid contains only nearly classical-quantum states. The Horodecki example has no observer pair. The argument also rests on χ ≤ T, which is unproved and uncited; my optimized search found no violation (min T−χ = −3e-14, round-off).

*Fix.*
- Present S1 and S3 as analytic results (give the closed forms), with the simulation as an estimator check.
- Report the exact-reference ratio of 1.83.
- Count independent curves, not configurations.
- Prove or cite χ ≤ T.

**3. Ψ_v12 = D̂·C_eff·F·I(r_A:r_B)/2; the relation to accessible information is an identity.**

*What.* On these inputs every factor except the gate is effectively constant:
- D̂ = 0.95 by construction.
- C_eff = 1/2 in all 3080 + 7380 runs, and in all 640 of mine.
- F ∈ [0.976, 0.995]. It measures batch-to-batch reproducibility, not agreement between observers.
- The gate on the diagonal record state is exactly I(r_A:r_B)/2.

For conditionally i.i.d. records with symmetric error:
- I(r_A:r_B) = 1 − h(2P_e(1−P_e)) and J_H = 1 − h(P_e). I verified both by brute force at 4 points.
- Hence Spearman = 1 by construction, as the phase-2 pre-registration itself derives.

The claimed advantage (i), "computed from records alone at finite N", holds for any mutual-information estimator (see issue 6). Advantage (ii) is the failure mode in issue 4.

*Fix.*
- State the reduction explicitly, with the observed F and C_eff ranges.
- Present the J_H relation as a lemma with its conditions.
- Note that the 0.9 gate threshold corresponds to J_H = 0.943 bit (confirmed).

**4. Not an objectivity witness: common-cause false positives, and non-monotone in J_H.**

*Setup* (`check_common_cause.py`). Same coupling and the same Helstrom observers, but a correlated initial environment: ρ_E = (|0…0⟩⟨0…0| + |b…b⟩⟨b…b|)/2, with |b⟩ = cos φ|0⟩ + sin φ|1⟩.

*Main case: φ=π/3, θ=π/16, m=1.*
- J_H = 0.007 bit about S.
- I(r_A:r_B) = 0.430 bit, of which I(r_A:r_B|s) = 0.425.
- N·gate = 2150, 77× a_c.
- Conditionally independent records with the same J_H would give I(r_A:r_B) = 0.0001 bit.

*Second case: φ=π/3, θ=π/8.* As m goes 1→4, J_H rises 0.027→0.289 while I(r_A:r_B) falls 0.36→0.105.

At φ=π/2, symmetry makes the Helstrom record ignore the hidden bit, so a casual check misses the effect. Strong Quantum Darwinism and spectrum broadcast structure require conditional independence of fragments given the pointer (Le & Olaya-Castro 2019; Korbicz et al. 2014). Records alone cannot test that; Touil–Yan–Zurek introduce a conditional I(F:F′|SΛ) for exactly this reason.

*Fix.*
- Withdraw "witness of objectivity".
- Restrict the claim to conditionally independent fragments.
- Add a correlated-environment control.

**5. The novelty is already in the literature (verified by web search).**

| Topic | Prior work |
|---|---|
| Consensus = I(F:F′)/H_S in the c-maybe model, with a plateau; Theorem 1 ≈ the S3 null argument; Ψ_v12 ≈ its post-measurement version (I(r_A:r_B) ≤ I(F_A:F_B) by data processing) | Touil, Yan & Zurek, arXiv:2503.14791 (2025) |
| Helstrom / Chernoff redundancy | Zwolak, Riedel & Zurek, PRL 112, 140406 (2014), arXiv:1312.5373 |
| Accessible information vs Holevo in imperfect c-not models | Touil et al., PRL 128, 010401 (2022), arXiv:2107.00035 |
| χ vs accessible information and discord (the "D_F separates R^MI from R^J_H" observation) | Zwolak & Zurek, Sci. Rep. 3, 1729 (2013), arXiv:1303.4659 |
| Hazy environment | Zwolak, Quan & Zurek, PRL 103, 110402 (2009), arXiv:0904.0418 |
| Random (scrambled) states store no redundant information | Blume-Kohout & Zurek, PRA 73, 062310 (2006), arXiv:quant-ph/0505031 |
| Agreement among observers as the objectivity criterion | Ollivier, Poulin & Zurek, PRL 93, 220401 (2004), arXiv:quant-ph/0307229; Brandão, Piani & Horodecki, Nat. Commun. 6, 7908 (2015), arXiv:1310.8640 |
| SBS / strong Quantum Darwinism | Korbicz, Horodecki & Horodecki, PRL 112, 120402 (2014), arXiv:1401.1712; Le & Olaya-Castro, PRL 122, 010403 (2019), arXiv:1803.08936 |
| A witness of non-objectivity without full tomography | Le & Olaya-Castro, arXiv:1908.08818 |
| Reviews and operational measures | Korbicz, Quantum 5, 571 (2021); Kiely et al., arXiv:2510.12313; Tank, arXiv:2509.17775 |

*Fix.* Cite these, and restrict the novelty claim to the finite-count floor of this specific estimator.

**6. About 120× less sensitive than the obvious classical estimator.**

*What.* Applied directly to the record counts, the plain count-based estimate of I(r_A:r_B)/2 behaves far better than the tomographic route:
- Floor: N·gate = 0.230 ± 0.004 (geometric mean of two batches, N = 1e4, 4000 reps), versus a_c = 27.9.
- Unbiased at small signal: exact N·I_c of 1.44, 5.77, 13.0, 36.1 gives estimates of 1.46, 5.83, 13.1, 36.0.

SIC tomography of a diagonal classical record state is justified only for quantum records, which v12 does not study.

*Fix.* Report the plug-in or bias-corrected estimator as a baseline, or drop the efficiency and finite-count claims.

**7. The instrument changed.**

*What.* The v12 gate is not a function of the spectrum. Everything below must be restated:
- Lemma 4's corollary;
- the matched separable control;
- V2's a = 34.3 (now 27.6–27.9);
- the B.1 table;
- P2.

The finite-N floor also depends on record bias at exact I_c = 0:

| Record bias | N·R̂₁₂ | Band [25.19, 30.07] |
|---|---|---|
| unbiased | 27.88 | inside |
| p = 0.4 | 29.05 | inside |
| p = 0.3 | 31.94 ± 0.51 | outside |

In S2 the maximum per-draw bias deviation is 0.26.

*Fix.*
- Use distinct symbols for Ψ_v11 and Ψ_v12.
- List the v11 results that do not carry over.
- Give a_c as a function of bias, or restrict claims to near-unbiased records.

**8. The pre-registration is commit order only.**

*What.* The `paper-v12` branch has not been pushed: there is no `origin/paper-v12`, and no remote contains 63a4baa. Timestamps are self-set, the gaps to results were 15 and 42 minutes, and everything happened within one AI session.

*Fix.*
- Say "pre-specified in a commit preceding results", with hashes and times.
- Deposit future specifications externally (pushed tag, Zenodo or OSF) before running.

## Minor issues

1. **Confidence intervals.** S2 uses normal-approximation 95% CIs on heavy-tailed draws (phase 1, m=2: [28.4, 327.8]). This makes the "entirely outside" rule lenient. Use percentile, bootstrap or median-based intervals.
2. **Haar draws.** 20 draws in phase-1 S2 are too few for these tails; the 100 in phase 2 are adequate for I_c.
3. **N_E coverage.** S2 tested only N_E=12. At N_E=8, m=1, the result is 33.8 [30.7, 36.9], above the band (genuine finite-size signal, N·I_c = 6.5). Show it.
4. **R_δ^Ψ.** Since the Ψ curve does not depend on N_E, R_δ^Ψ = N_E/m_δ^Ψ is proportional to N_E by construction, and N_E is not observable from the records.
5. **Helstrom measurement assumptions.** It assumes knowledge of the coupling and the pointer basis, and collective measurements on up to 6 qubits. The tie rule caused the hazy zig-zag. A local-measurement plus majority-vote control was not run.
6. **Classical records use half the gate's range.** I_c ∈ [0, 1], but classical records cap at 1/2; only entangled "records" reach 1.
7. **Bootstrap B is irrelevant to R₁₂.** Since C_eff = 1/2 throughout, say so in the text.
8. **Saturation bias.** Ψ̂ saturates about 8% low (0.218 vs 0.2375) because F < 1 for the rank-2 state. This bias sets the S1 ratios.
9. **Discord columns.** They are projective-measurement only, and D_S ≈ 0 is forced by decoherence. Frame them as Zwolak–Zurek χ-vs-accessible bookkeeping.
10. **Code hygiene.**
    - The `crt.functional` docstring has the `gate_kind` text spliced mid-line.
    - Three tests return values (PytestReturnNotNoneWarning). The asserts are present; all 25 tests pass in 5 s.
11. **Werner crossing.** The value is 0.7476, not 0.749 (corrected in the phase-2 report; confirmed here).
12. **Scope.** One N (1e4), qubit environments only, a single angle per configuration, no intra-environment dynamics.

## Numbers reproduced

| Quantity | Report | Referee | Method |
|---|---|---|---|
| I(S:F), π/4, N_E=12 | 0.601 / 0.812 / 0.909 / 0.957 / 0.983 / 1.000 / 1.017 / 1.043 / 1.091 / 1.188 / 1.399 / 2.000 | 0.6011 / 0.8118 / 0.9091 / 0.9571 / 0.9828 / 0.9998 / 1.0168 / 1.0426 / 1.0906 / 1.1878 / 1.3986 / 1.9996 | closed form h((1+c^N)/2)+h((1+c^m)/2)−h((1+c^(N−m))/2), checked by statevector SVD |
| I(S:F), π/8, N_E=8 | as tabled | exact match | same |
| m_δ^MI, 8 points | as tabled | match to 2 dp | crossing |
| P_e, q, I_rec, J_H at (π/4,3), (π/8,4), (π/6,5), (π/16,6) | as tabled | match to 4 dp | closed form and brute-force Helstrom |
| R12_∞ and J_H closed forms | stated | verified | algebra and brute force |
| Onset ratio, exact curves | 1.83 | 1.826 | root-finding |
| J_H at the gate threshold | 0.94–0.95 | 0.943 | algebra |
| I_v11 identity | stated | 2.2e-16 over 2000 states | direct |
| Werner crossing | 0.7476 | 0.7476 | root-finding |
| Scrambled I(S:F), π/2, N_E=8 | as tabled | within draw noise | 256×256 Haar unitaries |
| Scrambled I(S:F), π/2 and π/4, N_E=12 | as tabled | within draw noise | own branch-vector sampling |
| Exact N·I_c, scrambled N_E=12, m=1/2/3 (π/2; π/4) | 0.60/0.41/0.88; 0.54/0.51/0.83 | 0.45/0.50/1.06; 0.38/0.41/0.76 | same order, draw noise |
| Exact N·I_v11, same | 1.6/93.7/55.9; 1.6/105.5/58.3 | 1.5/113/64; 1.3/125/50 | very large spread; medians 1.1–2.4 |
| Horodecki: H, I, χ_ptr, χ_max, J(S\|E) | 0.9044, 0.9044, 0.1825, 0.7219, 0.5715 | identical | own code |
| c-maybe π/4 m=1: I, χ_ptr, J(S\|F) | 0.6011, 0.6009, 0.3992 | identical | own code |
| a_c, formula | 27.64 | 27.64 | formula |
| a_c, independent Monte Carlo | — | 27.60 ± 0.17 | own SIC sampler + LI-PSD |
| a_c, pipeline | 27.88 ± 0.21 | 27.86 ± 0.49 (fresh seeds); 27.16 ± 0.52 (authors' seeds, first 300) | released pipeline |
| v11 floor, same runs | 34.3 | 34.48 ± 0.51 | released pipeline |
| S1 cell π/4, m=3 | 0.3341 ± 0.0035; Ψ 0.1587 | identical | rerun from authors' seeds |
| C_eff | 1/2 | 1/2 in all 640 runs | pipeline |
| F range | — | 0.976–0.995 | JSON |

Seeds are documented and reproducible. Total referee compute was about 5 minutes.

## Claims the paper may make

- The v11-gate Ψ on joint records failed a pre-specified test, because it rewards record bias.
- The exact identity I_v11 = I_c + ½[I(ρ_A)+I(ρ_B)].
- Under the post-hoc I_c gate, Ψ = D̂·C_eff·F·I(r_A:r_B)/2. For conditionally i.i.d. records in product c-maybe environments it is monotone in the Helstrom error, so R_δ^Ψ is an accessible-information redundancy at J_H ≈ 0.943 bit (state as a lemma with its conditions).
- For this pipeline the floor is a_c/N with a_c = 27.64 (derived) and 27.9 ± 0.2 (calibrated); it is bias-dependent (31.9 at p = 0.3).
- S2 under I_c is a passed consistency check, predicted from phase 1.
- No discord gap exists in these models, and none can exist for classical-quantum ρ_SF given χ ≤ T (to be proved or cited).

## Claims the paper must not make

- That Ψ (v11 or v12) is a witness or certificate of objectivity, or detects Quantum Darwinism.
- That v12 was validated by pre-registered tests.
- That S1 had "10 passes" as independent evidence.
- That the monotone relation to J_H is an empirical finding, or that it holds beyond conditionally independent records.
- That F measures agreement between observers.
- That Ψ adds operational value through finite-count estimability, without the comparison to the classical baseline.
- Any novelty for consensus or redundancy, the scrambled control, the χ-vs-accessible gap, or Helstrom redundancy, without the citations in issue 5.
- Any v11 quantitative result as applying to Ψ_v12.

Sources: [Touil, Yan & Zurek 2025](https://arxiv.org/pdf/2503.14791) · [Zwolak, Riedel & Zurek 2014](https://arxiv.org/pdf/1312.5373) · [Touil et al. 2022](https://arxiv.org/pdf/2107.00035) · [Zwolak & Zurek 2013](https://arxiv.org/pdf/1303.4659) · [Zwolak, Quan & Zurek 2009](https://www.arxiv.org/abs/0904.0418) · [Blume-Kohout & Zurek 2006](https://arxiv.org/abs/quant-ph/0505031) · [Ollivier, Poulin & Zurek 2004](https://arxiv.org/abs/quant-ph/0307229) · [Brandão, Piani & Horodecki 2015](https://arxiv.org/abs/1310.8640v2) · [Korbicz et al. 2014](https://www.arxiv.org/pdf/1401.1712) · [Le & Olaya-Castro 2019](https://www.arxiv.org/pdf/1803.08936) · [Le & Olaya-Castro witness](https://ar5iv.arxiv.org/html/1908.08818) · [Korbicz review](https://quantum-journal.org/papers/q-2021-11-08-571/) · [Kiely et al.](https://arxiv.org/html/2510.12313) · [Tank](https://arxiv.org/abs/2509.17775)
