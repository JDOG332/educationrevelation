"""
run_v12d.py: CRT v12, phase 4. How close can observers who hold part of
the environment get to what the whole environment holds, and how does the
remaining deficit behave?

THIS FILE IS A PRE-REGISTRATION ONLY. No phase-4 code exists yet and no
phase-4 quantity has been computed. The implementation will be appended
below this docstring in a later commit; this docstring will not be edited
after the pre-registration commit (corrections, if any, go in the report).
The commit is local on branch paper-v12; until it is pushed (branch or tag),
its only timestamp is the commit order (see referee_v12/REPORT.md, issue 8).

Thesis line under test (the author's third line): "it can never be complete,
because no part holds the whole and the whole cannot see itself."
Only measurable restatements of this line are tested (Section 7). Nothing
here tests pure awareness, consciousness, or any metaphysical claim (Section 9).

Context: phases 1 to 3 (run_v12.py, run_v12b.py, run_v12c.py) and the
referee reports referee_v12/REPORT.md and referee_v12c/REPORT.md. The
referees found that earlier phases reduced to known quantum Darwinism
(Touil, Yan & Zurek 2025), and they listed what not to repeat: tests whose
answers can be derived in advance but are presented as findings; grids so
narrow that a pass is a coincidence of the grid; lenient tolerances; and
novelty claims made without a literature check. Every test below is labelled
DERIVABLE (the answer follows from a stated argument; passing is a code check)
or OPEN (the author of this code cannot derive the outcome). Out-of-grid
robustness is pre-registered (Section 6, R).

=============================================================================
0. What is already known (literature search, 2026-10-30; not exhaustive)
=============================================================================
K1 Deficit law for independent environments: exponential in fragment size,
   rate = quantum Chernoff information. For pure-decoherence Hamiltonians
   with a product initial state and environment components that do not
   interact (identical or not), the missing information about the pointer
   decays exponentially in fragment size. The rate is the typical quantum
   Chernoff information xi_QCB of single components:
       R_delta ~ N xi_QCB / ln(1/delta).
   For i.i.d. components the information rate r obeys xi_QCB <= r <= 2 xi_QCB.
   Sources:
     - Zwolak, Riedel & Zurek, PRL 112, 140406 (2014), arXiv:1312.5373.
     - Zwolak, Riedel & Zurek, Sci. Rep. 6, 25277 (2016), arXiv:1603.01916:
       spin environments with self-Hamiltonians, including oscillatory
       redundancy.
     - Zwolak, Entropy 24, 781 (2022), arXiv:2206.02805. For pure branches,
       the Chernoff bound, chi(S_Pi:F) and chi(S:F_Pi) all approach the
       plateau with the same exponent xi = -ln|gamma|^2 (gamma the
       decoherence factor). They differ only in prefactors.
   For the c-maybe model this is a closed form: with equal priors,
       chi(S_Pi:F) = h((1 + |gamma_F|)/2),   |gamma_F| = prod_{k in F} |cos theta_k|,
   so the chi-deficit is an exact function of x(F) = sum_k xi_k (Section 1, D0).
   Status: KNOWN, including the "rescale by a rate and collapse" statement,
   for every product (non-interacting, pure-decoherence) environment.
K2 Hazy and mixed environments lower the redundancy, roughly as (1 - h) for
   very hazy environment qubits; the deficit still enters only through
   ln(1/delta). Sources:
     - Zwolak, Quan & Zurek, PRL 103, 110402 (2009), arXiv:0904.0418.
     - Zwolak, Quan & Zurek, PRA 81, 062110 (2010), arXiv:0911.4307.
   Riedel & Zurek, PRL 105, 020404 (2010), give huge redundancy for scattered
   photons.
K3 Quantum (mutual-information) deficit for pure global states: KNOWN and
   elementary. Antisymmetry I(S:F) + I(S:F-bar) = 2 S(rho_S) (Blume-Kohout &
   Zurek, PRA 73, 062310 (2006), arXiv:quant-ph/0505031; Zurek, Nat. Phys. 5,
   181 (2009)). Any fragment short of all of E therefore misses exactly
   I(S:F-bar) of the 2 S(rho_S) bits the whole holds. In a Darwinian state
   that is about H_S whenever F-bar is not tiny. Haar-random states carry no
   information in fragments below half (Blume-Kohout & Zurek 2006; Page
   curve).
K4 Generic channels: Brandão, Piani & Horodecki, Nat. Commun. 6, 7908 (2015),
   arXiv:1310.8640. For any channel S -> E_1..E_n, all but a delta fraction of
   the fragments see a channel within eps of measure-and-prepare with one
   common POVM, eps <= (27 ln2 d^6 log d / (n delta^3))^(1/3) (times t^(1/3)
   for t-site fragments). Fragments can share only classical information.
   This is a bound, with no deficit law.
K5 Interacting and structured environments, which are qualitative or give
   model-specific exponents:
     - Riedel, Zurek & Zwolak, NJP 14, 083010 (2012), arXiv:1205.3197:
       weak intra-environment couplings make redundancy rise, then fall to
       the random-state value.
     - Campbell, Cakmak, Mustecaplioglu, Paternostro & Vacchini, PRA 99,
       042103 (2019), arXiv:1901.03335: collision models, Darwinistic versus
       encoding.
     - Lampo, Tuziemski, Lewenstein & Korbicz, PRA 96, 012120 (2017),
       arXiv:1702.08427: spin-boson model.
     - Ferte & Cao, PRA 109, 032226 (2024), arXiv:2305.03694, and
       arXiv:2312.04284: QD-encoding transitions on trees, with mean-field-
       compatible behaviour and no cross-model collapse claim.
     - Cao & Nussinov, arXiv:2603.15743 (2026): with energy as the only
       conservation law, thermalizing environments keep a redundancy plateau
       when the branches have different energy densities and "encode" when
       they do not. Their bound decays at least exponentially in the
       fragment fraction, with a model-specific exponent from
       large-deviation rate functions. No universal curve is claimed.
K6 Consensus between observers in c-maybe models: Touil, Yan & Zurek,
   arXiv:2503.14791 (2025). Accessible information against Holevo: Touil
   et al., PRL 128, 010401 (2022), arXiv:2107.00035. When records are
   conditionally i.i.d. given the pointer (product environments), the pooled
   record information of k observers is a binomial calculation.
K7 Self-measurement: Breuer, "The impossibility of accurate state
   self-measurements", Philos. Sci. 62, 197-214 (1995), doi:10.1086/289852.
   An observer cannot distinguish all states of a system that contains it
   (classical or quantum, deterministic or not). Related: Breuer, Synthese
   107, 1 (1996); Dalla Chiara, J. Phil. Logic 6, 331 (1977). The
   quantitative form used here (an observer O inside S+E distinguishing
   global states from its own marginal) is the Uhlmann/trace-distance
   bookkeeping of Section 5, T6, and it is derivable.
Finding, stated plainly:
  - KNOWN: the exponential deficit law and its collapse in the variable
    m * xi_QCB for product environments (K1, K2). Also known: the quantum
    deficit for pure states (K3), the generic classical-only sharing (K4)
    and the self-measurement impossibility (K7).
  - Apparently OPEN, in a narrow, numerical sense: whether a site-resolved
    local Chernoff rate, measured on single sites, still predicts the
    fragment deficit on a single shared curve when the environment is not a
    product. The cases are intra-environment hopping with symmetry
    breaking, collisional dynamics with memory or exchange, and partial
    scrambling. Equivalently: whether local rates stay additive under the
    correlations these dynamics create.
  - I found no paper that tests this collapse across structurally
    different non-product models. Cao & Nussinov (K5) give model-specific
    exponents and claim no collapse; Riedel et al. (K5) and Campbell et al.
    (K5) are qualitative.
  - This is a modest numerical question, not a deep open problem. It is
    open only in the sense that the author of this code cannot derive its
    outcome.

=============================================================================
1. Definitions (bits; S is qubit 0; E = sites 1..N_E; F is a subset of E)
=============================================================================
State: the pure global state |Psi(t)> of S+E. Pointer: sigma_z of S. S_Pi
denotes S measured in the pointer basis at the same time t, with
p_s = <s|rho_S|s>, H(S_Pi) = h(p_0), and branch vectors
|Psi_s> = (<s| (x) 1)|Psi> / sqrt(p_s).
D1 Pointer Holevo information of a fragment:
     chi(F) := chi(S_Pi : F) = S(sum_s p_s rho_{F|s}) - sum_s p_s S(rho_{F|s}),
   with rho_{F|s} = Tr_{E\\F} |Psi_s><Psi_s|. Computed on the smaller side.
   Each |Psi_s> is pure on E, so S(rho_{F|s}) = S(rho_{F-bar|s}). The global
   state is pure, so S(rho_F) = S(rho_{S F-bar}). Every entropy needs a
   matrix of dimension at most 2^(min(|F|, N_E - |F|) + 1).
D2 Information deficit relative to the whole environment (primary):
     delta_chi(F) := 1 - chi(F) / chi(E),        chi(E) = chi(S_Pi : E).
   "The whole" here is what all of E holds about the pointer. For a pure
   global state, chi(E) = S(rho_S), which is at most H(S_Pi). Best fragment
   of size m: delta_chi(m) := min_{|F| = m} delta_chi(F); f = m / N_E,
   m = 1..N_E - 1 ("short of all of E").
D3 Quantum deficit: delta_I(F) := 1 - I(S:F) / I(S:E), with I(S:E) = 2 S(rho_S).
D4 Accessible-information deficit: delta_J(F) := 1 - J_H(F) / chi(E), where
   J_H(F) = I(s : r) for the Helstrom record r on F (pointer-conditional
   states rho_{F|s}, priors p_s; tie rule helstrom_tiefix from run_v12b).
   J_H <= accessible information <= chi(F).
D5 Site-resolved local rate (the model-specific information-transfer rate):
     xi_k := -ln min_{0 <= c <= 1} Tr[rho_{k|0}^c rho_{k|1}^(1-c)]   (nats),
   the quantum Chernoff information between the two pointer-conditional
   states of the single site k. The fragment budget is x(F) := sum_{k in F} xi_k,
   and the scalar rate is xi-bar := mean_k xi_k. Here xi_k is capped at
   XI_MAX = 40 (orthogonal supports).
   Minimization: bounded Brent on c in [1e-9, 1 - 1e-9], since
   ln Tr rho0^c rho1^(1-c) is convex in c. Eigenvalues below 1e-14 are
   dropped from the support. For pure states the minimum is attained in the
   open interval and equals -ln|<a|b>|^2.
   The rate uses single sites only and never a multi-site fragment, so the
   collapse test is not circular.
D6 Secondary scalar rate, read from S alone:
     xi_dec := -ln(4 |<0|rho_S|1>|^2) / N_E.
   For the pure product c-maybe model this equals xi-bar exactly. It is
   reported only for pointer-conserving dynamics with p_0 = 1/2; otherwise
   <0|rho_S|1> mixes decoherence with precession.
D7 Reference curve (the product law, exact for pure c-maybe with equal
   priors):
     D_ref(F) := 1 - h((1 + e^(-x(F)/2)) / 2) / h((1 + e^(-x(E)/2)) / 2),
   with x(E) = sum over all sites. Asymptotically
   D_ref ~ e^(-x) / (2 ln 2): the slope in ln D_ref against x tends to -1.
D8 Consensus deficit for k observers pooling records. k disjoint fragments
   F_1..F_k of size m each (k*m <= N_E), one record bit each (Helstrom on F_i,
   or Local: sigma_z majority with a fair coin on ties, as in run_v12c):
     delta_cons(k, m) := 1 - I(s : r_1 ... r_k) / chi(E).
   Its conditional-independence counterpart delta_cons^ci uses the same
   single-record laws P(r_i | s), multiplied as if the records were
   independent given s.
D9 Self-measurement deficit (Breuer type). The global twin pair is
   |Psi_+-(t)> = U(t) (|0> +- |1>)/sqrt2 (x) |E_init>; the whole tells the two
   apart perfectly (they are orthogonal). An observer subsystem
   O subset of S+E, with |O| = f_O (N_E + 1) qubits, has
     D_O := (1/2) || rho_O^+ - rho_O^- ||_1,   delta_self(O) := 1 - D_O,
   and delta_self(f_O) := min over the evaluated O of that size.
   Fragment sets evaluated: exhaustive for N_E <= 10. For N_E = 12: all
   contiguous blocks, all complements of contiguous blocks, and 128
   uniformly random subsets per size (seeded). The minimum over a sampled set
   is an upper bound on the true minimum deficit, and this is disclosed in
   every N_E = 12 row.

=============================================================================
2. Limit checks (unit tests in test_v12d.py; derivable; all must pass
   before any study runs)
=============================================================================
L1 Pure c-maybe, equal priors, any theta_k: delta_chi(F) = D_ref(F) to 1e-10,
   for all F, at N_E = 8.
L2 CNOT (theta = pi/2):
   - delta_chi(F) = 0 for every non-empty F (one site holds the whole
     pointer fact);
   - delta_I(F) = 1/2 for every 1 <= |F| <= N_E - 1 (each proper fragment
     holds 1 of the 2 bits);
   - delta_I(E) = 0.
L3 Antisymmetry: I(S:F) + I(S:F-bar) = 2 S(rho_S) to 1e-10 in every
   pure-state model, at 20 random (F, t).
L4 Ordering and monotonicity:
   - J_H(F) <= chi(F) <= min(I(S:F), H(S_Pi));
   - chi(F) <= chi(F') whenever F is a subset of F';
   - delta_chi(E) = 0.
L5 Chernoff rate:
   - pure states: xi = -ln|<a|b>|^2;
   - identical states: xi = 0;
   - orthogonal states: XI_MAX;
   - hazy single sites: the Brent value matches a c-grid of step 1e-4 to 1e-6.
L6 Self-measurement:
   - pure c-maybe: D_O = prod_{k in E\\O} |cos theta_k| exactly for every O
     that contains S, and D_O = 0 for every O inside E;
   - pointer-conserving dynamics, any J: D_O = 0 for every O inside E;
   - D_{S+E} = 1.
L7 Chain reduction. The M2 Hamiltonian with J = 0, h_S = h_y = 0, Delta = 0
   (any b_z, any g_k) is a product of single-site pure branches. Then
   delta_chi(F) = D_ref(F) to 1e-9 (b_z adds site phases only).
   M4 with lambda = mu = 0 is c-maybe with theta = g tau, to 1e-10.
L8 Evolution accuracy: expm_multiply against full eigendecomposition at
   N_E = 8, max amplitude error < 1e-10 over the time grid.
L9 Consensus, product case: delta_cons = delta_cons^ci to 1e-10 (the records
   are conditionally independent).

=============================================================================
3. Models and parameter grids (fixed now)
=============================================================================
Initial state: S in cos(a)|0> + sin(a)|1>, with a = pi/4 (|+>, p_0 = 1/2)
unless stated; E in |0>^N_E unless stated.
M1 Product (c-maybe and variants). Reference class, DERIVABLE by K1, L1.
   theta in {pi/16, pi/8, pi/6, pi/4, pi/3, 3pi/8, 7pi/16}, N_E in {8, 12}.
   Variants:
   (a) homogeneous pure;
   (b) inhomogeneous pure, theta_k = theta (1 + 0.5 (2u_k - 1)), u_k uniform,
       20 draws;
   (c) hazy, each site starting in (1 - h)|0><0| + h I/2 with
       h in {0.1, 0.3, 0.6}. The global state is mixed, so the pure-state
       shortcuts of D1 and D3 and checks L3 and L6 do not apply. rho_{F|s}
       is a product of mixed single-site states, and chi(F) is computed
       directly from it. delta_I is not reported for this variant.
   (d) unequal priors, p_0 in {0.8, 0.95} (homogeneous pure).
M2 Spin chain with intra-environment hopping (run_v12c E4, extended and
   symmetry-broken):
     H = sum_k g_k |1><1|_S (x) sigma_y^k
         + (J/2) sum_{k=1}^{N_E - 1} (X_k X_{k+1} + Y_k Y_{k+1})
         + Delta sum_k Z_k Z_{k+1} + b_z sum_k Z_k
         + h_S sigma_x^S + h_y sigma_y^S.
   Grid:
     - N_E in {8, 10, 12};
     - J in {0, 0.5, 1, 2};
     - h_S in {0, 0.25, 0.75};
     - g_k: homogeneous g_k = 1, or inhomogeneous g_k = 1 + 0.3 eta_k with
       eta_k ~ N(0, 1), drawn once per N_E from the seed stream and stored;
     - symmetry-breaking variant V in:
         V0 none;
         VA h_y = 0.25, b_z = 0.3 (breaks the reciprocity/chiral identity
            found by the phase-3 referee);
         VB Delta = 0.5 (breaks the free-fermion structure of the XY
            chain);
         VC VA + VB.
   3 x 4 x 3 x 2 x 4 = 288 cells, times t in {0.25, 0.5, ..., 4.0} (16
   points).
   Evolution: scipy.sparse.linalg.expm_multiply on the time grid (check L8).
   Derivable cells (L7, excluded from the open counts): J = 0, h_S = 0, V0,
   for both g_k options and all three N_E: 6 cells. (VA also sets h_y, so
   it is open even at J = h_S = 0.)
M3 Partially scrambled environment: the c-maybe state, then a brickwork
   circuit of Haar-random two-qubit gates on E (open boundary).
     - theta in {pi/8, pi/4, 3pi/8};
     - depth d in {1, 2, 3, 4, 6, 8};
     - N_E in {8, 10, 12};
     - 50 circuit draws per cell.
   Controls: d = 0 is the c-maybe state (derivable). Full Haar on E (phase-1
   exact branch sampling, v1.scrambled_psi) at theta in {pi/4, pi/2}, with
   100 draws, is the DERIVABLE negative control: chi(F) is near 0 for
   |F| < N_E/2 (K3).
M4 Collisional model with memory and exchange (repeated interactions; Ciccarello, Palma &
   Giovannetti, PRA 87, 040103(R) (2013); Ciccarello et al., Phys. Rep. 954,
   1 (2022); Campbell et al. 2019, K5). S collides with ancillas
   E_1, E_2, ..., E_N in order. Collision k is
     U_k = exp(-i [ g tau |1><1|_S (x) Y_k + (lambda tau / 2)(X_S X_k + Y_S Y_k) ]),
   where the exchange term lambda does not conserve the pointer. After
   collision k and before collision k+1, ancilla E_k collides with E_{k+1} by
   a partial swap exp(-i mu SWAP_{k,k+1}), which gives memory. The state is
   evaluated after all N collisions.
   Grid:
     - N_E in {8, 10, 12};
     - g tau in {pi/16, pi/8, pi/4, 3pi/8};
     - lambda tau in {0, 0.15, 0.4};
     - mu in {0, pi/8, pi/4}.
   108 cells. Derivable cells: lambda = mu = 0 (L7), 12 cells.
"Structurally different": M2 is continuous-time with simultaneous coupling
to every site and Hamiltonian transport inside E. M3 is a discrete random
circuit that spreads records. M4 is time-ordered, with each site imprinted
once and memory only between neighbours in the collision sequence.

=============================================================================
4. Estimators and statistics
=============================================================================
Every primary quantity is exact: statevectors, exact partial traces and
entropies. There is no shot noise in T1 to T4 or T6. The only randomness
comes from the M1(b) draws, the M2 g_k draws, the M3 circuit draws, the full
Haar draws, the random fragment subsets at N_E = 12, and the finite-count
part of T5.
Intervals:
  - percentile intervals (2.5 and 97.5) over draws, for any statistic
    defined per draw;
  - for pass fractions over cells, a percentile bootstrap over cells
    (B = 2000). This interval describes sensitivity to the grid, not
    sampling of a population, and is reported as such.
Finite counts (T5 only):
  - N_shots = 1e4 per point; plug-in and Miller-Madow mutual informations;
  - percentile bootstrap over shots, B = 1000;
  - a permutation test of conditional independence of the records given s
    (permute r_i within s-strata; 2000 permutations; statistic I(r_1:r_2|s)).
Permutation test, T3b: model labels permuted within x-bins (10^4
  permutations). The statistic is the between-model variance of the log
  residuals. This test is secondary, since the curves are deterministic and
  the verdict uses effect-size tolerances.
Seeds: SeedSequence((MASTER_SEED_V12D = 20261104, study, item..., replicate)),
  disjoint from phases 1 to 3 (20261101 to 20261103).
Reuse:
  - run_v12: entropies, _matricize, reduced_dm_pure, scrambled_psi,
    branch_vectors, haar_vec, rot;
  - run_v12b: helstrom_tiefix;
  - run_v12c: _pauli_on, e4_hamiltonian (extended for Delta, b_z, h_y, g_k),
    local_majority_pi0, info_xab and _Hc;
  - crt: mutual_information_bits, vn_entropy_bits.
Budget: under 3 hours on 2 CPUs. The pre-stated fallback, used only if a
dry run of 5% of the cells extrapolates above 3 hours, is to use every
other time point at N_E = 12 in M2. The fallback is disclosed if used.

=============================================================================
5. Tests
=============================================================================
T1 [DERIVABLE] Strict positivity, and where it fails. This is the
   "no part holds the whole" line in its weakest measurable form.
   Checks:
     (a) delta_I(F) > 0 for every proper F, in every model with S(rho_S) > 0
         (K3: the missing part is I(S:F-bar) > 0, unless F-bar is
         uncorrelated with S);
     (b) delta_chi(F) = 0 exactly for M1 at theta = pi/2, with |F| >= 1;
     (c) delta_chi(F) > 0 for all proper F in every cell with all
         xi_k < XI_MAX (non-orthogonal branches).
   Verdict: PASS or FAIL. This is a code check; it carries no evidence about
   the thesis beyond the derivation.
T2 [DERIVABLE asymptotically, finite-m check] The product class follows the
   product law.
     (a) M1(a): L1 identity.
     (b) M1(b, c, d): criteria C1 and C2 of T3 applied to the product class.
   Expected:
     - (b) inhomogeneous: C1 and C2 pass, since the law is exact in x(F);
     - (c) hazy: C2 passes. C1 may fail by a prefactor (ZRZ: r lies between
       xi and 2 xi), and the author does not know the finite-m outcome;
     - (d) unequal priors: C2 passes and C1 fails, because the prefactor
       depends on p_0 (derivable from the two-pure-state spectrum).
   T2(d) failing C1 while passing C2 is a pre-stated check that the two
   criteria discriminate. Verdict: PASS if (a) holds and (d) behaves as
   stated; the (b, c) outcomes are reported.
T3 [OPEN, primary] Does the deficit, rescaled by the local rate, collapse
   onto one shared curve across structurally different models?
   Models counted: M2 and M4, open cells only, both observer-free (exact
   delta_chi). M3 is reported separately as T3c.
   Eligibility:
     - for a state (cell, time): chi(E) >= 0.5 bit;
     - for a fragment F of that state: 1e-4 <= delta_chi(F) <= 0.5 and
       x(F) >= 0.05;
     - a state is eligible if it has at least 10 eligible fragments; a cell
       is eligible if it has at least 3 eligible states.
     - all evaluated fragments of every size m = 1..N_E - 1 are used, not
       only the best one.
   Residual r(F) := ln[ delta_chi(F) / D_ref(F) ]. Per state:
     C1 (collapse, no free parameter): q95(|r|) <= ln 1.25.
     C2 (collapse up to a prefactor): q95(|r - median r|) <= ln 1.25.
   A cell passes Ck if at least 80% of its eligible states pass Ck.
   Pre-stated outcomes, per model (M2, M4) and overall:
     COLLAPSE: in each of M2 and M4, at least 90% of eligible open cells
       pass C1.
     COLLAPSE UP TO PREFACTOR: not COLLAPSE, but at least 90% pass C2 in
       each model.
     NO COLLAPSE (the pre-stated alternative H_alt): in at least one of M2,
       M4, fewer than 50% of eligible open cells pass C2. The local rates
       then do not determine the deficit. The sign of the median r is
       reported:
         r < 0, superadditive: fragments hold more than their sites'
           rates predict (multi-site encoding);
         r > 0, subadditive: sites hold overlapping, correlated records.
     PARTIAL: anything else.
     INCONCLUSIVE: a model with fewer than 10 eligible open cells.
   T3b [OPEN, secondary] A shared curve other than D_ref. Bin x into widths
     of 0.25 over [0.05, 10]. In each bin, take the median ln delta_chi per
     model (M2, M4, and M1(a) as the reference).
     SHARED CURVE if, in at least 80% of the bins with two or more models,
     max minus min of the model medians is at most ln 1.5. Otherwise NOT
     SHARED. The permutation p-value is reported alongside.
   T3c [OPEN, secondary] Depth crossover in M3. Per (theta, N_E, d), apply
     C2 per draw. The pass fraction over the 50 draws comes with a percentile
     bootstrap interval. d* is the smallest depth at which the pass fraction
     falls below 50%.
     Author's prior (stated, not a verdict): d* <= 3, with r < 0
     (superadditive), because scrambling builds multi-site encodings.
     Reported per (theta, N_E), with the full-Haar control alongside.
   T3s [secondary] The scalar version: x = m * xi-bar (and m * xi_dec for
     pointer-conserving cells), with the best-fragment deficit
     delta_chi(m). It uses C1 and C2 on homogeneous cells only. Reported,
     no verdict.
   Why T3 cannot be derived in advance:
     - In M2 with J > 0, the s = 1 branch is entangled across E. In M4 with
       mu > 0, ancillas share the record. With h_S, h_y or lambda nonzero,
       the pointer is not conserved. In all of these cases rho_{F|s} is not
       a product of single-site states, and chi(F) is not a function of the
       sum of single-site Chernoff rates.
     - Neither the sign nor the size of r is known to the author, except
       for the M3 prior above.
T4 [OPEN, secondary] A structural floor: does the best-fragment deficit
   vanish as fragments grow, or level off? This is the strong measurable
   form of "never complete".
   Quantity: delta_half(N_E) := delta_chi(m = N_E/2), compared across
   N_E in {8, 10, 12} at fixed model parameters and time.
   Counted cells: open cells of M2, M3 and M4. M2 and M4 are evaluated per
   (cell, t) or per final state; M3 uses the median over draws. A cell is
   eligible if chi(E) >= 0.5 bit at all three N_E.
   Per eligible cell and time:
     FLOOR if delta_half(12) >= 0.05 and delta_half(12) >= 0.8 delta_half(8);
     DECAY if delta_half(12) < 0.01, or delta_half(12) <= 0.5 delta_half(8);
     UNDECIDED otherwise.
   A cell is FLOOR (or DECAY) if at least 2/3 of its eligible times are.
   Also reported, with no verdict: the last-fragment deficit
   delta_chi(m = N_E - 1) and its N_E dependence.
   Author's prior: DECAY for pointer-conserving cells (h_S = h_y = 0 in M2;
   lambda = 0 in M4), consistent with Cao & Nussinov (K5). Unknown for
   non-conserving cells, whose records are of past pointer values.
T5 [OPEN in part, secondary] Consensus deficit. Configurations:
     - k in {1, 2, 3, 4, 6} observers, m in {1, 2}, k*m <= N_E;
     - fragments are contiguous blocks starting at site 1, adjacent;
     - both observer types;
     - models M1(a) at theta in {pi/8, pi/4}; M2 at N_E = 10, J in {0.5, 2},
       h_S in {0, 0.25}, VC, t in {1, 2, 3}; M4 at N_E = 10,
       g tau = pi/8, lambda tau in {0, 0.4}, mu in {0, pi/4}.
   Parts:
     - DERIVABLE: M1 gives delta_cons = delta_cons^ci (L9).
     - OPEN: H5 holds if |ln(delta_cons / delta_cons^ci)| <= ln 1.25 at
       least 90% of the eligible M2 and M4 points (0.001 <= delta_cons <= 0.9).
       Verdict SUPPORTED or NOT SUPPORTED. A failure means pooling
       correlated records does not follow the independent-record law.
     - Finite counts, no verdict: estimates with intervals at every point,
       and the conditional-independence permutation test.
T6 [DERIVABLE, with a descriptive part] Self-measurement deficit, the "the
   whole cannot see itself" line.
     (a) L6 identities, a code check: in pointer-conserving dynamics, an
         observer inside E is blind to the global phase (D_O = 0). In the
         product model, an observer that contains S but misses the sites
         E\\O has D_O = prod_{k not in O} |cos theta_k|, so its deficit
         grows exponentially with what it misses.
     (b) A bound, a code check. Since 1/2||rho - sigma||_1 is at most
         sqrt(1 - F^2), and by Uhlmann
         F(rho_O^+, rho_O^-) = max over unitaries V on the complement of
         |<Psi_+| 1_O (x) V |Psi_->|,
         1 - D_O >= 1 - sqrt(1 - F^2) must hold in every model. It is
         checked with F computed directly from the fidelity of the
         marginals.
     (c) Descriptive: the curves delta_self(f_O) for M2, M4, M3. The
         author's prior is delta_self(f_O) >= 0.5 for every f_O <= 1/2 in
         every model. Reported as holding or failing, not as evidence.

=============================================================================
6. Robustness grid (pre-registered; evaluated after the main verdicts,
   same rules, same code)
=============================================================================
R  M2: N_E = 10 with N_E = 8 and 12 for T4; J in {0.75, 1.5, 3}; h_S in
   {0.5, 1.0}; VC; homogeneous g; t in {0.25, ..., 6.0} (24 points).
   M4: g tau in {pi/5, pi/3}; lambda tau in {0.25, 0.6}; mu in {pi/6, pi/3};
   N_E in {8, 10, 12}.
   Sensitivity, no verdict: T3 at tolerances ln 1.15 and ln 1.5; T3 with the
   eligibility window [1e-5, 0.5] and [1e-3, 0.3].
   A T3 or T4 verdict is called ROBUST only if the robustness grid gives the
   same verdict category under the same rule. Otherwise it is reported as
   grid-dependent, with both outcomes and both grids stated. (Phase 3's H4
   passed inside its grid and failed just outside it; this rule guards
   against that.)

=============================================================================
7. What counts for and against the "never complete" line (stated in advance)
=============================================================================
Three measurable forms, in increasing strength:
  W (weak, strict positivity: "no proper part holds exactly all of it").
    Settled by derivation (T1). It is true for the quantum content of a pure
    global state (K3). It is false for the classical pointer fact in ideal
    models (theta = pi/2: one site holds it exactly). It is generically true
    but exponentially small otherwise. W can neither support nor refute the
    thesis as a finding, because it is a known theorem.
  S (strong, structural floor: "parts do not approach the whole even as
    they grow"), tested by T4.
    - SUPPORTS the line in this measurable form if FLOOR holds in at least
      50% of eligible open cells in at least two of M2, M3, M4 (and is
      ROBUST).
    - REFUTES the line in this measurable form if DECAY holds in at least
      90% of eligible open cells in every one of M2, M3, M4, and no model has
      more than 10% FLOOR cells (and is ROBUST). Finite parts then become
      effectively complete about what the whole holds, and the line survives
      only as W.
    - MIXED otherwise. The pointer-conserving and non-conserving cells are
      then reported separately.
  L (lawfulness of the remaining deficit), tested by T3.
    T3 does not decide the thesis by itself. It decides whether the
    deficit, whatever its size, is governed by one local rate across
    models.
    - COLLAPSE or COLLAPSE UP TO PREFACTOR: the deficit is the known
      Chernoff law extended beyond product environments. Incompleteness is
      then exponentially small, set by local imprinting, and counts against
      any reading of "never complete" stronger than W.
    - NO COLLAPSE with r < 0 (superadditive): the whole holds what no
      collection of local parts predicts. This is consistent with the
      spirit of "no part holds the whole" in a measurable sense. It is
      still not evidence for it unless T4 also finds a floor.
    - NO COLLAPSE with r > 0: records are redundant beyond the local law.
      This counts against the line.
"The whole cannot see itself", measurable form, T6: settled by derivation.
Any proper observer subsystem is blind to global phase information in
proportion to the overlap of what it misses; the whole is not blind. It is
a code check, not a finding.
Pre-stated summary sentence, filled in from the verdicts:
  "In these models the measurable deficit is [W true by theorem]; [S:
  SUPPORTED / REFUTED / MIXED]; [L: COLLAPSE / UP TO PREFACTOR /
  NO COLLAPSE (sign) / PARTIAL / INCONCLUSIVE]; robustness [ROBUST /
  grid-dependent]."

=============================================================================
8. Failure conditions for the code (any one stops the analysis)
=============================================================================
Any of L1 to L9 fails; the T1 or T6(b) checks fail; chi(E) and S(rho_S)
differ by more than 1e-9 on any pure state; the max-over-subsets value at
N_E = 10 differs from the brute-force value on 5 spot checks.

=============================================================================
9. What this phase can NOT say
=============================================================================
- Nothing about pure awareness, consciousness, observers as subjects, or
  any metaphysical whole. "Whole" means all of E (or S+E for T6) in finite
  qubit models; "part" means a subset of qubits; "see" means
  distinguishability or Holevo information. That is all.
- Nothing about the actual universe. The environments are N_E <= 12 qubits,
  one fixed pointer basis, a few Hamiltonians, and exact model-based
  quantities (the observers are assumed to know the pointer-conditional
  states).
- T1, T2 and T6 are known or derivable results. They will be presented with
  their derivations and citations, not as findings.
- A T3 collapse would extend a known law (K1) numerically to a few
  non-product models. It would not be a new principle, and it would be
  evidence only within the stated grids and tolerances.
- No novelty is claimed for the deficit, redundancy, consensus or
  self-measurement quantities; all are in the literature of Section 0.
"""

# =============================================================================
# Implementation (appended after the pre-registration commit 0170e16, which was
# pushed to GitHub on branch paper-v12 at 2026-10-30T20:56:47Z before any of
# this code was written; the docstring above is unchanged).
# Implementation choices not fixed by the docstring are listed in IMPL_CHOICES
# and repeated in REPORT_phase4.md.
# =============================================================================

from __future__ import annotations  # noqa: E402

import argparse  # noqa: E402
import itertools  # noqa: E402
import json  # noqa: E402
import math  # noqa: E402
import os  # noqa: E402
import platform  # noqa: E402
import sys  # noqa: E402
import time  # noqa: E402
from multiprocessing import Pool  # noqa: E402

import numpy as np  # noqa: E402
import scipy  # noqa: E402
import scipy.sparse as sp  # noqa: E402
from scipy.linalg import expm  # noqa: E402
from scipy.optimize import minimize_scalar  # noqa: E402
from scipy.sparse.linalg import expm_multiply  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import crt  # noqa: E402
import run_v12 as v1  # noqa: E402
import run_v12c as v3  # noqa: E402
from run_v12b import helstrom_tiefix  # noqa: E402

MASTER_SEED_V12D = 20261104
OUT = os.path.join(HERE, "results", "v12")
LN2 = math.log(2)
XI_MAX = 40.0
WIN = (1e-4, 0.5)          # fragment eligibility window for delta_chi (T3)
WIN_KEEP = (1e-5, 0.5)     # superset kept for the sensitivity windows
X_MIN = 0.05
MIN_FRAG = 10
MIN_STATES = 3
TOL = math.log(1.25)
CELL_PASS = 0.8
N_RAND = 128
B_CELLS = 2000

PX, PY, PZ = crt.PAULI["X"], crt.PAULI["Y"], crt.PAULI["Z"]
P1 = np.diag([0.0, 1.0]).astype(complex)
I2 = np.eye(2, dtype=complex)
SWAP = np.array([[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]], complex)

# --- grids (Section 3) ---
M1_THETAS = {"pi/16": math.pi / 16, "pi/8": math.pi / 8, "pi/6": math.pi / 6, "pi/4": math.pi / 4,
             "pi/3": math.pi / 3, "3pi/8": 3 * math.pi / 8, "7pi/16": 7 * math.pi / 16}
M1_N = (8, 12)
M1_HAZE = (0.1, 0.3, 0.6)
M1_P0 = (0.8, 0.95)
M1_DRAWS = 20
M2_N = (8, 10, 12)
M2_J = (0.0, 0.5, 1.0, 2.0)
M2_HS = (0.0, 0.25, 0.75)
M2_G = ("hom", "inh")
M2_V = {"V0": dict(hy=0.0, bz=0.0, Delta=0.0), "VA": dict(hy=0.25, bz=0.3, Delta=0.0),
        "VB": dict(hy=0.0, bz=0.0, Delta=0.5), "VC": dict(hy=0.25, bz=0.3, Delta=0.5)}
M2_T = tuple(0.25 * k for k in range(1, 17))
M3_THETAS = {"pi/8": math.pi / 8, "pi/4": math.pi / 4, "3pi/8": 3 * math.pi / 8}
M3_D = (1, 2, 3, 4, 6, 8)
M3_N = (8, 10, 12)
M3_DRAWS = 50
HAAR_THETAS = {"pi/4": math.pi / 4, "pi/2": math.pi / 2}
HAAR_DRAWS = 100
M4_N = (8, 10, 12)
M4_GT = {"pi/16": math.pi / 16, "pi/8": math.pi / 8, "pi/4": math.pi / 4, "3pi/8": 3 * math.pi / 8}
M4_LT = (0.0, 0.15, 0.4)
M4_MU = {"0": 0.0, "pi/8": math.pi / 8, "pi/4": math.pi / 4}
# --- robustness grid (Section 6) ---
R2_J = (0.75, 1.5, 3.0)
R2_HS = (0.5, 1.0)
R2_T = tuple(0.25 * k for k in range(1, 25))
R4_GT = {"pi/5": math.pi / 5, "pi/3": math.pi / 3}
R4_LT = (0.25, 0.6)
R4_MU = {"pi/6": math.pi / 6, "pi/3": math.pi / 3}

IMPL_CHOICES = [
    "chi(E) is S(rho_S) (D2); it is also computed independently through the fragment engine with F = E, "
    "and the two must agree to 1e-9 (Section 8).",
    "Fragment sets: exhaustive for N_E <= 10. For N_E = 12, any size with C(12, m) <= 128 is exhaustive; "
    "otherwise all contiguous blocks, all complements of contiguous blocks and 128 distinct uniformly random "
    "subsets, one fixed set per N_E (seed (MASTER, 0, N_E)). The same set is used for every N_E = 12 state.",
    "M1(c) hazy: homogeneous, so chi(F) depends only on |F|. It is computed exactly with the GL(2) "
    "(Schur-Weyl) block decomposition of p0 X^(x)m + p1 Y^(x)m; each size enters the quantiles with "
    "multiplicity C(N_E, m) (equivalent to evaluating every fragment).",
    "M1 per-state C1/C2 (T2): C1 and C2 are applied per state; the cell aggregation of T3 is not used for "
    "M1, whose cells (except (b)) hold one state.",
    "T1(c) numerical zero: delta_chi(F) <= 1e-13 counts as a violation only if x(F) < 20 (where the "
    "local rates predict a deficit above ~1e-9, far above double-precision resolution); delta_chi < -1e-10 "
    "always counts.",
    "D4 / delta_J is computed for contiguous blocks 1..m with m <= min(6, N_E - 1) only.",
    "T3 overall: a model with fewer than 10 eligible open cells is INCONCLUSIVE and cannot trigger any "
    "category; the overall verdict is NO COLLAPSE if an eligible model meets it, else INCONCLUSIVE if any "
    "model is INCONCLUSIVE, else the weaker of the two model categories.",
    "T3b uses fragments from state-eligible states (>= 10 eligible fragments, chi(E) >= 0.5), without "
    "requiring cell eligibility; the permutation test uses a seeded subsample of at most 20000 fragments "
    "per model.",
    "T3s: 'homogeneous cells' = M1(a), M2 with homogeneous g_k, and all M4 cells (all M4 sites have the "
    "same coupling); M3 is excluded (circuit draws are inhomogeneous). A state needs >= 3 eligible points.",
    "T5: M1(a) points use N_E = 12; M2 points use homogeneous g_k. All listed M2 and M4 points (including "
    "k = 1 and the product M4 point lambda = mu = 0) enter H5, as the rule is written; the k >= 2, open-only "
    "count is reported as post-hoc.",
    "T6: run at N_E = 8 (n = 9 qubits, all 511 observer subsets): M2 all main cells at t in {1, 2, 3}, M4 "
    "all main cells, M3 10 draws per cell, M1(a). T6(b) (fidelity bound) on |O| <= 6 for M2 at t = 2, M4, "
    "and 3 M3 draws per cell.",
    "T4: M3 delta_half is the median over the 50 draws; cells are (theta, d). M2 cells are (J, h_S, g, V) "
    "with the inhomogeneous g_k drawn separately per N_E (as pre-registered).",
    "Robustness: M3 is not in the robustness grid, so S-robustness is evaluated on the models present "
    "(M2, M4). T3-R uses the M2 N_E = 10 cells only, as written.",
    "Bootstrap over cells for pass fractions: B = 2000, seed (MASTER, 9, ...).",
]


def seed(*items):
    return np.random.SeedSequence((MASTER_SEED_V12D,) + tuple(int(x) for x in items))


# ---------------------------------------------------------------------------
# Basic information functions
# ---------------------------------------------------------------------------

def h2(p):
    p = float(p)
    if p <= 0.0 or p >= 1.0:
        return 0.0
    return -(p * math.log2(p) + (1 - p) * math.log2(1 - p))


def ent_herm(G):
    w = np.linalg.eigvalsh(G)
    w = w[w > 1e-15]
    return float(-(w * np.log2(w)).sum())


def ent_probs(p):
    p = np.asarray(p, float).ravel()
    p = p[p > 0]
    return float(-(p * np.log2(p)).sum())


def g_fun(x):
    """g(x) = 1 - h((1 + e^(-x/2))/2), numerically stable."""
    x = np.asarray(x, float)
    e = np.exp(-x / 2)
    with np.errstate(divide="ignore", invalid="ignore"):
        full = ((1 + e) * np.log1p(e) + np.where(e < 1, (1 - e) * np.log1p(-np.minimum(e, 1 - 1e-300)), 0.0))
    e2 = e * e
    series = e2 * (1 + e2 / 6 + e2 * e2 / 15 + e2 ** 3 / 28)
    f = np.where(e < 1e-2, series, full)
    return f / (2 * LN2)


def d_ref(x, xE):
    """D_ref (D7) = 1 - h((1+e^{-x/2})/2) / h((1+e^{-xE/2})/2)."""
    gx, gE = g_fun(x), g_fun(xE)
    return (gx - gE) / (1 - gE)


def qcb(r0, r1):
    """Quantum Chernoff information (nats), D5; capped at XI_MAX."""
    w0, V0 = np.linalg.eigh(crt.herm(r0))
    w1, V1 = np.linalg.eigh(crt.herm(r1))
    w0 = np.where(w0 > 1e-14, w0, 0.0)
    w1 = np.where(w1 > 1e-14, w1, 0.0)

    def tr(c):
        A = (V0 * w0 ** c) @ np.conj(V0.T)
        B = (V1 * w1 ** (1 - c)) @ np.conj(V1.T)
        return float(np.real(np.trace(A @ B)))
    res = minimize_scalar(tr, bounds=(1e-9, 1 - 1e-9), method="bounded", options={"xatol": 1e-10})
    q = min(res.fun, tr(0.5))
    if q <= math.exp(-XI_MAX):
        return XI_MAX
    return min(XI_MAX, max(0.0, -math.log(q)))


def mi_joint(P):
    """I(first axis : remaining axes) in bits for a joint probability array."""
    P = np.asarray(P, float)
    Ps = P.reshape(P.shape[0], -1)
    return ent_probs(Ps.sum(1)) + ent_probs(Ps.sum(0)) - ent_probs(Ps)


# ---------------------------------------------------------------------------
# The fragment engine (pure global state, S = qubit 0)
# ---------------------------------------------------------------------------

class State:
    def __init__(self, psi, n_env):
        d = 2 ** n_env
        Psi = np.asarray(psi, complex).reshape(2, d)
        self.n = n_env
        self.p = np.real(np.sum(np.abs(Psi) ** 2, axis=1))
        self.rhoS = Psi @ np.conj(Psi.T)
        self.SS = ent_herm(self.rhoS)
        self.HSpi = h2(self.p[0])
        self.coh = float(abs(self.rhoS[0, 1]))
        self.T = [Psi[s].reshape((2,) * n_env) / math.sqrt(max(self.p[s], 1e-300)) for s in (0, 1)]

    def mats(self, F):
        ax = [k - 1 for k in F]
        sax = set(ax)
        perm = ax + [i for i in range(self.n) if i not in sax]
        m = len(F)
        return [np.transpose(T, perm).reshape(2 ** m, -1) for T in self.T]

    def cond(self, F):
        M0, M1 = self.mats(F)
        return M0 @ np.conj(M0.T), M1 @ np.conj(M1.T)

    def info(self, F):
        """(chi(S_Pi:F), I(S:F)) in bits, on the smaller side (D1)."""
        m, n = len(F), self.n
        p0, p1 = self.p
        c = math.sqrt(p0 * p1)
        M0, M1 = self.mats(F)
        if m <= n - m:
            G00 = M0 @ np.conj(M0.T)
            G11 = M1 @ np.conj(M1.T)
            G01 = M0 @ np.conj(M1.T)
            SF = ent_herm(p0 * G00 + p1 * G11)
            SSF = ent_herm(np.block([[p0 * G00, c * G01], [c * np.conj(G01.T), p1 * G11]]))
        else:
            G00 = np.conj(M0.T) @ M0
            G11 = np.conj(M1.T) @ M1
            G01 = np.conj(M0.T) @ M1
            SF = ent_herm(np.block([[p0 * G00, c * G01], [c * np.conj(G01.T), p1 * G11]]))
            SSF = ent_herm(p0 * G00 + p1 * G11)
        chi = SF - p0 * ent_herm(G00) - p1 * ent_herm(G11)
        return chi, self.SS + SF - SSF


def frag_sets(n_env):
    sites = list(range(1, n_env + 1))
    out = {}
    rng = np.random.default_rng(seed(0, n_env))
    for m in range(1, n_env):
        if n_env <= 10 or math.comb(n_env, m) <= N_RAND:
            out[m] = list(itertools.combinations(sites, m))
            continue
        S = set()
        for a in range(1, n_env - m + 2):
            S.add(tuple(range(a, a + m)))
        L = n_env - m
        for a in range(1, n_env - L + 2):
            blk = set(range(a, a + L))
            S.add(tuple(k for k in sites if k not in blk))
        R = set()
        while len(R) < N_RAND:
            R.add(tuple(sorted(int(k) for k in rng.choice(sites, size=m, replace=False))))
        out[m] = sorted(S | R)
    return out


_FS_CACHE = {}


def get_frags(n_env):
    if n_env not in _FS_CACHE:
        _FS_CACHE[n_env] = frag_sets(n_env)
    return _FS_CACHE[n_env]


def accessible_J(st, F):
    r0, r1 = st.cond(F)
    p0, p1 = st.p
    Pi0, Pi1 = helstrom_tiefix(r0, r1, p0, p1)
    P = np.array([[np.real(np.trace(Pi0 @ r)), np.real(np.trace(Pi1 @ r))] for r in (r0, r1)])
    P = np.clip(P, 0, None)
    P = P / P.sum(1, keepdims=True)
    joint = np.array([p0, p1])[:, None] * P
    return mi_joint(joint)


def process_state(psi, n_env, frags=None):
    """All per-state quantities for T1-T4 (exact)."""
    st = State(psi, n_env)
    frags = get_frags(n_env) if frags is None else frags
    xi = np.array([qcb(*st.cond([k])) for k in range(1, n_env + 1)])
    xE = float(xi.sum())
    chiE_frag = st.info(list(range(1, n_env + 1)))[0]
    SS = st.SS
    rec = {"p0": float(st.p[0]), "SS": SS, "HSpi": st.HSpi, "coh": st.coh,
           "chiE_check": abs(chiE_frag - SS), "xi": xi.tolist(), "xE": xE,
           "xi_dec": (min(XI_MAX, -math.log(max(4 * st.coh ** 2, 1e-300)) / n_env)) if st.coh > 0 else XI_MAX}
    best_d = np.full(n_env - 1, np.nan)
    best_x = np.full(n_env - 1, np.nan)
    fx, fd, fm = [], [], []
    t1 = {"min_dI": 1.0, "dI_zero": [], "chi_zero_viol": 0, "chi_neg": 0, "n_frag": 0, "L4_viol": 0,
          "maxdev_ref": 0.0, "max_abs_d": 0.0}
    all_xi_ok = bool(np.all(xi < XI_MAX))
    valid = SS > 1e-9
    for m, Fs in frags.items():
        for F in Fs:
            chi, I = st.info(F)
            if chi > min(I, st.HSpi) + 1e-9:
                t1["L4_viol"] += 1
            if not valid:
                continue
            d = (SS - chi) / SS
            x = float(xi[[k - 1 for k in F]].sum())
            dI = 1 - I / (2 * SS)
            t1["n_frag"] += 1
            t1["max_abs_d"] = max(t1["max_abs_d"], abs(d))
            t1["maxdev_ref"] = max(t1["maxdev_ref"], abs(d - float(d_ref(x, xE))))
            if dI < t1["min_dI"]:
                t1["min_dI"] = dI
            if dI <= 1e-10 and len(t1["dI_zero"]) < 20:
                Fb = [k for k in range(1, n_env + 1) if k not in F]
                t1["dI_zero"].append(float(st.info(Fb)[1]))
            if all_xi_ok and ((d <= 1e-13 and x < 20) or d < -1e-10):
                t1["chi_zero_viol"] += 1
            if d < -1e-10:
                t1["chi_neg"] += 1
            if np.isnan(best_d[m - 1]) or d < best_d[m - 1]:
                best_d[m - 1], best_x[m - 1] = d, x
            if WIN_KEEP[0] <= d <= WIN_KEEP[1] and x >= X_MIN:
                fx.append(x); fd.append(d); fm.append(m)
    rec.update(best_d=best_d.tolist(), best_x=best_x.tolist(), t1=t1, all_xi_ok=all_xi_ok,
               fx=np.array(fx, np.float32), fd=np.array(fd, np.float32), fm=np.array(fm, np.int8))
    dj = []
    if valid:
        for m in range(1, min(6, n_env - 1) + 1):
            F = list(range(1, m + 1))
            J = accessible_J(st, F)
            chi = st.info(F)[0]
            dj.append([m, 1 - J / SS, (SS - chi) / SS, bool(J <= chi + 1e-9)])
    rec["dJ"] = dj
    return rec


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

def kron_list(vs):
    out = np.array([1.0 + 0j])
    for v in vs:
        out = np.kron(out, v)
    return out


def m1_psi(thetas, a=math.pi / 4):
    n = len(thetas)
    b0 = kron_list([np.array([1, 0], complex)] * n)
    b1 = kron_list([np.array([math.cos(t), math.sin(t)], complex) for t in thetas])
    return np.concatenate([math.cos(a) * b0, math.sin(a) * b1])


def p0_to_a(p0):
    return math.acos(math.sqrt(p0))


def sym_power(X, k):
    """Matrix of Sym^k(X) on the monomial basis e0^(k-i) e1^i (a representation of GL(2))."""
    M = np.zeros((k + 1, k + 1), complex)
    for i in range(k + 1):
        c = np.array([1.0 + 0j])
        for _ in range(k - i):
            c = np.convolve(c, [X[0, 0], X[1, 0]])
        for _ in range(i):
            c = np.convolve(c, [X[0, 1], X[1, 1]])
        M[:, i] = c
    return M


def ent_mix_tensor_power(X, Y, p0, m):
    """Entropy (bits) of p0 X^(x)m + (1 - p0) Y^(x)m for 2x2 positive X, Y (Schur-Weyl blocks)."""
    dX, dY = np.linalg.det(X), np.linalg.det(Y)
    H = 0.0
    tot = 0
    for q in range(m // 2 + 1):
        k = m - 2 * q
        mult = math.comb(m, q) - (math.comb(m, q - 1) if q >= 1 else 0)
        if mult == 0:
            continue
        B = p0 * dX ** q * sym_power(X, k) + (1 - p0) * dY ** q * sym_power(Y, k)
        w = np.real(np.linalg.eigvals(B))
        w = w[w > 1e-15]
        H += mult * float(-(w * np.log2(w)).sum())
        tot += mult * (k + 1)
    assert tot == 2 ** m
    return H


def m1_hazy_record(theta, h, n_env):
    sig0 = v1.hazy_env(h)
    R = v1.rot(theta)
    sig1 = R @ sig0 @ np.conj(R.T)
    p0 = 0.5
    s1 = ent_herm(sig0)
    xi1 = qcb(sig0, sig1)
    chi = {}
    for m in range(1, n_env + 1):
        chi[m] = ent_mix_tensor_power(sig0, sig1, p0, m) - m * s1
    chiE = chi[n_env]
    fx, fd, fw = [], [], []
    best_d, best_x = [], []
    for m in range(1, n_env):
        d = (chiE - chi[m]) / chiE
        x = m * xi1
        best_d.append(d); best_x.append(x)
        if WIN_KEEP[0] <= d <= WIN_KEEP[1] and x >= X_MIN:
            fx.append(x); fd.append(d); fw.append(math.comb(n_env, m))
    return {"p0": p0, "SS": chiE, "HSpi": 1.0, "chiE_check": 0.0, "xi": [xi1] * n_env, "xE": n_env * xi1,
            "xi_dec": None, "coh": None, "best_d": best_d, "best_x": best_x,
            "fx": np.array(fx, np.float32), "fd": np.array(fd, np.float32),
            "fm": np.array([int(round(x / xi1)) for x in fx], np.int8) if xi1 > 0 else np.array([], np.int8),
            "fw": np.array(fw, np.int64), "t1": None, "dJ": [], "all_xi_ok": True}


_OPS = {}


def _op(o, site, n):
    key = (id(o), site, n)
    if key not in _OPS:
        _OPS[key] = v3._pauli_on(o, site, n)
    return _OPS[key]


def m2_hamiltonian(n_env, J, hS, gk, hy=0.0, bz=0.0, Delta=0.0):
    n = n_env + 1
    H = sp.csr_matrix((2 ** n, 2 ** n), dtype=complex)
    for k in range(1, n):
        H = H + gk[k - 1] * (_op(P1, 0, n) @ _op(PY, k, n))
    for k in range(1, n - 1):
        if J:
            H = H + (J / 2) * (_op(PX, k, n) @ _op(PX, k + 1, n) + _op(PY, k, n) @ _op(PY, k + 1, n))
        if Delta:
            H = H + Delta * (_op(PZ, k, n) @ _op(PZ, k + 1, n))
    if bz:
        for k in range(1, n):
            H = H + bz * _op(PZ, k, n)
    if hS:
        H = H + hS * _op(PX, 0, n)
    if hy:
        H = H + hy * _op(PY, 0, n)
    return H.tocsr()


def m2_gk(n_env, gopt):
    if gopt == "hom":
        return np.ones(n_env)
    rng = np.random.default_rng(seed(1, n_env))
    return 1.0 + 0.3 * rng.normal(size=n_env)


def m2_evolve(n_env, J, hS, gopt, V, tmax, nt):
    """Returns array (nt + 1, 2^n, 2): columns = evolution of |0>|0..0> and |1>|0..0>."""
    H = m2_hamiltonian(n_env, J, hS, m2_gk(n_env, gopt), **M2_V[V]) if isinstance(V, str) else \
        m2_hamiltonian(n_env, J, hS, m2_gk(n_env, gopt), **V)
    d = 2 ** (n_env + 1)
    B = np.zeros((d, 2), complex)
    B[0, 0] = 1.0
    B[2 ** n_env, 1] = 1.0
    return expm_multiply(-1j * H, B, start=0.0, stop=tmax, num=nt + 1, endpoint=True)


def apply_2q(psi, U, q1, q2, n):
    T = psi.reshape((2,) * n)
    T = np.moveaxis(T, (q1, q2), (0, 1))
    sh = T.shape
    T = (U @ T.reshape(4, -1)).reshape(sh)
    return np.moveaxis(T, (0, 1), (q1, q2)).reshape(-1)


def haar_u(d, rng):
    Z = (rng.normal(size=(d, d)) + 1j * rng.normal(size=(d, d))) / math.sqrt(2)
    Q, R = np.linalg.qr(Z)
    ph = np.diag(R) / np.abs(np.diag(R))
    return Q * ph


def brickwork(n_env, depth, rng):
    gates = []
    for layer in range(depth):
        for k in range(layer % 2, n_env - 1, 2):
            gates.append((k, k + 1, haar_u(4, rng)))
    return gates


def m3_branches(theta, n_env, depth, rng):
    E0 = kron_list([np.array([1, 0], complex)] * n_env)
    E1 = kron_list([np.array([math.cos(theta), math.sin(theta)], complex)] * n_env)
    for (a, b, U) in brickwork(n_env, depth, rng):
        E0 = apply_2q(E0, U, a, b, n_env)
        E1 = apply_2q(E1, U, a, b, n_env)
    return E0, E1


def m4_run(n_env, gt, lt, mu, s_init):
    n = n_env + 1
    U = expm(-1j * (gt * np.kron(P1, PY) + (lt / 2) * (np.kron(PX, PX) + np.kron(PY, PY))))
    W = math.cos(mu) * np.eye(4) - 1j * math.sin(mu) * SWAP
    psi = np.kron(np.asarray(s_init, complex), kron_list([np.array([1, 0], complex)] * n_env))
    for k in range(1, n_env + 1):
        psi = apply_2q(psi, U, 0, k, n)
        if k < n_env and mu:
            psi = apply_2q(psi, W, k, k + 1, n)
    return psi


PLUS = np.array([1, 1], complex) / math.sqrt(2)
MINUS = np.array([1, -1], complex) / math.sqrt(2)
KET0 = np.array([1, 0], complex)
KET1 = np.array([0, 1], complex)


# ---------------------------------------------------------------------------
# T6: self-measurement (D9)
# ---------------------------------------------------------------------------

def _mat_q(psi, n, keep):
    keep = list(keep)
    sk = set(keep)
    perm = keep + [q for q in range(n) if q not in sk]
    return np.transpose(psi.reshape((2,) * n), perm).reshape(2 ** len(keep), -1)


def trace_dist_marg(Pp, Pm, O, n):
    Mp, Mm = _mat_q(Pp, n, O), _mat_q(Pm, n, O)
    dO, dR = Mp.shape
    if dO <= 2 * dR:
        w = np.linalg.eigvalsh(crt.herm(Mp @ np.conj(Mp.T) - Mm @ np.conj(Mm.T)))
    else:
        # K = [Mp, Mm] = Q R; rho+ - rho- = Q (R Sigma R^dag) Q^dag, Hermitian and well conditioned
        _, Rk = np.linalg.qr(np.hstack([Mp, Mm]))
        sig = np.concatenate([np.ones(dR), -np.ones(dR)])
        w = np.linalg.eigvalsh(crt.herm((Rk * sig) @ np.conj(Rk.T)))
    return 0.5 * float(np.abs(w).sum())


def root_fid_marg(Pp, Pm, O, n):
    """Root fidelity of the O-marginals of two pure states. With rho = Mp Mp^dag and sigma = Mm Mm^dag,
    F = ||Mp^dag Mm||_1 (Uhlmann: max over unitaries V on the complement of |<Psi+| 1 (x) V |Psi->|)."""
    Mp, Mm = _mat_q(Pp, n, O), _mat_q(Pm, n, O)
    return float(np.linalg.svd(np.conj(Mp.T) @ Mm, compute_uv=False).sum())


def selfmeas(Pp, Pm, n, fid_max=0):
    """delta_self per observer size; max D over O inside E; D of the whole; fidelity-bound check."""
    best = {}
    maxD_inE = 0.0
    viol, worst = 0, -1.0
    Dall = {}
    for k in range(1, n + 1):
        for O in itertools.combinations(range(n), k):
            D = trace_dist_marg(Pp, Pm, O, n)
            Dall[O] = D
            best[k] = min(best.get(k, 1.0), 1 - D)
            if 0 not in O:
                maxD_inE = max(maxD_inE, D)
            if fid_max and k <= fid_max:
                F = min(1.0, root_fid_marg(Pp, Pm, O, n))
                gap = D - math.sqrt(max(0.0, 1 - F * F))
                worst = max(worst, gap)
                if gap > 1e-9:
                    viol += 1
    out = {"delta_self": [best[k] for k in range(1, n + 1)], "maxD_inE": maxD_inE,
           "D_whole": Dall[tuple(range(n))]}
    if fid_max:
        out.update(fid_viol=viol, fid_worst_gap=worst)
    return out, Dall


# ---------------------------------------------------------------------------
# T5: consensus (D8)
# ---------------------------------------------------------------------------

def consensus_law(st, blocks, kind):
    """Exact P(s, r_1..r_k) with records Helstrom (pointer-conditional states) or Local."""
    k = len(blocks)
    p = st.p
    Pis = []
    for F in blocks:
        if kind == "Local":
            Pis.append(v3.local_majority_pi0(len(F)))
        else:
            r0, r1 = st.cond(F)
            Pis.append(helstrom_tiefix(r0, r1, p[0], p[1])[0])
    P = np.zeros((2,) + (2,) * k)
    flat = [q for F in blocks for q in F]
    for s in (0, 1):
        X = _mat_q(st.T[s].reshape(-1), st.n, [q - 1 for q in flat])
        X = X.reshape([2 ** len(F) for F in blocks] + [-1])
        tens = [((), X)]
        for i in range(k):
            new = []
            for r, Y in tens:
                Y0 = np.moveaxis(np.tensordot(Pis[i], Y, axes=([1], [i])), 0, i)
                new.append((r + (0,), Y0))
                new.append((r + (1,), Y - Y0))
            tens = new
        for r, Y in tens:
            P[(s,) + r] = p[s] * float(np.real(np.vdot(X, Y)))
    P = np.clip(P, 0, None)
    return P / P.sum()


def ci_law(P):
    k = P.ndim - 1
    ps = P.reshape(2, -1).sum(1)
    out = np.zeros_like(P)
    for s in (0, 1):
        cond = P[s] / ps[s]
        margs = [cond.sum(axis=tuple(j for j in range(k) if j != i)) for i in range(k)]
        prod = margs[0]
        for mm in margs[1:]:
            prod = np.multiply.outer(prod, mm)
        out[s] = ps[s] * prod
    return out


def mi_counts(c, mm=False):
    c = np.asarray(c, float).reshape(c.shape[0], -1)
    n = c.sum()
    Hs = lambda a: ent_probs(a / n) + ((np.count_nonzero(a) - 1) / (2 * n * LN2) if mm else 0.0)  # noqa: E731
    return Hs(c.sum(1)) + Hs(c.sum(0)) - Hs(c)


def cmi_r1r2_s(s, r1, r2):
    I = 0.0
    n = len(s)
    for sv in (0, 1):
        idx = s == sv
        ns = idx.sum()
        if ns == 0:
            continue
        c = np.bincount(2 * r1[idx] + r2[idx], minlength=4).reshape(2, 2).astype(float)
        I += ns / n * (ent_probs(c.sum(1) / ns) + ent_probs(c.sum(0) / ns) - ent_probs(c / ns))
    return I


def consensus_finite(P, SS, ss, n_shots=10_000, B=1000, n_perm=2000):
    r_c, r_b, r_p = [np.random.default_rng(s) for s in ss.spawn(3)]
    flat = P.ravel()
    cnt = r_c.multinomial(n_shots, flat / flat.sum()).reshape(P.shape)
    I_hat = mi_counts(cnt)
    I_mm = mi_counts(cnt, mm=True)
    bc = r_b.multinomial(n_shots, cnt.ravel() / n_shots, size=B)
    Ib = np.array([mi_counts(b.reshape(P.shape)) for b in bc])
    dI = 1 - Ib / SS
    out = {"delta_hat": 1 - I_hat / SS, "delta_mm": 1 - I_mm / SS,
           "delta_ci95": [float(np.percentile(dI, 2.5)), float(np.percentile(dI, 97.5))]}
    k = P.ndim - 1
    if k >= 2:
        idx = np.repeat(np.arange(flat.size), cnt.ravel())
        sub = np.array(np.unravel_index(idx, P.shape)).T
        s, r1, r2 = sub[:, 0], sub[:, 1], sub[:, 2]
        obs = cmi_r1r2_s(s, r1, r2)
        ge = 0
        for _ in range(n_perm):
            r2p = r2.copy()
            for sv in (0, 1):
                ii = np.nonzero(s == sv)[0]
                r2p[ii] = r_p.permutation(r2[ii])
            if cmi_r1r2_s(s, r1, r2p) >= obs - 1e-15:
                ge += 1
        out.update(cmi_hat=obs, perm_p=(1 + ge) / (1 + n_perm))
    return out


# ---------------------------------------------------------------------------
# Workers
# ---------------------------------------------------------------------------

def _strip(rec, keep_frag=True):
    if not keep_frag:
        for k in ("fx", "fd", "fm"):
            rec[k] = np.array([], np.float32)
    return rec


def task_m1(args):
    kind, thn, n_env, extra = args
    th = M1_THETAS.get(thn, math.pi / 2)
    meta = {"model": "M1" + kind, "N": n_env, "theta": thn, "extra": extra, "open": False,
            "conserving": True, "homog": kind in ("a", "d", "pi2", "c")}
    if kind == "c":
        rec = m1_hazy_record(th, extra, n_env)
    else:
        if kind == "b":
            rng = np.random.default_rng(seed(2, list(M1_THETAS).index(thn), n_env, extra))
            ths = th * (1 + 0.5 * (2 * rng.uniform(size=n_env) - 1))
            meta["thetas"] = ths.tolist()
        else:
            ths = np.full(n_env, th)
        a = p0_to_a(extra) if kind == "d" else math.pi / 4
        rec = process_state(m1_psi(ths, a), n_env)
        if kind in ("a", "pi2") and n_env == 8:
            Pp = m1_psi(ths, math.pi / 4)
            Pm = m1_psi(ths, -math.pi / 4)
            sm, Dall = selfmeas(Pp, Pm, n_env + 1)
            dev = 0.0
            for O, D in Dall.items():
                pred = float(np.prod([abs(math.cos(ths[q - 1])) for q in range(1, n_env + 1) if q not in O])) \
                    if 0 in O else 0.0
                dev = max(dev, abs(D - pred))
            sm["L6_maxdev"] = dev
            rec["T6"] = sm
    rec.update(meta)
    rec["cell"] = f"M1{kind}|N{n_env}|{thn}|{extra}"
    return [rec]


def task_m2(args):
    grid, n_env, J, hS, gopt, V = args
    times = M2_T if grid == "main" else R2_T
    Vd = M2_V[V]
    Vs = m2_evolve(n_env, J, hS, gopt, V, times[-1], len(times))
    conserving = (hS == 0 and Vd["hy"] == 0)
    derivable = (J == 0 and hS == 0 and V == "V0")
    out = []
    for i, t in enumerate(times, start=1):
        v0, v1_ = Vs[i][:, 0], Vs[i][:, 1]
        psi = (v0 + v1_) / math.sqrt(2)
        rec = process_state(psi, n_env)
        rec.update(model="M2" if grid == "main" else "M2R", N=n_env, t=t, J=J, hS=hS, g=gopt, V=V,
                   open=not derivable, conserving=conserving, homog=(gopt == "hom"),
                   cell=f"{grid}|N{n_env}|J{J}|h{hS}|{gopt}|{V}", tcell=f"{grid}|J{J}|h{hS}|{gopt}|{V}")
        if grid == "main" and n_env == 8 and any(abs(t - tt) < 1e-9 for tt in (1.0, 2.0, 3.0)):
            sm, _ = selfmeas((v0 + v1_) / math.sqrt(2), (v0 - v1_) / math.sqrt(2), n_env + 1,
                             fid_max=6 if abs(t - 2.0) < 1e-9 else 0)
            rec["T6"] = sm
        out.append(rec)
    return out


def task_m3(args):
    thn, depth, n_env = args
    th = M3_THETAS[thn]
    out = []
    for dr in range(M3_DRAWS):
        rng = np.random.default_rng(seed(3, list(M3_THETAS).index(thn), depth, n_env, dr))
        E0, E1 = m3_branches(th, n_env, depth, rng)
        psi = np.concatenate([E0, E1]) / math.sqrt(2)
        rec = process_state(psi, n_env)
        rec.update(model="M3", N=n_env, theta=thn, d=depth, draw=dr, open=True, conserving=True, homog=False,
                   cell=f"M3|N{n_env}|{thn}|d{depth}", tcell=f"M3|{thn}|d{depth}")
        if n_env == 8 and dr < 10:
            sm, _ = selfmeas(np.concatenate([E0, E1]) / math.sqrt(2), np.concatenate([E0, -E1]) / math.sqrt(2),
                             n_env + 1, fid_max=6 if dr < 3 else 0)
            rec["T6"] = sm
        out.append(rec)
    return out


def task_haar(args):
    thn, n_env = args
    th = HAAR_THETAS[thn]
    out = []
    for dr in range(HAAR_DRAWS):
        rng = np.random.default_rng(seed(4, list(HAAR_THETAS).index(thn), n_env, dr))
        psi = v1.scrambled_psi(th, n_env, rng)
        rec = _strip(process_state(psi, n_env), keep_frag=False)
        rec.update(model="HAAR", N=n_env, theta=thn, draw=dr, open=False, conserving=True, homog=False,
                   cell=f"HAAR|N{n_env}|{thn}")
        out.append(rec)
    return out


def task_m4(args):
    grid, n_env, gtn, lt, mun = args
    gt = (M4_GT if grid == "main" else R4_GT)[gtn]
    mu = (M4_MU if grid == "main" else R4_MU)[mun]
    psi = m4_run(n_env, gt, lt, mu, PLUS)
    rec = process_state(psi, n_env)
    derivable = (lt == 0 and mu == 0)
    rec.update(model="M4" if grid == "main" else "M4R", N=n_env, gt=gtn, lt=lt, mu=mun, open=not derivable,
               conserving=(lt == 0), homog=True, t=None,
               cell=f"{grid}|N{n_env}|g{gtn}|l{lt}|mu{mun}", tcell=f"{grid}|g{gtn}|l{lt}|mu{mun}")
    if grid == "main" and n_env == 8:
        sm, _ = selfmeas(psi, m4_run(n_env, gt, lt, mu, MINUS), n_env + 1, fid_max=6)
        rec["T6"] = sm
    return [rec]


T5_KM = [(k, 1) for k in (1, 2, 3, 4, 6)] + [(k, 2) for k in (1, 2, 3, 4, 6)]


def t5_configs():
    cfg = []
    for thn in ("pi/8", "pi/4"):
        cfg.append(("M1", 12, dict(theta=thn)))
    for J in (0.5, 2.0):
        for hS in (0.0, 0.25):
            for t in (1.0, 2.0, 3.0):
                cfg.append(("M2", 10, dict(J=J, hS=hS, t=t)))
    for lt in (0.0, 0.4):
        for mun in ("0", "pi/4"):
            cfg.append(("M4", 10, dict(gt="pi/8", lt=lt, mu=mun)))
    return cfg


def task_t5(args):
    ci, (model, n_env, par) = args
    if model == "M1":
        psi = m1_psi(np.full(n_env, M1_THETAS[par["theta"]]))
    elif model == "M2":
        nt = int(round(par["t"] / 0.25))
        Vs = m2_evolve(n_env, par["J"], par["hS"], "hom", "VC", par["t"], nt)
        psi = (Vs[-1][:, 0] + Vs[-1][:, 1]) / math.sqrt(2)
    else:
        psi = m4_run(n_env, M4_GT[par["gt"]], par["lt"], M4_MU[par["mu"]], PLUS)
    st = State(psi, n_env)
    out = []
    for (k, m) in T5_KM:
        if k * m > n_env:
            continue
        blocks = [list(range(i * m + 1, (i + 1) * m + 1)) for i in range(k)]
        for kind in ("Helstrom", "Local"):
            P = consensus_law(st, blocks, kind)
            Pci = ci_law(P)
            I, Ici = mi_joint(P), mi_joint(Pci)
            row = {"model": model, "N": n_env, "par": par, "k": k, "m": m, "obs": kind, "SS": st.SS,
                   "I": I, "I_ci": Ici, "delta": 1 - I / st.SS, "delta_ci": 1 - Ici / st.SS,
                   "open": not (model == "M1" or (model == "M4" and par["lt"] == 0 and par["mu"] == "0"))}
            row.update(consensus_finite(P, st.SS, seed(5, ci, k, m, 0 if kind == "Helstrom" else 1)))
            out.append(row)
    return out


# ---------------------------------------------------------------------------
# Task lists
# ---------------------------------------------------------------------------

def tasks_all(quick=False):
    T = {"M1": [], "M2": [], "M3": [], "HAAR": [], "M4": [], "M2R": [], "M4R": [], "T5": []}
    Ns1 = (8,) if quick else M1_N
    th1 = ("pi/8", "pi/4") if quick else tuple(M1_THETAS)
    for N in Ns1:
        for thn in th1:
            T["M1"].append(("a", thn, N, 0.5))
            for dr in range(3 if quick else M1_DRAWS):
                T["M1"].append(("b", thn, N, dr))
            for h in M1_HAZE:
                T["M1"].append(("c", thn, N, h))
            for p0 in M1_P0:
                T["M1"].append(("d", thn, N, p0))
        T["M1"].append(("pi2", "pi/2", N, 0.5))
    Ns = (8,) if quick else M2_N
    for N in Ns:
        for J in ((0.0, 1.0) if quick else M2_J):
            for hS in ((0.0, 0.25) if quick else M2_HS):
                for g in (("hom",) if quick else M2_G):
                    for V in (("V0", "VC") if quick else M2_V):
                        T["M2"].append(("main", N, J, hS, g, V))
        for thn in M3_THETAS:
            for d in ((1, 4) if quick else M3_D):
                T["M3"].append((thn, d, N))
        for thn in HAAR_THETAS:
            T["HAAR"].append((thn, N))
        for gtn in M4_GT:
            for lt in M4_LT:
                for mun in M4_MU:
                    T["M4"].append(("main", N, gtn, lt, mun))
        for J in R2_J:
            for hS in R2_HS:
                T["M2R"].append(("R", N, J, hS, "hom", "VC"))
        for gtn in R4_GT:
            for lt in R4_LT:
                for mun in R4_MU:
                    T["M4R"].append(("R", N, gtn, lt, mun))
    T["T5"] = list(enumerate(t5_configs()))
    if quick:
        T["T5"] = T["T5"][:3]
    return T


WORKER = {"M1": task_m1, "M2": task_m2, "M3": task_m3, "HAAR": task_haar, "M4": task_m4,
          "M2R": task_m2, "M4R": task_m4, "T5": task_t5}


def _run_one(item):
    key, args = item
    t0 = time.time()
    res = WORKER[key](args)
    return key, args, res, time.time() - t0


# ---------------------------------------------------------------------------
# Analysis: T3 criteria
# ---------------------------------------------------------------------------

def _q95(a):
    return float(np.quantile(a, 0.95)) if len(a) else float("nan")


def state_eval(rec, win=WIN, tol=TOL):
    if rec["SS"] < 0.5:
        return {"elig": False, "why": "chiE"}
    fx = np.asarray(rec["fx"], float)
    fd = np.asarray(rec["fd"], float)
    w = rec.get("fw")
    w = np.ones(len(fx), int) if w is None or len(w) != len(fx) else np.asarray(w, int)
    mask = (fd >= win[0]) & (fd <= win[1]) & (fx >= X_MIN)
    nel = int(w[mask].sum())
    if nel < MIN_FRAG:
        return {"elig": False, "why": "frag", "n": nel}
    r = np.log(fd[mask] / np.maximum(d_ref(fx[mask], rec["xE"]), 1e-300))
    r = np.repeat(r, w[mask])
    med = float(np.median(r))
    q1 = _q95(np.abs(r))
    q2 = _q95(np.abs(r - med))
    return {"elig": True, "C1": q1 <= tol, "C2": q2 <= tol, "q1": q1, "q2": q2, "med": med, "n": nel}


def cell_eval(recs, win=WIN, tol=TOL):
    ev = [state_eval(r, win, tol) for r in recs]
    el = [e for e in ev if e["elig"]]
    out = {"n_states": len(recs), "n_elig_states": len(el)}
    if len(el) < MIN_STATES:
        out["elig"] = False
        return out
    f1 = float(np.mean([e["C1"] for e in el]))
    f2 = float(np.mean([e["C2"] for e in el]))
    out.update(elig=True, frac_C1=f1, frac_C2=f2, C1=f1 >= CELL_PASS, C2=f2 >= CELL_PASS,
               med_r=float(np.median([e["med"] for e in el])),
               q1_med=float(np.median([e["q1"] for e in el])), q2_med=float(np.median([e["q2"] for e in el])))
    return out


def boot_frac(flags, ss, B=B_CELLS):
    flags = np.asarray(flags, float)
    if flags.size == 0:
        return [None, None]
    rng = np.random.default_rng(ss)
    b = flags[rng.integers(0, flags.size, size=(B, flags.size))].mean(1)
    return [float(np.percentile(b, 2.5)), float(np.percentile(b, 97.5))]


def model_t3(cells, ss):
    el = {k: c for k, c in cells.items() if c.get("elig")}
    n = len(el)
    out = {"n_cells": len(cells), "n_elig": n}
    if n == 0:
        out["verdict"] = "INCONCLUSIVE"
        return out
    c1 = [c["C1"] for c in el.values()]
    c2 = [c["C2"] for c in el.values()]
    f1, f2 = float(np.mean(c1)), float(np.mean(c2))
    out.update(frac_C1=f1, frac_C2=f2, ci_C1=boot_frac(c1, ss), ci_C2=boot_frac(c2, ss),
               med_r=float(np.median([c["med_r"] for c in el.values()])),
               frac_r_neg=float(np.mean([c["med_r"] < 0 for c in el.values()])))
    if n < 10:
        out["verdict"] = "INCONCLUSIVE"
    elif f1 >= 0.9:
        out["verdict"] = "COLLAPSE"
    elif f2 >= 0.9:
        out["verdict"] = "COLLAPSE UP TO PREFACTOR"
    elif f2 < 0.5:
        out["verdict"] = "NO COLLAPSE"
    else:
        out["verdict"] = "PARTIAL"
    return out


def overall_t3(mv):
    vs = [m["verdict"] for m in mv.values()]
    if "NO COLLAPSE" in vs:
        nc = [k for k, m in mv.items() if m["verdict"] == "NO COLLAPSE"]
        sign = "r < 0 (superadditive)" if np.median([mv[k]["med_r"] for k in nc]) < 0 else "r > 0 (subadditive)"
        return f"NO COLLAPSE, {sign}"
    if "INCONCLUSIVE" in vs:
        return "INCONCLUSIVE"
    if all(v == "COLLAPSE" for v in vs):
        return "COLLAPSE"
    if all(v in ("COLLAPSE", "COLLAPSE UP TO PREFACTOR") for v in vs):
        return "COLLAPSE UP TO PREFACTOR"
    return "PARTIAL"


def group(recs, key):
    g = {}
    for r in recs:
        g.setdefault(r[key], []).append(r)
    return g


def run_t3(by_model, win=WIN, tol=TOL, models=("M2", "M4"), tag=0):
    out = {}
    for i, mdl in enumerate(models):
        recs = [r for r in by_model.get(mdl, []) if r["open"]]
        cells = {k: cell_eval(v, win, tol) for k, v in group(recs, "cell").items()}
        out[mdl] = model_t3(cells, seed(9, tag, i))
        out[mdl]["cells"] = cells
    return out


# ---------------------------------------------------------------------------
# Analysis: T4
# ---------------------------------------------------------------------------

def t4_class(d8, d12):
    if d12 >= 0.05 and d12 >= 0.8 * d8:
        return "FLOOR"
    if d12 < 0.01 or d12 <= 0.5 * d8:
        return "DECAY"
    return "UNDECIDED"


def dhalf(r):
    return float(r["best_d"][r["N"] // 2 - 1])


def run_t4(by_model, models=("M2", "M3", "M4")):
    res = {}
    for mdl in models:
        recs = [r for r in by_model.get(mdl, []) if r["open"]]
        pts = {}
        if mdl.startswith("M3"):
            g = {}
            for r in recs:
                g.setdefault((r["tcell"], r["N"]), []).append(r)
            for (tc, N), rr in g.items():
                pts.setdefault((tc, None), {})[N] = (float(np.median([dhalf(x) for x in rr])),
                                                     float(np.median([x["SS"] for x in rr])))
        else:
            for r in recs:
                pts.setdefault((r["tcell"], r.get("t")), {})[r["N"]] = (dhalf(r), r["SS"])
        cells = {}
        for (tc, t), byN in pts.items():
            if not all(N in byN for N in (8, 10, 12)):
                continue
            if any(byN[N][1] < 0.5 for N in (8, 10, 12)):
                cells.setdefault(tc, {"times": []})
                continue
            cl = t4_class(byN[8][0], byN[12][0])
            cells.setdefault(tc, {"times": []})["times"].append(
                {"t": t, "d8": byN[8][0], "d10": byN[10][0], "d12": byN[12][0], "class": cl})
        summ = {"FLOOR": 0, "DECAY": 0, "UNDECIDED": 0}
        for tc, c in cells.items():
            ts = c["times"]
            if not ts:
                c["class"] = "INELIGIBLE"
                continue
            fl = np.mean([x["class"] == "FLOOR" for x in ts])
            de = np.mean([x["class"] == "DECAY" for x in ts])
            c["class"] = "FLOOR" if fl >= 2 / 3 else ("DECAY" if de >= 2 / 3 else "UNDECIDED")
            c["frac_floor_times"], c["frac_decay_times"] = float(fl), float(de)
            summ[c["class"]] += 1
        ne = sum(summ.values())
        res[mdl] = {"cells": cells, "n_elig": ne, "counts": summ,
                    "frac_FLOOR": summ["FLOOR"] / ne if ne else None,
                    "frac_DECAY": summ["DECAY"] / ne if ne else None}
    return res


def s_verdict(t4):
    fl = [m["frac_FLOOR"] for m in t4.values()]
    de = [m["frac_DECAY"] for m in t4.values()]
    if sum(1 for f in fl if f is not None and f >= 0.5) >= 2:
        return "SUPPORTED"
    if all(d is not None and d >= 0.9 for d in de) and all(f is not None and f <= 0.1 for f in fl):
        return "REFUTED"
    return "MIXED"


# ---------------------------------------------------------------------------
# Analysis: everything
# ---------------------------------------------------------------------------

def analyze(by_model, t5rows, meta):
    A = {"meta": meta}
    allpure = [r for k, v in by_model.items() if k not in ("M1c",) for r in v]
    # Section 8 checks
    A["sec8"] = {"max_chiE_check": max(r["chiE_check"] for r in allpure),
                 "L4_viol": int(sum(r["t1"]["L4_viol"] for r in allpure if r["t1"])),
                 "J_le_chi_viol": int(sum(1 for r in allpure for x in r["dJ"] if not x[3]))}
    # T1
    t1a = {"n_frag": 0, "n_zero": 0, "zero_with_uncorr_complement": 0, "min_dI_by_model": {}}
    for k, v in by_model.items():
        if k in ("M1c",):
            continue
        mins = []
        for r in v:
            if r["t1"] is None or r["SS"] <= 1e-9:
                continue
            t1a["n_frag"] += r["t1"]["n_frag"]
            mins.append(r["t1"]["min_dI"])
            for Ib in r["t1"]["dI_zero"]:
                t1a["n_zero"] += 1
                if Ib < 1e-9:
                    t1a["zero_with_uncorr_complement"] += 1
        if mins:
            t1a["min_dI_by_model"][k] = float(min(mins))
    pi2 = by_model.get("M1pi2", [])
    t1b_all = max((r["t1"]["max_abs_d"] for r in pi2), default=None)
    t1c = {"n_states_checked": sum(1 for r in allpure if r.get("all_xi_ok") and r["t1"]),
           "violations": int(sum(r["t1"]["chi_zero_viol"] for r in allpure if r["t1"])),
           "negatives": int(sum(r["t1"]["chi_neg"] for r in allpure if r["t1"]))}
    T1pass = (t1a["n_zero"] == t1a["zero_with_uncorr_complement"]) and (t1b_all is not None and t1b_all < 1e-12) \
        and t1c["violations"] == 0
    A["T1"] = {"a": t1a, "b_max_abs_delta_chi": t1b_all, "c": t1c, "verdict": "PASS" if T1pass else "FAIL"}
    # T2
    m1a = by_model.get("M1a", [])
    t2a = max(r["t1"]["maxdev_ref"] for r in m1a) if m1a else None
    t2 = {"a_max_dev": t2a}
    for var in ("b", "c", "d"):
        recs = by_model.get("M1" + var, [])
        ev = [(r, state_eval(r)) for r in recs]
        el = [(r, e) for r, e in ev if e["elig"]]
        t2[var] = {"n": len(recs), "n_elig": len(el),
                   "frac_C1": float(np.mean([e["C1"] for _, e in el])) if el else None,
                   "frac_C2": float(np.mean([e["C2"] for _, e in el])) if el else None,
                   "rows": [{"cell": r["cell"], "C1": e["C1"], "C2": e["C2"], "q1": e["q1"], "q2": e["q2"],
                             "med": e["med"]} for r, e in el]}
    d_ok = t2["d"]["n_elig"] > 0 and all((not x["C1"]) and x["C2"] for x in t2["d"]["rows"])
    T2pass = (t2a is not None and t2a <= 1e-10) and d_ok
    t2["d_behaves"] = d_ok
    t2["verdict"] = "PASS" if T2pass else "FAIL"
    A["T2"] = t2
    # derivable controls (L7)
    der = [r for m in ("M2", "M4") for r in by_model.get(m, []) if not r["open"]]
    A["L7_run"] = {"n_states": len(der), "max_dev": max((r["t1"]["maxdev_ref"] for r in der), default=None)}
    # T3 primary
    t3 = run_t3(by_model)
    A["T3"] = {k: {kk: vv for kk, vv in v.items() if kk != "cells"} for k, v in t3.items()}
    A["T3_cells"] = {k: v["cells"] for k, v in t3.items()}
    A["T3"]["overall"] = overall_t3({k: t3[k] for k in ("M2", "M4")})
    # breakdowns (no verdict)
    br = {}
    for lab, filt in (("M2 conserving", lambda r: r["conserving"]), ("M2 non-conserving", lambda r: not r["conserving"]),
                      ("M2 J=0", lambda r: r["J"] == 0), ("M2 J>0", lambda r: r["J"] > 0)):
        recs = [r for r in by_model["M2"] if r["open"] and filt(r)]
        cells = {k: cell_eval(v) for k, v in group(recs, "cell").items()}
        br[lab] = {kk: vv for kk, vv in model_t3(cells, seed(9, 50, len(br))).items()}
    A["T3_breakdown"] = br
    # post-hoc: M4 per state (one state per cell)
    m4s = [state_eval(r) for r in by_model["M4"] if r["open"]]
    m4e = [e for e in m4s if e["elig"]]
    A["T3_posthoc_M4_states"] = {"n": len(m4s), "n_elig": len(m4e),
                                 "frac_C1": float(np.mean([e["C1"] for e in m4e])) if m4e else None,
                                 "frac_C2": float(np.mean([e["C2"] for e in m4e])) if m4e else None,
                                 "med_r": float(np.median([e["med"] for e in m4e])) if m4e else None,
                                 "q2_med": float(np.median([e["q2"] for e in m4e])) if m4e else None}
    # sensitivity
    sens = {}
    for lab, win, tol in (("tol ln1.15", WIN, math.log(1.15)), ("tol ln1.5", WIN, math.log(1.5)),
                          ("win [1e-5,0.5]", (1e-5, 0.5), TOL), ("win [1e-3,0.3]", (1e-3, 0.3), TOL)):
        s = run_t3(by_model, win, tol, tag=len(sens) + 1)
        sens[lab] = {k: {kk: vv for kk, vv in v.items() if kk != "cells"} for k, v in s.items()}
        sens[lab]["overall"] = overall_t3(s)
    A["T3_sensitivity"] = sens
    # T3b
    A["T3b"] = run_t3b(by_model)
    # T3c
    A["T3c"] = run_t3c(by_model)
    # T3s
    A["T3s"] = run_t3s(by_model)
    # T4
    t4 = run_t4(by_model)
    A["T4"] = {k: {kk: vv for kk, vv in v.items()} for k, v in t4.items()}
    A["S_main"] = s_verdict(t4)
    # last-fragment deficit (descriptive)
    lf = {}
    for mdl in ("M2", "M3", "M4"):
        for N in (8, 10, 12):
            vals = [r["best_d"][N - 2] for r in by_model.get(mdl, []) if r["open"] and r["N"] == N and r["SS"] >= 0.5]
            if vals:
                lf[f"{mdl} N{N}"] = {"median": float(np.median(vals)), "p90": float(np.percentile(vals, 90)),
                                     "max": float(np.max(vals))}
    A["T4_last_fragment"] = lf
    # cons vs non-cons breakdown of T4 (reported)
    A["T4_breakdown"] = t4_breakdown(t4, by_model)
    # T5
    A["T5"] = run_t5(t5rows)
    # T6
    A["T6"] = run_t6(by_model)
    # Haar control
    A["HAAR"] = haar_summary(by_model.get("HAAR", []))
    # robustness
    R = {}
    t3r = run_t3({"M2": [r for r in by_model.get("M2R", []) if r["N"] == 10], "M4": by_model.get("M4R", [])},
                 tag=90)
    R["T3"] = {k: {kk: vv for kk, vv in v.items() if kk != "cells"} for k, v in t3r.items()}
    R["T3"]["overall"] = overall_t3(t3r)
    t3r_ph = run_t3({"M2": by_model.get("M2R", [])}, models=("M2",), tag=91)
    R["T3_posthoc_M2_allN"] = {k: {kk: vv for kk, vv in v.items() if kk != "cells"} for k, v in t3r_ph.items()}
    t4r = run_t4({"M2": by_model.get("M2R", []), "M4": by_model.get("M4R", [])}, models=("M2", "M4"))
    R["T4"] = t4r
    R["S"] = s_verdict(t4r)
    # S rule on main restricted to M2, M4 (for a like-for-like comparison)
    R["S_main_M2M4"] = s_verdict({k: t4[k] for k in ("M2", "M4")})
    A["R"] = R
    A["T3_robust"] = (R["T3"]["overall"] == A["T3"]["overall"]) and A["T3"]["overall"] != "INCONCLUSIVE"
    A["S_robust"] = (R["S"] == A["S_main"])
    A["S_final"] = A["S_main"] if (A["S_main"] in ("SUPPORTED", "REFUTED") and A["S_robust"]) else \
        ("MIXED" if A["S_main"] == "MIXED" else f"MIXED (main grid: {A['S_main']}, not robust)")
    return A


def t4_breakdown(t4, by_model):
    out = {}
    cons = {}
    for mdl in ("M2", "M4", "M3"):
        for r in by_model.get(mdl, []):
            if r["open"]:
                cons[(mdl, r["tcell"])] = r["conserving"]
    for mdl, v in t4.items():
        for lab in (True, False):
            cl = [c["class"] for tc, c in v["cells"].items() if c["class"] != "INELIGIBLE" and cons.get((mdl, tc)) == lab]
            if cl:
                out[f"{mdl} {'conserving' if lab else 'non-conserving'}"] = {
                    "n": len(cl), "FLOOR": cl.count("FLOOR"), "DECAY": cl.count("DECAY"),
                    "UNDECIDED": cl.count("UNDECIDED")}
    return out


def _elig_frags(rec, win=WIN):
    e = state_eval(rec, win)
    if not e["elig"]:
        return None
    fx, fd = np.asarray(rec["fx"], float), np.asarray(rec["fd"], float)
    mask = (fd >= win[0]) & (fd <= win[1]) & (fx >= X_MIN)
    return fx[mask], fd[mask], np.log(fd[mask] / np.maximum(d_ref(fx[mask], rec["xE"]), 1e-300))


def run_t3b(by_model):
    edges = 0.05 + 0.25 * np.arange(0, 41)
    data = {}
    for mdl, sel in (("M1a", lambda r: True), ("M2", lambda r: r["open"]), ("M4", lambda r: r["open"])):
        xs, lds, rs = [], [], []
        for r in by_model.get(mdl, []):
            if not sel(r):
                continue
            q = _elig_frags(r)
            if q is None:
                continue
            xs.append(q[0]); lds.append(np.log(q[1])); rs.append(q[2])
        if xs:
            data[mdl] = (np.concatenate(xs), np.concatenate(lds), np.concatenate(rs))
    bins = []
    for b in range(len(edges) - 1):
        lo, hi = edges[b], edges[b + 1]
        meds = {}
        for mdl, (x, ld, _) in data.items():
            mk = (x >= lo) & (x < hi)
            if mk.sum():
                meds[mdl] = float(np.median(ld[mk]))
        if len(meds) >= 2:
            bins.append({"lo": float(lo), "hi": float(hi), "meds": meds,
                         "spread": max(meds.values()) - min(meds.values())})
    frac = float(np.mean([b["spread"] <= math.log(1.5) for b in bins])) if bins else None
    # permutation test on residuals, subsample <= 20000 per model
    rng = np.random.default_rng(seed(9, 100))
    X, Rr, L = [], [], []
    for i, (mdl, (x, _, r)) in enumerate(data.items()):
        idx = rng.choice(len(x), size=min(20000, len(x)), replace=False)
        X.append(x[idx]); Rr.append(r[idx]); L.append(np.full(len(idx), i))
    p = None
    if len(X) >= 2:
        X, Rr, L = np.concatenate(X), np.concatenate(Rr), np.concatenate(L)
        bidx = np.clip(np.searchsorted(edges, X, side="right") - 1, 0, len(edges) - 2)
        nm = int(L.max()) + 1

        def stat(lab):
            key = bidx * nm + lab
            cnt = np.bincount(key, minlength=len(edges) * nm).astype(float)
            sm = np.bincount(key, weights=Rr, minlength=len(edges) * nm)
            cb = np.bincount(bidx, minlength=len(edges)).astype(float)
            sb = np.bincount(bidx, weights=Rr, minlength=len(edges))
            mb = np.where(cb > 0, sb / np.maximum(cb, 1), 0.0)
            mbm = np.where(cnt > 0, sm / np.maximum(cnt, 1), 0.0)
            return float((cnt * (mbm - np.repeat(mb, nm)) ** 2).sum())
        obs = stat(L)
        order = np.argsort(bidx, kind="stable")
        bs = bidx[order]
        starts = np.searchsorted(bs, np.arange(len(edges)))
        ends = np.searchsorted(bs, np.arange(len(edges)), side="right")
        ge = 0
        nperm = 10_000
        Lo = L[order]
        Xo_b = bidx[order]
        Rr_o = Rr[order]
        Rr_save, bidx_save = Rr, bidx
        Rr, bidx = Rr_o, Xo_b
        for _ in range(nperm):
            lab = Lo.copy()
            for a, e in zip(starts, ends):
                if e - a > 1:
                    lab[a:e] = rng.permutation(lab[a:e])
            if stat(lab) >= obs:
                ge += 1
        Rr, bidx = Rr_save, bidx_save
        p = (1 + ge) / (1 + nperm)
    return {"n_bins": len(bins), "frac_bins_within": frac,
            "verdict": ("SHARED CURVE" if frac is not None and frac >= 0.8 else "NOT SHARED"),
            "perm_p": p, "n_frag": {k: int(len(v[0])) for k, v in data.items()}, "bins": bins}


def run_t3c(by_model):
    recs = by_model.get("M3", [])
    g = group(recs, "cell")
    cells = {}
    for k, rr in g.items():
        ev = [state_eval(r) for r in rr]
        el = [e for e in ev if e["elig"]]
        flags = [e["C2"] for e in el]
        r0 = rr[0]
        cells[k] = {"theta": r0["theta"], "N": r0["N"], "d": r0["d"], "n_draws": len(rr), "n_elig": len(el),
                    "pass_frac": float(np.mean(flags)) if el else None,
                    "ci": boot_frac(flags, seed(9, 200, r0["N"], r0["d"], list(M3_THETAS).index(r0["theta"]))) if el else [None, None],
                    "med_r": float(np.median([e["med"] for e in el])) if el else None}
    dstar = {}
    for thn in M3_THETAS:
        for N in M3_N:
            row = sorted([c for c in cells.values() if c["theta"] == thn and c["N"] == N], key=lambda c: c["d"])
            ds = None
            for c in row:
                if c["pass_frac"] is not None and c["pass_frac"] < 0.5:
                    ds = c
                    break
            dstar[f"{thn} N{N}"] = {"d_star": ds["d"] if ds else None,
                                    "med_r_at_dstar": ds["med_r"] if ds else None,
                                    "row": [(c["d"], c["pass_frac"], c["n_elig"], c["med_r"]) for c in row]}
    vals = [v for v in dstar.values() if v["d_star"] is not None]
    prior = {"n_with_dstar": len(vals), "n_total": len(dstar),
             "n_dstar_le3": sum(1 for v in vals if v["d_star"] <= 3),
             "n_r_neg": sum(1 for v in vals if v["med_r_at_dstar"] < 0)}
    return {"cells": cells, "d_star": dstar, "prior_check": prior}


def run_t3s(by_model):
    out = {}
    for mdl, sel in (("M1a", lambda r: True), ("M2", lambda r: r["open"] and r["homog"]),
                     ("M4", lambda r: r["open"])):
        res = {"xi_bar": [], "xi_dec": []}
        for r in by_model.get(mdl, []):
            if not sel(r) or r["SS"] < 0.5:
                continue
            N = r["N"]
            bd = np.asarray(r["best_d"], float)
            m = np.arange(1, N)
            for lab, rate in (("xi_bar", float(np.mean(r["xi"]))), ("xi_dec", r["xi_dec"])):
                if lab == "xi_dec" and not (r["conserving"] and abs(r["p0"] - 0.5) < 1e-9):
                    continue
                x = m * rate
                mk = (bd >= WIN[0]) & (bd <= WIN[1]) & (x >= X_MIN)
                if mk.sum() < 3:
                    continue
                rr = np.log(bd[mk] / np.maximum(d_ref(x[mk], N * rate), 1e-300))
                med = float(np.median(rr))
                res[lab].append((_q95(np.abs(rr)) <= TOL, _q95(np.abs(rr - med)) <= TOL, med))
        out[mdl] = {lab: {"n": len(v), "frac_C1": float(np.mean([a for a, _, _ in v])) if v else None,
                          "frac_C2": float(np.mean([b for _, b, _ in v])) if v else None,
                          "med_r": float(np.median([c for _, _, c in v])) if v else None}
                    for lab, v in res.items()}
    return out


def run_t5(rows):
    out = {"rows": rows}
    sel = [r for r in rows if r["model"] in ("M2", "M4") and 0.001 <= r["delta"] <= 0.9]
    ok = [abs(math.log(r["delta"] / max(r["delta_ci"], 1e-300))) <= TOL for r in sel]
    frac = float(np.mean(ok)) if ok else None
    out["H5"] = {"n_elig": len(sel), "frac_within": frac,
                 "verdict": "SUPPORTED" if frac is not None and frac >= 0.9 else "NOT SUPPORTED"}
    sel2 = [r for r in sel if r["k"] >= 2 and r["open"]]
    ok2 = [abs(math.log(r["delta"] / max(r["delta_ci"], 1e-300))) <= TOL for r in sel2]
    out["H5_posthoc_k2_open"] = {"n": len(sel2), "frac_within": float(np.mean(ok2)) if ok2 else None,
                                 "median_log_ratio": float(np.median([math.log(r["delta"] / max(r["delta_ci"], 1e-300))
                                                                      for r in sel2])) if sel2 else None}
    m1 = [r for r in rows if r["model"] == "M1"]
    out["L9_max_dev"] = max((abs(r["delta"] - r["delta_ci"]) for r in m1), default=None)
    pv = [r["perm_p"] for r in rows if "perm_p" in r and r["open"]]
    out["perm"] = {"n": len(pv), "frac_p_lt_0.01": float(np.mean([p < 0.01 for p in pv])) if pv else None}
    cover = [r["delta_ci95"][0] <= r["delta"] <= r["delta_ci95"][1] for r in rows]
    out["finite_cover"] = float(np.mean(cover)) if cover else None
    return out


def run_t6(by_model):
    out = {"L6_product_maxdev": None, "pointer_conserving_maxD_inE": 0.0, "D_whole_min": 1.0,
           "fid_viol": 0, "fid_worst_gap": -1.0, "curves": {}, "prior": {}}
    for r in by_model.get("M1a", []) + by_model.get("M1pi2", []):
        if "T6" in r:
            out["L6_product_maxdev"] = max(out["L6_product_maxdev"] or 0.0, r["T6"]["L6_maxdev"])
    for mdl in ("M2", "M3", "M4"):
        curves = []
        for r in by_model.get(mdl, []):
            if "T6" not in r:
                continue
            sm = r["T6"]
            out["D_whole_min"] = min(out["D_whole_min"], sm["D_whole"])
            if r["conserving"]:
                out["pointer_conserving_maxD_inE"] = max(out["pointer_conserving_maxD_inE"], sm["maxD_inE"])
            if "fid_viol" in sm:
                out["fid_viol"] += sm["fid_viol"]
                out["fid_worst_gap"] = max(out["fid_worst_gap"], sm["fid_worst_gap"])
            curves.append(sm["delta_self"])
        if curves:
            C = np.array(curves)
            n = C.shape[1]
            kmax = n // 2  # f_O = k / n <= 1/2
            hold = np.all(C[:, :kmax] >= 0.5, axis=1)
            out["curves"][mdl] = {"n": len(curves), "median": np.median(C, 0).tolist(), "min": C.min(0).tolist(),
                                  "max_D_inE_nonconserving": float(max(
                                      (r["T6"]["maxD_inE"] for r in by_model[mdl] if "T6" in r and not r["conserving"]),
                                      default=0.0))}
            out["prior"][mdl] = {"frac_states_holding": float(hold.mean()), "n": int(len(hold))}
    out["b_verdict"] = "PASS" if out["fid_viol"] == 0 else "FAIL"
    return out


def haar_summary(recs):
    out = {}
    for (thn, N), rr in group([dict(r, key=(r["theta"], r["N"])) for r in recs], "key").items():
        chi_frac = np.array([[1 - d for d in r["best_d"]] for r in rr])
        out[f"{thn} N{N}"] = {"mean_max_chi_frac_by_m": chi_frac.mean(0).tolist(),
                              "max_below_half": float(chi_frac[:, : max(1, N // 2 - 2)].max())}
    return out


# ---------------------------------------------------------------------------
# Section 8 spot check (independent brute force at N_E = 10)
# ---------------------------------------------------------------------------

def brute_best_half(psi, n_env):
    n = n_env + 1
    p = [float(np.sum(np.abs(psi.reshape(2, -1)[s]) ** 2)) for s in (0, 1)]
    rhoS = v1.reduced_dm_pure(psi, n, [0])
    SS = v1.ent_dm(rhoS)
    m = n_env // 2
    best = 1.0
    for F in itertools.combinations(range(1, n_env + 1), m):
        r = v1.reduced_dm_pure(psi, n, [0] + list(F))
        d = 2 ** m
        r4 = r.reshape(2, d, 2, d)
        blocks = [r4[s, :, s, :] for s in (0, 1)]
        chi = v1.ent_dm(blocks[0] + blocks[1]) - sum(p[s] * v1.ent_dm(blocks[s] / p[s]) for s in (0, 1))
        best = min(best, (SS - chi) / SS)
    return best


def spot_check(quick):
    rows = []
    cfgs = [(1.0, 0.25, "hom", "VC", 2.0), (2.0, 0.0, "inh", "VB", 1.5), (0.5, 0.75, "hom", "VA", 3.0),
            (1.0, 0.0, "hom", "V0", 2.5), (0.0, 0.25, "inh", "VC", 1.0)]
    N = 8 if quick else 10
    for (J, hS, g, V, t) in cfgs:
        nt = int(round(t / 0.25))
        Vs = m2_evolve(N, J, hS, g, V, t, nt)
        psi = (Vs[-1][:, 0] + Vs[-1][:, 1]) / math.sqrt(2)
        eng = process_state(psi, N)["best_d"][N // 2 - 1]
        bf = brute_best_half(psi, N)
        rows.append({"cfg": [J, hS, g, V, t], "engine": eng, "brute": bf, "diff": abs(eng - bf)})
    return rows


# ---------------------------------------------------------------------------
# JSON helpers, figures, report
# ---------------------------------------------------------------------------

def clean(o):
    if isinstance(o, dict):
        return {str(k): clean(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return [clean(v) for v in o]
    if isinstance(o, np.ndarray):
        return clean(o.tolist())
    if isinstance(o, (np.floating,)):
        return float(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, float) and (math.isnan(o) or math.isinf(o)):
        return None
    return o


def fig_sample(by_model, n=4000):
    rng = np.random.default_rng(seed(9, 300))
    out = {}
    for mdl, sel in (("M1a", lambda r: True), ("M2", lambda r: r["open"]), ("M4", lambda r: r["open"]),
                     ("M3", lambda r: True)):
        X, D, Rr = [], [], []
        for r in by_model.get(mdl, []):
            if not sel(r):
                continue
            q = _elig_frags(r)
            if q is None:
                continue
            X.append(q[0]); D.append(q[1]); Rr.append(q[2])
        if X:
            X, D, Rr = np.concatenate(X), np.concatenate(D), np.concatenate(Rr)
            idx = rng.choice(len(X), size=min(n, len(X)), replace=False)
            out[mdl] = {"x": X[idx].tolist(), "d": D[idx].tolist(), "r": Rr[idx].tolist()}
    return out


def figures(A, suffix=""):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except Exception as e:  # pragma: no cover
        return {"error": str(e)}
    files = {}
    S = A.get("fig_sample", {})
    fig, ax = plt.subplots(1, 2, figsize=(11, 4.2))
    cols = {"M1a": "k", "M2": "tab:blue", "M4": "tab:orange", "M3": "tab:green"}
    xs = np.linspace(0.05, 12, 300)
    for mdl, d in S.items():
        ax[0].scatter(d["x"], d["d"], s=2, alpha=0.25, color=cols[mdl], label=mdl)
        ax[1].scatter(d["x"], d["r"], s=2, alpha=0.25, color=cols[mdl], label=mdl)
    ax[0].plot(xs, d_ref(xs, 1e3), "r-", lw=1.5, label="D_ref (x_E large)")
    ax[0].set_yscale("log"); ax[0].set_xlabel("x(F) = sum of site Chernoff rates (nats)")
    ax[0].set_ylabel("delta_chi(F)"); ax[0].legend(markerscale=4, fontsize=8)
    ax[1].axhline(math.log(1.25), color="r", lw=0.8); ax[1].axhline(-math.log(1.25), color="r", lw=0.8)
    ax[1].set_xlabel("x(F)"); ax[1].set_ylabel("r(F) = ln(delta_chi / D_ref)")
    ax[1].set_ylim(-6, 3)
    fig.suptitle("T3: fragment deficit against the local-rate budget (eligible fragments, subsample)")
    fig.tight_layout()
    f = os.path.join(OUT, f"fig1_collapse_phase4{suffix}.png"); fig.savefig(f, dpi=130); plt.close(fig)
    files["fig1"] = os.path.basename(f)
    # fig2 T4
    fig, ax = plt.subplots(1, 3, figsize=(12, 3.8), sharey=True)
    for i, mdl in enumerate(("M2", "M3", "M4")):
        t4 = A["T4"].get(mdl, {})
        for tc, c in t4.get("cells", {}).items():
            for tt in c["times"]:
                col = {"FLOOR": "tab:red", "DECAY": "tab:blue", "UNDECIDED": "0.6"}[tt["class"]]
                ax[i].plot([8, 10, 12], [max(tt["d8"], 1e-12), max(tt["d10"], 1e-12), max(tt["d12"], 1e-12)],
                           color=col, lw=0.5, alpha=0.4)
        ax[i].set_yscale("log"); ax[i].set_title(f"{mdl}: delta_half vs N_E"); ax[i].set_xlabel("N_E")
        ax[i].axhline(0.05, color="k", lw=0.6, ls="--"); ax[i].axhline(0.01, color="k", lw=0.6, ls=":")
    ax[0].set_ylabel("best half-size fragment deficit")
    fig.suptitle("T4: red = FLOOR, blue = DECAY, grey = UNDECIDED (per cell and time)")
    fig.tight_layout()
    f = os.path.join(OUT, f"fig2_floor_phase4{suffix}.png"); fig.savefig(f, dpi=130); plt.close(fig)
    files["fig2"] = os.path.basename(f)
    # fig3 T3c
    fig, ax = plt.subplots(figsize=(6, 4))
    for key, v in A["T3c"]["d_star"].items():
        row = [(d, p) for d, p, _, _ in v["row"] if p is not None]
        if row:
            ax.plot([a for a, _ in row], [b for _, b in row], "o-", ms=3, label=key)
    ax.axhline(0.5, color="k", lw=0.6, ls="--")
    ax.set_xlabel("brickwork depth d"); ax.set_ylabel("fraction of draws passing C2")
    ax.legend(fontsize=6, ncol=2); fig.tight_layout()
    f = os.path.join(OUT, f"fig3_depth_phase4{suffix}.png"); fig.savefig(f, dpi=130); plt.close(fig)
    files["fig3"] = os.path.basename(f)
    # fig4 T6
    fig, ax = plt.subplots(figsize=(6, 4))
    for mdl, c in A["T6"]["curves"].items():
        n = len(c["median"])
        f_o = np.arange(1, n + 1) / n
        ax.plot(f_o, c["median"], "o-", label=f"{mdl} median")
        ax.plot(f_o, c["min"], "--", label=f"{mdl} min")
    ax.set_xlabel("observer fraction f_O = |O| / (N_E + 1)"); ax.set_ylabel("delta_self = 1 - D_O (best O)")
    ax.legend(fontsize=7); fig.tight_layout()
    f = os.path.join(OUT, f"fig4_self_phase4{suffix}.png"); fig.savefig(f, dpi=130); plt.close(fig)
    files["fig4"] = os.path.basename(f)
    return files


def _f(x, nd=3):
    if x is None:
        return "-"
    if isinstance(x, bool):
        return str(x)
    if isinstance(x, (int, np.integer)):
        return str(int(x))
    x = float(x)
    if x != 0 and (abs(x) < 1e-3 or abs(x) >= 1e4):
        return f"{x:.2e}"
    return f"{x:.{nd}f}"


def _rob(A, which):
    if which == "T3" and A["T3"]["overall"] == "INCONCLUSIVE":
        return "not ROBUST (no verdict to test)"
    return "ROBUST" if A[f"{which}_robust"] else "grid-dependent"


def report(A, suffix=""):
    M = A["meta"]
    L = []
    w = L.append
    w("# CRT v12, phase 4: how close can parts get to the whole?\n")
    w(f"Generated by `python3 run_v12d.py{' --quick' if suffix else ''}` (master seed {MASTER_SEED_V12D}), "
      f"Python {M['python']}, numpy {M['numpy']}, scipy {M['scipy']}, {M['workers']} workers, "
      f"wall time {M['wall_s']:.0f} s.\n")
    w("Pre-registration: docstring of `run_v12d.py`, commit 0170e16, pushed to GitHub on branch `paper-v12` "
      "(push event 2026-10-30T20:56:47Z) before any phase-4 code existed. The implementation is appended below "
      "the unchanged docstring. Verdicts below apply the pre-stated rules only; post-hoc material is in a "
      "separate, labelled section.\n")
    if M.get("fallback_used"):
        w("**Budget fallback used:** " + M["fallback_used"] + "\n")
    else:
        w("Budget: the full grid and the full robustness grid ran; the pre-stated fallback was not needed.\n")
    w("## Pre-registered results\n")
    T3, T4 = A["T3"], A["T4"]
    w("| Test | Kind (stated in advance) | Verdict | Key numbers |")
    w("|---|---|---|---|")
    w(f"| L1-L9 limit checks | derivable | {'PASS' if M['tests_passed'] else 'FAIL'} | test_v12d.py, run before any study |")
    t1 = A["T1"]
    w(f"| T1 strict positivity | derivable | **{t1['verdict']}** | (a) {t1['a']['n_frag']} fragments, "
      f"delta_I = 0 only where I(S:F-bar) = 0 ({t1['a']['n_zero']} cases); (b) max abs delta_chi at theta = pi/2: "
      f"{_f(t1['b_max_abs_delta_chi'])}; (c) violations {t1['c']['violations']} over {t1['c']['n_states_checked']} states |")
    t2 = A["T2"]
    w(f"| T2 product class | derivable (asymptotic) | **{t2['verdict']}** | (a) max abs(delta_chi - D_ref) = "
      f"{_f(t2['a_max_dev'])}; (d) unequal priors C1 fail and C2 pass in all eligible states: {t2['d_behaves']} |")
    w(f"| T3 collapse (M2, M4) | **open, primary** | **{T3['overall']}** | M2: {T3['M2']['verdict']} "
      f"({T3['M2']['n_elig']} eligible open cells, C1 {_f(T3['M2'].get('frac_C1'))}, C2 {_f(T3['M2'].get('frac_C2'))}); "
      f"M4: {T3['M4']['verdict']} ({T3['M4']['n_elig']} eligible cells) |")
    w(f"| T3b shared curve | open, secondary | **{A['T3b']['verdict']}** | {_f(A['T3b']['frac_bins_within'])} of "
      f"{A['T3b']['n_bins']} bins within ln 1.5; permutation p = {_f(A['T3b']['perm_p'])} |")
    pc = A["T3c"]["prior_check"]
    w(f"| T3c depth crossover (M3) | open, secondary (prior stated) | reported | d* found in {pc['n_with_dstar']} of "
      f"{pc['n_total']} (theta, N_E); d* <= 3 in {pc['n_dstar_le3']}; r < 0 at d* in {pc['n_r_neg']} |")
    w(f"| T4 structural floor | open, secondary | S = **{A['S_main']}** (main grid) | " + "; ".join(
        f"{k}: {v['n_elig']} cells, FLOOR {_f(v['frac_FLOOR'])}, DECAY {_f(v['frac_DECAY'])}" for k, v in T4.items()) + " |")
    h5 = A["T5"]["H5"]
    w(f"| T5 consensus (H5) | open in part | **{h5['verdict']}** | {_f(h5['frac_within'])} of {h5['n_elig']} "
      f"eligible M2/M4 points within ln 1.25 of the conditional-independence law; L9 product max dev "
      f"{_f(A['T5']['L9_max_dev'])} |")
    t6 = A["T6"]
    w(f"| T6 self-measurement | derivable + descriptive | (a) {'PASS' if (t6['L6_product_maxdev'] or 0) < 1e-10 and t6['pointer_conserving_maxD_inE'] < 1e-10 else 'FAIL'}; "
      f"(b) **{t6['b_verdict']}** | product max dev {_f(t6['L6_product_maxdev'])}; pointer-conserving max D_O (O in E) "
      f"{_f(t6['pointer_conserving_maxD_inE'])}; D(whole) min {_f(t6['D_whole_min'])}; fidelity-bound violations {t6['fid_viol']} |")
    R = A["R"]
    w(f"| Robustness (Section 6) | pre-registered | T3: {_rob(A, 'T3')}; "
      f"S: {'ROBUST' if A['S_robust'] else 'grid-dependent'} | R-grid T3 = {R['T3']['overall']}; R-grid S = {R['S']} |")
    w("")
    w("**Pre-stated summary sentence (Section 7), filled in:** \"In these models the measurable deficit is "
      f"[W true by theorem]; [S: {A['S_final']}]; [L: {T3['overall']}]; robustness "
      f"[T3 {_rob(A, 'T3')}, S {'ROBUST' if A['S_robust'] else 'grid-dependent'}].\"\n")
    w("### Section 8 code checks\n")
    s8 = A["sec8"]
    w(f"- max |chi(E) from the engine - S(rho_S)| = {_f(s8['max_chiE_check'])} (limit 1e-9).")
    w(f"- L4 violations (chi > min(I, H(S_Pi)) + 1e-9): {s8['L4_viol']}; J_H > chi violations: {s8['J_le_chi_viol']}.")
    w("- Spot checks of the N_E = 10 half-size minimum against an independent brute force (dense partial traces "
      "from run_v12): " + "; ".join(f"{_f(r['engine'], 6)} vs {_f(r['brute'], 6)}" for r in A["spot"]) +
      f" (max diff {_f(max(r['diff'] for r in A['spot']))}).")
    w(f"- Derivable controls run with the main grid (L7: M2 J = h_S = 0, V0; M4 lambda = mu = 0): "
      f"{A['L7_run']['n_states']} states, max |delta_chi - D_ref| = {_f(A['L7_run']['max_dev'])}.\n")
    w("### T1 (derivable)\n")
    w(f"- (a) min delta_I per model: " + ", ".join(f"{k} {_f(v)}" for k, v in t1["a"]["min_dI_by_model"].items()) +
      f". Fragments with delta_I <= 1e-10: {t1['a']['n_zero']}, all with I(S:F-bar) < 1e-9: "
      f"{t1['a']['n_zero'] == t1['a']['zero_with_uncorr_complement']}.")
    w(f"- (b) CNOT (theta = pi/2), N_E = 8 and 12: max |delta_chi(F)| over all evaluated F = {_f(t1['b_max_abs_delta_chi'])}: "
      "one site holds the whole pointer fact exactly.")
    w(f"- (c) numerically-zero deficits where the local rates predict a resolvable one: {t1['c']['violations']}; "
      f"negative deficits: {t1['c']['negatives']}.\n")
    w("### T2 (product class)\n")
    w("| variant | states | eligible | frac C1 | frac C2 |")
    w("|---|---|---|---|---|")
    for v, lab in (("b", "inhomogeneous pure"), ("c", "hazy"), ("d", "unequal priors")):
        x = t2[v]
        w(f"| {lab} | {x['n']} | {x['n_elig']} | {_f(x['frac_C1'])} | {_f(x['frac_C2'])} |")
    w("")
    w("Hazy rows (C1 and C2 per state; q95 values are the 95th percentiles of |r| and |r - median r|):\n")
    w("| cell | C1 | C2 | q95 abs r | q95 abs(r - med) | median r |")
    w("|---|---|---|---|---|---|")
    for x in t2["c"]["rows"]:
        w(f"| {x['cell']} | {x['C1']} | {x['C2']} | {_f(x['q1'])} | {_f(x['q2'])} | {_f(x['med'])} |")
    w("")
    w("### T3 (open, primary)\n")
    w("Residual r(F) = ln[delta_chi(F) / D_ref(F)] over all eligible fragments (1e-4 <= delta_chi <= 0.5, "
      "x(F) >= 0.05) of eligible states (chi(E) >= 0.5, >= 10 eligible fragments); C1: q95(|r|) <= ln 1.25; "
      "C2: q95(|r - median r|) <= ln 1.25; a cell passes if >= 80% of its eligible states pass; a cell needs >= 3 "
      "eligible states.\n")
    w("| model | open cells | eligible cells | frac C1 [95% boot] | frac C2 [95% boot] | median r | frac cells r<0 | verdict |")
    w("|---|---|---|---|---|---|---|---|")
    for k in ("M2", "M4"):
        x = T3[k]
        w(f"| {k} | {x['n_cells']} | {x['n_elig']} | {_f(x.get('frac_C1'))} {x.get('ci_C1', '')} | "
          f"{_f(x.get('frac_C2'))} {x.get('ci_C2', '')} | {_f(x.get('med_r'))} | {_f(x.get('frac_r_neg'))} | {x['verdict']} |")
    w(f"\nOverall T3 verdict: **{T3['overall']}**.\n")
    w("Why M4 is INCONCLUSIVE: each M4 cell is one final state, and the pre-registered rule requires >= 3 eligible "
      "states per cell. This is a defect of the pre-registration (the rule was written with time series in mind); "
      "the per-state reading is given in the post-hoc section.\n")
    w("Breakdown of M2 (same rules, no verdict):\n")
    w("| subset | eligible cells | frac C1 | frac C2 | median r | rule category |")
    w("|---|---|---|---|---|---|")
    for k, x in A["T3_breakdown"].items():
        w(f"| {k} | {x['n_elig']} | {_f(x.get('frac_C1'))} | {_f(x.get('frac_C2'))} | {_f(x.get('med_r'))} | {x['verdict']} |")
    w("\nSensitivity (pre-registered, no verdict):\n")
    w("| variant | M2 frac C1 | M2 frac C2 | M2 | M4 | overall |")
    w("|---|---|---|---|---|---|")
    for k, x in A["T3_sensitivity"].items():
        w(f"| {k} | {_f(x['M2'].get('frac_C1'))} | {_f(x['M2'].get('frac_C2'))} | {x['M2']['verdict']} | "
          f"{x['M4']['verdict']} | {x['overall']} |")
    w("\n**T3b** (shared curve other than D_ref; M1(a), M2 open, M4 open): " +
      f"{A['T3b']['verdict']}; {_f(A['T3b']['frac_bins_within'])} of {A['T3b']['n_bins']} bins have model-median spread "
      f"<= ln 1.5; fragments per model {A['T3b']['n_frag']}; permutation p = {_f(A['T3b']['perm_p'])}.\n")
    w("**T3c** (M3 depth crossover; C2 pass fraction over draws):\n")
    w("| theta, N_E | d* | median r at d* | (d, pass fraction, eligible draws) |")
    w("|---|---|---|---|")
    for k, v in A["T3c"]["d_star"].items():
        w(f"| {k} | {_f(v['d_star'])} | {_f(v['med_r_at_dstar'])} | " +
          ", ".join(f"({d}, {_f(p, 2)}, {ne})" for d, p, ne, _ in v["row"]) + " |")
    w(f"\nAuthor's prior (d* <= 3, r < 0): d* <= 3 in {pc['n_dstar_le3']} of {pc['n_with_dstar']} cases with a d*; "
      f"r < 0 at d* in {pc['n_r_neg']}.\n")
    w("**T3s** (scalar rate, best fragment per size, homogeneous cells; no verdict):\n")
    w("| model | rate | states | frac C1 | frac C2 | median r |")
    w("|---|---|---|---|---|---|")
    for mdl, v in A["T3s"].items():
        for lab, x in v.items():
            w(f"| {mdl} | {lab} | {x['n']} | {_f(x['frac_C1'])} | {_f(x['frac_C2'])} | {_f(x['med_r'])} |")
    w("\n### T4 (open, structural floor)\n")
    w("delta_half(N_E) = best fragment of size N_E/2; FLOOR if delta_half(12) >= 0.05 and >= 0.8 delta_half(8); DECAY "
      "if delta_half(12) < 0.01 or <= 0.5 delta_half(8); a cell is FLOOR/DECAY if >= 2/3 of its eligible times are. "
      "N_E = 12 minima are over the sampled fragment set (upper bounds on the true minimum deficit).\n")
    w("| model | eligible cells | FLOOR | DECAY | UNDECIDED |")
    w("|---|---|---|---|---|")
    for k, v in T4.items():
        c = v["counts"]
        w(f"| {k} | {v['n_elig']} | {c['FLOOR']} | {c['DECAY']} | {c['UNDECIDED']} |")
    w(f"\nS verdict (main grid): **{A['S_main']}**. Breakdown by pointer conservation (reported):\n")
    w("| subset | cells | FLOOR | DECAY | UNDECIDED |")
    w("|---|---|---|---|---|")
    for k, x in A["T4_breakdown"].items():
        w(f"| {k} | {x['n']} | {x['FLOOR']} | {x['DECAY']} | {x['UNDECIDED']} |")
    w("\nLast-fragment deficit delta_chi(m = N_E - 1) (descriptive): " +
      "; ".join(f"{k}: median {_f(v['median'])}, p90 {_f(v['p90'])}, max {_f(v['max'])}" for k, v in A["T4_last_fragment"].items()) + "\n")
    w("### T5 (consensus)\n")
    t5 = A["T5"]
    w(f"- L9 (product, derivable): max |delta_cons - delta_cons^ci| = {_f(t5['L9_max_dev'])}.")
    w(f"- H5: {_f(h5['frac_within'])} of {h5['n_elig']} eligible M2/M4 points within ln 1.25 -> **{h5['verdict']}**.")
    w(f"- Finite counts (N = 1e4, B = 1000): exact delta_cons inside the percentile interval in "
      f"{_f(t5['finite_cover'])} of points; conditional-independence permutation test p < 0.01 in "
      f"{_f(t5['perm']['frac_p_lt_0.01'])} of {t5['perm']['n']} open k >= 2 points.\n")
    w("| model | params | k | m | observer | delta_cons | delta_cons^ci | log ratio | delta-hat [95%] | perm p |")
    w("|---|---|---|---|---|---|---|---|---|---|")
    for r in t5["rows"]:
        if r["model"] == "M1" and r["k"] not in (2, 4):
            continue
        lr = math.log(r["delta"] / r["delta_ci"]) if r["delta"] > 0 and r["delta_ci"] > 0 else None
        w(f"| {r['model']} | {r['par']} | {r['k']} | {r['m']} | {r['obs']} | {_f(r['delta'])} | {_f(r['delta_ci'])} | "
          f"{_f(lr)} | {_f(r['delta_hat'])} [{_f(r['delta_ci95'][0])}, {_f(r['delta_ci95'][1])}] | {_f(r.get('perm_p'))} |")
    w("\n### T6 (self-measurement)\n")
    w(f"- (a) product: max |D_O - prod_(k not in O)|cos theta_k|| = {_f(t6['L6_product_maxdev'])}; pointer-conserving "
      f"dynamics (M2 h_S = h_y = 0, M3, M4 lambda = 0): max D_O over O inside E = {_f(t6['pointer_conserving_maxD_inE'])}; "
      f"the whole: min D = {_f(t6['D_whole_min'])}.")
    w(f"- (b) D_O <= sqrt(1 - F^2): {t6['fid_viol']} violations, largest D - sqrt(1-F^2) = {_f(t6['fid_worst_gap'])}.")
    for mdl, c in t6["curves"].items():
        w(f"- (c) {mdl} ({c['n']} states): median delta_self by |O| = 1..{len(c['median'])}: " +
          ", ".join(_f(x, 3) for x in c["median"]) + f"; min: " + ", ".join(_f(x, 3) for x in c["min"]) +
          f"; max D_O for O inside E in non-conserving states: {_f(c['max_D_inE_nonconserving'])}. "
          f"Prior (delta_self >= 0.5 for f_O <= 1/2) holds in {_f(t6['prior'][mdl]['frac_states_holding'])} of states.")
    w("\n### Haar control (derivable)\n")
    for k, v in A["HAAR"].items():
        w(f"- {k}: mean best chi(F)/chi(E) by m = " + ", ".join(_f(x, 3) for x in v["mean_max_chi_frac_by_m"]) +
          f"; max over draws for m <= N_E/2 - 2: {_f(v['max_below_half'])}.")
    w("\n### Robustness grid (Section 6)\n")
    w(f"- T3 on the R grid (M2 N_E = 10 cells, M4 cells): M2 {R['T3']['M2']['verdict']} ({R['T3']['M2']['n_elig']} eligible "
      f"cells), M4 {R['T3']['M4']['verdict']} ({R['T3']['M4']['n_elig']}); overall {R['T3']['overall']}. "
      f"T3 is {_rob(A, 'T3')}.")
    w("- T4 on the R grid: " + "; ".join(f"{k}: {v['n_elig']} cells, FLOOR {v['counts']['FLOOR']}, DECAY "
                                          f"{v['counts']['DECAY']}, UNDECIDED {v['counts']['UNDECIDED']}"
                                          for k, v in R["T4"].items()) +
      f"; S on R = {R['S']} (main grid restricted to M2, M4: {R['S_main_M2M4']}). S is "
      f"{'ROBUST' if A['S_robust'] else 'grid-dependent'}.\n")
    w("## Implementation choices not fixed by the pre-registration\n")
    w("Made before any phase-4 result was computed, except where marked.\n")
    for c in IMPL_CHOICES:
        w(f"- {c}")
    for c in M.get("disclosures", []):
        w(f"- {c}")
    w("\n## Post-hoc (not pre-registered; no verdicts)\n")
    ph = A["T3_posthoc_M4_states"]
    w(f"- M4 read per state (each cell has one state): {ph['n_elig']} of {ph['n']} open states eligible; frac C1 "
      f"{_f(ph['frac_C1'])}, frac C2 {_f(ph['frac_C2'])}, median r {_f(ph['med_r'])}, median q95|r - med| {_f(ph['q2_med'])}.")
    rr = A["R"]["T3_posthoc_M2_allN"]["M2"]
    w(f"- T3 on the R grid with M2 at all three N_E (18 cells): {rr['n_elig']} eligible, frac C1 {_f(rr.get('frac_C1'))}, "
      f"frac C2 {_f(rr.get('frac_C2'))}, category {rr['verdict']}.")
    p2 = A["T5"]["H5_posthoc_k2_open"]
    w(f"- H5 restricted to k >= 2 and open points: {p2['n']} points, frac within ln 1.25 {_f(p2['frac_within'])}, "
      f"median log ratio {_f(p2['median_log_ratio'])}.")
    notes = os.path.join(OUT, f"REPORT_phase4_notes{suffix}.md")
    if os.path.exists(notes):
        w("")
        w(open(notes).read())
    w("\n## Figures\n")
    for k, f in A.get("figures", {}).items():
        w(f"- `{f}`")
    with open(os.path.join(OUT, f"REPORT_phase4{suffix}.md"), "w") as fh:
        fh.write("\n".join(L) + "\n")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_tests():
    import test_v12d as T
    ok = True
    for name, fn in list(vars(T).items()):
        if name.startswith("test_") and callable(fn):
            try:
                fn()
            except Exception as e:  # pragma: no cover
                print(f"TEST FAILED {name}: {e!r}")
                ok = False
    return ok


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--report-only", action="store_true")
    ap.add_argument("--dry", action="store_true", help="time 5%% of the tasks and extrapolate")
    ap.add_argument("--workers", type=int, default=2)
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    suffix = "_quick" if args.quick else ""
    jpath = os.path.join(OUT, f"results_v12d{suffix}.json")
    if args.report_only:
        with open(jpath) as fh:
            A = json.load(fh)
        A["figures"] = figures(A, suffix)
        report(A, suffix)
        return
    t0 = time.time()
    tasks = tasks_all(args.quick)
    items = [(k, a) for k in ("M2", "M3", "HAAR", "M2R", "M1", "M4", "M4R", "T5") for a in tasks[k]]
    if args.dry:
        rng = np.random.default_rng(1)
        tot = 0.0
        for k in tasks:
            if not tasks[k]:
                continue
            n = max(1, int(round(0.05 * len(tasks[k]))))
            sel = rng.choice(len(tasks[k]), size=n, replace=False)
            dt = sum(_run_one((k, tasks[k][i]))[3] for i in sel)
            est = dt / n * len(tasks[k])
            tot += est
            print(f"{k}: {len(tasks[k])} tasks, sampled {n}, est {est:.0f} s CPU")
        print(f"total est {tot:.0f} s CPU, {tot / args.workers / 60:.1f} min wall on {args.workers} workers")
        return
    log = open(os.path.join(OUT, f"run_v12d{suffix}.log"), "w")

    def say(msg):
        line = f"[{time.time() - t0:7.1f} s] {msg}"
        print(line, flush=True)
        log.write(line + "\n"); log.flush()

    say("unit tests (L1-L9) before any study")
    tests_ok = run_tests()
    say(f"tests passed: {tests_ok}")
    if not tests_ok:
        say("STOP: a limit check failed (Section 8)")
        return
    # order: N_E = 12 tasks first for load balance
    def _n_of(it):
        k, a = it
        if k in ("M2", "M2R", "HAAR", "M4", "M4R"):
            return a[1]
        if k in ("M3", "M1"):
            return a[2]
        return 10
    items.sort(key=lambda it: -_n_of(it))
    by_model, t5rows, times = {}, [], {}
    with Pool(args.workers) as pool:
        for i, (key, a, res, dt) in enumerate(pool.imap_unordered(_run_one, items, chunksize=1)):
            times[key] = times.get(key, 0.0) + dt
            if key == "T5":
                t5rows.extend(res)
            else:
                for r in res:
                    by_model.setdefault(r["model"], []).append(r)
            if (i + 1) % 50 == 0 or i + 1 == len(items):
                say(f"{i + 1}/{len(items)} tasks done")
    say("CPU seconds by study: " + ", ".join(f"{k} {v:.0f}" for k, v in times.items()))
    t5rows.sort(key=lambda r: (r["model"], str(r["par"]), r["k"], r["m"], r["obs"]))
    say("spot checks (Section 8)")
    spot = spot_check(args.quick)
    meta = {"python": platform.python_version(), "numpy": np.__version__, "scipy": scipy.__version__,
            "workers": args.workers, "tests_passed": tests_ok, "cpu_s": times, "fallback_used": None,
            "disclosures": DISCLOSURES}
    say("analysis")
    A = analyze(by_model, t5rows, meta)
    A["spot"] = spot
    A["fig_sample"] = fig_sample(by_model)
    A["states"] = [{k: v for k, v in r.items() if k not in ("fx", "fd", "fm", "fw")} for m in by_model.values()
                   for r in m]
    stop = []
    if A["sec8"]["max_chiE_check"] > 1e-9:
        stop.append("chi(E) check")
    if max(r["diff"] for r in spot) > 1e-9:
        stop.append("spot check")
    if A["T1"]["verdict"] != "PASS":
        stop.append("T1")
    if A["T6"]["b_verdict"] != "PASS":
        stop.append("T6(b)")
    A["sec8"]["stop_conditions_triggered"] = stop
    A["meta"]["wall_s"] = time.time() - t0
    A["figures"] = figures(A, suffix)
    with open(jpath, "w") as fh:
        json.dump(clean(A), fh)
    A = json.loads(json.dumps(clean(A)))
    report(A, suffix)
    say(f"done; stop conditions triggered: {stop}")


DISCLOSURES = [
    "Bug found by the unit tests before any run: the trace distance for large observers used non-Hermitian "
    "eigenvalues (errors ~1e-8 on exactly-zero differences); replaced by a QR form, exact to round-off.",
    "Bug fixed after the --quick smoke run: the T6(b) fidelity used scipy sqrtm on rank-deficient marginals "
    "(errors up to 1e-5, giving 1175 spurious violations of D <= sqrt(1 - F^2)); replaced by the exact Uhlmann "
    "form F = ||Mp^dag Mm||_1. No rule changed.",
    "Labelling fix after the smoke run: an INCONCLUSIVE T3 verdict that is also INCONCLUSIVE on the robustness "
    "grid is not called ROBUST (there is no verdict to be robust). No rule changed.",
    "Seen in the smoke run, not changed: the pre-registered T2(d) expectation (unequal priors fail C1) is wrong. "
    "For pure branches the asymptotic deficit is p q log2(p/q) |gamma|^2 / ((p - q) H(p)), against "
    "|gamma|^2 / (2 ln 2) for p = 1/2: a ratio of 1.025 at p0 = 0.8 and 1.086 at p0 = 0.95, inside ln 1.25. "
    "p0 = 0.95 is ineligible anyway (chi(E) <= H(0.95) = 0.29 < 0.5). The T2 verdict is applied as written.",
]

if __name__ == "__main__":
    main()
