"""
test_v12b.py: tests for the v12 correlation gate (crt.correlation_informativeness,
crt.functional(gate_kind='v12')) and the phase-2 code in run_v12b.py.
Run:  python3 test_v12b.py

L1 decomposition I_v11 = I_c + (I(rho_A) + I(rho_B))/2 on random states.
L2 unbiased records: I_c = I_v11 exactly (= I(r_A:r_B)/2 for classical records).
L3 independent records, any bias: I_c = 0 (gate at the eps floor).
L4 perfect correlation: classical unbiased 1/2 (= v11); biased h(p)/2; Bell 1.
L5 local-unitary invariance.
L6 the default gate of crt.functional is unchanged ('v11'); 'v12' equals
   'v11' for a Werner state's exact gate.
L7 the tie fix gives unbiased hazy records at even m and leaves odd m and
   pure c-maybe records unchanged.
L8 first-order floor constant: Monte Carlo of the Gaussian linear-inversion
   error with the exact SIC dual-frame covariance gives about 27.6.
"""

from __future__ import annotations

import math
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import crt  # noqa: E402
import run_v12 as v1  # noqa: E402
import run_v12b as v2  # noqa: E402


def _rand(d, rng, rank=None):
    rank = rank or d
    g = rng.normal(size=(d, rank)) + 1j * rng.normal(size=(d, rank))
    r = g @ np.conj(g.T)
    return r / np.real(np.trace(r))


def _haar_u(d, rng):
    z = (rng.normal(size=(d, d)) + 1j * rng.normal(size=(d, d))) / math.sqrt(2)
    q, r = np.linalg.qr(z)
    return q * (np.diag(r) / np.abs(np.diag(r)))


def test_L1_decomposition():
    rng = np.random.default_rng(1)
    for _ in range(200):
        rho = _rand(4, rng, rank=int(rng.integers(1, 5)))
        iA = 1 - crt.vn_entropy_bits(crt.partial_trace(rho, 2, 2, "A"))
        iB = 1 - crt.vn_entropy_bits(crt.partial_trace(rho, 2, 2, "B"))
        assert abs(crt.informativeness(rho) - (crt.correlation_informativeness(rho) + (iA + iB) / 2)) < 1e-10


def test_L2_unbiased():
    rng = np.random.default_rng(2)
    for _ in range(100):
        q = rng.uniform(0, 0.5)
        P = np.array([[0.5 - q / 2, q / 2], [q / 2, 0.5 - q / 2]])     # uniform marginals
        rho = np.diag(P.ravel()).astype(complex)
        ic = crt.correlation_informativeness(rho)
        assert abs(ic - crt.informativeness(rho)) < 1e-12
        assert abs(ic - (1 - v1.h2(q)) / 2) < 1e-12
    for p in (0.0, 0.3, 0.8, 1.0):                                    # Werner: maximally mixed marginals
        assert abs(crt.correlation_informativeness(crt.werner(p)) - crt.informativeness(crt.werner(p))) < 1e-12


def test_L3_independent():
    for p in (0.5, 0.4, 0.3, 0.1, 0.0):
        for q in (0.5, 0.2, 1.0):
            rho = np.kron(np.diag([p, 1 - p]), np.diag([q, 1 - q])).astype(complex)
            assert crt.correlation_informativeness(rho) < 1e-12
            # full-rank regularization mixes in I/4 and is not product-preserving:
            # it adds O(delta_reg log) shared information, at most 2.4e-6 (pure |00>)
            assert crt.correlation_informativeness(crt.regularize(rho)) < 3e-6
    rho = np.kron(np.diag([0.3, 0.7]), np.diag([0.3, 0.7])).astype(complex)
    assert crt.informativeness(rho) > 0.1          # v11 rewards this bias


def test_L4_perfect():
    assert abs(crt.correlation_informativeness(crt.separable_classical()) - 0.5) < 1e-12
    for p in (0.5, 0.7, 0.9):
        rho = np.diag([p, 0, 0, 1 - p]).astype(complex)
        assert abs(crt.correlation_informativeness(rho) - v1.h2(p) / 2) < 1e-12
        assert abs(crt.informativeness(rho) - (1 - v1.h2(p) / 2)) < 1e-12
    assert abs(crt.correlation_informativeness(crt.bell_phi_plus()) - 1.0) < 1e-9
    rng = np.random.default_rng(4)
    for _ in range(200):     # classical two-bit records never exceed 1/2
        P = rng.dirichlet(np.ones(4))
        assert crt.correlation_informativeness(np.diag(P).astype(complex)) <= 0.5 + 1e-12


def test_L5_local_unitary():
    rng = np.random.default_rng(5)
    for _ in range(50):
        rho = _rand(4, rng)
        U = np.kron(_haar_u(2, rng), _haar_u(2, rng))
        assert abs(crt.correlation_informativeness(U @ rho @ np.conj(U.T))
                   - crt.correlation_informativeness(rho)) < 1e-9


def test_L6_functional_default():
    raw = crt.simulate(crt.werner(0.6), (5, 5), crt.SimConfig(N=10000, B_boot=5))
    a = crt.functional(raw)
    b = crt.functional(raw, gate_kind="v11")
    assert a == b
    c = crt.functional(raw, gate_kind="v12")
    assert c["F"] == a["F"] and c["C_eff"] == a["C_eff"]
    assert c["I1"] <= a["I1"] + 1e-12 and c["I2"] <= a["I2"] + 1e-12   # I_c <= I_v11 always


def test_L7_tiefix():
    for th, hz in ((math.pi / 4, 0.3), (math.pi / 2, 0.6)):
        for m in (1, 2, 3, 4):
            P, _ = v1.hazy_records(th, hz, m)
            Pt, _ = v2.hazy_records_tiefix(th, hz, m)
            assert abs(Pt.sum(1)[0] - 0.5) < 1e-9                    # fair records
            if m % 2 == 1:
                assert np.allclose(P, Pt, atol=1e-12)                 # no ties at odd m
    for m in (1, 2, 4):                                                # pure c-maybe unchanged
        r0 = v1.product_op(crt.proj(np.array([1, 0], complex)), m)
        e = np.array([math.cos(0.5), math.sin(0.5)], complex)
        r1 = v1.product_op(crt.proj(e), m)
        Pi0, _ = v1.helstrom(r0, r1)
        Pt0, _ = v2.helstrom_tiefix(r0, r1)
        assert abs(np.trace(Pi0 @ r0) - np.trace(Pt0 @ r0)) < 1e-12
        assert abs(np.trace(Pi0 @ r1) - np.trace(Pt0 @ r1)) < 1e-12


def test_L8_floor_constant(n_mc=40000):
    """First-order constant from the exact linear-inversion covariance for I/4:
    Delta = sum_k (f_k - p_k) D_k, Cov(f) = (diag p - p p^T)/N. Gaussian Delta at
    N = 1e8 (deep in the first-order regime), I_c-hat of I/4 + Delta,
    a_c = N (E sqrt(I_c-hat))^2."""
    rng = np.random.default_rng(8)
    p = np.full(16, 1 / 16)
    cov = (np.diag(p) - np.outer(p, p))
    w, V = np.linalg.eigh(cov)
    L = V * np.sqrt(np.clip(w, 0, None))
    N = 1e8
    z = rng.normal(size=(n_mc, 16)) @ L.T / math.sqrt(N)
    deltas = np.einsum("nk,kij->nij", z, crt.POVM_D)
    s = 0.0
    for dlt in deltas:
        s += math.sqrt(max(crt.correlation_informativeness(crt.maximally_mixed(4) + crt.herm(dlt)), 0.0))
    a_c = N * (s / n_mc) ** 2
    assert abs(a_c - 27.64) / 27.64 < 0.02, a_c
    return a_c


if __name__ == "__main__":
    test_L1_decomposition()
    test_L2_unbiased()
    test_L3_independent()
    test_L4_perfect()
    test_L5_local_unitary()
    test_L6_functional_default()
    test_L7_tiefix()
    a = test_L8_floor_constant()
    print(f"first-order floor constant (Monte Carlo, exact SIC covariance): {a:.2f} (derivation 27.64)")
    print("all v12b tests passed")
