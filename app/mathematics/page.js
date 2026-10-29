import { pageMeta } from '@/lib/meta';
import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';
import DoorClient from '../[door]/DoorClient';

export const metadata = pageMeta('/mathematics', {
  title: 'Mathematics — Arithmetic, Patterns, Geometry, Algebra, Probability, Fractals & More',
  description: 'What is the hidden structure beneath all things? Explore 100 topics across 10 categories: Arithmetic & Number, Patterns & Sequences, Geometry & Shape, Algebra, Probability & Chance, Zero & Nothing, Fractals, Ratio & Proportion, Symmetry & Balance, Logic & Proof.',
});

export default function MathematicsPage() {
  const dataKey = "promise";
  const meta = DOOR_META[dataKey];
  const subs = SUBCATEGORIES[dataKey] || [];

  const lead = {
    href: "/theory",
    icon: "Ψ",
    title: "CONVERGENT RECOGNITION THEORY",
    sub: "Ψ = R₁₂ × Γ. The equation underneath the site, with the paper, a live calculator and the tests. Then the Vitruvian Man at /mathematics/vitruvian.",
  };

  return <DoorClient doorSlug="mathematics" doorMeta={meta} subcategories={subs} dataKey={dataKey} lead={lead} />;
}
