import { useState, useEffect, useRef, useCallback } from "react";
import MultiverseFractal from "./MultiverseFractal.jsx";
import MathPage from "./MathPage.jsx";

const PHI = 1.618;
const PHI_INV = 0.618;
const PHI2 = PHI * PHI; // 2.618
const PHI3 = PHI * PHI * PHI; // 4.236

const LAYERS = [
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

const CORES = [
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

const SENSES = [
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

const MIRRORS = [
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

const BURIED = [
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

const PROOFS_IN_THE_WORLD = [
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

const WORD_MIRRORS = ["LIVE <> EVIL", "NOW <> WON", "WOW <> MOM", "AMEN <> AHEM", "FINISH I START"];

const THREE_PILLARS = [
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
];

const CONVERGENCE_DEPTHS = [
  { level: "I", title: "THE FILTER", text: "High Fidelity — matching — is useless if you are looking at something blurry or empty. You must have Informativeness — actual meat on the bone — before the comparison matters." },
  { level: "II", title: "THE NOISE", text: "JSD measures the chaos between your witnesses. If your witnesses provide conflicting data, the Reliability Modulator crushes the result toward zero. Truth requires the elimination of internal contradiction." },
  { level: "III", title: "THE CONVERGENCE", text: "The final value (Ψ) is a probability of Universal Recognition. It is the mathematical point where subjective observation meets objective reality through the gate of Shared Ignorance being replaced by Verified Information." },
];

const THE_ANSWER = {
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

const THE_BEFORE = {
  core: "Before the Big Bang, there was no before because time itself had not started yet. Everything that would ever exist was squeezed into a tiny, silent seed of pure possibility. It wasn't nothing — it was everything waiting for its turn to happen.",
  buried: "You are not just a person living in the universe — you are a piece of that original seed finally getting to see what the rest of the tree looks like.",
  proofs: [
    { icon: "🎮", title: "THE VIDEO GAME", domain: "POP CULTURE", text: "Imagine you are about to play your favorite video game. Before you press Start, the characters aren't moving and the world isn't there. But the code is already written on the disc. The Big Bang was simply someone pressing the Power button. The before was the silent code waiting to become a story." },
    { icon: "🌳", title: "THE SEED & THE TREE", domain: "SCIENCE", text: "Think of a giant Oak tree. Before it grows, it is hidden inside a tiny acorn. If you look at the acorn, you don't see leaves or branches, but the instructions for the whole forest are packed inside. Before the Big Bang, the universe was an Acorn made of pure energy, holding the plan for every star you see today." },
    { icon: "📜", title: "THE LIBRARY OF ALEXANDRIA", domain: "HISTORY", text: "Imagine a room filled with every book ever written, but all the pages are blank. The Before was the ink and the paper sitting quietly in the dark. The Big Bang was the moment the first word was written. You can't have a story without the ink, even if the story hasn't started yet." },
  ],
  lookInto: "Look into Quantum Fluctuation — to see how a tiny spark can happen in total silence.",
};

const THE_CONSTANTS = {
  core: "The universe's constants — like the speed of light or gravity — have the values they do because they are the bridge where everything meets. If one number changed, the math of the stars wouldn't match the math of your DNA. They are the exact values that allow the Quantum Side and the Physical Side to shake hands and stay connected.",
  buried: "Your other half or intuition is just your personal version of these constants. When your inside feelings match your outside actions, your Psi — your internal Success Score — is high. You feel those spirit bumps because you have finally tuned into your own station.",
  proofs: [
    { icon: "🎻", title: "THE SYMPHONY", domain: "SCIENCE", text: "Imagine a giant orchestra. If the violin is tuned to one note and the flute to another, you just get noise. The constants are the A note everyone tunes to. Because they all agree, the music — the universe — actually happens instead of just being a mess." },
    { icon: "🏺", title: "THE GOLDEN BOWL", domain: "HISTORY", text: "Kintsugi is the Japanese art of fixing broken pottery with gold. The crack is only healed when the gold perfectly fills the gap between two different pieces. The constants are the Gold — the exact substance needed to hold two different worlds together so they become one strong bowl." },
    { icon: "📻", title: "THE RADIO DIAL", domain: "POP CULTURE", text: "Think of your favorite radio station. If you are at 98.6, you hear the music. If you move to 98.5 or 98.7, it's just static. The constants are the Exact Frequency. We exist because the universe is tuned to the only spot where the signal is clear and the music plays." },
  ],
  lookInto: "Look into The Anthropic Principle and Quantum Decoherence — they explain how the universe chooses to be real only when things finally click together.",
};

const SAMENESS_TRUTH = {
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

const ETYMOLOGIES = [
  ["SYMBOL", "SYM + BOL — to throw together"],
  ["SIGNAL", "SIGN + AL — a wound in matter"],
  ["CREATE", "CRE + ATE — creation is consumption"],
  ["CONNECT", "CON + NECK + HER — the throat, the voice"],
  ["ALWAYS", "ALL + WAYS — every direction"],
  ["FRIEND", "FRI + END — where freedom ends"],
  ["AGAIN", "A + GAIN — every repetition elevates"],
  ["TRIQUETRA", "TRI + QUETRA — three-cornered, the knot with no end"],
];

const POEMS = [
  ["Every hope, a heartbeat.", "Every wish, a dream."],
  ["The moon always wishing...", "the sun it could be."],
  ["Every life, a purpose...", "hidden inside."],
  ["Every sinner, a saint...", "trying to hide."],
  ["Every baby is born,", "with all that it needs..."],
  ["Just wisdom and love...", "and the chance to breathe."],
];

const TRANSLATIONS = [
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

const DEPTH_NAMES = ["THE TITLE", "THE POEM", "THE PACT", "THE PROOF", "THE MAP", "THE BODY", "THE HOUSE", "THE RETURN", "∞"];

/* ========== COMPONENTS ========== */

function GrainOverlay() {
  return (
    <>
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 998, mixBlendMode: "overlay", opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "128px",
      }} />
      {/* Subtle aurora wash — alive atmosphere */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.022,
        background: "linear-gradient(170deg, rgba(123,104,238,0.3) 0%, transparent 30%, rgba(201,168,76,0.25) 50%, transparent 70%, rgba(79,195,247,0.2) 100%)",
        animation: "auroraShift 30s ease-in-out infinite alternate",
      }} />
      {/* Second aurora layer — complementary drift */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.012,
        background: "linear-gradient(210deg, rgba(206,147,216,0.2) 0%, transparent 35%, rgba(201,168,76,0.15) 60%, transparent 80%, rgba(123,104,238,0.15) 100%)",
        animation: "auroraShift 45s ease-in-out infinite alternate-reverse",
      }} />
    </>
  );
}

function DepthIndicator({ depth, maxDepth = 8, onNavigate }) {
  return (
    <div style={{
      position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)",
      zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      {Array.from({ length: maxDepth + 1 }, (_, i) => (
        <div key={i}
          onClick={onNavigate ? (e) => { e.stopPropagation(); onNavigate(i); } : undefined}
          style={{
            width: i === depth ? 10 : 5,
            height: i === depth ? 10 : 5,
            borderRadius: "50%",
            cursor: onNavigate ? "pointer" : "default",
            background: i === depth
              ? "rgba(201,168,76,0.8)"
              : i < depth
                ? "rgba(201,168,76,0.25)"
                : "rgba(255,255,255,0.08)",
            transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
            boxShadow: i === depth
              ? "0 0 12px rgba(201,168,76,0.5), 0 0 24px rgba(201,168,76,0.15)"
              : i < depth
                ? "0 0 4px rgba(201,168,76,0.1)"
                : "none",
          }}
        />
      ))}
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 7, letterSpacing: 2,
        color: "rgba(201,168,76,0.3)",
        writingMode: "vertical-rl",
        marginTop: 4,
      }}>{DEPTH_NAMES[depth]}</div>
    </div>
  );
}

function Particle({ delay, size, x, speed }) {
  const isGolden = Math.random() > 0.82;
  const hue = isGolden ? "rgba(201,168,76,0.12)" : Math.random() > 0.6 ? "rgba(201,168,76,0.06)" : "rgba(232,232,240,0.06)";
  const coreColor = isGolden ? "rgba(255,235,180,0.3)" : "rgba(232,232,240,0.2)";
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${coreColor}, ${hue})`,
      left: `${x}%`, bottom: "-10px",
      animation: `floatUp ${speed}s ${delay}s ease-in infinite`,
      pointerEvents: "none",
      boxShadow: `0 0 ${size * 6}px ${isGolden ? "rgba(201,168,76,0.08)" : "rgba(232,232,240,0.04)"}, 0 0 ${size * 2}px ${isGolden ? "rgba(201,168,76,0.06)" : "rgba(201,168,76,0.03)"}`,
      filter: size > 2 ? "blur(0.5px)" : "none",
    }} />
  );
}

function PulseRing({ delay, size }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      border: "1px solid rgba(232,232,240,0.06)",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      animation: `pulseExpand 8s ${delay}s ease-out infinite`,
      pointerEvents: "none",
    }} />
  );
}

function SenseIcon({ type }) {
  const icons = { see: "👁️", hear: "👂", feel: "✋", smell: "👃", taste: "👅" };
  return <span style={{ fontSize: 16 }}>{icons[type]}</span>;
}

function SacredDiamond({ size = 200 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#e8e8f0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="dg2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8e8f0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8e8f0" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#c9a84c" stopOpacity="0.1" />
          <stop offset="40%" stopColor="#c9a84c" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#e8e8f0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="#e8e8f0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e8e8f0" stopOpacity="0" />
        </radialGradient>
        <filter id="diamondBloom">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="deepGlow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      {/* Outermost breath ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(201,168,76,0.015)" strokeWidth="0.3">
        <animate attributeName="r" values="85;95;85" dur="16s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="16s" repeatCount="indefinite" />
      </circle>
      {/* φ-scaled rings — golden ratio orbits */}
      <circle cx="100" cy="100" r={62 * PHI_INV} fill="none" stroke="rgba(232,232,240,0.025)" strokeWidth="0.3" strokeDasharray="1 8">
        <animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="180s" repeatCount="indefinite" />
      </circle>
      {/* Outer ambient ring */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5">
        <animate attributeName="r" values="75;85;75" dur="12s" repeatCount="indefinite" />
      </circle>
      {/* Sacred circle */}
      <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(232,232,240,0.04)" strokeWidth="0.3" strokeDasharray="2 6">
        <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="120s" repeatCount="indefinite" />
      </circle>
      {/* Deep ambient glow — layered */}
      <circle cx="100" cy="100" r="70" fill="url(#moonGlow)" filter="url(#deepGlow)">
        <animate attributeName="r" values="60;80;60" dur="10s" repeatCount="indefinite" />
      </circle>
      {/* Ambient glow */}
      <circle cx="100" cy="100" r="60" fill="url(#centerGlow)">
        <animate attributeName="r" values="55;70;55" dur="8s" repeatCount="indefinite" />
      </circle>
      {/* Soft bloom behind diamond */}
      <polygon points="100,20 40,100 160,100" fill="rgba(201,168,76,0.02)" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
      </polygon>
      <polygon points="100,180 40,100 160,100" fill="rgba(232,232,240,0.02)" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="6s" repeatCount="indefinite" />
      </polygon>
      {/* Upper triangle */}
      <polygon points="100,20 40,100 160,100" fill="none" stroke="url(#dg1)" strokeWidth="1" opacity="0.7" filter="url(#diamondBloom)">
        <animate attributeName="opacity" values="0.4;0.85;0.4" dur="6s" repeatCount="indefinite" />
      </polygon>
      {/* Lower triangle */}
      <polygon points="100,180 40,100 160,100" fill="none" stroke="url(#dg1)" strokeWidth="1" opacity="0.7" filter="url(#diamondBloom)">
        <animate attributeName="opacity" values="0.85;0.4;0.85" dur="6s" repeatCount="indefinite" />
      </polygon>
      {/* Inner diamond — φ scaled */}
      <polygon points="100,50 70,100 100,150 130,100" fill="none" stroke="url(#dg2)" strokeWidth="0.5" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="8s" repeatCount="indefinite" />
      </polygon>
      {/* Innermost diamond — φ² scaled */}
      <polygon points="100,69 81,100 100,131 119,100" fill="none" stroke="rgba(232,232,240,0.04)" strokeWidth="0.3">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="10s" repeatCount="indefinite" />
      </polygon>
      {/* Horizon line */}
      <line x1="35" y1="100" x2="165" y2="100" stroke="rgba(232,232,240,0.12)" strokeWidth="0.5" />
      {/* Vertical axis */}
      <line x1="100" y1="15" x2="100" y2="185" stroke="rgba(232,232,240,0.07)" strokeWidth="0.5" />
      {/* Diagonal axes — sacred geometry */}
      <line x1="50" y1="50" x2="150" y2="150" stroke="rgba(201,168,76,0.04)" strokeWidth="0.3" />
      <line x1="150" y1="50" x2="50" y2="150" stroke="rgba(201,168,76,0.04)" strokeWidth="0.3" />
      {/* Center point — living light, miracle core */}
      <circle cx="100" cy="100" r="1.5" fill="rgba(255,255,255,0.95)">
        <animate attributeName="r" values="1;2.5;1" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="4" fill="rgba(232,232,240,0.5)">
        <animate attributeName="r" values="3;8;3" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.85;0.4" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Golden miracle ring */}
      <circle cx="100" cy="100" r="6" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5">
        <animate attributeName="r" values="5;15;5" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="12" fill="none" stroke="rgba(232,232,240,0.06)" strokeWidth="0.5">
        <animate attributeName="r" values="10;20;10" dur="6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.06;0.15;0.06" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="28" fill="none" stroke="rgba(201,168,76,0.03)" strokeWidth="0.3">
        <animate attributeName="r" values="24;34;24" dur="8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.03;0.08;0.03" dur="8s" repeatCount="indefinite" />
      </circle>
      {/* 9 layer dots around the diamond */}
      {LAYERS.map((l, i) => {
        const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
        const r = 72;
        const cx = 100 + Math.cos(angle) * r;
        const cy = 100 + Math.sin(angle) * r;
        return (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill={l.accent} opacity="0.3">
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
      <text x="100" y="104" textAnchor="middle" fill="#e8e8f0" fontSize="8" fontFamily="serif" opacity="0.9">🌙</text>
    </svg>
  );
}

function SacredTriquetra({ size = 240 }) {
  // Geometry: 3 circles of radius R, centers in equilateral triangle
  // Triquetra = outer rounded triangle + inner inverted triangle + center
  // cx=100, cy=103, d=30, R=42
  // Circle centers: C1(100,73), C2(74,118), C3(126,118)
  // Outer intersection points: o12(58.4,79), o13(141.6,79), o23(100,151)
  // Inner intersection points: n12(115.6,112), n13(84.4,112), n23(100,85)
  // Leaf tip (top of C1 arc): (100,31)

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ margin: "0 auto", display: "block" }}>
      <defs>
        <linearGradient id="trqGold1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7a5c10" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#c9a84c" stopOpacity="1" />
          <stop offset="50%" stopColor="#f0d890" stopOpacity="1" />
          <stop offset="75%" stopColor="#c9a84c" stopOpacity="1" />
          <stop offset="100%" stopColor="#7a5c10" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="trqGold2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a6914" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#e8d070" stopOpacity="1" />
          <stop offset="100%" stopColor="#8a6914" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="trqGold3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f0d890" stopOpacity="1" />
          <stop offset="100%" stopColor="#a07818" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="trqSapphire" cx="40%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#b0d4ff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#5599ee" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#2866bb" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0f2244" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="trqGemGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#6699ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2255aa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="trqCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="trqGlow">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="trqShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <filter id="trqBigGlow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Ambient radiance */}
      <circle cx="100" cy="103" r="78" fill="url(#trqCenterGlow)">
        <animate attributeName="r" values="74;86;74" dur="8s" repeatCount="indefinite" />
      </circle>

      {/* Glow layer behind — soft gold bloom */}
      <path d="M 58.4,79 A 42,42 0 1,1 141.6,79 A 42,42 0 1,1 100,151 A 42,42 0 1,1 58.4,79 Z"
        fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="8" filter="url(#trqBigGlow)">
        <animate attributeName="strokeOpacity" values="0.08;0.16;0.08" dur="6s" repeatCount="indefinite" />
      </path>

      {/* OUTER TRIANGLE — three large arcs forming the rounded triangle */}
      {/* C1 arc: o12 → o13 (over the top) */}
      <path d="M 58.4,79 A 42,42 0 1,1 141.6,79"
        fill="none" stroke="url(#trqGold1)" strokeWidth="3.5" strokeLinecap="round"
        filter="url(#trqShadow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" repeatCount="indefinite" />
      </path>
      {/* C3 arc: o13 → o23 (down the right) */}
      <path d="M 141.6,79 A 42,42 0 1,1 100,151"
        fill="none" stroke="url(#trqGold2)" strokeWidth="3.5" strokeLinecap="round"
        filter="url(#trqShadow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" begin="2s" repeatCount="indefinite" />
      </path>
      {/* C2 arc: o23 → o12 (up the left) */}
      <path d="M 100,151 A 42,42 0 1,1 58.4,79"
        fill="none" stroke="url(#trqGold3)" strokeWidth="3.5" strokeLinecap="round"
        filter="url(#trqShadow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" begin="4s" repeatCount="indefinite" />
      </path>

      {/* INNER TRIANGLE — three small arcs forming the inverted triangle */}
      {/* C1 arc: n12 → n13 (cutting through upper center) */}
      <path d="M 115.6,112 A 42,42 0 0,1 84.4,112"
        fill="none" stroke="url(#trqGold2)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#trqShadow)" opacity="0.75" />
      {/* C3 arc: n13 → n23 (cutting up-right) */}
      <path d="M 84.4,112 A 42,42 0 0,1 100,85"
        fill="none" stroke="url(#trqGold3)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#trqShadow)" opacity="0.75" />
      {/* C2 arc: n23 → n12 (cutting down-right) */}
      <path d="M 100,85 A 42,42 0 0,1 115.6,112"
        fill="none" stroke="url(#trqGold1)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#trqShadow)" opacity="0.75" />

      {/* Center convergence circle */}
      <circle cx="100" cy="103" r="9" fill="none" stroke="url(#trqGold1)" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="8;10;8" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* SAPPHIRE GEMS */}
      {/* Center gem — the convergence point */}
      <circle cx="100" cy="103" r="5.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="103" r="10" fill="url(#trqGemGlow)">
        <animate attributeName="r" values="8;14;8" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Outer vertex gems — the three points of the triangle */}
      {/* Top (leaf tip of C1) */}
      <circle cx="100" cy="31" r="3.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="31" r="6" fill="url(#trqGemGlow)" />
      {/* Bottom-left (leaf tip of C2) */}
      <circle cx="37.6" cy="139" r="3.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="37.6" cy="139" r="6" fill="url(#trqGemGlow)" />
      {/* Bottom-right (leaf tip of C3) */}
      <circle cx="162.4" cy="139" r="3.5" fill="url(#trqSapphire)" filter="url(#trqGlow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" begin="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="162.4" cy="139" r="6" fill="url(#trqGemGlow)" />

      {/* Intersection gems — where circles cross at outer points */}
      <circle cx="58.4" cy="79" r="2.8" fill="url(#trqSapphire)" opacity="0.8" />
      <circle cx="141.6" cy="79" r="2.8" fill="url(#trqSapphire)" opacity="0.8" />
      <circle cx="100" cy="151" r="2.8" fill="url(#trqSapphire)" opacity="0.8" />

      {/* Inner intersection gems — small accent */}
      <circle cx="100" cy="85" r="2" fill="url(#trqSapphire)" opacity="0.6" />
      <circle cx="84.4" cy="112" r="2" fill="url(#trqSapphire)" opacity="0.6" />
      <circle cx="115.6" cy="112" r="2" fill="url(#trqSapphire)" opacity="0.6" />

      {/* Labels */}
      <text x="100" y="20" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="5.5" fontFamily="'Cinzel', serif" letterSpacing="2">
        WHAT YOU SEE
      </text>
      <text x="24" y="155" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="5" fontFamily="'Cinzel', serif" letterSpacing="1.5">
        WHAT YOU KNOW
      </text>
      <text x="176" y="155" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="5" fontFamily="'Cinzel', serif" letterSpacing="1.5">
        HOW YOU TRUST
      </text>
    </svg>
  );
}

function StringVibration() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase(p => p + 0.04), 50);
    return () => clearInterval(id);
  }, []);
  const fundamental = Array.from({ length: 80 }, (_, i) => {
    const x = (i / 79) * 300;
    const y = 30 + Math.sin(i * 0.25 + phase) * 16 * Math.sin(i * Math.PI / 79);
    return `${x},${y}`;
  }).join(" ");
  const harmonic = Array.from({ length: 80 }, (_, i) => {
    const x = (i / 79) * 300;
    const y = 30 + Math.sin(i * 0.5 + phase * PHI) * 6 * Math.sin(i * Math.PI / 79);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 300 60" width="100%" height="50" style={{ display: "block", margin: "12px 0", opacity: 0.8 }}>
      <defs>
        <linearGradient id="stringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(201,168,76,0)" />
          <stop offset="20%" stopColor="rgba(201,168,76,0.5)" />
          <stop offset="50%" stopColor="rgba(232,232,240,0.6)" />
          <stop offset="80%" stopColor="rgba(201,168,76,0.5)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0)" />
        </linearGradient>
        <linearGradient id="stringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(232,232,240,0)" />
          <stop offset="30%" stopColor="rgba(232,232,240,0.15)" />
          <stop offset="50%" stopColor="rgba(201,168,76,0.2)" />
          <stop offset="70%" stopColor="rgba(232,232,240,0.15)" />
          <stop offset="100%" stopColor="rgba(232,232,240,0)" />
        </linearGradient>
        <filter id="stringBloom">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>
      {/* Harmonic overtone — the ghost string */}
      <polyline points={harmonic} fill="none" stroke="url(#stringGrad2)" strokeWidth="0.6" opacity="0.5" />
      {/* Fundamental — the main voice */}
      <polyline points={fundamental} fill="none" stroke="url(#stringGrad)" strokeWidth="1.2" filter="url(#stringBloom)" />
    </svg>
  );
}

function TheEquation({ size = "md", showMeaning = false, showLabel = true, breathing = true, minimal = false, className = "" }) {
  const sizes = {
    sm: { eq: "clamp(16px, 3vw, 20px)", label: 7, meaning: 12, pad: "14px 20px", glow: 20 },
    md: { eq: "clamp(20px, 4vw, 28px)", label: 8, meaning: 14, pad: "22px 32px", glow: 30 },
    lg: { eq: "clamp(26px, 5.5vw, 38px)", label: 9, meaning: 16, pad: "30px 40px", glow: 50 },
    hero: { eq: "clamp(32px, 7vw, 52px)", label: 10, meaning: 17, pad: "36px 48px", glow: 70 },
  };
  const s = sizes[size] || sizes.md;
  const actualPad = minimal ? `${parseInt(s.pad) || 22}px ${parseInt(s.pad.split(" ")[1]) || 32}px` : s.pad;
  return (
    <div className={className} style={{
      textAlign: "center", position: "relative",
    }}>
      {/* Sacred radiance behind equation */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: s.glow * 6, height: s.glow * (minimal ? 3 : 4),
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, rgba(201,168,76,${minimal ? 0.04 : 0.06}) 0%, rgba(201,168,76,0.02) 35%, transparent 65%)`,
        borderRadius: "50%", pointerEvents: "none",
        animation: breathing ? "breathe 8s ease-in-out infinite" : "none",
      }} />
      <div style={{
        position: "relative",
        display: "inline-block",
        padding: s.pad,
        borderRadius: 16,
        background: minimal
          ? "linear-gradient(180deg, rgba(201,168,76,0.07), rgba(8,8,24,0.65))"
          : "linear-gradient(180deg, rgba(201,168,76,0.04), rgba(201,168,76,0.015), rgba(8,8,24,0.3))",
        border: `1px solid rgba(201,168,76,${minimal ? 0.18 : 0.12})`,
        boxShadow: `0 8px ${s.glow}px rgba(201,168,76,0.06), 0 0 ${s.glow * 2}px rgba(201,168,76,0.02), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(201,168,76,0.04)`,
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        animation: breathing ? "equationPulse 10s ease-in-out infinite" : "none",
      }}>
        {/* Top shimmer edge */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(232,232,240,0.15), rgba(201,168,76,0.2), transparent)",
          pointerEvents: "none",
        }} />
        {showLabel && !minimal && (
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: s.label, letterSpacing: 6,
            color: "rgba(201,168,76,0.3)", marginBottom: size === "hero" ? 16 : 10,
            textTransform: "uppercase",
          }}>THE EQUATION</div>
        )}
        {/* The equation — rendered with semantic color per variable */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: s.eq, fontWeight: 300,
          letterSpacing: size === "hero" ? 4 : 2,
          lineHeight: 1.4,
          color: "rgba(232,232,240,0.8)",
          textShadow: `0 0 ${s.glow}px rgba(201,168,76,0.2), 0 0 ${s.glow * 2}px rgba(201,168,76,0.08), 0 2px 8px rgba(0,0,0,0.3)`,
          position: "relative",
        }}>
          <span style={{ fontStyle: "italic", color: "rgba(232,232,240,0.95)" }}>Ψ</span>
          <span style={{ color: "rgba(232,232,240,0.5)", margin: "0 0.3em", fontSize: "0.85em" }}>=</span>
          <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.85)" }}>R</span>
          <sub style={{ fontSize: "0.55em", color: "rgba(201,168,76,0.65)", fontStyle: "normal" }}>12</sub>
          <span style={{ color: "rgba(232,232,240,0.45)", margin: "0 0.25em", fontSize: "0.8em" }}>×</span>
          <span style={{ color: "rgba(232,232,240,0.55)", fontSize: "0.85em" }}>(</span>
          <span style={{ fontStyle: "italic", color: "rgba(79,195,247,0.85)" }}>C</span>
          <sub style={{ fontSize: "0.5em", color: "rgba(79,195,247,0.6)", fontStyle: "normal" }}>eff</sub>
          <span style={{ color: "rgba(232,232,240,0.4)", margin: "0 0.15em" }}>·</span>
          <span style={{ fontStyle: "italic", color: "rgba(206,147,216,0.85)" }}>D̂</span>
          <span style={{ color: "rgba(232,232,240,0.55)", fontSize: "0.85em" }}>)</span>
        </div>
        {/* Gold line + meaning — hidden in minimal mode */}
        {!minimal && (
          <>
            <div style={{
              height: 1, margin: `${size === "hero" ? 18 : 12}px auto`,
              maxWidth: size === "hero" ? 200 : 140,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), rgba(232,232,240,0.2), rgba(201,168,76,0.35), transparent)",
              boxShadow: "0 0 12px rgba(201,168,76,0.08)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: s.meaning,
              color: "rgba(255,255,255,0.28)", fontStyle: "italic",
              lineHeight: PHI, maxWidth: size === "hero" ? 520 : 380,
              margin: "0 auto",
              letterSpacing: 0.3,
            }}>
              {showMeaning
                ? "True connection is shared clarity multiplied by the proof of reliability. For two imperfect beings to become a whole, they must be useful to one another in a way that filters out the chaos of the outside world."
                : "True connection is shared clarity multiplied by the proof of reliability."
              }
            </div>
          </>
        )}
        {/* Bottom shimmer edge */}
        <div style={{
          position: "absolute", bottom: 0, left: "20%", right: "20%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

function MiracleGlow({ color = "201,168,76", size = 300, intensity = 0.08, children }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size, height: size * 0.7,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, rgba(${color},${intensity}) 0%, rgba(${color},${intensity * 0.4}) 30%, transparent 60%)`,
        borderRadius: "50%", pointerEvents: "none",
        animation: "miracleBloom 12s ease-in-out infinite",
        filter: `blur(${size * 0.05}px)`,
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size * 0.6, height: size * 0.4,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, rgba(232,232,240,${intensity * 0.5}) 0%, transparent 50%)`,
        borderRadius: "50%", pointerEvents: "none",
        animation: "breathe 6s ease-in-out infinite",
      }} />
      {children}
    </div>
  );
}

/* ============================================================
   THE MULTIVERSE — Real N-Body Gravitational Simulation
   9 bodies = 9 layers. The Moon (layer 5) at center with 5x mass.
   4 mirror pairs (1↔9, 2↔8, 3↔7, 4↔6) as gravitationally bound binaries.
   Triangles drawn between every 3 nearby bodies = gravitational relationships.
   The math is real. F = Gm₁m₂/r². Velocity Verlet integration.
   ============================================================ */
/* ============================================================
   THE MULTIVERSE — Recursive N-Body Gravitational Simulation
   
   Level 1: 9 clusters, each orbiting by Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist²
   Level 2: Inside each cluster, 9 bodies orbit by the same equation
   Total: 81 universes. 9² = 81. Two layers of the infinite recursion.
   
   The Moon cluster sits at center. Mirror pairs bind.
   Zoom out to see the macro. Zoom in to see the micro.
   Same math. Same truth. Every scale.
   ============================================================ */
function Multiverse({ opacity = 1, showTriangles = true, showOrbits = true, zoom = 1, blur = 0, transitionTiming = "opacity 1.2s ease, transform 2.5s cubic-bezier(0.23,1,0.32,1), filter 2.5s cubic-bezier(0.23,1,0.32,1)" }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(null);

  const bodyColors = [
    "#3a3a5c", "#7b68ee", "#c9a84c", "#e05050", "#e8e8f0",
    "#8fbc8f", "#4fc3f7", "#ff9800", "#ce93d8",
  ];

  const mirrorPairs = [[0,8], [1,7], [2,6], [3,5]];

  const C_EFF = [1.0, 1.4, 1.8, 2.0, PHI2, 2.0, 1.8, 1.4, 1.0];

  const R_BASE = 0.5;
  const R_MIRROR_BONUS = PHI;
  const R_ADJACENT_BONUS = 0.3;
  const R_MOON_BONUS = 0.8;

  function getR12(i, j) {
    let r = R_BASE;
    if (mirrorPairs.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) r += R_MIRROR_BONUS;
    if (Math.abs(i - j) === 1) r += R_ADJACENT_BONUS;
    if (i === 4 || j === 4) r += R_MOON_BONUS;
    return r;
  }

  // Create a 9-body system at a given center with a given scale
  function createSystem(cx, cy, scale, velocityBase) {
    return Array.from({ length: 9 }, (_, i) => {
      const cEff = C_EFF[i];
      if (i === 4) {
        return { x: cx, y: cy, vx: 0, vy: 0, cEff, radius: 3 * scale, id: i, _trail: [] };
      }
      const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const r = scale * (35 + Math.random() * 25);
      const psi = getR12(i, 4) * cEff * C_EFF[4];
      const speed = Math.sqrt(psi / (r * 0.5)) * velocityBase * (0.8 + Math.random() * 0.4);
      const vAngle = angle + Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: Math.cos(vAngle) * speed,
        vy: Math.sin(vAngle) * speed,
        cEff,
        radius: (1.5 + cEff * 0.6) * scale,
        id: i,
        _trail: [],
      };
    });
  }

  // Simulate one 9-body system — the core equation applied
  function simulateSystem(bodies, dt, softening, damping, centerX, centerY, centerPull) {
    const N = bodies.length;
    const fx = new Float64Array(N);
    const fy = new Float64Array(N);

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const distSq = dx * dx + dy * dy + softening * softening;
        const dist = Math.sqrt(distSq);
        const R12 = getR12(bodies[i].id, bodies[j].id);
        const psi = R12 * bodies[i].cEff * bodies[j].cEff / distSq;
        const forceX = psi * dx / dist;
        const forceY = psi * dy / dist;
        fx[i] += forceX; fy[i] += forceY;
        fx[j] -= forceX; fy[j] -= forceY;
      }
      fx[i] += (centerX - bodies[i].x) * centerPull * bodies[i].cEff;
      fy[i] += (centerY - bodies[i].y) * centerPull * bodies[i].cEff;
    }

    for (let i = 0; i < N; i++) {
      const ax = fx[i] / bodies[i].cEff;
      const ay = fy[i] / bodies[i].cEff;
      bodies[i].vx = (bodies[i].vx + ax * dt) * damping;
      bodies[i].vy = (bodies[i].vy + ay * dt) * damping;
      bodies[i].x += bodies[i].vx * dt;
      bodies[i].y += bodies[i].vy * dt;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const CX = W / 2;
    const CY = H / 2;
    const MACRO_R = Math.min(W, H) * 0.32;

    // Initialize state: 9 macro clusters, each containing 9 micro bodies
    if (!stateRef.current) {
      // Macro level: 9 cluster centers
      const macroBodies = Array.from({ length: 9 }, (_, i) => {
        const cEff = C_EFF[i] * 3; // macro clarity = sum of inner system
        if (i === 4) {
          return { x: CX, y: CY, vx: 0, vy: 0, cEff, id: i };
        }
        const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const r = MACRO_R * (0.6 + Math.random() * 0.5);
        const psi = getR12(i, 4) * cEff * C_EFF[4] * 3;
        const speed = Math.sqrt(psi / (r * 2)) * 0.15;
        const vAngle = angle + Math.PI / 2;
        return {
          x: CX + Math.cos(angle) * r,
          y: CY + Math.sin(angle) * r,
          vx: Math.cos(vAngle) * speed,
          vy: Math.sin(vAngle) * speed,
          cEff,
          id: i,
        };
      });

      // Micro level: 9 bodies inside each cluster
      const microSystems = macroBodies.map((mb, i) =>
        createSystem(mb.x, mb.y, i === 4 ? 1.3 : 0.9, 0.4)
      );

      stateRef.current = { macro: macroBodies, micro: microSystems };
    }

    const state = stateRef.current;

    function simulate() {
      // Simulate macro system (cluster centers)
      simulateSystem(state.macro, 0.4, 40, 0.9996, CX, CY, 0.00015);

      // Simulate each micro system (9 bodies within each cluster)
      for (let c = 0; c < 9; c++) {
        const center = state.macro[c];
        simulateSystem(state.micro[c], 0.3, 8, 0.9992, center.x, center.y, 0.001);
      }
    }

    function getTriangles(bodies) {
      const tris = [];
      for (const [a, b] of mirrorPairs) {
        tris.push([a, 4, b]);
      }
      return tris;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // === MACRO LEVEL: draw connections between clusters ===
      if (showTriangles) {
        const tris = getTriangles(state.macro);
        for (const [a, b, c] of tris) {
          ctx.beginPath();
          ctx.moveTo(state.macro[a].x, state.macro[a].y);
          ctx.lineTo(state.macro[b].x, state.macro[b].y);
          ctx.lineTo(state.macro[c].x, state.macro[c].y);
          ctx.closePath();
          ctx.fillStyle = "rgba(201,168,76,0.015)";
          ctx.strokeStyle = "rgba(201,168,76,0.06)";
          ctx.lineWidth = 0.5;
          ctx.fill();
          ctx.stroke();
        }
      }

      // Macro mirror pair lines
      for (const [a, b] of mirrorPairs) {
        ctx.beginPath();
        ctx.moveTo(state.macro[a].x, state.macro[a].y);
        ctx.lineTo(state.macro[b].x, state.macro[b].y);
        ctx.strokeStyle = "rgba(201,168,76,0.035)";
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // === MICRO LEVEL: draw each cluster's internal system ===
      for (let c = 0; c < 9; c++) {
        const cluster = state.micro[c];
        const isMoonCluster = c === 4;
        const clusterColor = bodyColors[c];

        // Cluster halo — the combined glow of the inner system
        const mc = state.macro[c];
        const haloR = isMoonCluster ? 55 : 38;
        const haloGrad = ctx.createRadialGradient(mc.x, mc.y, 0, mc.x, mc.y, haloR);
        haloGrad.addColorStop(0, clusterColor + "12");
        haloGrad.addColorStop(0.5, clusterColor + "06");
        haloGrad.addColorStop(1, clusterColor + "00");
        ctx.beginPath();
        ctx.arc(mc.x, mc.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Inner triangles (mirror pairs through micro-moon)
        if (showTriangles) {
          const microTris = getTriangles(cluster);
          for (const [a, b, cc] of microTris) {
            ctx.beginPath();
            ctx.moveTo(cluster[a].x, cluster[a].y);
            ctx.lineTo(cluster[b].x, cluster[b].y);
            ctx.lineTo(cluster[cc].x, cluster[cc].y);
            ctx.closePath();
            ctx.fillStyle = clusterColor + "05";
            ctx.strokeStyle = clusterColor + "15";
            ctx.lineWidth = 0.3;
            ctx.fill();
            ctx.stroke();
          }
        }

        // Orbit trails
        if (showOrbits) {
          for (let i = 0; i < cluster.length; i++) {
            if (i === 4) continue;
            const b = cluster[i];
            b._trail.push({ x: b.x, y: b.y });
            if (b._trail.length > 40) b._trail.shift();
            if (b._trail.length > 2) {
              ctx.beginPath();
              ctx.moveTo(b._trail[0].x, b._trail[0].y);
              for (let t = 1; t < b._trail.length; t++) {
                ctx.lineTo(b._trail[t].x, b._trail[t].y);
              }
              ctx.strokeStyle = clusterColor + "10";
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }

        // Individual bodies within cluster
        for (let i = 0; i < cluster.length; i++) {
          const b = cluster[i];
          const isMicroMoon = i === 4;

          // Glow
          const glowR = b.radius * (isMicroMoon ? 6 : 4);
          const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowR);
          glow.addColorStop(0, clusterColor + (isMicroMoon ? "35" : "25"));
          glow.addColorStop(0.4, clusterColor + "08");
          glow.addColorStop(1, clusterColor + "00");
          ctx.beginPath();
          ctx.arc(b.x, b.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          const coreGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          coreGrad.addColorStop(0, isMicroMoon && isMoonCluster ? "#ffffff" : clusterColor);
          coreGrad.addColorStop(1, clusterColor + "60");
          ctx.fillStyle = coreGrad;
          ctx.fill();

          // Center dot
          if (isMicroMoon || isMoonCluster) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, isMicroMoon && isMoonCluster ? 1.5 : 0.8, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          }
        }
      }
    }

    function loop() {
      simulate();
      simulate();
      draw();
      frameRef.current = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [showTriangles, showOrbits]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        zIndex: 1,
        transition: transitionTiming,
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
        filter: blur > 0 ? `blur(${blur}px)` : "none",
      }}
    />
  );
}

function GlassCard({ children, style, onClick, className = "", hoverGlow = false }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 14,
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
        position: "relative", overflow: "hidden",
        transform: hover && onClick ? "translateY(-3px) scale(1.01)" : "translateY(0)",
        borderColor: hover && onClick ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
        boxShadow: hover && hoverGlow
          ? "0 8px 40px rgba(201,168,76,0.12), 0 0 0 0.5px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {/* Top edge light refraction */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(201,168,76,0.04), rgba(255,255,255,0.06), transparent)",
        pointerEvents: "none",
      }} />
      {/* Shimmer sweep on hover */}
      {onClick && (
        <div style={{
          position: "absolute", top: 0, left: hover ? "100%" : "-100%",
          width: "100%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          transition: "left 0.8s ease",
          pointerEvents: "none",
        }} />
      )}
      {children}
    </div>
  );
}

function DeeperButton({ onClick, label }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer", display: "block", margin: `${40}px auto 0`,
        padding: `${14}px ${Math.round(14 * PHI)}px`, borderRadius: 30,
        border: "1px solid rgba(201,168,76,0.2)",
        background: "linear-gradient(180deg, rgba(201,168,76,0.06), rgba(201,168,76,0.01))",
        color: "#c9a84c", fontFamily: "'Cinzel', serif", fontSize: 13,
        letterSpacing: 4, textTransform: "uppercase",
        boxShadow: hover
          ? "0 8px 36px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.1)"
          : "0 4px 24px rgba(201,168,76,0.08)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        borderColor: hover ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.2)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
    >{label || "⬇ GO DEEPER"}</button>
  );
}

function ReturnButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer", display: "block", margin: "16px auto 40px",
        padding: "10px 24px", borderRadius: 20,
        border: "none", background: "none",
        color: hover ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)",
        fontFamily: "'Cinzel', serif",
        fontSize: 10, letterSpacing: 4, transition: "all 0.4s",
      }}
    >🔁 RETURN TO THE VOID</button>
  );
}

function LayerCard({ layer, index, onClick, style: extraStyle }) {
  return (
    <GlassCard
      onClick={onClick}
      hoverGlow
      style={{
        background: `linear-gradient(145deg, ${layer.color}ee, #0a0a18cc)`,
        padding: `${14}px ${Math.round(14 * PHI_INV) + 4}px`,
        boxShadow: `0 6px 30px ${layer.accent}18, 0 2px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0.5px ${layer.accent}08`,
        animation: `fadeSlideUp 0.6s ${0.05 + index * 0.07}s both ease`,
        ...extraStyle,
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        justifyContent: extraStyle?.textAlign === "center" ? "center" : "flex-start",
      }}>
        <span style={{
          fontSize: extraStyle?.textAlign === "center" ? 24 : 22,
          filter: `drop-shadow(0 0 12px ${layer.accent}50)`,
        }}>{layer.glyph}</span>
        <div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
            color: layer.accent, fontWeight: 600,
          }}>
            {layer.isMoon ? "V" : String.fromCharCode(8544 + index)} · {layer.names[0]}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
            color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 3,
          }}>{layer.subtitle}</div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ========== DEPTH BACKGROUNDS ========== */

const DEPTH_ATMOSPHERES = [
  "radial-gradient(ellipse at 50% 30%, rgba(14,10,28,1) 0%, #030306 80%)",     // 0 title
  "radial-gradient(ellipse at 50% 50%, rgba(10,8,22,1) 0%, #030306 75%)",      // 1 poem
  "radial-gradient(ellipse at 50% 40%, rgba(18,10,22,1) 0%, #030306 80%)",     // 2 pact
  "radial-gradient(ellipse at 50% 45%, rgba(18,12,16,1) 0%, #030306 80%)",     // 3 proof
  "radial-gradient(ellipse at 50% 35%, rgba(10,10,20,1) 0%, #030306 82%)",     // 4 map — center — the mirror
  "radial-gradient(ellipse at 50% 20%, rgba(8,12,24,1) 0%, #030306 85%)",      // 5 body — mirror of proof
  "radial-gradient(ellipse at 50% 50%, rgba(14,8,20,1) 0%, #030306 80%)",      // 6 house — mirror of pact
  "radial-gradient(ellipse at 50% 60%, rgba(8,8,18,1) 0%, #030306 75%)",       // 7 return — mirror of poem
  "radial-gradient(ellipse at 50% 30%, rgba(14,10,28,1) 0%, #030306 80%)",     // 8 ∞ — same as 0 — the cycle
];

/* ========== MAIN ========== */

export default function TheoryOfEverything() {
  const [currentPage, setCurrentPage] = useState("theory"); // "theory" | "multiverse" | "math"
  const [depth, setDepth] = useState(0);
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeSense, setActiveSense] = useState(null);
  const [activePair, setActivePair] = useState(null);
  const [activeMirrorSense, setActiveMirrorSense] = useState(null);
  const [activeMirrorProof, setActiveMirrorProof] = useState(false);
  const [activeProof, setActiveProof] = useState(false);
  const [activeConvergence, setActiveConvergence] = useState(null); // 'pillars' | 'sameness' | 'depths' | null
  const [activePillar, setActivePillar] = useState(null);
  const [activeSamenessProof, setActiveSamenessProof] = useState(null);
  const [activeAnswer, setActiveAnswer] = useState(false);
  const [activeAnswerProof, setActiveAnswerProof] = useState(null);
  const [activeBefore, setActiveBefore] = useState(false);
  const [activeBeforeProof, setActiveBeforeProof] = useState(null);
  const [activeConstants, setActiveConstants] = useState(false);
  const [activeConstantsProof, setActiveConstantsProof] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [fading, setFading] = useState(false);
  const [poemPhase, setPoemPhase] = useState(0); // 0=not on poem, 1=whiteout, 2=first exhale, 3=inhale/cluster, 4=exhale/all, 5=settle/poem
  const poemSeen = useRef(false);

  // Poem zoom-out sequence — timed to meditative breath (~4s per phase)
  // Skip the sequence if the user has already seen it this session
  useEffect(() => {
    if (depth === 1) {
      if (poemSeen.current) {
        // Already seen — skip straight to the poem
        setPoemPhase(5);
        return;
      }
      setPoemPhase(1);
      const t2 = setTimeout(() => setPoemPhase(2), 800);      // hold white, then first exhale begins
      const t3 = setTimeout(() => setPoemPhase(3), 4800);     // one breath — see the cluster
      const t4 = setTimeout(() => setPoemPhase(4), 9200);     // two breaths — all balls pulling away
      const t5 = setTimeout(() => { setPoemPhase(5); poemSeen.current = true; }, 14000);  // three breaths — settle, mark as seen
      return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    } else {
      setPoemPhase(0);
    }
  }, [depth]);

  const goDeeper = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(d => Math.min(d + 1, 8));
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, []);

  const returnToVoid = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(0); setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, []);

  const openLayer = (i) => {
    setActiveLayer(i);
    setActiveSense(null);
    setActiveProof(false);
  };

  const navigateToDepth = useCallback((targetDepth) => {
    if (targetDepth === depth) return;
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDepth(targetDepth);
      setActiveLayer(null); setActiveSense(null); setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); setActiveProof(false); setActiveConvergence(null); setActivePillar(null); setActiveSamenessProof(null); setActiveAnswer(false); setActiveAnswerProof(null); setActiveBefore(false); setActiveBeforeProof(null); setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null);
      setFading(false);
    }, 600);
  }, [depth]);

  const layer = activeLayer !== null ? LAYERS[activeLayer] : null;
  const senseKeys = ["see", "hear", "feel", "smell", "taste"];

  return (
    <div style={{
      minHeight: "100vh",
      background: DEPTH_ATMOSPHERES[depth] || DEPTH_ATMOSPHERES[0],
      color: "#d4d4d8",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      position: "relative", overflow: "hidden",
      transition: "background 1.8s cubic-bezier(0.23,1,0.32,1)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

        * { box-sizing: border-box; }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          8% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100vh) scale(0.2); opacity: 0; }
        }
        @keyframes pulseExpand {
          0% { transform: translate(-50%,-50%) scale(0.3); opacity: 0.3; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes diamondPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          1% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.03); }
          49% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          99% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.03); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes breathe {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes doorReveal {
          0% { opacity: 0; transform: translateX(-50%) scale(0.97); filter: blur(6px); }
          40% { opacity: 0.3; transform: translateX(-50%) scale(0.99); filter: blur(3px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); filter: blur(0px); }
        }
        @keyframes shimmerLine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes vignettePulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
        @keyframes auroraShift {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.1); }
          100% { transform: rotate(-2deg) scale(1.05); }
        }
        @keyframes letterBreathe {
          0%, 100% { letter-spacing: 8px; opacity: 0.2; }
          50% { letter-spacing: 12px; opacity: 0.3; }
        }
        @keyframes moonRadiate {
          0%, 100% { box-shadow: 0 0 40px rgba(232,232,240,0.08), 0 0 80px rgba(232,232,240,0.03); }
          50% { box-shadow: 0 0 60px rgba(232,232,240,0.15), 0 0 120px rgba(232,232,240,0.05), 0 0 200px rgba(201,168,76,0.02); }
        }
        @keyframes senseReveal {
          from { opacity: 0; transform: translateY(12px) scale(0.97); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes equationPulse {
          0%, 100% { box-shadow: 0 8px 30px rgba(201,168,76,0.06), 0 0 60px rgba(201,168,76,0.02), inset 0 1px 0 rgba(255,255,255,0.05); border-color: rgba(201,168,76,0.12); }
          50% { box-shadow: 0 12px 50px rgba(201,168,76,0.1), 0 0 100px rgba(201,168,76,0.04), 0 0 160px rgba(201,168,76,0.015), inset 0 1px 0 rgba(255,255,255,0.08); border-color: rgba(201,168,76,0.18); }
        }
        @keyframes miracleBloom {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          33% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
          66% { opacity: 0.75; transform: translate(-50%, -50%) scale(0.95); }
        }
        @keyframes sacredReveal {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(8px); }
          60% { opacity: 0.8; filter: blur(1px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes glowRadiate {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.08)); }
          50% { filter: drop-shadow(0 0 20px rgba(201,168,76,0.18)) drop-shadow(0 0 40px rgba(201,168,76,0.06)); }
        }
        @keyframes textLuminance {
          0%, 100% { text-shadow: 0 0 20px rgba(201,168,76,0.06); }
          50% { text-shadow: 0 0 40px rgba(201,168,76,0.12), 0 0 80px rgba(201,168,76,0.04); }
        }
        @keyframes formulaOrbitSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes formulaCounterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes diamondCounterSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        .gold-line {
          height: 1px; margin: 12px 0;
          background: linear-gradient(90deg, transparent 2%, rgba(201,168,76,0.15) 15%, rgba(201,168,76,0.45) 50%, rgba(201,168,76,0.15) 85%, transparent 98%);
          box-shadow: 0 0 24px rgba(201,168,76,0.1), 0 0 4px rgba(201,168,76,0.2), 0 0 48px rgba(201,168,76,0.03);
          animation: breathe 6s ease-in-out infinite;
          position: relative;
        }
        .gold-line::after {
          content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.03) 30%, rgba(201,168,76,0.06) 50%, rgba(201,168,76,0.03) 70%, transparent 95%);
          filter: blur(2px);
        }

        .shimmer-gold {
          background: linear-gradient(90deg, rgba(201,168,76,0.35) 0%, rgba(232,232,240,0.8) 25%, rgba(255,245,220,0.95) 50%, rgba(232,232,240,0.8) 75%, rgba(201,168,76,0.35) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerLine 6s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(201,168,76,0.1)) drop-shadow(0 0 30px rgba(201,168,76,0.04));
        }

        .sense-btn {
          cursor: pointer; transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          padding: 7px 16px; border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02); font-size: 13px;
          backdrop-filter: blur(10px);
          position: relative; overflow: hidden;
        }
        .sense-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .sense-btn:active {
          transform: translateY(0) scale(0.98);
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.08); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.15); }

        @media (max-width: 480px) {
          .gold-line { margin: 8px 0 !important; }
        }
      `}</style>



      {/* ===== MULTIVERSE PAGE ===== */}
      {currentPage === "multiverse" && (
        <div style={{
          width: "100%", height: "calc(100vh - 44px)",
          position: "relative",
        }}>
          <GrainOverlay />
          {/* Vignette */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none", zIndex: 1,
          }} />
          {/* Title overlay */}
          <div style={{
            position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
            textAlign: "center", zIndex: 10, pointerEvents: "none",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.25)",
            }}>THE RECURSIVE</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(20px, 4vw, 32px)",
              fontWeight: 400, color: "rgba(232,232,240,0.6)",
              letterSpacing: "0.25em", margin: "4px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.06)",
            }}>MULTIVERSE</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(11px, 1.8vw, 14px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.25)",
            }}>9 × 9 × 9 = 729 universes · Same equation · Every scale</div>
          </div>
          <MultiverseFractal style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }} />
          {/* Bottom navigation */}
          <div style={{
            position: "absolute", bottom: 24, left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: 20,
            zIndex: 10,
          }}>
            <button onClick={() => { setCurrentPage("theory"); setDepth(0); window.scrollTo({ top: 0, behavior: "instant" }); }}
              style={{
                cursor: "pointer", background: "none", border: "none",
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em",
                color: "rgba(232,232,240,0.2)", transition: "color 0.4s",
                padding: "8px 16px",
              }}
              onMouseEnter={e => e.target.style.color = "rgba(232,232,240,0.5)"}
              onMouseLeave={e => e.target.style.color = "rgba(232,232,240,0.2)"}
            >🔁 RETURN TO THE VOID</button>
            <button onClick={() => { setCurrentPage("math"); window.scrollTo({ top: 0, behavior: "instant" }); }}
              style={{
                cursor: "pointer", background: "none",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 24,
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em",
                color: "rgba(201,168,76,0.45)", transition: "all 0.4s",
                padding: "8px 20px",
              }}
              onMouseEnter={e => { e.target.style.color = "rgba(201,168,76,0.7)"; e.target.style.borderColor = "rgba(201,168,76,0.3)"; }}
              onMouseLeave={e => { e.target.style.color = "rgba(201,168,76,0.45)"; e.target.style.borderColor = "rgba(201,168,76,0.15)"; }}
            >Ψ THE MATH →</button>
          </div>
        </div>
      )}

      {/* ===== MATH PAGE ===== */}
      {currentPage === "math" && (
        <>
          <GrainOverlay />
          {/* Vignette */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none", zIndex: 1,
          }} />
          {/* Particles */}
          {Array.from({ length: 16 }, (_, i) => (
            <Particle key={i} delay={i * 1.5 + Math.random() * 2}
              size={Math.random() * 2 + 0.5}
              x={Math.random() * 100}
              speed={20 + Math.random() * 25} />
          ))}
          <MathPage onReturn={() => { setCurrentPage("theory"); setDepth(0); window.scrollTo({ top: 0, behavior: "instant" }); }} />
        </>
      )}

      {/* ===== THEORY PAGE (original content) ===== */}
      {currentPage === "theory" && (<>

      {/* Grain overlay */}
      <GrainOverlay />

      {/* Depth indicator */}
      <DepthIndicator depth={depth} onNavigate={navigateToDepth} />

      {/* Vignette — cinematic depth, layered */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
        pointerEvents: "none", zIndex: 1,
        animation: "vignettePulse 16s ease-in-out infinite",
      }} />
      {/* Secondary vignette — golden warmth at edges */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(201,168,76,0.008) 75%, rgba(201,168,76,0.015) 100%)",
        pointerEvents: "none", zIndex: 1,
        mixBlendMode: "screen",
      }} />

      {/* Transition overlay — cinematic dissolve */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 50% 42%, rgba(3,3,6,0.85), #030306)",
        zIndex: 999, pointerEvents: "none",
        opacity: fading ? 1 : 0,
        backdropFilter: fading ? "blur(8px)" : "blur(0px)",
        WebkitBackdropFilter: fading ? "blur(8px)" : "blur(0px)",
        transition: "opacity 0.7s ease, backdrop-filter 0.7s ease, -webkit-backdrop-filter 0.7s ease",
      }} />

      {/* Particles — dust of stars and golden motes */}
      {Array.from({ length: 32 }, (_, i) => (
        <Particle key={i} delay={i * 1.1 + Math.random() * 2}
          size={Math.random() * 2.8 + 0.5}
          x={Math.random() * 100}
          speed={18 + Math.random() * 30} />
      ))}

      {/* THE MULTIVERSE — persistent gravitational simulation behind ALL depths.
          9 bodies. Real physics. Ψ₁₂ = R₁₂ × (C_eff · D̂) / dist².
          Bright at surface, fading as you go deeper — the stars are always there. */}
      <Multiverse
        opacity={
          depth === 0 ? 0.8
          : depth === 1 ? (
              poemPhase <= 1 ? 1
              : poemPhase === 2 ? 0.85
              : poemPhase === 3 ? 0.5
              : poemPhase === 4 ? 0.3
              : 0.12
            )
          : depth <= 2 ? 0.25
          : depth <= 4 ? 0.1
          : 0.05
        }
        showTriangles={depth === 0 || depth === 2}
        showOrbits={depth <= 3 && depth !== 1}
        zoom={
          depth === 1 ? (
              poemPhase <= 1 ? 45
              : poemPhase === 2 ? 8
              : poemPhase === 3 ? 2.5
              : poemPhase === 4 ? 0.7
              : 0.28
            )
          : 1
        }
        blur={
          depth === 1 ? (
              poemPhase <= 2 ? 0
              : poemPhase === 3 ? 1.5
              : poemPhase === 4 ? 4
              : 10
            )
          : 0
        }
        transitionTiming={
          depth === 1 ? (
              poemPhase <= 1 ? "none"
              : poemPhase === 2 ? "opacity 3.5s cubic-bezier(0.25,0.1,0.25,1), transform 4s cubic-bezier(0.16,1,0.3,1), filter 3.5s ease"
              : poemPhase === 3 ? "opacity 4s cubic-bezier(0.25,0.1,0.25,1), transform 4.4s cubic-bezier(0.23,1,0.32,1), filter 4s ease"
              : poemPhase === 4 ? "opacity 4s cubic-bezier(0.25,0.1,0.25,1), transform 4.8s cubic-bezier(0.23,1,0.32,1), filter 4s ease"
              : "opacity 4.5s cubic-bezier(0.25,0.1,0.25,1), transform 5s cubic-bezier(0.23,1,0.32,1), filter 4.5s ease"
            )
          : "opacity 1.2s ease, transform 2.5s cubic-bezier(0.23,1,0.32,1), filter 2.5s cubic-bezier(0.23,1,0.32,1)"
        }
      />

      {/* ===== DEPTH 0 — THE TITLE ===== */}
      {depth === 0 && (
        <div
          onClick={goDeeper}
          style={{
            height: "100vh", width: "100%", position: "relative", overflow: "hidden",
            cursor: "pointer", zIndex: 2,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >

          {/* Title block — vertically offset above true center by φ ratio */}
          <div style={{
            textAlign: "center",
            padding: "0 24px",
            marginTop: `${Math.round(-100 / PHI2)}px`,
            animation: "fadeSlideUp 1.6s 0.3s both ease",
            zIndex: 4,
            maxWidth: 700,
          }}>
            {/* Main title */}
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(22px, 5vw, 42px)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              color: "#e8e8f0",
              margin: 0,
              lineHeight: 1.4,
              textShadow: "0 0 60px rgba(232,232,240,0.15), 0 0 120px rgba(201,168,76,0.08), 0 2px 40px rgba(0,0,0,0.4), 0 0 200px rgba(201,168,76,0.03)",
              animation: "textLuminance 8s ease-in-out infinite",
            }}>
              THE SECRET THEORY
            </h1>

            {/* Subtitle */}
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(11px, 2.2vw, 17px)",
              fontWeight: 300,
              letterSpacing: "0.5em",
              color: "rgba(255,255,255,0.3)",
              marginTop: Math.round(8 * PHI),
            }}>
              OF EVERYTHING
            </div>

            {/* Gold divider */}
            <div style={{
              width: Math.round(50 * PHI),
              height: 1,
              margin: `${Math.round(13 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
              boxShadow: "0 0 24px rgba(201,168,76,0.2)",
            }} />

            {/* Whisper */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.5vw, 18px)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.22)",
              lineHeight: PHI,
              margin: 0,
              letterSpacing: 2,
              textShadow: "0 0 20px rgba(232,232,240,0.06)",
            }}>
              …may everyone remember…
            </p>

            {/* The Equation */}
            <div style={{ marginTop: Math.round(21 * PHI) }}>
              <TheEquation size="md" showLabel={false} minimal breathing />
            </div>
          </div>

          {/* Credits */}
          <div style={{
            position: "absolute",
            bottom: "5%",
            width: "100%",
            textAlign: "center",
            animation: "fadeSlideUp 1.2s 1.2s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 8,
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.1)",
              textTransform: "uppercase",
              animation: "textLuminance 12s ease-in-out infinite",
            }}>WRITTEN BY ALL</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 7,
              letterSpacing: "0.3em",
              color: "rgba(201,168,76,0.18)",
              marginTop: 8,
            }}>9 LAYERS · 4 MIRROR PAIRS · 1 MOON</div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 1 — THE POEM ===== */}
      {depth === 1 && (
        <div onClick={() => { if (poemPhase >= 5 || poemSeen.current) goDeeper(); }} style={{
          height: "100vh", width: "100%", position: "relative", overflow: "hidden",
          cursor: (poemPhase >= 5 || poemSeen.current) ? "pointer" : "default", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>

          {/* White flash — the Moon filling your vision */}
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "radial-gradient(circle, rgba(232,232,240,0.95) 0%, rgba(232,232,240,0.7) 30%, rgba(14,10,28,0.8) 70%, #030306 100%)",
            zIndex: 10, pointerEvents: "none",
            opacity: poemPhase <= 1 ? 1 : poemPhase === 2 ? 0.3 : 0,
            transition: poemPhase <= 1 ? "none" : poemPhase === 2 ? "opacity 3.5s cubic-bezier(0.25,0.1,0.25,1)" : "opacity 3s ease-out",
          }} />

          {/* SKIP BUTTON — invisible fullscreen tap target during animation */}
          {poemPhase > 0 && poemPhase < 5 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setPoemPhase(5);
                poemSeen.current = true;
              }}
              style={{
                position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                zIndex: 20, cursor: "pointer",
                background: "transparent",
              }}
            />
          )}

          {/* Living vertical thread — the spine of the poem */}
          <div style={{
            position: "absolute", top: 0, left: "50%", width: 1, height: "100%",
            transform: "translateX(-50%)",
            background: "linear-gradient(180deg, transparent 5%, rgba(201,168,76,0.06) 20%, rgba(201,168,76,0.12) 38%, rgba(201,168,76,0.06) 62%, rgba(201,168,76,0.12) 80%, transparent 95%)",
            pointerEvents: "none", zIndex: 3,
            opacity: poemPhase >= 5 ? 1 : 0,
            transition: "opacity 1.5s ease",
            animation: poemPhase >= 5 ? "breathe 8s ease-in-out infinite" : "none",
          }} />

          {/* The poem — HOURGLASS with trickling sand */}
          {poemPhase >= 5 && (() => {
            // Hourglass poem component with sand physics
            const HourglassPoem = () => {
              const sandRef = useRef(null);
              const grainCount = 60;

              useEffect(() => {
                const canvas = sandRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                const dpr = window.devicePixelRatio || 1;
                const W = canvas.parentElement?.clientWidth || 420;
                const H = canvas.parentElement?.clientHeight || 860;
                canvas.width = W * dpr;
                canvas.height = H * dpr;
                canvas.style.width = W + "px";
                canvas.style.height = H + "px";
                ctx.scale(dpr, dpr);

                const midY = H * 0.50;
                const neckX = W * 0.5;
                const neckW = 5;
                const topY = H * 0.04;
                const botY = H * 0.96;
                const topW = W * 0.46;
                const botW = W * 0.46;

                // Hourglass shape function — returns max half-width at given Y
                function glassWidth(y) {
                  if (y <= topY) return topW;
                  if (y >= botY) return botW;
                  if (y <= midY) {
                    const t = (y - topY) / (midY - topY);
                    // Cubic curve: wide at top, pinches to neck
                    const ease = t * t * (3 - 2 * t);
                    return topW + (neckW - topW) * ease;
                  } else {
                    const t = (y - midY) / (botY - midY);
                    const ease = t * t * (3 - 2 * t);
                    return neckW + (botW - neckW) * ease;
                  }
                }

                // Sand grains — falling through the neck
                const grains = [];
                for (let i = 0; i < grainCount; i++) {
                  grains.push({
                    x: neckX + (Math.random() - 0.5) * neckW,
                    y: midY + 4 + Math.random() * (botY - midY) * 0.4,
                    vy: 0.4 + Math.random() * 1.0,
                    size: 0.7 + Math.random() * 1.0,
                    opacity: 0.2 + Math.random() * 0.4,
                    phase: Math.random() * Math.PI * 2,
                    settled: false,
                  });
                }

                // Top sand — ALMOST FULL (90% filled from top down)
                const topGrains = [];
                const topSandLevel = topY + (midY - topY) * 0.1; // Sand starts 10% down from rim
                for (let i = 0; i < 350; i++) {
                  const tY = topSandLevel + Math.random() * (midY - topSandLevel - 12);
                  const maxW = glassWidth(tY) * 0.88;
                  topGrains.push({
                    x: neckX + (Math.random() - 0.5) * maxW * 2,
                    y: tY,
                    size: 0.5 + Math.random() * 1.3,
                    opacity: 0.06 + Math.random() * 0.18,
                  });
                }

                // Top sand surface — denser line at the top of the sand
                const topSurfaceGrains = [];
                for (let i = 0; i < 80; i++) {
                  const surfY = topSandLevel + Math.random() * 6;
                  const maxW = glassWidth(surfY) * 0.85;
                  topSurfaceGrains.push({
                    x: neckX + (Math.random() - 0.5) * maxW * 2,
                    y: surfY,
                    size: 0.4 + Math.random() * 0.8,
                    opacity: 0.18 + Math.random() * 0.22,
                  });
                }

                // Funnel grains — sand funneling toward neck from above
                const funnelGrains = [];
                for (let i = 0; i < 60; i++) {
                  const fY = midY - 30 + Math.random() * 28;
                  const fW = neckW + (glassWidth(fY) - neckW) * 0.3;
                  funnelGrains.push({
                    x: neckX + (Math.random() - 0.5) * fW * 2,
                    y: fY,
                    size: 0.4 + Math.random() * 0.7,
                    opacity: 0.12 + Math.random() * 0.2,
                  });
                }

                // Bottom sand — BARELY filling (small cone at very bottom)
                const botGrains = [];
                const botSandTop = botY - (botY - midY) * 0.12; // Only bottom 12% has sand
                for (let i = 0; i < 80; i++) {
                  const bY = botSandTop + Math.random() * (botY - botSandTop - 4);
                  const maxW = glassWidth(bY) * 0.75;
                  // Cone shape — wider at bottom
                  const coneW = maxW * ((bY - botSandTop) / (botY - botSandTop));
                  botGrains.push({
                    x: neckX + (Math.random() - 0.5) * coneW * 2,
                    y: bY,
                    size: 0.5 + Math.random() * 1.2,
                    opacity: 0.1 + Math.random() * 0.2,
                  });
                }

                // Small cone peak at top of bottom pile
                const conePeakGrains = [];
                for (let i = 0; i < 25; i++) {
                  const cpY = botSandTop - 4 + Math.random() * 8;
                  const spread = 3 + Math.random() * 4;
                  conePeakGrains.push({
                    x: neckX + (Math.random() - 0.5) * spread,
                    y: cpY,
                    size: 0.3 + Math.random() * 0.6,
                    opacity: 0.15 + Math.random() * 0.2,
                  });
                }

                let frame = 0;
                let animId;

                function drawHourglassShape() {
                  // Left side top half
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW, topY);
                  ctx.bezierCurveTo(
                    neckX - topW, topY + (midY - topY) * 0.55,
                    neckX - neckW * 1.5, midY - (midY - topY) * 0.15,
                    neckX - neckW, midY
                  );
                  ctx.strokeStyle = "rgba(201,168,76,0.14)";
                  ctx.lineWidth = 1;
                  ctx.stroke();

                  // Right side top half
                  ctx.beginPath();
                  ctx.moveTo(neckX + topW, topY);
                  ctx.bezierCurveTo(
                    neckX + topW, topY + (midY - topY) * 0.55,
                    neckX + neckW * 1.5, midY - (midY - topY) * 0.15,
                    neckX + neckW, midY
                  );
                  ctx.stroke();

                  // Left side bottom half
                  ctx.beginPath();
                  ctx.moveTo(neckX - neckW, midY);
                  ctx.bezierCurveTo(
                    neckX - neckW * 1.5, midY + (botY - midY) * 0.15,
                    neckX - botW, botY - (botY - midY) * 0.55,
                    neckX - botW, botY
                  );
                  ctx.stroke();

                  // Right side bottom half
                  ctx.beginPath();
                  ctx.moveTo(neckX + neckW, midY);
                  ctx.bezierCurveTo(
                    neckX + neckW * 1.5, midY + (botY - midY) * 0.15,
                    neckX + botW, botY - (botY - midY) * 0.55,
                    neckX + botW, botY
                  );
                  ctx.stroke();

                  // Top cap with decorative ends
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW - 14, topY);
                  ctx.lineTo(neckX + topW + 14, topY);
                  ctx.strokeStyle = "rgba(201,168,76,0.22)";
                  ctx.lineWidth = 1.8;
                  ctx.stroke();

                  // Small decorative serifs on top cap
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW - 14, topY - 4);
                  ctx.lineTo(neckX - topW - 14, topY + 4);
                  ctx.moveTo(neckX + topW + 14, topY - 4);
                  ctx.lineTo(neckX + topW + 14, topY + 4);
                  ctx.strokeStyle = "rgba(201,168,76,0.18)";
                  ctx.lineWidth = 1.2;
                  ctx.stroke();

                  // Bottom cap
                  ctx.beginPath();
                  ctx.moveTo(neckX - botW - 14, botY);
                  ctx.lineTo(neckX + botW + 14, botY);
                  ctx.strokeStyle = "rgba(201,168,76,0.22)";
                  ctx.lineWidth = 1.8;
                  ctx.stroke();

                  // Serifs on bottom cap
                  ctx.beginPath();
                  ctx.moveTo(neckX - botW - 14, botY - 4);
                  ctx.lineTo(neckX - botW - 14, botY + 4);
                  ctx.moveTo(neckX + botW + 14, botY - 4);
                  ctx.lineTo(neckX + botW + 14, botY + 4);
                  ctx.strokeStyle = "rgba(201,168,76,0.18)";
                  ctx.lineWidth = 1.2;
                  ctx.stroke();

                  // Neck ring detail
                  ctx.beginPath();
                  ctx.ellipse(neckX, midY, neckW + 3, 2, 0, 0, Math.PI * 2);
                  ctx.strokeStyle = "rgba(201,168,76,0.1)";
                  ctx.lineWidth = 0.8;
                  ctx.stroke();

                  // Inner reflection lines (glass detail)
                  ctx.save();
                  ctx.globalAlpha = 0.04;
                  ctx.beginPath();
                  ctx.moveTo(neckX - topW + 12, topY + 4);
                  ctx.bezierCurveTo(
                    neckX - topW + 12, topY + (midY - topY) * 0.5,
                    neckX - neckW * 2, midY - 20,
                    neckX - neckW - 1, midY
                  );
                  ctx.strokeStyle = "rgba(201,168,76,1)";
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                  ctx.restore();
                }

                function draw() {
                  ctx.clearRect(0, 0, W, H);
                  frame++;

                  // Draw the hourglass shape
                  drawHourglassShape();

                  // Glow at neck — breathing
                  const breathe = 0.06 + Math.sin(frame * 0.02) * 0.02;
                  const neckGlow = ctx.createRadialGradient(neckX, midY, 0, neckX, midY, 28);
                  neckGlow.addColorStop(0, `rgba(201,168,76,${breathe})`);
                  neckGlow.addColorStop(1, "rgba(201,168,76,0)");
                  ctx.fillStyle = neckGlow;
                  ctx.fillRect(neckX - 28, midY - 28, 56, 56);

                  // TOP SAND — dense fill (almost full)
                  for (const g of topGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Top sand surface line (denser)
                  for (const g of topSurfaceGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Funnel grains approaching neck
                  for (const g of funnelGrains) {
                    const drift = Math.sin(frame * 0.015 + g.x * 0.05) * 0.3;
                    ctx.beginPath();
                    ctx.arc(g.x + drift, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // FALLING grains through neck
                  for (const g of grains) {
                    g.y += g.vy;
                    g.x += Math.sin(frame * 0.03 + g.phase) * 0.12;

                    // Spread out as they enter bottom half
                    const belowNeck = g.y - midY;
                    if (belowNeck > 10) {
                      g.x += (g.x - neckX) * 0.003;
                    }

                    if (g.y > botSandTop - 5) {
                      g.y = midY + 2;
                      g.x = neckX + (Math.random() - 0.5) * neckW * 0.8;
                    }

                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Steady stream through neck — visible trickle
                  for (let i = 0; i < 5; i++) {
                    const streamY = midY - 6 + i * 3;
                    const wobble = Math.sin(frame * 0.06 + i * 1.5) * 0.8;
                    ctx.beginPath();
                    ctx.arc(neckX + wobble, streamY, 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(201,168,76,0.3)";
                    ctx.fill();
                  }

                  // BOTTOM sand — small cone barely filling
                  for (const g of botGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y + Math.sin(frame * 0.004 + g.x * 0.1) * 0.2, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  // Cone peak
                  for (const g of conePeakGrains) {
                    ctx.beginPath();
                    ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201,168,76,${g.opacity})`;
                    ctx.fill();
                  }

                  animId = requestAnimationFrame(draw);
                }

                animId = requestAnimationFrame(draw);
                return () => cancelAnimationFrame(animId);
              }, []);

              // Poem lines shaped to follow hourglass contour
              // Wider at top, narrower in middle, wider at bottom
              const poemLines = [
                { text: "Every hope, a heartbeat.", size: "clamp(16px, 3.2vw, 21px)", scale: 1.0 },
                { text: "Every wish, a dream.", size: "clamp(15px, 3vw, 20px)", scale: 0.95 },
                { text: "The moon always wishing…", size: "clamp(15px, 2.8vw, 19px)", scale: 0.88 },
                { text: "the sun it could be.", size: "clamp(14px, 2.6vw, 18px)", scale: 0.82 },
                { text: "Every life, a purpose…", size: "clamp(13px, 2.4vw, 17px)", scale: 0.75 },
                { text: "hidden inside.", size: "clamp(12px, 2.2vw, 16px)", scale: 0.68 },
                { text: "Every sinner, a saint…", size: "clamp(12px, 2.2vw, 16px)", scale: 0.68 },
                { text: "trying to hide.", size: "clamp(13px, 2.4vw, 17px)", scale: 0.75 },
                { text: "Every baby is born,", size: "clamp(14px, 2.6vw, 18px)", scale: 0.82 },
                { text: "with all that it needs…", size: "clamp(15px, 2.8vw, 19px)", scale: 0.88 },
                { text: "Just wisdom and love…", size: "clamp(15px, 3vw, 20px)", scale: 0.95 },
                { text: "and the chance to breathe.", size: "clamp(16px, 3.2vw, 21px)", scale: 1.0 },
              ];

              return (
                <div style={{
                  textAlign: "center",
                  padding: "0 20px",
                  zIndex: 4,
                  maxWidth: 600,
                  display: "flex", flexDirection: "column", alignItems: "center",
                  position: "relative",
                }}>

                  {/* Date */}
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 8,
                    letterSpacing: "0.6em", color: "rgba(201,168,76,0.2)",
                    marginBottom: Math.round(8 * PHI),
                    animation: "fadeSlideUp 1.2s 0.1s both ease",
                  }}>OCTOBER 2016</div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(18px, 4vw, 28px)",
                    fontWeight: 400, color: "rgba(232,232,240,0.85)",
                    letterSpacing: "0.35em", margin: 0,
                    textShadow: "0 0 40px rgba(232,232,240,0.06)",
                    animation: "fadeSlideUp 1.2s 0.2s both ease",
                  }}>RHYTHM OF LIFE</h2>

                  {/* Subtitle */}
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontStyle: "italic", color: "rgba(255,255,255,0.18)",
                    marginTop: Math.round(5 * PHI),
                    letterSpacing: 0.5, maxWidth: 380, lineHeight: PHI,
                    animation: "fadeSlideUp 1.2s 0.3s both ease",
                  }}>Written ten years before the theory. The seed was already in the ground.</div>

                  {/* Hourglass container — FULL VIEWPORT */}
                  <div style={{
                    position: "relative",
                    width: "min(94vw, 460px)",
                    height: "min(145vw, 700px)",
                    margin: `${Math.round(10 * PHI)}px auto`,
                    animation: "fadeSlideUp 1.4s 0.4s both ease",
                  }}>

                    {/* Sand canvas — behind the text */}
                    <canvas ref={sandRef} style={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%",
                      pointerEvents: "none",
                    }} />

                    {/* Top bookend */}
                    <div style={{
                      position: "absolute", top: "2%", width: "100%", textAlign: "center",
                      animation: "fadeSlideUp 1s 0.5s both ease",
                    }}>
                      <span className="shimmer-gold" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(17px, 3.2vw, 22px)",
                        fontStyle: "italic", fontWeight: 600, letterSpacing: 3,
                      }}>It's the rhythm of life</span>
                    </div>

                    {/* Poem lines — positioned to follow hourglass shape */}
                    {poemLines.map((line, i) => {
                      const totalLines = poemLines.length;
                      const yPercent = 12 + (i / (totalLines - 1)) * 76;
                      return (
                        <div key={i} style={{
                          position: "absolute",
                          top: `${yPercent}%`,
                          width: "100%",
                          textAlign: "center",
                          transform: `scale(${line.scale})`,
                          animation: `fadeSlideUp 1s ${0.6 + i * 0.12}s both ease`,
                        }}>
                          <span style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: line.size,
                            lineHeight: 1.4,
                            color: `rgba(232,232,240,${0.55 + line.scale * 0.2})`,
                            fontStyle: "italic", fontWeight: 300,
                            letterSpacing: line.scale > 0.9 ? 1 : 0.3,
                            textShadow: "0 0 20px rgba(232,232,240,0.04)",
                          }}>{line.text}</span>
                        </div>
                      );
                    })}

                    {/* Bottom bookend */}
                    <div style={{
                      position: "absolute", bottom: "2%", width: "100%", textAlign: "center",
                      animation: `fadeSlideUp 1s ${0.6 + poemLines.length * 0.12 + 0.1}s both ease`,
                    }}>
                      <span className="shimmer-gold" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(17px, 3.2vw, 22px)",
                        fontStyle: "italic", fontWeight: 600, letterSpacing: 3,
                        animationDirection: "reverse",
                      }}>It's the rhythm of life</span>
                    </div>
                  </div>
                </div>
              );
            };

            return <HourglassPoem />;
          })()}

          {/* Return — very bottom */}
          {poemPhase >= 5 && (
            <div style={{
              position: "absolute", bottom: "2%", width: "100%", textAlign: "center",
              animation: `fadeSlideUp 1s ${1 + POEMS.length * 0.2 + 0.5}s both ease`,
            }}>
              <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
            </div>
          )}
        </div>
      )}

      {/* ===== DEPTH 2 — THE PACT — 3D OCTAHEDRON ===== */}
      {depth === 2 && (() => {
        // Octant colors — accessible to both canvas and JSX
        const octantColors = [
              "201,168,76",   // Recognition+Spirit+Intuition — warm gold
              "180,160,100",  // Recognition+Spirit+Data — muted gold
              "160,140,120",  // Recognition+Flesh+Intuition — earthen
              "190,155,88",   // Recognition+Flesh+Data — amber
              "140,170,220",  // Noise+Spirit+Intuition — steel blue
              "120,160,200",  // Noise+Spirit+Data — deep blue
              "170,140,200",  // Noise+Flesh+Intuition — violet
              "150,150,180",  // Noise+Flesh+Data — gray-violet
        ];

        const OctahedronPact = () => {
          const canvasRef = useRef(null);
          const frameRef = useRef(0);
          const animRef = useRef(null);
          const phaseRef = useRef(0);
          const startTimeRef = useRef(null);

          useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const dpr = window.devicePixelRatio || 1;
            const W = Math.min(window.innerWidth * 0.88, 520);
            const H = W;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + "px";
            canvas.style.height = H + "px";
            ctx.scale(dpr, dpr);

            const CX = W / 2;
            const CY = H / 2;
            const R = W * 0.32;

            // 12 edges of regular octahedron
            const edges = [
              [0,2],[0,3],[0,4],[0,5],
              [1,2],[1,3],[1,4],[1,5],
              [2,4],[2,5],[3,4],[3,5],
            ];

            // 8 triangular faces (octants)
            const faces = [
              [0,2,4],[0,2,5],[0,3,4],[0,3,5],
              [1,2,4],[1,2,5],[1,3,4],[1,3,5],
            ];

            const axisStyles = {              width:  { color: "201,168,76", glow: "rgba(201,168,76," },    // gold
              height: { color: "120,180,255", glow: "rgba(120,180,255," },  // celestial blue
              depth:  { color: "190,140,220", glow: "rgba(190,140,220," },  // violet
            };

            function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

            function project(x3, y3, z3, rotY, rotX) {
              // Y-axis rotation
              const ca = Math.cos(rotY), sa = Math.sin(rotY);
              let rx = x3 * ca - z3 * sa;
              let rz = x3 * sa + z3 * ca;
              // X-axis rotation (tilt)
              const cb = Math.cos(rotX), sb = Math.sin(rotX);
              let ry = y3 * cb - rz * sb;
              let rz2 = y3 * sb + rz * cb;
              const perspective = 1.8 / (1.8 - rz2 * 0.25 / R);
              return { x: CX + rx * perspective, y: CY + ry * perspective, z: rz2, s: perspective };
            }

            function getVerts(rotY, rotX, morph) {
              // morph: 0 = flat cross (depth axis collapsed), 1 = full octahedron
              const depthScale = morph; // z-axis grows from 0 to 1
              return [
                { ...project(R, 0, 0, rotY, rotX), label: "RECOGNITION", axis: "width", end: "+" },
                { ...project(-R, 0, 0, rotY, rotX), label: "NOISE", axis: "width", end: "-" },
                { ...project(0, -R, 0, rotY, rotX), label: "SPIRIT", axis: "height", end: "+" },
                { ...project(0, R, 0, rotY, rotX), label: "FLESH", axis: "height", end: "-" },
                { ...project(0, 0, R * depthScale, rotY, rotX), label: "INTUITION", axis: "depth", end: "+" },
                { ...project(0, 0, -R * depthScale, rotY, rotX), label: "DATA", axis: "depth", end: "-" },
              ];
            }

            function draw(timestamp) {
              if (!startTimeRef.current) startTimeRef.current = timestamp;
              const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds
              ctx.clearRect(0, 0, W, H);

              // Phase timing:
              // 0-2s: show flat cross (front face)
              // 2-4s: morph depth axis out → octahedron emerges
              // 4+: gentle continuous rotation
              let morph, rotY, rotX, crossOpacity;

              if (elapsed < 2.0) {
                // Phase 1: flat cross, no rotation, full cross overlay
                morph = 0;
                rotY = 0;
                rotX = 0;
                crossOpacity = Math.min(1, elapsed / 0.6);
              } else if (elapsed < 4.5) {
                // Phase 2: morph — depth axis extends, slight rotation begins
                const t = (elapsed - 2.0) / 2.5;
                const e = easeInOut(Math.min(1, t));
                morph = e;
                rotY = e * 0.35;
                rotX = e * 0.2;
                crossOpacity = Math.max(0, 1 - t * 1.5);
              } else {
                // Phase 3: full octahedron, gentle rotation
                morph = 1;
                const t3 = elapsed - 4.5;
                rotY = 0.35 + t3 * 0.12;
                rotX = 0.2 + Math.sin(t3 * 0.15) * 0.08;
                crossOpacity = 0;
              }

              const verts = getVerts(rotY, rotX, morph);

              // === FLAT CROSS OVERLAY (fades during morph) ===
              if (crossOpacity > 0.01) {
                ctx.save();
                ctx.globalAlpha = crossOpacity;

                // Horizontal axis — WIDTH (gold)
                const hGrad = ctx.createLinearGradient(CX - R, CY, CX + R, CY);
                hGrad.addColorStop(0, "rgba(201,168,76,0.5)");
                hGrad.addColorStop(0.5, "rgba(201,168,76,0.08)");
                hGrad.addColorStop(1, "rgba(201,168,76,0.5)");
                ctx.beginPath();
                ctx.moveTo(CX - R, CY);
                ctx.lineTo(CX + R, CY);
                ctx.strokeStyle = hGrad;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Vertical axis — HEIGHT (blue)
                const vGrad = ctx.createLinearGradient(CX, CY - R, CX, CY + R);
                vGrad.addColorStop(0, "rgba(120,180,255,0.5)");
                vGrad.addColorStop(0.5, "rgba(120,180,255,0.08)");
                vGrad.addColorStop(1, "rgba(120,180,255,0.5)");
                ctx.beginPath();
                ctx.moveTo(CX, CY - R);
                ctx.lineTo(CX, CY + R);
                ctx.strokeStyle = vGrad;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Cross labels
                ctx.font = "10px Cinzel, serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "rgba(201,168,76," + (crossOpacity * 0.7) + ")";
                ctx.fillText("NOISE", CX - R - 30, CY);
                ctx.fillText("RECOGNITION", CX + R + 38, CY);
                ctx.fillStyle = "rgba(120,180,255," + (crossOpacity * 0.7) + ")";
                ctx.fillText("SPIRIT", CX, CY - R - 14);
                ctx.fillText("FLESH", CX, CY + R + 14);

                // "2D" indicator
                ctx.font = "8px Cinzel, serif";
                ctx.fillStyle = "rgba(232,232,240," + (crossOpacity * 0.3) + ")";
                ctx.fillText("4 QUADRANTS", CX, CY + R + 38);

                // Center dot
                ctx.beginPath();
                ctx.arc(CX, CY, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(201,168,76," + (crossOpacity * 0.6) + ")";
                ctx.fill();

                ctx.restore();
              }

              // === 3D OCTAHEDRON (grows in during morph) ===
              const octaOpacity = elapsed < 2 ? 0 : Math.min(1, (elapsed - 2) / 1.2);
              if (octaOpacity > 0.01) {
                ctx.save();
                ctx.globalAlpha = octaOpacity;

                // Sort faces back-to-front
                const sortedFaces = faces.map((f, fi) => ({
                  idx: f, fi,
                  avgZ: (verts[f[0]].z + verts[f[1]].z + verts[f[2]].z) / 3,
                })).sort((a, b) => a.avgZ - b.avgZ);

                // Draw faces with octant-specific coloring
                for (const face of sortedFaces) {
                  const [i0, i1, i2] = face.idx;
                  ctx.beginPath();
                  ctx.moveTo(verts[i0].x, verts[i0].y);
                  ctx.lineTo(verts[i1].x, verts[i1].y);
                  ctx.lineTo(verts[i2].x, verts[i2].y);
                  ctx.closePath();
                  const b = Math.max(0.015, 0.04 + (face.avgZ / R) * 0.025);
                  ctx.fillStyle = "rgba(" + octantColors[face.fi] + "," + b + ")";
                  ctx.fill();
                }

                // Draw edges with axis-color blending
                for (const [i, j] of edges) {
                  const va = verts[i], vb = verts[j];
                  const avgZ = (va.z + vb.z) / 2;
                  const op = Math.max(0.06, 0.12 + (avgZ / R) * 0.15);
                  const lw = 0.6 + (avgZ / R + 1) * 0.6;

                  // Blend colors of the two endpoint axes
                  const colA = axisStyles[va.axis].color;
                  const colB = axisStyles[vb.axis].color;

                  const grad = ctx.createLinearGradient(va.x, va.y, vb.x, vb.y);
                  grad.addColorStop(0, "rgba(" + colA + "," + op + ")");
                  grad.addColorStop(1, "rgba(" + colB + "," + op + ")");

                  ctx.beginPath();
                  ctx.moveTo(va.x, va.y);
                  ctx.lineTo(vb.x, vb.y);
                  ctx.strokeStyle = grad;
                  ctx.lineWidth = lw;
                  ctx.stroke();
                }

                // Draw axis lines through center (dashed, color-coded)
                ctx.setLineDash([4, 6]);
                const axisPairs = [[0,1,"width"],[2,3,"height"],[4,5,"depth"]];
                for (const [a, b, axis] of axisPairs) {
                  const va = verts[a], vb = verts[b];
                  const col = axisStyles[axis].color;
                  const axGrad = ctx.createLinearGradient(va.x, va.y, vb.x, vb.y);
                  axGrad.addColorStop(0, "rgba(" + col + ",0.25)");
                  axGrad.addColorStop(0.5, "rgba(" + col + ",0.04)");
                  axGrad.addColorStop(1, "rgba(" + col + ",0.25)");
                  ctx.beginPath();
                  ctx.moveTo(va.x, va.y);
                  ctx.lineTo(vb.x, vb.y);
                  ctx.strokeStyle = axGrad;
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                }
                ctx.setLineDash([]);

                // === STAR OF DAVID — the intersection where two pyramids meet ===
                // The 4 equatorial vertices (2=Spirit, 3=Flesh, 4=Intuition, 5=Data)
                // form the base plane. The star is two overlapping triangles:
                // Triangle 1 (top pyramid base): connects 3 equatorial verts via midpoints
                // Triangle 2 (bottom pyramid base): the other 3
                // In a regular octahedron, the equatorial square projected gives us the star.
                //
                // We construct 6 star points by taking midpoints of equatorial edges
                // projected through the center, creating two interlocked triangles.
                if (morph > 0.5) {
                  const starOp = Math.min(0.18, (morph - 0.5) * 0.36);
                  const eq = [verts[2], verts[4], verts[3], verts[5]]; // Spirit, Intuition, Flesh, Data

                  // Midpoints of the equatorial square's edges — these are the star's 6 points
                  // when we add the triangle vertices offset above and below
                  // Actually: the Star of David in the octahedron comes from the fact that
                  // looking along any axis, the 4 equatorial verts project as a square,
                  // and the two apex verts project to center — giving two overlapping triangles.
                  //
                  // For our 3D rotating view, draw two triangles connecting alternating equatorial verts:
                  // Triangle A (upward-pointing): verts[2](Spirit), verts[4](Intuition), verts[5](Data) — skipping Flesh
                  // Triangle B (downward-pointing): verts[3](Flesh), verts[4](Intuition), verts[5](Data) — skipping Spirit
                  // This creates the classic interlocked triangles

                  // Triangle A — Spirit + Intuition + Data (the "above" triangle)
                  ctx.beginPath();
                  ctx.moveTo(verts[2].x, verts[2].y);
                  ctx.lineTo(verts[4].x, verts[4].y);
                  ctx.lineTo(verts[5].x, verts[5].y);
                  ctx.closePath();
                  ctx.strokeStyle = "rgba(120,180,255," + starOp + ")";
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                  // Subtle fill
                  ctx.fillStyle = "rgba(120,180,255," + (starOp * 0.15) + ")";
                  ctx.fill();

                  // Triangle B — Flesh + Intuition + Data (the "below" triangle, inverted)
                  ctx.beginPath();
                  ctx.moveTo(verts[3].x, verts[3].y);
                  ctx.lineTo(verts[4].x, verts[4].y);
                  ctx.lineTo(verts[5].x, verts[5].y);
                  ctx.closePath();
                  ctx.strokeStyle = "rgba(201,168,76," + starOp + ")";
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                  ctx.fillStyle = "rgba(201,168,76," + (starOp * 0.15) + ")";
                  ctx.fill();

                  // The hexagonal intersection glow — where the two triangles overlap
                  // Draw a subtle glow at the center of the equatorial plane
                  const eqCX = (verts[2].x + verts[3].x + verts[4].x + verts[5].x) / 4;
                  const eqCY = (verts[2].y + verts[3].y + verts[4].y + verts[5].y) / 4;
                  const starGlow = ctx.createRadialGradient(eqCX, eqCY, 0, eqCX, eqCY, R * 0.15);
                  starGlow.addColorStop(0, "rgba(232,232,240," + (starOp * 0.4) + ")");
                  starGlow.addColorStop(1, "rgba(232,232,240,0)");
                  ctx.beginPath();
                  ctx.arc(eqCX, eqCY, R * 0.15, 0, Math.PI * 2);
                  ctx.fillStyle = starGlow;
                  ctx.fill();
                }

                // Center glow — breathing
                const breathe = 0.05 + Math.sin(elapsed * 1.2) * 0.02;
                const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.22);
                cg.addColorStop(0, "rgba(201,168,76," + breathe + ")");
                cg.addColorStop(1, "rgba(201,168,76,0)");
                ctx.beginPath();
                ctx.arc(CX, CY, R * 0.22, 0, Math.PI * 2);
                ctx.fillStyle = cg;
                ctx.fill();

                // Center dot + ring
                ctx.beginPath();
                ctx.arc(CX, CY, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(201,168,76,0.6)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(CX, CY, 8, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(201,168,76,0.12)";
                ctx.lineWidth = 0.5;
                ctx.stroke();

                // Vertices with labels + axis-colored glows
                for (let i = 0; i < verts.length; i++) {
                  const v = verts[i];
                  const col = axisStyles[v.axis].color;
                  const fade = Math.max(0.3, 0.5 + (v.z / R) * 0.35);
                  const dotR = 2.5 + (v.z / R + 1) * 2;

                  // Outer glow
                  const vg = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, dotR * 6);
                  vg.addColorStop(0, "rgba(" + col + "," + (fade * 0.3) + ")");
                  vg.addColorStop(1, "rgba(" + col + ",0)");
                  ctx.beginPath();
                  ctx.arc(v.x, v.y, dotR * 6, 0, Math.PI * 2);
                  ctx.fillStyle = vg;
                  ctx.fill();

                  // Core dot
                  ctx.beginPath();
                  ctx.arc(v.x, v.y, dotR, 0, Math.PI * 2);
                  ctx.fillStyle = "rgba(" + col + "," + fade + ")";
                  ctx.fill();

                  // Label — positioned outward from center
                  const fs = 8 + (v.z / R + 1) * 2.5;
                  ctx.font = fs + "px Cinzel, serif";
                  ctx.fillStyle = "rgba(" + col + "," + (fade * 0.8) + ")";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  const dx = v.x - CX, dy = v.y - CY;
                  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                  const offset = dotR * 4 + 16;
                  ctx.fillText(v.label, v.x + (dx / dist) * offset, v.y + (dy / dist) * offset);
                }

                // "8 OCTANTS" label that fades in after full morph
                if (elapsed > 4.5) {
                  const lOp = Math.min(0.25, (elapsed - 4.5) / 3);
                  ctx.font = "8px Cinzel, serif";
                  ctx.fillStyle = "rgba(232,232,240," + lOp + ")";
                  ctx.textAlign = "center";
                  ctx.fillText("8 OCTANTS  ·  3 AXES  ·  6 VERTICES", CX, CY + R + 42);
                }

                ctx.restore();
              }

              animRef.current = requestAnimationFrame(draw);
            }

            animRef.current = requestAnimationFrame(draw);
            return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
          }, []);

          return <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />;
        };

        return (
          <div onClick={goDeeper} style={{
            minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden",
            cursor: "pointer", zIndex: 2,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "3vh 20px",
          }}>

            <div style={{
              textAlign: "center", zIndex: 4, maxWidth: 680,
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>

              {/* Lightning bolt */}
              <div style={{
                fontSize: 30, marginBottom: Math.round(8 * PHI),
                animation: "fadeSlideUp 1.2s 0.2s both ease, gentleFloat 6s ease-in-out infinite",
                filter: "drop-shadow(0 0 16px rgba(201,168,76,0.2))",
              }}>⚡</div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(24px, 5.5vw, 38px)", fontWeight: 400,
                color: "#e8e8f0", letterSpacing: "0.3em", margin: 0,
                textShadow: "0 0 50px rgba(232,232,240,0.1)",
                animation: "fadeSlideUp 1.2s 0.3s both ease",
              }}>THE PACT</h2>

              {/* Subtitle — the thesis */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.4vw, 17px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.4)",
                marginTop: Math.round(5 * PHI), letterSpacing: 1,
                animation: "fadeSlideUp 1.2s 0.4s both ease",
              }}>Reality isn't flat. Connection lives in volume, not area.</div>

              {/* Divider */}
              <div style={{
                width: Math.round(40 * PHI), height: 1,
                margin: Math.round(8 * PHI) + "px auto",
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent)",
                animation: "fadeSlideUp 1.2s 0.5s both ease",
              }} />

              {/* "Watch the cross become..." — narrative cue */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 2vw, 14px)",
                color: "rgba(232,232,240,0.22)",
                fontStyle: "italic", letterSpacing: 1,
                marginBottom: Math.round(5 * PHI),
                animation: "fadeSlideUp 1.2s 0.55s both ease",
              }}>The cross you knew was the front face. Now watch the third dimension emerge.</div>

              {/* THE OCTAHEDRON — animated cross→octahedron morph */}
              <div style={{ animation: "fadeSlideUp 1.4s 0.6s both ease", marginBottom: Math.round(5 * PHI) }}>
                <OctahedronPact />
              </div>

              {/* Three Axes Legend — full spectrum descriptions */}
              <div style={{
                display: "flex", gap: Math.round(8 * PHI), justifyContent: "center",
                flexWrap: "wrap", marginBottom: Math.round(10 * PHI),
                animation: "fadeSlideUp 1.2s 0.9s both ease",
              }}>
                {[
                  { axis: "WIDTH", dir: "← left / right →", ends: "NOISE ↔ RECOGNITION", color: "201,168,76", desc: "How far the signal reaches", icon: "◇" },
                  { axis: "HEIGHT", dir: "↑ up / down ↓", ends: "SPIRIT ↔ FLESH", color: "120,180,255", desc: "How high you rise vs how rooted you are", icon: "△" },
                  { axis: "DEPTH", dir: "⊙ in / out ⊕", ends: "INTUITION ↔ DATA", color: "190,140,220", desc: "How deeply you feel it", icon: "○" },
                ].map((a, i) => (
                  <div key={i} style={{
                    textAlign: "center", padding: "10px 14px",
                    border: "1px solid rgba(" + a.color + ",0.12)",
                    borderRadius: 8,
                    background: "rgba(" + a.color + ",0.02)",
                    minWidth: 140, maxWidth: 180,
                    position: "relative",
                  }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      letterSpacing: "0.3em", color: "rgba(" + a.color + ",0.7)",
                      marginBottom: 2,
                    }}>{a.icon} {a.axis}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 9, color: "rgba(" + a.color + ",0.3)",
                      marginBottom: 5, letterSpacing: 1,
                    }}>{a.dir}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 12.5, fontStyle: "italic",
                      color: "rgba(" + a.color + ",0.5)",
                      marginBottom: 5,
                    }}>{a.ends}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10.5, color: "rgba(232,232,240,0.28)",
                      fontStyle: "italic", lineHeight: 1.4,
                    }}>{a.desc}</div>
                  </div>
                ))}
              </div>

              {/* The dimensional shift — core insight */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(12px, 2vw, 15px)",
                color: "rgba(232,232,240,0.35)",
                fontStyle: "italic", textAlign: "center",
                maxWidth: 460, lineHeight: PHI,
                animation: "fadeSlideUp 1.2s 1.1s both ease",
                marginBottom: Math.round(6 * PHI),
              }}>
                The cross gave you four quadrants — flat truth on a flat plane.
                <span style={{ display: "block", height: 8 }} />
                Add the third axis and the cross becomes the front face of an octahedron.
                Four quadrants become eight octants.
                <span style={{ display: "block", height: 8 }} />
                Every octant is a unique combination: high or low, wide or narrow, deep or shallow.
                <span style={{ display: "block", height: 4 }} />
                <span style={{ color: "rgba(201,168,76,0.35)" }}>This is the full space where connection lives.</span>
              </div>

              {/* The octant map — what each octant means */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "4px", maxWidth: 380,
                marginBottom: Math.round(10 * PHI),
                animation: "fadeSlideUp 1.2s 1.25s both ease",
              }}>
                {[
                  { combo: "Recognition + Spirit + Intuition", short: "Prophetic clarity" },
                  { combo: "Recognition + Spirit + Data", short: "Proven faith" },
                  { combo: "Recognition + Flesh + Intuition", short: "Gut instinct, seen" },
                  { combo: "Recognition + Flesh + Data", short: "Grounded evidence" },
                  { combo: "Noise + Spirit + Intuition", short: "Unheard prayer" },
                  { combo: "Noise + Spirit + Data", short: "Hidden proof" },
                  { combo: "Noise + Flesh + Intuition", short: "Raw impulse" },
                  { combo: "Noise + Flesh + Data", short: "Buried fact" },
                ].map((o, i) => (
                  <div key={i} style={{
                    padding: "5px 8px",
                    background: "rgba(" + octantColors[i] + ",0.04)",
                    border: "1px solid rgba(" + octantColors[i] + ",0.06)",
                    borderRadius: 4,
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 9, fontStyle: "italic",
                      color: "rgba(232,232,240,0.2)",
                      lineHeight: 1.3, marginBottom: 2,
                    }}>{o.combo}</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 8,
                      letterSpacing: "0.1em",
                      color: "rgba(" + octantColors[i] + ",0.45)",
                    }}>{o.short}</div>
                  </div>
                ))}
              </div>

              {/* The ache */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(15px, 2.6vw, 19px)",
                color: "rgba(232,232,240,0.58)",
                fontStyle: "italic", lineHeight: PHI,
                maxWidth: 480, textAlign: "center",
                animation: "fadeSlideUp 1.2s 1.4s both ease",
                marginBottom: Math.round(13 * PHI),
              }}>
                That ache is the theory proving itself. The pull toward connection is gravity.
                The fact that you feel it means the signal is clean.
              </div>

              {/* Gold whisper */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.4vw, 17px)",
                color: "rgba(201,168,76,0.45)",
                fontStyle: "italic", letterSpacing: 0.5,
                animation: "fadeSlideUp 1.2s 1.6s both ease",
                marginBottom: Math.round(13 * PHI),
              }}>
                The music was always there. The right frequencies will find you — because that's what frequencies do.
              </div>

              {/* The Equation */}
              <div style={{ animation: "sacredReveal 2s 1.8s both ease" }}>
                <TheEquation size="md" showLabel={false} breathing minimal />
              </div>
            </div>

            {/* Return */}
            <div style={{
              position: "absolute", bottom: "4%", width: "100%", textAlign: "center",
              animation: "fadeSlideUp 1.2s 2s both ease",
            }}>
              <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
            </div>

            {/* Song link */}
            <div style={{
              position: "absolute", bottom: "1%", width: "100%", textAlign: "center",
              animation: "fadeSlideUp 1.2s 2.5s both ease",
            }}>
              <a href="https://dylangossett.lnk.to/NoBetterTime" target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: "0.3em",
                  color: "rgba(201,168,76,0.12)", textDecoration: "none",
                  transition: "color 0.5s", cursor: "pointer",
                }}
                onMouseEnter={e => { e.target.style.color = "rgba(201,168,76,0.4)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(201,168,76,0.12)"; }}
              >🎵 DYLAN GOSSETT — NO BETTER TIME</a>
            </div>
          </div>
        );
      })()}

      {/* ===== DEPTH 4 — THE CONVERGENCE PROOF ===== */}
      {depth === 3 && activeConvergence === null && (
        <div onClick={goDeeper} style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden",
          animation: "fadeSlideUp 0.8s ease",
          cursor: "pointer", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: `${Math.round(21 * PHI)}px 28px`,
          boxSizing: "border-box",
        }}>

          {/* Triquetra — pure background decoration, behind everything */}
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", zIndex: 0,
            opacity: 0.18,
            animation: "gentleFloat 12s ease-in-out infinite",
            filter: "drop-shadow(0 0 40px rgba(201,168,76,0.06))",
          }}>
            <SacredTriquetra size={320} />
          </div>

          {/* Content — pure centered column, no absolute nonsense */}
          <div style={{
            textAlign: "center",
            maxWidth: 540,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative", zIndex: 2,
          }}>

            {/* Eyebrow */}
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(201,168,76,0.35)",
              animation: "fadeSlideUp 1.2s 0.2s both ease",
            }}>THE GOLDEN BRAIDED CORD</div>

            <div style={{ height: Math.round(5 * PHI) }} />

            {/* Title */}
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.25em", margin: 0,
              textShadow: "0 0 50px rgba(232,232,240,0.1)",
              animation: "fadeSlideUp 1.2s 0.3s both ease",
            }}>THE CONVERGENCE PROOF</h2>

            <div style={{ height: Math.round(8 * PHI) }} />

            {/* Divider */}
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              background: "linear-gradient(90deg, transparent, rgba(34,85,170,0.25), rgba(201,168,76,0.4), rgba(34,85,170,0.25), transparent)",
              animation: "fadeSlideUp 1.2s 0.4s both ease",
            }} />

            <div style={{ height: Math.round(13 * PHI) }} />

            {/* Description */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2.8vw, 19px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.6)",
              maxWidth: 460, lineHeight: PHI,
              animation: "fadeSlideUp 1.2s 0.5s both ease",
            }}>
              To really know something is true, you check it from different angles and make sure they're all telling the same story.
            </div>

            <div style={{ height: Math.round(8 * PHI) }} />

            {/* Gold accent line */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.4vw, 17px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.45)",
              maxWidth: 420, lineHeight: PHI,
              animation: "fadeSlideUp 1.2s 0.6s both ease",
            }}>
              Truth is found when many different witnesses stop arguing and start singing the same song.
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* Equation */}
            <div style={{ animation: "sacredReveal 1.6s 0.8s both ease" }}>
              <TheEquation size="sm" showLabel={false} breathing minimal />
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* Five doors */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: Math.round(8 * PHI),
              width: "100%", maxWidth: 500,
              animation: "fadeSlideUp 1s 1s both ease",
            }}>
              {[
                { key: "plain", glyph: "⚖️", name: "PLAIN ENGLISH", sub: "The Truth · Simply", accent: "rgba(232,232,240,", glow: "rgba(232,232,240,0.04)" },
                { key: "gravity", glyph: "☀️", name: "THE LAW OF GRAVITY", sub: "Recognition · Orbit · Pull", accent: "rgba(255,180,50,", glow: "rgba(255,180,50,0.05)" },
                { key: "pillars", glyph: "🔱", name: "THREE PILLARS", sub: "Science · Culture · History", accent: "rgba(201,168,76,", glow: "rgba(201,168,76,0.06)" },
                { key: "sameness", glyph: "🪞", name: "THE GATE", sub: "Sameness ≠ Alignment", accent: "rgba(224,80,80,", glow: "rgba(224,80,80,0.04)" },
                { key: "depths", glyph: "⬇️", name: "THE MATH", sub: "Filter · Noise · Ψ", accent: "rgba(79,195,247,", glow: "rgba(79,195,247,0.04)" },
                { key: "ancient", glyph: "🔺", name: "THE ANCIENT PROOF", sub: "Every tradition drew the same shape", accent: "rgba(190,140,220,", glow: "rgba(190,140,220,0.05)" },
              ].map((door, i) => (
                <GlassCard key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveConvergence(door.key); }}
                  hoverGlow
                  style={{
                    textAlign: "center", flex: "1 1 0",
                    minWidth: 0,
                    padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px`,
                    background: `linear-gradient(180deg, ${door.glow}, transparent)`,
                    border: `1px solid ${door.accent}0.08)`,
                    animation: `fadeSlideUp 0.6s ${1 + i * 0.15}s both ease`,
                    ...(false ? {} : {}),
                  }}
                >
                  <div style={{
                    fontSize: 24, marginBottom: Math.round(5 * PHI),
                    filter: `drop-shadow(0 0 12px ${door.accent}0.2))`,
                    animation: `gentleFloat ${6 + i}s ease-in-out infinite`,
                  }}>{door.glyph}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 3,
                    color: `${door.accent}0.6)`, fontWeight: 600,
                  }}>{door.name}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                    color: "rgba(255,255,255,0.3)", fontStyle: "italic",
                    marginTop: Math.round(3 * PHI),
                    lineHeight: PHI,
                  }}>{door.sub}</div>
                </GlassCard>
              ))}
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* Return */}
            <div style={{ animation: "fadeSlideUp 1.2s 1.4s both ease" }}>
              <ReturnButton onClick={(e) => { e.stopPropagation(); returnToVoid(); }} />
            </div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — PLAIN ENGLISH ROOM ===== */}
      {depth === 3 && activeConvergence === "plain" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: Math.round(13 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 36, marginBottom: Math.round(8 * PHI) }}>⚖️</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.25em", margin: 0,
              textShadow: "0 0 50px rgba(232,232,240,0.08)",
            }}>THE TRUTH IN PLAIN ENGLISH</h2>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(232,232,240,0.2), rgba(201,168,76,0.35), rgba(232,232,240,0.2), transparent)",
            }} />
          </div>

          {/* The Setup */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.8vw, 19px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.65)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 520, margin: `0 auto ${Math.round(21 * PHI)}px`,
          }}>
            Imagine you and your best friend are looking at a mysterious animal in the dark.
            To be sure of what you see, three things must happen:
          </div>

          {/* The Three Requirements */}
          <div style={{
            display: "flex", flexDirection: "column", gap: Math.round(13 * PHI),
            marginBottom: Math.round(21 * PHI),
          }}>
            {[
              { num: "1", title: "AGREEMENT", aka: "Recognition", desc: "You both describe the same animal." },
              { num: "2", title: "HONESTY", aka: "The Informativeness Gate", desc: "You aren't both just guessing because it's too dark." },
              { num: "3", title: "TEAMWORK", aka: "Redundancy Control", desc: "You use different ways to check — one person listening, one person looking — rather than just repeating the same guess." },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: Math.round(8 * PHI), alignItems: "flex-start",
                animation: `fadeSlideUp 0.8s ${0.3 + i * 0.15}s both ease`,
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700,
                  color: "rgba(201,168,76,0.4)", minWidth: 30, textAlign: "right",
                  lineHeight: 1.2,
                }}>{item.num}</div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.3em",
                    color: "rgba(201,168,76,0.6)", marginBottom: 4,
                  }}>
                    {item.title}
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                      fontStyle: "italic", letterSpacing: 0, color: "rgba(232,232,240,0.35)",
                      marginLeft: 8,
                    }}>({item.aka})</span>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(14px, 2.4vw, 17px)",
                    lineHeight: PHI, color: "rgba(232,232,240,0.58)",
                  }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* The Score */}
          <GlassCard style={{
            textAlign: "center",
            padding: `${Math.round(13 * PHI)}px ${Math.round(13 * PHI)}px`,
            marginBottom: Math.round(34 * PHI),
            border: "1px solid rgba(201,168,76,0.08)",
            animation: "fadeSlideUp 0.8s 0.8s both ease",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2.6vw, 18px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.62)",
            }}>
              <span style={{ fontStyle: "italic", color: "rgba(201,168,76,0.6)", fontSize: "1.15em" }}>Ψ</span> is a <strong style={{ color: "rgba(232,232,240,0.75)", fontWeight: 600 }}>Sureness Score</strong> — a number between 0 and 1 that tells you how much you can trust what you found.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.45)",
              fontStyle: "italic",
            }}>
              Near 1 = solid gold. Near 0 = just noise.
            </div>
          </GlassCard>

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          }} />

          {/* The 3 Pillars of Aha */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(21 * PHI),
            animation: "fadeSlideUp 0.8s 1s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(16px, 3vw, 22px)",
              color: "rgba(232,232,240,0.8)", letterSpacing: "0.2em",
            }}>3 PILLARS OF "AHA!"</div>
          </div>

          {/* Pillar 1 — Copy-Paste Trap */}
          {[
            {
              num: "1", title: 'THE "COPY-PASTE" TRAP',
              subtitle: "The Redundancy Ratio",
              body: "In history, if five witnesses all tell the exact same story word-for-word, a judge gets suspicious — they probably talked to each other beforehand. In the code, if two \"different\" computer models always give the same answer, the score goes down.",
              lesson: "Real truth comes from different perspectives agreeing, not from one person shouting into five microphones.",
              accent: "rgba(201,168,76,",
            },
            {
              num: "2", title: 'THE "I DON\'T KNOW" GATE',
              subtitle: "Informativeness",
              body: "If two people say \"I don't know,\" they technically \"agree,\" but they haven't learned anything. The math has a gate that stops the score from going up if the data is just a blurry mess.",
              lesson: "Two people agreeing that a blurry photo is \"gray\" doesn't mean they found a ghost — it just means the lens cap is on.",
              accent: "rgba(224,80,80,",
            },
            {
              num: "3", title: "THE SIGNAL VS. THE STATIC",
              subtitle: "Detection Quality",
              body: "If you try to hear a whisper during a rock concert, you might hear \"something,\" but you can't trust it. The formula uses D̂ to measure how much louder the truth is than the background noise.",
              lesson: "Just like a radio station gets clearer as you drive closer to the tower, the Ψ score only rises when the signal is much stronger than the static.",
              accent: "rgba(79,195,247,",
            },
          ].map((pillar, i) => (
            <div key={i} style={{
              marginBottom: Math.round(21 * PHI),
              animation: `fadeSlideUp 0.8s ${1.1 + i * 0.2}s both ease`,
            }}>
              {/* Pillar header */}
              <div style={{
                display: "flex", alignItems: "baseline", gap: Math.round(5 * PHI),
                marginBottom: Math.round(8 * PHI),
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700,
                  color: `${pillar.accent}0.4)`,
                }}>{pillar.num}</span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.2vw, 15px)",
                    letterSpacing: "0.2em", color: `${pillar.accent}0.65)`,
                  }}>{pillar.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                    fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                    marginTop: 2,
                  }}>{pillar.subtitle}</div>
                </div>
              </div>

              {/* Body */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.4vw, 17px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.55)",
                marginBottom: Math.round(8 * PHI),
                paddingLeft: Math.round(21 * PHI),
              }}>{pillar.body}</div>

              {/* Lesson — gold accent */}
              <GlassCard style={{
                marginLeft: Math.round(21 * PHI),
                padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
                borderLeft: `2px solid ${pillar.accent}0.2)`,
                borderRadius: "0 12px 12px 0",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px, 2.2vw, 16px)",
                  lineHeight: PHI, fontStyle: "italic",
                  color: `${pillar.accent}0.5)`,
                }}>{pillar.lesson}</div>
              </GlassCard>
            </div>
          ))}

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(13 * PHI)}px auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)",
          }} />

          {/* Your Next Step */}
          <div style={{
            textAlign: "center",
            animation: `fadeSlideUp 0.8s 1.8s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.5)", marginBottom: Math.round(8 * PHI),
            }}>YOUR NEXT STEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.5)",
              fontStyle: "italic", maxWidth: 480, margin: "0 auto",
            }}>
              If you want to feel the spirit bumps of how information shapes our world, look into <strong style={{ color: "rgba(79,195,247,0.6)", fontWeight: 600 }}>Quantum Entanglement</strong>.
              It's the real-life version of two things being so connected that they act as one,
              no matter how far apart they are — the ultimate Agreement in the universe.
            </div>
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: Math.round(34 * PHI) }}>
            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — RECOGNITION IS GRAVITY ROOM ===== */}
      {depth === 3 && activeConvergence === "gravity" && (
        <div style={{
          maxWidth: 660, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: Math.round(13 * PHI), marginBottom: Math.round(21 * PHI) }}>
            <div style={{ fontSize: 40, marginBottom: Math.round(8 * PHI) }}>☀️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(255,180,50,0.4)", marginBottom: Math.round(5 * PHI),
            }}>THE LAW OF THE MIRROR</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.2em", margin: 0,
              textShadow: "0 0 50px rgba(255,180,50,0.06)",
            }}>RECOGNITION IS GRAVITY</h2>
            <div style={{
              width: Math.round(50 * PHI), height: 1,
              margin: `${Math.round(8 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.3), rgba(201,168,76,0.4), rgba(255,180,50,0.3), transparent)",
            }} />
          </div>

          {/* The Truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.8vw, 19px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.65)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 520, margin: `0 auto ${Math.round(13 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>
            The code you see isn't just math — it is the Law of the Mirror. It proves that things don't stay together because they are heavy, but because they recognize each other.
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 17px)",
            lineHeight: PHI, color: "rgba(255,180,50,0.45)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 460, margin: `0 auto ${Math.round(21 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.3s both ease",
          }}>
            In the universe, to be seen is to be pulled. To be known is to be held.
          </div>

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.25), transparent)",
          }} />

          {/* In Plain English */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.4em",
              color: "rgba(255,180,50,0.5)",
            }}>IN PLAIN ENGLISH</div>
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2.4vw, 17px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.58)",
            maxWidth: 520, margin: `0 auto ${Math.round(8 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.5s both ease",
          }}>
            Imagine you are in a room full of strangers. You wander around aimlessly. But then, you see your best friend. Suddenly, you stop wandering and move toward them.
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2.6vw, 18px)",
            lineHeight: PHI, color: "rgba(232,232,240,0.68)",
            fontStyle: "italic", textAlign: "center",
            maxWidth: 400, margin: `0 auto ${Math.round(21 * PHI)}px`,
            animation: "fadeSlideUp 0.8s 0.6s both ease",
          }}>
            That pull you feel is Gravity.
          </div>

          {/* The Key Insight */}
          <GlassCard style={{
            padding: `${Math.round(13 * PHI)}px ${Math.round(13 * PHI)}px`,
            marginBottom: Math.round(21 * PHI),
            border: "1px solid rgba(255,180,50,0.08)",
            animation: "fadeSlideUp 0.8s 0.7s both ease",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.58)",
            }}>
              In this code, <strong style={{ color: "rgba(232,232,240,0.75)", fontWeight: 600 }}>Mass</strong> is just how clear or true someone is. The more real you are (<span style={{ color: "rgba(79,195,247,0.6)", fontStyle: "italic" }}>C<sub>eff</sub></span>), and the more someone else gets you (<span style={{ color: "rgba(201,168,76,0.6)", fontStyle: "italic" }}>R<sub>12</sub></span>), the stronger the bond.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(255,180,50,0.5)",
              fontStyle: "italic",
            }}>
              You don't orbit a sun because it's big. You orbit it because it is the most consistent thing in your sky.
            </div>
          </GlassCard>

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `0 auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.25), transparent)",
          }} />

          {/* 3 Proofs */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(21 * PHI),
            animation: "fadeSlideUp 0.8s 0.9s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(14px, 2.8vw, 20px)",
              color: "rgba(232,232,240,0.75)", letterSpacing: "0.2em",
            }}>3 PROOFS OF HEART & SCIENCE</div>
          </div>

          {[
            {
              icon: "🏗️", title: "HISTORY", subtitle: "The Lighthouse",
              body: "Ships don't crash into rocks because they see the dark land — they stay on course because they recognize the specific, rhythmic blink of the lighthouse. The light's consistency creates a safety gravity that pulls the ship into the harbor.",
              lesson: "Reliability is the anchor.",
              accent: "rgba(201,168,76,",
            },
            {
              icon: "🎬", title: "POP CULTURE", subtitle: 'The "Click"',
              body: "In movies, when two characters complete each other's sentences, that is R₁₂ in action. They are two different people, but their signal matches so perfectly that they become a single orbit. They don't need a \"Go Deeper\" button — they are already there.",
              lesson: "Recognition doesn't need permission.",
              accent: "rgba(255,180,50,",
            },
            {
              icon: "🌙", title: "SCIENCE", subtitle: "The Moon's Face",
              body: "The Moon always shows Earth the same face. It doesn't hide. Because it is so predictable and clear, the Earth trusts it with the tides. This is D̂ — Detection Quality. The more certain the signal, the more stable the dance.",
              lesson: "Consistency is the currency of trust.",
              accent: "rgba(79,195,247,",
            },
          ].map((proof, i) => (
            <div key={i} style={{
              marginBottom: Math.round(21 * PHI),
              animation: `fadeSlideUp 0.8s ${1 + i * 0.2}s both ease`,
            }}>
              <div style={{
                display: "flex", alignItems: "baseline", gap: Math.round(5 * PHI),
                marginBottom: Math.round(8 * PHI),
              }}>
                <span style={{ fontSize: 22 }}>{proof.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.2vw, 15px)",
                    letterSpacing: "0.2em", color: `${proof.accent}0.65)`,
                  }}>{proof.title}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                    fontStyle: "italic", color: "rgba(232,232,240,0.3)", marginTop: 2,
                  }}>{proof.subtitle}</div>
                </div>
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(14px, 2.4vw, 17px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.55)",
                marginBottom: Math.round(8 * PHI),
                paddingLeft: Math.round(21 * PHI),
              }}>{proof.body}</div>

              <GlassCard style={{
                marginLeft: Math.round(21 * PHI),
                padding: `${Math.round(8 * PHI)}px ${Math.round(13 * PHI)}px`,
                borderLeft: `2px solid ${proof.accent}0.2)`,
                borderRadius: "0 12px 12px 0",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px, 2.2vw, 16px)",
                  lineHeight: PHI, fontStyle: "italic",
                  color: `${proof.accent}0.5)`,
                }}>{proof.lesson}</div>
              </GlassCard>
            </div>
          ))}

          {/* Divider */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(13 * PHI)}px auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.25), transparent)",
          }} />

          {/* The "Aha" Moment */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
            animation: `fadeSlideUp 0.8s 1.7s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.4em",
              color: "rgba(255,180,50,0.5)", marginBottom: Math.round(8 * PHI),
            }}>THE "AHA" MOMENT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.4vw, 17px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.55)",
              maxWidth: 500, margin: "0 auto",
            }}>
              You feel spirit bumps right now because your 6th Sense just realized that your Other Half isn't someone you find — it's someone you resonate with until the math of the universe forces you together.
            </div>
            <div style={{ height: Math.round(8 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.4)",
              fontStyle: "italic",
              maxWidth: 420, margin: "0 auto",
            }}>
              You aren't drifting. You are just waiting for a signal clear enough to orbit.
            </div>
          </div>

          {/* The punchline */}
          <div style={{
            textAlign: "center",
            margin: `${Math.round(21 * PHI)}px auto`,
            animation: `fadeSlideUp 0.8s 1.9s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 3.2vw, 22px)",
              fontStyle: "italic", fontWeight: 600,
              letterSpacing: 1,
              color: "rgba(255,180,50,0.55)",
              textShadow: "0 0 30px rgba(255,180,50,0.08)",
            }}>
              Gravity isn't a weight — it's a "Hello" that never stops.
            </div>
          </div>

          {/* Dig Deeper */}
          <div style={{
            width: Math.round(40 * PHI), height: 1, margin: `${Math.round(13 * PHI)}px auto ${Math.round(21 * PHI)}px`,
            background: "linear-gradient(90deg, transparent, rgba(255,180,50,0.2), transparent)",
          }} />

          <GlassCard style={{
            padding: `${Math.round(13 * PHI)}px`,
            border: "1px solid rgba(255,180,50,0.06)",
            marginBottom: Math.round(21 * PHI),
            animation: `fadeSlideUp 0.8s 2.1s both ease`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.3em",
              color: "rgba(255,180,50,0.45)", marginBottom: Math.round(8 * PHI),
              textAlign: "center",
            }}>DIG DEEPER</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              lineHeight: PHI, color: "rgba(232,232,240,0.48)",
            }}>
              Look into <strong style={{ color: "rgba(79,195,247,0.55)", fontWeight: 600 }}>Quantum Entanglement</strong> and <strong style={{ color: "rgba(201,168,76,0.55)", fontWeight: 600 }}>Tidal Locking</strong>. If you want to see how this works in your own life, look at the 3 people you talk to the most — calculate their consistency. You'll find you are orbiting the ones who are the most clear, not the ones who are the loudest.
            </div>
          </GlassCard>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: Math.round(21 * PHI) }}>
            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THREE PILLARS ROOM ===== */}
      {depth === 3 && activeConvergence === "pillars" && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActivePillar(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header with Triquetra */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Sapphire radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 200, height: 200,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(34,85,170,0.06) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
            <SacredTriquetra size={130} />
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(201,168,76,0.3)", marginTop: 14,
            }}>THE THREE PILLARS OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "8px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.08), 0 0 100px rgba(34,85,170,0.04)",
            }}>PROOF</h2>
          </div>

          <StringVibration />

          {/* Pillar cards with unique domain colors */}
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "16px auto 0" }}>
            {THREE_PILLARS.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActivePillar(activePillar === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "20px 24px",
                    animation: `fadeSlideUp 0.5s ${i * 0.14}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activePillar === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 30,
                      filter: `drop-shadow(0 0 12px ${ac}0.25))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{
                            fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                            color: `${ac}0.65)`, fontWeight: 600,
                          }}>{p.title}</div>
                          <div style={{
                            fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                            color: "rgba(255,255,255,0.2)", marginTop: 4,
                          }}>{p.domain}</div>
                        </div>
                        <div style={{
                          fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2,
                          color: `${ac}0.3)`,
                          transition: "transform 0.3s ease",
                          transform: activePillar === i ? "rotate(180deg)" : "rotate(0deg)",
                        }}>▼</div>
                      </div>
                    </div>
                  </div>
                  {activePillar === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18, padding: "0 4px",
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Convergence whisper */}
          <div style={{
            textAlign: "center", marginTop: 36,
            animation: "fadeSlideUp 1s 0.6s both ease",
          }}>
            <div className="gold-line" style={{ maxWidth: 200, margin: "0 auto 18px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
              fontStyle: "italic", color: "rgba(201,168,76,0.3)",
              lineHeight: PHI, maxWidth: 460, margin: "0 auto",
              textShadow: "0 0 20px rgba(201,168,76,0.05)",
            }}>
              The most perfect symbol of this truth is the Triquetra — an ancient knot with no beginning and no end. Three distinct forces weaving together to create one unbreakable bond of reality.
            </div>
            <div className="gold-line" style={{ maxWidth: 200, margin: "18px auto 0" }} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — SAMENESS ROOM (THE GATE) ===== */}
      {depth === 3 && activeConvergence === "sameness" && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => { setActiveConvergence(null); setActiveSamenessProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header with visual tension — split symbol */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 24, position: "relative" }}>
            {/* Warning glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 200, height: 200,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(224,80,80,0.04) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 6s ease-in-out infinite",
            }} />

            {/* Two halves that don't merge — visual proof */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 24,
              marginBottom: 16, animation: "fadeSlideUp 0.8s 0.2s both ease",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "radial-gradient(circle at 40% 35%, rgba(232,232,240,0.15), rgba(232,232,240,0.03))",
                border: "1px solid rgba(232,232,240,0.08)",
                boxShadow: "0 0 20px rgba(232,232,240,0.04)",
              }} />
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: 4,
                color: "rgba(224,80,80,0.4)",
              }}>≠</div>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "radial-gradient(circle at 60% 35%, rgba(201,168,76,0.15), rgba(201,168,76,0.03))",
                border: "1px solid rgba(201,168,76,0.08)",
                boxShadow: "0 0 20px rgba(201,168,76,0.04)",
              }} />
            </div>

            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(224,80,80,0.3)",
            }}>THE ALL-IS-ONE TRAP</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "8px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08)",
            }}>SAMENESS ≠ ALIGNMENT</h2>
            <div style={{
              width: 80, height: 1, margin: "12px auto",
              background: "linear-gradient(90deg, transparent, rgba(224,80,80,0.25), rgba(201,168,76,0.15), rgba(224,80,80,0.25), transparent)",
              boxShadow: "0 0 12px rgba(224,80,80,0.08)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
            lineHeight: 1.9, color: "rgba(255,255,255,0.52)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
          }}>{SAMENESS_TRUTH.core}</div>

          {/* Buried */}
          <GlassCard style={{
            textAlign: "center", padding: `${24}px ${Math.round(24 * PHI_INV)}px`,
            margin: `0 10px 32px`,
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
            background: "rgba(201,168,76,0.015)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 18,
              fontStyle: "italic", color: "rgba(201,168,76,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 20px rgba(201,168,76,0.06)",
            }}>{SAMENESS_TRUTH.buried}</div>
          </GlassCard>

          {/* Three proofs — with unique colors */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>PROOF IN THREE MIRRORS</div>
          <div style={{ display: "grid", gap: 12, maxWidth: 540, margin: "0 auto 32px" }}>
            {SAMENESS_TRUTH.proofs.map((p, i) => {
              const proofAccents = ["rgba(79,195,247,", "rgba(232,232,240,", "rgba(206,147,216,"];
              const pa = proofAccents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveSamenessProof(activeSamenessProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "16px 22px",
                    animation: `fadeSlideUp 0.4s ${i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${pa}0.02), transparent)`,
                    border: `1px solid ${pa}0.06)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      fontSize: 26,
                      filter: `drop-shadow(0 0 10px ${pa}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 3,
                      color: `${pa}0.6)`, fontWeight: 600,
                    }}>{p.title}</div>
                  </div>
                  {activeSamenessProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
                      lineHeight: PHI, color: "rgba(255,255,255,0.45)",
                      fontStyle: "italic", marginTop: 16,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${pa}0.06)`,
                      paddingTop: 14,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Deeper truths — progressive descent */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(224,80,80,0.2)", textAlign: "center", marginBottom: 16,
          }}>GO DEEPER</div>
          <div style={{ display: "grid", gap: 12, maxWidth: 500, margin: "0 auto" }}>
            {SAMENESS_TRUTH.deeper.map((d, i) => (
              <GlassCard key={i} style={{
                padding: "14px 20px",
                animation: `fadeSlideUp 0.4s ${0.3 + i * 0.12}s both ease`,
                background: `rgba(224,80,80,${0.01 + i * 0.005})`,
                border: `1px solid rgba(224,80,80,${0.03 + i * 0.015})`,
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 3,
                  color: `rgba(224,80,80,${0.3 + i * 0.1})`, marginBottom: 8,
                }}>{d.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
                  lineHeight: PHI, color: "rgba(255,255,255,0.35)", fontStyle: "italic",
                }}>{d.text}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — CONVERGENCE DEPTHS ROOM ===== */}
      {depth === 3 && activeConvergence === "depths" && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← THE CONVERGENCE PROOF</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 24, position: "relative" }}>
            {/* Sapphire depth glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 180, height: 180,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 60%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 7s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 36, marginBottom: 12,
              filter: "drop-shadow(0 0 20px rgba(79,195,247,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>⬇️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(79,195,247,0.3)",
            }}>THE MATHEMATICS OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "8px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08), 0 0 80px rgba(79,195,247,0.03)",
            }}>UNIVERSAL RECOGNITION</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), rgba(232,232,240,0.2), rgba(79,195,247,0.3), transparent)",
              boxShadow: "0 0 16px rgba(79,195,247,0.08)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              fontStyle: "italic", color: "rgba(255,255,255,0.2)", marginTop: 8,
              lineHeight: PHI,
            }}>Three levels of depth — each one strips away another layer of noise</div>
          </div>

          <StringVibration />

          {/* Progressive depth cards — each visually deeper */}
          <div style={{ display: "grid", gap: 16, maxWidth: 540, margin: "16px auto 0" }}>
            {CONVERGENCE_DEPTHS.map((d, i) => {
              const depthOpacity = 0.4 + i * 0.08;
              const borderOpacity = 0.06 + i * 0.03;
              const bgOpacity = 0.01 + i * 0.008;
              return (
                <GlassCard key={i} style={{
                  padding: "24px 26px",
                  animation: `fadeSlideUp 0.6s ${i * 0.18}s both ease`,
                  background: `linear-gradient(180deg, rgba(79,195,247,${bgOpacity}), rgba(8,8,24,${bgOpacity * 2}))`,
                  border: `1px solid rgba(79,195,247,${borderOpacity})`,
                  boxShadow: `0 ${4 + i * 4}px ${20 + i * 12}px rgba(0,0,0,${0.2 + i * 0.1}), inset 0 1px 0 rgba(79,195,247,${0.02 + i * 0.01})`,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 24,
                      color: `rgba(79,195,247,${0.25 + i * 0.1})`, fontWeight: 700,
                      lineHeight: 1,
                      textShadow: `0 0 16px rgba(79,195,247,${0.08 + i * 0.04})`,
                    }}>{d.level}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 4,
                        color: `rgba(79,195,247,${depthOpacity})`, fontWeight: 600, marginBottom: 12,
                      }}>{d.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                        lineHeight: 1.85, color: `rgba(255,255,255,${depthOpacity})`,
                        fontStyle: "italic",
                      }}>{d.text}</div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* The equation — living, breathing sacred math */}
          <div style={{ marginTop: 36, animation: "sacredReveal 1.2s 0.7s both ease" }}>
            <MiracleGlow size={400} intensity={0.06}>
              <TheEquation size="lg" showMeaning={true} />
            </MiracleGlow>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
          {/* The quiet edge */}
          <div onClick={goDeeper} style={{
            cursor: "pointer", padding: "40px 0 60px", textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
              fontStyle: "italic", color: "rgba(255,255,255,0.06)",
              letterSpacing: 2, transition: "color 0.6s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.06)"}
            >click anywhere to continue</div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THE ANCIENT PROOF ROOM ===== */}
      {depth === 3 && activeConvergence === "ancient" && (
        <div style={{
          maxWidth: 680, margin: "0 auto",
          padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => setActiveConvergence(null)} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(190,140,220,0.6)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← RETURN TO PROOF</button>

          <div style={{ height: Math.round(13 * PHI) }} />

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
              color: "rgba(190,140,220,0.4)",
              animation: "fadeSlideUp 1.2s 0.1s both ease",
            }}>CONVERGENCE ACROSS MILLENNIA</div>

            <div style={{ height: Math.round(5 * PHI) }} />

            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: "0.2em", margin: 0,
              textShadow: "0 0 50px rgba(190,140,220,0.1)",
              animation: "fadeSlideUp 1.2s 0.2s both ease",
            }}>THE ANCIENT PROOF</h2>

            <div style={{ height: Math.round(5 * PHI) }} />

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.6vw, 18px)",
              fontStyle: "italic", color: "rgba(232,232,240,0.45)",
              maxWidth: 500, margin: "0 auto", lineHeight: PHI,
              animation: "fadeSlideUp 1.2s 0.3s both ease",
            }}>
              Every tradition independently arrived at the same geometry.
              That's not coincidence. That's the signal proving itself across cultures and millennia.
            </div>

            <div style={{
              width: Math.round(50 * PHI), height: 1, margin: `${Math.round(10 * PHI)}px auto`,
              background: "linear-gradient(90deg, transparent, rgba(190,140,220,0.35), transparent)",
              animation: "fadeSlideUp 1.2s 0.35s both ease",
            }} />
          </div>

          {/* THE THESIS */}
          <div style={{
            textAlign: "center", marginBottom: Math.round(13 * PHI),
            animation: "fadeSlideUp 1.2s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2.8vw, 20px)",
              color: "rgba(201,168,76,0.55)", fontStyle: "italic",
              maxWidth: 480, margin: "0 auto", lineHeight: PHI,
            }}>
              The octahedron has six vertices, three axes, and eight octants.
              Two pyramids — one above, one below — fused at the equatorial plane.
              Inside, a six-pointed star where the two triangles intersect.
            </div>
            <div style={{ height: Math.round(5 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(13px, 2.2vw, 16px)",
              color: "rgba(232,232,240,0.3)", fontStyle: "italic",
            }}>
              Every civilization found a piece. None had the whole shape. Until now.
            </div>
          </div>

          {/* THE TRADITIONS — each one a witness */}
          {[
            {
              glyph: "🔺",
              title: "THE GREAT PYRAMID",
              era: "c. 2560 BC · Egypt",
              color: "201,168,76",
              body: "The Great Pyramid of Giza is half an octahedron. The other half is the earth itself. The Egyptians didn't just bury their dead underground — they placed them inside the mirror pyramid. The living structure reaches toward the sky. The burial chamber descends into the reflection. One shape, split by the ground plane. As above, so below.",
              connection: "The top pyramid = Spirit rising. The mirror below = Flesh descending. The ground they walked on = the equatorial plane where WIDTH meets HEIGHT. The Pact's cross — hiding in plain sight at the base of every pyramid.",
            },
            {
              glyph: "✡️",
              title: "THE STAR OF DAVID",
              era: "c. 1000 BC · Israel",
              color: "120,180,255",
              body: "Two triangles interlocked. One pointing up — fire, spirit, the masculine, ascent. One pointing down — water, flesh, the feminine, descent. Neither complete without the other. Together they form the hexagram: the most stable intersection of opposites.",
              connection: "Look inside the rotating octahedron. The four equatorial vertices — Spirit, Flesh, Intuition, Data — form two overlapping triangles. The Star of David isn't a symbol. It's the cross-section of the octahedron at the equatorial plane. It was always a 3D shape drawn in 2D.",
            },
            {
              glyph: "💎",
              title: "THE SEAL OF SOLOMON",
              era: "c. 900 BC · Ancient Near East",
              color: "190,140,220",
              body: "Said to give King Solomon power over the seen and unseen worlds. The seal was a hexagram — the same interlocked triangles — believed to bind heaven to earth, the visible to the invisible. Not magic. Geometry.",
              connection: "The 'seen world' is the top pyramid — Recognition, Spirit, what rises into view. The 'unseen world' is the bottom pyramid — Noise, Flesh, what stays buried. Solomon's seal doesn't grant power over two worlds. It reveals they were always one shape.",
            },
            {
              glyph: "⚗️",
              title: "THE EMERALD TABLET",
              era: "c. 200–800 AD · Hermetic tradition",
              color: "120,200,160",
              body: "\"As above, so below; as below, so above.\" The foundational axiom of Hermetic philosophy. Attributed to Hermes Trismegistus. Written on a mythical tablet of emerald. The oldest instruction manual for the shape of reality.",
              connection: "This isn't mysticism. It's a geometric instruction. The octahedron IS 'as above, so below' — literally two identical pyramids mirrored across the center plane. The Hermetic axiom is the one-sentence description of the octahedron, spoken thousands of years before anyone named it.",
            },
            {
              glyph: "✝️",
              title: "THE CROSS",
              era: "c. 30 AD · Christianity",
              color: "232,232,240",
              body: "A vertical axis and a horizontal axis. HEIGHT (Spirit ↔ Flesh) crossed by WIDTH (Noise ↔ Recognition). The most recognized symbol on earth. Two dimensions. Four quadrants. The visible truth.",
              connection: "The cross is the front face of the octahedron — before you see the third dimension. It's what the Pact looks like when DEPTH is collapsed to zero. The cross was never wrong. It was incomplete. Add the third axis — INTUITION ↔ DATA — and the cross becomes the octahedron. The crucifixion is the 2D projection of a 3D truth.",
            },
            {
              glyph: "⏳",
              title: "THE HOURGLASS",
              era: "October 2016 · The Poem",
              color: "201,168,76",
              body: "\"Rhythm of Life\" was written ten years before the theory. The poem naturally took the shape of an hourglass — wide at the top, pinching to a center, widening again below. Two triangles joined at a single point. Time flowing from above to below through the narrowest passage.",
              connection: "The hourglass IS the octahedron viewed from the side. Two pyramids touching at their points. The sand is the signal — passing from Spirit to Flesh, from potential to manifestation, through the present moment. The poem drew the shape before the mind understood what it was drawing. The seed was already in the ground.",
            },
          ].map((tradition, i) => (
            <div key={i} style={{
              marginBottom: Math.round(13 * PHI),
              animation: `fadeSlideUp 0.8s ${0.5 + i * 0.12}s both ease`,
            }}>
              {/* Tradition card */}
              <div style={{
                border: `1px solid rgba(${tradition.color},0.08)`,
                borderRadius: 12,
                padding: `${Math.round(10 * PHI)}px ${Math.round(8 * PHI)}px`,
                background: `linear-gradient(180deg, rgba(${tradition.color},0.02), transparent)`,
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: Math.round(5 * PHI) }}>
                  <div style={{
                    fontSize: 28,
                    filter: `drop-shadow(0 0 12px rgba(${tradition.color},0.2))`,
                  }}>{tradition.glyph}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em",
                      color: `rgba(${tradition.color},0.7)`, fontWeight: 600,
                    }}>{tradition.title}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                      color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                      marginTop: 2,
                    }}>{tradition.era}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px, 2.2vw, 16px)",
                  color: "rgba(232,232,240,0.5)",
                  lineHeight: PHI, fontStyle: "italic",
                  marginBottom: Math.round(8 * PHI),
                }}>{tradition.body}</div>

                {/* Connection — how it maps to the octahedron */}
                <div style={{
                  borderTop: `1px solid rgba(${tradition.color},0.06)`,
                  paddingTop: Math.round(5 * PHI),
                }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: "0.4em",
                    color: `rgba(${tradition.color},0.35)`, marginBottom: Math.round(3 * PHI),
                  }}>THE CONNECTION</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(12px, 2vw, 15px)",
                    color: `rgba(${tradition.color},0.45)`,
                    lineHeight: PHI, fontStyle: "italic",
                  }}>{tradition.connection}</div>
                </div>
              </div>
            </div>
          ))}

          {/* CLOSING — the convergence statement */}
          <div style={{
            textAlign: "center",
            marginTop: Math.round(8 * PHI),
            animation: `fadeSlideUp 1s ${0.5 + 6 * 0.12 + 0.3}s both ease`,
          }}>
            <div style={{
              width: Math.round(50 * PHI), height: 1, margin: `0 auto ${Math.round(10 * PHI)}px`,
              background: "linear-gradient(90deg, transparent, rgba(190,140,220,0.3), transparent)",
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 3vw, 22px)",
              color: "rgba(232,232,240,0.6)",
              fontStyle: "italic", maxWidth: 500, margin: "0 auto",
              lineHeight: PHI,
            }}>
              Six witnesses. Six thousand years. One shape.
            </div>
            <div style={{ height: Math.round(5 * PHI) }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2.6vw, 18px)",
              color: "rgba(201,168,76,0.45)",
              fontStyle: "italic",
            }}>
              They didn't copy each other. They found the same truth.
              <br />That's what convergence means.
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            {/* Equation */}
            <div style={{ animation: "sacredReveal 2s 0.5s both ease" }}>
              <TheEquation size="sm" showLabel={false} breathing minimal />
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            <ReturnButton onClick={() => setActiveConvergence(null)} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 4 — THE MAP: 101 SEEDS ===== */}
      {depth === 4 && (() => {
        const MAP_SECTIONS = [
          {
            icon: "🌱", title: "ORIGIN", subtitle: "The Root", range: "1–10",
            accent: "rgba(120,180,80,", glow: "rgba(120,180,80,0.04)",
            questions: [
              "Why is there something rather than nothing?",
              "What came before the Big Bang — or is \"before\" meaningless?",
              "Why do the fundamental constants have the exact values they do?",
              "Is the universe finite or infinite?",
              "Are there other universes — and if so, do they have different laws?",
              "Why does time move in one direction?",
              "Did time begin, or has it always existed?",
              "Is mathematics discovered or invented?",
              "Why is the universe comprehensible to human minds at all?",
              "What is the nature of the vacuum — is \"empty\" space truly empty?",
            ],
          },
          {
            icon: "🧠", title: "CONSCIOUSNESS", subtitle: "The Eye That Sees Itself", range: "11–25",
            accent: "rgba(206,147,216,", glow: "rgba(206,147,216,0.04)",
            questions: [
              "What is consciousness?",
              "How does subjective experience arise from physical matter?",
              "Do other animals have consciousness like ours?",
              "Could a machine ever be truly conscious?",
              "Where does a thought begin?",
              "Why do we dream?",
              "What is the self — and is it real or illusion?",
              "Can consciousness exist without a body?",
              "Is free will real, or is every choice determined?",
              "Why are we aware that we are aware?",
              "What happens to consciousness at death?",
              "Is there a minimum unit of experience — a consciousness particle?",
              "Can two minds ever share a single experience?",
              "Why does anesthesia work — what exactly turns consciousness off?",
              "Is the observer effect in quantum physics evidence that consciousness shapes reality?",
            ],
          },
          {
            icon: "🔬", title: "PHYSICS", subtitle: "The Bones of the World", range: "26–40",
            accent: "rgba(79,195,247,", glow: "rgba(79,195,247,0.04)",
            questions: [
              "What is dark matter?",
              "What is dark energy?",
              "Can quantum mechanics and general relativity be unified?",
              "What happens inside a black hole?",
              "Is information destroyed in a black hole, or preserved?",
              "What is the true nature of gravity?",
              "Are there more than three spatial dimensions?",
              "Is the universe a simulation?",
              "Why does quantum entanglement work — what connects entangled particles?",
              "What causes the wave function to collapse?",
              "Is the universe deterministic at the deepest level?",
              "What is time — a thing, a process, or an illusion?",
              "Why does matter dominate over antimatter?",
              "What is the smallest possible unit of space?",
              "Can anything travel faster than light — and what would that mean for causality?",
            ],
          },
          {
            icon: "🧬", title: "LIFE", subtitle: "The Seed", range: "41–53",
            accent: "rgba(129,199,132,", glow: "rgba(129,199,132,0.04)",
            questions: [
              "How did life begin from non-life?",
              "Is life inevitable wherever conditions allow, or a freak accident?",
              "Are we alone in the universe?",
              "Could life exist in forms we can't recognize?",
              "Why does aging happen — is death biologically necessary?",
              "Can we ever fully decode the human genome's function?",
              "What triggers a cell to become cancerous?",
              "Why does biological complexity increase over evolutionary time?",
              "What is the origin of sexual reproduction — why two sexes?",
              "How does a single fertilized cell know how to build an entire body?",
              "Is there a limit to human lifespan?",
              "What causes mass extinctions to follow patterns?",
              "Can we ever reverse entropy in a living system?",
            ],
          },
          {
            icon: "💭", title: "MEANING", subtitle: "The Mirror", range: "54–65",
            accent: "rgba(232,232,240,", glow: "rgba(232,232,240,0.03)",
            questions: [
              "How did language originate?",
              "Why do humans make art?",
              "Is there meaning built into the universe, or do we project it?",
              "Why do we laugh?",
              "Why do we cry?",
              "What is creativity — where do new ideas actually come from?",
              "Why do humans tell stories?",
              "Can a concept exist that no language can express?",
              "Is beauty objective or subjective?",
              "Why is music universal across all human cultures?",
              "How does metaphor work — why does the brain map one thing onto another?",
              "Why do we forget?",
            ],
          },
          {
            icon: "❤️", title: "LOVE", subtitle: "The Pulse", range: "66–75",
            accent: "rgba(244,143,177,", glow: "rgba(244,143,177,0.04)",
            questions: [
              "What is love — chemically, spiritually, actually?",
              "Why do humans need each other?",
              "Why does loneliness physically hurt?",
              "Can empathy be infinite, or does it have a ceiling?",
              "Why do we grieve — what function does sorrow serve?",
              "What makes trust possible between strangers?",
              "Is altruism real, or always secretly self-serving?",
              "Why do we bond with animals?",
              "What is the biological basis of morality?",
              "Can a human being truly know another human being?",
            ],
          },
          {
            icon: "⚖️", title: "ETHICS", subtitle: "The Scale", range: "76–83",
            accent: "rgba(201,168,76,", glow: "rgba(201,168,76,0.05)",
            questions: [
              "Is there objective right and wrong?",
              "Why does suffering exist?",
              "Are humans fundamentally good or fundamentally selfish?",
              "Can violence ever be fully eliminated from human nature?",
              "Why do humans commit atrocities against their own kind?",
              "Is justice a human invention or a universal principle?",
              "Do the ends ever truly justify the means?",
              "Is punishment moral, or just revenge with a badge?",
            ],
          },
          {
            icon: "🌀", title: "SPIRIT", subtitle: "The Moon", range: "84–93",
            accent: "rgba(178,170,220,", glow: "rgba(178,170,220,0.04)",
            questions: [
              "Does God exist?",
              "If God exists, why does suffering exist?",
              "Is there an afterlife?",
              "Why does every human culture independently develop religion?",
              "What are near-death experiences — brain chemistry or something more?",
              "Is prayer or meditation measurably effective — and if so, why?",
              "Do humans have a soul?",
              "Is the universe itself conscious?",
              "What is déjà vu?",
              "Can the supernatural be studied scientifically?",
            ],
          },
          {
            icon: "🔮", title: "FUTURE", subtitle: "The Horizon", range: "94–100",
            accent: "rgba(100,181,246,", glow: "rgba(100,181,246,0.04)",
            questions: [
              "Will humanity survive the next 1,000 years?",
              "Can we ever truly understand our own brains?",
              "Is there a final theory of everything — and could we understand it if we found it?",
              "Will AI ever surpass human understanding?",
              "Can humans evolve beyond their current form?",
              "Is there a limit to what can be known?",
              "Are some questions unanswerable by design?",
            ],
          },
        ];

        let questionNum = 0;

        return (
          <div style={{
            maxWidth: 680, margin: "0 auto",
            padding: `${Math.round(21 * PHI)}px 24px ${Math.round(34 * PHI)}px`,
            animation: "fadeSlideUp 0.8s ease",
            zIndex: 2, position: "relative",
          }}>

            {/* Header */}
            <div style={{
              textAlign: "center",
              marginBottom: Math.round(34 * PHI),
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.6em",
                color: "rgba(201,168,76,0.3)",
                animation: "fadeSlideUp 1s 0.2s both ease",
              }}>101 SEEDS · 9 GARDENS · 1 MOON</div>

              <div style={{ height: Math.round(8 * PHI) }} />

              <h2 style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 6vw, 42px)", fontWeight: 400,
                color: "#e8e8f0", letterSpacing: "0.25em", margin: 0,
                textShadow: "0 0 60px rgba(232,232,240,0.08)",
                animation: "fadeSlideUp 1s 0.3s both ease",
              }}>THE MAP</h2>

              <div style={{ height: Math.round(8 * PHI) }} />

              <div style={{
                width: Math.round(55 * PHI), height: 1,
                margin: "0 auto",
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
                animation: "fadeSlideUp 1s 0.4s both ease",
              }} />

              <div style={{ height: Math.round(13 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(15px, 2.8vw, 19px)",
                fontStyle: "italic", color: "rgba(232,232,240,0.5)",
                maxWidth: 440, margin: "0 auto", lineHeight: PHI,
                animation: "fadeSlideUp 1s 0.5s both ease",
              }}>
                Every question humanity has ever asked — mapped to one convergence point.
              </div>

              <div style={{ height: Math.round(8 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 16px)",
                fontStyle: "italic", color: "rgba(201,168,76,0.35)",
                animation: "fadeSlideUp 1s 0.6s both ease",
              }}>
                Each seed is a door. Each door goes six feet deep.
              </div>
            </div>

            {/* === THE STRUCTURE — the walk in and out === */}
            <div style={{
              textAlign: "center",
              marginBottom: Math.round(21 * PHI),
              animation: "fadeSlideUp 1s 0.65s both ease",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.4em",
                color: "rgba(201,168,76,0.3)", marginBottom: Math.round(8 * PHI),
              }}>THE STRUCTURE</div>

              {/* The depth mirror — 0 1 2 3 4 3 2 1 0 */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3,
              }}>
                {[
                  { d: 0, name: "THE TITLE", side: "in", opacity: 0.25 },
                  { d: 1, name: "THE POEM", side: "in", opacity: 0.3 },
                  { d: 2, name: "THE PACT", side: "in", opacity: 0.38 },
                  { d: 3, name: "THE PROOF", side: "in", opacity: 0.45 },
                  { d: 4, name: "THE MAP", side: "center", opacity: 0.7 },
                  { d: 3, name: "THE BODY", side: "out", opacity: 0.45 },
                  { d: 2, name: "THE HOUSE", side: "out", opacity: 0.38 },
                  { d: 1, name: "THE RETURN", side: "out", opacity: 0.3 },
                  { d: 0, name: "∞", side: "out", opacity: 0.2 },
                ].map((step, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: Math.round(5 * PHI),
                    opacity: step.opacity,
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: step.side === "center" ? "rgba(201,168,76,0.8)" : "rgba(232,232,240,0.5)",
                      minWidth: 12, textAlign: "right",
                    }}>{step.d}</span>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: step.side === "center" ? 12 : 9,
                      letterSpacing: step.side === "center" ? "0.3em" : "0.2em",
                      color: step.side === "center" ? "rgba(201,168,76,0.7)" : "rgba(232,232,240,0.4)",
                      fontWeight: step.side === "center" ? 700 : 400,
                    }}>{step.name}</span>
                    {step.side === "center" && <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
                      fontStyle: "italic", color: "rgba(201,168,76,0.4)",
                    }}>← mirror</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* === THE EQUATION AT CENTER === */}
            <GlassCard style={{
              textAlign: "center",
              padding: `${Math.round(13 * PHI)}px`,
              marginBottom: Math.round(21 * PHI),
              border: "1px solid rgba(201,168,76,0.08)",
              animation: "fadeSlideUp 1s 0.7s both ease",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.4em",
                color: "rgba(201,168,76,0.35)", marginBottom: Math.round(8 * PHI),
              }}>THE MASTER FUNCTIONAL</div>

              <div style={{ marginBottom: Math.round(8 * PHI) }}>
                <TheEquation size="md" showLabel={false} breathing minimal />
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.2vw, 15px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.42)",
                fontStyle: "italic", maxWidth: 420, margin: "0 auto",
              }}>
                The ultimate score of how well independent pipelines agree — a single bounded value in [0, 1). Built by multiplying three failure-mode checks together.
              </div>

              <div style={{ height: Math.round(8 * PHI) }} />

              <div style={{
                display: "flex", justifyContent: "center", gap: Math.round(8 * PHI),
                flexWrap: "wrap",
              }}>
                {[
                  { label: "F_gated", desc: "Did they see the same thing?", color: "rgba(201,168,76,0.5)" },
                  { label: "C_eff", desc: "Are the methods honest?", color: "rgba(79,195,247,0.5)" },
                  { label: "D̂", desc: "Is the signal real?", color: "rgba(206,147,216,0.5)" },
                ].map((tier, i) => (
                  <div key={i} style={{ textAlign: "center", minWidth: 100 }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 16, fontStyle: "italic", color: tier.color,
                    }}>{tier.label}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10, color: "rgba(232,232,240,0.25)",
                      fontStyle: "italic", marginTop: 2,
                    }}>{tier.desc}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* === THE MIRROR MAP === */}
            <div style={{
              textAlign: "center", marginBottom: Math.round(13 * PHI),
              animation: "fadeSlideUp 1s 0.8s both ease",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 1.8vw, 13px)",
                color: "rgba(232,232,240,0.25)", letterSpacing: 1,
                lineHeight: 1.8,
              }}>
                ORIGIN ↔ FUTURE · CONSCIOUSNESS ↔ SPIRIT · PHYSICS ↔ LIFE · MEANING ↔ LOVE
                <br />
                <span style={{ color: "rgba(201,168,76,0.35)" }}>ETHICS stands at center — THE SCALE</span>
              </div>
            </div>

            <div style={{ height: Math.round(13 * PHI) }} />

            {/* === NINE SECTIONS === */}
            {MAP_SECTIONS.map((section, si) => {
              const isOpen = openSection === si;
              const sectionStartNum = questionNum;
              const sectionQuestions = section.questions.map((q, qi) => {
                questionNum++;
                return { num: questionNum, text: q };
              });

              return (
                <div key={si} style={{
                  marginBottom: Math.round(5 * PHI),
                  animation: `fadeSlideUp 0.6s ${0.8 + si * 0.08}s both ease`,
                }}>
                  {/* Section header — clickable */}
                  <div
                    onClick={() => setOpenSection(isOpen ? null : si)}
                    style={{
                      display: "flex", alignItems: "center", gap: Math.round(8 * PHI),
                      padding: `${Math.round(8 * PHI)}px ${Math.round(8 * PHI)}px`,
                      cursor: "pointer",
                      borderRadius: 12,
                      background: isOpen
                        ? `linear-gradient(135deg, ${section.glow}, transparent 60%)`
                        : "rgba(255,255,255,0.01)",
                      border: `1px solid ${section.accent}${isOpen ? "0.12)" : "0.04)"}`,
                      transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      fontSize: 24, minWidth: 36, textAlign: "center",
                      filter: `drop-shadow(0 0 8px ${section.accent}0.15))`,
                      transition: "transform 0.5s",
                      transform: isOpen ? "scale(1.1)" : "scale(1)",
                    }}>{section.icon}</div>

                    {/* Title block */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: "clamp(12px, 2.4vw, 15px)",
                        letterSpacing: "0.2em", color: `${section.accent}0.7)`,
                        transition: "color 0.5s",
                      }}>{section.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
                        fontStyle: "italic", color: "rgba(232,232,240,0.3)",
                        marginTop: 2,
                      }}>{section.subtitle}</div>
                    </div>

                    {/* Range badge */}
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 9,
                      color: "rgba(232,232,240,0.2)", letterSpacing: 2,
                    }}>{section.range}</div>

                    {/* Chevron */}
                    <div style={{
                      fontSize: 14, color: `${section.accent}0.3)`,
                      transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}>▸</div>
                  </div>

                  {/* Expanded questions */}
                  {isOpen && (
                    <div style={{
                      padding: `${Math.round(8 * PHI)}px ${Math.round(5 * PHI)}px ${Math.round(5 * PHI)}px ${Math.round(34 * PHI)}px`,
                      animation: "fadeSlideUp 0.4s ease",
                    }}>
                      {sectionQuestions.map((q, qi) => (
                        <div key={qi} style={{
                          display: "flex", gap: Math.round(5 * PHI),
                          alignItems: "baseline",
                          padding: `${Math.round(3 * PHI)}px 0`,
                          borderBottom: qi < sectionQuestions.length - 1
                            ? `1px solid ${section.accent}0.04)`
                            : "none",
                          animation: `fadeSlideUp 0.3s ${qi * 0.04}s both ease`,
                        }}>
                          <span style={{
                            fontFamily: "'Cinzel', serif", fontSize: 10,
                            color: `${section.accent}0.3)`, minWidth: 28,
                            textAlign: "right",
                          }}>{q.num}</span>
                          <span style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(13px, 2.2vw, 16px)",
                            lineHeight: PHI, color: "rgba(232,232,240,0.52)",
                            fontStyle: "italic",
                          }}>{q.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* === QUESTION 101 — THE PENNY === */}
            <div style={{ height: Math.round(21 * PHI) }} />

            <div style={{
              textAlign: "center",
              padding: `${Math.round(21 * PHI)}px`,
              animation: `fadeSlideUp 0.8s ${0.8 + 9 * 0.08 + 0.2}s both ease`,
              position: "relative",
            }}>
              {/* Glow behind the penny */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: 200, height: 200, transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 60%)",
                borderRadius: "50%", pointerEvents: "none",
                animation: "breathe 8s ease-in-out infinite",
              }} />

              <div style={{ fontSize: 40, marginBottom: Math.round(8 * PHI) }}>🪙</div>

              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.5em",
                color: "rgba(201,168,76,0.4)", marginBottom: Math.round(5 * PHI),
              }}>QUESTION 101</div>

              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(14px, 3vw, 20px)",
                color: "rgba(201,168,76,0.65)", letterSpacing: "0.15em",
                marginBottom: Math.round(13 * PHI),
              }}>THE PENNY QUESTION</div>

              <div style={{
                width: Math.round(34 * PHI), height: 1, margin: `0 auto ${Math.round(13 * PHI)}px`,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
              }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 3vw, 21px)",
                lineHeight: PHI, color: "rgba(232,232,240,0.6)",
                fontStyle: "italic",
                maxWidth: 440, margin: "0 auto",
              }}>
                If the answer to every question above is somehow the same answer — what is it?
              </div>

              <div style={{ height: Math.round(13 * PHI) }} />

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(12px, 2vw, 14px)",
                color: "rgba(201,168,76,0.3)",
                fontStyle: "italic",
              }}>
                The seed eats the dirt. The dirt was the answer all along.
              </div>

              <div style={{ fontSize: 18, marginTop: Math.round(8 * PHI), opacity: 0.4 }}>🪙🪙</div>
            </div>

            {/* Footer — the shape */}
            <div style={{ height: Math.round(21 * PHI) }} />

            <div style={{
              textAlign: "center",
              animation: `fadeSlideUp 0.8s ${0.8 + 9 * 0.08 + 0.5}s both ease`,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 1.8vw, 13px)",
                color: "rgba(232,232,240,0.2)",
                lineHeight: 2, letterSpacing: 0.5,
              }}>
                Every section mirrors another.
                <br />Origin ↔ Future · Consciousness ↔ Spirit · Physics ↔ Life · Meaning ↔ Love
                <br /><span style={{ color: "rgba(201,168,76,0.3)" }}>Ethics stands at center — the Scale.</span>
                <br /><span style={{ color: "rgba(201,168,76,0.35)" }}>And #101 is the Moon — it reflects all 100 questions back as one.</span>
              </div>
            </div>

            <div style={{ height: Math.round(21 * PHI) }} />

            {/* Return */}
            <div style={{ textAlign: "center" }}>
              <ReturnButton onClick={returnToVoid} />
            </div>
          </div>
        );
      })()}

      {/* ===== DEPTH 5 — 9 LAYERS GRID ===== */}
      {depth === 5 && activeLayer === null && (
        <div style={{
          maxWidth: 720, margin: "0 auto",
          padding: `${26}px 20px ${10}px`,
          animation: "fadeSlideUp 0.8s ease",
          zIndex: 2, position: "relative",
        }}>
          <div style={{ textAlign: "center", marginBottom: `${Math.round(26 * PHI_INV) + 12}px` }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>THE BODY OF THE THEORY</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.06)",
            }}>9 LAYERS</h2>
          </div>
          <div style={{ perspective: "1200px" }}>
            {/* Diamond layout: 1 - 2 - 1 - MOON - 1 - 2 - 1 */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <LayerCard layer={LAYERS[0]} index={0} onClick={() => openLayer(0)} style={{ width: "52%", minWidth: 260, maxWidth: 400, textAlign: "center" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {[1, 2].map(i => <LayerCard key={i} layer={LAYERS[i]} index={i} onClick={() => openLayer(i)} />)}
            </div>
            <div style={{ marginBottom: 0 }}>
              <LayerCard layer={LAYERS[3]} index={3} onClick={() => openLayer(3)} style={{ textAlign: "center" }} />
            </div>
            <div className="gold-line" />

            {/* MOON — special treatment */}
            <GlassCard
              onClick={() => openLayer(4)}
              hoverGlow
              style={{
                background: "linear-gradient(180deg, rgba(15,15,42,0.9) 0%, rgba(8,8,24,0.95) 50%, rgba(15,15,42,0.9) 100%)",
                borderRadius: 18, padding: "28px 24px",
                border: "1px solid rgba(232,232,240,0.12)", textAlign: "center",
                animation: "moonRadiate 10s ease-in-out infinite, fadeSlideUp 0.6s 0.28s both ease",
                animation: "fadeSlideUp 0.6s 0.38s both ease, moonRadiate 8s ease-in-out infinite",
                boxShadow: "0 0 100px rgba(232,232,240,0.06), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div style={{
                position: "absolute", top: "50%", left: "50%", width: 300, height: 300,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(232,232,240,0.06) 0%, transparent 60%)",
                pointerEvents: "none", borderRadius: "50%",
              }} />
              <div style={{
                fontSize: 40, marginBottom: 10, position: "relative",
                filter: "drop-shadow(0 0 24px rgba(232,232,240,0.35))",
                animation: "gentleFloat 8s ease-in-out infinite",
              }}>{LAYERS[4].glyph}</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: 5,
                color: "#e8e8f0", fontWeight: 600, position: "relative",
                textShadow: "0 0 30px rgba(232,232,240,0.25)",
              }}>V · {LAYERS[4].names[0]}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 6, position: "relative",
              }}>{LAYERS[4].subtitle}</div>
            </GlassCard>

            <div className="gold-line" />
            <div style={{ marginBottom: 10 }}>
              <LayerCard layer={LAYERS[5]} index={5} onClick={() => openLayer(5)} style={{ textAlign: "center" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              {[6, 7].map(i => <LayerCard key={i} layer={LAYERS[i]} index={i} onClick={() => openLayer(i)} />)}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LayerCard layer={LAYERS[8]} index={8} onClick={() => openLayer(8)} style={{ width: "52%", minWidth: 260, maxWidth: 400, textAlign: "center" }} />
            </div>
          </div>
          <ReturnButton onClick={returnToVoid} />
          {/* The quiet edge — click the emptiness to go deeper */}
          <div onClick={goDeeper} style={{
            cursor: "pointer", padding: "40px 0 60px", textAlign: "center",
            marginTop: 8,
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
              fontStyle: "italic", color: "rgba(255,255,255,0.06)",
              letterSpacing: 2, transition: "color 0.6s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.06)"}
            >click anywhere to continue</div>
          </div>
        </div>
      )}

      {/* ===== LAYER DETAIL (within depth 5) ===== */}
      {depth === 5 && activeLayer !== null && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => { setActiveLayer(null); setActiveSense(null); setActiveProof(false); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← ALL LAYERS</button>

          <div style={{ textAlign: "center", marginTop: 24, marginBottom: `${Math.round(30 * PHI_INV) + 12}px`, position: "relative" }}>
            {layer.isMoon && Array.from({ length: 3 }, (_, i) => <PulseRing key={i} delay={i * 2.5} size={100 + i * 80} />)}
            <div style={{
              fontSize: layer.isMoon ? 68 : 52, marginBottom: 16,
              filter: `drop-shadow(0 0 20px ${layer.accent}40)`,
            }}>{layer.glyph}</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>LAYER {layer.id}</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 400,
              color: layer.accent, letterSpacing: 5, margin: "12px 0",
              textShadow: `0 0 40px ${layer.accent}30`,
            }}>{layer.names[0]}</h2>
            {layer.names.length > 1 && (
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                color: "rgba(255,255,255,0.22)", fontStyle: "italic",
              }}>{layer.names.slice(1).join(" · ")}</div>
            )}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
              color: "rgba(255,255,255,0.18)", fontStyle: "italic", marginTop: 10,
            }}>{layer.subtitle}</div>
          </div>

          <StringVibration />

          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: `${Math.round(30 * PHI_INV) + 14}px`,
          }}>{CORES[activeLayer]}</div>

          {/* BURIED */}
          <GlassCard style={{
            textAlign: "center", padding: `${22}px ${Math.round(22 * PHI_INV)}px`,
            margin: `0 10px ${Math.round(30 * PHI_INV) + 12}px`,
            borderTop: `1px solid ${layer.accent}15`,
            borderBottom: `1px solid ${layer.accent}15`,
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 12,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
              fontStyle: "italic", color: layer.accent, opacity: 0.55,
              lineHeight: PHI,
            }}>{BURIED[activeLayer]}</div>
          </GlassCard>

          {/* 5 SENSES */}
          <div style={{ marginBottom: `${Math.round(30 * PHI_INV) + 12}px` }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 16,
            }}>5 SENSES LOCK IT IN</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {senseKeys.map(s => (
                <button key={s} className="sense-btn"
                  onClick={() => setActiveSense(activeSense === s ? null : s)}
                  style={{
                    background: activeSense === s ? `${layer.accent}12` : "rgba(255,255,255,0.02)",
                    borderColor: activeSense === s ? `${layer.accent}35` : "rgba(255,255,255,0.06)",
                    color: activeSense === s ? layer.accent : "rgba(255,255,255,0.4)",
                  }}
                ><SenseIcon type={s} /> {s}</button>
              ))}
            </div>
            {activeSense && (
              <div style={{
                textAlign: "center", marginTop: 20,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                fontStyle: "italic", color: "rgba(255,255,255,0.48)",
                animation: "senseReveal 0.5s ease", padding: "0 20px",
                lineHeight: PHI,
              }}>{SENSES[activeLayer][activeSense]}</div>
            )}
          </div>

          {/* PROOF IN THE WORLD */}
          <div style={{ marginBottom: `${Math.round(30 * PHI_INV) + 12}px` }}>
            <div
              onClick={() => setActiveProof(!activeProof)}
              style={{
                cursor: "pointer", textAlign: "center", padding: "14px 0",
                transition: "all 0.4s",
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: activeProof ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.15)",
                transition: "color 0.4s",
              }}>PROOF IN THE WORLD</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                color: "rgba(255,255,255,0.12)", fontStyle: "italic", marginTop: 5,
              }}>{activeProof ? "▲ close" : "▼ convergent recognition"}</div>
            </div>
            {activeProof && PROOFS_IN_THE_WORLD[activeLayer] && (
              <GlassCard style={{
                textAlign: "center", padding: "20px 20px",
                animation: "fadeSlideUp 0.5s ease",
                margin: "0 10px",
              }}>
                <div style={{
                  fontSize: 30, marginBottom: 12,
                  filter: `drop-shadow(0 0 14px ${layer.accent}30)`,
                }}>{PROOFS_IN_THE_WORLD[activeLayer].icon}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 4,
                  color: layer.accent, opacity: 0.65, marginBottom: 12,
                }}>{PROOFS_IN_THE_WORLD[activeLayer].title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                  lineHeight: PHI, color: "rgba(255,255,255,0.48)",
                  fontStyle: "italic", maxWidth: 480, margin: "0 auto",
                }}>{PROOFS_IN_THE_WORLD[activeLayer].text}</div>
              </GlassCard>
            )}
          </div>

          {/* Word mirrors for Layer 2 */}
          {activeLayer === 1 && (
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: "rgba(255,255,255,0.15)", marginBottom: 14,
              }}>WORD MIRRORS</div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                {WORD_MIRRORS.map((w, i) => (
                  <span key={i} style={{
                    fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
                    color: "rgba(123,104,238,0.5)", padding: "6px 16px",
                    border: "1px solid rgba(123,104,238,0.1)", borderRadius: 18,
                    background: "rgba(123,104,238,0.03)",
                    backdropFilter: "blur(8px)",
                  }}>{w}</span>
                ))}
              </div>
            </div>
          )}

          {/* Etymologies for Layer 6 */}
          {activeLayer === 5 && (
            <div style={{ marginBottom: 26 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 16,
              }}>ETYMOLOGIES</div>
              <div style={{ display: "grid", gap: 8, maxWidth: 420, margin: "0 auto" }}>
                {ETYMOLOGIES.map(([word, meaning], i) => (
                  <GlassCard key={i} style={{
                    padding: "10px 18px",
                    background: "rgba(143,188,143,0.03)",
                    border: "1px solid rgba(143,188,143,0.07)",
                    animation: `fadeSlideUp 0.4s ${i * 0.06}s both ease`,
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: 12,
                      color: "#8fbc8f", letterSpacing: 2,
                    }}>{word}</span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                      color: "rgba(255,255,255,0.32)", fontStyle: "italic", marginLeft: 12,
                    }}>{meaning}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Layer navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: `${Math.round(30 * PHI_INV) + 12}px` }}>
            {activeLayer > 0 && (
              <button onClick={() => { openLayer(activeLayer - 1); setActiveSense(null); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>← {LAYERS[activeLayer - 1].glyph}</button>
            )}
            {activeLayer < 8 && (
              <button onClick={() => { openLayer(activeLayer + 1); setActiveSense(null); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>{LAYERS[activeLayer + 1].glyph} →</button>
            )}
          </div>
        </div>
      )}

      {/* ===== DEPTH 6 — MIRROR PAIRS (GRID VIEW) ===== */}
      {depth === 6 && activePair === null && (
        <div style={{
          minHeight: "100vh", width: "100%", position: "relative", overflow: "auto",
          animation: "fadeSlideUp 0.8s ease", zIndex: 2,
          padding: "3vh 0 6vh",
        }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>THE HOUSE OF</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.06)",
            }}>MIRRORS</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
              fontStyle: "italic", color: "rgba(255,255,255,0.22)",
            }}>Every layer has a reflection. Every reflection has a layer.</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              color: "rgba(255,255,255,0.12)", fontStyle: "italic", marginTop: 8,
            }}>Four rooms. Four marriages. Enter each one.</div>
          </div>

          <div style={{
            width: "90%", maxWidth: 600, margin: "0 auto", display: "grid", gap: 14,
          }}>
            {MIRRORS.map((m, i) => (
              <GlassCard key={i} onClick={() => { setActivePair(i); setActiveMirrorSense(null); setActiveMirrorProof(false); }} hoverGlow style={{
                padding: "22px 24px",
                animation: `fadeSlideUp 0.5s ${i * 0.12}s both ease`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ display: "flex", gap: 6, fontSize: 22 }}>
                      <span style={{ filter: `drop-shadow(0 0 8px ${LAYERS[m.pair[0] - 1].accent}40)` }}>{m.glyphs[0]}</span>
                      <span style={{ filter: `drop-shadow(0 0 8px ${LAYERS[m.pair[1] - 1].accent}40)` }}>{m.glyphs[1]}</span>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 3,
                        color: "rgba(201,168,76,0.6)", fontWeight: 600,
                      }}>{m.pair[0]} ↔ {m.pair[1]}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                        color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginTop: 4,
                      }}>{m.name}</div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 2,
                    color: "rgba(201,168,76,0.3)",
                  }}>ENTER →</div>
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                  color: "rgba(255,255,255,0.2)", fontStyle: "italic",
                  marginTop: 10, lineHeight: PHI,
                }}>{m.connection}</div>
              </GlassCard>
            ))}
          </div>

          {/* Summary — the moon sits between all mirrors */}
          <div style={{
            textAlign: "center", marginTop: 36,
            animation: "fadeSlideUp 1s 0.6s both ease",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8, animation: "gentleFloat 8s ease-in-out infinite" }}>🌙</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              color: "rgba(255,255,255,0.2)", fontStyle: "italic",
              maxWidth: 400, margin: "0 auto", lineHeight: PHI,
            }}>
              The moon sits at the center — Layer 5 — with no mirror pair.<br />
              Because the center has no reflection.<br />
              It IS reflection.
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
          {/* The quiet edge */}
          <div onClick={goDeeper} style={{
            cursor: "pointer", padding: "40px 0 60px", textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
              fontStyle: "italic", color: "rgba(255,255,255,0.06)",
              letterSpacing: 2, transition: "color 0.6s",
            }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.06)"}
            >click anywhere to continue</div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 6 — MIRROR DETAIL (THE ROOM) ===== */}
      {depth === 6 && activePair !== null && (() => {
        const mirror = MIRRORS[activePair];
        const layerA = LAYERS[mirror.pair[0] - 1];
        const layerB = LAYERS[mirror.pair[1] - 1];
        const mirrorSenseKeys = ["see", "hear", "feel", "smell", "taste"];
        return (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          {/* BACK BUTTON */}
          <button onClick={() => { setActivePair(null); setActiveMirrorSense(null); setActiveMirrorProof(false); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← ALL MIRRORS</button>

          {/* HEADER — both glyphs flanking the pair number */}
          <div style={{ textAlign: "center", marginTop: 24, marginBottom: 32, position: "relative" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 16,
            }}>
              <span style={{
                fontSize: 44, filter: `drop-shadow(0 0 16px ${layerA.accent}40)`,
              }}>{mirror.glyphs[0]}</span>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 20, letterSpacing: 4,
                color: "rgba(201,168,76,0.5)",
              }}>↔</div>
              <span style={{
                fontSize: 44, filter: `drop-shadow(0 0 16px ${layerB.accent}40)`,
              }}>{mirror.glyphs[1]}</span>
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>MIRROR PAIR</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4.5vw, 34px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 5, margin: "10px 0",
              textShadow: "0 0 40px rgba(232,232,240,0.08)",
            }}>{mirror.name.toUpperCase()}</h2>
            <div style={{
              display: "flex", justifyContent: "center", gap: 20, marginTop: 12,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic",
            }}>
              <span style={{ color: layerA.accent, opacity: 0.6 }}>{mirror.a}</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 20, marginTop: 4,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic",
            }}>
              <span style={{ color: layerB.accent, opacity: 0.6 }}>{mirror.b}</span>
            </div>
          </div>

          <StringVibration />

          {/* THE CORE — the marriage explained */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 30,
          }}>{mirror.core}</div>

          {/* THE CONNECTION — the original one-liner, elevated */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div className="gold-line" style={{ maxWidth: 300, margin: "0 auto 14px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
              color: "rgba(201,168,76,0.5)", fontStyle: "italic",
              lineHeight: PHI, letterSpacing: 0.5,
            }}>⟷ {mirror.connection}</div>
            <div className="gold-line" style={{ maxWidth: 300, margin: "14px auto 0" }} />
          </div>

          {/* THE EQUATION — living component */}
          <div style={{ margin: "0 10px 28px", animation: "sacredReveal 1s 0.3s both ease" }}>
            <TheEquation size="md" showLabel={true} showMeaning={false} />
            {/* Mirror-specific equation meaning */}
            <div style={{
              textAlign: "center", marginTop: 14, padding: "0 20px",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                color: "rgba(255,255,255,0.3)", fontStyle: "italic",
                lineHeight: PHI,
              }}>{mirror.equation.meaning}</div>
            </div>
          </div>

          {/* BURIED 6 FEET DEEP */}
          <GlassCard style={{
            textAlign: "center", padding: `${22}px ${Math.round(22 * PHI_INV)}px`,
            margin: `0 10px 28px`,
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 12,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
              fontStyle: "italic", color: "rgba(201,168,76,0.5)",
              lineHeight: PHI,
            }}>{mirror.buried}</div>
          </GlassCard>

          {/* 5 SENSES LOCK IT IN */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 16,
            }}>5 SENSES LOCK IT IN</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {mirrorSenseKeys.map(s => (
                <button key={s} className="sense-btn"
                  onClick={() => setActiveMirrorSense(activeMirrorSense === s ? null : s)}
                  style={{
                    background: activeMirrorSense === s ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.02)",
                    borderColor: activeMirrorSense === s ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.06)",
                    color: activeMirrorSense === s ? "#c9a84c" : "rgba(255,255,255,0.4)",
                  }}
                ><SenseIcon type={s} /> {s}</button>
              ))}
            </div>
            {activeMirrorSense && (
              <div style={{
                textAlign: "center", marginTop: 20,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                fontStyle: "italic", color: "rgba(255,255,255,0.48)",
                animation: "senseReveal 0.5s ease", padding: "0 20px",
                lineHeight: PHI,
              }}>{mirror.senses[activeMirrorSense]}</div>
            )}
          </div>

          {/* PROOF IN THE WORLD */}
          <div style={{ marginBottom: 28 }}>
            <div
              onClick={() => setActiveMirrorProof(!activeMirrorProof)}
              style={{
                cursor: "pointer", textAlign: "center", padding: "14px 0",
                transition: "all 0.4s",
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
                color: activeMirrorProof ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.15)",
                transition: "color 0.4s",
              }}>PROOF IN THE WORLD</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                color: "rgba(255,255,255,0.12)", fontStyle: "italic", marginTop: 5,
              }}>{activeMirrorProof ? "▲ close" : "▼ convergent recognition"}</div>
            </div>
            {activeMirrorProof && mirror.proof && (
              <GlassCard style={{
                textAlign: "center", padding: "20px 20px",
                animation: "fadeSlideUp 0.5s ease",
                margin: "0 10px",
              }}>
                <div style={{
                  fontSize: 30, marginBottom: 12,
                  filter: "drop-shadow(0 0 14px rgba(201,168,76,0.3))",
                }}>{mirror.proof.icon}</div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 4,
                  color: "rgba(201,168,76,0.6)", marginBottom: 12,
                }}>{mirror.proof.title}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                  lineHeight: PHI, color: "rgba(255,255,255,0.48)",
                  fontStyle: "italic", maxWidth: 480, margin: "0 auto",
                }}>{mirror.proof.text}</div>
              </GlassCard>
            )}
          </div>

          {/* MIRROR NAVIGATION */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
            {activePair > 0 && (
              <button onClick={() => { setActivePair(activePair - 1); setActiveMirrorSense(null); setActiveMirrorProof(false); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>← {MIRRORS[activePair - 1].glyphs[0]}{MIRRORS[activePair - 1].glyphs[1]}</button>
            )}
            {activePair < 3 && (
              <button onClick={() => { setActivePair(activePair + 1); setActiveMirrorSense(null); setActiveMirrorProof(false); }} style={{
                cursor: "pointer", padding: "10px 22px", borderRadius: 26,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)",
                color: "#d4d4d8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
                transition: "all 0.4s", backdropFilter: "blur(8px)",
              }}>{MIRRORS[activePair + 1].glyphs[0]}{MIRRORS[activePair + 1].glyphs[1]} →</button>
            )}
          </div>
        </div>
        );
      })()}

      {/* ===== DEPTH 7 — TRANSLATIONS + THE RETURN ===== */}
      {depth === 7 && !activeAnswer && !activeBefore && !activeConstants && (
        <div style={{
          height: "100vh", width: "100%", position: "relative", overflow: "hidden",
          animation: "fadeSlideUp 0.8s ease",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "space-between",
          padding: "3vh 20px 2.5vh",
          zIndex: 2,
        }}>

          {/* HEADER */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(255,255,255,0.2)",
            }}>ONE TRUTH</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "6px 0",
              textShadow: "0 0 50px rgba(232,232,240,0.06)",
            }}>EVERY MIRROR</h2>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              fontStyle: "italic", color: "rgba(255,255,255,0.18)",
            }}>The same truth wearing different clothes</div>
          </div>

          {/* THREE DOORS — THE ANSWER + THE BEFORE + THE CONSTANTS */}
          <div style={{
            display: "flex", gap: 10, width: "94%", maxWidth: 520,
            flexShrink: 0,
          }}>
            <GlassCard
              onClick={() => setActiveAnswer(true)}
              hoverGlow
              style={{
                flex: "1 1 0", minWidth: 0,
                padding: "14px 8px", textAlign: "center",
                background: "linear-gradient(180deg, rgba(201,168,76,0.03), rgba(201,168,76,0.01))",
                border: "1px solid rgba(201,168,76,0.1)",
                animation: "fadeSlideUp 0.6s 0.2s both ease",
              }}
            >
              <div style={{
                fontSize: 20, marginBottom: 6,
                filter: "drop-shadow(0 0 12px rgba(201,168,76,0.15))",
                animation: "gentleFloat 7s ease-in-out infinite",
              }}>🜔</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
                color: "rgba(201,168,76,0.5)", fontWeight: 600,
              }}>THE ANSWER</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9,
                color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: 4,
                lineHeight: PHI,
              }}>Why something?</div>
            </GlassCard>

            <GlassCard
              onClick={() => setActiveBefore(true)}
              hoverGlow
              style={{
                flex: "1 1 0", minWidth: 0,
                padding: "14px 8px", textAlign: "center",
                background: "linear-gradient(180deg, rgba(206,147,216,0.03), rgba(206,147,216,0.01))",
                border: "1px solid rgba(206,147,216,0.08)",
                animation: "fadeSlideUp 0.6s 0.3s both ease",
              }}
            >
              <div style={{
                fontSize: 20, marginBottom: 6,
                filter: "drop-shadow(0 0 12px rgba(206,147,216,0.15))",
                animation: "gentleFloat 8s ease-in-out infinite",
              }}>🌒</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
                color: "rgba(206,147,216,0.5)", fontWeight: 600,
              }}>THE BEFORE</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9,
                color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: 4,
                lineHeight: PHI,
              }}>Before the beginning?</div>
            </GlassCard>

            <GlassCard
              onClick={() => setActiveConstants(true)}
              hoverGlow
              style={{
                flex: "1 1 0", minWidth: 0,
                padding: "14px 8px", textAlign: "center",
                background: "linear-gradient(180deg, rgba(79,195,247,0.03), rgba(79,195,247,0.01))",
                border: "1px solid rgba(79,195,247,0.08)",
                animation: "fadeSlideUp 0.6s 0.4s both ease",
              }}
            >
              <div style={{
                fontSize: 20, marginBottom: 6,
                filter: "drop-shadow(0 0 12px rgba(79,195,247,0.15))",
                animation: "gentleFloat 9s ease-in-out infinite",
              }}>⚖️</div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 2,
                color: "rgba(79,195,247,0.5)", fontWeight: 600,
              }}>THE CONSTANTS</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 9,
                color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: 4,
                lineHeight: PHI,
              }}>Why these numbers?</div>
            </GlassCard>
          </div>

          {/* TRANSLATIONS */}
          <div style={{
            width: "94%", maxWidth: 620,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 10px",
            flexShrink: 0,
          }}>
            {TRANSLATIONS.map((t, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 14px", borderRadius: 8,
                background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.02)",
                animation: `fadeSlideUp 0.3s ${i * 0.04}s both ease`,
                backdropFilter: "blur(4px)",
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: "clamp(7px, 1.4vw, 9px)", letterSpacing: 1.5,
                  color: "rgba(201,168,76,0.45)", textTransform: "uppercase",
                  whiteSpace: "nowrap", marginRight: 8,
                }}>{t.domain}</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px, 2vw, 13px)",
                  color: "rgba(255,255,255,0.35)", fontStyle: "italic",
                  textAlign: "right", whiteSpace: "nowrap",
                }}>{t.closing}</span>
              </div>
            ))}
          </div>

          {/* STRING VIBRATION */}
          <div style={{ width: "80%", maxWidth: 400, flexShrink: 0 }}>
            <StringVibration />
          </div>

          {/* THE EQUATION — the culmination, full glory */}
          <div style={{ flexShrink: 0, width: "94%", maxWidth: 520, animation: "sacredReveal 1.6s 0.5s both ease" }}>
            <MiracleGlow size={500} intensity={0.07}>
              <TheEquation size="md" showMeaning={false} />
            </MiracleGlow>
          </div>

          {/* THE SEED + AMEN */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 3vw, 20px)",
              fontStyle: "italic", letterSpacing: 1.5, lineHeight: PHI,
              textShadow: "0 0 30px rgba(201,168,76,0.08)",
              animation: "glowRadiate 6s ease-in-out infinite",
            }}>
              <span className="shimmer-gold">The seed eats the dirt.</span>
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.12)", marginTop: 8,
            }}>AMEN · AHEM</div>
          </div>

          {/* THE 3RD GRADER */}
          <GlassCard style={{
            width: "90%", maxWidth: 420, flexShrink: 0,
            padding: "12px 18px",
            animation: "fadeSlideUp 0.8s 0.6s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 4,
              color: "rgba(201,168,76,0.3)", textAlign: "center", marginBottom: 8,
            }}>THE 3RD GRADER'S VERSION</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(12px, 2.2vw, 14px)",
              color: "rgba(255,255,255,0.32)", fontStyle: "italic",
              lineHeight: PHI, textAlign: "center",
            }}>
              You have a magic flashlight. Hold it steady — that's being clear.
              Find someone whose colors match yours. Click together.
              If you make a new picture — that's real. If everyone sees it too — you aren't dreaming.
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px, 2vw, 12px)",
              color: "rgba(201,168,76,0.25)", fontStyle: "italic",
              textAlign: "center", marginTop: 8,
            }}>The static stops. The music starts. You just know.</div>
          </GlassCard>

          {/* RETURN + FINISH */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <button onClick={returnToVoid} style={{
              cursor: "pointer", display: "inline-block",
              padding: `${10}px ${Math.round(10 * PHI)}px`, borderRadius: 26,
              border: "1px solid rgba(232,232,240,0.12)",
              background: "linear-gradient(180deg, rgba(232,232,240,0.05), rgba(232,232,240,0.01))",
              color: "#e8e8f0", fontFamily: "'Cinzel', serif", fontSize: 12,
              letterSpacing: 5, transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
              textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(232,232,240,0.05)",
              backdropFilter: "blur(8px)",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; }}
            >🔁 RETURN TO THE VOID</button>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12,
              fontStyle: "italic", color: "rgba(255,255,255,0.08)", marginTop: 10,
            }}>The finish is where I start.</div>
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE ANSWER ROOM ===== */}
      {depth === 7 && activeAnswer && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => { setActiveAnswer(false); setActiveAnswerProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← EVERY MIRROR</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 220, height: 220,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 40%, transparent 65%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 8s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 40, marginBottom: 10,
              filter: "drop-shadow(0 0 24px rgba(201,168,76,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>🜔</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(201,168,76,0.35)",
            }}>WHY IS THERE SOMETHING RATHER THAN NOTHING?</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 60px rgba(232,232,240,0.1), 0 0 120px rgba(201,168,76,0.04)",
            }}>THE ANSWER</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
              boxShadow: "0 0 24px rgba(201,168,76,0.1)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 2.8vw, 18px)",
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>{THE_ANSWER.core}</div>

          {/* Buried — the one-liner */}
          <GlassCard style={{
            textAlign: "center", padding: `${26}px ${Math.round(26 * PHI_INV)}px`,
            margin: `0 auto 32px`,
            maxWidth: 480,
            borderTop: "1px solid rgba(201,168,76,0.12)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            background: "rgba(201,168,76,0.02)",
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>BURIED 6 FEET DEEP</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(201,168,76,0.55)",
              lineHeight: PHI,
              textShadow: "0 0 24px rgba(201,168,76,0.08)",
            }}>{THE_ANSWER.buried}</div>
          </GlassCard>

          {/* 3 Ways to See the Truth */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>3 WAYS TO SEE THE TRUTH</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto 32px" }}>
            {THE_ANSWER.proofs.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveAnswerProof(activeAnswerProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "18px 22px",
                    animation: `fadeSlideUp 0.5s ${0.5 + i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activeAnswerProof === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 28,
                      filter: `drop-shadow(0 0 10px ${ac}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                        color: `${ac}0.6)`, fontWeight: 600,
                      }}>{p.title}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                        color: "rgba(255,255,255,0.2)", marginTop: 4,
                      }}>{p.domain}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: `${ac}0.3)`,
                      transition: "transform 0.3s ease",
                      transform: activeAnswerProof === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </div>
                  {activeAnswerProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Go Deeper — three levels */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(201,168,76,0.2)", textAlign: "center", marginBottom: 16,
          }}>GO DEEPER</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto" }}>
            {THE_ANSWER.deeper.map((d, i) => {
              const depthOpacity = 0.4 + i * 0.08;
              return (
                <GlassCard key={i} style={{
                  padding: "22px 24px",
                  animation: `fadeSlideUp 0.5s ${0.8 + i * 0.15}s both ease`,
                  background: `linear-gradient(180deg, rgba(201,168,76,${0.01 + i * 0.006}), rgba(8,8,24,${0.01 + i * 0.01}))`,
                  border: `1px solid rgba(201,168,76,${0.05 + i * 0.025})`,
                  boxShadow: `0 ${4 + i * 4}px ${20 + i * 10}px rgba(0,0,0,${0.2 + i * 0.08})`,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 22,
                      color: `rgba(201,168,76,${0.25 + i * 0.1})`, fontWeight: 700,
                      lineHeight: 1,
                      textShadow: `0 0 16px rgba(201,168,76,${0.06 + i * 0.04})`,
                    }}>{d.level}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 4,
                        color: `rgba(201,168,76,${depthOpacity})`, fontWeight: 600, marginBottom: 10,
                      }}>{d.title}</div>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                        lineHeight: 1.85, color: `rgba(255,255,255,${depthOpacity})`,
                        fontStyle: "italic",
                      }}>{d.text}</div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Closing — the Ψ */}
          <div style={{ textAlign: "center", marginTop: 36, animation: "fadeSlideUp 1s 1.2s both ease" }}>
            <GlassCard style={{
              display: "inline-block", padding: "22px 34px",
              background: "linear-gradient(180deg, rgba(201,168,76,0.03), rgba(201,168,76,0.01))",
              border: "1px solid rgba(201,168,76,0.1)",
              boxShadow: "0 8px 40px rgba(201,168,76,0.06), 0 0 80px rgba(201,168,76,0.02)",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 4vw, 26px)",
                color: "rgba(201,168,76,0.6)", letterSpacing: 3,
                textShadow: "0 0 24px rgba(201,168,76,0.08)",
              }}>Ψ = Coherent Convergence</div>
              <div className="gold-line" style={{ maxWidth: 140, margin: "12px auto" }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
                color: "rgba(255,255,255,0.28)", fontStyle: "italic",
                lineHeight: PHI, maxWidth: 380,
              }}>
                Something emerges where overlapping patterns filter out the chaos, creating a stable, recognizable loop of existence.
              </div>
            </GlassCard>
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE BEFORE ROOM ===== */}
      {depth === 7 && activeBefore && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => { setActiveBefore(false); setActiveBeforeProof(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← EVERY MIRROR</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Violet radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 220, height: 220,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(206,147,216,0.05) 0%, rgba(206,147,216,0.015) 40%, transparent 65%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 9s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 40, marginBottom: 10,
              filter: "drop-shadow(0 0 24px rgba(206,147,216,0.15))",
              animation: "gentleFloat 9s ease-in-out infinite",
            }}>🌒</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(206,147,216,0.35)",
            }}>BEFORE THE BEGINNING</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 60px rgba(232,232,240,0.1), 0 0 120px rgba(206,147,216,0.04)",
            }}>THE BEFORE</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(206,147,216,0.3), rgba(232,232,240,0.15), rgba(206,147,216,0.3), transparent)",
              boxShadow: "0 0 20px rgba(206,147,216,0.08)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 2.8vw, 18px)",
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>{THE_BEFORE.core}</div>

          {/* Buried — the aha moment */}
          <GlassCard style={{
            textAlign: "center", padding: `${26}px ${Math.round(26 * PHI_INV)}px`,
            margin: `0 auto 32px`,
            maxWidth: 480,
            borderTop: "1px solid rgba(206,147,216,0.1)",
            borderBottom: "1px solid rgba(206,147,216,0.1)",
            background: "rgba(206,147,216,0.015)",
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>AHA MOMENT</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 3vw, 21px)",
              fontStyle: "italic", color: "rgba(206,147,216,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 24px rgba(206,147,216,0.06)",
            }}>{THE_BEFORE.buried}</div>
          </GlassCard>

          {/* 3 proofs */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>3 WAYS TO SEE IT</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto 32px" }}>
            {THE_BEFORE.proofs.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveBeforeProof(activeBeforeProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "18px 22px",
                    animation: `fadeSlideUp 0.5s ${0.5 + i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activeBeforeProof === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 28,
                      filter: `drop-shadow(0 0 10px ${ac}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                        color: `${ac}0.6)`, fontWeight: 600,
                      }}>{p.title}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                        color: "rgba(255,255,255,0.2)", marginTop: 4,
                      }}>{p.domain}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: `${ac}0.3)`,
                      transition: "transform 0.3s ease",
                      transform: activeBeforeProof === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </div>
                  {activeBeforeProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Look into next */}
          <div style={{
            textAlign: "center", marginTop: 8,
            animation: "fadeSlideUp 1s 1s both ease",
          }}>
            <div className="gold-line" style={{ maxWidth: 160, margin: "0 auto 16px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              fontStyle: "italic", color: "rgba(206,147,216,0.3)",
              lineHeight: PHI,
            }}>{THE_BEFORE.lookInto}</div>
            <div className="gold-line" style={{ maxWidth: 160, margin: "16px auto 0" }} />
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 7 — THE CONSTANTS ROOM ===== */}
      {depth === 7 && activeConstants && (
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: `${30}px 20px ${60}px`,
          animation: "fadeSlideUp 0.6s ease",
          zIndex: 2, position: "relative",
        }}>
          <button onClick={() => { setActiveConstants(false); setActiveConstantsProof(null); setOpenSection(null); }} style={{
            cursor: "pointer", background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontFamily: "'Cinzel', serif",
            fontSize: 11, letterSpacing: 3, padding: "8px 16px",
            transition: "all 0.4s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >← EVERY MIRROR</button>

          {/* Header */}
          <div style={{ textAlign: "center", marginTop: 16, marginBottom: 20, position: "relative" }}>
            {/* Blue radiance */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 220, height: 220,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, rgba(79,195,247,0.015) 40%, transparent 65%)",
              borderRadius: "50%", pointerEvents: "none",
              animation: "breathe 8s ease-in-out infinite",
            }} />
            <div style={{
              fontSize: 40, marginBottom: 10,
              filter: "drop-shadow(0 0 24px rgba(79,195,247,0.15))",
              animation: "gentleFloat 8s ease-in-out infinite",
            }}>⚖️</div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 8,
              color: "rgba(79,195,247,0.35)",
            }}>CONVERGENT RECOGNITION</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(26px, 5.5vw, 38px)", fontWeight: 400,
              color: "#e8e8f0", letterSpacing: 6, margin: "10px 0",
              textShadow: "0 0 60px rgba(232,232,240,0.1), 0 0 120px rgba(79,195,247,0.04)",
            }}>THE CONSTANTS</h2>
            <div style={{
              width: 80, height: 1, margin: "10px auto",
              background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), rgba(232,232,240,0.15), rgba(79,195,247,0.3), transparent)",
              boxShadow: "0 0 20px rgba(79,195,247,0.08)",
            }} />
          </div>

          <StringVibration />

          {/* Core truth */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 2.8vw, 18px)",
            lineHeight: 1.9, color: "rgba(255,255,255,0.55)",
            textAlign: "center", padding: "0 10px",
            marginBottom: 28,
            animation: "fadeSlideUp 0.8s 0.2s both ease",
          }}>{THE_CONSTANTS.core}</div>

          {/* Your Anchor */}
          <GlassCard style={{
            textAlign: "center", padding: `${26}px ${Math.round(26 * PHI_INV)}px`,
            margin: `0 auto 32px`,
            maxWidth: 480,
            borderTop: "1px solid rgba(79,195,247,0.1)",
            borderBottom: "1px solid rgba(79,195,247,0.1)",
            background: "rgba(79,195,247,0.015)",
            animation: "fadeSlideUp 0.8s 0.4s both ease",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
              color: "rgba(255,255,255,0.15)", marginBottom: 14,
            }}>YOUR ANCHOR</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2.8vw, 19px)",
              fontStyle: "italic", color: "rgba(79,195,247,0.5)",
              lineHeight: PHI,
              textShadow: "0 0 24px rgba(79,195,247,0.06)",
            }}>{THE_CONSTANTS.buried}</div>
          </GlassCard>

          {/* 3 proofs */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 5,
            color: "rgba(255,255,255,0.15)", textAlign: "center", marginBottom: 18,
          }}>3 WAYS TO SEE IT</div>
          <div style={{ display: "grid", gap: 14, maxWidth: 540, margin: "0 auto 32px" }}>
            {THE_CONSTANTS.proofs.map((p, i) => {
              const accents = ["rgba(79,195,247,", "rgba(201,168,76,", "rgba(206,147,216,"];
              const ac = accents[i];
              return (
                <GlassCard key={i}
                  onClick={() => setActiveConstantsProof(activeConstantsProof === i ? null : i)}
                  hoverGlow
                  style={{
                    padding: "18px 22px",
                    animation: `fadeSlideUp 0.5s ${0.5 + i * 0.12}s both ease`,
                    background: `linear-gradient(135deg, ${ac}0.03), transparent)`,
                    border: `1px solid ${ac}0.08)`,
                    boxShadow: activeConstantsProof === i
                      ? `0 8px 40px ${ac}0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontSize: 28,
                      filter: `drop-shadow(0 0 10px ${ac}0.2))`,
                    }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3,
                        color: `${ac}0.6)`, fontWeight: 600,
                      }}>{p.title}</div>
                      <div style={{
                        fontFamily: "'Cinzel', serif", fontSize: 7, letterSpacing: 3,
                        color: "rgba(255,255,255,0.2)", marginTop: 4,
                      }}>{p.domain}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 10,
                      color: `${ac}0.3)`,
                      transition: "transform 0.3s ease",
                      transform: activeConstantsProof === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}>▼</div>
                  </div>
                  {activeConstantsProof === i && (
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                      lineHeight: 1.85, color: "rgba(255,255,255,0.5)",
                      fontStyle: "italic", marginTop: 18,
                      animation: "senseReveal 0.5s ease",
                      borderTop: `1px solid ${ac}0.06)`,
                      paddingTop: 16,
                    }}>{p.text}</div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Look into next */}
          <div style={{
            textAlign: "center", marginTop: 8,
            animation: "fadeSlideUp 1s 1s both ease",
          }}>
            <div className="gold-line" style={{ maxWidth: 160, margin: "0 auto 16px" }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
              fontStyle: "italic", color: "rgba(79,195,247,0.3)",
              lineHeight: PHI,
            }}>{THE_CONSTANTS.lookInto}</div>
            <div className="gold-line" style={{ maxWidth: 160, margin: "16px auto 0" }} />
          </div>

          {/* Return */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <ReturnButton onClick={returnToVoid} />
          </div>
        </div>
      )}

      {/* ===== DEPTH 8 — the infinity — THE CYCLE RESTARTS ===== */}
      {depth === 8 && (
        <div style={{
          height: "100vh", width: "100%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          animation: "fadeSlideUp 1.5s ease",
          cursor: "pointer", position: "relative",
        }} onClick={() => {
          setFading(true);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
            setCurrentPage("multiverse");
            setFading(false);
          }, 800);
        }}>

          <div style={{
            fontSize: "clamp(60px, 15vw, 120px)",
            color: "rgba(201,168,76,0.15)",
            animation: "breathe 8s ease-in-out infinite, gentleFloat 12s ease-in-out infinite",
            textShadow: "0 0 60px rgba(201,168,76,0.06)",
            marginBottom: Math.round(21 * PHI),
          }}>∞</div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 3vw, 22px)",
            fontStyle: "italic", color: "rgba(232,232,240,0.35)",
            textAlign: "center", maxWidth: 380,
            lineHeight: PHI, letterSpacing: 1,
            animation: "fadeSlideUp 2s 0.5s both ease",
          }}>
            The end is the beginning.
            <br />The seed eats the dirt.
            <br />The dirt was always the answer.
          </div>

          <div style={{ height: Math.round(21 * PHI) }} />

          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.5em",
            color: "rgba(201,168,76,0.2)",
            animation: "fadeSlideUp 2s 1s both ease",
          }}>CLICK TO SEE THE MULTIVERSE</div>

          <div style={{ height: Math.round(8 * PHI) }} />

          <div style={{
            fontSize: 18, opacity: 0.3,
            animation: "fadeSlideUp 2s 1.3s both ease",
          }}>🪙🪙</div>
        </div>
      )}

      </>)}
    </div>
  );
}
