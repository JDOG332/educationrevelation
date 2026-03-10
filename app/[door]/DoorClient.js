'use client';

import { useState } from 'react';
import Link from 'next/link';

const EASE = "cubic-bezier(0.23,1,0.32,1)";

export default function DoorClient({ doorSlug, doorMeta }) {
  const [backH, setBackH] = useState(false);
  const rgb = doorMeta.color;

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 12%, rgba(${rgb},0.06) 0%, #03030a 61.8%)`,
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
        <Link href="/search" style={{ pointerEvents: "auto" }}>
          <span
            onMouseEnter={() => setBackH(true)}
            onMouseLeave={() => setBackH(false)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 2.618vmin, 28px)",
              color: `rgba(${rgb},${backH ? 1.0 : 0.618})`,
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
          filter: `drop-shadow(0 0 18px rgba(${rgb},0.4))`,
        }}>{doorMeta.emoji}</div>

        {/* Door name */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 4.236vmin, 36px)",
          letterSpacing: "0.236em",
          color: `rgba(${rgb},0.80)`,
          textAlign: "center",
          animation: "fadeUp 618ms 200ms both ease",
          marginBottom: "0.618rem",
          textShadow: `0 0 8px rgba(${rgb},0.382), 0 0 24px rgba(${rgb},0.146)`,
          lineHeight: 1.1,
        }}>{doorMeta.name.toUpperCase()}</h1>

        {/* Door question */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: `rgba(${rgb},0.55)`,
          textAlign: "center",
          animation: "fadeUp 618ms 300ms both ease",
          marginBottom: "2.618rem",
          lineHeight: 1.618,
          maxWidth: "30rem",
        }}>"{doorMeta.question}"</p>

        {/* Divider */}
        <div style={{
          width: "61.8%", height: 1, maxWidth: 200,
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.3), transparent)`,
          marginBottom: "2.618rem",
          animation: "fadeUp 618ms 400ms both ease",
        }} />

        {/* Placeholder for subcategories — will be populated from topicCards */}
        <div style={{
          width: "100%",
          animation: "fadeUp 618ms 500ms both ease",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 2vmin, 22px)",
            color: "rgba(232,228,210,0.45)",
            fontStyle: "italic",
            lineHeight: 1.618,
          }}>
            This door is being built. The content from siftdirt.com will be mirrored here — every subcategory, every topic card, every sense, every song. Shareable. Indexable. Findable.
          </p>

          <Link href="/search" style={{
            display: "inline-block",
            marginTop: "2.618rem",
            padding: "12px 28px",
            border: `1px solid rgba(${rgb},0.30)`,
            borderRadius: 6,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(12px, 1.8vmin, 16px)",
            letterSpacing: "0.15em",
            fontWeight: 700,
            color: `rgba(${rgb},0.80)`,
            transition: `all 382ms ${EASE}`,
          }}>
            ← EXPLORE ALL DOORS
          </Link>
        </div>
      </div>
    </div>
  );
}
