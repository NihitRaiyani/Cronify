/**
 * Copy for the closing CTA panel. Copy rules (enforced by
 * scripts/check-copy.mjs): no claim terms, no dollar signs, nothing invented —
 * the only numbers are structural truths of the product (eight layers,
 * 0–100 score, seven public signals).
 */

export const FINAL_CTA = {
  title: "Start the journey from Discover to Grow.",
  sub: "Eight layers, one honest path: a 0–100 score from seven public signals, a bilingual draft, and a human review before anything ships.",
  primary: { label: "See a demo", href: "#" },
  secondary: { label: "Get early access", href: "#" },
} as const;
