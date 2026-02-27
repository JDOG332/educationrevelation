/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 Rooms inside each Door
   Navigation: ARROWS OF TIME — clean, mobile-safe
   ═══════════════════════════════════════════════════════════════ */

import { useState } from "react";
import { PHI } from "./data.js";
import { SUBCATEGORIES, DOOR_META } from "./subcategories.js";

/* ── ARROW OF TIME — mobile-safe nav button ─────────────────── */
function ArrowOfTime({ label, direction = "back", onClick, accent = "201,168,76" }) {
  const isBack = direction === "back";
  const arrow = isBack ? "◂" : "▸";

  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        background: `rgba(${accent},0.04)`,
        border: `1px solid rgba(${accent},0.12)`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: `${Math.round(4 * PHI)}px ${Math.round(6 * PHI)}px`,
        flexDirection: isBack ? "row" : "row-reverse",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={{
        fontSize: 20,
        color: `rgba(${accent},0.5)`,
        lineHeight: 1,
      }}>{arrow}</span>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(13px, 3vw, 16px)",
        letterSpacing: "0.15em",
        color: "rgba(232,232,240,0.55)",
      }}>{label}</span>
    </button>
  );
}

/* ── SMALL ARROW — prev/next at bottom ──────────────────────── */
function SmallArrow({ label, direction = "back", onClick, accent = "201,168,76" }) {
  const isBack = direction === "back";
  const arrow = isBack ? "◂" : "▸";

  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        background: `rgba(${accent},0.03)`,
        border: `1px solid rgba(${accent},0.08)`,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: `${Math.round(3 * PHI)}px ${Math.round(4 * PHI)}px`,
        flexDirection: isBack ? "row" : "row-reverse",
        WebkitTapHighlightColor: "transparent",
        maxWidth: "45vw",
      }}
    >
      <span style={{
        fontSize: 14,
        color: `rgba(${accent},0.4)`,
        lineHeight: 1,
      }}>{arrow}</span>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(9px, 2vw, 12px)",
        letterSpacing: "0.1em",
        color: "rgba(232,232,240,0.35)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>{label}</span>
    </button>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 Rooms
   ═══════════════════════════════════════════════════════════════ */
export default function SubcategoryGrid({ doorKey, onSelectSub, onSelectContent, onBack }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];

  if (!meta || subs.length === 0) return null;

  return (
    <div style={{
      maxWidth: 700, margin: "0 auto", width: "100%",
      padding: `${Math.round(13 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
      animation: "fadeSlideUp 0.6s ease",
      zIndex: 5000, position: "relative",
      background: "#030306", minHeight: "100vh",
    }}>
      {/* ── ARROW OF TIME: BACK ── */}
      <ArrowOfTime
        label="THE PROOF"
        direction="back"
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
      />

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
        {subs.map((sub, i) => (
          <div
            key={sub.id}
            onClick={() => { onSelectSub(sub.id); window.scrollTo(0, 0); }}
            style={{
              position: "relative",
              padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px`,
              borderRadius: 10,
              background: `linear-gradient(180deg, rgba(${sub.accent},0.04), rgba(3,3,6,0.7))`,
              border: `1px solid rgba(${sub.accent},0.1)`,
              cursor: "pointer",
              overflow: "hidden",
              animation: `fadeSlideUp 0.6s ${0.08 + i * 0.06}s both ease`,
              textAlign: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* Top glow line */}
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
              background: `linear-gradient(90deg, transparent, rgba(${sub.accent},0.12), transparent)`,
            }} />

            {/* Icon */}
            <div style={{
              fontSize: "clamp(24px, 5vw, 32px)",
              marginBottom: Math.round(2 * PHI),
            }}>{sub.icon}</div>

            {/* Name */}
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(10px, 2.4vw, 14px)",
              letterSpacing: "0.1em",
              color: `rgba(${sub.accent},0.7)`,
              fontWeight: 600,
              lineHeight: 1.3,
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

            {/* Ψ score */}
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 8,
              letterSpacing: "0.2em",
              color: `rgba(${sub.accent},0.2)`,
              marginTop: Math.round(3 * PHI),
            }}>Ψ {sub.psi.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Door Essay link */}
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
              WebkitTapHighlightColor: "transparent",
            }}
          >✦ DOOR ESSAY ✦</button>
        </div>
      )}

      {/* Bottom */}
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
        fontSize: 18, opacity: 0.25,
      }}>🪙🪙</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY VIEW — Inside a single Room
   ═══════════════════════════════════════════════════════════════ */
export function SubcategoryView({ doorKey, subId, onBack }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];
  const sub = subs.find(s => s.id === subId);
  
  if (!meta || !sub) return null;

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
      {/* ── ARROW OF TIME: BACK TO DOOR ── */}
      <ArrowOfTime
        label={meta.name}
        direction="back"
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
      />

      {/* Subcategory Header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(13 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
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

      {/* Topic Cards — Coming Soon */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cinzel', serif",
        fontSize: 11,
        letterSpacing: "0.4em",
        color: "rgba(232,232,240,0.2)",
        marginBottom: Math.round(5 * PHI),
      }}>TOPIC CARDS</div>

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

      {/* ── ARROWS OF TIME: PREV / NEXT ── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginBottom: Math.round(13 * PHI),
      }}>
        {prev ? (
          <SmallArrow
            label={prev.name}
            direction="back"
            onClick={() => { onBack(); }}
            accent={prev.accent}
          />
        ) : <div />}
        {next ? (
          <SmallArrow
            label={next.name}
            direction="forward"
            onClick={() => { onBack(); }}
            accent={next.accent}
          />
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
        fontSize: 18, opacity: 0.25,
      }}>🪙🪙</div>
    </div>
  );
}
