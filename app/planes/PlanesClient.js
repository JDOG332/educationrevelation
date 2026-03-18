'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EASE = 'cubic-bezier(0,0,0.382,1)';

/* ── DATA ──────────────────────────────────────────────────────── */

const PLANES = [
  {
    id: 'divine',
    name: 'Divine / Cosmic Plane',
    emoji: '\u2728',
    color: '232,224,255',
    simple: 'This is where everything starts.',
    body: 'It has no shape. No sound. No time. Think of the silence before music plays. You cannot see it or touch it. But everything else comes from it.',
    gear: 'Smallest gear. Most powerful.',
    truth: 88,
    note: 'This is a model shared by Kabbalah, Vedanta, Taoism, and Neoplatonism.',
  },
  {
    id: 'spiritual',
    name: 'Spiritual Plane',
    emoji: '\ud83d\udd4a\ufe0f',
    color: '179,157,219',
    simple: 'Here, something wakes up and picks a direction.',
    body: 'No body yet. No feelings yet. Just a kind of knowing. Like a seed that holds the whole tree inside before it has even broken ground.',
    gear: 'Small gear. Pure direction.',
    truth: 82,
    note: 'Philosophical model. Many traditions call this the first emanation from the source.',
  },
  {
    id: 'mental',
    name: 'Mental Plane',
    emoji: '\ud83d\udca1',
    color: '100,181,246',
    simple: 'This is where ideas live.',
    body: 'Math lives here. Music lives here. Phi and the Fibonacci numbers live here. When you have a flash of insight \u2014 that is this place. Ideas are real things at this level.',
    gear: 'Medium gear. Ideas take up space.',
    truth: 79,
    note: 'Philosophical model. Plato called these the Forms. Education Revelation maps to this layer.',
  },
  {
    id: 'astral',
    name: 'Astral / Emotional Plane',
    emoji: '\u2764\ufe0f',
    color: '102,187,106',
    simple: 'This is where feelings live.',
    body: 'Joy. Love. Fear. Grief. Your feelings are made of real energy \u2014 just like light is real energy. When you feel something deeply, this is the layer that is moving.',
    gear: 'Bigger gear. Feelings need more room.',
    truth: 74,
    note: 'The emotional layer is widely recognized. Its nature as a literal plane is a philosophical model.',
  },
  {
    id: 'physical',
    name: 'Physical / Material Plane',
    emoji: '\ud83c\udf0d',
    color: '212,162,76',
    simple: 'This is the world you can touch.',
    body: 'Your body lives here. Rocks, trees, and stars live here. This is what energy looks like when it slows all the way down. E=mc\u00b2 means mass IS energy \u2014 just frozen solid.',
    gear: 'Biggest gear. Slowest. Most dense.',
    truth: 97,
    note: '97% consensus. The physical plane is empirically real. E=mc\u00b2 is established physics.',
  },
];

const TRADITIONS = [
  { trad: 'Advaita Vedanta',    ego: 'Ahamkara',           beyond: 'Atman = Brahman',    release: 'Self-inquiry' },
  { trad: 'Zen Buddhism',       ego: 'Anatta',              beyond: 'Sunyata',             release: 'Koans + zazen' },
  { trad: 'Sufism',             ego: 'Nafs',                beyond: 'Fana / Baqa',         release: 'Dhikr, whirling' },
  { trad: 'Christian Mysticism',ego: 'Self-will',           beyond: 'Theosis',             release: 'Kenosis' },
  { trad: 'Kabbalah',           ego: 'Yesh',                beyond: 'Ayin',                release: 'Bittul' },
  { trad: 'Taoism',             ego: 'Wei (forced action)', beyond: 'Wu wei',              release: 'Stop trying' },
  { trad: 'Kashmir Shaivism',   ego: 'Anava mala',          beyond: 'Shiva-consciousness', release: 'Pratyabhijna' },
];

const WITNESS_NAMES = [
  { trad: 'Advaita Vedanta',    name: 'Sakshi',              desc: 'The witness \u2014 pure awareness that watches without being changed' },
  { trad: 'Tibetan Buddhism',   name: 'Rigpa',               desc: 'Naked awareness \u2014 the ground that was never born and never dies' },
  { trad: 'Christian Mysticism',name: 'Ground of the Soul',  desc: "Meister Eckhart's spark \u2014 the divine in every human" },
  { trad: 'Taoism',             name: 'Wu Wei Observer',     desc: 'The still center of the turning world' },
  { trad: 'Kabbalah',           name: 'Ain Soph Within',     desc: 'The infinite light inside every soul' },
  { trad: 'Sufism',             name: 'Sirr',                desc: 'The secret \u2014 the point where human and divine meet' },
];

const SHIFT_STEPS = [
  {
    from: 'Physical',
    color: '212,162,76',
    stuck: 'You feel rushed. Your body feels tense. You are reacting without thinking.',
    move: 'Stop. Take one slow breath. Feel your feet on the floor. That is the door.',
  },
  {
    from: 'Astral / Emotional',
    color: '102,187,106',
    stuck: 'Big feelings are running the show. Fear. Anger. Want. They feel like facts.',
    move: 'Watch the feeling without joining it. Say: "There is fear in me." Not: "I am afraid." One word changes everything.',
  },
  {
    from: 'Mental',
    color: '100,181,246',
    stuck: 'You are thinking in circles. Your ideas feel more real than the world.',
    move: 'Ask a question you cannot answer. Sit with it. The question cracks the ceiling open.',
  },
  {
    from: 'Spiritual',
    color: '179,157,219',
    stuck: 'Even your spiritual experiences feel like "mine." There is still a "me" having them.',
    move: 'Ask: "Who is watching this?" Follow that question back to its source.',
  },
];

const RELEASE_TECHNIQUES = [
  { num: '01', name: 'Stop Narrating',        desc: 'Catch yourself telling the story of what is happening. Stop mid-sentence. Just breathe. Five times a day for three seconds.' },
  { num: '02', name: 'Wide Eyes',             desc: 'Soften your gaze. Let your vision go wide instead of focused on one point. The ego is a "focus" thing. Wide vision has no center.' },
  { num: '03', name: 'Use Your Hands',        desc: 'Do dishes. Knead dough. Build something. Your hands know how to be present. Your ego does not survive full touch.' },
  { num: '04', name: 'Thank First',           desc: 'Say thank you before your brain decides if the moment was good or bad. Gratitude before judgment breaks the ego\'s loop.' },
  { num: '05', name: 'Go Until Empty',        desc: 'Run until you cannot think. Cold water. Heavy work. The ego is a luxury. The body shuts it off when it needs to.' },
  { num: '06', name: 'Give It a Name',        desc: 'Name your ego. When it performs, say its name out loud in third person. You cannot be what you can observe.' },
];

/* ── TAB CONFIG ────────────────────────────────────────────────── */

const TABS = [
  { id: 'planes',  label: 'The Five Planes' },
  { id: 'shift',   label: 'How to Shift' },
  { id: 'ego',     label: 'The Ego Tax' },
  { id: 'witness', label: 'The Witness' },
  { id: 'math',    label: 'The Math' },
];

/* ── SHARED STYLES ─────────────────────────────────────────────── */
const S = {
  sectionLabel: {
    fontFamily: 'var(--font-display)', fontWeight: 900,
    fontSize: 'clamp(0.75rem,1.5vmin,0.875rem)',
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.5)', marginBottom: '0.618rem',
  },
  heading: {
    fontFamily: 'var(--font-display)', fontWeight: 900,
    fontSize: 'clamp(1.25rem,3vmin,1.75rem)',
    letterSpacing: '0.08em', lineHeight: 1.2,
    color: 'rgba(232,228,212,0.95)',
  },
  accent: {
    fontFamily: 'var(--font-accent)', fontStyle: 'italic',
    fontSize: 'clamp(1.125rem,2.5vmin,1.375rem)',
    color: 'rgba(232,228,212,0.82)', lineHeight: 1.75,
  },
  body: {
    fontFamily: 'var(--font-body)', fontWeight: 300,
    fontSize: 'clamp(1rem,2.2vmin,1.125rem)',
    color: 'rgba(232,228,212,0.72)', lineHeight: 1.618,
  },
  note: {
    fontFamily: 'var(--font-body)', fontWeight: 300,
    fontSize: 'clamp(0.75rem,1.5vmin,0.875rem)',
    color: 'rgba(201,168,76,0.38)', lineHeight: 1.618,
    fontStyle: 'italic',
  },
  goldLabel: {
    fontFamily: 'var(--font-display)', fontWeight: 900,
    fontSize: 'clamp(0.75rem,1.5vmin,0.875rem)',
    letterSpacing: '0.18em', textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.5)', marginBottom: '0.382rem',
  },
};

/* ── PLANE SELECTOR ────────────────────────────────────────────── */
function PlaneSelector({ active, setActive }) {
  return (
    <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {PLANES.map((p) => {
        const on = active === p.id;
        return (
          <button key={p.id} onClick={() => setActive(p.id)} style={{
            padding: '0.618rem 1.236rem',
            border: '1px solid rgba(' + p.color + ',' + (on ? 0.7 : 0.2) + ')',
            borderRadius: 100,
            background: on ? 'rgba(' + p.color + ',0.14)' : 'transparent',
            color: 'rgba(' + p.color + ',' + (on ? 1 : 0.45) + ')',
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(0.875rem,2vmin,1.125rem)',
            letterSpacing: '0.06em', cursor: 'pointer',
            transition: 'all 262ms ' + EASE,
            boxShadow: on ? '0 0 1rem rgba(' + p.color + ',0.18)' : 'none',
          }}>
            {p.emoji} {p.name.split(' ')[0]}
          </button>
        );
      })}
    </div>
  );
}

/* ── TAB: THE FIVE PLANES ──────────────────────────────────────── */
function PlanesTab() {
  const [active, setActive] = useState('divine');
  const plane = PLANES.find((p) => p.id === active);
  const c = plane.color;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 'min(280px,75vw)', borderRadius: '0.618rem', overflow: 'hidden', boxShadow: '0 0 4.236rem rgba(201,168,76,0.12),0 0 1rem rgba(0,0,0,0.6)' }}>
          <Image src="/planes-gear.jpg" alt="Five planes of consciousness as interlocking gears" width={280} height={508} style={{ width: '100%', height: 'auto', display: 'block' }} priority />
        </div>
      </div>
      <PlaneSelector active={active} setActive={setActive} />
      <div style={{ borderLeft: '3px solid rgba(' + c + ',0.65)', paddingLeft: '1.236rem' }}>
        <div style={{ ...S.heading, color: 'rgba(' + c + ',0.95)', marginBottom: '0.382rem' }}>{plane.name}</div>
        <div style={S.note}>{plane.gear}</div>
      </div>
      <p style={{ ...S.accent, margin: 0 }}>{plane.simple}</p>
      <p style={{ ...S.body, margin: 0 }}>{plane.body}</p>
      <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '0.382rem', padding: '0.875rem 1.236rem' }}>
        <div style={S.goldLabel}>Honest Note</div>
        <div style={S.note}>{plane.note}</div>
        <div style={{ ...S.note, marginTop: '0.382rem', color: 'rgba(201,168,76,0.5)' }}>TRUTH SCORE: {plane.truth}%</div>
      </div>
      <div style={{ background: 'rgba(232,228,212,0.03)', border: '1px solid rgba(232,228,212,0.07)', borderRadius: '0.618rem', padding: '1.236rem' }}>
        <div style={S.goldLabel}>The Big Idea</div>
        <p style={{ ...S.accent, margin: 0, color: 'rgba(232,228,212,0.7)' }}>
          Each gear turns the one below it. Take one away and all the others stop.
          No plane exists alone. They all need each other.
        </p>
      </div>
    </div>
  );
}

/* ── TAB: HOW TO SHIFT ─────────────────────────────────────────── */
function ShiftTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ textAlign: 'center', padding: '0 0 0.618rem' }}>
        <p style={{ ...S.accent, margin: '0 auto', maxWidth: '36rem', color: 'rgba(201,168,76,0.82)' }}>
          You are not stuck on one plane. You are always on all five at the same time.
          What changes is where your <em>attention</em> is.
        </p>
      </div>
      <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: '0.618rem', padding: '1.236rem 1.618rem' }}>
        <div style={S.goldLabel}>The Key Truth</div>
        <p style={{ ...S.body, margin: 0 }}>
          You do not travel to higher planes. You are already there.
          You just stop claiming to be the lower one.
          Moving up is not adding something. It is letting something go.
        </p>
      </div>
      {SHIFT_STEPS.map((s, i) => (
        <div key={s.from} style={{ border: '1px solid rgba(' + s.color + ',0.12)', borderLeft: '3px solid rgba(' + s.color + ',0.55)', borderRadius: '0 0.382rem 0.382rem 0', padding: '1.236rem 1.236rem 1.236rem 1.618rem', background: 'rgba(' + s.color + ',0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.618rem', marginBottom: '0.618rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(' + s.color + ',0.85)', boxShadow: '0 0 0.618rem rgba(' + s.color + ',0.5)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.875rem,2vmin,1.125rem)', letterSpacing: '0.1em', color: 'rgba(' + s.color + ',0.9)', textTransform: 'uppercase' }}>
              From {s.from}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.618fr', gap: '0.618rem' }}>
            <div>
              <div style={S.goldLabel}>When You Are Stuck</div>
              <div style={{ ...S.body, color: 'rgba(232,228,212,0.65)' }}>{s.stuck}</div>
            </div>
            <div>
              <div style={{ ...S.goldLabel, color: 'rgba(' + s.color + ',0.65)' }}>How to Move</div>
              <div style={{ ...S.accent, color: 'rgba(232,228,212,0.85)', margin: 0 }}>{s.move}</div>
            </div>
          </div>
          {i < SHIFT_STEPS.length - 1 && (
            <div style={{ ...S.note, marginTop: '0.618rem' }}>&uarr; next plane above</div>
          )}
        </div>
      ))}
      <div style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: '0.618rem', padding: '1.236rem 1.618rem' }}>
        <div style={{ ...S.goldLabel, color: 'rgba(52,211,153,0.55)' }}>The Warning</div>
        <p style={{ ...S.body, margin: 0, color: 'rgba(232,228,212,0.72)' }}>
          There is a trap at the spiritual plane called <em style={{ color: 'rgba(52,211,153,0.8)', fontFamily: 'var(--font-accent)' }}>spiritual bypassing</em>.
          That is when people use spiritual ideas to avoid real feelings or real problems.
          The gears all need to turn. You cannot skip one.
        </p>
      </div>
    </div>
  );
}

/* ── TAB: THE EGO TAX ──────────────────────────────────────────── */
function EgoTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ borderRadius: '0.618rem', overflow: 'hidden', boxShadow: '0 0 2.618rem rgba(0,0,0,0.5)' }}>
        <Image src="/planes-ego.png" alt="Separate ego versus effortless essence — illustrated" width={860} height={484} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <div style={{ background: 'rgba(239,100,80,0.06)', border: '1px solid rgba(239,100,80,0.2)', borderRadius: '0.618rem', padding: '1.618rem', textAlign: 'center' }}>
        <p style={{ ...S.accent, margin: '0 auto', maxWidth: '40rem', color: 'rgba(232,228,212,0.9)' }}>
          Your ego is the voice that says <em style={{ color: 'rgba(239,140,100,0.9)' }}>"me, mine, my rules."</em>
          It is not bad. But it costs a huge amount of energy to keep running.
          Like leaving every light in your house on — all day and all night.
        </p>
      </div>
      <div>
        <div style={S.sectionLabel}>What the Science Says &mdash; 97% Consensus</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.618rem' }}>
          {[
            { icon: '\ud83e\udde0', fact: 'The Default Mode Network (DMN) is the ego\'s home in your brain. It uses up about 20% of all your brain energy. That is a huge bill for a voice that mostly just worries.' },
            { icon: '\ud83c\udfca', fact: 'In flow states, the DMN goes quiet. Athletes, artists, and musicians all report: less thinking, more energy. Not less. More.' },
            { icon: '\ud83d\ude34', fact: 'Sleep is full ego shutdown every single night. It is the only thing that truly restores you. Your own body has been proving this right every night of your life.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '1rem 1.236rem', background: 'rgba(100,181,246,0.04)', border: '1px solid rgba(100,181,246,0.12)', borderRadius: '0.382rem' }}>
              <span style={{ fontSize: '1.618rem', flexShrink: 0 }}>{item.icon}</span>
              <span style={S.body}>{item.fact}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={S.sectionLabel}>7 Traditions. One Verdict. &mdash; 94% Cross-Cultural Consensus</div>
        <div style={{ borderRadius: '0.618rem', overflow: 'hidden', boxShadow: '0 0 1.618rem rgba(0,0,0,0.4)', marginBottom: '0.618rem' }}>
          <Image src="/planes-traditions.jpg" alt="Seven traditions converging on the same insight about ego" width={860} height={460} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        <div style={{ overflowX: 'auto', borderRadius: '0.382rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.08)' }}>
                {['Tradition', 'Ego Name', 'Beyond It', 'How to Let Go'].map((h) => (
                  <th key={h} style={{ ...S.goldLabel, padding: '0.618rem 0.875rem', borderBottom: '1px solid rgba(201,168,76,0.2)', textAlign: 'left', whiteSpace: 'nowrap', margin: 0 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRADITIONS.map((row, i) => (
                <tr key={row.trad} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ ...S.body, padding: '0.618rem 0.875rem', borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', color: 'rgba(232,228,212,0.88)' }}>{row.trad}</td>
                  <td style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2vmin,1.125rem)', padding: '0.618rem 0.875rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(201,168,76,0.8)' }}>{row.ego}</td>
                  <td style={{ ...S.body, padding: '0.618rem 0.875rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(232,228,212,0.65)' }}>{row.beyond}</td>
                  <td style={{ ...S.body, padding: '0.618rem 0.875rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(232,228,212,0.65)' }}>{row.release}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...S.note, marginTop: '0.618rem' }}>
          All 7 agree: ego is built, not found. Beyond it is fullness, not emptiness. Letting go reveals what was always there.
        </p>
      </div>
      <div>
        <div style={S.sectionLabel}>6 Ways to Let Go — Right Now</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '0.618rem' }}>
          {RELEASE_TECHNIQUES.map((t) => (
            <div key={t.num} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '0.382rem', padding: '1.236rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.618rem', marginBottom: '0.618rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.375rem,3vmin,1.75rem)', color: 'rgba(201,168,76,0.2)', lineHeight: 1 }}>{t.num}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1rem,2.2vmin,1.25rem)', color: 'rgba(201,168,76,0.85)', letterSpacing: '0.05em' }}>{t.name}</span>
              </div>
              <div style={S.body}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg,rgba(239,100,80,0.06),rgba(201,168,76,0.06))', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '0.618rem', padding: '1.618rem', textAlign: 'center' }}>
        <div style={S.sectionLabel}>The Paradox</div>
        <p style={{ ...S.accent, margin: '0 auto', maxWidth: '40rem', color: 'rgba(232,228,212,0.9)' }}>
          The thing you think is keeping you safe is the thing draining your energy.
          What you fear losing most &mdash; the sense of self &mdash; is the same thing you already let go of every single night when you fall asleep.
          And it is the best rest you know.
        </p>
      </div>
    </div>
  );
}

/* ── TAB: THE WITNESS ──────────────────────────────────────────── */
function WitnessTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: '0.618rem', padding: '1.618rem 2.618rem', textAlign: 'center' }}>
        <p style={{ ...S.accent, fontSize: 'clamp(1.375rem,3vmin,1.875rem)', margin: '0 auto', maxWidth: '36rem', color: 'rgba(232,228,212,0.92)', lineHeight: 1.75 }}>
          All five gears are spinning right now.
          But something is <em style={{ color: 'rgba(52,211,153,0.9)' }}>perfectly still.</em>
          That still thing is you. The real you.
        </p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.618rem', padding: '1.618rem' }}>
        <div style={S.goldLabel}>What the Axle Is</div>
        <p style={{ ...S.body, margin: '0 0 0.618rem' }}>In the gear sketch, one spine runs through every gear. It holds them all. The gears spin around it. The spine does not move.</p>
        <p style={{ ...S.body, margin: '0 0 0.618rem' }}>In you, the same thing exists. There is a part of you that has watched everything you have ever done. It watched you as a baby. It is watching right now as you read this. It will watch when you sleep tonight.</p>
        <p style={{ ...S.accent, margin: 0, color: 'rgba(201,168,76,0.75)' }}>It has never been hurt. It has never been angry. It has never been afraid. It just watches.</p>
      </div>
      <div>
        <div style={S.sectionLabel}>Six Traditions. Same Discovery. &mdash; 94% Consensus</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.618rem' }}>
          {WITNESS_NAMES.map((w) => (
            <div key={w.trad} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '0.382rem', padding: '1.236rem', textAlign: 'center' }}>
              <div style={{ ...S.goldLabel, color: 'rgba(52,211,153,0.6)', marginBottom: '0.618rem' }}>{w.trad}</div>
              <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.25rem,2.6vmin,1.5rem)', color: 'rgba(232,228,212,0.95)', marginBottom: '0.382rem' }}>{w.name}</div>
              <div style={S.body}>{w.desc}</div>
            </div>
          ))}
        </div>
        <p style={{ ...S.note, marginTop: '0.618rem' }}>These traditions developed independently across thousands of years and miles. They all found the same thing.</p>
      </div>
      <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.618rem', overflow: 'hidden' }}>
        <div style={{ padding: '1.236rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={S.goldLabel}>The Test — Try This Right Now</div>
          <p style={{ ...S.body, margin: 0 }}>Notice that you are reading. Now notice that something is noticing that you are reading. That second noticing — that is the witness. It is not a thought. It is not a feeling. It is what is there before both.</p>
        </div>
        <div style={{ padding: '1.236rem 1.618rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'rgba(201,168,76,0.04)', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4.236rem', height: '4.236rem', borderRadius: '50%', border: '2px solid rgba(201,168,76,0.75)', background: '#03030a', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.9)', boxShadow: '0 0 2.618rem rgba(201,168,76,0.25)' }}>
            I AM
          </div>
          <p style={{ ...S.accent, margin: 0, maxWidth: '32rem', color: 'rgba(232,228,212,0.75)' }}>
            It has no name. It does not want anything. It is not going anywhere.
            It simply <em style={{ color: 'rgba(201,168,76,0.85)' }}>is</em> &mdash; before every gear, inside every gear, unchanged by any gear.
          </p>
        </div>
      </div>
      <div style={{ background: 'rgba(201,168,76,0.05)', borderLeft: '3px solid rgba(201,168,76,0.4)', borderRadius: '0 0.382rem 0.382rem 0', padding: '1.236rem 1.618rem' }}>
        <div style={S.goldLabel}>The CRT Connection</div>
        <p style={{ ...S.body, margin: 0 }}>
          In CRT, the Witness Self is the state where the observer and the observed are the same thing.
          R&#8321;&#8322; = 1. Perfect recognition. Not because it achieved something.
          Because it never stopped being whole.
        </p>
      </div>
    </div>
  );
}

/* ── TAB: THE MATH ─────────────────────────────────────────────── */
function MathTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ background: 'linear-gradient(135deg,rgba(100,140,255,0.06),rgba(201,168,76,0.06))', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '0.618rem', padding: '1.618rem 2.618rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.618rem,4vmin,2.618rem)', color: 'rgba(201,168,76,0.9)', marginBottom: '0.618rem' }}>
          &Psi; = R&#8321;&#8322; &times; G
        </div>
        <p style={{ ...S.body, margin: '0 auto', maxWidth: '40rem', textAlign: 'center' }}>
          This is the master equation from Convergent Recognition Theory (CRT). Here is what it means in plain words.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.618rem' }}>
        {[
          { sym: '\u03a8', name: 'Psi', color: '201,168,76',  simple: 'How much two things truly recognize each other.', deep: 'When two things meet and really "see" each other \u2014 not just touch, but recognize \u2014 Psi is high. Between a rock and a wall: near zero. Between two people in a real moment of love: near one.' },
          { sym: 'R\u2081\u2082', name: 'Recognition', color: '179,157,219', simple: 'How close are the two things? How much do they share?', deep: 'Two people who have been through the same thing have high R\u2081\u2082. A person fully present in their own body has high R\u2081\u2082 with themselves. The ego lowers this by building walls.' },
          { sym: 'G',    name: 'Signal Quality', color: '100,181,246', simple: 'How clear and real is the signal between them?', deep: 'A clear mind gives a clean signal. A mind full of fear, noise, and ego-chatter gives a bad signal. G rewards real information over noise. The ego is mostly noise.' },
        ].map((item) => (
          <div key={item.sym} style={{ border: '1px solid rgba(' + item.color + ',0.18)', borderLeft: '3px solid rgba(' + item.color + ',0.65)', borderRadius: '0 0.382rem 0.382rem 0', padding: '1.236rem', background: 'rgba(' + item.color + ',0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.875rem', marginBottom: '0.618rem' }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.618rem,3.5vmin,2.25rem)', color: 'rgba(' + item.color + ',0.9)', lineHeight: 1 }}>{item.sym}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1rem,2.2vmin,1.25rem)', letterSpacing: '0.1em', color: 'rgba(' + item.color + ',0.85)', textTransform: 'uppercase' }}>{item.name}</span>
            </div>
            <p style={{ ...S.accent, margin: '0 0 0.618rem', color: 'rgba(232,228,212,0.9)' }}>{item.simple}</p>
            <p style={{ ...S.body, margin: 0 }}>{item.deep}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '0.618rem', padding: '1.618rem' }}>
        <div style={S.sectionLabel}>How the Planes Map to CRT</div>
        <p style={{ ...S.body, margin: '0 0 0.618rem' }}>As you move up the gear stack, Psi rises. Not because we measured it \u2014 this is a philosophical model, not a formula. But the direction is real:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.382rem' }}>
          {PLANES.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.618rem', padding: '0.382rem 0' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(' + p.color + ',0.8)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', color: 'rgba(' + p.color + ',0.85)', textTransform: 'uppercase', letterSpacing: '0.08em', width: '10rem', flexShrink: 0 }}>{p.name.split('/')[0].trim()}</span>
              <span style={{ ...S.body, margin: 0 }}>{p.simple}</span>
            </div>
          ))}
        </div>
        <p style={{ ...S.note, marginTop: '0.618rem' }}>
          The specific numbers in older versions of this page were invented. They have been removed. The direction \u2014 more recognition as you ascend \u2014 is the honest claim.
        </p>
      </div>
      <div style={{ background: 'rgba(100,181,246,0.05)', border: '1px solid rgba(100,181,246,0.18)', borderRadius: '0.618rem', padding: '1.618rem' }}>
        <div style={S.sectionLabel}>What CRT Adds That Is New</div>
        <p style={{ ...S.body, margin: '0 0 0.618rem' }}>CRT says the universe is not just a collection of things. It is a system that is always trying to recognize itself. Psi is the measure of how well it is doing that.</p>
        <p style={{ ...S.accent, margin: 0, color: 'rgba(100,181,246,0.8)' }}>Science raises G. Philosophy raises R&#8321;&#8322;. Love raises both. All three matter. None is enough alone.</p>
      </div>
      <div style={{ ...S.note, textAlign: 'center', padding: '0.618rem' }}>
        CRT is an original theoretical framework. Its philosophical claims are internally consistent and cross-tradition aligned. Its precise mathematical predictions are still speculative. That is honest.
      </div>
    </div>
  );
}

/* ── MAIN ──────────────────────────────────────────────────────── */
export default function PlanesClient() {
  const [activeTab, setActiveTab] = useState('planes');

  return (
    <div style={{ minHeight: '100vh', background: '#03030a', color: '#e8e8f0' }}>

      {/* Frosted header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8, height: 'clamp(56px,8vh,72px)', background: 'linear-gradient(180deg,rgba(3,3,10,0.92) 0%,rgba(3,3,10,0.6) 70%,transparent 100%)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.618rem', pointerEvents: 'none' }}>
        <Link href="/search" style={{ pointerEvents: 'auto' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(18px,2.618vmin,28px)', color: 'rgba(201,168,76,0.618)', cursor: 'pointer' }}>&larr; BACK</span>
        </Link>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(12px,1.8vmin,16px)', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Architecture</span>
      </div>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: 'clamp(72px,11vh,110px) 1.618rem 4.236rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.618rem' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', animation: 'fadeUp 618ms 100ms both ease' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px,5.5vmin,52px)', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.78)', textShadow: '0 0 2.618rem rgba(201,168,76,0.18)', marginBottom: '1rem', lineHeight: 1.1 }}>
            THE FIVE PLANES
          </h1>
          <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.125rem,2.8vmin,1.618rem)', color: 'rgba(232,228,212,0.58)', lineHeight: 1.618, maxWidth: '38rem', margin: '0 auto' }}>
            Five gears. One axle. Everything turning everything else.
            This is how consciousness becomes the world you live in.
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 618ms 200ms both ease' }}>
          {TABS.map((t) => {
            const on = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '0.875rem 1.618rem', border: '1px solid rgba(201,168,76,' + (on ? 0.65 : 0.18) + ')', borderRadius: 100, background: on ? 'rgba(201,168,76,0.14)' : 'transparent', color: 'rgba(201,168,76,' + (on ? 1 : 0.45) + ')', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1rem,2.4vmin,1.25rem)', letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 262ms ' + EASE, boxShadow: on ? '0 0 1.618rem rgba(201,168,76,0.14)' : 'none' }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ width: '100%', animation: 'fadeUp 400ms both ease' }}>
          {activeTab === 'planes'  && <PlanesTab />}
          {activeTab === 'shift'   && <ShiftTab />}
          {activeTab === 'ego'     && <EgoTab />}
          {activeTab === 'witness' && <WitnessTab />}
          {activeTab === 'math'    && <MathTab />}
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <Link href="/search" className="btn-ghost" style={{ textDecoration: 'none' }}>ALL DOORS</Link>
          <Link href="/consciousness/observer" className="btn-ghost" style={{ textDecoration: 'none' }}>THE OBSERVER</Link>
          <Link href="/mysticism/geometry" className="btn-ghost" style={{ textDecoration: 'none' }}>SACRED GEOMETRY</Link>
        </div>

      </div>
    </div>
  );
}
