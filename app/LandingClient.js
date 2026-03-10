'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const VitruvianCanvas = dynamic(() => import('@/components/VitruvianCanvas'), { ssr: false });

const PHIi  = 0.6180339887;
const PHIi5 = Math.pow(PHIi, 5);  // 0.0901699437
const PHIi6 = Math.pow(PHIi, 6);  // 0.0557280900
const T = "cubic-bezier(0.23,1,0.32,1)";

export default function LandingClient() {
  const [enterHover, setEnterHover] = useState(false);
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

      {/* Tagline + START */}
      <div style={{
        position: "absolute",
        bottom: `${(PHIi5 * 100).toFixed(2)}vh`,
        left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center",
        gap: `${(PHIi6 * 100).toFixed(2)}vh`,
        opacity: visible ? 1 : 0,
        transition: `opacity 1.4s 0.6s ${T}`,
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 3.4vmin, 30px)",
          fontStyle: "normal", fontWeight: 500,
          color: "rgba(220,215,200,0.92)",
          textShadow: "0 0 18px rgba(220,215,200,0.45), 0 0 50px rgba(220,215,200,0.18), 0 0 90px rgba(201,168,76,0.12)",
          letterSpacing: "0.06em",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>"...connecting consciousness..."</div>

        <button
          onMouseEnter={() => setEnterHover(true)}
          onMouseLeave={() => setEnterHover(false)}
          onClick={() => router.push('/intro')}
          className={enterHover ? "" : "start-pulse"}
          style={{
            background: enterHover
              ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 70%, transparent 100%)"
              : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 80%)",
            border: `1px solid rgba(201,168,76,${enterHover ? 0.90 : 0.55})`,
            borderRadius: 3,
            padding: "14px 48px",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(15px, 2.2vmin, 20px)",
            letterSpacing: "0.55em",
            fontWeight: 600,
            color: `rgba(201,168,76,${enterHover ? 1.0 : 0.80})`,
            cursor: "pointer",
            transition: `all 500ms ${T}`,
            boxShadow: enterHover
              ? "0 0 40px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.15), inset 0 0 20px rgba(201,168,76,0.08)"
              : "0 0 18px rgba(201,168,76,0.18), 0 0 40px rgba(201,168,76,0.06)",
            whiteSpace: "nowrap",
            textShadow: enterHover ? "0 0 20px rgba(201,168,76,0.8)" : "0 0 10px rgba(201,168,76,0.35)",
          }}
        >START</button>
      </div>
    </div>
  );
}
