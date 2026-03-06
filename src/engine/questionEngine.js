/**
 * QUESTION ENGINE — Pure Ψ Card Matching
 *
 * Ψ = R₁₂ × G
 *   R₁₂ = √(forward × backward) — bidirectional token recognition
 *   G    = √(I_user × I_card)    — informativeness gate
 *
 * Searches all ~1000 topic cards, returns top 3 with recognition scores.
 * 100% client-side, instant.
 */

import { tokenize } from "../data/mirrorIndex.js";
import { TOPIC_CARDS } from "../data/topicCards.js";

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
        const tokens = tokenize(searchText);
        _cardIndex.push({
          title: card.title,
          answer: card.simple,
          tokens,
          tokenCount: tokens.length,
          route: { convergence: doorKey, subcategory: subKey, idea: card.id },
          icon: card.icon || null,
        });
      }
    }
  }
  return _cardIndex;
}

// ═══════════════════════════════════════════════════════════
// searchTopicCards — explicit Ψ = R₁₂ × G formula
// ═══════════════════════════════════════════════════════════

function searchTopicCards(userTokens) {
  if (userTokens.length === 0) return [];
  const index = getCardIndex();
  const results = [];
  const userSet = new Set(userTokens);

  for (const card of index) {
    if (card.tokenCount === 0) continue;

    // Forward: % of question tokens found in card (exact=1.0, stem=0.7, partial=0.5)
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
    const forward = fwdHits / userTokens.length;

    // Backward: % of card tokens found in question (sampled for efficiency)
    const sampleTokens = card.tokenCount > 20
      ? card.tokens.filter((_, i) => i % Math.ceil(card.tokenCount / 20) === 0)
      : card.tokens;
    let bwdHits = 0;
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
    const backward = bwdHits / Math.max(sampleTokens.length, 1);

    // R₁₂ = √(forward × backward)
    const R12 = Math.sqrt(forward * backward);

    // G = √(I_user × I_card) — informativeness gate
    const I_user = Math.min(1, userTokens.length / 3);
    const I_card = Math.min(1, card.tokenCount / 8);
    const G = Math.sqrt(I_user * I_card);

    // Ψ = R₁₂ × G
    const psi = R12 * G;

    if (psi > 0.08) {
      results.push({
        title: card.title,
        answer: card.answer,
        route: card.route,
        icon: card.icon,
        R12,
        G,
        psi,
      });
    }
  }

  results.sort((a, b) => b.psi - a.psi);
  return results.slice(0, 3);
}

// ═══════════════════════════════════════════════════════════
// MAIN: findAnswers(query) → top 3 topic card matches
// ═══════════════════════════════════════════════════════════

export function findAnswers(query) {
  if (!query || query.trim().length < 2) return { results: [] };

  const userTokens = tokenize(query);
  const results = searchTopicCards(userTokens);
  const top = results[0] || null;
  return { results, R12: top?.R12 || 0, G: top?.G || 0, psi: top?.psi || 0 };
}
