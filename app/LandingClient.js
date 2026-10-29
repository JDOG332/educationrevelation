'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const VitruvianCanvas = dynamic(() => import('@/components/VitruvianCanvas'), { ssr: false });

const PHIi  = 0.6180339887;
const PHIi5 = Math.pow(PHIi, 5);  // 0.0901699437
const PHIi6 = Math.pow(PHIi, 6);  // 0.0557280900
const T = "cubic-bezier(0.23,1,0.32,1)";

const buttonStyle = (hover) => ({
  background: hover
    ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 70%, transparent 100%)"
    : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 80%)",
  border: `1px solid rgba(201,168,76,${hover ? 0.90 : 0.55})`,
  borderRadius: 3,
  padding: "12px 22px",
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(14px, 1.9vmin, 17px)",
  letterSpacing: "0.28em",
  fontWeight: 600,
  color: `rgba(201,168,76,${hover ? 1.0 : 0.85})`,
  cursor: "pointer",
  transition: `all 500ms ${T}`,
  boxShadow: hover
    ? "0 0 40px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.15), inset 0 0 20px rgba(201,168,76,0.08)"
    : "0 0 18px rgba(201,168,76,0.18), 0 0 40px rgba(201,168,76,0.06)",
  whiteSpace: "nowrap",
  textShadow: hover ? "0 0 20px rgba(201,168,76,0.8)" : "0 0 10px rgba(201,168,76,0.35)",
});

export default function LandingClient() {
  const [enterHover, setEnterHover] = useState(false);
  const [theoryHover, setTheoryHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const vitStateRef = useRef({ rx: 0, ry: 0, rz: 0 });
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse at 50% 38%, rgba(14,10,28,1) 0%, #030306 72%)",
      overflow: "hidden",
      fontFamily: "'Playfair Display', serif",
    }}>

      {/* CSS animations */}
      <style>{`
        .foot-glow { animation: footGlow 11.2s ease-in-out infinite; }
        @keyframes footGlow {
          0%,100% { text-shadow: 0 0 24px rgba(201,168,76,0.45), 0 0 60px rgba(201,168,76,0.18); }
          50%      { text-shadow: 0 0 36px rgba(201,168,76,0.75), 0 0 80px rgba(201,168,76,0.32); }
        }
        .start-pulse {
          animation: startPulse 3.2s ease-in-out infinite;
        }
        @keyframes startPulse {
          0%,100% { box-shadow: 0 0 18px rgba(201,168,76,0.18), 0 0 40px rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.55); }
          50%     { box-shadow: 0 0 28px rgba(201,168,76,0.38), 0 0 70px rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.80); }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: "60vmin", height: "60vmin",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      {/* Vitruvian Man Canvas — the real deal */}
      <div style={{ position: "absolute", inset: 0 }}>
        <VitruvianCanvas stateRef={vitStateRef} />
      </div>

      {/* WELCOME */}
      <div style={{
        position: "absolute",
        top: `${(PHIi5 * 100).toFixed(2)}vh`,
        left: "50%", transform: "translateX(-50%)",
        opacity: visible ? 1 : 0,
        transition: `opacity 1.6s 0.2s ${T}`,
        pointerEvents: "none",
        zIndex: 5,
        whiteSpace: "nowrap",
      }}>
        <div
          className="foot-glow"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6.854vmin, 48px)",
            letterSpacing: "0.55em",
            fontWeight: 600,
            color: "rgba(201,168,76,0.88)",
            textShadow: "0 0 24px rgba(201,168,76,0.45), 0 0 60px rgba(201,168,76,0.18)",
          }}>WELCOME</div>
      </div>

      {/* One line, the author, two doors in */}
      <div style={{
        position: "absolute",
        bottom: `${(PHIi5 * 100).toFixed(2)}vh`,
        left: "50%", transform: "translateX(-50%)",
        width: "min(92vw, 40rem)",
        display: "flex", flexDirection: "column",
        alignItems: "center",
        gap: `${(PHIi6 * 100).toFixed(2)}vh`,
        padding: "1.25rem 1rem 0.5rem",
        background: "radial-gradient(ellipse at 50% 70%, rgba(3,3,6,0.82) 0%, rgba(3,3,6,0.55) 55%, transparent 100%)",
        opacity: visible ? 1 : 0,
        transition: `opacity 1.4s 0.6s ${T}`,
        zIndex: 10,
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 3vmin, 28px)",
          fontWeight: 500,
          color: "rgba(220,215,200,0.92)",
          textShadow: "0 0 18px rgba(220,215,200,0.35), 0 0 50px rgba(201,168,76,0.12)",
          letterSpacing: "0.04em",
          textAlign: "center",
          lineHeight: 1.35,
          margin: 0,
        }}>Ten doors into human knowledge, and one equation underneath.</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(14px, 1.8vmin, 16px)",
          fontWeight: 400,
          color: "rgba(201,168,76,0.85)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin: 0,
        }}>by Jeff Sellers</p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          <button
            onMouseEnter={() => setEnterHover(true)}
            onMouseLeave={() => setEnterHover(false)}
            onClick={() => router.push('/search')}
            className={enterHover ? "" : "start-pulse"}
            style={buttonStyle(enterHover)}
          >EXPLORE 1,001 TOPICS</button>
          <button
            onMouseEnter={() => setTheoryHover(true)}
            onMouseLeave={() => setTheoryHover(false)}
            onClick={() => router.push('/theory')}
            style={buttonStyle(theoryHover)}
          >READ THE THEORY</button>
        </div>

        <button
          onClick={() => router.push('/intro')}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2vmin, 18px)",
            fontStyle: "italic",
            color: "rgba(201,168,76,0.75)",
            letterSpacing: "0.04em",
            padding: "0.25rem 0.5rem",
          }}
        >or watch the 10-second Ψ intro</button>
      </div>
    </div>
  );
}
