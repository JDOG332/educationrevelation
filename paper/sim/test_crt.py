"""
test_crt.py: unit tests for crt.py.  Run:  python3 test_crt.py

1. Agreement with the website calculator app/theory/PsiCalculator.js on
   single-qubit (d = 2) inputs. The JS `compute` function is extracted from the
   source file and executed with node (if node is on PATH); otherwise the
   test falls back to a line-by-line Python transcription of it.
2. Exact informativeness of the Werner states quoted in Appendix B.1.
3. Smolin-Gambetta-Smith projection on the worked example of their paper.
4. Linear inversion and R rho R MLE recover the state from exact
   probabilities.
5. Gate floor, gate bounds, JSD bounds (Lin 1991), C_eff bounds.
"""

from __future__ import annotations

import json
import math
import os
import re
import shutil
import subprocess
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import crt  # noqa: E402

REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
JS_PATH = os.path.join(REPO, "app", "theory", "PsiCalculator.js")


def _cases():
    rng = np.random.default_rng(12345)
    cases = []
    for _ in range(200):
        s1 = {"theta": float(rng.uniform(0, 180)), "phi": float(rng.uniform(0, 360)), "r": float(rng.uniform(0, 1))}
        s2 = {"theta": float(rng.uniform(0, 180)), "phi": float(rng.uniform(0, 360)), "r": float(rng.uniform(0, 1))}
        cases.append({"s1": s1, "s2": s2, "ceff": float(rng.uniform(0.01, 1)),
                      "coinc": float(rng.integers(0, 2000)), "acc": float(rng.integers(0, 2000))})
    # edge cases: identical pure, both maximally mixed, orthogonal pure, presets
    cases += [
        {"s1": {"theta": 40, "phi": 20, "r": 1}, "s2": {"theta": 40, "phi": 20, "r": 1}, "ceff": 1, "coinc": 1000, "acc": 10},
        {"s1": {"theta": 40, "phi": 20, "r": 1}, "s2": {"theta": 130, "phi": 200, "r": 1}, "ceff": 1, "coinc": 1000, "acc": 10},
        {"s1": {"theta": 40, "phi": 20, "r": 0.02}, "s2": {"theta": 40, "phi": 20, "r": 0.02}, "ceff": 1, "coinc": 1000, "acc": 10},
        {"s1": {"theta": 40, "phi": 20, "r": 0.95}, "s2": {"theta": 45, "phi": 25, "r": 0.95}, "ceff": 0.9, "coinc": 100, "acc": 100},
        {"s1": {"theta": 0, "phi": 0, "r": 0}, "s2": {"theta": 0, "phi": 0, "r": 0}, "ceff": 1, "coinc": 5, "acc": 5},
        {"s1": {"theta": 0, "phi": 0, "r": 1}, "s2": {"theta": 180, "phi": 0, "r": 1}, "ceff": 1, "coinc": 5, "acc": 5},
    ]
    return cases


def js_reference(cases):
    """Run the site's compute() under node. Returns list of dicts or None."""
    node = shutil.which("node")
    if node is None or not os.path.exists(JS_PATH):
        return None
    src = open(JS_PATH).read()
    start = src.index("const EPS")
    end = src.index("const PRESETS")
    body = src[start:end]
    body = re.sub(r"^const GOLD.*$", "", body, flags=re.M)
    prog = body + "\nconst cases = JSON.parse(require('fs').readFileSync(0, 'utf8'));\n" \
        "console.log(JSON.stringify(cases.map(c => compute(c.s1, c.s2, c.ceff, c.coinc, c.acc))));\n"
    out = subprocess.run([node, "-e", prog], input=json.dumps(cases), capture_output=True, text=True)
    if out.returncode != 0:
        raise RuntimeError("node failed: " + out.stderr[-2000:])
    return json.loads(out.stdout)


def python_transcription(c):
    """Line-by-line Python transcription of PsiCalculator.js compute()."""
    def bloch(s):
        t, p = math.radians(s["theta"]), math.radians(s["phi"])
        return [s["r"] * math.sin(t) * math.cos(p), s["r"] * math.sin(t) * math.sin(p), s["r"] * math.cos(t)]

    def hb(r):
        a, b = (1 + r) / 2, (1 - r) / 2
        f = lambda x: -x * math.log2(x) if x > 0 else 0.0  # noqa: E731
        return f(a) + f(b)
    v1, v2 = bloch(c["s1"]), bloch(c["s2"])
    dot = sum(x * y for x, y in zip(v1, v2))
    d1, d2 = (1 - c["s1"]["r"] ** 2) / 4, (1 - c["s2"]["r"] ** 2) / 4
    F = min(1, (1 + dot) / 2 + 2 * math.sqrt(max(0, d1 * d2)))
    I1, I2 = 1 - hb(c["s1"]["r"]), 1 - hb(c["s2"]["r"])
    g = math.sqrt((I1 + 1e-8) * (I2 + 1e-8)) / (1 + 1e-8)
    Dh = c["coinc"] / (c["coinc"] + c["acc"]) if c["coinc"] + c["acc"] > 0 else 0
    psi = F * g * c["ceff"] * Dh
    return {"F": F, "I1": I1, "I2": I2, "gate": g, "R12": F * g, "Dhat": Dh, "gamma": c["ceff"] * Dh, "psi": psi}


def crt_d2(c):
    """The same quantities from crt.py's density-matrix code, d = 2."""
    def bloch(s):
        t, p = math.radians(s["theta"]), math.radians(s["phi"])
        return [s["r"] * math.sin(t) * math.cos(p), s["r"] * math.sin(t) * math.sin(p), s["r"] * math.cos(t)]
    r1, r2 = crt.qubit_state(bloch(c["s1"])), crt.qubit_state(bloch(c["s2"]))
    F = crt.fidelity(r1, r2)
    I1, I2 = crt.informativeness(r1, 2), crt.informativeness(r2, 2)
    g = crt.gate(I1, I2, 1e-8)
    Dh = crt.d_hat(c["coinc"], c["acc"])
    return {"F": F, "I1": I1, "I2": I2, "gate": g, "R12": F * g, "Dhat": Dh,
            "gamma": c["ceff"] * Dh, "psi": F * g * c["ceff"] * Dh}


def test_psicalculator_agreement():
    cases = _cases()
    ref = js_reference(cases)
    source = "node (PsiCalculator.js executed)"
    if ref is None:
        ref = [python_transcription(c) for c in cases]
        source = "python transcription (node not found)"
    worst = {}
    for c, rj in zip(cases, ref):
        rp = crt_d2(c)
        for k in ("F", "I1", "I2", "gate", "R12", "Dhat", "gamma", "psi"):
            worst[k] = max(worst.get(k, 0.0), abs(rp[k] - rj[k]))
    # F near orthogonal pure states: the closed form and sqrtm differ by
    # round-off of order sqrt(machine eps) at most.
    tol = {"F": 1e-7, "R12": 1e-7, "psi": 1e-7}
    for k, v in worst.items():
        assert v < tol.get(k, 1e-12), (k, v)
    return source, worst


def test_werner_informativeness():
    i8 = crt.informativeness(crt.werner(0.8))
    i2 = crt.informativeness(crt.werner(0.2))
    assert abs(i8 - 0.576) < 5e-4 and abs(i2 - 0.039) < 5e-4, (i8, i2)
    assert abs(crt.purity(crt.werner(0.8)) - 0.73) < 1e-12
    assert abs(crt.purity(crt.werner(0.2)) - 0.28) < 1e-12
    return i8, i2


def test_sgs_example():
    # Smolin, Gambetta, Smith (2012), worked example:
    # mu = (3/5, 1/2, 7/20, 1/10, -11/20) -> lambda = (9/20, 7/20, 1/5, 0, 0)
    mu = np.diag([3 / 5, 1 / 2, 7 / 20, 1 / 10, -11 / 20]).astype(complex)
    lam = np.sort(np.linalg.eigvalsh(crt.project_psd_sgs(mu)))[::-1]
    assert np.allclose(lam, [9 / 20, 7 / 20, 1 / 5, 0, 0], atol=1e-12), lam


def test_reconstruction_exact():
    rng = np.random.default_rng(7)
    for rho in (crt.werner(0.6), crt.random_full_rank_state(rng), crt.separable_classical()):
        p = np.clip(crt.born_probs(rho), 0, None)
        counts = p * 1e12                     # effectively infinite data
        li = crt.linear_inversion(counts)
        assert np.allclose(li, rho, atol=1e-9)
        assert np.allclose(crt.li_psd(counts), rho, atol=1e-9)
    rho = crt.werner(0.6)
    p = crt.born_probs(rho)
    m, _, conv = crt.mle_rrr(p[None] * 1e12)
    assert conv.all() and np.allclose(m[0], rho, atol=1e-6)


def test_bounds():
    eps = 1e-8
    assert abs(crt.gate(0, 0, eps) - eps / (1 + eps)) < 1e-20
    assert abs(crt.gate(1, 1, eps) - 1.0) < 1e-15
    rng = np.random.default_rng(3)
    for _ in range(200):
        n = rng.integers(2, 6)
        P = rng.dirichlet(np.ones(16), size=n)
        w = rng.dirichlet(np.ones(n))
        j = crt.jsd_weighted(P, w)
        mix = w @ P
        direct = crt.shannon_bits(mix) - sum(wi * crt.shannon_bits(pi) for wi, pi in zip(w, P))
        assert abs(j - direct) < 1e-12
        assert 0 <= j <= crt.shannon_bits(w) + 1e-12
    # fidelity symmetric and in [0, 1]
    a, b = crt.random_full_rank_state(rng), crt.random_full_rank_state(rng)
    assert abs(crt.fidelity(a, b) - crt.fidelity(b, a)) < 1e-10
    assert 0 <= crt.fidelity(a, b) <= 1
    assert abs(crt.fidelity(a, a) - 1) < 1e-10


def test_povm():
    assert np.allclose(crt.POVM_E.sum(axis=0), np.eye(4))
    # product SIC: Tr(E_i E_j) = (1 + 3 delta)/48 per qubit pair -> check qubit level
    E1, _ = crt.qubit_sic()
    G = np.real(np.einsum("aij,bji->ab", E1, E1))
    assert np.allclose(G, (np.eye(4) * 2 + 1) / 12)


if __name__ == "__main__":
    src, worst = test_psicalculator_agreement()
    print(f"PsiCalculator.js agreement ({src}), max abs differences over {len(_cases())} cases:")
    for k, v in worst.items():
        print(f"  {k:6s} {v:.2e}")
    i8, i2 = test_werner_informativeness()
    print(f"I(Werner 0.8) = {i8:.6f}, I(Werner 0.2) = {i2:.6f}")
    test_sgs_example()
    test_reconstruction_exact()
    test_bounds()
    test_povm()
    print("all tests passed")
