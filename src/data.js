export const PHI = 1.618;
export const PHI_INV = 0.618;
export const PHI2 = PHI * PHI; // 2.618
export const PHI3 = PHI * PHI * PHI; // 4.236

export const DEPTH_NAMES = ["THE VOID", "DEATH OR LIFE", "RHYTHM OF LIFE", "THE PACT", "THE PROOF", "QUESTIONING", "THE SELF", "THE OTHER", "THE RETURN", "THE MIRROR"];

export const DEPTH_ATMOSPHERES = [
  "radial-gradient(ellipse at 50% 30%, rgba(14,10,28,1) 0%, #030306 80%)",     // 0 void — I want
  "radial-gradient(ellipse at 50% 35%, rgba(8,6,20,1) 0%, #030306 85%)",       // 1 dream — I see
  "radial-gradient(ellipse at 50% 50%, rgba(10,8,22,1) 0%, #030306 75%)",      // 2 poem — I feel
  "radial-gradient(ellipse at 50% 40%, rgba(18,10,22,1) 0%, #030306 80%)",     // 3 pact — I shape
  "radial-gradient(ellipse at 50% 45%, rgba(18,12,16,1) 0%, #030306 80%)",     // 4 proof — I know
  "radial-gradient(ellipse at 50% 40%, rgba(28,8,8,1) 0%, #030306 80%)",       // 5 break — I crack
  "radial-gradient(ellipse at 50% 45%, rgba(12,18,28,1) 0%, #030306 80%)",     // 6 self — I am
  "radial-gradient(ellipse at 50% 50%, rgba(22,14,10,1) 0%, #030306 80%)",     // 7 other — you are
  "radial-gradient(ellipse at 50% 35%, rgba(14,10,28,1) 0%, #030306 80%)",     // 8 return — we become
  "radial-gradient(ellipse at 50% 50%, rgba(20,16,10,1) 0%, #030306 75%)",     // 9 mirror — it is what it is
];

export const KNOWLEDGE_WORDS = [
  "KNOWLEDGE","WISDOM","TRUTH","UNDERSTANDING","INSIGHT",
  "AWARENESS","CLARITY","REVELATION","ILLUMINATION","GNOSIS",
  "EPIPHANY","RECOGNITION","DISCERNMENT","ENLIGHTENMENT","DISCOVERY",
  "CONSCIOUSNESS","KNOWING","VISION","INTUITION","REASON",
  "PROOF","CERTAINTY","LUCIDITY","AWAKENING","REMEMBRANCE",
  "SAPIENCE","LOGOS","SOPHIA","SCIENTIA","VERITAS",
  "SIGNAL","FREQUENCY","RESONANCE","CONVERGENCE","FIDELITY",
  "PATTERN","ACUMEN","PRESCIENCE","COGNITION","PERCEPTION",
  "COMPREHENSION","INTELLIGENCE","LEARNING","MASTERY","DOCTRINE",
  "DHARMA","PRAJNA","BODHI","SATORI","THE PROOF",
];

export const OPPOSITE_PAIRS = [
  ["DARK","LIGHT"],["MOON","SUN"],["NIGHT","DAY"],["SHADOW","FLAME"],["WINTER","SUMMER"],
  ["EARTH","SKY"],["DEEP","HIGH"],["COLD","WARM"],["STILL","MOVING"],["SILENCE","SOUND"],
  ["IN","OUT"],["ROOT","WING"],["BONE","SKIN"],["SEED","BLOOM"],["SLEEP","WAKE"],
  ["DREAM","SIGHT"],["BREATH IN","BREATH OUT"],["CLOSED","OPEN"],["HIDDEN","SEEN"],["BURIED","RISING"],
  ["DEATH","LIFE"],["END","BEGIN"],["EMPTY","FULL"],["NOTHING","EVERYTHING"],["QUESTION","ANSWER"],
  ["DOUBT","FAITH"],["LOSS","GAIN"],["FALL","RISE"],["WOUND","HEALING"],["UNKNOWN","KNOWN"],
  ["PULL","PUSH"],["RECEIVE","GIVE"],["LISTEN","SPEAK"],["GATHER","SCATTER"],["BELOW","ABOVE"],
  ["WITHIN","BEYOND"],["DESCEND","ASCEND"],["CONTRACT","EXPAND"],["INHALE","EXHALE"],["RETURN","DEPART"],
  ["MIRROR","WINDOW"],["GLASS","WATER"],["MOTHER","FATHER"],["MATTER","PATTERN"],["FLESH","SPIRIT"],
  ["DUST","STAR"],["GRAVITY","GRACE"],["BLACK","WHITE"],["ZERO","ONE"],["THE KNOT","THE BRAID"],
];

// Kabbalistic Tree of Life — 10 Sephirot with normalized positions and pillar
export const SEPHIROT = [
  { name: "Keter",    x: 0.50, y: 0.00, pillar: "center" },
  { name: "Chokmah",  x: 0.80, y: 0.12, pillar: "right"  },
  { name: "Binah",    x: 0.20, y: 0.12, pillar: "left"   },
  { name: "Chesed",   x: 0.80, y: 0.38, pillar: "right"  },
  { name: "Gevurah",  x: 0.20, y: 0.38, pillar: "left"   },
  { name: "Tiferet",  x: 0.50, y: 0.50, pillar: "center" },
  { name: "Netzach",  x: 0.80, y: 0.68, pillar: "right"  },
  { name: "Hod",      x: 0.20, y: 0.68, pillar: "left"   },
  { name: "Yesod",    x: 0.50, y: 0.82, pillar: "center" },
  { name: "Malkuth",  x: 0.50, y: 1.00, pillar: "center" },
];

// 22 traditional connecting paths (index pairs into SEPHIROT)
export const SEPH_PATHS = [
  [0,1],[0,2],[0,5],       // Keter → Chokmah, Binah, Tiferet
  [1,2],[1,3],[1,5],       // Chokmah → Binah, Chesed, Tiferet
  [2,4],[2,5],             // Binah → Gevurah, Tiferet
  [3,4],[3,5],[3,6],       // Chesed → Gevurah, Tiferet, Netzach
  [4,5],[4,7],             // Gevurah → Tiferet, Hod
  [5,6],[5,7],[5,8],       // Tiferet → Netzach, Hod, Yesod
  [6,7],[6,8],[6,9],       // Netzach → Hod, Yesod, Malkuth
  [7,8],[7,9],             // Hod → Yesod, Malkuth
  [8,9],                   // Yesod → Malkuth
];

export const POEMS = [
  "it's the rhythm of life",
  "",
  "every hope is a heartbeat\nand every wish is a dream…",
  "",
  "though the moon never wishes\nthe sun it would be",
  "",
  "for each life has a purpose\nthat's hidden inside…",
  "",
  "every saint is a sinner\njust trying to hide",
  "",
  "every girl needs a mountain\nto climb up and slide…",
  "",
  "and each man has a boy\nstill growing inside",
  "",
  "every beast has a burden\nso scary and mean…",
  "",
  "every eagle an eaglet\njust waiting to scream",
  "",
  "every deck\nneeds a dealer…",
  "",
  "for trump she will make",
  "",
  "but don't make hard rules\nyou're not ready to break",
  "",
  "because each baby is born\nwith all that it needs…",
  "",
  "just wisdom and love\nand the chance to breathe",
  "",
];

export const ASK_POEMS = [
  "death or life",
  "",
  "alive when dancing\n&\ndead when not…",
  "",
  "dance all day\n&\nnever stop",
  "", "",
  "find a partner\n&\nshow me how",
  "",
  "dance for others\n&\nnot just now",
  "", "",
  "we need to dance\nto be set free…",
  "",
  "so I hope a reason,\nsoon finds me",
  "", "",
  "try too hard\nbut something's wrong…",
  "",
  "so we sing instead\na happy song",
  "", "",
  "the moment's now\n&\nwe want to change…",
  "",
  "just don't know how\nto be the same",
  "", "",
  "should I dance\nor\nshould I sing",
  "", "",
  "it does not matter",
  "", "",
  "but it might for me",
  "",
];
