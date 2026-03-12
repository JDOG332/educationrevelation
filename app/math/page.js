import Link from 'next/link';

export const metadata = {
  title: "The Hidden Pattern — Da Vinci's Vitruvian Man & Convergent Recognition Theory (Ψ = R₁₂ × G)",
  description: "Da Vinci's Vitruvian Man geometry verified to the decimal — circle radius 0.70, golden section R/H = 0.6089. Plus Convergent Recognition Theory: the master equation Ψ = R₁₂ × G that measures how two systems recognize each other.",
};

export default function MathHubPage() {
  return (
    <div className="phi-page bg-glow-center" style={{ paddingBottom: "4.236rem" }}>

      {/* Frosted header */}
      <div className="frosted-header" style={{ justifyContent: "space-between", paddingRight: "1.618rem" }}>
        <Link href="/search" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span className="back-link">← BACK</span>
        </Link>
        <Link href="/search" className="explore-link" style={{ pointerEvents: "auto" }}>SEARCH & EXPLORE</Link>
      </div>

      <div className="content-below-header" style={{
        width: "100%", maxWidth: "var(--content-narrow)",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "1.618rem",
      }}>
        <h1 className="stagger-fade" style={{
          fontFamily: "var(--font-display)", fontWeight: 900,
          fontSize: "clamp(1.75rem, 6.854vmin + 0.25rem, 3rem)",
          color: "rgba(201,168,76,0.618)",
          animationDelay: "100ms",
          textShadow: "0 0 0.5rem rgba(201,168,76,0.382), 0 0 1.5rem rgba(201,168,76,0.146)",
        }}>THE MATH</h1>

        <p className="stagger-fade t-accent" style={{
          fontSize: "clamp(1.125rem, 2.618vmin + 0.25rem, 1.75rem)",
          fontWeight: 300,
          color: "rgba(232,228,210,0.75)",
          textAlign: "center",
          animationDelay: "236ms",
        }}>The hidden pattern beneath everything</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          {[
            { title: "THE VITRUVIAN MAN", sub: "Da Vinci's exact geometry — verified to the decimal", icon: "📐", href: "/mathematics/vitruvian" },
            { title: "CONVERGENT RECOGNITION", sub: "Ψ = R₁₂ × G — the master equation", icon: "Ψ", href: "/mathematics/convergent-recognition" },
          ].map((card, i) => (
            <Link key={card.title} href={card.href} style={{ textDecoration: "none" }}>
              <div className="phi-card stagger-fade" style={{
                animationDelay: `${382 + i * 200}ms`,
              }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "clamp(1.125rem, 2.618vmin + 0.15rem, 1.5rem)",
                  color: "rgba(201,168,76,0.90)",
                  marginBottom: "0.382rem",
                }}>{card.icon} {card.title}</div>
                <div style={{
                  fontFamily: "var(--font-accent)", fontStyle: "italic",
                  fontSize: "clamp(0.938rem, 2vmin + 0.15rem, 1.25rem)",
                  color: "rgba(201,168,76,0.65)",
                }}>{card.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
