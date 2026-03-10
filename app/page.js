'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PHI = 1.618033988749895;
const PHIi = 1 / PHI;
const PHIi2 = PHIi * PHIi;
const PHIi5 = Math.pow(PHIi, 5);
const PHIi6 = Math.pow(PHIi, 6);
const T = "cubic-bezier(0.23,1,0.32,1)";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [hoverStart, setHoverStart] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 50% 50%, rgba(14,10,28,0.7) 0%, #03030a 70%)",
    }}>

      {/* Ambient atmospheric glow */}
      <div style={{
        position: "absolute", top: "23.6%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "61.8vmin", height: "61.8vmin",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, rgba(201,168,76,0.02) 38.2%, transparent 61.8%)",
        pointerEvents: "none",
      }} />

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

      {/* Sacred geometry placeholder — circle + square */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(55vmin, 400px)",
        height: "min(55vmin, 400px)",
        opacity: visible ? 0.5 : 0,
        transition: `opacity 2s 0.4s ${T}`,
        pointerEvents: "none",
      }}>
        {/* Circle */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.25)",
        }} />
        {/* Square */}
        <div style={{
          position: "absolute",
          top: "11.8%", left: "11.8%", right: "11.8%", bottom: "11.8%",
          border: "1px solid rgba(232,228,210,0.18)",
        }} />
        {/* Center dot — navel */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 6, height: 6,
          borderRadius: "50%",
          background: "rgba(201,168,76,0.4)",
          boxShadow: "0 0 12px rgba(201,168,76,0.3)",
        }} />
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

        <Link href="/search">
          <button
            onMouseEnter={() => setHoverStart(true)}
            onMouseLeave={() => setHoverStart(false)}
            className={hoverStart ? "" : "start-pulse"}
            style={{
              background: hoverStart
                ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 70%, transparent 100%)"
                : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 80%)",
              border: `1px solid rgba(201,168,76,${hoverStart ? 0.90 : 0.55})`,
              borderRadius: 3,
              padding: "14px 48px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(15px, 2.2vmin, 20px)",
              letterSpacing: "0.55em",
              fontWeight: 600,
              color: `rgba(201,168,76,${hoverStart ? 1.0 : 0.80})`,
              cursor: "pointer",
              transition: `all 500ms ${T}`,
              boxShadow: hoverStart
                ? "0 0 40px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.15), inset 0 0 20px rgba(201,168,76,0.08)"
                : "0 0 18px rgba(201,168,76,0.18), 0 0 40px rgba(201,168,76,0.06)",
              whiteSpace: "nowrap",
              textShadow: hoverStart ? "0 0 20px rgba(201,168,76,0.8)" : "0 0 10px rgba(201,168,76,0.35)",
            }}
          >START</button>
        </Link>
      </div>
    </div>
  );
}
