/**
 * Copy for the pricing section. Amounts are in ₹ only and read as pilot
 * pricing; every plan fact is structural (layers included, runs per month,
 * the review gate, the two languages) — nothing invented as a hard promise.
 */

export const PRICING = {
  eyebrow: "Pricing",
  eyebrowGujarati: "કિંમત",
  title: "Pricing that walks before it runs",
  lede: "The first three layers of the journey cost nothing. Pay when drafting, review, and sharing begin — and talk to us when a whole city is on the list.",
  billing: {
    monthly: "Billed monthly",
    yearly: "Billed yearly",
  },
  plans: [
    {
      icon: "walk",
      label: "For first walks",
      price: { monthly: "Free", yearly: "Free" },
      suffix: "for one city",
      spec: "Layers 01–03 · one city, one industry",
      cta: "Start the pilot",
      features: [
        "Discover shops through public map listings",
        "Seven public signals read per shop",
        "A presence score from 0 to 100, explained",
        "50 scoring runs a month",
        "One reviewer seat",
      ],
    },
    {
      icon: "run",
      label: "For steady runs",
      price: { monthly: "₹2,400", yearly: "₹1,900" },
      suffix: "/month",
      spec: "Layers 01–07 · 500 runs a month",
      cta: "Run the journey",
      features: [
        "Everything in the free walk",
        "Drafts in Gujarati and English",
        "Draft → review → approve gate on every page",
        "Share links with QR codes",
        "Replies handled in both languages",
        "Three reviewer seats",
      ],
    },
    {
      icon: "grow",
      label: "For whole cities",
      price: { monthly: "Custom", yearly: "Custom" },
      suffix: "",
      spec: "All eight layers · runs sized to your list",
      cta: "Talk to us",
      features: [
        "Every layer, Discover through Grow",
        "Runs sized to your city list",
        "Review gates shaped to your team",
        "Onboarding in Gujarati or English",
        "A named human to call",
      ],
    },
  ],
} as const;
