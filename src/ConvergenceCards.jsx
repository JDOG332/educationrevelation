/* ═══════════════════════════════════════════════════════════════
   CONVERGENCE CARDS — 33 Triads × 3 Cards = 99 Proofs
   "2 → 1" — Every pair is the same equation in a different mask.
   Each card loops to the other 2 in its triad.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useCallback } from "react";
import { PHI, PHI_INV } from "./data.js";
import { TRIADS, getSiblings } from "./convergenceData.js";

export default function ConvergenceCards({ onReturn }) {
  const [activeTriad, setActiveTriad] = useState(null);   // triad index
  const [activeCard, setActiveCard] = useState(null);      // card id
  const [fadeState, setFadeState] = useState("in");        // "in" | "out"

  const SACRED_FADE = Math.round(PHI * 382); // 618ms

  const fadeTransition = useCallback((callback) => {
    setFadeState("out");
    setTimeout(() => {
      callback();
      setFadeState("in");
    }, SACRED_FADE);
  }, []);

  const openTriad = (index) => fadeTransition(() => {
    setActiveTriad(index);
    setActiveCard(null);
  });

  const openCard = (cardId) => fadeTransition(() => {
    setActiveCard(cardId);
  });

  const goBackToGrid = () => fadeTransition(() => {
    setActiveTriad(null);
    setActiveCard(null);
  });

  const goBackToTriad = () => fadeTransition(() => {
    setActiveCard(null);
  });

  const triad = activeTriad !== null ? TRIADS[activeTriad] : null;
  const card = activeCard !== null ? triad?.cards.find(c => c.id === activeCard) : null;
  const siblings = activeCard !== null ? getSiblings(activeCard) : [];

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "#030306",
      position: "relative", zIndex: 1500,
      fontFamily: "'Cormorant Garamond', serif",
    }}>

      {/* HEADER */}
      <div style={{
        textAlign: "center",
        padding: `${Math.round(34 * PHI)}px 16px ${Math.round(13 * PHI)}px`,
        opacity: fadeState === "out" ? 0 : 1,
        transition: `opacity ${SACRED_FADE}ms ease`,
      }}>
        <div style={{
          fontSize: "clamp(11px, 2.2vw, 14px)",
          letterSpacing: "0.5em", color: "rgba(201,168,76,0.35)",
          fontFamily: "'Cinzel', serif",
          marginBottom: Math.round(5 * PHI),
        }}>THE CONVERGENCE LIST</div>
        <div style={{
          fontSize: "clamp(28px, 6vw, 42px)",
          fontFamily: "'Cinzel', serif",
          color: "#e8e8f0", letterSpacing: "0.2em", fontWeight: 400,
        }}>2 → 1</div>
        <div style={{
          fontSize: "clamp(13px, 2.5vw, 16px)",
          fontStyle: "italic", color: "rgba(232,232,240,0.3)",
          marginTop: Math.round(5 * PHI),
        }}>
          {activeTriad === null
            ? "33 triads · 99 proofs · every pair is the same equation"
            : activeCard === null
              ? `${triad.name} — tap a card`
              : `${card.a} + ${card.b} = ${card.result}`
          }
        </div>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1, width: "100%", maxWidth: 600,
        padding: "0 16px",
        opacity: fadeState === "out" ? 0 : 1,
        transform: `translateY(${fadeState === "out" ? 12 : 0}px)`,
        transition: `all ${SACRED_FADE}ms ease`,
      }}>

        {/* ═══ VIEW 1: THE GRID — 33 triads ═══ */}
        {activeTriad === null && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: Math.round(5 * PHI),
            paddingBottom: Math.round(34 * PHI),
          }}>
            {TRIADS.map((t, i) => (
              <div
                key={i}
                onClick={() => openTriad(i)}
                style={{
                  aspectRatio: "1 / 1",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  borderRadius: Math.round(3 * PHI),
                  background: `linear-gradient(180deg, rgba(${t.accent},0.06), rgba(3,3,6,0.7))`,
                  border: `1px solid rgba(${t.accent},0.12)`,
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  animation: `fadeSlideUp 0.5s ${(i * 0.04)}s both ease`,
                  textAlign: "center",
                  padding: 6,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.borderColor = `rgba(${t.accent},0.3)`;
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(${t.accent},0.1)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = `rgba(${t.accent},0.12)`;
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {/* Triad number */}
                <div style={{
                  fontSize: 9, color: `rgba(${t.accent},0.3)`,
                  fontFamily: "'Cinzel', serif", letterSpacing: 2,
                  marginBottom: 2,
                }}>{i + 1}</div>
                {/* Icons of the 3 cards */}
                <div style={{ fontSize: "clamp(14px, 3vw, 20px)", marginBottom: 4 }}>
                  {t.cards.map(c => c.icon).join(" ")}
                </div>
                {/* Triad name */}
                <div style={{
                  fontSize: "clamp(7px, 1.6vw, 10px)",
                  fontFamily: "'Cinzel', serif",
                  color: `rgba(${t.accent},0.7)`,
                  letterSpacing: "0.15em",
                  lineHeight: 1.3,
                }}>{t.name}</div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ VIEW 2: INSIDE A TRIAD — 3 cards ═══ */}
        {activeTriad !== null && activeCard === null && triad && (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: Math.round(8 * PHI),
            paddingBottom: Math.round(34 * PHI),
          }}>
            {/* Triad title */}
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(18px, 4vw, 26px)",
              color: `rgba(${triad.accent},0.7)`,
              letterSpacing: "0.3em", marginBottom: Math.round(5 * PHI),
            }}>{triad.name}</div>

            {/* The 3 cards */}
            {triad.cards.map((c, ci) => (
              <div
                key={c.id}
                onClick={() => openCard(c.id)}
                style={{
                  width: "100%", maxWidth: 420,
                  padding: `${Math.round(13 * PHI)}px ${Math.round(8 * PHI)}px`,
                  borderRadius: Math.round(5 * PHI),
                  background: `linear-gradient(135deg, rgba(${triad.accent},0.05), rgba(3,3,6,0.6))`,
                  border: `1px solid rgba(${triad.accent},0.15)`,
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  animation: `fadeSlideUp 0.6s ${ci * 0.15}s both ease`,
                  textAlign: "center",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = `rgba(${triad.accent},0.35)`;
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(${triad.accent},0.1)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = `rgba(${triad.accent},0.15)`;
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{c.icon}</div>
                <div style={{
                  fontSize: "clamp(13px, 2.8vw, 17px)",
                  color: "rgba(232,232,240,0.5)", fontStyle: "italic",
                  marginBottom: 4,
                }}>
                  <span style={{ color: `rgba(${triad.accent},0.8)` }}>{c.a}</span>
                  {" + "}
                  <span style={{ color: `rgba(${triad.accent},0.8)` }}>{c.b}</span>
                </div>
                <div style={{
                  fontSize: "clamp(10px, 2vw, 13px)",
                  letterSpacing: "0.2em",
                  fontFamily: "'Cinzel', serif",
                  color: "rgba(232,232,240,0.3)",
                }}>= {c.result}</div>
              </div>
            ))}

            {/* 3-way loop visualization */}
            <svg width="80" height="80" viewBox="0 0 80 80" style={{
              margin: `${Math.round(5 * PHI)}px auto`,
              opacity: 0.2,
            }}>
              <circle cx="40" cy="15" r="6" fill="none" stroke={`rgba(${triad.accent},0.6)`} strokeWidth="1" />
              <circle cx="18" cy="60" r="6" fill="none" stroke={`rgba(${triad.accent},0.6)`} strokeWidth="1" />
              <circle cx="62" cy="60" r="6" fill="none" stroke={`rgba(${triad.accent},0.6)`} strokeWidth="1" />
              <line x1="40" y1="21" x2="21" y2="55" stroke={`rgba(${triad.accent},0.3)`} strokeWidth="0.5" />
              <line x1="21" y1="57" x2="59" y2="57" stroke={`rgba(${triad.accent},0.3)`} strokeWidth="0.5" />
              <line x1="59" y1="55" x2="40" y2="21" stroke={`rgba(${triad.accent},0.3)`} strokeWidth="0.5" />
            </svg>

            {/* Back button */}
            <button onClick={goBackToGrid} style={{
              cursor: "pointer", background: "none", border: "none",
              color: "rgba(232,232,240,0.4)", fontFamily: "'Cinzel', serif",
              fontSize: 13, letterSpacing: 3, padding: "8px 16px",
              transition: "color 0.4s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.7)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.4)"}
            >← ALL TRIADS</button>
          </div>
        )}

        {/* ═══ VIEW 3: SINGLE CARD — with sibling links ═══ */}
        {activeCard !== null && card && triad && (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center",
            paddingBottom: Math.round(34 * PHI),
            textAlign: "center",
          }}>
            {/* The card — big */}
            <div style={{
              fontSize: 56, marginBottom: Math.round(8 * PHI),
              animation: "fadeSlideUp 0.6s both ease",
            }}>{card.icon}</div>

            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(22px, 5vw, 32px)",
              color: `rgba(${triad.accent},0.8)`,
              letterSpacing: "0.15em",
              animation: "fadeSlideUp 0.6s 0.1s both ease",
            }}>{card.a}</div>

            <div style={{
              fontSize: "clamp(16px, 3vw, 21px)",
              color: "rgba(232,232,240,0.25)",
              fontStyle: "italic",
              margin: `${Math.round(3 * PHI)}px 0`,
              animation: "fadeSlideUp 0.6s 0.2s both ease",
            }}>+</div>

            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(22px, 5vw, 32px)",
              color: `rgba(${triad.accent},0.8)`,
              letterSpacing: "0.15em",
              animation: "fadeSlideUp 0.6s 0.3s both ease",
            }}>{card.b}</div>

            {/* The divider */}
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(13 * PHI)}px auto`,
              background: `linear-gradient(90deg, transparent, rgba(${triad.accent},0.3), transparent)`,
              animation: "fadeSlideUp 0.6s 0.4s both ease",
            }} />

            {/* The result */}
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(14px, 3vw, 19px)",
              color: "rgba(232,232,240,0.6)",
              letterSpacing: "0.25em",
              animation: "fadeSlideUp 0.6s 0.5s both ease",
            }}>= {card.result}</div>

            {/* ═══ THE 3-WAY LOOP — sibling cards ═══ */}
            <div style={{
              marginTop: Math.round(34 * PHI),
              width: "100%",
              animation: "fadeSlideUp 0.6s 0.7s both ease",
            }}>
              <div style={{
                fontSize: 11, letterSpacing: "0.4em",
                fontFamily: "'Cinzel', serif",
                color: "rgba(232,232,240,0.2)",
                marginBottom: Math.round(8 * PHI),
              }}>SAME TRUTH · DIFFERENT FACE</div>

              <div style={{
                display: "flex", gap: Math.round(5 * PHI),
                justifyContent: "center",
              }}>
                {siblings.map((s, si) => (
                  <div
                    key={s.id}
                    onClick={() => openCard(s.id)}
                    style={{
                      flex: "1 1 0", maxWidth: 200,
                      padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px`,
                      borderRadius: Math.round(3 * PHI),
                      background: `linear-gradient(135deg, rgba(${triad.accent},0.04), rgba(3,3,6,0.5))`,
                      border: `1px solid rgba(${triad.accent},0.12)`,
                      cursor: "pointer",
                      transition: "all 0.4s",
                      textAlign: "center",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `rgba(${triad.accent},0.35)`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `rgba(${triad.accent},0.12)`;
                      e.currentTarget.style.transform = "";
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{
                      fontSize: 11, color: `rgba(${triad.accent},0.6)`,
                      fontStyle: "italic",
                    }}>{s.a} + {s.b}</div>
                    <div style={{
                      fontSize: 9, color: "rgba(232,232,240,0.25)",
                      fontFamily: "'Cinzel', serif", letterSpacing: 1,
                      marginTop: 3,
                    }}>= {s.result}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to triad */}
            <button onClick={goBackToTriad} style={{
              cursor: "pointer", background: "none", border: "none",
              color: "rgba(232,232,240,0.4)", fontFamily: "'Cinzel', serif",
              fontSize: 13, letterSpacing: 3, padding: "8px 16px",
              marginTop: Math.round(21 * PHI),
              transition: "color 0.4s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.7)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.4)"}
            >← {triad.name}</button>
          </div>
        )}
      </div>

      {/* RETURN TO PROOF */}
      <button onClick={onReturn} style={{
        cursor: "pointer", background: "none", border: "none",
        color: "rgba(232,232,240,0.3)", fontFamily: "'Cinzel', serif",
        fontSize: Math.round(8 * PHI + 6), letterSpacing: Math.round(PHI + 1),
        padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
        marginBottom: Math.round(21 * PHI),
        transition: "color 0.4s",
      }}
        onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.6)"}
        onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.3)"}
      >RETURN</button>
    </div>
  );
}
