/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 Rooms inside each Door
   Click a door → see 10 rooms → click a room → see topic cards
   ═══════════════════════════════════════════════════════════════ */

import { useState, useCallback } from "react";
import { PHI, PHI_INV } from "./data.js";
import { SUBCATEGORIES, DOOR_META } from "./subcategories.js";
import { getTopicCards, hasTopicCards } from "./topicCards.js";

/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 rooms inside a door
   ═══════════════════════════════════════════════════════════════ */

export default function SubcategoryGrid({ doorKey, onSelectSub, onBack }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];

  if (!meta) return null;

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
      >← BACK</button>

      {/* Door header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(8 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
        <div style={{ fontSize: "clamp(44px, 10vw, 56px)", marginBottom: Math.round(5 * PHI), lineHeight: 1 }}>
          {meta.emoji}
        </div>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 400, color: "#e8e8f0",
          letterSpacing: "0.3em", margin: 0,
        }}>{meta.name}</h2>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 3vw, 17px)",
          fontStyle: "italic", color: "rgba(201,168,76,0.4)",
          marginTop: Math.round(3 * PHI),
          maxWidth: 400, margin: `${Math.round(3 * PHI)}px auto 0`,
          lineHeight: PHI,
        }}>{meta.tagline}</div>

        <div style={{
          width: Math.round(50 * PHI), height: 1,
          margin: `${Math.round(8 * PHI)}px auto 0`,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }} />
      </div>

      {/* 10 Rooms */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: Math.round(5 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
        {subs.map((sub, i) => (
          <button
            key={sub.id}
            onClick={() => { onSelectSub(sub.id); window.scrollTo(0, 0); }}
            style={{
              cursor: "pointer",
              background: `linear-gradient(170deg, rgba(${sub.accent},0.05) 0%, rgba(${sub.accent},0.02) 38%, rgba(3,3,6,0.6) 100%)`,
              border: `1px solid rgba(${sub.accent},0.1)`,
              borderRadius: 12,
              padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px`,
              textAlign: "center",
              animation: `fadeSlideUp 0.5s ${0.15 + i * 0.06}s both ease`,
              transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(170deg, rgba(${sub.accent},0.09) 0%, rgba(${sub.accent},0.04) 38%, rgba(3,3,6,0.5) 100%)`;
              e.currentTarget.style.borderColor = `rgba(${sub.accent},0.25)`;
              e.currentTarget.style.transform = "translateY(-3px) scale(1.01)";
              e.currentTarget.style.boxShadow = `0 8px 28px rgba(${sub.accent},0.1), 0 0 40px rgba(${sub.accent},0.04), inset 0 1px 0 rgba(255,255,255,0.05)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(170deg, rgba(${sub.accent},0.05) 0%, rgba(${sub.accent},0.02) 38%, rgba(3,3,6,0.6) 100%)`;
              e.currentTarget.style.borderColor = `rgba(${sub.accent},0.1)`;
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)";
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
              background: `linear-gradient(90deg, transparent, rgba(${sub.accent},0.1), transparent)`,
            }} />
            <div style={{ fontSize: "clamp(28px, 7vw, 36px)", marginBottom: 4, lineHeight: 1 }}>{sub.icon}</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(10px, 2.5vw, 13px)",
              letterSpacing: "0.15em",
              color: `rgba(${sub.accent},0.75)`,
              fontWeight: 600,
              marginBottom: 3,
            }}>{sub.name}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(11px, 2.5vw, 13px)",
              fontStyle: "italic",
              color: "rgba(232,232,240,0.4)",
              lineHeight: 1.35,
            }}>{sub.desc}</div>

            {/* Ψ bar */}
            <div style={{
              marginTop: Math.round(3 * PHI),
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <div style={{
                width: 50, height: 2, borderRadius: 1,
                background: `rgba(${sub.accent},0.1)`,
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${sub.psi * 100}%`, height: "100%",
                  background: `linear-gradient(90deg, rgba(${sub.accent},0.2), rgba(${sub.accent},0.45))`,
                  borderRadius: 1,
                }} />
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8,
                letterSpacing: "0.15em", color: `rgba(${sub.accent},0.3)`,
              }}>{sub.psi.toFixed(2)}</div>
            </div>
          </button>
        ))}
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


/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY VIEW — Inside a single Room
   Renders REAL topic cards when data exists, placeholders when not
   ═══════════════════════════════════════════════════════════════ */

export function SubcategoryView({ doorKey, subId, onBack, initialOpenCard }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];
  const sub = subs.find(s => s.id === subId);
  const cards = getTopicCards(doorKey, subId);
  const [openCard, setOpenCard] = useState(initialOpenCard || null);
  const [openTier, setOpenTier] = useState("simple");

  if (!meta || !sub) return null;

  const idx = subs.findIndex(s => s.id === subId);
  const prev = idx > 0 ? subs[idx - 1] : null;
  const next = idx < subs.length - 1 ? subs[idx + 1] : null;

  /* ── CARD DETAIL VIEW ────────────────────────────────────── */
  if (openCard && cards) {
    const card = cards.find(c => c.id === openCard);
    if (!card) { setOpenCard(null); return null; }

    return (
      <div style={{
        maxWidth: 700, margin: "0 auto", width: "100%",
        padding: `${Math.round(13 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
        animation: "fadeSlideUp 0.5s ease",
        zIndex: 5000, position: "relative",
        background: "#030306", minHeight: "100vh",
      }}>
        {/* Back to room */}
        <button
          onClick={() => { setOpenCard(null); setOpenTier("simple"); window.scrollTo(0, 0); }}
          style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: Math.round(8 * PHI + 6), letterSpacing: Math.round(PHI + 1),
            padding: `${Math.round(3 * PHI)}px ${Math.round(5 * PHI)}px`,
            transition: "all 0.4s",
          }}
          onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
          onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
        >← {sub.name}</button>

        {/* Card Header */}
        <div style={{
          textAlign: "center",
          marginTop: Math.round(13 * PHI),
          marginBottom: Math.round(8 * PHI),
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 9,
            letterSpacing: "0.4em", color: `rgba(${sub.accent},0.25)`,
            marginBottom: Math.round(5 * PHI),
          }}>{meta.emoji} {meta.name} · {sub.name}</div>

          <div style={{
            fontSize: "clamp(48px, 12vw, 64px)",
            marginBottom: Math.round(5 * PHI),
            animation: "gentleFloat 8s ease-in-out infinite",
            lineHeight: 1,
          }}>{card.icon}</div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 10,
            letterSpacing: "0.5em", color: `rgba(${sub.accent},0.3)`,
            marginBottom: 4,
          }}>CARD {card.num} OF 10</div>

          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 400, color: "#e8e8f0",
            letterSpacing: "0.15em", margin: 0,
            lineHeight: 1.3,
          }}>{card.title}</h2>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 3vw, 18px)",
            fontStyle: "italic", color: `rgba(${sub.accent},0.45)`,
            marginTop: Math.round(2 * PHI),
          }}>{card.subtitle}</div>

          <div style={{
            width: Math.round(50 * PHI), height: 1,
            margin: `${Math.round(8 * PHI)}px auto`,
            background: `linear-gradient(90deg, transparent, rgba(${sub.accent},0.25), transparent)`,
          }} />
        </div>

        {/* TIER TABS */}
        <div style={{
          display: "flex", justifyContent: "center", gap: Math.round(3 * PHI),
          marginBottom: Math.round(13 * PHI),
          flexWrap: "wrap",
        }}>
          {[
            { key: "simple",   label: "THE TRUTH" },
            { key: "senses",   label: "THE SENSES" },
            { key: "advanced", label: "THE DEPTH" },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setOpenTier(t.key)}
              style={{
                cursor: "pointer",
                border: `1px solid rgba(${sub.accent},${openTier === t.key ? 0.3 : 0.06})`,
                borderRadius: 8,
                padding: `${Math.round(3 * PHI)}px ${Math.round(8 * PHI)}px`,
                fontFamily: "'Cinzel', serif", fontSize: 10,
                letterSpacing: "0.25em",
                color: openTier === t.key ? `rgba(${sub.accent},0.85)` : "rgba(232,232,240,0.3)",
                transition: "all 0.4s",
                background: openTier === t.key ? `rgba(${sub.accent},0.04)` : "transparent",
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* ── TIER: SIMPLE TRUTH ── */}
        {openTier === "simple" && (
          <div style={{ animation: "fadeSlideUp 0.5s ease" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 3.5vw, 21px)",
              color: "rgba(232,232,240,0.82)",
              lineHeight: 1.7,
              textAlign: "center",
              maxWidth: 550, margin: "0 auto",
              padding: `0 ${Math.round(5 * PHI)}px`,
            }}>{card.simple}</div>

            {/* THE INTUITION */}
            <div style={{
              marginTop: Math.round(21 * PHI),
              textAlign: "center",
              padding: `${Math.round(13 * PHI)}px ${Math.round(8 * PHI)}px`,
              background: `radial-gradient(ellipse at center, rgba(${sub.accent},0.04), transparent 70%)`,
              borderRadius: 12,
              border: `1px solid rgba(${sub.accent},0.06)`,
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9,
                letterSpacing: "0.5em", color: `rgba(${sub.accent},0.35)`,
                marginBottom: Math.round(5 * PHI),
              }}>THE INTUITION</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 3.5vw, 20px)",
                fontStyle: "italic",
                color: `rgba(${sub.accent},0.75)`,
                lineHeight: PHI,
                maxWidth: 480, margin: "0 auto",
              }}>{card.intuition}</div>
            </div>

            {/* SONGS */}
            <div style={{ marginTop: Math.round(21 * PHI), textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9,
                letterSpacing: "0.5em", color: "rgba(232,232,240,0.2)",
                marginBottom: Math.round(8 * PHI),
              }}>HEAR IT</div>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: Math.round(3 * PHI),
              }}>
                {card.songs.map((s, si) => (
                  <a
                    key={si}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 10,
                      padding: `${Math.round(3 * PHI)}px ${Math.round(8 * PHI)}px`,
                      borderRadius: 8,
                      border: `1px solid rgba(${sub.accent},0.06)`,
                      transition: "all 0.3s",
                      maxWidth: 400, width: "100%",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `rgba(${sub.accent},0.2)`;
                      e.currentTarget.style.background = `rgba(${sub.accent},0.03)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `rgba(${sub.accent},0.06)`;
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div style={{ fontSize: 18 }}>🎵</div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 11,
                        letterSpacing: "0.1em", color: "rgba(232,232,240,0.65)",
                      }}>{s.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                        fontStyle: "italic", color: "rgba(232,232,240,0.35)",
                      }}>{s.artist}</div>
                    </div>
                    <div style={{
                      marginLeft: "auto", fontSize: 10,
                      color: `rgba(${sub.accent},0.3)`,
                    }}>▶</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TIER: SENSES ── */}
        {openTier === "senses" && (
          <div style={{ animation: "fadeSlideUp 0.5s ease" }}>
            <div style={{
              display: "flex", flexDirection: "column",
              gap: Math.round(5 * PHI),
              maxWidth: 550, margin: "0 auto",
            }}>
              {card.senses.map((s, si) => (
                <div
                  key={s.key}
                  style={{
                    display: "flex", gap: Math.round(5 * PHI),
                    alignItems: "flex-start",
                    padding: `${Math.round(5 * PHI)}px ${Math.round(5 * PHI)}px`,
                    borderRadius: 10,
                    background: `rgba(${sub.accent},${0.015 + si * 0.003})`,
                    border: `1px solid rgba(${sub.accent},0.05)`,
                    animation: `fadeSlideUp 0.5s ${0.1 + si * 0.08}s both ease`,
                  }}
                >
                  <div style={{
                    fontSize: "clamp(24px, 6vw, 32px)",
                    lineHeight: 1, minWidth: 38, textAlign: "center",
                  }}>{s.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 9,
                      letterSpacing: "0.4em", color: `rgba(${sub.accent},0.45)`,
                      marginBottom: 3,
                    }}>{s.sense}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(14px, 3vw, 17px)",
                      color: "rgba(232,232,240,0.75)",
                      lineHeight: 1.55,
                    }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Intuition echo */}
            <div style={{
              marginTop: Math.round(21 * PHI),
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 3vw, 17px)",
              fontStyle: "italic",
              color: `rgba(${sub.accent},0.4)`,
              lineHeight: PHI,
              maxWidth: 420, margin: `${Math.round(21 * PHI)}px auto 0`,
            }}>{card.intuition}</div>
          </div>
        )}

        {/* ── TIER: ADVANCED ── */}
        {openTier === "advanced" && (
          <div style={{ animation: "fadeSlideUp 0.5s ease" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.5vw, 19px)",
              color: "rgba(232,232,240,0.75)",
              lineHeight: 1.75,
              textAlign: "center",
              maxWidth: 550, margin: "0 auto",
              padding: `0 ${Math.round(3 * PHI)}px`,
            }}>{card.advanced}</div>

            {/* LEARN MORE */}
            <div style={{ marginTop: Math.round(21 * PHI), textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9,
                letterSpacing: "0.5em", color: "rgba(232,232,240,0.2)",
                marginBottom: Math.round(8 * PHI),
              }}>DIG DEEPER</div>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: Math.round(3 * PHI),
              }}>
                {card.links.map((lnk, li) => (
                  <a
                    key={li}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(13px, 2.5vw, 15px)",
                      color: `rgba(${sub.accent},0.5)`,
                      padding: `${Math.round(2 * PHI)}px ${Math.round(5 * PHI)}px`,
                      borderRadius: 6,
                      border: `1px solid rgba(${sub.accent},0.06)`,
                      transition: "all 0.3s",
                      maxWidth: 350,
                    }}
                    onMouseEnter={e => {
                      e.target.style.color = `rgba(${sub.accent},0.8)`;
                      e.target.style.borderColor = `rgba(${sub.accent},0.2)`;
                    }}
                    onMouseLeave={e => {
                      e.target.style.color = `rgba(${sub.accent},0.5)`;
                      e.target.style.borderColor = `rgba(${sub.accent},0.06)`;
                    }}
                  >📎 {lnk.label}</a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CARD NAV: prev/next */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: Math.round(34 * PHI),
          padding: `0 ${Math.round(3 * PHI)}px`,
        }}>
          {card.num > 1 ? (
            <button
              onClick={() => { setOpenCard(cards[card.num - 2].id); setOpenTier("simple"); window.scrollTo(0, 0); }}
              style={{
                cursor: "pointer", background: "none", border: "none",
                fontFamily: "'Cinzel', serif", fontSize: 11,
                letterSpacing: "0.15em", color: "rgba(232,232,240,0.3)",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.6)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.3)"}
            >← {cards[card.num - 2].icon} {card.num - 1}</button>
          ) : <div />}
          {card.num < cards.length ? (
            <button
              onClick={() => { setOpenCard(cards[card.num].id); setOpenTier("simple"); window.scrollTo(0, 0); }}
              style={{
                cursor: "pointer", background: "none", border: "none",
                fontFamily: "'Cinzel', serif", fontSize: 11,
                letterSpacing: "0.15em", color: "rgba(232,232,240,0.3)",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.6)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.3)"}
            >{card.num + 1} {cards[card.num].icon} →</button>
          ) : <div />}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: Math.round(21 * PHI),
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(13px, 2.5vw, 16px)",
          fontStyle: "italic", color: "rgba(201,168,76,0.2)",
          lineHeight: PHI,
        }}>the seed eats the dirt</div>
        <div style={{
          textAlign: "center", marginTop: Math.round(5 * PHI),
          fontSize: 18, opacity: 0.25,
        }}>🪙🪙</div>
      </div>
    );
  }

  /* ── ROOM VIEW: 10 TOPIC CARDS ───────────────────────────── */
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
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 10,
          letterSpacing: "0.4em", color: "rgba(201,168,76,0.25)",
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
          fontWeight: 400, color: "#e8e8f0",
          letterSpacing: "0.2em", margin: 0,
        }}>{sub.name}</h2>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(15px, 3vw, 19px)",
          fontStyle: "italic", color: `rgba(${sub.accent},0.5)`,
          marginTop: Math.round(3 * PHI),
          lineHeight: PHI, maxWidth: 420,
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
            background: `rgba(${sub.accent},0.1)`, overflow: "hidden",
          }}>
            <div style={{
              width: `${sub.psi * 100}%`, height: "100%",
              background: `rgba(${sub.accent},0.4)`,
              borderRadius: 2, transition: "width 1.5s ease",
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

      {/* Topic Cards label */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cinzel', serif", fontSize: 11,
        letterSpacing: "0.4em",
        color: cards ? `rgba(${sub.accent},0.35)` : "rgba(232,232,240,0.2)",
        marginBottom: Math.round(5 * PHI),
      }}>TOPIC CARDS</div>

      {/* ── REAL CARDS (data exists) ── */}
      {cards ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: Math.round(5 * PHI),
          marginBottom: Math.round(21 * PHI),
        }}>
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => { setOpenCard(card.id); setOpenTier("simple"); window.scrollTo(0, 0); }}
              style={{
                cursor: "pointer",
                aspectRatio: "1 / 1",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                borderRadius: 10,
                background: `radial-gradient(ellipse at center, rgba(${sub.accent},0.035), transparent 70%)`,
                border: `1px solid rgba(${sub.accent},0.1)`,
                animation: `fadeSlideUp 0.5s ${0.15 + i * 0.06}s both ease`,
                textAlign: "center",
                padding: 12,
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `radial-gradient(ellipse at center, rgba(${sub.accent},0.07), transparent 70%)`;
                e.currentTarget.style.borderColor = `rgba(${sub.accent},0.25)`;
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `radial-gradient(ellipse at center, rgba(${sub.accent},0.035), transparent 70%)`;
                e.currentTarget.style.borderColor = `rgba(${sub.accent},0.1)`;
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8,
                letterSpacing: "0.3em", color: `rgba(${sub.accent},0.25)`,
                position: "absolute", top: 8,
              }}>{card.num}</div>
              <div style={{
                fontSize: "clamp(28px, 7vw, 36px)",
                marginBottom: 6, lineHeight: 1,
                filter: `drop-shadow(0 0 8px rgba(${sub.accent},0.15))`,
              }}>{card.icon}</div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(9px, 2vw, 11px)",
                letterSpacing: "0.12em",
                color: `rgba(${sub.accent},0.65)`,
                fontWeight: 600, lineHeight: 1.3,
                marginBottom: 3,
              }}>{card.title}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(10px, 2vw, 12px)",
                fontStyle: "italic",
                color: "rgba(232,232,240,0.35)",
                lineHeight: 1.3,
              }}>{card.subtitle}</div>
            </button>
          ))}
        </div>
      ) : (
        /* ── PLACEHOLDER SLOTS ── */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: Math.round(5 * PHI),
          marginBottom: Math.round(21 * PHI),
        }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{
              aspectRatio: "1 / 1",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 10,
              background: `rgba(${sub.accent},0.015)`,
              border: `1px dashed rgba(${sub.accent},0.08)`,
              animation: `fadeSlideUp 0.5s ${0.3 + i * 0.05}s both ease`,
              textAlign: "center", padding: 12,
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 10,
                letterSpacing: "0.2em", color: `rgba(${sub.accent},0.15)`,
              }}>{i + 1}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                fontStyle: "italic", color: "rgba(232,232,240,0.12)",
                marginTop: 4,
              }}>coming soon</div>
            </div>
          ))}
        </div>
      )}

      {/* Prev / Next nav */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        padding: `0 ${Math.round(3 * PHI)}px`,
        marginBottom: Math.round(13 * PHI),
      }}>
        {prev ? (
          <button
            onClick={() => { onBack(); setTimeout(() => {}, 50); }}
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
            onClick={() => { onBack(); setTimeout(() => {}, 50); }}
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
        fontStyle: "italic", color: "rgba(201,168,76,0.2)",
        lineHeight: PHI,
      }}>the seed eats the dirt</div>
      <div style={{
        textAlign: "center", marginTop: Math.round(5 * PHI),
        fontSize: 18, opacity: 0.25,
      }}>🪙🪙</div>
    </div>
  );
}
