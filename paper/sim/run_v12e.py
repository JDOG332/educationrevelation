"""
run_v12e.py: CRT v12, phase 5. Fix phase 3 and retest: once the model
symmetries that forced the phase-3 equality are broken, does responsive
agreement (RA) still track observer consensus, and in particular Touil, Yan
& Zurek's fragment-level refined consensus, not only the records-level
analogue used in phase 3?

THIS FILE IS A PRE-REGISTRATION ONLY. No phase-5 code exists yet and no
phase-5 quantity has been computed. The implementation will be appended
below this docstring in a later commit; this docstring will not be edited
after the pre-registration commit (corrections, if any, go in the report).
The commit is local on branch paper-v12. Until the author pushes it, its
only timestamp is the commit order. (Phase-3 referee, minor issue: the
phase-3 tag was never pushed. A push of this commit, or of a tag on it,
before any run is the author's decision.)

Before this plan was written the following were done, and nothing else:
  - reading run_v12c.py, test_v12c.py, referee_v12c/REPORT.md and its
    script outputs, run_v12d.py (docstring) and referee_v12d/REPORT.md;
  - a web literature search (Section 0);
  - one timing benchmark: a generic sparse chain Hamiltonian evolved with
    expm_multiply at N_E = 10, 14, 16, 18 (24 times, one 7-qubit reduced
    density matrix per time). No RA, no consensus quantity, no record law
    and no phase-5 Hamiltonian cell was computed. Timings are in Section 10.

Who wrote what: the author is Jeffrey M. Sellers, an amateur. The code and
this plan are written by an AI system (Claude) at his direction. The
referee reports cited here were also written by AI systems.

=============================================================================
0. Literature check (web search, 2026-10-31; not exhaustive)
=============================================================================
What was searched: about ten web queries on interventional or causal
measures of quantum Darwinism and objectivity, effective information and
co-information in quantum Darwinism, follow-ups to "refined consensus",
and time-reversal / reciprocity identities in quantum Darwinism models.
TYZ was read in its HTML v1 version (equations and the model section).
The other papers were read only as abstracts or summaries.

Findings:
  Q1 Touil, Yan & Zurek, "Consensus about classical reality in a quantum
     universe", arXiv:2503.14791 (2025) [TYZ]. Definitions used here:
       - consensus  c(F:F') = I(F:F') / H_S                        (Eq. 7);
       - refined mutual information
           Im(F:F'|S_Lambda) = I(F:F') - I(F:F'|S_Lambda)            (Eq. 19);
         the conditional term is the average over the outcomes of a
         measurement of the observable Lambda on S (Eqs. 6, 20, and the
         proof of their Theorem 2);
       - observable-dependent refined consensus Im(F:F'|S_Lambda)/H_S
                                                                    (Eq. 23).
     Further points from the paper:
       - The unlabelled Im(F:F'|S) assumes an "optimal measurement" that is
         not defined further.
       - Im can be negative.
       - TYZ do not intervene on S. They say direct measurement "would
         re-prepare" S and invalidate past records.
       - Their spin model (Eq. 24) is sigma_z^S (x) sum d_i Z_i plus
         ZZ couplings inside E, with S and E starting in |+>. It conserves
         the pointer. So TYZ never meet a precessing pointer, which is the
         case where an intervention and an S measurement can differ.
  Q2 Nothing found that compares an interventional (do-type) consensus
     with TYZ's refined consensus, in any model, with or without broken
     symmetries. Nothing found that names the reciprocity / chiral identity
     that the phase-3 referee derived.
  Q3 Close work, none of which intervenes on S:
       - Ericson, Wang & van Enk, arXiv:2606.07880 (2026): a quantum
         partial information decomposition (redundant / unique /
         synergistic), applied to imperfect-CNOT quantum Darwinism. The
         Pauli encodings there are capacity definitions, not interventions
         inside the dynamics.
       - Kuang, Nagasawa, Torii & Buscemi, arXiv:2608.17410: measurement
         objectivity from retrodiction. No intervention on S, no TYZ.
       - Lasek & P. Horodecki, arXiv:2609.20823 (2026): imperfect-CNOT
         records with local fields. They test a rotated S basis. No
         consensus measure, no intervention.
       - Tank, arXiv:2509.17775 (functional information); Rivlin, Engineer
         & Baumann, arXiv:2507.21221 (Wigner's friend with quantum
         Darwinism).
     Classical background, as the phase-3 referee already noted:
       - I(X:r) under a uniformly randomised do(X) is Ay & Polani's
         information flow (2008) and Hoel, Albantakis & Tononi's effective
         information (2013).
       - RA is McGill's co-information of the intervened input with two
         outputs.
       - Quantum causal models: Ried et al. 2015; Allen et al. 2017;
         Chiribella & Ebler 2019.
       - Channel formulation of quantum Darwinism: Brandão, Piani &
         Horodecki 2015.
Finding, stated plainly:
  - RA is a known construction with a new name; nothing here is a new
    measure.
  - The narrow question below (do two co-informations, one from an
    intervention and one from an S measurement, agree when the pointer
    precesses and the model has no hidden symmetry?) was not found in the
    literature.
  - It is a modest numerical question, not an open problem in the field.
Limits of the search:
  - A general web search engine, about ten queries, English only.
  - No citation tracking (no Google Scholar "cited by" for TYZ).
  - Only TYZ v1 was read; a later version may differ.
  - Abstracts only, for everything except TYZ.
  - Work published under other names (for example "causal objectivity",
    "process tomography of the S->E channel") can be missed.

=============================================================================
1. What phase 3 got wrong, and what this phase does about each point
=============================================================================
From referee_v12c/REPORT.md (issue numbers there):
  (1) The J = 0 equality RA = Im_rec followed from two model symmetries
      (Section 3). Here every cell is classified in advance by which
      symmetries it keeps. Cells where the equality is derivable are
      CONTROLS and are never counted as evidence.
  (2) The 0.1-bit rule failed just outside the grid (9 of 505 points,
      max 0.141), and the rule was lenient (the non-specific predictor
      I(r_A:r_B) under P_do failed only 4 times).
        - New, stricter rule, justified in Section 6.
        - A mandatory discrimination check: the rule must reject trivial
          predictors, or the test is INCONCLUSIVE.
        - A wider grid (Section 4).
        - A held-out grid (Section 8).
  (3) "Tracks TYZ" held only against the records-level analogue Im_rec.
      Here TYZ's own fragment-level quantity Im(F_A:F_B|S_Pi) is the
      PRIMARY target. It is compared with
        - RA_rec (records, as in phase 3), and
        - RA_q, the same intervention evaluated on the fragment states
          themselves (Section 2), which compares like with like.
  (4) do(S = X) in the pointer basis is a reset, which is operationally
      as good as read access. Here the observers are always described as
      "observers who can reset S in the pointer basis at random and choose
      not to read it". RA characterises the S -> E process (whether the
      dynamics would write S into E). It says nothing about whether
      records that already exist are about S. The phase-3 phrase
      "resolves the no-go" is not used.
  (5) RA is co-information (Section 0). No novelty is claimed for it.
  (6) T2's expectation was wrongly derived, and two T4 cells passed
      vacuously.
        - Every "derivable" label here comes with its derivation written
          out (Section 3).
        - Vacuous and thin cells are counted and reported (Section 6).
        - Phase 3's per-level null calibration, which was certain to fail
          at perfect agreement, is replaced by a permutation (shuffle)
          null test (Section 7, T-N).
  Minor:
    - f_resp (unstable at small I) is dropped.
    - L5 needs a uniform X to match S starting in |+>. The natural state is
      |+> throughout. A prior-matched version is reported as a secondary
      (Section 2).
From referee_v12d/REPORT.md (point 6(vi)):
  - Tolerances are set against float64 error with stated continuity
    bounds (Section 9).
  - "Stop" is defined (Section 9).
  - No coefficient choice puts the model at an isotropic Heisenberg point
    (no ZZ term is used, so XX, YY and ZZ coefficients are never equal).
    A hidden-identity audit catches any other disguised symmetry
    (Section 6).

=============================================================================
2. Definitions (bits; S = qubit 0; E = sites 1..N_E; S starts in |+>)
=============================================================================
Protocols:
  P_nat  S in |+>, E in |e0>, evolve to time t. Natural.
  P_do   a shared fair bit X; S reset to |X> (pointer basis sigma_z), E in
         |e0>, evolve to time t. Interventional. The observers know X and
         never read S.
  By linearity, |Psi_nat(t)> = (|Psi_0(t)> + |Psi_1(t)>)/sqrt2, where
  |Psi_x(t)> is the P_do state for X = x.
Fragments, for each m in {1, 2, 3}:
  - "ends":     F_A = sites 1..m, F_B = sites N_E-m+1..N_E;
  - "adjacent": F_A = sites 1..m, F_B = sites m+1..2m.
  The adjacent geometry is new. With hopping, neighbouring fragments share
  correlations that are not about S, which is exactly the case TYZ's
  refinement is designed for.
Two classical-quantum (cq) states on (classical bit) (x) F_A F_B:
  - interventional:  rho_do  = (1/2) sum_x |x><x| (x) rho^{do,x}_{F_A F_B};
  - natural, S measured in sigma_z at time t:
                     rho_nat = sum_s p_s |s><s| (x) rho^{nat|s}_{F_A F_B}.
For a cq-state with classical bit K, the co-information is
    CoI(K; F_A; F_B) = I(F_A:F_B) - I(F_A:F_B | K)
                     = I(K:F_A) + I(K:F_B) - I(K:F_A F_B).
Quantities (exact; statevectors and exact partial traces):
  Q1 RA_q    := CoI on rho_do. Fragment level, no observer. NEW in this
     phase. Bounded: RA_q <= min(I(X:F_A), I(X:F_B)) <= 1 bit, by strong
     subadditivity.
  Q2 TYZ_Pi  := CoI on rho_nat = Im(F_A:F_B|S_Pi), TYZ Eqs. 19 and 23 with
     Lambda = sigma_z. PRIMARY TARGET. (The chain rule gives
     I(F:F') - I(F:F'|S) = I(S:F) - I(S:F|F') for cq-states, so this is the
     same functional as Q1, applied to a different state.)
  Q3 RA_rec^obs := CoI of (X, r_A, r_B) under P_do. Records of observer
     type obs: Helstrom (minimum error between the P_do fragment states for
     x = 0, 1, phase-2 tie rule) or Local (sigma_z majority, fair coin on
     ties). As in phase 3.
  Q4 Im_rec^obs := CoI of (s(t), r_A, r_B) under P_nat, with the same
     observer POVMs as in Q3. This is phase 3's records-level analogue.
     It is always written "records-level Im_rec, same observers", never
     "TYZ".
  Q5 TYZ_opt := max over a fixed set D of measurement directions n of S of
     Im(F_A:F_B|S_n). D = +z, -z and 200 Fibonacci-sphere points. This is
     the author's reading of TYZ's undefined "optimal measurement".
     Secondary.
  Q6 TYZ_norm := TYZ_Pi / S(rho_S), TYZ's H_S normalisation, reported when
     S(rho_S) >= 0.1 bit. Secondary.
  Q7 RA_q^w := CoI on rho_do with prior P(X = s) = p_s(t), matched to the
     natural pointer populations at time t. Secondary; it separates the
     effect of unequal priors from the rest.
Gap decomposition (reported at every point, no verdict):
    TYZ_Pi - RA_rec^obs = (TYZ_Pi - RA_q)        [intervention vs S access]
                        + (RA_q - RA_rec^obs)    [what the observers' records lose]

=============================================================================
3. Symmetries, derived in advance
=============================================================================
Hamiltonian family, with g_k > 0 real:
  H = sum_k g_k P1_S (x) Y_k                              (S-E coupling)
      + (J/2) sum_k (X_k X_{k+1} + Y_k Y_{k+1})           (hopping)
      + lambda sum_k Y_k Y_{k+1}                          (YY Ising)
      + b sum_k Z_k                                       (Z field on E)
      + c sum_k Y_k                                       (Y field on E)
      + D sum_k (X_k Y_{k+1} - Y_k X_{k+1})               (DM-type term)
      + h n_S . sigma^S                                   (field on S)
The initial E state |e0> is either |0>^N_E (real) or |c>^N_E, with
|c> = cos(pi/8)|0> + e^{i pi/4} sin(pi/8)|1> (complex).

Notation: A_{xs} := (<s|_S (x) 1) U(t) |x>|e0>, the E-vector for "prepared
x, found s".

Lemma P (pointer conservation; phase-3 L5). If [sigma_z^S, H] = 0 (no
sigma_x or sigma_y on S), then measuring s at t equals measuring it at 0,
so rho_nat = rho_do exactly. Consequences:
  - TYZ_Pi = RA_q;
  - Im_rec = RA_rec for every observer and every fragment.
Derivable.

Lemma BC (the phase-3 referee's identity, written out).
  (R) Reciprocity. Suppose every E-operator in H is diagonal in the
      product Y-eigenbasis {|n>} of E, so that H = sum_n |n><n| (x) h_n,
      and every S-generator h_n is symmetric (h_n^T = h_n in the sigma_z
      basis). Then V_n = exp(-i h_n t) is symmetric, and
      A_{10} = sum_n <0|V_n|1> |n><n|e0> = A_{01}, for any |e0>.
  (C) Chirality. Suppose sigma_z^S H* sigma_z^S = -H (* = complex
      conjugation in the computational basis) and |e0> is real. Then
      U* = sigma_z^S U sigma_z^S, so A_{xs}* = (-1)^{x+s} A_{xs}:
      A_00 and A_11 are real, A_01 and A_10 are imaginary.
  If (R) and (C) both hold, then for every real symmetric E-operator M
  (in particular M_A (x) M_B with both factors real):
    P_nat(s, M) = (1/2) <A_0s + A_1s| M |A_0s + A_1s>
                = (1/2)(<A_0s|M|A_0s> + <A_1s|M|A_1s>).
  The cross term vanishes because it is the real part of a real-times-
  imaginary number. Using (R), this equals P_do(x = s, M). Under (C) the
  P_do fragment states sum_s A_xs A_xs^dag are real, so Helstrom POVMs and
  the tie projector are real, and Local POVMs are diagonal. Hence
  Im_rec = RA_rec for both observer types. Derivable.
  NOT implied: equality of the quantum cq-states. Operators with
  imaginary entries (for example sigma_y) see the cross terms; the
  phase-3 referee's probe (probe_j0.out) found record-law gaps of 0.04 to
  0.06 for random complex projectors at J = 0. So TYZ_Pi vs RA_q is NOT derivable under BC.
Term-by-term table (checked by hand from Y* = -Y, X* = X, Z* = Z,
sigma_z sigma_x sigma_z = -sigma_x, sigma_z sigma_y sigma_z = -sigma_y;
Y-basis diagonality from [Y_j, Y_k] = 0 and [X_k, Y_k] != 0):
    term                           (R) structure   (C) chirality   pointer kept
    g_k P1 (x) Y_k                 keeps           keeps           yes
    (J/2)(XX + YY), J > 0          BREAKS          BREAKS          yes
    lambda YY                      keeps           BREAKS (YY real) yes
    b sum Z_k                      BREAKS          BREAKS          yes
    c sum Y_k                      keeps           keeps           yes
    D (XY - YX)                    BREAKS          keeps (imag.)   yes
    h sigma_x^S                    keeps           keeps           NO
    h sigma_y^S                    BREAKS (antisym.) BREAKS        NO
    h (sigma_x + sigma_z)/sqrt2    keeps           BREAKS          NO
    complex |e0>                   keeps           BREAKS          n/a
"BREAKS" means the sufficient condition fails. It does not prove that the
identity fails. Surprises are caught by the hidden-identity audit
(Section 6).

Variants (all with g_k = 1 in the main grid; the S field is h n_S . sigma):
  V0  base (phase-3 model): n_S = x.
  VA  n_S = y.                                   breaks R, C
  VB  n_S = (x + z)/sqrt2.                       breaks C only
  VC  V0 + b = 0.3.                              breaks R, C
  VD  V0 + lambda = 0.5.                         breaks C only
  VE  V0 with complex |e0> = |c>^N_E.            breaks C only
  VF  V0 + c = 0.3.                              keeps R, C (predicted
      identity; a negative control that tests the derivation itself)
  VG  V0 + D = 0.5.                              breaks R only
J > 0 breaks both R and C in every variant.

Cell families (h = S-field strength):
  F_P   h = 0: pointer conserved. Controls for H2 and H3 (Lemma P). Open for
        H1, where the gap is purely records vs fragments.
  F_BC  h > 0, J = 0, V0 or VF: R and C hold. Control for H3 (Lemma BC).
        Open for H1 and H2.
  F_C   h > 0, J = 0, VB, VD or VE: only C broken. Open.
  F_R   h > 0, J = 0, VG: only R broken. Open.
  F_RC  h > 0 and (J > 0, or VA or VC): both broken. Open.
At h = 0, VA and VB coincide with V0 and are not double counted.

Symmetry audit (code check, run first, at N_E = 8; derivable). For each
variant, J, h:
  - compute || sigma_z H* sigma_z + H ||_max;
  - check Y-basis block structure (E-part of H commutes with every Y_k);
  - compute the derived symmetric / antisymmetric status of each h_n;
  - compute |A_10 - A_01| and the phases of A_xs at t in {0.5, 1.5, 3}.
Every entry must match the table above (zero means < 1e-12 in norm,
nonzero means > 1e-6). Any mismatch is stop rule S2.

=============================================================================
4. Main grid (fixed now)
=============================================================================
  - N_E = 16 (17 qubits): the largest size that runs in reasonable time
    here (Section 10). N_E = 18 would take about 76 s per initial state
    (2.5 min per cell), about 5 hours for the evolutions alone.
  - g_k = 1; J in {0, 0.5, 1, 2}; h in {0, 0.25, 0.5, 1};
    variants V0, VA, ..., VG.
  - 8 x 4 x 4 = 128 nominal cells, 120 unique.
    Family counts: F_P 24, F_BC 6, F_C 9, F_R 3, F_RC 78.
  - Times t in {0.25, 0.5, ..., 6.0} (24 points).
    Phase 3 had 2 J values, 2 fields, t <= 3, N_E = 10, ends only.
  - m in {1, 2, 3}, geometries {ends, adjacent}; observers Helstrom and
    Local for the records quantities.
Size series (no verdict, reported): the same 120 cells at
N_E in {10, 12, 14}, for the N_E trend of every gap.
Bridge (code check): the phase-3 E4 grid at N_E = 10 must reproduce the
stored results_v12c.json values of RA, Im_rec_S and TYZ_quantum to 1e-10
(phase 3 used a dense eigendecomposition; phase 5 uses expm_multiply).
The grid is V0, J in {0, 1}, h in {0, 0.25, 1}, t <= 3, m in {1, 2}, ends.

=============================================================================
5. Hypotheses
=============================================================================
Point: one (cell, t, geometry, m). For records quantities, a point also
carries the observer type.
  H1 [OPEN, primary] RA_rec^obs agrees with TYZ_Pi. This is the user's
     question in its literal form: does the records-level interventional
     quantity track TYZ's fragment-level quantity?
     Author's prior, stated: REFUTED is likely. The phase-3 referee found
     24 of 50 and 31 of 66 counted rows failing even the lenient 0.1-bit
     rule. Records hold at most what one binary measurement extracts.
  H2 [OPEN, primary] RA_q agrees with TYZ_Pi: intervention vs S access,
     like for like, both at fragment level. Families F_BC, F_C, F_R and
     F_RC are open; F_P is a control.
     Why the outcome cannot be worked out in advance:
       - rho_nat and rho_do differ by interference terms between the
         x = 0 and x = 1 branches, A_0s^dag (.) A_1s;
       - by different pointer populations, p_s(t) != 1/2;
       - and, when the pointer precesses, by which pointer value each
         record was written from.
     Lemma BC removes the interference terms only for real observables.
     Entropies of fragment states depend on imaginary parts too. The
     author knows no inequality or identity between the two
     co-informations in general, and neither the sign nor the size of
     TYZ_Pi - RA_q is known. RA_q has not been computed in any earlier
     phase or referee script.
  H3 [OPEN in F_C, F_R, F_RC; control in F_P, F_BC; secondary]
     RA_rec^obs agrees with Im_rec^obs. This is phase 3's H4, retested with
     broken symmetries, a bigger chain, a wider grid and a stricter rule.
  H4 [OPEN, secondary] "Tracks" in the weak sense: rank order and sign.
     Computed for the pairs (RA_q, TYZ_Pi) and (RA_rec^obs, TYZ_Pi).

=============================================================================
6. Rules: counting, agreement, discrimination, verdicts
=============================================================================
Counted point: max(|A|, |B|) >= 0.05 bit, for the pair (A, B) under test.
Agreement at a point:
    |A - B| <= 0.01 + 0.10 * max(|A|, |B|)        (bits).
Why this rule:
  - Phase 3 allowed 0.1 bit everywhere, which is 100% of a 0.1-bit signal.
  - This rule allows 0.015 bit at the 0.05 floor (30%), 0.04 bit at
    0.3 bit (13%) and 0.11 bit at 1 bit (11%).
  - The 0.01-bit absolute term keeps the rule from demanding relative
    precision on signals near the floor. It is 1e4 times larger than the
    numerical error bound of Section 9, so float64 round-off cannot decide
    a point.
  - The 10% relative term matches the median relative gap the phase-3
    referee found inside the phase-3 grid (records level). So the
    phase-3 data would sit near the boundary of this rule: it is a
    genuine test, not a formality. Using that observation to set the
    rule is disclosed here.
Discrimination check (mandatory). For each hypothesis the same rule is
applied, on the same counted points, to trivial competitors in place of A:
  - H2: 0; I(F_A:F_B) under P_nat (TYZ's unrefined consensus);
    I(F_A:F_B) of the x-averaged P_do state.
  - H1 and H3: 0; C_rec = I(r_A:r_B) under P_nat; I(r_A:r_B) under P_do;
    I(X:r_A).
The test DISCRIMINATES only if every competitor agrees at no more than 50%
of the counted points.
Hidden-identity audit. An open cell is set aside as an "unexplained
identity cell" for a hypothesis if the maximum over its points of the
relevant gap is at most 1e-9. The relevant gap is the max-abs record-law
difference for H3, and the trace distance between rho_nat and rho_do for
H2. Such cells are listed, excluded from the open counts, and reported as
something that needs a derivation, not as evidence.
Vacuous and thin cells. Per hypothesis and cell, a cell with 0 counted
points is VACUOUS and one with 1 to 4 is THIN. Both counts are reported in
the headline table. A cell's points still count in the pooled fractions.
Verdict, per hypothesis H1, H2, H3, on open, non-identity cells.
f = fraction of counted points that agree, pooled and per family.
  SUPPORTED     f >= 0.95 pooled, and f >= 0.90 in every open family with
                >= 30 counted points, and the test DISCRIMINATES, and at
                least 3 open families (2 for H3, which has only F_C, F_R,
                F_RC open) have >= 30 counted points.
  REFUTED       f < 0.50 pooled, or f < 0.50 in any open family with >= 30
                counted points. Applies whether or not the test
                discriminates.
  INCONCLUSIVE  anything else, with the reason stated:
                  - "partial": f between the bounds;
                  - "non-discriminating": SUPPORTED except for the
                    discrimination check;
                  - "insufficient": too few families with >= 30 points.
Controls (F_P for H2 and H3, F_BC for H3) are checked against Section 9
tolerances, not against this rule. They are reported as controls, and
passing them is not evidence.
H4, per family with >= 30 counted points:
  - TRACKS if Spearman rho >= 0.9 and signs agree at >= 90% of counted
    points (both > +0.01, both < -0.01, or both within +-0.01);
  - DOES NOT TRACK if rho < 0.7;
  - INCONCLUSIVE otherwise.
Boundary sensitivity:
  - Points with |A - B| within 1e-6 bit of the agreement boundary, or with
    max(|A|, |B|) within 1e-6 of 0.05, are listed.
  - If flipping all of them could change a verdict, the verdict carries
    the flag "boundary-sensitive".
Intervals: points are correlated in time, so fractions describe the grid,
not a sample. A percentile bootstrap over cells (B = 2000) gives a
sensitivity interval for each f, reported as such.

=============================================================================
7. Finite counts and the permutation (shuffle) null test
=============================================================================
Every verdict in Section 6 uses exact values. Finite counts are reported
so that the measure's operational use is checked:
  - N_shots = 1e4 per protocol per point, for points counted under H1 or
    H3;
  - plug-in and Miller-Madow RA-hat.
T-N [estimator check; derivable in design]. Because X is randomised, under
H0 "X independent of (r_A, r_B)" the permutation distribution of any
statistic is exact.
  - Statistic: RA-hat. One-sided (upper tail): RA > 0 is what counts as
    responsive agreement. 2000 permutations of X across shots;
    p = (1 + #{perm >= observed}) / 2001. Implemented by drawing the
    2 x 4 count table (X against the pair of records) with both margins
    fixed (multivariate hypergeometric), which is exactly the permutation
    distribution and avoids shuffling 1e4 shots each time.
  - Calibration first, on a separate seed stream (study 0), with 1000
    datasets per null environment:
      N1 the phase-3 E1-twin at theta in {pi/8, pi/4, pi/2}, including the
         perfect-copy case r_A = r_B = K that broke phase-3 T2(c);
      N2 phase-3 E2 at theta = 0, phi = pi/3, m = 1, Local;
      N3 a chain common cause: g_k = 0 (S uncoupled), J = 1, VC + VE,
         h = 0.5, N_E = 10, t = 3, m = 1, ends and adjacent, Local. Records
         agree through the chain, not through S.
  - PASS if the rejection rate is <= 0.05 + 3 sqrt(0.05 x 0.95 / 1000)
    = 0.0707 at alpha = 0.05, and <= 0.0194 at alpha = 0.01, in every
    null. Otherwise stop rule S4.
  - Then, reported with no verdict: on the main grid, the fraction of
    points with exact RA_rec >= 0.05 detected at alpha = 0.01 (power),
    and the fraction of points with exact |RA_rec| < 1e-3 rejected.
  - Limit, stated: the permutation null is "X independent of the
    records", not "RA <= 0". Points with synergy (RA < 0 but
    X-dependent) can reject in the two-sided version. The one-sided
    statistic is the registered one.
Conditional-dependence shuffle (no verdict): permute r_B within X strata,
2000 permutations, statistic I-hat(r_A:r_B|X). This reports where the
records share correlations that are not about S.

=============================================================================
8. Held-out grid (chosen now; never looked at before the main verdicts)
=============================================================================
  - N_E = 14.
  - Inhomogeneous couplings g_k = 1.5 (1 + 0.3 eta_k), eta_k ~ N(0, 1),
    drawn once for 16 sites from SeedSequence((20261105, 99)); the first 14
    are used. (Nested; the phase-4 referee showed that redrawn couplings
    confound size comparisons.) Inhomogeneous g_k keeps (R) and (C).
  - J in {0, 0.75, 3.0}; h in {0.4, 0.75}.
  - Variants with changed strengths:
      V0;
      VA;
      VB with n_S = (x + 0.5 z)/|.|;
      VC with b = 0.6;
      VD with lambda = 0.25;
      VE with |c> = cos(pi/6)|0> + e^{i pi/3} sin(pi/6)|1>;
      VG with D = 0.25.
  - 7 x 3 x 2 = 42 cells (J = 0 V0: F_BC; VB, VD, VE: F_C; VG: F_R;
    VA, VC and all J > 0: F_RC).
  - t = 0.3 k, k = 1..24 (to 7.2); the same fragments, observers and rules.
ROBUST: a verdict on H1, H2 or H3 is called ROBUST only if the held-out
grid gives the same category under the same rule. Otherwise it is
reported as GRID-DEPENDENT, with both results. A SUPPORTED that is not
ROBUST may not be described as support in any summary.

=============================================================================
9. Numerical tolerances (float64) and stop rules
=============================================================================
Unit roundoff u = 1.1e-16. Hilbert space 2^17 at N_E = 16.
  E1 Evolution: scipy.sparse.linalg.expm_multiply.
     - Checked against a dense eigendecomposition at N_E = 10: max
       amplitude error <= 1e-11.
     - At N_E = 16, where a dense check is impossible: the norm drift must
       be <= 1e-12, and two time schedules (one call on the 24-point grid
       vs separate calls from 0 to each t) must agree to <= 1e-10 in
       amplitude 2-norm.
  E2 Record laws and density matrices are quadratic in the amplitudes.
     - Error <= 2 ||delta psi|| + (summation error <= 2^17 u = 1.5e-11).
     - So a law entry or a reduced density matrix (trace norm) is good to
       about 5e-11.
     - Tolerance tau_law = 1e-9 on probabilities and on trace distances (a
       factor of 20 margin).
  E3 Information identities do not use an absolute tolerance on a
     difference of logarithms of near-zero numbers. That is what broke
     phase-4 T6(b), where a 1e-9 tolerance on a square root of a near-zero
     number failed at an exact equality.
     - Every derivable identity is checked FIRST on the states or laws
       (tau_law above).
     - Then on the information values with a continuity bound
       (Fannes-Audenaert: |S(rho) - S(sigma)| <= T log2(d - 1) + h2(T)).
     - Records (d = 8): T <= 4e-9 gives <= 1.3e-7 per entropy, and RA uses
       7 entropies, so tau_info_rec = 1e-6 bit.
     - Fragments (d <= 128): T <= 1e-9 gives <= 4e-8 per entropy, and a
       co-information uses <= 9 entropies, so tau_info_q = 1e-6 bit.
     - Eigenvalues below 0 from round-off (about d u) are clipped before
       taking -lambda log2 lambda; this is covered by the same bound.
  E4 The hidden-identity threshold (1e-9) is set at tau_law, so a true
     identity cannot be missed through round-off. An apparent identity
     that is a coincidence would need a gap below 1e-9 at every point of a
     cell.
  E5 Verdict thresholds (0.05, 0.01 + 0.10 x) are >= 1e4 times the
     numerical error. The boundary listing in Section 6 is the only place
     where round-off could matter, and it is reported.
Stop rules. "Stop" means: halt; compute no verdict for any hypothesis;
diagnose. Any code fix means a full rerun from scratch, and every fix is
listed in the report.
  S1 Any unit test or limit check fails (test_v12e.py: Lemma P and Lemma
     BC on small chains; the bridge; RA_q = I(F_A:F_B) for the product c-
     maybe state; CoI identities; the estimator bias check from
     test_v12c).
  S2 The symmetry audit disagrees with the table in Section 3. The
     derivation is wrong. Report it, and run no studies until an amendment
     is committed as a new pre-registration.
  S3 A control fails its tolerance (F_P: law or cq-state gap > tau_law, or
     info gap > tau_info; F_BC: record-law gap > tau_law). Pre-registered
     contingency C1:
       - recompute the flagged point in extended precision (mpmath,
         30 digits, dense evolution at N_E <= 12; at N_E = 16 with
         np.clongdouble accumulation of the reduced matrices from the same
         statevector);
       - if the extended-precision gap is < 1e-12, the flag is round-off.
         Record it, use the extended value, and continue. This is a
         registered contingency, not a deviation;
       - otherwise it is a code or derivation error: S2 or a code fix.
  S4 Null calibration T-N fails its bound: an estimator problem.
  S5 Evolution checks E1 fail.
  S6 Compute: if a dry run of 5% of the cells extrapolates above 4 hours
     on 2 CPUs, then TYZ_opt uses 50 directions and the permutations drop
     to 1000. If it still extrapolates above 6 hours, the main N_E becomes
     14 and the held-out N_E becomes 12. Either fallback is disclosed.

=============================================================================
10. Compute estimate
=============================================================================
Benchmark (this machine: 2 CPUs, 7 GB; generic chain of this form;
expm_multiply over 24 times, one initial state):
    N_E = 10: 0.1 s,  14: 1.9 s,  16: 11.2 s,  18: 76 s.
    A 7-qubit reduced density matrix plus eigenvalues per time: 5 ms at
    N_E = 16.
Main grid, N_E = 16: 120 cells x 2 initial states x about 11 s = about
  45 min of evolution. Fragment quantities (6 fragment pairs x 24 times x
  3 states per cell) take a few minutes. TYZ_opt (202 directions, 64 x 64
  entropies) takes about 30 min.
Size series N_E = 10, 12, 14: about 10 min. Held-out grid (N_E = 14, 42
  cells): about 5 min plus its TYZ_opt, about 10 min.
Finite counts and permutations (hypergeometric table draws): up to about
  35,000 (point, observer) pairs on the main grid, 2000 draws each for
  each of the two shuffle tests, about 15 min; calibration, 6 null
  settings (N1 x 3, N2, N3 x 2) x 1000 datasets x 2000 draws, about 10 min.
Total: about 2 hours of CPU time, about 1 to 1.5 hours wall time on 2 CPUs
  (cells run in parallel). Peak memory under 1 GB (sparse H at N_E = 16
  has 3.3e6 nonzeros). Hard cap and fallbacks: S6.

=============================================================================
11. What this phase can and cannot say
=============================================================================
  - Whatever comes out speaks only to records in small qubit models:
      - one qubit S;
      - at most 16 environment qubits;
      - a few chain Hamiltonians;
      - two kinds of model observers (one of which is assumed to know the
        pointer-conditional states);
      - exact quantum states.
    It is about when two information quantities agree, one obtained by
    resetting S at random and one obtained by measuring S.
  - It says nothing about awareness, consciousness, observers as
    subjects, or anything spiritual or metaphysical. "Observer" means a
    measurement on a few qubits; "consensus" and "agreement" mean mutual
    and co-information between measurement records or fragment states.
  - It says nothing about the real universe or about any thesis line of
    the paper beyond these quantities.
  - A SUPPORTED H2 would mean that, in these models, a random reset can
    stand in for a measurement of S when scoring TYZ-type consensus. It
    would not mean the reset needs no access to S (a reset is as good as
    read access; Section 1 (4)). It would not certify that records that
    already exist are about S.
  - A REFUTED H2 would mean the interventional and S-access consensus are
    different objects once the symmetries are gone, so RA would need its
    own justification.
  - No novelty is claimed for RA, co-information, or the symmetry lemmas
    beyond the narrow numerical comparison in Section 0.
"""

# =============================================================================
# Stub only (pre-registration commit). No experiment logic. The constants
# below restate the grids of the docstring so the implementation cannot drift
# from them silently; the implementation will be appended later.
# =============================================================================

import math

MASTER_SEED_V12E = 20261105          # disjoint from phases 1-4 (20261101-20261104)

# Main grid (Section 4)
N_E_MAIN = 16
N_E_SIZE_SERIES = (10, 12, 14)
J_MAIN = (0.0, 0.5, 1.0, 2.0)
H_MAIN = (0.0, 0.25, 0.5, 1.0)
T_MAIN = tuple(0.25 * k for k in range(1, 25))
VARIANTS = ("V0", "VA", "VB", "VC", "VD", "VE", "VF", "VG")
M_FRAG = (1, 2, 3)
GEOMETRIES = ("ends", "adjacent")
OBSERVERS = ("Helstrom", "Local")

# Held-out grid (Section 8)
N_E_HELD = 14
J_HELD = (0.0, 0.75, 3.0)
H_HELD = (0.4, 0.75)
T_HELD = tuple(0.3 * k for k in range(1, 25))
VARIANTS_HELD = ("V0", "VA", "VB", "VC", "VD", "VE", "VG")

# Rules (Section 6) and tolerances (Section 9)
COUNT_FLOOR = 0.05
AGREE_ABS, AGREE_REL = 0.01, 0.10
TAU_LAW = 1e-9
TAU_INFO = 1e-6
IDENTITY_THRESHOLD = 1e-9
COMPLEX_E = {"main": (math.pi / 8, math.pi / 4), "held": (math.pi / 6, math.pi / 3)}


def main():
    raise SystemExit("run_v12e.py is a pre-registration only (phase 5); no experiment code exists yet.")


if __name__ == "__main__":
    main()
