'use client';

import { useRouter } from 'next/navigation';
import PoemUniverse from '@/components/PoemUniverse';

export default function PoemExperience({ poemKey }) {
  const router = useRouter();
  return <PoemUniverse poem={poemKey} onBack={() => router.push('/poems')} />;
}
