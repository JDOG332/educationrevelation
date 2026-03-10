import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import { TOPIC_CARDS } from '@/lib/topicCards';
import { SLUG_TO_KEY, ALL_DOOR_SLUGS } from '@/lib/doorMap';
import CardClient from './CardClient';

export async function generateStaticParams() {
  const params = [];
  for (const slug of ALL_DOOR_SLUGS) {
    const key = SLUG_TO_KEY[slug];
    const subs = SUBCATEGORIES[key] || [];
    for (const sub of subs) {
      const cards = TOPIC_CARDS[key]?.[sub.id] || [];
      for (const card of cards) {
        params.push({ door: slug, topic: sub.id, card: card.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const doorMeta = DOOR_META[dataKey];
  const sub = (SUBCATEGORIES[dataKey] || []).find(s => s.id === p.topic);
  const cards = TOPIC_CARDS[dataKey]?.[p.topic] || [];
  const card = cards.find(c => c.id === p.card);

  if (!doorMeta || !sub || !card) return { title: 'Not Found' };

  const simplePreview = card.simple?.slice(0, 200) || sub.desc;

  return {
    title: `${card.title} — ${sub.name} | ${doorMeta.name} — Education Revelation`,
    description: `${card.icon} ${simplePreview}`,
    openGraph: {
      title: `${card.icon} ${card.title}`,
      description: simplePreview,
      siteName: 'Education Revelation',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${card.icon} ${card.title}`,
      description: simplePreview,
    },
  };
}

export default async function CardPage({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const doorMeta = DOOR_META[dataKey];
  const sub = (SUBCATEGORIES[dataKey] || []).find(s => s.id === p.topic);
  const cards = TOPIC_CARDS[dataKey]?.[p.topic] || [];
  const card = cards.find(c => c.id === p.card);

  if (!doorMeta || !sub || !card) {
    return <div style={{ minHeight: "100vh", background: "#03030a", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8e8f0" }}>Card not found.</div>;
  }

  // Find card index for prev/next navigation
  const cardIndex = cards.findIndex(c => c.id === p.card);
  const prevCard = cardIndex > 0 ? cards[cardIndex - 1] : null;
  const nextCard = cardIndex < cards.length - 1 ? cards[cardIndex + 1] : null;

  return (
    <>
      {/* SEO LAYER — Google/AI reads this */}
      <div
        aria-hidden="false"
        style={{
          position: "absolute",
          width: 1, height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        <h1>{card.title}</h1>
        <p>{card.simple}</p>
        {card.intuition && <p>{card.intuition}</p>}
        {card.advanced && <p>{card.advanced}</p>}
        {card.senses?.map((s, i) => <p key={i}>{s.sense}: {s.text}</p>)}
        {card.songs?.map((s, i) => <p key={i}>Music: {s.title} by {s.artist}</p>)}
        {card.links?.map((l, i) => <a key={i} href={l.url}>{l.label}</a>)}
        <p>Part of {sub.name} — {doorMeta.name} — Education Revelation</p>
        <a href={`/${p.door}/${p.topic}`}>View all {sub.name} topics</a>
        <a href={`/${p.door}`}>Explore {doorMeta.name}</a>
      </div>

      {/* EXPERIENCE LAYER */}
      <CardClient
        card={card}
        sub={sub}
        doorMeta={doorMeta}
        doorSlug={p.door}
        topicSlug={p.topic}
        prevCard={prevCard ? { id: prevCard.id, title: prevCard.title, icon: prevCard.icon } : null}
        nextCard={nextCard ? { id: nextCard.id, title: nextCard.title, icon: nextCard.icon } : null}
      />
    </>
  );
}
