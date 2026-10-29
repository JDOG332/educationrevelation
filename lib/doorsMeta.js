/**
 * DOORS META — build-time data for the doors page (/search).
 *
 * Server only. These helpers read the full card library, so call them from
 * app/search/page.js and pass the small results to SearchClient as props.
 * Never import this file from a client component.
 */

import { TOPIC_CARDS } from "./topicCards.js";
import { SUBCATEGORIES, DOOR_META } from "./subcategories.js";
import { SLUG_TO_KEY } from "./doorMap.js";
import { getAllCardPaths, getDailyCard } from "./siftEngine.js";

// The one-line question for each door, keyed by URL slug.
export function getDoorQuestions() {
  const out = {};
  for (const [slug, key] of Object.entries(SLUG_TO_KEY)) {
    out[slug] = DOOR_META[key]?.tagline || "";
  }
  return out;
}

// Curated "Begin anywhere" paths: four cards and one topic page.
const START_HERE = [
  "/love/grief/golden-repair-kintsugi",
  "/consciousness/perception/observer-effect",
  "/mysticism/oneness/ego-dissolution",
  "/mythology/hero",
  "/mathematics/number/golden-ratio",
];

function firstSentence(text) {
  const t = (text || "").trim();
  const m = t.match(/^.*?[.!?](?=\s|$)/);
  return (m ? m[0] : t).trim();
}

export function getStartHere() {
  const out = [];
  for (const href of START_HERE) {
    const [doorSlug, subId, cardId] = href.slice(1).split("/");
    const key = SLUG_TO_KEY[doorSlug];
    const sub = SUBCATEGORIES[key]?.find(s => s.id === subId);
    if (!sub) throw new Error(`doorsMeta: unknown topic in ${href}`);
    if (cardId) {
      const card = TOPIC_CARDS[key]?.[subId]?.find(c => c.id === cardId);
      if (!card) throw new Error(`doorsMeta: unknown card ${href}`);
      out.push({ href, doorSlug, icon: card.icon, title: card.title, line: firstSentence(card.simple) });
    } else {
      out.push({ href, doorSlug, icon: sub.icon, title: sub.name, line: sub.desc });
    }
  }
  return out;
}

// All 1,001 card paths, packed: [[doorSlug, [[topicId, [cardId, ...]], ...]], ...]
// SearchClient unpacks this back into "/door/topic/card" strings.
export function getPackedCardPaths() {
  const doors = new Map();
  for (const path of getAllCardPaths()) {
    const [door, topic, card] = path.slice(1).split("/");
    if (!doors.has(door)) doors.set(door, new Map());
    const topics = doors.get(door);
    if (!topics.has(topic)) topics.set(topic, []);
    topics.get(topic).push(card);
  }
  return [...doors].map(([door, topics]) => [door, [...topics]]);
}

export { getDailyCard };
