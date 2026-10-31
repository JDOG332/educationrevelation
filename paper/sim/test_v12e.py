"""
test_v12e.py: unit tests for phase 5 (run_v12e.py), stop rule S1.
Run:  python3 test_v12e.py

Lemma P and Lemma BC on small chains, co-information identities, the
fragment-level RA_q on the product c-maybe state, the TYZ direction scan,
the evolution routine against a dense eigendecomposition, the
hypergeometric form of the permutation test, and the plug-in estimator bias
(as in test_v12c).
"""

from __future__ import annotations

import math
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import run_v12c as c3  # noqa: E402
import run_v12e as e  # noqa: E402

T = (0.5, 1.5, 3.0)


def _cell_points(p, times=T, dirs=None):
    return e.run_cell((p, times, dirs is not None, 20, False))["points"] if dirs is None else \
        e.run_cell((p, times, True, 20, False))["points"]


def test_lemma_P():
    """Pointer conserved (h = 0): cq-states and record laws identical."""
    for V in ("V0", "VC", "VD", "VE", "VG"):
        p = e.cell_params(V, 1.0, 0.0, "main", 6)
        for r in _cell_points(p):
            assert r["cq_gap"] < e.TAU_LAW
            assert abs(r["RA_q"] - r["TYZ_Pi"]) < e.TAU_INFO
            for k in e.OBSERVERS:
                o = r["obs"][k]
                assert o["law_gap"] < e.TAU_LAW and abs(o["RA_rec"] - o["Im_rec"]) < e.TAU_INFO


def test_lemma_BC():
    """R and C hold (J = 0, V0 or VF, h > 0): record laws identical, both observers."""
    for V in ("V0", "VF"):
        p = e.cell_params(V, 0.0, 0.5, "main", 6)
        for r in _cell_points(p):
            for k in e.OBSERVERS:
                o = r["obs"][k]
                assert o["law_gap"] < e.TAU_LAW and abs(o["RA_rec"] - o["Im_rec"]) < e.TAU_INFO
    p = e.cell_params("V0", 0.0, 0.5, "held", 6)          # inhomogeneous g keeps R and C
    for r in _cell_points(p):
        assert r["obs"]["Local"]["law_gap"] < e.TAU_LAW


def test_coi_identities():
    rng = np.random.default_rng(2)
    for _ in range(10):
        blocks = []
        for q in (0.3, 0.7):
            A = rng.normal(size=(4, 4)) + 1j * rng.normal(size=(4, 4))
            rho = A @ A.conj().T
            blocks.append(q * rho / np.trace(rho))
        v = e.coi_blocks(blocks, 2, 2)
        # I(K:A) + I(K:B) - I(K:AB) form
        mix = sum(blocks)
        def S(r):
            return float(e.S_bits(r))
        rA = [e._ptrace_B(B, 2, 2) for B in blocks]
        rB = [e._ptrace_A(B, 2, 2) for B in blocks]
        HK = -sum(q * math.log2(q) for q in (0.3, 0.7))
        def I_K(parts):
            m = sum(parts)
            return S(m) - sum(np.real(np.trace(P)) * S(P / np.real(np.trace(P))) for P in parts)
        alt = I_K(rA) + I_K(rB) - I_K(blocks)
        assert abs(v - alt) < 1e-10
        assert HK > 0 and S(mix) >= 0


def test_product_cmaybe():
    """Product c-maybe: RA_q = I(F_A:F_B) of the x-average (I(F_A:F_B|X) = 0);
    theta = pi/2 gives RA_q = TYZ_Pi = 1."""
    n_env = 8
    for th in (math.pi / 8, math.pi / 4, math.pi / 2):
        do, _ = c3.e1_ensembles(th, n_env)
        psi0, psi1 = do[0][0][1], do[1][0][1]
        rows = e.process_time(psi0, psi1, n_env + 1, e.frag_pairs(n_env))
        for r in rows:
            assert abs(r["RA_q"] - r["I_FF_dobar"]) < 1e-9
            assert abs(r["RA_q"] - r["TYZ_Pi"]) < 1e-9           # pointer conserved
            if th == math.pi / 2:
                assert abs(r["RA_q"] - 1) < 1e-9


def test_tyz_dirs():
    """Direction scan: +z equals TYZ_Pi; a sigma_x measurement of the c-maybe
    state with theta = pi/2 gives TYZ's complementary-observable value 0."""
    n_env = 6
    do, _ = c3.e1_ensembles(math.pi / 2, n_env)
    rows = e.process_time(do[0][0][1], do[1][0][1], n_env + 1, e.frag_pairs(n_env, ms=(1,)),
                          dirs=np.array([[0, 0, 1.0], [1.0, 0, 0]]))
    for r in rows:
        assert abs(r["TYZ_z_check"] - r["TYZ_Pi"]) < 1e-12
    n = n_env + 1
    psin = (do[0][0][1] + do[1][0][1]) / math.sqrt(2)
    Rn = e.v1.reduced_dm_pure(psin, n, [0, 1, 2])
    vals = e.tyz_dirs(Rn, 4, 2, 2, np.array([[1.0, 0, 0]]))
    assert abs(vals[0]) < 1e-10


def test_evolution():
    p = e.cell_params("VA", 1.0, 0.5, "main", 8)
    H = e.build_H(p)
    w, V = np.linalg.eigh(H.toarray())
    init = e.init_states(p)
    ev = e.evolve(H, init[1], 3.0, 12)
    c0 = V.conj().T @ init[1]
    for k in range(12):
        t = 0.25 * (k + 1)
        assert np.max(np.abs(V @ (np.exp(-1j * w * t) * c0) - ev[k])) < 1e-11


def test_hamiltonian_reduces_to_phase3():
    p = e.cell_params("V0", 1.0, 0.25, "main", 6)
    H5 = e.build_H(p).toarray()
    H3 = c3.e4_hamiltonian(1.0, 0.25, n_env=6)
    assert np.max(np.abs(H5 - H3)) < 1e-14


def test_perm_hypergeometric():
    """Table draws with fixed margins = shuffling X across shots (same law)."""
    rng = np.random.default_rng(5)
    P = np.full((2, 2, 2), 1 / 8)
    P[:, 0, 0] += 0.05
    P[:, 1, 1] -= 0.05
    cdo = rng.multinomial(2000, P.ravel()).reshape(2, 2, 2).astype(float)
    x = np.repeat([0, 0, 0, 0, 1, 1, 1, 1], cdo.ravel().astype(int))
    ab = np.repeat([0, 1, 2, 3, 0, 1, 2, 3], cdo.ravel().astype(int))
    ra_shuf = []
    for _ in range(1500):
        xs = rng.permutation(x)
        tab = np.zeros(8)
        np.add.at(tab, xs * 4 + ab, 1)
        ra_shuf.append(c3.info_xab(tab.reshape(2, 2, 2))["RA"])
    colors = cdo.sum(0).ravel().astype(np.int64)
    row0 = rng.multivariate_hypergeometric(colors, int(cdo[0].sum()), size=1500)
    tab = np.stack([row0, colors[None] - row0], 1).reshape(-1, 2, 2, 2).astype(float)
    ra_hyp = c3.info_xab(tab)["RA"]
    assert abs(np.mean(ra_shuf) - np.mean(ra_hyp)) < 3e-5
    assert abs(np.std(ra_shuf) - np.std(ra_hyp)) < 0.15 * np.std(ra_shuf)
    p, _ = e.perm_test_X(cdo, rng, 500)
    assert 0 < p <= 1


def test_estimator_bias():
    rng = np.random.default_rng(4)
    P = np.full((2, 2, 2), 1 / 8)
    cnt = rng.multinomial(10_000, P.ravel(), size=3000).reshape(3000, 2, 2, 2)
    ra = c3.info_xab(cnt)["RA"]
    assert abs(ra.mean() + 1 / (2 * 10_000 * math.log(2))) < 2e-5


def test_families():
    assert e.family("V0", 0.0, 0.0) == "F_P"
    assert e.family("VF", 0.0, 0.5) == "F_BC"
    assert e.family("VE", 0.0, 0.5) == "F_C"
    assert e.family("VG", 0.0, 0.5) == "F_R"
    assert e.family("VA", 0.0, 0.5) == "F_RC" and e.family("V0", 1.0, 0.5) == "F_RC"
    fam = {}
    for p in e.main_cells():
        f = e.family(p["variant"], p["J"], p["h"])
        fam[f] = fam.get(f, 0) + 1
    assert fam == {"F_P": 24, "F_BC": 6, "F_C": 9, "F_R": 3, "F_RC": 78}
    assert len(e.held_cells()) == 42


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
            print(f"  {name} ok", flush=True)
    print("all v12e tests passed")
