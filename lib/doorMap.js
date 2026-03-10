// Maps URL slugs to topicCards data keys
export const SLUG_TO_KEY = {
  love:          "filter",
  mysticism:     "plain",
  consciousness: "ancient",
  religion:      "sameness",
  art:           "depths",
  nature:        "pillars",
  mythology:     "gravity",
  philosophy:    "layers",
  science:       "rock",
  mathematics:   "promise",
};

export const KEY_TO_SLUG = Object.fromEntries(
  Object.entries(SLUG_TO_KEY).map(([slug, key]) => [key, slug])
);

export const ALL_DOOR_SLUGS = Object.keys(SLUG_TO_KEY);
