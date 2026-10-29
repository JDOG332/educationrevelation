import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../../_kit/Page';
import { DEPTH_PAGES } from '@/lib/content/depths';
import d from '../depths.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return DEPTH_PAGES.map((x) => ({ depth: x.slug }));
}

function find(slug) {
  return DEPTH_PAGES.find((x) => x.slug === slug);
}

export function generateMetadata({ params }) {
  const depth = find(params.depth);
  if (!depth) return {};
  const gist = depth.gist.slice(0, 2).join(' ');
  const breath = depth.breath.charAt(0).toUpperCase() + depth.breath.slice(1);
  return pageMeta(`/depths/${depth.slug}`, {
    title: `Depth ${depth.n}: ${depth.name} | Education Revelation`,
    description: `Depth ${depth.n} of ten. ${depth.name}: ${depth.breath}. ${gist}`,
    openGraph: {
      title: `Depth ${depth.n}: ${depth.name}`,
      description: `${breath}. ${depth.gist[0]}`,
    },
  });
}

export default function DepthPage({ params }) {
  const depth = find(params.depth);
  if (!depth) notFound();

  const i = DEPTH_PAGES.indexOf(depth);
  const prev = DEPTH_PAGES[i - 1];
  const next = DEPTH_PAGES[i + 1];

  return (
    <ContentPage narrow>
      <p className={d.big} aria-hidden="true">{depth.n}</p>
      <PageHead
        draft
        eyebrow={`Depth ${depth.n} of the ten`}
        title={depth.name}
        subtitle={depth.breath}
        byline="Jeffrey Sellers, with a draft by Claude"
      />

      <p className={d.gist}>
        {depth.gist.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>

      <hr className={s.rule} />

      <section className={s.prose}>
        {depth.draft.map((para, k) => (
          <p key={k}>{para}</p>
        ))}
      </section>

      <nav className={d.pager} aria-label="Other depths">
        {prev ? (
          <Link href={`/depths/${prev.slug}`} className={s.link}>← {prev.n}. {prev.name}</Link>
        ) : <span />}
        <Link href="/depths" className={s.link}>All ten depths</Link>
        {next ? (
          <Link href={`/depths/${next.slug}`} className={s.link}>{next.n}. {next.name} →</Link>
        ) : <span />}
      </nav>
    </ContentPage>
  );
}
