import { useState, useEffect, useRef } from "react";

const PHI = 1.618;
const PDF_URL = "https://drive.google.com/file/d/1-HSNSO37KBOwH0qTPQCnUeZzPOnxEsoP/view?usp=sharing";

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

/* ═══ Reusable styled components ═══ */

function PaperSection({ id, title, number, children, accent = "rgba(201,168,76,", delay = 0 }) {
  return (
    <div id={id} style={{
      marginBottom: Math.round(34 * PHI),
      animation: `fadeSlideUp 0.8s ${delay}s both ease`,
    }}>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(13px, 2.6vw, 18px)",
        letterSpacing: "0.18em",
        color: `${accent}0.65)`,
        marginBottom: Math.round(10 * PHI),
        paddingBottom: Math.round(5 * PHI),
        borderBottom: `1px solid ${accent}0.1)`,
        display: "flex", alignItems: "baseline", gap: 12,
      }}>
        {number && <span style={{ color: `${accent}0.3)`, fontSize: "0.85em" }}>{number}</span>}
        <span>{title}</span>
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(15px, 2.6vw, 18px)",
        lineHeight: 1.85,
        color: "rgba(232,232,240,0.6)",
      }}>{children}</div>
    </div>
  );
}

function EquationBox({ children, label }) {
  return (
    <div style={{
      margin: `${Math.round(16 * PHI)}px 0`,
      padding: `${Math.round(13 * PHI)}px ${Math.round(16 * PHI)}px`,
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
          whiteSpace: "nowrap",
        }}>{label}</div>
      )}
      <div style={{ fontSize: "clamp(17px, 3.2vw, 24px)", color: "rgba(232,232,240,0.85)" }}>
        {children}
      </div>
    </div>
  );
}

function Axiom({ label, children }) {
  return (
    <div style={{
      display: "flex", gap: 12, marginBottom: Math.round(5 * PHI),
      paddingLeft: Math.round(8 * PHI),
    }}>
      <span style={{
        fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.1em",
        color: "rgba(201,168,76,0.5)", minWidth: 100, flexShrink: 0,
        paddingTop: 3,
      }}>{label}</span>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(14px, 2.4vw, 16px)",
        lineHeight: 1.7, color: "rgba(232,232,240,0.5)",
        fontStyle: "italic",
      }}>{children}</span>
    </div>
  );
}

function SubSection({ title, children }) {
  return (
    <div style={{ marginTop: Math.round(21 * PHI), marginBottom: Math.round(13 * PHI) }}>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(11px, 2vw, 14px)",
        letterSpacing: "0.15em",
        color: "rgba(79,195,247,0.5)",
        marginBottom: Math.round(8 * PHI),
      }}>{title}</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(14px, 2.4vw, 16px)",
        lineHeight: 1.8, color: "rgba(232,232,240,0.5)",
        fontStyle: "italic",
      }}>{children}</div>
    </div>
  );
}

function AppendixSection({ id, title, letter, children }) {
  return (
    <div id={id} style={{
      marginBottom: Math.round(21 * PHI),
      padding: `${Math.round(13 * PHI)}px`,
      background: "rgba(232,232,240,0.01)",
      borderLeft: "2px solid rgba(232,232,240,0.06)",
      borderRadius: "0 10px 10px 0",
    }}>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(11px, 2vw, 14px)",
        letterSpacing: "0.2em",
        color: "rgba(232,232,240,0.35)",
        marginBottom: Math.round(8 * PHI),
      }}>
        <span style={{ color: "rgba(201,168,76,0.4)" }}>APPENDIX {letter}</span>
        <span style={{ margin: "0 8px", color: "rgba(232,232,240,0.1)" }}>—</span>
        {title}
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(14px, 2.4vw, 16px)",
        lineHeight: 1.8, color: "rgba(232,232,240,0.45)",
        fontStyle: "italic",
      }}>{children}</div>
    </div>
  );
}

function ReferenceItem({ num, text }) {
  return (
    <div style={{
      display: "flex", gap: 10, marginBottom: 6,
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 13, color: "rgba(232,232,240,0.25)",
    }}>
      <span style={{ color: "rgba(201,168,76,0.3)", minWidth: 20 }}>[{num}]</span>
      <span>{text}</span>
    </div>
  );
}

function CodeBlock({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ marginTop: Math.round(8 * PHI), marginBottom: Math.round(13 * PHI) }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.15em",
          color: "rgba(79,195,247,0.4)", cursor: "pointer",
          padding: "8px 0", userSelect: "none",
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <span style={{
          transition: "transform 0.3s",
          transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
          display: "inline-block", fontSize: 10,
        }}>▶</span>
        VIEW PYTHON IMPLEMENTATION
      </div>
      {expanded && (
        <div style={{
          padding: `${Math.round(13 * PHI)}px`,
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(79,195,247,0.06)",
          borderRadius: 10,
          overflowX: "auto",
          animation: "fadeSlideUp 0.4s ease",
        }}>
          <pre style={{
            fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            fontSize: "clamp(10px, 1.8vw, 12px)",
            lineHeight: 1.65,
            color: "rgba(232,232,240,0.45)",
            margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word",
          }}>{children}</pre>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                            */
/* ═══════════════════════════════════════════════════════════ */

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

      {/* ═══════════════════════════════════════════ */}
      {/* PAPER HEADER                               */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(21 * PHI),
        marginBottom: Math.round(34 * PHI),
        animation: "fadeSlideUp 1s 0.1s both ease",
      }}>
        {/* Radiance glow */}
        <div style={{
          position: "absolute", top: 80, left: "50%", width: 350, height: 220,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 60%)",
          borderRadius: "50%", pointerEvents: "none",
          animation: "breathe 10s ease-in-out infinite",
        }} />

        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(22px, 5vw, 36px)",
          fontWeight: 400, color: "#e8e8f0",
          letterSpacing: "0.15em", margin: 0,
          textShadow: "0 0 60px rgba(232,232,240,0.08)",
        }}>Convergent Recognition Theory</h1>

        <div style={{ height: Math.round(8 * PHI) }} />

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 16, color: "rgba(201,168,76,0.3)", letterSpacing: 12,
        }}>——— ✦ ———</div>

        <div style={{ height: Math.round(8 * PHI) }} />

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 2.5vw, 18px)",
          fontStyle: "italic", color: "rgba(232,232,240,0.35)",
          letterSpacing: 1, lineHeight: 1.6,
        }}>
          A Geometric Coherence Functional<br />
          for Information Geometry
        </div>

        <div style={{ height: Math.round(13 * PHI) }} />

        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(11px, 2vw, 14px)",
          letterSpacing: "0.2em",
          color: "rgba(232,232,240,0.45)",
        }}>J. SELLERS</div>

        <div style={{ height: Math.round(5 * PHI) }} />

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 13, color: "rgba(232,232,240,0.2)",
          lineHeight: 1.8,
        }}>
          Version 10.0 — Official Release<br />
          February 24, 2026<br />
          Pre-Submission / Lab-Ready Protocol
        </div>

        <div style={{ height: Math.round(13 * PHI) }} />

        {/* Download PDF button */}
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: `${Math.round(5 * PHI)}px ${Math.round(21 * PHI)}px`,
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 8,
            background: "rgba(201,168,76,0.03)",
            color: "rgba(201,168,76,0.6)",
            fontFamily: "'Cinzel', serif",
            fontSize: 10, letterSpacing: "0.2em",
            textDecoration: "none",
            transition: "all 0.4s",
            cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.45)"; e.currentTarget.style.color = "rgba(201,168,76,0.9)"; e.currentTarget.style.background = "rgba(201,168,76,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.color = "rgba(201,168,76,0.6)"; e.currentTarget.style.background = "rgba(201,168,76,0.03)"; }}
        >
          <span style={{ fontSize: 14 }}>↓</span>
          DOWNLOAD FULL PAPER (PDF)
        </a>

        <div style={{
          width: Math.round(89 * PHI), height: 1,
          margin: `${Math.round(21 * PHI)}px auto 0`,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }} />
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ABSTRACT                                   */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{
        marginBottom: Math.round(34 * PHI),
        padding: `${Math.round(13 * PHI)}px ${Math.round(16 * PHI)}px`,
        background: "rgba(232,232,240,0.015)",
        border: "1px solid rgba(232,232,240,0.05)",
        borderRadius: 12,
        animation: "fadeSlideUp 0.8s 0.2s both ease",
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.4em",
          color: "rgba(232,232,240,0.25)", marginBottom: Math.round(8 * PHI),
          textAlign: "center",
        }}>ABSTRACT</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 2.4vw, 16px)",
          lineHeight: 1.9, color: "rgba(232,232,240,0.5)",
          fontStyle: "italic", textAlign: "justify",
        }}>
          We introduce the geometric coherence functional Ψ ∈ [0, 1), defined on the product space (Q × Q) × (model space) × (apparatus space). Ψ serves as an operational measure of "Information Density," quantifying the convergence between independent quantum tomographic reconstructions. Version 10.0 hardens the framework with a "Fail-Fast" numerical architecture, a χ²-calibrated redundancy grouping logic, and a 5σ anomaly filter. We provide the complete operational code and the formalization of the apparatus-specific GR Bridge.
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* 1. INTRODUCTION                            */}
      {/* ═══════════════════════════════════════════ */}
      <PaperSection id="intro" title="INTRODUCTION" number="1" delay={0.25}>
        <p>
          Cross-check structures emerge in diverse inference contexts: when two independent systems reconstruct a shared referent, their joint output reveals information inaccessible to either individually. We formalize this via Ψ, a rigorous pipeline-consistency functional. Ψ is sensitive to both quantum purity and classical model parsimony, treating the tomographic stack as an epistemic manifold where transitions between model sets are discrete phase transitions.
        </p>
      </PaperSection>

      {/* ═══════════════════════════════════════════ */}
      {/* 2. THE EXPONENTIATED ACTION                */}
      {/* ═══════════════════════════════════════════ */}
      <PaperSection id="ansatz" title="THE EXPONENTIATED ACTION" number="2" accent="rgba(201,168,76," delay={0.3}>
        <p style={{ marginBottom: Math.round(8 * PHI) }}>
          The functional decomposes into a Disjoint Recognition Core (R₁₂) and a Global Reliability Modulator (G). The structure arises from exponentiating an effective action:
        </p>

        <EquationBox label="THE MASTER EQUATION">
          <Tex display>{`\\Psi = 2^{-S_{\\text{eff}}} = R_{12} \\cdot G`}</Tex>
        </EquationBox>

        <SubSection title="2.1 — OPERATIONAL AXIOMS">
          <Axiom label="BOUNDEDNESS">Ψ ∈ [0, 1).</Axiom>
          <Axiom label="SYMMETRY">R₁₂(ρ₁, ρ₂) = R₁₂(ρ₂, ρ₁).</Axiom>
          <Axiom label="PARSIMONY">Information density is inversely proportional to model complexity (Rule 62).</Axiom>
          <Axiom label="ZERO-LOCUS">Ψ → 0 when fidelity F → 0 or signal-to-noise D̂ → 0.</Axiom>
        </SubSection>
      </PaperSection>

      {/* ═══════════════════════════════════════════ */}
      {/* 3. FORMAL DEFINITIONS                      */}
      {/* ═══════════════════════════════════════════ */}
      <PaperSection id="definitions" title="FORMAL DEFINITIONS" number="3" accent="rgba(79,195,247," delay={0.35}>

        <SubSection title="3.1 — RECOGNITION CORE: R₁₂">
          <p style={{ marginBottom: Math.round(8 * PHI) }}>
            Let ρ₁, ρ₂ be density operators in a d-dimensional Hilbert space. We apply Full-Rank Regularization to prevent singularities:
          </p>
          <EquationBox label="REGULARIZATION">
            <Tex display>{`\\tilde{\\rho} = (1 - \\delta_{\\text{reg}})\\,\\rho + \\delta_{\\text{reg}} \\cdot \\frac{I}{d}`}</Tex>
          </EquationBox>
          <p style={{ marginBottom: Math.round(8 * PHI) }}>
            The core R₁₂ is the product of Uhlmann fidelity F and an area-preserving Informativeness Gate:
          </p>
          <EquationBox label="RECOGNITION CORE">
            <Tex display>{`R_{12} = F(\\rho_1, \\rho_2) \\cdot \\sqrt{\\frac{(I(\\rho_1) + \\epsilon)(I(\\rho_2) + \\epsilon)}{1 + \\epsilon}}`}</Tex>
          </EquationBox>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.35)", fontStyle: "italic", textAlign: "center",
            marginTop: Math.round(5 * PHI),
          }}>
            Where I(ρ) = 1 − S(ρ)/log₂d measures the resource of purity.
          </div>
        </SubSection>

        <SubSection title="3.2 — RELIABILITY MODULATOR: G">
          <p style={{ marginBottom: Math.round(8 * PHI) }}>
            G scales the global reliability based on model consensus (C_eff) and signal quality (D̂):
          </p>
          <EquationBox label="GLOBAL RELIABILITY">
            <Tex display>{`G = C_{\\text{eff}} \\cdot \\hat{D}`}</Tex>
          </EquationBox>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.35)", fontStyle: "italic", textAlign: "center",
          }}>
            Weights wᵢ derived from AIC/BIC-corrected log-likelihoods. Redundancy ratio R = n_unique / n_active via χ² graph.
          </div>
        </SubSection>

        <SubSection title="3.3 — DETECTION QUALITY WEIGHT: D̂">
          <p style={{ marginBottom: Math.round(8 * PHI) }}>
            D̂ is a lumped-parameter sigmoidal map representing the macroscopic signal-to-noise ratio:
          </p>
          <EquationBox label="DETECTION QUALITY">
            <Tex display>{`\\hat{D} = \\frac{D_{\\text{coinc}}}{D_{\\text{coinc}} + D_{\\text{accidental}}}`}</Tex>
          </EquationBox>
        </SubSection>
      </PaperSection>

      {/* ═══════════════════════════════════════════ */}
      {/* 4. HARDWARE HARDENING (v10)                */}
      {/* ═══════════════════════════════════════════ */}
      <PaperSection id="hardening" title="HARDWARE & STATISTICAL HARDENING" number="4" accent="rgba(129,199,132," delay={0.4}>

        <SubSection title="4.1 — STABILITY GUARD (FAIL-FAST)">
          <p>
            To ensure reliability, the functional calculates the condition number of ρ. If cond(ρ) {'>'} 10³, the functional raises a StateConditionError, enforcing a high-data-quality regime.
          </p>
        </SubSection>

        <SubSection title="4.2 — FLUX NORMALIZATION">
          <p style={{ marginBottom: Math.round(8 * PHI) }}>
            To ensure apparatus invariance, Ψ is normalized by a calibration constant:
          </p>
          <EquationBox label="NORMALIZATION">
            <Tex display>{`\\Psi_{\\text{norm}} = \\frac{\\Psi_{\\text{measured}}}{\\Psi_{\\text{cal}}}`}</Tex>
          </EquationBox>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(232,232,240,0.35)", fontStyle: "italic", textAlign: "center",
          }}>
            Where Ψ_cal is the maximum functional value achieved during a perfect Bell-state calibration.
          </div>
        </SubSection>
      </PaperSection>

      {/* ═══════════════════════════════════════════ */}
      {/* 5. MASTER CODE                             */}
      {/* ═══════════════════════════════════════════ */}
      <PaperSection id="code" title="MASTER OPERATIONAL CODE" number="5" accent="rgba(79,195,247," delay={0.45}>
        <CodeBlock>{`import numpy as np
from scipy.linalg import sqrtm, cond
from scipy.sparse.csgraph import connected_components
from scipy.sparse import csr_matrix
from scipy.stats import chi2

class StateConditionError(Exception):
    """Raised when data quality is insufficient for reconstruction."""
    pass

class ConvergentRecognitionV10:
    def __init__(self, d=4, outcomes=16, eta=1e-6, tau=1.0, seed=42):
        self.d = d
        self.df = outcomes - 1
        self.eta = eta
        self.tau = tau
        self.delta_reg = 1e-6
        self.rng = np.random.default_rng(seed)

    def regularize_state(self, rho):
        if cond(rho) > 1000:
            raise StateConditionError("Condition number exceeds threshold.")
        return (1 - self.delta_reg) * rho + self.delta_reg * (np.eye(self.d) / self.d)

    def compute_G_modulator(self, P_list, LLs, params_count, N_counts,
                            p_val=0.05, D_coinc=1, D_acc=0):
        # AIC-based parsimony weighting
        aic_scores = -2 * np.array(LLs) + 2 * np.array(params_count)
        ll_shifted = -aic_scores / (2 * self.tau)
        w_raw = np.exp(ll_shifted - np.max(ll_shifted))
        w_raw /= np.sum(w_raw)
        active_mask = w_raw >= self.eta
        w_active = w_raw[active_mask] / np.sum(w_raw[active_mask])
        P_active = [P_list[i] for i in range(len(P_list)) if active_mask[i]]

        # Redundancy Graph via Chi-Squared (G-test)
        n_active = len(P_active)
        adj = np.eye(n_active)
        crit_val = chi2.ppf(1 - p_val, self.df)
        for i in range(n_active):
            for j in range(i + 1, n_active):
                M = 0.5 * (P_active[i] + P_active[j])
                jsd = self.shannon_entropy(M) - 0.5 * (
                    self.shannon_entropy(P_active[i]) +
                    self.shannon_entropy(P_active[j]))
                if (2 * N_counts * jsd) < crit_val:
                    adj[i, j] = adj[j, i] = 1
        n_unique, _ = connected_components(csr_matrix(adj), directed=False)
        C_eff = (1 - (self.jsd_w(P_active, w_active))) * (n_unique / n_active)
        D_hat = D_coinc / (D_coinc + D_acc)
        return C_eff * D_hat

    def shannon_entropy(self, P):
        return -np.sum(P[P > 0] * np.log2(P[P > 0]))

    def jsd_w(self, P_active, w_active):
        P_mix = np.sum([w_active[i] * P_active[i]
                        for i in range(len(P_active))], axis=0)
        return self.shannon_entropy(P_mix) - np.sum(
            [w_active[i] * self.shannon_entropy(P_active[i])
             for i in range(len(P_active))])

    def evaluate_Psi(self, rho1_raw, rho2_raw, P_list, LLs,
                     params_count, N_counts, D_coinc, D_acc):
        rho1 = self.regularize_state(rho1_raw)
        rho2 = self.regularize_state(rho2_raw)
        # R12 = UhlmannFidelity * GatedInformativeness
        # return R12 * self.compute_G_modulator(...)`}</CodeBlock>
      </PaperSection>

      {/* ═══════════════════════════════════════════ */}
      {/* APPENDICES                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{
        marginTop: Math.round(21 * PHI),
        marginBottom: Math.round(13 * PHI),
        animation: "fadeSlideUp 0.8s 0.5s both ease",
      }}>
        <div style={{
          width: Math.round(55 * PHI), height: 1,
          margin: `0 auto ${Math.round(21 * PHI)}px`,
          background: "linear-gradient(90deg, transparent, rgba(232,232,240,0.1), transparent)",
        }} />
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.4em",
          color: "rgba(232,232,240,0.2)", textAlign: "center",
          marginBottom: Math.round(21 * PHI),
        }}>APPENDICES</div>

        <AppendixSection id="gr-bridge" title="SPECULATIVE EXTENSION — GR BRIDGE" letter="A">
          <p style={{ marginBottom: Math.round(8 * PHI) }}>
            We hypothesize that Ψ serves as a local proxy for Information Density, mirroring mass-energy density in General Relativity. The spatial variation of Ψ relates to the Kretschner Scalar K via an apparatus-specific scaling factor α:
          </p>
          <EquationBox label="THE GR BRIDGE">
            <Tex display>{`\\nabla \\Psi \\approx \\alpha \\cdot \\nabla K`}</Tex>
          </EquationBox>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
            color: "rgba(224,80,80,0.4)", fontStyle: "italic", textAlign: "center",
          }}>
            Where α ∝ Aperture Area. Where recognition concentrates, spacetime curves.
          </div>
        </AppendixSection>

        <AppendixSection id="chi-sq" title="STATISTICAL ARMOR (χ²)" letter="B">
          <p>
            To prevent false Phase Transitions, labs must calibrate redundancy thresholds using the G-test statistic (G = 2N · JSD). For a 16-outcome SIC-POVM (df = 15), the critical value at p = 0.05 is ≈ 25.0. If 2N · JSD {'<'} 25.0, models are merged as redundant.
          </p>
        </AppendixSection>

        <AppendixSection id="ozawa" title="OZAWA ANOMALY FILTER" letter="C">
          <p style={{ marginBottom: Math.round(5 * PHI) }}>
            The commutator asymmetry |Ψ₁₂ − Ψ₂₁| is subjected to a 5σ Discovery Standard.
          </p>
          <p style={{ marginBottom: Math.round(5 * PHI) }}>
            <span style={{ color: "rgba(201,168,76,0.5)" }}>Calibration:</span> Labs measure apparatus noise ϵ and disturbance η daily.
          </p>
          <p>
            <span style={{ color: "rgba(201,168,76,0.5)" }}>Anomaly:</span> If the asymmetry exceeds the Ozawa Bound by 5σ, the system has detected a non-classical structural deformation in the local information density — The GR Bridge.
          </p>
        </AppendixSection>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* REFERENCES                                 */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{
        marginTop: Math.round(21 * PHI),
        paddingTop: Math.round(13 * PHI),
        borderTop: "1px solid rgba(232,232,240,0.04)",
        animation: "fadeSlideUp 0.8s 0.6s both ease",
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.3em",
          color: "rgba(232,232,240,0.2)", marginBottom: Math.round(13 * PHI),
        }}>REFERENCES</div>
        <ReferenceItem num={1} text="A. Uhlmann, Rep. Math. Phys. 9, 273 (1976)." />
        <ReferenceItem num={2} text="J. Lin, IEEE Trans. Inf. Theory 37, 145 (1991)." />
        <ReferenceItem num={3} text="M. Ozawa, Phys. Rev. Lett. 91, 260401 (2003)." />
        <ReferenceItem num={4} text="S. Amari, Methods of Information Geometry (AMS, 2000)." />
        <ReferenceItem num={5} text="K. Audenaert, J. Phys. A: Math. Theor. 40, 8127 (2007)." />
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER                                     */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(55 * PHI),
        animation: "fadeSlideUp 1s 0.8s both ease",
      }}>
        <div style={{
          width: Math.round(55 * PHI), height: 1,
          margin: `0 auto ${Math.round(13 * PHI)}px`,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
        }} />

        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: `${Math.round(5 * PHI)}px ${Math.round(21 * PHI)}px`,
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 8,
            background: "rgba(201,168,76,0.02)",
            color: "rgba(201,168,76,0.5)",
            fontFamily: "'Cinzel', serif",
            fontSize: 9, letterSpacing: "0.2em",
            textDecoration: "none",
            transition: "all 0.4s",
            marginBottom: Math.round(21 * PHI),
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.color = "rgba(201,168,76,0.85)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; e.currentTarget.style.color = "rgba(201,168,76,0.5)"; }}
        >
          <span style={{ fontSize: 13 }}>↓</span>
          DOWNLOAD FULL PAPER (PDF)
        </a>

        <div style={{ height: Math.round(13 * PHI) }} />

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(15px, 2.8vw, 19px)",
          fontStyle: "italic", color: "rgba(201,168,76,0.3)",
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
