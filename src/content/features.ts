export const FEATURES = {
  title: "Built to automate the road from invisible to online",
  lede: "Four working parts carry the eight layers. Each one says what a shop is and where it is — never how good it is.",
  cta: { label: "See a demo", href: "#" },
  rows: [
    {
      key: "discover",
      layers: "Layers 1–2",
      title: "Street-level discovery",
      body: "The journey starts by finding shops that are invisible online and reading only what their public listings already say.",
      points: [
        "Scans public map listings area by area for shops with no real website.",
        "A link-in-bio page or a bare social profile still counts as invisible.",
        "Thin listings are set aside for onboarding instead of being faked.",
      ],
      visual: "map",
    },
    {
      key: "score",
      layers: "Layer 3",
      title: "A score you can explain",
      body: "Every shop gets a presence score from 0 to 100, built from seven weighted public signals.",
      points: [
        "Website, reviews, photos, social, rating, description, hours.",
        "The list sorts lowest first — the neediest lead comes first.",
        "Every number traces back to a public signal you can point at.",
      ],
      visual: "score",
    },
    {
      key: "draft",
      layers: "Layers 4–5",
      title: "Drafts that stay honest",
      body: "A demo site is assembled from known facts only, then waits behind a human gate.",
      points: [
        "Unearned claims are stripped before render — a firewall against flattery.",
        "If a fact was never collected, its section stays hidden, not filled in.",
        "Draft → reviewed → approved. Nothing ships without a person.",
      ],
      visual: "draft",
    },
    {
      key: "handover",
      layers: "Layers 6–8",
      title: "Share, converse, grow",
      body: "One link and a QR code open the conversation — and the loop keeps running after it.",
      points: [
        "Gujarati or English, decided by pincode, locality, then city.",
        "Shop names are transliterated, never translated — વેદાંત stays Vedant.",
        "₹ ranges come from a market corpus and carry an INDICATIVE badge.",
      ],
      visual: "handover",
    },
  ],
} as const;

export type FeatureRowKey = (typeof FEATURES.rows)[number]["key"];
export type FeatureVisual = (typeof FEATURES.rows)[number]["visual"];
