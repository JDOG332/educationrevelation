/**
 * QUESTION ENGINE — Composes all truth sources into one answer
 *
 * findAnswers(query) → top 3 results from:
 *   1. mirrorIndex (80+ curated nodes with Ψ-scored matching)
 *   2. truthTester (954 site sentences, full Bloch vector R₁₂)
 *   3. topicCards (1000 topic cards, token overlap scoring)
 *
 * Returns: [{ title, answer, source, psi, route }]
 */

import { reflectTruth, tokenize } from "./mirrorIndex.js";
import { testTruth } from "./truthTester.js";
import { TOPIC_CARDS } from "./topicCards.js";

// ═══════════════════════════════════════════════════════════
// DOOR LABEL → CONVERGENCE KEY mapping
// siteTruth.js uses uppercase labels; depth 4 expects lowercase keys
// ═══════════════════════════════════════════════════════════

const DOOR_TO_KEY = {
  RELIGION: "sameness",
  PHILOSOPHY: "layers",
  SCIENCE: "rock",
  MYSTICISM: "plain",
  ART: "depths",
  MATH: "promise",
  MYTHOLOGY: "gravity",
  MYTH: "gravity",
  NATURE: "pillars",
  LOVE: "filter",
  CONSCIOUSNESS: "ancient",
  SELF: "ancient",
  SELF_DEPTH: "ancient",
  RETURN: "filter",
  GENERAL: "filter",
  OTHER: "ancient",
  BREAK: "ancient",
  ARROW: "ancient",
};

// ═══════════════════════════════════════════════════════════
// TOPIC CARD INDEX — lazy-built flat array of all ~1000 cards
// ═══════════════════════════════════════════════════════════

let _cardIndex = null;

function getCardIndex() {
  if (_cardIndex) return _cardIndex;

  _cardIndex = [];
  for (const [doorKey, subs] of Object.entries(TOPIC_CARDS)) {
    for (const [subKey, cards] of Object.entries(subs)) {
      for (const card of cards) {
        // Tokenize the searchable text: title + subtitle + simple + intuition
        const searchText = [
          card.title || "",
          card.subtitle || "",
          card.simple || "",
          card.intuition || "",
        ].join(" ");
        _cardIndex.push({
          title: card.title,
          answer: card.simple,
          tokens: tokenize(searchText),
          route: { convergence: doorKey, subcategory: subKey },
          source: "topic",
        });
      }
    }
  }
  return _cardIndex;
}

// ═══════════════════════════════════════════════════════════
// TOPIC CARD SEARCH — bidirectional token overlap
// ═══════════════════════════════════════════════════════════

function searchTopicCards(userTokens) {
  if (userTokens.length === 0) return [];
  const index = getCardIndex();
  const results = [];

  for (const card of index) {
    if (card.tokens.length === 0) continue;

    // Forward: user → card
    let fwdHits = 0;
    for (const ut of userTokens) {
      let best = 0;
      for (const ct of card.tokens) {
        if (ut === ct) { best = 1; break; }
        if (ut.length >= 4 && ct.length >= 4) {
          if (ut.slice(0, 4) === ct.slice(0, 4)) best = Math.max(best, 0.7);
          else if (ct.includes(ut) || ut.includes(ct)) best = Math.max(best, 0.5);
        }
      }
      fwdHits += best;
    }

    // Backward: card → user (lightweight — sample up to 20 tokens)
    const sampleTokens = card.tokens.length > 20
      ? card.tokens.filter((_, i) => i % Math.ceil(card.tokens.length / 20) === 0)
      : card.tokens;
    let bwdHits = 0;
    const userSet = new Set(userTokens);
    for (const ct of sampleTokens) {
      if (userSet.has(ct)) { bwdHits += 1; continue; }
      let best = 0;
      for (const ut of userTokens) {
        if (ut.length >= 4 && ct.length >= 4) {
          if (ut.slice(0, 4) === ct.slice(0, 4)) best = Math.max(best, 0.7);
          else if (ct.includes(ut) || ut.includes(ct)) best = Math.max(best, 0.5);
        }
      }
      bwdHits += best;
    }

    const forward = fwdHits / userTokens.length;
    const backward = bwdHits / Math.max(sampleTokens.length, 1);
    const score = Math.sqrt(forward * backward);

    if (score > 0.08) {
      results.push({ ...card, psi: score });
    }
  }

  results.sort((a, b) => b.psi - a.psi);
  return results.slice(0, 5);
}

// ═══════════════════════════════════════════════════════════
// MAIN: findAnswers(query) → top 3 unified results
// ═══════════════════════════════════════════════════════════

export function findAnswers(query) {
  if (!query || query.trim().length < 2) return { results: [] };

  const userTokens = tokenize(query);

  // Source 1: Mirror Index — curated nodes with pre-written answers
  const mirror = reflectTruth(query);
  const mirrorResults = (mirror.matched || []).map(node => ({
    title: node.path || node.id,
    answer: node.truth,
    dare: node.dare,
    source: "mirror",
    psi: node.score,
    route: node.route || null,
  }));

  // Source 2: Truth Tester — 954 sentences, full CRT formula
  const truth = testTruth(query);
  const truthResults = (truth.topMatches || []).map(m => {
    const key = m.door ? DOOR_TO_KEY[m.door] : null;
    return {
      title: m.door ? m.door.replace(/_/g, " ").toUpperCase() : "SITE TRUTH",
      answer: m.text,
      source: "truth",
      psi: m.score,
      route: key ? { convergence: key, subcategory: "__essay__" } : null,
    };
  });

  // Source 3: Topic Cards — 1000 cards, token overlap
  const cardResults = searchTopicCards(userTokens).map(c => ({
    title: c.title,
    answer: c.answer,
    source: "topic",
    psi: c.psi,
    route: c.route,
  }));

  // Normalize scores to 0–1 range per source
  const normalize = (arr) => {
    if (arr.length === 0) return arr;
    const max = Math.max(...arr.map(r => r.psi));
    if (max <= 0) return arr;
    return arr.map(r => ({ ...r, psi: r.psi / max }));
  };

  const allResults = [
    // Mirror results get a small boost — they're curated answers
    ...normalize(mirrorResults).map(r => ({ ...r, psi: r.psi * 1.1 })),
    ...normalize(truthResults),
    ...normalize(cardResults),
  ];

  // Deduplicate: if two results share the same convergence route, keep the higher score
  const seen = new Map();
  for (const r of allResults.sort((a, b) => b.psi - a.psi)) {
    const key = r.route
      ? `${r.route.convergence}:${r.route.subcategory || ""}:${r.route.idea || ""}`
      : r.answer.slice(0, 40);
    if (!seen.has(key)) {
      seen.set(key, r);
    }
  }

  const results = Array.from(seen.values())
    .sort((a, b) => b.psi - a.psi)
    .slice(0, 3);

  // Pick the best dare from mirror matches
  const dare = (mirror.matched || []).find(n => n.dare)?.dare
    || (mirror.dares || []).find(n => n.dare)?.dare
    || null;

  return {
    results,
    psi: truth.psi,
    R12: truth.R12,
    G: truth.G,
    C_eff: truth.C_eff,
    D_hat: truth.D_hat,
    groundTruth: truth.groundTruth,
    tier: truth.tier,
    depthName: truth.depthName,
    depthLabel: truth.depthLabel,
    layerHits: truth.layerHits,
    doorsActivated: truth.doorsActivated,
    userBloch: truth.userBloch,
    dare,
    mirrorDepthScore: mirror.depthScore,
  };
}
