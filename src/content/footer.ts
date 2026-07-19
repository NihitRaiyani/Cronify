/**
 * Copy for the site footer. Copy rules (enforced by scripts/check-copy.mjs):
 * no claim terms, no dollar signs, nothing invented — say what a thing is and
 * where it is, never how good it is. Contact entries are visual placeholders.
 */

type FooterLink = {
  readonly label: string;
  readonly href: string;
  readonly accent?: boolean;
};

type FooterColumn = {
  readonly title: string;
  readonly links: readonly FooterLink[];
};

export const FOOTER = {
  wordmark: "lumora",
  blurb:
    "Lumora drafts honest bilingual sites for local shops with no web presence.",
  gujarati: "ગુજરાતની દુકાનો માટે",
  contactTitle: "Contact",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
  columns: [
    {
      title: "Menu",
      links: [
        { label: "The journey", href: "#how-it-works" },
        { label: "Features", href: "#features" },
        { label: "Showcase", href: "#showcase" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Claim firewall", href: "#features" },
        { label: "Review gate", href: "#ai-workflow" },
        { label: "Score signals", href: "#how-it-works" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "hello@lumora.example", href: "#", accent: true },
        { label: "Chat", href: "#" },
        { label: "Gujarat, India", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Lumora",
  tagline: "Made for the shops the internet forgot.",
} as const satisfies {
  wordmark: string;
  blurb: string;
  gujarati: string;
  contactTitle: string;
  socials: readonly { label: string; href: string }[];
  columns: readonly FooterColumn[];
  copyright: string;
  tagline: string;
};
