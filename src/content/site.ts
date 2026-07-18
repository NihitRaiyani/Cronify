/**
 * All visible copy for global chrome (navbar, CTAs, footer) lives here.
 * Copy rules (enforced by scripts/check-copy.mjs + scripts/verify-landing.mjs):
 * no banned claim terms, no dollar signs (₹ only), nothing invented — say what
 * a thing is and where it is, never how good it is.
 */

export const SITE = {
  name: "Lumora",
  tagline: "Websites for invisible local businesses",
  oneLiner:
    "Find local shops with no website, score their digital presence, and generate an honest local-language demo site — before anyone is contacted.",
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  // Frontend-only build: CTAs are visual placeholders by design.
  cta: { label: "Get early access", href: "#" },
  secondaryCta: { label: "See the product", href: "#showcase" },
} as const;
