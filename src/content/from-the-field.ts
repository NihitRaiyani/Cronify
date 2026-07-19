/**
 * Copy for the before/after section — the honest stand-in for testimonials.
 * No names, no quotes: just the artifact, plus the structural numbers the
 * product is actually made of. The shop row mirrors the hero console
 * illustration (Salon · Athwalines, score 18) so the story stays consistent.
 */

export const FROM_THE_FIELD = {
  eyebrow: "From the field",
  eyebrowGujarati: "જમીન પરથી",
  titleStart: "Before, and the first",
  titleAccent: "after.",
  lede: "Early access is just opening, so there are no testimonials to put here yet. In their place, the artifact itself: a shop as Lumora finds it, and the draft its owner sees on first visit.",
  before: {
    header: "on the map, and nowhere else",
    shopLabel: "Salon · Athwalines",
    chip: "no website",
    score: 18,
    scoreLabel: "presence score",
  },
  after: {
    header: "the draft, on first visit",
    brandLine: "તમારો બિઝનેસ",
    brandSub: "your shop, in your language",
    chip: "draft — for review",
  },
  aria: "Illustration of a before and after: on the left, a salon listing that exists only as a map pin with no website and a low presence score; a dashed arrow points to the right, where a Gujarati draft site skeleton is marked draft, for review.",
  counters: [
    { value: 6, label: "shop templates" },
    { value: 2, label: "languages" },
    { value: 7, label: "score signals" },
    { value: 4, label: "pipeline steps" },
    { value: 0, label: "invented claims" },
  ],
} as const;
