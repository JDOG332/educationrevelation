import { useState, useEffect, useRef, useCallback } from "react";

const PHI = 1.618;

const LAYER_COLORS = [
  "#3a3a5c", "#7b68ee", "#c9a84c", "#e05050", "#e8e8f0",
  "#8fbc8f", "#4fc3f7", "#ff9800", "#ce93d8",
];

const LAYER_NAMES = [
  "SEED", "ROOT", "SPINE", "MIRROR", "MOON",
  "SKIN", "LOOP", "EYE", "ARROW"
];

const MIRROR_PAIRS = [[0,8], [1,7], [2,6], [3,5]];

/* 
  THE FRACTAL MULTIVERSE
  
  Level 0: 1 universe (the whole)
  Level 1: 9 clusters (the current view) 
  Level 2: 81 universes (9×9) — each cluster contains 9 bodies
  Level 3: 729 universes (9×9×9) — theoretical, shown as glow
  
  Same equation at every level: Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²
  
  The user can zoom: scroll/pinch to go deeper into any cluster
  Click a cluster to zoom into its internal structure
*/

export default function MultiverseFractal({ style }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0); // 0 = macro, 1 = meso, 2 = micro
  const [focusCluster, setFocusCluster] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const C_EFF = [1.0, 1.4, 1.8, 2.0, PHI * PHI, 2.0, 1.8, 1.4, 1.0];

  function getR12(i, j) {
    let r = 0.5;
    if (MIRROR_PAIRS.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) r += PHI;
    if (Math.abs(i - j) === 1) r += 0.3;
    if (i === 4 || j === 4) r += 0.8;
    return r;
  }

  function createSystem(cx, cy, scale, velocityBase) {
    return Array.from({ length: 9 }, (_, i) => {
      if (i === 4) {
        return { x: cx, y: cy, vx: 0, vy: 0, cEff: C_EFF[i], radius: 3 * scale, id: i, trail: [] };
      }
      const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const r = scale * (35 + Math.random() * 25);
      const psi = getR12(i, 4) * C_EFF[i] * C_EFF[4];
      const speed = Math.sqrt(psi / (r * 0.5)) * velocityBase * (0.8 + Math.random() * 0.4);
      const vAngle = angle + Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: Math.cos(vAngle) * speed,
        vy: Math.sin(vAngle) * speed,
        cEff: C_EFF[i],
        radius: (1.5 + C_EFF[i] * 0.6) * scale,
        id: i,
        trail: [],
      };
    });
  }

  function simulateSystem(bodies, dt, softening, damping, cx, cy, centerPull) {
    const N = bodies.length;
    const fx = new Float64Array(N);
    const fy = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const distSq = dx * dx + dy * dy + softening * softening;
        const dist = Math.sqrt(distSq);
        const R12 = getR12(bodies[i].id, bodies[j].id);
        const psi = R12 * bodies[i].cEff * bodies[j].cEff / distSq;
        const forceX = psi * dx / dist;
        const forceY = psi * dy / dist;
        fx[i] += forceX; fy[i] += forceY;
        fx[j] -= forceX; fy[j] -= forceY;
      }
      fx[i] += (cx - bodies[i].x) * centerPull * bodies[i].cEff;
      fy[i] += (cy - bodies[i].y) * centerPull * bodies[i].cEff;
    }
    for (let i = 0; i < N; i++) {
      bodies[i].vx = (bodies[i].vx + fx[i] / bodies[i].cEff * dt) * damping;
      bodies[i].vy = (bodies[i].vy + fy[i] / bodies[i].cEff * dt) * damping;
      bodies[i].x += bodies[i].vx * dt;
      bodies[i].y += bodies[i].vy * dt;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const W = canvas.parentElement?.clientWidth || window.innerWidth;
      const H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { W, H };
    }

    let { W, H } = resize();
    const CX = W / 2;
    const CY = H / 2;
    const BASE_R = Math.min(W, H) * 0.35;

    // Initialize 3-level hierarchy
    if (!stateRef.current) {
      // Level 0: 9 super-clusters
      const superClusters = Array.from({ length: 9 }, (_, i) => {
        const cEff = C_EFF[i] * 5;
        if (i === 4) return { x: CX, y: CY, vx: 0, vy: 0, cEff, id: i };
        const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const r = BASE_R * (0.55 + Math.random() * 0.45);
        const speed = Math.sqrt(getR12(i, 4) * cEff * C_EFF[4] * 5 / (r * 2)) * 0.08;
        const vAngle = angle + Math.PI / 2;
        return {
          x: CX + Math.cos(angle) * r,
          y: CY + Math.sin(angle) * r,
          vx: Math.cos(vAngle) * speed,
          vy: Math.sin(vAngle) * speed,
          cEff, id: i,
        };
      });

      // Level 1: 9 clusters inside each super-cluster
      const clusters = superClusters.map((sc, si) => {
        return Array.from({ length: 9 }, (_, i) => {
          const cEff = C_EFF[i] * 3;
          if (i === 4) return { x: sc.x, y: sc.y, vx: 0, vy: 0, cEff, id: i };
          const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
          const r = (si === 4 ? 45 : 30) * (0.7 + Math.random() * 0.6);
          const speed = Math.sqrt(getR12(i, 4) * cEff * C_EFF[4] * 3 / (r * 2)) * 0.2;
          const vAngle = angle + Math.PI / 2;
          return {
            x: sc.x + Math.cos(angle) * r,
            y: sc.y + Math.sin(angle) * r,
            vx: Math.cos(vAngle) * speed,
            vy: Math.sin(vAngle) * speed,
            cEff, id: i,
          };
        });
      });

      // Level 2: 9 bodies inside each cluster (81 per super-cluster = 729 total)
      const bodies = clusters.map((cluster, ci) =>
        cluster.map((c, cj) =>
          createSystem(c.x, c.y, ci === 4 && cj === 4 ? 0.6 : 0.35, 0.3)
        )
      );

      stateRef.current = { super: superClusters, clusters, bodies };
    }

    const state = stateRef.current;

    function simulate() {
      // Super-cluster level
      simulateSystem(state.super, 0.3, 60, 0.9997, CX, CY, 0.00008);

      // Cluster level
      for (let si = 0; si < 9; si++) {
        const sc = state.super[si];
        simulateSystem(state.clusters[si], 0.25, 15, 0.9994, sc.x, sc.y, 0.0005);
      }

      // Body level (only simulate visible ones for performance)
      for (let si = 0; si < 9; si++) {
        for (let ci = 0; ci < 9; ci++) {
          const center = state.clusters[si][ci];
          simulateSystem(state.bodies[si][ci], 0.2, 5, 0.999, center.x, center.y, 0.002);
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // === LEVEL 0: Super-cluster connections ===
      // Triangle connections through moon
      for (const [a, b] of MIRROR_PAIRS) {
        const sa = state.super[a];
        const sb = state.super[b];
        const sm = state.super[4];

        // Triangle fill
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sm.x, sm.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.closePath();
        ctx.fillStyle = "rgba(201,168,76,0.008)";
        ctx.strokeStyle = "rgba(201,168,76,0.03)";
        ctx.lineWidth = 0.3;
        ctx.fill();
        ctx.stroke();

        // Mirror pair line
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = "rgba(201,168,76,0.02)";
        ctx.lineWidth = 0.2;
        ctx.stroke();
      }

      // === LEVEL 1: Cluster connections within each super-cluster ===
      for (let si = 0; si < 9; si++) {
        const cluster = state.clusters[si];
        const sc = state.super[si];
        const color = LAYER_COLORS[si];

        // Super-cluster halo
        const haloR = si === 4 ? 80 : 55;
        const hg = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, haloR);
        hg.addColorStop(0, color + "08");
        hg.addColorStop(0.5, color + "03");
        hg.addColorStop(1, color + "00");
        ctx.beginPath();
        ctx.arc(sc.x, sc.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();

        // Internal mirror triangles
        for (const [a, b] of MIRROR_PAIRS) {
          ctx.beginPath();
          ctx.moveTo(cluster[a].x, cluster[a].y);
          ctx.lineTo(cluster[4].x, cluster[4].y);
          ctx.lineTo(cluster[b].x, cluster[b].y);
          ctx.closePath();
          ctx.fillStyle = color + "03";
          ctx.strokeStyle = color + "08";
          ctx.lineWidth = 0.2;
          ctx.fill();
          ctx.stroke();
        }

        // === LEVEL 2: Individual bodies ===
        for (let ci = 0; ci < 9; ci++) {
          const innerBodies = state.bodies[si][ci];
          const cCenter = cluster[ci];
          const innerColor = LAYER_COLORS[ci];

          // Cluster halo
          const ch = ctx.createRadialGradient(cCenter.x, cCenter.y, 0, cCenter.x, cCenter.y, 18);
          ch.addColorStop(0, innerColor + "0a");
          ch.addColorStop(1, innerColor + "00");
          ctx.beginPath();
          ctx.arc(cCenter.x, cCenter.y, 18, 0, Math.PI * 2);
          ctx.fillStyle = ch;
          ctx.fill();

          // Bodies
          for (let bi = 0; bi < innerBodies.length; bi++) {
            const b = innerBodies[bi];
            const isMoon = bi === 4;

            // Glow
            const glowR = b.radius * (isMoon ? 5 : 3);
            const bg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowR);
            bg.addColorStop(0, innerColor + (isMoon ? "20" : "15"));
            bg.addColorStop(0.5, innerColor + "06");
            bg.addColorStop(1, innerColor + "00");
            ctx.beginPath();
            ctx.arc(b.x, b.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = bg;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            const cg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
            cg.addColorStop(0, isMoon && ci === 4 && si === 4 ? "#ffffff" : innerColor);
            cg.addColorStop(1, innerColor + "40");
            ctx.fillStyle = cg;
            ctx.fill();
          }
        }
      }

      // === Labels for super-clusters ===
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let si = 0; si < 9; si++) {
        const sc = state.super[si];
        ctx.font = `${si === 4 ? 11 : 8}px 'Cinzel', serif`;
        ctx.fillStyle = LAYER_COLORS[si] + (si === 4 ? "60" : "30");
        ctx.fillText(LAYER_NAMES[si], sc.x, sc.y - (si === 4 ? 65 : 45));
      }

      // Center label
      ctx.font = "10px 'Cinzel', serif";
      ctx.fillStyle = "rgba(201,168,76,0.2)";
      ctx.fillText("9 × 9 × 9 = 729", CX, CY + BASE_R + 30);
      ctx.font = "7px 'Cinzel', serif";
      ctx.fillStyle = "rgba(201,168,76,0.12)";
      ctx.fillText("SAME EQUATION · EVERY SCALE", CX, CY + BASE_R + 44);
    }

    function loop() {
      simulate();
      draw();
      frameRef.current = requestAnimationFrame(loop);
    }

    loop();

    const handleResize = () => { ({ W, H } = resize()); };
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {/* Equation overlay */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        textAlign: "center", pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 2.5vw, 20px)",
          fontStyle: "italic", fontWeight: 300,
          color: "rgba(232,232,240,0.4)",
          letterSpacing: 2,
          textShadow: "0 0 20px rgba(201,168,76,0.1)",
        }}>
          <span style={{ color: "rgba(232,232,240,0.6)" }}>Ψ</span>
          <span style={{ color: "rgba(232,232,240,0.3)", margin: "0 0.3em" }}>=</span>
          <span style={{ color: "rgba(201,168,76,0.55)" }}>R</span>
          <sub style={{ fontSize: "0.6em", color: "rgba(201,168,76,0.4)" }}>12</sub>
          <span style={{ color: "rgba(232,232,240,0.25)", margin: "0 0.2em" }}>×</span>
          <span style={{ color: "rgba(232,232,240,0.3)" }}>(</span>
          <span style={{ color: "rgba(79,195,247,0.55)" }}>C</span>
          <sub style={{ fontSize: "0.5em", color: "rgba(79,195,247,0.4)" }}>eff</sub>
          <span style={{ color: "rgba(232,232,240,0.25)", margin: "0 0.15em" }}>·</span>
          <span style={{ color: "rgba(206,147,216,0.55)" }}>D̂</span>
          <span style={{ color: "rgba(232,232,240,0.3)" }}>)</span>
          <span style={{ color: "rgba(232,232,240,0.2)", margin: "0 0.2em" }}>/</span>
          <span style={{ color: "rgba(232,232,240,0.3)" }}>dist²</span>
        </div>
      </div>
    </div>
  );
}
