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
# Implementation (appended after the pre-registration commit 1448f34, pushed
# to GitHub as branch paper-v12 at 2026-10-31T11:30:54Z; the docstring above,
# lines 1-605, is unchanged). The constants restate the docstring's grids.
# =============================================================================

from __future__ import annotations  # noqa: E402

import argparse  # noqa: E402
import gzip  # noqa: E402
import json  # noqa: E402
import math  # noqa: E402
import os  # noqa: E402
import platform  # noqa: E402
import subprocess  # noqa: E402
import sys  # noqa: E402
import time  # noqa: E402
from functools import reduce  # noqa: E402
from multiprocessing import Pool  # noqa: E402

import numpy as np  # noqa: E402
import scipy  # noqa: E402
import scipy.sparse as sp  # noqa: E402
from scipy.sparse.linalg import expm_multiply  # noqa: E402
from scipy.stats import spearmanr  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import run_v12 as v1  # noqa: E402
import run_v12c as c3  # noqa: E402
from run_v12b import helstrom_tiefix  # noqa: E402

OUT = os.path.join(HERE, "results", "phase5")
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

N_SHOTS = 10_000
N_PERM = 2000
N_NULL = 1000
B_CELLS = 2000
N_DIRS = 200                         # Fibonacci directions for TYZ_opt (S6 fallback: 50)
LN2 = math.log(2)

FAMILIES = ("F_P", "F_BC", "F_C", "F_R", "F_RC")
OPEN_FAM = {"H1": ("F_P", "F_BC", "F_C", "F_R", "F_RC"),
            "H2": ("F_BC", "F_C", "F_R", "F_RC"),
            "H3": ("F_C", "F_R", "F_RC")}
REQ_FAM = {"H1": 3, "H2": 3, "H3": 2}


def seed(*items):
    return np.random.SeedSequence((MASTER_SEED_V12E,) + tuple(int(x) for x in items))


# ---------------------------------------------------------------------------
# Model: variants, Hamiltonian, initial states (Section 3)
# ---------------------------------------------------------------------------

def eta_held():
    return np.random.default_rng(seed(99)).standard_normal(16)


def cell_params(variant, J, h, grid="main", n_env=N_E_MAIN, g_zero=False):
    """Coefficients of the Hamiltonian family of Section 3 for one cell."""
    held = grid == "held"
    if held:
        g = 1.5 * (1 + 0.3 * eta_held()[:n_env])
    else:
        g = np.ones(n_env)
    if g_zero:
        g = np.zeros(n_env)
    p = {"variant": variant, "J": float(J), "h": float(h), "grid": grid, "n_env": n_env,
         "g": g.tolist(), "lam": 0.0, "b": 0.0, "c": 0.0, "D": 0.0, "nS": (1.0, 0.0, 0.0), "e0": None}
    if variant == "VA":
        p["nS"] = (0.0, 1.0, 0.0)
    elif variant == "VB":
        v = np.array([1.0, 0.0, 0.5 if held else 1.0])
        p["nS"] = tuple((v / np.linalg.norm(v)).tolist())
    elif variant == "VC":
        p["b"] = 0.6 if held else 0.3
    elif variant == "VD":
        p["lam"] = 0.25 if held else 0.5
    elif variant == "VE":
        p["e0"] = COMPLEX_E["held" if held else "main"]
    elif variant == "VF":
        p["c"] = 0.3
    elif variant == "VG":
        p["D"] = 0.25 if held else 0.5
    elif variant != "V0":
        raise ValueError(variant)
    return p


def family(variant, J, h):
    if h == 0:
        return "F_P"
    if J > 0:
        return "F_RC"
    if variant in ("V0", "VF"):
        return "F_BC"
    if variant in ("VB", "VD", "VE"):
        return "F_C"
    if variant == "VG":
        return "F_R"
    return "F_RC"                    # VA, VC


_I = sp.identity(2, format="csr", dtype=complex)
_X = sp.csr_matrix(np.array([[0, 1], [1, 0]], complex))
_Y = sp.csr_matrix(np.array([[0, -1j], [1j, 0]], complex))
_Z = sp.csr_matrix(np.array([[1, 0], [0, -1]], complex))
_P1 = sp.csr_matrix(np.array([[0, 0], [0, 1]], complex))


def _on(ops, n):
    return reduce(lambda a, b: sp.kron(a, b, format="csr"), [ops.get(k, _I) for k in range(n)])


def build_H(p):
    n_env = p["n_env"]
    n = n_env + 1
    terms = []
    for k in range(1, n):
        if p["g"][k - 1]:
            terms.append(p["g"][k - 1] * _on({0: _P1, k: _Y}, n))
    for k in range(1, n - 1):
        if p["J"]:
            terms.append((p["J"] / 2) * (_on({k: _X, k + 1: _X}, n) + _on({k: _Y, k + 1: _Y}, n)))
        if p["lam"]:
            terms.append(p["lam"] * _on({k: _Y, k + 1: _Y}, n))
        if p["D"]:
            terms.append(p["D"] * (_on({k: _X, k + 1: _Y}, n) - _on({k: _Y, k + 1: _X}, n)))
    for k in range(1, n):
        if p["b"]:
            terms.append(p["b"] * _on({k: _Z}, n))
        if p["c"]:
            terms.append(p["c"] * _on({k: _Y}, n))
    if p["h"]:
        nx, ny, nz = p["nS"]
        for coef, P in ((nx, _X), (ny, _Y), (nz, _Z)):
            if coef:
                terms.append(p["h"] * coef * _on({0: P}, n))
    H = reduce(lambda a, b: a + b, terms, sp.csr_matrix((2 ** n, 2 ** n), dtype=complex))
    return H.tocsr()


def e0_vec(p):
    if p["e0"] is None:
        return np.array([1.0, 0.0], complex)
    a, ph = p["e0"]
    return np.array([math.cos(a), np.exp(1j * ph) * math.sin(a)], complex)


def init_states(p):
    E = reduce(np.kron, [e0_vec(p)] * p["n_env"], np.array([1.0 + 0j]))
    return {x: np.kron(np.eye(2, dtype=complex)[x], E) for x in (0, 1)}


def evolve(H, psi0, tmax, nt):
    """States at t = tmax k / nt, k = 1..nt (one expm_multiply call)."""
    out = expm_multiply(-1j * H, psi0, start=0.0, stop=tmax, num=nt + 1, endpoint=True)
    return out[1:]


# ---------------------------------------------------------------------------
# Entropies and co-information (bits)
# ---------------------------------------------------------------------------

def _ent_eigs(ev):
    ev = np.clip(ev, 0.0, None)
    with np.errstate(divide="ignore", invalid="ignore"):
        t = np.where(ev > 0, ev * np.log2(np.where(ev > 0, ev, 1.0)), 0.0)
    return -t.sum(axis=-1)


def S_bits(rho):
    rho = 0.5 * (rho + np.conj(np.swapaxes(rho, -1, -2)))
    return _ent_eigs(np.linalg.eigvalsh(rho))


def mi_q(rho, dA, dB):
    """I(A:B) for (batched) density matrices on A (x) B."""
    sh = rho.shape[:-2]
    r = rho.reshape(sh + (dA, dB, dA, dB))
    rA = np.einsum("...ijkj->...ik", r)
    rB = np.einsum("...ijil->...jl", r)
    return S_bits(rA) + S_bits(rB) - S_bits(rho)


def coi_blocks(blocks, dA, dB, pmin=1e-14):
    """Co-information of a cq-state given UNNORMALISED conditional blocks
    q_k sigma_k (traces q_k): I(F_A:F_B)_mix - sum_k q_k I(F_A:F_B)_{sigma_k}."""
    mix = sum(blocks)
    val = mi_q(mix, dA, dB)
    for B in blocks:
        q = float(np.real(np.trace(B)))
        if q > pmin:
            val -= q * mi_q(B / q, dA, dB)
    return float(val)


def fib_dirs(n):
    i = np.arange(n)
    z = 1 - (2 * i + 1) / n
    r = np.sqrt(1 - z ** 2)
    phi = i * math.pi * (3 - math.sqrt(5))
    d = np.stack([r * np.cos(phi), r * np.sin(phi), z], axis=1)
    return np.vstack([[0, 0, 1.0], [0, 0, -1.0], d])


PAULI2 = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]], complex)


def tyz_dirs(Rn, d, dA, dB, dirs):
    """Im(F_A:F_B|S_n) for every direction n; Rn = rho of S F_A F_B (natural)."""
    Rr = Rn.reshape(2, d, 2, d)
    P = 0.5 * (np.eye(2)[None] + np.einsum("ki,iab->kab", dirs, PAULI2))
    Cp = np.einsum("kab,bjal->kjl", P, Rr)
    rFF = Rr[0, :, 0, :] + Rr[1, :, 1, :]
    Cm = rFF[None] - Cp
    I_nat = float(mi_q(rFF, dA, dB))
    out = np.full(len(dirs), I_nat)
    for C in (Cp, Cm):
        q = np.real(np.einsum("kjj->k", C))
        ok = q > 1e-14
        Iq = np.zeros(len(dirs))
        Iq[ok] = mi_q(C[ok] / q[ok, None, None], dA, dB)
        out -= np.where(ok, q * Iq, 0.0)
    return out


def trace_norm(A):
    return float(np.sum(np.abs(np.linalg.eigvalsh(0.5 * (A + np.conj(A.T))))))


# ---------------------------------------------------------------------------
# One time point: all fragment pairs, all quantities (Section 2)
# ---------------------------------------------------------------------------

def frag_pairs(n_env, ms=M_FRAG, geoms=GEOMETRIES):
    out = []
    for g in geoms:
        for m in ms:
            fA = list(range(1, m + 1))
            fB = list(range(n_env - m + 1, n_env + 1)) if g == "ends" else list(range(m + 1, 2 * m + 1))
            out.append((g, m, fA, fB))
    return out


def _ptrace_B(rho, dA, dB):
    return np.einsum("ijkj->ik", rho.reshape(dA, dB, dA, dB))


def _ptrace_A(rho, dA, dB):
    return np.einsum("ijil->jl", rho.reshape(dA, dB, dA, dB))


def process_time(psi0, psi1, n, pairs, dirs=None):
    psin = (psi0 + psi1) / math.sqrt(2)
    rows = []
    rhoS = None
    for (geom, m, fA, fB) in pairs:
        keep = [0] + fA + fB
        dA, dB = 2 ** len(fA), 2 ** len(fB)
        d = dA * dB
        R = [v1.reduced_dm_pure(v, n, keep).reshape(2, d, 2, d) for v in (psi0, psi1, psin)]
        rdo = [R[x][0, :, 0, :] + R[x][1, :, 1, :] for x in (0, 1)]          # Tr_S, trace 1 each
        Bn = [R[2][s, :, s, :] for s in (0, 1)]                              # traces p_s
        ps = [float(np.real(np.trace(B))) for B in Bn]
        if rhoS is None:
            rs = np.einsum("ajbj->ab", R[2])
            rhoS = rs
        SrhoS = float(S_bits(rhoS))
        RA_q = coi_blocks([0.5 * rdo[0], 0.5 * rdo[1]], dA, dB)
        RA_q_w = coi_blocks([ps[0] * rdo[0], ps[1] * rdo[1]], dA, dB)
        TYZ = coi_blocks(Bn, dA, dB)
        I_nat = float(mi_q(Bn[0] + Bn[1], dA, dB))
        I_dobar = float(mi_q(0.5 * (rdo[0] + rdo[1]), dA, dB))
        cq_gap = 0.5 * sum(trace_norm(Bn[s] - 0.5 * rdo[s]) for s in (0, 1))
        row = {"geom": geom, "m": m, "p0": ps[0], "S_rhoS": SrhoS, "RA_q": RA_q, "RA_q_w": RA_q_w,
               "TYZ_Pi": TYZ, "I_FF_nat": I_nat, "I_FF_dobar": I_dobar, "cq_gap": cq_gap,
               "TYZ_norm": TYZ / SrhoS if SrhoS >= 0.1 else None}
        if dirs is not None:
            vals = tyz_dirs(R[2].reshape(2 * d, 2 * d), d, dA, dB, dirs)
            k = int(np.argmax(vals))
            row["TYZ_opt"] = float(vals[k])
            row["TYZ_opt_dir"] = dirs[k].tolist()
            row["TYZ_z_check"] = float(vals[0])                               # must equal TYZ_Pi
        obs = {}
        for kind in OBSERVERS:
            if kind == "Local":
                PiA = c3.local_majority_pi0(len(fA))
                PiB = c3.local_majority_pi0(len(fB))
            else:
                PiA = helstrom_tiefix(_ptrace_B(rdo[0], dA, dB), _ptrace_B(rdo[1], dA, dB))[0]
                PiB = helstrom_tiefix(_ptrace_A(rdo[0], dA, dB), _ptrace_A(rdo[1], dA, dB))[0]
            MA = (PiA, np.eye(dA) - PiA)
            MB = (PiB, np.eye(dB) - PiB)
            Pdo = np.zeros((2, 2, 2))
            Pnat = np.zeros((2, 2, 2))
            for a in (0, 1):
                for b in (0, 1):
                    KT = np.kron(MA[a], MB[b]).T
                    for x in (0, 1):
                        Pdo[x, a, b] = 0.5 * float(np.real(np.sum(rdo[x] * KT)))
                        Pnat[x, a, b] = float(np.real(np.sum(Bn[x] * KT)))
            Pdo = np.clip(Pdo, 0, None)
            Pnat = np.clip(Pnat, 0, None)
            Pdo /= Pdo.sum()
            Pnat /= Pnat.sum()
            qd = c3.info_xab(Pdo)
            qn = c3.info_xab(Pnat)
            obs[kind] = {"RA_rec": float(qd["RA"]), "Im_rec": float(qn["RA"]), "I_ab_do": float(qd["I_ab"]),
                         "I_xa": float(qd["I_xa"]), "C_rec": float(c3.mi_ab(Pnat.sum(0))),
                         "law_gap": float(np.max(np.abs(Pnat - Pdo))),
                         "Pdo": Pdo.ravel().tolist(), "Pnat": Pnat.ravel().tolist()}
        row["obs"] = obs
        rows.append(row)
    return rows


# ---------------------------------------------------------------------------
# One cell (worker)
# ---------------------------------------------------------------------------

def run_cell(args):
    p, times, with_dirs, n_dirs, sched_check = args
    t0 = time.time()
    n = p["n_env"] + 1
    H = build_H(p)
    init = init_states(p)
    tmax, nt = times[-1], len(times)
    ev = {x: evolve(H, init[x], tmax, nt) for x in (0, 1)}
    drift = max(abs(np.linalg.norm(ev[x][k]) - 1) for x in (0, 1) for k in range(nt))
    sched = None
    if sched_check:
        sched = 0.0
        for t in (1.5, 3.0, 6.0):
            k = int(round(t / (tmax / nt))) - 1
            for x in (0, 1):
                v = expm_multiply(-1j * t * H, init[x])
                sched = max(sched, float(np.linalg.norm(v - ev[x][k])))
    dirs = fib_dirs(n_dirs) if with_dirs else None
    pairs = frag_pairs(p["n_env"])
    pts = []
    for k, t in enumerate(times):
        for r in process_time(ev[0][k], ev[1][k], n, pairs, dirs):
            r["t"] = float(t)
            r["t_idx"] = k
            pts.append(r)
    return {"params": p, "family": family(p["variant"], p["J"], p["h"]), "points": pts,
            "norm_drift": float(drift), "sched_gap": sched, "wall_s": time.time() - t0}


def main_cells(n_env=N_E_MAIN):
    cells = []
    for V in VARIANTS:
        for J in J_MAIN:
            for h in H_MAIN:
                if h == 0 and V in ("VA", "VB"):
                    continue                     # identical to V0 at h = 0; not double counted
                cells.append(cell_params(V, J, h, "main", n_env))
    return cells


def held_cells():
    return [cell_params(V, J, h, "held", N_E_HELD) for V in VARIANTS_HELD for J in J_HELD for h in H_HELD]


def cell_key(p):
    return f"{p['variant']} J={p['J']:g} h={p['h']:g}"


# ---------------------------------------------------------------------------
# Section 3: symmetry audit (dense, N_E = 8)
# ---------------------------------------------------------------------------

def predicted_status(p):
    commY = p["J"] == 0 and p["b"] == 0 and p["D"] == 0
    symS = p["h"] == 0 or p["nS"][1] == 0
    chiral = (p["J"] == 0 and p["lam"] == 0 and p["b"] == 0
              and (p["h"] == 0 or (p["nS"][1] == 0 and p["nS"][2] == 0)))
    return {"commutes_Y": commY, "R": commY and symS, "chiral_H": chiral, "real_e0": p["e0"] is None,
            "pointer": p["h"] == 0 or (p["nS"][0] == 0 and p["nS"][1] == 0)}


def audit_cell(p):
    n = p["n_env"] + 1
    H = build_H(p).toarray()
    pred = predicted_status(p)
    obsv = {}
    Ys = [_on({k: _Y}, n).toarray() for k in range(1, n)]
    obsv["commutes_Y"] = max(np.max(np.abs(H @ Y - Y @ H)) for Y in Ys)
    sz = np.kron(np.diag([1.0, -1.0]), np.eye(2 ** (n - 1)))
    obsv["chiral_H"] = float(np.max(np.abs(sz @ np.conj(H) @ sz + H)))
    obsv["pointer"] = float(np.max(np.abs(sz @ H - H @ sz)))
    if obsv["commutes_Y"] < 1e-12:
        Rk = np.array([[1, 1], [1j, -1j]], complex) / math.sqrt(2)
        W = np.kron(np.eye(2), reduce(np.kron, [Rk] * (n - 1)))
        Hp = np.conj(W.T) @ H @ W
        dE = 2 ** (n - 1)
        off = np.array([Hp[i, dE + i] for i in range(dE)])
        blockdiag = max(np.max(np.abs(Hp[:dE, :dE] - np.diag(np.diag(Hp[:dE, :dE])))),
                        np.max(np.abs(Hp[:dE, dE:] - np.diag(off))))
        obsv["R"] = float(max(np.max(np.abs(np.imag(off))), blockdiag))
    else:
        obsv["R"] = float(obsv["commutes_Y"])
    mism = []
    for key in ("commutes_Y", "R", "chiral_H", "pointer"):
        v = obsv[key]
        if pred[key] and not v < 1e-12:
            mism.append(f"{key}: predicted 0, got {v:.2e}")
        if not pred[key] and not v > 1e-6:
            mism.append(f"{key}: predicted nonzero, got {v:.2e}")
    w, V = np.linalg.eigh(H)
    init = init_states(p)
    amp = {"A10_minus_A01": 0.0, "phase_violation": 0.0}
    dE = 2 ** (n - 1)
    for t in (0.5, 1.5, 3.0):
        U = V @ np.diag(np.exp(-1j * w * t)) @ np.conj(V.T)
        A = {(x, s): (U @ init[x])[s * dE:(s + 1) * dE] for x in (0, 1) for s in (0, 1)}
        amp["A10_minus_A01"] = max(amp["A10_minus_A01"], float(np.max(np.abs(A[(1, 0)] - A[(0, 1)]))))
        amp["phase_violation"] = max(amp["phase_violation"], float(max(
            np.max(np.abs(np.imag(A[(0, 0)]))), np.max(np.abs(np.imag(A[(1, 1)]))),
            np.max(np.abs(np.real(A[(0, 1)]))), np.max(np.abs(np.real(A[(1, 0)]))))))
    if pred["R"] and not amp["A10_minus_A01"] < 1e-12:
        mism.append(f"A10-A01 predicted 0, got {amp['A10_minus_A01']:.2e}")
    if pred["chiral_H"] and pred["real_e0"] and not amp["phase_violation"] < 1e-12:
        mism.append(f"A-phases predicted, violation {amp['phase_violation']:.2e}")
    return {"cell": cell_key(p), "grid": p["grid"], "pred": pred, "observed": obsv, "amplitudes": amp,
            "mismatches": mism}


def symmetry_audit():
    out = []
    for V in VARIANTS:
        for J in J_MAIN:
            for h in H_MAIN:
                out.append(audit_cell(cell_params(V, J, h, "main", 8)))
    for V in VARIANTS_HELD:
        for J in J_HELD:
            for h in H_HELD:
                p = cell_params(V, J, h, "held", 8)
                out.append(audit_cell(p))
    return out


# ---------------------------------------------------------------------------
# Section 9 E1: evolution accuracy at N_E = 10 (dense eigendecomposition)
# ---------------------------------------------------------------------------

def evo_check_cell(p):
    H = build_H(p)
    w, V = np.linalg.eigh(H.toarray())
    init = init_states(p)
    err = 0.0
    for x in (0, 1):
        ev = evolve(H, init[x], T_MAIN[-1], len(T_MAIN))
        c0 = np.conj(V.T) @ init[x]
        for k, t in enumerate(T_MAIN):
            err = max(err, float(np.max(np.abs(V @ (np.exp(-1j * w * t) * c0) - ev[k]))))
    return cell_key(p), err


# ---------------------------------------------------------------------------
# Bridge: phase-3 E4 values (results_v12c.json) at N_E = 10
# ---------------------------------------------------------------------------

def bridge():
    R3 = json.load(open(os.path.join(HERE, "results", "v12", "results_v12c.json")))
    by = {(r["J"], r["h_S"], round(r["t"], 6), r["m"], r["obs"]): r for r in R3["e4"]}
    worst = {"RA": 0.0, "Im_rec_S": 0.0, "TYZ_quantum": 0.0}
    nrow = 0
    times = tuple(0.25 * k for k in range(1, 13))
    for J in (0.0, 1.0):
        for h in (0.0, 0.25, 1.0):
            p = cell_params("V0", J, h, "main", 10)
            res = run_cell((p, times, False, 0, False))
            for r in res["points"]:
                if r["geom"] != "ends" or r["m"] > 2:
                    continue
                for kind in OBSERVERS:
                    o = by[(J, h, round(r["t"], 6), r["m"], kind)]
                    worst["RA"] = max(worst["RA"], abs(r["obs"][kind]["RA_rec"] - o["RA"]))
                    worst["Im_rec_S"] = max(worst["Im_rec_S"], abs(r["obs"][kind]["Im_rec"] - o["Im_rec_S"]))
                    worst["TYZ_quantum"] = max(worst["TYZ_quantum"], abs(r["TYZ_Pi"] - o["TYZ_quantum"]))
                    nrow += 1
    return {"n_rows": nrow, "max_abs_diff": worst, "ok": max(worst.values()) <= 1e-10}


# ---------------------------------------------------------------------------
# Section 7: permutation (shuffle) tests
# ---------------------------------------------------------------------------

def perm_test_X(cdo, rng, n_perm=None):
    """One-sided permutation p-value of RA-hat under X independent of (r_A, r_B);
    permutation distribution drawn as a 2 x 4 table with both margins fixed."""
    n_perm = n_perm or N_PERM
    obs_ra = float(c3.info_xab(cdo)["RA"])
    colors = cdo.sum(0).ravel().astype(np.int64)
    n0 = int(cdo[0].sum())
    row0 = rng.multivariate_hypergeometric(colors, n0, size=n_perm)
    tab = np.stack([row0, colors[None, :] - row0], axis=1).reshape(n_perm, 2, 2, 2)
    ra = c3.info_xab(tab.astype(float))["RA"]
    return (1 + int(np.sum(ra >= obs_ra - 1e-12))) / (n_perm + 1), obs_ra


def perm_test_cond(cdo, rng, n_perm=None):
    """One-sided p-value of I-hat(r_A:r_B|X), r_B permuted within X strata."""
    n_perm = n_perm or N_PERM
    obs = float(c3.info_xab(cdo)["I_ab_x"])
    tabs = np.zeros((n_perm, 2, 2, 2))
    for x in (0, 1):
        T = cdo[x]
        colb = T.sum(0).astype(np.int64)
        na0 = int(T[0].sum())
        r0 = rng.multivariate_hypergeometric(colb, na0, size=n_perm)
        tabs[:, x, 0, :] = r0
        tabs[:, x, 1, :] = colb[None, :] - r0
    st = c3.info_xab(tabs)["I_ab_x"]
    return (1 + int(np.sum(st >= obs - 1e-12))) / (n_perm + 1), obs


def _null_task(args):
    name, Pdo, idx = args
    rng = np.random.default_rng(seed(0, idx))
    P = np.clip(np.asarray(Pdo, float).ravel(), 0, None)
    P /= P.sum()
    ps = []
    for k in range(N_NULL):
        cdo = rng.multinomial(N_SHOTS, P).reshape(2, 2, 2).astype(float)
        ps.append(perm_test_X(cdo, rng)[0])
    ps = np.array(ps)
    r05, r01 = float(np.mean(ps <= 0.05)), float(np.mean(ps <= 0.01))
    return name, {"rej_0.05": r05, "rej_0.01": r01, "ok": r05 <= 0.05 + 3 * math.sqrt(0.05 * 0.95 / N_NULL)
                  and r01 <= 0.01 + 3 * math.sqrt(0.01 * 0.99 / N_NULL)}


def null_settings():
    out = []
    n = 12
    for thn, th in (("pi/8", math.pi / 8), ("pi/4", math.pi / 4), ("pi/2", math.pi / 2)):
        do, _ = c3.e1_ensembles(th, n)
        tdo, tnat = c3.twin_ensembles(th, n)
        e = c3.exact_point(tdo, tnat, n + 1, [1], [2], "Local", do_ref=do, tyz=False)
        out.append((f"N1 twin theta={thn}", e["Pdo"]))
    do, nat = c3.e2_ensembles(math.pi / 3, 0.0, n)
    out.append(("N2 E2 theta=0 phi=pi/3", c3.exact_point(do, nat, n + 1, [1], [2], "Local", tyz=False)["Pdo"]))
    p = cell_params("VC", 1.0, 0.5, "main", 10, g_zero=True)
    p["e0"] = COMPLEX_E["main"]
    res = run_cell((p, (3.0,), False, 0, False))
    for r in res["points"]:
        if r["m"] == 1:
            out.append((f"N3 chain g=0 {r['geom']}", np.array(r["obs"]["Local"]["Pdo"]).reshape(2, 2, 2).tolist()))
    for name, P in out:
        P = np.asarray(P)
        assert np.max(np.abs(P[0] - P[1])) < 1e-12, name       # X independent of the records
    return out


# ---------------------------------------------------------------------------
# Section 6: rules and verdicts
# ---------------------------------------------------------------------------

def agrees(a, b):
    return abs(a - b) <= AGREE_ABS + AGREE_REL * max(abs(a), abs(b))


def boundary(a, b):
    return (abs(abs(a - b) - (AGREE_ABS + AGREE_REL * max(abs(a), abs(b)))) <= 1e-6
            or abs(max(abs(a), abs(b)) - COUNT_FLOOR) <= 1e-6)


def entries(cells, hyp):
    """(cell_idx, family, A, B, competitors) per point (and observer for H1/H3)."""
    out = []
    for ci, cell in enumerate(cells):
        fam = cell["family"]
        for r in cell["points"]:
            if hyp == "H2":
                out.append((ci, fam, r["RA_q"], r["TYZ_Pi"], {"zero": 0.0, "I_FF_nat": r["I_FF_nat"],
                                                              "I_FF_dobar": r["I_FF_dobar"]}))
            else:
                for kind in OBSERVERS:
                    o = r["obs"][kind]
                    B = r["TYZ_Pi"] if hyp == "H1" else o["Im_rec"]
                    out.append((ci, fam, o["RA_rec"], B, {"zero": 0.0, "C_rec": o["C_rec"],
                                                          "I_ab_do": o["I_ab_do"], "I_xa": o["I_xa"]}))
    return out


def identity_cells(cells, hyp):
    ids = []
    for ci, cell in enumerate(cells):
        if cell["family"] not in OPEN_FAM[hyp] or hyp == "H1":
            continue
        if hyp == "H2":
            g = max(r["cq_gap"] for r in cell["points"])
        else:
            g = max(r["obs"][k]["law_gap"] for r in cell["points"] for k in OBSERVERS)
        if g <= IDENTITY_THRESHOLD:
            ids.append(ci)
    return ids


def _classify(f_pool, fam_f, disc, nfam30, req):
    if f_pool is None:
        return "INCONCLUSIVE", "insufficient"
    if f_pool < 0.5 or any(f < 0.5 for f in fam_f.values()):
        return "REFUTED", ""
    sup_core = f_pool >= 0.95 and all(f >= 0.90 for f in fam_f.values())
    if sup_core and nfam30 >= req and disc:
        return "SUPPORTED", ""
    if sup_core and nfam30 >= req and not disc:
        return "INCONCLUSIVE", "non-discriminating"
    if sup_core and nfam30 < req:
        return "INCONCLUSIVE", "insufficient"
    return "INCONCLUSIVE", "partial"


def verdict(cells, hyp, ss):
    ids = set(identity_cells(cells, hyp))
    E = [e for e in entries(cells, hyp) if e[1] in OPEN_FAM[hyp] and e[0] not in ids]
    cnt = [e for e in E if max(abs(e[2]), abs(e[3])) >= COUNT_FLOOR]
    ag = np.array([agrees(e[2], e[3]) for e in cnt], bool)
    f_pool = float(ag.mean()) if len(cnt) else None
    fam_n, fam_f, fam_all = {}, {}, {}
    for fam in OPEN_FAM[hyp]:
        sel = np.array([e[1] == fam for e in cnt], bool)
        fam_n[fam] = int(sel.sum())
        fam_all[fam] = float(ag[sel].mean()) if sel.sum() else None
        if sel.sum() >= 30:
            fam_f[fam] = float(ag[sel].mean())
    comp = {}
    for k in cnt[0][4] if cnt else []:
        comp[k] = float(np.mean([agrees(e[4][k], e[3]) for e in cnt]))
    disc = bool(cnt) and all(v <= 0.5 for v in comp.values())
    nfam30 = len(fam_f)
    cat, why = _classify(f_pool, fam_f, disc, nfam30, REQ_FAM[hyp])
    # boundary sensitivity
    bmask = [boundary(e[2], e[3]) for e in E]
    nb = int(sum(bmask))
    flags = set()
    if nb:
        for force in (True, False):
            cc, aa, ff = [], [], []
            for e, bm in zip(E, bmask):
                isc = max(abs(e[2]), abs(e[3])) >= COUNT_FLOOR
                a = agrees(e[2], e[3])
                if bm:
                    isc, a = force, force
                if isc:
                    cc.append(e)
                    aa.append(a)
            aa = np.array(aa, bool)
            fp = float(aa.mean()) if len(aa) else None
            ffam = {}
            for fam in OPEN_FAM[hyp]:
                s = np.array([x[1] == fam for x in cc], bool)
                if s.sum() >= 30:
                    ffam[fam] = float(aa[s].mean())
            flags.add(_classify(fp, ffam, disc, len(ffam), REQ_FAM[hyp])[0])
    sens = len(flags | {cat}) > 1
    # per-cell counts (vacuous / thin), bootstrap over cells
    per_cell = {}
    for ci, cell in enumerate(cells):
        if cell["family"] not in OPEN_FAM[hyp]:
            continue
        sel = [i for i, e in enumerate(cnt) if e[0] == ci]
        per_cell[ci] = {"cell": cell_key(cell["params"]), "family": cell["family"], "n_counted": len(sel),
                        "n_agree": int(ag[sel].sum()) if sel else 0, "identity": ci in ids,
                        "max_abs_gap": max((abs(cnt[i][2] - cnt[i][3]) for i in sel), default=None)}
    open_cells = [ci for ci in per_cell if ci not in ids]
    vac = [per_cell[ci]["cell"] for ci in open_cells if per_cell[ci]["n_counted"] == 0]
    thin = [per_cell[ci]["cell"] for ci in open_cells if 1 <= per_cell[ci]["n_counted"] <= 4]
    rng = np.random.default_rng(ss)
    na = np.array([per_cell[ci]["n_agree"] for ci in open_cells], float)
    nc = np.array([per_cell[ci]["n_counted"] for ci in open_cells], float)
    boot = []
    if len(open_cells) and nc.sum() > 0:
        for _ in range(B_CELLS):
            idx = rng.integers(0, len(open_cells), len(open_cells))
            if nc[idx].sum() > 0:
                boot.append(na[idx].sum() / nc[idx].sum())
    ci95 = [float(np.percentile(boot, 2.5)), float(np.percentile(boot, 97.5))] if boot else None
    gaps = np.array([abs(e[2] - e[3]) for e in cnt])
    return {"verdict": cat, "reason": why, "f_pooled": f_pool, "f_pooled_boot95_over_cells": ci95,
            "n_counted": len(cnt), "n_points_open": len(E), "family_n_counted": fam_n,
            "family_f": fam_all, "families_with_30": sorted(fam_f), "competitor_f": comp,
            "discriminates": disc, "identity_cells": [cell_key(cells[i]["params"]) for i in sorted(ids)],
            "n_open_cells": len(open_cells), "vacuous_cells": vac, "thin_cells": thin,
            "n_boundary_points": nb, "boundary_sensitive": sens,
            "median_abs_gap_counted": float(np.median(gaps)) if len(gaps) else None,
            "max_abs_gap_counted": float(gaps.max()) if len(gaps) else None,
            "per_cell": list(per_cell.values())}


def tracks(cells, hyp_pairs):
    """H4: per family with >= 30 counted points."""
    out = {}
    for name, hyp in hyp_pairs:
        ids = set(identity_cells(cells, "H2")) if hyp == "H2" else set()
        E = [e for e in entries(cells, hyp) if e[1] in OPEN_FAM[hyp] and e[0] not in ids]
        cnt = [e for e in E if max(abs(e[2]), abs(e[3])) >= COUNT_FLOOR]
        res = {}
        for fam in OPEN_FAM[hyp]:
            sel = [e for e in cnt if e[1] == fam]
            if len(sel) < 30:
                res[fam] = {"n": len(sel), "verdict": "not scored (<30 points)"}
                continue
            a = np.array([e[2] for e in sel])
            b = np.array([e[3] for e in sel])
            rho = float(spearmanr(a, b).correlation)
            sg = np.mean(((a > 0.01) & (b > 0.01)) | ((a < -0.01) & (b < -0.01)) |
                         ((np.abs(a) <= 0.01) & (np.abs(b) <= 0.01)))
            v = "TRACKS" if (rho >= 0.9 and sg >= 0.9) else ("DOES NOT TRACK" if rho < 0.7 else "INCONCLUSIVE")
            res[fam] = {"n": len(sel), "spearman": rho, "sign_agree": float(sg), "verdict": v}
        out[name] = res
    return out


def controls(cells):
    """S3: Lemma P (F_P) and Lemma BC (F_BC) controls."""
    bad = []
    worst = {"F_P_cq_gap": 0.0, "F_P_info_q": 0.0, "F_P_law": 0.0, "F_P_info_rec": 0.0,
             "F_BC_law": 0.0, "F_BC_info_rec": 0.0}
    for cell in cells:
        fam = cell["family"]
        if fam not in ("F_P", "F_BC"):
            continue
        for r in cell["points"]:
            lab = f"{cell_key(cell['params'])} t={r['t']:g} {r['geom']} m={r['m']}"
            if fam == "F_P":
                worst["F_P_cq_gap"] = max(worst["F_P_cq_gap"], r["cq_gap"])
                gq = abs(r["RA_q"] - r["TYZ_Pi"])
                worst["F_P_info_q"] = max(worst["F_P_info_q"], gq)
                if r["cq_gap"] > TAU_LAW or gq > TAU_INFO:
                    bad.append(f"{lab}: cq_gap {r['cq_gap']:.2e}, |RA_q-TYZ| {gq:.2e}")
            for kind in OBSERVERS:
                o = r["obs"][kind]
                gi = abs(o["RA_rec"] - o["Im_rec"])
                worst[f"{fam}_law"] = max(worst[f"{fam}_law"], o["law_gap"])
                worst[f"{fam}_info_rec"] = max(worst[f"{fam}_info_rec"], gi)
                if o["law_gap"] > TAU_LAW or gi > TAU_INFO:
                    bad.append(f"{lab} {kind}: law gap {o['law_gap']:.2e}, |RA-Im_rec| {gi:.2e}")
    return {"ok": not bad, "violations": bad, "worst": worst}


# ---------------------------------------------------------------------------
# Finite counts on the main grid (Section 7)
# ---------------------------------------------------------------------------

def _finite_task(args):
    ci, pi, kind, Pdo, Pnat, ra_exact, n_perm = args
    ss = seed(3, ci, pi, OBSERVERS.index(kind))
    rng = np.random.default_rng(ss)
    Pd = np.clip(np.asarray(Pdo, float), 0, None)
    Pn = np.clip(np.asarray(Pnat, float), 0, None)
    cdo = rng.multinomial(N_SHOTS, (Pd / Pd.sum()).ravel()).reshape(2, 2, 2).astype(float)
    cnat = rng.multinomial(N_SHOTS, (Pn / Pn.sum()).ravel()).reshape(2, 2, 2).astype(float)
    pX, ra = perm_test_X(cdo, rng, n_perm)
    pC, _ = perm_test_cond(cdo, rng, n_perm)
    return {"ci": ci, "pi": pi, "obs": kind, "RA_exact": ra_exact, "RA_hat": ra,
            "RA_mm": float(c3.info_xab(cdo, mm=True)["RA"]), "Im_rec_hat": float(c3.info_xab(cnat)["RA"]),
            "C_rec_hat": float(c3.mi_ab(cnat.sum(0))), "p_perm_X": pX, "p_perm_cond": pC}


# ---------------------------------------------------------------------------
# Helpers for reporting
# ---------------------------------------------------------------------------

def _f(x, nd=4):
    if x is None:
        return "-"
    if isinstance(x, (list, tuple)):
        return "[" + ", ".join(_f(v, nd) for v in x) + "]"
    if isinstance(x, bool):
        return str(x)
    if x == 0:
        return "0"
    if abs(x) < 1e-3 or abs(x) >= 1e4:
        return f"{x:.2e}"
    return f"{x:.{nd}f}"


def pooled_f_nov(cells, hyp):
    """Pooled agreement fraction without verdict (size series, secondary pairs)."""
    E = [e for e in entries(cells, hyp) if e[1] in OPEN_FAM[hyp]]
    cnt = [e for e in E if max(abs(e[2]), abs(e[3])) >= COUNT_FLOOR]
    if not cnt:
        return {"n": 0}
    ag = [agrees(e[2], e[3]) for e in cnt]
    return {"n": len(cnt), "f": float(np.mean(ag)), "median_abs_gap": float(np.median([abs(e[2] - e[3]) for e in cnt]))}


def secondary_pairs(cells):
    out = {}
    for nameA, nameB in (("RA_q", "TYZ_opt"), ("RA_q_w", "TYZ_Pi"), ("RA_q", "TYZ_norm")):
        cnt, ag = 0, 0
        for cell in cells:
            if cell["family"] not in OPEN_FAM["H2"]:
                continue
            for r in cell["points"]:
                a, b = r.get(nameA), r.get(nameB)
                if a is None or b is None:
                    continue
                if max(abs(a), abs(b)) >= COUNT_FLOOR:
                    cnt += 1
                    ag += agrees(a, b)
        out[f"{nameA} vs {nameB}"] = {"n_counted": cnt, "f_agree": ag / cnt if cnt else None}
    return out


def gap_decomp(cells):
    res = {}
    for fam in FAMILIES:
        d1, d2 = [], []
        for cell in cells:
            if cell["family"] != fam:
                continue
            for r in cell["points"]:
                for kind in OBSERVERS:
                    if max(abs(r["obs"][kind]["RA_rec"]), abs(r["TYZ_Pi"])) >= COUNT_FLOOR:
                        d1.append(r["TYZ_Pi"] - r["RA_q"])
                        d2.append(r["RA_q"] - r["obs"][kind]["RA_rec"])
        if d1:
            res[fam] = {"n": len(d1), "median_TYZ_minus_RAq": float(np.median(d1)),
                        "median_abs_TYZ_minus_RAq": float(np.median(np.abs(d1))),
                        "median_RAq_minus_RArec": float(np.median(d2)),
                        "median_abs_RAq_minus_RArec": float(np.median(np.abs(d2)))}
    return res


def _dump_gz(obj, path):
    with gzip.open(path, "wt") as fh:
        json.dump(obj, fh)


def _strip_cells(cells):
    return [{"params": c["params"], "family": c["family"], "norm_drift": c["norm_drift"],
             "sched_gap": c["sched_gap"], "wall_s": c["wall_s"], "points": c["points"]} for c in cells]


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

class Stop(Exception):
    pass


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--workers", type=int, default=2)
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    t0 = time.time()
    log = open(os.path.join(OUT, "run_v12e.log"), "w")
    R = {"meta": {"python": platform.python_version(), "numpy": np.__version__, "scipy": scipy.__version__,
                  "workers": args.workers, "master_seed": MASTER_SEED_V12E}, "stop_events": []}

    def say(msg):
        line = f"[{time.time() - t0:8.1f} s] {msg}"
        print(line, flush=True)
        log.write(line + "\n")
        log.flush()

    def save():
        with open(os.path.join(OUT, "results_v12e.json"), "w") as fh:
            json.dump(v1.clean(R), fh, indent=1)

    pool = Pool(args.workers)
    try:
        # S1: unit tests
        say("S1: unit tests (test_v12e.py)")
        tr = subprocess.run([sys.executable, os.path.join(HERE, "test_v12e.py")], capture_output=True, text=True)
        R["unit_tests"] = {"returncode": tr.returncode, "stdout": tr.stdout[-4000:], "stderr": tr.stderr[-4000:]}
        if tr.returncode != 0:
            raise Stop("S1: unit tests failed")
        # S2: symmetry audit
        say("S2: symmetry audit at N_E = 8")
        aud = symmetry_audit()
        mm = [a for a in aud if a["mismatches"]]
        R["symmetry_audit"] = {"n_cells": len(aud), "n_mismatch": len(mm), "cells": aud}
        say(f"   {len(aud)} cells, {len(mm)} mismatches")
        if mm:
            raise Stop("S2: symmetry audit disagrees with the table")
        # S5 / E1: evolution accuracy at N_E = 10
        say("E1: expm_multiply vs dense eigendecomposition at N_E = 10")
        sub = [cell_params(V, J, h, "main", 10) for V in VARIANTS for J in (0.0, 2.0) for h in (0.5, 1.0)]
        ev = pool.map(evo_check_cell, sub)
        emax = max(e for _, e in ev)
        R["evolution_check_NE10"] = {"cells": dict(ev), "max_amp_err": emax, "ok": emax <= 1e-11}
        say(f"   max amplitude error {emax:.2e}")
        if emax > 1e-11:
            raise Stop("S5: evolution check at N_E = 10 failed")
        # bridge (part of S1)
        say("bridge to phase 3 (N_E = 10)")
        br = bridge()
        R["bridge"] = br
        say(f"   {br['n_rows']} rows, max diffs {br['max_abs_diff']}")
        if not br["ok"]:
            raise Stop("S1: bridge to phase 3 failed")
        # null calibration (study 0)
        say("T-N: null calibration (study 0)")
        ns = null_settings()
        nres = dict(pool.map(_null_task, [(nm, P, i) for i, (nm, P) in enumerate(ns)]))
        R["null_calibration"] = {"settings": nres, "ok": all(v["ok"] for v in nres.values())}
        for k, v in nres.items():
            say(f"   {k}: rej@0.05 {v['rej_0.05']:.3f}, rej@0.01 {v['rej_0.01']:.3f}, ok {v['ok']}")
        if not R["null_calibration"]["ok"]:
            raise Stop("S4: null calibration failed")
        save()
        # S6: dry run (5% of main cells), then main grid
        cells_p = main_cells()
        dry_idx = list(range(0, len(cells_p), max(1, len(cells_p) // 6)))[:6]
        say(f"S6: dry run of {len(dry_idx)} of {len(cells_p)} main cells")
        n_dirs = N_DIRS
        n_perm_used = N_PERM
        td = time.time()
        sched_set = {i for i, p in enumerate(cells_p) if p["J"] == 1.0 and p["h"] == 0.5}
        dry = pool.map(run_cell, [(cells_p[i], T_MAIN, True, n_dirs, i in sched_set) for i in dry_idx])
        per = (time.time() - td) / len(dry_idx) * args.workers   # CPU-seconds per cell
        extrap = per * (len(cells_p) + 42 * 0.25 + 3 * 120 * 0.15) / args.workers / 3600 + 0.5
        R["dry_run"] = {"cells": len(dry_idx), "cpu_s_per_cell": per, "extrapolated_hours": extrap}
        say(f"   {per:.1f} CPU-s per main cell; extrapolated total {extrap:.2f} h")
        if extrap > 4:
            n_dirs = 50
            R["stop_events"].append(f"S6 fallback 1: extrapolated {extrap:.2f} h > 4 h; TYZ_opt 50 directions, 1000 permutations")
            n_perm_used = 1000
            dry = pool.map(run_cell, [(cells_p[i], T_MAIN, True, n_dirs, i in sched_set) for i in dry_idx])
        R["meta"]["n_dirs"] = n_dirs
        R["meta"]["n_perm"] = n_perm_used
        say("main grid, N_E = 16")
        rest = [i for i in range(len(cells_p)) if i not in dry_idx]
        res = dict(zip(dry_idx, dry))
        for i, r in zip(rest, pool.imap(run_cell, [(cells_p[i], T_MAIN, True, n_dirs, i in sched_set) for i in rest])):
            res[i] = r
            if len(res) % 10 == 0:
                say(f"   {len(res)}/{len(cells_p)} cells")
        cells = [res[i] for i in range(len(cells_p))]
        _dump_gz(_strip_cells(cells), os.path.join(OUT, "points_main.json.gz"))
        drift = max(cl["norm_drift"] for cl in cells)
        sg = [cl["sched_gap"] for cl in cells if cl["sched_gap"] is not None]
        zc = max(abs(r["TYZ_z_check"] - r["TYZ_Pi"]) for cl in cells for r in cl["points"])
        R["evolution_check_NE16"] = {"max_norm_drift": drift, "max_schedule_gap": max(sg), "n_sched_cells": len(sg),
                                     "TYZ_dir_z_vs_Pi": zc,
                                     "ok": drift <= 1e-12 and max(sg) <= 1e-10}
        say(f"   norm drift {drift:.2e}; schedule gap {max(sg):.2e} ({len(sg)} cells); z-direction check {zc:.2e}")
        if not R["evolution_check_NE16"]["ok"]:
            raise Stop("S5: evolution checks at N_E = 16 failed")
        # S3: controls
        ctl = controls(cells)
        R["controls_main"] = ctl
        say(f"S3 controls: ok {ctl['ok']}; worst {ctl['worst']}")
        if not ctl["ok"]:
            R["stop_events"].append(f"S3: {len(ctl['violations'])} control violations")
            save()
            raise Stop("S3: controls failed (contingency C1 needed)")
        # verdicts
        V = {h: verdict(cells, h, seed(4, k)) for k, h in enumerate(("H1", "H2", "H3"))}
        V["H4"] = tracks(cells, (("RA_q vs TYZ_Pi", "H2"), ("RA_rec vs TYZ_Pi", "H1")))
        R["verdicts_main"] = V
        R["secondary_main"] = {"pairs": secondary_pairs(cells), "gap_decomposition": gap_decomp(cells),
                               "frac_RA_q_negative": float(np.mean([r["RA_q"] < -1e-9 for cl in cells for r in cl["points"]])),
                               "frac_TYZ_negative": float(np.mean([r["TYZ_Pi"] < -1e-9 for cl in cells for r in cl["points"]]))}
        for h in ("H1", "H2", "H3"):
            say(f"   {h}: {V[h]['verdict']} {V[h]['reason']} f={_f(V[h]['f_pooled'])} n={V[h]['n_counted']} "
                f"fam={V[h]['family_f']} comp={V[h]['competitor_f']}")
        save()
        # held-out grid
        say("held-out grid, N_E = 14")
        hp = held_cells()
        hcells = pool.map(run_cell, [(p, T_HELD, True, n_dirs, False) for p in hp])
        _dump_gz(_strip_cells(hcells), os.path.join(OUT, "points_held.json.gz"))
        hctl_drift = max(cl["norm_drift"] for cl in hcells)
        Vh = {h: verdict(hcells, h, seed(5, k)) for k, h in enumerate(("H1", "H2", "H3"))}
        Vh["H4"] = tracks(hcells, (("RA_q vs TYZ_Pi", "H2"), ("RA_rec vs TYZ_Pi", "H1")))
        R["verdicts_held"] = Vh
        R["held_norm_drift"] = hctl_drift
        R["controls_held_BC"] = controls(hcells)
        R["robustness"] = {h: ("ROBUST" if V[h]["verdict"] == Vh[h]["verdict"] else "GRID-DEPENDENT")
                           for h in ("H1", "H2", "H3")}
        for h in ("H1", "H2", "H3"):
            say(f"   held {h}: {Vh[h]['verdict']} {Vh[h]['reason']} f={_f(Vh[h]['f_pooled'])} -> {R['robustness'][h]}")
        save()
        # size series
        say("size series N_E = 10, 12, 14")
        R["size_series"] = {}
        for ne in N_E_SIZE_SERIES:
            cs = pool.map(run_cell, [(p, T_MAIN, False, 0, False) for p in main_cells(ne)])
            R["size_series"][ne] = {h: pooled_f_nov(cs, h) for h in ("H1", "H2", "H3")}
            R["size_series"][ne]["controls_ok"] = controls(cs)["ok"]
            say(f"   N_E={ne}: {R['size_series'][ne]}")
        R["size_series"][N_E_MAIN] = {h: pooled_f_nov(cells, h) for h in ("H1", "H2", "H3")}
        save()
        # finite counts
        say("finite counts and permutation tests (main grid)")
        tasks = []
        for ci, cl in enumerate(cells):
            for pi, r in enumerate(cl["points"]):
                for kind in OBSERVERS:
                    o = r["obs"][kind]
                    if (max(abs(o["RA_rec"]), abs(r["TYZ_Pi"])) >= COUNT_FLOOR
                            or max(abs(o["RA_rec"]), abs(o["Im_rec"])) >= COUNT_FLOOR):
                        tasks.append((ci, pi, kind, np.array(o["Pdo"]).reshape(2, 2, 2).tolist(),
                                      np.array(o["Pnat"]).reshape(2, 2, 2).tolist(), o["RA_rec"], n_perm_used))
        fin = pool.map(_finite_task, tasks, chunksize=64)
        _dump_gz(fin, os.path.join(OUT, "finite_main.json.gz"))
        big = [x for x in fin if x["RA_exact"] >= 0.05]
        tiny = [x for x in fin if abs(x["RA_exact"]) < 1e-3]
        R["finite_main"] = {"n_points": len(fin),
                            "power_RA_ge_0.05_at_0.01": float(np.mean([x["p_perm_X"] <= 0.01 for x in big])) if big else None,
                            "n_RA_ge_0.05": len(big),
                            "reject_rate_absRA_lt_1e-3_at_0.01": float(np.mean([x["p_perm_X"] <= 0.01 for x in tiny])) if tiny else None,
                            "n_absRA_lt_1e-3": len(tiny),
                            "frac_cond_dependence_at_0.01": float(np.mean([x["p_perm_cond"] <= 0.01 for x in fin])),
                            "median_abs_RAhat_minus_RA": float(np.median([abs(x["RA_hat"] - x["RA_exact"]) for x in fin]))}
        say(f"   {R['finite_main']}")
        R["meta"]["wall_s"] = time.time() - t0
        save()
        say("done")
    except Stop as e:
        R["stopped"] = str(e)
        R["meta"]["wall_s"] = time.time() - t0
        save()
        say(f"STOP: {e}")
    finally:
        pool.close()
        log.close()


if __name__ == "__main__":
    main()
