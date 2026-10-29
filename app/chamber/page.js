import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { CHAMBER } from '@/lib/content/chamber';
import c from './chamber.module.css';

export const metadata = pageMeta('/chamber', {
  title: 'The Convergence Chamber | Education Revelation',
  description:
    "A thought experiment by Jeffrey M. Sellers: 500 of history's greatest minds, one stable realm, one hundred years. They go home only if all of them genuinely believe one sentence.",
  openGraph: {
    title: 'The Convergence Chamber',
    description: "Could history's greatest minds agree on one truth? A thought experiment, February 2026.",
    type: 'article',
  },
});

export default function ChamberPage() {
  return (
    <ContentPage>
      <PageHead eyebrow="A thought experiment" title={CHAMBER.title} subtitle={CHAMBER.subtitle} byline={CHAMBER.byline} />

      <article className={c.article}>
        {CHAMBER.blocks.map((b, i) => {
          if (b.h) return <h2 key={i} className={`${s.h2} ${c.h}`}>{b.h}</h2>;
          if (b.q) return <p key={i} className={c.q}>{b.q}</p>;
          if (b.gold) return <p key={i} className={c.gold}>{b.gold}</p>;
          return <p key={i}>{b.p}</p>;
        })}

        <hr className={s.rule} />
        <p className={s.note}>{CHAMBER.method}</p>

        <h2 className={`${s.h3} ${c.h}`}>References</h2>
        <ul className={c.refs}>
          {CHAMBER.references.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </article>
    </ContentPage>
  );
}
