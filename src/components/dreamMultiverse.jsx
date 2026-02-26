import { useRef, useEffect } from "react";
import { PHI, POEMS } from "../data.js";

/* ============================================================
   DREAM MULTIVERSE — 9³ = 729-body N-body gravitational simulation
   
   DEPTH 1: The Dance — zoom in, zoom out, collapse to dot
   DEPTH 2: The Poem — 729 bodies rearrange into constellation lines
   
   The universe doesn't disappear. It transforms.
   Same equation at every scale: Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²
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

// Poem lines for target distribution
const POEM_LINES = POEMS.map(p => p.join(" "));
const POEM_CHAR_COUNTS = POEM_LINES.map(l => l.replace(/\s/g, "").length);
const TOTAL_CHARS = POEM_CHAR_COUNTS.reduce((a, b) => a + b, 0);

export default function DreamMultiverseCanvas({ depth, goDeeper, onPoemLine }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(null);
  const depthRef = useRef(depth);
  const goDeeperRef = useRef(goDeeper);
  const onPoemLineRef = useRef(onPoemLine);
  depthRef.current = depth;
  goDeeperRef.current = goDeeper;
  onPoemLineRef.current = onPoemLine;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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
            return {
              x: ccx, y: ccy, vx: Math.cos(cva)*cspeed, vy: Math.sin(cva)*cspeed,
              cEff: C_EFF[ci]*2, id: ci,
              targetX: 0, targetY: 0, lineIndex: -1,
              hi, si, ci,
            };
          });
          return { x: sx, y: sy, vx: Math.cos(sva)*sspeed, vy: Math.sin(sva)*sspeed, cEff: C_EFF[si]*4, id: si, clusters };
        });
        return { x: hx, y: hy, vx: Math.cos(va)*speed, vy: Math.sin(va)*speed, cEff: C_EFF[hi]*7, id: hi, supers };
      });
      stateRef.current = { hypers };
    }

    // Flatten
    const state = stateRef.current;
    allClusters = [];
    for (const hc of state.hypers)
      for (const sc of hc.supers)
        for (const cl of sc.clusters)
          allClusters.push(cl);

    // ===== ASSIGN POEM TARGETS =====
    const lineHeight = H / (POEM_LINES.length + 2);
    const maxLineWidth = W * 0.70;
    const maxChars = Math.max(...POEM_CHAR_COUNTS);
    let bodyIndex = 0;

    for (let li = 0; li < POEM_LINES.length; li++) {
      const proportion = POEM_CHAR_COUNTS[li] / TOTAL_CHARS;
      const bodiesForLine = Math.max(10, Math.round(729 * proportion));
      const lineY = lineHeight * (li + 1.5);
      const lineW = maxLineWidth * (POEM_CHAR_COUNTS[li] / maxChars);

      for (let b = 0; b < bodiesForLine && bodyIndex < 729; b++) {
        const cl = allClusters[bodyIndex];
        const spreadT = bodiesForLine > 1 ? b / (bodiesForLine - 1) : 0.5;
        cl.targetX = CX - lineW / 2 + spreadT * lineW + (Math.random() - 0.5) * 5;
        cl.targetY = lineY + (Math.random() - 0.5) * 3;
        cl.lineIndex = li;
        bodyIndex++;
      }
    }
    while (bodyIndex < 729) {
      const cl = allClusters[bodyIndex];
      cl.targetX = CX + (Math.random() - 0.5) * 30;
      cl.targetY = lineHeight * POEM_LINES.length + (Math.random() - 0.5) * 10;
      cl.lineIndex = POEM_LINES.length - 1;
      bodyIndex++;
    }

    const speedScale = Math.max(1, 1200 / Math.max(W, H));
    const zoomTarget = [0,1,2,3,5,6,7,8][Math.floor(Math.random()*8)];

    let mvTime = 0;
    let transitioned = false;
    let morphProgress = 0;
    let depth2Start = null;
    let revealedLines = -1;

    function simulate() {
      const morphDamp = 1 - morphProgress * 0.97;
      simLevel(state.hypers, 0.4 * speedScale * morphDamp, 70, 0.9998, CX, CY, 0.00004 * speedScale);
      for (const hc of state.hypers)
        simLevel(hc.supers, 0.35 * speedScale * morphDamp, 28, 0.9996, hc.x, hc.y, 0.0002 * speedScale);
      for (const hc of state.hypers)
        for (const sc of hc.supers)
          simLevel(sc.clusters, 0.28 * speedScale * morphDamp, 8, 0.9993, sc.x, sc.y, 0.0008 * speedScale);

      if (morphProgress > 0) {
        const pull = morphProgress * morphProgress;
        for (const cl of allClusters) {
          const dx = cl.targetX - cl.x;
          const dy = cl.targetY - cl.y;
          cl.vx += dx * pull * 0.04;
          cl.vy += dy * pull * 0.04;
          cl.vx *= 1 - pull * 0.1;
          cl.vy *= 1 - pull * 0.1;
        }
      }
    }

    function drawBodies(cameraZoom, cameraPanX, cameraPanY, useCamera) {
      if (useCamera) {
        ctx.save();
        ctx.translate(CX, CY);
        ctx.scale(cameraZoom, cameraZoom);
        ctx.translate(-CX + cameraPanX, -CY + cameraPanY);
      }

      // Halos only during dance (morph < 0.3)
      if (morphProgress < 0.3) {
        const haloFade = 1 - morphProgress / 0.3;
        for (let hi = 0; hi < 9; hi++) {
          const hc = state.hypers[hi];
          const hColor = CLUSTER_COLORS[hi];
          const hhR = hi === 4 ? 100 : 65;
          const hhg = ctx.createRadialGradient(hc.x, hc.y, 0, hc.x, hc.y, hhR);
          hhg.addColorStop(0, hColor + "04"); hhg.addColorStop(0.5, hColor + "01"); hhg.addColorStop(1, hColor + "00");
          ctx.globalAlpha = haloFade;
          ctx.beginPath(); ctx.arc(hc.x, hc.y, hhR, 0, Math.PI*2); ctx.fillStyle = hhg; ctx.fill();

          for (let si = 0; si < 9; si++) {
            const sc = hc.supers[si];
            const sColor = CLUSTER_COLORS[si];
            const shR = (hi===4&&si===4) ? 40 : si===4 ? 25 : 18;
            const shg = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, shR);
            shg.addColorStop(0, sColor + "05"); shg.addColorStop(0.6, sColor + "02"); shg.addColorStop(1, sColor + "00");
            ctx.beginPath(); ctx.arc(sc.x, sc.y, shR, 0, Math.PI*2); ctx.fillStyle = shg; ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      // Mirror triangles — only during dance
      if (morphProgress < 0.2) {
        const triFade = 1 - morphProgress / 0.2;
        for (const [a, b] of MIRROR_PAIRS) {
          const ha = state.hypers[a], hb = state.hypers[b], hm = state.hypers[4];
          ctx.beginPath(); ctx.moveTo(ha.x, ha.y); ctx.lineTo(hm.x, hm.y); ctx.lineTo(hb.x, hb.y); ctx.closePath();
          ctx.fillStyle = `rgba(201,168,76,${0.003 * triFade})`; ctx.strokeStyle = `rgba(201,168,76,${0.008 * triFade})`;
          ctx.lineWidth = 0.3; ctx.fill(); ctx.stroke();
        }
      }

      // The 729 particles
      for (const cl of allClusters) {
        const cColor = CLUSTER_COLORS[cl.ci];
        const isCoreMoon = cl.hi===4 && cl.si===4 && cl.ci===4;
        const isMoon = cl.ci === 4;

        const baseR = isCoreMoon ? 2.0 : isMoon ? 1.2 : 0.7;
        // Bodies grow slightly as they settle into poem
        const mRadius = baseR + morphProgress * 0.3;
        const mGlowR = mRadius * (isCoreMoon ? 8 : isMoon ? 4 : 2.5);

        const baseAlpha = isCoreMoon ? 0.15 : isMoon ? 0.07 : 0.03;
        const glowAlpha = baseAlpha + morphProgress * 0.1;

        // Glow
        const mg = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, mGlowR);
        mg.addColorStop(0, `rgba(232,232,240,${glowAlpha})`);
        mg.addColorStop(0.5, `rgba(232,232,240,${glowAlpha * 0.3})`);
        mg.addColorStop(1, "rgba(232,232,240,0)");
        ctx.beginPath(); ctx.arc(cl.x, cl.y, mGlowR, 0, Math.PI*2); ctx.fillStyle = mg; ctx.fill();

        // Core — blend cluster color → warm gold as morph progresses
        ctx.beginPath(); ctx.arc(cl.x, cl.y, mRadius, 0, Math.PI*2);
        const m = morphProgress;
        if (m < 0.3) {
          const mcg = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, mRadius);
          mcg.addColorStop(0, isCoreMoon ? "#ffffff" : isMoon ? "#e8e8f0" : cColor);
          mcg.addColorStop(1, cColor + "30");
          ctx.fillStyle = mcg;
        } else {
          const t = (m - 0.3) / 0.7; // 0→1 over the settling phase
          const r = Math.round(200 + t * 55);  // → 255
          const g = Math.round(200 + t * (220 - 200)); // → 220
          const b = Math.round(210 + t * (180 - 210)); // → 180 (warm)
          ctx.fillStyle = `rgba(${r},${g},${b},${0.25 + t * 0.45})`;
        }
        ctx.fill();
      }

      if (useCamera) ctx.restore();
    }

    // ===== MAIN LOOP =====
    let depthOneStart = null;

    function loop(now) {
      // Track depth 1 start
      if (depthRef.current >= 1 && depthOneStart === null) {
        depthOneStart = now;
      }
      const zoomElapsed = depthOneStart ? (now - depthOneStart) / 1000 : 0;

      // Track depth 2 start
      if (depthRef.current >= 2 && depth2Start === null) {
        depth2Start = now;
      }
      const poemElapsed = depth2Start ? (now - depth2Start) / 1000 : 0;

      ctx.clearRect(0, 0, W, H);

      // === DEPTH 1: The Dance ===
      if (depthRef.current === 1) {
        simulate();

        // Camera
        const z1Start = 1.0, z1End = 8.0;
        const z1t = Math.max(0, Math.min(1, (zoomElapsed - z1Start) / (z1End - z1Start)));
        const z1eased = z1t * z1t * (3 - 2 * z1t);

        const z2Start = 8.0, z2End = 13.0;
        const z2t = Math.max(0, Math.min(1, (zoomElapsed - z2Start) / (z2End - z2Start)));
        const z2eased = z2t * z2t * (3 - 2 * z2t);

        let zoom, panX, panY;
        const target = state.hypers[zoomTarget];

        if (zoomElapsed < z2Start) {
          zoom = 5 + (1 - 5) * z1eased;
          panX = (CX - target.x) * (1 - z1eased);
          panY = (CY - target.y) * (1 - z1eased);
        } else {
          zoom = 1 + (0.04 - 1) * z2eased;
          panX = 0; panY = 0;
        }

        drawBodies(zoom, panX, panY, true);

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

        // Equation text
        const textFade = Math.max(0, 1 - z1eased * 1.5);
        if (textFade > 0.01) {
          mvTime += 0.005;
          const ea = (0.22 + Math.sin(mvTime*2)*0.06) * textFade;
          ctx.fillStyle = `rgba(232,232,240,${ea})`;
          ctx.font = `italic ${Math.round(Math.min(W,H)*0.022)}px 'Cormorant Garamond', serif`;
          ctx.textAlign = "center";
          ctx.fillText("\u03A8\u2081\u2082 = R\u2081\u2082 \u00D7 (C_eff \u00B7 D\u0302) / dist\u00B2", CX, H - 30);
        }

        // Auto-transition to depth 2
        if (zoomElapsed > 14 && !transitioned) {
          transitioned = true;
          goDeeperRef.current(true);
        }
      }

      // === DEPTH 2: The Poem Formation ===
      if (depthRef.current === 2) {
        // Morph: 0→1 over 8 seconds (slow, organic)
        morphProgress = Math.min(1, poemElapsed / 8);

        // Reveal lines progressively
        const revealStart = 0.12;
        const revealEnd = 0.88;
        const newRevealedLines = morphProgress < revealStart ? -1
          : Math.min(POEM_LINES.length - 1,
              Math.floor(((morphProgress - revealStart) / (revealEnd - revealStart)) * POEM_LINES.length));

        if (newRevealedLines > revealedLines) {
          revealedLines = newRevealedLines;
          if (onPoemLineRef.current) onPoemLineRef.current(revealedLines);
        }

        simulate();
        drawBodies(1, 0, 0, false); // no camera transform — screen coords
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
