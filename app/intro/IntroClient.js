'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const IntroCanvas = dynamic(() => import('@/components/IntroCanvas'), { ssr: false });

export default function IntroClient() {
  const router = useRouter();
  const done = useCallback(() => router.push('/search'), [router]);

  return (
    <div style={{ minHeight: "100vh", background: "#03030a" }}>
      <IntroCanvas seedState={{ rx: 0, ry: 0, rz: 0 }} onComplete={done} />

      {/* A visible way out; the canvas also skips on tap */}
      <button
        onClick={done}
        aria-label="Skip the intro and open the ten doors"
        style={{
          position: "fixed",
          right: "max(1rem, env(safe-area-inset-right))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
          zIndex: 20,
          background: "rgba(3,3,10,0.55)",
          border: "1px solid rgba(201,168,76,0.55)",
          borderRadius: 3,
          padding: "0.6rem 1.1rem",
          fontFamily: "'Playfair Display', serif",
          fontSize: "0.95rem",
          letterSpacing: "0.22em",
          color: "rgba(201,168,76,0.9)",
          cursor: "pointer",
        }}
      >SKIP →</button>
    </div>
  );
}
