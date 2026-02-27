/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 Rooms inside each Door
   Click a door → see 10 rooms → click a room → see topic cards
   ═══════════════════════════════════════════════════════════════ */

import { useState, useCallback } from "react";
import { PHI, PHI_INV } from "./data.js";
import { SUBCATEGORIES, DOOR_META } from "./subcategories.js";

export default function SubcategoryGrid({ doorKey, onSelectSub, onSelectContent, onBack }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!meta || subs.length === 0) return null;

  return (
    <div style={{
      maxWidth: 700, margin: "0 auto", width: "100%",
      padding: `${Math.round(13 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
      animation: "fadeSlideUp 0.6s ease",
      zIndex: 5000, position: "relative",
      background: "#030306", minHeight: "100vh",
    }}>
      {/* Back button */}
      <button
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
        style={{
          cursor: "pointer", background: "none", border: "none",
          color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
          fontSize: Math.round(8 * PHI + 6), letterSpacing: Math.round(PHI + 1),
          padding: `${Math.round(3 * PHI)}px ${Math.round(5 * PHI)}px`,
          transition: "all 0.4s",
        }}
        onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
        onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
      >← THE PROOF</button>

      {/* Door Header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(8 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
        <div style={{
          fontSize: "clamp(44px, 10vw, 60px)",
          marginBottom: Math.round(5 * PHI),
          animation: "gentleFloat 8s ease-in-out infinite",
          lineHeight: 1,
        }}>{meta.emoji}</div>

        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(26px, 5.5vw, 36px)",
          fontWeight: 400,
          color: "#e8e8f0",
          letterSpacing: "0.25em",
          margin: 0,
          textShadow: "0 0 50px rgba(201,168,76,0.08)",
        }}>{meta.name}</h2>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 3vw, 19px)",
          fontStyle: "italic",
          color: "rgba(201,168,76,0.4)",
          marginTop: Math.round(3 * PHI),
          lineHeight: PHI,
          maxWidth: 400,
          margin: `${Math.round(3 * PHI)}px auto 0`,
        }}>{meta.tagline}</div>

        <div style={{
          width: Math.round(50 * PHI), height: 1,
          margin: `${Math.round(8 * PHI)}px auto 0`,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
        }} />
      </div>

      {/* Room count */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cinzel', serif",
        fontSize: 11,
        letterSpacing: "0.4em",
        color: "rgba(232,232,240,0.2)",
        marginBottom: Math.round(8 * PHI),
      }}>10 ROOMS</div>

      {/* ═══ THE GRID — 10 subcategory rooms ═══ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: Math.round(5 * PHI),
        marginBottom: Math.round(21 * PHI),
      }}>
        {subs.map((sub, i) => {
          const isHovered = hoveredIdx === i;
          const [acR, acG, acB] = sub.accent.split(",").map(Number);

          return (
            <div
              key={sub.id}
              onClick={() => { onSelectSub(sub.id); window.scrollTo(0, 0); }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px`,
                borderRadius: 10,
                background: `linear-gradient(180deg, rgba(${sub.accent},${isHovered ? 0.08 : 0.04}), rgba(3,3,6,0.7))`,
                border: `1px solid rgba(${sub.accent},${isHovered ? 0.25 : 0.1})`,
                cursor: "pointer",
                overflow: "hidden",
                transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                animation: `fadeSlideUp 0.6s ${0.08 + i * 0.06}s both ease`,
                textAlign: "center",
                transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                boxShadow: isHovered
                  ? `0 8px 30px rgba(${sub.accent},0.1), inset 0 1px 0 rgba(255,255,255,0.03)`
                  : "none",
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
                background: `linear-gradient(90deg, transparent, rgba(${sub.accent},${isHovered ? 0.25 : 0.12}), transparent)`,
                transition: "all 0.4s",
              }} />

              {/* Icon */}
              <div style={{
                fontSize: "clamp(24px, 5vw, 32px)",
                marginBottom: Math.round(2 * PHI),
                filter: isHovered ? `drop-shadow(0 0 10px rgba(${sub.accent},0.3))` : "none",
                transition: "filter 0.4s",
              }}>{sub.icon}</div>

              {/* Name */}
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(10px, 2.4vw, 14px)",
                letterSpacing: "0.1em",
                color: `rgba(${sub.accent},${isHovered ? 0.9 : 0.7})`,
                fontWeight: 600,
                lineHeight: 1.3,
                transition: "color 0.4s",
              }}>{sub.name}</div>

              {/* Description */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2.2vw, 14px)",
                color: "rgba(232,232,240,0.4)",
                fontStyle: "italic",
                marginTop: Math.round(2 * PHI),
                lineHeight: 1.5,
              }}>{sub.desc}</div>

              {/* Ψ score — subtle */}
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 8,
                letterSpacing: "0.2em",
                color: `rgba(${sub.accent},0.2)`,
                marginTop: Math.round(3 * PHI),
              }}>Ψ {sub.psi.toFixed(2)}</div>
            </div>
          );
        })}
      </div>

      {/* Door Essay link — access existing door content */}
      {onSelectContent && (
        <div style={{ textAlign: "center", marginBottom: Math.round(13 * PHI) }}>
          <button
            onClick={() => { onSelectContent(); window.scrollTo(0, 0); }}
            style={{
              cursor: "pointer",
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 8,
              padding: `${Math.round(4 * PHI)}px ${Math.round(8 * PHI)}px`,
              fontFamily: "'Cinzel', serif",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "rgba(201,168,76,0.5)",
              transition: "all 0.4s",
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = "rgba(201,168,76,0.3)";
              e.target.style.color = "rgba(201,168,76,0.7)";
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = "rgba(201,168,76,0.12)";
              e.target.style.color = "rgba(201,168,76,0.5)";
            }}
          >✦ DOOR ESSAY ✦</button>
        </div>
      )}

      {/* Bottom wisdom */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(13px, 2.5vw, 16px)",
        fontStyle: "italic",
        color: "rgba(201,168,76,0.2)",
        lineHeight: PHI,
        marginTop: Math.round(8 * PHI),
      }}>every room leads to the same center</div>

      <div style={{
        textAlign: "center",
        marginTop: Math.round(5 * PHI),
        fontSize: 18,
        opacity: 0.25,
      }}>🪙🪙</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY VIEW — Inside a single Room (placeholder for topic cards)
   ═══════════════════════════════════════════════════════════════ */

export function SubcategoryView({ doorKey, subId, onBack }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];
  const sub = subs.find(s => s.id === subId);
  
  if (!meta || !sub) return null;

  // Find position in list for prev/next navigation
  const idx = subs.findIndex(s => s.id === subId);
  const prev = idx > 0 ? subs[idx - 1] : null;
  const next = idx < subs.length - 1 ? subs[idx + 1] : null;

  return (
    <div style={{
      maxWidth: 700, margin: "0 auto", width: "100%",
      padding: `${Math.round(13 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
      animation: "fadeSlideUp 0.6s ease",
      zIndex: 5000, position: "relative",
      background: "#030306", minHeight: "100vh",
    }}>
      {/* Back button */}
      <button
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
        style={{
          cursor: "pointer", background: "none", border: "none",
          color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
          fontSize: Math.round(8 * PHI + 6), letterSpacing: Math.round(PHI + 1),
          padding: `${Math.round(3 * PHI)}px ${Math.round(5 * PHI)}px`,
          transition: "all 0.4s",
        }}
        onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
        onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
      >← {meta.name}</button>

      {/* Subcategory Header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(13 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
        {/* Parent door breadcrumb */}
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 10,
          letterSpacing: "0.4em",
          color: "rgba(201,168,76,0.25)",
          marginBottom: Math.round(5 * PHI),
        }}>{meta.emoji} {meta.name}</div>

        <div style={{
          fontSize: "clamp(44px, 10vw, 56px)",
          marginBottom: Math.round(5 * PHI),
          animation: "gentleFloat 8s ease-in-out infinite",
          lineHeight: 1,
        }}>{sub.icon}</div>

        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 400,
          color: "#e8e8f0",
          letterSpacing: "0.2em",
          margin: 0,
        }}>{sub.name}</h2>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(15px, 3vw, 19px)",
          fontStyle: "italic",
          color: `rgba(${sub.accent},0.5)`,
          marginTop: Math.round(3 * PHI),
          lineHeight: PHI,
          maxWidth: 420,
          margin: `${Math.round(3 * PHI)}px auto 0`,
        }}>{sub.desc}</div>

        {/* Ψ score bar */}
        <div style={{
          marginTop: Math.round(8 * PHI),
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 9,
            letterSpacing: "0.3em", color: `rgba(${sub.accent},0.3)`,
          }}>Ψ</div>
          <div style={{
            width: 100, height: 3, borderRadius: 2,
            background: `rgba(${sub.accent},0.1)`,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${sub.psi * 100}%`, height: "100%",
              background: `rgba(${sub.accent},0.4)`,
              borderRadius: 2,
              transition: "width 1.5s ease",
            }} />
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 9,
            letterSpacing: "0.2em", color: `rgba(${sub.accent},0.3)`,
          }}>{sub.psi.toFixed(3)}</div>
        </div>

        <div style={{
          width: Math.round(50 * PHI), height: 1,
          margin: `${Math.round(8 * PHI)}px auto 0`,
          background: `linear-gradient(90deg, transparent, rgba(${sub.accent},0.25), transparent)`,
        }} />
      </div>

      {/* Topic Cards area — Coming Soon */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cinzel', serif",
        fontSize: 11,
        letterSpacing: "0.4em",
        color: "rgba(232,232,240,0.2)",
        marginBottom: Math.round(5 * PHI),
      }}>TOPIC CARDS</div>

      {/* 10 placeholder slots */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: Math.round(5 * PHI),
        marginBottom: Math.round(21 * PHI),
      }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1 / 1",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 10,
              background: `rgba(${sub.accent},0.015)`,
              border: `1px dashed rgba(${sub.accent},0.08)`,
              animation: `fadeSlideUp 0.5s ${0.3 + i * 0.05}s both ease`,
              textAlign: "center",
              padding: 12,
            }}
          >
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: `rgba(${sub.accent},0.15)`,
            }}>{i + 1}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12,
              fontStyle: "italic",
              color: "rgba(232,232,240,0.12)",
              marginTop: 4,
            }}>coming soon</div>
          </div>
        ))}
      </div>

      {/* Prev / Next nav */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        padding: `0 ${Math.round(3 * PHI)}px`,
        marginBottom: Math.round(13 * PHI),
      }}>
        {prev ? (
          <button
            onClick={() => { onBack(); setTimeout(() => {
              // Navigate to prev sub - handled by parent
            }, 50); }}
            style={{
              cursor: "pointer", background: "none", border: "none",
              fontFamily: "'Cinzel', serif", fontSize: 11,
              letterSpacing: "0.15em", color: "rgba(232,232,240,0.3)",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.6)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.3)"}
          >← {prev.name}</button>
        ) : <div />}
        {next ? (
          <button
            onClick={() => { onBack(); setTimeout(() => {
              // Navigate to next sub - handled by parent  
            }, 50); }}
            style={{
              cursor: "pointer", background: "none", border: "none",
              fontFamily: "'Cinzel', serif", fontSize: 11,
              letterSpacing: "0.15em", color: "rgba(232,232,240,0.3)",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.6)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.3)"}
          >{next.name} →</button>
        ) : <div />}
      </div>

      {/* Bottom */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(13px, 2.5vw, 16px)",
        fontStyle: "italic",
        color: "rgba(201,168,76,0.2)",
        lineHeight: PHI,
      }}>the seed eats the dirt</div>

      <div style={{
        textAlign: "center",
        marginTop: Math.round(5 * PHI),
        fontSize: 18,
        opacity: 0.25,
      }}>🪙🪙</div>
    </div>
  );
}
