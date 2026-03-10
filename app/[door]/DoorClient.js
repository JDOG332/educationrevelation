'use client';

import { useState } from 'react';
import Link from 'next/link';

const EASE = "cubic-bezier(0.23,1,0.32,1)";

function SubCard({ sub, doorSlug, index }) {
  const [hover, setHover] = useState(false);
  const rgb = sub.accent;

  return (
    <Link href={`/${doorSlug}/${sub.id}`} style={{ textDecoration: "none" }}>
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
          animation: `fadeUp 618ms ${200 + index * 80}ms both ease`,
          boxShadow: hover
            ? `0 0 18px rgba(${rgb},0.15), 0 0 40px rgba(${rgb},0.06)`
            : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.618rem", marginBottom: "0.382rem" }}>
          <span style={{ fontSize: "clamp(22px, 4vmin, 32px)" }}>{sub.icon}</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 2.2vmin, 20px)",
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
        {sub.psi && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(10px, 1.4vmin, 13px)",
            color: `rgba(${rgb},0.30)`,
            marginTop: "0.382rem",
            fontWeight: 300,
          }}>Ψ {sub.psi.toFixed(4)}</div>
        )}
      </div>
    </Link>
  );
}

export default function DoorClient({ doorSlug, doorMeta, subcategories, dataKey }) {
  const [backH, setBackH] = useState(false);

  // Use first subcategory's accent for the door color, or default gold
  const doorRgb = subcategories[0]?.accent || "201,168,76";

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 8%, rgba(${doorRgb},0.05) 0%, #03030a 50%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem",
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
        <Link href="/search" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span
            onMouseEnter={() => setBackH(true)}
            onMouseLeave={() => setBackH(false)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 2.618vmin, 28px)",
              color: `rgba(201,168,76,${backH ? 1.0 : 0.618})`,
              letterSpacing: "-0.0382em",
              cursor: "pointer",
              transition: `color 618ms ${EASE}`,
            }}>← BACK</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "42rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(72px, 11vh, 110px)",
      }}>

        {/* Door emoji */}
        <div style={{
          fontSize: "clamp(48px, 10vmin, 72px)",
          animation: "fadeUp 618ms 100ms both ease",
          marginBottom: "0.618rem",
        }}>{doorMeta.emoji}</div>

        {/* Door name */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 4.236vmin, 36px)",
          letterSpacing: "0.236em",
          color: `rgba(${doorRgb},0.80)`,
          textAlign: "center",
          animation: "fadeUp 618ms 150ms both ease",
          marginBottom: "0.618rem",
          textShadow: `0 0 8px rgba(${doorRgb},0.3), 0 0 24px rgba(${doorRgb},0.12)`,
          lineHeight: 1.1,
        }}>{doorMeta.name}</h1>

        {/* Door question */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: `rgba(${doorRgb},0.50)`,
          textAlign: "center",
          animation: "fadeUp 618ms 200ms both ease",
          marginBottom: "2.618rem",
          lineHeight: 1.618,
          maxWidth: "30rem",
        }}>"{doorMeta.tagline}"</p>

        {/* Subcategories grid */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: "0.618rem",
          width: "100%",
        }}>
          {subcategories.map((sub, i) => (
            <SubCard key={sub.id} sub={sub} doorSlug={doorSlug} index={i} />
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
