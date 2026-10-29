import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { TEN_SONGS, TEN_ALBUM_TRUTH } from '@/lib/content/ten';

export const metadata = pageMeta('/ten', {
  title: 'Pearl Jam, Ten: one truth per song | Education Revelation',
  description:
    "A song-by-song reading of Pearl Jam's Ten (1991): eleven songs, eleven core truths, from Once to Release. A map of unprocessed pain, told with accidental honesty.",
  openGraph: {
    title: 'Pearl Jam, Ten: one core truth per song',
    description: 'Eleven songs, eleven core truths. Every monster had a before.',
  },
});

export default function TenPage() {
  return (
    <ContentPage narrow>
      <PageHead
        eyebrow="Pearl Jam, 1991"
        title="Ten"
        subtitle="One core truth per song"
        byline="Jeffrey Sellers"
      />
      <p className={s.note}>Jeff&apos;s reading of the album, written with AI help.</p>

      <ol className={s.list}>
        {TEN_SONGS.map((song) => (
          <li key={song.n} className={s.card}>
            <p className={s.num}>{song.n}</p>
            <h2 className={s.h3}>{song.title}</h2>
            <p className={s.text}>{song.about}</p>
            <p className={`${s.accent}`}>{song.truth}</p>
          </li>
        ))}
      </ol>

      <section className={s.section} aria-labelledby="album">
        <h2 id="album" className={s.h2}>The whole album</h2>
        <p className={s.accent}>{TEN_ALBUM_TRUTH.text}</p>
      </section>
    </ContentPage>
  );
}
