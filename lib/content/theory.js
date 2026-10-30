/**
 * Everything the /theory page says, in one place.
 * Source: the paper "Convergent Recognition Theory: Ψ, an operational
 * agreement score for independent quantum-state reconstructions",
 * J. M. Sellers, v11.0, October 30, 2026 (paper/CRT-v11.0.md in this repo),
 * plus the site's own plain-English reading of it. Jeff edits the words here.
 */

export const PAPER = {
  title: 'Convergent Recognition Theory',
  subtitle: 'Ψ, an operational agreement score for independent quantum-state reconstructions',
  author: 'Jeffrey M. Sellers',
  place: 'Oakwood, Ohio',
  version: '11.0',
  date: 'October 30, 2026',
  dateISO: '2026-10-30',
  pdf: '/papers/convergent-recognition-theory-v11.0.pdf',
  // SHA-256 of the hosted v11.0 PDF (author metadata set).
  sha256: '8e996fcd562b5a7d02e82962affdc3a9406493c8f726941c1b0308b4bef97045',
  source: 'https://github.com/JDOG332/educationrevelation/blob/main/paper/CRT-v11.0.md',
  code: 'https://github.com/JDOG332/educationrevelation/tree/main/paper/sim',
  doi: null, // filled in once the Zenodo deposit exists
};

// The version this one supersedes, kept hosted so the record stays whole.
export const PREVIOUS = {
  version: '8.7',
  date: 'February 22, 2026',
  pdf: '/papers/convergent-recognition-theory-v8.7.pdf',
  sha256: '506359a86c5b57fc041acf8e0f011a6c882378178e3163cf9364c49e0510e7f4',
  originalPdf: '/papers/archive/psi_v8_7-original.pdf',
  originalSha256: '2c96d1e8c457956d055a421fca06b8ea9e71e34646f8273bed6f3b318ee09984',
};

export const EQUATION = 'Ψ = 2^(−S_eff) = R₁₂ × Γ';

// What Ψ is, in one breath. Claude drafted; Jeff edits.
export const IN_ONE_BREATH = [
  'Two systems look at the same thing. Each builds its own picture from its own data. Ψ is a single number, between 0 and 1, for how well those two pictures agree, and for how much that agreement is worth.',
  'The agreement part is R₁₂: how alike the two pictures are, with a gate that refuses to count two blank pictures as agreeing. The worth part is Γ: how many independent methods back the pictures up, and how clean the signal was. Multiply them and you have Ψ.',
  'Signal goes out. Comes back the same. That is recognition. Ψ is the measure of it. With enough data, the paper now shows, Ψ comes down to three things: how sharp the state is (its entropy), how many methods were used, and how clean the detector was.',
];

// The two claims, in the paper's own terms.
export const CLAIMS = {
  weak: {
    title: 'The claim the paper makes',
    text: 'Ψ is a well-defined, bounded, measurable score for how well two independent reconstructions of the same quantum state agree, given a fixed experiment and a fixed set of reconstruction methods. It can be built and tested today with standard quantum-optics hardware. Version 11 ran the paper\'s own tests in released code for the first time: one prediction failed and is withdrawn, one validation turned into a law with a number in it, one survived with its experiment designed, and a lemma now says what Ψ cannot do.',
  },
  strong: {
    title: 'The hypothesis the paper only proposes',
    text: 'That how Ψ changes across space tracks how spacetime itself curves (the gradient of Ψ against the gradient of the Kretschmann scalar). The paper calls this speculative, keeps it in an appendix, and says plainly that it does not rest on it. No experiment has been run. The idea that recognition pulls things together, the idea this whole site plays with, lives here: it is the hope, not the result.',
  },
};

// What version 11 found when the tests were run. Plain words.
export const WHAT_V11_FOUND = [
  { s: 'Ψ cannot see entanglement', m: 'New lemma: with enough data, Ψ depends on a state only through its entropy. An entangled state and a separable one with the same spectrum get the same Ψ. The simulation confirms it from 1,000 to 1,000,000 counts.' },
  { s: 'The entanglement prediction (P2) is withdrawn', m: 'Run for the first time, the Werner family and its matched separable control gave the same scores at every setting. The paper reports the negative result and withdraws the prediction rather than bending it.' },
  { s: 'The ignorance floor became a number: 34.3 divided by the counts', m: 'Two blank pictures never reach the tiny floor the old paper claimed; at N counts their R₁₂ sits at about 34.3/N, and a pencil derivation gives 34.32. A lab that measures a constant outside 31 to 37 has shown the paper\'s model of its setup is wrong.' },
  { s: 'The order asymmetry (V3) is real and now cheap to see', m: 'Measuring two operators in opposite orders shifts Ψ in proportion to how much they clash, with a predicted sign and size. With full-strength measurements and a tilted input state, about 240,000 detected pairs show the slope; about 3 million settle the full criterion.' },
  { s: 'Ψ for a perfect Bell state is not yet basis-independent', m: 'Aligned with the detector basis it scores 0.92; turned by any local rotation it scores about 0.45 at 10,000 counts, because the two methods stop being merged. Stated plainly in the paper and added to the released code as a control.' },
  { s: 'The agreement factor C_eff counts methods, nothing more', m: 'With the paper\'s weights it is exactly 1 over the number of active methods; it never takes an informative value in between. The paper says so and leaves the fix to a later version.' },
  { s: 'The old table had impossible numbers', m: 'Two Werner values (0.71 and 0.28) exceeded the paper\'s own upper bound; they were purities. The table is regenerated from the released code, and a false lemma and an overclaimed axiom were corrected by a fresh referee pass.' },
];

// The glossary: every symbol, what it is, how it is measured.
export const GLOSSARY = [
  { sym: 'ρ₁, ρ₂', name: 'The two pictures', def: 'Density matrices of one source, each reconstructed from its own separate batch of data (quantum state tomography).', range: 'states' },
  { sym: 'F', name: 'Fidelity', def: 'Uhlmann fidelity between ρ₁ and ρ₂: (Tr √(√ρ₁ ρ₂ √ρ₁))². How alike the two pictures are. Across the test states it moves by under 1%.', range: '0 to 1' },
  { sym: 'I(ρ)', name: 'Informativeness', def: '1 − S(ρ)/log₂ d, with S the von Neumann entropy in bits. A pure state scores 1; a fully mixed state, which knows nothing, scores 0. This is where nearly all of Ψ\'s variation lives.', range: '0 to 1' },
  { sym: 'G_ε', name: 'The ignorance gate', def: '√((I₁+ε)(I₂+ε)) / (1+ε). Two pictures that both know nothing can look identical. The gate stops that from counting as recognition.', range: 'ε/(1+ε) to 1' },
  { sym: 'R₁₂', name: 'Recognition core', def: 'F × G_ε. Agreement that has earned the right to count. For a blank state at N counts it sits at about 34.3/N, not at the ε floor.', range: '0 to 1' },
  { sym: 'C₀', name: 'Raw convergence', def: '1 − JSD_w/(H(w)+H_min): how much the different reconstruction methods agree with one another on what the data say (Jensen-Shannon divergence between their predicted outcomes). In practice within 10⁻⁵ of 1.', range: '0 to 1' },
  { sym: 'r_red', name: 'Redundancy ratio', def: 'n_unique / n_active. Five copies of one method are not five witnesses; methods that always agree are merged before they are counted.', range: '1/n to 1' },
  { sym: 'C_eff', name: 'Effective convergence', def: 'C₀ × r_red. With the paper\'s weights this is exactly 1/n_active: it records how many methods were used, not how good the data were.', range: '0 to 1' },
  { sym: 'D̂', name: 'Detection quality', def: 'D / (D + D_ref): coincidence counts against accidental counts. Signal against noise, squashed to a number below 1.', range: '0 to 1' },
  { sym: 'Γ', name: 'Reliability', def: 'C_eff × D̂. The paper wrote this factor G up to v10; from v11 it is Γ so it is never mistaken for Newton\'s constant.', range: '0 to 1' },
  { sym: 'Ψ', name: 'Convergent recognition', def: 'R₁₂ × Γ. The same thing written as 2^(−S_eff), where S_eff = −log₂R₁₂ − log₂Γ adds the costs up. One number for a whole measurement. Ψ̂ is its finite-data estimate.', range: '0 to 1' },
];

// Tests from the paper, section 8, each with its failure condition.
export const TESTS = [
  {
    id: 'V1', kind: 'Validation', name: 'Detection quality',
    what: 'Vary the accidental-count rate at a fixed coincidence count (or record D̂ from the measured rates) across at least one decade of the coincidence-to-accidental ratio, with the state and the sample size held fixed.',
    expect: 'Ψ̂/D̂ stays constant within its bootstrap confidence interval.',
    fail: 'Ψ̂/D̂ varies with the coincidence-to-accidental ratio beyond that interval. (v8.7\'s pump-attenuation version is restated: dimming the pump raises that ratio, and D̂ computed from the same rates made the old test an identity.)',
  },
  {
    id: 'V2', kind: 'Validation', name: 'The finite-sample floor',
    what: 'A source with independently bounded informativeness (I(ρ) < 0.1·a/N_max), reconstructed from N counts per batch of the 16-outcome product SIC-POVM, over at least two decades of N with at least 30 runs per N.',
    expect: 'R̂₁₂ falls as a/N with a = 34.3 ± 0.1 (first-order theory 34.32). The ideal floor ε/(1+ε) is a limit reached only near N ≈ 3 × 10⁹, not a measurement.',
    fail: 'The 95% interval of a (with the exponent fixed at 1, N ≥ 10⁴) lies outside 31 to 37, or the 95% interval of the exponent excludes 1.',
  },
  {
    id: 'V3', kind: 'Validation', name: 'Order asymmetry',
    what: 'A tilted single-qubit input (Bloch vector (1,0,1)/√2) with its partner maximally mixed; measure σ_z then an operator tilted by θ in the x-z plane, and in the opposite order, projectively (γ = 1), for θ ≤ 0.2 rad; compare the means of Ψ̂ over runs.',
    expect: 'The signed difference falls linearly with the commutator norm 2 sin θ, slope ≈ −0.22 × r_∞ × D̂, exponent 1. About 2.4 × 10⁵ detected pairs show the slope at 5σ; about 3 × 10⁶ settle the full criterion. A Bell input gives exactly zero.',
    fail: 'The slope is not negative and within 20% of the prediction at 5σ, or the log-log exponent lies outside 0.9 to 1.1. (Called P3 up to v8.7; it is a computable consequence of the Lüders rule plus the lemma, so v11 calls it a validation.)',
  },
  {
    id: 'P2', kind: 'Withdrawn prediction', name: 'State-family sensitivity',
    what: 'Werner states with a tunable amount of entanglement against a separable control family matched for purity and entropy (the Werner spectrum placed on the product-basis diagonal; verified separable).',
    expect: 'v8.7 predicted Ψ would rise with entanglement and separate the two families.',
    fail: 'Run in simulation: Ψ̂ rose identically in both families (Spearman 1.000 against the Werner parameter in each), with no significant separation at any setting below p = 1; the p = 1 gap is a threshold artifact the paper\'s own rule excludes. The stated failure condition was met, so the prediction is withdrawn, not reinterpreted. The lemma explains why.',
  },
  {
    id: 'PA1', kind: 'The appendix hypothesis', name: 'The curvature bridge',
    what: 'Vary height near a massive body with everything about the apparatus held fixed.',
    expect: 'The gradient of Ψ correlates with the gradient of √K, the tidal curvature.',
    fail: 'No significant correlation. The paper says this failing would not touch the main claim.',
  },
];

// Appendix B.1 of the paper, regenerated from the released code:
// N = 10⁴ counts per batch, 20 seeds, ε = 10⁻⁸, δ_reg = 10⁻⁶, D̂ = 0.95.
export const SENSITIVITY = [
  { state: 'Bell |Φ⁺⟩, aligned with the detector basis', psi: '0.918 ± 0.014', upper: '0.95' },
  { state: 'Bell |Φ⁺⟩, any local rotation', psi: '≈ 0.44 to 0.45', upper: '0.95' },
  { state: 'Werner, p = 0.8', psi: '0.275 ± 0.005', upper: '0.547' },
  { state: 'Werner, p = 0.2', psi: '0.020 ± 0.002', upper: '0.037' },
  { state: 'Separable mixed (|00⟩⟨00| + |11⟩⟨11|)/2', psi: '0.219 ± 0.010', upper: '0.475' },
  { state: 'Maximally mixed I/4', psi: '0.0015 ± 0.0004', upper: '≈ 10⁻⁸ (population)' },
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

// How the paper was written, and when. v8.7, v9.1, v9.9, v10 and v11 carry
// dates; the rest are the order of revision from Appendix B.2.
export const VERSIONS = [
  { v: 'v1', note: 'First formulation. The inverse-density paradox found.' },
  { v: 'v2', note: 'Logarithmic correction. A Planck-scale reference density turned out untestable.' },
  { v: 'v3', note: 'Fidelity, Jensen-Shannon divergence, an empirical reference density. The commutator constraint.' },
  { v: 'v4', note: 'Geometric action. The informativeness gate. Redundancy control.' },
  { v: 'v5', note: 'The curvature bridge restored with a geometric justification.' },
  { v: 'v6.0 to 6.8', note: 'Kretschmann scalar replaces Ricci. D̂ bounded. Smooth, normalized gate. Base-2 throughout.' },
  { v: 'v7.0 to 7.9', note: 'Peer-review format. Bridge moved to an appendix. Sensitivity analysis, clustering, piecewise continuity made explicit, notation unified, title de-escalated.' },
  { v: 'v8.0 to 8.6', note: 'Two-point form, regulated JSD, connected-component redundancy, Ψ = R₁₂ × G made modular, operational reframe, softened axioms, prediction count fixed.' },
  { v: 'v8.7', date: 'February 22, 2026', note: 'Notation fixed (2^(−S_eff)), ideal versus implemented zero-locus stated, softmax weights, P2 and P3 calibration made concrete. The full treatment; hosted below.' },
  { v: 'v9.1', date: 'February 22, 2026', note: 'A short operational restatement: Ψ "not presented as a new physical invariant", with a limitations list and no bridge appendix.' },
  { v: 'v9.9 and v10.0', date: 'February 24, 2026', note: 'The Grok hardening: a χ² redundancy screen, a fail-fast condition guard, flux normalization, a 5σ anomaly filter. Also a misspelled Kretschmann, a dropped square root and an unnormalized C_eff, recorded as errors in v11.' },
  { v: 'v11.0', date: 'October 30, 2026', note: 'The version that tested itself. Released simulation code; the entropy lemma; P2 withdrawn as a negative result; V2 restated as the 34.3/N floor law; P3 restated as validation V3 with its experiment designed; the sensitivity table regenerated; a false lemma and an overclaimed axiom corrected after a fresh referee pass; Algorithm 1 clarified; G renamed Γ; v10 folded in; full AI disclosure; the subtitle changed to say what the paper is.' },
];

export const HOW_IT_WAS_WRITTEN = 'Jeff set the question, made every decision, and set the standard of honesty applied here. The mathematics, the simulation code and much of the text were drafted and redrafted with AI models (Claude, Gemini, ChatGPT and, for one draft, Grok) acting as adversarial reviewers from version to version: each pass tried to break the definitions, and the next version repaired what broke. For version 11 the simulation code, its three phases, the lemma sketch and the floor-law derivation were produced by Claude at Jeff\'s direction and checked by a second, independent AI pass; the paper says so in its own words. They are tools in this story, not authors. Every version is kept.';

export const CITE = {
  text: 'Sellers, J. M. (2026). Convergent Recognition Theory: Ψ, an operational agreement score for independent quantum-state reconstructions (v11.0). educationrevelation.com/theory',
  bibtex: `@misc{sellers2026crt,
  author = {Sellers, Jeffrey M.},
  title = {Convergent Recognition Theory: Ψ, an operational agreement score for independent quantum-state reconstructions},
  year = {2026},
  month = {October},
  note = {Version 11.0},
  url = {https://www.educationrevelation.com/theory}
}`,
};

// The Ψ numbers on the doors and rooms of this site (lib/subcategories.js).
export const ROOM_PSI_NOTE = 'Every room on this site carries a small Ψ. Those numbers are not computed. They are a felt score, set by hand: how strongly that room shows two things recognizing each other. They are a way of reading the site through the equation, not a measurement.';
