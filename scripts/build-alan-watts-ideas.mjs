// scripts/build-alan-watts-ideas.mjs
// Builds lib/alanWattsIdeas.js from scripts/data/watts-ideas.json.
// Run: node scripts/build-alan-watts-ideas.mjs
//
// Steps, all deterministic:
//   1. merge near-duplicate ideas (same claim phrased twice), keeping the higher count
//   2. flag ideas tied to a subject or name rather than a claim (subject: true)
//   3. re-rank by count (ties share a rank)
//   4. match up to 3 lectures from lib/alanWattsData.js by weighted keyword overlap
//   5. pick up to 3 site cards from a fixed list, by theme plus a few keywords

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ALAN_WATTS_CATEGORIES } from '../lib/alanWattsData.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rows = JSON.parse(readFileSync(join(root, 'scripts/data/watts-ideas.json'), 'utf8'));

/* 1. Merges: [kept sentence prefix, dropped sentence prefix]. The kept row has the higher count. */
const MERGES = [
  ['Most of us feel we are a separate ego locked', 'The separate ego, the feeling of being a little controller'],
  ['Space does not separate things, it joins them', "Space doesn't separate things; it is what connects them"],
  ['Words and doctrines are a finger pointing at the moon', 'Religious teachings are like a finger pointing at the moon'],
  ['Real meditation has no purpose; doing it to get something', 'Real meditation has no purpose or goal; it is like music'],
  ['A heaven of endless perfection and no contrast', 'Endless pleasure and certainty would bore you to death'],
  ['We imagine a little man inside the head', 'There is no separate thinker behind your thoughts'],
  ['The real you can never be grasped as an object', 'You can never fully know or define yourself'],
  ['The universe is play, not work', 'The universe is a dance, happening for its own sake'],
  ['Each person is like a wave', 'You are something the whole universe is doing, the way a wave'],
  ['The feeling of being a separate ego is largely a chronic muscular strain', 'The ego is a contraction or cramp in consciousness'],
  ['The mystical experience is a real and recurring human state', 'Cosmic consciousness is the sudden, vivid sense'],
  ['Zazen is just sitting', 'Trying to become a Buddha by meditating is like polishing a tile'],
  ['Western psychotherapy at its best does the same work', 'Buddhism, Taoism and Vedanta are closer to Western psychotherapy'],
  ['Self-consciousness, thinking about your thinking', 'Like a badly designed feedback system'],
  ['Breathing shows that the line between what you do', 'Let your breath run as it wills and watch it'],
  ['When Westerners dropped the potter God', 'Modern people killed off Big Daddy in the sky'],
  ['Reality is like one actor playing all the parts', 'The best model of the world is a drama in which God'],
  ['The earth "peoples" the way an apple tree apples', 'You did not come into this world; you came out of it'],
];

/* 2. Subject words: an idea whose sentence turns on one of these names or terms counts every
   passage on that subject, not just passages that make the claim. */
const SUBJECT_TERMS = [
  'psychedelic', 'yoga', 'western religion runs on guilt', 'guru', 'roshi', 'psychotherapy',
  'mystical experience', 'preaching and moralizing', 'atman', 'yin and yang', 'six realms', 'maya',
  'rebirth', 'ritual and liturgy', 'the tao is', 'shunyata', 'lao tzu', 'karma', 'nirvana literally',
  'i ching', 'confucianism', 'a koan', 'sutras', 'western prayer', 'satori', 'zazen', 'hindu cosmology',
  'bodhisattva', 'mahayana', 'upanishads', 'zen arts', 'zen monastery', 'southern school', 'zhuangzi',
  'bodhidharma', 'krishnamurti', 'mantra', 'chinese characters', 'samsara', 'moksha', 'shiva',
  'holy spirit', 'tea ceremony', 'the word zen', 'wabi', 'yetzer hara', 'gnosis', 'bhagavad gita',
  'ink painting', 'mushin', 'pure land', 'judo', 'ramana', "buddha's middle way", 'computers can',
  'ecology shows', 'tantra', 'amida', 'haiku', 'hua-yen', 'meister eckhart', 'sufis', 'original sin',
  'vikalpa', 'nagarjuna', 'confucius', 'tibetan book', 'darwin', 'shankara', "indra's net", 'prajna',
  'vishnu', 'joshu', 'advaita', 'book of job', 'upaya', 'the dharma', 'neti neti', 'the devil',
  'adam and eve', 'mandalas', 'four noble truths', 'arhat', 'dukkha', 'anatman', 'li is the organic',
  'mahakashyapa', 'christian mystics', 'confession', 'liberal christian', 'church buildings',
  'catholics', 'the bible', 'wu wei', 'ziran', 'uncarved block', 'advertising', 'jesus and the mystics',
  'jesus had', 'st. paul', 'christianity', 'the church', 'zen masters shout', 'zen is full of laughter',
  'the kingdom of heaven', 'eden', 'original face', 'eastern ways of liberation',
];

/* 5. Site cards (fixed list of real paths). */
const THEME_CARDS = {
  'Self and perception': ['/mysticism/oneness/ego-dissolution', '/consciousness/observer/nonduality-observer', '/consciousness/perception/observer-effect'],
  'Eastern traditions': ['/mysticism/oneness/ego-dissolution', '/mysticism/oneness/quantum-entanglement-unity'],
  'God, religion and morality': ['/religion/goodevil/free-will', '/religion/goodevil/problem-of-evil'],
  'Mind, time and effort': ['/consciousness/observer/flow-state-observer', '/consciousness/observer/nonduality-observer'],
  'Play, love and death': ['/love/grief/golden-repair-kintsugi', '/poems/kaleidoscope-sea'],
  'Nature and ecology': ['/consciousness/perception/observer-effect', '/mysticism/oneness/quantum-entanglement-unity'],
  'Society and money': ['/promises', '/religion/goodevil/free-will'],
  'Language and science': ['/consciousness/perception/observer-effect', '/philosophy/freewill/butterfly-effect'],
};
const KEYWORD_CARDS = [
  [/\b(evil|devil|sin|damnation|hell)\b/i, '/religion/goodevil/problem-of-evil'],
  [/\b(death|dies?|dying|bardo)\b/i, '/mythology/underworld/katabasis'],
  [/\b(myth|hero|drama|actor)\b/i, '/mythology/hero'],
  [/\b(flow|effortless|spontaneous)\b/i, '/consciousness/observer/flow-state-observer'],
  [/\b(cause|chance|luck)\b/i, '/philosophy/freewill/butterfly-effect'],
  [/\b(observer|knower)\b/i, '/consciousness/observer/nonduality-observer'],
];
const ALLOWED_CARDS = new Set([
  '/mysticism/oneness/ego-dissolution', '/consciousness/observer/nonduality-observer',
  '/mysticism/oneness/quantum-entanglement-unity', '/consciousness/perception/observer-effect',
  '/philosophy/freewill/butterfly-effect', '/religion/goodevil/free-will', '/religion/goodevil/problem-of-evil',
  '/consciousness/observer/flow-state-observer', '/love/grief/golden-repair-kintsugi', '/mythology/hero',
  '/mythology/underworld/katabasis', '/planes', '/gonewiththewind', '/promises', '/poems/kaleidoscope-sea',
]);

function cardsFor(idea) {
  const out = [];
  for (const [re, path] of KEYWORD_CARDS) if (re.test(idea.sentence) && !out.includes(path)) out.push(path);
  for (const path of THEME_CARDS[idea.theme] || []) if (!out.includes(path)) out.push(path);
  return out.filter(p => ALLOWED_CARDS.has(p)).slice(0, 3);
}

/* 4. Lecture matcher: weighted keyword overlap with IDF, title words count double. */
const STOP = new Set(('a an and are as at be because but by can cannot come comes do does doing for from get '
  + 'go has have he his how i if in into is it its just kind like make makes more most much must my need '
  + 'no not nothing of on one only or other our out own rather really same so some such than that the their '
  + 'them then there these they thing things this those through to too two up us very was way ways we what '
  + 'when where which while who whole why will with without would you your alan watts lecture part pt '
  + 'series full talk every everything all also even any ever never itself always').split(' '));
function stem(w) {
  if (w.length > 5 && w.endsWith('ing')) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith('ed')) w = w.slice(0, -2);
  else if (w.length > 4 && w.endsWith('ies')) w = w.slice(0, -3) + 'y';
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);
  return w;
}
function tokens(text) {
  return new Set(text.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/[\s'-]+/)
    .filter(w => w.length > 2 && !STOP.has(w)).map(stem).filter(w => !STOP.has(w)));
}
const lectures = ALAN_WATTS_CATEGORIES.flatMap(c => c.lectures.map(l => ({
  num: l.num, title: tokens(l.title), body: tokens(l.truths.join(' ') + ' ' + c.name),
})));
const df = new Map();
for (const l of lectures) for (const t of new Set([...l.title, ...l.body])) df.set(t, (df.get(t) || 0) + 1);
const idf = t => Math.log((lectures.length + 1) / ((df.get(t) || 0) + 0.5));
function lecturesFor(idea) {
  const q = tokens(idea.sentence);
  const scored = lectures.map(l => {
    let s = 0;
    for (const t of q) {
      if (l.title.has(t)) s += 2 * idf(t);
      if (l.body.has(t)) s += idf(t);
    }
    return { num: l.num, s };
  }).filter(x => x.s >= 4).sort((a, b) => b.s - a.s || a.num - b.num);
  return scored.slice(0, 3).map(x => x.num);
}

/* Build */
let ideas = rows.map(([rank, sentence, count, theme, quote]) => ({ rank, sentence, count, theme, quote }));
const merged = [];
for (const [keepP, dropP] of MERGES) {
  const keep = ideas.find(i => i.sentence.startsWith(keepP));
  const drop = ideas.find(i => i.sentence.startsWith(dropP));
  if (!keep || !drop) throw new Error(`merge not found: ${keepP} / ${dropP}`);
  if (drop.count > keep.count) throw new Error(`merge keeps the lower count: ${keepP}`);
  merged.push({ kept: keep.sentence, dropped: drop.sentence, keptCount: keep.count, droppedCount: drop.count });
  ideas = ideas.filter(i => i !== drop);
}
ideas.sort((a, b) => b.count - a.count || a.rank - b.rank);
const slugs = new Set();
ideas = ideas.map((i, idx) => {
  const rank = idx > 0 && ideas[idx - 1].count === i.count ? null : idx + 1;
  let base = i.sentence.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).slice(0, 6).join('-');
  let id = base, n = 2;
  while (slugs.has(id)) id = `${base}-${n++}`;
  slugs.add(id);
  const low = i.sentence.toLowerCase();
  const subject = SUBJECT_TERMS.some(t => low.includes(t));
  return { rank, id, sentence: i.sentence, count: i.count, theme: i.theme, quote: i.quote, subject };
});
for (let k = 0; k < ideas.length; k++) if (ideas[k].rank === null) ideas[k].rank = ideas[k - 1].rank;
for (const i of ideas) {
  i.lectures = lecturesFor(i);
  i.cards = cardsFor(i);
}

const themeCounts = {};
for (const i of ideas) themeCounts[i.theme] = (themeCounts[i.theme] || 0) + 1;
const IDEA_THEMES = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));

const METHOD = 'Source: about 901,000 words of Alan Watts lecture transcripts, split into 17,745 short passages of roughly 50 words each (the public eliwill/Watts transcript set, https://huggingface.co/datasets/eliwill/Watts). His books are not included. Each idea has a set of search phrases; one mention means one passage that matches them, counted by code. This is the part of his talks that was transcribed, so low counts are floors. Ideas tied to a name or subject (psychedelics, yoga, guilt, the guru) count every passage on that subject, so they rank higher than ideas that only show up in a specific turn of phrase.';

const header = `// lib/alanWattsIdeas.js
// GENERATED by scripts/build-alan-watts-ideas.mjs from scripts/data/watts-ideas.json. Do not edit by hand.
// ${ideas.length} ideas (${rows.length} source rows, ${merged.length} merged as the same claim phrased twice).
// \`subject: true\` marks ideas tied to a name or subject, which count every passage on that subject.
// \`lectures\` are lecture nums in lib/alanWattsData.js (keyword overlap); \`cards\` are site paths.
//
// Merges (kept, count  <=  dropped, count):
${merged.map(m => `//   "${m.kept.slice(0, 60)}..." (${m.keptCount})\n//     <= "${m.dropped.slice(0, 60)}..." (${m.droppedCount})`).join('\n')}
`;

const body = `${header}
export const IDEAS_SOURCE_URL = 'https://huggingface.co/datasets/eliwill/Watts';

export const METHOD = ${JSON.stringify(METHOD)};

export const IDEA_THEMES = ${JSON.stringify(IDEA_THEMES, null, 2)};

export const ALAN_WATTS_IDEAS = [
${ideas.map(i => '  ' + JSON.stringify(i)).join(',\n')},
];
`;
writeFileSync(join(root, 'lib/alanWattsIdeas.js'), body);
console.log(`wrote ${ideas.length} ideas, ${merged.length} merges, ${ideas.filter(i => i.subject).length} subject-tied,`
  + ` ${ideas.filter(i => i.lectures.length === 0).length} with no lecture match`);
