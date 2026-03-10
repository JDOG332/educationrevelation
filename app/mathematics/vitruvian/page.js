import VitruvianClient from './VitruvianClient';

export const metadata = {
  title: "The Vitruvian Man — Da Vinci's Geometry Verified — Education Revelation",
  description: "Leonardo da Vinci's Vitruvian Man geometry verified to the decimal. Circle radius from navel = 0.70 (verified: 0.699996). The golden section R/H = 0.6089. Two positions — square (exhale) and circle (inhale) — one body.",
  openGraph: {
    title: "The Vitruvian Man — Da Vinci's Geometry Verified",
    description: "Two positions. One body. The man breathes between heaven and earth.",
  },
};

export default function VitruvianPageRoute() {
  return (
    <>
      {/* SEO LAYER — Google/AI reads this */}
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
        <h1>The Vitruvian Man — Da Vinci's Exact Geometry</h1>
        <h2>Position A — The Square — Exhale</h2>
        <p>Arms horizontal. Legs together. The man fits the square. Da Vinci wrote that height equals arm span. The square's side equals both.</p>
        <h2>Position B — The Circle — Inhale</h2>
        <p>Arms raised, legs spread. Fingertips reach the circle at distance R = 0.70 from the navel (verified: 0.699996). Feet reach the circle at distance R = 0.70 (verified: 0.700005). The space between the legs forms an equilateral triangle — da Vinci wrote this himself.</p>
        <h2>Key Measurements</h2>
        <p>Circle center is the navel. The cosmos does not resize.</p>
        <p>Square center is the genitals — not the navel. Leonardo's key correction over Vitruvius. Different shapes, different centers.</p>
        <p>The golden section: R/H = 137/225 ≈ 0.6089.</p>
        <p>Square corners reach OUTSIDE the circle. Earth extends beyond cosmos at its corners.</p>
        <p>Square floor is exactly tangent to the bottom of the circle.</p>
        <h2>The Breathing Metaphor</h2>
        <p>The Vitruvian Man is not a static drawing. It is two positions of the same body. Inhale: the man opens, reaches the divine circle. Exhale: the man returns to the earthly square. The oscillation between touching the cosmos and returning to earth IS the drawing. IS the breathing. IS what Da Vinci encoded.</p>
        <p>The circle is not a cage. It is the universe saying: you can touch me, but only when you are fully open.</p>
      </div>

      {/* EXPERIENCE LAYER — humans see this */}
      <VitruvianClient />
    </>
  );
}
