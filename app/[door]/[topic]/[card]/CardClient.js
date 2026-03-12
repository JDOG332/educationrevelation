'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiCard from '@/components/WikiCard';
import SongRow from '@/components/SongRow';


/* ─── SECTION HEADER ──────────────────────────────────────────── */
function SectionLabel({ children, rgb }) {
  return (
    <div style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
      color: `rgba(${rgb},0.75)`,
      letterSpacing: "0.15em",
      marginBottom: "0.618rem",
      fontWeight: 700,
    }}>{children}</div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   INDIVIDUAL CARD PAGE (1 of 1,001)
   ═══════════════════════════════════════════════════════════════ */
export default function CardClient({ card, sub, doorMeta, doorSlug, topicSlug, prevCard, nextCard }) {
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
    } catch (e) {}
  };

  return (
    <div className="phi-page" style={{
      background: `radial-gradient(ellipse at 50% 8%, rgba(${rgb},0.06) 0%, #03030a 50%)`,
      paddingBottom: "4.236rem",
    }}>

      {/* Frosted header — with SHARE button on right */}
      <div className="frosted-header" style={{
        justifyContent: "space-between",
        paddingRight: "1.618rem",
      }}>
        <Link href={`/${doorSlug}/${topicSlug}`} style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span className="back-link">← BACK</span>
        </Link>

        {/* Share button */}
        <button
          onClick={handleShare}
          style={{
            pointerEvents: "auto",
            background: shared ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.06)`,
            border: `1px solid rgba(${rgb},${shared ? 0.618 : 0.30})`,
            borderRadius: "0.382rem",
            padding: "0.382rem 1.25rem",
            display: "flex", alignItems: "center", gap: "0.382rem",
            cursor: "pointer",
            transition: "all 382ms var(--ease-snap)",
          }}
        >
          <span style={{ fontSize: "clamp(1.5rem, 3.6vmin + 0.15rem, 2rem)" }}>
            {shared ? "✓" : "↗"}
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.125rem, 2.4vmin + 0.15rem, 1.375rem)",
            letterSpacing: "0.12em",
            color: `rgba(${rgb},${shared ? 1.0 : 0.80})`,
          }}>{shared ? "COPIED" : "SHARE"}</span>
        </button>
      </div>

      {/* Content */}
      <div className="content-below-header" style={{
        width: "100%", maxWidth: "var(--content-max)",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Breadcrumb */}
        <div className="stagger-fade" style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
          color: "rgba(201,168,76,0.30)",
          letterSpacing: "0.12em",
          marginBottom: "1rem",
          animationDelay: "100ms",
          textAlign: "center",
        }}>{doorMeta.emoji} {doorMeta.name} → {sub.name}</div>

        {/* Card icon */}
        <div className="stagger-fade" style={{
          fontSize: "clamp(3.5rem, 12vmin + 0.5rem, 5.236rem)",
          animationDelay: "150ms",
          marginBottom: "0.618rem",
        }}>{card.icon}</div>

        {/* Card title */}
        <h1 className="stagger-fade" style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2.25rem, 6.854vmin + 0.25rem, 3.25rem)",
          letterSpacing: "0.06em",
          color: `rgba(${rgb},0.90)`,
          textAlign: "center",
          animationDelay: "200ms",
          marginBottom: "0.382rem",
          textShadow: `0 0 0.5rem rgba(${rgb},0.25)`,
          lineHeight: 1.1,
        }}>{card.title}</h1>

        {/* Subtitle */}
        {card.subtitle && (
          <div className="stagger-fade" style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.5rem, 3.6vmin + 0.2rem, 2rem)",
            color: `rgba(${rgb},0.75)`,
            fontWeight: 300,
            letterSpacing: "0.06em",
            marginBottom: "1rem",
            animationDelay: "250ms",
            textAlign: "center",
          }}>{card.subtitle}</div>
        )}

        {/* Divider */}
        <div className="stagger-fade" style={{
          width: "61.8%", height: 1, maxWidth: "12.5rem",
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.30), transparent)`,
          marginBottom: "1.618rem",
          animationDelay: "300ms",
        }} />

        {/* ═══ SIMPLE ═══ (Cormorant — short poetic first impression) */}
        <div className="stagger-fade" style={{
          width: "100%",
          padding: "1.618rem",
          animationDelay: "350ms",
          marginBottom: "1rem",
        }}>
          <p style={{
            fontFamily: "var(--font-accent)",
            fontSize: "clamp(1.75rem, 5.4vmin + 0.2rem, 2.5rem)",
            color: "rgba(232,228,210,0.92)",
            lineHeight: 1.618,
            margin: 0,
            textAlign: "center",
          }}>{card.simple}</p>
        </div>

        {/* ═══ GO DEEPER ═══ (Inter for readability) */}
        {card.intuition && (
          <div className="stagger-fade" style={{
            width: "100%",
            padding: "1.618rem",
            background: `rgba(${rgb},0.04)`,
            borderLeft: `3px solid rgba(${rgb},0.30)`,
            borderRadius: "0 0.382rem 0.382rem 0",
            animationDelay: "450ms",
            marginBottom: "1rem",
          }}>
            <SectionLabel rgb={rgb}>GO DEEPER</SectionLabel>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
              color: "rgba(232,228,210,0.85)",
              lineHeight: 1.618,
              fontWeight: 300,
              margin: 0,
            }}>{card.intuition}</p>
          </div>
        )}

        {/* ═══ FULL PICTURE ═══ */}
        {card.advanced && (
          <div className="stagger-fade" style={{
            width: "100%",
            padding: "1.618rem",
            background: "rgba(232,228,210,0.02)",
            borderLeft: "3px solid rgba(232,228,210,0.12)",
            borderRadius: "0 0.382rem 0.382rem 0",
            animationDelay: "550ms",
            marginBottom: "1rem",
          }}>
            <SectionLabel rgb="232,228,210">THE FULL PICTURE</SectionLabel>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
              color: "rgba(232,228,210,0.82)",
              lineHeight: 1.618,
              fontWeight: 300,
              margin: 0,
            }}>{card.advanced}</p>
          </div>
        )}

        {/* ═══ SIX SENSES ═══ */}
        {card.senses?.length > 0 && (
          <div className="stagger-fade" style={{
            width: "100%",
            animationDelay: "650ms",
            marginBottom: "1rem",
          }}>
            <div style={{ paddingLeft: "1.618rem" }}>
              <SectionLabel rgb={rgb}>SIX SENSES</SectionLabel>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.618rem", padding: "0 1.618rem" }}>
              {card.senses.map((s) => (
                <div key={s.key} style={{
                  display: "flex", gap: "0.618rem", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "2.118rem", flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                      color: `rgba(${rgb},0.72)`,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}>{s.sense}</span>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
                      color: "rgba(232,228,210,0.85)",
                      lineHeight: 1.618,
                      fontWeight: 300,
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
          <div className="stagger-fade" style={{
            width: "100%",
            padding: "0 1.618rem",
            animationDelay: "750ms",
            marginBottom: "1rem",
          }}>
            <SectionLabel rgb={rgb}>EXPLORE FURTHER</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
              {card.links.map((link, li) => (
                <WikiCard key={li} label={link.label} url={link.url} rgb={rgb} index={li} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ MUSIC ═══ */}
        {card.songs?.length > 0 && (
          <div className="stagger-fade" style={{
            width: "100%",
            padding: "0 1.618rem",
            animationDelay: "850ms",
            marginBottom: "1.618rem",
          }}>
            <SectionLabel rgb={rgb}>MUSIC</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {card.songs.map((song, si) => (
                <SongRow key={si} song={song} rgb={rgb} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ PREV / NEXT NAVIGATION ═══ */}
        <div className="stagger-fade" style={{
          width: "100%",
          display: "flex", gap: "0.618rem",
          justifyContent: "space-between",
          padding: "0 1.618rem",
          marginTop: "1rem",
          animationDelay: "900ms",
        }}>
          {prevCard ? (
            <Link href={`/${doorSlug}/${topicSlug}/${prevCard.id}`} style={{
              flex: 1,
              padding: "1rem",
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: "0.382rem",
              textDecoration: "none",
              textAlign: "left",
            }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.50)`,
                letterSpacing: "0.08em",
                marginBottom: "0.236rem",
              }}>← PREVIOUS</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.75)`,
                fontWeight: 700,
              }}>{prevCard.icon} {prevCard.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {nextCard ? (
            <Link href={`/${doorSlug}/${topicSlug}/${nextCard.id}`} style={{
              flex: 1,
              padding: "1rem",
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: "0.382rem",
              textDecoration: "none",
              textAlign: "right",
            }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.50)`,
                letterSpacing: "0.08em",
                marginBottom: "0.236rem",
              }}>NEXT →</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.75)`,
                fontWeight: 700,
              }}>{nextCard.icon} {nextCard.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>

        {/* Back to topic + door + all doors */}
        <div className="stagger-fade" style={{
          display: "flex", gap: "0.618rem", marginTop: "1.618rem",
          flexWrap: "wrap", justifyContent: "center",
          animationDelay: "950ms",
        }}>
          <Link href={`/${doorSlug}/${topicSlug}`} className="btn-ghost" style={{
            borderColor: `rgba(${rgb},0.25)`,
            color: `rgba(${rgb},0.70)`,
            textDecoration: "none",
          }}>← {sub.name}</Link>
          <Link href={`/${doorSlug}`} className="btn-ghost" style={{
            borderColor: `rgba(${rgb},0.18)`,
            color: `rgba(${rgb},0.60)`,
            textDecoration: "none",
          }}>{doorMeta.emoji} {doorMeta.name}</Link>
          <Link href="/search" className="btn-ghost" style={{
            textDecoration: "none",
          }}>ALL DOORS</Link>
        </div>
      </div>
    </div>
  );
}
