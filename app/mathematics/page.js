import Link from 'next/link';
import MathClient from './MathClient';
import { SUBCATEGORIES, DOOR_META } from '@/lib/subcategories';

export const metadata = {
  title: 'Mathematics — Da Vinci\'s Vitruvian Man, Convergent Recognition Theory & 100 Topics on Hidden Patterns',
  description: 'Explore the mathematics hidden beneath all things. Da Vinci\'s Vitruvian Man geometry verified to the decimal. Convergent Recognition Theory (Ψ = R₁₂ × G). Plus 100 topics across Arithmetic, Patterns, Geometry, Algebra, Probability, Zero, Fractals, Ratio, Symmetry, and Proof.',
};

export default function MathPage() {
  const subs = SUBCATEGORIES["promise"] || [];
  const meta = DOOR_META["promise"];

  return <MathClient subcategories={subs} doorMeta={meta} />;
}
