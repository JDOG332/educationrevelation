'use client';

import { useRouter } from 'next/navigation';
import PaperPage from '@/components/PaperPage';

export default function CRTClient() {
  const router = useRouter();
  return <PaperPage onBack={() => router.push('/math')} />;
}
