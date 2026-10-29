'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import WatchLink from './WatchLink';
import { ALAN_WATTS_IDEAS, IDEA_THEMES, METHOD, IDEAS_SOURCE_URL } from '@/lib/alanWattsIdeas';
import { ALAN_WATTS_CATEGORIES } from '@/lib/alanWattsData';

const GOLD = '201,168,76';

const LECTURES = new Map(ALAN_WATTS_CATEGORIES.flatMap(c => c.lectures).map(l => [l.num, l]));
const MAX_COUNT = Math.max(...ALAN_WATTS_IDEAS.map(i => i.count));

const CARD_LABELS = {
  '/mysticism/oneness/ego-dissolution': 'Ego dissolution',
  '/consciousness/observer/nonduality-observer': 'Nonduality and the observer',
  '/mysticism/oneness/quantum-entanglement-unity': 'Entanglement and unity',
  '/consciousness/perception/observer-effect': 'The observer effect',
  '/philosophy/freewill/butterfly-effect': 'The butterfly effect',
  '/religion/goodevil/free-will': 'Free will',
  '/religion/goodevil/problem-of-evil': 'The problem of evil',
  '/consciousness/observer/flow-state-observer': 'Flow state',
  '/love/grief/golden-repair-kintsugi': 'Kintsugi, golden repair',
  '/mythology/hero': 'The hero',
  '/mythology/underworld/katabasis': 'Katabasis, the descent',
  '/planes': 'Planes',
  '/gonewiththewind': 'Gone with the wind',
  '/promises': 'Promises',
  '/poems/kaleidoscope-sea': 'Kaleidoscope sea',
};

const SORTS = [
  { id: 'most', label: 'Most mentioned' },
  { id: 'least', label: 'Least mentioned' },
  { id: 'az', label: 'A to Z' },
  { id: 'claims', label: 'Claims only' },
];

// Competition ranking (ties share a rank) over an already sorted list.
function withRanks(list) {
  let rank = 0;
  return list.map((idea, i) => {
    if (i === 0 || idea.count !== list[i - 1].count) rank = i + 1;
    return { idea, rank };
  });
}

const zeroLast = (a, b) => (a.count === 0) - (b.count === 0);

const CSS = `
.aw-ideas { width: 100%; padding: 0 clamp(16px, 4vw, 1.618rem); box-sizing: border-box; }
.aw-ideas *, .aw-ideas *::before, .aw-ideas *::after { box-sizing: border-box; }
.aw-ideas-input, .aw-ideas-select {
  width: 100%; min-height: 44px; padding: 0.618rem 1rem;
  background: rgba(${GOLD},0.04); border: 1px solid rgba(${GOLD},0.30); border-radius: 0.382rem;
  font-family: var(--font-body); font-size: 1rem; color: rgba(232,232,240,0.90); outline: none;
}
.aw-ideas-input:focus-visible, .aw-ideas-select:focus-visible, .aw-ideas-chip:focus-visible,
.aw-ideas-row:focus-visible, .aw-ideas-card:focus-visible, .aw-ideas summary:focus-visible {
  outline: 2px solid rgba(${GOLD},0.85); outline-offset: 2px;
}
.aw-ideas-select option { background: #03030a; color: #e8e8f0; }
.aw-ideas-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.aw-ideas-chip {
  min-height: 34px; padding: 0.3rem 0.6rem; border-radius: 100px; white-space: nowrap;
  border: 1px solid rgba(${GOLD},0.35); background: transparent; cursor: pointer;
  font-family: var(--font-body); font-size: 0.875rem; color: rgba(${GOLD},0.85);
}
@media (max-width: 420px) { .aw-ideas-chip { font-size: 0.8125rem; padding: 0.25rem 0.5rem; } }
.aw-ideas-chip[aria-pressed="true"] { background: rgba(${GOLD},0.16); border-color: rgba(${GOLD},0.80); color: rgba(${GOLD},1); }
.aw-ideas-list { list-style: none; margin: 0; padding: 0; }
.aw-ideas-item { border-bottom: 1px solid rgba(${GOLD},0.12); }
.aw-ideas-row {
  width: 100%; display: grid; grid-template-columns: 2.6rem 1fr; gap: 0.618rem;
  padding: 0.854rem 0; background: transparent; border: none; cursor: pointer; text-align: left; color: inherit;
}
.aw-ideas-rank { font-family: var(--font-display); font-weight: 700; font-size: 1rem; color: rgba(${GOLD},0.80); padding-top: 1px; }
.aw-ideas-sentence { display: block; font-family: var(--font-body); font-size: 0.9375rem; line-height: 1.55; color: rgba(232,232,240,0.88); margin: 0; }
.aw-ideas-meter { display: flex; align-items: center; gap: 0.618rem; margin-top: 0.5rem; }
.aw-ideas-bar { flex: 1; height: 3px; background: rgba(${GOLD},0.10); border-radius: 2px; overflow: hidden; }
.aw-ideas-bar > span { display: block; height: 100%; background: rgba(${GOLD},0.80); border-radius: 2px; }
.aw-ideas-count { font-family: var(--font-body); font-size: 0.875rem; color: rgba(${GOLD},0.85); white-space: nowrap; font-variant-numeric: tabular-nums; }
.aw-ideas-note { font-family: var(--font-body); font-size: 0.875rem; color: rgba(${GOLD},0.78); margin-top: 0.25rem; }
.aw-ideas-panel { padding: 0 0 1.236rem calc(2.6rem + 0.618rem); animation: aw-ideas-in 262ms var(--ease-snap); }
@keyframes aw-ideas-in { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 420px) { .aw-ideas-panel { padding-left: 0; } }
@media (prefers-reduced-motion: reduce) { .aw-ideas-panel { animation: none; } }
.aw-ideas-label { font-family: var(--font-body); font-size: 0.875rem; color: rgba(${GOLD},0.80); margin: 0 0 0.382rem; }
.aw-ideas-quote { font-family: var(--font-accent); font-style: italic; font-size: 1.25rem; line-height: 1.45; color: rgba(232,232,240,0.85); margin: 0 0 1rem; }
.aw-ideas-lecture { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; margin-bottom: 0.618rem; }
.aw-ideas-lecture-title { font-family: var(--font-display); font-weight: 700; font-size: 0.9375rem; color: rgba(${GOLD},0.88); }
.aw-ideas-card {
  display: inline-block; padding: 0.382rem 0.75rem; border-radius: 100px; text-decoration: none;
  border: 1px solid rgba(${GOLD},0.35); font-family: var(--font-body); font-size: 0.875rem; color: rgba(${GOLD},0.85);
}
.aw-ideas-card:hover, .aw-ideas-chip:hover { border-color: rgba(${GOLD},0.80); }
.aw-ideas summary { cursor: pointer; font-family: var(--font-body); font-size: 0.875rem; color: rgba(${GOLD},0.85); min-height: 32px; }
.aw-ideas-text { font-family: var(--font-body); font-size: 0.9375rem; line-height: 1.6; color: rgba(232,232,240,0.75); margin: 0; }
`;

function IdeaRow({ idea, rank, open, onToggle }) {
  const zero = idea.count === 0;
  const panelId = `idea-${idea.id}`;
  return (
    <li className="aw-ideas-item">
      <button type="button" className="aw-ideas-row" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span className="aw-ideas-rank">{zero ? '·' : rank}</span>
        <span style={{ minWidth: 0 }}>
          <span className="aw-ideas-sentence">{idea.sentence}</span>
          <span className="aw-ideas-meter">
            {zero ? (
              <span className="aw-ideas-count">not found in the transcripts</span>
            ) : (
              <>
                <span className="aw-ideas-bar" aria-hidden="true">
                  <span style={{ width: `${Math.max(1, (idea.count / MAX_COUNT) * 100)}%` }} />
                </span>
                <span className="aw-ideas-count">{idea.count} {idea.count === 1 ? 'passage' : 'passages'}</span>
              </>
            )}
          </span>
          {idea.subject && <span className="aw-ideas-note" style={{ display: 'block' }}>Counts the whole subject</span>}
        </span>
      </button>
      {open && (
        <div className="aw-ideas-panel" id={panelId}>
          {idea.quote && (
            <>
              <p className="aw-ideas-label">A passage that matched</p>
              <p className="aw-ideas-quote">&ldquo;&hellip;{idea.quote.replace(/^[\s.…]+|[\s.…]+$/g, '')}&hellip;&rdquo;</p>
            </>
          )}
          {idea.lectures.length > 0 && (
            <>
              <p className="aw-ideas-label">Lectures on this</p>
              {idea.lectures.map(num => {
                const lecture = LECTURES.get(num);
                if (!lecture) return null;
                return (
                  <div key={num} className="aw-ideas-lecture">
                    <span className="aw-ideas-lecture-title">{lecture.title}</span>
                    <WatchLink lecture={lecture} />
                  </div>
                );
              })}
            </>
          )}
          {idea.cards.length > 0 && (
            <>
              <p className="aw-ideas-label" style={{ marginTop: '0.854rem' }}>On this site</p>
              <div className="aw-ideas-chips">
                {idea.cards.map(path => (
                  <Link key={path} href={path} className="aw-ideas-card">{CARD_LABELS[path] || path}</Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </li>
  );
}

export default function IdeasView() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(null);
  const [sort, setSort] = useState('most');
  const [openId, setOpenId] = useState(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ALAN_WATTS_IDEAS.filter(i =>
      (!theme || i.theme === theme) &&
      (q.length < 2 || i.sentence.toLowerCase().includes(q) || i.quote.toLowerCase().includes(q) || i.theme.toLowerCase().includes(q))
    );
    if (sort === 'claims') {
      // Rank among claim ideas only, over all claims, then apply the filters.
      const claimRanks = new Map(withRanks(ALAN_WATTS_IDEAS.filter(i => !i.subject)).map(r => [r.idea.id, r.rank]));
      return list.filter(i => !i.subject).map(idea => ({ idea, rank: claimRanks.get(idea.id) }));
    }
    const ranked = list.map(idea => ({ idea, rank: idea.rank }));
    if (sort === 'least') ranked.sort((a, b) => zeroLast(a.idea, b.idea) || a.idea.count - b.idea.count || b.rank - a.rank);
    if (sort === 'az') ranked.sort((a, b) => zeroLast(a.idea, b.idea) || a.idea.sentence.localeCompare(b.idea.sentence));
    return ranked;
  }, [query, theme, sort]);

  return (
    <section className="aw-ideas" aria-labelledby="aw-ideas-heading">
      <style>{CSS}</style>

      <h2 id="aw-ideas-heading" style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(1.25rem, 3vmin + 0.5rem, 1.618rem)',
        color: `rgba(${GOLD},0.95)`, margin: '0 0 0.618rem', lineHeight: 1.25,
      }}>The ideas he came back to most</h2>

      <p className="aw-ideas-text" style={{ marginBottom: '0.382rem' }}>
        {ALAN_WATTS_IDEAS.length} ideas, ranked by how many passages of his transcribed lectures mention each one.{' '}
        <a href={IDEAS_SOURCE_URL} target="_blank" rel="noopener noreferrer" style={{ color: `rgba(${GOLD},0.88)` }}>
          Source transcripts ↗
        </a>
      </p>
      <details style={{ marginBottom: '1.236rem' }}>
        <summary>How the counting works</summary>
        <p className="aw-ideas-text" style={{ marginTop: '0.5rem' }}>{METHOD}</p>
      </details>

      <label htmlFor="aw-ideas-search" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Search ideas
      </label>
      <input
        id="aw-ideas-search"
        className="aw-ideas-input"
        type="search"
        placeholder="Search ideas and passages"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: '0.854rem' }}
      />

      <div className="aw-ideas-chips" role="group" aria-label="Filter by theme" style={{ marginBottom: '0.854rem' }}>
        {IDEA_THEMES.map(t => (
          <button
            key={t.name}
            type="button"
            className="aw-ideas-chip"
            aria-pressed={theme === t.name}
            onClick={() => setTheme(cur => (cur === t.name ? null : t.name))}
          >
            {t.name} <span style={{ opacity: 0.85 }}>{t.count}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.618rem', marginBottom: '0.854rem' }}>
        <label htmlFor="aw-ideas-sort" className="aw-ideas-label" style={{ margin: 0 }}>Sort</label>
        <select
          id="aw-ideas-sort"
          className="aw-ideas-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ width: 'auto', flex: '1 1 12rem', maxWidth: '20rem' }}
        >
          {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      <p className="aw-ideas-label" aria-live="polite" style={{ marginBottom: '0.382rem' }}>
        {rows.length} {rows.length === 1 ? 'idea' : 'ideas'}
        {sort === 'claims' ? ', ranked among claims only (subject-wide ideas left out)' : ''}
      </p>

      <ol className="aw-ideas-list">
        {rows.map(({ idea, rank }) => (
          <IdeaRow
            key={idea.id}
            idea={idea}
            rank={rank}
            open={openId === idea.id}
            onToggle={() => setOpenId(cur => (cur === idea.id ? null : idea.id))}
          />
        ))}
      </ol>
      {rows.length === 0 && <p className="aw-ideas-text">No ideas match. Try another word or clear the theme.</p>}
    </section>
  );
}
