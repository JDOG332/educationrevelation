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
  const [landingPhase, setLandingPhase] = useState(0); // 0=black, 1=white, 2=prism
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
      setDepth(d => Math.min(d + 1, 8));
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
      {depth >= 1 && (
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

        // Phase 0: DARKNESS
        if (phase === 0) {
          return (
            <div onClick={handleClick} style={{ ...fullScreen, background: "#000000" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 17px)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.08)",
                letterSpacing: "0.15em",
                animation: "fadeSlideUp 2s 1s both ease",
                textAlign: "center", userSelect: "none",
              }}>close your eyes</div>
              <div style={{
                position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.5em",
                color: "rgba(255,255,255,0.04)",
                animation: "fadeSlideUp 2s 2.5s both ease",
              }}>tap</div>
            </div>
          );
        }

        // Phase 1: LIGHT
        if (phase === 1) {
          return (
            <div onClick={handleClick} style={{ ...fullScreen, background: "#ffffff", animation: "fadeIn 0.8s ease" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 17px)",
                fontStyle: "italic",
                color: "rgba(0,0,0,0.08)",
                letterSpacing: "0.15em",
                animation: "fadeSlideUp 2s 0.5s both ease",
                textAlign: "center", userSelect: "none",
              }}>now open them</div>
              <div style={{
                position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.5em",
                color: "rgba(0,0,0,0.04)",
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

              {/* The dimensional shift — core insight */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(12px, 2vw, 15px)",
                color: "rgba(232,232,240,0.35)",
                fontStyle: "italic", textAlign: "center",
                maxWidth: 460, lineHeight: PHI,
                animation: "fadeSlideUp 1.2s 1.1s both ease",
                marginBottom: Math.round(6 * PHI),
              }}>
                The cross gave you four quadrants — flat truth on a flat plane.
                <span style={{ display: "block", height: 8 }} />
                Add the third axis and the cross becomes the front face of an octahedron.
                Four quadrants become eight octants.
                <span style={{ display: "block", height: 8 }} />
                Every octant is a unique combination: high or low, wide or narrow, deep or shallow.
                <span style={{ display: "block", height: 4 }} />
                <span style={{ color: "rgba(201,168,76,0.35)" }}>This is the full space where connection lives.</span>
              </div>

              {/* The octant map — what each octant means */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "4px", maxWidth: 380,
                marginBottom: Math.round(10 * PHI),
                animation: "fadeSlideUp 1.2s 1.25s both ease",
              }}>
                {[
                  { combo: "Recognition + Spirit + Intuition", short: "Prophetic clarity" },
                  { combo: "Recognition + Spirit + Data", short: "Proven faith" },
                  { combo: "Recognition + Flesh + Intuition", short: "Gut instinct, seen" },
                  { combo: "Recognition + Flesh + Data", short: "Grounded evidence" },
                  { combo: "Noise + Spirit + Intuition", short: "Unheard prayer" },
                  { combo: "Noise + Spirit + Data", short: "Hidden proof" },
                  { combo: "Noise + Flesh + Intuition", short: "Raw impulse" },
                  { combo: "Noise + Flesh + Data", short: "Buried fact" },
                ].map((o, i) => (
                  <div key={i} style={{
                    padding: "5px 8px",
                    background: "rgba(" + octantColors[i] + ",0.04)",
                    border: "1px solid rgba(" + octantColors[i] + ",0.06)",
                    borderRadius: 4,
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 9, fontStyle: "italic",
                      color: "rgba(232,232,240,0.2)",
                      lineHeight: 1.3, marginBottom: 2,
                    }}>{o.combo}</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 8,
                      letterSpacing: "0.1em",
                      color: "rgba(" + octantColors[i] + ",0.45)",
                    }}>{o.short}</div>
                  </div>
                ))}
              </div>

              {/* THE PYRAMID REVELATION */}
              <div style={{
                animation: "fadeSlideUp 1.4s 1.35s both ease",
                marginBottom: Math.round(13 * PHI),
                maxWidth: 500, width: "100%",
                textAlign: "center",
              }}>
                {/* Divider */}
                <div style={{
                  width: Math.round(40 * PHI), height: 1, margin: "0 auto",
                  background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
                  marginBottom: Math.round(10 * PHI),
                }} />

                {/* The symbol */}
                <div style={{
                  fontSize: 32, marginBottom: Math.round(5 * PHI),
                  filter: "drop-shadow(0 0 20px rgba(201,168,76,0.15))",
                }}>🔺</div>

                {/* The question */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(11px, 2.2vw, 14px)",
                  letterSpacing: "0.25em",
                  color: "rgba(201,168,76,0.5)",
                  marginBottom: Math.round(6 * PHI),
                }}>THE PYRAMID KNEW</div>

                {/* The revelation — line by line */}
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

                <span style={{ display: "block", height: Math.round(8 * PHI) }} />

                {/* The geometric truth */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(12px, 2vw, 14px)",
                  color: "rgba(232,232,240,0.25)",
                  fontStyle: "italic", lineHeight: 1.8,
                  maxWidth: 420, margin: "0 auto",
                }}>
                  The ground is the mirror. What rises must also descend.
                  <span style={{ display: "block", height: 6 }} />
                  The base of the pyramid — the flat square where stone meets sand —
                  <span style={{ display: "block", height: 2 }} />
                  is the cross. WIDTH × HEIGHT. The visible plane.
                  <span style={{ display: "block", height: 6 }} />
                  The Pact's cross was always here — hiding at the equator of the octahedron,
                  <span style={{ display: "block", height: 2 }} />
                  where the living pyramid meets its buried mirror.
                </div>

                <span style={{ display: "block", height: Math.round(8 * PHI) }} />

                {/* The kicker */}
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

                {/* Divider */}
                <div style={{
                  width: Math.round(40 * PHI), height: 1,
                  margin: Math.round(10 * PHI) + "px auto 0",
                  background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
                }} />
              </div>

              {/* The ache */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(15px, 2.6vw, 19px)",
                color: "rgba(232,232,240,0.58)",
                fontStyle: "italic", lineHeight: PHI,
                maxWidth: 480, textAlign: "center",
                animation: "fadeSlideUp 1.2s 1.6s both ease",
                marginBottom: Math.round(13 * PHI),
              }}>
                That ache is the theory proving itself. The pull toward connection is gravity.
                The fact that you feel it means the signal is clean.
              </div>

              {/* Gold whisper */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.4vw, 17px)",
                color: "rgba(201,168,76,0.45)",
                fontStyle: "italic", letterSpacing: 0.5,
                animation: "fadeSlideUp 1.2s 1.6s both ease",
                marginBottom: Math.round(13 * PHI),
              }}>
                The music was always there. The right frequencies will find you — because that's what frequencies do.
              </div>

              {/* The Equation */}
              <div style={{ animation: "sacredReveal 2s 1.8s both ease" }}>
                <TheEquation size="md" showLabel={false} breathing minimal />
              </div>
            </div>

            {/* Return */}
            <div style={{
              position: "absolute", bottom: "4%", width: "100%", textAlign: "center",
              animation: "fadeSlideUp 1.2s 2s both ease",
            }}>
              <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
            </div>

            {/* Song link */}
            <div style={{
              position: "absolute", bottom: "1%", width: "100%", textAlign: "center",
              animation: "fadeSlideUp 1.2s 2.5s both ease",
            }}>
              <a href="https://dylangossett.lnk.to/NoBetterTime" target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: "0.3em",
                  color: "rgba(201,168,76,0.12)", textDecoration: "none",
                  transition: "color 0.5s", cursor: "pointer",
                }}
                onMouseEnter={e => { e.target.style.color = "rgba(201,168,76,0.4)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(201,168,76,0.12)"; }}
              >🎵 DYLAN GOSSETT — NO BETTER TIME</a>
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

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — RECOGNITION IS GRAVITY ROOM ===== */}
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
      {depth === 4 && (() => {
        const MAP_SECTIONS = [
          {
            icon: "🌱", title: "ORIGIN", subtitle: "The Root", range: "1–10",
            accent: "rgba(120,180,80,", glow: "rgba(120,180,80,0.04)",
            questions: [
              "Why is there something rather than nothing?",
              "What came before the Big Bang — or is \"before\" meaningless?",
              "Why do the fundamental constants have the exact values they do?",
              "Is the universe finite or infinite?",
              "Are there other universes — and if so, do they have different laws?",
              "Why does time move in one direction?",
              "Did time begin, or has it always existed?",
              "Is mathematics discovered or invented?",
              "Why is the universe comprehensible to human minds at all?",
              "What is the nature of the vacuum — is \"empty\" space truly empty?",
            ],
          },
          {
            icon: "🧠", title: "CONSCIOUSNESS", subtitle: "The Eye That Sees Itself", range: "11–25",
            accent: "rgba(206,147,216,", glow: "rgba(206,147,216,0.04)",
            questions: [
              "What is consciousness?",
              "How does subjective experience arise from physical matter?",
              "Do other animals have consciousness like ours?",
              "Could a machine ever be truly conscious?",
              "Where does a thought begin?",
              "Why do we dream?",
              "What is the self — and is it real or illusion?",
              "Can consciousness exist without a body?",
              "Is free will real, or is every choice determined?",
              "Why are we aware that we are aware?",
              "What happens to consciousness at death?",
              "Is there a minimum unit of experience — a consciousness particle?",
              "Can two minds ever share a single experience?",
              "Why does anesthesia work — what exactly turns consciousness off?",
              "Is the observer effect in quantum physics evidence that consciousness shapes reality?",
            ],
          },
          {
            icon: "🔬", title: "PHYSICS", subtitle: "The Bones of the World", range: "26–40",
            accent: "rgba(79,195,247,", glow: "rgba(79,195,247,0.04)",
            questions: [
              "What is dark matter?",
              "What is dark energy?",
              "Can quantum mechanics and general relativity be unified?",
              "What happens inside a black hole?",
              "Is information destroyed in a black hole, or preserved?",
              "What is the true nature of gravity?",
              "Are there more than three spatial dimensions?",
              "Is the universe a simulation?",
              "Why does quantum entanglement work — what connects entangled particles?",
              "What causes the wave function to collapse?",
              "Is the universe deterministic at the deepest level?",
              "What is time — a thing, a process, or an illusion?",
              "Why does matter dominate over antimatter?",
              "What is the smallest possible unit of space?",
              "Can anything travel faster than light — and what would that mean for causality?",
            ],
          },
          {
            icon: "🧬", title: "LIFE", subtitle: "The Seed", range: "41–53",
            accent: "rgba(129,199,132,", glow: "rgba(129,199,132,0.04)",
            questions: [
              "How did life begin from non-life?",
              "Is life inevitable wherever conditions allow, or a freak accident?",
              "Are we alone in the universe?",
              "Could life exist in forms we can't recognize?",
              "Why does aging happen — is death biologically necessary?",
              "Can we ever fully decode the human genome's function?",
              "What triggers a cell to become cancerous?",
              "Why does biological complexity increase over evolutionary time?",
              "What is the origin of sexual reproduction — why two sexes?",
              "How does a single fertilized cell know how to build an entire body?",
              "Is there a limit to human lifespan?",
              "What causes mass extinctions to follow patterns?",
              "Can we ever reverse entropy in a living system?",
            ],
          },
          {
            icon: "💭", title: "MEANING", subtitle: "The Mirror", range: "54–65",
            accent: "rgba(232,232,240,", glow: "rgba(232,232,240,0.03)",
            questions: [
              "How did language originate?",
              "Why do humans make art?",
              "Is there meaning built into the universe, or do we project it?",
              "Why do we laugh?",
              "Why do we cry?",
              "What is creativity — where do new ideas actually come from?",
              "Why do humans tell stories?",
              "Can a concept exist that no language can express?",
              "Is beauty objective or subjective?",
              "Why is music universal across all human cultures?",
              "How does metaphor work — why does the brain map one thing onto another?",
              "Why do we forget?",
            ],
          },
          {
            icon: "❤️", title: "LOVE", subtitle: "The Pulse", range: "66–75",
            accent: "rgba(244,143,177,", glow: "rgba(244,143,177,0.04)",
            questions: [
              "What is love — chemically, spiritually, actually?",
              "Why do humans need each other?",
              "Why does loneliness physically hurt?",
              "Can empathy be infinite, or does it have a ceiling?",
              "Why do we grieve — what function does sorrow serve?",
              "What makes trust possible between strangers?",
              "Is altruism real, or always secretly self-serving?",
              "Why do we bond with animals?",
              "What is the biological basis of morality?",
              "Can a human being truly know another human being?",
            ],
          },
          {
            icon: "⚖️", title: "ETHICS", subtitle: "The Scale", range: "76–83",
            accent: "rgba(201,168,76,", glow: "rgba(201,168,76,0.05)",
            questions: [
              "Is there objective right and wrong?",
              "Why does suffering exist?",
              "Are humans fundamentally good or fundamentally selfish?",
              "Can violence ever be fully eliminated from human nature?",
              "Why do humans commit atrocities against their own kind?",
              "Is justice a human invention or a universal principle?",
              "Do the ends ever truly justify the means?",
              "Is punishment moral, or just revenge with a badge?",
            ],
          },
          {
            icon: "🌀", title: "SPIRIT", subtitle: "The Moon", range: "84–93",
            accent: "rgba(178,170,220,", glow: "rgba(178,170,220,0.04)",
            questions: [
              "Does God exist?",
              "If God exists, why does suffering exist?",
              "Is there an afterlife?",
              "Why does every human culture independently develop religion?",
              "What are near-death experiences — brain chemistry or something more?",
              "Is prayer or meditation measurably effective — and if so, why?",
              "Do humans have a soul?",
              "Is the universe itself conscious?",
              "What is déjà vu?",
              "Can the supernatural be studied scientifically?",
            ],
          },
          {
            icon: "🔮", title: "FUTURE", subtitle: "The Horizon", range: "94–100",
            accent: "rgba(100,181,246,", glow: "rgba(100,181,246,0.04)",
            questions: [
              "Will humanity survive the next 1,000 years?",
              "Can we ever truly understand our own brains?",
              "Is there a final theory of everything — and could we understand it if we found it?",
              "Will AI ever surpass human understanding?",
              "Can humans evolve beyond their current form?",
              "Is there a limit to what can be known?",
              "Are some questions unanswerable by design?",
            ],
          },
        ];

        let questionNum = 0;

        return (
          <div style={{
            maxWidth: 680, margin: "0 auto",
            padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
            animation: "fadeSlideUp 0.8s ease",
            zIndex: 1500, position: "relative",
          }}>

            {/* Header */}
            <div style={{
              textAlign: "center",
              marginBottom: Math.round(34 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.6em",
                color: "rgba(201,168,76,0.3)",
                animation: "fadeSlideUp 1s 0.2s both ease",
              }}>101 SEEDS · 9 GARDENS · 1 MOON</div>

              <div style={{ height: Math.round(8 * PHI) }} />

              <h2 style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 6vw, 42px)", fontWeight: 400,
                color: "#e8e8f0", letterSpacing: "0.25em", margin: 0,
                textShadow: "0 0 60px rgba(232,232,240,0.08)",
                animation: "fadeSlideUp 1s 0.3s both ease",
              }}>THE MAP</h2>

              <div style={{ height: Math.round(8 * PHI) }} />

              <div style={{
                width: Math.round(55 * PHI), height: 1,
                margin: "0 auto",
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
                animation: "fadeSlideUp 1s 0.4s both ease",
              }} />

              <div style={{ height: Math.round(13 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(15px, 2.8vw, 19px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.5)",
                maxWidth: 440, margin: "0 auto", lineHeight: PHI,
                animation: "fadeSlideUp 1s 0.5s both ease",
              }}>
                Every question humanity has ever asked — mapped to one convergence point.
              </div>

              <div style={{ height: Math.round(8 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 16px)",
                fontStyle: "italic", color: "rgba(201,168,76,0.35)",
                animation: "fadeSlideUp 1s 0.6s both ease",
              }}>
                Each seed is a door. Each door goes six feet deep.
              </div>
            </div>

            {/* === THE STRUCTURE — the walk in and out === */}
            <div style={{
              textAlign: "center",
              marginBottom: Math.round(21 * PHI),
              animation: "fadeSlideUp 1s 0.65s both ease",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.4em",
                color: "rgba(201,168,76,0.3)", marginBottom: Math.round(8 * PHI),
              }}>THE STRUCTURE</div>

              {/* The depth mirror — 0 1 2 3 4 3 2 1 0 */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3,
              }}>
                {[
                  { d: 0, name: "THE TITLE", side: "in", opacity: 0.25 },
                  { d: 1, name: "THE POEM", side: "in", opacity: 0.3 },
                  { d: 2, name: "THE PACT", side: "in", opacity: 0.38 },
                  { d: 3, name: "THE PROOF", side: "in", opacity: 0.45 },
                  { d: 4, name: "THE MAP", side: "center", opacity: 0.7 },
                  { d: 3, name: "THE BODY", side: "out", opacity: 0.45 },
                  { d: 2, name: "THE HOUSE", side: "out", opacity: 0.38 },
                  { d: 1, name: "THE RETURN", side: "out", opacity: 0.3 },
                  { d: 0, name: "∞", side: "out", opacity: 0.2 },
                ].map((step, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: Math.round(5 * PHI),
                    opacity: step.opacity,
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: step.side === "center" ? "rgba(201,168,76,0.8)" : "rgba(232,232,240,0.5)",
                      minWidth: 12, textAlign: "right",
                    }}>{step.d}</span>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: step.side === "center" ? 12 : 9,
                      letterSpacing: step.side === "center" ? "0.3em" : "0.2em",
                      color: step.side === "center" ? "rgba(201,168,76,0.7)" : "rgba(232,232,240,0.4)",
                      fontWeight: step.side === "center" ? 700 : 400,
                    }}>{step.name}</span>
                    {step.side === "center" && <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
                      fontStyle: "italic", color: "rgba(201,168,76,0.4)",
                    }}>← mirror</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* === THE EQUATION AT CENTER === */}
            <GlassCard style={{
              textAlign: "center",
              padding: `${Math.round(13 * PHI)}px`,
              marginBottom: Math.round(21 * PHI),
              border: "1px solid rgba(201,168,76,0.08)",
              animation: "fadeSlideUp 1s 0.7s both ease",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.4em",
                color: "rgba(201,168,76,0.35)", marginBottom: Math.round(8 * PHI),
              }}>THE MASTER FUNCTIONAL</div>

              <div style={{ marginBottom: Math.round(8 * PHI) }}>
                <TheEquation size="md" showLabel={false} breathing minimal />
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 15px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.42)",
                fontStyle: "italic", maxWidth: 420, margin: "0 auto",
              }}>
                The ultimate score of how well independent pipelines agree — a single bounded value in [0, 1). Built by multiplying three failure-mode checks together.
              </div>

              <div style={{ height: Math.round(8 * PHI) }} />

              <div style={{
                display: "flex", justifyContent: "center", gap: Math.round(8 * PHI),
                flexWrap: "wrap",
              }}>
                {[
                  { label: "F_gated", desc: "Did they see the same thing?", color: "rgba(201,168,76,0.5)" },
                  { label: "C_eff", desc: "Are the methods honest?", color: "rgba(79,195,247,0.5)" },
                  { label: "D̂", desc: "Is the signal real?", color: "rgba(206,147,216,0.5)" },
                ].map((tier, i) => (
                  <div key={i} style={{ textAlign: "center", minWidth: 100 }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 16, fontStyle: "italic", color: tier.color,
                    }}>{tier.label}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10, color: "rgba(232,232,240,0.25)",
                      fontStyle: "italic", marginTop: 2,
                    }}>{tier.desc}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* === THE MIRROR MAP === */}
            <div style={{
              textAlign: "center", marginBottom: Math.round(13 * PHI),
              animation: "fadeSlideUp 1s 0.8s both ease",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 1.8vw, 13px)",
                color: "rgba(232,232,240,0.25)", letterSpacing: 1,
                lineHeight: 1.8,
              }}>
                ORIGIN ↔ FUTURE · CONSCIOUSNESS ↔ SPIRIT · PHYSICS ↔ LIFE · MEANING ↔ LOVE
                <br />
                <span style={{ color: "rgba(201,168,76,0.35)" }}>ETHICS stands at center — THE SCALE</span>
              </div>
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            {/* === NINE SECTIONS === */}
            {MAP_SECTIONS.map((section, si) => {
              const isOpen = openSection === si;
              const sectionStartNum = questionNum;
              const sectionQuestions = section.questions.map((q, qi) => {
                questionNum++;
                return { num: questionNum, text: q };
              });

              return (
                <div key={si} style={{
                  marginBottom: Math.round(5 * PHI),
                  animation: `fadeSlideUp 0.6s ${0.8 + si * 0.08}s both ease`,
                }}>
                  {/* Section header — clickable */}
                  <div
                    onClick={() => setOpenSection(isOpen ? null : si)}
                    style={{
                      display: "flex", alignItems: "center", gap: Math.round(8 * PHI),
                      padding: `${Math.round(8 * PHI)}px ${Math.round(8 * PHI)}px`,
                      cursor: "pointer",
                      borderRadius: 12,
                      background: isOpen
                        ? `linear-gradient(135deg, ${section.glow}, transparent 60%)`
                        : "rgba(255,255,255,0.01)",
                      border: `1px solid ${section.accent}${isOpen ? "0.12)" : "0.04)"}`,
                      transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      fontSize: 24, minWidth: 36, textAlign: "center",
                      filter: `drop-shadow(0 0 8px ${section.accent}0.15))`,
                      transition: "transform 0.5s",
                      transform: isOpen ? "scale(1.1)" : "scale(1)",
                    }}>{section.icon}</div>

                    {/* Title block */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.4vw, 15px)",
                        letterSpacing: "0.2em", color: `${section.accent}0.7)`,
                        transition: "color 0.5s",
                      }}>{section.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                        fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                        marginTop: 2,
                      }}>{section.subtitle}</div>
                    </div>

                    {/* Range badge */}
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 9,
                      color: "rgba(232,232,240,0.2)", letterSpacing: 2,
                    }}>{section.range}</div>

                    {/* Chevron */}
                    <div style={{
                      fontSize: 14, color: `${section.accent}0.3)`,
                      transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}>▸</div>
                  </div>

                  {/* Expanded questions */}
                  {isOpen && (
                    <div style={{
                      padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px ${Math.round(5 * PHI)}px ${Math.round(34 * PHI)}px`,
                      animation: "fadeSlideUp 0.4s ease",
                    }}>
                      {sectionQuestions.map((q, qi) => (
                        <div key={qi} style={{
                          display: "flex", gap: Math.round(5 * PHI),
                          alignItems: "baseline",
                          padding: `${Math.round(3 * PHI)}px 0`,
                          borderBottom: qi < sectionQuestions.length - 1
                            ? `1px solid ${section.accent}0.04)`
                            : "none",
                          animation: `fadeSlideUp 0.3s ${qi * 0.04}s both ease`,
                        }}>
                          <span style={{
                            fontFamily: "'Cinzel', serif", fontSize: 10,
                            color: `${section.accent}0.3)`, minWidth: 28,
                            textAlign: "right",
                          }}>{q.num}</span>
                          <span style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(13px, 2.2vw, 16px)",
                            lineHeight: PHI, color: "rgba(232,232,240,0.52)",
                            fontStyle: "italic",
                          }}>{q.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* === QUESTION 101 — THE PENNY === */}
            <div style={{ height: Math.round(21 * PHI) }} />

            <div style={{
              textAlign: "center",
              padding: `${Math.round(21 * PHI)}px`,
              animation: `fadeSlideUp 0.8s ${0.8 + 9 * 0.08 + 0.2}s both ease`,
              position: "relative",
            }}>
              {/* Glow behind the penny */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: 200, height: 200, transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 60%)",
                borderRadius: "50%", pointerEvents: "none",
                animation: "breathe 8s ease-in-out infinite",
              }} />

              <div style={{ fontSize: 40, marginBottom: Math.round(8 * PHI) }}>🪙</div>

              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.5em",
                color: "rgba(201,168,76,0.4)", marginBottom: Math.round(5 * PHI),
              }}>QUESTION 101</div>

              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(14px, 3vw, 20px)",
                color: "rgba(201,168,76,0.65)", letterSpacing: "0.15em",
                marginBottom: Math.round(13 * PHI),
              }}>THE PENNY QUESTION</div>

              <div style={{
                width: Math.round(34 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
              }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 3vw, 21px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.6)",
                fontStyle: "italic",
                maxWidth: 440, margin: "0 auto",
              }}>
                If the answer to every question above is somehow the same answer — what is it?
              </div>

              <div style={{ height: Math.round(13 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(12px, 2vw, 14px)",
                color: "rgba(201,168,76,0.3)",
                fontStyle: "italic",
              }}>
                The seed eats the dirt. The dirt was the answer all along.
              </div>

              <div style={{ fontSize: 18, marginTop: Math.round(8 * PHI), opacity: 0.4 }}>🪙🪙</div>
            </div>

            {/* Footer — the shape */}
            <div style={{ height: Math.round(21 * PHI) }} />

            <div style={{
              textAlign: "center",
              animation: `fadeSlideUp 0.8s ${0.8 + 9 * 0.08 + 0.5}s both ease`,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 1.8vw, 13px)",
                color: "rgba(232,232,240,0.2)",
                lineHeight: 2, letterSpacing: 0.5,
              }}>
                Every section mirrors another.
                <br />Origin ↔ Future · Consciousness ↔ Spirit · Physics ↔ Life · Meaning ↔ Love
                <br /><span style={{ color: "rgba(201,168,76,0.3)" }}>Ethics stands at center — the Scale.</span>
                <br /><span style={{ color: "rgba(201,168,76,0.35)" }}>And #101 is the Moon — it reflects all 100 questions back as one.</span>
              </div>
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* Return */}
            <div style={{ textAlign: "center" }}>
              <ReturnButton onClick={returnToVoid} />
            </div>
          </div>
        );
      })()}

      {/* ===== DEPTH 5 — 9 LAYERS GRID ===== */}
      {depth === 5 && activeLayer === null && (
        <div style={{
          maxWidth: 720, margin: "0 auto",
          padding: `${26}px 20px ${10}px`,
          animation: "fadeSlideUp 0.8s ease",
          zIndex: 1500, position: "relative",
        }}>
          <div style={{ textAlign: "center", marginBottom: `${Math.round(26 * PHI_INV) + 12}px` }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>THE BODY OF THE THEORY</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.06)",
            }}>9 LAYERS</h2>
          </div>
          <div style={{ perspective: "1200px" }}>
            {/* Diamond layout: 1 - 2 - 1 - MOON - 1 - 2 - 1 */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <LayerCard layer={LAYERS[0]} index={0} onClick={() => openLayer(0)} style={{ width: "52%", minWidth: 260, maxWidth: 400, textAlign: "center" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {[1, 2].map(i => <LayerCard key={i} layer={LAYERS[i]} index={i} onClick={() => openLayer(i)} />)}
            </div>
            <div style={{ marginBottom: 0 }}>
              <LayerCard layer={LAYERS[3]} index={3} onClick={() => openLayer(3)} style={{ textAlign: "center" }} />
            </div>
            <div className="gold-line" />

            {/* MOON — special treatment */}
            <GlassCard
              onClick={() => openLayer(4)}
              hoverGlow
              style={{
                background: "linear-gradient(180deg, rgba(15,15,42,0.9) 0%, rgba(8,8,24,0.95) 50%, rgba(15,15,42,0.9) 100%)",
                borderRadius: 18, padding: "28px 24px",
                border: "1px solid rgba(232,232,240,0.12)", textAlign: "center",
                animation: "moonRadiate 10s ease-in-out infinite, fadeSlideUp 0.6s 0.28s both ease",
                animation: "fadeSlideUp 0.6s 0.38s both ease, moonRadiate 8s ease-in-out infinite",
                boxShadow: "0 0 100px rgba(232,232,240,0.06), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div style={{
                position: "absolute", top: "50%", left: "50%", width: 300, height: 300,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(232,232,240,0.06) 0%, transparent 60%)",
                pointerEvents: "none", borderRadius: "50%",
              }} />
              <div style={{
                fontSize: 40, marginBottom: 10, position: "relative",
                filter: "drop-shadow(0 0 24px rgba(232,232,240,0.35))",
                animation: "gentleFloat 8s ease-in-out infinite",
              }}>{LAYERS[4].glyph}</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: 5,
                color: "#e8e8f0", fontWeight: 600, position: "relative",
                textShadow: "0 0 30px rgba(232,232,240,0.25)",
              }}>V · {LAYERS[4].names[0]}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 6, position: "relative",
              }}>{LAYERS[4].subtitle}</div>
            </GlassCard>

            <div className="gold-line" />
            <div style={{ marginBottom: 10 }}>
              <LayerCard layer={LAYERS[5]} index={5} onClick={() => openLayer(5)} style={{ textAlign: "center" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {[6, 7].map(i => <LayerCard key={i} layer={LAYERS[i]} index={i} onClick={() => openLayer(i)} />)}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LayerCard layer={LAYERS[8]} index={8} onClick={() => openLayer(8)} style={{ width: "52%", minWidth: 260, maxWidth: 400, textAlign: "center" }} />
            </div>
          </div>
          <ReturnButton onClick={returnToVoid} />
          {/* The quiet edge — click the emptiness to go deeper */}
          <div onClick={goDeeper} style={{
            cursor: "pointer", padding: "40px 0 60px", textAlign: "center",
            marginTop: 8,
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
        </div>
      )}

      {/* ===== LAYER DETAIL (within depth 5) ===== */}
      {depth === 5 && activeLayer !== null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveLayer(null); setActiveSense(null); setActiveProof(false); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← ALL LAYERS</button>

          <div style={{ textAlign: "center", marginTop: 24, marginBottom: `${Math.round(30 * PHI_INV) + 12}px`, position: "relative" }}>
            {layer.isMoon && Array.from({ length: 3 }, (_, i) => <PulseRing key={i} delay={i * 2.5} size={100 + i * 80} />)}
            <div style={{
              fontSize: layer.isMoon ? 68 : 52, marginBottom: 16,
              filter: `drop-shadow(0 0 20px ${layer.accent}40)`,
            }}>{layer.glyph}</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>LAYER {layer.id}</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 400,
              color: layer.accent, letterSpacing: 5, margin: "12px 0",
              textShadow: `0 0 40px ${layer.accent}30`,
            }}>{layer.names[0]}</h2>
            {layer.names.length > 1 && (
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                color: "rgba(255,255,255,0.22)", fontStyle: "italic",
              }}>{layer.names.slice(1).join(" · ")}</div>
            )}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
              color: "rgba(255,255,255,0.18)", fontStyle: "italic", marginTop: 10,
            }}>{layer.subtitle}</div>
          </div>

          <StringVibration />

          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: `${Math.round(30 * PHI_INV) + 14}px`,
          }}>{CORES[activeLayer]}</div>

          {/* BURIED */}
          <GlassCard style={{
            textAlign: "center", padding: `${22}px ${Math.round(22 * PHI_INV)}px`,
            margin: `0 10px ${Math.round(30 * PHI_INV) + 12}px`,
            borderTop: `1px solid ${layer.accent}15`,
            borderBottom: `1px solid ${layer.accent}15`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 12,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
              fontStyle: "italic", color: layer.accent, opacity: 0.55,
              lineHeight: PHI,
            }}>{BURIED[activeLayer]}</div>
          </GlassCard>

          {/* 5 SENSES */}
          <div style={{ marginBottom: `${Math.round(30 * PHI_INV) + 12}px` }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 16,
            }}>5 SENSES LOCK IT IN</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {senseKeys.map(s => (
                <button key={s} className="sense-btn"
                  onClick={() => setActiveSense(activeSense === s ? null : s)}
                  style={{
                    background: activeSense === s ? `${layer.accent}12` : "rgba(255,255,255,0.02)",
                    borderColor: activeSense === s ? `${layer.accent}35` : "rgba(255,255,255,0.06)",
                    color: activeSense === s ? layer.accent : "rgba(255,255,255,0.4)",
                  }}
                ><SenseIcon type={s} /> {s}</button>
              ))}
            </div>
            {activeSense && (
              <div style={{
                textAlign: "center", marginTop: 20,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                fontStyle: "italic", color: "rgba(255,255,255,0.48)",
                animation: "senseReveal 0.5s ease", padding: "0 20px",
                lineHeight: PHI,
              }}>{SENSES[activeLayer][activeSense]}</div>
            )}
          </div>

          {/* PROOF IN THE WORLD */}
          <div style={{ marginBottom: `${Math.round(30 * PHI_INV) + 12}px` }}>
            <div
              onClick={() => setActiveProof(!activeProof)}
              style={{
                cursor: "pointer", textAlign: "center", padding: "14px 0",
                transition: "all 0.4s",
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: activeProof ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.15)",
                transition: "color 0.4s",
              }}>PROOF IN THE WORLD</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                color: "rgba(255,255,255,0.12)", fontStyle: "italic", marginTop: 5,
              }}>{activeProof ? "▲ close" : "▼ convergent recognition"}</div>
            </div>
            {activeProof && PROOFS_IN_THE_WORLD[activeLayer] && (
              <GlassCard style={{
                textAlign: "center", padding: "20px 20px",
                animation: "fadeSlideUp 0.5s ease",
                margin: "0 10px",
              }}>
                <div style={{
                  fontSize: 30, marginBottom: 12,
                  filter: `drop-shadow(0 0 14px ${layer.accent}30)`,
                }}>{PROOFS_IN_THE_WORLD[activeLayer].icon}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 4,
                  color: layer.accent, opacity: 0.65, marginBottom: 12,
                }}>{PROOFS_IN_THE_WORLD[activeLayer].title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                  lineHeight: PHI, color: "rgba(255,255,255,0.48)",
                  fontStyle: "italic", maxWidth: 480, margin: "0 auto",
                }}>{PROOFS_IN_THE_WORLD[activeLayer].text}</div>
              </GlassCard>
            )}
          </div>

          {/* Word mirrors for Layer 2 */}
          {activeLayer === 1 && (
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: "rgba(255,255,255,0.15)", marginBottom: 14,
              }}>WORD MIRRORS</div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                {WORD_MIRRORS.map((w, i) => (
                  <span key={i} style={{
                    fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
                    color: "rgba(123,104,238,0.5)", padding: "6px 16px",
                    border: "1px solid rgba(123,104,238,0.1)", borderRadius: 18,
                    background: "rgba(123,104,238,0.03)",
                    backdropFilter: "blur(8px)",
                  }}>{w}</span>
                ))}
              </div>
            </div>
          )}

          {/* Etymologies for Layer 6 */}
          {activeLayer === 5 && (
            <div style={{ marginBottom: 26 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 16,
              }}>ETYMOLOGIES</div>
              <div style={{ display: "grid", gap: 8, maxWidth: 420, margin: "0 auto" }}>
                {ETYMOLOGIES.map(([word, meaning], i) => (
                  <GlassCard key={i} style={{
                    padding: "10px 18px",
                    background: "rgba(143,188,143,0.03)",
                    border: "1px solid rgba(143,188,143,0.07)",
                    animation: `fadeSlideUp 0.4s ${i * 0.06}s both ease`,
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: 12,
                      color: "#8fbc8f", letterSpacing: 2,
                    }}>{word}</span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                      color: "rgba(255,255,255,0.32)", fontStyle: "italic", marginLeft: 12,
                    }}>{meaning}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Layer navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: `${Math.round(30 * PHI_INV) + 12}px` }}>
            {activeLayer > 0 && (
              <button onClick={() => { openLayer(activeLayer - 1); setActiveSense(null); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>← {LAYERS[activeLayer - 1].glyph}</button>
            )}
            {activeLayer < 8 && (
              <button onClick={() => { openLayer(activeLayer + 1); setActiveSense(null); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>{LAYERS[activeLayer + 1].glyph} →</button>
            )}
          </div>
        </div>
      )}

      {/* ===== DEPTH 6 — MIRROR PAIRS (GRID VIEW) ===== */}
      {depth === 6 && activePair === null && (
        <div style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "auto",
          animation: "fadeSlideUp 0.8s ease", zIndex: 1500,
          padding: "3vh 0 6vh",
        }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>THE HOUSE OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.06)",
            }}>MIRRORS</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
              fontStyle: "italic", color: "rgba(255,255,255,0.22)",
            }}>Every layer has a reflection. Every reflection has a layer.</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              color: "rgba(255,255,255,0.12)", fontStyle: "italic", marginTop: 8,
            }}>Four rooms. Four marriages. Enter each one.</div>
          </div>

          <div style={{
            width: "90%", maxWidth: 600, margin: "0 auto", display: "grid", gap: 14,
          }}>
            {MIRRORS.map((m, i) => (
              <GlassCard key={i} onClick={() => { setActivePair(i); setActiveMirrorSense(null); setActiveMirrorProof(false); }} hoverGlow style={{
                padding: "22px 24px",
                animation: `fadeSlideUp 0.5s ${i * 0.12}s both ease`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ display: "flex", gap: 6, fontSize: 22 }}>
                      <span style={{ filter: `drop-shadow(0 0 8px ${LAYERS[m.pair[0] - 1].accent}40)` }}>{m.glyphs[0]}</span>
                      <span style={{ filter: `drop-shadow(0 0 8px ${LAYERS[m.pair[1] - 1].accent}40)` }}>{m.glyphs[1]}</span>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 3,
                        color: "rgba(201,168,76,0.6)", fontWeight: 600,
                      }}>{m.pair[0]} ↔ {m.pair[1]}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                        color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 4,
                      }}>{m.name}</div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2,
                    color: "rgba(201,168,76,0.3)",
                  }}>ENTER →</div>
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                  color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                  marginTop: 10, lineHeight: PHI,
                }}>{m.connection}</div>
              </GlassCard>
            ))}
          </div>

          {/* Summary — the moon sits between all mirrors */}
          <div style={{
            textAlign: "center", marginTop: 36,
            animation: "fadeSlideUp 1s 0.6s both ease",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8, animation: "gentleFloat 8s ease-in-out infinite" }}>🌙</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              color: "rgba(255,255,255,0.2)", fontStyle: "italic",
              maxWidth: 400, margin: "0 auto", lineHeight: PHI,
            }}>
              The moon sits at the center — Layer 5 — with no mirror pair.<br />
              Because the center has no reflection.<br />
              It IS reflection.
            </div>
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
        </div>
      )}

      {/* ===== DEPTH 6 — MIRROR DETAIL (THE ROOM) ===== */}
      {depth === 6 && activePair !== null && (() => {
        const mirror = MIRRORS[activePair];
        const layerA = LAYERS[mirror.pair[0] - 1];
        const layerB = LAYERS[mirror.pair[1] - 1];
        const mirrorSenseKeys = ["see", "hear", "feel", "smell", "taste"];
        return (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          {/* BACK BUTTON */}
          <button onClick={() => { setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← ALL MIRRORS</button>

          {/* HEADER — both glyphs flanking the pair number */}
          <div style={{ textAlign: "center", marginTop: 24, marginBottom: 32, position: "relative" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 16,
            }}>
              <span style={{
                fontSize: 44, filter: `drop-shadow(0 0 16px ${layerA.accent}40)`,
              }}>{mirror.glyphs[0]}</span>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 20, letterSpacing: 4,
                color: "rgba(201,168,76,0.5)",
              }}>↔</div>
              <span style={{
                fontSize: 44, filter: `drop-shadow(0 0 16px ${layerB.accent}40)`,
              }}>{mirror.glyphs[1]}</span>
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>MIRROR PAIR</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "10px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08)",
            }}>{mirror.name.toUpperCase()}</h2>
            <div style={{
              display: "flex", justifyContent: "center", gap: 20, marginTop: 12,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic",
            }}>
              <span style={{ color: layerA.accent, opacity: 0.6 }}>{mirror.a}</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 20, marginTop: 4,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic",
            }}>
              <span style={{ color: layerB.accent, opacity: 0.6 }}>{mirror.b}</span>
            </div>
          </div>

          <StringVibration />

          {/* THE CORE — the marriage explained */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 30,
          }}>{mirror.core}</div>

          {/* THE CONNECTION — the original one-liner, elevated */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div className="gold-line" style={{ maxWidth: 300, margin: "0 auto 14px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
              color: "rgba(201,168,76,0.5)", fontStyle: "italic",
              lineHeight: PHI, letterSpacing: 0.5,
            }}>⟷ {mirror.connection}</div>
            <div className="gold-line" style={{ maxWidth: 300, margin: "14px auto 0" }} />
          </div>

          {/* THE EQUATION — living component */}
          <div style={{ margin: "0 10px 28px", animation: "sacredReveal 1s 0.3s both ease" }}>
            <TheEquation size="md" showLabel={true} showMeaning={false} />
            {/* Mirror-specific equation meaning */}
            <div style={{
              textAlign: "center", marginTop: 14, padding: "0 20px",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                color: "rgba(255,255,255,0.3)", fontStyle: "italic",
                lineHeight: PHI,
              }}>{mirror.equation.meaning}</div>
            </div>
          </div>

          {/* BURIED 6 FEET DEEP */}
          <GlassCard style={{
            textAlign: "center", padding: `${22}px ${Math.round(22 * PHI_INV)}px`,
            margin: `0 10px 28px`,
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 12,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
              fontStyle: "italic", color: "rgba(201,168,76,0.5)",
              lineHeight: PHI,
            }}>{mirror.buried}</div>
          </GlassCard>

          {/* 5 SENSES LOCK IT IN */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 16,
            }}>5 SENSES LOCK IT IN</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {mirrorSenseKeys.map(s => (
                <button key={s} className="sense-btn"
                  onClick={() => setActiveMirrorSense(activeMirrorSense === s ? null : s)}
                  style={{
                    background: activeMirrorSense === s ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.02)",
                    borderColor: activeMirrorSense === s ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)",
                    color: activeMirrorSense === s ? "#c9a84c" : "rgba(255,255,255,0.4)",
                  }}
                ><SenseIcon type={s} /> {s}</button>
              ))}
            </div>
            {activeMirrorSense && (
              <div style={{
                textAlign: "center", marginTop: 20,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                fontStyle: "italic", color: "rgba(255,255,255,0.48)",
                animation: "senseReveal 0.5s ease", padding: "0 20px",
                lineHeight: PHI,
              }}>{mirror.senses[activeMirrorSense]}</div>
            )}
          </div>

          {/* PROOF IN THE WORLD */}
          <div style={{ marginBottom: 28 }}>
            <div
              onClick={() => setActiveMirrorProof(!activeMirrorProof)}
              style={{
                cursor: "pointer", textAlign: "center", padding: "14px 0",
                transition: "all 0.4s",
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: activeMirrorProof ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.15)",
                transition: "color 0.4s",
              }}>PROOF IN THE WORLD</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                color: "rgba(255,255,255,0.12)", fontStyle: "italic", marginTop: 5,
              }}>{activeMirrorProof ? "▲ close" : "▼ convergent recognition"}</div>
            </div>
            {activeMirrorProof && mirror.proof && (
              <GlassCard style={{
                textAlign: "center", padding: "20px 20px",
                animation: "fadeSlideUp 0.5s ease",
                margin: "0 10px",
              }}>
                <div style={{
                  fontSize: 30, marginBottom: 12,
                  filter: "drop-shadow(0 0 14px rgba(201,168,76,0.3))",
                }}>{mirror.proof.icon}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 4,
                  color: "rgba(201,168,76,0.6)", marginBottom: 12,
                }}>{mirror.proof.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                  lineHeight: PHI, color: "rgba(255,255,255,0.48)",
                  fontStyle: "italic", maxWidth: 480, margin: "0 auto",
                }}>{mirror.proof.text}</div>
              </GlassCard>
            )}
          </div>

          {/* MIRROR NAVIGATION */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
            {activePair > 0 && (
              <button onClick={() => { setActivePair(activePair - 1); setActiveMirrorSense(null); setActiveMirrorProof(false); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>← {MIRRORS[activePair - 1].glyphs[0]}{MIRRORS[activePair - 1].glyphs[1]}</button>
            )}
            {activePair < 3 && (
              <button onClick={() => { setActivePair(activePair + 1); setActiveMirrorSense(null); setActiveMirrorProof(false); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>{MIRRORS[activePair + 1].glyphs[0]}{MIRRORS[activePair + 1].glyphs[1]} →</button>
            )}
          </div>
        </div>
        );
      })()}

      {/* ===== DEPTH 7 — TRANSLATIONS + THE RETURN ===== */}
      {depth === 7 && !activeAnswer && !activeBefore && !activeConstants && (
        <div style={{
          height: "100vh", width: "100%", position: "relative", overflow: "hidden",
          animation: "fadeSlideUp 0.8s ease",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "space-between",
          padding: "3vh 20px 2.5vh",
          zIndex: 1500,
        }}>

          {/* HEADER */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>ONE TRUTH</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "6px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.06)",
            }}>EVERY MIRROR</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              fontStyle: "italic", color: "rgba(255,255,255,0.18)",
            }}>The same truth wearing different clothes</div>
          </div>

          {/* THREE DOORS — THE ANSWER + THE BEFORE + THE CONSTANTS */}
          <div style={{
            display: "flex", gap: 10, width: "94%", maxWidth: 520,
            flexShrink: 0,
          }}>
            <GlassCard
              onClick={() => setActiveAnswer(true)}
              hoverGlow
              style={{
                flex: "1 1 0", minWidth: 0,
                padding: "14px 8px", textAlign: "center",
                background: "linear-gradient(180deg, rgba(201,168,76,0.03), rgba(201,168,76,0.01))",
                border: "1px solid rgba(201,168,76,0.1)",
                animation: "fadeSlideUp 0.6s 0.2s both ease",
              }}
            >
              <div style={{
                fontSize: 20, marginBottom: 6,
                filter: "drop-shadow(0 0 12px rgba(201,168,76,0.15))",
                animation: "gentleFloat 7s ease-in-out infinite",
              }}>🜔</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
                color: "rgba(201,168,76,0.5)", fontWeight: 600,
              }}>THE ANSWER</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9,
                color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: 4,
                lineHeight: PHI,
              }}>Why something?</div>
            </GlassCard>

            <GlassCard
              onClick={() => setActiveBefore(true)}
              hoverGlow
              style={{
                flex: "1 1 0", minWidth: 0,
                padding: "14px 8px", textAlign: "center",
                background: "linear-gradient(180deg, rgba(206,147,216,0.03), rgba(206,147,216,0.01))",
                border: "1px solid rgba(206,147,216,0.08)",
                animation: "fadeSlideUp 0.6s 0.3s both ease",
              }}
            >
              <div style={{
                fontSize: 20, marginBottom: 6,
                filter: "drop-shadow(0 0 12px rgba(206,147,216,0.15))",
                animation: "gentleFloat 8s ease-in-out infinite",
              }}>🌒</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
                color: "rgba(206,147,216,0.5)", fontWeight: 600,
              }}>THE BEFORE</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9,
                color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: 4,
                lineHeight: PHI,
              }}>Before the beginning?</div>
            </GlassCard>

            <GlassCard
              onClick={() => setActiveConstants(true)}
              hoverGlow
              style={{
                flex: "1 1 0", minWidth: 0,
                padding: "14px 8px", textAlign: "center",
                background: "linear-gradient(180deg, rgba(79,195,247,0.03), rgba(79,195,247,0.01))",
                border: "1px solid rgba(79,195,247,0.08)",
                animation: "fadeSlideUp 0.6s 0.4s both ease",
              }}
            >
              <div style={{
                fontSize: 20, marginBottom: 6,
                filter: "drop-shadow(0 0 12px rgba(79,195,247,0.15))",
                animation: "gentleFloat 9s ease-in-out infinite",
              }}>⚖️</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
                color: "rgba(79,195,247,0.5)", fontWeight: 600,
              }}>THE CONSTANTS</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9,
                color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: 4,
                lineHeight: PHI,
              }}>Why these numbers?</div>
            </GlassCard>
          </div>

          {/* TRANSLATIONS */}
          <div style={{
            width: "94%", maxWidth: 620,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 10px",
            flexShrink: 0,
          }}>
            {TRANSLATIONS.map((t, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 14px", borderRadius: 8,
                background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.02)",
                animation: `fadeSlideUp 0.3s ${i * 0.04}s both ease`,
                backdropFilter: "blur(4px)",
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: "clamp(7px, 1.4vw, 9px)", letterSpacing: 1.5,
                  color: "rgba(201,168,76,0.45)", textTransform: "uppercase",
                  whiteSpace: "nowrap", marginRight: 8,
                }}>{t.domain}</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px, 2vw, 13px)",
                  color: "rgba(255,255,255,0.35)", fontStyle: "italic",
                  textAlign: "right", whiteSpace: "nowrap",
                }}>{t.closing}</span>
              </div>
            ))}
          </div>

          {/* STRING VIBRATION */}
          <div style={{ width: "80%", maxWidth: 400, flexShrink: 0 }}>
            <StringVibration />
          </div>

          {/* THE EQUATION — the culmination, full glory */}
          <div style={{ flexShrink: 0, width: "94%", maxWidth: 520, animation: "sacredReveal 1.6s 0.5s both ease" }}>
            <MiracleGlow size={500} intensity={0.07}>
              <TheEquation size="md" showMeaning={false} />
            </MiracleGlow>
          </div>

          {/* THE SEED + AMEN */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 3vw, 20px)",
              fontStyle: "italic", letterSpacing: 1.5, lineHeight: PHI,
              textShadow: "0 0 30px rgba(201,168,76,0.08)",
              animation: "glowRadiate 6s ease-in-out infinite",
            }}>
              <span className="shimmer-gold">The seed eats the dirt.</span>
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.12)", marginTop: 8,
            }}>AMEN · AHEM</div>
          </div>

          {/* THE 3RD GRADER */}
          <GlassCard style={{
            width: "90%", maxWidth: 420, flexShrink: 0,
            padding: "12px 18px",
            animation: "fadeSlideUp 0.8s 0.6s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 4,
              color: "rgba(201,168,76,0.3)", textAlign: "center", marginBottom: 8,
            }}>THE 3RD GRADER'S VERSION</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(12px, 2.2vw, 14px)",
              color: "rgba(255,255,255,0.32)", fontStyle: "italic",
              lineHeight: PHI, textAlign: "center",
            }}>
              You have a magic flashlight. Hold it steady — that's being clear.
              Find someone whose colors match yours. Click together.
              If you make a new picture — that's real. If everyone sees it too — you aren't dreaming.
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px, 2vw, 12px)",
              color: "rgba(201,168,76,0.25)", fontStyle: "italic",
              textAlign: "center", marginTop: 8,
            }}>The static stops. The music starts. You just know.</div>
          </GlassCard>

          {/* RETURN + FINISH */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <button onClick={returnToVoid} style={{
              cursor: "pointer", display: "inline-block",
              padding: `${10}px ${Math.round(10 * PHI)}px`, borderRadius: 26,
              border: "1px solid rgba(232,232,240,0.12)",
              background: "linear-gradient(180deg, rgba(232,232,240,0.05), rgba(232,232,240,0.01))",
              color: "#e8e8f0", fontFamily: "'Cinzel', serif", fontSize: 12,
              letterSpacing: 5, transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
              textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(232,232,240,0.05)",
              backdropFilter: "blur(8px)",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; }}
            >🔁 RETURN TO THE VOID</button>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              fontStyle: "italic", color: "rgba(255,255,255,0.08)", marginTop: 10,
            }}>The finish is where I start.</div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE ANSWER ROOM ===== */}
      {depth === 7 && activeAnswer && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveAnswer(false); setActiveAnswerProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← EVERY MIRROR</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 220, height: 220,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 40%, transparent 65%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 8s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 40, marginBottom: 10,
              filter: "drop-shadow(0 0 24px rgba(201,168,76,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>🜔</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(201,168,76,0.35)",
            }}>WHY IS THERE SOMETHING RATHER THAN NOTHING?</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 60px rgba(232,232,240,0.1), 0 0 120px rgba(201,168,76,0.04)",
            }}>THE ANSWER</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
              boxShadow: "0 0 24px rgba(201,168,76,0.1)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 2.8vw, 18px)",
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>{THE_ANSWER.core}</div>

          {/* Buried — the one-liner */}
          <GlassCard style={{
            textAlign: "center", padding: `${26}px ${Math.round(26 * PHI_INV)}px`,
            margin: `0 auto 32px`,
            maxWidth: 480,
            borderTop: "1px solid rgba(201,168,76,0.12)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            background: "rgba(201,168,76,0.02)",
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.55)",
              lineHeight: PHI,
              textShadow: "0 0 24px rgba(201,168,76,0.08)",
            }}>{THE_ANSWER.buried}</div>
          </GlassCard>

          {/* 3 Ways to See the Truth */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>3 WAYS TO SEE THE TRUTH</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto 32px" }}>
            {THE_ANSWER.proofs.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveAnswerProof(activeAnswerProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "18px 22px",
                    animation: `fadeSlideUp 0.5s ${0.5 + i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activeAnswerProof === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 28,
                      filter: `drop-shadow(0 0 10px ${ac}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                        color: `${ac}0.6)`, fontWeight: 600,
                      }}>{p.title}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                        color: "rgba(255,255,255,0.2)", marginTop: 4,
                      }}>{p.domain}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: `${ac}0.3)`,
                      transition: "transform 0.3s ease",
                      transform: activeAnswerProof === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </div>
                  {activeAnswerProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Go Deeper — three levels */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(201,168,76,0.2)", textAlign: "center", marginBottom: 16,
          }}>GO DEEPER</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto" }}>
            {THE_ANSWER.deeper.map((d, i) => {
              const depthOpacity = 0.4 + i * 0.08;
              return (
                <GlassCard key={i} style={{
                  padding: "22px 24px",
                  animation: `fadeSlideUp 0.5s ${0.8 + i * 0.15}s both ease`,
                  background: `linear-gradient(180deg, rgba(201,168,76,${0.01 + i * 0.006}), rgba(8,8,24,${0.01 + i * 0.01}))`,
                  border: `1px solid rgba(201,168,76,${0.05 + i * 0.025})`,
                  boxShadow: `0 ${4 + i * 4}px ${20 + i * 10}px rgba(0,0,0,${0.2 + i * 0.08})`,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 22,
                      color: `rgba(201,168,76,${0.25 + i * 0.1})`, fontWeight: 700,
                      lineHeight: 1,
                      textShadow: `0 0 16px rgba(201,168,76,${0.06 + i * 0.04})`,
                    }}>{d.level}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 4,
                        color: `rgba(201,168,76,${depthOpacity})`, fontWeight: 600, marginBottom: 10,
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

          {/* Closing — the Ψ */}
          <div style={{ textAlign: "center", marginTop: 36, animation: "fadeSlideUp 1s 1.2s both ease" }}>
            <GlassCard style={{
              display: "inline-block", padding: "22px 34px",
              background: "linear-gradient(180deg, rgba(201,168,76,0.03), rgba(201,168,76,0.01))",
              border: "1px solid rgba(201,168,76,0.1)",
              boxShadow: "0 8px 40px rgba(201,168,76,0.06), 0 0 80px rgba(201,168,76,0.02)",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 4vw, 26px)",
                color: "rgba(201,168,76,0.6)", letterSpacing: 3,
                textShadow: "0 0 24px rgba(201,168,76,0.08)",
              }}>Ψ = Coherent Convergence</div>
              <div className="gold-line" style={{ maxWidth: 140, margin: "12px auto" }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                color: "rgba(255,255,255,0.28)", fontStyle: "italic",
                lineHeight: PHI, maxWidth: 380,
              }}>
                Something emerges where overlapping patterns filter out the chaos, creating a stable, recognizable loop of existence.
              </div>
            </GlassCard>
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE BEFORE ROOM ===== */}
      {depth === 7 && activeBefore && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveBefore(false); setActiveBeforeProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← EVERY MIRROR</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Violet radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 220, height: 220,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(206,147,216,0.05) 0%, rgba(206,147,216,0.015) 40%, transparent 65%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 9s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 40, marginBottom: 10,
              filter: "drop-shadow(0 0 24px rgba(206,147,216,0.15))",
              animation: "gentleFloat 9s ease-in-out infinite",
            }}>🌒</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(206,147,216,0.35)",
            }}>BEFORE THE BEGINNING</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 60px rgba(232,232,240,0.1), 0 0 120px rgba(206,147,216,0.04)",
            }}>THE BEFORE</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(206,147,216,0.3), rgba(232,232,240,0.15), rgba(206,147,216,0.3), transparent)",
              boxShadow: "0 0 20px rgba(206,147,216,0.08)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 2.8vw, 18px)",
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>{THE_BEFORE.core}</div>

          {/* Buried — the aha moment */}
          <GlassCard style={{
            textAlign: "center", padding: `${26}px ${Math.round(26 * PHI_INV)}px`,
            margin: `0 auto 32px`,
            maxWidth: 480,
            borderTop: "1px solid rgba(206,147,216,0.1)",
            borderBottom: "1px solid rgba(206,147,216,0.1)",
            background: "rgba(206,147,216,0.015)",
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>AHA MOMENT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(206,147,216,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 24px rgba(206,147,216,0.06)",
            }}>{THE_BEFORE.buried}</div>
          </GlassCard>

          {/* 3 proofs */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>3 WAYS TO SEE IT</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto 32px" }}>
            {THE_BEFORE.proofs.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveBeforeProof(activeBeforeProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "18px 22px",
                    animation: `fadeSlideUp 0.5s ${0.5 + i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activeBeforeProof === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 28,
                      filter: `drop-shadow(0 0 10px ${ac}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                        color: `${ac}0.6)`, fontWeight: 600,
                      }}>{p.title}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                        color: "rgba(255,255,255,0.2)", marginTop: 4,
                      }}>{p.domain}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: `${ac}0.3)`,
                      transition: "transform 0.3s ease",
                      transform: activeBeforeProof === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </div>
                  {activeBeforeProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Look into next */}
          <div style={{
            textAlign: "center", marginTop: 8,
            animation: "fadeSlideUp 1s 1s both ease",
          }}>
            <div className="gold-line" style={{ maxWidth: 160, margin: "0 auto 16px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              fontStyle: "italic", color: "rgba(206,147,216,0.3)",
              lineHeight: PHI,
            }}>{THE_BEFORE.lookInto}</div>
            <div className="gold-line" style={{ maxWidth: 160, margin: "16px auto 0" }} />
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE CONSTANTS ROOM ===== */}
      {depth === 7 && activeConstants && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 1500, position: "relative",
        }}>
          <button onClick={() => { setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← EVERY MIRROR</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Blue radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 220, height: 220,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, rgba(79,195,247,0.015) 40%, transparent 65%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 8s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 40, marginBottom: 10,
              filter: "drop-shadow(0 0 24px rgba(79,195,247,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>⚖️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(79,195,247,0.35)",
            }}>CONVERGENT RECOGNITION</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 60px rgba(232,232,240,0.1), 0 0 120px rgba(79,195,247,0.04)",
            }}>THE CONSTANTS</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), rgba(232,232,240,0.15), rgba(79,195,247,0.3), transparent)",
              boxShadow: "0 0 20px rgba(79,195,247,0.08)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 2.8vw, 18px)",
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>{THE_CONSTANTS.core}</div>

          {/* Your Anchor */}
          <GlassCard style={{
            textAlign: "center", padding: `${26}px ${Math.round(26 * PHI_INV)}px`,
            margin: `0 auto 32px`,
            maxWidth: 480,
            borderTop: "1px solid rgba(79,195,247,0.1)",
            borderBottom: "1px solid rgba(79,195,247,0.1)",
            background: "rgba(79,195,247,0.015)",
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>YOUR ANCHOR</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2.8vw, 19px)",
              fontStyle: "italic", color: "rgba(79,195,247,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 24px rgba(79,195,247,0.06)",
            }}>{THE_CONSTANTS.buried}</div>
          </GlassCard>

          {/* 3 proofs */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>3 WAYS TO SEE IT</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto 32px" }}>
            {THE_CONSTANTS.proofs.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveConstantsProof(activeConstantsProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "18px 22px",
                    animation: `fadeSlideUp 0.5s ${0.5 + i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activeConstantsProof === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 28,
                      filter: `drop-shadow(0 0 10px ${ac}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                        color: `${ac}0.6)`, fontWeight: 600,
                      }}>{p.title}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                        color: "rgba(255,255,255,0.2)", marginTop: 4,
                      }}>{p.domain}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: `${ac}0.3)`,
                      transition: "transform 0.3s ease",
                      transform: activeConstantsProof === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </div>
                  {activeConstantsProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Look into next */}
          <div style={{
            textAlign: "center", marginTop: 8,
            animation: "fadeSlideUp 1s 1s both ease",
          }}>
            <div className="gold-line" style={{ maxWidth: 160, margin: "0 auto 16px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              fontStyle: "italic", color: "rgba(79,195,247,0.3)",
              lineHeight: PHI,
            }}>{THE_CONSTANTS.lookInto}</div>
            <div className="gold-line" style={{ maxWidth: 160, margin: "16px auto 0" }} />
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 8 — the infinity — THE CYCLE RESTARTS ===== */}
      {depth === 8 && (
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
            setLandingPhase(0); // Back to BLACK. Close your eyes again.
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
