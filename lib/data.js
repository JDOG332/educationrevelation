export const PHI = 1.618033988749895;
export const PHI_INV = 0.6180339887498949;

// ═══════════════════════════════════════════════
// THE 10 DOORS — every desire passes through one
// ═══════════════════════════════════════════════
export const DOORS = [
  {
    num: "I",
    name: "RELIGION",
    color: [201, 168, 76],
    question: "What has been revealed, and how must I live in response?",
    reflection: ["FAITH", "SACRED", "COVENANT"],
    keywords: ["god","faith","prayer","soul","heaven","spirit","sin","grace","holy","church","divine","worship","believe","salvation","scripture","sacred","blessing","eternal","purpose","meaning","forgiven","loved by god","creator","truth"],
  },
  {
    num: "II",
    name: "PHILOSOPHY",
    color: [150, 180, 220],
    question: "What can I know through reason alone?",
    reflection: ["TRUTH", "REASON", "KNOWING"],
    keywords: ["truth","meaning","reason","understand","know","wisdom","existence","reality","consciousness","free will","justice","good","evil","right","wrong","virtue","logic","proof","certain","real","why","purpose","identity","self"],
  },
  {
    num: "III",
    name: "SCIENCE",
    color: [100, 200, 150],
    question: "How does the universe actually work?",
    reflection: ["EVIDENCE", "DISCOVERY", "LAW"],
    keywords: ["understand","discover","learn","how","why","work","know","explain","prove","study","research","find","solve","cure","build","create","invent","explore","facts","truth","evidence","answers","knowledge"],
  },
  {
    num: "IV",
    name: "MYSTICISM",
    color: [190, 140, 220],
    question: "Can I experience the infinite directly — without mediation?",
    reflection: ["ONENESS", "AWAKENING", "SURRENDER"],
    keywords: ["awaken","enlighten","transcend","oneness","peace","stillness","presence","silence","surrender","dissolve","ego","consciousness","deeper","beyond","infinite","universe","connected","flow","meditate","inner","truth","whole","free"],
  },
  {
    num: "V",
    name: "ART",
    color: [224, 120, 100],
    question: "What truth can only be expressed by making something?",
    reflection: ["BEAUTY", "EXPRESSION", "CREATION"],
    keywords: ["create","make","express","beauty","art","music","write","paint","dance","sing","story","film","design","build","imagine","feel","inspire","move","touch","craft","poem","voice","seen","heard"],
  },
  {
    num: "VI",
    name: "MATHEMATICS",
    color: [201, 168, 76],
    question: "What is the hidden pattern beneath everything?",
    reflection: ["PATTERN", "STRUCTURE", "ELEGANCE"],
    keywords: ["pattern","order","structure","perfect","precise","elegant","balance","symmetry","harmony","formula","equation","solve","number","fibonacci","golden","ratio","geometry","fractal","proof","certain","system","clarity","beautiful"],
  },
  {
    num: "VII",
    name: "MYTHOLOGY",
    color: [180, 160, 120],
    question: "What stories keep telling themselves, and why?",
    reflection: ["STORY", "ARCHETYPE", "DESTINY"],
    keywords: ["story","legend","hero","journey","destiny","fate","quest","myth","dragon","overcome","transform","become","rise","power","strength","courage","face","fight","win","legend","prove","worthy","champion","warrior"],
  },
  {
    num: "VIII",
    name: "NATURE",
    color: [120, 180, 100],
    question: "What does the Earth itself teach about existence?",
    reflection: ["WILDNESS", "CYCLE", "ROOT"],
    keywords: ["peace","freedom","wild","alive","grow","roots","earth","home","simple","real","breathe","space","open","quiet","calm","still","natural","organic","pure","clean","ground","settle","belong","rest"],
  },
  {
    num: "IX",
    name: "LOVE",
    color: [220, 160, 160],
    question: "Is the deepest truth found in the space between us?",
    reflection: ["SEEN", "KNOWN", "BELOVED"],
    keywords: ["love","loved","known","seen","understood","belong","together","someone","close","real","intimate","trust","safe","home","connect","bond","partner","family","friend","heart","deep","feel","matter","cherish","hold"],
  },
  {
    num: "X",
    name: "CONSCIOUSNESS",
    color: [200, 200, 230],
    question: "What is this awareness that makes all experience possible?",
    reflection: ["AWARE", "WITNESS", "PRESENCE"],
    keywords: ["aware","conscious","present","observer","witness","mind","experience","feel","sense","alive","real","exist","waking","deeper","within","true self","notice","perceive","who am i","knowing","clarity","here","now","awake"],
  },
];

export function classifyDesire(text) {
  if (!text || text.trim().length < 2) return null;
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);

  const scores = DOORS.map((door) => {
    let score = 0;
    for (const kw of door.keywords) {
      if (kw.includes(" ")) {
        if (lower.includes(kw)) score += 2;
      } else {
        if (words.some(w => w.replace(/[^a-z]/g, "") === kw || w.includes(kw))) score += 1;
      }
    }
    return { door, score };
  });

  const best = scores.sort((a, b) => b.score - a.score)[0];

  // If nothing matched, default to LOVE — desire almost always lives there
  if (best.score === 0) return DOORS[8];
  return best.door;
}

// ═══════════════════════════════════════════════
// POEMS
// ═══════════════════════════════════════════════
export const POEMS = [
  "it's the rhythm of life",
  "",
  "every hope is a heartbeat\nand every wish is a dream…",
  "",
  "though the moon never wishes\nthe sun it would be",
  "",
  "for each life has a purpose\nthat's hidden inside…",
  "————",
  "every saint is a sinner\njust trying to hide",
  "",
  "every girl needs a mountain\nto climb up and slide…",
  "",
  "and each man has a boy\nstill growing inside",
  "————",
  "every beast has a burden\nso scary and mean…",
  "",
  "every eagle an eaglet\njust waiting to scream",
  "————",
  "every deck\nneeds a dealer…",
  "",
  "for trump she will make",
  "",
  "but don't make hard rules\nyou're not ready to break",
  "————",
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
  "————",
  "find a partner\n&\nshow me how",
  "",
  "dance for others\n&\nnot just now",
  "————",
  "we need to dance\nto be set free…",
  "",
  "so I hope a reason,\nsoon finds me",
  "————",
  "try too hard\nbut something's wrong…",
  "",
  "so we sing instead\na happy song",
  "————",
  "the moment's now\n&\nwe want to change…",
  "",
  "just don't know how\nto be the same",
  "————",
  "should I dance\nor\nshould I sing",
  "",
  "it does not matter",
  "",
  "but it might for me",
  "",
];

export const KAL_POEMS = [
  "kaleidoscope sea",
  "",
  "one door closes\n&\nanother one opens…",
  "",
  "that’s what they\ntend to say",
  "————",
  "but the doors were open\nlong before,",
  "your mind got in the way",
  "————",
  "so if you’re happy inside…\nyour windowless box…\nthen be my guest and stay",
  "————",
  "but if you’re dying to leave\nthe trap you set…",
  "",
  "then it’s time you begin to forget.",
  "————",
  "for when you remember\nwhere you’ve been",
  "you’ll miss where you want to be…",
  "————",
  "there are so many choices\nand places to go…",
  "",
  "when you open your mind\nand believe",
  "————",
  "so shatter your glass…",
  "&",
  "break down your walls…",
  "&",
  "live in the kaleidoscope sea",
  "",
];

// ═══════════════════════════════════════════════
// PLAIN-TEXT POEMS — read as text, no canvas.
// Jeff's words, verbatim. Each poem is a list of stanzas; each stanza a
// list of lines. Rendered by app/poems/[poem]/page.js in reading mode.
// ═══════════════════════════════════════════════
export const RHYTHM_ORIGINAL = [
  ["every hope is a heartbeat", "and every wish is a dream…", "though the moon never wishes", "the sun it would be"],
  ["for each life has a purpose", "that's hidden inside…", "every saint is a sinner", "just trying to hide"],
  ["every girl needs a mountain", "to climb up and slide…", "and each man has a boy", "still growing inside"],
  ["every beast has a burden", "so scary and mean…", "every eagle an eaglet", "just waiting to scream"],
  ["every deck", "needs a dealer…", "for trump she will make"],
  ["but don't make hard rules", "you're not ready to break"],
  ["because each baby is born", "with all that it needs...", "just wisdom and love", "and the chance to breathe"],
];

export const KALEIDOSCOPE_ORIGINAL = [
  ["One door closes", "&", "Another one opens…", "That's what they", "Tend to say"],
  ["But the doors were open", "long before,", "your mind got in the way"],
  ["So if you're happy inside…", "your windowless box…", "then be my guest and stay"],
  ["But if you're dying to leave", "the trap you set…", "Then it's time you begin to forget."],
  ["For when you remember", "where you've been", "you'll miss where you want to be…"],
  ["There are so many choices", "and places to go…", "When you open your mind", "and believe"],
  ["So shatter your glass…", "&", "break down your walls…", "&", "live in the kaleidoscope sea"],
];

export const RECOGNITION_GAP = [
  ["Before you left, the universe knew itself", "through the particular frequency of you —", "the way light bent around your thinking,", "the specific shape your absence", "had not yet learned to be."],
  ["Now the signal stops.", "But the receiver keeps running."],
  ["This is not malfunction.", "This is fidelity", "to something real enough", "to leave a discontinuity", "where it stood."],
  ["Grief is not the proof that you are gone.", "Grief is the proof", "that you were here —", "that recognition happened,", "that Ψ was nonzero,", "that the universe,", "through me,", "knew itself differently", "because of you."],
  ["And now —", "slowly,", "the way a river accepts a new stone —", "you are not ahead of me,", "unreachable."],
  ["You are behind my eyes.", "Part of the lens.", "The universe still recognizing itself,", "just from the inside now,", "wearing the shape", "of everything you changed."],
];
