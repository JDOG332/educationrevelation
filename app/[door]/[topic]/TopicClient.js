'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiCard from '@/components/WikiCard';
import SongRow from '@/components/SongRow';
import { autoParagraph } from '@/lib/paragraphs';


/* ─── SECTION LABEL ───────────────────────────────────────────── */
function SectionLabel({ children, rgb }) {
  return (
    <div style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
      color: `rgba(${rgb},0.75)`,
      letterSpacing: "0.15em",
      marginBottom: "0.382rem",
      fontWeight: 700,
    }}>{children}</div>
  );
}


/* ─── TAB PILL ────────────────────────────────────────────────── */
function TabPill({ icon, label, active, onClick, index = 0 }) {
  const [hover, setHover] = useState(false);

  const isLit = active || hover;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={!active ? "tab-pill-enter" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: "0.382rem",
        padding: "0.618rem 1rem",
        borderRadius: "100px",
        border: `1px solid rgba(var(--pill-rgb),${active ? 0.618 : hover ? 0.50 : 0.25})`,
        background: active
          ? "rgba(var(--pill-rgb),0.14)"
          : hover
            ? "rgba(var(--pill-rgb),0.08)"
            : "transparent",
        boxShadow: hover && !active
          ? "0 0 0.618rem rgba(var(--pill-rgb),0.15)"
          : active
            ? "0 0 0.618rem rgba(var(--pill-rgb),0.20)"
            : "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all 262ms var(--ease-snap)",
        transform: isLit ? "scale(1.04)" : "scale(1)",
        flexShrink: 0,
        WebkitTapHighlightColor: "transparent",
        animationDelay: `${index * 100}ms`,
      }}
    >
      <span style={{ fontSize: "1.125rem", lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(0.75rem, 1.6vmin + 0.12rem, 0.938rem)",
        letterSpacing: "0.08em",
        color: `rgba(var(--pill-rgb),${active ? 0.92 : hover ? 0.80 : 0.50})`,
        textTransform: "uppercase",
        transition: "color 262ms var(--ease-snap)",
      }}>{label}</span>
    </button>
  );
}


/* ─── ACTION BUTTON (SHARE / VIEW FULL) ───────────────────────── */
function ActionBtn({ children, icon, rgb, opacity = 0.55, onClick, style }) {
  return (
    <div onClick={onClick} style={{
      background: `rgba(${rgb},0.04)`,
      border: `1px solid rgba(${rgb},0.15)`,
      borderRadius: "0.382rem",
      padding: "0.382rem 1rem",
      display: "flex", alignItems: "center", gap: "0.382rem",
      cursor: "pointer",
      transition: "all 382ms var(--ease-snap)",
      ...style,
    }}>
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(0.75rem, 1.6vmin + 0.1rem, 0.938rem)",
        letterSpacing: "0.10em",
        color: `rgba(${rgb},${opacity})`,
      }}>{children}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   TAB CARD (one per topic card)
   ═══════════════════════════════════════════════════════════════ */
function CardContent({ card, rgb, index, doorSlug, topicSlug }) {
  const [activeTab, setActiveTab] = useState(null);
  const [shared, setShared] = useState(false);

  const cardUrl = `https://educationrevelation.com/${doorSlug}/${topicSlug}/${card.id}`;

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${card.icon} ${card.title}`,
          text: card.simple?.slice(0, 120) + '...',
          url: cardUrl,
        });
      } else {
        await navigator.clipboard.writeText(cardUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (e) {}
  };

  const toggle = (tab) => setActiveTab(activeTab === tab ? null : tab);

  // Build tab list dynamically based on what content exists
  const tabs = [];
  if (card.intuition) tabs.push({ key: "deeper", icon: "💡", label: "Deeper" });
  if (card.advanced)  tabs.push({ key: "full",   icon: "🔍", label: "Full Picture" });
  if (card.senses?.length > 0) tabs.push({ key: "senses", icon: "✨", label: "6 Senses" });
  if (card.songs?.length > 0)  tabs.push({ key: "music",  icon: "🎵", label: "Music" });
  if (card.links?.length > 0)  tabs.push({ key: "explore", icon: "📖", label: "Explore" });

  return (
    <div style={{
      "--pill-rgb": rgb,
      borderRadius: "0.382rem",
      overflow: "hidden",
      background: `rgba(${rgb},${activeTab ? 0.06 : 0.04})`,
      border: `1px solid rgba(${rgb},${activeTab ? 0.30 : 0.18})`,
      transition: "all 618ms var(--ease-snap)",
      animation: `fadeUp 618ms ${200 + index * 100}ms both ease`,
    }}>

      {/* Header */}
      <div style={{ padding: "1.618rem 1.618rem 0.382rem" }}>
        <div style={{
          display: "flex", alignItems: "center",
          gap: "0.618rem", marginBottom: "0.382rem",
        }}>
          <span style={{ fontSize: "2.618rem" }}>{card.icon}</span>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vmin + 0.2rem, 2.118rem)",
            color: `rgba(${rgb},0.90)`,
            margin: 0, letterSpacing: "0.02em",
          }}>{card.title}</h3>
        </div>
        {card.subtitle && (
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.125rem, 2.5vmin + 0.15rem, 1.375rem)",
            color: `rgba(${rgb},0.75)`,
            fontWeight: 300, letterSpacing: "0.04em",
          }}>{card.subtitle}</div>
        )}
      </div>

      {/* Simple — always visible */}
      <div style={{ padding: "0.618rem 1.618rem 1rem" }}>
        <p style={{
          fontFamily: "var(--font-accent)",
          fontSize: "clamp(1.375rem, 3.2vmin + 0.2rem, 1.75rem)",
          color: "rgba(232,228,210,0.92)",
          lineHeight: 1.618, margin: 0,
        }}>{card.simple}</p>
      </div>

      {/* Tab pills — always visible, wrap on mobile */}
      {tabs.length > 0 && (
        <div style={{
          padding: "0 1.618rem 0.618rem",
        }}>
          <div style={{
            display: "flex", gap: "0.618rem",
            flexWrap: "wrap",
          }}>
            {tabs.map((t, ti) => (
              <TabPill key={t.key} icon={t.icon} label={t.label}
                active={activeTab === t.key} index={ti}
                onClick={() => toggle(t.key)} />
            ))}
          </div>
        </div>
      )}

      {/* Tab content — one section at a time */}
      {activeTab && (
        <div key={activeTab} style={{
          padding: "0 1.618rem 1rem",
          animation: "fadeUp 382ms var(--ease-out) both",
        }}>

          {activeTab === "deeper" && card.intuition && (
            <div style={{
              padding: "1rem",
              background: `rgba(${rgb},0.04)`,
              borderLeft: `3px solid rgba(${rgb},0.30)`,
              borderRadius: "0 0.382rem 0.382rem 0",
            }}>
              <SectionLabel rgb={rgb}>GO DEEPER</SectionLabel>
              {autoParagraph(card.intuition, 4).map((para, pi) => (
                <p key={pi} style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.125rem, 2.6vmin + 0.12rem, 1.5rem)",
                  color: "rgba(232,228,210,0.85)",
                  lineHeight: 1.618, fontWeight: 300,
                  margin: 0,
                  marginBottom: pi < autoParagraph(card.intuition, 4).length - 1 ? "1rem" : 0,
                }}>{para}</p>
              ))}
            </div>
          )}

          {activeTab === "full" && card.advanced && (
            <div style={{
              padding: "1rem",
              background: "rgba(232,228,210,0.02)",
              borderLeft: "3px solid rgba(232,228,210,0.12)",
              borderRadius: "0 0.382rem 0.382rem 0",
            }}>
              <SectionLabel rgb="232,228,210">THE FULL PICTURE</SectionLabel>
              {autoParagraph(card.advanced, 4).map((para, pi) => (
                <p key={pi} style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.125rem, 2.6vmin + 0.12rem, 1.5rem)",
                  color: "rgba(232,228,210,0.82)",
                  lineHeight: 1.618, fontWeight: 300,
                  margin: 0,
                  marginBottom: pi < autoParagraph(card.advanced, 4).length - 1 ? "1rem" : 0,
                }}>{para}</p>
              ))}
            </div>
          )}

          {activeTab === "senses" && card.senses?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
              {card.senses.map((s) => (
                <div key={s.key} style={{
                  display: "flex", gap: "0.618rem", alignItems: "flex-start",
                  padding: "0.382rem 0",
                }}>
                  <span style={{ fontSize: "1.618rem", flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.875rem, 1.8vmin + 0.1rem, 1.125rem)",
                      color: `rgba(${rgb},0.72)`,
                      fontWeight: 600, letterSpacing: "0.06em",
                      display: "block", marginBottom: "0.146rem",
                    }}>{s.sense}</span>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1rem, 2.2vmin + 0.1rem, 1.25rem)",
                      color: "rgba(232,228,210,0.85)",
                      lineHeight: 1.618, fontWeight: 300,
                    }}>{s.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "music" && card.songs?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {card.songs.map((song, si) => (
                <SongRow key={si} song={song} rgb={rgb} />
              ))}
            </div>
          )}

          {activeTab === "explore" && card.links?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.382rem" }}>
              {card.links.map((link, li) => (
                <WikiCard key={li} label={link.label} url={link.url} rgb={rgb} index={li} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Divider + actions */}
      <div style={{
        width: "61.8%", height: 1,
        background: `linear-gradient(90deg, transparent, rgba(${rgb},0.12), transparent)`,
        margin: "0.382rem auto",
      }} />

      <div style={{
        display: "flex", justifyContent: "center", gap: "0.618rem",
        padding: "0 1.618rem 1.618rem",
      }}>
        <ActionBtn icon={shared ? "✓" : "↗"} rgb={rgb}
          opacity={shared ? 1.0 : 0.55}
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
          fontFamily: "var(--font-display)", fontWeight: 900,
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
          fontFamily: "var(--font-accent)", fontStyle: "italic",
          fontSize: "clamp(1.5rem, 3.6vmin + 0.2rem, 2rem)",
          color: `rgba(${rgb},0.72)`,
          textAlign: "center",
          animationDelay: "200ms",
          marginBottom: "0.382rem",
          lineHeight: 1.618,
        }}>{sub.desc}</p>

        {/* Breadcrumb */}
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
          gap: "0.618rem", width: "100%",
        }}>
          {cards.map((card, i) => (
            <CardContent key={card.id} card={card} rgb={rgb} index={i}
              doorSlug={doorSlug} topicSlug={sub.id} />
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
