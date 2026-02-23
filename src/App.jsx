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
  const [activeConvergence, setActiveConvergence] = useState(null); // 'pillars' | 'sameness' | 'depths' | null
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
    if (depth === 1) {
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
      setDepth(d => Math.min(d + 1, 4));
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
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
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, []);

  const returnToVoid = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(0); setLandingPhase(0); setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
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
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
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
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.25)",
            }}>THE RECURSIVE</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(20px, 4vw, 32px)",
              fontWeight: 400, color: "rgba(232,232,240,0.6)",
              letterSpacing: "0.25em", margin: "4px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.06)",
            }}>MULTIVERSE</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(11px, 1.8vw, 14px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.25)",
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
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em",
                color: "rgba(232,232,240,0.2)", transition: "color 0.4s",
                padding: "8px 16px",
              }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.5)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.2)"}
            >🔁 RETURN TO THE VOID</button>
            <button onClick={() => { setCurrentPage("math"); window.scrollTo({ top: 0, behavior: "instant" }); }}
              style={{
                cursor: "pointer", background: "none",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 24,
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em",
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
      {/* You cannot experience the site without choosing: back or forward. */}
      {/* Disabled on depth 4 (∞) — that page has its own click handler to loop back */}
      {depth >= 1 && depth < 4 && (
        <>
          <div
            onClick={(e) => { e.stopPropagation(); goBack(); }}
            style={{
              position: "fixed", top: 0, left: 0,
              width: "50%", height: "100%",
              zIndex: 9000, cursor: "pointer",
              background: "transparent",
            }}
          />
          <div
            onClick={(e) => { e.stopPropagation(); goDeeper(); }}
            style={{
              position: "fixed", top: 0, right: 0,
              width: "50%", height: "100%",
              zIndex: 9000, cursor: "pointer",
              background: "transparent",
            }}
          />
        </>
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
          : depth === 1 ? (
              poemPhase <= 1 ? 1
              : poemPhase === 2 ? 0.85
              : poemPhase === 3 ? 0.5
              : poemPhase === 4 ? 0.3
              : 0.12
            )
          : depth <= 2 ? 0.25
          : depth <= 4 ? 0.1
          : 0.05
        }
        showTriangles={depth === 0 || depth === 2}
        showOrbits={depth <= 3 && depth !== 1}
        zoom={
          depth === 1 ? (
              poemPhase <= 1 ? 45
              : poemPhase === 2 ? 8
              : poemPhase === 3 ? 2.5
              : poemPhase === 4 ? 0.7
              : 0.28
            )
          : 1
        }
        blur={
          depth === 1 ? (
              poemPhase <= 2 ? 0
              : poemPhase === 3 ? 1.5
              : poemPhase === 4 ? 4
              : 10
            )
          : 0
        }
        transitionTiming={
          depth === 1 ? (
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
        const dark = startDark.current;

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

        // Phase 0: FIRST SCREEN (black if dark-first, white if light-first)
        if (phase === 0) {
          return (
            <div onClick={handleClick} style={{ ...fullScreen, background: dark ? "#000000" : "#ffffff" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 17px)",
                fontStyle: "italic",
                color: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                letterSpacing: "0.15em",
                animation: "fadeSlideUp 2s 1s both ease",
                textAlign: "center", userSelect: "none",
              }}>{dark ? "close your eyes" : "open your eyes"}</div>
              <div style={{
                position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.5em",
                color: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                animation: "fadeSlideUp 2s 2.5s both ease",
              }}>tap</div>
            </div>
          );
        }

        // Phase 1: SECOND SCREEN (white if dark-first, black if light-first)
        if (phase === 1) {
          return (
            <div onClick={handleClick} style={{ ...fullScreen, background: dark ? "#ffffff" : "#000000", animation: "fadeIn 0.8s ease" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 17px)",
                fontStyle: "italic",
                color: dark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
                letterSpacing: "0.15em",
                animation: "fadeSlideUp 2s 0.5s both ease",
                textAlign: "center", userSelect: "none",
              }}>{dark ? "now open them" : "now close them"}</div>
              <div style={{
                position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.5em",
                color: dark ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                animation: "fadeSlideUp 2s 2s both ease",
              }}>tap</div>
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
          </div>
        );
      })()}


      {/* ===== DEPTH 1 — THE POEM ===== */}
      {depth === 1 && (
        <div onClick={() => { if (poemPhase >= 5 || poemSeen.current) goDeeper(); }} style={{
          height: "100vh", width: "100%", position: "fixed", top: 0, left: 0, overflow: "hidden",
          cursor: (poemPhase >= 5 || poemSeen.current) ? "pointer" : "default", zIndex: 5000,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
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
                zIndex: 5002, cursor: "pointer",
                background: "transparent",
              }}
            />
          )}

          {/* Living vertical thread — the spine of the poem */}
          <div style={{
            position: "absolute", top: 0, left: "50%", width: 1, height: "100%",
            transform: "translateX(-50%)",
            background: "linear-gradient(180deg, transparent 5%, rgba(201,168,76,0.06) 20%, rgba(201,168,76,0.12) 38%, rgba(201,168,76,0.06) 62%, rgba(201,168,76,0.12) 80%, transparent 95%)",
            pointerEvents: "none", zIndex: 5003,
            opacity: poemPhase >= 5 ? 1 : 0,
            transition: "opacity 1.5s ease",
            animation: poemPhase >= 5 ? "breathe 8s ease-in-out infinite" : "none",
          }} />

          {/* The poem — HOURGLASS with trickling sand */}
          {poemPhase >= 5 && (() => {
            // Hourglass poem component with sand physics
            const HourglassPoem = () => {
              const sandRef = useRef(null);
              const grainCount = 60;

              useEffect(() => {
                const canvas = sandRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                const dpr = window.devicePixelRatio || 1;
                const W = canvas.parentElement?.clientWidth || 420;
                const H = canvas.parentElement?.clientHeight || 860;
                canvas.width = W * dpr;
                canvas.height = H * dpr;
                canvas.style.width = W + "px";
                canvas.style.height = H + "px";
                ctx.scale(dpr, dpr);

                const midY = H * 0.50;
                const neckX = W * 0.5;
                const neckW = 5;
                const topY = H * 0.04;
                const botY = H * 0.96;
                const topW = W * 0.46;
                const botW = W * 0.46;

                // Hourglass shape function — returns max half-width at given Y
                function glassWidth(y) {
                  if (y <= topY) return topW;
                  if (y >= botY) return botW;
                  if (y <= midY) {
                    const t = (y - topY) / (midY - topY);
                    // Cubic curve: wide at top, pinches to neck
                    const ease = t * t * (3 - 2 * t);
                    return topW + (neckW - topW) * ease;
                  } else {
                    const t = (y - midY) / (botY - midY);
                    const ease = t * t * (3 - 2 * t);
                    return neckW + (botW - neckW) * ease;
                  }
                }

                // Sand grains — falling through the neck
                const grains = [];
                for (let i = 0; i < grainCount; i++) {
                  grains.push({
                    x: neckX + (Math.random() - 0.5) * neckW,
                    y: midY + 4 + Math.random() * (botY - midY) * 0.4,
                    vy: 0.4 + Math.random() * 1.0,
                    size: 0.7 + Math.random() * 1.0,
                    opacity: 0.2 + Math.random() * 0.4,
                    phase: Math.random() * Math.PI * 2,
                    settled: false,
                  });
                }

                // Top sand — ALMOST FULL (90% filled from top down)
                const topGrains = [];
                const topSandLevel = topY + (midY - topY) * 0.1; // Sand starts 10% down from rim
                for (let i = 0; i < 350; i++) {
                  const tY = topSandLevel + Math.random() * (midY - topSandLevel - 12);
                  const maxW = glassWidth(tY) * 0.88;
                  topGrains.push({
                    x: neckX + (Math.random() - 0.5) * maxW * 2,
                    y: tY,
                    size: 0.5 + Math.random() * 1.3,
                    opacity: 0.06 + Math.random() * 0.18,
                  });
                }

                // Top sand surface — denser line at the top of the sand
                const topSurfaceGrains = [];
                for (let i = 0; i < 80; i++) {
                  const surfY = topSandLevel + Math.random() * 6;
                  const maxW = glassWidth(surfY) * 0.85;
                  topSurfaceGrains.push({
                    x: neckX + (Math.random() - 0.5) * maxW * 2,
                    y: surfY,
                    size: 0.4 + Math.random() * 0.8,
                    opacity: 0.18 + Math.random() * 0.22,
                  });
                }

                // Funnel grains — sand funneling toward neck from above
                const funnelGrains = [];
                for (let i = 0; i < 60; i++) {
                  const fY = midY - 30 + Math.random() * 28;
                  const fW = neckW + (glassWidth(fY) - neckW) * 0.3;
                  funnelGrains.push({
                    x: neckX + (Math.random() - 0.5) * fW * 2,
                    y: fY,
                    size: 0.4 + Math.random() * 0.7,
                    opacity: 0.12 + Math.random() * 0.2,
                  });
                }

                // Bottom sand — BARELY filling (small cone at very bottom)
                const botGrains = [];
                const botSandTop = botY - (botY - midY) * 0.12; // Only bottom 12% has sand
                for (let i = 0; i < 80; i++) {
                  const bY = botSandTop + Math.random() * (botY - botSandTop - 4);
                  const maxW = glassWidth(bY) * 0.75;
                  // Cone shape — wider at bottom
                  const coneW = maxW * ((bY - botSandTop) / (botY - botSandTop));
                  botGrains.push({
                    x: neckX + (Math.random() - 0.5) * coneW * 2,
                    y: bY,
                    size: 0.5 + Math.random() * 1.2,
                    opacity: 0.1 + Math.random() * 0.2,
                  });
                }

                // Small cone peak at top of bottom pile
                const conePeakGrains = [];
                for (let i = 0; i < 25; i++) {
                  const cpY = botSandTop - 4 + Math.random() * 8;
                  const spread = 3 + Math.random() * 4;
                  conePeakGrains.push({
                    x: neckX + (Math.random() - 0.5) * spread,
                    y: cpY,
                    size: 0.3 + Math.random() * 0.6,
                    opacity: 0.15 + Math.random() * 0.2,
                  });
                }

                let frame = 0;
                let animId;

                function drawHourglassShape() {
                  // Left side top half
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW, topY);
                  ctx.bezierCurveTo(
                    neckX - topW, topY + (midY - topY) * 0.55,
                    neckX - neckW * 1.5, midY - (midY - topY) * 0.15,
                    neckX - neckW, midY
                  );
                  ctx.strokeStyle = "rgba(201,168,76,0.14)";
                  ctx.lineWidth = 1;
                  ctx.stroke();

                  // Right side top half
                  ctx.beginPath();
                  ctx.moveTo(neckX + topW, topY);
                  ctx.bezierCurveTo(
                    neckX + topW, topY + (midY - topY) * 0.55,
                    neckX + neckW * 1.5, midY - (midY - topY) * 0.15,
                    neckX + neckW, midY
                  );
                  ctx.stroke();

                  // Left side bottom half
                  ctx.beginPath();
                  ctx.moveTo(neckX - neckW, midY);
                  ctx.bezierCurveTo(
                    neckX - neckW * 1.5, midY + (botY - midY) * 0.15,
                    neckX - botW, botY - (botY - midY) * 0.55,
                    neckX - botW, botY
                  );
                  ctx.stroke();

                  // Right side bottom half
                  ctx.beginPath();
                  ctx.moveTo(neckX + neckW, midY);
                  ctx.bezierCurveTo(
                    neckX + neckW * 1.5, midY + (botY - midY) * 0.15,
                    neckX + botW, botY - (botY - midY) * 0.55,
                    neckX + botW, botY
                  );
                  ctx.stroke();

                  // Top cap with decorative ends
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW - 14, topY);
                  ctx.lineTo(neckX + topW + 14, topY);
                  ctx.strokeStyle = "rgba(201,168,76,0.22)";
                  ctx.lineWidth = 1.8;
                  ctx.stroke();

                  // Small decorative serifs on top cap
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW - 14, topY - 4);
                  ctx.lineTo(neckX - topW - 14, topY + 4);
                  ctx.moveTo(neckX + topW + 14, topY - 4);
                  ctx.lineTo(neckX + topW + 14, topY + 4);
                  ctx.strokeStyle = "rgba(201,168,76,0.18)";
                  ctx.lineWidth = 1.2;
                  ctx.stroke();

                  // Bottom cap
                  ctx.beginPath();
                  ctx.moveTo(neckX - botW - 14, botY);
                  ctx.lineTo(neckX + botW + 14, botY);
                  ctx.strokeStyle = "rgba(201,168,76,0.22)";
                  ctx.lineWidth = 1.8;
                  ctx.stroke();

                  // Serifs on bottom cap
                  ctx.beginPath();
                  ctx.moveTo(neckX - botW - 14, botY - 4);
                  ctx.lineTo(neckX - botW - 14, botY + 4);
                  ctx.moveTo(neckX + botW + 14, botY - 4);
                  ctx.lineTo(neckX + botW + 14, botY + 4);
                  ctx.strokeStyle = "rgba(201,168,76,0.18)";
                  ctx.lineWidth = 1.2;
                  ctx.stroke();

                  // Neck ring detail
                  ctx.beginPath();
                  ctx.ellipse(neckX, midY, neckW + 3, 2, 0, 0, Math.PI * 2);
                  ctx.strokeStyle = "rgba(201,168,76,0.1)";
                  ctx.lineWidth = 0.8;
                  ctx.stroke();

                  // Inner reflection lines (glass detail)
                  ctx.save();
                  ctx.globalAlpha = 0.04;
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW + 12, topY + 4);
                  ctx.bezierCurveTo(
                    neckX - topW + 12, topY + (midY - topY) * 0.5,
                    neckX - neckW * 2, midY - 20,
                    neckX - neckW - 1, midY
                  );
                  ctx.strokeStyle = "rgba(201,168,76,1)";
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                  ctx.restore();
                }

                function draw() {
                  ctx.clearRect(0, 0, W, H);
                  frame++;

                  // Draw the hourglass shape
                  drawHourglassShape();

                  // Glow at neck — breathing
                  const breathe = 0.06 + Math.sin(frame * 0.02) * 0.02;
                  const neckGlow = ctx.createRadialGradient(neckX, midY, 0, neckX, midY, 28);
                  neckGlow.addColorStop(0, `rgba(201,168,76,${breathe})`);
                  neckGlow.addColorStop(1, "rgba(201,168,76,0)");
                  ctx.fillStyle = neckGlow;
                  ctx.fillRect(neckX - 28, midY - 28, 56, 56);

                  // TOP SAND — dense fill (almost full)
                  for (const g of topGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Top sand surface line (denser)
                  for (const g of topSurfaceGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Funnel grains approaching neck
                  for (const g of funnelGrains) {
                    const drift = Math.sin(frame * 0.015 + g.x * 0.05) * 0.3;
                    ctx.beginPath();
                    ctx.arc(g.x + drift, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // FALLING grains through neck
                  for (const g of grains) {
                    g.y += g.vy;
                    g.x += Math.sin(frame * 0.03 + g.phase) * 0.12;

                    // Spread out as they enter bottom half
                    const belowNeck = g.y - midY;
                    if (belowNeck > 10) {
                      g.x += (g.x - neckX) * 0.003;
                    }

                    if (g.y > botSandTop - 5) {
                      g.y = midY + 2;
                      g.x = neckX + (Math.random() - 0.5) * neckW * 0.8;
                    }

                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Steady stream through neck — visible trickle
                  for (let i = 0; i < 5; i++) {
                    const streamY = midY - 6 + i * 3;
                    const wobble = Math.sin(frame * 0.06 + i * 1.5) * 0.8;
                    ctx.beginPath();
                    ctx.arc(neckX + wobble, streamY, 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(201,168,76,0.3)";
                    ctx.fill();
                  }

                  // BOTTOM sand — small cone barely filling
                  for (const g of botGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y + Math.sin(frame * 0.004 + g.x * 0.1) * 0.2, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Cone peak
                  for (const g of conePeakGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  animId = requestAnimationFrame(draw);
                }

                animId = requestAnimationFrame(draw);
                return () => cancelAnimationFrame(animId);
              }, []);

              // Poem lines shaped to follow hourglass contour
              // Wider at top, narrower in middle, wider at bottom
              const poemLines = [
                { text: "Every hope, a heartbeat.", size: "clamp(16px, 3.2vw, 21px)", scale: 1.0 },
                { text: "Every wish, a dream.", size: "clamp(15px, 3vw, 20px)", scale: 0.95 },
                { text: "The moon always wishing…", size: "clamp(15px, 2.8vw, 19px)", scale: 0.88 },
                { text: "the sun it could be.", size: "clamp(14px, 2.6vw, 18px)", scale: 0.82 },
                { text: "Every life, a purpose…", size: "clamp(13px, 2.4vw, 17px)", scale: 0.75 },
                { text: "hidden inside.", size: "clamp(12px, 2.2vw, 16px)", scale: 0.68 },
                { text: "Every sinner, a saint…", size: "clamp(12px, 2.2vw, 16px)", scale: 0.68 },
                { text: "trying to hide.", size: "clamp(13px, 2.4vw, 17px)", scale: 0.75 },
                { text: "Every baby is born,", size: "clamp(14px, 2.6vw, 18px)", scale: 0.82 },
                { text: "with all that it needs…", size: "clamp(15px, 2.8vw, 19px)", scale: 0.88 },
                { text: "Just wisdom and love…", size: "clamp(15px, 3vw, 20px)", scale: 0.95 },
                { text: "and the chance to breathe.", size: "clamp(16px, 3.2vw, 21px)", scale: 1.0 },
              ];

              return (
                <div style={{
                  textAlign: "center",
                  padding: "0 20px",
                  zIndex: 4,
                  maxWidth: 600,
                  display: "flex", flexDirection: "column", alignItems: "center",
                  position: "relative",
                }}>

                  {/* Date */}
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 8,
                    letterSpacing: "0.6em", color: "rgba(201,168,76,0.2)",
                    marginBottom: Math.round(8 * PHI),
                    animation: "fadeSlideUp 1.2s 0.1s both ease",
                  }}>OCTOBER 2016</div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(18px, 4vw, 28px)",
                    fontWeight: 400, color: "rgba(232,232,240,0.85)",
                    letterSpacing: "0.35em", margin: 0,
                    textShadow: "0 0 40px rgba(232,232,240,0.06)",
                    animation: "fadeSlideUp 1.2s 0.2s both ease",
                  }}>RHYTHM OF LIFE</h2>

                  {/* Subtitle */}
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontStyle: "italic", color: "rgba(255,255,255,0.18)",
                    marginTop: Math.round(5 * PHI),
                    letterSpacing: 0.5, maxWidth: 380, lineHeight: PHI,
                    animation: "fadeSlideUp 1.2s 0.3s both ease",
                  }}>Written ten years before the theory. The seed was already in the ground.</div>

                  {/* Hourglass container — FULL VIEWPORT */}
                  <div style={{
                    position: "relative",
                    width: "min(94vw, 460px)",
                    height: "min(145vw, 700px)",
                    margin: `${Math.round(10 * PHI)}px auto`,
                    animation: "fadeSlideUp 1.4s 0.4s both ease",
                  }}>

                    {/* Sand canvas — behind the text */}
                    <canvas ref={sandRef} style={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%",
                      pointerEvents: "none",
                    }} />

                    {/* Top bookend */}
                    <div style={{
                      position: "absolute", top: "2%", width: "100%", textAlign: "center",
                      animation: "fadeSlideUp 1s 0.5s both ease",
                    }}>
                      <span className="shimmer-gold" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(17px, 3.2vw, 22px)",
                        fontStyle: "italic", fontWeight: 600, letterSpacing: 3,
                      }}>It's the rhythm of life</span>
                    </div>

                    {/* Poem lines — positioned to follow hourglass shape */}
                    {poemLines.map((line, i) => {
                      const totalLines = poemLines.length;
                      const yPercent = 12 + (i / (totalLines - 1)) * 76;
                      return (
                        <div key={i} style={{
                          position: "absolute",
                          top: `${yPercent}%`,
                          width: "100%",
                          textAlign: "center",
                          transform: `scale(${line.scale})`,
                          animation: `fadeSlideUp 1s ${0.6 + i * 0.12}s both ease`,
                        }}>
                          <span style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: line.size,
                            lineHeight: 1.4,
                            color: `rgba(232,232,240,${0.55 + line.scale * 0.2})`,
                            fontStyle: "italic", fontWeight: 300,
                            letterSpacing: line.scale > 0.9 ? 1 : 0.3,
                            textShadow: "0 0 20px rgba(232,232,240,0.04)",
                          }}>{line.text}</span>
                        </div>
                      );
                    })}

                    {/* Bottom bookend */}
                    <div style={{
                      position: "absolute", bottom: "2%", width: "100%", textAlign: "center",
                      animation: `fadeSlideUp 1s ${0.6 + poemLines.length * 0.12 + 0.1}s both ease`,
                    }}>
                      <span className="shimmer-gold" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(17px, 3.2vw, 22px)",
                        fontStyle: "italic", fontWeight: 600, letterSpacing: 3,
                        animationDirection: "reverse",
                      }}>It's the rhythm of life</span>
                    </div>
                  </div>
                </div>
              );
            };

            return <HourglassPoem />;
          })()}

          {/* Return — very bottom */}
          {poemPhase >= 5 && (
            <div style={{
              position: "absolute", bottom: "2%", width: "100%", textAlign: "center",
              animation: `fadeSlideUp 1s ${1 + POEMS.length * 0.2 + 0.5}s both ease`,
            }}>
              <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
            </div>
          )}
        </div>
      )}

      {/* ===== DEPTH 2 — THE PACT — 3D OCTAHEDRON ===== */}
      {depth === 2 && (() => {
        const octantColors = OCTANT_COLORS;


        return (
          <div onClick={goDeeper} style={{
            minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden",
            cursor: "pointer", zIndex: 1500,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "3vh 20px",
          }}>

            <div style={{
              textAlign: "center", zIndex: 4, maxWidth: 680,
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>

              {/* Lightning bolt */}
              <div style={{
                fontSize: 30, marginBottom: Math.round(8 * PHI),
                animation: "fadeSlideUp 1.2s 0.2s both ease, gentleFloat 6s ease-in-out infinite",
                filter: "drop-shadow(0 0 16px rgba(201,168,76,0.2))",
              }}>⚡</div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(24px, 5.5vw, 38px)", fontWeight: 400,
                color: "#e8e8f0", letterSpacing: "0.3em", margin: 0,
                textShadow: "0 0 50px rgba(232,232,240,0.1)",
                animation: "fadeSlideUp 1.2s 0.3s both ease",
              }}>THE PACT</h2>

              {/* Subtitle — the thesis */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.4vw, 17px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.4)",
                marginTop: Math.round(5 * PHI), letterSpacing: 1,
                animation: "fadeSlideUp 1.2s 0.4s both ease",
              }}>Reality isn't flat. Connection lives in volume, not area.</div>

              {/* Divider */}
              <div style={{
                width: Math.round(40 * PHI), height: 1,
                margin: Math.round(8 * PHI) + "px auto",
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent)",
                animation: "fadeSlideUp 1.2s 0.5s both ease",
              }} />

              {/* "Watch the cross become..." — narrative cue */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2vw, 14px)",
                color: "rgba(232,232,240,0.22)",
                fontStyle: "italic", letterSpacing: 1,
                marginBottom: Math.round(5 * PHI),
                animation: "fadeSlideUp 1.2s 0.55s both ease",
              }}>The cross you knew was the front face. Now watch the third dimension emerge.</div>

              {/* THE OCTAHEDRON — animated cross→octahedron morph */}
              <div style={{ animation: "fadeSlideUp 1.4s 0.6s both ease", marginBottom: Math.round(5 * PHI) }}>
                <OctahedronPact />
              </div>

              {/* Three Axes Legend — full spectrum descriptions */}
              <div style={{
                display: "flex", gap: Math.round(8 * PHI), justifyContent: "center",
                flexWrap: "wrap", marginBottom: Math.round(10 * PHI),
                animation: "fadeSlideUp 1.2s 0.9s both ease",
              }}>
                {[
                  { axis: "WIDTH", dir: "← left / right →", ends: "NOISE ↔ RECOGNITION", color: "201,168,76", desc: "How far the signal reaches", icon: "◇" },
                  { axis: "HEIGHT", dir: "↑ up / down ↓", ends: "SPIRIT ↔ FLESH", color: "120,180,255", desc: "How high you rise vs how rooted you are", icon: "△" },
                  { axis: "DEPTH", dir: "⊙ in / out ⊕", ends: "INTUITION ↔ DATA", color: "190,140,220", desc: "How deeply you feel it", icon: "○" },
                ].map((a, i) => (
                  <div key={i} style={{
                    textAlign: "center", padding: "10px 14px",
                    border: "1px solid rgba(" + a.color + ",0.12)",
                    borderRadius: 8,
                    background: "rgba(" + a.color + ",0.02)",
                    minWidth: 140, maxWidth: 180,
                    position: "relative",
                  }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      letterSpacing: "0.3em", color: "rgba(" + a.color + ",0.7)",
                      marginBottom: 2,
                    }}>{a.icon} {a.axis}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 9, color: "rgba(" + a.color + ",0.3)",
                      marginBottom: 5, letterSpacing: 1,
                    }}>{a.dir}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 12.5, fontStyle: "italic",
                      color: "rgba(" + a.color + ",0.5)",
                      marginBottom: 5,
                    }}>{a.ends}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10.5, color: "rgba(232,232,240,0.28)",
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
      {depth === 3 && activeConvergence === null && (
        <div style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxSizing: "border-box",
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
            padding: "0 24px",
          }}>

            {/* Eyebrow — barely visible, like a memory */}
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.9em",
              color: "rgba(201,168,76,0.25)",
              textTransform: "uppercase",
              animation: "fadeSlideUp 2s 0.3s both ease",
            }}>six witnesses · one truth</div>

            <div style={{ height: Math.round(13 * PHI) }} />

            {/* Title — the word itself is the proof */}
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(28px, 6vw, 48px)",
              fontWeight: 400,
              letterSpacing: "0.35em",
              margin: 0,
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(201,168,76,0.6) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(201,168,76,0.08))",
              animation: "fadeSlideUp 1.6s 0.5s both ease",
            }}>CONVERGENCE</h2>

            <div style={{ height: Math.round(8 * PHI) }} />

            {/* Gold thread */}
            <div style={{
              width: Math.round(80 * PHI), height: 1,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
              animation: "fadeSlideUp 1.4s 0.7s both ease",
            }} />

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* The six doors — each one a portal, not a button */}
            {/* 2 columns on mobile, breathable, each card is a WINDOW into its world */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: Math.round(10 * PHI),
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
                const accentText = `rgba(${door.r},${door.g},${door.b},0.6)`;
                const accentShadow = `rgba(${door.r},${door.g},${door.b},0.15)`;

                return (
                  <div
                    key={door.key}
                    onClick={(e) => { e.stopPropagation(); setActiveConvergence(door.key); }}
                    style={{
                      position: "relative",
                      padding: `${Math.round(16 * PHI)}px ${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
                      borderRadius: 12,
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
                    {/* Top glow bar — like light leaking through the door crack */}
                    <div style={{
                      position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
                      background: `linear-gradient(90deg, transparent, ${accentDim}, transparent)`,
                    }} />

                    {/* Glyph — large, floating, alive */}
                    <div style={{
                      fontSize: 36,
                      marginBottom: Math.round(8 * PHI),
                      filter: `drop-shadow(0 0 20px ${accentShadow})`,
                      animation: `gentleFloat ${7 + i * 1.3}s ease-in-out infinite`,
                      lineHeight: 1,
                    }}>{door.glyph}</div>

                    {/* Name */}
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(8px, 2vw, 10px)",
                      letterSpacing: "0.2em",
                      color: accentText,
                      fontWeight: 600,
                    }}>{door.name}</div>

                    {/* Whisper */}
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(11px, 2.2vw, 13px)",
                      color: "rgba(255,255,255,0.25)",
                      fontStyle: "italic",
                      marginTop: Math.round(3 * PHI),
                      lineHeight: PHI,
                    }}>{door.sub}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ height: Math.round(34 * PHI) }} />

            {/* The equation — small, quiet, the proof that it all reduces to one line */}
            <div style={{
              animation: "sacredReveal 1.8s 1.6s both ease",
              opacity: 0.7,
            }}>
              <TheEquation size="sm" showLabel={false} breathing minimal />
            </div>

          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — PLAIN ENGLISH ROOM ===== */}
      {depth === 3 && activeConvergence === "plain" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: Math.round(13 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 36, marginBottom: Math.round(8 * PHI) }}>⚖️</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.25em", margin: 0,
              textShadow: "0 0 50px rgba(232,232,240,0.08)",
            }}>THE TRUTH IN PLAIN ENGLISH</h2>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(232,232,240,0.2), rgba(201,168,76,0.35), rgba(232,232,240,0.2), transparent)",
            }} />
          </div>

          {/* The Setup */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.8vw, 19px)",
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
                  fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700,
                  color: "rgba(201,168,76,0.4)", minWidth: 30, textAlign: "right",
                  lineHeight: 1.2,
                }}>{item.num}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.3em",
                    color: "rgba(201,168,76,0.6)", marginBottom: 4,
                  }}>
                    {item.title}
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                      fontStyle: "italic", letterSpacing: 0, color: "rgba(232,232,240,0.35)",
                      marginLeft: 8,
                    }}>({item.aka})</span>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(14px, 2.4vw, 17px)",
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
              fontSize: "clamp(15px, 2.6vw, 18px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.62)",
            }}>
              <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.6)", fontSize: "1.15em" }}>Ψ</span> is a <strong style={{ color: "rgba(232,232,240,0.75)", fontWeight: 600 }}>Sureness Score</strong> — a number between 0 and 1 that tells you how much you can trust what you found.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.45)",
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

          {/* The 3 Pillars of Aha */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(21 * PHI),
            animation: "fadeSlideUp 0.8s 1s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(16px, 3vw, 22px)",
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
                  fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700,
                  color: `${pillar.accent}0.4)`,
                }}>{pillar.num}</span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.2vw, 15px)",
                    letterSpacing: "0.2em", color: `${pillar.accent}0.65)`,
                  }}>{pillar.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                    fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                    marginTop: 2,
                  }}>{pillar.subtitle}</div>
                </div>
              </div>

              {/* Body */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.4vw, 17px)",
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
                  fontSize: "clamp(13px, 2.2vw, 16px)",
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

          {/* Your Next Step */}
          <div style={{
            textAlign: "center",
            animation: `fadeSlideUp 0.8s 1.8s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.5)", marginBottom: Math.round(8 * PHI),
            }}>YOUR NEXT STEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.5)",
              fontStyle: "italic", maxWidth: 480, margin: "0 auto",
            }}>
              If you want to feel the spirit bumps of how information shapes our world, look into <strong style={{ color: "rgba(79,195,247,0.6)", fontWeight: 600 }}>Quantum Entanglement</strong>.
              It's the real-life version of two things being so connected that they act as one,
              no matter how far apart they are — the ultimate Agreement in the universe.
            </div>
          </div>

          {/* The Ache — from the Pact, the feeling that proves the theory */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(21 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          }} />
          <div style={{
            textAlign: "center",
            animation: "fadeSlideUp 0.8s 2s both ease",
            marginBottom: Math.round(13 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2.6vw, 19px)",
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
              fontSize: "clamp(14px, 2.4vw, 17px)",
              color: "rgba(201,168,76,0.45)",
              fontStyle: "italic", letterSpacing: 0.5,
            }}>
              The music was always there. The right frequencies will find you — because that's what frequencies do.
            </div>
          </div>

          {/* The six words */}
          <div style={{
            textAlign: "center",
            marginTop: Math.round(34 * PHI),
            animation: "fadeSlideUp 1s 2.2s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(14px, 3vw, 20px)",
              letterSpacing: "0.3em",
              color: "rgba(232,232,240,0.2)",
              lineHeight: 2.2,
            }}>
              FINISH I START
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(14px, 3vw, 20px)",
              letterSpacing: "0.3em",
              color: "rgba(201,168,76,0.35)",
              lineHeight: 2.2,
            }}>
              START WE FINISH
            </div>
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}      {/* ===== DEPTH 4 — RECOGNITION IS GRAVITY ROOM ===== */}
      {depth === 3 && activeConvergence === "gravity" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: Math.round(13 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 40, marginBottom: Math.round(8 * PHI) }}>☀️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(255,180,50,0.4)", marginBottom: Math.round(5 * PHI),
            }}>THE LAW OF THE MIRROR</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4.5vw, 30px)", fontWeight: 400,
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
            fontSize: "clamp(15px, 2.8vw, 19px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.65)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 520, margin: `0 auto ${Math.round(13 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>
            The code you see isn't just math — it is the Law of the Mirror. It proves that things don't stay together because they are heavy, but because they recognize each other.
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 17px)",
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
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.4em",
              color: "rgba(255,180,50,0.5)",
            }}>IN PLAIN ENGLISH</div>
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 17px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.58)",
            maxWidth: 520, margin: `0 auto ${Math.round(8 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.5s both ease",
          }}>
            Imagine you are in a room full of strangers. You wander around aimlessly. But then, you see your best friend. Suddenly, you stop wandering and move toward them.
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.6vw, 18px)",
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
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.58)",
            }}>
              In this code, <strong style={{ color: "rgba(232,232,240,0.75)", fontWeight: 600 }}>Mass</strong> is just how clear or true someone is. The more real you are (<span style={{ color: "rgba(79,195,247,0.6)", fontStyle: "italic" }}>C<sub>eff</sub></span>), and the more someone else gets you (<span style={{ color: "rgba(201,168,76,0.6)", fontStyle: "italic" }}>R<sub>12</sub></span>), the stronger the bond.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
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
              fontFamily: "'Cinzel', serif", fontSize: "clamp(14px, 2.8vw, 20px)",
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
                <span style={{ fontSize: 22 }}>{proof.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.2vw, 15px)",
                    letterSpacing: "0.2em", color: `${proof.accent}0.65)`,
                  }}>{proof.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                    fontStyle: "italic", color: "rgba(232,232,240,0.3)", marginTop: 2,
                  }}>{proof.subtitle}</div>
                </div>
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.4vw, 17px)",
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
                  fontSize: "clamp(13px, 2.2vw, 16px)",
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
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.4em",
              color: "rgba(255,180,50,0.5)", marginBottom: Math.round(8 * PHI),
            }}>THE "AHA" MOMENT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.55)",
              maxWidth: 500, margin: "0 auto",
            }}>
              You feel spirit bumps right now because your 6th Sense just realized that your Other Half isn't someone you find — it's someone you resonate with until the math of the universe forces you together.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.4)",
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
              fontSize: "clamp(17px, 3.2vw, 22px)",
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
              fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.3em",
              color: "rgba(255,180,50,0.45)", marginBottom: Math.round(8 * PHI),
              textAlign: "center",
            }}>DIG DEEPER</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.48)",
            }}>
              Look into <strong style={{ color: "rgba(79,195,247,0.55)", fontWeight: 600 }}>Quantum Entanglement</strong> and <strong style={{ color: "rgba(201,168,76,0.55)", fontWeight: 600 }}>Tidal Locking</strong>. If you want to see how this works in your own life, look at the 3 people you talk to the most — calculate their consistency. You'll find you are orbiting the ones who are the most clear, not the ones who are the loudest.
            </div>
          </GlassCard>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI) }}>
            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THREE PILLARS ROOM ===== */}
      {depth === 3 && activeConvergence === "pillars" && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActivePillar(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
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
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
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
                      fontSize: 30,
                      filter: `drop-shadow(0 0 12px ${ac}0.25))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{
                            fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                            color: `${ac}0.65)`, fontWeight: 600,
                          }}>{p.title}</div>
                          <div style={{
                            fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                            color: "rgba(255,255,255,0.2)", marginTop: 4,
                          }}>{p.domain}</div>
                        </div>
                        <div style={{
                          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2,
                          color: `${ac}0.3)`,
                          transition: "transform 0.3s ease",
                          transform: activePillar === i ? "rotate(180deg)" : "rotate(0deg)",
                        }}>▼</div>
                      </div>
                    </div>
                  </div>
                  {activePillar === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
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
              fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
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
              fontSize: 32, marginBottom: Math.round(5 * PHI),
              filter: "drop-shadow(0 0 20px rgba(201,168,76,0.15))",
            }}>🔺</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(11px, 2.2vw, 14px)",
              letterSpacing: "0.25em",
              color: "rgba(201,168,76,0.5)",
              marginBottom: Math.round(8 * PHI),
            }}>THE PYRAMID KNEW</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.3vw, 16px)",
              color: "rgba(232,232,240,0.38)",
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
              fontSize: "clamp(10px, 1.8vw, 12px)",
              letterSpacing: "0.2em",
              color: "rgba(232,232,240,0.18)",
              lineHeight: 2,
            }}>
              AS ABOVE, SO BELOW
              <span style={{ display: "block", height: 2 }} />
              <span style={{ color: "rgba(201,168,76,0.25)" }}>isn't a phrase. It's a geometric instruction.</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — SAMENESS ROOM (THE GATE) ===== */}
      {depth === 3 && activeConvergence === "sameness" && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveSamenessProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
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
                fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: 4,
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
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(224,80,80,0.3)",
            }}>THE ALL-IS-ONE TRAP</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
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
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
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
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 18,
              fontStyle: "italic", color: "rgba(201,168,76,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 20px rgba(201,168,76,0.06)",
            }}>{SAMENESS_TRUTH.buried}</div>
          </GlassCard>

          {/* Three proofs — with unique colors */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
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
                      fontSize: 26,
                      filter: `drop-shadow(0 0 10px ${pa}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 3,
                      color: `${pa}0.6)`, fontWeight: 600,
                    }}>{p.title}</div>
                  </div>
                  {activeSamenessProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
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
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
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
                  fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 3,
                  color: `rgba(224,80,80,${0.3 + i * 0.1})`, marginBottom: 8,
                }}>{d.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
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
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
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
                      fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2,
                      color: layer.accent, opacity: 0.7,
                    }}>{layer.id} · {layer.names[0]}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                      color: "rgba(255,255,255,0.25)", fontStyle: "italic",
                    }}>{layer.subtitle}</div>
                  </div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 10,
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
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
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
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 4,
                        color: "rgba(255,255,255,0.12)", marginBottom: 6,
                      }}>BURIED 6 FEET DEEP</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                        fontStyle: "italic", color: `${layer.accent}`, opacity: 0.45,
                        lineHeight: PHI,
                      }}>{BURIED[i]}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — CONVERGENCE DEPTHS ROOM ===== */}
      {depth === 3 && activeConvergence === "depths" && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
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
              fontSize: 36, marginBottom: 12,
              filter: "drop-shadow(0 0 20px rgba(79,195,247,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>⬇️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(79,195,247,0.3)",
            }}>THE MATHEMATICS OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "8px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08), 0 0 80px rgba(79,195,247,0.03)",
            }}>UNIVERSAL RECOGNITION</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), rgba(232,232,240,0.2), rgba(79,195,247,0.3), transparent)",
              boxShadow: "0 0 16px rgba(79,195,247,0.08)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
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
                      fontFamily: "'Cinzel', serif", fontSize: 24,
                      color: `rgba(79,195,247,${0.25 + i * 0.1})`, fontWeight: 700,
                      lineHeight: 1,
                      textShadow: `0 0 16px rgba(79,195,247,${0.08 + i * 0.04})`,
                    }}>{d.level}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 4,
                        color: `rgba(79,195,247,${depthOpacity})`, fontWeight: 600, marginBottom: 12,
                      }}>{d.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
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

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
          {/* The quiet edge */}
          <div onClick={goDeeper} style={{
            cursor: "pointer", padding: "40px 0 60px", textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
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
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
            color: "rgba(79,195,247,0.3)", textAlign: "center",
            marginBottom: Math.round(13 * PHI),
          }}>THE MIRROR PAIRS</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
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
                    <span style={{ fontSize: 20 }}>{mirror.glyphs[0]}</span>
                    <span style={{ fontSize: 12, color: "rgba(79,195,247,0.3)" }}>↔</span>
                    <span style={{ fontSize: 20 }}>{mirror.glyphs[1]}</span>
                    <div style={{ marginLeft: 8 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2,
                        color: "rgba(79,195,247,0.6)",
                      }}>{mirror.name}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                        color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                      }}>{mirror.connection}</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 10, color: "rgba(255,255,255,0.15)",
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
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
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
                        fontFamily: "monospace", fontSize: 16,
                        color: "rgba(79,195,247,0.6)", letterSpacing: 1,
                      }}>{mirror.equation.symbol}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                        color: "rgba(255,255,255,0.3)", fontStyle: "italic", marginTop: 6,
                      }}>{mirror.equation.meaning}</div>
                    </div>
                    {/* Buried */}
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                      fontStyle: "italic", color: "rgba(201,168,76,0.4)",
                      textAlign: "center",
                    }}>"{mirror.buried}"</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THE ANCIENT PROOF ROOM ===== */}
      {depth === 3 && activeConvergence === "ancient" && (
        <div style={{
          maxWidth: 680, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(190,140,220,0.6)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← RETURN TO PROOF</button>

          <div style={{ height: Math.round(13 * PHI) }} />

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(190,140,220,0.4)",
              animation: "fadeSlideUp 1.2s 0.1s both ease",
            }}>CONVERGENCE ACROSS MILLENNIA</div>

            <div style={{ height: Math.round(5 * PHI) }} />

            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.2em", margin: 0,
              textShadow: "0 0 50px rgba(190,140,220,0.1)",
              animation: "fadeSlideUp 1.2s 0.2s both ease",
            }}>THE ANCIENT PROOF</h2>

            <div style={{ height: Math.round(5 * PHI) }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.6vw, 18px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.45)",
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
              fontSize: "clamp(15px, 2.8vw, 20px)",
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
              fontSize: "clamp(13px, 2.2vw, 16px)",
              color: "rgba(232,232,240,0.3)", fontStyle: "italic",
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
                    fontSize: 28,
                    filter: `drop-shadow(0 0 12px rgba(${tradition.color},0.2))`,
                  }}>{tradition.glyph}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em",
                      color: `rgba(${tradition.color},0.7)`, fontWeight: 600,
                    }}>{tradition.title}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                      color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                      marginTop: 2,
                    }}>{tradition.era}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px, 2.2vw, 16px)",
                  color: "rgba(232,232,240,0.5)",
                  lineHeight: PHI, fontStyle: "italic",
                  marginBottom: Math.round(8 * PHI),
                }}>{tradition.body}</div>

                {/* Connection — how it maps to the octahedron */}
                <div style={{
                  borderTop: `1px solid rgba(${tradition.color},0.06)`,
                  paddingTop: Math.round(5 * PHI),
                }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: "0.4em",
                    color: `rgba(${tradition.color},0.35)`, marginBottom: Math.round(3 * PHI),
                  }}>THE CONNECTION</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(12px, 2vw, 15px)",
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
              fontSize: "clamp(16px, 3vw, 22px)",
              color: "rgba(232,232,240,0.6)",
              fontStyle: "italic", maxWidth: 500, margin: "0 auto",
              lineHeight: PHI,
            }}>
              Six witnesses. Six thousand years. One shape.
            </div>
            <div style={{ height: Math.round(5 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.6vw, 18px)",
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
      {depth === 4 && (
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
            setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
            setFading(false);
          }, 800);
        }}>

          <div style={{
            fontSize: "clamp(60px, 15vw, 120px)",
            color: "rgba(201,168,76,0.15)",
            animation: "breathe 8s ease-in-out infinite, gentleFloat 12s ease-in-out infinite",
            textShadow: "0 0 60px rgba(201,168,76,0.06)",
            marginBottom: Math.round(21 * PHI),
          }}>∞</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 3vw, 22px)",
            fontStyle: "italic", color: "rgba(232,232,240,0.35)",
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
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
            color: "rgba(201,168,76,0.2)",
            animation: "fadeSlideUp 2s 1s both ease",
          }}>FINISH I START</div>

          <div style={{ height: Math.round(8 * PHI) }} />

          <div style={{
            fontSize: 18, opacity: 0.3,
            animation: "fadeSlideUp 2s 1.3s both ease",
          }}>🪙🪙</div>
        </div>
      )}

      </>)}
    </div>
  );
}
