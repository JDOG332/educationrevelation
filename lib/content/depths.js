/*
 * /depths — the ten depths (0 to 9), one sentence in ten breaths.
 *
 * VERBATIM (Jeff): depth names, breaths, each depth's gist, the index lines.
 * CLAUDE DRAFTS: every `draft` field below (depths 5, 6, 7, 9). Written in
 * Jeff's register from his own lines in "The Secret Theory of Everything"
 * (2026-02-17, Drive id 1hdGVPB6xBVW8gIwcS4TnVJ4MLeaSlq2U) and the OnePage
 * (2026-02-21, Drive id 1xnnPQwgbREpqCqm8EK8RK7wOCmIYzw9V). Quoted lines in
 * the drafts are Jeff's. Jeff is still editing these; the page says so.
 */

export const DEPTHS_SENTENCE =
  'The whole site is one sentence in ten breaths: dreaming & building together... it works... it breathes... it has form... from every door... I crack... I am... you are... we become... it is what it is';

export const DEPTHS_SHAPE = '9 layers, 4 mirror pairs, 1 moon. The wheel (1–9) spins. The mirror (10) watches.';

export const DEPTHS_JOURNEY = "The journey: want → see → feel → shape → know → crack → am → you → become → accept. That's a life.";

export const DEPTHS_PERFECT = ['PERFECT = frozen. done. dead.', 'COMPLETE = whole. breathing. still turning.'];

export const DEPTHS = [
  { n: 0, name: 'The Void', breath: 'I want' },
  { n: 1, name: 'The Dream', breath: 'I see' },
  { n: 2, name: 'The Poem', breath: 'I feel' },
  { n: 3, name: 'The Pact', breath: 'I shape' },
  { n: 4, name: 'The Proof', breath: 'I know' },
  {
    n: 5,
    slug: 'break',
    name: 'The Break',
    breath: 'I crack',
    gist: ['What breaks you open so the light gets in.', 'After knowing comes cracking.'],
    draft: [
      'After knowing comes cracking. Depth 4 was the proof. You found it. You held it. You knew. Then something breaks.',
      'It is not a mistake. It is the next step.',
      'A seed cannot stay a seed. The shell has to split so the root can get out. That is not damage. That is the plan. "A grain of wheat that never falls to the ground remains alone." The break is the fall.',
      'The body knows this before the mind does. A baby is born with no teeth. Then the teeth come, and every one of them hurts. "Every tooth is a trauma that becomes a tool." TEETHE means to ache. To push through pain into power. You needed the ache to get the bite.',
      'Math knows it too. Push an equation far enough and it breaks. Divide by zero. Multiply by infinity. The answer stops being an answer. "The math breaks where you live. You live where the math breaks." The crack is not where the truth ends. The crack is where you come in.',
      'Think about tea. Leaves in hot water might think they are being destroyed. "No. This is tea." The heat is what makes them worth drinking.',
      'So what breaks you? A loss. A diagnosis. A job gone. A marriage over. A belief you built your house on, gone in one night. It feels like the end of the map.',
      'It is the edge of the map. That is different.',
      'You do not have to like the break. You do not have to call it a gift while you are bleeding. You only have to stay. Stay long enough for the light to find the crack. Then look at what came through.',
      'I crack. That is the breath. Not "I am broken." I crack. It is a verb. Something is still moving. Something is still on its way out.',
    ],
  },
  {
    n: 6,
    slug: 'self',
    name: 'The Self',
    breath: 'I am',
    gist: ['Meeting yourself inside the mirror.', 'The hardest depth.'],
    draft: [
      'After the crack, you can see in. Depth 6 is the mirror, and you are the one standing in front of it.',
      'This is the hardest depth. Not because the mirror lies. Because it does not.',
      'Every baby says MAMA, then DADA. Then the first word they really master is NO. "The first act of selfhood is refusal. I am not you." You started being you by saying what you were not. Most of us stop there. We know ourselves by our edges. What we won\'t do. Who we aren\'t.',
      'Depth 6 asks for the inside.',
      'Look at FINISH I START. The I sits in the middle. "The self is the hinge." The door swings both ways, but the hinge stays. Jobs end. Years end. People leave. The hinge stays. That is the part of you this depth is looking for. Not your story. The one who watches the story swing.',
      'And I is EYE. The witness. The one who sees.',
      'So stand there and look. You will see the scar. The habit you hate. The thing you did. The thing you never said. Don\'t fix it yet. Don\'t explain it. Just see it.',
      'Then see the other thing. The one who is doing the seeing. That one has never been broken. Not once.',
      '"A mirror that admits it is a mirror is the only mirror you can trust." Same with a self. The person who can say "this is what I am, all of it" is the only person who can change.',
      'I am. Two words. No word after them. Not I am good. Not I am bad. Not I am finished. Just I am. Most of a life is spent adding words after it. Depth 6 is where you take them off.',
      '"Be the loudest most alive something you can be." You can\'t do that until you know which something you are.',
    ],
  },
  {
    n: 7,
    slug: 'other',
    name: 'The Other',
    breath: 'you are',
    gist: ['Meeting them.', 'Recognition of another.', '7 uses 8 to become 9.'],
    draft: [
      'You met yourself. Now turn around.',
      'Depth 7 is the other person. The one across the table. The one in the next bed. The stranger in line. The one you love and the one you can\'t stand.',
      'You are. That is the breath. It is I am, pointed the other way.',
      'The Secret Theory has one law, and it is short. "Connect. Avoid being alone. Once connected connect more." Atoms do it. Cells do it. Galaxies do it. The law does not change at the scale of two people. It just gets harder to fake.',
      'Recognition is not agreeing. It is not even liking. It is seeing that someone is in there, the same way someone is in you. A whole hinge. A whole mirror. A whole life swinging on it.',
      'Think about a good teacher. Stands at the door. Greets every kid by name. No opt out. That teacher is not just being nice. That teacher is obeying the law. Every name said out loud is a small "you are."',
      '"The mirror of connection is isolation." It is the only true death. Loneliness kills faster than smoking. That is not poetry. It is epidemiology.',
      'Split the words open. FRIEND: "Freedom without witness is just isolation." LOVER: "The one who learns you over and over." Not once. Over.',
      'So depth 7 is not a feeling. It is a practice. You see them. You say it. You do it again tomorrow, because they changed overnight, and so did you.',
      '7 uses 8 to become 9. Two people meeting is how we become. And becoming is how you reach the mirror at the end, the one that just says it is what it is.',
      '"The cure for all suffering: reconnect." Start with one person. Start today. Say their name.',
    ],
  },
  { n: 8, name: 'The Return', breath: 'we become' },
  {
    n: 9,
    slug: 'mirror',
    name: 'The Mirror',
    breath: 'it is what it is',
    gist: [
      'The moon. Not perfection — completion.',
      '"WE FINISH I START" returns to THE VOID. The wheel turns again. But you\'re different now. The want is deeper. The eyes are wider.',
      '10 sits OUTSIDE the wheel. 10 WATCHES the wheel. Just seeing. Accepting. Complete.',
    ],
    draft: [
      'It is what it is. People say it when they give up. That is not what it means here.',
      'Here it means you stopped fighting the shape of things. Not because you lost. Because you finally saw it.',
      'Depth 9 is the moon. "The moon has no light of its own." It takes the sun and gives it back softer, so you can look at it. You can\'t stare at the sun. But you can stand in moonlight and see the whole yard. The tree, the fence, the path, the door. Not in detail. In relationship.',
      'That is what the ninth depth gives you. Not more facts. The whole field at once.',
      'Perfect and complete are not the same. Perfect is frozen. Done. Dead. Complete is whole, breathing, still turning. A perfect life would be a statue. A complete life is a wheel.',
      'And the wheel turns again. FINISH I START. The end of 9 is the start of 0. The want comes back. The void comes back. But you are not the person who started. The want is deeper. The eyes are wider.',
      'Love is the asymptote. "Always approaching. Never landing. That is not a tragedy. That is the engine." If you ever arrived, the wanting would stop, and the turning would stop with it.',
      'So what does acceptance look like? Water. "Still water shows a perfect circle. Rough water breaks it into a thousand moving pieces. Both are the moon." Some days you are the circle. Some days you are the pieces. Both are the moon.',
      '10 sits outside the wheel and watches. That is you, reading this. "You are layer ten." Not above it. Not done with it. Just seeing.',
      'AMEN. AHEM. The seal and the opening. Finish. Start.',
    ],
  },
];

export const DEPTH_PAGES = DEPTHS.filter((d) => d.slug);
