'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiCard from '@/components/WikiCard';
import SongRow from '@/components/SongRow';


/* ─── SECTION LABEL ───────────────────────────────────────────── */
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
        display: "flex", alignItems: "center", gap: "0.236rem",
        padding: "0.382rem 0.618rem",
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
      <span style={{ fontSize: "0.875rem", lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(0.618rem, 1.2vmin + 0.1rem, 0.75rem)",
        letterSpacing: "0.08em",
        color: `rgba(var(--pill-rgb),${active ? 0.92 : hover ? 0.80 : 0.50})`,
        textTransform: "uppercase",
        transition: "color 262ms var(--ease-snap)",
      }}>{label}</span>
    </button>
  );
}


/* ═══════════════════════════════════════════════════════════════
   INDIVIDUAL CARD PAGE (1 of 1,001) — TAB SYSTEM
   ═══════════════════════════════════════════════════════════════ */
export default function CardClient({ card, sub, doorMeta, doorSlug, topicSlug, prevCard, nextCard }) {
  const [shared, setShared] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const rgb = sub.accent;

  const shareUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://educationrevelation.com/${doorSlug}/${topicSlug}/${card.id}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${card.icon} ${card.title}`,
          text: card.simple?.slice(0, 120) + '...',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (e) {}
  };

  const toggle = (tab) => setActiveTab(activeTab === tab ? null : tab);

  // Build tabs dynamically
  const tabs = [];
  if (card.intuition) tabs.push({ key: "deeper", icon: "💡", label: "Deeper" });
  if (card.advanced)  tabs.push({ key: "full",   icon: "🔍", label: "Full Picture" });
  if (card.senses?.length > 0) tabs.push({ key: "senses", icon: "✨", label: "6 Senses" });
  if (card.songs?.length > 0)  tabs.push({ key: "music",  icon: "🎵", label: "Music" });
  if (card.links?.length > 0)  tabs.push({ key: "explore", icon: "📖", label: "Explore" });

  return (
    <div className="phi-page" style={{
      "--pill-rgb": rgb,
      background: `radial-gradient(ellipse at 50% 8%, rgba(${rgb},0.06) 0%, #03030a 50%)`,
      paddingBottom: "4.236rem",
    }}>

      {/* Frosted header — with SHARE button */}
      <div className="frosted-header" style={{
        justifyContent: "space-between",
        paddingRight: "1.618rem",
      }}>
        <Link href={`/${doorSlug}/${topicSlug}`} style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span className="back-link">← BACK</span>
        </Link>

        <button onClick={handleShare} style={{
          pointerEvents: "auto",
          background: shared ? `rgba(${rgb},0.15)` : `rgba(${rgb},0.06)`,
          border: `1px solid rgba(${rgb},${shared ? 0.618 : 0.30})`,
          borderRadius: "0.382rem",
          padding: "0.382rem 1.25rem",
          display: "flex", alignItems: "center", gap: "0.382rem",
          cursor: "pointer",
          transition: "all 382ms var(--ease-snap)",
        }}>
          <span style={{ fontSize: "clamp(1.5rem, 3.6vmin + 0.15rem, 2rem)" }}>
            {shared ? "✓" : "↗"}
          </span>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
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
          fontFamily: "var(--font-display)", fontWeight: 900,
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
            fontWeight: 300, letterSpacing: "0.06em",
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

        {/* Simple */}
        <div className="stagger-fade" style={{
          width: "100%", padding: "1.618rem",
          animationDelay: "350ms",
          marginBottom: "0.618rem",
        }}>
          <p style={{
            fontFamily: "var(--font-accent)",
            fontSize: "clamp(1.75rem, 5.4vmin + 0.2rem, 2.5rem)",
            color: "rgba(232,228,210,0.92)",
            lineHeight: 1.618, margin: 0, textAlign: "center",
          }}>{card.simple}</p>
        </div>

        {/* Tab pills */}
        {tabs.length > 0 && (
          <div className="stagger-fade" style={{
            width: "100%",
            padding: "0 1.618rem 0.618rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            animationDelay: "450ms",
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              display: "flex", gap: "0.382rem",
              minWidth: "min-content",
            }}>
              {tabs.map((t, ti) => (
                <TabPill key={t.key} icon={t.icon} label={t.label}
                  active={activeTab === t.key} index={ti}
                  onClick={() => toggle(t.key)} />
              ))}
            </div>
          </div>
        )}

        {/* Tab content */}
        {activeTab && (
          <div key={activeTab} style={{
            width: "100%", padding: "0 1.618rem 1rem",
            animation: "fadeUp 382ms var(--ease-out) both",
          }}>

            {activeTab === "deeper" && card.intuition && (
              <div style={{
                padding: "1.618rem",
                background: `rgba(${rgb},0.04)`,
                borderLeft: `3px solid rgba(${rgb},0.30)`,
                borderRadius: "0 0.382rem 0.382rem 0",
              }}>
                <SectionLabel rgb={rgb}>GO DEEPER</SectionLabel>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
                  color: "rgba(232,228,210,0.85)",
                  lineHeight: 1.618, fontWeight: 300, margin: 0,
                }}>{card.intuition}</p>
              </div>
            )}

            {activeTab === "full" && card.advanced && (
              <div style={{
                padding: "1.618rem",
                background: "rgba(232,228,210,0.02)",
                borderLeft: "3px solid rgba(232,228,210,0.12)",
                borderRadius: "0 0.382rem 0.382rem 0",
              }}>
                <SectionLabel rgb="232,228,210">THE FULL PICTURE</SectionLabel>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
                  color: "rgba(232,228,210,0.82)",
                  lineHeight: 1.618, fontWeight: 300, margin: 0,
                }}>{card.advanced}</p>
              </div>
            )}

            {activeTab === "senses" && card.senses?.length > 0 && (
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
                        fontWeight: 600, letterSpacing: "0.08em",
                        display: "block", marginBottom: "0.146rem",
                      }}>{s.sense}</span>
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(1.375rem, 3vmin + 0.2rem, 1.75rem)",
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

        {/* Prev / Next Navigation */}
        <div className="stagger-fade" style={{
          width: "100%",
          display: "flex", gap: "0.618rem",
          justifyContent: "space-between",
          padding: "0 1.618rem",
          marginTop: "1.618rem",
          animationDelay: "550ms",
        }}>
          {prevCard ? (
            <Link href={`/${doorSlug}/${topicSlug}/${prevCard.id}`} style={{
              flex: 1, padding: "1rem",
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: "0.382rem",
              textDecoration: "none", textAlign: "left",
            }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.50)`,
                letterSpacing: "0.08em", marginBottom: "0.236rem",
              }}>← PREVIOUS</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.75)`, fontWeight: 700,
              }}>{prevCard.icon} {prevCard.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {nextCard ? (
            <Link href={`/${doorSlug}/${topicSlug}/${nextCard.id}`} style={{
              flex: 1, padding: "1rem",
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: "0.382rem",
              textDecoration: "none", textAlign: "right",
            }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.50)`,
                letterSpacing: "0.08em", marginBottom: "0.236rem",
              }}>NEXT →</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.6vmin + 0.15rem, 1.5rem)",
                color: `rgba(${rgb},0.75)`, fontWeight: 700,
              }}>{nextCard.icon} {nextCard.title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>

        {/* Bottom nav */}
        <div className="stagger-fade" style={{
          display: "flex", gap: "0.618rem", marginTop: "1.618rem",
          flexWrap: "wrap", justifyContent: "center",
          animationDelay: "618ms",
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
