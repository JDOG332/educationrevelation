/**
 * Everything the /theory page says, in one place.
 * Source: the paper "Convergent Recognition Theory: A Geometric Coherence
 * Functional for Information Geometry", J. Sellers, v8.7, February 2026,
 * plus the site's own plain-English reading of it. Jeff edits the words here.
 */

export const PAPER = {
  title: 'Convergent Recognition Theory',
  subtitle: 'A geometric coherence functional for information geometry',
  author: 'Jeffrey M. Sellers',
  place: 'Oakwood, Ohio',
  version: '8.7',
  date: 'February 2026',
  dateISO: '2026-02-22',
  pdf: '/papers/convergent-recognition-theory-v8.7.pdf',
  // SHA-256 of the hosted PDF (author metadata set) and of the original
  // bytes as written on 2026-02-22, kept unchanged in /papers/archive/.
  sha256: '506359a86c5b57fc041acf8e0f011a6c882378178e3163cf9364c49e0510e7f4',
  originalPdf: '/papers/archive/psi_v8_7-original.pdf',
  originalSha256: '2c96d1e8c457956d055a421fca06b8ea9e71e34646f8273bed6f3b318ee09984',
  doi: null, // filled in once the Zenodo deposit exists
};

export const EQUATION = 'Ψ = 2^(−S_eff) = R₁₂ × Γ';

// What Ψ is, in one breath. Claude drafted; Jeff edits.
export const IN_ONE_BREATH = [
  'Two systems look at the same thing. Each builds its own picture from its own data. Ψ is a single number, between 0 and 1, for how well those two pictures agree, and for how much that agreement is worth.',
  'The agreement part is R₁₂: how close the two pictures are, with a gate that refuses to count two blank pictures as agreeing. The worth part is Γ: how many independent methods back the pictures up, and how clean the signal was. Multiply them and you have Ψ.',
  'Signal goes out. Comes back the same. That is recognition. Ψ is the measure of it.',
];

// The two claims, in the paper's own terms.
export const CLAIMS = {
  weak: {
    title: 'The claim the paper makes',
    text: 'Ψ is a well-defined, bounded, measurable score for how well two independent reconstructions of the same quantum state agree, given a fixed experiment and a fixed set of reconstruction methods. It can be built and tested today with standard quantum-optics hardware. The paper gives the definitions, the bounds, two validations and two predictions, each with the result that would count as failure.',
  },
  strong: {
    title: 'The hypothesis the paper only proposes',
    text: 'That how Ψ changes across space tracks how spacetime itself curves (the gradient of Ψ against the gradient of the Kretschmann scalar). The paper calls this speculative, keeps it in an appendix, and says plainly that it does not rest on it. No experiment has been run. The idea that recognition pulls things together, the idea this whole site plays with, lives here: it is the hope, not the result.',
  },
};

// The glossary: every symbol, what it is, how it is measured.
export const GLOSSARY = [
  { sym: 'ρ₁, ρ₂', name: 'The two pictures', def: 'Density matrices of one source, each reconstructed from its own separate batch of data (quantum state tomography).', range: 'states' },
  { sym: 'F', name: 'Fidelity', def: 'Uhlmann fidelity between ρ₁ and ρ₂: (Tr √(√ρ₁ ρ₂ √ρ₁))². How alike the two pictures are.', range: '0 to 1' },
  { sym: 'I(ρ)', name: 'Informativeness', def: '1 − S(ρ)/log₂ d, with S the von Neumann entropy in bits. A pure state scores 1; a fully mixed state, which knows nothing, scores 0.', range: '0 to 1' },
  { sym: 'G_ε', name: 'The ignorance gate', def: '√((I₁+ε)(I₂+ε)) / (1+ε). Two pictures that both know nothing can look identical. The gate stops that from counting as recognition.', range: 'ε/(1+ε) to 1' },
  { sym: 'R₁₂', name: 'Recognition core', def: 'F × G_ε. Agreement that has earned the right to count.', range: '0 to 1' },
  { sym: 'C₀', name: 'Raw convergence', def: '1 − JSD_w/(H(w)+H_min): how much the different reconstruction methods agree with one another on what the data say (Jensen-Shannon divergence between their predicted outcomes).', range: '0 to 1' },
  { sym: 'R', name: 'Redundancy ratio', def: 'n_unique / n_active. Five copies of one method are not five witnesses; methods that always agree are merged before they are counted.', range: '1/n to 1' },
  { sym: 'C_eff', name: 'Effective convergence', def: 'C₀ × R. Independent agreement among methods.', range: '0 to 1' },
  { sym: 'D̂', name: 'Detection quality', def: 'D / (D + D_ref): coincidence counts against accidental counts. Signal against noise, squashed to a number below 1.', range: '0 to 1' },
  { sym: 'Γ', name: 'Reliability', def: 'C_eff × D̂. The paper writes this factor G; the site writes Γ so it is never mistaken for Newton\'s constant.', range: '0 to 1' },
  { sym: 'Ψ', name: 'Convergent recognition', def: 'R₁₂ × Γ. The same thing written as 2^(−S_eff), where S_eff = −log₂R₁₂ − log₂Γ adds the costs up. One number for a whole measurement.', range: '0 to 1' },
];

// Tests from the paper, section 8, each with its failure condition.
export const TESTS = [
  {
    id: 'V1', kind: 'Validation', name: 'Density attenuation',
    what: 'Dim the photon source across three orders of magnitude while holding everything else fixed (same number of counts, longer integration).',
    expect: 'Ψ falls along the sigmoid curve of D̂, and only because of D̂.',
    fail: 'Ψ falls linearly or exponentially instead.',
  },
  {
    id: 'V2', kind: 'Validation', name: 'The ignorance floor',
    what: 'Two thermal light sources: high-entropy, near-maximally mixed states that look alike.',
    expect: 'The fidelity is near 1, but R₁₂ sits at the floor, about ε/(1+ε). Agreement between two blanks does not count.',
    fail: 'R₁₂ comes out well above the floor.',
  },
  {
    id: 'P2', kind: 'Prediction', name: 'State-family sensitivity',
    what: 'Werner states with a tunable amount of entanglement, reconstructed by two independent pipelines from separate data batches, against a control family of separable states matched for purity and entropy.',
    expect: 'Ψ rises with entanglement (preliminary simulation: Spearman ρ > 0.95), and the entangled family separates from the matched separable family.',
    fail: 'Ψ shows no relation to the state-family parameter once purity is controlled, or the two families cannot be told apart.',
  },
  {
    id: 'P3', kind: 'Prediction', name: 'Commutator asymmetry',
    what: 'Measure with two operators in one order, then the other. Compare Ψ₁₂ and Ψ₂₁ as the operators go from commuting to non-commuting (small-commutator regime).',
    expect: 'The gap |Ψ₁₂ − Ψ₂₁| grows in a straight line with the size of the commutator (R² > 0.9).',
    fail: 'No relation, a non-linear one, or R² at or below 0.9.',
  },
  {
    id: 'PA1', kind: 'The appendix hypothesis', name: 'The curvature bridge',
    what: 'Vary height near a massive body with everything about the apparatus held fixed.',
    expect: 'The gradient of Ψ correlates with the gradient of √K, the tidal curvature.',
    fail: 'No significant correlation. The paper says this failing would not touch the main claim.',
  },
];

// Appendix B.1 of the paper: simulated Ψ for named states.
export const SENSITIVITY = [
  { state: 'Bell state |Φ⁺⟩', psi: 0.92 },
  { state: 'Werner, p = 0.8', psi: 0.71 },
  { state: 'Werner, p = 0.2', psi: 0.28 },
  { state: 'Separable mixed', psi: 0.15 },
  { state: 'Maximally mixed', psi: '≈ ε' },
];

// Where the idea sits. Named neighbors, not a claim to be their convergence.
export const RELATED = [
  { who: 'Pratyabhijñā (Utpaladeva, Abhinavagupta, Kashmir, 10th to 11th c.)', what: 'The "doctrine of recognition": the self is not attained but re-cognized. The oldest and closest ancestor of the name.' },
  { who: 'Hegel; Axel Honneth', what: 'Anerkennung, mutual recognition, as the ground of selfhood and of a just society.' },
  { who: 'Martin Buber', what: 'I and Thou: a relation that constitutes both sides.' },
  { who: 'Alfred North Whitehead', what: 'Prehension: every actual occasion is made of how it takes account of others.' },
  { who: 'Gregory Bateson', what: 'Information as a difference that makes a difference; mind as pattern that connects.' },
  { who: 'Alan Watts', what: 'The universe looking at itself through each of us; Indra\'s net.' },
  { who: 'John Wheeler; Carlo Rovelli', what: 'It from bit; relational quantum mechanics, where properties exist only relative to other systems.' },
  { who: 'Jacobson (1995); Verlinde (2011); Van Raamsdonk (2010)', what: 'Spacetime and gravity as thermodynamic, entropic or entanglement phenomena. The physics program the appendix hypothesis would belong to.' },
  { who: 'Uhlmann (1976); Jozsa (1994); Lin (1991)', what: 'The fidelity and the Jensen-Shannon divergence the equation is built from.' },
  { who: 'Inter-rater reliability; stereopsis; replication', what: 'Agreement between independent witnesses as the everyday form of the same idea.' },
];

// How the paper was written, and when. Only v8.7 carries a date in the
// paper itself; the rest are the order of revision from its Appendix B.
export const VERSIONS = [
  { v: 'v1', note: 'First formulation. The inverse-density paradox found.' },
  { v: 'v2', note: 'Logarithmic correction. A Planck-scale reference density turned out untestable.' },
  { v: 'v3', note: 'Fidelity, Jensen-Shannon divergence, an empirical reference density. The commutator constraint.' },
  { v: 'v4', note: 'Geometric action. The informativeness gate. Redundancy control.' },
  { v: 'v5', note: 'The curvature bridge restored with a geometric justification.' },
  { v: 'v6.0 to 6.8', note: 'Kretschmann scalar replaces Ricci. D̂ bounded. Smooth, normalized gate. Base-2 throughout.' },
  { v: 'v7.0 to 7.9', note: 'Peer-review format. Bridge moved to an appendix. Sensitivity analysis, clustering, piecewise continuity made explicit, notation unified, title de-escalated.' },
  { v: 'v8.0 to 8.6', note: 'Two-point form, regulated JSD, connected-component redundancy, Ψ = R₁₂ × G made modular, operational reframe, softened axioms, prediction count fixed.' },
  { v: 'v8.7', date: 'February 22, 2026', note: 'Notation fixed (2^(−S_eff)), ideal versus implemented zero-locus stated, softmax weights, P2 and P3 calibration made concrete. The version hosted here.' },
];

export const HOW_IT_WAS_WRITTEN = 'Jeff wrote the idea and every decision. The mathematics was drafted and redrafted with AI models (Claude, Gemini, ChatGPT) acting as adversarial reviewers from version to version: each pass tried to break the definitions, and the next version repaired what broke. They are tools in this story, not authors. Every version is kept.';

export const CITE = {
  text: 'Sellers, J. M. (2026). Convergent Recognition Theory: A Geometric Coherence Functional for Information Geometry (v8.7). educationrevelation.com/theory',
  bibtex: `@misc{sellers2026crt,
  author = {Sellers, Jeffrey M.},
  title = {Convergent Recognition Theory: A Geometric Coherence Functional for Information Geometry},
  year = {2026},
  month = {February},
  note = {Version 8.7},
  url = {https://www.educationrevelation.com/theory}
}`,
};

// The Ψ numbers on the doors and rooms of this site (lib/subcategories.js).
export const ROOM_PSI_NOTE = 'Every room on this site carries a small Ψ. Those numbers are not computed. They are a felt score, set by hand: how strongly that room shows two things recognizing each other. They are a way of reading the site through the equation, not a measurement.';
