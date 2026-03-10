import DoorClient from './DoorClient';

const DOOR_META = {
  love:          { name: "Love",          emoji: "💛", question: "Is the deepest truth found in the space between us?", color: "220,160,160" },
  mysticism:     { name: "Mysticism",     emoji: "✨", question: "Can I experience the infinite directly — without mediation?", color: "190,140,220" },
  consciousness: { name: "Consciousness", emoji: "👁️", question: "What is this awareness that makes all experience possible?", color: "200,200,230" },
  religion:      { name: "Religion",      emoji: "⛪", question: "What has been revealed, and how must I live in response?", color: "201,168,76" },
  art:           { name: "Art",           emoji: "🎨", question: "What truth can only be expressed by making something?", color: "224,120,100" },
  nature:        { name: "Nature",        emoji: "🌿", question: "What does the Earth itself teach about existence?", color: "120,180,100" },
  mythology:     { name: "Mythology",     emoji: "📖", question: "What stories keep telling themselves, and why?", color: "200,160,100" },
  philosophy:    { name: "Philosophy",    emoji: "🏛️", question: "What can I know through reason alone?", color: "150,180,220" },
  science:       { name: "Science",       emoji: "🔬", question: "How does the universe actually work?", color: "100,200,150" },
  mathematics:   { name: "Mathematics",   emoji: "📐", question: "What is the hidden pattern beneath everything?", color: "201,168,76" },
};

export async function generateStaticParams() {
  return Object.keys(DOOR_META).map((door) => ({ door }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const door = DOOR_META[p.door];
  if (!door) return { title: 'Not Found' };

  return {
    title: `${door.name} — Education Revelation`,
    description: `${door.emoji} ${door.question} Explore ${door.name.toLowerCase()} through the lens of all human knowledge.`,
    openGraph: {
      title: `${door.name} — Education Revelation`,
      description: door.question,
    },
  };
}

export default async function DoorPage({ params }) {
  const p = await params;
  const door = DOOR_META[p.door];
  if (!door) {
    return <div style={{ minHeight: "100vh", background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8e8f0" }}>Door not found.</div>;
  }

  return <DoorClient doorSlug={p.door} doorMeta={door} />;
}
