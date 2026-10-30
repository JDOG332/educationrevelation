# Convergent Recognition Theory: Ψ, an operational agreement score for independent quantum-state reconstructions

Jeffrey M. Sellers, Oakwood, Ohio

v11.0, October 30, 2026. Supersedes v10.0 (2026-02-24). Base text: v8.7 (2026-02-22), with the v10.0 hardening folded in and the results of the released simulation code applied (Appendix B.2).

*Cite as:* Sellers, J.M. (2026). Convergent Recognition Theory: Ψ, an operational agreement score for independent quantum-state reconstructions. Version 11.0.

## Conventions

All logarithms are base 2, and all entropies are in bits. We write log for log₂ throughout. The von Neumann entropy is S(ρ) = −Tr(ρ log ρ) in bits. The Shannon entropy [9] is H(P) = −Σ Pᵢ log Pᵢ in bits. The symbol M denotes the set of model frameworks {M₁, …, Mₙ}; the quantum statistical manifold is denoted Q.

*Notation.* The global factor C_eff · D̂ is written **Γ**, so that it cannot be mistaken for Newton's constant. The informativeness gate is G_ε. The redundancy graph of Algorithm 1 is written 𝒢, and the redundancy ratio r_red. The identity operator is 𝟙, so the maximally mixed state in dimension d is 𝟙/d; the letter I is reserved for the informativeness I(ρ). The dual frame of the POVM is Ď_k. The order asymmetry of validation V3 is Δ_Ψ. The single exception to the base-2 convention is the softmax in Section 3.2: it uses exp, so the log-likelihoods LLᵢ in it are in nats. Ψ denotes the functional evaluated on exact (population) quantities, and Ψ̂ its value computed from N counts per batch; every simulated or measured value is a Ψ̂.

## Abstract

We define a functional Ψ ∈ [0, 1) that scores how well two independent tomographic reconstructions of one quantum state agree, and how much that agreement is worth. Ψ is the product of a Disjoint Recognition Core R₁₂ := F_gated, the Uhlmann fidelity between reconstructions from disjoint data batches weighted by a smooth gate on their informativeness, and a Global Reliability Modulator Γ := C_eff · D̂, a convergence factor over several reconstruction methods applied to the pooled data times a bounded detection-quality weight. The product form is a chosen ansatz, not a derivation. For a fixed model set and fixed redundancy partition, Ψ is continuous; globally it is piecewise continuous. We argue (Lemma 4, with a proof sketch) that at large N, Ψ̂ → (n_unique/n_active) · CAR/(1 + CAR) · (1 − S(ρ̃)/log₂ d + ε)/(1 + ε): an entropy score scaled by a model count and a detector figure of merit. Across the test states of Appendix B.1 the fidelity F spans only 0.986 to 0.995 while the gate G_ε spans 0.003 to 0.97, so nearly all variation in Ψ̂ is the entropy gate. Ψ is therefore not an entanglement witness. The paper's tests were run, for the first time, in simulation code released with the paper. As a result, one prediction (P2, state-family sensitivity) is withdrawn as a negative result. One validation (V2) is restated as a finite-sample law, R̂₁₂ = a N⁻¹ (1 + o(1)) for a source with I(ρ) = 0, with a = 34.3 ± 0.1 in simulation against 34.32 from a first-order calculation that is asymptotically exact. The former prediction P3 (order asymmetry under non-commuting measurements) is shown to be a computable consequence of the measurement model and Lemma 4, and is relabelled validation V3; with projective measurements its full test needs about 3 × 10⁶ detected counts. The parameter table is regenerated, two rules of the redundancy algorithm are corrected, and the convergence factor C_eff is shown to count estimator families rather than measure their agreement; this is stated, not repaired. The paper states three validations (V1, V2, V3), one withdrawn prediction (P2), a five-part test battery and a quantum optics protocol, and collects the conditions under which the weak claim would fail. No laboratory experiment has been run. Appendix A presents a separate speculative hypothesis (PA1) linking the spacetime gradient of Ψ to tidal curvature.

## 1. Introduction

When two independent systems reconstruct a shared referent, comparing their outputs can expose errors that neither reveals alone. Here we formalize one operational instance in quantum optics by defining a pipeline-consistency functional Ψ for reconstruction convergence.

*What Ψ measures.* Two pipelines reconstruct one state from disjoint batches of data. Ψ is large when the two reconstructions agree (high fidelity), when the agreement is informative (the reconstructed states are far from maximally mixed, so their agreement is not shared ignorance), and when the detection signal stands well above the accidental background. A third factor, C_eff, was designed to reward convergence of several reconstruction methods on the pooled data. In practice it divides Ψ by the number of active methods that agree (Section 9.2), so Ψ is not monotone in model agreement. At large N, Ψ̂ → (n_unique/n_active) · CAR/(1 + CAR) · (1 − S(ρ̃)/log₂ d + ε)/(1 + ε): an entropy score scaled by a model count and a detector figure of merit (Lemma 4). Across the B.1 test states F spans 0.986 to 0.995 while G_ε spans 0.003 to 0.97, so nearly all variation in Ψ̂ is the entropy gate. Ψ is a score for a state, a reconstruction stack and an apparatus together. It is not a property of the state alone, and it is not a measure of entanglement.

We make two claims. The weak claim (well-defined and implementable): Ψ is an operational score of agreement between independent reconstructions, for a specified experiment and reconstruction stack. It is a well-defined, bounded, measurable functional on the product space (Q × Q) × (model space) × (apparatus space). R₁₂ acts as the disjoint-batch recognition core. Γ serves as a global, pooled-data apparatus factor. The strong hypothesis (speculative, Appendix A): the spacetime variation of Ψ correlates with spacetime curvature. The strong hypothesis does not gate the weak claim.

*Status of the tests.* Earlier versions quoted "preliminary simulations" whose code was not released. For v11 the paper's own tests were implemented and run in simulation code released with the paper (Code and Data Availability), in two phases. First, the state-family prediction P2 fails its own failure condition: Ψ̂ tracks the Werner parameter, but a separable control with the same spectrum gives the same Ψ̂, and Lemma 4 shows why. P2 is withdrawn (Section 8.2). Second, the ignorance floor of V2 is a limit, not a measurement: at N counts per batch the floor is set by sampling, R̂₁₂ = a N⁻¹, and V2 is restated as that law with a derived constant (Section 8.1). Third, the parameter table of Appendix B.1 could not be reproduced and is regenerated. Fourth, the order asymmetry formerly called P3 follows from the measurement model and Lemma 4; it is first order only for a suitable input, and it is now a validation, V3. Fifth, with the paper's weight rule C_eff reduces to a count of estimator families (Section 9.2), and two rules of Algorithm 1 are changed (Section 3.2).

Every definition has been tightened to eliminate dimensional ambiguity, non-differentiability, and unbounded behavior. Version history is provided in Appendix B.

Section 1.1 places the construction among related work and states what it adds. Section 4.1 sketches the large-N limit of Ψ̂. Section 8.3 collects the conditions that would falsify the weak claim. Section 10 sets out its limits, what Ψ is not, and the known objections.

### 1.1 Related Work

The word *recognition* has a long history. CRT does not claim to be the convergence of the traditions named below. It takes a name and an intuition from some of them and its building blocks from others, and it contributes one specific construction.

*Historical ancestor.* The closest ancestor of the name is the Pratyabhijñā ("recognition") school of Kashmir Śaivism. Utpaladeva systematized it in the *Īśvarapratyabhijñā-kārikā* (10th c.), and Abhinavagupta (10th–11th c.) extended it [29]. In this school, liberation is the re-cognition of what one already is. In Western philosophy, Hegel's *Anerkennung* (mutual recognition) [27], reconstructed by Honneth [28], treats recognition as constitutive of selves and of social relations. Whitehead's *prehension* [26] holds that every actual occasion is constituted by how it takes account of others. It is the nearest precedent for treating recognition as a basic relation of nature. These works supply vocabulary and motivation only. Nothing in Sections 2–9 depends on them, and nothing here is a claim about them.

*Physics.* Wheeler's "it from bit" [24] and Rovelli's relational quantum mechanics [25] treat physical properties as informational, or as defined only relative to other systems. If the speculative Appendix A were ever developed, it would belong to the program that treats gravity or spacetime as emergent from thermodynamic, entropic or entanglement structure. That program begins with Bekenstein's black-hole entropy [10] and includes Jacobson's derivation of the Einstein equation as an equation of state [21], Verlinde's entropic account of gravity [22], and Van Raamsdonk's construction of spacetime connectivity from entanglement [23]. Appendix A does not use the machinery of these works and is not offered as a contribution to them. They are named so that the reader can see where such a hypothesis would have to be tested.

*Building blocks.* The formal components are standard: Uhlmann fidelity [1] and Jozsa's axioms for it [2]; the weighted Jensen–Shannon divergence and Lin's bound JSD_w ≤ H(w) [3]; SIC-POVM tomography [40, 5]; linear inversion with PSD projection [33] and RρR maximum likelihood [34, 35]; and the coincidence-to-accidental ratio of SPDC metrology (Section 3.3). Standard background is in [4, 13].

*Everyday forms.* Agreement between independent witnesses about a shared referent is familiar in several settings. It appears as inter-rater reliability (Fleiss' κ [31], Krippendorff's α [30]). It appears as stereopsis, where two views of one scene yield depth [14]. And it appears as the replication norm of science.

*What CRT adds.* CRT's contribution is narrower than any of these: one specific number, Ψ = F_gated · C_eff · D̂, for a specified experiment and reconstruction stack. That number combines three things:

- (i) a fidelity between reconstructions from disjoint data, gated so that shared ignorance does not count as agreement;
- (ii) a consensus factor across estimators with an explicit, bootstrap-calibrated redundancy penalty;
- (iii) a bounded noise weight.

Standard agreement statistics such as κ and α correct for chance agreement. They do not gate shared ignorance, and they do not penalize redundant raters. Whether the combination is more useful than existing figures of merit is an empirical question, and this paper does not settle it (Sections 8.3 and 10).

## 2. The Exponentiated Action (Principled Ansatz)

Ψ is constructed as a log-additive ansatz. The functional decomposes into a Disjoint Recognition Core R₁₂ := F_gated (gated fidelity between independent batch reconstructions) and a Global Reliability Modulator Γ := C_eff · D̂ (model-set factor times signal quality). The multiplicative structure is obtained by exponentiating the sum of three penalties. Define the effective action:

```
S_eff := −log F_gated − log C_eff − log D̂                         (Eq. 1)
```

Each operand is dimensionless and bounded: R₁₂ = F_gated ∈ [0, 1], C_eff ∈ (0, 1], D̂ ∈ [0, 1). Since −log is non-negative on (0, 1], S_eff ≥ 0 whenever all factors are positive.

### 2.1 Axiomatic Design Requirements

The functional form is selected to satisfy the following operational axioms:

1. Boundedness: Ψ ∈ [0, 1).
2. Symmetry: F_gated(ρ₁, ρ₂) = F_gated(ρ₂, ρ₁).
3. Monotonicity: Ψ increases monotonically in F, in each informativeness I(ρᵢ) (through G_ε), and in D̂. It is *not* monotone in model agreement. When two active models come within the tolerance δᵢⱼ of each other they are merged, n_unique falls, and C_eff = C₀ · r_red falls with it (for two models, from C₀ to C₀/2). The literal-reading table of Appendix B.1 shows the effect: the separable test state has Ψ̂ = 0.418 when its two estimators are mostly left unmerged and 0.219 when they are merged.
4. Zero-locus: For the ideal theoretical functional Ψ, the zero-locus is strict when F = 0 (orthogonal supports) or D̂ = 0 (no signal). In the implemented estimator Ψ̂, full-rank regularization, the epistemic gate, and the H_min numerical guard impose strictly positive numerical floors characterized by O(ε, δ_reg, H_min). High-entropy agreement is penalized to the ε floor (~ε/(1+ε)), but not to zero. Model disagreement (C_eff) approaches but never reaches zero under regulated normalization. At finite N the floor reached by Ψ̂ for high-entropy agreement is set by sampling, not by ε, and is many orders of magnitude above ε/(1+ε) (Section 8.1, V2).

The log-additive exponentiated action is a natural, mathematically simple choice satisfying these operational axioms.

*Remark:* Assuming continuity and multiplicativity of independent penalties, Cauchy's functional equation motivates the exponential map. We select this log-additive form over alternatives (e.g., generalized means, t-norms, or min/max hybrids) for its analytical separability and its ability to cleanly isolate the distinct failure modes of fidelity, consensus, and signal strength.

*Domain and Continuous Extension:* S_eff is defined where all three factors are strictly positive (F_gated > 0, C_eff > 0, D̂ > 0). On the zero set of the multiplicative factors (F = 0, or no signal where D̂ = 0), S_eff → +∞, and Ψ is continuously extended to 0: lim Ψ = lim 2^(−S_eff) = 0 as S_eff → ∞. F = 0 occurs only on the boundary of state space (states with orthogonal supports). After full-rank regularization F > 0, so Ψ̂ > 0 whenever D̂ > 0.

For a fixed model set and fixed redundancy partition, Ψ is continuous on the resulting domain. Globally, Ψ is piecewise continuous due to two sources of jump discontinuity: (a) transitions in the active model set n_active (models crossing the weight threshold η), and (b) transitions in the redundancy partition n_unique (clustering threshold crossings). The regulated normalization JSD/(H(w) + H_min) is smooth and introduces no additional jumps. Within each region of parameter space where the discrete partition (the active set A and n_unique) remains constant, Ψ is smooth and continuous.

In finite-sample implementations, the estimated functional Ψ̂ is piecewise continuous globally, due strictly to the discrete selection rules of the active-set thresholding and redundancy graph partitioning. The regulated normalization in Eq. 9 is smooth with respect to its inputs (JSD_w, H(w)), but these discrete rules introduce jump discontinuities. In the population limit with fixed thresholds, Ψ is continuous on each region. F_gated is C^∞ on the full-rank interior. Under v8.7's strict edge test, the limit N → ∞ of Ψ̂ and the value Ψ computed on population quantities need not coincide in the redundancy ratio r_red (Section 9.2). The v11 edge rule (Algorithm 1, step 3) removes that mismatch.

The functional is:

```
Ψ := 2^(−S_eff) = R₁₂ · Γ = F_gated · C_eff · D̂                    (Eq. 2 – Central Result)
```

The product form follows from the additive structure of the action via the exponential map (base 2, matching our bit convention). This mirrors the common technique of converting additive information-theoretic penalties into multiplicative weights via exponentiation.

*Status of the product form.* The product form is a chosen ansatz, not a derivation. Eq. 1 defines S_eff as a sum of negative logarithms, so 2^(−S_eff) = F_gated · C_eff · D̂ is an identity. The action organizes the three penalties but adds no content beyond the choice of the product itself. Nothing is varied or extremized, and no dynamics follow from S_eff. The word *action* is used by analogy only.

Global bound: F_gated ∈ [0, 1], C_eff ∈ (0, 1], D̂ ∈ [0, 1). Therefore Ψ lies in [0, 1), and Ψ = 0 when any factor vanishes. Ψ → 1 only if I(ρ₁), I(ρ₂) → 1, F → 1, C_eff → 1 and D̂ → 1 together (Lemma 3). In all physical experiments, Ψ < 1.

## 3. Formal Definitions

### 3.1 Recognition Term: Gated Quantum Fidelity F_gated

Let ρ₁, ρ₂ be density operators in a d-dimensional Hilbert space, reconstructed via state tomography. Define [1, 4]:

```
F(ρ₁, ρ₂) := ( Tr √( √ρ₁ ρ₂ √ρ₁ ) )²            [Uhlmann fidelity]           (Eq. 3)

I(ρ) := 1 − S(ρ) / log(d)                         [Informativeness, S in bits] (Eq. 4)
```

Here d is the fixed Hilbert space dimension of the reconstruction model, set a priori by the physical measurement setup (e.g., d = 4 for a two-qubit bipartite system, d = d_A · d_B for general bipartite states). It is not a free parameter.

```
G_ε(ρ₁, ρ₂) := √( (I(ρ₁) + ε)(I(ρ₂) + ε) ) / (1 + ε)   [Normalized smooth gate]  (Eq. 5)

F_gated := F(ρ₁, ρ₂) · G_ε(ρ₁, ρ₂)                                              (Eq. 6)
```

Here ε > 0 is a fixed regularization constant (ε = 10⁻⁸ in numerical implementations). The division by (1 + ε) ensures G_ε ≤ 1 exactly, preventing F_gated from exceeding 1. The geometric mean replaces the min() gate from v5, ensures G_ε is C^∞ on the interior of state space, and makes Ψ differentiable there.

*Bounds:* F ∈ [0, 1] (standard). I(ρ) ∈ [0, 1], since 0 ≤ S(ρ) ≤ log(d). The numerator of G_ε ranges from ε (both I = 0) to 1 + ε (both I = 1). After dividing by (1 + ε), G_ε lies in [ε/(1+ε), 1], which is a subset of (0, 1]. Therefore F_gated lies in [0, 1] exactly. The gate keeps the informativeness weight G_ε bounded in [ε/(1+ε), 1], so that shared ignorance cannot cause numerical instability, while F_gated still tracks vanishing fidelity correctly.

The informativeness gate intentionally enforces a positive epistemic floor (~ε). The use of von Neumann entropy to gate shared ignorance is a deliberate epistemic weighting design choice, not an operationally derived theorem. It intentionally penalizes high-entropy agreement to enforce a strict definition of informative recognition. Maximal agreement between maximally mixed states represents a lack of usable information, and is thus treated as operationally uninformative rather than as ideal convergence. In the theoretical limit where the purity of both reconstructed states approaches its maximum (I → 1), the gate G_ε → 1 and F_gated → F. The numeric floor ε/(1+ε) vanishes strictly in the limit ε → 0.

*Full-rank regularization:* Reconstruction algorithms (particularly MLE) may produce rank-deficient density matrices with zero eigenvalues. Entropy is formally defined on the boundary by convention, but numerical stability and gradient differentiability degrade at rank-deficient points. To keep all estimators strictly on the interior of the state space, all reconstructed density matrices undergo a full-rank regularization step before entering the functional: ρ̃ = (1 − δ_reg) ρ + δ_reg 𝟙/d, where δ_reg = 10⁻⁶. This guarantees that all eigenvalues are strictly positive. The perturbation of the informativeness gate is bounded by a continuous function f(δ_reg, d) given by the Audenaert–Fannes inequality [19]. F and D̂ are continuous under trace distance; C_eff is only piecewise continuous (Section 2); we do not assert a global Lipschitz bound for the product. The regenerated sensitivity table (Appendix B.1) narrows the stability claim. The shift in I(ρ̃) is linear in δ_reg with a coefficient of order 1 for full-rank states, and of order δ_reg log(1/δ_reg) for rank-deficient ones, so a sweep of δ_reg up to 10⁻⁴ moves Ψ̂ by more than 10⁻⁵ for most test states (up to 7 × 10⁻⁴ for the Bell state). The claim is therefore made only at δ_reg = 10⁻⁶ itself: there, computed exactly from the spectra of the five B.1 states, regularization changes the upper bound G_ε · D̂ by at most 8.3 × 10⁻⁶ (Bell state: ΔI = 8.8 × 10⁻⁶ times D̂ = 0.95) relative to δ_reg = 0, below 10⁻⁵ for every state. The value of δ_reg is part of the definition of Ψ̂ and must be reported with it.

*Regularization offsets.* The offsets are deterministic and are stated here in place of a blanket bound. Near 𝟙/d, ρ̃ − 𝟙/d = (1 − δ_reg)(ρ̂ − 𝟙/d), and to leading order I is quadratic in that difference, so I(ρ̃) = (1 − δ_reg)² I(ρ̂): a relative change of −2δ_reg (simulated: −2.008 × 10⁻⁴ ± 0.013 × 10⁻⁴, mean ± SD over 100 runs, at δ_reg = 10⁻⁴, N = 10⁴, linear inversion). For a pure reconstruction, 1 − I(ρ̃) = S(ρ̃)/2 (d = 4), which is 8.77 × 10⁻⁶ at δ_reg = 10⁻⁶ and 6.27 × 10⁻⁴ at δ_reg = 10⁻⁴. The bound |ΔΨ̂| < 10⁻⁵ holds only for δ_reg ≤ 10⁻⁶.

### 3.2 Convergence Coefficient: C_eff

Let M = {M₁, …, Mₙ} be n model frameworks, i.e., the set of tomographic reconstruction estimators (e.g., MLE, Bayesian MAP, compressed sensing, linear inversion). Each model Mᵢ is applied to the same tomographic dataset using a fixed informationally complete POVM, producing a predicted measurement-outcome distribution Pᵢ over the POVM outcome space. JSD is defined on these classical distributions.

Let w_raw = (w_raw,1, …, w_raw,n) be the initial normalized model weights (summing to 1 over all n models). The raw weights are defined via a softmax mapping over the cross-validated log-likelihoods: w_raw,i = exp(LLᵢ / τ) / Σⱼ exp(LLⱼ / τ), where the temperature parameter τ = 1 is fixed by convention. LLᵢ is the held-out log-likelihood of model i in nats, summed over K = 5 folds: each detected event is assigned to a fold at random (with the published seed), model i is fitted on four folds, and the held-out counts of the fifth are scored, for each fold in turn.

*Note on information-criterion weights (from v10.0).* v10.0 replaced the log-likelihoods in this softmax with AIC-corrected scores: w_raw,i ∝ exp(−AICᵢ/2τ), with AICᵢ = −2 LLᵢ + 2kᵢ and kᵢ the number of free parameters of model i. This equals exp((LLᵢ − kᵢ)/τ). When all models have the same parameter count, kᵢ is common to all of them and cancels in the normalization, so the two rules give identical weights for the same LLᵢ. Every estimator in the protocol reconstructs a full density matrix on the same d-dimensional space (d² − 1 = 15 real parameters for d = 4), so the two coincide here. v11 keeps v8.7's rule as the definition and records the AIC form as equivalent in the equal-parameter case. The two are not equivalent for a model set with unequal parameter counts, and such a set would need its weight rule stated explicitly. v10.0 also mentions BIC; with equal kᵢ and a common N, the BIC penalty kᵢ ln N cancels in the same way.

Define the active set A = { i : w_raw,i ≥ η }, where η = 10⁻⁶ is the active weight threshold (default), and n_active = |A|. Define renormalized active weights wᵢ := w_raw,i / (Σ_{j∈A} w_raw,j), so that the active weights form a valid probability vector (summing to 1). All subsequent information-theoretic quantities (P_mix, JSD_w, H(w)) are computed using w_active = (wᵢ)_{i∈A}. Transitions in the active set (models crossing the η threshold) contribute to the piecewise continuity of Ψ alongside n_unique transitions.

*Invariance note:* Only JSD_norm is invariant under the addition of zero-weight models. The full coefficient C_eff is intentionally not invariant, as the ratio r_red = n_unique/n_active penalizes redundancy and depends on η-thresholding.

*Note on the softmax at large N (one-hot weights).* Because the softmax uses exp, the LLᵢ enter in nats. At the sample sizes of the protocol (N ≈ 10⁴ counts), the cross-validated log-likelihoods of competing estimators can differ by tens of nats. With two models, w_LI = 1/(1 + e^gap), where gap is the difference of the cross-validated log-likelihoods. The weights are one-hot when |gap| > ln((1 − η)/η) = 13.8 nats: the trailing model falls below η = 10⁻⁶ and is dropped. They lie in [0.03, 0.97] only when |gap| < 3.5 nats. Intermediate weights occur for rank-deficient states: for the rank-2 separable test state the gap is −0.2 ± 0.3 nats (mean ± SD over 100 runs) and w_LI ≈ 0.55; for locally rotated Bell states w_LI is 0.17 to 0.61 (Section 4.1). When the estimators coincide exactly (full-rank states, Section 4.1) the weights are exactly equal. If only one model remains, then n_active = 1, C₀ = 1 and r_red = 1 by convention, and C_eff = 1 is inert. Close to one-hot weights, JSD_w/(H(w) + H_min) is a ratio of two small quantities and is poorly conditioned. The mandated diagnostics (Section 9.2) detect this case directly, and any report in which n_active = 1 must state that the convergence factor did not participate in that value of Ψ̂. In the released simulation this case occurs for the Bell state in every run: linear inversion trails MLE by a median of 62.4 nats (mean 62.4 ± 15.4, 5th to 95th percentile 38 to 89, range 34 to 114, over 200 runs at N = 10⁴), so w_LI is at most 2 × 10⁻¹⁵. Stated plainly: with τ = 1 on summed log-likelihoods at N = 10⁴, C₀ does not differ measurably from 1 in any simulated run, and C_eff reduces to r_red = n_unique/n_active. v11 does not change τ; showing a regime in which C_eff varies smoothly and informatively is Open Question 7.

Define:

```
P_mix := Σᵢ wᵢ Pᵢ                                                    (Eq. 7)

JSD_w := H(P_mix) − Σᵢ wᵢ H(Pᵢ)          [in bits]                     (Eq. 8)
```

*Notation:* We use Pᵢ(k) = Tr(E_k ρᵢ) as the predicted outcome distribution. In Algorithm 1 it is denoted P_rec,i for clarity; Pᵢ and P_rec,i are the same mathematical object.

For n distributions with weights w, the upper bound of JSD_w is H(w), the Shannon entropy of the weight vector. The bound JSD_w ≤ H(w) follows from the concavity of Shannon entropy and Jensen's inequality applied to the weighted mixture (see Lin 1991 [3] for the exact weighted multi-distribution proof). To keep the normalization numerically stable as H(w) → 0, we use the regulated normalization:

```
JSD_norm := JSD_w / (H(w) + H_min)        [in [0, 1)]                  (Eq. 9)
```

Here H_min = 10⁻⁶ is the numerical floor. When H(w) = 0 (single nonzero weight), JSD_w = 0 and JSD_norm = 0. For n = 1, we define JSD_norm = 0 and C₀ = 1 by convention (single-framework limit). Normalizing by H(w) + H_min rather than log₂(n) ensures invariance under the addition of irrelevant (zero-weight) models, prevents division-by-zero artifacts, and introduces no additional jump discontinuity. The regulator is smooth in its arguments (JSD_w, H(w)), but the mapping from raw weights to these quantities remains piecewise because of active-set thresholding. Define raw convergence:

```
C₀ := 1 − JSD_norm                        [in (0, 1]]                  (Eq. 10)
```

To prevent redundant models from inflating convergence, we introduce an explicit redundancy equivalence class via a bootstrap-calibrated procedure:

**Algorithm 1: Bootstrap-Calibrated Redundancy Clustering**

In this algorithm, JSD(P, Q) is the equal-weight two-distribution Jensen–Shannon divergence in bits.

1. Fix B = 1000 bootstrap iterations. Each predicted outcome distribution is defined as P_rec,i(k) = Tr(E_k ρᵢ) under the fixed IC-POVM {E_k}. For each estimator family i and each iteration b:
   - draw two independent bootstrap resamples of the coincidence data (multinomial resamples of the pooled counts; the protocol has a single measurement setting);
   - reconstruct each resample with family i, from an independent random starting point where the solver takes one;
   - compute JSD(P_rec,1, P_rec,2) between the two reconstructions.

   *Why two resamples.* v8.7 read: resample once, then run "two independent tomographic reconstructions with different starting seeds". That reading measures only estimator-internal variability. For convex solvers it is at round-off (about 10⁻¹⁷ bits for converged MLE; exactly 0 for linear inversion, which has no starting point). δᵢ is then set by round-off, the edge test of step 3 compares one round-off number with another, n_unique changes at random from run to run, and Ψ̂ jumps by a factor of 2 (Appendix B.1, literal-reading table). That reading also contradicts step 2, which says δᵢ captures sampling variability. The two-resample reading is the one step 2 describes, and v11 adopts it. For convex solvers (e.g., projected-gradient MLE), the internal variability from random starts serves as a diagnostic check and should be negligible.
2. Set δᵢ = 95th percentile of the B pairwise JSD values for estimator family i. The thresholds δᵢ are finite-sample estimators of the true population 95th percentile under the measurement model, derived via the B = 1000 bootstrap. This is the statistical floor below which two outputs are indistinguishable from finite-sample noise. The tolerance δᵢ captures the combined spread from sampling variability and estimator stochasticity for family i.

   Model weights w_raw are computed once from the full original dataset (via the softmax mapping over cross-validated log-likelihoods). The bootstrap iterations are used strictly to estimate the family-specific thresholds δᵢ. The cross-validation splits used for the weights, and the B = 1000 bootstrap resampling, both use a fixed, published RNG seed. This makes the model weights w_raw, the δᵢ thresholds and n_unique deterministically reproducible.
3. Construct a redundancy graph 𝒢 over the active models (i ∈ A). An edge exists between Mᵢ and Mⱼ if JSD(Pᵢ, Pⱼ) ≤ δᵢⱼ, where δᵢⱼ = min(δᵢ, δⱼ). The redundancy classes are the connected components of this graph, intentionally allowing transitive closure to define broad equivalence classes. n_unique := the number of connected components. This definition is uniquely determined and deterministic, and is computable in O(n_active²) time.

   *Computational scope:* The O(n_active²) distance-matrix computation is polynomial. The bootstrap (B = 1000) adds a large constant factor. We explicitly target small model ensembles (n_active < 10), typical in lab tomography, where this runtime is trivial.

   *Why min and ≤ (a change from v8.7, which used JSD < max(δᵢ, δⱼ)).* With max, the least stable model sets the tolerance for every pair it belongs to. In the Phase 2 simulation a misspecified rank-1 model had δ = 0.126 bits for 𝟙/4, about 330 times the others (3.8 × 10⁻⁴ bits). Under per-count weights (τ = N) it absorbed the well-behaved models through the max rule, and for the dephased Bell state it was counted as a separate witness in 2 of 20 runs. With min, a pair is merged only if it is indistinguishable at the tolerance of its more stable member. With the strict test, two estimators that agree exactly are merged at every finite N but not at N = ∞, where their JSD and both δᵢ are 0; r_red then jumps from 1/2 to 1 at N = ∞ (Section 9.2). The non-strict test removes that jump. The released numbers were produced under v8.7's rule read as stated (strict test, max); the v11 rule is a change that the next code release will implement. For every two-model run reported in Section 8 and Appendix B the two rules give the same edges: wherever both models are active, their JSD (at most about 10⁻⁶ bits, usually about 10⁻¹⁷) lies far below both δᵢ (3.4 × 10⁻⁴ to 4.3 × 10⁻⁴ bits for those states), and for the Bell state only one model is active. The three- and four-model map of Section 9.2 was run under v8.7's rule only.

   *Fast screen: χ²/G-test edge criterion (from v10.0).* v10.0 calibrates the edges of 𝒢 with a fixed statistical threshold instead of the bootstrap. An edge joins Mᵢ and Mⱼ when 2N · JSD(Pᵢ, Pⱼ) < χ²₀.₉₅(df), with df = (number of POVM outcomes) − 1. For the 16-outcome product SIC-POVM, df = 15 and χ²₀.₉₅(15) ≈ 25.0. Here N is the number of counts in the dataset to which the models were fitted, and JSD is taken in nats for this comparison (nats = bits × ln 2). The screen costs one JSD evaluation per pair of models, against B = 1000 pairs of reconstructions per estimator family for the bootstrap.

   v11 keeps the bootstrap calibration of steps 1 and 2 as the default, and n_unique is defined by it. The G-test criterion is a fast screen, for exploratory runs or as a check on the bootstrap result. The two calibrations differ only in which edges 𝒢 contains. Both then take n_unique as the number of connected components of 𝒢. Because the two can give different n_unique for the same data, a report that uses the screen must say so.

   Two cautions apply to the screen. First, Pᵢ and Pⱼ are both fitted to the same dataset, so 2N · JSD does not follow a χ²(df) distribution under any null hypothesis stated here. The quantile serves as a conventional threshold, not as an exact test level. Second, for nearby distributions JSD(P, Q) ≈ KL(P‖Q)/4, so 2N · JSD is about one quarter of the goodness-of-fit statistic 2N · KL(P‖Q). The screen therefore merges models more readily than a G-test at the same nominal level would.
4. Define the redundancy ratio:

```
r_red := n_unique / n_active              [in [1/n_active, 1]]          (Eq. 11)
```

The effective convergence is:

```
C_eff := C₀ · r_red                       [in (0, 1]]                  (Eq. 12)
```

C_eff is intentionally not invariant under model-set augmentation. Through n_unique/n_active it carries an explicit redundancy penalty (a duplicate suppression factor). Adding a duplicate or near-duplicate estimator decreases C_eff when the duplicate falls within the bootstrap-calibrated equivalence tolerance and the existing models already nearly agree (Lemma 2).

> **Lemma 1 (Bounds on C_eff).** Since JSD_w ≤ H(w) (Lin 1991 [3]), JSD_norm = JSD_w/(H(w) + H_min) ∈ [0, 1) for all w, hence C₀ = 1 − JSD_norm ∈ (0, 1]. Since 1 ≤ n_unique ≤ n_active, the ratio r_red = n_unique/n_active lies in [1/n_active, 1]. Therefore C_eff = C₀ · r_red lies in (0, 1]. Because of the regulated normalization, C_eff does not reach 0. At maximal disagreement (JSD_w → H(w)), it approaches the positive numerical floor C_eff → (H_min / (H(w) + H_min)) · r_red. QED.

Because of the regulated normalization, exact zero convergence is mathematically prohibited. Conceptually, even maximal disagreement among bounded models yields a strictly positive, albeit negligible, epistemic weight. This is a feature, not a bug: the functional distinguishes "total disagreement" from "no data", and the latter is captured by D̂ = 0.

> **Lemma 2 (Redundancy monotonicity, near-agreement case).** Assume the added model's output lies within δ of an existing active model, so that it is merged with it, and assume C₀ does not increase by more than the factor (n_active + 1)/n_active when it is added. The second condition holds when all active models already nearly agree (JSD_w ≈ 0, so C₀ ≈ 1 before and after). Then n_unique remains constant while n_active increases by 1, and C_eff = C₀ · r_red strictly decreases. QED.

*The extra hypothesis is needed.* Take two active models with P_A = (0.97, 0.01, 0.01, 0.01) and P_B its reverse, with equal weights: C₀ = C_eff = 0.101. Adding an exact duplicate of A (merged with A) changes the weights to (1/3, 1/3, 1/3), raises C₀ to 0.481, and raises C_eff to 0.321. Without the hypothesis, adding a redundant model can raise C_eff.

### 3.3 Detection Quality Weight: Bounded Sigmoidal Map D̂(e)

Let D(e) be the experimentally measured operational signal density (e.g., coincidence counts per time window), and let D_ref be the empirical reference density (the detector noise floor, e.g., the accidental coincidence rate). Define:

```
D̂(e) := D(e) / ( D(e) + D_ref )                                       (Eq. 13)
```

*Properties:* D̂ is bounded in [0, 1). D̂ = 0 when D(e) = 0 (no signal). D̂ → 1 as D(e) → ∞ (saturating). D̂ = 0.5 when D(e) = D_ref (signal equals noise). D̂ is C^∞ for D(e) ≥ 0 and D_ref > 0, monotonically increasing in D(e), and dimensionless (a ratio of densities). The action term −log(D̂) is defined only for D > 0, with a continuous extension to Ψ = 0 as D → 0.

*Geometric interpretation:* −log D̂ = −log(D/(D + D_ref)) = log(1 + D_ref/D), which is the penalty incurred by the noise floor relative to signal. This maps to the third term of the effective action.

*Operational surrogate:* D̂ is an operational signal-to-noise weight. Under a fixed measurement alphabet and time window, the count rate serves as an operational surrogate for detection quality (see Section 9.2). This is an operational penalty term. It is not derived from an optimal coding theorem unless a specific detection-likelihood model is provided. Ψ is a flux-sensitive functional: D̂ varies with the photon detection rate and directly modulates the global output.

*Relation to a standard quantity.* With the choices of Section 9.2 (D = coincidence rate, D_ref = accidental rate), D̂ = CAR/(1 + CAR), where CAR is the coincidence-to-accidental ratio already standard in the characterization of SPDC sources. D̂ is therefore a known figure of merit placed on a bounded scale, not a new one. Through D̂, Ψ describes the state together with the apparatus, not the state alone (Section 10.5).

### 3.4 Parameter Sensitivity

The parameters ε (informativeness gate) and δ_reg (full-rank regularization) are numerical stabilizers whose sole function is to enforce the C^∞ interior of the state space. In the released simulation (Appendix B.1), a sweep of ε from 10⁻¹⁰ to 10⁻⁶ changes Ψ̂ by less than 10⁻⁶ for every test state. A sweep of δ_reg from 10⁻⁸ to 10⁻⁴ does not leave Ψ̂ unchanged at the 10⁻⁵ level: the effect is first order in δ_reg (Section 3.1). ε may be treated as negligible; δ_reg is a fixed part of the definition and is reported with every value of Ψ̂.

> **Lemma 3 (Global bounds on Ψ).** F_gated ∈ [0, 1], C_eff ∈ (0, 1], D̂ ∈ [0, 1). Therefore Ψ = F_gated · C_eff · D̂ lies in [0, 1), and Ψ = 0 when any factor vanishes. Ψ → 1 only if I(ρ₁), I(ρ₂) → 1, F → 1, C_eff → 1 and D̂ → 1. With n_active ≥ 2, C_eff close to 1 requires the active models to be unmerged (r_red = 1) and yet to agree closely (C₀ close to 1); under Algorithm 1 unmerged models differ by more than δᵢⱼ. Whenever all active models are merged, C_eff ≤ 1/n_active and Ψ ≤ D̂/n_active. In all physical experiments, Ψ < 1. QED.

## 4. Theoretical Justifications

The log-additive ansatz treats each component as an independent penalty that isolates a distinct failure mode. Each component is chosen for specific mathematical and operational reasons:

- **Uhlmann Fidelity (F):** Chosen for its direct relationship to the Bures metric on the quantum statistical manifold, and for its operational interpretation as the maximum overlap between purifications. This gives it a natural role in quantifying statistical indistinguishability between reconstructed states.
- **Von Neumann Informativeness (I):** Chosen because, under standard axioms, the von Neumann entropy is a canonically characterized additive measure of information uncertainty on quantum states (Shannon–Khinchin axioms generalized to the quantum case; see Wehrl 1978 [17], up to a multiplicative constant). The informativeness I = 1 − S/log(d) maps maximal entropy linearly to zero informativeness.
- **Jensen–Shannon Divergence (JSD):** For n = 2 distributions, √JSD is a metric (Endres & Schindelin 2003 [18]). We use the weighted multi-distribution generalization for model ensembles. JSD provides a bounded, symmetric divergence that generalizes naturally to weighted model ensembles.
- **Detection Quality Weight (D̂):** Chosen as the simplest dimensionless saturating map for signal-to-noise weighting. The form D/(D + D_ref) is a canonical dimensionless ratio: monotone, bounded in [0, 1), and equal to 0.5 at the noise floor.

### 4.1 Entropy Dependence in the Large-N Limit

Let Ψ̂_N be Ψ computed from two disjoint batches of N counts each, drawn from a source in state ρ, with a fixed IC-POVM, fixed estimators, fixed ε, δ_reg, η, H_min, and a fixed detection weight D̂ = CAR/(1 + CAR). Write ρ̃ = (1 − δ_reg) ρ + δ_reg 𝟙/d.

> **Lemma 4 (Entropy dependence in the large-N limit).** Assume:
> (a) both pipeline estimators ρ̂₁, ρ̂₂ and every model estimator of C_eff are consistent: each converges in probability to ρ (in trace norm) as N → ∞;
> (b) the discrete part of C_eff, the pair (n_active, n_unique), converges in probability to constants (n_A, n_U) that do not depend on ρ within the class of states considered.
> Then, in probability, F(ρ̂₁, ρ̂₂) → 1, I(ρ̂̃ᵢ) → I(ρ̃) (with ρ̂̃ᵢ the regularized estimate), C₀ → 1, r_red → r_∞ := n_U/n_A, and
>
> lim_{N→∞} Ψ̂_N = r_∞ · CAR/(1 + CAR) · (1 − S(ρ̃)/log₂ d + ε)/(1 + ε).
>
> The limit depends on ρ only through S(ρ̃), which is a function of the spectrum of ρ: the eigenvalues of ρ̃ are (1 − δ_reg) λᵢ + δ_reg/d. It also depends on D̂, on the model set and on the redundancy rule. Hypothesis (b) is an assumption that the discrete part is state-independent; it is not derived.

*Proof sketch.* (i) Regularization is continuous, so the regularized estimates ρ̂̃ᵢ → ρ̃. The Uhlmann fidelity is continuous in trace norm (Fuchs–van de Graaf [36]), so F(ρ̂̃₁, ρ̂̃₂) → F(ρ̃, ρ̃) = 1. (ii) The von Neumann entropy is continuous on a finite-dimensional state space (Fannes–Audenaert [19]), so I(ρ̂̃ᵢ) → I(ρ̃), and G_ε → (I(ρ̃) + ε)/(1 + ε). (iii) Each model's prediction Pᵢ(k) = Tr(E_k ρ̂̃ᵢ) is linear in the estimate, so every Pᵢ converges to the same distribution Tr(E_k ρ̃). JSD_w is continuous and vanishes when all Pᵢ coincide, uniformly in the weights; its denominator H(w) + H_min is at least H_min > 0. So JSD_norm → 0 and C₀ → 1. (iv) r_red → r_∞ by (b). (v) D̂ is computed from count rates and does not depend on ρ. The continuous mapping theorem gives the limit. QED.

*When hypothesis (b) holds.* For the estimator pair used in the released simulation (linear inversion with PSD projection [33], and RρR maximum likelihood [34, 35]) and full-rank ρ, it holds with n_A = 2 and n_U = 1. The product SIC-POVM is minimal (16 outcomes for d² = 16 real parameters), so whenever the linear-inversion estimate is positive it reproduces the observed frequencies and equals the MLE exactly. For full-rank ρ this happens with probability tending to 1. The cross-validated log-likelihoods are then equal, the weights are (1/2, 1/2), both models are active, and their JSD (round-off) lies below δᵢ > 0, so they are merged: r_red = 1/2. Under the v11 edge rule this is also the value of r_red computed at N = ∞. On the boundary of state space (rank-deficient ρ), (b) can fail.

*Pure states at finite N are not invariant under local unitaries.* The Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2, written in the σ_z basis in which the qubit SIC has the Bloch vectors (1, 1, 1)/√3, (1, −1, −1)/√3, (−1, 1, −1)/√3, (−1, −1, 1)/√3 on each qubit, is aligned with the product SIC so that four of the sixteen outcomes have probability zero. The MLE then beats linear inversion by tens of nats (median gap 62 nats, range 32 to 84, at N = 10⁴), n_active = 1 in 20 of 20 runs, and Ψ̂ = 0.9160 ± 0.0073. Five Haar-random local rotations (U_A ⊗ U_B)|Φ⁺⟩ give n_active = 2 and n_unique = 1 in every run, w_LI between 0.17 and 0.61, and Ψ̂ = 0.438 to 0.450 at N = 10⁴ (0.462 to 0.465 at N = 10⁵); 20 seeds per row. The product state |00⟩, with the same spectrum, gives Ψ̂ = 0.451 (N = 10⁴) and 0.466 (N = 10⁵) aligned; one of its rotations sits near the one-hot threshold and flips n_active from run to run (SD of Ψ̂ up to 0.24). At N = 10⁴, therefore, Ψ̂ for a pure state depends on how the state sits relative to the POVM and is not invariant under local unitaries. The value Ψ̂ ≈ 0.92 for the aligned Bell state is a SIC-alignment artifact; any generic local rotation gives Ψ̂ ≈ 0.45, a factor of about 2 that comes from the redundancy ratio alone.

> **Corollary (Ψ is not an entanglement witness).** Let ρ_W(p) = p |Φ⁺⟩⟨Φ⁺| + (1 − p) 𝟙/4 be the Werner state [15], with spectrum ((1 + 3p)/4, (1 − p)/4, (1 − p)/4, (1 − p)/4), entangled for p > 1/3. Let σ(p) be the state with the same eigenvalues placed on the computational product basis {|00⟩, |01⟩, |10⟩, |11⟩}. σ(p) is a convex mixture of product states, hence separable for every p, and it has the same purity and entropy as ρ_W(p). For 0 ≤ p < 1 both states are full rank, so under (a) and (b) they have the same limiting Ψ̂. More generally, any two states with equal S(ρ̃) have the same limit under (b), and global unitaries create and destroy entanglement without changing S. No threshold on lim Ψ̂ separates entangled from separable states. Ψ is therefore not an entanglement witness.

At finite N, Ψ̂ for ρ_W(p) and σ(p) can differ, because the sampling noise of tomography depends on how the eigenbasis of the state sits relative to the POVM. Lemma 4 says these differences vanish as N → ∞; it does not bound their size at a given N. The withdrawn prediction P2 (Section 8.2) is a finite-N test of the corollary, and its result agrees with it.

*Finite-N check.* The released code (Phase 2) tests the corollary on 12 matched-spectrum pairs: the Werner state at p = 0.3, 0.6 and 0.9 against σ(p) and against three Haar-random local rotations (U_A ⊗ U_B) σ(p) (U_A ⊗ U_B)†, all PPT [38, 39], with 30 seeds per state and N = 10³, 10⁴, 10⁵ and 10⁶ counts per batch. Four of the 12 pairs (those at p = 0.3, where the Werner state is separable) compare two separable states. The Werner runs at each p are shared across its four pairs, so the 12 comparisons are not independent and the null expectation below is approximate. The exact (infinite-N) values of Ψ agree within each pair to 7 × 10⁻¹⁶. At finite N the largest difference of mean Ψ̂ over the 12 pairs is 0.0130, 0.0040, 8.2 × 10⁻⁴ and 2.9 × 10⁻⁴ at the four values of N. It falls as N^(−0.56), while the single-run SD falls as N^(−0.50). The largest |t| over the 12 pairs is 2.05 to 2.52, against about 2.23 (√(2 ln 12)) expected for 12 independent pairs with no real difference. No pair differs in Ψ̂ at p < 0.01 at any N. One quantity does see more than the spectrum: the likelihood weight of linear inversion, w_LI, differs between the members of 8 to 10 of the 12 pairs at p < 0.01 for N ≥ 10⁴, by at most 9.8 × 10⁻³ at N = 10⁴. It is inert in Ψ̂, because C₀ ≈ 1 and the partition (n_active, n_unique) never differed between the members of a pair; the largest difference in C_eff was 4.2 × 10⁻⁵.

## 5. Consistency Checklist

| Property | F_gated | C_eff | D̂ | Ψ |
|---|---|---|---|---|
| Bounds | [0, 1] | (0, 1] | [0, 1) | [0, 1) |
| Dimensionless | Yes | Yes | Yes | Yes |
| Smooth (C^∞) | Yes (ε-reg, normalized) | Depends on model class & weight rule | Yes (D_ref > 0) | Yes on open interior |
| Log base | n/a | base-2 (bits), JSD/(H(w) + H_min) | n/a | base-2 action |
| Defined on | Density ops | Classical Pᵢ | Real D ≥ 0 | Product |
| Measurable | Tomography | POVM + models | Count rates | Product |

## 6. Information Geometry

The quantum statistical manifold Q of density operators, equipped with the Bures metric, is a Riemannian manifold with computable curvature (Braunstein & Caves 1994 [6], Petz 1996 [7]; for the classical theory, Amari & Nagaoka [8]). Formally, Ψ lives on a product space: (Q × Q) × (model space) × (apparatus space). The Recognition Term F_gated is a smooth, symmetric two-point function on Q × Q. It becomes a scalar field only after a fixed reference state ρ* is selected, yielding F_gated(ρ, ρ*). The Convergence Coefficient C_eff depends on the discrete model set M and the weight rule, and the Detection Quality Weight D̂ depends on the apparatus parameters. The effective action S_eff thus defines a function on the full product space. A speculative hypothesis connecting the spatial variation of F_gated to spacetime curvature is presented separately in Appendix A.

We define a reconstruction divergence penalty (a monotone transform of gated fidelity used for penalty weighting, not a formal metric):

```
d²_rec := −log F_gated                                                 (Eq. 14)
```

This is non-negative (since F_gated ∈ (0, 1]) and vanishes when F_gated = 1. It is monotonically related to fidelity but is explicitly not the Bures distance, and it does not satisfy the triangle inequality.

### 6.1 Structural Analogies

For n = 1 (C_eff = 1), Ψ reduces to a noise-gated, signal-weighted fidelity measure. This resembles the fidelity-based figures of merit used in quantum error correction, but it is not claimed to coincide with any one of them. Earlier versions also drew analogies with Bayesian model averaging and with stereopsis. They motivated the construction but carry no claim and are not used here.

## 7. Symmetry and the Commutator Constraint

F_gated is symmetric, F(ρ₁, ρ₂) = F(ρ₂, ρ₁), and G_ε is symmetric. Therefore Ψ is symmetric under exchange of observers when the underlying states are independent of measurement order.

```
[O₁, O₂] = 0  ⇒  Ψ(1,2) = Ψ(2,1)                                       (Eq. 15)
```

When [O₁, O₂] ≠ 0, the framework produces ordered values. Explicitly, let Ψ₁₂ be the functional evaluated when both data-independent reconstruction pipelines reconstruct the post-measurement state ρ₁₂ (resulting from O₁ then O₂), and let Ψ₂₁ be the functional evaluated when both reconstruct ρ₂₁ (from O₂ then O₁). The measurement-induced asymmetry is evaluated strictly as |Ψ₁₂ − Ψ₂₁|. Under specified measurement models, it is predicted to be bounded by a function of the commutator operator norm ||[O₁, O₂]||∞. This scaling is theoretically motivated by standard quantum error-disturbance relations (e.g., Ozawa's bound, Ozawa 2003 [16]), which relate measurement-induced disturbance to the commutator.

By Lemma 4, in the large-N limit the asymmetry reduces to r_∞ · D̂ · |I(ρ̃₁₂) − I(ρ̃₂₁)|/(1 + ε): a difference in the entropies of the two post-measurement states, computable from the Lüders rule. It is therefore not a function of ||[O₁, O₂]||∞ alone: it vanishes whenever ρ₁₂ and ρ₂₁ have the same spectrum, as they do for a Bell input at any commutator, and its order in the commutator depends on the input (Section 8.1, V3).

## 8. Operational Validations and the Withdrawn Prediction

*Labels.* The prediction labelled P1 in earlier versions was reclassified as validation V2 in v8.5. P2 is withdrawn in v11 and is kept in Section 8.2 as the record of a negative result. The former prediction P3 is a computable consequence of the measurement model and Lemma 4 and is relabelled validation V3 in v11. V2 is restated as a finite-sample law with its own failure condition. The speculative prediction of Appendix A is PA1. In the test battery of Section 9.3, test B implements V2, test C Lemma 2, test D V1 and test E Lemma 4; test A (a depolarizing channel) is a sanity check that implements none of them; V3 is implemented by Section 9.2, Step 5.

*Simulation settings.* Every simulated number in this section is produced by the released code (Code and Data Availability), at N = 10⁴ counts per batch, with the product SIC-POVM [40], linear inversion with PSD projection on batch A, RρR MLE on batch B, the same two estimators as the n = 2 models of C_eff, D̂ fixed at 0.95, and B = 20 bootstrap iterations in Algorithm 1 (not the 1000 of the definition), unless stated otherwise. Bootstrap MLE fits are capped at 3000 iterations with tolerance 10⁻¹⁰; the main MLE fits at 20000 iterations with tolerance 10⁻¹¹.

### 8.1 Operational Validations

The following validations check that an implementation behaves as the definitions and the measurement model require. V1 checks how the detection weight enters; V2 and V3 are statements about the estimator and the measurement model at finite N that can fail for a given pipeline or apparatus.

**V1 (Detection-Weight Response).**
- *Observable:* Ψ̂/D̂, with D̂ computed from the measured coincidence and accidental rates.
- *Setup:* Vary D̂ by changing the accidental rate at a fixed number of coincidences per batch (for example by adding uncorrelated background light or by widening the coincidence window), or record D̂ from the measured rates across runs. Hold state preparation, N and the model set fixed. Observer stationarity (alignment and source stability) must be verified with periodic calibration checks.
- *Expected:* Ψ̂/D̂ = F_gated · C_eff, independent of D̂.
- *Pass:* Ψ̂/D̂ is constant within its bootstrap confidence interval across at least one decade of CAR.
- *Failure:* Ψ̂/D̂ varies with CAR beyond its confidence interval. This shows that the background also enters through the reconstruction (accidentals in the tomographic counts mix the reconstructed state toward 𝟙/4), or drift; the accidentals must then be subtracted or modeled.
- *Why this replaces v8.7's V1.* v8.7 attenuated the source and expected Ψ to fall sigmoidally through D̂. That is likely mis-specified (not simulated). Under pump attenuation, SPDC coincidences scale as the pump power P and accidentals as P², so CAR and D̂ rise as the pump is attenuated. Under loss attenuation CAR is roughly flat until dark counts dominate. And since D̂ is computed from the same measured rates, "Ψ falls with D̂" is an identity, not a test.

**V2 (The Finite-Sample Floor).**
- *Observable:* R̂₁₂ = F_gated for two reconstructions of a source with I(ρ) = 0 (the maximally mixed state 𝟙/4), as a function of the number N of counts per batch.
- *The ideal floor is a limit.* v8.7 expected F_gated ≈ ε/(1 + ε). That value is reached only when both reconstructed states have I = 0 exactly, which a finite-sample reconstruction never gives. The reconstructed state of a maximally mixed source differs from 𝟙/d by an error of order N^(−1/2); the entropy deficit, and therefore Î, is second order in that error, so Î = O(N⁻¹). The gate is the geometric mean of the two Î, and F ≈ 1, so R̂₁₂ inherits the N⁻¹ scaling. v8.7's failure condition (F_gated ≫ ε/(1 + ε)) is met by every finite-N implementation and tested nothing; it is replaced.
- *Simulation (Phase 1).* For 𝟙/4 at N = 10⁴ per batch, R̂₁₂ = 2.98 × 10⁻³ ± 0.95 × 10⁻³ (mean ± SD over 20 seeds), against the floor ε/(1 + ε) = 1.0 × 10⁻⁸: 3 × 10⁵ times the floor. Over N = 10³ to 10⁶ per batch the mean R̂₁₂ scales as N^(−1.006) (log-log fit, R² = 1.000). The mean of R̂₁₂ · N is about 30 to 35 over that range for this pipeline pair.
- *Derivation to first order.* Linear inversion gives ρ̂ = Σ_k f_k Ď_k, with f_k the observed frequencies and Ď_k the dual frame of the POVM, so Δ := ρ̂ − ρ = Σ_k (f_k − p_k) Ď_k. The multinomial covariance is Cov(f) = (diag p − p pᵀ)/N, and since Σ_k p_k Ď_k = ρ, N · E[Tr Δ²] = Σ_k p_k Tr Ď_k² − Tr ρ². For the product of two qubit SIC dual frames, Tr Ď_k² = 25 for every k, so for 𝟙/4 this is 25 − 0.25 = 24.75. Near 𝟙/d, S(ρ̂) = log d − (d/(2 ln 2)) Tr Δ² + O(Δ³), so for d = 4, Î ≈ Tr Δ²/ln 2 and N · E[Î] = 24.75/ln 2 = 35.7 (measured 35.0). The covariance of Δ is not isotropic: its eigenvalues (times N) are 2.25 with multiplicity 9 (the correlation sector) and 0.75 with multiplicity 6 (the two local sectors). For two independent estimates the gate is √(Î₁ Î₂), whose mean is (E√Î)²; a Monte Carlo of the Gaussian form with this covariance gives N · E[√(Î₁ Î₂)] = 34.3. Since F = 1 − O(N⁻¹), R̂₁₂ has the same leading term. This first-order value is asymptotically exact as N → ∞; a Monte Carlo with 4 × 10⁶ draws gives 34.323 ± 0.007.
- *The constant (Phase 3).* For 𝟙/4 with 3000 runs at each of N = 10³, 3 × 10³, 10⁴, 3 × 10⁴, 10⁵, 3 × 10⁵ and 10⁶, N · (R̂₁₂ − R₁₂,exact) is 33.32, 33.86, 34.09, 34.22, 34.47, 34.32 and 34.26 (standard errors 0.17 to 0.18). A fit of a/N + R₁₂,exact over N ≥ 10⁴ gives a = 34.27 ± 0.08 (χ²/dof = 2.6/4), 0.7σ from the first-order value; with b free, b = 0.9989 ± 0.0014. The N = 10³ point lies about 3 percent low, a 1/N² correction, which is why fits over all N pull b to 0.996. The LI/MLE and MLE/MLE pairings agree to 6 × 10⁻¹¹, because for 𝟙/4 the linear-inversion estimate stays positive, and it then equals the MLE. The first 100-seed fit of Phase 2 (a = 33.33 ± 0.31 with b = 1) was a low draw.
- *Prediction:* For a state with I(ρ) = 0 reconstructed by linear inversion or RρR MLE from N counts per batch of the 16-outcome product SIC-POVM, R̂₁₂ = a N⁻¹ (1 + o(1)), with a = 34.3 ± 0.1 (first-order theory 34.32). The ideal floor ε/(1 + ε) is reached only for N of order a/ε ≈ 3 × 10⁹ per batch. In the sampling-floor regime, Ψ̂ = D̂ · C_eff · a/N, linear in D̂.
- *Failure:* V2 fails if, for a source with independently bounded I(ρ) < 0.1 · a/N_max, the 95% confidence interval of a fitted with b = 1 lies outside [31, 37], or the 95% confidence interval of b excludes 1, over at least two decades of N (N ≥ 10⁴, where the 1/N² correction is negligible) with at least 30 runs per N. The band [31, 37] is a stated tolerance (about 10 percent, for detector and calibration effects), not derived.
- *The source must have I(ρ) small enough, or I₀ must be in the fit.* A near-maximally mixed thermal source does not meet the bound: the paper's thermal test state σ ⊗ σ, σ = diag(0.51, 0.49), has I₀ = 2.9 × 10⁻⁴, against 0.1 · a/N_max = 3.4 × 10⁻⁶ for N_max = 10⁶. With an offset for I₀ in the fit model (Phase 3, 1000 runs per N, N ≥ 10⁴), it gives b = 0.9964 ± 0.0040, a = 34.27 ± 0.19 with b = 1, and a fitted offset of 2.88 × 10⁻⁴ ± 8 × 10⁻⁷ against I₀ = 2.89 × 10⁻⁴. The Phase 2 exponent for this source, b = 0.986 ± 0.006, came from a fit over all N from 10³, where the 1/N² correction pulls b low.

**V3 (Order Asymmetry; formerly P3).**
- *Observable:* the signed asymmetry Δ_Ψ = ⟨Ψ̂₁₂⟩ − ⟨Ψ̂₂₁⟩, where ⟨Ψ̂₁₂⟩ is the mean of Ψ̂ over K independent runs in which both pipelines reconstruct the post-measurement state ρ₁₂ (from O₁ then O₂), and ⟨Ψ̂₂₁⟩ likewise for ρ₂₁ (from O₂ then O₁). The mean of the per-run |Ψ̂₁₂ − Ψ̂₂₁| is not used: it has a noise floor of about 1.13 times the single-run SD of Ψ̂ (floor 6.1 × 10⁻³; SD 5.3 × 10⁻³ at N = 10⁴), even where the exact asymmetry is zero.
- *Setup:* Input state ρ_in = |ψ_A⟩⟨ψ_A| ⊗ 𝟙/2 (the tilted input), with the Bloch vector of ψ_A equal to (1, 0, 1)/√2. Sequential measurements on qubit A of O₁ = σ_z and O₂ = sin θ σ_x + cos θ σ_z, both Hermitian with ||O||∞ = 1, so that ||[O₁, O₂]||∞ = 2 sin θ (operator norm). Preparation is described in Section 9.2, Step 5.
- *Measurement model:* E_k(γ) = (1 − γ) 𝟙/m + γ Π_k, with γ ∈ (0, 1] the measurement strength and {Π_k} the spectral projectors (m = 2). The non-selective update is ρ′ = Σ_k M_k ρ M_k†, with M_k = √E_k(γ) the Lüders operator, so ρ₁₂ and ρ₂₁ are trace-one density matrices. Calibration uses γ = 1 (projective).
- *Regime:* θ ≤ 0.2 rad, that is ||[O₁, O₂]||∞ = 2 sin θ ≤ 0.397. The restriction is needed: for the tilted input the asymmetry passes through a maximum near θ = 0.4 and falls at larger angles (over the six angles up to 0.8 rad the log-log exponent drops to about 0.56).
- *Prediction (computable).* For the tilted input, γ = 1 and θ ≤ 0.2, the exact asymmetry is first order in the commutator, Δ_Ψ ≈ β · ||[O₁, O₂]||∞, with β/(r_∞ · D̂) = −0.2204 (Phase 3; slope of the signed difference over θ = 0.05, 0.1, 0.2). In the simulation (r_∞ = 1/2, D̂ = 0.95), β = −0.1047.
- *Δ_Ψ is not a function of the commutator norm alone.* For the tilted input the log-log exponent of |Δ_Ψ| is k = 0.98 to 0.99 over θ ≤ 0.2 for every γ from 0.1 to 1.0 (Phase 2; angles 0.05, 0.1, 0.2, 0.4, 0.8 rad and π/4). For |+⟩|0⟩ and for cos(π/8)|00⟩ + sin(π/8)|11⟩ it starts at second order (k = 1.92 to 1.98), yet a straight line through the three exact values at θ ≤ 0.2 still gives R² ≈ 0.98 (and up to 0.996 over all six angles); R² > 0.9 therefore does not test linearity. Fitted over the small angles θ = 0.01 to 0.04 (Phase 3), the exponents are k = 1.005 for the tilted input (1.004 at γ = 0.5), 1.999 for |+⟩|0⟩ and 1.995 for the cos(π/8) state at γ = 1. For a Bell input the asymmetry is zero (below 2 × 10⁻¹⁵) for every γ and θ, because the two post-measurement states have the same spectrum. For the tilted input with O₁ = σ_y and O₂ in the x-y plane, the asymmetry is second order at the same commutator norm (k = 1.999; Ψ̂ difference −3.3 × 10⁻³ at θ = 0.2 and γ = 1, against −0.042 for the x-z pair). A first-order asymmetry needs an input with Bloch components both along and across the measured axes.
- *Size at γ = 0.5 (Phase 1).* Phase 1 reports the size |Δ_Ψ|. For the tilted input the exact |Δ_Ψ| has slope 6.05 × 10⁻⁴ (R² = 0.9999 over θ ≤ 0.2) and is 2.4 × 10⁻⁴ at θ = 0.2. By Lemma 4 it equals r_∞ · D̂ · |ΔI| = 0.5 × 0.95 × |ΔI|, with |ΔI| ≈ 5.0 × 10⁻⁴ the difference in informativeness of the two post-measurement states. At N = 10⁴ per batch the single-run SD of Ψ̂ is 5.3 × 10⁻³, about 22 times the effect at θ = 0.2; with 300 runs per order per θ the finite-N fits give R² ≤ 0.21. At γ = 0.5 the slope is about 175 times smaller than at γ = 1, and a 5σ slope test needs about 10¹⁰ detected counts.
- *Size at γ = 1 (Phase 2).* The design table reports the signed slope of Ψ̂₁₂ − Ψ̂₂₁. With projective measurements the slope for the tilted input is β = −0.105, and a 5σ slope needs about 1.8 × 10⁵ detected counts before rounding to whole runs. Single-run SDs of Ψ̂ at N = 10⁴ lie between 0.0027 and 0.0106 over the inputs, values of γ and angles sampled; the exception is the Bell input at γ = 0.1, where n_active flips between runs and the SD is 0.20. The run counts assume that the SD falls as N^(−1/2). This holds for the tilted input (measured to predicted SD 0.92 to 1.03 at N = 10⁵ and 10⁶). For the Bell and partially entangled inputs the SD falls more slowly (ratio up to 1.85 at N = 10⁶), so their run counts at large N are underestimated by up to a factor of 3.4.
- *The cheapest 5σ slope tests* (Phase 2 design study; angles θ = 0.05, 0.1, 0.2; total detected counts over both orders and both batches; runs rounded up to whole runs, at least 2). "SD of Ψ̂" is the single-run SD at θ = 0.1 and N = 10⁴; "R²" is that of a straight line through the three exact values.

| Input | γ | N per batch | Runs per order per θ | θ points | Total counts | Unrounded total | Signed β | R² (3 points) | Exponent k | SD of Ψ̂ |
|---|---|---|---|---|---|---|---|---|---|---|
| tilted | 1.0 | 10⁴ | 2 | 3 | 2.4 × 10⁵ | 1.8 × 10⁵ | −0.105 | 0.9998 | 0.98 | 0.0039 |
| tilted | 0.9 | 10⁴ | 25 | 3 | 3.0 × 10⁶ | 3.0 × 10⁶ | −0.027 | 0.9999 | 0.99 | 0.0041 |
| \|+⟩\|0⟩ | 1.0 | 10⁴ | 83 | 3 | 1.0 × 10⁷ | 9.9 × 10⁶ | −0.021 | 0.981 | 1.98 | 0.0058 |
| tilted | 0.5 | 10⁴ | 8.1 × 10⁴ | 3 | 9.7 × 10⁹ | 9.7 × 10⁹ | −6.0 × 10⁻⁴ | 0.9999 | 0.99 | 0.0052 |

  The table sizes the slope test only. The |+⟩|0⟩ row passes a slope test but fails the exponent test (k ≈ 2). The full criterion below (slope and exponent) needs |Δ_Ψ| at the smallest angle to about 10 percent; from the tabulated SD (0.0039) and |Δ_Ψ| = 0.011 at θ = 0.05, that is about 26 runs per order per θ at N = 10⁴, about 3 × 10⁶ detected counts for the tilted input at γ = 1 (an estimate from the tabulated values, not simulated). The 2.4 × 10⁵ figure covers the slope test only.
- *Pass criterion:* with K and N stated before the data are taken, (i) the slope of Δ_Ψ against ||[O₁, O₂]||∞ is negative and within 20 percent of the prediction β = −0.22 · r_∞ · D̂ (with r_∞ and D̂ measured), at 5σ, and (ii) the log-log exponent k of |Δ_Ψ| against ||[O₁, O₂]||∞ over θ ≤ 0.2 (at least three angles) lies in [0.9, 1.1]. The 20 percent and the band [0.9, 1.1] are stated choices, not derived.
- *Failure:* for the tilted input at γ = 1, the slope is consistent with zero, positive, or more than 20 percent from the prediction, or k lies outside [0.9, 1.1].
- *Diagnostics:* the model set M is held fixed, and the mandated diagnostics (Section 9.2) are reported with every Ψ̂. In the Phase 1 simulation (γ = 0.5) the partition was the same in all 6600 runs (n_active = 2, n_unique = 1, C_eff = 1/2).

### 8.2 The Withdrawn Prediction

**P2 (withdrawn): State-Family Sensitivity, a Negative Result.**

P2 is withdrawn. Its failure condition, as stated in v8.7, is met in simulation, and the prediction is withdrawn, not reinterpreted. The v8.7 statement is kept below as the record, followed by the result.

*As stated in v8.7:*
- *Observable:* Ψ.
- *Setup:* Prepare Werner-family bipartite states ρ_AB(p) with tunable entanglement parameter p. Two independent reconstruction pipelines reconstruct the global bipartite state from disjoint data batches using a fixed IC-POVM, yielding ρ₁,AB and ρ₂,AB. The informativeness gate uses Hilbert space dimension d = d_A · d_B.
- *Controls:* Hold noise level, sample size, and number of models fixed. To keep brightness drift from confounding the signal, enforce a constant Detection Quality Weight (D̂) by active hardware stabilization of the SPDC pump flux, which also prevents ensemble bias from data post-selection. Ψ fluctuations are thus strictly driven by state geometry.
- *Control group:* Additionally measure a family of separable mixed states matched for both purity (same Tr(ρ²)) and von Neumann entropy S(ρ), but with zero entanglement. The control family consists of mixtures of local product bases (LOCC-generated). It is generated by sampling local mixed states and accepting them only if they match the target Werner state within tight numerical tolerances: |ΔTr(ρ²)| < 10⁻⁴ and |ΔS(ρ)| < 10⁻⁴. Separability is verified via the PPT (Peres–Horodecki) criterion, which is strictly sufficient for the 2 × 2 qubit case. This isolates the state-geometry signal from entropy-gating effects.
- *Prediction:* Ψ evaluates reconstruction sensitivity and stability across state families under a fixed finite sample size N and a fixed reconstruction stack. For Werner-family states, preliminary simulations yield a Spearman rank correlation ρ_s > 0.95 (p < 0.01) between Ψ and concurrence (N = 10⁴, product SIC-POVM, MLE, p ∈ [0, 1] on a grid of step 0.05), with statistically significant divergence between the entangled family and the separable control family at matched purity levels.
- *Failure:* Ψ is uncorrelated with the state-family parameter after controlling for purity, or the entangled and separable families are statistically indistinguishable.

*What was found* (p ∈ [0, 1], step 0.05, 30 seeds per p per family, N = 10⁴ per batch):
- *Correlation.* Spearman ρ(Ψ̂, p) = 1.000 for the Werner family (0.982 against concurrence [37], above the 0.95 v8.7 stated). The matched separable control gives the same correlations: 1.000 against p and 0.982 against concurrence. The correlation is carried by the gate, which grows with purity in both families, not by entanglement.
- *Control.* The control σ(p) places the Werner spectrum on the diagonal of the computational product basis (Section 4.1): a mixture of product states, verified PPT [38, 39] (smallest partial-transpose eigenvalue −8 × 10⁻¹⁷, round-off), matched to the Werner state to 1 × 10⁻¹⁵ in purity and 4 × 10⁻¹⁵ bits in entropy. A second control, σ(p) rotated by a fixed random local unitary U_A ⊗ U_B, tests dependence on alignment with the POVM.
- *No separation for p < 1.* At no p < 1 does Ψ̂ differ significantly between the Werner state and its matched control. Against σ(p), the largest |ΔΨ̂| is 2.6 × 10⁻³ (at p = 0.95) and the smallest Welch p-value is 0.076 (at p = 0.40). Against the rotated control, the largest |ΔΨ̂| is 5.7 × 10⁻³ and the smallest Welch p-value is 0.025 (both at p = 0.95). None is significant after Bonferroni correction over the 42 tests (21 grid points, two controls; level 0.01/42).
- *The p = 1 difference is a threshold artifact.* At p = 1 the two families differ strongly (ΔΨ̂ = 0.47), and the difference coincides with a change in n_active: the Bell state gives n_active = 1 and C_eff = 1, the product state |00⟩ gives n_active = 2, n_unique = 1 and C_eff = 1/2. Under Section 8.3 a change in Ψ̂ that coincides with a change in n_active is a threshold artifact and does not count toward a pass.
- *The v8.7 control recipe cannot be carried out as written.* Read as sampling product states ρ_A ⊗ ρ_B, "sampling local mixed states" matches both purity and entropy within 10⁻⁴ only at p ∈ {0, 0.05, 1} on the grid; for 0.10 ≤ p ≤ 0.95 the smallest achievable mismatch reaches 2 × 10⁻². Mixtures of product states are required, and the diagonal construction σ(p) always succeeds.
- *Why.* Lemma 4 explains the result. In the large-N limit, Ψ̂ depends on the state only through S(ρ̃), and the Werner state and σ(p) have the same spectrum. The residual finite-N differences are of the size of the sampling noise.

### 8.3 What Would Falsify the Weak Claim

The weak claim is that Ψ is a well-defined, bounded, measurable score of agreement between independent reconstructions, which behaves as defined in a specified experiment and reconstruction stack. Its mathematical part (bounds, symmetry, piecewise continuity, the large-N limit) is argued in Section 2 and Lemmas 1–4. Its operational part fails under any one of the following, each stated as in Section 8.1:

- **V1 fails** if Ψ̂/D̂ varies with CAR beyond its bootstrap confidence interval over at least one decade of CAR, at fixed N and state.
- **V2 fails** if, for a source with independently bounded I(ρ) < 0.1 · a/N_max, the 95% confidence interval of a (b = 1, N ≥ 10⁴) lies outside [31, 37], or that of b excludes 1, over at least two decades of N with at least 30 runs per N.
- **V3 fails** if, for the tilted input at γ = 1 and θ ≤ 0.2 rad, the slope of Δ_Ψ against ||[O₁, O₂]||∞ is not negative and within 20 percent of −0.22 · r_∞ · D̂ at 5σ, or the log-log exponent k lies outside [0.9, 1.1].

P2 is not on this list. Under v8.7's wording a P2 failure counted against the weak claim, and P2 has failed in simulation (Section 8.2). v11 records that failure, withdraws P2, and states the weak claim without any claim of sensitivity to entanglement or to state families beyond their entropy. This narrows the claim; it does not rescue P2.

These failures mean different things.

- A V1 or V2 failure shows that the implementation, or its controls, does not realize the definitions. It must be resolved before V3 is interpreted.
- A V3 failure shows that the pipeline or apparatus does not reproduce a computable consequence of the Lüders rule and Lemma 4.
- Any change in Ψ̂ that coincides with a change in n_active or n_unique, as recorded by the mandated diagnostics, is reported as a threshold artifact and does not count toward a pass.
- A failure of PA1 (Appendix A) has no bearing on the weak claim.

## 9. Quantum Optics Protocol

### 9.1 Setup

A single SPDC source (Type-II BBO crystal) prepares entangled photon pairs. Signal and idler photons are routed to two spatially separated measurement stations. The stations use standard classical synchronization and communication for coincidence counting, and perform joint bipartite tomography [5] with a fixed informationally complete POVM. The protocol's fixed IC-POVM is the 4-outcome SIC-POVM [40] for single qubits, or the 16-outcome product SIC-POVM for bipartite systems.

*Data independence:* The shared coincidence dataset is partitioned into two disjoint batches by time-interleaving of the Poisson detection stream. Pipeline 1 reconstructs ρ₁,AB from Batch A, and Pipeline 2 reconstructs ρ₂,AB from Batch B. The disjoint partition ensures data independence: the two reconstructions share a common source but operate on statistically independent data.

### 9.2 Measurement

**Step 1 (Recognition):** Pipeline 1 reconstructs ρ₁,AB from Batch A; Pipeline 2 reconstructs ρ₂,AB from Batch B. All reconstructed density matrices undergo full-rank regularization (see Section 3.1) before entering the functional. Compute F(ρ₁,AB, ρ₂,AB), I(ρ₁,AB), I(ρ₂,AB), G_ε, and F_gated. The Hilbert space dimension is d = d_A · d_B. The estimator used by each pipeline must be named in every report, since Ψ̂ depends on it (Appendix B.1). The released simulation uses linear inversion with PSD projection (Smolin–Gambetta–Smith [33]) for Pipeline 1 and RρR MLE [34, 35] for Pipeline 2.

*Data-quality diagnostic: condition number (from v10.0).* v10.0 added a fail-fast guard: a reconstruction with cond(ρ) = λ_max/λ_min > 10³ is rejected. v11 records the condition number but does not adopt the automatic rejection. Two facts decide this.

- *The guard must be read before regularization.* Full-rank regularization sets every eigenvalue to at least δ_reg/d. For any regularized state, therefore, cond(ρ̃) ≤ (1 − δ_reg + δ_reg/d)/(δ_reg/d), which is about 4 × 10⁶ for δ_reg = 10⁻⁶ and d = 4. After regularization the condition number is capped by δ_reg, and a rank-deficient reconstruction (cond = ∞ before regularization) can no longer be told apart from a merely near-pure one. It must be applied to the reconstruction before regularization.
- *At 10³ the guard rejects the states the protocol is built to measure.* In either placement it rejects every reconstruction whose smallest eigenvalue is below 10⁻³ of its largest. That includes the Bell calibration state and any MLE output on the boundary of state space.

v11 therefore requires that cond(ρ) be computed on the unregularized reconstruction, reported with the mandated diagnostics, and flagged when it exceeds 10³. A flagged value must be inspected before Ψ̂ is interpreted. A rejection threshold, if one is wanted, has to be set so that the expected spectrum of the calibration state passes. This choice is left open.

**Step 2 (Convergence):** Apply 2+ reconstruction algorithms (MLE, Bayesian, compressed sensing) to the full combined dataset, not restricted to individual batches. Each algorithm produces a predicted POVM-outcome distribution Pᵢ. Compute JSD_w, JSD_norm, n_unique, and C_eff. C_eff acts as an apparatus-level consensus prior and is intentionally calculated globally, not strictly between the disjoint data batches. The thresholds δᵢ are calibrated with two independent resamples per bootstrap iteration (Algorithm 1, step 1), and the number B of iterations is reported. Edges use δᵢⱼ = min(δᵢ, δⱼ) and the non-strict test (Algorithm 1, step 3).

*The redundancy ratio at finite and infinite N (v8.7 rule).* With the two estimators of the released simulation, every full-rank state gives JSD(P_LI, P_MLE) at round-off (about 10⁻¹⁷ bits), and δᵢ lies between 1 × 10⁻⁴ and 7 × 10⁻⁴ bits over the B.1 states at N = 10⁴ (3.4 to 4.3 × 10⁻⁴ for the full-rank ones), so the edge test merges the two models: n_unique = 1 and r_red = 1/2 at every finite N. Evaluated on population quantities (N = ∞), both the JSD and δᵢ are exactly zero. Under v8.7's strict test, 0 < 0 fails and r_red = 1, so the limit of r̂_red (1/2) differs from r_red at the limit (1): a jump by a factor of 2 at N = ∞. Under the v11 non-strict test, 0 ≤ 0 holds and r_red = 1/2 in both cases. Lemma 4 uses the limit of the finite-N values, which is the same under both rules.

*What C_eff records.* Phase 2 of the released simulation computed C_eff at N = 10⁴ (20 seeds for each of the five B.1 states) for model sets of two to four standard estimators: linear inversion with PSD projection, RρR MLE, a Bayesian mean estimate (Dirichlet posterior over the outcome probabilities, each draw mapped by linear inversion with PSD projection), and a rank-1 (pure-state) MLE. With the paper's τ = 1, C₀ never differs from 1 by more than 10⁻⁵, and the estimators that agree are merged, so C_eff = 1/n_active exactly: 1/2 with two active estimators, 1/3 with three. The rank-1 model, misspecified for mixed states, is dropped by the η threshold for every mixed state (its held-out log-likelihood is 600 to 2700 nats worse) and is merged with MLE for the Bell state, where it is correct. Adding a further correct estimator lowers Ψ̂: for Werner p = 0.8, Ψ̂ = 0.275 with two estimators and 0.184 with three. This is Lemma 2 working as designed, but it is not information about the state. With the paper's weight rule, C_eff records the composition of the estimator set, not the quality of the data. With per-count weights (τ = N, run only as a test of an alternative), more models stay active and C₀ moves (down to about 0.97), but under v8.7's max rule the unstable rank-1 model then absorbs the good models, and for the dephased Bell state it is counted as a separate witness in 2 of 20 runs. The v11 min rule addresses that failure. The map was run under v8.7's edge rule (strict test, max).

**Step 3 (Density):** In each laboratory, record the coincidence count rate (signal) and the accidental count rate (noise). Under a fixed measurement alphabet and time window, the count rate serves as an operational surrogate for detection quality. D := coincidence rate. D_ref := accidental rate. D̂ = D / (D + D_ref).

**Step 4:** Ψ̂ = F_gated · C_eff · D̂.

*Mandated diagnostics.* Every reported Ψ̂ is accompanied by: n_active, n_unique, H(w), JSD_w, C₀, r_red, D̂ (with the coincidence and accidental rates), and cond(ρ) of each unregularized reconstruction; the estimators used by each pipeline and in the model set; N per batch; B; δ_reg, ε, η, H_min and τ; and the RNG seeds. Sections 3.2, 8 and 10 refer to this list.

*Optional reporting convention: flux normalization (from v10.0).* An experiment may also report Ψ̂_norm := Ψ̂/Ψ̂_cal, where Ψ̂_cal is the value of Ψ̂ measured on the same apparatus with the calibration state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2, written in the σ_z basis in which the qubit SIC on each side has the Bloch vectors (1, 1, 1)/√3, (1, −1, −1)/√3, (−1, 1, −1)/√3, (−1, −1, 1)/√3 (the alignment of the released code). The alignment must be stated, because at N = 10⁴ the aligned Bell state gives Ψ̂ ≈ 0.92 and any generic local rotation of it gives Ψ̂ ≈ 0.45 (Section 4.1); the aligned value is a SIC-alignment artifact. This is an apparatus-level reporting convention. It is not part of the definition of Ψ, and Ψ̂ (Eq. 2) is always reported with it. Ψ̂_norm does not keep the bound of Lemma 3. It equals 1 at the calibration point, and it exceeds 1 whenever a measured Ψ̂ exceeds Ψ̂_cal, for example through finite-sample fluctuation or drift. The ratio cancels a common apparatus factor only to the extent that D̂ and C_eff are the same in the calibration and measurement runs, so it does not settle Open Question 2.

**Step 5 (V3, order asymmetry):** Measure the signed asymmetry Δ_Ψ = ⟨Ψ̂₁₂⟩ − ⟨Ψ̂₂₁⟩ (Section 8.1, V3), the difference of run means over K runs per order, for the tilted input with projective measurements (γ = 1) of O₁ = σ_z and O₂ = sin θ σ_x + cos θ σ_z on qubit A, at three or more angles with θ ≤ 0.2 rad (for example θ = 0.05, 0.1, 0.2). Fit both the slope of Δ_Ψ against ||[O₁, O₂]||∞ and the log-log exponent k of |Δ_Ψ|, and compare the slope with the prediction −0.22 · r_∞ · D̂. K and N are fixed before the data are taken; Section 8.1 gives the cheapest design (2 runs per order per angle at N = 10⁴ for the slope, about 26 for the full criterion).
- *Preparation of the input.* Qubit B in 𝟙/2: prepare photon B in diagonal polarization and fully dephase it in the H/V basis with a birefringent delay longer than the photon coherence time (equivalently, B can be one photon of a polarization-entangled pair whose partner is not analyzed). Qubit A in the tilted pure state: set its polarization with a polarizer and wave plates. Neither step is simulated in the released code.
- *Implementation of the measurements.* A non-selective projective measurement of σ_z is a complete dephasing channel in the H/V basis; it can be implemented as measure-and-forget, without a polarizer, by a birefringent delay longer than the coherence time. The measurement of O₂ is the same channel in the rotated basis, with wave plates before and after the delay.

*Reporting Filter (Bootstrap Persistence):* As a purely experimental quality check, a transition in n_unique is reported only if the clique count remains invariant across K ≥ 3 independent bootstrap recalibrations of the thresholds δᵢ. This is an experimental reporting filter to reject statistical noise, not a formal mathematical condition of the functional.

### 9.3 Test Battery

- **A (Break Recognition):** Insert a depolarizing channel. Verify that F_gated drops. (A sanity check; it implements none of V1, V2, Lemma 2 or Lemma 4.)
- **B (Shared Ignorance, V2):** Use a source whose informativeness is independently bounded below 0.1 · a/N_max (for N_max = 10⁶ per batch, I < 3.4 × 10⁻⁶; for example both photons fully depolarized). Measure R̂₁₂ at three or more values of N spanning at least two decades, with at least 30 runs per N. Fit a with b = 1, and b free; V2 passes if the 95% interval of a lies inside [31, 37] and that of b contains 1.
- **C (Redundancy, Lemma 2):** Add an MLE duplicate as a third model. Verify that C_eff decreases relative to baseline beyond the bootstrap variance envelope; this applies when the existing models already nearly agree (Lemma 2).
- **D (Detection weight, V1):** Vary the accidental rate at fixed coincidence count, or record D̂ from measured rates. Verify that Ψ̂/D̂ is constant within its bootstrap interval across at least one decade of CAR.
- **E (Matched-Spectrum Check, Lemma 4):** Prepare Werner states ρ_W(p) for p ∈ [0, 1) and the matched separable family σ(p), a mixture of product states with the same spectrum (Section 4.1), checked PPT and matched in purity and entropy. Report Ψ̂ against p for both families with the mandated diagnostics. Lemma 4 predicts no difference beyond the sampling noise.

## 10. Limits and Known Objections

This section collects the known limits of the construction. They are stated so that a reader can weigh the weak claim correctly.

**What Ψ is not.**
- *Not an entanglement witness.* In the large-N limit Ψ̂ depends on the state only through S(ρ̃) (Lemma 4). A Werner state and a separable state with the same spectrum give the same Ψ̂, and in simulation they cannot be told apart at N = 10⁴ (Section 8.2).
- *Mostly an entropy score.* At large N, Ψ̂ is (n_unique/n_active) · CAR/(1 + CAR) · (1 − S(ρ̃)/log₂ d + ε)/(1 + ε). Across the B.1 states F spans 0.986 to 0.995 while G_ε spans 0.003 to 0.97.
- *Not invariant under local unitaries at finite N.* For pure states at N = 10⁴, Ψ̂ depends on the alignment of the state with the POVM, by about a factor of 2 for the Bell state: Ψ̂ ≈ 0.92 aligned with the SIC, 0.438 to 0.450 for generic local rotations (Section 4.1).
- *Not a physical invariant.* Ψ depends on the reconstruction stack, on the redundancy rule and on the apparatus (v9.1; Section 10.9).
- *Not, through C_eff, a measure of how well estimators agree on the data.* With the paper's weight rule, C₀ stays at 1 and C_eff equals 1/n_active for standard estimators (Section 9.2). It records the composition of the model set, and Ψ is not monotone in model agreement (Section 2.1).
- *Not yet measured.* No laboratory has measured Ψ. Every number in this paper is computed exactly or from released simulation code.

**10.1 Dimensional status.** Ψ and each of its factors are dimensionless. The paper claims no force law and no equation of motion. S_eff is called an action by analogy (Section 2), and no dynamics follow from it. An expression of the form Ψ/r², used in illustrative visualizations elsewhere, is not part of this paper. To describe a force, such an expression would need a dimensional coupling constant (units M·L³·T⁻²), and that constant would reintroduce what Ψ does not contain. In Appendix A, α carries the dimensions (L²), and Ψ remains dimensionless.

**10.2 The equivalence-principle bound.** Appendix A proposes a correlation between the gradients of Ψ and of √K. It does not propose that recognition is gravity. A literal reading of recognition as a gravitational coupling would make free fall depend on R₁₂, that is, on the internal state of the test body. Tests of the weak equivalence principle bound composition-dependent free fall at the 10⁻¹⁵ level (MICROSCOPE [20]; for a review, see [32]). Any such reading would therefore need R₁₂ to be universal across matter to that precision. A coupling that universal is a constant and carries no state dependence. This paper makes no claim of that kind.

**10.3 Status of evidence.** No laboratory experiment has been run. The paper's tests have been run in simulation, with code released with the paper (Code and Data Availability), and every simulated number in Sections 4.1 and 8 and Appendix B comes from that code. The simulation replaced the unreleased "preliminary simulations" of earlier versions. It did not reproduce them: the v8.7 table in Appendix B.1 is not consistent with Eqs. 4–6 and has been regenerated, and the P2 result quoted in v8.7 holds for the Werner family but equally for its separable control. A second phase checked Lemma 4 at finite N, derived the floor constant, sized the V3 experiment and mapped C_eff. A third phase answered a referee's follow-ups: the floor constant with 3000 runs per N (a = 34.27 ± 0.08, against 34.32 from first-order theory; the first 100-seed fit, 33.3 ± 0.3, was a low draw), the locally rotated Bell and |00⟩ controls, the log-likelihood gap distributions, and the small-angle exponents of V3. The revised V1 has not been simulated.

**10.4 The convergence factor at realistic sample sizes.** As noted in Section 3.2, the τ = 1 softmax over cross-validated log-likelihoods is one-hot when the log-likelihood gap exceeds 13.8 nats. In the released simulation, with two models (linear inversion with PSD projection, and MLE), C_eff takes only two values. For the aligned Bell state n_active = 1 and C_eff = 1: the convergence factor did not participate. For every full-rank state, and for the rank-2 separable test state (JSD 9.5 × 10⁻⁷ bits), the two estimators coincide or nearly so and are merged as redundant: n_unique = 1, r_red = 1/2 and C_eff = 1/2. In every reported mean, C₀ stays within 10⁻⁵ of 1. The Phase 2 map with three and four estimators confirms this: with τ = 1, C_eff = 1/n_active in every run, and adding a correct estimator lowers Ψ̂ (Section 9.2). With the paper's weight rule the convergence factor is a count of estimator families. v11 does not change the weight rule; Open Question 7 records this as the thing a future version should fix.

**10.5 Apparatus dependence.** Through D̂ = CAR/(1 + CAR), Ψ depends on photon flux and on detector noise. It is a figure of merit for a state *and* an apparatus. Comparing Ψ across experiments requires a normalization of D_ref that does not yet exist (Open Question 2). The optional ratio Ψ̂_norm = Ψ̂/Ψ̂_cal of Section 9.2 removes a common apparatus factor only in part and does not supply that normalization.

**10.6 How informative the validations are.**
- V1 checks only that the detection weight enters through D̂ and not also through the reconstruction. V2 is a statement about the estimator at finite N; its N⁻¹ exponent and its constant follow from a short argument (Section 8.1), so a pass mainly checks the pipeline.
- In P2, the gate makes Ψ̂ increase with p for Werner states. Concurrence is zero for p ≤ 1/3 and increasing above it. A high Spearman correlation across the p grid is therefore expected for almost any smooth fidelity-based score. The informative part of P2 was the purity- and entropy-matched separable control. The simulation bore this out: the control gave the same correlation and no separation (Section 8.2), and Lemma 4 shows that none is to be expected at large N.
- V3 is a computable consequence of the Lüders rule and Lemma 4: at large N the asymmetry is an entropy difference between ρ₁₂ and ρ₂₁ scaled by r_∞ · D̂ (Section 7). It is first order only for an input with Bloch components along and across the measured axes; for other inputs it is second order, and a straight-line R² does not tell the two apart. A pass shows that the apparatus and pipeline reproduce the measurement model; it says nothing about recognition beyond that.

**10.7 The GR bridge has no mechanism.** The two reconstructions come from time-interleaved batches of one photon stream, so both see the same spacetime. Their agreement is set by shot noise and by the estimator, and no channel is identified through which tidal curvature would change it. The expected outcome of PA1 is therefore a null, and α is free. Appendix A remains speculative for these reasons, and it does not gate the weak claim.

**10.8 Review process.** Successive versions were checked and drafted with AI systems (see Acknowledgments). Such review checks local consistency well but is not peer review. Several editing residues survived it and are corrected in v11. The errors in the B.1 table and the failure of P2 also survived it and were found only when the tests were run; a further independent AI review of v11 against the code found the errors corrected in this draft (the floor constant, Lemma 2, V1, the B.1 upper-bound column, and others listed in Appendix B.2). No external domain expert has yet reviewed the paper.

**10.9 Limits stated in v9.1.** v9.1 (2026-02-22) presented Ψ as an operational convergence metric, "not presented as a new physical invariant". This paper keeps that framing. v9.1 listed four limitations. Each is recorded here, with the place where it is treated:

- *Not a physical invariant.* Ψ depends on the reconstruction stack and on the apparatus (Sections 3.3 and 10.5). Two laboratories measuring the same state can obtain different values of Ψ̂ without either being in error.
- *Piecewise behavior.* Ψ is continuous only within regions where the active set and the redundancy partition are fixed. It jumps at transitions in n_active and n_unique (Section 2).
- *Dependence on the estimator set.* C_eff, and therefore Ψ, depends on which models make up M, and it is deliberately not invariant under adding models (Section 3.2, Lemma 2). Values of Ψ̂ are comparable only for the same model set, which is why M is held fixed during sweeps.
- *The gate is a normative choice.* Treating agreement between high-entropy states as uninformative is a design decision, not a derived result (Section 3.1). A different gate would give a different functional.

## 11. Open Questions

1. Non-commuting extension: a combining rule for Ψ(1,2) and Ψ(2,1) (geometric mean, commutator-weighted interpolation, or symmetrized product).
2. D_ref universality: the apparatus-specific reference density limits cross-experiment comparison. A normalization protocol is needed.
3. The GR bridge constant α (see Appendix A; units L²): if α relates to a known length scale (Planck, Compton, Schwarzschild radius, etc.), this would significantly constrain the framework.
4. Relationship to IIT (Φ) [12], quantum discord, and coherence resource theory.
5. The weak claim (V1, V2, V3) stands independently of the speculative GR bridge (Appendix A). The two have different evidence thresholds and different experimental timelines.
6. Appendix B.1: done in v11. The table is regenerated from released code, the old Werner values are shown to be impossible for the population Ψ under Eqs. 4–6, and the stability claim is narrowed to δ_reg = 10⁻⁶ (Section 3.1).
7. C_eff: with τ = 1 on summed log-likelihoods, the weights are one-hot at N = 10⁴ when the log-likelihood gap exceeds 13.8 nats, and C₀ stays within 10⁻⁵ of 1 for two to four standard estimators; C_eff reduces to n_unique/n_active, which equalled 1/n_active in every run (Section 9.2). v11 does not change τ. A future version should fix the weight rule (for example per-count log-likelihoods, τ = N, together with the v11 edge rule) and show a regime at realistic N in which C_eff varies smoothly and informatively, or show that none exists for consistent estimators.
8. Baselines: for its stated purpose, scoring the agreement of two independent reconstructions, does Ψ̂ rank datasets or pipelines differently from plain F, from Î, or from the bootstrap spread of F, in a way that would change a decision? A result in which Ψ̂ adds nothing beyond F and Î would bear on the usefulness of the construction, though not on the weak claim as stated.
9. V3 design: size the exponent test (k ∈ [0.9, 1.1]) by simulation, including the slower-than-N^(−1/2) fall of the single-run SD for entangled inputs (Section 8.1).
10. Bias correction of Î: subtracting the first-order term (Σ_k p_k Tr Ď_k² − Tr ρ̂²)/(N ln 2) near 𝟙/d would remove most of the finite-sample floor (Section 8.1). It is not adopted, because it changes the estimator inside Ψ. Whether a future definition should include it is open.
11. Local-unitary dependence: at N = 10⁴, Ψ̂ for pure states depends on their alignment with the POVM through the active set (Section 4.1). Whether a weight rule or an edge rule can remove this at realistic N is open.

## 12. Conclusion

We have constructed a functional Ψ ∈ [0, 1) from an exponentiated effective action on the product space (Q × Q) × (model space) × (apparatus space). Every operand is dimensionless, bounded, and experimentally measurable. The Recognition Term F_gated is a smooth, symmetric two-point function on Q × Q. For a fixed model set and fixed redundancy partition, Ψ is continuous on the resulting domain. Globally, Ψ is piecewise continuous due to exactly two sources of jump discontinuity: (a) active-set transitions (η) and (b) redundancy-partition transitions (n_unique). Within each region where the discrete partition remains constant, Ψ is smooth. The redundancy control is bounded (Lemma 1). D̂ saturates.

Ψ is a score of how well two independent reconstructions of one state agree and how much that agreement is worth. At large N it is an entropy score scaled by a model count and a detector figure of merit, so it is not an entanglement witness. Running the paper's own tests in released code withdrew one prediction (P2, a negative result), restated one validation as a finite-sample law (V2, with a = 34.3 ± 0.1 in simulation against 34.32 from an asymptotically exact first-order calculation), showed that the former prediction P3 is a computable consequence of the measurement model (now validation V3, first order only for a suitable input, testable with about 3 × 10⁶ detected counts with projective measurements), showed that with the paper's weight rule C_eff counts estimator families, corrected two rules of Algorithm 1, and replaced the parameter table. The three validations and the quantum optics protocol form an implementable test suite for the weak claim, with the failure conditions collected in Section 8.3. No laboratory experiment has been run, and the limits in Section 10 state what a pass would and would not show. The product form is a chosen ansatz. What the paper offers is one specific, gated, redundancy-controlled, noise-weighted number, not a new principle. Appendix A outlines a speculative program exploring possible correlations with spacetime curvature.

## Code and Data Availability

The simulation code is released with the paper at https://github.com/JDOG332/educationrevelation/tree/main/paper/sim (commit 734a083; a snapshot of the code is deposited with this paper on Zenodo). It is written in Python and uses numpy and scipy. `python3 run_all.py` reproduces the Phase 1 results with the master seed 20261029; the results are written to `results/REPORT.md` (tables, with every parameter stated) and `results/results.json`. A second phase, `python3 run_phase2.py` (master seed 20261030), produces the finite-N check of Lemma 4, the floor law, the V3 design study and the C_eff map; its results are written to `results/phase2/REPORT2.md` and `results/phase2/results2.json`. A third phase, `python3 run_phase3.py` (master seed 20261031), produces the floor constant with 3000 runs per N, the locally rotated Bell and |00⟩ controls, the log-likelihood gap distributions and the small-angle V3 exponents; its results are written to `results/phase3/REPORT3.md` and `results/phase3/results3.json`. Unit tests are in `test_crt.py`. Every simulated number in Sections 3.1, 3.2, 4.1, 8 and 9.2 and Appendix B is produced by this code. The run count for the full V3 criterion (Section 8.1) is an estimate computed by hand from the tabulated values. The values in Section 3.1 for the effect of regularization at δ_reg = 10⁻⁶ are computed exactly from the spectra of the test states.

## Acknowledgments and Use of AI

The simulation code (paper/sim), both simulation phases and their reports, the proof sketch of Lemma 4, the floor-law derivation and the changes to Algorithm 1 adopted in v11 were produced by an AI system (Claude, Anthropic) at the author's direction and reviewed by a second, independent AI pass; earlier versions were drafted and reviewed with Claude, Gemini, ChatGPT and Grok. The author set the question, the decisions and the standard of honesty applied here, and takes responsibility for the content and any errors. AI systems are not authors.

AI review is not peer review: several editing residues and substantive errors survived it in earlier versions and are corrected in v11 (Appendix B.2).

## References

[1] Uhlmann, A. (1976). Rep. Math. Phys., 9(2), 273–279.
[2] Jozsa, R. (1994). J. Mod. Optics, 41(12), 2315–2323.
[3] Lin, J. (1991). IEEE Trans. Info. Theory, 37(1), 145–151.
[4] Nielsen, M.A. & Chuang, I.L. (2000). Quantum Computation and Quantum Information. Cambridge UP.
[5] James, D.F.V. et al. (2001). Phys. Rev. A, 64(5), 052312.
[6] Braunstein, S.L. & Caves, C.M. (1994). PRL, 72(22), 3439.
[7] Petz, D. (1996). Lin. Alg. Appl., 244, 81–96.
[8] Amari, S. & Nagaoka, H. (2000). Methods of Information Geometry. AMS.
[9] Shannon, C.E. (1948). Bell Syst. Tech. J., 27(3), 379–423.
[10] Bekenstein, J.D. (1973). Phys. Rev. D, 7(8), 2333.
[11] Einstein, A. (1915). "Die Feldgleichungen der Gravitation." Sitzungsber. Preuss. Akad. Wiss. (Berlin), 844–847.
[12] Tononi, G. (2008). Biol. Bull., 215(3), 216–242.
[13] Wilde, M.M. (2017). Quantum Information Theory (2nd ed.). Cambridge UP.
[14] Hartley, R. & Zisserman, A. (2003). Multiple View Geometry. Cambridge UP.
[15] Werner, R.F. (1989). Phys. Rev. A, 40(8), 4277.
[16] Ozawa, M. (2003). "Universally valid reformulation of the Heisenberg uncertainty principle on noise and disturbance in measurement." Phys. Rev. A, 67, 042105.
[17] Wehrl, A. (1978). "General properties of entropy." Rev. Mod. Phys., 50(2), 221–260.
[18] Endres, D.M. & Schindelin, J.E. (2003). "A new metric for probability distributions." IEEE Trans. Info. Theory, 49(7), 1858–1860.
[19] Audenaert, K.M.R. (2007). "A sharp continuity estimate for the von Neumann entropy." J. Phys. A: Math. Theor., 40(28), 8127.
[20] Touboul, P. et al. (MICROSCOPE Collaboration) (2022). "MICROSCOPE Mission: Final Results of the Test of the Equivalence Principle." PRL, 129(12), 121102.
[21] Jacobson, T. (1995). "Thermodynamics of Spacetime: The Einstein Equation of State." PRL, 75(7), 1260–1263. arXiv:gr-qc/9504004.
[22] Verlinde, E. (2011). "On the Origin of Gravity and the Laws of Newton." JHEP, 2011(4), 029. arXiv:1001.0785.
[23] Van Raamsdonk, M. (2010). "Building up spacetime with quantum entanglement." Gen. Rel. Grav., 42(10), 2323–2329. arXiv:1005.3035.
[24] Wheeler, J.A. (1990). "Information, Physics, Quantum: The Search for Links." In W.H. Zurek (ed.), Complexity, Entropy, and the Physics of Information. Addison-Wesley.
[25] Rovelli, C. (1996). "Relational Quantum Mechanics." Int. J. Theor. Phys., 35(8), 1637–1678.
[26] Whitehead, A.N. (1929). Process and Reality. Macmillan.
[27] Hegel, G.W.F. (1807). Phänomenologie des Geistes (Phenomenology of Spirit), ch. IV.
[28] Honneth, A. (1995). The Struggle for Recognition: The Moral Grammar of Social Conflicts. Polity / MIT Press. (German original 1992.)
[29] Utpaladeva. Īśvarapratyabhijñā-kārikā, with the author's vṛtti. Tr. R. Torella (1994; rev. 2002), Motilal Banarsidass. See also Kṣemarāja, Pratyabhijñāhṛdayam, tr. Jaideva Singh, "The Secret of Self-Recognition".
[30] Krippendorff, K. (2004). Content Analysis: An Introduction to Its Methodology (2nd ed.). Sage. See also Hayes, A.F. & Krippendorff, K. (2007), Communication Methods and Measures, 1(1), 77–89.
[31] Fleiss, J.L. (1971). "Measuring nominal scale agreement among many raters." Psychol. Bull., 76(5), 378–382.
[32] Will, C.M. (2014). "The Confrontation between General Relativity and Experiment." Living Rev. Relativ., 17, 4.
[33] Smolin, J.A., Gambetta, J.M. & Smith, G. (2012). "Efficient method for computing the maximum-likelihood quantum state from measurements with additive Gaussian noise." PRL, 108, 070502.
[34] Hradil, Z. (1997). "Quantum-state estimation." Phys. Rev. A, 55, R1561.
[35] Řeháček, J., Hradil, Z., Knill, E. & Lvovsky, A.I. (2007). "Diluted maximum-likelihood algorithm for quantum tomography." Phys. Rev. A, 75, 042108.
[36] Fuchs, C.A. & van de Graaf, J. (1999). "Cryptographic distinguishability measures for quantum-mechanical states." IEEE Trans. Info. Theory, 45(4), 1216–1227.
[37] Wootters, W.K. (1998). "Entanglement of formation of an arbitrary state of two qubits." PRL, 80, 2245.
[38] Peres, A. (1996). "Separability criterion for density matrices." PRL, 77, 1413.
[39] Horodecki, M., Horodecki, P. & Horodecki, R. (1996). "Separability of mixed states: necessary and sufficient conditions." Phys. Lett. A, 223, 1–8.
[40] Renes, J.M., Blume-Kohout, R., Scott, A.J. & Caves, C.M. (2004). "Symmetric informationally complete quantum measurements." J. Math. Phys., 45, 2171.

## Appendix A: Speculative Extensions: GR Bridge Hypothesis

*Disclaimer:* The following section is a purely speculative theoretical extension. Terrestrial curvature variations are extremely small: for the Schwarzschild field at Earth's surface, √K = √48 · GM/(c²r³) ≈ 1.2 × 10⁻²² m⁻². This makes spatial transport of the global prior Γ = C_eff · D̂ an extreme experimental challenge. The extension requires the large speculative leap that Ψ acts as a single-valued function of √K with no latent dependencies, an assumption the operational pipeline does not currently motivate. No mechanism is identified by which curvature would alter the agreement of two reconstructions of one photon stream (Section 10.7). This hypothesis operates independently of the validations (V1, V2, V3) in the main text, and it does not gate the weak claim.

Speculatively, convergent recognition may serve as a pre-force attractor: an informational precondition from which physical interactions emerge as geometric structure. The bridge hypothesis below formalizes one testable consequence of this framing. This framing is a motivation, not a claim. Any literal reading of it as gravity is bounded by the equivalence principle (Section 10.2).

### A.1 Spacetime Embedding

*Embedding Assumption:* The density operators ρ₁(x^μ) and ρ₂(x^μ) vary smoothly with strictly operational physical coordinates (e.g., proper height in a gravitational potential, proper time). Under this assumption, Ψ(x^μ) is a scalar field on the physical manifold. Ψ is smooth only on spacetime regions where the redundancy partition n_unique remains constant. Elsewhere it is piecewise smooth, with threshold discontinuities.

*A priori assumption:* Ψ is a single-valued function of √K on the connected experimental region, with no additional latent dependencies beyond C_eff and D̂, which are held constant.

### A.2 Bridge Hypothesis

Stated primarily for the Recognition Term:

```
∇_μ F_gated ≈ α · ∇_μ √K                   (Eq. A1 – GR Bridge, Recognition Term)
```

Under the experimental constraint of constant C_eff and D̂ across spatial locations, Ψ inherits this proportionality:

```
∇_μ Ψ ≈ α · ∇_μ √K                         (Eq. A2 – GR Bridge, Global Functional)
```

Here K = R_μνρσ R^μνρσ is the Kretschmann scalar of general relativity [11] (the full contraction of the Riemann tensor with itself), and √K has units of 1/L². Unlike the Ricci scalar R, which vanishes in vacuum, K is nonzero in the Schwarzschild vacuum; it does not detect all curvature (it vanishes for pp-waves). α is an empirical constant with units of length squared (L²). [Dimensional check: ∇_μ Ψ is 1/L, and ∇_μ √K is 1/L³. Therefore α has units L².]

A bounded scalar relation consistent with Eq. A2, respecting the [0, 1) bound of the functional, is for example:

```
Ψ = 1 − 2^(−(α · √K + C_int))
```

Here C_int is a dimensionless constant and α > 0. This maps the curvature scalar into the [0, 1) range via the same exponential structure as the main functional. It is a modeling ansatz, not a derivation. Alternative bounded link functions or nonlinear relationships are possible and would require independent empirical discrimination.

*Caveat on this form.* Read globally, the link function fixes Ψ in flat spacetime (K = 0) to the constant 1 − 2^(−C_int). That conflicts with the main text, where Ψ varies with state, flux and model set. The form should therefore be read only as a local relation about a fixed reference configuration (fixed state, apparatus and model set), with C_int absorbing that configuration. It is not a global formula for Ψ.

### A.3 Realism and Feasibility

Terrestrial curvature variations are extremely small (√K ≈ 1.2 × 10⁻²² m⁻² near Earth's surface). Any detectable variation in the global reliability modulator Γ across spatial locations is therefore an extreme experimental challenge, far beyond current technology. Candidate testbeds, if feasible, would include large altitude gradients, space-based platforms, or analog gravity systems.

*Apparatus constraint:* The GR bridge requires an apparatus-invariant normalization protocol. Without one, the spatial transport of Γ = C_eff · D̂ remains a conceptual modeling constraint rather than a directly measurable prediction.

### A.4 Speculative Prediction

**PA1 (GR Bridge).**
- *Observable:* ∇Ψ and ∇√K.
- *Setup:* Vary proper height near a massive body.
- *Controls:* Hold C_eff, D̂, observer quality, and the model set fixed across spatial locations.
- *Prediction:* A statistical correlation between ∇Ψ and ∇√K.
- *Failure:* No significant correlation. Absent a mechanism (Section 10.7), this null is the expected outcome.

This prediction is independent of V1, V2 and V3.

### A.5 Test Design: Asymmetry in Excess of a Disturbance Bound

v10.0 (its Appendix C, "Ozawa anomaly filter") proposed that the measurement noise and disturbance of the apparatus be measured daily, and that an asymmetry |Ψ₁₂ − Ψ₂₁| (Section 7, V3) exceeding the Ozawa bound by 5σ be read as detection of the GR bridge. v11 keeps the test design as a stated hypothesis test and does not adopt that reading.

- *Hypotheses.* H₀: |Ψ₁₂ − Ψ₂₁| ≤ B, where B is a reference bound computed from the measured noise ε_O and disturbance η_O of the instrument and from ||[O₁, O₂]||∞. H₁: the asymmetry exceeds B. (The subscript O keeps these symbols apart from the gate constant ε and the active-weight threshold η.)
- *The bound must be stated before the test.* Ozawa's relation [16] is a lower bound on the error and disturbance of a measurement. It does not by itself give an upper bound on |Ψ₁₂ − Ψ₂₁|. B must therefore be written down as an explicit function, with its derivation or its calibration, before any data are taken. Neither v10.0 nor this paper supplies it.
- *Threshold.* 5σ, with σ the standard error of the asymmetry estimated by the bootstrap of Algorithm 1. Repeated daily tests need a correction for multiple comparisons.
- *Mundane causes to exclude first.* An excess asymmetry has many ordinary causes, and each must be excluded before any other reading is considered: detector efficiency drift between the O₁O₂ and O₂O₁ runs; drift in state preparation between those runs; finite-sample bias of the estimators, which need not be the same for ρ₁₂ and ρ₂₁; a change in n_active or n_unique between the runs (a threshold artifact, Section 8.3); a change in D̂ between the runs; and miscalibration of the measurement strength γ.
- *Status.* A rejection of H₀ that survives these exclusions would show only that the asymmetry is not accounted for by B. It would not show a link to curvature: the test contains no curvature variable, and no mechanism connects the two (Section 10.7). This is a test design, not a detection of anything. Like PA1, it has no bearing on the weak claim.

## Appendix B: Numerical Sensitivity and Version History

### B.1 Parameter Sensitivity Table (regenerated)

*Parameters.* Product SIC-POVM (16 outcomes, d = 4). N = 10⁴ counts per batch; batches A and B disjoint and independent. 20 seeds per state. ε = 10⁻⁸, δ_reg = 10⁻⁶ (applied to every reconstruction), η = 10⁻⁶, H_min = 10⁻⁶, τ = 1. D̂ = 0.95 fixed (D = 1900, D_ref = 100 counts per window), because this table concerns the state, not the detector. Pipeline 1: linear inversion with Smolin–Gambetta–Smith PSD projection (LI-PSD) on batch A. Pipeline 2: RρR MLE on batch B (at most 20000 iterations, tolerance 10⁻¹¹). The same two estimators, applied to the pooled counts (2N), are the n = 2 models of C_eff, with weights from 5-fold cross-validated log-likelihoods. Redundancy by Algorithm 1 with two independent resamples per iteration (the primary rule, Section 3.2), B = 20 iterations (reduced from 1000 for runtime; bootstrap MLE fits at most 3000 iterations, tolerance 10⁻¹⁰), and v8.7's edge rule (strict test JSD < max(δᵢ, δⱼ)). Under the v11 rule (JSD ≤ min(δᵢ, δⱼ)) every row of the primary table is unchanged, because wherever both models are active their JSD (at most about 10⁻⁶ bits) is far below both δᵢ (3.4 × 10⁻⁴ to 4.3 × 10⁻⁴ bits for those states), and for the Bell state only one model is active.

*Columns.* I(ρ) exact: informativeness of the true state. G_ε (infinite N): (I(ρ) + ε)/(1 + ε). Ψ_∞ upper: G_ε(ρ̃) · D̂, the upper bound on the population Ψ at D̂ = 0.95 with C_eff = 1 (since F ≤ 1 and C_eff ≤ 1). Ψ̂ can exceed it by O(a/N), because the finite-sample Î exceeds I(ρ). Ψ̂ nominal: mean ± SD over seeds. Max |ΔΨ̂|: for each seed, the largest deviation from that seed's nominal Ψ̂ over the sweep (same data and reconstructions; only ε or δ_reg changes), then the worst seed. ε sweep: 10⁻¹⁰ to 10⁻⁶. δ_reg sweeps: 10⁻⁸ to 10⁻⁴, and the narrower 10⁻⁷ to 10⁻⁵. Stable: both full sweeps below 10⁻⁵ for every seed.

| State | I(ρ) exact | G_ε (infinite N) | Ψ_∞ upper (population, C_eff = 1) | Ψ̂ nominal (mean ± SD) | C_eff | Max \|ΔΨ̂\|, ε sweep | Max \|ΔΨ̂\|, δ_reg 10⁻⁸ to 10⁻⁴ | Max \|ΔΨ̂\|, δ_reg 10⁻⁷ to 10⁻⁵ | Stable? |
|---|---|---|---|---|---|---|---|---|---|
| Bell \|Φ⁺⟩ (aligned, Section 9.2) | 1.0000 | 1.0000 | 0.9500 | 0.9175 ± 0.0138 | 1 | 4.0 × 10⁻⁸ | 7.2 × 10⁻⁴ | 2.5 × 10⁻⁴ | No |
| Werner p = 0.8 | 0.5762 | 0.5762 | 0.5474 | 0.2754 ± 0.0052 | 1/2 | 2.1 × 10⁻⁷ | 6.1 × 10⁻⁵ | 5.5 × 10⁻⁶ | No |
| Werner p = 0.2 | 0.0390 | 0.0390 | 0.0371 | 0.0197 ± 0.0023 | 1/2 | 4.6 × 10⁻⁷ | 4.8 × 10⁻⁶ | 4.4 × 10⁻⁷ | Yes |
| Separable mixed (\|00⟩⟨00\| + \|11⟩⟨11\|)/2 | 0.5000 | 0.5000 | 0.4750 | 0.2189 ± 0.0103 | 1/2 | 2.6 × 10⁻⁷ | 1.2 × 10⁻⁴ | 4.1 × 10⁻⁵ | No |
| Maximally mixed 𝟙/4 | 0 | 1.0 × 10⁻⁸ | 9.5 × 10⁻⁹ | 0.0015 ± 0.0004 | 1/2 | 5.9 × 10⁻⁷ | 4.4 × 10⁻⁷ | 4.0 × 10⁻⁸ | Yes at 10⁻⁵; no at the 10⁻⁷ v8.7 claimed |

*Findings.*
1. **The v8.7 nominal values 0.71 and 0.28 for the Werner states are impossible for the population Ψ under Eqs. 4–6.** I(Werner 0.8) = 0.5762 and I(Werner 0.2) = 0.0390 exactly, so Ψ ≤ G_ε · D̂ = 0.5474 and 0.0371 at D̂ = 0.95, and Ψ ≤ 0.58 and 0.04 for any D̂ < 1. At N = 10⁴, Ψ̂ exceeds these bounds by at most about 0.004 (through R̂₁₂ > G_ε; for Werner 0.8, R̂₁₂ = 0.5797 against G_ε = 0.5762). The values 0.71 and 0.28 match the purities Tr ρ² = 0.73 and 0.28. The regenerated values are 0.2754 ± 0.0052 and 0.0197 ± 0.0023. The v8.7 entry "~ε" for the maximally mixed state is the ideal floor; the finite-N value is 0.0015 (Section 8.1, V2).
2. **ε sweep.** It satisfies the 10⁻⁵ bound for every state, but not the 10⁻⁷ bound v8.7 claimed for 𝟙/4 (5.9 × 10⁻⁷).
3. **δ_reg sweep.** The sweep to 10⁻⁴ breaks the 10⁻⁵ bound for the Bell, Werner 0.8 and separable states, because I(ρ̃) changes at first order in δ_reg with a coefficient of order 1 (Section 3.1). This is not specific to near-pure states. No run changed its redundancy partition during the sweep; the whole effect is in R̂₁₂. The claim of Section 3.1 is therefore narrowed to δ_reg = 10⁻⁶ itself, where the effect is negligible.
4. **C_eff takes only the values 1/2 and 1 with two models.** For every full-rank state, and for the rank-2 separable state (JSD 9.5 × 10⁻⁷ bits), the two estimators are merged (n_unique = 1, C_eff = 1/2) in all 20 runs. For the aligned Bell state n_active = 1 in all 20 runs (C_eff = 1). C₀ stays within 10⁻⁵ of 1.
5. **Pipeline pairing.** With MLE on both batches, the Bell row becomes 0.9496 ± 0.0002. The separable row moves by 6 × 10⁻⁴ (0.2183 ± 0.0102), well within its SD, and the other rows are unchanged, because for full-rank states LI-PSD and MLE coincide (Section 4.1).
6. **The Bell row is a SIC-alignment artifact.** It is for |Φ⁺⟩ aligned with the SIC as in Section 9.2, where four outcomes have probability zero and the MLE beats linear inversion by tens of nats, so n_active = 1. Any generic local rotation gives n_active = 2, n_unique = 1 and Ψ̂ = 0.438 to 0.450 at N = 10⁴ (Section 4.1).

*Literal reading of Algorithm 1 (one resample, two starts; sensitivity check, not the definition).*

| State | Ψ̂ nominal (mean ± SD) | mean C_eff | runs with n_unique = 1 | Max \|ΔΨ̂\|, δ_reg 10⁻⁸ to 10⁻⁴ |
|---|---|---|---|---|
| Bell \|Φ⁺⟩ | 0.9175 ± 0.0138 | 1 | (n_active = 1 in 20 of 20) | 7.2 × 10⁻⁴ |
| Werner p = 0.8 | 0.2894 ± 0.0646 | 0.525 | 19 of 20 | 0.28 |
| Werner p = 0.2 | 0.0215 ± 0.0057 | 0.550 | 18 of 20 | 0.025 |
| Separable mixed | 0.4179 ± 0.0765 | 0.950 | 2 of 20 | 2.4 × 10⁻⁴ |
| Maximally mixed 𝟙/4 | 0.0018 ± 0.0009 | 0.575 | 17 of 20 | 2.1 × 10⁻³ |

Under the literal reading the redundancy decision is made by round-off, n_unique flips between 1 and 2 at random, and Ψ̂ jumps by a factor of 2 between runs and within the δ_reg sweep (up to 0.28 for Werner p = 0.8). This is why Algorithm 1, step 1, is stated with two independent resamples.

### B.2 Version History

*Dates.* v8.7 (2026-02-22), v9.1 (2026-02-22), v9.9 (2026-02-24) and v10.0 (2026-02-24) carry dates in their sources. Earlier versions are recorded as 2026, undated, in the order of revision.

- **v1 (2026, undated):** Initial formulation. Inverse density paradox identified.
- **v2 (2026, undated):** Logarithmic correction. Planck-scale D₀ untestable.
- **v3 (2026, undated):** Fidelity, JSD, empirical D_ref. Commutator constraint.
- **v4 (2026, undated):** Geometric action. Informativeness gate. Redundancy control.
- **v5 (2026, undated):** GR bridge hypothesis restored with geometric justification.
- **v6.0–6.8 (2026, undated):** Kretschmann scalar replaces Ricci. Bounded D̂. Smooth gate normalized. Base-2 lockdown. Bootstrap-calibrated n_unique. Full-rank regularization. Disjoint batch partitioning. Operational validation separated from predictions. GR bridge moved to speculative appendix.
- **v7.0 (2026, undated):** Peer-review formatting. Title page. Gate corrected. Density rebranded. GR bridge to Appendix A.
- **v7.1 (2026, undated):** Section 4 added. Parameter sensitivity. Cross-family clustering. Lemma 2 restored. P3 scaling ansatz. V1 stationarity.
- **v7.2 (2026, undated):** Title de-escalated. Smoothness qualified. Parameter sensitivity softened. Algorithm 1 refined. D̂ disclaimer. Shannon–Khinchin cited. JSD n = 2 scope. Step 5 calibration. Conclusion trimmed.
- **v7.3 (2026, undated):** Ψ piecewise smooth. Thresholds reconciled. Shannon/D̂ softened. P_rec defined. P3 empirical. P2 Werner. SIC-POVM specified.
- **v7.4 (2026, undated):** Professional tone. Smoothness propagated. Algorithm 1 refined. Complexity penalty. P1 floor corrected. P3 regime defined. Appendix A ansatz disclaimer.
- **v7.5 (2026, undated):** Data-independent pipelines. D̂ action domain. Notation unified. Phase transition control. Conditional C_eff. CV seed fixed. P2 simulation grounded. Appendix A smoothness disclaimed. Lemma 1 reachability.
- **v7.6 (2026, undated):** Two-point function. H(w) normalization. Graph clustering. Flux sensitivity. Principled ansatz. Endres [18]. Sensitivity table.
- **v7.7 (2026, undated):** Piecewise continuous globally. n_active invariance. Checklist JSD/H(w). γ POVM family. Trace-distance bound. Persistence rule. Eqs. 1–15.
- **v7.8 (2026, undated):** Lemma n_active scrub. η defined. Diameter constraint. Lüders instrument. P2 entropy-matched. Audenaert–Fannes scoped. Gate interpretation honest.
- **v7.9 (2026, undated):** (Q × Q) domain. Zero set. Renormalization. H_min guard. Complete-linkage. Redundancy penalty. Audenaert [19]. PPT. Hermitian P3. GR apparatus constraint.
- **v8.0 (2026, undated):** Two-point intro. Agglomerative clustering. Regulated JSD. Lin citation added (numbered [20] at the time; merged into [3] in v8.4). Non-selective channel. PPT 2 × 2. Hardware scoped.
- **v8.1 (2026, undated):** Zero-set fixed. H_min smooth. w_raw/w_active. Connected components. Scoped bias. Protocol C_eff global. Region-of-constancy. P2 Spearman.
- **v8.2 (2026, undated):** Lemma 1 floor. Clique clustering. Hybrid independence. P2 flux stabilized. P3 quantitative. Persistence moved to protocol.
- **v8.3 (2026, undated):** Modular Ψ = R₁₂ · G (now Γ). Q manifold. P_mix. Agglomerative clustering. Axioms. Epistemic gate. C_eff floor. P3 conjecture. Firewall.
- **v8.4 (2026, undated):** Operational reframe. Softened axioms. Q scrubbed. P2 State-Family Sensitivity. Detection Quality Weight. Lin merged. Appendix qualitative.
- **v8.5 (2026, undated):** G/Q collision fixed. Gate asymptote ε. Proposition. Smoothness carved. P1 → V2. Bounded GR link.
- **v8.6 (2026, undated):** Prediction count. Softened opening. Remark. Finite-sample distinction. Pairwise thresholds. Diagnostics mandated. β scoped. Single-valued disclosed.
- **v8.7 (2026-02-22):** Exponent typo eradicated: 2^(−S_eff) caret notation throughout (cannot be misread as subtraction). Ideal vs implemented zero-locus: the theoretical Ψ has strict zeros; the implemented Ψ̂ has O(ε, δ_reg, H_min) floors. Softmax weights: w_raw,i = exp(LLᵢ/τ) / Σ exp(LLⱼ/τ), τ = 1. Clustering reverted to graph connectivity: connected components with transitive closure (polynomial, deterministic, no dendrogram ambiguity). P3 calibration: small-commutator pair (θ ≤ 0.2 rad), not σ_x/σ_y. P2 control recipe: purity and entropy matching within 10⁻⁴ tolerances. Ψ̂ piecewise due to discrete selection rules; regulated normalization smooth in inputs. C_eff bound standardized to (0, 1] throughout.
- **v9.1 (2026-02-22):** Operational reframe: Ψ = F_gated · C_eff · D̂ as an operational convergence metric, "not presented as a new physical invariant". Minimal protocol. Two validation tests. Limitations listed (not a physical invariant, piecewise behavior, estimator-set dependence, normative gate). No GR bridge appendix.
- **v9.9 (2026-02-24):** Draft prepared with Grok (xAI), same content as v10.0. Appendix A kept ∇Ψ ≈ α · ∇√K and the spelling Kretschmann. LaTeX artifacts throughout.
- **v10.0 (2026-02-24):** Hardening release. Fail-fast guard (cond(ρ) > 10³ rejects). χ²/G-test redundancy edges (2N · JSD < χ²₀.₉₅(15) ≈ 25.0). AIC-corrected weights. Flux normalization Ψ/Ψ_cal. Ozawa 5σ anomaly filter. Python reference code. Errors noted under v11.0.
- **v11.0 (October 2026):** Base: v8.7 (the full treatment), with the v10.0 hardening folded in, the paper's tests run for the first time, in three phases, in simulation code released with the paper, and an independent review of the draft against the code applied (Phase 3 answers that review). The definitions of Ψ, its factors and its thresholds are those of v8.7, except the two Algorithm 1 rules below. Changes:
  - **Results of the released simulation:**
    - *Lemma added:* Lemma 4 (Section 4.1), the large-N limit of Ψ̂ as an entropy score scaled by a model count and CAR/(1 + CAR), with the corollary that Ψ is not an entanglement witness; checked at finite N on 12 matched-spectrum pairs (no pair separates at N = 10³ to 10⁶). Pure states at N = 10⁴ shown not to be invariant under local unitaries; the B.1 Bell row identified as a SIC-alignment artifact (Phase 3).
    - *P2 withdrawn as a negative result:* the matched separable control (Werner spectrum on the product-basis diagonal, PPT, matched to 10⁻¹⁵) gives the same Spearman correlation and no significant separation at any p < 1; the p = 1 difference is a threshold artifact. The v8.7 failure condition is met; the prediction is withdrawn, not reinterpreted. The v8.7 control recipe (product states) does not work for 0.10 ≤ p ≤ 0.95 (Section 8.2). Test E becomes a check of Lemma 4.
    - *V2 restated as the finite-sample floor law:* R̂₁₂ = a N⁻¹ (1 + o(1)), with a = 34.3 ± 0.1 (Phase 3, 3000 runs per N: 34.27 ± 0.08 over N ≥ 10⁴; first-order theory 34.32, asymptotically exact; the first 100-seed fit gave 33.3 ± 0.3, a low draw); the ideal floor ε/(1 + ε) is a limit; v8.7's failure condition replaced (Section 8.1). Test B updated.
    - *P3 relabelled V3:* a computable consequence of the Lüders rule and Lemma 4, not an empirical conjecture. Input state and operators named (v8.7 named neither); regime fixed as θ ≤ 0.2 rad (v8.7 gave both θ ≤ 0.2 rad and ||[O₁, O₂]||∞ ≤ 0.2, which differ by a factor of about 2); observable defined on the signed difference of run means; first order only for the tilted input; zero for a Bell input; predicted slope β/(r_∞ · D̂) = −0.2204 (Phase 3); small-angle exponents k = 1.005 (tilted), 1.999 (|+⟩|0⟩), 1.995 (cos(π/8) state), 1.999 (tilted with O₁ = σ_y); full test about 3 × 10⁶ detected counts with projective measurements, 2.4 × 10⁵ for the slope alone. v8.7's "β frozen for out-of-sample testing of other operator pairs" deleted, because Δ_Ψ is not a function of the commutator norm alone (Sections 7, 8.1, 9.2 Step 5).
    - *Algorithm 1 clarified:* step 1 uses two independent resamples per iteration, not two starts on one resample (Section 3.2, Appendix B.1).
    - *Protocol:* pipelines named in Step 1; the r_red discontinuity at N = ∞ under v8.7's strict edge test recorded (Section 9.2); mandated diagnostics collected in one list (Section 9.2); calibration state and SIC alignment for Ψ̂_cal specified; preparation of the V3 input and implementation of its measurements described.
    - *C_eff map:* with τ = 1 and two to four standard estimators, C₀ ≈ 1 and C_eff = 1/n_active; adding a correct estimator lowers Ψ̂ (Section 9.2).
    - *Appendix B.1 regenerated from released code:* old Werner values shown impossible for the population Ψ; ε claim for 𝟙/4 not met; δ_reg claim narrowed to δ_reg = 10⁻⁶ (Sections 3.1, 3.4); C_eff two-valued; pipelines stated; "Ψ upper" column renamed "Ψ_∞ upper (population, C_eff = 1)", since Ψ̂ can exceed it by O(a/N); literal-reading table added.
    - *Code released:* Code and Data Availability section added (Phase 1, `run_all.py`; Phase 2, `run_phase2.py`; Phase 3, `run_phase3.py`; commit 734a083).
    - *Framing:* abstract and Section 1 state what Ψ measures, its large-N form, and that nearly all variation in Ψ̂ is the entropy gate; Section 10 opens with what Ψ is not; Open Questions 5 to 11 updated; Conclusion updated.
  - **Changes to v8.7's rules, with reasons.** The released numbers were produced under v8.7's rules read as stated; change 2 is a recommendation that the next code release will implement.
    1. *Algorithm 1, step 1:* two independent resamples per iteration. Reason: the one-resample reading sets δᵢ by round-off; n_unique = 1 then occurred in 19, 18, 2 and 17 of 20 runs for Werner 0.8, Werner 0.2, the dephased Bell state and 𝟙/4, and the δ_reg sweep moved Ψ̂ by up to 0.28 instead of 6 × 10⁻⁵ (3.2, B.1).
    2. *Algorithm 1, step 3:* δᵢⱼ = min(δᵢ, δⱼ) with the non-strict test JSD ≤ δᵢⱼ, replacing max(δᵢ, δⱼ) with JSD < δᵢⱼ. Reason: with max one unstable model sets the tolerance for every pair (rank-1 MLE, δ = 0.126 bits against 3.8 × 10⁻⁴ for 𝟙/4); with the strict test exact duplicates are not merged at N = ∞, so r_red jumps from 1/2 to 1 there. No number in Section 8 or Appendix B changes (3.2, 9.2).
    3. *Weights:* τ = 1 kept. Stated plainly that the weights are one-hot when the log-likelihood gap exceeds 13.8 nats (aligned Bell state: median gap 62 nats) and that C_eff reduces to n_unique/n_active; the fix is left to a future version (3.2, 9.2, Open Question 7). K = 5 folds with random per-event assignment written into the definition.
    4. *V2:* the floor law R̂₁₂ = a N⁻¹ (1 + o(1)), a = 34.3 ± 0.1 for the stated pipeline, replaces F_gated ≈ ε/(1 + ε). Failure: for a source with independently bounded I(ρ) < 0.1 · a/N_max, the 95% interval of a (b = 1, N ≥ 10⁴) outside [31, 37] (a stated tolerance) or that of b excluding 1, over two decades of N with 30 runs per N. Reason: the ideal floor is reached only near N ≈ 3 × 10⁹, and v8.7's failure condition was met by every finite-N implementation; a thermal source with I₀ = 2.9 × 10⁻⁴ must be fitted with I₀ in the model (then b = 0.9964 ± 0.0040) (8.1, 9.3 Test B).
    5. *Regularization:* the deterministic δ_reg offsets are stated in place of the blanket 10⁻⁵ bound. Reason: the bound fails for δ_reg above 10⁻⁶ (3.1, 3.4).
    6. *P3 → V3:* tilted input named, projective calibration (γ = 1, was 0.5), θ ≤ 0.2 rad, signed difference of run means, slope within 20 percent of the predicted −0.22 · r_∞ · D̂, and the log-log exponent test k ∈ [0.9, 1.1] in place of R² > 0.9. Reasons: at γ = 0.5 a 5σ test needs about 10¹⁰ counts; the mean per-run absolute difference has a noise floor of 1.13 SD; a second-order asymmetry passes R² > 0.9 (8.1, 8.3, 9.2 Step 5).
    7. *P2:* replaced by Lemma 4; the matched separable family is a check of the lemma, not a test of entanglement (4.1, 8.2, 9.3 Test E).
    8. *V1:* likely mis-specified in v8.7 (not simulated). Under pump attenuation SPDC accidentals scale as P² and coincidences as P, so CAR and D̂ rise as the pump is attenuated; under loss attenuation CAR is roughly flat until dark counts dominate; and since D̂ is computed from the measured rates, "Ψ falls with D̂" is an identity. Replaced by the test that Ψ̂/D̂ is constant across at least one decade of CAR (8.1, 9.3 Test D).
  - **Mathematical corrections:**
    - Lemma 2 was false as stated: two models with P_A = (0.97, 0.01, 0.01, 0.01) and P_B its reverse give C_eff = 0.101; adding a merged duplicate of A raises C₀ to 0.481 and C_eff to 0.321. The hypothesis that C₀ does not increase by more than (n_active + 1)/n_active (true when all JSD_w ≈ 0) is added.
    - Axiom 3 (monotonicity in model consensus) is false: merging divides C_eff by up to n_active; rewritten.
    - "Zeros can occur in the interior of state space (e.g., orthogonal states)" was wrong: F = 0 only on the boundary; after regularization Ψ̂ > 0 whenever D̂ > 0.
    - "(F, C_eff, D̂) are individually continuous" conflicted with the piecewise continuity of C_eff; corrected.
    - Lemma 3 now states the necessary conditions for Ψ → 1 and the bound Ψ ≤ D̂/n_active when all active models are merged.
    - Lemma 4 stated with the limit in closed form; hypothesis (b) stated as the state-independence of the discrete part; proof step (ii) applied to the regularized estimate. "Proves" and "settled" replaced by "sketches" and "argued".
  - **Text corrections relative to v8.7 (formerly inline notes):**
    - The sentence on S_eff ≥ 0, orphaned after the Domain paragraph in v8.7, moved next to Eq. 1.
    - 3.1: v8.7 read "where As purity approaches maximum", an extraction or editing residue. The sentence "This permits the gradient computations required by the GR bridge hypothesis" replaced by "and makes Ψ differentiable there".
    - C₀ range written (0, 1] at Eq. 10 and in the checklist, matching Lemma 1; v8.7 gave [0, 1] at both places.
    - The redundancy graph and the global factor, both written G in v8.7, are written 𝒢 and Γ; the redundancy ratio, written R, is r_red; the dual frame is Ď_k; the identity is 𝟙; the V3 asymmetry is Δ_Ψ.
    - 6.1: v8.7's statement of operational equivalence with QEC figures of merit had no citation and is withdrawn; the Bayesian and stereopsis analogies are reduced to one sentence with no claim. Section 1: "information inaccessible to either alone" softened.
    - 4: "Shannon Informativeness" renamed "Von Neumann Informativeness".
    - P3 (now V3): v8.7 read "we we hypothesize" and repeated "in the small-commutator regime"; v8.7 held γ = 0.5 and used R² > 0.9; failure was "uncorrelated, nonlinear, or R² ≤ 0.9".
    - Step 5: v8.7 read "a an operator pair" and did not name the input state or the operators.
    - Test B: v8.7 read "≈ ε" (matched to ε/(1 + ε) in v11, then replaced by the floor law). Test E: v8.7's E was the laboratory form of P2.
    - Open Question 5: v8.7 read "(P1–P3, V1)"; P1 has been V2 since v8.5, P2 is withdrawn, and P3 is V3.
    - Appendix A: v8.7 gave √K ~10⁻²³ m⁻² at Earth's surface (≈ 1.2 × 10⁻²² m⁻²; conclusion unchanged); "modulator Q" in A.3 was a residue of the G/Q collision fixed in v8.5; A.4 read "independent of P1–P3"; P2 removed from the lists of main-text claims. "Tracks tidal curvature everywhere" removed (K vanishes for pp-waves), and the "integrating" language replaced: the bounded link is an example consistent with Eq. A2, not an integral of it. A.5 cites V3 (formerly P3) and "bootstrap" (formerly "block bootstrap").
    - B.1: v8.7's caption said "MLE reconstruction" without naming the second pipeline or the second model.
    - Algorithm 1: "block bootstrap" replaced by "bootstrap (multinomial resample of the pooled counts; a single setting)"; JSD in Algorithm 1 stated to be equal-weight.
    - "Coherence functional" and "density contrast" replaced by "functional" and "D̂" where used as descriptors.
    - Dangling P1 references; "Lin [20]" (v8.0 entry); abstract prediction count matched to the text.
  - **References:** [16] corrected to Phys. Rev. A 67, 042105 (2003) (v8.7 gave PRL 91, 260401); [4], [5], [8] to [13] and [15] now cited in the text; [33] to [40] added (Smolin–Gambetta–Smith, Hradil, Řeháček et al., Fuchs–van de Graaf, Wootters, Peres, Horodecki, Renes et al.).
  - **Notation:** global factor renamed Γ (written G up to v8.7); redundancy graph renamed 𝒢; nats in the softmax stated.
  - **Status statements:** the product form is stated to be a chosen ansatz; the softmax one-hot risk at large N and its detection by the mandated diagnostics are noted; D̂ is identified as CAR/(1 + CAR).
  - **New sections:** Related Work (1.1); Entropy Dependence (4.1); What Would Falsify the Weak Claim (8.3); Limits and Known Objections (10), covering what Ψ is not, dimensional status, the equivalence-principle bound, and the status of evidence; Code and Data Availability.
  - **Appendix A:** Earth-surface √K corrected; caveat on the link function in flat spacetime; no-mechanism note.
  - **Title:** changed from "Convergent Recognition Theory: A Geometric Coherence Functional for Information Geometry" to "Convergent Recognition Theory: Ψ, an operational agreement score for independent quantum-state reconstructions". Reason: the old subtitle described Ψ as a coherence functional for information geometry; v11 shows that Ψ is an operational agreement score whose large-N limit is an entropy score scaled by a model count and a detector figure of merit (Lemma 4), and that no result in the paper is a contribution to information geometry. The name Convergent Recognition Theory is kept.
  - **Front and back matter (how this version was written):** author line "Jeffrey M. Sellers, Oakwood, Ohio"; version history dated; the use of AI disclosed in full in "Acknowledgments and Use of AI" (simulation code, both simulation phases and their reports, the proof sketch of Lemma 4, the floor-law derivation and the Algorithm 1 changes produced by Claude (Anthropic) at the author's direction and reviewed by a second, independent AI pass; earlier versions drafted and reviewed with Claude, Gemini, ChatGPT and Grok, including Grok (xAI) for the v9.9 draft); AI systems are not authors.
  - **Folded in from v10.0:**
    - χ²/G-test edge criterion as a fast screen beside the bootstrap calibration of Algorithm 1; the bootstrap stays the default, and both feed connected-components clustering (3.2, Algorithm 1, step 3).
    - Condition number of the unregularized reconstruction reported and flagged above 10³; v10.0's automatic rejection not adopted, because after regularization cond is capped near 4 × 10⁶ by δ_reg and at 10³ the guard rejects near-pure states, including the Bell calibration state (9.2, Step 1).
    - Ψ_norm = Ψ/Ψ_cal as an optional apparatus-level reporting convention, outside the definition of Ψ; it does not keep Ψ < 1 (9.2, Step 4; 10.5).
    - AIC-corrected weights recorded as equal to v8.7's softmax when parameter counts are equal, as in the protocol; v8.7's rule kept as the definition (3.2).
    - The Ozawa anomaly filter moved to Appendix A as a hypothesis-test design with mundane causes to exclude; v10.0's reading of an excess as detection of the GR bridge not adopted (A.5).
  - **Folded in from v9.1:** the "not a new physical invariant" framing and its four limitations (10.9).
  - **Errors in v10.0, not carried over:**
    - "Kretschner" is a misspelling of Kretschmann.
    - ∇Ψ ≈ α · ∇K dropped the square root that v8.7 and v9.9 had (∇√K). With K in units of 1/L⁴, it would also give α units of L⁴ instead of L².
    - C_eff was written (1 − JSD_w) · r_red, without the H(w) + H_min normalization of Eq. 9. Since JSD_w can reach H(w), that form can reach 0 for n_active = 2 and go negative for n_active ≥ 3, where H(w) can exceed 1 bit. Either leaves (0, 1].
    - The gate was written √[(I₁ + ε)(I₂ + ε)/(1 + ε)], with (1 + ε) inside the root. That form reaches √(1 + ε) > 1. Eq. 5 is kept.
    - The code left R₁₂ and the return value as comments, so it does not compute Ψ.
    - The global factor was written G again; v11 keeps Γ.
  - **Not carried over from v10.0 (no definition or derivation given):** the "parsimony bias" axiom ("Rule 62"); α ∝ aperture area; the description of Ψ as "information density" and of model-set transitions as phase transitions.
  - **Punctuation:** the em dashes in the P3 heading and the Appendix A heading are replaced by colons.
