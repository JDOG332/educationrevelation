import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import DoorClient from '../[door]/DoorClient';

export const metadata = {
  title: 'Mathematics — Arithmetic, Patterns, Geometry, Algebra, Probability, Fractals & More',
  description: 'What is the hidden structure beneath all things? Explore 100 topics across 10 categories: Arithmetic & Number, Patterns & Sequences, Geometry & Shape, Algebra, Probability & Chance, Zero & Nothing, Fractals, Ratio & Proportion, Symmetry & Balance, Logic & Proof.',
};

export default function MathematicsPage() {
  const dataKey = "promise";
  const meta = DOOR_META[dataKey];
  const subs = SUBCATEGORIES[dataKey] || [];

  return <DoorClient doorSlug="mathematics" doorMeta={meta} subcategories={subs} dataKey={dataKey} />;
}
