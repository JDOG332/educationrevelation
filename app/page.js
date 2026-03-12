import LandingClient from './LandingClient';

// SEO layer — Google/AI reads this
export const metadata = {
  title: 'Education Revelation — How All Human Knowledge Connects',
  description: 'Explore the connections between Religion, Philosophy, Science, Art, Love, Consciousness, Mathematics, Nature, Mysticism, and Mythology. Ten doors of human knowledge — one truth underneath them all. Featuring the Vitruvian Man, Convergent Recognition Theory (Ψ = R₁₂ × G), and interactive explorations of the deepest questions humans have ever asked.',
  keywords: 'meaning of life, consciousness, philosophy, religion, science, art, love, mysticism, mathematics, mythology, nature, vitruvian man, da vinci, golden ratio, sacred geometry, convergent recognition theory, truth, human knowledge, why am I here, what is consciousness, does god exist, how is everything connected',
  openGraph: {
    title: 'Education Revelation — How All Human Knowledge Connects',
    description: 'Ten doors of human knowledge. One truth underneath. Search anything — see how it all connects.',
    url: 'https://educationrevelation.com',
    siteName: 'Education Revelation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Revelation — How All Human Knowledge Connects',
    description: 'Ten doors of human knowledge. One truth underneath. Search anything — see how it all connects.',
  },
};

export default function Home() {
  return (
    <>
      {/* SEO — invisible to users, visible to crawlers */}
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
        <h1>Education Revelation — How All Human Knowledge Connects</h1>
        <p>Every question you have ever asked passes through one of ten doors: Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, or Consciousness. This site explores how all human knowledge connects underneath — from grief to gravity, from prayer to physics, from music to mathematics.</p>
        <p>Featuring 1,001 topics, each explored through simple explanations a child can understand, deeper intuitive insights, advanced analysis, six sensory experiences, curated music, and Wikipedia connections.</p>
        <p>The Vitruvian Man breathes at the center — Da Vinci's exact geometry verified to the decimal. Two positions between the circle (cosmos) and the square (earth). Inhale: arms raised, touching the divine. Exhale: arms down, grounded in matter.</p>
        <p>Built on Convergent Recognition Theory (Ψ = R₁₂ × G) — a mathematical framework measuring how two systems recognize each other. The site itself is proof: ten lenses, one truth, all converging.</p>
        <h2>The Ten Doors of Human Knowledge</h2>
        <h2>The Ten Doors of Human Knowledge</h2>
        <nav>
          <a href="/search">Search All 1,001 Topics</a>
          <a href="/love">Love — Connection, Grief, Trust, Family & Friendship</a>
          <a href="/science">Science — Biology, Physics, Evolution, DNA & Cosmos</a>
          <a href="/consciousness">Consciousness — Awareness, Identity, Dreams & Death</a>
          <a href="/philosophy">Philosophy — Truth, Ethics, Free Will & Meaning of Life</a>
          <a href="/art">Art — Music, Painting, Poetry, Dance & Theater</a>
          <a href="/nature">Nature — Water, Animals, Trees, Seasons & Fire</a>
          <a href="/religion">Religion — God, Prayer, Faith, Sacred Texts & Afterlife</a>
          <a href="/mysticism">Mysticism — Meditation, Enlightenment & Sacred Geometry</a>
          <a href="/mythology">Mythology — Creation Myths, Hero's Journey & Gods</a>
          <a href="/mathematics">Mathematics — Vitruvian Man, Golden Ratio & Hidden Patterns</a>
          <a href="/poems">Three Original Poems — Rhythm of Life, Death or Life, Kaleidoscope Sea</a>
        </nav>
      </div>

      {/* Experience — the real landing page */}
      <LandingClient />
    </>
  );
}
