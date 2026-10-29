/*
 * /proof — the evidence trail.
 *
 * INTRO: Jeff's own words, verbatim (TickTick card "PROOF page concept").
 * ROWS: Claude DRAFT. The four rows follow Jeff's Tetractys outline
 * (seeing, connecting, understanding, being). Each fingerprint is a real,
 * checkable idea, paraphrased in plain words. No quotations are put in
 * anyone's mouth: these sentences describe ideas, they do not quote them.
 */

export const PROOF_INTRO = [
  "The universe is a self-recognizing information system. That's CRT. That's the equation. That's the whole site.",
  "The PROOF page isn't the equation — it's the evidence trail. Every time a human — physicist, mystic, poet, mathematician, child — reached toward truth, they were the universe reaching toward itself. They didn't know that's what they were doing. But the fingerprints are everywhere.",
  "Line them all up across thousands of years and dozens of disciplines — they're all describing the same thing. That's not a metaphor. That's convergent recognition. Ψ happening at civilizational scale.",
];

export const PROOF_TURN = "You think these are separate things — science and religion, math and art, ancient and modern. They're not. Watch.";

export const PROOF_OUTRO = "Then it shows you. Domain by domain. Voice by voice. Millennium by millennium. All roads, same room.";

export const PROOF_ROWS = [
  {
    n: 1,
    name: 'Seeing',
    field: 'What is real',
    items: [
      {
        name: 'Heraclitus',
        when: 'Greece, about 500 BCE',
        domain: 'Philosophy',
        text: 'Taught that a single ordering principle, the logos, runs through everything, and that opposites belong together as one.',
      },
      {
        name: "Indra's net",
        when: 'Avataṃsaka Sūtra; Huayan Buddhism, China, 7th century',
        domain: 'Buddhism',
        text: 'Pictures the cosmos as a net with a jewel at every knot, each jewel reflecting all the others, so every part holds the whole.',
      },
      {
        name: 'Pratyabhijñā, the recognition school',
        when: 'Kashmir Shaivism, Utpaladeva and Abhinavagupta, 10th to 11th century',
        domain: 'Indian philosophy',
        text: 'Held that freedom is not gaining something new but recognizing that your own awareness was the divine all along.',
      },
      {
        name: 'Spinoza',
        when: 'Ethics, 1677',
        domain: 'Philosophy',
        text: 'Argued there is only one substance, which he called God or Nature, and that every thing is a way that one substance shows itself.',
      },
      {
        name: "Whitehead's prehension",
        when: 'Process and Reality, 1929',
        domain: 'Metaphysics',
        text: 'Described every moment of reality as coming into being by taking in, or prehending, the moments around it.',
      },
      {
        name: "Wheeler's it from bit",
        when: '1989',
        domain: 'Physics',
        text: 'Proposed that physical things arise from information, from the yes or no answers that observation draws out of the world.',
      },
    ],
  },
  {
    n: 2,
    name: 'Connecting',
    field: 'How we know',
    items: [
      {
        name: 'Hegel on mutual recognition',
        when: 'Phenomenology of Spirit, 1807',
        domain: 'Philosophy',
        text: 'Argued that a self only becomes fully conscious of itself when it is recognized by another self, and recognizes it back.',
      },
      {
        name: 'Martin Buber, I and Thou',
        when: '1923',
        domain: 'Philosophy and theology',
        text: 'Wrote that we become persons in relation, when we meet another as a whole presence instead of using them as an object.',
      },
      {
        name: 'Stereopsis',
        when: 'Charles Wheatstone, 1838',
        domain: 'Vision science',
        text: 'Showed that depth is seen when the brain compares two slightly different views, one from each eye, and fuses them.',
      },
      {
        name: 'Gregory Bateson',
        when: 'Steps to an Ecology of Mind, 1972',
        domain: 'Anthropology and systems thinking',
        text: 'Defined information as a difference that matters to a receiver, and placed mind in the relations of a whole system, not inside one skull.',
      },
      {
        name: 'Relational quantum mechanics',
        when: 'Carlo Rovelli, 1996',
        domain: 'Physics',
        text: 'Proposed that the properties of a physical system only exist relative to another system that interacts with it.',
      },
    ],
  },
  {
    n: 3,
    name: 'Understanding',
    field: 'What holds up',
    items: [
      {
        name: 'Consilience of inductions',
        when: 'William Whewell, 1840',
        domain: 'Philosophy of science',
        text: 'Named the moment when separate lines of evidence, gathered for different reasons, land on the same explanation.',
      },
      {
        name: 'Replication',
        when: 'Experimental science, from the 17th century on',
        domain: 'Scientific method',
        text: 'A result is trusted when other people, working on their own, can do the experiment again and see the same thing.',
      },
      {
        name: 'Inter-rater agreement',
        when: "Jacob Cohen's kappa, 1960",
        domain: 'Statistics and psychology',
        text: 'Measures how often independent judges reach the same call beyond what chance would give, as a test of whether a judgment is real.',
      },
      {
        name: 'Convergent evolution',
        when: 'Evolutionary biology, 19th century on',
        domain: 'Biology',
        text: 'Unrelated lineages arrive at the same solution on their own, like the camera eye of the octopus and the camera eye of the vertebrate.',
      },
      {
        name: 'Endosymbiosis',
        when: 'Lynn Margulis, 1967',
        domain: 'Cell biology',
        text: 'Showed that complex cells began as partnerships: the mitochondria in your cells were once free-living bacteria.',
      },
    ],
  },
  {
    n: 4,
    name: 'Being',
    field: 'How to live',
    items: [
      {
        name: 'The golden rule',
        when: 'Confucius, Analects, about 500 BCE, and nearly every tradition since',
        domain: 'Ethics',
        text: 'Do not do to others what you would not want done to you. The same rule shows up on its own in culture after culture.',
      },
      {
        name: 'Ubuntu',
        when: 'Southern Africa, old oral tradition',
        domain: 'African philosophy',
        text: 'Teaches that a person becomes a person through other people; your humanity is tied up in theirs.',
      },
      {
        name: 'Kintsugi',
        when: 'Japan, from about the 15th century',
        domain: 'Craft and aesthetics',
        text: 'Mends broken pottery with lacquer and gold, so the break becomes part of the object instead of something to hide.',
      },
      {
        name: "The hero's journey",
        when: 'Joseph Campbell, The Hero with a Thousand Faces, 1949',
        domain: 'Mythology',
        text: 'Found the same shape in myths across the world: leave home, face the ordeal, come back changed with something to share.',
      },
      {
        name: 'The land ethic',
        when: 'Aldo Leopold, A Sand County Almanac, 1949',
        domain: 'Ecology',
        text: 'Widened the idea of community to include soils, waters, plants and animals; an organism cannot be understood apart from its place.',
      },
      {
        name: 'Alan Watts',
        when: 'The Book, 1966',
        domain: 'Philosophy and religion',
        text: 'Argued that the lonely, separate ego is a social habit, and that each of us is something the whole universe is doing.',
      },
    ],
  },
];
