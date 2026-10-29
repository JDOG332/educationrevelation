import Link from 'next/link';
import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { PATH_TAGLINE, PATH_STEPS } from '@/lib/content/path';

export const metadata = pageMeta('/path', {
  title: 'The core unified path: nine steps | Education Revelation',
  description:
    'The call, the fear, the guide, the leap, the mirror, the descent, the spark, the rebirth, the service. Nine steps of the one story people keep telling.',
  openGraph: {
    title: 'The Core Unified Path',
    description: "The source code of the human experience. The only story we've ever really told.",
  },
});

export default function PathPage() {
  return (
    <ContentPage narrow>
      <PageHead eyebrow="Nine steps" title="The Core Unified Path" subtitle={PATH_TAGLINE} byline="Jeffrey Sellers" />

      <p className={s.text}>
        Every myth, every life, every hard year runs through the same nine steps. Here they are, one line each.
      </p>

      <ol className={s.list}>
        {PATH_STEPS.map((step) => (
          <li key={step.n} className={s.card}>
            <p className={s.num}>{step.n}</p>
            <h2 className={s.h3}>{step.name}</h2>
            <p className={s.text}>{step.line}</p>
          </li>
        ))}
      </ol>

      <p className={s.text}>
        The same shape, told through the world&apos;s myths:{' '}
        <Link href="/mythology/hero" className={s.link}>the hero&apos;s journey</Link>.
      </p>
    </ContentPage>
  );
}
