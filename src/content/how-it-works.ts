export const HOW_IT_WORKS = {
  eyebrow: "The journey",
  eyebrowGujarati: "કેવી રીતે",
  title: "Eight layers, one automated journey",
  lede: "The same order the work actually happens in — from a shop nobody can find to a loop that keeps improving.",
  panel: {
    heading: "From street to site,\nlayer by layer",
    cta: { label: "See a demo", href: "#" },
  },
  layers: [
    {
      key: "discover",
      number: "01",
      title: "Discover",
      body: "Surface nearby shops that are invisible online — no website, no way to be found.",
    },
    {
      key: "understand",
      number: "02",
      title: "Understand",
      body: "Read what public listings already say about each shop. Nothing more.",
    },
    {
      key: "score",
      number: "03",
      title: "Score",
      body: "An explainable presence score from 0 to 100, from seven public signals.",
    },
    {
      key: "draft",
      number: "04",
      title: "Draft",
      body: "A demo site assembled from known facts only, in the shop's own language.",
    },
    {
      key: "review",
      number: "05",
      title: "Review",
      body: "A human gate: every draft is reviewed and approved before anyone sees it.",
    },
    {
      key: "share",
      number: "06",
      title: "Share",
      body: "One link and a QR code, ready before the first conversation.",
    },
    {
      key: "converse",
      number: "07",
      title: "Converse",
      body: "Follow-ups in Gujarati or English, matched to how the shop actually talks.",
    },
    {
      key: "grow",
      number: "08",
      title: "Grow",
      body: "See what changed since the demo went out, then run the loop again.",
    },
  ],
} as const;

export type LayerKey = (typeof HOW_IT_WORKS.layers)[number]["key"];
