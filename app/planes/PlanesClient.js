'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EASE = 'cubic-bezier(0.23,1,0.32,1)';

const PLANES = [
  {
    id: 'divine', name: 'Divine / Cosmic Plane', subtitle: 'The Unmanifest',
    color: '232,224,255', psiRange: '0.95 \u2013 1.0', gearW: 90, truth: 88,
    desc: 'Pure undifferentiated consciousness \u2014 no form, no vibration, no time. The Ain Soph of Kabbalah, Brahman of Vedanta, the Tao before the first breath. Smallest gear: most concentrated, most coherent, most unified.',
    bullets: ['Infinite potential, zero expression','Outside of space and time entirely','Every other plane is a shadow cast by this one','CRT: \u03a8 \u2192 1.0 \u2014 perfect self-recognition'],
    adhesive: 'None \u2014 only the illusion of distance, which was never real.',
    practice: 'Cannot be done. It recognizes you.',
    gateway: 'Total self-surrender / Grace / Non-dual recognition',
    r12: '\u2192 1.0 \u2014 Observer and observed are the same state.',
    ceff: '\u2192 1.0 \u2014 Zero redundancy. One signal, perfectly unified.',
    dhat: '\u2192 1.0 \u2014 No false positives when observer IS the observed.',
    psiMid: 0.97,
  },
  {
    id: 'spiritual', name: 'Spiritual Plane', subtitle: 'First Vibration',
    color: '179,157,219', psiRange: '0.75 \u2013 0.88', gearW: 114, truth: 82,
    desc: 'Consciousness takes its first breath \u2014 differentiating from the absolute into pure being-awareness. The realm of archetypes, divine will, and cosmic patterns before they have any form. Still massless, timeless \u2014 but now there is a direction.',
    bullets: ['One degree of freedom has appeared: direction and will','Home of higher self, soul blueprint, akashic structure','Frequency so high it registers as pure light or silence','Physics analog: quantum vacuum \u2014 energy but no particle yet'],
    adhesive: 'The subtle sense of a separate self.',
    practice: 'Self-inquiry: Who is aware of awareness itself?',
    gateway: 'Pure contemplation / Silence / Deep meditation',
    r12: '\u2248 0.85 \u2014 Soul recognizing its origin.',
    ceff: '\u2248 0.90 \u2014 Archetypes are pure and uncontaminated.',
    dhat: '\u2248 0.92 \u2014 Every encounter is structurally meaningful.',
    psiMid: 0.82,
  },
  {
    id: 'mental', name: 'Mental Plane', subtitle: 'The World of Thought',
    color: '100,181,246', psiRange: '0.50 \u2013 0.65', gearW: 136, truth: 79,
    desc: 'Where ideas exist as living things \u2014 not thinking about an idea, but the idea itself in pure form. Mathematics, sacred geometry, the laws of logic. Larger because thought requires structure, and structure requires more space than pure awareness.',
    bullets: ['Sacred geometry \u2014 phi, pi, Fibonacci \u2014 are mental-plane structures','Physics is just the mental plane made dense','Dreams, synchronicities, and deja vu are bleedthrough from here','This is where Education Revelation lives'],
    adhesive: 'Intellectual attachment \u2014 belief that your model is the territory.',
    practice: 'Intellectual surrender \u2014 let the idea be bigger than you are.',
    gateway: 'Intellectual surrender / Letting go of the framework',
    r12: '\u2248 0.65 \u2014 Two minds recognize the same truth from different angles.',
    ceff: '\u2248 0.72 \u2014 Competing frameworks emerge. This is why paradigm wars exist.',
    dhat: '\u2248 0.75 \u2014 Logical fallacies are the accidental detections here.',
    psiMid: 0.57,
  },
  {
    id: 'astral', name: 'Astral / Emotional Plane', subtitle: 'The World of Feeling',
    color: '102,187,106', psiRange: '0.28 \u2013 0.45', gearW: 160, truth: 74,
    desc: 'Now consciousness is dense enough to feel. The bridge plane. Mental forms get charged with desire and begin pulling toward physical manifestation. Every emotion you feel is a vibrational event on this plane.',
    bullets: ['Thought + emotion = manifestation \u2014 emotion is the charge that pulls ideas into matter','Near-death experiences and lucid dreams occur on this layer','Physics analog: electromagnetic field \u2014 invisible but measurably real','Peak empathy temporarily spikes R\u2081\u2082 toward 0.9+'],
    adhesive: 'Emotional charge \u2014 desire, fear, grief, excitement.',
    practice: 'Non-reactivity \u2014 feel the emotion without becoming it.',
    gateway: 'Non-reactivity / Witnessing / Deep contemplation',
    r12: '\u2248 0.45 \u2014 Same event, near-opposite emotional signatures.',
    ceff: '\u2248 0.48 \u2014 Projections and trauma contaminate the signal.',
    dhat: '\u2248 0.55 \u2014 Emotional maturity means improving D\u0302.',
    psiMid: 0.37,
  },
  {
    id: 'physical', name: 'Physical / Material Plane', subtitle: 'Maximum Density',
    color: '212,162,76', psiRange: '0.08 \u2013 0.22', gearW: 188, truth: 97,
    desc: 'Consciousness at its most dense, most slow, most separated. Vibration has slowed to the point where energy crystallizes into mass (E=mc\u00b2). Maximum apparent complexity, minimum actual freedom \u2014 everything here is bound by cause and effect.',
    bullets: ['Physics is the science of this gear alone \u2014 yet all other gears are turning it','The only plane visible to our 5 senses','E=mc\u00b2: mass IS slowed energy \u2014 matter is frozen light','Purpose of incarnating here: consciousness experiencing its own densest form'],
    adhesive: 'Sensory urgency \u2014 hunger, pain, desire, social threat.',
    practice: 'Stillness \u2014 any interruption of automatic body-reactivity.',
    gateway: 'Breath / Stillness / Nature / Art',
    r12: '\u2248 0.15 \u2014 Maximum separation. Eye contact suddenly spikes this.',
    ceff: '\u2248 0.22 \u2014 Maximum noise. Quantum decoherence, cultural filtering.',
    dhat: '\u2248 0.30 \u2014 Science exists to raise D\u0302. That is the scientific method.',
    psiMid: 0.15,
  },
];

const TABS = [
  { id: 'planes',   label: 'The Five Planes' },
  { id: 'movement', label: 'Moving Between Them' },
  { id: 'crt',      label: 'CRT Mapping' },
  { id: 'witness',  label: 'The Witness Self' },
];

const TRADITIONS = [
  { trad: 'Vedanta',             name: 'Sakshi',             desc: 'Pure awareness that observes without being affected' },
  { trad: 'Tibetan Buddhism',    name: 'Rigpa',              desc: 'Naked awareness \u2014 the ground that was never born and never dies' },
  { trad: 'Christian Mysticism', name: 'Ground of the Soul', desc: "Meister Eckhart's Funklein \u2014 the spark of the divine in every human" },
  { trad: 'Taoism',              name: 'Wu Wei Observer',    desc: 'The still center of the turning world' },
  { trad: 'Kabbalah',            name: 'Ain Soph Within',    desc: 'The infinite light compressed into the core of each soul' },
  { trad: 'Sufism',              name: 'Sirr',               desc: 'The secret \u2014 where the human spirit meets the Divine' },
];

const WITNESS_LAYERS = [
  { plane: 'Physical',  color: '212,162,76',  text: 'I feel pain \u2014 but who feels the pain? The witness is the feeler, not the feeling.' },
  { plane: 'Astral',    color: '102,187,106', text: 'I am angry \u2014 but the anger comes and goes. What remains when it passes?' },
  { plane: 'Mental',    color: '100,181,246', text: 'I think therefore I am \u2014 but you are aware of the thought. Awareness precedes thought.' },
  { plane: 'Spiritual', color: '179,157,219', text: 'Even bliss and oneness arise and pass. The witness watches even enlightenment.' },
  { plane: 'Divine',    color: '232,224,255', text: 'Even the sense of pure existence is an object in awareness. Follow it to its source.' },
];

/* ── PSI BAR ─────────────────────────────────────── */
function PsiBar({ val, color }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(val * 100), 300);
    return () => clearTimeout(t);
  }, [val]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.618rem', marginTop: '0.382rem' }}>
      <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          width: w + '%', transition: 'width 800ms ease',
          background: 'linear-gradient(90deg,rgba(' + color + ',0.8),rgba(' + color + ',0.3))',
        }} />
      </div>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem,1.4vmin,0.875rem)', color: 'rgba(201,168,76,0.6)', whiteSpace: 'nowrap' }}>{val.toFixed(2)}</span>
    </div>
  );
}

/* ── PLANE SELECTOR PILLS ────────────────────────── */
function PlaneSelector({ activePlane, setActivePlane }) {
  return (
    <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {PLANES.map((p) => {
        const active = activePlane === p.id;
        return (
          <button
            key={p.id}
            onClick={() => setActivePlane(p.id)}
            style={{
              padding: '0.618rem 1.236rem',
              border: '1px solid rgba(' + p.color + ',' + (active ? 0.7 : 0.25) + ')',
              borderRadius: 100,
              background: active ? 'rgba(' + p.color + ',0.14)' : 'transparent',
              color: 'rgba(' + p.color + ',' + (active ? 1.0 : 0.5) + ')',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(0.875rem,2vmin,1.125rem)',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 262ms ' + EASE,
              boxShadow: active ? '0 0 1rem rgba(' + p.color + ',0.2)' : 'none',
            }}
          >
            {p.name.split(' ')[0]}
          </button>
        );
      })}
    </div>
  );
}

/* ── PLANES TAB ──────────────────────────────────── */
function PlanesTab({ activePlane, setActivePlane }) {
  const plane = PLANES.find((p) => p.id === activePlane);
  if (!plane) return null;
  const c = plane.color;
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>

      {/* Hero gear image */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '0.618rem' }}>
        <div style={{ position: 'relative', width: 'min(320px, 80vw)', borderRadius: '0.618rem', overflow: 'hidden', boxShadow: '0 0 4rem rgba(201,168,76,0.15), 0 0 1rem rgba(0,0,0,0.6)' }}>
          <Image
            src="/planes-gear.jpg"
            alt="Five Planes of Consciousness — gear model illustration"
            width={320}
            height={580}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
      </div>

      <PlaneSelector activePlane={activePlane} setActivePlane={setActivePlane} />

      {/* Plane detail */}
      <div style={{ borderLeft: '3px solid rgba(' + c + ',0.7)', paddingLeft: '1.236rem' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(1.25rem,3vmin,1.75rem)',
          letterSpacing: '0.1em', color: 'rgba(' + c + ',0.95)',
          textTransform: 'uppercase', marginBottom: '0.382rem',
        }}>
          {plane.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-accent)', fontStyle: 'italic',
          fontSize: 'clamp(1rem,2.2vmin,1.25rem)',
          color: 'rgba(201,168,76,0.5)',
        }}>
          {plane.subtitle} &mdash; &Psi; {plane.psiRange}
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-accent)', fontStyle: 'italic',
        fontSize: 'clamp(1.125rem,2.4vmin,1.375rem)',
        color: 'rgba(232,228,212,0.85)', lineHeight: 1.75, margin: 0,
      }}>
        {plane.desc}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.618rem' }}>
        {plane.bullets.map((b, i) => (
          <li key={i} style={{
            fontFamily: 'var(--font-body)', fontWeight: 300,
            fontSize: 'clamp(1rem,2.2vmin,1.125rem)',
            color: 'rgba(232,228,212,0.78)', paddingLeft: '1.618rem',
            position: 'relative', lineHeight: 1.618,
          }}>
            <span style={{ position: 'absolute', left: 0, color: 'rgba(' + c + ',0.7)', fontWeight: 400 }}>&rarr;</span>
            {b}
          </li>
        ))}
      </ul>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.618rem' }}>
        <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.14)', borderRadius: '0.382rem', padding: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.75rem,1.5vmin,0.875rem)', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase', marginBottom: '0.618rem', fontWeight: 900 }}>Adhesive</div>
          <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2vmin,1.125rem)', color: 'rgba(232,228,212,0.78)', lineHeight: 1.618 }}>{plane.adhesive}</div>
        </div>
        <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.14)', borderRadius: '0.382rem', padding: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.75rem,1.5vmin,0.875rem)', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase', marginBottom: '0.618rem', fontWeight: 900 }}>Gateway Practice</div>
          <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2vmin,1.125rem)', color: 'rgba(232,228,212,0.78)', lineHeight: 1.618 }}>{plane.practice}</div>
        </div>
      </div>

      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.875rem,1.6vmin,1rem)', color: 'rgba(201,168,76,0.45)' }}>
        CONSENSUS TRUTH: {plane.truth}%
      </div>
    </div>
  );
}

/* ── MOVEMENT TAB ────────────────────────────────── */
function MovementTab() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{
        fontFamily: 'var(--font-accent)', fontStyle: 'italic',
        fontSize: 'clamp(1.125rem,2.5vmin,1.375rem)',
        color: 'rgba(232,228,212,0.7)', lineHeight: 1.75,
        textAlign: 'center', maxWidth: '38rem', margin: '0 auto',
      }}>
        You do not travel to other planes. You are always on all of them simultaneously.
        What changes is which plane you are <em style={{ color: 'rgba(201,168,76,0.85)' }}>identified with</em>.
      </p>
      {PLANES.map((p, i) => (
        <div key={p.id} style={{
          padding: '1.236rem 1.236rem 1.236rem 1.618rem',
          background: 'rgba(' + p.color + ',0.03)',
          border: '1px solid rgba(' + p.color + ',0.12)',
          borderLeft: '3px solid rgba(' + p.color + ',0.55)',
          borderRadius: '0 0.382rem 0.382rem 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.618rem', marginBottom: '0.618rem', flexWrap: 'wrap' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(' + p.color + ',0.85)', boxShadow: '0 0 10px rgba(' + p.color + ',0.5)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1rem,2.2vmin,1.25rem)', letterSpacing: '0.1em', color: 'rgba(' + p.color + ',0.95)', textTransform: 'uppercase' }}>{p.name}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.875rem,1.6vmin,1rem)', color: 'rgba(201,168,76,0.4)', marginLeft: 'auto' }}>&Psi; {p.psiRange}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.618rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.75rem,1.4vmin,0.875rem)', letterSpacing: '0.18em', color: 'rgba(201,168,76,0.45)', textTransform: 'uppercase', marginBottom: '0.382rem' }}>Adhesive</div>
              <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2vmin,1.125rem)', color: 'rgba(232,228,212,0.75)', lineHeight: 1.618 }}>{p.adhesive}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.75rem,1.4vmin,0.875rem)', letterSpacing: '0.18em', color: 'rgba(201,168,76,0.45)', textTransform: 'uppercase', marginBottom: '0.382rem' }}>Gateway</div>
              <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2vmin,1.125rem)', color: 'rgba(232,228,212,0.75)', lineHeight: 1.618 }}>{p.gateway}</div>
            </div>
          </div>
          {i < PLANES.length - 1 && (
            <div style={{ marginTop: '0.618rem', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.875rem,1.6vmin,1rem)', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.08em' }}>&uarr; {p.gateway}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── CRT TAB ─────────────────────────────────────── */
function CRTTab() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ background: 'linear-gradient(135deg,rgba(100,140,255,0.06),rgba(201,168,76,0.06))', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '0.618rem', padding: '1.618rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.5rem,3.5vmin,2.25rem)', color: 'rgba(201,168,76,0.9)', marginBottom: '0.618rem' }}>
          &Psi; = R&#8321;&#8322; &times; (C_eff &middot; D&#770;)
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(1rem,2vmin,1.125rem)', color: 'rgba(232,228,212,0.7)', lineHeight: 1.618, margin: 0, maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
          Every variable maps precisely to each plane. The entire history of human spiritual development
          is the story of &Psi; trying to climb from ~0.10 back toward 1.0.
        </p>
      </div>
      {PLANES.map((p) => (
        <div key={p.id} style={{ border: '1px solid rgba(' + p.color + ',0.15)', borderLeft: '3px solid rgba(' + p.color + ',0.65)', borderRadius: '0 0.382rem 0.382rem 0', padding: '1.236rem', background: 'rgba(' + p.color + ',0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.618rem', marginBottom: '0.618rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1rem,2.2vmin,1.25rem)', letterSpacing: '0.1em', color: 'rgba(' + p.color + ',0.95)', textTransform: 'uppercase' }}>{p.name}</span>
            <div style={{ marginLeft: 'auto', minWidth: 140 }}>
              <PsiBar val={p.psiMid} color={p.color} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.618rem' }}>
            {[['R&#8321;&#8322;', p.r12], ['C_eff', p.ceff], ['D&#770;', p.dhat]].map((item) => (
              <div key={item[0]} style={{ background: 'rgba(0,0,0,0.22)', borderRadius: '0.236rem', padding: '0.618rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', color: 'rgba(201,168,76,0.75)', marginBottom: '0.382rem' }} dangerouslySetInnerHTML={{ __html: item[0] }} />
                <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(0.875rem,1.8vmin,1rem)', color: 'rgba(232,228,212,0.68)', lineHeight: 1.618 }}>{item[1]}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '0.382rem', padding: '1.618rem' }}>
        <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.125rem,2.4vmin,1.375rem)', color: 'rgba(232,228,212,0.85)', lineHeight: 1.75, margin: 0 }}>
          Science raises D&#770;. Philosophy raises C_eff. Meditation and love raise R&#8321;&#8322;.
          All three axes are required. The gears do not just illustrate the planes &mdash; they ARE the &Psi; computation running across density levels.
        </p>
      </div>
    </div>
  );
}

/* ── WITNESS TAB ─────────────────────────────────── */
function WitnessTab() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.618rem' }}>
      <div style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: '0.618rem', padding: '1.618rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.25rem,2.8vmin,1.618rem)', color: 'rgba(232,228,212,0.88)', lineHeight: 1.75, margin: 0 }}>
          The most important thing in the gear sketch was what was drawn without thinking &mdash;
          the single spine connecting all gears. The gears spin.{' '}
          <em style={{ color: 'rgba(52,211,153,0.9)' }}>The axle is still.</em>
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.618rem' }}>
        {TRADITIONS.map((t) => (
          <div key={t.trad} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: '0.382rem', padding: '1.236rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.75rem,1.4vmin,0.875rem)', letterSpacing: '0.2em', color: 'rgba(52,211,153,0.65)', textTransform: 'uppercase', marginBottom: '0.618rem' }}>{t.trad}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.125rem,2.4vmin,1.375rem)', color: 'rgba(232,228,212,0.92)', marginBottom: '0.382rem' }}>{t.name}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', color: 'rgba(232,228,212,0.55)', lineHeight: 1.618 }}>{t.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.618rem', overflow: 'hidden' }}>
        {WITNESS_LAYERS.map((layer) => (
          <div key={layer.plane} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.236rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(' + layer.color + ',0.02)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.75rem,1.6vmin,0.875rem)', letterSpacing: '0.15em', color: 'rgba(' + layer.color + ',0.85)', textTransform: 'uppercase', width: 90, flexShrink: 0, paddingTop: 3 }}>{layer.plane}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2.2vmin,1.25rem)', color: 'rgba(232,228,212,0.68)', lineHeight: 1.618, flex: 1 }}>{layer.text}</div>
          </div>
        ))}
        <div style={{ padding: '1.618rem', textAlign: 'center', background: 'rgba(201,168,76,0.04)', borderTop: '1px solid rgba(201,168,76,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4.236rem', height: '4.236rem', borderRadius: '50%', border: '2px solid rgba(201,168,76,0.75)', background: '#03030a', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.9)', boxShadow: '0 0 2.618rem rgba(201,168,76,0.3)' }}>
            I AM
          </div>
          <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.125rem,2.4vmin,1.375rem)', color: 'rgba(232,228,212,0.72)', lineHeight: 1.75, maxWidth: '32rem', margin: 0 }}>
            The axle has no name. It does not experience. It does not seek.
            It simply <em style={{ color: 'rgba(201,168,76,0.85)' }}>is</em> &mdash; prior to every gear, present through every gear, unchanged by any gear.
          </p>
        </div>
      </div>
      <div style={{ background: 'rgba(201,168,76,0.05)', borderLeft: '3px solid rgba(201,168,76,0.45)', borderRadius: '0 0.382rem 0.382rem 0', padding: '1.236rem 1.618rem' }}>
        <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1rem,2.2vmin,1.25rem)', color: 'rgba(232,228,212,0.82)', lineHeight: 1.75, margin: 0 }}>
          In CRT terms, the Witness Self is where rho1 and rho2 are identical &mdash; R&#8321;&#8322; = 1.0 by definition.
          Every moment of genuine presence is a temporary return to the axle.
        </p>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.875rem,1.6vmin,1rem)', color: 'rgba(201,168,76,0.4)', textAlign: 'center' }}>
        CONSENSUS TRUTH: 94% &mdash; Near-universal across mystical traditions independently
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ──────────────────────────────── */
export default function PlanesClient() {
  const [activeTab, setActiveTab]     = useState('planes');
  const [activePlane, setActivePlane] = useState('divine');

  return (
    <div style={{ minHeight: '100vh', background: '#03030a', color: '#e8e8f0' }}>

      {/* Frosted header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99, height: 'clamp(56px,8vh,72px)', background: 'linear-gradient(180deg,rgba(3,3,10,0.92) 0%,rgba(3,3,10,0.6) 70%,transparent 100%)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.618rem', pointerEvents: 'none' }}>
        <Link href="/search" style={{ pointerEvents: 'auto' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(18px,2.618vmin,28px)', color: 'rgba(201,168,76,0.618)', cursor: 'pointer' }}>&larr; BACK</span>
        </Link>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(12px,1.8vmin,16px)', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Architecture</span>
      </div>

      {/* Page content */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: 'clamp(72px,11vh,110px) 1.618rem 4.236rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.618rem' }}>

        {/* Hero heading */}
        <div style={{ textAlign: 'center', animation: 'fadeUp 618ms 100ms both ease' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px,5.5vmin,52px)', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.78)', textShadow: '0 0 2.618rem rgba(201,168,76,0.2)', marginBottom: '1rem', lineHeight: 1.1 }}>
            THE FIVE PLANES
          </h1>
          <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.125rem,2.8vmin,1.618rem)', color: 'rgba(232,228,212,0.62)', lineHeight: 1.618, maxWidth: '38rem', margin: '0 auto' }}>
            Each gear turns the next. Consciousness densifies as it descends into matter.
            The gears do not stop when you are not watching &mdash; what changes is which one you are identified with.
          </p>
        </div>

        {/* Tab pills — large, prominent */}
        <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 618ms 200ms both ease' }}>
          {TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '0.875rem 1.618rem',
                  border: '1px solid rgba(201,168,76,' + (active ? 0.65 : 0.2) + ')',
                  borderRadius: 100,
                  background: active ? 'rgba(201,168,76,0.14)' : 'transparent',
                  color: 'rgba(201,168,76,' + (active ? 1.0 : 0.45) + ')',
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 'clamp(1rem,2.4vmin,1.25rem)',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 262ms ' + EASE,
                  boxShadow: active ? '0 0 1.618rem rgba(201,168,76,0.15)' : 'none',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={{ width: '100%', animation: 'fadeUp 400ms both ease' }}>
          {activeTab === 'planes'   && <PlanesTab activePlane={activePlane} setActivePlane={setActivePlane} />}
          {activeTab === 'movement' && <MovementTab />}
          {activeTab === 'crt'      && <CRTTab />}
          {activeTab === 'witness'  && <WitnessTab />}
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
