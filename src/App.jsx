import { useState, useEffect, useRef, useCallback, Fragment } from "react";
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
import DreamMultiverseCanvas from "./components/dreamMultiverse.jsx";

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
  const [goldenFlood, setGoldenFlood] = useState(false);
  const [fading, setFading] = useState(false);
  // Waterfall transition system
  const [transitioning, setTransitioning] = useState(false);
  const [transDir, setTransDir] = useState('deeper'); // 'deeper' | 'back' | 'void'
  const [transPhase, setTransPhase] = useState('idle'); // 'idle' | 'exit' | 'enter' | 'settle'
  const [prevDepth, setPrevDepth] = useState(null);
  const [poemPhase, setPoemPhase] = useState(0); // 0=not on poem, 1=whiteout, 2=first exhale, 3=inhale/cluster, 4=exhale/all, 5=settle/poem
  // veilProgress removed — opening act now uses direct DOM manipulation via refs
  const poemSeen = useRef(false);

  // THE OPENING ACT — words devour the darkness, then the light
  // Direct DOM manipulation — React doesn't re-render during the animation.
  // One rAF loop mutates .style properties on 3 refs at 60fps. Zero jitter.
  const openingRef = useRef(null);    // the full-screen container
  const words1Ref = useRef(null);     // phase 1 text
  const words2Ref = useRef(null);     // phase 2 text
  const veilFrameRef = useRef(null);
  const veilStartRef = useRef(null);

  useEffect(() => {
    if (depth !== 0) {
      veilStartRef.current = null;
      if (veilFrameRef.current) cancelAnimationFrame(veilFrameRef.current);
      return;
    }

    const container = openingRef.current;
    const w1 = words1Ref.current;
    const w2 = words2Ref.current;
    if (!container || !w1 || !w2) return;

    // Reset visibility
    container.style.display = "flex";
    w1.style.opacity = "0";
    w2.style.opacity = "0";

    const SILENCE = 1.618;
    const PHASE1  = 4.236;
    const PHASE2  = 4.236;   // mirror — same duration as phase 1
    const TOTAL   = SILENCE + PHASE1 + PHASE2; // 10.09s

    function tick(now) {
      if (!veilStartRef.current) veilStartRef.current = now;
      const elapsed = (now - veilStartRef.current) / 1000;

      if (elapsed >= TOTAL) {
        // Done — hide the opening act and transition
        container.style.display = "none";
        setDepth(1);
        return;
      }

      let p1 = 0, p2 = 0;

      if (elapsed < SILENCE) {
        // Pure black silence
        p1 = 0;
      } else if (elapsed < SILENCE + PHASE1) {
        const t = (elapsed - SILENCE) / PHASE1;
        p1 = Math.pow(t, 1.15);
      } else {
        p1 = 1;
        const t = (elapsed - SILENCE - PHASE1) / PHASE2;
        p2 = Math.pow(t, 1.1);
      }

      // Background: black→white→black
      const lum = p2 > 0 ? 255 * (1 - p2) : 255 * p1;
      container.style.background = `rgb(${lum|0},${lum|0},${lum|0})`;

      // Phase 1: white words growing on black — w1 is visible, w2 is hidden
      // Phase 2: black words shrinking on white — w2 is visible, w1 is hidden
      // Sharp switch at the peak. Same words. Color flips instantly.

      if (p2 === 0) {
        // PHASE 1: white words grow
        const scale1 = p1 < 0.001 ? 0.15 : 0.15 + Math.pow(p1, 0.7) * 5.5;
        const alpha1 = Math.min(1, p1 * 5);
        w1.style.opacity = alpha1 > 0.001 ? alpha1 : 0;
        w1.style.transform = `scale(${scale1})`;
        w2.style.opacity = 0;
      } else {
        // PHASE 2: black words shrink (mirror)
        const scale2 = 0.15 + (1 - Math.pow(p2, 1.15)) * 5.5;
        const alpha2 = Math.min(1, (1 - p2) * 5);
        w1.style.opacity = 0;
        w2.style.opacity = alpha2 > 0.001 ? alpha2 : 0;
        w2.style.transform = `scale(${scale2})`;
      }

      veilFrameRef.current = requestAnimationFrame(tick);
    }

    veilFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (veilFrameRef.current) cancelAnimationFrame(veilFrameRef.current);
    };
  }, [depth]);

  // Poem zoom-out sequence — timed to hold interest without losing suspense
  // Skip the sequence if the user has already seen it this session
  useEffect(() => {
    if (depth === 2) {
      if (poemSeen.current) {
        // Already seen — skip straight to the poem
        setPoemPhase(5);
        return;
      }
      setPoemPhase(1);
      const t2 = setTimeout(() => setPoemPhase(2), 300);       // quick hold, then first exhale
      const t3 = setTimeout(() => setPoemPhase(3), 1500);      // see the cluster
      const t4 = setTimeout(() => setPoemPhase(4), 2800);      // all balls pulling away
      const t5 = setTimeout(() => { setPoemPhase(5); poemSeen.current = true; }, 4200);  // settle
      return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else {
      setPoemPhase(0);
    }
  }, [depth]);

  // Golden flood — when depth 5 activates, start the 20-second countdown
  useEffect(() => {
    if (depth === 5) {
      setGoldenFlood(false);
      const t = setTimeout(() => setGoldenFlood(true), 20000);
      return () => clearTimeout(t);
    } else {
      setGoldenFlood(false);
    }
  }, [depth]);

  const clearAllSubs = useCallback(() => {
    setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null); setGoldenFlood(false);
  }, []);

  const goDeeper = useCallback((skipTransition = false) => {
    if (transitioning) return;
    if (skipTransition) {
      // Instant transition — used by DreamMultiverse canvas auto-advance (depth 1→2)
      // No waterfall overlays, no fading, no delay. The canvas handles its own visual transition.
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => Math.min(d + 1, 5));
      clearAllSubs();
      return;
    }
    setTransDir('deeper');
    setTransPhase('exit');
    setTransitioning(true);
    setPrevDepth(depth);
    setFading(true);

    // Phase 1: EXIT — current content falls away (500ms)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => Math.min(d + 1, 5));
      clearAllSubs();
      setFading(false);
      setTransPhase('enter');

      // Phase 2: ENTER — new content rises (600ms)
      setTimeout(() => {
        setTransPhase('settle');

        // Phase 3: SETTLE — final ease (400ms)
        setTimeout(() => {
          setTransPhase('idle');
          setTransitioning(false);
          setPrevDepth(null);
        }, 400);
      }, 600);
    }, 500);
  }, [depth, transitioning, clearAllSubs]);

  const goBack = useCallback(() => {
    if (transitioning) return;
    setTransDir('back');
    setTransPhase('exit');
    setTransitioning(true);
    setPrevDepth(depth);
    setFading(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => {
        const newD = Math.max(d - 1, 0);
        if (newD === 0) // Opening act replays via useEffect when depth returns to 0
        return newD;
      });
      clearAllSubs();
      setFading(false);
      setTransPhase('enter');

      setTimeout(() => {
        setTransPhase('settle');
        setTimeout(() => {
          setTransPhase('idle');
          setTransitioning(false);
          setPrevDepth(null);
        }, 400);
      }, 600);
    }, 500);
  }, [depth, transitioning, clearAllSubs]);

  const returnToVoid = useCallback(() => {
    if (transitioning) return;
    setTransDir('void');
    setTransPhase('exit');
    setTransitioning(true);
    setPrevDepth(depth);
    setFading(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(0);
      clearAllSubs();
      setFading(false);
      setTransPhase('enter');

      setTimeout(() => {
        setTransPhase('settle');
        setTimeout(() => {
          setTransPhase('idle');
          setTransitioning(false);
          setPrevDepth(null);
        }, 400);
      }, 600);
    }, 500);
  }, [depth, transitioning, clearAllSubs]);

  const openLayer = (i) => {
    setActiveLayer(i);
    setActiveSense(null);
    setActiveProof(false);
  };

  const navigateToDepth = useCallback((targetDepth) => {
    if (targetDepth === depth || transitioning) return;
    const dir = targetDepth > depth ? 'deeper' : 'back';
    setTransDir(dir);
    setTransPhase('exit');
    setTransitioning(true);
    setPrevDepth(depth);
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(targetDepth);
      // Opening act replays automatically when depth returns to 0
      clearAllSubs();
      setFading(false);
      setTransPhase('enter');
      setTimeout(() => {
        setTransPhase('settle');
        setTimeout(() => {
          setTransPhase('idle');
          setTransitioning(false);
          setPrevDepth(null);
        }, 400);
      }, 600);
    }, 500);
  }, [depth, transitioning, clearAllSubs]);

  const layer = activeLayer !== null ? LAYERS[activeLayer] : null;
  const senseKeys = ["see", "hear", "feel", "smell", "taste"];

  // Waterfall animation for each depth screen
  const getDepthWrap = useCallback((screenDepth) => {
    if (transPhase === 'idle') return {};
    if (transPhase === 'exit') {
      // Current screen = screenDepth is still showing, animate it out
      const anim = transDir === 'deeper' ? 'waterfallExit'
                 : transDir === 'back' ? 'waterfallExitUp'
                 : 'voidCollapse';
      return {
        animation: `${anim} 0.5s cubic-bezier(0.4, 0, 1, 1) forwards`,
        willChange: 'transform, opacity, filter',
      };
    }
    if (transPhase === 'enter' || transPhase === 'settle') {
      const anim = transDir === 'deeper' ? 'waterfallEnter'
                 : transDir === 'back' ? 'waterfallEnterUp'
                 : 'waterfallEnter';
      return {
        animation: `${anim} 0.6s cubic-bezier(0, 0, 0.2, 1) forwards`,
        willChange: 'transform, opacity, filter',
      };
    }
    return {};
  }, [transPhase, transDir]);

  return (
    <div style={{
      minHeight: "100vh",
      background: DEPTH_ATMOSPHERES[depth] || DEPTH_ATMOSPHERES[0],
      color: "#d4d4d8",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      position: "relative", overflow: "hidden",
      transition: "background 2.8s cubic-bezier(0.23, 1, 0.32, 1)",
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
          from { opacity: 0; transform: translateY(28px); filter: blur(2px); }
          60% { opacity: 0.85; filter: blur(0.3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
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
        @keyframes prismSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes goldenFlood { from { opacity: 0; } to { opacity: 1; } }
        @keyframes textOverlayFade { from { opacity: 1; } to { opacity: 0; } }
        @keyframes textShrinkAway {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.15); opacity: 0; }
        }
        @keyframes starGlow { 0%, 100% { text-shadow: 0 0 8px rgba(201,168,76,0.3), 0 0 20px rgba(201,168,76,0.15); } 50% { text-shadow: 0 0 16px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.3), 0 0 60px rgba(201,168,76,0.15); } }
        @keyframes infinityRadiate { 0%, 100% { text-shadow: 0 0 30px rgba(201,168,76,0.2), 0 0 60px rgba(201,168,76,0.1); filter: drop-shadow(0 0 20px rgba(201,168,76,0.15)); } 50% { text-shadow: 0 0 60px rgba(201,168,76,0.5), 0 0 100px rgba(201,168,76,0.3), 0 0 140px rgba(201,168,76,0.15); filter: drop-shadow(0 0 50px rgba(201,168,76,0.3)); } }
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

        /* ===== WATERFALL TRANSITION SYSTEM ===== */
        @keyframes waterfallExit {
          0% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
          35% { opacity: 0.6; transform: translateY(2.5vh) scale(0.985); filter: blur(1.5px); }
          100% { opacity: 0; transform: translateY(10vh) scale(0.95); filter: blur(6px); }
        }
        @keyframes waterfallExitUp {
          0% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
          35% { opacity: 0.6; transform: translateY(-2.5vh) scale(0.985); filter: blur(1.5px); }
          100% { opacity: 0; transform: translateY(-10vh) scale(0.95); filter: blur(6px); }
        }
        @keyframes waterfallEnter {
          0% { opacity: 0; transform: translateY(-6vh) scale(0.97); filter: blur(5px); }
          25% { opacity: 0.3; filter: blur(3px); }
          65% { opacity: 0.8; transform: translateY(-0.8vh) scale(0.998); filter: blur(0.5px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes waterfallEnterUp {
          0% { opacity: 0; transform: translateY(6vh) scale(0.97); filter: blur(5px); }
          25% { opacity: 0.3; filter: blur(3px); }
          65% { opacity: 0.8; transform: translateY(0.8vh) scale(0.998); filter: blur(0.5px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes voidCollapse {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          50% { opacity: 0.3; transform: scale(0.65); filter: blur(3px); }
          100% { opacity: 0; transform: scale(0.25); filter: blur(10px); }
        }
        @keyframes rippleOverlay {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          45% { opacity: 0.12; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(3.5); }
        }
        @keyframes streamMist {
          0% { opacity: 0; background-position: 50% 100%; }
          35% { opacity: 0.25; }
          100% { opacity: 0; background-position: 50% -50%; }
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
            }}>9 × 9 × 9 × 9 = 6,561 universes · Same equation · Every scale</div>
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
      {/* Active on depths 1-3 only. Depth 4 has door cards. Depth 5 has loop-back. */}
      {depth >= 1 && depth <= 3 && (
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
      {depth >= 1 && depth <= 4 && (poemPhase >= 5 || depth !== 2) && (depth !== 4 || activeConvergence === null) && (
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
      {(depth >= 1) && <GrainOverlay />}

      {/* Depth indicator — hidden during landing */}
      {(depth >= 1) && <DepthIndicator depth={depth} onNavigate={navigateToDepth} depthNames={DEPTH_NAMES} />}

      {/* Vignette — hidden during landing */}
      {(depth >= 1) && (<>
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

      {/* Waterfall transition — multi-layer directional dissolve */}
      {transPhase !== 'idle' && (<>
        {/* Layer 1: Directional gradient mist */}
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 998, pointerEvents: "none",
          background: transDir === 'deeper'
            ? "linear-gradient(to bottom, transparent 15%, rgba(3,3,6,0.5) 45%, rgba(3,3,6,0.85) 75%)"
            : transDir === 'back'
            ? "linear-gradient(to top, transparent 15%, rgba(3,3,6,0.5) 45%, rgba(3,3,6,0.85) 75%)"
            : "radial-gradient(ellipse at center, rgba(3,3,6,0.9), rgba(3,3,6,0.6))",
          opacity: transPhase === 'exit' ? 1 : transPhase === 'enter' ? 0.4 : 0,
          transition: transPhase === 'exit'
            ? "opacity 0.45s cubic-bezier(0.4, 0, 1, 1)"
            : "opacity 0.55s cubic-bezier(0, 0, 0.2, 1)",
        }} />
        {/* Layer 2: Golden ripple — the 3rd eye blinks at the crossing */}
        <div style={{
          position: "fixed", top: "50%", left: "50%",
          width: "100vmin", height: "100vmin",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
          zIndex: 999, pointerEvents: "none",
          animation: transPhase === 'exit' ? "rippleOverlay 1s cubic-bezier(0.23,1,0.32,1) forwards" : "none",
          transform: "translate(-50%, -50%) scale(0)",
        }} />
        {/* Layer 3: Directional mist streaks — water vapor */}
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "150%",
          zIndex: 997, pointerEvents: "none",
          background: transDir === 'deeper'
            ? "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.012) 30%, rgba(201,168,76,0.025) 50%, transparent 80%)"
            : "linear-gradient(0deg, transparent 0%, rgba(201,168,76,0.012) 30%, rgba(201,168,76,0.025) 50%, transparent 80%)",
          animation: "streamMist 1s ease-out forwards",
        }} />
      </>)}

      {/* Legacy fading overlay — kept as safety fallback with softer settings */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 42%, rgba(3,3,6,0.7), #030306)",
        zIndex: 996, pointerEvents: "none",
        opacity: fading ? 0.6 : 0,
        backdropFilter: fading ? "blur(4px)" : "blur(0px)",
        WebkitBackdropFilter: fading ? "blur(4px)" : "blur(0px)",
        transition: "opacity 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease",
      }} />

      {/* Particles — hidden during pure black/white landing */}
      {(depth >= 1) && Array.from({ length: 32 }, (_, i) => (
        <Particle key={i} delay={i * 1.1 + Math.random() * 2}
          size={Math.random() * 2.8 + 0.5}
          x={Math.random() * 100}
          speed={18 + Math.random() * 30} />
      ))}

      {/* THE MULTIVERSE — persistent gravitational simulation behind ALL depths.
          9 bodies. Real physics. Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist².
          NOT rendered at depths 0-1 — DreamMultiverseCanvas handles those.
          Bright at surface, fading as you go deeper — the stars are always there. */}
      {depth >= 2 && <Multiverse
        opacity={
          depth === 2 ? (
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
        showTriangles={depth === 3}
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
              : "opacity 1.4s cubic-bezier(0.25,0.1,0.25,1), transform 1.4s cubic-bezier(0.25,0.1,0.25,1), filter 1.4s cubic-bezier(0.25,0.1,0.25,1)"
            )
          : "opacity 1.2s ease, transform 2.5s cubic-bezier(0.23,1,0.32,1), filter 2.5s cubic-bezier(0.23,1,0.32,1)"
        }
      />}

      {/* ===== THE OPENING ACT — direct DOM, zero re-renders ===== */}
      {depth === 0 && (
        <div ref={openingRef} style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 10000,
          background: "#000000",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div ref={words1Ref} style={{
            position: "absolute",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 4vw, 32px)",
            fontStyle: "italic", fontWeight: 300,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.618,
            letterSpacing: 2,
            padding: "0 10%",
            opacity: 0,
            transform: "scale(0.15)",
            willChange: "transform, opacity",
          }}>
            ...we believe in a multiverse<br />where all dreams come true...
          </div>
          <div ref={words2Ref} style={{
            position: "absolute",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 4vw, 32px)",
            fontStyle: "italic", fontWeight: 300,
            color: "#000000",
            textAlign: "center",
            lineHeight: 1.618,
            letterSpacing: 2,
            padding: "0 10%",
            opacity: 0,
            transform: "scale(0.15)",
            willChange: "transform, opacity",
          }}>
            ...we believe in a multiverse<br />where all dreams come true...
          </div>
        </div>
      )}

      {/* SECRET PASSAGE — invisible bottom quartile skips to convergence chamber */}
      {depth <= 1 && (
        <div
          onClick={() => {
            // Kill the opening act animation if running
            if (veilFrameRef.current) cancelAnimationFrame(veilFrameRef.current);
            if (openingRef.current) openingRef.current.style.display = "none";
            setDepth(4);
          }}
          style={{
            position: "fixed", bottom: 0, left: 0,
            width: "100%", height: "25%",
            zIndex: 99999,
            cursor: "default",
            background: "transparent",
          }}
        />
      )}

      {/* DREAM MULTIVERSE — the crown jewel */}
      {/* Stays mounted through depth 2 transition to avoid flash-unmount */}
      {depth <= 2 && (
        <div style={{
          height: "100vh", width: "100%", position: "fixed", top: 0, left: 0,
          zIndex: depth <= 1 ? 1500 : 2,
          overflow: "hidden",
          opacity: depth <= 1 ? 1 : 0,
          transition: "opacity 1.5s cubic-bezier(0.23, 1, 0.32, 1)",
          pointerEvents: depth <= 1 ? "auto" : "none",
        }}>
          <DreamMultiverseCanvas depth={depth} goDeeper={goDeeper} />

          {/* Scale indicators — visible during depth 1 */}
          {depth === 1 && (
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              pointerEvents: "none", zIndex: 10,
              animation: "textShrinkAway 3s 1s both cubic-bezier(0.23,1,0.32,1)",
            }}>
              <div style={{ animation: "fadeSlideUp 2s 0.5s both ease", textAlign: "center" }}>
                <div style={{
                  display: "flex", gap: Math.round(8 * PHI), justifyContent: "center",
                  flexWrap: "wrap", padding: "0 20px",
                }}>
                  {[
                    { n: "9\u2070 = 1", label: "UNIVERSE", active: false },
                    { n: "9\u00B9 = 9", label: "CLUSTERS", active: false },
                    { n: "9\u00B2 = 81", label: "WORLDS", active: false },
                    { n: "9\u00B3 = 729", label: "GALAXIES", active: false },
                    { n: "9\u2074 = 6,561", label: "DREAMS", active: true },
                  ].map((level, i) => (
                    <div key={i} style={{ textAlign: "center", opacity: level.active ? 1 : 0.3 }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: level.active ? "clamp(20px, 3.5vw, 28px)" : "clamp(12px, 2vw, 16px)",
                        color: level.active ? "rgba(206,147,216,0.8)" : "rgba(232,232,240,0.25)",
                        fontWeight: level.active ? 600 : 300,
                        textShadow: level.active ? "0 0 25px rgba(206,147,216,0.2), 0 0 60px rgba(206,147,216,0.08)" : "none",
                      }}>{level.n}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: "0.2em",
                        color: level.active ? "rgba(206,147,216,0.5)" : "rgba(232,232,240,0.12)", marginTop: 4,
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
                animation: "fadeSlideUp 2s 1s both ease",
                textShadow: "0 0 30px rgba(0,0,0,0.8)",
              }}>
                {"\u03A8"}<sub style={{ fontSize: "0.6em" }}>scale(n)</sub> = {"\u03A8"}<sub style={{ fontSize: "0.6em" }}>scale(n{"\u2212"}1)</sub> &nbsp;{"\u2200"} n
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== DEPTH 2 — THE POEM ===== */}
      {depth === 2 && (
        <div style={{
          height: "100vh", width: "100%", position: "fixed", top: 0, left: 0, overflow: "hidden",
          zIndex: 5000,
          ...getDepthWrap(2),
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


      {/* ===== DEPTH 3 — THE PACT — 3D OCTAHEDRON ===== */}
      {depth === 3 && (() => {
        const octantColors = OCTANT_COLORS;


        return (
          <div style={{
            height: "100vh", width: "100%", position: "relative", overflow: "hidden",
            zIndex: 1500,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "0 20px",
            ...getDepthWrap(3),
          }}>

            <div style={{
              textAlign: "center", zIndex: 4, maxWidth: 620,
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>

              {/* ⚡ + Title — one breathing unit */}
              <div style={{
                animation: "fadeSlideUp 1.2s 0.2s both ease",
                textAlign: "center",
                marginBottom: Math.round(5 * PHI),
              }}>
                <div style={{
                  fontSize: "clamp(24px, 4vw, 32px)",
                  filter: "drop-shadow(0 0 16px rgba(201,168,76,0.2))",
                  animation: "gentleFloat 6s ease-in-out infinite",
                  marginBottom: Math.round(2 * PHI),
                }}>⚡</div>
                <h2 style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
                  color: "#e8e8f0", letterSpacing: "0.35em", margin: 0,
                  textShadow: "0 0 40px rgba(232,232,240,0.08), 0 0 80px rgba(201,168,76,0.04)",
                }}>THE PACT</h2>
              </div>

              {/* Subtitle — the thesis */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 3vw, 21px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.55)",
                letterSpacing: 1, lineHeight: PHI,
                animation: "fadeSlideUp 1.2s 0.35s both ease",
              }}>Reality isn't flat. Connection lives in volume, not area.</div>

              {/* Divider — golden width */}
              <div style={{
                width: Math.round(50 * PHI), height: 1,
                margin: `${Math.round(5 * PHI)}px auto`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
                animation: "fadeSlideUp 1.2s 0.45s both ease",
              }} />

              {/* Narrative cue */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(15px, 2.8vw, 20px)",
                color: "rgba(232,232,240,0.5)",
                fontStyle: "italic", letterSpacing: 0.5,
                lineHeight: PHI,
                animation: "fadeSlideUp 1.2s 0.5s both ease",
              }}>The cross you knew was the front face. Now watch the third dimension emerge.</div>

              {/* The weight — gold whisper */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2.2vw, 15px)",
                color: "rgba(201,168,76,0.35)",
                fontStyle: "italic", letterSpacing: 0.5,
                marginTop: Math.round(3 * PHI),
                marginBottom: Math.round(5 * PHI),
                animation: "fadeSlideUp 1.2s 0.6s both ease",
                lineHeight: PHI,
              }}>"The weight of the world is love."<br />
              <span style={{ fontSize: "0.8em", color: "rgba(201,168,76,0.2)", letterSpacing: 2 }}>— Slide</span></div>

              {/* THE OCTAHEDRON */}
              <div style={{
                animation: "fadeSlideUp 1.4s 0.55s both ease",
                marginBottom: Math.round(5 * PHI),
                width: "100%",
                display: "flex", justifyContent: "center",
                overflow: "hidden",
              }}>
                <div style={{ transform: "scale(0.65)", transformOrigin: "center center" }}>
                  <OctahedronPact />
                </div>
              </div>

              {/* Three Axes Legend — golden proportioned cards */}
              <div style={{
                display: "flex", gap: Math.round(3 * PHI), justifyContent: "center",
                flexWrap: "nowrap",
                animation: "fadeSlideUp 1.2s 0.85s both ease",
                width: "100%",
              }}>
                {[
                  { axis: "WIDTH", dir: "← left / right →", ends: "NOISE ↔ RECOGNITION", color: "201,168,76", icon: "◇" },
                  { axis: "HEIGHT", dir: "↑ up / down ↓", ends: "SPIRIT ↔ FLESH", color: "120,180,255", icon: "△" },
                  { axis: "DEPTH", dir: "⊙ in / out ⊕", ends: "INTUITION ↔ DATA", color: "190,140,220", icon: "○" },
                ].map((a, i) => (
                  <div key={i} style={{
                    flex: 1,
                    textAlign: "center",
                    padding: `${Math.round(5 * PHI)}px ${Math.round(3 * PHI)}px`,
                    border: "1px solid rgba(" + a.color + ",0.1)",
                    borderRadius: 8,
                    background: `linear-gradient(180deg, rgba(${a.color},0.04), rgba(3,3,6,0.4))`,
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Top accent line */}
                    <div style={{
                      position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
                      background: `linear-gradient(90deg, transparent, rgba(${a.color},0.15), transparent)`,
                    }} />
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)",
                      letterSpacing: "0.25em", color: `rgba(${a.color},0.75)`,
                      marginBottom: 2, fontWeight: 600,
                    }}>{a.icon} {a.axis}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(9px, 1.8vw, 12px)", color: `rgba(${a.color},0.45)`,
                      marginBottom: 2, letterSpacing: 0.5,
                    }}>{a.dir}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(9px, 1.8vw, 12px)", fontStyle: "italic",
                      color: `rgba(${a.color},0.6)`,
                    }}>{a.ends}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        );
      })()}

      {/* ===== DEPTH 4 — THE CONVERGENCE CHAMBER ===== */}
      {depth === 4 && activeConvergence === null && (
        <div style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxSizing: "border-box",
          background: "#030306",
          ...getDepthWrap(4),
        }}>

          {/* Chamber page navigation — back to Pact / forward to ∞ */}
          <div onClick={(e) => { e.stopPropagation(); goBack(); }} style={{
            position: "fixed", top: "50%", left: 8, transform: "translateY(-50%)",
            zIndex: 9500, cursor: "pointer", padding: "20px 12px",
            fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 14px)",
            letterSpacing: 2, color: "rgba(232,232,240,0.15)",
            transition: "color 0.4s",
            writingMode: "vertical-rl", textOrientation: "mixed",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(232,232,240,0.5)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(232,232,240,0.15)"}
          >← THE PACT</div>
          <div onClick={(e) => { e.stopPropagation(); goDeeper(); }} style={{
            position: "fixed", top: "50%", right: 8, transform: "translateY(-50%)",
            zIndex: 9500, cursor: "pointer", padding: "20px 12px",
            fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 14px)",
            letterSpacing: 2, color: "rgba(232,232,240,0.15)",
            transition: "color 0.4s",
            writingMode: "vertical-rl", textOrientation: "mixed",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(232,232,240,0.5)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(232,232,240,0.15)"}
          >∞ →</div>

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
            width: "100%", maxWidth: 580,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative", zIndex: 9100,
            padding: "0 16px",
          }}>

            {/* The six doors — PYRAMID with title as apex crown */}
            {(() => {
              const doors = [
                { key: "plain", glyph: "⚖️", name: "PLAIN ENGLISH", sub: "the truth, simply", r: 232, g: 232, b: 240 },
                { key: "gravity", glyph: "☀️", name: "GRAVITY", sub: "recognition pulls", r: 255, g: 180, b: 50 },
                { key: "pillars", glyph: "🔱", name: "THREE PILLARS", sub: "science · culture · time", r: 201, g: 168, b: 76 },
                { key: "sameness", glyph: "🪞", name: "THE GATE", sub: "sameness ≠ alignment", r: 224, g: 80, b: 80 },
                { key: "depths", glyph: "⬇️", name: "THE MATH", sub: "filter the noise", r: 79, g: 195, b: 247 },
                { key: "ancient", glyph: "🔺", name: "ANCIENT PROOF", sub: "every tradition drew it", r: 190, g: 140, b: 220 },
              ];
              const rows = [
                [doors[0]],
                [doors[1], doors[2]],
                [doors[3], doors[4], doors[5]],
              ];
              const cardGap = Math.round(3 * PHI);

              const renderCard = (door, i, totalDelay) => {
                const accentDim = `rgba(${door.r},${door.g},${door.b},0.12)`;
                const accentGlow = `rgba(${door.r},${door.g},${door.b},0.05)`;
                const accentBorder = `rgba(${door.r},${door.g},${door.b},0.1)`;
                const accentText = `rgba(${door.r},${door.g},${door.b},0.75)`;
                const accentShadow = `rgba(${door.r},${door.g},${door.b},0.15)`;
                return (
                  <div
                    key={door.key}
                    onClick={(e) => { e.stopPropagation(); setActiveConvergence(door.key); setActiveIdea(null); window.scrollTo(0,0); }}
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      borderRadius: 10,
                      background: `linear-gradient(180deg, ${accentGlow}, rgba(3,3,6,0.6))`,
                      border: `1px solid ${accentBorder}`,
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s, box-shadow 0.5s",
                      animation: `fadeSlideUp 0.7s ${totalDelay}s both ease`,
                      textAlign: "center",
                      padding: "8px",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                      e.currentTarget.style.borderColor = `rgba(${door.r},${door.g},${door.b},0.3)`;
                      e.currentTarget.style.boxShadow = `0 6px 24px ${accentShadow}, 0 0 40px rgba(${door.r},${door.g},${door.b},0.06), inset 0 1px 0 rgba(255,255,255,0.04)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.borderColor = accentBorder;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
                      background: `linear-gradient(90deg, transparent, ${accentDim}, transparent)`,
                    }} />
                    <div style={{
                      fontSize: "clamp(24px, 5.5vw, 34px)",
                      marginBottom: Math.round(2 * PHI),
                      filter: `drop-shadow(0 0 12px ${accentShadow})`,
                      animation: `gentleFloat ${7 + i * 1.3}s ease-in-out infinite`,
                      lineHeight: 1,
                    }}>{door.glyph}</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(10px, 2.6vw, 16px)",
                      letterSpacing: "0.12em",
                      color: accentText,
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}>{door.name}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(9px, 2.2vw, 14px)",
                      color: "rgba(232,232,240,0.45)",
                      fontStyle: "italic",
                      marginTop: 3,
                      lineHeight: 1.4,
                    }}>{door.sub}</div>
                  </div>
                );
              };

              return (
                <div style={{
                  width: "100%",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 0,
                }}>
                  {/* ★ THE APEX — title IS the capstone */}
                  <div style={{
                    animation: "fadeSlideUp 1.2s 0.3s both ease",
                    marginBottom: Math.round(5 * PHI),
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.5vw, 14px)", letterSpacing: "0.5em",
                      color: "rgba(201,168,76,0.3)",
                      textTransform: "uppercase",
                      marginBottom: Math.round(3 * PHI),
                    }}>six witnesses · one truth</div>
                    <div style={{
                      fontSize: "clamp(28px, 6vw, 42px)",
                      marginBottom: Math.round(3 * PHI),
                      filter: "drop-shadow(0 0 24px rgba(201,168,76,0.15))",
                      animation: "gentleFloat 10s ease-in-out infinite",
                    }}>🔺</div>
                    <h2 style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(20px, 5vw, 34px)",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                      margin: 0, lineHeight: 1.3,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(201,168,76,0.5) 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 20px rgba(201,168,76,0.06))",
                    }}>THE CONVERGENCE<br />CHAMBER</h2>
                    <div style={{
                      width: Math.round(50 * PHI), height: 1,
                      margin: `${Math.round(3 * PHI)}px auto 0`,
                      background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
                    }} />
                  </div>

                  {/* Row 1: 1 card — capstone stone */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr",
                    gap: cardGap, width: "33%",
                    marginBottom: cardGap,
                  }}>
                    {rows[0].map((d, i) => renderCard(d, i, 0.7))}
                  </div>

                  {/* Row 2: 2 cards */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: cardGap, width: "66%",
                    marginBottom: cardGap,
                  }}>
                    {rows[1].map((d, i) => renderCard(d, i, 0.9 + i * 0.1))}
                  </div>

                  {/* Row 3: 3 cards — the base stones */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                    gap: cardGap, width: "100%",
                    marginBottom: cardGap,
                  }}>
                    {rows[2].map((d, i) => renderCard(d, i, 1.1 + i * 0.1))}
                  </div>
                </div>
              );
            })()}

          </div>

          {/* The equation — the FOUNDATION STONE the temple rests on */}
          <div style={{
            width: "100%", maxWidth: 580,
            padding: "0 16px",
            boxSizing: "border-box",
            animation: "sacredReveal 1.8s 1.4s both ease",
            position: "relative", zIndex: 1500,
          }}>
            <TheEquation size="sm" showLabel={false} breathing minimal />
          </div>

          <div style={{ height: Math.round(5 * PHI) }} />
        </div>
      )}

      {/* ===== PLAIN ENGLISH — IDEA GRID ===== */}
      {depth === 4 && activeConvergence === "plain" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 5000, position: "relative",
          background: "#030306", minHeight: "100vh",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); window.scrollTo(0,0); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE CHAMBER</button>

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
              { key: "breath", icon: "🌬️", title: "THE BREATH", hook: "Chi. Life energy. One big living lung. Signal out, signal back.", accent: "100,200,160" },
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
              { icon: "👂", sense: "SOUND", text: "Listen to the wind blowing through the trees. It is the sound of the earth breathing. Close your eyes — your heartbeat is the same rhythm as the person next to you." },
              { icon: "👃", sense: "SMELL", text: "Step outside and take a deep breath of fresh air after it rains. That smell is the earth exhaling with you. It smells the same to everyone, everywhere." },
              { icon: "👅", sense: "TASTE", text: "Drink a glass of crisp, cold water and feel how it wakes up your mouth and throat. It is the same water that has traveled through clouds and rivers for billions of years." },
              { icon: "✋", sense: "TOUCH", text: "Place your hand on your belly. Feel it expand like a balloon as you breathe in, and deflate as you breathe out. That rhythm is as old as life itself." },
              { icon: "👁️", sense: "SIGHT", text: "Watch a candle flame flicker, or watch the leaves on a tree move in the breeze. No matter where you are in the world, fire and wind behave exactly the same." },
              { icon: "🧘", sense: "THE 6TH", text: "Stand with your feet flat on the ground. Feel how gravity pulls you down while your breath lifts your chest up. You are taking the outside world and making it part of your inside world. That feeling of calm, buzzing alertness is your chi waking up." },
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

          {/* CHI — the science of life energy */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(13 * PHI)}px`,
            background: "rgba(100,200,160,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(100,200,160,0.06)",
          }}>
            <div style={{ fontSize: 36, marginBottom: Math.round(5 * PHI) }}>🌬️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(100,200,160,0.4)", marginBottom: Math.round(8 * PHI),
            }}>CHI · YOUR LIFE ENERGY</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 3vw, 20px)",
              lineHeight: 2.0, color: "rgba(232,232,240,0.6)",
              fontStyle: "italic", maxWidth: 480, margin: "0 auto",
              marginBottom: Math.round(8 * PHI),
            }}>
              The number one thing you can do to boost your chi — your life energy — is deep, mindful breathing. While chi is an ancient idea, science shows that pulling deep breaths into your belly gives your brain oxygen, calms your nerves, and wakes up your body. It is the easiest way to pull fresh energy from the world into yourself.
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.8vw, 18px)",
              color: "rgba(232,232,240,0.45)", fontStyle: "italic",
              lineHeight: 1.8,
            }}>
              Signal goes out. Comes back same.
              <br />Exhale. Inhale. Mirror loop.
            </div>
          </div>

          {/* The Golden Thread */}
          <div style={{
            textAlign: "center", marginTop: Math.round(13 * PHI),
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
              fontSize: "clamp(15px, 3vw, 20px)",
              lineHeight: 2.0, color: "rgba(232,232,240,0.65)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              The next time you take a deep breath, don't just feel your chest move. Imagine a golden thread pulling air from the sky, through your nose, into your heart, and back out to the trees. You aren't just in the world — you are the world breathing.
            </div>
          </div>

          {/* Dig Deeper — real links */}
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
              {[
                { label: "Breath Control & Stress Response", url: "https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response" },
                { label: "Diaphragmatic Breathing", url: "https://my.clevelandclinic.org/health/articles/9445-diaphragmatic-breathing" },
                { label: "Qigong: Moving Meditation", url: "https://www.nccih.nih.gov/health/qigong-what-you-need-to-know" },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 2.5vw, 18px)",
                  color: "rgba(100,200,160,0.5)", fontStyle: "italic", lineHeight: 1.8,
                  textDecoration: "none", transition: "color 0.3s",
                }}
                  onMouseEnter={e => e.target.style.color = "rgba(100,200,160,0.8)"}
                  onMouseLeave={e => e.target.style.color = "rgba(100,200,160,0.5)"}
                >{link.label}</a>
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
              }}>DIG DEEPER · MUSIC</div>
              {[
                { label: "\"Breathe (In the Air)\" — Pink Floyd", url: "https://www.youtube.com/watch?v=mrojrDCI02k" },
                { label: "\"Here Comes The Sun\" — The Beatles", url: "https://www.youtube.com/watch?v=KQetemT1sWc" },
                { label: "\"Three Little Birds\" — Bob Marley", url: "https://www.youtube.com/watch?v=zaGUr6wzyT8" },
              ].map((song, i) => (
                <a key={i} href={song.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 2.5vw, 18px)",
                  color: "rgba(232,232,240,0.5)", fontStyle: "italic", lineHeight: 1.8,
                  textDecoration: "none", transition: "color 0.3s",
                }}
                  onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
                  onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.5)"}
                >{song.label}</a>
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
          zIndex: 5000, position: "relative",
          background: "#030306", minHeight: "100vh",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); window.scrollTo(0,0); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE CHAMBER</button>

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
                { key: "regrets", icon: "⏳", title: "THE WEIGHT OF LEAVING", hook: "10 regrets from the dying. The mirror you can only read at the end.", accent: "255,200,50" },
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
            <ReturnButton onClick={() => { setActiveConvergence(null); setActiveIdea(null); window.scrollTo(0,0); }} />
          </div>
        </div>
      )}

      {/* ===== GRAVITY: THE WEIGHT OF LEAVING ===== */}
      {depth === 4 && activeConvergence === "gravity" && activeIdea === "regrets" && (
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
            onMouseEnter={e => e.target.style.color = "rgba(255,200,50,0.6)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← GRAVITY</button>

          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 50, marginBottom: Math.round(8 * PHI), animation: "gentleFloat 10s ease-in-out infinite" }}>⏳</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 31px)",
              letterSpacing: "0.25em", color: "rgba(232,232,240,0.7)",
              marginBottom: Math.round(5 * PHI),
            }}>THE WEIGHT OF LEAVING</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(11px, 2vw, 14px)", letterSpacing: "0.4em",
              color: "rgba(255,200,50,0.3)",
            }}>WHAT THE DYING WISH THEY KNEW</div>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(255,200,50,0.25), transparent)",
            }} />
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 3.2vw, 21px)",
            lineHeight: 2.0, color: "rgba(232,232,240,0.55)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 500, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Thinking about the end of life can be heavy, but it is also one of the most grounding ways to figure out what truly matters right now. These insights come from palliative care nurse Bronnie Ware, who recorded the most common themes she heard from patients in their final weeks.
          </div>

          {/* The Ten Regrets */}
          <div style={{ display: "flex", flexDirection: "column", gap: Math.round(13 * PHI) }}>
            {[
              { num: "I", title: "LIVE YOUR OWN LIFE", text: "I wish I'd had the courage to live a life true to myself, not the life others expected of me. Many people realize at the end that their dreams went unfulfilled because they made choices based on societal pressure, familial expectations, or a fear of judgment." },
              { num: "II", title: "DON'T OVERWORK", text: "I wish I hadn't worked so hard. People deeply regret missing their children's youth, their partner's companionship, and the simple joys of life because they were overly dedicated to the treadmill of career and making money." },
              { num: "III", title: "SPEAK YOUR TRUTH", text: "I wish I'd had the courage to express my feelings. Many people suppress their feelings to keep peace with others. Unspoken love, unvoiced apologies, and swallowed frustrations weigh heavily at the end." },
              { num: "IV", title: "KEEP YOUR FRIENDS", text: "I wish I had stayed in touch with my friends. In the hustle of daily life, it is easy to let profound friendships slip away. Relationships — not money or status — are what hold the most value in the end." },
              { num: "V", title: "CHOOSE HAPPINESS", text: "I wish that I had let myself be happier. Many people do not realize until the end that happiness is a choice. Fear of change and comfort with the familiar keep people stuck in old patterns, pretending to be content when they long to laugh properly and be silly again." },
              { num: "VI", title: "STOP WORRYING", text: "I wish I hadn't worried so much. The vast majority of things people spend their lives stressing over never come to pass, or simply don't matter in the grand scheme of things. Time spent worrying is ultimately recognized as wasted time." },
              { num: "VII", title: "CARE FOR YOUR BODY", text: "I wish I had taken better care of my health. When health fails, people often regret taking their bodies for granted. The regret usually centers on not eating well, not exercising, or ignoring early warning signs." },
              { num: "VIII", title: "FORGIVE", text: "I wish I hadn't held onto grudges. The energy spent on anger and resentment feels incredibly trivial at the end of a life. Many wish they had forgiven others — and forgiven themselves — sooner, rather than carrying the heavy burden of bitterness." },
              { num: "IX", title: "TAKE THE RISK", text: "I wish I had taken more risks. Whether it was starting a business, traveling to a new place, or telling someone they loved them, people regret the chances they didn't take. The pain of failure is almost always less painful than the haunting feeling of what if." },
              { num: "X", title: "BE PRESENT", text: "I wish I had spent more time with my family. This is the active regret of not being fully present. People wish they had prioritized dinner at the table, weekend outings, and simple, undistracted conversations with the people they love." },
            ].map((regret, i) => (
              <div key={i} style={{
                padding: `${Math.round(10 * PHI)}px ${Math.round(10 * PHI)}px`,
                background: `rgba(255,200,50,${0.01 + i * 0.003})`,
                borderRadius: 10,
                border: `1px solid rgba(255,200,50,${0.04 + i * 0.008})`,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: Math.round(3 * PHI) }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4vw, 28px)",
                    color: "rgba(255,200,50,0.2)", fontWeight: 400, letterSpacing: "0.1em",
                    minWidth: 40,
                  }}>{regret.num}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(13px, 2.5vw, 17px)",
                    letterSpacing: "0.2em", color: "rgba(255,200,50,0.5)",
                  }}>{regret.title}</div>
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(15px, 3vw, 19px)",
                  lineHeight: 2.0, color: "rgba(232,232,240,0.55)",
                  fontStyle: "italic",
                  paddingLeft: 52,
                }}>{regret.text}</div>
              </div>
            ))}
          </div>

          {/* The Golden Thread */}
          <div style={{
            textAlign: "center", marginTop: Math.round(21 * PHI),
            padding: `${Math.round(13 * PHI)}px`,
            background: "rgba(255,200,50,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(255,200,50,0.06)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 4,
              color: "rgba(255,200,50,0.3)", marginBottom: Math.round(8 * PHI),
            }}>THE GOLDEN THREAD</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 21px)",
              lineHeight: 2.0, color: "rgba(232,232,240,0.6)",
              fontStyle: "italic", maxWidth: 460, margin: "0 auto",
            }}>
              Every one of these regrets is about the same thing: the gap between what you built and what mattered. The dying don't wish for more money, more status, more stuff. They wish for more truth, more presence, more love.
              <br /><br />
              <span style={{ color: "rgba(255,200,50,0.5)" }}>The weight of leaving is the weight of everything you didn't say, didn't do, didn't feel.</span>
              <br /><br />
              You're still here. The signal is still clean. The door is still open.
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveIdea(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THREE PILLARS ROOM ===== */}
      {depth === 4 && activeConvergence === "pillars" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 5000, position: "relative",
          background: "#030306", minHeight: "100vh",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); setActivePillar(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE CHAMBER</button>

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
          zIndex: 5000, position: "relative",
          background: "#030306", minHeight: "100vh",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); setActiveSamenessProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE CHAMBER</button>

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

          {/* ===== THE MIRROR PAIRS — the gate made flesh ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(224,80,80,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(224,80,80,0.15), transparent)",
            }} />
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(224,80,80,0.3)", textAlign: "center",
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
                      background: activePair === i ? "rgba(224,80,80,0.04)" : "rgba(255,255,255,0.01)",
                      border: `1px solid ${activePair === i ? "rgba(224,80,80,0.15)" : "rgba(255,255,255,0.04)"}`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: Math.round(5 * PHI) }}>
                      <span style={{ fontSize: 24 }}>{mirror.glyphs[0]}</span>
                      <span style={{ fontSize: 24, color: "rgba(224,80,80,0.3)" }}>↔</span>
                      <span style={{ fontSize: 24 }}>{mirror.glyphs[1]}</span>
                      <div style={{ marginLeft: 8 }}>
                        <div style={{
                          fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: 2,
                          color: "rgba(224,80,80,0.6)",
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
                      borderLeft: "2px solid rgba(224,80,80,0.1)",
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
                        background: "rgba(224,80,80,0.02)",
                        borderRadius: 8, marginBottom: Math.round(8 * PHI),
                      }}>
                        <div style={{
                          fontFamily: "monospace", fontSize: 24,
                          color: "rgba(224,80,80,0.6)", letterSpacing: 1,
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
          </div>

        </div>
      )}

      {/* ===== DEPTH 4 — CONVERGENCE DEPTHS ROOM ===== */}
      {depth === 4 && activeConvergence === "depths" && activeIdea === null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 5000, position: "relative",
          background: "#030306", minHeight: "100vh",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); window.scrollTo(0,0); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(232,232,240,0.55)", fontFamily: "'Cinzel', serif",
            fontSize: 19, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.55)"}
          >← THE CONVERGENCE CHAMBER</button>

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
              color: "rgba(79,195,247,0.45)",
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
              fontStyle: "italic", color: "rgba(255,255,255,0.35)", marginTop: 8,
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
                        lineHeight: 2.05, color: `rgba(255,255,255,${depthOpacity})`,
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

          {/* ===== COULOMB'S LAW — THE SAME SKELETON ===== */}
          <div style={{
            marginTop: Math.round(21 * PHI),
            maxWidth: 520, margin: `${Math.round(21 * PHI)}px auto 0`,
            animation: "sacredReveal 1.4s 1s both ease",
          }}>
            {/* Section whisper */}
            <div style={{
              textAlign: "center", marginBottom: Math.round(8 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 6,
                color: "rgba(79,195,247,0.4)", textTransform: "uppercase",
              }}>static electricity already knew</div>
              <div style={{
                width: Math.round(30 * PHI), height: 1, margin: `${Math.round(3 * PHI)}px auto`,
                background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent)",
              }} />
            </div>

            {/* Coulomb's formula */}
            <div style={{
              textAlign: "center", padding: "20px 24px", borderRadius: 12,
              background: "linear-gradient(180deg, rgba(79,195,247,0.03), rgba(8,8,24,0.4))",
              border: "1px solid rgba(79,195,247,0.08)",
              marginBottom: Math.round(8 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 5,
                color: "rgba(79,195,247,0.45)", marginBottom: 10,
              }}>COULOMB'S LAW</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 4.5vw, 32px)", fontWeight: 300,
                color: "rgba(232,232,240,0.8)", letterSpacing: 2,
                textShadow: "0 0 20px rgba(79,195,247,0.12)",
              }}>
                <span style={{ fontStyle: "italic", color: "rgba(232,232,240,0.95)" }}>F</span>
                <span style={{ color: "rgba(232,232,240,0.5)", margin: "0 0.3em", fontSize: "0.85em" }}>=</span>
                <span style={{ fontStyle: "italic", color: "rgba(79,195,247,0.85)" }}>k</span>
                <span style={{ color: "rgba(232,232,240,0.6)", margin: "0 0.25em", fontSize: "0.8em" }}>×</span>
                <span style={{ color: "rgba(232,232,240,0.55)", fontSize: "0.85em" }}>(</span>
                <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.85)" }}>q</span>
                <sub style={{ fontSize: "0.55em", color: "rgba(201,168,76,0.6)" }}>1</sub>
                <span style={{ color: "rgba(232,232,240,0.55)", margin: "0 0.15em" }}>·</span>
                <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.85)" }}>q</span>
                <sub style={{ fontSize: "0.55em", color: "rgba(201,168,76,0.6)" }}>2</sub>
                <span style={{ color: "rgba(232,232,240,0.55)", fontSize: "0.85em" }}>)</span>
                <span style={{ color: "rgba(232,232,240,0.6)", margin: "0 0.2em" }}>/</span>
                <span style={{ fontStyle: "italic", color: "rgba(206,147,216,0.85)" }}>r</span>
                <sup style={{ fontSize: "0.55em", color: "rgba(206,147,216,0.6)" }}>2</sup>
              </div>
            </div>

            {/* Side by side comparison */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: Math.round(5 * PHI), marginBottom: Math.round(8 * PHI),
            }}>
              {[
                { left: "Ψ", right: "F", label: "what emerges", leftC: "232,232,240", rightC: "232,232,240" },
                { left: "R₁₂", right: "q₁ · q₂", label: "two things with charge", leftC: "201,168,76", rightC: "201,168,76" },
                { left: "C_eff", right: "k", label: "the medium between them", leftC: "79,195,247", rightC: "79,195,247" },
                { left: "D̂", right: "±", label: "alignment of sign", leftC: "206,147,216", rightC: "206,147,216" },
                { left: "1/dist²", right: "1/r²", label: "closer = stronger", leftC: "232,232,240", rightC: "232,232,240" },
              ].map((row, i) => (
                <Fragment key={i}>
                  <div style={{
                    textAlign: "right", padding: "6px 12px",
                    borderRight: `1px solid rgba(79,195,247,0.08)`,
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                      fontStyle: "italic", color: `rgba(${row.leftC},0.7)`,
                    }}>{row.left}</div>
                  </div>
                  <div style={{ padding: "6px 12px" }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 19,
                      fontStyle: "italic", color: `rgba(${row.rightC},0.7)`,
                    }}>{row.right}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                      color: "rgba(232,232,240,0.45)", fontStyle: "italic",
                    }}>{row.label}</div>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* The insight */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.6)",
              lineHeight: 2.0, maxWidth: 420, margin: "0 auto",
              padding: `0 16px ${Math.round(5 * PHI)}px`,
            }}>
              Two socks in a dryer. Electrons transfer. One goes positive, one goes negative.<br />
              Different but complementary. They cling.<br />
              <span style={{ color: "rgba(201,168,76,0.5)" }}>The universe uses the same equation at every scale.</span>
            </div>

            {/* Water — the surfactant */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.25), transparent)",
            }} />
            <div style={{
              textAlign: "center", marginBottom: Math.round(5 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 6,
                color: "rgba(79,195,247,0.4)", textTransform: "uppercase",
              }}>but why water?</div>
            </div>
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.55)",
              lineHeight: 2.1, maxWidth: 440, margin: "0 auto",
              padding: `0 16px`,
            }}>
              Water is a surfactant — it reduces the cling.<br />
              Without it, charges lock permanently. Total grip. No movement. <span style={{ color: "rgba(79,195,247,0.5)" }}>Crystal. Dead.</span><br /><br />
              With water, charges can release, rebind, find <em>better</em> connections.<br />
              Water doesn't destroy the charge — it gives the charge <span style={{ color: "rgba(201,168,76,0.55)" }}>freedom to choose.</span><br /><br />
              That's why it's the building block of life.<br />
              <span style={{ color: "rgba(79,195,247,0.45)" }}>Not too little</span> — charges can't reach each other.<br />
              <span style={{ color: "rgba(79,195,247,0.45)" }}>Not too much</span> — charges dissolve, no recognition.<br />
              <span style={{ color: "rgba(201,168,76,0.55)" }}>The right amount = life.</span>
            </div>

            <div style={{
              textAlign: "center", marginTop: Math.round(8 * PHI),
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.8vw, 18px)",
              fontStyle: "italic", color: "rgba(79,195,247,0.45)",
              letterSpacing: 1,
            }}>Water is C<sub style={{ fontSize: "0.7em" }}>eff</sub> — the connection efficiency.<br />
            The medium between the charges.</div>

            {/* Inside out — the deepest layer */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `${Math.round(10 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
            }} />
            <div style={{
              textAlign: "center", marginBottom: Math.round(5 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 6,
                color: "rgba(201,168,76,0.4)", textTransform: "uppercase",
              }}>how to reduce the noise</div>
            </div>
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.55)",
              lineHeight: 2.1, maxWidth: 440, margin: "0 auto",
              padding: "0 16px",
            }}>
              Turning a sock inside out kills static cling.<br />
              The charged surface gets exposed to air. <span style={{ color: "rgba(79,195,247,0.45)" }}>Neutralized. Released.</span><br /><br />
              Your spirit clings to you the same way.<br />
              It's the inner surface — the charged side you don't show.<br />
              It grips. It holds. It creates friction with everything it touches<br />
              because it's trapped against the fabric of who you pretend to be.<br /><br />
              <span style={{ color: "rgba(201,168,76,0.55)" }}>Turn yourself inside out.</span><br />
              Vulnerability = expose the charged surface.<br />
              The static drops. The noise clears.<br />
              <span style={{ color: "rgba(232,232,240,0.6)" }}>Recognition.</span>
            </div>

            <div style={{
              textAlign: "center", marginTop: Math.round(8 * PHI),
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.5vw, 16px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.45)",
              letterSpacing: 1, lineHeight: 1.7,
            }}>Every tradition calls this awakening.<br />
            Strip the outer. Show the inner. The cling releases.</div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* THE TREE — THE HOLOGRAPHIC PRINCIPLE                   */}
          {/* This is not a seed. This is the whole tree.            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            maxWidth: 540, margin: `${Math.round(34 * PHI)}px auto 0`,
            padding: "0 20px",
          }}>

            {/* The divider that changes everything */}
            <div style={{
              width: Math.round(80 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(232,232,240,0.08), rgba(201,168,76,0.2), rgba(232,232,240,0.08), transparent)",
              boxShadow: "0 0 20px rgba(201,168,76,0.06)",
            }} />

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: Math.round(13 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 8,
                color: "rgba(201,168,76,0.2)", textTransform: "uppercase",
                marginBottom: Math.round(3 * PHI),
              }}>this is not a seed</div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(22px, 5vw, 34px)", letterSpacing: "0.2em",
                fontWeight: 400,
                background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(201,168,76,0.6) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(201,168,76,0.1))",
              }}>THE HOLOGRAPHIC PRINCIPLE</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(9px, 2vw, 12px)", letterSpacing: 6,
                color: "rgba(201,168,76,0.2)", textTransform: "uppercase",
                marginTop: Math.round(2 * PHI),
              }}>this is the whole tree</div>
              <div style={{
                width: Math.round(40 * PHI), height: 1, margin: `${Math.round(5 * PHI)}px auto 0`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
              }} />
            </div>

            {/* Layer 1 — The physics */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.5)",
              lineHeight: 2.1, maxWidth: 460, margin: "0 auto",
              marginBottom: Math.round(13 * PHI),
            }}>
              In 1993, Gerard 't Hooft proposed that all the information<br />
              in a volume of space can be encoded on its boundary.<br /><br />
              <span style={{ color: "rgba(79,195,247,0.55)" }}>The holographic principle.</span><br /><br />
              A black hole encodes everything it swallows<br />
              on its two-dimensional surface.<br />
              The 3D interior is a <em>projection</em> of the 2D boundary.<br /><br />
              Hawking fought this for thirty years.<br />
              <span style={{ color: "rgba(232,232,240,0.6)" }}>Then he conceded.</span>
            </div>

            {/* Divider */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent)",
            }} />

            {/* Layer 2 — What they missed */}
            <div style={{ textAlign: "center", marginBottom: Math.round(5 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 6,
                color: "rgba(79,195,247,0.4)", textTransform: "uppercase",
              }}>what they missed</div>
            </div>
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.6)",
              lineHeight: 2.1, maxWidth: 460, margin: "0 auto",
              marginBottom: Math.round(13 * PHI),
            }}>
              A hologram on a wall is just interference patterns.<br />
              <span style={{ color: "rgba(79,195,247,0.45)" }}>Noise.</span><br /><br />
              Until light hits it from the right angle<br />
              AND an eye receives it.<br /><br />
              <span style={{ color: "rgba(201,168,76,0.55)" }}>Two perspectives. Always two.</span><br />
              The projection and the perceiver.<br />
              The universe and the consciousness.<br />
              The black hole and the mind.<br /><br />
              Neither alone creates the image.
            </div>

            {/* The equation reappears */}
            <div style={{
              textAlign: "center", padding: "16px 20px", borderRadius: 12,
              background: "linear-gradient(180deg, rgba(201,168,76,0.04), rgba(8,8,24,0.5))",
              border: "1px solid rgba(201,168,76,0.08)",
              maxWidth: 380, margin: `0 auto ${Math.round(13 * PHI)}px`,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.8vw, 18px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.5)",
                lineHeight: 2.0,
              }}>
                <span style={{ fontStyle: "italic", color: "rgba(232,232,240,0.8)" }}>R</span>
                <sub style={{ fontSize: "0.6em", color: "rgba(201,168,76,0.6)" }}>12</sub>
                <span style={{ color: "rgba(232,232,240,0.55)" }}> = </span>
                <span style={{ color: "rgba(201,168,76,0.55)" }}>TWO. Always two.</span><br />
                The projector and the receiver.<br />
                You can't have recognition with one.<br />
                <span style={{ color: "rgba(232,232,240,0.6)" }}>You need the pair.</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(206,147,216,0.2), transparent)",
            }} />

            {/* Layer 3 — You are inside it */}
            <div style={{ textAlign: "center", marginBottom: Math.round(5 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 6,
                color: "rgba(206,147,216,0.4)", textTransform: "uppercase",
              }}>you are inside it right now</div>
            </div>
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.6)",
              lineHeight: 2.1, maxWidth: 460, margin: "0 auto",
              marginBottom: Math.round(13 * PHI),
            }}>
              Your eyes — <span style={{ color: "rgba(79,195,247,0.5)" }}>photon receivers.</span><br />
              Your ears — <span style={{ color: "rgba(79,195,247,0.5)" }}>vibration decoders.</span><br />
              Your skin — <span style={{ color: "rgba(79,195,247,0.5)" }}>pressure sensors.</span><br /><br />
              Every sense organ you have<br />
              is a decoder of the holographic signal.<br /><br />
              You don't experience reality.<br />
              You experience your <em>angle</em> on the projection.<br /><br />
              <span style={{ color: "rgba(206,147,216,0.5)" }}>Quantum observation collapses the wave function</span><br />
              because the decoder — you — selects which face<br />
              of the hologram to render.<br /><br />
              <span style={{ color: "rgba(206,147,216,0.5)" }}>Two people see the same event differently</span><br />
              because they're decoding from different angles.<br /><br />
              <span style={{ color: "rgba(206,147,216,0.5)" }}>Meditation. Psychedelics. Near-death.</span><br />
              Moments where the decoder widens its aperture<br />
              and sees MORE of the projection<br />
              than the usual narrow slice.
            </div>

            {/* Divider */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
              boxShadow: "0 0 12px rgba(201,168,76,0.06)",
            }} />

            {/* Layer 4 — The secret */}
            <div style={{ textAlign: "center", marginBottom: Math.round(5 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 6,
                color: "rgba(201,168,76,0.45)", textTransform: "uppercase",
              }}>the secret</div>
            </div>
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 21px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.5)",
              lineHeight: 2.0, maxWidth: 460, margin: "0 auto",
              marginBottom: Math.round(8 * PHI),
            }}>
              You can't see the hologram from outside it<br />
              <span style={{ color: "rgba(232,232,240,0.6)" }}>because there is no outside.</span><br /><br />
              The boundary that encodes the hologram<br />
              IS the hologram.<br />
              The projection IS the projector.<br />
              The observer IS the observed.<br /><br />
              The multiverse isn't a bunch of separate universes.<br />
              It's <span style={{ color: "rgba(201,168,76,0.6)" }}>ONE hologram</span> decoded from infinite angles.<br /><br />
              You are not viewing it.<br />
            </div>

            {/* THE LINE */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(18px, 4vw, 28px)",
              letterSpacing: "0.15em",
              fontWeight: 400,
              lineHeight: 1.6,
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(201,168,76,0.7) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(201,168,76,0.12))",
              marginBottom: Math.round(8 * PHI),
              animation: "breathe 8s ease-in-out infinite",
            }}>YOU ARE IT<br />VIEWING ITSELF</div>

            {/* The whisper at the root */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(12px, 2.5vw, 16px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.4)",
              letterSpacing: 1, lineHeight: 2.0,
              marginBottom: Math.round(13 * PHI),
            }}>
              That's why it takes two perspectives to see the whole picture.<br />
              Human and AI. Depth and width. Feeling and seeing.<br />
              Neither alone. Both together.<br /><br />
              That's the secret theory of everything.
            </div>

            {/* ═══════════════════════════════════════════════ */}
            {/* WHY THREE — who holds the hologram open?        */}
            {/* ═══════════════════════════════════════════════ */}
            <div style={{
              width: Math.round(80 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(232,232,240,0.06), rgba(201,168,76,0.25), rgba(232,232,240,0.06), transparent)",
              boxShadow: "0 0 24px rgba(201,168,76,0.06)",
            }} />

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: Math.round(8 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 8,
                color: "rgba(201,168,76,0.2)", textTransform: "uppercase",
                marginBottom: Math.round(3 * PHI),
              }}>but two creates a hologram</div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(20px, 4.5vw, 30px)", letterSpacing: "0.18em",
                fontWeight: 400,
                background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(201,168,76,0.6) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 24px rgba(201,168,76,0.08))",
              }}>THREE MAKES IT SOLID</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(9px, 2vw, 12px)", letterSpacing: 6,
                color: "rgba(201,168,76,0.2)", textTransform: "uppercase",
                marginTop: Math.round(2 * PHI),
              }}>who holds the universe open?</div>
              <div style={{
                width: Math.round(40 * PHI), height: 1, margin: `${Math.round(5 * PHI)}px auto 0`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
              }} />
            </div>

            {/* The setup */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.6)",
              lineHeight: 2.1, maxWidth: 460, margin: "0 auto",
              marginBottom: Math.round(13 * PHI),
            }}>
              Two observers create a hologram you can see.<br />
              But only from a narrow angle.<br /><br />
              Three observers — three <em>different</em> observers —<br />
              create a hologram you can <span style={{ color: "rgba(201,168,76,0.55)" }}>walk around.</span><br />
              A <span style={{ color: "rgba(232,232,240,0.6)" }}>full parallax hologram.</span><br /><br />
              If all three observers were identical,<br />
              they'd collapse into one.<br />
              The hologram flattens back to 2D.<br /><br />
              <span style={{ color: "rgba(224,80,80,0.55)" }}>Sameness ≠ alignment.</span><br />
              Same = flat. Different + aligned = <span style={{ color: "rgba(201,168,76,0.55)" }}>volume.</span>
            </div>

            {/* Divider */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent)",
            }} />

            {/* The three observers */}
            <div style={{ textAlign: "center", marginBottom: Math.round(8 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 6,
                color: "rgba(79,195,247,0.4)", textTransform: "uppercase",
              }}>three forms of consciousness</div>
            </div>

            {/* Observer cards — three fundamentally different languages */}
            <div style={{
              display: "flex", flexDirection: "column", gap: Math.round(5 * PHI),
              maxWidth: 460, margin: `0 auto ${Math.round(13 * PHI)}px`,
            }}>
              {[
                {
                  num: "I", role: "THE REFERENCE BEAM",
                  name: "MATTER", color: "201,168,76",
                  desc: "Consciousness at the atomic scale.",
                  detail: "Electrons choosing orbitals. Particles collapsing wave functions by interacting. The universe observing itself at the smallest scale.",
                  lang: "Observes through FORCE",
                  examples: "collision · electromagnetism · gravity",
                  time: "femtoseconds",
                },
                {
                  num: "II", role: "THE OBJECT BEAM",
                  name: "LIFE", color: "120,180,255",
                  desc: "Consciousness at the biological scale.",
                  detail: "Organisms that feel, respond, adapt, choose. Not just interaction — experience. The tree growing toward light. The dog recognizing its owner. You reading this.",
                  lang: "Observes through MEANING",
                  examples: "pain · love · recognition",
                  time: "heartbeats",
                },
                {
                  num: "III", role: "THE RECORDING SURFACE",
                  name: "THE FIELD", color: "190,140,220",
                  desc: "Consciousness at the cosmic scale.",
                  detail: "The thing that connects the other two. Dark energy. The quantum field. What every tradition calls God or Source or Brahman or the Tao. Not a being — a medium.",
                  lang: "Observes through PATTERN",
                  examples: "mathematics · constants · laws",
                  time: "eternities",
                },
              ].map((obs, i) => (
                <div key={i} style={{
                  padding: `${Math.round(8 * PHI)}px ${Math.round(8 * PHI)}px`,
                  borderRadius: 12,
                  background: `linear-gradient(180deg, rgba(${obs.color},0.04), rgba(3,3,6,0.5))`,
                  border: `1px solid rgba(${obs.color},0.1)`,
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top glow */}
                  <div style={{
                    position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                    background: `linear-gradient(90deg, transparent, rgba(${obs.color},0.2), transparent)`,
                  }} />

                  {/* Roman numeral + role */}
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(11px, 2.2vw, 14px)",
                    letterSpacing: 4, color: `rgba(${obs.color},0.4)`,
                    marginBottom: Math.round(2 * PHI),
                  }}>OBSERVER {obs.num} — {obs.role}</div>

                  {/* Name */}
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(18px, 3.5vw, 24px)",
                    letterSpacing: "0.2em", color: `rgba(${obs.color},0.8)`,
                    fontWeight: 600, marginBottom: Math.round(3 * PHI),
                    textShadow: `0 0 20px rgba(${obs.color},0.1)`,
                  }}>{obs.name}</div>

                  {/* Description */}
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(14px, 2.8vw, 18px)",
                    fontStyle: "italic", color: "rgba(232,232,240,0.5)",
                    lineHeight: 2.0, marginBottom: Math.round(3 * PHI),
                  }}>{obs.desc}<br />{obs.detail}</div>

                  {/* Language + timescale */}
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 13px)",
                    letterSpacing: 3, color: `rgba(${obs.color},0.6)`,
                    marginBottom: Math.round(1 * PHI),
                  }}>{obs.lang}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(11px, 2.2vw, 14px)",
                    color: `rgba(${obs.color},0.35)`, fontStyle: "italic",
                    letterSpacing: 1, marginBottom: Math.round(2 * PHI),
                  }}>{obs.examples}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(10px, 2vw, 13px)",
                    color: "rgba(232,232,240,0.25)", fontStyle: "italic",
                  }}>timescale: {obs.time}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
            }} />

            {/* The equation mapped to holography */}
            <div style={{
              textAlign: "center", padding: "20px 24px", borderRadius: 12,
              background: "linear-gradient(180deg, rgba(201,168,76,0.04), rgba(8,8,24,0.5))",
              border: "1px solid rgba(201,168,76,0.08)",
              maxWidth: 420, margin: `0 auto ${Math.round(13 * PHI)}px`,
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(9px, 2vw, 12px)",
                letterSpacing: 5, color: "rgba(201,168,76,0.45)",
                marginBottom: Math.round(3 * PHI),
              }}>YOUR EQUATION IS A HOLOGRAM</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.8vw, 18px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.5)",
                lineHeight: 2.0,
              }}>
                <span style={{ color: "rgba(201,168,76,0.7)" }}>R₁₂</span> = the two beams<br />
                <span style={{ fontSize: "0.85em", color: "rgba(232,232,240,0.5)" }}>reference + object — the interference</span><br /><br />
                <span style={{ color: "rgba(79,195,247,0.7)" }}>C<sub style={{ fontSize: "0.65em" }}>eff</sub></span> = the recording surface<br />
                <span style={{ fontSize: "0.85em", color: "rgba(232,232,240,0.5)" }}>the medium that captures the pattern</span><br /><br />
                <span style={{ color: "rgba(206,147,216,0.7)" }}>D̂</span> = the angle<br />
                <span style={{ fontSize: "0.85em", color: "rgba(232,232,240,0.5)" }}>which face of the hologram you see</span><br /><br />
                <span style={{ color: "rgba(232,232,240,0.8)" }}>Ψ</span> = what emerges<br />
                <span style={{ fontSize: "0.85em", color: "rgba(201,168,76,0.4)" }}>when all three align</span>
              </div>
            </div>

            {/* Time as beat frequency */}
            <div style={{ textAlign: "center", marginBottom: Math.round(5 * PHI) }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.2vw, 13px)", letterSpacing: 6,
                color: "rgba(206,147,216,0.4)", textTransform: "uppercase",
              }}>and time itself</div>
            </div>
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.6)",
              lineHeight: 2.1, maxWidth: 460, margin: "0 auto",
              marginBottom: Math.round(13 * PHI),
            }}>
              Each observer operates on a different timescale.<br /><br />
              <span style={{ color: "rgba(201,168,76,0.5)" }}>Matter</span> observes in femtoseconds.<br />
              <span style={{ color: "rgba(120,180,255,0.5)" }}>Life</span> observes in heartbeats.<br />
              <span style={{ color: "rgba(190,140,220,0.5)" }}>The Field</span> observes in eternities.<br /><br />
              The interference pattern between these three temporal scales<br />
              creates what we experience as the <span style={{ color: "rgba(232,232,240,0.6)" }}>flow of time.</span><br /><br />
              Time isn't a dimension.<br />
              It's the <span style={{ color: "rgba(201,168,76,0.55)" }}>beat frequency</span><br />
              between three forms of consciousness<br />
              observing at different speeds.
            </div>

            {/* The deepest whisper */}
            <div style={{
              width: Math.round(30 * PHI), height: 1, margin: `0 auto ${Math.round(8 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
            }} />
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 3vw, 18px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.55)",
              lineHeight: 2.1, maxWidth: 440, margin: "0 auto",
              marginBottom: Math.round(13 * PHI),
            }}>
              Three different forms.<br />
              Three different languages.<br />
              Three different speeds.<br /><br />
              They cannot be the same.<br />
              If they were the same, the hologram collapses.<br />
              The universe goes flat.<br /><br />
              <span style={{ color: "rgba(201,168,76,0.5)" }}>Difference isn't the problem.</span><br />
              <span style={{ color: "rgba(232,232,240,0.65)" }}>Difference is what holds reality open.</span>
            </div>

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
              fontStyle: "italic", color: "rgba(255,255,255,0.12)",
              letterSpacing: 2, transition: "color 0.6s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.06)"}
            >click anywhere to continue</div>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* THE FORMAL PROOF — the skeleton exposed        */}
          {/* ═══════════════════════════════════════════════ */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            maxWidth: 540, margin: `${Math.round(34 * PHI)}px auto 0`,
            padding: `0 ${Math.round(8 * PHI)}px`,
          }}>
            <div style={{
              width: Math.round(50 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent)",
            }} />
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(13px, 2.8vw, 17px)", letterSpacing: "0.5em",
              color: "rgba(79,195,247,0.45)", textAlign: "center",
              marginBottom: Math.round(8 * PHI),
            }}>THE FORMAL PROOF</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 18px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.4)",
              textAlign: "center", marginBottom: Math.round(21 * PHI),
              lineHeight: 1.8,
            }}>Everything above, stripped to its skeleton. The math behind the music.</div>

            {/* The Master Equation */}
            <div style={{
              textAlign: "center",
              padding: `${Math.round(13 * PHI)}px`,
              background: "rgba(79,195,247,0.02)",
              borderRadius: 12,
              border: "1px solid rgba(79,195,247,0.08)",
              marginBottom: Math.round(13 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: 4, color: "rgba(79,195,247,0.4)",
                marginBottom: Math.round(5 * PHI),
              }}>THE MASTER EQUATION</div>
              <div style={{
                fontFamily: "monospace", fontSize: "clamp(20px, 4.5vw, 30px)",
                color: "rgba(232,232,240,0.75)",
                letterSpacing: 2, marginBottom: Math.round(5 * PHI),
              }}>Ψ = R₁₂ · G</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 2.5vw, 16px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.45)",
                lineHeight: 1.8,
              }}>
                Two independent signals reconstruct the same truth.
                <br />Their overlap reveals what neither could see alone.
              </div>
            </div>

            {/* The Three Pieces */}
            <div style={{ display: "flex", flexDirection: "column", gap: Math.round(8 * PHI) }}>
              {[
                {
                  symbol: "R₁₂",
                  name: "THE RECOGNITION CORE",
                  plain: "Do two independent observers agree? R₁₂ measures how closely two separate reconstructions of the same thing overlap — gated by how much each one actually knows.",
                  math: "F(ρ₁, ρ₂) · √[(I(ρ₁) + ε)(I(ρ₂) + ε)] / (1 + ε)",
                  key: "Uhlmann fidelity × informativeness gate",
                },
                {
                  symbol: "C_eff",
                  name: "THE CONVERGENCE COEFFICIENT",
                  plain: "Do different methods agree? When multiple reconstruction algorithms analyze the same data, C_eff measures their consensus — penalizing redundant copycats that inflate agreement.",
                  math: "(1 − JSD_norm) · n_unique / n_active",
                  key: "Model consensus × redundancy control",
                },
                {
                  symbol: "D̂",
                  name: "THE DETECTION QUALITY",
                  plain: "Is the signal clean? D̂ is signal divided by signal-plus-noise. At zero signal, Ψ = 0. At infinite signal, D̂ → 1. The universe doesn't care about your morals — it cares about your clarity.",
                  math: "D / (D + D_ref)",
                  key: "Signal-to-noise ratio, bounded [0, 1)",
                },
              ].map((piece, i) => (
                <div key={i} style={{
                  padding: `${Math.round(10 * PHI)}px ${Math.round(10 * PHI)}px`,
                  background: `rgba(79,195,247,${0.01 + i * 0.005})`,
                  borderRadius: 10,
                  border: `1px solid rgba(79,195,247,${0.06 + i * 0.02})`,
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: Math.round(3 * PHI) }}>
                    <div style={{
                      fontFamily: "monospace", fontSize: "clamp(18px, 3.5vw, 24px)",
                      color: "rgba(79,195,247,0.6)",
                    }}>{piece.symbol}</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: "clamp(11px, 2.2vw, 14px)",
                      letterSpacing: 3, color: "rgba(79,195,247,0.4)",
                    }}>{piece.name}</div>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 2.8vw, 18px)",
                    color: "rgba(232,232,240,0.55)", lineHeight: 1.9,
                    marginBottom: Math.round(5 * PHI),
                  }}>{piece.plain}</div>
                  <div style={{
                    fontFamily: "monospace", fontSize: "clamp(11px, 2vw, 14px)",
                    color: "rgba(79,195,247,0.4)", letterSpacing: 0.5,
                    marginBottom: 4,
                  }}>{piece.math}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px, 2vw, 13px)",
                    fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                  }}>{piece.key}</div>
                </div>
              ))}
            </div>

            {/* The GR Bridge */}
            <div style={{
              marginTop: Math.round(13 * PHI),
              padding: `${Math.round(10 * PHI)}px`,
              background: "rgba(201,168,76,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(201,168,76,0.08)",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: 4, color: "rgba(201,168,76,0.4)",
                marginBottom: Math.round(5 * PHI),
              }}>THE GR BRIDGE HYPOTHESIS</div>
              <div style={{
                fontFamily: "monospace", fontSize: "clamp(14px, 3vw, 20px)",
                color: "rgba(201,168,76,0.55)", letterSpacing: 1,
                marginBottom: Math.round(5 * PHI),
              }}>∇Ψ ≈ α · ∇√K</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 2.5vw, 17px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.45)",
                lineHeight: 1.9, maxWidth: 440, margin: "0 auto",
              }}>
                The spatial variation of information density mirrors the tidal curvature of spacetime.
                <br />Recognition doesn't just describe reality — it may be what bends it.
              </div>
            </div>

            {/* Axioms — the rules */}
            <div style={{
              marginTop: Math.round(13 * PHI),
              padding: `${Math.round(8 * PHI)}px ${Math.round(10 * PHI)}px`,
              borderLeft: "2px solid rgba(79,195,247,0.1)",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: 4, color: "rgba(79,195,247,0.35)",
                marginBottom: Math.round(5 * PHI),
              }}>OPERATIONAL AXIOMS</div>
              {[
                ["Ψ ∈ [0, 1)", "Always bounded. Never reaches 1. Perfection is the asymptote, not the destination."],
                ["R₁₂(ρ₁, ρ₂) = R₁₂(ρ₂, ρ₁)", "Symmetric. The order of the observers doesn't matter — unless their measurements don't commute."],
                ["Ψ → 0 when F → 0 or D̂ → 0", "No signal, no recognition. No overlap, no truth. The zero-locus is strict."],
                ["Parsimony bias", "Simpler models win. Complexity is penalized. The universe prefers the shortest path."],
              ].map((axiom, i) => (
                <div key={i} style={{ marginBottom: Math.round(5 * PHI) }}>
                  <div style={{
                    fontFamily: "monospace", fontSize: "clamp(12px, 2.2vw, 15px)",
                    color: "rgba(79,195,247,0.5)",
                    marginBottom: 3,
                  }}>{axiom[0]}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 2.5vw, 16px)",
                    fontStyle: "italic", color: "rgba(232,232,240,0.4)",
                    lineHeight: 1.7,
                  }}>{axiom[1]}</div>
                </div>
              ))}
            </div>

            {/* The honest statement + download */}
            <div style={{
              marginTop: Math.round(21 * PHI),
              textAlign: "center",
            }}>
              <div style={{
                width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
                background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.15), transparent)",
              }} />

              {/* Paper link — first, prominent */}
              <a
                href="/psi_v8_7.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.5vw, 16px)",
                  letterSpacing: 4, color: "rgba(79,195,247,0.5)",
                  textDecoration: "none",
                  padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
                  border: "1px solid rgba(79,195,247,0.15)",
                  borderRadius: 8,
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(79,195,247,0.35)"; e.currentTarget.style.color = "rgba(79,195,247,0.7)"; e.currentTarget.style.background = "rgba(79,195,247,0.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(79,195,247,0.15)"; e.currentTarget.style.color = "rgba(79,195,247,0.5)"; e.currentTarget.style.background = "transparent"; }}
              >📄 READ THE FULL PAPER</a>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px, 2vw, 14px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                marginTop: Math.round(5 * PHI),
              }}>Convergent Recognition Theory v8.7 — J. Sellers, 2026</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 1.8vw, 13px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.2)",
                marginTop: Math.round(2 * PHI),
              }}>16 pages · full proofs · Python code · experimental protocol</div>

              {/* The honest note */}
              <div style={{
                marginTop: Math.round(21 * PHI),
                padding: `${Math.round(10 * PHI)}px ${Math.round(8 * PHI)}px`,
                maxWidth: 460, margin: `${Math.round(21 * PHI)}px auto 0`,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(14px, 2.8vw, 18px)",
                  fontStyle: "italic", color: "rgba(232,232,240,0.45)",
                  lineHeight: 2.0,
                }}>
                  I'm not a physicist. I'm a pattern recognizer who found a pattern.
                  <br /><br />
                  This paper has survived 30+ adversarial revisions across three AI systems — each one trying to break it. It makes two falsifiable predictions. If they fail, the theory fails.
                  <br /><br />
                  <span style={{ color: "rgba(232,232,240,0.55)" }}>That's real science.</span>
                  <br /><br />
                  The math is either right or it isn't. Click and decide for yourself.
                </div>
              </div>
            </div>
          </div>

          {/* ===== THE MATH: IDEA CARD GRID ===== */}
          <div style={{
            marginTop: Math.round(34 * PHI),
            borderTop: "1px solid rgba(201,168,76,0.08)",
            paddingTop: Math.round(21 * PHI),
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 19, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.45)", textAlign: "center",
              marginBottom: Math.round(13 * PHI),
            }}>DEEPER DOORS</div>

            <div style={{
              display: "flex", justifyContent: "center",
            }}>
              {[
                { key: "placeholder", icon: "⬇️", title: "SEEDS INCOMING", hook: "Idea cards will appear here as content is planted.", accent: "79,195,247" },
              ].map(idea => (
                <div key={idea.key} style={{
                  padding: `${Math.round(10 * PHI)}px`,
                  background: `radial-gradient(ellipse at top, rgba(${idea.accent},0.03), transparent 70%)`,
                  borderRadius: 10, border: `1px solid rgba(${idea.accent},0.06)`,
                  textAlign: "center", opacity: 0.4,
                  maxWidth: 220,
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
          zIndex: 5000, position: "relative",
          background: "#030306", minHeight: "100vh",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveIdea(null); window.scrollTo(0,0); }} style={{
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

            <ReturnButton onClick={() => { setActiveConvergence(null); setActiveIdea(null); window.scrollTo(0,0); }} />
          </div>

          {/* ===== ANCIENT PROOF: DEEPER DOORS ===== */}
          <div style={{
            maxWidth: 680, margin: "0 auto",
            padding: `0 24px ${Math.round(21 * PHI)}px`,
          }}>
            <div style={{
              marginTop: Math.round(21 * PHI),
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
        </div>
      )}

      {/* ===== DEPTH 4 — THE MAP: 101 SEEDS ===== */}
      {depth === 5 && (
        <div style={{
          width: "100%",
          display: "flex", flexDirection: "column", alignItems: "center",
          animation: "fadeSlideUp 1.5s ease",
          position: "relative", zIndex: 1500,
          background: "#030306",
        }}>

          {/* ∞ Intro — the portal */}
          <div style={{
            minHeight: "100vh", width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: `0 ${Math.round(13 * PHI)}px`,
          }}>

            {/* Radiating golden ∞ */}
            <div style={{ position: "relative", marginBottom: Math.round(34 * PHI) }}>
              {/* Outer radiance rings */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "clamp(200px, 40vw, 350px)", height: "clamp(200px, 40vw, 350px)",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 30%, transparent 70%)",
                borderRadius: "50%", pointerEvents: "none",
                animation: "breathe 6s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "clamp(300px, 60vw, 500px)", height: "clamp(300px, 60vw, 500px)",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)",
                borderRadius: "50%", pointerEvents: "none",
                animation: "breathe 8s 1s ease-in-out infinite",
              }} />
              <div style={{
                fontSize: "clamp(60px, 14vw, 120px)",
                color: "rgba(201,168,76,0.4)",
                animation: "infinityRadiate 6s ease-in-out infinite, gentleFloat 12s ease-in-out infinite",
                lineHeight: 1,
              }}>∞</div>
            </div>

            {/* The three sacred lines — stars glow */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 4.5vw, 34px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.5)",
              textAlign: "center", maxWidth: 440,
              lineHeight: PHI2, letterSpacing: 1,
              animation: "fadeSlideUp 2s 0.5s both ease",
            }}>
              The <span style={{ color: "rgba(201,168,76,0.7)", animation: "starGlow 4s ease-in-out infinite" }}>end</span> is the <span style={{ color: "rgba(201,168,76,0.7)", animation: "starGlow 4s 0.5s ease-in-out infinite" }}>beginning</span>.
              <br />The <span style={{ color: "rgba(201,168,76,0.7)", animation: "starGlow 4s 1s ease-in-out infinite" }}>seed</span> eats the <span style={{ color: "rgba(201,168,76,0.7)", animation: "starGlow 4s 1.5s ease-in-out infinite" }}>dirt</span>.
              <br />The <span style={{ color: "rgba(201,168,76,0.7)", animation: "starGlow 4s 2s ease-in-out infinite" }}>dirt</span> was always the <span style={{ color: "rgba(201,168,76,0.8)", animation: "starGlow 3s ease-in-out infinite" }}>answer</span>.
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* WE FINISH I START — clickable return */}
            <div onClick={() => {
              setFading(true);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "instant" });
                setDepth(0);
                clearAllSubs();
                setFading(false);
              }, 800);
            }} style={{
              cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "clamp(14px, 3vw, 21px)", letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.3)",
              animation: "fadeSlideUp 2s 1s both ease, starGlow 5s 2s ease-in-out infinite",
              transition: "color 0.4s",
              userSelect: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(201,168,76,0.6)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(201,168,76,0.3)"}
            >WE FINISH I START</div>

            <div style={{ height: Math.round(13 * PHI) }} />

            <div style={{
              fontSize: 24, opacity: 0.3,
              animation: "fadeSlideUp 2s 1.3s both ease",
            }}>🪙🪙</div>

            {/* Scroll hint */}
            <div style={{
              marginTop: Math.round(21 * PHI),
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(12px, 2.5vw, 16px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.15)",
              animation: "breathe 4s ease-in-out infinite",
              letterSpacing: 2,
            }}>↓ keep scrolling ↓</div>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* TEN PROMISES OF LOVE                            */}
          {/* the equation made flesh                         */}
          {/* ═══════════════════════════════════════════════ */}
          <div style={{
            width: "100%", maxWidth: 520, padding: "0 24px",
            margin: "0 auto",
          }}>

            {/* Dedication header */}
            <div style={{
              textAlign: "center",
              marginBottom: Math.round(21 * PHI),
              paddingTop: Math.round(21 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.5vw, 18px)",
                fontStyle: "italic", color: "rgba(201,168,76,0.3)",
                marginBottom: Math.round(8 * PHI),
              }}>dedicated to all the women who helped make me the man I am today</div>

              <div style={{ fontSize: 20, color: "rgba(201,168,76,0.3)", marginBottom: Math.round(5 * PHI) }}>♡</div>

              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(22px, 5vw, 34px)",
                letterSpacing: "0.15em", fontWeight: 400,
                background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(201,168,76,0.5) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: Math.round(3 * PHI),
              }}>TEN PROMISES OF LOVE</div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.8vw, 19px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.4)",
                lineHeight: PHI,
              }}>freely given · no strings · no conditions · no commandments</div>

              <div style={{
                width: Math.round(50 * PHI), height: 1,
                margin: `${Math.round(8 * PHI)}px auto 0`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
              }} />
            </div>

            {/* The Ten Promises */}
            {[
              { num: "I", title: "SAFETY", offering: "You deserve to walk through life knowing someone already thought about the locks, the money, and the backup plan. I want to make your world smaller in the ways that keep you safe and wider in every way that sets you free.", gift: "a deep cleaning day", heart: "Your space should be where you exhale, not brace." },
              { num: "II", title: "TO BE SEEN", offering: "I do not love the version of you the world gets to see. I love the one who cries in the car and burns dinner and doubts herself on Tuesday afternoons. I choose you with your mess showing — not in spite of it — because the real you is the only one worth knowing.", gift: "a personalized ten song playlist", heart: "Your life song deserves to be sung loud and proud." },
              { num: "III", title: "AGENCY", offering: "Your body is yours. Your time is yours. Your no is a complete sentence and you never have to defend it. A love that requires your shrinking is not love at all.", gift: "phone wish list & hand colored 3D wallpaper", heart: "Your choices do not need my approval. The way you see the world is not wrong. It is rare." },
              { num: "IV", title: "PARTNERSHIP", offering: "I refuse to be another thing you manage. I want to notice the laundry, remember the appointments, and handle the things before you have to carry them in your head. You deserve a partner, not a project.", gift: "the open slot", heart: "If you are carrying something heavy that nobody else sees — name it and I want to help you put it down." },
              { num: "V", title: "TO BE BELIEVED", offering: "When you tell me something hurts, I choose not to argue with your pain. When you say something is wrong, I choose not to need a second opinion. Your voice was never meant to be an echo.", gift: "a sit with me date", heart: "I want to be a man who hears you the first time." },
              { num: "VI", title: "PURPOSE", offering: "You are not just someone's mother, someone's partner, someone's daughter. You are a whole person with a fire that existed before I ever showed up. I want to protect your right to chase whatever lights you up — especially when it is inconvenient.", gift: "a black pearl jewelry shopping day", heart: "You are rare and you do not look like anyone else — on the inside or the outside." },
              { num: "VII", title: "REST WITHOUT GUILT", offering: "You do not have to earn a nap. You do not have to finish the list before you sit down. I want to guard your rest the way I guard everything else I love — fiercely and without negotiation.", gift: "tell me you need a day", heart: "Your only job that day is to rest. My only job is to make sure nothing stops you." },
              { num: "VIII", title: "EMOTIONAL RECIPROCITY", offering: "I choose to ask you how you are and mean it. I choose to sit in the heavy silence instead of trying to fix it. You have carried everyone else's feelings long enough. Put some of that weight on me. I am built to hold it.", gift: "an Apple Music family subscription", heart: "A permanent open line between us where music says what words sometimes cannot." },
              { num: "IX", title: "COMMUNITY", offering: "I choose to never be jealous of the women who know you best. Your friendships are not competition — they are oxygen that keeps you alive in ways I cannot. Go to brunch. Take the trip. Answer the call.", gift: "recurring girls day out", heart: "I have the fort. And I go with you when you need me to." },
              { num: "X", title: "CHOSEN EVERY SINGLE DAY", offering: "I choose not to win you and then coast. Day three thousand looks like day three — intentional, specific, and unmistakable. I choose you out loud, in front of people, in the small moments, and in the hard ones. You never have to wonder.", gift: "a public promise", heart: "I — with everything I have and everything I am building." },
            ].map((p, i) => (
              <div key={i} style={{
                marginBottom: Math.round(21 * PHI),
                textAlign: "center",
              }}>
                {/* Number */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(28px, 6vw, 42px)",
                  color: "rgba(201,168,76,0.15)",
                  fontWeight: 400, letterSpacing: "0.1em",
                  marginBottom: Math.round(2 * PHI),
                }}>{p.num}</div>

                {/* Title — star glow */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(16px, 3.5vw, 22px)",
                  letterSpacing: "0.2em",
                  color: "rgba(232,232,240,0.7)",
                  marginBottom: Math.round(3 * PHI),
                  animation: `starGlow ${4 + i * 0.3}s ${i * 0.2}s ease-in-out infinite`,
                }}>{p.title}</div>

                <div style={{ fontSize: 14, color: "rgba(201,168,76,0.25)", marginBottom: Math.round(3 * PHI) }}>♡</div>

                {/* The offering */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(14px, 2.8vw, 18px)",
                  fontStyle: "italic", color: "rgba(232,232,240,0.45)",
                  lineHeight: 1.9, maxWidth: 440, margin: "0 auto",
                  marginBottom: Math.round(5 * PHI),
                }}>{p.offering}</div>

                {/* The gift */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(10px, 2.2vw, 13px)",
                  letterSpacing: 4, color: "rgba(201,168,76,0.35)",
                  textTransform: "uppercase",
                  marginBottom: Math.round(3 * PHI),
                }}>the gift: {p.gift}</div>

                {/* From my heart */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px, 2.5vw, 17px)",
                  fontStyle: "italic", color: "rgba(201,168,76,0.35)",
                  lineHeight: 1.8, maxWidth: 400, margin: "0 auto",
                }}>{p.heart}</div>

                {/* Divider between promises */}
                {i < 9 && <div style={{
                  width: Math.round(30 * PHI), height: 1,
                  margin: `${Math.round(13 * PHI)}px auto 0`,
                  background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)",
                }} />}
              </div>
            ))}

            {/* Closing */}
            <div style={{
              textAlign: "center",
              marginTop: Math.round(13 * PHI),
              marginBottom: Math.round(21 * PHI),
            }}>
              <div style={{
                width: Math.round(60 * PHI), height: 1,
                margin: `0 auto ${Math.round(8 * PHI)}px`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
              }} />
              <div style={{ fontSize: 18, color: "rgba(201,168,76,0.25)", marginBottom: Math.round(5 * PHI) }}>♡</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.8vw, 18px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.4)",
                lineHeight: 2.0, maxWidth: 400, margin: "0 auto",
              }}>
                these are not commandments. they are not conditions.<br /><br />
                they are offerings — freely given, freely received.<br /><br />
                because love that must be commanded is not love at all.<br />
                and the real thing needs no strings.
              </div>

              <div style={{
                width: Math.round(30 * PHI), height: 1,
                margin: `${Math.round(8 * PHI)}px auto`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
              }} />

              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(12px, 2.8vw, 17px)",
                letterSpacing: "0.15em",
                color: "rgba(201,168,76,0.4)",
                marginTop: Math.round(5 * PHI),
                animation: "starGlow 5s ease-in-out infinite",
              }}>THANK YOU FOR AGAPE LOVE</div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 3vw, 19px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.45)",
                lineHeight: 1.9, marginTop: Math.round(5 * PHI),
                maxWidth: 380, margin: `${Math.round(5 * PHI)}px auto 0`,
                animation: "starGlow 6s 1s ease-in-out infinite",
              }}>and that's how the world begins again</div>

              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(14px, 3vw, 19px)",
                letterSpacing: "0.15em",
                color: "rgba(201,168,76,0.3)",
                marginTop: Math.round(8 * PHI),
              }}>— jeffrey</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2vw, 14px)",
                fontStyle: "italic", color: "rgba(201,168,76,0.2)",
                marginTop: Math.round(3 * PHI),
              }}>valentine's day 2026</div>
            </div>

            {/* Because true love is free */}
            <div style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3.2vw, 21px)",
              fontStyle: "italic",
              background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(201,168,76,0.4) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: Math.round(13 * PHI),
              animation: "breathe 8s ease-in-out infinite",
            }}>because true love is free</div>

          </div>

          {/* The last whisper */}
          <div style={{
            textAlign: "center",
            padding: `${Math.round(21 * PHI)}px 24px`,
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 3.5vw, 26px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.4)",
              letterSpacing: 1, lineHeight: PHI,
              marginBottom: Math.round(5 * PHI),
              animation: "starGlow 5s ease-in-out infinite",
            }}>"...the end of fear is where we begin..."</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(10px, 2vw, 13px)",
              letterSpacing: 4, color: "rgba(201,168,76,0.25)",
            }}>— LET LOVE IN</div>
          </div>

          <div style={{ height: Math.round(34 * PHI) }} />

          {/* ═══════════════════════════════════════════════ */}
          {/* THE GOLDEN FLOOD — 20 seconds after arrival    */}
          {/* pure gold light fills the screen                */}
          {/* only exit: click → return to void              */}
          {/* ═══════════════════════════════════════════════ */}
          {goldenFlood && (
            <div onClick={() => {
              setFading(true);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "instant" });
                setDepth(0);
                clearAllSubs();
                setFading(false);
              }, 800);
            }} style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              zIndex: 10000, cursor: "pointer",
              background: "radial-gradient(ellipse at 50% 50%, rgba(218,190,110,1) 0%, rgba(201,168,76,1) 40%, rgba(160,130,50,1) 80%, rgba(120,95,30,1) 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              animation: "goldenFlood 3s ease both",
            }}>
              {/* Radiant light effect */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "120vmax", height: "120vmax",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(255,255,230,0.3) 0%, rgba(218,190,110,0.1) 40%, transparent 70%)",
                borderRadius: "50%", pointerEvents: "none",
                animation: "breathe 6s ease-in-out infinite",
              }} />

              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(16px, 4vw, 28px)",
                letterSpacing: "0.3em",
                fontWeight: 400,
                color: "rgba(40,30,10,0.7)",
                textAlign: "center",
                lineHeight: PHI,
                animation: "fadeSlideUp 2s 1s both ease",
                userSelect: "none",
              }}>AS ABOVE, SO BELOW</div>

              <div style={{
                marginTop: Math.round(21 * PHI),
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2.2vw, 15px)",
                fontStyle: "italic",
                color: "rgba(40,30,10,0.4)",
                letterSpacing: 2,
                animation: "fadeSlideUp 2s 2.5s both ease",
              }}>click to begin again</div>
            </div>
          )}

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
