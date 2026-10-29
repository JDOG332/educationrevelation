import './globals.css';
import localFont from 'next/font/local';
import CursorProvider from '@/components/CursorProvider';
import SiteHeader from '@/components/SiteHeader';
import { SITE_URL } from '@/lib/meta';

// Self-hosted fonts, vendored in app/fonts (variable woff2 from Google Fonts, latin subset),
// so a build never depends on fetching fonts.googleapis.com.
const playfair = localFont({
  src: [
    { path: './fonts/playfair-variable.woff2', weight: '400 900', style: 'normal' },
    { path: './fonts/playfair-italic-variable.woff2', weight: '400 900', style: 'italic' },
  ],
  variable: '--font-playfair', display: 'swap',
});
const inter = localFont({
  src: [{ path: './fonts/inter-variable.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-inter', display: 'swap',
});
const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-variable.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-italic-variable.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant', display: 'swap',
});

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
