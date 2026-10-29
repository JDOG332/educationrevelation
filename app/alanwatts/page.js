import { pageMeta } from '@/lib/meta';
import AlanWattsClient from './AlanWattsClient';

export const metadata = pageMeta('/alanwatts', {
  title: 'Alan Watts — Voices | Education Revelation',
  description: '163 lectures. 15 categories. 3 core truths per lecture. A complete map of one of the 20th century\'s most essential thinkers.',
  robots: { index: false, follow: false },
});

export default function AlanWattsPage() {
  return <AlanWattsClient />;
}
