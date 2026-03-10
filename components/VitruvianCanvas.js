"use client";

import { useEffect, useRef } from "react";

const PHI  = 1.6180339887;
const TAU  = Math.PI * 2;
const GOLD = (a) => `rgba(201,168,76,${a.toFixed(3)})`;
const WHITE = (a) => `rgba(220,215,200,${a.toFixed(3)})`;

export default function VitruvianCanvas({ stateRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, cx, cy, R, raf;

    function resize() {
      const el = canvas.parentElement;
      W = canvas.width  = el.offsetWidth;
      H = canvas.height = el.offsetHeight;
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.38;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    function rotX([x,y,z], a) { return [x, y*Math.cos(a)-z*Math.sin(a), y*Math.sin(a)+z*Math.cos(a)]; }
    function rotY([x,y,z], a) { return [x*Math.cos(a)+z*Math.sin(a), y, -x*Math.sin(a)+z*Math.cos(a)]; }
    function rotZ([x,y,z], a) { return [x*Math.cos(a)-y*Math.sin(a), x*Math.sin(a)+y*Math.cos(a), z]; }
    function xf(p, rx, ry, rz) { return rotZ(rotY(rotX(p, rx), ry), rz); }
    function proj([x,y,z]) {
      const s = 2.4 / (2.4 + z * 0.4);
      return [cx + x * R * s, cy - y * R * s, z];
    }
    function depthAlpha(z) { return 0.15 + 0.75 * ((z + 1) / 2); }

    const R_CIRC = 0.70;
    const SQ_RATIO = 137/225;
    const SQ_H = R_CIRC / SQ_RATIO;
    const SQ_HW = SQ_H / 2;
    const SQ_BOT = -R_CIRC;
    const SQ_TOP = SQ_BOT + SQ_H;

    const SX = 0.10, SY = 0.23;
    const HX = 0.08, HY = -0.3711;
    const AR  = SQ_HW - SX;
    const LR  = 0.3289;
    const ELBOW = AR * 0.50;
    const KNEE  = LR * 0.52;
    const HEAD_Y = SQ_TOP - (SQ_H / 16);
    const HEAD_R_NORM = SQ_H / 16;

    const ARM_T = 0;
    const LEG_T = 0;
    const ARM_X = 34.35 * Math.PI / 180;
    const LEG_X = 30 * Math.PI / 180;

    function figure(breath) {
      const armA = ARM_T + breath * (ARM_X - ARM_T);
      const legA = LEG_T + breath * (LEG_X - LEG_T);
      const ac = Math.cos(armA), as_a = Math.sin(armA);
      const lc = Math.cos(legA), ls   = Math.sin(legA);

      return {
        head: [0, HEAD_Y, 0],
        neck: [[0, HEAD_Y - HEAD_R_NORM, 0], [0, SY + 0.008, 0]],
        shoulders: [[-SX, SY, 0], [SX, SY, 0]],
        lTorso: [[-SX, SY, 0], [-0.06, 0.01, 0], [-HX, HY, 0]],
        rTorso: [[ SX, SY, 0], [ 0.06, 0.01, 0], [ HX, HY, 0]],
        hips: [[-HX, HY, 0], [HX, HY, 0]],
        lArm: [[-SX, SY, 0], [-(SX + ELBOW*ac), SY + ELBOW*as_a, 0], [-(SX + AR*ac), SY + AR*as_a, 0]],
        rArm: [[ SX, SY, 0], [ SX + ELBOW*ac, SY + ELBOW*as_a, 0], [ SX + AR*ac, SY + AR*as_a, 0]],
        lLeg: [[-HX, HY, 0], [-(HX + KNEE*ls), HY - KNEE*lc, 0], [-(HX + LR*ls), HY - LR*lc, 0]],
        rLeg: [[ HX, HY, 0], [ HX + KNEE*ls, HY - KNEE*lc, 0], [ HX + LR*ls, HY - LR*lc, 0]],
      };
    }

    function drawLimb(pts, rx, ry, rz, alpha, breath) {
      const mapped = pts.map(p => proj(xf(p, rx, ry, rz)));
      const z = mapped.reduce((s, p) => s + p[2], 0) / mapped.length;
      const a = depthAlpha(z) * alpha;
      ctx.save();
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(mapped[0][0], mapped[0][1]);
      for (let i = 1; i < mapped.length; i++) ctx.lineTo(mapped[i][0], mapped[i][1]);
      ctx.strokeStyle = WHITE(a);
      ctx.lineWidth = 2.4 + breath * 1.4;
      ctx.stroke();
      ctx.restore();
    }

    let t = 0;

    function frame() {
      ctx.clearRect(0, 0, W, H);
      t += 0.0035;

      const breath = (Math.sin(t * 2.672) + 1) / 2;
      const rx = t * 1.0;
      const ry = t * PHI;
      const rz = t * (PHI * PHI);
      if (stateRef) stateRef.current = { rx, ry, rz };

      const fig = figure(breath);

      // Circle — cosmos
      const circPts = Array.from({length: 65}, (_, i) => {
        const a = (i / 64) * TAU;
        return proj(xf([Math.cos(a)*R_CIRC, Math.sin(a)*R_CIRC, 0], rx, ry, rz));
      });
      const circZ = circPts.reduce((s,p)=>s+p[2],0)/circPts.length;
      ctx.beginPath();
      ctx.moveTo(circPts[0][0], circPts[0][1]);
      circPts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      ctx.strokeStyle = GOLD(depthAlpha(circZ) * (0.22 + breath * 0.55));
      ctx.lineWidth = 1.6 + breath * 1.4; ctx.stroke();

      // Square — earth
      const sqCorners = [
        [-SQ_HW, SQ_TOP, 0], [ SQ_HW, SQ_TOP, 0],
        [ SQ_HW, SQ_BOT, 0], [-SQ_HW, SQ_BOT, 0],
      ].map(p => proj(xf(p, rx, ry, rz)));
      const sqZ = sqCorners.reduce((s,p)=>s+p[2],0)/sqCorners.length;
      ctx.beginPath();
      ctx.moveTo(sqCorners[0][0], sqCorners[0][1]);
      sqCorners.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      ctx.strokeStyle = GOLD(depthAlpha(sqZ) * (0.18 + (1 - breath) * 0.50));
      ctx.lineWidth = 1.6 + (1 - breath) * 1.4; ctx.stroke();

      // Figure
      drawLimb(fig.lArm,     rx, ry, rz, 0.88, breath);
      drawLimb(fig.rArm,     rx, ry, rz, 0.88, breath);
      drawLimb(fig.lLeg,     rx, ry, rz, 0.85, breath);
      drawLimb(fig.rLeg,     rx, ry, rz, 0.85, breath);
      drawLimb(fig.lTorso,   rx, ry, rz, 0.82, breath);
      drawLimb(fig.rTorso,   rx, ry, rz, 0.82, breath);
      drawLimb(fig.shoulders,rx, ry, rz, 0.75, breath);
      drawLimb(fig.hips,     rx, ry, rz, 0.72, breath);
      drawLimb(fig.neck,     rx, ry, rz, 0.80, breath);

      // Head
      const hc = proj(xf(fig.head, rx, ry, rz));
      const hr = R * HEAD_R_NORM;
      ctx.beginPath();
      ctx.arc(hc[0], hc[1], hr, 0, TAU);
      ctx.strokeStyle = WHITE(depthAlpha(hc[2]) * 0.90);
      ctx.lineWidth = 2.0 + breath * 0.8; ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, TAU);
      ctx.fillStyle = GOLD(0.35); ctx.fill();

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
