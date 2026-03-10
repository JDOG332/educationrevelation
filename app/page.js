import LandingClient from './LandingClient';

// SEO layer — Google/AI reads this
export const metadata = {
  title: 'Education Revelation — Connecting Consciousness',
  description: 'Ten doors of human knowledge. Search anything. See how it all connects. Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, Consciousness. The Vitruvian Man breathes between heaven and earth.',
  keywords: 'truth, consciousness, philosophy, religion, science, art, love, mysticism, mathematics, mythology, nature, vitruvian man, da vinci, convergent recognition theory',
  openGraph: {
    title: 'Education Revelation — Connecting Consciousness',
    description: 'Ten doors. One truth. The man breathes between heaven and earth.',
    url: 'https://educationrevelation.com',
    siteName: 'Education Revelation',
    type: 'website',
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
        <h1>Education Revelation — Connecting Consciousness</h1>
        <p>Ten doors of human knowledge. Every question you have ever asked passes through one of these doors: Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, Consciousness.</p>
        <p>The Vitruvian Man breathes between the circle (cosmos) and the square (earth). Two positions. One body. Inhale — arms raised, touching the divine. Exhale — arms down, grounded in matter.</p>
        <p>Search anything. See how all human truth connects underneath.</p>
        <nav>
          <a href="/search">Search & Explore</a>
          <a href="/love">Love</a>
          <a href="/science">Science</a>
          <a href="/consciousness">Consciousness</a>
          <a href="/philosophy">Philosophy</a>
          <a href="/art">Art</a>
          <a href="/nature">Nature</a>
          <a href="/religion">Religion</a>
          <a href="/mysticism">Mysticism</a>
          <a href="/mythology">Mythology</a>
          <a href="/mathematics">Mathematics</a>
          <a href="/poems">Poems</a>
        </nav>
      </div>

      {/* Experience — the real landing page */}
      <LandingClient />
    </>
  );
}
