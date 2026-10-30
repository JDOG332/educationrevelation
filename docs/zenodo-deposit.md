# Zenodo deposit: Convergent Recognition Theory v11.0

Zenodo gives a free DOI per version and keeps every version immutable. Jeff signs in (GitHub or ORCID sign-in works). Claude can fill the form in Chrome once Jeff is signed in; the Publish tap is Jeff's (Sharing). Only v11.0 goes up: Jeff decided (10/29/2026) not to deposit v8.7.

## Step by step (about 10 minutes)
1. Open https://zenodo.org and sign in (Log in with GitHub or ORCID).
2. New upload: https://zenodo.org/uploads/new
3. Files: upload these two from the Mac clone (Projects/Secret Theory of Everything/Site Code/educationrevelation):
   - `public/papers/convergent-recognition-theory-v11.0.pdf` (SHA-256 in `lib/content/theory.js`, PAPER.sha256; check it matches the file: `shasum -a 256 <file>`).
   - a zip of `paper/` (the Markdown source `CRT-v11.0.md`, `paper.css`, and `sim/` with the code and the three results folders): `cd <clone> && git archive --format=zip -o /tmp/crt-v11.0-source-and-code.zip HEAD paper` and upload that zip.
4. Fill the form with the fields below. Resource type: Preprint. Publication date: 2026-10-30. Keep "Reserve DOI" on so the DOI is known before publishing.
5. Publish. Publishing is public and permanent for that version (Sharing, so Jeff decides).
6. Paste the DOI (10.5281/zenodo.NNNNNNN) to Claude: it goes into `lib/content/theory.js` as `doi`, into the theory page, the citation and the JSON-LD, and into the "Cite as" line of the paper for the next build.
7. A later version (v12) uses "New version" on the same record, so every version shares one concept DOI.

## Fields
- Title: Convergent Recognition Theory: Ψ, an operational agreement score for independent quantum-state reconstructions (v11.0)
- Creators: Sellers, Jeffrey M. (Oakwood, Ohio, United States). Add the ORCID iD if there is one.
- Description (paste):
  Ψ is a bounded score in [0, 1) for how well two independent tomographic reconstructions of one quantum state agree, and how much that agreement is worth: Ψ = 2^(−S_eff) = R₁₂ × Γ, with R₁₂ the gated Uhlmann fidelity between reconstructions from disjoint data batches (a geometric-mean informativeness gate stops shared ignorance from counting as agreement) and Γ = C_eff × D̂ (redundancy-controlled consensus across reconstruction methods times a bounded coincidence-to-accidental detection weight). Version 11.0 is the first version whose tests were run, in simulation code released with the paper, and then checked by an independent review pass. A lemma shows that in the large-data limit Ψ depends on the state only through its entropy, so Ψ is not an entanglement witness; the entanglement prediction of earlier versions (P2) failed its own stated test and is withdrawn as a negative result. The ignorance-floor validation is restated as a finite-sample law, R₁₂ ≈ 34.3/N for a maximally mixed state under the stated pipeline, with a first-order derivation. The order-asymmetry test (V3) is restated with a predicted sign and slope and the cheapest experiment that resolves it (about 2 × 10⁵ to 3 × 10⁶ detected pairs). The parameter table is regenerated; two earlier values are shown to have been impossible. The convergence factor is shown to count estimator families rather than measure agreement. A speculative appendix on a link to tidal curvature is kept, fenced off from the main claim. The source, the simulation code and all results are included. No laboratory experiment has been run.
- Keywords: convergent recognition theory; quantum state tomography; Uhlmann fidelity; Jensen-Shannon divergence; informativeness gate; finite-sample bias; negative result; reproducible simulation
- License: CC BY 4.0
- Version: 11.0
- Language: English
- Related works: "is supplemented by" https://www.educationrevelation.com/theory ; "is supplemented by" https://github.com/JDOG332/educationrevelation/tree/main/paper/sim
- Additional notes (paste): Versions v1 to v10 exist as drafts (2026); their history is in Appendix B.2 of this version, and v8.7 (February 22, 2026) is hosted at https://www.educationrevelation.com/papers/convergent-recognition-theory-v8.7.pdf with its original bytes archived. The simulation code, its three phases, the lemma sketch and the floor-law derivation were produced by an AI system (Claude, Anthropic) at the author's direction and checked by a second, independent AI pass; see "Acknowledgments and Use of AI" in the paper.
