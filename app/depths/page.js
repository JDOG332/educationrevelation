import Link from 'next/link';
import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { DEPTHS, DEPTHS_SENTENCE, DEPTHS_SHAPE, DEPTHS_JOURNEY, DEPTHS_PERFECT } from '@/lib/content/depths';
import d from './depths.module.css';

export const metadata = pageMeta('/depths', {
  title: 'The ten depths: ten breaths | Education Revelation',
  description:
    'Ten depths from the void to the mirror: I want, I see, I feel, I shape, I know, I crack, I am, you are, we become, it is what it is.',
  openGraph: {
    title: 'The ten depths',
    description: 'Want, see, feel, shape, know, crack, am, you, become, accept. That is a life.',
  },
});

export default function DepthsIndex() {
  return (
    <ContentPage narrow>
      <PageHead eyebrow="0 to 9" title="The ten depths" byline="Jeffrey Sellers" />

      <section className={s.prose}>
        <p>{DEPTHS_SENTENCE}</p>
        <p>{DEPTHS_SHAPE}</p>
      </section>

      <ol className={s.list}>
        {DEPTHS.map((depth) => {
          const inner = (
            <>
              <span className={d.n}>{depth.n}</span>
              <span className={d.body}>
                <span className={d.name}>{depth.name}</span>
                <span className={d.breath}>{depth.breath}</span>
              </span>
              {depth.slug && <span className={d.open} aria-hidden="true">→</span>}
            </>
          );
          return (
            <li key={depth.n}>
              {depth.slug ? (
                <Link href={`/depths/${depth.slug}`} className={`${s.cardLink} ${d.row}`}>
                  {inner}
                </Link>
              ) : (
                <div className={`${s.card} ${d.row} ${d.closed}`}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>

      <p className={s.note}>Depths 5, 6, 7 and 9 have pages now. The rest are coming.</p>

      <section className={s.prose}>
        <p>{DEPTHS_JOURNEY}</p>
        <p>
          {DEPTHS_PERFECT[0]}
          <br />
          {DEPTHS_PERFECT[1]}
        </p>
      </section>
    </ContentPage>
  );
}
