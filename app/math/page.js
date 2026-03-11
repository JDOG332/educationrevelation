import Link from 'next/link';

export const metadata = {
  title: "The Hidden Pattern — Da Vinci's Vitruvian Man & Convergent Recognition Theory (Ψ = R₁₂ × G)",
  description: "Da Vinci's Vitruvian Man geometry verified to the decimal — circle radius 0.70, golden section R/H = 0.6089. Plus Convergent Recognition Theory: the master equation Ψ = R₁₂ × G that measures how two systems recognize each other.",
};

export default function MathHubPage() {
  const EASE = "cubic-bezier(0.23,1,0.32,1)";

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 23.6%, rgba(14,10,28,0.618) 0%, #03030a 61.8%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 1rem", paddingBottom: "4rem",
    }}>
      {/* Frosted header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
        height: "clamp(56px, 8vh, 72px)",
        background: "linear-gradient(180deg, rgba(3,3,10,0.92) 0%, rgba(3,3,10,0.6) 70%, transparent 100%)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center",
        paddingLeft: "1.618rem",
        pointerEvents: "none",
      }}>
        <Link href="/search" style={{ pointerEvents: "auto", textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(18px, 2.618vmin, 28px)",
            color: "rgba(201,168,76,0.618)", cursor: "pointer",
          }}>← BACK</span>
        </Link>
      </div>

      <div style={{
        width: "100%", maxWidth: "30rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(80px, 14vh, 130px)", gap: "1.618rem",
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(28px, 6.854vmin, 48px)",
          color: "rgba(201,168,76,0.618)",
          animation: "fadeUp 618ms 100ms both ease",
          textShadow: "0 0 8px rgba(201,168,76,0.382), 0 0 24px rgba(201,168,76,0.146)",
        }}>THE MATH</h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: "rgba(232,228,210,0.618)", textAlign: "center",
          animation: "fadeUp 618ms 236ms both ease",
        }}>The hidden pattern beneath everything</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          {[
            { title: "THE VITRUVIAN MAN", sub: "Da Vinci's exact geometry — verified to the decimal", icon: "📐", href: "/mathematics/vitruvian" },
            { title: "CONVERGENT RECOGNITION", sub: "Ψ = R₁₂ × G — the master equation", icon: "Ψ", href: "/mathematics/convergent-recognition" },
          ].map((card, i) => (
            <Link key={card.title} href={card.href} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "1.618rem",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.22)",
                borderRadius: 6,
                animation: `fadeUp 618ms ${382 + i * 200}ms both ease`,
                cursor: "pointer",
                transition: `all 618ms ${EASE}`,
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  fontSize: "clamp(18px, 2.618vmin, 24px)",
                  color: "rgba(201,168,76,0.90)",
                  marginBottom: "0.382rem",
                }}>{card.icon} {card.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  fontSize: "clamp(15px, 2vmin, 20px)",
                  color: "rgba(201,168,76,0.45)",
                }}>{card.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
