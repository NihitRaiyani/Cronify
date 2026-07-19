/**
 * Copy for the FAQ accordion. Answers stay grounded in how the product
 * actually behaves — no promises, no invented numbers.
 */

export const FAQ = {
  eyebrow: "FAQ",
  eyebrowGujarati: "સવાલો",
  titleStart: "Questions, answered",
  titleAccent: "plainly.",
  lede: "Six short answers about what Lumora does — and what it refuses to do.",
  items: [
    {
      key: "real",
      q: "Is the demo site real?",
      a: "Yes. Every section is generated from public listing facts — name, category, location, photos, hours, reviews. If a fact was never found, the section that needs it stays hidden instead of being filled in.",
    },
    {
      key: "shops",
      q: "Which shops does it work for?",
      a: "Exactly six categories: restaurants & cafés, clinics, gyms & fitness, clothing & boutiques, salons & spas, and electronics & mobile. A shop that fits none of the six templates gets no demo — Lumora never fakes a fit.",
    },
    {
      key: "language",
      q: "Which languages, and who decides?",
      a: "Gujarati or English, chosen by a pincode → locality → city cascade — urban areas usually resolve to English, rural ones to Gujarati. Shop names are transliterated, never translated: વેદાંત stays Vedant.",
    },
    {
      key: "ai",
      q: "Does AI write the website?",
      a: "One fenced model call formats verified facts into a fixed JSON shape — that is its whole job. Layout, structure, and sections are code, and the model never writes a price.",
    },
    {
      key: "cost",
      q: "What does it cost?",
      a: "There is no price list yet. Lumora is in early access, and pricing is being shaped with the first operators — numbers appear here only once they are real.",
    },
    {
      key: "auto",
      q: "Is anything sent automatically?",
      a: "No. Every demo starts as a draft, gets reviewed, and is only then approved. The operator shares one link personally — nothing goes out on its own.",
    },
  ],
} as const;
