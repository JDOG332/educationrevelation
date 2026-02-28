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

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 🧬 BIOLOGY & LIFE (biology)
    // "The study of living systems and how they work"
    // ═══════════════════════════════════════════════════════════════

    biology: [

      // ── 1 ── HOMEOSTASIS ─────────────────────────────────────
      {
        id: "homeostasis-bio",
        num: 1,
        icon: "⚖️",
        title: "Homeostasis",
        subtitle: "The Dynamic Balance",
        simple: "Everything inside you — like your heat and water — needs to stay \"just right,\" even if it's freezing or boiling outside. It is your body's way of staying steady so you don't break.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to the steady thump-thump of a resting heart." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of clean, fresh rain that cools the earth." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A sip of cool water when you are very thirsty." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Placing your hand on your chest to feel the warmth of your skin." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a tightrope walker stay perfectly centered." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Standing on one foot and feeling your tiny muscles twitch to keep you upright." },
        ],
        intuition: "When you feel that \"click\" of balance, you are feeling your life-force working to keep you safe in a changing world.",
        links: [
          { label: "What is Homeostasis?", url: "https://www.scientificamerican.com" },
          { label: "Khan Academy: Homeostasis", url: "https://www.khanacademy.org" },
          { label: "Biology Online: Homeostasis", url: "https://www.biologyonline.com" },
        ],
        songs: [
          { title: "Stayin' Alive", artist: "Bee Gees", url: "https://www.youtube.com/watch?v=I_izvAbhExY" },
          { title: "The Middle", artist: "Jimmy Eat World", url: "https://www.youtube.com/watch?v=oKsxPW6i3pM" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
        ],
        advanced: "Homeostasis represents a non-equilibrium steady state where metabolic energy is expended to maintain low entropy. It is the physiological manifestation of Cybernetics — a self-regulating feedback loop (negative feedback) that counters environmental stochasticity. This principle connects biology to thermodynamics and systems engineering.",
      },

      // ── 2 ── CELL THEORY ─────────────────────────────────────
      {
        id: "cell-theory",
        num: 2,
        icon: "🧱",
        title: "Cell Theory",
        subtitle: "The Fundamental Unit",
        simple: "Everything alive is built from tiny \"LEGO\" bricks called cells. You are a giant city made of trillions of these living bricks, and every brick came from an older one.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The collective \"hum\" of a busy beehive." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The earthy scent of yeast waking up in bread dough." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The burst of a juicy orange — each tiny teardrop shape is a juice sac cell." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the texture of a leaf; those are cell walls you are touching." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at an onion skin under a magnifying glass." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"fullness\" of your muscles; they are bundles of long cells." },
        ],
        intuition: "You are a masterpiece made of tiny lives. When you touch your skin, you are touching a community.",
        links: [
          { label: "National Geographic: Cell Theory", url: "https://www.nationalgeographic.org" },
          { label: "Nature Education: What is a Cell?", url: "https://www.nature.com/scitable" },
          { label: "NASA: Life's Working Definition", url: "https://www.nasa.gov" },
        ],
        songs: [
          { title: "We Are Family", artist: "Sister Sledge", url: "https://www.youtube.com/watch?v=uyGY2NfYpeE" },
          { title: "Brick House", artist: "The Commodores", url: "https://www.youtube.com/watch?v=rrBx6mAWYPU" },
          { title: "Better Together", artist: "Jack Johnson", url: "https://www.youtube.com/watch?v=u57d4_b_YgI" },
        ],
        advanced: "Cell Theory establishes the biological \"atomism.\" It posits that the cell is the most reduced unit of life capable of independent replication. This connects to the \"Universal Common Ancestor\" theory, suggesting a physical, unbroken lineage of membranes and cytoplasm spanning billions of years.",
      },

      // ── 3 ── METABOLISM ──────────────────────────────────────
      {
        id: "metabolism",
        num: 3,
        icon: "⚡",
        title: "Metabolism",
        subtitle: "Energy Transformation",
        simple: "Life is like a campfire that never goes out. You take in food or light and turn it into \"power\" so you can run, think, and grow.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"crackle\" of a fire or the \"whoosh\" of your breath." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The aroma of food cooking — energy getting ready for you." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The instant \"zing\" of sweetness from a piece of fruit." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The heat coming off your body after you run a race." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A plant turning its leaves toward the sun." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of \"heavy limbs\" when you are out of fuel and tired." },
        ],
        intuition: "You are a flowing river of energy. You don't just have energy; you are the energy moving through the world.",
        links: [
          { label: "Britannica: Metabolism", url: "https://www.britannica.com" },
          { label: "Learn.Genetics: Cell Energy", url: "https://learn.genetics.utah.edu" },
          { label: "Harvard Health: Metabolism Myths", url: "https://www.health.harvard.edu" },
        ],
        songs: [
          { title: "Eye of the Tiger", artist: "Survivor", url: "https://www.youtube.com/watch?v=btPJPFnesV4" },
          { title: "Power", artist: "Kanye West", url: "https://www.youtube.com/watch?v=L53gjP-TtGE" },
          { title: "Walking on Sunshine", artist: "Katrina & The Waves", url: "https://www.youtube.com/watch?v=iPUmE-tne5U" },
        ],
        advanced: "Metabolism is the coupling of exergonic and endergonic reactions via ATP. It is the bio-energetic engine that allows organisms to resist the Second Law of Thermodynamics. By channeling electron flow, life creates pockets of order in an increasingly disordered universe.",
      },

      // ── 4 ── DNA ─────────────────────────────────────────────
      {
        id: "dna",
        num: 4,
        icon: "🧬",
        title: "DNA",
        subtitle: "The Universal Information Code",
        simple: "Every living thing uses the exact same secret alphabet to write its instruction book. Whether you are a tree, a dog, or a human, you use the same 4 letters: A, T, C, G.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The rhythmic \"click-clack\" of a computer keyboard." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The unique scent of a family member — coded by DNA." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A bitter vegetable — your DNA tells your tongue how to taste it." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Tracing the unique swirls of your fingerprint." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking into a mirror and seeing your parents' eyes in yours." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Knowing how tall you are compared to the world." },
        ],
        intuition: "You are a living library. You carry the \"words\" of every ancestor who ever lived before you.",
        links: [
          { label: "Genome.gov: Deoxyribonucleic Acid", url: "https://www.genome.gov" },
          { label: "DNA Learning Center", url: "https://dnalc.cshl.edu" },
          { label: "The Smithsonian: DNA History", url: "https://humanorigins.si.edu" },
        ],
        songs: [
          { title: "DNA", artist: "Kendrick Lamar", url: "https://www.youtube.com/watch?v=VG3WkiL0d_U" },
          { title: "Family Affair", artist: "Mary J. Blige", url: "https://www.youtube.com/watch?v=znlFu_lemsU" },
          { title: "Heirloom", artist: "Björk", url: "https://www.youtube.com/watch?v=684Ea_88nB4" },
        ],
        advanced: "The DNA molecule serves as the semi-conservative storage medium for biological information. Its universality suggests a singular origin of the genetic code (The Frozen Accident hypothesis). It bridges biology with Information Theory, where \"fitness\" is the successful transmission of high-fidelity data.",
      },

      // ── 5 ── EVOLUTION ───────────────────────────────────────
      {
        id: "evolution",
        num: 5,
        icon: "🌳",
        title: "Evolution by Natural Selection",
        subtitle: "Keep What Works",
        simple: "Nature is like a giant game of \"keep what works.\" Animals and plants that fit their home best have more babies, so the world slowly changes to be full of \"winners.\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The different songs of birds in different neighborhoods." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a skunk — a \"winning\" way to stay safe!" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The spice of a pepper — it evolved that heat to stop bugs from eating it." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The softness of a polar bear's fur versus the scales of a lizard." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A bug that looks exactly like a leaf — camouflage." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling how perfectly your thumb works to grab things." },
        ],
        intuition: "You are the result of billions of years of \"Yes.\" You are here because your ancestors were the ones who survived.",
        links: [
          { label: "Berkeley: Evolution 101", url: "https://evolution.berkeley.edu" },
          { label: "Natural History Museum: What is Evolution?", url: "https://www.nhm.ac.uk" },
          { label: "HHMI BioInteractive: Natural Selection", url: "https://www.biointeractive.org" },
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=xMQ0Ryy01yE" },
          { title: "Blackbird", artist: "The Beatles", url: "https://www.youtube.com/watch?v=Man4Xw8Xypo" },
          { title: "The Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
        ],
        advanced: "Evolution is an algorithmic process of variation, selection, and retention. It is the mechanism by which biological systems \"learn\" from their environment across deep time. It connects biology to Game Theory and population genetics, explaining the vast complexity of the biosphere.",
      },

      // ── 6 ── THE CENTRAL DOGMA ───────────────────────────────
      {
        id: "central-dogma",
        num: 6,
        icon: "🏗️",
        title: "The Central Dogma",
        subtitle: "DNA to Protein",
        simple: "DNA is the blueprint, RNA is the messenger, and Proteins are the workers who build the house. The \"Dogma\" is just the rule for how a thought becomes a thing.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"clink\" of tools in a workshop." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a new car or new toy — things being \"made.\"" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The texture of egg whites — pure protein." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pulling on your hair (protein) or feeling your nails." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a 3D printer create an object from a file." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of your muscles contracting to lift a heavy box." },
        ],
        intuition: "Your body is a factory that never sleeps, constantly turning invisible instructions into your physical self.",
        links: [
          { label: "Scitable: Central Dogma", url: "https://www.nature.com/scitable/definition/central-dogma" },
          { label: "YourGenome: What is the Central Dogma?", url: "https://www.yourgenome.org" },
          { label: "Molecular Biology of the Cell (NCBI)", url: "https://www.ncbi.nlm.nih.gov/books" },
        ],
        songs: [
          { title: "Work It", artist: "Missy Elliott", url: "https://www.youtube.com/watch?v=cjIvu7e6Wq8" },
          { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=gAjR4_CbPpQ" },
          { title: "9 to 5", artist: "Dolly Parton", url: "https://www.youtube.com/watch?v=UbxUSsFXYo4" },
        ],
        advanced: "The Central Dogma describes the directional flow of sequential information. Transcription and Translation are the linguistic transitions of biology — moving from a nucleic acid \"alphabet\" to an amino acid \"language.\" This provides the operational framework for all phenotypic expression.",
      },

      // ── 7 ── ECOLOGICAL INTERDEPENDENCE ──────────────────────
      {
        id: "interdependence",
        num: 7,
        icon: "🕸️",
        title: "Ecological Interdependence",
        subtitle: "The Web of Life",
        simple: "No one lives alone. Plants need the sun, bees need the flowers, and we need the plants. We are all stuck together in a giant, beautiful web.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"crunch\" of dry leaves that will soon turn into soil for new trees." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a forest floor — everything breaking down to feed everything else." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Honey — made by bees, from flowers, for you." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Digging your toes into the dirt." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a bird eat a worm or a butterfly on a bloom." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the weight of the air you breathe — made by trees." },
        ],
        intuition: "You are not a person in the world; you are a part of the world. Every breath you take is a gift from a plant.",
        links: [
          { label: "National Geographic: Ecology", url: "https://www.nationalgeographic.org/encyclopedia/ecology" },
          { label: "World Wildlife Fund: Biodiversity", url: "https://www.worldwildlife.org" },
          { label: "Ecological Society of America", url: "https://www.esa.org" },
        ],
        songs: [
          { title: "What a Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=CWzrABouyeE" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "He's Got the Whole World in His Hands", artist: "Nina Simone", url: "https://www.youtube.com/watch?v=3S1NTCpsZ68" },
        ],
        advanced: "Ecology treats biological entities as nodes in a complex network of nutrient cycling and energy flux. Symbiogenesis and Trophic Cascades demonstrate that \"individuality\" is a biological fiction; organisms are open systems defined by their biotic and abiotic interactions.",
      },

      // ── 8 ── SURFACE AREA TO VOLUME ──────────────────────────
      {
        id: "sa-volume",
        num: 8,
        icon: "🎈",
        title: "Surface Area to Volume Ratio",
        subtitle: "The Scaling Law",
        simple: "There is a reason why ants are small and elephants have big ears. If you get too big without changing your shape, your \"inside\" grows way faster than your \"outside,\" and you can't breathe or stay cool!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"hiss\" of a balloon losing air." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a sliced orange — more surface area means more smell!" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Crushed ice vs. a big ice cube — crushed melts and flavors faster." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the many folds of a kitchen sponge." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Noticing the tiny veins in a leaf spread out like a fan." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stretching your arms out wide to feel how much space you take up." },
        ],
        intuition: "Nature is the smartest designer. Your lungs are folded millions of times so you can soak up the world.",
        links: [
          { label: "BioNinja: Surface Area to Volume Ratio", url: "https://ib.bioninja.com.au" },
          { label: "Khan Academy: Cell Size", url: "https://www.khanacademy.org/science/biology" },
          { label: "Why Cells are Small", url: "https://www.scientificamerican.com" },
        ],
        songs: [
          { title: "Big Me", artist: "Foo Fighters", url: "https://www.youtube.com/watch?v=pLdK7p8T_5I" },
          { title: "Little Boxes", artist: "Malvina Reynolds", url: "https://www.youtube.com/watch?v=2_2lGkEU4Xs" },
          { title: "Under Pressure", artist: "Queen & David Bowie", url: "https://www.youtube.com/watch?v=a01QQZyl-_I" },
        ],
        advanced: "This is the \"Scaling Law\" of biology (Allometry). As a cell increases in size (r), its volume increases by r³ while surface area only by r². This geometric constraint necessitates multicellularity, specialized circulatory systems, and fractal-like branching in organs to maintain efficient diffusion.",
      },

      // ── 9 ── INHERITANCE & VARIATION ─────────────────────────
      {
        id: "inheritance",
        num: 9,
        icon: "🎲",
        title: "Inheritance and Genetic Variation",
        subtitle: "The Remix",
        simple: "You look like your parents, but you are also a \"remix.\" Nature shuffles the cards so every person is a little bit different, which keeps life exciting and safe.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The different voices of two siblings." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"clean\" smell of a new baby." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Why some people love cilantro and some think it tastes like soap." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Comparing the \"stretchiness\" of your skin to a friend's." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a field of wildflowers where no two are the exact same color." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your unique \"reach\" — how far your specific arms can go." },
        ],
        intuition: "You are a unique version of a very old story. You carry the past, but you are a brand-new \"Now.\"",
        links: [
          { label: "Learn.Genetics: Inheritance", url: "https://learn.genetics.utah.edu/content/heredity" },
          { label: "Mendel Museum", url: "https://www.mendelmuseum.muni.cz/en" },
          { label: "MedlinePlus: Genetics", url: "https://medlineplus.gov/genetics" },
        ],
        songs: [
          { title: "In My Life", artist: "The Beatles", url: "https://www.youtube.com/watch?v=Zicw_dWwh0M" },
          { title: "Isn't She Lovely", artist: "Stevie Wonder", url: "https://www.youtube.com/watch?v=oE5N4WvM_R0" },
          { title: "Beautiful", artist: "Christina Aguilera", url: "https://www.youtube.com/watch?v=eAfyFTzZDMM" },
        ],
        advanced: "Mendelian inheritance and Meiotic recombination ensure that while the gene pool remains stable, the zygotic combinations are near-infinite. This \"Horizontal\" variation provides the substrate for \"Vertical\" evolution, ensuring population resilience against environmental flux.",
      },

      // ── 10 ── REPRODUCTION & CONTINUITY ──────────────────────
      {
        id: "reproduction",
        num: 10,
        icon: "🕯️",
        title: "Reproduction and Continuity",
        subtitle: "Passing the Light",
        simple: "Life's main job is to keep the \"light\" going. Even though people and animals grow old, they pass their spark to the next generation so the fire of life never goes out.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A baby crying or a chick chirping in a nest." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a garden in the spring." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Seeds or nuts — they are literally \"baby\" plants waiting to grow." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Holding a small seed in your palm." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A video of a flower blooming in fast-motion." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your own pulse — the \"drumbeat\" that you will one day pass on." },
        ],
        intuition: "You are a link in a chain that is billions of years long. You are life's way of continuing forever.",
        links: [
          { label: "National Geographic: Reproduction", url: "https://www.nationalgeographic.org" },
          { label: "Planned Parenthood: How Pregnancy Works", url: "https://www.plannedparenthood.org" },
          { label: "Biology Dictionary: Continuity of Life", url: "https://biologydictionary.net" },
        ],
        songs: [
          { title: "Landslide", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=WM7-PYtXtPE" },
          { title: "Forever Young", artist: "Alphaville", url: "https://www.youtube.com/watch?v=t1TcDHrkQYg" },
          { title: "Cat's in the Cradle", artist: "Harry Chapin", url: "https://www.youtube.com/watch?v=etug_S8Z988" },
        ],
        advanced: "Biological continuity is the process of Autopoiesis — systems that are capable of reproducing and maintaining themselves. Reproduction is the ultimate teleological drive in biology; it is the mechanism by which organic information achieves a form of temporal immortality despite individual senescence.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 💊 MEDICINE & HEALING (medicine)
    // "How we fix the body when it breaks"
    // ═══════════════════════════════════════════════════════════════

    medicine: [

      // ── 1 ── HOMEOSTASIS ─────────────────────────────────────
      {
        id: "homeostasis-med",
        num: 1,
        icon: "⚖️",
        title: "Homeostasis",
        subtitle: "The Smart Thermostat",
        simple: "Homeostasis is like a smart thermostat inside you. When you get too hot, it turns on the \"AC\" (sweat); when you get too cold, it turns on the \"heater\" (shivering). It keeps everything \"just right\" so you can stay alive and happy.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to your steady heartbeat while resting." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Sniff fresh peppermint to feel your airways instantly \"reset.\"" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Sip cool water when you're thirsty and feel your body say \"thank you.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Place your hand on your chest and feel the warmth of your own skin." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch your chest rise and fall in a perfect, steady rhythm." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Balance on one foot and feel your tiny muscles twitching to keep you upright." },
        ],
        intuition: "Close your eyes and feel the \"inner quiet\" that stays still even when the world is noisy.",
        links: [
          { label: "What is Homeostasis?", url: "https://www.scientificamerican.com/article/what-is-homeostasis/" },
          { label: "Khan Academy: Homeostasis", url: "https://www.khanacademy.org/science/biology/principles-of-physiology/body-structure-and-homeostasis/a/homeostasis" },
          { label: "Biology Online: Homeostatic Mechanisms", url: "https://www.biologyonline.com/dictionary/homeostasis" },
        ],
        songs: [
          { title: "Stayin' Alive", artist: "Bee Gees", url: "https://www.youtube.com/watch?v=I_izvAbhExY" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
          { title: "The Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
        ],
        advanced: "Homeostasis is the dynamic equilibrium maintained by physiological feedback loops. It represents the biological imperative of self-preservation via Negative Feedback Systems. This connects to Cybernetics (the study of control systems) and Taoism, where the \"Middle Way\" is the peak of existence.",
      },

      // ── 2 ── GERM THEORY ─────────────────────────────────────
      {
        id: "germ-theory",
        num: 2,
        icon: "🔬",
        title: "Germ Theory",
        subtitle: "The Invisible Enemy",
        simple: "Tiny, invisible \"teeny-weeny\" bugs called germs can make us sick. Once we learned they were there, we learned to wash our hands and use medicine to chase them away.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"pop\" of a soap bubble bursting." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sharp, clean scent of rubbing alcohol or lemon soap." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The bitterness of a medicine that helps you get better." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of warm, soapy water sliding over your hands." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at your hands through a magnifying glass." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"tingle\" in your nose right before a sneeze." },
        ],
        intuition: "That \"gut feeling\" to step back when someone nearby coughs.",
        links: [
          { label: "CDC: How Germs Spread", url: "https://www.cdc.gov/germs/index.html" },
          { label: "History: Louis Pasteur and Germ Theory", url: "https://www.history.com/topics/inventions/germ-theory" },
          { label: "Microbiology Society: What are Microbes?", url: "https://microbiologysociety.org/why-microbiology-matters/what-is-microbiology/microbes-and-the-human-body.html" },
        ],
        songs: [
          { title: "Bad Blood", artist: "Taylor Swift", url: "https://www.youtube.com/watch?v=QcIy9NiNbmo" },
          { title: "Work It Out", artist: "Beyoncé", url: "https://www.youtube.com/watch?v=vVj4u_3A_98" },
          { title: "U Can't Touch This", artist: "MC Hammer", url: "https://www.youtube.com/watch?v=otCpCn0l4Wo" },
        ],
        advanced: "Germ Theory shifted medicine from miasmatic theory (bad air) to microbial etiology. It demonstrates the unseen interconnectedness of the ecosystem. Epistemologically, it bridges the gap between visible effects and invisible causes, mirroring the concept of \"hidden forces\" in Quantum Field Theory.",
      },

      // ── 3 ── THE PLACEBO EFFECT ──────────────────────────────
      {
        id: "placebo",
        num: 3,
        icon: "✨",
        title: "The Placebo Effect",
        subtitle: "The Magic of Believing",
        simple: "This is the \"Magic of Believing.\" Sometimes, if you really believe a band-aid or a \"magic\" drink will make you feel better, your brain actually tells your body to start healing itself!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A soothing voice saying, \"You're going to be okay.\"" },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Lavender oil used for \"calming magic.\"" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A sugar cube or a \"magic\" spoonful of honey." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "A gentle hug that makes the pain \"go away.\"" },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a doctor's white coat or a colorful \"healing\" sticker." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stretching your arms wide and feeling \"big\" and strong." },
        ],
        intuition: "The sudden \"ah-ha!\" feeling when you stop worrying and the pain fades.",
        links: [
          { label: "Harvard: The Power of the Placebo Effect", url: "https://www.health.harvard.edu/mental-health/the-power-of-the-placebo-effect" },
          { label: "NIH: Placebo Effect", url: "https://www.nccih.nih.gov/health/placebo-effect" },
          { label: "Psychology Today: Why Placebos Work", url: "https://www.psychologytoday.com/us/basics/placebo-effect" },
        ],
        songs: [
          { title: "Believer", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=7wtfhZwyrcc" },
          { title: "Magic", artist: "B.o.B ft. Rivers Cuomo", url: "https://www.youtube.com/watch?v=Cq-NShfefks" },
          { title: "Walking on Sunshine", artist: "Katrina & The Waves", url: "https://www.youtube.com/watch?v=iPUmE-tne5U" },
        ],
        advanced: "The Placebo Effect is a psychoneuroimmunological phenomenon. It proves that subjective expectation can trigger objective biochemical cascades. It connects to Neuroplasticity and the Observer Effect in physics — where the act of expectation alters the state of the system.",
      },

      // ── 4 ── REGENERATIVE MEDICINE ───────────────────────────
      {
        id: "regenerative",
        num: 4,
        icon: "🌱",
        title: "Regenerative Medicine",
        subtitle: "The Body Rebuilds",
        simple: "Your body is like a LEGO set that can fix itself. If a piece breaks, your body uses special \"builder cells\" (stem cells) to grow new parts and fix what's broken.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The sound of a seed cracking open in a time-lapse video." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Freshly cut grass — the smell of plants \"healing\" themselves." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "High-protein foods like eggs that give your \"builders\" energy." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a scab get hard and then fall off to reveal new skin." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a lizard regrow its tail or a plant grow a new leaf." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your muscles \"burn\" and then grow stronger after play." },
        ],
        intuition: "Knowing your body is getting stronger every single day.",
        links: [
          { label: "Mayo Clinic: Regenerative Medicine", url: "https://www.mayoclinic.org/tests-procedures/bone-marrow-transplant/in-depth/stem-cells/art-20048117" },
          { label: "Nature: Advances in Regenerative Medicine", url: "https://www.nature.com/subjects/regenerative-medicine" },
          { label: "What are Stem Cells?", url: "https://www.celltherapyspecialists.com/what-are-stem-cells/" },
        ],
        songs: [
          { title: "Stronger", artist: "Kelly Clarkson", url: "https://www.youtube.com/watch?v=Xn676-fLq7I" },
          { title: "Rise Up", artist: "Andra Day", url: "https://www.youtube.com/watch?v=lwgr_IMeEgA" },
          { title: "Heal the World", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=BWf-eARnf6U" },
        ],
        advanced: "This field utilizes Stem Cell Biology and Tissue Engineering. It represents the biological manifestation of Recursion and Fractal Growth. It aligns with the Phoenix Archetype — the ability to emerge anew from the remnants of the old.",
      },

      // ── 5 ── PHARMACOLOGY ────────────────────────────────────
      {
        id: "pharmacology",
        num: 5,
        icon: "🧪",
        title: "Pharmacology",
        subtitle: "Keys and Locks",
        simple: "Pharmacology is like finding the \"secret keys\" in nature. Scientists find special chemicals that fit into your body's \"locks\" to stop pain or fight off \"bad guys.\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"click\" of a child-proof cap." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The earthy scent of herbal tea." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The sour zing of a Vitamin C chewable." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The smooth texture of a pill or a cooling cream." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "The bright colors of different medicines." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"heavy\" feeling of sleepiness after a nighttime medicine." },
        ],
        intuition: "Sensing when a headache is starting to \"unlock\" and melt away.",
        links: [
          { label: "NIGMS: Pharmacology Basics", url: "https://www.nigms.nih.gov/education/fact-sheets/Pages/pharmacology.aspx" },
          { label: "Britannica: History of Pharmacology", url: "https://www.britannica.com/science/pharmacology" },
          { label: "Drugs.com: How Drugs Work", url: "https://www.drugs.com/condition/pharmacology.html" },
        ],
        songs: [
          { title: "The Cure", artist: "Lady Gaga", url: "https://www.youtube.com/watch?v=mD3v8f7u54A" },
          { title: "Poison", artist: "Bell Biv DeVoe", url: "https://www.youtube.com/watch?v=sb2np1Y9pSg" },
          { title: "Doctor! Doctor!", artist: "Thompson Twins", url: "https://www.youtube.com/watch?v=H9694K-5uI0" },
        ],
        advanced: "Pharmacology explores Ligand-Receptor interactions and Pharmacokinetics. It is the study of how exogenous matter influences endogenous systems. It connects to Alchemy and Molecular Biology, viewing the body as a complex chemical computer responding to external code.",
      },

      // ── 6 ── GENOMIC MEDICINE ────────────────────────────────
      {
        id: "genomic-med",
        num: 6,
        icon: "🧬",
        title: "Genomic Medicine",
        subtitle: "Your Secret Manual",
        simple: "You have a \"Secret Instruction Manual\" inside you called DNA. Genomic medicine is when doctors read your specific manual to give you medicine that is made just for you!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The rhythmic \"thump-thump\" of your unique heart rhythm." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of your family home — smells like \"your\" people." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Noticing if you think cilantro tastes like soap or yummy — that's your DNA!" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the unique ridges of your own fingerprints." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking in the mirror and seeing your mom's eyes or your dad's nose." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Noticing your specific way of walking or \"stride.\"" },
        ],
        intuition: "Feeling a deep \"knowing\" of who you are and where you came from.",
        links: [
          { label: "Genome.gov: What is Genomic Medicine?", url: "https://www.genome.gov/health/Genomic-Medicine" },
          { label: "NIH: Genetics Home Reference", url: "https://medlineplus.gov/genetics/" },
          { label: "The All of Us Research Program", url: "https://allofus.nih.gov/" },
        ],
        songs: [
          { title: "Family Affair", artist: "Mary J. Blige", url: "https://www.youtube.com/watch?v=znlFu_lemsU" },
          { title: "Born This Way", artist: "Lady Gaga", url: "https://www.youtube.com/watch?v=wV1FrqwZyKw" },
          { title: "DNA.", artist: "Kendrick Lamar", url: "https://www.youtube.com/watch?v=NLZRYQMLDW4" },
        ],
        advanced: "This focuses on Bioinformatics and Precision Medicine. It is the shift from \"one-size-fits-all\" to Individualized Healthcare. It reflects the Holographic Principle — where the blueprint of the whole is contained within every single part (cell).",
      },

      // ── 7 ── THE GUT-BRAIN AXIS ─────────────────────────────
      {
        id: "gut-brain",
        num: 7,
        icon: "🧠",
        title: "The Gut-Brain Axis",
        subtitle: "The Body's Text Messages",
        simple: "Your tummy and your brain are constantly \"texting\" each other. When your tummy is happy, your brain feels happy! When you get \"butterflies\" in your stomach, that's your brain talking to your belly.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"grumble\" of your tummy when it's hungry." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The mouth-watering smell of fresh-baked cookies." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"happy feeling\" of eating your favorite meal." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of a \"full\" and satisfied belly." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "The bright colors of a fresh fruit salad." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"hollow\" sensation in your gut when you're nervous." },
        ],
        intuition: "Trusting your \"gut instinct\" when something feels right or wrong.",
        links: [
          { label: "Healthline: Gut-Brain Connection", url: "https://www.healthline.com/nutrition/gut-brain-connection" },
          { label: "Johns Hopkins: The Brain-Gut Connection", url: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/the-brain-gut-connection" },
          { label: "NCBI: The Microbiota-Gut-Brain Axis", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4367209/" },
        ],
        songs: [
          { title: "Hungry Like the Wolf", artist: "Duran Duran", url: "https://www.youtube.com/watch?v=oOg5evPPBE0" },
          { title: "Butterflies", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=oX_m_oO8m9Y" },
          { title: "Happy", artist: "Pharrell Williams", url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
        ],
        advanced: "This involves the Vagus Nerve and the Enteric Nervous System. It proves that the \"self\" is actually a Holobiont (a host plus its microbes). It connects to Ecopsychology, suggesting our mental health is intrinsically linked to our internal biological environment.",
      },

      // ── 8 ── EPIGENETICS ─────────────────────────────────────
      {
        id: "epigenetics",
        num: 8,
        icon: "🎛️",
        title: "Epigenetics",
        subtitle: "The Piano Player",
        simple: "Think of your DNA like a piano. Epigenetics is the \"pianist\" who decides which notes (genes) to play. Eating good food and exercising \"plays\" the happy, healthy songs!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The difference between a loud shout and a soft whisper." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The fresh air in a forest compared to a dusty room." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The crispness of an apple versus the \"blah\" of junk food." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of sunshine on your skin — it turns on \"Vitamin D\" genes!" },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a plant grow taller in the light than in the dark." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling \"light\" and \"springy\" after a day of playing outside." },
        ],
        intuition: "Feeling that you have the power to \"change your tune\" at any time.",
        links: [
          { label: "CDC: What is Epigenetics?", url: "https://www.cdc.gov/genomics/about/epigenetics.htm" },
          { label: "Nature: Epigenetics Basics", url: "https://www.nature.com/scitable/topicpage/epigenetic-influences-and-disease-895/" },
          { label: "What is Epigenetics?", url: "https://www.whatisepigenetics.com/fundamentals/" },
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=xPZ6eaL3S2E" },
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Unwritten", artist: "Natasha Bedingfield", url: "https://www.youtube.com/watch?v=b7k0a5hYnSI" },
        ],
        advanced: "Epigenetics studies DNA methylation and histone modification. It bridges the Nature vs. Nurture divide, showing that environment dictates gene expression. It connects to Lamarckian evolution concepts and the idea of Transgenerational Trauma/Wisdom.",
      },

      // ── 9 ── NEUROPLASTICITY ─────────────────────────────────
      {
        id: "neuroplasticity",
        num: 9,
        icon: "🕸️",
        title: "Neuroplasticity",
        subtitle: "The Brain is Play-Doh",
        simple: "Your brain is like \"Play-Doh.\" Every time you learn something new, your brain grows a new \"bridge.\" You can literally shape your brain by practicing and being brave!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"clink\" of a lightbulb moment in your head." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a new book or a new classroom." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Trying a food you used to hate and realizing you like it now." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of your fingers learning to tie a shoelace or play an instrument." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a \"path\" get wider the more people walk on it." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The \"shaky\" feeling of learning to ride a bike becoming \"smooth.\"" },
        ],
        intuition: "The feeling of \"I can do this!\" after you've practiced a lot.",
        links: [
          { label: "Healthline: What is Neuroplasticity?", url: "https://www.healthline.com/health/neuroplasticity" },
          { label: "Verywell Mind: How Experience Changes the Brain", url: "https://www.verywellmind.com/what-is-brain-plasticity-2794886" },
          { label: "Positive Psychology: Neuroplasticity Exercises", url: "https://positivepsychology.com/neuroplasticity/" },
        ],
        songs: [
          { title: "Learn to Fly", artist: "Foo Fighters", url: "https://www.youtube.com/watch?v=1VQ_3sBZEm0" },
          { title: "Brave", artist: "Sara Bareilles", url: "https://www.youtube.com/watch?v=QUQsqshq2Gs" },
          { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=gAjR4_CbPpQ" },
        ],
        advanced: "Neuroplasticity involves Synaptic Pruning and Long-Term Potentiation (LTP). It demonstrates the Malleability of Consciousness. This connects to Phenomenology — where our experiences literally construct the architecture of our perceived reality.",
      },

      // ── 10 ── HOLISTIC INTEGRATION ───────────────────────────
      {
        id: "holistic",
        num: 10,
        icon: "⭕",
        title: "Holistic Integration",
        subtitle: "The Whole You",
        simple: "Holistic Integration means \"Everything Matters.\" To be healthy, we don't just fix a toe; we make sure the heart is happy, the mind is calm, and the spirit is bright. It's the \"Whole You!\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "An orchestra where every instrument plays together in harmony." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A garden with flowers, soil, and rain all mixed together." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A big bowl of soup where all the ingredients make one great flavor." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "A full-body stretch that reaches from your toes to your hair." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A rainbow where all colors come from one light." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your whole body \"humming\" with life." },
        ],
        intuition: "Feeling \"Whole\" and \"Complete\" exactly as you are.",
        links: [
          { label: "WebMD: What is Holistic Medicine?", url: "https://www.webmd.com/balance/guide/what-is-holistic-medicine" },
          { label: "Academy of Integrative Health & Medicine", url: "https://aihm.org/" },
          { label: "Philosophy of Holistic Health", url: "https://www.takingcharge.csh.umn.edu/what-is-holistic-health" },
        ],
        songs: [
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "What a Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=rBrd_3VMC3c" },
          { title: "Three Little Birds", artist: "Bob Marley", url: "https://www.youtube.com/watch?v=zaGUr6wzyT8" },
        ],
        advanced: "Holistic Integration is a Systems Theory approach to health. It moves from Reductionism to Holism. It aligns with Gaia Theory and Integrated Information Theory (IIT), suggesting that the \"Whole\" is greater than the sum of its biological and psychological parts.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → ⚛️ PHYSICS & FORCES (physics)
    // "What holds everything together and makes things move"
    // ═══════════════════════════════════════════════════════════════

    physics: [

      // ── 1 ── CONSERVATION OF ENERGY ──────────────────────────
      {
        id: "conservation-energy",
        num: 1,
        icon: "♾️",
        title: "The Conservation of Energy",
        subtitle: "Recycled Stardust",
        simple: "Energy is the \"stuff\" that makes everything happen. You can't make it from nothing, and it never truly goes away. It just changes its \"costume.\" When you eat a snack, that food-energy turns into \"run-around\" energy. When you stop running, it turns into \"warm-skin\" energy. We are all made of recycled stardust that has been changing costumes for billions of years.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to an echo. Your voice isn't disappearing; it's bouncing and turning into tiny vibrations in the wall." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a fading flower. The life energy of the bloom is turning into gases that travel to your nose." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a sun-ripened orange. You are literally tasting captured sunlight transformed into sugar." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Rub your hands together fast. Feel the \"movement\" energy turn into \"heat\" energy." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a candle burn. The wax isn't vanishing; it's turning into light and heat you can see and feel." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Jump as high as you can. Feel your upward power pause at the top before gravity pulls it back down." },
        ],
        intuition: "Close your eyes and feel your heartbeat. The pulse you feel is the same energy that once powered ancient forests, now flowing through you. You are a temporary home for eternal power.",
        links: [
          { label: "First Law of Thermodynamics — NASA", url: "https://www.grc.nasa.gov/www/k-12/airplane/thermo1.html" },
          { label: "Energy Transformation — National Geographic", url: "https://www.nationalgeographic.org/encyclopedia/energy-transformation/" },
          { label: "Conservation of Energy — Britannica", url: "https://www.britannica.com/science/conservation-of-energy" },
        ],
        songs: [
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Symphony", artist: "Clean Bandit ft. Zara Larsson", url: "https://www.youtube.com/watch?v=aatr_2MstrI" },
          { title: "Energy", artist: "Drake", url: "https://www.youtube.com/watch?v=7LnBvuzjprE" },
        ],
        advanced: "The First Law of Thermodynamics posits that the total energy of an isolated system remains constant. In a cosmological sense, E = mc² creates a profound ontological bridge: if energy is never lost, then the essence of all things is merely in a state of perpetual flux (vibration). This aligns with the \"Eternal Now\" — where every action is a redistribution of a singular, infinite resource.",
      },

      // ── 2 ── GENERAL RELATIVITY ──────────────────────────────
      {
        id: "general-relativity",
        num: 2,
        icon: "🕸️",
        title: "General Relativity",
        subtitle: "The Cosmic Trampoline",
        simple: "Imagine the universe is a giant trampoline. If you put a heavy bowling ball in the middle, the fabric curves down. If you toss a marble nearby, it rolls toward the heavy ball. That curve is gravity. Space isn't empty; it's a stretchy blanket that tells everything how to move.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"thud\" of a ball hitting the floor. That sound is the result of space-time telling the ball where to go." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of rain. Gravity pulls the water down from the clouds so you can scent the wet earth." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Heavy syrup pouring onto a pancake. Watch how gravity makes it thick and slow." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Lean against a tree. Feel the pressure of your weight against the bark; that's you sitting in a curve of space." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at the Moon. It stays there because it's \"surfing\" the curve the Earth makes in space." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and lean left, then right. Feel your inner ear \"sense\" the downward pull of the planet's curve." },
        ],
        intuition: "Imagine you are made of the same fabric as the sky. Feel the heavy \"weight\" of love or a big thought bending the space around you, drawing people in.",
        links: [
          { label: "Einstein's Theory — Space.com", url: "https://www.space.com/17661-theory-general-relativity.html" },
          { label: "Gravity and Spacetime — ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/Gravity_and_spacetime" },
          { label: "The Fabric of the Cosmos — PBS/Nova", url: "https://www.pbs.org/wgbh/nova/series/fabric-of-the-cosmos/" },
        ],
        songs: [
          { title: "Gravity", artist: "John Mayer", url: "https://www.youtube.com/watch?v=7VBex8zbDRs" },
          { title: "Drops of Jupiter", artist: "Train", url: "https://www.youtube.com/watch?v=7Xf-Lesrkuc" },
          { title: "Fly Me To The Moon", artist: "Frank Sinatra", url: "https://www.youtube.com/watch?v=mQR0bXO_yI8" },
        ],
        advanced: "General Relativity replaces the Newtonian \"force\" with Riemannian geometry. Mass-energy density dictates the curvature of the space-time manifold. This suggests that \"relationship\" is the fundamental structure of reality. Nothing exists in a vacuum; the presence of \"The Other\" literally reshapes the path of the self.",
      },

      // ── 3 ── THE STRONG NUCLEAR FORCE ────────────────────────
      {
        id: "strong-force",
        num: 3,
        icon: "🫂",
        title: "The Strong Nuclear Force",
        subtitle: "The Unbreakable Hug",
        simple: "Inside atoms, there are tiny pieces that hate each other and want to fly apart. The Strong Force is like a super-strong hug that keeps them together. It is the strongest glue in the world. Without it, you, your house, and the whole planet would go *poof* and vanish into tiny dust.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A drumbeat. The vibrations are only possible because the atoms in the drum skin are glued tightly together." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Fresh baked bread. The molecules stay together in those shapes because of the nuclear \"hug\" inside." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The crunch of an apple. You are feeling the strength of the bonds holding matter together." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Press your palms together hard. Feel the \"solidness.\" That solid feeling is thanks to the glue holding your atoms." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a mountain. It stands tall because the tiniest parts of it refuse to let go of each other." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Clench your fist. Feel the unity of your hand. It is a billion-billion \"hugs\" working at once." },
        ],
        intuition: "At your very core, you are held together by a force that is stronger than any \"push\" trying to break you. You are built on a foundation of unbreakable connection.",
        links: [
          { label: "The Strong Force — DOE Science", url: "https://www.energy.gov/science/doe-explains/doe-explains-strong-nuclear-force" },
          { label: "Gluons and the Strong Force — CERN", url: "https://home.cern/science/physics/strong-force-gluons-and-antimatter" },
          { label: "Nuclear Physics — Khan Academy", url: "https://www.khanacademy.org/science/physics/quantum-physics" },
        ],
        songs: [
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Stay Together", artist: "Al Green", url: "https://www.youtube.com/watch?v=COiIC3A0ROM" },
          { title: "Stronger", artist: "Kelly Clarkson", url: "https://www.youtube.com/watch?v=Xn676-fLq7I" },
        ],
        advanced: "Quantum Chromodynamics (QCD) describes the interaction between quarks mediated by gluons. The Strong Force exhibits \"confinement\" — the bond grows stronger as you try to pull the particles apart. This is a physical mirror to \"Indivisible Unity\" — the harder the trial, the more intense the binding energy of the core.",
      },

      // ── 4 ── ELECTROMAGNETISM ────────────────────────────────
      {
        id: "electromagnetism",
        num: 4,
        icon: "⚡",
        title: "Electromagnetism",
        subtitle: "The Force of Touch and Light",
        simple: "This is the force of \"Touch and Light.\" It makes magnets stick to the fridge and keeps your hand from falling through a table. It's also how light travels to your eyes. It is the conversation between bits of electricity.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The static \"crackle\" of a sweater. That is the sound of electricity jumping." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sharp scent of a thunderstorm (ozone). That's the air being changed by electric bolts." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The zing of a lemon — a \"spark\" on the tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pet a cat and feel the \"pull\" of static. Or feel a table; its electrons are pushing your electrons back!" },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a rainbow. It is pure electromagnetic energy split into colors." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Move your arm. Your brain sends electrical signals through your nerves to make it happen." },
        ],
        intuition: "Everything you see and touch is a \"handshake\" of light and energy. You never actually \"touch\" anything; you just feel the energetic hello of the world.",
        links: [
          { label: "The Electromagnetic Spectrum — NASA", url: "https://science.nasa.gov/ems/01_intro" },
          { label: "What is Electromagnetism? — Live Science", url: "https://www.livescience.com/37529-electromagnetism.html" },
          { label: "Faraday's Law — Britannica", url: "https://www.britannica.com/science/Faradays-law-of-induction" },
        ],
        songs: [
          { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
          { title: "Electric Feel", artist: "MGMT", url: "https://www.youtube.com/watch?v=MmZexg8sxyk" },
          { title: "Thunder", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=fKopy74weus" },
        ],
        advanced: "Unified by Maxwell's equations, electromagnetism governs the behavior of photons and the interactions between charged particles. All chemistry — and therefore all biology — is essentially an electromagnetic dance of electron shells. It represents the \"Interface\" between the self and external reality.",
      },

      // ── 5 ── THE WEAK NUCLEAR FORCE ──────────────────────────
      {
        id: "weak-force",
        num: 5,
        icon: "🦋",
        title: "The Weak Nuclear Force",
        subtitle: "The Changer",
        simple: "The Weak Force is the \"Changer.\" It lets one tiny particle turn into a different one. Without it, the Sun wouldn't shine because it couldn't turn fuel into light. It's the force of transformation.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The steady hum of the world. The Sun's power (started by this force) makes the wind that whistles in your ears." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a forest floor. Decay is part of the cycle of change, mirroring how particles change." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The warmth of a hot soup. That heat originally came from the Sun's nuclear furnace." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The warmth of sunlight on your face. You are feeling the result of the Weak Force allowing the Sun to burn." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a shining star. You are seeing the Weak Force at work from trillions of miles away." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Think about your body growing. You are constantly changing, just like the subatomic particles." },
        ],
        intuition: "Change isn't scary; it's how the universe glows. To shine, you must be willing to let one part of you turn into something new.",
        links: [
          { label: "The Weak Force — Britannica", url: "https://www.britannica.com/science/weak-force" },
          { label: "How the Sun Shines — Nobel Prize", url: "https://www.nobelprize.org/prizes/themes/how-the-sun-shines/" },
          { label: "The Weak Interaction — HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Forces/weak.html" },
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=xMq9GfTsh80" },
          { title: "Here Comes The Sun", artist: "The Beatles", url: "https://www.youtube.com/watch?v=KQetemT1sWc" },
          { title: "Waiting on the World to Change", artist: "John Mayer", url: "https://www.youtube.com/watch?v=oBIxScJ5rlY" },
        ],
        advanced: "The Weak Interaction is unique because it violates CP-symmetry and allows for \"flavor\" changes in quarks. Mediated by W and Z bosons, it represents the \"Alchemy of Essence\" — the fundamental necessity for decay and transmutation to sustain the macro-equilibrium of the universe.",
      },

      // ── 6 ── ENTROPY (2ND LAW) ───────────────────────────────
      {
        id: "entropy-physics",
        num: 6,
        icon: "⏳",
        title: "The Second Law of Thermodynamics",
        subtitle: "The Arrow of Time",
        simple: "If you build a sandcastle, the wind and waves will eventually melt it back into flat sand. Things tend to get messy and spread out over time. This is why time only goes forward. It's the universe's way of saying \"make the most of right now.\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A glass breaking. You can hear the order turning into chaos." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A match being struck. The organized wood turns into messy smoke and scent." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "An ice cube melting in your mouth. Orderly ice turning into \"random\" water." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a smooth stone that used to be a jagged rock. Time and friction spread the energy out." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching smoke rise from a chimney and disappear into the air." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling tired at the end of the day. Your \"battery\" has spread its energy out into the world." },
        ],
        intuition: "Every moment is special because it can never be repeated. The \"messiness\" of life is just the universe moving toward a giant, warm rest.",
        links: [
          { label: "What is Entropy? — Live Science", url: "https://www.livescience.com/50941-second-law-thermodynamics.html" },
          { label: "Entropy — Khan Academy", url: "https://www.khanacademy.org/science/biology/energy-and-enzymes/the-laws-of-thermodynamics/a/the-second-law-of-thermodynamics" },
          { label: "Arrow of Time — Sean Carroll", url: "https://www.preposterousuniverse.com/blog/2010/02/22/the-arrow-of-time/" },
        ],
        songs: [
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "Stop This Train", artist: "John Mayer", url: "https://www.youtube.com/watch?v=mS2o4q7v9RA" },
          { title: "The End", artist: "The Doors", url: "https://www.youtube.com/watch?v=JSUIQgEVDM4" },
        ],
        advanced: "Entropy (S = k ln W) measures the number of microstates consistent with a macrostate. The increase of entropy defines the \"Statistical Arrow of Time.\" It connects physics to information theory, suggesting that the universe is \"forgetting\" its initial specific configuration as it moves toward maximum probability.",
      },

      // ── 7 ── QUANTUM FIELD THEORY ────────────────────────────
      {
        id: "qft",
        num: 7,
        icon: "🌊",
        title: "Quantum Field Theory",
        subtitle: "The Cosmic Ocean",
        simple: "Think of the whole universe as a giant ocean. Particles like electrons aren't tiny rocks; they are just the \"splashes\" or \"waves\" in that ocean. Everything is connected because the water (the field) is everywhere at once.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Hum a low note. Feel the air (the field) vibrate everywhere in the room, not just in your throat." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of lavender in a field. The smell isn't in one spot; it's a \"cloud\" that fills the space." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Salt in water. You can't see the salt \"balls,\" but the \"salty field\" is everywhere in the glass." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Move your hand through water. Feel the resistance — you are moving through a field." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at the \"heat waves\" on a road. You are seeing the air (field) dancing." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Imagine your body is just a \"lump of waves\" moving through a bigger ocean of energy." },
        ],
        intuition: "You are never lonely. You are a wave that the whole ocean is making. You are part of the \"Everlasting We\" that fills every inch of space.",
        links: [
          { label: "Quantum Field Theory — Stanford Encyclopedia", url: "https://plato.stanford.edu/entries/quantum-field-theory/" },
          { label: "What is a Quantum Field? — Quanta Magazine", url: "https://www.quantamagazine.org/what-is-a-quantum-field-20201022/" },
          { label: "The Standard Model — CERN", url: "https://home.cern/science/physics/standard-model" },
        ],
        songs: [
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "Waves", artist: "Kanye West", url: "https://www.youtube.com/watch?v=4SNo7V_E99U" },
          { title: "Fields of Gold", artist: "Sting", url: "https://www.youtube.com/watch?v=L5p9pKO7p8w" },
        ],
        advanced: "QFT synthesizes Classical Field Theory, Quantum Mechanics, and Special Relativity. It treats particles as localized excitations (quanta) of underlying fields. This shifts the paradigm from \"Atomism\" to \"Holism,\" where the vacuum is not empty but a state of minimum energy, teeming with virtual fluctuations.",
      },

      // ── 8 ── NEWTON'S LAWS OF MOTION ─────────────────────────
      {
        id: "newtons-laws",
        num: 8,
        icon: "⚖️",
        title: "Newton's Laws of Motion",
        subtitle: "The Fairness Rule",
        simple: "If you push something, it pushes back. If something is moving, it wants to keep moving. If it's sitting still, it wants to stay still. This is the \"Fairness Rule\" of the world. Every action has a buddy action.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Clap your hands. The sound is the result of two forces meeting and reacting." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smelling a breeze. The air is moving because something pushed it, and it won't stop until something else gets in the way." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"snap\" of a carrot. It resists your bite until you apply enough force." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Push against a wall. Feel the wall \"pushing\" your hands back with the exact same strength." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a ball roll across grass and slowly stop. You are seeing friction \"pushing\" back." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Put on a seatbelt. When the car stops, feel your body wanting to keep going. That's inertia!" },
        ],
        intuition: "Your choices and actions matter. Every \"push\" you give the world creates a \"pull\" somewhere else. You are in a constant, balanced dance with everything around you.",
        links: [
          { label: "Newton's Laws — NASA", url: "https://www.grc.nasa.gov/www/k-12/airplane/newton.html" },
          { label: "Inertia and Force — Physics Classroom", url: "https://www.physicsclassroom.com/class/newtlaws" },
          { label: "Classical Mechanics — Britannica", url: "https://www.britannica.com/science/classical-mechanics" },
        ],
        songs: [
          { title: "Life in the Fast Lane", artist: "Eagles", url: "https://www.youtube.com/watch?v=4tcXblWojdM" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Newton's Law", artist: "5 Seconds of Summer", url: "https://www.youtube.com/watch?v=vV99jS_A6O0" },
        ],
        advanced: "Newtonian mechanics (F = dp/dt) provides the deterministic framework for the macroscopic world. While superseded at extreme scales, these laws represent the \"Symmetry of Interaction\" — causality as a fundamental thread in our daily reality, the \"Local Truth\" that allows for predictable existence.",
      },

      // ── 9 ── THE HIGGS FIELD ─────────────────────────────────
      {
        id: "higgs-field",
        num: 9,
        icon: "🍯",
        title: "The Higgs Field",
        subtitle: "Invisible Molasses",
        simple: "Imagine the universe is filled with invisible molasses or thick syrup. Some tiny pieces of the world move through it easily, but others get \"stuck\" and become heavy. This invisible syrup gives things weight so they can stick together and form \"stuff\" like us.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Dragging a stick through water. Hear the \"resistance\" — that's like particles getting mass." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smelling a thick, heavy perfume. It feels \"weighty\" in the air compared to a light breeze." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Thick honey vs. water. Feel the \"heaviness\" on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Walking through a swimming pool. Feel the \"drag\" on your legs. The Higgs Field does that to all your atoms." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a leaf fall slowly. It feels the \"heaviness\" of the air, just as we feel the \"heaviness\" of mass." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Try to shake your arm really fast. Feel the \"effort\" it takes to move your weight." },
        ],
        intuition: "You have \"weight\" and \"presence\" because the universe is holding onto you. You are not a ghost; you are a solid part of the story.",
        links: [
          { label: "The Higgs Boson — CERN", url: "https://home.cern/science/physics/higgs-boson" },
          { label: "What is the Higgs Field? — The Guardian", url: "https://www.theguardian.com/science/2012/jul/04/what-is-higgs-boson-god-particle" },
          { label: "Mass and the Higgs — Fermilab", url: "https://www.fnal.gov/pub/science/particle-physics-101/higgs-boson.html" },
        ],
        songs: [
          { title: "Heavy", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=5dmQ3QWpy1Q" },
          { title: "Teardrop", artist: "Massive Attack", url: "https://www.youtube.com/watch?v=u7K72X4eo_s" },
          { title: "God's Plan", artist: "Drake", url: "https://www.youtube.com/watch?v=TvR6d08L3nc" },
        ],
        advanced: "The Higgs Mechanism explains electroweak symmetry breaking. By interacting with the Higgs Field, massless gauge bosons and fermions acquire mass via Yukawa coupling. This is the \"Origin of Substance\" — the transition from pure energy to localized \"being.\"",
      },

      // ── 10 ── DARK MATTER & DARK ENERGY ──────────────────────
      {
        id: "dark-matter-energy",
        num: 10,
        icon: "🌚",
        title: "Dark Matter & Dark Energy",
        subtitle: "The Secret Side",
        simple: "The universe has a \"secret side.\" Most of what makes the universe work is invisible. Dark Matter is like invisible hands holding galaxies together, and Dark Energy is like an invisible wind blowing the universe apart. We know they are there because we see what they do, even if we can't see them.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Hearing the wind howl but not seeing the air. You hear the effect, but the cause is invisible." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A scent that reminds you of a dream. You can't touch the memory, but the feeling is real." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"hidden\" ingredients in a complex soup. You can't see the pinch of salt, but you'd know if it was gone." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The \"pull\" of a magnet through a piece of paper. You can't see the force, but you feel the tug." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a dark room and knowing your furniture is still there." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and \"feel\" where your hand is. You don't need to see it to know it exists." },
        ],
        intuition: "Just because you can't explain or see something doesn't mean it isn't real. Most of the universe is a beautiful mystery waiting to be felt.",
        links: [
          { label: "Dark Matter/Dark Energy — NASA Science", url: "https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy" },
          { label: "The Mystery of Dark Matter — Perimeter Institute", url: "https://perimeterinstitute.ca/dark-matter" },
          { label: "Dark Energy — ESA/Hubble", url: "https://esahubble.org/wordbank/dark-energy/" },
        ],
        songs: [
          { title: "Dark Side of the Moon", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=HW-lXjC_0O8" },
          { title: "Invisible", artist: "Hunter Hayes", url: "https://www.youtube.com/watch?v=LiPUP70vE_s" },
          { title: "Starlight", artist: "Muse", url: "https://www.youtube.com/watch?v=Pgum6OT_VH8" },
        ],
        advanced: "Dark Matter (~27%) provides the gravitational scaffolding for cosmic structure, while Dark Energy (~68%) acts as a cosmological constant driving accelerated expansion. Together, they represent the \"Unmanifest Majority\" — the realization that our empirical \"Light-World\" is merely a thin crust on a vast, unobserved ocean of reality.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → ⚡ ENERGY & THERMODYNAMICS (energy)
    // "Nothing is created or destroyed — it just changes form"
    // ═══════════════════════════════════════════════════════════════

    energy: [

      // ── 1 ── CONSERVATION OF ENERGY (1ST LAW) ───────────────
      {
        id: "first-law-thermo",
        num: 1,
        icon: "♾️",
        title: "Conservation of Energy",
        subtitle: "The Cosmic Lego Set",
        simple: "Energy is like a cosmic Lego set. You can't make new bricks and you can't throw any away. You can only rebuild them into different shapes. If you stop moving, your energy didn't vanish; it just turned into heat or sound.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a drum hit; the movement of the stick becomes the vibration you hear." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a match — chemical energy turning into heat and aroma." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating an apple — the sun's stored energy becoming fuel for your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Rub your hands together fast; feel the \"work\" turn into warmth." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A lightbulb glowing — electricity transforming into visible waves." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Jump up; feel your muscles convert \"potential\" energy into height." },
        ],
        intuition: "Every breath you take is a recycled gift from a star that lived long ago. You are a continuous flow, never truly beginning or ending.",
        links: [
          { label: "First Law of Thermodynamics — NASA", url: "https://www.grc.nasa.gov/www/k-12/airplane/thermo1.html" },
          { label: "Conservation of Energy — Britannica", url: "https://www.britannica.com/science/conservation-of-energy" },
          { label: "Conservation of Energy — Khan Academy", url: "https://www.khanacademy.org/science/physics/work-and-energy/work-and-energy-tutorial/a/what-is-conservation-of-energy" },
        ],
        songs: [
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Energy", artist: "Drake", url: "https://www.youtube.com/watch?v=7LnBvuzjpr4" },
          { title: "Radioactive", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=ktvTqknDobU" },
        ],
        advanced: "The First Law (ΔU = Q − W) establishes a closed-loop accounting system for the universe. It posits that the internal energy of an isolated system is constant. This connects to the \"Law of Continuity\" — nothing comes from nothing (Ex nihilo nihil fit). It suggests a fundamental \"oneness\" where all phenomena are merely phase shifts of a single, underlying essence.",
      },

      // ── 2 ── ENTROPY & UNIVERSAL DECAY (2ND LAW) ─────────────
      {
        id: "entropy-thermo",
        num: 2,
        icon: "⏳",
        title: "Entropy and Universal Decay",
        subtitle: "Neat to Messy",
        simple: "Everything naturally moves from \"neat\" to \"messy.\" A sandcastle eventually turns back into flat sand, but the sand never builds a castle by itself. Time only moves forward because things are spreading out.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"hiss\" of static between radio stations." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A perfume bottle left open; the scent spreads until it fills the whole room." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Hot cocoa cooling down until it matches the air around it." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a sand dune — thousands of rocks broken down into tiny grains." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a drop of food coloring slowly cloud a glass of clear water." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your body get tired at the end of a long day." },
        ],
        intuition: "It's easier to break things than fix them. This \"stretch\" of the universe is why \"now\" feels different than \"later.\"",
        links: [
          { label: "What is Entropy? — Science Museum", url: "https://www.sciencemuseum.org.uk/objects-and-stories/what-entropy" },
          { label: "The Second Law — All About Science", url: "https://www.allaboutscience.org/second-law-of-thermodynamics.htm" },
          { label: "The Arrow of Time — Highbrow", url: "https://gohighbrow.com/the-arrow-of-time/" },
        ],
        songs: [
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Stop This Train", artist: "John Mayer", url: "https://www.youtube.com/watch?v=mS2o4q760Yg" },
        ],
        advanced: "Entropy (S) is a measure of molecular disorder or \"multiplicity.\" The Second Law (ΔS ≥ 0) dictates the irreversibility of natural processes. This creates the \"Arrow of Time,\" distinguishing the past from the future. Philosophically, it connects to Impermanence in Eastern traditions — the recognition that all structured forms must eventually dissipate into the void.",
      },

      // ── 3 ── THE ABSOLUTE ZERO LIMIT (3RD LAW) ──────────────
      {
        id: "third-law-thermo",
        num: 3,
        icon: "🧊",
        title: "The Absolute Zero Limit",
        subtitle: "The Impossible Stillness",
        simple: "As things get colder, they stop moving. Absolute Zero is the point where everything is perfectly still. But the universe has a rule: you can get very, very close to being perfectly still, but you can never actually stop 100%.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The absolute silence of a snowy night." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The crisp, \"sharp\" smell of ice in a freezer." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A plain ice cube — the absence of flavor." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Touching a piece of dry ice (carefully!) and feeling the \"burn\" of no heat." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a crystal — atoms lined up in a perfect, still pattern." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Holding a \"statue\" pose and feeling the tiny wobbles you can't stop." },
        ],
        intuition: "Even in total stillness, there is a tiny spark of life that cannot be put out.",
        links: [
          { label: "Third Law — Chemistry LibreTexts", url: "https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/The_Four_Laws_of_Thermodynamics/Third_Law_of_Thermodynamics" },
          { label: "Absolute Zero Explained — Live Science", url: "https://www.livescience.com/39884-absolute-zero.html" },
          { label: "Quantum Fluids at Ultra-Low Temps — NIST", url: "https://www.nist.gov/topics/physics/absolute-zero" },
        ],
        songs: [
          { title: "Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4zLfCnGVeL4" },
          { title: "Ice Ice Baby", artist: "Vanilla Ice", url: "https://www.youtube.com/watch?v=rog8ou-ZepE" },
          { title: "Cold As Ice", artist: "Foreigner", url: "https://www.youtube.com/watch?v=yPAl_vsz_9U" },
        ],
        advanced: "The Third Law states that the entropy of a perfect crystal at 0 K is zero. However, the Nernst Heat Theorem suggests this state is an asymptote — unreachable in a finite sequence of operations. It represents a boundary condition of reality, echoing the \"Stillpoint\" in metaphysical thought — a theoretical state of perfect order and zero vibration.",
      },

      // ── 4 ── THERMAL EQUILIBRIUM (ZEROTH LAW) ────────────────
      {
        id: "zeroth-law",
        num: 4,
        icon: "⚖️",
        title: "Thermal Equilibrium",
        subtitle: "The Law of Balance",
        simple: "If you are as warm as a chair, and your friend is as warm as the chair, then you and your friend are the same temperature. It's the \"Law of Balance.\" Everything wants to share until everyone is equal.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Two singers hitting the exact same note (unison)." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The way a house smells exactly like the cookies baking in the kitchen." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Mixing hot tea and cold milk until the whole cup is \"just right.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Putting your hand in lukewarm water — it feels like nothing because it matches you." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a thermometer stop moving when it \"agrees\" with the room." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Floating in a pool where the water is the same temp as your skin." },
        ],
        intuition: "Feeling a \"vibe\" in a room where everyone is suddenly calm and on the same page.",
        links: [
          { label: "The Zeroth Law — Britannica", url: "https://www.britannica.com/science/zeroth-law-of-thermodynamics" },
          { label: "Thermal Equilibrium — Physics Classroom", url: "https://www.physicsclassroom.com/class/thermalP/u18l1e.cfm" },
          { label: "Temperature Measurement History — BIPM", url: "https://www.bipm.org/en/measurement-units/history-si/temperature" },
        ],
        songs: [
          { title: "Everything In Its Right Place", artist: "Radiohead", url: "https://www.youtube.com/watch?v=NUNXGXHpxwc" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Equal Rights", artist: "Peter Tosh", url: "https://www.youtube.com/watch?v=4A_mN8OidjA" },
        ],
        advanced: "The Zeroth Law is the logical foundation for temperature (T). It defines the equivalence relation of \"being in thermal equilibrium.\" If A ~ C and B ~ C, then A ~ B. This transitive property is the bedrock of measurement. It mirrors the \"Golden Rule\" across social and ethical epistemologies — the necessity of a common standard for interaction.",
      },

      // ── 5 ── MASS-ENERGY EQUIVALENCE ─────────────────────────
      {
        id: "mass-energy",
        num: 5,
        icon: "⚛️",
        title: "The Equivalence of Mass and Energy",
        subtitle: "Frozen Light",
        simple: "Matter (stuff you can touch) is just super-packed energy. A tiny bit of \"stuff\" is actually a giant explosion of \"power\" waiting to be let out. You aren't just made of dust; you are made of frozen light.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"boom\" of thunder — energy shaking the air." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The ozone smell after a lightning strike." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"zing\" of a spicy pepper — energy reacting with your nerves." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the heavy weight of a stone, then feeling the sun's heat on it." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at the Sun — it is turning its own body into light for us." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"power\" in your legs when you sprint." },
        ],
        intuition: "Even when you feel small, the atoms inside you have enough power to light up a city.",
        links: [
          { label: "Einstein's Big Idea — PBS NOVA", url: "https://www.pbs.org/wgbh/nova/einstein/" },
          { label: "Mass-Energy Relation — Stanford Encyclopedia", url: "https://plato.stanford.edu/entries/equivME/" },
          { label: "E=mc² Explained — Britannica", url: "https://www.britannica.com/science/E-mc2-equation" },
        ],
        songs: [
          { title: "Starman", artist: "David Bowie", url: "https://www.youtube.com/watch?v=aBKEt3M6N6U" },
          { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
          { title: "Black Hole Sun", artist: "Soundgarden", url: "https://www.youtube.com/watch?v=3mbBbFH9fAg" },
        ],
        advanced: "E=mc² demonstrates that mass is an intrinsic property of energy. This unification suggests that the distinction between \"substance\" and \"action\" is an illusion of scale. In particle physics, this allows for pair production and annihilation. It aligns with the non-dualist view that the \"dancer\" (matter) and the \"dance\" (energy) are fundamentally inseparable.",
      },

      // ── 6 ── WORK-ENERGY THEOREM ─────────────────────────────
      {
        id: "work-energy",
        num: 6,
        icon: "⚙️",
        title: "The Work-Energy Theorem",
        subtitle: "Nothing Moves for Free",
        simple: "If you want to move faster, you have to put in the \"work.\" The effort you spend pushing a swing is exactly equal to how high and fast the swing goes. Nothing moves for free.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"clink\" of a hammer hitting a nail." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of sweat after a hard workout." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The burst of flavor when you bite down on a grape." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pushing a heavy door and feeling it finally swing open." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A bowling ball knocking down pins — passing its movement to them." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the tension in your arms as you pull a wagon." },
        ],
        intuition: "Every change you want to see in your life requires a bit of your inner \"push.\"",
        links: [
          { label: "Work-Energy Theorem — HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/work.html" },
          { label: "Work and Kinetic Energy — Physics LibreTexts", url: "https://phys.libretexts.org/Bookshelves/University_Physics/Book%3A_University_Physics_(OpenStax)/Map%3A_University_Physics_I_-_Mechanics_Sound_Oscillations_and_Waves_(OpenStax)/07%3A_Work_and_Kinetic_Energy" },
          { label: "Mechanical Work — Britannica", url: "https://www.britannica.com/science/work-physics" },
        ],
        songs: [
          { title: "Workin' Day and Night", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=S20m0p7m_4A" },
          { title: "Under Pressure", artist: "Queen & David Bowie", url: "https://www.youtube.com/watch?v=a01QQZyl-_I" },
          { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=gAjR4_CbPpQ" },
        ],
        advanced: "The Work-Energy Theorem states W_net = ΔK. It is a scalar representation of Newton's Second Law, providing a bridge between kinematics and dynamics. This maps to the \"Law of Cause and Effect\" — the belief that every manifestation in the physical world is the direct result of an intentional expenditure of force from a source.",
      },

      // ── 7 ── CARNOT'S PRINCIPLE ──────────────────────────────
      {
        id: "carnot",
        num: 7,
        icon: "🏎️",
        title: "Carnot's Principle",
        subtitle: "No Machine Is Perfect",
        simple: "No machine is perfect. Even the best car or robot wastes some energy as heat. There is a \"limit\" to how much work you can get out of a fire or a battery. You can't win, and you can't even break even.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"hum\" of a refrigerator working hard." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The hot, metallic smell of an engine after a long drive." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The slightly \"burnt\" taste of toast (wasted heat)." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the back of a TV — it's warm because it's not 100% efficient." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Steam rising from a pot — energy escaping into the air." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your heart race when you run; your body is a \"heat engine.\"" },
        ],
        intuition: "Accepting that nothing is \"perfect\" helps you appreciate the beauty in things that work at all.",
        links: [
          { label: "The Carnot Cycle — Energy Education", url: "https://energyeducation.ca/encyclopedia/Carnot_cycle" },
          { label: "Efficiency Limits — MIT News", url: "https://news.mit.edu/2012/thermodynamics-limits-0223" },
          { label: "Sadi Carnot — APS Physics", url: "https://www.aps.org/publications/apsnews/200812/physicshistory.cfm" },
        ],
        songs: [
          { title: "Fast Car", artist: "Tracy Chapman", url: "https://www.youtube.com/watch?v=DWRh_IQHpx0" },
          { title: "The Machine", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=AdKjEHfH_KM" },
          { title: "Keep the Car Running", artist: "Arcade Fire", url: "https://www.youtube.com/watch?v=j_aFmzlL06g" },
        ],
        advanced: "Carnot efficiency (η = 1 − T_L/T_H) defines the theoretical maximum for converting thermal energy into work. It proves that \"waste\" is a fundamental requirement of the universe, not a flaw in design. This connects to the concept of \"Sacrifice\" — the idea that for something to be gained (work), something must be released or lost (exhaust).",
      },

      // ── 8 ── STATISTICAL MECHANICS ───────────────────────────
      {
        id: "stat-mech",
        num: 8,
        icon: "🎲",
        title: "Statistical Mechanics",
        subtitle: "The Crowd Dance",
        simple: "Temperature is just a \"crowd\" of atoms dancing. If they dance fast, it's hot. If they dance slow, it's cold. The \"rules\" of heat are just the average behavior of trillions of tiny, bouncing balls.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The roar of a stadium crowd; you can't hear one person, but you hear the \"group.\"" },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A bakery — millions of tiny \"scent balls\" bouncing into your nose." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"fizz\" of soda — bubbles of gas hitting your tongue at random." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The \"pressure\" of a balloon — it feels solid because atoms are hitting it." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Dust motes dancing in a beam of sunlight." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"buzz\" in your muscles after a long walk." },
        ],
        intuition: "Even if one person is unpredictable, \"we\" as a whole follow a beautiful pattern.",
        links: [
          { label: "Ludwig Boltzmann — Britannica", url: "https://www.britannica.com/biography/Ludwig-Boltzmann" },
          { label: "Statistical Mechanics Intro — Stanford", url: "https://statisticalmechanics.stanford.edu/" },
          { label: "Microstates vs Macrostates — Khan Academy", url: "https://www.khanacademy.org/science/physics/thermodynamics/laws-of-thermodynamics/v/statistical-mechanics" },
        ],
        songs: [
          { title: "Viva La Vida", artist: "Coldplay", url: "https://www.youtube.com/watch?v=dvgZkm1xWPE" },
          { title: "Bittersweet Symphony", artist: "The Verve", url: "https://www.youtube.com/watch?v=1lyu1KKWT74" },
          { title: "Tiny Dancer", artist: "Elton John", url: "https://www.youtube.com/watch?v=Al7OnV7u77k" },
        ],
        advanced: "Boltzmann's equation (S = k ln W) bridges the microscopic (atoms) and macroscopic (entropy). It reveals that thermodynamic laws are probabilistic, not deterministic, on a quantum level. This aligns with the \"Holistic\" view — the \"Whole\" has properties (like temperature) that don't exist in the \"Parts,\" emerging only through collective interaction.",
      },

      // ── 9 ── GIBBS FREE ENERGY ───────────────────────────────
      {
        id: "gibbs",
        num: 9,
        icon: "⚡",
        title: "Gibbs Free Energy",
        subtitle: "Spending Money of Energy",
        simple: "Gibbs is the \"Spending Money\" of energy. It's the energy that is actually free to go do something cool, like growing a flower or moving your arm. If a reaction has enough \"spending money,\" it happens all by itself!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"fizz\" of an Alka-Seltzer in water — a spontaneous reaction." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a ripening banana — chemicals changing on their own." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The sour kick of a lemon — acid reacting with your taste buds." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Hand-warmers — chemicals releasing \"useful\" heat when you click them." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A rusty nail — nature \"deciding\" to turn iron into rust over time." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "That feeling of \"I'm ready to go!\" before a race." },
        ],
        intuition: "Knowing when a moment is \"ripe\" — when everything is lined up for something to happen naturally without being forced.",
        links: [
          { label: "Gibbs Free Energy — Khan Academy", url: "https://www.khanacademy.org/science/biology/energy-and-enzymes/free-energy-tutorial/a/gibbs-free-energy" },
          { label: "Spontaneous Processes — Chemistry LibreTexts", url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_Chemistry_-_The_Central_Science_(Brown_et_al.)/19%3A_Chemical_Thermodynamics/19.5%3A_Gibbs_Free_Energy" },
          { label: "Gibbs Free Energy — Britannica", url: "https://www.britannica.com/science/Gibbs-free-energy" },
        ],
        songs: [
          { title: "Free Fallin'", artist: "Tom Petty", url: "https://www.youtube.com/watch?v=1lWJXDG2iGu" },
          { title: "Unstoppable", artist: "Sia", url: "https://www.youtube.com/watch?v=cxjvTXo9WWM" },
          { title: "Electric Feel", artist: "MGMT", url: "https://www.youtube.com/watch?v=MmZexg8sxyk" },
        ],
        advanced: "Gibbs Free Energy (ΔG = ΔH − TΔS) determines chemical spontaneity. If ΔG is negative, the process is exergonic (it happens \"voluntarily\"). This concept is the gateway to understanding biological life as a series of coupled reactions. It connects to \"Vitalism\" — the spark that allows systems to act upon their environment.",
      },

      // ── 10 ── OPEN VS CLOSED SYSTEMS ─────────────────────────
      {
        id: "open-closed-systems",
        num: 10,
        icon: "🌱",
        title: "Open vs. Closed Systems",
        subtitle: "Islands of Order",
        simple: "The universe is getting messier (entropy), but you are getting smarter and stronger. How? Because you are an \"Open Door.\" You take in energy (food and sun) and push the \"messy\" energy out. Life is a beautiful island of order in a big, messy ocean.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A baby crying — the sound of a new, complex system demanding energy." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Fresh cut grass — the smell of a living system reacting to the world." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A fresh salad — eating sunlight that was captured by leaves." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling your own pulse — the rhythm of an open system pumping life." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A forest growing upward while the rocks below break down." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stretching and feeling your body \"recharge\" after a meal." },
        ],
        intuition: "As long as you keep \"opening your door\" to love and learning, you can keep growing even when things around you seem to be falling apart.",
        links: [
          { label: "Open Systems in Biology — Nature Education", url: "https://www.nature.com/scitable/topicpage/biological-energy-production-14356373/" },
          { label: "Life as Anti-Entropy — Scientific American", url: "https://www.scientificamerican.com/article/is-life-an-inevitable-consequence-of-physics/" },
          { label: "Schrödinger's 'What is Life?' — Wikipedia", url: "https://en.wikipedia.org/wiki/What_Is_Life%3F" },
        ],
        songs: [
          { title: "What a Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=rBrd_3VMC3c" },
          { title: "Beautiful Day", artist: "U2", url: "https://www.youtube.com/watch?v=co6WMzDOh1o" },
          { title: "Life is a Highway", artist: "Rascal Flatts", url: "https://www.youtube.com/watch?v=6TQ3S-uSTpE" },
        ],
        advanced: "Life is a \"dissipative structure\" (as described by Ilya Prigogine). By maintaining a flux of energy and matter, open systems can decrease local entropy at the expense of increasing global entropy. This explains how complexity emerges despite the Second Law. It mirrors the \"Hero's Journey\" — the individual's effort to create meaning and order within a chaotic world.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 🐒 EVOLUTION & ADAPTATION (evolution)
    // "How life changes over millions of years to survive"
    // ═══════════════════════════════════════════════════════════════

    evolution: [

      // ── 1 ── NATURAL SELECTION ───────────────────────────────
      {
        id: "natural-selection",
        num: 1,
        icon: "⚖️",
        title: "Natural Selection",
        subtitle: "The Race of the Fittest",
        simple: "Imagine a race where the fastest runners get a gold medal and a snack, but the slowest runners don't. Because the fast runners are healthy and strong, they have kids who are also fast runners. Over a long time, everyone in the family becomes a great runner. This is how nature picks the best \"tools\" for animals to stay alive.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to bird calls in a forest; the ones heard over the wind are the ones that survive to find mates." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smell a flower. It smells sweet specifically to trick a bee into visiting so the flower can make seeds." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Bite into a sour lemon. That \"zing\" is the plant's way of saying \"don't eat me yet.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel the thick fur of a dog. That fur is there because his ancestors would have frozen without it." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a green grasshopper on a green leaf. It is \"invisible\" so it doesn't get eaten." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Balance on one foot. Your ability to stay upright is a \"tool\" honed over millions of years." },
        ],
        intuition: "You are a living collection of \"winning\" traits. Every breath you take is a \"thank you\" to the billions of ancestors who were fast enough, smart enough, or tough enough to pass the baton to you.",
        links: [
          { label: "National Geographic: Natural Selection", url: "https://www.nationalgeographic.org/encyclopedia/natural-selection/" },
          { label: "Darwin's Manuscripts Project", url: "https://www.amnh.org/research/darwin-manuscripts" },
          { label: "HHMI BioInteractive: Selection in Action", url: "https://www.biointeractive.org/itunes-u/natural-selection" },
        ],
        songs: [
          { title: "The Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Blackbird", artist: "The Beatles", url: "https://www.youtube.com/watch?v=Man4Xw8Xypo" },
          { title: "Eye of the Tiger", artist: "Survivor", url: "https://www.youtube.com/watch?v=btPJPFnesV4" },
        ],
        advanced: "Natural Selection operates as a non-random filter on random genetic variation. It is the differential survival and reproduction of genotypes. By modulating allele frequencies within a population's gene pool, it optimizes \"fitness.\" It connects to Game Theory, where strategies yielding the highest payoff (survival) become the dominant Nash Equilibrium in a biological ecosystem.",
      },

      // ── 2 ── COMMON ANCESTRY ─────────────────────────────────
      {
        id: "common-ancestry",
        num: 2,
        icon: "🌳",
        title: "Common Ancestry",
        subtitle: "One Giant Family Tree",
        simple: "Every living thing — you, a blade of grass, and a giant whale — is part of one giant family tree. If you go back far enough in time, we all share the exact same great-great-great... grandparent. We are all made of the same \"Lego bricks.\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Your heartbeat. Almost every mammal has a heartbeat that follows a similar rhythm." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of rain (petrichor). It triggers a deep, ancient feeling because water is life for everyone." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The taste of sugar. Almost every living cell on Earth uses sugar for energy." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Press your palm against a tree trunk. Both you and the tree use water and sunlight to grow." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at your five fingers, then a cat's paw or a bat's wing. The bone shapes are almost identical." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and feel your lungs expand. That need for oxygen is a trait you share with fish using gills." },
        ],
        intuition: "You aren't in the world; you are the world. Every person you meet is a distant cousin, and every animal is a brother or sister in the long story of life.",
        links: [
          { label: "The Tree of Life Web Project", url: "http://tolweb.org/tree/" },
          { label: "OneZoom Tree of Life Explorer", url: "https://www.onezoom.org/" },
          { label: "Smithsonian: What Does It Mean To Be Human?", url: "https://humanorigins.si.edu/" },
        ],
        songs: [
          { title: "We Are Family", artist: "Sister Sledge", url: "https://www.youtube.com/watch?v=uyGY2NfYpeE" },
          { title: "Heal the World", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=BWf-eARnf6U" },
          { title: "One Love", artist: "Bob Marley", url: "https://www.youtube.com/watch?v=vdB-8eLEW8g" },
        ],
        advanced: "Common Ancestry is evidenced by Molecular Homology, specifically the near-universality of the genetic code (DNA/RNA) and highly conserved proteins like Cytochrome c. This links to Phylogenetics, the study of evolutionary relationships. It suggests a \"Singularity of Life,\" connecting biology to Information Theory (the transmission of a singular code through time).",
      },

      // ── 3 ── GENETIC MUTATION ────────────────────────────────
      {
        id: "genetic-mutation",
        num: 3,
        icon: "⚡",
        title: "Genetic Mutation",
        subtitle: "Beautiful Mistakes",
        simple: "Sometimes, when nature is copying the instructions to build a new baby, it makes a tiny \"typo.\" Most of the time, the mistake doesn't matter, but sometimes that \"typo\" gives a bird a stronger beak or a person blue eyes. These happy accidents are how life tries out new ideas.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Static on a radio. It's random noise, but sometimes you hear a new song through the fuzz." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a mutant flower that smells slightly different than the others in the garden." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The difference between a sweet apple and a tart one. Mutations changed the sugar levels." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The texture of a scar. It's a change in your \"normal\" skin, showing how things can alter." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing someone with two different colored eyes (heterochromia). That is a visible \"typo.\"" },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Flexing a muscle you didn't know you had. Some people can wiggle their ears because of tiny \"typos\" in their muscle instructions." },
        ],
        intuition: "Perfection is boring. The \"glitches\" in life are actually the seeds of the future. You are a unique masterpiece created by a billion tiny, beautiful mistakes.",
        links: [
          { label: "Learn.Genetics: What is Mutation?", url: "https://learn.genetics.utah.edu/content/basics/mutation/" },
          { label: "Nature Education: Genetic Mutation", url: "https://www.nature.com/scitable/topicpage/genetic-mutation-1127/" },
          { label: "DNA Learning Center", url: "https://dnalc.cshl.edu/" },
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=xMQ0Ryy01yE" },
          { title: "Radioactive", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=ktvTqknDobU" },
          { title: "Born This Way", artist: "Lady Gaga", url: "https://www.youtube.com/watch?v=wV1FrqwZyKw" },
        ],
        advanced: "Mutations are stochastic alterations in the nucleotide sequence of the genome. While often deleterious or neutral, they provide the Phenotypic Plasticity and raw variance necessary for adaptation. This connects to Entropy and Thermodynamics; life uses localized \"disorder\" (mutations) to create higher-order \"complexity\" (evolution).",
      },

      // ── 4 ── SPECIATION ──────────────────────────────────────
      {
        id: "speciation",
        num: 4,
        icon: "🛤️",
        title: "Speciation",
        subtitle: "Two Teams, One Origin",
        simple: "Imagine two groups of the same birds. One group moves to a cold mountain, and the other stays in a hot desert. After a long, long time, they change so much to fit their homes that they can't even have babies together anymore. They have become two totally different \"teams.\"",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The difference between a wolf's howl and a dog's bark. They used to be the same, but now they speak different \"languages.\"" },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The different scents of two types of pine trees that live on different sides of a valley." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Comparing a wild strawberry to a store-bought one. They have separated into different \"versions\" of tasty." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the difference between a rough-scaled lizard and a smooth-skinned salamander." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a map of islands. Each island often has its own special version of an animal found nowhere else." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of walking on sand versus walking on ice. Animals adapt their \"balance\" to where they live until they are different species." },
        ],
        intuition: "We are all part of the same \"water,\" but we are poured into different \"cups.\" Diversity is the way the universe makes sure life can live everywhere.",
        links: [
          { label: "Berkeley: Defining Speciation", url: "https://evolution.berkeley.edu/evolibrary/article/evo_40" },
          { label: "Biology Online: Speciation", url: "https://www.biologyonline.com/dictionary/speciation" },
          { label: "Khan Academy: Speciation", url: "https://www.khanacademy.org/science/ap-biology/natural-selection/speciation/a/species-speciation" },
        ],
        songs: [
          { title: "Go Your Own Way", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=6ul-cZyuYq4" },
          { title: "Two Tribes", artist: "Frankie Goes To Hollywood", url: "https://www.youtube.com/watch?v=pAnvYfOnfLk" },
          { title: "Across the Universe", artist: "The Beatles", url: "https://www.youtube.com/watch?v=90M60KAx67U" },
        ],
        advanced: "Speciation occurs via Allopatric, Sympatric, or Parapatric mechanisms, fundamentally driven by cessation of gene flow. This bridges Microevolution (changes within a population) and Macroevolution (large-scale patterns). It illustrates Emergence, where simple reproductive barriers lead to the complex branching of the entire biosphere.",
      },

      // ── 5 ── ADAPTATION ──────────────────────────────────────
      {
        id: "adaptation",
        num: 5,
        icon: "🛠️",
        title: "Adaptation",
        subtitle: "Superpowers for Where You Live",
        simple: "Adaptation is like having a \"superpower\" for where you live. A polar bear has a white coat to hide in the snow; a camel has a hump to store food for the desert. It is life's way of \"dressing up\" for the party it was invited to.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The silent flight of an owl. Its feathers are adapted to make no noise so it can sneak up on mice." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"wet dog\" smell. It's actually oils on the skin adapted to keep the dog's skin dry and warm." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The bitter taste of some mushrooms. They adapted that taste so you won't eat them." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The prick of a cactus spine. It's a \"leaf\" adapted to protect water in a dry place." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "The huge eyes of a cat. They are adapted to see in the dark where we are blind." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The \"sea legs\" you get on a boat. Your body is trying to adapt its balance to a moving world." },
        ],
        intuition: "You are perfectly designed for right now. Your body and mind are a toolkit built over eons to help you handle exactly what you are facing today.",
        links: [
          { label: "National Geographic: Adaptation", url: "https://www.nationalgeographic.org/encyclopedia/adaptation/" },
          { label: "BBC Bitesize: Evolutionary Adaptation", url: "https://www.bbc.co.uk/bitesize/guides/zth97p3/revision/1" },
          { label: "Britannica: Adaptation", url: "https://www.britannica.com/science/adaptation-biology" },
        ],
        songs: [
          { title: "I Will Survive", artist: "Gloria Gaynor", url: "https://www.youtube.com/watch?v=fGDQ9IukMOc" },
          { title: "Survivor", artist: "Destiny's Child", url: "https://www.youtube.com/watch?v=Wmc8bQnH-40" },
          { title: "Stronger", artist: "Kelly Clarkson", url: "https://www.youtube.com/watch?v=Xn676-fLq7I" },
        ],
        advanced: "Adaptation is the process of Teleonomy, where organisms appear \"designed\" for a purpose. It involves the fixation of beneficial alleles through selective pressure. This is fundamental to Biomimicry, where human engineering copies biological adaptations (e.g., Velcro from burrs), connecting biology to Functional Design and Engineering.",
      },

      // ── 6 ── GENETIC DRIFT ───────────────────────────────────
      {
        id: "genetic-drift",
        num: 6,
        icon: "🎲",
        title: "Genetic Drift",
        subtitle: "The Luck of the Draw",
        simple: "Sometimes, what happens in life isn't about who is the \"best,\" but who is the \"luckiest.\" If a giant foot steps on a bunch of red bugs but misses the blue ones by accident, the world gets more blue bugs. It wasn't because blue was better — it was just a roll of the dice.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The random \"pop\" of a bubble in a stream. It doesn't happen for a reason; it just happens." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A random gust of wind carrying the smell of cookies from a bakery you didn't know was there." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Finding one extra-salty chip in a bag. It's a random accident of the seasoning." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Catching a falling leaf before it hits the ground. It was just chance that you were there." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a cloud that looks like a face. It's just random shapes coming together by luck." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Tripping over a sidewalk crack. It wasn't a choice; it was just a random interaction with the world." },
        ],
        intuition: "Life is a mix of choices and chances. We must respect the \"mystery\" and the \"luck\" of the universe, knowing that sometimes things just happen, and that is okay.",
        links: [
          { label: "Berkeley: Genetic Drift", url: "https://evolution.berkeley.edu/evolibrary/article/evo_24" },
          { label: "Nature Education: Genetic Drift", url: "https://www.nature.com/scitable/definition/genetic-drift-201/" },
          { label: "Khan Academy: Genetic Drift", url: "https://www.khanacademy.org/science/ap-biology/natural-selection/population-genetics/a/genetic-drift-biology" },
        ],
        songs: [
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "Rolling in the Deep", artist: "Adele", url: "https://www.youtube.com/watch?v=rYEDA3JcQqw" },
          { title: "Viva La Vida", artist: "Coldplay", url: "https://www.youtube.com/watch?v=dvgZkm1xWPE" },
        ],
        advanced: "Genetic Drift is a Stochastic Process that leads to fluctuations in allele frequencies, particularly in small populations (Founder Effect/Bottleneck Effect). Unlike selection, it is non-adaptive. This connects to Probability Theory and Chaos Theory, illustrating that \"History\" is a path-dependent process where random initial conditions can dictate long-term outcomes.",
      },

      // ── 7 ── COEVOLUTION ─────────────────────────────────────
      {
        id: "coevolution",
        num: 7,
        icon: "♾️",
        title: "Coevolution",
        subtitle: "The Dance Partners",
        simple: "Coevolution is like two friends who learn a secret handshake. A bee needs a flower for food, and the flower needs the bee to carry its pollen. They grow and change together so they can help each other perfectly. They are \"dance partners\" in life.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"buzz\" of a bee that matches the vibration a flower needs to release its pollen." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The heavy scent of a flower that only blooms at night to attract moths that can only see in the dark." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Spicy peppers are spicy to stop mammals, but birds can't feel the heat — so they eat them and spread the seeds!" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The way a burr sticks to your clothes. It \"hired\" you to move its seeds to a new place." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "The bright orange of a butterfly matching the bright orange of a specific milkweed flower." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Holding hands with someone. You adjust your grip to match theirs — that is co-moving." },
        ],
        intuition: "You are never alone. You are always in a \"dance\" with the world around you. Every time you help someone else, you participate in the ancient rhythm of together-growth.",
        links: [
          { label: "Encyclopedia of Life: Coevolution", url: "https://eol.org/docs/discover/coevolution" },
          { label: "PBS: Coevolution", url: "https://www.pbs.org/wgbh/evolution/library/01/3/l_013_01.html" },
          { label: "UT Austin: Coevolutionary Arms Race", url: "https://www.bio.utexas.edu/courses/evolution/Coevolution.html" },
        ],
        songs: [
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "You've Got a Friend", artist: "Carole King", url: "https://www.youtube.com/watch?v=q6E7v6_Y08Q" },
        ],
        advanced: "Coevolution represents Reciprocal Selection Pressures. It can be mutualistic (bees/flowers) or antagonistic (predator/prey \"arms races\"). This is the biological equivalent of Coupled Oscillators in physics or Symbiosis in sociology, where the evolution of one agent is intrinsically linked to the state of another within the same system.",
      },

      // ── 8 ── THE FOSSIL RECORD ───────────────────────────────
      {
        id: "fossil-record",
        num: 8,
        icon: "🦴",
        title: "The Fossil Record",
        subtitle: "Earth's Scrapbook",
        simple: "The Earth is a giant scrapbook. When things die, sometimes they leave a \"stamp\" in the mud that turns to stone. These fossils are like photos from millions of years ago that show us exactly how animals looked before they changed into what they are today.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"clink\" of a rock hammer hitting stone. It sounds like a bell ringing from the past." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The earthy, dusty smell of a museum or an old cave." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The mineral \"tang\" of water that has filtered through ancient limestone." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your fingers over the ridges of a fossilized shell. You are touching something that lived 100 million years ago." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing the skeleton of a T-Rex. It's a \"ghost\" made of rock." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the weight of a heavy stone in your hand — knowing that stone used to be a living creature." },
        ],
        intuition: "Time is very deep. You are a small part of a story that has been being \"written\" for billions of years. Your life is a page in the most amazing book ever.",
        links: [
          { label: "Paleontology Portal", url: "http://paleoportal.org/" },
          { label: "The Paleobiology Database", url: "https://paleobiodb.org/" },
          { label: "Digital Atlas of Ancient Life", url: "https://www.digitalatlasofancientlife.org/" },
        ],
        songs: [
          { title: "Solsbury Hill", artist: "Peter Gabriel", url: "https://www.youtube.com/watch?v=_OO2PuGz-H8" },
          { title: "Landslide", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=WM7-PYtXtJM" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" },
        ],
        advanced: "The Fossil Record provides the Chronostratigraphic evidence for evolution. While biased by Taphonomy (the process of fossilization), it confirms Transitional Forms (e.g., Tiktaalik or Archaeopteryx). It connects biology to Geology and Thermodynamics, serving as a physical \"Entropy Trace\" of life's progression through deep time.",
      },

      // ── 9 ── HORIZONTAL GENE TRANSFER ────────────────────────
      {
        id: "hgt",
        num: 9,
        icon: "🕸️",
        title: "Horizontal Gene Transfer",
        subtitle: "Swapping Trading Cards",
        simple: "Usually, you get your genes from your parents. But tiny things like bacteria can \"swap\" genes like kids swapping trading cards! It's like if you could high-five a friend and suddenly have their hair color. It helps life learn new tricks very, very fast.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"hum\" of a busy city where everyone is sharing ideas at the same time." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of bread rising. Yeast cells share \"recipes\" to help the bread grow." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"funk\" of blue cheese or yogurt. This comes from many tiny microbes swapping genes to live together." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of \"slime\" on a rock in a creek. That slime is a \"city\" of bacteria all talking and swapping traits." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a biofilm (like the plaque on your teeth). It's a community where everyone shares their best tools." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of \"belonging\" in a crowd. You pick up the \"vibe\" of everyone around you, just like bacteria pick up genes." },
        ],
        intuition: "We are all \"open books.\" We influence each other just by being near each other. You don't just grow from your past; you grow from everyone you meet right now.",
        links: [
          { label: "Nature: Horizontal Gene Transfer", url: "https://www.nature.com/scitable/definition/horizontal-gene-transfer-235/" },
          { label: "Quanta: How Gene Sharing Shapes Life", url: "https://www.quantamagazine.org/how-gene-sharing-shapes-the-biosphere-20191022/" },
          { label: "ScienceDirect: HGT in Evolution", url: "https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/horizontal-gene-transfer" },
        ],
        songs: [
          { title: "Come Together", artist: "The Beatles", url: "https://www.youtube.com/watch?v=uol7wMi7SSc" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Intergalactic", artist: "Beastie Boys", url: "https://www.youtube.com/watch?v=qORYO0atB6g" },
        ],
        advanced: "Horizontal Gene Transfer (HGT) challenges the \"Tree of Life\" model, suggesting a \"Web of Life\" or Phylogenetic Network. It is the primary driver of antibiotic resistance and metabolic innovation in prokaryotes. This connects to Network Theory and Open-Source Systems, where information is shared laterally rather than just vertically, accelerating systemic evolution.",
      },

      // ── 10 ── PUNCTUATED EQUILIBRIUM ─────────────────────────
      {
        id: "punctuated-equilibrium",
        num: 10,
        icon: "💥",
        title: "Punctuated Equilibrium",
        subtitle: "The Big Jump",
        simple: "Evolution isn't always a slow walk. Sometimes, life stays the same for a long time (like a long nap), and then — BOOM! — everything changes very fast because of a big storm or a volcano. It's like a movie that has long boring parts and then a lot of action all at once.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A clap of thunder after a long, quiet afternoon." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of smoke after a fire. It signals that the old forest is gone and a new one is starting." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A sour patch kid — sweet for a long time, then a sudden burst of sour." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The sudden \"snap\" of a rubber band. It holds still, then moves fast." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a butterfly come out of a cocoon. It looked still for weeks, then suddenly it's a flying flower." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of a \"growth spurt\" when your knees ache because you are getting taller overnight." },
        ],
        intuition: "It is okay to feel \"stuck.\" Sometimes the quiet times are just getting you ready for a big \"jump\" forward. Change happens in its own time, often when you least expect it.",
        links: [
          { label: "PBS: Punctuated Equilibrium", url: "https://www.pbs.org/wgbh/evolution/library/03/5/l_035_01.html" },
          { label: "Gould and Eldredge: Original Paper Summary", url: "https://www.nature.com/articles/d41586-017-04753-1" },
          { label: "Berkeley: Punctuated Equilibrium", url: "https://evolution.berkeley.edu/evolibrary/article/0_0_0/punc_grad_01" },
        ],
        songs: [
          { title: "The Times They Are A-Changin'", artist: "Bob Dylan", url: "https://www.youtube.com/watch?v=90M60KAx67U" },
          { title: "Waiting on the World to Change", artist: "John Mayer", url: "https://www.youtube.com/watch?v=oBIxScJ5rlY" },
          { title: "Thunder", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=fKopy74weus" },
        ],
        advanced: "Proposed by Eldredge and Gould, Punctuated Equilibrium posits that the fossil record's \"gaps\" are not missing data, but reflections of Cladogenesis (rapid branching). This connects to Catastrophe Theory and Self-Organized Criticality, where systems remain in \"Stasis\" until a threshold is crossed, leading to a rapid phase transition to a new equilibrium.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 🧪 CHEMISTRY & BONDS (chemistry)
    // "What things are made of and how they stick together"
    // ═══════════════════════════════════════════════════════════════

    chemistry: [

      // ── 1 ── CONSERVATION OF MASS & ENERGY ───────────────────
      {
        id: "conservation-mass",
        num: 1,
        icon: "♾️",
        title: "The Conservation of Mass and Energy",
        subtitle: "Nothing Is Ever Lost",
        simple: "Nothing is ever truly lost, and nothing is ever truly new. Everything that exists just changes its \"outfit.\" If you bake a cake, every tiny bit of flour and sugar is still there, just mixed into a new form.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a constant waterfall; the water changes position but the roar remains one." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of rain (petrichor); it is the earth's old dust meeting recycled clouds." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A piece of ice melting in your mouth; it changes from solid to liquid but stays the same \"stuff.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Rubbing your hands together; kinetic energy becomes heat. It didn't vanish; it moved." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a candle burn; the wax becomes invisible gas, but it still weighs the same in the air." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your breath go in and out; you are a vessel for air that has been here for billions of years." },
        ],
        intuition: "That oxygen was once inside a star, then a dinosaur, then a tree. You are holding the history of the universe in your lungs right now.",
        links: [
          { label: "Conservation of Mass — Britannica", url: "https://www.britannica.com/science/law-of-conservation-of-mass" },
          { label: "First Law of Thermodynamics — Energy Education", url: "https://energyeducation.ca/encyclopedia/Law_of_conservation_of_energy" },
          { label: "Matter & Energy in Ecosystems — Nat Geo", url: "https://education.nationalgeographic.org/resource/resource-library-biogeochemical-cycles" },
        ],
        songs: [
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "Woodstock", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=cRjQCvfcXn0" },
        ],
        advanced: "The First Law of Thermodynamics and Conservation of Mass dictate a closed-system reality where total E and m remain invariant. This aligns with Stoichiometry in chemistry and Noether's Theorem in physics, suggesting that for every symmetry in nature, there is a corresponding conservation law.",
      },

      // ── 2 ── ELECTROSTATIC ATTRACTION ─────────────────────────
      {
        id: "coulombs-law",
        num: 2,
        icon: "🧲",
        title: "Electrostatic Attraction",
        subtitle: "The Universal Glue",
        simple: "The whole world stays together because opposites love to be near each other. Tiny \"plus\" parts and \"minus\" parts pull on one another like the strongest invisible magnets in the universe.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"crackle\" of a static spark on a rug." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sharp scent of ozone after a lightning strike (huge static attraction)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The zing of a battery on the tongue — a \"pull\" you can taste." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pulling a sweater off and feeling your hair stand up to reach it." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching lint cling to a screen." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"pull\" in your chest when you are near someone you love — a social \"static.\"" },
        ],
        intuition: "Rub a balloon on your hair and feel the tug. That tiny pull is the exact same force holding every atom in your body together.",
        links: [
          { label: "Coulomb's Law — Physics Classroom", url: "https://www.physicsclassroom.com/class/estatics/Lesson-3/Coulomb-s-Law" },
          { label: "Fundamental Forces — CERN", url: "https://home.cern/science/physics/standard-model" },
          { label: "Static Electricity — Library of Congress", url: "https://www.loc.gov/everyday-mysteries/item/how-does-static-electricity-work/" },
        ],
        songs: [
          { title: "Electric Feel", artist: "MGMT", url: "https://www.youtube.com/watch?v=MmZexg8sxyk" },
          { title: "Opposites Attract", artist: "Paula Abdul", url: "https://www.youtube.com/watch?v=xweiQukBM_k" },
          { title: "Suspicious Minds", artist: "Elvis Presley", url: "https://www.youtube.com/watch?v=Wb0Jmy-JYbA" },
        ],
        advanced: "Coulomb's Law (F = k·q₁q₂/r²) defines the force between two point charges. This electrostatic interaction is the foundation of the electromagnetic force. It relates to Jungian Psychology (Anima/Animus) and Taoist Dualism (Yin/Yang), where tension between opposing poles creates the movement and binding of life.",
      },

      // ── 3 ── THE OCTET RULE ──────────────────────────────────
      {
        id: "octet-rule",
        num: 3,
        icon: "🧩",
        title: "The Octet Rule & Electron Stability",
        subtitle: "Full Hands, Happy Atom",
        simple: "Atoms are like people who feel better when their \"hands\" are full. Most atoms want exactly eight electrons to feel calm and happy. They will trade or share until they get that perfect number.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"click\" of two Lego bricks snapping together perfectly." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of clean, salty air (stable salt crystals)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The balanced taste of pure water (Hydrogen and Oxygen finding peace)." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Holding hands with someone where your fingers interlock perfectly." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A finished 8-piece puzzle." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of \"fullness\" after a good meal." },
        ],
        intuition: "Imagine having 7 fingers and finding one more to make a perfect set of 8. That \"sigh\" of relief is what an atom feels when it bonds.",
        links: [
          { label: "The Octet Rule — Chemistry LibreTexts", url: "https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Introduction_to_General_Chemistry/03%253A_Ionic_Bonding/3.02%253A_The_Octet_Rule" },
          { label: "Noble Gases and Stability — RSC", url: "https://www.rsc.org/periodic-table/groups/18/" },
          { label: "Lewis Dot Structures — Khan Academy", url: "https://www.khanacademy.org/science/ap-chemistry-beta/x2eefde699e1a122:molecular-and-ionic-compound-structure-and-properties/x2eefde699e1a122:lewis-diagrams/v/lewis-structures-part-1" },
        ],
        songs: [
          { title: "With a Little Help from My Friends", artist: "The Beatles", url: "https://www.youtube.com/watch?v=0C58ttB2-Qg" },
          { title: "Better Together", artist: "Jack Johnson", url: "https://www.youtube.com/watch?v=u57d4_b_YgI" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
        ],
        advanced: "The Octet Rule reflects the filling of s and p valence orbitals (ns²np⁶), representing a drive toward a Global Energy Minimum. This mirrors Gestalt Theory's \"Law of Closure\" — where the mind seeks to complete unfinished shapes to reach equilibrium.",
      },

      // ── 4 ── COVALENT BONDING ────────────────────────────────
      {
        id: "covalent-bond",
        num: 4,
        icon: "🤝",
        title: "Covalent Bonding",
        subtitle: "Sharing to Win",
        simple: "This is when two atoms decide to share what they have so they both win. They hold onto the same electrons like two kids holding onto the same toy so they can both play.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Two voices singing in perfect harmony." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a rose (complex shared carbon bonds)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Sugar — Carbon, Hydrogen, and Oxygen sharing everything." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "A firm \"pinky swear\" link." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Two circles overlapping to make a heart shape." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Leaning your back against a friend's back to stay standing." },
        ],
        intuition: "Lock your fingers together tightly. Try to pull them apart. That strength you feel is the same strength holding your DNA together.",
        links: [
          { label: "What is a Covalent Bond? — Scientific American", url: "https://www.scientificamerican.com/article/chemical-bonding-covalent-bonds/" },
          { label: "Organic Chemistry Basics", url: "https://www.masterorganicchemistry.com/2010/05/19/introduction-to-covalent-bonding/" },
          { label: "Structure of DNA — Oxford", url: "https://academic.oup.com/nar/article/31/13/3406/1103323" },
        ],
        songs: [
          { title: "Stand By Me", artist: "Ben E. King", url: "https://www.youtube.com/watch?v=hwZNL7QVJjE" },
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsWw" },
          { title: "In My Life", artist: "The Beatles", url: "https://www.youtube.com/watch?v=YBcdt6AszNE" },
        ],
        advanced: "Covalent bonding involves the sharing of electron pairs. It creates discrete molecular entities with specific bond angles and lengths determined by orbital hybridization (sp, sp², sp³). This is the chemical equivalent of Mutualism in biology or Game Theory's \"Win-Win\" scenarios.",
      },

      // ── 5 ── IONIC BONDING ───────────────────────────────────
      {
        id: "ionic-bond",
        num: 5,
        icon: "💎",
        title: "Ionic Bonding",
        subtitle: "The Give and Take",
        simple: "One atom is a \"giver\" and one is a \"taker.\" The taker grabs an electron, and now they are both charged up like magnets. They stay stuck together not by sharing, but by the \"pull\" of their new charges.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"clack\" of two heavy magnets hitting." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a salt flat or the ocean spray." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Table salt — the classic \"stuck together\" pair." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the sharp, hard edge of a crystal." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A perfectly organized grid or checkerboard." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of being \"anchored\" or heavy." },
        ],
        intuition: "Press two magnets together. You aren't \"sharing\" anything, but the pull makes them one. That \"snap\" is an ionic bond.",
        links: [
          { label: "Ionic vs Covalent Bonds — Diffen", url: "https://www.diffen.com/difference/Covalent_Bonds_vs_Ionic_Bonds" },
          { label: "Crystal Lattice Structure — Britannica", url: "https://www.britannica.com/science/crystal-lattice" },
          { label: "Properties of Salts — Purdue", url: "https://chemed.chem.purdue.edu/genchem/topicreview/bp/ch3/properties.html" },
        ],
        songs: [
          { title: "You Really Got a Hold on Me", artist: "The Miracles", url: "https://www.youtube.com/watch?v=AdD6T7-mK_s" },
          { title: "Under My Thumb", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=nYYTLJ8YHi4" },
          { title: "Magnetic", artist: "Earth, Wind & Fire", url: "https://www.youtube.com/watch?v=XpWp_Uo4_tA" },
        ],
        advanced: "Ionic bonding results from the complete transfer of valence electrons, leading to a crystalline lattice rather than discrete molecules. The bond energy is described by Lattice Energy equations. This mirrors Economic Transactions (transfer of capital) or Social Hierarchy, where stability is maintained through clear roles.",
      },

      // ── 6 ── ATOMIC ORBITALS ─────────────────────────────────
      {
        id: "orbitals",
        num: 6,
        icon: "☁️",
        title: "Atomic Orbitals & Quantum Shells",
        subtitle: "The Fuzzy Cloud",
        simple: "Electrons don't fly in circles like bees. They \"teleport\" inside fuzzy clouds. Bonding happens when two fuzzy clouds melt into one big cloud.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"hum\" of a beehive where you can't see the individual bees." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of fog or mist in a forest." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Cotton candy melting — it's there, then it's everywhere." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Moving your hand through thick smoke." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A blurry photo that looks like a beautiful shape." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of \"dizziness\" or spinning without moving." },
        ],
        intuition: "Try to catch a shadow. You can see where it is, but you can't grab it. That \"fuzzy\" presence is exactly how an electron exists.",
        links: [
          { label: "Quantum Mechanical Model — Khan Academy", url: "https://www.khanacademy.org/science/physics/quantum-physics/quantum-numbers-and-orbitals/a/the-quantum-mechanical-model-of-the-atom" },
          { label: "Schrödinger — Nobel Prize", url: "https://www.nobelprize.org/prizes/physics/1933/schrodinger/biographical/" },
          { label: "Visualizing Atomic Orbitals", url: "https://www.orbitals.com/orb/orbtable.htm" },
        ],
        songs: [
          { title: "Strawberry Fields Forever", artist: "The Beatles", url: "https://www.youtube.com/watch?v=HtUH9z_Oey8" },
          { title: "Dreams", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=Y3ywicffOj4" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=u9Dg-g7t2LI" },
        ],
        advanced: "Orbitals are probability density functions derived from the Schrödinger wave equation (Ψ). Bonding is the Linear Combination of Atomic Orbitals (LCAO) to form molecular orbitals. This aligns with Probability Theory and Post-Structuralism, where reality is a range of possibilities until an interaction occurs.",
      },

      // ── 7 ── ELECTRONEGATIVITY ───────────────────────────────
      {
        id: "electronegativity",
        num: 7,
        icon: "➰",
        title: "Electronegativity",
        subtitle: "The Tug-of-War",
        simple: "Some atoms are \"greedy\" and pull harder on the shared electrons. This makes one side of the molecule a little bit \"plus\" and the other \"minus,\" like a battery.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The straining sound of a rope in tug-of-war." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"sharp\" smell of vinegar or lemon (acids are \"pullers\")." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Sourness! It's the \"tug\" on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of a rubber band stretched tight." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Water droplets sticking to a window (they stick because they are polar!)." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling \"off-balance\" or leaning to one side." },
        ],
        intuition: "Pull on a towel with a friend, but you pull much harder. The towel moves toward you. That \"unevenness\" is why water lets you live!",
        links: [
          { label: "Pauling's Electronegativity Scale — Live Science", url: "https://www.livescience.com/62453-electronegativity.html" },
          { label: "Polar vs Nonpolar Bonds", url: "https://academic.oup.com/book/26913/chapter/195971485" },
          { label: "Why Water is Polar — USGS", url: "https://www.usgs.gov/special-topics/water-science-school/science/water-molecules-and-polarity" },
        ],
        songs: [
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "Chain of Fools", artist: "Aretha Franklin", url: "https://www.youtube.com/watch?v=fDxzQJaA228" },
          { title: "Tug of War", artist: "Paul McCartney", url: "https://www.youtube.com/watch?v=I6D0v2G_HhI" },
        ],
        advanced: "Electronegativity (χ) determines the dipole moment of a bond. High differences result in ionic character, while small differences result in nonpolar covalent bonds. This mirrors Power Dynamics in sociology or Potential Difference in electrical engineering, where \"flow\" is created by uneven distribution.",
      },

      // ── 8 ── METALLIC BONDING ────────────────────────────────
      {
        id: "metallic-bond",
        num: 8,
        icon: "🌊",
        title: "Metallic Bonding",
        subtitle: "The Electron Sea",
        simple: "In metals, no atom \"owns\" its electrons. They all put them into a big, communal swimming pool. Because the electrons can swim around, metals can bend and carry electricity.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The ringing of a bell." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"metallic\" scent of coins or a playground slide." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"copper\" taste of a penny." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The cold, smooth feeling of a spoon." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "The shiny \"glare\" of a mirror." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of being in a large crowd moving together, like a wave at a stadium." },
        ],
        intuition: "Dip your hand in a bowl of water. You can't \"hold\" the water, but it surrounds you. This \"sea\" is what holds a piece of gold together.",
        links: [
          { label: "Metallic Bonding Basics — Chemguide", url: "https://www.chemguide.co.uk/atoms/bonding/metallic.html" },
          { label: "Why Metals Conduct — Scientific American", url: "https://www.scientificamerican.com/article/how-do-metals-conduct-ele/" },
          { label: "Malleability and Ductility — ThoughtCo", url: "https://www.thoughtco.com/definition-of-malleable-605876" },
        ],
        songs: [
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsWw" },
          { title: "We Are the Champions", artist: "Queen", url: "https://www.youtube.com/watch?v=04854XqcfCY" },
          { title: "Shiny", artist: "Jemaine Clement", url: "https://www.youtube.com/watch?v=93lrosBEW-Q" },
        ],
        advanced: "Metallic bonding is characterized by delocalized electrons in a \"conduction band\" (Band Theory). This accounts for high thermal and electrical conductivity. It is the chemical equivalent of Collectivism or Open Source Communities, where free flow of information creates a resilient whole.",
      },

      // ── 9 ── INTERMOLECULAR FORCES ───────────────────────────
      {
        id: "imf",
        num: 9,
        icon: "🤝",
        title: "Intermolecular Forces",
        subtitle: "The Gentle Handshake",
        simple: "These aren't \"super glue\" bonds; they are more like \"handshakes\" or \"sticky notes.\" They let water be liquid and help geckos walk on walls, but they are easy to break.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"peel\" of a sticker being pulled off." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Perfume wafting — the bonds are weak enough to let the scent fly away." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The way honey sticks to your mouth." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The \"tackiness\" of tape." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A spider web shimmering in the sun." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the \"drag\" when walking through water." },
        ],
        intuition: "Lightly touch your fingertips together and pull apart. That tiny \"stick\" is a Van der Waals force. It's the \"Gentle Hug\" of the universe.",
        links: [
          { label: "Hydrogen Bonding in Water — Khan Academy", url: "https://www.khanacademy.org/science/biology/water-acids-and-bases/hydrogen-bonding-in-water/a/hydrogen-bonding-in-water" },
          { label: "How Geckos Defy Gravity — Live Science", url: "https://www.livescience.com/21703-how-geckos-walk-on-ceilings.html" },
          { label: "Van der Waals Forces — Britannica", url: "https://www.britannica.com/science/van-der-Waals-forces" },
        ],
        songs: [
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Tiny Dancer", artist: "Elton John", url: "https://www.youtube.com/watch?v=hoskDZRLOCs" },
          { title: "Stuck on You", artist: "Lionel Richie", url: "https://www.youtube.com/watch?v=ZfOAs_R9N_o" },
        ],
        advanced: "Intermolecular forces (London Dispersion, Dipole-Dipole, Hydrogen Bonding) dictate the physical phase (Solid, Liquid, Gas) of a substance. This relates to Social Cohesion, where \"weak ties\" (acquaintances) are often more important for overall structure than \"strong ties\" (family).",
      },

      // ── 10 ── VSEPR THEORY ───────────────────────────────────
      {
        id: "vsepr",
        num: 10,
        icon: "📐",
        title: "VSEPR Theory",
        subtitle: "The Shape of Reality",
        simple: "Electrons hate being near other electrons. They push each other away as far as possible. This \"pushing\" decides if a molecule looks like a line, a triangle, or a pyramid.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"pop\" of a balloon when the shape can't hold anymore." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of mint — its shape fits a specific \"lock\" in your nose." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Key-and-lock: how \"sweet\" fits your tongue's shape." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pushing two same-side magnets away from each other." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A 3D tripod or a pyramid." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stretching your arms out wide so you don't bump into anyone." },
        ],
        intuition: "Blow up three balloons and tie them together. They will naturally push into a triangle. That \"push\" is why everything in the world has a shape.",
        links: [
          { label: "VSEPR Geometry — Chemistry LibreTexts", url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_Chemistry_-_The_Central_Science_(Brown_et_al.)/09%3A_Molecular_Geometry_and_Bonding_Theories/9.02%3A_The_VSEPR_Model" },
          { label: "The Geometry of Life — Nature", url: "https://www.nature.com/articles/35011531" },
          { label: "Molecular Shapes and Functions", url: "https://academic.oup.com/book/26913/chapter/195972018" },
        ],
        songs: [
          { title: "Shape of You", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
          { title: "The Distance", artist: "Cake", url: "https://www.youtube.com/watch?v=cno20onK9dY" },
          { title: "Geometry of Love", artist: "Jean-Michel Jarre", url: "https://www.youtube.com/watch?v=2v-p7U5m324" },
        ],
        advanced: "VSEPR Theory predicts molecular geometry based on minimization of electron-pair repulsion. It explains why H₂O is bent (~104.5°) rather than linear, which is foundational for life's chemistry. This mirrors Architecture and Urban Planning, where the \"space between\" is just as important as the objects themselves.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 🧬 GENETICS & DNA (genetics)
    // "The code of life and how it writes you"
    // ═══════════════════════════════════════════════════════════════

    genetics: [

      // ── 1 ── THE DOUBLE HELIX ────────────────────────────────
      {
        id: "double-helix",
        num: 1,
        icon: "🧬",
        title: "The Double Helix Structure",
        subtitle: "The Spiral Staircase of Life",
        simple: "Imagine two long ladders twisted together like a spiral slide. This slide holds the secret recipe for making you. It uses only four special \"letters\" to write every instruction your body needs. It is the strongest, most trusted notebook in the world.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a grandfather clock ticking; the steady, rhythmic beat of time keeping the code safe." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of an old library book — layers of information preserved for ages." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A pinch of salt; simple crystals that form a perfect, repeating structure." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Twist two pieces of string together until they kink; feel the tension and strength of the spiral." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a spiral staircase and see how it climbs upward using the same repeating steps." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Interlock your fingers and twist your forearms; feel how two separate sides become one solid unit." },
        ],
        intuition: "You are a living library. Every cell contains the entire story of \"Us,\" twisted into a beautiful, unbreakable bond.",
        links: [
          { label: "NHGRI: DNA", url: "https://www.genome.gov/genetics-glossary/Deoxyribonucleic-Acid" },
          { label: "Nature: DNA Structure — Watson & Crick", url: "https://www.nature.com/scitable/topicpage/discovery-of-dna-structure-and-function-watson-397/" },
          { label: "Khan Academy: Molecular Structure of DNA", url: "https://www.khanacademy.org/science/biology/dna-as-the-genetic-material/dna-structure-and-replication/a/dna-structure-and-function" },
        ],
        songs: [
          { title: "Let It Be", artist: "The Beatles", url: "https://www.youtube.com/watch?v=QDYfEBY9nmU" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "True Colors", artist: "Cyndi Lauper", url: "https://www.youtube.com/watch?v=LPn0KFlbqX8" },
        ],
        advanced: "The Double Helix represents the convergence of information theory and physical chemistry. The antiparallel strands (5' to 3') stabilized by hydrogen bonding between purines and pyrimidines create a digital-to-analog bridge. This mirrors the \"As Above, So Below\" hermetic principle, where microscopic geometry dictates macroscopic reality.",
      },

      // ── 2 ── THE CENTRAL DOGMA ───────────────────────────────
      {
        id: "central-dogma",
        num: 2,
        icon: "⟿",
        title: "The Central Dogma",
        subtitle: "The One-Way Street",
        simple: "Life has a strict \"One-Way Street\" for its rules. DNA is the master book that stays in the library. It gets copied onto a small note (RNA), and that note is used to build the \"machines\" (proteins) that do all the work.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "An echo in a canyon; the original sound (DNA) creates a moving wave (RNA) that hits the other side." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of baking bread; the recipe in the book becomes the aroma in the air." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Tasting the finished bread; the final result of the recipe's instructions." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Trace a stencil with a pencil; the solid shape guides the moving hand." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a builder looking at a blueprint to lay a brick." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Think about moving your hand before you actually do it; the thought travels to the muscle." },
        ],
        intuition: "You are the physical result of an ancient, invisible whisper that never stops speaking.",
        links: [
          { label: "YourGenome: Central Dogma", url: "https://www.yourgenome.org/facts/what-is-the-central-dogma/" },
          { label: "Cold Spring Harbor: DNA to Protein", url: "https://dnalc.cshl.edu/resources/3d/central-dogma.html" },
          { label: "Britannica: Protein Synthesis", url: "https://www.britannica.com/science/protein-synthesis" },
        ],
        songs: [
          { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
          { title: "Don't Stop Believin'", artist: "Journey", url: "https://www.youtube.com/watch?v=VcjzHMhBtf0" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
        ],
        advanced: "The Central Dogma describes the deterministic flow of biological entropy. It is a linguistic system where nucleotides are the syntax and proteins are the semantics. This unidirectional flow ensures the integrity of the code by protecting the master template from chaotic fluctuations of the external environment.",
      },

      // ── 3 ── GENETIC INHERITANCE ─────────────────────────────
      {
        id: "genetic-inheritance",
        num: 3,
        icon: "⚖️",
        title: "Genetic Inheritance",
        subtitle: "Half Mom, Half Dad, All You",
        simple: "You are a perfect mix of the people who came before you. You got exactly half of your instructions from your mom and half from your dad. It's like shuffling two decks of cards to make a brand new, special game.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Two singers harmonizing; different voices creating one beautiful song." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Mixing vanilla and cinnamon; you can smell both, but they make a new scent together." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Sweet and sour sauce; a balance of two different worlds on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Hold hands with someone; feel where you end and they begin." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look in the mirror and find your grandmother's eyes or your father's smile." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Notice how you walk or stand similarly to your parents without trying." },
        ],
        intuition: "You are a bridge between the past and the future, carrying the light of thousands of ancestors.",
        links: [
          { label: "Genome.gov: Inheritance", url: "https://www.genome.gov/genetics-glossary/Inheritance" },
          { label: "Learn.Genetics: Mendel's Laws", url: "https://learn.genetics.utah.edu/content/basics/patterns/" },
          { label: "Stanford Encyclopedia: Heredity", url: "https://plato.stanford.edu/entries/heredity/" },
        ],
        songs: [
          { title: "Beautiful Boy", artist: "John Lennon", url: "https://www.youtube.com/watch?v=Lt3IOdDE5iA" },
          { title: "Landslide", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=WM7-PYtXtJM" },
          { title: "Father and Son", artist: "Cat Stevens", url: "https://www.youtube.com/watch?v=b-7c4VNGOgU" },
        ],
        advanced: "Mendelian Laws represent the quantization of biological identity. By segregating and independently assorting alleles, life maintains a \"Shared Ignorance Floor\" that prevents total homogeneity, ensuring that while the individual is unique, the collective remains robust through diverse recombination.",
      },

      // ── 4 ── PROTEIN SYNTHESIS ───────────────────────────────
      {
        id: "protein-synthesis",
        num: 4,
        icon: "🏗️",
        title: "Protein Synthesis",
        subtitle: "Building You Brick by Brick",
        simple: "If DNA is the blueprint, proteins are the bricks and the workers. Your cells read the DNA code and snap \"beads\" (amino acids) together in a long chain to build your hair, your muscles, and your heart.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"click\" of Lego bricks snapping together." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The metallic scent of a workshop where things are being built." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The savory \"umami\" taste of protein-rich foods like beans or nuts." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your hand over a textured fabric; feeling the individual threads that make the whole." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a 3D printer create an object layer by layer." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Clench your bicep; feel the \"machinery\" of the protein fibers tightening." },
        ],
        intuition: "Every moment, your body is rebuilding itself from the inside out using the wisdom of the stars.",
        links: [
          { label: "ScienceDirect: Protein Synthesis", url: "https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/protein-synthesis" },
          { label: "Khan Academy: Translation", url: "https://www.khanacademy.org/science/biology/gene-expression-central-dogma/translation-polypeptides/a/protein-synthesis-translation" },
          { label: "HHMI BioInteractive: Translation", url: "https://www.biointeractive.org/classroom-resources/translation" },
        ],
        songs: [
          { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=gAjR4_CbPpQ" },
          { title: "Ain't No Mountain High Enough", artist: "Marvin Gaye", url: "https://www.youtube.com/watch?v=IC5PL0XImjw" },
          { title: "Eye of the Tiger", artist: "Survivor", url: "https://www.youtube.com/watch?v=btPJPFnesV4" },
        ],
        advanced: "Protein synthesis is the translation of digital information into functional three-dimensional geometry. The folding of polypeptide chains based on hydrophobic and hydrophilic interactions is a manifestation of \"Self-Assembly,\" where abstract code transitions to kinetic reality.",
      },

      // ── 5 ── THE UNIVERSAL GENETIC CODE ──────────────────────
      {
        id: "universal-code",
        num: 5,
        icon: "🌐",
        title: "The Universal Genetic Code",
        subtitle: "One Language for All Life",
        simple: "All living things speak the same language. The code that tells a flower how to grow is the same kind of code that tells you how to grow. We are all part of one big, giant family tree.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A crowd of people from different countries all laughing in the same way." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of rain on dry earth; a scent that every living thing recognizes." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Water; the one thing every single creature on Earth needs." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Petting a dog or touching a leaf; feeling the warmth of another \"living\" relative." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at the Golden Ratio in a seashell and seeing it in a galaxy." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Breathe deeply; feel the air that has passed through the lungs of every creature before you." },
        ],
        intuition: "You are never alone; you share the same \"software\" as every bird, tree, and person on this planet.",
        links: [
          { label: "NLM: Genetic Code", url: "https://www.ncbi.nlm.nih.gov/books/NBK21950/" },
          { label: "Scitable: Universal Genetic Code", url: "https://www.nature.com/scitable/definition/genetic-code-13/" },
          { label: "Genome.gov: Comparative Genomics", url: "https://www.genome.gov/about-genomics/fact-sheets/Comparative-Genomics-Fact-Sheet" },
        ],
        songs: [
          { title: "What A Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=CWzrABouyeE" },
          { title: "Heal the World", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=BWf-eARnf6U" },
          { title: "Believer", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=7wtfhZwyrcc" },
        ],
        advanced: "The near-universality of the genetic code is the ultimate proof of a singular Common Ancestor. This biochemical \"Lingua Franca\" suggests life is a unified phenomenon, reflecting a high fidelity of recognition across the entire biosphere, anchoring all entities into a single convergent evolutionary arc.",
      },

      // ── 6 ── DNA REPLICATION ─────────────────────────────────
      {
        id: "dna-replication",
        num: 6,
        icon: "⧉",
        title: "DNA Replication",
        subtitle: "The Perfect Copy",
        simple: "Before a cell becomes two cells, it has to copy its whole instruction book perfectly. It unzips the DNA and builds a new side for each half. It even has a \"spell-checker\" to make sure there are no mistakes.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The rhythmic \"zip\" and \"unzip\" of a jacket." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Freshly printed paper from a copier." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A twin popsicle; two identical treats joined at the center before being pulled apart." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Looking in a mirror and touching the glass; two \"yous\" meeting at the surface." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing your reflection in a still pond." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Divide your weight evenly between both feet; feel the symmetry of your two halves." },
        ],
        intuition: "Life is an endless cycle of sharing and doubling, ensuring the story never ends.",
        links: [
          { label: "YourGenome: DNA Replication", url: "https://www.yourgenome.org/facts/what-is-dna-replication/" },
          { label: "Khan Academy: DNA Replication", url: "https://www.khanacademy.org/science/biology/dna-as-the-genetic-material/dna-replication/a/molecular-mechanism-of-dna-replication" },
          { label: "Britannica: DNA Replication", url: "https://www.britannica.com/science/DNA-replication" },
        ],
        songs: [
          { title: "Seven Nation Army", artist: "The White Stripes", url: "https://www.youtube.com/watch?v=0J2QdDbelmY" },
          { title: "Man In The Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Clocks", artist: "Coldplay", url: "https://www.youtube.com/watch?v=d020l6OX164" },
        ],
        advanced: "Replication is the mechanism of biological \"Redundancy.\" By utilizing semiconservative replication, life minimizes errors. The high-fidelity polymerases act as \"Gated Informative\" filters, ensuring the Shannon entropy of daughter strands remains nearly identical to the parent.",
      },

      // ── 7 ── MUTATIONS ───────────────────────────────────────
      {
        id: "mutations-dna",
        num: 7,
        icon: "⚡",
        title: "Mutations",
        subtitle: "The Beautiful Typo",
        simple: "Sometimes, a tiny typo happens in the DNA code. Most of the time it doesn't matter, but sometimes that \"typo\" gives a creature a new superpower, like a bird with a better beak or a faster runner. This is how life tries new ideas.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A jazz musician playing a \"wrong\" note that suddenly makes the song sound cooler." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The unexpected scent of a wildflower in the middle of a concrete city." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Adding a secret ingredient to a recipe that makes it taste unexpectedly amazing." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Finding a smooth stone in a pile of rough ones." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A four-leaf clover in a field of three-leaf ones." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Learning a new dance move; the feeling of your body doing something it never did before." },
        ],
        intuition: "Even your mistakes are part of a bigger plan to help you grow and change for the better.",
        links: [
          { label: "Learn.Genetics: Mutation", url: "https://learn.genetics.utah.edu/content/basics/mutation/" },
          { label: "Nature: Genetic Mutation", url: "https://www.nature.com/scitable/topicpage/genetic-mutation-1127/" },
          { label: "Berkeley: Evolution 101 — Mutations", url: "https://evolution.berkeley.edu/dna-and-mutations/" },
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=xMQ0Ryy01yE" },
          { title: "Radioactive", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=ktvTqknDobU" },
          { title: "You Can't Always Get What You Want", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=Ef9QnZVpVd8" },
        ],
        advanced: "Mutations are the \"Global Reliability Modulator\" in action. They introduce the necessary variance to prevent the Base Convergence of a species from becoming stagnant. While often stochastic, they provide the raw material for natural selection to drive the complexification of life.",
      },

      // ── 8 ── GENE EXPRESSION ─────────────────────────────────
      {
        id: "gene-expression",
        num: 8,
        icon: "💡",
        title: "Gene Expression",
        subtitle: "The Dimmer Switch",
        simple: "Every cell in your body has the same book, but they only read the chapters they need. A skin cell reads the \"Skin\" chapter and ignores the \"Brain\" chapter. It's like a dimmer switch that turns some lights up and others down.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A piano; the same 88 keys can play a sad song or a happy song depending on which ones you press." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A kitchen where only the \"breakfast\" smells are active in the morning." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The difference between a raw onion and a fried one; same thing, different \"expression.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the difference between your soft eyelid and your hard fingernail (both made by you!)." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "An actor playing different roles using the same face." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Relaxing your shoulders while tightening your core; using different parts for different jobs." },
        ],
        intuition: "You contain everything you need to be anything; it's just about which \"light\" you choose to turn on.",
        links: [
          { label: "Genome.gov: Gene Expression", url: "https://www.genome.gov/genetics-glossary/Gene-Expression" },
          { label: "Scitable: Gene Expression", url: "https://www.nature.com/scitable/topicpage/gene-expression-14121669/" },
          { label: "Khan Academy: Gene Regulation", url: "https://www.khanacademy.org/science/biology/gene-regulation" },
        ],
        songs: [
          { title: "Girl on Fire", artist: "Alicia Keys", url: "https://www.youtube.com/watch?v=J91ti_MpdHA" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" },
          { title: "Mr. Brightside", artist: "The Killers", url: "https://www.youtube.com/watch?v=gGdGFtwCNBE" },
        ],
        advanced: "Gene expression is the \"Softmax Weighting\" of the genome. While the density matrix of DNA is constant across all somatic cells, the \"Active Mask\" of transcription factors determines the cellular phenotype. It is the bridge between potentiality and actuality.",
      },

      // ── 9 ── EPIGENETICS ─────────────────────────────────────
      {
        id: "epigenetics-dna",
        num: 9,
        icon: "📝",
        title: "Epigenetics",
        subtitle: "Sticky Notes on Your Code",
        simple: "Your life experiences — like what you eat or how you feel — can leave \"sticky notes\" on your DNA. These notes tell your body to read the code differently. Sometimes, you can even pass these notes down to your children.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A song played on a different instrument; the notes are the same, but the \"feeling\" changes." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of home; a place that changes how you feel the moment you walk in." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The way a meal tastes better when you are happy versus when you are sad." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The \"warmth\" of a hug that lingers even after the person lets go." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A book with highlighted lines; the story is the same, but the highlights show what's important right now." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The way your posture changes when you feel confident versus when you feel shy." },
        ],
        intuition: "How you live your life today changes the \"music\" your DNA plays for generations to come.",
        links: [
          { label: "CDC: Epigenetics", url: "https://www.cdc.gov/genomics/disease/epigenetics.htm" },
          { label: "Nature: Epigenetics", url: "https://www.nature.com/subjects/epigenetics" },
          { label: "What Is Epigenetics?", url: "https://www.whatisepigenetics.com/fundamentals/" },
        ],
        songs: [
          { title: "Cat's in the Cradle", artist: "Harry Chapin", url: "https://www.youtube.com/watch?v=etugj-pS9Yg" },
          { title: "In the End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4" },
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
        ],
        advanced: "Epigenetics represents the \"Uhlmann Fidelity\" between the organism and its environment. It is a non-mutational feedback loop that adjusts the \"Modulator G\" based on external stimuli, allowing rapid adaptation without altering the fundamental core of the genetic sequence.",
      },

      // ── 10 ── NON-CODING "JUNK" DNA ──────────────────────────
      {
        id: "junk-dna",
        num: 10,
        icon: "🌌",
        title: "Non-Coding \"Junk\" DNA",
        subtitle: "The Dark Matter of You",
        simple: "Most of our DNA doesn't seem to do anything at first glance. People used to call it \"junk,\" but now we know it's like the \"dark matter\" of our body — it's a giant mystery that helps control everything else from behind the scenes.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The silence between notes in a song; without the silence, the music wouldn't make sense." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"fresh\" smell of air that isn't any one specific thing but makes everything else smell better." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"texture\" of food that isn't a flavor but makes the eating experience complete." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of the wind; you can't see it or grab it, but it moves everything." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at the night sky and realizing the black space is just as important as the stars." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The \"stillness\" of your body when you are perfectly balanced." },
        ],
        intuition: "The parts of you that you don't understand yet are often the parts that hold everything together.",
        links: [
          { label: "Scientific American: Hidden Treasures in Junk DNA", url: "https://www.scientificamerican.com/article/hidden-treasures-in-junk-dna/" },
          { label: "ENCODE Project", url: "https://www.encodeproject.org/" },
          { label: "New Scientist: Junk DNA", url: "https://www.newscientist.com/definition/junk-dna/" },
        ],
        songs: [
          { title: "Wish You Were Here", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=IXdNnw99-Ic" },
          { title: "Creep", artist: "Radiohead", url: "https://www.youtube.com/watch?v=XFkzRNyygfk" },
          { title: "Orinoco Flow", artist: "Enya", url: "https://www.youtube.com/watch?v=LTrk4PQfyW0" },
        ],
        advanced: "Non-coding DNA constitutes the \"Shared Ignorance Floor\" (G_eps) of the genome. It provides the structural and regulatory context — the \"Redundancy Graph\" — that allows protein-coding regions to function with high reliability. It is the vast, unexplored sea of information that maintains topological stability.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 🌋 EARTH & GEOLOGY (earth)
    // "The planet under your feet — rocks, plates, volcanoes"
    // ═══════════════════════════════════════════════════════════════

    earth: [

      // ── 1 ── PLATE TECTONICS ─────────────────────────────────
      {
        id: "plate-tectonics",
        num: 1,
        icon: "🧩",
        title: "Plate Tectonics",
        subtitle: "The Giant Jigsaw Puzzle",
        simple: "The Earth's skin isn't one solid piece; it's a giant jigsaw puzzle. These puzzle pieces (plates) float on hot, gooey rock. When they move, they bump, slide, or pull apart, making mountains grow and the ground shake. It's the Earth's way of recycling itself.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to the low, rhythmic rumble of a heavy stone sliding across pavement." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sharp, metallic scent of wet rocks or \"petrichor\" after a rain." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A pinch of sea salt — reminding you that the ocean floor is constantly being reborn." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Press your palms together and slide them hard until they \"snap\" forward." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a map and see how South America and Africa fit together like lost friends." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stand still and feel your weight shifting; you are standing on a moving ship." },
        ],
        intuition: "You are not standing on \"dead\" ground. You are riding a slow-moving, living raft that connects every continent into one single, breathing story.",
        links: [
          { label: "National Geographic: Plate Tectonics", url: "https://www.nationalgeographic.org/encyclopedia/plate-tectonics/" },
          { label: "IRIS: Earthquake Science", url: "https://www.iris.edu/hq/inclass/animation/plate_tectonics_subduction_zone" },
          { label: "NOAA: Ocean Floor Mapping", url: "https://oceanexplorer.noaa.gov/facts/plate-tectonics.html" },
        ],
        songs: [
          { title: "I Feel The Earth Move", artist: "Carole King", url: "https://www.youtube.com/watch?v=6913K297T-w" },
          { title: "Under Pressure", artist: "Queen & David Bowie", url: "https://www.youtube.com/watch?v=a01QQZyl-_I" },
          { title: "Shake, Rattle and Roll", artist: "Big Joe Turner", url: "https://www.youtube.com/watch?v=20Feq_Nt3nM" },
        ],
        advanced: "Plate Tectonics is the unifying theory of geology, describing the lithosphere's kinematics driven by mantle convection. It reconciles biogeography (fossil distribution) with physical geography (trench formation and orogeny). This is the Earth's thermal management system — dissipating internal heat while maintaining the geochemical cycles necessary for life. It mirrors Societal Evolution: plates collide to form heights (mountains) or pull apart to create new paths (rifts), just as ideologies clash and merge to shape the topography of culture.",
      },

      // ── 2 ── DEEP TIME ───────────────────────────────────────
      {
        id: "deep-time",
        num: 2,
        icon: "⏳",
        title: "Deep Time",
        subtitle: "4.5 Billion Years of Patience",
        simple: "Earth is very, very, very old — 4.5 billion years! If the Earth's whole life was one single day, humans only showed up in the very last second before midnight. Most of what happens to the Earth happens so slowly we can't see it, like a fingernail growing.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The slow, steady drip of water in a cave, one drop every minute." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The dusty, ancient scent of a very old library book." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Water from a deep well that has been underground for thousands of years." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Run your hand over a smooth river stone that took a million years to polish." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at the stars; the light you see started its journey long before you were born." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and imagine your life as one tiny spark in a giant, endless fire." },
        ],
        intuition: "Your \"now\" is a tiny part of a massive \"forever.\" You are a descendant of billions of years of success.",
        links: [
          { label: "Smithsonian: Geologic Time", url: "https://paleobiology.si.edu/geotime/main/" },
          { label: "The Anthropocene Project", url: "https://www.theanthropocene.org/" },
          { label: "PBS Eons (YouTube)", url: "https://www.youtube.com/c/eons" },
        ],
        songs: [
          { title: "Time", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=JwYX52BP2rk" },
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "Yesterday", artist: "The Beatles", url: "https://www.youtube.com/watch?v=NrgmdOtWgeA" },
        ],
        advanced: "Deep Time (Chronostratigraphy) detaches human perception from geological reality. It utilizes radioactive decay (isochron dating) to establish a terminal baseline for planetary development. It challenges our \"temporal parochialism,\" forcing us to view the Earth as a dynamic equilibrium rather than a static backdrop. It connects to Asymptotic Mathematics: as we look further back, individual events blur into trends, like data points disappearing into a single predictable curve.",
      },

      // ── 3 ── INTERNAL LAYERING ───────────────────────────────
      {
        id: "internal-layers",
        num: 3,
        icon: "🧅",
        title: "Internal Layering",
        subtitle: "Earth Is Like a Giant Peach",
        simple: "Earth is like a giant peach. It has a thin skin (the crust), a thick fruity part (the mantle), and a hard pit in the middle (the core). The middle is so hot it stays liquid, while the very center is a solid ball of metal squeezed tight by the weight of the whole world.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The muffled \"thump-thump\" of your heart, protected deep inside you." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sulfurous, eggy smell near a hot spring." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A hard-boiled egg — feeling the difference between the shell, the white, and the yolk." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Hold a warm stone in your cold hand; feel the heat hiding inside." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a nesting doll (Matryoshka) where one world lives inside another." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel your bones supporting your skin; you are layered too." },
        ],
        intuition: "What you see on the outside is only possible because of the power and heat hidden deep within.",
        links: [
          { label: "NASA: Structure of the Earth", url: "https://science.nasa.gov/earth/structure/" },
          { label: "Geology.com: Earth's Interior", url: "https://geology.com/nsta/earth-internal-structure.shtml" },
          { label: "National Geographic: Core", url: "https://www.nationalgeographic.org/encyclopedia/core/" },
        ],
        songs: [
          { title: "Inner City Blues", artist: "Marvin Gaye", url: "https://www.youtube.com/watch?v=57Ykv1D0qEE" },
          { title: "Heart of Gold", artist: "Neil Young", url: "https://www.youtube.com/watch?v=X3iaR9SAs68" },
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=kBYHwH1Vb-c" },
        ],
        advanced: "Planetary differentiation, driven by gravity and heat, organized Earth into a density-stratified system. The Core-Mantle Boundary (CMB) is a zone of intense thermal and chemical exchange. This internal structure facilitates the magnetosphere and plate tectonics, acting as the planet's primary heat engine. It mirrors Psychology: the crust is the Conscious ego, the mantle the Subconscious, and the core the Primal Unconscious — the hidden heat that drives our visible actions.",
      },

      // ── 4 ── THE ROCK CYCLE ──────────────────────────────────
      {
        id: "rock-cycle",
        num: 4,
        icon: "🔄",
        title: "The Rock Cycle",
        subtitle: "Nothing Is Ever Lost",
        simple: "Rocks never die; they just change shape! A rock can melt into liquid (Igneous), crumble into sand and stick back together (Sedimentary), or get squeezed by heat until it changes completely (Metamorphic). Every rock you find was once something else.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"clack\" of two different rocks hitting each other." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of hot asphalt (like melting lava)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The gritty feel of a tiny grain of sand (weathered rock)." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel the difference between rough sandstone and smooth marble." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a candle melt and then harden again." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stretch your muscles; like rocks, you are being \"reshaped\" by pressure." },
        ],
        intuition: "Nothing is ever truly lost. Everything — including you — is just in a different stage of a beautiful, never-ending change.",
        links: [
          { label: "Annenberg Learner: Rock Cycle", url: "https://www.learner.org/series/interactive-rock-cycle/" },
          { label: "The Geological Society: Rock Cycle", url: "https://www.geolsoc.org.uk/ks3/gsl/education/resources/rockcycle.html" },
          { label: "Mineralogical Society of America", url: "http://www.minsocam.org/msa/collectors_corner/id/rock_key.htm" },
        ],
        songs: [
          { title: "Like a Rolling Stone", artist: "Bob Dylan", url: "https://www.youtube.com/watch?v=g1S5ITDTzno" },
          { title: "Solid", artist: "Ashford & Simpson", url: "https://www.youtube.com/watch?v=9_pP86o92kc" },
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=xMQ0Ryy01yE" },
        ],
        advanced: "The Rock Cycle represents the lithospheric manifestation of the Law of Conservation of Mass. Through subduction, lithification, and metamorphism, the crust undergoes constant chemical and textural re-equilibration. It is a closed-loop system powered by both internal (geothermal) and external (solar/tidal) energy. It connects to Reincarnation and Continuity: the \"form\" is temporary, but the \"substance\" is eternal.",
      },

      // ── 5 ── HYDROLOGICAL CYCLE ──────────────────────────────
      {
        id: "water-cycle",
        num: 5,
        icon: "💧",
        title: "Hydrological Cycle",
        subtitle: "Dinosaur Bath Water",
        simple: "The Earth drinks the same water over and over. Water travels from the ocean to the sky, turns into clouds, falls as rain, and flows back to the sea. The water you drank today might have been part of a dinosaur's bath millions of years ago!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The peaceful sound of a bubbling brook or rain hitting a window." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The fresh, clean scent of the air after a thunderstorm (ozone)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A cold glass of water — taste the \"life\" in it." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Dip your hand in a bowl of water and watch it disappear (evaporate)." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch steam rise from a hot cup of cocoa." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel the sweat on your skin cooling you down; you are part of the cycle." },
        ],
        intuition: "You are physically connected to every ocean, every cloud, and every living thing through the water that flows through us all.",
        links: [
          { label: "USGS: The Water Cycle", url: "https://www.usgs.gov/special-topics/water-science-school/science/fundamentals-water-cycle" },
          { label: "NASA Earth Observatory: Water Cycle", url: "https://earthobservatory.nasa.gov/features/Water" },
          { label: "UN Water: The Cycle", url: "https://www.unwater.org/water-facts/water-cycle" },
        ],
        songs: [
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsWw" },
          { title: "Purple Rain", artist: "Prince", url: "https://www.youtube.com/watch?v=TvnYmWpD_T8" },
          { title: "Waterfalls", artist: "TLC", url: "https://www.youtube.com/watch?v=8WEtxJ4-sh4" },
        ],
        advanced: "The Hydrological Cycle is the planet's primary thermoregulatory and erosive mechanism. It involves phase changes (solid, liquid, gas) that facilitate latent heat transfer across latitudes. This cycle is the \"connective tissue\" between the atmosphere, hydrosphere, and lithosphere, driving global climate and nutrient transport. It connects to Economics: value, like water, must flow to sustain the system; stagnation in either leads to the death of the local environment.",
      },

      // ── 6 ── MANTLE CONVECTION ───────────────────────────────
      {
        id: "mantle-convection",
        num: 6,
        icon: "♨️",
        title: "Mantle Convection",
        subtitle: "The Engine Below",
        simple: "Inside the Earth, hot rock acts like boiling soup. The hot parts rise up, cool down, and then sink back down. This \"circular\" motion is the engine that pushes the giant tectonic plates around on the surface.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The low \"glub-glub\" of a thick pot of oatmeal simmering." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of steam rising from a hot pavement." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A warm soup that is hot at the bottom and cooler on top." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Hold your hand above a heater and feel the warm air rising (convection)." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch the \"lava\" move up and down inside a lava lamp." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel the heat rising from your body after you run fast." },
        ],
        intuition: "Deep, invisible forces are the reason the world looks the way it does on the outside.",
        links: [
          { label: "National Geographic: Mantle", url: "https://www.nationalgeographic.org/encyclopedia/mantle/" },
          { label: "ScienceDirect: Mantle Dynamics", url: "https://www.sciencedirect.com/topics/earth-and-planetary-sciences/mantle-convection" },
          { label: "Education Perfect: Mantle Convection", url: "https://www.youtube.com/watch?v=MmS6_S_x6O4" },
        ],
        songs: [
          { title: "Great Balls of Fire", artist: "Jerry Lee Lewis", url: "https://www.youtube.com/watch?v=7IjgZGhHrYY" },
          { title: "Burnin' For You", artist: "Blue Öyster Cult", url: "https://www.youtube.com/watch?v=kn-8n4_YnN0" },
          { title: "Ring of Fire", artist: "Johnny Cash", url: "https://www.youtube.com/watch?v=It7107ELQvY" },
        ],
        advanced: "Mantle Convection is a Rayleigh-Bénard instability on a planetary scale. It is the process by which Earth sheds its primordial and radiogenic heat. The viscosity of the mantle allows for plastic flow over geological timescales, creating the advection currents that drive plate kinematics and volcanic hotspots. It mirrors Grassroots Movements: small, \"hot\" ideas at the bottom of a hierarchy rise, circulate, and eventually move the massive \"plates\" of established law.",
      },

      // ── 7 ── MAGNETIC FIELD GENERATION ───────────────────────
      {
        id: "magnetic-field",
        num: 7,
        icon: "🧲",
        title: "Magnetic Field Generation",
        subtitle: "Earth's Invisible Shield",
        simple: "Earth is a giant magnet! Deep inside, swirling liquid metal creates an invisible shield. This shield protects us from the sun's \"solar wind\" which would otherwise blow away our air. Without this magnet, we couldn't breathe.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The static \"crackle\" on a radio." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"electric\" smell near a large battery or a copy machine." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The tingle of a 9-volt battery on your tongue — imagine the \"zing.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel the \"push\" and \"pull\" of two magnets resisting each other." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a compass needle always pointing North." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel the gravity pulling you down; now imagine a \"pull\" protecting you from above." },
        ],
        intuition: "You are being protected by a silent, invisible force field every single second of your life.",
        links: [
          { label: "NASA: Earth's Magnetosphere", url: "https://science.nasa.gov/heliophysics/focus-areas/magnetosphere/" },
          { label: "ESA: The Magnetic Earth", url: "https://www.esa.int/Applications/Observing_the_Earth/FutureEO/Swarm/The_magnetic_Earth" },
          { label: "National Ocean Service: Magnetic Pole", url: "https://oceanservice.noaa.gov/facts/magnetic.html" },
        ],
        songs: [
          { title: "You Got The Love", artist: "Candi Staton", url: "https://www.youtube.com/watch?v=H73S8yD53m4" },
          { title: "Electric Avenue", artist: "Eddy Grant", url: "https://www.youtube.com/watch?v=vtPk5IUbdH0" },
          { title: "Magnetic", artist: "Earth, Wind & Fire", url: "https://www.youtube.com/watch?v=J_6_0LhP-p4" },
        ],
        advanced: "The \"Geodynamo\" is generated by the helical motion of molten iron in the outer core, driven by Coriolis forces and convection. This creates a dipolar magnetic field that deflects ionizing solar radiation. This magnetohydrodynamic process is essential for atmospheric retention and the shielding of biological DNA from cosmic rays. It connects to Integrity and Character: your \"inner core\" (values) creates an invisible field (reputation) that protects you from external storms.",
      },

      // ── 8 ── PRINCIPLES OF STRATIGRAPHY ──────────────────────
      {
        id: "stratigraphy",
        num: 8,
        icon: "📖",
        title: "Principles of Stratigraphy",
        subtitle: "Earth's History Book",
        simple: "Rocks are like a giant history book. The oldest stories are at the bottom, and the newest stories are at the top. By looking at the layers, we can \"read\" what happened millions of years ago, like who lived there and what the weather was like.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"thud\" of a heavy book closing." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The damp, earthy smell of a freshly dug hole in the ground." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A multi-layered cake — tasting each flavor as you go down." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Run your fingers over the ridges of a stack of papers." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a tall canyon with different colored stripes of rock." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Think of your own memories; the oldest ones are \"buried\" deepest." },
        ],
        intuition: "The ground you walk on is a library. Every layer is a page waiting to be read.",
        links: [
          { label: "British Geological Survey: Stratigraphy", url: "https://www.bgs.ac.uk/discovering-geology/fossils-and-geological-time/stratigraphy/" },
          { label: "Grand Canyon: Layers of Time", url: "https://www.nps.gov/grca/learn/nature/geologicformations.htm" },
          { label: "Digital Encyclopedia of Ancient Life", url: "https://www.digitalatlasofancientlife.org/learn/stratigraphy/" },
        ],
        songs: [
          { title: "Landslide", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=WM7-PYtXtJM" },
          { title: "Levels", artist: "Avicii", url: "https://www.youtube.com/watch?v=_ovdm2yX4MA" },
          { title: "The Story", artist: "Brandi Carlile", url: "https://www.youtube.com/watch?v=o8pQLtGz_xM" },
        ],
        advanced: "Stratigraphy relies on the Principle of Superposition and Faunal Succession to establish relative chronologies. It is the spatial representation of temporal events. Through correlation, geologists synchronize disparate rock units across continents, reconstructing the paleogeography and paleoecology of the past. It connects to Archetypal Psychology: just as Earth layers its history, the human mind layers its experiences, where foundational childhood layers dictate the surface landscape of adulthood.",
      },

      // ── 9 ── ISOSTASY ────────────────────────────────────────
      {
        id: "isostasy",
        num: 9,
        icon: "⚖️",
        title: "Isostasy",
        subtitle: "The Earth's Perfect Balance",
        simple: "The Earth's crust \"floats\" on the mantle like a boat on water. If you put something heavy on it (like a giant ice sheet), the crust sinks. If the ice melts, the crust slowly pops back up! It's all about finding a perfect balance.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"creak\" of a wooden floor when you step on it." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The fresh, salty air of a floating dock." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A marshmallow floating in hot chocolate — press it down and watch it rise." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Push a sponge into a bowl of water and feel it push back." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a boat sink a little deeper when people climb on board." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel your feet sink into a soft mattress and then the mattress rise when you get up." },
        ],
        intuition: "Everything in nature is constantly trying to find a peaceful balance. Even the giant mountains are \"floating\" in a perfect spot.",
        links: [
          { label: "Britannica: Isostasy", url: "https://www.britannica.com/science/isostasy-geology" },
          { label: "Post-Glacial Rebound", url: "https://www.universetoday.com/142345/the-earth-is-still-rebounding-from-the-last-ice-age/" },
          { label: "Phys.org: Crustal Balance", url: "https://phys.org/news/2021-09-earth-crust-isostatic-rebound.html" },
        ],
        songs: [
          { title: "Balance", artist: "Sara Bareilles", url: "https://www.youtube.com/watch?v=rEInXfDscXw" },
          { title: "The Weight", artist: "The Band", url: "https://www.youtube.com/watch?v=sjCw3-YjkU0" },
          { title: "Upside Down", artist: "Diana Ross", url: "https://www.youtube.com/watch?v=GIAtE6LbbM4" },
        ],
        advanced: "Isostasy is the state of gravitational equilibrium between the lithosphere and asthenosphere. It follows Archimedes' Principle: the crust floats at an elevation dependent on its thickness and density. This explains Post-Glacial Rebound, where landmasses continue to rise thousands of years after ice sheets melted. It mirrors Personal Resilience: when heavy burdens are placed on us we sink; when they are removed, we have an innate \"isostatic\" ability to rebound to our true level.",
      },

      // ── 10 ── HOTSPOT VOLCANISM ──────────────────────────────
      {
        id: "hotspot-volcanism",
        num: 10,
        icon: "🌋",
        title: "Hotspot Volcanism",
        subtitle: "The Steady Flame Below",
        simple: "Most volcanoes happen where plates meet, but some come from a \"hot spot\" deep underground that stays in one place. As the plate moves over the hot spot, it creates a chain of islands, like Hawaii. It's like moving a piece of paper over a steady candle flame.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"hiss\" of steam escaping a tea kettle." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smoky, burnt smell of a campfire." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A spicy chili pepper — a \"hot spot\" on your tongue!" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel the warmth of a heating pad in one specific spot on your back." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a line of bubbles rising in a glass of soda." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Imagine walking across a hot beach; you keep moving, but the heat stays in the sand." },
        ],
        intuition: "Even when everything else is moving, there are steady \"sources\" of power that stay exactly where they are to create something new.",
        links: [
          { label: "USGS: Hawaii Hotspot", url: "https://www.usgs.gov/observatories/hvo/how-volcanoes-work" },
          { label: "National Geographic: Hotspots", url: "https://www.nationalgeographic.org/encyclopedia/hot-spot/" },
          { label: "UNESCO: Volcanoes of the World", url: "https://whc.unesco.org/en/list/234" },
        ],
        songs: [
          { title: "Hot Stuff", artist: "Donna Summer", url: "https://www.youtube.com/watch?v=1IdEhvuNxV8" },
          { title: "Island in the Sun", artist: "Weezer", url: "https://www.youtube.com/watch?v=0C3zgYW_FAM" },
          { title: "Firework", artist: "Katy Perry", url: "https://www.youtube.com/watch?v=QGJuMBdaqIw" },
        ],
        advanced: "Hotspot Volcanism (Mantle Plumes) provides a \"fixed\" reference frame for plate motion. Unlike boundary volcanism, hotspots are intraplate phenomena. They create volcanic \"age-progressive\" chains (like the Hawaiian-Emperor seamount chain), allowing geologists to calculate the absolute velocity and direction of tectonic plates over millions of years. Certain people act as \"hotspots\" in history — they stay fixed in their truth while the plate of humanity moves over them, creating chains of new ideas and islands of progress.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔬 SCIENCE (rock) → 🔭 ASTRONOMY & COSMOS (cosmos)
    // "What's out there beyond the sky"
    // ═══════════════════════════════════════════════════════════════

    cosmos: [

      // ── 1 ── THE EXPANSION OF THE UNIVERSE ───────────────────
      {
        id: "universe-expansion",
        num: 1,
        icon: "🎈",
        title: "The Expansion of the Universe",
        subtitle: "The Balloon That Never Stops",
        simple: "Imagine the universe is a giant balloon that someone is blowing air into. Galaxies are like tiny dots drawn on that balloon. As the balloon grows, the dots don't move across the rubber; the rubber itself is stretching, pulling every dot away from every other dot.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a siren pass you by. The pitch drops as it moves away. This \"stretching\" of sound is exactly how light stretches as galaxies fly apart." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of rain on hot pavement (Petrichor). It spreads through the air just like energy spreads through growing space." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Pop Rocks candy. Feel the tiny explosions expanding and pushing outward in your mouth." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pull a thick rubber band slowly. Feel the tension as the distance between two points grows without you moving your fingers." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a loaf of raisin bread rising in the oven. The raisins move apart because the dough between them is expanding." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and slowly move your hands away from your chest. Feel the \"space\" between your palms getting larger." },
        ],
        intuition: "You are not a static point; you are part of a grand unfolding. You are the breath inside the balloon, expanding with everything else.",
        links: [
          { label: "NASA: Dark Energy & Expansion", url: "https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy" },
          { label: "ESA: Hubble's Law", url: "https://www.esa.int/Science_Exploration/Space_Science/What_is_the_expansion_of_the_Universe" },
          { label: "Britannica: Hubble's Law", url: "https://www.britannica.com/science/Hubbles-law" },
        ],
        songs: [
          { title: "Don't Stop Me Now", artist: "Queen", url: "https://www.youtube.com/watch?v=HgzGwKwLmgM" },
          { title: "Spaceman", artist: "The Killers", url: "https://www.youtube.com/watch?v=Hc16Y9fi_pa" },
          { title: "Sky Full of Stars", artist: "Coldplay", url: "https://www.youtube.com/watch?v=VPRjCeUtgv4" },
        ],
        advanced: "The metric expansion of space is a fundamental consequence of General Relativity, characterized by the Hubble-Lemaître Law where recession velocity is proportional to distance. Confirmed by Redshift, where light waves from distant sources stretch into longer, redder wavelengths. This connects the physical Void to infinite potential — the \"We\" is not a fixed container but a continuous process of becoming.",
      },

      // ── 2 ── STELLAR EVOLUTION & NUCLEOSYNTHESIS ─────────────
      {
        id: "stellar-nucleosynthesis",
        num: 2,
        icon: "🍳",
        title: "Stellar Evolution & Nucleosynthesis",
        subtitle: "The Cosmic Kitchen",
        simple: "Stars are like cosmic kitchens. They cook tiny pieces of gas (Hydrogen) into bigger pieces (Carbon, Oxygen, Gold). When a star finishes cooking and explodes, it throws all that \"food\" into space. Every bit of you — your bones, your breath, your jewelry — was once cooked inside a star.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The crackle of a campfire. It is the sound of stored \"sunlight\" being released." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The metallic scent of a copper penny. That metal was forged in a dying star." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The salt in your food. Stars made the sodium and chlorine atoms that give you flavor." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Hold a piece of iron or a heavy rock. Feel the weight of atoms created in a supernova." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at your own hand. You are looking at organized stardust." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel the warmth of your own blood. The iron in your veins makes it red, and that iron came from the heart of a giant star." },
        ],
        intuition: "You are a living library of the stars. Every sense you have is powered by the debris of ancient suns.",
        links: [
          { label: "National Geographic: Life Cycle of a Star", url: "https://www.nationalgeographic.com/science/article/stars" },
          { label: "NASA: We Are Stardust", url: "https://www.nasa.gov/image-article/we-are-stardust/" },
          { label: "Scientific American: Origin of Elements", url: "https://www.scientificamerican.com/article/where-did-the-elements-come-from/" },
        ],
        songs: [
          { title: "We Are All Made Of Stars", artist: "Moby", url: "https://www.youtube.com/watch?v=x1rFAayDEn8" },
          { title: "Woodstock", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=q6H_XF7at_Y" },
          { title: "Starman", artist: "David Bowie", url: "https://www.youtube.com/watch?v=sI66hcu9fIs" },
        ],
        advanced: "Nucleosynthesis describes nuclear reactions creating new atomic nuclei. High-mass stars fuse elements up to Iron; heavier elements (Gold, Uranium) are synthesized during r-process events like Supernovae or Neutron star collisions. This bridges Biology and Astrophysics, confirming the ancestry of the human race is literally recorded in the periodic table.",
      },

      // ── 3 ── THE BIG BANG THEORY ─────────────────────────────
      {
        id: "big-bang",
        num: 3,
        icon: "🌱",
        title: "The Big Bang Theory",
        subtitle: "The Seed of Everything",
        simple: "A long time ago, the whole universe was squeezed into a tiny, hot seed. Suddenly, that seed started to grow very, very fast. It wasn't an explosion in space; it was the start of space itself. Everything we see today grew from that one tiny moment.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Static on an old radio or TV between stations. A tiny part of that \"hiss\" is actually the echo of the Big Bang." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a freshly struck match. It reminds us of the intense heat and the sudden beginning of fire." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Plain water. The Hydrogen in that water was created in the very first minutes of the universe." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Touch a warm radiator. The universe began with heat that has been cooling down for billions of years." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a deep-sky photo. You are looking back in time toward the beginning." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Sit very still. Realize that you are moving through time, which began at that single point." },
        ],
        intuition: "You are the current \"now\" of a story that started 13.8 billion years ago. You are the tip of a very long branch.",
        links: [
          { label: "NASA: What is the Big Bang?", url: "https://spaceplace.nasa.gov/big-bang/en/" },
          { label: "CERN: The Early Universe", url: "https://home.cern/science/physics/early-universe" },
          { label: "Space.com: Big Bang Evidence", url: "https://www.space.com/25126-big-bang-theory.html" },
        ],
        songs: [
          { title: "Big Bang Theory Theme", artist: "Barenaked Ladies", url: "https://www.youtube.com/watch?v=E_WviT6H0fo" },
          { title: "Time", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=JwYX52BP2Sk" },
          { title: "On Top of the World", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=w5tWYmIqpUo" },
        ],
        advanced: "The Lambda-CDM model posits the universe began from extremely high density and temperature. Empirically validated by the Cosmic Microwave Background (CMB) radiation and the primordial abundance of light elements (H, He, Li). This aligns with philosophical \"First Cause\" arguments, suggesting a singular, unified origin for all disparate phenomena.",
      },

      // ── 4 ── GRAVITATIONAL INTERACTION & GENERAL RELATIVITY ──
      {
        id: "gravity-relativity",
        num: 4,
        icon: "🕸️",
        title: "Gravity & General Relativity",
        subtitle: "The Trampoline of Space-Time",
        simple: "Imagine putting a bowling ball on a trampoline. It makes a dip. If you roll a marble nearby, it will curve into that dip. Planets and stars do the same thing to \"Space-Time.\" Gravity isn't a magnet; it's just things rolling down the curves made by heavy objects.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A heavy bass note that vibrates your chest. You feel the \"weight\" of the sound pulling on you." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The heavy, thick scent of pine sap. It feels \"weighted\" and sticky, like gravity holding things together." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Honey. It is thick and slow, moving only when the curve is steep enough." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Lean against a wall. Feel the Earth's mass curving space, pulling you against the surface." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch water swirl down a drain. It is following the curve of the bowl, just like a planet orbits a star." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Jump up and feel the \"tug\" bringing you back down. That is you following a curve in the fabric of the world." },
        ],
        intuition: "You are always \"falling\" toward the heart of the world, held safely by the invisible curves of the universe.",
        links: [
          { label: "NASA: What is Gravity?", url: "https://spaceplace.nasa.gov/what-is-gravity/en/" },
          { label: "Einstein Online: General Relativity", url: "https://www.einstein-online.info/en/category/elementary/general-relativity-elementary/" },
          { label: "LIGO: Gravitational Waves", url: "https://www.ligo.caltech.edu/page/what-are-gw" },
        ],
        songs: [
          { title: "Gravity", artist: "John Mayer", url: "https://www.youtube.com/watch?v=7vb9R0wJ28M" },
          { title: "Gravity", artist: "Sara Bareilles", url: "https://www.youtube.com/watch?v=rEXhAMtbaec" },
          { title: "Higher Ground", artist: "Stevie Wonder", url: "https://www.youtube.com/watch?v=4wZ3ZG_Wams" },
        ],
        advanced: "General Relativity replaces the Newtonian force with geometry of a four-dimensional manifold. Mass-energy tells space-time how to curve; space-time tells mass-energy how to move — expressed in the Einstein Field Equations. This transforms our understanding of \"influence\": presence alone alters the environment for everyone else.",
      },

      // ── 5 ── EXOPLANETARY SYSTEMS ────────────────────────────
      {
        id: "exoplanets",
        num: 5,
        icon: "🏡",
        title: "Exoplanetary Systems",
        subtitle: "Billions of Other Homes",
        simple: "For a long time, we thought our sun was the only one with planets. Now we know almost every star in the sky is a \"parent\" to its own family of worlds. There are billions of other earths, deserts, and ice worlds out there. We live in a universe full of homes.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A distant choir. You might only hear one voice clearly, but you know there are hundreds of others singing the same song." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a distant forest on the wind. You can't see the trees, but you know they are there." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A variety pack of fruit. Different flavors, but all are \"fruit\" — just like different planets are all \"worlds.\"" },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Run your hand over different textures — sand, grass, wood. These are the \"skins\" of different types of planets." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a city at night from a distance. Every light is a different house where someone lives." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stand in a crowd. Feel the \"presence\" of many other bodies around you, even if you aren't touching them." },
        ],
        intuition: "You are not alone in the dark. The sky is crowded with neighborhoods you haven't visited yet.",
        links: [
          { label: "NASA Exoplanet Archive", url: "https://exoplanetarchive.ipac.caltech.edu/" },
          { label: "The Planetary Society: Exoplanets", url: "https://www.planetary.org/space-images/exoplanets" },
          { label: "Hubble: Finding Exoplanets", url: "https://hubblesite.org/science/exoplanets" },
        ],
        songs: [
          { title: "Walking On The Moon", artist: "The Police", url: "https://www.youtube.com/watch?v=zPwMdZOl_wM" },
          { title: "Orinoco Flow", artist: "Enya", url: "https://www.youtube.com/watch?v=LTrk4n9WAFM" },
          { title: "Man On The Moon", artist: "R.E.M.", url: "https://www.youtube.com/watch?v=1hKSYgOGtos" },
        ],
        advanced: "Over 5,000 confirmed exoplanets discovered via Transit Method and Radial Velocity measurements have shifted the Copernican Principle from \"Earth is not the center\" to \"The Solar System is a standard model.\" This reinforces the concept of Plenitude — if something can happen here, it is likely happening everywhere.",
      },

      // ── 6 ── THE EXISTENCE OF BLACK HOLES ────────────────────
      {
        id: "black-holes",
        num: 6,
        icon: "🕳️",
        title: "The Existence of Black Holes",
        subtitle: "The Cosmic Trapdoor",
        simple: "A black hole is a place where so much stuff is packed into a tiny space that its \"tug\" is the strongest in the universe. It's like a cosmic trapdoor. If you get too close, even light — the fastest thing ever — can't get out.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A deep, silent pause in a song that makes you hold your breath." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a deep basement or cave — cool, heavy, and mysterious." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Extremely dark chocolate. Intense, concentrated, and takes over your whole mouth." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "A very strong magnet pulling on a metal toy in your hand. Feel the invisible \"must-go\" force." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a shadow on a bright sunny day. The shadow is only there because something is blocking the light." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Spin around until you feel dizzy and \"pulled\" toward the floor." },
        ],
        intuition: "There are mysteries so deep they swallow the light, yet they hold the centers of galaxies together.",
        links: [
          { label: "Event Horizon Telescope", url: "https://eventhorizontelescope.org/" },
          { label: "NASA: Black Holes", url: "https://science.nasa.gov/universe/black-holes/" },
          { label: "National Geographic: Black Holes Explained", url: "https://www.nationalgeographic.com/science/article/black-holes" },
        ],
        songs: [
          { title: "Black Hole Sun", artist: "Soundgarden", url: "https://www.youtube.com/watch?v=3mbBbFH9fAg" },
          { title: "Supermassive Black Hole", artist: "Muse", url: "https://www.youtube.com/watch?v=Xsp3_a-PMTw" },
          { title: "Paint It, Black", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=O4irXQhgMqg" },
        ],
        advanced: "Black holes are solutions to Einstein's field equations where space-time curvature becomes infinite (a singularity), defined by an Event Horizon beyond which escape velocity exceeds the speed of light. They represent the \"Limit of Knowledge\" — where our current math breaks down, inviting humble recognition of the Unknowable.",
      },

      // ── 7 ── DARK MATTER ─────────────────────────────────────
      {
        id: "dark-matter",
        num: 7,
        icon: "👻",
        title: "Dark Matter",
        subtitle: "The Invisible Glue",
        simple: "Imagine watching a merry-go-round spin really fast. Usually, the kids would fly off, but they stay on because they are holding invisible ropes. Dark matter is like those invisible ropes. We can't see it, smell it, or touch it, but it's the \"glue\" that keeps galaxies from flying apart.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The wind whistling through trees. You can't see the air, but you hear what it does to the leaves." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Fresh air. You can't see it, but you know it's filling your lungs." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"fizz\" in sparkling water. You can't see the bubbles easily, but you feel their effect on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Moving your hand through water. You feel the resistance even if the water is perfectly clear." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a spiderweb in the dark. You only see it when a tiny bit of dew or light catches it, but it was there the whole time." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Walk through a dark room. You \"feel\" the presence of furniture before you bump into it." },
        ],
        intuition: "Most of the universe is hidden from our eyes, but it is still holding us in its arms.",
        links: [
          { label: "CERN: Dark Matter", url: "https://home.cern/science/physics/dark-matter" },
          { label: "NASA: Dark Matter & Dark Energy", url: "https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy" },
          { label: "Hubble: Dark Matter Map", url: "https://hubblesite.org/contents/articles/dark-matter" },
        ],
        songs: [
          { title: "In The End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" },
        ],
        advanced: "Dark Matter is hypothesized matter that does not interact with the electromagnetic spectrum but exerts gravitational influence. Evidence includes galactic rotation curves and gravitational lensing. It constitutes roughly 27% of the universe's mass-energy content. It teaches us that Reality is not synonymous with Visibility — the \"We\" includes the unseen.",
      },

      // ── 8 ── THE COSMIC WEB ──────────────────────────────────
      {
        id: "cosmic-web",
        num: 8,
        icon: "🕸️",
        title: "The Cosmic Web",
        subtitle: "The Universe's Neural Network",
        simple: "The universe isn't just a messy pile of stars. It looks like a giant, glowing spiderweb or the connections inside your brain. Galaxies live along the \"silks\" of this web, and where the silks cross, big cities of galaxies form. Everything is connected by invisible threads.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A harmony where many different voices blend into one big beautiful chord." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a garden where many different flowers create one \"scent.\"" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Soup with many ingredients. You taste the carrot and the broth, but they are all part of one meal." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Touching a knitted sweater. Feel how every thread is looped into every other thread." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a map of city lights from a plane. See how the roads connect the bright spots." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Hold hands in a circle. Feel the connection traveling from person to person." },
        ],
        intuition: "You are a single point on a web that stretches across forever. If you move, the whole web feels it.",
        links: [
          { label: "Scientific American: The Cosmic Web", url: "https://www.scientificamerican.com/article/the-cosmic-web-is-the-largest-structure-in-the-universe/" },
          { label: "Max Planck Institute: Large Scale Structure", url: "https://www.mpa-garching.mpg.de/447231/Cosmic_Web" },
          { label: "SDSS: Mapping the Universe", url: "https://www.sdss.org/science/large-scale-structure/" },
        ],
        songs: [
          { title: "What A Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=CWzrABouyeE" },
          { title: "Come Together", artist: "The Beatles", url: "https://www.youtube.com/watch?v=45cYwms990A" },
          { title: "One", artist: "U2", url: "https://www.youtube.com/watch?v=ftjEcrrf7r0" },
        ],
        advanced: "The Large-Scale Structure of the universe is shaped by gravitational collapse of primordial density fluctuations. Cold Dark Matter acts as the scaffolding for this \"web,\" while baryonic matter flows toward the nodes. This mirrors the \"As Above, So Below\" philosophy — the structure of the cosmos reflects the neural pathways of the mind.",
      },

      // ── 9 ── DARK ENERGY ─────────────────────────────────────
      {
        id: "dark-energy",
        num: 9,
        icon: "🌬️",
        title: "Dark Energy",
        subtitle: "The Mystery Wind",
        simple: "Dark energy is like a mystery wind that is pushing everything apart faster and faster. While gravity tries to pull things together, dark energy is the \"anti-gravity\" that wants the universe to grow forever. It is the most powerful thing in the cosmos, but we don't know what it is yet!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"whoosh\" of a fast car passing by that keeps going until it disappears." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of the ocean breeze. It feels like it comes from everywhere and nowhere." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Peppermint. It feels like it's \"expanding\" or cooling your whole mouth at once." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pushing two magnets together the \"wrong\" way so they shove each other apart." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a cloud dissipate and grow thinner until it fills the whole sky." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Imagine you are floating in a pool and slowly drifting away from your friends without swimming." },
        ],
        intuition: "There is a gentle but unstoppable force ensuring that the story of the universe keeps getting bigger.",
        links: [
          { label: "NASA: Dark Energy Explained", url: "https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy" },
          { label: "National Geographic: Dark Energy", url: "https://www.nationalgeographic.com/science/article/dark-energy" },
          { label: "Space.com: What is Dark Energy?", url: "https://www.space.com/20929-dark-energy.html" },
        ],
        songs: [
          { title: "Spirits In The Material World", artist: "The Police", url: "https://www.youtube.com/watch?v=BHOevX4DlGk" },
          { title: "Cosmic Love", artist: "Florence + The Machine", url: "https://www.youtube.com/watch?v=2EIeUlvHAiM" },
          { title: "Everything In Its Right Place", artist: "Radiohead", url: "https://www.youtube.com/watch?v=NUnXxh5U25Y" },
        ],
        advanced: "Dark Energy is the best-fit explanation for the observed accelerated expansion of the universe (Type Ia Supernovae observations). Often modeled as the Cosmological Constant or vacuum energy density that remains constant as space expands. It represents \"The Infinite Breath\" — the underlying pressure that prevents the universe from collapsing in on itself.",
      },

      // ── 10 ── THE MULTIVERSE HYPOTHESIS ──────────────────────
      {
        id: "multiverse",
        num: 10,
        icon: "📚",
        title: "The Multiverse Hypothesis",
        subtitle: "One Page in an Infinite Book",
        simple: "Imagine our universe is just one page in a giant book. There might be millions of other pages, each with its own story, its own stars, and maybe even another \"you\" who ate a different breakfast today. We can't see the other pages, but the \"Book\" might be huge!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A busy playground. You hear your own game, but you also hear dozens of other games happening at the same time." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A spice rack. Many different smells in separate jars, all in one kitchen." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A box of assorted donuts. Each one is a different \"world\" of flavor." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "A handful of marbles. Each one is a separate round world in your palm." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking into two mirrors facing each other. You see \"you\" going on forever into different rooms." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling like you could have turned left instead of right. The \"what if\" feeling." },
        ],
        intuition: "You are a unique version of a story that might be being told in a thousand different ways.",
        links: [
          { label: "Scientific American: Does the Multiverse Exist?", url: "https://www.scientificamerican.com/article/multiverse-the-case-for-parallel-universes/" },
          { label: "Space.com: Parallel Universes", url: "https://www.space.com/32728-parallel-universes.html" },
          { label: "Britannica: Multiverse", url: "https://www.britannica.com/science/multiverse" },
        ],
        songs: [
          { title: "Across The Universe", artist: "The Beatles", url: "https://www.youtube.com/watch?v=90M60KAxW_Y" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Alive and Kicking", artist: "Simple Minds", url: "https://www.youtube.com/watch?v=ljIQo1OHkTI" },
        ],
        advanced: "The Multiverse is a theoretical framework arising from Eternal Inflation or the Many-Worlds Interpretation of quantum mechanics. It suggests our observable universe is a \"bubble\" within a potentially infinite landscape of varied physical constants. This is the ultimate Open System — existence is not a closed loop but an infinite tapestry of becoming.",
      },

    ],
  },

  // ╔═══════════════════════════════════════════════════════════════╗
  // ║  🔢 MATHEMATICS (promise)                                    ║
  // ║  "What is the hidden structure beneath all things?"           ║
  // ╚═══════════════════════════════════════════════════════════════╝

  promise: {

    // ═══════════════════════════════════════════════════════════════
    // 🔢 MATHEMATICS (promise) → 🔢 ARITHMETIC & NUMBER (number)
    // "Counting, adding, subtracting — the first language humans ever shared"
    // ═══════════════════════════════════════════════════════════════

    number: [

      // ── 1 ── UNITY (THE NUMBER ONE) ──────────────────────────
      {
        id: "unity",
        num: 1,
        icon: "⚪",
        title: "Unity (The Number One)",
        subtitle: "The Circle That Starts Everything",
        simple: "Numbers start with one, and one is the most important part of everything. Think of a single seed that holds the plan for a whole forest or one drop of water that is part of the giant ocean. When you see the number one, it reminds you that even though there are billions of people, we are all part of one big human family. You are a \"one,\" and without you, the count would be incomplete.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A single, clear bell strike ringing in a silent room." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a single, fresh-cut orange." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "One grain of pure sea salt on the tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pressing your thumb against your index finger." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A single candle burning in a dark hall." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Standing perfectly still on one leg, finding your center." },
        ],
        intuition: "That \"aha\" moment when you realize you aren't separate from the world, but a vital piece of it.",
        links: [
          { label: "Wolfram MathWorld: Unity", url: "https://mathworld.wolfram.com/Unity.html" },
          { label: "Britannica: Number Symbolism", url: "https://www.britannica.com/topic/number-symbolism" },
          { label: "Wikipedia: Monad (Philosophy)", url: "https://en.wikipedia.org/wiki/Monad_(philosophy)" },
        ],
        songs: [
          { title: "One", artist: "Three Dog Night", url: "https://www.youtube.com/watch?v=d5ab8BOu4LE" },
          { title: "One", artist: "U2", url: "https://www.youtube.com/watch?v=ftjEcrrf7r0" },
          { title: "The 1", artist: "Taylor Swift", url: "https://www.youtube.com/watch?v=HOap05N0ZYk" },
        ],
        advanced: "In mathematics, unity refers to the identity element under multiplication — the only number that, when multiplied by any other number, leaves it unchanged, acting as the \"mirror\" of the numerical realm. In quantum mechanics, the normalization condition requires the sum of probabilities to equal one, ensuring a closed, consistent system of existence. This connects to the philosophical Monad, suggesting all complexity is an unfolding of a singular, underlying source.",
      },

      // ── 2 ── BINARY (POLARITY) ───────────────────────────────
      {
        id: "binary-polarity",
        num: 2,
        icon: "☯️",
        title: "Binary (Polarity)",
        subtitle: "The Language of Yes and No",
        simple: "Binary is the language of \"yes\" and \"no,\" or \"on\" and \"off.\" It is like a light switch that can only be in two spots, but by flipping it fast enough, you can create a whole computer world. In life, we see this as day and night, hot and cold, or happy and sad. You need both sides to understand the whole story, just like a coin needs two sides to be worth something.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Two sticks clicking together in a steady beat." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The contrast between sweet vanilla and sharp vinegar." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating something sour, then something sweet." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling something ice cold with one hand and warm with the other." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a black-and-white checkerboard." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Shifting your weight from your left foot to your right foot." },
        ],
        intuition: "Sensing the balance between your \"inner\" thoughts and the \"outer\" world.",
        links: [
          { label: "Computer Hope: Binary", url: "https://www.computerhope.com/jargon/b/binary.htm" },
          { label: "Stanford Encyclopedia: Yin-Yang", url: "https://plato.stanford.edu/entries/chinese-phil-yinyang/" },
          { label: "Math is Fun: Binary Numbers", url: "https://www.mathsisfun.com/binary-number-system.html" },
        ],
        songs: [
          { title: "Side 2", artist: "Dressy Bessy", url: "https://www.youtube.com/watch?v=qXkxMOVKa2U" },
          { title: "Opposites Attract", artist: "Paula Abdul", url: "https://www.youtube.com/watch?v=xweiQukBM_k" },
          { title: "Binary", artist: "The Horrors", url: "https://www.youtube.com/watch?v=1GxKnFDHgFU" },
        ],
        advanced: "Binary logic (Boolean algebra) provides the functional framework for all digital architecture. By reducing information to its most fundamental state — the bit — we can quantify entropy and information flow. This reflects the \"law of excluded middle\" in classical logic. Spiritually, binary systems represent the Duality of existence. While higher mathematics moves into manifolds and infinities, the foundation remains anchored in the resolution of opposites.",
      },

      // ── 3 ── THE ZERO (EMPTINESS) ────────────────────────────
      {
        id: "zero-emptiness",
        num: 3,
        icon: "🕳️",
        title: "The Zero (Emptiness)",
        subtitle: "The Nothing That Changed Everything",
        simple: "Zero is a magical number because it represents having nothing, yet it makes every other number bigger when it sits next to them. Think of it like a stage before the actors come out — it is the quiet space that allows the music to happen. Without zero, we couldn't count to ten or understand that sometimes \"nothing\" is a very important thing. It is the \"reset\" button that lets us start over.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The silence between two deep breaths." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of clean air after a rainstorm." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Pure, cool water that cleans your palate." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of weightlessness when you jump on a trampoline." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Staring at a perfectly blank white piece of paper." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Relaxing every muscle until you feel like you are floating." },
        ],
        intuition: "Feeling a sense of peace when you let go of all your worries.",
        links: [
          { label: "Scientific American: The History of Zero", url: "https://www.scientificamerican.com/article/what-is-the-origin-of-zer/" },
          { label: "The Guardian: The Power of Zero", url: "https://www.theguardian.com/science/2019/mar/11/zero-the-number-that-changed-everything" },
          { label: "Wikipedia: Emptiness (Buddhism)", url: "https://en.wikipedia.org/wiki/%C5%9A%C5%ABnyat%C4%81" },
        ],
        songs: [
          { title: "Zero", artist: "The Smashing Pumpkins", url: "https://www.youtube.com/watch?v=PjsYKJuflEE" },
          { title: "Nothing Compares 2 U", artist: "Sinéad O'Connor", url: "https://www.youtube.com/watch?v=0-EF60neguk" },
          { title: "Start from Zero", artist: "T-Square", url: "https://www.youtube.com/watch?v=QYEqk5gV3HA" },
        ],
        advanced: "Zero is the additive identity in arithmetic and the origin point (0,0) in Cartesian coordinates. Its introduction by Indian mathematicians revolutionized the world by enabling calculus and limits. Zero acts as the boundary between positive and negative realms — the cosmic null point. In physics, zero-point energy suggests even \"empty\" space teems with potential, aligning with the idea that the Void is pure, unmanifested potentiality from which all numbers and forms arise.",
      },

      // ── 4 ── RATIO & PROPORTION ──────────────────────────────
      {
        id: "ratio-proportion",
        num: 4,
        icon: "⚖️",
        title: "Ratio & Proportion",
        subtitle: "The Secret Behind Why Things Fit",
        simple: "Ratio is how we compare things to see if they fit together nicely, like the way a small key fits into a big lock. It is the secret behind why some music sounds happy and why some buildings look beautiful and strong. When things are in the right proportion, they feel \"correct\" to our eyes and ears, helping us feel at home in the world.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A perfect \"Power Chord\" on a guitar." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A balanced perfume where no one scent is too strong." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The perfect mix of peanut butter and jelly." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Holding hands with someone where your fingers interlock perfectly." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a photo that follows the \"Rule of Thirds.\"" },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Balancing a broomstick on your fingertip." },
        ],
        intuition: "Knowing exactly how much effort to put into a task without overdoing it.",
        links: [
          { label: "Khan Academy: Ratios", url: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic" },
          { label: "Britannica: Golden Ratio", url: "https://www.britannica.com/science/golden-ratio" },
          { label: "Wikipedia: Musical Temperament", url: "https://en.wikipedia.org/wiki/Musical_temperament" },
        ],
        songs: [
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" },
          { title: "Perfect", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
        ],
        advanced: "Proportion is the cornerstone of Euclidean geometry and classical aesthetics. A ratio represents a relationship between two quantities (a:b) that remains invariant regardless of scale — the basis for similarity in geometric shapes. The \"Harmony of the Spheres\" suggested celestial bodies follow the same ratios found in musical intervals, connecting arithmetic directly to cosmology.",
      },

      // ── 5 ── ITERATION (COUNTING) ────────────────────────────
      {
        id: "iteration-counting",
        num: 5,
        icon: "👣",
        title: "Iteration (Counting)",
        subtitle: "One Step at a Time to the Top",
        simple: "Iteration is just doing something over and over again to get somewhere new, like taking one step at a time to climb a mountain. Every time you count \"1, 2, 3,\" you are using iteration to build a bigger number. It shows us that big changes don't happen all at once; they happen because we keep going. If you practice a little bit every day, that is iteration working to make you a master.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The steady \"tick-tock\" of a grandfather clock." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of baking cookies, one tray after another." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Taking small bites of a meal until the plate is empty." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the ridges on a seashell, one by one." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a line of ants walking in a row." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your heartbeat rhythmically thumping in your chest." },
        ],
        intuition: "Realizing that \"showing up\" every day is the secret to success.",
        links: [
          { label: "Wikipedia: Iteration", url: "https://en.wikipedia.org/wiki/Iteration" },
          { label: "Math is Fun: Sequences", url: "https://www.mathsisfun.com/algebra/sequences-sums-arithmetic.html" },
          { label: "Nature: Biological Rhythms", url: "https://www.nature.com/subjects/biological-rhythms" },
        ],
        songs: [
          { title: "Around the World", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=LKYPYj2XX80" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "7 Rings", artist: "Ariana Grande", url: "https://www.youtube.com/watch?v=QYh6mYIJG2Y" },
        ],
        advanced: "Iteration is the fundamental process behind Algorithms and Chaos Theory. By repeatedly applying a function (x_n+1 = f(x_n)), complex behaviors emerge from simple rules — modeling weather, stock markets, and population growth. Iteration is the mathematical expression of Time: each moment is an iteration of the state of the universe, linking the discrete nature of counting to the continuous experience of living.",
      },

      // ── 6 ── RECURSION (FRACTALS) ────────────────────────────
      {
        id: "recursion-fractals",
        num: 6,
        icon: "🥦",
        title: "Recursion (Fractals)",
        subtitle: "A Dream Within a Dream",
        simple: "Recursion is when a pattern contains a smaller version of itself inside, like a dream within a dream. If you look at a fern leaf, each little part looks like a tiny version of the whole leaf. This shows us that the same \"rules\" apply to small things and big things alike. The same patterns that make a galaxy also make the veins in your own hand.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "An echo that gets quieter and quieter but keeps the same tone." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a pine forest, where every tree smells like the whole woods." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A Russian nesting doll of flavors, like a chocolate-filled strawberry." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the repetitive texture of a honeycomb." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Holding two mirrors facing each other to see a \"tunnel\" of yous." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Noticing how your small finger movements mimic your whole arm." },
        ],
        intuition: "Feeling that \"as above, so below\" connection to the stars.",
        links: [
          { label: "Fractal Foundation: What are Fractals?", url: "https://fractalfoundation.org/resources/what-are-fractals/" },
          { label: "Wikipedia: Recursion", url: "https://en.wikipedia.org/wiki/Recursion" },
          { label: "Wired: The Math of Fractals", url: "https://www.wired.com/story/the-math-of-fractals/" },
        ],
        songs: [
          { title: "The End", artist: "The Doors", url: "https://www.youtube.com/watch?v=BXqPNlng6uI" },
          { title: "Reflection", artist: "Tool", url: "https://www.youtube.com/watch?v=4MzVuHqsNoM" },
          { title: "In the End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4" },
        ],
        advanced: "Recursion solves problems by depending on solutions to smaller instances of the same problem — the basis for the Mandelbrot Set, an infinitely complex shape. It challenges Euclidean views by introducing fractal dimensions that exist between 1D, 2D, and 3D. This bridges mathematics to biology (DNA replication) and linguistics (sentence structure), suggesting a Holonomic universe where the whole is contained within every part.",
      },

      // ── 7 ── PRIME NUMBERS ───────────────────────────────────
      {
        id: "prime-numbers",
        num: 7,
        icon: "💎",
        title: "Prime Numbers",
        subtitle: "The Unbreakable Diamonds",
        simple: "Prime numbers are the \"lonely\" numbers like 3, 7, and 11 that can't be divided into smaller groups. They are the strongest numbers because they are made of only themselves and \"One.\" Think of them like special Lego bricks you can't take apart. Because they are so unique, they are used to keep all the secrets on the internet safe, acting like a super-strong lock nobody can pick.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A sharp, unexpected \"ping\" in a steady rhythm." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The singular, unmistakable smell of pure peppermint." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The intense, un-mixed flavor of a lemon slice." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a single sharp point of a needle (carefully!)." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a single bright star that stands out from the rest." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of standing perfectly still and \"indivisible.\"" },
        ],
        intuition: "That feeling of being totally unique and \"one-of-a-kind.\"",
        links: [
          { label: "Wikipedia: Prime Number", url: "https://en.wikipedia.org/wiki/Prime_number" },
          { label: "RSA Encryption Explained", url: "https://www.comparitech.com/blog/information-security/rsa-encryption/" },
          { label: "The Music of Primes", url: "https://en.wikipedia.org/wiki/The_Music_of_the_Primes" },
        ],
        songs: [
          { title: "3 Is A Magic Number", artist: "Blind Melon", url: "https://www.youtube.com/watch?v=aU4pyiB-kq0" },
          { title: "Seven Nation Army", artist: "The White Stripes", url: "https://www.youtube.com/watch?v=0J2QdDbelmY" },
          { title: "Edge of Seventeen", artist: "Stevie Nicks", url: "https://www.youtube.com/watch?v=Dn8-4tjPxD8" },
        ],
        advanced: "The Fundamental Theorem of Arithmetic states every integer greater than 1 is either a prime or a unique product of primes — making primes the \"atomic\" level of the number line. Their distribution is linked to the Riemann Hypothesis, arguably the most important unsolved problem in mathematics. Primes are essential in RSA cryptography because multiplying two large primes is easy, but factoring the result back is nearly impossible — a \"one-way door\" securing the global economy.",
      },

      // ── 8 ── THE GOLDEN RATIO ────────────────────────────────
      {
        id: "golden-ratio",
        num: 8,
        icon: "🌀",
        title: "The Golden Ratio (φ)",
        subtitle: "Nature's Secret Recipe for Beauty",
        simple: "The Golden Ratio is a special number found in nature that makes things look \"perfect\" to us. If you look at a seashell or a hurricane, they often follow this special curve. It is like a secret recipe that nature uses to grow things so they are both beautiful and strong. Artists and architects use it too, so when you look at a famous painting, you might be seeing this secret math!",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A melody that slowly rises and falls in a natural way." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a rose, which grows in a golden spiral." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A perfectly balanced soup where all flavors \"bloom\" at once." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Tracing the spiral on your own fingertip." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a sunflower's face." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Moving your body in a smooth, flowing dance move." },
        ],
        intuition: "Feeling a sense of \"correctness\" when you see a beautiful sunset.",
        links: [
          { label: "National Geographic: The Golden Ratio", url: "https://www.nationalgeographic.com/science/article/golden-ratio" },
          { label: "Fibonacci Sequence in Nature", url: "https://www.mathsisfun.com/numbers/fibonacci-sequence.html" },
          { label: "The Math Behind Beauty", url: "https://www.britannica.com/science/golden-ratio" },
        ],
        songs: [
          { title: "Stairway to Heaven", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=QkF3oxziUI4" },
          { title: "Fibonacci Sequence", artist: "BT", url: "https://www.youtube.com/watch?v=yFGPU7PSS5s" },
          { title: "Golden", artist: "Harry Styles", url: "https://www.youtube.com/watch?v=P3cffdsEXXw" },
        ],
        advanced: "The Golden Ratio (φ = (1+√5)/2 ≈ 1.618) is the limit of successive Fibonacci numbers. In geometry, it is the only ratio allowing self-scaling growth without changing shape — ubiquitous in phyllotaxis (leaf arrangement). It is the most \"irrational\" of all numbers, hardest to approximate with fractions. This unique property minimizes interference in natural systems, allowing maximum efficiency in seed packing and energy distribution.",
      },

      // ── 9 ── SETS AND GROUPS ─────────────────────────────────
      {
        id: "sets-groups",
        num: 9,
        icon: "🧺",
        title: "Sets and Groups",
        subtitle: "Collections That Make Sense of the Mess",
        simple: "A \"Set\" is just a fancy way of saying a \"collection\" of things that belong together, like a box of crayons or a team of players. It shows us that even though things are different, they can work together as one group. You belong to many sets: your family, your class, and the set of all kids who like pizza! Understanding sets helps us organize the world so it doesn't feel like a big, messy pile.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "An orchestra tuning up, then playing together as one \"set\" of music." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The \"smell of home\" — a mix of laundry, cooking, and family." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A salad where you can taste the \"set\" of different veggies." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a bunch of marbles in a bag." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a flock of birds flying together in a \"V\" shape." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your fingers and toes as \"sub-sets\" of your whole body." },
        ],
        intuition: "Knowing which group of friends makes you feel the most \"you.\"",
        links: [
          { label: "Set Theory for Kids", url: "https://www.mathsisfun.com/sets/sets-introduction.html" },
          { label: "Stanford: Set Theory", url: "https://plato.stanford.edu/entries/set-theory/" },
          { label: "Wikipedia: Group Theory", url: "https://en.wikipedia.org/wiki/Group_theory" },
        ],
        songs: [
          { title: "We Are Family", artist: "Sister Sledge", url: "https://www.youtube.com/watch?v=eBpYgpF1bqQ" },
          { title: "Come Together", artist: "The Beatles", url: "https://www.youtube.com/watch?v=45cYwms990A" },
          { title: "All Together Now", artist: "The Beatles", url: "https://www.youtube.com/watch?v=73lj5qJbrms" },
        ],
        advanced: "Set Theory (Zermelo-Fraenkel) is the foundational logic upon which all modern mathematics is built, defining how elements interact within universes. Group Theory studies the symmetries within these sets — vital for particle physics and the standard model. Philosophically, this addresses the \"One and the Many\" problem, suggesting identity is defined by the relationships and sets we inhabit.",
      },

      // ── 10 ── BASE SYSTEMS ───────────────────────────────────
      {
        id: "base-systems",
        num: 10,
        icon: "🖐️",
        title: "Base Systems",
        subtitle: "Different Glasses, Same World",
        simple: "A base system is just a rule for how we group numbers to count them. Most of us use \"Base 10\" because we have ten fingers, but clocks use \"Base 60\" (60 seconds in a minute). It shows us that there isn't just one \"right\" way to look at the world — it depends on what \"glasses\" you are wearing. By learning different bases, we see that truth can look different depending on how you choose to measure it.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A drummer counting \"1, 2, 3, 4\" over and over (Base 4)." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a bakery that changes every hour on the clock." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a \"dozen\" (Base 12) donuts." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Counting your knuckles with your thumb." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a digital clock and seeing the minutes flip at 60." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the rhythm of your walking — Left, Right, Left, Right (Base 2)." },
        ],
        intuition: "Realizing that people from different cultures just \"count\" the world differently.",
        links: [
          { label: "Number Bases Explained", url: "https://www.mathsisfun.com/numbers/bases.html" },
          { label: "History of Sexagesimal (Base 60)", url: "https://en.wikipedia.org/wiki/Sexagesimal" },
          { label: "Binary, Octal, and Hexadecimal", url: "https://www.electronics-tutorials.ws/binary/bin_2.html" },
        ],
        songs: [
          { title: "10-20-30", artist: "Big Sean", url: "https://www.youtube.com/watch?v=ZK_j8BwYBng" },
          { title: "9 to 5", artist: "Dolly Parton", url: "https://www.youtube.com/watch?v=UbxUSsFXYo4" },
          { title: "24K Magic", artist: "Bruno Mars", url: "https://www.youtube.com/watch?v=UqyT8IEBkvY" },
        ],
        advanced: "The choice of a numerical base is a representational convention. While decimal (Base 10) is standard due to human anatomy, hexadecimal (Base 16) and binary (Base 2) are more efficient for machine logic. The ancient Sumerian Base 60 survives in our measurement of time and angles (360 degrees). This reveals that while numerical values are universal truths, the symbols we use are cultural constructs — teaching the importance of Frame of Reference, a key concept in both linguistics and Einstein's Relativity.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔢 MATHEMATICS (promise) → 🔄 PATTERNS & SEQUENCES (patterns)
    // "When numbers repeat in a way that means something"
    // ═══════════════════════════════════════════════════════════════

    patterns: [

      // ── 1 ── THE FIBONACCI SEQUENCE & NATURE'S GROWTH ────────
      {
        id: "fibonacci-sequence",
        num: 1,
        icon: "🌀",
        title: "The Fibonacci Sequence & Nature's Growth",
        subtitle: "Nature's Secret Code",
        simple: "Imagine you are looking at a sunflower or a seashell. Nature has a secret code where it adds the last two numbers together to get the next one, like 1, 1, 2, 3, 5, 8. This special pattern helps plants grow in a way that uses space perfectly so every leaf gets sunlight. When you see a pinecone or a snail shell, you are seeing this secret code in real life. It reminds us that we are all part of a beautiful, organized plan.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a heartbeat; it's a rhythmic sequence that keeps the whole body in sync." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smell a rose; the petals grow in a spiral sequence that releases scent in layers." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eat a pineapple; the \"eyes\" on the skin follow a Fibonacci diagonal sequence." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Run your fingers over a pinecone to feel the scales spiraling in two directions." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a photo of a galaxy; the stars spiral out just like a tiny seashell." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and spin slowly; feel how your body maintains its center within a circular sequence." },
        ],
        intuition: "Nature doesn't guess — it counts. And its favorite counting pattern is hidden in everything you love to look at.",
        links: [
          { label: "The Mathematical Beauty of Nature", url: "https://www.mathsisfun.com/numbers/fibonacci-sequence.html" },
          { label: "Fibonacci Numbers in Biology", url: "https://en.wikipedia.org/wiki/Fibonacci_number" },
          { label: "The Science of Spirals", url: "https://www.britannica.com/science/spiral" },
        ],
        songs: [
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "Clair de Lune", artist: "Claude Debussy", url: "https://www.youtube.com/watch?v=CvFH_6DNRCY" },
        ],
        advanced: "The Fibonacci sequence (F_n = F_{n-1} + F_{n-2}) is the foundational numerical representation of biological optimization. In phyllotaxis, leaf and seed arrangements follow Fibonacci numbers to maximize resource exposure while minimizing interference. This sequence is the discrete counterpart to the continuous Golden Spiral, representing an asymptotic approach to the Golden Ratio. It bridges abstract mathematics and organic reality, suggesting a convergent evolution of form where efficiency dictates aesthetics.",
      },

      // ── 2 ── FRACTAL GEOMETRY & SELF-SIMILARITY ──────────────
      {
        id: "fractal-geometry",
        num: 2,
        icon: "❄️",
        title: "Fractal Geometry & Self-Similarity",
        subtitle: "Zoom In and See It Again",
        simple: "Fractals are shapes that look exactly the same no matter how much you zoom in or zoom out. If you look at a big tree, the branches look like mini-trees, and the twigs look like even tinier trees. Clouds, lightning, and even the blood vessels in your body are all built like fractals. It shows us that even the smallest part of something contains the pattern of the whole thing.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a thunderstorm; the crackle of lightning follows a fractal sound pattern." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The complex scent of a forest, where every leaf contributes to a repeating \"green\" aroma." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eat a head of Romanesco broccoli; every tiny bud looks like the whole vegetable." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel a fern leaf; each small leaflet is a miniature version of the entire branch." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a map of a coastline; the jagged edges look similar whether you are an inch or a mile away." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel the \"branching\" of your lungs as you take a deep breath, expanding in a fractal network." },
        ],
        intuition: "The universe builds big complicated things using simple, repeating rules. You are one of those rules.",
        links: [
          { label: "Introduction to the Mandelbrot Set", url: "https://mathworld.wolfram.com/MandelbrotSet.html" },
          { label: "Fractals in the Human Body", url: "https://en.wikipedia.org/wiki/Fractal#Natural_phenomena_with_fractal_features" },
          { label: "The Geometry of Chaos", url: "https://fractalfoundation.org/resources/what-are-fractals/" },
        ],
        songs: [
          { title: "Cello Suite No. 1", artist: "J.S. Bach", url: "https://www.youtube.com/watch?v=1prweT95Mo0" },
          { title: "Interstellar Main Theme", artist: "Hans Zimmer", url: "https://www.youtube.com/watch?v=UDVtMYqUAyw" },
          { title: "Around the World", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=LKYPYj2XX80" },
        ],
        advanced: "Fractal geometry, popularized by Benoit Mandelbrot, departs from Euclidean shapes to describe the \"roughness\" of the natural world. A fractal is defined by its Hausdorff dimension, often non-integer, indicating shapes that occupy space in ways traditional geometry cannot account for. Fractals represent iterative algorithms where simple feedback loops create infinite complexity — vital for understanding order from chaos. Fractal analysis of stock markets, heart rate variability, and coastlines reveals persistent patterns across different scales.",
      },

      // ── 3 ── THE GOLDEN RATIO ────────────────────────────────
      {
        id: "golden-ratio-pattern",
        num: 3,
        icon: "Φ",
        title: "The Golden Ratio",
        subtitle: "The Universal Beauty Rule",
        simple: "The Golden Ratio is a special number — roughly 1.618 — that people find very beautiful to look at. Artists and builders have used it for thousands of years to make buildings and paintings that feel \"just right.\" You can find it in the shape of your face, the Parthenon in Greece, and even in famous paintings. It is like a universal \"beauty rule\" that connects how we see the world to the math that builds the world.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a perfect fifth in music; the ratio of the frequencies creates a harmonious, \"golden\" sound." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The balanced scent of a perfectly bloomed Lily, where the fragrance follows the petal's proportions." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The balance of sweet and sour in a perfect apple, grown to its ideal geometric size." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Measure the sections of your finger; the ratio of the bones often approaches 1.618." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a credit card or a wide-screen TV; they are often shaped near the Golden Rectangle." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stand in a \"star\" pose; feel the balance of your limbs relative to your torso's center." },
        ],
        intuition: "When something looks \"perfect\" to you, there's a good chance 1.618 is hiding inside it.",
        links: [
          { label: "The Golden Ratio in Art and Architecture", url: "https://www.britannica.com/science/golden-ratio" },
          { label: "Mathematical Properties of Phi", url: "https://mathworld.wolfram.com/GoldenRatio.html" },
          { label: "Phi in the Human Genome", url: "https://en.wikipedia.org/wiki/Golden_ratio" },
        ],
        songs: [
          { title: "Stairway to Heaven", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=QkF3oxziUI4" },
          { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
          { title: "The Blue Danube", artist: "Johann Strauss II", url: "https://www.youtube.com/watch?v=_CTYymbbEL4" },
        ],
        advanced: "The Golden Ratio (φ = (1+√5)/2) is unique because φ² = φ + 1, making it the most \"irrational\" of all numbers in continued fractions. This property makes it essential for minimizing interference in dynamic systems — seed arrangement in sunflowers prevents gaps or clumping. Historically the \"Divine Proportion,\" φ bridges the finite and infinite. In modern physics and quasi-crystals, φ appears as a structural necessity, suggesting our aesthetic preference is actually a biological recognition of mathematical purity.",
      },

      // ── 4 ── ARITHMETIC VS. GEOMETRIC PROGRESSION ────────────
      {
        id: "arithmetic-geometric",
        num: 4,
        icon: "📈",
        title: "Arithmetic vs. Geometric Progression",
        subtitle: "Walking vs. Riding a Rocket",
        simple: "Imagine you are saving money in a piggy bank. If you add two dollars every single day, that is a steady, straight-line pattern called arithmetic growth. But if your money doubled every day instead, that is geometric growth, and it turns into a giant mountain very fast! Understanding the difference helps us see why some things change slowly and other things explode with energy. It is the difference between taking a walk and riding a rocket ship.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a drummer speed up — each beat coming twice as fast as the last." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "How the scent of a single candle fills a room slowly versus a whole box of matches." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Taste a single grain of sugar versus a whole spoonful; the sweetness \"levels up\" fast." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel the steady tap of a finger versus a vibrating phone that gets stronger and stronger." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a staircase (arithmetic) versus the way a family tree branches out (geometric)." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Walk at a steady pace, then suddenly double your speed with every step until you are sprinting." },
        ],
        intuition: "Some changes walk. Some changes run. Knowing which one you're watching changes everything.",
        links: [
          { label: "The Math of Growth", url: "https://en.wikipedia.org/wiki/Geometric_progression" },
          { label: "Linear vs. Exponential Explained", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:exponential-growth-and-decay" },
          { label: "Compound Interest and Sequences", url: "https://www.investopedia.com/terms/c/compoundinterest.asp" },
        ],
        songs: [
          { title: "Money", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=-0kc7meo7i0" },
          { title: "Symphony No. 5", artist: "Beethoven", url: "https://www.youtube.com/watch?v=fOk8Tm815lE" },
          { title: "Started From The Bottom", artist: "Drake", url: "https://www.youtube.com/watch?v=RubBzkZzpUA" },
        ],
        advanced: "Arithmetic progression (a_n = a_1 + (n-1)d) represents constant rate of change — stable, predictable systems like planetary orbits. Geometric progression (a_n = a_1 × r^(n-1)) represents feedback loops where current state determines the next step's magnitude. In economics and biology, this distinction is critical for understanding \"tipping points.\" Geometric growth eventually outpaces any linear resource (Malthus), connecting mathematical limits to the physical boundaries of our world.",
      },

      // ── 5 ── PERIODIC CYCLES & HARMONIC OSCILLATIONS ─────────
      {
        id: "periodic-cycles",
        num: 5,
        icon: "🌊",
        title: "Periodic Cycles & Harmonic Oscillations",
        subtitle: "The Dance That Never Stops",
        simple: "Think about a swing on a playground going back and forth, or the way the sun comes up every single morning. These are called cycles, which are patterns that return to the start over and over again. Your breathing, your heartbeat, and even the seasons are all part of this big, repeating dance. Life isn't just a straight line; it is a circle that keeps us safe and balanced.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a hum; it is a tiny vibration moving back and forth very fast." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smell the air after rain in the spring; it is part of the yearly scent cycle." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Sip a cold drink on a hot day; notice how your body craves certain tastes in different seasons." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Put your hand on a speaker; feel the \"push and pull\" of the rhythmic cycles." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch the moon change shape over a month; it is a giant clock in the sky." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Close your eyes and rock back and forth; feel how your body naturally finds a center." },
        ],
        intuition: "When things go away, they often find a way to come back around. That's not coincidence — that's a cycle.",
        links: [
          { label: "Simple Harmonic Motion", url: "https://www.britannica.com/science/simple-harmonic-motion" },
          { label: "The Science of Seasons", url: "https://www.nationalgeographic.org/encyclopedia/season/" },
          { label: "Circadian Rhythms in Biology", url: "https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx" },
        ],
        songs: [
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Good Vibrations", artist: "The Beach Boys", url: "https://www.youtube.com/watch?v=Eab_beh07HU" },
          { title: "Time", artist: "Hans Zimmer", url: "https://www.youtube.com/watch?v=RxabLA7ASqM" },
        ],
        advanced: "Harmonic oscillation is the backbone of wave mechanics, described by f(t) = A sin(ωt + φ). Found in everything from guitar strings to subatomic particles, it represents systems where a restoring force is proportional to displacement — perpetual exchange between potential and kinetic energy. Fourier analysis breaks complex signals into simple sine waves; circadian rhythms govern biology. The universe prefers resonance over randomness — every peak is balanced by a trough.",
      },

      // ── 6 ── SYMMETRY ────────────────────────────────────────
      {
        id: "symmetry-pattern",
        num: 6,
        icon: "🦋",
        title: "Symmetry",
        subtitle: "Nature's Mirror",
        simple: "Symmetry is like a mirror that nature uses to make things look balanced and beautiful. If you fold a drawing of a heart or a butterfly wing in half, both sides match perfectly. Most animals, including humans, are symmetrical because it helps us move through the world without tipping over. Symmetry makes things feel \"fair\" and \"even\" to our brains. It is nature's way of showing us that there is a balance between the left side and the right side of everything.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Clap your hands; the sound is a \"mirror\" of two things meeting perfectly." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smell two identical flowers at once; the symmetry of the scent feels \"full.\"" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Bite into an orange slice; the segments are symmetrical \"rooms\" of juice." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Use both hands to feel your face; notice how your left side matches your right." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look in a mirror; you are seeing a perfect \"reflective\" sequence of yourself." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stand on one leg; feel your brain trying to balance your weight symmetrically." },
        ],
        intuition: "When something looks balanced, your brain is recognizing deep structural health. Beauty is order made visible.",
        links: [
          { label: "Noether's Theorem Explained", url: "https://www.quantamagazine.org/the-most-profound-mathematician-youve-never-heard-of-20171129/" },
          { label: "Bilateral Symmetry in Animals", url: "https://en.wikipedia.org/wiki/Bilateral_symmetry" },
          { label: "Symmetry in Physics", url: "https://plato.stanford.edu/entries/symmetry-physics/" },
        ],
        songs: [
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Mirror", artist: "Justin Timberlake", url: "https://www.youtube.com/watch?v=uuZE_IRwLNI" },
          { title: "Reflections", artist: "Mulan Soundtrack", url: "https://www.youtube.com/watch?v=lGGX1nv3vS8" },
        ],
        advanced: "In physics, symmetry refers to invariance under transformation. Noether's Theorem states that every differentiable symmetry of the action of a physical system has a corresponding conservation law — time symmetry yields conservation of energy. The very laws of the universe are built on structural sameness. Group theory classifies these symmetries to understand the fundamental building blocks of matter, proving that beauty is often a sign of deep structural integrity.",
      },

      // ── 7 ── PROBABILITY DISTRIBUTIONS & THE BELL CURVE ──────
      {
        id: "bell-curve",
        num: 7,
        icon: "🔔",
        title: "Probability Distributions & The Bell Curve",
        subtitle: "The Math of Normal",
        simple: "If you measured everyone in your class, most kids would be about the same height, with only a few very short or very tall kids. This \"hump\" in the middle is called a Bell Curve. It shows us that while everyone is special, nature likes to keep most things in a \"middle ground\" area. It is the math of \"what is normal\" versus \"what is rare,\" and it helps us understand the world even when it seems messy.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to the \"white noise\" of a crowd; the volume follows a predictable distribution." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a bakery; most of the scent is \"bread,\" with \"spices\" being the rare edges." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Taste a bag of jellybeans; most are sweet (the middle), but a few are sour (the edges)." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel a handful of sand; most grains feel the same, but a few are sharp or extra soft." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a field of grass; most blades are the same green, forming a visual \"average.\"" },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Try to walk in a perfectly straight line; your small wobbles usually stay near the center." },
        ],
        intuition: "Outliers are mathematically necessary for the existence of an average. The rare makes the normal possible.",
        links: [
          { label: "Understanding the Normal Distribution", url: "https://www.mathsisfun.com/data/standard-normal-distribution.html" },
          { label: "The Central Limit Theorem", url: "https://www.britannica.com/topic/central-limit-theorem" },
          { label: "Statistics in Everyday Life", url: "https://www.scientificamerican.com/article/what-is-the-bell-curve-and-how-is-it-used/" },
        ],
        songs: [
          { title: "Against All Odds", artist: "Phil Collins", url: "https://www.youtube.com/watch?v=wuvtoyVi7vY" },
          { title: "Ordinary People", artist: "John Legend", url: "https://www.youtube.com/watch?v=PIh0V866sqo" },
          { title: "Viva La Vida", artist: "Coldplay", url: "https://www.youtube.com/watch?v=dvgZkm1xWPE" },
        ],
        advanced: "The Normal Distribution (Gaussian) is defined by f(x) = (1/σ√(2π)) × e^(-(x-μ)²/2σ²). The Central Limit Theorem proves that the sum of many independent random variables tends toward a Bell Curve, regardless of the original distribution — explaining why order emerges from apparent randomness. By understanding variance (σ) and the mean (μ), we quantify uncertainty. A cosmic tug-of-war where individual chaos resolves into collective, predictable pattern.",
      },

      // ── 8 ── TESSELLATIONS & SPATIAL REPETITION ──────────────
      {
        id: "tessellations",
        num: 8,
        icon: "🧱",
        title: "Tessellations & Spatial Repetition",
        subtitle: "The Perfect Puzzle With No Gaps",
        simple: "Tessellations are like a puzzle where every piece fits perfectly with no gaps and no overlapping. Think of the tiles on a bathroom floor or the hexagons in a beehive. Bees use hexagons because it is the strongest and smartest way to store honey using the least amount of wax. When everything fits together perfectly, it creates a strong, beautiful wall that can hold a lot of weight or a lot of life.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a \"round\" song where different people start the same melody at different times." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smell a honeycomb; the waxy scent is as organized as the cells themselves." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eat a waffle; the square \"wells\" are a delicious edible tessellation." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Run your hand over a tiled wall or a brick path to feel the repeating seams." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a snake's skin or a fish's scales; they overlap in a perfect, gapless pattern." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Imagine fitting yourself into a crowded elevator; your body looks for the empty \"tile\" to stand in." },
        ],
        intuition: "The universe loves to be efficient and tight. When everything fits, nothing is wasted.",
        links: [
          { label: "The Geometry of Tessellations", url: "https://en.wikipedia.org/wiki/Tessellation" },
          { label: "M.C. Escher's Mathematical Art", url: "https://mcescher.com/gallery/symmetry/" },
          { label: "Crystallography and Tiling", url: "https://en.wikipedia.org/wiki/Crystallographic_group" },
        ],
        songs: [
          { title: "Another Brick in the Wall", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=HrxX9TBj2zY" },
          { title: "Lego House", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=c4BLVznuWnU" },
          { title: "Shape of You", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
        ],
        advanced: "Tessellation covers a plane using geometric shapes with no overlaps or gaps. Only three regular polygons tessellate in 2D: triangle, square, and hexagon. The Honeycomb Conjecture proves the hexagonal grid divides a surface into equal-area regions with the least total perimeter. Aperiodic tilings (Penrose tiles) show that non-repeating patterns can still fill space perfectly — \"oneness\" achieved through both repetition and infinite variety.",
      },

      // ── 9 ── PRIME NUMBER DISTRIBUTION ───────────────────────
      {
        id: "prime-distribution",
        num: 9,
        icon: "🔢",
        title: "Prime Number Distribution",
        subtitle: "The Ghost Pattern in the Number Line",
        simple: "Prime numbers are the \"special\" numbers that can't be broken down into smaller pieces, like 2, 3, 5, 7, and 11. They are the \"atoms\" or building blocks of all other numbers. Even though they seem to pop up randomly, mathematicians have found they follow a secret, ghostly pattern. Prime numbers are the \"secret codes\" used to keep your parents' credit cards safe on the internet. Even in things that look messy, there is a deep, hidden order.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a polyrhythm where two different beats only meet once every long while." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smell an exotic spice like saffron; it's a \"prime\" scent that stands alone." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Taste a raw lemon; it is a pure, singular flavor that isn't a mix of others." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feel a rough, uncut diamond; it is a \"prime\" piece of nature before it's shaped." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Look at a list of numbers and circle the primes; notice how they get rarer as numbers get bigger." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Try to stand perfectly still and solo; feel your \"indivisible\" self as a single unit." },
        ],
        intuition: "The atoms of all numbers hide in plain sight, getting rarer but never disappearing. Order disguised as chaos.",
        links: [
          { label: "The Riemann Hypothesis", url: "https://www.claymath.org/millennium-problems/riemann-hypothesis" },
          { label: "Prime Numbers in Nature (Cicadas)", url: "https://www.newyorker.com/tech/annals-of-technology/the-cicadas-love-of-prime-numbers" },
          { label: "How RSA Encryption Works", url: "https://www.khanacademy.org/computing/computer-science/cryptography/modern-cryptography/v/rsa-encryption-step-4" },
        ],
        songs: [
          { title: "Numbers", artist: "Kraftwerk", url: "https://www.youtube.com/watch?v=vVLoT_6X2pM" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "7", artist: "Prince", url: "https://www.youtube.com/watch?v=S3866P6Y-D4" },
        ],
        advanced: "The Prime Number Theorem states that primes less than x approximate x/ln(x). The Riemann Hypothesis connects their distribution to the zeros of the Riemann zeta function — linking discrete arithmetic to complex analysis. Cicadas emerge in prime-numbered years (13 or 17) to avoid syncing with predator life cycles — \"prime-ness\" as survival strategy. The difficulty of factoring large primes secures all global digital communication.",
      },

      // ── 10 ── THE LAW OF LARGE NUMBERS & EMERGENT ORDER ─────
      {
        id: "law-large-numbers",
        num: 10,
        icon: "🐜",
        title: "The Law of Large Numbers & Emergent Order",
        subtitle: "One Bird Is Random. A Flock Is Genius.",
        simple: "If you flip a coin once, it's a mystery. But if you flip it a thousand times, you will get almost exactly 500 heads and 500 tails. This is the Law of Large Numbers — when you have a LOT of something, a secret order appears out of the mess. It's how a thousand birds fly together in a beautiful cloud without crashing. Even if one thing is unpredictable, a big group of things becomes very smart and steady.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to the \"roar\" of a stadium; thousands of individual voices become one single wave of sound." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a garden; hundreds of different flowers blend into one \"summer\" scent." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Taste a pinch of salt; it is just \"salty,\" but it brings out the \"order\" of all the other ingredients." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Walk through a thick forest; feel how many individual leaves create a single, cool \"canopy\" of shade." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watch a flock of starlings (a murmuration); it looks like a giant, swimming liquid made of tiny dots." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feel yourself as one person in a moving crowd; your body \"flows\" with the group's sequence." },
        ],
        intuition: "Truth is not found in the isolated incident, but in the convergence of many — where the noise cancels out and the signal remains.",
        links: [
          { label: "What is Emergence?", url: "https://www.quantamagazine.org/the-strange-second-life-of-the-law-of-large-numbers-20190114/" },
          { label: "The Law of Large Numbers Explained", url: "https://www.britannica.com/science/law-of-large-numbers" },
          { label: "The Science of Swarms", url: "https://en.wikipedia.org/wiki/Swarm_intelligence" },
        ],
        songs: [
          { title: "One", artist: "U2", url: "https://www.youtube.com/watch?v=ftjEcrrf7r0" },
          { title: "Bittersweet Symphony", artist: "The Verve", url: "https://www.youtube.com/watch?v=1lyu1KKwC74" },
          { title: "Hallelujah", artist: "Jeff Buckley", url: "https://www.youtube.com/watch?v=y8AWFf7EAc4" },
        ],
        advanced: "The Law of Large Numbers states that the average of many trials converges to the expected value, leading to Emergence — where complex systems exhibit properties individual parts do not possess. In statistical mechanics, we cannot predict a single gas molecule but perfectly predict pressure and temperature of the whole. The universe self-organizes through sheer volume. Truth is found in convergence, where noise cancels and signal remains.",
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
