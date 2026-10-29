import Link from 'next/link';
import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { FLOW_BOOKS, FLOW_CONDITIONS } from '@/lib/content/flow';

export const metadata = pageMeta('/flow', {
  title: 'Flow state: books and conditions | Education Revelation',
  description:
    'Three books on flow, from Csikszentmihalyi to Kotler, and the seven conditions of flow: clear goals, feedback, balance, concentration, loss of self, time, dopamine.',
  openGraph: {
    title: 'Flow state',
    description: 'Three books and seven conditions for the zone, where the world fades away and hours feel like minutes.',
  },
});

export default function FlowPage() {
  return (
    <ContentPage narrow>
      <PageHead eyebrow="A room in the consciousness door" title="Flow state" byline="Jeffrey Sellers" />

      <section className={s.section} aria-labelledby="books">
        <h2 id="books" className={s.h2}>Three books</h2>
        <ul className={s.list}>
          {FLOW_BOOKS.map((b) => (
            <li key={b.title} className={s.card}>
              <h3 className={s.h3}>{b.title}</h3>
              <p className={s.meta}>{b.author}</p>
              <p className={s.text}>{b.line}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="conditions">
        <h2 id="conditions" className={s.h2}>Seven conditions of flow</h2>
        <ol className={s.list}>
          {FLOW_CONDITIONS.map((c, i) => (
            <li key={c.name} className={s.card}>
              <p className={s.num}>{i + 1}</p>
              <h3 className={s.h3}>{c.name}</h3>
              <p className={s.text}>{c.line}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className={s.text}>
        Who is watching when the self goes quiet?{' '}
        <Link href="/consciousness/observer/flow-state-observer" className={s.link}>
          The observer in flow
        </Link>
        .
      </p>
    </ContentPage>
  );
}
