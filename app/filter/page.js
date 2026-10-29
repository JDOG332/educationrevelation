import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import FilterClient from './FilterClient';

export const metadata = pageMeta('/filter', {
  title: 'The golden filter: find your door | Education Revelation',
  description:
    'Type a sentence, a worry or a question and see which of the ten doors it passes through: religion, philosophy, science, mysticism, art, mathematics, mythology, nature, love, consciousness.',
  openGraph: {
    title: 'The golden filter',
    description: 'Type your own words and see them mapped to the ten doors of human knowledge.',
  },
});

export default function FilterPage() {
  return (
    <ContentPage narrow>
      <PageHead eyebrow="A tool for reflection" title="The golden filter" />

      <p className={s.text}>
        Every piece of human content passes through one of ten doors. Bring your own words and see which doors they
        lean on. It is a simple keyword reading, not a judgment: a mirror, not a verdict.
      </p>

      <FilterClient />

      <p className={s.note}>
        Nothing you type leaves this page. The sorting runs in your browser, and nothing is saved or sent anywhere.
      </p>
    </ContentPage>
  );
}
