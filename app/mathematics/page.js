import Link from 'next/link';

export const metadata = {
  title: 'Mathematics — Education Revelation',
  description: 'The hidden pattern beneath everything. Explore the Vitruvian Man geometry and Convergent Recognition Theory (Ψ = R₁₂ × G).',
};

export default function MathPage() {
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
        }}>MATHEMATICS</h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(18px, 2.618vmin, 28px)",
          color: "rgba(232,228,210,0.618)", textAlign: "center",
          animation: "fadeUp 618ms 236ms both ease",
        }}>The hidden pattern beneath everything</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          {[
            { title: "THE VITRUVIAN MAN", sub: "Da Vinci's exact geometry — verified to the decimal", icon: "📐" },
            { title: "CONVERGENT RECOGNITION", sub: "Ψ = R₁₂ × G — the master equation", icon: "Ψ" },
          ].map((card, i) => (
            <div key={card.title} style={{
              padding: "1.618rem",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 6,
              animation: `fadeUp 618ms ${382 + i * 200}ms both ease`,
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700,
                fontSize: "clamp(16px, 2.618vmin, 22px)",
                color: "rgba(201,168,76,0.90)",
                marginBottom: "0.382rem",
              }}>{card.icon} {card.title}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: "clamp(14px, 2vmin, 18px)",
                color: "rgba(201,168,76,0.45)",
              }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
