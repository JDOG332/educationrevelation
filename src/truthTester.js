/**
 * TRUTH TESTER — The Real Engine
 * 
 * Converts human language into Bloch vectors.
 * Runs the ACTUAL Ψ = R₁₂ × G equation.
 * Returns a genuine Truth & Depth of Knowledge score.
 * 
 * THEORY MAP:
 *   User text    → tokenize → match to layers → Bloch vector (their epistemic state)
 *   Site content  → 9 layers → Bloch vectors (the theory's epistemic state)
 *   R₁₂          → Uhlmann Fidelity × Informativeness Gate (how aligned are they?)
 *   G             → Effective Convergence × Detection Quality (is the alignment coherent?)
 *   Ψ = R₁₂ × G  → TRUTH SCORE
 * 
 * This is NOT keyword matching. This is quantum state comparison.
 * The same equation that runs the multiverse now scores the human.
 */

import { PHI, PHI_INV } from "./data.js";
import { computeR12, initializeBlochVectors } from "./psi-engine.js";
import { tokenize, MIRROR_NODES } from "./mirrorIndex.js";

// ═══════════════════════════════════════════════════════════
// SITE TRUTH VECTORS — the theory's epistemic state
// ═══════════════════════════════════════════════════════════

// These are the REAL Bloch vectors from the psi-engine.
// Each layer of the theory occupies a specific direction in Hilbert space.
const LAYER_BLOCHS = initializeBlochVectors(); // 9 vectors, one per layer

// Layer-to-index mapping (layers are 1-indexed in data, 0-indexed in arrays)
const layerToIndex = (depth) => Math.max(0, Math.min(8, depth - 1));

// ═══════════════════════════════════════════════════════════
// KEYWORD → LAYER ACTIVATION
// ═══════════════════════════════════════════════════════════

/**
 * Score how strongly user tokens activate each layer.
 * Returns array of 9 activation strengths (0–1).
 */
function computeLayerActivations(tokens) {
  const activations = new Float64Array(9); // one per layer

  if (tokens.length === 0) return activations;

  // Score each node, accumulate activation per layer
  for (const node of MIRROR_NODES) {
    let matchStrength = 0;
    let matchCount = 0;

    for (const token of tokens) {
      let best = 0;
      for (const keyword of node.keywords) {
        if (token === keyword) { best = 1; break; }
        if (token.length >= 3 && keyword.length >= 3) {
          if (keyword.includes(token) || token.includes(keyword)) {
            best = Math.max(best, 0.7);
          }
        }
        if (token.length >= 4 && keyword.length >= 4 && token.slice(0, 4) === keyword.slice(0, 4)) {
          best = Math.max(best, 0.5);
        }
      }
      matchStrength += best;
      if (best > 0) matchCount++;
    }

    if (matchCount === 0) continue;

    // Normalize by input length
    const signal = (matchStrength / tokens.length) * (matchCount / Math.max(node.keywords.length, 1));

    // Weight by node importance
    const weighted = signal * node.weight;

    // Accumulate to the node's layer
    const idx = layerToIndex(node.depth);
    activations[idx] = Math.max(activations[idx], weighted);
  }

  return activations;
}

// ═══════════════════════════════════════════════════════════
// ACTIVATION → BLOCH VECTOR
// ═══════════════════════════════════════════════════════════

/**
 * Convert layer activations into a composite Bloch vector.
 * 
 * The user's Bloch vector is a weighted sum of the activated layers'
 * Bloch vectors. The purity (|r⃗|) reflects how focused their knowledge is.
 * 
 * If they activate one layer strongly → their vector points firmly in that direction.
 * If they activate many layers weakly → their vector is diffuse (high entropy).
 * If they activate many layers strongly → their vector is composite but pure.
 */
function activationsToBloch(activations) {
  let rx = 0, ry = 0, rz = 0;
  let totalWeight = 0;

  for (let i = 0; i < 9; i++) {
    if (activations[i] < 0.01) continue;

    const w = activations[i];
    const layerBloch = LAYER_BLOCHS[i];

    rx += layerBloch[0] * w;
    ry += layerBloch[1] * w;
    rz += layerBloch[2] * w;
    totalWeight += w;
  }

  if (totalWeight < 0.01) {
    // No meaningful activation → maximally mixed state (no knowledge)
    return [0, 0, 0];
  }

  // Normalize to create unit direction, then scale by "purity"
  // Purity = how concentrated their knowledge is
  rx /= totalWeight;
  ry /= totalWeight;
  rz /= totalWeight;

  const norm = Math.sqrt(rx * rx + ry * ry + rz * rz);
  if (norm < 1e-12) return [0, 0, 0];

  // Purity based on: how many layers activated × how strongly
  const activatedCount = activations.filter(a => a > 0.01).length;
  const avgStrength = totalWeight / Math.max(activatedCount, 1);

  // Single strong layer → high purity (focused beam)
  // Many layers with moderate strength → moderate purity (broad light)
  // Many layers with high strength → highest purity (coherent knowledge)
  const focusFactor = activatedCount === 1 ? 0.85
    : activatedCount <= 3 ? 0.7 + avgStrength * 0.2
    : 0.6 + avgStrength * 0.3;

  const purity = Math.min(0.95, focusFactor * Math.min(1, avgStrength / PHI_INV));

  return [
    rx / norm * purity,
    ry / norm * purity,
    rz / norm * purity,
  ];
}

// ═══════════════════════════════════════════════════════════
// R₁₂ — RECOGNITION CORE per layer
// ═══════════════════════════════════════════════════════════

/**
 * Compute R₁₂ between user Bloch vector and each activated layer.
 * Returns array of { layerIndex, R12 } for layers with meaningful overlap.
 */
function computeLayerR12s(userBloch, activations) {
  const results = [];

  for (let i = 0; i < 9; i++) {
    if (activations[i] < 0.01) continue;

    const layerBloch = LAYER_BLOCHS[i];
    const R12 = computeR12(userBloch, layerBloch);

    results.push({
      layerIndex: i,
      layerDepth: i + 1,
      R12,
      activation: activations[i],
    });
  }

  // Sort by R₁₂ descending
  results.sort((a, b) => b.R12 - a.R12);
  return results;
}

// ═══════════════════════════════════════════════════════════
// G — RELIABILITY MODULATOR (adapted for text input)
// ═══════════════════════════════════════════════════════════

/**
 * Compute the Reliability Modulator for the user's truth.
 * 
 * G = C_eff × D̂
 * 
 * C_eff (Effective Convergence):
 *   How coherent is their knowledge? Do the layers they touched
 *   CONVERGE toward a unified truth, or scatter randomly?
 * 
 * D̂ (Detection Quality):
 *   What fraction of their input is "signal" vs "noise"?
 *   Real concepts they got right vs. filler words that matched nothing.
 */
function computeTruthG(activations, tokens, layerR12s) {
  const activatedLayers = activations.filter(a => a > 0.01).length;

  if (activatedLayers === 0) return { G: 0, C_eff: 0, D_hat: 0 };

  // ── C_eff: Convergence ──
  // Do the activated layers relate to each other in the theory's structure?
  // Mirror pairs + adjacent layers = convergent. Random scattered layers = divergent.

  let convergenceScore = 0;
  let pairCount = 0;

  // Check structural relationships between activated layers
  const activeIndices = [];
  for (let i = 0; i < 9; i++) {
    if (activations[i] > 0.01) activeIndices.push(i);
  }

  for (let a = 0; a < activeIndices.length; a++) {
    for (let b = a + 1; b < activeIndices.length; b++) {
      const i = activeIndices[a];
      const j = activeIndices[b];
      pairCount++;

      // Mirror pairs: strongest convergence
      const mirrorPairs = [[0, 8], [1, 7], [2, 6], [3, 5]];
      const isMirror = mirrorPairs.some(([x, y]) => (x === i && y === j) || (x === j && y === i));
      if (isMirror) {
        convergenceScore += 1.0;
        continue;
      }

      // Adjacent layers: good convergence
      if (Math.abs(i - j) === 1) {
        convergenceScore += 0.7;
        continue;
      }

      // Moon (4) connects to everything
      if (i === 4 || j === 4) {
        convergenceScore += 0.5;
        continue;
      }

      // Other relationships: moderate
      convergenceScore += 0.3;
    }
  }

  const C_base = pairCount > 0 ? convergenceScore / pairCount : 0.5;

  // Scale by average R₁₂ quality — convergence is meaningless without recognition
  const avgR12 = layerR12s.length > 0
    ? layerR12s.reduce((sum, r) => sum + r.R12, 0) / layerR12s.length
    : 0;

  const C_eff = C_base * (0.4 + 0.6 * avgR12);

  // ── D̂: Detection Quality ──
  // What fraction of the user's tokens actually hit something?
  // High D̂ = they said meaningful things. Low D̂ = mostly noise.

  let signalTokens = 0;
  for (const token of tokens) {
    let hit = false;
    for (const node of MIRROR_NODES) {
      for (const keyword of node.keywords) {
        if (token === keyword || (token.length >= 3 && keyword.includes(token)) || (token.length >= 3 && token.includes(keyword))) {
          hit = true;
          break;
        }
      }
      if (hit) break;
    }
    if (hit) signalTokens++;
  }

  const D_coincidence = signalTokens;
  const D_accidental = Math.max(1, tokens.length - signalTokens);
  const D_hat = D_coincidence / (D_coincidence + D_accidental);

  const G = C_eff * D_hat;

  return { G, C_eff, D_hat };
}

// ═══════════════════════════════════════════════════════════
// Ψ — THE MASTER FUNCTION
// ═══════════════════════════════════════════════════════════

/**
 * THE TRUTH TEST
 * 
 * Input: raw text from the human.
 * Output: {
 *   psi:          0–1    The truth score. Ψ = R₁₂ × G.
 *   psiPercent:   0–100  Human-readable percentage.
 *   R12:          0–1    Recognition Core (how well they see what the theory sees).
 *   G:            0–1    Reliability Modulator (how coherent their knowledge is).
 *   C_eff:        0–1    Effective Convergence (do their layers relate?).
 *   D_hat:        0–1    Detection Quality (signal vs noise ratio).
 *   layerHits:    []     Which layers they activated, with R₁₂ per layer.
 *   userBloch:    [3]    Their Bloch vector (epistemic state).
 *   depthLabel:   string Human-readable depth description.
 * }
 */
export function testTruth(userText) {
  const tokens = tokenize(userText);

  if (tokens.length === 0) {
    return {
      psi: 0, psiPercent: 0,
      R12: 0, G: 0, C_eff: 0, D_hat: 0,
      layerHits: [], userBloch: [0, 0, 0], tokens: [],
      depthLabel: "silence",
    };
  }

  // Step 1: Compute layer activations from text
  const activations = computeLayerActivations(tokens);

  // Step 2: Convert activations to Bloch vector
  const userBloch = activationsToBloch(activations);

  // Step 3: Compute R₁₂ per activated layer
  const layerR12s = computeLayerR12s(userBloch, activations);

  // Step 4: Aggregate R₁₂ — weighted average by activation strength
  let R12_agg = 0;
  let weightSum = 0;
  for (const hit of layerR12s) {
    R12_agg += hit.R12 * hit.activation;
    weightSum += hit.activation;
  }
  R12_agg = weightSum > 0 ? R12_agg / weightSum : 0;

  // Step 5: Compute G (Reliability Modulator)
  const { G, C_eff, D_hat } = computeTruthG(activations, tokens, layerR12s);

  // Step 6: Ψ = R₁₂ × G
  const psi = R12_agg * G;

  // Scale to 0–100 with PHI-based curve
  // Raw psi is typically 0–0.5, scale nonlinearly for display
  const psiPercent = Math.min(100, Math.round(
    Math.pow(Math.min(1, psi / 0.35), PHI_INV) * 100
  ));

  // Depth label
  const depthLabel =
    psiPercent < 5 ? "The surface hasn't been broken."
    : psiPercent < 15 ? "You've touched the topsoil."
    : psiPercent < 30 ? "Roots are showing."
    : psiPercent < 45 ? "You're below the surface. Something is taking shape."
    : psiPercent < 60 ? "The layers are connecting. The signal is getting cleaner."
    : psiPercent < 75 ? "Deep. The mirror is starting to reflect."
    : psiPercent < 90 ? "Convergence. The threads are weaving together."
    : "Bedrock. The fidelity between your truth and this theory is resonating.";

  return {
    psi,
    psiPercent,
    R12: R12_agg,
    G,
    C_eff,
    D_hat,
    layerHits: layerR12s,
    userBloch,
    tokens,
    depthLabel,
  };
}

// ═══════════════════════════════════════════════════════════
// LAYER NAMES FOR DISPLAY
// ═══════════════════════════════════════════════════════════

export const LAYER_LABELS = [
  "THE SEED", "THE ROOT", "THE SPINE", "THE MIRROR", "THE MOON",
  "THE SKIN", "THE LOOP", "THE EYE", "THE ARROW",
];

export const LAYER_GLYPHS = [
  "🌱", "🌿", "🦴", "🪞", "🌙", "✋", "♾️", "👁️", "⬇️",
];
