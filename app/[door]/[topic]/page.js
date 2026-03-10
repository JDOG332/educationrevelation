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

  return {
    title: `${sub.name} — ${doorMeta.name} — Education Revelation`,
    description: `${sub.icon} ${sub.desc}. Explore: ${cardTitles}${cards.length > 5 ? '...' : ''}.`,
    openGraph: {
      title: `${sub.name} — ${doorMeta.name}`,
      description: sub.desc,
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
