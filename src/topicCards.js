/* ═══════════════════════════════════════════════════════════════
   TOPIC CARDS — The 10 Seeds inside each Room
   Each room (subcategory) holds 10 topic cards.
   Each card has 3 tiers: Simple, Sensory, Advanced.
   Structure: TOPIC_CARDS[doorKey][subId] = array of 10 cards

   First planting: SCIENCE → ECOLOGY & SYSTEMS
   ═══════════════════════════════════════════════════════════════ */

export const TOPIC_CARDS = {

  // ═══════════════════════════════════════════════════════════════
  // 🔬 SCIENCE (rock) → 🌐 ECOLOGY & SYSTEMS (ecology)
  // "How everything alive is connected to everything else"
  // ═══════════════════════════════════════════════════════════════

  rock: {
    ecology: [

      // ── 1 ── THE SECOND LAW ──────────────────────────────────
      {
        id: "entropy",
        num: 1,
        icon: "⏳",
        title: "The Second Law of Thermodynamics",
        subtitle: "Energy Decay",
        simple: "Everything is like a battery that slowly runs out. You eat food to get a \"spark,\" but you can't keep that spark forever; it turns into heat and floats away. We are all temporary little fires keeping the cold at bay.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a fire crackle; that popping is energy escaping into the air." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a cooling pie; heat carrying the smell away until it's gone." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A hot cocoa cooling down; the loss of warmth is energy leaving the liquid." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Rub your hands together; feel the friction turn your effort into heat." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a candle melt; the solid wax is becoming light and heat." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel your own body heat; you are a warm engine in a cool room." },
        ],
        intuition: "You are a brief, beautiful \"glow\" in the dark. Your life is the act of using energy before it fades back into the universe.",
        links: [
          { label: "How Thermodynamics Works", url: "https://www.britannica.com/science/thermodynamics" },
          { label: "The Concept of Entropy", url: "https://www.khanacademy.org/science/biology/energy-and-enzymes/the-laws-of-thermodynamics/a/the-laws-of-thermodynamics" },
          { label: "The Heat Death of the Universe", url: "https://www.space.com/heat-death-of-the-universe" },
        ],
        songs: [
          { title: "The Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "Fast Car", artist: "Tracy Chapman", url: "https://www.youtube.com/watch?v=AIOAlaacvm4" },
        ],
        advanced: "Entropy dictates the arrow of time. In biological systems, \"negentropy\" is the temporary localized reversal of disorder. While the universe trends toward maximum equilibrium (heat death), life creates islands of order by dissipating energy. This connects physics to teleology — the purpose of life is to delay the inevitable decay through metabolic efficiency.",
      },

      // ── 2 ── BIOGEOCHEMICAL CYCLING ──────────────────────────
      {
        id: "cycling",
        num: 2,
        icon: "♻️",
        title: "Biogeochemical Cycling",
        subtitle: "Conservation of Mass",
        simple: "The Earth is a giant LEGO set. There are no \"new\" pieces. Every piece of you — your skin, your breath, your bones — was once part of a dinosaur, a cloud, or a tree. We are all made of borrowed bits.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The sound of rain hitting a roof; water that has traveled the globe for billions of years." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of wet dirt (petrichor); it's the smell of Earth recycling itself." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Drinking a glass of water; realize you are drinking the same molecules the Pharaohs drank." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Holding a rock; feeling the ancient pressure of recycled minerals." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a leaf rot into the soil; it is becoming the \"food\" for the next flower." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your breath go in and out; you are swapping atoms with the trees right now." },
        ],
        intuition: "You are never lonely because you are literally made of everything else. You are the universe's way of rearranging its old toys into a new person.",
        links: [
          { label: "The Carbon Cycle", url: "https://earthobservatory.nasa.gov/features/CarbonCycle" },
          { label: "The Nitrogen Cycle Explained", url: "https://www.nature.com/scitable/knowledge/library/the-nitrogen-cycle-15138120/" },
          { label: "Biogeochemical Cycles Overview", url: "https://academic.oup.com/book/26359/chapter/194681655" },
        ],
        songs: [
          { title: "Woodstock", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=cRjQCvfcXn0" },
          { title: "Blackbird", artist: "The Beatles", url: "https://www.youtube.com/watch?v=Man4Xw8Xypo" },
          { title: "Everything is Everything", artist: "Lauryn Hill", url: "https://www.youtube.com/watch?v=i3_dOWYHS7I" },
        ],
        advanced: "Stoichiometry in ecology proves that matter is a closed system on Earth. The Law of Conservation of Mass implies a \"molecular immortality.\" This connects chemistry to deep ecology and indigenous \"oneness\" philosophies; we are not on the Earth, we are the Earth in a specific, temporary configuration.",
      },

      // ── 3 ── THE TROPHIC PYRAMID ─────────────────────────────
      {
        id: "trophic",
        num: 3,
        icon: "🔺",
        title: "The Trophic Pyramid",
        subtitle: "The 10% Rule",
        simple: "Nature has a strict math rule: for every 10 pounds of grass, you only get 1 pound of bunny. For every 10 pounds of bunny, you only get a tiny bit of fox. Most energy is lost as heat, so the top of the pyramid is always lonely.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The silence of a deep forest; predators are quiet because there are so few of them." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a large salad; it takes a lot of plants to keep you going." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a vegetable vs. eating meat; feeling the difference in where the energy came from." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the thickness of a tree trunk compared to the thinness of a blade of grass." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a field full of flowers but only one or two butterflies." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the weight of your body and the massive amount of food needed to sustain it." },
        ],
        intuition: "We must respect the \"base\" of our world. Without the millions of small things, the big things (like us) cannot exist.",
        links: [
          { label: "Energy Flow in Ecosystems", url: "https://www.khanacademy.org/science/high-school-biology/hs-ecology/hs-energy-flow-through-ecosystems/a/hs-energy-flow-through-ecosystems-review" },
          { label: "The 10 Percent Rule", url: "https://www.sciencedirect.com/topics/earth-and-planetary-sciences/trophic-level" },
          { label: "Food Webs and Pyramids", url: "https://education.nationalgeographic.org/resource/food-web/" },
        ],
        songs: [
          { title: "Circle of Life", artist: "Carmen Twillie", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Big Yellow Taxi", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=2595abcvh2M" },
          { title: "In the End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4" },
        ],
        advanced: "Thermodynamic efficiency limits the length of food chains. This mathematical constraint dictates the carrying capacity of environments and explains the inherent fragility of apex predators. It connects biology to economic \"diminishing returns\" and resource management theory.",
      },

      // ── 4 ── NEGATIVE FEEDBACK LOOPS ─────────────────────────
      {
        id: "homeostasis",
        num: 4,
        icon: "⚖️",
        title: "Negative Feedback Loops",
        subtitle: "Homeostasis",
        simple: "Nature has \"brakes.\" If there are too many deer, they eat all the food and some die, or wolves move in to help. This keeps things from getting too crazy. It's how the world stays in balance.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Your breath slowing down after you finish running." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"clean\" smell after a storm has washed the air." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Drinking water when you are thirsty; the \"stop\" signal when you've had enough." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Your skin shivering when you're cold to warm you back up." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a forest floor where new small trees grow only when an old one falls." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your heartbeat return to normal after a scare." },
        ],
        intuition: "Discipline is natural. Balance isn't a straight line; it's a constant, gentle correction.",
        links: [
          { label: "Homeostasis and Feedback", url: "https://www.biologyonline.com/dictionary/negative-feedback-loop" },
          { label: "Biological Feedback Systems", url: "https://www.nature.com/scitable/topicpage/biological-complexity-and-the-integrative-logic-of-14418385/" },
          { label: "Gaia Hypothesis", url: "https://www.theguardian.com/science/2020/jul/26/james-lovelock-at-101-the-gaia-theory-is-as-relevant-as-ever" },
        ],
        songs: [
          { title: "Stayin' Alive", artist: "Bee Gees", url: "https://www.youtube.com/watch?v=fNFzpwOxF0k" },
          { title: "Under Pressure", artist: "Queen & David Bowie", url: "https://www.youtube.com/watch?v=a01QQZyl-_I" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
        ],
        advanced: "Cybernetics and Systems Theory define negative feedback as the mechanism for stability. Unlike positive feedback (which leads to runaway change), negative loops ensure persistence. This connects to Stoicism and Taoism — the idea of the \"Middle Way\" as a physical necessity for endurance.",
      },

      // ── 5 ── CO-EVOLUTION & SYMBIOSIS ────────────────────────
      {
        id: "symbiosis",
        num: 5,
        icon: "🤝",
        title: "Co-Evolution & Symbiosis",
        subtitle: "Growing Together",
        simple: "No one grows up alone. Bees and flowers changed together over millions of years to fit each other perfectly. You are who you are because of the people and nature around you. We are all pieces of a puzzle.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A bird calling to its mate; a language built for two." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sweet scent of a flower designed exactly for a bee's nose." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Honey; the result of two different species working together." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Petting a dog; feeling the bond of two species that chose to live together." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A bright red berry meant to be seen by a specific bird." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the bacteria in your tummy helping you digest; they are part of \"you.\"" },
        ],
        intuition: "Relationship is the foundation of existence. You are not a \"self\"; you are a \"we.\"",
        links: [
          { label: "Symbiosis: The Art of Living Together", url: "https://www.nationalgeographic.org/article/symbiosis-art-living-together/" },
          { label: "Examples of Co-evolution", url: "https://evolution.berkeley.edu/evolibrary/article/evo_33" },
          { label: "The Holobiont Concept", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6110328/" },
        ],
        songs: [
          { title: "With a Little Help from My Friends", artist: "The Beatles", url: "https://www.youtube.com/watch?v=0C58ttB2-Qg" },
          { title: "Stand by Me", artist: "Ben E. King", url: "https://www.youtube.com/watch?v=hwZNL7QXkSw" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
        ],
        advanced: "Evolutionary Game Theory shows that mutualism often outweighs competition for long-term survival. The concept of \"Symbiogenesis\" suggests that complex life (eukaryotes) began as a merger. This connects biology to sociology and the \"Social Contract\" theory.",
      },

      // ── 6 ── NICHE PARTITIONING ──────────────────────────────
      {
        id: "niche",
        num: 6,
        icon: "🧩",
        title: "Niche Partitioning",
        subtitle: "Finding Your Spot",
        simple: "In a big family, one person might be the cook, one the cleaner, and one the gardener. In nature, species divide the work so they don't fight. Some hunt at night, some during the day. Everyone has their own special \"spot.\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Crickets at night vs. birds in the morning; they take turns singing." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The different smells of flowers that bloom at different times of the year." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a fruit that other animals can't reach or don't like." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the difference between a rough tree trunk and a soft mossy patch." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing different birds living at the top of a tree vs. the bottom." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Finding your own \"seat\" at a crowded table where you fit perfectly." },
        ],
        intuition: "There is room for you. You don't have to be like anyone else to survive; you just have to find your own space.",
        links: [
          { label: "Niche Partitioning Research", url: "https://www.nature.com/scitable/knowledge/library/niche-partitioning-and-species-coexistence-16190393/" },
          { label: "Resource Partitioning Examples", url: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/resource-partitioning" },
          { label: "Competitive Exclusion Principle", url: "https://www.britannica.com/science/competitive-exclusion-principle" },
        ],
        songs: [
          { title: "Come As You Are", artist: "Nirvana", url: "https://www.youtube.com/watch?v=vabnZ9-ex7A" },
          { title: "I'm Coming Out", artist: "Diana Ross", url: "https://www.youtube.com/watch?v=zbYcte4ZEgQ" },
          { title: "Born This Way", artist: "Lady Gaga", url: "https://www.youtube.com/watch?v=wV1FrqwZyKw" },
        ],
        advanced: "The Gause Principle states that two species competing for the same limiting resource cannot coexist. Niche partitioning is the multi-dimensional resolution of this conflict. This connects to \"Blue Ocean Strategy\" in business and specialized labor in economic theory.",
      },

      // ── 7 ── KEYSTONE SPECIES ────────────────────────────────
      {
        id: "keystone",
        num: 7,
        icon: "🔑",
        title: "Keystone Species & Trophic Cascades",
        subtitle: "The Key That Holds It All",
        simple: "Some animals are like the \"key\" to a door. If you take the key away, the whole house falls down. A tiny sea otter keeps the giant ocean forest alive. One small thing can change everything.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The splash of a beaver; without him, the whole pond and its sounds would vanish." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a healthy swamp, kept balanced by alligators." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The taste of an apple; made possible because bees (keystones) visited the tree." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the solid ground of a marsh held together by specific grass roots." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a video of wolves changing the path of a river in Yellowstone." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling how one small muscle in your foot keeps your whole body from falling." },
        ],
        intuition: "You may feel small, but your presence might be the thing holding your whole world together.",
        links: [
          { label: "Keystone Species 101", url: "https://www.nationalgeographic.org/article/keystone-species-role-models-ecosystem-health/" },
          { label: "Trophic Cascades Explained", url: "https://www.nature.com/scitable/knowledge/library/trophic-cascades-step-down-the-food-web-24350653/" },
          { label: "The Wolves of Yellowstone", url: "https://www.yellowstonepark.com/things-to-do/wildlife/wolf-reintroduction-changes-ecosystem/" },
        ],
        songs: [
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Waiting on the World to Change", artist: "John Mayer", url: "https://www.youtube.com/watch?v=oBIxScJ5rlY" },
          { title: "Ripple", artist: "Grateful Dead", url: "https://www.youtube.com/watch?v=671AgW9xSiA" },
        ],
        advanced: "Connectivity and centrality in network theory explain keystone roles. This reveals that impact is non-linear — small nodes with high \"betweenness centrality\" dictate system state. This connects to \"The Butterfly Effect\" in chaos theory and \"Tipping Point\" sociology.",
      },

      // ── 8 ── SUCCESSION & DISTURBANCE ────────────────────────
      {
        id: "succession",
        num: 8,
        icon: "🌱",
        title: "Succession & Disturbance",
        subtitle: "The Next Chapter",
        simple: "Nature is like a movie that never stops. A fire might burn a forest, but then new flowers grow, then bushes, then trees. Change isn't bad; it's just the next chapter of the story.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The loud crack of a falling tree, followed by the quiet growth of new plants." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smoky smell after a fire, and the fresh \"green\" smell of new sprouts." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a blackberry from a bush that grew in a cleared-out field." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the soft ash turn back into hard, rich dirt." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a sidewalk crack with a tiny weed growing through it." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling yourself grow taller and stronger after a \"hard\" day." },
        ],
        intuition: "Hard times are just clearing space for something new to grow. You are always under construction.",
        links: [
          { label: "Ecological Succession", url: "https://www.britannica.com/science/ecological-succession" },
          { label: "The Role of Disturbance", url: "https://www.sciencedirect.com/topics/earth-and-planetary-sciences/ecological-disturbance" },
          { label: "Primary vs Secondary Succession", url: "https://academic.oup.com/book/26359/chapter/194682000" },
        ],
        songs: [
          { title: "I Will Survive", artist: "Gloria Gaynor", url: "https://www.youtube.com/watch?v=gYkACVDFmeg" },
          { title: "Landslide", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=WM7-PYtXtJM" },
          { title: "The Times They Are A-Changin'", artist: "Bob Dylan", url: "https://www.youtube.com/watch?v=e7qQ6_RV4VQ" },
        ],
        advanced: "Ecological resilience is defined by a system's ability to absorb disturbance while maintaining its basic structure. The \"Intermediate Disturbance Hypothesis\" suggests that maximum diversity occurs when change is frequent but not catastrophic. This connects to \"Antifragility\" in risk analysis.",
      },

      // ── 9 ── EMERGENT PROPERTIES ─────────────────────────────
      {
        id: "emergence",
        num: 9,
        icon: "🕸️",
        title: "Emergent Properties",
        subtitle: "Systemic Intelligence",
        simple: "One bee isn't very smart, but a whole beehive is a genius. A forest can \"think\" and \"talk\" through its roots. When we work together, we become something much bigger and smarter than we are alone.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The roar of a crowd; a sound that no single person could make." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"forest\" smell, which is thousands of different plants smelling together." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A soup where the ingredients create a totally new flavor together." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Putting your hand in a stream; feeling the power of many drops of water." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a flock of birds move like one giant ribbon in the sky." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"vibe\" of a group of friends when everyone is happy." },
        ],
        intuition: "You belong to a \"Greater Whole.\" You don't have to have all the answers; the system does.",
        links: [
          { label: "What is Emergence?", url: "https://www.complexityexplorer.org/courses/89-introduction-to-complexity/segments/8542" },
          { label: "Collective Intelligence in Nature", url: "https://www.pnas.org/doi/10.1073/pnas.1211416110" },
          { label: "Wood Wide Web", url: "https://www.nature.com/articles/d41586-019-03057-w" },
        ],
        songs: [
          { title: "We Are the Champions", artist: "Queen", url: "https://www.youtube.com/watch?v=04854XqcfCY" },
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "One", artist: "U2", url: "https://www.youtube.com/watch?v=ftjEcrrf7r0" },
        ],
        advanced: "Holism vs. Reductionism: Emergence occurs when complex systems exhibit properties that their individual parts do not possess. This connects to Neural Network theory (AI) and the \"Global Brain\" hypothesis — the idea that the biosphere is a self-regulating information processor.",
      },

      // ── 10 ── TIPPING POINTS ─────────────────────────────────
      {
        id: "tipping",
        num: 10,
        icon: "🌊",
        title: "Tipping Points",
        subtitle: "Non-Linearity",
        simple: "Life is like a game of Jenga. You can pull out many pieces and it stays up, but then one tiny piece makes the whole thing fall. Things stay the same for a long time, then change very, very fast.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The quiet before an avalanche or a sudden loud \"snap.\"" },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sudden smell of rain just a second before it starts pouring." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Adding one drop of hot sauce that suddenly makes the whole dish too spicy." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Leaning back in a chair until the exact moment you tip over." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a balloon get bigger and bigger until — POP!" },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "That \"stomach-drop\" feeling when you realize something has changed forever." },
        ],
        intuition: "Be careful with small things. Everything matters, because you never know which small thing is the \"last\" one.",
        links: [
          { label: "Planetary Boundaries and Tipping Points", url: "https://www.stockholmresilience.org/research/planetary-boundaries.html" },
          { label: "Non-linear Dynamics", url: "https://www.sciencedirect.com/topics/earth-and-planetary-sciences/nonlinear-system" },
          { label: "The Science of Abrupt Change", url: "https://www.nature.com/articles/s41558-019-0639-x" },
        ],
        songs: [
          { title: "The Final Countdown", artist: "Europe", url: "https://www.youtube.com/watch?v=9jK-NcRmVcw" },
          { title: "Gimme Shelter", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=R3rnxqb7fEY" },
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsWw" },
        ],
        advanced: "Hysteresis and Bifurcation: In non-linear systems, once a threshold is crossed, the system often cannot return to its previous state even if the stress is removed. This connects to \"Catastrophe Theory\" and the \"Black Swan\" theory in economics and history.",
      },

    ],
  },
};

// ═══ UTILITY ═══
export function getTopicCards(doorKey, subId) {
  return TOPIC_CARDS[doorKey]?.[subId] || null;
}

export function hasTopicCards(doorKey, subId) {
  return !!(TOPIC_CARDS[doorKey]?.[subId]?.length);
}
