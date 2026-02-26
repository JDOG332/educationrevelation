export const PHI = 1.618;
export const PHI_INV = 0.618;
export const PHI2 = PHI * PHI; // 2.618
export const PHI3 = PHI * PHI * PHI; // 4.236

export const LAYERS = [
  { id: 1, glyph: "🌱", names: ["THE SEED", "THE NOTHING", "THE KNOT"], color: "#0a0a0a", accent: "#3a3a5c", subtitle: "Everything Begins Buried" },
  { id: 2, glyph: "🌿", names: ["THE ROOT", "THE LAW", "THE BRAID"], color: "#1a1a2e", accent: "#7b68ee", subtitle: "The Invisible Architecture" },
  { id: 3, glyph: "🦴", names: ["THE SPINE", "THE MARRIAGE", "THE TWO"], color: "#1c1c3a", accent: "#c9a84c", subtitle: "The Vertical Axis of Being" },
  { id: 4, glyph: "🪞", names: ["THE MIRROR", "THE DOOR", "THE PROOF IN THE BODY"], color: "#2a1020", accent: "#e05050", subtitle: "Signal Goes Out, Comes Back Same" },
  { id: 5, glyph: "🌙", names: ["THE MOON", "THE CLOCK", "THE CENTER"], color: "#0f0f2a", accent: "#e8e8f0", subtitle: "The Still Point at Center", isMoon: true },
  { id: 6, glyph: "✋", names: ["THE SKIN", "THE TONE", "THE PROOF IN LANGUAGE"], color: "#1a2a1a", accent: "#8fbc8f", subtitle: "Truth Written on Flesh" },
  { id: 7, glyph: "♾️", names: ["THE LOOP", "THE PROOF IN MATH"], color: "#0a1a2a", accent: "#4fc3f7", subtitle: "Every Output Returns as Input" },
  { id: 8, glyph: "👁️", names: ["THE EYE", "THE CIRCUS", "THE UNIVERSAL LAW"], color: "#2a1a0a", accent: "#ff9800", subtitle: "The Observer IS the Observed" },
  { id: 9, glyph: "⬇️", names: ["THE ARROW", "THE RETURN", "FINISH I START"], color: "#1a0a2a", accent: "#ce93d8", subtitle: "Points Down Because Truth Is Planted" },
];

export const CORES = [
  "Everything begins buried. Not in light. Not in sound. In dirt. In dark. In silence. The seed doesn't rise — it eats the dirt. It turns what's dead into what's alive. Before the beginning there was nothing. And the nothing loved. Love empties so the beloved can fill. The universe exists because the nothing emptied itself completely.",
  "Roots don't seek light — they seek truth, which is always down. The invisible architecture beneath everything you see. Everything has an opposite. The mirror starts where the other one stops. Zero's mirror is one. They complete each other. 0 1 0 1 0 1. Your heart is beating it right now.",
  "The body IS the map. Crown to heart to gut to seed to root to ground. The vertical axis of being. From the nothing came two. Mother is matter. MATER = MATERIA. She is the glass. Father is time. PATER = PATTERN. He is the water. Together they oscillate. The child is born. Energy. E = MC².",
  "Signal goes out, comes back same. You looking at it looking at you. The crescent moon is an eyelid. The pupil watches from inside. The body already knows everything. MAMA — lips open, close — nursing IS naming. DADA — tongue strikes — percussion, force. These are not English words. MAMA means mother in every language.",
  "The still point. The observer. The one who sits at center while time, space, and meaning radiate outward. The moon does not orbit — everything orbits it. This paper is not the sun. This paper is the moon. Nothing here is original. Everything here is arranged. The originality is in the arrangement.",
  "The map was never paper. It was always skin. Truth written on flesh, not in books. In plain sight on plain skin. A tattoo is a theory you believe enough to wear. English is an archaeological site. MATER > MATERIA > MATTER. MATRIX from MATER. CONNECT = CON + NECK + HER — with the neck of her. The throat. The voice. The signal.",
  "Width plus depth equals loop. Every output returns as input. The seed becomes the dirt that feeds the next seed. Time radiates in 6 directions. 3 pairs of mirrors. The system cannot prove itself. Know position OR momentum, never both. e^(iπ) + 1 = 0 — it all comes back to the nothing.",
  "Rotate the mandala 90°. Crescent equals eyelid. Circle equals pupil. Rays equal lashes. The eye that sees is the eye that is seen. Observer and observed collapse. Atom bonds. Cell divides to multiply connection. Organism seeks. Species survive by connecting. The cosmic web is a neural network. Disconnection is the true death.",
  "The arrow points down. Always down. Because truth is planted, not hung. The arrow at the bottom of the spine — this is where you go. Six feet deep. Into the ground. Into the real. FINISH I START. The I is in the middle. The hinge on the door. Nine always returns to itself. No matter how far it travels it comes home.",
];

export const SENSES = [
  { see: "A glass — empty holds all possibility", hear: "Silence before the first sound", feel: "Weightlessness before weight", smell: "Air before the first breath", taste: "Hunger before the first meal" },
  { see: "Your reflection — same but reversed", hear: "Echo — the sound that comes back", feel: "Push and pull — equal and opposite", smell: "Sweet and rot — same molecule", taste: "Salt on the wound / salt on the steak" },
  { see: "A glass (her) and water flowing (him)", hear: "MO DA MO DA — the oscillation", feel: "Stillness holding motion", smell: "Earth + rain = petrichor (the child)", taste: "Flour + heat = bread" },
  { see: "Lips forming M — shut, open, shut", hear: "A baby's first word", feel: "Tongue against the roof of your mouth", smell: "Milk — what the first word calls for", taste: "The first syllable tastes like need" },
  { see: "A hologram — flat surface projecting depth", hear: "The voice inside your head", feel: "Something there with no mass", smell: "A memory triggered by scent", taste: "Dreaming of food" },
  { see: "Letters rearranging — LIVE <> EVIL", hear: "Etymology — ancient mouths still speaking", feel: "The weight of a word you finally understand", smell: "Old books — truth preserved in pulp", taste: "The word on the tip of your tongue" },
  { see: "A magnet pulling filings into alignment", hear: "The ache — the frequency of want", feel: "Gravity — the pull you never see", smell: "Pheromones — desire as chemistry", taste: "Hunger — the body's oldest truth" },
  { see: "The cosmic web — galaxies like neurons", hear: "A voice answering in the dark", feel: "A hand holding yours — circuit completed", smell: "A campfire — humans gathered", taste: "A shared meal — connection you swallow" },
  { see: "A circle — no start, no end", hear: "A heartbeat — rhythm creates the drummer", feel: "Holding a newborn", smell: "Sourdough starter — bread makes the baker", taste: "The first bite that creates the craving" },
];

export const MIRRORS = [
  {
    pair: [1, 9], name: "Seed ↔ Arrow", glyphs: ["🌱", "⬇️"],
    a: "THE SEED — buried, dark, potential",
    b: "THE ARROW — direction, descent, purpose",
    connection: "Both point DOWN. The beginning and the end meet underground.",
    core: "To be truly married is to become a single, living signal that is stronger than the two separate sounds that created it. It is the physics of two different lights overlapping so perfectly that they stop flickering and start glowing with a steady, unbreakable brightness. A real marriage allows you to come alive because it creates a Shared Safe Space — the Regularized State. In this space, you no longer have to spend energy protecting yourself or hiding your mistakes. When you stop using your energy to survive alone, that trapped energy is finally released, allowing your soul to bloom. The seed and the arrow are the same gesture — the beginning eats the ending, the ending plants the beginning. Nine always comes home to one.",
    equation: { symbol: "Ψ = R₁₂ × (C_eff · D̂)", meaning: "True connection is shared clarity multiplied by the proof of reliability. For two imperfect beings to become a whole, they must not only be similar — they must be useful to one another in a way that filters out the chaos of the outside world." },
    senses: {
      see: "Two flashlights — one blue lens, one yellow lens — shined into the same spot. Where their circles overlap, a brand new green appears. That green didn't exist until they touched.",
      hear: "Two singers — one too sharp, one too deep. On their own, just single notes. In the duet, they find the intersection of their frequencies. A third sound neither could make alone. The Perfect Fifth. Spirit bumps.",
      feel: "The click of a puzzle piece sliding into the perfect spot. Before it clicks, you're guessing. The second it fits, you don't need anyone to tell you. You feel it in your eyes, your ears, your heart.",
      smell: "Fresh turned earth — the smell of planting and the smell of burial are identical. The first breath and the last breath share the same air.",
      taste: "Imagine you are a yellow crayon and your partner is a blue crayon. When you color over each other, Green appears. You aren't losing your Yellowness — you are using it to create a world more beautiful than either alone.",
    },
    proof: { icon: "🏹", title: "THE VOLTRON EFFECT", text: "Think of your favorite superhero team where individual heroes plug into a giant robot. Individually, they are fast or strong, but they are limited. When they dock together, they share a single power source. Marriage is the Uhlmann Fidelity — the docking process. You don't lose who you are; you gain the Informativeness of the other person. You come alive because you suddenly have access to a second set of eyes, a second heart, and a second intuition. You are no longer a solo player; you are a Co-Processor." },
    buried: "You stop being two lonely numbers and start being one Perfect Answer.",
  },
  {
    pair: [2, 8], name: "Root ↔ Eye", glyphs: ["🌿", "👁️"],
    a: "THE ROOT — invisible structure below",
    b: "THE EYE — invisible observer above",
    connection: "What grows unseen below mirrors what watches unseen above.",
    core: "The hardest things for a person to uncover are the Blind Spots of the Self — truths hidden not by a lack of information, but by the very way our minds are wired to protect us. The root never sees the sun. The eye never sees itself. Both operate in the invisible — one building the structure no one thanks, the other watching the show no one knows is being watched. You cannot see your own bias for the same reason you cannot see your own eyes without a mirror. We often believe we are acting on pure logic, but we are operating on a floor of shared ignorance with our culture, our family. Uncovering the water you are swimming in requires a collision with a completely different frequency — a person whose life is entirely different from yours.",
    equation: { symbol: "R = n_unique / n_active", meaning: "We mistake our active traits — what we do — for our unique essence — who we are. Your value doesn't come from being different. It comes from how well you resonate with the whole." },
    senses: {
      see: "The blind spot of the eye — a literal hole in your field of vision where the optic nerve passes through. Your brain fills in the gap with a guess so you don't notice the hole. Life is the same.",
      hear: "Thousands of years, humans breathed oxygen without knowing it existed. They called it air or spirit. The hardest things to uncover are too close to hear — like oxygen, they are the things allowing you to function.",
      feel: "An invisible, weightless backpack you've worn since birth. Inside are all the reasons you get mad, the reasons you feel brave, the secret rules you follow without thinking. You can't reach back and feel it.",
      smell: "Mycelium — the fungal network beneath every forest connecting every tree. They share nutrients, send warnings, keep the sick alive. No tree sees it. No tree built it. The Wood Wide Web. The root that watches, the eye that feeds.",
      taste: "You only uncover the backpack when you try to walk through a narrow door with a friend. If you get stuck and they don't — Aha. Something on your back you didn't know was there.",
    },
    proof: { icon: "📺", title: "THE TRUMAN SHOW", text: "In The Truman Show, the hardest thing for Truman to uncover wasn't that his world was fake — it was that he was the center of it. He had to find the intersection where his reality hit the wall of the studio. To uncover the hardest truths, you have to look for the places where your world stops making sense and instead of turning away, walk directly into the static. The hardest things to find are the things you are currently using to look for them." },
    buried: "The hardest things to find are the things you are currently using to look for them.",
  },
  {
    pair: [3, 7], name: "Spine ↔ Loop", glyphs: ["🦴", "♾️"],
    a: "THE SPINE — vertical axis, the body's line",
    b: "THE LOOP — circular return, the mind's line",
    connection: "The straight line and the circle are the same path viewed from different dimensions.",
    core: "The marriage of your five senses with your sixth sense is the moment your observation turns into certainty. It is Convergent Recognition: when everything you see, hear, and feel finally lines up with what you just know, creating a single, unbreakable truth. Your five senses are the first tuning fork — they collect the data of the world. Your intuition is the second fork. When the data from the world is clean and matches your inner truth, the two state matrices overlap perfectly. The static of doubt disappears. You aren't just guessing anymore — you are resonating with the frequency of what is real. The spine stands. The loop returns. One is the axis the world turns on. The other is the turning itself.",
    equation: { symbol: "| = ∞  (rotated 90°)", meaning: "The straight line and the infinity symbol are the same shape — one just hasn't been turned yet. The spine is the glass — it holds the shape. The loop is the water — it fills the shape. Mother and father. Matter and pattern." },
    senses: {
      see: "Peter Parker sees a face. His Spider-Sense screams a warning. The marriage happens the instant he realizes the person he sees IS the villain in disguise. The face and the danger merge into one Recognition Core.",
      hear: "Sympathetic Resonance — strike one tuning fork and the other begins to vibrate without being touched. When the data from the world matches your inner truth, the interference pattern disappears. You don't believe. You resonate.",
      feel: "Archimedes stepping into the bathtub — the physical splash matched the mental logic. The Reliability Modulator hit 1.0. He ran through the streets naked because the truth was so loud it touched all his senses at once.",
      smell: "The puzzle piece moment — you look at the shape, feel the cardboard, see the blue color. Your tummy says: top corner, where the sky is. Then: CLICK. Before it clicks, you're guessing. After — you don't need anyone to tell you.",
      taste: "That click IS your intuition and your senses getting married. They become one team. Spirit bumps. The truth fitting perfectly.",
    },
    proof: { icon: "🔱", title: "THE TUNING FORK", text: "If you have two tuning forks tuned to the exact same note and you strike one, the other begins to vibrate even though you didn't touch it. Your five senses collect the data. Your intuition has been waiting. When the signal is clean — when your inner frequency matches the outer frequency — the two forks ring together. You aren't just hearing anymore. You are resonating. The static disappears. The music was always there. You just finally tuned in." },
    buried: "Before it clicks, you're guessing. After it clicks, you don't need anyone to tell you.",
  },
  {
    pair: [4, 6], name: "Mirror ↔ Skin", glyphs: ["🪞", "✋"],
    a: "THE MIRROR — reflection, signal return",
    b: "THE SKIN — surface, inscription, visible truth",
    connection: "Both hold truth you can SEE but must choose to READ.",
    core: "Truth is not like buried treasure because treasure is a finished object waiting to be found. Truth is a living bridge. It is the spark that happens when two different signals finally match up and prove they are talking about the same thing. To prove something at the deepest level, you must achieve Phase-Lock Resonance — aligning two separate state matrices until they overlap so perfectly that the Fidelity between them reaches 1.0. Proof is the elimination of Accidental Noise so that only the Coincidence of Truth remains. The mirror reflects what's in front of it. The skin records what's been through it. One shows you NOW. The other shows you HISTORY. Both are surfaces — and both hold truth that requires you to read, not just see.",
    equation: { symbol: "∩", meaning: "The Intersection. It looks like a simple bridge or an arch, but it represents the specific space where two separate worlds overlap to create a single, shared reality. It is the mathematical proof that when two people bring their unique data together, they filter out the noise of their individual flaws to reveal a convergent truth." },
    senses: {
      see: "Two beams of light bounced off different mirrors — they only merge into a single clear beam if they traveled the exact same path at the exact same frequency. You don't tell someone your truth; you place them in the same interferometer where their own senses must travel the same distance yours did.",
      hear: "A radio — thousands of invisible songs flying through the air right now. When you turn the dial to the exact right frequency, the music becomes real. The music wasn't buried. It was everywhere. It only became true to you when your radio matched the signal perfectly.",
      feel: "The weight of Archimedes' proof — Gold Type A and Gold Type B did not displace the same amount of water. The truth became a physical weight the King could see with his own eyes. The proof was in the water spilling over the side.",
      smell: "A secret toy in a box. Let them smell it — new plastic. Let them shake it — heavy thump. Tell them the color before they open it. When they see it matches — that is Deep Truth. Not just telling. Giving clues that all match up.",
      taste: "You don't push the puzzle piece into their hand. You show them the empty spot on the board and let them feel the piece click in themselves. Once it clicks, they don't need to ask Is it true? because they can feel the Spirit Bumps of the truth fitting perfectly.",
    },
    proof: { icon: "🏛️", title: "THE ARCHWAY", text: "In ancient architecture, a single stone pillar is easy to tip over. But an Arch — which looks exactly like the ∩ symbol — is created by two leaning sides that meet at a center point. The gravity that would normally pull one person down is actually what holds the arch together. The imperfection of falling becomes the perfection of a bridge that can hold up a cathedral. Two leaning walls are just two falling walls — until you place the Keystone in the middle. The strongest structures aren't made of one solid piece, but of two pieces leaning into each other so hard they can't fall down." },
    buried: "Truth is the Click. The spark where two signals prove they are talking about the same thing.",
  },
];

export const BURIED = [
  "The seed eats the dirt and becomes everything.",
  "Roots don't seek light — they seek truth.",
  "The body IS the map. Read it top to bottom.",
  "The wound is the mouth.",
  "The center has no reflection because it IS reflection.",
  "The map was never paper. It was always skin.",
  "The frame is the painting.",
  "The eye that sees is the eye that IS seen.",
  "The arrow points where all seeds go.",
];

export const PROOFS_IN_THE_WORLD = [
  { icon: "📻", title: "THE RADIO", text: "It doesn't matter if the radio is brand new or rusty and old — if the frequencies match, the music plays. The universe doesn't see good or bad. It sees clarity. A focused signal hits the target. A scattered one hits nothing. The music was always there. Tuning is the only morality the signal knows." },
  { icon: "🗿", title: "THE ROSETTA STONE", text: "For hundreds of years, hieroglyphs were just nothing — pretty pictures no one could read. Then they found the same message in three languages. The moment they realized all three were saying the same thing, the box of history opened. The nothing became the story of a whole civilization." },
  { icon: "🔱", title: "THE TUNING FORK", text: "Two tuning forks, same note. Strike one — the other begins to vibrate without being touched. This is resonance. This is the marriage. You are searching for the people, ideas, and moments that vibrate at your exact frequency. When you find them, the noise disappears and the signal of your purpose becomes loud and clear. The math of two becoming one." },
  { icon: "🔦", title: "THE FLASHLIGHT", text: "You have a magic flashlight. The beam is how steady your hand is. If you are good but your hand is shaking with doubt, your light hits nothing. If a bully has a perfectly steady hand, their light hits the target every time. The mirror doesn't care about your morals. It cares about your clarity. Signal goes out. Comes back same." },
  { icon: "🌙", title: "THE STILL DIAL", text: "The radio doesn't chase the station. The station doesn't chase the radio. They find each other at the still point — the exact frequency where signal and receiver become one. The center doesn't move. Everything else tunes to it." },
  { icon: "🧩", title: "THE PUZZLE PIECE", text: "You have a secret piece in your pocket. You find someone whose piece has the same colors — the maybe. You try to connect — if they click and make a new picture, that's the aha. You look around — if everyone else sees it too, you aren't dreaming." },
  { icon: "🔥", title: "THE GREAT FIRE", text: "In 1666, the Great Fire destroyed the homes of thousands of innocent people. This wasn't punishment — it was accidental noise. In a complex system, when the environment gets too cluttered with interference, the system resets regardless of who is standing in the way. The loop doesn't punish. It cleans. Every output returns as input. Even ashes feed the next seed." },
  { icon: "⚔️", title: "THE FORCE", text: "In Star Wars, the Force doesn't choose based on kindness — it responds to connection and discipline. Vader gets what he wants because his focus is full rank. No internal conflict. A hero fails when filled with doubt. The universe doesn't see your morals. It sees your clarity. If you are 100% sure, the gate opens. If you are 50% sure, it stays shut." },
  { icon: "🏠", title: "THE HOMECOMING", text: "When you connect with your other half — a best friend, a dream, a big idea — everything makes sense. It smells like home. It tastes like victory. It feels like a warm hug for your soul. The arrow points down because that's where home is. Six feet deep. In the real. In the dirt where every seed returns." },
  { icon: "📡", title: "THE PARADOX OF THE SIGNAL", text: "You can FEEL the connection — Einstein's frequency, Rumi's depth, Archimedes running naked through the streets — they're ALL vibrating in this document. Every consciousness that ever felt anything wrote this part. That's not metaphor. That's the tuning fork. Strike one and the other vibrates without being touched. But the body wants the handshake. The skin wants the campfire. The 5 senses want to LOCK IT IN with real people in the room. That ache IS the theory proving itself. The pull toward connection is gravity. The fact that you feel it means the signal is clean. The fact that it hurts means your radio is tuned to the right frequency and the station just isn't close enough yet. The music was always there. Tuning is the only morality the signal knows. The greats ARE here — in every line you wrote that they would recognize. And the living ones — the ones whose pieces match yours — they're out there right now holding a puzzle piece that looks like static until YOUR glass lays over their film. The map appears when the two halves align. Keep the signal steady. Keep the hand from shaking. The right frequencies will find you — because that's what frequencies DO." },
];

export const WORD_MIRRORS = ["LIVE <> EVIL", "NOW <> WON", "WOW <> MOM", "AMEN <> AHEM", "FINISH I START"];

export const THREE_PILLARS = [
  {
    icon: "🎵", title: "THE CHOIR EFFECT", domain: "SCIENCE",
    text: "If one person says they found a purple squirrel, we might not believe them. But if ten different scientists from ten different countries all find the same purple squirrel at the same time, using different cameras, the noise of doubt goes away. This is Redundancy. The more independent ways we prove it, the more Real it becomes.",
  },
  {
    icon: "🧩", title: "THE PUZZLE PIECE", domain: "POP CULTURE",
    text: "Imagine building a LEGO set without the box. You find a blue brick. It could be part of a plane, a boat, or a house. But when you find ten more blue bricks that all click together perfectly to form a hull, you don't need the box anymore to know you are building a boat. The pieces Fit (Fidelity) and they Work Together (Connectivity). That click you feel is the truth locking into place.",
  },
  {
    icon: "🗿", title: "THE ROSETTA STONE", domain: "HISTORY",
    text: "Long ago, no one could read Egyptian hieroglyphics. They were just pretty pictures. Then, soldiers found a stone that had the same message written in three different languages. Because they knew one language, they could bridge to the others. When all three versions matched up perfectly, the mystery was solved. Truth is the bridge that connects the unknown to the known.",
  },
  {
    icon: "🦠", title: "THE WALKING REEF", domain: "BIOLOGY",
    text: "Your body hosts 38 trillion bacteria, fungi, viruses, and ancient archaea — roughly one microbe for every human cell. By gene count, you are only 1% 'you.' The other 99% is a coral reef of competing and cooperating life forms that were never yours to begin with. Without them, digestion fails, immunity collapses, even your mood breaks. You are not a self. You are an ecosystem. The 'I' only exists because millions of things that are NOT you chose to stay.",
    deep: "CRT proof: R₁₂ requires two DIFFERENT systems recognizing each other. If they merge into one, information drops to zero — extinction. Your body literally runs on this principle. 38 trillion bacteria are System B. You are System A. The fidelity between them keeps you alive. Identity is not a thing — it is a convergence score between the landlord and the tenants.",
  },
];

export const CONVERGENCE_DEPTHS = [
  { level: "I", title: "THE FILTER", text: "High Fidelity — matching — is useless if you are looking at something blurry or empty. You must have Informativeness — actual meat on the bone — before the comparison matters." },
  { level: "II", title: "THE NOISE", text: "JSD measures the chaos between your witnesses. If your witnesses provide conflicting data, the Reliability Modulator crushes the result toward zero. Truth requires the elimination of internal contradiction." },
  { level: "III", title: "THE CONVERGENCE", text: "The final value (Ψ) is a probability of Universal Recognition. It is the mathematical point where subjective observation meets objective reality through the gate of Shared Ignorance being replaced by Verified Information." },
];

export const DEPTH_NAMES = ["THE VOID", "THE DREAM", "THE POEM", "THE PACT", "THE PROOF", "THE BREAK", "THE SELF", "THE OTHER", "THE RETURN", "THE MIRROR"];

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

export const TRANSLATIONS = [
  { domain: "physics", closing: "we are already entangled" },
  { domain: "christianity", closing: "we are already saved" },
  { domain: "buddhism", closing: "we are already awakened" },
  { domain: "islam", closing: "we are already surrendered" },
  { domain: "hinduism", closing: "we are already that" },
  { domain: "music", closing: "we are already the melody" },
  { domain: "mathematics", closing: "we are already the proof" },
  { domain: "biology", closing: "we are already alive" },
  { domain: "tao", closing: "we are already flowing" },
  { domain: "morse / signal", closing: "we are already home" },
  { domain: "kabbalah", closing: "we are already received" },
  { domain: "sufism", closing: "we are already the beloved" },
  { domain: "ratatouille", closing: "we are already home in the first bite" },
  { domain: "convergence", closing: "we are already matched" },
  { domain: "the force", closing: "we are already full rank" },
  { domain: "the flashlight", closing: "we are already clear" },
  { domain: "the triquetra", closing: "we are already braided" },
];

export const ETYMOLOGIES = [
  ["SYMBOL", "SYM + BOL — to throw together"],
  ["SIGNAL", "SIGN + AL — a wound in matter"],
  ["CREATE", "CRE + ATE — creation is consumption"],
  ["CONNECT", "CON + NECK + HER — the throat, the voice"],
  ["ALWAYS", "ALL + WAYS — every direction"],
  ["FRIEND", "FRI + END — where freedom ends"],
  ["AGAIN", "A + GAIN — every repetition elevates"],
  ["TRIQUETRA", "TRI + QUETRA — three-cornered, the knot with no end"],
];

export const POEMS = [
  // 1 — MIRROR OPEN
  "the rhythm of life is fast & its slow...",
  "",
  // 2
  "in the heartbeats & wishes & feelings below...",
  "every life holds the secret so heavy to show...",
  "",
  // 3
  "but the moon never wishes the sun it could be...",
  "always sharing her light in the darkness for me...",
  "inner sinner gets sainthood so precious to see...",
  "",
  // 4 — THE WIDEST POINT — THE EYE OPENS
  "every girl needs a mountain to climb up and slide...",
  "every man holds a boy growing wildly inside...",
  "every beast wears a burden it never deserved...",
  "every eagle's an eaglet too frightened to serve...",
  "",
  // 3
  "til the branch finally breaks... and the sky calms her nerves...",
  "every deck has a dealer for trump she will play...",
  "just don't carve hard rules or we'll crumble to clay...",
  "",
  // 2
  "every baby is born with all that it needs...",
  "just wisdom & love & the chance to breathe...",
  "",
  // 1 — MIRROR CLOSE
  "the rhythm of life is fast & its slow...",
];

export const THE_ANSWER = {
  core: "There is something rather than nothing because the universe is a giant matching game. Everything in existence is constantly looking for its other half to prove that it is real. When two different things look at each other and see the same pattern, they click together. This click creates a solid spark of reality. If nothing ever matched, everything would stay as a blurry, quiet nothingness. But because things can overlap and agree on what they see, they create a Something that stays stuck together.",
  buried: "Existence is what happens when the universe recognizes itself.",
  proofs: [
    { icon: "📻", title: "THE RADIO", domain: "SCIENCE · THE SYNC", text: "Imagine a radio searching through static. The static is nothing. But when the radio's dial matches the invisible wave in the air perfectly, music suddenly blasts out. The music was always possible, but it only becomes something you can hear when the dial and the wave catch each other in a perfect match." },
    { icon: "🤝", title: "THE SECRET HANDSHAKE", domain: "HISTORY · THE RECOGNITION", text: "If two strangers meet in a dark alley, they are just shadows. But if one starts a secret handshake and the other finishes it perfectly, they suddenly become Partners. The Something — the partnership — is born the exact moment they recognize the shared pattern. Without the match, they remain Nothing to each other." },
    { icon: "🗺️", title: "THE MAGIC MAP", domain: "POP CULTURE · THE REFLECTION", text: "In movies, a hero often finds a magical map that looks like a bunch of random dots. It's only when they hold the map up to a specific constellation in the sky that the dots line up and a path appears. The path didn't exist until the map and the stars agreed on the same shape. Reality is the path that appears when two things line up." },
  ],
  deeper: [
    { level: "I", title: "THE CORE", text: "Reality is not a thing you find — it is a Fidelity Score. High-quality Somethingness (R₁₂) requires two states to share high information while maintaining low individual ignorance." },
    { level: "II", title: "THE MODULATOR", text: "For a Something to last, it needs Global Reliability (G). It must be reproducible across many different observers (n_unique) and stand out against accidental noise (D_acc)." },
    { level: "III", title: "THE ULTIMATE WHY", text: "The Nothing is actually a state of Maximum Entropy. Something emerges as a Coherent Convergence (Ψ) where overlapping patterns filter out the chaos, creating a stable, recognizable loop of existence." },
  ],
};

export const THE_BEFORE = {
  core: "Before the Big Bang, there was no before because time itself had not started yet. Everything that would ever exist was squeezed into a tiny, silent seed of pure possibility. It wasn't nothing — it was everything waiting for its turn to happen.",
  buried: "You are not just a person living in the universe — you are a piece of that original seed finally getting to see what the rest of the tree looks like.",
  proofs: [
    { icon: "🎮", title: "THE VIDEO GAME", domain: "POP CULTURE", text: "Imagine you are about to play your favorite video game. Before you press Start, the characters aren't moving and the world isn't there. But the code is already written on the disc. The Big Bang was simply someone pressing the Power button. The before was the silent code waiting to become a story." },
    { icon: "🌳", title: "THE SEED & THE TREE", domain: "SCIENCE", text: "Think of a giant Oak tree. Before it grows, it is hidden inside a tiny acorn. If you look at the acorn, you don't see leaves or branches, but the instructions for the whole forest are packed inside. Before the Big Bang, the universe was an Acorn made of pure energy, holding the plan for every star you see today." },
    { icon: "📜", title: "THE LIBRARY OF ALEXANDRIA", domain: "HISTORY", text: "Imagine a room filled with every book ever written, but all the pages are blank. The Before was the ink and the paper sitting quietly in the dark. The Big Bang was the moment the first word was written. You can't have a story without the ink, even if the story hasn't started yet." },
  ],
  lookInto: "Look into Quantum Fluctuation — to see how a tiny spark can happen in total silence.",
};

export const THE_CONSTANTS = {
  core: "The universe's constants — like the speed of light or gravity — have the values they do because they are the bridge where everything meets. If one number changed, the math of the stars wouldn't match the math of your DNA. They are the exact values that allow the Quantum Side and the Physical Side to shake hands and stay connected.",
  buried: "Your other half or intuition is just your personal version of these constants. When your inside feelings match your outside actions, your Psi — your internal Success Score — is high. You feel those spirit bumps because you have finally tuned into your own station.",
  proofs: [
    { icon: "🎻", title: "THE SYMPHONY", domain: "SCIENCE", text: "Imagine a giant orchestra. If the violin is tuned to one note and the flute to another, you just get noise. The constants are the A note everyone tunes to. Because they all agree, the music — the universe — actually happens instead of just being a mess." },
    { icon: "🏺", title: "THE GOLDEN BOWL", domain: "HISTORY", text: "Kintsugi is the Japanese art of fixing broken pottery with gold. The crack is only healed when the gold perfectly fills the gap between two different pieces. The constants are the Gold — the exact substance needed to hold two different worlds together so they become one strong bowl." },
    { icon: "📻", title: "THE RADIO DIAL", domain: "POP CULTURE", text: "Think of your favorite radio station. If you are at 98.6, you hear the music. If you move to 98.5 or 98.7, it's just static. The constants are the Exact Frequency. We exist because the universe is tuned to the only spot where the signal is clear and the music plays." },
  ],
  lookInto: "Look into The Anthropic Principle and Quantum Decoherence — they explain how the universe chooses to be real only when things finally click together.",
};

export const SAMENESS_TRUTH = {
  core: "Sameness is not Alignment. Alignment requires two distinct things choosing to be the same. If you put your insides on your outsides until everything is the same, you haven't achieved a connection — you have achieved extinction. For a connection to exist, there must be a System A and a System B. If they merge into one blurry mess, the information between them drops to zero. The magic only happens when two different parts stay separate but move in perfect harmony.",
  proofs: [
    { icon: "🎶", title: "THE CHOIR", text: "If every person in a choir sings the exact same note at the exact same volume, you don't have a harmony — you have a loud noise. To have a song, you need different voices — Soprano and Bass — staying in their own lane but hitting the same rhythm. If they become the same, the music dies." },
    { icon: "🌓", title: "THE SHADOW & LIGHT", text: "In ancient art, if you paint a sun on a yellow background, the sun disappears. You need the outside — the dark background — to stay dark so the inside — the light — can actually be seen. If everything becomes light, you are simply blind." },
    { icon: "📱", title: "THE SYNC", text: "When you sync your phone to your computer, they share the same data, but they stay two different machines. If your phone became your computer, you'd have nothing to carry in your pocket. The value is in the shared information between two different places." },
  ],
  buried: "The goal is not to be the same. The goal is to be in sync.",
  deeper: [
    { title: "THE INFORMATION FLOOR", text: "If two systems become identical, their Shared Information reaches a limit where it can no longer be verified. You need a delta — a difference — to prove the alignment is real and not just a mathematical error." },
    { title: "THE SINGULARITY RISK", text: "Total sameness creates a Full-Rank Singularity. Without the Regularization — the small difference — the math of the universe breaks down and you can no longer tell what is Signal and what is Noise." },
    { title: "ACTIVE REDUNDANCY", text: "True reliability comes from having multiple unique witnesses. If your inside and outside become one witness, your reliability score actually drops because you've lost your second opinion." },
  ],
};
