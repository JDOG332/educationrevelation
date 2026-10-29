import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import w from './wright.module.css';

// Jeff's note, verbatim.
const NOTE =
  "Wright removed handles & rails b/c a handle says 'stop here, grab me'… He wanted you to flow through space the way you SHOULD flow through life: without gripping. The universe has no handles. You don't grab truth. You pass through it.";

export const metadata = pageMeta('/wright', {
  title: 'Frank Lloyd Wright: no handles | Education Revelation',
  description:
    "A note on Frank Lloyd Wright and handles: flow through space the way you should flow through life, without gripping. The universe has no handles.",
  openGraph: {
    title: 'The universe has no handles',
    description: "You don't grab truth. You pass through it.",
  },
});

export default function WrightPage() {
  return (
    <ContentPage narrow>
      <PageHead eyebrow="A note on Frank Lloyd Wright" title="No handles" />
      <figure className={w.card}>
        <blockquote className={w.quote}>
          <p>{NOTE}</p>
        </blockquote>
        <figcaption className={s.byline}>From a note by Jeffrey Sellers</figcaption>
      </figure>
    </ContentPage>
  );
}
