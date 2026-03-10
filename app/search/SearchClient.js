'use client';

import { useState } from 'react';
import Link from 'next/link';

const PHI = 1.618033988749895;
const PHIi = 1 / PHI;
const EASE = "cubic-bezier(0.23,1,0.32,1)";

const DOORS = [
  { name: "LOVE",          emoji: "💛", slug: "love",          color: "220,160,160" },
  { name: "MYSTICISM",     emoji: "✨", slug: "mysticism",     color: "190,140,220" },
  { name: "CONSCIOUSNESS", emoji: "👁️", slug: "consciousness", color: "200,200,230" },
  { name: "RELIGION",      emoji: "⛪", slug: "religion",      color: "201,168,76" },
  { name: "ART",           emoji: "🎨", slug: "art",           color: "224,120,100" },
  { name: "NATURE",        emoji: "🌿", slug: "nature",        color: "120,180,100" },
  { name: "MYTHOLOGY",     emoji: "📖", slug: "mythology",     color: "200,160,100" },
  { name: "PHILOSOPHY",    emoji: "🏛️", slug: "philosophy",    color: "150,180,220" },
  { name: "SCIENCE",       emoji: "🔬", slug: "science",       color: "79,195,247" },
  { name: "MATHEMATICS",   emoji: "📐", slug: "mathematics",   color: "201,168,76" },
];

// Pyramid layout for desktop
const PYRAMID = [
  [0],        // LOVE
  [1, 2],     // MYSTICISM, CONSCIOUSNESS
  [3, 4, 5],  // RELIGION, ART, NATURE
  [6, 7, 8, 9], // MYTHOLOGY, PHILOSOPHY, SCIENCE, MATHEMATICS
];

function DoorCard({ door, size }) {
  const [hover, setHover] = useState(false);
  const rgb = door.color;
  return (
    <Link href={`/${door.slug}`}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: size === "grid" ? "100%" : undefined,
          height: size === "grid" ? undefined : undefined,
          minHeight: size === "grid" ? 100 : 90,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 6,
          borderRadius: 6,
          background: `rgba(${rgb},${hover ? 0.18 : 0.12})`,
          border: `1px solid rgba(${rgb},${hover ? 0.50 : 0.30})`,
          boxShadow: hover
            ? `0 0 24px rgba(${rgb},0.22), 0 0 48px rgba(${rgb},0.07)`
            : "none",
          transition: `all 618ms ${EASE}`,
          cursor: "pointer",
          padding: "12px 16px",
          userSelect: "none",
        }}
      >
        <div style={{ fontSize: 32, lineHeight: 1 }}>{door.emoji}</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(10px, 2.5vw, 14px)",
          letterSpacing: "0.04em",
          color: `rgba(${rgb},${hover ? 1.0 : 0.90})`,
          textAlign: "center",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}>{door.name}</div>
      </div>
    </Link>
  );
}

export default function SearchClient() {
  const W = typeof window !== "undefined" ? window.innerWidth : 800;
  const isMobile = W < 520;

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 12%, rgba(14,10,28,0.7) 0%, #03030a 61.8%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem",
      paddingBottom: "4rem",
    }}>

      {/* Back — frosted header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
        height: "clamp(56px, 8vh, 72px)",
        background: "linear-gradient(180deg, rgba(3,3,10,0.92) 0%, rgba(3,3,10,0.6) 70%, transparent 100%)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center",
        paddingLeft: "1.618rem",
        pointerEvents: "none",
      }}>
        <Link href="/" style={{ pointerEvents: "auto" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(18px, 2.618vmin, 28px)",
            color: "rgba(201,168,76,0.618)",
            letterSpacing: "-0.0382em",
            cursor: "pointer",
            transition: `color 618ms ${EASE}`,
          }}>← BACK</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "40rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(72px, 11vh, 110px)",
      }}>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 4.236vmin, 36px)",
          letterSpacing: "0.236em",
          color: "rgba(201,168,76,0.618)",
          textAlign: "center",
          animation: "fadeUp 1s 100ms both ease",
          marginBottom: "0.618rem",
          textShadow: "0 0 8px rgba(201,168,76,0.382), 0 0 24px rgba(201,168,76,0.146), 0 0 48px rgba(201,168,76,0.09)",
          lineHeight: 1.1,
        }}>SEARCH & EXPLORE</h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: "rgba(232,228,210,0.618)",
          textAlign: "center",
          animation: "fadeUp 1s 236ms both ease",
          marginBottom: "1.618rem",
          lineHeight: 1.618,
        }}>
          Click to explore or type your search below.
        </p>

        {/* Navigation buttons */}
        <div style={{
          display: "flex", gap: "0.618rem", marginBottom: "1.618rem",
          animation: "fadeUp 1s 300ms both ease",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <Link href="/poems">
            <button style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.30)",
              borderRadius: 6,
              padding: "12px 28px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(12px, 1.8vmin, 16px)",
              letterSpacing: "0.15em",
              fontWeight: 700,
              color: "rgba(201,168,76,0.80)",
              cursor: "pointer",
            }}>✦ POEMS</button>
          </Link>
          <Link href="/mathematics">
            <button style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.30)",
              borderRadius: 6,
              padding: "12px 28px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(12px, 1.8vmin, 16px)",
              letterSpacing: "0.15em",
              fontWeight: 700,
              color: "rgba(201,168,76,0.80)",
              cursor: "pointer",
            }}>✦ MATHEMATICS</button>
          </Link>
        </div>

        {/* Ten doors */}
        {isMobile ? (
          /* Mobile: 2-column grid */
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            width: "100%",
            animation: "fadeUp 1s 382ms both ease",
          }}>
            {DOORS.map((door) => (
              <DoorCard key={door.slug} door={door} size="grid" />
            ))}
          </div>
        ) : (
          /* Desktop: pyramid */
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 10, width: "100%",
            animation: "fadeUp 1s 382ms both ease",
          }}>
            {PYRAMID.map((rowIndices, ri) => (
              <div key={ri} style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {rowIndices.map((di) => {
                  const door = DOORS[di];
                  return (
                    <div key={door.slug} style={{ width: 150, height: 100 }}>
                      <DoorCard door={door} size="fixed" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Search input */}
        <div style={{
          width: "100%", marginTop: "1.618rem",
          animation: "fadeUp 1s 500ms both ease",
        }}>
          <input
            type="text"
            placeholder="What are you searching for?"
            style={{
              width: "100%",
              padding: "16px 20px",
              background: "rgba(232,228,210,0.04)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: 6,
              color: "#e8e8f0",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2.618vmin, 22px)",
              fontWeight: 400,
              outline: "none",
              transition: `border-color 382ms ${EASE}`,
            }}
            onFocus={(e) => e.target.style.borderColor = "rgba(201,168,76,0.55)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(201,168,76,0.25)"}
          />
        </div>
      </div>
    </div>
  );
}
