'use client';

import { useState } from 'react';
import Link from 'next/link';

const PHI = 1.618033988749895;
const EASE = "cubic-bezier(0.23,1,0.32,1)";

const PROMISES = [
  {
    num: "I", title: "SAFETY",
    offering: "You deserve to move through this life knowing that the ground beneath you is solid. Not because you earned it — because you exist. The shelter, the steadiness, the knowing that someone already thought ahead — those were always meant to be yours. You were built to exhale, not to brace.",
    heart: "The ground has always been holding you. You just forgot to feel it."
  },
  {
    num: "II", title: "TO BE SEEN",
    offering: "Not the version of you that performs for the world. The one who cries alone. The one who fails in the kitchen. The one who doubts everything on Tuesday afternoons. That one — the unpolished, unfiltered, trembling one — is the only one worth knowing.",
    heart: "You were never meant to be a highlight reel. You were meant to be a whole person."
  },
  {
    num: "III", title: "AGENCY",
    offering: "Your body is yours. Your time is yours. Your no is a complete sentence and you never have to defend it. Any love that requires your shrinking is not love at all. The way you see the world is not wrong. It is rare.",
    heart: "You do not need permission to take up space. The space was made for you."
  },
  {
    num: "IV", title: "PARTNERSHIP",
    offering: "You deserve someone who notices — not someone you have to carry. The invisible labor, the unspoken weight, the things you hold in your head that nobody sees — you were never meant to hold all of that alone. You deserve a partner, not a project.",
    heart: "If you are carrying something heavy that nobody else sees — it is real, and it deserves to be shared."
  },
  {
    num: "V", title: "TO BE BELIEVED",
    offering: "When you say something hurts, the correct response is not to argue with your pain. When you say something is wrong, the correct response is not to need a second opinion. Your voice was never meant to be an echo. It was meant to be heard.",
    heart: "You deserve to be believed the first time you speak."
  },
  {
    num: "VI", title: "PURPOSE",
    offering: "You are not just someone's child, someone's partner, someone's parent, someone's employee. You are a whole person with a fire that existed before any role was ever assigned to you. Your right to chase whatever lights you up is sacred — especially when it is inconvenient for others.",
    heart: "You are rare and you do not look like anyone else — on the inside or the outside."
  },
  {
    num: "VII", title: "REST WITHOUT GUILT",
    offering: "You do not have to earn a nap. You do not have to finish the list before you sit down. Rest is not a reward for productivity. It is a birthright. Your body has been asking you to stop. Listen to it.",
    heart: "You are not a machine. You are a living thing that needs stillness to grow."
  },
  {
    num: "VIII", title: "TO BE HELD",
    offering: "You have carried everyone else's feelings long enough. You have been the strong one, the steady one, the one who holds the room together when it wants to fall apart. You are allowed to put that weight down. You are allowed to fall into someone else's arms and let them hold the roof up for a while.",
    heart: "The silence between two people who trust each other is the safest place on earth."
  },
  {
    num: "IX", title: "COMMUNITY",
    offering: "The people who love you are not in competition with each other. Your friendships are oxygen — they keep you alive in ways no single person can. Answer the call. Take the trip. Show up for the people who show up for you. Your people are not a threat to your love. They are the proof of it.",
    heart: "You were never meant to be everything to one person or one person to everything."
  },
  {
    num: "X", title: "CHOSEN EVERY SINGLE DAY",
    offering: "You deserve to be chosen out loud, in front of people, in the small moments, and in the hard ones. Not won and then coasted on. Not claimed and then forgotten. The thousandth day should feel like the third — intentional, specific, and unmistakable.",
    heart: "You should never have to wonder."
  },
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
        }}>TEN PROMISES</h1>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 3vw, 24px)",
          fontStyle: "italic", color: "rgba(232,228,210,0.50)",
          lineHeight: 1.618,
          textAlign: "center",
          animation: "fadeUp 618ms 300ms both ease",
          marginBottom: "0.618rem",
        }}>from the universe to you</div>

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
              fontStyle: "italic", color: "rgba(232,228,210,0.55)",
              lineHeight: 1.9, maxWidth: 460, margin: "0 auto",
              marginBottom: "1rem",
            }}>{p.offering}</div>

            {/* The quiet truth */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.45)",
              lineHeight: 1.8, maxWidth: 420, margin: "0 auto",
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
            fontStyle: "italic", color: "rgba(232,228,210,0.50)",
            lineHeight: 2.0, maxWidth: 440, margin: "0 auto",
            marginBottom: "1.618rem",
          }}>
            these are not rules to follow.<br />
            they are not rewards to earn.<br /><br />
            they are rights you were born with — <br />
            written into the fabric of your existence<br />
            before you took your first breath.<br /><br />
            love that must be earned<br />
            was never love at all.
          </div>

          <div style={{
            width: `${Math.round(30 * PHI)}px`, height: 1,
            margin: `${Math.round(8 * PHI)}px auto`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
          }} />

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(16px, 3vw, 24px)",
            letterSpacing: "0.15em",
            color: "rgba(201,168,76,0.50)",
            marginTop: "1.618rem",
            animation: "starGlow 5s ease-in-out infinite",
          }}>YOU WERE LOVED BEFORE YOU ARRIVED</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 3vw, 22px)",
            fontStyle: "italic", color: "rgba(232,228,210,0.45)",
            lineHeight: 1.9,
            maxWidth: 400, margin: "1.618rem auto 0",
            animation: "starGlow 6s 1s ease-in-out infinite",
          }}>and you will be loved long after you leave</div>
        </div>

        {/* ═══ THE MIRROR ═══ */}
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

        {/* ═══ WOW MOM WOW ═══ */}
        <div style={{ textAlign: "center", marginBottom: "2.618rem" }}>
          <div style={{
            width: `${Math.round(60 * PHI)}px`, height: 1,
            margin: `0 auto ${Math.round(13 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
          }} />

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 5vw, 38px)",
            letterSpacing: "0.3em",
            background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(201,168,76,0.5) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "breathe 8s ease-in-out infinite",
          }}>WOW MOM WOW</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2vw, 18px)",
            fontStyle: "italic", color: "rgba(201,168,76,0.25)",
            marginTop: "1rem",
            letterSpacing: 1,
          }}>read it forward · read it backward · flip it upside down</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 2.2vw, 20px)",
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
