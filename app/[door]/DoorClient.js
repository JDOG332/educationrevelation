'use client';

import { useState } from 'react';
import Link from 'next/link';


/* ─── SUBCATEGORY CARD ────────────────────────────────────────── */
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
          borderRadius: "0.382rem",
          cursor: "pointer",
          transition: "all 618ms var(--ease-snap)",
          animation: `fadeUp 618ms ${200 + index * 80}ms both ease`,
          boxShadow: hover
            ? `0 0 1.125rem rgba(${rgb},0.15), 0 0 2.5rem rgba(${rgb},0.06)`
            : "none",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center",
          gap: "0.618rem", marginBottom: "0.382rem",
        }}>
          <span style={{
            fontSize: "clamp(1.375rem, 4vmin + 0.25rem, 2rem)",
          }}>{sub.icon}</span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(0.938rem, 2.2vmin + 0.2rem, 1.25rem)",
            color: `rgba(${rgb},${hover ? 1.0 : 0.85})`,
            letterSpacing: "0.04em",
            transition: "color 382ms var(--ease-snap)",
          }}>{sub.name}</span>
        </div>
        <div style={{
          fontFamily: "var(--font-accent)",
          fontStyle: "italic",
          fontSize: "clamp(0.875rem, 2vmin + 0.15rem, 1.125rem)",
          color: `rgba(${rgb},0.50)`,
          lineHeight: 1.618,
        }}>{sub.desc}</div>
        {sub.psi && (
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.618rem, 1.4vmin + 0.1rem, 0.812rem)",
            color: `rgba(${rgb},0.30)`,
            marginTop: "0.382rem",
            fontWeight: 300,
          }}>Ψ {sub.psi.toFixed(4)}</div>
        )}
      </div>
    </Link>
  );
}


/* ═══════════════════════════════════════════════════════════════
   DOOR PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function DoorClient({ doorSlug, doorMeta, subcategories, dataKey }) {
  // Door color from first subcategory's accent, fallback to gold
  const doorRgb = subcategories[0]?.accent || "201,168,76";

  return (
    <div className="phi-page" style={{
      background: `radial-gradient(ellipse at 50% 8%, rgba(${doorRgb},0.05) 0%, #03030a 50%)`,
      paddingBottom: "4.236rem",
    }}>

      {/* Frosted header */}
      <div className="frosted-header" style={{ justifyContent: "space-between", paddingRight: "1.618rem" }}>
        <Link href="/search" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span className="back-link">← BACK</span>
        </Link>
        <Link href="/search" className="explore-link">SEARCH & EXPLORE</Link>
      </div>

      {/* Content */}
      <div className="content-below-header" style={{
        width: "100%", maxWidth: "var(--content-max)",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Door emoji */}
        <div className="stagger-fade" style={{
          fontSize: "clamp(3rem, 10vmin + 0.5rem, 4.5rem)",
          animationDelay: "100ms",
          marginBottom: "0.618rem",
        }}>{doorMeta.emoji}</div>

        {/* Door name */}
        <h1 className="stagger-fade" style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(1.375rem, 4.236vmin + 0.25rem, 2.25rem)",
          letterSpacing: "0.236em",
          color: `rgba(${doorRgb},0.80)`,
          textAlign: "center",
          animationDelay: "150ms",
          marginBottom: "0.618rem",
          textShadow: `0 0 0.5rem rgba(${doorRgb},0.3), 0 0 1.5rem rgba(${doorRgb},0.12)`,
          lineHeight: 1.1,
        }}>{doorMeta.name}</h1>

        {/* Door question */}
        <p className="stagger-fade" style={{
          fontFamily: "var(--font-accent)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
          color: `rgba(${doorRgb},0.50)`,
          textAlign: "center",
          animationDelay: "200ms",
          marginBottom: "2.618rem",
          lineHeight: 1.618,
          maxWidth: "30rem",
        }}>"{doorMeta.tagline}"</p>

        {/* Subcategories */}
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
        <Link href="/search" className="btn-ghost" style={{
          marginTop: "2.618rem",
          textDecoration: "none",
        }}>
          ← EXPLORE ALL DOORS
        </Link>
      </div>
    </div>
  );
}
