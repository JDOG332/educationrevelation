'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { TEN_DOORS, classifyContent } from '@/lib/tenDoors';
import { ALL_DOOR_SLUGS } from '@/lib/doorMap';
import f from './filter.module.css';

// Door name to its page slug (/love, /science, ...). Only slugs that exist.
function slugFor(door) {
  const slug = door.name.toLowerCase();
  return ALL_DOOR_SLUGS.includes(slug) ? slug : null;
}

export default function FilterClient() {
  const [text, setText] = useState('');

  const results = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;
    const scored = classifyContent(trimmed);
    if (scored.every((r) => r.score === 0)) return { empty: true, rows: [] };
    // Keep the doors in their fixed order so the bars don't jump around.
    const byName = new Map(scored.map((r) => [r.door.name, r]));
    const top = scored[0];
    return {
      empty: false,
      top,
      rows: TEN_DOORS.map((d) => byName.get(d.name)),
    };
  }, [text]);

  return (
    <div className={f.tool}>
      <label htmlFor="golden-filter-input" className={f.label}>
        Paste a sentence, a worry, a question
      </label>
      <textarea
        id="golden-filter-input"
        className={`phi-search-input ${f.input}`}
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="I keep wondering whether anyone really sees me."
      />

      <div aria-live="polite" className={f.out}>
        {!results && <p className={f.hint}>The ten doors will light up as you type.</p>}

        {results?.empty && (
          <p className={f.hint}>No door caught that yet. Try a few more words.</p>
        )}

        {results && !results.empty && (
          <>
            <p className={f.topLine}>
              This passes most through the door of{' '}
              <span className={f.topName}>{results.top.door.name}</span>.
            </p>
            <p className={f.question}>{results.top.door.question}</p>

            <ul className={f.bars}>
              {results.rows.map((r) => {
                const isTop = r.door.name === results.top.door.name;
                const pct = Math.round(r.pct);
                return (
                  <li key={r.door.name} className={isTop ? `${f.row} ${f.rowTop}` : f.row}>
                    <span className={f.rowName}>
                      <span aria-hidden="true">{r.door.emoji}</span> {r.door.name}
                    </span>
                    <span className={f.track} aria-hidden="true">
                      <span className={f.fill} style={{ width: `${pct}%` }} />
                    </span>
                    <span className={f.pct}>{pct}%</span>
                  </li>
                );
              })}
            </ul>

            {slugFor(results.top.door) && (
              <Link href={`/${slugFor(results.top.door)}`} className="btn-ghost" style={{ fontSize: '0.9375rem', alignSelf: 'flex-start' }}>
                Open the {results.top.door.name.toLowerCase()} door
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
