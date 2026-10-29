# CRT v11: released simulation code

This folder holds the code that produced every simulated number in CRT v11.0:
Appendix B.1, the V2 check, and the P2 and P3 results. It replaces the
unreleased "preliminary simulations" of v8.7 (Section 10.3 of the paper).

## Files

| File | What it is |
|---|---|
| `crt.py` | The library. Density-matrix tools (Uhlmann fidelity, von Neumann entropy in bits, informativeness, gate, full-rank regularization, PPT, concurrence), the 16-outcome product SIC-POVM, Born-rule sampling, the two reconstruction pipelines (linear inversion with Smolin-Gambetta-Smith projection; R rho R MLE), the convergence factor C_eff with Algorithm 1, D_hat, Psi and S_eff, and the Lueders instrument used for P3. |
| `run_all.py` | The driver. Runs stages A (B.1), B (V2), C (P2), D (P3) and writes `results/`. |
| `test_crt.py` | Unit tests. Includes the cross-check against the website calculator `app/theory/PsiCalculator.js`, which is executed with node on 206 single-qubit cases. |
| `results/results.json` | Every aggregated number, with all parameters. |
| `results/REPORT.md` | The same numbers as tables, with every parameter stated. |
| `results/p2.png`, `results/p3.png` | Figures for P2 and P3. |
| `results/run.log` | Console log of the run that produced the results. |

## How to run

Requirements: Python 3, numpy, scipy (matplotlib optional, for the two
figures; node optional, for the JS cross-check). Tested with Python 3.13,
numpy 2.5.3, scipy 1.18.1, matplotlib 3.11.2, node 22.

```
cd paper/sim
python3 test_crt.py            # unit tests, a few seconds
python3 run_all.py             # full run, about 10 to 15 minutes on 2 CPUs
python3 run_all.py --quick     # smoke test, about 30 s (writes *_quick files)
```

The committed results were produced by exactly `python3 run_all.py` with the
master seed `MASTER_SEED = 20261029` (set in `run_all.py`) and 2 worker
processes. Each simulated experiment gets the seed
`(20261029, stage, item, replicate)`, passed to `numpy.random.SeedSequence`,
and spawns separate child streams for batch A, batch B, the cross-validation
split, the bootstrap, and the MLE random starts. Results therefore do not
depend on the number of workers. Floating-point results may differ in the last
digits across BLAS builds.

## What the code computes, and the choices it makes

The paper fixes eps, delta_reg, eta, H_min, tau, d, the POVM and N. The
following were not fixed by the paper and are choices made here; every one is
also listed in `results/REPORT.md`.

1. **Pipelines.** Pipeline 1 is linear inversion through the SIC dual frame
   followed by the Smolin-Gambetta-Smith projection to the nearest density
   matrix (2-norm), applied to batch A. Pipeline 2 is R rho R MLE started from
   I/4 (stop when the Frobenius step falls below 1e-11, at most 20000
   iterations), applied to batch B. Batches A and B each hold N = 1e4 counts
   and are independent multinomial draws (the disjoint time-interleaved
   batches of Section 9.1). The B.1 caption says "MLE reconstruction", so B.1
   is also reported with both pipelines MLE.
2. **Models for C_eff.** The same two estimators are the n = 2 models. Per
   Section 9.2 Step 2 they are applied to the pooled data A + B (2N counts).
   Model i predicts P_i(k) = Tr(E_k rho_i~), with rho_i~ regularized.
3. **Weights.** LL_i is the 5-fold cross-validated held-out log-likelihood
   in nats: the pooled counts are split at random into 5 folds, model i is
   fitted on 4 folds, and LL_i sums n_k(held out) ln P_i(k) over the 5 folds.
   Weights are softmax(LL / tau), tau = 1.
4. **JSD.** Eq. 8 in bits, evaluated in the identical form
   sum_i w_i KL(P_i || P_mix) to avoid cancellation at small values.
5. **Algorithm 1, reduced.** B = 20 bootstrap iterations instead of 1000 (for
   runtime). There is one measurement setting (a single 16-outcome POVM), so
   the "block bootstrap per POVM setting block" is a multinomial resample of
   the pooled counts. Edges use the strict test JSD(P_i, P_j) < max(delta_i,
   delta_j), and n_unique is the number of connected components.
6. **Two readings of Algorithm 1 step 1.** The text says each bootstrap
   iteration resamples the data once and runs "two independent tomographic
   reconstructions with different starting seeds", which measures only
   estimator-internal variability. It also says delta_i "captures the
   combined spread from sampling variability and estimator stochasticity".
   These conflict, so both are implemented:
   - `literal`: one resample, two runs of family i from two random starts.
     For LI (no starting point) delta_LI = 0 exactly; for converged MLE,
     delta_MLE is about 1e-17 (round-off).
   - `sampling` (primary): two independent resamples, each reconstructed by
     family i from a random start; delta_i is about 3e-4 to 7e-4 bits at N = 1e4.

   The literal reading is not usable as a primary rule. For any state whose
   linear-inversion estimate is already positive, LI equals the MLE exactly
   (for a minimal IC-POVM the LI estimate reproduces the observed
   frequencies). The edge test then compares one round-off number with
   another, so n_unique flips between 1 and 2 at random, and Psi jumps by a
   factor of 2 from run to run and within the delta_reg sweep. Both readings
   are reported in B.1.
7. **D_hat** is fixed at 0.95 (D = 1900, D_ref = 100 counts per window,
   D/D_ref = 19) in every study here, because B.1, V2, P2 and P3 concern the
   state, not the detector.
8. **Named separable state (B.1):** (|00><00| + |11><11|)/2, the fully
   dephased Bell state: separable, S = 1 bit, I = 0.5, purity 0.5.
9. **V2 states:** I/4, and the thermal product state sigma (x) sigma with
   sigma = diag(0.51, 0.49).
10. **P2 controls.** `diag`: the Werner spectrum placed on the diagonal in
    the computational product basis. This is a mixture of product states, so
    it is separable, and it has the same spectrum, so purity and entropy match
    exactly. `rotdiag`: the same state rotated by a fixed Haar-random local
    unitary. Separability is checked by PPT. Product states rho_A (x) rho_B
    cannot match both purity and entropy for 0.10 <= p <= 0.95 (shown in the
    report).
11. **P3.** O1 = sigma_z and O2 = sin(theta) sigma_x + cos(theta) sigma_z,
    both acting on qubit A, with ||O||_inf = 1. Unsharp Lueders instruments
    have gamma = 0.5 and m = 2. The initial state is |psi_A><psi_A| (x) I/2
    with Bloch(psi_A) = (1, 0, 1)/sqrt(2). rho12 means O1 first, then O2. The
    commutator norm is the operator 2-norm, ||[O1, O2]|| = 2 sin(theta).

## Runtime

About 10 to 15 minutes in total on 2 CPUs (see `results/run.log` and
`params.stage_times_s` in `results/results.json`). Seeds per point: B.1 20,
V2 20, P2 30 per p per family, P3 300 per theta per order.
