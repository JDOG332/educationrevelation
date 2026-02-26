import { useState, useEffect, useRef } from "react";
import { PHI, PHI2 } from "../data.js";

/* ============================================================
   THE MULTIVERSE — Real N-Body Gravitational Simulation
   9 bodies = 9 layers. The Moon (layer 5) at center with 5x mass.
   4 mirror pairs (1↔9, 2↔8, 3↔7, 4↔6) as gravitationally bound binaries.
   Triangles drawn between every 3 nearby bodies = gravitational relationships.
   The math is real. F = Gm₁m₂/r². Velocity Verlet integration.
   ============================================================ */
/* ============================================================
   THE MULTIVERSE — Recursive N-Body Gravitational Simulation
   
   Level 1: 9 clusters, each orbiting by Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²
   Level 2: Inside each cluster, 9 bodies orbit by the same equation
   Total: 81 universes. 9² = 81. Two layers of the infinite recursion.
   
   The Moon cluster sits at center. Mirror pairs bind.
   Zoom out to see the macro. Zoom in to see the micro.
   Same math. Same truth. Every scale.
   ============================================================ */
export function Multiverse({ opacity = 1, showTriangles = true, showOrbits = true, zoom = 1, blur = 0, transitionTiming = "opacity 1.2s ease, transform 2.5s cubic-bezier(0.23,1,0.32,1), filter 2.5s cubic-bezier(0.23,1,0.32,1)" }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(null);

  const bodyColors = [
    "#3a3a5c", "#7b68ee", "#c9a84c", "#e05050", "#e8e8f0",
    "#8fbc8f", "#4fc3f7", "#ff9800", "#ce93d8",
  ];

  const mirrorPairs = [[0,8], [1,7], [2,6], [3,5]];

  const C_EFF = [1.0, 1.4, 1.8, 2.0, PHI2, 2.0, 1.8, 1.4, 1.0];

  const R_BASE = 0.5;
  const R_MIRROR_BONUS = PHI;
  const R_ADJACENT_BONUS = 0.3;
  const R_MOON_BONUS = 0.8;

  function getR12(i, j) {
    let r = R_BASE;
    if (mirrorPairs.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) r += R_MIRROR_BONUS;
    if (Math.abs(i - j) === 1) r += R_ADJACENT_BONUS;
    if (i === 4 || j === 4) r += R_MOON_BONUS;
    return r;
  }

  // Create a 9-body system at a given center with a given scale
  function createSystem(cx, cy, scale, velocityBase) {
    return Array.from({ length: 9 }, (_, i) => {
      const cEff = C_EFF[i];
      if (i === 4) {
        return { x: cx, y: cy, vx: 0, vy: 0, cEff, radius: 3 * scale, id: i, _trail: [] };
      }
      const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const r = scale * (35 + Math.random() * 25);
      const psi = getR12(i, 4) * cEff * C_EFF[4];
      const speed = Math.sqrt(psi / (r * 0.5)) * velocityBase * (0.8 + Math.random() * 0.4);
      const vAngle = angle + Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: Math.cos(vAngle) * speed,
        vy: Math.sin(vAngle) * speed,
        cEff,
        radius: (1.5 + cEff * 0.6) * scale,
        id: i,
        _trail: [],
      };
    });
  }

  // Simulate one 9-body system — the core equation applied
  function simulateSystem(bodies, dt, softening, damping, centerX, centerY, centerPull) {
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
      fx[i] += (centerX - bodies[i].x) * centerPull * bodies[i].cEff;
      fy[i] += (centerY - bodies[i].y) * centerPull * bodies[i].cEff;
    }

    for (let i = 0; i < N; i++) {
      const ax = fx[i] / bodies[i].cEff;
      const ay = fy[i] / bodies[i].cEff;
      bodies[i].vx = (bodies[i].vx + ax * dt) * damping;
      bodies[i].vy = (bodies[i].vy + ay * dt) * damping;
      bodies[i].x += bodies[i].vx * dt;
      bodies[i].y += bodies[i].vy * dt;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = (window.innerWidth < 768 || navigator.maxTouchPoints > 0) ? Math.min(window.devicePixelRatio || 1, 2) : (window.devicePixelRatio || 1);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const CX = W / 2;
    const CY = H / 2;
    const MACRO_R = Math.min(W, H) * 0.32;

    // Initialize state: 9 macro clusters, each containing 9 micro bodies
    if (!stateRef.current) {
      // Macro level: 9 cluster centers
      const macroBodies = Array.from({ length: 9 }, (_, i) => {
        const cEff = C_EFF[i] * 3; // macro clarity = sum of inner system
        if (i === 4) {
          return { x: CX, y: CY, vx: 0, vy: 0, cEff, id: i };
        }
        const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const r = MACRO_R * (0.6 + Math.random() * 0.5);
        const psi = getR12(i, 4) * cEff * C_EFF[4] * 3;
        const speed = Math.sqrt(psi / (r * 2)) * 0.15;
        const vAngle = angle + Math.PI / 2;
        return {
          x: CX + Math.cos(angle) * r,
          y: CY + Math.sin(angle) * r,
          vx: Math.cos(vAngle) * speed,
          vy: Math.sin(vAngle) * speed,
          cEff,
          id: i,
        };
      });

      // Micro level: 9 bodies inside each cluster
      const microSystems = macroBodies.map((mb, i) =>
        createSystem(mb.x, mb.y, i === 4 ? 1.3 : 0.9, 0.4)
      );

      stateRef.current = { macro: macroBodies, micro: microSystems };
    }

    const state = stateRef.current;

    function simulate() {
      // Simulate macro system (cluster centers)
      simulateSystem(state.macro, 0.4, 40, 0.9996, CX, CY, 0.00015);

      // Simulate each micro system (9 bodies within each cluster)
      for (let c = 0; c < 9; c++) {
        const center = state.macro[c];
        simulateSystem(state.micro[c], 0.3, 8, 0.9992, center.x, center.y, 0.001);
      }
    }

    function getTriangles(bodies) {
      const tris = [];
      for (const [a, b] of mirrorPairs) {
        tris.push([a, 4, b]);
      }
      return tris;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // === MACRO LEVEL: draw connections between clusters ===
      if (showTriangles) {
        const tris = getTriangles(state.macro);
        for (const [a, b, c] of tris) {
          ctx.beginPath();
          ctx.moveTo(state.macro[a].x, state.macro[a].y);
          ctx.lineTo(state.macro[b].x, state.macro[b].y);
          ctx.lineTo(state.macro[c].x, state.macro[c].y);
          ctx.closePath();
          ctx.fillStyle = "rgba(201,168,76,0.015)";
          ctx.strokeStyle = "rgba(201,168,76,0.06)";
          ctx.lineWidth = 0.5;
          ctx.fill();
          ctx.stroke();
        }
      }

      // Macro mirror pair lines
      for (const [a, b] of mirrorPairs) {
        ctx.beginPath();
        ctx.moveTo(state.macro[a].x, state.macro[a].y);
        ctx.lineTo(state.macro[b].x, state.macro[b].y);
        ctx.strokeStyle = "rgba(201,168,76,0.035)";
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // === MICRO LEVEL: draw each cluster's internal system ===
      for (let c = 0; c < 9; c++) {
        const cluster = state.micro[c];
        const isMoonCluster = c === 4;
        const clusterColor = bodyColors[c];

        // Cluster halo — the combined glow of the inner system
        const mc = state.macro[c];
        const haloR = isMoonCluster ? 55 : 38;
        const haloGrad = ctx.createRadialGradient(mc.x, mc.y, 0, mc.x, mc.y, haloR);
        haloGrad.addColorStop(0, clusterColor + "12");
        haloGrad.addColorStop(0.5, clusterColor + "06");
        haloGrad.addColorStop(1, clusterColor + "00");
        ctx.beginPath();
        ctx.arc(mc.x, mc.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Inner triangles (mirror pairs through micro-moon)
        if (showTriangles) {
          const microTris = getTriangles(cluster);
          for (const [a, b, cc] of microTris) {
            ctx.beginPath();
            ctx.moveTo(cluster[a].x, cluster[a].y);
            ctx.lineTo(cluster[b].x, cluster[b].y);
            ctx.lineTo(cluster[cc].x, cluster[cc].y);
            ctx.closePath();
            ctx.fillStyle = clusterColor + "05";
            ctx.strokeStyle = clusterColor + "15";
            ctx.lineWidth = 0.3;
            ctx.fill();
            ctx.stroke();
          }
        }

        // Orbit trails
        if (showOrbits) {
          for (let i = 0; i < cluster.length; i++) {
            if (i === 4) continue;
            const b = cluster[i];
            b._trail.push({ x: b.x, y: b.y });
            if (b._trail.length > 40) b._trail.shift();
            if (b._trail.length > 2) {
              ctx.beginPath();
              ctx.moveTo(b._trail[0].x, b._trail[0].y);
              for (let t = 1; t < b._trail.length; t++) {
                ctx.lineTo(b._trail[t].x, b._trail[t].y);
              }
              ctx.strokeStyle = clusterColor + "10";
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }

        // Individual bodies within cluster
        for (let i = 0; i < cluster.length; i++) {
          const b = cluster[i];
          const isMicroMoon = i === 4;

          // Glow
          const glowR = b.radius * (isMicroMoon ? 6 : 4);
          const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowR);
          glow.addColorStop(0, clusterColor + (isMicroMoon ? "35" : "25"));
          glow.addColorStop(0.4, clusterColor + "08");
          glow.addColorStop(1, clusterColor + "00");
          ctx.beginPath();
          ctx.arc(b.x, b.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          const coreGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          coreGrad.addColorStop(0, isMicroMoon && isMoonCluster ? "#ffffff" : clusterColor);
          coreGrad.addColorStop(1, clusterColor + "60");
          ctx.fillStyle = coreGrad;
          ctx.fill();

          // Center dot
          if (isMicroMoon || isMoonCluster) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, isMicroMoon && isMoonCluster ? 1.5 : 0.8, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          }
        }
      }
    }

    function loop() {
      simulate();
      simulate();
      draw();
      frameRef.current = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [showTriangles, showOrbits]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        zIndex: 1,
        transition: transitionTiming,
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
        filter: blur > 0 ? `blur(${blur}px)` : "none",
      }}
    />
  );
}
