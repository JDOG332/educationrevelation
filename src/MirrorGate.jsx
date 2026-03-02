/**
 * MIRROR GATE — Layer -1
 * 
 * The opposite of Google.
 * Google says: "Ask me anything."
 * This says: "Tell me what you know."
 * 
 * User writes their truth → REAL Ψ engine scores it → Returns questions.
 * No AI. No API. Just Ψ = R₁₂ × G running on the user's own browser.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PHI, PHI_INV } from "./data.js";
import { reflectTruth } from "./mirrorIndex.js";
import { testTruth, LAYER_LABELS, LAYER_GLYPHS } from "./truthTester.js";

const GOLD = "rgba(201,168,76,";
const BONE = "rgba(232,232,240,";
const DARK = "#030306";
const FONT_DISPLAY = "'Cinzel', serif";
const FONT_BODY = "'Cormorant Garamond', serif";

const S1 = Math.round(8 * PHI);
const S2 = Math.round(8 * PHI * PHI);
const S3 = Math.round(8 * PHI * PHI * PHI);
const S4 = Math.round(S3 * PHI);
const S5 = Math.round(S4 * PHI);

function PsiRing({ score, R12, G, visible }) {
  const radius = 58;
  const stroke = 2.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const glowIntensity = Math.min(0.6, score / 150);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: S1,
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.8)",
      transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)",
    }}>
      <div style={{ position: "relative", width: radius * 2 + 24, height: radius * 2 + 24 }}>
        <svg width={radius * 2 + 24} height={radius * 2 + 24} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={radius + 12} cy={radius + 12} r={radius}
            fill="none" stroke={`${GOLD}0.06)`} strokeWidth={stroke} />
          <circle cx={radius + 12} cy={radius + 12} r={radius - 8}
            fill="none" stroke={`${BONE}0.08)`} strokeWidth={1.5}
            strokeDasharray={2 * Math.PI * (radius - 8)}
            strokeDashoffset={2 * Math.PI * (radius - 8) * (1 - R12)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.23,1,0.32,1) 0.3s" }} />
          <circle cx={radius + 12} cy={radius + 12} r={radius + 8}
            fill="none" stroke={`${BONE}0.06)`} strokeWidth={1}
            strokeDasharray={2 * Math.PI * (radius + 8)}
            strokeDashoffset={2 * Math.PI * (radius + 8) * (1 - G)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.23,1,0.32,1) 0.5s" }} />
          <circle cx={radius + 12} cy={radius + 12} r={radius}
            fill="none" stroke={`${GOLD}0.7)`} strokeWidth={stroke}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.23,1,0.32,1)",
              filter: `drop-shadow(0 0 ${6 + score / 8}px ${GOLD}${glowIntensity}))`,
            }} />
        </svg>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", textAlign: "center",
        }}>
          <div style={{
            fontFamily: FONT_DISPLAY,
            fontSize: `clamp(${S2}px, 6vw, ${S3 + 4}px)`,
            fontWeight: 400, color: `${GOLD}0.85)`,
            letterSpacing: 1, lineHeight: 1,
          }}>{score}</div>
        </div>
      </div>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 8, letterSpacing: 4,
        color: `${GOLD}0.35)`, textTransform: "uppercase", textAlign: "center",
      }}>TRUTH & DEPTH</div>
    </div>
  );
}

function LayerHitBar({ layerHits, visible }) {
  const hitMap = {};
  for (const hit of layerHits) hitMap[hit.layerIndex] = hit;

  return (
    <div style={{
      display: "flex", gap: 3, justifyContent: "center", alignItems: "flex-end",
      height: 48, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
    }}>
      {Array.from({ length: 9 }, (_, i) => {
        const hit = hitMap[i];
        const height = hit ? 12 + hit.R12 * 36 : 6;
        const opacity = hit ? 0.3 + hit.R12 * 0.5 : 0.06;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: 16, height, borderRadius: 2,
              background: hit
                ? `linear-gradient(to top, ${GOLD}${opacity * 0.5}), ${GOLD}${opacity}))`
                : `${GOLD}0.04)`,
              transition: "height 1s cubic-bezier(0.23,1,0.32,1) 0.3s, background 0.8s ease",
            }} />
            <span style={{ fontSize: 10, opacity: hit ? 0.8 : 0.2, transition: "opacity 0.5s ease" }}>
              {LAYER_GLYPHS[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PsiBreakdown({ R12, G, C_eff, D_hat, psi, visible }) {
  const fmt = (n) => (n * 100).toFixed(0);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: S1, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.8s", flexWrap: "wrap",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontStyle: "italic", color: `${BONE}0.3)`, letterSpacing: 1 }}>recognition</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: `${BONE}0.5)`, letterSpacing: 1 }}>R&#x2081;&#x2082; {fmt(R12)}</div>
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: `${GOLD}0.25)` }}>&times;</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontStyle: "italic", color: `${BONE}0.3)`, letterSpacing: 1 }}>reliability</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: `${BONE}0.5)`, letterSpacing: 1 }}>G {fmt(G)}</div>
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: `${GOLD}0.25)` }}>=</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontStyle: "italic", color: `${GOLD}0.4)`, letterSpacing: 1 }}>truth</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: `${GOLD}0.6)`, letterSpacing: 1 }}>&Psi; {fmt(psi)}</div>
      </div>
    </div>
  );
}

function DareCard({ node, index, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.6 + index * 0.2;
  return (
    <div onClick={() => onNavigate(node.depth)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: `${S2}px ${S3}px`,
        border: `1px solid ${GOLD}${hovered ? "0.25" : "0.1"})`,
        borderRadius: 8, cursor: "pointer",
        background: hovered ? `linear-gradient(135deg, ${GOLD}0.04), transparent)` : "transparent",
        transition: "all 0.5s ease",
        animation: `mirrorReveal 0.8s ease ${delay}s both`,
        maxWidth: 500, width: "100%",
      }}>
      <div style={{
        fontFamily: FONT_BODY, fontSize: `clamp(16px, 3.5vw, 20px)`,
        fontStyle: "italic", fontWeight: 300, color: `${BONE}0.85)`,
        lineHeight: PHI, marginBottom: S1,
      }}>{node.dare}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>{LAYER_GLYPHS[node.depth - 1] || "\u{1F52E}"}</span>
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: 9, letterSpacing: 3,
          color: `${GOLD}0.4)`, textTransform: "uppercase",
        }}>{node.path}</span>
      </div>
    </div>
  );
}

export default function MirrorGate({ onEnter, onNavigateToDepth }) {
  const [input, setInput] = useState("");
  const [truthResult, setTruthResult] = useState(null);
  const [mirrorResult, setMirrorResult] = useState(null);
  const [phase, setPhase] = useState("gate");
  const [animScore, setAnimScore] = useState(0);
  const inputRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "revealed" || !truthResult) return;
    const target = truthResult.psiPercent;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      setAnimScore(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase, truthResult]);

  const handleReflect = useCallback(() => {
    if (input.trim().length < 2) return;
    setPhase("reflecting");
    setTimeout(() => {
      const truth = testTruth(input);
      const mirror = reflectTruth(input);
      setTruthResult(truth);
      setMirrorResult(mirror);
      setPhase("revealed");
      setTimeout(() => {
        if (revealRef.current) revealRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }, 1400);
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReflect(); }
  };

  const handleReset = () => {
    setInput(""); setTruthResult(null); setMirrorResult(null);
    setPhase("gate"); setAnimScore(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleNavigateToLayer = (depth) => { if (onNavigateToDepth) onNavigateToDepth(depth); };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: DARK, display: "flex", flexDirection: "column", alignItems: "center",
      overflowY: "auto", overflowX: "hidden", zIndex: 10000, WebkitOverflowScrolling: "touch",
    }}>
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        opacity: 0.025, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 35%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      <div style={{
        position: "relative", zIndex: 2, width: "100%", maxWidth: 618,
        padding: `${S5}px ${S3}px ${S5 * 2}px`,
        display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh",
      }}>
        <div style={{ textAlign: "center", marginBottom: S4, animation: "mirrorReveal 1s ease 0.1s both" }}>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: `clamp(9px, 2.2vw, 11px)`,
            letterSpacing: 6, color: `${GOLD}0.3)`, marginBottom: S2, textTransform: "uppercase",
          }}>Layer &minus;1</div>
          <h1 style={{
            fontFamily: FONT_DISPLAY, fontSize: `clamp(${S3}px, 8vw, ${S4}px)`,
            fontWeight: 400, color: `${BONE}0.9)`, letterSpacing: 3, lineHeight: 1.2,
            margin: 0, marginBottom: S2,
          }}>TRUTH OR DARE</h1>
          <div style={{
            fontFamily: FONT_BODY, fontSize: `clamp(14px, 3.2vw, 18px)`,
            fontStyle: "italic", fontWeight: 300, color: `${BONE}0.4)`,
            lineHeight: PHI, maxWidth: 420, margin: "0 auto",
          }}>Don't ask a question.<br />Write what you believe is true.</div>
        </div>

        <div style={{ width: "100%", marginBottom: S4, animation: "mirrorReveal 0.8s ease 0.4s both" }}>
          <textarea ref={inputRef} value={input}
            onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="everything is connected..."
            disabled={phase === "reflecting"} rows={3}
            style={{
              width: "100%", padding: `${S2}px ${S3}px`,
              fontFamily: FONT_BODY, fontSize: `clamp(16px, 3.5vw, 20px)`,
              fontStyle: "italic", fontWeight: 300, color: `${BONE}0.85)`,
              background: `${GOLD}0.02)`, border: `1px solid ${GOLD}0.12)`,
              borderRadius: 8, outline: "none", resize: "none",
              lineHeight: PHI, letterSpacing: 0.5,
              transition: "border-color 0.4s ease, background 0.4s ease",
              caretColor: `${GOLD}0.6)`,
            }}
            onFocus={(e) => { e.target.style.borderColor = `${GOLD}0.25)`; e.target.style.background = `${GOLD}0.04)`; }}
            onBlur={(e) => { e.target.style.borderColor = `${GOLD}0.12)`; e.target.style.background = `${GOLD}0.02)`; }}
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: S2, gap: S2 }}>
            {phase !== "revealed" && (
              <button onClick={handleReflect}
                disabled={input.trim().length < 2 || phase === "reflecting"}
                style={{
                  fontFamily: FONT_DISPLAY, fontSize: `clamp(10px, 2.2vw, 12px)`,
                  letterSpacing: 4,
                  color: input.trim().length < 2 ? `${BONE}0.15)` : `${GOLD}0.7)`,
                  background: "transparent",
                  border: `1px solid ${input.trim().length < 2 ? `${GOLD}0.06)` : `${GOLD}0.2)`}`,
                  borderRadius: 6, padding: `${S1}px ${S3}px`,
                  cursor: input.trim().length < 2 ? "default" : "pointer",
                  transition: "all 0.4s ease", textTransform: "uppercase",
                }}>{phase === "reflecting" ? "REFLECTING..." : "REFLECT"}</button>
            )}
            {phase === "revealed" && (
              <button onClick={handleReset} style={{
                fontFamily: FONT_DISPLAY, fontSize: `clamp(10px, 2.2vw, 12px)`,
                letterSpacing: 4, color: `${BONE}0.4)`, background: "transparent",
                border: `1px solid ${GOLD}0.1)`, borderRadius: 6,
                padding: `${S1}px ${S3}px`, cursor: "pointer",
                transition: "all 0.4s ease", textTransform: "uppercase",
              }}>TRY AGAIN</button>
            )}
          </div>
        </div>

        {phase === "reflecting" && (
          <div style={{ textAlign: "center", animation: "breathePulse 2s ease-in-out infinite" }}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 22, fontStyle: "italic", color: `${GOLD}0.4)` }}>
              &#x1FA9E;
            </div>
          </div>
        )}

        {phase === "revealed" && truthResult && mirrorResult && (
          <div ref={revealRef} style={{
            width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: S3,
          }}>
            <PsiRing score={animScore} R12={truthResult.R12} G={truthResult.G} visible={true} />

            <div style={{ textAlign: "center", animation: "mirrorReveal 0.8s ease 0.3s both", maxWidth: 440 }}>
              <div style={{
                fontFamily: FONT_BODY, fontSize: `clamp(14px, 3vw, 17px)`,
                fontStyle: "italic", color: `${BONE}0.45)`, lineHeight: PHI,
              }}>{truthResult.depthLabel}</div>
            </div>

            <LayerHitBar layerHits={truthResult.layerHits} visible={true} />
            <PsiBreakdown R12={truthResult.R12} G={truthResult.G} C_eff={truthResult.C_eff}
              D_hat={truthResult.D_hat} psi={truthResult.psi} visible={true} />

            {mirrorResult.matched.length > 0 && (
              <div style={{ width: "100%", animation: "mirrorReveal 0.8s ease 0.6s both" }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 9, letterSpacing: 4,
                  color: `${GOLD}0.3)`, textTransform: "uppercase", marginBottom: S2, textAlign: "center",
                }}>What you touched</div>
                {mirrorResult.matched.slice(0, 3).map((node, i) => (
                  <div key={node.id} style={{
                    padding: `${S1}px 0`, borderBottom: `1px solid ${GOLD}0.06)`,
                    animation: `mirrorReveal 0.6s ease ${0.7 + i * 0.15}s both`,
                  }}>
                    <div style={{
                      fontFamily: FONT_BODY, fontSize: `clamp(14px, 2.8vw, 16px)`,
                      fontWeight: 300, color: `${BONE}0.6)`, lineHeight: PHI,
                    }}>{node.truth}</div>
                    <div style={{
                      fontFamily: FONT_DISPLAY, fontSize: 8, letterSpacing: 3,
                      color: `${GOLD}0.3)`, marginTop: 6, textTransform: "uppercase",
                    }}>{node.path}</div>
                  </div>
                ))}
              </div>
            )}

            {mirrorResult.dares.length > 0 && (
              <div style={{
                width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: S2,
              }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 9, letterSpacing: 4,
                  color: `${GOLD}0.3)`, textTransform: "uppercase", marginBottom: S1,
                }}>We dare you</div>
                {mirrorResult.dares.map((node, i) => (
                  <DareCard key={node.id} node={node} index={i} onNavigate={handleNavigateToLayer} />
                ))}
              </div>
            )}

            {mirrorResult.matched.length === 0 && (
              <div style={{ textAlign: "center", animation: "mirrorReveal 0.8s ease 0.5s both" }}>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: `clamp(15px, 3vw, 18px)`,
                  fontStyle: "italic", color: `${BONE}0.5)`, lineHeight: PHI, marginBottom: S3,
                }}>Your truth didn't match any pattern we hold &mdash; yet.<br />
                  That either means you're ahead of us,<br />
                  or the door is deeper than we've dug.</div>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 9, letterSpacing: 4,
                  color: `${GOLD}0.3)`, textTransform: "uppercase", marginBottom: S2,
                }}>Start here instead</div>
                {mirrorResult.dares.map((node, i) => (
                  <DareCard key={node.id} node={node} index={i} onNavigate={handleNavigateToLayer} />
                ))}
              </div>
            )}

            <div style={{ marginTop: S3, animation: "mirrorReveal 0.8s ease 1.2s both" }}>
              <button onClick={onEnter} style={{
                fontFamily: FONT_DISPLAY, fontSize: `clamp(10px, 2.5vw, 13px)`,
                letterSpacing: 5, color: `${GOLD}0.55)`, background: "transparent",
                border: `1px solid ${GOLD}0.15)`, borderRadius: 8,
                padding: `${S2}px ${S4}px`, cursor: "pointer",
                transition: "all 0.5s ease", textTransform: "uppercase",
              }}
                onMouseEnter={(e) => { e.target.style.borderColor = `${GOLD}0.35)`; e.target.style.color = `${GOLD}0.8)`; }}
                onMouseLeave={(e) => { e.target.style.borderColor = `${GOLD}0.15)`; e.target.style.color = `${GOLD}0.55)`; }}
              >ENTER THE THEORY</button>
            </div>
          </div>
        )}

        {phase === "gate" && (
          <div onClick={onEnter} style={{
            position: "fixed", bottom: S3, left: "50%", transform: "translateX(-50%)",
            fontFamily: FONT_DISPLAY, fontSize: 9, letterSpacing: 4,
            color: `${BONE}0.15)`, cursor: "pointer", transition: "color 0.4s ease",
            textTransform: "uppercase", zIndex: 3, animation: "mirrorReveal 1s ease 2s both",
          }}
            onMouseEnter={(e) => e.target.style.color = `${BONE}0.35)`}
            onMouseLeave={(e) => e.target.style.color = `${BONE}0.15)`}
          >skip</div>
        )}
      </div>

      <style>{`
        @keyframes mirrorReveal {
          from { opacity: 0; transform: translateY(${S2}px); filter: blur(2px); }
          60% { opacity: 0.85; filter: blur(0.3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes breathePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        textarea::placeholder { color: ${BONE}0.2); font-style: italic; }
        textarea::-webkit-scrollbar { width: 3px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: ${GOLD}0.15); border-radius: 3px; }
      `}</style>
    </div>
  );
}
