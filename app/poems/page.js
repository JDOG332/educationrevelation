import { pageMeta } from '@/lib/meta';
import PoemsClient from './PoemsClient';

export const metadata = pageMeta('/poems', {
  title: 'Poems by Jeff Sellers | Education Revelation',
  description: 'Six poems by Jeff Sellers. Three live inside their own animated universes: "It\'s the Rhythm of Life", "Death or Life" and "Kaleidoscope Sea". Three are plain readings: the 2016 original of Rhythm of Life, the 2020 original of Kaleidoscope Sea, and "Recognition Across the Gap", a poem about grief.',
});

export default function PoemsPage() {
  return <PoemsClient />;
}
