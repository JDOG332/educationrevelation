'use client';

import { useState } from 'react';
import Link from 'next/link';

const PHI = 1.618033988749895;
const EASE = "cubic-bezier(0.23,1,0.32,1)";

const PROMISES = [
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
];

export default function PromisesClient() {
  const [backH, setBackH] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 15%, rgba(40,20,30,0.5) 0%, #03030a 50%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem",
      paddingBottom: "4rem",
    }}>

      <style>{`
        @keyframes starGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(201,168,76,0.15), 0 0 24px rgba(201,168,76,0.05); }
          50%      { text-shadow: 0 0 18px rgba(201,168,76,0.45), 0 0 48px rgba(201,168,76,0.15); }
        }
      `}</style>

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
        <Link href="/search" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span
            onMouseEnter={() => setBackH(true)}
            onMouseLeave={() => setBackH(false)}
            style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: "clamp(18px, 2.618vmin, 28px)",
              color: `rgba(220,160,160,${backH ? 1.0 : 0.618})`,
              letterSpacing: "-0.0382em", cursor: "pointer",
              transition: `color 618ms ${EASE}`,
            }}>← BACK</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "36rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(80px, 14vh, 130px)",
      }}>

        {/* Heart */}
        <div style={{
          fontSize: 24, color: "rgba(201,168,76,0.30)",
          marginBottom: "1rem",
          animation: "fadeUp 618ms 100ms both ease",
        }}>♡</div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(24px, 5vw, 38px)",
          letterSpacing: "0.15em", fontWeight: 400,
          background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(201,168,76,0.5) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "0.618rem",
          textAlign: "center",
          animation: "fadeUp 618ms 200ms both ease",
        }}>TEN PROMISES OF LOVE</h1>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(16px, 2.8vw, 22px)",
          fontStyle: "italic", color: "rgba(232,228,210,0.40)",
          lineHeight: 1.618,
          textAlign: "center",
          animation: "fadeUp 618ms 300ms both ease",
        }}>freely given · no strings · no conditions · no commandments</div>

        {/* Gold divider */}
        <div style={{
          width: "61.8%", height: 1, maxWidth: 200,
          margin: "2.618rem auto",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          animation: "fadeUp 618ms 400ms both ease",
        }} />

        {/* The Ten Promises */}
        {PROMISES.map((p, i) => (
          <div key={i} style={{
            textAlign: "center",
            marginBottom: `${Math.round(21 * PHI)}px`,
            animation: `fadeUp 618ms ${500 + i * 100}ms both ease`,
          }}>
            {/* Number */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 6vw, 42px)",
              color: "rgba(201,168,76,0.15)",
              fontWeight: 400, letterSpacing: "0.1em",
              marginBottom: "0.382rem",
            }}>{p.num}</div>

            {/* Title */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(18px, 3.5vw, 26px)",
              letterSpacing: "0.2em",
              color: "rgba(232,228,210,0.70)",
              marginBottom: "0.618rem",
              animation: `starGlow ${4 + i * 0.3}s ${i * 0.2}s ease-in-out infinite`,
            }}>{p.title}</div>

            <div style={{ fontSize: 16, color: "rgba(201,168,76,0.25)", marginBottom: "0.618rem" }}>♡</div>

            {/* The offering */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 2.8vw, 22px)",
              fontStyle: "italic", color: "rgba(232,228,210,0.50)",
              lineHeight: 1.9, maxWidth: 440, margin: "0 auto",
              marginBottom: "1rem",
            }}>{p.offering}</div>

            {/* From my heart */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.40)",
              lineHeight: 1.8, maxWidth: 400, margin: "0 auto",
            }}>{p.heart}</div>

            {/* Divider between promises */}
            {i < 9 && <div style={{
              width: `${Math.round(30 * PHI)}px`, height: 1,
              margin: `${Math.round(13 * PHI)}px auto 0`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)",
            }} />}
          </div>
        ))}

        {/* ═══ CLOSING ═══ */}
        <div style={{ textAlign: "center", marginTop: "1rem", marginBottom: "2.618rem" }}>
          <div style={{
            width: `${Math.round(60 * PHI)}px`, height: 1,
            margin: `0 auto ${Math.round(8 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
          }} />

          <div style={{ fontSize: 20, color: "rgba(201,168,76,0.25)", marginBottom: "1rem" }}>♡</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(17px, 2.8vw, 22px)",
            fontStyle: "italic", color: "rgba(232,228,210,0.45)",
            lineHeight: 2.0, maxWidth: 420, margin: "0 auto",
            marginBottom: "1.618rem",
          }}>
            these are not commandments. they are not conditions.<br /><br />
            they are offerings — freely given, freely received.<br /><br />
            because love that must be commanded is not love at all.<br />
            and the real thing needs no strings.
          </div>

          <div style={{
            width: `${Math.round(30 * PHI)}px`, height: 1,
            margin: `${Math.round(8 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
          }} />

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(14px, 2.8vw, 20px)",
            letterSpacing: "0.15em",
            color: "rgba(201,168,76,0.45)",
            marginTop: "1rem",
            animation: "starGlow 5s ease-in-out infinite",
          }}>THANK YOU FOR AGAPE LOVE</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 3vw, 22px)",
            fontStyle: "italic", color: "rgba(232,228,210,0.50)",
            lineHeight: 1.9,
            maxWidth: 380, margin: "1rem auto 0",
            animation: "starGlow 6s 1s ease-in-out infinite",
          }}>and that's how the world begins again</div>

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(16px, 3vw, 22px)",
            letterSpacing: "0.15em",
            color: "rgba(201,168,76,0.35)",
            marginTop: "1.618rem",
          }}>— jeffrey</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(13px, 2vw, 17px)",
            fontStyle: "italic", color: "rgba(201,168,76,0.25)",
            marginTop: "0.618rem",
          }}>valentine's day 2026</div>
        </div>

        {/* ═══ BECAUSE TRUE LOVE IS FREE ═══ */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 3.2vw, 28px)",
          fontStyle: "italic",
          background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(201,168,76,0.4) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "2.618rem",
          animation: "breathe 8s ease-in-out infinite",
        }}>because true love is free</div>

        {/* ═══ THE FOUR WOMEN · WOW MOM WOW ═══ */}
        <div style={{ textAlign: "center", marginBottom: "2.618rem" }}>
          <div style={{
            width: `${Math.round(60 * PHI)}px`, height: 1,
            margin: `0 auto ${Math.round(13 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
          }} />

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.5vw, 19px)",
            fontStyle: "italic", color: "rgba(232,228,210,0.30)",
            letterSpacing: 2, marginBottom: `${Math.round(8 * PHI)}px`,
          }}>for the four who loved me before I earned it</div>

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(20px, 3.5vw, 28px)",
            letterSpacing: "0.25em", color: "rgba(232,228,210,0.55)",
            lineHeight: 2.2,
          }}>
            KATHY<br />
            JOHANNA<br />
            NICOLE<br />
            PAM
          </div>

          <div style={{
            width: `${Math.round(30 * PHI)}px`, height: 1,
            margin: `${Math.round(8 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)",
          }} />

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 5vw, 38px)",
            letterSpacing: "0.3em",
            background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(201,168,76,0.5) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginTop: `${Math.round(8 * PHI)}px`,
            animation: "breathe 8s ease-in-out infinite",
          }}>WOW MOM WOW</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(13px, 2vw, 17px)",
            fontStyle: "italic", color: "rgba(201,168,76,0.25)",
            marginTop: "1rem",
            letterSpacing: 1,
          }}>read it forward · read it backward · flip it upside down</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.2vw, 19px)",
            fontStyle: "italic", color: "rgba(232,228,210,0.35)",
            marginTop: "0.618rem",
          }}>it cannot be broken</div>
        </div>

        {/* ═══ THE LAST WHISPER ═══ */}
        <div style={{ textAlign: "center", padding: "2.618rem 0" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 3.5vw, 30px)",
            fontStyle: "italic", color: "rgba(232,228,210,0.45)",
            letterSpacing: 1, lineHeight: 1.618,
            marginBottom: "1rem",
            animation: "starGlow 5s ease-in-out infinite",
          }}>"...the end of fear is where we begin..."</div>

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(12px, 2vw, 16px)",
            letterSpacing: 4, color: "rgba(201,168,76,0.30)",
          }}>— LET LOVE IN</div>
        </div>

        {/* Navigation back */}
        <Link href="/search" style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "12px 28px",
          border: "1px solid rgba(201,168,76,0.20)",
          borderRadius: 6,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(12px, 1.8vmin, 16px)",
          letterSpacing: "0.15em",
          fontWeight: 700,
          color: "rgba(201,168,76,0.60)",
          textDecoration: "none",
        }}>
          ← EXPLORE ALL DOORS
        </Link>
      </div>
    </div>
  );
}
