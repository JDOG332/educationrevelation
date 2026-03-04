import { useState, useEffect, useRef } from "react";
import { PHI, PHI_INV } from "../data.js";

export function GrainOverlay() {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
  return (
    <>
      {/* SVG noise — skip on mobile (feTurbulence is expensive to composite) */}
      {!isMobile && <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 998, mixBlendMode: "overlay", opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "128px",
      }} />}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.022,
        background: "linear-gradient(170deg, rgba(123,104,238,0.3) 0%, transparent 30%, rgba(201,168,76,0.25) 50%, transparent 70%, rgba(79,195,247,0.2) 100%)",
        animation: "auroraShift 30s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.012,
        background: "linear-gradient(210deg, rgba(206,147,216,0.2) 0%, transparent 35%, rgba(201,168,76,0.15) 60%, transparent 80%, rgba(123,104,238,0.15) 100%)",
        animation: "auroraShift 45s ease-in-out infinite alternate-reverse",
      }} />
    </>
  );
}

export function DepthIndicator({ depth, onNavigate, depthNames, userPath }) {
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
  const showLabel = (i) => isMobile ? expanded : hovered === i;

  // Nav entries: no THE DREAM, two poem entries both map to depth 2
  // Index 0→depth 0, 1→2(ask), 2→2(explore), 3→3, 4→4, ...
  const navToDepth = (navIndex) => {
    if (navIndex === 0) return 0;
    if (navIndex <= 2) return 2;
    return navIndex;
  };
  const navToPath = (navIndex) => {
    if (navIndex === 1) return "ask";
    if (navIndex === 2) return "explore";
    return null;
  };
  const isCurrent = (navIndex) => {
    const d = navToDepth(navIndex);
    if (d !== depth) return false;
    if (navIndex === 1) return depth === 2 && userPath === "ask";
    if (navIndex === 2) return depth === 2 && userPath === "explore";
    return true;
  };
  const isPast = (navIndex) => {
    const d = navToDepth(navIndex);
    return d < depth;
  };

  const totalEntries = depthNames.length;

  return (
    <div style={{
      position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)",
      zIndex: 10100, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0,
    }}>
      {Array.from({ length: totalEntries }, (_, i) => {
        const current = isCurrent(i);
        const show = showLabel(i);
        const past = isPast(i);
        return (
          <div key={i}
            onClick={onNavigate ? (e) => {
              e.stopPropagation();
              if (isMobile && !expanded) {
                setExpanded(true);
              } else {
                onNavigate(navToDepth(i), navToPath(i));
                setExpanded(false);
              }
            } : undefined}
            onMouseEnter={isMobile ? undefined : () => setHovered(i)}
            onMouseLeave={isMobile ? undefined : () => setHovered(null)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "flex-end",
              height: Math.round(22 * PHI), minWidth: 44, gap: Math.round(8 * PHI),
              cursor: onNavigate ? "pointer" : "default",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* Label — slides in on hover / expand */}
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: Math.round(5 * PHI), letterSpacing: 3,
              color: current
                ? "rgba(201,168,76,0.95)"
                : past
                  ? "rgba(201,168,76,0.65)"
                  : "rgba(232,232,240,0.55)",
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(6px)",
              transition: `all 0.4s cubic-bezier(0.23,1,0.32,1) ${expanded ? i * 30 : 0}ms`,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              textShadow: current ? "0 0 12px rgba(201,168,76,0.4)" : "none",
            }}>
              {depthNames[i]}
            </div>
            {/* Dot */}
            <div style={{
              width: current ? Math.round(6 * PHI) : show ? 8 : Math.round(3 * PHI),
              height: current ? Math.round(6 * PHI) : show ? 8 : Math.round(3 * PHI),
              borderRadius: "50%",
              flexShrink: 0,
              background: current
                ? "rgba(201,168,76,0.9)"
                : show
                  ? "rgba(201,168,76,0.7)"
                  : past
                    ? "rgba(201,168,76,0.35)"
                    : "rgba(255,255,255,0.15)",
              transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
              boxShadow: current
                ? "0 0 12px rgba(201,168,76,0.6), 0 0 24px rgba(201,168,76,0.15)"
                : show
                  ? "0 0 10px rgba(201,168,76,0.35)"
                  : "none",
              animation: current ? "breathe 6s ease-in-out infinite" : "none",
            }} />
          </div>
        );
      })}
      {/* Tap-away to collapse on mobile */}
      {isMobile && expanded && (
        <div onClick={(e) => { e.stopPropagation(); setExpanded(false); }} style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: -1,
        }} />
      )}
    </div>
  );
}

export function Particle({ delay, size, x, speed }) {
  const isGolden = Math.random() > 0.82;
  const hue = isGolden ? "rgba(201,168,76,0.12)" : Math.random() > 0.6 ? "rgba(201,168,76,0.06)" : "rgba(232,232,240,0.06)";
  const coreColor = isGolden ? "rgba(255,235,180,0.3)" : "rgba(232,232,240,0.2)";
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${coreColor}, ${hue})`,
      left: `${x}%`, bottom: "-10px",
      animation: `floatUp ${speed}s ${delay}s ease-in infinite`,
      pointerEvents: "none",
      boxShadow: isGolden ? `0 0 ${size * 4}px rgba(201,168,76,0.06)` : "none",
      willChange: "transform, opacity",
    }} />
  );
}

export function PulseRing({ delay, size }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      border: "1px solid rgba(232,232,240,0.06)",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      animation: `pulseExpand 8s ${delay}s ease-out infinite`,
      pointerEvents: "none",
    }} />
  );
}

export function SenseIcon({ type }) {
  const icons = { see: "👁️", hear: "👂", feel: "✋", smell: "👃", taste: "👅" };
  return <span style={{ fontSize: 16 }}>{icons[type]}</span>;
}

export function GlassCard({ children, style, onClick, className = "", hoverGlow = false }) {
  const [hover, setHover] = useState(false);
  // Detect mobile once at mount — lighter blur saves GPU
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
  const blurVal = isMobile ? "blur(8px)" : "blur(16px) saturate(1.2)";
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 14,
        background: "rgba(255,255,255,0.02)",
        backdropFilter: blurVal,
        WebkitBackdropFilter: blurVal,
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
        position: "relative", overflow: "hidden",
        transform: hover && onClick ? "translateY(-3px) scale(1.01)" : "translateY(0)",
        borderColor: hover && onClick ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
        boxShadow: hover && hoverGlow
          ? "0 8px 40px rgba(201,168,76,0.12), 0 0 0 0.5px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(201,168,76,0.04), rgba(255,255,255,0.06), transparent)",
        pointerEvents: "none",
      }} />
      {onClick && (
        <div style={{
          position: "absolute", top: 0, left: hover ? "100%" : "-100%",
          width: "100%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          transition: "left 0.8s ease",
          pointerEvents: "none",
        }} />
      )}
      {children}
    </div>
  );
}

export function DeeperButton({ onClick, label }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer", display: "block", margin: `${40}px auto 0`,
        padding: `${14}px ${Math.round(14 * PHI)}px`, borderRadius: 30,
        border: "1px solid rgba(201,168,76,0.2)",
        background: "linear-gradient(180deg, rgba(201,168,76,0.06), rgba(201,168,76,0.01))",
        color: "#c9a84c", fontFamily: "'Cinzel', serif", fontSize: 13,
        letterSpacing: 4, textTransform: "uppercase",
        boxShadow: hover
          ? "0 8px 36px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.1)"
          : "0 4px 24px rgba(201,168,76,0.08)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        borderColor: hover ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.2)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
    >{label || "⬇ GO DEEPER"}</button>
  );
}

export function ReturnButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer", display: "block", margin: "16px auto 40px",
        padding: "10px 24px", borderRadius: 20,
        border: "none", background: "none",
        color: hover ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)",
        fontFamily: "'Cinzel', serif",
        fontSize: 10, letterSpacing: 4, transition: "all 0.4s",
      }}
    >🔁 RETURN TO THE VOID</button>
  );
}

export function LayerCard({ layer, index, onClick, style: extraStyle }) {
  return (
    <GlassCard
      onClick={onClick}
      hoverGlow
      style={{
        background: `linear-gradient(145deg, ${layer.color}ee, #0a0a18cc)`,
        padding: `${14}px ${Math.round(14 * PHI_INV) + 4}px`,
        boxShadow: `0 6px 30px ${layer.accent}18, 0 2px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0.5px ${layer.accent}08`,
        animation: `fadeSlideUp 0.6s ${0.05 + index * 0.07}s both ease`,
        ...extraStyle,
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        justifyContent: extraStyle?.textAlign === "center" ? "center" : "flex-start",
      }}>
        <span style={{
          fontSize: extraStyle?.textAlign === "center" ? 24 : 22,
          filter: `drop-shadow(0 0 12px ${layer.accent}50)`,
        }}>{layer.glyph}</span>
        <div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
            color: layer.accent, fontWeight: 600,
          }}>
            {layer.isMoon ? "V" : String.fromCharCode(8544 + index)} · {layer.names[0]}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
            color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 3,
          }}>{layer.subtitle}</div>
        </div>
      </div>
    </GlassCard>
  );
}

export function StringVibration() {
  const phaseRef = useRef(0);
  const fundamentalRef = useRef(null);
  const harmonicRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    let lastTime = 0;
    function tick(now) {
      if (lastTime) phaseRef.current += (now - lastTime) * 0.0008; // ~same speed as old 50ms/0.04
      lastTime = now;
      const phase = phaseRef.current;

      const fund = Array.from({ length: 80 }, (_, i) => {
        const x = (i / 79) * 300;
        const y = 30 + Math.sin(i * 0.25 + phase) * 16 * Math.sin(i * Math.PI / 79);
        return `${x},${y}`;
      }).join(" ");

      const harm = Array.from({ length: 80 }, (_, i) => {
        const x = (i / 79) * 300;
        const y = 30 + Math.sin(i * 0.5 + phase * PHI) * 6 * Math.sin(i * Math.PI / 79);
        return `${x},${y}`;
      }).join(" ");

      if (harmonicRef.current) harmonicRef.current.setAttribute("points", harm);
      if (fundamentalRef.current) fundamentalRef.current.setAttribute("points", fund);

      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);

  return (
    <svg viewBox="0 0 300 60" width="100%" height="50" style={{ display: "block", margin: "12px 0", opacity: 0.8 }}>
      <defs>
        <linearGradient id="stringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(201,168,76,0)" />
          <stop offset="20%" stopColor="rgba(201,168,76,0.5)" />
          <stop offset="50%" stopColor="rgba(232,232,240,0.6)" />
          <stop offset="80%" stopColor="rgba(201,168,76,0.5)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0)" />
        </linearGradient>
        <linearGradient id="stringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(232,232,240,0)" />
          <stop offset="30%" stopColor="rgba(232,232,240,0.15)" />
          <stop offset="50%" stopColor="rgba(201,168,76,0.2)" />
          <stop offset="70%" stopColor="rgba(232,232,240,0.15)" />
          <stop offset="100%" stopColor="rgba(232,232,240,0)" />
        </linearGradient>
        <filter id="stringBloom">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>
      <polyline ref={harmonicRef} points="0,30 300,30" fill="none" stroke="url(#stringGrad2)" strokeWidth="0.6" opacity="0.5" />
      <polyline ref={fundamentalRef} points="0,30 300,30" fill="none" stroke="url(#stringGrad)" strokeWidth="1.2" filter="url(#stringBloom)" />
    </svg>
  );
}

export function TheEquation({ size = "md", showMeaning = false, showLabel = true, breathing = true, minimal = false, className = "" }) {
  const sizes = {
    sm: { eq: "clamp(16px, 3vw, 20px)", label: 7, meaning: 12, pad: "14px 20px", glow: 20 },
    md: { eq: "clamp(20px, 4vw, 28px)", label: 8, meaning: 14, pad: "22px 32px", glow: 30 },
    lg: { eq: "clamp(26px, 5.5vw, 38px)", label: 9, meaning: 16, pad: "30px 40px", glow: 50 },
    hero: { eq: "clamp(32px, 7vw, 52px)", label: 10, meaning: 17, pad: "36px 48px", glow: 70 },
  };
  const s = sizes[size] || sizes.md;
  const isMobileEq = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
  return (
    <div className={className} style={{ textAlign: "center", position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: s.glow * 6, height: s.glow * (minimal ? 3 : 4),
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, rgba(201,168,76,${minimal ? 0.04 : 0.06}) 0%, rgba(201,168,76,0.02) 35%, transparent 65%)`,
        borderRadius: "50%", pointerEvents: "none",
        animation: breathing ? "breathe 8s ease-in-out infinite" : "none",
      }} />
      <div style={{
        position: "relative", display: "inline-block", padding: s.pad, borderRadius: 16,
        background: minimal
          ? "linear-gradient(180deg, rgba(201,168,76,0.07), rgba(8,8,24,0.65))"
          : "linear-gradient(180deg, rgba(201,168,76,0.04), rgba(201,168,76,0.015), rgba(8,8,24,0.3))",
        border: `1px solid rgba(201,168,76,${minimal ? 0.18 : 0.12})`,
        boxShadow: `0 8px ${s.glow}px rgba(201,168,76,0.06), 0 0 ${s.glow * 2}px rgba(201,168,76,0.02), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(201,168,76,0.04)`,
        backdropFilter: isMobileEq ? "blur(8px)" : "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: isMobileEq ? "blur(8px)" : "blur(20px) saturate(1.3)",
        animation: breathing ? "equationPulse 10s ease-in-out infinite" : "none",
      }}>
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(232,232,240,0.15), rgba(201,168,76,0.2), transparent)",
          pointerEvents: "none",
        }} />
        {showLabel && !minimal && (
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: s.label, letterSpacing: 6,
            color: "rgba(201,168,76,0.3)", marginBottom: size === "hero" ? 16 : 10,
            textTransform: "uppercase",
          }}>THE EQUATION</div>
        )}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: s.eq, fontWeight: 300,
          letterSpacing: size === "hero" ? 4 : 2, lineHeight: 1.4,
          color: "rgba(232,232,240,0.8)",
          textShadow: `0 0 ${s.glow}px rgba(201,168,76,0.2), 0 0 ${s.glow * 2}px rgba(201,168,76,0.08), 0 2px 8px rgba(0,0,0,0.3)`,
          position: "relative",
        }}>
          <span style={{ fontStyle: "italic", color: "rgba(232,232,240,0.95)" }}>Ψ</span>
          <span style={{ color: "rgba(232,232,240,0.5)", margin: "0 0.3em", fontSize: "0.85em" }}>=</span>
          <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.85)" }}>R</span>
          <sub style={{ fontSize: "0.55em", color: "rgba(201,168,76,0.65)", fontStyle: "normal" }}>12</sub>
          <span style={{ color: "rgba(232,232,240,0.45)", margin: "0 0.25em", fontSize: "0.8em" }}>×</span>
          <span style={{ color: "rgba(232,232,240,0.55)", fontSize: "0.85em" }}>(</span>
          <span style={{ fontStyle: "italic", color: "rgba(79,195,247,0.85)" }}>C</span>
          <sub style={{ fontSize: "0.5em", color: "rgba(79,195,247,0.6)", fontStyle: "normal" }}>eff</sub>
          <span style={{ color: "rgba(232,232,240,0.4)", margin: "0 0.15em" }}>·</span>
          <span style={{ fontStyle: "italic", color: "rgba(206,147,216,0.85)" }}>D̂</span>
          <span style={{ color: "rgba(232,232,240,0.55)", fontSize: "0.85em" }}>)</span>
        </div>
        {!minimal && (
          <>
            <div style={{
              height: 1, margin: `${size === "hero" ? 18 : 12}px auto`,
              maxWidth: size === "hero" ? 200 : 140,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), rgba(232,232,240,0.2), rgba(201,168,76,0.35), transparent)",
              boxShadow: "0 0 12px rgba(201,168,76,0.08)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: s.meaning,
              color: "rgba(255,255,255,0.28)", fontStyle: "italic",
              lineHeight: PHI, maxWidth: size === "hero" ? 520 : 380, margin: "0 auto", letterSpacing: 0.3,
            }}>
              {showMeaning
                ? "True connection is shared clarity multiplied by the proof of reliability. For two imperfect beings to become a whole, they must be useful to one another in a way that filters out the chaos of the outside world."
                : "True connection is shared clarity multiplied by the proof of reliability."
              }
            </div>
          </>
        )}
        <div style={{
          position: "absolute", bottom: 0, left: "20%", right: "20%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

export function MiracleGlow({ color = "201,168,76", size = 300, intensity = 0.08, children }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size, height: size * 0.7,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, rgba(${color},${intensity}) 0%, rgba(${color},${intensity * 0.4}) 30%, transparent 60%)`,
        borderRadius: "50%", pointerEvents: "none",
        animation: "miracleBloom 12s ease-in-out infinite",
        filter: `blur(${size * 0.05}px)`,
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size * 0.6, height: size * 0.4,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, rgba(232,232,240,${intensity * 0.5}) 0%, transparent 50%)`,
        borderRadius: "50%", pointerEvents: "none",
        animation: "breathe 6s ease-in-out infinite",
      }} />
      {children}
    </div>
  );
}
