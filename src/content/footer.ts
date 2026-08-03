/**
 * Copy for the site footer. 
 * Contact entries are visual placeholders.
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
  wordmark: "cronify",
  blurb:
    "Cronify is the demo-first pipeline for web design agencies and freelancers.",
  gujarati: "એજન્સીઓ માટે",
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
        { label: "Lead Scoring", href: "#how-it-works" },
        { label: "WhatsApp Agents", href: "#features" },
        { label: "Agency Workspace", href: "#ai-workflow" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "hello@cronify.example", href: "#", accent: true },
        { label: "Chat", href: "#" },
        { label: "Gujarat, India", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Cronify",
  tagline: "Stop cold pitching. Start demoing.",
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
