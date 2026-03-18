import PlanesClient from './PlanesClient';

export const metadata = {
  title: 'The Architecture — Five Planes of Consciousness | Education Revelation',
  description: 'The gear model of consciousness: five planes from Divine to Physical, each turning the next. How consciousness densifies into matter, why the gears turn each other, and what the axle means. Featuring Convergent Recognition Theory mapped to each plane.',
  keywords: 'planes of consciousness, spiritual planes, convergent recognition theory, sacred geometry, witness self, consciousness levels, divine plane, astral plane, mental plane, physical plane, CRT, psi equation',
  openGraph: {
    title: 'The Architecture — Five Planes of Consciousness',
    description: 'Five gears. One axle. The map of how consciousness becomes matter — and how to move between them.',
    url: 'https://educationrevelation.com/planes',
    siteName: 'Education Revelation',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Architecture — Five Planes of Consciousness',
    description: 'Five gears. One axle. The map of how consciousness becomes matter.',
  },
};

export default function PlanesPage() {
  return <PlanesClient />;
}
