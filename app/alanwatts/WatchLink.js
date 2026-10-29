'use client';

const GOLD = '201,168,76';

/* ─── LINK BUTTON ─────────────────────────────────────────────── */
export default function WatchLink({ lecture }) {
  const { linkType, link, title } = lecture;

  if (linkType === 'url') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.382rem',
          padding: '0.382rem 0.854rem',
          background: `rgba(${GOLD},0.08)`,
          border: `1px solid rgba(${GOLD},0.30)`,
          borderRadius: '0.382rem',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(0.688rem, 1.4vmin + 0.1rem, 0.812rem)',
          letterSpacing: '0.10em',
          color: `rgba(${GOLD},0.85)`,
          textDecoration: 'none',
          transition: 'all 262ms var(--ease-snap)',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `rgba(${GOLD},0.15)`;
          e.currentTarget.style.borderColor = `rgba(${GOLD},0.60)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = `rgba(${GOLD},0.08)`;
          e.currentTarget.style.borderColor = `rgba(${GOLD},0.30)`;
        }}
      >
        ▶ WATCH
      </a>
    );
  }

  if (linkType === 'podcast') {
    return (
      <a
        href="https://www.youtube.com/playlist?list=PLqGJSfj5N-pKxwOFjYC6bxQhTEWegGDdZ"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.382rem',
          padding: '0.382rem 0.854rem',
          background: 'rgba(180,140,220,0.08)',
          border: '1px solid rgba(180,140,220,0.30)',
          borderRadius: '0.382rem',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(0.688rem, 1.4vmin + 0.1rem, 0.812rem)',
          letterSpacing: '0.10em',
          color: 'rgba(180,140,220,0.85)',
          textDecoration: 'none',
          transition: 'all 262ms var(--ease-snap)',
          whiteSpace: 'nowrap',
        }}
        title={link}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(180,140,220,0.15)';
          e.currentTarget.style.borderColor = 'rgba(180,140,220,0.60)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(180,140,220,0.08)';
          e.currentTarget.style.borderColor = 'rgba(180,140,220,0.30)';
        }}
      >
        🎙️ {link}
      </a>
    );
  }

  // Search term
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(link)}`;
  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.382rem',
        padding: '0.382rem 0.854rem',
        background: 'rgba(100,160,220,0.08)',
        border: '1px solid rgba(100,160,220,0.25)',
        borderRadius: '0.382rem',
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(0.688rem, 1.4vmin + 0.1rem, 0.812rem)',
        letterSpacing: '0.10em',
        color: 'rgba(100,160,220,0.80)',
        textDecoration: 'none',
        transition: 'all 262ms var(--ease-snap)',
        whiteSpace: 'nowrap',
      }}
      title={`Search: "${link}"`}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(100,160,220,0.15)';
        e.currentTarget.style.borderColor = 'rgba(100,160,220,0.50)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(100,160,220,0.08)';
        e.currentTarget.style.borderColor = 'rgba(100,160,220,0.25)';
      }}
    >
      🔍 SEARCH
    </a>
  );
}
