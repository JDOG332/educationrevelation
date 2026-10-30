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
