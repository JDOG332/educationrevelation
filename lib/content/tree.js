/**
 * The Tree of Life: the ten sefirot of Kabbalah, drawn by code, with the
 * site's ten doors standing in the ten places. Positions are the classic
 * three-pillar layout (x, y as fractions of the drawing). The mapping of
 * doors to sefirot is Jeff's reading, not a tradition's.
 */

export const SEFIROT = [
  { n: 1,  id: 'keter',    name: 'Keter',    meaning: 'Crown',          x: 0.50, y: 0.06, door: 'mysticism',     doorName: 'Mysticism',     why: 'The crown sits above thought: direct experience of the infinite, before any word for it.' },
  { n: 2,  id: 'chokhmah', name: 'Chokhmah', meaning: 'Wisdom',         x: 0.80, y: 0.20, door: 'philosophy',    doorName: 'Philosophy',    why: 'The flash of insight; what can be known by reason alone.' },
  { n: 3,  id: 'binah',    name: 'Binah',    meaning: 'Understanding',  x: 0.20, y: 0.20, door: 'science',       doorName: 'Science',       why: 'Understanding that takes the flash apart and finds its laws.' },
  { n: 4,  id: 'chesed',   name: 'Chesed',   meaning: 'Lovingkindness', x: 0.80, y: 0.40, door: 'love',          doorName: 'Love',          why: 'The giving that holds everything together.' },
  { n: 5,  id: 'gevurah',  name: 'Gevurah',  meaning: 'Strength',       x: 0.20, y: 0.40, door: 'religion',      doorName: 'Religion',      why: 'Judgment and form: what has been revealed, and how one must live.' },
  { n: 6,  id: 'tiferet',  name: 'Tiferet',  meaning: 'Beauty',         x: 0.50, y: 0.52, door: 'art',           doorName: 'Art',           why: 'The heart of the tree, where mercy and strength balance: beauty.' },
  { n: 7,  id: 'netzach',  name: 'Netzach',  meaning: 'Eternity',       x: 0.80, y: 0.66, door: 'mythology',     doorName: 'Mythology',     why: 'What endures: the stories that keep telling themselves.' },
  { n: 8,  id: 'hod',      name: 'Hod',      meaning: 'Splendor',       x: 0.20, y: 0.66, door: 'mathematics',   doorName: 'Mathematics',   why: 'Splendor of form: the hidden structure beneath all things.' },
  { n: 9,  id: 'yesod',    name: 'Yesod',    meaning: 'Foundation',     x: 0.50, y: 0.79, door: 'consciousness', doorName: 'Consciousness', why: 'The foundation everything above passes through on its way to the world: awareness.' },
  { n: 10, id: 'malkhut',  name: 'Malkhut',  meaning: 'Kingdom',        x: 0.50, y: 0.95, door: 'nature',        doorName: 'Nature',        why: 'The kingdom: the earth itself, where it all lands.' },
];

// The 22 paths of the classic tree, by sefirah number.
export const PATHS = [
  [1, 2], [1, 3], [1, 6], [2, 3], [2, 4], [2, 6], [3, 5], [3, 6], [4, 5], [4, 6], [4, 7],
  [5, 6], [5, 8], [6, 7], [6, 8], [6, 9], [7, 8], [7, 9], [7, 10], [8, 9], [8, 10], [9, 10],
];

// The lightning flash: the order in which the tree is said to be drawn,
// crown to kingdom, zigzagging between the pillars.
export const FLASH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const PILLARS = [
  { x: 0.20, name: 'Pillar of form',    note: 'Binah, Gevurah, Hod: the side that limits, judges, shapes.' },
  { x: 0.50, name: 'Pillar of balance', note: 'Keter, Tiferet, Yesod, Malkhut: the middle way down.' },
  { x: 0.80, name: 'Pillar of force',   note: 'Chokhmah, Chesed, Netzach: the side that gives, expands, flows.' },
];

export const TREE_INTRO = [
  'The Tree of Life is a diagram the Kabbalists drew from the twelfth century on: ten sefirot, ten ways the infinite pours itself into the world, joined by twenty-two paths and arranged on three pillars. Draw a line through the ten in order and you get the lightning flash, the shape of creation coming down.',
  'Ten. The same number as the Tetractys, 1 + 2 + 3 + 4, and the same number as the doors on this site. So here the ten doors stand in the ten places. The mapping is Jeff\'s way of reading the tree, not anyone\'s doctrine. Tap a sefirah to see which door it holds and why.',
];
