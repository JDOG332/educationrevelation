"""
test_v12c.py: tests for phase 3 (run_v12c.py). Run:  python3 test_v12c.py

The pre-registered limit checks L1-L8 of responsive agreement RA, the
records-only no-go (rho_E of the c-maybe state equals that of its
common-cause twin), the engine (record laws, observers, spin chain), and
the plug-in / Miller-Madow estimators.
"""

from __future__ import annotations

import math
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import run_v12c as c  # noqa: E402

N = 8          # environment size for the tests (fast)
NQ = N + 1


def _pt(do, nat, fA, fB, kind, **kw):
    return c.exact_point(do, nat, NQ, fA, fB, kind, **kw)


def test_L1_perfect():
    do, nat = c.e1_ensembles(math.pi / 2, N)
    for kind in c.OBS:
        e = _pt(do, nat, [1], [2], kind)
        assert abs(e["RA"] - 1) < 1e-12 and abs(e["f_resp"] - 1) < 1e-12


def test_L2_common_cause():
    for phi in (math.pi / 4, math.pi / 3):
        do, nat = c.e2_ensembles(phi, 0.0, N)
        for kind in c.OBS:
            e = _pt(do, nat, [1, 2], [3, 4], kind)
            assert abs(e["RA"]) < 1e-12
    do, nat = c.e2_ensembles(math.pi / 3, 0.0, N)
    e = _pt(do, nat, [1], [2], "Local")
    assert e["I_ab_do"] > 0.1                     # strong agreement, no responsiveness
    for th in (math.pi / 8, math.pi / 4):
        do1, _ = c.e1_ensembles(th, N)
        tdo, tnat = c.twin_ensembles(th, N)
        for kind in c.OBS:
            assert abs(_pt(tdo, tnat, [1, 2], [3, 4], kind, do_ref=do1)["RA"]) < 1e-12


def test_L3_bound():
    for phi in (math.pi / 4, math.pi / 3):
        for th in (math.pi / 16, math.pi / 8, math.pi / 4):
            do, nat = c.e2_ensembles(phi, th, N)
            for kind in c.OBS:
                for fA, fB in (([1], [2]), ([1, 2], [3, 4])):
                    e = _pt(do, nat, fA, fB, kind, tyz=False)
                    assert e["RA"] <= min(e["J_A"], e["J_B"]) + 1e-12


def test_L4_cond_independent():
    for th in (math.pi / 8, math.pi / 4):
        do, nat = c.e1_ensembles(th, N)
        for kind in c.OBS:
            e = _pt(do, nat, [1, 2], [3, 4], kind)
            assert abs(e["I_ab_x"]) < 1e-12 and abs(e["RA"] - e["I_ab_do"]) < 1e-12


def test_L5_tyz_equivalence():
    for th in (math.pi / 8, math.pi / 4):          # c-maybe and the referee environment
        for do, nat in (c.e1_ensembles(th, N), c.e2_ensembles(math.pi / 3, th, N)):
            for kind in c.OBS:
                e = _pt(do, nat, [1], [2, 3], kind, tyz=False)
                assert abs(e["RA"] - e["Im_rec_S"]) < 1e-12
    at = c.e4_evolver(1.0, 0.0, n_env=6)           # spin chain with hopping, h_S = 0
    for t in (0.5, 1.5):
        do, nat = at(t)
        for kind in c.OBS:
            e = c.exact_point(do, nat, 7, [1], [6], kind, tyz=False)
            assert abs(e["RA"] - e["Im_rec_S"]) < 1e-10


def test_L6_synergy():
    P = np.zeros((2, 2, 2))
    for x in (0, 1):
        for k in (0, 1):
            P[x, k, k ^ x] += 0.25                    # r_A = K, r_B = K xor X
    q = c.info_xab(P)
    assert abs(q["RA"] + 1) < 1e-12


def test_L7_relabel():
    rng = np.random.default_rng(1)
    for _ in range(50):
        P = rng.dirichlet(np.ones(8)).reshape(2, 2, 2)
        base = c.info_xab(P)["RA"]
        for Q in (P[:, ::-1, :], P[:, :, ::-1], P[::-1, :, :]):
            assert abs(c.info_xab(Q)["RA"] - base) < 1e-12
        q = c.info_xab(P)
        assert abs(q["RA"] - (q["I_xa"] + q["I_xb"] - (c._H(P.sum((1, 2)), -1) + c._H(P.reshape(2, 4).sum(0), -1)
                                                     - c._H(P.ravel(), -1)))) < 1e-12


def test_L8_phase_intervention():
    """S in |+>, apply Z^X, c-maybe dynamics: pointer records ignore X."""
    th = math.pi / 4
    E0, E1 = c.prod([c.basis(0)] * N), c.prod([c.ket1(th)] * N)
    sgn = {0: 1.0, 1: -1.0}
    do = {x: [(1.0, (np.kron(c.basis(0), E0) + sgn[x] * np.kron(c.basis(1), E1)) / math.sqrt(2))] for x in (0, 1)}
    _, nat = c.e1_ensembles(th, N)
    do_ref, _ = c.e1_ensembles(th, N)
    for kind in c.OBS:
        e = _pt(do, nat, [1], [2], kind, do_ref=do_ref, tyz=False)
        assert abs(e["RA"]) < 1e-12 and e["I_ab_do"] > 0.01


def test_nogo_rhoE():
    for th in (math.pi / 8, math.pi / 4, math.pi / 2):
        _, nat = c.e1_ensembles(th, N)
        _, tn = c.twin_ensembles(th, N)
        assert c.rho_E_trace_distance(nat, tn, N) < 1e-12
    _, nat = c.e1_ensembles(math.pi / 4, N)
    _, other = c.e2_ensembles(math.pi / 3, math.pi / 4, N)
    assert c.rho_E_trace_distance(nat, other, N) > 0.1


def test_engine():
    for m in (1, 2, 3, 4):
        P0 = c.local_majority_pi0(m)
        assert np.all(np.diag(P0).real >= 0) and np.all(np.diag(P0).real <= 1)
        flipped = np.diag(P0).real[::-1]               # majority is antisymmetric under bit flip
        assert np.allclose(np.diag(P0).real + flipped, 1)
    # spin chain with J = 0, h_S = 0 is c-maybe with theta = g t
    at = c.e4_evolver(0.0, 0.0, n_env=5)
    do, nat = at(0.7)
    do1, nat1 = c.e1_ensembles(0.7, 5)
    for x in (0, 1):
        assert abs(abs(np.vdot(do[x][0][1], do1[x][0][1])) - 1) < 1e-10
    # record laws normalized, marginal over x of P_do equals P_nat for pointer-conserving dynamics
    do, nat = c.e1_ensembles(math.pi / 5, N)
    e = _pt(do, nat, [1, 2], [3], "Helstrom")
    Pdo, Pnat = np.array(e["Pdo"]), np.array(e["Pnat"])
    assert abs(Pdo.sum() - 1) < 1e-12 and np.allclose(Pdo, Pnat, atol=1e-12)


def test_estimators():
    rng = np.random.default_rng(4)
    P = np.full((2, 2, 2), 1 / 8)
    cnt = rng.multinomial(10_000, P.ravel(), size=3000).reshape(3000, 2, 2, 2)
    ra = c.info_xab(cnt)["RA"]
    # plug-in bias of RA under independence: about -1/(2 N ln 2)
    assert abs(ra.mean() + 1 / (2 * 10_000 * math.log(2))) < 2e-5
    ra_mm = c.info_xab(cnt, mm=True)["RA"]
    assert abs(ra_mm.mean()) < abs(ra.mean())


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
            print(f"  {name} ok")
    print("all v12c tests passed")
