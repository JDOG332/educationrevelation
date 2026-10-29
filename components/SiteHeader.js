'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * One header for every page: a Back link that goes up one level, and the
 * site's six places. Hidden on the landing page and the intro, which are
 * full-screen canvases with their own way in.
 */

const NAV = [
  { href: '/search',   label: 'Explore'  },
  { href: '/theory',   label: 'Theory'   },
  { href: '/poems',    label: 'Poems'    },
  { href: '/promises', label: 'Promises' },
  { href: '/alanwatts', label: 'Watts'   },
  { href: '/about',    label: 'About'    },
];

// Where "Back" goes: up one path segment; top-level pages go to the doors;
// the doors page goes home.
function backHref(pathname) {
  if (pathname === '/search') return '/';
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length <= 1) return '/search';
  return '/' + parts.slice(0, -1).join('/');
}

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  if (pathname === '/' || pathname === '/intro') return null;

  return (
    <header className="site-header">
      <Link href={backHref(pathname)} className="site-header__back" aria-label="Back">← BACK</Link>
      <nav className="site-header__nav" aria-label="Site">
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== '/search' && pathname.startsWith(item.href + '/'));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={'site-header__link' + (active ? ' is-active' : '')}
              aria-current={active ? 'page' : undefined}
            >{item.label}</Link>
          );
        })}
      </nav>
    </header>
  );
}
