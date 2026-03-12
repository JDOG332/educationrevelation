'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const VitruvianPage = dynamic(() => import('@/components/VitruvianPage'), { ssr: false });

export default function VitruvianClient() {
  const router = useRouter();
  return <VitruvianPage onBack={() => router.push('/math')} />;
}
