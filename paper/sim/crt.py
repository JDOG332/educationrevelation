"""
crt.py: reference implementation of the CRT coherence functional Psi (v11.0).

Psi = R12 * Gamma = F_gated * C_eff * D_hat        (Eqs. 1, 2, 6, 12, 13)

    R12     = F(rho1, rho2) * G_eps(rho1, rho2)    (Eqs. 3, 5, 6)
    G_eps   = sqrt((I1 + eps)(I2 + eps)) / (1 + eps)
    I(rho)  = 1 - S(rho) / log2(d)                 (S in bits)
    Gamma   = C_eff * D_hat
    C_eff   = C0 * R,  C0 = 1 - JSD_w / (H(w) + H_min),  R = n_unique / n_active
    D_hat   = D / (D + D_ref)
    S_eff   = -log2(Psi)

Measurement: the 16-outcome product SIC-POVM on two qubits (tetrahedral
qubit SIC on each side). Data: Born-rule multinomial counts.

Reconstruction pipelines ("models"):
    'LI'  : linear inversion through the SIC dual frame, then the
            Smolin-Gambetta-Smith (PRL 108, 070502, 2012) projection onto
            the closest density matrix in 2-norm.
    'MLE' : iterative maximum likelihood, the R rho R algorithm
            (Hradil 1997; Rehacek, Hradil, Jezek 2001).

Recognition core (Section 9.2 Step 1): pipeline 1 (LI) reconstructs rho1
from batch A, pipeline 2 (MLE) reconstructs rho2 from the disjoint batch B.

Convergence factor (Section 9.2 Step 2): both models are applied to the
combined data A + B. Model i predicts P_i(k) = Tr(E_k rho_i) (after the
full-rank regularization). Weights: softmax (tau = 1, natural log) over
K-fold cross-validated log-likelihoods LL_i = sum over folds of
sum_k n_k(test) ln P_i^(train)(k). The redundancy graph follows Algorithm 1
(bootstrap-calibrated thresholds delta_i, connected components). Two
readings of Algorithm 1 step 1 are implemented, see `functional`.

Everything is deterministic given the integer seeds passed in.

Only numpy and scipy are used.
"""

from __future__ import annotations

import math
import warnings
from dataclasses import dataclass, field

import numpy as np
import scipy.linalg

# ---------------------------------------------------------------------------
# Constants and defaults (paper values unless stated)
# ---------------------------------------------------------------------------

EPS_DEFAULT = 1e-8          # epsilon, Eq. 5
DELTA_REG_DEFAULT = 1e-6    # full-rank regularization, Section 3.1
ETA_DEFAULT = 1e-6          # active weight threshold, Section 3.2
H_MIN_DEFAULT = 1e-6        # JSD normalization floor, Eq. 9
TAU_DEFAULT = 1.0           # softmax temperature, Section 3.2
# D_hat is fixed for the state-level studies (B.1, V2, P2, P3); this is an
# implementation choice, not a paper value: D = 19 * D_ref gives 0.95.
D_REF_DEFAULT = 100.0       # accidental rate, counts per window (choice)
D_DEFAULT = 1900.0          # coincidence rate, counts per window (choice)

PAULI = {
    "I": np.eye(2, dtype=complex),
    "X": np.array([[0, 1], [1, 0]], dtype=complex),
    "Y": np.array([[0, -1j], [1j, 0]], dtype=complex),
    "Z": np.array([[1, 0], [0, -1]], dtype=complex),
}


# ---------------------------------------------------------------------------
# Basic density-matrix tools
# ---------------------------------------------------------------------------

def herm(a: np.ndarray) -> np.ndarray:
    """Hermitian part (A + A^dagger) / 2; works on stacks (..., d, d)."""
    return 0.5 * (a + np.conj(np.swapaxes(a, -1, -2)))


def sqrtm_psd(a: np.ndarray) -> np.ndarray:
    """Matrix square root of a PSD matrix via scipy.linalg.sqrtm, followed
    by a Hermitian clean-up (Hermitian part, eigenvalues clipped at 0)."""
    with warnings.catch_warnings():
        # singular (rank-deficient) inputs are expected; the clean-up below
        # removes the resulting round-off
        warnings.simplefilter("ignore")
        s = scipy.linalg.sqrtm(herm(a))
    s = herm(np.asarray(s, dtype=complex))
    w, v = np.linalg.eigh(s)
    w = np.clip(w, 0.0, None)
    return (v * w) @ np.conj(v.T)


def fidelity(rho1: np.ndarray, rho2: np.ndarray) -> float:
    """Uhlmann fidelity F = (Tr sqrt(sqrt(rho1) rho2 sqrt(rho1)))^2 (Eq. 3),
    squared convention, F in [0, 1]."""
    s1 = sqrtm_psd(rho1)
    m = herm(s1 @ herm(rho2) @ s1)
    ev = np.clip(np.linalg.eigvalsh(m), 0.0, None)
    f = float(np.sum(np.sqrt(ev)) ** 2)
    return min(max(f, 0.0), 1.0)


def vn_entropy_bits(rho: np.ndarray) -> float:
    """von Neumann entropy S(rho) = -Tr rho log2 rho, in bits."""
    ev = np.clip(np.linalg.eigvalsh(herm(rho)), 0.0, None)
    ev = ev[ev > 0]
    return float(-np.sum(ev * np.log2(ev)))


def spectrum_entropy_bits(ev) -> float:
    ev = np.asarray(ev, dtype=float)
    ev = ev[ev > 0]
    return float(-np.sum(ev * np.log2(ev)))


def informativeness(rho: np.ndarray, d: int | None = None) -> float:
    """I(rho) = 1 - S(rho)/log2(d) (Eq. 4)."""
    d = rho.shape[0] if d is None else d
    return 1.0 - vn_entropy_bits(rho) / math.log2(d)


def gate(i1: float, i2: float, eps: float = EPS_DEFAULT) -> float:
    """Normalized smooth gate G_eps = sqrt((I1+eps)(I2+eps))/(1+eps) (Eq. 5).
    I is clipped at 0 from below only to absorb round-off (I >= 0 exactly)."""
    i1 = max(i1, 0.0)
    i2 = max(i2, 0.0)
    return math.sqrt((i1 + eps) * (i2 + eps)) / (1.0 + eps)


def regularize(rho: np.ndarray, delta_reg: float = DELTA_REG_DEFAULT) -> np.ndarray:
    """Full-rank regularization rho~ = (1 - delta) rho + delta I/d (Sec. 3.1).
    Works on stacks (..., d, d)."""
    d = rho.shape[-1]
    return (1.0 - delta_reg) * rho + delta_reg * np.eye(d) / d


def purity(rho: np.ndarray) -> float:
    return float(np.real(np.trace(rho @ rho)))


def partial_transpose_B(rho: np.ndarray) -> np.ndarray:
    """Partial transpose on qubit B of a two-qubit state."""
    r = rho.reshape(2, 2, 2, 2)
    return r.transpose(0, 3, 2, 1).reshape(4, 4)


def min_pt_eigenvalue(rho: np.ndarray) -> float:
    """Smallest eigenvalue of the partial transpose (PPT test; for 2x2 a
    state is separable iff this is >= 0)."""
    return float(np.min(np.linalg.eigvalsh(herm(partial_transpose_B(rho)))))


def concurrence(rho: np.ndarray) -> float:
    """Wootters concurrence of a two-qubit state."""
    yy = np.kron(PAULI["Y"], PAULI["Y"])
    rt = yy @ np.conj(rho) @ yy
    s = sqrtm_psd(rho)
    ev = np.clip(np.linalg.eigvalsh(herm(s @ rt @ s)), 0.0, None)
    lam = np.sort(np.sqrt(ev))[::-1]
    return float(max(0.0, lam[0] - lam[1] - lam[2] - lam[3]))


# ---------------------------------------------------------------------------
# Named states
# ---------------------------------------------------------------------------

def ket(*amps) -> np.ndarray:
    v = np.asarray(amps, dtype=complex)
    return v / np.linalg.norm(v)


PHI_PLUS = ket(1, 0, 0, 1)


def proj(v: np.ndarray) -> np.ndarray:
    return np.outer(v, np.conj(v))


def bell_phi_plus() -> np.ndarray:
    return proj(PHI_PLUS)


def werner(p: float) -> np.ndarray:
    """rho_W = p |Phi+><Phi+| + (1 - p) I/4."""
    return p * bell_phi_plus() + (1.0 - p) * np.eye(4) / 4.0


def werner_spectrum(p: float) -> np.ndarray:
    return np.array([(1 + 3 * p) / 4] + [(1 - p) / 4] * 3)


def separable_classical() -> np.ndarray:
    """Named separable mixed state used in B.1:
    (|00><00| + |11><11|)/2, the fully dephased Bell state.
    Separable (diagonal in a product basis), S = 1 bit, I = 0.5, purity 0.5."""
    return np.diag([0.5, 0, 0, 0.5]).astype(complex)


def maximally_mixed(d: int = 4) -> np.ndarray:
    return np.eye(d, dtype=complex) / d


def diagonal_product_basis_state(spectrum) -> np.ndarray:
    """Separable state with a prescribed spectrum: diag(spectrum) in the
    computational (product) basis = a mixture of the product states |ij>."""
    return np.diag(np.asarray(spectrum, dtype=float)).astype(complex)


def qubit_state(r) -> np.ndarray:
    r = np.asarray(r, dtype=float)
    return 0.5 * (PAULI["I"] + r[0] * PAULI["X"] + r[1] * PAULI["Y"] + r[2] * PAULI["Z"])


# ---------------------------------------------------------------------------
# Product SIC-POVM (d = 4, 16 outcomes)
# ---------------------------------------------------------------------------

TETRA = np.array([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], dtype=float) / math.sqrt(3)


def _bloch_op(n) -> np.ndarray:
    return n[0] * PAULI["X"] + n[1] * PAULI["Y"] + n[2] * PAULI["Z"]


def qubit_sic():
    """Tetrahedral qubit SIC: E_k = (I + n_k.sigma)/4, sum_k E_k = I.
    Dual frame D_k = (I + 3 n_k.sigma)/2, so rho = sum_k Tr(E_k rho) D_k."""
    E = np.array([(PAULI["I"] + _bloch_op(n)) / 4 for n in TETRA])
    D = np.array([(PAULI["I"] + 3 * _bloch_op(n)) / 2 for n in TETRA])
    return E, D


def product_sic():
    """16-outcome product SIC: E_(kl) = E_k (x) E_l, dual D_k (x) D_l.
    Outcome index = 4 k + l (k on qubit A, l on qubit B)."""
    E1, D1 = qubit_sic()
    E = np.array([np.kron(a, b) for a in E1 for b in E1])
    D = np.array([np.kron(a, b) for a in D1 for b in D1])
    return E, D


POVM_E, POVM_D = product_sic()
N_OUT = POVM_E.shape[0]
DIM = POVM_E.shape[1]


def born_probs(rho: np.ndarray, E: np.ndarray = POVM_E) -> np.ndarray:
    """P(k) = Tr(E_k rho); works on a stack of rho (n, d, d) -> (n, K)."""
    p = np.real(np.einsum("kij,...ji->...k", E, rho))
    return p


def sample_counts(rho: np.ndarray, n: int, rng: np.random.Generator) -> np.ndarray:
    """Born-rule sampling of n counts over the 16 outcomes."""
    p = np.clip(born_probs(rho), 0.0, None)
    p = p / p.sum()
    return rng.multinomial(n, p)


# ---------------------------------------------------------------------------
# Reconstruction pipeline (a): linear inversion + SGS projection
# ---------------------------------------------------------------------------

def linear_inversion(counts: np.ndarray) -> np.ndarray:
    """rho_LI = sum_k f_k D_k; Hermitian with unit trace, may be non-PSD.
    counts: (K,) or (n, K)."""
    c = np.asarray(counts, dtype=float)
    f = c / c.sum(axis=-1, keepdims=True)
    return herm(np.einsum("...k,kij->...ij", f, POVM_D))


def project_psd_sgs(mu_rho: np.ndarray) -> np.ndarray:
    """Smolin-Gambetta-Smith projection of a unit-trace Hermitian matrix to
    the closest density matrix in 2-norm (PRL 108, 070502)."""
    w, v = np.linalg.eigh(herm(mu_rho))
    order = np.argsort(w)[::-1]
    mu = w[order]
    v = v[:, order]
    d = len(mu)
    lam = np.zeros(d)
    a = 0.0
    i = d
    while i > 0 and mu[i - 1] + a / i < 0:
        a += mu[i - 1]
        lam[i - 1] = 0.0
        i -= 1
    for j in range(i):
        lam[j] = mu[j] + a / i
    return (v * lam) @ np.conj(v.T)


def li_psd(counts: np.ndarray) -> np.ndarray:
    """Pipeline (a). counts: (K,) -> (d, d) or (n, K) -> (n, d, d)."""
    c = np.asarray(counts)
    if c.ndim == 1:
        return project_psd_sgs(linear_inversion(c))
    lin = linear_inversion(c)
    return np.array([project_psd_sgs(x) for x in lin])


# ---------------------------------------------------------------------------
# Reconstruction pipeline (b): iterative MLE (R rho R), batched
# ---------------------------------------------------------------------------

@dataclass
class MLEConfig:
    max_iter: int = 20000
    tol: float = 1e-11      # stop when ||rho_{t+1} - rho_t||_F < tol
    p_floor: float = 1e-300


def random_full_rank_state(rng: np.random.Generator, d: int = DIM) -> np.ndarray:
    """Random full-rank start (Ginibre G G^dag / Tr)."""
    g = rng.normal(size=(d, d)) + 1j * rng.normal(size=(d, d))
    r = g @ np.conj(g.T)
    return r / np.real(np.trace(r))


def mle_rrr(counts: np.ndarray, rho0: np.ndarray | None = None,
            cfg: MLEConfig = MLEConfig()):
    """Batched R rho R iteration.

    counts : (n, K) integer counts
    rho0   : (n, d, d) starting states (default I/d for all)
    returns (rho (n, d, d), iterations (n,), converged (n,) bool)
    """
    c = np.asarray(counts, dtype=float)
    if c.ndim == 1:
        c = c[None, :]
    n = c.shape[0]
    f = c / c.sum(axis=1, keepdims=True)
    if rho0 is None:
        rho = np.broadcast_to(np.eye(DIM, dtype=complex) / DIM, (n, DIM, DIM)).copy()
    else:
        rho = np.array(rho0, dtype=complex)
    iters = np.zeros(n, dtype=int)
    done = np.zeros(n, dtype=bool)
    active = np.arange(n)
    for it in range(1, cfg.max_iter + 1):
        r_ = rho[active]
        p = np.maximum(born_probs(r_), cfg.p_floor)
        ratio = np.where(f[active] > 0, f[active] / p, 0.0)
        R = np.einsum("nk,kij->nij", ratio, POVM_E)
        new = R @ r_ @ R
        tr = np.real(np.trace(new, axis1=1, axis2=2))
        new = herm(new / tr[:, None, None])
        diff = np.linalg.norm((new - r_).reshape(len(active), -1), axis=1)
        rho[active] = new
        iters[active] = it
        fin = diff < cfg.tol
        if np.any(fin):
            done[active[fin]] = True
            active = active[~fin]
            if active.size == 0:
                break
    return rho, iters, done


# ---------------------------------------------------------------------------
# Classical information quantities
# ---------------------------------------------------------------------------

def shannon_bits(p: np.ndarray) -> float:
    p = np.asarray(p, dtype=float)
    p = p[p > 0]
    return float(-np.sum(p * np.log2(p)))


def kl_bits(p: np.ndarray, q: np.ndarray) -> float:
    m = p > 0
    return float(np.sum(p[m] * np.log2(p[m] / q[m])))


def jsd_weighted(P: np.ndarray, w: np.ndarray) -> float:
    """JSD_w = H(P_mix) - sum_i w_i H(P_i) (Eq. 8), evaluated in the
    algebraically identical form sum_i w_i KL(P_i || P_mix), which has no
    catastrophic cancellation for small values. Bits."""
    P = np.asarray(P, dtype=float)
    w = np.asarray(w, dtype=float)
    mix = w @ P
    return max(0.0, float(sum(wi * kl_bits(pi, mix) for wi, pi in zip(w, P) if wi > 0)))


def jsd_pair(p: np.ndarray, q: np.ndarray) -> float:
    """Equal-weight two-distribution JSD in bits (used by Algorithm 1)."""
    return jsd_weighted(np.vstack([p, q]), np.array([0.5, 0.5]))


def softmax_nats(ll: np.ndarray, tau: float = TAU_DEFAULT) -> np.ndarray:
    z = np.asarray(ll, dtype=float) / tau
    z = z - np.max(z)
    e = np.exp(z)
    return e / e.sum()


def connected_components(adj: np.ndarray) -> int:
    n = adj.shape[0]
    seen = np.zeros(n, dtype=bool)
    comps = 0
    for s in range(n):
        if seen[s]:
            continue
        comps += 1
        stack = [s]
        seen[s] = True
        while stack:
            u = stack.pop()
            for v in np.nonzero(adj[u])[0]:
                if not seen[v]:
                    seen[v] = True
                    stack.append(v)
    return comps


def d_hat(D: float = D_DEFAULT, D_ref: float = D_REF_DEFAULT) -> float:
    """Detection quality weight D/(D + D_ref) (Eq. 13)."""
    return D / (D + D_ref) if D + D_ref > 0 else 0.0


# ---------------------------------------------------------------------------
# Simulation of one experiment: raw (unregularized) reconstructions
# ---------------------------------------------------------------------------

MODELS = ("LI", "MLE")


@dataclass
class SimConfig:
    N: int = 10_000            # counts per batch (A and B each)
    K_folds: int = 5           # cross-validation folds for LL_i
    B_boot: int = 20           # bootstrap iterations for delta_i (paper: 1000)
    mle: MLEConfig = field(default_factory=MLEConfig)            # fits entering Psi
    mle_boot: MLEConfig = field(default_factory=lambda: MLEConfig(max_iter=3000, tol=1e-10))


@dataclass
class RawRun:
    counts_A: np.ndarray
    counts_B: np.ndarray
    rho1: np.ndarray                 # LI-PSD on batch A (pipeline 1)
    rho2: np.ndarray                 # MLE on batch B (pipeline 2)
    rho1_mle: np.ndarray             # MLE on batch A (variant: both pipelines MLE)
    model_full: dict                 # model -> rho fitted on A + B
    cv_train: dict                   # model -> (K, d, d) fits on training folds
    cv_test: np.ndarray              # (K, n_out) held-out counts
    boot_literal: dict               # model -> (B, 2, d, d), same resample, two starts
    boot_sampling: dict              # model -> (B, 2, d, d), two independent resamples
    mle_iters_max: int
    mle_all_converged: bool
    # counts kept so that further models can be fitted to identical data
    counts_AB: np.ndarray | None = None
    cv_train_counts: np.ndarray | None = None
    boot_lit_counts: np.ndarray | None = None
    boot_s1_counts: np.ndarray | None = None
    boot_s2_counts: np.ndarray | None = None
    models: tuple = MODELS


def _split_folds(counts: np.ndarray, K: int, rng: np.random.Generator) -> np.ndarray:
    """Assign each counted event to one of K folds uniformly at random
    (balanced by a random permutation). Returns (K, n_out) test counts."""
    events = np.repeat(np.arange(len(counts)), counts)
    rng.shuffle(events)
    folds = np.zeros((K, len(counts)), dtype=int)
    for k in range(K):
        sel = events[k::K]
        folds[k] = np.bincount(sel, minlength=len(counts))
    return folds


def simulate(rho_true: np.ndarray, seed, cfg: SimConfig = SimConfig()) -> RawRun:
    """Run one simulated experiment and every reconstruction it needs.

    seed: anything np.random.SeedSequence accepts (int or tuple of ints).
    Stream layout (independent child streams): 0 data A, 1 data B,
    2 CV split, 3 bootstrap resampling, 4 MLE random starts.
    """
    ss = np.random.SeedSequence(seed)
    r_A, r_B, r_cv, r_bt, r_st = [np.random.default_rng(s) for s in ss.spawn(5)]

    cA = sample_counts(rho_true, cfg.N, r_A)
    cB = sample_counts(rho_true, cfg.N, r_B)
    cAB = cA + cB
    test = _split_folds(cAB, cfg.K_folds, r_cv)
    train = cAB[None, :] - test

    Bn = cfg.B_boot
    p_hat = cAB / cAB.sum()
    nAB = int(cAB.sum())
    boot_lit = r_bt.multinomial(nAB, p_hat, size=Bn)                  # (B, K)
    boot_s1 = r_bt.multinomial(nAB, p_hat, size=Bn)
    boot_s2 = r_bt.multinomial(nAB, p_hat, size=Bn)

    eye = np.eye(DIM, dtype=complex) / DIM
    # ---- MLE problems that enter Psi (strict convergence) -----------------
    main_counts = np.vstack([cA[None], cB[None], cAB[None], train])
    main_rho, it_m, cv_m = mle_rrr(main_counts, None, cfg.mle)
    mle_A, mle_B, mle_AB = main_rho[0], main_rho[1], main_rho[2]
    mle_tr = main_rho[3:]

    # ---- bootstrap MLE problems (thresholds delta_i only) ----------------
    st = np.array([random_full_rank_state(r_st) for _ in range(4 * Bn)])
    boot_counts = np.vstack([boot_lit, boot_lit, boot_s1, boot_s2])
    boot_rho, it_b, cv_b = mle_rrr(boot_counts, st, cfg.mle_boot)
    mle_lit = np.stack([boot_rho[0:Bn], boot_rho[Bn:2 * Bn]], axis=1)
    mle_smp = np.stack([boot_rho[2 * Bn:3 * Bn], boot_rho[3 * Bn:4 * Bn]], axis=1)
    iters = it_m
    conv = cv_m

    li_A = li_psd(cA)
    li_AB = li_psd(cAB)
    li_tr = li_psd(train)
    li_lit_one = li_psd(boot_lit)
    li_lit = np.stack([li_lit_one, li_lit_one.copy()], axis=1)     # deterministic
    li_smp = np.stack([li_psd(boot_s1), li_psd(boot_s2)], axis=1)

    return RawRun(
        counts_A=cA, counts_B=cB, rho1=li_A, rho2=mle_B, rho1_mle=mle_A,
        model_full={"LI": li_AB, "MLE": mle_AB},
        cv_train={"LI": li_tr, "MLE": mle_tr},
        cv_test=test,
        boot_literal={"LI": li_lit, "MLE": mle_lit},
        boot_sampling={"LI": li_smp, "MLE": mle_smp},
        mle_iters_max=int(iters.max()),
        mle_all_converged=bool(conv.all()),
        counts_AB=cAB, cv_train_counts=train, boot_lit_counts=boot_lit,
        boot_s1_counts=boot_s1, boot_s2_counts=boot_s2,
    )


# ---------------------------------------------------------------------------
# The functional on a RawRun
# ---------------------------------------------------------------------------

def _probs_reg(rho, delta_reg):
    p = born_probs(regularize(rho, delta_reg))
    p = np.clip(p, 0.0, None)
    return p / p.sum(axis=-1, keepdims=True)


def functional(raw: RawRun, eps: float = EPS_DEFAULT,
               delta_reg: float = DELTA_REG_DEFAULT, eta: float = ETA_DEFAULT,
               H_min: float = H_MIN_DEFAULT, tau: float = TAU_DEFAULT,
               Dhat: float | None = None, redundancy: str = "sampling",
               pipeline1: str = "LI", models: tuple | None = None) -> dict:
    """Evaluate Psi and all mandated diagnostics on a simulated run.

    pipeline1: 'LI' (default: pipeline 1 = LI-PSD on batch A) or 'MLE'
      (variant: both pipelines are MLE, matching B.1's "MLE reconstruction").
    redundancy (default 'sampling', see README for why):
      'literal'  : Algorithm 1 step 1 as written. Per bootstrap iteration,
                   one resample, two reconstructions of the same family with
                   different starting seeds; delta_i = 95th percentile of the
                   JSD between them (estimator-internal variability only).
      'sampling' : alternative reading ("combined spread from sampling
                   variability and estimator stochasticity"): two
                   independent resamples, each reconstructed by family i
                   from a different random start; delta_i = 95th percentile.
    """
    if Dhat is None:
        Dhat = d_hat()
    rho1 = raw.rho1 if pipeline1 == "LI" else raw.rho1_mle
    r1 = regularize(rho1, delta_reg)
    r2 = regularize(raw.rho2, delta_reg)
    F = fidelity(r1, r2)
    I1 = informativeness(r1)
    I2 = informativeness(r2)
    G = gate(I1, I2, eps)
    R12 = F * G

    # ---- models on combined data ----------------------------------------
    MODELS_ = tuple(models) if models is not None else MODELS
    P = np.array([_probs_reg(raw.model_full[m], delta_reg) for m in MODELS_])
    LL = np.zeros(len(MODELS_))
    for i, m in enumerate(MODELS_):
        ptr = _probs_reg(raw.cv_train[m], delta_reg)          # (K, n_out)
        LL[i] = float(np.sum(raw.cv_test * np.log(ptr)))      # nats
    w_raw = softmax_nats(LL, tau)
    active = np.nonzero(w_raw >= eta)[0]
    n_active = len(active)
    w = w_raw[active] / w_raw[active].sum()
    Hw = shannon_bits(w)
    if n_active == 1:
        jsdw = 0.0
        jsd_norm = 0.0
    else:
        jsdw = jsd_weighted(P[active], w)
        jsd_norm = jsdw / (Hw + H_min)
    C0 = 1.0 - jsd_norm

    # ---- Algorithm 1: thresholds and redundancy graph -------------------
    boot = raw.boot_literal if redundancy == "literal" else raw.boot_sampling
    delta = np.zeros(len(MODELS_))
    for i, m in enumerate(MODELS_):
        pb = _probs_reg(boot[m], delta_reg)                    # (B, 2, n_out)
        js = np.array([jsd_pair(a, b) for a, b in pb])
        delta[i] = float(np.percentile(js, 95))
    adj = np.zeros((n_active, n_active), dtype=bool)
    for a_ in range(n_active):
        for b_ in range(a_ + 1, n_active):
            i, j = active[a_], active[b_]
            if jsd_pair(P[i], P[j]) < max(delta[i], delta[j]):   # strict '<'
                adj[a_, b_] = adj[b_, a_] = True
    jsd_li_mle = jsd_pair(P[0], P[1])     # reported for every run
    n_unique = connected_components(adj) if n_active > 0 else 0
    Rr = n_unique / n_active
    C_eff = C0 * Rr

    Gamma = C_eff * Dhat
    psi = R12 * Gamma
    return {
        "psi": psi, "S_eff": (-math.log2(psi) if psi > 0 else math.inf),
        "F": F, "I1": I1, "I2": I2, "G_eps": G, "R12": R12,
        "LL_nats": LL.tolist(), "w_raw": w_raw.tolist(), "n_active": n_active,
        "H_w": Hw, "JSD_w": jsdw, "JSD_norm": jsd_norm, "C0": C0,
        "delta_i": delta.tolist(), "JSD_LI_MLE": jsd_li_mle,
        "n_unique": n_unique, "R": Rr, "C_eff": C_eff, "D_hat": Dhat,
        "Gamma": Gamma, "models": list(MODELS_), "active": [MODELS_[i] for i in active],
        "components": _components(adj, [MODELS_[i] for i in active]),
        "pair_jsd": {f"{MODELS_[i]}-{MODELS_[j]}": jsd_pair(P[i], P[j])
                     for i in range(len(MODELS_)) for j in range(i + 1, len(MODELS_))},
    }


def _components(adj, names):
    n = len(names)
    seen = [False] * n
    out = []
    for s0 in range(n):
        if seen[s0]:
            continue
        comp, stack = [], [s0]
        seen[s0] = True
        while stack:
            u = stack.pop()
            comp.append(names[u])
            for v in np.nonzero(adj[u])[0]:
                if not seen[v]:
                    seen[v] = True
                    stack.append(v)
        out.append(sorted(comp))
    return out


def exact_psi(rho: np.ndarray, eps: float = EPS_DEFAULT,
              delta_reg: float = DELTA_REG_DEFAULT, Dhat: float | None = None) -> dict:
    """Exact (infinite-N) quantities for a state rho.

    Since F <= 1 and C_eff <= 1, every estimate obeys Psi <= G_eps * D_hat,
    and in the infinite-N limit both reconstructions equal rho, so
    R12 -> G_eps(rho, rho) = (I(rho) + eps)/(1 + eps).
    'G_eps' uses rho itself, 'G_eps_reg' uses the regularized rho~.
    'psi_upper' = G_eps_reg * D_hat is the upper bound on Psi (C_eff = 1)."""
    if Dhat is None:
        Dhat = d_hat()
    I0 = informativeness(rho)
    rr = regularize(rho, delta_reg)
    Ir = informativeness(rr)
    G0 = gate(I0, I0, eps)
    Gr = gate(Ir, Ir, eps)
    return {"I": I0, "I_reg": Ir, "G_eps": G0, "G_eps_reg": Gr,
            "psi_upper": Gr * Dhat, "purity": purity(rho)}


# ---------------------------------------------------------------------------
# Lueders instrument for P3
# ---------------------------------------------------------------------------

def lueders_channel_qubitA(rho: np.ndarray, n_axis, gamma: float = 0.5) -> np.ndarray:
    """Non-selective Lueders update for the unsharp two-outcome measurement of
    O = n.sigma on qubit A (||O||_inf = 1): E_k = (1 - gamma) I/m + gamma Pi_k,
    m = 2, Pi_+- = (I +- O)/2, M_k = sqrt(E_k), rho' = sum_k M_k rho M_k^dag."""
    O = _bloch_op(np.asarray(n_axis, dtype=float))
    out = np.zeros_like(rho)
    for s in (+1, -1):
        Pi = (PAULI["I"] + s * O) / 2
        Ek = (1 - gamma) * PAULI["I"] / 2 + gamma * Pi
        Mk = np.kron(sqrtm_psd(Ek), PAULI["I"])
        out = out + Mk @ rho @ np.conj(Mk.T)
    return herm(out)


def op_norm(a: np.ndarray) -> float:
    return float(np.linalg.norm(a, 2))


# ---------------------------------------------------------------------------
# Phase 2: additional reconstruction methods for the C_eff study
# ---------------------------------------------------------------------------

def bme_dirichlet(counts: np.ndarray, rng: np.random.Generator, M: int = 100) -> np.ndarray:
    """Approximate Bayesian mean estimate ('BME').

    Posterior over the 16 outcome probabilities: Dirichlet(n_k + 1) (uniform
    prior on the outcome simplex). Each draw q is mapped to a state by linear
    inversion and Smolin-Gambetta-Smith projection; the estimate is the
    average of the M projected states. This is a Bayesian-bootstrap
    approximation to the posterior mean, not an exact posterior over the
    state space (the prior is on outcome probabilities, not on states)."""
    c = np.asarray(counts, dtype=float)
    q = rng.dirichlet(c + 1.0, size=M)                      # (M, K)
    lin = herm(np.einsum("mk,kij->mij", q, POVM_D))
    acc = np.zeros((DIM, DIM), dtype=complex)
    for x in lin:
        acc += project_psd_sgs(x)
    return herm(acc / M)


def mle_rank1(counts: np.ndarray, rng: np.random.Generator, n_random_starts: int = 2) -> np.ndarray:
    """Rank-1 constrained MLE ('R1'): maximize sum_k n_k ln <psi|E_k|psi>
    over pure states, by L-BFGS on the real 8-vector of psi with analytic
    gradient. Starts: the top eigenvector of the LI-PSD estimate plus
    `n_random_starts` random vectors; the best optimum is kept. Deliberately
    misspecified for mixed states."""
    from scipy.optimize import minimize
    c = np.asarray(counts, dtype=float)
    Ntot = c.sum()
    mask = c > 0
    Em = POVM_E[mask]
    cm = c[mask]

    def fg(x):
        psi = x[:DIM] + 1j * x[DIM:]
        nrm = float(np.real(np.vdot(psi, psi)))
        Ep = Em @ psi                                        # (K', d)
        p = np.real(np.einsum("i,ki->k", np.conj(psi), Ep))
        p = np.maximum(p, 1e-300)
        f = -float(np.sum(cm * np.log(p))) + Ntot * math.log(nrm)
        g = -np.einsum("k,ki->i", cm / p, Ep) + Ntot * psi / nrm
        return f, 2.0 * np.concatenate([g.real, g.imag])

    w, v = np.linalg.eigh(li_psd(c))
    starts = [v[:, -1]] + [rng.normal(size=DIM) + 1j * rng.normal(size=DIM) for _ in range(n_random_starts)]
    best = None
    for s0 in starts:
        x0 = np.concatenate([s0.real, s0.imag])
        r = minimize(fg, x0, jac=True, method="L-BFGS-B", options={"maxiter": 500, "gtol": 1e-10})
        if best is None or r.fun < best.fun:
            best = r
    psi = best.x[:DIM] + 1j * best.x[DIM:]
    psi = psi / np.linalg.norm(psi)
    return np.outer(psi, np.conj(psi))


EXTRA_MODELS = ("BME", "R1")


def add_models(raw: RawRun, names=EXTRA_MODELS, seed=0, bme_draws: int = 100) -> RawRun:
    """Fit additional models on exactly the data already used by `raw`
    (pooled counts, CV training folds, both 'sampling' bootstrap resamples).
    Only the 'sampling' reading of Algorithm 1 is supported for them."""
    rng = np.random.default_rng(np.random.SeedSequence(seed))
    for m in names:
        if m == "BME":
            fit = lambda c: bme_dirichlet(c, rng, bme_draws)  # noqa: E731
        elif m == "R1":
            fit = lambda c: mle_rank1(c, rng)  # noqa: E731
        else:
            raise ValueError(m)
        raw.model_full[m] = fit(raw.counts_AB)
        raw.cv_train[m] = np.array([fit(c) for c in raw.cv_train_counts])
        raw.boot_sampling[m] = np.stack([np.array([fit(c) for c in raw.boot_s1_counts]),
                                         np.array([fit(c) for c in raw.boot_s2_counts])], axis=1)
    raw.models = tuple(list(MODELS) + [m for m in names if m not in MODELS])
    return raw
