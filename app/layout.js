import './globals.css';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import CursorProvider from '@/components/CursorProvider';
import SiteHeader from '@/components/SiteHeader';
import { SITE_URL } from '@/lib/meta';

// Self-hosted fonts: no render-blocking @import, only the weights the site uses.
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700', '900'], style: ['normal', 'italic'], variable: '--font-playfair', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-inter', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Education Revelation — How All Human Knowledge Connects',
  description: 'Ten doors of human knowledge. 1,001 topics. Every question you\'ve ever asked passes through one of these doors: Religion, Philosophy, Science, Mysticism, Art, Mathematics, Mythology, Nature, Love, Consciousness. Search anything. See how it all connects underneath.',
  keywords: 'meaning of life, consciousness, philosophy, religion, science, art, love, mysticism, mathematics, mythology, nature, vitruvian man, da vinci, golden ratio, sacred geometry, convergent recognition theory, truth, human knowledge, education, wisdom',
  openGraph: {
    title: 'Education Revelation — How All Human Knowledge Connects',
    description: 'Ten doors. 1,001 topics. Every question passes through one of these doors.',
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
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body>
        <CursorProvider />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
