/**
 * WIKI ENGINE — Fetch Wikipedia, score each sentence against topic cards
 *
 * fetchWiki(query) → { title, url, points: [{ text, emoji, truthScore, route }] }
 *
 * Internal math (never shown to user):
 *   R₁₂ = √(fwd × bwd) × G_eps     (recognition × informativeness)
 *   G   = C_eff × D_hat              (convergence × detection quality)
 *   Ψ   = R₁₂ × G                   (final truth value → displayed as %)
 */

import { tokenize } from "./mirrorIndex.js";
import { TOPIC_CARDS } from "./topicCards.js";

// ═══════════════════════════════════════════════════════════
// CARD INDEX — reuse same lazy pattern as questionEngine
// ═══════════════════════════════════════════════════════════

let _cardIndex = null;

function getCardIndex() {
  if (_cardIndex) return _cardIndex;
  _cardIndex = [];
  for (const [doorKey, subs] of Object.entries(TOPIC_CARDS)) {
    for (const [subKey, cards] of Object.entries(subs)) {
      for (const card of cards) {
        const searchText = [
          card.title || "",
          card.subtitle || "",
          card.simple || "",
          card.intuition || "",
        ].join(" ");
        const tokens = tokenize(searchText);
        _cardIndex.push({
          tokens,
          tokenCount: tokens.length,
          door: doorKey,
          icon: card.icon || "🔍",
          route: { convergence: doorKey, subcategory: subKey, idea: card.id },
          title: card.title,
        });
      }
    }
  }
  return _cardIndex;
}

// ═══════════════════════════════════════════════════════════
// TOKEN MATCHING — bidirectional recognition for a sentence
// ═══════════════════════════════════════════════════════════

function scoreTokens(sentenceTokens, cardTokens, cardTokenCount) {
  if (sentenceTokens.length === 0 || cardTokenCount === 0) return 0;

  // Forward: sentence → card
  let fwdHits = 0;
  for (const st of sentenceTokens) {
    let best = 0;
    for (const ct of cardTokens) {
      if (st === ct) { best = 1; break; }
      if (st.length >= 4 && ct.length >= 4) {
        if (st.slice(0, 4) === ct.slice(0, 4)) best = Math.max(best, 0.7);
        else if (ct.includes(st) || st.includes(ct)) best = Math.max(best, 0.5);
      }
    }
    fwdHits += best;
  }
  const forward = fwdHits / sentenceTokens.length;

  // Backward: card → sentence (sampled)
  const sampleTokens = cardTokenCount > 20
    ? cardTokens.filter((_, i) => i % Math.ceil(cardTokenCount / 20) === 0)
    : cardTokens;
  const sentenceSet = new Set(sentenceTokens);
  let bwdHits = 0;
  for (const ct of sampleTokens) {
    if (sentenceSet.has(ct)) { bwdHits += 1; continue; }
    let best = 0;
    for (const st of sentenceTokens) {
      if (st.length >= 4 && ct.length >= 4) {
        if (st.slice(0, 4) === ct.slice(0, 4)) best = Math.max(best, 0.7);
        else if (ct.includes(st) || st.includes(ct)) best = Math.max(best, 0.5);
      }
    }
    bwdHits += best;
  }
  const backward = bwdHits / Math.max(sampleTokens.length, 1);

  return Math.sqrt(forward * backward);
}

// ═══════════════════════════════════════════════════════════
// SCORE ONE SENTENCE — full Ψ = R₁₂ × G
// ═══════════════════════════════════════════════════════════

function scoreSentence(sentenceTokens) {
  const index = getCardIndex();
  const scored = [];

  for (const card of index) {
    const raw = scoreTokens(sentenceTokens, card.tokens, card.tokenCount);
    if (raw > 0.02) {
      scored.push({ raw, card });
    }
  }

  scored.sort((a, b) => b.raw - a.raw);
  const top10 = scored.slice(0, 10);
  const top5 = scored.slice(0, 5);

  if (top10.length === 0) {
    return { psi: 0, emoji: "🔍", route: null, cardTitle: null };
  }

  const best = top10[0];

  // R₁₂ = raw recognition × informativeness gate
  const I_sentence = Math.min(1, sentenceTokens.length / 5);
  const I_card = Math.min(1, best.card.tokenCount / 8);
  const G_eps = Math.sqrt(I_sentence * I_card);
  const R12 = best.raw * G_eps;

  // G = C_eff × D_hat
  // C_eff: fraction of top-10 cards sharing the same door as #1
  const bestDoor = best.card.door;
  const sameDoor = top10.filter(s => s.card.door === bestDoor).length;
  const C_eff = sameDoor / top10.length;

  // D_hat: signal clarity — peak vs mean
  const meanTop5 = top5.length > 0
    ? top5.reduce((sum, s) => sum + s.raw, 0) / top5.length
    : 0.001;
  const D_hat = Math.min(1, best.raw / Math.max(meanTop5, 0.001));

  const G = C_eff * D_hat;

  // Ψ = R₁₂ × G
  const psi = R12 * G;

  return {
    psi,
    emoji: best.card.icon,
    route: best.card.route,
    cardTitle: best.card.title,
  };
}

// ═══════════════════════════════════════════════════════════
// TRUNCATE — cap at ~25 words
// ═══════════════════════════════════════════════════════════

function truncate(text, maxWords = 25) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return words.slice(0, maxWords).join(" ") + "...";
}

// ═══════════════════════════════════════════════════════════
// FETCH WIKIPEDIA — search → extract → score → return
// ═══════════════════════════════════════════════════════════

const API = "https://en.wikipedia.org/w/api.php";

export async function fetchWiki(query) {
  if (!query || query.trim().length < 2) return null;

  // Step 1: Search for best matching article title
  const searchUrl = new URL(API);
  searchUrl.searchParams.set("action", "opensearch");
  searchUrl.searchParams.set("search", query.trim());
  searchUrl.searchParams.set("limit", "1");
  searchUrl.searchParams.set("format", "json");
  searchUrl.searchParams.set("origin", "*");

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) return { title: query, url: null, points: [], nextSteps: [] };
  const searchData = await searchRes.json();
  const title = searchData[1]?.[0];
  if (!title) return { title: query, url: null, points: [], nextSteps: [] };

  // Step 2: Fetch article extract
  const extractUrl = new URL(API);
  extractUrl.searchParams.set("action", "query");
  extractUrl.searchParams.set("titles", title);
  extractUrl.searchParams.set("prop", "extracts");
  extractUrl.searchParams.set("explaintext", "1");
  extractUrl.searchParams.set("format", "json");
  extractUrl.searchParams.set("origin", "*");

  const extractRes = await fetch(extractUrl);
  if (!extractRes.ok) return { title, url: null, points: [], nextSteps: [] };
  const extractData = await extractRes.json();
  const pages = extractData.query?.pages || {};
  const page = Object.values(pages)[0];
  const extract = page?.extract || "";
  const pageId = page?.pageid;

  if (!extract) return { title, url: null, points: [], nextSteps: [] };

  const url = pageId
    ? `https://en.wikipedia.org/?curid=${pageId}`
    : `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

  // Step 3: Split into sentences
  const sentences = extract
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && s.split(/\s+/).length >= 3);

  // Step 4: Score each sentence
  const points = [];
  const seenRoutes = new Set();

  for (const sentence of sentences) {
    const tokens = tokenize(sentence);
    const { psi, emoji, route, cardTitle } = scoreSentence(tokens);
    const truthScore = Math.min(99, Math.round(psi * 100 * 5)); // scale to readable %

    points.push({
      text: truncate(sentence),
      emoji,
      truthScore: Math.max(1, truthScore),
      route,
      cardTitle,
    });
  }

  // Sort by truth score, highest first
  points.sort((a, b) => b.truthScore - a.truthScore);

  // Step 5: Build next steps — top unique routes
  const nextSteps = [];
  for (const p of points) {
    if (p.route && !seenRoutes.has(p.route.convergence + ":" + p.route.subcategory)) {
      seenRoutes.add(p.route.convergence + ":" + p.route.subcategory);
      nextSteps.push({ emoji: p.emoji, title: p.cardTitle, route: p.route });
      if (nextSteps.length >= 3) break;
    }
  }

  return { title, url, points, nextSteps };
}
