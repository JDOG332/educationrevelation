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

from __future__ import annotations  # noqa: E402  (kept after the docstring block)

import argparse  # noqa: E402
import json  # noqa: E402
import math  # noqa: E402
import os  # noqa: E402
import platform  # noqa: E402
import sys  # noqa: E402
import time  # noqa: E402
from functools import reduce  # noqa: E402
from multiprocessing import Pool  # noqa: E402

import numpy as np  # noqa: E402
import scipy  # noqa: E402
from scipy.optimize import minimize  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import crt  # noqa: E402

MASTER_SEED_V12 = 20261101
OUT = os.path.join(HERE, "results", "v12")
DELTA = 0.1
A_FLOOR = 34.3            # V2 floor constant (v11, Phase 3)
FLOOR_BAND = (31.0, 37.0)  # V2 failure band
N_COUNTS = 10_000
B_BOOT = 20
DHAT = crt.d_hat()
H_S = 1.0                 # pointer entropy of |+>
PRI = (0.5, 0.5)          # pointer priors |alpha|^2, |beta|^2

THETAS = {"pi/16": math.pi / 16, "pi/8": math.pi / 8, "pi/6": math.pi / 6,
          "pi/4": math.pi / 4, "pi/3": math.pi / 3, "pi/2": math.pi / 2}
TH_IDX = {k: i for i, k in enumerate(THETAS)}
S1_THETAS = ("pi/8", "pi/6", "pi/4", "pi/3", "pi/2")
S1_NE = (6, 8, 10, 12)
CM_M = (1, 2, 3, 4, 5, 6)
S2_CONFIGS = (("pi/2", 8), ("pi/2", 10), ("pi/2", 12), ("pi/4", 12))
S3_CM_THETAS = ("pi/16", "pi/8", "pi/4", "pi/2")
S3_CM_NE = (4, 8, 12)
S3_HZ = (("pi/4", 0.3), ("pi/4", 0.6), ("pi/2", 0.3), ("pi/2", 0.6))
S3_HZ_NE = 10

PAULI_VEC = np.array([crt.PAULI["X"], crt.PAULI["Y"], crt.PAULI["Z"]])

# ---------------------------------------------------------------------------
# Information tools
# ---------------------------------------------------------------------------


def h2(p: float) -> float:
    p = float(p)
    if p <= 0.0 or p >= 1.0:
        return 0.0
    return -(p * math.log2(p) + (1 - p) * math.log2(1 - p))


def ent_eigs(ev) -> float:
    ev = np.clip(np.real(np.asarray(ev)), 0.0, None)
    ev = ev[ev > 1e-15]
    return float(-np.sum(ev * np.log2(ev)))


def ent_dm(rho) -> float:
    return ent_eigs(np.linalg.eigvalsh(crt.herm(rho)))


def shannon(p) -> float:
    return crt.shannon_bits(np.asarray(p, dtype=float).ravel())


def product_vec(v, n):
    return reduce(np.kron, [np.asarray(v, dtype=complex)] * n, np.array([1.0 + 0j]))


def product_op(X, n):
    return reduce(np.kron, [X] * n, np.array([[1.0 + 0j]]))


def rot(theta):
    c, s = math.cos(theta), math.sin(theta)
    return np.array([[c, -s], [s, c]], dtype=complex)


def haar_vec(d, rng):
    v = rng.normal(size=d) + 1j * rng.normal(size=d)
    return v / np.linalg.norm(v)


# ---------------------------------------------------------------------------
# States (S is qubit 0, the most significant; environment qubits 1..N_E)
# ---------------------------------------------------------------------------

def cmaybe_psi(theta, n_env):
    """(|0>|0..0> + |1>|e1..e1>)/sqrt2, e1 = cos(theta)|0> + sin(theta)|1>."""
    b0 = product_vec([1, 0], n_env)
    b1 = product_vec([math.cos(theta), math.sin(theta)], n_env)
    return np.concatenate([b0, b1]) / math.sqrt(2)


def scrambled_psi(theta, n_env, rng):
    """c-maybe state followed by a Haar unitary on E, sampled exactly:
    (U|E0>, U|E1>) has the law of (v0, g v0 + sqrt(1-g^2) w)."""
    d = 2 ** n_env
    g = math.cos(theta) ** n_env
    v0 = haar_vec(d, rng)
    w = haar_vec(d, rng)
    w = w - v0 * np.vdot(v0, w)
    w = w / np.linalg.norm(w)
    v1 = g * v0 + math.sqrt(max(0.0, 1 - g * g)) * w
    return np.concatenate([v0, v1]) / math.sqrt(2)


def _matricize(psi, n, keep):
    t = psi.reshape((2,) * n)
    rest = [q for q in range(n) if q not in keep]
    return np.transpose(t, list(keep) + rest).reshape(2 ** len(keep), -1)


def pure_entropy(psi, n, subset):
    subset = sorted(subset)
    k = len(subset)
    if k == 0 or k == n:
        return 0.0
    if k > n - k:
        subset = [q for q in range(n) if q not in subset]
    sv = np.linalg.svd(_matricize(psi, n, subset), compute_uv=False)
    return ent_eigs(sv ** 2)


def reduced_dm_pure(psi, n, keep):
    m = _matricize(psi, n, list(keep))
    return m @ np.conj(m.T)


def mi_curve_pure(psi, n_env):
    n = n_env + 1
    HS = pure_entropy(psi, n, [0])
    out = [0.0]
    for m in range(1, n_env + 1):
        F = list(range(1, m + 1))
        out.append(HS + pure_entropy(psi, n, F) - pure_entropy(psi, n, [0] + F))
    return np.array(out)


def branch_vectors(psi, n_env):
    """psi = sum_s sqrt(p_s)|s>|v_s>; returns normalized v_0, v_1."""
    d = 2 ** n_env
    v = [psi[s * d:(s + 1) * d] / math.sqrt(PRI[s]) for s in (0, 1)]
    return v


def cond_state_pure(v, n_env, frag):
    return reduced_dm_pure(v, n_env, frag)


def hazy_env(h):
    return (1 - h) * np.diag([1.0, 0.0]).astype(complex) + h * np.eye(2) / 2


def hazy_rho_SF(theta, h, n_env, m):
    """Exact rho_{S F_m} for S in |+> and N_E hazy environment qubits."""
    rE = hazy_env(h)
    U = [np.eye(2, dtype=complex), rot(theta)]
    d = 2 ** m
    out = np.zeros((2 * d, 2 * d), dtype=complex)
    for s in (0, 1):
        for t in (0, 1):
            X = U[s] @ rE @ np.conj(U[t].T)
            gam = np.trace(X) ** (n_env - m)
            out[s * d:(s + 1) * d, t * d:(t + 1) * d] = 0.5 * gam * product_op(X, m)
    return out


def split_SF(rho, dF):
    r = rho.reshape(2, dF, 2, dF)
    return np.einsum("ajbj->ab", r), np.einsum("ajak->jk", r)


def mi_from_rho_SF(rho, dF):
    rS, rF = split_SF(rho, dF)
    return ent_dm(rS) + ent_dm(rF) - ent_dm(rho)


def hazy_mi_curve(theta, h, n_env):
    return np.array([0.0] + [mi_from_rho_SF(hazy_rho_SF(theta, h, n_env, m), 2 ** m)
                             for m in range(1, n_env + 1)])


def horodecki_state(p=0.8):
    """Le & Olaya-Castro PRL 122, 010403, Eq. C1 (Horodecki et al.)."""
    a, b = math.sqrt(p), math.sqrt(1 - p)
    k1 = np.zeros(4, complex); k1[0] = a; k1[3] = b        # a|00> + b|11>
    k2 = np.zeros(4, complex); k2[2] = a; k2[1] = b        # a|10> + b|01>
    return p * crt.proj(k1) + (1 - p) * crt.proj(k2)


# ---------------------------------------------------------------------------
# Classical correlation, Holevo quantity, discord (projective, qubit measured)
# ---------------------------------------------------------------------------

def _bloch(t, ph):
    return np.array([math.sin(t) * math.cos(ph), math.sin(t) * math.sin(ph), math.cos(t)])


def cond_entropy_after(r4, n, dY):
    """sum_k p_k H(rho_Y|k) after measuring the qubit X along n; r4 = rho_XY
    reshaped (2, dY, 2, dY)."""
    P = (np.eye(2) + np.einsum("i,ijk->jk", n, PAULI_VEC)) / 2
    tot = 0.0
    for Pk in (P, np.eye(2) - P):
        rY = np.einsum("ab,bjak->jk", Pk, r4)
        pk = float(np.real(np.trace(rY)))
        if pk > 1e-14:
            tot += pk * ent_dm(rY / pk)
    return tot


def classical_corr(rho_XY, dY, n_fixed=None):
    """J(Y|X) = H(Y) - min_n sum_k p_k H(Y|k), projective measurement of the
    qubit X along n (or along n_fixed). Returns (J, best n)."""
    r4 = rho_XY.reshape(2, dY, 2, dY)
    HY = ent_dm(np.einsum("ajak->jk", r4))
    if n_fixed is not None:
        return HY - cond_entropy_after(r4, np.asarray(n_fixed, float), dY), n_fixed
    best = (math.inf, None)
    starts = [(0.0, 0.0), (math.pi / 2, 0.0), (math.pi / 2, math.pi / 2),
              (math.pi / 4, 0.3), (2.0, 2.0), (1.0, 4.0)]
    for t0 in starts:
        res = minimize(lambda x: cond_entropy_after(r4, _bloch(*x), dY), np.array(t0),
                       method="Nelder-Mead", options={"xatol": 1e-7, "fatol": 1e-12, "maxiter": 600})
        if res.fun < best[0]:
            best = (float(res.fun), _bloch(*res.x))
    for t0 in starts[:3]:    # the axes themselves
        v = cond_entropy_after(r4, _bloch(*t0), dY)
        if v < best[0]:
            best = (v, _bloch(*t0))
    return HY - best[0], best[1]


def swap_to_FS(rho_SF, dF):
    """Reorder a (S qubit) x (F, dim dF) operator to F x S."""
    r = rho_SF.reshape(2, dF, 2, dF).transpose(1, 0, 3, 2)
    return r.reshape(2 * dF, 2 * dF)


def discord_table(rho_SF, dF):
    """I, chi in the pointer basis, chi maximized over projective S
    measurements, D_S = I - chi_max; for a qubit fragment also J(S|F) and
    D_F = I - J(S|F)."""
    I = mi_from_rho_SF(rho_SF, dF)
    chi_ptr, _ = classical_corr(rho_SF, dF, n_fixed=[0, 0, 1])
    chi_max, nbest = classical_corr(rho_SF, dF)
    out = {"I": I, "chi_ptr": chi_ptr, "chi_max": max(chi_max, chi_ptr), "D_S": I - max(chi_max, chi_ptr),
           "D_ptr": I - chi_ptr, "n_best_S": [float(x) for x in nbest]}
    if dF == 2:
        J, nF = classical_corr(swap_to_FS(rho_SF, 2), 2)
        out.update({"J_SgivenF": J, "D_F": I - J, "n_best_F": [float(x) for x in nF]})
    return out


# ---------------------------------------------------------------------------
# Observers: Helstrom records
# ---------------------------------------------------------------------------

def helstrom(r0, r1, p0=PRI[0], p1=PRI[1], tol=1e-14):
    w, v = np.linalg.eigh(crt.herm(p0 * r0 - p1 * r1))
    pos = w > tol
    Pi0 = v[:, pos] @ np.conj(v[:, pos].T)
    return Pi0, np.eye(r0.shape[0]) - Pi0


def rec_given_s(Pi0, rho):
    q = float(np.clip(np.real(np.trace(Pi0 @ rho)), 0.0, 1.0))
    return np.array([q, 1 - q])


def joint_records_product(PA, PB):
    """P(a,b) = sum_s p_s P_A(a|s) P_B(b|s); PA[s] = (P(0|s), P(1|s))."""
    return sum(PRI[s] * np.outer(PA[s], PB[s]) for s in (0, 1))


def joint_records_pure(v, n_env, m, PiA, PiB):
    """Exact P(a,b) for observers on qubits [0,m) and [m,2m) of the
    branch vectors v_s (S traced, so P = sum_s p_s P(a,b|s))."""
    dA = 2 ** m
    P = np.zeros((2, 2))
    for s in (0, 1):
        V = v[s].reshape(dA, dA, -1)
        for a, Pa in enumerate(PiA):
            W = np.einsum("ij,jbr->ibr", Pa, V)
            for b, Pb in enumerate(PiB):
                X = np.einsum("bj,ijr->ibr", Pb, W)
                P[a, b] += PRI[s] * float(np.real(np.vdot(X, X)))
    return P / P.sum()


def accessible_helstrom(PA):
    """I(s:r) for one observer, PA[s] = P(r|s)."""
    pr = PRI[0] * PA[0] + PRI[1] * PA[1]
    return shannon(pr) - PRI[0] * shannon(PA[0]) - PRI[1] * shannon(PA[1])


def record_state(P, symmetrize=False):
    P = np.asarray(P, float).reshape(2, 2)
    if symmetrize:
        P = 0.5 * (P + P[::-1, ::-1])
    return np.diag(P.ravel()).astype(complex), P


def record_diag(P):
    P = np.asarray(P, float).reshape(2, 2)
    pA, pB = P.sum(1), P.sum(0)
    H = shannon(P)
    rho = np.diag(P.ravel()).astype(complex)
    Ireg = crt.informativeness(crt.regularize(rho))
    return {"P": P.ravel().tolist(), "bias_A": float(pA[0]), "bias_B": float(pB[0]),
            "H_joint": H, "I_records": shannon(pA) + shannon(pB) - H,
            "q_disagree": float(P[0, 1] + P[1, 0]), "I_gate_exact": Ireg,
            "R12_inf": crt.gate(Ireg, Ireg), "psi_inf_lemma4": 0.5 * DHAT * crt.gate(Ireg, Ireg)}


def cmaybe_records(theta, m):
    """Observers on two disjoint m-qubit fragments of the pure c-maybe
    environment. Conditional fragment states are product and independent of
    N_E, so the record law depends on (theta, m) only."""
    r0 = product_op(crt.proj(np.array([1, 0], complex)), m)
    r1 = product_op(crt.proj(np.array([math.cos(theta), math.sin(theta)], complex)), m)
    Pi0, _ = helstrom(r0, r1)
    PA = [rec_given_s(Pi0, r0), rec_given_s(Pi0, r1)]
    return joint_records_product(PA, PA), PA


def hazy_records(theta, h, m):
    rE = hazy_env(h)
    r0 = product_op(rE, m)
    U = rot(theta)
    r1 = product_op(U @ rE @ np.conj(U.T), m)
    Pi0, _ = helstrom(r0, r1)
    PA = [rec_given_s(Pi0, r0), rec_given_s(Pi0, r1)]
    return joint_records_product(PA, PA), PA


def scrambled_records(psi, n_env, m):
    v = branch_vectors(psi, n_env)
    FA, FB = list(range(m)), list(range(m, 2 * m))
    out = []
    for frag in (FA, FB):
        r0 = cond_state_pure(v[0], n_env, frag)
        r1 = cond_state_pure(v[1], n_env, frag)
        Pi0, Pi1 = helstrom(r0, r1)
        out.append(((Pi0, Pi1), [rec_given_s(Pi0, r0), rec_given_s(Pi0, r1)]))
    (PiA, PA), (PiB, PB) = out
    return joint_records_pure(v, n_env, m, PiA, PiB), PA, PB


# ---------------------------------------------------------------------------
# Psi-hat worker (the v11 functional, unchanged)
# ---------------------------------------------------------------------------

KEEP = ("psi", "R12", "F", "I1", "I2", "G_eps", "C0", "C_eff", "n_active", "n_unique")


def task_psi(args):
    key, rho, seed = args
    raw = crt.simulate(rho, seed, crt.SimConfig(N=N_COUNTS, B_boot=B_BOOT))
    f = crt.functional(raw)
    return key, {k: f[k] for k in KEEP}


def seed(*items):
    return (MASTER_SEED_V12,) + tuple(int(x) for x in items)


# ---------------------------------------------------------------------------
# Small analysis helpers
# ---------------------------------------------------------------------------

def mean_se(x):
    x = np.asarray(x, float)
    if x.size < 2:
        return float(x.mean()), float("nan")
    return float(x.mean()), float(x.std(ddof=1) / math.sqrt(x.size))


def crossing(ms, ys, level):
    """Smallest (linearly interpolated) m at which ys first reaches level."""
    for i in range(1, len(ms)):
        if ys[i] >= level:
            if ys[i - 1] >= level:
                return float(ms[i - 1])
            return float(ms[i - 1] + (level - ys[i - 1]) * (ms[i] - ms[i - 1]) / (ys[i] - ys[i - 1]))
    return None


def summarize_runs(runs):
    out = {}
    for k in KEEP:
        m, se = mean_se([r[k] for r in runs])
        out[k] = m
        out[k + "_se"] = se
    out["sd_psi"] = float(np.std([r["psi"] for r in runs], ddof=1)) if len(runs) > 1 else float("nan")
    out["NR12"] = [N_COUNTS * r["R12"] for r in runs]
    parts = {}
    for r in runs:
        key = f"n_active={r['n_active']},n_unique={r['n_unique']}"
        parts[key] = parts.get(key, 0) + 1
    out["partitions"] = parts
    out["n"] = len(runs)
    return out


def clean(o):
    if isinstance(o, dict):
        return {str(k): clean(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return [clean(v) for v in o]
    if isinstance(o, (np.floating,)):
        return float(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, np.ndarray):
        return clean(o.tolist())
    if isinstance(o, float) and (math.isnan(o) or math.isinf(o)):
        return None
    return o


# ---------------------------------------------------------------------------
# Stage 0: exact quantities and the list of Psi-hat runs
# ---------------------------------------------------------------------------

def build(quick=False):
    """Exact (deterministic) part of all three studies, plus the Psi task list."""
    nseed_cm = 4 if quick else 40
    nseed_hz = 3 if quick else 30
    ndraw = 3 if quick else 20
    nfloor = 10 if quick else 200
    ex = {"cm_records": {}, "hz_records": {}, "s1_mi": {}, "s2": {}, "s3_cm": {}, "s3_hz": {}}
    tasks = []

    # floor control
    for r in range(nfloor):
        tasks.append((("floor",), crt.maximally_mixed(4), seed(0, 0, r)))

    # c-maybe records (theta, m), shared by Simulations 1 and 3
    for th in THETAS:
        for m in CM_M:
            P, PA = cmaybe_records(THETAS[th], m)
            d = record_diag(P)
            d["J_H"] = accessible_helstrom(PA)
            d["Pe"] = float(PRI[0] * PA[0][1] + PRI[1] * PA[1][0])
            ex["cm_records"][f"{th}|{m}"] = d
            rho, _ = record_state(P)
            for r in range(nseed_cm):
                tasks.append((("cm", th, m), rho, seed(1, TH_IDX[th], m, r)))

    # Simulation 1: MI curves
    for th in S1_THETAS:
        for ne in S1_NE:
            ex["s1_mi"][f"{th}|{ne}"] = mi_curve_pure(cmaybe_psi(THETAS[th], ne), ne).tolist()

    # Simulation 2: scrambled
    for th, ne in S2_CONFIGS:
        key = f"{th}|{ne}"
        draws = []
        for dr in range(ndraw):
            rng = np.random.default_rng(np.random.SeedSequence(seed(20, TH_IDX[th], ne, dr)))
            psi = scrambled_psi(THETAS[th], ne, rng)
            mi = mi_curve_pure(psi, ne)
            recs = {}
            for m in range(1, ne // 2 + 1):
                P, PA, PB = scrambled_records(psi, ne, m)
                d = record_diag(P)
                d["J_H_A"] = accessible_helstrom(PA)
                d["sym"] = record_diag(record_state(P, symmetrize=True)[1])
                recs[m] = d
                for ri, sym in enumerate((False, True)):
                    rho, _ = record_state(P, symmetrize=sym)
                    tasks.append((("sc", th, ne, m, dr, "R2" if sym else "R1"), rho,
                                  seed(2, TH_IDX[th], ne, m, dr, ri)))
            draws.append({"mi": mi.tolist(), "records": recs})
        ex["s2"][key] = {"draws": draws,
                         "mi_darwin": mi_curve_pure(cmaybe_psi(THETAS[th], ne), ne).tolist()}

    # Simulation 3: pure c-maybe discord tables
    for th in S3_CM_THETAS:
        for ne in S3_CM_NE:
            psi = cmaybe_psi(THETAS[th], ne)
            n = ne + 1
            mi = mi_curve_pure(psi, ne)
            # chi in the pointer basis for every m: conditional fragment states
            # are pure, so chi_ptr = H(F)
            chi_ptr_all = [0.0] + [pure_entropy(psi, n, list(range(1, m + 1))) for m in range(1, ne + 1)]
            c = math.cos(THETAS[th])
            jh_all = [0.0] + [1 - h2((1 - math.sqrt(max(0.0, 1 - c ** (2 * m)))) / 2) for m in range(1, ne + 1)]
            tab = {}
            for m in range(1, ne // 2 + 1):
                rho = reduced_dm_pure(psi, n, [0] + list(range(1, m + 1)))
                tab[m] = discord_table(rho, 2 ** m)
            ex["s3_cm"][f"{th}|{ne}"] = {"mi": mi.tolist(), "chi_ptr_all": chi_ptr_all,
                                         "J_H_all": jh_all, "table": tab}

    # Simulation 3: hazy environments
    for th, hz in S3_HZ:
        ne = S3_HZ_NE
        mi = hazy_mi_curve(THETAS[th], hz, ne)
        tab, jh_all, chi_ptr_all = {}, [0.0], [0.0]
        Hrho = [ent_dm(hazy_env(hz)), None]
        U = rot(THETAS[th])
        Hrho[1] = ent_dm(U @ hazy_env(hz) @ np.conj(U.T))
        for m in range(1, ne + 1):
            rho = hazy_rho_SF(THETAS[th], hz, ne, m)
            _, rF = split_SF(rho, 2 ** m)
            chi_ptr_all.append(ent_dm(rF) - m * (PRI[0] * Hrho[0] + PRI[1] * Hrho[1]))
            P, PA = hazy_records(THETAS[th], hz, m)
            jh_all.append(accessible_helstrom(PA))
            if m <= ne // 2:
                t = discord_table(rho, 2 ** m)
                t["records"] = record_diag(P)
                t["J_H"] = jh_all[-1]
                tab[m] = t
                rhoR, _ = record_state(P)
                for r in range(nseed_hz):
                    tasks.append((("hz", th, hz, m), rhoR, seed(3, TH_IDX[th], int(hz * 10), m, r)))
        ex["s3_hz"][f"{th}|{hz}"] = {"mi": mi.tolist(), "chi_ptr_all": chi_ptr_all,
                                      "J_H_all": jh_all, "table": tab}

    hd = horodecki_state(0.8)
    t = discord_table(hd, 2)
    t["H_S_vN"] = ent_dm(split_SF(hd, 2)[0])
    ex["horodecki_p0.8"] = t
    return ex, tasks


# ---------------------------------------------------------------------------
# Analysis
# ---------------------------------------------------------------------------

def group(results):
    g = {}
    for key, out in results:
        g.setdefault(key, []).append(out)
    return g


def analyze(ex, g):
    A = {}
    floor = summarize_runs(g[("floor",)])
    fm, fse = mean_se(floor["NR12"])
    A["floor"] = {"N_R12_mean": fm, "N_R12_se": fse, "psi": floor["psi"], "partitions": floor["partitions"],
                  "n": floor["n"]}

    cm = {}
    for th in THETAS:
        for m in CM_M:
            s = summarize_runs(g[("cm", th, m)])
            s["exact"] = ex["cm_records"][f"{th}|{m}"]
            cm[f"{th}|{m}"] = s
    A["cm_psi"] = {k: {kk: vv for kk, vv in v.items() if kk != "NR12"} for k, v in cm.items()}
    perf_runs = [r for m in CM_M for r in g[("cm", "pi/2", m)]]
    pm, pse = mean_se([r["psi"] for r in perf_runs])
    A["psi_perf"] = {"mean": pm, "se": pse, "n": len(perf_runs)}

    def psi_curve(th, mmax):
        ms = [0] + list(range(1, mmax + 1))
        ys = [0.0] + [cm[f"{th}|{m}"]["psi"] / pm for m in range(1, mmax + 1)]
        return ms, ys

    # ---- Simulation 1 ----------------------------------------------------
    s1 = {"configs": {}}
    statuses = []
    for th in S1_THETAS:
        for ne in S1_NE:
            mi = np.array(ex["s1_mi"][f"{th}|{ne}"])
            m_mi = crossing(list(range(ne + 1)), list(mi / H_S), 1 - DELTA)
            mmax = ne // 2
            ms, ys = psi_curve(th, mmax)
            m_psi = crossing(ms, ys, 1 - DELTA)
            mono_viol = []
            for m in range(1, mmax):
                a, b = cm[f"{th}|{m}"], cm[f"{th}|{m + 1}"]
                se = math.hypot(a["psi_se"], b["psi_se"])
                if b["psi"] < a["psi"] - 2 * se:
                    mono_viol.append(m)
            ratio = (m_psi / m_mi) if (m_psi is not None and m_mi) else None
            if m_mi is None or m_mi > mmax:
                status = "not applicable (MI plateau beyond N_E/2)"
            elif mono_viol:
                status = "FAIL (a) non-monotone"
            elif m_psi is not None:
                status = "PASS" if 0.5 <= ratio <= 2 else "FAIL (b) onset ratio outside [1/2, 2]"
            else:
                status = ("FAIL (c) no Psi plateau, ratio provably > 2" if mmax / m_mi > 2
                          else "INCONCLUSIVE (Psi plateau beyond N_E/2)")
            if not status.startswith("not applicable"):
                statuses.append(status)
            s1["configs"][f"{th}|{ne}"] = {
                "m_delta_MI": m_mi, "R_delta_MI": (ne / m_mi) if m_mi else None,
                "m_delta_Psi": m_psi, "R_delta_Psi": (ne / m_psi) if m_psi else None,
                "onset_ratio": ratio, "monotone_violations": mono_viol, "status": status,
                "psi_rel": ys[1:], "mi_over_HS": (mi / H_S).tolist()}
    nfail = sum(s.startswith("FAIL") for s in statuses)
    npass = sum(s == "PASS" for s in statuses)
    s1["n_applicable"] = len(statuses)
    s1["n_pass"], s1["n_fail"] = npass, nfail
    s1["n_inconclusive"] = sum(s.startswith("INCONCLUSIVE") for s in statuses)
    s1["verdict"] = "FAIL" if nfail else ("PASS" if npass >= len(statuses) / 2 else "INCONCLUSIVE")
    # theta-wise onset ratios from the exact (Lemma 4) record curve, N_E-free
    A["s1"] = s1

    # ---- Simulation 2 ----------------------------------------------------
    s2 = {"configs": {}}
    failA, failB = [], []
    for th, ne in S2_CONFIGS:
        key = f"{th}|{ne}"
        E = ex["s2"][key]
        mis = np.array([d["mi"] for d in E["draws"]])
        mi_mean, mi_sd = mis.mean(0), mis.std(0, ddof=1) if len(mis) > 1 else np.zeros(ne + 1)
        if ne in (10, 12):
            for m in range(1, ne // 2):
                if mi_mean[m] >= 0.5 * H_S:
                    failA.append(f"{key} m={m}")
        rows = {}
        for m in range(1, ne // 2 + 1):
            row = {}
            for rec in ("R1", "R2"):
                runs = [r for dr in range(len(E["draws"])) for r in g[("sc", th, ne, m, dr, rec)]]
                nr = [N_COUNTS * r["R12"] for r in runs]
                mn, se = mean_se(nr)
                row[rec] = {"N_R12_mean": mn, "N_R12_se": se, "ci95": [mn - 1.96 * se, mn + 1.96 * se],
                            "psi_mean": float(np.mean([r["psi"] for r in runs])),
                            "partitions": summarize_runs(runs)["partitions"], "n": len(runs)}
            recs = [d["records"][m] for d in E["draws"]]
            ex_diag = {k: float(np.mean([r[k] for r in recs])) for k in
                       ("I_gate_exact", "I_records", "q_disagree", "J_H_A")}
            ex_diag["bias_dev_mean"] = float(np.mean([abs(r["bias_A"] - 0.5) for r in recs]))
            ex_diag["N_I_gate_exact"] = N_COUNTS * ex_diag["I_gate_exact"]
            ex_diag["sym_I_gate_exact"] = float(np.mean([r["sym"]["I_gate_exact"] for r in recs]))
            row["exact"] = ex_diag
            dk = f"{th}|{m}"
            row["darwin_N_R12"] = N_COUNTS * cm[dk]["R12"] if dk in cm else None
            row["darwin_psi"] = cm[dk]["psi"] if dk in cm else None
            if ne == 12 and m in (1, 2, 3):
                lo, hi = row["R1"]["ci95"]
                if lo > FLOOR_BAND[1] or hi < FLOOR_BAND[0]:
                    failB.append(f"{key} m={m}")
            rows[m] = row
        s2["configs"][key] = {"mi_mean": mi_mean.tolist(), "mi_sd": mi_sd.tolist(),
                              "mi_darwin": E["mi_darwin"], "rows": rows}
    s2["failA"], s2["failB"] = failA, failB
    s2["verdict"] = "PASS" if not failA and not failB else "FAIL"
    A["s2"] = s2

    # ---- Simulation 3 ----------------------------------------------------
    s3 = {"configs": {}, "gap_points": [], "reverse_points": []}
    thr_floor = 2 * A_FLOOR / N_COUNTS

    def s3_config(name, ne, mi, chi_all, jh_all, tab, psi_key):
        mi = np.array(mi)
        ms_all = list(range(ne + 1))
        m_mi = crossing(ms_all, list(mi / H_S), 1 - DELTA)
        m_chi = crossing(ms_all, list(np.array(chi_all) / H_S), 1 - DELTA)
        m_jh = crossing(ms_all, list(np.array(jh_all) / H_S), 1 - DELTA)
        mmax = ne // 2
        psi_rows, ys = {}, [0.0]
        for m in range(1, mmax + 1):
            s = psi_key(m)
            psi_rows[m] = {"psi": s["psi"], "psi_se": s["psi_se"], "R12": s["R12"], "R12_se": s["R12_se"],
                           "N_R12": N_COUNTS * s["R12"], "partitions": s["partitions"]}
            ys.append(s["psi"] / pm)
        m_psi = crossing(list(range(mmax + 1)), ys, 1 - DELTA)
        R = lambda x: (ne / x) if x else None  # noqa: E731
        cfg = {"N_E": ne, "m_delta": {"MI": m_mi, "chi_ptr": m_chi, "J_H": m_jh, "Psi": m_psi},
               "R_delta": {"MI": R(m_mi), "chi_ptr": R(m_chi), "J_H": R(m_jh), "Psi": R(m_psi)},
               "mi": mi.tolist(), "chi_ptr_all": list(chi_all), "J_H_all": list(jh_all),
               "table": tab, "psi": psi_rows}
        for m in range(1, mmax + 1):
            gap = (R(m_mi) is not None and R(m_mi) >= 3 and mi[m] >= (1 - DELTA) * H_S
                   and psi_rows[m]["R12"] <= thr_floor)
            if gap:
                s3["gap_points"].append(f"{name} m={m}")
            if ys[m] >= 1 - DELTA and mi[m] < (1 - DELTA) * H_S:
                s3["reverse_points"].append(f"{name} m={m}")
        s3["configs"][name] = cfg

    for th in S3_CM_THETAS:
        for ne in S3_CM_NE:
            E = ex["s3_cm"][f"{th}|{ne}"]
            s3_config(f"c-maybe theta={th} N_E={ne}", ne, E["mi"], E["chi_ptr_all"], E["J_H_all"],
                      E["table"], lambda m, th=th: cm[f"{th}|{m}"])
    for th, hz in S3_HZ:
        E = ex["s3_hz"][f"{th}|{hz}"]
        s3_config(f"hazy theta={th} h={hz} N_E={S3_HZ_NE}", S3_HZ_NE, E["mi"], E["chi_ptr_all"],
                  E["J_H_all"], E["table"], lambda m, th=th, hz=hz: summarize_runs(g[("hz", th, hz, m)]))
    s3["floor_threshold_R12"] = thr_floor
    s3["verdict"] = "PASS (gap found)" if s3["gap_points"] else "NULL (no clean gap)"
    # quantified gap: minimum record gate among points where MI says objective
    pts = []
    for name, cfg in s3["configs"].items():
        for m, row in cfg["psi"].items():
            if cfg["R_delta"]["MI"] and cfg["R_delta"]["MI"] >= 3 and cfg["mi"][m] >= (1 - DELTA) * H_S:
                pts.append((row["R12"], name, m))
    if pts:
        lo = min(pts)
        s3["min_R12_where_MI_objective"] = {"R12": lo[0], "N_R12": N_COUNTS * lo[0],
                                            "times_floor": N_COUNTS * lo[0] / A_FLOOR, "where": f"{lo[1]} m={lo[2]}"}
    s3["horodecki_p0.8"] = ex["horodecki_p0.8"]
    A["s3"] = s3
    return A


# ---------------------------------------------------------------------------
# Figures
# ---------------------------------------------------------------------------

COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"]
MARKERS = ["o", "s", "^", "D", "v", "P"]


def figures(A, suffix=""):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except ImportError:
        return []
    plt.rcParams.update({"font.size": 9, "axes.spines.top": False, "axes.spines.right": False,
                         "axes.grid": True, "grid.color": "#e4e4e0", "grid.linewidth": 0.6})
    paths = []
    pm = A["psi_perf"]["mean"]

    # Figure 1: partial-information plot and Psi-hat, per theta
    fig, axes = plt.subplots(1, len(S1_THETAS), figsize=(15, 3.6), sharey=True)
    for ax, th in zip(axes, S1_THETAS):
        for i, ne in enumerate(S1_NE):
            c = A["s1"]["configs"][f"{th}|{ne}"]
            f = np.arange(ne + 1) / ne
            ax.plot(f, c["mi_over_HS"], "-", color=COLORS[i], lw=2, label=f"I(S:F)/H_S, N_E={ne}")
            ms = np.arange(1, ne // 2 + 1)
            y = [A["cm_psi"][f"{th}|{m}"]["psi"] / pm for m in ms]
            e = [2 * A["cm_psi"][f"{th}|{m}"]["psi_se"] / pm for m in ms]
            ax.errorbar(ms / ne, y, yerr=e, fmt=MARKERS[i], ms=5, color=COLORS[i], mfc="white", mew=1.5,
                        lw=1, label=f"Psi-hat/Psi_perf, N_E={ne}")
        ax.axhline(1 - DELTA, color="#888", ls=":", lw=1)
        ax.set_title(f"theta = {th}")
        ax.set_xlabel("fragment fraction f = m / N_E")
        ax.set_ylim(-0.03, 2.05)
    axes[0].set_ylabel("I(S:F)/H_S (lines); Psi-hat/Psi_perf (markers)")
    axes[-1].legend(fontsize=7, loc="upper left", frameon=False)
    fig.suptitle("Simulation 1: Darwinian c-maybe environment. Lines: partial information. "
                 "Markers: Psi-hat of two disjoint m-qubit fragments (+/- 2 SE), N_counts = 1e4", fontsize=9)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig1_plateau{suffix}.png")
    fig.savefig(p, dpi=150)
    plt.close(fig)
    paths.append(p)

    # Figure 2: scrambled
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
    ax.set_title("Partial information (mean +/- SD over 20 Haar draws)")
    ax.legend(fontsize=6.5, frameon=False)
    ax = axes[1]
    ax.axhspan(*FLOOR_BAND, color="#cccccc", alpha=0.5, lw=0, label="V2 floor band 31-37")
    for i, (th, ne) in enumerate(S2_CONFIGS):
        c = A["s2"]["configs"][f"{th}|{ne}"]
        ms = sorted(int(m) for m in c["rows"])
        for rec, ls in (("R1", "-"), ("R2", ":")):
            y = [c["rows"][m][rec]["N_R12_mean"] for m in ms]
            e = [1.96 * c["rows"][m][rec]["N_R12_se"] for m in ms]
            ax.errorbar(np.array(ms) + (0.08 if rec == "R2" else 0), y, yerr=e, fmt=MARKERS[i] + ls,
                        color=COLORS[i], mfc="white" if rec == "R2" else COLORS[i], ms=5, lw=1.2,
                        label=f"theta={th}, N_E={ne}, {rec}")
        if th == "pi/2" and ne == 12:
            yd = [c["rows"][m]["darwin_N_R12"] for m in ms]
            ax.plot(ms, yd, "k--", lw=1, label="Darwinian (any N_E), theta=pi/2")
        if th == "pi/4" and ne == 12:
            yd = [c["rows"][m]["darwin_N_R12"] for m in ms]
            ax.plot(ms, yd, "k-.", lw=1, label="Darwinian (any N_E), theta=pi/4")
    ax.set_yscale("log")
    ax.set_xlabel("fragment size m (qubits per observer)")
    ax.set_ylabel("N_counts x R12-hat (mean, 95% CI)")
    ax.set_title("Record agreement core vs the 34.3/N floor")
    ax.legend(fontsize=6, frameon=False, ncol=2)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig2_scrambled{suffix}.png")
    fig.savefig(p, dpi=150)
    plt.close(fig)
    paths.append(p)

    # Figure 3: discord gap
    names = [f"c-maybe theta={th} N_E=12" for th in S3_CM_THETAS] + \
            [f"hazy theta={th} h={hz} N_E={S3_HZ_NE}" for th, hz in S3_HZ]
    fig, axes = plt.subplots(2, 4, figsize=(14, 6.5), sharey=True)
    for ax, name in zip(axes.ravel(), names):
        c = A["s3"]["configs"][name]
        ne = c["N_E"]
        ms = np.arange(ne + 1)
        ax.plot(ms, c["mi"], "-", color=COLORS[0], lw=2, label="I(S:F)")
        ax.plot(ms, c["chi_ptr_all"], "--", color=COLORS[1], lw=2, label="chi(S_Pi:F), pointer")
        ax.plot(ms, c["J_H_all"], ":", color=COLORS[2], lw=2, label="J_H (one Helstrom record)")
        mp = sorted(int(m) for m in c["psi"])
        ax.plot(mp, [c["psi"][m]["psi"] / pm for m in mp], "o", color=COLORS[3], ms=6,
                label="Psi-hat / Psi_perf (pair)")
        ax.axhline(1 - DELTA, color="#888", ls=":", lw=1)
        R = c["R_delta"]
        fmt_r = lambda x: "-" if x is None else f"{x:.1f}"  # noqa: E731
        ax.set_title(name.replace(" N_E", "\nN_E") + f"\nR_d: MI {fmt_r(R['MI'])}, chi {fmt_r(R['chi_ptr'])}, "
                     f"J_H {fmt_r(R['J_H'])}, Psi {fmt_r(R['Psi'])}", fontsize=7.5)
        ax.set_xlabel("fragment size m")
        ax.set_ylim(-0.03, 2.05)
    axes[0, 0].set_ylabel("bits (H_S = 1)")
    axes[1, 0].set_ylabel("bits (H_S = 1)")
    axes[0, 0].legend(fontsize=7, frameon=False)
    fig.suptitle("Simulation 3: MI, Holevo (pointer), one-observer accessible information, and the "
                 "two-observer Psi-hat; R_delta at delta = 0.1", fontsize=9)
    fig.tight_layout()
    p = os.path.join(OUT, f"fig3_discord{suffix}.png")
    fig.savefig(p, dpi=150)
    plt.close(fig)
    paths.append(p)
    return paths


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def f4(x, nd=4):
    if x is None:
        return "-"
    if isinstance(x, str):
        return x
    if x == 0:
        return "0"
    if abs(x) < 1e-3 or abs(x) >= 1e4:
        return f"{x:.2e}"
    return f"{x:.{nd}f}"


def report(A, meta, suffix=""):
    L = []
    a = L.append
    a("# CRT v12: Psi as an agreement-based witness of objectivity (quantum Darwinism)")
    a("")
    a(f"Generated by `python3 run_v12.py{' --quick' if suffix else ''}` (master seed {MASTER_SEED_V12}), "
      f"Python {meta['python']}, numpy {meta['numpy']}, scipy {meta['scipy']}, {meta['workers']} workers, "
      f"wall time {meta['wall_s']:.0f} s, {meta['n_runs']} Psi-hat pipeline runs.")
    a("")
    a("The predictions, failure conditions and verdict rules were written into the docstring of "
      "`run_v12.py` and committed (commit 63a4baa) before any result was computed. They are quoted below "
      "and applied unchanged.")
    a("")
    a("## Verdicts")
    a("")
    a(f"| Simulation | Verdict | Key numbers |")
    a("|---|---|---|")
    s1, s2, s3 = A["s1"], A["s2"], A["s3"]
    a(f"| 1 Redundancy plateau | **{s1['verdict']}** | {s1['n_pass']} pass, {s1['n_fail']} fail, "
      f"{s1['n_inconclusive']} inconclusive of {s1['n_applicable']} applicable (theta, N_E) configurations |")
    a(f"| 2 Scrambled environment | **{s2['verdict']}** | (A) MI plateau violations: "
      f"{', '.join(s2['failA']) or 'none'}; (B) floor violations: {', '.join(s2['failB']) or 'none'} |")
    mn = s3.get("min_R12_where_MI_objective")
    a(f"| 3 Discord gap | **{s3['verdict']}** | gap points: {', '.join(s3['gap_points']) or 'none'}; "
      + (f"smallest R12-hat where MI says objective: {f4(mn['R12'])} = {mn['times_floor']:.0f} x floor ({mn['where']})"
         if mn else "") + " |")
    a("")
    a("## Common definitions")
    a("")
    a("- System qubit S in |+> (pointer entropy H_S = 1 bit). N_E environment qubits in |0> (pure) or "
      "(1 - h)|0><0| + h I/2 (hazy). Coupling: controlled rotation, |0><0| (x) I + |1><1| (x) R(theta), "
      "R(theta)|0> = cos(theta)|0> + sin(theta)|1>; theta = pi/2 is a CNOT. Same theta for every qubit.")
    a("- Partial information I(S:F_m) = H(S) + H(F_m) - H(S F_m), exact. delta = 0.1. m_delta is the smallest "
      "linearly interpolated m with the curve >= (1 - delta) H_S; R_delta = N_E / m_delta.")
    a("- Observers: two disjoint fragments of m qubits each (so m <= N_E/2). Each makes the Helstrom "
      "(minimum-error) measurement between its fragment's pointer-conditional states (priors 1/2) and "
      "records its guess r. S is never measured. Joint record law P(a, b) computed exactly.")
    a("- Record state R1 (primary): rho_R = diag(P00, P01, P10, P11) on two record qubits. Psi-hat is the "
      "unchanged v11 functional on rho_R (crt.simulate + crt.functional): product SIC-POVM, LI-PSD on batch A, "
      f"MLE on batch B, models LI and MLE on A + B, B = {B_BOOT}, D_hat = {DHAT:.2f}, eps = 1e-8, "
      f"delta_reg = 1e-6, N_counts = {N_COUNTS} per batch, sampling rule. R2 (secondary): records after a "
      "shared random relabelling, P'(a,b) = [P(a,b) + P(1-a,1-b)]/2.")
    a(f"- Psi_perf = mean Psi-hat of the perfect-record state (|00><00| + |11><11|)/2 = "
      f"{A['psi_perf']['mean']:.4f} +/- {A['psi_perf']['se']:.4f} (SE, {A['psi_perf']['n']} runs; the "
      "theta = pi/2 rows). Its exact large-N value (Lemma 4, r_inf = 1/2) is 0.5 x 0.95 x 0.5 = 0.2375.")
    fl = A["floor"]
    a(f"- Floor control, rho_R = I/4, {fl['n']} runs: N_counts x R12-hat = {fl['N_R12_mean']:.2f} +/- "
      f"{fl['N_R12_se']:.2f} (v11 law: a = 34.3, band [31, 37]). Partitions {fl['partitions']}.")
    a("")

    # ---- S1
    a("## Simulation 1: redundancy plateau (Darwinian c-maybe environment)")
    a("")
    a("**Prediction.** Psi-hat rises to a plateau over the same fragment-size range in which I(S:F) reaches H_S.")
    a("")
    a("**Failure condition** (per configuration with m_delta^MI <= N_E/2): (a) mean Psi-hat falls between "
      "consecutive m by more than 2 SE of the difference; (b) onset ratio m_delta^Psi / m_delta^MI outside "
      "[1/2, 2]; (c) Psi-hat never reaches 0.9 Psi_perf for m <= N_E/2 although (N_E/2)/m_delta^MI > 2. "
      "Never reaching it with (N_E/2)/m_delta^MI <= 2 is INCONCLUSIVE. Overall FAIL if any configuration "
      "fails; PASS if none fails and at least half pass. Disclosed before running: a closed-form estimate "
      "gave an onset ratio of about 1.83 for this model, so (b) is not blind.")
    a("")
    a(f"**Verdict: {s1['verdict']}.**")
    a("")
    a("| theta | N_E | m_delta^MI | R_delta^MI | m_delta^Psi | R_delta^Psi | onset ratio | status |")
    a("|---|---|---|---|---|---|---|---|")
    for key, c in s1["configs"].items():
        th, ne = key.split("|")
        a(f"| {th} | {ne} | {f4(c['m_delta_MI'], 2)} | {f4(c['R_delta_MI'], 2)} | {f4(c['m_delta_Psi'], 2)} | "
          f"{f4(c['R_delta_Psi'], 2)} | {f4(c['onset_ratio'], 2)} | {c['status']} |")
    a("")
    a("Psi-hat for two disjoint m-qubit fragments (independent of N_E in this model; mean +/- SE, "
      "40 runs per cell), with the exact record quantities:")
    a("")
    a("| theta | m | Helstrom error P_e | records disagree q | I(r_A:r_B) bits | R12 exact (N = inf) | "
      "R12-hat | Psi-hat | Psi-hat/Psi_perf | Psi exact (Lemma 4) | partitions |")
    a("|---|---|---|---|---|---|---|---|---|---|---|")
    for th in THETAS:
        for m in CM_M:
            c = A["cm_psi"][f"{th}|{m}"]
            e = c["exact"]
            a(f"| {th} | {m} | {f4(e['Pe'])} | {f4(e['q_disagree'])} | {f4(e['I_records'])} | "
              f"{f4(e['R12_inf'])} | {f4(c['R12'])} +/- {f4(c['R12_se'])} | {f4(c['psi'])} +/- {f4(c['psi_se'])} | "
              f"{f4(c['psi'] / A['psi_perf']['mean'], 3)} | {f4(e['psi_inf_lemma4'])} | {c['partitions']} |")
    a("")

    # ---- S2
    a("## Simulation 2: scrambled (non-Darwinian) environment")
    a("")
    a("**Construction.** The Simulation 1 state followed by a Haar-random unitary on E only (S untouched, so "
      "its decoherence is identical to the Darwinian case). Sampled exactly as U|E0>, U|E1> with the right "
      "overlap. 20 Haar draws per configuration; F_A = first m environment qubits, F_B = next m.")
    a("")
    a("**Predictions.** (A) no classical plateau in I(S:F); (B) Psi-hat between small fragments at the "
      "finite-sample floor.")
    a("")
    a("**Failure conditions.** (A) for N_E in {10, 12}, mean I(S:F_m) >= 0.5 H_S for some m <= N_E/2 - 1. "
      "(B) at N_E = 12 (theta = pi/2 and pi/4), for some m in {1, 2, 3}, the 95% interval of "
      "N_counts x R12-hat (records R1) lies entirely outside [31, 37].")
    a("")
    a(f"**Verdict: {s2['verdict']}.** (A) violations: {', '.join(s2['failA']) or 'none'}. "
      f"(B) violations: {', '.join(s2['failB']) or 'none'}.")
    a("")
    a("Mean partial information I(S:F_m) (bits), scrambled (mean over draws) against Darwinian:")
    a("")
    for key, c in s2["configs"].items():
        a(f"- theta = {key.split('|')[0]}, N_E = {key.split('|')[1]}: scrambled "
          + ", ".join(f"{x:.3f}" for x in c["mi_mean"]) + "; Darwinian "
          + ", ".join(f"{x:.3f}" for x in c["mi_darwin"]))
    a("")
    a("| theta | N_E | m | N R12-hat R1 (mean, 95% CI) | N R12-hat R2 | Darwinian N R12-hat | "
      "N x exact record gate (mean over draws) | I(r_A:r_B) exact | mean abs(bias - 1/2) | J_H one observer |")
    a("|---|---|---|---|---|---|---|---|---|---|")
    for key, c in s2["configs"].items():
        th, ne = key.split("|")
        for m, row in c["rows"].items():
            r1, r2, ex_ = row["R1"], row["R2"], row["exact"]
            a(f"| {th} | {ne} | {m} | {r1['N_R12_mean']:.1f} [{r1['ci95'][0]:.1f}, {r1['ci95'][1]:.1f}] | "
              f"{r2['N_R12_mean']:.1f} [{r2['ci95'][0]:.1f}, {r2['ci95'][1]:.1f}] | {f4(row['darwin_N_R12'], 1)} | "
              f"{ex_['N_I_gate_exact']:.2f} | {f4(ex_['I_records'])} | {f4(ex_['bias_dev_mean'])} | {f4(ex_['J_H_A'])} |")
    a("")

    # ---- S3
    a("## Simulation 3: the discord gap")
    a("")
    a("**Prediction.** A regime exists where MI-based redundancy reports objective while agreement-based Psi "
      "stays near the floor.")
    a("")
    a("**Gap criterion** (pre-stated): a configuration and m <= N_E/2 with (i) R_delta^MI >= 3, "
      f"(ii) I(S:F_m) >= 0.9 H_S, (iii) mean R12-hat(m) <= 2 x 34.3 / N_counts = {s3['floor_threshold_R12']:.2e}. "
      "PASS if any point meets it, NULL otherwise.")
    a("")
    a(f"**Verdict: {s3['verdict']}.** Gap points: {', '.join(s3['gap_points']) or 'none'}. Points where Psi "
      f"reaches 0.9 Psi_perf while I(S:F) < 0.9 H_S (Psi more permissive than MI): "
      f"{', '.join(s3['reverse_points']) or 'none'}.")
    if mn:
        a("")
        a(f"Quantified: over every point where MI says objective (R_delta^MI >= 3 and I >= 0.9 H_S, m <= N_E/2), "
          f"the smallest R12-hat is {f4(mn['R12'])}, i.e. N_counts x R12-hat = {mn['N_R12']:.0f}, "
          f"{mn['times_floor']:.0f} times the floor constant ({mn['where']}).")
    a("")
    a("Redundancy at delta = 0.1 by measure (m_delta in qubits; '-' = not reached; Psi and the discord table "
      "only for m <= N_E/2):")
    a("")
    a("| configuration | R_delta MI | R_delta chi (pointer) | R_delta J_H | R_delta Psi | m_delta MI | m_delta J_H | m_delta Psi |")
    a("|---|---|---|---|---|---|---|---|")
    for name, c in s3["configs"].items():
        R, M = c["R_delta"], c["m_delta"]
        a(f"| {name} | {f4(R['MI'], 2)} | {f4(R['chi_ptr'], 2)} | {f4(R['J_H'], 2)} | {f4(R['Psi'], 2)} | "
          f"{f4(M['MI'], 2)} | {f4(M['J_H'], 2)} | {f4(M['Psi'], 2)} |")
    a("")
    a("Single-qubit fragments (m = 1): mutual information, Holevo quantity (pointer basis and maximized over "
      "projective S measurements), discord measured on S (D_S = I - chi_max, the Le and Olaya-Castro / Zwolak "
      "and Zurek side), classical correlation measured on the fragment J(S|F) and discord D_F = I - J(S|F), "
      "one-observer Helstrom information J_H, and the pair Psi-hat:")
    a("")
    a("| configuration | I | chi_ptr | chi_max | D_S | J(S|F) | D_F | J_H | R12-hat (N x) | Psi-hat |")
    a("|---|---|---|---|---|---|---|---|---|---|")
    for name, c in s3["configs"].items():
        t = c["table"].get(1) or c["table"].get("1")
        p = c["psi"].get(1) or c["psi"].get("1")
        jh = c["J_H_all"][1]
        a(f"| {name} | {f4(t['I'])} | {f4(t['chi_ptr'])} | {f4(t['chi_max'])} | {f4(t['D_S'])} | "
          f"{f4(t['J_SgivenF'])} | {f4(t['D_F'])} | {f4(jh)} | {p['N_R12']:.1f} | {f4(p['psi'])} |")
    hd = s3["horodecki_p0.8"]
    a("")
    a(f"Horodecki et al. example (Le and Olaya-Castro Eq. C1, p = 0.8; one environment qubit, so no observer "
      f"pair and no Psi): H(S) = {hd['H_S_vN']:.4f}, I(S:E) = {hd['I']:.4f} (Quantum Darwinism holds), "
      f"chi_ptr = {hd['chi_ptr']:.4f} (Eq. C4 gives 0.1825), chi_max (projective) = {hd['chi_max']:.4f}, "
      f"D_S = {hd['D_S']:.4f}, J(S|E) = {hd['J_SgivenF']:.4f}, D_F = {hd['D_F']:.4f}.")
    a("")
    a("Per-m discord table for fragments up to N_E/2 (MI, chi_ptr, chi_max, D_S; Psi-hat):")
    a("")
    a("| configuration | m | I | chi_ptr | chi_max | D_S | J_H | R12-hat | Psi-hat/Psi_perf |")
    a("|---|---|---|---|---|---|---|---|---|")
    for name, c in s3["configs"].items():
        for m in sorted(int(k) for k in c["table"]):
            t = c["table"].get(m) or c["table"].get(str(m))
            p = c["psi"].get(m) or c["psi"].get(str(m))
            a(f"| {name} | {m} | {f4(t['I'])} | {f4(t['chi_ptr'])} | {f4(t['chi_max'])} | {f4(t['D_S'])} | "
              f"{f4(c['J_H_all'][m])} | {f4(p['R12'])} | {f4(p['psi'] / A['psi_perf']['mean'], 3)} |")
    a("")
    a("## Figures")
    a("")
    for pth in meta.get("figures", []):
        a(f"- `{os.path.relpath(pth, OUT)}`")
    a("")
    a(CAVEATS)
    path = os.path.join(OUT, f"REPORT{suffix}.md")
    with open(path, "w") as fh:
        fh.write("\n".join(L) + "\n")
    return path


CAVEATS = """## Definitional choices and caveats

Every choice below could move a number; the ones a referee is most likely to attack come first.

1. **What a "record" is.** Each observer makes the Helstrom (minimum-error) measurement between its
   fragment's pointer-conditional states, with priors 1/2, and keeps one bit. This assumes the observer
   knows the conditional states (the coupling) and the pointer basis. Other choices (the
   accessible-information-optimal measurement, which for mixed conditional states can differ from
   Helstrom; a pretty-good measurement; a fixed local measurement on each qubit followed by majority
   vote, which is what a real observer without collective measurements would do) give different record
   laws. Collective measurements on up to 6 qubits are assumed to be available.
2. **Where Psi's "agreement" sits.** Psi compares two reconstructions of one state from disjoint data.
   Here the state is the joint record state of the two observers, and the two batches are disjoint
   sets of shots. The fidelity factor F compares batch A with batch B, not observer A with observer B;
   the agreement between observers enters only through the informativeness gate, I(rho_R) = 1 - H(P)/2.
   By Lemma 4 the large-N value is r_inf x D_hat x (1 - H(r_A, r_B)/2): an entropy score of the joint
   record. With uniform record marginals this is I(r_A:r_B)/2, a correlation measure; with biased
   marginals the gate also rewards bias (predictability), which is not agreement. R2 (symmetrized
   records) is reported to show the size of that effect. A per-observer construction (each observer
   reconstructs its own marginal record state from its own data) was rejected before running: for
   priors 1/2 the Helstrom record marginal is uniform at every theta, so it would score 0 everywhere.
3. **Records are classical.** rho_R is diagonal. Storing the records coherently (premeasurement into
   memory qubits) would add off-diagonal terms set by the coherence S keeps, and would change the gate.
   The diagonal record state sits in the computational basis, i.e. in the SIC alignment of v11; the
   perfect-record state (|00><00| + |11><11|)/2 is B.1's separable test state.
4. **Psi_perf and the 0.9 level.** The Psi threshold is 0.9 of the finite-N Psi-hat of perfect records
   (not of the exact 0.2375). Psi's gate is an entropy of the two-observer record, which compounds both
   observers' errors and is quadratic near agreement, so 0.9 of its maximum is a stricter requirement
   than 0.9 H_S of mutual information. The two delta levels are not calibrated to each other; the onset
   ratio depends on that choice. The closed-form estimate (about 1.83 at delta = 0.1) was made before
   running and disclosed in the pre-registration.
5. **Psi does not see N_E.** In the c-maybe model the record law depends on (theta, m) only: the observers
   never touch S, and the rest of the environment only decoheres S. So the Psi curve in fragment size is
   the same for every N_E, while the MI curve depends on N_E (its quantum rise near f = 1 and, for small
   N_E, incomplete decoherence). Comparisons in fragment fraction f = m/N_E therefore shift with N_E for
   Psi but not for the MI plateau onset.
6. **Pairs need m <= N_E/2.** Psi is only defined here for two disjoint fragments, so nothing is said
   about fragments larger than half the environment, where the MI curve carries its quantum part.
   Configurations whose MI plateau begins beyond N_E/2 are excluded from Simulation 1's verdict.
7. **Scrambling.** Haar on E alone, not on S + E. This keeps S's decoherence fixed and changes only
   where the record is stored. A global scramble of S + E would also change H(S).
8. **Discord quantities** are restricted to projective measurements on the measured qubit (POVMs can do
   better). J_H for the pure c-maybe model is the closed form for two pure states (Helstrom is
   accessible-information optimal there, Levitin); for the hazy model it is the Helstrom record's
   information, a lower bound on accessible information. chi in the pointer basis for m > N_E/2 uses
   chi_ptr = H(F) - sum_s p_s H(rho_F|s) evaluated exactly.
9. **The "no-gap" argument** stated in the pre-registration uses chi <= T for two equiprobable states;
   that inequality is checked numerically in test_v12.py on random states, not proved here.
10. **Finite statistics.** B = 20 bootstrap iterations (paper: 1000); 40 runs per c-maybe point,
    30 per hazy point, 20 Haar draws per scrambled configuration with one count seed each; N_counts = 1e4
    only. D_hat is fixed at 0.95. C_eff partitions are reported in the tables; C_eff = 1/2 throughout
    unless the partition column says otherwise.
11. **Helstrom ties.** Eigenvalues of p0 rho0 - p1 rho1 at or below 1e-14 are assigned to r = 1. At
    theta = 0 exactly (no record at all) this makes every record 1, a pure record state and a large
    spurious Psi. theta = 0 is not in any grid; the pathology is noted because the entropy gate cannot
    tell a constant record from an informative one.
"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--report-only", action="store_true")
    ap.add_argument("--workers", type=int, default=2)
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    suffix = "_quick" if args.quick else ""
    jpath = os.path.join(OUT, f"results_v12{suffix}.json")
    if args.report_only:
        with open(jpath) as fh:
            J = json.load(fh)
        A, meta = J["analysis"], J["meta"]
        A = _intkeys(A)
        meta["figures"] = figures(A, suffix)
        report(A, meta, suffix)
        return
    t0 = time.time()
    log = open(os.path.join(OUT, f"run_v12{suffix}.log"), "w")

    def say(msg):
        line = f"[{time.time() - t0:7.1f} s] {msg}"
        print(line, flush=True)
        log.write(line + "\n")
        log.flush()

    say("stage 0: exact quantities and task list")
    ex, tasks = build(args.quick)
    say(f"stage 0 done: {len(tasks)} Psi-hat runs")
    results = []
    with Pool(args.workers) as pool:
        for i, r in enumerate(pool.imap_unordered(task_psi, tasks, chunksize=8)):
            results.append(r)
            if (i + 1) % 250 == 0:
                say(f"  {i + 1}/{len(tasks)} runs")
    say("Psi-hat runs done; analysis")
    A = analyze(ex, group(results))
    meta = {"python": platform.python_version(), "numpy": np.__version__, "scipy": scipy.__version__,
            "workers": args.workers, "wall_s": time.time() - t0, "n_runs": len(tasks),
            "master_seed": MASTER_SEED_V12, "N_counts": N_COUNTS, "B_boot": B_BOOT, "delta": DELTA,
            "D_hat": DHAT, "quick": args.quick}
    A = _intkeys(clean(A))
    meta["figures"] = figures(A, suffix)
    meta["wall_s"] = time.time() - t0
    with open(jpath, "w") as fh:
        json.dump(clean({"meta": meta, "analysis": A, "exact": ex}), fh, indent=1)
    rp = report(A, meta, suffix)
    say(f"verdicts: S1 {A['s1']['verdict']}, S2 {A['s2']['verdict']}, S3 {A['s3']['verdict']}")
    say(f"wrote {jpath}, {rp}")
    log.close()


def _intkeys(o):
    """JSON turns int keys into strings; turn digit keys back into ints."""
    if isinstance(o, dict):
        return {(int(k) if isinstance(k, str) and k.isdigit() else k): _intkeys(v) for k, v in o.items()}
    if isinstance(o, list):
        return [_intkeys(v) for v in o]
    return o


if __name__ == "__main__":
    main()
