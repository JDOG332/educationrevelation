'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { classifyContent } from '@/lib/tenDoors';
import { siftSearch } from '@/lib/siftEngine';
import { KEY_TO_SLUG } from '@/lib/doorMap';

const PHI = 1.618033988749895;
const PHIi = 1 / PHI;
const EASE = "cubic-bezier(0.23,1,0.32,1)";

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

// ─── DOOR CARD (with real-time scoring) ─────────────────────────
function DoorCard({ door, score, isTop, hasScores, size, onClick }) {
  const [hover, setHover] = useState(false);
  const rgb = door.color;
  const pct = score || 0;
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
        minHeight: size === "grid" ? 100 : 90,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 6, borderRadius: 6,
        background: `rgba(${rgb},${hover ? bgOp + 0.06 : bgOp})`,
        border: `1px solid rgba(${rgb},${hover ? borOp + 0.15 : borOp})`,
        boxShadow: isTop
          ? `0 0 24px rgba(${rgb},0.22), 0 0 48px rgba(${rgb},0.07)`
          : hover ? `0 0 18px rgba(${rgb},0.15)` : "none",
        transition: `all 618ms ${EASE}`,
        cursor: "pointer",
        padding: "12px 16px",
        userSelect: "none",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 32, lineHeight: 1, opacity: emjOp }}>{door.emoji}</div>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 900,
        fontSize: "clamp(10px, 2.5vw, 14px)",
        letterSpacing: "0.04em",
        color: `rgba(${rgb},${txtOp})`,
        textAlign: "center", lineHeight: 1.1, whiteSpace: "nowrap",
      }}>{door.name}</div>
      {hasScores && pct > 0 && (
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: "clamp(8px, 1.2vmin, 11px)",
          color: `rgba(${rgb},${Math.max(0.3, pct/100)})`,
        }}>{Math.round(pct)}%</div>
      )}
    </div>
  );
}

// ─── CARD RESULT ────────────────────────────────────────────────
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
        transition: `all 382ms ${EASE}`,
        animation: `fadeUp 618ms ${100 + index * 100}ms both ease`,
        display: "flex", flexDirection: "column", gap: "0.382rem",
        boxShadow: hover ? `0 0 18px rgba(${rgb},0.15), 0 0 40px rgba(${rgb},0.06)` : "none",
      }}
    >
      <span style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 900,
        fontSize: "clamp(15px, 1.618vmin, 22px)",
        color: `rgba(${rgb},1.0)`,
        lineHeight: 1.1, letterSpacing: "-0.0382em",
      }}>
        {result.doorEmoji} {result.doorName}
        {result.subName && (
          <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: "clamp(15px, 1.618vmin, 22px)",
            color: "rgba(232,228,210,0.618)",
            marginLeft: "0.618rem",
          }}>{result.subName}</span>
        )}
      </span>
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 400,
        fontSize: "clamp(18px, 2.618vmin, 28px)",
        color: `rgba(232,228,210,${hover ? 1.0 : 0.618})`,
        transition: `color 382ms ${EASE}`, lineHeight: 1.618,
      }}>{result.card?.title || "Untitled"}</span>
      {result.card?.simple && (
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: "clamp(15px, 1.618vmin, 22px)",
          color: "rgba(232,228,210,0.618)", lineHeight: 1.618,
        }}>{result.card.simple}</span>
      )}
    </div>
  );
}

// ─── MIRROR RESULT ──────────────────────────────────────────────
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
        transition: `all 618ms ${EASE}`,
        animation: `fadeUp 618ms ${100 + index * 100}ms both ease`,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", gap: "0.618rem",
        position: "relative", overflow: "hidden",
      }}
    >
      <span style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 900,
        fontSize: "clamp(11px, 1vmin, 16px)",
        letterSpacing: "0.236em",
        color: "rgba(201,168,76,0.236)",
      }}>✦ LAYER {depth} ✦</span>
      {truth && (
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: `rgba(232,228,210,${hover ? 1.0 : 0.618})`,
          lineHeight: 1.618, maxWidth: "36rem",
        }}>"{truth}"</div>
      )}
      <div style={{
        width: "4.236rem", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.236), transparent)",
      }} />
      {dare && (
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 400,
          fontSize: "clamp(15px, 1.618vmin, 22px)",
          color: `rgba(201,168,76,${hover ? 0.618 : 0.236})`,
          maxWidth: "30rem", lineHeight: 1.618,
        }}>{dare}</div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SEARCH PAGE
// ═══════════════════════════════════════════════════════════════
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
    <div style={{
      minHeight: "100vh",
      position: "relative",
      background: "radial-gradient(ellipse at 50% 23.6%, rgba(14,10,28,0.618) 0%, #03030a 61.8%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem",
      paddingBottom: "6.854rem",
      overflowX: "hidden",
    }}>

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "61.8vw", height: "38.2vh",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 61.8%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Frosted header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
        height: "clamp(56px, 8vh, 72px)",
        background: "linear-gradient(180deg, rgba(3,3,10,0.92) 0%, rgba(3,3,10,0.6) 70%, transparent 100%)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center",
        paddingLeft: "1.618rem",
        pointerEvents: "none",
      }}>
        <Link href="/" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(18px, 2.618vmin, 28px)",
            color: "rgba(201,168,76,0.618)",
            letterSpacing: "-0.0382em", cursor: "pointer",
          }}>← BACK</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "40rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(72px, 11vh, 110px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(22px, 4.236vmin, 36px)",
          letterSpacing: "0.236em",
          color: "rgba(201,168,76,0.618)",
          textAlign: "center",
          animation: "fadeUp 1s 100ms both ease",
          marginBottom: "0.618rem",
          textShadow: "0 0 8px rgba(201,168,76,0.382), 0 0 24px rgba(201,168,76,0.146)",
          lineHeight: 1.1,
        }}>SEARCH & EXPLORE</h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: "rgba(232,228,210,0.618)",
          textAlign: "center",
          animation: "fadeUp 1s 236ms both ease",
          marginBottom: "1.618rem",
          lineHeight: 1.618,
        }}>Click to explore or type your search below.</p>

        {/* Nav links */}
        <div style={{
          display: "flex", gap: "0.618rem", marginBottom: "1.618rem",
          animation: "fadeUp 618ms 300ms both ease",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <Link href="/poems">
            <button style={{
              background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.236)",
              borderRadius: "0.382rem", padding: "0.618rem 2.618rem",
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: "clamp(15px, 1.618vmin, 22px)", letterSpacing: "0.146em",
              color: "rgba(201,168,76,0.618)", cursor: "pointer",
            }}>✦ POEMS</button>
          </Link>
          <Link href="/mathematics">
            <button style={{
              background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.236)",
              borderRadius: "0.382rem", padding: "0.618rem 2.618rem",
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: "clamp(15px, 1.618vmin, 22px)", letterSpacing: "0.146em",
              color: "rgba(201,168,76,0.618)", cursor: "pointer",
            }}>✦ MATHEMATICS</button>
          </Link>
        </div>

        {/* Ten Doors — Pyramid / Grid */}
        <div style={{ marginBottom: "1.618rem", width: "100%" }}>
          {isMobile ? (
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 12, width: "100%", padding: "0",
              animation: "fadeUp 1s 382ms both ease",
            }}>
              {DOORS.map((door) => (
                <DoorCard key={door.slug} door={door}
                  score={doorScores[door.key]} isTop={topDoor === door.key}
                  hasScores={hasScores} size="grid"
                  onClick={() => handleDoorClick(door)} />
              ))}
            </div>
          ) : (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 10, width: "100%",
              animation: "fadeUp 1s 382ms both ease",
            }}>
              {PYRAMID.map((rowIndices, ri) => (
                <div key={ri} style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  {rowIndices.map((di) => {
                    const door = DOORS[di];
                    return (
                      <div key={door.slug} style={{ width: 150, height: 100 }}>
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

        {/* Search input */}
        <div id="search-anchor" style={{ width: "100%", animation: "fadeUp 618ms 618ms both ease", marginBottom: "1.618rem" }}>
          <input ref={inputRef} value={query} onChange={handleInput}
            placeholder="What are you searching for?"
            spellCheck={false}
            style={{
              width: "100%",
              background: "rgba(232,228,210,0.03)",
              border: `1px solid rgba(201,168,76,${query ? 0.382 : 0.236})`,
              borderRadius: "0.382rem",
              padding: "1rem 1.618rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              fontSize: "clamp(18px, 2.618vmin, 28px)",
              color: "rgba(232,228,210,1.0)",
              outline: "none",
              transition: `all 618ms ${EASE}`,
              lineHeight: 1.618,
              boxShadow: query ? "0 0 24px rgba(201,168,76,0.08), inset 0 0 12px rgba(201,168,76,0.02)" : "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(201,168,76,0.618)";
              setSearchFocused(true);
              setTimeout(() => {
                const el = document.getElementById("search-anchor");
                if (el) {
                  const vh = window.innerHeight;
                  const top = el.getBoundingClientRect().top + window.scrollY - (vh * 0.20);
                  window.scrollTo({ top, behavior: "instant" });
                }
              }, 50);
            }}
            onBlur={(e) => e.target.style.borderColor = "rgba(201,168,76,0.236)"}
          />
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.618rem", marginBottom: "2.618rem" }}>
            <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.236), transparent)", marginBottom: "0.382rem" }} />
            {results.map((r, i) => (
              r.type === "mirror"
                ? <MirrorResult key={`mirror-${i}`} result={r} index={i}
                    onClick={r.navDoorKey ? () => handleResultClick(r) : undefined} />
                : <CardResult key={`card-${i}`} result={r} index={i}
                    onClick={() => handleResultClick(r)} />
            ))}
          </div>
        )}

        {/* Expansion spacer */}
        {searchFocused && (
          <div style={{ minHeight: "100vh", pointerEvents: "none" }} />
        )}
      </div>
    </div>
  );
}
