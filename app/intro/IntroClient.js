'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const IntroCanvas = dynamic(() => import('@/components/IntroCanvas'), { ssr: false });

export default function IntroClient() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#03030a" }}>
      <IntroCanvas
        seedState={{ rx: 0, ry: 0, rz: 0 }}
        onComplete={() => router.push('/search')}
      />
    </div>
  );
}
