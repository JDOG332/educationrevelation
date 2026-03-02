/**
 * GROUND TRUTH & DARE — A Measurement of the Depth of Truth
 * 
 * Write what you believe is true.
 * Your words are compared against every sentence on the site.
 * 954 sentences. ~280,000 comparisons. <2ms.
 * No AI. No API. Just raw truth against raw truth.
 * 
 * Ψ = R₁₂ × G → Depth of Truth (1.0–10.0)
 * DUST → TOPSOIL → CLAY → ROOTS → STONE → BEDROCK → CORE → MAGMA → CRYSTAL → SEED
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

// DEPTH CHART COLORS — earth tones getting hotter as you go deeper
const DEPTH_COLORS = {
  1:  "rgba(120,110,100,",   // DUST — grey-brown
  2:  "rgba(139,119,80,",    // TOPSOIL — dark tan
  3:  "rgba(160,100,60,",    // CLAY — terracotta
  4:  "rgba(90,130,70,",     // ROOTS — living green
  5:  "rgba(140,140,150,",   // STONE — granite
  6:  "rgba(100,100,120,",   // BEDROCK — slate blue
  7:  "rgba(201,168,76,",    // CORE — gold
  8:  "rgba(220,100,40,",    // MAGMA — deep orange
  9:  "rgba(180,140,220,",   // CRYSTAL — amethyst
  10: "rgba(201,168,76,",    // SEED — gold (full circle)
};

// ═══════════════════════════════════════════════════════════
// GROUND TRUTH RING
// ═══════════════════════════════════════════════════════════

function GroundTruthRing({ score, tier, depthName, R12, G, visible }) {
  const radius = 62;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = (score - 1) / 9; // normalize 1-10 to 0-1
  const offset = circumference - fillPercent * circumference;
  const depthColor = DEPTH_COLORS[tier] || GOLD;
  const glowIntensity = Math.min(0.7, 0.15 + fillPercent * 0.55);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: S1,
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.85)",
      transition: "opacity 0.8s ease, transform 1s cubic-bezier(0.23,1,0.32,1)",
    }}>
      <div style={{ position: "relative", width: radius * 2 + 28, height: radius * 2 + 28 }}>
        <svg width={radius * 2 + 28} height={radius * 2 + 28} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx={radius + 14} cy={radius + 14} r={radius}
            fill="none" stroke={`${BONE}0.04)`} strokeWidth={stroke} />
          {/* R₁₂ inner whisper */}
          <circle cx={radius + 14} cy={radius + 14} r={radius - 10}
            fill="none" stroke={`${BONE}0.06)`} strokeWidth={1}
            strokeDasharray={2 * Math.PI * (radius - 10)}
            strokeDashoffset={2 * Math.PI * (radius - 10) * (1 - R12)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.23,1,0.32,1) 0.4s" }} />
          {/* G outer whisper */}
          <circle cx={radius + 14} cy={radius + 14} r={radius + 10}
            fill="none" stroke={`${BONE}0.04)`} strokeWidth={0.8}
            strokeDasharray={2 * Math.PI * (radius + 10)}
            strokeDashoffset={2 * Math.PI * (radius + 10) * (1 - G)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(0.23,1,0.32,1) 0.6s" }} />
          {/* Main Ground Truth arc */}
          <circle cx={radius + 14} cy={radius + 14} r={radius}
            fill="none" stroke={`${depthColor}0.8)`} strokeWidth={stroke}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 2s cubic-bezier(0.23,1,0.32,1)",
              filter: `drop-shadow(0 0 ${8 + fillPercent * 12}px ${depthColor}${glowIntensity}))`,
            }} />
        </svg>
        {/* Score */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", textAlign: "center",
        }}>
          <div style={{
            fontFamily: FONT_DISPLAY,
            fontSize: `clamp(28px, 7vw, 42px)`,
            fontWeight: 400, color: `${depthColor}0.9)`,
            letterSpacing: 1, lineHeight: 1,
          }}>{score}</div>
        </div>
      </div>

      {/* DEPTH NAME — the word that matters */}
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: `clamp(11px, 2.8vw, 14px)`,
        letterSpacing: 6,
        color: `${depthColor}0.7)`,
        textTransform: "uppercase",
        textAlign: "center",
        animation: "mirrorReveal 0.6s ease 0.5s both",
      }}>
        {depthName}
      </div>

      {/* DEPTH OF TRUTH label */}
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 7,
        letterSpacing: 4,
        color: `${BONE}0.25)`,
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: -4,
      }}>
        DEPTH OF TRUTH
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DEPTH CHART BAR — 10-tier visual scale
// ═══════════════════════════════════════════════════════════

function DepthChartBar({ tier, visible }) {
  const tiers = ["DUST","TOPSOIL","CLAY","ROOTS","STONE","BEDROCK","CORE","MAGMA","CRYSTAL","SEED"];

  return (
    <div style={{
      display: "flex", gap: 2, justifyContent: "center", alignItems: "flex-end",
      height: 44, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
      width: "100%", maxWidth: 340,
    }}>
      {tiers.map((name, i) => {
        const level = i + 1;
        const active = level <= tier;
        const isCurrent = level === tier;
        const color = DEPTH_COLORS[level];
        const height = 8 + (i * 3.5);

        return (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            flex: 1,
          }}>
            <div style={{
              width: "100%",
              height: height,
              borderRadius: 2,
              background: active
                ? `linear-gradient(to top, ${color}${isCurrent ? "0.6" : "0.25"}), ${color}${isCurrent ? "0.8" : "0.4"}))`
                : `${BONE}0.03)`,
              transition: "all 1.2s cubic-bezier(0.23,1,0.32,1)",
              boxShadow: isCurrent ? `0 0 8px ${color}0.3)` : "none",
            }} />
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LAYER HIT BAR
// ═══════════════════════════════════════════════════════════

function LayerHitBar({ layerHits, visible }) {
  const hitMap = {};
  for (const hit of layerHits) hitMap[hit.layerIndex] = hit;

  return (
    <div style={{
      display: "flex", gap: 3, justifyContent: "center", alignItems: "flex-end",
      height: 44, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.7s",
    }}>
      {Array.from({ length: 9 }, (_, i) => {
        const hit = hitMap[i];
        const height = hit ? 10 + hit.R12 * 34 : 5;
        const opacity = hit ? 0.3 + hit.R12 * 0.5 : 0.05;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: 14, height, borderRadius: 2,
              background: hit
                ? `linear-gradient(to top, ${GOLD}${opacity * 0.5}), ${GOLD}${opacity}))`
                : `${GOLD}0.03)`,
              transition: "height 1s cubic-bezier(0.23,1,0.32,1) 0.3s",
            }} />
            <span style={{ fontSize: 9, opacity: hit ? 0.7 : 0.15, transition: "opacity 0.5s ease" }}>
              {LAYER_GLYPHS[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PSI BREAKDOWN
// ═══════════════════════════════════════════════════════════

function PsiBreakdown({ R12, G, psi, visible }) {
  const fmt = (n) => (n * 100).toFixed(0);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: S1, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.9s", flexWrap: "wrap",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 10, fontStyle: "italic", color: `${BONE}0.25)`, letterSpacing: 1 }}>recognition</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: `${BONE}0.4)`, letterSpacing: 1 }}>R&#x2081;&#x2082; {fmt(R12)}</div>
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: `${GOLD}0.2)` }}>&times;</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 10, fontStyle: "italic", color: `${BONE}0.25)`, letterSpacing: 1 }}>reliability</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: `${BONE}0.4)`, letterSpacing: 1 }}>G {fmt(G)}</div>
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: `${GOLD}0.2)` }}>=</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 10, fontStyle: "italic", color: `${GOLD}0.35)`, letterSpacing: 1 }}>truth</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, color: `${GOLD}0.5)`, letterSpacing: 1 }}>&Psi; {fmt(psi)}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DARE CARD
// ═══════════════════════════════════════════════════════════

function DareCard({ node, index, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.8 + index * 0.2;
  return (
    <div onClick={() => onNavigate(node.route)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: `${S2}px ${S3}px`,
        border: `1px solid ${GOLD}${hovered ? "0.25" : "0.08"})`,
        borderRadius: 8, cursor: "pointer",
        background: hovered ? `linear-gradient(135deg, ${GOLD}0.03), transparent)` : "transparent",
        transition: "all 0.5s ease",
        animation: `mirrorReveal 0.8s ease ${delay}s both`,
        maxWidth: 480, width: "100%",
      }}>
      <div style={{
        fontFamily: FONT_BODY, fontSize: `clamp(15px, 3.2vw, 19px)`,
        fontStyle: "italic", fontWeight: 300, color: `${BONE}0.8)`,
        lineHeight: PHI, marginBottom: S1,
      }}>{node.dare}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13 }}>{LAYER_GLYPHS[node.depth - 1] || "\u{1F52E}"}</span>
        <span style={{
          fontFamily: FONT_DISPLAY, fontSize: 8, letterSpacing: 3,
          color: `${GOLD}0.35)`, textTransform: "uppercase",
        }}>{node.path}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GROUND TRUTH — THE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function MirrorGate({ onEnter, onNavigateToDepth }) {
  const [input, setInput] = useState("");
  const [truthResult, setTruthResult] = useState(null);
  const [mirrorResult, setMirrorResult] = useState(null);
  const [phase, setPhase] = useState("gate");
  const [animScore, setAnimScore] = useState(1.0);
  const inputRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Animate the Ground Truth score counting up
  useEffect(() => {
    if (phase !== "revealed" || !truthResult) return;
    const target = truthResult.groundTruth;
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      const current = 1.0 + eased * (target - 1.0);
      setAnimScore(Math.round(current * 10) / 10);
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
      }, 500);
    }, 1600);
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReflect(); }
  };

  const handleReset = () => {
    setInput(""); setTruthResult(null); setMirrorResult(null);
    setPhase("gate"); setAnimScore(1.0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleNavigateToLayer = (route) => { if (onNavigateToDepth) onNavigateToDepth(route); };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: DARK, display: "flex", flexDirection: "column", alignItems: "center",
      overflowY: "auto", overflowX: "hidden", zIndex: 10000, WebkitOverflowScrolling: "touch",
    }}>
      {/* Grain */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        opacity: 0.02, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />
      {/* Vignette */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 35%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, width: "100%", maxWidth: 618,
        padding: `${S4}px ${S3}px ${S5 * 2}px`,
        display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh",
        justifyContent: "flex-start", paddingTop: `clamp(${S3}px, 12vh, ${S5}px)`,
      }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: S2, animation: "mirrorReveal 1s ease 0.1s both" }}>
          <h1 style={{
            fontFamily: FONT_DISPLAY, fontSize: `clamp(${S3}px, 9vw, ${S5}px)`,
            fontWeight: 400, letterSpacing: 4, lineHeight: 1.1,
            margin: 0, marginBottom: S1, whiteSpace: "nowrap",
          }}><span style={{ color: `${BONE}0.9)` }}>TRUTH</span> <span style={{ fontSize: "0.85em", letterSpacing: 6, color: `${GOLD}0.6)` }}>&amp; DARE</span></h1>
          <div style={{
            fontFamily: FONT_BODY, fontSize: `clamp(10px, 2.2vw, 12px)`,
            fontStyle: "italic", fontWeight: 300, color: `${BONE}0.2)`,
            letterSpacing: 3, marginBottom: S1,
          }}>a measurement of the depth of truth</div>
        </div>

        {/* ── INPUT — Google-style single line ── */}
        <div style={{ width: "100%", marginBottom: S2, animation: "mirrorReveal 0.8s ease 0.3s both" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            background: `${GOLD}0.02)`, border: `1px solid ${GOLD}0.1)`,
            borderRadius: 24, overflow: "hidden",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}0.18)`; e.currentTarget.style.boxShadow = `0 2px 12px ${GOLD}0.06)`; }}
            onMouseLeave={e => { if (document.activeElement !== inputRef.current) { e.currentTarget.style.borderColor = `${GOLD}0.1)`; e.currentTarget.style.boxShadow = "none"; } }}
          >
            <input ref={inputRef} type="text" value={input}
              onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="write what you believe is true..."
              disabled={phase === "reflecting"}
              style={{
                flex: 1, padding: `${S1 + 2}px ${S2}px`,
                fontFamily: FONT_BODY, fontSize: `clamp(15px, 3vw, 18px)`,
                fontStyle: "italic", fontWeight: 300, color: `${BONE}0.85)`,
                background: "transparent", border: "none", outline: "none",
                letterSpacing: 0.5,
                caretColor: `${GOLD}0.5)`,
              }}
              onFocus={(e) => { e.target.closest("div").style.borderColor = `${GOLD}0.25)`; e.target.closest("div").style.boxShadow = `0 4px 20px ${GOLD}0.08)`; }}
              onBlur={(e) => { e.target.closest("div").style.borderColor = `${GOLD}0.1)`; e.target.closest("div").style.boxShadow = "none"; }}
            />
            <button onClick={handleReflect}
              disabled={input.trim().length < 2 || phase === "reflecting"}
              style={{
                fontFamily: FONT_DISPLAY, fontSize: `clamp(9px, 2vw, 11px)`,
                letterSpacing: 4,
                color: input.trim().length < 2 ? `${BONE}0.12)` : `${GOLD}0.6)`,
                background: "transparent",
                border: "none", borderLeft: `1px solid ${GOLD}0.06)`,
                padding: `${S1}px ${S2}px`,
                cursor: input.trim().length < 2 ? "default" : "pointer",
                transition: "all 0.4s ease", textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>{phase === "reflecting" ? "..." : "DIG"}</button>
          </div>
          {phase === "revealed" && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: S1 }}>
              <button onClick={handleReset} style={{
                fontFamily: FONT_DISPLAY, fontSize: `clamp(9px, 2vw, 11px)`,
                letterSpacing: 4, color: `${BONE}0.3)`, background: "transparent",
                border: `1px solid ${GOLD}0.06)`, borderRadius: 16,
                padding: `${Math.round(S1 * 0.7)}px ${S2}px`, cursor: "pointer",
                transition: "all 0.4s ease", textTransform: "uppercase",
              }}>DIG AGAIN</button>
            </div>
          )}
          <div style={{
            textAlign: "center", marginTop: S1,
            fontFamily: FONT_BODY, fontSize: `clamp(12px, 2.5vw, 15px)`,
            fontStyle: "italic", fontWeight: 300, color: `${BONE}0.25)`,
            lineHeight: PHI,
          }}>don't ask a question — state what you believe</div>
        </div>

        {/* ── DIGGING STATE ── */}
        {phase === "reflecting" && (
          <div style={{ textAlign: "center", animation: "breathePulse 1.8s ease-in-out infinite" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>&#x26CF;&#xFE0F;</div>
            <div style={{
              fontFamily: FONT_BODY, fontSize: 14, fontStyle: "italic", color: `${BONE}0.25)`, letterSpacing: 2,
            }}>breaking ground...</div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "revealed" && truthResult && mirrorResult && (
          <div ref={revealRef} style={{
            width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: S3,
          }}>
            {/* Ground Truth Score */}
            <GroundTruthRing
              score={animScore} tier={truthResult.tier}
              depthName={truthResult.depthName}
              R12={truthResult.R12} G={truthResult.G} visible={true}
            />

            {/* Depth label */}
            <div style={{ textAlign: "center", animation: "mirrorReveal 0.8s ease 0.4s both", maxWidth: 400 }}>
              <div style={{
                fontFamily: FONT_BODY, fontSize: `clamp(14px, 3vw, 17px)`,
                fontStyle: "italic", color: `${BONE}0.4)`, lineHeight: PHI,
              }}>{truthResult.depthLabel}</div>
            </div>

            {/* Depth Chart Bar */}
            <DepthChartBar tier={truthResult.tier} visible={true} />

            {/* Layer hits */}
            <LayerHitBar layerHits={truthResult.layerHits} visible={true} />

            {/* Ψ equation */}
            <PsiBreakdown R12={truthResult.R12} G={truthResult.G} psi={truthResult.psi} visible={true} />

            {/* What you touched */}
            {mirrorResult.matched.length > 0 && (
              <div style={{ width: "100%", animation: "mirrorReveal 0.8s ease 0.7s both" }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 8, letterSpacing: 4,
                  color: `${GOLD}0.25)`, textTransform: "uppercase", marginBottom: S2, textAlign: "center",
                }}>What you touched</div>
                {mirrorResult.matched.slice(0, 3).map((node, i) => (
                  <div key={node.id}
                    onClick={() => handleNavigateToLayer(node.route)}
                    style={{
                      padding: `${S1}px ${S2}px`, borderBottom: `1px solid ${GOLD}0.05)`,
                      animation: `mirrorReveal 0.5s ease ${0.8 + i * 0.12}s both`,
                      cursor: "pointer", borderRadius: 6,
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = `${GOLD}0.03)`}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      fontFamily: FONT_BODY, fontSize: `clamp(13px, 2.6vw, 15px)`,
                      fontWeight: 300, color: `${BONE}0.5)`, lineHeight: PHI,
                    }}>{node.truth}</div>
                    <div style={{
                      fontFamily: FONT_DISPLAY, fontSize: 7, letterSpacing: 3,
                      color: `${GOLD}0.35)`, marginTop: 5, textTransform: "uppercase",
                    }}>{node.path} &rarr;</div>
                  </div>
                ))}
              </div>
            )}

            {/* Deeper doors */}
            {mirrorResult.dares.length > 0 && (
              <div style={{
                width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: S2,
              }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 8, letterSpacing: 4,
                  color: `${GOLD}0.25)`, textTransform: "uppercase", marginBottom: S1,
                }}>We dare you</div>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: `clamp(13px, 2.8vw, 16px)`,
                  fontStyle: "italic", fontWeight: 300, color: `${BONE}0.4)`,
                  textAlign: "center", lineHeight: PHI, maxWidth: 400, marginBottom: S2,
                  animation: "mirrorReveal 0.6s ease 0.7s both",
                }}>to learn more&hellip; open your mind to exploring &amp; expanding your personal truth.</div>
                {mirrorResult.dares.map((node, i) => (
                  <DareCard key={node.id} node={node} index={i} onNavigate={handleNavigateToLayer} />
                ))}
              </div>
            )}

            {/* No matches */}
            {mirrorResult.matched.length === 0 && (
              <div style={{ textAlign: "center", animation: "mirrorReveal 0.8s ease 0.5s both" }}>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: `clamp(14px, 3vw, 17px)`,
                  fontStyle: "italic", color: `${BONE}0.45)`, lineHeight: PHI, marginBottom: S3,
                }}>Your truth didn't match any pattern we hold &mdash; yet.<br />
                  That either means you're ahead of us,<br />
                  or the door is deeper than we've dug.</div>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 8, letterSpacing: 4,
                  color: `${GOLD}0.25)`, textTransform: "uppercase", marginBottom: S2,
                }}>Start here</div>
                {mirrorResult.dares.map((node, i) => (
                  <DareCard key={node.id} node={node} index={i} onNavigate={handleNavigateToLayer} />
                ))}
              </div>
            )}

            {/* Enter */}
            <div style={{ marginTop: S2, animation: "mirrorReveal 0.8s ease 1.3s both" }}>
              <button onClick={onEnter} style={{
                fontFamily: FONT_DISPLAY, fontSize: `clamp(9px, 2.2vw, 12px)`,
                letterSpacing: 5, color: `${GOLD}0.45)`, background: "transparent",
                border: `1px solid ${GOLD}0.12)`, borderRadius: 8,
                padding: `${S2}px ${S4}px`, cursor: "pointer",
                transition: "all 0.5s ease", textTransform: "uppercase",
              }}
                onMouseEnter={(e) => { e.target.style.borderColor = `${GOLD}0.3)`; e.target.style.color = `${GOLD}0.75)`; }}
                onMouseLeave={(e) => { e.target.style.borderColor = `${GOLD}0.12)`; e.target.style.color = `${GOLD}0.45)`; }}
              >ENTER THE THEORY</button>
            </div>
          </div>
        )}

        {/* Skip */}
        {phase === "gate" && (
          <div onClick={onEnter} style={{
            position: "fixed", bottom: S4, left: "50%", transform: "translateX(-50%)",
            fontFamily: FONT_DISPLAY, fontSize: `clamp(11px, 2.8vw, 14px)`, letterSpacing: 6,
            color: `${BONE}0.18)`, cursor: "pointer", transition: "color 0.5s ease, letter-spacing 0.5s ease",
            textTransform: "uppercase", zIndex: 3, animation: "mirrorReveal 1s ease 2s both",
          }}
            onMouseEnter={(e) => { e.target.style.color = `${BONE}0.4)`; e.target.style.letterSpacing = "8px"; }}
            onMouseLeave={(e) => { e.target.style.color = `${BONE}0.18)`; e.target.style.letterSpacing = "6px"; }}
          >enter the void</div>
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
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        textarea::placeholder { color: ${BONE}0.18); font-style: italic; }
        textarea::-webkit-scrollbar { width: 3px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: ${GOLD}0.12); border-radius: 3px; }
      `}</style>
    </div>
  );
}
