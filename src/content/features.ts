export const FEATURES = {
  title: "A machine built for freelancers and agencies",
  lede: "Four working parts carry the eight layers. Everything you need to discover prospects, generate demos, and close deals.",
  cta: { label: "Start your trial", href: "#" },
  rows: [
    {
      key: "discover",
      layers: "Layers 1–3",
      title: "Discovery & Scoring",
      body: "The journey starts by finding shops that are invisible online and measuring exactly how much help they need.",
      points: [
        "Secure workspace isolation for you and your team.",
        "Scans public listings area by area for shops with no real website.",
        "Every shop gets a presence score from 0 to 100 — the lower the score, the bigger the opportunity.",
      ],
      visual: "map",
    },
    {
      key: "draft",
      layers: "Layers 4",
      title: "Automated Demo Generation",
      body: "A finished demo site is assembled instantly from known facts, designed to look bespoke, never like a template.",
      points: [
        "Right industry, right language, real photos or curated stock.",
        "Live split-screen editor so you can refine any section.",
        "A finished product you can pitch instead of a cold service offer.",
      ],
      visual: "draft",
    },
    {
      key: "handover",
      layers: "Layers 5-6",
      title: "Delivery & SEO",
      body: "Send the finished demo straight to WhatsApp, fully optimized to rank locally.",
      points: [
        "AI voice agents can call and talk to leads in their own language.",
        "On-page optimization and local keywords applied automatically.",
        "Gujarati or English, decided by pincode, locality, then city.",
      ],
      visual: "handover",
    },
    {
      key: "score",
      layers: "Layers 7–8",
      title: "Campaigns & Pipeline",
      body: "The growth engine: sequence messages, track follow-ups, and convert invisible shops into paying clients.",
      points: [
        "Automated outreach campaigns so you don't have to chase manually.",
        "End-to-end lead management and pipeline tracking.",
        "Turn a generated site into an actual business conversation.",
      ],
      visual: "score",
    },
  ],
} as const;

export type FeatureRowKey = (typeof FEATURES.rows)[number]["key"];
export type FeatureVisual = (typeof FEATURES.rows)[number]["visual"];
