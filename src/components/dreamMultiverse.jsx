import { useRef, useEffect } from "react";
import { PHI } from "../data.js";

/* ============================================================
   DREAM MULTIVERSE — 9³ = 729-body N-body gravitational simulation
   
   DEPTH 1: The Dance — zoom in, zoom out, collapse to dot
   DEPTH 2: The Veil Parts — stars gather into a curtain, then split
            apart to reveal the poem waiting behind them.
   
   The universe was hiding the truth. Then it steps aside.
   ============================================================ */

const CLUSTER_COLORS = [
  "#3a3a5c", "#7b68ee", "#c9a84c", "#e05050", "#e8e8f0",
  "#8fbc8f", "#4fc3f7", "#ff9800", "#ce93d8",
];
const MIRROR_PAIRS = [[0,8],[1,7],[2,6],[3,5]];
const C_EFF = [1.0, 1.4, 1.8, 2.0, PHI * PHI, 2.0, 1.8, 1.4, 1.0];

function getR12(i, j) {
  let r = 0.5;
  if (MIRROR_PAIRS.some(([a,b]) => (a===i&&b===j)||(a===j&&b===i))) r += PHI;
  if (Math.abs(i-j) === 1) r += 0.3;
  if (i === 4 || j === 4) r += 0.8;
  return r;
}

function simLevel(bodies, dt, softening, damping, ax, ay, pull) {
  const N = bodies.length;
  const fx = new Float64Array(N), fy = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      const distSq = dx*dx + dy*dy + softening*softening;
      const dist = Math.sqrt(distSq);
      const R12 = getR12(bodies[i].id, bodies[j].id);
      const psi = R12 * bodies[i].cEff * bodies[j].cEff / distSq;
      fx[i] += psi*dx/dist; fy[i] += psi*dy/dist;
      fx[j] -= psi*dx/dist; fy[j] -= psi*dy/dist;
    }
    fx[i] += (ax - bodies[i].x) * pull * bodies[i].cEff;
    fy[i] += (ay - bodies[i].y) * pull * bodies[i].cEff;
  }
  for (let i = 0; i < N; i++) {
    bodies[i].vx = (bodies[i].vx + fx[i]/bodies[i].cEff*dt) * damping;
    bodies[i].vy = (bodies[i].vy + fy[i]/bodies[i].cEff*dt) * damping;
    bodies[i].x += bodies[i].vx*dt;
    bodies[i].y += bodies[i].vy*dt;
  }
}

export default function DreamMultiverseCanvas({ depth, goDeeper, onVeilParted }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(null);
  const depthRef = useRef(depth);
  const goDeeperRef = useRef(goDeeper);
  const onVeilPartedRef = useRef(onVeilParted);
  depthRef.current = depth;
  goDeeperRef.current = goDeeper;
  onVeilPartedRef.current = onVeilParted;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);
    // Mobile: 2 levels (9×9 = 81 bodies). Desktop: 3 levels (9×9×9 = 729 bodies).
    const DEPTH_LEVELS = isMobile ? 2 : 3;

    function resize() {
      const W = canvas.parentElement?.clientWidth || window.innerWidth;
      const H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { W, H };
    }

    let { W, H } = resize();
    const CX = W / 2, CY = H / 2;
    const BASE_R = Math.min(W, H) * 0.40;

    // ===== MULTIVERSE INIT =====
    let allClusters = [];

    if (!stateRef.current || stateRef.current._levels !== DEPTH_LEVELS) {
      if (DEPTH_LEVELS === 3) {
        // Desktop: 9 hyper × 9 super × 9 cluster = 729
        const hypers = Array.from({ length: 9 }, (_, hi) => {
          const angle = (hi/9)*Math.PI*2 + (Math.random()-0.5)*0.3;
          const r = hi === 4 ? 0 : BASE_R * (0.55 + Math.random()*0.35);
          const speed = hi === 4 ? 0 : Math.sqrt(getR12(hi,4)*C_EFF[hi]*C_EFF[4]*5/(Math.max(r,1)*2))*0.03;
          const va = angle + Math.PI/2;
          const hx = CX + Math.cos(angle)*r, hy = CY + Math.sin(angle)*r;
          const supers = Array.from({ length: 9 }, (_, si) => {
            const sa = (si/9)*Math.PI*2 + (Math.random()-0.5)*0.4;
            const sr = si === 4 ? 0 : (hi === 4 ? 50 : 35) * (0.6 + Math.random()*0.5);
            const sspeed = si === 4 ? 0 : Math.sqrt(getR12(si,4)*C_EFF[si]*C_EFF[4]*4/(Math.max(sr,1)*2))*0.07;
            const sva = sa + Math.PI/2;
            const sx = hx + Math.cos(sa)*sr, sy = hy + Math.sin(sa)*sr;
            const clusters = Array.from({ length: 9 }, (_, ci) => {
              const ca = (ci/9)*Math.PI*2 + (Math.random()-0.5)*0.5;
              const cr = ci === 4 ? 0 : (hi===4&&si===4 ? 18 : 12) * (0.6 + Math.random()*0.5);
              const cspeed = ci === 4 ? 0 : Math.sqrt(getR12(ci,4)*C_EFF[ci]*C_EFF[4]*2/(Math.max(cr,1)*2))*0.14;
              const cva = ca + Math.PI/2;
              const ccx = sx + Math.cos(ca)*cr, ccy = sy + Math.sin(ca)*cr;
              return {
                x: ccx, y: ccy, vx: Math.cos(cva)*cspeed, vy: Math.sin(cva)*cspeed,
                cEff: C_EFF[ci]*2, id: ci,
                veilX: Math.random() * W, veilY: Math.random() * H,
                hi, si, ci,
              };
            });
            return { x: sx, y: sy, vx: Math.cos(sva)*sspeed, vy: Math.sin(sva)*sspeed, cEff: C_EFF[si]*4, id: si, clusters };
          });
          return { x: hx, y: hy, vx: Math.cos(va)*speed, vy: Math.sin(va)*speed, cEff: C_EFF[hi]*7, id: hi, supers };
        });
        stateRef.current = { hypers, _levels: 3 };
      } else {
        // Mobile: 9 super × 9 cluster = 81 (skip hyper level)
        const supers = Array.from({ length: 9 }, (_, si) => {
          const sa = (si/9)*Math.PI*2 + (Math.random()-0.5)*0.3;
          const sr = si === 4 ? 0 : BASE_R * (0.55 + Math.random()*0.35);
          const sspeed = si === 4 ? 0 : Math.sqrt(getR12(si,4)*C_EFF[si]*C_EFF[4]*5/(Math.max(sr,1)*2))*0.04;
          const sva = sa + Math.PI/2;
          const sx = CX + Math.cos(sa)*sr, sy = CY + Math.sin(sa)*sr;
          const clusters = Array.from({ length: 9 }, (_, ci) => {
            const ca = (ci/9)*Math.PI*2 + (Math.random()-0.5)*0.5;
            const cr = ci === 4 ? 0 : (si===4 ? 35 : 22) * (0.6 + Math.random()*0.5);
            const cspeed = ci === 4 ? 0 : Math.sqrt(getR12(ci,4)*C_EFF[ci]*C_EFF[4]*3/(Math.max(cr,1)*2))*0.1;
            const cva = ca + Math.PI/2;
            const ccx = sx + Math.cos(ca)*cr, ccy = sy + Math.sin(ca)*cr;
            return {
              x: ccx, y: ccy, vx: Math.cos(cva)*cspeed, vy: Math.sin(cva)*cspeed,
              cEff: C_EFF[ci]*3, id: ci,
              veilX: Math.random() * W, veilY: Math.random() * H,
              hi: 0, si, ci,
            };
          });
          return { x: sx, y: sy, vx: Math.cos(sva)*sspeed, vy: Math.sin(sva)*sspeed, cEff: C_EFF[si]*5, id: si, clusters };
        });
        stateRef.current = { supers, _levels: 2 };
      }
    }

    // Flatten
    const state = stateRef.current;
    allClusters = [];
    if (state._levels === 3) {
      for (const hc of state.hypers)
        for (const sc of hc.supers)
          for (const cl of sc.clusters)
            allClusters.push(cl);
    } else {
      for (const sc of state.supers)
        for (const cl of sc.clusters)
          allClusters.push(cl);
    }

    // Assign veil targets — evenly spread across screen like a curtain
    const totalBodies = allClusters.length;
    allClusters.forEach((cl, i) => {
      const cols = Math.ceil(Math.sqrt(totalBodies * (W / H)));
      const rows = Math.ceil(totalBodies / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      cl.veilX = (col + 0.5) / cols * W + (Math.random() - 0.5) * (W / cols * 0.6);
      cl.veilY = (row + 0.5) / rows * H + (Math.random() - 0.5) * (H / rows * 0.6);
    });

    const speedScale = Math.max(1, 1200 / Math.max(W, H));
    const zoomTarget = [0,1,2,3,5,6,7,8][Math.floor(Math.random()*8)];

    let mvTime = 0;
    let transitioned = false;
    let depth2Start = null;
    let veilParted = false;

    function simulate(morphPhase, partProgress) {
      if (morphPhase === "dance") {
        if (state._levels === 3) {
          simLevel(state.hypers, 0.4 * speedScale, 70, 0.9998, CX, CY, 0.00004 * speedScale);
          for (const hc of state.hypers)
            simLevel(hc.supers, 0.35 * speedScale, 28, 0.9996, hc.x, hc.y, 0.0002 * speedScale);
          for (const hc of state.hypers)
            for (const sc of hc.supers)
              simLevel(sc.clusters, 0.28 * speedScale, 8, 0.9993, sc.x, sc.y, 0.0008 * speedScale);
        } else {
          // Mobile 2-level: super → cluster
          simLevel(state.supers, 0.4 * speedScale, 50, 0.9998, CX, CY, 0.00006 * speedScale);
          for (const sc of state.supers)
            simLevel(sc.clusters, 0.32 * speedScale, 10, 0.9994, sc.x, sc.y, 0.0006 * speedScale);
        }
        return;
      }

      // During veil: pull toward veil positions (+ part offset)
      for (const cl of allClusters) {
        let tx = cl.veilX;
        let ty = cl.veilY;

        // Parting: left side goes left, right side goes right
        if (partProgress > 0) {
          const side = cl.veilX < CX ? -1 : 1;
          tx += side * partProgress * W * 0.55;
        }

        const dx = tx - cl.x;
        const dy = ty - cl.y;
        const pull = morphPhase === "gather" ? 0.06 : 0.02;
        cl.vx += dx * pull;
        cl.vy += dy * pull;
        cl.vx *= 0.88;
        cl.vy *= 0.88;
        cl.x += cl.vx;
        cl.y += cl.vy;
      }
    }

    function drawBodies(cameraZoom, cameraPanX, cameraPanY, useCamera, brightness) {
      if (useCamera) {
        ctx.save();
        ctx.translate(CX, CY);
        ctx.scale(cameraZoom, cameraZoom);
        ctx.translate(-CX + cameraPanX, -CY + cameraPanY);
      }

      // Halos — only during dance when not collapsing
      if (brightness < 0.1) {
        const topLevel = state._levels === 3 ? state.hypers : state.supers;
        for (let hi = 0; hi < 9; hi++) {
          const hc = topLevel[hi];
          const hColor = CLUSTER_COLORS[hi];
          const hhR = hi === 4 ? 100 : 65;
          const hhg = ctx.createRadialGradient(hc.x, hc.y, 0, hc.x, hc.y, hhR);
          hhg.addColorStop(0, hColor + "04"); hhg.addColorStop(0.5, hColor + "01"); hhg.addColorStop(1, hColor + "00");
          ctx.beginPath(); ctx.arc(hc.x, hc.y, hhR, 0, Math.PI*2); ctx.fillStyle = hhg; ctx.fill();

          if (state._levels === 3) {
            for (let si = 0; si < 9; si++) {
              const sc = hc.supers[si];
              const sColor = CLUSTER_COLORS[si];
              const shR = (hi===4&&si===4) ? 40 : si===4 ? 25 : 18;
              const shg = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, shR);
              shg.addColorStop(0, sColor + "05"); shg.addColorStop(0.6, sColor + "02"); shg.addColorStop(1, sColor + "00");
              ctx.beginPath(); ctx.arc(sc.x, sc.y, shR, 0, Math.PI*2); ctx.fillStyle = shg; ctx.fill();
            }
          }
        }

        // Mirror triangles
        const mirrorSource = state._levels === 3 ? state.hypers : state.supers;
        for (const [a, b] of MIRROR_PAIRS) {
          const ha = mirrorSource[a], hb = mirrorSource[b], hm = mirrorSource[4];
          ctx.beginPath(); ctx.moveTo(ha.x, ha.y); ctx.lineTo(hm.x, hm.y); ctx.lineTo(hb.x, hb.y); ctx.closePath();
          ctx.fillStyle = "rgba(201,168,76,0.003)"; ctx.strokeStyle = "rgba(201,168,76,0.008)";
          ctx.lineWidth = 0.3; ctx.fill(); ctx.stroke();
        }
      }

      // The 729 particles
      for (const cl of allClusters) {
        const cColor = CLUSTER_COLORS[cl.ci];
        const isCoreMoon = cl.hi===4 && cl.si===4 && cl.ci===4;
        const isMoon = cl.ci === 4;
        const mRadius = (isCoreMoon ? 2.0 : isMoon ? 1.2 : 0.7) + brightness * 0.2;
        const mGlowR = mRadius * (isCoreMoon ? 8 : isMoon ? 4 : 2.5);
        const baseAlpha = isCoreMoon ? 0.15 : isMoon ? 0.07 : 0.03;
        const glowAlpha = baseAlpha + brightness * 0.08;

        const mg = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, mGlowR);
        mg.addColorStop(0, `rgba(232,232,240,${glowAlpha})`);
        mg.addColorStop(0.5, `rgba(232,232,240,${glowAlpha * 0.3})`);
        mg.addColorStop(1, "rgba(232,232,240,0)");
        ctx.beginPath(); ctx.arc(cl.x, cl.y, mGlowR, 0, Math.PI*2); ctx.fillStyle = mg; ctx.fill();

        ctx.beginPath(); ctx.arc(cl.x, cl.y, mRadius, 0, Math.PI*2);
        const mcg = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, mRadius);
        mcg.addColorStop(0, isCoreMoon ? "#ffffff" : isMoon ? "#e8e8f0" : cColor);
        mcg.addColorStop(1, cColor + "30");
        ctx.fillStyle = mcg; ctx.fill();
      }

      if (useCamera) ctx.restore();
    }

    // ===== MAIN LOOP =====
    let depthOneStart = null;

    function loop(now) {
      if (depthRef.current >= 1 && depthOneStart === null) depthOneStart = now;
      const zoomElapsed = depthOneStart ? (now - depthOneStart) / 1000 : 0;

      if (depthRef.current >= 2 && depth2Start === null) depth2Start = now;
      const veilElapsed = depth2Start ? (now - depth2Start) / 1000 : 0;

      ctx.clearRect(0, 0, W, H);

      // === DEPTH 1: The Dance ===
      if (depthRef.current === 1) {
        simulate("dance", 0);

        const z1Start = 1.0, z1End = 8.0;
        const z1t = Math.max(0, Math.min(1, (zoomElapsed - z1Start) / (z1End - z1Start)));
        const z1eased = z1t * z1t * (3 - 2 * z1t);

        const z2Start = 8.0, z2End = 13.0;
        const z2t = Math.max(0, Math.min(1, (zoomElapsed - z2Start) / (z2End - z2Start)));
        const z2eased = z2t * z2t * (3 - 2 * z2t);

        let zoom, panX, panY;
        const target = (state._levels === 3 ? state.hypers : state.supers)[zoomTarget];

        if (zoomElapsed < z2Start) {
          zoom = 5 + (1 - 5) * z1eased;
          panX = (CX - target.x) * (1 - z1eased);
          panY = (CY - target.y) * (1 - z1eased);
        } else {
          zoom = 1 + (0.04 - 1) * z2eased;
          panX = 0; panY = 0;
        }

        drawBodies(zoom, panX, panY, true, 0);

        // White glow during collapse
        if (z2eased > 0.01) {
          const glowRadius = 20 + z2eased * 80;
          const glowAlpha = z2eased * 0.9;
          const wg = ctx.createRadialGradient(CX, CY, 0, CX, CY, glowRadius);
          wg.addColorStop(0, `rgba(255,255,255,${glowAlpha})`);
          wg.addColorStop(0.4, `rgba(232,232,240,${glowAlpha * 0.5})`);
          wg.addColorStop(1, "rgba(232,232,240,0)");
          ctx.beginPath(); ctx.arc(CX, CY, glowRadius, 0, Math.PI*2);
          ctx.fillStyle = wg; ctx.fill();
        }


        // Auto-transition to depth 2
        if (zoomElapsed > 14 && !transitioned) {
          transitioned = true;
          goDeeperRef.current(true);
        }
      }

      // === DEPTH 2: White hole expands back to multiverse, then poem appears ===
      if (depthRef.current === 2) {
        // Reverse the collapse: zoom from 0.04x back to 1x over 7 seconds
        const EXPAND_DUR = 7;
        const expandT = Math.min(1, veilElapsed / EXPAND_DUR);
        const expandEased = expandT * expandT * (3 - 2 * expandT);

        // Zoom: 0.04 → 1 (reverse of the collapse)
        const zoom = 0.04 + (1 - 0.04) * expandEased;

        // White glow fades as we expand
        const glowFade = 1 - expandEased;

        // Keep simulation running
        simulate("dance", 0);

        drawBodies(zoom, 0, 0, true, 0);

        // White glow shrinking as multiverse re-emerges
        if (glowFade > 0.01) {
          const glowRadius = 20 + glowFade * 80;
          const glowAlpha = glowFade * 0.9;
          const wg = ctx.createRadialGradient(CX, CY, 0, CX, CY, glowRadius);
          wg.addColorStop(0, `rgba(255,255,255,${glowAlpha})`);
          wg.addColorStop(0.4, `rgba(232,232,240,${glowAlpha * 0.5})`);
          wg.addColorStop(1, "rgba(232,232,240,0)");
          ctx.beginPath(); ctx.arc(CX, CY, glowRadius, 0, Math.PI*2);
          ctx.fillStyle = wg; ctx.fill();
        }

        // Signal poem reveal once expansion is complete
        if (expandT >= 1 && !veilParted) {
          veilParted = true;
          if (onVeilPartedRef.current) onVeilPartedRef.current();
        }
      }

      if (depthRef.current > 2) return;
      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);
    const handleResize = () => { ({ W, H } = resize()); };
    window.addEventListener("resize", handleResize);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}
