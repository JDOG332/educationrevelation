import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { TREE_INTRO, PILLARS } from '@/lib/content/tree';
import TreeClient from './TreeClient';

export const metadata = pageMeta('/tree', {
  title: 'The Tree of Life, drawn by code | Education Revelation',
  description: 'The Kabbalistic Tree of Life, ten sefirot on three pillars joined by twenty-two paths, drawn by code, with the ten doors of this site standing in the ten places. Tap a sefirah to see which door it holds and why.',
  openGraph: {
    title: 'The Tree of Life',
    description: 'Ten sefirot, ten doors. The lightning flash draws the tree in its order.',
  },
});

export default function TreePage() {
  return (
    <ContentPage>
      <PageHead eyebrow="Ten, again" title="The Tree of Life" byline="Jeff Sellers, with the ten doors in the ten places" />
      <div className={s.prose}>
        {TREE_INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <TreeClient />
      <section className={s.section}>
        <h2 className={s.h2}>The three pillars</h2>
        <ul className={s.list}>
          {PILLARS.map((p) => <li key={p.name}><b className={s.gold}>{p.name}.</b> {p.note}</li>)}
        </ul>
        <p className={s.note} style={{ marginTop: '0.75rem' }}>
          The sefirot, the paths and the lightning flash are the tradition&apos;s. Which door stands in which place is one reading; the tree has carried many.
        </p>
      </section>
    </ContentPage>
  );
}
