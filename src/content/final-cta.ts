/**
 * Copy for the closing CTA panel. Copy rules (enforced by
 * scripts/check-copy.mjs): no claim terms, no dollar signs, nothing invented —
 * the only numbers are structural truths of the product.
 */

export const FINAL_CTA = {
  gujarati: "ડેમો પહેલાં",
  gujaratiGloss: "the demo comes first",
  titleStart: "Be there before the first",
  titleAccent: "hello.",
  lede: "The site for the next invisible shop can exist before you knock — walk in with something to show.",
  primary: { label: "Get early access", href: "#" },
  secondary: { label: "See what a shop receives", href: "#showcase" },
  chips: {
    templates: { value: "6", label: "shop templates" },
    firewall: { value: "0", label: "invented claims" },
  },
} as const;
