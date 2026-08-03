/**
 * Copy for the FAQ accordion. Answers stay grounded in how the product
 * actually behaves for agencies and freelancers using the demo-first approach.
 */

export const FAQ = {
  eyebrow: "FAQ",
  eyebrowGujarati: "સવાલો",
  title: "Everything you need to know",
  lede: "Six straight answers about how Cronify helps you discover leads, generate demos, and close website deals.",
  items: [
    {
      key: "what",
      q: "What is Cronify?",
      a: "Cronify is a complete pipeline for web design agencies and freelancers. It finds local businesses with no website, scores their online presence, and automatically generates a personalized demo website you can pitch them with.",
    },
    {
      key: "journey",
      q: "How does the eight-layer journey work?",
      a: "In order: 01 Accounts & Access, 02 Discovery & Data, 03 Presence Scoring, 04 Website Generation, 05 WhatsApp & Voice Agent, 06 SEO, 07 Campaigns, and 08 Marketing & Leads. Every step is automated.",
    },
    {
      key: "source",
      q: "Where does the data for the websites come from?",
      a: "From public map listings and social profiles. We read their name, category, location, hours, photos, reviews, and contact details to generate a highly accurate, honest demo site.",
    },
    {
      key: "language",
      q: "Which languages does it support?",
      a: "We currently support English and Gujarati. The language is intelligently chosen based on the business's location (e.g., urban vs rural) so you always pitch in the language the owner prefers.",
    },
    {
      key: "truth",
      q: "Do I have to pitch them manually?",
      a: "No. Cronify sends the finished demo straight to the prospect via WhatsApp, complete with sequenced campaign messages and an AI voice agent that can handle the initial conversation.",
    },
    {
      key: "cost",
      q: "What does it cost?",
      a: "You can start generating your first leads and scoring them for free. Paid plans start when you begin generating and sending demos at scale. Full breakdown in the pricing section.",
    },
  ],
} as const;
