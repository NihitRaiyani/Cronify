export const FEATURES = {
  eyebrow: "Features",
  eyebrowGujarati: "ખાસિયતો",
  titleStart: "Built to stay",
  titleAccent: "honest.",
  lede: "The product's rule — say what a shop is and where it is, never how good it is — is enforced in code. These are the pieces that do it.",
  items: [
    {
      key: "discovery",
      title: "Street-level discovery",
      body: "Scans Google Maps area by area for shops with no real website. A Linktree, a wa.me link, or a bare social page still counts as invisible.",
    },
    {
      key: "score",
      title: "A score you can explain",
      body: "Every shop gets a presence score from 0 to 100, built from seven weighted public signals — website, reviews, photos, social, rating, description, hours.",
    },
    {
      key: "language",
      title: "Two languages, decided honestly",
      body: "Pincode, then locality, then city pick Gujarati or English. Shop names are transliterated, never translated — વેદાંત stays Vedant.",
    },
    {
      key: "firewall",
      title: "A firewall against flattery",
      body: "Unearned claims are stripped before render. If a fact was never scraped, the section that needs it stays hidden instead of getting filled in.",
    },
    {
      key: "neediest",
      title: "Neediest lead first",
      body: "The operator dashboard sorts by lowest presence score, so the shop that is hardest to find online is the first one you see.",
    },
    {
      key: "pricing",
      title: "₹ ranges, never guessed",
      body: "Price ranges come from a deterministic market corpus and carry an INDICATIVE badge. The language model never writes a number.",
    },
  ],
} as const;

export type FeatureKey = (typeof FEATURES.items)[number]["key"];
