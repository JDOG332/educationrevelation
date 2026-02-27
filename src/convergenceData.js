/* ═══════════════════════════════════════════════════════════════
   THE CONVERGENCE LIST: 2 → 1
   99 proofs that everything is the same equation.
   33 TRIADS × 3 CARDS = three 3s.
   Each triad shares a deeper truth.
   Each card loops to the other 2 in its triad.
   
   Bookends (not in triads — they ARE the frame):
     #100: I + You = We
     #101: Two Pennies + One Thought = Truth
   ═══════════════════════════════════════════════════════════════ */

import { PHI } from "./data.js";

// The Alpha & Omega live in Triad 33 — THE SIGNAL
// #100: I + You = We
// #101: Two Pennies + One Thought = Truth

export const TRIADS = [

  // ═══ 1. CREATION ═══
  // The spark that starts a life
  { name: "CREATION", accent: "255,200,100", cards: [
    { id: 1,  a: "Father", b: "Mother", result: "Child", icon: "👶" },
    { id: 4,  a: "Sperm", b: "Egg", result: "Life", icon: "🧬" },
    { id: 12, a: "Male", b: "Female", result: "Offspring", icon: "🌱" },
  ]},

  // ═══ 2. THE HOLY ═══
  // Where opposites dissolve into grace
  { name: "THE HOLY", accent: "220,200,140", cards: [
    { id: 2,  a: "Father", b: "Son", result: "Holy Spirit", icon: "✝️" },
    { id: 42, a: "Yin", b: "Yang", result: "Tao", icon: "☯️" },
    { id: 91, a: "Justice", b: "Mercy", result: "Grace", icon: "⚖️" },
  ]},

  // ═══ 3. THE BIG BANG ═══
  // The universe writes its own equation
  { name: "THE BIG BANG", accent: "140,180,220", cards: [
    { id: 3,  a: "Matter", b: "Antimatter", result: "Energy", icon: "💥" },
    { id: 96, a: "Energy", b: "Mass", result: "E=mc²", icon: "⚛️" },
    { id: 97, a: "Space", b: "Time", result: "Spacetime", icon: "🌌" },
  ]},

  // ═══ 4. THE CLOCK ═══
  // Time is a circle not a line
  { name: "THE CLOCK", accent: "180,160,220", cards: [
    { id: 5,  a: "Past", b: "Future", result: "Now", icon: "⏳" },
    { id: 68, a: "Day", b: "Night", result: "Cycle", icon: "🔄" },
    { id: 27, a: "Birth", b: "Death", result: "A Life", icon: "🕯️" },
  ]},

  // ═══ 5. THE BREATH ═══
  // The rhythm that keeps everything alive
  { name: "THE BREATH", accent: "180,220,200", cards: [
    { id: 6,  a: "Inhale", b: "Exhale", result: "Breath", icon: "🌬️" },
    { id: 30, a: "Tension", b: "Release", result: "Rhythm", icon: "🫀" },
    { id: 18, a: "Sleep", b: "Wake", result: "Dream", icon: "💤" },
  ]},

  // ═══ 6. THE KNOWING ═══
  // How truth is found
  { name: "THE KNOWING", accent: "200,180,140", cards: [
    { id: 7,  a: "Question", b: "Answer", result: "Understanding", icon: "❓" },
    { id: 62, a: "Observation", b: "Hypothesis", result: "Science", icon: "🔬" },
    { id: 16, a: "Thesis", b: "Antithesis", result: "Synthesis", icon: "🔀" },
  ]},

  // ═══ 7. THE SHADOW ═══
  // Where light meets dark
  { name: "THE SHADOW", accent: "160,160,180", cards: [
    { id: 8,  a: "Light", b: "Dark", result: "Shadow", icon: "🌗" },
    { id: 9,  a: "Black", b: "White", result: "Gray", icon: "◐" },
    { id: 25, a: "Sun", b: "Moon", result: "Eclipse", icon: "🌑" },
  ]},

  // ═══ 8. THE CHARGE ═══
  // Opposites create flow
  { name: "THE CHARGE", accent: "255,220,100", cards: [
    { id: 10, a: "Positive", b: "Negative", result: "Current", icon: "⚡" },
    { id: 24, a: "Proton", b: "Electron", result: "Atom", icon: "⚛️" },
    { id: 94, a: "Voltage", b: "Resistance", result: "Current (Ohm)", icon: "🔌" },
  ]},

  // ═══ 9. THE FURNACE ═══
  // Fusion and combustion — the engine of stars and hands
  { name: "THE FURNACE", accent: "255,180,80", cards: [
    { id: 11, a: "Hydrogen", b: "Hydrogen", result: "Helium (star fire)", icon: "☀️" },
    { id: 40, a: "Spark", b: "Fuel", result: "Fire", icon: "🔥" },
    { id: 22, a: "Fire", b: "Water", result: "Steam / Power", icon: "♨️" },
  ]},

  // ═══ 10. THE WAVE ═══
  // Nothing is one thing — everything is both
  { name: "THE WAVE", accent: "160,200,255", cards: [
    { id: 13, a: "Wave", b: "Particle", result: "Quantum", icon: "〰️" },
    { id: 23, a: "North Pole", b: "South Pole", result: "Magnetism", icon: "🧲" },
    { id: 59, a: "Gravity", b: "Velocity", result: "Orbit", icon: "🪐" },
  ]},

  // ═══ 11. THE SONG ═══
  // Sound becomes meaning
  { name: "THE SONG", accent: "200,160,220", cards: [
    { id: 14, a: "Silence", b: "Sound", result: "Music", icon: "🎵" },
    { id: 44, a: "Melody", b: "Harmony", result: "Song", icon: "🎶" },
    { id: 64, a: "String", b: "Tension", result: "Note", icon: "🎸" },
  ]},

  // ═══ 12. THE EMERGENCE ═══
  // Order from chaos
  { name: "THE EMERGENCE", accent: "140,220,180", cards: [
    { id: 15, a: "Chaos", b: "Order", result: "Emergence", icon: "🦋" },
    { id: 21, a: "Seed", b: "Soil", result: "Growth", icon: "🌿" },
    { id: 67, a: "Root", b: "Rain", result: "Tree", icon: "🌳" },
  ]},

  // ═══ 13. THE MIND ═══
  // Consciousness is the merge
  { name: "THE MIND", accent: "220,200,160", cards: [
    { id: 17, a: "Left Brain", b: "Right Brain", result: "Consciousness", icon: "🧠" },
    { id: 85, a: "Memory", b: "Imagination", result: "Creativity", icon: "💡" },
    { id: 84, a: "Dream", b: "Action", result: "Manifestation", icon: "✨" },
  ]},

  // ═══ 14. THE HUNGER ═══
  // Need meets fulfillment
  { name: "THE HUNGER", accent: "200,180,120", cards: [
    { id: 19, a: "Hunger", b: "Food", result: "Satisfaction", icon: "🍞" },
    { id: 39, a: "Flour", b: "Water", result: "Dough / Bread", icon: "🫓" },
    { id: 74, a: "Grape", b: "Time", result: "Wine", icon: "🍷" },
  ]},

  // ═══ 15. THE CODE ═══
  // Binary is the seed of all machines
  { name: "THE CODE", accent: "100,220,200", cards: [
    { id: 20, a: "Zero", b: "One", result: "Binary / All computation", icon: "💻" },
    { id: 76, a: "Electron", b: "Hole", result: "Semiconductor / All tech", icon: "🔲" },
    { id: 77, a: "Code", b: "Machine", result: "Software", icon: "⌨️" },
  ]},

  // ═══ 16. THE HORIZON ═══
  // Where two infinities meet
  { name: "THE HORIZON", accent: "180,200,220", cards: [
    { id: 26, a: "Heaven", b: "Earth", result: "Horizon", icon: "🌅" },
    { id: 69, a: "Ice", b: "Heat", result: "Water", icon: "💧" },
    { id: 41, a: "Oxygen", b: "Carbon", result: "CO₂ / Life cycle", icon: "🌍" },
  ]},

  // ═══ 17. THE SCAR ═══
  // Pain becomes wisdom
  { name: "THE SCAR", accent: "200,160,160", cards: [
    { id: 28, a: "Pain", b: "Time", result: "Wisdom", icon: "🩹" },
    { id: 61, a: "Wound", b: "Healing", result: "Scar", icon: "⚔️" },
    { id: 88, a: "Grief", b: "Acceptance", result: "Peace", icon: "🕊️" },
  ]},

  // ═══ 18. THE COURAGE ═══
  // The alchemists of the heart
  { name: "THE COURAGE", accent: "220,180,140", cards: [
    { id: 29, a: "Fear", b: "Courage", result: "Bravery", icon: "🦁" },
    { id: 87, a: "Doubt", b: "Faith", result: "Conviction", icon: "🔥" },
    { id: 90, a: "Pride", b: "Humility", result: "Dignity", icon: "👑" },
  ]},

  // ═══ 19. THE CRAFT ═══
  // Hands make things whole
  { name: "THE CRAFT", accent: "180,160,140", cards: [
    { id: 31, a: "Warp", b: "Weft", result: "Fabric", icon: "🧵" },
    { id: 35, a: "Needle", b: "Thread", result: "Stitch", icon: "🪡" },
    { id: 63, a: "Brick", b: "Mortar", result: "Wall", icon: "🧱" },
  ]},

  // ═══ 20. THE KEY ═══
  // Access requires two halves
  { name: "THE KEY", accent: "200,200,160", cards: [
    { id: 32, a: "Lock", b: "Key", result: "Access", icon: "🔑" },
    { id: 57, a: "Promise", b: "Fulfillment", result: "Trust", icon: "🤞" },
    { id: 60, a: "Debt", b: "Payment", result: "Freedom", icon: "🔓" },
  ]},

  // ═══ 21. THE FORCE ═══
  // Impact requires collision
  { name: "THE FORCE", accent: "220,160,140", cards: [
    { id: 33, a: "Bow", b: "Arrow", result: "Force", icon: "🏹" },
    { id: 34, a: "Hammer", b: "Anvil", result: "Forge", icon: "🔨" },
    { id: 95, a: "Mass", b: "Acceleration", result: "Force (Newton)", icon: "🍎" },
  ]},

  // ═══ 22. THE STORY ═══
  // Cause creates meaning
  { name: "THE STORY", accent: "200,180,200", cards: [
    { id: 36, a: "Cause", b: "Effect", result: "Story", icon: "📖" },
    { id: 37, a: "Risk", b: "Reward", result: "Decision", icon: "🎲" },
    { id: 56, a: "Crime", b: "Punishment", result: "Justice", icon: "⚖️" },
  ]},

  // ═══ 23. THE NEUTRAL ═══
  // Opposites dissolve into calm
  { name: "THE NEUTRAL", accent: "180,200,180", cards: [
    { id: 38, a: "Acid", b: "Base", result: "Salt + Water", icon: "🧪" },
    { id: 75, a: "Milk", b: "Culture", result: "Cheese", icon: "🧀" },
    { id: 58, a: "Friction", b: "Motion", result: "Heat", icon: "🌡️" },
  ]},

  // ═══ 24. THE TONGUE ═══
  // The 5 senses — how 2 becomes 1 in the body
  { name: "THE TONGUE", accent: "200,180,160", cards: [
    { id: 46, a: "Eye", b: "Light", result: "Sight", icon: "👁️" },
    { id: 47, a: "Ear", b: "Vibration", result: "Hearing", icon: "👂" },
    { id: 48, a: "Skin", b: "Pressure", result: "Touch", icon: "✋" },
  ]},

  // ═══ 25. THE SCENT ═══
  // The remaining senses + their synthesis
  { name: "THE SCENT", accent: "180,200,160", cards: [
    { id: 49, a: "Tongue", b: "Molecule", result: "Taste", icon: "👅" },
    { id: 50, a: "Nose", b: "Vapor", result: "Smell", icon: "👃" },
    { id: 93, a: "Stimulus", b: "Response", result: "Behavior", icon: "🔔" },
  ]},

  // ═══ 26. THE BOND ═══
  // Love and learning — the deepest 2→1
  { name: "THE BOND", accent: "220,160,180", cards: [
    { id: 51, a: "Lover", b: "Beloved", result: "Love", icon: "❤️" },
    { id: 52, a: "Teacher", b: "Student", result: "Knowledge", icon: "📚" },
    { id: 66, a: "Speaker", b: "Listener", result: "Communication", icon: "🗣️" },
  ]},

  // ═══ 27. THE ECOSYSTEM ═══
  // Balance in the wild
  { name: "THE ECOSYSTEM", accent: "140,200,140", cards: [
    { id: 54, a: "Predator", b: "Prey", result: "Ecosystem", icon: "🐺" },
    { id: 55, a: "Supply", b: "Demand", result: "Price / Market", icon: "📈" },
    { id: 86, a: "Individual", b: "Individual", result: "Community", icon: "🏘️" },
  ]},

  // ═══ 28. THE WORD ═══
  // Language is convergence made audible
  { name: "THE WORD", accent: "200,200,180", cards: [
    { id: 43, a: "Word", b: "Meaning", result: "Language", icon: "📝" },
    { id: 81, a: "Verb", b: "Noun", result: "Sentence", icon: "✍️" },
    { id: 65, a: "Pen", b: "Paper", result: "Record", icon: "📜" },
  ]},

  // ═══ 29. THE CANVAS ═══
  // Art is the proof you can see
  { name: "THE CANVAS", accent: "200,160,200", cards: [
    { id: 45, a: "Brush", b: "Canvas", result: "Art", icon: "🎨" },
    { id: 78, a: "Camera", b: "Light", result: "Photograph", icon: "📷" },
    { id: 79, a: "Pigment", b: "Pigment", result: "New Color", icon: "🌈" },
  ]},

  // ═══ 30. THE DRUM ═══
  // The first music — the first convergence humans ever made
  { name: "THE DRUM", accent: "180,140,120", cards: [
    { id: 82, a: "Rhythm", b: "Poetry", result: "Rap", icon: "🎤" },
    { id: 83, a: "Drum", b: "Voice", result: "First Music", icon: "🥁" },
    { id: 89, a: "Solitude", b: "Connection", result: "Wholeness", icon: "🧘" },
  ]},

  // ═══ 31. THE FORGE ═══
  // Pressure makes permanence
  { name: "THE FORGE", accent: "160,180,200", cards: [
    { id: 70, a: "Pressure", b: "Time", result: "Diamond", icon: "💎" },
    { id: 71, a: "Sand", b: "Heat", result: "Glass", icon: "🪟" },
    { id: 72, a: "Copper", b: "Tin", result: "Bronze (first alloy)", icon: "🗡️" },
  ]},

  // ═══ 32. THE STEEL ═══
  // Harder alloys — civilization builds on convergence
  { name: "THE STEEL", accent: "180,180,200", cards: [
    { id: 73, a: "Iron", b: "Carbon", result: "Steel", icon: "⚙️" },
    { id: 92, a: "Knowledge", b: "Compassion", result: "Wisdom", icon: "🦉" },
    { id: 98, a: "Width", b: "Depth", result: "The Loop (your mirror)", icon: "🪞" },
  ]},

  // ═══ 33. THE SIGNAL ═══
  // The mirror loop — the theory itself
  { name: "THE SIGNAL", accent: "201,168,76", cards: [
    { id: 99,  a: "Signal", b: "Return", result: "Recognition", icon: "📡" },
    { id: 100, a: "I", b: "You", result: "We", icon: "🤝" },
    { id: 101, a: "Two Pennies", b: "One Thought", result: "Truth", icon: "🪙" },
  ]},

];

// Total cards: 33 × 3 = 99 unique pairs + the last triad contains #100 and #101
// The final triad IS the bookend — Signal/Return, I/You, Two Pennies/Truth

// Utility: find which triad a card belongs to
export const findTriad = (cardId) => TRIADS.find(t => t.cards.some(c => c.id === cardId));

// Utility: get sibling cards in the same triad
export const getSiblings = (cardId) => {
  const triad = findTriad(cardId);
  if (!triad) return [];
  return triad.cards.filter(c => c.id !== cardId);
};
