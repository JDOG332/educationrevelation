import PromisesClient from './PromisesClient';

export const metadata = {
  title: 'Ten Promises — From the Universe to You — Education Revelation',
  description: 'Ten promises from the universe to you. Safety. To be seen. Agency. Partnership. To be believed. Purpose. Rest. To be held. Community. To be chosen every single day. These are not rules to follow — they are rights you were born with. You were loved before you arrived.',
  keywords: 'you are loved, you deserve love, unconditional love, self worth, you are enough, universe loves you, promises, what do I deserve, am I enough, human rights, being seen, being believed, being held',
  openGraph: {
    title: 'Ten Promises — From the Universe to You',
    description: 'These are not rules to follow. They are rights you were born with. You were loved before you arrived.',
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
        <p>These are not rules to follow. They are rights you were born with — written into the fabric of your existence before you took your first breath.</p>
        <h2>I. Safety</h2><p>You deserve to move through this life knowing that the ground beneath you is solid. Not because you earned it — because you exist.</p>
        <h2>II. To Be Seen</h2><p>Not the version of you that performs for the world. The unpolished, unfiltered, trembling one — that is the only one worth knowing.</p>
        <h2>III. Agency</h2><p>Your body is yours. Your time is yours. Your no is a complete sentence.</p>
        <h2>IV. Partnership</h2><p>You deserve someone who notices — not someone you have to carry.</p>
        <h2>V. To Be Believed</h2><p>When you say something hurts, the correct response is not to argue with your pain.</p>
        <h2>VI. Purpose</h2><p>You are not just someone's child, someone's partner, someone's parent, someone's employee. You are a whole person with a fire.</p>
        <h2>VII. Rest</h2><p>You do not have to earn a nap. You do not have to finish the list before you sit down.</p>
        <h2>VIII. To Be Held</h2><p>You have carried everyone else's feelings long enough. You are allowed to put that weight down.</p>
        <h2>IX. Community</h2><p>Your friendships are not competition — they are oxygen.</p>
        <h2>X. To Be Chosen</h2><p>You deserve to be chosen out loud, in the small moments and in the hard ones. You should never have to wonder.</p>
        <p>Love that must be earned was never love at all. You were loved before you arrived and you will be loved long after you leave.</p>
      </div>

      {/* EXPERIENCE LAYER */}
      <PromisesClient />
    </>
  );
}
