/**
 * All visible copy for global chrome (navbar, CTAs, footer) lives here.
 * Copy rules (enforced by scripts/check-copy.mjs + scripts/verify-landing.mjs):
 * no banned claim terms, no dollar signs (₹ only), nothing invented — say what
 * a thing is and where it is, never how good it is.
 */

export const SITE = {
  name: "Cronify",
  tagline: "Websites for invisible local businesses",
  oneLiner:
    "An eight-layer automation journey: find local shops with no website, understand and score their presence, draft an honest local-language demo, then share, converse, and grow.",
  nav: [
    { label: "The journey", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  // Frontend-only build: CTAs are visual placeholders by design.
  cta: { label: "See a demo", href: "#" },
  secondaryCta: { label: "Get early access", href: "#" },
} as const;
