import { pageMeta } from '@/lib/meta';
import LandingClient from './LandingClient';

// SEO layer — Google/AI reads this
export const metadata = pageMeta('/', {
  title: 'Education Revelation — How All Human Knowledge Connects',
  description: 'Explore the connections between Religion, Philosophy, Science, Art, Love, Consciousness, Mathematics, Nature, Mysticism, and Mythology. Ten doors of human knowledge — one truth underneath them all. Featuring the Vitruvian Man, Convergent Recognition Theory (Ψ = R₁₂ × G), and interactive explorations of the deepest questions humans have ever asked.',
  keywords: 'meaning of life, consciousness, philosophy, religion, science, art, love, mysticism, mathematics, mythology, nature, vitruvian man, da vinci, golden ratio, sacred geometry, convergent recognition theory, truth, human knowledge, why am I here, what is consciousness, does god exist, how is everything connected',
  openGraph: {
    title: 'Education Revelation — How All Human Knowledge Connects',
    description: 'Ten doors of human knowledge. One truth underneath. Search anything — see how it all connects.',
  },
});

export default function Home() {
  return (
    <>
      {/* Screen-reader heading; the visible page is the canvas below */}
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        Education Revelation: ten doors into human knowledge, and one equation underneath. By Jeff Sellers.
      </h1>
      <LandingClient />
    </>
  );
}
