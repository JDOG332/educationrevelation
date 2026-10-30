'use client';

import { useMemo, useState } from 'react';

/**
 * A live Ψ for two qubit states, computed exactly as the paper defines it
 * (v11.0, section 3; unchanged since v8.7), for the case d = 2:
 *   ρ = (I + r·σ)/2 with Bloch vector r, |r| ≤ 1
 *   F  = Tr(ρ₁ρ₂) + 2√(det ρ₁ det ρ₂)   (Uhlmann fidelity for qubits)
 *   I  = 1 − S(ρ)/log₂ 2 = 1 − S(ρ)      (S in bits, eigenvalues (1 ± |r|)/2)
 *   Gε = √((I₁+ε)(I₂+ε)) / (1+ε),  ε = 1e-8
 *   R₁₂ = F · Gε
 *   D̂ = D/(D + D_ref)                     (coincidences against accidentals)
 *   Γ  = C_eff · D̂
 *   Ψ  = R₁₂ · Γ
 * C_eff needs several reconstruction methods and a bootstrap to compute; here
 * it is a slider so the rest can be felt.
 */

const EPS = 1e-8;
const GOLD = '201,168,76';

function bloch(theta, phi, r) {
  const t = (theta * Math.PI) / 180;
  const p = (phi * Math.PI) / 180;
  return [r * Math.sin(t) * Math.cos(p), r * Math.sin(t) * Math.sin(p), r * Math.cos(t)];
}

function entropyBits(r) {
  const a = (1 + r) / 2, b = (1 - r) / 2;
  const h = (x) => (x > 0 ? -x * Math.log2(x) : 0);
  return h(a) + h(b);
}

function compute(s1, s2, ceff, coinc, acc) {
  const v1 = bloch(s1.theta, s1.phi, s1.r);
  const v2 = bloch(s2.theta, s2.phi, s2.r);
  const dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  const det1 = (1 - s1.r * s1.r) / 4;
  const det2 = (1 - s2.r * s2.r) / 4;
  const F = Math.min(1, (1 + dot) / 2 + 2 * Math.sqrt(Math.max(0, det1 * det2)));
  const I1 = 1 - entropyBits(s1.r);
  const I2 = 1 - entropyBits(s2.r);
  const gate = Math.sqrt((I1 + EPS) * (I2 + EPS)) / (1 + EPS);
  const R12 = F * gate;
  const Dhat = coinc + acc > 0 ? coinc / (coinc + acc) : 0;
  const gamma = ceff * Dhat;
  const psi = R12 * gamma;
  const seff = psi > 0 ? -Math.log2(psi) : Infinity;
  return { F, I1, I2, gate, R12, Dhat, gamma, psi, seff };
}

const PRESETS = [
  { name: 'Same pure state', s1: { theta: 40, phi: 20, r: 1 }, s2: { theta: 40, phi: 20, r: 1 }, ceff: 1, coinc: 1000, acc: 10 },
  { name: 'Two pure states, apart', s1: { theta: 40, phi: 20, r: 1 }, s2: { theta: 130, phi: 200, r: 1 }, ceff: 1, coinc: 1000, acc: 10 },
  { name: 'Two blanks (thermal)', s1: { theta: 40, phi: 20, r: 0.02 }, s2: { theta: 40, phi: 20, r: 0.02 }, ceff: 1, coinc: 1000, acc: 10 },
  { name: 'Good states, noisy detector', s1: { theta: 40, phi: 20, r: 0.95 }, s2: { theta: 45, phi: 25, r: 0.95 }, ceff: 0.9, coinc: 100, acc: 100 },
];

function Slider({ label, value, min, max, step, onChange, unit = '' }) {
  return (
    <label className="psi-slider">
      <span className="psi-slider__label">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      <span className="psi-slider__value">{typeof value === 'number' ? (Number.isInteger(step) ? value : value.toFixed(2)) : value}{unit}</span>
    </label>
  );
}

function fmt(x) {
  if (!Number.isFinite(x)) return '∞';
  if (x < 0.001) return x.toExponential(1);
  return x.toFixed(3);
}

export default function PsiCalculator() {
  const [s1, setS1] = useState(PRESETS[0].s1);
  const [s2, setS2] = useState(PRESETS[0].s2);
  const [ceff, setCeff] = useState(1);
  const [coinc, setCoinc] = useState(1000);
  const [acc, setAcc] = useState(10);

  const out = useMemo(() => compute(s1, s2, ceff, coinc, acc), [s1, s2, ceff, coinc, acc]);

  const load = (p) => { setS1(p.s1); setS2(p.s2); setCeff(p.ceff); setCoinc(p.coinc); setAcc(p.acc); };

  return (
    <div className="psi-calc">
      <style>{`
        .psi-calc { width: 100%; border: 1px solid rgba(${GOLD},0.28); border-radius: 0.5rem; padding: 1.25rem; background: rgba(${GOLD},0.04); }
        .psi-calc__presets { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .psi-calc__preset { font-family: var(--font-body); font-size: 0.9rem; color: rgba(${GOLD},0.9); background: transparent; border: 1px solid rgba(${GOLD},0.4); border-radius: 100px; padding: 0.35rem 0.8rem; cursor: pointer; }
        .psi-calc__preset:hover { border-color: rgba(${GOLD},0.85); }
        .psi-calc__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem; }
        .psi-calc__col h4 { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; color: rgba(${GOLD},0.95); margin: 0 0 0.5rem; }
        .psi-slider { display: grid; grid-template-columns: 5.5rem 1fr 4rem; align-items: center; gap: 0.5rem; margin: 0.35rem 0; font-family: var(--font-body); font-size: 0.95rem; color: rgba(232,232,240,0.9); }
        .psi-slider input { width: 100%; accent-color: #C9A84C; }
        .psi-slider__value { font-variant-numeric: tabular-nums; text-align: right; color: rgba(${GOLD},0.95); }
        .psi-calc__out { margin-top: 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr)); gap: 0.6rem; }
        .psi-calc__cell { border: 1px solid rgba(${GOLD},0.22); border-radius: 0.4rem; padding: 0.6rem 0.7rem; }
        .psi-calc__cell b { display: block; font-family: var(--font-display); font-weight: 700; font-size: 0.95rem; color: rgba(${GOLD},0.95); }
        .psi-calc__cell span { font-family: var(--font-body); font-variant-numeric: tabular-nums; font-size: 1.15rem; color: rgba(232,232,240,0.95); }
        .psi-calc__cell small { display: block; font-size: 0.8rem; color: rgba(232,232,240,0.65); margin-top: 0.15rem; }
        .psi-calc__psi { grid-column: 1 / -1; text-align: center; padding: 1rem; border-color: rgba(${GOLD},0.6); background: rgba(${GOLD},0.06); }
        .psi-calc__psi span { font-family: var(--font-display); font-size: clamp(2rem, 6vmin, 3rem); color: rgba(232,213,160,1); }
        .psi-calc__psi b { font-size: 1.1rem; }
        @media (max-width: 640px) { .psi-calc__grid { grid-template-columns: 1fr; } .psi-slider { grid-template-columns: 4.5rem 1fr 3.5rem; font-size: 0.9rem; } }
      `}</style>

      <div className="psi-calc__presets" role="group" aria-label="Presets">
        {PRESETS.map((p) => (
          <button key={p.name} type="button" className="psi-calc__preset" onClick={() => load(p)}>{p.name}</button>
        ))}
      </div>

      <div className="psi-calc__grid">
        <div className="psi-calc__col">
          <h4>Picture 1 (ρ₁)</h4>
          <Slider label="Tilt θ" value={s1.theta} min={0} max={180} step={1} unit="°" onChange={(v) => setS1({ ...s1, theta: v })} />
          <Slider label="Turn φ" value={s1.phi} min={0} max={360} step={1} unit="°" onChange={(v) => setS1({ ...s1, phi: v })} />
          <Slider label="Purity |r|" value={s1.r} min={0} max={1} step={0.01} onChange={(v) => setS1({ ...s1, r: v })} />
        </div>
        <div className="psi-calc__col">
          <h4>Picture 2 (ρ₂)</h4>
          <Slider label="Tilt θ" value={s2.theta} min={0} max={180} step={1} unit="°" onChange={(v) => setS2({ ...s2, theta: v })} />
          <Slider label="Turn φ" value={s2.phi} min={0} max={360} step={1} unit="°" onChange={(v) => setS2({ ...s2, phi: v })} />
          <Slider label="Purity |r|" value={s2.r} min={0} max={1} step={0.01} onChange={(v) => setS2({ ...s2, r: v })} />
        </div>
        <div className="psi-calc__col">
          <h4>Methods (C_eff)</h4>
          <Slider label="Agreement" value={ceff} min={0.01} max={1} step={0.01} onChange={setCeff} />
        </div>
        <div className="psi-calc__col">
          <h4>Detector (D̂)</h4>
          <Slider label="Coinc./s" value={coinc} min={0} max={2000} step={10} onChange={setCoinc} />
          <Slider label="Accid./s" value={acc} min={0} max={2000} step={10} onChange={setAcc} />
        </div>
      </div>

      <div className="psi-calc__out" aria-live="polite">
        <div className="psi-calc__cell"><b>F</b><span>{fmt(out.F)}</span><small>fidelity</small></div>
        <div className="psi-calc__cell"><b>I₁ · I₂</b><span>{fmt(out.I1)} · {fmt(out.I2)}</span><small>informativeness</small></div>
        <div className="psi-calc__cell"><b>G_ε</b><span>{fmt(out.gate)}</span><small>ignorance gate</small></div>
        <div className="psi-calc__cell"><b>R₁₂</b><span>{fmt(out.R12)}</span><small>F × G_ε</small></div>
        <div className="psi-calc__cell"><b>D̂</b><span>{fmt(out.Dhat)}</span><small>D/(D+D_ref)</small></div>
        <div className="psi-calc__cell"><b>Γ</b><span>{fmt(out.gamma)}</span><small>C_eff × D̂</small></div>
        <div className="psi-calc__cell psi-calc__psi"><b>Ψ = R₁₂ × Γ</b><span>{fmt(out.psi)}</span><small>S_eff = {fmt(out.seff)} bits</small></div>
      </div>
    </div>
  );
}
