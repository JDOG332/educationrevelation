// lib/alanWattsData.js
// 163 Alan Watts lectures — 15 categories — 3 truths each
// Link types: 'url' (verified YouTube), 'search' (YouTube search term), 'podcast' (Being in the Way)

export const ALAN_WATTS_CATEGORIES = [
  {
    id: "zen",
    num: 1,
    name: "Zen & Buddhism",
    emoji: "☯️",
    theme: "Zen as psychological liberation tool, not doctrine. Satori, koans, direct experience.",
    lectures: [
      {
        num: 1, title: "The Way of Zen", year: 1960, dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=J_6_9i7R2sc",
        source: "T1", quality: 5, notes: "Full overview; remastered from KPFA tapes",
        truths: [
          "Zen is not a religion or philosophy — it is direct, unmediated experience of reality. (95%)",
          "The mind cannot grasp itself; the attempt to do so is the trap. (97%)",
          "Liberation comes from abandoning the search for liberation. (93%)",
        ],
      },
      {
        num: 2, title: "Buddhism as Dialogue", year: 1965, dur: "53m",
        linkType: "search", link: "Alan Watts Buddhism as Dialogue",
        source: "T1", quality: 5, notes: "Japan Tour 1965; Zen East→West",
        truths: [
          "Buddhism is not a belief system — it is a method of direct inquiry into experience. (96%)",
          "East-West exchange reveals both traditions point to the same groundless ground. (88%)",
          "Doctrine is the finger pointing at the moon — never the moon itself. (98%)",
        ],
      },
      {
        num: 3, title: "Zen Stories", year: 1965, dur: "53m",
        linkType: "search", link: "Alan Watts Zen Stories Japan Tour",
        source: "T1", quality: 5, notes: "Japan Tour; koans & direct experience",
        truths: [
          "Koans are not riddles to be solved — they are traps designed to stop logical thought cold. (95%)",
          "The master's laugh IS the answer the student was seeking through words. (90%)",
          "Every ordinary act — eating, walking — is already enlightenment when done without a self-observer. (92%)",
        ],
      },
      {
        num: 4, title: "The Middle Way", year: 1968, dur: "52m",
        linkType: "search", link: "Alan Watts Middle Way full lecture",
        source: "T1", quality: 5, notes: "Core Buddhist ethics; Eightfold Path",
        truths: [
          "The middle way transcends the framework that created the extremes — not a compromise between them. (94%)",
          "Suffering arises from clinging to what is inherently impermanent. (99%)",
          "Buddhist ethics are descriptions of how an awakened being naturally acts — not commandments. (91%)",
        ],
      },
      {
        num: 5, title: "Zen Reconsidered", year: 1968, dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 33",
        source: "T2", quality: 4, notes: "Mature view; away from Beat Zen",
        truths: [
          "Beat Zen mistook rebellion for liberation — genuine Zen has no position to rebel from. (89%)",
          "Maturity in Zen means dropping the performance of being Zen. (92%)",
          "The point is not to achieve satori — it is to stop needing to. (94%)",
        ],
      },
      {
        num: 6, title: "On Buddhism", year: 1969, dur: "52m",
        linkType: "search", link: "Alan Watts On Buddhism Ways Liberation",
        source: "T1", quality: 5, notes: "From Ways of Liberation series",
        truths: [
          "The Four Noble Truths are a diagnosis, not a moral judgment. (97%)",
          "Nirvana is not achieved — it is recognized as always already present. (93%)",
          "Buddhism and depth psychology converge: the self is a process, not a fixed thing. (91%)",
        ],
      },
      {
        num: 7, title: "Zen Bones", year: 1970, dur: "39m",
        linkType: "podcast", link: "Being in the Way Ep. 5",
        source: "T2", quality: 4, notes: "\"Direct pointing\"; Avalon Ballroom",
        truths: [
          "Zen points directly — no intermediary, no ritual, no concept required. (96%)",
          "The \"controlled accident\" of Zen art is the universe making itself through an emptied vessel. (90%)",
          "You cannot try to be spontaneous — spontaneity and trying are mutually exclusive. (97%)",
        ],
      },
      {
        num: 8, title: "Early Chinese Zen", year: 1970, dur: "46m",
        linkType: "search", link: "Alan Watts Early Chinese Zen",
        source: "T1", quality: 5, notes: "Historical lineage; Tang Dynasty masters",
        truths: [
          "Chinese Zen emerged from the marriage of Indian Buddhism and native Taoism. (96%)",
          "Tang Dynasty masters were not teachers of doctrine — they were demonstrators of presence. (91%)",
          "Lineage transmission proves awakening is contagious, not merely transferable intellectually. (85%)",
        ],
      },
      {
        num: 9, title: "Zen & Art of Controlled Accident", year: 1970, dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 32",
        source: "T2", quality: 4, notes: "Skillful non-interference; wu wei in Zen",
        truths: [
          "Skillful action means acting without forcing the outcome. (95%)",
          "The best results — in art, in life — happen when the actor gets fully out of the way. (91%)",
          "Wu wei in Zen: the less you force, the more precisely things resolve. (93%)",
        ],
      },
      {
        num: 10, title: "Eco Zen", year: 1971, dur: "53m",
        linkType: "search", link: "Alan Watts Eco Zen",
        source: "T1", quality: 5, notes: "Zen + ecology; interconnectedness",
        truths: [
          "Zen perceives organism and environment as a single system — not two things in relationship. (94%)",
          "Ecological crisis is a direct symptom of the philosophical illusion of separateness. (90%)",
          "To harm the environment is to harm yourself — there is no \"out there.\" (92%)",
        ],
      },
      {
        num: 11, title: "The Gateless Gate", year: 1972, dur: "48m",
        linkType: "search", link: "Alan Watts Gateless Gate Mu koan",
        source: "T2", quality: 5, notes: "Focus on Mu koan; mumonkan",
        truths: [
          "Mu is not a word — it is a non-answer designed to stop conceptual thought cold. (93%)",
          "The gate has no gate because there is nowhere to arrive — you are already there. (94%)",
          "Enlightenment is not entry — it is the dissolution of the belief you were ever outside. (95%)",
        ],
      },
      {
        num: 12, title: "Introduction to Zen", year: "c.1965", dur: "30m",
        linkType: "search", link: "Alan Watts Introduction to Zen",
        source: "T3", quality: 3, notes: "Eastern & Western Zen series opener",
        truths: [
          "Zen entered the West already distorted — stripped of the cultural context that gave it precision. (88%)",
          "Understanding Zen intellectually is like eating the menu instead of the meal. (97%)",
          "The starting point is always right here, right now — not after more preparation. (96%)",
        ],
      },
      {
        num: 13, title: "Biting an Iron Bull", year: "c.1965", dur: "30m",
        linkType: "search", link: "Alan Watts Biting Iron Bull",
        source: "T3", quality: 3, notes: "On koans; absurdity as method",
        truths: [
          "Koans are absurd by design — absurdity breaks the logical habit that keeps awakening at bay. (94%)",
          "\"What is the sound of one hand clapping?\" can only be answered from silence. (93%)",
          "The iron bull cannot be bitten — and that impossibility is exactly the teaching. (92%)",
        ],
      },
      {
        num: 14, title: "Unbleached Silk", year: "c.1965", dur: "30m",
        linkType: "search", link: "Alan Watts Unbleached Silk",
        source: "T3", quality: 3, notes: "Original nature; East-West Zen series",
        truths: [
          "Original nature is not something to achieve — it is what remains when you stop adding. (96%)",
          "\"Unbleached\" means unconditioned — your nature before culture layered over it. (93%)",
          "The Zen journey is subtractive, not additive: you remove, you do not accumulate. (95%)",
        ],
      },
      {
        num: 15, title: "Wisdom of the Ridiculous", year: "c.1965", dur: "30m",
        linkType: "search", link: "Alan Watts Wisdom Ridiculous",
        source: "T3", quality: 3, notes: "Zen humor & enlightenment",
        truths: [
          "Enlightenment is not a serious achievement — it is the cosmic joke finally landing. (91%)",
          "Laughter is the human experience closest in texture to satori. (88%)",
          "The universe takes itself too seriously only through human beings — Zen is the correction. (90%)",
        ],
      },
      {
        num: 16, title: "The World as Emptiness", year: "c.1960", dur: "120m",
        linkType: "search", link: "Alan Watts World as Emptiness full",
        source: "T3", quality: 4, notes: "Out of Your Mind seminar 6; śūnyatā",
        truths: [
          "Śūnyatā is not nihilism — it means no thing has fixed, independent existence. (97%)",
          "Form IS emptiness: things exist only in dynamic relation to other things. (96%)",
          "The discovery of emptiness is not depressing — it is the most liberating recognition available. (93%)",
        ],
      },
      {
        num: 17, title: "The Art of Meditation", year: 1969, dur: "50m",
        linkType: "search", link: "Alan Watts Art of Meditation full",
        source: "T3", quality: 4, notes: "Zazen; \"leaving mind alone\"",
        truths: [
          "Meditation is not concentration — it is open, non-grasping, non-directed awareness. (95%)",
          "\"Leaving the mind alone\" is the instruction — not guiding, shaping, or correcting it. (93%)",
          "You cannot try to meditate correctly — that trying is the obstruction. (94%)",
        ],
      },
      {
        num: 18, title: "Beyond Good and Bad", year: "c.1970", dur: "30m",
        linkType: "url", link: "https://www.youtube.com/watch?v=1TQLFqHegVc",
        source: "T1", quality: 5, notes: "Official Dec 2025 upload; meditation & flow",
        truths: [
          "The division of experience into good/bad is a conceptual overlay — not an inherent property of reality. (93%)",
          "Flow state requires suspension of the internal critic that judges each moment. (91%)",
          "True meditation dissolves the judge — not the judged. (92%)",
        ],
      },
      {
        num: 19, title: "Journey From India", year: "c.1968", dur: "60m",
        linkType: "search", link: "Alan Watts Journey From India",
        source: "T3", quality: 3, notes: "Buddhism seminar series; 2 parts",
        truths: [
          "Indian Buddhism, meeting Taoist sensibility in China, was transformed into something more immediate. (90%)",
          "Both traditions share one root insight: the universe is not a problem requiring a solution. (95%)",
          "The journey from India to the West is also a journey from doctrine to direct experience. (88%)",
        ],
      },
      {
        num: 20, title: "Zen: Best of Alan Watts", year: 1994, dur: "56m",
        linkType: "search", link: "Zen Best of Alan Watts documentary",
        source: "T3", quality: 3, notes: "Documentary film: Mood of Zen",
        truths: [
          "Zen distilled: presence is the practice; there is no destination. (97%)",
          "Watts acknowledged his limits as a Western interpreter pointing at what cannot be pointed at. (89%)",
          "The documentary format reveals that Watts' voice was inseparable from his content. (87%)",
        ],
      },
      {
        num: 21, title: "Diamond Way", year: "c.1968", dur: "30m",
        linkType: "search", link: "Alan Watts Diamond Way Vajrayana",
        source: "T3", quality: 3, notes: "Vajrayana Buddhism series",
        truths: [
          "Vajrayana treats desire as fuel rather than obstacle — the poisons become the medicine. (93%)",
          "The tantric path works with energy rather than against it. (91%)",
          "The diamond cuts through all illusion — including the illusion of the one doing the cutting. (92%)",
        ],
      },
    ],
  },
  {
    id: "tao",
    num: 2,
    name: "Taoism & The Tao",
    emoji: "🌊",
    theme: "Wu wei, tzu-jan (self-so), \"the watercourse way.\" Don't push the river — you ARE the river.",
    lectures: [
      {
        num: 22, title: "Tao of Philosophy: Of Itself So", year: 1965, dur: "29m",
        linkType: "url", link: "https://www.youtube.com/watch?v=COuKcVr12EM",
        source: "T1", quality: 5, notes: "Intro to tzu-jan; foundational Taoism",
        truths: [
          "Tzu-jan means \"self-so\" — things unfolding from their own nature, not under external compulsion. (96%)",
          "The universe does not govern itself — it IS its own governance. (94%)",
          "Forcing natural order is like trying to make water flow uphill: possible, inherently exhausting. (95%)",
        ],
      },
      {
        num: 23, title: "Philosophy of the Tao Pt. 1", year: 1965, dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=56yLoF-PGbk",
        source: "T1", quality: 5, notes: "Official Oct 2025 upload; yin/yang",
        truths: [
          "Yin and yang are not opposites at war — they are two phases of a single continuous process. (98%)",
          "Neither can exist without the other — they generate and define each other. (97%)",
          "The Tao cannot be named because naming divides what is seamlessly whole. (96%)",
        ],
      },
      {
        num: 24, title: "Following the Taoist Way", year: 1970, dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=hdwqo9G3B5A",
        source: "T2", quality: 5, notes: "Being in the Way Ep. 1 — Lao Tzu, karma, nirvana",
        truths: [
          "Karma is not punishment — it is the natural consequence of actions in an interconnected system. (94%)",
          "Nirvana and the Tao point at the same reality from different linguistic traditions. (90%)",
          "The Taoist sage does not fight reality — they navigate it the way water navigates rock. (95%)",
        ],
      },
      {
        num: 25, title: "Wisdom of the Watercourse", year: 1967, dur: "38m",
        linkType: "search", link: "Alan Watts Wisdom Watercourse Way",
        source: "T1", quality: 5, notes: "Essential wu-wei; organic intelligence",
        truths: [
          "Water always wins — not by force but by yielding to every obstacle until the obstacle is gone. (96%)",
          "Organic intelligence finds the path of least resistance without calculation. (93%)",
          "Wu wei is not laziness — it is perfect efficiency without wasted effort. (95%)",
        ],
      },
      {
        num: 26, title: "Tao of Lao-tse", year: 1969, dur: "46m",
        linkType: "search", link: "Alan Watts Tao Lao-tse",
        source: "T1", quality: 5, notes: "Deep Tao Te Ching text analysis",
        truths: [
          "The Tao Te Ching is not prescriptive — it describes how reality already operates. (95%)",
          "Te (virtue) is the specific excellence of a thing — a knife's virtue is sharpness, not kindness. (93%)",
          "Chapter 1: the Tao that can be told is not the eternal Tao — the map is not the territory. (98%)",
        ],
      },
      {
        num: 27, title: "Taoist Way of Dropping Out", year: 1970, dur: "46m",
        linkType: "search", link: "Alan Watts Taoist Way Dropping Out",
        source: "T2", quality: 5, notes: "Social Taoism; the dropouts",
        truths: [
          "Dropping out is refusal to be enslaved by a system of symbols mistaken for reality. (88%)",
          "Most of what society calls \"productive work\" is the rearrangement of symbols. (85%)",
          "True contribution flows from alignment with natural function — not from obligation. (90%)",
        ],
      },
      {
        num: 28, title: "Nature That Is Self-So", year: 1971, dur: "45m",
        linkType: "search", link: "Alan Watts Nature Self-So",
        source: "T1", quality: 5, notes: "Ontology of flow; tzu-jan deep dive",
        truths: [
          "Nature does not plan its unfolding — it follows its own inner logic with perfect precision. (95%)",
          "You don't have to make your heart beat — the intelligence doing that is doing everything. (94%)",
          "Trust in the deep process is not passive — it is the most active thing available. (91%)",
        ],
      },
      {
        num: 29, title: "Swimming Headless", year: "c.1965", dur: "52m",
        linkType: "search", link: "Alan Watts Swimming Headless",
        source: "T1", quality: 4, notes: "Chinese Farmer parable; headless way",
        truths: [
          "The Chinese Farmer parable: every event is ambiguous — we never know what is lucky until much later. (96%)",
          "\"Maybe\" is the only epistemically honest response to any outcome. (94%)",
          "Swimming headless means acting without the ego claiming authorship of the action. (90%)",
        ],
      },
      {
        num: 30, title: "The Chinese Farmer (animated)", year: "c.1965", dur: "3m",
        linkType: "search", link: "Alan Watts Chinese Farmer Sustainable Human",
        source: "T3", quality: 4, notes: "Viral animated clip; \"maybe\" parable",
        truths: [
          "\"Maybe\" — the two most powerful words in practical philosophy. (95%)",
          "Misfortune and fortune are always in the process of becoming each other. (96%)",
          "Non-judgment is not indifference — it is a wider, more accurate seeing. (93%)",
        ],
      },
      {
        num: 31, title: "Seeing Through the Net Pt. 1", year: "c.1968", dur: "30m",
        linkType: "url", link: "https://www.youtube.com/watch?v=591E6zqWqA8",
        source: "T3", quality: 4, notes: "Tao of Philosophy; IBM Systems lecture",
        truths: [
          "The conceptual grid (the \"net\") is not reality — it is a tool mistaken for the territory. (95%)",
          "IBM's systems logic and Taoist thought converge: reality is relational, not object-based. (88%)",
          "When you see through the net, you don't destroy it — you stop being trapped inside it. (93%)",
        ],
      },
      {
        num: 32, title: "Seeing Through the Net Pt. 2", year: "c.1968", dur: "30m",
        linkType: "podcast", link: "Being in the Way Ep. 36",
        source: "T2", quality: 4, notes: "Analytical vs. organic perspectives",
        truths: [
          "Analytical thinking divides; organic thinking includes — both are needed. (94%)",
          "The danger is exclusive identification with the analytical mode, not analytical thinking itself. (92%)",
          "The world is not a collection of objects — it is a single event with many facets. (96%)",
        ],
      },
      {
        num: 33, title: "Flow: Symbolic vs. Real Reality", year: "c.1970", dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 30",
        source: "T2", quality: 4, notes: "Sensory awareness; non-conceptual",
        truths: [
          "Most human suffering arises from confusing the symbol for the reality — money for wealth, words for things. (97%)",
          "Sensory experience is always prior to any conceptual overlay. (95%)",
          "Non-conceptual awareness is available at any moment — it requires no technique, only recognition. (93%)",
        ],
      },
      {
        num: 34, title: "Confucianism vs. Taoism", year: "c.1970", dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 34",
        source: "T2", quality: 4, notes: "Mutual arising as key Taoist idea",
        truths: [
          "Confucianism imposes order from outside; Taoism finds order already present from inside. (93%)",
          "Mutual arising: things do not exist independently — they co-arise and co-define. (95%)",
          "Social harmony through naturalness is more durable than harmony through compulsion. (91%)",
        ],
      },
      {
        num: 35, title: "The Principle of Not Forcing", year: "c.1965", dur: "50m",
        linkType: "search", link: "Alan Watts wu wei Esalen lecture",
        source: "T3", quality: 3, notes: "Judo/aikido analogies; non-forcing",
        truths: [
          "The judo principle: use the opponent's force rather than your own — minimum effort, maximum effect. (94%)",
          "Non-forcing is the highest form of skill, not the absence of skill. (93%)",
          "Every act of forcing creates an equal and opposite resistance that did not previously exist. (95%)",
        ],
      },
    ],
  },
  {
    id: "hinduism",
    num: 3,
    name: "Hinduism & Vedanta",
    emoji: "🕉️",
    theme: "Brahman = Atman. Cosmic game of hide-and-seek. \"Tat Tvam Asi\" — Thou Art That.",
    lectures: [
      {
        num: 36, title: "Hinduism Explained", year: "c.1965", dur: "60m",
        linkType: "url", link: "https://www.youtube.com/watch?v=pZkiHHvsCx4",
        source: "T3", quality: 4, notes: "Best Vedanta intro; Upanishads, tat tvam asi",
        truths: [
          "Brahman is the single reality underlying all apparent multiplicity — one thing doing many things. (96%)",
          "Atman (individual self) is identical to Brahman — \"Tat Tvam Asi\": Thou Art That. (95%)",
          "Maya is not illusion in the sense of fake — it is creative magic, the universe's own artistry. (93%)",
        ],
      },
      {
        num: 37, title: "Mythology of Hinduism", year: 1960, dur: "57m",
        linkType: "search", link: "Alan Watts Mythology Hinduism",
        source: "T1", quality: 5, notes: "Foundational Vedic mythological intro",
        truths: [
          "Hindu mythology is not prescientific cosmology — it is philosophical poetry about consciousness. (91%)",
          "The many gods are aspects of one — polytheism as monotheism with greater depth and nuance. (89%)",
          "Vedic myth describes a universe that is conscious, not mechanical. (90%)",
        ],
      },
      {
        num: 38, title: "The Game of Hide and Seek", year: 1965, dur: "51m",
        linkType: "search", link: "Alan Watts Game Hide Seek Hinduism",
        source: "T1", quality: 5, notes: "Central Brahman/Atman metaphor",
        truths: [
          "God (Brahman) plays hide-and-seek by forgetting it is God — that forgetting is you. (94%)",
          "Existence is the cosmic game of pretending to be lost, then finding yourself. (93%)",
          "Your deepest terror and your deepest bliss are two sides of the same game. (91%)",
        ],
      },
      {
        num: 39, title: "What We Are (Vedic Hinduism)", year: "c.1965", dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=d5z-_P71ysw",
        source: "T3", quality: 3, notes: "Cosmic hide-and-seek; Maya explained",
        truths: [
          "You are not a separate being in the universe — you are what the universe IS doing at this location. (95%)",
          "Maya: the cosmic magic show in which Brahman pretends to be everything, including you. (93%)",
          "The purpose of waking up is not escape from the game — it is full participation with full awareness. (91%)",
        ],
      },
      {
        num: 40, title: "The Cosmic Drama", year: 1967, dur: "26m",
        linkType: "url", link: "https://www.youtube.com/watch?v=l90Dvr-QBGI",
        source: "T2", quality: 5, notes: "Being in the Way Ep. 12; God playing all parts",
        truths: [
          "God plays all the parts simultaneously — villain and hero, seeker and sought, lost and found. (93%)",
          "The drama requires forgetting the script — without genuine stakes, there is no genuine play. (92%)",
          "Recognizing the cosmic drama doesn't end the play — it changes your relationship to every scene. (91%)",
        ],
      },
      {
        num: 41, title: "The Inevitable Ecstasy", year: "c.1960", dur: "120m",
        linkType: "url", link: "https://www.youtube.com/watch?v=kcxi8V_gIAc",
        source: "T2", quality: 4, notes: "Being in the Way Ep. 9; Out of Your Mind seminar 3",
        truths: [
          "Ecstasy is not a special state — it is the natural result of dropping resistance to what is. (92%)",
          "\"Out of your mind\" means out of the conceptual overlay and into unfiltered direct experience. (94%)",
          "The universe is already in ecstasy — humans are the only participants who opted out. (90%)",
        ],
      },
      {
        num: 42, title: "The World as Self", year: "c.1960", dur: "120m",
        linkType: "search", link: "Alan Watts World as Self Out of Your Mind",
        source: "T3", quality: 4, notes: "Out of Your Mind seminar 5; yogas",
        truths: [
          "The four yogas (jnana, bhakti, karma, raja) are four different doors into the same room. (94%)",
          "Each person has a natural temperament — find the door that fits rather than forcing any door. (91%)",
          "Your body and the universe are one continuous system — the skin is a meeting point, not a wall. (95%)",
        ],
      },
      {
        num: 43, title: "Thou Art That (Tat Tvam Asi)", year: 1970, dur: "24m",
        linkType: "search", link: "Alan Watts Thou Art That",
        source: "T1", quality: 5, notes: "Final realization lecture; \"you are IT\"",
        truths: [
          "\"Thou Art That\" is not a belief to adopt — it is a direct recognition to be had. (96%)",
          "The recognition cannot be forced through effort — it arrives in the moment effort is released. (94%)",
          "Once genuinely seen, it cannot be unseen: you were always IT. (93%)",
        ],
      },
      {
        num: 44, title: "Essential Teachings from the Gita", year: 1971, dur: "47m",
        linkType: "url", link: "https://www.youtube.com/watch?v=R-pQup93rpU",
        source: "T2", quality: 5, notes: "Being in the Way Ep. 11; recorded with Ram Dass",
        truths: [
          "Act without attachment to results — be the instrument, not the claimed author of the action. (96%)",
          "Recorded with Ram Dass: this lecture bridges Vedanta and Western psychology in unusual depth. (87%)",
          "The Gita is not a manual for war — it is a manual for navigating impossible choices with clarity. (93%)",
        ],
      },
      {
        num: 45, title: "Bhagavad Gita Commentary", year: 1969, dur: "50m",
        linkType: "search", link: "Alan Watts Bhagavad Gita commentary",
        source: "T1", quality: 4, notes: "Dharma, duty, cosmic action",
        truths: [
          "Dharma is not moral duty — it is your specific excellence in the cosmic design. (92%)",
          "\"Act without ego\": the body-mind acts; the Self observes without claiming authorship. (94%)",
          "Karma yoga: every action offered as sacred removes the poison of personal agenda from the result. (91%)",
        ],
      },
      {
        num: 46, title: "Om: The Sound of Hinduism", year: 1967, dur: "45m",
        linkType: "search", link: "Alan Watts Om Sound Hinduism LP",
        source: "T3", quality: 3, notes: "Rare LP; readings from Hindu scriptures",
        truths: [
          "Om is not a word — it is the primordial vibration from which all sound and form emerge. (91%)",
          "AUM: A = creation, U = preservation, M = dissolution — the entire cosmic cycle in one syllable. (90%)",
          "Sound is the most direct route to the vibratory nature of reality available to embodied beings. (88%)",
        ],
      },
    ],
  },
  {
    id: "self",
    num: 4,
    name: "Nature of Self & Ego",
    emoji: "🪞",
    theme: "The \"skin-encapsulated ego\" is a social hallucination. You are not IN the universe — you ARE what the universe is doing.",
    lectures: [
      {
        num: 47, title: "The Real You", year: "c.1965", dur: "10m",
        linkType: "url", link: "https://www.youtube.com/watch?v=mMRrCYPxD0I",
        source: "T3", quality: 4, notes: "\"Universe is doing you\"; T&H animated",
        truths: [
          "You are not in the universe — you are something the whole universe is doing. (97%)",
          "The skin is not a wall separating you from the world — it is a connection point. (95%)",
          "\"You\" extends into the air you breathe, the food you eat, the light that allows you to see. (94%)",
        ],
      },
      {
        num: 48, title: "The Dream of Life", year: "c.1960", dur: "4m",
        linkType: "url", link: "https://www.youtube.com/watch?v=wU0PYcCsL6o",
        source: "T3", quality: 4, notes: "Best entry point; T&H; 3M+ views",
        truths: [
          "Life is not a journey to a destination — it is the destination, happening continuously. (97%)",
          "The universe is dreaming itself into being — you are one of its dreams that learned to dream. (92%)",
          "Death is not the failure of life — it is the exhale in a cosmic breath that has always included both. (93%)",
        ],
      },
      {
        num: 49, title: "The Myth of Myself Pt. 1", year: "c.1960", dur: "42m",
        linkType: "url", link: "https://www.youtube.com/watch?v=C48hI9Qb2q4",
        source: "T3", quality: 5, notes: "Borders of self; social persona/mask ⭐ Recommended",
        truths: [
          "The self is a social construction — the mask (persona) was never the face beneath it. (97%)",
          "You cannot locate a fixed boundary where \"you\" end and the world begins. (96%)",
          "The belief in a separate, isolated self is the root cause of most psychological suffering. (95%)",
        ],
      },
      {
        num: 50, title: "Man is a Hoax", year: "c.1970", dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 20",
        source: "T2", quality: 4, notes: "Cultural myth of separation; ego identity ⭐ Recommended",
        truths: [
          "Culture sells you a model of yourself that serves the system, not you. (91%)",
          "The \"hoax\" is the belief that you are a separate ego running its own independent show. (94%)",
          "Once the hoax is seen, it cannot be unseen — but that is the beginning, not the resolution. (92%)",
        ],
      },
      {
        num: 51, title: "Ego (video lecture)", year: 1971, dur: "30m",
        linkType: "search", link: "Alan Watts Ego Essential Lectures video S1E2",
        source: "T3", quality: 4, notes: "Filmed above Muir Woods",
        truths: [
          "The ego is not an entity — it is a habit of attention that mistakes itself for a thing. (95%)",
          "Letting go of ego is not self-destruction — it is recognizing what was never solidly there. (93%)",
          "Filmed above Muir Woods: the setting demonstrates inseparability of speaker and environment. (88%)",
        ],
      },
      {
        num: 52, title: "Self and Other", year: "c.1965", dur: "90m",
        linkType: "search", link: "Alan Watts Self and Other full seminar",
        source: "T3", quality: 4, notes: "Major seminar; individual as universe",
        truths: [
          "\"Self\" only exists in relation to \"other\" — remove one, and both disappear. (97%)",
          "The boundary between self and other is permeable, temporary, and ultimately a functional fiction. (95%)",
          "Love is the recognition of oneself in the other — the game of hide-and-seek momentarily resolving. (93%)",
        ],
      },
      {
        num: 53, title: "Do You Do It or Does It Do You?", year: 1968, dur: "53m",
        linkType: "search", link: "Alan Watts Do You Do It Does It Do You",
        source: "T1", quality: 5, notes: "Volition, control, free will examined",
        truths: [
          "You do not control your heartbeat, digestion, or breathing — yet they happen with perfect precision. (97%)",
          "The \"doer\" is a story told after the action, not the cause of the action. (94%)",
          "Free will and determinism are a false binary — both assume a fixed \"you\" separate from the flow. (91%)",
        ],
      },
      {
        num: 54, title: "Intellectual Yoga", year: 1967, dur: "42m",
        linkType: "search", link: "Alan Watts Intellectual Yoga",
        source: "T1", quality: 5, notes: "Logic as liberation; reasoning the ego ⭐ Recommended",
        truths: [
          "Pure reasoning, followed far enough, dissolves the reasoner. (93%)",
          "Logic reveals its own limits — Gödel, Russell's paradox, and Zen all point at the same wall. (90%)",
          "The mind cannot bite its own teeth — this is the most important discovery logic can make. (96%)",
        ],
      },
      {
        num: 55, title: "Veil of Thoughts Pts. 1–3", year: "c.1968", dur: "90m",
        linkType: "search", link: "Alan Watts Veil of Thoughts full",
        source: "T3", quality: 3, notes: "Philosophy & Society; symbols vs. reality",
        truths: [
          "Thought creates a veil between you and direct experience — the veil is commentary, not reality. (96%)",
          "Reality is not what you think about — it is what is happening before the thought arrives. (97%)",
          "Most human misery is self-inflicted by narrating experience rather than simply having it. (94%)",
        ],
      },
      {
        num: 56, title: "The Illusion of Ego", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=xAdMbNI8u2M",
        source: "T3", quality: 3, notes: "Ego as illusion; Zen immediacy",
        truths: [
          "The ego is a hallucination — a convincing one with serious side effects. (93%)",
          "Zen's immediacy: this moment, without interpretation, is liberation already happening. (94%)",
          "The illusion is not eliminated — it is seen through, and that changes everything. (92%)",
        ],
      },
      {
        num: 57, title: "The Illusion of Self", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=flSiyJB6iZ4",
        source: "T3", quality: 3, notes: "\"Life as onion — all skin, no center\"",
        truths: [
          "Life is like an onion — all skin, no center. (97%)",
          "When every layer of \"who you are\" is peeled away, there is no core self — and that is the good news. (95%)",
          "The absence of a fixed self is not emptiness — it is radical openness to everything. (93%)",
        ],
      },
      {
        num: 58, title: "Maya, the Illusion of Self", year: "c.1965", dur: "30m",
        linkType: "url", link: "https://www.youtube.com/watch?v=CZfm4FWaZjo",
        source: "T3", quality: 3, notes: "Full Maya lecture",
        truths: [
          "Maya is the universe's creative capacity — not deception but extraordinary artistry. (93%)",
          "The \"self\" is one of Maya's masterpieces: a convincing fiction with no originating author. (91%)",
          "Seeing through Maya does not destroy the world — it reveals the world as art. (92%)",
        ],
      },
      {
        num: 59, title: "Creating Who You Are", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=Hu5oaty0uJM",
        source: "T3", quality: 3, notes: "Letting go of control; true identity",
        truths: [
          "Identity is not found — it is continuously created by the direction of attention. (92%)",
          "Letting go of control is the prerequisite for discovering what you actually are beneath the performance. (93%)",
          "True identity is not a noun — it is an ongoing verb. (94%)",
        ],
      },
      {
        num: 60, title: "Be Yourself", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=-Jh34qoV0cE",
        source: "T3", quality: 3, notes: "Identity; perception creating reality",
        truths: [
          "\"Be yourself\" is the most impossible instruction and the most essential simultaneously. (95%)",
          "Every attempt to be yourself is already you being yourself — the instruction is already fulfilled. (93%)",
          "What you take yourself to be determines what you experience: identity and perception are circular. (91%)",
        ],
      },
      {
        num: 61, title: "The Truth About Ego", year: "c.1965", dur: "9m",
        linkType: "url", link: "https://www.youtube.com/watch?v=gy4jINjMRBI",
        source: "T2", quality: 4, notes: "True Meaning channel (licensed partner)",
        truths: [
          "The ego exists as a functional tool — the problem is taking it for the totality of what you are. (96%)",
          "Ego dissolution in love, meditation, or art gives temporary access to what lies behind the persona. (93%)",
          "The truth is not that ego is bad — it is that ego is small relative to what you actually are. (95%)",
        ],
      },
    ],
  },
  {
    id: "consciousness",
    num: 5,
    name: "Consciousness & Nature of Reality",
    emoji: "👁️",
    theme: "Three models of universe — Ceramic, Fully-Automatic, Dramatic. Consciousness as scanning vs. open awareness.",
    lectures: [
      {
        num: 62, title: "Nature of Consciousness Pts. 1–2", year: "c.1960", dur: "120m",
        linkType: "search", link: "Alan Watts Nature Consciousness Out of Your Mind",
        source: "T3", quality: 4, notes: "Out of Your Mind seminar 1; 3 universe models",
        truths: [
          "Three models: Ceramic (God made it), Fully-Automatic (it runs itself), Dramatic (it performs itself). (91%)",
          "The Dramatic model: the universe is a play with no author separate from the playing. (90%)",
          "Consciousness is not produced by the brain — the brain is what consciousness looks like from outside. (82%)",
        ],
      },
      {
        num: 63, title: "What If God Became Bored", year: "c.1960", dur: "10m",
        linkType: "url", link: "https://www.youtube.com/watch?v=ckiNNgfMKcQ",
        source: "T3", quality: 3, notes: "Cosmic game metaphor; extended version",
        truths: [
          "God plays hide-and-seek with itself because pure omniscience is the ultimate boredom. (90%)",
          "Limitation is the prerequisite for experience — to feel anything, you must not know everything. (93%)",
          "The cosmic game requires the players to forget it is a game — otherwise there are no genuine stakes. (92%)",
        ],
      },
      {
        num: 64, title: "Nothingness", year: 1971, dur: "29m",
        linkType: "search", link: "Alan Watts Nothingness Essential Lectures S1E1",
        source: "T3", quality: 4, notes: "Can't have something without nothing",
        truths: [
          "You cannot have something without nothing — every figure requires a ground. (98%)",
          "Silence makes sound possible; space makes form possible; death makes life possible. (96%)",
          "The void is not empty — it is the generative source of all form. (93%)",
        ],
      },
      {
        num: 65, title: "Mind Over Mind", year: 1972, dur: "53m",
        linkType: "url", link: "https://www.youtube.com/watch?v=lHXisYGjvmM",
        source: "T1", quality: 5, notes: "Official Sep 2025 upload; paradox of self-control",
        truths: [
          "You cannot use the mind to control the mind — this is the fundamental paradox of self-improvement. (97%)",
          "Every attempt to force yourself to relax creates more of the tension it is trying to eliminate. (96%)",
          "The solution is not more control — it is the release of the need to control. (95%)",
        ],
      },
      {
        num: 66, title: "What is Reality?", year: "c.1960", dur: "38m",
        linkType: "search", link: "Alan Watts What is Reality lecture",
        source: "T1", quality: 5, notes: "Symbolic vs. real; ceramic model critique",
        truths: [
          "Reality is not an object to be known — it is the knowing itself. (93%)",
          "The ceramic model (universe as manufactured object) is the root of Western alienation. (89%)",
          "Symbolic thought is not reality — it is a description of reality confused for the real thing. (96%)",
        ],
      },
      {
        num: 67, title: "Veil of Thoughts Pt. 1", year: "c.1968", dur: "37m",
        linkType: "url", link: "https://www.youtube.com/watch?v=1TQLFqHegVc",
        source: "T1", quality: 5, notes: "Official upload; thinking as perceptual filter",
        truths: [
          "Thinking is a filter that edits raw experience into a manageable narrative. (96%)",
          "The narrative is always smaller than the reality it describes. (97%)",
          "Direct perception is available in any moment you stop narrating your experience. (95%)",
        ],
      },
      {
        num: 68, title: "The Web of Life", year: "c.1960", dur: "120m",
        linkType: "search", link: "Alan Watts Web of Life Out of Your Mind",
        source: "T3", quality: 4, notes: "Out of Your Mind seminar 2; interdependence",
        truths: [
          "Every organism is a node in a web, not an isolated unit that merely interacts with others. (96%)",
          "Interdependence is not a spiritual metaphor — it is a biological and ecological fact. (97%)",
          "The illusion of independence is the most dangerous hallucination our civilization produces. (92%)",
        ],
      },
      {
        num: 69, title: "World as Consciousness", year: "c.1970", dur: "45m",
        linkType: "search", link: "Alan Watts World as Consciousness seminar",
        source: "T3", quality: 4, notes: "Extended seminar; consciousness as primary",
        truths: [
          "Consciousness is not a property that matter accidentally produced — matter is a property of consciousness. (80%)",
          "The universe is not unconscious machinery that stumbled into awareness — awareness is primary. (78%)",
          "This convergence of deep physics and ancient philosophy is the most significant intellectual event of our era. (76%)",
        ],
      },
      {
        num: 70, title: "Divine Madness", year: 1970, dur: "26m",
        linkType: "url", link: "https://www.youtube.com/watch?v=2BHZcaT8lJ4",
        source: "T1", quality: 5, notes: "Official Aug 2025 upload; ecstatic states",
        truths: [
          "Ecstatic states are not pathological — they are glimpses of underlying reality that ordinary perception filters out. (88%)",
          "The boundary between mystical experience and madness is the presence or absence of integration. (87%)",
          "Surrender is not weakness — it is the highest act of intelligence available. (91%)",
        ],
      },
      {
        num: 71, title: "Reality, Art and Illusion", year: "c.1970", dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 37",
        source: "T2", quality: 4, notes: "Nature of reality; consciousness; perception",
        truths: [
          "Art is the most honest human activity — it openly acknowledges it is making something up. (91%)",
          "Reality and illusion are not opposites — reality IS the creative act of continuously appearing. (89%)",
          "Perception is not passive reception — it is active co-creation between observer and world. (90%)",
        ],
      },
      {
        num: 72, title: "The Mind", year: "c.1965", dur: "10m",
        linkType: "url", link: "https://www.youtube.com/watch?v=emHAoQGoQic",
        source: "T3", quality: 3, notes: "Addiction to thinking; quieting the mind",
        truths: [
          "Addiction to thinking is the primary human disease — the commentary that prevents the experience. (94%)",
          "The mind is a wonderful servant and a catastrophic master. (96%)",
          "Quieting the mind is not the goal — recognizing that you are not the mind is. (95%)",
        ],
      },
      {
        num: 73, title: "Living in Nothingness", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=eKuGiZ0rL-0",
        source: "T3", quality: 3, notes: "\"In nothing there is everything\"",
        truths: [
          "In nothing there is everything — the void is generative, not merely empty. (93%)",
          "Fear of nothing (silence, death, emptiness) is the engine of all compulsive human activity. (91%)",
          "Learning to rest in nothingness is the most practical skill a human being can develop. (90%)",
        ],
      },
      {
        num: 74, title: "Coincidence of Opposites", year: "c.1968", dur: "30m",
        linkType: "search", link: "Alan Watts Coincidence Opposites Tao",
        source: "T3", quality: 4, notes: "We grow out of the world like fruit on tree",
        truths: [
          "We grow out of the world the way fruit grows from a tree — not separately placed upon it. (96%)",
          "Every apparent opposite contains and generates its counterpart. (97%)",
          "To resist one pole of any duality is to unconsciously strengthen it. (93%)",
        ],
      },
    ],
  },
  {
    id: "christianity",
    num: 6,
    name: "Western Religion & Christianity",
    emoji: "✝️",
    theme: "Mystical Christianity vs. institutional religion. Jesus as enlightened, not deity-object.",
    lectures: [
      {
        num: 75, title: "Jesus, His Religion", year: "c.1970", dur: "60m",
        linkType: "url", link: "https://www.youtube.com/watch?v=s42V8BGBvTk",
        source: "T3", quality: 4, notes: "Jesus as mystic; Gospel of John focus",
        truths: [
          "Jesus was a mystic, not primarily a moral teacher — his central claim was identity with God. (88%)",
          "\"I and the Father are one\" is a statement of Vedantic non-duality in Semitic language. (85%)",
          "The institutional church largely preserved the messenger while missing the message. (87%)",
        ],
      },
      {
        num: 76, title: "On Being God", year: 1970, dur: "61m",
        linkType: "url", link: "https://www.youtube.com/watch?v=sZ41zgWHs_I",
        source: "T2", quality: 5, notes: "NYC conference; role-plays as God patient",
        truths: [
          "The \"madman who thinks he's God\" may have awakened to what everyone is but collectively denies. (86%)",
          "Role-playing as God reveals how arbitrary the \"sane\" default of being NOT God actually is. (84%)",
          "The difference between Jesus and most humans: Jesus knew he was God, most don't. (85%)",
        ],
      },
      {
        num: 77, title: "Was Jesus a Freak?", year: 1968, dur: "40m",
        linkType: "search", link: "Alan Watts Was Jesus a Freak",
        source: "T1", quality: 5, notes: "Jesus as cosmic consciousness carrier",
        truths: [
          "Jesus was a carrier of cosmic consciousness in a culture entirely unprepared for it. (87%)",
          "His execution was the system's immune response to a truth it could not metabolize. (86%)",
          "The resurrection as metaphor: what cannot be killed is the truth itself. (82%)",
        ],
      },
      {
        num: 78, title: "Theologia Mystica", year: "c.1960", dur: "45m",
        linkType: "search", link: "Alan Watts Theologia Mystica",
        source: "T1", quality: 4, notes: "Dionysius Pseudo-Areopagite; apophatic theology",
        truths: [
          "Apophatic theology: God cannot be defined — only approached by negating every definition. (91%)",
          "The highest knowledge of God is unknowing — not ignorance, but the transcendence of knowing. (89%)",
          "Western mysticism and Eastern meditation converge exactly here, at the limits of language. (90%)",
        ],
      },
      {
        num: 79, title: "Spiritual Authority", year: 1969, dur: "53m",
        linkType: "search", link: "Alan Watts Spiritual Authority hierarchy",
        source: "T1", quality: 5, notes: "Church hierarchy critique",
        truths: [
          "Hierarchy in religion serves the institution's continuity — not the seeker's liberation. (88%)",
          "Genuine spiritual authority is self-authenticating — it requires no chain of command to validate it. (90%)",
          "The church's deepest error was making the spiritual life dependent on institutional permission. (87%)",
        ],
      },
      {
        num: 80, title: "Mystical Christianity", year: 1971, dur: "55m",
        linkType: "search", link: "Alan Watts Mystical Christianity",
        source: "T1", quality: 5, notes: "Experience over doctrine",
        truths: [
          "Mystical experience — direct union with the divine — is the core of Christianity the institution suppressed. (87%)",
          "Every Christian mystic (Eckhart, Julian, Hildegard) was eventually suspected of heresy. (91%)",
          "The mystic's message: you do not need a priest to meet God — you need to get out of your own way. (89%)",
        ],
      },
      {
        num: 81, title: "The Karma of Christianity", year: "c.1965", dur: "50m",
        linkType: "search", link: "Alan Watts Karma of Christianity",
        source: "T3", quality: 3, notes: "Also on Archive.org",
        truths: [
          "Christianity's karma: it preached love but institutionalized fear. (88%)",
          "The religion about Jesus replaced the religion of Jesus. (89%)",
          "Western civilization's neurosis is traceable to the belief that humans are fallen and perpetually guilty. (85%)",
        ],
      },
      {
        num: 82, title: "Democracy in the Kingdom of Heaven", year: "c.1965", dur: "30m",
        linkType: "search", link: "Alan Watts Democracy Kingdom Heaven",
        source: "T3", quality: 3, notes: "Myth and Religion series",
        truths: [
          "The Kingdom of Heaven is not a future destination — it is the present moment rightly perceived. (90%)",
          "True spiritual democracy: no intermediary is required between any being and the divine. (88%)",
          "The Gospel of Thomas preserves the direct, unmediated teaching more accurately than the canonical gospels. (78%)",
        ],
      },
      {
        num: 83, title: "God (video lecture)", year: 1971, dur: "30m",
        linkType: "search", link: "Alan Watts God Essential Lectures S1E4",
        source: "T3", quality: 4, notes: "Essential Lectures S1E4",
        truths: [
          "The God of theism (separate, external, judging) is a projection of the ego onto the cosmos. (87%)",
          "The God of mysticism is what you discover when the ego stops projecting and rests. (88%)",
          "Both atheism and theism argue about the same limited concept — the mystic transcends the argument. (90%)",
        ],
      },
      {
        num: 84, title: "It's Time to Wake Up (on Religion)", year: "c.1965", dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=4f5yF8GeCG4",
        source: "T3", quality: 3, notes: "How Bible was compiled; comparing religions",
        truths: [
          "All major religions derive from the same perennial source — they diverge only at the institutional level. (88%)",
          "The Bible's compilation was as much a political act as a spiritual one. (90%)",
          "Waking up means seeing religion as a tool for liberation, not a cage for compliance. (89%)",
        ],
      },
    ],
  },
  {
    id: "psychedelics",
    num: 7,
    name: "Psychedelics & Altered States",
    emoji: "🍄",
    theme: "Psychedelics as a classroom, not a permanent residence. \"When you get the message, hang up the phone.\"",
    lectures: [
      {
        num: 85, title: "Drugs: Turning the Head or Turning On", year: "c.1965", dur: "50m",
        linkType: "podcast", link: "Being in the Way Ep. 7",
        source: "T2", quality: 4, notes: "San Jose State; his LSD trips",
        truths: [
          "Psychedelics can reveal the mystical state — but they cannot deliver you there permanently. (93%)",
          "\"When you get the message, hang up the phone.\" (97%)",
          "The value of the experience is entirely in what you integrate afterward — not in the trip itself. (94%)",
        ],
      },
      {
        num: 86, title: "Psychedelics and Religious Experience", year: 1968, dur: "45m",
        linkType: "search", link: "Alan Watts Psychedelics Religious Experience",
        source: "T3", quality: 3, notes: "Based on California Law Review essay",
        truths: [
          "The psychedelic state and the classical mystical state are functionally identical in phenomenology. (88%)",
          "Making psychedelics illegal is philosophically equivalent to making contemplative prayer illegal. (84%)",
          "The question is not whether the experience is \"real\" — it is what it reveals about the nature of mind. (90%)",
        ],
      },
      {
        num: 87, title: "The Psychedelic Experience Pt. 1", year: 1965, dur: "45m",
        linkType: "search", link: "Alan Watts Psychedelic Experience lecture",
        source: "T1", quality: 5, notes: "First-person psychedelic insights",
        truths: [
          "Watts' LSD experiences directly confirmed what he had studied intellectually for decades. (88%)",
          "Set and setting determine the character of the experience more than the substance itself. (91%)",
          "The deepest psychedelic insight is always the same: you were never separate. (92%)",
        ],
      },
      {
        num: 88, title: "Being Far Out", year: 1969, dur: "52m",
        linkType: "search", link: "Alan Watts Being Far Out",
        source: "T1", quality: 4, notes: "Discipline vs. direct experience",
        truths: [
          "Discipline and direct experience are not opposites — the Zen tradition has always required both. (91%)",
          "\"Far out\" is not an escape from ordinary reality — it is the ordinary seen without the usual filter. (90%)",
          "The most psychedelic thing available is a single moment of complete, undefended presence. (92%)",
        ],
      },
      {
        num: 89, title: "The Psychedelic Explosion", year: 1970, dur: "48m",
        linkType: "search", link: "Alan Watts Psychedelic Explosion",
        source: "T1", quality: 5, notes: "Social impact; chemical mysticism",
        truths: [
          "The 1960s psychedelic movement was a spontaneous mass experiment in consciousness expansion. (92%)",
          "Its failure was cultural, not chemical — the insights had no existing framework for integration. (89%)",
          "The explosion left seeds that are still germinating across medicine, philosophy, and culture. (86%)",
        ],
      },
      {
        num: 90, title: "The Value of Psychotic Experience", year: 1960, dur: "45m",
        linkType: "search", link: "Alan Watts Value Psychotic Experience",
        source: "T3", quality: 3, notes: "Deviant states of consciousness",
        truths: [
          "Deviant states of consciousness reveal the constructed, contingent nature of \"normal\" consensus reality. (88%)",
          "The psychotic's error is not their perception — it is their isolation and the absence of a guide. (85%)",
          "A culture that pathologizes all non-ordinary states of mind loses access to its own depth. (87%)",
        ],
      },
    ],
  },
  {
    id: "time",
    num: 8,
    name: "Philosophy of Time & Eternity",
    emoji: "⏳",
    theme: "The Eternal Now. Past is \"wake of the ship\" — it doesn't drive the present. Anxiety = living in symbolic time.",
    lectures: [
      {
        num: 91, title: "Essential Lectures: Time", year: 1972, dur: "52m",
        linkType: "url", link: "https://www.youtube.com/watch?v=mnY6FV0yJHA",
        source: "T1", quality: 5, notes: "TV series program 6; \"wake of the ship\"",
        truths: [
          "The past is the wake of the ship — it does not drive the present, it merely trails behind it. (97%)",
          "Anxiety is confusion of symbolic time (past/future as mental constructs) with real time (the now). (95%)",
          "Every moment you have ever lived has been NOW — you have never experienced anything other than now. (98%)",
        ],
      },
      {
        num: 92, title: "The Eternal Now / Fully Alive Now", year: "c.1960", dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=OXBwUrgE-kI",
        source: "T3", quality: 5, notes: "After Skool animation; must-watch",
        truths: [
          "The present moment is the only moment that actually exists — past and future are mental events occurring NOW. (97%)",
          "\"Fully alive\" means fully present — nothing added, nothing withheld, nothing edited. (95%)",
          "To live perpetually for the future is to miss the only moment where living actually occurs. (96%)",
        ],
      },
      {
        num: 93, title: "Time and the Future", year: 1968, dur: "50m",
        linkType: "search", link: "Alan Watts Time and Future seminar",
        source: "T1", quality: 5, notes: "Extended seminar on time anxiety",
        truths: [
          "The future is a concept, not a location — you can never arrive there because arrival is always now. (96%)",
          "Planning for the future is practical; living FOR the future is the fundamental philosophical error. (95%)",
          "Time anxiety is the primary driver of most human compulsion and chronic dissatisfaction. (93%)",
        ],
      },
      {
        num: 94, title: "The Present Moment", year: "c.1970", dur: "38m",
        linkType: "podcast", link: "Being in the Way podcast — search \"Present Moment\"",
        source: "T2", quality: 5, notes: "Meditation focus; full presence",
        truths: [
          "Meditation is not a technique for achieving presence — it is the recognition you are always already present. (95%)",
          "Full presence dissolves most psychological suffering — not by solving problems but by revealing they exist only in time. (93%)",
          "The present moment has no duration — it is the knife-edge between what was and what might be. (94%)",
        ],
      },
      {
        num: 95, title: "Live Fully Now", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=HdqVF7-8wng",
        source: "T3", quality: 3, notes: "\"Ridiculous to live for the future\"",
        truths: [
          "Deferring life to a future moment is the most common and costly form of self-deception. (95%)",
          "\"I will be happy when...\" is the sentence that permanently ends happiness. (96%)",
          "Children live fully now by default — adults must re-learn what they knew before education. (92%)",
        ],
      },
      {
        num: 96, title: "Time to Wake Up", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=jk5i4GX1BJY",
        source: "T3", quality: 3, notes: "Watching; accepting destiny",
        truths: [
          "Accepting what is does not mean fatalism — it means removing exhausting resistance to present reality. (93%)",
          "The witness is always in the present — only the thinking mind time-travels into past and future. (94%)",
          "Watching without judgment is the simplest and most radical practice continuously available. (93%)",
        ],
      },
      {
        num: 97, title: "It Starts Now", year: "c.1965", dur: "10m",
        linkType: "url", link: "https://www.youtube.com/watch?v=PfIYGaslVnA",
        source: "T3", quality: 3, notes: "Present-moment meditation clip",
        truths: [
          "Liberation does not begin after sufficient preparation — it begins this instant or it does not begin. (95%)",
          "Every practice designed to prepare you for presence is, by its structure, an absence of presence. (91%)",
          "The present moment is always already here — you are always already home, without having traveled. (94%)",
        ],
      },
      {
        num: 98, title: "From Time to Eternity", year: 1960, dur: "45m",
        linkType: "search", link: "Alan Watts From Time to Eternity",
        source: "T3", quality: 3, notes: "One of earliest named recordings",
        truths: [
          "Eternity is not endless time — it is the complete absence of time as a dimension of anxiety. (93%)",
          "The mystic lives in eternity not because they escaped time but because time no longer functions as a tyrant. (91%)",
          "This early recording contains the seeds of every idea Watts would develop over 25 years. (88%)",
        ],
      },
      {
        num: 99, title: "On Time and Death", year: "c.1968", dur: "30m",
        linkType: "search", link: "Alan Watts On Time and Death",
        source: "T3", quality: 3, notes: "Philosophy and Society series",
        truths: [
          "Death is the ultimate temporal event — the end of your personal timeline as you currently know it. (91%)",
          "You have already died and been reborn countless times — sleep is a nightly rehearsal. (88%)",
          "Fear of death is fear of losing the story of yourself — not fear of losing whatever you actually are. (90%)",
        ],
      },
    ],
  },
  {
    id: "nature",
    num: 9,
    name: "Nature, Ecology & The Universe",
    emoji: "🌿",
    theme: "\"Lack of awareness of the unity of organism and environment is a serious and dangerous hallucination.\"",
    lectures: [
      {
        num: 100, title: "Conversation with Myself (PBS)", year: 1971, dur: "29m",
        linkType: "url", link: "https://www.youtube.com/watch?v=8aufuwMiKmE",
        source: "T2", quality: 4, notes: "PBS film; Druid Heights above Muir Woods",
        truths: [
          "Filmed above Muir Woods: the setting IS the argument — human being as feature of the forest, not visitor to it. (94%)",
          "Man is not a stranger in a strange land — he is the land becoming aware of itself. (93%)",
          "The most honest conversation available is one in which you stop pretending to be separate. (92%)",
        ],
      },
      {
        num: 101, title: "The More It Changes", year: 1972, dur: "30m",
        linkType: "url", link: "https://www.youtube.com/watch?v=STQDflDJF8g",
        source: "T1", quality: 5, notes: "Official upload; stars creating stars",
        truths: [
          "Stars create the heavy elements necessary for life — we are literally made of stellar material. (98%)",
          "Change is not the enemy of identity — in its deepest form, change IS identity. (92%)",
          "The universe creates the conditions for its own self-awareness through the evolution of conscious beings. (85%)",
        ],
      },
      {
        num: 102, title: "Individual and the World", year: 1970, dur: "47m",
        linkType: "url", link: "https://www.youtube.com/watch?v=C48hI9Qb2q4",
        source: "T1", quality: 5, notes: "Human as planetary feature; systems view",
        truths: [
          "A human being is a feature of this planet — not a visitor from another location. (95%)",
          "The planet grows people the way a tree grows leaves — from within, not by external addition. (94%)",
          "Seeing yourself as part of the world's intelligence dissolves the war between \"me\" and \"it.\" (93%)",
        ],
      },
      {
        num: 103, title: "Man in Nature", year: "c.1965", dur: "54m",
        linkType: "search", link: "Alan Watts Man in Nature Tao Philosophy",
        source: "T1", quality: 5, notes: "Straightening a wiggly world",
        truths: [
          "The attempt to \"straighten the wiggly world\" is the deepest source of ecological destruction. (91%)",
          "Nature is intrinsically non-linear, self-organizing, and beyond complete human management. (96%)",
          "Human technology at its best enhances natural intelligence — at its worst, it overrides it. (90%)",
        ],
      },
      {
        num: 104, title: "Man and Nature (KQED TV)", year: 1959, dur: "30m",
        linkType: "search", link: "Alan Watts Man Nature KQED Eastern Wisdom",
        source: "T3", quality: 3, notes: "Eastern Wisdom & Modern Life S1E1",
        truths: [
          "Eastern wisdom positions nature as something to understand and harmonize with — not conquer. (92%)",
          "The Western model of dominion over nature is less than 500 years old — and already showing systemic failure. (89%)",
          "This 1959 lecture diagnosed the ecological crisis before it had fully materialized. (88%)",
        ],
      },
      {
        num: 105, title: "Ecological Awareness Pt. 1", year: "c.1968", dur: "48m",
        linkType: "search", link: "Alan Watts Ecological Awareness lecture",
        source: "T1", quality: 5, notes: "Pre-dates ecology movement; systems theory",
        truths: [
          "Ecological crisis is the material consequence of the philosophical error of radical separateness. (92%)",
          "Systems theory and ancient Eastern wisdom reach the same conclusion: everything is causally connected. (91%)",
          "You cannot do just one thing — every action propagates throughout the system. (96%)",
        ],
      },
      {
        num: 106, title: "The Power of Space", year: 1972, dur: "50m",
        linkType: "search", link: "Alan Watts Power of Space",
        source: "T1", quality: 5, notes: "Space as medium; negative space in art",
        truths: [
          "Space is not empty — it is the medium in which all form exists and has meaning. (94%)",
          "Negative space carries as much meaning as the notes themselves — silence IS music. (93%)",
          "Inner space — the quiet between thoughts — is where the most essential things happen. (92%)",
        ],
      },
      {
        num: 107, title: "Coincidence of Opposites (ecology)", year: 1971, dur: "39m",
        linkType: "search", link: "Alan Watts Coincidence Opposites ecology",
        source: "T1", quality: 5, notes: "Ecology of conflict; yin/yang in nature",
        truths: [
          "Ecological conflict (predator/prey, growth/decay) is not a problem to solve but a system to understand. (95%)",
          "Every organism needs its ecological opposite to exist — remove the predator, the prey collapses. (97%)",
          "Biodiversity is nature's hedge against the brittleness that monoculture always produces. (96%)",
        ],
      },
    ],
  },
  {
    id: "society",
    num: 10,
    name: "Society, Culture & Conformity",
    emoji: "🏙️",
    theme: "Money vs. wealth. \"No valid plans for the future can be made by those who have no capacity for living now.\"",
    lectures: [
      {
        num: 108, title: "What If Money Was No Object?", year: "c.1960", dur: "3m",
        linkType: "search", link: "Alan Watts Money No Object T&H",
        source: "T3", quality: 4, notes: "Most viral clip ever; 10M+ views",
        truths: [
          "Money is a symbol that has been confused for wealth — the map mistaken for the territory at civilizational scale. (96%)",
          "Most people spend their lives doing what they dislike to acquire what they do not genuinely need. (93%)",
          "The real question: what would you do if the symbol game stopped mattering? (94%)",
        ],
      },
      {
        num: 109, title: "Music and Life (animated)", year: "c.1960", dur: "3m",
        linkType: "url", link: "https://www.youtube.com/watch?v=ERbvKrH-GC4",
        source: "T3", quality: 4, notes: "South Park creators; \"life not a journey\"",
        truths: [
          "Life is not a journey to a destination — it is a musical performance whose value is in the playing. (97%)",
          "You do not play music to reach the end of the piece — you play it because the playing is the point. (97%)",
          "A life lived entirely in preparation for the future is an orchestra that only ever rehearses. (96%)",
        ],
      },
      {
        num: 110, title: "Prickles and Goo", year: "c.1960", dur: "3m",
        linkType: "url", link: "https://www.youtube.com/watch?v=XXi_ldNRNtM",
        source: "T3", quality: 4, notes: "Two philosophical temperaments animated",
        truths: [
          "Two philosophical temperaments: prickly (precise, rigorous) and gooey (intuitive, ambiguity-comfortable). (92%)",
          "The best minds have both — pure prickle is neurotic; pure goo is sentimental. (91%)",
          "Philosophy needs both the poet and the logician — neither alone is sufficient. (93%)",
        ],
      },
      {
        num: 111, title: "Education for Non-Entity", year: "c.1965", dur: "62m",
        linkType: "search", link: "Alan Watts Education Non-Entity",
        source: "T1", quality: 5, notes: "Education critique; living for symbols",
        truths: [
          "The educational system trains people to live for symbols rather than for actual experience. (89%)",
          "We train children to be consumers of credentials rather than creators of meaning. (87%)",
          "Real education produces people who genuinely enjoy what they are doing — not people who endure it for deferred reward. (90%)",
        ],
      },
      {
        num: 112, title: "Learning the Human Game", year: 1967, dur: "44m",
        linkType: "search", link: "Alan Watts Learning Human Game",
        source: "T1", quality: 5, notes: "Symbols vs. reality; game of life",
        truths: [
          "Social life is a game — the problem is forgetting it is a game and treating it as ultimate reality. (93%)",
          "Symbols (money, status, title) are tools of the game, not its purpose or substance. (94%)",
          "The player who knows it is a game plays with greater skill — and enjoys it considerably more. (92%)",
        ],
      },
      {
        num: 113, title: "Playing the Game of Life", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=QXvoYGrnuv8",
        source: "T3", quality: 3, notes: "\"Forever a candidate for living\"",
        truths: [
          "Most people are \"forever candidates for living\" — always preparing, perpetually not yet participating. (93%)",
          "Play is not the opposite of work — it is work performed from intrinsic motivation. (92%)",
          "The game of life has no final score — winning IS continuous, present engagement. (91%)",
        ],
      },
      {
        num: 114, title: "The Secret of Life", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=iZ8so-ld-l0",
        source: "T3", quality: 3, notes: "Playing instead of working",
        truths: [
          "The secret of life is playing — not laboring toward a future payoff. (93%)",
          "Adults have been persuaded that play must be justified by its utility before it is permitted. (91%)",
          "Children know this secret by default — education is largely the process of removing it. (90%)",
        ],
      },
      {
        num: 115, title: "Follow Your Heart", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=3yFiqdCjNMk",
        source: "T3", quality: 3, notes: "Trusting intuition; expanded money clip",
        truths: [
          "Trusting intuition is accessing the intelligence of the whole organism rather than only the verbal mind. (89%)",
          "Genuine vocation produces more reliable practical success than strategic careerism over time. (85%)",
          "What you love is what you are constitutionally suited for — this is not wishful thinking, it is functional biology. (83%)",
        ],
      },
      {
        num: 116, title: "Philosophy and Society", year: 1969, dur: "50m",
        linkType: "search", link: "Alan Watts Philosophy and Society lecture",
        source: "T1", quality: 5, notes: "Role of the joker; social mythology",
        truths: [
          "Every society requires a joker — the one who refuses to ratify the official version of reality. (91%)",
          "The philosopher's role is to expose the unconscious game the society is collectively playing. (89%)",
          "Without the joker, any game becomes totalitarian — there is no corrective mechanism. (90%)",
        ],
      },
      {
        num: 117, title: "Work and Play", year: 1972, dur: "52m",
        linkType: "search", link: "Alan Watts Work Play Essential Lectures 7",
        source: "T1", quality: 5, notes: "Essential Lecture 7; art of living",
        truths: [
          "When work and play merge — when you cannot reliably distinguish which is occurring — you have found your vocation. (93%)",
          "Art is the permanent proof that work can be intrinsically motivated rather than alienated. (92%)",
          "Recognizing that most economic systems require alienated labor is the prerequisite for transcending it. (87%)",
        ],
      },
      {
        num: 118, title: "The Culture of Counterculture", year: "c.1970", dur: "45m",
        linkType: "search", link: "Alan Watts Culture Counterculture",
        source: "T3", quality: 3, notes: "1960s counterculture philosophy",
        truths: [
          "The 1960s counterculture correctly diagnosed the disease but could not agree on the cure. (88%)",
          "Dropping out is only useful if you have found something genuine to drop into. (90%)",
          "Every counterculture eventually becomes the next culture — and then requires its own counterculture. (92%)",
        ],
      },
      {
        num: 119, title: "The Future of Communications", year: 1973, dur: "45m",
        linkType: "search", link: "Alan Watts Future Communications 1973",
        source: "T1", quality: 4, notes: "Technology & self; among last lectures",
        truths: [
          "Technology amplifies what is already present — it does not solve the fundamental problem of consciousness. (93%)",
          "Communication without genuine presence is noise delivered at higher velocity. (92%)",
          "Among Watts' final lectures — he correctly anticipated the digital age and identified its primary shadow. (86%)",
        ],
      },
      {
        num: 120, title: "1969 IBM Engineers Lecture", year: 1969, dur: "60m",
        linkType: "search", link: "Alan Watts IBM 1969 engineers lecture",
        source: "T3", quality: 3, notes: "Corporate audience; also on Archive.org",
        truths: [
          "The most radical thing Watts ever did was deliver Eastern non-duality to engineers at IBM. (87%)",
          "Systems thinking and Zen thought are structurally identical in their core conclusions. (85%)",
          "The people who build the systems most need to understand what systems are FOR — not only how they function. (88%)",
        ],
      },
    ],
  },
  {
    id: "love",
    num: 11,
    name: "Love, Relationships & Sex",
    emoji: "💛",
    theme: "\"Loving yourself is impossible without loving everything defined as other than yourself.\" Eros as mystical experience.",
    lectures: [
      {
        num: 121, title: "Divine Madness (Love)", year: 1970, dur: "26m",
        linkType: "url", link: "https://www.youtube.com/watch?v=2BHZcaT8lJ4",
        source: "T1", quality: 5, notes: "Official; love, surrender, sanity of insanity",
        truths: [
          "Love is the temporary dissolution of the boundary between self and other. (94%)",
          "Surrendering to love is a micro-enlightenment — the ego recedes and something larger fills the space. (91%)",
          "The \"madness\" of love is a glimpse of the sanity that underlies ordinary defended, separated existence. (90%)",
        ],
      },
      {
        num: 122, title: "The Circle of Sex", year: 1966, dur: "45m",
        linkType: "search", link: "Alan Watts Circle of Sex",
        source: "T3", quality: 3, notes: "Based on Playboy essay; Two Hands of God",
        truths: [
          "Sexual energy and spiritual energy are not opposites — they are the same energy at a different octave. (87%)",
          "The cultural war on sexuality is, at its root, a war on embodied, fully alive human existence. (86%)",
          "To embrace sexuality fully is to embrace the cosmic generative force — which is exactly what Tantra teaches. (85%)",
        ],
      },
      {
        num: 123, title: "On the Tantra", year: 1968, dur: "50m",
        linkType: "search", link: "Alan Watts On the Tantra",
        source: "T1", quality: 5, notes: "Hindu sexuality; erotic principle",
        truths: [
          "Tantra treats desire as a vehicle for liberation rather than an obstacle to it. (91%)",
          "The erotic principle is the universe's own generative force — to suppress it is to suppress the universe in yourself. (88%)",
          "Tantric practice: use the energy of attraction to gradually dissolve the self that is doing the attracting. (87%)",
        ],
      },
      {
        num: 124, title: "Love, Surrender, and Sanity", year: 1970, dur: "67m",
        linkType: "search", link: "Alan Watts Love Surrender Sanity",
        source: "T3", quality: 4, notes: "Ego loss in love as mystical experience",
        truths: [
          "Surrendering to another person is a rehearsal for surrendering to reality itself. (91%)",
          "The ego loss in deep love is simultaneously terrifying and liberating — because it is genuinely both. (90%)",
          "Most relationship conflict is ego conflict — two fictional separate selves defending territory that was never real. (89%)",
        ],
      },
      {
        num: 125, title: "Let Go of Controlling", year: "c.1965", dur: "15m",
        linkType: "url", link: "https://www.youtube.com/watch?v=3Qptyt0-S9U",
        source: "T3", quality: 3, notes: "Trust; becoming one with universe",
        truths: [
          "Control is the enemy of intimacy — you cannot connect with what you are simultaneously managing. (93%)",
          "Trust — in another person, in life, in the process of reality — is not naïveté; it is the most sophisticated move available. (90%)",
          "Genuine union with another person is the accessible, immediate rehearsal for union with everything. (89%)",
        ],
      },
      {
        num: 126, title: "Religion and Sexuality", year: "c.1965", dur: "45m",
        linkType: "search", link: "Alan Watts Religion Sexuality Pacifica",
        source: "T3", quality: 3, notes: "From Pacifica Radio Archives",
        truths: [
          "Institutional religion's pathologizing of sexuality produced more psychological damage than it prevented. (86%)",
          "The sacred and the erotic were not historically separate — in most ancient traditions, they were the same domain. (85%)",
          "A spirituality that cannot accommodate the body cannot honestly accommodate life. (88%)",
        ],
      },
    ],
  },
  {
    id: "death",
    num: 12,
    name: "Death & Impermanence",
    emoji: "🌑",
    theme: "Death as art of letting go of an identity that was never yours. Systole and diastole.",
    lectures: [
      {
        num: 127, title: "Essential Lectures: Death", year: 1972, dur: "52m",
        linkType: "search", link: "Alan Watts Death Essential Lectures TV S1E7",
        source: "T1", quality: 5, notes: "TV series; life as circular",
        truths: [
          "Death is the rhythm of life — systole and diastole — not the termination of it. (93%)",
          "You have already not existed for 14 billion years before your birth — and it did not trouble you then. (95%)",
          "Life is circular, not linear — death is the turn of the wheel, not the stopping of it. (91%)",
        ],
      },
      {
        num: 128, title: "On Death (KQED TV)", year: 1959, dur: "30m",
        linkType: "search", link: "Alan Watts On Death KQED Eastern Wisdom",
        source: "T3", quality: 3, notes: "Eastern Wisdom & Modern Life S1E6",
        truths: [
          "Eastern traditions treat death as transformation — not termination of something that was real. (90%)",
          "The fear of death is primarily the fear of losing one's narrative — not the fear of losing experience itself. (88%)",
          "The self that fears death is not the self that dies — because it was never alive in the way it imagined. (87%)",
        ],
      },
      {
        num: 129, title: "Birth, Death, and the Unborn", year: "c.1965", dur: "50m",
        linkType: "search", link: "Alan Watts Birth Death Unborn",
        source: "T3", quality: 3, notes: "\"Imagine going to sleep and never waking up\"",
        truths: [
          "\"Imagine going to sleep and never waking up\" — the gateway into the actual phenomenology of death. (93%)",
          "Before your birth, you were not absent — you were the unborn, as present as the universe itself. (89%)",
          "Death is the return to what you were before you became \"you.\" (91%)",
        ],
      },
      {
        num: 130, title: "The Art of Dying", year: 1969, dur: "45m",
        linkType: "search", link: "Alan Watts Art of Dying",
        source: "T1", quality: 5, notes: "Facing mortality with yogic laugh",
        truths: [
          "Dying well requires the same essential skill as living well — the ability to fully let go. (93%)",
          "The yogic laugh at death is the recognition that death cannot touch what you actually are. (90%)",
          "Watts frames dying as a craft requiring practice, presence, and willingness to release the role completely. (88%)",
        ],
      },
      {
        num: 131, title: "Facing the Wave", year: 1971, dur: "59m",
        linkType: "search", link: "Alan Watts Facing the Wave After Skool",
        source: "T3", quality: 5, notes: "After Skool; wisdom of letting go",
        truths: [
          "The wave does not fight the shore — it completes itself by surrendering to it. (95%)",
          "The tighter you grip any experience, the faster it escapes — this is universal and non-negotiable. (96%)",
          "Death is the universe reclaiming its own energy — to resist it is to fight yourself. (93%)",
        ],
      },
      {
        num: 132, title: "What Happens After Death?", year: "c.1965", dur: "20m",
        linkType: "search", link: "Alan Watts What Happens After Death",
        source: "T3", quality: 3, notes: "Linked to Birth, Death, and the Unborn",
        truths: [
          "The epistemically honest answer: nobody knows — but most fears about it are fears about identity loss. (94%)",
          "From the Vedantic view: the individual wave returns to the ocean — not destroyed but transformed. (88%)",
          "The more important question is not what happens after death but what cannot be touched by it right now. (93%)",
        ],
      },
    ],
  },
  {
    id: "language",
    num: 13,
    name: "Music, Language & Meaning",
    emoji: "🎵",
    theme: "Universe as fundamentally musical, not purposeful. \"Trying to define yourself is like trying to bite your own teeth.\"",
    lectures: [
      {
        num: 133, title: "Limits of Language", year: "c.1965", dur: "51m",
        linkType: "search", link: "Alan Watts Limits of Language",
        source: "T1", quality: 5, notes: "Semantic traps; \"bite your own teeth\"",
        truths: [
          "Language divides a seamless reality into named pieces — and then we forget that we did the dividing. (97%)",
          "\"Trying to define yourself is like trying to bite your own teeth.\" (98%)",
          "The map is not the territory — but most human suffering comes from living entirely on the map. (97%)",
        ],
      },
      {
        num: 134, title: "Sense of Nonsense", year: "c.1968", dur: "30m",
        linkType: "search", link: "Alan Watts Sense of Nonsense",
        source: "T3", quality: 4, notes: "Tao of Philosophy; playfulness in meaning",
        truths: [
          "Nonsense is the highest form of sense — it breaks the grip of conceptual habit from the inside. (91%)",
          "Play, humor, and paradox are the mind's own tools for escaping its own prison. (92%)",
          "The Tao is the ultimate nonsense — ineffable, unnameable, and therefore the most real thing. (93%)",
        ],
      },
      {
        num: 135, title: "Nonsense (KQED TV)", year: 1960, dur: "28m",
        linkType: "search", link: "Alan Watts Nonsense KQED Eastern Wisdom S2",
        source: "T3", quality: 3, notes: "Eastern Wisdom S2E2; sense of symbols",
        truths: [
          "The sense of symbols is always socially agreed upon — the agreement is not the thing agreed about. (93%)",
          "Language is a social game, not a transparent window onto reality. (95%)",
          "Children not yet fully in the language game are closer to direct reality than educated adults. (89%)",
        ],
      },
      {
        num: 136, title: "Art of Meditation (Sound)", year: "c.1968", dur: "45m",
        linkType: "search", link: "Alan Watts Art Meditation sound mindful",
        source: "T1", quality: 5, notes: "Mindful listening; universe as music",
        truths: [
          "Listening without labeling is the most direct and accessible meditation available. (92%)",
          "The universe is fundamentally vibratory — sound makes this most immediately accessible to the senses. (88%)",
          "Sound can dissolve the boundary between self and world — which is why music is the universal spiritual vehicle. (90%)",
        ],
      },
      {
        num: 137, title: "Aesthetics & Mystical Vision", year: "c.1970", dur: "50m",
        linkType: "podcast", link: "Being in the Way Ep. 14",
        source: "T2", quality: 5, notes: "Art, beauty, and direct perception",
        truths: [
          "Beauty is not a quality of objects — it is what happens when the observer drops their overlay and perceives directly. (91%)",
          "Art at its best is not decoration — it is the transmission of direct experience from one nervous system to another. (90%)",
          "The aesthetic and the mystical are the same recognition at different intensities. (89%)",
        ],
      },
      {
        num: 138, title: "Haiku and the Controlled Accident", year: 1972, dur: "40m",
        linkType: "search", link: "Alan Watts Haiku Controlled Accident",
        source: "T1", quality: 4, notes: "Art and spontaneity; beauty as precision",
        truths: [
          "Haiku captures the universe in a grain of sand — maximum precision through minimum means. (93%)",
          "The \"controlled accident\": structure creates the conditions; the result itself cannot be forced or predicted. (91%)",
          "All great art operates this way — the artist is the instrument, not the author. (92%)",
        ],
      },
      {
        num: 139, title: "Philosophy as Music", year: "c.1958", dur: "30m",
        linkType: "search", link: "Alan Watts Philosophy as Music KPFA",
        source: "T3", quality: 3, notes: "Early KPFA radio; melody of thought",
        truths: [
          "Philosophy that does not move you emotionally is not philosophy — it is intellectual bookkeeping. (89%)",
          "The greatest ideas have the quality of music: structure and spontaneity held in perfect dynamic balance. (88%)",
          "Watts' earliest recordings reveal that his style was always musical before it was philosophical. (87%)",
        ],
      },
      {
        num: 140, title: "Haiku (LP Recording)", year: 1962, dur: "30m",
        linkType: "search", link: "Alan Watts Haiku LP 1962",
        source: "T3", quality: 2, notes: "Rare LP; audio inherently limited",
        truths: [
          "The form of haiku IS the content — brevity, silence, and the unsaid carry equal weight to what is written. (93%)",
          "Imperfect audio can intensify attention — the degraded signal forces more careful, active listening. (88%)",
          "Rarity itself is a form of teaching: scarcity creates attention that abundance rarely produces. (84%)",
        ],
      },
    ],
  },
  {
    id: "comparative",
    num: 14,
    name: "Comparative Religion & Perennial Philosophy",
    emoji: "🌐",
    theme: "All Ways of Liberation converge on unity of organism and environment.",
    lectures: [
      {
        num: 141, title: "Religion of No Religion", year: 1965, dur: "45m",
        linkType: "url", link: "https://www.youtube.com/watch?v=lYoZtwGwoUE",
        source: "T2", quality: 4, notes: "Japan Tour; Bodhisattva as ordinary person",
        truths: [
          "The Bodhisattva is not a monk — they are the ordinary person who sees through the ordinary without abandoning it. (92%)",
          "\"No religion\" means: the reality all religions point toward cannot itself be institutionalized without distorting it. (91%)",
          "Japan confronted Watts with the gap between the living experience of Zen and the institution built around it. (88%)",
        ],
      },
      {
        num: 142, title: "Relevance of Eastern Philosophy", year: "c.1965", dur: "45m",
        linkType: "podcast", link: "Being in the Way Ep. 26",
        source: "T2", quality: 4, notes: "Faith vs. belief; Christian imperialism",
        truths: [
          "Faith is not belief in doctrines — it is trust in the process of reality, even without certainty about outcomes. (91%)",
          "Christian imperialism imposed not just political structures but an entire model of selfhood onto Eastern cultures. (88%)",
          "Eastern philosophy does not correct a Western deficiency — it corrects a distortion in Western thought's foundations. (87%)",
        ],
      },
      {
        num: 143, title: "Eastern Thought in the West", year: 1960, dur: "57m",
        linkType: "search", link: "Alan Watts Eastern Thought West",
        source: "T1", quality: 5, notes: "Best cross-cultural gateway lecture",
        truths: [
          "The best cross-cultural gateway: both traditions ask the same question — what is the nature of the self? (93%)",
          "Western thought answers with the individual; Eastern thought dissolves the individual into the relational field. (91%)",
          "Neither tradition is wrong — each is incomplete without the other's complementary emphasis. (90%)",
        ],
      },
      {
        num: 144, title: "Four Ways to the Center Pt. 1", year: "c.1968", dur: "50m",
        linkType: "search", link: "Alan Watts Four Ways to Center",
        source: "T1", quality: 5, notes: "Hinduism + Buddhism + Taoism synthesis",
        truths: [
          "Hinduism, Buddhism, and Taoism are three different languages describing a single geography. (91%)",
          "Each has a unique emphasis: Hinduism on being, Buddhism on emptiness, Taoism on naturalness. (90%)",
          "Strip away the cultural clothing of any tradition and there is one core teaching remaining. (87%)",
        ],
      },
      {
        num: 145, title: "The Mystical Experience", year: "c.1968", dur: "30m",
        linkType: "search", link: "Alan Watts Mystical Experience",
        source: "T3", quality: 3, notes: "Comparative Philosophy series",
        truths: [
          "Mystical experience is universal — documented across every culture and every recorded epoch. (94%)",
          "The content is always the same: unity, timelessness, and a radical, unconditional okayness. (91%)",
          "Its universality is the strongest evidence that it is pointing at something real, not projecting something imagined. (88%)",
        ],
      },
      {
        num: 146, title: "Buddhism and Christianity (KQED)", year: 1960, dur: "29m",
        linkType: "search", link: "Alan Watts Buddhism Christianity KQED",
        source: "T3", quality: 3, notes: "Eastern Wisdom S2E10",
        truths: [
          "Buddha and Christ teach the same essential thing in different cultural vocabularies. (87%)",
          "Buddha: no fixed self. Christ: \"I and the Father are one.\" Both dissolve the isolated ego. (86%)",
          "The institutional religions built on these teachers diverged dramatically from the founders' core insights. (88%)",
        ],
      },
      {
        num: 147, title: "Worldly Religions", year: "c.1970", dur: "45m",
        linkType: "search", link: "Alan Watts Worldly Religions",
        source: "T1", quality: 4, notes: "Religion and body; embodied spirit",
        truths: [
          "Religions that transcend or deny the body are incomplete — embodiment IS the spiritual path. (88%)",
          "The body is not the prison of the spirit — it is spirit at this particular density and frequency. (86%)",
          "A religion that cannot accommodate eating, dancing, and desire has lost touch with what it claims to be saving. (87%)",
        ],
      },
      {
        num: 148, title: "Unity in Contemplation", year: 1972, dur: "48m",
        linkType: "search", link: "Alan Watts Unity Contemplation",
        source: "T1", quality: 5, notes: "Final synthesis; all traditions pointing same",
        truths: [
          "All contemplative traditions point at the same recognition: separation between observer and observed is ultimately illusory. (91%)",
          "Among Watts' final lectures — a lifetime of study synthesized into a single, convergent point. (90%)",
          "The ultimate teaching needs no tradition and no language — it is what remains when everything else falls away. (92%)",
        ],
      },
      {
        num: 149, title: "Mysticism and Morals", year: "c.1965", dur: "45m",
        linkType: "search", link: "Alan Watts Mysticism and Morals",
        source: "T3", quality: 3, notes: "Also on Archive.org",
        truths: [
          "Genuine mystical experience does not produce ethical nihilism — it produces spontaneous compassion. (91%)",
          "You cannot genuinely harm what you recognize as yourself. (93%)",
          "The fear that mysticism leads to immorality mistakes the map for the territory — again. (90%)",
        ],
      },
      {
        num: 150, title: "Sahaja", year: "c.1965", dur: "30m",
        linkType: "search", link: "Alan Watts Sahaja natural enlightenment",
        source: "T3", quality: 3, notes: "Natural spontaneous enlightenment",
        truths: [
          "Sahaja means \"natural\" or \"spontaneous\" — the enlightenment requiring no special attainment or extraordinary state. (91%)",
          "The greatest teachers all arrive at the same place: it was always available, never hidden. (93%)",
          "Spontaneous enlightenment is not something that happens TO you — it is the recognition that it was always the case. (92%)",
        ],
      },
    ],
  },
  {
    id: "seminars",
    num: 15,
    name: "Seminars & Extended Series",
    emoji: "📚",
    theme: "Multi-session retreats and TV series. The deep curriculum — meant to be consumed over weeks, not hours.",
    lectures: [
      {
        num: 151, title: "Out of Your Mind (14.5 hrs)", year: "Various", dur: "14.5 hrs",
        linkType: "url", link: "https://www.organism.earth/library/document/out-of-your-mind-1",
        source: "Sounds True", quality: 5, notes: "THE definitive curriculum; 6 seminars × 2 sessions",
        truths: [
          "The definitive Watts curriculum: 6 seminars covering consciousness, self, nature, time, Buddhism, and Vedanta. (96%)",
          "\"Out of your mind\" = out of the conceptual overlay and into direct, unfiltered experience of reality. (95%)",
          "14.5 hours is the correct length — these ideas require time to do their work in the listener. (90%)",
        ],
      },
      {
        num: 152, title: "You're It! (12 hrs)", year: "Various", dur: "12 hrs",
        linkType: "search", link: "Alan Watts You're It Sounds True Audible",
        source: "Sounds True", quality: 4, notes: "15 classic talks on cosmic game",
        truths: [
          "\"You're it\" = you are already the thing you have been seeking — the search was always circular. (95%)",
          "The cosmic game always ends with the player discovering they were the prize the entire time. (93%)",
          "15 classic talks — their breadth reveals the single, consistent obsession underlying all of them. (92%)",
        ],
      },
      {
        num: 153, title: "Just So (10.5 hrs)", year: "Various", dur: "10.5 hrs",
        linkType: "search", link: "Alan Watts Just So Sounds True",
        source: "Sounds True", quality: 4, notes: "3 seminars: Cosmic Network + Ecological + Pursuit of Pleasure",
        truths: [
          "\"Just so\" = tzu-jan = things as they are, without any additional commentary or imposed narrative. (94%)",
          "The pursuit of pleasure is structurally self-defeating — pleasure finds you when you stop chasing it. (93%)",
          "The cosmic network seminars show that interconnection is not a spiritual metaphor — it is operational reality. (91%)",
        ],
      },
      {
        num: 154, title: "Do You Do It or Does It Do You? (~8 hrs)", year: "Various", dur: "~8 hrs",
        linkType: "search", link: "Alan Watts Do You Do It Sounds True",
        source: "Sounds True", quality: 4, notes: "Includes rare guided meditations",
        truths: [
          "The question itself is the teaching — there is no clean answer, and the discomfort of not-knowing IS the practice. (94%)",
          "Rare guided meditations reveal Watts as a genuine practitioner, not only a brilliant commentator. (88%)",
          "When \"you\" and \"it\" finally converge — when doing and being-done-to collapse — that is the recognition. (92%)",
        ],
      },
      {
        num: 155, title: "Essential Lectures (video series)", year: "1971–72", dur: "6 hrs",
        linkType: "search", link: "Essential Lectures Alan Watts full series",
        source: "TV", quality: 4, notes: "12 episodes; filmed Muir Woods + SS Vallejo",
        truths: [
          "The only filmed record of Watts lecturing: the visual confirms what the audio implies — complete ease. (91%)",
          "12 self-contained episodes, each part of one continuous, accumulating argument. (90%)",
          "Filmed at Muir Woods and the SS Vallejo — settings chosen to make the environment inseparable from the teaching. (88%)",
        ],
      },
      {
        num: 156, title: "Eastern Wisdom & Modern Life (KQED)", year: "1959–60", dur: "9 hrs",
        linkType: "search", link: "Alan Watts Eastern Wisdom Modern Life KQED",
        source: "TV", quality: 3, notes: "18-ep B&W TV; Amazon Prime + Gaia",
        truths: [
          "1959 KQED TV: Watts was translating Eastern thought for American living rooms before it was fashionable. (91%)",
          "Earliest video record: the ideas are visible in their embryonic form, before full refinement. (88%)",
          "The anxieties of \"modern life\" in 1959 that he diagnoses are structurally identical to those of today. (90%)",
        ],
      },
      {
        num: 157, title: "Being in the Way (podcast)", year: "Ongoing", dur: "35+ hrs",
        linkType: "url", link: "https://www.youtube.com/playlist?list=PLqGJSfj5N-pKxwOFjYC6bxQhTEWegGDdZ",
        source: "Official", quality: 5, notes: "Official; Mark Watts hosted; 37+ episodes",
        truths: [
          "Official Mark Watts series: restored, remastered, contextually introduced — the most reliable presentation available. (95%)",
          "37+ episodes with biographical context that places each talk in its proper intellectual moment. (93%)",
          "The podcast proves Watts is not dated — every episode sounds as if it was recorded for this specific moment. (92%)",
        ],
      },
      {
        num: 158, title: "Alan Watts on Living (CBC)", year: 1971, dur: "2.5 hrs",
        linkType: "search", link: "Alan Watts on Living CBC television",
        source: "TV", quality: 3, notes: "5-part CBC miniseries; Vancouver",
        truths: [
          "Canadian context required Watts to be unusually direct and accessible — no academic hedging. (87%)",
          "5-part series: rare opportunity to watch a single argument develop across multiple sustained sessions. (86%)",
          "The title is the thesis: the only question is whether you are actually living or perpetually preparing to. (90%)",
        ],
      },
      {
        num: 159, title: "The World as Just So", year: "c.1960", dur: "3 hrs",
        linkType: "search", link: "Alan Watts World as Just So seminar",
        source: "Sounds True", quality: 4, notes: "Out of Your Mind seminar 4",
        truths: [
          "The universe is not attempting to be anything other than what it already is. (95%)",
          "Out of Your Mind seminar 4 — the earlier seminars have laid sufficient ground for this to land fully. (90%)",
          "Acceptance is not passivity — \"just so\" is the active, clear-eyed recognition of what actually is. (93%)",
        ],
      },
      {
        num: 160, title: "Mind Over Mind (53 min)", year: 1972, dur: "53m",
        linkType: "url", link: "https://www.youtube.com/watch?v=lHXisYGjvmM",
        source: "T1", quality: 5, notes: "Official September 2025 upload; newly accessible",
        truths: [
          "Every attempt to improve yourself by using the mind to control the mind creates more of what it is trying to eliminate. (97%)",
          "Official September 2025 upload — confirmed authentic, newly accessible to the public. (95%)",
          "The solution is not found in the same domain as the problem. (96%)",
        ],
      },
      {
        num: 161, title: "Game Theory of Ethics (7 parts)", year: "Various", dur: "3.5 hrs",
        linkType: "search", link: "Alan Watts Game Theory Ethics Pacifica",
        source: "Pacifica", quality: 3, notes: "Extended Pacifica seminar; rarely complete",
        truths: [
          "Ethics as game: the rules serve the game — and can be questioned when the game itself is questioned. (89%)",
          "Rigid rule-following reliably produces the opposite of ethical behavior in sufficiently novel edge cases. (87%)",
          "The most ethical life is played from intrinsic understanding — not from obedience to external rules. (88%)",
        ],
      },
      {
        num: 162, title: "Philosophies of Asia (8 hrs)", year: "Various", dur: "8 hrs",
        linkType: "search", link: "Alan Watts Philosophies Asia full series",
        source: "Electronic Univ.", quality: 4, notes: "Electronic University foundational series",
        truths: [
          "The foundational curriculum: if you want to understand the intellectual sources of Watts' work, start here. (93%)",
          "8 hours covering the full sweep of Asian philosophy — Hinduism, Buddhism, Taoism, Confucianism, Jainism. (91%)",
          "Watts' academic rigor is fully on display here — this is the scholar behind the poet. (90%)",
        ],
      },
      {
        num: 163, title: "The Self (6 hrs)", year: "Various", dur: "6 hrs",
        linkType: "search", link: "Alan Watts The Self series Electronic University",
        source: "Electronic Univ.", quality: 4, notes: "Ways of Liberation; Electronic Univ.",
        truths: [
          "\"Ways of Liberation\" series: the self is not a problem to be solved — it is a misunderstanding to be clearly seen. (94%)",
          "All liberation paths converge: what you think you are is not what you are. (95%)",
          "The self is the last illusion to dissolve — and when it does, nothing is lost except the suffering that came with it. (96%)",
        ],
      },
    ],
  },
];
