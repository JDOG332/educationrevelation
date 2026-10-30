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

from __future__ import annotations  # noqa: E402

import argparse  # noqa: E402
import json  # noqa: E402
import math  # noqa: E402
import os  # noqa: E402
import platform  # noqa: E402
import sys  # noqa: E402
import time  # noqa: E402
from multiprocessing import Pool  # noqa: E402

import numpy as np  # noqa: E402
import scipy  # noqa: E402
from scipy.stats import spearmanr  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import crt  # noqa: E402
import run_v12 as v1  # noqa: E402
from run_v12 import (THETAS, TH_IDX, S1_THETAS, S1_NE, CM_M, S2_CONFIGS, S3_CM_THETAS,  # noqa: E402
                     S3_CM_NE, S3_HZ, S3_HZ_NE, DELTA, H_S, PRI, N_COUNTS, DHAT, crossing, mean_se,
                     clean, f4, COLORS, MARKERS)

MASTER_SEED_V12B = 20261102
OUT = v1.OUT
A_C_THEORY = 27.64
BAND_REL = (31.0 / 34.3, 37.0 / 34.3)
B_MAIN = 200
B_S2 = 100
B_CAL = 2           # R12 does not depend on B
PSI_PERF_EXACT = 0.5 * DHAT * 0.5


def seed(*items):
    return (MASTER_SEED_V12B,) + tuple(int(x) for x in items)


# ---------------------------------------------------------------------------
# Records with the pre-stated tie fix (secondary R1t)
# ---------------------------------------------------------------------------

def helstrom_tiefix(r0, r1, p0=PRI[0], p1=PRI[1], tol=1e-14):
    w, vec = np.linalg.eigh(crt.herm(p0 * r0 - p1 * r1))
    pos, zer = w > tol, np.abs(w) <= tol
    Pi0 = vec[:, pos] @ np.conj(vec[:, pos].T) + 0.5 * vec[:, zer] @ np.conj(vec[:, zer].T)
    return Pi0, np.eye(r0.shape[0]) - Pi0


def hazy_records_tiefix(theta, h, m):
    rE = v1.hazy_env(h)
    r0 = v1.product_op(rE, m)
    U = v1.rot(theta)
    r1 = v1.product_op(U @ rE @ np.conj(U.T), m)
    Pi0, _ = helstrom_tiefix(r0, r1)
    PA = [v1.rec_given_s(Pi0, r0), v1.rec_given_s(Pi0, r1)]
    return v1.joint_records_product(PA, PA), PA


def record_diag2(P):
    """Phase-1 record diagnostics plus the exact v12 gate quantities."""
    d = v1.record_diag(P)
    rho = np.diag(np.asarray(P, float).ravel()).astype(complex)
    ic = crt.correlation_informativeness(crt.regularize(rho))
    d["I_c_exact"] = ic
    d["R12_inf_v12"] = crt.gate(ic, ic)
    d["psi_inf_v12"] = 0.5 * DHAT * crt.gate(ic, ic)
    return d


# ---------------------------------------------------------------------------
# Worker: one simulated experiment, both gates on the same data
# ---------------------------------------------------------------------------

KEEP = ("psi", "R12", "F", "I1", "I2", "G_eps", "C0", "C_eff", "n_active", "n_unique")


def task(args):
    key, rho, sd, B = args
    raw = crt.simulate(rho, sd, crt.SimConfig(N=N_COUNTS, B_boot=B))
    f12 = crt.functional(raw, gate_kind="v12")
    out = {k: f12[k] for k in KEEP}
    if B > B_CAL:
        f11 = crt.functional(raw, gate_kind="v11")
        out.update({"psi_v11": f11["psi"], "R12_v11": f11["R12"]})
    return key, out


# ---------------------------------------------------------------------------
# Stage 0
# ---------------------------------------------------------------------------

def build(quick=False):
    ncal, ncal_b = (40, 20) if quick else (2000, 500)
    nseed_cm = 4 if quick else 40
    nseed_hz = 3 if quick else 30
    ndraw = 4 if quick else 100
    ex = {"cm_records": {}, "s1_mi": {}, "s2": {}, "s3_cm": {}, "s3_hz": {}}
    cal, main = [], []

    for r in range(ncal):
        cal.append((("cal", "I/4"), crt.maximally_mixed(4), seed(0, 0, r), B_CAL))
    for pi_, p in enumerate((0.4, 0.3)):
        rho = np.kron(np.diag([p, 1 - p]), np.diag([p, 1 - p])).astype(complex)
        for r in range(ncal_b):
            cal.append((("cal", f"biased p={p}"), rho, seed(0, 1 + pi_, r), B_CAL))

    for th in THETAS:
        for m in CM_M:
            P, PA = v1.cmaybe_records(THETAS[th], m)
            d = record_diag2(P)
            d["J_H"] = v1.accessible_helstrom(PA)
            d["Pe"] = float(PRI[0] * PA[0][1] + PRI[1] * PA[1][0])
            ex["cm_records"][f"{th}|{m}"] = d
            rho, _ = v1.record_state(P)
            for r in range(nseed_cm):
                main.append((("cm", th, m), rho, seed(1, TH_IDX[th], m, r), B_MAIN))

    for th in S1_THETAS:
        for ne in S1_NE:
            ex["s1_mi"][f"{th}|{ne}"] = v1.mi_curve_pure(v1.cmaybe_psi(THETAS[th], ne), ne).tolist()

    for th, ne in S2_CONFIGS:
        draws = []
        for dr in range(ndraw):
            rng = np.random.default_rng(np.random.SeedSequence(seed(20, TH_IDX[th], ne, dr)))
            psi = v1.scrambled_psi(THETAS[th], ne, rng)
            recs = {}
            for m in range(1, ne // 2 + 1):
                P, PA, PB = v1.scrambled_records(psi, ne, m)
                d = record_diag2(P)
                d["J_H_A"] = v1.accessible_helstrom(PA)
                recs[m] = d
                rho, _ = v1.record_state(P)
                main.append((("sc", th, ne, m, dr), rho, seed(2, TH_IDX[th], ne, m, dr), B_S2))
            draws.append({"mi": v1.mi_curve_pure(psi, ne).tolist(), "records": recs})
        ex["s2"][f"{th}|{ne}"] = {"draws": draws,
                                  "mi_darwin": v1.mi_curve_pure(v1.cmaybe_psi(THETAS[th], ne), ne).tolist()}

    # Simulation 3 exact parts are deterministic and identical to phase 1;
    # recomputed here so that this script stands alone.
    for th in S3_CM_THETAS:
        for ne in S3_CM_NE:
            psi = v1.cmaybe_psi(THETAS[th], ne)
            n = ne + 1
            c = math.cos(THETAS[th])
            tab = {m: v1.discord_table(v1.reduced_dm_pure(psi, n, [0] + list(range(1, m + 1))), 2 ** m)
                   for m in range(1, ne // 2 + 1)}
            ex["s3_cm"][f"{th}|{ne}"] = {
                "mi": v1.mi_curve_pure(psi, ne).tolist(),
                "chi_ptr_all": [0.0] + [v1.pure_entropy(psi, n, list(range(1, m + 1))) for m in range(1, ne + 1)],
                "J_H_all": [0.0] + [1 - v1.h2((1 - math.sqrt(max(0.0, 1 - c ** (2 * m)))) / 2)
                                    for m in range(1, ne + 1)],
                "table": tab}
    for th, hz in S3_HZ:
        ne = S3_HZ_NE
        U = v1.rot(THETAS[th])
        Hs = [v1.ent_dm(v1.hazy_env(hz)), v1.ent_dm(U @ v1.hazy_env(hz) @ np.conj(U.T))]
        tab, jh, jht, chi = {}, [0.0], [0.0], [0.0]
        for m in range(1, ne + 1):
            rho = v1.hazy_rho_SF(THETAS[th], hz, ne, m)
            _, rF = v1.split_SF(rho, 2 ** m)
            chi.append(v1.ent_dm(rF) - m * (PRI[0] * Hs[0] + PRI[1] * Hs[1]))
            P, PA = v1.hazy_records(THETAS[th], hz, m)
            Pt, PAt = hazy_records_tiefix(THETAS[th], hz, m)
            jh.append(v1.accessible_helstrom(PA))
            jht.append(v1.accessible_helstrom(PAt))
            if m <= ne // 2:
                t = v1.discord_table(rho, 2 ** m)
                t["records"] = record_diag2(P)
                t["records_tiefix"] = record_diag2(Pt)
                t["tie_changed"] = bool(np.max(np.abs(P - Pt)) > 1e-12)
                tab[m] = t
                for r in range(nseed_hz):
                    main.append((("hz", th, hz, m, "R1"), v1.record_state(P)[0],
                                 seed(3, TH_IDX[th], int(hz * 10), m, r), B_MAIN))
                    if t["tie_changed"]:
                        main.append((("hz", th, hz, m, "R1t"), v1.record_state(Pt)[0],
                                     seed(4, TH_IDX[th], int(hz * 10), m, r), B_MAIN))
        ex["s3_hz"][f"{th}|{hz}"] = {"mi": v1.hazy_mi_curve(THETAS[th], hz, ne).tolist(), "chi_ptr_all": chi,
                                      "J_H_all": jh, "J_H_all_tiefix": jht, "table": tab}
    ex["horodecki_p0.8"] = v1.discord_table(v1.horodecki_state(0.8), 2)
    # slow (rank-deficient) runs first for load balance
    main.sort(key=lambda t: 0 if (t[0][0] == "cm" and t[0][1] in ("pi/2", "pi/3")) else 1)
    return ex, cal, main


# ---------------------------------------------------------------------------
# Analysis
# ---------------------------------------------------------------------------

def summ(runs):
    out = {"n": len(runs)}
    for k in KEEP + ("psi_v11", "R12_v11"):
        if k in runs[0]:
            out[k], out[k + "_se"] = mean_se([r[k] for r in runs])
    parts = {}
    for r in runs:
        kk = f"n_active={r['n_active']},n_unique={r['n_unique']}"
        parts[kk] = parts.get(kk, 0) + 1
    out["partitions"] = parts
    return out


def analyze(ex, g):
    A = {}
    # ---- calibration ------------------------------------------------------
    cal = {}
    for lab in ("I/4", "biased p=0.4", "biased p=0.3"):
        nr = [N_COUNTS * r["R12"] for r in g[("cal", lab)]]
        m_, se = mean_se(nr)
        cal[lab] = {"a": m_, "se": se, "n": len(nr), "sd": float(np.std(nr, ddof=1))}
    a_cal = cal["I/4"]["a"]
    band = (a_cal * BAND_REL[0], a_cal * BAND_REL[1])
    cal["a_theory"] = A_C_THEORY
    cal["rel_dev_theory"] = (a_cal - A_C_THEORY) / A_C_THEORY
    cal["derivation_confirmed"] = abs(cal["rel_dev_theory"]) <= 0.05
    cal["band"] = band
    cal["biased_0.4_in_band"] = band[0] <= cal["biased p=0.4"]["a"] <= band[1]
    A["cal"] = cal

    cm = {}
    for th in THETAS:
        for m in CM_M:
            s = summ(g[("cm", th, m)])
            s["exact"] = ex["cm_records"][f"{th}|{m}"]
            cm[f"{th}|{m}"] = s
    A["cm_psi"] = cm
    perf = [r for m in CM_M for r in g[("cm", "pi/2", m)]]
    pm, pse = mean_se([r["psi"] for r in perf])
    A["psi_perf"] = {"mean": pm, "se": pse, "n": len(perf)}

    # ---- Simulation 1 -----------------------------------------------------
    s1 = {"configs": {}}
    st = []
    for th in S1_THETAS:
        for ne in S1_NE:
            mi = np.array(ex["s1_mi"][f"{th}|{ne}"])
            m_mi = crossing(list(range(ne + 1)), list(mi / H_S), 1 - DELTA)
            mmax = ne // 2
            ys = [0.0] + [cm[f"{th}|{m}"]["psi"] / pm for m in range(1, mmax + 1)]
            yx = [0.0] + [cm[f"{th}|{m}"]["exact"]["psi_inf_v12"] / PSI_PERF_EXACT for m in range(1, mmax + 1)]
            m_psi = crossing(list(range(mmax + 1)), ys, 1 - DELTA)
            m_psx = crossing(list(range(mmax + 1)), yx, 1 - DELTA)
            viol = [m for m in range(1, mmax)
                    if cm[f"{th}|{m + 1}"]["psi"] < cm[f"{th}|{m}"]["psi"]
                    - 2 * math.hypot(cm[f"{th}|{m}"]["psi_se"], cm[f"{th}|{m + 1}"]["psi_se"])]
            ratio = m_psi / m_mi if (m_psi is not None and m_mi) else None
            if m_mi is None or m_mi > mmax:
                status = "not applicable (MI plateau beyond N_E/2)"
            elif viol:
                status = "FAIL (a) non-monotone"
            elif m_psi is not None:
                status = "PASS" if 0.5 <= ratio <= 2 else "FAIL (b) onset ratio outside [1/2, 2]"
            else:
                status = ("FAIL (c) no Psi plateau, ratio provably > 2" if mmax / m_mi > 2
                          else "INCONCLUSIVE (Psi plateau beyond N_E/2)")
            if not status.startswith("not applicable"):
                st.append(status)
            s1["configs"][f"{th}|{ne}"] = {
                "m_delta_MI": m_mi, "R_delta_MI": ne / m_mi if m_mi else None, "m_delta_Psi": m_psi,
                "R_delta_Psi": ne / m_psi if m_psi else None, "onset_ratio": ratio,
                "onset_ratio_exact_ref": (m_psx / m_mi) if (m_psx and m_mi) else None,
                "monotone_violations": viol, "status": status, "psi_rel": ys[1:], "mi_over_HS": list(mi / H_S)}
    nf = sum(x.startswith("FAIL") for x in st)
    npass = sum(x == "PASS" for x in st)
    s1.update({"n_applicable": len(st), "n_pass": npass, "n_fail": nf,
               "n_inconclusive": sum(x.startswith("INCONCLUSIVE") for x in st),
               "verdict": "FAIL" if nf else ("PASS" if npass >= len(st) / 2 else "INCONCLUSIVE")})
    A["s1"] = s1

    # ---- Simulation 2 -----------------------------------------------------
    s2 = {"configs": {}, "failA": [], "failB": []}
    for th, ne in S2_CONFIGS:
        key = f"{th}|{ne}"
        E = ex["s2"][key]
        mis = np.array([d["mi"] for d in E["draws"]])
        mu, sd = mis.mean(0), mis.std(0, ddof=1)
        if ne in (10, 12):
            s2["failA"] += [f"{key} m={m}" for m in range(1, ne // 2) if mu[m] >= 0.5 * H_S]
        rows = {}
        for m in range(1, ne // 2 + 1):
            runs = [r for dr in range(len(E["draws"])) for r in g[("sc", th, ne, m, dr)]]
            nr = [N_COUNTS * r["R12"] for r in runs]
            nr11 = [N_COUNTS * r["R12_v11"] for r in runs]
            mn, se = mean_se(nr)
            mn11, se11 = mean_se(nr11)
            recs = [d["records"][m] for d in E["draws"]]
            row = {"N_R12": mn, "N_R12_se": se, "ci95": [mn - 1.96 * se, mn + 1.96 * se],
                   "N_R12_median": float(np.median(nr)),
                   "N_R12_v11": mn11, "ci95_v11": [mn11 - 1.96 * se11, mn11 + 1.96 * se11],
                   "psi": float(np.mean([r["psi"] for r in runs])), "partitions": summ(runs)["partitions"],
                   "N_Ic_exact": N_COUNTS * float(np.mean([r["I_c_exact"] for r in recs])),
                   "N_Igate_v11_exact": N_COUNTS * float(np.mean([r["I_gate_exact"] for r in recs])),
                   "I_records": float(np.mean([r["I_records"] for r in recs])),
                   "bias_dev": float(np.mean([abs(r["bias_A"] - 0.5) for r in recs])),
                   "bias_dev_max": float(np.max([abs(r["bias_A"] - 0.5) for r in recs])),
                   "J_H_A": float(np.mean([r["J_H_A"] for r in recs])), "n": len(runs)}
            dk = f"{th}|{m}"
            row["darwin_N_R12"] = N_COUNTS * cm[dk]["R12"] if dk in cm else None
            if ne == 12 and m in (1, 2, 3):
                lo, hi = row["ci95"]
                if lo > band[1] or hi < band[0]:
                    s2["failB"].append(f"{key} m={m}")
            rows[m] = row
        s2["configs"][key] = {"mi_mean": mu.tolist(), "mi_sd": sd.tolist(), "mi_darwin": E["mi_darwin"],
                              "rows": rows}
    s2["verdict"] = "PASS" if not s2["failA"] and not s2["failB"] else "FAIL"
    A["s2"] = s2

    # ---- Simulation 3 -----------------------------------------------------
    s3 = {"configs": {}, "gap_points": [], "reverse_points": [], "floor_threshold_R12": 2 * a_cal / N_COUNTS}
    sp_x, sp_y, sp_xt, sp_yt = [], [], [], []

    def one(name, ne, E, psi_of, rec_of, jh_all, tie=None):
        mi = np.array(E["mi"])
        ms = list(range(ne + 1))
        m_mi = crossing(ms, list(mi / H_S), 1 - DELTA)
        m_chi = crossing(ms, list(np.array(E["chi_ptr_all"]) / H_S), 1 - DELTA)
        m_jh = crossing(ms, list(np.array(jh_all) / H_S), 1 - DELTA)
        mmax = ne // 2
        rows, ys = {}, [0.0]
        for m in range(1, mmax + 1):
            s = psi_of(m)
            rec = rec_of(m)
            rows[m] = {"psi": s["psi"], "psi_se": s["psi_se"], "R12": s["R12"], "R12_se": s["R12_se"],
                       "N_R12": N_COUNTS * s["R12"], "psi_v11": s.get("psi_v11"),
                       "R12_inf_v12": rec["R12_inf_v12"], "R12_inf_v11": rec["R12_inf"],
                       "bias": rec["bias_A"], "I_records": rec["I_records"], "J_H": jh_all[m],
                       "partitions": s["partitions"]}
            if tie is not None and tie(m) is not None:
                rows[m]["tiefix"] = tie(m)
            ys.append(s["psi"] / pm)
            sp_x.append(jh_all[m])
            sp_y.append(rec["R12_inf_v12"])
            if mi[m] >= (1 - DELTA) * H_S and m_mi and ne / m_mi >= 3 and s["R12"] <= s3["floor_threshold_R12"]:
                s3["gap_points"].append(f"{name} m={m}")
            if ys[-1] >= 1 - DELTA and mi[m] < (1 - DELTA) * H_S:
                s3["reverse_points"].append(f"{name} m={m}")
        m_psi = crossing(list(range(mmax + 1)), ys, 1 - DELTA)
        R = lambda x: ne / x if x else None  # noqa: E731
        s3["configs"][name] = {"N_E": ne, "mi": E["mi"], "chi_ptr_all": E["chi_ptr_all"], "J_H_all": jh_all,
                               "m_delta": {"MI": m_mi, "chi_ptr": m_chi, "J_H": m_jh, "Psi": m_psi},
                               "R_delta": {"MI": R(m_mi), "chi_ptr": R(m_chi), "J_H": R(m_jh), "Psi": R(m_psi)},
                               "table": E["table"], "psi": rows}

    for th in S3_CM_THETAS:
        for ne in S3_CM_NE:
            E = ex["s3_cm"][f"{th}|{ne}"]
            one(f"c-maybe theta={th} N_E={ne}", ne, E, lambda m, th=th: cm[f"{th}|{m}"],
                lambda m, th=th: ex["cm_records"][f"{th}|{m}"], E["J_H_all"])
    for th, hz in S3_HZ:
        E = ex["s3_hz"][f"{th}|{hz}"]

        def tie(m, th=th, hz=hz, E=E):
            if ("hz", th, hz, m, "R1t") not in g:
                return None
            s = summ(g[("hz", th, hz, m, "R1t")])
            rt = E["table"][m]["records_tiefix"]
            sp_xt.append(E["J_H_all_tiefix"][m])
            sp_yt.append(rt["R12_inf_v12"])
            return {"psi": s["psi"], "psi_se": s["psi_se"], "N_R12": N_COUNTS * s["R12"],
                    "bias": rt["bias_A"], "R12_inf_v12": rt["R12_inf_v12"], "J_H": E["J_H_all_tiefix"][m]}
        one(f"hazy theta={th} h={hz} N_E={S3_HZ_NE}", S3_HZ_NE, E,
            lambda m, th=th, hz=hz: summ(g[("hz", th, hz, m, "R1")]),
            lambda m, E=E: E["table"][m]["records"], E["J_H_all"], tie)
    # Spearman: exact R12_inf(v12) vs J_H; symmetric-record points = c-maybe
    # (all) and hazy odd m (no ties) plus tie-fixed hazy even m
    sym_x, sym_y = [], []
    for name, c in s3["configs"].items():
        for m, row in c["psi"].items():
            if name.startswith("c-maybe") or "tiefix" not in row:
                sym_x.append(row["J_H"]); sym_y.append(row["R12_inf_v12"])
            else:
                sym_x.append(row["tiefix"]["J_H"]); sym_y.append(row["tiefix"]["R12_inf_v12"])
    rnd = lambda z: np.round(np.asarray(z, float), 10)  # noqa: E731  (float-noise ties)
    s3["spearman_all_primary"] = float(spearmanr(rnd(sp_x), rnd(sp_y)).statistic)
    s3["spearman_symmetric"] = float(spearmanr(rnd(sym_x), rnd(sym_y)).statistic)
    # pointwise monotonicity check on the symmetric points
    order = np.argsort(sym_x)
    ys_sorted = np.array(sym_y)[order]
    xs_sorted = np.array(sym_x)[order]
    viol = [(float(xs_sorted[i]), float(ys_sorted[i]), float(ys_sorted[i + 1])) for i in range(len(order) - 1)
            if ys_sorted[i + 1] < ys_sorted[i] - 1e-9 and xs_sorted[i + 1] > xs_sorted[i] + 1e-9]
    s3["monotone_violations_symmetric"] = viol
    s3["n_symmetric_points"] = len(sym_x)
    pts = [(row["R12"], n, m) for n, c in s3["configs"].items() for m, row in c["psi"].items()
           if c["R_delta"]["MI"] and c["R_delta"]["MI"] >= 3 and c["mi"][m] >= (1 - DELTA) * H_S]
    if pts:
        lo = min(pts)
        s3["min_R12_where_MI_objective"] = {"R12": lo[0], "N_R12": N_COUNTS * lo[0],
                                            "times_floor": N_COUNTS * lo[0] / a_cal, "where": f"{lo[1]} m={lo[2]}"}
    s3["verdict"] = "PASS (gap found)" if s3["gap_points"] else "NULL (no clean gap)"
    s3["horodecki_p0.8"] = ex["horodecki_p0.8"]
    A["s3"] = s3
    return A


# ---------------------------------------------------------------------------
# Figures
# ---------------------------------------------------------------------------

def figures(A, suffix=""):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    plt.rcParams.update({"font.size": 9, "axes.spines.top": False, "axes.spines.right": False,
                         "axes.grid": True, "grid.color": "#e4e4e0", "grid.linewidth": 0.6})
    pm = A["psi_perf"]["mean"]
    band = A["cal"]["band"]
    paths = []

    fig, axes = plt.subplots(1, len(S1_THETAS), figsize=(15, 3.6), sharey=True)
    for ax, th in zip(axes, S1_THETAS):
        for i, ne in enumerate(S1_NE):
            c = A["s1"]["configs"][f"{th}|{ne}"]
            ax.plot(np.arange(ne + 1) / ne, c["mi_over_HS"], "-", color=COLORS[i], lw=2,
                    label=f"I(S:F)/H_S, N_E={ne}")
            ms = np.arange(1, ne // 2 + 1)
            y = [A["cm_psi"][f"{th}|{m}"]["psi"] / pm for m in ms]
            e = [2 * A["cm_psi"][f"{th}|{m}"]["psi_se"] / pm for m in ms]
            ax.errorbar(ms / ne, y, yerr=e, fmt=MARKERS[i], ms=5, color=COLORS[i], mfc="white", mew=1.5, lw=1,
                        label=f"Psi_v12-hat/Psi_perf, N_E={ne}")
        ax.axhline(1 - DELTA, color="#888", ls=":", lw=1)
        ax.set_title(f"theta = {th}")
        ax.set_xlabel("fragment fraction f = m / N_E")
        ax.set_ylim(-0.03, 2.05)
    axes[0].set_ylabel("I(S:F)/H_S (lines); Psi_v12-hat/Psi_perf (markers)")
    axes[-1].legend(fontsize=7, loc="upper left", frameon=False)
    fig.suptitle("Phase 2, Simulation 1: Darwinian c-maybe environment, correlation gate, B = 200, "
                 "N_counts = 1e4 (+/- 2 SE)", fontsize=9)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig1_plateau_phase2{suffix}.png")
    fig.savefig(p, dpi=150)
    plt.close(fig)
    paths.append(p)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4))
    ax = axes[0]
    for i, (th, ne) in enumerate(S2_CONFIGS):
        c = A["s2"]["configs"][f"{th}|{ne}"]
        f = np.arange(ne + 1) / ne
        mu, sd = np.array(c["mi_mean"]), np.array(c["mi_sd"])
        ax.plot(f, mu, "-", color=COLORS[i], lw=2, label=f"scrambled, theta={th}, N_E={ne}")
        ax.fill_between(f, mu - sd, mu + sd, color=COLORS[i], alpha=0.15, lw=0)
        ax.plot(f, c["mi_darwin"], "--", color=COLORS[i], lw=1.2, label=f"Darwinian, theta={th}, N_E={ne}")
    ax.set_xlabel("fragment fraction f = m / N_E")
    ax.set_ylabel("I(S:F) (bits), H_S = 1")
    nd = A["s2"]["configs"][f"{S2_CONFIGS[0][0]}|{S2_CONFIGS[0][1]}"]["rows"][1]["n"]
    ax.set_title(f"Partial information (mean +/- SD over {nd} Haar draws)")
    ax.legend(fontsize=6.5, frameon=False)
    ax = axes[1]
    ax.axhspan(*band, color="#cccccc", alpha=0.6, lw=0, label=f"v12 floor band {band[0]:.1f}-{band[1]:.1f}")
    for i, (th, ne) in enumerate(S2_CONFIGS):
        c = A["s2"]["configs"][f"{th}|{ne}"]
        ms = sorted(c["rows"])
        ax.errorbar(ms, [c["rows"][m]["N_R12"] for m in ms], yerr=[1.96 * c["rows"][m]["N_R12_se"] for m in ms],
                    fmt=MARKERS[i] + "-", color=COLORS[i], ms=5, lw=1.4, label=f"v12 gate, theta={th}, N_E={ne}")
        ax.plot(np.array(ms) + 0.08, [c["rows"][m]["N_R12_v11"] for m in ms], MARKERS[i] + ":", color=COLORS[i],
                mfc="white", ms=5, lw=1, label=f"v11 gate (same runs), theta={th}, N_E={ne}")
    ax.set_yscale("log")
    ax.set_xlabel("fragment size m (qubits per observer)")
    ax.set_ylabel("N_counts x R12-hat (mean, 95% CI)")
    ax.set_title("Scrambled records against the v12 floor")
    ax.legend(fontsize=6, frameon=False, ncol=2)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig2_scrambled_phase2{suffix}.png")
    fig.savefig(p, dpi=150)
    plt.close(fig)
    paths.append(p)

    names = [f"c-maybe theta={th} N_E=12" for th in S3_CM_THETAS] + \
            [f"hazy theta={th} h={hz} N_E={S3_HZ_NE}" for th, hz in S3_HZ]
    fig, axes = plt.subplots(2, 5, figsize=(17, 6.6))
    for ax, name in zip(axes.ravel()[[0, 1, 2, 3, 5, 6, 7, 8]], names):
        c = A["s3"]["configs"][name]
        ne = c["N_E"]
        ms = np.arange(ne + 1)
        ax.plot(ms, c["mi"], "-", color=COLORS[0], lw=2, label="I(S:F)")
        ax.plot(ms, c["chi_ptr_all"], "--", color=COLORS[1], lw=2, label="chi(S_Pi:F), pointer")
        ax.plot(ms, c["J_H_all"], ":", color=COLORS[2], lw=2, label="J_H (one Helstrom record)")
        mp = sorted(c["psi"])
        ax.plot(mp, [c["psi"][m]["psi"] / pm for m in mp], "o", color=COLORS[3], ms=6, label="Psi_v12-hat/Psi_perf")
        tf = [m for m in mp if "tiefix" in c["psi"][m]]
        if tf:
            ax.plot(tf, [c["psi"][m]["tiefix"]["psi"] / pm for m in tf], "D", color=COLORS[4], mfc="white",
                    ms=6, mew=1.5, label="tie-fixed records (R1t)")
        ax.axhline(1 - DELTA, color="#888", ls=":", lw=1)
        R = c["R_delta"]
        fr = lambda x: "-" if x is None else f"{x:.1f}"  # noqa: E731
        ax.set_title(name.replace(" N_E", "\nN_E") + f"\nR_d: MI {fr(R['MI'])}, chi {fr(R['chi_ptr'])}, "
                     f"J_H {fr(R['J_H'])}, Psi {fr(R['Psi'])}", fontsize=7.5)
        ax.set_xlabel("fragment size m")
        ax.set_ylim(-0.03, 2.05)
    axes[0, 0].legend(fontsize=6.5, frameon=False)
    for ax in (axes[0, 4], axes[1, 4]):
        ax.remove()
    ax = fig.add_subplot(1, 5, 5)
    s3 = A["s3"]
    xs, ys, cs = [], [], []
    for name, c in s3["configs"].items():
        for m, row in c["psi"].items():
            xs.append(row["J_H"]); ys.append(row["R12_inf_v12"]); cs.append(0 if name.startswith("c-maybe") else 1)
            if "tiefix" in row:
                xs.append(row["tiefix"]["J_H"]); ys.append(row["tiefix"]["R12_inf_v12"]); cs.append(2)
    xs, ys, cs = map(np.array, (xs, ys, cs))
    for k, lab in enumerate(("c-maybe (pure)", "hazy, primary records", "hazy, tie-fixed (even m)")):
        sel = cs == k
        ax.plot(xs[sel], ys[sel], MARKERS[k], color=COLORS[k], ms=6, mfc="white" if k == 2 else COLORS[k],
                mew=1.5, ls="none", label=lab)
    jj = np.linspace(0, 1, 200)
    pe = np.array([_pe_from_j(j) for j in jj])
    ax.plot(jj, (1 - np.array([v1.h2(2 * p * (1 - p)) for p in pe])) / 2, "k-", lw=1,
            label="symmetric records: (1 - h(2Pe(1-Pe)))/2")
    ax.set_xlabel("J_H, one observer's accessible information (bits)")
    ax.set_ylabel("exact R12_inf with the v12 gate")
    ax.set_title(f"Psi_v12 vs accessible information\nSpearman: all {s3['spearman_all_primary']:.3f}, "
                 f"symmetric {s3['spearman_symmetric']:.3f}", fontsize=8)
    ax.legend(fontsize=6.5, frameon=False)
    fig.suptitle("Phase 2, Simulation 3: MI, Holevo, accessible information and Psi_v12 (delta = 0.1)", fontsize=9)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig3_discord_phase2{suffix}.png")
    fig.savefig(p, dpi=150)
    plt.close(fig)
    paths.append(p)
    return paths


def _pe_from_j(j):
    """Invert J = 1 - h(Pe) on [0, 1/2]."""
    lo, hi = 0.0, 0.5
    for _ in range(60):
        mid = (lo + hi) / 2
        if 1 - v1.h2(mid) > j:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def report(A, meta, suffix=""):
    L = []
    a = L.append
    cal, s1, s2, s3 = A["cal"], A["s1"], A["s2"], A["s3"]
    band = cal["band"]
    a("# CRT v12, phase 2: the correlation gate, and Simulations 1 to 3 re-run")
    a("")
    a(f"Generated by `python3 run_v12b.py{' --quick' if suffix else ''}` (master seed {MASTER_SEED_V12B}, disjoint "
      f"from phase 1), Python {meta['python']}, numpy {meta['numpy']}, scipy {meta['scipy']}, {meta['workers']} "
      f"workers, wall time {meta['wall_s']:.0f} s, {meta['n_runs']} pipeline runs.")
    a("")
    a("The gate, its reason, its limit checks, the floor-constant derivation and calibration rule, and the "
      "phase-2 predictions and failure conditions were committed in the docstring of `run_v12b.py` (commit "
      "e4cd77b) before anything in this report was computed. The phase-1 pre-registration (63a4baa) and the "
      "phase-1 report (`REPORT.md`) are unchanged; phase 1 stays reported as run.")
    a("")
    a("## Verdicts (phase-2 rules)")
    a("")
    a("| Simulation | Phase 1 (v11 gate) | Phase 2 (v12 gate) | Key numbers (phase 2) |")
    a("|---|---|---|---|")
    a(f"| 1 Redundancy plateau | PASS | **{s1['verdict']}** | {s1['n_pass']} pass, {s1['n_fail']} fail, "
      f"{s1['n_inconclusive']} inconclusive of {s1['n_applicable']} |")
    a(f"| 2 Scrambled environment | FAIL | **{s2['verdict']}** | (A) {', '.join(s2['failA']) or 'none'}; "
      f"(B) {', '.join(s2['failB']) or 'none'} outside the band {band[0]:.1f}-{band[1]:.1f} |")
    mn = s3.get("min_R12_where_MI_objective")
    a(f"| 3 Discord gap | NULL | **{s3['verdict']}** | gap points: {', '.join(s3['gap_points']) or 'none'}"
      + (f"; smallest R12-hat where MI says objective {f4(mn['R12'])} = {mn['times_floor']:.0f} x floor "
         f"({mn['where']})" if mn else "") + " |")
    a("")
    a("## The v12 gate")
    a("")
    a("I_c(rho) = I(A:B)_rho / (2 log2 min(d_A, d_B)), the quantum mutual information of the two parties over "
      "its maximum (for two qubits, I(A:B)/2). G_c = sqrt((I_c(rho1~) + eps)(I_c(rho2~) + eps))/(1 + eps), and "
      "Psi_v12 = F G_c C_eff D_hat with everything else as in v11. Exact identity for two qubits: "
      "I_v11 = I_c + (I(rho_A) + I(rho_B))/2. The v12 gate is the v11 gate with the marginal (lopsidedness) "
      "terms removed; it equals v11 exactly when both marginals are maximally mixed and is smaller otherwise. "
      "Reasons for this candidate over the alternatives are in the pre-registration. Implemented as "
      "`crt.correlation_informativeness` and `crt.functional(..., gate_kind='v12')` (default 'v11', so every "
      "v11 and phase-1 number is unchanged; `test_crt.py` passes).")
    a("")
    a("Correction to the pre-registration text (no rule depends on it): the separable state "
      "(|00><00| + |11><11|)/2 has I_c = 1/2, which exceeds I_c(Werner(p)) for p < 0.7476, not 0.749 as written.")
    a("")
    a("## Floor constant: derivation and calibration")
    a("")
    a(f"- First-order derivation (pre-stated): a_c = (2.25/ln 2)(sqrt(2) Gamma(5)/Gamma(4.5))^2 = {A_C_THEORY}.")
    a(f"- Calibration, rho_R = I/4, N = 1e4, {cal['I/4']['n']} runs on a separate seed stream: "
      f"a_c,cal = {cal['I/4']['a']:.2f} +/- {cal['I/4']['se']:.2f} (SE; per-run SD {cal['I/4']['sd']:.1f}). "
      f"Relative deviation from the derivation {100 * cal['rel_dev_theory']:+.1f}%: derivation "
      f"**{'confirmed' if cal['derivation_confirmed'] else 'NOT confirmed'}** (pre-stated tolerance 5%).")
    a(f"- Floor band for the tests: a_c,cal x [31/34.3, 37/34.3] = [{band[0]:.2f}, {band[1]:.2f}].")
    for lab in ("biased p=0.4", "biased p=0.3"):
        a(f"- Independent biased records diag(p, 1-p) (x) diag(p, 1-p), {lab.split()[1]} (exact I_c = 0): "
          f"N R12-hat = {cal[lab]['a']:.2f} +/- {cal[lab]['se']:.2f} ({cal[lab]['n']} runs).")
    a(f"- Pre-stated caveat check: p = 0.4 {'inside' if cal['biased_0.4_in_band'] else 'OUTSIDE'} the band.")
    a(f"- For comparison, the v11 constant is 34.3 (phase 1 control: 33.31 +/- 0.68).")
    a("")
    # S1
    a("## Simulation 1 (phase 2): redundancy plateau")
    a("")
    a("Prediction, failure conditions and verdict rule exactly as phase 1 (pre-registration), with the v12 "
      "gate, B = 200 and fresh seeds. c-maybe records are unbiased, so the exact record gate equals phase 1's.")
    a("")
    a(f"**Verdict: {s1['verdict']}.** Psi_perf (finite-N, v12) = {A['psi_perf']['mean']:.4f} +/- "
      f"{A['psi_perf']['se']:.4f} ({A['psi_perf']['n']} runs); exact 0.2375.")
    a("")
    a("| theta | N_E | m_delta^MI | R_delta^MI | m_delta^Psi | R_delta^Psi | onset ratio | ratio, exact reference "
      "(secondary) | status |")
    a("|---|---|---|---|---|---|---|---|---|")
    for key, c in s1["configs"].items():
        th, ne = key.split("|")
        a(f"| {th} | {ne} | {f4(c['m_delta_MI'], 2)} | {f4(c['R_delta_MI'], 2)} | {f4(c['m_delta_Psi'], 2)} | "
          f"{f4(c['R_delta_Psi'], 2)} | {f4(c['onset_ratio'], 2)} | {f4(c['onset_ratio_exact_ref'], 2)} | "
          f"{c['status']} |")
    a("")
    a("Psi-hat per (theta, m), 40 runs each (v12 gate; v11 gate on the same runs for comparison):")
    a("")
    a("| theta | m | P_e | J_H | I(r_A:r_B) | R12_inf v12 (= v11 here) | R12-hat v12 | Psi-hat v12 | Psi-hat v11 "
      "(same runs) | partitions |")
    a("|---|---|---|---|---|---|---|---|---|---|")
    for th in THETAS:
        for m in CM_M:
            c = A["cm_psi"][f"{th}|{m}"]
            e = c["exact"]
            a(f"| {th} | {m} | {f4(e['Pe'])} | {f4(e['J_H'])} | {f4(e['I_records'])} | {f4(e['R12_inf_v12'])} | "
              f"{f4(c['R12'])} +/- {f4(c['R12_se'])} | {f4(c['psi'])} +/- {f4(c['psi_se'])} | {f4(c['psi_v11'])} | "
              f"{c['partitions']} |")
    a("")
    # S2
    a("## Simulation 2 (phase 2): scrambled environment")
    a("")
    a(f"Failure conditions (pre-stated): (A) as phase 1; (B) at N_E = 12, m in {{1, 2, 3}}, the 95% interval of "
      f"N R12-hat entirely outside [{band[0]:.2f}, {band[1]:.2f}].")
    a("")
    a(f"**Verdict: {s2['verdict']}.** (A) violations: {', '.join(s2['failA']) or 'none'}. (B) violations: "
      f"{', '.join(s2['failB']) or 'none'}.")
    a("")
    a("| theta | N_E | m | N R12-hat v12 (mean, 95% CI) | median | N R12-hat v11, same runs (95% CI) | "
      "N I_c exact (mean) | N I_v11 exact (mean) | I(r_A:r_B) | mean / max abs(bias - 1/2) | J_H | "
      "Darwinian N R12-hat |")
    a("|---|---|---|---|---|---|---|---|---|---|---|---|")
    for key, c in s2["configs"].items():
        th, ne = key.split("|")
        for m, r in c["rows"].items():
            a(f"| {th} | {ne} | {m} | {r['N_R12']:.2f} [{r['ci95'][0]:.2f}, {r['ci95'][1]:.2f}] | "
              f"{r['N_R12_median']:.1f} | {r['N_R12_v11']:.1f} [{r['ci95_v11'][0]:.1f}, {r['ci95_v11'][1]:.1f}] | "
              f"{r['N_Ic_exact']:.2f} | {r['N_Igate_v11_exact']:.1f} | {f4(r['I_records'])} | "
              f"{f4(r['bias_dev'])} / {f4(r['bias_dev_max'])} | {f4(r['J_H_A'])} | {f4(r['darwin_N_R12'], 1)} |")
    a("")
    a("Mean partial information, scrambled vs Darwinian:")
    a("")
    for key, c in s2["configs"].items():
        a(f"- {key.replace('|', ', N_E = ')}: scrambled " + ", ".join(f"{x:.3f}" for x in c["mi_mean"])
          + "; Darwinian " + ", ".join(f"{x:.3f}" for x in c["mi_darwin"]))
    a("")
    # S3
    a("## Simulation 3 (phase 2): the discord gap")
    a("")
    a(f"Gap criterion (pre-stated): R_delta^MI >= 3, I(S:F_m) >= 0.9 H_S, m <= N_E/2, and mean R12-hat <= "
      f"2 a_c,cal / N = {s3['floor_threshold_R12']:.2e}.")
    a("")
    a(f"**Verdict: {s3['verdict']}.** Gap points: {', '.join(s3['gap_points']) or 'none'}. Points where Psi "
      f"reaches 0.9 Psi_perf while I < 0.9 H_S: {', '.join(s3['reverse_points']) or 'none'}.")
    if mn:
        a("")
        a(f"Smallest R12-hat where MI says objective: {f4(mn['R12'])} (N R12-hat = {mn['N_R12']:.0f}, "
          f"{mn['times_floor']:.0f} x a_c,cal), at {mn['where']}.")
    a("")
    a("| configuration | R_delta MI | R_delta chi (pointer) | R_delta J_H | R_delta Psi_v12 |")
    a("|---|---|---|---|---|")
    for name, c in s3["configs"].items():
        R = c["R_delta"]
        a(f"| {name} | {f4(R['MI'], 2)} | {f4(R['chi_ptr'], 2)} | {f4(R['J_H'], 2)} | {f4(R['Psi'], 2)} |")
    a("")
    a("Per point (m <= N_E/2): exact gates, records, and Psi-hat; tie-fixed records (R1t, secondary) where the "
      "tie rule mattered:")
    a("")
    a("| configuration | m | I(S:F) | J_H | record bias P(r=0) | I(r_A:r_B) | R12_inf v11 | R12_inf v12 | "
      "Psi_v12-hat/Psi_perf | Psi_v11-hat/Psi_perf (same runs) | R1t: bias, R12_inf v12, Psi_v12-hat/Psi_perf |")
    a("|---|---|---|---|---|---|---|---|---|---|---|")
    pm = A["psi_perf"]["mean"]
    for name, c in s3["configs"].items():
        for m, r in c["psi"].items():
            t = r.get("tiefix")
            ts = (f"{t['bias']:.3f}, {f4(t['R12_inf_v12'])}, {f4(t['psi'] / pm, 3)}" if t else "-")
            a(f"| {name} | {m} | {f4(c['mi'][m])} | {f4(r['J_H'])} | {r['bias']:.3f} | {f4(r['I_records'])} | "
              f"{f4(r['R12_inf_v11'])} | {f4(r['R12_inf_v12'])} | {f4(r['psi'] / pm, 3)} | "
              f"{f4(r['psi_v11'] / pm if r['psi_v11'] is not None else None, 3)} | {ts} |")
    a("")
    a("## How Psi_v12 relates to accessible-information redundancy")
    a("")
    a(f"- Spearman correlation between the exact R12_inf (v12 gate) and one observer's accessible information "
      f"J_H over all {len([1 for c in s3['configs'].values() for _ in c['psi']])} Simulation-3 points with primary "
      f"records: {s3['spearman_all_primary']:.4f}. Over the {s3['n_symmetric_points']} points with symmetric "
      f"records (all c-maybe points; hazy odd m; hazy even m with the tie fix): {s3['spearman_symmetric']:.4f}, "
      f"with {len(s3['monotone_violations_symmetric'])} order violations.")
    is_mono = not s3["monotone_violations_symmetric"]
    if not is_mono:
        a(f"- Plainly: **not exactly.** On the symmetric-record points the Spearman correlation is "
          f"{s3['spearman_symmetric']:.4f} with {len(s3['monotone_violations_symmetric'])} order violations "
          f"({s3['monotone_violations_symmetric'][:5]}). The analytic relation below holds only where its "
          "assumptions hold.")
    a(("- Plainly: **yes.** " if is_mono else "- Analytic relation: ") + "Wherever the two observers' records are conditionally independent and identically "
      "distributed given the pointer value with symmetric errors (every pure c-maybe point, and the hazy points "
      "once ties are broken fairly), the exact Psi_v12 is a strictly increasing function of a single number, the "
      "Helstrom error P_e, through R12_inf = (1 - h(2 P_e (1 - P_e)))/2, while J_H = 1 - h(P_e). Psi_v12 is "
      "therefore a monotone of one observer's accessible information there, and R_delta^Psi is an "
      "accessible-information redundancy with a stricter, two-observer threshold (0.9 of the two-observer gate "
      "corresponds to J_H of about 0.94 to 0.95 bits, against 0.9 for R_delta^J_H). What Psi adds beyond J_H is (i) "
      "that it is computed from finite counts of the observers' records alone, without access to S or to the "
      "coupling, and (ii) that it is sensitive to records that are not conditionally independent, where J_H of "
      "one observer says nothing about agreement; the scrambled environment is the only such case here, and "
      "there both are near zero.")
    a("- The primary hazy records at even m (biased by the phase-1 tie rule) are where the correlation is not "
      "exactly 1: the v12 gate no longer rewards their bias, but their I(r_A:r_B) is not the symmetric-record "
      "function of J_H.")
    a("")
    a("## What a referee would attack")
    a("")
    a(ATTACKS)
    a("")
    a("## Figures")
    a("")
    for pth in meta.get("figures", []):
        a(f"- `{os.path.relpath(pth, OUT)}`")
    path = os.path.join(OUT, f"REPORT_phase2{suffix}.md")
    with open(path, "w") as fh:
        fh.write("\n".join(L) + "\n")
    return path


ATTACKS = """1. **The gate was changed after a failure.** The v12 gate was designed in response to phase 1's
   Simulation 2 failure; a pass of Simulation 2 under it is a pass of a repaired instrument, not a
   confirmation of the original one. Phase 1 stays reported as a failure of the v11 gate on this task.
2. **It changes Psi everywhere, not only here.** The v12 gate is no longer a function of the spectrum:
   Werner(p) and the matched separable control sigma(p) of v11 Section 4.1 now differ (sigma(p) has biased
   marginals). Lemma 4, its corollary, the floor constant (34.3 becomes about 27.6), the V2 failure band and
   P2's record all have to be restated for v12. It is still not an entanglement witness (separable
   (|00><00| + |11><11|)/2 scores 1/2).
3. **Psi_v12 is, on these models, a monotone of accessible information.** R_delta^Psi carries no information
   about objectivity that J_H of one observer does not, beyond a stricter threshold. Its claim to novelty must
   rest on being estimable from the observers' records alone at finite N, with a known floor.
4. **The record is still a modelling choice.** Helstrom measurements need the coupling, the pointer basis and
   collective measurements on up to 6 qubits. A local, per-qubit majority vote would give weaker records and
   different R_delta^Psi. The tie rule (primary) versus the fair tie break (secondary) changes the hazy
   numbers at even m.
5. **Classical records cap I_c at 1/2.** Psi_v12 for perfect classical agreement is 0.2375 (r_inf x D_hat x 1/2),
   so the gate's range is half used; and C_eff = 1/2 throughout (two merged estimators) carries no
   information about the records, as in v11.
6. **Thresholds are not calibrated to each other.** 0.9 of the two-observer gate and 0.9 H_S of MI are different
   demands; onset ratios depend on that pairing and on the finite-N reference (secondary column).
7. **Finite statistics.** One N (1e4); B = 200 (S1, S3) and 100 (S2), not 1000; 40 / 30 runs per point; 100 Haar
   draws. The floor band is +/- 8 to 10 percent around a calibrated constant, as in V2; biased independent
   records have their own finite-N floor (calibration rows above).
8. **Regularization is not product-preserving.** rho~ = (1 - delta_reg) rho + delta_reg I/4 of an exactly
   independent record state carries a small shared information: I_c(rho~) is 0 for unbiased product states
   but up to 2.4e-6 for the pure product |00> (7e-9 at bias 0.4 against a constant record). Negligible
   against the floor (a_c/N = 2.8e-3 at N = 1e4), but the exact "eps floor" of L3 holds only before
   regularization.
9. **Scope.** All environments are qubits with one coupling angle; no structured, bosonic or spin-chain
   environment, no multi-level S; the discord gap was searched only in the pre-registered grid."""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def _intkeys(o):
    if isinstance(o, dict):
        return {(int(k) if isinstance(k, str) and k.isdigit() else k): _intkeys(v) for k, v in o.items()}
    if isinstance(o, list):
        return [_intkeys(v) for v in o]
    return o


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--report-only", action="store_true")
    ap.add_argument("--workers", type=int, default=2)
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    suffix = "_quick" if args.quick else ""
    jpath = os.path.join(OUT, f"results_v12b{suffix}.json")
    if args.report_only:
        with open(jpath) as fh:
            J = json.load(fh)
        A, meta = _intkeys(J["analysis"]), J["meta"]
        meta["figures"] = figures(A, suffix)
        report(A, meta, suffix)
        return
    t0 = time.time()
    log = open(os.path.join(OUT, f"run_v12b{suffix}.log"), "w")

    def say(msg):
        line = f"[{time.time() - t0:7.1f} s] {msg}"
        print(line, flush=True)
        log.write(line + "\n")
        log.flush()

    say("stage 0: exact quantities and task lists")
    ex, cal, main_tasks = build(args.quick)
    say(f"stage 0 done: {len(cal)} calibration runs, {len(main_tasks)} test runs")
    results = []
    with Pool(args.workers) as pool:
        say("stage C: floor calibration (separate seed stream), before any test")
        for r in pool.imap_unordered(task, cal, chunksize=16):
            results.append(r)
        nr = [N_COUNTS * o["R12"] for k, o in results if k == ("cal", "I/4")]
        say(f"stage C done: a_c,cal = {np.mean(nr):.2f} +/- {np.std(nr, ddof=1) / math.sqrt(len(nr)):.2f}")
        for i, r in enumerate(pool.imap_unordered(task, main_tasks, chunksize=4)):
            results.append(r)
            if (i + 1) % 250 == 0:
                say(f"  {i + 1}/{len(main_tasks)} test runs")
    say("analysis")
    g = {}
    for k, o in results:
        g.setdefault(k, []).append(o)
    A = _intkeys(clean(analyze(ex, g)))
    meta = {"python": platform.python_version(), "numpy": np.__version__, "scipy": scipy.__version__,
            "workers": args.workers, "n_runs": len(cal) + len(main_tasks), "master_seed": MASTER_SEED_V12B,
            "B_main": B_MAIN, "B_s2": B_S2, "quick": args.quick, "wall_s": time.time() - t0}
    meta["figures"] = figures(A, suffix)
    meta["wall_s"] = time.time() - t0
    with open(jpath, "w") as fh:
        json.dump(clean({"meta": meta, "analysis": A, "exact": ex}), fh, indent=1)
    rp = report(A, meta, suffix)
    say(f"verdicts: S1 {A['s1']['verdict']}, S2 {A['s2']['verdict']}, S3 {A['s3']['verdict']}")
    say(f"wrote {jpath}, {rp}")
    log.close()


if __name__ == "__main__":
    main()
