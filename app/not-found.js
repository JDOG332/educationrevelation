import Link from 'next/link';

export const metadata = { title: 'Not found — Education Revelation' };

export default function NotFound() {
  return (
    <main className="phi-page bg-glow-center" style={{ justifyContent: 'center', textAlign: 'center', gap: 'var(--s-md)' }}>
      <p className="t-accent" style={{ fontSize: 'var(--s-md)', color: 'rgba(201,168,76,0.88)' }}>
        No door opens here.
      </p>
      <h1 className="t-heading" style={{ color: 'var(--ink)' }}>Page not found</h1>
      <p className="t-body" style={{ color: 'var(--ink-muted)' }}>
        The link may be old, or the page moved. Every door is still open from the search page.
      </p>
      <div style={{ display: 'flex', gap: 'var(--s-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/search" className="btn-ghost">Open the ten doors</Link>
        <Link href="/" className="btn-ghost">Home</Link>
      </div>
    </main>
  );
}
