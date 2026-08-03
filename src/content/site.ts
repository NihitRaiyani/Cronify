/**
 * All visible copy for global chrome (navbar, CTAs, footer) lives here.
 * Copy rules (enforced by scripts/check-copy.mjs + scripts/verify-landing.mjs):
 * no banned claim terms, no dollar signs (₹ only), nothing invented — say what
 * a thing is and where it is, never how good it is.
 */

export const SITE = {
  name: "Cronify",
  tagline: "Demo-first websites for invisible local businesses",
  oneLiner:
    "Stop cold pitching. Discover invisible shops, measure their presence, and automatically generate a personalized demo website in their own language—before you ever contact them.",
  nav: [
    { label: "The journey", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  // Frontend-only build: CTAs are visual placeholders by design.
  cta: { label: "Start your trial", href: "#" },
  secondaryCta: { label: "Get early access", href: "#" },
} as const;
