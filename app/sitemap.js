import { SITE_URL } from '@/lib/meta';
import { SUBCATEGORIES } from '@/lib/subcategories';
import { TOPIC_CARDS } from '@/lib/topicCards';
import { SLUG_TO_KEY, ALL_DOOR_SLUGS } from '@/lib/doorMap';

// Every public page, so search engines and link crawlers find all of them.
export default function sitemap() {
  const now = new Date();
  const entry = (path, priority = 0.5, changeFrequency = 'monthly') => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  const pages = [
    entry('/', 1.0, 'weekly'),
    entry('/search', 0.9, 'weekly'),
    entry('/theory', 0.9, 'weekly'),
    entry('/mathematics/vitruvian', 0.7),
    entry('/promises', 0.7),
    entry('/poems', 0.6),
    entry('/poems/rhythm-of-life', 0.5),
    entry('/poems/death-or-life', 0.5),
    entry('/poems/kaleidoscope-sea', 0.5),
    entry('/planes', 0.6),
    entry('/gonewiththewind', 0.6),
    entry('/alanwatts', 0.6),
  ];

  for (const door of ALL_DOOR_SLUGS) {
    const key = SLUG_TO_KEY[door];
    pages.push(entry(`/${door}`, 0.8));
    for (const sub of SUBCATEGORIES[key] || []) {
      pages.push(entry(`/${door}/${sub.id}`, 0.6));
      for (const card of TOPIC_CARDS[key]?.[sub.id] || []) {
        pages.push(entry(`/${door}/${sub.id}/${card.id}`, 0.4));
      }
    }
  }
  return pages;
}
