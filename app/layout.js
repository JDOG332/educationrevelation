import './globals.css';
import CursorProvider from '@/components/CursorProvider';

export const metadata = {
  title: 'Education Revelation — How All Human Knowledge Connects',
  description: 'Ten doors of human knowledge. 1,001 topics. Every question you\'ve ever asked passes through one of these doors: Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, Consciousness. Search anything. See how it all connects underneath.',
  keywords: 'meaning of life, consciousness, philosophy, religion, science, art, love, mysticism, mathematics, mythology, nature, vitruvian man, da vinci, golden ratio, sacred geometry, convergent recognition theory, truth, human knowledge, education, wisdom',
  openGraph: {
    title: 'Education Revelation — How All Human Knowledge Connects',
    description: 'Ten doors. 1,001 topics. Every question passes through one of these doors.',
    url: 'https://educationrevelation.com',
    siteName: 'Education Revelation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Revelation — How All Human Knowledge Connects',
    description: 'Ten doors. 1,001 topics. Every question passes through one of these doors.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider />
        {children}
      </body>
    </html>
  );
}
