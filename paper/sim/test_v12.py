"""
test_v12.py: unit tests for the v12 (quantum Darwinism) code in run_v12.py.
Run:  python3 test_v12.py

1. c-maybe partial information against the closed form (pure states:
   eigenvalues of rank-2 Gram matrices).
2. CNOT (GHZ) environment: I(S:F) = 1 bit for 0 < m < N_E and 2 at m = N_E.
3. Pure-state symmetry I(S:F) + I(S:F_complement) = 2 H(S), scrambled states.
4. Helstrom error for two pure states against (1 - sqrt(1 - 4 p0 p1 |<a|b>|^2))/2,
   and the record law for theta = pi/2 is (|00><00| + |11><11|)/2.
5. Exact scrambled sampling: <v0|v1> = cos^N_E(theta).
6. Classical correlation / Holevo / discord on known states (Bell, cq states,
   the Le and Olaya-Castro Eq. C4 value).
7. chi <= trace distance for two equiprobable states (random qubit and
   qutrit pairs, pure and mixed): the inequality used in the pre-registered
   no-gap argument of Simulation 3.
8. Hazy builder reduces to the pure c-maybe state at h = 0.
9. The record pipeline on rho_R = I/4 gives the V2 floor scale.
"""

from __future__ import annotations

import math
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import crt  # noqa: E402
import run_v12 as v  # noqa: E402


def _closed_form_mi(theta, n_env, m):
    """I(S:F_m) for (|0>|0^n> + |1>|e^n>)/sqrt2, <0|e> = c = cos(theta)."""
    c = math.cos(theta)

    def h_pair(overlap):          # entropy of (|a><a| + |b><b|)/2, |<a|b>| = overlap
        lam = (1 + overlap) / 2
        return v.h2(lam)
    HS = h_pair(c ** n_env)       # rho_S has off-diagonal c^n / 2
    HF = h_pair(c ** m)
    HSF = h_pair(c ** (n_env - m))  # = H(complement)
    return HS + HF - HSF


def test_cmaybe_closed_form():
    for theta in (math.pi / 16, math.pi / 5, math.pi / 3):
        for n_env in (4, 7):
            mi = v.mi_curve_pure(v.cmaybe_psi(theta, n_env), n_env)
            for m in range(1, n_env + 1):
                assert abs(mi[m] - _closed_form_mi(theta, n_env, m)) < 1e-10


def test_ghz():
    mi = v.mi_curve_pure(v.cmaybe_psi(math.pi / 2, 6), 6)
    assert np.allclose(mi[1:6], 1.0, atol=1e-12) and abs(mi[6] - 2.0) < 1e-12


def test_pure_symmetry():
    rng = np.random.default_rng(5)
    n_env = 8
    psi = v.scrambled_psi(math.pi / 3, n_env, rng)
    n = n_env + 1
    HS = v.pure_entropy(psi, n, [0])
    for m in range(1, n_env):
        F = list(range(1, m + 1))
        Fc = list(range(m + 1, n))
        i1 = HS + v.pure_entropy(psi, n, F) - v.pure_entropy(psi, n, [0] + F)
        i2 = HS + v.pure_entropy(psi, n, Fc) - v.pure_entropy(psi, n, [0] + Fc)
        assert abs(i1 + i2 - 2 * HS) < 1e-10


def test_helstrom_pure():
    rng = np.random.default_rng(7)
    for _ in range(20):
        a = v.haar_vec(4, rng)
        b = v.haar_vec(4, rng)
        r0, r1 = crt.proj(a), crt.proj(b)
        Pi0, Pi1 = v.helstrom(r0, r1)
        pe = 0.5 * np.real(np.trace(Pi1 @ r0)) + 0.5 * np.real(np.trace(Pi0 @ r1))
        pred = (1 - math.sqrt(1 - abs(np.vdot(a, b)) ** 2)) / 2
        assert abs(pe - pred) < 1e-10
    for m in (1, 3):
        P, PA = v.cmaybe_records(math.pi / 2, m)
        assert np.allclose(P, [[0.5, 0], [0, 0.5]], atol=1e-12)
        c = math.cos(math.pi / 5) ** m
        P, PA = v.cmaybe_records(math.pi / 5, m)
        assert abs(PA[0][1] - (1 - math.sqrt(1 - c * c)) / 2) < 1e-10
        assert abs(P.sum() - 1) < 1e-12 and np.allclose(P, P.T)


def test_scrambled_overlap():
    rng = np.random.default_rng(11)
    for theta, n in ((math.pi / 2, 6), (math.pi / 8, 5)):
        psi = v.scrambled_psi(theta, n, rng)
        v0, v1 = v.branch_vectors(psi, n)
        assert abs(np.linalg.norm(v0) - 1) < 1e-12 and abs(np.linalg.norm(v1) - 1) < 1e-12
        assert abs(np.vdot(v0, v1) - math.cos(theta) ** n) < 1e-12


def test_scrambled_records_normalized():
    rng = np.random.default_rng(3)
    psi = v.scrambled_psi(math.pi / 2, 8, rng)
    for m in (1, 2, 4):
        P, PA, PB = v.scrambled_records(psi, 8, m)
        assert abs(P.sum() - 1) < 1e-10 and np.all(P >= -1e-14)
        # marginals of the joint law equal the single-observer laws
        assert np.allclose(P.sum(1), 0.5 * (PA[0] + PA[1]), atol=1e-10)
        assert np.allclose(P.sum(0), 0.5 * (PB[0] + PB[1]), atol=1e-10)


def test_discord_known_states():
    bell = crt.bell_phi_plus()
    t = v.discord_table(bell, 2)
    assert abs(t["I"] - 2) < 1e-9 and abs(t["chi_max"] - 1) < 1e-7 and abs(t["D_S"] - 1) < 1e-7
    assert abs(t["J_SgivenF"] - 1) < 1e-7
    cq = 0.5 * np.kron(np.diag([1, 0]), crt.proj(np.array([1, 0], complex))) + \
        0.5 * np.kron(np.diag([0, 1]), crt.proj(np.array([math.cos(0.4), math.sin(0.4)], complex)))
    t = v.discord_table(cq.astype(complex), 2)
    assert abs(t["I"] - t["chi_ptr"]) < 1e-9 and t["D_S"] < 1e-9 and t["D_F"] > 1e-3
    hd = v.discord_table(v.horodecki_state(0.8), 2)
    p = 0.8
    pt = p * p + (1 - p) ** 2
    c4 = v.h2(p) - pt * v.h2(p * p / pt) - (1 - pt) * 1.0
    assert abs(hd["chi_ptr"] - c4) < 1e-9
    assert abs(hd["I"] - v.h2(pt)) < 1e-9      # QD: I(S:E) = H(S)


def _rand_state(d, rank, rng):
    g = rng.normal(size=(d, rank)) + 1j * rng.normal(size=(d, rank))
    r = g @ np.conj(g.T)
    return r / np.real(np.trace(r))


def test_holevo_le_trace_distance():
    rng = np.random.default_rng(2026)
    worst = -1.0
    for d in (2, 3, 4):
        for rank in range(1, d + 1):
            for _ in range(300):
                r0, r1 = _rand_state(d, rank, rng), _rand_state(d, rank, rng)
                if rng.random() < 0.3:      # nearly identical pairs as well
                    r1 = 0.97 * r0 + 0.03 * r1
                chi = v.ent_dm(0.5 * (r0 + r1)) - 0.5 * v.ent_dm(r0) - 0.5 * v.ent_dm(r1)
                T = 0.5 * np.sum(np.abs(np.linalg.eigvalsh(crt.herm(r0 - r1))))
                worst = max(worst, chi - T)
    assert worst <= 1e-12, worst
    return worst


def test_hazy_reduces_to_pure():
    theta, n_env = math.pi / 5, 6
    psi = v.cmaybe_psi(theta, n_env)
    for m in (1, 3):
        a = v.hazy_rho_SF(theta, 0.0, n_env, m)
        b = v.reduced_dm_pure(psi, n_env + 1, [0] + list(range(1, m + 1)))
        assert np.allclose(a, b, atol=1e-12)
    mi_h = v.hazy_mi_curve(theta, 0.0, n_env)
    mi_p = v.mi_curve_pure(psi, n_env)
    assert np.allclose(mi_h, mi_p, atol=1e-9)


def test_floor_scale():
    vals = [v.task_psi((("t",), crt.maximally_mixed(4), (99, s)))[1]["R12"] for s in range(12)]
    nr = v.N_COUNTS * float(np.mean(vals))
    assert 20 < nr < 50, nr


def test_crossing():
    assert v.crossing([0, 1, 2], [0, 0.5, 1.0], 0.9) == 1.8
    assert v.crossing([0, 1, 2], [0, 0.2, 0.3], 0.9) is None


if __name__ == "__main__":
    test_cmaybe_closed_form()
    test_ghz()
    test_pure_symmetry()
    test_helstrom_pure()
    test_scrambled_overlap()
    test_scrambled_records_normalized()
    test_discord_known_states()
    w = test_holevo_le_trace_distance()
    print(f"max(chi - T) over random equiprobable pairs: {w:.2e}")
    test_hazy_reduces_to_pure()
    test_floor_scale()
    test_crossing()
    print("all v12 tests passed")
