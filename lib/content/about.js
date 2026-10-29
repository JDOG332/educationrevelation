/**
 * The About page, in Jeff's own register. Claude drafted from the repo's
 * facts; Jeff edits. `x` and `xHandle` stay null until Jeff gives the handle.
 */
export const ABOUT = {
  summary: 'Education Revelation is built by Jeff Sellers of Oakwood, Ohio: ten doors into human knowledge, poems, promises, and one equation underneath, Convergent Recognition Theory. Here is who he is, why the site exists, and how AI was used to build it.',

  x: null,        // e.g. 'https://x.com/handle'
  xHandle: null,  // e.g. '@handle'

  who: [
    'Jeff Sellers spent 17 years in early childhood education and professional development before moving to the business side of a behavioral health group practice in Ohio, where he runs intake, insurance, billing and the technology. He thinks in systems. He writes poems. He has been turning one idea over for years: that recognition, two things seeing each other truly, is the most basic thing there is.',
    'This site is that idea, built out. The ten doors are the ways people have always studied existence. The 1,001 topics are the same questions seen through each door. The theory is the attempt to write the idea down as a number that could be tested.',
  ],

  why: [
    'Partly as a record. The ideas here were worked out in the open, across many conversations, and the dates matter: every version of the paper is kept, and the site says when each thing was written.',
    'Partly as a gift. The promises, the poems and the doors are for the people Jeff loves, and for anyone who lands here from a shared link and stays a while.',
    'And partly because the question would not leave him alone. If it is wrong, the tests on the theory page say how it would be shown wrong. That is the point of writing it down.',
  ],

  ai: [
    'Plainly: the ideas are Jeff\'s, and every decision on this site was his. The writing of the mathematics, the code, and much of the text was done with AI models (Claude, Gemini and ChatGPT) from February 2026 on. On the paper they acted as adversarial reviewers, version after version: each one tried to break the definitions, and the next version repaired what broke. They are tools in this story, not authors.',
    'Some of the earliest work was done with models that were weaker than the ones available now, and it shows in places. Rather than hide that, the site keeps every version and dates them. The theory page lists what the paper claims, what it only hopes, and what would prove it wrong.',
  ],

  start: [
    { href: '/search', label: 'The ten doors', note: 'search anything, or pick a door' },
    { href: '/theory', label: 'The theory', note: 'the equation, the paper, a live calculator' },
    { href: '/promises', label: 'Ten promises', note: 'the best place to start if you are here for the words' },
    { href: '/poems', label: 'Poems', note: 'six, three with their own universes' },
    { href: '/alanwatts', label: 'Alan Watts', note: '163 lectures and 332 ideas, ranked' },
    { href: '/proof', label: 'The proof', note: 'the evidence trail across millennia' },
  ],
};
