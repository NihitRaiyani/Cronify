export const HOW_IT_WORKS = {
  eyebrow: "How it works",
  eyebrowGujarati: "કેવી રીતે",
  titleStart: "From street to",
  titleAccent: "site.",
  lede: "The real pipeline, in four steps — the same order the code runs in.",
  steps: [
    {
      key: "discover",
      number: "01",
      title: "Discover",
      tagline: "Pick a city and an industry",
      body: "Lumora scans Google Maps for shops without a real website. Thin listings — no name, no photos, fewer than three reviews — are set aside for onboarding instead of being faked.",
    },
    {
      key: "score",
      number: "02",
      title: "Score",
      tagline: "See how invisible each shop is",
      body: "Each shop gets an explainable 0–100 presence score from seven public signals, and the list sorts lowest first — the neediest lead comes first.",
    },
    {
      key: "generate",
      number: "03",
      title: "Generate",
      tagline: "A demo site, grounded in facts",
      body: "One fenced model call formats the scraped facts into a validated content slice; a frozen template renders it in Gujarati or English. Unknown facts stay empty, and their sections stay hidden.",
    },
    {
      key: "share",
      number: "04",
      title: "Share",
      tagline: "Review, approve, hand it over",
      body: "Every demo starts as a draft. The operator reviews it, approves it, and shares one link — nothing is ever sent to a shop owner automatically.",
    },
  ],
} as const;

export type StepKey = (typeof HOW_IT_WORKS.steps)[number]["key"];
