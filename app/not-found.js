import Link from 'next/link';

export const metadata = {
  title: 'Not Found — Education Revelation',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 23.6%, rgba(14,10,28,0.618) 0%, #03030a 61.8%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      color: "#e8e4d4", padding: "0 1.618rem", textAlign: "center",
    }}>
      <div style={{
        fontSize: "clamp(3rem, 11vmin, 6rem)", fontWeight: 200, letterSpacing: "0.1em",
        color: "rgba(201,168,76,0.9)", marginBottom: "1rem",
      }}>404</div>
      <p style={{ fontSize: "1.125rem", color: "rgba(232,228,212,0.7)", maxWidth: "30rem", marginBottom: "2rem" }}>
        This door doesn&apos;t open onto anything. The page you&apos;re looking for isn&apos;t here.
      </p>
      <Link href="/" style={{
        textDecoration: "none", color: "#e8e4d4",
        border: "1px solid rgba(201,168,76,0.45)", borderRadius: "0.382rem",
        padding: "0.618rem 1.618rem", letterSpacing: "0.1em", fontSize: "0.875rem",
      }}>
        RETURN HOME
      </Link>
    </div>
  );
}
