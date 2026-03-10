'use client';

import { useState } from 'react';
import Link from 'next/link';

const EASE = "cubic-bezier(0.23,1,0.32,1)";

function SubCard({ sub, index }) {
  const [hover, setHover] = useState(false);
  const rgb = sub.accent;

  return (
    <Link href={`/mathematics/${sub.id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: "1.618rem",
          background: `rgba(${rgb},${hover ? 0.14 : 0.06})`,
          border: `1px solid rgba(${rgb},${hover ? 0.45 : 0.22})`,
          borderRadius: 6,
          cursor: "pointer",
          transition: `all 618ms ${EASE}`,
          animation: `fadeUp 618ms ${600 + index * 80}ms both ease`,
          boxShadow: hover ? `0 0 18px rgba(${rgb},0.15), 0 0 40px rgba(${rgb},0.06)` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.618rem", marginBottom: "0.382rem" }}>
          <span style={{ fontSize: "clamp(22px, 4vmin, 32px)" }}>{sub.icon}</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(16px, 2.2vmin, 22px)",
            color: `rgba(${rgb},${hover ? 1.0 : 0.85})`,
            letterSpacing: "0.04em",
            transition: `color 382ms ${EASE}`,
          }}>{sub.name}</span>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(14px, 2vmin, 18px)",
          color: `rgba(${rgb},0.50)`,
          lineHeight: 1.618,
        }}>{sub.desc}</div>
      </div>
    </Link>
  );
}

export default function MathClient({ subcategories, doorMeta }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 23.6%, rgba(14,10,28,0.618) 0%, #03030a 61.8%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem", paddingBottom: "4rem",
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
        <Link href="/search" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(18px, 2.618vmin, 28px)",
            color: "rgba(201,168,76,0.618)", cursor: "pointer",
          }}>← BACK</span>
        </Link>
      </div>

      <div style={{
        width: "100%", maxWidth: "42rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(80px, 14vh, 130px)",
      }}>
        {/* Door emoji */}
        <div style={{
          fontSize: "clamp(48px, 10vmin, 72px)",
          animation: "fadeUp 618ms 100ms both ease",
          marginBottom: "0.618rem",
        }}>{doorMeta.emoji}</div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(28px, 6.854vmin, 48px)",
          color: "rgba(201,168,76,0.618)",
          animation: "fadeUp 618ms 100ms both ease",
          textShadow: "0 0 8px rgba(201,168,76,0.382), 0 0 24px rgba(201,168,76,0.146)",
          marginBottom: "0.382rem",
        }}>MATHEMATICS</h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: "rgba(201,168,76,0.50)", textAlign: "center",
          animation: "fadeUp 618ms 200ms both ease",
          marginBottom: "1.618rem",
        }}>"{doorMeta.tagline}"</p>

        {/* ═══ FEATURED — Vitruvian Man + CRT ═══ */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "1rem", width: "100%",
          marginBottom: "2.618rem",
        }}>
          {[
            { title: "THE VITRUVIAN MAN", sub: "Da Vinci's exact geometry — verified to the decimal", icon: "📐", href: "/mathematics/vitruvian" },
            { title: "CONVERGENT RECOGNITION", sub: "Ψ = R₁₂ × G — the master equation", icon: "Ψ", href: "/mathematics/convergent-recognition" },
          ].map((card, i) => (
            <Link key={card.title} href={card.href} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "1.618rem",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.22)",
                borderRadius: 6,
                animation: `fadeUp 618ms ${300 + i * 150}ms both ease`,
                cursor: "pointer",
                transition: `all 618ms ${EASE}`,
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  fontSize: "clamp(18px, 2.618vmin, 24px)",
                  color: "rgba(201,168,76,0.90)",
                  marginBottom: "0.382rem",
                }}>{card.icon} {card.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  fontSize: "clamp(15px, 2vmin, 20px)",
                  color: "rgba(201,168,76,0.45)",
                }}>{card.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* ═══ DIVIDER ═══ */}
        <div style={{
          width: "61.8%", height: 1, maxWidth: 200,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          marginBottom: "2.618rem",
          animation: "fadeUp 618ms 500ms both ease",
        }} />

        {/* ═══ 10 SUBCATEGORIES — 100 topic cards ═══ */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(16px, 2.2vmin, 22px)",
          letterSpacing: "0.236em",
          color: "rgba(201,168,76,0.40)",
          marginBottom: "1.618rem",
          animation: "fadeUp 618ms 550ms both ease",
        }}>EXPLORE 100 TOPICS</div>

        <div style={{
          display: "flex", flexDirection: "column",
          gap: "0.618rem",
          width: "100%",
        }}>
          {subcategories.map((sub, i) => (
            <SubCard key={sub.id} sub={sub} index={i} />
          ))}
        </div>

        {/* Back to all doors */}
        <Link href="/search" style={{
          display: "inline-block",
          marginTop: "2.618rem",
          padding: "12px 28px",
          border: "1px solid rgba(201,168,76,0.30)",
          borderRadius: 6,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(12px, 1.8vmin, 16px)",
          letterSpacing: "0.15em",
          fontWeight: 700,
          color: "rgba(201,168,76,0.80)",
          textDecoration: "none",
        }}>
          ← EXPLORE ALL DOORS
        </Link>
      </div>
    </div>
  );
}
