import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import { SLUG_TO_KEY, ALL_DOOR_SLUGS } from '@/lib/doorMap';
import DoorClient from './DoorClient';

export async function generateStaticParams() {
  // mathematics has its own explicit route at /mathematics (the hub page)
  return ALL_DOOR_SLUGS.filter(d => d !== "mathematics").map((door) => ({ door }));
}

// SEO-optimized titles that match what people actually search for
const DOOR_SEO = {
  love:          { title: "Love — Why We Need Connection, Grief, Trust, Family & Friendship", seoDesc: "Explore the deepest questions about human connection. Why do we love? What is grief? How do we trust? From mother-child bonds to romantic love to loneliness — 100 topics about the space between us." },
  mysticism:     { title: "Mysticism — Meditation, Enlightenment, Sacred Geometry & Inner Peace", seoDesc: "Direct experience of the infinite without mediation. Explore meditation, dreams, oneness, awakening, surrender, intuition, sacred geometry, and altered states of consciousness. 101 topics about what lies beyond the surface." },
  consciousness: { title: "Consciousness — What Is Awareness? The Mind, Identity, Dreams & Death", seoDesc: "What is this awareness that makes all experience possible? Explore identity, emotion, memory, perception, free will, dreams, attention, and the observer behind all experience. 100 topics about the hardest question in science." },
  religion:      { title: "Religion — God, Prayer, Faith, Sacred Texts, Good & Evil, Afterlife", seoDesc: "What has been revealed, and how must we live? Explore prayer, death and afterlife, good and evil, sacred texts, ritual, faith and doubt, salvation, sacred spaces, and creation stories across every tradition. 100 topics." },
  art:           { title: "Art — Music, Painting, Poetry, Dance, Theater & Creative Expression", seoDesc: "What truth can only be expressed by creating something? Explore music, painting, storytelling, theater, song, dance, architecture, craft, poetry, and sculpture. 100 topics about the human creative impulse." },
  nature:        { title: "Nature — Water, Animals, Trees, Seasons, Fire, Ocean & the Living Earth", seoDesc: "What does the Earth itself teach about existence? Explore water, animals, sky, seasons, trees, seeds, soil, light, ocean, and fire. 100 topics about the natural world as humanity's oldest teacher." },
  mythology:     { title: "Mythology — Creation Myths, The Hero's Journey, Gods, Prophecy & Fate", seoDesc: "What stories keep telling themselves, and why? Explore creation myths, the hero's journey, flood myths, gods and spirits, prophecy, sacrifice, tricksters, death and rebirth. 100 topics about the stories beneath all stories." },
  philosophy:    { title: "Philosophy — Truth, Ethics, Free Will, Meaning of Life, Justice & Logic", seoDesc: "What can we know through reason alone? Explore truth, ethics, the meaning of life, free will vs fate, logic, existence, time, language, the mind-body problem, and justice. 100 topics about the deepest questions." },
  science:       { title: "Science — Biology, Physics, Evolution, DNA, Medicine, Astronomy & Energy", seoDesc: "How does the universe actually work? Explore biology, physics, geology, astronomy, medicine, energy, evolution, chemistry, genetics, and ecology. 100 topics from cells to cosmos, explained simply." },
};

export async function generateMetadata({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const meta = DOOR_META[dataKey];
  if (!meta) return { title: 'Not Found' };

  const seo = DOOR_SEO[p.door];
  const subs = SUBCATEGORIES[dataKey] || [];
  const subNames = subs.map(s => s.name).join(', ');

  return {
    title: seo?.title || `${meta.name} — Education Revelation`,
    description: seo?.seoDesc || `${meta.emoji} ${meta.tagline} Explore: ${subNames}.`,
    openGraph: {
      title: seo?.title || `${meta.name} — Education Revelation`,
      description: meta.tagline,
    },
  };
}

export default async function DoorPage({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const meta = DOOR_META[dataKey];

  if (!meta) {
    return <div style={{ minHeight: "100vh", background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8e8f0" }}>Door not found.</div>;
  }

  const subs = SUBCATEGORIES[dataKey] || [];

  return <DoorClient doorSlug={p.door} doorMeta={meta} subcategories={subs} dataKey={dataKey} />;
}
