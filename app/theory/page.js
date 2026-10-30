import Link from 'next/link';
import { pageMeta, SITE_URL } from '@/lib/meta';
import {
  PAPER, PREVIOUS, EQUATION, IN_ONE_BREATH, CLAIMS, WHAT_V11_FOUND, GLOSSARY, TESTS, SENSITIVITY,
  RELATED, VERSIONS, HOW_IT_WAS_WRITTEN, CITE, ROOM_PSI_NOTE,
} from '@/lib/content/theory';
import PsiCalculator from './PsiCalculator';
import CopyButton from './CopyButton';

export const metadata = pageMeta('/theory', {
  title: 'Convergent Recognition Theory (Ψ = R₁₂ × Γ) | Jeff Sellers',
  description: `Convergent Recognition Theory by Jeffrey M. Sellers, v${PAPER.version}, ${PAPER.date}. Ψ = R₁₂ × Γ: one number for how well two independent pictures of the same thing agree, and how much that agreement is worth. The paper, the equation piece by piece, a live calculator, the tests that could prove it wrong, and every version.`,
  keywords: 'convergent recognition theory, CRT, psi, Jeff Sellers, Jeffrey Sellers, coherence functional, quantum fidelity, Jensen-Shannon divergence, information geometry, recognition',
  openGraph: {
    title: `Convergent Recognition Theory, v${PAPER.version}`,
    description: 'Ψ = R₁₂ × Γ. Signal goes out. Comes back the same. One number for recognition, and the tests that could prove it wrong.',
    type: 'article',
  },
});

const GOLD = '201,168,76';

function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="theory-section">
      {kicker && <div className="theory-kicker">{kicker}</div>}
      <h2 className="theory-h2">{title}</h2>
      {children}
    </section>
  );
}

export default function TheoryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: `${PAPER.title}: ${PAPER.subtitle}`,
    author: { '@type': 'Person', name: PAPER.author, url: `${SITE_URL}/about` },
    datePublished: PAPER.dateISO,
    version: PAPER.version,
    url: `${SITE_URL}/theory`,
    encoding: { '@type': 'MediaObject', contentUrl: `${SITE_URL}${PAPER.pdf}`, encodingFormat: 'application/pdf' },
    ...(PAPER.doi ? { identifier: PAPER.doi } : {}),
  };

  return (
    <main className="phi-page content-below-header bg-glow-top theory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .theory { gap: 0; }
        .theory-wrap { width: 100%; max-width: var(--content-max); display: flex; flex-direction: column; gap: var(--s-lg); }
        .theory-kicker { font-family: var(--font-body); font-size: 0.85rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(${GOLD},0.8); margin-bottom: 0.4rem; }
        .theory-h1 { font-family: var(--font-display); font-weight: 900; font-size: clamp(2rem, 7vmin, 3.25rem); line-height: 1.05; color: rgba(232,213,160,1); margin: 0; text-align: center; text-shadow: 0 0 1rem rgba(${GOLD},0.25); }
        .theory-sub { font-family: var(--font-accent); font-style: italic; font-size: clamp(1.15rem, 3vmin, 1.5rem); color: rgba(232,232,240,0.85); text-align: center; margin: 0.5rem 0 0; }
        .theory-eq { font-family: var(--font-display); font-size: clamp(1.5rem, 5vmin, 2.4rem); color: rgba(${GOLD},1); text-align: center; margin: var(--s-md) 0 0.5rem; letter-spacing: 0.04em; }
        .theory-byline { font-family: var(--font-body); font-size: 0.95rem; color: rgba(232,232,240,0.8); text-align: center; line-height: 1.7; }
        .theory-byline b { color: rgba(232,213,160,1); font-weight: 500; }
        .theory-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: var(--s-sm); }
        .theory-h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.4rem, 4vmin, 1.9rem); color: rgba(232,213,160,1); margin: 0 0 var(--s-sm); }
        .theory p { font-family: var(--font-body); font-size: clamp(1.05rem, 2.2vmin, 1.2rem); line-height: 1.7; color: rgba(232,232,240,0.9); margin: 0 0 var(--s-sm); max-width: 68ch; }
        .theory-breath p { font-family: var(--font-accent); font-size: clamp(1.25rem, 2.8vmin, 1.5rem); line-height: 1.6; color: rgba(232,232,240,0.95); }
        .theory-claim { border-left: 2px solid rgba(${GOLD},0.6); padding: 0.25rem 0 0.25rem 1rem; margin-bottom: var(--s-md); }
        .theory-claim h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: rgba(${GOLD},0.95); margin: 0 0 0.4rem; }
        .theory-table { width: 100%; border-collapse: collapse; font-family: var(--font-body); font-size: 0.98rem; color: rgba(232,232,240,0.9); }
        .theory-table th { text-align: left; font-weight: 500; color: rgba(${GOLD},0.9); border-bottom: 1px solid rgba(${GOLD},0.35); padding: 0.5rem 0.5rem 0.5rem 0; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; }
        .theory-table td { vertical-align: top; border-bottom: 1px solid rgba(${GOLD},0.15); padding: 0.6rem 0.5rem 0.6rem 0; line-height: 1.55; }
        .theory-table td.sym { font-family: var(--font-display); color: rgba(232,213,160,1); white-space: nowrap; font-size: 1.05rem; }
        .theory-table td.range { white-space: nowrap; color: rgba(232,232,240,0.7); }
        .theory-test { border: 1px solid rgba(${GOLD},0.22); border-radius: 0.5rem; padding: 1rem 1.1rem; margin-bottom: 0.75rem; }
        .theory-test h3 { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: rgba(232,213,160,1); margin: 0 0 0.4rem; }
        .theory-test h3 span { color: rgba(${GOLD},0.8); font-weight: 400; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; margin-right: 0.6rem; }
        .theory-test p { font-size: 1rem; margin-bottom: 0.35rem; }
        .theory-test p b { color: rgba(${GOLD},0.95); font-weight: 500; }
        .theory-list { list-style: none; padding: 0; margin: 0; }
        .theory-list li { padding: 0.55rem 0; border-bottom: 1px solid rgba(${GOLD},0.14); font-family: var(--font-body); font-size: 1rem; line-height: 1.6; color: rgba(232,232,240,0.9); }
        .theory-list li b { color: rgba(232,213,160,1); font-weight: 500; }
        .theory-version { display: grid; grid-template-columns: 6.5rem 1fr; gap: 0.75rem; }
        .theory-version .v { font-family: var(--font-display); color: rgba(${GOLD},0.95); }
        .theory-version .d { display: block; font-size: 0.85rem; color: rgba(232,232,240,0.65); }
        .theory-cite { font-family: var(--font-body); font-size: 0.95rem; color: rgba(232,232,240,0.9); background: rgba(${GOLD},0.05); border: 1px solid rgba(${GOLD},0.25); border-radius: 0.4rem; padding: 0.8rem 1rem; line-height: 1.6; }
        .theory-mono { font-family: ui-monospace, Menlo, monospace; font-size: 0.8rem; color: rgba(232,232,240,0.7); word-break: break-all; }
        .theory-toc { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; justify-content: center; font-family: var(--font-body); font-size: 0.9rem; letter-spacing: 0.06em; }
        .theory-toc a { color: rgba(${GOLD},0.85); border-bottom: 1px solid rgba(${GOLD},0.25); }
        @media (max-width: 640px) { .theory-version { grid-template-columns: 5rem 1fr; } .theory-table td.range { white-space: normal; } }
      `}</style>

      <div className="theory-wrap">
        <header>
          <div className="theory-kicker" style={{ textAlign: 'center' }}>The equation underneath</div>
          <h1 className="theory-h1">{PAPER.title}</h1>
          <p className="theory-sub">{PAPER.subtitle}</p>
          <div className="theory-eq" aria-label="Psi equals R one two times Gamma">{EQUATION}</div>
          <div className="theory-byline">
            <b>{PAPER.author}</b> · {PAPER.place}<br />
            Version {PAPER.version} · {PAPER.date}{PAPER.doi ? <> · DOI {PAPER.doi}</> : null}
          </div>
          <div className="theory-actions">
            <a className="btn-ghost" href={PAPER.pdf}>READ THE PAPER (PDF)</a>
            <a className="btn-ghost" href="#cite">CITE</a>
            <a className="btn-ghost" href="#try">TRY THE EQUATION</a>
          </div>
          <nav className="theory-toc" aria-label="On this page" style={{ marginTop: 'var(--s-md)' }}>
            <a href="#breath">In one breath</a>
            <a href="#claims">What it claims</a>
            <a href="#found">What v11 found</a>
            <a href="#pieces">Piece by piece</a>
            <a href="#try">Try it</a>
            <a href="#tests">What would prove it wrong</a>
            <a href="#neighbors">Where it sits</a>
            <a href="#rooms">The Ψ on the doors</a>
            <a href="#versions">Every version</a>
          </nav>
        </header>

        <Section id="breath" kicker="In one breath" title="What Ψ measures">
          <div className="theory-breath">
            {IN_ONE_BREATH.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </Section>

        <Section id="claims" kicker="Two claims" title="What the paper claims, and what it only hopes">
          <div className="theory-claim">
            <h3>{CLAIMS.weak.title}</h3>
            <p>{CLAIMS.weak.text}</p>
          </div>
          <div className="theory-claim">
            <h3>{CLAIMS.strong.title}</h3>
            <p>{CLAIMS.strong.text}</p>
          </div>
          <p>The paper keeps those two apart on purpose. This site is the second one, lived out loud: the poems, the doors, the Vitruvian Man breathing between the circle and the square. The first one is the part a lab could check.</p>
        </Section>

        <Section id="found" kicker="Version 11" title="What happened when the tests were run">
          <p>Up to version 8.7 the paper described its tests. Version 11 ran them, in code released with the paper, and then had a fresh reviewer check every number against that code. This is what came out, with the failures first.</p>
          <ul className="theory-list">
            {WHAT_V11_FOUND.map((f) => <li key={f.s}><b>{f.s}.</b> {f.m}</li>)}
          </ul>
          <p style={{ marginTop: 'var(--s-sm)', fontSize: '0.95rem', color: 'rgba(232,232,240,0.75)' }}>
            The code: <a href={PAPER.code} style={{ color: `rgba(${GOLD},0.9)` }}>paper/sim on GitHub</a>. The source of the paper: <a href={PAPER.source} style={{ color: `rgba(${GOLD},0.9)` }}>paper/CRT-v11.0.md</a>. Every simulated number in the paper is produced by that code.
          </p>
        </Section>

        <Section id="pieces" kicker="Piece by piece" title="Every symbol in the equation">
          <p>Each factor is a plain number between 0 and 1. Multiply them and you have Ψ. Written as a sum of costs, Ψ = 2^(−S_eff): every factor below 1 adds bits to S_eff, and Ψ pays for them.</p>
          <table className="theory-table">
            <thead><tr><th>Symbol</th><th>Name</th><th>What it is</th><th>Range</th></tr></thead>
            <tbody>
              {GLOSSARY.map((g) => (
                <tr key={g.sym}>
                  <td className="sym">{g.sym}</td>
                  <td>{g.name}</td>
                  <td>{g.def}</td>
                  <td className="range">{g.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="try" kicker="Try it" title="Ψ, live, for two qubits">
          <p>Two pictures of one qubit. Tilt and turn each one, make it pure or mixed, then set how much the reconstruction methods agree and how clean the detector was. The numbers are computed exactly as the paper defines them for d = 2.</p>
          <PsiCalculator />
          <p style={{ marginTop: 'var(--s-sm)', fontSize: '0.95rem', color: 'rgba(232,232,240,0.75)' }}>
            Watch the third preset: two blank pictures match perfectly (F near 1) and still score nothing, because the gate will not let shared ignorance count as recognition. That one line is the heart of the paper. (In a real measurement with N counts the blank score is not zero but about 34.3/N; the calculator shows the exact, infinite-data value.)
          </p>
          <table className="theory-table" style={{ marginTop: 'var(--s-sm)' }}>
            <thead><tr><th>Simulated state (paper, appendix B.1; 10,000 counts per batch)</th><th>Ψ̂ measured</th><th>Ψ upper bound</th></tr></thead>
            <tbody>
              {SENSITIVITY.map((s) => (
                <tr key={s.state}><td>{s.state}</td><td className="range">{s.psi}</td><td className="range">{s.upper}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="tests" kicker="What would prove it wrong" title="The tests, with their failure conditions">
          <p>No laboratory experiment has been run yet. These are the tests the paper sets out, each with the result that would count against it. Version 11 ran them in simulation first; one failed and is kept here as a withdrawn prediction.</p>
          {TESTS.map((t) => (
            <div className="theory-test" key={t.id}>
              <h3><span>{t.id} · {t.kind}</span>{t.name}</h3>
              <p><b>Setup.</b> {t.what}</p>
              <p><b>Expected.</b> {t.expect}</p>
              <p><b>Failure.</b> {t.fail}</p>
            </div>
          ))}
        </Section>

        <Section id="neighbors" kicker="Where it sits" title="The company it keeps">
          <p>Recognition as the basic relation is an old idea with many homes. Naming them is the honest way to say what is new here: not the idea, but the number.</p>
          <ul className="theory-list">
            {RELATED.map((r) => <li key={r.who}><b>{r.who}.</b> {r.what}</li>)}
          </ul>
        </Section>

        <Section id="rooms" kicker="On this site" title="The Ψ on the doors and rooms">
          <p>{ROOM_PSI_NOTE}</p>
          <p>The animations on the intro and the poem pages picture recognition as a pull between bodies. That picture is the site's, not the paper's: a way to feel the idea, not a model of gravity.</p>
        </Section>

        <Section id="versions" kicker="Every version" title="How this was written">
          <p>{HOW_IT_WAS_WRITTEN}</p>
          <ul className="theory-list">
            {VERSIONS.map((v) => (
              <li key={v.v} className="theory-version">
                <span className="v">{v.v}{v.date && <span className="d">{v.date}</span>}</span>
                <span>{v.note}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 'var(--s-sm)', fontSize: '0.95rem', color: 'rgba(232,232,240,0.75)' }}>
            Both hosted PDFs carry the author metadata; their SHA-256 hashes are below. Version {PREVIOUS.version} stays hosted at <a href={PREVIOUS.pdf} style={{ color: `rgba(${GOLD},0.9)` }}>its own link</a>, and its original bytes as written on {PREVIOUS.date} are kept unchanged at <a href={PREVIOUS.originalPdf} style={{ color: `rgba(${GOLD},0.9)` }}>the archive copy</a>.
          </p>
          <div className="theory-mono">v{PAPER.version} hosted: {PAPER.sha256}</div>
          <div className="theory-mono">v{PREVIOUS.version} hosted: {PREVIOUS.sha256}</div>
          <div className="theory-mono">v{PREVIOUS.version} original: {PREVIOUS.originalSha256}</div>
        </Section>

        <Section id="cite" kicker="Cite" title="How to cite this">
          <div className="theory-cite">{CITE.text}</div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
            <CopyButton text={CITE.text} label="Copy citation" />
            <CopyButton text={CITE.bibtex} label="Copy BibTeX" />
          </div>
          <p style={{ marginTop: 'var(--s-md)' }}>
            Questions, objections and corrections are welcome: see <Link href="/about" style={{ color: `rgba(${GOLD},0.95)` }}>About</Link>. The Vitruvian Man, the other half of the math on this site, is at <Link href="/mathematics/vitruvian" style={{ color: `rgba(${GOLD},0.95)` }}>/mathematics/vitruvian</Link>.
          </p>
        </Section>
      </div>
    </main>
  );
}
