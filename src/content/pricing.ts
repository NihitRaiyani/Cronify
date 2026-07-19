/**
 * Copy for the early-access pricing panel. No amounts exist yet — this section
 * says so plainly instead of inventing tiers or numbers.
 */

export const PRICING = {
  eyebrow: "Pricing",
  eyebrowGujarati: "કિંમત",
  titleStart: "Early access, priced",
  titleAccent: "later.",
  lede: "The price is being shaped with the first operators. This page never invents a number, and that rule holds here too — no figures until they are real.",
  panel: {
    title: "What exists today",
    chip: "early access · open",
    includes: [
      "Scan a city and an industry for shops with no website",
      "An explainable presence score, 0 to 100",
      "Demo generation in Gujarati or English",
      "Honest-render firewall — unknown facts stay hidden, never faked",
      "A draft → reviewed → approved gate before anything is shared",
      "One shareable demo link, plus a QR code",
    ],
    note: "Operators shape the price — joining early means being part of that conversation.",
  },
  cta: { label: "Get early access", href: "#" },
  secondaryCta: { label: "See the product", href: "#showcase" },
} as const;
