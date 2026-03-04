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

// Stop words — zero matching value, ~40-50% of all tokens
const STOP = new Set([
  "the","a","an","is","are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","shall","should","may","might","can","could",
  "to","of","in","for","on","with","at","by","from","as","into","through","during",
  "before","after","above","below","between","under","again","further","then","once",
  "that","this","these","those","it","its","he","she","they","them","his","her",
  "their","we","our","you","your","which","who","whom","what","where","when","how",
  "all","each","every","both","few","more","most","other","some","such","no","not",
  "only","own","same","so","than","too","very","also","just","about","up","out",
  "if","or","and","but","nor","yet","because","while","although","since","until",
]);

function stripStop(tokens) {
  return tokens.filter(t => !STOP.has(t) && t.length > 2);
}

// ═══════════════════════════════════════════════════════════
// CARD INDEX + INVERTED INDEX — built once, lookup in O(1)
// ═══════════════════════════════════════════════════════════

let _cards = null;
let _invertedIndex = null; // token → Set of card indices

function buildIndex() {
  if (_cards) return;
  _cards = [];
  _invertedIndex = new Map();

  for (const [doorKey, subs] of Object.entries(TOPIC_CARDS)) {
    for (const [subKey, cards] of Object.entries(subs)) {
      for (const card of cards) {
        const searchText = [
          card.title || "",
          card.subtitle || "",
          card.simple || "",
          card.intuition || "",
        ].join(" ");
        const tokens = stripStop(tokenize(searchText));
        const cardIdx = _cards.length;
        _cards.push({
          tokens,
          tokenSet: new Set(tokens),
          tokenCount: tokens.length,
          door: doorKey,
          icon: card.icon || "🔍",
          route: { convergence: doorKey, subcategory: subKey, idea: card.id },
          title: card.title,
        });

        // Build inverted index: each token → which cards have it
        for (const t of new Set(tokens)) {
          if (!_invertedIndex.has(t)) _invertedIndex.set(t, []);
          _invertedIndex.get(t).push(cardIdx);
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
// SCORE ONE CHUNK — find matching cards via inverted index
// ═══════════════════════════════════════════════════════════

function scoreChunk(chunkTokens) {
  buildIndex();

  // Use inverted index to find only cards that share tokens
  const candidateCounts = new Map(); // cardIdx → overlap count
  for (const t of chunkTokens) {
    const cardIndices = _invertedIndex.get(t);
    if (!cardIndices) continue;
    for (const ci of cardIndices) {
      candidateCounts.set(ci, (candidateCounts.get(ci) || 0) + 1);
    }
  }

  if (candidateCounts.size === 0) {
    return { psi: 0, emoji: "🔍", route: null, cardTitle: null };
  }

  // Only score cards with 2+ token overlaps (skip noise)
  const chunkSet = new Set(chunkTokens);
  const scored = [];

  for (const [ci, overlap] of candidateCounts) {
    if (overlap < 2) continue;
    const card = _cards[ci];

    // Forward only: % of chunk tokens found in card (exact=1.0, stem=0.5)
    let hits = 0;
    for (const ct of chunkTokens) {
      if (card.tokenSet.has(ct)) { hits += 1; continue; }
      if (ct.length >= 4) {
        const prefix = ct.slice(0, 4);
        let found = false;
        for (const kt of card.tokens) {
          if (kt.length >= 4 && kt.slice(0, 4) === prefix) { found = true; break; }
        }
        if (found) hits += 0.5;
      }
    }
    const raw = hits / chunkTokens.length;
    if (raw > 0.05) scored.push({ raw, card });
  }

  if (scored.length === 0) {
    return { psi: 0, emoji: "🔍", route: null, cardTitle: null };
  }

  scored.sort((a, b) => b.raw - a.raw);
  const top10 = scored.slice(0, 10);
  const best = top10[0];

  // R₁₂ = raw × informativeness gate
  const I_chunk = Math.min(1, chunkTokens.length / 5);
  const I_card = Math.min(1, best.card.tokenCount / 8);
  const R12 = best.raw * Math.sqrt(I_chunk * I_card);

  // G = C_eff × D_hat
  const bestDoor = best.card.door;
  const sameDoor = top10.filter(s => s.card.door === bestDoor).length;
  const C_eff = sameDoor / top10.length;
  const meanTop5 = scored.slice(0, 5).reduce((s, x) => s + x.raw, 0) / Math.min(5, scored.length);
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

  // Pre-warm the card index while fetching
  buildIndex();

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

  // Step 2: Fetch full article extract
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

  // Step 3: Split into sentences, chunk every 5
  const rawSentences = extract
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && s.split(/\s+/).length >= 3);

  const chunks = [];
  for (let i = 0; i < rawSentences.length; i += 5) {
    chunks.push(rawSentences.slice(i, i + 5).join(" "));
  }

  // Step 4: Score each chunk
  const points = [];
  const seenRoutes = new Set();

  for (const chunk of chunks) {
    const tokens = stripStop(tokenize(chunk));
    if (tokens.length < 2) continue;
    const { psi, emoji, route, cardTitle } = scoreChunk(tokens);
    const truthScore = Math.min(99, Math.round(psi * 100 * 5));

    if (truthScore >= 5) {
      points.push({
        text: truncate(chunk),
        emoji,
        truthScore,
        route,
        cardTitle,
      });
    }
  }

  // Sort by truth score — keep top 5
  points.sort((a, b) => b.truthScore - a.truthScore);
  const top = points.slice(0, 5);

  // Step 5: Build next steps — top unique routes
  const nextSteps = [];
  for (const p of top) {
    if (p.route && !seenRoutes.has(p.route.convergence + ":" + p.route.subcategory)) {
      seenRoutes.add(p.route.convergence + ":" + p.route.subcategory);
      nextSteps.push({ emoji: p.emoji, title: p.cardTitle, route: p.route });
      if (nextSteps.length >= 3) break;
    }
  }

  return { title, url, points: top, nextSteps };
}
