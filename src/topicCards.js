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

    // ═══════════════════════════════════════════════════════════════
    // 🔢 MATHEMATICS (promise) → 📐 GEOMETRY & SHAPE (shape)
    // "How space is built — circles, lines, angles"
    // ═══════════════════════════════════════════════════════════════

    shape: [

      // ── 1 ── EUCLIDEAN AXIOMS ────────────────────────────────
      {
        id: "euclidean-axioms",
        num: 1,
        icon: "⊥",
        title: "Euclidean Axioms",
        subtitle: "The Lego Instructions for the World",
        simple: "Imagine you are playing with blocks and there are rules that never change, like how a flat floor stays flat. Long ago, a man named Euclid wrote down five simple rules that explain how points, lines, and shapes work together. They tell us that you can draw a straight line between any two points and that a circle can be made from any center. Because of these rules, we can build houses that don't fall down and maps that lead us home.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Listen to a single, steady \"C\" note on a piano; it is the \"straight line\" of sound." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of fresh sawdust; the smell of the raw material used to build perfect angles." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A square of plain, unflavored gelatin; pure structure without distraction." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your finger along the sharp, straight edge of a cold metal ruler." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at the horizon line where the flat sea meets the flat sky." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Standing perfectly still and upright, feeling gravity pull you straight down in a 90-degree angle to the floor." },
        ],
        intuition: "You are a point in space, and every movement you make creates an invisible line, connecting you to the corners of the room in a perfect, silent web of math.",
        links: [
          { label: "Wolfram MathWorld: Euclid's Postulates", url: "https://mathworld.wolfram.com/EuclidsPostulates.html" },
          { label: "Britannica: Euclidean Geometry", url: "https://www.britannica.com/science/Euclidean-geometry" },
          { label: "Rice University: The Elements", url: "https://math.rice.edu/~lanius/Geom/his.html" },
        ],
        songs: [
          { title: "Blackbird", artist: "The Beatles", url: "https://www.youtube.com/watch?v=Man4Xw8Xypo" },
          { title: "The Model", artist: "Kraftwerk", url: "https://www.youtube.com/watch?v=OQIYEPe6DWY" },
          { title: "Diamonds On The Soles Of Her Shoes", artist: "Paul Simon", url: "https://www.youtube.com/watch?v=uf4YyXVoWeA" },
        ],
        advanced: "Euclidean Geometry is the parabolic approximation of physical space at human scales, defined by the parallel postulate — through a point not on a given line, exactly one line can be drawn parallel. This system assumes a flat manifold where triangle interior angles sum to exactly 180°. It is the study of invariant properties under the Euclidean group of isometries (rotations, translations, reflections). While General Relativity shows space-time is curved, Euclidean axioms remain the essential limiting case for engineering and classical mechanics.",
      },

      // ── 2 ── SYMMETRY AND INVARIANCE ─────────────────────────
      {
        id: "symmetry-invariance",
        num: 2,
        icon: "🪞",
        title: "Symmetry & Invariance",
        subtitle: "The Mirror That Never Lies",
        simple: "Symmetry is when one side of something is a \"twin\" to the other side, like your two hands or the wings of a butterfly. Nature loves symmetry because it is efficient and beautiful. In geometry, invariance means that even if you move a shape around, its \"truth\" doesn't change — a circle is still a circle whether it's on the moon or in your pocket. It is the universe's way of staying organized.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A palindrome melody that sounds the same played forward or backward." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a perfectly balanced perfume where no single ingredient overpowers the rest." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A peppermint patty; the cool mint and dark chocolate balanced in every bite." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a smooth, round marble in your palm; it feels the same no matter how you turn it." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking into a mirror and seeing your reflection match your movements." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Balancing on one leg with your arms out, feeling the \"center\" of your body hold you steady." },
        ],
        intuition: "Close your eyes and feel the left and right sides of your face; they are mirror images, holding your mind in a balanced cradle of flesh and bone.",
        links: [
          { label: "Stanford Encyclopedia: Symmetry", url: "https://plato.stanford.edu/entries/symmetry-physics/" },
          { label: "Science Education: Nature's Symmetry", url: "https://en.wikipedia.org/wiki/Symmetry_in_biology" },
          { label: "Math Is Fun: Reflection Symmetry", url: "https://www.mathsisfun.com/geometry/symmetry-reflection.html" },
        ],
        songs: [
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" },
          { title: "Crab Canon", artist: "J.S. Bach", url: "https://www.youtube.com/watch?v=xUHQ2ybTejU" },
        ],
        advanced: "In modern geometry and physics, symmetry is defined by Noether's Theorem — every differentiable symmetry of the action of a physical system corresponds to a conservation law. Rotational symmetry yields conservation of angular momentum. Invariance refers to properties preserved under a transformation group — the heart of Klein's Erlangen Program, which classified geometries based on underlying transformation groups. To understand a shape is to understand what transformations it can survive.",
      },

      // ── 3 ── THE PYTHAGOREAN THEOREM ─────────────────────────
      {
        id: "pythagorean-theorem",
        num: 3,
        icon: "◣",
        title: "The Pythagorean Theorem",
        subtitle: "The Magic Spell for Every Right Triangle",
        simple: "This is a magic math spell that lets you find the length of a \"slide\" if you know how tall and how long the ladder is. If you have a triangle with one perfectly square corner, the two short sides squared and added together always equal the long side squared (a² + b² = c²). This works for every right triangle in the universe! Builders use this to make sure walls are straight, and GPS uses it to figure out where you are on a map.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A \"perfect fifth\" interval in music; it is the most stable and \"square\" harmonic relationship." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The sharp, \"pointed\" scent of pine needles." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The sour \"kick\" of a lemon slice — sharp and distinct like a 90-degree angle." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pushing two blocks together to form a perfect, flush corner." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a shadow stretch across the ground, forming a triangle with the object and the sun." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Stretching your legs apart in a \"V\" shape and feeling the tension in the \"long side\" of the triangle." },
        ],
        intuition: "Imagine three squares made of light floating in front of you; as the triangle in the middle changes, the squares grow and shrink to keep the balance perfect.",
        links: [
          { label: "NASA: Pythagorean Theorem", url: "https://spaceplace.nasa.gov/pythagorean-theorem/en/" },
          { label: "Cut The Knot: 122 Proofs", url: "https://www.cut-the-knot.org/pythagoras/" },
          { label: "Khan Academy: Pythagorean Theorem", url: "https://www.khanacademy.org/math/geometry-home/geometry-pythagorean-theorem" },
        ],
        songs: [
          { title: "Blue Monday", artist: "New Order", url: "https://www.youtube.com/watch?v=FYH8DsU2WCk" },
          { title: "Around the World", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=LKYPYj2XX80" },
          { title: "We Will Rock You", artist: "Queen", url: "https://www.youtube.com/watch?v=-tJYN-eG1zk" },
        ],
        advanced: "The Pythagorean Theorem is the foundation of the Euclidean Metric — how we calculate the norm or distance in a Hilbert space, essential for both classical mechanics and quantum state vectors. Generalized to n dimensions, it becomes the distance formula. In differential geometry, the theorem is locally true for any smooth manifold. In General Relativity, the metric tensor g_μν acts as a generalized Pythagoras, calculating intervals in curved space-time.",
      },

      // ── 4 ── NON-EUCLIDEAN GEOMETRY ──────────────────────────
      {
        id: "non-euclidean",
        num: 4,
        icon: "🌐",
        title: "Non-Euclidean Geometry",
        subtitle: "When Parallel Lines Crash",
        simple: "For a long time, people thought the world was flat like a piece of paper, but it's actually curved like a ball. In \"curved\" geometry, the rules change: parallel lines can actually crash into each other, and triangles can have more than 180 degrees! Imagine drawing a triangle on an orange; the lines curve out, making the triangle \"fat.\" This kind of math is what Einstein used to show that gravity is just the \"dip\" in space caused by heavy things like planets.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The Doppler Effect of a car passing by; the sound curves and changes as the space between you changes." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of an orange peel; round, spherical, and \"curved.\"" },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The way a round grape bursts in your mouth, releasing juice in all directions." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your hand over a globe or a basketball, feeling the constant curve." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking through a fish-eye lens that bends the straight lines of a room." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of being \"pulled\" to the side when a car turns a sharp corner." },
        ],
        intuition: "Imagine walking straight forward on a giant ball; eventually, without ever turning, you would end up right back where you started.",
        links: [
          { label: "The Physics of the Universe: Non-Euclidean", url: "https://www.physicsoftheuniverse.com/topics_bigbang_geometry.html" },
          { label: "Scientific American: Strange Geometries", url: "https://www.scientificamerican.com/article/strange-geometry/" },
          { label: "Escher Math: Hyperbolic Geometry", url: "https://en.wikipedia.org/wiki/Hyperbolic_geometry" },
        ],
        songs: [
          { title: "Space Oddity", artist: "David Bowie", url: "https://www.youtube.com/watch?v=iYYRH4apXDo" },
          { title: "Echoes", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=53N99Ek8MqI" },
          { title: "Pyramid Song", artist: "Radiohead", url: "https://www.youtube.com/watch?v=3M_Gg1xAHE4" },
        ],
        advanced: "Non-Euclidean geometry emerged when Gauss, Lobachevsky, and Riemann replaced Euclid's fifth postulate. In Hyperbolic space (constant negative curvature), triangle angles sum to less than 180°; in Elliptic space (positive curvature), greater than 180°. Riemann's work on manifolds provided the mathematical machinery for Einstein's General Relativity — proving space is not a passive flat void but a dynamic, flexible fabric that reacts to energy and mass, curving the very path of light.",
      },

      // ── 5 ── PI (π) AND CIRCULAR MOTION ──────────────────────
      {
        id: "pi-circular-motion",
        num: 5,
        icon: "π",
        title: "Pi (π) & Circular Motion",
        subtitle: "The Forever Number",
        simple: "Pi is a \"forever number\" (3.14159...) that appears every time you have a circle. If you take the string that goes around a circle and lay it across the middle, it will always fit exactly three times and a little bit more. It doesn't matter if the circle is a tiny atom or a giant star; Pi is the secret ratio. Because circles are everywhere — in wheels, clocks, and the way planets move — Pi is the heartbeat of everything that spins.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The steady, rhythmic ticking of a round clock." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a freshly baked pie; round, warm, and inviting." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A round lollipop that lasts for a long time as you swirl it." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Tracing the smooth rim of a drinking glass with your finger." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a wheel spin so fast it looks like a solid blur." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Spinning in a circle until you feel the centrifugal force pulling your arms outward." },
        ],
        intuition: "Imagine a string tied to your belly button and a pole; as you walk around the pole, you feel the constant, never-ending curve of the perfect path.",
        links: [
          { label: "Exploratorium: Pi Day", url: "https://www.exploratorium.edu/pi" },
          { label: "NASA: Why Pi Matters", url: "https://www.jpl.nasa.gov/edu/learn/tag/search/Pi" },
          { label: "Numberphile: Pi Videos", url: "https://www.numberphile.com/videos/pi" },
        ],
        songs: [
          { title: "Pi", artist: "Kate Bush", url: "https://www.youtube.com/watch?v=Mfnwgo3Edhs" },
          { title: "You Spin Me Round", artist: "Dead or Alive", url: "https://www.youtube.com/watch?v=PGNiXGX2nLU" },
          { title: "Turn! Turn! Turn!", artist: "The Byrds", url: "https://www.youtube.com/watch?v=W4ga_M5Zdn4" },
        ],
        advanced: "Pi is a transcendental, irrational number — its decimal expansion never repeats or ends. It defines the relationship between circumference and diameter (π = C/d). Beyond basic circles, Pi appears in the Gaussian distribution, the period of a pendulum, and the buckling of columns. In physics, Pi is fundamental to the Heisenberg Uncertainty Principle and the Einstein Field Equations. Its ubiquity suggests our universe has underlying spherical symmetry at its most fundamental levels.",
      },

      // ── 6 ── TOPOLOGY ────────────────────────────────────────
      {
        id: "topology",
        num: 6,
        icon: "🍩",
        title: "Topology",
        subtitle: "Stretchy Geometry — Donuts and Coffee Mugs",
        simple: "Topology is \"stretchy\" geometry. Topologists don't care how big a shape is or how many corners it has; they only care about how many holes it has! If you have a piece of playdough shaped like a donut, you can squeeze and stretch it into a coffee mug without tearing it. Because both have one hole, a topologist says they are the same shape. It's like the \"DNA\" of a shape that stays the same no matter what.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A glissando on a trombone where the note slides smoothly from low to high without breaking." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of hot rubber or stretching plastic." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A piece of saltwater taffy being pulled and twisted." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Stretching a thick rubber band between your hands." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a lava lamp where the blobs stretch and merge but never \"break\" the surface." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Reaching through a hula-hoop; your body is the line passing through the \"topology\" of the circle." },
        ],
        intuition: "Imagine your skin is a single, continuous sheet that covers your whole body; no matter how you move, the connectivity of your skin stays the same.",
        links: [
          { label: "Quanta Magazine: Topology Guide", url: "https://www.quantamagazine.org/tag/topology/" },
          { label: "Nature: The Rise of Topology", url: "https://www.nature.com/subjects/topology" },
          { label: "Math Is Fun: Topology", url: "https://www.mathsisfun.com/definitions/topology.html" },
        ],
        songs: [
          { title: "Strawberry Fields Forever", artist: "The Beatles", url: "https://www.youtube.com/watch?v=HtUH9z_Oey8" },
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" },
          { title: "Porcelain", artist: "Moby", url: "https://www.youtube.com/watch?v=13EifDb4GYs" },
        ],
        advanced: "Topology studies properties preserved under continuous deformations (stretching, crumpling, bending) but not tearing or gluing. Two spaces are homeomorphic if one can be continuously mapped to the other. The Euler Characteristic (χ = V − E + F) is a topological invariant for surfaces. In modern physics, Topological Insulators conduct electricity on their surface but insulate in their bulk. In String Theory, the way extra dimensions are curled up (Calabi-Yau manifolds) determines the fundamental constants of our universe.",
      },

      // ── 7 ── FRACTALS (GEOMETRY) ─────────────────────────────
      {
        id: "fractals-geometry",
        num: 7,
        icon: "❄️",
        title: "Fractals",
        subtitle: "The Geometry of Infinite Growth",
        simple: "A fractal is a pattern that never ends. If you zoom in on a fractal, you see the same shape over and over again, just smaller. You can see this in a head of broccoli, where each tiny branch looks like a little tree. Nature uses fractals because they are a clever way to fit a lot of \"surface\" into a small space. Your lungs use fractals to get more air, and trees use them to catch more sunlight.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "An echo that gets quieter and smaller but keeps the same shape as the original sound." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The complex, layered scent of a forest floor where everything smells like \"green\" at different levels." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A head of Romanesco broccoli; the crunchy \"math\" you can actually eat." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the rough, repeating ridges on a pinecone or a seashell." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a fern leaf where each tiny leaf is a mini version of the whole branch." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your pulse; a small rhythmic throb that is part of a larger rhythmic heart, part of a larger rhythmic life." },
        ],
        intuition: "Imagine you are standing in a hall of mirrors, and you see a small version of yourself inside a small version of yourself, going on forever into the distance.",
        links: [
          { label: "Fractal Foundation: What are Fractals?", url: "https://fractalfoundation.org/resources/what-are-fractals/" },
          { label: "TED: Benoit Mandelbrot on Fractals", url: "https://www.ted.com/talks/benoit_mandelbrot_fractals_and_the_art_of_roughness" },
          { label: "Wired: The Fractal Nature of the Universe", url: "https://www.wired.com/story/the-math-of-fractals/" },
        ],
        songs: [
          { title: "Metamorphosis One", artist: "Philip Glass", url: "https://www.youtube.com/watch?v=M73x3O7dW4A" },
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "Orinoco Flow", artist: "Enya", url: "https://www.youtube.com/watch?v=LTrk4n9WAFM" },
        ],
        advanced: "Fractal geometry, pioneered by Benoit Mandelbrot, describes \"rough\" shapes Euclidean geometry cannot — clouds, mountains, lightning. The defining characteristic is the Hausdorff dimension, often non-integer (a coastline might be 1.26D). In Chaos Theory, simple nonlinear equations lead to infinitely complex results. In medicine, fractal analysis detects cancerous growths that lose the healthy fractal branching of normal blood vessels — the mathematical bridge between order and chaos.",
      },

      // ── 8 ── THE GOLDEN RATIO (ϕ) ───────────────────────────
      {
        id: "golden-ratio-geometry",
        num: 8,
        icon: "🐚",
        title: "The Golden Ratio (ϕ)",
        subtitle: "Nature's Favorite Number",
        simple: "The Golden Ratio (about 1.618) is nature's \"favorite\" number for making things look beautiful and balanced. If you look at the seeds in a sunflower or the spiral of a seashell, they follow this specific mathematical plan. It happens when you grow by adding your past to your present (1, 1, 2, 3, 5, 8...). It helps plants pack as many seeds as possible into a circle without wasting any space.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A perfect musical resolution that feels like \"coming home\" to a peaceful chord." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a rose; the petals unfold in a perfect golden spiral." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The balanced flavor of honey; sweet in a way that feels \"natural\" and complete." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Tracing the smooth, widening curve of a large Nautilus shell." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at the Parthenon in Greece or the Mona Lisa, which use this ratio." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the natural \"swing\" of your arm; the lengths of your finger bones follow this ratio." },
        ],
        intuition: "Hold your hand up and look at your fingers; the ratio of each bone to the next is a tiny whisper of the same math that builds galaxies.",
        links: [
          { label: "National Geographic: The Golden Ratio", url: "https://www.nationalgeographic.com/science/article/golden-ratio" },
          { label: "Canva: Design and the Golden Ratio", url: "https://www.canva.com/learn/what-is-the-golden-ratio/" },
          { label: "Math Is Fun: Fibonacci Sequence", url: "https://www.mathsisfun.com/numbers/fibonacci-sequence.html" },
        ],
        songs: [
          { title: "Clair de Lune", artist: "Debussy", url: "https://www.youtube.com/watch?v=CvFH_6DNRCY" },
          { title: "Bitter Sweet Symphony", artist: "The Verve", url: "https://www.youtube.com/watch?v=1lyu1KKwC74" },
          { title: "Both Sides Now", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=Pbn6a0AFfnM" },
        ],
        advanced: "The Golden Ratio (ϕ) is the positive solution to x² − x − 1 = 0, yielding (1+√5)/2. It is the most \"irrational\" of all irrational numbers — hardest to approximate with fractions. This allows for aperiodic tiling and optimal packing in phyllotaxis, ensuring no leaf shades another excessively. Researchers have found evidence of ϕ in the fine structure of the universe and quantum resonances of cobalt niobate atoms — a fundamental tuning constant for efficient structural growth.",
      },

      // ── 9 ── DIMENSIONALITY ──────────────────────────────────
      {
        id: "dimensionality",
        num: 9,
        icon: "🧊",
        title: "Dimensionality",
        subtitle: "More Directions Than You Can See",
        simple: "We live in a 3D world: left-right, up-down, and forward-back. But math tells us there could be many more \"directions\" that we just can't see! Imagine a tiny ant crawling on a garden hose; to us, the hose is a long line, but to the ant, it's a big round tube. Scientists think the whole universe might have extra dimensions curled up so small that we don't notice them. Thinking about extra dimensions helps us understand how gravity and light might be connected in ways we haven't discovered yet.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A binaural 3D audio recording that sounds like it is moving through your head." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A smell that triggers a memory; a scent that travels through the dimension of time." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A complex dish where the flavor \"changes\" as you chew; a multi-dimensional taste experience." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Reaching into a dark bag; you have to feel the \"depth\" and \"volume\" to know what's inside." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a 3D movie with glasses; seeing the screen \"pop\" into the room." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Closing your eyes and knowing exactly where your hand is in the \"void\" of the room." },
        ],
        intuition: "Imagine you are a 2D shadow on the wall; suddenly, someone lifts you off the wall into the room — everything you knew just got a whole new side.",
        links: [
          { label: "Scientific American: Higher Dimensions", url: "https://www.scientificamerican.com/article/higher-dimensions/" },
          { label: "PBS Space Time: Extra Dimensions", url: "https://www.youtube.com/c/pbsspacetime" },
          { label: "Introduction to the 4th Dimension", url: "https://en.wikipedia.org/wiki/Four-dimensional_space" },
        ],
        songs: [
          { title: "Aquarius", artist: "The 5th Dimension", url: "https://www.youtube.com/watch?v=kjxSCAalsBE" },
          { title: "Welcome to the Machine", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=lt-udg9zQSE" },
          { title: "Clocks", artist: "Coldplay", url: "https://www.youtube.com/watch?v=d020hcWA_Wg" },
        ],
        advanced: "A dimension is the minimum number of coordinates needed to specify a point within a space. While we perceive (x, y, z), String Theory suggests 10 or 11 dimensions compactified at the Planck scale. These spaces involve Calabi-Yau manifolds — complex shapes dictating how subatomic particles vibrate. In Phase Space, a single point can represent an entire complex system using hundreds of dimensions. Mastering dimensionality lets us project high-dimensional truths into 3D models we can grasp.",
      },

      // ── 10 ── TESSELLATION (TILING) ──────────────────────────
      {
        id: "tessellation-tiling",
        num: 10,
        icon: "🐝",
        title: "Tessellation (Tiling)",
        subtitle: "The Art of Fitting In",
        simple: "Tessellation is the art of \"fitting in.\" It's when you use one shape over and over again to cover a floor or a wall perfectly, with no gaps and no overlaps. Think of a bathroom floor with square tiles or a honeycomb where bees use hexagons. Nature uses hexagons because they are the \"strongest\" way to pack things together using the least amount of wax. When things tessellate, the universe is being efficient — it doesn't like to waste space.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A canon in music (like Row, Row, Row Your Boat) where the same melody fits into itself perfectly." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a beehive — sweet wax and organized, \"tiled\" honey." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A bar of chocolate divided into perfect, repeating squares." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your hand over a brick wall; feeling the repeating seams." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at a soccer ball with its repeating pentagons and hexagons." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Marching in a group; your footsteps fitting perfectly into the rhythm of the people around you." },
        ],
        intuition: "Imagine you are a tile on a floor; you feel the push of your neighbors on every side, holding you perfectly in place in a giant, endless grid.",
        links: [
          { label: "M.C. Escher Official Website", url: "https://mcescher.com/gallery/symmetry/" },
          { label: "Science Friday: The Math of Honeycombs", url: "https://www.sciencefriday.com/topics/honeybees/" },
          { label: "Tessellation Artist", url: "https://en.wikipedia.org/wiki/Tessellation" },
        ],
        songs: [
          { title: "Seven Nation Army", artist: "The White Stripes", url: "https://www.youtube.com/watch?v=0J2QdDbelmY" },
          { title: "Gooey", artist: "Glass Animals", url: "https://www.youtube.com/watch?v=IIA1XQnAv5s" },
          { title: "Riptide", artist: "Vance Joy", url: "https://www.youtube.com/watch?v=uJ_1HMAGb4k" },
        ],
        advanced: "Tessellation is formally \"tiling a manifold.\" In 2D Euclidean space, only three regular polygons tessellate alone: equilateral triangle, square, and regular hexagon (interior angles must sum to a factor of 360°). Hexagonal tiling provides the highest area-to-perimeter ratio (the Isoperimetric Task). In chemistry, tessellation explains crystal structures and Quasicrystals — patterns filling all space but never perfectly repeating, which won the 2011 Nobel Prize. Voronoi Diagrams use tessellation to partition space by proximity, used from robot navigation to forest growth modeling.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔢 MATHEMATICS (promise) → ❌ ALGEBRA & THE UNKNOWN (algebra)
    // "Using letters to find numbers you don't know yet"
    // ═══════════════════════════════════════════════════════════════

    algebra: [

      // ── 1 ── VARIABLES: THE PLACEHOLDER ──────────────────────
      {
        id: "variables",
        num: 1,
        icon: "𝓧",
        title: "Variables: The Placeholder",
        subtitle: "X Marks the Spot",
        simple: "Algebra is like a treasure hunt where a letter like \"x\" acts as the \"X marks the spot.\" Even though we can't see the treasure yet, we know it is there, and we use the clues around it to find its value. By treating the unknown letter like a regular number, we can move it around and solve the mystery. This helps us understand that in life, we can handle things we don't fully understand yet by using what we do know.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The \"click\" of a key turning in a lock." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a fresh, blank notebook waiting for a story." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A \"mystery flavor\" candy where you try to guess the fruit." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Reaching into a dark bag to feel an object and guess what it is." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a silhouette of a person and knowing it's a friend before they step into the light." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Closing your eyes and knowing exactly where your hand is, even if you can't see it." },
        ],
        intuition: "You feel the presence of the answer before you calculate it, like a humming in your chest that gets louder as you get closer to the truth.",
        links: [
          { label: "Khan Academy: What is a Variable?", url: "https://www.khanacademy.org/math/algebra/introduction-to-algebra/overview-hist-alg/v/what-is-a-variable" },
          { label: "Math is Fun: Variables", url: "https://www.mathsisfun.com/algebra/variable.html" },
          { label: "Cool Math: Variables", url: "https://www.coolmath.com/algebra/01-solving-equations" },
        ],
        songs: [
          { title: "The Unanswered Question", artist: "Charles Ives", url: "https://www.youtube.com/watch?v=vXD4tIp8M_8" },
          { title: "Everything In Its Right Place", artist: "Radiohead", url: "https://www.youtube.com/watch?v=NUnXxh5U25Y" },
          { title: "X Marks The Spot", artist: "Coldplay", url: "https://www.youtube.com/watch?v=HzHUiPnMh_s" },
        ],
        advanced: "In higher mathematics, a variable is not merely a hidden number but an element of a set, often representing a dimension in a vector space. It serves as the foundational unit for functions f(x), where the variable maps input to output — illustrating the interconnectedness of cause and effect. This connects deeply to epistemology: the variable represents the \"Known Unknown.\" In physics, variables allow us to calculate invisible forces, proving that the unseen dictates the behavior of the seen.",
      },

      // ── 2 ── EQUALITY: THE GREAT BALANCE ─────────────────────
      {
        id: "equality",
        num: 2,
        icon: "=",
        title: "Equality: The Great Balance",
        subtitle: "The Universe's Scale",
        simple: "Equality is the rule that says the universe likes to be fair and balanced. If you have a scale and you add two pounds to one side, you must add two pounds to the other side to keep it level. In math, the equals sign is the middle of that scale, making sure both sides are the same. When we solve equations, we are just cleaning up the scale until the mystery number is all by itself.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Two musical notes played at the exact same volume and pitch." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a symmetrical garden with the same flowers on both sides." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The perfect mix of sweet and salty that cancels each other out." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Holding two identical stones, one in each hand, feeling the same weight." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at your reflection in a perfectly still lake." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Standing on one leg and feeling your muscles twitch to keep your center of gravity perfect." },
        ],
        intuition: "A feeling of \"rightness\" or \"settling\" in your gut when a problem is finally solved and the balance is restored.",
        links: [
          { label: "Math Antics: Basics of Equations", url: "https://www.youtube.com/c/mathantics" },
          { label: "Wolfram MathWorld: Equality", url: "https://mathworld.wolfram.com/Equal.html" },
          { label: "PBS Learning: Balancing Equations", url: "https://www.pbslearningmedia.org/subjects/mathematics/" },
        ],
        songs: [
          { title: "Equal Rights", artist: "Peter Tosh", url: "https://www.youtube.com/watch?v=6m2YDaGzFJ8" },
          { title: "Black or White", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=F2AitTPI5U0" },
          { title: "Balance", artist: "Earl Sweatshirt", url: "https://www.youtube.com/watch?v=r70goaDbjZE" },
        ],
        advanced: "Equality in algebra is an equivalence relation defined by reflexivity, symmetry, and transitivity. It is the symbolic bedrock of conservation — nothing is lost, only rearranged. When we manipulate an equation, we perform an isomorphism: changing the form without altering the underlying essence. This mirrors the philosophical concept of Unity — the observer and the observed are two sides of the same equation, balanced perfectly within the vacuum of existence.",
      },

      // ── 3 ── INVERSE OPERATIONS: THE WAY BACK HOME ───────────
      {
        id: "inverse-operations",
        num: 3,
        icon: "⟲",
        title: "Inverse Operations: The Way Back Home",
        subtitle: "Untying Every Knot",
        simple: "Inverse operations are like being able to walk backward to where you started if you get lost. If a math problem adds 5 to a secret number, you can subtract 5 to find out what the number was. It is like untying a knot by doing the opposite of how it was tied. This shows us that every path can be retraced and every mistake can be undone if we know the right steps.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A recording of a bell being played in reverse." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Walking out of a smoky room into the fresh, crisp air." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a slice of lemon to wash away the taste of something too sugary." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling a tight muscle finally relax and let go." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a video of a glass shattering played backward until it is whole again." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Walking backward through a doorway you just entered." },
        ],
        intuition: "A sudden \"unwinding\" feeling in your mind, like a puzzle piece finally clicking into place after being turned the right way.",
        links: [
          { label: "BBC Bitesize: Inverse Operations", url: "https://www.bbc.co.uk/bitesize/guides/z3xbcwx/revision/1" },
          { label: "MathIsFun: Inverse Operations", url: "https://www.mathsisfun.com/numbers/inverse-operations.html" },
          { label: "Study.com: Inverse Operations in Algebra", url: "https://study.com/academy/lesson/inverse-operations-in-math-definition-examples.html" },
        ],
        songs: [
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Reverse", artist: "Greg Laswell", url: "https://www.youtube.com/watch?v=SJhBTnECnnE" },
          { title: "Backwards", artist: "Tame Impala", url: "https://www.youtube.com/watch?v=V2fpgpanZAw" },
        ],
        advanced: "In abstract algebra, this is the Inverse Element within a group. For every operation in a system, there exists a counter-operation returning the system to its identity state (0 or 1), ensuring the system is reversible and logically consistent. This connects to the concept of Reciprocity — for every winding of the soul's journey, there is a winding back toward the source, a path of return mathematically guaranteed by the laws of the universe.",
      },

      // ── 4 ── CONSTANTS: THE NORTH STAR ───────────────────────
      {
        id: "constants",
        num: 4,
        icon: "⚓",
        title: "Constants: The North Star",
        subtitle: "The Rock in the River",
        simple: "A constant is a number that never, ever changes, no matter what else is happening in the problem. While the \"x\" and \"y\" are jumping around and changing their values, the constant stays exactly where it is. It is like a sturdy rock in the middle of a rushing river that you can hold onto to keep from being swept away. Even when life feels crazy and everything is moving, there are some truths that are always solid.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A single, steady hum that stays at the same volume forever." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of old books in a library that never changes." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The taste of pure water, which is always the same everywhere." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Leaning your back against a giant oak tree that doesn't budge." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Looking at the North Star in the sky while all the other stars seem to move." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your feet planted firmly on the ground while you spin your arms." },
        ],
        intuition: "A deep sense of knowing that something is permanent, like the love of a parent or the rising of the sun.",
        links: [
          { label: "MathIsFun: Constants", url: "https://www.mathsisfun.com/algebra/constant.html" },
          { label: "Britannica: Mathematical Constants", url: "https://www.britannica.com/science/mathematical-constant" },
          { label: "Constants in Algebra", url: "https://en.wikipedia.org/wiki/Constant_(mathematics)" },
        ],
        songs: [
          { title: "Stand By Me", artist: "Ben E. King", url: "https://www.youtube.com/watch?v=hwZNL7QVJjE" },
          { title: "True", artist: "Spandau Ballet", url: "https://www.youtube.com/watch?v=AR8D2yqgQ1U" },
          { title: "Constant Craving", artist: "k.d. lang", url: "https://www.youtube.com/watch?v=oXqPjl9WlKw" },
        ],
        advanced: "Constants represent the Invariants of a system. In physics, constants like c (the speed of light) or G (the gravitational constant) define the very fabric of our reality. Without these fixed values, the universe would lack the coherence required for complex life to emerge. They are the Still Point in the turning world, providing the framework for all relational dynamics.",
      },

      // ── 5 ── EXPRESSIONS VS. EQUATIONS ───────────────────────
      {
        id: "expressions-equations",
        num: 5,
        icon: "📖",
        title: "Expressions vs. Equations",
        subtitle: "The Story vs. The Truth",
        simple: "Think of an expression like a phrase, like saying \"three red apples.\" It tells you something, but it doesn't tell the whole story yet. An equation is like a full sentence that says, \"Three red apples cost five dollars.\" The equation uses an equals sign to connect two ideas and tell us a complete truth. Expressions are the building blocks we use to describe things, and equations are the tools we use to solve things.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A single musical chord (expression) versus a finished song (equation)." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of ingredients (expression) versus the smell of a finished cake (equation)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Tasting a pinch of salt (expression) versus a perfectly seasoned soup (equation)." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Touching a single brick (expression) versus leaning against a finished wall (equation)." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a single puzzle piece (expression) versus the finished picture (equation)." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Moving your arm (expression) versus catching a ball perfectly (equation)." },
        ],
        intuition: "The feeling of a lightbulb going off when a bunch of random thoughts finally click into a realization.",
        links: [
          { label: "Difference: Expression vs Equation", url: "https://www.mathsisfun.com/algebra/equation-expression.html" },
          { label: "Khan Academy: Equations vs Expressions", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra" },
          { label: "MathIsFun: Algebraic Expressions", url: "https://www.mathsisfun.com/algebra/algebraic-expressions.html" },
        ],
        songs: [
          { title: "Words", artist: "Bee Gees", url: "https://www.youtube.com/watch?v=MbBwBbqSUfg" },
          { title: "The Way It Is", artist: "Bruce Hornsby", url: "https://www.youtube.com/watch?v=GlRQjzltaMQ" },
          { title: "Logical Song", artist: "Supertramp", url: "https://www.youtube.com/watch?v=low6Coqrw9Y" },
        ],
        advanced: "Expressions are elements of a formal language, while equations are predicates asserting a relationship. In formal logic, an expression is a \"term\" while an equation is a \"formula\" with a truth value. This distinction is vital for understanding Syntax (how we say things) versus Semantics (what those things actually mean) — the architecture underlying all mathematical communication.",
      },

      // ── 6 ── SUBSTITUTION: THE GREAT EXCHANGE ────────────────
      {
        id: "substitution",
        num: 6,
        icon: "🔄",
        title: "Substitution: The Great Exchange",
        subtitle: "Swapping Symbols for Truth",
        simple: "Substitution is like having a substitute teacher take the place of your regular teacher for a day. In math, if we find out that x is actually the number 5, we can take x out and put 5 in its place. This helps us check our work and see if the balance of the equation still holds up. By swapping symbols for numbers, we turn a mystery into a fact.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A singer covering a song and making it sound the same but different." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Swapping a real lemon for lemon zest in a recipe." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Replacing sugar with honey in your tea." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Changing from a heavy winter coat to a light jacket that covers the same skin." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing a stunt double in a movie who looks just like the actor." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Using a prosthetic limb that moves exactly like your real one used to." },
        ],
        intuition: "The feeling of \"Aha!\" when you realize that two different things are actually telling the same story.",
        links: [
          { label: "Substitution in Algebra", url: "https://www.mathsisfun.com/algebra/substitution.html" },
          { label: "Khan Academy: Evaluating with Substitution", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:eval-expressions/v/expression-terms-factors-and-coefficients" },
          { label: "Purplemath: Substitution", url: "https://www.purplemath.com/modules/evaluate.htm" },
        ],
        songs: [
          { title: "The Substitute", artist: "The Who", url: "https://www.youtube.com/watch?v=SG4oYaiBTnY" },
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=pl3vxEudif8" },
        ],
        advanced: "Substitution is the operationalization of Identity. In calculus, u-substitution simplifies complex integrals by mapping them into a more manageable space. It is a fundamental tool for Reductionism — breaking a complex problem into simpler, equal components without losing any information. It proves that the same truth can wear different masks.",
      },

      // ── 7 ── ORDER OF OPERATIONS ─────────────────────────────
      {
        id: "order-of-operations",
        num: 7,
        icon: "🪜",
        title: "Order of Operations",
        subtitle: "The Universal Recipe",
        simple: "The Order of Operations (PEMDAS) is like a recipe that tells you which ingredient to put in the bowl first. If you bake a cake by putting the frosting in the oven before the flour, it will be a mess! In math, we always do Parentheses first, then Exponents, then Multiplication and Division, and finally Addition and Subtraction. This rule makes sure that everyone in the whole world gets the same answer to the same problem.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A conductor starting the violins before the drums in an orchestra." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of onions sautéing before you add the garlic." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Tasting the layers of a sandwich in the order they were stacked." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Putting on your socks before your shoes." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching a flower bloom in stages — bud, then petal, then full flower." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your knees bend before you jump into the air." },
        ],
        intuition: "A feeling of flow when you do things in the right sequence, like a dance where every step follows the beat.",
        links: [
          { label: "Math Antics: Order of Operations", url: "https://www.youtube.com/watch?v=dAgfnK528RA" },
          { label: "Purplemath: PEMDAS", url: "https://www.purplemath.com/modules/orderops.htm" },
          { label: "Study.com: Order of Operations", url: "https://study.com/academy/lesson/order-of-operations-definition-examples.html" },
        ],
        songs: [
          { title: "Step by Step", artist: "New Kids on the Block", url: "https://www.youtube.com/watch?v=ay6GjmiJTPM" },
          { title: "Chain Reaction", artist: "Diana Ross", url: "https://www.youtube.com/watch?v=lfBdGT4dn4E" },
          { title: "One Step at a Time", artist: "Jordin Sparks", url: "https://www.youtube.com/watch?v=IFAbootCwbk" },
        ],
        advanced: "This is the Hierarchy of Operations. In computer science, it is known as Operator Precedence — ensuring algorithms are deterministic, meaning the same input always produces the same output. This reflects the Causal Order of the universe, where certain events must precede others to create a stable reality. Without hierarchy, communication collapses into ambiguity.",
      },

      // ── 8 ── THE COORDINATE PLANE ────────────────────────────
      {
        id: "coordinate-plane",
        num: 8,
        icon: "🌐",
        title: "The Coordinate Plane",
        subtitle: "The Map of Truth",
        simple: "The coordinate plane is like a giant map where every point has a special address made of two numbers. One number tells you how far to move left or right, and the other tells you how far to move up or down. By connecting these points, we can turn math problems into beautiful shapes and lines. It shows us that math isn't just numbers on a page; it is something we can see and move through.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Hearing a sound move from your left ear to your right ear." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smelling a grill and walking toward it as the scent gets stronger." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Tasting a \"map\" of flavors on your tongue — sweet at the tip, bitter at the back." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the bumps on a globe to find where you are." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Seeing the grid lines on a piece of graph paper or a city map." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Knowing exactly where your body is in a dark room." },
        ],
        intuition: "The click of orientation — that feeling when you finally know exactly where you are and which way to go.",
        links: [
          { label: "Khan Academy: Coordinate Plane", url: "https://www.khanacademy.org/math/basic-geo/basic-geo-coord-plane" },
          { label: "MathIsFun: Cartesian Coordinates", url: "https://www.mathsisfun.com/data/cartesian-coordinates.html" },
          { label: "Coordinate Plane Games", url: "https://www.mathplayground.com/locate_aliens.html" },
        ],
        songs: [
          { title: "Maps", artist: "Maroon 5", url: "https://www.youtube.com/watch?v=PYa7b3gM5TA" },
          { title: "Point of No Return", artist: "Kansas", url: "https://www.youtube.com/watch?v=t7OBwxfOdHs" },
          { title: "Directions", artist: "Josh Rouse", url: "https://www.youtube.com/watch?v=5YqW_eMqpFk" },
        ],
        advanced: "The Cartesian plane is the foundation of Analytic Geometry — the bridge between algebra and shape. It allows us to visualize complex functions as physical manifolds. This represents Dimensionality: reality can be mapped across multiple axes (time, space, probability) to find the intersection of truth. Every choice we make has coordinates.",
      },

      // ── 9 ── SIMPLIFYING: FINDING THE DIAMOND ────────────────
      {
        id: "simplifying",
        num: 9,
        icon: "💎",
        title: "Simplifying: Finding the Diamond",
        subtitle: "Clearing the Mess to See the Truth",
        simple: "Simplifying is like cleaning your room so you can finally find your favorite toy buried under all the mess. In math, problems often look scary and long, but we can use rules to make them shorter and easier to read. We combine \"like terms\" until the true answer shines through. The most complicated things in life usually have a very simple heart. If we clear away the extra stuff, the truth will be easy to see.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A loud, messy noise turning into a single, clear note." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of clean air after a rainstorm washes away the dust." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The simple, perfect taste of a fresh strawberry without any sugar added." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Peeling away a rough shell to find a smooth pearl inside." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Squinting your eyes until a blurry picture becomes clear." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Taking a deep breath and feeling your body become light and calm." },
        ],
        intuition: "A feeling of relief and clarity, like a heavy weight being lifted off your shoulders.",
        links: [
          { label: "Simplifying Expressions", url: "https://www.mathsisfun.com/algebra/simplifying.html" },
          { label: "Khan Academy: Combining Like Terms", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:combine-like-terms/v/combining-like-terms" },
          { label: "Simplify Math Problems Online", url: "https://www.symbolab.com/solver/simplify-calculator" },
        ],
        songs: [
          { title: "Simple Man", artist: "Lynyrd Skynyrd", url: "https://www.youtube.com/watch?v=sMmTkKz60W8" },
          { title: "Pure and Simple", artist: "Hear'Say", url: "https://www.youtube.com/watch?v=GkwTP02MMYQ" },
          { title: "Simplify", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" },
        ],
        advanced: "Simplifying is the practice of Lossless Compression and Occam's Razor. It is the process of reducing entropy within a symbolic system. By identifying the Lowest Common Denominator or the Essential Form, we move closer to the Singularity of truth where all complexity resolves into a unified principle. Simple equals strong.",
      },

      // ── 10 ── WORD PROBLEMS: MATH IN THE REAL WORLD ──────────
      {
        id: "word-problems",
        num: 10,
        icon: "🌍",
        title: "Word Problems: Math in the Real World",
        subtitle: "Translating Stories Into Equations",
        simple: "Word problems are math stories that happen in real life. Instead of just seeing x + 2 = 5, you might hear a story about a kid who has some cookies, gets 2 more, and now has 5. Our job is to be \"math translators\" who turn the words of the story into the language of algebra. Math isn't just a school subject; it is a superpower that helps us solve real problems in the world.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Hearing a secret message and knowing exactly what it means." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Smelling wood smoke and knowing someone is having a campfire nearby." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Eating a dish and being able to name every spice the chef used." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the wind on your face and knowing which direction it is blowing." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Reading a book and seeing the movie play out in your head." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling the way your body moves to understand how to ride a bike." },
        ],
        intuition: "The feeling of Connection — the moment you realize that the math on your paper is the same thing as the world outside your window.",
        links: [
          { label: "Algebra Word Problems", url: "https://www.mathsisfun.com/algebra/word-questions-solving.html" },
          { label: "Khan Academy: Linear Equation Word Problems", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-word-problems" },
          { label: "Purplemath: Translating Word Problems", url: "https://www.purplemath.com/modules/translat.htm" },
        ],
        songs: [
          { title: "Story of My Life", artist: "One Direction", url: "https://www.youtube.com/watch?v=W-TE_Iibqko" },
          { title: "Real World", artist: "Matchbox Twenty", url: "https://www.youtube.com/watch?v=OdlVuBs0hHs" },
          { title: "Everything is Everything", artist: "Lauryn Hill", url: "https://www.youtube.com/watch?v=i3_dOWYHS7I" },
        ],
        advanced: "Word problems are Mathematical Modeling — the mapping of reality onto a formal system. This is the essence of science: taking a phenomenon (the story) and extracting its mathematical invariants to predict future behavior. It connects Subjective Experience to Objective Logic, proving that we are all part of one giant, solvable equation.",
      },

    ],

    // ═══════════════════════════════════════════════════════════════
    // 🔢 MATHEMATICS (promise) → 🎲 PROBABILITY & CHANCE (probability)
    // "The Math of Maybe — how the universe negotiates chaos & order"
    // ═══════════════════════════════════════════════════════════════

    probability: [

      // ── 1 ── LAW OF LARGE NUMBERS ────────────────────────────
      {
        id: "law-large-numbers",
        num: 1,
        icon: "📈",
        title: "The Law of Large Numbers",
        subtitle: "Luck Balances Out",
        simple: "Imagine you have a magic coin that you flip over and over again. If you only flip it three times, you might get three heads in a row. But if you flip it a thousand times, it ends up landing on heads about half the time and tails about half the time. The more we try something, the more the \"luck\" balances out into a steady pattern. It's like watching a big crowd from far away; you can't guess what one person will do, but you can see where the whole group is moving.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The steady, rhythmic patter of rain on a roof that eventually creates a constant hum." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The scent of a pine forest where a million needles combine to create one single, strong aroma." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A single grain of salt vs. a spoonful; the flavor only becomes \"true\" when there is enough of it." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the smoothness of a polished river stone shaped by millions of tiny water splashes." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching thousands of beads fall into a perfect bell curve." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of finding your balance on a bike after practicing for many hours." },
        ],
        intuition: "The world has an underlying order even when things seem random at first. Flip the coin enough times, and truth emerges from chaos.",
        links: [
          { label: "Wolfram MathWorld: Law of Large Numbers", url: "https://mathworld.wolfram.com/LawofLargeNumbers.html" },
          { label: "Khan Academy: Probability & Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
          { label: "Britannica: Law of Large Numbers", url: "https://www.britannica.com/science/law-of-large-numbers" },
        ],
        songs: [
          { title: "The Gambler", artist: "Kenny Rogers", url: "https://www.youtube.com/watch?v=7hx4gdlfamo" },
          { title: "Keep on Pushing", artist: "The Impressions", url: "https://www.youtube.com/watch?v=UVxUOFPrUF0" },
          { title: "Every Little Thing She Does Is Magic", artist: "The Police", url: "https://www.youtube.com/watch?v=aENX1Sf3fgQ" },
        ],
        advanced: "The Law of Large Numbers (LLN) guarantees the stability of long-term results of random variables. The Weak form (Khinchin's Law) states sample averages converge in probability toward the expected value. The Strong form (Kolmogorov's Law) asserts convergence almost surely. It is the mathematical bridge between theoretical probability and empirical observation — connecting to the thermodynamic limit in physics and the wisdom of the crowd in social sciences.",
      },

      // ── 2 ── PROBABILITY AXIOMS ──────────────────────────────
      {
        id: "probability-axioms",
        num: 2,
        icon: "⚖️",
        title: "Probability Axioms (Kolmogorov)",
        subtitle: "The Floor and the Ceiling of Maybe",
        simple: "Probability is like a set of rules for a fair game that everyone in the universe has to play. The first rule is that something can't have a \"less than zero\" or \"more than 100%\" chance of happening. The second rule is that if you add up every single thing that could happen, it always equals exactly one whole. These rules act like the floor and the ceiling of a room, keeping all the math safe and organized.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A single, clear note on a piano that represents \"1\" vs. total silence which is \"0.\"" },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of clean air — the baseline zero from which all other scents start." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Pure water, the neutral state before you add flavors." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Touching a flat, level table that shows you exactly where the surface of reality is." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A line showing \"Impossible\" on one side and \"Certain\" on the other." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Standing perfectly still and feeling your center of gravity — the baseline of balance." },
        ],
        intuition: "Without these boundaries, we couldn't measure hope or calculate risk. Everything adds up to One.",
        links: [
          { label: "Stanford Encyclopedia: Interpretations of Probability", url: "https://plato.stanford.edu/entries/probability-interpret/" },
          { label: "Wikipedia: Probability Axioms", url: "https://en.wikipedia.org/wiki/Probability_axioms" },
          { label: "Stat Trek: Axioms of Probability", url: "https://stattrek.com/probability/probability-rules" },
        ],
        songs: [
          { title: "One", artist: "Three Dog Night", url: "https://www.youtube.com/watch?v=d5ab8BOu4LE" },
          { title: "Balance", artist: "Earl Sweatshirt", url: "https://www.youtube.com/watch?v=r70goaDbjZE" },
          { title: "Everything In Its Right Place", artist: "Radiohead", url: "https://www.youtube.com/watch?v=NUnXxh5U25Y" },
        ],
        advanced: "Kolmogorov's Axioms provide the formal logical framework for measure-theoretic probability. By defining probability as a measure on a sigma-algebra of subsets of a sample space, we ensure internal consistency — enabling stochastic calculus and rigorous hypothesis testing. This mirrors the Golden Mean in philosophy and Ma'at in ancient Egyptian thought: existence is bound by cosmic laws that prevent chaos from overwhelming the design.",
      },

      // ── 3 ── BAYES' THEOREM ──────────────────────────────────
      {
        id: "bayes-theorem",
        num: 3,
        icon: "🔄",
        title: "Bayes' Theorem",
        subtitle: "The Detective Who Changes Their Mind",
        simple: "Bayes' Theorem is like being a detective who changes their mind when they find a new clue. Usually, people pick an idea and stick to it, but this math says we should start with what we think is true and then move that idea every time we see something new. If you think it's going to rain, but then you see blue sky, you use it to update your \"rain score.\" It turns \"maybe\" into a living, breathing number that grows as we learn.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A song that starts with one instrument and slowly adds more, changing how the music feels." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Walking toward a bakery and the smell getting stronger with every step." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Adding a pinch of sugar to a sauce and tasting how it changes the whole flavor profile." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Feeling the temperature of bathwater and adjusting the tap until it's just right." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A circle shifting its position as new data points appear." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Adjusting your lean while walking against a strong wind." },
        ],
        intuition: "Truth is not a destination but a process of constant refinement. Every new clue reshapes the map.",
        links: [
          { label: "3Blue1Brown: Bayes' Theorem (Video)", url: "https://www.youtube.com/watch?v=HZGCoVF3YvM" },
          { label: "Bayesian Statistics Explained", url: "https://en.wikipedia.org/wiki/Bayesian_statistics" },
          { label: "Britannica: Bayes' Theorem", url: "https://www.britannica.com/topic/Bayes-theorem" },
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=pl3vxEudif8" },
          { title: "New Person, Same Old Mistakes", artist: "Tame Impala", url: "https://www.youtube.com/watch?v=pepUCL3FLWU" },
          { title: "I Can See Clearly Now", artist: "Johnny Nash", url: "https://www.youtube.com/watch?v=FscIgtDJFXg" },
        ],
        advanced: "Bayes' Theorem — P(A|B) = P(B|A)P(A)/P(B) — describes the probability of an event based on prior knowledge of conditions related to the event. It is the mathematical heart of learning. Unlike frequentist statistics (fixed limits), Bayesianism treats probability as a degree of belief that evolves. This aligns with continuous revelation and the Hegelian dialectic — the synthesis of old ideas with new evidence to reach a higher state of truth.",
      },

      // ── 4 ── CENTRAL LIMIT THEOREM ───────────────────────────
      {
        id: "central-limit-theorem",
        num: 4,
        icon: "🔔",
        title: "Central Limit Theorem",
        subtitle: "The Universe's Favorite Shape",
        simple: "The Central Limit Theorem is a miracle of math that shows how \"messy\" things like to become \"neat\" when they gather together. If you take a bunch of random numbers from almost anywhere and add them up, they will almost always form a beautiful bell shape. This bell curve is the universe's favorite shape. It shows that most things are \"average\" and sit in the middle, while very few things are at the far edges. Even though everyone is different, when we stand together we create a balanced pattern.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A large choir where many different voices blend into one smooth, ringing chord." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The combined scent of a grocery store produce section — many smells becoming one \"fresh\" smell." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A well-blended smoothie where you can't taste the individual fruits anymore, just a unified flavor." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your hand over a fleece blanket; feeling the softness of millions of tiny fibers together." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "The iconic, symmetrical bell curve where the peak is the average." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of a groove when walking in a large, synchronized parade." },
        ],
        intuition: "Universal Truth is not found in examining a single isolated point, but in the emergent properties of the whole system — the mathematical proof of the Everlasting We.",
        links: [
          { label: "Investopedia: Central Limit Theorem", url: "https://www.investopedia.com/terms/c/central_limit_theorem.asp" },
          { label: "Interactive CLT Simulation", url: "https://seeing-theory.brown.edu/probability-distributions/index.html" },
          { label: "Seeing Theory: CLT", url: "https://seeing-theory.brown.edu/" },
        ],
        songs: [
          { title: "Arrival of the Birds", artist: "The Cinematic Orchestra", url: "https://www.youtube.com/watch?v=MqoANESQ4cQ" },
          { title: "Don't Dream It's Over", artist: "Crowded House", url: "https://www.youtube.com/watch?v=J9gKyRmic20" },
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsOU" },
        ],
        advanced: "The CLT states that the distribution of sample means approximates a normal distribution as sample size grows, regardless of the population's actual distribution shape (given finite variance). This is why the Gaussian appears from height measurements to error analysis. It is a profound indicator of Unity in Diversity — proving that while individual events may appear chaotic, the aggregate functions with predictable, almost deterministic harmony.",
      },

      // ── 5 ── CONDITIONAL PROBABILITY ─────────────────────────
      {
        id: "conditional-probability",
        num: 5,
        icon: "🔗",
        title: "Conditional Probability",
        subtitle: "How Things Are Linked",
        simple: "Conditional probability is about how things are linked together in a chain. It asks: \"If this thing happened, how much does it change the chance of that next thing happening?\" The chance of you wearing a coat is small, but if it is snowing, that chance becomes very high. Nothing in the world happens in a vacuum. Everything is connected to what came before it. By looking at these links, we can understand the hidden strings that pull on our lives every day.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A call and response in music — the second sound only makes sense because of the first." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of smoke leading you to look for a fire." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The way a drink tastes different after you've just eaten something very spicy." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Pulling on a thread and feeling the rest of the fabric tighten up." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Branching paths where each choice limits or expands the next options." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "How your body automatically tenses up when you see a step is higher than you thought." },
        ],
        intuition: "Our current state is always a given condition for our future possibilities — the math of Karma, cause and effect.",
        links: [
          { label: "Yale University: Conditional Probability", url: "https://www.stat.yale.edu/Courses/1997-98/101/condprob.htm" },
          { label: "Intuition for Conditional Probability", url: "https://www.betterexplained.com/articles/understanding-bayes-theorem-with-ratios/" },
          { label: "Math is Fun: Conditional Probability", url: "https://www.mathsisfun.com/data/probability-events-conditional.html" },
        ],
        songs: [
          { title: "Chain of Fools", artist: "Aretha Franklin", url: "https://www.youtube.com/watch?v=crmOFNiMTlE" },
          { title: "If I Ain't Got You", artist: "Alicia Keys", url: "https://www.youtube.com/watch?v=Ju8Hr50Ckwk" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
        ],
        advanced: "Defined as P(A|B) = P(A∩B)/P(B), conditional probability studies how information reduces uncertainty. It is the basis for Markov Chains and much of modern machine learning, exploring the interconnectedness of variables within a system. Philosophically, this is the math of Cause and Effect — our current state is always a \"given\" condition for future possibilities, emphasizing the present moment as the foundation for what follows.",
      },

      // ── 6 ── INDEPENDENT VS. DEPENDENT EVENTS ────────────────
      {
        id: "independent-dependent",
        num: 6,
        icon: "🧩",
        title: "Independent vs. Dependent Events",
        subtitle: "Best Friends or Strangers",
        simple: "This concept helps us see if two things are \"best friends\" or just \"strangers.\" If you flip a coin and then roll a die, the coin doesn't care what the die did — they are independent. But if you take a red marble out of a bag, there are fewer red marbles left for the next person — that is a dependent event. Understanding this helps us know when to treat a new moment as a fresh start and when the past is still affecting the present.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "Two people singing different songs at once (independent) vs. two people singing a duet (dependent)." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a flower in a garden (independent of the car driving by) vs. cookies baking (dependent on the oven being on)." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "Drinking water between bites to make each taste independent of the last." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Bumping into a wall (independent) vs. holding someone's hand (dependent)." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Venn diagrams showing circles that don't touch vs. circles that overlap." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Walking by yourself vs. walking in a three-legged race." },
        ],
        intuition: "The balance between our independent self-will and our dependent communal existence. Individual points of consciousness, yet fundamentally part of the Great Whole.",
        links: [
          { label: "Khan Academy: Independent Events", url: "https://www.khanacademy.org/math/ap-statistics/probability-ap/stats-conditional-probability/v/independent-events" },
          { label: "MathGoodies: Independent Events", url: "https://www.mathgoodies.com/lessons/vol6/independent_events" },
          { label: "Varsity Tutors: Dependent Events", url: "https://www.varsitytutors.com/hotmath/hotmath_help/topics/dependent-events" },
        ],
        songs: [
          { title: "Independent Women Part 1", artist: "Destiny's Child", url: "https://www.youtube.com/watch?v=0lPQZni7I18" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAQo" },
          { title: "Stand By Me", artist: "Ben E. King", url: "https://www.youtube.com/watch?v=hwZNL7QVJjE" },
        ],
        advanced: "Independence means P(A∩B) = P(A)P(B) — event A does not change event B's probability. Dependency suggests an underlying mechanism or shared sample space linking outcomes. Distinguishing between the two is vital for avoiding statistical bias and correctly modeling complex systems. This mirrors the human journey: the balance between individual agency and communal existence.",
      },

      // ── 7 ── EXPECTED VALUE ──────────────────────────────────
      {
        id: "expected-value",
        num: 7,
        icon: "🎯",
        title: "Expected Value",
        subtitle: "The Spirit of the Game",
        simple: "Expected value is like the \"spirit\" of a game. It doesn't tell you exactly what will happen this time, but it tells you what will happen on average if you play forever. If a game has an expected value of five dollars, you might win ten or zero today, but the \"truth\" of the game is five dollars. It helps us look past the tiny wins and losses of today to see the big picture. Trust that as long as you're doing the right things, the average of your life will turn out okay.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The tonic or home note of a scale that the music always wants to return to." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The base note of a perfume that lingers long after the top notes are gone." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The aftertaste that defines the quality of a meal." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of a steady, rhythmic heartbeat." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A weighted average shown on a balance beam." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Your posture — the default way your body wants to stand when you aren't thinking about it." },
        ],
        intuition: "While the immediate outcome of a virtuous act might be invisible, its long-term Expected Value contributes to the positive total of the universe.",
        links: [
          { label: "Brilliant.org: Expected Value", url: "https://brilliant.org/wiki/expected-value/" },
          { label: "Farnam Street: Expected Value in Life", url: "https://fs.blog/expected-value/" },
          { label: "Wikipedia: Expected Value", url: "https://en.wikipedia.org/wiki/Expected_value" },
        ],
        songs: [
          { title: "The Long and Winding Road", artist: "The Beatles", url: "https://www.youtube.com/watch?v=fR4HjTH_fTM" },
          { title: "Waiting on the World to Change", artist: "John Mayer", url: "https://www.youtube.com/watch?v=oBIxScJ5rlY" },
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
        ],
        advanced: "E[X] is the summation of all possible outcomes weighted by their probabilities — the center of mass of a probability distribution. In decision theory, it maximizes utility under uncertainty. Expected Value is the Dharma or Intrinsic Worth of an action. The immediate outcome of a virtuous act may be invisible, but its long-term expected value contributes to the positive total of the universe.",
      },

      // ── 8 ── THE GAMBLER'S FALLACY ───────────────────────────
      {
        id: "gamblers-fallacy",
        num: 8,
        icon: "🚫",
        title: "The Gambler's Fallacy",
        subtitle: "The Coin Has No Memory",
        simple: "This is a trick our brains play on us. If a coin lands on Heads five times, our brains scream, \"The next one must be tails!\" But the coin doesn't have a memory. The Gambler's Fallacy is a lie that tells us the universe \"owes\" us a certain result. Learning this helps us stay grounded in reality. Every new moment is a clean slate, and we shouldn't carry the \"debts\" of the past into the possibilities of the future.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "A random noise generator where every click is totally new and unrelated to the last one." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "Stepping outside into fresh air after being in a stuffy room — the \"reset\" smell." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A palate cleanser like ginger between pieces of sushi." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Splashing cold water on your face to wake up to the present." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A roulette wheel — a reminder that the wheel doesn't remember the last number." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Shaking out your arms and legs to let go of tension from a few minutes ago." },
        ],
        intuition: "An invitation to Be Here Now. Each moment is a singular, unconditioned event — Beginner's Mind.",
        links: [
          { label: "Psychology Today: Gambler's Fallacy", url: "https://www.psychologytoday.com/us/basics/gamblers-fallacy" },
          { label: "The Monte Carlo Fallacy", url: "https://en.wikipedia.org/wiki/Gambler%27s_fallacy" },
          { label: "Decision Lab: Gambler's Fallacy", url: "https://thedecisionlab.com/biases/gamblers-fallacy" },
        ],
        songs: [
          { title: "Luck Be a Lady", artist: "Frank Sinatra", url: "https://www.youtube.com/watch?v=Ib3cfGPmneQ" },
          { title: "Against All Odds", artist: "Phil Collins", url: "https://www.youtube.com/watch?v=uVjEIpoB-SE" },
          { title: "Start Me Up", artist: "Rolling Stones", url: "https://www.youtube.com/watch?v=SGyOaCXr8Lw" },
        ],
        advanced: "The Gambler's Fallacy is the cognitive bias where an individual erroneously believes a random event is less or more likely based on previous outcomes. It is a failure to understand Independent Trials. This challenges the human tendency to project patterns onto randomness and encourages Shoshin (Beginner's Mind) — where each moment is experienced as a singular, unconditioned event free from the weight of history.",
      },

      // ── 9 ── COMBINATORICS ───────────────────────────────────
      {
        id: "combinatorics",
        num: 9,
        icon: "📦",
        title: "Combinatorics",
        subtitle: "The Magic of Arrangement",
        simple: "Combinatorics is the study of how many different ways things can be put together. It's like having a box of LEGOs and trying to figure out every single possible thing you could build. Even with just a few simple pieces, the number of ways they can connect is almost infinite. It reveals the \"Magic of Maybe\" — that from a small set of stars, we get billions of galaxies. We have so many more choices and combinations in our lives than we think we do.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "All the different songs that can be made from just 12 notes on a scale." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "A spice rack where mixing just three spices can create hundreds of different aromas." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "The \"secret sauce\" made by combining common ingredients in a new way." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "The feeling of a combination lock clicking into place." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "A geometric representation of combinations and patterns — a kaleidoscope." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "Feeling your fingers move to different positions to play different chords on a guitar." },
        ],
        intuition: "We are all made of the same atoms, just combined in unique, miraculous ways. Infinite Diversity in Infinite Combinations.",
        links: [
          { label: "Introduction to Combinatorics", url: "https://en.wikipedia.org/wiki/Combinatorics" },
          { label: "BetterExplained: Permutations & Combinations", url: "https://betterexplained.com/articles/easy-permutations-and-combinations/" },
          { label: "Britannica: Combinatorics", url: "https://www.britannica.com/science/combinatorics" },
        ],
        songs: [
          { title: "God Only Knows", artist: "The Beach Boys", url: "https://www.youtube.com/watch?v=EkPy18xW1j8" },
          { title: "What a Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=A3yCcXgbKrE" },
          { title: "Kaleidoscope", artist: "Coldplay", url: "https://www.youtube.com/watch?v=K0KMaRm_g8M" },
        ],
        advanced: "Combinatorics involves permutations (order matters) and combinations (order doesn't), using factorials and binomial coefficients to map the State Space of a system. Fundamental to cryptography, computer science, and statistical mechanics. It mirrors Infinite Diversity in Infinite Combinations — the One (source) manifests as the Many through the mathematical beauty of arrangement.",
      },

      // ── 10 ── ENTROPY ────────────────────────────────────────
      {
        id: "entropy-probability",
        num: 10,
        icon: "🌌",
        title: "Entropy (Information Theory)",
        subtitle: "The Breath of the Universe",
        simple: "Entropy is the measure of how much \"unknown\" or \"disorder\" is in a system. High entropy means there are many different things that could happen and we aren't sure which one will. Low entropy means things are very organized and predictable. While we often think of messy as bad, entropy is what allows for surprises and new ideas. It is the \"breath\" of the universe — the space between the numbers where anything is possible. Uncertainty isn't something to be afraid of; it is the soil where growth and mystery live.",
        senses: [
          { key: "hear",  icon: "👂", sense: "SOUND",  text: "The difference between a single steady beep (low entropy) and the static of a radio (high entropy)." },
          { key: "smell", icon: "👃", sense: "SMELL",  text: "The smell of a garden where everything is blooming at once — high information." },
          { key: "taste", icon: "👅", sense: "TASTE",  text: "A complex stew with hidden flavors you can't quite identify." },
          { key: "touch", icon: "✋", sense: "TOUCH",  text: "Running your hand through sand and feeling the randomness of the grains." },
          { key: "see",   icon: "👁️", sense: "SIGHT",  text: "Watching particles shift from a neat corner to filling the whole room." },
          { key: "body",  icon: "🫀", sense: "BODY",   text: "The feeling of letting go and relaxing your muscles completely." },
        ],
        intuition: "For the Everlasting We to experience novelty and free will, there must be fundamental uncertainty — the Math of Maybe — at the heart of existence.",
        links: [
          { label: "A Simple Explanation of Entropy", url: "https://en.wikipedia.org/wiki/Entropy_(information_theory)" },
          { label: "Khan Academy: Information Entropy", url: "https://www.khanacademy.org/computing/computer-science/informationtheory" },
          { label: "Britannica: Entropy", url: "https://www.britannica.com/science/entropy-physics" },
        ],
        songs: [
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "Bitter Sweet Symphony", artist: "The Verve", url: "https://www.youtube.com/watch?v=1lyu1KKwC74" },
          { title: "Order from Chaos", artist: "Max Cooper", url: "https://www.youtube.com/watch?v=_7wKjTf_RlI" },
        ],
        advanced: "In Information Theory (Shannon Entropy), H(X) quantifies the average level of information, surprise, or uncertainty inherent in a variable's possible outcomes. In thermodynamics, entropy represents the unavailability of energy to do work and progression toward equilibrium. Entropy is the mathematical expression of the Primordial Chaos from which all Logos (information) emerges — for free will to exist, uncertainty must be woven into the fabric of reality.",
      },

    ],
    // ═══════════════════════════════════════════════════════════════
    // MATHEMATICS (promise) > ZERO & NOTHING (zero)
    // ═══════════════════════════════════════════════════════════════

    zero: [
      { id: "placeholder-zero", num: 1, icon: "○", title: "The Power of the Placeholder", subtitle: "The Silent Hero",
        simple: "Zero is like a seat saver in a row of chairs that tells you someone is supposed to be there, even if the chair is empty. Without this little circle, we could not tell the difference between ten dollars and one hundred dollars. It acts as a gatekeeper that helps all the other numbers stay in their correct spots.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The silence between two notes in your favorite song." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of clean, crisp air after a heavy rain." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A sip of cool, plain water that clears your mouth before a meal." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The feeling of a calm, still breeze you can barely feel on your skin." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A clear night sky where the black space makes the stars look brighter." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Standing perfectly still with your eyes closed, feeling the balance of your body." }
        ],
        intuition: "Even when something looks empty, it still has a very important job. The nothing between the somethings gives them meaning.",
        links: [
          { label: "Scientific American: A History of Zero", url: "https://www.scientificamerican.com/article/history-of-zero/" },
          { label: "Britannica: The Number Zero", url: "https://www.britannica.com/science/zero-mathematics" },
          { label: "BBC: The Discovery of Nothing", url: "https://www.bbc.com/future/article/20151203-the-strange-history-of-nothing" }
        ],
        songs: [
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" },
          { title: "Nothing Else Matters", artist: "Metallica", url: "https://www.youtube.com/watch?v=tAGnKpE4NCI" },
          { title: "Zero", artist: "Smashing Pumpkins", url: "https://www.youtube.com/watch?v=NBkjcvNztKQ" }
        ],
        advanced: "Zero revolutionized the Hindu-Arabic numeral system via positional notation. Digit value determined by position relative to zero, enabling arithmetic impossible with additive systems like Roman numerals. Zero as placeholder is a cognitive anchor transitioning from concrete counting to abstract algebraic thinking." },

      { id: "additive-identity", num: 2, icon: "+0", title: "The Additive Identity", subtitle: "The Mirror That Changes Nothing",
        simple: "Zero is the only number that is invisible when you add it. Five apples plus zero more is still five. This makes zero the Identity because it lets every other number keep its own name and value. It is a mirror that does not change what it sees. Zero is the ground we stand on that stays still while we move.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A steady, unchanging hum or Om sound." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of a fresh, unprinted piece of paper." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The neutral taste of a plain cracker." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Resting your hand on a flat, level table." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A perfectly flat, white wall with nothing on it." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feet firmly planted on the ground while standing." }
        ],
        intuition: "Add nothing, lose nothing, stay exactly who you are. Zero is the ground that stays still while everything moves.",
        links: [
          { label: "Wolfram: Identity Element", url: "https://mathworld.wolfram.com/IdentityElement.html" },
          { label: "Khan Academy: Identity Property", url: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples/properties-of-numbers/v/identity-property-of-1-and-0" },
          { label: "Math is Fun: Adding Zero", url: "https://www.mathsisfun.com/numbers/identity.html" }
        ],
        songs: [
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "Everything In Its Right Place", artist: "Radiohead", url: "https://www.youtube.com/watch?v=NUnXxh5U25Y" },
          { title: "Simple Man", artist: "Lynyrd Skynyrd", url: "https://www.youtube.com/watch?v=sMmTkKz60W8" }
        ],
        advanced: "The additive identity (a+0=a) defines zero as the identity element within a group or ring. This enables inverse operations and negative numbers: for every positive force, a negative force returns the system to identity, ensuring conservation." },

      { id: "origin-point", num: 3, icon: "⊕", title: "The Origin Point (0,0)", subtitle: "Where Everything Starts",
        simple: "Imagine a giant map with a tiny dot in the middle where everything starts. That dot is zero, the Origin. Every direction is measured from that starting dot. Without it, we would not know where here is. Zero gives us a home base to return to. It is the center of the circle and the start of every race.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The very first thump of a drum at the start of a parade." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of a brand new box of crayons before you draw." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The first bite of a fresh fruit." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pressing your finger onto a single point on a map." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A single bright light in a dark room." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the exact center of your chest where your heart beats." }
        ],
        intuition: "You are the origin of your own coordinate system. Everything is measured from where you stand.",
        links: [
          { label: "National Geographic: Latitude and Longitude", url: "https://education.nationalgeographic.org/resource/latitude/" },
          { label: "NASA: Space Coordinates", url: "https://spaceplace.nasa.gov/coordinate-system/en/" },
          { label: "MIT: Coordinates", url: "https://ocw.mit.edu/courses/mathematics/" }
        ],
        songs: [
          { title: "Start Me Up", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=SGyOaCXr8Lw" },
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Home", artist: "Edward Sharpe & The Magnetic Zeros", url: "https://www.youtube.com/watch?v=DHEOF_rcND8" }
        ],
        advanced: "The origin (0,0) is the foundational reference for Cartesian coordinates. In physics, selecting the origin is gauge fixing: defining the zero-potential state. Arbitrary but necessary for calculating relative motion, energy, and universal expansion from a singular departure." },

      { id: "vacuum-physics", num: 4, icon: "∅", title: "The Physics of the Vacuum", subtitle: "Nothing Is Full of Everything",
        simple: "Scientists discovered that even nothing is full of energy! A vacuum is like a quiet ocean waiting for a wave. Zero in physics does not mean dead, it means ready. It is the stage where particles dance. Even when the stage is empty, the stage is still there.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The ringing in your ears when a room is perfectly quiet." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The cold, metallic scent of a freezer." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A breath of cold winter air on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The feeling of weightlessness when you jump on a trampoline." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A pitch-black room where you cannot see your own hand." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The floaty feeling right before you fall asleep." }
        ],
        intuition: "Zero does not mean dead. It means ready. The empty stage is where all particles dance.",
        links: [
          { label: "Physics Girl: What is a Vacuum?", url: "https://www.youtube.com/c/physicsgirl" },
          { label: "CERN: The Vacuum of Space", url: "https://home.cern/science/physics/vacuum" },
          { label: "Space.com: What is a Vacuum?", url: "https://www.space.com/what-is-a-vacuum.html" }
        ],
        songs: [
          { title: "Space Oddity", artist: "David Bowie", url: "https://www.youtube.com/watch?v=iYYRH4apXDo" },
          { title: "The Great Gig in the Sky", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=cVBCE3gaNxc" },
          { title: "Champagne Supernova", artist: "Oasis", url: "https://www.youtube.com/watch?v=tI-5uv4wryI" }
        ],
        advanced: "In QFT, nothingness is the vacuum state: lowest possible energy. Per Heisenberg, energy fluctuates, creating virtual particles. Physical zero is a boiling sea of potentiality. The Higgs VEV gives particles mass: the nothing determines the something." },

      { id: "sunyata", num: 5, icon: "〇", title: "Sunyata: The Great Emptiness", subtitle: "The Empty Cup Ready to Be Filled",
        simple: "Wise people in India thought of zero as Shunya: emptiness as potential. An empty cup is ready to be filled. If your mind is full of old thoughts, you cannot learn anything new. Zero reminds us to clear our minds and be open. Without empty space, there would be no room to grow.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The soft sound of a singing bowl fading away." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Incense smoke disappearing into the air." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A spicy flavor slowly fading until your mouth is clear." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Letting go of a heavy bag and feeling your hand become light." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A clear blue sky with not a single cloud." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Taking a deep breath and feeling the emptiness in your lungs before inhaling." }
        ],
        intuition: "If your mind is full of old thoughts, you cannot learn anything new. Zero is the clearing that makes room for everything.",
        links: [
          { label: "Stanford: Sunyata", url: "https://plato.stanford.edu/entries/buddhism-chan/" },
          { label: "The Atlantic: History of Zero", url: "https://www.theatlantic.com/technology/archive/2014/03/the-origin-of-zero/284420/" },
          { label: "Tricycle: What is Emptiness?", url: "https://tricycle.org/beginners/buddhism/what-does-emptiness-mean-in-buddhism/" }
        ],
        songs: [
          { title: "Hallelujah", artist: "Jeff Buckley", url: "https://www.youtube.com/watch?v=y8AWFf7EAc4" },
          { title: "Bitter Sweet Symphony", artist: "The Verve", url: "https://www.youtube.com/watch?v=1lyu1KKwC74" },
          { title: "Lotus Flower", artist: "Radiohead", url: "https://www.youtube.com/watch?v=cfOa1a8hYP8" }
        ],
        advanced: "Sunyata means relational origination: no entity has independent, permanent essence. Everything exists only in relation. Zero embodies this mathematically. The null is the source from which all differentiated forms emerge and return." },

      { id: "binary-zero", num: 6, icon: "01", title: "Binary Code: The Digital Heart", subtitle: "Off and On Build Everything",
        simple: "Your computer talks in a secret language of Zero and One. Zero means Off, One means On. By switching really fast, the computer creates pictures, music, and movies. Zero is the darkness that lets the light of the One make a pattern. We need the Off to understand the On.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A light switch clicking on and off." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The faint smell of electricity or a warm computer." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A yes/no taste test between salt and sugar." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Tapping a touch screen and feeling the tiny vibration." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A flickering candle or a blinking traffic light." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Tensing a muscle (1) and then completely relaxing it (0)." }
        ],
        intuition: "We need the Off to understand the On. Without darkness, light is just a blur. Zero gives the One its meaning.",
        links: [
          { label: "Code.org: How Computers Work", url: "https://code.org/educate" },
          { label: "Computer Hope: Binary", url: "https://www.computerhope.com/jargon/b/binary.htm" },
          { label: "Explain That Stuff: Computers", url: "https://www.explainthatstuff.com/howcomputerswork.html" }
        ],
        songs: [
          { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=gAjR4_CbPpQ" },
          { title: "Computer Love", artist: "Kraftwerk", url: "https://www.youtube.com/watch?v=ZtWTUt2RZh0" },
          { title: "Mr. Roboto", artist: "Styx", url: "https://www.youtube.com/watch?v=uc6f_2nPSX8" }
        ],
        advanced: "Binary (Leibniz, base-2): zero is low-voltage (gate closed), one is high-voltage (gate open). The fundamental bit. Without a distinct zero state, signals would be continuous and indistinguishable. Zero is the space between signals enabling discrete data." },

      { id: "limits-zero", num: 7, icon: "→0", title: "Limits and the Infinite Small", subtitle: "Approaching But Never Arriving",
        simple: "Imagine cutting a cookie in half, then half again, forever. The pieces get so tiny you can barely see them! Zero is the goal the cookie tries to reach. This helps us measure how fast a car moves at one exact tiny second. It captures things too small to see but still important.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A sound that gets quieter and quieter until it disappears." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The last faint hint of a flower after it has been moved away." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A single drop of juice in a whole glass of water." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A feather-light touch you can almost but not quite feel." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A dot in the distance that gets smaller until it is gone." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Slowing your movement until you are perfectly, infinitely still." }
        ],
        intuition: "An infinite series of smaller steps can still reach a destination. Zero is the vanishing point where change is captured in a single instant.",
        links: [
          { label: "Khan Academy: Limits", url: "https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new" },
          { label: "MathIsFun: Limits", url: "https://www.mathsisfun.com/calculus/limits.html" },
          { label: "MIT: Calculus", url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" }
        ],
        songs: [
          { title: "In the End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4" },
          { title: "Fade to Black", artist: "Metallica", url: "https://www.youtube.com/watch?v=WEQnzs1PFZo" },
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" }
        ],
        advanced: "Calculus relies on lim(x->0) for derivatives and integrals. Zero is the infinitesimal boundary enabling transition from discrete to continuous math. Resolves Zeno Paradoxes: infinite diminishing steps produce a finite sum. Zero captures the moment of change." },

      { id: "zero-balance", num: 8, icon: "⚖️", title: "The Great Balancing Act", subtitle: "The Middle Where Everything Meets",
        simple: "If two friends on a see-saw weigh the same, it stays perfectly flat. That middle point is Zero. If you have three cookies (+3) and eat three (-3), you are at zero. The world likes to be even. Zero is the middle that keeps everything from tipping too far.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Two people singing the exact same note together." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A neutral smell that is neither sweet nor sour." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Perfectly seasoned food, not too salty, not too bland." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Holding your hands together with equal pressure." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A horizon where the ocean meets the sky perfectly." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Balancing on one foot without wobbling." }
        ],
        intuition: "For every push, a pull. For every gain, a cost. The universe balances itself at zero.",
        links: [
          { label: "Physics Classroom: Newton Third Law", url: "https://www.physicsclassroom.com/class/newtlaws/Lesson-4/Newton-s-Third-Law" },
          { label: "Investopedia: Zero-Sum Game", url: "https://www.investopedia.com/terms/z/zero-sumgame.asp" },
          { label: "Math is Fun: Integers", url: "https://www.mathsisfun.com/whole-numbers.html" }
        ],
        songs: [
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" },
          { title: "Perfect", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
          { title: "Black or White", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=F2AitTPI5U0" }
        ],
        advanced: "Equilibrium is net-zero change. Forces sum to zero, indicating stability through synchronized opposition. Zero-sum game theory: total gains minus losses equals zero. Models competition, conservation laws, where creation necessitates a corresponding void." },

      { id: "absolute-zero", num: 9, icon: "0K", title: "Absolute Zero: The Big Freeze", subtitle: "The Ultimate Pause Button",
        simple: "Temperature measures how much atoms wiggle. Absolute Zero is so cold they stop entirely! It is the zero of movement. Scientists have never reached it perfectly. At this zero, the rules of the world act very strange and magical.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A sound so low you feel it in your bones but cannot hear it." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of ice or snow in the air." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "An ice cube melting on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Touching a cold metal pole in winter." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A frozen lake that looks like glass." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Being so still you cannot feel your own heartbeat." }
        ],
        intuition: "Even at ultimate zero, quantum mechanics says particles never truly stop. Zero-point energy remains. True nothing is impossible.",
        links: [
          { label: "NASA: Absolute Zero", url: "https://science.nasa.gov/" },
          { label: "Live Science: Absolute Zero", url: "https://www.livescience.com/37055-absolute-zero.html" },
          { label: "Scientific American: Absolute Zero", url: "https://www.scientificamerican.com/" }
        ],
        songs: [
          { title: "Cold as Ice", artist: "Foreigner", url: "https://www.youtube.com/watch?v=0XoyPBg4sII" },
          { title: "Ice Ice Baby", artist: "Vanilla Ice", url: "https://www.youtube.com/watch?v=rog8ou-ZepE" },
          { title: "Purple Rain", artist: "Prince", url: "https://www.youtube.com/watch?v=TvnYmWpD_T8" }
        ],
        advanced: "At 0K, classical motion ceases but quantum zero-point energy persists. Near absolute zero, Bose-Einstein Condensates form: atoms lose individuality and behave as a single super-atom. Superconductivity and superfluidity occur, defying classical physics." },

      { id: "zero-sum", num: 10, icon: "±0", title: "The Zero-Sum Game", subtitle: "One Side Gain Is the Other Loss",
        simple: "A Zero-Sum Game is like a pie with a set number of slices. If you take an extra slice, your friend has one less. Your gain (+1) and their loss (-1) total zero. It teaches us about sharing and connection. The whole world is one big system balanced in the end.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A seesaw going up and down with a rhythmic creak." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A garden where some flowers bloom while others return to soil." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Mixing sour with sweet to make it just right." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Playing tug-of-war where nobody is winning." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Checkers: one gains a piece every time the other loses one." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your weight shift from one leg to the other." }
        ],
        intuition: "Your gain plus their loss always equals zero. The universe keeps score, and the total is always balanced.",
        links: [
          { label: "Game Theory Academy", url: "https://en.wikipedia.org/wiki/Game_theory" },
          { label: "Investopedia: Zero-Sum", url: "https://www.investopedia.com/terms/z/zero-sumgame.asp" },
          { label: "Khan Academy: Game Theory", url: "https://www.khanacademy.org/economics-finance-domain/microeconomics/nash-equilibrium-tutorial" }
        ],
        songs: [
          { title: "The Winner Takes It All", artist: "ABBA", url: "https://www.youtube.com/watch?v=92cwKCU8Z5c" },
          { title: "Another One Bites the Dust", artist: "Queen", url: "https://www.youtube.com/watch?v=rY0WxgSXdEE" },
          { title: "Karma Police", artist: "Radiohead", url: "https://www.youtube.com/watch?v=1uYWYWPc9HU" }
        ],
        advanced: "In game theory, zero-sum means each gain/loss is exactly balanced by others. Total gains minus losses sum to zero. Models competition, conservation laws (mass, energy, charge): creation necessitates a corresponding void." },
    ],

    // ═══════════════════════════════════════════════════════════════
    // MATHEMATICS (promise) > FRACTALS & SELF-SIMILARITY (fractals)
    // ═══════════════════════════════════════════════════════════════

    fractals: [
      { id: "self-similarity", num: 1, icon: "🌀", title: "Self-Similarity", subtitle: "The Whole Lives Inside the Part",
        simple: "Imagine broccoli that looks like a tiny green tower. Break off one piece, and that piece looks exactly like the whole tower. This happens in clouds, coastlines, and your own lungs! Nature uses the same recipe over and over, no matter the size. You carry the patterns of the whole world inside you.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A Shepard Tone: a sound that feels like it rises forever but never gets higher." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A pine forest where every needle smells like the whole tree." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Biting into cauliflower; every crumb tastes like the whole vegetable." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Running your hand over a fern leaf where every leaflet feels like the big branch." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Two mirrors facing each other: seeing yourself go on forever." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your heartbeat and realizing it follows the same rhythm as the seasons." }
        ],
        intuition: "You carry the patterns of the whole world inside you. The part contains the whole. As above, so below.",
        links: [
          { label: "Fractal Foundation: What are Fractals?", url: "https://fractalfoundation.org/resources/what-are-fractals/" },
          { label: "BBC: The Secret Life of Chaos", url: "https://www.bbc.co.uk/programmes/b00pv1c3" },
          { label: "TED: Mandelbrot on Roughness", url: "https://www.ted.com/talks/benoit_mandelbrot_fractals_and_the_art_of_roughness" }
        ],
        songs: [
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "Across the Universe", artist: "The Beatles", url: "https://www.youtube.com/watch?v=90M60PzmxEE" }
        ],
        advanced: "Self-similarity is invariance under scaling transformation. Foundation of fractal geometry, moving beyond Euclidean shapes toward rough structures maintaining complexity at every scale. Simple feedback loops generate infinite morphological variety." },

      { id: "recursion-fractals", num: 2, icon: "🔄", title: "Recursion", subtitle: "The Story Inside the Story",
        simple: "Recursion is a story that says: Once upon a time, there was a girl who told a story about a girl who told a story... It never ends because the rule repeats inside itself. In math, a simple rule draws a line, then the same rule is used on the new line. This creates snowflakes and stars. Big beautiful things come from doing one small thing over and over with love.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "An echo in a deep canyon that repeats until it fades." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of rain (petrichor) that returns with every water cycle." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Sourdough starter fed and regrown day after day for years." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Tracing a spiral seashell with your finger." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A Droste effect picture: a person holds a picture of themselves." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Your breath going in and out, a loop that keeps you alive." }
        ],
        intuition: "Big beautiful things come from doing one small simple thing over and over with love. The recipe calls for itself.",
        links: [
          { label: "Khan Academy: Recursion", url: "https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion" },
          { label: "Beauty of Recursion", url: "https://www.youtube.com/results?search_query=beauty+of+recursion" },
          { label: "Wolfram: Recursion", url: "https://mathworld.wolfram.com/Recursion.html" }
        ],
        songs: [
          { title: "Around the World", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=LKYPYj2XX80" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "The Song That Never Ends", artist: "Lamb Chop", url: "https://www.youtube.com/watch?v=0U2zJOryHKQ" }
        ],
        advanced: "Recursion: a solution depends on smaller instances of itself. In fractals, the geometric generator is applied indefinitely. Relates to strange loops in cognitive science where hierarchical systems cycle back to their own starting point." },

      { id: "iterative-functions", num: 3, icon: "⚙️", title: "Iterative Functions", subtitle: "Doing It Again and Again",
        simple: "Iteration means doing it again. A magic box changes a number and gives you a new one. Put that new number right back in! After thousands of times, a secret shape appears. This is how computers draw mountains in video games. Our daily habits eventually shape who we are.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A drum beat that repeats, building a rhythm you can dance to." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Baking bread: the yeast works its magic over and over." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Layers of puff pastry made by folding dough again and again." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the ridges on corduroy fabric." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching a pendulum swing back and forth." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Walking: the repeated cycle of one foot in front of the other." }
        ],
        intuition: "Our daily habits eventually shape who we are. Put yourself into the box, come out changed, go back in. Repeat until the secret shape appears.",
        links: [
          { label: "Britannica: Iterative Methods", url: "https://www.britannica.com/science/iterative-method" },
          { label: "Generative Art", url: "https://en.wikipedia.org/wiki/Generative_art" },
          { label: "Veritasium: The Logistic Map", url: "https://www.youtube.com/watch?v=ovJcsL7vyrk" }
        ],
        songs: [
          { title: "One More Time", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=FGBhQbmPwH8" },
          { title: "Seven Nation Army", artist: "The White Stripes", url: "https://www.youtube.com/watch?v=0J2QdDbelmY" },
          { title: "Interstellar Theme", artist: "Hans Zimmer", url: "https://www.youtube.com/watch?v=UDVtMYqUAyw" }
        ],
        advanced: "Repeated application of f(x) can produce fixed points, limit cycles, or chaotic attractors. Complexity arises from simplicity. Truth is often emergent from repeated interactions rather than a single static fact." },

      { id: "mandelbrot-set", num: 4, icon: "👑", title: "The Mandelbrot Set", subtitle: "The Thumbprint of God",
        simple: "The Mandelbrot Set is an infinite map of a magical island. A simple math rule creates the most complicated shape in the world. Zoom in and find swirls, seahorses, and tiny copies of the whole island hidden inside. Even in a tiny dot, there can be a whole universe of beauty if you just look closer.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A complex symphony: you can hear one violin or the whole orchestra." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A perfume that changes scent the longer you wear it." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A complex mole sauce with 30 ingredients blending into one taste." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Touching a textured map with mountains and valleys." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking through a kaleidoscope." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Balancing on one foot, feeling all tiny muscles working together." }
        ],
        intuition: "In a tiny dot, a whole universe of beauty waits. Simple rules create infinite complexity. The thumbprint of God.",
        links: [
          { label: "Numberphile: The Mandelbrot Set", url: "https://www.youtube.com/watch?v=NGMRB4O922I" },
          { label: "Mandelbrot Explorer", url: "https://mandelbrot.ophir.dev/" },
          { label: "Scientific American: Mandelbrot Set", url: "https://www.scientificamerican.com/article/what-is-the-mandelbrot-set/" }
        ],
        songs: [
          { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
          { title: "Stairway to Heaven", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=QkF3oxziUI4" },
          { title: "Mandelbrot Set", artist: "Jonathan Coulton", url: "https://www.youtube.com/watch?v=ES-yKOYaXq0" }
        ],
        advanced: "The set of complex numbers c where f(z)=z^2+c does not diverge from z=0. A locus of connectedness in parameter space. Teaches about boundary layers: the thin line where order meets chaos, where all information interconnects at the edge." },

      { id: "scaling-invariance", num: 5, icon: "⚖️", title: "Scaling Invariance", subtitle: "Size Does Not Change the Rules",
        simple: "Have you ever mistaken a photo of a rock for a giant mountain? Some things look the same whether an inch or a mile long. Rivers branch like lightning bolts. Being big or important is not about size. A small child can follow the same rules of kindness as a grown-up.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "White noise: sounds the same at any volume." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The ocean: the same in a drop as in a wave." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Pure honey: a tiny drop is just as sweet as a whole jar." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling sand: one grain feels like the whole beach." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A V of geese flying looks like the V of a river delta." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Stretching your arms out and feeling the same shape as a star." }
        ],
        intuition: "The laws governing the small mirror the large. As above, so below. Size is just a frame; the pattern is eternal.",
        links: [
          { label: "Wikipedia: Scale Invariance", url: "https://en.wikipedia.org/wiki/Scale_invariance" },
          { label: "The Physics of Scaling", url: "https://en.wikipedia.org/wiki/Scaling_law" },
          { label: "NASA: Fractal Coastlines", url: "https://earthobservatory.nasa.gov/" }
        ],
        songs: [
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "What a Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=A3yCcXgbKrE" },
          { title: "Tiny Dancer", artist: "Elton John", url: "https://www.youtube.com/watch?v=yYcyacLRPNs" }
        ],
        advanced: "Scale invariance: objects or laws unchanged when scales are multiplied by a common factor. Hallmark of phase transitions and critical phenomena. Scientific basis for the hermetic axiom As Above So Below." },

      { id: "fractal-dimension", num: 6, icon: "📏", title: "Fractal Dimension", subtitle: "More Than a Line, Less Than a Plane",
        simple: "A line is 1D, a square is 2D. But fractals are in-between! A fractal line is so wiggly it is more than a line but not quite a square. Like crumpling paper: more than flat, but not a solid block. You do not have to fit into one category. The crinkles in your life make you more interesting.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The graininess of a distorted guitar." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The layered smell of a garden after rain." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The texture of a blackberry made of many tiny bubbles." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling a sponge or a piece of coral." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking at a mountain range against the sky." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the complexity of your joints moving together." }
        ],
        intuition: "You do not have to fit into one category. The crinkles make you more interesting. You exist in fractional dimensions.",
        links: [
          { label: "Yale: Fractal Dimension", url: "https://users.math.yale.edu/public_html/People/frame/Fractals/" },
          { label: "Coastline of Britain", url: "https://en.wikipedia.org/wiki/How_Long_Is_the_Coast_of_Britain%3F" },
          { label: "3Blue1Brown: Fractal Dimensions", url: "https://www.youtube.com/watch?v=gB9n2gHsHN4" }
        ],
        songs: [
          { title: "Changes", artist: "David Bowie", url: "https://www.youtube.com/watch?v=pl3vxEudif8" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
          { title: "Smooth", artist: "Santana ft. Rob Thomas", url: "https://www.youtube.com/watch?v=6Whgn_iE5uc" }
        ],
        advanced: "Fractal dimension (Hausdorff) provides a statistical index of complexity. Roughness is measurable, and nature exists in fractional spaces, reflecting a universe far more informationally dense than smooth Euclidean models suggest." },

      { id: "l-systems", num: 7, icon: "🌿", title: "L-Systems", subtitle: "Nature Secret Growth Code",
        simple: "L-Systems are a secret code for how plants grow. A seed code says: grow a stem, split into two, grow two more. By following simple rules, nature builds giant oaks and delicate flowers. We do not need a giant plan for a beautiful life. Just a few good rules: be kind and keep growing.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A canon or round where voices follow each other." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The sweet smell of a blooming flower." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A fresh salad where you taste the different rules of the plants." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the veins on a leaf." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching a time-lapse of a plant growing." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your own bones grow as you get taller." }
        ],
        intuition: "A few good rules, applied with love and consistency, build beautiful lives. The seed contains the tree.",
        links: [
          { label: "Algorithmic Beauty of Plants", url: "http://algorithmicbotany.org/papers/#abop" },
          { label: "L-System Generator", url: "https://onlinemathtools.com/l-system-generator" },
          { label: "PBS Nova: Nature Code", url: "https://www.pbs.org/wgbh/nova/" }
        ],
        songs: [
          { title: "Blackbird", artist: "The Beatles", url: "https://www.youtube.com/watch?v=Man4Xw8Xypo" },
          { title: "Tree Village", artist: "Dance Gavin Dance", url: "https://www.youtube.com/watch?v=07PY6q5Dg48" },
          { title: "Growth", artist: "The Alchemist", url: "https://www.youtube.com/watch?v=G4_DdBO5kPA" }
        ],
        advanced: "Lindenmayer systems are parallel rewriting systems modeling organism morphology. Biological complexity is algorithmic, connecting biology to computer science and linguistics. A universal language of growth transcending species." },

      { id: "golden-ratio-fractals", num: 8, icon: "✨", title: "The Golden Ratio in Fractals", subtitle: "Nature Favorite Spiral",
        simple: "The Golden Ratio (1.618) is the universe favorite shape. You find it in sunflower seeds, hurricanes, and even your face. It feels balanced. There is a natural rhythm and harmony to everything, and when we find that rhythm, we feel at home in the world.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A perfect musical chord that feels right to your ears." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The balanced scent of a rose." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A perfectly balanced sweet-and-sour candy." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The smooth curve of a nautilus shell." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking at the Parthenon or a beautiful painting." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Standing perfectly still and feeling your balance." }
        ],
        intuition: "Beauty is a sign of mathematical efficiency. The Golden Ratio bridges the Ideal and the Manifest.",
        links: [
          { label: "National Geographic: Golden Ratio", url: "https://www.nationalgeographic.com/science/article/golden-ratio" },
          { label: "Fibonacci in Nature", url: "https://www.mathsisfun.com/numbers/fibonacci-sequence.html" },
          { label: "Wolfram: Golden Ratio", url: "https://mathworld.wolfram.com/GoldenRatio.html" }
        ],
        songs: [
          { title: "God Only Knows", artist: "The Beach Boys", url: "https://www.youtube.com/watch?v=EkPy18xW1j8" },
          { title: "Golden", artist: "Harry Styles", url: "https://www.youtube.com/watch?v=P3cffdsEXXw" },
          { title: "Perfect", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" }
        ],
        advanced: "Phi = (1+sqrt5)/2: the most efficient packing ratio. Its prevalence in art and nature suggests deep mathematical aesthetics in reality. Beauty is often mathematical efficiency and structural integrity." },

      { id: "chaos-theory", num: 9, icon: "🦋", title: "Chaos Theory", subtitle: "The Butterfly Effect",
        simple: "Chaos Theory says even messy things have secret order underneath. The Butterfly Effect: a butterfly flapping wings in one country could cause a storm in another. Small things matter! One kind word could change someone life forever. Even in chaos, the universe follows a beautiful hidden pattern.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A waterfall: loud and messy but with a steady roar." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A busy kitchen during a holiday." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Pop rocks candy: surprising and chaotic in your mouth." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the wind change direction suddenly." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching smoke curl into the air." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Trying to stay upright on a moving bus." }
        ],
        intuition: "Small things matter. One kind word can change a life. Free will and determinism are woven together.",
        links: [
          { label: "Britannica: Chaos Theory", url: "https://www.britannica.com/science/chaos-theory" },
          { label: "The Butterfly Effect", url: "https://en.wikipedia.org/wiki/Butterfly_effect" },
          { label: "Lorenz Attractor", url: "https://www.youtube.com/results?search_query=lorenz+attractor" }
        ],
        songs: [
          { title: "Butterfly Effect", artist: "Travis Scott", url: "https://www.youtube.com/watch?v=_EyZUTDAH0U" },
          { title: "Chaos Theory", artist: "The Enid", url: "https://www.youtube.com/results?search_query=the+enid+chaos+theory" },
          { title: "Viva La Vida", artist: "Coldplay", url: "https://www.youtube.com/watch?v=dvgZkm1xWPE" }
        ],
        advanced: "Nonlinear dynamical systems sensitive to initial conditions settle into fractal attractors. Free will and determinism coexist: small actions feed back into the whole, creating a tapestry unpredictable short-term but structured long-term." },

      { id: "holographic-principle", num: 10, icon: "💠", title: "The Holographic Principle", subtitle: "Every Part Contains the Whole",
        simple: "Imagine a magic picture of a puppy. Rip it in half and you do not get half a puppy; you get two smaller pictures of the whole puppy! Scientists think the universe works like this. Every atom contains information for the whole universe. You are a little universe yourself, carrying the light of everything inside you.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A recording where you can hear the room the music was played in." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of home, made of many tiny memories." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A soup where every spoonful has all the spices combined." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Holding a handful of water; it feels like the whole ocean." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking at an iridescent soap bubble." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Closing your eyes and knowing exactly where your whole body is." }
        ],
        intuition: "You are a little universe, carrying the light of everything inside you. Separation is an illusion of scale.",
        links: [
          { label: "Scientific American: Holographic Universe", url: "https://www.scientificamerican.com/article/the-holographic-universe/" },
          { label: "Susskind: Holographic Principle", url: "https://www.youtube.com/watch?v=2DIl3Hfh9tY" },
          { label: "Holonomic Brain Theory", url: "https://en.wikipedia.org/wiki/Holonomic_brain_theory" }
        ],
        songs: [
          { title: "Mirrors", artist: "Justin Timberlake", url: "https://www.youtube.com/watch?v=uuZE_IRwLNI" },
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Reflection", artist: "Lea Salonga (Mulan)", url: "https://www.youtube.com/watch?v=1AfNOKQdY-U" }
        ],
        advanced: "From string theory and quantum gravity: a volume of space can be described by information encoded on a lower-dimensional boundary. The information of the totality is present at every point. Separation is a perspective illusion caused by our scale of observation." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // MATHEMATICS (promise) > RATIO & PROPORTION (ratio)
    // ═══════════════════════════════════════════════════════════════

    ratio: [
      { id: "constant-proportionality", num: 1, icon: "∝", title: "The Constant of Proportionality", subtitle: "The Glue That Holds Two Things Together",
        simple: "Imagine a magic recipe where for every 2 scoops of cocoa, you always need 3 splashes of milk. No matter if you are making a tiny cup or a giant bucket, that rule never changes. This rule number is the glue that keeps everything tasting the same. If you know this number, you can predict the future of your recipe perfectly!",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A metronome clicking at a steady beat: the ratio of time to sound is fixed." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The consistent scent of a candle that smells the same whether small or large." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Perfect lemonade where the sourness and sweetness are in total balance." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pushing a swing: the harder you push, the higher it goes in a set way." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A map where one inch always equals ten miles." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your legs move faster in exact sync with how fast you swing your arms while running." }
        ],
        intuition: "Within the chaos of changing variables, there is a core logic that never changes. The constant is the heartbeat of the relationship.",
        links: [
          { label: "Khan Academy: Constant of Proportionality", url: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion" },
          { label: "MathIsFun: Direct Proportion", url: "https://www.mathsisfun.com/algebra/directly-proportional.html" },
          { label: "Wolfram: Proportional", url: "https://mathworld.wolfram.com/Proportional.html" }
        ],
        songs: [
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "Stayin' Alive", artist: "Bee Gees", url: "https://www.youtube.com/watch?v=fNFzfwLM72c" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" }
        ],
        advanced: "The constant of proportionality (k) defines y=kx: a linear map where the origin is preserved and the rate of change is globally invariant. This mirrors physical constants like gravity and light speed that dictate the ratio of how matter and energy interact across the cosmos." },

      { id: "equivalent-ratios", num: 2, icon: "=", title: "Equivalent Ratios", subtitle: "Different Outfits, Same Person",
        simple: "Equivalent ratios are like different outfits for the same person. Whether you say 2 out of 4 or 1 out of 2, you are talking about exactly half. It is like two different sized pizzas cut so every bite has the same amount of cheese. The numbers look different, but the heart of the fraction is the same. Truth can look different depending on size, but it still stays true.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Playing a middle C and a high C on piano: different sizes but the same note." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "One drop of perfume in a small room vs. ten drops in a ballroom." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Chocolate milk in a glass vs. a gallon: tastes the same if the ratio is right." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The texture of a small piece of velvet vs. a whole velvet curtain." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing a photo of a mountain and then seeing the real mountain." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Your brain knowing your hand is half-open whether your hand is small (as a kid) or large (as an adult)." }
        ],
        intuition: "Size is a relative construct, but Relationship is an absolute truth. The heart of the fraction never changes.",
        links: [
          { label: "Brilliant: Ratios", url: "https://brilliant.org/wiki/ratios/" },
          { label: "NCTM: Developing Ratio Sense", url: "https://www.nctm.org/" },
          { label: "CK-12: Equivalent Ratios", url: "https://www.ck12.org/arithmetic/equivalent-ratios/" }
        ],
        songs: [
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "Clocks", artist: "Coldplay", url: "https://www.youtube.com/watch?v=d020hcWA_Wg" },
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" }
        ],
        advanced: "Equivalent ratios are elements of the same equivalence class: a:b equals c:d iff ad=bc. This demonstrates Scale Invariance, vital in fractal geometry and quantum mechanics where properties remain unchanged regardless of observation scale. The microcosm mirrors the macrocosm." },

      { id: "cross-multiplication", num: 3, icon: "⊠", title: "Cross-Multiplication", subtitle: "The Truth Detector",
        simple: "Cross-multiplication is a truth detector for math. If you have two ratios and want to know if they match, multiply them in an X shape. If the two answers are the same, they are soulmates: perfectly in proportion. It is a quick way to find a missing puzzle piece. If you look at a problem from two angles and the results meet in the middle, you have found the answer.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Two singers hitting a harmony where the vibrations lock together perfectly." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Two different flowers that together create a perfectly balanced bouquet." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Salt and caramel: different flavors that balance each other out." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Interlocking your fingers together tightly; they cross to create a strong bond." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Two sides of a scale perfectly level with each other." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The balance in your ears that keeps you upright when you tilt your head." }
        ],
        intuition: "What is true for the numerator has a corresponding truth in the denominator. As above, so below. When cross-products match, harmony is proven.",
        links: [
          { label: "Math Planet: Proportions", url: "https://www.mathplanet.com/education/pre-algebra/ratios-and-percent/proportions-and-cross-multiplication" },
          { label: "Purplemath: Proportions", url: "https://www.purplemath.com/modules/ratio2.htm" },
          { label: "Study.com: Cross Multiplication", url: "https://study.com/academy/lesson/cross-multiplication.html" }
        ],
        songs: [
          { title: "Under Pressure", artist: "Queen & David Bowie", url: "https://www.youtube.com/watch?v=a01QQZyl-_I" },
          { title: "Perfect", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsOU" }
        ],
        advanced: "Cross-multiplication derives from the Property of Equality: multiplying both sides by denominators clears fractions to reveal underlying integers. It reduces complex relational data to a binary state: True (equal) or False (unequal). The Principle of Correspondence made algebraic." },

      { id: "unit-rates", num: 4, icon: "1", title: "Unit Rates", subtitle: "The Power of One",
        simple: "A unit rate is the power of one. It tells you how much of something you get for just one single piece of something else, like miles per one gallon of gas. It is the simplest way to compare two different things. When you find the unit rate, you find the heartbeat of the relationship. It shows you truth behind big numbers by making them small and easy to see.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The single thump of a drum that sets the pace for the whole song." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of one single rose used to understand the smell of a whole garden." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "One single grain of salt to test how salty the soup is." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling one single drop of rain to know how wet the storm is." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking at one brick to understand what the whole wall is made of." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the weight of one single coin in your hand to guess the weight of a bag of them." }
        ],
        intuition: "Reduce everything to its single unit and the infinite potential of the relationship is unlocked. One is the seed of all.",
        links: [
          { label: "MathIsFun: Unit Rate", url: "https://www.mathsisfun.com/definitions/unit-rate.html" },
          { label: "IXL: Unit Rates", url: "https://www.ixl.com/math/grade-6/unit-rates" },
          { label: "Britannica: Rate of Change", url: "https://www.britannica.com/science/rate-of-change" }
        ],
        songs: [
          { title: "One", artist: "U2", url: "https://www.youtube.com/watch?v=ftjEcrrf7r0" },
          { title: "10,000 Hours", artist: "Dan + Shay & Justin Bieber", url: "https://www.youtube.com/watch?v=F9eDOsBmHOs" },
          { title: "9 to 5", artist: "Dolly Parton", url: "https://www.youtube.com/watch?v=UbxUSsFXYo4" }
        ],
        advanced: "The unit rate equals y/x when x=1: the normalized value or derivative at a point in a constant linear function. By reducing to base unit, we eliminate noise of scale. Once identified, any quantity can be derived through simple multiplication. The atomic theory of logic." },

      { id: "scaling-similarity", num: 5, icon: "∼", title: "Scaling and Similarity", subtitle: "Same Shape, Different Size",
        simple: "Scaling is like using a shrink ray or grow ray on a toy. If you scale a toy car up to be a real car, every part has to grow by the exact same amount or the wheels will not fit! Similar things are the same shape but different sizes. The inner pattern is more important than how big or small something is. Like a family where the baby looks exactly like the grandpa: the design is what connects them.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "An echo that sounds exactly like your voice but quieter." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A tiny sample of soap that smells exactly like the giant bar." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A tiny crumb of a cookie that tells you exactly how the whole batch tastes." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling a model of the Eiffel Tower that has the same bumps as the real one." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing your reflection in a tiny mirror vs. a big mirror." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Moving your hand in a small circle and then a big circle; your brain knows it is the same shape." }
        ],
        intuition: "Form is independent of magnitude. The whole is contained within the part. The design is what connects everything.",
        links: [
          { label: "MathOpenRef: Similar Polygons", url: "https://www.mathopenref.com/similar.html" },
          { label: "NASA: Scale Models", url: "https://www.nasa.gov/stem/" },
          { label: "Geometry: Similarity Laws", url: "https://en.wikipedia.org/wiki/Similarity_(geometry)" }
        ],
        songs: [
          { title: "It's a Small World", artist: "Disney", url: "https://www.youtube.com/watch?v=BGhY5c5VoDY" },
          { title: "Big in Japan", artist: "Alphaville", url: "https://www.youtube.com/watch?v=tl6u2NASUzU" },
          { title: "Landslide", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=WM7-PYtXtJM" }
        ],
        advanced: "Geometric similarity: isometry plus dilation. Two figures are similar if corresponding angles are congruent and sides are in proportion. Foundation of trigonometry and modeling. It resonates with the Holographic Principle: the ratio of any two internal parts is constant regardless of global scale." },

      { id: "inverse-proportion", num: 6, icon: "↕", title: "Inverse Proportion", subtitle: "The See-Saw Relationship",
        simple: "Inverse proportion is a see-saw relationship. When one side goes up, the other must go down. If more friends show up to share a pizza, the size of your slice goes down! It is how the world stays balanced. It teaches us about trade-offs: you cannot have more of everything at the same time. To get more speed, you might need more energy.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "As a siren moves further away, the volume gets lower." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "As you move away from a bakery, the smell gets weaker." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Adding more water to juice makes the flavor weaker." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pushing on a sponge: more pressure means less space." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "As a car drives away, it gets smaller in your eyes." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Balancing on one foot: as your body leans left, your arms move right." }
        ],
        intuition: "Growth in one dimension often requires contraction in another. The sweet spot is where the product of effort and resources is most stable.",
        links: [
          { label: "MathIsFun: Inverse Proportion", url: "https://www.mathsisfun.com/algebra/inversely-proportional.html" },
          { label: "BBC Bitesize: Inverse Proportion", url: "https://www.bbc.co.uk/bitesize/guides/zyjfyrd/revision/1" },
          { label: "ScienceDirect: Inverse Square Law", url: "https://www.sciencedirect.com/" }
        ],
        songs: [
          { title: "The Less I Know The Better", artist: "Tame Impala", url: "https://www.youtube.com/watch?v=sBzrzS1Ag_g" },
          { title: "Fast Car", artist: "Tracy Chapman", url: "https://www.youtube.com/watch?v=DwrHwZyFN7M" },
          { title: "Blowin' in the Wind", artist: "Bob Dylan", url: "https://www.youtube.com/watch?v=vWwgrjjIMXA" }
        ],
        advanced: "Inverse proportion: xy=k, creating a rectangular hyperbola. The mathematical expression of equilibrium in dynamic systems. Seen in Boyle's Law (P inversely proportional to V) and the Inverse Square Law of light and gravity. The wisdom of limits and resource allocation." },

      { id: "golden-ratio-proportion", num: 7, icon: "ϕ", title: "The Golden Ratio", subtitle: "Nature's Favorite Number",
        simple: "The Golden Ratio is nature's favorite number, about 1.618. It is a special proportion people find beautiful. You find it in seashell spirals, flower petals, and famous buildings. It is a secret signature left by the universe showing how to grow perfectly. When things follow this ratio, they feel right and peaceful to our brains. It is the link between math and art.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Musical compositions that time their climax at the 61.8% mark." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A perfume with top note and base note in perfect 1.6:1 balance." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A dish where the ratio of main ingredient to garnish feels visually delicious." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The spiral of a pinecone or seashell held in your palm." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The Rule of Thirds in a beautiful photograph." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The ratio of the length of your forearm to your hand." }
        ],
        intuition: "Beauty is not subjective; it is the recognition of mathematical efficiency. When we see phi, we see the universe's most efficient growth algorithm.",
        links: [
          { label: "National Geographic: The Golden Ratio", url: "https://www.nationalgeographic.com/science/article/golden-ratio" },
          { label: "Fibonacci in Nature", url: "https://www.mathsisfun.com/numbers/fibonacci-sequence.html" },
          { label: "Wolfram: Golden Ratio", url: "https://mathworld.wolfram.com/GoldenRatio.html" }
        ],
        songs: [
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "Symphony No. 5", artist: "Beethoven", url: "https://www.youtube.com/watch?v=fOk8Tm815lE" },
          { title: "Golden", artist: "Harry Styles", url: "https://www.youtube.com/watch?v=P3cffdsEXXw" }
        ],
        advanced: "Phi = (1+sqrt5)/2, the unique positive solution to x^2-x-1=0. Connected to the Fibonacci sequence where successive term ratios converge to phi. In phyllotaxis, it enables optimal packing: maximum seeds in minimum space. Beauty as mathematical efficiency." },

      { id: "direct-variation", num: 8, icon: "↗", title: "Direct Variation", subtitle: "The Simple Growth Rule",
        simple: "Direct variation is the simple growth rule. Twice as much work gets you exactly twice as much reward. It is a straight line starting from zero. Buy zero apples, pay zero. Buy ten, pay a set amount. It is the most fair relationship in math because it never changes the rules. Some things in life are very predictable and follow a clear, straight path.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Turning the volume knob: the more you turn, the louder it gets in a smooth line." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The more cookies in the oven, the stronger the smell in the kitchen." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The more sugar you put in tea, the sweeter it gets." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Walking: the more steps you take, the further you have moved." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching a shadow grow longer as the sun goes down." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your muscles work harder the more weight you pick up." }
        ],
        intuition: "Effort is directly rewarded, consequences perfectly scaled to actions. The unit rate of change stays constant forever. Mathematical justice.",
        links: [
          { label: "Algebra Coach: Direct Variation", url: "https://www.algebracoach.com/" },
          { label: "Lumen Learning: Direct Variation", url: "https://courses.lumenlearning.com/" },
          { label: "Virtual Nerd: Direct Variation", url: "https://www.virtualnerd.com/" }
        ],
        songs: [
          { title: "Work", artist: "Rihanna", url: "https://www.youtube.com/watch?v=HL1UzIK-flA" },
          { title: "Higher Ground", artist: "Stevie Wonder", url: "https://www.youtube.com/watch?v=4wZ3ZG_Wams" },
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" }
        ],
        advanced: "Direct variation: y=kx where the y-intercept is zero. A pure scalar relationship and the simplest cause-and-effect model. In thermodynamics, P is directly proportional to T at constant volume. The mathematical foundation of linear logic." },

      { id: "part-to-whole", num: 9, icon: "◐", title: "Part-to-Whole Relationships", subtitle: "The Puzzle Piece and the Picture",
        simple: "A part-to-whole relationship is like looking at a puzzle piece to understand the whole picture. It tells you how much share one thing has of the total. If a class has 10 girls and 20 students total, the ratio is 10 to 20. This helps us understand percentages and probability. Everything we see is usually just one part of a bigger story, and we need to know the whole to understand what we are looking at.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Hearing one instrument in a whole orchestra." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Identifying the smell of cinnamon in a whole apple pie." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Tasting the hint of lime in a spicy taco." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling one soft feather on a large, scaly bird." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing one bright star in a giant galaxy." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling one toe move while the rest of your foot stays still." }
        ],
        intuition: "No value exists in a vacuum. Every part is defined by its relationship to the total. Understanding your piece means understanding the whole.",
        links: [
          { label: "Math.com: Fractions", url: "https://www.math.com/school/subject1/lessons/S1U4L1GL.html" },
          { label: "Statistics How To: Relative Frequency", url: "https://www.statisticshowto.com/probability-and-statistics/relative-frequency/" },
          { label: "NRich: Part-Whole Thinking", url: "https://nrich.maths.org/" }
        ],
        songs: [
          { title: "We Are the World", artist: "USA for Africa", url: "https://www.youtube.com/watch?v=M9BNoNFKCBI" },
          { title: "Piece of My Heart", artist: "Janis Joplin", url: "https://www.youtube.com/watch?v=iJb7cBfrxbo" },
          { title: "Eleanor Rigby", artist: "The Beatles", url: "https://www.youtube.com/watch?v=HuS5NuXRb5Y" }
        ],
        advanced: "In set theory: the relationship between subset and universal set. Expressed as a fraction where the denominator is the sample space. Basis of relative frequency and statistical density. It forces the shift from individualism to collectivism: every part is defined by the total." },

      { id: "dimensional-analysis", num: 10, icon: "[D]", title: "Dimensional Analysis", subtitle: "The Universal Translator",
        simple: "Dimensional analysis is a translation tool. It is how we change one type of measurement into another without losing the truth. If you know how many minutes are in an hour, you can figure out how many seconds are in a day! It is a bridge that lets you walk from inches to miles safely. Even when we change the words or units, the amount of stuff stays exactly the same.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A song played on guitar vs. piano: the units change but the tune stays the same." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A smell that reminds you of a place from long ago: time changed but the scent stayed." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Sugar vs. honey: different units of sweetness to get the same result." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Using your thumb to measure something vs. using a ruler." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching a movie in slow motion: the time is different but the story is the same." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Throwing a heavy ball vs. a light ball: your brain translates the force needed." }
        ],
        intuition: "Truth is invariant under a change of coordinates. Whether we measure life in years, heartbeats, or breaths, the dimension of existence remains constant.",
        links: [
          { label: "ChemLibreTexts: Dimensional Analysis", url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map:_General_Chemistry_(Petrucci_et_al.)/01:_Matter_-_Its_Properties_and_Measurement/1.6:_Dimensional_Analysis" },
          { label: "Britannica: Units of Measurement", url: "https://www.britannica.com/science/unit-of-measurement" },
          { label: "NASA: Unit Conversion", url: "https://www.nasa.gov/stem/" }
        ],
        songs: [
          { title: "525,600 Minutes", artist: "Rent Soundtrack", url: "https://www.youtube.com/watch?v=hj7LRuusFqo" },
          { title: "I'm Gonna Be (500 Miles)", artist: "The Proclaimers", url: "https://www.youtube.com/watch?v=tbNlMtqrYS0" },
          { title: "A Thousand Miles", artist: "Vanessa Carlton", url: "https://www.youtube.com/watch?v=Cwkej79U3ek" }
        ],
        advanced: "Dimensional analysis uses conversion factors (ratios equal to 1) to transform units. In advanced physics, it validates equations: if dimensions on both sides do not match, the equation is impossible. Truth is invariant under coordinate change. The logic of equivalence and universal communication." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // MATHEMATICS (promise) > SYMMETRY & BALANCE (symmetry)
    // ═══════════════════════════════════════════════════════════════

    symmetry: [
      { id: "noethers-theorem", num: 1, icon: "⚖️", title: "Noether's Theorem", subtitle: "The Soul of Physics",
        simple: "Symmetry is not just about looking pretty; it is the reason the universe stays consistent. This rule says that because the laws of physics do not change if you move to a new spot or wait an hour, things like energy cannot be created or destroyed. It is like a cosmic fairness rule that keeps the stars burning and the planets moving. Everything stays in its right place because the universe loves to keep its books balanced.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A perfectly tuned C Major chord: the vibrations match up in a mathematical hug." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of a pine forest: the needles grow in symmetric patterns you can almost smell." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A pinch of salt in chocolate: salty and sweet balance each other perfectly." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pressing your two palms together: feel the heat and pressure match on both sides." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A snowflake under a microscope: six identical arms radiating from a center." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Standing on one leg while closing your eyes to feel your inner gyroscope work." }
        ],
        intuition: "Every symmetry in nature guarantees something is conserved. The universe keeps its books balanced because the rules never change.",
        links: [
          { label: "Britannica: Noether's Theorem", url: "https://www.britannica.com/science/Noethers-theorem" },
          { label: "Scientific American: Symmetry in Physics", url: "https://www.scientificamerican.com/" },
          { label: "Stanford: Symmetry", url: "https://plato.stanford.edu/entries/symmetry-breaking/" }
        ],
        songs: [
          { title: "Across the Universe", artist: "The Beatles", url: "https://www.youtube.com/watch?v=90M60PzmxEE" },
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" }
        ],
        advanced: "Noether's Theorem links differentiable symmetries of the action to conservation laws. Time homogeneity yields energy conservation; spatial isotropy yields angular momentum conservation. The bridge between geometry and the tangible persistence of reality. Connects to Gauge Theory and the Principle of Least Action." },

      { id: "bilateral-symmetry", num: 2, icon: "🦋", title: "Bilateral Symmetry", subtitle: "The Mirror Self",
        simple: "Most living things, including you, have a left side that looks almost exactly like the right side. This happens because it is the easiest way for nature to build a body that can move straight and fast. Think of a butterfly: if one wing were different, it could not fly in a straight line. Being balanced helps animals find food and escape danger. It is nature saying that two halves make a whole.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Stereo headphones playing the same volume in both ears." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Smelling a rose with both nostrils to get the full 3D scent." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Eating a sandwich where the ingredients are spread evenly to the edges." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Running your fingers down the center of a leaf to feel the identical veins." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A butterfly with perfectly matched wings spread open." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Walking in a straight line by putting one foot directly in front of the other." }
        ],
        intuition: "Two halves make a whole. Nature only needs to describe one half; the other is a mirror. Efficiency through reflection.",
        links: [
          { label: "Biology Online: Bilateral Symmetry", url: "https://www.biologyonline.com/dictionary/bilateral-symmetry" },
          { label: "National Geographic: Animal Body Plans", url: "https://education.nationalgeographic.org/" },
          { label: "Nature: Evolution of Symmetry", url: "https://www.nature.com/" }
        ],
        songs: [
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Reflection", artist: "Lea Salonga (Mulan)", url: "https://www.youtube.com/watch?v=1AfNOKQdY-U" },
          { title: "Mirrors", artist: "Justin Timberlake", url: "https://www.youtube.com/watch?v=uuZE_IRwLNI" }
        ],
        advanced: "Bilateral (sagittal plane) symmetry is a hallmark of Bilateria. It facilitated cephalization: concentration of nervous tissue and sensory organs at the anterior end, enabling directed movement and complex predation. The genetic blueprint only needs to describe one half. Connects to chirality in organic chemistry." },

      { id: "golden-ratio-symmetry", num: 3, icon: "🌀", title: "The Golden Ratio", subtitle: "Nature's Architecture",
        simple: "The Golden Ratio is a special number (1.618) that shows up in seashells, sunflowers, and even your own face. People find things with this ratio very beautiful because they look balanced without being perfectly identical. It is a secret code nature uses to grow things in the most efficient way possible. When you see a spiral in a galaxy or a hurricane, you are seeing this math in action. The perfect balance between growing bigger and staying the same shape.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A musical Perfect Fifth interval that feels stable and resolved." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The spiral pattern of petals on a lily." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The layered, repeating flavors in an onion." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Tracing the spiral of a snail shell with your thumb." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A nautilus shell sliced in half revealing the perfect spiral chambers." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the curve of your own ear, which often follows this ratio." }
        ],
        intuition: "Beauty is mathematical efficiency made visible. The Golden Ratio is nature's optimal growth algorithm.",
        links: [
          { label: "National Geographic: Golden Ratio", url: "https://www.nationalgeographic.com/science/article/golden-ratio" },
          { label: "Math Is Fun: Fibonacci & Nature", url: "https://www.mathsisfun.com/numbers/fibonacci-sequence.html" },
          { label: "The Spruce: Golden Ratio in Design", url: "https://www.thespruce.com/" }
        ],
        songs: [
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Golden", artist: "Harry Styles", url: "https://www.youtube.com/watch?v=P3cffdsEXXw" }
        ],
        advanced: "Phi is the limit of successive Fibonacci ratios. In phyllotaxis, it enables densest packing of seeds/leaves, minimizing overlap and maximizing sunlight exposure. An irrational number providing optimal non-periodic tiling. Connects to Sacred Geometry and Quasicrystals." },

      { id: "homeostasis", num: 4, icon: "🌡️", title: "Homeostasis", subtitle: "The Inner Balance",
        simple: "Your body is like a smart thermostat always trying to stay just right. If you get too hot, you sweat; too cold, you shiver. This balance is how you stay alive. It is not a frozen balance but a moving one, like a person on a tightrope. Every second, your heart and lungs work together to make sure nothing gets out of whack.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady, rhythmic thump-thump of your heartbeat." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The clean smell of fresh air after you have been in a stuffy room." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Drinking plain water when very thirsty: it tastes perfect." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The feeling of your breath moving in and out of your chest." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching your skin turn red when hot and pale when cold." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your body adjust its weight when you step from pavement to sand." }
        ],
        intuition: "Balance is not stillness. It is constant tiny corrections. Life is a tightrope walker who never stops moving.",
        links: [
          { label: "Khan Academy: Homeostasis", url: "https://www.khanacademy.org/science/biology/principles-of-physiology/body-structure-and-homeostasis/a/homeostasis" },
          { label: "Scientific American: Body Balance", url: "https://www.scientificamerican.com/" },
          { label: "Medical News Today: Homeostasis", url: "https://www.medicalnewstoday.com/articles/homeostasis" }
        ],
        songs: [
          { title: "Stayin' Alive", artist: "Bee Gees", url: "https://www.youtube.com/watch?v=fNFzfwLM72c" },
          { title: "Breathe", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=mrojrDCI02k" },
          { title: "The Middle", artist: "Jimmy Eat World", url: "https://www.youtube.com/watch?v=oKsxPW6i3pM" }
        ],
        advanced: "Homeostasis uses negative feedback loops: a sensor detects deviation from set point and triggers an effector to counteract the change. Maintains internal milieu within narrow physiological limits (pH, temperature, osmolarity). The biological manifestation of Cybernetics. Connects to Control Theory and Allostasis." },

      { id: "crystallography", num: 5, icon: "💎", title: "Crystallography", subtitle: "The Ordered Balance",
        simple: "Inside a diamond or a grain of salt, tiny atoms are lined up in perfect rows, like soldiers on parade. This is the most balanced way for matter to exist. Because atoms are so neatly organized, crystals are very strong and often very clear. When you look at a crystal, you are seeing a frozen version of perfect math. Underneath the messy world, there is a lot of hidden order.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The ting of a crystal glass being tapped." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The sharp, ozone smell of a salt lamp." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The crunch of a sugar crystal on your tongue." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Running your hand over a smooth, cold piece of quartz." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Light refracting through a prism into a rainbow." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the hardness and lack of give in a stone." }
        ],
        intuition: "Underneath the messy world is hidden order. Crystals are frozen math. Atoms choose the most balanced arrangement possible.",
        links: [
          { label: "IUCr: Crystallography", url: "https://www.iucr.org/" },
          { label: "Live Science: What are Crystals?", url: "https://www.livescience.com/crystals.html" },
          { label: "Smithsonian: Science of Gems", url: "https://www.si.edu/spotlight/hope-diamond" }
        ],
        songs: [
          { title: "Diamonds", artist: "Rihanna", url: "https://www.youtube.com/watch?v=lWA2pjMjpBs" },
          { title: "Shine On You Crazy Diamond", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=cWGE9Gi0bB0" },
          { title: "Crystal", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=jABWCBnDpCM" }
        ],
        advanced: "Crystallography uses X-ray diffraction to determine atomic arrangement. A crystal's symmetry is defined by its Space Group: translational and rotational symmetries in the lattice. Order results from free energy minimization during solidification. Connects to Group Theory and Solid State Physics." },

      { id: "fractal-symmetry", num: 6, icon: "🥦", title: "Fractal Geometry", subtitle: "The Repeating Balance",
        simple: "Fractals are patterns that repeat no matter how much you zoom in. A giant tree looks like a branch, and a branch looks like a tiny twig. This is nature balancing the big and the small. It allows your lungs or a river system to cover a huge area using a very simple rule. The same balance that works for a whole mountain also works for a tiny pebble.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A Shepard Tone: a sound that seems to rise in pitch forever." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of a Romanesco broccoli, which looks like a fractal." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The way cauliflower breaks into smaller mini-trees." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the repetitive bumps on a piece of coral." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A fern leaf where each frond mirrors the whole plant." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the branching of your own veins under your skin." }
        ],
        intuition: "The same rule that works for the mountain works for the pebble. Nature balances big and small with one simple recipe.",
        links: [
          { label: "Fractal Foundation", url: "https://fractalfoundation.org/resources/what-are-fractals/" },
          { label: "Wired: Hidden Geometry of Nature", url: "https://www.wired.com/" },
          { label: "MIT: The Mandelbrot Set", url: "https://math.mit.edu/" }
        ],
        songs: [
          { title: "Every Little Thing She Does Is Magic", artist: "The Police", url: "https://www.youtube.com/watch?v=aENX1Sf3fgQ" },
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "Intergalactic", artist: "Beastie Boys", url: "https://www.youtube.com/watch?v=qORYO0atB6g" }
        ],
        advanced: "Fractals possess non-integer Hausdorff Dimension. Generated by iterative functions where output becomes input (z=z^2+c). This recursive balance is central to Chaos Theory. Connects to Self-Organized Criticality and Algorithm Design." },

      { id: "nash-equilibrium", num: 7, icon: "🤝", title: "Equilibrium", subtitle: "The Social Balance",
        simple: "Sometimes balance is not about shapes but about how people get along. Equilibrium is when everyone in a group finds a way to act so that no one wants to change what they are doing. It is like a busy sidewalk where everyone walks at the right speed so nobody bumps into each other. Even when things seem messy or crowded, a natural balance usually shows up to keep things moving. We all find a way to fit in.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The hum of a busy coffee shop where everyone talks at just the right volume." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The blended smell of a potluck dinner where many foods mix into one scent." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A perfectly balanced soup: not too salty, not too spicy." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The give and take of a firm handshake." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A flock of birds moving in perfect formation without a leader." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Standing in a moving elevator and finding your balance." }
        ],
        intuition: "Even in chaos, a natural balance emerges. Everyone adjusts until nobody needs to change. Order from freedom.",
        links: [
          { label: "Investopedia: Nash Equilibrium", url: "https://www.investopedia.com/terms/n/nash-equilibrium.asp" },
          { label: "Stanford: Game Theory", url: "https://plato.stanford.edu/entries/game-theory/" },
          { label: "Economics Help: Market Equilibrium", url: "https://www.economicshelp.org/" }
        ],
        songs: [
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Under Pressure", artist: "Queen & David Bowie", url: "https://www.youtube.com/watch?v=a01QQZyl-_I" },
          { title: "Balance", artist: "Future Islands", url: "https://www.youtube.com/watch?v=8bSEHMBxmTw" }
        ],
        advanced: "A Nash Equilibrium is a strategy profile where no player benefits by unilateral change. A state of stasis in a dynamic system of agents. Vital for evolutionary biology (Evolutionary Stable Strategies) and market economics. Connects to Pareto Efficiency and Dynamic Systems Theory." },

      { id: "newtons-third-law", num: 8, icon: "🚀", title: "Newton's Third Law", subtitle: "The Action Balance",
        simple: "This law says you cannot touch something without it touching you back just as hard. Push on a wall and the wall pushes back on you. This is how rockets fly: they push fire out the bottom and the fire pushes the rocket up into the sky. It is a perfect, 100% fair balance of force. In the world of motion, you are always connected to everything you touch.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The echo of your own voice bouncing off a canyon wall." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of burnt rubber when a car pushes off the road quickly." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The bite of a spicy pepper that makes your mouth react instantly." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pushing against a heavy door and feeling it resist you." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A rocket lifting off, fire pushing down as the body flies up." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the kickback in your arm when you throw a heavy ball." }
        ],
        intuition: "Every action has an equal and opposite reaction. You are always connected to everything you touch. Push and be pushed.",
        links: [
          { label: "NASA: Newton's Third Law", url: "https://www.nasa.gov/stem/" },
          { label: "Physics Classroom: Action & Reaction", url: "https://www.physicsclassroom.com/class/newtlaws/Lesson-4/Newton-s-Third-Law" },
          { label: "Khan Academy: Forces & Motion", url: "https://www.khanacademy.org/science/physics/forces-newtons-laws" }
        ],
        songs: [
          { title: "Rocket Man", artist: "Elton John", url: "https://www.youtube.com/watch?v=DtVBCG6ThDk" },
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" },
          { title: "Waiting on the World to Change", artist: "John Mayer", url: "https://www.youtube.com/watch?v=oBIxScJ5rlY" }
        ],
        advanced: "Newton's Third Law is a consequence of Conservation of Momentum. In a closed system, total momentum remains constant: any change in one object's momentum is balanced by an equal and opposite change in another. Defines the symmetry of interactions in classical mechanics. Connects to Reciprocity Theorem." },

      { id: "yin-yang", num: 9, icon: "☯️", title: "Yin and Yang", subtitle: "The Dual Balance",
        simple: "This old idea says you cannot have up without down, or light without dark. They are not enemies; they are partners that need each other to exist. Think of a battery with a plus and minus side: you need both to make the lightbulb turn on. Balance is not about picking one side; it is making sure both sides have their turn. Even the dark parts of life help make the good parts meaningful.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The silence between notes in a song that makes the music beautiful." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of rain on dry dirt: petrichor." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Sweet and sour chicken." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The feeling of a cool breeze on a hot summer day." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The black and white Yin-Yang symbol with a dot of each color in the other." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The heaviness in your muscles after a long day of light activity." }
        ],
        intuition: "You cannot have light without dark. They are partners, not enemies. Both sides are needed to turn on the light.",
        links: [
          { label: "World History: Yin and Yang", url: "https://www.worldhistory.org/Yin_and_Yang/" },
          { label: "National Geographic: Taoism", url: "https://www.nationalgeographic.com/" },
          { label: "Philosophy Now: Yin-Yang Logic", url: "https://philosophynow.org/" }
        ],
        songs: [
          { title: "Ebony and Ivory", artist: "Paul McCartney & Stevie Wonder", url: "https://www.youtube.com/watch?v=TZtiJN6yiik" },
          { title: "Black or White", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=F2AitTPI5U0" },
          { title: "Both Sides Now", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=Pbn6a0AFfnM" }
        ],
        advanced: "Dialectical Monism: the universe is a single whole expressing itself through dualities. Parallels Complementarity in quantum mechanics (wave-particle duality), where seemingly contradictory properties are both necessary to describe full reality. Connects to Hegelian Dialectics and Quantum Superposition." },

      { id: "zero-sum-dynamics", num: 10, icon: "⚖️", title: "Zero-Sum Dynamics", subtitle: "The Fixed Balance",
        simple: "A zero-sum game is like a pizza with a fixed number of slices. If your friend takes a bigger slice, yours has to be smaller. The total stays the same, but how it is shared changes. While this can feel unfair, it is a very strict kind of balance in math and money. It reminds us that resources are often limited, and for the whole system to stay balanced, every plus somewhere must have a minus somewhere else.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A see-saw siren: up-down, up-down." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of a match being struck: energy moving from stick to flame." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A bitter medicine you take to feel better: a trade-off." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pushing all the water to one side of a bathtub." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A perfectly balanced scale with equal weights on both sides." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Shifting all your weight to your left foot, leaving the right foot empty." }
        ],
        intuition: "Every plus requires a minus. The total never changes, only how it is shared. The universe keeps score.",
        links: [
          { label: "Corporate Finance: Zero-Sum Game", url: "https://corporatefinanceinstitute.com/resources/economics/zero-sum-game/" },
          { label: "Britannica: Zero-Sum Theory", url: "https://www.britannica.com/topic/zero-sum-game" },
          { label: "Scientific American: Is Life Zero-Sum?", url: "https://www.scientificamerican.com/" }
        ],
        songs: [
          { title: "Money", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=cpbbuaIA3Ds" },
          { title: "The Winner Takes It All", artist: "ABBA", url: "https://www.youtube.com/watch?v=92cwKCU8Z5c" },
          { title: "Karma Police", artist: "Radiohead", url: "https://www.youtube.com/watch?v=1uYWYWPc9HU" }
        ],
        advanced: "A zero-sum game: each participant's gain/loss is exactly balanced by others. Total gains minus total losses sum to zero. Common in constant-sum games and classical thermodynamics (energy transfer). Connects to Thermodynamics and Resource Competition in ecology." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // MATHEMATICS (promise) > LOGIC & PROOF (proof)
    // ═══════════════════════════════════════════════════════════════

    proof: [
      { id: "law-noncontradiction", num: 1, icon: "=", title: "The Law of Non-Contradiction", subtitle: "The Most Basic Yes or No",
        simple: "Logic is like a rule that says a light cannot be both on and off at the exact same moment. If something is a circle, it cannot also be a square, because the rules of being a circle do not allow corners. This helps us find truth because it weeds out ideas that fight with themselves. When two things cancel each other out, they cannot both be true at once. Following this rule keeps our minds clear and helps us see the world as it really is.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady, unchanging hum of a tuning fork." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The sharp, clear scent of peppermint that wakes up the nose." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The unmistakable sourness of a fresh lemon: it is not sweet." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The solid resistance of a brick wall; your hand cannot pass through it." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A perfectly straight line drawn on a white page." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your feet planted firmly on the floor, knowing you are not floating." }
        ],
        intuition: "A thing cannot be and not be at the same time. This is the bedrock on which all truth is built. The first yes or no in the universe.",
        links: [
          { label: "Stanford: Contradiction", url: "https://plato.stanford.edu/entries/contradiction/" },
          { label: "Britannica: Non-Contradiction", url: "https://www.britannica.com/topic/law-of-noncontradiction" },
          { label: "Introduction to Logic: Aristotle", url: "https://iep.utm.edu/aristotl/" }
        ],
        songs: [
          { title: "Hello, Goodbye", artist: "The Beatles", url: "https://www.youtube.com/watch?v=rblYSKz_VnI" },
          { title: "Black or White", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=F2AitTPI5U0" },
          { title: "Hot N Cold", artist: "Katy Perry", url: "https://www.youtube.com/watch?v=kTHNpusq654" }
        ],
        advanced: "The Law of Non-Contradiction (¬(P∧¬P)) is the ontological bedrock of classical logic. Contradictory propositions cannot both be true in the same sense at the same time. This prevents the principle of explosion. Connects to the Pauli Exclusion Principle: two fermions cannot occupy the same quantum state simultaneously." },

      { id: "deductive-reasoning", num: 2, icon: "↓", title: "Deductive Reasoning", subtitle: "The Guaranteed Map to Treasure",
        simple: "Deductive reasoning is like following a map guaranteed to lead to treasure if the start point is right. If all dogs bark and Sparky is a dog, then Sparky barks! It shrinks a big truth into a small, specific fact. You do not have to guess because the answer is hidden inside what you already know. It feels like a key sliding perfectly into a lock and turning. This is how we build proofs that stay true forever.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A ding sound when a puzzle piece fits." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of rain (petrichor) that proves a storm just passed." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The saltiness of seawater: deducing the ocean is near." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the heat of a stove before you even touch the burner." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Watching a shadow move and knowing exactly where the sun is." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Closing your eyes and knowing exactly where your nose is because your brain mapped it." }
        ],
        intuition: "The answer is already hidden inside what you know. Deduction is top-down logic: from the general to the specific, without losing any certainty.",
        links: [
          { label: "Deductive vs Inductive Reasoning", url: "https://www.thoughtco.com/deductive-vs-inductive-reasoning-3026549" },
          { label: "Khan Academy: Logical Arguments", url: "https://www.khanacademy.org/math/geometry/hs-geo-congruence" },
          { label: "Philosophy Basics: Deduction", url: "https://www.philosophybasics.com/branch_deontology.html" }
        ],
        songs: [
          { title: "Sherlock Theme", artist: "BBC", url: "https://www.youtube.com/watch?v=LgeRKh2-JGY" },
          { title: "Every Breath You Take", artist: "The Police", url: "https://www.youtube.com/watch?v=OMOGaugKpzs" },
          { title: "Harder, Better, Faster, Stronger", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=gAjR4_CbPpQ" }
        ],
        advanced: "Deduction derives conclusions that follow necessarily from stated premises. If premises are true, the conclusion must be true (P⟹Q). This is top-down logic: the framework for Euclidean geometry and computer programming, where specific outputs are necessary results of initial code and logic gates." },

      { id: "mathematical-induction", num: 3, icon: "∞", title: "Mathematical Induction", subtitle: "The Domino Proof",
        simple: "Imagine millions of dominoes standing in a line. Mathematical induction proves that if you knock down the first one, and every domino knocks down the next, then every single domino will eventually fall. You do not have to watch them all! It is a way of proving things about infinity using just two simple steps. It shows that patterns in the universe are reliable and will keep going forever. This gives us a sense of always and forever in our math.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The rhythmic ticking of a clock that never stops." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of fresh pine needles in a giant forest of the same trees." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The repetitive sweetness of a long string of candy beads." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Running your hand along a fence and feeling every post." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking into two mirrors facing each other: the infinity effect." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The feeling of walking: one step always leads to the next." }
        ],
        intuition: "Knock down the first. Prove each knocks the next. Therefore all fall. Two steps prove infinity.",
        links: [
          { label: "Wolfram: Mathematical Induction", url: "https://mathworld.wolfram.com/MathematicalInduction.html" },
          { label: "The Beauty of Induction", url: "https://en.wikipedia.org/wiki/Mathematical_induction" },
          { label: "Art of Problem Solving: Induction", url: "https://artofproblemsolving.com/wiki/index.php/Induction" }
        ],
        songs: [
          { title: "Bitter Sweet Symphony", artist: "The Verve", url: "https://www.youtube.com/watch?v=1lyu1KKwC74" },
          { title: "I Walk the Line", artist: "Johnny Cash", url: "https://www.youtube.com/watch?v=KHF9itPLUo4" },
          { title: "The Chain", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=JDG2m5hN1vo" }
        ],
        advanced: "Mathematical induction proves P(n) for all natural numbers via Base Case (P(1) is true) and Inductive Step (P(k) true implies P(k+1) true). Foundational in number theory and set theory. Connects to recursion, self-similarity in fractals, and DNA replication: one rule generates infinite structure." },

      { id: "axiomatic-systems", num: 4, icon: "Δ", title: "Axiomatic Systems", subtitle: "The Foundation Stones",
        simple: "An axiomatic system is like a giant skyscraper built on very thick, solid concrete. That base is made of axioms: things so obviously true we do not even need to prove them, like a straight line can connect any two points. Everything else in the building stays up because the base is strong. If we agree on the base, we can build a whole world of truth on top. To understand big things, we must first agree on the simplest things.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The very first C note on a piano." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of clean, fresh dirt: the earth we stand on." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Plain, cool water: the base of all drinks." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Grabbing a heavy, solid rock that will not break." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The horizon line where the sky meets the earth." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The feeling of balance when you stand perfectly still." }
        ],
        intuition: "Agree on the simplest truths first, and a whole world of knowledge can be built on top. The base determines the building.",
        links: [
          { label: "Encyclopedia: Axiomatic System", url: "https://www.encyclopedia.com/science-and-technology/mathematics/mathematics/axiomatic-method" },
          { label: "The Story of Mathematics: Euclid", url: "https://www.storyofmathematics.com/greek_euclid.html" },
          { label: "Axioms of Probability", url: "https://en.wikipedia.org/wiki/Probability_axioms" }
        ],
        songs: [
          { title: "Stand By Me", artist: "Ben E. King", url: "https://www.youtube.com/watch?v=hwZNL7QVJjE" },
          { title: "Lean On Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Seven Nation Army", artist: "The White Stripes", url: "https://www.youtube.com/watch?v=0J2QdDbelmY" }
        ],
        advanced: "An axiomatic system derives theorems from a set of axioms using logical rules. Prominent examples: Euclidean Geometry and Zermelo-Fraenkel set theory. Evaluated on consistency, independence, and completeness. Relates to First Principles Thinking: breaking complex problems into basic truths and reassembling." },

      { id: "syllogisms", num: 5, icon: "∴", title: "Syllogisms", subtitle: "The Three-Step Dance",
        simple: "A syllogism is a three-step dance for your brain. Step one: a big fact (All birds have feathers). Step two: a small fact (A penguin is a bird). Step three: the Ta-da moment (Therefore, a penguin has feathers). It connects dots to see a picture that was already there. You are acting like a detective who finds the answer by looking at how clues fit together. It makes complicated thoughts feel very simple and organized.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A snap sound like fingers clicking together." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of baking bread: knowing there is an oven nearby." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Tasting sugar and knowing the tea will be sweet." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the texture of a leaf and knowing it is a maple tree." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing three dots in a row and your brain seeing a line." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling your arm move and knowing your hand is following." }
        ],
        intuition: "Big fact plus small fact equals new truth. The conclusion was always there, hiding in the premises. Three steps to certainty.",
        links: [
          { label: "Philosophy Terms: Syllogism", url: "https://philosophyterms.com/syllogism/" },
          { label: "New World Encyclopedia: Syllogism", url: "https://www.newworldencyclopedia.org/entry/Syllogism" },
          { label: "Literary Devices: Syllogism", url: "https://literarydevices.net/syllogism/" }
        ],
        songs: [
          { title: "ABC", artist: "The Jackson 5", url: "https://www.youtube.com/watch?v=ho7796-au8U" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" },
          { title: "Believer", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=7wtfhZwyrcc" }
        ],
        advanced: "A syllogism consists of major premise, minor premise, and conclusion (P→Q, Q→R, ∴ P→R). Developed by Aristotle as the classic model for formal logic. The conclusion is inescapable if premises hold. Used in legal reasoning and categorical logic to classify and determine truth." },

      { id: "boolean-algebra", num: 6, icon: "{0,1}", title: "Boolean Algebra", subtitle: "The Language of True and False",
        simple: "Boolean Algebra is the language of True and False. Think of it like a light switch: only up or down. Computers use AND (both must be on), OR (either can be on), and NOT (the opposite). There are no maybes or sort-ofs. By using these simple gates, we build incredibly smart machines like phones and robots. Even the most complex things are made of simple choices.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The click-clack of a mechanical keyboard." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The ozone smell of a computer or electric spark." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A hot pepper vs. a cold ice cube: the ultimate opposite." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Pressing a button: it is either pushed or it is not." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Black text on a bright white screen." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Knowing if your eyes are open or closed." }
        ],
        intuition: "The most complex things are built from simple yes-or-no choices. AND, OR, NOT: three gates to build a universe.",
        links: [
          { label: "TechTarget: Boolean Algebra", url: "https://www.techtarget.com/whatis/definition/Boolean" },
          { label: "GeeksforGeeks: Boolean Algebra", url: "https://www.geeksforgeeks.org/introduction-to-boolean-algebra/" },
          { label: "Boolean Logic in Programming", url: "https://en.wikipedia.org/wiki/Boolean_algebra" }
        ],
        songs: [
          { title: "Technologic", artist: "Daft Punk", url: "https://www.youtube.com/watch?v=D8K90hX4PrE" },
          { title: "The Model", artist: "Kraftwerk", url: "https://www.youtube.com/watch?v=GEnx9xS79Lc" },
          { title: "Paranoid Android", artist: "Radiohead", url: "https://www.youtube.com/watch?v=fHiGbolFFGw" }
        ],
        advanced: "Boolean Algebra operates on truth values (1 and 0) using intersection, union, and complementation. The mathematical foundation of digital circuits and computer science. Connects to Binary Opposition in structuralism: human thought organized around fundamental dualities." },

      { id: "propositional-logic", num: 7, icon: "→", title: "Propositional Logic", subtitle: "The Skeleton of an Argument",
        simple: "Propositional logic is like building a sentence using math symbols. Instead of words, we use letters like P and Q connected with if-then. For example: If it is Saturday (P), then I sleep late (Q). This helps us look at the structure of what people say to see if it makes sense, regardless of what they are talking about. It is like looking at the skeleton of an argument to see if it is strong enough to hold the weight of truth.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady thump-thump of a heartbeat: if alive, then heart beats." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of smoke: if there is smoke, then there is fire." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Tasting salt: if salty, then there is sodium." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling wetness: if wet, then there is liquid." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing a green light: if green, then go." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling a tilt: if tilting, then gravity is pulling." }
        ],
        intuition: "Strip away the words. Look at the skeleton. If the structure holds, the truth holds. Form over content.",
        links: [
          { label: "Brilliant: Propositional Logic", url: "https://brilliant.org/wiki/propositional-logic/" },
          { label: "Logic Matters: Formal Logic", url: "https://www.logicmatters.net/" },
          { label: "Philosophy Pages: Propositional Logic", url: "https://www.philosophypages.com/lg/e06.htm" }
        ],
        songs: [
          { title: "Mr. Brightside", artist: "The Killers", url: "https://www.youtube.com/watch?v=gGdGFtwCNBE" },
          { title: "No Woman, No Cry", artist: "Bob Marley", url: "https://www.youtube.com/watch?v=x59kS2AOrGM" },
          { title: "Ironic", artist: "Alanis Morissette", url: "https://www.youtube.com/watch?v=Jne9t8sHpUc" }
        ],
        advanced: "Propositional (sentential) logic evaluates truth-functionality of complex statements using logical connectives. Truth tables determine validity. The gateway to Symbolic Logic: stripping natural language ambiguity to reveal raw logical mechanics underneath." },

      { id: "godels-incompleteness", num: 8, icon: "?", title: "Gödel's Incompleteness Theorems", subtitle: "The Limit of Proof",
        simple: "Gödel proved that even in math, there are secrets we can never prove even if they are true! It is like having a giant box of LEGOs but knowing there is one shape you can never build, even with all the pieces. It tells us that logic has a limit and the universe is always a little bigger than our brains. This does not mean truth does not exist; it just means our proof-maker is not big enough to catch every truth in its net.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "An echo that never quite fades away." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of the ocean: huge and impossible to fully know." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The taste of a mystery-flavored candy." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Trying to catch a shadow in your hand." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "An Escher staircase that goes up forever." },
          { key: "body", icon: "🫀", sense: "BODY", text: "That falling feeling right before you fall asleep." }
        ],
        intuition: "The universe is always a little bigger than our brains. Some truths are real but unprovable. The net has holes, but the ocean is still there.",
        links: [
          { label: "Quanta: Gödel's Incompleteness", url: "https://www.quantamagazine.org/tag/godels-incompleteness-theorems/" },
          { label: "Stanford: Gödel's Theorems", url: "https://plato.stanford.edu/entries/goedel-incompleteness/" },
          { label: "Scientific American: Limits of Logic", url: "https://www.scientificamerican.com/" }
        ],
        songs: [
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Comfortably Numb", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=_FrOQC-zEog" }
        ],
        advanced: "Gödel's theorems: in any consistent axiomatic system powerful enough for arithmetic, there exist true statements unprovable within the system, and the system cannot prove its own consistency. Destroyed Hilbert's Program. Suggests human intuition may access truths formal logic cannot reach." },

      { id: "reductio-absurdum", num: 9, icon: "⊥", title: "Reductio ad Absurdum", subtitle: "Reduce It to the Ridiculous",
        simple: "Reductio ad Absurdum means Reduce it to the Ridiculous. To prove something true, pretend the opposite is true for a second. Then show that if the opposite were true, something crazy and impossible would happen! For example, to prove it is daytime, pretend it is night. But if it were night, the sky would be dark, and since the sky is bright, it must be day. It is winning an argument by showing how silly the other side is.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A loud, funny slide whistle sound." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of something fishy: when you know a story does not fit." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Orange juice right after brushing teeth: something is off." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Trying to push two magnets together when they repel." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A find-the-mistake picture where a cat has five legs." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Trying to walk through a doorway that is painted on a wall." }
        ],
        intuition: "Assume the opposite. Watch it explode. Therefore your original claim stands. Prove truth by disproving its shadow.",
        links: [
          { label: "Logic Museum: Reductio", url: "https://www.logicmuseum.com/wiki/Reductio_ad_absurdum" },
          { label: "Philosophy: Reductio", url: "https://iep.utm.edu/reductio/" },
          { label: "Math is Fun: Proof by Contradiction", url: "https://www.mathsisfun.com/algebra/proof-by-contradiction.html" }
        ],
        songs: [
          { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
          { title: "Who Are You", artist: "The Who", url: "https://www.youtube.com/watch?v=PNbBDrceCy8" },
          { title: "In The End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4" }
        ],
        advanced: "Proof by Contradiction: if P implies falsehood, then not-P must be true. One of the most powerful mathematical tools, famously proving sqrt(2) is irrational. Relates to the Socratic Method: questions leading to contradiction reveal the falsity of the initial position." },

      { id: "inductive-logic", num: 10, icon: "≈", title: "Inductive Logic", subtitle: "The Pattern Finder",
        simple: "Inductive logic is like being a weather reporter. You see clouds, you see wind, and you say it will probably rain. You are not 100% sure like in math, but very very close! It is about finding patterns. If every apple you have ever eaten is sweet, you believe the next one will be too. It is how we learn from experience. While deduction says must be, induction says most likely, which is how we live our daily lives.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The sound of a crowd cheering: you assume they are happy." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The smell of popcorn: you assume a movie is playing." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Tasting a spicy pepper and assuming the rest of the dish is spicy." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling a soft blanket and assuming it will be cozy to sleep in." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing the sun go down and knowing it will come up tomorrow." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Knowing how much force to pick up a milk carton because you have done it before." }
        ],
        intuition: "Deduction says must be. Induction says most likely. One is the lock, the other is experience knocking on the door.",
        links: [
          { label: "Introduction to Logic: Induction", url: "https://iep.utm.edu/ded-ind/" },
          { label: "Scientific Method and Induction", url: "https://en.wikipedia.org/wiki/Inductive_reasoning" },
          { label: "Hume's Problem of Induction", url: "https://plato.stanford.edu/entries/induction-problem/" }
        ],
        songs: [
          { title: "Ocean Eyes", artist: "Billie Eilish", url: "https://www.youtube.com/watch?v=viimfQi_pUw" },
          { title: "I Still Haven't Found What I'm Looking For", artist: "U2", url: "https://www.youtube.com/watch?v=e3-5YC_oHjE" },
          { title: "Don't Stop Believin'", artist: "Journey", url: "https://www.youtube.com/watch?v=1k8craCGpgs" }
        ],
        advanced: "Induction: premises supply strong evidence for probabilistic conclusions. The basis of the scientific method: hypotheses from repeated observations. Hume's Problem of Induction asks how we justify belief in nature's uniformity when experience covers only the past, not the future." },
    ],

  },

  layers: {
    // ═══════════════════════════════════════════════════════════════
    // PHILOSOPHY (layers) > TRUTH & KNOWLEDGE (truth)
    // ═══════════════════════════════════════════════════════════════

    truth: [
      { id: "objective-vs-subjective", num: 1, icon: "👁️", title: "Objective Reality vs. Subjective Perception", subtitle: "The Film Strip and the Screen",
        simple: "Reality is the world as it actually exists, while perception is how your brain interprets it. Think of it like a movie: objective reality is the actual film strip, but your perception is the screen you are watching. Sometimes our brains play tricks, like seeing a puddle on a hot road that is not really there. When all your senses work together, your gut tells you that you are part of a big, solid world.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady hum of a fan: you hear a hum, but it is actually just air moving fast." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A fresh orange: your nose tells your brain fruit before you even see it." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The sourness of a lemon: your mouth reacts automatically before your mind decides." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A cold stone: feel the heat leave your hand into the rock." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A sunset: the sun is not moving down, the Earth is spinning." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feel your feet on the floor right now to know exactly where you are in space." }
        ],
        intuition: "You never touch raw reality. You touch your brain's best guess. The map is not the territory, but it is the only map you have.",
        links: [
          { label: "Nature: Neural Basis of Perception", url: "https://www.nature.com/subjects/perception" },
          { label: "Stanford: Epistemology", url: "https://plato.stanford.edu/entries/epistemology/" },
          { label: "Scientific American: Reality Is a Hallucination", url: "https://www.scientificamerican.com/" }
        ],
        songs: [
          { title: "Time", artist: "Pink Floyd", url: "https://www.youtube.com/watch?v=JwYX52BP2Sk" },
          { title: "Clubbed to Death", artist: "Rob Dougan", url: "https://www.youtube.com/watch?v=pFS4zYWxzNA" },
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" }
        ],
        advanced: "The distinction between noumena (things as they are) and phenomena (things as we experience them). Our cognitive architecture filters raw data through sensory modalities and mental categories. We never encounter raw reality, only a processed model. The scientific method seeks to minimize subjective bias through peer review and reproducible experimentation." },

      { id: "scientific-method", num: 2, icon: "🧪", title: "The Scientific Method", subtitle: "The Question Machine",
        simple: "This is a special way of asking questions to find out if something is true. You start with a guess, then test it to see if you were right. If you want to know if a plant needs milk or water, you give milk to one and water to another and watch what happens. This helps you trust that things happen for a reason, not just by magic.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The pop of a science experiment working." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The metallic scent of rain: you know a storm is coming." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The difference between salt and sugar: proof that looks can be deceiving." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The vibration of a speaker: you can feel sound." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A seed growing over many days: patience reveals truth." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Close your eyes and stand on one leg: feel how your body finds balance." }
        ],
        intuition: "Guess. Test. Watch. Adjust. Repeat. Truth is not handed down, it is dug up one experiment at a time.",
        links: [
          { label: "Khan Academy: Scientific Method", url: "https://www.khanacademy.org/science/biology/intro-to-biology/science-of-biology/a/the-science-of-biology" },
          { label: "NASA: Scientific Method", url: "https://www.nasa.gov/" },
          { label: "Britannica: Scientific Method", url: "https://www.britannica.com/science/scientific-method" }
        ],
        songs: [
          { title: "She Blinded Me With Science", artist: "Thomas Dolby", url: "https://www.youtube.com/watch?v=V83JR2IoI8k" },
          { title: "The Scientist", artist: "Coldplay", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
          { title: "Weird Science", artist: "Oingo Boingo", url: "https://www.youtube.com/watch?v=Jm-upHSP9KU" }
        ],
        advanced: "An iterative process of hypothesis, deduction, and empirical testing. Relies on falsifiability: for a statement to be scientific, it must be possible to prove it wrong. Connects to Bayesian inference, where confidence in a truth is updated as new evidence arrives, approaching but never claiming absolute certainty." },

      { id: "logical-fallacies", num: 3, icon: "🧩", title: "Logical Fallacies", subtitle: "Brain Traps",
        simple: "Logical fallacies are brain traps: mistakes in thinking that make us believe things that are not true. Imagine someone says all birds fly, penguins are birds, therefore penguins fly. That is a trap because the first part is not always true! Learning these traps helps your mind stay sharp and honest.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A trick in someone's voice when they try to fool you." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Old, dusty books: just because something is written down does not make it fact." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A fake fruit flavor: close, but not the real thing." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The slickness of a marble: feel how easily thoughts can slide away." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The hidden person in an optical illusion." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feel your heart race when confused, then breathe to find the truth." }
        ],
        intuition: "Your brain takes shortcuts to save energy. Sometimes those shortcuts lead off a cliff. Name the trap and it loses its power.",
        links: [
          { label: "YourLogicalFallacyIs.com", url: "https://yourlogicalfallacyis.com/" },
          { label: "Purdue OWL: Logical Fallacies", url: "https://owl.purdue.edu/owl/general_writing/academic_writing/logic_in_argumentative_writing/fallacies.html" },
          { label: "Harvard: Thinking Fast and Slow", url: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555" }
        ],
        songs: [
          { title: "Won't Get Fooled Again", artist: "The Who", url: "https://www.youtube.com/watch?v=SHhrZgojY1Q" },
          { title: "Sweet Dreams", artist: "Eurythmics", url: "https://www.youtube.com/watch?v=qeMFqkcPYcg" },
          { title: "Fool on the Hill", artist: "The Beatles", url: "https://www.youtube.com/watch?v=DGEX_7IqbKk" }
        ],
        advanced: "Cognitive biases and informal fallacies like Ad Hominem or Post Hoc Ergo Propter Hoc undermine rational discourse. These are heuristic shortcuts the brain takes to conserve energy, leading to systemic errors in judgment. In formal logic, maintaining validity and soundness ensures conclusions necessarily follow from premises." },

      { id: "occams-razor", num: 4, icon: "🪒", title: "Occam's Razor", subtitle: "The Simplest Answer Wins",
        simple: "Occam's Razor says that usually the simplest answer is the right one. If you hear hoofbeats outside your window in Kentucky, think horses, not zebras. You do not need a giant complicated story to explain why your socks went missing: the dryer probably just ate them! When you stop overthinking, the truth often just sits there waiting for you to notice it.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The simple beat of a single drum." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A single rose instead of a perfume factory." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Plain bread: the true flavor with nothing hiding it." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The smooth surface of still water." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A straight line: the shortest distance between two points." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feel your center of gravity: balance is simplicity in the body." }
        ],
        intuition: "Do not multiply causes beyond necessity. The truth does not hide behind complexity. It hides behind simplicity.",
        links: [
          { label: "UC: Occam's Razor", url: "https://math.ucr.edu/home/baez/physics/General/occam.html" },
          { label: "Britannica: Occam's Razor", url: "https://www.britannica.com/topic/Occams-razor" },
          { label: "Philosophy Now: The Razor's Edge", url: "https://philosophynow.org/" }
        ],
        songs: [
          { title: "Let It Be", artist: "The Beatles", url: "https://www.youtube.com/watch?v=QDYfEBY9NM4" },
          { title: "Simple Man", artist: "Lynyrd Skynyrd", url: "https://www.youtube.com/watch?v=sMmTkKz60W8" },
          { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4fWyzwo1xg0" }
        ],
        advanced: "In statistical modeling and physics, this is parsimony. When multiple models explain a phenomenon equally well, the one with fewest assumptions is preferred because it is least likely to overfit. Vital in quantum mechanics and the search for a Theory of Everything: the most elegant mathematical description wins." },

      { id: "mathematical-constants", num: 5, icon: "π", title: "Mathematical Constants", subtitle: "The Universe's Secret Language",
        simple: "Math is the secret language of the universe that never changes no matter where you are. A circle is always a circle and 2+2 is always 4 whether you are on Earth or Mars. It is a truth we can all agree on because it never lies. Math is the skeleton of everything we see, holding the world together in a way we can calculate.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The rhythm of a song: that is math you can hear." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The symmetry of a pinecone: it follows mathematical patterns." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The perfect balance of a recipe: ratios you can taste." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A snowflake: feel its geometric shape melting on your skin." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The spiral patterns in a sunflower's seeds." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feel the weight difference between a heavy ball and a light one: gravity measured by your muscles." }
        ],
        intuition: "Math is not invented. It is discovered. The universe wrote its laws in numbers and dared us to read them.",
        links: [
          { label: "Wolfram: Mathematical Constants", url: "https://mathworld.wolfram.com/Constant.html" },
          { label: "MIT: Why Math Works", url: "https://www.mit.edu/" },
          { label: "Project Mathematics!", url: "https://www.projectmathematics.com/" }
        ],
        songs: [
          { title: "Lateralus", artist: "Tool", url: "https://www.youtube.com/watch?v=Y7JG63IuaWs" },
          { title: "Numbers", artist: "Kraftwerk", url: "https://www.youtube.com/watch?v=4YPiCeLwh5o" },
          { title: "Murder by Numbers", artist: "The Police", url: "https://www.youtube.com/watch?v=GDNiYIPNgEo" }
        ],
        advanced: "Mathematical Realism suggests mathematical truths are discovered, not invented. Constants like e, π, and φ appear across disparate fields from finance to phyllotaxis, implying deep structural order. Connects to Universalism: certain truths remain invariant regardless of the observer's frame of reference." },

      { id: "historical-records", num: 6, icon: "📜", title: "Historical Records & Archaeology", subtitle: "Detective Work for the Whole World",
        simple: "We know what happened in the past because people left clues like old letters, ruins, and pottery. It is like being a detective for the whole world. If three different people wrote down that a king was kind, he probably was! Knowing where we came from helps us see the truth of where we are now.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The echo in an old building: sound bouncing off centuries." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of old paper or rain on dry dirt: petrichor of the past." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A fig: a fruit grown for thousands of years, unchanged." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A very old brick: feel the work of someone from long ago." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "An old photograph: frozen light from a moment that is gone." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feel the history in your own bones as you walk where others walked." }
        ],
        intuition: "Truth in history is triangulation: where multiple independent sources point to the same spot, dig there.",
        links: [
          { label: "The British Museum: Research", url: "https://www.britishmuseum.org/research" },
          { label: "Smithsonian: History and Culture", url: "https://www.si.edu/explore" },
          { label: "Archaeology Magazine", url: "https://www.archaeology.org/" }
        ],
        songs: [
          { title: "Rivers of Babylon", artist: "Boney M.", url: "https://www.youtube.com/watch?v=ta42xU2UXLA" },
          { title: "Alexander the Great", artist: "Iron Maiden", url: "https://www.youtube.com/watch?v=1oTEQf1d9hw" },
          { title: "Fight the Power", artist: "Public Enemy", url: "https://www.youtube.com/watch?v=8PaoLy7PHwk" }
        ],
        advanced: "Historiography studies how history is written. It requires triangulation: comparing multiple independent sources to find the intersection of truth. While no record is perfectly objective, the convergence of archaeological evidence and written testimony provides a high-confidence model of past events." },

      { id: "quantum-uncertainty", num: 7, icon: "⚛️", title: "Quantum Uncertainty", subtitle: "The Fuzziness at the Bottom",
        simple: "At the very tiny level of atoms, things are a bit fuzzy and can be in two places at once until someone looks at them. This teaches us that the world is more mysterious than it looks on the outside. Even if we cannot see it, there is a lot of maybe happening everywhere. This reminds us that there is always more to learn and that real might be bigger than we think.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "White noise: all the possibilities playing at once." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The air after lightning (ozone): invisible energy made real." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The zing of static on your tongue: electrons you can taste." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A static shock: the quantum world reaching out to tap you." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Static on an old TV: randomness made visible." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The tingle on your skin when you are excited: your body sensing what your mind has not named yet." }
        ],
        intuition: "At the bottom of everything, the universe keeps a little bit of mystery for itself. Certainty has a floor. Below it: probability.",
        links: [
          { label: "Scientific American: Quantum Physics", url: "https://www.scientificamerican.com/quantum-physics/" },
          { label: "Caltech: Quantum Entanglement", url: "https://scienceexchange.caltech.edu/topics/quantum-science-explained/entanglement" },
          { label: "CERN: The Standard Model", url: "https://home.cern/science/physics/standard-model" }
        ],
        songs: [
          { title: "Everything In Its Right Place", artist: "Radiohead", url: "https://www.youtube.com/watch?v=sKZN115n6MI" },
          { title: "Electric Feel", artist: "MGMT", url: "https://www.youtube.com/watch?v=MmZexg8sxyk" },
          { title: "Good Vibrations", artist: "The Beach Boys", url: "https://www.youtube.com/watch?v=Eab_beh07HU" }
        ],
        advanced: "Heisenberg's Uncertainty Principle: we cannot know both position and momentum with perfect precision. The universe is fundamentally probabilistic, not deterministic. Challenges classical truth as a fixed singular state. The observer effect means the act of measurement influences the reality being observed." },

      { id: "consensus-reality", num: 8, icon: "🤝", title: "Consensus Reality", subtitle: "The Truth We Build Together",
        simple: "Consensus reality is what we all agree is true so we can live together, like which side of the road to drive on or what money is worth. It might not be nature's truth, but it is our truth. If everyone agrees a stop sign means stop, then it becomes a real rule for everyone. This shows us that we create part of our world together through shared stories and rules.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A crowd cheering together: one voice made of many." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Popcorn at a movie theater everyone is sharing." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A meal that everyone says is good: taste confirmed by agreement." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A handshake: two people agreeing with their bodies." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A group of people walking in the same direction: shared intention made visible." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feel the vibe of a happy room: your body reading the collective signal." }
        ],
        intuition: "Some truths exist because the universe says so. Others exist because we all decided together. Know which is which.",
        links: [
          { label: "Psychology Today: Social Reality", url: "https://www.psychologytoday.com/" },
          { label: "Philosophy Now: Social Constructionism", url: "https://philosophynow.org/" },
          { label: "The Atlantic: Consensus", url: "https://www.theatlantic.com/" }
        ],
        songs: [
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "Everybody Wants to Rule the World", artist: "Tears for Fears", url: "https://www.youtube.com/watch?v=aGCdLKXNF3w" }
        ],
        advanced: "The Thomas Theorem: if men define situations as real, they are real in their consequences. Physical laws are independent of us, but social truths like laws, value, and identity exist because of collective intentionality. Understanding this prevents confusing cultural constructs with physical constants." },

      { id: "empirical-evidence", num: 9, icon: "🔬", title: "Empirical Evidence", subtitle: "Seeing Is Believing",
        simple: "Empirical evidence is seeing is believing. It is using your eyes and hands to prove something is there. If you say there is a cat in the box and I open it and see a cat, that is empirical evidence. It is the most basic way to find the truth. This anchors you to the physical world and keeps your feet on the ground.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A bird chirping: you know it is there." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Wood smoke: you know there is a fire." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A strawberry: you know it is ripe." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A fuzzy blanket: the evidence is in your fingertips." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The stars at night: ancient light proving the universe is vast." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Wind on your face: the air is moving even though it is invisible." }
        ],
        intuition: "Open the box. Look inside. The truth does not need permission to exist. It just needs a witness.",
        links: [
          { label: "Live Science: Empirical Evidence", url: "https://www.livescience.com/" },
          { label: "Philosophy of Science: Evidence", url: "https://plato.stanford.edu/entries/evidence/" },
          { label: "NIH: Evidence-Based Practice", url: "https://www.ncbi.nlm.nih.gov/" }
        ],
        songs: [
          { title: "Superstition", artist: "Stevie Wonder", url: "https://www.youtube.com/watch?v=0CFuCYNx-1g" },
          { title: "I Can't Go for That", artist: "Hall & Oates", url: "https://www.youtube.com/watch?v=ccenFp_3kq8" },
          { title: "Everyday Is a Winding Road", artist: "Sheryl Crow", url: "https://www.youtube.com/watch?v=W5P-sHJMUW0" }
        ],
        advanced: "Empiricism: all knowledge is based on sensory experience. Contrasted with Rationalism, which argues some knowledge comes through pure reason. Modern science integrates both: reason builds models (rationalism) and data from the world tests them (empiricism)." },

      { id: "intuition-sixth-sense", num: 10, icon: "✨", title: "Intuition & The Sixth Sense", subtitle: "The Bridge Between Knowing and Feeling",
        simple: "Sometimes you just know something is true in your gut even if you cannot explain why yet. This is your brain putting together thousands of tiny clues you did not even notice. It is like a superpower that helps you stay safe or make good friends. Your intuition is the bridge between what you know and what you feel.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The silence that tells you something is wrong." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The feeling of a storm before it hits: your nose knows first." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The bitterness of a lie: something does not taste right." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The spark of a new idea: electricity in your fingertips." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The glow of someone you trust: light you see without your eyes." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The pull in your chest when you are headed the right way." }
        ],
        intuition: "Your gut is your oldest brain. It was reading the room a million years before your words showed up. Trust the pull.",
        links: [
          { label: "Psychology Today: Intuition", url: "https://www.psychologytoday.com/us/basics/intuition" },
          { label: "HBR: Trust Your Gut?", url: "https://hbr.org/" },
          { label: "Scientific American: Science of Intuition", url: "https://www.scientificamerican.com/" }
        ],
        songs: [
          { title: "Dreams", artist: "Fleetwood Mac", url: "https://www.youtube.com/watch?v=mrZRURcb1cM" },
          { title: "Don't Stop Believin'", artist: "Journey", url: "https://www.youtube.com/watch?v=1k8craCGpgs" },
          { title: "Running Up That Hill", artist: "Kate Bush", url: "https://www.youtube.com/watch?v=wp43OdtAAkM" }
        ],
        advanced: "Neuroscientifically, intuition is thin-slicing: the unconscious mind finding patterns from narrow windows of experience. A highly developed form of rapid cognitive processing. While prone to bias, in experts it is often more accurate than slow deliberate analysis. A vital tool for hypothesis generation in art and science." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // PHILOSOPHY (layers) > ETHICS & RIGHT/WRONG (ethics)
    // ═══════════════════════════════════════════════════════════════

    ethics: [
      { id: "golden-rule", num: 1, icon: "⚖️", title: "The Golden Rule (Reciprocity)", subtitle: "The Mirror for Your Heart",
        simple: "Imagine you are playing a game with a friend. If you want them to be nice and share, you have to be nice and share first. This is the Golden Rule, and it is like a mirror for your heart. When you do something, ask yourself if you would like it if someone did that same thing to you. By being kind, you teach the world how to be kind back to you. It is the simplest way to make sure the world stays a happy place for everyone.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A harmony in a choir: one voice supports the other to make a beautiful song." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of a clean, shared park that everyone helped keep tidy." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Sharing a fresh-baked cookie where both people get the same delicious bite." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A firm, fair handshake that starts a new friendship." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing someone pick up something a stranger dropped and hand it back." },
          { key: "body", icon: "🫀", sense: "BODY", text: "When you act with kindness, you feel a warmth in your chest that tells you everything is in its right place." }
        ],
        intuition: "The mirror does not lie. What you send out comes back. Treat the world how you want the world to treat you.",
        links: [
          { label: "Wikipedia: Golden Rule", url: "https://en.wikipedia.org/wiki/Golden_Rule" },
          { label: "Ethics.org", url: "https://www.ethics.org/" },
          { label: "Britannica: Golden Rule", url: "https://www.britannica.com/topic/Golden-Rule" }
        ],
        songs: [
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Treat People With Kindness", artist: "Harry Styles", url: "https://www.youtube.com/watch?v=zNAc6V--z6g" }
        ],
        advanced: "Reciprocity is the bilateral epistemic gate where self and other recognize a shared state. The foundation of normative ethics, bridging individual egoism and collective harmony. Connects to Game Theory (Tit-for-Tat strategy) and Biological Altruism: the Eternal We as a survival mechanism encoded in social fabric." },

      { id: "human-rights", num: 2, icon: "🌐", title: "Universal Human Rights", subtitle: "The Shield Every Person Is Born With",
        simple: "Every single person in the world is born with a special shield of rights that no one should ever break. You have the right to be safe, to speak, and to be treated fairly just because you are human. It does not matter where you live or what you look like; the rules are the same for everyone. When we protect these rights, we are saying that every life is valuable. It is like a big promise the world makes to every new baby that joins us.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Many different people cheering together at a stadium: one roar from many voices." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The fresh air of a place where everyone is free to walk and play." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Pure, clean water available for every person to drink." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A soft blanket that keeps every child warm at night." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "The many colors of the flags of all the countries flying together." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Standing tall and unafraid in an open space: your body knows freedom." }
        ],
        intuition: "Every stranger you see has a story just as deep as yours. The shield is invisible but unbreakable when we all hold it together.",
        links: [
          { label: "UN Universal Declaration", url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights" },
          { label: "Amnesty International", url: "https://www.amnesty.org/" },
          { label: "Human Rights Watch", url: "https://www.hrw.org/" }
        ],
        songs: [
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" },
          { title: "Redemption Song", artist: "Bob Marley", url: "https://www.youtube.com/watch?v=yv5xonFSC4c" },
          { title: "Blowin' in the Wind", artist: "Bob Dylan", url: "https://www.youtube.com/watch?v=MMFj8uDubsE" }
        ],
        advanced: "Universal Human Rights posit objective moral truths transcending cultural boundaries, creating fidelity between individual and state. Ensures the informativeness gate of justice remains open for the most vulnerable. Connects to Natural Law and Cosmopolitanism: shared biology and consciousness necessitate a shared moral floor." },

      { id: "empathy-compassion", num: 3, icon: "❤️", title: "Empathy and Compassion", subtitle: "The Invisible String",
        simple: "Empathy is like a superpower that lets you feel what someone else is feeling in your own heart. If a friend is sad because they fell down, you feel a little of that sadness too, which makes you want to help. Compassion is the action you take: giving a hug or helping them up. It is the invisible string that ties all people together so we are never truly alone. When we use our empathy, we understand the other half of the story.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The soft, comforting shhh of a parent calming a crying baby." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Warm soup being brought to someone who is sick." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The sweetness of a gift someone gave you just to make you smile." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A gentle pat on the back when you are feeling nervous." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Seeing the tears in someone's eyes and knowing exactly why they are there." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Spirit bumps on your arms when you connect deeply with a stranger's joy or pain." }
        ],
        intuition: "Your heart has ears. It hears what mouths cannot say. The boundary between I and Thou dissolves when empathy speaks.",
        links: [
          { label: "Greater Good Science Center", url: "https://greatergood.berkeley.edu/" },
          { label: "Stanford: Empathy", url: "https://plato.stanford.edu/entries/empathy/" },
          { label: "Psychology Today: Empathy", url: "https://www.psychologytoday.com/us/basics/empathy" }
        ],
        songs: [
          { title: "Everybody Hurts", artist: "R.E.M.", url: "https://www.youtube.com/watch?v=5rOiW_xY-kc" },
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsOU" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" }
        ],
        advanced: "Empathy is the biological regularization preventing human interactions from becoming purely transactional. The shared-ignorance floor rises as emotional intelligence develops. Relates to Mirror Neurons in neuroscience and Bhakti (devotion) in Eastern philosophy, where the boundary between I and Thou dissolves." },

      { id: "integrity-honesty", num: 4, icon: "💎", title: "Integrity and Honesty", subtitle: "The Diamond That Never Cracks",
        simple: "Integrity means being the same good person on the inside that you show to the world on the outside. It is like being a diamond: no matter which way you turn it, it is still strong and clear. Honesty is telling the truth even when it is hard or when no one is watching. When you are honest, people know they can trust you, which is like building a strong bridge between you and them. Being true to yourself is the best way to be true to everyone else.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The clear, ringing tone of a bell made of pure metal." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The crisp, clean scent of laundry washed thoroughly." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The simple, honest flavor of fruit straight from the tree." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A solid rock that does not crumble when you step on it." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "Looking into a mirror and feeling proud of the person looking back." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling grounded and heavy in your feet, not shaky or light: inner peace when words match thoughts." }
        ],
        intuition: "The diamond does not pretend to be glass. When your inside matches your outside, nothing can crack you.",
        links: [
          { label: "Ethics Sage", url: "https://www.ethicssage.com/" },
          { label: "Character Counts", url: "https://charactercounts.org/" },
          { label: "Philosophy Basics: Ethics", url: "https://www.philosophybasics.com/branch_ethics.html" }
        ],
        songs: [
          { title: "Honesty", artist: "Billy Joel", url: "https://www.youtube.com/watch?v=SuFScoO4tb0" },
          { title: "True Colors", artist: "Cyndi Lauper", url: "https://www.youtube.com/watch?v=LPn0KFlbqX8" },
          { title: "The Times They Are A-Changin'", artist: "Bob Dylan", url: "https://www.youtube.com/watch?v=90WD_ats6eE" }
        ],
        advanced: "Integrity is the Uhlmann Fidelity between private values and public actions. It minimizes internal disorder (von Neumann entropy) of the self. A person of integrity has high Detection Quality: actions reliable and reproducible across all contexts. Connects to Existentialist Authenticity and Satya (Truth) in Vedic traditions." },

      { id: "justice-fairness", num: 5, icon: "⚖️", title: "Justice and Fairness", subtitle: "The Level Scale",
        simple: "Fairness is making sure everyone gets what they need and the rules are the same for everybody. Think about a race: it would not be fair if some kids got to start halfway to the finish line. Justice is making things right when they go wrong, like making sure a bully says sorry and fixes what they broke. It is like a giant scale we try to keep perfectly level. When things are fair, everyone feels safe to try their best.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The click of two puzzle pieces fitting together perfectly." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Rain that falls on every garden in the neighborhood equally." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A pizza cut into exactly equal slices so no one feels left out." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Two things that weigh exactly the same in each hand." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A line of people waiting their turn without anyone cutting in front." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Walking on a flat, level floor where you will not trip: that is what fairness feels like in the body." }
        ],
        intuition: "When a wrong is made right, something clicks inside you. That click is your soul recognizing balance.",
        links: [
          { label: "Justice with Michael Sandel", url: "https://www.justiceharvard.org/" },
          { label: "Stanford: Justice", url: "https://plato.stanford.edu/entries/justice/" },
          { label: "Legal Information Institute", url: "https://www.law.cornell.edu/" }
        ],
        songs: [
          { title: "A Change Is Gonna Come", artist: "Sam Cooke", url: "https://www.youtube.com/watch?v=wEBlaMOmKV4" },
          { title: "Blowin' in the Wind", artist: "Peter, Paul and Mary", url: "https://www.youtube.com/watch?v=Ld6fAO4idaI" },
          { title: "What's Going On", artist: "Marvin Gaye", url: "https://www.youtube.com/watch?v=H-kA3UtBj4M" }
        ],
        advanced: "Justice functions as the Global Reliability Modulator for social systems. Uses softmax weights ensuring various societal needs balance without any group collapsing informational integrity. Ties into Rawls' Veil of Ignorance and Ma'at (Ancient Egyptian concept of cosmic balance and truth)." },

      { id: "consequentialism", num: 6, icon: "📈", title: "Consequentialism (The Greater Good)", subtitle: "Ripples in the Pond",
        simple: "Sometimes to do the right thing we have to look at what will happen because of our choices. If you have one toy but five friends want to play, the right thing might be finding a game everyone can play together. This is thinking about the Greater Good: making the most people happy and the fewest people sad. Your choices are like pebbles thrown into a pond; the ripples touch everyone.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The hum of a city where everyone follows the lights to stay safe." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A big Thanksgiving dinner where everyone is fed." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A community garden vegetable that many people helped grow." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Many hands joining together to lift something heavy." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A long-term plan finally working out to help a whole school." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the pull of the future, like leaning forward into a breeze: purpose in your bones." }
        ],
        intuition: "Every pebble sends ripples. You cannot throw a stone without moving the whole pond. Choose your throws wisely.",
        links: [
          { label: "Utilitarianism.net", url: "https://www.utilitarianism.net/" },
          { label: "Ethics Unwrapped", url: "https://ethicsunwrapped.utexas.edu/" },
          { label: "Britannica: Consequentialism", url: "https://www.britannica.com/topic/consequentialism" }
        ],
        songs: [
          { title: "Heal the World", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=BWf-eARnf6U" },
          { title: "We Are the World", artist: "USA for Africa", url: "https://www.youtube.com/watch?v=9AjkUyX0rVw" },
          { title: "One", artist: "U2", url: "https://www.youtube.com/watch?v=ftjEcrrf7r0" }
        ],
        advanced: "Utilitarianism acts as an optimization algorithm for social utility. Seeks to maximize the informativeness gate by ensuring the highest truth score for the outcome. Treats moral decisions as a mixture distribution reducing divergence between individual and collective wellbeing. Connects to Utility Theory in economics and Effective Altruism." },

      { id: "duty-deontology", num: 7, icon: "🎖️", title: "Duty and Responsibility (Deontology)", subtitle: "The Law Written on the Heart",
        simple: "Duty is doing what is right simply because it is the rule, even if it does not make you happy right away. Imagine you promised to clean your room before going outside. Even if friends are calling you to play, your duty is to finish your promise first. Responsibility is taking care of the things and people that depend on you. When we all do our part, the whole world runs smoothly like a giant, well-oiled machine.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady tick-tock of a clock that never stops." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A library where people are quiet out of respect for others." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The honest taste of bread that took hard work to bake." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The weight of a badge that reminds you of your responsibility." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A stop sign: and stopping even when no other cars are around." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The stiffness of resolve in your spine when you decide to do something hard." }
        ],
        intuition: "Some things are right not because of what happens next, but because of what they are. The law is written on the heart before the paper.",
        links: [
          { label: "Stanford: Deontology", url: "https://plato.stanford.edu/entries/ethics-deontological/" },
          { label: "Kant's Moral Philosophy", url: "https://plato.stanford.edu/entries/kant-moral/" },
          { label: "Philosophy News", url: "https://www.philosophynews.com/" }
        ],
        songs: [
          { title: "I Walk the Line", artist: "Johnny Cash", url: "https://www.youtube.com/watch?v=KHF9itPLUo4" },
          { title: "Hero", artist: "Mariah Carey", url: "https://www.youtube.com/watch?v=0IA3ZvCkRkQ" },
          { title: "The Long and Winding Road", artist: "The Beatles", url: "https://www.youtube.com/watch?v=fR4HjTH_fTM" }
        ],
        advanced: "Deontological ethics focuses on the action itself rather than the result. Certain actions carry an inherent density matrix of rightness. Following categorical imperatives ensures behavior is reproducible and full-rank, avoiding singularities of moral compromise. Relates to Stoicism and Dharma in Indian philosophy." },

      { id: "virtue-ethics", num: 8, icon: "🌱", title: "Virtue Ethics", subtitle: "The Garden Inside Your Soul",
        simple: "Virtue is like a garden you grow inside your soul. Instead of just following a list of dos and don'ts, you try to become a good gardener. You practice being brave, kind, and patient every day. Eventually these things become part of who you are. It is like learning piano: at first it is hard, but after a while the music just flows. A virtuous person does not have to think about being good because they are good.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A flute playing a melody perfectly because the player practiced for years." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A blooming flower that grew from a tiny seed." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "The complex, rich flavor of fruit allowed to ripen slowly." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Muscle memory: doing something helpful without thinking." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "An old tree that is strong and deep-rooted." },
          { key: "body", icon: "🫀", sense: "BODY", text: "A feeling of flow where doing the right thing feels as natural as breathing." }
        ],
        intuition: "You do not become good by following rules. You become good by practicing goodness until it grows roots. The garden tends itself.",
        links: [
          { label: "Britannica: Virtue Ethics", url: "https://www.britannica.com/topic/virtue-ethics" },
          { label: "Markkula Center for Ethics", url: "https://www.scu.edu/ethics/" },
          { label: "The School of Life", url: "https://www.theschooloflife.com/" }
        ],
        songs: [
          { title: "Humble and Kind", artist: "Tim McGraw", url: "https://www.youtube.com/watch?v=awzNHuGqoMc" },
          { title: "Beautiful Day", artist: "U2", url: "https://www.youtube.com/watch?v=co6WMzDOh1o" },
          { title: "Simple Man", artist: "Lynyrd Skynyrd", url: "https://www.youtube.com/watch?v=sMmTkKz60W8" }
        ],
        advanced: "Virtue Ethics shifts focus from interaction to the self. Emphasizes character development through habituation (Phronesis): refining mixture distributions over time. The goal is Eudaimonia (human flourishing). Connects to Aristotelian Philosophy and Confucianism: the Everlasting We is built by cultivating the Superior Individual." },

      { id: "social-contract", num: 9, icon: "🤝", title: "Social Contract Theory", subtitle: "The Invisible Deal",
        simple: "Imagine you and your friends are starting a secret club. You all sit down and decide on the rules: no hitting, no yelling, everyone gets a turn. By joining the club you sign an invisible paper saying you will follow those rules so everyone can have fun. This is what we do as grown-ups in towns and countries. We agree to follow the laws so we can live together in peace. It is a deal we make with each other.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The hush of a classroom when the teacher starts to speak." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A new book or a signed contract: the smell of agreement." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A meal in a restaurant where you trust the chef to cook safely." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A high-five after a group project is finished successfully." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A stoplight turning green and knowing the other cars will stop." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the space around you that others respect by not bumping into you: that is the contract working." }
        ],
        intuition: "Civilization is a handshake between strangers who agreed to trust each other before they ever met.",
        links: [
          { label: "IEP: Social Contract", url: "https://iep.utm.edu/soc-cont/" },
          { label: "Social Contract Research", url: "https://en.wikipedia.org/wiki/Social_contract" },
          { label: "Khan Academy: Social Contract", url: "https://www.khanacademy.org/" }
        ],
        songs: [
          { title: "Fortunate Son", artist: "Creedence Clearwater Revival", url: "https://www.youtube.com/watch?v=ec0XKhAHR5I" },
          { title: "Get Up, Stand Up", artist: "Bob Marley", url: "https://www.youtube.com/watch?v=X2W3aG8uizA" },
          { title: "The House I Live In", artist: "Frank Sinatra", url: "https://www.youtube.com/watch?v=6UkO7Bxz9WA" }
        ],
        advanced: "The Social Contract is the Redundancy Graph of civilization. It calculates individual liberty versus collective governance, modulating societal conflict to prevent the mixture distribution of diverse interests from collapsing into anarchy. Relates to Hobbes, Locke, Rousseau, and the evolutionary biology of primate cooperation." },

      { id: "relativism-objectivism", num: 10, icon: "☯️", title: "Moral Relativism vs. Objectivism", subtitle: "Is Right and Wrong Like Math or Like Favorite Colors?",
        simple: "Some people think Right and Wrong are like math: 2+2 is always 4 no matter where you are. That is Objectivism. Other people think Right and Wrong are more like favorite colors: they might change depending on where you live. That is Relativism. It is one of the biggest questions in the world! Is it always wrong to tell a lie, or is it okay if it saves a friend's feelings? Learning both sides helps us understand why people in different parts of the world do things differently.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "An orchestra tuning their instruments: many different notes becoming one." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Different spices in a kitchen that make one delicious curry." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Sweet and sour working together to make a better flavor." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the difference between a smooth stone and a rough one." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A painting with many different colors that all look good together." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Leaning back and forth as you think about a hard choice: your body weighing the question." }
        ],
        intuition: "Some truths are carved in stone. Others are written in sand. Wisdom is knowing which is which.",
        links: [
          { label: "Philosophy Now: Relativism", url: "https://philosophynow.org/" },
          { label: "Ethics Guide: Relativism", url: "https://www.bbc.co.uk/ethics/introduction/relativism.shtml" },
          { label: "The Atlantic: Moral Objectivism", url: "https://www.theatlantic.com/" }
        ],
        songs: [
          { title: "Both Sides Now", artist: "Joni Mitchell", url: "https://www.youtube.com/watch?v=Pbn6a0AFfnM" },
          { title: "Blowin' in the Wind", artist: "Stevie Wonder", url: "https://www.youtube.com/watch?v=lVhFbBZqMKM" },
          { title: "Sympathy for the Devil", artist: "The Rolling Stones", url: "https://www.youtube.com/watch?v=GgnClrx8N2k" }
        ],
        advanced: "This tension represents the temperature of ethical systems. High temperature (Relativism) allows entropy and cultural variation. Low temperature (Objectivism) seeks a frozen state of universal truth. Convergent Recognition often lies where universal values coexist with cultural nuances. Connects to Cultural Anthropology and Post-Structuralism." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // PHILOSOPHY (layers) > MEANING & PURPOSE (meaning)
    // ═══════════════════════════════════════════════════════════════

    meaning: [
      { id: "self-actualization", num: 1, icon: "🌳", title: "Self-Actualization", subtitle: "The Seed with a Map Inside",
        simple: "Imagine you are a tiny seed with a giant map inside that shows how to become a beautiful tree. Being alive is about following that map and growing as tall and strong as you can. You use your special talents to do things that make you feel proud and happy. When you try your best at something you love, you are blooming. You do not have to be like anyone else; you just have to be the best version of you.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A bird singing its unique song at dawn." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Fresh rain on dry earth (petrichor): the smell of becoming." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A fruit you picked yourself from a garden." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Your muscles working hard during a climb: effort you can feel." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A timelapse of a flower opening: becoming made visible." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Standing tall with arms reached toward the sky: your body practicing its full height." }
        ],
        intuition: "You already have the map. The seed does not study how to be a tree. It just grows. Stop planning. Start blooming.",
        links: [
          { label: "Simply Psychology: Maslow's Hierarchy", url: "https://www.simplypsychology.org/maslow.html" },
          { label: "School of Life: Self-Actualization", url: "https://www.theschooloflife.com/" },
          { label: "VeryWell Mind: Self-Actualized People", url: "https://www.verywellmind.com/characteristics-of-self-actualized-people-2795963" }
        ],
        songs: [
          { title: "The Climb", artist: "Miley Cyrus", url: "https://www.youtube.com/watch?v=NG2zyeVRcbs" },
          { title: "Hall of Fame", artist: "The Script", url: "https://www.youtube.com/watch?v=mk48xRzuNvA" },
          { title: "Unwritten", artist: "Natasha Bedingfield", url: "https://www.youtube.com/watch?v=b7k0a5hYnSI" }
        ],
        advanced: "Self-actualization is the highest level of psychological development: personal potential fully realized. A shift from deficiency-motivated to growth-motivated behaviors focusing on truth, beauty, and autonomy. Connects to the teleological view of biology and epistemological becoming as constant discovery." },

      { id: "ikigai", num: 2, icon: "🕸️", title: "Ikigai", subtitle: "The Sweet Spot",
        simple: "Ikigai is finding the sweet spot where four circles overlap: what you love, what you are great at, what the world needs, and what can earn you a living. When you find something in the middle of all those, you have a reason to jump out of bed every morning. It makes your life feel like a puzzle where all pieces finally fit. It is not about being famous but about feeling useful and happy at the same time.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady, rhythmic hum of a busy but happy workshop." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Brewing coffee or tea at the start of a productive day." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A balanced meal that provides energy and comfort." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Tools or instruments that fit perfectly in your hands." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A clear, organized workspace ready for a new project." },
          { key: "body", icon: "🫀", sense: "BODY", text: "The feeling of flow where your body moves without having to think." }
        ],
        intuition: "Purpose is not one giant thing. It is the overlap of many small things. Find where love, skill, need, and livelihood meet. Stand there.",
        links: [
          { label: "Sloww: What is Ikigai?", url: "https://www.sloww.co/ikigai/" },
          { label: "Forbes: Philosophy of Ikigai", url: "https://www.forbes.com/" },
          { label: "Positive Psychology: Finding Ikigai", url: "https://positivepsychology.com/" }
        ],
        songs: [
          { title: "Beautiful Day", artist: "U2", url: "https://www.youtube.com/watch?v=co6WMzDOh1o" },
          { title: "Lovely Day", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=bEeaS6fuUoA" },
          { title: "Don't Stop Me Now", artist: "Queen", url: "https://www.youtube.com/watch?v=HgzGwKwLmgM" }
        ],
        advanced: "Ikigai is a comprehensive framework for lifestyle balance from Okinawa, Japan. Synthesizes passion, mission, vocation, and profession into a singular driving force for longevity and mental health. Unlike Western purpose, it emphasizes small daily joys and mastery, bridging individual desire and social responsibility." },

      { id: "logotherapy", num: 3, icon: "⚓", title: "Logotherapy", subtitle: "The Anchor in the Dark",
        simple: "Sometimes life is hard or sad, but Logotherapy says we can always find a why to keep going. It is like being a superhero who finds a secret reason to be brave even when things look dark. You find meaning by creating something, by loving someone, or by how you choose to act when you are having a tough time. Even if you cannot change a bad situation, you can change how you think about it. Your why is like an anchor that holds you steady.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "A single bell tolling clearly in a quiet valley." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Pine or cedar: the scent of endurance and strength." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Deep, dark chocolate: both bitter and sweet at the same time." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Holding a smooth worry stone or a loved one's hand." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A single candle burning in a very dark room." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Taking a deep, slow breath and feeling your chest expand: you are still here." }
        ],
        intuition: "He who has a why can bear almost any how. The anchor does not stop the storm. It stops you from drifting.",
        links: [
          { label: "Viktor Frankl Institute", url: "https://www.viktorfrankl.org/" },
          { label: "Psychology Today: Logotherapy", url: "https://www.psychologytoday.com/us/therapy-types/logotherapy" },
          { label: "The Atlantic: Meaning vs Happiness", url: "https://www.theatlantic.com/" }
        ],
        songs: [
          { title: "Rise Up", artist: "Andra Day", url: "https://www.youtube.com/watch?v=FBuIBaDSOa4" },
          { title: "Fix You", artist: "Coldplay", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM" },
          { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", url: "https://www.youtube.com/watch?v=4G-YQA_bsOU" }
        ],
        advanced: "Developed by Viktor Frankl, Logotherapy is founded on the will to meaning. Life has meaning under all circumstances, even the most miserable. Focuses on the future and meanings to be fulfilled. Connects to Stoicism through emphasis on internal control over one's attitude toward external fate." },

      { id: "eudaimonia", num: 4, icon: "⚖️", title: "Eudaimonia", subtitle: "The Deep Glow",
        simple: "Being happy is not just about eating candy or playing games; it is about being a good person. Eudaimonia is a special kind of happiness that comes from doing the right thing and using your brain. It is like being a player on a team who plays fairly and helps everyone win. When you are kind, honest, and brave, you feel a deep glow inside that lasts a long time. You are not just having fun; you are doing something important.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The harmony of a choir singing together in tune." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Clean linen or soap: the scent of clarity." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Pure, cool water from a mountain spring." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The firm, honest grip of a handshake." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A clear blue sky after a storm has passed." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Balancing perfectly on one foot, feeling centered: virtue as physical stillness." }
        ],
        intuition: "Pleasure fades. Purpose glows. The happiness that comes from being good outlasts the happiness that comes from feeling good.",
        links: [
          { label: "Britannica: Eudaimonia", url: "https://www.britannica.com/topic/eudaemonism" },
          { label: "Positive Psychology: Eudaimonic Happiness", url: "https://positivepsychology.com/" },
          { label: "Stanford: Virtue Ethics", url: "https://plato.stanford.edu/entries/ethics-virtue/" }
        ],
        songs: [
          { title: "Man in the Mirror", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=PivWY9wn5ps" },
          { title: "Humble and Kind", artist: "Tim McGraw", url: "https://www.youtube.com/watch?v=awzNHuGqoMc" },
          { title: "What a Wonderful World", artist: "Louis Armstrong", url: "https://www.youtube.com/watch?v=A3yCcXgbKrE" }
        ],
        advanced: "Eudaimonia is the Aristotelian highest human good, achieved through arete (excellence/virtue). Distinguishes hedonia (pleasure-seeking) from eudaimonia (meaning-seeking). Foundational to virtue ethics: a blueprint for life based on rational activity and moral integrity." },

      { id: "existentialism-meaning", num: 5, icon: "🎨", title: "Existentialism", subtitle: "The Blank Canvas",
        simple: "Imagine you were given a giant blank piece of paper and a box of every color crayon in the world. Existentialism says you get to paint whatever you want, and that is your life's meaning. There is no picture already there for you to follow, which might seem scary, but it is actually very exciting! You are the artist and you decide what is important. You are not a robot following a program; you are a free person making choices. Your life is your own masterpiece.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The silence before a song begins: full of possibility." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A new book or fresh stationery: the smell of a blank page." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Trying a completely new food you have never heard of before." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Clay in your hands waiting to be shaped." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A vast, open horizon or a starry night sky." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Choosing to move your body in a dance you just made up: freedom as motion." }
        ],
        intuition: "The canvas is blank. That is not a tragedy. That is the greatest gift. You are the painter and the painting.",
        links: [
          { label: "Philosophy Basics: Existentialism", url: "https://www.philosophybasics.com/branch_existentialism.html" },
          { label: "Crash Course: Existentialism", url: "https://www.youtube.com/watch?v=YaDvRdLMkHs" },
          { label: "Existentialist Society", url: "https://existentialistsociety.org/" }
        ],
        songs: [
          { title: "My Way", artist: "Frank Sinatra", url: "https://www.youtube.com/watch?v=qQzdAsjWGPg" },
          { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
          { title: "Imagine", artist: "John Lennon", url: "https://www.youtube.com/watch?v=YkgkThdzX-8" }
        ],
        advanced: "Existentialism emphasizes individual existence, freedom, and choice. No inherent human nature or divine plan; individuals define essence through actions. Tackles anxiety, boredom, and the absurd: the realization of a meaningless universe as the starting point for authentic freedom." },

      { id: "altruism-service", num: 6, icon: "🤲", title: "Altruism & Service", subtitle: "The Chain That Gets Stronger",
        simple: "Have you ever noticed that when you give a gift to a friend, you feel just as happy as they do? Altruism is the idea that the point of being alive is to help other people. It is like being a helper in a big family where everyone looks out for each other. When you share or help someone who is sad, your heart grows bigger. We are all connected like links in a chain, and when you strengthen someone else, the whole chain gets stronger.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Someone saying thank you with a sincere voice." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A communal kitchen cooking for many people." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Sharing a meal where everyone gets enough." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "The warmth of a hug or a supportive pat on the back." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A community coming together to build or fix something." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Carrying something for someone else: purpose has weight you can feel." }
        ],
        intuition: "The chain does not get stronger when one link hoards strength. It gets stronger when every link holds the next one up.",
        links: [
          { label: "Greater Good: Altruism", url: "https://greatergood.berkeley.edu/topic/altruism" },
          { label: "Effective Altruism", url: "https://www.effectivealtruism.org/" },
          { label: "Psychology Today: Helping Others", url: "https://www.psychologytoday.com/us/basics/altruism" }
        ],
        songs: [
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" },
          { title: "Heal the World", artist: "Michael Jackson", url: "https://www.youtube.com/watch?v=BWf-eARnf6U" },
          { title: "Hands", artist: "Jewel", url: "https://www.youtube.com/watch?v=AfsS3pIDBfw" }
        ],
        advanced: "Altruism is selfless concern for others' wellbeing. Reciprocal altruism in evolutionary biology explains how helping benefits group survival. Acts of service trigger oxytocin and dopamine (helper's high), suggesting biology is hard-wired for prosocial behavior: service as both biological and spiritual fulfillment." },

      { id: "biological-continuity", num: 7, icon: "🧬", title: "Biological Continuity", subtitle: "The Baton That Never Drops",
        simple: "Every living thing is part of a very long race that started a long, long time ago. Your job in this race is to stay healthy and pass the baton, which is your DNA, to the next runners. This baton has all the secrets of life written on it! When people have children or take care of nature, they make sure the story of life keeps going. It is like being part of a never-ending movie. Even though we do not stay forever, the life we carry does.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "The steady heartbeat of a baby or a pet." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "A newborn baby or fresh green leaves: the scent of new life." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Seeds or nuts: the starts of new life you can eat." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Feeling the pulse in your own wrist." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A seed sprouting or a kitten playing: life rehearsing itself." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Feeling the rhythm of your own breathing: the relay race running inside you right now." }
        ],
        intuition: "You are not a single life. You are a relay runner in a race that started before memory. The baton never drops.",
        links: [
          { label: "National Geographic: What is DNA?", url: "https://www.nationalgeographic.com/science/article/dna" },
          { label: "Evolutionary Psychology", url: "https://en.wikipedia.org/wiki/Evolutionary_psychology" },
          { label: "Nature: Introduction to Genetics", url: "https://www.nature.com/scitable/topic/genetics-702/" }
        ],
        songs: [
          { title: "Circle of Life", artist: "Elton John", url: "https://www.youtube.com/watch?v=GibiNy4d4gc" },
          { title: "In My Life", artist: "The Beatles", url: "https://www.youtube.com/watch?v=YBcdt6DsLQA" },
          { title: "7 Years", artist: "Lukas Graham", url: "https://www.youtube.com/watch?v=LHCob76kigA" }
        ],
        advanced: "From a biological standpoint, life's purpose is genetic replication: the Selfish Gene theory. But continuity extends beyond reproduction to biosphere maintenance. Connects us to every ancestor and future descendant, creating physical eternal existence through the stream of life." },

      { id: "optimistic-nihilism", num: 8, icon: "🎈", title: "Optimistic Nihilism", subtitle: "The Playground with No Rules",
        simple: "Some people think it is sad if life does not have a giant pre-written meaning, but Optimistic Nihilism says that is actually great news! It is like being at a giant playground where there are no rules about which slide you have to use. Since nothing matters in a scary way, you are free to just have a good time and be kind. You are here for a short visit, so you might as well enjoy the party!",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Joyful, uncontrolled laughter." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Popcorn at a fair or circus: fun you can smell." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Something purely for fun, like a colorful lollipop." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Bubbles popping on your skin." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A photo of a distant galaxy: beautiful and indifferent." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Jumping on a trampoline and feeling weightless: freedom from cosmic weight." }
        ],
        intuition: "If nothing is written, everything is permitted. Not as a threat. As an invitation. The universe gave you a blank ticket. Use it.",
        links: [
          { label: "Kurzgesagt: Optimistic Nihilism", url: "https://www.youtube.com/watch?v=MBRqu0YOH14" },
          { label: "The Conversation: Joy of Nihilism", url: "https://theconversation.com/" },
          { label: "Big Think: Why Nihilism Is Good", url: "https://bigthink.com/" }
        ],
        songs: [
          { title: "Don't Worry, Be Happy", artist: "Bobby McFerrin", url: "https://www.youtube.com/watch?v=d-diB65scQU" },
          { title: "Enjoy the Silence", artist: "Depeche Mode", url: "https://www.youtube.com/watch?v=aGSKrC7dGcY" },
          { title: "Dust in the Wind", artist: "Kansas", url: "https://www.youtube.com/watch?v=tH2w6Oxx0kQ" }
        ],
        advanced: "Nihilism framed not as despair but as ultimate freedom. If the universe is indifferent, mistakes carry no permanent cosmic weight. Allows radical focus on present moment and subjective experience. Encourages scientific appreciation for the sheer improbability of existence: the mundane as miraculous." },

      { id: "social-connectivity", num: 9, icon: "🕸️", title: "Social Connectivity", subtitle: "The Web of Lights",
        simple: "Imagine everyone in the world has a little light inside them, and there are invisible glowing strings connecting all the lights. Being alive is about making those strings stronger and brighter. We are meant to be together, like bees in a hive or wolves in a pack. When you talk to a friend, help a neighbor, or love your family, you are plugging into a giant power grid of love. You are not meant to be a lonely island; you are part of a big, beautiful continent.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "Many people talking and laughing at a dinner party." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "The scent of your own home or a familiar person." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "A family recipe passed down through generations." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "A long, warm hug from someone you trust." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A photo of a large family or a group of best friends." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Moving in sync with others, like in a dance or marching: connection as rhythm." }
        ],
        intuition: "You are not a lonely island. You are a node in a web of light. Every connection you make brightens the whole grid.",
        links: [
          { label: "Harvard Study of Adult Development", url: "https://www.adultdevelopmentstudy.org/" },
          { label: "Psychology Today: Power of Connection", url: "https://www.psychologytoday.com/us/basics/relationships" },
          { label: "TED: What Makes a Good Life?", url: "https://www.ted.com/talks/robert_waldinger_what_makes_a_good_life_lessons_from_the_longest_study_on_happiness" }
        ],
        songs: [
          { title: "With a Little Help from My Friends", artist: "The Beatles", url: "https://www.youtube.com/watch?v=0C58ttB2-Qg" },
          { title: "You've Got a Friend", artist: "Carole King", url: "https://www.youtube.com/watch?v=6ZHdVBLojIE" },
          { title: "Lean on Me", artist: "Bill Withers", url: "https://www.youtube.com/watch?v=fOZ-MySzAac" }
        ],
        advanced: "Humans are obligatorily gregarious: brains wired for social interaction, with isolation processed as physical pain. Social connectivity is the strongest predictor of long-term health and happiness. Intersects Sociology and Evolutionary Psychology: purpose is inextricably tied to others." },

      { id: "legacy-impact", num: 10, icon: "🌊", title: "Legacy and Impact", subtitle: "Ripples in the Pond",
        simple: "Think about throwing a stone into a still pond. The stone disappears, but the circles of water keep moving further and further out. Your life is like that stone! The things you do, the things you make, and the way you treat people are the ripples. Long after you are gone, those ripples will still be moving. You can leave behind a beautiful song, a helpful invention, or just a memory of being very kind. The point is to leave the world a little better than you found it.",
        senses: [
          { key: "hear", icon: "👂", sense: "SOUND", text: "An echo that continues after you stop making noise." },
          { key: "smell", icon: "👃", sense: "SMELL", text: "Lingering woodsmoke or incense after a fire is out." },
          { key: "taste", icon: "👅", sense: "TASTE", text: "Fruit from a tree that someone planted years ago." },
          { key: "touch", icon: "✋", sense: "TOUCH", text: "Carving your name or a heart into a piece of wood." },
          { key: "see", icon: "👁️", sense: "SIGHT", text: "A very old building or bridge built by people long ago." },
          { key: "body", icon: "🫀", sense: "BODY", text: "Planting a small tree and imagining it tall in fifty years: your body in the future tense." }
        ],
        intuition: "The stone sinks. The ripples do not. What you throw into the world keeps moving long after your hand is gone.",
        links: [
          { label: "Psychology Today: Leaving a Legacy", url: "https://www.psychologytoday.com/us/basics/legacy" },
          { label: "The Legacy Center", url: "https://thelegacycenter.net/" },
          { label: "Stanford: Erikson's Generativity", url: "https://plato.stanford.edu/entries/identity-personal/" }
        ],
        songs: [
          { title: "I Was Here", artist: "Beyoncé", url: "https://www.youtube.com/watch?v=i41qWJ6QjPI" },
          { title: "Live Like You Were Dying", artist: "Tim McGraw", url: "https://www.youtube.com/watch?v=_9TShlMkQnc" },
          { title: "Remember Me", artist: "Coco (Pixar)", url: "https://www.youtube.com/watch?v=Sa5OVWPRNUE" }
        ],
        advanced: "Legacy relates to generativity: the desire to guide the next generation and create things that outlast the self. A form of symbolic immortality. Whether through offspring, creative works, or systemic change, legacy lets an individual participate in the future and contribute to the Everlasting We." },
    ],


  },
};
/* ═══════════════════════════════════════════════════════════════
   HELPER FUNCTIONS — used by SubcategoryGrid.jsx
   ═══════════════════════════════════════════════════════════════ */

export function getTopicCards(doorKey, subId) {
  return TOPIC_CARDS[doorKey]?.[subId] || null;
}

export function hasTopicCards(doorKey, subId) {
  return !!(TOPIC_CARDS[doorKey]?.[subId]?.length);
}
