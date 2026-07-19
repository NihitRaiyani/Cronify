export const SHOWCASE = {
  eyebrow: "Showcase",
  eyebrowGujarati: "નમૂનો",
  title: "A demo in the shop's own language",
  lede: "A one-page draft written from public facts, in Gujarati or English — recreated here as an illustration; no real shop is shown.",
  overlay:
    "A draft page the owner can read without switching languages — hidden wherever a fact is unknown.",
  cta: "See a demo",
  mockAria:
    "Illustration of a generated demo page for a small shop: Gujarati shop name in the header, a hero block, three fact-backed sections with an indicative rupee range, and one dashed section held back because its fact is unknown.",
  mock: {
    address: "demo draft · for review",
    lang: "ગુ / EN",
    name: "શ્રી ગણેશ સ્ટોર",
    nameSub: "Kirana · Rajkot",
    heroTitle: "તમારી દુકાન, તમારી ભાષામાં",
    heroSub: "draft from seven public signals",
    heroCta: "મુલાકાત લો",
    strips: [
      { label: "સેવાઓ", sub: "from the listing", chip: "₹40–60 · અંદાજિત" },
      { label: "સમય", sub: "hours as published" },
      { label: "સરનામું", sub: "public map listings" },
    ],
    hidden: "hidden — fact unknown",
  },
  points: [
    {
      title: "Two languages, decided honestly",
      body: "Gujarati or English is read from how the shop already writes in public — the page follows the shop, not a default locale.",
    },
    {
      title: "Sections earn their place",
      body: "A section appears only when one of the seven public signals backs it. No grounded fact, no section — it stays hidden and says so.",
    },
    {
      title: "Approved before anyone sees it",
      body: "Every page holds at 05 Review: the owner reads, edits and approves the draft — only then does 06 Share put it in front of customers.",
    },
  ],
} as const;
