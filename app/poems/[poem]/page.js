import { POEMS, ASK_POEMS, KAL_POEMS } from '@/lib/data';
import PoemExperience from '@/components/PoemExperience';

const POEM_MAP = {
  'rhythm-of-life':    { key: 'explore', title: "It's the Rhythm of Life",  lines: POEMS,     description: "An original poem about hope, purpose, and the heartbeat of existence. Every hope is a heartbeat, every wish is a dream. Though the moon never wishes the sun it would be. Each life has a purpose hidden inside. An interactive visual experience with a living multiverse animation." },
  'death-or-life':     { key: 'ask',     title: "Death or Life",            lines: ASK_POEMS,  description: "An original poem about choosing to live fully. Alive when dancing and dead when not — dance all day and never stop. A meditation on movement, purpose, freedom, and the choice between being alive and merely existing. Interactive diamond genesis animation." },
  'kaleidoscope-sea':  { key: 'kal',     title: "Kaleidoscope Sea",         lines: KAL_POEMS,  description: "An original poem about breaking free from self-imposed limitations. One door closes and another one opens — but the doors were open long before your mind got in the way. Shatter your glass, break down your walls, and live in the kaleidoscope sea. Interactive ocean of light animation." },
};

export async function generateStaticParams() {
  return Object.keys(POEM_MAP).map((poem) => ({ poem }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const poem = POEM_MAP[p.poem];
  if (!poem) return { title: 'Not Found' };

  return {
    title: `"${poem.title}" — Original Poem — Education Revelation`,
    description: poem.description,
    openGraph: {
      title: `"${poem.title}" — Original Poem`,
      description: poem.description,
    },
  };
}

export default async function PoemPage({ params }) {
  const p = await params;
  const poem = POEM_MAP[p.poem];

  if (!poem) {
    return <div style={{ minHeight: "100vh", background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8e8f0" }}>Poem not found.</div>;
  }

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
