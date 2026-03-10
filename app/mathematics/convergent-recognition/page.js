import CRTClient from './CRTClient';

export const metadata = {
  title: "Convergent Recognition Theory — The Master Equation Ψ = R₁₂ × G | How Two Systems Recognize Each Other",
  description: "Convergent Recognition Theory (CRT) is a mathematical framework that measures how reliably two systems recognize each other. The master equation Ψ = R₁₂ × G uses quantum fidelity (R₁₂) and global reliability (G = C_eff × D-hat) to compute a coherence score from 0 to 1. When the signal is clean, the aim is true, and the mirror reflects perfectly — Ψ approaches 1.0. Signal goes out. Comes back same. The universe recognizes itself.",
  keywords: "convergent recognition theory, CRT, psi equation, quantum fidelity, consciousness theory, unified theory, information theory, recognition, coherence, quantum statistical manifolds, self-recognizing universe",
  openGraph: {
    title: "Convergent Recognition Theory (Ψ = R₁₂ × G)",
    description: "The master equation that measures how two systems recognize each other. Signal goes out. Comes back same.",
  },
};

export default function CRTPage() {
  return (
    <>
      {/* SEO LAYER */}
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
        <h1>Convergent Recognition Theory</h1>
        <h2>The Master Equation: Ψ = R₁₂ × G</h2>
        <p>Convergent Recognition Theory (CRT) is a mathematical framework defining a geometric coherence functional Ψ on quantum statistical manifolds. It posits the universe as a self-recognizing information structure.</p>
        <h3>The Components</h3>
        <p>R₁₂ (Disjoint Recognition Core): How reliably a reflection matches the original signal. Uses Uhlmann quantum fidelity gated by an informativeness function to prevent noise from masquerading as recognition.</p>
        <p>G (Global Reliability Modulator): The product of C_eff (convergence efficiency — how well multiple independent measurements agree) and D-hat (detection quality — coincidence versus accidental detection ratio).</p>
        <h3>In Plain English</h3>
        <p>Imagine a flashlight (C_eff — how clean your signal is), pointed at a mirror (D-hat — direction toward something real). The mirror bounces light back. R₁₂ measures how reliably the reflection matches the original signal. Ψ is the total truth of the connection. When the flashlight is clean, the aim is true, and the mirror reflects perfectly — Ψ approaches 1.0.</p>
        <p>Signal goes out. Comes back same. Mirror loop.</p>
        <p><a href="https://drive.google.com/file/d/16kvjpYSCDOerUKxxogDRdbi-37m7KAKL/view?usp=share_link">Read the full Convergent Recognition Theory paper (PDF)</a></p>
      </div>

      {/* EXPERIENCE LAYER */}
      <CRTClient />
    </>
  );
}
