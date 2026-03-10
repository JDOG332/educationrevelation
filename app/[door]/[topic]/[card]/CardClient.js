'use client';

import { useState } from 'react';
import Link from 'next/link';

const EASE = "cubic-bezier(0.23,1,0.32,1)";

export default function CardClient({ card, sub, doorMeta, doorSlug, topicSlug, prevCard, nextCard }) {
  const [backH, setBackH] = useState(false);
  const [shared, setShared] = useState(false);
  const rgb = sub.accent;

  const shareUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://educationrevelation.com/${doorSlug}/${topicSlug}/${card.id}`;

  const handleShare = async () => {
    const shareData = {
      title: `${card.icon} ${card.title}`,
      text: card.simple?.slice(0, 120) + '...',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (e) {
      // User cancelled share — that's fine
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 8%, rgba(${rgb},0.06) 0%, #03030a 50%)`,
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
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingLeft: "1.618rem",
        paddingRight: "1.618rem",
        pointerEvents: "none",
      }}>
        <Link href={`/${doorSlug}/${topicSlug}`} style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span
            onMouseEnter={() => setBackH(true)}
            onMouseLeave={() => setBackH(false)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 2.618vmin, 28px)",
              color: `rgba(${rgb},${backH ? 1.0 : 0.618})`,
              letterSpacing: "-0.0382em",
              cursor: "pointer",
              transition: `color 618ms ${EASE}`,
            }}>← {sub.name}</span>
        </Link>

        {/* Share button */}
        <button
          onClick={handleShare}
          style={{
            pointerEvents: "auto",
            background: shared ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.06)`,
            border: `1px solid rgba(${rgb},${shared ? 0.618 : 0.30})`,
            borderRadius: 6,
            padding: "8px 20px",
            display: "flex", alignItems: "center", gap: "8px",
            cursor: "pointer",
            transition: `all 382ms ${EASE}`,
          }}
        >
          <span style={{ fontSize: "clamp(16px, 2.2vmin, 20px)" }}>
            {shared ? "✓" : "↗"}
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(11px, 1.4vmin, 14px)",
            letterSpacing: "0.12em",
            color: `rgba(${rgb},${shared ? 1.0 : 0.80})`,
          }}>{shared ? "COPIED" : "SHARE"}</span>
        </button>
      </div>

      {/* Content */}
      <div style={{
        width: "100%", maxWidth: "42rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(72px, 11vh, 110px)",
      }}>

        {/* Breadcrumb */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(10px, 1.3vmin, 12px)",
          color: "rgba(201,168,76,0.30)",
          letterSpacing: "0.12em",
          marginBottom: "1rem",
          animation: "fadeUp 618ms 100ms both ease",
          textAlign: "center",
        }}>{doorMeta.emoji} {doorMeta.name} → {sub.name}</div>

        {/* Card icon */}
        <div style={{
          fontSize: "clamp(48px, 10vmin, 72px)",
          animation: "fadeUp 618ms 150ms both ease",
          marginBottom: "0.618rem",
        }}>{card.icon}</div>

        {/* Card title */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(22px, 4.236vmin, 36px)",
          letterSpacing: "0.06em",
          color: `rgba(${rgb},0.90)`,
          textAlign: "center",
          animation: "fadeUp 618ms 200ms both ease",
          marginBottom: "0.382rem",
          textShadow: `0 0 8px rgba(${rgb},0.25)`,
          lineHeight: 1.1,
        }}>{card.title}</h1>

        {/* Subtitle */}
        {card.subtitle && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 1.8vmin, 16px)",
            color: `rgba(${rgb},0.45)`,
            fontWeight: 300,
            letterSpacing: "0.06em",
            marginBottom: "1rem",
            animation: "fadeUp 618ms 250ms both ease",
            textAlign: "center",
          }}>{card.subtitle}</div>
        )}

        {/* Divider */}
        <div style={{
          width: "61.8%", height: 1, maxWidth: 200,
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.30), transparent)`,
          marginBottom: "1.618rem",
          animation: "fadeUp 618ms 300ms both ease",
        }} />

        {/* ═══ SIMPLE ═══ */}
        <div style={{
          width: "100%",
          padding: "1.618rem",
          animation: "fadeUp 618ms 350ms both ease",
          marginBottom: "1rem",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18px, 2.618vmin, 26px)",
            color: "rgba(232,228,210,0.85)",
            lineHeight: 1.618,
            margin: 0,
            textAlign: "center",
          }}>{card.simple}</p>
        </div>

        {/* ═══ GO DEEPER ═══ */}
        {card.intuition && (
          <div style={{
            width: "100%",
            padding: "1.618rem",
            background: `rgba(${rgb},0.04)`,
            borderLeft: `3px solid rgba(${rgb},0.30)`,
            borderRadius: "0 6px 6px 0",
            animation: "fadeUp 618ms 450ms both ease",
            marginBottom: "1rem",
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(11px, 1.4vmin, 13px)",
              color: `rgba(${rgb},0.50)`,
              letterSpacing: "0.15em",
              marginBottom: "0.618rem",
              fontWeight: 700,
            }}>GO DEEPER</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2.2vmin, 22px)",
              color: "rgba(232,228,210,0.65)",
              lineHeight: 1.618,
              margin: 0,
            }}>{card.intuition}</p>
          </div>
        )}

        {/* ═══ FULL PICTURE ═══ */}
        {card.advanced && (
          <div style={{
            width: "100%",
            padding: "1.618rem",
            background: "rgba(232,228,210,0.02)",
            borderLeft: "3px solid rgba(232,228,210,0.12)",
            borderRadius: "0 6px 6px 0",
            animation: "fadeUp 618ms 550ms both ease",
            marginBottom: "1rem",
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(11px, 1.4vmin, 13px)",
              color: "rgba(232,228,210,0.40)",
              letterSpacing: "0.15em",
              marginBottom: "0.618rem",
              fontWeight: 700,
            }}>THE FULL PICTURE</div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 2vmin, 19px)",
              color: "rgba(232,228,210,0.55)",
              lineHeight: 1.618,
              fontWeight: 300,
              margin: 0,
            }}>{card.advanced}</p>
          </div>
        )}

        {/* ═══ SIX SENSES ═══ */}
        {card.senses?.length > 0 && (
          <div style={{
            width: "100%",
            animation: "fadeUp 618ms 650ms both ease",
            marginBottom: "1rem",
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(11px, 1.4vmin, 13px)",
              color: `rgba(${rgb},0.45)`,
              letterSpacing: "0.15em",
              marginBottom: "0.618rem",
              fontWeight: 700,
              paddingLeft: "1.618rem",
            }}>SIX SENSES</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.618rem", padding: "0 1.618rem" }}>
              {card.senses.map((s) => (
                <div key={s.key} style={{
                  display: "flex", gap: "0.618rem", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(10px, 1.3vmin, 12px)",
                      color: `rgba(${rgb},0.45)`,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}>{s.sense}</span>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(15px, 2vmin, 19px)",
                      color: "rgba(232,228,210,0.60)",
                      lineHeight: 1.618,
                      margin: 0,
                    }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ EXPLORE FURTHER ═══ */}
        {card.links?.length > 0 && (
          <div style={{
            width: "100%",
            padding: "0 1.618rem",
            animation: "fadeUp 618ms 750ms both ease",
            marginBottom: "1rem",
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(11px, 1.4vmin, 13px)",
              color: `rgba(${rgb},0.45)`,
              letterSpacing: "0.15em",
              marginBottom: "0.618rem",
              fontWeight: 700,
            }}>EXPLORE FURTHER</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.382rem" }}>
              {card.links.map((link, li) => (
                <a key={li} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                  padding: "0.382rem 0.618rem",
                  border: `1px solid rgba(${rgb},0.18)`,
                  borderRadius: 4,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(12px, 1.5vmin, 14px)",
                  color: `rgba(${rgb},0.60)`,
                  textDecoration: "none",
                  fontWeight: 300,
                }}>{link.label} ↗</a>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MUSIC ═══ */}
        {card.songs?.length > 0 && (
          <div style={{
            width: "100%",
            padding: "0 1.618rem",
            animation: "fadeUp 618ms 850ms both ease",
            marginBottom: "1.618rem",
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(11px, 1.4vmin, 13px)",
              color: `rgba(${rgb},0.45)`,
              letterSpacing: "0.15em",
              marginBottom: "0.618rem",
              fontWeight: 700,
            }}>MUSIC</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
              {card.songs.map((song, si) => (
                <div key={si} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(14px, 1.8vmin, 17px)",
                  color: "rgba(232,228,210,0.50)",
                  fontWeight: 300,
                }}>♫ {song.title} — <span style={{ fontStyle: "italic" }}>{song.artist}</span></div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PREV / NEXT NAVIGATION ═══ */}
        <div style={{
          width: "100%",
          display: "flex", gap: "0.618rem",
          justifyContent: "space-between",
          padding: "0 1.618rem",
          marginTop: "1rem",
          animation: "fadeUp 618ms 900ms both ease",
        }}>
          {prevCard ? (
            <Link href={`/${doorSlug}/${topicSlug}/${prevCard.id}`} style={{
              flex: 1,
              padding: "1rem",
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: 6,
              textDecoration: "none",
              textAlign: "left",
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(10px, 1.2vmin, 12px)",
                color: `rgba(${rgb},0.40)`,
                letterSpacing: "0.08em",
                marginBottom: "0.236rem",
              }}>← PREVIOUS</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(13px, 1.6vmin, 16px)",
                color: `rgba(${rgb},0.70)`,
                fontWeight: 700,
              }}>{prevCard.icon} {prevCard.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {nextCard ? (
            <Link href={`/${doorSlug}/${topicSlug}/${nextCard.id}`} style={{
              flex: 1,
              padding: "1rem",
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: 6,
              textDecoration: "none",
              textAlign: "right",
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(10px, 1.2vmin, 12px)",
                color: `rgba(${rgb},0.40)`,
                letterSpacing: "0.08em",
                marginBottom: "0.236rem",
              }}>NEXT →</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(13px, 1.6vmin, 16px)",
                color: `rgba(${rgb},0.70)`,
                fontWeight: 700,
              }}>{nextCard.icon} {nextCard.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>

        {/* Back to topic + all doors */}
        <div style={{
          display: "flex", gap: "0.618rem", marginTop: "1.618rem",
          flexWrap: "wrap", justifyContent: "center",
          animation: "fadeUp 618ms 950ms both ease",
        }}>
          <Link href={`/${doorSlug}/${topicSlug}`} style={{
            padding: "12px 24px",
            border: `1px solid rgba(${rgb},0.25)`,
            borderRadius: 6,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(11px, 1.6vmin, 14px)",
            letterSpacing: "0.12em",
            fontWeight: 700,
            color: `rgba(${rgb},0.70)`,
            textDecoration: "none",
          }}>← {sub.name}</Link>
          <Link href={`/${doorSlug}`} style={{
            padding: "12px 24px",
            border: `1px solid rgba(${rgb},0.18)`,
            borderRadius: 6,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(11px, 1.6vmin, 14px)",
            letterSpacing: "0.12em",
            fontWeight: 700,
            color: `rgba(${rgb},0.50)`,
            textDecoration: "none",
          }}>{doorMeta.emoji} {doorMeta.name}</Link>
          <Link href="/search" style={{
            padding: "12px 24px",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 6,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(11px, 1.6vmin, 14px)",
            letterSpacing: "0.12em",
            fontWeight: 700,
            color: "rgba(201,168,76,0.50)",
            textDecoration: "none",
          }}>ALL DOORS</Link>
        </div>
      </div>
    </div>
  );
}
