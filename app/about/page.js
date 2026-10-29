import Link from 'next/link';
import { pageMeta, SITE_URL } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { ABOUT } from '@/lib/content/about';

export const metadata = pageMeta('/about', {
  title: 'About Jeff Sellers | Education Revelation',
  description: ABOUT.summary,
  openGraph: {
    title: 'About: who built this and why',
    description: ABOUT.summary,
    type: 'profile',
  },
});

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jeffrey M. Sellers',
    alternateName: 'Jeff Sellers',
    url: `${SITE_URL}/about`,
    address: { '@type': 'PostalAddress', addressLocality: 'Oakwood', addressRegion: 'OH', addressCountry: 'US' },
    ...(ABOUT.x ? { sameAs: [ABOUT.x] } : {}),
  };

  return (
    <ContentPage narrow>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead eyebrow="About" title="Who built this, and why" byline="Jeffrey M. Sellers · Oakwood, Ohio" />

      <div className={s.prose}>
        {ABOUT.who.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <section className={s.section}>
        <h2 className={s.h2}>Why this site exists</h2>
        <div className={s.prose}>
          {ABOUT.why.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>How AI was used</h2>
        <div className={s.prose}>
          {ABOUT.ai.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Where to start</h2>
        <ul className={s.list}>
          {ABOUT.start.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={s.link}>{item.label}</Link>
              <span className={s.meta}> · {item.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Reach Jeff</h2>
        <div className={s.prose}>
          {ABOUT.x
            ? <p>On X: <a className={s.link} href={ABOUT.x} rel="me noopener">{ABOUT.xHandle}</a>. Objections and corrections to the theory are welcome there; the best ones end up in the next version of the paper.</p>
            : <p>Objections and corrections to the theory are welcome; the best ones end up in the next version of the paper.</p>}
        </div>
      </section>
    </ContentPage>
  );
}
