'use client';

import dynamic from 'next/dynamic';

const InfinityCursor = dynamic(() => import('@/components/InfinityCursor'), { ssr: false });

export default function CursorProvider() {
  return <InfinityCursor />;
}
