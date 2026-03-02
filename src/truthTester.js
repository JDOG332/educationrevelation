/**
 * TRUTH TESTER — Ground Truth & Dare Engine
 * 
 * Converts human language into Bloch vectors.
 * Matches against the ENTIRE SITE CORPUS — every essay, every door, every layer.
 * Runs the ACTUAL Ψ = R₁₂ × G equation.
 * Returns a Ground Truth score on the 10-point Depth Chart.
 * 
 * This is NOT keyword matching against 40 nodes.
 * This is TF-IDF weighted matching against 1,700+ terms
 * extracted from the full site content across 15 doors.
 * 
 * FLOW:
 *   User text → tokenize → match against DOOR_VOCAB (TF-IDF weighted)
 *   → door activations → layer activations (via DOOR_LAYERS mapping)
 *   → Bloch vector → computeR12() → computeG() → Ψ = R₁₂ × G
 *   → Ground Truth score (1.0–10.0) → Depth Chart tier
 */

import { PHI, PHI_INV } from "./data.js";
import { computeR12, initializeBlochVectors } from "./psi-engine.js";
import { DOOR_VOCAB, GLOBAL_VOCAB, DOOR_LAYERS, DOOR_SIZES } from "./siteCorpus.js";

// ═══════════════════════════════════════════════════════════
// LAYER BLOCH VECTORS — the theory's epistemic state
// ═══════════════════════════════════════════════════════════

const LAYER_BLOCHS = initializeBlochVectors(); // 9 vectors from psi-engine

// ═══════════════════════════════════════════════════════════
// TOKENIZER
// ═══════════════════════════════════════════════════════════

const STOP_WORDS = new Set(
  "the a an and or but in on at to for of is it its that this with from by as be are was were been have has had do does did will would could should may might can shall not no nor yet so if then than when where how what which who whom whose all any each every some most more many much few little own other another such both either neither here there again also too very just still already even now only ever never always sometimes often usually really quite rather almost well back our don doesn didn they them their you your".split(" ")
);

export function tokenize(text) {
  const words = text.toLowerCase().match(/[a-z]{3,}/g) || [];
  return words.filter(w => !STOP_WORDS.has(w) && w.length >= 3);
}

// ═══════════════════════════════════════════════════════════
// DOOR ACTIVATION — match user tokens against entire site corpus
// ═══════════════════════════════════════════════════════════

/**
 * Score how strongly user tokens activate each door.
 * Uses TF-IDF weights from the real site content.
 * Returns object: { doorName: activationScore }
 */
function computeDoorActivations(tokens) {
  const activations = {};
  const doors = Object.keys(DOOR_VOCAB);

  if (tokens.length === 0) return activations;

  for (const door of doors) {
    const vocab = DOOR_VOCAB[door];
    let totalWeight = 0;
    let matchCount = 0;

    for (const token of tokens) {
      // Exact match
      if (vocab[token] !== undefined) {
        totalWeight += vocab[token];
        matchCount++;
        continue;
      }

      // Partial/stem matching (check if user token is substring or vice versa)
      let bestPartial = 0;
      for (const term of Object.keys(vocab)) {
        if (token.length >= 4 && term.length >= 4) {
          // Stem match (first 4+ chars)
          if (token.slice(0, 4) === term.slice(0, 4)) {
            bestPartial = Math.max(bestPartial, vocab[term] * 0.6);
          }
          // Substring match
          else if (term.includes(token) || token.includes(term)) {
            bestPartial = Math.max(bestPartial, vocab[term] * 0.4);
          }
        }
      }
      if (bestPartial > 0) {
        totalWeight += bestPartial;
        matchCount++;
      }
    }

    if (matchCount === 0) continue;

    // Normalize: weight per token, scaled by match coverage
    const coverage = matchCount / tokens.length;
    const avgWeight = totalWeight / matchCount;
    const doorSize = DOOR_SIZES[door] || 1;

    // Activation = average weight × coverage × log(door richness)
    // Richer doors (more content) get slight bonus for having more to match against
    activations[door] = avgWeight * coverage * Math.log2(1 + doorSize / 10);
  }

  return activations;
}

// ═══════════════════════════════════════════════════════════
// GLOBAL MATCHING — catch terms not in any specific door
// ═══════════════════════════════════════════════════════════

/**
 * How much of the user's input matches the site's overall vocabulary?
 * Returns 0–1 signal strength.
 */
function computeGlobalSignal(tokens) {
  if (tokens.length === 0) return 0;

  let hits = 0;
  let weightedHits = 0;

  for (const token of tokens) {
    if (GLOBAL_VOCAB[token] !== undefined) {
      hits++;
      weightedHits += Math.log2(1 + GLOBAL_VOCAB[token]);
    } else {
      // Partial match against global vocab
      for (const term of Object.keys(GLOBAL_VOCAB)) {
        if (token.length >= 4 && term.length >= 4) {
          if (token.slice(0, 4) === term.slice(0, 4) || term.includes(token) || token.includes(term)) {
            hits += 0.5;
            weightedHits += Math.log2(1 + GLOBAL_VOCAB[term]) * 0.4;
            break;
          }
        }
      }
    }
  }

  return {
    hitRate: hits / tokens.length,
    avgWeight: hits > 0 ? weightedHits / hits : 0,
  };
}

// ═══════════════════════════════════════════════════════════
// DOOR → LAYER ACTIVATION
// ═══════════════════════════════════════════════════════════

/**
 * Convert door activations to layer activations (0-indexed, 9 layers).
 * Each door maps to 1-3 layers via DOOR_LAYERS.
 */
function doorsToLayers(doorActivations) {
  const layerActivations = new Float64Array(9);

  for (const [door, activation] of Object.entries(doorActivations)) {
    const layers = DOOR_LAYERS[door];
    if (!layers) continue;

    for (const layerNum of layers) {
      const idx = layerNum - 1; // convert 1-indexed to 0-indexed
      if (idx >= 0 && idx < 9) {
        // Each door contributes to its mapped layers
        // Spread activation across layers, weighted by position (first = strongest)
        const spread = 1.0 / layers.length;
        layerActivations[idx] = Math.max(
          layerActivations[idx],
          activation * (1 - (layers.indexOf(layerNum) * 0.15))
        );
      }
    }
  }

  return layerActivations;
}

// ═══════════════════════════════════════════════════════════
// ACTIVATION → BLOCH VECTOR
// ═══════════════════════════════════════════════════════════

function activationsToBloch(layerActivations) {
  let rx = 0, ry = 0, rz = 0;
  let totalWeight = 0;

  for (let i = 0; i < 9; i++) {
    if (layerActivations[i] < 0.01) continue;

    const w = layerActivations[i];
    const lb = LAYER_BLOCHS[i];
    rx += lb[0] * w;
    ry += lb[1] * w;
    rz += lb[2] * w;
    totalWeight += w;
  }

  if (totalWeight < 0.01) return [0, 0, 0];

  rx /= totalWeight;
  ry /= totalWeight;
  rz /= totalWeight;

  const norm = Math.sqrt(rx * rx + ry * ry + rz * rz);
  if (norm < 1e-12) return [0, 0, 0];

  // Purity based on activation pattern
  const activatedCount = Array.from(layerActivations).filter(a => a > 0.01).length;
  const avgStrength = totalWeight / Math.max(activatedCount, 1);

  const focusFactor = activatedCount === 1 ? 0.85
    : activatedCount <= 3 ? 0.7 + avgStrength * 0.2
    : 0.6 + avgStrength * 0.3;

  const purity = Math.min(0.95, focusFactor * Math.min(1, avgStrength * 2));

  return [
    rx / norm * purity,
    ry / norm * purity,
    rz / norm * purity,
  ];
}

// ═══════════════════════════════════════════════════════════
// R₁₂ PER LAYER
// ═══════════════════════════════════════════════════════════

function computeLayerR12s(userBloch, layerActivations) {
  const results = [];

  for (let i = 0; i < 9; i++) {
    if (layerActivations[i] < 0.01) continue;

    const R12 = computeR12(userBloch, LAYER_BLOCHS[i]);
    results.push({
      layerIndex: i,
      layerDepth: i + 1,
      R12,
      activation: layerActivations[i],
    });
  }

  results.sort((a, b) => b.R12 - a.R12);
  return results;
}

// ═══════════════════════════════════════════════════════════
// G — RELIABILITY MODULATOR
// ═══════════════════════════════════════════════════════════

function computeTruthG(doorActivations, tokens, layerR12s, globalSignal) {
  const activeDoors = Object.keys(doorActivations).length;
  if (activeDoors === 0) return { G: 0, C_eff: 0, D_hat: 0 };

  // ── C_eff: Convergence ──
  // Do the activated doors relate? The theory says all doors lead to the same room.
  // More doors activated = higher convergence (they're finding the connections)
  const doorValues = Object.values(doorActivations);
  const avgDoorActivation = doorValues.reduce((s, v) => s + v, 0) / doorValues.length;

  // Convergence bonus for hitting multiple doors (the whole point is they connect)
  const breadthBonus = Math.min(1, activeDoors / 5); // maxes at 5+ doors

  // Scale by R₁₂ quality
  const avgR12 = layerR12s.length > 0
    ? layerR12s.reduce((sum, r) => sum + r.R12, 0) / layerR12s.length
    : 0;

  const C_eff = (0.3 + 0.4 * breadthBonus + 0.3 * avgDoorActivation) * (0.4 + 0.6 * avgR12);

  // ── D̂: Detection Quality ──
  // What fraction of user's words are in the site's vocabulary at all?
  const D_hat = globalSignal.hitRate * (0.5 + 0.5 * Math.min(1, globalSignal.avgWeight / 3));

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
 * Output: Ground Truth score (1.0–10.0) with full breakdown.
 */
export function testTruth(userText) {
  const tokens = tokenize(userText);

  if (tokens.length === 0) {
    return {
      psi: 0, groundTruth: 1.0, tier: 1,
      depthName: "DUST", depthLabel: "Silence.",
      R12: 0, G: 0, C_eff: 0, D_hat: 0,
      layerHits: [], userBloch: [0, 0, 0], tokens: [],
      doorsActivated: [],
    };
  }

  // Step 1: Match against entire site corpus (door-level)
  const doorActivations = computeDoorActivations(tokens);

  // Step 2: Global signal check
  const globalSignal = computeGlobalSignal(tokens);

  // Step 3: Convert door activations → layer activations
  const layerActivations = doorsToLayers(doorActivations);

  // Step 4: Convert to Bloch vector
  const userBloch = activationsToBloch(layerActivations);

  // Step 5: Compute R₁₂ per activated layer
  const layerR12s = computeLayerR12s(userBloch, layerActivations);

  // Step 6: Aggregate R₁₂
  let R12_agg = 0;
  let weightSum = 0;
  for (const hit of layerR12s) {
    R12_agg += hit.R12 * hit.activation;
    weightSum += hit.activation;
  }
  R12_agg = weightSum > 0 ? R12_agg / weightSum : 0;

  // Step 7: Compute G (Reliability Modulator)
  const { G, C_eff, D_hat } = computeTruthG(doorActivations, tokens, layerR12s, globalSignal);

  // Step 8: Ψ = R₁₂ × G
  const psi = R12_agg * G;

  // ── GROUND TRUTH: 10-POINT DEPTH CHART ──
  const rawScore = Math.pow(Math.min(1, psi / 0.25), PHI_INV);
  const groundTruth = Math.max(1.0, Math.min(10.0, 1.0 + rawScore * 9.0));
  const groundTruthDisplay = Math.round(groundTruth * 10) / 10;
  const tier = Math.min(10, Math.max(1, Math.ceil(groundTruth)));

  const DEPTH_CHART = [
    { level: 1,  name: "DUST",    label: "The surface hasn't been broken yet." },
    { level: 2,  name: "TOPSOIL", label: "Scratching the surface. There's more below." },
    { level: 3,  name: "CLAY",    label: "Resistance. You're pushing through something real." },
    { level: 4,  name: "ROOTS",   label: "You've hit something alive down here." },
    { level: 5,  name: "STONE",   label: "Foundation. This depth can't be faked." },
    { level: 6,  name: "BEDROCK", label: "Solid ground. Most people never reach this." },
    { level: 7,  name: "CORE",    label: "The layers are connecting across the theory." },
    { level: 8,  name: "MAGMA",   label: "Molten. Everything is moving and fusing together." },
    { level: 9,  name: "CRYSTAL", label: "Compressed clarity. Truth under pressure." },
    { level: 10, name: "SEED",    label: "The deepest point IS the beginning. Full circle." },
  ];

  const depthTier = DEPTH_CHART[tier - 1];

  // Which doors did they activate? (for display)
  const doorsActivated = Object.entries(doorActivations)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  return {
    psi,
    groundTruth: groundTruthDisplay,
    tier,
    depthName: depthTier.name,
    depthLabel: depthTier.label,
    R12: R12_agg,
    G,
    C_eff,
    D_hat,
    layerHits: layerR12s,
    userBloch,
    tokens,
    doorsActivated,
  };
}

// ═══════════════════════════════════════════════════════════
// EXPORTS FOR DISPLAY
// ═══════════════════════════════════════════════════════════

export const LAYER_LABELS = [
  "THE SEED", "THE ROOT", "THE SPINE", "THE MIRROR", "THE MOON",
  "THE SKIN", "THE LOOP", "THE EYE", "THE ARROW",
];

export const LAYER_GLYPHS = [
  "🌱", "🌿", "🦴", "🪞", "🌙", "✋", "♾️", "👁️", "⬇️",
];
