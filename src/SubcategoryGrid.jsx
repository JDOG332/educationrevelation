/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 Rooms inside each Door
   
   TACTILE NAVIGATION:
   • Swipe left/right → prev/next room
   • Pull down → go back up a level  
   • Tap left/right edge zones → prev/next
   • Bottom bar shows position (like worn notches on a tool handle)
   
   No menus. No labels to read. Just touch.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useCallback, useEffect } from "react";
import { PHI } from "./data.js";
import { SUBCATEGORIES, DOOR_META } from "./subcategories.js";

/* ── SWIPE ENGINE ───────────────────────────────────────────────
   Detects horizontal swipes and vertical pull-down.
   Threshold tuned for intentional gestures, not accidental scrolls.
   ─────────────────────────────────────────────────────────────── */
function useSwipe({ onSwipeLeft, onSwipeRight, onPullDown, threshold = 60 }) {
  const touchRef = useRef({ startX: 0, startY: 0, startTime: 0 });
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lockedAxis = useRef(null);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    touchRef.current = { startX: t.clientX, startY: t.clientY, startTime: Date.now() };
    lockedAxis.current = null;
    setDragging(true);
    setDragX(0);
    setDragY(0);
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - touchRef.current.startX;
    const dy = t.clientY - touchRef.current.startY;

    // Lock axis after 10px of movement
    if (!lockedAxis.current && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      lockedAxis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (lockedAxis.current === "x") {
      setDragX(dx);
      setDragY(0);
    } else if (lockedAxis.current === "y" && dy > 0) {
      // Only track downward pull
      setDragY(dy);
      setDragX(0);
    }
  }, [dragging]);

  const onTouchEnd = useCallback(() => {
    const dx = dragX;
    const dy = dragY;
    const elapsed = Date.now() - touchRef.current.startTime;
    const velocity = Math.abs(dx) / Math.max(elapsed, 1);

    // Fast flick or long drag both count
    const triggered = Math.abs(dx) > threshold || (velocity > 0.4 && Math.abs(dx) > 30);

    if (lockedAxis.current === "x" && triggered) {
      if (dx < 0 && onSwipeLeft) onSwipeLeft();
      if (dx > 0 && onSwipeRight) onSwipeRight();
    }

    if (lockedAxis.current === "y" && dy > threshold && onPullDown) {
      onPullDown();
    }

    setDragging(false);
    setDragX(0);
    setDragY(0);
    lockedAxis.current = null;
  }, [dragX, dragY, threshold, onSwipeLeft, onSwipeRight, onPullDown]);

  return { onTouchStart, onTouchMove, onTouchEnd, dragX, dragY, dragging };
}


/* ── POSITION NOTCHES ───────────────────────────────────────────
   Like worn marks carved into a wooden tool handle.
   Shows where you are among the 10 rooms. No numbers. Just feel.
   ─────────────────────────────────────────────────────────────── */
function PositionNotches({ total, current, accent }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 6,
      padding: `${Math.round(5 * PHI)}px 0`,
    }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 18 : 6,
            height: 3,
            borderRadius: 2,
            background: i === current
              ? `rgba(${accent},0.6)`
              : `rgba(${accent},0.12)`,
          }}
        />
      ))}
    </div>
  );
}


/* ── PULL INDICATOR ─────────────────────────────────────────────
   A subtle downward chevron that appears when you start pulling.
   Like a handle emerging from a surface.
   ─────────────────────────────────────────────────────────────── */
function PullIndicator({ dragY, active }) {
  const progress = Math.min(dragY / 80, 1);
  if (!active || progress < 0.05) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: Math.round(dragY * 0.6),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `rgba(201,168,76,${progress * 0.04})`,
      zIndex: 9999,
      pointerEvents: "none",
    }}>
      <div style={{
        fontSize: 18,
        color: `rgba(201,168,76,${progress * 0.5})`,
        transform: `translateY(${progress * 8}px) rotate(${progress < 1 ? 0 : 180}deg)`,
      }}>{progress >= 1 ? "◂" : "▿"}</div>
    </div>
  );
}


/* ── EDGE GLOW ──────────────────────────────────────────────────
   Thin gradient at screen edges. Peripheral vision catches it.
   Says "there's something this way" without words.
   ─────────────────────────────────────────────────────────────── */
function EdgeGlow({ side, accent, visible }) {
  if (!visible) return null;
  const isLeft = side === "left";

  return (
    <div style={{
      position: "fixed",
      top: "30%",
      bottom: "30%",
      [isLeft ? "left" : "right"]: 0,
      width: 3,
      background: `linear-gradient(${isLeft ? "0deg" : "0deg"}, transparent, rgba(${accent},0.15), transparent)`,
      zIndex: 9998,
      pointerEvents: "none",
      borderRadius: isLeft ? "0 2px 2px 0" : "2px 0 0 2px",
    }} />
  );
}


/* ── BACK TAP ZONE ──────────────────────────────────────────────
   A visible but minimal "back" touch target.
   Not a traditional button — a pressure point.
   ─────────────────────────────────────────────────────────────── */
function BackPressure({ label, onClick, accent = "201,168,76" }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: `${Math.round(4 * PHI)}px ${Math.round(5 * PHI)}px`,
        borderRadius: 8,
        background: `rgba(${accent},0.03)`,
        border: `1px solid rgba(${accent},0.08)`,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={{
        fontSize: 16,
        color: `rgba(${accent},0.4)`,
        lineHeight: 1,
      }}>◂</span>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(12px, 2.8vw, 15px)",
        letterSpacing: "0.12em",
        color: "rgba(232,232,240,0.45)",
      }}>{label}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY GRID — The 10 Rooms
   
   Swipe left/right between doors (future)
   Pull down to return to tetractys
   ═══════════════════════════════════════════════════════════════ */
export default function SubcategoryGrid({ doorKey, onSelectSub, onSelectContent, onBack }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];

  const { onTouchStart, onTouchMove, onTouchEnd, dragX, dragY, dragging } = useSwipe({
    onPullDown: () => { onBack(); window.scrollTo(0, 0); },
  });

  if (!meta || subs.length === 0) return null;

  // Visual drag feedback
  const pullProgress = dragging ? Math.min(dragY / 80, 1) : 0;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        maxWidth: 700, margin: "0 auto", width: "100%",
        padding: `${Math.round(13 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
        animation: "fadeSlideUp 0.6s ease",
        zIndex: 5000, position: "relative",
        background: "#030306", minHeight: "100vh",
        transform: pullProgress > 0 ? `translateY(${pullProgress * 20}px)` : "none",
        opacity: pullProgress > 0.5 ? 1 - (pullProgress - 0.5) : 1,
      }}
    >
      <PullIndicator dragY={dragY} active={dragging && dragY > 5} />

      {/* Back pressure point */}
      <BackPressure
        label="THE PROOF"
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
      />

      {/* Door Header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(8 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
        <div style={{
          fontSize: "clamp(44px, 10vw, 60px)",
          marginBottom: Math.round(5 * PHI),
          animation: "gentleFloat 8s ease-in-out infinite",
          lineHeight: 1,
        }}>{meta.emoji}</div>

        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(26px, 5.5vw, 36px)",
          fontWeight: 400,
          color: "#e8e8f0",
          letterSpacing: "0.25em",
          margin: 0,
        }}>{meta.name}</h2>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 3vw, 19px)",
          fontStyle: "italic",
          color: "rgba(201,168,76,0.4)",
          marginTop: Math.round(3 * PHI),
          lineHeight: PHI,
          maxWidth: 400,
          margin: `${Math.round(3 * PHI)}px auto 0`,
        }}>{meta.tagline}</div>

        <div style={{
          width: Math.round(50 * PHI), height: 1,
          margin: `${Math.round(8 * PHI)}px auto 0`,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
        }} />
      </div>

      {/* Room count */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cinzel', serif",
        fontSize: 11,
        letterSpacing: "0.4em",
        color: "rgba(232,232,240,0.2)",
        marginBottom: Math.round(8 * PHI),
      }}>10 ROOMS</div>

      {/* ═══ THE GRID ═══ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: Math.round(5 * PHI),
        marginBottom: Math.round(21 * PHI),
      }}>
        {subs.map((sub, i) => (
          <div
            key={sub.id}
            onClick={() => { onSelectSub(sub.id); window.scrollTo(0, 0); }}
            style={{
              position: "relative",
              padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px`,
              borderRadius: 10,
              background: `linear-gradient(180deg, rgba(${sub.accent},0.04), rgba(3,3,6,0.7))`,
              border: `1px solid rgba(${sub.accent},0.1)`,
              cursor: "pointer",
              overflow: "hidden",
              animation: `fadeSlideUp 0.6s ${0.08 + i * 0.06}s both ease`,
              textAlign: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
              background: `linear-gradient(90deg, transparent, rgba(${sub.accent},0.12), transparent)`,
            }} />
            <div style={{ fontSize: "clamp(24px, 5vw, 32px)", marginBottom: Math.round(2 * PHI) }}>{sub.icon}</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(10px, 2.4vw, 14px)",
              letterSpacing: "0.1em",
              color: `rgba(${sub.accent},0.7)`,
              fontWeight: 600, lineHeight: 1.3,
            }}>{sub.name}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(11px, 2.2vw, 14px)",
              color: "rgba(232,232,240,0.4)",
              fontStyle: "italic",
              marginTop: Math.round(2 * PHI), lineHeight: 1.5,
            }}>{sub.desc}</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8,
              letterSpacing: "0.2em", color: `rgba(${sub.accent},0.2)`,
              marginTop: Math.round(3 * PHI),
            }}>Ψ {sub.psi.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Door Essay link */}
      {onSelectContent && (
        <div style={{ textAlign: "center", marginBottom: Math.round(13 * PHI) }}>
          <div
            onClick={() => { onSelectContent(); window.scrollTo(0, 0); }}
            style={{
              cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 8,
              padding: `${Math.round(4 * PHI)}px ${Math.round(8 * PHI)}px`,
              fontFamily: "'Cinzel', serif", fontSize: 12,
              letterSpacing: "0.2em", color: "rgba(201,168,76,0.5)",
              WebkitTapHighlightColor: "transparent",
            }}
          >✦ DOOR ESSAY ✦</div>
        </div>
      )}

      {/* Bottom */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(13px, 2.5vw, 16px)",
        fontStyle: "italic",
        color: "rgba(201,168,76,0.2)",
        lineHeight: PHI, marginTop: Math.round(8 * PHI),
      }}>every room leads to the same center</div>

      {/* Swipe hint — only shows briefly */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(8 * PHI),
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11,
        color: "rgba(232,232,240,0.1)",
        animation: "fadeSlideUp 2s 2s both ease",
      }}>↓ pull down to return</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBCATEGORY VIEW — Inside a single Room
   
   Swipe left → next room
   Swipe right → prev room  
   Pull down → back to grid
   Edge glows show there's more
   Position notches show where you are
   ═══════════════════════════════════════════════════════════════ */
export function SubcategoryView({ doorKey, subId, onBack, onNavigate }) {
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey] || [];
  const sub = subs.find(s => s.id === subId);
  
  if (!meta || !sub) return null;

  const idx = subs.findIndex(s => s.id === subId);
  const prev = idx > 0 ? subs[idx - 1] : null;
  const next = idx < subs.length - 1 ? subs[idx + 1] : null;

  const { onTouchStart, onTouchMove, onTouchEnd, dragX, dragY, dragging } = useSwipe({
    onSwipeLeft: next && onNavigate ? () => { onNavigate(next.id); window.scrollTo(0, 0); } : null,
    onSwipeRight: prev && onNavigate
      ? () => { onNavigate(prev.id); window.scrollTo(0, 0); }
      : () => { onBack(); window.scrollTo(0, 0); },
    onPullDown: () => { onBack(); window.scrollTo(0, 0); },
  });

  // Visual drag feedback
  const pullProgress = dragging ? Math.min(dragY / 80, 1) : 0;
  const slideX = dragging && Math.abs(dragX) > 10 ? dragX * 0.3 : 0;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        maxWidth: 700, margin: "0 auto", width: "100%",
        padding: `${Math.round(13 * PHI)}px 20px ${Math.round(34 * PHI)}px`,
        animation: "fadeSlideUp 0.6s ease",
        zIndex: 5000, position: "relative",
        background: "#030306", minHeight: "100vh",
        transform: pullProgress > 0
          ? `translateY(${pullProgress * 20}px)`
          : slideX !== 0 ? `translateX(${slideX}px)` : "none",
        opacity: pullProgress > 0.5 ? 1 - (pullProgress - 0.5) : 1,
      }}
    >
      <PullIndicator dragY={dragY} active={dragging && dragY > 5} />
      <EdgeGlow side="left" accent={prev ? prev.accent : "201,168,76"} visible={!!prev} />
      <EdgeGlow side="right" accent={next ? next.accent : "201,168,76"} visible={!!next} />

      {/* Back pressure point */}
      <BackPressure
        label={meta.name}
        onClick={() => { onBack(); window.scrollTo(0, 0); }}
      />

      {/* Position notches — where am I among 10? */}
      <PositionNotches total={subs.length} current={idx} accent={sub.accent} />

      {/* Subcategory Header */}
      <div style={{
        textAlign: "center",
        marginTop: Math.round(5 * PHI),
        marginBottom: Math.round(13 * PHI),
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 10,
          letterSpacing: "0.4em", color: "rgba(201,168,76,0.25)",
          marginBottom: Math.round(5 * PHI),
        }}>{meta.emoji} {meta.name}</div>

        <div style={{
          fontSize: "clamp(44px, 10vw, 56px)",
          marginBottom: Math.round(5 * PHI),
          animation: "gentleFloat 8s ease-in-out infinite",
          lineHeight: 1,
        }}>{sub.icon}</div>

        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 400, color: "#e8e8f0",
          letterSpacing: "0.2em", margin: 0,
        }}>{sub.name}</h2>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(15px, 3vw, 19px)",
          fontStyle: "italic", color: `rgba(${sub.accent},0.5)`,
          marginTop: Math.round(3 * PHI), lineHeight: PHI,
          maxWidth: 420, margin: `${Math.round(3 * PHI)}px auto 0`,
        }}>{sub.desc}</div>

        {/* Ψ score bar */}
        <div style={{
          marginTop: Math.round(8 * PHI),
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 9,
            letterSpacing: "0.3em", color: `rgba(${sub.accent},0.3)`,
          }}>Ψ</div>
          <div style={{
            width: 100, height: 3, borderRadius: 2,
            background: `rgba(${sub.accent},0.1)`, overflow: "hidden",
          }}>
            <div style={{
              width: `${sub.psi * 100}%`, height: "100%",
              background: `rgba(${sub.accent},0.4)`, borderRadius: 2,
            }} />
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 9,
            letterSpacing: "0.2em", color: `rgba(${sub.accent},0.3)`,
          }}>{sub.psi.toFixed(3)}</div>
        </div>

        <div style={{
          width: Math.round(50 * PHI), height: 1,
          margin: `${Math.round(8 * PHI)}px auto 0`,
          background: `linear-gradient(90deg, transparent, rgba(${sub.accent},0.25), transparent)`,
        }} />
      </div>

      {/* Topic Cards — Coming Soon */}
      <div style={{
        textAlign: "center", fontFamily: "'Cinzel', serif",
        fontSize: 11, letterSpacing: "0.4em",
        color: "rgba(232,232,240,0.2)", marginBottom: Math.round(5 * PHI),
      }}>TOPIC CARDS</div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
        gap: Math.round(5 * PHI), marginBottom: Math.round(21 * PHI),
      }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{
            aspectRatio: "1 / 1",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            borderRadius: 10,
            background: `rgba(${sub.accent},0.015)`,
            border: `1px dashed rgba(${sub.accent},0.08)`,
            animation: `fadeSlideUp 0.5s ${0.3 + i * 0.05}s both ease`,
            textAlign: "center", padding: 12,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 10,
              letterSpacing: "0.2em", color: `rgba(${sub.accent},0.15)`,
            }}>{i + 1}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              fontStyle: "italic", color: "rgba(232,232,240,0.12)", marginTop: 4,
            }}>coming soon</div>
          </div>
        ))}
      </div>

      {/* ── TACTILE NAV BAR — prev/next pressure points ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: Math.round(8 * PHI),
        padding: `${Math.round(3 * PHI)}px 0`,
      }}>
        {prev ? (
          <div
            onClick={() => { if (onNavigate) { onNavigate(prev.id); window.scrollTo(0, 0); } }}
            style={{
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              padding: `${Math.round(3 * PHI)}px ${Math.round(4 * PHI)}px`,
              borderRadius: 6,
              background: `rgba(${prev.accent},0.03)`,
              border: `1px solid rgba(${prev.accent},0.08)`,
              WebkitTapHighlightColor: "transparent",
              maxWidth: "42vw",
            }}
          >
            <span style={{ fontSize: 14, color: `rgba(${prev.accent},0.35)` }}>◂</span>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(8px, 1.8vw, 11px)",
              letterSpacing: "0.08em",
              color: "rgba(232,232,240,0.3)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{prev.name}</span>
          </div>
        ) : <div />}

        {/* Center dot — "you are here" */}
        <div style={{
          width: 4, height: 4, borderRadius: 2,
          background: `rgba(${sub.accent},0.3)`,
        }} />

        {next ? (
          <div
            onClick={() => { if (onNavigate) { onNavigate(next.id); window.scrollTo(0, 0); } }}
            style={{
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              padding: `${Math.round(3 * PHI)}px ${Math.round(4 * PHI)}px`,
              borderRadius: 6,
              background: `rgba(${next.accent},0.03)`,
              border: `1px solid rgba(${next.accent},0.08)`,
              WebkitTapHighlightColor: "transparent",
              maxWidth: "42vw",
              flexDirection: "row-reverse",
            }}
          >
            <span style={{ fontSize: 14, color: `rgba(${next.accent},0.35)` }}>▸</span>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(8px, 1.8vw, 11px)",
              letterSpacing: "0.08em",
              color: "rgba(232,232,240,0.3)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{next.name}</span>
          </div>
        ) : <div />}
      </div>

      {/* Bottom notches again — bookend */}
      <PositionNotches total={subs.length} current={idx} accent={sub.accent} />

      {/* Swipe hint */}
      <div style={{
        textAlign: "center", marginTop: Math.round(5 * PHI),
        fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
        color: "rgba(232,232,240,0.08)",
        animation: "fadeSlideUp 2s 3s both ease",
      }}>◂ swipe ▸</div>

      <div style={{
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(13px, 2.5vw, 16px)",
        fontStyle: "italic", color: "rgba(201,168,76,0.2)",
        lineHeight: PHI, marginTop: Math.round(8 * PHI),
      }}>the seed eats the dirt</div>
    </div>
  );
}
