'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiCard from '@/components/WikiCard';

const EASE = "cubic-bezier(0.23,1,0.32,1)";

function CardContent({ card, rgb, index, doorSlug, topicSlug }) {
  const [expanded, setExpanded] = useState(false);
  const [shared, setShared] = useState(false);

  const cardUrl = `https://educationrevelation.com/${doorSlug}/${topicSlug}/${card.id}`;

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareData = {
      title: `${card.icon} ${card.title}`,
      text: card.simple?.slice(0, 120) + '...',
      url: cardUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(cardUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (e) {}
  };

  return (
    <div style={{
      padding: "1.618rem",
      background: `rgba(${rgb},${expanded ? 0.08 : 0.04})`,
      border: `1px solid rgba(${rgb},${expanded ? 0.35 : 0.18})`,
      borderRadius: 6,
      transition: `all 618ms ${EASE}`,
      animation: `fadeUp 618ms ${200 + index * 100}ms both ease`,
    }}>
      {/* Header — clickable */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.618rem", marginBottom: "0.382rem" }}>
          <span style={{ fontSize: 38 }}>{card.icon}</span>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 4vmin, 34px)",
            color: `rgba(${rgb},0.90)`,
            margin: 0,
            letterSpacing: "0.02em",
          }}>{card.title}</h3>
        </div>
        {card.subtitle && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(22px, 3vmin, 28px)",
            color: `rgba(${rgb},0.45)`,
            fontWeight: 300,
            letterSpacing: "0.06em",
            marginBottom: "0.618rem",
          }}>{card.subtitle}</div>
        )}
      </div>

      {/* Simple — always visible */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(24px, 3.6vmin, 32px)",
        color: "rgba(232,228,210,0.75)",
        lineHeight: 1.618,
        marginTop: "0.618rem",
      }}>{card.simple}</p>

      {/* Expandable content */}
      {expanded && (
        <div style={{
          marginTop: "1rem",
          display: "flex", flexDirection: "column", gap: "1rem",
          animation: "fadeUp 382ms ease both",
        }}>

          {/* Intuition */}
          {card.intuition && (
            <div style={{
              padding: "1rem",
              background: `rgba(${rgb},0.04)`,
              borderLeft: `3px solid rgba(${rgb},0.30)`,
              borderRadius: "0 6px 6px 0",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: `rgba(${rgb},0.50)`,
                letterSpacing: "0.15em",
                marginBottom: "0.382rem",
                fontWeight: 700,
              }}>GO DEEPER</div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: "rgba(232,228,210,0.60)",
                lineHeight: 1.618,
                margin: 0,
              }}>{card.intuition}</p>
            </div>
          )}

          {/* Advanced */}
          {card.advanced && (
            <div style={{
              padding: "1rem",
              background: "rgba(232,228,210,0.02)",
              borderLeft: `3px solid rgba(232,228,210,0.12)`,
              borderRadius: "0 6px 6px 0",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: "rgba(232,228,210,0.40)",
                letterSpacing: "0.15em",
                marginBottom: "0.382rem",
                fontWeight: 700,
              }}>THE FULL PICTURE</div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: "rgba(232,228,210,0.50)",
                lineHeight: 1.618,
                fontWeight: 300,
                margin: 0,
              }}>{card.advanced}</p>
            </div>
          )}

          {/* Six Senses */}
          {card.senses?.length > 0 && (
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: `rgba(${rgb},0.45)`,
                letterSpacing: "0.15em",
                marginBottom: "0.618rem",
                fontWeight: 700,
              }}>SIX SENSES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
                {card.senses.map((s) => (
                  <div key={s.key} style={{
                    display: "flex", gap: "0.618rem", alignItems: "flex-start",
                    padding: "0.382rem 0",
                  }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(20px, 2.6vmin, 24px)",
                        color: `rgba(${rgb},0.45)`,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                      }}>{s.sense}</span>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(22px, 3vmin, 28px)",
                        color: "rgba(232,228,210,0.55)",
                        lineHeight: 1.618,
                        margin: 0,
                      }}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wikipedia — Explore Further */}
          {card.links?.length > 0 && (
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: `rgba(${rgb},0.45)`,
                letterSpacing: "0.15em",
                marginBottom: "0.618rem",
                fontWeight: 700,
              }}>EXPLORE FURTHER</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
                {card.links.map((link, li) => (
                  <WikiCard key={li} label={link.label} url={link.url} rgb={rgb} index={li} />
                ))}
              </div>
            </div>
          )}

          {/* Songs */}
          {card.songs?.length > 0 && (
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vmin, 28px)",
                color: `rgba(${rgb},0.45)`,
                letterSpacing: "0.15em",
                marginBottom: "0.382rem",
                fontWeight: 700,
              }}>MUSIC</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.236rem" }}>
                {card.songs.map((song, si) => (
                  <div key={si} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(20px, 2.6vmin, 24px)",
                    color: "rgba(232,228,210,0.45)",
                    fontWeight: 300,
                  }}>♫ {song.title} — <span style={{ fontStyle: "italic" }}>{song.artist}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Expand indicator */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          textAlign: "center",
          marginTop: "0.618rem",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(22px, 3vmin, 28px)",
          letterSpacing: "0.10em",
          color: `rgba(${rgb},0.618)`,
          cursor: "pointer",
          userSelect: "none",
          transition: `color 382ms ${EASE}`,
        }}
      >
        <span>{expanded ? "▲ collapse" : "▼ tap to explore"}</span>
      </div>

      {/* Share + View full card */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "0.618rem",
        marginTop: "0.618rem",
      }}>
        <button
          onClick={handleShare}
          style={{
            background: shared ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.04)`,
            border: `1px solid rgba(${rgb},${shared ? 0.618 : 0.22})`,
            borderRadius: 6,
            padding: "6px 16px",
            display: "flex", alignItems: "center", gap: "6px",
            cursor: "pointer",
            transition: `all 382ms ${EASE}`,
          }}
        >
          <span style={{ fontSize: 22 }}>{shared ? "✓" : "↗"}</span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(20px, 2.6vmin, 24px)",
            letterSpacing: "0.10em",
            color: `rgba(${rgb},${shared ? 1.0 : 0.65})`,
          }}>{shared ? "COPIED" : "SHARE"}</span>
        </button>
        <Link href={`/${doorSlug}/${topicSlug}/${card.id}`} style={{ textDecoration: "none" }}>
          <div style={{
            background: `rgba(${rgb},0.04)`,
            border: `1px solid rgba(${rgb},0.22)`,
            borderRadius: 6,
            padding: "6px 16px",
            display: "flex", alignItems: "center", gap: "6px",
            cursor: "pointer",
            transition: `all 382ms ${EASE}`,
          }}>
            <span style={{ fontSize: 22 }}>◎</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(20px, 2.6vmin, 24px)",
              letterSpacing: "0.10em",
              color: `rgba(${rgb},0.65)`,
            }}>VIEW FULL</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function TopicClient({ doorSlug, doorMeta, sub, cards }) {
  const [backH, setBackH] = useState(false);
  const rgb = sub.accent;

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 8%, rgba(${rgb},0.05) 0%, #03030a 50%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem",
      paddingBottom: "4rem",
    }}>

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
        <Link href={`/${doorSlug}`} style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span
            onMouseEnter={() => setBackH(true)}
            onMouseLeave={() => setBackH(false)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 5.4vmin, 42px)",
              color: `rgba(${rgb},${backH ? 1.0 : 0.618})`,
              letterSpacing: "-0.0382em",
              cursor: "pointer",
              transition: `color 618ms ${EASE}`,
            }}>← {doorMeta.name}</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "42rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(72px, 11vh, 110px)",
      }}>

        {/* Topic icon */}
        <div style={{
          fontSize: "clamp(56px, 12vmin, 84px)",
          animation: "fadeUp 618ms 100ms both ease",
          marginBottom: "0.382rem",
        }}>{sub.icon}</div>

        {/* Topic name */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(28px, 5.4vmin, 44px)",
          letterSpacing: "0.15em",
          color: `rgba(${rgb},0.85)`,
          textAlign: "center",
          animation: "fadeUp 618ms 150ms both ease",
          marginBottom: "0.382rem",
          textShadow: `0 0 8px rgba(${rgb},0.25)`,
          lineHeight: 1.1,
        }}>{sub.name.toUpperCase()}</h1>

        {/* Topic description */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(24px, 3.6vmin, 34px)",
          color: `rgba(${rgb},0.45)`,
          textAlign: "center",
          animation: "fadeUp 618ms 200ms both ease",
          marginBottom: "0.382rem",
          lineHeight: 1.618,
        }}>{sub.desc}</p>

        {/* Door breadcrumb */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(20px, 2.6vmin, 24px)",
          color: "rgba(201,168,76,0.30)",
          letterSpacing: "0.12em",
          marginBottom: "2rem",
          animation: "fadeUp 618ms 250ms both ease",
        }}>{doorMeta.emoji} {doorMeta.name} → {sub.name}</div>

        {/* Divider */}
        <div style={{
          width: "61.8%", height: 1, maxWidth: 200,
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.25), transparent)`,
          marginBottom: "1.618rem",
        }} />

        {/* Cards */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: "0.618rem",
          width: "100%",
        }}>
          {cards.map((card, i) => (
            <CardContent key={card.id} card={card} rgb={rgb} index={i} doorSlug={doorSlug} topicSlug={sub.id} />
          ))}
        </div>

        {/* Navigation */}
        <div style={{
          display: "flex", gap: "0.618rem", marginTop: "2.618rem",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <Link href={`/${doorSlug}`} style={{
            padding: "12px 24px",
            border: `1px solid rgba(${rgb},0.25)`,
            borderRadius: 6,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 3vmin, 28px)",
            letterSpacing: "0.12em",
            fontWeight: 700,
            color: `rgba(${rgb},0.70)`,
            textDecoration: "none",
          }}>← {doorMeta.name}</Link>
          <Link href="/search" style={{
            padding: "12px 24px",
            border: "1px solid rgba(201,168,76,0.20)",
            borderRadius: 6,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 3vmin, 28px)",
            letterSpacing: "0.12em",
            fontWeight: 700,
            color: "rgba(201,168,76,0.60)",
            textDecoration: "none",
          }}>ALL DOORS</Link>
        </div>
      </div>
    </div>
  );
}
