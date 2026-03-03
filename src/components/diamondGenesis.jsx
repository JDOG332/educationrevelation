/**
 * DIAMOND GENESIS — Pressurized crystallization at microscopic scale
 *
 * The inverse of the universe page:
 *   Universe = expansion outward (PHI⁺ⁿ)
 *   Diamond  = compression inward (PHI⁻ⁿ)
 *
 * Carbon atoms in chaos → pressure compresses → diamond lattice snaps →
 * light refracts through the crystal.
 *
 * Phases (PHI-timed):
 *   A: CHAOS         0 → 2.618s     Brownian motion, scattered
 *   B: COMPRESSION   2.618 → 5.854s Pressure builds, atoms rush inward
 *   C: CRYSTALLIZE   5.854 → 7.472s Lattice snaps, bonds form
 *   D: REFRACTION    7.472 → 8.854s Prismatic light, diamond breathes
 */

import { useRef, useEffect } from "react";
import { PHI, PHI_INV } from "../data.js";

const PHI_2 = PHI * PHI;
const PHI_3 = PHI * PHI * PHI;
const PHI_NEG2 = PHI_INV * PHI_INV;
const PHI_NEG3 = PHI_INV * PHI_INV * PHI_INV;

// Phase boundaries (seconds)
const A_END = PHI_2;                // 2.618
const B_END = A_END + PHI_2;        // 5.236
const C_END = B_END + PHI;          // 6.854
const D_END = C_END + PHI;          // 8.472
const SIGNAL_TIME = C_END + 0.618;  // 7.472 — fire onComplete

// Golden angle in radians
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.508°

export default function DiamondGenesisCanvas({ onComplete }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);
    const ATOM_COUNT = isMobile ? 60 : 120;

    let W, H, CX, CY, BASE_R;

    function resize() {
      W = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H / 2;
      BASE_R = Math.min(W, H) * 0.30;
    }
    resize();
    window.addEventListener("resize", resize);

    // ═══════════════════════════════════════════════════════
    // BUILD LATTICE TARGETS — concentric hexagonal rings
    // ═══════════════════════════════════════════════════════

    const targets = [];

    // Core atom
    targets.push({ x: 0, y: 0, shell: 0 });

    // Ring 1: 6 atoms at PHI⁻³
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + GOLDEN_ANGLE;
      targets.push({ x: Math.cos(a) * PHI_NEG3, y: Math.sin(a) * PHI_NEG3, shell: 1 });
    }

    // Ring 2: 12 atoms at PHI⁻²
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + GOLDEN_ANGLE * 2;
      targets.push({ x: Math.cos(a) * PHI_NEG2, y: Math.sin(a) * PHI_NEG2, shell: 2 });
    }

    // Ring 3: 18 atoms at PHI⁻¹
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + GOLDEN_ANGLE * 3;
      targets.push({ x: Math.cos(a) * PHI_INV, y: Math.sin(a) * PHI_INV, shell: 3 });
    }

    // Ring 4: 24 atoms at 1.0
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + GOLDEN_ANGLE * 4;
      targets.push({ x: Math.cos(a), y: Math.sin(a), shell: 4 });
    }

    // Ring 5: 30 atoms at PHI
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + GOLDEN_ANGLE * 5;
      targets.push({ x: Math.cos(a) * PHI, y: Math.sin(a) * PHI, shell: 5 });
    }

    // Fill remaining with outer ring
    while (targets.length < ATOM_COUNT) {
      const i = targets.length - 91;
      const a = (i / 36) * Math.PI * 2 + GOLDEN_ANGLE * 6;
      targets.push({ x: Math.cos(a) * PHI_2, y: Math.sin(a) * PHI_2, shell: 6 });
    }

    // ═══════════════════════════════════════════════════════
    // CREATE ATOMS
    // ═══════════════════════════════════════════════════════

    const atoms = [];
    const scatterR = Math.min(W, H) * 0.45;

    for (let i = 0; i < ATOM_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = scatterR * (0.3 + Math.random() * 0.7);
      const t = targets[i] || targets[targets.length - 1];

      atoms.push({
        x: CX + Math.cos(angle) * dist,
        y: CY + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        tx: CX + t.x * BASE_R,
        ty: CY + t.y * BASE_R,
        shell: t.shell,
        size: t.shell === 0 ? 2.5 : t.shell <= 2 ? 1.8 : t.shell <= 4 ? 1.2 : 0.9,
        bonded: false,
        bondTime: 0,
      });
    }

    // ═══════════════════════════════════════════════════════
    // PRECOMPUTE BONDS — nearest neighbors in lattice
    // ═══════════════════════════════════════════════════════

    const bonds = [];
    const bondThresh = BASE_R * PHI_INV * 0.6;

    for (let i = 0; i < ATOM_COUNT; i++) {
      for (let j = i + 1; j < ATOM_COUNT; j++) {
        const dx = atoms[i].tx - atoms[j].tx;
        const dy = atoms[i].ty - atoms[j].ty;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < bondThresh && Math.abs(atoms[i].shell - atoms[j].shell) <= 1) {
          bonds.push({ a: i, b: j, dist: d });
        }
      }
    }

    // ═══════════════════════════════════════════════════════
    // REFRACTION RAYS — golden angle spaced
    // ═══════════════════════════════════════════════════════

    const RAY_COUNT = 12;
    const rays = [];
    for (let i = 0; i < RAY_COUNT; i++) {
      const a = i * GOLDEN_ANGLE;
      // Prismatic hue — spread across spectrum
      const hue = (i / RAY_COUNT) * 360;
      rays.push({ angle: a, hue, length: BASE_R * (0.8 + Math.random() * 0.6) });
    }

    // ═══════════════════════════════════════════════════════
    // ANIMATION LOOP
    // ═══════════════════════════════════════════════════════

    let startTime = null;
    let signalFired = false;

    function smoothstep(t) {
      const c = Math.max(0, Math.min(1, t));
      return c * c * (3 - 2 * c);
    }

    function tick(now) {
      if (!startTime) startTime = now;
      const t = (now - startTime) / 1000;

      ctx.clearRect(0, 0, W, H);

      // Phase progress
      const inChaos = t < A_END;
      const inCompression = t >= A_END && t < B_END;
      const inCrystal = t >= B_END && t < C_END;
      const inRefraction = t >= C_END && t < D_END;

      // Eased progress within each phase
      const chaosP = inChaos ? t / A_END : 1;
      const compP = inCompression ? smoothstep((t - A_END) / (B_END - A_END)) : (t >= B_END ? 1 : 0);
      const crystP = inCrystal ? smoothstep((t - B_END) / (C_END - B_END)) : (t >= C_END ? 1 : 0);
      const refrP = inRefraction ? smoothstep((t - C_END) / (D_END - C_END)) : (t >= D_END ? 1 : 0);

      // Global brightness ramps up during crystallization
      const brightness = Math.min(1, crystP + refrP * 0.5);

      // ── PRESSURE FIELD (Phase B) ──
      if (inCompression || inCrystal) {
        const pIntensity = inCompression ? compP : 1;
        const pulseR = BASE_R * PHI_2 * (1 - pIntensity * 0.6);
        const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, pulseR);
        g.addColorStop(0, `rgba(201,168,76,${0.02 * pIntensity})`);
        g.addColorStop(0.5, `rgba(100,140,200,${0.015 * pIntensity})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── UPDATE ATOMS ──
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];

        if (inChaos) {
          // Brownian motion with gentle center drift
          a.vx += (Math.random() - 0.5) * 0.15;
          a.vy += (Math.random() - 0.5) * 0.15;
          a.vx += (CX - a.x) * 0.00003;
          a.vy += (CY - a.y) * 0.00003;
          a.vx *= 0.98;
          a.vy *= 0.98;
        } else if (inCompression) {
          // Spring toward center, increasing force
          const k = 0.0003 + compP * 0.002;
          a.vx += (CX - a.x) * k;
          a.vy += (CY - a.y) * k;
          a.vx *= 0.96 - compP * 0.02;
          a.vy *= 0.96 - compP * 0.02;
        } else if (inCrystal && !a.bonded) {
          // Snap to lattice target
          const dx = a.tx - a.x;
          const dy = a.ty - a.y;
          const snapK = 0.08 + crystP * 0.12;
          a.vx += dx * snapK;
          a.vy += dy * snapK;
          a.vx *= 0.82;
          a.vy *= 0.82;
          // Bond when close enough
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 3) {
            a.bonded = true;
            a.bondTime = t;
            a.x = a.tx;
            a.y = a.ty;
            a.vx = 0;
            a.vy = 0;
          }
        } else if (a.bonded) {
          // Gentle breathing in lattice
          const breathe = Math.sin(t * PHI * 2 + a.shell) * 0.3;
          a.x = a.tx + breathe;
          a.y = a.ty + breathe * PHI_INV;
          a.vx = 0;
          a.vy = 0;
        }

        a.x += a.vx;
        a.y += a.vy;
      }

      // ── CENTRAL GLOW (Phase C+D) ──
      if (crystP > 0) {
        const glowR = BASE_R * PHI_NEG2 + crystP * BASE_R * 0.5;
        const glowA = crystP * 0.35;
        const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, glowR);
        g.addColorStop(0, `rgba(255,255,255,${glowA})`);
        g.addColorStop(0.3, `rgba(201,168,76,${glowA * 0.6})`);
        g.addColorStop(0.7, `rgba(201,168,76,${glowA * 0.15})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(CX, CY, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── BONDS (Phase C+D) ──
      if (crystP > 0.1) {
        const bondAlpha = Math.min(1, (crystP - 0.1) / 0.5);
        for (const bond of bonds) {
          const aa = atoms[bond.a];
          const bb = atoms[bond.b];
          if (!aa.bonded || !bb.bonded) continue;

          const shellAvg = (aa.shell + bb.shell) / 2;
          const alpha = bondAlpha * (0.15 + 0.1 * Math.pow(PHI_INV, shellAvg));

          // Light pulse traveling along bond
          const pulsePhase = (t * 2 + bond.dist * 0.01) % 1;
          const px = aa.x + (bb.x - aa.x) * pulsePhase;
          const py = aa.y + (bb.y - aa.y) * pulsePhase;

          ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(aa.x, aa.y);
          ctx.lineTo(bb.x, bb.y);
          ctx.stroke();

          // Pulse dot
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(px, py, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── ATOMS ──
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];

        // Color transition: blue-white (chaos) → white (compress) → gold (crystal)
        let r, g2, b;
        if (t < A_END) {
          r = 160; g2 = 180; b = 220; // cool blue-white
        } else if (t < B_END) {
          const mix = compP;
          r = 160 + mix * 95;  // → 255
          g2 = 180 + mix * 75; // → 255
          b = 220 + mix * 35;  // → 255
        } else {
          const mix = crystP;
          r = 255 - mix * 54;   // → 201
          g2 = 255 - mix * 87;  // → 168
          b = 255 - mix * 179;  // → 76
        }

        const baseAlpha = a.bonded ? 0.85 : (0.4 + brightness * 0.3);
        const glowR = a.size * (a.bonded ? 6 : 3) + brightness * 3;

        // Glow
        const gg = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glowR);
        gg.addColorStop(0, `rgba(${r},${g2},${b},${baseAlpha * 0.5})`);
        gg.addColorStop(0.4, `rgba(${r},${g2},${b},${baseAlpha * 0.15})`);
        gg.addColorStop(1, "transparent");
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(a.x, a.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        const coreR = a.size + (a.bonded ? 0.5 : 0);
        ctx.fillStyle = `rgba(${r},${g2},${b},${baseAlpha})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, coreR, 0, Math.PI * 2);
        ctx.fill();

        // Bond flash — brief white flash when atom snaps to lattice
        if (a.bonded && t - a.bondTime < 0.3) {
          const flashP = 1 - (t - a.bondTime) / 0.3;
          const flashR = a.size * 12 * flashP;
          const fg = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, flashR);
          fg.addColorStop(0, `rgba(255,255,255,${flashP * 0.6})`);
          fg.addColorStop(0.5, `rgba(201,168,76,${flashP * 0.2})`);
          fg.addColorStop(1, "transparent");
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.arc(a.x, a.y, flashR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── REFRACTION RAYS (Phase D) ──
      if (refrP > 0) {
        for (const ray of rays) {
          const len = ray.length * refrP;
          const ex = CX + Math.cos(ray.angle) * len;
          const ey = CY + Math.sin(ray.angle) * len;

          const alpha = refrP * 0.12;
          const g = ctx.createLinearGradient(CX, CY, ex, ey);
          g.addColorStop(0, `hsla(${ray.hue},80%,75%,${alpha})`);
          g.addColorStop(0.6, `hsla(${ray.hue},60%,60%,${alpha * 0.4})`);
          g.addColorStop(1, "transparent");

          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(CX, CY);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      // ── SIGNAL ──
      if (t >= SIGNAL_TIME && !signalFired) {
        signalFired = true;
        if (onCompleteRef.current) onCompleteRef.current();
      }

      // Keep animating through D_END + a bit of buffer
      if (t < D_END + 2) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
