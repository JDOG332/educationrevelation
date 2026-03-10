import { ImageResponse } from 'next/og';
import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import { TOPIC_CARDS } from '@/lib/topicCards';
import { SLUG_TO_KEY, ALL_DOOR_SLUGS } from '@/lib/doorMap';

export const runtime = 'edge';
export const alt = 'Education Revelation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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

export default async function Image({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const doorMeta = DOOR_META[dataKey];
  const sub = (SUBCATEGORIES[dataKey] || []).find(s => s.id === p.topic);
  const cards = TOPIC_CARDS[dataKey]?.[p.topic] || [];
  const card = cards.find(c => c.id === p.card);

  const title = card?.title || 'Education Revelation';
  const simple = card?.simple?.slice(0, 140) || '';
  const emoji = card?.icon || '🔺';
  const doorName = doorMeta?.name || '';
  const subName = sub?.name || '';
  const accent = sub?.accent || '201,168,76';
  const [r, g, b] = accent.split(',').map(Number);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(ellipse at 50% 40%, rgb(${Math.round(r*0.15)},${Math.round(g*0.15)},${Math.round(b*0.15)}) 0%, #03030a 70%)`,
          padding: '60px',
        }}
      >
        {/* Emoji */}
        <div style={{ fontSize: 80, marginBottom: 20 }}>{emoji}</div>

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: `rgb(${r},${g},${b})`,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: '90%',
          }}
        >
          {title}
        </div>

        {/* Simple text */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(232,228,210,0.75)',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '80%',
            marginBottom: 30,
          }}
        >
          {simple}{simple.length >= 140 ? '...' : ''}
        </div>

        {/* Door breadcrumb */}
        <div
          style={{
            fontSize: 18,
            color: 'rgba(201,168,76,0.50)',
            letterSpacing: '0.15em',
          }}
        >
          {doorMeta?.emoji} {doorName} → {subName}
        </div>

        {/* Site name */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 16,
            color: 'rgba(201,168,76,0.30)',
            letterSpacing: '0.25em',
          }}
        >
          EDUCATIONREVELATION.COM
        </div>
      </div>
    ),
    { ...size }
  );
}
