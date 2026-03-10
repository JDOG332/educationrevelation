import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import { TOPIC_CARDS } from '@/lib/topicCards';
import { SLUG_TO_KEY, ALL_DOOR_SLUGS } from '@/lib/doorMap';
import TopicClient from './TopicClient';

export async function generateStaticParams() {
  const params = [];
  for (const slug of ALL_DOOR_SLUGS) {
    const key = SLUG_TO_KEY[slug];
    const subs = SUBCATEGORIES[key] || [];
    for (const sub of subs) {
      params.push({ door: slug, topic: sub.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const doorMeta = DOOR_META[dataKey];
  const sub = (SUBCATEGORIES[dataKey] || []).find(s => s.id === p.topic);

  if (!doorMeta || !sub) return { title: 'Not Found' };

  const cards = (TOPIC_CARDS[dataKey]?.[p.topic] || []);
  const cardTitles = cards.slice(0, 5).map(c => c.title).join(', ');
  const firstSimple = cards[0]?.simple ? ` ${cards[0].simple.slice(0, 120)}...` : '';

  return {
    title: `${sub.name} — ${sub.desc} | ${doorMeta.name} — Education Revelation`,
    description: `${sub.icon} ${sub.desc}${firstSimple} Explore ${cards.length} perspectives including: ${cardTitles}${cards.length > 5 ? ', and more' : ''}. Each topic includes a simple explanation, deeper intuition, advanced analysis, six sensory experiences, music, and Wikipedia links.`,
    openGraph: {
      title: `${sub.name} — ${sub.desc}`,
      description: `${cards.length} perspectives on ${sub.name.toLowerCase()} through the lens of ${doorMeta.name.toLowerCase()}. Part of Education Revelation — ten doors of human knowledge.`,
    },
  };
}

export default async function TopicPage({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const doorMeta = DOOR_META[dataKey];
  const sub = (SUBCATEGORIES[dataKey] || []).find(s => s.id === p.topic);

  if (!doorMeta || !sub) {
    return <div style={{ minHeight: "100vh", background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8e8f0" }}>Topic not found.</div>;
  }

  const cards = TOPIC_CARDS[dataKey]?.[p.topic] || [];

  return <TopicClient doorSlug={p.door} doorMeta={doorMeta} sub={sub} cards={cards} />;
}
