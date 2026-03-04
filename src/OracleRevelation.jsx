import React, { useState, useEffect, useRef, useCallback } from "react";
import { PHI } from "./data.js";
import { TheEquation } from "./components/ui.jsx";

// Smootherstep easing: 6t⁵ − 15t⁴ + 10t³
function smootherstep(t) {
  t = Math.max(0, Math.min(1, t));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export default function OracleRevelation({ data, query, onNavigate }) {
  const [phase, setPhase] = useState(0);
  const r12Ref = useRef(null);
  const gRef = useRef(null);
  const psiRef = useRef(null);
  const rafRef = useRef(null);

  // Phase timeline: 0→1200ms→2400ms
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2400),
    ];
    return () => {
      timers.forEach(clearTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [data]);

  // Phase 1: Animate number counters via requestAnimationFrame
  useEffect(() => {
    if (phase < 1) return;
    const duration = 800;
    const targets = {
      r12: Math.min(1, Math.max(0, data.R12 || 0)),
      g: Math.min(1, Math.max(0, data.G || 0)),
      psi: Math.min(1, Math.max(0, data.psi || 0)),
    };
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const t = smootherstep(Math.min(1, elapsed / duration));
      if (r12Ref.current) r12Ref.current.textContent = (targets.r12 * t).toFixed(3);
      if (gRef.current) gRef.current.textContent = (targets.g * t).toFixed(3);
      if (psiRef.current) psiRef.current.textContent = (targets.psi * t).toFixed(3);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase, data]);

  const results = data.results || [];

  return (
    <div style={{
      width: "100%", maxWidth: 520, marginTop: Math.round(13 * PHI),
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* ═══ PHASE 0: THE DESCENT ═══ */}
      <div style={{
        width: "100%", textAlign: "center",
        animation: "fadeSlideUp 0.6s ease both",
      }}>
        {/* Gold divider */}
        <div style={{
          width: 0, height: 1, margin: "0 auto",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          animation: "crackSpread 1s ease both",
        }} />
        {/* Echo query */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(15px, 3vw, 19px)",
          fontStyle: "italic",
          color: "rgba(201,168,76,0.5)",
          letterSpacing: 2,
          marginTop: Math.round(5 * PHI),
          animation: "textManifest 1s 0.2s both ease",
        }}>
          "{query}"
        </div>
        {/* Thinking dots */}
        {phase < 1 && (
          <div style={{
            marginTop: Math.round(5 * PHI),
            display: "flex", justifyContent: "center", gap: 8,
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "rgba(201,168,76,0.5)",
                animation: `breathe 1.2s ${i * 0.2}s ease-in-out infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* ═══ PHASE 1: THE EQUATION SPEAKS ═══ */}
      {phase >= 1 && (
        <div style={{
          width: "100%", marginTop: Math.round(10 * PHI),
          animation: "fadeSlideUp 0.6s ease both",
          textAlign: "center",
        }}>
          <TheEquation size="sm" showLabel={false} breathing={false} />

          <div style={{
            display: "flex", justifyContent: "center", gap: Math.round(10 * PHI),
            marginTop: Math.round(5 * PHI),
          }}>
            {/* R₁₂ */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9, letterSpacing: 2,
                color: "rgba(201,168,76,0.4)",
                marginBottom: 4,
              }}>R₁₂</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 4vw, 26px)",
                color: "rgba(201,168,76,0.85)",
                animation: "valueReveal 0.6s ease both, numberCountGlow 2s ease-in-out infinite",
              }}>
                <span ref={r12Ref}>0.000</span>
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 7, letterSpacing: 1.5,
                color: "rgba(201,168,76,0.25)",
                marginTop: 2,
              }}>RECOGNITION</div>
            </div>

            {/* G */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9, letterSpacing: 2,
                color: "rgba(79,195,247,0.4)",
                marginBottom: 4,
              }}>G</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 4vw, 26px)",
                color: "rgba(79,195,247,0.85)",
                animation: "valueReveal 0.6s 0.15s ease both, numberCountGlow 2s 0.5s ease-in-out infinite",
              }}>
                <span ref={gRef}>0.000</span>
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 7, letterSpacing: 1.5,
                color: "rgba(79,195,247,0.25)",
                marginTop: 2,
              }}>RELIABILITY</div>
            </div>

            {/* Ψ */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9, letterSpacing: 2,
                color: "rgba(232,232,240,0.4)",
                marginBottom: 4,
              }}>Ψ</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 4vw, 26px)",
                color: "rgba(232,232,240,0.85)",
                animation: "valueReveal 0.6s 0.3s ease both, numberCountGlow 2s 1s ease-in-out infinite",
              }}>
                <span ref={psiRef}>0.000</span>
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 7, letterSpacing: 1.5,
                color: "rgba(232,232,240,0.25)",
                marginTop: 2,
              }}>TRUTH</div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 2: THE ANSWERS ═══ */}
      {phase >= 2 && (
        <div style={{
          width: "100%", marginTop: Math.round(10 * PHI),
        }}>
          {/* Answer cards */}
          <div style={{
            display: "flex", flexDirection: "column",
            gap: Math.round(8 * PHI),
          }}>
            {results.map((result, i) => (
              <div
                key={i}
                onClick={() => {
                  if (result.route && result.route.convergence && onNavigate) {
                    onNavigate(result.route);
                  }
                }}
                style={{
                  background: "rgba(224,80,80,0.03)",
                  border: "1px solid rgba(224,80,80,0.1)",
                  borderRadius: Math.round(4 * PHI),
                  padding: `${Math.round(8 * PHI)}px ${Math.round(10 * PHI)}px`,
                  cursor: result.route && result.route.convergence ? "pointer" : "default",
                  animation: `fadeSlideUp 0.8s ${i * 0.2}s both ease`,
                  transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(224,80,80,0.06)";
                  e.currentTarget.style.borderColor = "rgba(224,80,80,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(224,80,80,0.03)";
                  e.currentTarget.style.borderColor = "rgba(224,80,80,0.1)";
                }}
              >
                {/* Ψ score bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{
                    flex: 1, height: 2, borderRadius: 1,
                    background: "rgba(224,80,80,0.08)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      width: `${Math.min(100, Math.round(result.psi * 100))}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, rgba(224,80,80,0.5), rgba(201,168,76,0.5))",
                      borderRadius: 1,
                      transition: "width 1s ease",
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 9, letterSpacing: 1,
                    color: "rgba(224,80,80,0.4)",
                  }}>
                    Ψ {(result.psi * 100).toFixed(0)}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(9px, 1.8vw, 11px)",
                  letterSpacing: 2,
                  color: "rgba(201,168,76,0.45)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                }}>
                  {result.title || ""}
                </div>

                {/* Answer */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(14px, 2.8vw, 17px)",
                  fontStyle: "italic",
                  color: "rgba(232,232,240,0.6)",
                  lineHeight: PHI,
                }}>
                  {result.answer && result.answer.length > 200
                    ? result.answer.slice(0, 200) + "..."
                    : result.answer}
                </div>

                {/* Navigate hint */}
                {result.route && result.route.convergence && (
                  <div style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 9, letterSpacing: 2,
                    color: "rgba(224,80,80,0.3)",
                    marginTop: 8,
                    textAlign: "right",
                  }}>
                    TAP TO EXPLORE →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
