import Link from 'next/link';
import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { PROOF_INTRO, PROOF_TURN, PROOF_OUTRO, PROOF_ROWS } from '@/lib/content/proof';
import p from './proof.module.css';

export const metadata = pageMeta('/proof', {
  title: 'The proof: an evidence trail | Education Revelation',
  description:
    'Across thousands of years and dozens of fields, people kept describing the same thing: reality as recognition. Twenty-two fingerprints, four rows of the Tetractys.',
  openGraph: {
    title: 'The proof: an evidence trail',
    description: 'Seeing, connecting, understanding, being. Domain by domain, voice by voice. All roads, same room.',
  },
});

function Dots({ n }) {
  return (
    <span className={p.dots} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={p.dot} />
      ))}
    </span>
  );
}

export default function ProofPage() {
  return (
    <ContentPage>
      <PageHead eyebrow="The evidence trail" title="The proof" byline="Jeffrey Sellers" />

      <section className={s.prose}>
        {PROOF_INTRO.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p><em>{PROOF_TURN}</em></p>
        <p>{PROOF_OUTRO}</p>
      </section>

      {PROOF_ROWS.map((row) => (
        <section key={row.n} className={s.section} aria-labelledby={`row-${row.n}`}>
          <div className={p.rowHead}>
            <Dots n={row.n} />
            <h2 id={`row-${row.n}`} className={s.h2}>
              {row.n}. {row.name}
            </h2>
            <p className={s.meta}>{row.field}</p>
          </div>
          <ul className={s.list}>
            {row.items.map((item) => (
              <li key={item.name} className={s.card}>
                <h3 className={s.h3}>{item.name}</h3>
                <p className={s.meta}>
                  {item.when} · {item.domain}
                </p>
                <p className={s.text}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <hr className={s.rule} />

      <section className={s.section}>
        <p className={p.sum}>1 + 2 + 3 + 4 = 10</p>
        <p className={s.text}>
          Seeing, connecting, understanding, being. Four rows, one triangle, ten points. The Pythagoreans drew it as the
          Tetractys. Every row above is a different door reaching the same room.
        </p>
        <p className={s.text}>
          <Link href="/theory" className={s.link}>Read the theory behind it</Link>
        </p>
      </section>
    </ContentPage>
  );
}
