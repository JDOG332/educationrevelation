// Shared frame for the plain content pages. Server components only.
// The site-wide header is added separately, so pages carry no header here:
// just the content and one link back to the doors at the bottom.
import Link from 'next/link';
import s from './kit.module.css';

export { s };

export function ContentPage({ children, narrow = false }) {
  return (
    <main className="phi-page content-below-header">
      <div className={narrow ? `${s.wrap} ${s.narrow}` : s.wrap}>
        {children}
        <Link href="/search" className={`btn-ghost ${s.back}`}>
          ← Back to the doors
        </Link>
      </div>
    </main>
  );
}

export function PageHead({ eyebrow, title, subtitle, byline, draft = false }) {
  return (
    <header className={s.head}>
      {draft && <p className={s.draft}>Draft, Jeff still editing</p>}
      {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
      <h1 className={`t-display ${s.title}`}>{title}</h1>
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      {byline && <p className={s.byline}>{byline}</p>}
    </header>
  );
}
