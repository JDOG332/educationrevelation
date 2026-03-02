/**
 * MIRROR GATE — Layer -1
 * 
 * The opposite of Google.
 * Google says: "Ask me anything."
 * This says: "Tell me what you know."
 * 
 * User writes their truth → Engine scores it → Returns questions.
 * No AI. No API. Just reflection.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PHI, PHI_INV } from "./data.js";
import { reflectTruth } from "./mirrorIndex.js";

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

const GOLD = "rgba(201,168,76,";
const BONE = "rgba(232,232,240,";
const DARK = "#030306";
const FONT_DISPLAY = "'Cinzel', serif";
const FONT_BODY = "'Cormorant Garamond', serif";

// Golden ratio spacing scale
const S1 = Math.round(8 * PHI);           // 13
const S2 = Math.round(8 * PHI * PHI);     // 21
const S3 = Math.round(8 * PHI * PHI * PHI); // 34
const S4 = Math.round(S3 * PHI);          // 55
const S5 = Math.round(S4 * PHI);          // 89

// ═══════════════════════════════════════════════════════════
// DEPTH RING — the Ψ score visualization
// ═══════════════════════════════════════════════════════════

function DepthRing({ score, visible }) {
  const radius = 54;
  const stroke = 2.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: S1,
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.8)",
      transition: `opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)`,
    }}>
      <div style={{ position: "relative", width: radius * 2 + 20, height: radius * 2 + 20 }}>
        <svg
          width={radius * 2 + 20} height={radius * 2 + 20}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={radius + 10} cy={radius + 10} r={radius}
            fill="none" stroke={`${GOLD}0.08)`} strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={radius + 10} cy={radius + 10} r={radius}
            fill="none" stroke={`${GOLD}0.6)`} strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.23,1,0.32,1)",
              filter: `drop-shadow(0 0 8px ${GOLD}0.3))`,
            }}
          />
        </svg>
        {/* Score text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: FONT_DISPLAY,
            fontSize: `clamp(${S2}px, 5vw, ${S3}px)`,
            fontWeight: 400,
            color: `${GOLD}0.8)`,
            letterSpacing: 1,
            lineHeight: 1,
          }}>
            {score}
          </div>
          <div style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            fontStyle: "italic",
            color: `${BONE}0.35)`,
            letterSpacing: 2,
            marginTop: 2,
          }}>
            DEPTH
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DARE CARD — a question that leads deeper
// ═══════════════════════════════════════════════════════════

function DareCard({ node, index, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.4 + index * 0.2;

  const layerGlyphs = {
    1: "🌱", 2: "🌿", 3: "🦴", 4: "🪞", 5: "🌙",
    6: "✋", 7: "♾️", 8: "👁️", 9: "⬇️"
  };

  return (
    <div
      onClick={() => onNavigate(node.depth)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: `${S2}px ${S3}px`,
        border: `1px solid ${GOLD}${hovered ? "0.25" : "0.1"})`,
        borderRadius: 8,
        cursor: "pointer",
        background: hovered
          ? `linear-gradient(135deg, ${GOLD}0.04), transparent)`
          : "transparent",
        transition: "all 0.5s ease",
        animation: `mirrorReveal 0.8s ease ${delay}s both`,
        maxWidth: 500,
        width: "100%",
      }}
    >
      {/* Question */}
      <div style={{
        fontFamily: FONT_BODY,
        fontSize: `clamp(16px, 3.5vw, 20px)`,
        fontStyle: "italic",
        fontWeight: 300,
        color: `${BONE}0.85)`,
        lineHeight: PHI,
        marginBottom: S1,
      }}>
        {node.dare}
      </div>

      {/* Path */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 14 }}>{layerGlyphs[node.depth] || "🔮"}</span>
        <span style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 9,
          letterSpacing: 3,
          color: `${GOLD}0.4)`,
          textTransform: "uppercase",
        }}>
          {node.path}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MATCHED NODE — what the user touched
// ═══════════════════════════════════════════════════════════

function MatchedNode({ node, index }) {
  const delay = 0.2 + index * 0.15;

  return (
    <div style={{
      padding: `${S1}px 0`,
      borderBottom: `1px solid ${GOLD}0.06)`,
      animation: `mirrorReveal 0.6s ease ${delay}s both`,
    }}>
      <div style={{
        fontFamily: FONT_BODY,
        fontSize: `clamp(14px, 2.8vw, 16px)`,
        fontWeight: 300,
        color: `${BONE}0.6)`,
        lineHeight: PHI,
      }}>
        {node.truth}
      </div>
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 8,
        letterSpacing: 3,
        color: `${GOLD}0.3)`,
        marginTop: 6,
        textTransform: "uppercase",
      }}>
        {node.path}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MIRROR GATE — The Main Component
// ═══════════════════════════════════════════════════════════

export default function MirrorGate({ onEnter, onNavigateToDepth }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [phase, setPhase] = useState("gate"); // "gate" | "reflecting" | "revealed"
  const [animScore, setAnimScore] = useState(0);
  const inputRef = useRef(null);
  const revealRef = useRef(null);

  // Auto-focus after mount animation
  useEffect(() => {
    const t = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Animate score counter
  useEffect(() => {
    if (phase !== "revealed" || !result) return;
    const target = result.depthScore;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * t * (3 - 2 * t); // smoothstep
      setAnimScore(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase, result]);

  const handleReflect = useCallback(() => {
    if (input.trim().length < 2) return;

    setPhase("reflecting");

    // Brief pause for the "reflecting" animation
    setTimeout(() => {
      const r = reflectTruth(input);
      setResult(r);
      setPhase("revealed");

      // Scroll to results on mobile
      setTimeout(() => {
        if (revealRef.current) {
          revealRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 400);
    }, 1200);
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReflect();
    }
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setPhase("gate");
    setAnimScore(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleNavigateToLayer = (depth) => {
    if (onNavigateToDepth) onNavigateToDepth(depth);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: DARK,
      display: "flex", flexDirection: "column", alignItems: "center",
      overflowY: "auto", overflowX: "hidden",
      zIndex: 10000,
      WebkitOverflowScrolling: "touch",
    }}>

      {/* Subtle grain */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        opacity: 0.03, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      {/* Radial vignette */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 35%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%",
        maxWidth: 618,
        padding: `${S5}px ${S3}px ${S5 * 2}px`,
        display: "flex", flexDirection: "column", alignItems: "center",
        minHeight: "100vh",
      }}>

        {/* ── THE GATE ── */}
        <div style={{
          textAlign: "center",
          marginBottom: S4,
          animation: "mirrorReveal 1s ease 0.1s both",
        }}>
          {/* Title */}
          <div style={{
            fontFamily: FONT_DISPLAY,
            fontSize: `clamp(10px, 2.5vw, 12px)`,
            letterSpacing: 6,
            color: `${GOLD}0.35)`,
            marginBottom: S2,
            textTransform: "uppercase",
          }}>
            Layer −1
          </div>

          <h1 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: `clamp(${S3}px, 8vw, ${S4}px)`,
            fontWeight: 400,
            color: `${BONE}0.9)`,
            letterSpacing: 3,
            lineHeight: 1.2,
            margin: 0,
            marginBottom: S2,
          }}>
            TRUTH OR DARE
          </h1>

          <div style={{
            fontFamily: FONT_BODY,
            fontSize: `clamp(14px, 3.2vw, 18px)`,
            fontStyle: "italic",
            fontWeight: 300,
            color: `${BONE}0.45)`,
            lineHeight: PHI,
            maxWidth: 420,
            margin: "0 auto",
          }}>
            Don't ask a question.<br />
            Write what you believe is true.
          </div>
        </div>

        {/* ── INPUT AREA ── */}
        <div style={{
          width: "100%",
          marginBottom: S4,
          animation: "mirrorReveal 0.8s ease 0.4s both",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="everything is connected..."
            disabled={phase === "reflecting"}
            rows={3}
            style={{
              width: "100%",
              padding: `${S2}px ${S3}px`,
              fontFamily: FONT_BODY,
              fontSize: `clamp(16px, 3.5vw, 20px)`,
              fontStyle: "italic",
              fontWeight: 300,
              color: `${BONE}0.85)`,
              background: `${GOLD}0.02)`,
              border: `1px solid ${GOLD}0.12)`,
              borderRadius: 8,
              outline: "none",
              resize: "none",
              lineHeight: PHI,
              letterSpacing: 0.5,
              transition: "border-color 0.4s ease, background 0.4s ease",
              caretColor: `${GOLD}0.6)`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `${GOLD}0.25)`;
              e.target.style.background = `${GOLD}0.04)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${GOLD}0.12)`;
              e.target.style.background = `${GOLD}0.02)`;
            }}
          />

          {/* Reflect button */}
          <div style={{
            display: "flex", justifyContent: "center",
            marginTop: S2,
            gap: S2,
          }}>
            {phase !== "revealed" && (
              <button
                onClick={handleReflect}
                disabled={input.trim().length < 2 || phase === "reflecting"}
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: `clamp(10px, 2.2vw, 12px)`,
                  letterSpacing: 4,
                  color: input.trim().length < 2 ? `${BONE}0.15)` : `${GOLD}0.7)`,
                  background: "transparent",
                  border: `1px solid ${input.trim().length < 2 ? `${GOLD}0.06)` : `${GOLD}0.2)`}`,
                  borderRadius: 6,
                  padding: `${S1}px ${S3}px`,
                  cursor: input.trim().length < 2 ? "default" : "pointer",
                  transition: "all 0.4s ease",
                  textTransform: "uppercase",
                }}
              >
                {phase === "reflecting" ? "REFLECTING..." : "REFLECT"}
              </button>
            )}

            {phase === "revealed" && (
              <button
                onClick={handleReset}
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: `clamp(10px, 2.2vw, 12px)`,
                  letterSpacing: 4,
                  color: `${BONE}0.4)`,
                  background: "transparent",
                  border: `1px solid ${GOLD}0.1)`,
                  borderRadius: 6,
                  padding: `${S1}px ${S3}px`,
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  textTransform: "uppercase",
                }}
              >
                TRY AGAIN
              </button>
            )}
          </div>
        </div>

        {/* ── REFLECTING STATE ── */}
        {phase === "reflecting" && (
          <div style={{
            textAlign: "center",
            animation: "breathePulse 2s ease-in-out infinite",
          }}>
            <div style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              fontStyle: "italic",
              color: `${GOLD}0.4)`,
              letterSpacing: 1,
            }}>
              🪞
            </div>
          </div>
        )}

        {/* ── REVEALED RESULTS ── */}
        {phase === "revealed" && result && (
          <div ref={revealRef} style={{
            width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: S4,
          }}>

            {/* Depth Score */}
            <DepthRing score={animScore} visible={phase === "revealed"} />

            {/* Score label */}
            <div style={{
              textAlign: "center",
              animation: "mirrorReveal 0.8s ease 0.3s both",
            }}>
              <div style={{
                fontFamily: FONT_BODY,
                fontSize: `clamp(13px, 2.8vw, 15px)`,
                fontStyle: "italic",
                color: `${BONE}0.4)`,
                lineHeight: PHI,
              }}>
                {result.depthScore < 20
                  ? "You're standing at the surface. The real ground is below."
                  : result.depthScore < 40
                  ? "You've touched something. There are roots beneath it."
                  : result.depthScore < 60
                  ? "You're digging. The shape of truth is starting to show."
                  : result.depthScore < 80
                  ? "Deep. The threads are connecting across layers."
                  : "You've reached bedrock. The mirror is reflecting back."}
              </div>
            </div>

            {/* WHAT YOU TOUCHED — matched content */}
            {result.matched.length > 0 && (
              <div style={{ width: "100%" }}>
                <div style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 9,
                  letterSpacing: 4,
                  color: `${GOLD}0.3)`,
                  textTransform: "uppercase",
                  marginBottom: S2,
                  textAlign: "center",
                }}>
                  What you touched
                </div>
                {result.matched.slice(0, 3).map((node, i) => (
                  <MatchedNode key={node.id} node={node} index={i} />
                ))}
              </div>
            )}

            {/* DARES — questions that lead deeper */}
            {result.dares.length > 0 && (
              <div style={{
                width: "100%",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: S2,
              }}>
                <div style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 9,
                  letterSpacing: 4,
                  color: `${GOLD}0.3)`,
                  textTransform: "uppercase",
                  marginBottom: S1,
                }}>
                  We dare you
                </div>
                {result.dares.map((node, i) => (
                  <DareCard
                    key={node.id}
                    node={node}
                    index={i}
                    onNavigate={handleNavigateToLayer}
                  />
                ))}
              </div>
            )}

            {/* No matches */}
            {result.matched.length === 0 && (
              <div style={{
                textAlign: "center",
                animation: "mirrorReveal 0.8s ease 0.3s both",
              }}>
                <div style={{
                  fontFamily: FONT_BODY,
                  fontSize: `clamp(15px, 3vw, 18px)`,
                  fontStyle: "italic",
                  color: `${BONE}0.5)`,
                  lineHeight: PHI,
                  marginBottom: S3,
                }}>
                  Your truth didn't match any pattern we hold — yet.<br />
                  That either means you're ahead of us,<br />
                  or the door is deeper than we've dug.
                </div>

                {/* Show 3 random dares anyway */}
                <div style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 9,
                  letterSpacing: 4,
                  color: `${GOLD}0.3)`,
                  textTransform: "uppercase",
                  marginBottom: S2,
                }}>
                  Start here instead
                </div>
                {result.dares.map((node, i) => (
                  <DareCard
                    key={node.id}
                    node={node}
                    index={i}
                    onNavigate={handleNavigateToLayer}
                  />
                ))}
              </div>
            )}

            {/* ENTER THE THEORY */}
            <div style={{
              marginTop: S3,
              animation: "mirrorReveal 0.8s ease 1s both",
            }}>
              <button
                onClick={onEnter}
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: `clamp(10px, 2.5vw, 13px)`,
                  letterSpacing: 5,
                  color: `${GOLD}0.55)`,
                  background: "transparent",
                  border: `1px solid ${GOLD}0.15)`,
                  borderRadius: 8,
                  padding: `${S2}px ${S4}px`,
                  cursor: "pointer",
                  transition: "all 0.5s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = `${GOLD}0.35)`;
                  e.target.style.color = `${GOLD}0.8)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = `${GOLD}0.15)`;
                  e.target.style.color = `${GOLD}0.55)`;
                }}
              >
                ENTER THE THEORY
              </button>
            </div>
          </div>
        )}

        {/* SKIP — always available, subtle */}
        {phase === "gate" && (
          <div
            onClick={onEnter}
            style={{
              position: "fixed",
              bottom: S3,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: FONT_DISPLAY,
              fontSize: 9,
              letterSpacing: 4,
              color: `${BONE}0.15)`,
              cursor: "pointer",
              transition: "color 0.4s ease",
              textTransform: "uppercase",
              zIndex: 3,
              animation: "mirrorReveal 1s ease 2s both",
            }}
            onMouseEnter={(e) => e.target.style.color = `${BONE}0.35)`}
            onMouseLeave={(e) => e.target.style.color = `${BONE}0.15)`}
          >
            skip
          </div>
        )}
      </div>

      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes mirrorReveal {
          from {
            opacity: 0;
            transform: translateY(${S2}px);
            filter: blur(2px);
          }
          60% {
            opacity: 0.85;
            filter: blur(0.3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes breathePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        textarea::placeholder {
          color: ${BONE}0.2);
          font-style: italic;
        }

        textarea::-webkit-scrollbar {
          width: 3px;
        }
        textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        textarea::-webkit-scrollbar-thumb {
          background: ${GOLD}0.15);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
