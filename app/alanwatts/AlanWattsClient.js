'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import WatchLink from './WatchLink';

// The ideas data is loaded only when the By idea view is opened.
const IdeasView = dynamic(() => import('./IdeasView'), {
  ssr: false,
  loading: () => (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(232,232,240,0.70)', textAlign: 'center' }}>
      Loading ideas
    </p>
  ),
});
import { ALAN_WATTS_CATEGORIES, countLinkTypes, displayYear } from '@/lib/alanWattsData';

const GOLD = '201,168,76';
const PHI = 1.618;

/* ─── QUALITY DOTS ─────────────────────────────────────────────── */
function QualityDots({ quality }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: i <= quality
              ? `rgba(${GOLD},0.70)`
              : `rgba(${GOLD},0.15)`,
          }}
        />
      ))}
    </span>
  );
}

/* ─── LECTURE ROW ──────────────────────────────────────────────── */
function LectureRow({ lecture, index }) {
  const [open, setOpen] = useState(false);

  const isRecommended = lecture.notes?.includes('⭐');
  const isVerified = lecture.linkType === 'url';

  return (
    <div style={{
      borderBottom: `1px solid rgba(${GOLD},0.08)`,
    }}>
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'flex-start', gap: '0.618rem',
          padding: '0.854rem 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 200ms',
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.65rem, 1.2vmin + 0.1rem, 0.75rem)',
          color: `rgba(${GOLD},0.35)`,
          letterSpacing: '0.08em',
          minWidth: '1.8rem',
          paddingTop: '2px',
          flexShrink: 0,
        }}>{lecture.num}</span>

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(0.875rem, 1.8vmin + 0.1rem, 1.0rem)',
              color: isRecommended ? `rgba(${GOLD},0.95)` : `rgba(${GOLD},0.80)`,
              letterSpacing: '0.04em',
              lineHeight: 1.3,
            }}>{lecture.title}</span>
            {isRecommended && (
              <span style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.10em',
                color: `rgba(${GOLD},0.60)`,
                border: `1px solid rgba(${GOLD},0.25)`,
                padding: '1px 5px',
                borderRadius: '3px',
              }}>RECOMMENDED</span>
            )}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.618rem',
            marginTop: '0.25rem', flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.688rem, 1.3vmin + 0.1rem, 0.75rem)',
              color: 'rgba(232,232,240,0.30)',
            }}>{displayYear(lecture.year)} · {lecture.dur}{lecture.source ? ` · ${lecture.source}` : ''}</span>
            <QualityDots quality={lecture.quality} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: isVerified ? 'rgba(100,200,130,0.55)' : 'rgba(232,232,240,0.25)',
              letterSpacing: '0.06em',
            }}>{isVerified ? '▶ DIRECT LINK' : lecture.linkType === 'podcast' ? '🎙️ PODCAST' : '🔍 SEARCH'}</span>
          </div>
        </div>

        {/* Chevron */}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          color: `rgba(${GOLD},0.40)`,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 262ms var(--ease-snap)',
          flexShrink: 0,
          paddingTop: '3px',
        }}>▼</span>
      </button>

      {/* Expanded content */}
      {open && (
        <div style={{
          paddingBottom: '1rem',
          paddingLeft: '2.4rem',
        }}>
          {/* 3 Truths */}
          <div style={{ marginBottom: '0.854rem' }}>
            {lecture.truths.map((truth, ti) => (
              <div
                key={ti}
                style={{
                  display: 'flex', gap: '0.5rem',
                  marginBottom: '0.382rem',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{
                  color: `rgba(${GOLD},0.45)`,
                  fontSize: '0.65rem',
                  paddingTop: '3px',
                  flexShrink: 0,
                  fontFamily: 'var(--font-display)',
                }}>▸</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.813rem, 1.6vmin + 0.1rem, 0.938rem)',
                  color: 'rgba(232,232,240,0.75)',
                  lineHeight: 1.55,
                }}>{truth}</span>
              </div>
            ))}
          </div>

          {/* Notes + Link row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.618rem',
            flexWrap: 'wrap',
          }}>
            <WatchLink lecture={lecture} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.688rem',
              color: 'rgba(232,232,240,0.25)',
              fontStyle: 'italic',
            }}>{lecture.notes?.replace(' ⭐ Recommended', '').replace('⭐ Recommended', '')}</span>
          </div>
          {lecture.note && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'rgba(232,232,240,0.62)',
              margin: '0.618rem 0 0',
            }}>{lecture.note.charAt(0).toUpperCase() + lecture.note.slice(1)}.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── CATEGORY ACCORDION ───────────────────────────────────────── */
function CategoryAccordion({ cat, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const totalLectures = cat.lectures.length;

  return (
    <div style={{
      marginBottom: '0.618rem',
      border: `1px solid rgba(${GOLD},${open ? 0.20 : 0.10})`,
      borderRadius: '0.618rem',
      background: open
        ? 'rgba(201,168,76,0.03)'
        : 'rgba(255,255,255,0.01)',
      transition: 'all 300ms var(--ease-snap)',
      overflow: 'hidden',
    }}>
      {/* Category header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', gap: '0.854rem',
          padding: '1rem 1.236rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'clamp(1.25rem, 3vmin, 1.618rem)', lineHeight: 1, flexShrink: 0 }}>
          {cat.emoji}
        </span>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.618rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(1.0rem, 2.4vmin + 0.1rem, 1.25rem)',
              color: `rgba(${GOLD},${open ? 0.95 : 0.70})`,
              letterSpacing: '0.06em',
              transition: 'color 262ms',
            }}>{cat.num}. {cat.name}</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.65rem, 1.3vmin, 0.75rem)',
              color: `rgba(${GOLD},0.35)`,
              letterSpacing: '0.10em',
            }}>{totalLectures} lectures</span>
          </div>
          {!open && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.75rem, 1.5vmin + 0.1rem, 0.875rem)',
              color: 'rgba(232,232,240,0.40)',
              margin: '0.2rem 0 0',
              lineHeight: 1.4,
              fontStyle: 'italic',
            }}>{cat.theme}</p>
          )}
        </div>

        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          color: `rgba(${GOLD},0.40)`,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 300ms var(--ease-snap)',
          flexShrink: 0,
        }}>▼</span>
      </button>

      {/* Category body */}
      {open && (
        <div style={{ padding: '0 1.236rem 0.618rem' }}>
          {/* Theme line */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.813rem, 1.6vmin + 0.1rem, 0.938rem)',
            color: `rgba(${GOLD},0.45)`,
            fontStyle: 'italic',
            margin: '0 0 1rem',
            paddingBottom: '0.618rem',
            borderBottom: `1px solid rgba(${GOLD},0.10)`,
            lineHeight: 1.5,
          }}>{cat.theme}</p>

          {/* Lecture rows */}
          {cat.lectures.map((lecture, li) => (
            <LectureRow key={lecture.num} lecture={lecture} index={li} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
const VIEWS = [
  { id: 'category', label: 'By category' },
  { id: 'ideas', label: 'By idea' },
];

function ViewToggle({ view, onChange }) {
  return (
    <div
      role="group"
      aria-label="Choose a view"
      style={{
        display: 'flex', width: '100%', maxWidth: '22rem', margin: '0 auto',
        border: `1px solid rgba(${GOLD},0.35)`, borderRadius: '100px', padding: '3px',
      }}
    >
      {VIEWS.map(v => {
        const active = view === v.id;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(v.id)}
            style={{
              flex: 1, minHeight: '40px', borderRadius: '100px', border: 'none', cursor: 'pointer',
              background: active ? `rgba(${GOLD},0.18)` : 'transparent',
              fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: active ? 600 : 400,
              color: active ? `rgba(${GOLD},1)` : `rgba(${GOLD},0.80)`,
            }}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AlanWattsClient() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('category');

  // #ideas opens the By idea view directly.
  useEffect(() => {
    const sync = () => setView(window.location.hash === '#ideas' ? 'ideas' : 'category');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const changeView = next => {
    setView(next);
    const url = window.location.pathname + window.location.search + (next === 'ideas' ? '#ideas' : '');
    window.history.replaceState(null, '', url);
  };

  const totalLectures = ALAN_WATTS_CATEGORIES.reduce((sum, cat) => sum + cat.lectures.length, 0);
  const linkCounts = countLinkTypes();

  // Filter categories/lectures by search
  const filteredCats = search.length < 2
    ? ALAN_WATTS_CATEGORIES
    : ALAN_WATTS_CATEGORIES.map(cat => ({
        ...cat,
        lectures: cat.lectures.filter(l =>
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.truths.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
          cat.name.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.lectures.length > 0);

  return (
    <div
      className="phi-page"
      style={{
        background: `radial-gradient(ellipse at 50% 6%, rgba(${GOLD},0.05) 0%, #03030a 55%)`,
        paddingBottom: '4.236rem',
      }}
    >
      {/* Frosted header */}
      <div className="frosted-header" style={{ justifyContent: 'space-between', paddingRight: '1.618rem' }}>
        <Link href="/" style={{ pointerEvents: 'auto', textDecoration: 'none' }}>
          <span className="back-link">← BACK</span>
        </Link>
        <a
          href="https://alanwatts.org/real-alan-watts"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(0.65rem, 1.4vmin + 0.1rem, 0.75rem)',
            letterSpacing: '0.12em',
            color: `rgba(${GOLD},0.40)`,
            textDecoration: 'none',
            pointerEvents: 'auto',
            transition: 'color 200ms',
          }}
          onMouseEnter={e => e.currentTarget.style.color = `rgba(${GOLD},0.80)`}
          onMouseLeave={e => e.currentTarget.style.color = `rgba(${GOLD},0.40)`}
        >
          VERIFY REAL WATTS ↗
        </a>
      </div>

      {/* Content */}
      <div
        className="content-below-header"
        style={{ width: '100%', maxWidth: 'var(--content-max)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* View toggle */}
        <div style={{ width: '100%', padding: '0 16px', marginBottom: '1.618rem' }}>
          <ViewToggle view={view} onChange={changeView} />
        </div>
        {/* Header */}
        <div className="stagger-fade" style={{ textAlign: 'center', padding: '0 1.618rem 2rem', animationDelay: '100ms' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.688rem, 1.4vmin + 0.1rem, 0.812rem)',
            letterSpacing: '0.25em',
            color: `rgba(${GOLD},0.40)`,
            marginBottom: '0.618rem',
          }}>A VOICE FOR THE AGES</div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 8vmin + 0.25rem, 3.5rem)',
            letterSpacing: '0.04em',
            color: `rgba(${GOLD},0.95)`,
            textShadow: `0 0 0.618rem rgba(${GOLD},0.20)`,
            margin: '0 0 0.382rem',
            lineHeight: 1.1,
          }}>Alan Watts</h1>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.0rem, 2.2vmin + 0.1rem, 1.25rem)',
            color: 'rgba(232,232,240,0.45)',
            letterSpacing: '0.10em',
            marginBottom: '0.618rem',
          }}>1915 — 1973</div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1.8vmin + 0.1rem, 1.0rem)',
            color: 'rgba(232,232,240,0.50)',
            lineHeight: 1.65,
            maxWidth: '30rem',
            margin: '0 auto 1rem',
          }}>
            {totalLectures} lectures. 15 categories. 3 core truths per lecture.
            A complete map of one of the 20th century's most essential minds.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'rgba(232,232,240,0.70)',
            lineHeight: 1.6,
            maxWidth: '30rem',
            margin: '0 auto 0.618rem',
          }}>
            {linkCounts.url} direct links (checked Oct 2026) · {linkCounts.search} YouTube searches · {linkCounts.podcast} podcast episodes
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'rgba(232,232,240,0.62)',
            lineHeight: 1.6,
            maxWidth: '30rem',
            margin: '0 auto 1rem',
          }}>
            The three truths per lecture are paraphrases written with AI help, not quotes. Check anything you quote against the recording.
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.382rem',
            padding: '0.25rem 0.618rem',
            border: `1px solid rgba(${GOLD},0.15)`,
            borderRadius: '100px',
            fontFamily: 'var(--font-display)',
            fontSize: '0.688rem',
            letterSpacing: '0.12em',
            color: `rgba(${GOLD},0.35)`,
          }}>
            ▶ DIRECT LINKS &nbsp;·&nbsp; 🎙️ PODCAST &nbsp;·&nbsp; 🔍 SEARCH TERMS
          </div>
        </div>

        {view === 'ideas' && (
          <div style={{ width: '100%', marginBottom: '2.618rem' }}>
            <IdeasView />
          </div>
        )}

        {view === 'category' && (<>
        {/* Search bar */}
        <div className="stagger-fade" style={{
          width: '100%', padding: '0 1.618rem',
          marginBottom: '1.236rem',
          animationDelay: '200ms',
        }}>
          <input
            type="text"
            placeholder="Search titles, truths, categories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.618rem 1rem',
              background: `rgba(${GOLD},0.04)`,
              border: `1px solid rgba(${GOLD},${search ? 0.35 : 0.15})`,
              borderRadius: '0.382rem',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.8vmin + 0.1rem, 1.0rem)',
              color: `rgba(232,232,240,0.85)`,
              outline: 'none',
              transition: 'border-color 200ms',
              boxSizing: 'border-box',
            }}
          />
          {search.length >= 2 && (
            <div style={{
              marginTop: '0.382rem',
              fontFamily: 'var(--font-display)',
              fontSize: '0.688rem',
              letterSpacing: '0.10em',
              color: `rgba(${GOLD},0.40)`,
              paddingLeft: '0.25rem',
            }}>
              {filteredCats.reduce((s, c) => s + c.lectures.length, 0)} results across {filteredCats.length} categories
            </div>
          )}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'rgba(232,232,240,0.62)',
            lineHeight: 1.5,
            margin: '0.618rem 0 0',
            paddingLeft: '0.25rem',
          }}>
            T1 = official or estate source · T2 = major curator channel · T3 = fan upload. Dots = audio quality, 1 to 5.
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: '61.8%', height: 1, margin: '0 auto 1.618rem',
          background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.20), transparent)`,
        }} />

        {/* Category accordions */}
        <div className="stagger-fade" style={{
          width: '100%', padding: '0 1.618rem',
          animationDelay: '300ms',
        }}>
          {filteredCats.map((cat, ci) => (
            <CategoryAccordion
              key={cat.id}
              cat={cat}
              defaultOpen={false}
            />
          ))}
        </div>
        </>)}

        {/* Explore These Doors */}
        <div style={{
          width: '100%', padding: '0 1.618rem',
          marginBottom: '1.618rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.65rem, 1.3vmin, 0.75rem)',
            letterSpacing: '0.25em',
            color: `rgba(${GOLD},0.35)`,
          }}>EXPLORE THESE DOORS</div>
          <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/mysticism/oneness/ego-dissolution" className="btn-ghost" style={{ textDecoration: 'none' }}>EGO DISSOLUTION</Link>
            <Link href="/mysticism/meditation/zazen" className="btn-ghost" style={{ textDecoration: 'none' }}>ZAZEN</Link>
            <Link href="/mysticism/awakening/dark-night-soul" className="btn-ghost" style={{ textDecoration: 'none' }}>DARK NIGHT OF THE SOUL</Link>
            <Link href="/philosophy/language/limits-of-language" className="btn-ghost" style={{ textDecoration: 'none' }}>LIMITS OF LANGUAGE</Link>
            <Link href="/philosophy/timechange/present-moment" className="btn-ghost" style={{ textDecoration: 'none' }}>THE PRESENT MOMENT</Link>
            <Link href="/philosophy/timechange/impermanence" className="btn-ghost" style={{ textDecoration: 'none' }}>IMPERMANENCE</Link>
            <Link href="/philosophy/existence/void-as-potential" className="btn-ghost" style={{ textDecoration: 'none' }}>THE VOID AS POTENTIAL</Link>
            <Link href="/consciousness/identity/true-self" className="btn-ghost" style={{ textDecoration: 'none' }}>THE TRUE SELF</Link>
            <Link href="/consciousness/attention/flow-state" className="btn-ghost" style={{ textDecoration: 'none' }}>FLOW STATE</Link>
            <Link href="/mythology/trickster/divine-play-lila" className="btn-ghost" style={{ textDecoration: 'none' }}>DIVINE PLAY — LILA</Link>
            <Link href="/art/story/heros-journey" className="btn-ghost" style={{ textDecoration: 'none' }}>THE HERO&apos;S JOURNEY</Link>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          width: '100%', padding: '2.618rem 1.618rem 0',
          textAlign: 'center',
        }}>
          <div style={{
            width: '61.8%', height: 1, margin: '0 auto 1.618rem',
            background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.12), transparent)`,
          }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'rgba(232,232,240,0.25)',
            lineHeight: 1.6,
            maxWidth: '28rem',
            margin: '0 auto 0.618rem',
          }}>
            Compiled March 2026 · Cross-referenced Claude + Gemini research · 163 entries
            across 15 thematic categories. Avoid videos titled "AI remaster" by non-official
            channels. Trust: @OfficialAlanWattsOrg, Be Here Now Network, After Skool,
            True Meaning, Tragedy &amp; Hope.
          </p>
          <a
            href="https://alanwatts.org/real-alan-watts"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.688rem',
              letterSpacing: '0.12em',
              color: `rgba(${GOLD},0.30)`,
              textDecoration: 'none',
            }}
          >
            VERIFY REAL ALAN WATTS ↗
          </a>
        </div>
      </div>
    </div>
  );
}
