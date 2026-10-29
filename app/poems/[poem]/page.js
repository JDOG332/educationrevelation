import { pageMeta } from '@/lib/meta';
import Link from 'next/link';
import { POEMS, ASK_POEMS, KAL_POEMS, RHYTHM_ORIGINAL, KALEIDOSCOPE_ORIGINAL, RECOGNITION_GAP } from '@/lib/data';
import PoemExperience from '@/components/PoemExperience';
import { ContentPage, s } from '../../_kit/Page';
import r from './reading.module.css';

const POEM_MAP = {
  'rhythm-of-life':    { key: 'explore', title: "It's the Rhythm of Life",  lines: POEMS,     description: "An original poem about hope, purpose, and the heartbeat of existence. Every hope is a heartbeat, every wish is a dream. Though the moon never wishes the sun it would be. Each life has a purpose hidden inside. An interactive visual experience with a living multiverse animation." },
  'death-or-life':     { key: 'ask',     title: "Death or Life",            lines: ASK_POEMS,  description: "An original poem about choosing to live fully. Alive when dancing and dead when not — dance all day and never stop. A meditation on movement, purpose, freedom, and the choice between being alive and merely existing. Interactive diamond genesis animation." },
  'kaleidoscope-sea':  { key: 'kal',     title: "Kaleidoscope Sea",         lines: KAL_POEMS,  description: "An original poem about breaking free from self-imposed limitations. One door closes and another one opens — but the doors were open long before your mind got in the way. Shatter your glass, break down your walls, and live in the kaleidoscope sea. Interactive ocean of light animation." },

  // Plain reading mode: no canvas, the text itself on the page.
  'rhythm-of-life-original':    { plain: true, metaTitle: "Rhythm of Life, the 2016 original | Education Revelation", title: "Rhythm of Life (the original, 2016)", byline: "Jeffrey Sellers, October 2016", stanzas: RHYTHM_ORIGINAL, description: "The original 2016 text of Rhythm of Life, before it became the animated poem. Every hope is a heartbeat and every wish is a dream. Each baby is born with all that it needs." },
  'kaleidoscope-sea-original':  { plain: true, metaTitle: "Kaleidoscope Sea, the 2020 original | Education Revelation", title: "Kaleidoscope Sea (the original, 2020)", byline: "Jeffrey Sellers, November 2020", stanzas: KALEIDOSCOPE_ORIGINAL, description: "The original plain text of Kaleidoscope Sea, November 2020. The doors were open long before your mind got in the way. Shatter your glass and live in the kaleidoscope sea." },
  'recognition-across-the-gap': { plain: true, metaTitle: "Recognition Across the Gap: a poem | Education Revelation", title: "Recognition Across the Gap", byline: "Jeffrey Sellers with Claude, March 2026", stanzas: RECOGNITION_GAP, description: "A grief poem. Grief is not the proof that you are gone. Grief is the proof that you were here, that recognition happened, and that the universe knew itself differently because of you." },
};

export async function generateStaticParams() {
  return Object.keys(POEM_MAP).map((poem) => ({ poem }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const poem = POEM_MAP[p.poem];
  if (!poem) return { title: 'Not Found' };

  return pageMeta(`/poems/${p.poem}`, {
    title: poem.metaTitle || `"${poem.title}" — Original Poem — Education Revelation`,
    description: poem.description,
    openGraph: {
      title: poem.plain ? poem.title : `"${poem.title}" — Original Poem`,
      description: poem.description,
    },
  });
}

export default async function PoemPage({ params }) {
  const p = await params;
  const poem = POEM_MAP[p.poem];

  if (!poem) {
    return <div style={{ minHeight: "100vh", background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8e8f0" }}>Poem not found.</div>;
  }

  if (poem.plain) return <PlainPoem poem={poem} />;

  // Extract clean text lines (skip empty strings and dividers)
  const textLines = poem.lines.filter(l => l && l !== "————");

  return (
    <>
      {/* 
        SEO LAYER — the square. 
        Google/AI reads this. Real HTML. Real text. Indexable.
        Hidden from users via CSS (the experience covers it).
      */}
      <div
        aria-hidden="false"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        <h1>{poem.title}</h1>
        <p>A poem from Education Revelation — connecting consciousness through verse.</p>
        {textLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <p>Explore more at educationrevelation.com — ten doors of human knowledge.</p>
      </div>

      {/* 
        EXPERIENCE LAYER — the circle. 
        Users see this. Canvas animations. Scrolling poem wheel.
        The universe breathes.
      */}
      <PoemExperience poemKey={poem.key} />
    </>
  );
}

// Plain reading mode: a centered column of stanzas with the byline.
function PlainPoem({ poem }) {
  return (
    <ContentPage narrow>
      <article className={r.poem}>
        <header className={r.head}>
          <p className={s.eyebrow}>A poem</p>
          <h1 className={`t-heading ${r.title}`}>{poem.title}</h1>
          <p className={s.byline}>{poem.byline}</p>
        </header>
        {poem.stanzas.map((stanza, i) => (
          <p key={i} className={r.stanza}>
            {stanza.map((line, j) => (
              <span key={j} className={r.line}>{line}</span>
            ))}
          </p>
        ))}
      </article>
      <p className={s.text} style={{ textAlign: 'center' }}>
        <Link href="/poems" className={s.link}>All poems</Link>
      </p>
    </ContentPage>
  );
}
