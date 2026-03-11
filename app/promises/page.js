import PromisesClient from './PromisesClient';

export const metadata = {
  title: 'Ten Promises of Love — Freely Given, No Strings, No Conditions — Education Revelation',
  description: 'Ten promises of love — not commandments, not conditions, but offerings freely given and freely received. Safety, to be seen, agency, partnership, to be believed, purpose, rest without guilt, emotional reciprocity, community, and chosen every single day. Because love that must be commanded is not love at all.',
  keywords: 'promises of love, unconditional love, agape love, valentines day, love letter, what is real love, how to love someone, love without conditions',
  openGraph: {
    title: 'Ten Promises of Love — Freely Given',
    description: 'Not commandments. Not conditions. Offerings — freely given, freely received. Because love that must be commanded is not love at all.',
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
        <h1>Ten Promises of Love</h1>
        <p>Freely given. No strings. No conditions. No commandments.</p>
        <h2>I. Safety</h2><p>You deserve to walk through life knowing someone already thought about the locks, the money, and the backup plan.</p>
        <h2>II. To Be Seen</h2><p>I do not love the version of you the world gets to see. I love the one who cries in the car and burns dinner and doubts herself on Tuesday afternoons.</p>
        <h2>III. Agency</h2><p>Your body is yours. Your time is yours. Your no is a complete sentence and you never have to defend it.</p>
        <h2>IV. Partnership</h2><p>I refuse to be another thing you manage. You deserve a partner, not a project.</p>
        <h2>V. To Be Believed</h2><p>When you tell me something hurts, I choose not to argue with your pain.</p>
        <h2>VI. Purpose</h2><p>You are not just someone's mother, someone's partner, someone's daughter. You are a whole person with a fire.</p>
        <h2>VII. Rest Without Guilt</h2><p>You do not have to earn a nap. You do not have to finish the list before you sit down.</p>
        <h2>VIII. Emotional Reciprocity</h2><p>I choose to ask you how you are and mean it. I choose to sit in the heavy silence instead of trying to fix it.</p>
        <h2>IX. Community</h2><p>Your friendships are not competition — they are oxygen that keeps you alive in ways I cannot.</p>
        <h2>X. Chosen Every Single Day</h2><p>Day three thousand looks like day three — intentional, specific, and unmistakable. You never have to wonder.</p>
        <p>These are not commandments. They are offerings — freely given, freely received. Because love that must be commanded is not love at all.</p>
        <p>Dedicated to: Kathy, Johanna, Nicole, Pam. WOW MOM WOW — read it forward, read it backward, flip it upside down. It cannot be broken.</p>
      </div>

      {/* EXPERIENCE LAYER */}
      <PromisesClient />
    </>
  );
}
