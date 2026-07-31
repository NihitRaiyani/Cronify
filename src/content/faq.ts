/**
 * Copy for the FAQ accordion. Answers stay grounded in how the product
 * actually behaves — the eight-layer journey, public listings only,
 * Gujarati/English, and the draft → review → approve gate. No promises,
 * no invented numbers.
 */

export const FAQ = {
  eyebrow: "FAQ",
  eyebrowGujarati: "સવાલો",
  title: "Asked, answered — honestly",
  lede: "Six straight answers about what Cronify does, where its facts come from, and what it refuses to make up.",
  items: [
    {
      key: "what",
      q: "What is Cronify?",
      a: "Cronify reads a local shop's public presence and turns it into a working demo website in Gujarati or English. Every shop moves through an eight-layer journey — from being discovered in public map listings to a page that keeps improving — and nothing is shared until a person has reviewed and approved it.",
    },
    {
      key: "journey",
      q: "How does the eight-layer journey work?",
      a: "In order: 01 Discover finds the shop in public listings, 02 Understand reads what those listings say, 03 Score rates its presence from 0 to 100, 04 Draft builds the demo site, 05 Review puts a person in the loop, 06 Share hands the owner one link, 07 Converse carries the conversation that follows, and 08 Grow tracks what changes after.",
    },
    {
      key: "source",
      q: "Where does the information come from?",
      a: "Only from public listings — the seven public signals a shop already shows the internet: name, category, location, hours, photos, reviews, and contact details. If a signal was never found, the section that needs it stays hidden instead of being filled in.",
    },
    {
      key: "language",
      q: "Which languages does it write in?",
      a: "Gujarati and English, chosen by a pincode → locality → city cascade — urban areas usually resolve to English, rural ones to Gujarati. Shop names are transliterated, never translated: વેદાંત stays Vedant on the page.",
    },
    {
      key: "truth",
      q: "Can a demo say something untrue?",
      a: "It is built not to. A claim firewall blocks invented facts, any section missing its fact stays hidden rather than guessed, and every draft passes a human review gate before it can be approved and shared.",
    },
    {
      key: "cost",
      q: "What does it cost?",
      a: "The first three layers — Discover, Understand, Score — cost nothing for one city. Paid plans are in rupees (₹) and begin when drafting starts; the full breakdown sits in the pricing section above.",
    },
  ],
} as const;
