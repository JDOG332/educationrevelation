import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { MARKS_STANZAS, MARKS_SENSES, MARKS_TRUTH } from '@/lib/content/marks';
import m from './marks.module.css';

export const metadata = pageMeta('/marks', {
  title: 'Body makes marks | Education Revelation',
  description:
    'Why does the body make marks? Because the body is your first book. Scars, bruises, calluses and stretch marks as proof that two things recognized each other.',
  openGraph: {
    title: 'Body makes marks',
    description: "The mind forgets. Words fade. The body keeps the receipts.",
  },
});

export default function MarksPage() {
  return (
    <ContentPage narrow>
      <PageHead eyebrow="Sad dad sad" title="Body Makes Marks" byline="Jeffrey Sellers" />

      <section className={m.stanzas}>
        {MARKS_STANZAS.map((stanza, i) => (
          <p key={i} className={m.stanza}>
            {stanza.map((line, j) => (
              <span key={j} className={m.line}>{line}</span>
            ))}
          </p>
        ))}
      </section>

      <section className={s.section} aria-labelledby="senses">
        <h2 id="senses" className={s.h2}>Five senses lock-in</h2>
        <ul className={m.senses}>
          {MARKS_SENSES.map((x) => (
            <li key={x.line} className={m.sense}>
              <span className={m.emoji} aria-hidden="true">{x.emoji}</span>
              <span>{x.line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="truth">
        <h2 id="truth" className={s.h2}>Boiled truth</h2>
        <p className={m.stanza}>
          {MARKS_TRUTH.map((line, j) => (
            <span key={j} className={`${m.line} ${m.gold}`}>{line}</span>
          ))}
        </p>
      </section>
    </ContentPage>
  );
}
