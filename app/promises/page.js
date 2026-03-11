import PromisesClient from './PromisesClient';

export const metadata = {
  title: 'Ten Promises — What the Universe Owes You — Education Revelation',
  description: 'Ten promises from the universe to you — not commandments, not conditions, but truths that already exist. You deserve safety, to be seen, agency, partnership, to be believed, purpose, rest, reciprocity, community, and to be chosen. Because love that must be earned was never love at all.',
  keywords: 'you are loved, you deserve love, unconditional love, self worth, you are enough, universe loves you, promises of love, what do I deserve, am I enough',
  openGraph: {
    title: 'Ten Promises — What the Universe Owes You',
    description: 'Not commandments. Not conditions. Truths that already exist. You were loved before you earned it.',
  },
};

export default function PromisesPage() {
  return (
    <>
      {/* SEO LAYER */}
      <div
        aria-hidden="false"
        style={{
          position: "absolute",
          width: 1, height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        <h1>Ten Promises from the Universe to You</h1>
        <p>These are not commandments. They are not conditions. They are truths that already exist — whether you believe them or not.</p>
        <h2>I. Safety</h2><p>You deserve to move through this life knowing that the ground beneath you is solid.</p>
        <h2>II. To Be Seen</h2><p>The version of you that cries in the car and doubts yourself on Tuesday afternoons — that is the one worth knowing.</p>
        <h2>III. Agency</h2><p>Your body is yours. Your time is yours. Your no is a complete sentence.</p>
        <h2>IV. Partnership</h2><p>You deserve someone who notices, not someone you have to manage.</p>
        <h2>V. To Be Believed</h2><p>When you say something hurts, the correct response is not to argue with your pain.</p>
        <h2>VI. Purpose</h2><p>You are not just someone's parent, someone's partner, someone's child. You are a whole person with a fire.</p>
        <h2>VII. Rest</h2><p>You do not have to earn a nap. You do not have to finish the list before you sit down.</p>
        <h2>VIII. Reciprocity</h2><p>You have carried everyone else's feelings long enough.</p>
        <h2>IX. Community</h2><p>Your friendships are not competition — they are oxygen.</p>
        <h2>X. To Be Chosen</h2><p>You deserve to be chosen out loud, in front of people, in the small moments and in the hard ones. You should never have to wonder.</p>
        <p>These are not rules to follow. They are rights you were born with. Love that must be earned was never love at all.</p>
      </div>

      {/* EXPERIENCE LAYER */}
      <PromisesClient />
    </>
  );
}
