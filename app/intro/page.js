import { pageMeta } from '@/lib/meta';
import IntroClient from './IntroClient';

export const metadata = pageMeta('/intro', {
  title: 'Education Revelation — Connecting Consciousness',
});

export default function IntroPage() {
  return <IntroClient />;
}
