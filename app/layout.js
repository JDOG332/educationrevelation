import './globals.css';
import CursorProvider from '@/components/CursorProvider';

export const metadata = {
  title: 'Education Revelation — Connecting Consciousness',
  description: 'Ten doors of human knowledge. One search. Every question you\'ve ever asked passes through one of these doors: Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, Consciousness.',
  keywords: 'truth, consciousness, philosophy, religion, science, art, love, mysticism, mathematics, mythology, nature, search, explore, human knowledge',
  openGraph: {
    title: 'Education Revelation — Connecting Consciousness',
    description: 'Ten doors. One truth. Search anything. See how it all connects.',
    url: 'https://educationrevelation.com',
    siteName: 'Education Revelation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Revelation — Connecting Consciousness',
    description: 'Ten doors. One truth. Search anything. See how it all connects.',
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
