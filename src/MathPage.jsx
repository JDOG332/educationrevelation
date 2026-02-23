import { useState, useEffect, useRef } from "react";

const PHI = 1.618;

/* KaTeX loader — renders LaTeX math beautifully */
function useMathRender() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.katex) { setReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);
  return ready;
}

function Tex({ children, display = false }) {
  const ref = useRef(null);
  const ready = useMathRender();
  useEffect(() => {
    if (ready && ref.current && window.katex) {
      try {
        window.katex.render(children, ref.current, {
          displayMode: display,
          throwOnError: false,
          trust: true,
        });
      } catch (e) { ref.current.textContent = children; }
    }
  }, [ready, children, display]);
  return <span ref={ref} style={{ display: display ? "block" : "inline" }} />;
}

function Section({ id, title, children, accent = "rgba(201,168,76,", delay = 0 }) {
  return (
    <div id={id} style={{
      marginBottom: Math.round(34 * PHI),
      animation: `fadeSlideUp 0.8s ${delay}s both ease`,
    }}>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(14px, 2.8vw, 20px)",
        letterSpacing: "0.2em",
        color: `${accent}0.7)`,
        marginBottom: Math.round(13 * PHI),
        paddingBottom: Math.round(5 * PHI),
        borderBottom: `1px solid ${accent}0.12)`,
      }}>{title}</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(15px, 2.6vw, 18px)",
        lineHeight: 1.85,
        color: "rgba(232,232,240,0.6)",
      }}>{children}</div>
    </div>
  );
}

function MathBlock({ children, label }) {
  return (
    <div style={{
      margin: `${Math.round(21 * PHI)}px 0`,
      padding: `${Math.round(13 * PHI)}px ${Math.round(21 * PHI)}px`,
      background: "linear-gradient(180deg, rgba(201,168,76,0.03), rgba(8,8,24,0.4))",
      border: "1px solid rgba(201,168,76,0.1)",
      borderRadius: 12,
      textAlign: "center",
      position: "relative",
      boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
    }}>
      {label && (
        <div style={{
          position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 4,
          color: "rgba(201,168,76,0.35)",
          background: "#0a0a18", padding: "2px 12px",
        }}>{label}</div>
      )}
      <div style={{ fontSize: "clamp(18px, 3.5vw, 26px)", color: "rgba(232,232,240,0.85)" }}>
        {children}
      </div>
    </div>
  );
}

function ComponentCard({ symbol, name, description, color, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        marginBottom: Math.round(8 * PHI),
        padding: `${Math.round(13 * PHI)}px`,
        background: `linear-gradient(135deg, ${color}0.03), rgba(8,8,24,0.3))`,
        border: `1px solid ${color}0.1)`,
        borderRadius: 12,
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: open ? `0 8px 32px ${color}0.08)` : "0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 4vw, 28px)",
            fontStyle: "italic",
            color: `${color}0.7)`,
            textShadow: `0 0 12px ${color}0.15)`,
          }}>{symbol}</div>
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(11px, 2vw, 14px)",
              letterSpacing: "0.15em", color: `${color}0.65)`,
            }}>{name}</div>
          </div>
        </div>
        <div style={{
          fontSize: 12, color: `${color}0.3)`,
          transition: "transform 0.3s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}>▼</div>
      </div>
      {open && (
        <div style={{
          marginTop: Math.round(8 * PHI),
          paddingTop: Math.round(8 * PHI),
          borderTop: `1px solid ${color}0.06)`,
          animation: "senseReveal 0.4s ease",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 16px)",
            lineHeight: 1.8, color: "rgba(232,232,240,0.5)",
            fontStyle: "italic",
            marginBottom: children ? Math.round(8 * PHI) : 0,
          }}>{description}</div>
          {children}
        </div>
      )}
    </div>
  );
}

export default function MathPage({ onReturn }) {
  const ready = useMathRender();

  return (
    <div style={{
      maxWidth: 720, margin: "0 auto",
      padding: `${Math.round(21 * PHI)}px 24px ${Math.round(55 * PHI)}px`,
      position: "relative", zIndex: 2,
    }}>
      {/* Back navigation */}
      <button onClick={onReturn} style={{
        cursor: "pointer", background: "none", border: "none",
        color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
        fontSize: 11, letterSpacing: 3, padding: "8px 16px",
        transition: "all 0.4s",
      }}
        onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
      >← RETURN</button>

      {/* Header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(13 * PHI),
        marginBottom: Math.round(34 * PHI),
        animation: "fadeSlideUp 1s 0.1s both ease",
      }}>
        {/* Radiance */}
        <div style={{
          position: "absolute", top: 80, left: "50%", width: 300, height: 200,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(79,195,247,0.04) 0%, transparent 60%)",
          borderRadius: "50%", pointerEvents: "none",
          animation: "breathe 10s ease-in-out infinite",
        }} />

        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.6em",
          color: "rgba(79,195,247,0.35)",
        }}>FOR THE SCIENTISTS</div>

        <div style={{ height: Math.round(5 * PHI) }} />

        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(20px, 4.5vw, 32px)",
          fontWeight: 400, color: "#e8e8f0",
          letterSpacing: "0.2em", margin: 0,
          textShadow: "0 0 60px rgba(232,232,240,0.08)",
        }}>CONVERGENT RECOGNITION THEORY</h1>

        <div style={{ height: Math.round(3 * PHI) }} />

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(13px, 2.2vw, 16px)",
          fontStyle: "italic", color: "rgba(232,232,240,0.35)",
          letterSpacing: 1,
        }}>A Geometric Coherence Functional</div>

        <div style={{
          width: Math.round(55 * PHI), height: 1,
          margin: `${Math.round(13 * PHI)}px auto 0`,
          background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.25), rgba(201,168,76,0.35), rgba(79,195,247,0.25), transparent)",
          boxShadow: "0 0 16px rgba(79,195,247,0.06)",
        }} />
      </div>

      {/* ===== OVERVIEW ===== */}
      <Section id="overview" title="OVERVIEW" accent="rgba(232,232,240," delay={0.2}>
        <p style={{ marginBottom: Math.round(8 * PHI) }}>
          We introduce a geometric coherence functional, denoted as <Tex>{`\\Psi`}</Tex>, defined on the product space <Tex>{`(\\mathcal{Q} \\times \\mathcal{Q}) \\times (\\text{model space}) \\times (\\text{apparatus space})`}</Tex>. This framework formalizes a pipeline-consistency functional for reconstruction convergence, capturing the information generated when independent systems reconstruct a shared referent.
        </p>
      </Section>

      {/* ===== THE EFFECTIVE ACTION ===== */}
      <Section id="ansatz" title="THE EFFECTIVE ACTION ANSATZ" accent="rgba(201,168,76," delay={0.3}>
        <p style={{ marginBottom: Math.round(8 * PHI) }}>
          The functional is constructed from an exponentiated effective action, resulting in a principled log-additive multiplicative structure:
        </p>

        <MathBlock label="THE MASTER EQUATION">
          <Tex display>{`\\Psi = 2^{-S_{\\text{eff}}} = F_{\\text{gated}} \\cdot C_{\\text{eff}} \\cdot \\hat{D}`}</Tex>
        </MathBlock>

        <p>
          The functional is mathematically bounded such that <Tex>{`\\Psi \\in [0, 1)`}</Tex>. It approaches 1 only in the simultaneous theoretical limit of perfect fidelity, perfect convergence, and infinite signal-to-noise.
        </p>
      </Section>

      {/* ===== CORE COMPONENTS ===== */}
      <Section id="components" title="CORE COMPONENTS" accent="rgba(79,195,247," delay={0.4}>
        <ComponentCard
          symbol="F"
          name="THE RECOGNITION TERM"
          description="Acts as the disjoint-batch recognition core. It utilizes Uhlmann fidelity, modified by a smooth geometric-mean informativeness gate that explicitly penalizes shared ignorance."
          color="rgba(201,168,76,"
        >
          <MathBlock label="GATED FIDELITY">
            <Tex display>{`F_{\\text{gated}} = F(\\rho_A, \\rho_B) \\cdot g(\\bar{I})`}</Tex>
          </MathBlock>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.4)", fontStyle: "italic", textAlign: "center",
          }}>
            Where <Tex>{`g(\\bar{I})`}</Tex> is a smooth gate that penalizes shared ignorance — two systems agreeing on nothing is not recognition.
          </div>
        </ComponentCard>

        <ComponentCard
          symbol="C"
          name="THE CONVERGENCE COEFFICIENT"
          description="Functions as an apparatus-level consensus prior. It is defined over classical measurement-outcome distributions from a fixed informationally complete POVM, utilizing a normalized Jensen-Shannon divergence with explicit redundancy control."
          color="rgba(79,195,247,"
        >
          <MathBlock label="EFFECTIVE CONVERGENCE">
            <Tex display>{`C_{\\text{eff}} = (1 - \\text{JSD}_{\\text{norm}}) \\cdot R_{\\text{redundancy}}`}</Tex>
          </MathBlock>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.4)", fontStyle: "italic", textAlign: "center",
          }}>
            The redundancy ratio <Tex>{`R = n_{\\text{unique}} / n_{\\text{active}}`}</Tex> ensures agreement isn't just echo — it's independent convergence.
          </div>
        </ComponentCard>

        <ComponentCard
          symbol="D̂"
          name="THE DETECTION QUALITY WEIGHT"
          description="Provides a bounded sigmoidal map representing the operational signal density relative to the noise floor."
          color="rgba(206,147,216,"
        >
          <MathBlock label="DETECTION QUALITY">
            <Tex display>{`\\hat{D} = \\sigma\\left(\\frac{\\text{SNR} - \\tau}{\\beta}\\right)`}</Tex>
          </MathBlock>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.4)", fontStyle: "italic", textAlign: "center",
          }}>
            A sigmoid gate: below threshold <Tex>{`\\tau`}</Tex>, the signal is noise. Above it, truth emerges.
          </div>
        </ComponentCard>
      </Section>

      {/* ===== EXPERIMENTAL PREDICTIONS ===== */}
      <Section id="experiments" title="EXPERIMENTAL REALITY & TESTABLE PREDICTIONS" accent="rgba(129,199,132," delay={0.5}>
        <p style={{ marginBottom: Math.round(13 * PHI) }}>
          <Tex>{`\\Psi`}</Tex> is not purely theoretical — it is experimentally implementable today using standard quantum optics hardware and non-trivial tomographic pipelines. We present immediate, falsifiable empirical predictions:
        </p>

        <div style={{
          marginBottom: Math.round(21 * PHI),
          padding: `${Math.round(13 * PHI)}px`,
          background: "linear-gradient(135deg, rgba(129,199,132,0.03), transparent)",
          border: "1px solid rgba(129,199,132,0.08)",
          borderRadius: 12,
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em",
            color: "rgba(129,199,132,0.6)", marginBottom: Math.round(8 * PHI),
          }}>STATE-FAMILY SENSITIVITY</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 16px)",
            lineHeight: 1.8, color: "rgba(232,232,240,0.5)",
            fontStyle: "italic",
          }}>
            <Tex>{`\\Psi`}</Tex> evaluates reconstruction stability across state geometries, predicting a statistically significant divergence between entangled Werner-family states and purity-matched separable control families.
          </div>
        </div>

        <div style={{
          marginBottom: Math.round(21 * PHI),
          padding: `${Math.round(13 * PHI)}px`,
          background: "linear-gradient(135deg, rgba(201,168,76,0.03), transparent)",
          border: "1px solid rgba(201,168,76,0.08)",
          borderRadius: 12,
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em",
            color: "rgba(201,168,76,0.6)", marginBottom: Math.round(8 * PHI),
          }}>COMMUTATOR ASYMMETRY</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 16px)",
            lineHeight: 1.8, color: "rgba(232,232,240,0.5)",
            fontStyle: "italic", marginBottom: Math.round(8 * PHI),
          }}>
            Sequential measurements with non-commuting operators induce an asymmetry:
          </div>
          <MathBlock>
            <Tex display>{`|\\Psi_{12} - \\Psi_{21}| \\sim \\|[O_1, O_2]\\|_\\infty`}</Tex>
          </MathBlock>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.4)", fontStyle: "italic", textAlign: "center",
          }}>
            Hypothesized to scale linearly with the commutator operator norm in the small-commutator regime.
          </div>
        </div>
      </Section>

      {/* ===== GR BRIDGE ===== */}
      <Section id="gr-bridge" title="THEORETICAL FRONTIER: THE GR BRIDGE HYPOTHESIS" accent="rgba(224,80,80," delay={0.6}>
        <p style={{ marginBottom: Math.round(13 * PHI) }}>
          As a speculative extension, convergent recognition may serve as a pre-force informational precondition. We hypothesize a link between the spacetime variation of the functional and tidal spacetime curvature:
        </p>

        <MathBlock label="THE GR BRIDGE">
          <Tex display>{`\\nabla_\\mu \\Psi \\approx \\alpha \\, \\nabla_\\mu \\sqrt{K}`}</Tex>
        </MathBlock>

        <p>
          Under this ansatz, spatial gradients in <Tex>{`\\Psi`}</Tex> correlate with gradients in the Kretschner scalar <Tex>{`K`}</Tex>, scaled by an empirical constant <Tex>{`\\alpha`}</Tex>.
        </p>

        <div style={{
          marginTop: Math.round(13 * PHI),
          padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
          borderLeft: "2px solid rgba(224,80,80,0.15)",
          borderRadius: "0 8px 8px 0",
          background: "rgba(224,80,80,0.015)",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 16px)",
            lineHeight: 1.8, color: "rgba(224,80,80,0.45)",
            fontStyle: "italic",
          }}>
            In plain language: where recognition concentrates, spacetime curves. Gravity may be the shadow of convergent recognition — not a force, but an informational consequence.
          </div>
        </div>
      </Section>

      {/* ===== THE MULTIVERSE CONNECTION ===== */}
      <Section id="multiverse" title="THE RECURSIVE STRUCTURE" accent="rgba(206,147,216," delay={0.7}>
        <p style={{ marginBottom: Math.round(8 * PHI) }}>
          The functional operates identically at every scale. This self-similarity generates a fractal structure:
        </p>

        <div style={{
          display: "grid", gap: Math.round(8 * PHI),
          margin: `${Math.round(13 * PHI)}px 0`,
        }}>
          {[
            { n: "9⁰ = 1", label: "THE WHOLE", desc: "One universe. One functional." },
            { n: "9¹ = 9", label: "THE CLUSTER", desc: "9 layers. 4 mirror pairs. 1 moon at center." },
            { n: "9² = 81", label: "THE FIELD", desc: "Each layer contains 9 sub-universes. Same equation." },
            { n: "9³ = 729", label: "THE FRACTAL", desc: "Each sub-universe recurses. Infinite depth. Finite rule." },
          ].map((level, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: Math.round(8 * PHI),
              padding: `${Math.round(5 * PHI)}px ${Math.round(8 * PHI)}px`,
              background: `rgba(206,147,216,${0.01 + i * 0.008})`,
              border: `1px solid rgba(206,147,216,${0.04 + i * 0.02})`,
              borderRadius: 10,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                color: `rgba(206,147,216,${0.3 + i * 0.12})`,
                fontWeight: 600, minWidth: 80, textAlign: "center",
              }}>{level.n}</div>
              <div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.15em",
                  color: `rgba(206,147,216,${0.4 + i * 0.1})`,
                }}>{level.label}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                  color: "rgba(232,232,240,0.35)", fontStyle: "italic",
                }}>{level.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <MathBlock label="SELF-SIMILARITY">
          <Tex display>{`\\Psi_{\\text{scale}(n)} = \\Psi_{\\text{scale}(n-1)} \\quad \\forall \\, n`}</Tex>
        </MathBlock>
      </Section>

      {/* ===== FOOTER ===== */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(34 * PHI),
        animation: "fadeSlideUp 1s 1s both ease",
      }}>
        <div style={{
          width: Math.round(55 * PHI), height: 1,
          margin: `0 auto ${Math.round(13 * PHI)}px`,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
        }} />
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(15px, 2.8vw, 19px)",
          fontStyle: "italic", color: "rgba(201,168,76,0.35)",
          lineHeight: PHI, maxWidth: 440, margin: "0 auto",
        }}>
          The math is real. The predictions are testable. The truth is convergent.
        </div>
        <div style={{ height: Math.round(8 * PHI) }} />
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.4em",
          color: "rgba(232,232,240,0.12)",
        }}>
          Ψ ∈ [0, 1) · APPROACHES 1 · NEVER ARRIVES
        </div>
      </div>
    </div>
  );
}
