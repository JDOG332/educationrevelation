# Zenodo deposit: Convergent Recognition Theory v8.7 (and later v11.0)

Zenodo gives a free DOI per version and keeps every version immutable. Jeff signs in (ORCID or GitHub sign-in works); Claude cannot upload for him.

## Step by step (about 10 minutes)
1. Open https://zenodo.org and sign in (Log in with GitHub or ORCID).
2. New upload: https://zenodo.org/uploads/new
3. Files: upload `public/papers/convergent-recognition-theory-v8.7.pdf` from the Mac clone (Projects/Secret Theory of Everything/Site Code/educationrevelation). Its SHA-256 is `506359a86c5b57fc041acf8e0f011a6c882378178e3163cf9364c49e0510e7f4`.
4. Fill the form with the fields below. Resource type: Preprint. Publication date: 2026-02-22 (the date v8.7 was written). Keep "Reserve DOI" on so the DOI is known before publishing.
5. Publish. Publishing is public and permanent for that version (Sharing, so Jeff decides).
6. Paste the DOI (10.5281/zenodo.NNNNNNN) into `lib/content/theory.js` as `doi`, and Claude adds it to the theory page, the citation and the JSON-LD.
7. When v11.0 is final, use "New version" on the same record so both versions share one concept DOI.

## Fields
- Title: Convergent Recognition Theory: A Geometric Coherence Functional for Information Geometry (v8.7)
- Creators: Sellers, Jeffrey M. (Oakwood, Ohio, United States). Add the ORCID iD if there is one.
- Description (paste):
  We present a geometric coherence functional Ψ in [0, 1) for how well two independent reconstructions of the same quantum state agree, and how much that agreement is worth. Ψ = 2^(−S_eff) = R₁₂ × Γ, with R₁₂ the gated Uhlmann fidelity between reconstructions from disjoint data batches (a geometric-mean informativeness gate stops shared ignorance from counting as agreement) and Γ = C_eff × D̂ (redundancy-controlled consensus across reconstruction methods times a bounded coincidence-to-accidental detection weight). The paper gives the definitions and bounds, two operational validations, two falsifiable predictions with failure conditions, a quantum-optics protocol, and a speculative appendix on a link to tidal curvature. Version 8.7, February 2026. No experiment has yet been run.
- Keywords: convergent recognition theory; coherence functional; quantum fidelity; Jensen-Shannon divergence; quantum state tomography; information geometry; recognition
- License: CC BY 4.0 (so it can be cited and quoted freely while staying Jeff's)
- Version: 8.7
- Language: English
- Related works: "is supplemented by" https://www.educationrevelation.com/theory
- Additional notes (paste): Earlier versions v1 to v8.6 exist as drafts (2026, undated); their history is summarized in Appendix B of this version. The hosted copy on educationrevelation.com carries author metadata; the original bytes as written on 2026-02-22 have SHA-256 2c96d1e8c457956d055a421fca06b8ea9e71e34646f8273bed6f3b318ee09984.
