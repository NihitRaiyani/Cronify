/**
 * Copy for the site footer. Copy rules (enforced by scripts/check-copy.mjs):
 * no claim terms, no dollar signs, nothing invented — say what a thing is and
 * where it is, never how good it is.
 */

export const FOOTER = {
  oneLiner:
    "Lumora finds local shops with no website, scores how visible each one is, and generates an honest bilingual demo site — before anyone is contacted.",
  rulePlain: "Say what a shop is and where it is —",
  ruleSerif: "never how good it is.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Showcase", href: "#showcase" },
      ],
    },
    {
      title: "Details",
      links: [
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
        { label: "Early access", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Lumora — for the shops of Gujarat.",
  copyrightGujarati: "ગુજરાત",
  honesty: "This page ships every asset itself — zero external requests.",
} as const;
