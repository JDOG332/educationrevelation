'use client';

import Link from 'next/link';

const EASE = "cubic-bezier(0.23,1,0.32,1)";

const POEMS = [
  { key: "dol", title: "It's the Rhythm of Life", subtitle: "Every hope is a heartbeat...", color: "201,168,76" },
  { key: "rol", title: "Death or Life", subtitle: "Alive when dancing & dead when not...", color: "190,140,220" },
  { key: "kal", title: "Kaleidoscope Sea", subtitle: "One door closes & another one opens...", color: "79,195,247" },
];

export default function PoemsClient() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 23.6%, rgba(14,10,28,0.618) 0%, #03030a 61.8%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1.618rem",
      paddingBottom: "4rem",
    }}>

      {/* Frosted header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
        height: "clamp(56px, 8vh, 72px)",
        background: "linear-gradient(180deg, rgba(3,3,10,0.92) 0%, rgba(3,3,10,0.6) 70%, transparent 100%)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center",
        paddingLeft: "1.618rem",
        pointerEvents: "none",
      }}>
        <Link href="/search" style={{ pointerEvents: "auto" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(18px, 2.618vmin, 28px)",
            color: "rgba(201,168,76,0.618)",
            cursor: "pointer",
          }}>← BACK</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "36rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(72px, 11vh, 110px)",
        gap: "1.618rem",
      }}>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 4.236vmin, 36px)",
          letterSpacing: "0.236em",
          color: "rgba(201,168,76,0.618)",
          animation: "fadeUp 618ms 100ms both ease",
          textShadow: "0 0 8px rgba(201,168,76,0.382), 0 0 24px rgba(201,168,76,0.146)",
        }}>POEMS</h1>

        {POEMS.map((poem, i) => (
          <div key={poem.key} style={{
            width: "100%",
            padding: "1.618rem",
            background: `rgba(${poem.color},0.06)`,
            border: `1px solid rgba(${poem.color},0.22)`,
            borderRadius: 6,
            cursor: "pointer",
            transition: `all 618ms ${EASE}`,
            animation: `fadeUp 618ms ${200 + i * 150}ms both ease`,
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(16px, 2.618vmin, 22px)",
              color: `rgba(${poem.color},0.90)`,
              marginBottom: "0.382rem",
              letterSpacing: "0.06em",
            }}>{poem.title}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(14px, 2vmin, 18px)",
              color: `rgba(${poem.color},0.50)`,
              lineHeight: 1.618,
            }}>{poem.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
