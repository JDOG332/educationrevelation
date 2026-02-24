import { useState, useEffect, useRef, useCallback } from "react";
import MultiverseFractal from "./MultiverseFractal.jsx";
import MathPage from "./MathPage.jsx";
import {
  PHI, PHI_INV, PHI2, PHI3,
  LAYERS, CORES, SENSES, MIRRORS, BURIED,
  PROOFS_IN_THE_WORLD, WORD_MIRRORS, THREE_PILLARS,
  CONVERGENCE_DEPTHS, DEPTH_NAMES, DEPTH_ATMOSPHERES,
  TRANSLATIONS, ETYMOLOGIES, POEMS,
  THE_ANSWER, THE_BEFORE, THE_CONSTANTS, SAMENESS_TRUTH,
} from "./data.js";
import {
  GrainOverlay, DepthIndicator, Particle, PulseRing, SenseIcon,
  GlassCard, DeeperButton, ReturnButton, LayerCard,
  StringVibration, TheEquation, MiracleGlow,
} from "./components/ui.jsx";
import { SacredDiamond, SacredTriquetra } from "./components/sacred.jsx";
import { OctahedronPact, OCTANT_COLORS } from "./components/canvas.jsx";
import { Multiverse } from "./components/multiverse.jsx";

/* ========== MAIN ========== */

export default function TheoryOfEverything() {
  const [currentPage, setCurrentPage] = useState("theory"); // "theory" | "multiverse" | "math"
  const [depth, setDepth] = useState(0);
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeSense, setActiveSense] = useState(null);
  const [activePair, setActivePair] = useState(null);
  const [activeMirrorSense, setActiveMirrorSense] = useState(null);
  const [activeMirrorProof, setActiveMirrorProof] = useState(false);
  const [activeProof, setActiveProof] = useState(false);
  const [activeConvergence, setActiveConvergence] = useState(null); // 'plain' | 'gravity' | 'pillars' | 'sameness' | 'depths' | 'ancient' | null
  const [activeIdea, setActiveIdea] = useState(null); // idea key inside a witness room
  const [activePillar, setActivePillar] = useState(null);
  const [activeSamenessProof, setActiveSamenessProof] = useState(null);
  const [activeAnswer, setActiveAnswer] = useState(false);
  const [activeAnswerProof, setActiveAnswerProof] = useState(null);
  const [activeBefore, setActiveBefore] = useState(false);
  const [activeBeforeProof, setActiveBeforeProof] = useState(null);
  const [activeConstants, setActiveConstants] = useState(false);
  const [activeConstantsProof, setActiveConstantsProof] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [fading, setFading] = useState(false);
  const [poemPhase, setPoemPhase] = useState(0); // 0=not on poem, 1=whiteout, 2=first exhale, 3=inhale/cluster, 4=exhale/all, 5=settle/poem
  const [landingPhase, setLandingPhase] = useState(0); // 0=first, 1=second, 2=prism
  const startDark = useRef(Math.random() < 0.5); // coin flip: dark first or light first
  const poemSeen = useRef(false);

  // Poem zoom-out sequence — timed to meditative breath (~4s per phase)
  // Skip the sequence if the user has already seen it this session
  useEffect(() => {
    if (depth === 2) {
      if (poemSeen.current) {
        // Already seen — skip straight to the poem
        setPoemPhase(5);
        return;
      }
      setPoemPhase(1);
      const t2 = setTimeout(() => setPoemPhase(2), 800);      // hold white, then first exhale begins
      const t3 = setTimeout(() => setPoemPhase(3), 4800);     // one breath — see the cluster
      const t4 = setTimeout(() => setPoemPhase(4), 9200);     // two breaths — all balls pulling away
      const t5 = setTimeout(() => { setPoemPhase(5); poemSeen.current = true; }, 14000);  // three breaths — settle, mark as seen
      return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else {
      setPoemPhase(0);
    }
  }, [depth]);

  const goDeeper = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => Math.min(d + 1, 5));
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, []);

  const goBack = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => {
        const newD = Math.max(d - 1, 0);
        if (newD === 0) setLandingPhase(2); // return to prism, not black
        return newD;
      });
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, []);

  const returnToVoid = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(0); setLandingPhase(0); setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, []);

  const openLayer = (i) => {
    setActiveLayer(i);
    setActiveSense(null);
    setActiveProof(false);
  };

  const navigateToDepth = useCallback((targetDepth) => {
    if (targetDepth === depth) return;
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(targetDepth);
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, [depth]);

  const layer = activeLayer !== null ? LAYERS[activeLayer] : null;
  const senseKeys = ["see", "hear", "feel", "smell", "taste"];

  return (
    <div style={{
      minHeight: "100vh",
      background: DEPTH_ATMOSPHERES[depth] || DEPTH_ATMOSPHERES[0],
      color: "#d4d4d8",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      position: "relative", overflow: "hidden",
      transition: "background 1.8s cubic-bezier(0.23,1,0.32,1)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

        * { box-sizing: border-box; }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          8% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100vh) scale(0.2); opacity: 0; }
        }
        @keyframes pulseExpand {
          0% { transform: translate(-50%,-50%) scale(0.3); opacity: 0.3; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes diamondPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          1% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.03); }
          49% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          99% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.03); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes breathe {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }
        @keyframes textBlink {
          0%, 18% { opacity: 1; }
          20%, 24% { opacity: 0; }
          26%, 100% { opacity: 1; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes doorReveal {
          0% { opacity: 0; transform: translateX(-50%) scale(0.97); filter: blur(6px); }
          40% { opacity: 0.3; transform: translateX(-50%) scale(0.99); filter: blur(3px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); filter: blur(0px); }
        }
        @keyframes shimmerLine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes vignettePulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
        @keyframes auroraShift {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.1); }
          100% { transform: rotate(-2deg) scale(1.05); }
        }
        @keyframes letterBreathe {
          0%, 100% { letter-spacing: 8px; opacity: 0.2; }
          50% { letter-spacing: 12px; opacity: 0.3; }
        }
        @keyframes moonRadiate {
          0%, 100% { box-shadow: 0 0 40px rgba(232,232,240,0.08), 0 0 80px rgba(232,232,240,0.03); }
          50% { box-shadow: 0 0 60px rgba(232,232,240,0.15), 0 0 120px rgba(232,232,240,0.05), 0 0 200px rgba(201,168,76,0.02); }
        }
        @keyframes senseReveal {
          from { opacity: 0; transform: translateY(12px) scale(0.97); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes equationPulse {
          0%, 100% { box-shadow: 0 8px 30px rgba(201,168,76,0.06), 0 0 60px rgba(201,168,76,0.02), inset 0 1px 0 rgba(255,255,255,0.05); border-color: rgba(201,168,76,0.12); }
          50% { box-shadow: 0 12px 50px rgba(201,168,76,0.1), 0 0 100px rgba(201,168,76,0.04), 0 0 160px rgba(201,168,76,0.015), inset 0 1px 0 rgba(255,255,255,0.08); border-color: rgba(201,168,76,0.18); }
        }
        @keyframes miracleBloom {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          33% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
          66% { opacity: 0.75; transform: translate(-50%, -50%) scale(0.95); }
        }
        @keyframes sacredReveal {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(8px); }
          60% { opacity: 0.8; filter: blur(1px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes glowRadiate {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.08)); }
          50% { filter: drop-shadow(0 0 20px rgba(201,168,76,0.18)) drop-shadow(0 0 40px rgba(201,168,76,0.06)); }
        }
        @keyframes textLuminance {
          0%, 100% { text-shadow: 0 0 20px rgba(201,168,76,0.06); }
          50% { text-shadow: 0 0 40px rgba(201,168,76,0.12), 0 0 80px rgba(201,168,76,0.04); }
        }
        @keyframes formulaOrbitSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes formulaCounterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes diamondCounterSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        .gold-line {
          height: 1px; margin: 12px 0;
          background: linear-gradient(90deg, transparent 2%, rgba(201,168,76,0.15) 15%, rgba(201,168,76,0.45) 50%, rgba(201,168,76,0.15) 85%, transparent 98%);
          box-shadow: 0 0 24px rgba(201,168,76,0.1), 0 0 4px rgba(201,168,76,0.2), 0 0 48px rgba(201,168,76,0.03);
          animation: breathe 6s ease-in-out infinite;
          position: relative;
        }
        .gold-line::after {
          content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.03) 30%, rgba(201,168,76,0.06) 50%, rgba(201,168,76,0.03) 70%, transparent 95%);
          filter: blur(2px);
        }

        .shimmer-gold {
          background: linear-gradient(90deg, rgba(201,168,76,0.35) 0%, rgba(232,232,240,0.8) 25%, rgba(255,245,220,0.95) 50%, rgba(232,232,240,0.8) 75%, rgba(201,168,76,0.35) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerLine 6s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(201,168,76,0.1)) drop-shadow(0 0 30px rgba(201,168,76,0.04));
        }

        .sense-btn {
          cursor: pointer; transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          padding: 7px 16px; border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02); font-size: 13px;
          backdrop-filter: blur(10px);
          position: relative; overflow: hidden;
        }
        .sense-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .sense-btn:active {
          transform: translateY(0) scale(0.98);
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.08); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.15); }

        @media (max-width: 480px) {
          .gold-line { margin: 8px 0 !important; }
        }
      `}</style>



      {/* ===== MULTIVERSE PAGE ===== */}
      {currentPage === "multiverse" && (
        <div style={{
          width: "100%", height: "calc(100vh - 44px)",
          position: "relative",
        }}>
          <GrainOverlay />
          {/* Vignette */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none", zIndex: 1,
          }} />
          {/* Title overlay */}
          <div style={{
            position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
            textAlign: "center", zIndex: 10, pointerEvents: "none",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.25)",
            }}>THE RECURSIVE</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(24px, 4.5vw, 31px)",
              fontWeight: 400, color: "rgba(232,232,240,0.6)",
              letterSpacing: "0.25em", margin: "4px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.06)",
            }}>MULTIVERSE</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.65)",
            }}>9 × 9 × 9 = 729 universes · Same equation · Every scale</div>
          </div>
          <MultiverseFractal style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }} />
          {/* Bottom navigation */}
          <div style={{
            position: "absolute", bottom: 24, left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: 20,
            zIndex: 10,
          }}>
            <button onClick={() => { setCurrentPage("theory"); setDepth(0); window.scrollTo({ top: 0, behavior: "instant" }); }}
              style={{
                cursor: "pointer", background: "none", border: "none",
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.3em",
                color: "rgba(232,232,240,0.6)", transition: "color 0.4s",
                padding: "8px 16px",
              }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.7)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.6)"}
            >🔁 RETURN TO THE VOID</button>
            <button onClick={() => { setCurrentPage("math"); window.scrollTo({ top: 0, behavior: "instant" }); }}
              style={{
                cursor: "pointer", background: "none",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 24,
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.3em",
                color: "rgba(201,168,76,0.45)", transition: "all 0.4s",
                padding: "8px 20px",
              }}
              onMouseEnter={e => { e.target.style.color = "rgba(201,168,76,0.7)"; e.target.style.borderColor = "rgba(201,168,76,0.3)"; }}
              onMouseLeave={e => { e.target.style.color = "rgba(201,168,76,0.45)"; e.target.style.borderColor = "rgba(201,168,76,0.15)"; }}
            >Ψ THE MATH →</button>
          </div>
        </div>
      )}

      {/* ===== MATH PAGE ===== */}
      {currentPage === "math" && (
        <>
          <GrainOverlay />
          {/* Vignette */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none", zIndex: 1,
          }} />
          {/* Particles */}
          {Array.from({ length: 16 }, (_, i) => (
            <Particle key={i} delay={i * 1.5 + Math.random() * 2}
              size={Math.random() * 2 + 0.5}
              x={Math.random() * 100}
              speed={20 + Math.random() * 25} />
          ))}
          <MathPage onReturn={() => { setCurrentPage("theory"); setDepth(0); window.scrollTo({ top: 0, behavior: "instant" }); }} />
        </>
      )}

      {/* ===== THEORY PAGE (original content) ===== */}
      {currentPage === "theory" && (<>

      {/* ===== GLOBAL LEFT/RIGHT NAVIGATION ===== */}
      {/* Left half = go back. Right half = go forward. */}
      {/* Active on all depths except 0 (landing), 4 (convergence has door nav), and 5 (∞ has loop-back) */}
      {depth >= 1 && depth !== 4 && depth !== 5 && (
        <>
          <div
            onClick={(e) => { e.stopPropagation(); goBack(); }}
            style={{
              position: "fixed", top: 0, left: 0,
              width: "50%", height: "88%",
              zIndex: 9000, cursor: "pointer",
              background: "transparent",
            }}
          />
          <div
            onClick={(e) => { e.stopPropagation(); goDeeper(); }}
            style={{
              position: "fixed", top: 0, right: 0,
              width: "50%", height: "88%",
              zIndex: 9000, cursor: "pointer",
              background: "transparent",
            }}
          />
        </>
      )}

      {/* ===== GLOBAL RETURN TO VOID BUTTON ===== */}
      {/* Root-level so it escapes all stacking contexts */}
      {depth >= 1 && depth <= 3 && (poemPhase >= 5 || depth !== 2) && (
        <div style={{
          position: "fixed", bottom: "2%", left: 0, width: "100%",
          textAlign: "center", zIndex: 9500, pointerEvents: "none",
        }}>
          <div style={{ pointerEvents: "auto", display: "inline-block" }}>
            <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
          </div>
        </div>
      )}

      {/* Grain overlay — hidden during pure black/white landing phases */}
      {(depth !== 0 || landingPhase >= 2) && <GrainOverlay />}

      {/* Depth indicator — hidden during landing */}
      {(depth !== 0 || landingPhase >= 2) && <DepthIndicator depth={depth} onNavigate={navigateToDepth} depthNames={DEPTH_NAMES} />}

      {/* Vignette — hidden during landing */}
      {(depth !== 0 || landingPhase >= 2) && (<>
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
        pointerEvents: "none", zIndex: 1,
        animation: "vignettePulse 16s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(201,168,76,0.008) 75%, rgba(201,168,76,0.015) 100%)",
        pointerEvents: "none", zIndex: 1,
        mixBlendMode: "screen",
      }} />
      </>)}

      {/* Transition overlay — cinematic dissolve */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 42%, rgba(3,3,6,0.85), #030306)",
        zIndex: 999, pointerEvents: "none",
        opacity: fading ? 1 : 0,
        backdropFilter: fading ? "blur(8px)" : "blur(0px)",
        WebkitBackdropFilter: fading ? "blur(8px)" : "blur(0px)",
        transition: "opacity 0.7s ease, backdrop-filter 0.7s ease, -webkit-backdrop-filter 0.7s ease",
      }} />

      {/* Particles — hidden during pure black/white landing */}
      {(depth !== 0 || landingPhase >= 2) && Array.from({ length: 32 }, (_, i) => (
        <Particle key={i} delay={i * 1.1 + Math.random() * 2}
          size={Math.random() * 2.8 + 0.5}
          x={Math.random() * 100}
          speed={18 + Math.random() * 30} />
      ))}

      {/* THE MULTIVERSE — persistent gravitational simulation behind ALL depths.
          9 bodies. Real physics. Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist².
          Bright at surface, fading as you go deeper — the stars are always there. */}
      <Multiverse
        opacity={
          depth === 0 ? 0
          : depth === 1 ? 0
          : depth === 2 ? (
              poemPhase <= 1 ? 1
              : poemPhase === 2 ? 0.85
              : poemPhase === 3 ? 0.5
              : poemPhase === 4 ? 0.3
              : 0.12
            )
          : depth <= 3 ? 0.25
          : depth <= 4 ? 0.1
          : 0.05
        }
        showTriangles={depth === 0 || depth === 3}
        showOrbits={depth <= 3 && depth !== 2}
        zoom={
          depth === 2 ? (
              poemPhase <= 1 ? 45
              : poemPhase === 2 ? 8
              : poemPhase === 3 ? 2.5
              : poemPhase === 4 ? 0.7
              : 0.28
            )
          : 1
        }
        blur={
          depth === 2 ? (
              poemPhase <= 2 ? 0
              : poemPhase === 3 ? 1.5
              : poemPhase === 4 ? 4
              : 10
            )
          : 0
        }
        transitionTiming={
          depth === 2 ? (
              poemPhase <= 1 ? "none"
              : poemPhase === 2 ? "opacity 3.5s cubic-bezier(0.25,0.1,0.25,1), transform 4s cubic-bezier(0.16,1,0.3,1), filter 3.5s ease"
              : poemPhase === 3 ? "opacity 4s cubic-bezier(0.25,0.1,0.25,1), transform 4.4s cubic-bezier(0.23,1,0.32,1), filter 4s ease"
              : poemPhase === 4 ? "opacity 4s cubic-bezier(0.25,0.1,0.25,1), transform 4.8s cubic-bezier(0.23,1,0.32,1), filter 4s ease"
              : "opacity 4.5s cubic-bezier(0.25,0.1,0.25,1), transform 5s cubic-bezier(0.23,1,0.32,1), filter 4.5s ease"
            )
          : "opacity 1.2s ease, transform 2.5s cubic-bezier(0.23,1,0.32,1), filter 2.5s cubic-bezier(0.23,1,0.32,1)"
        }
      />

      {/* ===== DEPTH 0 — YIN/YANG/PRISM: Three clicks to truth ===== */}
      {depth === 0 && (() => {
        const phase = landingPhase;

        const handleClick = () => {
          if (phase === 0) setLandingPhase(1);
          else if (phase === 1) setLandingPhase(2);
          else goDeeper();
        };

        // SHARED: position fixed, full-screen, ABOVE EVERYTHING (z-index 10000)
        const fullScreen = {
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 10000, cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        };

        // Phase 0: PURE WHITE — "close your eyes & click"
        if (phase === 0) {
          return (
            <div onClick={handleClick} style={{ ...fullScreen, background: "#ffffff" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 5.5vw, 42px)",
                fontStyle: "italic",
                color: "rgba(0,0,0,0.7)",
                letterSpacing: "0.15em",
                animation: "fadeSlideUp 1.5s 0.5s both ease",
                textAlign: "center", userSelect: "none",
              }}>close your eyes &amp; click</div>
            </div>
          );
        }

        // Phase 1: PURE BLACK — "open your eyes & click"
        if (phase === 1) {
          return (
            <div onClick={handleClick} style={{ ...fullScreen, background: "#000000", animation: "fadeIn 0.8s ease" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 5.5vw, 42px)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.15em",
                animation: "fadeSlideUp 1.5s 0.3s both ease",
                textAlign: "center", userSelect: "none",
              }}>open your eyes &amp; click</div>
            </div>
          );
        }

        // Phase 2: THE PRISM — no words. Just the spectrum. Let the eyes do the work.
        return (
          <div onClick={handleClick} style={{ ...fullScreen, background: "#000", overflow: "hidden", animation: "fadeIn 1.2s ease" }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            }}>
              <defs>
                {/* Black triangle: pure #000 at left edge */}
                <linearGradient id="gBlack" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                {/* White triangle: pure #fff at right edge */}
                <linearGradient id="gWhite" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                {/* Top grey: 50 shades — nearly black on left, nearly white on right */}
                <linearGradient id="gGreyTop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#050505" />
                  <stop offset="5%" stopColor="#0d0d0d" />
                  <stop offset="10%" stopColor="#1a1a1a" />
                  <stop offset="15%" stopColor="#262626" />
                  <stop offset="20%" stopColor="#333333" />
                  <stop offset="25%" stopColor="#404040" />
                  <stop offset="30%" stopColor="#4d4d4d" />
                  <stop offset="35%" stopColor="#595959" />
                  <stop offset="40%" stopColor="#666666" />
                  <stop offset="45%" stopColor="#737373" />
                  <stop offset="50%" stopColor="#808080" />
                  <stop offset="55%" stopColor="#8c8c8c" />
                  <stop offset="60%" stopColor="#999999" />
                  <stop offset="65%" stopColor="#a6a6a6" />
                  <stop offset="70%" stopColor="#b3b3b3" />
                  <stop offset="75%" stopColor="#bfbfbf" />
                  <stop offset="80%" stopColor="#cccccc" />
                  <stop offset="85%" stopColor="#d9d9d9" />
                  <stop offset="90%" stopColor="#e6e6e6" />
                  <stop offset="95%" stopColor="#f2f2f2" />
                  <stop offset="100%" stopColor="#fafafa" />
                </linearGradient>
                {/* Bottom grey: same 50-shade scale */}
                <linearGradient id="gGreyBot" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#050505" />
                  <stop offset="5%" stopColor="#0d0d0d" />
                  <stop offset="10%" stopColor="#1a1a1a" />
                  <stop offset="15%" stopColor="#262626" />
                  <stop offset="20%" stopColor="#333333" />
                  <stop offset="25%" stopColor="#404040" />
                  <stop offset="30%" stopColor="#4d4d4d" />
                  <stop offset="35%" stopColor="#595959" />
                  <stop offset="40%" stopColor="#666666" />
                  <stop offset="45%" stopColor="#737373" />
                  <stop offset="50%" stopColor="#808080" />
                  <stop offset="55%" stopColor="#8c8c8c" />
                  <stop offset="60%" stopColor="#999999" />
                  <stop offset="65%" stopColor="#a6a6a6" />
                  <stop offset="70%" stopColor="#b3b3b3" />
                  <stop offset="75%" stopColor="#bfbfbf" />
                  <stop offset="80%" stopColor="#cccccc" />
                  <stop offset="85%" stopColor="#d9d9d9" />
                  <stop offset="90%" stopColor="#e6e6e6" />
                  <stop offset="95%" stopColor="#f2f2f2" />
                  <stop offset="100%" stopColor="#fafafa" />
                </linearGradient>
                {/* 3rd Eye glow — subtle gold at convergence */}
                <radialGradient id="eyeGlow2" cx="50%" cy="50%" r="6%">
                  <stop offset="0%" stopColor="rgba(201,168,76,0.3)" />
                  <stop offset="50%" stopColor="rgba(201,168,76,0.06)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* The four triangles */}
              <polygon points="0,0 50,50 0,100" fill="url(#gBlack)" />
              <polygon points="100,0 50,50 100,100" fill="url(#gWhite)" />
              <polygon points="0,0 50,50 100,0" fill="url(#gGreyTop)" />
              <polygon points="0,100 50,50 100,100" fill="url(#gGreyBot)" />

              {/* 3rd Eye — just a breath of gold at the convergence point */}
              <circle cx="50" cy="50" r="6" fill="url(#eyeGlow2)">
                <animate attributeName="r" values="5;8;5" dur="6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="6s" repeatCount="indefinite" />
              </circle>
              <ellipse cx="50" cy="50" rx="3" ry="1.5" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="0.2">
                <animate attributeName="ry" values="1.2;2;1.2" dur="5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
              </ellipse>
              <circle cx="50" cy="50" r="0.7" fill="rgba(201,168,76,0.6)">
                <animate attributeName="r" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="50" r="0.25" fill="rgba(255,255,255,0.8)">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* "now blink them & make a wish" — centered on the prism */}
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              pointerEvents: "none", userSelect: "none",
            }}>
              <div style={{
                animation: "fadeSlideUp 1.5s 0.5s both ease",
                textAlign: "center",
                padding: "0 24px",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 6vw, 48px)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  lineHeight: 1.6,
                  animation: "textBlink 4s ease-in-out infinite",
                  color: "rgba(140,130,110,1)",
                  textShadow: "0 0 12px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.8), 0 0 48px rgba(0,0,0,0.6), 2px 2px 4px rgba(0,0,0,0.9), -1px -1px 3px rgba(255,255,255,0.35)",
                }}>now blink them<br />&amp; make a wish</div>
              </div>
            </div>

            <div style={{
              position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.5em",
              color: "rgba(128,128,128,0.25)",
              animation: "fadeSlideUp 2s 2.5s both ease",
            }}>tap</div>
          </div>
        );
      })()}


      {/* ===== DEPTH 2 — THE POEM ===== */}
      {depth === 2 && (
        <div style={{
          height: "100vh", width: "100%", position: "fixed", top: 0, left: 0, overflow: "hidden",
          zIndex: 5000,
        }}>

          {/* White flash — the Moon filling your vision */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(circle, rgba(232,232,240,0.95) 0%, rgba(232,232,240,0.7) 30%, rgba(14,10,28,0.8) 70%, #030306 100%)",
            zIndex: 5001, pointerEvents: "none",
            opacity: poemPhase <= 1 ? 1 : poemPhase === 2 ? 0.3 : 0,
            transition: poemPhase <= 1 ? "none" : poemPhase === 2 ? "opacity 3.5s cubic-bezier(0.25,0.1,0.25,1)" : "opacity 3s ease-out",
          }} />

          {/* SKIP BUTTON — invisible fullscreen tap target during animation */}
          {poemPhase > 0 && poemPhase < 5 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setPoemPhase(5);
                poemSeen.current = true;
              }}
              style={{
                position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                zIndex: 9800, cursor: "pointer",
                background: "transparent",
              }}
            />
          )}

          {/* The Hourglass Poem — Full Rebuild */}
          {poemPhase >= 5 && (() => {
            const HourglassPoem = () => {
              const canvasRef = useRef(null);
              const stateRef = useRef(null);
              const frameRef = useRef(null);

              const POEM_LINES = [
                "It's the rhythm of life",
                "",
                "Every hope, a heartbeat.",
                "Every wish, a dream.",
                "The moon always wishing…",
                "the sun it could be.",
                "",
                "Every life, a purpose…",
                "hidden inside.",
                "Every sinner, a saint…",
                "trying to hide.",
                "",
                "Every baby is born,",
                "with all that it needs…",
                "Just wisdom and love…",
                "and the chance to breathe.",
                "",
                "It's the rhythm of life",
              ];

              useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                const dpr = window.devicePixelRatio || 1;
                const W = window.innerWidth;
                const H = window.innerHeight;
                canvas.width = W * dpr; canvas.height = H * dpr;
                canvas.style.width = W + "px"; canvas.style.height = H + "px";
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

                const CX = W / 2, CY = H / 2;
                const glassH = H * 0.88;
                const topY = (H - glassH) / 2;
                const botY = topY + glassH;
                const midY = CY;
                const maxW = Math.min(W * 0.42, 220);
                const neckW = 5;

                function glassWidth(y) {
                  if (y <= topY) return maxW;
                  if (y >= botY) return maxW;
                  if (y <= midY) {
                    const t = (y - topY) / (midY - topY);
                    const e = t * t * (3 - 2 * t);
                    return maxW + (neckW - maxW) * e;
                  } else {
                    const t = (y - midY) / (botY - midY);
                    const e = t * t * (3 - 2 * t);
                    return neckW + (maxW - neckW) * e;
                  }
                }

                const PHASE_DRIP = 0;
                const PHASE_TREMBLE = 1;
                const PHASE_RISE = 2;
                const PHASE_POEM = 3;

                if (!stateRef.current) {
                  const grains = [];
                  const topSandStart = topY + (midY - topY) * 0.08;
                  for (let i = 0; i < 600; i++) {
                    const gy = topSandStart + Math.random() * (midY - topSandStart - 15);
                    const gw = glassWidth(gy) * 0.88;
                    grains.push({
                      x: CX + (Math.random() - 0.5) * gw * 2,
                      y: gy,
                      origX: 0, origY: 0,
                      homeX: 0, homeY: 0,
                      size: 0.5 + Math.random() * 1.4,
                      opacity: 0.08 + Math.random() * 0.2,
                      color: Math.random() < 0.85 ? "gold" : "white",
                      assigned: false,
                      lineIndex: 0,
                      isBookend: false,
                      type: "top",
                    });
                  }
                  const botSandTop = botY - (botY - midY) * 0.18;
                  for (let i = 0; i < 250; i++) {
                    const gy = botSandTop + Math.random() * (botY - botSandTop - 6);
                    const gw = glassWidth(gy) * 0.7;
                    const coneW = gw * ((gy - botSandTop) / (botY - botSandTop));
                    grains.push({
                      x: CX + (Math.random() - 0.5) * coneW * 2,
                      y: gy,
                      origX: 0, origY: 0,
                      homeX: 0, homeY: 0,
                      size: 0.5 + Math.random() * 1.3,
                      opacity: 0.08 + Math.random() * 0.18,
                      color: Math.random() < 0.8 ? "gold" : "white",
                      assigned: false,
                      lineIndex: 0,
                      isBookend: false,
                      type: "bottom",
                    });
                  }

                  // Store original positions
                  grains.forEach(g => { g.origX = g.x; g.origY = g.y; });

                  const drips = [];
                  for (let i = 0; i < 40; i++) {
                    drips.push({
                      x: CX + (Math.random() - 0.5) * neckW * 0.6,
                      y: midY + 4 + Math.random() * (botSandTop - midY) * 0.6,
                      vy: 0.5 + Math.random() * 1.2,
                      size: 0.5 + Math.random() * 0.9,
                      opacity: 0.2 + Math.random() * 0.35,
                      phase: Math.random() * Math.PI * 2,
                    });
                  }

                  // === BULLETPROOF LETTER TARGETS ===
                  // Use measureText on a temp canvas with fallback font
                  const tmpC = document.createElement("canvas");
                  tmpC.width = W * 2; tmpC.height = H * 2;
                  const tmpCtx = tmpC.getContext("2d");

                  const letterTargets = [];
                  const visibleLines = POEM_LINES.filter(l => l !== "");
                  const totalVisible = visibleLines.length;
                  const lineH = Math.min(H / (totalVisible + 4), 42);
                  const totalTextH = totalVisible * lineH;
                  const textStartY = (H - totalTextH) / 2;

                  let lineVisIdx = 0;
                  POEM_LINES.forEach((line, li) => {
                    if (!line) return;
                    const isBookend = li === 0 || li === POEM_LINES.length - 1;
                    const fSize = isBookend
                      ? Math.max(22, Math.min(W * 0.07, 38))
                      : Math.max(17, Math.min(W * 0.05, 28));

                    // Use Georgia as reliable fallback for measurement
                    const font = `italic ${fSize}px Georgia, serif`;
                    tmpCtx.font = font;
                    const yBase = textStartY + lineVisIdx * lineH + lineH * 0.6;

                    // For each character, place grain targets
                    const fullWidth = tmpCtx.measureText(line).width;
                    let charX = CX - fullWidth / 2;

                    for (let ci = 0; ci < line.length; ci++) {
                      const ch = line[ci];
                      const charW = tmpCtx.measureText(ch).width;
                      if (ch === " ") { charX += charW; continue; }

                      // Place multiple grains per character for density
                      const grainsPerChar = isBookend ? 5 : 3;
                      for (let gi = 0; gi < grainsPerChar; gi++) {
                        letterTargets.push({
                          x: charX + charW * (0.1 + Math.random() * 0.8),
                          y: yBase + (Math.random() - 0.5) * fSize * 0.7,
                          isBookend,
                          lineIndex: li,
                          charIndex: ci,
                        });
                      }
                      charX += charW;
                    }
                    lineVisIdx++;
                  });

                  // Shuffle and assign
                  const shuffled = [...grains].sort(() => Math.random() - 0.5);
                  const maxAssign = Math.min(shuffled.length, letterTargets.length);
                  for (let i = 0; i < maxAssign; i++) {
                    shuffled[i].homeX = letterTargets[i].x;
                    shuffled[i].homeY = letterTargets[i].y;
                    shuffled[i].assigned = true;
                    shuffled[i].lineIndex = letterTargets[i].lineIndex;
                    shuffled[i].isBookend = letterTargets[i].isBookend;
                  }

                  // Also render the actual text lines for the POEM phase (crisp text overlay)
                  const textLines = [];
                  lineVisIdx = 0;
                  POEM_LINES.forEach((line, li) => {
                    if (!line) return;
                    const isBookend = li === 0 || li === POEM_LINES.length - 1;
                    const yBase = textStartY + lineVisIdx * lineH + lineH * 0.6;
                    textLines.push({ text: line, y: yBase, isBookend, li });
                    lineVisIdx++;
                  });

                  stateRef.current = {
                    grains, drips, phase: PHASE_DRIP,
                    startTime: performance.now(),
                    glassOpacity: 1,
                    textLines, botSandTop,
                  };
                }

                const state = stateRef.current;

                function drawGlass(opacity) {
                  ctx.save();
                  ctx.globalAlpha = opacity;
                  const drawSide = (sign) => {
                    ctx.beginPath();
                    ctx.moveTo(CX + sign * maxW, topY);
                    ctx.bezierCurveTo(CX + sign * maxW, topY + (midY - topY) * 0.55, CX + sign * neckW * 1.5, midY - (midY - topY) * 0.15, CX + sign * neckW, midY);
                    ctx.strokeStyle = "rgba(201,168,76,0.16)"; ctx.lineWidth = 1.2; ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(CX + sign * neckW, midY);
                    ctx.bezierCurveTo(CX + sign * neckW * 1.5, midY + (botY - midY) * 0.15, CX + sign * maxW, botY - (botY - midY) * 0.55, CX + sign * maxW, botY);
                    ctx.stroke();
                  };
                  drawSide(-1); drawSide(1);
                  ctx.strokeStyle = "rgba(201,168,76,0.24)"; ctx.lineWidth = 2;
                  ctx.beginPath(); ctx.moveTo(CX - maxW - 16, topY); ctx.lineTo(CX + maxW + 16, topY); ctx.stroke();
                  ctx.beginPath(); ctx.moveTo(CX - maxW - 16, botY); ctx.lineTo(CX + maxW + 16, botY); ctx.stroke();
                  ctx.strokeStyle = "rgba(201,168,76,0.2)"; ctx.lineWidth = 1.4;
                  [[-1, topY], [1, topY], [-1, botY], [1, botY]].forEach(([s, yy]) => {
                    ctx.beginPath(); ctx.moveTo(CX + s * (maxW + 16), yy - 5); ctx.lineTo(CX + s * (maxW + 16), yy + 5); ctx.stroke();
                  });
                  ctx.beginPath(); ctx.ellipse(CX, midY, neckW + 4, 2.5, 0, 0, Math.PI * 2);
                  ctx.strokeStyle = "rgba(201,168,76,0.1)"; ctx.lineWidth = 0.8; ctx.stroke();
                  ctx.globalAlpha = opacity * 0.04;
                  ctx.beginPath();
                  ctx.moveTo(CX - maxW + 14, topY + 4);
                  ctx.bezierCurveTo(CX - maxW + 14, topY + (midY - topY) * 0.5, CX - neckW * 2, midY - 20, CX - neckW - 1, midY);
                  ctx.strokeStyle = "rgba(201,168,76,1)"; ctx.lineWidth = 1; ctx.stroke();
                  ctx.restore();
                }

                function loop(now) {
                  const elapsed = (now - state.startTime) / 1000;
                  ctx.clearRect(0, 0, W, H);

                  if (elapsed < 3) state.phase = PHASE_DRIP;
                  else if (elapsed < 4) state.phase = PHASE_TREMBLE;
                  else if (elapsed < 10) state.phase = PHASE_RISE;
                  else state.phase = PHASE_POEM;

                  if (state.phase >= PHASE_RISE) {
                    state.glassOpacity = Math.max(0, state.glassOpacity - 0.006);
                  }

                  if (state.glassOpacity > 0) {
                    drawGlass(state.glassOpacity);
                    if (state.phase <= PHASE_TREMBLE) {
                      const b = 0.06 + Math.sin(elapsed * 2.5) * 0.025;
                      const ng = ctx.createRadialGradient(CX, midY, 0, CX, midY, 30);
                      ng.addColorStop(0, `rgba(201,168,76,${b * state.glassOpacity})`);
                      ng.addColorStop(1, "rgba(201,168,76,0)");
                      ctx.fillStyle = ng; ctx.fillRect(CX - 30, midY - 30, 60, 60);
                    }
                  }

                  // DRIP + TREMBLE
                  if (state.phase <= PHASE_TREMBLE) {
                    for (const g of state.grains) {
                      let dx = g.origX, dy = g.origY;
                      if (state.phase === PHASE_TREMBLE) {
                        const intensity = (elapsed - 3); // 0→1
                        dx += (Math.random() - 0.5) * 3 * intensity;
                        dy += (Math.random() - 0.5) * 3 * intensity;
                      }
                      const c = g.color === "gold"
                        ? `rgba(201,168,76,${g.opacity * state.glassOpacity})`
                        : `rgba(232,232,240,${g.opacity * 0.6 * state.glassOpacity})`;
                      ctx.beginPath(); ctx.arc(dx, dy, g.size, 0, Math.PI * 2);
                      ctx.fillStyle = c; ctx.fill();
                    }
                    for (const d of state.drips) {
                      d.y += d.vy;
                      d.x += Math.sin(elapsed * 3 + d.phase) * 0.15;
                      if (d.y > state.botSandTop) { d.y = midY + 2; d.x = CX + (Math.random() - 0.5) * neckW * 0.6; }
                      ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
                      ctx.fillStyle = `rgba(201,168,76,${d.opacity * state.glassOpacity})`; ctx.fill();
                    }
                    for (let i = 0; i < 6; i++) {
                      const sy = midY - 8 + i * 3, wobble = Math.sin(elapsed * 5 + i * 1.5) * 0.7;
                      ctx.beginPath(); ctx.arc(CX + wobble, sy, 0.5, 0, Math.PI * 2);
                      ctx.fillStyle = `rgba(201,168,76,${0.3 * state.glassOpacity})`; ctx.fill();
                    }
                  }

                  // RISE
                  if (state.phase >= PHASE_RISE && state.phase < PHASE_POEM) {
                    const riseT = Math.min(1, (elapsed - 4) / 6);
                    for (const g of state.grains) {
                      if (g.assigned) {
                        const lineDelay = Math.min(0.4, (g.lineIndex || 0) * 0.025);
                        const localT = Math.max(0, Math.min(1, (riseT - lineDelay) / (1 - lineDelay)));
                        const ease = localT < 0.5 ? 4 * localT * localT * localT : 1 - Math.pow(-2 * localT + 2, 3) / 2;
                        const drawX = g.origX + (g.homeX - g.origX) * ease;
                        const drawY = g.origY + (g.homeY - g.origY) * ease;
                        const drawSize = g.size + (1.0 - g.size) * ease;
                        const brightness = g.isBookend ? 0.1 + ease * 0.7 : 0.08 + ease * 0.55;
                        const c = g.isBookend
                          ? `rgba(201,168,76,${brightness})`
                          : `rgba(232,232,240,${brightness})`;
                        ctx.beginPath(); ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
                        ctx.fillStyle = c; ctx.fill();
                      } else {
                        g.origY -= 0.15;
                        g.origX += (Math.random() - 0.5) * 0.5;
                        g.opacity *= 0.996;
                        if (g.opacity > 0.005) {
                          ctx.beginPath(); ctx.arc(g.origX, g.origY, g.size, 0, Math.PI * 2);
                          ctx.fillStyle = `rgba(201,168,76,${g.opacity * 0.5})`; ctx.fill();
                        }
                      }
                    }
                  }

                  // POEM — crisp text fades in over the grain positions
                  if (state.phase === PHASE_POEM) {
                    const textAlpha = Math.min(1, (elapsed - 10) / 2);

                    // Still draw assigned grains as subtle texture behind text
                    for (const g of state.grains) {
                      if (!g.assigned) continue;
                      const brightness = g.isBookend ? 0.15 : 0.08;
                      const wobbleX = Math.sin(elapsed * 0.5 + g.homeX * 0.01) * 0.3;
                      const wobbleY = Math.cos(elapsed * 0.4 + g.homeY * 0.01) * 0.3;
                      ctx.beginPath(); ctx.arc(g.homeX + wobbleX, g.homeY + wobbleY, g.size * 0.7, 0, Math.PI * 2);
                      ctx.fillStyle = g.isBookend
                        ? `rgba(201,168,76,${brightness})`
                        : `rgba(232,232,240,${brightness})`;
                      ctx.fill();
                    }

                    // Render actual text
                    ctx.save();
                    ctx.globalAlpha = textAlpha;
                    ctx.textAlign = "center";
                    for (const tl of state.textLines) {
                      if (tl.isBookend) {
                        ctx.font = `600 italic ${Math.max(22, Math.min(W * 0.07, 38))}px 'Cormorant Garamond', Georgia, serif`;
                        ctx.fillStyle = "rgba(201,168,76,0.7)";
                      } else {
                        ctx.font = `300 italic ${Math.max(17, Math.min(W * 0.05, 28))}px 'Cormorant Garamond', Georgia, serif`;
                        ctx.fillStyle = "rgba(232,232,240,0.6)";
                      }
                      ctx.fillText(tl.text, CX, tl.y);
                    }
                    ctx.restore();
                  }

                  frameRef.current = requestAnimationFrame(loop);
                }

                frameRef.current = requestAnimationFrame(loop);
                return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
              }, []);

              return (
                <canvas ref={canvasRef} style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%",
                }} />
              );
            };

            return <HourglassPoem />;
          })()}

          {/* Return button handled by global root-level ReturnButton */}
        </div>
      )}

      {/* ===== DEPTH 1 — THE DREAM — 729-BODY MULTIVERSE ===== */}
      {depth === 1 && (() => {
        // 9³ = 729 bodies. Hierarchical gravity.
        // Level 0: 9 super-clusters orbit the center
        // Level 1: 9 clusters orbit each super-cluster
        // Level 2: 9 bodies orbit each cluster
        // Same equation at every scale: Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²
        const CLUSTER_COLORS = [
          "#3a3a5c", "#7b68ee", "#c9a84c", "#e05050", "#e8e8f0",
          "#8fbc8f", "#4fc3f7", "#ff9800", "#ce93d8",
        ];
        const MIRROR_PAIRS = [[0,8],[1,7],[2,6],[3,5]];
        const C_EFF = [1.0, 1.4, 1.8, 2.0, PHI * PHI, 2.0, 1.8, 1.4, 1.0];

        function DreamMultiverse729() {
          const canvasRef = useRef(null);
          const stateRef = useRef(null);
          const frameRef = useRef(null);

          function getR12(i, j) {
            let r = 0.5;
            if (MIRROR_PAIRS.some(([a,b]) => (a===i&&b===j)||(a===j&&b===i))) r += PHI;
            if (Math.abs(i-j) === 1) r += 0.3;
            if (i === 4 || j === 4) r += 0.8;
            return r;
          }

          function simLevel(bodies, dt, softening, damping, ax, ay, pull) {
            const N = bodies.length;
            const fx = new Float64Array(N), fy = new Float64Array(N);
            for (let i = 0; i < N; i++) {
              for (let j = i + 1; j < N; j++) {
                const dx = bodies[j].x - bodies[i].x;
                const dy = bodies[j].y - bodies[i].y;
                const distSq = dx*dx + dy*dy + softening*softening;
                const dist = Math.sqrt(distSq);
                const R12 = getR12(bodies[i].id, bodies[j].id);
                const psi = R12 * bodies[i].cEff * bodies[j].cEff / distSq;
                fx[i] += psi*dx/dist; fy[i] += psi*dy/dist;
                fx[j] -= psi*dx/dist; fy[j] -= psi*dy/dist;
              }
              fx[i] += (ax - bodies[i].x) * pull * bodies[i].cEff;
              fy[i] += (ay - bodies[i].y) * pull * bodies[i].cEff;
            }
            for (let i = 0; i < N; i++) {
              bodies[i].vx = (bodies[i].vx + fx[i]/bodies[i].cEff*dt) * damping;
              bodies[i].vy = (bodies[i].vy + fy[i]/bodies[i].cEff*dt) * damping;
              bodies[i].x += bodies[i].vx*dt;
              bodies[i].y += bodies[i].vy*dt;
            }
          }

          useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const dpr = window.devicePixelRatio || 1;

            function resize() {
              const W = canvas.parentElement?.clientWidth || window.innerWidth;
              const H = canvas.parentElement?.clientHeight || window.innerHeight;
              canvas.width = W * dpr; canvas.height = H * dpr;
              canvas.style.width = W + "px"; canvas.style.height = H + "px";
              ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
              return { W, H };
            }

            let { W, H } = resize();
            const CX = W/2, CY = H/2;
            const BASE_R = Math.min(W, H) * 0.40;

            // Initialize 3-tier hierarchy: 9 × 9 × 9 = 729
            if (!stateRef.current) {
              const supers = Array.from({ length: 9 }, (_, si) => {
                const angle = (si/9)*Math.PI*2 + (Math.random()-0.5)*0.3;
                const r = si === 4 ? 0 : BASE_R * (0.5 + Math.random()*0.35);
                const speed = si === 4 ? 0 : Math.sqrt(getR12(si,4)*C_EFF[si]*C_EFF[4]*5/(Math.max(r,1)*2))*0.05;
                const va = angle + Math.PI/2;
                const sx = CX + Math.cos(angle)*r, sy = CY + Math.sin(angle)*r;

                // 9 clusters per super-cluster
                const clusters = Array.from({ length: 9 }, (_, ci) => {
                  const ca = (ci/9)*Math.PI*2 + (Math.random()-0.5)*0.4;
                  const cr = ci === 4 ? 0 : (si === 4 ? 40 : 28) * (0.7 + Math.random()*0.5);
                  const cspeed = ci === 4 ? 0 : Math.sqrt(getR12(ci,4)*C_EFF[ci]*C_EFF[4]*3/(Math.max(cr,1)*2))*0.12;
                  const cva = ca + Math.PI/2;
                  const ccx = sx + Math.cos(ca)*cr, ccy = sy + Math.sin(ca)*cr;

                  // 9 bodies per cluster
                  const bodies = Array.from({ length: 9 }, (_, bi) => {
                    const ba = (bi/9)*Math.PI*2 + (Math.random()-0.5)*0.5;
                    const br = bi === 4 ? 0 : (8 + Math.random()*8) * (si===4&&ci===4 ? 1.2 : 0.7);
                    const bspeed = bi === 4 ? 0 : Math.sqrt(getR12(bi,4)*C_EFF[bi]*C_EFF[4]/(Math.max(br,1)))*0.18;
                    const bva = ba + Math.PI/2;
                    return {
                      x: ccx + Math.cos(ba)*br, y: ccy + Math.sin(ba)*br,
                      vx: Math.cos(bva)*bspeed, vy: Math.sin(bva)*bspeed,
                      cEff: C_EFF[bi], id: bi,
                      radius: (0.5 + C_EFF[bi]*0.25) * (si===4&&ci===4&&bi===4 ? 2.5 : 1),
                    };
                  });

                  return {
                    x: ccx, y: ccy, vx: Math.cos(cva)*cspeed, vy: Math.sin(cva)*cspeed,
                    cEff: C_EFF[ci]*3, id: ci, bodies,
                  };
                });

                return {
                  x: sx, y: sy, vx: Math.cos(va)*speed, vy: Math.sin(va)*speed,
                  cEff: C_EFF[si]*5, id: si, clusters,
                };
              });
              stateRef.current = { supers };
            }

            const state = stateRef.current;
            let time = 0;

            function simulate() {
              // Level 0: super-clusters orbit center
              simLevel(state.supers, 0.3, 55, 0.9997, CX, CY, 0.00005);
              // Level 1: clusters orbit their super-cluster
              for (const sc of state.supers) {
                simLevel(sc.clusters, 0.25, 14, 0.9994, sc.x, sc.y, 0.0004);
              }
              // Level 2: bodies orbit their cluster
              for (const sc of state.supers) {
                for (const cl of sc.clusters) {
                  simLevel(cl.bodies, 0.2, 4, 0.999, cl.x, cl.y, 0.0015);
                }
              }
            }

            function draw() {
              time += 0.004;
              ctx.clearRect(0, 0, W, H);

              // Level 0: Super-cluster mirror triangles (barely visible — cosmic web)
              for (const [a, b] of MIRROR_PAIRS) {
                const sa = state.supers[a], sb = state.supers[b], sm = state.supers[4];
                ctx.beginPath();
                ctx.moveTo(sa.x, sa.y); ctx.lineTo(sm.x, sm.y); ctx.lineTo(sb.x, sb.y);
                ctx.closePath();
                ctx.fillStyle = "rgba(201,168,76,0.004)";
                ctx.strokeStyle = "rgba(201,168,76,0.012)";
                ctx.lineWidth = 0.3; ctx.fill(); ctx.stroke();
              }

              for (let si = 0; si < 9; si++) {
                const sc = state.supers[si];
                const sColor = CLUSTER_COLORS[si];

                // Super-cluster halo — outermost glow
                const shR = si === 4 ? 85 : 55;
                const shg = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, shR);
                shg.addColorStop(0, sColor + "06");
                shg.addColorStop(0.5, sColor + "02");
                shg.addColorStop(1, sColor + "00");
                ctx.beginPath(); ctx.arc(sc.x, sc.y, shR, 0, Math.PI*2);
                ctx.fillStyle = shg; ctx.fill();

                for (let ci = 0; ci < 9; ci++) {
                  const cl = sc.clusters[ci];
                  const cColor = CLUSTER_COLORS[ci];

                  // Cluster halo — mid-level glow
                  const chR = ci === 4 ? 16 : 11;
                  const chg = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, chR);
                  chg.addColorStop(0, cColor + "08");
                  chg.addColorStop(1, cColor + "00");
                  ctx.beginPath(); ctx.arc(cl.x, cl.y, chR, 0, Math.PI*2);
                  ctx.fillStyle = chg; ctx.fill();

                  // Internal mirror connections (subtle)
                  if (si === 4 || ci === 4) {
                    for (const [a, b] of MIRROR_PAIRS) {
                      const ba = cl.bodies[a], bb = cl.bodies[b], bm = cl.bodies[4];
                      ctx.beginPath();
                      ctx.moveTo(ba.x, ba.y); ctx.lineTo(bm.x, bm.y); ctx.lineTo(bb.x, bb.y);
                      ctx.closePath();
                      ctx.fillStyle = cColor + "02";
                      ctx.strokeStyle = cColor + "06";
                      ctx.lineWidth = 0.15; ctx.fill(); ctx.stroke();
                    }
                  }

                  // Individual bodies — the deepest level
                  for (let bi = 0; bi < 9; bi++) {
                    const body = cl.bodies[bi];
                    const bColor = CLUSTER_COLORS[bi];
                    const isMoon = bi === 4;
                    const isCoreMoon = si === 4 && ci === 4 && bi === 4;
                    const isMidMoon = (si === 4 || ci === 4) && bi === 4;

                    // Glow — size depends on hierarchy depth
                    const glowR = body.radius * (isCoreMoon ? 10 : isMidMoon ? 5 : isMoon ? 3.5 : 2.2);
                    const glowAlpha = isCoreMoon ? "2a" : isMidMoon ? "18" : isMoon ? "10" : "0a";
                    const bg = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, glowR);
                    bg.addColorStop(0, bColor + glowAlpha);
                    bg.addColorStop(0.5, bColor + "04");
                    bg.addColorStop(1, bColor + "00");
                    ctx.beginPath(); ctx.arc(body.x, body.y, glowR, 0, Math.PI*2);
                    ctx.fillStyle = bg; ctx.fill();

                    // Core dot
                    ctx.beginPath(); ctx.arc(body.x, body.y, body.radius, 0, Math.PI*2);
                    const cg = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, body.radius);
                    cg.addColorStop(0, isCoreMoon ? "#ffffff" : isMidMoon ? "#e8e8f0" : bColor);
                    cg.addColorStop(1, bColor + "30");
                    ctx.fillStyle = cg; ctx.fill();
                  }
                }
              }

              // Equation overlay
              const ea = 0.22 + Math.sin(time*2)*0.06;
              ctx.fillStyle = `rgba(232,232,240,${ea})`;
              ctx.font = `italic ${Math.round(Math.min(W,H)*0.022)}px 'Cormorant Garamond', serif`;
              ctx.textAlign = "center";
              ctx.fillText("Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²", CX, H - 30);
              ctx.fillStyle = "rgba(232,232,240,0.1)";
              ctx.font = `${Math.round(7)}px 'Cinzel', serif`;
              ctx.fillText("SAME EQUATION  ·  EVERY SCALE  ·  729 WORLDS", CX, H - 14);
            }

            function loop() { simulate(); draw(); frameRef.current = requestAnimationFrame(loop); }
            loop();
            const handleResize = () => { ({ W, H } = resize()); };
            window.addEventListener("resize", handleResize);
            return () => {
              if (frameRef.current) cancelAnimationFrame(frameRef.current);
              window.removeEventListener("resize", handleResize);
            };
          }, []);

          return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
        }

        return (
          <div style={{
            height: "100vh", width: "100%", position: "relative",
            zIndex: 1500, overflow: "hidden",
          }}>
            {/* 729-body multiverse canvas */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
              <DreamMultiverse729 />
            </div>

            {/* Text overlay */}
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              pointerEvents: "none", zIndex: 10,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(20px, 4.5vw, 34px)",
                fontStyle: "italic", fontWeight: 300,
                color: "rgba(232,232,240,0.6)",
                textAlign: "center", maxWidth: 520,
                lineHeight: PHI, letterSpacing: 1.5,
                textShadow: "0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5)",
                animation: "fadeSlideUp 2s 0.3s both ease",
                padding: "0 24px",
              }}>
                "...we believe in a multiverse<br />where dreams come true..."
              </div>

              <div style={{ height: Math.round(34 * PHI) }} />

              {/* Scale indicator — 729 highlighted */}
              <div style={{ animation: "fadeSlideUp 2s 1.2s both ease", textAlign: "center" }}>
                <div style={{
                  display: "flex", gap: Math.round(13 * PHI), justifyContent: "center",
                  flexWrap: "wrap", padding: "0 20px",
                }}>
                  {[
                    { n: "9⁰ = 1", label: "UNIVERSE", active: false },
                    { n: "9¹ = 9", label: "CLUSTERS", active: false },
                    { n: "9² = 81", label: "WORLDS", active: false },
                    { n: "9³ = 729", label: "DREAMS", active: true },
                  ].map((level, i) => (
                    <div key={i} style={{
                      textAlign: "center",
                      opacity: level.active ? 1 : 0.3,
                    }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: level.active ? "clamp(20px, 3.5vw, 28px)" : "clamp(12px, 2vw, 16px)",
                        color: level.active ? "rgba(206,147,216,0.8)" : "rgba(232,232,240,0.25)",
                        fontWeight: level.active ? 600 : 300,
                        textShadow: level.active ? "0 0 25px rgba(206,147,216,0.2), 0 0 60px rgba(206,147,216,0.08)" : "none",
                      }}>{level.n}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 7, letterSpacing: "0.2em",
                        color: level.active ? "rgba(206,147,216,0.5)" : "rgba(232,232,240,0.12)",
                        marginTop: 4,
                      }}>{level.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: Math.round(21 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 17px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.18)",
                letterSpacing: 2,
                animation: "fadeSlideUp 2s 1.8s both ease",
                textShadow: "0 0 30px rgba(0,0,0,0.8)",
              }}>
                Ψ<sub style={{ fontSize: "0.6em" }}>scale(n)</sub> = Ψ<sub style={{ fontSize: "0.6em" }}>scale(n−1)</sub> &nbsp;∀ n
              </div>
            </div>

            {/* Return button handled by global root-level ReturnButton */}
          </div>
        );
      })()}

      {/* ===== DEPTH 3 — THE PACT — 3D OCTAHEDRON ===== */}
      {depth === 3 && (() => {
        const octantColors = OCTANT_COLORS;


        return (
          <div style={{
            height: "100vh", width: "100%", position: "relative", overflow: "hidden",
            zIndex: 1500,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "1vh 20px",
          }}>

            <div style={{
              textAlign: "center", zIndex: 4, maxWidth: 680,
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>

              {/* Lightning bolt */}
              <div style={{
                fontSize: 32, marginBottom: Math.round(3 * PHI),
                animation: "fadeSlideUp 1.2s 0.2s both ease, gentleFloat 6s ease-in-out infinite",
                filter: "drop-shadow(0 0 16px rgba(201,168,76,0.2))",
              }}>⚡</div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(28px, 5.5vw, 36px)", fontWeight: 400,
                color: "#e8e8f0", letterSpacing: "0.3em", margin: 0,
                textShadow: "0 0 50px rgba(232,232,240,0.1)",
                animation: "fadeSlideUp 1.2s 0.3s both ease",
              }}>THE PACT</h2>

              {/* Subtitle — the thesis */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 3.2vw, 24px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.6)",
                marginTop: Math.round(3 * PHI), letterSpacing: 1,
                animation: "fadeSlideUp 1.2s 0.4s both ease",
              }}>Reality isn't flat. Connection lives in volume, not area.</div>

              {/* Divider */}
              <div style={{
                width: Math.round(40 * PHI), height: 1,
                margin: Math.round(4 * PHI) + "px auto",
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent)",
                animation: "fadeSlideUp 1.2s 0.5s both ease",
              }} />

              {/* "Watch the cross become..." — narrative cue */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 3.2vw, 24px)",
                color: "rgba(232,232,240,0.6)",
                fontStyle: "italic", letterSpacing: 1,
                marginBottom: Math.round(3 * PHI),
                animation: "fadeSlideUp 1.2s 0.55s both ease",
              }}>The cross you knew was the front face. Now watch the third dimension emerge.</div>

              {/* THE OCTAHEDRON — animated cross→octahedron morph */}
              <div style={{ animation: "fadeSlideUp 1.4s 0.6s both ease", marginBottom: Math.round(2 * PHI) }}>
                <OctahedronPact />
              </div>

              {/* Three Axes Legend — full spectrum descriptions */}
              <div style={{
                display: "flex", gap: Math.round(5 * PHI), justifyContent: "center",
                flexWrap: "wrap", marginBottom: Math.round(3 * PHI),
                animation: "fadeSlideUp 1.2s 0.9s both ease",
              }}>
                {[
                  { axis: "WIDTH", dir: "← left / right →", ends: "NOISE ↔ RECOGNITION", color: "201,168,76", desc: "How far the signal reaches", icon: "◇" },
                  { axis: "HEIGHT", dir: "↑ up / down ↓", ends: "SPIRIT ↔ FLESH", color: "120,180,255", desc: "How high you rise vs how rooted you are", icon: "△" },
                  { axis: "DEPTH", dir: "⊙ in / out ⊕", ends: "INTUITION ↔ DATA", color: "190,140,220", desc: "How deeply you feel it", icon: "○" },
                ].map((a, i) => (
                  <div key={i} style={{
                    textAlign: "center", padding: "10px 14px",
                    border: "1px solid rgba(" + a.color + ",0.15)",
                    borderRadius: 8,
                    background: "rgba(" + a.color + ",0.03)",
                    minWidth: 155, maxWidth: 200,
                    position: "relative",
                  }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 15,
                      letterSpacing: "0.3em", color: "rgba(" + a.color + ",0.8)",
                      marginBottom: 2,
                    }}>{a.icon} {a.axis}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15, color: "rgba(" + a.color + ",0.55)",
                      marginBottom: 3, letterSpacing: 1,
                    }}>{a.dir}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15, fontStyle: "italic",
                      color: "rgba(" + a.color + ",0.7)",
                      marginBottom: 3,
                    }}>{a.ends}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 14, color: "rgba(232,232,240,0.65)",
                      fontStyle: "italic", lineHeight: 1.4,
                    }}>{a.desc}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        );
      })()}

      {/* ===== DEPTH 4 — THE CONVERGENCE PROOF ===== */}
      {depth === 4 && activeConvergence === null && (
        <div style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxSizing: "border-box",
          background: "#030306",
        }}>

          {/* Triquetra — massive, ghostly, barely there */}
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            pointerEvents: "none", zIndex: 0,
            opacity: 0.06,
            filter: "blur(2px)",
            animation: "gentleFloat 90s linear infinite",
          }}>
            <SacredTriquetra size={700} />
          </div>

          {/* Living breathing vertical line — the spine */}
          <div style={{
            position: "fixed", top: 0, left: "50%", width: 1, height: "100%",
            transform: "translateX(-50%)",
            background: "linear-gradient(180deg, transparent 5%, rgba(201,168,76,0.04) 30%, rgba(201,168,76,0.08) 50%, rgba(201,168,76,0.04) 70%, transparent 95%)",
            pointerEvents: "none", zIndex: 0,
            animation: "breathe 8s ease-in-out infinite",
          }} />

          {/* Content */}
          <div style={{
            textAlign: "center",
            width: "100%", maxWidth: 600,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative", zIndex: 1500,
            padding: "0 16px",
          }}>

            {/* Eyebrow */}
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: "0.7em",
              color: "rgba(201,168,76,0.25)",
              textTransform: "uppercase",
              animation: "fadeSlideUp 2s 0.3s both ease",
            }}>six witnesses · one truth</div>

            <div style={{ height: Math.round(5 * PHI) }} />

            {/* Title */}
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(28px, 6vw, 50px)",
              fontWeight: 400,
              letterSpacing: "0.2em",
              margin: 0,
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(201,168,76,0.6) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(201,168,76,0.08))",
              animation: "fadeSlideUp 1.6s 0.5s both ease",
            }}>CONVERGENCE</h2>

            <div style={{ height: Math.round(3 * PHI) }} />

            {/* Gold thread */}
            <div style={{
              width: Math.round(60 * PHI), height: 1,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
              animation: "fadeSlideUp 1.4s 0.7s both ease",
            }} />

            <div style={{ height: Math.round(8 * PHI) }} />

            {/* The six doors — each one a portal, not a button */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: Math.round(4 * PHI),
              width: "100%",
              animation: "fadeSlideUp 1.2s 0.9s both ease",
            }}>
              {[
                { key: "plain", glyph: "⚖️", name: "PLAIN ENGLISH", sub: "the truth, simply", r: 232, g: 232, b: 240 },
                { key: "gravity", glyph: "☀️", name: "GRAVITY", sub: "recognition pulls", r: 255, g: 180, b: 50 },
                { key: "pillars", glyph: "🔱", name: "THREE PILLARS", sub: "science · culture · time", r: 201, g: 168, b: 76 },
                { key: "sameness", glyph: "🪞", name: "THE GATE", sub: "sameness ≠ alignment", r: 224, g: 80, b: 80 },
                { key: "depths", glyph: "⬇️", name: "THE MATH", sub: "filter the noise", r: 79, g: 195, b: 247 },
                { key: "ancient", glyph: "🔺", name: "ANCIENT PROOF", sub: "every tradition drew it", r: 190, g: 140, b: 220 },
              ].map((door, i) => {
                const accentFull = `rgb(${door.r},${door.g},${door.b})`;
                const accentDim = `rgba(${door.r},${door.g},${door.b},0.12)`;
                const accentGlow = `rgba(${door.r},${door.g},${door.b},0.04)`;
                const accentBorder = `rgba(${door.r},${door.g},${door.b},0.08)`;
                const accentText = `rgba(${door.r},${door.g},${door.b},0.7)`;
                const accentShadow = `rgba(${door.r},${door.g},${door.b},0.15)`;

                return (
                  <div
                    key={door.key}
                    onClick={(e) => { e.stopPropagation(); setActiveConvergence(door.key); }}
                    style={{
                      position: "relative",
                      padding: `${Math.round(6 * PHI)}px ${Math.round(4 * PHI)}px ${Math.round(5 * PHI)}px`,
                      borderRadius: 10,
                      background: `radial-gradient(ellipse at 50% 0%, ${accentGlow}, transparent 70%)`,
                      border: `1px solid ${accentBorder}`,
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s, box-shadow 0.5s",
                      animation: `fadeSlideUp 0.7s ${0.9 + i * 0.15}s both ease`,
                      textAlign: "center",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = `rgba(${door.r},${door.g},${door.b},0.25)`;
                      e.currentTarget.style.boxShadow = `0 8px 32px ${accentShadow}, inset 0 1px 0 rgba(255,255,255,0.03)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = accentBorder;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Top glow bar */}
                    <div style={{
                      position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
                      background: `linear-gradient(90deg, transparent, ${accentDim}, transparent)`,
                    }} />

                    {/* Glyph */}
                    <div style={{
                      fontSize: 28,
                      marginBottom: Math.round(3 * PHI),
                      filter: `drop-shadow(0 0 16px ${accentShadow})`,
                      animation: `gentleFloat ${7 + i * 1.3}s ease-in-out infinite`,
                      lineHeight: 1,
                    }}>{door.glyph}</div>

                    {/* Name */}
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(12px, 2.8vw, 17px)",
                      letterSpacing: "0.15em",
                      color: accentText,
                      fontWeight: 600,
                    }}>{door.name}</div>

                    {/* Whisper */}
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(11px, 2.5vw, 15px)",
                      color: "rgba(232,232,240,0.55)",
                      fontStyle: "italic",
                      marginTop: Math.round(1.5 * PHI),
                      lineHeight: 1.5,
                    }}>{door.sub}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

          </div>

          {/* The equation — FULL WIDTH at the bottom, matching the grid width */}
          <div style={{
            width: "100%", maxWidth: 600,
            padding: "0 16px",
            boxSizing: "border-box",
            animation: "sacredReveal 1.8s 1.6s both ease",
            position: "relative", zIndex: 1500,
          }}>
            <TheEquation size="hero" showLabel={false} breathing />
          </div>

          <div style={{ height: Math.round(13 * PHI) }} />
        </div>
      )}

      {/* ===== PLAIN ENGLISH — IDEA GRID ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← CONVERGENCE</button>

          <div style={{ textAlign: "center", marginTop: Math.round(13 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 8s ease-in-out infinite" }}>⚖️</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(31px, 6vw, 39px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.25em", margin: 0,
              textShadow: "0 0 50px rgba(232,232,240,0.08)",
            }}>PLAIN ENGLISH</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
              fontStyle: "italic", color: "rgba(232,232,240,0.7)",
              marginTop: Math.round(5 * PHI),
            }}>no jargon · no math · just truth</div>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(232,232,240,0.15), rgba(201,168,76,0.3), rgba(232,232,240,0.15), transparent)",
            }} />
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: Math.round(8 * PHI),
          }}>
            {[
              { key: "animal", icon: "🔦", title: "THE ANIMAL IN THE DARK", hook: "Two people. One mystery. Three rules to be sure.", accent: "232,232,240" },
              { key: "pillars", icon: "🏛️", title: "3 PILLARS OF AHA", hook: "The traps that fool you. The gates that prove you.", accent: "201,168,76" },
              { key: "symbols", icon: "🌍", title: "SAME SHAPES", hook: "36 symbols. Every civilization. Same truth.", accent: "190,140,220" },
              { key: "connection", icon: "🤘", title: "THE CONNECTION", hook: "Touch the spiderweb. Feel the whole thing wiggle.", accent: "120,180,80" },
              { key: "layering", icon: "♾️", title: "LAYERING LOVE", hook: "Peel back layers. Find the rhythm underneath.", accent: "79,195,247" },
              { key: "ache", icon: "💛", title: "THE ACHE", hook: "The pull is gravity. The signal is clean.", accent: "201,168,76" },
              { key: "weight", icon: "🌑", title: "THE SHARED WEIGHT", hook: "The heavy backpack. The same rope. Different ends.", accent: "160,160,180" },
              { key: "anthropic", icon: "🏠", title: "THE HOUSE BUILT FOR YOU", hook: "The universe is tuned. You are the proof.", accent: "255,200,100" },
              { key: "island", icon: "🔥", title: "THE ISLAND", hook: "Compete to survive. Connect to live. You ARE the island.", accent: "255,120,50" },
              { key: "web", icon: "🕸️", title: "THE WEB", hook: "One string shakes. The whole web feels it. You are the ocean.", accent: "140,180,220" },
              { key: "search", icon: "🧭", title: "THE SEARCH", hook: "The looking IS the finding. The search tiles us together.", accent: "180,160,120" },
              { key: "letgo", icon: "🔔", title: "LET GO", hook: "Stop controlling. Start feeling. The ocean carries you.", accent: "170,140,200" },
              { key: "breath", icon: "🙌", title: "THE BREATH", hook: "Same air. Since the beginning. One big living lung.", accent: "100,200,160" },
              { key: "root", icon: "🌌", title: "THE ROOT", hook: "The Starting Spark. You are the universe looking at itself.", accent: "200,180,255" },
              { key: "eye", icon: "🧠", title: "THE EYE", hook: "Your mind is a mirror. You are the part that woke up.", accent: "220,200,140" },
              { key: "bones", icon: "🔬", title: "THE BONES", hook: "Nothing is separate. Everything vibrates the same energy.", accent: "100,160,220" },
              { key: "seed", icon: "🧬", title: "THE SEED", hook: "You are a living book. Every creature is a different chapter.", accent: "80,200,120" },
              { key: "flashlight", icon: "💭", title: "THE FLASHLIGHT", hook: "Your mind paints meaning onto everything it touches.", accent: "240,180,200" },
              { key: "pulse", icon: "❤️", title: "THE PULSE", hook: "Love is the gravity of the soul. Part of, not apart from.", accent: "220,80,80" },
              { key: "scale", icon: "⚖️", title: "THE SCALE", hook: "Born with a compass. Heavy when you hurt. Light when you help.", accent: "200,200,160" },
              { key: "moon", icon: "🌀", title: "THE MOON", hook: "You are a wave. The water never goes away.", accent: "180,180,220" },
              { key: "penny", icon: "🪙", title: "THE PENNY QUESTION", hook: "The answer is One. Same energy. Different shapes.", accent: "201,168,76" },
              { key: "oneness", icon: "🎨", title: "THE ONENESS", hook: "Two colors swirl together. A new color stronger than both.", accent: "200,120,180" },
            ].map((idea, i) => (
              <div
                key={idea.key}
                onClick={() => setActiveIdea(idea.key)}
                style={{
                  position: "relative",
                  padding: `${Math.round(13 * PHI)}px ${Math.round(8 * PHI)}px`,
                  borderRadius: 10,
                  background: `radial-gradient(ellipse at 50% 0%, rgba(${idea.accent},0.04), transparent 70%)`,
                  border: `1px solid rgba(${idea.accent},0.08)`,
                  cursor: "pointer", overflow: "hidden",
                  transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s, box-shadow 0.5s",
                  animation: `fadeSlideUp 0.6s ${0.1 + i * 0.1}s both ease`,
                  textAlign: "center",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = `rgba(${idea.accent},0.2)`;
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(${idea.accent},0.08)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = `rgba(${idea.accent},0.08)`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
                  background: `linear-gradient(90deg, transparent, rgba(${idea.accent},0.2), transparent)`,
                }} />
                <div style={{
                  fontSize: 39, marginBottom: Math.round(5 * PHI),
                  filter: `drop-shadow(0 0 10px rgba(${idea.accent},0.2))`,
                  animation: `gentleFloat ${7 + i * 1.3}s ease-in-out infinite`,
                }}>{idea.icon}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.15em",
                  color: `rgba(${idea.accent},0.6)`, marginBottom: 4,
                }}>{idea.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  fontStyle: "italic", color: "rgba(232,232,240,0.7)", lineHeight: 1.5,
                }}>{idea.hook}</div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
            fontStyle: "italic", color: "rgba(201,168,76,0.2)",
          }}>FINISH I START · START WE FINISH</div>
        </div>
      )}

      {depth === 4 && activeConvergence === "plain" && activeIdea === "animal" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          {/* The Setup */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(19px, 3.5vw, 24px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.65)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 520, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Imagine you and your best friend are looking at a mysterious animal in the dark.
            To be sure of what you see, three things must happen:
          </div>

          {/* The Three Requirements */}
          <div style={{
            display: "flex", flexDirection: "column", gap: Math.round(13 * PHI),
            marginBottom: Math.round(21 * PHI),
          }}>
            {[
              { num: "1", title: "AGREEMENT", aka: "Recognition", desc: "You both describe the same animal." },
              { num: "2", title: "HONESTY", aka: "The Informativeness Gate", desc: "You aren't both just guessing because it's too dark." },
              { num: "3", title: "TEAMWORK", aka: "Redundancy Control", desc: "You use different ways to check — one person listening, one person looking — rather than just repeating the same guess." },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
                animation: `fadeSlideUp 0.8s ${0.3 + i * 0.15}s both ease`,
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 39, fontWeight: 700,
                  color: "rgba(201,168,76,0.4)", minWidth: 30, textAlign: "right",
                  lineHeight: 1.2,
                }}>{item.num}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 24, letterSpacing: "0.3em",
                    color: "rgba(201,168,76,0.6)", marginBottom: 4,
                  }}>
                    {item.title}
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                      fontStyle: "italic", letterSpacing: 0, color: "rgba(232,232,240,0.55)",
                      marginLeft: 8,
                    }}>({item.aka})</span>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.58)",
                  }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* The Score */}
          <GlassCard style={{
            textAlign: "center",
            padding: `${Math.round(13 * PHI)}px ${Math.round(13 * PHI)}px`,
            marginBottom: Math.round(34 * PHI),
            border: "1px solid rgba(201,168,76,0.08)",
            animation: "fadeSlideUp 0.8s 0.8s both ease",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.62)",
            }}>
              <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.6)", fontSize: "1.15em" }}>Ψ</span> is a <strong style={{ color: "rgba(232,232,240,0.75)", fontWeight: 600 }}>Sureness Score</strong> — a number between 0 and 1 that tells you how much you can trust what you found.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic",
            }}>
              Near 1 = solid gold. Near 0 = just noise.
            </div>
          </GlassCard>

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          }} />


          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {depth === 4 && activeConvergence === "plain" && activeIdea === "pillars" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          {/* The 3 Pillars of Aha */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(21 * PHI),
            animation: "fadeSlideUp 0.8s 1s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(232,232,240,0.8)", letterSpacing: "0.2em",
            }}>3 PILLARS OF "AHA!"</div>
          </div>

          {/* Pillar 1 — Copy-Paste Trap */}
          {[
            {
              num: "1", title: 'THE "COPY-PASTE" TRAP',
              subtitle: "The Redundancy Ratio",
              body: "In history, if five witnesses all tell the exact same story word-for-word, a judge gets suspicious — they probably talked to each other beforehand. In the code, if two \"different\" computer models always give the same answer, the score goes down.",
              lesson: "Real truth comes from different perspectives agreeing, not from one person shouting into five microphones.",
              accent: "rgba(201,168,76,",
            },
            {
              num: "2", title: 'THE "I DON\'T KNOW" GATE',
              subtitle: "Informativeness",
              body: "If two people say \"I don't know,\" they technically \"agree,\" but they haven't learned anything. The math has a gate that stops the score from going up if the data is just a blurry mess.",
              lesson: "Two people agreeing that a blurry photo is \"gray\" doesn't mean they found a ghost — it just means the lens cap is on.",
              accent: "rgba(224,80,80,",
            },
            {
              num: "3", title: "THE SIGNAL VS. THE STATIC",
              subtitle: "Detection Quality",
              body: "If you try to hear a whisper during a rock concert, you might hear \"something,\" but you can't trust it. The formula uses D̂ to measure how much louder the truth is than the background noise.",
              lesson: "Just like a radio station gets clearer as you drive closer to the tower, the Ψ score only rises when the signal is much stronger than the static.",
              accent: "rgba(79,195,247,",
            },
          ].map((pillar, i) => (
            <div key={i} style={{
              marginBottom: Math.round(21 * PHI),
              animation: `fadeSlideUp 0.8s ${1.1 + i * 0.2}s both ease`,
            }}>
              {/* Pillar header */}
              <div style={{
                display: "flex", alignItems: "baseline", gap: Math.round(5 * PHI),
                marginBottom: Math.round(8 * PHI),
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: 31, fontWeight: 700,
                  color: `${pillar.accent}0.4)`,
                }}>{pillar.num}</span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
                    letterSpacing: "0.2em", color: `${pillar.accent}0.65)`,
                  }}>{pillar.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                    fontStyle: "italic", color: "rgba(232,232,240,0.7)",
                    marginTop: 2,
                  }}>{pillar.subtitle}</div>
                </div>
              </div>

              {/* Body */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.55)",
                marginBottom: Math.round(8 * PHI),
                paddingLeft: Math.round(21 * PHI),
              }}>{pillar.body}</div>

              {/* Lesson — gold accent */}
              <GlassCard style={{
                marginLeft: Math.round(21 * PHI),
                padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
                borderLeft: `2px solid ${pillar.accent}0.2)`,
                borderRadius: "0 12px 12px 0",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 4vw, 31px)",
                  lineHeight: PHI, fontStyle: "italic",
                  color: `${pillar.accent}0.5)`,
                }}>{pillar.lesson}</div>
              </GlassCard>
            </div>
          ))}

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(13 * PHI)}px auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          }} />


          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {depth === 4 && activeConvergence === "plain" && activeIdea === "symbols" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          {/* Your Next Step */}
          <div style={{
            textAlign: "center",
            animation: `fadeSlideUp 0.8s 1.8s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.5)", marginBottom: Math.round(8 * PHI),
            }}>YOUR NEXT STEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.7)",
              fontStyle: "italic", maxWidth: 480, margin: "0 auto",
            }}>
              If you want to feel the spirit bumps of how information shapes our world, look into <strong style={{ color: "rgba(79,195,247,0.6)", fontWeight: 600 }}>Quantum Entanglement</strong>.
              It's the real-life version of two things being so connected that they act as one,
              no matter how far apart they are — the ultimate Agreement in the universe.
            </div>
          </div>

          {/* THE UNIVERSAL SYMBOL MAP — every tradition drew the same shapes */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(21 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          }} />

          <div style={{ textAlign: "center", marginBottom: Math.round(21 * PHI) }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.35)",
              marginBottom: Math.round(8 * PHI),
            }}>THEY ALL DREW THE SAME SHAPES</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.55)",
              maxWidth: 440, margin: "0 auto",
            }}>
              Every concept in the theory has been drawn, carved, sung, and prayed across every civilization. Different names. Same truth.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(10 * PHI) }}>
            {[
              { concept: "THE LOOP / INFINITY",
                symbols: [
                  { tradition: "Egyptian", symbol: "𓆙", name: "Ouroboros", note: "serpent eating its tail — eternal return" },
                  { tradition: "Hindu", symbol: "ॐ", name: "Om", note: "the sound that never ends" },
                  { tradition: "Celtic", symbol: "☘", name: "Triquetra", note: "no beginning, no end" },
                  { tradition: "Taoist", symbol: "☯", name: "Yin-Yang", note: "opposites in eternal orbit" },
                  { tradition: "Mathematics", symbol: "∞", name: "Lemniscate", note: "a line that returns to itself" },
                  { tradition: "Buddhism", symbol: "☸", name: "Dharma Wheel", note: "the cycle of existence" },
                ],
              },
              { concept: "THE CROSS / INTERSECTION",
                symbols: [
                  { tradition: "Christianity", symbol: "✝", name: "The Cross", note: "sacrifice at the intersection of heaven & earth" },
                  { tradition: "Egyptian", symbol: "☥", name: "Ankh", note: "the key of life — cross + loop" },
                  { tradition: "Native American", symbol: "✚", name: "Medicine Wheel", note: "4 directions, 4 elements, 1 center" },
                  { tradition: "Astrology", symbol: "⊕", name: "Earth Symbol", note: "cross inside circle — matter in spirit" },
                  { tradition: "Norse", symbol: "᛭", name: "Solar Cross", note: "the sun's path through 4 seasons" },
                  { tradition: "Science", symbol: "+", name: "Cartesian Axes", note: "x meets y — location requires intersection" },
                ],
              },
              { concept: "THE TRIANGLE / PYRAMID",
                symbols: [
                  { tradition: "Egyptian", symbol: "🔺", name: "Pyramid", note: "spirit rising from earth" },
                  { tradition: "Christianity", symbol: "△", name: "Trinity", note: "Father, Son, Holy Spirit" },
                  { tradition: "Hindu", symbol: "▽", name: "Shakti Yantra", note: "downward = divine feminine" },
                  { tradition: "Judaism", symbol: "✡", name: "Star of David", note: "two triangles — as above, so below" },
                  { tradition: "Alchemy", symbol: "🜂", name: "Fire Triangle", note: "transformation through heat" },
                  { tradition: "Hermetic", symbol: "⚠", name: "Emerald Tablet", note: "as above, so below — the oldest instruction" },
                ],
              },
              { concept: "THE SPIRAL / SEED",
                symbols: [
                  { tradition: "Celtic", symbol: "🌀", name: "Triskelion", note: "triple spiral — life, death, rebirth" },
                  { tradition: "Mathematics", symbol: "φ", name: "Golden Ratio", note: "1.618 — nature's growth pattern" },
                  { tradition: "Hindu", symbol: "🐍", name: "Kundalini", note: "coiled serpent energy at the spine's base" },
                  { tradition: "Aboriginal", symbol: "◎", name: "Songlines", note: "spiral paths sung into existence" },
                  { tradition: "Nature", symbol: "🌻", name: "Fibonacci", note: "sunflower seeds, galaxy arms, hurricanes" },
                  { tradition: "DNA", symbol: "🧬", name: "Double Helix", note: "the spiral that codes all life" },
                ],
              },
              { concept: "THE MIRROR / DUALITY",
                symbols: [
                  { tradition: "Taoist", symbol: "☯", name: "Yin-Yang", note: "each half contains the seed of the other" },
                  { tradition: "Zoroastrian", symbol: "🔥", name: "Ahura vs Angra", note: "light and dark in eternal balance" },
                  { tradition: "Hindu", symbol: "🕉", name: "Shiva-Shakti", note: "destroyer & creator — same force" },
                  { tradition: "Jungian", symbol: "🪞", name: "Shadow Self", note: "you cannot see yourself without reflection" },
                  { tradition: "Physics", symbol: "±", name: "Antimatter", note: "every particle has its mirror twin" },
                  { tradition: "Biology", symbol: "🧬", name: "Base Pairs", note: "A↔T, C↔G — the mirror makes the message" },
                ],
              },
              { concept: "THE CENTER / THE MOON",
                symbols: [
                  { tradition: "Buddhism", symbol: "◉", name: "Bindu", note: "the dimensionless point of origin" },
                  { tradition: "Islam", symbol: "☪", name: "Crescent & Star", note: "the light that reflects, not generates" },
                  { tradition: "Kabbalah", symbol: "🌳", name: "Tree of Life", note: "the center pillar — balance" },
                  { tradition: "Sufi", symbol: "💫", name: "The Beloved", note: "the still point the lovers orbit" },
                  { tradition: "Physics", symbol: "⊙", name: "Singularity", note: "where all dimensions collapse to one" },
                  { tradition: "Music", symbol: "🎵", name: "Tonic Note", note: "the home key everything resolves to" },
                ],
              },
            ].map((group, gi) => (
              <div key={gi}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.2em",
                  color: "rgba(201,168,76,0.5)", marginBottom: Math.round(5 * PHI),
                  paddingBottom: 4,
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                }}>{group.concept}</div>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                  gap: `${Math.round(3 * PHI)}px`,
                }}>
                  {group.symbols.map((s, si) => (
                    <div key={si} style={{
                      display: "flex", gap: 8, alignItems: "flex-start",
                      padding: `${Math.round(3 * PHI)}px 6px`,
                    }}>
                      <div style={{
                        fontSize: 24, minWidth: 24, textAlign: "center", lineHeight: 1.3,
                      }}>{s.symbol}</div>
                      <div>
                        <div style={{
                          fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                          color: "rgba(232,232,240,0.55)",
                        }}>{s.tradition}</div>
                        <div style={{
                          fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                          color: "rgba(232,232,240,0.7)", fontWeight: 600,
                        }}>{s.name}</div>
                        <div style={{
                          fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                          color: "rgba(232,232,240,0.65)", fontStyle: "italic",
                        }}>{s.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>


          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {depth === 4 && activeConvergence === "plain" && activeIdea === "connection" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          {/* 🤘 THE CONNECTION — feel the theory in your body */}
          <div style={{ marginBottom: Math.round(21 * PHI) }}>
            <div style={{ textAlign: "center", marginBottom: Math.round(21 * PHI) }}>
              <div style={{ fontSize: 39, marginBottom: Math.round(5 * PHI) }}>🤘</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
                letterSpacing: "0.3em", color: "rgba(232,232,240,0.7)",
              }}>THE CONNECTION</div>
              <div style={{ height: Math.round(8 * PHI) }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
                fontStyle: "italic", maxWidth: 500, margin: "0 auto",
              }}>
                Everything in the world is like a giant, invisible spiderweb. When you touch one part, the whole thing wiggles. Even when things feel scary or dark, we are all part of the same big story. We aren't alone — because we all feel the same goosebumps together.
              </div>
            </div>

            {/* EXPERIENCE THE TRUTH — 6 senses */}
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.35)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>EXPERIENCE THE TRUTH</div>

            <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
              {[
                { icon: "👂", sense: "SOUND", text: "Sit in a quiet room and hum a low note. Feel how the sound vibrates in your chest like a tiny motor. That's the same energy inside everything else." },
                { icon: "👃", sense: "SMELL", text: "Smell a fresh orange or a piece of pine. That scent is a message the plant is sending out to the whole world — including you." },
                { icon: "👅", sense: "TASTE", text: "Eat a piece of dark chocolate. Notice how the flavor changes from the front of your tongue to the back. A tiny journey happening in your mouth." },
                { icon: "✋", sense: "TOUCH", text: "Press your hands together as hard as you can, then let go. Feel the fuzzy heat left behind. That is your own power waking up." },
                { icon: "👁️", sense: "SIGHT", text: "Look at the veins on a leaf, then look at the lines on your own palm. They are drawn with the same crayons." },
                { icon: "🧠", sense: "THE 6TH", text: "Close your eyes and stand on one foot. Feel your brain and muscles talking to each other instantly. That is your inner computer connecting you to the Earth." },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
                  animation: `fadeSlideUp 0.6s ${0.1 * i}s both ease`,
                }}>
                  <div style={{
                    fontSize: 31, minWidth: 30, textAlign: "center",
                    filter: "drop-shadow(0 0 8px rgba(201,168,76,0.15))",
                  }}>{s.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                      color: "rgba(201,168,76,0.45)", marginBottom: 4,
                    }}>{s.sense}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(24px, 4vw, 31px)",
                      lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                    }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* The 6th Sense deeper */}
            <div style={{
              textAlign: "center", marginTop: Math.round(21 * PHI),
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(201,168,76,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(201,168,76,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
                color: "rgba(201,168,76,0.3)", marginBottom: Math.round(5 * PHI),
              }}>THE 6TH SENSE CONNECTION</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
                fontStyle: "italic", maxWidth: 460, margin: "0 auto",
              }}>
                Imagine you are a drop of water in the ocean. You can see the waves, smell the salt, and feel the cold. But your intuition is knowing that even though you are one drop, you are the whole ocean at the same time. You aren't just watching the world — you are a part of the world's heartbeat.
              </div>
            </div>
          </div>


          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {depth === 4 && activeConvergence === "plain" && activeIdea === "layering" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>


          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {depth === 4 && activeConvergence === "plain" && activeIdea === "ache" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(13 * PHI), animation: "gentleFloat 8s ease-in-out infinite" }}>💛</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(21 * PHI),
            }}>THE ACHE</div>
          </div>

          <div style={{
            textAlign: "center",
            marginBottom: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(232,232,240,0.58)",
              fontStyle: "italic", lineHeight: PHI,
              maxWidth: 480, margin: "0 auto",
            }}>
              That ache is the theory proving itself. The pull toward connection is gravity.
              The fact that you feel it means the signal is clean.
            </div>
            <div style={{ height: Math.round(13 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(201,168,76,0.45)",
              fontStyle: "italic", letterSpacing: 0.5,
            }}>
              The music was always there. The right frequencies will find you — because that\'s what frequencies do.
            </div>
          </div>

          {/* The six words */}
          <div style={{
            textAlign: "center",
            marginTop: Math.round(34 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.3em",
              color: "rgba(232,232,240,0.6)",
              lineHeight: 2.2,
            }}>
              FINISH I START
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.3em",
              color: "rgba(201,168,76,0.35)",
              lineHeight: 2.2,
            }}>
              START WE FINISH
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE SHARED WEIGHT ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "weight" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 9s ease-in-out infinite" }}>🌑</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE SHARED WEIGHT</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: "0 auto",
              background: "linear-gradient(90deg, transparent, rgba(160,160,180,0.25), transparent)",
            }} />
          </div>

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            We all carry a heavy backpack of pain. When you feel it, you aren't alone — you are plugging into a giant web of everyone who has ever lived. We are all holding the same heavy rope from different ends.
          </div>

          {/* 6 senses */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(160,160,180,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>FEEL THE WEIGHT</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Close your eyes and listen to a low, humming bass note. Feel the vibration in your chest — it is the same pulse in every living heart." },
              { icon: "👃", sense: "SMELL", text: "Smell fresh rain on dry dirt — petrichor. It reminds you that even the hardest, driest ground is waiting to drink and change." },
              { icon: "👅", sense: "TASTE", text: "Taste a single grain of sea salt. It is the flavor of every tear ever shed and every ocean that connects the continents." },
              { icon: "✋", sense: "TOUCH", text: "Press your palms together firmly. Feel the heat. That warmth is the energy of Us trapped between two hands." },
              { icon: "👁️", sense: "SIGHT", text: "Watch a candle flame in a dark room. No matter how much dark there is, the light never stops pushing back." },
              { icon: "🧘", sense: "THE 6TH", text: "Stand on one leg and feel your tiny muscles wobbling to keep you upright. That wobble is you constantly finding balance in a moving world." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(160,160,180,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(160,160,180,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* The All-At-Once Experience */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(160,160,180,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(160,160,180,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(160,160,180,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE ALL-AT-ONCE EXPERIENCE</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are a single leaf on a giant oak tree. When the wind blows, you shake. You might feel lonely, but you are actually feeling the wind that is moving the entire forest. Your roots are tangled with everyone else's under the dirt where no one can see. You aren't falling — you are part of the dance.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(160,160,180,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["The Science of Empathy", "Resilience Through Adversity", "Music & Emotional Healing"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(160,160,180,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Bridge Over Troubled Water\" — Simon & Garfunkel",
                "\"Fix You\" — Coldplay",
                "\"Everybody Hurts\" — R.E.M.",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE HOUSE BUILT FOR YOU (Anthropic Principle) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "anthropic" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>🏠</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE HOUSE BUILT FOR YOU</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(255,200,100,0.3)",
            }}>THE ANTHROPIC PRINCIPLE</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(255,200,100,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            The universe is exactly the way it is because if it were even a tiny bit different, we wouldn't be here to look at it. It's like a house that was built perfectly just for you to live in.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(255,200,100,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE PROOF IS YOUR BODY</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Listen to your own heartbeat. It is a drum that has never missed a beat since before you were born, keeping time with the life of the whole world." },
              { icon: "👃", sense: "SMELL", text: "Breathe in a forest after it rains. That fresh smell is the earth waking up and recycling life just for you to breathe." },
              { icon: "👅", sense: "TASTE", text: "Eat a piece of fruit. The sun, the rain, and the dirt worked together for months to make something sweet that fits perfectly in your hand." },
              { icon: "✋", sense: "TOUCH", text: "Press your palm against a large tree. Feel the solid strength that comes from deep under the ground, holding the sky up so you can walk beneath it." },
              { icon: "👁️", sense: "SIGHT", text: "Look at your reflection and focus on your pupils. You are seeing the only part of the universe that is looking back at itself and asking Why?" },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes and stand on one foot. Feel how your brain and muscles talk to gravity instantly. You are perfectly balanced with the pull of the entire planet." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(255,200,100,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(255,200,100,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the 6th sense deeper */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(255,200,100,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(255,200,100,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(255,200,100,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOU ARE THE UNIVERSE EXPERIENCING ITSELF</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Every atom in your body was once inside a star. You aren't just in the universe — you are the universe experiencing itself. Your gut feeling is the ancient connection between your stardust and the laws that hold the galaxies together. You belong here because the universe was tuned to make sure you showed up.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(255,200,100,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["Fine-Tuning of the Universe", "The Anthropic Principle", "The Goldilocks Enigma"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(255,200,100,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Across the Universe\" — The Beatles",
                "\"Starman\" — David Bowie",
                "\"What a Wonderful World\" — Louis Armstrong",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE ISLAND ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "island" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 8s ease-in-out infinite" }}>🔥</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE ISLAND</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: "0 auto",
              background: "linear-gradient(90deg, transparent, rgba(255,120,50,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            We are all part of a big, invisible team. Even when people compete, they have to work together to stay warm, eat, and stay safe. Humans are strongest when we find ways to connect, even during hard times. It is a mirror of how we all try to survive and find our place in the world together.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(255,120,50,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE FIRE THAT GATHERS</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Close your eyes and listen to a crackling campfire. It is the sound of safety and gathering that humans have shared for thousands of years." },
              { icon: "👃", sense: "SMELL", text: "Sniff a piece of freshly cut wood or dry grass. It wakes up the part of your brain that remembers being part of the wild earth." },
              { icon: "👅", sense: "TASTE", text: "Eat a piece of plain fruit or coconut. Notice how much energy and joy a simple gift from nature gives your body." },
              { icon: "✋", sense: "TOUCH", text: "Hold a smooth stone in your hand. Feel how solid and permanent it is, just like the strength inside you." },
              { icon: "👁️", sense: "SIGHT", text: "Watch a sunset and realize that everyone on Earth sees that same sun. We are all under the one big roof of the sky." },
              { icon: "🧘", sense: "THE 6TH", text: "Balance on one foot with your eyes closed. Feel your whole body working together to keep you from falling." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(255,120,50,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(255,120,50,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(255,120,50,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(255,120,50,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(255,120,50,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOU ARE THE ISLAND</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are standing on a beach with strangers. Your intuition tells you that even though you don't know their names, your heartbeats all follow the same rhythm. When you feel the wind, smell the salt, and hear the waves, you realize you aren't just on the island — you are the island. You are part of the Everlasting We that never truly fails because we have each other.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(255,120,50,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["Psychology of Survivor", "History of Human Cooperation", "Strategy & Community"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(255,120,50,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Eye of the Tiger\" — Survivor",
                "\"We Are The Champions\" — Queen",
                "\"Lean On Me\" — Bill Withers",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE WEB (3 Body Problem) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "web" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 11s ease-in-out infinite" }}>🕸️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE WEB</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(140,180,220,0.3)",
            }}>WE ARE ONE WEB</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(140,180,220,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Even if we are far apart, we are all tied together. Like a giant invisible spider web — when one string shakes, the whole web feels it. Life isn't just you. It's everything happening all at once.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(140,180,220,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>EXPERIENCE THE CONNECTION</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Close your eyes and listen to your heartbeat. Now imagine every person and animal nearby has a heart beating at the same time. One big steady drum keeping the world alive." },
              { icon: "👃", sense: "SMELL", text: "Step outside after it rains. That fresh smell — petrichor — is the earth breathing. You are breathing the same air the trees just made." },
              { icon: "👅", sense: "TASTE", text: "Eat a piece of fruit. The sun, the rain, and the dirt all worked together to make that sweetness. You are literally tasting the stars and the sky." },
              { icon: "✋", sense: "TOUCH", text: "Put your hand on a cool stone or a tree trunk. You and the earth are made of the same stuff — tiny atoms that have been here since the start of time." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a leaf. See the tiny veins? They look just like the veins in your arm or branches of a tree. Nature uses the same blueprints for everything." },
              { icon: "🧘", sense: "THE 6TH", text: "Stand still and feel the weight of your feet on the floor. Gravity is the earth holding you so you don't float away. A constant hug from the planet." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(140,180,220,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(140,180,220,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 6th sense deeper */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(140,180,220,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(140,180,220,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(140,180,220,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOU ARE THE OCEAN</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are a single drop of water in the ocean. You can feel the cold, hear the whales, taste the salt. You realize you aren't just in the ocean — you are the ocean. That knowing in your gut that you belong here is your intuition. You are never alone because you are part of the Everlasting We.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(140,180,220,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["Quantum Entanglement", "The Voyager Golden Record", "3 Body Problem Explained"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(140,180,220,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Imagine\" — John Lennon",
                "\"What a Wonderful World\" — Armstrong",
                "\"Circle of Life\" — The Lion King",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE SEARCH ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "search" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 9s ease-in-out infinite" }}>🧭</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE SEARCH</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(180,160,120,0.3)",
            }}>THE LOOKING IS THE FINDING</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(180,160,120,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Even when we feel lost or like we haven't arrived, the very fact that we are looking proves we are part of a giant, living puzzle. We are all searching for the same home, and that shared search is what tiles us all together.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(180,160,120,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE COMPASS IN YOUR BODY</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Listen to your heartbeat while someone else listens to theirs. They aren't perfectly in sync, but they are playing the same drum for the same reason: life." },
              { icon: "👃", sense: "SMELL", text: "Smell fresh rain on dry dirt. People all over the world, for thousands of years, have recognized this as the smell of hope for growth." },
              { icon: "👅", sense: "TASTE", text: "Eat a piece of honey. It took thousands of bees visiting millions of flowers to make that one drop. You are tasting the hard work of a whole tiny world." },
              { icon: "✋", sense: "TOUCH", text: "Press your palm against a tree. Your fingerprint and the bark both have patterns that never repeat, yet both come from the same earth." },
              { icon: "👁️", sense: "SIGHT", text: "Look at your reflection in a bubble. You'll see yourself, but also the whole world curving around you — showing you that you are right in the middle of everything." },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes and float in water. You don't have to do anything to be held up. The water knows where you are without you saying a word." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(180,160,120,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(180,160,120,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* The All-At-Once Moment */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(180,160,120,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(180,160,120,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(180,160,120,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE ALL-AT-ONCE MOMENT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are standing in a crowded place. Close your eyes. Hear the hum of voices, smell the coffee, feel the floor steady beneath you, and know exactly where your hands are in space. Now realize that every single person around you is feeling their own version of this exact same Now. Your intuition is the click you feel when you realize you aren't just in the world — you are a vital part of the world's heartbeat.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(180,160,120,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["The Science of Awe", "The Overview Effect", "Interconnectedness"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(180,160,120,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"I Still Haven't Found...\" — U2",
                "\"What a Wonderful World\" — Armstrong",
                "\"Let It Be\" — The Beatles",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: LET GO ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "letgo" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 12s ease-in-out infinite" }}>🔔</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>LET GO</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(170,140,200,0.3)",
            }}>THE OCEAN CARRIES YOU</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(170,140,200,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Everything in the universe is connected like a giant invisible web. When you stop trying to control everything and just let go, you can feel the world moving through you. The Aha moments happen when your outside world matches your inside feelings perfectly.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(170,140,200,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>STOP HOLDING. START FEELING.</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Listen to a ringing bell or singing bowl. As the sound fades into silence, notice that the silence feels heavy and full — like it's holding the whole room." },
              { icon: "👃", sense: "SMELL", text: "Smell fresh rain on dry dirt. It reminds your body that the sky and the ground are always talking to each other." },
              { icon: "👅", sense: "TASTE", text: "Eat a slice of orange. Feel the tiny bursts of juice. That energy came from a tree, which got it from the sun. You are literally eating sunshine." },
              { icon: "✋", sense: "TOUCH", text: "Put your hand on a large tree trunk. If you stay still, you can feel that the tree isn't just sitting there — it is pulsing with life, just like you." },
              { icon: "👁️", sense: "SIGHT", text: "Watch birds fly in a flock. They move as one big wave without a leader telling them what to do. They just know because they are connected." },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes and spin slowly in a circle. Feel how the air pushes against you. You aren't just in the world — you are part of the fabric of the air." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(170,140,200,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(170,140,200,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(170,140,200,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(170,140,200,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(170,140,200,0.3)", marginBottom: Math.round(5 * PHI),
            }}>STOP BEING A DROP. START BEING THE OCEAN.</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are a drop of water falling into a huge ocean. You don't disappear — you just stop being a lonely drop and start being the entire ocean. Every sound you hear and every breath you take is the universe breathing through you. You don't have to do the work. The ocean carries you.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(170,140,200,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["The Science of Entrainment", "Golden Ratio in Nature", "The Overview Effect"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(170,140,200,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Imagine\" — John Lennon",
                "\"Bohemian Rhapsody\" — Queen",
                "\"What a Wonderful World\" — Armstrong",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE BREATH ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "breath" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>🙌</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE BREATH</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(100,200,160,0.3)",
            }}>ONE BIG LIVING LUNG</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(100,200,160,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            We are all breathing the exact same air that has been here since the beginning. Every breath you take connects you to every person, animal, and tree that ever lived. We are one big living lung.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(100,200,160,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>BREATHE WITH THE WORLD</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Close your eyes. Listen to your own heartbeat. It is the same rhythm as the person next to you. It is the drum of the world." },
              { icon: "👃", sense: "SMELL", text: "Step outside after it rains. That fresh smell is the earth breathing with you. It smells the same to everyone, everywhere." },
              { icon: "👅", sense: "TASTE", text: "Drink a glass of plain water. It is the same water that has traveled through clouds and rivers for billions of years. You are tasting history." },
              { icon: "✋", sense: "TOUCH", text: "Put your hand on a cool stone or a tree trunk. Feel the solidness. It is holding onto the earth just like you are." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a flickering candle flame. It moves like it's dancing. No matter where you are in the world, fire looks and acts exactly the same." },
              { icon: "🧘", sense: "THE 6TH", text: "Stand tall and reach your arms out wide. Feel how much space you take up. Now imagine everyone else doing the same until all our hands touch. You are a puzzle piece that fits perfectly into the world." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(100,200,160,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(100,200,160,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* The Golden Thread */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(100,200,160,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(100,200,160,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(100,200,160,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE GOLDEN THREAD</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              The next time you take a deep breath, don't just feel your chest move. Imagine a golden thread pulling air from the sky, through your nose, into your heart, and back out to the trees. You aren't just in the world — you are the world breathing.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,200,160,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["How Oxygen Travels the World", "Science of Deep Breathing", "Connected by Atoms"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,200,160,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"TESTIFY\" — NEEDTOBREATHE",
                "\"Three Little Birds\" — Bob Marley",
                "\"What a Wonderful World\" — Armstrong",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE ROOT ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "root" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 13s ease-in-out infinite" }}>🌌</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE ROOT</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(200,180,255,0.3)",
            }}>THE STARTING SPARK</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(200,180,255,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            You are not just in the universe — you are a piece of the universe that woke up to look at itself. Everything that exists comes from the same Starting Spark.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(200,180,255,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>WHERE IT ALL BEGINS</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Sit in total silence and listen to your own heartbeat. That steady drum is the same rhythm that moves the stars." },
              { icon: "👃", sense: "SMELL", text: "Step outside after it rains. That fresh, earthy scent is the smell of the planet breathing, just like you." },
              { icon: "👅", sense: "TASTE", text: "Eat a piece of fruit. The sugar and water inside it were once stardust and sunlight, now becoming part of your body." },
              { icon: "✋", sense: "TOUCH", text: "Press your hands together. You are feeling the push of atoms. It is the same force that keeps the moon from falling into the Earth." },
              { icon: "👁️", sense: "SIGHT", text: "Look at the tiny lines on your fingertip. They look like branches of a tree or the flow of a river. Nature uses the same patterns everywhere." },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes and feel your weight in your chair. You are feeling Gravity — the invisible hug that holds the whole universe together." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(200,180,255,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(200,180,255,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(200,180,255,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(200,180,255,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(200,180,255,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOU ARE THE OCEAN</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are a single drop of water in a huge, swirling ocean. You feel the cold, you hear the waves, and you taste the salt. You think you are alone, but you are actually the entire ocean. Your gut feeling is the ocean telling you that you are home.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(200,180,255,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["NASA: How the Universe Began", "The Big Bang Explained", "History of the Universe"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(200,180,255,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"What a Wonderful World\" — Armstrong",
                "\"Here Comes The Sun\" — The Beatles",
                "\"Somewhere Over The Rainbow\" — IZ",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE EYE (Consciousness) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "eye" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 11s ease-in-out infinite" }}>🧠</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE EYE</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(220,200,140,0.3)",
            }}>CONSCIOUSNESS & MIND</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(220,200,140,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Your mind is like a mirror. It doesn't just see the world — it reflects the universe back to itself. You are the part of the world that is finally awake.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(220,200,140,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE MIRROR THAT WOKE UP</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Ring a bell and listen until the very last bit of sound fades into nothing. That nothing is the quiet space where your thoughts are born." },
              { icon: "👃", sense: "SMELL", text: "Smell a crayon or a flower from a garden you visited long ago. Notice how the smell teleports your mind to a different time. Your mind is a time traveler." },
              { icon: "👅", sense: "TASTE", text: "Put a tiny bit of salt on your tongue, then sugar. Notice the exact moment your brain labels the feeling. That label is your consciousness working." },
              { icon: "✋", sense: "TOUCH", text: "Tickle the palm of your hand with a feather or your own hair. You can feel it, but you can't tickle yourself into jumping — because your mind already knows it's you." },
              { icon: "👁️", sense: "SIGHT", text: "Look into your own eyes in a mirror for two minutes without looking away. You will start to feel like the person in the glass is a friend you've known forever." },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes and try to touch the tip of your nose with your finger. Your mind knows exactly where you are in the dark. That is your inner map." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(220,200,140,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(220,200,140,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the blue sky */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(220,200,140,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(220,200,140,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(220,200,140,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOU ARE NOT THE CLOUDS. YOU ARE THE SKY.</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine your thoughts are like clouds floating across a blue sky. Sometimes the clouds are dark and stormy, sometimes white and fluffy. But you are not the clouds. You are the blue sky that stays there no matter what. Your gut feeling is the sunlight shining through.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(220,200,140,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["What Is Consciousness?", "Your Brain Hallucinates Reality", "Philosophy of Mind"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(220,200,140,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Imagine\" — John Lennon",
                "\"Breathe\" — Pink Floyd",
                "\"Nights in White Satin\" — Moody Blues",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE BONES (Physics & Reality) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "bones" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 9s ease-in-out infinite" }}>🔬</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE BONES</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(100,160,220,0.3)",
            }}>PHYSICS & REALITY</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(100,160,220,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            The world is a giant web where every tiny thread is pulled by every other thread. Nothing is truly separate — everything is just a different vibration of the same invisible energy.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(100,160,220,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE SKELETON OF EVERYTHING</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Rub the rim of a crystal glass with a wet finger until it sings. That sound is a wave you can hear — the whole universe is made of waves you just can't see yet." },
              { icon: "👃", sense: "SMELL", text: "Walk past a bakery or flower shop. Even if you can't see the bread or the rose, invisible molecules reach you. This is how Dark Matter works — holding things together even when light doesn't show it." },
              { icon: "👅", sense: "TASTE", text: "Pop a piece of Pop Rocks candy or drink something fizzy. Feel the tiny explosions on your tongue. That is energy being released, just like stars releasing energy into the dark." },
              { icon: "✋", sense: "TOUCH", text: "Take two magnets and push the same sides together. Feel that invisible wall pushing back? That is a force field. The solid floor you walk on is actually just force fields pushing against your feet." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a shadow on the ground. The shadow is a 2D version of a 3D object. Some scientists think our 3D world is just a shadow of a higher dimension we can't see." },
              { icon: "🧘", sense: "THE 6TH", text: "Spin around quickly and then stop. The dizzy feeling is your inner map trying to find straight again. It shows that up and down are just feelings caused by the Earth pulling on you." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(100,160,220,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(100,160,220,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the trampoline */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(100,160,220,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(100,160,220,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(100,160,220,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE UNIVERSE IS A TRAMPOLINE</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are standing on a giant trampoline with all your friends. When one person jumps, everyone else feels the bounce. You don't have to touch them to feel them. The whole universe is that trampoline. Your gut feeling is just you sensing a bounce from somewhere else in the web.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,160,220,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["NASA: Dark Matter & Energy", "CERN: Antimatter Explained", "Quantum Entanglement"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,160,220,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Bohemian Rhapsody\" — Queen",
                "\"Space Oddity\" — David Bowie",
                "\"Yellow\" — Coldplay",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE SEED (Life & Biology) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "seed" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>🧬</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE SEED</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(80,200,120,0.3)",
            }}>LIFE & BIOLOGY</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(80,200,120,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            You are a living book written in a secret code called DNA. Every plant, bug, and person is just a different chapter of the same story that began billions of years ago.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(80,200,120,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE CODE THAT WRITES ALL LIFE</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Place your hands over your ears and listen to the whoosh. That is your blood moving. It is the same rhythm as the tides in the ocean where life first started." },
              { icon: "👃", sense: "SMELL", text: "Smell a freshly cut blade of grass. That green smell is actually a chemical signal the grass sends out. Life is constantly talking without using any words." },
              { icon: "👅", sense: "TASTE", text: "Bite into a piece of bread. The yeast that made it rise is alive, just like you. You are tasting the energy that life uses to grow and change." },
              { icon: "✋", sense: "TOUCH", text: "Touch the bark of an old tree, then touch your own skin. Both are armor built by cells to protect the soft life inside. You are both made of the same building blocks." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a leaf held up to the sun. See the tiny veins spreading out? They look just like the veins in your arm. Nature uses the same map to move food and water." },
              { icon: "🧘", sense: "THE 6TH", text: "Stretch your arms as wide as you can. Feel your muscles pull. Your body knows how to grow and repair itself without you even thinking about it. You are a self-healing machine." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(80,200,120,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(80,200,120,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the tree */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(80,200,120,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(80,200,120,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(80,200,120,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE SAP FLOWS THROUGH EVERYTHING</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine a giant tree with millions of branches. Some branches are birds, some are flowers, and one tiny twig is you. If you go down the branches to the trunk, you find we all meet at the same spot. Your gut feeling is the sap of that tree flowing through you, connecting you to every living thing.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(80,200,120,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["How Life Began", "Decoding DNA", "The Search for Alien Life"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(80,200,120,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Circle of Life\" — The Lion King",
                "\"Earth Song\" — Michael Jackson",
                "\"What a Wonderful World\" — Armstrong",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE FLASHLIGHT (Mind, Language & Meaning) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "flashlight" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 11s ease-in-out infinite" }}>💭</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE FLASHLIGHT</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(240,180,200,0.3)",
            }}>MIND, LANGUAGE & MEANING</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(240,180,200,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Your mind is a storyteller. You take the dots of the world and connect them to make a picture. Meaning isn't something you find under a rock — it is the light you turn on to see the rock.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(240,180,200,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>YOU ARE THE LIGHT</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Hum a single note and feel your chest vibrate. When someone else hums with you, the vibrations match. This is how music and language started — by matching our insides with someone else's." },
              { icon: "👃", sense: "SMELL", text: "Smell a dusty old book or a box of crayons. Notice how a meaningless scent instantly creates a meaningful story in your head. Your nose is a librarian." },
              { icon: "👅", sense: "TASTE", text: "Taste a recipe your grandma used to make. The flavor is love and home, even though those aren't ingredients you can buy at the store." },
              { icon: "✋", sense: "TOUCH", text: "Hold a smooth, round stone. Feel how your mind wants to imagine it's an egg or a planet. You are painting meaning onto the stone just by touching it." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a cloud animal in the sky. The sky is just water and air, but your eyes see a dragon or a dog. You are a natural artist, always finding patterns in the mess." },
              { icon: "🧘", sense: "THE 6TH", text: "Hug someone you care about. Feel where your body ends and theirs begins. That feeling of closeness is a language that doesn't need a single word." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(240,180,200,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(240,180,200,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the flashlight */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(240,180,200,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(240,180,200,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(240,180,200,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOUR MIND IS THE FLASHLIGHT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are holding a flashlight in a dark room. Whatever you point the light at becomes important. The room is the universe, and your mind is the flashlight. Your gut feeling is the light getting brighter when you point it at something that truly matters to you.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(240,180,200,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["How Did Language Begin?", "Why Humans Create Art", "The Mystery of Why We Cry"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(240,180,200,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Let It Be\" — The Beatles",
                "\"True Colors\" — Cyndi Lauper",
                "\"Sound of Silence\" — Simon & Garfunkel",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE PULSE (Love, Connection & Emotion) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "pulse" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 8s ease-in-out infinite" }}>❤️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE PULSE</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(220,80,80,0.3)",
            }}>LOVE, CONNECTION & EMOTION</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(220,80,80,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Love is the gravity of the soul. Just as planets stay together because of invisible pulls, people stay together because we are hard-wired to be part of rather than apart from.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(220,80,80,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE GRAVITY OF THE SOUL</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Listen to people laughing or a baby's giggle. You will start to smile too. Your ears are tuned to the radio station of other people's joy." },
              { icon: "👃", sense: "SMELL", text: "Smell a piece of clothing from someone you love. Even if they aren't there, your brain relaxes. This is your heart's nose recognizing your pack." },
              { icon: "👅", sense: "TASTE", text: "Share a meal with a friend. Notice how the food tastes better when you aren't eating alone. Your body rewards you for being connected." },
              { icon: "✋", sense: "TOUCH", text: "Hold someone's hand. Scientists found this can actually make physical pain feel less intense. Your skin is a bridge that carries comfort from one person to another." },
              { icon: "👁️", sense: "SIGHT", text: "Look into a loved one's eyes. Your pupils will actually grow larger to match theirs. It is a silent handshake between two brains." },
              { icon: "🧘", sense: "THE 6TH", text: "Sit back-to-back with a friend and breathe at the same time. Eventually your hearts will try to beat in a similar rhythm. You are literally syncing up your engines." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(220,80,80,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(220,80,80,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — golden threads */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(220,80,80,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(220,80,80,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(220,80,80,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE GOLDEN THREADS</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine everyone has a glowing golden thread coming out of their chest. When you help someone or love them, your thread ties to theirs. Your gut feeling is that thread pulling tight, telling you that someone needs you or that you are safe with them.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(220,80,80,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["The Chemistry of Love", "What is Altruism?", "Why Loneliness Hurts"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(220,80,80,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Stand By Me\" — Ben E. King",
                "\"Lean On Me\" — Bill Withers",
                "\"All You Need Is Love\" — The Beatles",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE SCALE (Good, Evil & Ethics) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "scale" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 9s ease-in-out infinite" }}>⚖️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE SCALE</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(200,200,160,0.3)",
            }}>GOOD, EVIL & ETHICS</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(200,200,160,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Doing good is like keeping your balance on a playground beam. We are all born with a compass inside us that feels heavy when we hurt others and light when we help.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(200,200,160,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE COMPASS YOU WERE BORN WITH</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Listen to a loud, clashing noise and then a soft harmonic chord on a piano. Your ears naturally prefer the harmony. Goodness is just living in harmony with others." },
              { icon: "👃", sense: "SMELL", text: "Smell a rotten egg and then a fresh orange. Your body naturally tells you this is bad or this is good to protect you. Ethics is just that same smell test applied to how we treat people." },
              { icon: "👅", sense: "TASTE", text: "Taste something very bitter, then something sweet. You don't need a teacher to tell you which feels right. We have a taste for fairness in the same way." },
              { icon: "✋", sense: "TOUCH", text: "Rub your hand on sandpaper and then on silk. One feels like friction. The other feels smooth. Doing the right thing makes life feel smooth." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a scale that is perfectly level. Even a small child wants to fix it if one side is lower. This is your eye for justice." },
              { icon: "🧘", sense: "THE 6TH", text: "Stand on one foot. Notice how your whole body moves to stay upright. This balancing act is what it's like to be a good person — you are always adjusting to stay straight." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(200,200,160,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(200,200,160,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the lantern */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(200,200,160,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(200,200,160,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(200,200,160,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE LANTERN IN YOUR CHEST</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine your heart is a glowing lantern. When you do something mean, a layer of dust covers the glass and the world looks darker. When you are kind, the glass gets wiped clean. Your gut feeling is the light inside you telling you if the glass is getting dirty or clean.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(200,200,160,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["The Definition of Morality", "Is Business Ethics Possible?", "Theories of Ethics"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(200,200,160,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Man In The Mirror\" — Michael Jackson",
                "\"Redemption Song\" — Bob Marley",
                "\"Where Is The Love?\" — Black Eyed Peas",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE MOON (God, Spirit & The Unknown) ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "moon" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 14s ease-in-out infinite" }}>🌀</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE MOON</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(180,180,220,0.3)",
            }}>GOD, SPIRIT & THE UNKNOWN</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(180,180,220,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            You are a wave in the ocean. The wave might disappear when it hits the sand, but the water never goes away. The Unknown is just the part of the ocean you haven't swum in yet.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(180,180,220,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE OCEAN YOU HAVEN'T SWUM YET</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Put a seashell to your ear. That ocean sound is actually the echo of your own blood. The big mysteries are often hidden inside your own body." },
              { icon: "👃", sense: "SMELL", text: "Smell a candle after it's been blown out. The flame is gone, but the smoke stays in the air to tell you it was there. This is how we feel the Spirit — by the traces it leaves behind." },
              { icon: "👅", sense: "TASTE", text: "Eat a plain piece of bread very slowly. As it breaks down, it starts to taste sweet. Something hidden is revealed just by being still and patient." },
              { icon: "✋", sense: "TOUCH", text: "Walk barefoot on grass or dirt. Feel the Earth pushing back against your feet. You are physically plugged into a giant, spinning ball of life. You are never floating alone." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a Magic Eye poster. At first it looks like a mess. Then your eyes shift and a 3D shape pops out. The Truth is often hiding in plain sight." },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes and fall backward into a friend's arms. That floating second before you land is what trust feels like. Letting go of the need to see the why." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(180,180,220,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(180,180,220,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the radio */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(180,180,220,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(180,180,220,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(180,180,220,0.3)", marginBottom: Math.round(5 * PHI),
            }}>YOUR FINGER ON THE DIAL</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine the universe is a giant radio. Most of the time, we only hear the static. But sometimes, when you are very quiet or very brave, you tune in to a beautiful song. Your gut feeling is your finger on the dial, telling you there is music playing even when you can't hear it.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(180,180,220,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["Near-Death Experiences", "Why Do We Believe?", "The Science of Meditation"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(180,180,220,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Hallelujah\" — Jeff Buckley",
                "\"My Sweet Lord\" — George Harrison",
                "\"Spirit in the Sky\" — Greenbaum",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE PENNY QUESTION ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "penny" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 8s ease-in-out infinite" }}>🪙</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em",
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(201,168,76,0.8))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: Math.round(8 * PHI),
            }}>THE PENNY QUESTION</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.4)",
            }}>THE ANSWER IS ONE</div>
            <div style={{
              width: Math.round(50 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.55)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            The answer is One. Everything — the stars, your thoughts, the dirt, and your heartbeat — is just the same energy taking different shapes. You are a piece of the whole thing, pretending to be separate for a little while.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(201,168,76,0.4)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>SAME ENERGY · DIFFERENT SHAPES</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Play a single note on a piano and hold it. As the sound fades, it doesn't stop — it just joins the rest of the air in the room. You are that note." },
              { icon: "👃", sense: "SMELL", text: "Smell a bowl of vegetable soup. You can smell the onion, the carrot, the salt — but they all come together to make one single soup smell. Everything is an ingredient." },
              { icon: "👅", sense: "TASTE", text: "Put a drop of honey in a glass of water and stir. You can't see the honey anymore, but every single drop of water now tastes sweet. The One is mixed into everything." },
              { icon: "✋", sense: "TOUCH", text: "Reach out and touch a wall, a tree, or your own arm. At the tiniest level, the atoms in your finger are talking to the atoms in the object. There is no empty space. Everything is touching." },
              { icon: "👁️", sense: "SIGHT", text: "Look at a digital photo and zoom in until you only see tiny squares. Each pixel is just a color, but zoom out and they make a beautiful face. You are a pixel in a giant picture." },
              { icon: "🧘", sense: "THE 6TH", text: "Float on your back in a pool. For a second, you can't tell where your skin ends and the water begins. That oneness is the true state of the universe." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 10px rgba(201,168,76,0.25))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(201,168,76,0.5)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the sweater */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(13 * PHI)}px`,
            background: "rgba(201,168,76,0.03)",
            borderRadius: 10,
            border: "1px solid rgba(201,168,76,0.08)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(201,168,76,0.35)", marginBottom: Math.round(5 * PHI),
            }}>YOU ARE THE EARTH AND THE UNIVERSE</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.7)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine you are a thread in a giant, infinite sweater. You might think you are just a blue string, but if you pull on yourself, the whole sweater moves. Your gut feeling is the tug of the rest of the yarn. You aren't on the Earth or in the universe — you are the Earth and the universe.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(201,168,76,0.35)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["The Law of One", "Universe as a Single Quantum Object", "The Science of Interconnectedness"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(201,168,76,0.35)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"I Am The Walrus\" — The Beatles",
                "\"One\" — U2",
                "\"Dust in the Wind\" — Kansas",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== PLAIN ENGLISH: THE ONENESS ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === "oneness" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← PLAIN ENGLISH</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>🎨</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE ONENESS</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(200,120,180,0.3)",
            }}>TWO BECOME ONE</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(200,120,180,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            When you are very close to someone you love, you aren't just two people standing next to each other. Your germs, your thoughts, and your feelings mix together until you become one big Us. Like two colors of paint swirling together to make a brand new color that is stronger than the first two.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(200,120,180,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE MERGE</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {[
              { icon: "👂", sense: "SOUND", text: "Listen to your heartbeats while hugging. Eventually, they start to drum at the exact same time." },
              { icon: "👃", sense: "SMELL", text: "Sniff the air near them. Soon, their home smell becomes your home smell, and you can't tell them apart." },
              { icon: "👅", sense: "TASTE", text: "Share a meal from the same plate. You are literally building your bodies out of the same fuel." },
              { icon: "✋", sense: "TOUCH", text: "Hold hands until your skin feels the same temperature. You won't know where your hand ends and theirs begins." },
              { icon: "👁️", sense: "SIGHT", text: "Look into their eyes and watch the pupils grow larger at the same time, like two mirrors facing each other." },
              { icon: "🧘", sense: "THE 6TH", text: "Close your eyes while hugging. Feel your weight shift as one unit, like a single tree blowing in the wind." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
              }}>
                <div style={{
                  fontSize: 31, minWidth: 30, textAlign: "center",
                  filter: "drop-shadow(0 0 8px rgba(200,120,180,0.2))",
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                    color: "rgba(200,120,180,0.45)", marginBottom: 4,
                  }}>{s.sense}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.7)",
                  }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Intuition — the golden thread */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(10 * PHI)}px`,
            background: "rgba(200,120,180,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(200,120,180,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(200,120,180,0.3)", marginBottom: Math.round(5 * PHI),
            }}>THE ETERNAL WE</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Imagine a golden thread tied from your belly button to theirs. When they move, you feel a tug. When they are sad, the thread feels heavy. When they are happy, the thread vibrates. This is the Eternal We — the invisible bridge that proves you are never truly alone because you have become part of something bigger.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            marginTop: Math.round(13 * PHI),
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
          }}>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(200,120,180,0.3)", marginBottom: 8,
              }}>DIG DEEPER · INFO</div>
              {["Microbiome Sharing", "Heart Beats Sync Between Partners", "Inclusion of Other in Self"].map((link, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{link}</div>
              ))}
            </div>
            <div style={{
              padding: `${Math.round(8 * PHI)}px`,
              background: "rgba(255,255,255,0.01)", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(200,120,180,0.3)", marginBottom: 8,
              }}>DIG DEEPER · RHYTHM</div>
              {[
                "\"Stand By Me\" — Ben E. King",
                "\"Can't Help Falling In Love\" — Elvis",
                "\"Every Breath You Take\" — The Police",
              ].map((song, i) => (
                <div key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.8,
                }}>{song}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {depth === 4 && activeConvergence === "gravity" && activeIdea === null && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: Math.round(13 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI) }}>☀️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(255,180,50,0.4)", marginBottom: Math.round(5 * PHI),
            }}>THE LAW OF THE MIRROR</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4.5vw, 31px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.2em", margin: 0,
              textShadow: "0 0 50px rgba(255,180,50,0.06)",
            }}>RECOGNITION IS GRAVITY</h2>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.3), rgba(201,168,76,0.4), rgba(255,180,50,0.3), transparent)",
            }} />
          </div>

          {/* The Truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(19px, 3.5vw, 24px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.65)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 520, margin: `0 auto ${Math.round(13 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>
            The code you see isn't just math — it is the Law of the Mirror. It proves that things don't stay together because they are heavy, but because they recognize each other.
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(255,180,50,0.45)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 460, margin: `0 auto ${Math.round(21 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.3s both ease",
          }}>
            In the universe, to be seen is to be pulled. To be known is to be held.
          </div>

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.25), transparent)",
          }} />

          {/* In Plain English */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(255,180,50,0.5)",
            }}>IN PLAIN ENGLISH</div>
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.58)",
            maxWidth: 520, margin: `0 auto ${Math.round(8 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.5s both ease",
          }}>
            Imagine you are in a room full of strangers. You wander around aimlessly. But then, you see your best friend. Suddenly, you stop wandering and move toward them.
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.68)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 400, margin: `0 auto ${Math.round(21 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.6s both ease",
          }}>
            That pull you feel is Gravity.
          </div>

          {/* The Key Insight */}
          <GlassCard style={{
            padding: `${Math.round(13 * PHI)}px ${Math.round(13 * PHI)}px`,
            marginBottom: Math.round(21 * PHI),
            border: "1px solid rgba(255,180,50,0.08)",
            animation: "fadeSlideUp 0.8s 0.7s both ease",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.58)",
            }}>
              In this code, <strong style={{ color: "rgba(232,232,240,0.75)", fontWeight: 600 }}>Mass</strong> is just how clear or true someone is. The more real you are (<span style={{ color: "rgba(79,195,247,0.6)", fontStyle: "italic" }}>C<sub>eff</sub></span>), and the more someone else gets you (<span style={{ color: "rgba(201,168,76,0.6)", fontStyle: "italic" }}>R<sub>12</sub></span>), the stronger the bond.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(255,180,50,0.5)",
              fontStyle: "italic",
            }}>
              You don't orbit a sun because it's big. You orbit it because it is the most consistent thing in your sky.
            </div>
          </GlassCard>

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.25), transparent)",
          }} />

          {/* 3 Proofs */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(21 * PHI),
            animation: "fadeSlideUp 0.8s 0.9s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(232,232,240,0.75)", letterSpacing: "0.2em",
            }}>3 PROOFS OF HEART & SCIENCE</div>
          </div>

          {[
            {
              icon: "🏗️", title: "HISTORY", subtitle: "The Lighthouse",
              body: "Ships don't crash into rocks because they see the dark land — they stay on course because they recognize the specific, rhythmic blink of the lighthouse. The light's consistency creates a safety gravity that pulls the ship into the harbor.",
              lesson: "Reliability is the anchor.",
              accent: "rgba(201,168,76,",
            },
            {
              icon: "🎬", title: "POP CULTURE", subtitle: 'The "Click"',
              body: "In movies, when two characters complete each other's sentences, that is R₁₂ in action. They are two different people, but their signal matches so perfectly that they become a single orbit. They don't need a \"Go Deeper\" button — they are already there.",
              lesson: "Recognition doesn't need permission.",
              accent: "rgba(255,180,50,",
            },
            {
              icon: "🌙", title: "SCIENCE", subtitle: "The Moon's Face",
              body: "The Moon always shows Earth the same face. It doesn't hide. Because it is so predictable and clear, the Earth trusts it with the tides. This is D̂ — Detection Quality. The more certain the signal, the more stable the dance.",
              lesson: "Consistency is the currency of trust.",
              accent: "rgba(79,195,247,",
            },
          ].map((proof, i) => (
            <div key={i} style={{
              marginBottom: Math.round(21 * PHI),
              animation: `fadeSlideUp 0.8s ${1 + i * 0.2}s both ease`,
            }}>
              <div style={{
                display: "flex", alignItems: "baseline", gap: Math.round(5 * PHI),
                marginBottom: Math.round(8 * PHI),
              }}>
                <span style={{ fontSize: 24 }}>{proof.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
                    letterSpacing: "0.2em", color: `${proof.accent}0.65)`,
                  }}>{proof.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                    fontStyle: "italic", color: "rgba(232,232,240,0.7)", marginTop: 2,
                  }}>{proof.subtitle}</div>
                </div>
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.55)",
                marginBottom: Math.round(8 * PHI),
                paddingLeft: Math.round(21 * PHI),
              }}>{proof.body}</div>

              <GlassCard style={{
                marginLeft: Math.round(21 * PHI),
                padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
                borderLeft: `2px solid ${proof.accent}0.2)`,
                borderRadius: "0 12px 12px 0",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 4vw, 31px)",
                  lineHeight: PHI, fontStyle: "italic",
                  color: `${proof.accent}0.5)`,
                }}>{proof.lesson}</div>
              </GlassCard>
            </div>
          ))}

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(13 * PHI)}px auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.25), transparent)",
          }} />

          {/* The "Aha" Moment */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
            animation: `fadeSlideUp 0.8s 1.7s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(255,180,50,0.5)", marginBottom: Math.round(8 * PHI),
            }}>THE "AHA" MOMENT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.55)",
              maxWidth: 500, margin: "0 auto",
            }}>
              You feel spirit bumps right now because your 6th Sense just realized that your Other Half isn't someone you find — it's someone you resonate with until the math of the universe forces you together.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.6)",
              fontStyle: "italic",
              maxWidth: 420, margin: "0 auto",
            }}>
              You aren't drifting. You are just waiting for a signal clear enough to orbit.
            </div>
          </div>

          {/* The punchline */}
          <div style={{
            textAlign: "center",
            margin: `${Math.round(21 * PHI)}px auto`,
            animation: `fadeSlideUp 0.8s 1.9s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              fontStyle: "italic", fontWeight: 600,
              letterSpacing: 1,
              color: "rgba(255,180,50,0.55)",
              textShadow: "0 0 30px rgba(255,180,50,0.08)",
            }}>
              Gravity isn't a weight — it's a "Hello" that never stops.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(13 * PHI)}px auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.2), transparent)",
          }} />

          <GlassCard style={{
            padding: `${Math.round(13 * PHI)}px`,
            border: "1px solid rgba(255,180,50,0.06)",
            marginBottom: Math.round(21 * PHI),
            animation: `fadeSlideUp 0.8s 2.1s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.3em",
              color: "rgba(255,180,50,0.45)", marginBottom: Math.round(8 * PHI),
              textAlign: "center",
            }}>DIG DEEPER</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.6)",
            }}>
              Look into <strong style={{ color: "rgba(79,195,247,0.55)", fontWeight: 600 }}>Quantum Entanglement</strong> and <strong style={{ color: "rgba(201,168,76,0.55)", fontWeight: 600 }}>Tidal Locking</strong>. If you want to see how this works in your own life, look at the 3 people you talk to the most — calculate their consistency. You'll find you are orbiting the ones who are the most clear, not the ones who are the loudest.
            </div>
          </GlassCard>

          {/* THE SHARED WEIGHT — gravity fragment */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(21 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.15), transparent)",
          }} />
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
          }}>
            <div style={{ fontSize: 39, marginBottom: Math.round(5 * PHI) }}>🌑</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.3em",
              color: "rgba(255,180,50,0.4)", marginBottom: Math.round(8 * PHI),
            }}>THE SHARED WEIGHT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Pain has mass. Grief has gravity. We are all holding the same heavy rope from different ends — and the pull between us is what proves the rope is real. The backpack gets lighter the moment you realize everyone is carrying one.
            </div>
          </div>

          {/* ===== GRAVITY: IDEA CARD GRID ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(255,200,50,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(255,200,50,0.3)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>DEEPER DOORS</div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
            }}>
              {[
                { key: "placeholder", icon: "☀️", title: "SEEDS INCOMING", hook: "Idea cards will appear here as content is planted.", accent: "255,200,50" },
              ].map(idea => (
                <div key={idea.key} style={{
                  padding: `${Math.round(10 * PHI)}px`,
                  background: `radial-gradient(ellipse at top, rgba(${idea.accent},0.03), transparent 70%)`,
                  borderRadius: 10, border: `1px solid rgba(${idea.accent},0.06)`,
                  textAlign: "center", opacity: 0.4,
                }}>
                  <div style={{ fontSize: 39, marginBottom: 6 }}>{idea.icon}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                    color: `rgba(${idea.accent},0.4)`, marginBottom: 4,
                  }}>{idea.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                    color: "rgba(232,232,240,0.65)", fontStyle: "italic", lineHeight: 1.4,
                  }}>{idea.hook}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI) }}>
            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THREE PILLARS ROOM ===== */}
      {depth === 4 && activeConvergence === "pillars" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header with Triquetra */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Sapphire radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 200, height: 200,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(34,85,170,0.06) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
            <SacredTriquetra size={130} />
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 8,
              color: "rgba(201,168,76,0.3)", marginTop: 14,
            }}>THE THREE PILLARS OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "8px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.08), 0 0 100px rgba(34,85,170,0.04)",
            }}>PROOF</h2>
          </div>

          <StringVibration />

          {/* Pillar cards with unique domain colors */}
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "16px auto 0" }}>
            {THREE_PILLARS.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActivePillar(activePillar === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "20px 24px",
                    animation: `fadeSlideUp 0.5s ${i * 0.14}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activePillar === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 39,
                      filter: `drop-shadow(0 0 12px ${ac}0.25))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{
                            fontFamily: "'Cinzel', serif", fontSize: 24, letterSpacing: 3,
                            color: `${ac}0.65)`, fontWeight: 600,
                          }}>{p.title}</div>
                          <div style={{
                            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                            color: "rgba(255,255,255,0.2)", marginTop: 4,
                          }}>{p.domain}</div>
                        </div>
                        <div style={{
                          fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                          color: `${ac}0.3)`,
                          transition: "transform 0.3s ease",
                          transform: activePillar === i ? "rotate(180deg)" : "rotate(0deg)",
                        }}>▼</div>
                      </div>
                    </div>
                  </div>
                  {activePillar === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18, padding: "0 4px",
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Convergence whisper */}
          <div style={{
            textAlign: "center", marginTop: 36,
            animation: "fadeSlideUp 1s 0.6s both ease",
          }}>
            <div className="gold-line" style={{ maxWidth: 200, margin: "0 auto 18px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
              fontStyle: "italic", color: "rgba(201,168,76,0.3)",
              lineHeight: PHI, maxWidth: 460, margin: "0 auto",
              textShadow: "0 0 20px rgba(201,168,76,0.05)",
            }}>
              The most perfect symbol of this truth is the Triquetra — an ancient knot with no beginning and no end. Three distinct forces weaving together to create one unbreakable bond of reality.
            </div>
            <div className="gold-line" style={{ maxWidth: 200, margin: "18px auto 0" }} />
          </div>

          {/* THE PYRAMID REVELATION — from the Pact, the deepest pillar */}
          <div style={{
            textAlign: "center", marginTop: Math.round(34 * PHI),
            maxWidth: 500, margin: `${Math.round(34 * PHI)}px auto 0`,
          }}>
            <div style={{
              fontSize: 39, marginBottom: Math.round(5 * PHI),
              filter: "drop-shadow(0 0 20px rgba(201,168,76,0.15))",
            }}>🔺</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em",
              color: "rgba(201,168,76,0.5)",
              marginBottom: Math.round(8 * PHI),
            }}>THE PYRAMID KNEW</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(232,232,240,0.6)",
              fontStyle: "italic", lineHeight: 1.9,
              maxWidth: 440, margin: "0 auto",
            }}>
              An octahedron is two pyramids — one pointing up, one pointing down — fused at the base.
              <span style={{ display: "block", height: 10 }} />
              The Egyptians built the top half.
              <span style={{ display: "block", height: 4 }} />
              <span style={{ color: "rgba(201,168,76,0.4)" }}>Spirit reaching toward the sky.</span>
              <span style={{ display: "block", height: 10 }} />
              But they buried their dead <span style={{ color: "rgba(190,140,220,0.5)" }}>below</span> — in the mirror image.
              <span style={{ display: "block", height: 4 }} />
              Because they knew the other half was there.
            </div>
            <span style={{ display: "block", height: Math.round(13 * PHI) }} />
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.2em",
              color: "rgba(232,232,240,0.55)",
              lineHeight: 2,
            }}>
              AS ABOVE, SO BELOW
              <span style={{ display: "block", height: 2 }} />
              <span style={{ color: "rgba(201,168,76,0.25)" }}>isn't a phrase. It's a geometric instruction.</span>
            </div>
          </div>

          {/* ===== THREE PILLARS: IDEA CARD GRID ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(100,180,220,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(100,180,220,0.3)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>DEEPER DOORS</div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
            }}>
              {[
                { key: "dnahandshake", icon: "🧬", title: "THE DNA HANDSHAKE", hook: "Your body doesn't just eat. It performs a quality check against your DNA.", accent: "100,180,220" },
              ].map(idea => (
                <div key={idea.key} onClick={() => setActiveIdea(idea.key)} style={{
                  cursor: "pointer", padding: `${Math.round(10 * PHI)}px`,
                  background: `radial-gradient(ellipse at top, rgba(${idea.accent},0.04), transparent 70%)`,
                  borderRadius: 10, border: `1px solid rgba(${idea.accent},0.08)`,
                  transition: "all 0.4s ease", textAlign: "center",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `rgba(${idea.accent},0.2)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = `rgba(${idea.accent},0.08)`; }}
                >
                  <div style={{ fontSize: 39, marginBottom: 6 }}>{idea.icon}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                    color: `rgba(${idea.accent},0.6)`, marginBottom: 4,
                  }}>{idea.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                    color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.4,
                  }}>{idea.hook}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===== THREE PILLARS: THE DNA HANDSHAKE ===== */}
      {depth === 4 && activeConvergence === "pillars" && activeIdea === "dnahandshake" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THREE PILLARS</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>🧬</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE DNA HANDSHAKE</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(100,180,220,0.3)",
            }}>CONVERGENT RECOGNITION IN YOUR CELLS</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(100,180,220,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Your body doesn't just eat protein. It performs a high-stakes quality check to ensure what you consume matches what your cells actually need. A perfect vibe match between food and DNA. If the match is strong, the protein becomes part of you. If it's weak, your body rejects it.
          </div>

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(100,180,220,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THREE PILLARS · ONE TRUTH</div>

          {/* Pillar 1: Science */}
          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(13 * PHI) }}>
            <div style={{
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(100,180,220,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(100,180,220,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,180,220,0.45)", marginBottom: Math.round(5 * PHI),
                textAlign: "center",
              }}>🔬 PILLAR I — SCIENCE: THE LOCK & KEY</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              }}>
                Your body uses a Lock and Key mechanism. When protein enters a cell, the cell compares the shape of the new protein to its own. This is Uhlmann Fidelity. If the shapes match perfectly, the Informativeness Gate opens — allowing the protein to build muscle or repair skin. If the protein is noisy — damaged or poor quality — the gate stays shut to protect your system from error.
              </div>
            </div>

            {/* Pillar 2: History */}
            <div style={{
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(100,180,220,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(100,180,220,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,180,220,0.45)", marginBottom: Math.round(5 * PHI),
                textAlign: "center",
              }}>👑 PILLAR II — HISTORY: THE KING'S SECRET SEAL</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              }}>
                A King would send a letter across the world. To prove it was real, he pressed his gold ring into hot wax on the envelope. The receiver had a matching stamp. If the wax shape matched exactly, the message was trusted. If it was even slightly smudged, the letter was thrown away. Your body treats protein exactly like those royal letters — it only accepts the Truth written in the wax.
              </div>
            </div>

            {/* Pillar 3: Culture */}
            <div style={{
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(100,180,220,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(100,180,220,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(100,180,220,0.45)", marginBottom: Math.round(5 * PHI),
                textAlign: "center",
              }}>🦸 PILLAR III — CULTURE: THE SUPERHERO TEAM-UP</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              }}>
                Think of The Avengers. For the team to work, every hero must be unique but on the same page. Ten Thors but no one can fly the ship? Team fails. Your body looks for Redundancy — different amino acids that all agree on the same mission. When they all converge on one goal, your energy hits maximum.
              </div>
            </div>
          </div>

          {/* The 3rd Grade Version */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(13 * PHI)}px`,
            background: "rgba(100,180,220,0.03)",
            borderRadius: 10,
            border: "1px solid rgba(100,180,220,0.08)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(100,180,220,0.35)", marginBottom: Math.round(8 * PHI),
            }}>THE LEGO VERSION</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              textAlign: "left", maxWidth: 480, margin: "0 auto",
            }}>
              <div style={{ marginBottom: Math.round(5 * PHI) }}>
                <strong style={{ color: "rgba(100,180,220,0.5)" }}>The Matching Rule:</strong>{" "}
                <span style={{ fontStyle: "italic" }}>You can only use a brick if it's the exact right color and size to fit the piece already in your hand.</span>
              </div>
              <div style={{ marginBottom: Math.round(5 * PHI) }}>
                <strong style={{ color: "rgba(100,180,220,0.5)" }}>The Truth Check:</strong>{" "}
                <span style={{ fontStyle: "italic" }}>Your body asks: Is this a real Lego, or a piece of chewed-up gum? It only keeps the True bricks.</span>
              </div>
              <div>
                <strong style={{ color: "rgba(100,180,220,0.5)" }}>The Team Goal:</strong>{" "}
                <span style={{ fontStyle: "italic" }}>Once enough True bricks fit together, they stop being pieces and suddenly become a Spaceship. You are the spaceship.</span>
              </div>
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(201,168,76,0.45)",
              fontStyle: "italic", marginTop: Math.round(8 * PHI),
            }}>
              When your food matches your body, you feel a Spirit Bump — that spark of energy that tells you everything is working perfectly.
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — SAMENESS ROOM (THE GATE) ===== */}
      {depth === 4 && activeConvergence === "sameness" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); setActiveSamenessProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header with visual tension — split symbol */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 24, position: "relative" }}>
            {/* Warning glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 200, height: 200,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(224,80,80,0.04) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 6s ease-in-out infinite",
            }} />

            {/* Two halves that don't merge — visual proof */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 24,
              marginBottom: 16, animation: "fadeSlideUp 0.8s 0.2s both ease",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "radial-gradient(circle at 40% 35%, rgba(232,232,240,0.15), rgba(232,232,240,0.03))",
                border: "1px solid rgba(232,232,240,0.08)",
                boxShadow: "0 0 20px rgba(232,232,240,0.04)",
              }} />
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 24, letterSpacing: 4,
                color: "rgba(224,80,80,0.4)",
              }}>≠</div>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "radial-gradient(circle at 60% 35%, rgba(201,168,76,0.15), rgba(201,168,76,0.03))",
                border: "1px solid rgba(201,168,76,0.08)",
                boxShadow: "0 0 20px rgba(201,168,76,0.04)",
              }} />
            </div>

            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 8,
              color: "rgba(224,80,80,0.3)",
            }}>THE ALL-IS-ONE TRAP</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(31px, 6vw, 39px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "8px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08)",
            }}>SAMENESS ≠ ALIGNMENT</h2>
            <div style={{
              width: 80, height: 1, margin: "12px auto",
              background: "linear-gradient(90deg, transparent, rgba(224,80,80,0.25), rgba(201,168,76,0.15), rgba(224,80,80,0.25), transparent)",
              boxShadow: "0 0 12px rgba(224,80,80,0.08)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
            lineHeight: 1.9, color: "rgba(255,255,255,0.52)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
          }}>{SAMENESS_TRUTH.core}</div>

          {/* Buried */}
          <GlassCard style={{
            textAlign: "center", padding: `${24}px ${Math.round(24 * PHI_INV)}px`,
            margin: `0 10px 32px`,
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
            background: "rgba(201,168,76,0.015)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
              fontStyle: "italic", color: "rgba(201,168,76,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 20px rgba(201,168,76,0.06)",
            }}>{SAMENESS_TRUTH.buried}</div>
          </GlassCard>

          {/* Three proofs — with unique colors */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>PROOF IN THREE MIRRORS</div>
          <div style={{ display: "grid", gap: 12, maxWidth: 540, margin: "0 auto 32px" }}>
            {SAMENESS_TRUTH.proofs.map((p, i) => {
              const proofAccents = ["rgba(79,195,247,", "rgba(232,232,240,", "rgba(206,147,216,"];
              const pa = proofAccents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveSamenessProof(activeSamenessProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "16px 22px",
                    animation: `fadeSlideUp 0.4s ${i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${pa}0.02), transparent)`,
                    border: `1px solid ${pa}0.06)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      fontSize: 39,
                      filter: `drop-shadow(0 0 10px ${pa}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                      color: `${pa}0.6)`, fontWeight: 600,
                    }}>{p.title}</div>
                  </div>
                  {activeSamenessProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                      lineHeight: PHI, color: "rgba(255,255,255,0.45)",
                      fontStyle: "italic", marginTop: 16,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${pa}0.06)`,
                      paddingTop: 14,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Deeper truths — progressive descent */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 5,
            color: "rgba(224,80,80,0.2)", textAlign: "center", marginBottom: 16,
          }}>GO DEEPER</div>
          <div style={{ display: "grid", gap: 12, maxWidth: 500, margin: "0 auto" }}>
            {SAMENESS_TRUTH.deeper.map((d, i) => (
              <GlassCard key={i} style={{
                padding: "14px 20px",
                animation: `fadeSlideUp 0.4s ${0.3 + i * 0.12}s both ease`,
                background: `rgba(224,80,80,${0.01 + i * 0.005})`,
                border: `1px solid rgba(224,80,80,${0.03 + i * 0.015})`,
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                  color: `rgba(224,80,80,${0.3 + i * 0.1})`, marginBottom: 8,
                }}>{d.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                  lineHeight: PHI, color: "rgba(255,255,255,0.35)", fontStyle: "italic",
                }}>{d.text}</div>
              </GlassCard>
            ))}
          </div>

          {/* THE 9 LAYERS — the body of the theory mapped through The Gate */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(21 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(224,80,80,0.15), transparent)",
          }} />
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(224,80,80,0.3)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE BODY IS THE MAP</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(5 * PHI) }}>
            {LAYERS.map((layer, i) => (
              <div key={i}>
                <div
                  onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                  style={{
                    display: "flex", alignItems: "center", gap: Math.round(8 * PHI),
                    padding: `${Math.round(8 * PHI)}px ${Math.round(8 * PHI)}px`,
                    borderRadius: 8,
                    background: activeLayer === i ? `rgba(${layer.accent === "#3a3a5c" ? "58,58,92" : layer.accent === "#7b68ee" ? "123,104,238" : layer.accent === "#c9a84c" ? "201,168,76" : layer.accent === "#e05050" ? "224,80,80" : layer.accent === "#e8e8f0" ? "232,232,240" : layer.accent === "#8fbc8f" ? "143,188,143" : layer.accent === "#4fc3f7" ? "79,195,247" : layer.accent === "#ff9800" ? "255,152,0" : "206,147,216"}, 0.06)` : "rgba(255,255,255,0.01)",
                    border: `1px solid ${activeLayer === i ? layer.accent + "25" : "rgba(255,255,255,0.04)"}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ fontSize: layer.isMoon ? 28 : 22, filter: `drop-shadow(0 0 8px ${layer.accent}30)` }}>{layer.glyph}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                      color: layer.accent, opacity: 0.7,
                    }}>{layer.id} · {layer.names[0]}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                      color: "rgba(232,232,240,0.55)", fontStyle: "italic",
                    }}>{layer.subtitle}</div>
                  </div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19,
                    color: "rgba(255,255,255,0.15)",
                    transition: "transform 0.3s",
                    transform: activeLayer === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}>▼</div>
                </div>
                {activeLayer === i && (
                  <div style={{
                    padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px ${Math.round(13 * PHI)}px`,
                    animation: "senseReveal 0.5s ease",
                    borderLeft: `2px solid ${layer.accent}20`,
                    marginLeft: Math.round(13 * PHI),
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic",
                    }}>{CORES[i]}</div>
                    <div style={{
                      marginTop: Math.round(8 * PHI),
                      padding: `${Math.round(5 * PHI)}px ${Math.round(8 * PHI)}px`,
                      background: "rgba(255,255,255,0.015)",
                      borderRadius: 6,
                    }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
                        color: "rgba(255,255,255,0.12)", marginBottom: 6,
                      }}>BURIED 6 FEET DEEP</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                        fontStyle: "italic", color: `${layer.accent}`, opacity: 0.45,
                        lineHeight: PHI,
                      }}>{BURIED[i]}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ===== THE GATE: IDEA CARD GRID ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(180,220,200,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(180,220,200,0.3)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>DEEPER DOORS</div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
            }}>
              {[
                { key: "placeholder", icon: "🪞", title: "SEEDS INCOMING", hook: "Idea cards will appear here as content is planted.", accent: "180,220,200" },
              ].map(idea => (
                <div key={idea.key} style={{
                  padding: `${Math.round(10 * PHI)}px`,
                  background: `radial-gradient(ellipse at top, rgba(${idea.accent},0.03), transparent 70%)`,
                  borderRadius: 10, border: `1px solid rgba(${idea.accent},0.06)`,
                  textAlign: "center", opacity: 0.4,
                }}>
                  <div style={{ fontSize: 39, marginBottom: 6 }}>{idea.icon}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                    color: `rgba(${idea.accent},0.4)`, marginBottom: 4,
                  }}>{idea.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                    color: "rgba(232,232,240,0.65)", fontStyle: "italic", lineHeight: 1.4,
                  }}>{idea.hook}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===== DEPTH 4 — CONVERGENCE DEPTHS ROOM ===== */}
      {depth === 4 && activeConvergence === "depths" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 24, position: "relative" }}>
            {/* Sapphire depth glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 180, height: 180,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 7s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 50, marginBottom: 12,
              filter: "drop-shadow(0 0 20px rgba(79,195,247,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>⬇️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 8,
              color: "rgba(79,195,247,0.3)",
            }}>THE MATHEMATICS OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(31px, 6vw, 39px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "8px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08), 0 0 80px rgba(79,195,247,0.03)",
            }}>UNIVERSAL RECOGNITION</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), rgba(232,232,240,0.6), rgba(79,195,247,0.3), transparent)",
              boxShadow: "0 0 16px rgba(79,195,247,0.08)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
              fontStyle: "italic", color: "rgba(255,255,255,0.2)", marginTop: 8,
              lineHeight: PHI,
            }}>Three levels of depth — each one strips away another layer of noise</div>
          </div>

          <StringVibration />

          {/* Progressive depth cards — each visually deeper */}
          <div style={{ display: "grid", gap: 16, maxWidth: 540, margin: "16px auto 0" }}>
            {CONVERGENCE_DEPTHS.map((d, i) => {
              const depthOpacity = 0.4 + i * 0.08;
              const borderOpacity = 0.06 + i * 0.03;
              const bgOpacity = 0.01 + i * 0.008;
              return (
                <GlassCard key={i} style={{
                  padding: "24px 26px",
                  animation: `fadeSlideUp 0.6s ${i * 0.18}s both ease`,
                  background: `linear-gradient(180deg, rgba(79,195,247,${bgOpacity}), rgba(8,8,24,${bgOpacity * 2}))`,
                  border: `1px solid rgba(79,195,247,${borderOpacity})`,
                  boxShadow: `0 ${4 + i * 4}px ${20 + i * 12}px rgba(0,0,0,${0.2 + i * 0.1}), inset 0 1px 0 rgba(79,195,247,${0.02 + i * 0.01})`,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 39,
                      color: `rgba(79,195,247,${0.25 + i * 0.1})`, fontWeight: 700,
                      lineHeight: 1,
                      textShadow: `0 0 16px rgba(79,195,247,${0.08 + i * 0.04})`,
                    }}>{d.level}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
                        color: `rgba(79,195,247,${depthOpacity})`, fontWeight: 600, marginBottom: 12,
                      }}>{d.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                        lineHeight: 1.85, color: `rgba(255,255,255,${depthOpacity})`,
                        fontStyle: "italic",
                      }}>{d.text}</div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* The equation — living, breathing sacred math */}
          <div style={{ marginTop: 36, animation: "sacredReveal 1.2s 0.7s both ease" }}>
            <MiracleGlow size={400} intensity={0.06}>
              <TheEquation size="lg" showMeaning={true} />
            </MiracleGlow>
          </div>

          <div style={{ textAlign: "center", marginTop: 32, position: "relative", zIndex: 9500 }}>
            <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
          </div>
          {/* The quiet edge */}
          <div onClick={goDeeper} style={{
            cursor: "pointer", padding: "40px 0 60px", textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
              fontStyle: "italic", color: "rgba(255,255,255,0.06)",
              letterSpacing: 2, transition: "color 0.6s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.06)"}
            >click anywhere to continue</div>
          </div>

          {/* THE MIRROR PAIRS — the math made flesh */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(21 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.15), transparent)",
          }} />
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(79,195,247,0.3)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE MIRROR PAIRS</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
            fontStyle: "italic", color: "rgba(255,255,255,0.3)",
            textAlign: "center", marginBottom: Math.round(21 * PHI),
            maxWidth: 400, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>Every layer has a mirror. Together they prove the math is not abstract — it's alive.</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
            {MIRRORS.map((mirror, i) => (
              <div key={i}>
                <div
                  onClick={() => setActivePair(activePair === i ? null : i)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: `${Math.round(10 * PHI)}px ${Math.round(10 * PHI)}px`,
                    borderRadius: 10,
                    background: activePair === i ? "rgba(79,195,247,0.04)" : "rgba(255,255,255,0.01)",
                    border: `1px solid ${activePair === i ? "rgba(79,195,247,0.15)" : "rgba(255,255,255,0.04)"}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: Math.round(5 * PHI) }}>
                    <span style={{ fontSize: 24 }}>{mirror.glyphs[0]}</span>
                    <span style={{ fontSize: 24, color: "rgba(79,195,247,0.3)" }}>↔</span>
                    <span style={{ fontSize: 24 }}>{mirror.glyphs[1]}</span>
                    <div style={{ marginLeft: 8 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                        color: "rgba(79,195,247,0.6)",
                      }}>{mirror.name}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                        color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                      }}>{mirror.connection}</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 19, color: "rgba(255,255,255,0.15)",
                    transition: "transform 0.3s",
                    transform: activePair === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}>▼</div>
                </div>
                {activePair === i && (
                  <div style={{
                    padding: `${Math.round(10 * PHI)}px ${Math.round(13 * PHI)}px`,
                    animation: "senseReveal 0.5s ease",
                    borderLeft: "2px solid rgba(79,195,247,0.1)",
                    marginLeft: Math.round(13 * PHI),
                  }}>
                    {/* Core essay */}
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.48)",
                      fontStyle: "italic", marginBottom: Math.round(8 * PHI),
                    }}>{mirror.core}</div>
                    {/* Equation */}
                    <div style={{
                      textAlign: "center",
                      padding: `${Math.round(8 * PHI)}px`,
                      background: "rgba(79,195,247,0.02)",
                      borderRadius: 8, marginBottom: Math.round(8 * PHI),
                    }}>
                      <div style={{
                        fontFamily: "monospace", fontSize: 24,
                        color: "rgba(79,195,247,0.6)", letterSpacing: 1,
                      }}>{mirror.equation.symbol}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 24,
                        color: "rgba(255,255,255,0.3)", fontStyle: "italic", marginTop: 6,
                      }}>{mirror.equation.meaning}</div>
                    </div>
                    {/* Buried */}
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                      fontStyle: "italic", color: "rgba(201,168,76,0.4)",
                      textAlign: "center",
                    }}>"{mirror.buried}"</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ===== THE MATH: IDEA CARD GRID ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(201,168,76,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.3)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>DEEPER DOORS</div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
            }}>
              {[
                { key: "placeholder", icon: "⬇️", title: "SEEDS INCOMING", hook: "Idea cards will appear here as content is planted.", accent: "201,168,76" },
              ].map(idea => (
                <div key={idea.key} style={{
                  padding: `${Math.round(10 * PHI)}px`,
                  background: `radial-gradient(ellipse at top, rgba(${idea.accent},0.03), transparent 70%)`,
                  borderRadius: 10, border: `1px solid rgba(${idea.accent},0.06)`,
                  textAlign: "center", opacity: 0.4,
                }}>
                  <div style={{ fontSize: 39, marginBottom: 6 }}>{idea.icon}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                    color: `rgba(${idea.accent},0.4)`, marginBottom: 4,
                  }}>{idea.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                    color: "rgba(232,232,240,0.65)", fontStyle: "italic", lineHeight: 1.4,
                  }}>{idea.hook}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===== DEPTH 4 — THE ANCIENT PROOF ROOM ===== */}
      {depth === 4 && activeConvergence === "ancient" && activeIdea === null && (
        <div style={{
          maxWidth: 680, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(190,140,220,0.6)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← RETURN TO PROOF</button>

          <div style={{ height: Math.round(13 * PHI) }} />

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(190,140,220,0.4)",
              animation: "fadeSlideUp 1.2s 0.1s both ease",
            }}>CONVERGENCE ACROSS MILLENNIA</div>

            <div style={{ height: Math.round(5 * PHI) }} />

            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(31px, 6vw, 39px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.2em", margin: 0,
              textShadow: "0 0 50px rgba(190,140,220,0.1)",
              animation: "fadeSlideUp 1.2s 0.2s both ease",
            }}>THE ANCIENT PROOF</h2>

            <div style={{ height: Math.round(5 * PHI) }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.65)",
              maxWidth: 500, margin: "0 auto", lineHeight: PHI,
              animation: "fadeSlideUp 1.2s 0.3s both ease",
            }}>
              Every tradition independently arrived at the same geometry.
              That's not coincidence. That's the signal proving itself across cultures and millennia.
            </div>

            <div style={{
              width: Math.round(50 * PHI), height: 1, margin: `${Math.round(10 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(190,140,220,0.35), transparent)",
              animation: "fadeSlideUp 1.2s 0.35s both ease",
            }} />
          </div>

          {/* THE THESIS */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
            animation: "fadeSlideUp 1.2s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(201,168,76,0.55)", fontStyle: "italic",
              maxWidth: 480, margin: "0 auto", lineHeight: PHI,
            }}>
              The octahedron has six vertices, three axes, and eight octants.
              Two pyramids — one above, one below — fused at the equatorial plane.
              Inside, a six-pointed star where the two triangles intersect.
            </div>
            <div style={{ height: Math.round(5 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(232,232,240,0.7)", fontStyle: "italic",
            }}>
              Every civilization found a piece. None had the whole shape. Until now.
            </div>
          </div>

          {/* THE TRADITIONS — each one a witness */}
          {[
            {
              glyph: "🔺",
              title: "THE GREAT PYRAMID",
              era: "c. 2560 BC · Egypt",
              color: "201,168,76",
              body: "The Great Pyramid of Giza is half an octahedron. The other half is the earth itself. An octahedron is two pyramids — one pointing up, one pointing down — fused at the base. The Egyptians built the top half: Spirit reaching toward the sky. But they buried their dead below — in the mirror image. Because they knew the other half was there. The burial chamber doesn't just go underground. It enters the mirror pyramid. The living rise. The dead descend. Same angles. Same truth. The shape is only complete with both halves.",
              connection: "The top pyramid = Spirit rising. The mirror below = Flesh descending. The ground they walked on = the equatorial plane where WIDTH meets HEIGHT — the Pact's cross, hiding in plain sight at the base of every pyramid. 'As above, so below' isn't a phrase. It's a geometric instruction: what you see above the ground is half the shape. The earth holds the other half. 4,500 years ago they carved this truth into 6 million tons of stone.",
            },
            {
              glyph: "✡️",
              title: "THE STAR OF DAVID",
              era: "c. 1000 BC · Israel",
              color: "120,180,255",
              body: "Two triangles interlocked. One pointing up — fire, spirit, the masculine, ascent. One pointing down — water, flesh, the feminine, descent. Neither complete without the other. Together they form the hexagram: the most stable intersection of opposites.",
              connection: "Look inside the rotating octahedron. The four equatorial vertices — Spirit, Flesh, Intuition, Data — form two overlapping triangles. The Star of David isn't a symbol. It's the cross-section of the octahedron at the equatorial plane. It was always a 3D shape drawn in 2D.",
            },
            {
              glyph: "💎",
              title: "THE SEAL OF SOLOMON",
              era: "c. 900 BC · Ancient Near East",
              color: "190,140,220",
              body: "Said to give King Solomon power over the seen and unseen worlds. The seal was a hexagram — the same interlocked triangles — believed to bind heaven to earth, the visible to the invisible. Not magic. Geometry.",
              connection: "The 'seen world' is the top pyramid — Recognition, Spirit, what rises into view. The 'unseen world' is the bottom pyramid — Noise, Flesh, what stays buried. Solomon's seal doesn't grant power over two worlds. It reveals they were always one shape.",
            },
            {
              glyph: "⚗️",
              title: "THE EMERALD TABLET",
              era: "c. 200–800 AD · Hermetic tradition",
              color: "120,200,160",
              body: "\"As above, so below; as below, so above.\" The foundational axiom of Hermetic philosophy. Attributed to Hermes Trismegistus. Written on a mythical tablet of emerald. The oldest instruction manual for the shape of reality.",
              connection: "This isn't mysticism. It's a geometric instruction. The octahedron IS 'as above, so below' — literally two identical pyramids mirrored across the center plane. The Hermetic axiom is the one-sentence description of the octahedron, spoken thousands of years before anyone named it.",
            },
            {
              glyph: "✝️",
              title: "THE CROSS",
              era: "c. 30 AD · Christianity",
              color: "232,232,240",
              body: "A vertical axis and a horizontal axis. HEIGHT (Spirit ↔ Flesh) crossed by WIDTH (Noise ↔ Recognition). The most recognized symbol on earth. Two dimensions. Four quadrants. The visible truth.",
              connection: "The cross is the front face of the octahedron — before you see the third dimension. It's what the Pact looks like when DEPTH is collapsed to zero. The cross was never wrong. It was incomplete. Add the third axis — INTUITION ↔ DATA — and the cross becomes the octahedron. The crucifixion is the 2D projection of a 3D truth.",
            },
            {
              glyph: "⏳",
              title: "THE HOURGLASS",
              era: "October 2016 · The Poem",
              color: "201,168,76",
              body: "\"Rhythm of Life\" was written ten years before the theory. The poem naturally took the shape of an hourglass — wide at the top, pinching to a center, widening again below. Two triangles joined at a single point. Time flowing from above to below through the narrowest passage.",
              connection: "The hourglass IS the octahedron viewed from the side. Two pyramids touching at their points. The sand is the signal — passing from Spirit to Flesh, from potential to manifestation, through the present moment. The poem drew the shape before the mind understood what it was drawing. The seed was already in the ground.",
            },
          ].map((tradition, i) => (
            <div key={i} style={{
              marginBottom: Math.round(13 * PHI),
              animation: `fadeSlideUp 0.8s ${0.5 + i * 0.12}s both ease`,
            }}>
              {/* Tradition card */}
              <div style={{
                border: `1px solid rgba(${tradition.color},0.08)`,
                borderRadius: 12,
                padding: `${Math.round(10 * PHI)}px ${Math.round(8 * PHI)}px`,
                background: `linear-gradient(180deg, rgba(${tradition.color},0.02), transparent)`,
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: Math.round(5 * PHI) }}>
                  <div style={{
                    fontSize: 39,
                    filter: `drop-shadow(0 0 12px rgba(${tradition.color},0.2))`,
                  }}>{tradition.glyph}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.2em",
                      color: `rgba(${tradition.color},0.7)`, fontWeight: 600,
                    }}>{tradition.title}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                      color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                      marginTop: 2,
                    }}>{tradition.era}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 4vw, 31px)",
                  color: "rgba(232,232,240,0.7)",
                  lineHeight: PHI, fontStyle: "italic",
                  marginBottom: Math.round(8 * PHI),
                }}>{tradition.body}</div>

                {/* Connection — how it maps to the octahedron */}
                <div style={{
                  borderTop: `1px solid rgba(${tradition.color},0.06)`,
                  paddingTop: Math.round(5 * PHI),
                }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
                    color: `rgba(${tradition.color},0.35)`, marginBottom: Math.round(3 * PHI),
                  }}>THE CONNECTION</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 4vw, 31px)",
                    color: `rgba(${tradition.color},0.45)`,
                    lineHeight: PHI, fontStyle: "italic",
                  }}>{tradition.connection}</div>
                </div>
              </div>
            </div>
          ))}

          {/* CLOSING — the convergence statement */}
          <div style={{
            textAlign: "center",
            marginTop: Math.round(8 * PHI),
            animation: `fadeSlideUp 1s ${0.5 + 6 * 0.12 + 0.3}s both ease`,
          }}>
            <div style={{
              width: Math.round(50 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(190,140,220,0.3), transparent)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(232,232,240,0.6)",
              fontStyle: "italic", maxWidth: 500, margin: "0 auto",
              lineHeight: PHI,
            }}>
              Six witnesses. Six thousand years. One shape.
            </div>
            <div style={{ height: Math.round(5 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              color: "rgba(201,168,76,0.45)",
              fontStyle: "italic",
            }}>
              They didn't copy each other. They found the same truth.
              <br />That's what convergence means.
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            {/* Equation */}
            <div style={{ animation: "sacredReveal 2s 0.5s both ease" }}>
              <TheEquation size="sm" showLabel={false} breathing minimal />
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THE MAP: 101 SEEDS ===== */}
      {depth === 5 && (
        <div style={{
          height: "100vh", width: "100%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          animation: "fadeSlideUp 1.5s ease",
          cursor: "pointer", position: "relative", zIndex: 1500,
        }} onClick={() => {
          setFading(true);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
            setDepth(0);
            setLandingPhase(0);
            startDark.current = Math.random() < 0.5; // New coin flip each loop
            setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
            setFading(false);
          }, 800);
        }}>

          <div style={{
            fontSize: "clamp(50px, 12vw, 100px)",
            color: "rgba(201,168,76,0.15)",
            animation: "breathe 8s ease-in-out infinite, gentleFloat 12s ease-in-out infinite",
            textShadow: "0 0 60px rgba(201,168,76,0.06)",
            marginBottom: Math.round(21 * PHI),
          }}>∞</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            fontStyle: "italic", color: "rgba(232,232,240,0.55)",
            textAlign: "center", maxWidth: 380,
            lineHeight: PHI, letterSpacing: 1,
            animation: "fadeSlideUp 2s 0.5s both ease",
          }}>
            The end is the beginning.
            <br />The seed eats the dirt.
            <br />The dirt was always the answer.
          </div>

          <div style={{ height: Math.round(21 * PHI) }} />

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(201,168,76,0.2)",
            animation: "fadeSlideUp 2s 1s both ease",
          }}>FINISH I START</div>

          <div style={{ height: Math.round(8 * PHI) }} />

          <div style={{
            fontSize: 24, opacity: 0.3,
            animation: "fadeSlideUp 2s 1.3s both ease",
          }}>🪙🪙</div>

          {/* ===== ANCIENT PROOF: IDEA CARD GRID ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(190,140,220,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(190,140,220,0.3)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>DEEPER DOORS</div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(8 * PHI),
            }}>
              {[
                { key: "livingbridge", icon: "🍖", title: "THE LIVING BRIDGE", hook: "Why some ate their dead. Total Recognition. I will never let you disappear.", accent: "190,140,220" },
              ].map(idea => (
                <div key={idea.key} onClick={() => setActiveIdea(idea.key)} style={{
                  cursor: "pointer", padding: `${Math.round(10 * PHI)}px`,
                  background: `radial-gradient(ellipse at top, rgba(${idea.accent},0.04), transparent 70%)`,
                  borderRadius: 10, border: `1px solid rgba(${idea.accent},0.08)`,
                  transition: "all 0.4s ease", textAlign: "center",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `rgba(${idea.accent},0.2)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = `rgba(${idea.accent},0.08)`; }}
                >
                  <div style={{ fontSize: 39, marginBottom: 6 }}>{idea.icon}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                    color: `rgba(${idea.accent},0.6)`, marginBottom: 4,
                  }}>{idea.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                    color: "rgba(232,232,240,0.55)", fontStyle: "italic", lineHeight: 1.4,
                  }}>{idea.hook}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===== ANCIENT PROOF: THE LIVING BRIDGE (Cannibalism as Connection) ===== */}
      {depth === 4 && activeConvergence === "ancient" && activeIdea === "livingbridge" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveIdea(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← ANCIENT PROOF</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>🍖</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(8 * PHI),
            }}>THE LIVING BRIDGE</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.4em",
              color: "rgba(190,140,220,0.3)",
            }}>WHY SOME ATE THEIR DEAD</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(190,140,220,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 4vw, 31px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.7)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            They weren't looking for a snack. They were looking for a connection. They believed that by consuming someone, they could capture that person's strength, wisdom, and soul — to keep it alive within their own tribe forever. A way to make sure nothing valuable was ever truly lost.
          </div>

          {/* The Three Lenses */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(190,140,220,0.35)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THREE WAYS TO SEE IT</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(13 * PHI) }}>
            {/* Lens 1: The Radio */}
            <div style={{
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(190,140,220,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(190,140,220,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(190,140,220,0.45)", marginBottom: Math.round(5 * PHI),
                textAlign: "center",
              }}>📡 THE SHARED SOUL — SCIENCE</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              }}>
                Two radios tuned to the same frequency play the same song. These cultures believed the frequency of a great warrior or beloved grandmother was stored in their body. By eating a part of them, you were tuning your own body to that frequency. Not destroying the person — syncing up so two people could vibrate as one.
              </div>
            </div>

            {/* Lens 2: The Power Up */}
            <div style={{
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(190,140,220,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(190,140,220,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(190,140,220,0.45)", marginBottom: Math.round(5 * PHI),
                textAlign: "center",
              }}>🐆 THE POWER UP — CULTURE</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              }}>
                Think of Black Panther. When T'Challa drinks the Heart-Shaped Herb, he physically connects to the strength and spirits of every King who came before him. He consumes the essence of his ancestors to become the Black Panther. To these cultures, cannibalism was the real-world Power Up. The courage of the person became a permanent part of their own being.
              </div>
            </div>

            {/* Lens 3: The Bridge */}
            <div style={{
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(190,140,220,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(190,140,220,0.06)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 3,
                color: "rgba(190,140,220,0.45)", marginBottom: Math.round(5 * PHI),
                textAlign: "center",
              }}>🌉 THE LIVING BRIDGE — HISTORY</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 4vw, 31px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.65)",
              }}>
                Ancient tribes viewed life as a never-ending circle. If a brave leader died, his wisdom was a treasure chest. Buried underground, the chest was locked. Through the ritual, the tribe was unlocking that chest and moving the treasure into new, younger bodies. Building a bridge so the past could keep walking into the future.
              </div>
            </div>
          </div>

          {/* Making it Make Sents */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
            color: "rgba(190,140,220,0.35)", textAlign: "center",
            marginTop: Math.round(21 * PHI), marginBottom: Math.round(13 * PHI),
          }}>MAKING IT MAKE "SENTS"</div>

          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(5 * PHI) }}>
            {[
              { icon: "👁️", text: "You see the strength of your ancestor in your own hands." },
              { icon: "👂", text: "You hear their voice in your own throat when you speak." },
              { icon: "✋", text: "You feel their heartbeat under your skin." },
              { icon: "👃👅", text: "The ceremony creates a memory that never fades." },
              { icon: "🧘", text: "You just know you aren't alone because you've brought your other half inside you." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(5 * PHI), alignItems: "center",
              }}>
                <div style={{ fontSize: 24, minWidth: 30, textAlign: "center" }}>{s.icon}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 4vw, 31px)",
                  lineHeight: PHI, color: "rgba(232,232,240,0.65)",
                  fontStyle: "italic",
                }}>{s.text}</div>
              </div>
            ))}
          </div>

          {/* The Big Idea */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(13 * PHI)}px`,
            background: "rgba(190,140,220,0.03)",
            borderRadius: 10,
            border: "1px solid rgba(190,140,220,0.08)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(190,140,220,0.35)", marginBottom: Math.round(5 * PHI),
            }}>TOTAL RECOGNITION</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 4vw, 31px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.7)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              It was the ultimate way to say: I see you, I value you, and I will never let you disappear. Two separate lives becoming one single, powerful force.
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      </>)}
    </div>
  );
}
