import { PHI, PHI_INV, LAYERS } from "../data.js";

export function SacredDiamond({ size = 200 }) {
  /* ═══ THE GOLDEN RHOMBUS ═══
     D(long) / d(short) = Φ exactly.
     Every nested diamond scales by Φ⁻¹.
     Not a shape — a proof. */
  const C = 100; // center
  const longHalf = 80; // half of vertical diagonal
  const shortHalf = longHalf / PHI; // half of horizontal diagonal — THIS IS THE FIX
  // Outer diamond points: top, right, bottom, left
  const oT = C - longHalf, oB = C + longHalf;
  const oL = +(C - shortHalf).toFixed(1), oR = +(C + shortHalf).toFixed(1);
  // Inner diamond: scale by Φ⁻¹
  const iLong = longHalf * PHI_INV, iShort = iLong / PHI;
  const iT = +(C - iLong).toFixed(1), iB = +(C + iLong).toFixed(1);
  const iL = +(C - iShort).toFixed(1), iR = +(C + iShort).toFixed(1);
  // Innermost diamond: scale by Φ⁻²
  const iiLong = iLong * PHI_INV, iiShort = iiLong / PHI;
  const iiT = +(C - iiLong).toFixed(1), iiB = +(C + iiLong).toFixed(1);
  const iiL = +(C - iiShort).toFixed(1), iiR = +(C + iiShort).toFixed(1);

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#e8e8f0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="dg2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8e8f0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8e8f0" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#c9a84c" stopOpacity="0.1" />
          <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#e8e8f0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="#e8e8f0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e8e8f0" stopOpacity="0" />
        </radialGradient>
        <filter id="diamondBloom">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="deepGlow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      {/* Outermost breath ring */}
      <circle cx={C} cy={C} r="90" fill="none" stroke="rgba(201,168,76,0.015)" strokeWidth="0.3">
        <animate attributeName="r" values="85;95;85" dur="16s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="16s" repeatCount="indefinite" />
      </circle>
      {/* φ-scaled rings — golden ratio orbits */}
      <circle cx={C} cy={C} r={62 * PHI_INV} fill="none" stroke="rgba(232,232,240,0.025)" strokeWidth="0.3" strokeDasharray="1 8">
        <animateTransform attributeName="transform" type="rotate" values={`0 ${C} ${C};-360 ${C} ${C}`} dur="180s" repeatCount="indefinite" />
      </circle>
      {/* Outer ambient ring */}
      <circle cx={C} cy={C} r="80" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5">
        <animate attributeName="r" values="75;85;75" dur="12s" repeatCount="indefinite" />
      </circle>
      {/* Sacred circle */}
      <circle cx={C} cy={C} r="62" fill="none" stroke="rgba(232,232,240,0.04)" strokeWidth="0.3" strokeDasharray="2 6">
        <animateTransform attributeName="transform" type="rotate" values={`0 ${C} ${C};360 ${C} ${C}`} dur="120s" repeatCount="indefinite" />
      </circle>
      {/* Deep ambient glow — layered */}
      <circle cx={C} cy={C} r="70" fill="url(#moonGlow)" filter="url(#deepGlow)">
        <animate attributeName="r" values="60;80;60" dur="10s" repeatCount="indefinite" />
      </circle>
      {/* Ambient glow */}
      <circle cx={C} cy={C} r="60" fill="url(#centerGlow)">
        <animate attributeName="r" values="55;70;55" dur="8s" repeatCount="indefinite" />
      </circle>
      {/* Soft bloom behind diamond — GOLDEN RHOMBUS */}
      <polygon points={`${C},${oT} ${oL},${C} ${C},${oB} ${oR},${C}`} fill="rgba(201,168,76,0.02)" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
      </polygon>
      {/* Upper triangle — GOLDEN RHOMBUS */}
      <polygon points={`${C},${oT} ${oL},${C} ${oR},${C}`} fill="none" stroke="url(#dg1)" strokeWidth="1" opacity="0.7" filter="url(#diamondBloom)">
        <animate attributeName="opacity" values="0.4;0.85;0.4" dur="6s" repeatCount="indefinite" />
      </polygon>
      {/* Lower triangle — GOLDEN RHOMBUS */}
      <polygon points={`${C},${oB} ${oL},${C} ${oR},${C}`} fill="none" stroke="url(#dg1)" strokeWidth="1" opacity="0.7" filter="url(#diamondBloom)">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="6s" repeatCount="indefinite" />
      </polygon>
      {/* Inner diamond — Φ⁻¹ scaled Golden Rhombus */}
      <polygon points={`${C},${iT} ${iL},${C} ${C},${iB} ${iR},${C}`} fill="none" stroke="url(#dg2)" strokeWidth="0.5" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="8s" repeatCount="indefinite" />
      </polygon>
      {/* Innermost diamond — Φ⁻² scaled Golden Rhombus */}
      <polygon points={`${C},${iiT} ${iiL},${C} ${C},${iiB} ${iiR},${C}`} fill="none" stroke="rgba(232,232,240,0.04)" strokeWidth="0.3">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="10s" repeatCount="indefinite" />
      </polygon>
      {/* Horizon line */}
      <line x1={oL - 15} y1={C} x2={oR + 15} y2={C} stroke="rgba(232,232,240,0.12)" strokeWidth="0.5" />
      {/* Vertical axis */}
      <line x1={C} y1={oT - 5} x2={C} y2={oB + 5} stroke="rgba(232,232,240,0.07)" strokeWidth="0.5" />
      {/* Diagonal axes — sacred geometry */}
      <line x1="50" y1="50" x2="150" y2="150" stroke="rgba(201,168,76,0.04)" strokeWidth="0.3" />
      <line x1="150" y1="50" x2="50" y2="150" stroke="rgba(201,168,76,0.04)" strokeWidth="0.3" />
      {/* Center point — living light, miracle core */}
      <circle cx={C} cy={C} r="1.5" fill="rgba(255,255,255,0.95)">
        <animate attributeName="r" values="1;2.5;1" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={C} cy={C} r="4" fill="rgba(232,232,240,0.5)">
        <animate attributeName="r" values="3;8;3" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.85;0.4" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Golden miracle ring */}
      <circle cx={C} cy={C} r="6" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5">
        <animate attributeName="r" values="5;15;5" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx={C} cy={C} r="12" fill="none" stroke="rgba(232,232,240,0.06)" strokeWidth="0.5">
        <animate attributeName="r" values="10;20;10" dur="6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.06;0.15;0.06" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx={C} cy={C} r="28" fill="none" stroke="rgba(201,168,76,0.03)" strokeWidth="0.3">
        <animate attributeName="r" values="24;34;24" dur="8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.03;0.08;0.03" dur="8s" repeatCount="indefinite" />
      </circle>
      {/* 9 layer dots around the diamond — orbit at Φ⁻¹ × outer longHalf */}
      {LAYERS.map((l, i) => {
        const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
        const r = longHalf * PHI_INV * PHI_INV + longHalf * PHI_INV; // ≈72, but derived from Φ
        const dotX = C + Math.cos(angle) * r;
        const dotY = C + Math.sin(angle) * r;
        return (
          <circle key={i} cx={dotX} cy={dotY} r="1.5" fill={l.accent} opacity="0.3">
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
      <text x={C} y={C + 4} textAnchor="middle" fill="#e8e8f0" fontSize="8" fontFamily="serif" opacity="0.9">🌙</text>
    </svg>
  );
}

export function SacredTriquetra({ size = 240 }) {
  // Geometry: 3 circles of radius R, centers in equilateral triangle
  // Triquetra = outer rounded triangle + inner inverted triangle + center
  // cx=100, cy=103, d=30, R=42
  // Circle centers: C1(100,73), C2(74,118), C3(126,118)
  // Outer intersection points: o12(58.4,79), o13(141.6,79), o23(100,151)
  // Inner intersection points: n12(115.6,112), n13(84.4,112), n23(100,85)
  // Leaf tip (top of C1 arc): (100,31)

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="trqGold1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7a5c10" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#c9a84c" stopOpacity="1" />
          <stop offset="50%" stopColor="#f0d890" stopOpacity="1" />
          <stop offset="75%" stopColor="#c9a84c" stopOpacity="1" />
          <stop offset="100%" stopColor="#7a5c10" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="trqGold2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a6914" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#e8d070" stopOpacity="1" />
          <stop offset="100%" stopColor="#8a6914" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="trqGold3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f0d890" stopOpacity="1" />
          <stop offset="100%" stopColor="#a07818" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="trqSapphire" cx="40%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#b0d4ff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#5599ee" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#2866bb" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0f2244" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="trqGemGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#6699ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2255aa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="trqCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="trqGlow">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="trqShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <filter id="trqBigGlow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Ambient radiance */}
      <circle cx="100" cy="103" r="78" fill="url(#trqCenterGlow)">
        <animate attributeName="r" values="74;86;74" dur="8s" repeatCount="indefinite" />
      </circle>

      {/* Glow layer behind — soft gold bloom */}
      <path d="M 58.4,79 A 42,42 0 1,1 141.6,79 A 42,42 0 1,1 100,151 A 42,42 0 1,1 58.4,79 Z"
        fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="8" filter="url(#trqBigGlow)">
        <animate attributeName="strokeOpacity" values="0.08;0.16;0.08" dur="6s" repeatCount="indefinite" />
      </path>

      {/* OUTER TRIANGLE — three large arcs forming the rounded triangle */}
      {/* C1 arc: o12 → o13 (over the top) */}
      <path d="M 58.4,79 A 42,42 0 1,1 141.6,79"
        fill="none" stroke="url(#trqGold1)" strokeWidth="3.5" strokeLinecap="round"
        filter="url(#trqShadow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" repeatCount="indefinite" />
      </path>
      {/* C3 arc: o13 → o23 (down the right) */}
      <path d="M 141.6,79 A 42,42 0 1,1 100,151"
        fill="none" stroke="url(#trqGold2)" strokeWidth="3.5" strokeLinecap="round"
        filter="url(#trqShadow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" begin="2s" repeatCount="indefinite" />
      </path>
      {/* C2 arc: o23 → o12 (up the left) */}
      <path d="M 100,151 A 42,42 0 1,1 58.4,79"
        fill="none" stroke="url(#trqGold3)" strokeWidth="3.5" strokeLinecap="round"
        filter="url(#trqShadow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" begin="4s" repeatCount="indefinite" />
      </path>

      {/* INNER TRIANGLE — three small arcs forming the inverted triangle */}
      {/* C1 arc: n12 → n13 (cutting through upper center) */}
      <path d="M 115.6,112 A 42,42 0 0,1 84.4,112"
        fill="none" stroke="url(#trqGold2)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#trqShadow)" opacity="0.75" />
      {/* C3 arc: n13 → n23 (cutting up-right) */}
      <path d="M 84.4,112 A 42,42 0 0,1 100,85"
        fill="none" stroke="url(#trqGold3)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#trqShadow)" opacity="0.75" />
      {/* C2 arc: n23 → n12 (cutting down-right) */}
      <path d="M 100,85 A 42,42 0 0,1 115.6,112"
        fill="none" stroke="url(#trqGold1)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#trqShadow)" opacity="0.75" />

      {/* Center convergence circle */}
      <circle cx="100" cy="103" r="9" fill="none" stroke="url(#trqGold1)" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="8;10;8" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* SAPPHIRE GEMS */}
      {/* Center gem — the convergence point */}
      <circle cx="100" cy="103" r="5.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="103" r="10" fill="url(#trqGemGlow)">
        <animate attributeName="r" values="8;14;8" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Outer vertex gems — the three points of the triangle */}
      {/* Top (leaf tip of C1) */}
      <circle cx="100" cy="31" r="3.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="31" r="6" fill="url(#trqGemGlow)" />
      {/* Bottom-left (leaf tip of C2) */}
      <circle cx="37.6" cy="139" r="3.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="37.6" cy="139" r="6" fill="url(#trqGemGlow)" />
      {/* Bottom-right (leaf tip of C3) */}
      <circle cx="162.4" cy="139" r="3.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" begin="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="162.4" cy="139" r="6" fill="url(#trqGemGlow)" />

      {/* Intersection gems — where circles cross at outer points */}
      <circle cx="58.4" cy="79" r="2.8" fill="url(#trqSapphire)" opacity="0.8" />
      <circle cx="141.6" cy="79" r="2.8" fill="url(#trqSapphire)" opacity="0.8" />
      <circle cx="100" cy="151" r="2.8" fill="url(#trqSapphire)" opacity="0.8" />

      {/* Inner intersection gems — small accent */}
      <circle cx="100" cy="85" r="2" fill="url(#trqSapphire)" opacity="0.6" />
      <circle cx="84.4" cy="112" r="2" fill="url(#trqSapphire)" opacity="0.6" />
      <circle cx="115.6" cy="112" r="2" fill="url(#trqSapphire)" opacity="0.6" />

      {/* Labels */}
      <text x="100" y="20" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="5.5" fontFamily="'Cinzel', serif" letterSpacing="2">
        WHAT YOU SEE
      </text>
      <text x="24" y="155" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="5" fontFamily="'Cinzel', serif" letterSpacing="1.5">
        WHAT YOU KNOW
      </text>
      <text x="176" y="155" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="5" fontFamily="'Cinzel', serif" letterSpacing="1.5">
        HOW YOU TRUST
      </text>
    </svg>
  );
}
