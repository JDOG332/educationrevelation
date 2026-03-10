import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import { SLUG_TO_KEY, ALL_DOOR_SLUGS } from '@/lib/doorMap';
import DoorClient from './DoorClient';

export async function generateStaticParams() {
  return ALL_DOOR_SLUGS.map((door) => ({ door }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const dataKey = SLUG_TO_KEY[p.door];
  const meta = DOOR_META[dataKey];
  if (!meta) return { title: 'Not Found' };

  const subs = SUBCATEGORIES[dataKey] || [];
  const subNames = subs.map(s => s.name).join(', ');

  return {
    title: `${meta.name} — Education Revelation`,
    description: `${meta.emoji} ${meta.tagline} Explore: ${subNames}.`,
    openGraph: {
      title: `${meta.name} — Education Revelation`,
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
