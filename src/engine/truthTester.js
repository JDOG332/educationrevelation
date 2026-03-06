/**
 * GROUND TRUTH & DARE — Depth of Truth Engine
 * 
 * NO VOCABULARY. NO KEYWORDS. NO CURATION.
 * 
 * 954 raw sentences from the entire site.
 * User input compared DIRECTLY against every one of them.
 * The Ψ equation measures the resonance.
 * 
 * FLOW:
 *   User text → tokenize
 *   Every site sentence → tokenize
 *   For each sentence: compute overlap (both directions)
 *   → sentences activate doors → doors activate layers
 *   → layers become Bloch vectors → computeR12() from psi-engine
 *   → G from convergence + signal quality
 *   → Ψ = R₁₂ × G → Depth of Truth (1.0–10.0)
 * 
 *   ~280,000 comparisons. <2ms on any modern device.
 */

import { PHI, PHI_INV } from "../data/constants.js";
import { computeR12, initializeBlochVectors } from "./psi-engine.js";
import { SITE_SENTENCES, DOOR_LAYERS, TOTAL_SENTENCES } from "../data/siteTruth.js";

const LAYER_BLOCHS = initializeBlochVectors();

// ═══════════════════════════════════════════════════════════
// TOKENIZER — same for user AND site content
// ═══════════════════════════════════════════════════════════

const STOP_WORDS = new Set(
  "the a an and or but in on at to for of is it its that this with from by as be are was were been have has had do does did will would could should may might can shall not no nor yet so if then than when where how what which who whom whose all any each every some most more many much few little own other another such both either neither here there again also too very just still already even now only ever never always sometimes often usually really quite rather almost well back our don doesn didn they them their you your we i me my".split(" ")
);

function tokenize(text) {
  const words = text.toLowerCase().match(/[a-z]{3,}/g) || [];
  return words.filter(w => !STOP_WORDS.has(w) && w.length >= 3);
}

// ═══════════════════════════════════════════════════════════
// PRE-TOKENIZE ALL SITE SENTENCES (once at load time)
// ═══════════════════════════════════════════════════════════

const TOKENIZED_SENTENCES = SITE_SENTENCES.map(s => ({
  tokens: tokenize(s.text),
  door: s.door,
  text: s.text,
})).filter(s => s.tokens.length > 0);

// ═══════════════════════════════════════════════════════════
// RAW COMPARISON — user tokens vs sentence tokens
// ═══════════════════════════════════════════════════════════

/**
 * Compare two token sets. Returns a bidirectional overlap score.
 * 
 * Forward:  what % of user tokens appear in the sentence?
 * Backward: what % of sentence tokens appear in user input?
 * Score = geometric mean (both directions must be strong)
 * 
 * Also does partial/stem matching for near-misses.
 */
function compareTokens(userTokens, sentenceTokens) {
  if (userTokens.length === 0 || sentenceTokens.length === 0) return 0;

  // Build sets for fast lookup
  const sentSet = new Set(sentenceTokens);
  const userSet = new Set(userTokens);

  // Forward: user → sentence
  let forwardHits = 0;
  for (const ut of userTokens) {
    if (sentSet.has(ut)) {
      forwardHits += 1.0;
      continue;
    }
    // Stem match (first 4+ chars shared)
    let best = 0;
    for (const st of sentenceTokens) {
      if (ut.length >= 4 && st.length >= 4 && ut.slice(0, 4) === st.slice(0, 4)) {
        best = Math.max(best, 0.7);
      } else if (ut.length >= 4 && st.length >= 4 && (st.includes(ut) || ut.includes(st))) {
        best = Math.max(best, 0.5);
      }
    }
    forwardHits += best;
  }

  // Backward: sentence → user
  let backwardHits = 0;
  for (const st of sentenceTokens) {
    if (userSet.has(st)) {
      backwardHits += 1.0;
      continue;
    }
    let best = 0;
    for (const ut of userTokens) {
      if (ut.length >= 4 && st.length >= 4 && ut.slice(0, 4) === st.slice(0, 4)) {
        best = Math.max(best, 0.7);
      } else if (ut.length >= 4 && st.length >= 4 && (st.includes(ut) || ut.includes(st))) {
        best = Math.max(best, 0.5);
      }
    }
    backwardHits += best;
  }

  const forward = forwardHits / userTokens.length;
  const backward = backwardHits / sentenceTokens.length;

  // Geometric mean — both directions must be strong
  return Math.sqrt(forward * backward);
}

// ═══════════════════════════════════════════════════════════
// COMPARE USER AGAINST ENTIRE SITE
// ═══════════════════════════════════════════════════════════

/**
 * Runs user input against every sentence on the site.
 * Returns per-door activation scores and per-sentence match data.
 */
function compareAgainstSite(userTokens) {
  const doorScores = {};   // door → cumulative score
  const doorHits = {};     // door → number of sentences that matched
  const doorBest = {};     // door → best single match score
  const topMatches = [];   // top matching sentences for display

  let totalSignal = 0;
  let totalSentencesChecked = 0;

  for (const sent of TOKENIZED_SENTENCES) {
    const score = compareTokens(userTokens, sent.tokens);
    totalSentencesChecked++;

    if (score < 0.05) continue; // noise floor

    const door = sent.door;
    if (!doorScores[door]) {
      doorScores[door] = 0;
      doorHits[door] = 0;
      doorBest[door] = 0;
    }

    doorScores[door] += score;
    doorHits[door]++;
    doorBest[door] = Math.max(doorBest[door], score);
    totalSignal += score;

    // Track top matches
    if (score > 0.15) {
      topMatches.push({ text: sent.text, door, score });
    }
  }

  // Sort top matches
  topMatches.sort((a, b) => b.score - a.score);

  // Normalize door scores: combine best match + cumulative breadth
  const doorActivations = {};
  for (const door of Object.keys(doorScores)) {
    // Weight: 60% best single match + 40% cumulative (rewards depth AND breadth)
    const best = doorBest[door];
    const cumulative = doorScores[door] / Math.max(doorHits[door], 1);
    doorActivations[door] = best * 0.6 + cumulative * 0.4;
  }

  // Global signal: what fraction of all sentences resonated?
  const signalStrength = totalSignal / Math.max(totalSentencesChecked, 1);

  return {
    doorActivations,
    doorHits,
    topMatches: topMatches.slice(0, 10),
    signalStrength,
    totalSignal,
    sentencesMatched: Object.values(doorHits).reduce((s, v) => s + v, 0),
  };
}

// ═══════════════════════════════════════════════════════════
// DOOR → LAYER ACTIVATION
// ═══════════════════════════════════════════════════════════

function doorsToLayers(doorActivations) {
  const layers = new Float64Array(9);

  for (const [door, activation] of Object.entries(doorActivations)) {
    const mapped = DOOR_LAYERS[door];
    if (!mapped) continue;

    for (const layerNum of mapped) {
      const idx = layerNum - 1;
      if (idx >= 0 && idx < 9) {
        layers[idx] = Math.max(layers[idx], activation);
      }
    }
  }

  return layers;
}

// ═══════════════════════════════════════════════════════════
// LAYER ACTIVATIONS → BLOCH VECTOR
// ═══════════════════════════════════════════════════════════

function layersToBloch(layerActivations) {
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

  const activatedCount = Array.from(layerActivations).filter(a => a > 0.01).length;
  const avgStrength = totalWeight / Math.max(activatedCount, 1);

  const focusFactor = activatedCount === 1 ? 0.85
    : activatedCount <= 3 ? 0.7 + avgStrength * 0.15
    : 0.6 + avgStrength * 0.25;

  const purity = Math.min(0.95, focusFactor * Math.min(1, avgStrength * 1.8));

  return [rx / norm * purity, ry / norm * purity, rz / norm * purity];
}

// ═══════════════════════════════════════════════════════════
// R₁₂ PER LAYER
// ═══════════════════════════════════════════════════════════

function computeLayerR12s(userBloch, layerActivations) {
  const results = [];
  for (let i = 0; i < 9; i++) {
    if (layerActivations[i] < 0.01) continue;
    const R12 = computeR12(userBloch, LAYER_BLOCHS[i]);
    results.push({ layerIndex: i, layerDepth: i + 1, R12, activation: layerActivations[i] });
  }
  results.sort((a, b) => b.R12 - a.R12);
  return results;
}

// ═══════════════════════════════════════════════════════════
// G — RELIABILITY MODULATOR
// ═══════════════════════════════════════════════════════════

function computeG(doorActivations, layerR12s, siteComparison) {
  const activeDoors = Object.keys(doorActivations).length;
  if (activeDoors === 0) return { G: 0, C_eff: 0, D_hat: 0 };

  // C_eff: Convergence
  // More doors = seeing more connections = the POINT of the theory
  const breadth = Math.min(1, activeDoors / 5);
  const avgDoorStrength = Object.values(doorActivations).reduce((s, v) => s + v, 0) / activeDoors;
  const avgR12 = layerR12s.length > 0
    ? layerR12s.reduce((s, r) => s + r.R12, 0) / layerR12s.length : 0;

  const C_eff = (0.25 + 0.4 * breadth + 0.35 * avgDoorStrength) * (0.35 + 0.65 * avgR12);

  // D_hat: Detection Quality
  // How much of the site actually resonated? Signal vs total.
  const matchRatio = siteComparison.sentencesMatched / TOTAL_SENTENCES;
  const signalQuality = Math.min(1, siteComparison.signalStrength * 20);
  const D_hat = Math.sqrt(matchRatio * signalQuality);

  return { G: C_eff * D_hat, C_eff, D_hat };
}

// ═══════════════════════════════════════════════════════════
// Ψ — THE MASTER FUNCTION — DEPTH OF TRUTH
// ═══════════════════════════════════════════════════════════

export function testTruth(userText) {
  const tokens = tokenize(userText);

  if (tokens.length === 0) {
    return {
      psi: 0, groundTruth: 1.0, tier: 1,
      depthName: "DUST", depthLabel: "Silence.",
      R12: 0, G: 0, C_eff: 0, D_hat: 0,
      layerHits: [], userBloch: [0, 0, 0], tokens: [],
      doorsActivated: [], topMatches: [],
    };
  }

  // Step 1: Compare against EVERY sentence on the site
  const siteComparison = compareAgainstSite(tokens);

  // Step 2: Door activations → Layer activations
  const layerActivations = doorsToLayers(siteComparison.doorActivations);

  // Step 3: Layers → Bloch vector
  const userBloch = layersToBloch(layerActivations);

  // Step 4: R₁₂ per layer
  const layerR12s = computeLayerR12s(userBloch, layerActivations);

  // Step 5: Aggregate R₁₂
  let R12_agg = 0, wSum = 0;
  for (const hit of layerR12s) {
    R12_agg += hit.R12 * hit.activation;
    wSum += hit.activation;
  }
  R12_agg = wSum > 0 ? R12_agg / wSum : 0;

  // Step 6: G
  const { G, C_eff, D_hat } = computeG(
    siteComparison.doorActivations, layerR12s, siteComparison
  );

  // Step 7: Ψ = R₁₂ × G
  const psi = R12_agg * G;

  // ── DEPTH OF TRUTH: 10-POINT SCALE ──
  const rawScore = Math.pow(Math.min(1, psi / 0.2), PHI_INV);
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

  const doorsActivated = Object.entries(siteComparison.doorActivations)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  return {
    psi,
    groundTruth: groundTruthDisplay,
    tier,
    depthName: depthTier.name,
    depthLabel: depthTier.label,
    R12: R12_agg,
    G, C_eff, D_hat,
    layerHits: layerR12s,
    userBloch,
    tokens,
    doorsActivated,
    topMatches: siteComparison.topMatches,
  };
}

export const LAYER_LABELS = [
  "THE SEED", "THE ROOT", "THE SPINE", "THE MIRROR", "THE MOON",
  "THE SKIN", "THE LOOP", "THE EYE", "THE ARROW",
];

export const LAYER_GLYPHS = [
  "\u{1F331}", "\u{1F33F}", "\u{1F9B4}", "\u{1FA9E}", "\u{1F319}",
  "\u270B", "\u267E\uFE0F", "\u{1F441}\uFE0F", "\u2B07\uFE0F",
];
