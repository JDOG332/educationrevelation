'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SEFIROT, PATHS, FLASH, PILLARS } from '@/lib/content/tree';
import { DOOR_META } from '@/lib/subcategories';
import { SLUG_TO_KEY } from '@/lib/doorMap';
import { prefersReducedMotion } from '@/lib/motion';

const W = 380, H = 840;
const GOLD = '201,168,76';
const R = 31;

const DOOR_COLOR = {
  love: '220,160,160', mysticism: '190,140,220', consciousness: '200,200,230', religion: '201,168,76',
  art: '224,120,100', nature: '120,180,100', mythology: '200,160,100', philosophy: '150,180,220',
  science: '79,195,247', mathematics: '232,213,160',
};

export default function TreeClient() {
  const [active, setActive] = useState(null);
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(prefersReducedMotion()); }, []);

  const byN = useMemo(() => Object.fromEntries(SEFIROT.map((s) => [s.n, s])), []);
  const pt = (s) => [s.x * W, s.y * H];

  // The lightning flash as one polyline, drawn on with stroke-dashoffset
  const flashPoints = FLASH.map((n) => pt(byN[n]).join(',')).join(' ');
  const flashLength = useMemo(() => {
    let L = 0;
    for (let i = 1; i < FLASH.length; i++) {
      const [ax, ay] = pt(byN[FLASH[i - 1]]); const [bx, by] = pt(byN[FLASH[i]]);
      L += Math.hypot(bx - ax, by - ay);
    }
    return L;
  }, [byN]);

  const sel = active ? byN[active] : null;
  const selMeta = sel ? DOOR_META[SLUG_TO_KEY[sel.door]] : null;

  return (
    <div className="tree">
      <style>{`
        .tree { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
        .tree svg { width: 100%; max-width: 30rem; height: auto; display: block; overflow: visible; }
        .tree-path { stroke: rgba(${GOLD},0.28); stroke-width: 1.6; fill: none; transition: stroke 262ms var(--ease-snap); }
        .tree-path.lit { stroke: rgba(${GOLD},0.9); stroke-width: 2.2; }
        .tree-flash { fill: none; stroke: rgba(232,213,160,0.95); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round;
          stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: treeFlash 6.5s var(--ease-out) 0.6s forwards; filter: drop-shadow(0 0 6px rgba(${GOLD},0.6)); }
        .tree-flash.still { animation: none; stroke-dashoffset: 0; }
        @keyframes treeFlash { to { stroke-dashoffset: 0; } }
        .tree-node { cursor: pointer; }
        .tree-node circle.ring { fill: rgba(3,3,10,0.92); stroke-width: 1.8; transition: all 262ms var(--ease-snap); }
        .tree-node:hover circle.ring, .tree-node.active circle.ring { stroke-width: 3; filter: drop-shadow(0 0 10px rgba(${GOLD},0.55)); }
        .tree-node.active circle.ring { fill: rgba(${GOLD},0.12); }
        .tree-node:focus, .tree-node:focus-visible { outline: none; }
        .tree-node:focus-visible circle.ring { stroke-width: 3; }
        .tree-node text { pointer-events: none; }
        .tree-node.appear { opacity: 0; animation: treeAppear 618ms var(--ease-snap) forwards; }
        .tree-node.appear.still { animation: none; opacity: 1; }
        @keyframes treeAppear { to { opacity: 1; } }
        .tree-pillar { fill: rgba(${GOLD},0.78); font-family: var(--font-body); font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; }
        .tree-num { fill: rgba(${GOLD},0.95); font-family: var(--font-display); font-size: 19px; font-weight: 700; }
        .tree-name { fill: rgba(232,232,240,0.92); font-family: var(--font-body); font-size: 13.5px; letter-spacing: 0.04em; }
        .tree-door { fill: rgba(232,213,160,0.95); font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: 0.1em; }
        .tree-panel { width: 100%; max-width: 34rem; border: 1px solid rgba(${GOLD},0.3); border-radius: 0.5rem; padding: 1rem 1.1rem; background: rgba(${GOLD},0.05); min-height: 7rem; }
        .tree-panel h3 { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; color: rgba(232,213,160,1); margin: 0 0 0.3rem; }
        .tree-panel .k { font-family: var(--font-body); font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(${GOLD},0.85); margin-bottom: 0.4rem; }
        .tree-panel p { font-family: var(--font-body); font-size: 1rem; line-height: 1.6; color: rgba(232,232,240,0.9); margin: 0 0 0.5rem; }
        .tree-panel .q { font-family: var(--font-accent); font-style: italic; font-size: 1.1rem; color: rgba(232,232,240,0.95); }
        .tree-hint { font-family: var(--font-accent); font-style: italic; font-size: 1.05rem; color: rgba(${GOLD},0.85); text-align: center; }
        @media (prefers-reduced-motion: reduce) { .tree-flash { animation: none; stroke-dashoffset: 0; } .tree-node.appear { animation: none; opacity: 1; } }
      `}</style>

      <svg viewBox={`-60 -34 ${W + 120} ${H + 60}`} role="img" aria-label="The Tree of Life: ten sefirot on three pillars, each holding one of the ten doors">
        {/* pillars */}
        {PILLARS.map((p) => (
          <g key={p.name}>
            <line x1={p.x * W} y1={0.03 * H} x2={p.x * W} y2={0.99 * H} stroke={`rgba(${GOLD},0.08)`} strokeWidth="1" strokeDasharray="2 6" />
            <text className="tree-pillar" x={p.x * W} y={-14} textAnchor="middle">{p.name}</text>
          </g>
        ))}

        {/* the 22 paths */}
        {PATHS.map(([a, b]) => {
          const [ax, ay] = pt(byN[a]); const [bx, by] = pt(byN[b]);
          const lit = active && (a === active || b === active);
          return <line key={`${a}-${b}`} className={'tree-path' + (lit ? ' lit' : '')} x1={ax} y1={ay} x2={bx} y2={by} />;
        })}

        {/* the lightning flash */}
        <polyline className={'tree-flash' + (still ? ' still' : '')} points={flashPoints} style={{ '--len': flashLength }} />

        {/* the ten */}
        {SEFIROT.map((s, i) => {
          const [x, y] = pt(s);
          const rgb = DOOR_COLOR[s.door] || GOLD;
          const emoji = DOOR_META[SLUG_TO_KEY[s.door]]?.emoji || '';
          return (
            <g
              key={s.id}
              className={'tree-node appear' + (still ? ' still' : '') + (active === s.n ? ' active' : '')}
              style={{ animationDelay: `${0.6 + i * 0.62}s` }}
              transform={`translate(${x}, ${y})`}
              tabIndex={0}
              role="button"
              aria-label={`${s.n}. ${s.name}, ${s.meaning}: the ${s.doorName} door`}
              onClick={() => setActive(active === s.n ? null : s.n)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(active === s.n ? null : s.n); } }}
            >
              <circle className="ring" r={R} stroke={`rgba(${rgb},0.9)`} />
              <text className="tree-num" y={-9} textAnchor="middle">{s.n}</text>
              <text y={12} textAnchor="middle" style={{ fontSize: 18 }}>{emoji}</text>
              <text className="tree-name" y={R + 16} textAnchor="middle">{s.name} · {s.meaning}</text>
              <text className="tree-door" y={R + 32} textAnchor="middle">{s.doorName.toUpperCase()}</text>
            </g>
          );
        })}
      </svg>

      {sel ? (
        <div className="tree-panel" aria-live="polite">
          <div className="k">{sel.n} · {sel.name} · {sel.meaning} · {PILLARS.find((p) => p.x === sel.x)?.name}</div>
          <h3>{selMeta?.emoji} {sel.doorName}</h3>
          <p className="q">{selMeta?.tagline}</p>
          <p>{sel.why}</p>
          <Link href={`/${sel.door}`} className="btn-ghost">OPEN THE {sel.doorName.toUpperCase()} DOOR</Link>
        </div>
      ) : (
        <div className="tree-panel">
          <div className="tree-hint">Tap a sefirah. The flash draws the tree in its order, crown to kingdom.</div>
        </div>
      )}
    </div>
  );
}
