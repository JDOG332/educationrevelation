import { useRef, useEffect } from "react";
import { PHI } from "../data.js";

/* ============================================================
   DREAM MULTIVERSE — 9⁴ = 6,561-body N-body gravitational simulation
   
   4-tier hierarchy: hyper-clusters → super-clusters → clusters → dust
   Same equation at every scale: Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²
   Mirror pairs: [0,8] [1,7] [2,6] [3,5] — Moon at center (4)
   
   This is a STABLE top-level component. It must NOT be defined
   inside a render function or it will remount on every state change.
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

export default function DreamMultiverseCanvas({ depth, goDeeper }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(null);
  const depthRef = useRef(depth);
  const goDeeperRef = useRef(goDeeper);
  depthRef.current = depth;
  goDeeperRef.current = goDeeper;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

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
    if (!stateRef.current) {
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
            const bodies = Array.from({ length: 9 }, (_, bi) => {
              const ba = (bi/9)*Math.PI*2 + (Math.random()-0.5)*0.6;
              const br = bi === 4 ? 0 : (3 + Math.random()*4) * (hi===4&&si===4&&ci===4 ? 1.3 : 0.6);
              const bspeed = bi === 4 ? 0 : Math.sqrt(getR12(bi,4)*C_EFF[bi]*C_EFF[4]/(Math.max(br,1)))*0.2;
              const bva = ba + Math.PI/2;
              return {
                x: ccx + Math.cos(ba)*br, y: ccy + Math.sin(ba)*br,
                vx: Math.cos(bva)*bspeed, vy: Math.sin(bva)*bspeed,
                cEff: C_EFF[bi], id: bi,
                radius: (0.3 + C_EFF[bi]*0.15) * (hi===4&&si===4&&ci===4&&bi===4 ? 2.5 : 1),
              };
            });
            return { x: ccx, y: ccy, vx: Math.cos(cva)*cspeed, vy: Math.sin(cva)*cspeed, cEff: C_EFF[ci]*2, id: ci, bodies };
          });
          return { x: sx, y: sy, vx: Math.cos(sva)*sspeed, vy: Math.sin(sva)*sspeed, cEff: C_EFF[si]*4, id: si, clusters };
        });
        return { x: hx, y: hy, vx: Math.cos(va)*speed, vy: Math.sin(va)*speed, cEff: C_EFF[hi]*7, id: hi, supers };
      });
      stateRef.current = { hypers };
    }

    const state = stateRef.current;
    const speedScale = Math.max(1, 1200 / Math.max(W, H));
    const zoomTarget = [0,1,2,3,5,6,7,8][Math.floor(Math.random()*8)];

    let startTime = null;
    let mvTime = 0;
    let transitioned = false;

    function simulate() {
      simLevel(state.hypers, 0.4 * speedScale, 70, 0.9998, CX, CY, 0.00004 * speedScale);
      for (const hc of state.hypers) simLevel(hc.supers, 0.35 * speedScale, 28, 0.9996, hc.x, hc.y, 0.0002 * speedScale);
      for (const hc of state.hypers) for (const sc of hc.supers) simLevel(sc.clusters, 0.28 * speedScale, 8, 0.9993, sc.x, sc.y, 0.0008 * speedScale);
      for (const hc of state.hypers) for (const sc of hc.supers) for (const cl of sc.clusters) simLevel(cl.bodies, 0.22 * speedScale, 2.5, 0.999, cl.x, cl.y, 0.003 * speedScale);
    }

    function drawMultiverse(elapsed) {
      // Camera zoom — only starts once the veil is fully lifted (depth === 1)
      const zoomEnabled = depthRef.current === 1;
      const zoomStart = zoomEnabled ? 1.0 : 99999;
      const zoomEnd = zoomStart + 7;
      const zoomProgress = Math.max(0, Math.min(1, (elapsed - zoomStart) / (zoomEnd - zoomStart)));
      const eased = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      const targetZoom = 5;
      const zoom = 1 + (targetZoom - 1) * eased;
      const target = state.hypers[zoomTarget];
      const panX = (CX - target.x) * eased;
      const panY = (CY - target.y) * eased;

      ctx.save();
      ctx.translate(CX, CY);
      ctx.scale(zoom, zoom);
      ctx.translate(-CX + panX, -CY + panY);

      // Mirror triangles
      for (const [a, b] of MIRROR_PAIRS) {
        const ha = state.hypers[a], hb = state.hypers[b], hm = state.hypers[4];
        ctx.beginPath(); ctx.moveTo(ha.x, ha.y); ctx.lineTo(hm.x, hm.y); ctx.lineTo(hb.x, hb.y); ctx.closePath();
        ctx.fillStyle = "rgba(201,168,76,0.003)"; ctx.strokeStyle = "rgba(201,168,76,0.008)";
        ctx.lineWidth = 0.3; ctx.fill(); ctx.stroke();
      }

      for (let hi = 0; hi < 9; hi++) {
        const hc = state.hypers[hi];
        const hColor = CLUSTER_COLORS[hi];
        const hhR = hi === 4 ? 100 : 65;
        const hhg = ctx.createRadialGradient(hc.x, hc.y, 0, hc.x, hc.y, hhR);
        hhg.addColorStop(0, hColor + "04"); hhg.addColorStop(0.5, hColor + "01"); hhg.addColorStop(1, hColor + "00");
        ctx.beginPath(); ctx.arc(hc.x, hc.y, hhR, 0, Math.PI*2); ctx.fillStyle = hhg; ctx.fill();

        for (let si = 0; si < 9; si++) {
          const sc = hc.supers[si];
          const sColor = CLUSTER_COLORS[si];
          if (hi === 4) {
            for (const [a, b] of MIRROR_PAIRS) {
              if (a === si || b === si) {
                const sa = hc.supers[a], sb = hc.supers[b], sm = hc.supers[4];
                ctx.beginPath(); ctx.moveTo(sa.x, sa.y); ctx.lineTo(sm.x, sm.y); ctx.lineTo(sb.x, sb.y); ctx.closePath();
                ctx.fillStyle = "rgba(201,168,76,0.002)"; ctx.strokeStyle = "rgba(201,168,76,0.006)";
                ctx.lineWidth = 0.2; ctx.fill(); ctx.stroke(); break;
              }
            }
          }
          const shR = (hi===4&&si===4) ? 40 : si===4 ? 25 : 18;
          const shg = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, shR);
          shg.addColorStop(0, sColor + "05"); shg.addColorStop(0.6, sColor + "02"); shg.addColorStop(1, sColor + "00");
          ctx.beginPath(); ctx.arc(sc.x, sc.y, shR, 0, Math.PI*2); ctx.fillStyle = shg; ctx.fill();

          for (let ci = 0; ci < 9; ci++) {
            const cl = sc.clusters[ci];
            const cColor = CLUSTER_COLORS[ci];
            const chR = ci === 4 ? 7 : 4;
            const chg = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, chR);
            chg.addColorStop(0, cColor + "06"); chg.addColorStop(1, cColor + "00");
            ctx.beginPath(); ctx.arc(cl.x, cl.y, chR, 0, Math.PI*2); ctx.fillStyle = chg; ctx.fill();

            for (let bi = 0; bi < 9; bi++) {
              const body = cl.bodies[bi];
              const bColor = CLUSTER_COLORS[bi];
              const isCoreMoon = hi===4&&si===4&&ci===4&&bi===4;
              const isDeepMoon = (hi===4&&si===4&&ci===4)||(hi===4&&si===4&&bi===4);
              const isMoon = bi === 4;
              const glowR = body.radius * (isCoreMoon ? 12 : isDeepMoon ? 4 : isMoon ? 2.5 : 1.5);
              const glowAlpha = isCoreMoon ? "20" : isDeepMoon ? "10" : isMoon ? "08" : "04";
              const bg = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, glowR);
              bg.addColorStop(0, bColor + glowAlpha); bg.addColorStop(0.5, bColor + "02"); bg.addColorStop(1, bColor + "00");
              ctx.beginPath(); ctx.arc(body.x, body.y, glowR, 0, Math.PI*2); ctx.fillStyle = bg; ctx.fill();
              ctx.beginPath(); ctx.arc(body.x, body.y, body.radius, 0, Math.PI*2);
              const cg = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, body.radius);
              cg.addColorStop(0, isCoreMoon ? "#ffffff" : isDeepMoon ? "#e8e8f0" : bColor);
              cg.addColorStop(1, bColor + "20"); ctx.fillStyle = cg; ctx.fill();
            }
          }
        }
      }
      ctx.restore();

      // Equation overlay — fades out during zoom
      const textFade = Math.max(0, 1 - eased * 1.5);
      if (textFade > 0.01 && depthRef.current === 1) {
        mvTime += 0.005;
        const ea = (0.22 + Math.sin(mvTime*2)*0.06) * textFade;
        ctx.fillStyle = `rgba(232,232,240,${ea})`;
        ctx.font = `italic ${Math.round(Math.min(W,H)*0.022)}px 'Cormorant Garamond', serif`;
        ctx.textAlign = "center";
        ctx.fillText("\u03A8\u2081\u2082 = R\u2081\u2082 \u00D7 (C_eff \u00B7 D\u0302) / dist\u00B2", CX, H - 30);
        ctx.fillStyle = `rgba(232,232,240,${0.1 * textFade})`;
        ctx.font = `${Math.round(7)}px 'Cinzel', serif`;
        ctx.fillText("SAME EQUATION  \u00B7  EVERY SCALE  \u00B7  6,561 WORLDS", CX, H - 14);
      }

      return eased;
    }

    // Track when depth transitions to 1 for zoom timing
    let depthOneStart = null;

    function loop(now) {
      if (!startTime) startTime = now;

      // Track when zoom should start
      if (depthRef.current === 1 && depthOneStart === null) {
        depthOneStart = now;
      }
      const zoomElapsed = depthOneStart ? (now - depthOneStart) / 1000 : 0;

      ctx.clearRect(0, 0, W, H);
      simulate();
      drawMultiverse(depthRef.current === 1 ? zoomElapsed : -1);

      // Auto-transition to depth 2 after zoom completes
      if (depthRef.current === 1 && zoomElapsed > 8.5 && !transitioned) {
        transitioned = true;
        goDeeperRef.current(true); // skipTransition — canvas handles its own visual transition
        return;
      }

      // Stop drawing if we've gone past depth 2 (component may still be mounted during fadeout)
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
