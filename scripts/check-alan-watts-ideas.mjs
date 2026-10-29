// scripts/check-alan-watts-ideas.mjs
// Quick sanity print of lib/alanWattsIdeas.js. Run: node scripts/check-alan-watts-ideas.mjs [all]
import { ALAN_WATTS_IDEAS, IDEA_THEMES } from '../lib/alanWattsIdeas.js';
import { ALAN_WATTS_CATEGORIES } from '../lib/alanWattsData.js';

const byNum = new Map(ALAN_WATTS_CATEGORIES.flatMap(c => c.lectures).map(l => [l.num, l.title]));
const ideas = ALAN_WATTS_IDEAS;
console.log('ideas:', ideas.length);
console.log('max count:', Math.max(...ideas.map(i => i.count)));
console.log('themes:', IDEA_THEMES.map(t => `${t.name} ${t.count}`).join(', '));
console.log('subject-tied:', ideas.filter(i => i.subject).length, '· zero count:', ideas.filter(i => i.count === 0).length);
const show = process.argv[2] === 'all' ? ideas : [ideas[0], ideas[60], ideas[200]];
for (const i of show) {
  console.log(`\n#${i.rank} (${i.count})${i.subject ? ' [subject]' : ''} ${i.sentence}`);
  console.log('  lectures:', i.lectures.map(n => `${n} ${byNum.get(n)}`).join(' | '));
  console.log('  cards:', i.cards.join(', '));
}
