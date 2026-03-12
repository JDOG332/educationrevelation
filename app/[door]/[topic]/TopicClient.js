'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiCard from '@/components/WikiCard';
import SongRow from '@/components/SongRow';


/* ─── SECTION HEADER (shared style for GO DEEPER, SIX SENSES, etc.) ── */
function SectionLabel({ children, rgb }) {
  return (
    <div style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
      color: `rgba(${rgb},0.50)`,
      letterSpacing: "0.15em",
      marginBottom: "0.382rem",
      fontWeight: 700,
    }}>{children}</div>
  );
}


/* ─── ACTION BUTTON (SHARE / VIEW FULL) ───────────────────────── */
function ActionBtn({ children, icon, rgb, opacity = 0.65, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: `rgba(${rgb},0.04)`,
        border: `1px solid rgba(${rgb},0.22)`,
        borderRadius: "0.382rem",
        padding: "0.382rem 1rem",
        display: "flex", alignItems: "center", gap: "0.382rem",
        cursor: "pointer",
        transition: "all 382ms var(--ease-snap)",
        ...style,
      }}
    >
      <span style={{ fontSize: "1.375rem" }}>{icon}</span>
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
        letterSpacing: "0.10em",
        color: `rgba(${rgb},${opacity})`,
      }}>{children}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   CARD CONTENT (expandable topic card)
   ═══════════════════════════════════════════════════════════════ */
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
      borderRadius: "0.382rem",
      transition: "all 618ms var(--ease-snap)",
      animation: `fadeUp 618ms ${200 + index * 100}ms both ease`,
    }}>

      {/* Header — clickable */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div style={{
          display: "flex", alignItems: "center",
          gap: "0.618rem", marginBottom: "0.382rem",
        }}>
          <span style={{ fontSize: "2.618rem" }}>{card.icon}</span>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vmin + 0.2rem, 2.118rem)",
            color: `rgba(${rgb},0.90)`,
            margin: 0,
            letterSpacing: "0.02em",
          }}>{card.title}</h3>
        </div>
        {card.subtitle && (
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
            color: `rgba(${rgb},0.45)`,
            fontWeight: 300,
            letterSpacing: "0.06em",
            marginBottom: "0.618rem",
          }}>{card.subtitle}</div>
        )}
      </div>

      {/* Simple — always visible */}
      <p style={{
        fontFamily: "var(--font-accent)",
        fontSize: "clamp(1.5rem, 3.6vmin + 0.2rem, 2rem)",
        color: "rgba(232,228,210,0.75)",
        lineHeight: 1.618,
        marginTop: "0.618rem",
      }}>{card.simple}</p>

      {/* "More inside" indicator when collapsed */}
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "0.618rem",
            marginTop: "1rem",
            padding: "0.618rem",
            background: `rgba(${rgb},0.04)`,
            border: `1px dashed rgba(${rgb},0.22)`,
            borderRadius: "0.382rem",
            cursor: "pointer",
            transition: "all 382ms var(--ease-snap)",
          }}
        >
          <span style={{ fontSize: "1.125rem" }}>💡</span>
          <span style={{
            fontFamily: "var(--font-accent)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vmin + 0.15rem, 1.25rem)",
            color: `rgba(${rgb},0.50)`,
          }}>deeper intuition · full analysis · 6 senses · music · wikipedia</span>
        </div>
      )}

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
              borderRadius: "0 0.382rem 0.382rem 0",
            }}>
              <SectionLabel rgb={rgb}>GO DEEPER</SectionLabel>
              <p style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
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
              borderLeft: "3px solid rgba(232,228,210,0.12)",
              borderRadius: "0 0.382rem 0.382rem 0",
            }}>
              <SectionLabel rgb="232,228,210">THE FULL PICTURE</SectionLabel>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
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
              <SectionLabel rgb={rgb}>SIX SENSES</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
                {card.senses.map((s) => (
                  <div key={s.key} style={{
                    display: "flex", gap: "0.618rem", alignItems: "flex-start",
                    padding: "0.382rem 0",
                  }}>
                    <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                        color: `rgba(${rgb},0.45)`,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                      }}>{s.sense}</span>
                      <p style={{
                        fontFamily: "var(--font-accent)",
                        fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
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
              <SectionLabel rgb={rgb}>EXPLORE FURTHER</SectionLabel>
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
              <SectionLabel rgb={rgb}>MUSIC</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {card.songs.map((song, si) => (
                  <SongRow key={si} song={song} rgb={rgb} />
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
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
          letterSpacing: "0.10em",
          color: `rgba(${rgb},0.618)`,
          cursor: "pointer",
          userSelect: "none",
          transition: "color 382ms var(--ease-snap)",
        }}
      >
        <span>{expanded ? "▲ collapse" : "▼ tap to explore more"}</span>
      </div>

      {/* Divider between content and actions */}
      <div style={{
        width: "61.8%", height: 1,
        background: `linear-gradient(90deg, transparent, rgba(${rgb},0.18), transparent)`,
        margin: "1.618rem auto 1rem",
      }} />

      {/* Share + View full card */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "0.618rem",
      }}>
        <ActionBtn
          icon={shared ? "✓" : "↗"}
          rgb={rgb}
          opacity={shared ? 1.0 : 0.65}
          onClick={handleShare}
          style={shared ? {
            background: `rgba(${rgb},0.15)`,
            borderColor: `rgba(${rgb},0.618)`,
          } : {}}
        >{shared ? "COPIED" : "SHARE"}</ActionBtn>
        <Link href={`/${doorSlug}/${topicSlug}/${card.id}`} style={{ textDecoration: "none" }}>
          <ActionBtn icon="◎" rgb={rgb}>VIEW FULL</ActionBtn>
        </Link>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   TOPIC PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function TopicClient({ doorSlug, doorMeta, sub, cards }) {
  const rgb = sub.accent;

  return (
    <div className="phi-page" style={{
      background: `radial-gradient(ellipse at 50% 8%, rgba(${rgb},0.05) 0%, #03030a 50%)`,
      paddingBottom: "4.236rem",
    }}>

      {/* Frosted header */}
      <div className="frosted-header">
        <Link href={`/${doorSlug}`} style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span className="back-link">← BACK</span>
        </Link>
      </div>

      {/* Content */}
      <div className="content-below-header" style={{
        width: "100%", maxWidth: "var(--content-max)",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Topic icon */}
        <div className="stagger-fade" style={{
          fontSize: "clamp(3.5rem, 12vmin + 0.5rem, 5.236rem)",
          animationDelay: "100ms",
          marginBottom: "0.382rem",
        }}>{sub.icon}</div>

        {/* Topic name */}
        <h1 className="stagger-fade" style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(1.75rem, 5.4vmin + 0.25rem, 2.618rem)",
          letterSpacing: "0.15em",
          color: `rgba(${rgb},0.85)`,
          textAlign: "center",
          animationDelay: "150ms",
          marginBottom: "0.382rem",
          textShadow: `0 0 0.5rem rgba(${rgb},0.25)`,
          lineHeight: 1.1,
        }}>{sub.name.toUpperCase()}</h1>

        {/* Topic description */}
        <p className="stagger-fade" style={{
          fontFamily: "var(--font-accent)",
          fontStyle: "italic",
          fontSize: "clamp(1.5rem, 3.6vmin + 0.2rem, 2rem)",
          color: `rgba(${rgb},0.45)`,
          textAlign: "center",
          animationDelay: "200ms",
          marginBottom: "0.382rem",
          lineHeight: 1.618,
        }}>{sub.desc}</p>

        {/* Door breadcrumb */}
        <div className="stagger-fade" style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
          color: "rgba(201,168,76,0.30)",
          letterSpacing: "0.12em",
          marginBottom: "2rem",
          animationDelay: "250ms",
        }}>{doorMeta.emoji} {doorMeta.name} → {sub.name}</div>

        {/* Divider */}
        <div style={{
          width: "61.8%", height: 1, maxWidth: "12.5rem",
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
          <Link href={`/${doorSlug}`} className="btn-ghost" style={{
            borderColor: `rgba(${rgb},0.25)`,
            color: `rgba(${rgb},0.70)`,
            textDecoration: "none",
          }}>← {doorMeta.name}</Link>
          <Link href="/search" className="btn-ghost" style={{
            textDecoration: "none",
          }}>ALL DOORS</Link>
        </div>
      </div>
    </div>
  );
}
