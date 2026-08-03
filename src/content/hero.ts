export const HERO = {
  titleLine1: "Pitch the finished website.",
  titleLine2: "Not the service.",
  sub: "Discover invisible shops, generate bilingual demo sites automatically, and sell with a finished product — all from one eight-layer engine.",
  cta: { label: "See the 8 layers", href: "#how-it-works" },
  console: {
    title: "Presence scan",
    scope: "Surat · Salons",
    badge: "Layer 3 · Score",
    stats: [
      { value: "38", label: "Shops scanned" },
      { value: "12", label: "Score below 40" },
      { value: "4", label: "Demos generated" },
    ],
    columns: { name: "Shop", area: "Area", score: "Score" },
    rows: [
      { name: "Salon", area: "Athwalines", score: 18, status: "ready" },
      { name: "Salon", area: "Ring Road", score: 27, status: "generating" },
      { name: "Beauty parlour", area: "Vesu", score: 34, status: "queued" },
      { name: "Salon", area: "Adajan", score: 41, status: "queued" },
      { name: "Salon", area: "Katargam", score: 47, status: "queued" },
      { name: "Beauty parlour", area: "Piplod", score: 52, status: "queued" },
      { name: "Salon", area: "Varachha", score: 58, status: "queued" },
    ],
    statusLabels: {
      ready: "demo ready",
      generating: "drafting",
      queued: "queued",
    },
    sideRail: ["Discover", "Understand", "Score", "Draft"],
    footer: "grounded from public listings — nothing invented",
    gujarati: "નમસ્તે",
  },
  ariaScene:
    "Dusk mountain scene: photographed ridges under a fading sky, a sunlit peak in the foreground, a lime line tracing the path of the journey.",
  ariaConsole:
    "Illustration of the Cronify presence console: a scan for salons in Surat lists shops without websites sorted by lowest presence score, one with a demo ready to share.",
} as const;

export type ConsoleRowStatus = (typeof HERO.console.rows)[number]["status"];
