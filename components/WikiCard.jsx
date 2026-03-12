"use client";
/**
 * WIKI CARD — Click to fetch Wikipedia summary
 * Uses the Ψ-based wikiEngine to score sentences and return
 * the top 5 most important points with emoji rankings.
 */

import React, { useState } from "react";
import { fetchWiki } from '@/lib/wikiEngine.js';

export default function WikiCard({ label, url, rgb, index = 0 }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);

  function handleClick() {
    setOpen(o => {
      const next = !o;
      if (next && !data && !loading) {
        setLoading(true);
        setError(false);
        fetchWiki(label)
          .then((result) => { setData(result); setLoading(false); })
          .catch(() => { setError(true); setLoading(false); });
      }
      return next;
    });
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Header — clickable */}
      <button onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "0.618rem",
          background: hover
            ? `rgba(${rgb},0.236)`
            : open
              ? `rgba(${rgb},0.10)`
              : `rgba(${rgb},0.04)`,
          border: `1px solid rgba(${rgb},${hover ? 0.618 : 0.236})`,
          borderRadius: open ? "0.382rem 0.382rem 0 0" : "0.382rem",
          cursor: "pointer",
          padding: "0.618rem 1rem",
          transition: "all 382ms var(--ease-snap)",
          boxShadow: hover ? `0 0 1.125rem rgba(${rgb},0.08)` : "none",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.618rem", flex: 1 }}>
          <span style={{ fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)" }}>📖</span>
          <span style={{
            fontFamily: "var(--font-body)", fontWeight: 400,
            fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
            color: `rgba(${rgb},${hover ? 1.0 : 0.75})`,
            transition: "color 382ms var(--ease-snap)",
          }}>{label}</span>
        </div>
        <span style={{
          fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
          color: `rgba(${rgb},${hover ? 1.0 : 0.618})`,
          transition: "all 382ms var(--ease-snap)",
          transform: open ? "rotate(180deg)" : "none",
          display: "inline-block",
          flexShrink: 0,
        }}>▾</span>
      </button>

      {/* Expanded content — Wikipedia summary */}
      {open && (
        <div style={{
          padding: "1rem",
          background: `rgba(${rgb},0.03)`,
          border: `1px solid rgba(${rgb},0.236)`,
          borderTop: "none",
          borderRadius: "0 0 0.382rem 0.382rem",
          animation: "fadeIn 382ms ease",
          display: "flex", flexDirection: "column",
          gap: "0.618rem",
        }}>
          {/* Loading */}
          {loading && (
            <div style={{
              fontFamily: "var(--font-accent)", fontStyle: "italic",
              fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
              color: `rgba(${rgb},0.618)`,
              textAlign: "center",
              padding: "1rem 0",
              animation: "breathe 1.618s ease-in-out infinite",
            }}>Sifting Wikipedia...</div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
              color: "rgba(220,100,100,0.75)",
              textAlign: "center",
              padding: "0.618rem 0",
            }}>Could not fetch this article. Try the direct link below.</div>
          )}

          {/* Results — emoji bullet points */}
          {data && !loading && data.points && data.points.length > 0 && (
            <>
              {data.title && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.236rem", marginBottom: "0.236rem" }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 900,
                    fontSize: "clamp(0.938rem, 1.618vmin + 0.15rem, 1.375rem)",
                    letterSpacing: "0.06em",
                    color: `rgba(${rgb},0.75)`,
                    textAlign: "center",
                  }}>{data.title}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontWeight: 300,
                    fontSize: "clamp(0.688rem, 1vmin + 0.1rem, 1rem)",
                    color: `rgba(${rgb},0.35)`,
                  }}>{data.source === "simple" ? "Simple English Wikipedia" : "Wikipedia"}</div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
                {data.points.map((point, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "0.618rem",
                    alignItems: "flex-start",
                    padding: "0.382rem",
                    background: i === 0 ? `rgba(${rgb},0.06)` : "transparent",
                    borderRadius: "0.236rem",
                  }}>
                    <span style={{
                      fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
                      lineHeight: 1, flexShrink: 0, marginTop: "0.236rem",
                    }}>{point.emoji}</span>
                    <div style={{
                      fontFamily: "var(--font-body)", fontWeight: 400,
                      fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
                      color: i === 0 ? "rgba(232,228,210,1.0)" : "rgba(232,228,210,0.82)",
                      lineHeight: 1.618, flex: 1,
                    }}>{point.text}</div>
                  </div>
                ))}
              </div>

              <div style={{
                width: "61.8%", height: 1,
                background: `linear-gradient(90deg, transparent, rgba(${rgb},0.236), transparent)`,
                alignSelf: "center",
                margin: "0.382rem 0",
              }} />
            </>
          )}

          {/* No results */}
          {data && !loading && (!data.points || data.points.length === 0) && (
            <div style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.75rem)",
              color: "rgba(232,228,210,0.35)",
              textAlign: "center",
              padding: "0.618rem 0",
            }}>No summary available.</div>
          )}

          {/* Full article link */}
          <a href={data?.url || url} target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.618rem",
              padding: "0.618rem 1rem",
              background: `rgba(${rgb},0.06)`,
              border: `1px solid rgba(${rgb},0.236)`,
              borderRadius: "0.236rem",
              textDecoration: "none",
              transition: "all 382ms var(--ease-snap)",
              alignSelf: "center",
              width: "100%", maxWidth: "20rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(${rgb},0.236)`;
              e.currentTarget.style.borderColor = `rgba(${rgb},0.618)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(${rgb},0.06)`;
              e.currentTarget.style.borderColor = `rgba(${rgb},0.236)`;
            }}
          >
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "clamp(0.938rem, 1.618vmin + 0.15rem, 1.375rem)",
              letterSpacing: "0.06em",
              color: `rgba(${rgb},0.75)`,
            }}>READ FULL ARTICLE →</span>
          </a>
        </div>
      )}
    </div>
  );
}
