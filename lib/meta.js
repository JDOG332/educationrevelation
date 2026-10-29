/**
 * Page metadata helper.
 *
 * Every page passes its path and its own title, description and openGraph
 * block. This fills in what link previews need and what the pages used to
 * leave out: the canonical URL, the page's own og:url, and twitter tags that
 * mirror the openGraph ones (Next merges metadata per key, so a page that set
 * openGraph but not twitter inherited the site-wide twitter title).
 */

export const SITE_URL = 'https://www.educationrevelation.com';
export const SITE_NAME = 'Education Revelation';
export const AUTHOR = 'Jeff Sellers';

export function pageMeta(path, meta = {}) {
  const url = `${SITE_URL}${path}`;
  const og = meta.openGraph || {};
  const ogTitle = og.title || meta.title;
  const ogDescription = og.description || meta.description;

  return {
    ...meta,
    alternates: { canonical: url, ...(meta.alternates || {}) },
    authors: meta.authors || [{ name: AUTHOR, url: SITE_URL }],
    openGraph: {
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      ...og,
      url,
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(meta.twitter || {}),
    },
  };
}
