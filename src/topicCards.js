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
  },
};

// ═══ UTILITY ═══
export function getTopicCards(doorKey, subId) {
  return TOPIC_CARDS[doorKey]?.[subId] || null;
}

export function hasTopicCards(doorKey, subId) {
  return !!(TOPIC_CARDS[doorKey]?.[subId]?.length);
}
