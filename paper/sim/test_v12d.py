"""
test_v12d.py: tests for phase 4 (run_v12d.py). Run:  python3 test_v12d.py

The pre-registered limit checks L1-L9 (docstring of run_v12d.py, Section 2),
plus engine checks: the Schur-Weyl entropy against dense matrices, the
consensus law against a brute-force partial trace, the fragment sets, the
stable D_ref, and the extended chain Hamiltonian against run_v12c.
"""

from __future__ import annotations

import itertools
import math
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import run_v12 as v1  # noqa: E402
import run_v12c as v3  # noqa: E402
import run_v12d as d  # noqa: E402

N = 8


def _m2_state(J, hS, g, V, t, n=N):
    nt = int(round(t / 0.25))
    Vs = d.m2_evolve(n, J, hS, g, V, t, nt)
    return Vs[-1][:, 0], Vs[-1][:, 1]


def test_L1_cmaybe_identity():
    rng = np.random.default_rng(0)
    for _ in range(3):
        ths = rng.uniform(0.1, 1.3, size=N)
        rec = d.process_state(d.m1_psi(ths), N)
        assert rec["t1"]["maxdev_ref"] < 1e-10, rec["t1"]["maxdev_ref"]


def test_L2_cnot():
    psi = d.m1_psi(np.full(N, math.pi / 2))
    rec = d.process_state(psi, N)
    assert rec["t1"]["max_abs_d"] < 1e-12
    st = d.State(psi, N)
    for m in range(1, N):
        for F in itertools.combinations(range(1, N + 1), m):
            chi, I = st.info(F)
            assert abs((1 - I / (2 * st.SS)) - 0.5) < 1e-10
    chi, I = st.info(list(range(1, N + 1)))
    assert abs(I - 2 * st.SS) < 1e-10


def _states():
    v0, v1_ = _m2_state(1.0, 0.25, "inh", "VC", 1.75)
    out = [(v0 + v1_) / math.sqrt(2)]
    E0, E1 = d.m3_branches(math.pi / 4, N, 3, np.random.default_rng(5))
    out.append(np.concatenate([E0, E1]) / math.sqrt(2))
    out.append(d.m4_run(N, math.pi / 4, 0.4, math.pi / 8, d.PLUS))
    return out


def test_L3_antisymmetry():
    rng = np.random.default_rng(1)
    for psi in _states():
        st = d.State(psi, N)
        for _ in range(20):
            m = int(rng.integers(1, N))
            F = sorted(int(k) for k in rng.choice(range(1, N + 1), size=m, replace=False))
            Fb = [k for k in range(1, N + 1) if k not in F]
            assert abs(st.info(F)[1] + st.info(Fb)[1] - 2 * st.SS) < 1e-10


def test_L4_ordering():
    for psi in _states():
        st = d.State(psi, N)
        prev = -1.0
        for m in range(1, N + 1):
            F = list(range(1, m + 1))
            chi, I = st.info(F)
            assert chi <= min(I, st.HSpi) + 1e-10
            assert chi >= prev - 1e-10
            prev = chi
            if m <= 6:
                assert d.accessible_J(st, F) <= chi + 1e-10
        assert abs(st.info(list(range(1, N + 1)))[0] - st.SS) < 1e-10


def test_L5_chernoff():
    a = np.array([1, 0], complex)
    b = np.array([math.cos(0.7), math.sin(0.7)], complex)
    ra, rb = np.outer(a, a.conj()), np.outer(b, b.conj())
    assert abs(d.qcb(ra, rb) + math.log(abs(np.vdot(a, b)) ** 2)) < 1e-9
    assert abs(d.qcb(ra, ra)) < 1e-9
    assert d.qcb(ra, np.diag([0.0, 1.0]).astype(complex)) == d.XI_MAX
    for h in (0.1, 0.3, 0.6):
        s0 = v1.hazy_env(h)
        R = v1.rot(math.pi / 5)
        s1 = R @ s0 @ R.conj().T
        w0, V0 = np.linalg.eigh(s0)
        w1, V1 = np.linalg.eigh(s1)
        cs = np.arange(1e-4, 1, 1e-4)
        vals = [np.real(np.trace((V0 * w0 ** c) @ V0.conj().T @ (V1 * w1 ** (1 - c)) @ V1.conj().T)) for c in cs]
        assert abs(d.qcb(s0, s1) + math.log(min(vals))) < 1e-6


def test_L6_selfmeasurement():
    rec = d.task_m1(("a", "pi/4", N, 0.5))[0]
    assert rec["T6"]["L6_maxdev"] < 1e-10
    assert abs(rec["T6"]["D_whole"] - 1) < 1e-10
    for (J, V) in ((1.0, "V0"), (2.0, "VB")):
        v0, v1_ = _m2_state(J, 0.0, "hom", V, 2.0)
        sm, _ = d.selfmeas((v0 + v1_) / math.sqrt(2), (v0 - v1_) / math.sqrt(2), N + 1)
        assert sm["maxD_inE"] < 1e-10
        assert abs(sm["D_whole"] - 1) < 1e-10


def test_L7_reductions():
    for t in (0.5, 1.25, 2.75):
        v0, v1_ = _m2_state(0.0, 0.0, "inh", "V0", t)
        rec = d.process_state((v0 + v1_) / math.sqrt(2), N)
        assert rec["t1"]["maxdev_ref"] < 1e-9
    psi = d.m4_run(N, math.pi / 8, 0.0, 0.0, d.PLUS)
    ref = d.m1_psi(np.full(N, math.pi / 8))
    assert np.max(np.abs(psi - ref)) < 1e-10
    H = d.m2_hamiltonian(N, 1.0, 0.25, np.ones(N)).toarray()
    assert np.max(np.abs(H - v3.e4_hamiltonian(1.0, 0.25, n_env=N))) < 1e-12


def test_L8_evolution():
    H = d.m2_hamiltonian(N, 1.0, 0.25, d.m2_gk(N, "inh"), **d.M2_V["VC"]).toarray()
    w, V = np.linalg.eigh(H)
    Vs = d.m2_evolve(N, 1.0, 0.25, "inh", "VC", 4.0, 16)
    init = np.zeros(2 ** (N + 1), complex); init[0] = 1
    c0 = V.conj().T @ init
    err = 0.0
    for i, t in enumerate(np.linspace(0, 4.0, 17)):
        err = max(err, np.max(np.abs(V @ (np.exp(-1j * w * t) * c0) - Vs[i][:, 0])))
    assert err < 1e-10, err


def test_L9_consensus_product():
    st = d.State(d.m1_psi(np.full(N, math.pi / 4)), N)
    for kind in ("Helstrom", "Local"):
        blocks = [[1, 2], [3, 4], [5, 6]]
        P = d.consensus_law(st, blocks, kind)
        assert abs(d.mi_joint(P) - d.mi_joint(d.ci_law(P))) < 1e-10


def test_consensus_bruteforce():
    psi = _states()[0]
    st = d.State(psi, N)
    blocks = [[1, 2], [3]]
    for kind in ("Helstrom", "Local"):
        P = d.consensus_law(st, blocks, kind)
        Pis = []
        for F in blocks:
            if kind == "Local":
                Pis.append(v3.local_majority_pi0(len(F)))
            else:
                r0, r1 = st.cond(F)
                Pis.append(d.helstrom_tiefix(r0, r1, st.p[0], st.p[1])[0])
        Q = np.zeros((2, 2, 2))
        for s in (0, 1):
            rho = sum(np.outer(M[:, j], M[:, j].conj()) for M in [st.mats([1, 2, 3])[s]] for j in range(M.shape[1]))
            for a in (0, 1):
                A = Pis[0] if a == 0 else np.eye(4) - Pis[0]
                for b in (0, 1):
                    B = Pis[1] if b == 0 else np.eye(2) - Pis[1]
                    Q[s, a, b] = st.p[s] * np.real(np.trace(np.kron(A, B) @ rho))
        assert np.max(np.abs(P - Q / Q.sum())) < 1e-10


def test_schur_weyl_entropy():
    for h in (0.1, 0.6):
        s0 = v1.hazy_env(h)
        R = v1.rot(0.6)
        s1 = R @ s0 @ R.conj().T
        for m in range(1, 7):
            dense = 0.5 * v1.product_op(s0, m) + 0.5 * v1.product_op(s1, m)
            assert abs(d.ent_mix_tensor_power(s0, s1, 0.5, m) - d.ent_herm(dense)) < 1e-9


def test_frag_sets_and_dref():
    fs = d.frag_sets(12)
    assert set(fs) == set(range(1, 12))
    assert len(fs[1]) == 12 and len(fs[2]) == 66
    for m in range(3, 10):
        assert tuple(range(1, m + 1)) in fs[m] and len(fs[m]) >= 128
    for x in (0.1, 1.0, 5.0, 9.0):
        for xE in (12.0, 30.0):
            direct = 1 - v1.h2((1 + math.exp(-x / 2)) / 2) / v1.h2((1 + math.exp(-xE / 2)) / 2)
            assert abs(float(d.d_ref(x, xE)) - direct) < 1e-12


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
            print(f"  {name} ok")
    print("all v12d tests passed")
