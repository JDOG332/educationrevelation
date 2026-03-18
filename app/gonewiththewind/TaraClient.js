'use client';

import { useState } from 'react';
import Link from 'next/link';

const EASE = 'cubic-bezier(0,0,0.382,1)';

const TRUTHS = [
  {
    id: 'land',
    num: '01',
    title: 'The Land Is the Only Truth That Lasts',
    color: '212,162,76',
    emoji: '\ud83c\udf3e',
    simple: 'Scarlett\u2019s father told her: Tara is everything. The land will still be here when everything else is gone.',
    body: 'He was right. The house burns. The money goes. People die. But the ground stays. Every old tradition in the world says the same thing \u2014 the earth is not just dirt. It is the bottom of everything. You cannot build anything real on something that moves.',
    cross: 'Indigenous cultures worldwide. Hebrew scripture. Hindu cosmology. The root chakra.',
    crt: null,
  },
  {
    id: 'ego',
    num: '02',
    title: 'Everything Gets Taken Away Before You Wake Up',
    color: '179,157,219',
    emoji: '\ud83d\udd25',
    simple: 'Scarlett loses everything. Her home. Her money. Her mother. Her safety. Then her child. Then Rhett.',
    body: 'This is not bad luck. This is the pattern. The universe takes away every false thing until only the real thing is left. It happened to Job in the Bible. It happened to Arjuna in the Bhagavad Gita. It happens to almost every person who truly wakes up. The Civil War is not just history in this story. It is the fire that burns off everything that was never really her.',
    cross: 'The Dark Night of the Soul. Job. Arjuna. Buddhist non-attachment. Almost every awakening story ever told.',
    crt: null,
  },
  {
    id: 'illusion',
    num: '03',
    title: 'You Cannot See Real Love While Chasing a Fantasy',
    color: '220,160,160',
    emoji: '\ud83d\udc41\ufe0f',
    simple: 'Scarlett loves Ashley for almost the whole story. But Ashley is not real \u2014 he is an idea she made up. Rhett is right in front of her the whole time.',
    body: 'Ashley never becomes what she imagined. He is a real person, but Scarlett is in love with the version of him inside her head. Rhett sees her exactly as she is and loves her anyway. That is rare. She misses it completely because she is looking the wrong way. When she finally turns around, he is already gone.',
    cross: 'Plato\u2019s Cave. In love with a shadow while the real light is right behind you.',
    crt: null,
  },
  {
    id: 'trickster',
    num: '04',
    title: 'The One Who Tells the Truth Gets Rejected',
    color: '100,181,246',
    emoji: '\ud83c\udccf',
    simple: 'Rhett says what everyone else is thinking but will not say. They hate him for it.',
    body: 'Every culture has this figure. Coyote. Loki. Hermes. The Fool in the Tarot. They laugh at the rules. They see through every mask. They say the true thing in a room full of people performing. And the room always turns on them. Not because they are wrong. Because they are right, and right is uncomfortable when everyone has agreed to pretend.',
    cross: 'Coyote. Loki. Hermes. The Fool in Tarot. The court jester. The prophet rejected in his hometown.',
    crt: null,
  },
  {
    id: 'tomorrow',
    num: '05',
    title: 'Tomorrow Is Always a New Beginning',
    color: '102,187,106',
    emoji: '\ud83c\udf05',
    simple: '"After all, tomorrow is another day." Scarlett says this at the lowest moment. And she means it.',
    body: 'Every sunrise is a complete fresh start. The person you were yesterday does not have to be who you are today. Scarlett should be broken. She has lost everything. But she refuses to let yesterday own tomorrow. This is not denial. This is the deepest kind of strength. Every resurrection story ever told is this same idea. The past is over. Right now is new.',
    cross: 'Resurrection theology. Buddhist impermanence. The daily renewal in Jewish morning prayer. Rumi\u2019s reed starting over every breath.',
    crt: null,
  },
  {
    id: 'costume',
    num: '06',
    title: 'You Are Not Your Role',
    color: '201,168,76',
    emoji: '\ud83c\udfad',
    simple: 'Scarlett is a belle. Then a field worker. Then a businesswoman. Then a social outcast. Each identity gets ripped away.',
    body: 'Most people think they ARE their role. Mother. Boss. Rich person. Respected person. The universe in this story keeps taking every costume off Scarlett until nothing is left but Scarlett herself. This is not cruelty. This is the lesson. You were never the costume. The costume was just what you were wearing while you figured that out.',
    cross: 'Every spiritual tradition says: you are not your role, your reputation, your body, or your past.',
    crt: null,
  },
  {
    id: 'shadow',
    num: '07',
    title: 'We Hate Most in Others What We Refuse to See in Ourselves',
    color: '190,140,220',
    emoji: '\ud83e\uddd9',
    simple: 'Scarlett despises Belle Watling. Belle is a woman who does what she must to survive. Scarlett does the exact same thing.',
    body: 'They are the same person. Both trade what they have to get through. Both are rejected by the world they live in. Both love men who cannot fully love them back. Scarlett cannot see this because seeing it would mean seeing herself. So instead she looks down at Belle. Carl Jung called this shadow projection. We put our own rejected self onto another person and then we judge that person harshly.',
    cross: 'Carl Jung\u2019s shadow theory. The splinter in your neighbor\u2019s eye. Every parable about judgment.',
    crt: null,
  },
  {
    id: 'delusion',
    num: '08',
    title: 'Shared Fantasy Always Ends the Same Way',
    color: '239,120,80',
    emoji: '\ud83c\udfdb\ufe0f',
    simple: 'The South believed it was permanent, righteous, and invincible. It was none of those things.',
    body: 'When a whole group of people agree to believe something that is not true, the belief does not protect them. It just delays the moment when reality arrives. The Civil War did not create the fall of the South. The shared delusion created it. The war was just the mechanism. This same pattern is in every fallen empire. Every financial crash. Every institution that collapses while insisting it cannot.',
    cross: 'Rome. Every fallen empire. Every market bubble. Every religion that collapsed under its own certainty.',
    crt: null,
  },
  {
    id: 'melanie',
    num: '09',
    title: 'The Purest Love Is Almost Always Invisible',
    color: '232,224,255',
    emoji: '\u2728',
    simple: 'Melanie sees only good in people. She forgives without being asked. She loves without keeping score. Almost nobody notices until she is dying.',
    body: 'Melanie is the most spiritually advanced person in the story. She operates from pure love with no transaction. She does not need to be thanked. She does not need to be right. She just loves. And because this kind of love is so rare, it is almost invisible to the people around her. They only feel how much she mattered when the space she filled goes empty.',
    cross: 'The Christ figure pattern. The bodhisattva. Agape love. Almost every sacred teacher narrative across traditions.',
    crt: null,
  },
  {
    id: 'wound',
    num: '10',
    title: 'The Wound Is the Door',
    color: '201,168,76',
    emoji: '\ud83d\udd73\ufe0f',
    simple: 'Every character grows through loss. Not around it. Through it.',
    body: 'Scarlett\u2019s hunger gives her iron will. Rhett\u2019s rejection opens his heart. Melanie\u2019s fragile body holds the strongest moral spine in the story. The suffering is not punishment. It is the door. Rumi wrote about this. Kintsugi is about this \u2014 the Japanese art of filling cracks with gold so the broken place becomes the most beautiful part. The crucifixion is about this. You do not go around the wound. You go through it. And something on the other side was always waiting.',
    cross: 'Rumi. Kintsugi. The crucifixion. Every hero\u2019s journey. The crack is where the light enters.',
    crt: 'In CRT, two states must be fully disjoint \u2014 separated, broken apart \u2014 before the fidelity gate can register real recognition. The wound creates disjointness. The healing IS the convergence. R\u2081\u2082 cannot rise until the separation is complete.',
  },
];

const S = {
  label: {
    fontFamily: 'var(--font-display)', fontWeight: 900,
    fontSize: 'clamp(0.75rem,1.5vmin,0.875rem)',
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.5)',
  },
  heading: {
    fontFamily: 'var(--font-display)', fontWeight: 900,
    fontSize: 'clamp(1.25rem,2.8vmin,1.618rem)',
    letterSpacing: '0.06em', lineHeight: 1.25,
  },
  accent: {
    fontFamily: 'var(--font-accent)', fontStyle: 'italic',
    fontSize: 'clamp(1.125rem,2.4vmin,1.375rem)',
    lineHeight: 1.75,
  },
  body: {
    fontFamily: 'var(--font-body)', fontWeight: 300,
    fontSize: 'clamp(1rem,2.2vmin,1.125rem)',
    lineHeight: 1.618,
  },
  small: {
    fontFamily: 'var(--font-body)', fontWeight: 300,
    fontSize: 'clamp(0.875rem,1.6vmin,1rem)',
    lineHeight: 1.618,
  },
};

function TruthCard({ truth, open, onToggle }) {
  const c = truth.color;
  return (
    <div
      onClick={onToggle}
      style={{
        border: '1px solid rgba(' + c + ',' + (open ? 0.35 : 0.14) + ')',
        borderLeft: '3px solid rgba(' + c + ',' + (open ? 0.8 : 0.4) + ')',
        borderRadius: '0 0.382rem 0.382rem 0',
        background: open ? 'rgba(' + c + ',0.05)' : 'rgba(' + c + ',0.02)',
        cursor: 'pointer',
        transition: 'all 262ms ' + EASE,
        overflow: 'hidden',
      }}
    >
      {/* Header — always visible */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.236rem 1.236rem 1.236rem 1.618rem' }}>
        <span style={{ fontSize: 'clamp(1.375rem,2.8vmin,1.618rem)', flexShrink: 0 }}>{truth.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ ...S.label, color: 'rgba(' + c + ',0.55)', marginBottom: '0.236rem' }}>{truth.num}</div>
          <div style={{ ...S.heading, color: 'rgba(' + c + ',0.92)', fontSize: 'clamp(1.125rem,2.5vmin,1.5rem)' }}>{truth.title}</div>
        </div>
        <span style={{ color: 'rgba(' + c + ',0.4)', fontSize: '1.236rem', flexShrink: 0, transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 262ms ' + EASE }}>→</span>
      </div>

      {/* Body — visible when open */}
      {open && (
        <div style={{ padding: '0 1.618rem 1.618rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <p style={{ ...S.accent, color: 'rgba(232,228,212,0.9)', margin: 0 }}>{truth.simple}</p>
          <p style={{ ...S.body, color: 'rgba(232,228,212,0.72)', margin: 0 }}>{truth.body}</p>
          <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '0.382rem', padding: '0.618rem 0.875rem' }}>
            <span style={{ ...S.label, color: 'rgba(201,168,76,0.4)', marginRight: '0.618rem' }}>Seen in:</span>
            <span style={{ ...S.small, color: 'rgba(232,228,212,0.55)', fontStyle: 'italic', fontFamily: 'var(--font-accent)' }}>{truth.cross}</span>
          </div>
          {truth.crt && (
            <div style={{ background: 'rgba(100,181,246,0.05)', border: '1px solid rgba(100,181,246,0.18)', borderRadius: '0.382rem', padding: '0.618rem 0.875rem' }}>
              <div style={{ ...S.label, color: 'rgba(100,181,246,0.5)', marginBottom: '0.382rem' }}>CRT Connection</div>
              <p style={{ ...S.small, color: 'rgba(232,228,212,0.65)', margin: 0 }}>{truth.crt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TaraClient() {
  const [openId, setOpenId] = useState('land');

  return (
    <div style={{ minHeight: '100vh', background: '#03030a', color: '#e8e8f0' }}>

      {/* Frosted header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 8, height: 'clamp(56px,8vh,72px)', background: 'linear-gradient(180deg,rgba(3,3,10,0.92) 0%,rgba(3,3,10,0.6) 70%,transparent 100%)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.618rem', pointerEvents: 'none' }}>
        <Link href="/search" style={{ pointerEvents: 'auto' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(18px,2.618vmin,28px)', color: 'rgba(201,168,76,0.618)', cursor: 'pointer' }}>&larr; BACK</span>
        </Link>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(12px,1.8vmin,16px)', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Gone With the Wind</span>
      </div>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: 'clamp(72px,11vh,110px) 1.618rem 4.236rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.618rem' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', animation: 'fadeUp 618ms 100ms both ease' }}>

          {/* Movie title — large and unmistakable */}
          <div style={{ marginBottom: '1.618rem' }}>
            <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(2rem,6vmin,4.236rem)', color: 'rgba(232,228,212,0.92)', lineHeight: 1.1, marginBottom: '0.618rem', textShadow: '0 0 4rem rgba(232,228,212,0.06)' }}>
              Gone With the Wind
            </div>
            <div style={{ width: '61.8%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)', margin: '0 auto' }} />
          </div>

          {/* Spoiler alert pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.618rem', padding: '0.618rem 1.236rem', background: 'rgba(239,120,80,0.08)', border: '1px solid rgba(239,120,80,0.35)', borderRadius: 100, marginBottom: '1.618rem' }}>
            <span style={{ fontSize: '1.125rem' }}>⚠️</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', letterSpacing: '0.18em', color: 'rgba(239,140,100,0.9)', textTransform: 'uppercase' }}>Spoiler Alert</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.875rem,1.8vmin,1rem)', color: 'rgba(239,140,100,0.6)' }}>This page reveals the entire story</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(24px,5vmin,44px)', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.78)', textShadow: '0 0 2.618rem rgba(201,168,76,0.18)', marginBottom: '1rem', lineHeight: 1.1 }}>
            10 TRUTHS HIDDEN<br />IN PLAIN SIGHT
          </h1>
          <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'clamp(1.125rem,2.8vmin,1.618rem)', color: 'rgba(232,228,212,0.55)', lineHeight: 1.618, maxWidth: '36rem', margin: '0 auto' }}>
            This story is not about the Civil War. It is about what happens to a soul when the universe takes away everything that was never real.
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: '61.8%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />

        {/* Truth cards — accordion */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.618rem', animation: 'fadeUp 618ms 200ms both ease' }}>
          {TRUTHS.map((truth) => (
            <TruthCard
              key={truth.id}
              truth={truth}
              open={openId === truth.id}
              onToggle={() => setOpenId(openId === truth.id ? null : truth.id)}
            />
          ))}
        </div>

        {/* CRT closing thought */}
        <div style={{ width: '100%', background: 'linear-gradient(135deg,rgba(100,181,246,0.05),rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '0.618rem', padding: '1.618rem 2.618rem', textAlign: 'center', animation: 'fadeUp 618ms 300ms both ease' }}>
          <div style={{ ...S.label, color: 'rgba(201,168,76,0.45)', marginBottom: '1rem' }}>The Through Line</div>
          <p style={{ ...S.accent, color: 'rgba(232,228,212,0.85)', margin: '0 auto', maxWidth: '40rem' }}>
            Every great story is the same story. A self gets built. The universe breaks it open. Something real is found inside the wreckage. That is not just Gone With the Wind. That is every human life. That is the only story there is.
          </p>
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', gap: '0.618rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/search" className="btn-ghost" style={{ textDecoration: 'none' }}>ALL DOORS</Link>
          <Link href="/mythology/heros-journey" className="btn-ghost" style={{ textDecoration: 'none' }}>THE HERO&apos;S JOURNEY</Link>
          <Link href="/consciousness/identity" className="btn-ghost" style={{ textDecoration: 'none' }}>IDENTITY &amp; THE SELF</Link>
        </div>

      </div>
    </div>
  );
}
