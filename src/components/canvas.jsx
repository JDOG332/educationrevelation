import { useEffect, useRef } from "react";
import { PHI } from "../data.js";

export const OCTANT_COLORS = [
  "201,168,76",   // Recognition+Spirit+Intuition — warm gold
  "180,160,100",  // Recognition+Spirit+Data — muted gold
  "160,140,120",  // Recognition+Flesh+Intuition — earthen
  "190,155,88",   // Recognition+Flesh+Data — amber
  "140,170,220",  // Noise+Spirit+Intuition — steel blue
  "120,160,200",  // Noise+Spirit+Data — deep blue
  "170,140,200",  // Noise+Flesh+Intuition — violet
  "150,150,180",  // Noise+Flesh+Data — gray-violet
];

export function OctahedronPact() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const animRef = useRef(null);
  const phaseRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = Math.min(window.innerWidth * 0.88, 520);
    const H = W;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const CX = W / 2;
    const CY = H / 2;
    const R = W * 0.32;

    const edges = [
      [0,2],[0,3],[0,4],[0,5],
      [1,2],[1,3],[1,4],[1,5],
      [2,4],[2,5],[3,4],[3,5],
    ];

    const faces = [
      [0,2,4],[0,2,5],[0,3,4],[0,3,5],
      [1,2,4],[1,2,5],[1,3,4],[1,3,5],
    ];

    const axisStyles = {
      width:  { color: "201,168,76", glow: "rgba(201,168,76," },
      height: { color: "120,180,255", glow: "rgba(120,180,255," },
      depth:  { color: "190,140,220", glow: "rgba(190,140,220," },
    };

    function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function project(x3, y3, z3, rotY, rotX) {
      const ca = Math.cos(rotY), sa = Math.sin(rotY);
      let rx = x3 * ca - z3 * sa;
      let rz = x3 * sa + z3 * ca;
      const cb = Math.cos(rotX), sb = Math.sin(rotX);
      let ry = y3 * cb - rz * sb;
      let rz2 = y3 * sb + rz * cb;
      const perspective = 1.8 / (1.8 - rz2 * 0.25 / R);
      return { x: CX + rx * perspective, y: CY + ry * perspective, z: rz2, s: perspective };
    }

    function getVerts(rotY, rotX, morph) {
      const depthScale = morph;
      return [
        { ...project(R, 0, 0, rotY, rotX), label: "RECOGNITION", axis: "width", end: "+" },
        { ...project(-R, 0, 0, rotY, rotX), label: "NOISE", axis: "width", end: "-" },
        { ...project(0, -R, 0, rotY, rotX), label: "SPIRIT", axis: "height", end: "+" },
        { ...project(0, R, 0, rotY, rotX), label: "FLESH", axis: "height", end: "-" },
        { ...project(0, 0, R * depthScale, rotY, rotX), label: "INTUITION", axis: "depth", end: "+" },
        { ...project(0, 0, -R * depthScale, rotY, rotX), label: "DATA", axis: "depth", end: "-" },
      ];
    }

    function draw(timestamp) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      ctx.clearRect(0, 0, W, H);

      let morph, rotY, rotX, crossOpacity;

      if (elapsed < 2.0) {
        morph = 0; rotY = 0; rotX = 0;
        crossOpacity = Math.min(1, elapsed / 0.6);
      } else if (elapsed < 4.5) {
        const t = (elapsed - 2.0) / 2.5;
        const e = easeInOut(Math.min(1, t));
        morph = e; rotY = e * 0.35; rotX = e * 0.2;
        crossOpacity = Math.max(0, 1 - t * 1.5);
      } else {
        morph = 1;
        const t3 = elapsed - 4.5;
        rotY = 0.35 + t3 * 0.12;
        rotX = 0.2 + Math.sin(t3 * 0.15) * 0.08;
        crossOpacity = 0;
      }

      const verts = getVerts(rotY, rotX, morph);

      // === FLAT CROSS OVERLAY ===
      if (crossOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = crossOpacity;

        const hGrad = ctx.createLinearGradient(CX - R, CY, CX + R, CY);
        hGrad.addColorStop(0, "rgba(201,168,76,0.5)");
        hGrad.addColorStop(0.5, "rgba(201,168,76,0.08)");
        hGrad.addColorStop(1, "rgba(201,168,76,0.5)");
        ctx.beginPath(); ctx.moveTo(CX - R, CY); ctx.lineTo(CX + R, CY);
        ctx.strokeStyle = hGrad; ctx.lineWidth = 1.5; ctx.stroke();

        const vGrad = ctx.createLinearGradient(CX, CY - R, CX, CY + R);
        vGrad.addColorStop(0, "rgba(120,180,255,0.5)");
        vGrad.addColorStop(0.5, "rgba(120,180,255,0.08)");
        vGrad.addColorStop(1, "rgba(120,180,255,0.5)");
        ctx.beginPath(); ctx.moveTo(CX, CY - R); ctx.lineTo(CX, CY + R);
        ctx.strokeStyle = vGrad; ctx.lineWidth = 1.5; ctx.stroke();

        ctx.font = "10px Cinzel, serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(201,168,76," + (crossOpacity * 0.7) + ")";
        ctx.fillText("NOISE", CX - R - 30, CY);
        ctx.fillText("RECOGNITION", CX + R + 38, CY);
        ctx.fillStyle = "rgba(120,180,255," + (crossOpacity * 0.7) + ")";
        ctx.fillText("SPIRIT", CX, CY - R - 14);
        ctx.fillText("FLESH", CX, CY + R + 14);
        ctx.font = "8px Cinzel, serif";
        ctx.fillStyle = "rgba(232,232,240," + (crossOpacity * 0.3) + ")";
        ctx.fillText("4 QUADRANTS", CX, CY + R + 38);
        ctx.beginPath(); ctx.arc(CX, CY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,168,76," + (crossOpacity * 0.6) + ")"; ctx.fill();
        ctx.restore();
      }

      // === 3D OCTAHEDRON ===
      const octaOpacity = elapsed < 2 ? 0 : Math.min(1, (elapsed - 2) / 1.2);
      if (octaOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = octaOpacity;

        const sortedFaces = faces.map((f, fi) => ({
          idx: f, fi,
          avgZ: (verts[f[0]].z + verts[f[1]].z + verts[f[2]].z) / 3,
        })).sort((a, b) => a.avgZ - b.avgZ);

        for (const face of sortedFaces) {
          const [i0, i1, i2] = face.idx;
          const v0 = verts[i0], v1 = verts[i1], v2 = verts[i2];
          const col = OCTANT_COLORS[face.fi];
          const depthFade = 0.03 + (face.avgZ / R + 1) * 0.04;
          ctx.beginPath(); ctx.moveTo(v0.x, v0.y); ctx.lineTo(v1.x, v1.y); ctx.lineTo(v2.x, v2.y); ctx.closePath();
          ctx.fillStyle = "rgba(" + col + "," + depthFade + ")"; ctx.fill();
        }

        for (const [a, b] of edges) {
          const va = verts[a], vb = verts[b];
          const avgZ = (va.z + vb.z) / 2;
          const op = 0.06 + (avgZ / R + 1) * 0.14;
          const lw = 0.4 + (avgZ / R + 1) * 0.7;
          const colA = axisStyles[va.axis].color;
          const colB = axisStyles[vb.axis].color;
          const grad = ctx.createLinearGradient(va.x, va.y, vb.x, vb.y);
          grad.addColorStop(0, "rgba(" + colA + "," + op + ")");
          grad.addColorStop(1, "rgba(" + colB + "," + op + ")");
          ctx.beginPath(); ctx.moveTo(va.x, va.y); ctx.lineTo(vb.x, vb.y);
          ctx.strokeStyle = grad; ctx.lineWidth = lw; ctx.stroke();
        }

        ctx.setLineDash([4, 6]);
        const axisPairs = [[0,1,"width"],[2,3,"height"],[4,5,"depth"]];
        for (const [a, b, axis] of axisPairs) {
          const va = verts[a], vb = verts[b];
          const col = axisStyles[axis].color;
          const axGrad = ctx.createLinearGradient(va.x, va.y, vb.x, vb.y);
          axGrad.addColorStop(0, "rgba(" + col + ",0.25)");
          axGrad.addColorStop(0.5, "rgba(" + col + ",0.04)");
          axGrad.addColorStop(1, "rgba(" + col + ",0.25)");
          ctx.beginPath(); ctx.moveTo(va.x, va.y); ctx.lineTo(vb.x, vb.y);
          ctx.strokeStyle = axGrad; ctx.lineWidth = 0.8; ctx.stroke();
        }
        ctx.setLineDash([]);

        // Star of David
        if (morph > 0.5) {
          const starOp = Math.min(0.18, (morph - 0.5) * 0.36);
          ctx.beginPath(); ctx.moveTo(verts[2].x, verts[2].y); ctx.lineTo(verts[4].x, verts[4].y); ctx.lineTo(verts[5].x, verts[5].y); ctx.closePath();
          ctx.strokeStyle = "rgba(120,180,255," + starOp + ")"; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.fillStyle = "rgba(120,180,255," + (starOp * 0.15) + ")"; ctx.fill();

          ctx.beginPath(); ctx.moveTo(verts[3].x, verts[3].y); ctx.lineTo(verts[4].x, verts[4].y); ctx.lineTo(verts[5].x, verts[5].y); ctx.closePath();
          ctx.strokeStyle = "rgba(201,168,76," + starOp + ")"; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.fillStyle = "rgba(201,168,76," + (starOp * 0.15) + ")"; ctx.fill();

          const eqCX = (verts[2].x + verts[3].x + verts[4].x + verts[5].x) / 4;
          const eqCY = (verts[2].y + verts[3].y + verts[4].y + verts[5].y) / 4;
          const starGlow = ctx.createRadialGradient(eqCX, eqCY, 0, eqCX, eqCY, R * 0.15);
          starGlow.addColorStop(0, "rgba(232,232,240," + (starOp * 0.4) + ")");
          starGlow.addColorStop(1, "rgba(232,232,240,0)");
          ctx.beginPath(); ctx.arc(eqCX, eqCY, R * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = starGlow; ctx.fill();
        }

        // Center glow
        const breathe = 0.05 + Math.sin(elapsed * 1.2) * 0.02;
        const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.22);
        cg.addColorStop(0, "rgba(201,168,76," + breathe + ")"); cg.addColorStop(1, "rgba(201,168,76,0)");
        ctx.beginPath(); ctx.arc(CX, CY, R * 0.22, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();

        ctx.beginPath(); ctx.arc(CX, CY, 3, 0, Math.PI * 2); ctx.fillStyle = "rgba(201,168,76,0.6)"; ctx.fill();
        ctx.beginPath(); ctx.arc(CX, CY, 8, 0, Math.PI * 2); ctx.strokeStyle = "rgba(201,168,76,0.12)"; ctx.lineWidth = 0.5; ctx.stroke();

        // Vertex labels
        for (let i = 0; i < verts.length; i++) {
          const v = verts[i];
          const col = axisStyles[v.axis].color;
          const fade = Math.max(0.3, 0.5 + (v.z / R) * 0.35);
          const dotR = 2.5 + (v.z / R + 1) * 2;

          const vg = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, dotR * 6);
          vg.addColorStop(0, "rgba(" + col + "," + (fade * 0.3) + ")"); vg.addColorStop(1, "rgba(" + col + ",0)");
          ctx.beginPath(); ctx.arc(v.x, v.y, dotR * 6, 0, Math.PI * 2); ctx.fillStyle = vg; ctx.fill();

          ctx.beginPath(); ctx.arc(v.x, v.y, dotR, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + col + "," + fade + ")"; ctx.fill();

          const fs = 8 + (v.z / R + 1) * 2.5;
          ctx.font = fs + "px Cinzel, serif";
          ctx.fillStyle = "rgba(" + col + "," + (fade * 0.8) + ")";
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          const dx = v.x - CX, dy = v.y - CY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const offset = dotR * 4 + 16;
          ctx.fillText(v.label, v.x + (dx / dist) * offset, v.y + (dy / dist) * offset);
        }

        if (elapsed > 4.5) {
          const lOp = Math.min(0.25, (elapsed - 4.5) / 3);
          ctx.font = "8px Cinzel, serif"; ctx.fillStyle = "rgba(232,232,240," + lOp + ")"; ctx.textAlign = "center";
          ctx.fillText("8 OCTANTS  ·  3 AXES  ·  6 VERTICES", CX, CY + R + 42);
        }
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const newW = Math.min(window.innerWidth * 0.88, 520);
      const newH = newW;
      canvas.width = newW * dpr; canvas.height = newH * dpr;
      canvas.style.width = newW + "px"; canvas.style.height = newH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />;
}
