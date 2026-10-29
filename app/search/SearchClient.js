'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { classifyContent } from '@/lib/tenDoors';
import { KEY_TO_SLUG } from '@/lib/doorMap';

// The card library (lib/siftEngine → lib/topicCards, ~3.5 MB) is loaded only
// when someone starts typing, so the doors themselves arrive light.
let enginePromise = null;
function loadEngine() {
  if (!enginePromise) enginePromise = import('@/lib/siftEngine');
  return enginePromise;
}

const PHI  = 1.618033988749895;

const DOORS = [
  { name: "LOVE",          emoji: "💛", slug: "love",          color: "220,160,160", key: "Love" },
  { name: "MYSTICISM",     emoji: "✨", slug: "mysticism",     color: "190,140,220", key: "Mysticism" },
  { name: "CONSCIOUSNESS", emoji: "👁️", slug: "consciousness", color: "200,200,230", key: "Consciousness" },
  { name: "RELIGION",      emoji: "⛪", slug: "religion",      color: "201,168,76",  key: "Religion" },
  { name: "ART",           emoji: "🎨", slug: "art",           color: "224,120,100", key: "Art" },
  { name: "NATURE",        emoji: "🌿", slug: "nature",        color: "120,180,100", key: "Nature" },
  { name: "MYTHOLOGY",     emoji: "📖", slug: "mythology",     color: "200,160,100", key: "Mythology" },
  { name: "PHILOSOPHY",    emoji: "🏛️", slug: "philosophy",    color: "150,180,220", key: "Philosophy" },
  { name: "SCIENCE",       emoji: "🔬", slug: "science",       color: "79,195,247",  key: "Science" },
  { name: "MATHEMATICS",   emoji: "📐", slug: "mathematics",   color: "201,168,76",  key: "Mathematics" },
];

const DOOR_COLORS = {};
DOORS.forEach(d => { DOOR_COLORS[d.key] = d.color; });
const SLUG_COLORS = {};
DOORS.forEach(d => { SLUG_COLORS[d.slug] = d.color; });

// The Tetractys: 1 · 2 · 3 · 4, Love at the apex.
const PYRAMID = [[0], [1, 2], [3, 4, 5], [6, 7, 8, 9]];

// Pyramid build: four rows in 1.618 s. Each row rises over --t-reveal (618 ms);
// row starts are spaced so the last one lands at 1618 ms.
const ROW_STEP_MS = Math.round((1618 - 618) / 3); // 333


/* ─── reduced motion (matchMedia) ─────────────────────────────── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener("change", update) : mq.addListener(update);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", update) : mq.removeListener(update);
    };
  }, []);
  return reduced;
}


/* ─── scoped styles (layout lives in CSS so server and client agree) ── */
const CSS = `
.sx-root .phi-search-input::placeholder { color: rgba(201,168,76,0.75); }

@keyframes sxRise {
  from { opacity: 0; transform: translateY(var(--s-xs)); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Surprise me */
.sx-surprise {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--s-2xs);
  min-height: 2.75rem;
  padding: var(--s-2xs) var(--s-md);
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.938rem; letter-spacing: 0.2em;
  color: rgba(201,168,76,0.9);
  background: rgba(201,168,76,0.04);
  border: 1px solid rgba(201,168,76,0.382);
  border-radius: var(--s-2xs);
  cursor: pointer;
  transition: border-color var(--t-base) var(--ease-snap), background var(--t-base) var(--ease-snap),
              box-shadow var(--t-base) var(--ease-snap), color var(--t-base) var(--ease-snap);
}
.sx-surprise:hover, .sx-surprise:focus-visible {
  color: rgba(201,168,76,1);
  border-color: rgba(201,168,76,0.75);
  background: rgba(201,168,76,0.08);
  box-shadow: 0 0 1.125rem rgba(201,168,76,0.15);
  outline: none;
}

/* Section labels */
.sx-label {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.875rem; letter-spacing: 0.236em;
  color: rgba(201,168,76,0.8);
  text-align: center; text-transform: uppercase;
  margin-bottom: var(--s-xs);
}

/* Wide band: lets the start row and the pyramid use more than the 42rem column on desktop */
.sx-wide { width: max(100%, min(54rem, calc(100vw - 2rem))); flex-shrink: 0; }

/* Begin anywhere — phone: horizontal scroll with snap */
.sx-start {
  display: flex; gap: var(--s-xs);
  overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--s-xs);
  padding: var(--s-4xs) var(--s-xs) var(--s-xs);
  margin-inline: calc(-1 * var(--s-xs));
  scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.3) transparent;
  -webkit-overflow-scrolling: touch;
}
.sx-start-card {
  flex: 0 0 15rem; scroll-snap-align: start;
  display: flex; flex-direction: column; gap: var(--s-3xs);
  padding: var(--s-xs) var(--s-sm) var(--s-sm);
  border: 1px solid rgba(201,168,76,0.382);
  border-radius: var(--s-2xs);
  background: rgba(201,168,76,0.035);
  text-decoration: none;
  transition: border-color var(--t-base) var(--ease-snap), background var(--t-base) var(--ease-snap),
              box-shadow var(--t-base) var(--ease-snap);
}
.sx-start-card:hover, .sx-start-card:focus-visible {
  border-color: rgba(201,168,76,0.75);
  background: rgba(201,168,76,0.07);
  box-shadow: 0 0 1.125rem rgba(201,168,76,0.12);
  outline: none;
}
.sx-start-icon { font-size: 1.618rem; line-height: 1.2; }
.sx-start-title {
  font-family: var(--font-display); font-weight: 700;
  font-size: 1rem; line-height: 1.25;
  color: rgba(201,168,76,0.92);
}
.sx-start-line {
  font-family: var(--font-body); font-weight: 300;
  font-size: 0.875rem; line-height: 1.5;
  color: rgba(232,228,210,0.7);
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
@media (min-width: 900px) {
  .sx-start {
    display: grid; grid-template-columns: repeat(5, 1fr);
    overflow: visible; margin-inline: 0; padding-inline: 0;
  }
  .sx-start-card { flex: none; }
}

/* Ten doors — phone: Love alone on top, pairs below, Mathematics alone at the base */
.sx-pyr { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-xs); }
.sx-row { display: contents; }
.sx-door[data-solo="1"] { grid-column: span 2; }

.sx-door {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: var(--s-3xs);
  min-width: 0;
  padding: var(--s-xs) var(--s-xs) var(--s-sm);
  border-radius: var(--s-2xs);
  text-align: center; text-decoration: none;
  cursor: pointer; user-select: none; position: relative;
  transition: all var(--t-reveal) var(--ease-snap);
}
.sx-door-emoji { font-size: 2rem; line-height: 1.1; }
.sx-door-name {
  font-family: var(--font-display); font-weight: 900;
  font-size: 0.938rem; letter-spacing: 0.04em; line-height: 1.15;
  white-space: nowrap;
}
.sx-door-q {
  font-family: var(--font-accent); font-style: italic; font-weight: 500;
  font-size: 1rem; line-height: 1.3;
  color: rgba(232,228,210,0.72);
  max-width: 22rem;
  text-wrap: balance;
}
.sx-door-pct { font-family: var(--font-body); font-weight: 300; font-size: 0.875rem; }

/* Desktop: the true pyramid */
@media (min-width: 640px) {
  .sx-pyr { display: flex; flex-direction: column; align-items: center; }
  .sx-row { display: flex; justify-content: center; gap: var(--s-xs); width: 100%; }
  .sx-door { flex: 0 1 12.5rem; padding: var(--s-sm) var(--s-xs); }
  .sx-door[data-solo="1"] { grid-column: auto; }
  .sx-door-emoji { font-size: 2.618rem; }
  .sx-door-name { font-size: 0.875rem; }
  .sx-door-q { font-size: 0.938rem; }
}
@media (min-width: 900px) {
  .sx-door-name { font-size: 0.938rem; }
  .sx-door-q { font-size: 1rem; }
}

/* The build */
.sx-build { animation: sxRise var(--t-reveal) var(--ease-snap) both; animation-delay: var(--delay, 0ms); }

@media (prefers-reduced-motion: reduce) {
  .sx-root *, .sx-root *::before, .sx-root *::after {
    animation: none !important; transition: none !important;
  }
}
.sx-root[data-reduced="1"] *, .sx-root[data-reduced="1"] *::before, .sx-root[data-reduced="1"] *::after {
  animation: none !important; transition: none !important;
}
`;


/* ─── DOOR CARD (with real-time scoring) ──────────────────────── */
function DoorCard({ door, question, score, isTop, hasScores, solo, delay }) {
  const [hover, setHover] = useState(false);
  const rgb = door.color;
  const pct = score || 0;

  // Dynamic scoring opacity — sacred, don't change this math
  const bgOp  = hasScores ? Math.max(0.08, pct / 100 * 0.9) : 0.12;
  const borOp = hasScores ? Math.max(0.22, pct / 100 * 0.6) : 0.30;
  const txtOp = hasScores ? Math.max(0.70, Math.min(1.0, pct / 100 * 1.4)) : 0.90;
  const emjOp = hasScores ? Math.max(0.75, Math.min(1.0, pct / 60)) : 0.95;

  return (
    <Link
      href={`/${door.slug}`}
      className="sx-door sx-build"
      data-solo={solo ? "1" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        "--delay": `${delay}ms`,
        background: `rgba(${rgb},${hover ? bgOp + 0.06 : bgOp})`,
        border: `1px solid rgba(${rgb},${hover ? borOp + 0.15 : borOp})`,
        boxShadow: isTop
          ? `0 0 1.5rem rgba(${rgb},0.22), 0 0 3rem rgba(${rgb},0.07)`
          : hover ? `0 0 1.125rem rgba(${rgb},0.15)` : "none",
      }}
    >
      <span className="sx-door-emoji" style={{ opacity: emjOp }} aria-hidden="true">{door.emoji}</span>
      <span className="sx-door-name" style={{ color: `rgba(${rgb},${txtOp})` }}>{door.name}</span>
      {question && <span className="sx-door-q">{question}</span>}
      {hasScores && pct > 0 && (
        <span className="sx-door-pct" style={{
          color: `rgba(${rgb},${Math.max(0.75, pct / 100)})`,
        }}>{Math.round(pct)}%</span>
      )}
    </Link>
  );
}


/* ─── CARD RESULT ─────────────────────────────────────────────── */
function CardResult({ result, index, onClick, reduced }) {
  const [hover, setHover] = useState(false);
  const rgb = DOOR_COLORS[result.doorName] || "201,168,76";

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: "1rem 1.618rem",
        background: hover ? `rgba(${rgb},0.236)` : `rgba(${rgb},0.03)`,
        border: `1px solid rgba(${rgb},${hover ? 0.618 : 0.236})`,
        borderRadius: "0.382rem",
        cursor: "pointer",
        transition: reduced ? "none" : "all 382ms var(--ease-snap)",
        animation: reduced ? "none" : `fadeUp 618ms ${100 + index * 100}ms both ease`,
        display: "flex", flexDirection: "column", gap: "0.382rem",
        boxShadow: hover ? `0 0 1.125rem rgba(${rgb},0.15), 0 0 2.5rem rgba(${rgb},0.06)` : "none",
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(0.938rem, 1.618vmin + 0.25rem, 1.375rem)",
        color: `rgba(${rgb},1.0)`,
        lineHeight: 1.1,
        letterSpacing: "-0.0382em",
      }}>
        {result.doorEmoji} {result.doorName}
        {result.subName && (
          <span style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(0.938rem, 1.618vmin + 0.25rem, 1.375rem)",
            color: "rgba(232,228,210,0.7)",
            marginLeft: "0.618rem",
          }}>{result.subName}</span>
        )}
      </span>
      <span style={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
        color: `rgba(232,228,210,${hover ? 1.0 : 0.75})`,
        transition: reduced ? "none" : "color 382ms var(--ease-snap)",
        lineHeight: 1.618,
      }}>{result.card?.title || "Untitled"}</span>
      {result.card?.simple && (
        <span style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(0.938rem, 1.618vmin + 0.25rem, 1.375rem)",
          color: "rgba(232,228,210,0.7)",
          lineHeight: 1.618,
        }}>{result.card.simple}</span>
      )}
    </div>
  );
}


/* ─── MIRROR RESULT ───────────────────────────────────────────── */
function MirrorResult({ result, index, onClick, reduced }) {
  const [hover, setHover] = useState(false);
  const truth = result.node?.truth || "";
  const dare = result.node?.dare || "";
  const depth = result.node?.depth || 0;

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: "1.618rem clamp(1rem, 4vw, 2.618rem)",
        background: hover
          ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%)"
          : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 100%)",
        border: `1px solid rgba(201,168,76,${hover ? 0.618 : 0.236})`,
        borderRadius: "0.382rem",
        cursor: onClick ? "pointer" : "default",
        transition: reduced ? "none" : "all 618ms var(--ease-snap)",
        animation: reduced ? "none" : `fadeUp 618ms ${100 + index * 100}ms both ease`,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", gap: "0.618rem",
        position: "relative", overflow: "hidden",
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "0.875rem",
        letterSpacing: "0.236em",
        color: "rgba(201,168,76,0.75)",
      }}>✦ LAYER {depth} ✦</span>
      {truth && (
        <div style={{
          fontFamily: "var(--font-accent)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
          color: `rgba(232,228,210,${hover ? 1.0 : 0.75})`,
          lineHeight: 1.618,
          maxWidth: "36rem",
        }}>"{truth}"</div>
      )}
      <div style={{
        width: "4.236rem", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.236), transparent)",
      }} />
      {dare && (
        <div style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(0.938rem, 1.618vmin + 0.25rem, 1.375rem)",
          color: `rgba(201,168,76,${hover ? 1.0 : 0.8})`,
          maxWidth: "30rem",
          lineHeight: 1.618,
        }}>{dare}</div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SEARCH PAGE (the doors)
   Props come from page.js at build time:
     daily      { path, title, icon, doorSlug } — today's card
     questions  { [doorSlug]: one-line question }
     startHere  [{ href, icon, title, line }] — five curated starts
     cardPaths  packed list of all 1,001 card paths (see lib/doorsMeta.js)
   ═══════════════════════════════════════════════════════════════ */
export default function SearchClient({ daily, questions = {}, startHere = [], cardPaths = [] }) {
  const router = useRouter();
  const reduced = useReducedMotion();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [doorScores, setDoorScores] = useState({});
  const [topDoor, setTopDoor] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const latestQuery = useRef("");

  const hasScores = Object.keys(doorScores).length > 0;

  const allPaths = useMemo(() => {
    const out = [];
    for (const [door, topics] of cardPaths) {
      for (const [topic, cards] of topics) {
        for (const card of cards) out.push(`/${door}/${topic}/${card}`);
      }
    }
    return out;
  }, [cardPaths]);

  const runSearch = useCallback((q) => {
    latestQuery.current = q;
    if (!q || q.trim().length < 2) {
      setResults([]); setDoorScores({}); setTopDoor(null); return;
    }
    const classified = classifyContent(q);
    const scores = {}; let max = 0; let top = null;
    classified.forEach((d) => {
      scores[d.door.name] = d.pct;
      if (d.pct > max) { max = d.pct; top = d.door.name; }
    });
    setDoorScores(scores); setTopDoor(top);
    loadEngine().then((engine) => {
      if (latestQuery.current === q) setResults(engine.siftSearch(q));
    });
  }, []);

  const handleInput = useCallback((e) => {
    const val = e.target.value; setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(val), 236);
  }, [runSearch]);

  const handleResultClick = (r) => {
    if (r.type === "card") {
      const slug = KEY_TO_SLUG[r.doorKey];
      if (slug) router.push(`/${slug}/${r.subId}`);
    } else if (r.type === "mirror" && r.navDoorKey) {
      const slug = KEY_TO_SLUG[r.navDoorKey];
      if (slug) router.push(`/${slug}`);
    }
  };

  const handleSurprise = () => {
    if (!allPaths.length) return;
    const path = allPaths[Math.floor(Math.random() * allPaths.length)];
    router.push(path);
  };

  const dailyRgb = (daily && SLUG_COLORS[daily.doorSlug]) || "201,168,76";
  const quiet = results.length === 0;

  return (
    <div className="phi-page bg-glow-center sx-root" data-reduced={reduced ? "1" : undefined} style={{
      position: "relative",
      paddingBottom: "6.854rem",
      overflowX: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Ambient glow — φ-proportioned */}
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "61.8vw", height: "38.2vh",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 61.8%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Content */}
      <div className="content-below-header" style={{
        width: "100%", maxWidth: "var(--content-max)",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>

        {/* Title */}
        <h1 className="stagger-fade" style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(1.375rem, 4.236vmin + 0.25rem, 2.25rem)",
          letterSpacing: "0.236em",
          color: "rgba(201,168,76,0.85)",
          textAlign: "center",
          animationDelay: "100ms",
          marginBottom: "0.618rem",
          textShadow: "0 0 0.5rem rgba(201,168,76,0.382), 0 0 1.5rem rgba(201,168,76,0.146)",
          lineHeight: 1.1,
        }}>SEARCH</h1>

        {/* Subtitle */}
        <p className="stagger-fade t-accent" style={{
          fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
          fontWeight: 300,
          color: "rgba(232,228,210,0.7)",
          textAlign: "center",
          animationDelay: "236ms",
          marginBottom: "1.618rem",
          lineHeight: 1.618,
        }}>Search anything or pick a door.</p>

        {/* Daily Card — chosen on the server, so the HTML and the app agree */}
        {quiet && daily && (
          <div className="stagger-fade" style={{
            width: "100%", marginBottom: "1.618rem",
            animationDelay: "200ms",
          }}>
            <div className="sx-label">Today's card</div>
            <Link
              href={daily.path}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem clamp(1rem, 4vw, 1.618rem)",
                background: `rgba(${dailyRgb},0.06)`,
                border: `1px solid rgba(${dailyRgb},0.22)`,
                borderRadius: "0.382rem",
                textDecoration: "none",
                transition: reduced ? "none" : "all 382ms var(--ease-snap)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${dailyRgb},0.45)`;
                e.currentTarget.style.background = `rgba(${dailyRgb},0.10)`;
                e.currentTarget.style.boxShadow = `0 0 1.125rem rgba(${dailyRgb},0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${dailyRgb},0.22)`;
                e.currentTarget.style.background = `rgba(${dailyRgb},0.06)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "2.618rem", lineHeight: 1 }} aria-hidden="true">{daily.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.618rem)",
                  color: `rgba(${dailyRgb},0.90)`,
                  letterSpacing: "0.02em",
                  lineHeight: 1.25,
                }}>{daily.title}</div>
                <div style={{
                  fontFamily: "var(--font-accent)", fontStyle: "italic",
                  fontSize: "clamp(0.938rem, 1.8vmin + 0.1rem, 1.125rem)",
                  color: "rgba(232,228,210,0.65)",
                }}>tap to explore today's card</div>
              </div>
            </Link>
          </div>
        )}

        {/* Search input — ABOVE doors so it's always visible */}
        <div id="search-anchor" className="stagger-fade" style={{
          width: "100%", animationDelay: "350ms", marginBottom: "1rem",
        }}>
          <input ref={inputRef} value={query} onChange={handleInput}
            placeholder="What question brought you here?"
            aria-label="Search the doors"
            spellCheck={false}
            className="phi-search-input"
            style={{
              borderColor: query
                ? "rgba(201,168,76,0.382)"
                : "rgba(201,168,76,0.236)",
              boxShadow: query
                ? "0 0 1.5rem rgba(201,168,76,0.08), inset 0 0 0.75rem rgba(201,168,76,0.02)"
                : "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(201,168,76,0.618)";
              setSearchFocused(true);
              loadEngine();
            }}
            onBlur={(e) => e.target.style.borderColor = "rgba(201,168,76,0.236)"}
          />
        </div>

        {/* Surprise me — one tap, one random card of the 1,001 */}
        <div className="stagger-fade" style={{ animationDelay: "420ms", marginBottom: "1.618rem" }}>
          <button type="button" className="sx-surprise" onClick={handleSurprise}>
            <span aria-hidden="true">🎲</span> SURPRISE ME
          </button>
        </div>

        {/* Search Results — appear RIGHT below search bar, push doors down */}
        {results.length > 0 && (
          <div style={{
            width: "100%", display: "flex", flexDirection: "column",
            gap: "0.618rem", marginBottom: "1.618rem",
          }}>
            <div style={{
              width: "100%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.236), transparent)",
              marginBottom: "0.382rem",
            }} />
            {results.map((r, i) => (
              r.type === "mirror"
                ? <MirrorResult key={`mirror-${i}`} result={r} index={i} reduced={reduced}
                    onClick={r.navDoorKey ? () => handleResultClick(r) : undefined} />
                : <CardResult key={`card-${i}`} result={r} index={i} reduced={reduced}
                    onClick={() => handleResultClick(r)} />
            ))}
          </div>
        )}

        {/* Begin anywhere — five curated cards */}
        {quiet && startHere.length > 0 && (
          <section className="sx-wide stagger-fade" style={{ marginBottom: "2.618rem", animationDelay: "300ms" }}
            aria-label="Begin anywhere">
            <div className="sx-label">Begin anywhere</div>
            <div className="sx-start">
              {startHere.map((c) => (
                <Link key={c.href} href={c.href} className="sx-start-card">
                  <span className="sx-start-icon" aria-hidden="true">{c.icon}</span>
                  <span className="sx-start-title">{c.title}</span>
                  <span className="sx-start-line">{c.line}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Ten Doors — the Tetractys, built row by row */}
        <nav className="sx-wide" aria-label="The ten doors" style={{ marginBottom: "1.618rem" }}>
          <div className="sx-pyr">
            {PYRAMID.map((rowIndices, ri) => (
              <div key={ri} className="sx-row">
                {rowIndices.map((di) => {
                  const door = DOORS[di];
                  return (
                    <DoorCard key={door.slug} door={door}
                      question={questions[door.slug]}
                      score={doorScores[door.key]} isTop={topDoor === door.key}
                      hasScores={hasScores}
                      solo={di === 0 || di === 9}
                      delay={ri * ROW_STEP_MS} />
                  );
                })}
              </div>
            ))}
          </div>
        </nav>

        {/* Expansion spacer — gives results room to breathe */}
        {searchFocused && (
          <div style={{ minHeight: "100vh", pointerEvents: "none" }} />
        )}
      </div>
    </div>
  );
}
