import React, { useState, useEffect, useRef, useCallback, useMemo, Fragment } from "react";
import MultiverseFractal from "./MultiverseFractal.jsx";
import MathPage from "./MathPage.jsx";
import { TEN_DOORS, classifyContent } from "./tenDoors.js";
import SubcategoryGrid, { SubcategoryView } from "./SubcategoryGrid.jsx";
import { SUBCATEGORIES, DOOR_META } from "./subcategories.js";
import MirrorGate from "./MirrorGate.jsx";
import "./global.css";
import {
  PHI, PHI_INV, PHI2, PHI3,
  DEPTH_NAMES, DEPTH_ATMOSPHERES,
  POEMS, ASK_POEMS,
} from "./data.js";
import {
  GrainOverlay, DepthIndicator, Particle,
  GlassCard, ReturnButton,
  StringVibration, TheEquation, MiracleGlow,
} from "./components/ui.jsx";
import { SacredTriquetra } from "./components/sacred.jsx";
import { OctahedronPact } from "./components/canvas.jsx";
import { Multiverse } from "./components/multiverse.jsx";
import DreamMultiverseCanvas from "./components/dreamMultiverse.jsx";
import DiamondGenesisCanvas from "./components/diamondGenesis.jsx";
import BinaryLandingCanvas from "./components/binaryLanding.jsx";
import { findAnswers } from "./questionEngine.js";
import OracleRevelation from "./OracleRevelation.jsx";
import { fetchWiki } from "./wikiEngine.js";
import WikiRevelation from "./WikiRevelation.jsx";

/* ========== MAIN ========== */

export default function TheoryOfEverything() {
  const [currentPage, setCurrentPage] = useState("theory"); // "theory" | "multiverse" | "math"
  const [depth, setDepth] = useState(-2);
  // ═══ UI FOCUS STATE — single source of truth ═══
  const uiInitial = {
    activeLayer: null,
    activePair: null,
    activeConvergence: null,
    activeFilterQ: null,
    activeIdea: null,
    activeSubcategory: null,
    goldenFlood: false,
  };
  const uiReducer = (state, action) => {
    switch (action.type) {
      case 'CLEAR': return { ...uiInitial };
      case 'SET': return { ...state, [action.key]: action.value };
      case 'BATCH': return { ...state, ...action.payload };
      default: return state;
    }
  };
  const [ui, dispatch] = React.useReducer(uiReducer, uiInitial);

  // Convenience setters — keep call sites readable
  const setActiveLayer = (v) => dispatch({ type: 'SET', key: 'activeLayer', value: v });
  const setActivePair = (v) => dispatch({ type: 'SET', key: 'activePair', value: v });
  const setActiveConvergence = (v) => dispatch({ type: 'SET', key: 'activeConvergence', value: v });
  const setActiveFilterQ = (v) => dispatch({ type: 'SET', key: 'activeFilterQ', value: v });
  const setActiveIdea = (v) => dispatch({ type: 'SET', key: 'activeIdea', value: v });
  const setActiveSubcategory = (v) => dispatch({ type: 'SET', key: 'activeSubcategory', value: v });
  const setGoldenFlood = (v) => dispatch({ type: 'SET', key: 'goldenFlood', value: v });

  // Destructure for existing code compatibility
  const { activeLayer, activePair, activeConvergence, activeFilterQ, activeIdea,
    activeSubcategory, goldenFlood } = ui;
  const [fading, setFading] = useState(false);
  // Waterfall transition system
  const [transitioning, setTransitioning] = useState(false);
  const [transDir, setTransDir] = useState('deeper'); // 'deeper' | 'back' | 'void'
  const [transPhase, setTransPhase] = useState('idle'); // 'idle' | 'exit' | 'enter' | 'settle'
  const [prevDepth, setPrevDepth] = useState(null);

  // ═══ SACRED TIMING ═══
  // All transitions breathe at PHI rhythm — the nervous system recognizes this cadence
  const SACRED_EXIT   = Math.round(PHI * 382);  // 618ms — The Dissolve
  const SACRED_ENTER  = Math.round(PHI * 618);  // 1000ms — The Manifestation  
  const SACRED_SETTLE = Math.round(PHI_INV * 618); // 382ms — The Settling
  const [veilParted, setVeilParted] = useState(false); // true once the star curtain has parted
  const [diamondPlayed, setDiamondPlayed] = useState(false); // true once diamond genesis completes
  const [userPath, setUserPath] = useState(null); // "ask" | "explore" — which path the user chose
  const [skipIntro, setSkipIntro] = useState(false); // true when jumping directly from landing to a deep depth
  const [doorInput, setDoorInput] = useState("");
  const [doorResults, setDoorResults] = useState(null);
  const [doorExpanded, setDoorExpanded] = useState(null);
  const [questionResults, setQuestionResults] = useState(null);
  const [wikiInput, setWikiInput] = useState("");
  const [wikiResults, setWikiResults] = useState(null);
  const [wikiLoading, setWikiLoading] = useState(false);
  // Stable particle seeds — generated once, never re-randomized on re-render
  const mathParticles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      delay: i * 1.5 + Math.random() * 2,
      size: Math.random() * 2 + 0.5,
      x: Math.random() * 100,
      speed: 20 + Math.random() * 25,
    })), []);

  const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
  const theoryParticles = useMemo(() =>
    Array.from({ length: isMobileDevice ? 14 : 32 }, (_, i) => ({
      delay: i * 1.1 + Math.random() * 2,
      size: Math.random() * 2.8 + 0.5,
      x: Math.random() * 100,
      speed: 18 + Math.random() * 30,
    })), []);

  // Sacred easing — zero derivative at both ends (organic breath, not mechanical slide)
  const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10);

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

    const SILENCE = 0;
    const PHASE1  = 2.618;   // PHI²
    const PHASE2  = 2.618;   // mirror — same duration as phase 1
    const TOTAL   = SILENCE + PHASE1 + PHASE2; // ~6.24s

    function tick(now) {
      if (!veilStartRef.current) veilStartRef.current = now;
      const elapsed = (now - veilStartRef.current) / 1000;

      if (elapsed >= TOTAL) {
        // Done — crossfade the opening act to reveal the canvas underneath
        container.style.transition = "opacity 0.618s cubic-bezier(0.23, 1, 0.32, 1)";
        container.style.opacity = "0";
        container.style.pointerEvents = "none";
        setDepth(2);
        return;
      }

      let p1 = 0, p2 = 0;

      if (elapsed < SILENCE) {
        // Pure black silence
        p1 = 0;
      } else if (elapsed < SILENCE + PHASE1) {
        const t = (elapsed - SILENCE) / PHASE1;
        p1 = smootherstep(t);
      } else {
        p1 = 1;
        const t = (elapsed - SILENCE - PHASE1) / PHASE2;
        p2 = smootherstep(t);
      }

      // Background: black→white→black
      const lum = p2 > 0 ? 255 * (1 - p2) : 255 * p1;
      container.style.background = `rgb(${lum|0},${lum|0},${lum|0})`;

      // No text — just the pure black→white→black breath
      w1.style.opacity = 0;
      w2.style.opacity = 0;

      veilFrameRef.current = requestAnimationFrame(tick);
    }

    veilFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (veilFrameRef.current) cancelAnimationFrame(veilFrameRef.current);
    };
  }, [depth]);

  // Reset veil state when leaving depth 2
  useEffect(() => {
    if (depth !== 2) setVeilParted(false);
  }, [depth]);

  // Reset diamond state when leaving depth -1
  useEffect(() => {
    if (depth !== -1) setDiamondPlayed(false);
  }, [depth]);

  // Reset path when returning to landing
  useEffect(() => {
    if (depth === -2) setUserPath(null);
  }, [depth]);

  // Golden flood — when depth 5 activates, start the 20-second countdown
  useEffect(() => {
    if (depth === 8) {
      setGoldenFlood(false);
      const t = setTimeout(() => setGoldenFlood(true), 20000);
      return () => clearTimeout(t);
    } else {
      setGoldenFlood(false);
    }
  }, [depth]);

  // Cancellable delay utility for clean async transitions
  const transAbortRef = useRef(null);
  const wait = (ms, signal) =>
    new Promise((res, rej) => {
      const id = setTimeout(res, ms);
      signal?.addEventListener("abort", () => { clearTimeout(id); rej(new Error("aborted")); });
    });

  const clearAllSubs = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const goDeeper = useCallback(async (skipTransition = false) => {
    if (transitioning) return;
    if (skipTransition) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => Math.min(d + 1, 9));
      clearAllSubs();
      return;
    }

    transAbortRef.current?.abort();
    const controller = new AbortController();
    transAbortRef.current = controller;

    try {
      setTransDir('deeper');
      setTransPhase('exit');
      setTransitioning(true);
      setPrevDepth(depth);
      setFading(true);

      await wait(SACRED_EXIT, controller.signal);
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => Math.min(d + 1, 9));
      clearAllSubs();
      setFading(false);
      setTransPhase('enter');

      await wait(SACRED_ENTER, controller.signal);
      setTransPhase('settle');

      await wait(SACRED_SETTLE, controller.signal);
      setTransPhase('idle');
      setTransitioning(false);
      setPrevDepth(null);
    } catch (e) { /* aborted — user clicked again */ }
  }, [depth, transitioning, clearAllSubs]);

  const navigateToDepth = useCallback(async (targetDepth, targetPath) => {
    if ((targetDepth === depth && !targetPath) || transitioning) return;
    // If same depth but different poem path, just switch the path
    if (targetDepth === depth && targetPath) {
      setUserPath(targetPath);
      return;
    }

    transAbortRef.current?.abort();
    const controller = new AbortController();
    transAbortRef.current = controller;

    const dir = targetDepth > depth ? 'deeper' : 'back';

    try {
      setTransDir(dir);
      setTransPhase('exit');
      setTransitioning(true);
      setPrevDepth(depth);
      setFading(true);

      await wait(SACRED_EXIT, controller.signal);
      window.scrollTo({ top: 0, behavior: "instant" });
      // Set poem path when navigating to depth 2
      if (targetDepth === 2 && targetPath) {
        setUserPath(targetPath);
        setSkipIntro(true);
      }
      // THE VOID — skip opening act so it doesn't auto-advance
      if (targetDepth === 0) {
        setSkipIntro(true);
      }
      setDepth(targetDepth);
      clearAllSubs();
      setFading(false);
      setTransPhase('enter');

      await wait(SACRED_ENTER, controller.signal);
      setTransPhase('settle');

      await wait(SACRED_SETTLE, controller.signal);
      setTransPhase('idle');
      setTransitioning(false);
      setPrevDepth(null);
    } catch (e) { /* aborted */ }
  }, [depth, transitioning, clearAllSubs]);

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
      position: "relative", overflowX: "hidden", overflowY: "auto",
      transition: `background ${(PHI * PHI).toFixed(3)}s cubic-bezier(0.23, 1, 0.32, 1)`,
    }}>



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
          </div>
          <MultiverseFractal style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }} />
          {/* Bottom navigation */}
          <div style={{
            position: "absolute", bottom: 24, left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: 20,
            zIndex: 10,
          }}>
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
          {mathParticles.map((p, i) => (
            <Particle key={i} delay={p.delay}
              size={p.size}
              x={p.x}
              speed={p.speed} />
          ))}
          <MathPage onReturn={() => { setCurrentPage("theory"); setDepth(0); window.scrollTo({ top: 0, behavior: "instant" }); }} />
        </>
      )}

      {/* ===== BINARY LANDING — Layer -2, two diverging rivers of light ===== */}
      {currentPage === "theory" && depth === -2 && (<>
        <BinaryLandingCanvas onChoice={(path) => {
          if (path === "death-or-life") {
            setUserPath("ask");
            setSkipIntro(true);
            setDepth(2);
          } else if (path === "pact") {
            setUserPath("ask");
            setDepth(3);
          } else if (path === "rhythm-of-life") {
            setUserPath("explore");
            setSkipIntro(true);
            setDepth(2);
          }
          window.scrollTo(0, 0);
        }}
          searchOverlay={
            <div style={{
              position: "absolute", top: `${Math.pow(PHI_INV, 4) * 100}%`, left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%", maxWidth: 520, padding: "0 20px",
              pointerEvents: "auto",
            }}>
              <div style={{ animation: `fadeSlideUp ${PHI * PHI * 1000}ms cubic-bezier(0.23,1,0.32,1) both` }}>
                <input
                  type="text"
                  value={doorInput}
                  onChange={(e) => { setDoorInput(e.target.value); setQuestionResults(null); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (doorInput.trim().length >= 3) {
                        setQuestionResults(findAnswers(doorInput));
                      }
                    }
                  }}
                  placeholder="ASK the proof a question"
                  style={{
                    width: "100%",
                    padding: `${Math.round(8 * PHI)}px ${Math.round(12 * PHI)}px`,
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(11px, 2.2vw, 14px)",
                    letterSpacing: 3,
                    color: "rgba(232,232,240,0.85)",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(232,232,240,0.08)",
                    borderRadius: Math.round(4 * PHI),
                    outline: "none",
                    textAlign: "center",
                    transition: "all 0.618s cubic-bezier(0.23,1,0.32,1)",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.25)";
                    e.target.style.boxShadow = "0 0 30px rgba(201,168,76,0.04), inset 0 0 20px rgba(0,0,0,0.3)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(232,232,240,0.08)";
                    e.target.style.boxShadow = "inset 0 0 20px rgba(0,0,0,0.3)";
                  }}
                />
              </div>
            </div>
          }
        />
        {/* Nav dissolves in on landing — golden ratio timing */}
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10200,
          pointerEvents: "none",
          animation: `fadeSlideUp ${PHI * 1000}ms ${PHI * PHI * 1000}ms both cubic-bezier(0.23,1,0.32,1)`,
        }}>
          <div style={{ pointerEvents: "auto" }}>
            <DepthIndicator depth={depth} onNavigate={navigateToDepth} depthNames={DEPTH_NAMES} userPath={userPath} />
          </div>
        </div>
      </>)}

      {/* ===== DIAMOND GENESIS — plays before MirrorGate on ASK path ===== */}
      {currentPage === "theory" && depth === -1 && !diamondPlayed && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 10000, background: "#030306",
        }}>
          <DiamondGenesisCanvas onComplete={() => setDiamondPlayed(true)} />
        </div>
      )}

      {/* ===== MIRROR GATE — Layer -1, appears after diamond genesis ===== */}
      {currentPage === "theory" && depth === -1 && diamondPlayed && (
        <MirrorGate
          onEnter={() => setDepth(0)}
          onNavigateToDepth={(route) => {
            // Apply the full route — land on the exact content page
            setActiveConvergence(route && route.convergence ? route.convergence : null);
            setActiveSubcategory(route && route.subcategory ? route.subcategory : null);
            setActiveIdea(route && route.idea ? route.idea : null);
            setActiveFilterQ(route && route.filterQ !== undefined ? route.filterQ : null);
            setDepth(4);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      )}

      {/* ===== THEORY PAGE (original content) ===== */}
      {currentPage === "theory" && depth >= 0 && (<>


      {/* Grain overlay — hidden during pure black/white landing phases */}
      {(depth >= 1) && <GrainOverlay />}

      {/* Depth indicator — 10 dots with hover labels (hidden during opening act) */}
      {(depth >= 1) && <DepthIndicator depth={depth} onNavigate={navigateToDepth} depthNames={DEPTH_NAMES} userPath={userPath} />}

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

      {/* Legacy fading overlay — opacity-only for performance (no backdrop-filter) */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 42%, rgba(3,3,6,0.85), #030306)",
        zIndex: 996, pointerEvents: "none",
        opacity: fading ? 0.95 : 0,
        transition: "opacity 0.5s ease",
      }} />

      {/* Particles — hidden during pure black/white landing */}
      {(depth >= 1) && theoryParticles.map((p, i) => (
        <Particle key={i} delay={p.delay}
          size={p.size}
          x={p.x}
          speed={p.speed} />
      ))}

      {/* THE MULTIVERSE — persistent gravitational simulation behind ALL depths.
          9 bodies. Real physics. Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist².
          NOT rendered at depths 0-2 — DreamMultiverseCanvas handles those.
          Bright at surface, fading as you go deeper — the stars are always there. */}
      {depth >= 3 && <Multiverse
        opacity={depth <= 3 ? 0.25 : depth <= 4 ? 0.1 : 0.05}
        showTriangles={depth === 3}
        showOrbits={depth <= 3}
        zoom={1}
        blur={0}
        transitionTiming={"opacity 1.2s ease, transform 2.5s cubic-bezier(0.23,1,0.32,1), filter 2.5s cubic-bezier(0.23,1,0.32,1)"}
      />}

      {/* ===== THE OPENING ACT — direct DOM, zero re-renders ===== */}
      {depth >= 0 && depth <= 2 && !skipIntro && (
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
            cursor: "pointer",
          }}
          onClick={() => { setDepth(4); window.scrollTo(0, 0); }}
          >
            dreaming & building
          </div>
          <div ref={words2Ref} onClick={() => { setDepth(4); window.scrollTo(0, 0); }} style={{
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
            cursor: "pointer",
          }}>
            dreaming & building
          </div>
        </div>
      )}

      {/* SECRET PASSAGE — removed for now. Hidden in plain sight later. */}

      {/* DREAM MULTIVERSE / DIAMOND GENESIS — the crown jewel */}
      {/* Stays mounted through depth 2 transition to avoid flash-unmount */}
      {/* depth 0 = THE VOID — pure nothingness, no canvas */}
      {depth >= 1 && depth <= 2 && (
        <div style={{
          height: "100vh", width: "100%", position: "fixed", top: 0, left: 0,
          zIndex: 1500,
          overflow: "hidden",
          opacity: 1,
          pointerEvents: "none",
        }}>
          {userPath === "ask"
            ? <DiamondGenesisCanvas depth={depth} onVeilParted={() => setVeilParted(true)} />
            : <DreamMultiverseCanvas depth={depth} onVeilParted={() => setVeilParted(true)} />
          }
        </div>
      )}

      {/* ===== DEPTH 2 — THE POEM (grist mill wheel) ===== */}
      {depth === 2 && (() => {
        const PoemWheel = () => {
          const wheelRef = useRef(null);
          const scrollRef = useRef(null);
          const lastTime = useRef(null);
          const frameRef = useRef(null);

          useEffect(() => {
            if (!wheelRef.current || !scrollRef.current) return;
            const container = wheelRef.current;
            const scroller = scrollRef.current;
            const viewH = container.clientHeight;

            // Measure one cycle: count DOM children for exactly one poem's items
            const activePoems = userPath === "ask" ? ASK_POEMS : POEMS;
            const oneCycleCount = activePoems.length;
            let oneCycleH = 0;
            const kids = scroller.children;
            for (let c = 0; c < oneCycleCount && c < kids.length; c++) {
              oneCycleH += kids[c].offsetHeight;
            }

            // Speed: one cycle in ~62 seconds (PHI² × 23.6)
            const cycleDuration = Math.round(PHI * PHI * 23.6) * 1000;
            const speed = oneCycleH / cycleDuration; // px per ms

            // Start at center — title crystallizes from the glow
            const titleH = kids[0] ? kids[0].offsetHeight : 0;
            let y = (viewH - titleH) / 2;
            let totalElapsed = 0;
            scroller.style.transform = `translateY(${y}px)`;
            scroller.style.opacity = "0";

            // Hide all lines except the first title — they appear when scrolling starts
            const firstTitle = kids[0];
            for (let c = 1; c < kids.length; c++) {
              kids[c].style.opacity = "0";
            }

            // The first bookend: start white, tiny, blurred — will transition to gold, full-size, crisp
            if (firstTitle) {
              firstTitle.style.color = 'rgba(255,255,255,0.9)';
              firstTitle.style.WebkitTextFillColor = 'rgba(255,255,255,0.9)';
              firstTitle.style.background = 'none';
              firstTitle.style.filter = 'blur(30px)';
              firstTitle.style.transform = 'scale(0.05)';
            }

            const CRYSTALLIZE_DUR = 4236; // PHI³ ms

            const waitForVeil = () => {
              if (!veilParted) { frameRef.current = requestAnimationFrame(waitForVeil); return; }

              // Phase 1: Make scroller visible (title is still white/tiny/blurred)
              scroller.style.opacity = "1";

              // Phase 2: Crystallize — blur→sharp, scale→full, white→gold all at once
              if (firstTitle) {
                firstTitle.style.transition = `filter ${CRYSTALLIZE_DUR}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${CRYSTALLIZE_DUR}ms cubic-bezier(0.23, 1, 0.32, 1), color ${CRYSTALLIZE_DUR}ms ease, -webkit-text-fill-color ${CRYSTALLIZE_DUR}ms ease, background ${CRYSTALLIZE_DUR}ms ease`;
                firstTitle.style.filter = 'blur(0px)';
                firstTitle.style.transform = 'scale(1)';
                // Restore the gold shimmer gradient
                firstTitle.style.background = 'linear-gradient(90deg, rgba(201,168,76,0.5) 0%, rgba(255,245,220,0.95) 25%, rgba(201,168,76,1) 50%, rgba(255,245,220,0.95) 75%, rgba(201,168,76,0.5) 100%)';
                firstTitle.style.backgroundSize = '200% 100%';
                firstTitle.style.WebkitBackgroundClip = 'text';
                firstTitle.style.WebkitTextFillColor = 'transparent';
                firstTitle.style.backgroundClip = 'text';
              }

              // Hold while title crystallizes, then reveal poem lines and start scrolling
              setTimeout(() => {
                for (let c = 1; c < kids.length; c++) {
                  kids[c].style.transition = "opacity 1.618s ease";
                  kids[c].style.opacity = "1";
                }
                lastTime.current = null;
                frameRef.current = requestAnimationFrame(scroll);
              }, CRYSTALLIZE_DUR);
            };

            function scroll(now) {
              if (!lastTime.current) lastTime.current = now;
              const dt = Math.min(now - lastTime.current, 50); // cap dt to avoid jumps on tab-switch
              lastTime.current = now;
              totalElapsed += dt;

              y -= speed * dt;

              // Silent jump-back: when we've scrolled past one full cycle, snap back
              if (y < viewH - oneCycleH * 2) {
                y += oneCycleH;
              }

              scroller.style.transform = `translateY(${y}px)`;


              frameRef.current = requestAnimationFrame(scroll);
            }

            frameRef.current = requestAnimationFrame(waitForVeil);
            return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
          }, []);

          // Golden ratio font sizes: base 17 × PHI = 28, × PHI² = 44
          const poemFontMin = Math.round(17 * PHI);
          const poemFontMax = Math.round(17 * PHI * PHI);

          return (
            <div ref={wheelRef} style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              zIndex: 5001, overflow: 'hidden', pointerEvents: 'none',
            }}>
              {/* Top fade */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '38.2%',
                background: 'linear-gradient(to bottom, rgba(3,3,6,0.7) 0%, rgba(3,3,6,0.5) 30%, rgba(3,3,6,0) 100%)',
                zIndex: 2, pointerEvents: 'none',
              }} />
              {/* Bottom fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', height: '38.2%',
                background: 'linear-gradient(to top, rgba(3,3,6,0.7) 0%, rgba(3,3,6,0.5) 30%, rgba(3,3,6,0) 100%)',
                zIndex: 2, pointerEvents: 'none',
              }} />

              {/* The scrolling poem — 3 copies for seamless infinite scroll */}
              <div ref={scrollRef} style={{
                position: 'absolute', left: 0, width: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '0 5%',
              }}>
                {(() => { const ap = userPath === "ask" ? ASK_POEMS : POEMS; return [...ap, ...ap, ...ap]; })().map((line, i) => {
                  if (line === "") {
                    return <div key={i} style={{ height: `${Math.round(38 * PHI)}px` }} />;
                  }
                  const bookendTitle = userPath === "ask" ? "death or life" : "it's the rhythm of life";
                  const isBookend = (line === bookendTitle);
                  const parts = line.split("\n");
                  return (
                    <div key={i} style={{
                      fontFamily: isBookend ? "'Cinzel', serif" : "'Cormorant Garamond', serif",
                      fontSize: isBookend
                        ? `clamp(${Math.round(poemFontMin * PHI)}px, ${5.5 * PHI}vw, ${Math.round(poemFontMax * PHI)}px)`
                        : `clamp(${poemFontMin}px, 5.5vw, ${poemFontMax}px)`,
                      fontStyle: isBookend ? 'normal' : 'italic',
                      fontWeight: isBookend ? 400 : 300,
                      color: isBookend ? 'rgba(201,168,76,0.9)' : 'rgba(232,232,240,0.85)',
                      textAlign: 'center',
                      lineHeight: 1.5,
                      letterSpacing: isBookend ? 4 : 0.8,
                      marginBottom: Math.round(8 * PHI),
                      maxWidth: '618px',
                      ...(isBookend ? {
                        background: 'linear-gradient(90deg, rgba(201,168,76,0.5) 0%, rgba(255,245,220,0.95) 25%, rgba(201,168,76,1) 50%, rgba(255,245,220,0.95) 75%, rgba(201,168,76,0.5) 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'shimmerLine 5s ease-in-out infinite',
                        filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.15)) drop-shadow(0 0 40px rgba(201,168,76,0.06))',
                      } : {}),
                    }}>
                      {parts.map((p, j) => (
                        <span key={j}>{j > 0 && <br/>}{p}</span>
                      ))}
                    </div>
                  );
                })}
              </div>

            </div>
          );
        };
        return <PoemWheel />;
      })()}



      {/* ===== DEPTH 3 — THE PACT — 3D OCTAHEDRON ===== */}
      {depth === 3 && (() => {
        return (
          <div style={{
            height: "100vh", width: "100%", position: "relative", overflowX: "hidden",
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
                }}>💎</div>
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

      {/* ===== DEPTH 4 — THE PROOF ===== */}
      {depth === 4 && activeConvergence === null && (
        <div style={{
          width: "100%",
          display: "flex", flexDirection: "column", alignItems: "center",
          animation: "fadeSlideUp 1.5s ease",
          position: "relative", zIndex: 1500,
          background: "#030306",
          paddingTop: Math.round(21 * PHI),
        }}>

          {/* Content */}
          <div style={{
            textAlign: "center",
            width: "100%", maxWidth: 580,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative", zIndex: 9100,
            padding: "0 16px",
          }}>

            {/* Ten doors + the eye (11th) — TETRACTYS PYRAMID 1+2+3+4=10 */}
            {(() => {
              const doors = [
                // ROW 1 — THE CAPSTONE — where all paths converge
                { key: "filter", glyph: "❤️", name: "LOVE", sub: "the mirror lens", r: 220, g: 80, b: 80 },
                // ROW 2 — THE TWO INNER PATHS — direct experience
                { key: "plain", glyph: "🕯️", name: "MYSTICISM", sub: "direct experience · no middleman", r: 200, g: 160, b: 100 },
                { key: "ancient", glyph: "🧠", name: "SELF", sub: "the self examining itself", r: 180, g: 160, b: 220 },
                // ROW 3 — THE THREE BRIDGES — faith · feeling · witness
                { key: "sameness", glyph: "✝️", name: "RELIGION", sub: "organized faith · scripture · ritual", r: 201, g: 168, b: 76 },
                { key: "depths", glyph: "🎨", name: "ART", sub: "creation as communion", r: 190, g: 140, b: 220 },
                { key: "pillars", glyph: "🌿", name: "NATURE", sub: "the oldest temple", r: 100, g: 180, b: 120 },
                // ROW 4 — THE FOUR FOUNDATIONS — story · reason · observation · pattern
                { key: "gravity", glyph: "📖", name: "MYTH", sub: "archetypes · legends · dreams", r: 200, g: 160, b: 100 },
                { key: "layers", glyph: "🤔", name: "PHILOSOPHY", sub: "reason as the path", r: 160, g: 180, b: 200 },
                { key: "rock", glyph: "🔬", name: "SCIENCE", sub: "observation · measurement · law", r: 79, g: 195, b: 247 },
                { key: "promise", glyph: "🔢", name: "MATH", sub: "pattern as proof · God's fingerprint", r: 201, g: 168, b: 76 },
              ];
              const rowLabels = [
                "the capstone",
                "the inner paths",
                "the bridges",
                "the foundations",
              ];
              const rows = [
                [doors[0]],
                [doors[1], doors[2]],
                [doors[3], doors[4], doors[5]],
                [doors[6], doors[7], doors[8], doors[9]],
              ];
              const cardGap = Math.round(3 * PHI);
              const cardSize = `clamp(93px, 25vw, 145px)`;

              const renderCard = (door, i, totalDelay) => {
                const accentDim = `rgba(${door.r},${door.g},${door.b},0.12)`;
                const accentGlow = `rgba(${door.r},${door.g},${door.b},0.05)`;
                const accentMid = `rgba(${door.r},${door.g},${door.b},0.03)`;
                const accentBorder = `rgba(${door.r},${door.g},${door.b},0.1)`;
                const accentText = `rgba(${door.r},${door.g},${door.b},0.8)`;
                const accentShadow = `rgba(${door.r},${door.g},${door.b},0.15)`;
                const accentFaint = `rgba(${door.r},${door.g},${door.b},0.06)`;
                return (
                  <div
                    key={door.key}
                    onClick={(e) => { e.stopPropagation(); setActiveConvergence(door.key); setActiveIdea(null); window.scrollTo(0,0); }}
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      borderRadius: Math.round(8 * PHI_INV),
                      background: `linear-gradient(170deg, ${accentGlow} 0%, ${accentMid} 38.2%, rgba(3,3,6,0.65) 100%)`,
                      border: `1px solid ${accentBorder}`,
                      cursor: "pointer",
                      overflow: "hidden",
                      backdropFilter: "blur(12px) saturate(1.1)",
                      WebkitBackdropFilter: "blur(12px) saturate(1.1)",
                      boxShadow: `0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)`,
                      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s, box-shadow 0.6s",
                      animation: `fadeSlideUp 0.7s ${totalDelay}s both ease`,
                      textAlign: "center",
                      padding: `${Math.round(3 * PHI)}px`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
                      e.currentTarget.style.borderColor = `rgba(${door.r},${door.g},${door.b},0.28)`;
                      e.currentTarget.style.boxShadow = `0 8px 28px ${accentShadow}, 0 0 48px rgba(${door.r},${door.g},${door.b},0.06), inset 0 1px 0 rgba(255,255,255,0.06)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.borderColor = accentBorder;
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)";
                    }}
                  >
                    {/* Top accent — sacred line */}
                    <div style={{
                      position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                      background: `linear-gradient(90deg, transparent, ${accentDim}, transparent)`,
                    }} />
                    {/* Bottom accent — mirror of top */}
                    <div style={{
                      position: "absolute", bottom: 0, left: "20%", right: "20%", height: 1,
                      background: `linear-gradient(90deg, transparent, ${accentFaint}, transparent)`,
                    }} />
                    {/* Inner radial glow — depth */}
                    <div style={{
                      position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
                      width: "80%", height: "60%", borderRadius: "50%",
                      background: `radial-gradient(ellipse at center, rgba(${door.r},${door.g},${door.b},0.04), transparent 70%)`,
                      pointerEvents: "none",
                    }} />
                    <div style={{
                      fontSize: "clamp(24px, 5.5vw, 34px)",
                      marginBottom: Math.round(3 * PHI_INV),
                      filter: `drop-shadow(0 0 14px ${accentShadow})`,
                      animation: `gentleFloat ${7 + i * PHI}s ease-in-out infinite`,
                      lineHeight: 1,
                      position: "relative", zIndex: 1,
                    }}>{door.glyph}</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(10px, 2.6vw, 15px)",
                      letterSpacing: "0.15em",
                      color: accentText,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      position: "relative", zIndex: 1,
                    }}>{door.name}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(9px, 2vw, 13px)",
                      color: "rgba(232,232,240,0.4)",
                      fontStyle: "italic",
                      marginTop: Math.round(2 * PHI_INV),
                      lineHeight: PHI_INV * 2,
                      position: "relative", zIndex: 1,
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
                  {/* ★ THE PROOF — title at top with arrows */}
                  <div style={{
                    animation: "fadeSlideUp 1.2s 0.3s both ease",
                    marginBottom: Math.round(13 * PHI),
                    textAlign: "center",
                    position: "relative",
                  }}>
                    {/* Subtle radiance behind title */}
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: "40vmin", height: "40vmin",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 65%)",
                      transform: "translate(-50%, -50%)",
                      animation: "breathe 10s ease-in-out infinite",
                      pointerEvents: "none",
                    }} />
                    <div style={{
                      fontSize: "clamp(28px, 6vw, 42px)",
                      marginBottom: Math.round(3 * PHI),
                      filter: "drop-shadow(0 0 24px rgba(201,168,76,0.2))",
                      animation: "gentleFloat 10s ease-in-out infinite",
                      lineHeight: 1,
                    }}>🔺</div>
                    <h2 style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(20px, 5vw, 34px)",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                      margin: 0, lineHeight: 1.3,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(201,168,76,0.55) 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 20px rgba(201,168,76,0.08))",
                      animation: "textManifest 1.8s 0.4s both ease",
                    }}>THE PROOF</h2>
                    <div style={{
                      fontSize: "clamp(28px, 6vw, 42px)",
                      marginTop: Math.round(3 * PHI),
                      filter: "drop-shadow(0 0 24px rgba(201,168,76,0.2))",
                      animation: "gentleFloat 10s 5s ease-in-out infinite",
                      lineHeight: 1,
                    }}>🔻</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 2.5vw, 14px)", letterSpacing: "0.5em",
                      color: "rgba(201,168,76,0.3)",
                      textTransform: "uppercase",
                      marginTop: Math.round(5 * PHI),
                      animation: "fadeSlideUp 1.2s 0.8s both ease",
                    }}>ten doors · one truth</div>
                  </div>

                  {/* ★ THE EYE — floating above the pyramid like the Great Seal */}
                  <div style={{
                    animation: "fadeSlideUp 1.2s 0.6s both ease",
                    textAlign: "center",
                    marginBottom: Math.round(8 * PHI),
                    position: "relative",
                  }}>
                    {/* Sacred ring behind eye */}
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -55%)",
                      width: Math.round(34 * PHI), height: Math.round(34 * PHI),
                      borderRadius: "50%",
                      border: "1px solid rgba(201,168,76,0.06)",
                      animation: "breathe 8s ease-in-out infinite",
                      pointerEvents: "none",
                    }} />
                    <div style={{
                      fontSize: "clamp(26px, 5.5vw, 38px)",
                      animation: "breathe 6s ease-in-out infinite",
                      filter: "drop-shadow(0 0 18px rgba(201,168,76,0.3))",
                      position: "relative", zIndex: 1,
                    }}>👁️</div>
                    <div style={{
                      width: Math.round(55 * PHI), height: 1,
                      margin: `${Math.round(5 * PHI_INV)}px auto 0`,
                      background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(201,168,76,0.35), rgba(201,168,76,0.2), transparent)",
                      boxShadow: "0 0 12px rgba(201,168,76,0.06)",
                    }} />
                  </div>

                  {/* Row 1: 1 card — THE POINT (what is it?) */}
                  <div style={{ textAlign: "center", marginBottom: Math.round(3 * PHI_INV) }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: `clamp(10px, 2vw, ${Math.round(8 * PHI)}px)`, fontStyle: "italic", color: "rgba(201,168,76,0.3)", letterSpacing: Math.round(PHI + 1) }}>{rowLabels[0]}</div>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "center",
                    gap: cardGap, marginBottom: Math.round(5 * PHI),
                  }}>
                    {rows[0].map((d, i) => <div key={d.key} style={{ width: cardSize }}>{renderCard(d, i, 0.7)}</div>)}
                  </div>

                  {/* Golden connector ◇ */}
                  <div style={{ textAlign: "center", margin: `${Math.round(2 * PHI_INV)}px 0 ${Math.round(3 * PHI)}px`, opacity: 0.12, fontSize: 8, color: "rgba(201,168,76,1)", letterSpacing: 8 }}>◇</div>

                  {/* Row 2: 2 cards — THE LINE (how do we know?) */}
                  <div style={{ textAlign: "center", marginBottom: Math.round(3 * PHI_INV) }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: `clamp(10px, 2vw, ${Math.round(8 * PHI)}px)`, fontStyle: "italic", color: "rgba(201,168,76,0.25)", letterSpacing: Math.round(PHI + 1) }}>{rowLabels[1]}</div>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "center",
                    gap: cardGap, marginBottom: Math.round(5 * PHI),
                  }}>
                    {rows[1].map((d, i) => <div key={d.key} style={{ width: cardSize }}>{renderCard(d, i, 0.9 + i * 0.1)}</div>)}
                  </div>

                  {/* Golden connector ◇ ◇ */}
                  <div style={{ textAlign: "center", margin: `${Math.round(2 * PHI_INV)}px 0 ${Math.round(3 * PHI)}px`, opacity: 0.1, fontSize: 8, color: "rgba(201,168,76,1)", letterSpacing: 8 }}>◇ ◇</div>

                  {/* Row 3: 3 cards — THE SURFACE (how does it work?) */}
                  <div style={{ textAlign: "center", marginBottom: Math.round(3 * PHI_INV) }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: `clamp(10px, 2vw, ${Math.round(8 * PHI)}px)`, fontStyle: "italic", color: "rgba(201,168,76,0.2)", letterSpacing: Math.round(PHI + 1) }}>{rowLabels[2]}</div>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "center",
                    gap: cardGap, marginBottom: Math.round(5 * PHI),
                  }}>
                    {rows[2].map((d, i) => <div key={d.key} style={{ width: cardSize }}>{renderCard(d, i, 1.1 + i * 0.1)}</div>)}
                  </div>

                  {/* Golden connector ◇ ◇ ◇ */}
                  <div style={{ textAlign: "center", margin: `${Math.round(2 * PHI_INV)}px 0 ${Math.round(3 * PHI)}px`, opacity: 0.08, fontSize: 8, color: "rgba(201,168,76,1)", letterSpacing: 8 }}>◇ ◇ ◇</div>

                  {/* Row 4: 4 cards — THE SOLID (how do we live it?) */}
                  <div style={{ textAlign: "center", marginBottom: Math.round(3 * PHI_INV) }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: `clamp(10px, 2vw, ${Math.round(8 * PHI)}px)`, fontStyle: "italic", color: "rgba(201,168,76,0.15)", letterSpacing: Math.round(PHI + 1) }}>{rowLabels[3]}</div>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "center",
                    gap: cardGap, marginBottom: cardGap,
                  }}>
                    {rows[3].map((d, i) => <div key={d.key} style={{ width: cardSize }}>{renderCard(d, i, 1.3 + i * 0.1)}</div>)}
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Tetractys note */}
          <div style={{
            textAlign: "center", marginTop: Math.round(8 * PHI),
            animation: "fadeSlideUp 1.5s 1.6s both ease",
          }}>
            <div style={{
              width: Math.round(34 * PHI), height: 1,
              margin: `0 auto ${Math.round(5 * PHI)}px`,
              background: "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.08) 30%, rgba(201,168,76,0.15) 50%, rgba(201,168,76,0.08) 70%, transparent 95%)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.8vw, 17px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.18)",
              letterSpacing: Math.round(PHI + 2),
            }}>1 + 2 + 3 + 4 = 10</div>
          </div>

          <div style={{ height: Math.round(5 * PHI) }} />
        </div>
      )}

      {/* ===== SUBCATEGORY GRID — 10 Rooms inside each Door ===== */}
      {depth === 4 && activeConvergence !== null && activeSubcategory === null && activeIdea === null && (
        <SubcategoryGrid
          doorKey={activeConvergence}
          onSelectSub={(subId) => { setActiveSubcategory(subId); window.scrollTo(0,0); }}
          onBack={() => { setActiveConvergence(null); setActiveSubcategory(null); setActiveIdea(null); window.scrollTo(0,0); }}
        />
      )}

      {/* ===== SUBCATEGORY VIEW — Inside a single Room ===== */}
      {depth === 4 && activeConvergence !== null && activeSubcategory !== null && activeSubcategory !== "__essay__" && activeIdea === null && (
        <SubcategoryView
          doorKey={activeConvergence}
          subId={activeSubcategory}
          onBack={() => { setActiveSubcategory(null); window.scrollTo(0,0); }}
        />
      )}

      {/* ===== DEEP-LINK — Jump straight to a specific card ===== */}
      {depth === 4 && activeConvergence !== null && activeSubcategory !== null && activeIdea !== null && (
        <SubcategoryView
          doorKey={activeConvergence}
          subId={activeSubcategory}
          initialOpenCard={activeIdea}
          onBack={() => { setActiveIdea(null); window.scrollTo(0,0); }}
        />
      )}

      {/* ===== DEPTH 5 — SEARCH ===== */}
      {depth === 5 && (
        <div style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "visible",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: (questionResults?.results?.length > 0 || wikiResults || wikiLoading) ? "flex-start" : "center",
          paddingTop: (questionResults?.results?.length > 0 || wikiResults || wikiLoading) ? "8vh" : 0,
          paddingBottom: (wikiResults || wikiLoading) ? "8vh" : 0,
          transition: "all 0.618s cubic-bezier(0.23,1,0.32,1)",
          ...getDepthWrap(5),
        }}>
          <div style={{ textAlign: "center", animation: "fadeSlideUp 1.2s ease", position: "relative", zIndex: 5, maxWidth: 520, padding: "0 20px" }}>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.35em", margin: 0,
              animation: "textManifest 1.8s 0.3s both ease",
            }}>SEARCH</h2>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(12 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
            }} />

            {/* The Question — search bar */}
            <div style={{ animation: "fadeSlideUp 1.5s 0.6s both ease", width: "100%", marginTop: Math.round(8 * PHI) }}>
              <input
                type="text"
                value={doorInput}
                onChange={(e) => { setDoorInput(e.target.value); setQuestionResults(null); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (doorInput.trim().length >= 3) {
                      setQuestionResults(findAnswers(doorInput));
                    }
                  }
                }}
                placeholder="THE PROOF"
                style={{
                  width: "100%",
                  padding: `${Math.round(8 * PHI)}px ${Math.round(12 * PHI)}px`,
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(11px, 2.2vw, 14px)",
                  letterSpacing: 3,
                  color: "rgba(232,232,240,0.85)",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(232,232,240,0.08)",
                  borderRadius: Math.round(4 * PHI),
                  outline: "none",
                  textAlign: "center",
                  transition: "all 0.618s cubic-bezier(0.23,1,0.32,1)",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(201,168,76,0.25)";
                  e.target.style.boxShadow = "0 0 30px rgba(201,168,76,0.04), inset 0 0 20px rgba(0,0,0,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(232,232,240,0.08)";
                  e.target.style.boxShadow = "inset 0 0 20px rgba(0,0,0,0.3)";
                }}
              />
            </div>

            {/* ── ORACLE REVELATION — question experience ── */}
            {questionResults?.results?.length > 0 && (
              <OracleRevelation
                data={questionResults}
                query={doorInput}
                onNavigate={(route) => {
                  setActiveConvergence(route.convergence);
                  setActiveSubcategory(route.subcategory || null);
                  setActiveIdea(route.idea || null);
                  setActiveFilterQ(route.filterQ !== undefined ? route.filterQ : null);
                  setDepth(4);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              />
            )}

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* ── WIKIPEDIA SEARCH BAR ── */}
            <div style={{ animation: "fadeSlideUp 1.5s 1s both ease", width: "100%" }}>
              <input
                type="text"
                value={wikiInput}
                onChange={(e) => { setWikiInput(e.target.value); setWikiResults(null); }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (wikiInput.trim().length >= 2) {
                      setWikiLoading(true);
                      setWikiResults(null);
                      try {
                        const result = await fetchWiki(wikiInput);
                        setWikiResults(result);
                      } catch {
                        setWikiResults(null);
                      }
                      setWikiLoading(false);
                    }
                  }
                }}
                placeholder="WIKIPEDIA"
                style={{
                  width: "100%",
                  padding: `${Math.round(8 * PHI)}px ${Math.round(12 * PHI)}px`,
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(11px, 2.2vw, 14px)",
                  letterSpacing: 3,
                  color: "rgba(232,232,240,0.85)",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(232,232,240,0.08)",
                  borderRadius: Math.round(4 * PHI),
                  outline: "none",
                  textAlign: "center",
                  transition: "all 0.618s cubic-bezier(0.23,1,0.32,1)",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(201,168,76,0.25)";
                  e.target.style.boxShadow = "0 0 30px rgba(201,168,76,0.04), inset 0 0 20px rgba(0,0,0,0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(232,232,240,0.08)";
                  e.target.style.boxShadow = "inset 0 0 20px rgba(0,0,0,0.3)";
                }}
              />
            </div>

            {/* ── WIKI REVELATION — scored bullet points ── */}
            {(wikiLoading || wikiResults) && (
              <WikiRevelation
                data={wikiResults}
                loading={wikiLoading}
                query={wikiInput}
              />
            )}
          </div>
        </div>
      )}

      {/* ===== DEPTH 6 — THE SELF — I am ===== */}
      {depth === 6 && (
        <div style={{
          height: "100vh", width: "100%", position: "relative", overflowX: "hidden",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          ...getDepthWrap(6),
        }}>
          {/* Reflection ripples — emanating from center */}
          {[...Array(4)].map((_, i) => (
            <div key={`ripple-${i}`} style={{
              position: "absolute", top: "50%", left: "50%",
              width: `${30 + i * 20}vmin`, height: `${30 + i * 20}vmin`,
              borderRadius: "50%",
              border: "1px solid rgba(79,195,247,0.08)",
              animation: `reflectionRipple ${6 + i * 2}s ${i * 1.5}s ease-out infinite`,
              pointerEvents: "none",
            }} />
          ))}

          {/* Soft orbs — consciousness particles */}
          {[...Array(isMobileDevice ? 4 : 7)].map((_, i) => (
            <div key={`orb-${i}`} style={{
              position: "absolute",
              width: 60 + i * 30,
              height: 60 + i * 30,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(79,195,247,0.04), transparent 70%)`,
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `sacredOrbFloat ${12 + i * 3}s ${i * 2}s ease-in-out infinite`,
              pointerEvents: "none",
            }} />
          ))}

          {/* Central mirror glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "50vmin", height: "50vmin",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, rgba(79,195,247,0.02) 35%, transparent 65%)",
            transform: "translate(-50%, -50%)",
            animation: "breathe 10s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          <div style={{ textAlign: "center", animation: "fadeSlideUp 1.2s ease", position: "relative", zIndex: 5, maxWidth: 520, padding: "0 20px" }}>
            <div style={{
              fontSize: "clamp(40px, 8vw, 60px)",
              marginBottom: Math.round(8 * PHI),
              animation: "mirrorFloat 8s ease-in-out infinite",
              filter: "drop-shadow(0 0 20px rgba(79,195,247,0.25))",
            }}>🪞</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.35em", margin: 0,
              animation: "textManifest 1.8s 0.3s both ease",
            }}>THE SELF</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(79,195,247,0.55)",
              letterSpacing: 1, lineHeight: PHI,
              marginTop: Math.round(5 * PHI),
              animation: "fadeSlideUp 1.2s 0.6s both ease",
            }}>I am</div>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.35), transparent)",
            }} />

            {/* The teaching */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 3vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.4)",
              lineHeight: PHI,
              marginTop: Math.round(8 * PHI),
              animation: "fadeSlideUp 1.5s 1s both ease",
            }}>
              the mirror doesn't judge<br />
              <span style={{ color: "rgba(79,195,247,0.45)" }}>it just shows you what's there</span>
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.5vw, 16px)",
              color: "rgba(232,232,240,0.2)",
              lineHeight: 1.8,
              maxWidth: 400,
              margin: "0 auto",
              animation: "fadeSlideUp 1.5s 1.4s both ease",
            }}>
              before you can recognize another soul<br />
              you have to meet the one wearing your face.
              <br /><br />
              <span style={{ color: "rgba(79,195,247,0.3)" }}>
                7 uses 8 to become 9.<br />
                self uses other to learn about self.
              </span>
            </div>

            {/* The crack — where the light enters */}
            <div style={{ height: Math.round(13 * PHI) }} />

            <div style={{
              width: Math.round(80 * PHI), height: 1,
              margin: "0 auto",
              background: "linear-gradient(90deg, transparent, rgba(224,80,80,0.3), rgba(79,195,247,0.2), transparent)",
              animation: "crackSpread 2s 1.8s both ease",
            }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(224,80,80,0.5)",
              letterSpacing: 1, lineHeight: PHI,
              marginTop: Math.round(10 * PHI),
              animation: "fadeSlideUp 1.5s 2s both ease",
            }}>
              I crack
            </div>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 3vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.35)",
              lineHeight: PHI,
              marginTop: Math.round(8 * PHI),
              animation: "fadeSlideUp 1.5s 2.4s both ease",
            }}>
              the shell must shatter<br />
              <span style={{ color: "rgba(224,80,80,0.35)" }}>before the light gets in</span>
            </div>

            <div style={{ height: Math.round(8 * PHI) }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.5vw, 16px)",
              color: "rgba(232,232,240,0.2)",
              lineHeight: 1.8,
              maxWidth: 400,
              margin: "0 auto",
              animation: "fadeSlideUp 1.5s 2.8s both ease",
            }}>
              every bone that heals grows back stronger at the seam.
              <br /><br />
              <span style={{ color: "rgba(224,80,80,0.25)", animation: "emberglow 6s ease-in-out infinite" }}>
                the break is not the end — it's where the new thing enters.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE OTHER — you are ===== */}
      {depth === 7 && (
        <div style={{
          height: "100vh", width: "100%", position: "relative", overflowX: "hidden",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          ...getDepthWrap(7),
        }}>
          {/* Two lights converging — the meeting point */}
          <div style={{
            position: "absolute", top: "50%", left: "30%",
            width: "35vmin", height: "35vmin",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)",
            transform: "translate(-50%, -50%)",
            animation: "sacredOrbFloat 14s ease-in-out infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "70%",
            width: "35vmin", height: "35vmin",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 65%)",
            transform: "translate(-50%, -50%)",
            animation: "sacredOrbFloat 14s 7s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          {/* The overlap — where recognition happens */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "25vmin", height: "25vmin",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(79,195,247,0.03) 40%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            animation: "breathe 6s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          {/* Convergence lines — reaching toward center */}
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return (
              <div key={`conv-${i}`} style={{
                position: "absolute",
                top: `${50 + sin * 35}%`,
                left: `${50 + cos * 35}%`,
                width: 60 + i * 15,
                height: 1,
                background: `linear-gradient(${90 + (angle * 180 / Math.PI)}deg, transparent, rgba(201,168,76,0.08), transparent)`,
                transform: `rotate(${angle * 180 / Math.PI}deg)`,
                animation: `breathe ${5 + i}s ${i * 0.8}s ease-in-out infinite`,
                pointerEvents: "none",
              }} />
            );
          })}

          <div style={{ textAlign: "center", animation: "fadeSlideUp 1.2s ease", position: "relative", zIndex: 5, maxWidth: 520, padding: "0 20px" }}>
            <div style={{
              fontSize: "clamp(40px, 8vw, 60px)",
              marginBottom: Math.round(8 * PHI),
              animation: "gentleFloat 8s ease-in-out infinite",
              filter: "drop-shadow(0 0 20px rgba(201,168,76,0.25))",
            }}>🤝</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.35em", margin: 0,
              animation: "textManifest 1.8s 0.3s both ease",
            }}>THE OTHER</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.55)",
              letterSpacing: 1, lineHeight: PHI,
              marginTop: Math.round(5 * PHI),
              animation: "fadeSlideUp 1.2s 0.6s both ease",
            }}>you are</div>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
            }} />

            {/* The teaching */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 3vw, 20px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.4)",
              lineHeight: PHI,
              marginTop: Math.round(8 * PHI),
              animation: "fadeSlideUp 1.5s 1s both ease",
            }}>
              recognition is not a solo act<br />
              <span style={{ color: "rgba(201,168,76,0.45)" }}>it takes two to complete the circuit</span>
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.5vw, 16px)",
              color: "rgba(232,232,240,0.2)",
              lineHeight: 1.8,
              maxWidth: 420,
              margin: "0 auto",
              animation: "fadeSlideUp 1.5s 1.4s both ease",
            }}>
              the signal goes out.
              it comes back the same.
              <br /><br />
              <span style={{ color: "rgba(201,168,76,0.3)" }}>
                Ψ₁₂ = R₁₂ × (C_eff · D̂)
              </span>
              <br /><br />
              <span style={{ color: "rgba(232,232,240,0.15)" }}>
                two eyes. one shape. all truth.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 8 — THE RETURN — we become ===== */}
      {depth === 8 && (
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

            {/* Advance to THE MIRROR */}
            <div onClick={() => goDeeper()} style={{
              cursor: "pointer",
              fontFamily: "'Cinzel', serif", fontSize: "clamp(14px, 3vw, 21px)", letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.3)",
              animation: "fadeSlideUp 2s 1s both ease, starGlow 5s 2s ease-in-out infinite",
              transition: "color 0.4s",
              userSelect: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(201,168,76,0.6)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(201,168,76,0.3)"}
            >WE BECOME ONE</div>

            <div style={{ height: Math.round(13 * PHI) }} />

            <div style={{
              fontSize: 24, opacity: 0.3,
              animation: "fadeSlideUp 2s 1.3s both ease",
            }}>🪙🪙🪙</div>

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
              { num: "I", title: "SAFETY", offering: "You deserve to walk through life knowing someone already thought about the locks, the money, and the backup plan. I want to make your world smaller in the ways that keep you safe and wider in every way that sets you free.", heart: "Your space should be where you exhale, not brace." },
              { num: "II", title: "TO BE SEEN", offering: "I do not love the version of you the world gets to see. I love the one who cries in the car and burns dinner and doubts herself on Tuesday afternoons. I choose you with your mess showing — not in spite of it — because the real you is the only one worth knowing.", heart: "Your life song deserves to be sung loud and proud." },
              { num: "III", title: "AGENCY", offering: "Your body is yours. Your time is yours. Your no is a complete sentence and you never have to defend it. A love that requires your shrinking is not love at all.", heart: "Your choices do not need my approval. The way you see the world is not wrong. It is rare." },
              { num: "IV", title: "PARTNERSHIP", offering: "I refuse to be another thing you manage. I want to notice the laundry, remember the appointments, and handle the things before you have to carry them in your head. You deserve a partner, not a project.", heart: "If you are carrying something heavy that nobody else sees — name it and I want to help you put it down." },
              { num: "V", title: "TO BE BELIEVED", offering: "When you tell me something hurts, I choose not to argue with your pain. When you say something is wrong, I choose not to need a second opinion. Your voice was never meant to be an echo.", heart: "I want to be a man who hears you the first time." },
              { num: "VI", title: "PURPOSE", offering: "You are not just someone's mother, someone's partner, someone's daughter. You are a whole person with a fire that existed before I ever showed up. I want to protect your right to chase whatever lights you up — especially when it is inconvenient.", heart: "You are rare and you do not look like anyone else — on the inside or the outside." },
              { num: "VII", title: "REST WITHOUT GUILT", offering: "You do not have to earn a nap. You do not have to finish the list before you sit down. I want to guard your rest the way I guard everything else I love — fiercely and without negotiation.", heart: "Your only job that day is to rest. My only job is to make sure nothing stops you." },
              { num: "VIII", title: "EMOTIONAL RECIPROCITY", offering: "I choose to ask you how you are and mean it. I choose to sit in the heavy silence instead of trying to fix it. You have carried everyone else's feelings long enough. Put some of that weight on me. I am built to hold it.", heart: "A permanent open line between us where music says what words sometimes cannot." },
              { num: "IX", title: "COMMUNITY", offering: "I choose to never be jealous of the women who know you best. Your friendships are not competition — they are oxygen that keeps you alive in ways I cannot. Go to brunch. Take the trip. Answer the call.", heart: "I have the fort. And I go with you when you need me to." },
              { num: "X", title: "CHOSEN EVERY SINGLE DAY", offering: "I choose not to win you and then coast. Day three thousand looks like day three — intentional, specific, and unmistakable. I choose you out loud, in front of people, in the small moments, and in the hard ones. You never have to wonder.", heart: "I — with everything I have and everything I am building." },
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
              marginBottom: Math.round(21 * PHI),
              animation: "breathe 8s ease-in-out infinite",
            }}>because true love is free</div>

            {/* ═══════════════════════════════════════════════ */}
            {/* THE FOUR WOMEN · WOW MOM WOW                   */}
            {/* the bedrock beneath the bedrock                 */}
            {/* ═══════════════════════════════════════════════ */}
            <div style={{
              textAlign: "center",
              marginBottom: Math.round(21 * PHI),
            }}>
              <div style={{
                width: Math.round(60 * PHI), height: 1,
                margin: `0 auto ${Math.round(13 * PHI)}px`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
              }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.5vw, 16px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.25)",
                letterSpacing: 2, marginBottom: Math.round(8 * PHI),
              }}>for the four who loved me before I earned it</div>

              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(16px, 3.5vw, 24px)",
                letterSpacing: "0.25em", color: "rgba(232,232,240,0.5)",
                lineHeight: 2.2,
              }}>
                KATHY<br />
                JOHANNA<br />
                NICOLE<br />
                PAM
              </div>

              <div style={{
                width: Math.round(30 * PHI), height: 1,
                margin: `${Math.round(8 * PHI)}px auto`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)",
              }} />

              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(20px, 5vw, 34px)",
                letterSpacing: "0.3em",
                background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(201,168,76,0.5) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginTop: Math.round(8 * PHI),
                animation: "breathe 8s ease-in-out infinite",
              }}>WOW MOM WOW</div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2vw, 14px)",
                fontStyle: "italic", color: "rgba(201,168,76,0.2)",
                marginTop: Math.round(5 * PHI),
                letterSpacing: 1,
              }}>read it forward · read it backward · flip it upside down</div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(12px, 2.2vw, 15px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                marginTop: Math.round(3 * PHI),
              }}>it cannot be broken</div>
            </div>

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

      {/* ===== DEPTH 9 — THE MIRROR — it is what it is ===== */}
      {depth === 9 && (
        <div style={{
          height: "100vh", width: "100%", position: "relative", overflowX: "hidden",
          zIndex: 1500,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          {/* Lunar radiance field */}
          <div style={{
            position: "absolute", top: "38%", left: "50%",
            width: "80vmin", height: "80vmin",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,232,240,0.04) 0%, rgba(232,232,240,0.015) 30%, rgba(201,168,76,0.008) 55%, transparent 75%)",
            transform: "translate(-50%, -50%)",
            animation: "breathe 12s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          {/* Orbital completion rings — 9 rings for 9 layers */}
          {[...Array(4)].map((_, i) => (
            <div key={`orbit-${i}`} style={{
              position: "absolute", top: "38%", left: "50%",
              width: `${22 + i * 12}vmin`, height: `${22 + i * 12}vmin`,
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,${0.04 - i * 0.008})`,
              animation: `orbitalPath ${40 + i * 15}s ${i % 2 === 0 ? '' : 'reverse '}linear infinite`,
              pointerEvents: "none",
            }}>
              {/* Tiny light on the ring */}
              <div style={{
                position: "absolute", top: -2, left: "50%",
                width: 4, height: 4, borderRadius: "50%",
                background: `rgba(201,168,76,${0.15 - i * 0.03})`,
                boxShadow: `0 0 8px rgba(201,168,76,${0.1 - i * 0.02})`,
              }} />
            </div>
          ))}

          {/* Sacred pulse rings — the heartbeat of completion */}
          {[...Array(3)].map((_, i) => (
            <div key={`sacred-pulse-${i}`} style={{
              position: "absolute", top: "38%", left: "50%",
              width: "15vmin", height: "15vmin",
              borderRadius: "50%",
              border: "1px solid rgba(232,232,240,0.06)",
              animation: `sacredPulseRing ${8 + i * 3}s ${i * 2.5}s ease-out infinite`,
              pointerEvents: "none",
            }} />
          ))}

          <div style={{ textAlign: "center", animation: "fadeSlideUp 1.5s ease", position: "relative", zIndex: 5, maxWidth: 500, padding: "0 20px" }}>
            {/* The Moon — with full lunar radiance */}
            <div style={{
              fontSize: "clamp(60px, 14vw, 100px)",
              marginBottom: Math.round(13 * PHI),
              animation: "lunarGlow 8s ease-in-out infinite, gentleFloat 12s ease-in-out infinite",
              position: "relative",
            }}>
              🌕
              {/* Shimmer halo */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "200%", height: "200%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(232,232,240,0.03), transparent 60%)",
                animation: "breathe 6s ease-in-out infinite",
                pointerEvents: "none",
              }} />
            </div>

            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.35em", margin: 0,
              animation: "textManifest 2s 0.3s both ease",
            }}>THE MIRROR</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.5)",
              letterSpacing: 1, lineHeight: PHI,
              marginTop: Math.round(5 * PHI),
              animation: "fadeSlideUp 1.5s 0.8s both ease",
            }}>it is what it is</div>
            <div style={{
              width: Math.round(80 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(232,232,240,0.15), rgba(201,168,76,0.2), transparent)",
              animation: "breathe 8s ease-in-out infinite",
            }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 3.5vw, 26px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.4)",
              marginTop: Math.round(13 * PHI),
              lineHeight: PHI,
              maxWidth: 440,
              animation: "fadeSlideUp 2s 1.2s both ease",
            }}>
              not <span style={{ color: "rgba(201,168,76,0.6)" }}>perfection</span>
              <br />
              <span style={{ color: "rgba(201,168,76,0.6)" }}>completion</span>
            </div>

            <div style={{ height: Math.round(8 * PHI) }} />

            {/* The deeper truth */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.5vw, 16px)",
              color: "rgba(232,232,240,0.18)",
              lineHeight: 1.8,
              maxWidth: 380,
              margin: "0 auto",
              animation: "fadeSlideUp 2s 1.6s both ease",
            }}>
              perfect is frozen. done. dead.
              <br />
              complete is whole. breathing. still turning.
              <br /><br />
              <span style={{ color: "rgba(201,168,76,0.2)" }}>
                10 sits outside the wheel.
                <br />10 watches. accepts. reflects all 9.
              </span>
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* The Return Button — sacred loop */}
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
              animation: "fadeSlideUp 2s 2s both ease, completionRadiate 8s 3s ease-in-out infinite",
              transition: "color 0.4s, letter-spacing 0.4s",
              userSelect: "none",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(201,168,76,0.65)"; e.currentTarget.style.letterSpacing = "0.6em"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(201,168,76,0.3)"; e.currentTarget.style.letterSpacing = "0.5em"; }}
            >WE FINISH I START</div>
            <div style={{ height: Math.round(13 * PHI) }} />
            <div style={{
              fontSize: 24, opacity: 0.3,
              animation: "fadeSlideUp 2s 2.3s both ease, gentleFloat 6s 3s ease-in-out infinite",
            }}>🪙🪙</div>
          </div>
        </div>
      )}

      </>)}
    </div>
  );
}
