'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const EASE = 'cubic-bezier(0.23,1,0.32,1)';

const PLANES = [
  {
    id: 'divine',
    name: 'Divine / Cosmic Plane',
    subtitle: 'The Unmanifest',
    color: '232,224,255',
    psi: '0.95 – 1.0',
    gearW: 90,
    truthScore: 88,
    desc: 'Pure undifferentiated consciousness — no form, no vibration, no time. The Ain Soph of Kabbalah, Brahman of Vedanta, the Tao before the first breath. Smallest gear because it is the most concentrated, the most coherent, the most unified.',
    bullets: [
      'Infinite potential, zero expression',
      'Outside of space and time entirely',
      'Every other plane is a shadow cast by this one',
      'In CRT terms: Ψ → 1.0 — maximum convergence, perfect self-recognition',
    ],
    r12: '→ 1.0 — Pure self-identity. Maximum Uhlmann fidelity. Observer and observed are the same state.',
    ceff: '→ 1.0 — Zero redundancy. One signal, perfectly unified. No competing interpretations.',
    dhat: '→ 1.0 — Every recognition is real. No false positives when the observer IS the observed.',
    practice: 'Cannot be done. It recognizes you.',
    adhesive: 'None — only the illusion of distance, which was never real.',
    transition: 'Total self-surrender / Grace / Non-dual recognition',
  },
  {
    id: 'spiritual',
    name: 'Spiritual Plane',
    subtitle: 'First Vibration',
    color: '179,157,219',
    psi: '0.75 – 0.88',
    gearW: 114,
    truthScore: 82,
    desc: 'Consciousness takes its first breath — differentiating from the absolute into pure being-awareness. The realm of archetypes, divine will, and cosmic patterns before they have any form. The Logos. The Word before it was spoken. Still massless, timeless — but now there is a direction.',
    bullets: [
      'One degree of freedom has appeared: direction and will',
      'Home of higher self, soul blueprint, akashic structure',
      'Frequency so high it registers as pure light or silence',
      'Physics analog: quantum vacuum — energy but no particle yet',
    ],
    r12: '≈ 0.85 — Soul recognizing its origin. Fidelity near-perfect, first differentiation has emerged.',
    ceff: '≈ 0.90 — Minimal noise. Archetypes are pure and uncontaminated by personal history.',
    dhat: '≈ 0.92 — At this vibrational level every encounter is structurally meaningful.',
    practice: 'Self-inquiry: "Who is aware of awareness itself?"',
    adhesive: 'The subtle sense of a separate self — even the feeling "I am having a spiritual experience."',
    transition: 'Pure contemplation / Silence / Deep meditation',
  },
  {
    id: 'mental',
    name: 'Mental Plane',
    subtitle: 'The World of Thought',
    color: '100,181,246',
    psi: '0.50 – 0.65',
    gearW: 136,
    truthScore: 79,
    desc: 'This is where ideas exist as living things. Not thinking about an idea — the idea itself, in pure form. Mathematics lives here. Geometric truths. The laws of logic. Plato\'s Forms. This gear is noticeably larger because thought requires structure — and structure requires more space than pure awareness.',
    bullets: [
      'Sacred geometry — phi, pi, Fibonacci — are mental-plane structures',
      'Physics is just the mental plane made dense',
      'Dreams, synchronicities, and déjà vu are bleedthrough from this layer',
      'This is where Education Revelation lives',
    ],
    r12: '≈ 0.65 — Two minds can recognize the same truth but from different angles. Fidelity drops as interpretation begins.',
    ceff: '≈ 0.72 — Competing frameworks emerge. Multiple valid models of the same truth. This is why paradigm wars exist.',
    dhat: '≈ 0.75 — Logical fallacies and cognitive biases are the accidental detections. Rigorous epistemology = maximizing D̂.',
    practice: 'Intellectual surrender — let the idea be bigger than you are.',
    adhesive: 'Intellectual attachment — the belief that your model is the territory.',
    transition: 'Intellectual surrender / Letting go of the framework',
  },
  {
    id: 'astral',
    name: 'Astral / Emotional Plane',
    subtitle: 'The World of Feeling',
    color: '102,187,106',
    psi: '0.28 – 0.45',
    gearW: 160,
    truthScore: 74,
    desc: 'Now consciousness is dense enough to feel. The bridge plane. This is where mental forms get charged with desire — they become magnetized and begin pulling toward physical manifestation. Every emotion you feel is a vibrational event occurring on this plane. Large because emotional reality is complex, layered, and volatile.',
    bullets: [
      'Thoughts + emotion = manifestation — emotion is the charge that pulls ideas into matter',
      'Near-death experiences, lucid dreams, out-of-body states occur here',
      'Physics analog: electromagnetic field — invisible but measurably real',
      'Peak moments of empathy spike R₁₂ temporarily toward 0.9+',
    ],
    r12: '≈ 0.45 — Emotional states are highly personal. Same event, near-opposite emotional signatures.',
    ceff: '≈ 0.48 — Emotional noise is high. Projections and trauma responses contaminate the signal.',
    dhat: '≈ 0.55 — D_accidental is substantial. Emotional maturity = improving D̂.',
    practice: 'Non-reactivity — feel the emotion without becoming it.',
    adhesive: 'Emotional charge — desire, fear, grief, excitement.',
    transition: 'Non-reactivity / Witnessing / Deep contemplation',
  },
  {
    id: 'physical',
    name: 'Physical / Material Plane',
    subtitle: 'Maximum Density',
    color: '212,162,76',
    psi: '0.08 – 0.22',
    gearW: 188,
    truthScore: 97,
    desc: 'Consciousness at its most dense, most slow, most separated. The largest gear. Vibration has slowed to the point where energy crystallizes into mass (E=mc²). The universe we touch. The paradox: this plane has the most apparent complexity but the least actual freedom — everything here is bound by cause and effect.',
    bullets: [
      'Physics is the science of this gear alone — yet all other gears are turning it',
      'The only plane visible to our 5 senses',
      'E=mc²: mass IS slowed energy — matter is literally frozen light',
      'The purpose of incarnating here: consciousness experiencing its own densest form',
    ],
    r12: '≈ 0.15 — Maximum separation. Two rocks: near-zero. A conscious human fully present: R₁₂ spikes — this is what eye contact actually is.',
    ceff: '≈ 0.22 — Maximum noise. Quantum decoherence, cultural filtering, linguistic ambiguity.',
    dhat: '≈ 0.30 — Flooded with accidental coincidences. Science exists to raise D̂. This is literally what the scientific method is for.',
    practice: 'Stillness — any interruption of automatic body-reactivity.',
    adhesive: 'Sensory urgency — hunger, pain, desire, social threat.',
    transition: 'Breath / Stillness / Nature / Art',
  },
];

const TABS = [
  { id: 'planes',   label: 'The Five Planes' },
  { id: 'movement', label: 'Moving Between Them' },
  { id: 'crt',      label: 'CRT Mapping' },
  { id: 'witness',  label: 'The Witness Self' },
];

const TRADITIONS = [
  { trad: 'Vedanta',            name: 'Sakshi',               desc: 'The Witness — pure awareness that observes without being affected' },
  { trad: 'Tibetan Buddhism',   name: 'Rigpa',                desc: 'Naked awareness — the ground state that was never born and never dies' },
  { trad: 'Christian Mysticism',name: 'Ground of the Soul',   desc: 'Meister Eckhart\'s "Funklein" — the spark of the divine in every human' },
  { trad: 'Taoism',             name: 'Wu Wei Observer',      desc: 'The still center of the turning world — the Tao that cannot be named' },
  { trad: 'Kabbalah',           name: 'Ain Soph Within',      desc: 'The infinite light compressed into the core of each soul' },
  { trad: 'Sufism',             name: 'Sirr',                 desc: 'The secret — the innermost point where the human spirit meets the Divine' },
];

function GearStack({ activePlane, onSelect }) {
  const gears = [...PLANES].reverse();
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:0, position:'relative' }}>
      <div style={{
        position:'absolute', left:18, top:0, bottom:0, width:2,
        background:'linear-gradient(180deg,rgba(201,168,76,0.5),rgba(201,168,76,0.15))',
        zIndex:0,
      }}/>
      {PLANES.map((p, i) => {
        const active = activePlane === p.id;
        return (
          <div key={p.id} onClick={() => onSelect(p.id)}
            style={{
              display:'flex', alignItems:'center', gap:12,
              padding:'10px 0', cursor:'pointer', position:'relative', zIndex:1,
              width: `${p.gearW + 60}px`,
            }}>
            <div style={{
              width: p.gearW * 0.22,
              height: p.gearW * 0.22,
              borderRadius:'50%',
              background: active ? `rgba(${p.color},0.9)` : `rgba(${p.color},0.25)`,
              border: `2px solid rgba(${p.color},${active ? 1 : 0.4})`,
              boxShadow: active ? `0 0 16px rgba(${p.color},0.6)` : 'none',
              transition:`all 400ms ${EASE}`,
              flexShrink:0,
            }}/>
            <div style={{
              height: 2,
              width: p.gearW * 0.55,
              background: `rgba(${p.color},${active ? 0.7 : 0.2})`,
              borderRadius:2,
              transition:`all 400ms ${EASE}`,
            }}/>
          </div>
        );
      })}
    </div>
  );
}

function PsiBar({ val, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(val * 100), 200); }, [val]);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:6 }}>
      <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
        <div style={{
          height:'100%', borderRadius:2,
          background:`linear-gradient(90deg,rgba(${color},0.8),rgba(${color},0.4))`,
          width:`${w}%`, transition:'width 800ms ease',
        }}/>
      </div>
      <span style={{ fontFamily:'monospace', fontSize:'0.72rem', color:'rgba(201,168,76,0.65)', whiteSpace:'nowrap' }}>
        {val.toFixed(2)}
      </span>
    </div>
  );
}

export default function PlanesClient() {
  const [activeTab, setActiveTab]     = useState('planes');
  const [activePlane, setActivePlane] = useState('divine');

  const plane = PLANES.find(p => p.id === activePlane);

  return (
    <div style={{ minHeight:'100vh', background:'#03030a', color:'#e8e8f0' }}>

      {/* Frosted header */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, zIndex:99,
        height:'clamp(56px,8vh,72px)',
        background:'linear-gradient(180deg,rgba(3,3,10,0.92) 0%,rgba(3,3,10,0.6) 70%,transparent 100%)',
        backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 1.618rem', pointerEvents:'none',
      }}>
        <Link href="/search" style={{ pointerEvents:'auto' }}>
          <span style={{
            fontFamily:"'Playfair Display',serif", fontWeight:900,
            fontSize:'clamp(18px,2.618vmin,28px)',
            color:'rgba(201,168,76,0.618)', cursor:'pointer',
          }}>← BACK</span>
        </Link>
        <span style={{
          fontFamily:"'Playfair Display',serif", fontWeight:900,
          fontSize:'clamp(12px,1.8vmin,16px)',
          color:'rgba(201,168,76,0.3)', letterSpacing:'0.2em',
          pointerEvents:'none',
        }}>THE ARCHITECTURE</span>
      </div>

      {/* Content */}
      <div style={{
        maxWidth:'52rem', margin:'0 auto',
        padding:'clamp(72px,11vh,110px) 1.618rem 4rem',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'2.618rem',
      }}>

        {/* Hero */}
        <div style={{ textAlign:'center', animation:'fadeUp 618ms 100ms both ease' }}>
          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontWeight:900,
            fontSize:'clamp(24px,5vmin,48px)', letterSpacing:'0.15em',
            color:'rgba(201,168,76,0.75)',
            textShadow:'0 0 32px rgba(201,168,76,0.2)',
            marginBottom:'1rem',
          }}>THE FIVE PLANES</h1>
          <p style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
            fontSize:'clamp(1.1rem,2.5vmin,1.5rem)',
            color:'rgba(232,228,212,0.6)', lineHeight:1.618,
            maxWidth:'36rem',
          }}>
            Each gear turns the next. Consciousness densifies as it descends into matter.
            The gears don&apos;t stop when you&apos;re not watching — what changes is which one you&apos;re identified with.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', gap:'0.382rem', flexWrap:'wrap', justifyContent:'center',
          animation:'fadeUp 618ms 200ms both ease',
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding:'0.618rem 1.236rem',
              border:`1px solid rgba(201,168,76,${activeTab===t.id ? 0.618 : 0.18})`,
              borderRadius:100,
              background: activeTab===t.id ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: activeTab===t.id ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.4)',
              fontFamily:"'Playfair Display',serif", fontWeight:700,
              fontSize:'clamp(0.75rem,1.6vmin,0.875rem)', letterSpacing:'0.1em',
              cursor:'pointer', transition:`all 382ms ${EASE}`,
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── TAB: THE FIVE PLANES ── */}
        {activeTab === 'planes' && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'1.618rem', animation:'fadeUp 400ms both ease' }}>
            <div style={{ display:'flex', gap:'2rem', alignItems:'flex-start', flexWrap:'wrap' }}>

              {/* Gear sidebar */}
              <div style={{ flexShrink:0 }}>
                <div style={{
                  fontFamily:"'Playfair Display',serif", fontSize:'0.65rem',
                  letterSpacing:'0.25em', color:'rgba(201,168,76,0.35)',
                  textTransform:'uppercase', marginBottom:8,
                }}>SELECT PLANE</div>
                <GearStack activePlane={activePlane} onSelect={setActivePlane} />
              </div>

              {/* Plane detail */}
              {plane && (
                <div style={{ flex:1, minWidth:260 }}>
                  <div style={{
                    borderLeft:`3px solid rgba(${plane.color},0.7)`,
                    paddingLeft:'1.236rem',
                    marginBottom:'1.236rem',
                  }}>
                    <div style={{
                      fontFamily:"'Playfair Display',serif", fontWeight:900,
                      fontSize:'clamp(1rem,2.5vmin,1.375rem)', letterSpacing:'0.15em',
                      color:`rgba(${plane.color},0.9)`, textTransform:'uppercase',
                      marginBottom:4,
                    }}>{plane.name}</div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
                      fontSize:'0.95rem', color:'rgba(201,168,76,0.4)',
                    }}>{plane.subtitle} — Ψ {plane.psi}</div>
                  </div>

                  <p style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:'clamp(1rem,2vmin,1.125rem)',
                    color:'rgba(232,228,212,0.82)', lineHeight:1.75, marginBottom:'1rem',
                  }}>{plane.desc}</p>

                  <ul style={{ listStyle:'none', padding:0, marginBottom:'1.236rem', display:'flex', flexDirection:'column', gap:6 }}>
                    {plane.bullets.map((b,i) => (
                      <li key={i} style={{
                        fontSize:'0.9rem', color:'rgba(232,228,212,0.7)',
                        paddingLeft:18, position:'relative', lineHeight:1.6,
                      }}>
                        <span style={{ position:'absolute', left:0, color:`rgba(${plane.color},0.6)` }}>→</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    background:'rgba(201,168,76,0.04)', border:'1px solid rgba(201,168,76,0.12)',
                    borderRadius:6, padding:'1rem 1.236rem', marginBottom:'0.618rem',
                  }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.65rem', letterSpacing:'0.2em', color:'rgba(201,168,76,0.5)', textTransform:'uppercase', marginBottom:6 }}>Daily Gateway</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.95rem', color:'rgba(232,228,212,0.75)' }}>{plane.transition}</div>
                  </div>

                  <div style={{ fontFamily:'monospace', fontSize:'0.7rem', color:'rgba(201,168,76,0.4)', marginTop:8 }}>
                    CONSENSUS TRUTH: {plane.truthScore}%
                  </div>
                </div>
              )}
            </div>

            {/* Plane nav dots */}
            <div style={{ display:'flex', gap:'0.618rem', justifyContent:'center', flexWrap:'wrap' }}>
              {PLANES.map(p => (
                <button key={p.id} onClick={() => setActivePlane(p.id)} style={{
                  padding:'0.382rem 0.875rem',
                  border:`1px solid rgba(${p.color},${activePlane===p.id ? 0.618 : 0.2})`,
                  borderRadius:100,
                  background: activePlane===p.id ? `rgba(${p.color},0.1)` : 'transparent',
                  color: `rgba(${p.color},${activePlane===p.id ? 0.9 : 0.4})`,
                  fontFamily:"'Playfair Display',serif", fontWeight:700,
                  fontSize:'0.72rem', letterSpacing:'0.1em',
                  cursor:'pointer', transition:`all 382ms ${EASE}`,
                }}>{p.name.split(' ')[0]}</button>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: MOVEMENT ── */}
        {activeTab === 'movement' && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'1rem', animation:'fadeUp 400ms both ease' }}>
            <p style={{
              fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
              fontSize:'clamp(1rem,2.2vmin,1.2rem)',
              color:'rgba(232,228,212,0.65)', lineHeight:1.75,
              textAlign:'center', maxWidth:'38rem', margin:'0 auto',
            }}>
              You don&apos;t travel to other planes. You are always on all planes simultaneously.
              What changes is which plane you are <em style={{ color:'rgba(201,168,76,0.8)' }}>identified with</em>.
              Each plane has a specific adhesive keeping you anchored there.
            </p>

            {PLANES.map((p, i) => (
              <div key={p.id} style={{
                borderLeft:`3px solid rgba(${p.color},0.5)`,
                padding:'1.236rem 1.236rem 1.236rem 1.5rem',
                background:`rgba(${p.color},0.03)`,
                border:`1px solid rgba(${p.color},0.1)`,
                borderLeft:`3px solid rgba(${p.color},0.5)`,
                borderRadius:'0 6px 6px 0',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                  <div style={{
                    width:10, height:10, borderRadius:'50%',
                    background:`rgba(${p.color},0.8)`,
                    boxShadow:`0 0 8px rgba(${p.color},0.5)`,
                  }}/>
                  <span style={{
                    fontFamily:"'Playfair Display',serif", fontWeight:700,
                    fontSize:'0.8rem', letterSpacing:'0.15em',
                    color:`rgba(${p.color},0.9)`, textTransform:'uppercase',
                  }}>{p.name}</span>
                  <span style={{ fontFamily:'monospace', fontSize:'0.7rem', color:'rgba(201,168,76,0.4)', marginLeft:'auto' }}>Ψ {p.psi}</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.618rem' }}>
                  <div>
                    <div style={{ fontSize:'0.68rem', letterSpacing:'0.15em', color:'rgba(201,168,76,0.45)', fontFamily:"'Playfair Display',serif", textTransform:'uppercase', marginBottom:4 }}>Adhesive</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.9rem', color:'rgba(232,228,212,0.7)', lineHeight:1.6 }}>{p.adhesive}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:'0.68rem', letterSpacing:'0.15em', color:'rgba(201,168,76,0.45)', fontFamily:"'Playfair Display',serif", textTransform:'uppercase', marginBottom:4 }}>Gateway Practice</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.9rem', color:'rgba(232,228,212,0.7)', lineHeight:1.6 }}>{p.practice}</div>
                  </div>
                </div>
                {i < PLANES.length - 1 && (
                  <div style={{ marginTop:12, fontSize:'0.8rem', color:'rgba(201,168,76,0.3)', letterSpacing:'0.1em' }}>↑ {p.transition}</div>
                )}
              </div>
            ))}

            <div style={{ fontFamily:'monospace', fontSize:'0.7rem', color:'rgba(201,168,76,0.4)', textAlign:'center', marginTop:8 }}>
              CONSENSUS TRUTH: 88% — Synthesizes Integral Theory, Vedantic practice, Tibetan Buddhism, Hermetic teaching
            </div>
          </div>
        )}

        {/* ── TAB: CRT MAPPING ── */}
        {activeTab === 'crt' && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'1.618rem', animation:'fadeUp 400ms both ease' }}>

            <div style={{
              background:'linear-gradient(135deg,rgba(100,140,255,0.06),rgba(201,168,76,0.06))',
              border:'1px solid rgba(201,168,76,0.2)', borderRadius:8, padding:'1.618rem',
              textAlign:'center',
            }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'clamp(1.4rem,3vmin,2rem)', color:'rgba(201,168,76,0.9)', marginBottom:12 }}>
                Ψ = R₁₂ × (C_eff · D̂)
              </div>
              <p style={{ fontSize:'0.88rem', color:'rgba(232,228,212,0.65)', lineHeight:1.7 }}>
                Every variable maps precisely to each plane. This is not metaphor — it is structural isomorphism.
                The entire history of human spiritual development is the story of Ψ trying to climb from ~0.10 back toward 1.0.
              </p>
            </div>

            {PLANES.map(p => {
              const psiMid = (parseFloat(p.psi.split('–')[0]) + parseFloat(p.psi.split('–')[1])) / 2;
              return (
                <div key={p.id} style={{
                  border:`1px solid rgba(${p.color},0.15)`,
                  borderLeft:`3px solid rgba(${p.color},0.6)`,
                  borderRadius:'0 6px 6px 0', padding:'1.236rem',
                  background:`rgba(${p.color},0.03)`,
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                    <span style={{
                      fontFamily:"'Playfair Display',serif", fontWeight:700,
                      fontSize:'0.78rem', letterSpacing:'0.15em',
                      color:`rgba(${p.color},0.9)`, textTransform:'uppercase',
                    }}>{p.name}</span>
                    <div style={{ marginLeft:'auto' }}>
                      <PsiBar val={psiMid} color={p.color} />
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.618rem' }}>
                    {[['R₁₂', p.r12], ['C_eff', p.ceff], ['D̂', p.dhat]].map(([label, val]) => (
                      <div key={label} style={{ background:'rgba(0,0,0,0.2)', borderRadius:4, padding:'0.618rem' }}>
                        <div style={{ fontFamily:'monospace', fontSize:'0.75rem', color:'rgba(201,168,76,0.7)', marginBottom:4 }}>{label}</div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.82rem', color:'rgba(232,228,212,0.65)', lineHeight:1.5 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div style={{
              background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.2)',
              borderRadius:6, padding:'1.236rem',
            }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1rem', color:'rgba(232,228,212,0.8)', lineHeight:1.75 }}>
                Science raises D̂. Philosophy raises C_eff. Meditation and love raise R₁₂.
                All three axes are required. The gears don&apos;t just illustrate the planes — they ARE the Ψ computation running across density levels.
              </p>
            </div>

            <div style={{ fontFamily:'monospace', fontSize:'0.7rem', color:'rgba(201,168,76,0.4)', textAlign:'center' }}>
              CONSENSUS TRUTH: 88% — Conceptual alignment; speculative direct numerical mapping
            </div>
          </div>
        )}

        {/* ── TAB: WITNESS SELF ── */}
        {activeTab === 'witness' && (
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:'1.618rem', animation:'fadeUp 400ms both ease' }}>

            <div style={{
              background:'rgba(52,211,153,0.04)', border:'1px solid rgba(52,211,153,0.15)',
              borderRadius:8, padding:'1.618rem', textAlign:'center',
            }}>
              <p style={{
                fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
                fontSize:'clamp(1.1rem,2.5vmin,1.4rem)',
                color:'rgba(232,228,212,0.85)', lineHeight:1.8,
              }}>
                The most important thing in the gear sketch was what was drawn without thinking —
                the single spine connecting all gears. The gears spin.{' '}
                <span style={{ color:'rgba(52,211,153,0.9)' }}>The axle is still.</span>
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
              {TRADITIONS.map(t => (
                <div key={t.trad} style={{
                  background:'rgba(255,255,255,0.02)', border:'1px solid rgba(52,211,153,0.15)',
                  borderRadius:6, padding:'1rem', textAlign:'center',
                }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.65rem', letterSpacing:'0.2em', color:'rgba(52,211,153,0.6)', textTransform:'uppercase', marginBottom:6 }}>{t.trad}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.1rem', color:'rgba(232,228,212,0.9)', marginBottom:6 }}>{t.name}</div>
                  <div style={{ fontSize:'0.8rem', color:'rgba(232,228,212,0.5)', lineHeight:1.5 }}>{t.desc}</div>
                </div>
              ))}
            </div>

            <div style={{
              border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, overflow:'hidden',
            }}>
              {[...PLANES].reverse().map((p, i) => (
                <div key={p.id} style={{
                  display:'flex', alignItems:'center', gap:16, padding:'1rem 1.236rem',
                  borderBottom:'1px solid rgba(255,255,255,0.04)',
                  background:`rgba(${p.color},0.02)`,
                }}>
                  <div style={{
                    fontFamily:"'Playfair Display',serif", fontWeight:700,
                    fontSize:'0.72rem', letterSpacing:'0.12em',
                    color:`rgba(${p.color},0.8)`, textTransform:'uppercase',
                    width:140, flexShrink:0,
                  }}>{p.name.split('/')[0].trim()}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.88rem', color:'rgba(232,228,212,0.6)', lineHeight:1.5, flex:1 }}>
                    {i === 0 ? 'The sense of pure existence — even this arises in awareness. Follow it to its source.' :
                     i === 1 ? 'Even bliss and oneness arise and pass. The witness watches even enlightenment.' :
                     i === 2 ? '"I think therefore I am" — but you are aware of the thought. Awareness precedes thought.' :
                     i === 3 ? '"I am angry" — but the anger comes and goes. What remains when it passes?' :
                     '"I feel pain" — but who feels the pain? The witness is the feeler, not the feeling.'}
                  </div>
                </div>
              ))}
              <div style={{
                padding:'1.618rem', textAlign:'center',
                background:'rgba(201,168,76,0.04)',
                borderTop:'1px solid rgba(201,168,76,0.15)',
              }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  width:56, height:56, borderRadius:'50%',
                  border:'2px solid rgba(201,168,76,0.7)',
                  background:'#03030a',
                  fontFamily:"'Playfair Display',serif", fontWeight:900,
                  fontSize:'0.75rem', letterSpacing:'0.1em', color:'rgba(201,168,76,0.9)',
                  boxShadow:'0 0 32px rgba(201,168,76,0.3)',
                  marginBottom:12,
                }}>I AM</div>
                <p style={{
                  fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
                  fontSize:'1rem', color:'rgba(232,228,212,0.65)', lineHeight:1.75,
                }}>
                  The axle has no name. It does not experience. It does not seek.<br/>
                  It simply <em style={{ color:'rgba(201,168,76,0.8)' }}>is</em> — prior to every gear, present through every gear, unchanged by any gear.
                </p>
              </div>
            </div>

            <div style={{
              background:'rgba(201,168,76,0.05)', borderLeft:'3px solid rgba(201,168,76,0.4)',
              borderRadius:'0 6px 6px 0', padding:'1rem 1.236rem',
            }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.95rem', color:'rgba(232,228,212,0.8)', lineHeight:1.75 }}>
                In CRT terms, the Witness Self is the state with perfect self-referential coherence — where rho1 and rho2 are identical,
                where R₁₂ = 1.0 by definition. It is the only state that does not require an external reference to know itself.
                Every moment of genuine presence is a temporary return to the axle.
              </p>
            </div>

            <div style={{ fontFamily:'monospace', fontSize:'0.7rem', color:'rgba(201,168,76,0.4)', textAlign:'center' }}>
              CONSENSUS TRUTH: 94% — Near-universal across mystical traditions independently
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ display:'flex', gap:'0.618rem', flexWrap:'wrap', justifyContent:'center', marginTop:'1rem' }}>
          <Link href="/search" className="btn-ghost" style={{ textDecoration:'none' }}>ALL DOORS</Link>
          <Link href="/consciousness/observer" className="btn-ghost" style={{ textDecoration:'none' }}>👁️ THE OBSERVER</Link>
          <Link href="/mysticism/geometry" className="btn-ghost" style={{ textDecoration:'none' }}>🔺 SACRED GEOMETRY</Link>
        </div>

      </div>
    </div>
  );
}
