import { pageMeta } from '@/lib/meta';
import { getDoorQuestions, getStartHere, getPackedCardPaths, getDailyCard } from '@/lib/doorsMeta';
import SearchClient from './SearchClient';

export const metadata = pageMeta('/search', {
  title: 'Search All Human Knowledge — Religion, Philosophy, Science, Art, Love & More',
  description: 'Search across ten domains of human knowledge simultaneously. Type any question — what is love, why do we dream, does god exist, what is the meaning of life — and watch ten doors of truth respond in real time. 1,001 topics spanning Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, and Consciousness.',
});

// Today's card is chosen on the server; rebuild the page once a day so it turns over.
export const revalidate = 86400;

export default function SearchPage() {
  return (
    <SearchClient
      daily={getDailyCard()}
      questions={getDoorQuestions()}
      startHere={getStartHere()}
      cardPaths={getPackedCardPaths()}
    />
  );
}
