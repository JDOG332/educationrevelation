'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { classifyContent } from '@/lib/tenDoors';
import { siftSearch, getRandomCardPath } from '@/lib/siftEngine';
import { KEY_TO_SLUG } from '@/lib/doorMap';

const PHI  = 1.618033988749895;
const PHIi = 1 / PHI;

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

const PYRAMID = [[0], [1, 2], [3, 4, 5], [6, 7, 8, 9]];

const SLUG_MAP = {};
DOORS.forEach(d => { SLUG_MAP[d.key] = d.slug; });

/* ─── LIVING PULSE — curated titles that rotate ────────────────── */
const PULSE_CARDS = [
  { title: "The Golden Repair (Kintsugi)",   path: "/love/grief/golden-repair-kintsugi" },
  { title: "The Observer Effect",            path: "/consciousness/perception/observer-effect" },
  { title: "The Golden Ratio (φ)",           path: "/mathematics/number/golden-ratio" },
  { title: "The Hero's Journey",             path: "/art/story/heros-journey" },
  { title: "Quantum Entanglement",           path: "/mysticism/oneness/quantum-entanglement-unity" },
  { title: "Sacred Geometry",                path: "/mysticism/geometry/golden-ratio-sacred" },
  { title: "Ego Dissolution",                path: "/mysticism/oneness/ego-dissolution" },
  { title: "The Fibonacci Sequence",         path: "/mathematics/patterns/fibonacci-sequence" },
  { title: "Lucid Dreaming",                 path: "/consciousness/dreamsleep/lucid-dreaming" },
  { title: "The Problem of Evil",            path: "/religion/goodevil/problem-of-evil" },
  { title: "The Butterfly Effect",           path: "/philosophy/freewill/butterfly-effect" },
  { title: "Free Will",                      path: "/religion/goodevil/free-will" },
  { title: "Neuroplasticity",                path: "/science/medicine/neuroplasticity" },
  { title: "The Big Bang Theory",            path: "/science/cosmos/big-bang" },
  { title: "Photosynthesis",                 path: "/mysticism/lifeforce/photosynthesis-drinking-light" },
  { title: "The Flow State",                 path: "/consciousness/observer/flow-state-observer" },
  { title: "Non-Duality",                    path: "/consciousness/observer/nonduality-observer" },
  { title: "Katabasis: The Heroic Descent",  path: "/mythology/underworld/katabasis" },
  { title: "The Hero's Return",              path: "/mythology/underworld/heros-return" },
  { title: "Libertarian Free Will",          path: "/consciousness/choice/libertarian-free-will" },
];

function LivingPulse({ onNavigate }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * PULSE_CARDS.length));
  const [visible, setVisible] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const CYCLE = 4236; // φ³ × 1000ms
    const FADE = 382;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % PULSE_CARDS.length);
        setVisible(true);
      }, FADE);
    }, CYCLE);

    return () => clearInterval(interval);
  }, []);

  const card = PULSE_CARDS[index];

  return (
    <div
      onClick={() => onNavigate(card.path)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "center",
        cursor: "pointer",
        padding: "0.236rem 0",
      }}
    >
      <span style={{
        fontFamily: "var(--font-accent)",
        fontStyle: "italic",
        fontSize: "clamp(0.938rem, 2vmin + 0.12rem, 1.25rem)",
        color: `rgba(201,168,76,${hover ? 0.75 : 0.35})`,
        transition: `color 382ms var(--ease-snap), opacity 382ms var(--ease-snap)`,
        opacity: visible ? 1 : 0,
        letterSpacing: "0.02em",
      }}>Someone is reading about... <em style={{
        fontStyle: "normal",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(0.938rem, 2vmin + 0.12rem, 1.25rem)",
        color: `rgba(201,168,76,${hover ? 0.90 : 0.50})`,
        letterSpacing: "0.04em",
        transition: "color 382ms var(--ease-snap)",
      }}>{card.title}</em></span>
    </div>
  );
}


/* ─── DOOR CARD (with real-time scoring) ──────────────────────── */
function DoorCard({ door, score, isTop, hasScores, size, onClick }) {
  const [hover, setHover] = useState(false);
  const rgb = door.color;
  const pct = score || 0;

  // Dynamic scoring opacity — sacred, don't change this math
  const bgOp  = hasScores ? Math.max(0.08, pct / 100 * 0.9) : 0.12;
  const borOp = hasScores ? Math.max(0.22, pct / 100 * 0.6) : 0.30;
  const txtOp = hasScores ? Math.max(0.70, Math.min(1.0, pct / 100 * 1.4)) : 0.90;
  const emjOp = hasScores ? Math.max(0.75, Math.min(1.0, pct / 60)) : 0.95;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size === "grid" ? "100%" : undefined,
        aspectRatio: size === "grid" ? undefined : `${PHI} / 1`,
        minWidth: size === "fixed" ? "9.416rem" : undefined,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "0.382rem",
        borderRadius: "0.382rem",
        background: `rgba(${rgb},${hover ? bgOp + 0.06 : bgOp})`,
        border: `1px solid rgba(${rgb},${hover ? borOp + 0.15 : borOp})`,
        boxShadow: isTop
          ? `0 0 1.5rem rgba(${rgb},0.22), 0 0 3rem rgba(${rgb},0.07)`
          : hover ? `0 0 1.125rem rgba(${rgb},0.15)` : "none",
        transition: "all 618ms var(--ease-snap)",
        cursor: "pointer",
        padding: "0.618rem 1rem",
        userSelect: "none",
        position: "relative",
      }}
    >
      <div style={{
        fontSize: "2.618rem",
        lineHeight: 1,
        opacity: emjOp,
      }}>{door.emoji}</div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(0.618rem, 2.5vw + 0.1rem, 0.875rem)",
        letterSpacing: "0.04em",
        color: `rgba(${rgb},${txtOp})`,
        textAlign: "center",
        lineHeight: 1.1,
        whiteSpace: "nowrap",
      }}>{door.name}</div>
      {hasScores && pct > 0 && (
        <div style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(0.5rem, 1.2vmin + 0.1rem, 0.688rem)",
          color: `rgba(${rgb},${Math.max(0.3, pct / 100)})`,
        }}>{Math.round(pct)}%</div>
      )}
    </div>
  );
}


/* ─── CARD RESULT ─────────────────────────────────────────────── */
function CardResult({ result, index, onClick }) {
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
        transition: "all 382ms var(--ease-snap)",
        animation: `fadeUp 618ms ${100 + index * 100}ms both ease`,
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
            color: "rgba(232,228,210,0.618)",
            marginLeft: "0.618rem",
          }}>{result.subName}</span>
        )}
      </span>
      <span style={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
        color: `rgba(232,228,210,${hover ? 1.0 : 0.618})`,
        transition: "color 382ms var(--ease-snap)",
        lineHeight: 1.618,
      }}>{result.card?.title || "Untitled"}</span>
      {result.card?.simple && (
        <span style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "clamp(0.938rem, 1.618vmin + 0.25rem, 1.375rem)",
          color: "rgba(232,228,210,0.618)",
          lineHeight: 1.618,
        }}>{result.card.simple}</span>
      )}
    </div>
  );
}


/* ─── MIRROR RESULT ───────────────────────────────────────────── */
function MirrorResult({ result, index, onClick }) {
  const [hover, setHover] = useState(false);
  const truth = result.node?.truth || "";
  const dare = result.node?.dare || "";
  const depth = result.node?.depth || 0;

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: "1.618rem 2.618rem",
        background: hover
          ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%)"
          : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 100%)",
        border: `1px solid rgba(201,168,76,${hover ? 0.618 : 0.236})`,
        borderRadius: "0.382rem",
        cursor: onClick ? "pointer" : "default",
        transition: "all 618ms var(--ease-snap)",
        animation: `fadeUp 618ms ${100 + index * 100}ms both ease`,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", gap: "0.618rem",
        position: "relative", overflow: "hidden",
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(0.688rem, 1vmin + 0.15rem, 1rem)",
        letterSpacing: "0.236em",
        color: "rgba(201,168,76,0.236)",
      }}>✦ LAYER {depth} ✦</span>
      {truth && (
        <div style={{
          fontFamily: "var(--font-accent)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
          color: `rgba(232,228,210,${hover ? 1.0 : 0.618})`,
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
          color: `rgba(201,168,76,${hover ? 0.618 : 0.236})`,
          maxWidth: "30rem",
          lineHeight: 1.618,
        }}>{dare}</div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SEARCH PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function SearchClient() {
  const W = typeof window !== "undefined" ? window.innerWidth : 800;
  const isMobile = W < 520;
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [doorScores, setDoorScores] = useState({});
  const [topDoor, setTopDoor] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const hasScores = Object.keys(doorScores).length > 0;

  const runSearch = useCallback((q) => {
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
    setResults(siftSearch(q));
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

  const handleDoorClick = (door) => {
    router.push(`/${door.slug}`);
  };

  return (
    <div className="phi-page bg-glow-center" style={{
      position: "relative",
      paddingBottom: "6.854rem",
      overflowX: "hidden",
    }}>

      {/* Ambient glow — φ-proportioned */}
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "61.8vw", height: "38.2vh",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 61.8%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Frosted header */}
      <div className="frosted-header">
        <Link href="/" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span className="back-link">← BACK</span>
        </Link>
      </div>

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
          color: "rgba(201,168,76,0.618)",
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
          color: "rgba(232,228,210,0.618)",
          textAlign: "center",
          animationDelay: "236ms",
          marginBottom: "1.618rem",
          lineHeight: 1.618,
        }}>Search anything or pick a door.</p>

        {/* Nav links — special pages outside the 10-door system */}
        <div className="stagger-fade" style={{
          display: "flex", gap: "0.618rem", marginBottom: "1.618rem",
          animationDelay: "300ms",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <Link href="/poems">
            <button className="btn-ghost" style={{ letterSpacing: "0.146em" }}>
              ✦ POEMS
            </button>
          </Link>
          <Link href="/math">
            <button className="btn-ghost" style={{ letterSpacing: "0.146em" }}>
              ✦ MATH
            </button>
          </Link>
          <Link href="/promises">
            <button className="btn-ghost" style={{
              letterSpacing: "0.146em",
              borderColor: "rgba(220,160,160,0.236)",
              color: "rgba(220,160,160,0.618)",
              background: "rgba(220,160,160,0.04)",
            }}>
              ✦ PROMISES
            </button>
          </Link>
        </div>

        {/* Search input — ABOVE doors so it's always visible */}
        <div id="search-anchor" className="stagger-fade" style={{
          width: "100%", animationDelay: "350ms", marginBottom: "1.618rem",
        }}>
          <input ref={inputRef} value={query} onChange={handleInput}
            placeholder="What are you searching for?"
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
            }}
            onBlur={(e) => e.target.style.borderColor = "rgba(201,168,76,0.236)"}
          />
        </div>

        {/* Living Pulse + Discover — below search bar when not searching */}
        {results.length === 0 && (
          <div className="stagger-fade" style={{
            textAlign: "center",
            marginTop: "-0.618rem",
            marginBottom: "1.618rem",
            animationDelay: "450ms",
            display: "flex", flexDirection: "column", gap: "0.382rem",
          }}>
            <LivingPulse onNavigate={(path) => router.push(path)} />
            <span
              onClick={() => {
                const c = getRandomCardPath();
                if (c) router.push(`/${c.doorSlug}/${c.subId}/${c.cardId}`);
              }}
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "clamp(0.875rem, 1.8vmin + 0.1rem, 1.125rem)",
                color: "rgba(201,168,76,0.25)",
                cursor: "pointer",
                transition: "color 382ms var(--ease-snap)",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(201,168,76,0.618)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(201,168,76,0.25)"}
            >✦ or discover something unexpected</span>
          </div>
        )}

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
                ? <MirrorResult key={`mirror-${i}`} result={r} index={i}
                    onClick={r.navDoorKey ? () => handleResultClick(r) : undefined} />
                : <CardResult key={`card-${i}`} result={r} index={i}
                    onClick={() => handleResultClick(r)} />
            ))}
          </div>
        )}

        {/* Ten Doors — Pyramid (desktop) / Grid (mobile) */}
        <div style={{ marginBottom: "1.618rem", width: "100%" }}>
          {isMobile ? (
            /* ── Mobile: 2-column grid, staggered pairs ── */
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "0.618rem", width: "100%",
            }}>
              {DOORS.map((door, di) => (
                <div key={door.slug} className="stagger-fade" style={{
                  animationDelay: `${382 + Math.floor(di / 2) * 162}ms`,
                }}>
                  <DoorCard door={door}
                    score={doorScores[door.key]} isTop={topDoor === door.key}
                    hasScores={hasScores} size="grid"
                    onClick={() => handleDoorClick(door)} />
                </div>
              ))}
            </div>
          ) : (
            /* ── Desktop: Sacred Pyramid 1-2-3-4, rows build sequentially ── */
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.618rem", width: "100%",
            }}>
              {PYRAMID.map((rowIndices, ri) => (
                <div key={ri} className="stagger-fade" style={{
                  display: "flex", gap: "0.618rem", justifyContent: "center",
                  animationDelay: `${382 + ri * 236}ms`,
                }}>
                  {rowIndices.map((di) => {
                    const door = DOORS[di];
                    return (
                      <div key={door.slug} style={{ width: "9.416rem" }}>
                        <DoorCard door={door}
                          score={doorScores[door.key]} isTop={topDoor === door.key}
                          hasScores={hasScores} size="fixed"
                          onClick={() => handleDoorClick(door)} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expansion spacer — gives results room to breathe */}
        {searchFocused && (
          <div style={{ minHeight: "100vh", pointerEvents: "none" }} />
        )}
      </div>
    </div>
  );
}
