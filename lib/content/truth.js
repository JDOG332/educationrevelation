/*
 * /truth — the truth map (Jeff's "truth scoring engine").
 * The Vinding example is Jeff's own reading, verbatim. The two explaining
 * paragraphs on the page are a Claude DRAFT built from Jeff's notes.
 * Scores are Jeff's judgments, not measurements.
 */

export const VINDING = {
  source: 'Magnus Vinding, You Are Them',
  core: 'The individual self is a biological illusion. Consciousness has no solid walls. All suffering is equally bad. Logical duty to stop it everywhere.',
  layers: [
    { layer: 'Foundation', range: '99%', claims: ['Pain is bad', 'Act Now'] },
    { layer: 'Bridge', range: '98–97%', claims: ['Help Everyone', 'End the Dark'] },
    { layer: 'The "Why"', range: '96–94%', claims: ['Self is a lie', 'Shared Nerve', 'Boundaries are fake'] },
    { layer: 'The Framework', range: '93–91%', claims: ['Logic Rules', 'Open Identity', 'Universal Care'] },
  ],
  // Lowest confidence first, as Jeff listed them.
  risks: [
    { claim: 'Universal Care', score: 91, risk: 'Tribe bias is biological, not logical' },
    { claim: 'Open Identity', score: 92, risk: "Hardware doesn't literally swap between bodies" },
    { claim: 'Logic Rules', score: 93, risk: "Pure math can't always solve trauma" },
    { claim: 'Boundaries are fake', score: 94, risk: "Physical walls exist (my stomach doesn't fill when you eat)" },
    { claim: 'Self is a lie', score: 96, risk: 'The ego is a functional survival tool' },
  ],
};
