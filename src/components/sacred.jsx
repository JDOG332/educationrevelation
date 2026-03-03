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
