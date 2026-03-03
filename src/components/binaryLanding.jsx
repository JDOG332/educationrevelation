import { useRef, useEffect, useState, useCallback } from "react";
import { PHI, PHI_INV, OPPOSITE_PAIRS } from "../data.js";

/* ============================================================
   BINARY LANDING — Fractal Root System

   A single trunk splits into a fractal binary tree — every branch
   forks into two, hundreds of luminous roots growing downward from
   one point. Left forks tint cool (ASK/shadow), right forks tint
   warm (EXPLORE/light). Particles flow through the branching paths
   like light through veins. Reversed, it would look like a thousand
   streams converging into one river.
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

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
  return { r: lerp(c1.r, c2.r, t), g: lerp(c1.g, c2.g, t), b: lerp(c1.b, c2.b, t) };
}
function rgbaStr(c, a) {
  return `rgba(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${a})`;
}

export default function BinaryLandingCanvas({ onChoice }) {
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
    const PARTICLE_COUNT = isMobile ? 120 : 250;
    const TRUNK_FRAC = 0.08;

    let W, H, CX;
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
    }

    // ===== FRACTAL TREE GENERATION =====
    function generateTree() {
      const branches = [];
      const trunkEndY = H * 0.10;
      const vBase = H * 0.14;
      const hBase = W * 0.14;
      const vDecay = 0.82;
      const hDecay = 0.72;

      function addBranch(sx, sy, depth, dir, bias) {
        const vStep = vBase * Math.pow(vDecay, depth);
        const hSpread = hBase * Math.pow(hDecay, depth);
        const jx = (Math.random() - 0.5) * hSpread * 0.25;
        const jy = (Math.random() - 0.5) * vStep * 0.12;
        const ex = sx + dir * hSpread + jx;
        const ey = sy + vStep + jy;
        const cx = (sx + ex) / 2 + (Math.random() - 0.5) * hSpread * 0.15;
        const cy = (sy + ey) / 2 + (Math.random() - 0.5) * vStep * 0.08;
        const idx = branches.length;
        branches.push({ sx, sy, ex, ey, cx, cy, depth, bias, left: -1, right: -1 });
        if (depth < MAX_DEPTH - 1) {
          const step = 1 / Math.pow(2, depth + 2);
          branches[idx].left  = addBranch(ex, ey, depth + 1, -1, bias - step);
          branches[idx].right = addBranch(ex, ey, depth + 1,  1, bias + step);
        }
        return idx;
      }

      const rootLeft  = addBranch(CX, trunkEndY, 0, -1, 0.25);
      const rootRight = addBranch(CX, trunkEndY, 0,  1, 0.75);
      return { branches, trunkEndY, rootLeft, rootRight };
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
        speed: (0.0006 + Math.random() * 0.001) * PHI,
        route, branchPath, sideBias, side, baseColor,
        size: 0.8 + Math.random() * 1.8,
        baseAlpha: 0.2 + Math.random() * 0.45,
      };
    }

    function getParticlePos(p) {
      if (p.progress < TRUNK_FRAC) {
        const t = p.progress / TRUNK_FRAC;
        return { x: CX, y: lerp(-10, tree.trunkEndY, t) };
      }
      const bp = (p.progress - TRUNK_FRAC) / (1 - TRUNK_FRAC);
      const levelFloat = bp * MAX_DEPTH;
      const level = Math.min(Math.floor(levelFloat), p.branchPath.length - 1);
      const t = Math.min(levelFloat - level, 1);
      const b = tree.branches[p.branchPath[level]];
      const u = 1 - t;
      return {
        x: u * u * b.sx + 2 * u * t * b.cx + t * t * b.ex,
        y: u * u * b.sy + 2 * u * t * b.cy + t * t * b.ey,
      };
    }

    // ===== INIT =====
    resize();
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
      const chosenSide = chosen === "ask" ? "left" : chosen === "explore" ? "right" : null;

      // --- Draw trunk hint line ---
      ctx.beginPath();
      ctx.moveTo(CX, 0);
      ctx.lineTo(CX, tree.trunkEndY);
      ctx.strokeStyle = "rgba(232,232,240,0.05)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // --- Draw branch hint lines ---
      for (let i = 0; i < tree.branches.length; i++) {
        const b = tree.branches[i];
        const isLeft = b.bias < 0.5;
        let alpha = 0.04 * Math.pow(0.7, b.depth);

        if (hov === "left")       alpha *= isLeft ? 2.5 : 0.4;
        else if (hov === "right") alpha *= isLeft ? 0.4 : 2.5;

        const depthBlend = Math.min(b.depth / (MAX_DEPTH - 1) * 1.5, 1);
        const sideColor = isLeft ? LEFT_COLOR : RIGHT_COLOR;
        const color = lerpColor(TRUNK_COLOR, sideColor, depthBlend);

        ctx.beginPath();
        ctx.moveTo(b.sx, b.sy);
        ctx.quadraticCurveTo(b.cx, b.cy, b.ex, b.ey);
        ctx.strokeStyle = rgbaStr(color, alpha);
        ctx.lineWidth = Math.max(0.5, 1.5 - b.depth * 0.15);
        ctx.stroke();
      }

      // --- Fork glow ---
      const breathPhase = (now % GLOW_BREATHE_MS) / GLOW_BREATHE_MS;
      const breathAlpha = 0.04 + Math.sin(breathPhase * Math.PI * 2) * 0.03;
      const glowR = Math.min(W, H) * 0.08;
      const grad = ctx.createRadialGradient(CX, tree.trunkEndY, 0, CX, tree.trunkEndY, glowR);
      grad.addColorStop(0, `rgba(200,190,180,${breathAlpha})`);
      grad.addColorStop(0.5, `rgba(180,170,200,${breathAlpha * 0.4})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(CX - glowR, tree.trunkEndY - glowR, glowR * 2, glowR * 2);

      // --- Update & draw particles ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let speed = p.speed * (dt / 16);

        if (isDiss && chosenSide) {
          if (p.side === chosenSide) speed *= 3;
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
        if (hov === "left")       alpha *= p.side === "left" ? 1.5 : 0.5;
        else if (hov === "right") alpha *= p.side === "right" ? 1.5 : 0.5;

        if (p.progress < 0.05) alpha *= p.progress / 0.05;
        if (p.progress > 0.88) alpha *= (1 - p.progress) / 0.12;
        alpha = Math.min(Math.max(alpha, 0), 1);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(color, alpha);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    function onResize() {
      resize();
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
  const cubicEase = "cubic-bezier(0.23, 1, 0.32, 1)";
  const crossfade = `opacity ${CROSSFADE_MS}ms ${cubicEase}`;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "#030306", zIndex: 10001,
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

      {/* Vignette */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Left click zone + labels */}
      <div
        onClick={() => handleChoice("ask")}
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
          cursor: "pointer", zIndex: 3,
        }}
      >
        <div style={{
          position: "absolute",
          top: "25%", left: "50%",
          transform: `translate(-50%, -50%) ${hovered === "left" ? "scale(1.06) translateY(-4px)" : "scale(1) translateY(0)"}`,
          transition: `all ${CROSSFADE_MS}ms ${cubicEase}`,
          textAlign: "center",
          animation: "fadeSlideUp 1.2s ease 0.5s both",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(20px, 5vw, 36px)",
            letterSpacing: "0.25em",
            color: `rgba(180,190,220,${hovered === "left" ? 0.85 : 0.5})`,
            textShadow: hovered === "left" ? "0 0 24px rgba(140,160,220,0.2)" : "none",
            transition: crossfade,
            opacity: isEven ? 1 : 0,
            position: "relative",
          }}>
            {isEven ? pair[0] : prevPair[0]}
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(20px, 5vw, 36px)",
            letterSpacing: "0.25em",
            color: `rgba(180,190,220,${hovered === "left" ? 0.85 : 0.5})`,
            textShadow: hovered === "left" ? "0 0 24px rgba(140,160,220,0.2)" : "none",
            transition: crossfade,
            opacity: isEven ? 0 : 1,
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}>
            {isEven ? prevPair[0] : pair[0]}
          </div>
        </div>
      </div>

      {/* Right click zone + labels */}
      <div
        onClick={() => handleChoice("explore")}
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
          cursor: "pointer", zIndex: 3,
        }}
      >
        <div style={{
          position: "absolute",
          top: "25%", left: "50%",
          transform: `translate(-50%, -50%) ${hovered === "right" ? "scale(1.06) translateY(-4px)" : "scale(1) translateY(0)"}`,
          transition: `all ${CROSSFADE_MS}ms ${cubicEase}`,
          textAlign: "center",
          animation: "fadeSlideUp 1.2s ease 0.7s both",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(20px, 5vw, 36px)",
            letterSpacing: "0.25em",
            color: `rgba(232,220,180,${hovered === "right" ? 0.85 : 0.5})`,
            textShadow: hovered === "right" ? "0 0 24px rgba(201,168,76,0.2)" : "none",
            transition: crossfade,
            opacity: isEven ? 1 : 0,
            position: "relative",
          }}>
            {isEven ? pair[1] : prevPair[1]}
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(20px, 5vw, 36px)",
            letterSpacing: "0.25em",
            color: `rgba(232,220,180,${hovered === "right" ? 0.85 : 0.5})`,
            textShadow: hovered === "right" ? "0 0 24px rgba(201,168,76,0.2)" : "none",
            transition: crossfade,
            opacity: isEven ? 0 : 1,
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}>
            {isEven ? prevPair[1] : pair[1]}
          </div>
        </div>
      </div>
    </div>
  );
}
