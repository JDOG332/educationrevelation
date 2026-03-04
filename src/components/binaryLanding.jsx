import { useRef, useEffect, useState, useCallback } from "react";
import { PHI, PHI_INV, OPPOSITE_PAIRS, KNOWLEDGE_WORDS, SEPHIROT, SEPH_PATHS } from "../data.js";

/* ============================================================
   BINARY LANDING — Symmetric Fractal Tree

   A vertical axis of symmetry: upper branches grow upward,
   lower roots grow downward — perfect mirror images. The
   Kabbalistic Tree of Life (Sephirot) sits at the center,
   the source from which all branches emanate. Particles flow
   outward from center in both directions. Labels stack
   vertically: top word / center KNOWLEDGE / bottom word.
   Three pillars: left=blue, center=white, right=gold.
   ============================================================ */

const LABEL_CYCLE_MS = PHI * 1000;
const CROSSFADE_MS   = PHI_INV * 1000;
const DISSOLVE_MS    = PHI_INV * 1000;
const GLOW_BREATHE_MS = 6000;

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const LEFT_COLOR  = { r: 140, g: 160, b: 220 };
const LEFT_ALT    = { r: 170, g: 140, b: 200 };
const RIGHT_COLOR = { r: 201, g: 168, b: 76  };
const RIGHT_ALT   = { r: 220, g: 180, b: 100 };
const TRUNK_COLOR = { r: 232, g: 232, b: 240 };

function pillarColor(p) {
  return p === "left" ? LEFT_COLOR : p === "right" ? RIGHT_COLOR : TRUNK_COLOR;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
  return { r: lerp(c1.r, c2.r, t), g: lerp(c1.g, c2.g, t), b: lerp(c1.b, c2.b, t) };
}
function rgbaStr(c, a) {
  return `rgba(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${a})`;
}

export default function BinaryLandingCanvas({ onChoice, onSearchHover, searchOverlay }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const hoveredRef = useRef(null);
  const dissolvingRef = useRef(false);
  const chosenRef = useRef(null);
  const pairIndexRef = useRef(0);
  const lastCycleRef = useRef(0);

  const [dissolving, setDissolving] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [pairIndex, setPairIndex] = useState(0);
  const [searchHovered, setSearchHovered] = useState(false);

  const handleSearchHover = useCallback((val) => {
    setSearchHovered(val);
    onSearchHover?.(val);
  }, [onSearchHover]);

  hoveredRef.current = hovered;

  const handleChoice = useCallback((path) => {
    if (dissolvingRef.current) return;
    dissolvingRef.current = true;
    chosenRef.current = path;
    setDissolving(true);
    setTimeout(() => onChoice(path), DISSOLVE_MS);
  }, [onChoice]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);
    const MAX_DEPTH = isMobile ? 5 : 7;
    const PARTICLE_COUNT = isMobile ? 400 : 800;
    const TRUNK_FRAC = 0.15;

    // --- Symmetric layout zones ---
    const SEPH_TOP_FRAC = 0.38;
    const SEPH_BOT_FRAC = 0.62;
    const CENTER_Y_FRAC = 0.50;

    let W, H, CX;
    let sephTop, sephBot, centerY, lowerForkY, upperForkY;
    let tree = null;

    function resize() {
      W = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      sephTop    = H * SEPH_TOP_FRAC;
      sephBot    = H * SEPH_BOT_FRAC;
      centerY    = H * CENTER_Y_FRAC;
      upperForkY = sephTop;
      lowerForkY = sephBot;
    }

    function mirrorY(y) { return 2 * centerY - y; }

    // ===== SEPHIROT POSITIONS =====
    let sephPositions = [];
    function computeSephPositions() {
      const sephW = Math.min(W * 0.45, H * 0.4);
      sephPositions = SEPHIROT.map(s => ({
        x: CX + (s.x - 0.5) * sephW,
        y: sephTop + s.y * (sephBot - sephTop),
        pillar: s.pillar,
      }));
    }

    // ===== FRACTAL TREE GENERATION =====
    // Generated ONCE growing downward from lowerForkY.
    // Upper branches are drawn by mirroring Y coordinates.
    function generateTree() {
      const branches = [];
      const forkY = lowerForkY;
      const vBase = H * 0.11;
      const hBase = W * 0.14;
      const vDecay = 0.82;
      const hDecay = 0.72;

      function addBranch(sx, sy, depth, dir, bias) {
        const vStep = vBase * Math.pow(vDecay, depth);
        const hSpread = hBase * Math.pow(hDecay, depth);
        const jx = (Math.random() - 0.5) * hSpread * 0.35;
        const jy = (Math.random() - 0.5) * vStep * 0.18;
        const ex = sx + dir * hSpread + jx;
        const ey = sy + vStep + jy;
        const cx = (sx + ex) / 2 + (Math.random() - 0.5) * hSpread * 0.4;
        const cy = (sy + ey) / 2 + (Math.random() - 0.5) * vStep * 0.25;
        const idx = branches.length;
        branches.push({ sx, sy, ex, ey, cx, cy, depth, bias, left: -1, right: -1 });
        if (depth < MAX_DEPTH - 1) {
          const step = 1 / Math.pow(2, depth + 2);
          branches[idx].left  = addBranch(ex, ey, depth + 1, -1, bias - step);
          branches[idx].right = addBranch(ex, ey, depth + 1,  1, bias + step);
        }
        return idx;
      }

      const rootLeft  = addBranch(CX, forkY, 0, -1, 0.25);
      const rootRight = addBranch(CX, forkY, 0,  1, 0.75);
      return { branches, forkY, rootLeft, rootRight };
    }

    // ===== PARTICLE HELPERS =====
    function computeBranchPath(route) {
      const path = [];
      let idx = route[0] === 0 ? tree.rootLeft : tree.rootRight;
      path.push(idx);
      for (let d = 1; d < MAX_DEPTH; d++) {
        const b = tree.branches[idx];
        idx = route[d] === 0 ? b.left : b.right;
        if (idx === -1) break;
        path.push(idx);
      }
      return path;
    }

    function createParticle(randomProgress) {
      const route = [];
      for (let d = 0; d < MAX_DEPTH; d++) route.push(Math.random() < 0.5 ? 0 : 1);
      const branchPath = computeBranchPath(route);
      const rightCount = route.reduce((s, v) => s + v, 0);
      const sideBias = rightCount / MAX_DEPTH;
      const side = route[0] === 0 ? "left" : "right";
      const seed = Math.random();
      const baseColor = lerpColor(
        lerpColor(LEFT_COLOR, LEFT_ALT, seed),
        lerpColor(RIGHT_COLOR, RIGHT_ALT, seed),
        sideBias
      );
      return {
        progress: randomProgress ? Math.random() : 0,
        speed: (0.001 + Math.random() * 0.0015) * PHI,
        route, branchPath, sideBias, side, baseColor,
        size: 1.5 + Math.random() * 2.5,
        baseAlpha: 0.45 + Math.random() * 0.5,
        direction: Math.random() < 0.5 ? "up" : "down",
      };
    }

    function getParticlePos(p) {
      let pos;
      if (p.progress < TRUNK_FRAC) {
        // Trunk phase: center → fork (computed as downward, mirrored for "up")
        const t = p.progress / TRUNK_FRAC;
        pos = { x: CX, y: lerp(centerY, tree.forkY, t) };
      } else {
        // Branch phase: traverse tree branches
        const bp = (p.progress - TRUNK_FRAC) / (1 - TRUNK_FRAC);
        const levelFloat = bp * MAX_DEPTH;
        const level = Math.min(Math.floor(levelFloat), p.branchPath.length - 1);
        const t = Math.min(levelFloat - level, 1);
        const b = tree.branches[p.branchPath[level]];
        const u = 1 - t;
        pos = {
          x: u * u * b.sx + 2 * u * t * b.cx + t * t * b.ex,
          y: u * u * b.sy + 2 * u * t * b.cy + t * t * b.ey,
        };
      }
      // Mirror for upward particles
      if (p.direction === "up") pos.y = mirrorY(pos.y);
      return pos;
    }

    // ===== BRANCH DRAWING HELPER =====
    const ident = (y) => y;
    function drawBranches(hov, mirror) {
      const yT = mirror ? mirrorY : ident;
      // "top" hover brightens upper (mirrored) branches; "bottom" brightens lower (normal)
      const zoneMatch = hov === "top" ? mirror : hov === "bottom" ? !mirror : false;
      const zoneDim   = hov === "top" ? !mirror : hov === "bottom" ? mirror : false;

      // Glow pass — wide, soft
      for (let i = 0; i < tree.branches.length; i++) {
        const b = tree.branches[i];
        let alpha = 0.09 * Math.pow(0.75, b.depth);

        if (zoneMatch)              alpha *= 2;
        else if (zoneDim)           alpha *= 0.4;
        else if (hov === "center")  alpha *= b.depth < 2 ? 2 : 0.5;

        const depthBlend = Math.min(b.depth / (MAX_DEPTH - 1) * 1.5, 1);
        const isLeft = b.bias < 0.5;
        const sideColor = isLeft ? LEFT_COLOR : RIGHT_COLOR;
        const color = lerpColor(TRUNK_COLOR, sideColor, depthBlend);

        ctx.beginPath();
        ctx.moveTo(b.sx, yT(b.sy));
        ctx.quadraticCurveTo(b.cx, yT(b.cy), b.ex, yT(b.ey));
        ctx.strokeStyle = rgbaStr(color, alpha);
        ctx.lineWidth = Math.max(1.5, 6 - b.depth * 0.6);
        ctx.stroke();
      }
      // Core pass — thin, brighter
      for (let i = 0; i < tree.branches.length; i++) {
        const b = tree.branches[i];
        let alpha = 0.18 * Math.pow(0.75, b.depth);

        if (zoneMatch)              alpha *= 2.5;
        else if (zoneDim)           alpha *= 0.35;
        else if (hov === "center")  alpha *= b.depth < 2 ? 2.5 : 0.4;

        const depthBlend = Math.min(b.depth / (MAX_DEPTH - 1) * 1.5, 1);
        const isLeft = b.bias < 0.5;
        const sideColor = isLeft ? LEFT_COLOR : RIGHT_COLOR;
        const color = lerpColor(TRUNK_COLOR, sideColor, depthBlend);

        ctx.beginPath();
        ctx.moveTo(b.sx, yT(b.sy));
        ctx.quadraticCurveTo(b.cx, yT(b.cy), b.ex, yT(b.ey));
        ctx.strokeStyle = rgbaStr(color, alpha);
        ctx.lineWidth = Math.max(0.8, 2.4 - b.depth * 0.2);
        ctx.stroke();
      }
    }

    // ===== INIT =====
    resize();
    computeSephPositions();
    tree = generateTree();
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle(true));

    let lastTime = 0;
    lastCycleRef.current = performance.now();

    // ===== ANIMATION LOOP =====
    function animate(now) {
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16;
      lastTime = now;

      // Label cycling
      if (now - lastCycleRef.current > LABEL_CYCLE_MS) {
        lastCycleRef.current = now;
        const next = (pairIndexRef.current + 1) % OPPOSITE_PAIRS.length;
        pairIndexRef.current = next;
        setPairIndex(next);
      }

      ctx.clearRect(0, 0, W, H);
      const hov = hoveredRef.current;
      const isDiss = dissolvingRef.current;
      const chosen = chosenRef.current;
      const chosenSide = chosen === "death-or-life" ? "top" : chosen === "rhythm-of-life" ? "bottom" : chosen === "pact" ? "center" : null;

      // --- Draw trunk spine (full height) ---
      ctx.beginPath();
      ctx.moveTo(CX, 0);
      ctx.lineTo(CX, H);
      ctx.strokeStyle = "rgba(232,232,240,0.08)";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(CX, 0);
      ctx.lineTo(CX, H);
      ctx.strokeStyle = "rgba(232,232,240,0.16)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // --- Draw Sephirot paths (two passes: glow + core) ---
      const sephBreath = (now % GLOW_BREATHE_MS) / GLOW_BREATHE_MS;
      // Map hover zones to pillar names: top→left(blue), bottom→right(gold), center→center(white)
      const hovPillar = hov === "top" ? "left" : hov === "bottom" ? "right" : hov === "center" ? "center" : null;
      for (let i = 0; i < SEPH_PATHS.length; i++) {
        const [a, b] = SEPH_PATHS[i];
        const pa = sephPositions[a], pb = sephPositions[b];
        const ca = pillarColor(pa.pillar), cb = pillarColor(pb.pillar);
        const color = lerpColor(ca, cb, 0.5);
        let alpha = 0.07;
        if (hovPillar) {
          const match = pa.pillar === hovPillar || pb.pillar === hovPillar;
          alpha *= match ? 2 : 0.35;
        }
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = rgbaStr(color, alpha);
        ctx.lineWidth = 4.5;
        ctx.stroke();
      }
      for (let i = 0; i < SEPH_PATHS.length; i++) {
        const [a, b] = SEPH_PATHS[i];
        const pa = sephPositions[a], pb = sephPositions[b];
        const ca = pillarColor(pa.pillar), cb = pillarColor(pb.pillar);
        const color = lerpColor(ca, cb, 0.5);
        let alpha = 0.15;
        if (hovPillar) {
          const match = pa.pillar === hovPillar || pb.pillar === hovPillar;
          alpha *= match ? 2 : 0.35;
        }
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = rgbaStr(color, alpha);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // --- Draw Sephirot nodes ---
      const sephCoreR = Math.min(W, H) * 0.012;
      const sephGlowR = sephCoreR * (isMobile ? 3 : 5);
      for (let i = 0; i < sephPositions.length; i++) {
        const sp = sephPositions[i];
        const color = pillarColor(sp.pillar);
        const phase = (sephBreath + i * 0.1) % 1;
        const breath = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
        let bright = 1;
        if (hovPillar) { bright = sp.pillar === hovPillar ? 1.8 : 0.5; }

        const gr = sephGlowR * (0.8 + breath * 0.4);
        const haloGrad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, gr);
        haloGrad.addColorStop(0, rgbaStr(color, 0.15 * bright));
        haloGrad.addColorStop(0.5, rgbaStr(color, 0.05 * bright));
        haloGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sephCoreR * (0.9 + breath * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(color, (0.4 + breath * 0.2) * bright);
        ctx.fill();
      }

      // --- Draw branches (lower roots + upper branches mirrored) ---
      drawBranches(hov, false);
      drawBranches(hov, true);

      // --- Fork glows (upper + lower) ---
      const breathPhase = (now % GLOW_BREATHE_MS) / GLOW_BREATHE_MS;
      const breathAlpha = (hov === "center" ? 0.10 : 0.06) + Math.sin(breathPhase * Math.PI * 2) * 0.04;
      const glowR = Math.min(W, H) * 0.10;

      const gradLower = ctx.createRadialGradient(CX, lowerForkY, 0, CX, lowerForkY, glowR);
      gradLower.addColorStop(0, `rgba(220,210,200,${breathAlpha})`);
      gradLower.addColorStop(0.4, `rgba(190,180,210,${breathAlpha * 0.4})`);
      gradLower.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradLower;
      ctx.fillRect(CX - glowR, lowerForkY - glowR, glowR * 2, glowR * 2);

      const gradUpper = ctx.createRadialGradient(CX, upperForkY, 0, CX, upperForkY, glowR);
      gradUpper.addColorStop(0, `rgba(220,210,200,${breathAlpha})`);
      gradUpper.addColorStop(0.4, `rgba(190,180,210,${breathAlpha * 0.4})`);
      gradUpper.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradUpper;
      ctx.fillRect(CX - glowR, upperForkY - glowR, glowR * 2, glowR * 2);

      // --- Hover threshold glow lines at zone boundaries ---
      if (hov) {
        const lineColor = hov === "top" ? LEFT_COLOR : hov === "bottom" ? RIGHT_COLOR : TRUNK_COLOR;
        const lineAlpha = 0.12 + Math.sin(breathPhase * Math.PI * 2) * 0.04;
        const glowH = 40; // vertical spread of the glow

        // Draw at sephTop boundary (top zone / center zone border)
        if (hov === "top" || hov === "center") {
          const grad = ctx.createLinearGradient(0, sephTop - glowH, 0, sephTop + glowH);
          grad.addColorStop(0, "rgba(0,0,0,0)");
          grad.addColorStop(0.5, rgbaStr(lineColor, lineAlpha));
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, sephTop - glowH, W, glowH * 2);
          // Crisp core line
          ctx.beginPath();
          ctx.moveTo(0, sephTop);
          ctx.lineTo(W, sephTop);
          ctx.strokeStyle = rgbaStr(lineColor, lineAlpha * 1.5);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Draw at sephBot boundary (center zone / bottom zone border)
        if (hov === "bottom" || hov === "center") {
          const grad = ctx.createLinearGradient(0, sephBot - glowH, 0, sephBot + glowH);
          grad.addColorStop(0, "rgba(0,0,0,0)");
          grad.addColorStop(0.5, rgbaStr(lineColor, lineAlpha));
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, sephBot - glowH, W, glowH * 2);
          // Crisp core line
          ctx.beginPath();
          ctx.moveTo(0, sephBot);
          ctx.lineTo(W, sephBot);
          ctx.strokeStyle = rgbaStr(lineColor, lineAlpha * 1.5);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // --- Update & draw particles (additive glow + core) ---
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let speed = p.speed * (dt / 16);

        if (isDiss && chosenSide) {
          if (chosenSide === "center") {
            if (p.progress > 0.15) { speed *= 0.3; p.baseAlpha *= 0.97; }
            else speed *= 2;
          } else if ((chosenSide === "top" && p.direction === "up") ||
                     (chosenSide === "bottom" && p.direction === "down")) speed *= 3;
          else { speed *= 0.3; p.baseAlpha *= 0.97; }
        }

        p.progress += speed;

        if (p.progress > 1) {
          const fresh = createParticle(false);
          Object.assign(p, fresh);
        }

        const pos = getParticlePos(p);
        const depthBlend = Math.min(p.progress * 1.5, 1);
        const color = lerpColor(TRUNK_COLOR, p.baseColor, depthBlend);

        let alpha = p.baseAlpha;
        if (hov === "top")          alpha *= p.direction === "up" ? 1.5 : 0.4;
        else if (hov === "bottom")  alpha *= p.direction === "down" ? 1.5 : 0.4;
        else if (hov === "center")  alpha *= p.progress < 0.25 ? 1.5 : 0.6;

        // Fade in near center, fade out at tips
        if (p.progress < 0.04) alpha *= p.progress / 0.04;
        if (p.progress > 0.85) alpha *= (1 - p.progress) / 0.15;
        alpha = Math.min(Math.max(alpha, 0), 1);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(color, alpha * 0.10);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(color, alpha * 0.5);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    function onResize() {
      resize();
      computeSephPositions();
      tree = generateTree();
      for (const p of particles) p.branchPath = computeBranchPath(p.route);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pair = OPPOSITE_PAIRS[pairIndex];
  const isEven = pairIndex % 2 === 0;
  const prevPair = OPPOSITE_PAIRS[(pairIndex - 1 + OPPOSITE_PAIRS.length) % OPPOSITE_PAIRS.length];
  const kWord = KNOWLEDGE_WORDS[pairIndex % KNOWLEDGE_WORDS.length];
  const kPrev = KNOWLEDGE_WORDS[(pairIndex - 1 + KNOWLEDGE_WORDS.length) % KNOWLEDGE_WORDS.length];
  const cubicEase = "cubic-bezier(0.23, 1, 0.32, 1)";
  const crossfade = `opacity ${CROSSFADE_MS}ms ${cubicEase}`;

  const goldenLS = `${PHI_INV * PHI_INV}em`;

  // Golden ratio scales: 1 - PHI_INV^n
  const phi2 = PHI_INV * PHI_INV;
  const phi3 = phi2 * PHI_INV;
  const phi4 = phi3 * PHI_INV;
  const alphaRest   = 1 - phi2;   // n=2 → 0.618 (satellite opacity)
  const alphaAnchor = 1 - phi3;   // n=3 → 0.764 (center opacity)
  const alphaHover  = 1 - phi4;   // n=4 → 0.854 (hover opacity + label positions)
  const labelTopPos = `${phi4 * 100}%`;          // 14.6% from top
  const labelBotPos = `${(1 - phi4) * 100}%`;    // 85.4% from top

  const labelFont = {
    fontFamily: "'Cinzel', serif",
    fontSize: `clamp(${Math.round(55 * PHI_INV * PHI_INV)}px, ${PHI * PHI * PHI}vw, 55px)`,
    fontWeight: 700,
    letterSpacing: goldenLS,
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "#000000", zIndex: 10001,
      opacity: dissolving ? 0 : 1,
      transition: `opacity ${DISSOLVE_MS}ms ${cubicEase}`,
    }}>
      <canvas ref={canvasRef} style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none",
      }} />

      {/* Grain */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        opacity: 0.02, pointerEvents: "none", zIndex: 1,
        backgroundImage: GRAIN_BG, backgroundSize: "200px",
      }} />

      {/* Vignette — centered */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.85) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />


      {/* === Left 2/3 hover zone — reveals search bars === */}
      <div
        onMouseEnter={() => handleSearchHover(true)}
        onMouseLeave={() => handleSearchHover(false)}
        style={{ position: "absolute", top: 0, left: 0, width: "66.67%", height: "100%",
                 cursor: searchHovered ? "text" : "default", zIndex: 3 }}
      />

      {/* === Labels — vertical stack === */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 4 }}>
        {/* Top — pair[0] (shadow/dark side) — fades out when search hovered */}
        <div style={{
          position: "absolute", top: labelTopPos, left: "50%",
          transform: `translate(-50%, -50%) ${hovered === "top" ? "scale(1.06) translateY(-4px)" : "scale(1) translateY(0)"}`,
          transition: `all ${CROSSFADE_MS}ms ${cubicEase}`,
          textAlign: "center",
          opacity: searchHovered ? 0 : 1,
        }}>
          <div style={{ animation: `fadeSlideUp 1.2s ease ${PHI_INV}s both` }}>
            <div style={{
              ...labelFont,
              color: `rgba(180,190,220,${hovered === "top" ? alphaHover : alphaRest})`,
              textShadow: hovered === "top" ? "0 0 24px rgba(140,160,220,0.25)" : "none",
              transition: crossfade, opacity: isEven ? 1 : 0, position: "relative",
            }}>{isEven ? pair[0] : prevPair[0]}</div>
            <div style={{
              ...labelFont,
              color: `rgba(180,190,220,${hovered === "top" ? alphaHover : alphaRest})`,
              textShadow: hovered === "top" ? "0 0 24px rgba(140,160,220,0.25)" : "none",
              transition: crossfade, opacity: isEven ? 0 : 1,
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap",
            }}>{isEven ? prevPair[0] : pair[0]}</div>
          </div>
        </div>

        {/* Center — KNOWLEDGE word or SEARCH when hovered */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: `translate(-50%, -50%) ${hovered === "center" ? "scale(1.06)" : "scale(1)"}`,
          transition: `all ${CROSSFADE_MS}ms ${cubicEase}`,
          textAlign: "center",
        }}>
          {/* Rotating words — fade out when search hovered */}
          <div style={{
            animation: `fadeSlideUp 1.2s ease ${PHI_INV}s both`,
            opacity: searchHovered ? 0 : 1,
            transition: `opacity ${CROSSFADE_MS}ms ${cubicEase}`,
          }}>
            <div style={{
              ...labelFont,
              color: `rgba(232,232,240,${hovered === "center" ? alphaHover : alphaAnchor})`,
              textShadow: hovered === "center" ? "0 0 24px rgba(232,232,240,0.2)" : "none",
              transition: crossfade, opacity: isEven ? 1 : 0, position: "relative",
            }}>{isEven ? kWord : kPrev}</div>
            <div style={{
              ...labelFont,
              color: `rgba(232,232,240,${hovered === "center" ? alphaHover : alphaAnchor})`,
              textShadow: hovered === "center" ? "0 0 24px rgba(232,232,240,0.2)" : "none",
              transition: crossfade, opacity: isEven ? 0 : 1,
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap",
            }}>{isEven ? kPrev : kWord}</div>
          </div>
          {/* SEARCH — fades in when search hovered */}
          <div style={{
            ...labelFont,
            color: `rgba(232,232,240,${alphaAnchor})`,
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            opacity: searchHovered ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ${cubicEase}`,
            whiteSpace: "nowrap",
          }}>SEARCH</div>
        </div>

        {/* Bottom — pair[1] (light/active side) — fades out when search hovered */}
        <div style={{
          position: "absolute", top: labelBotPos, left: "50%",
          transform: `translate(-50%, -50%) ${hovered === "bottom" ? "scale(1.06) translateY(4px)" : "scale(1) translateY(0)"}`,
          transition: `all ${CROSSFADE_MS}ms ${cubicEase}`,
          textAlign: "center",
          opacity: searchHovered ? 0 : 1,
        }}>
          <div style={{ animation: `fadeSlideUp 1.2s ease ${PHI_INV}s both` }}>
            <div style={{
              ...labelFont,
              color: `rgba(232,220,180,${hovered === "bottom" ? alphaHover : alphaRest})`,
              textShadow: hovered === "bottom" ? "0 0 24px rgba(201,168,76,0.25)" : "none",
              transition: crossfade, opacity: isEven ? 1 : 0, position: "relative",
            }}>{isEven ? pair[1] : prevPair[1]}</div>
            <div style={{
              ...labelFont,
              color: `rgba(232,220,180,${hovered === "bottom" ? alphaHover : alphaRest})`,
              textShadow: hovered === "bottom" ? "0 0 24px rgba(201,168,76,0.25)" : "none",
              transition: crossfade, opacity: isEven ? 0 : 1,
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap",
            }}>{isEven ? prevPair[1] : pair[1]}</div>
          </div>
        </div>

        {/* Search bar overlay — rendered from App.jsx */}
        {searchOverlay}
      </div>
    </div>
  );
}
