import { useRef, useEffect, useState, useCallback } from "react";
import { PHI, PHI_INV, OPPOSITE_PAIRS } from "../data.js";

/* ============================================================
   BINARY LANDING — Two Diverging Rivers of Light

   A single stream of particles flows from top-center, splits
   at a fork point into two curving rivers — left (cool/shadow)
   toward ASK, right (warm/light) toward EXPLORE. Labels cycle
   through 50 archetypal opposite pairs on PHI timing.
   ============================================================ */

const LABEL_CYCLE_MS = PHI * 1000;       // 1618ms
const CROSSFADE_MS   = PHI_INV * 1000;   // 618ms
const DISSOLVE_MS    = PHI_INV * 1000;    // 618ms
const GLOW_BREATHE_MS = 6000;

// Grain SVG data URI — shared across site
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Colors
const LEFT_COLOR  = { r: 140, g: 160, b: 220 };  // steel blue
const LEFT_ALT    = { r: 170, g: 140, b: 200 };  // soft violet
const RIGHT_COLOR = { r: 201, g: 168, b: 76  };   // gold
const RIGHT_ALT   = { r: 220, g: 180, b: 100 };  // warm amber
const TRUNK_COLOR = { r: 232, g: 232, b: 240 };   // neutral bone

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
  return { r: lerp(c1.r, c2.r, t), g: lerp(c1.g, c2.g, t), b: lerp(c1.b, c2.b, t) };
}

// Evaluate cubic bezier at t
function cubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
  };
}

export default function BinaryLandingCanvas({ onChoice }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const hoveredRef = useRef(null);
  const dissolvingRef = useRef(false);
  const chosenRef = useRef(null);
  const pairIndexRef = useRef(0);
  const lastCycleRef = useRef(0);
  const startTimeRef = useRef(0);

  const [dissolving, setDissolving] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [pairIndex, setPairIndex] = useState(0);

  // Keep refs in sync
  hoveredRef.current = hovered;

  const handleChoice = useCallback((path) => {
    if (dissolvingRef.current) return;
    dissolvingRef.current = true;
    chosenRef.current = path;
    setDissolving(true);
    setTimeout(() => {
      onChoice(path);
    }, DISSOLVE_MS);
  }, [onChoice]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);
    const PARTICLE_COUNT = isMobile ? 100 : 200;

    let W, H, CX;
    let trunkEnd, forkY;
    let leftBez, rightBez;

    function computePaths() {
      W = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      CX = W / 2;
      forkY = H * 0.4;
      trunkEnd = { x: CX, y: forkY };

      // Left branch bezier: fork → curves left-down
      leftBez = {
        p0: { x: CX, y: forkY },
        p1: { x: CX - W * 0.08, y: forkY + H * 0.18 },
        p2: { x: W * 0.12, y: forkY + H * 0.28 },
        p3: { x: W * 0.15, y: H * 0.95 },
      };

      // Right branch bezier: fork → curves right-down
      rightBez = {
        p0: { x: CX, y: forkY },
        p1: { x: CX + W * 0.08, y: forkY + H * 0.18 },
        p2: { x: W * 0.88, y: forkY + H * 0.28 },
        p3: { x: W * 0.85, y: H * 0.95 },
      };
    }

    computePaths();

    // Initialize particles
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        progress: Math.random(),      // 0..1 along full path
        speed: (0.0008 + Math.random() * 0.0012) * PHI,
        side: Math.random() < 0.5 ? "left" : "right",
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
        offset: (Math.random() - 0.5) * 6, // lateral jitter
      });
    }

    function getParticlePos(p) {
      const trunkFrac = 0.4; // trunk is first 40% of progress
      if (p.progress < trunkFrac) {
        // Trunk phase: straight line down
        const t = p.progress / trunkFrac;
        return {
          x: CX + p.offset * t,
          y: t * forkY,
          trunkBlend: 1 - t, // 1 at top, 0 at fork
        };
      } else {
        // Branch phase
        const t = (p.progress - trunkFrac) / (1 - trunkFrac);
        const bez = p.side === "left" ? leftBez : rightBez;
        const pos = cubicBezier(bez.p0, bez.p1, bez.p2, bez.p3, t);
        return {
          x: pos.x + p.offset * (1 - t),
          y: pos.y,
          trunkBlend: 0,
        };
      }
    }

    function getParticleColor(p, trunkBlend) {
      const sideColor = p.side === "left"
        ? lerpColor(LEFT_COLOR, LEFT_ALT, Math.sin(p.progress * Math.PI) * 0.5 + 0.5)
        : lerpColor(RIGHT_COLOR, RIGHT_ALT, Math.sin(p.progress * Math.PI) * 0.5 + 0.5);
      return lerpColor(sideColor, TRUNK_COLOR, trunkBlend * 0.7);
    }

    let lastTime = 0;
    startTimeRef.current = performance.now();
    lastCycleRef.current = startTimeRef.current;

    function animate(now) {
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16;
      lastTime = now;

      // Label cycling — driven from rAF
      if (now - lastCycleRef.current > LABEL_CYCLE_MS) {
        lastCycleRef.current = now;
        const next = (pairIndexRef.current + 1) % OPPOSITE_PAIRS.length;
        pairIndexRef.current = next;
        setPairIndex(next);
      }

      ctx.clearRect(0, 0, W, H);

      // Draw faint path hint lines
      const hov = hoveredRef.current;
      const leftHintAlpha = hov === "left" ? 0.08 : (hov === "right" ? 0.015 : 0.03);
      const rightHintAlpha = hov === "right" ? 0.08 : (hov === "left" ? 0.015 : 0.03);

      // Trunk hint
      ctx.beginPath();
      ctx.moveTo(CX, 0);
      ctx.lineTo(CX, forkY);
      ctx.strokeStyle = `rgba(232,232,240,0.03)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Left branch hint
      ctx.beginPath();
      ctx.moveTo(leftBez.p0.x, leftBez.p0.y);
      ctx.bezierCurveTo(leftBez.p1.x, leftBez.p1.y, leftBez.p2.x, leftBez.p2.y, leftBez.p3.x, leftBez.p3.y);
      ctx.strokeStyle = `rgba(140,160,220,${leftHintAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Right branch hint
      ctx.beginPath();
      ctx.moveTo(rightBez.p0.x, rightBez.p0.y);
      ctx.bezierCurveTo(rightBez.p1.x, rightBez.p1.y, rightBez.p2.x, rightBez.p2.y, rightBez.p3.x, rightBez.p3.y);
      ctx.strokeStyle = `rgba(201,168,76,${rightHintAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Fork glow
      const breathPhase = (now % GLOW_BREATHE_MS) / GLOW_BREATHE_MS;
      const breathAlpha = 0.04 + Math.sin(breathPhase * Math.PI * 2) * 0.03;
      const glowR = Math.min(W, H) * 0.12;
      const grad = ctx.createRadialGradient(CX, forkY, 0, CX, forkY, glowR);
      grad.addColorStop(0, `rgba(190,170,160,${breathAlpha})`);
      grad.addColorStop(0.5, `rgba(170,160,200,${breathAlpha * 0.5})`);
      grad.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(CX - glowR, forkY - glowR, glowR * 2, glowR * 2);

      // Update and draw particles
      const isDiss = dissolvingRef.current;
      const chosen = chosenRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Movement
        let speed = p.speed * (dt / 16);

        // Dissolve: rush particles toward chosen side
        if (isDiss && chosen) {
          if (p.side === chosen) {
            speed *= 3;
          } else {
            speed *= 0.3;
            p.alpha *= 0.97;
          }
        }

        p.progress += speed;

        // Respawn
        if (p.progress > 1) {
          p.progress = 0;
          p.side = Math.random() < 0.5 ? "left" : "right";
          p.alpha = 0.3 + Math.random() * 0.5;
          p.offset = (Math.random() - 0.5) * 6;
        }

        const pos = getParticlePos(p);
        const color = getParticleColor(p, pos.trunkBlend);

        // Hover brightness
        let alpha = p.alpha;
        if (hov === "left") {
          alpha *= p.side === "left" ? 1.5 : 0.6;
        } else if (hov === "right") {
          alpha *= p.side === "right" ? 1.5 : 0.6;
        }

        // Fade at edges
        if (p.progress < 0.05) alpha *= p.progress / 0.05;
        if (p.progress > 0.9) alpha *= (1 - p.progress) / 0.1;

        alpha = Math.min(alpha, 1);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)},${alpha})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    function onResize() {
      computePaths();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pair = OPPOSITE_PAIRS[pairIndex];
  const isEven = pairIndex % 2 === 0;
  const prevIndex = (pairIndex - 1 + OPPOSITE_PAIRS.length) % OPPOSITE_PAIRS.length;
  const prevPair = OPPOSITE_PAIRS[prevIndex];

  const cubicEase = "cubic-bezier(0.23, 1, 0.32, 1)";
  const crossfade = `opacity ${CROSSFADE_MS}ms ${cubicEase}`;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "#030306", zIndex: 10001,
      opacity: dissolving ? 0 : 1,
      transition: `opacity ${DISSOLVE_MS}ms ${cubicEase}`,
    }}>
      {/* Canvas */}
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
          display: "flex", alignItems: "center", justifyContent: "center",
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
          {/* Dual-slot crossfade: Slot A */}
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
          {/* Dual-slot crossfade: Slot B */}
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
          display: "flex", alignItems: "center", justifyContent: "center",
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
          {/* Dual-slot crossfade: Slot A */}
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
          {/* Dual-slot crossfade: Slot B */}
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
