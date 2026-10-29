import { pageMeta } from '@/lib/meta';
import { ContentPage, PageHead, s } from '../_kit/Page';
import { VINDING } from '@/lib/content/truth';

export const metadata = pageMeta('/truth', {
  title: 'The truth map: scoring a text | Education Revelation',
  description:
    "Jeff Sellers's truth map: score each claim of a text by how sure you are, foundation first, then list what would make each claim false. Worked through Magnus Vinding's You Are Them.",
  openGraph: {
    title: 'The truth map',
    description: 'Score every claim by how sure you are. Then say what would make it false.',
  },
});

export default function TruthPage() {
  return (
    <ContentPage>
      <PageHead eyebrow="A way to read" title="The truth map" byline="Jeffrey Sellers" />

      <section className={s.prose}>
        <p>
          A truth map is a way to read an argument slowly. You break the text into its claims. Then you give each claim
          a score for how sure you are that it is true. You start at the bottom, with the foundation: the claims
          everything else stands on. Then you work up, through the bridges and the reasons, to the big framework at
          the top. The higher you go, the lower the scores usually get.
        </p>
        <p>
          The second half is the honest part. For each claim, you write down what would make it false. Start with the
          claim you trust least. That list is the falsity risk. It shows you where the argument could crack, so you can
          keep what holds and question what doesn&apos;t. Nobody has to agree with your scores. The point is that you
          can see them.
        </p>
      </section>

      <section className={s.section} aria-labelledby="example">
        <p className={s.eyebrow}>Example</p>
        <h2 id="example" className={s.h2}>{VINDING.source}</h2>
        <p className={s.text}><span className={s.gold}>Core claim:</span> {VINDING.core}</p>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <caption className={s.note} style={{ textAlign: 'left', marginBottom: 'var(--s-2xs)' }}>
              The map, foundation first
            </caption>
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Claims</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {VINDING.layers.map((l) => (
                <tr key={l.layer}>
                  <td>{l.layer}</td>
                  <td>{l.claims.join(' · ')}</td>
                  <td className={s.score}>{l.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <caption className={s.note} style={{ textAlign: 'left', marginBottom: 'var(--s-2xs)' }}>
              Falsity risks, least sure first
            </caption>
            <thead>
              <tr>
                <th scope="col">Claim</th>
                <th scope="col">Score</th>
                <th scope="col">What could make it false</th>
              </tr>
            </thead>
            <tbody>
              {VINDING.risks.map((r) => (
                <tr key={r.claim}>
                  <td>{r.claim}</td>
                  <td className={s.score}>{r.score}%</td>
                  <td>{r.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={s.note}>
          The scores are Jeff&apos;s own readings of the text, not measurements.
        </p>
      </section>
    </ContentPage>
  );
}
