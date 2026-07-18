export const HERO = {
  eyebrow: "Demo-first outreach",
  eyebrowGujarati: "ડેમો પહેલાં",
  titleLine1: "The website exists",
  titleLine2: "before the first",
  titleAccent: "hello.",
  sub: "Lumora finds local shops with no website, scores how visible each one is online, and generates an honest Gujarati-or-English demo site — ready to share before you ever knock.",
  facts: [
    { value: "6", label: "shop types" },
    { value: "2", label: "languages" },
    { value: "0", label: "invented claims" },
  ],
  console: {
    title: "operator console",
    badge: "preview",
    city: "Surat",
    industry: "Salons",
    scanNote: "shops without a website · lowest presence first",
    rows: [
      { label: "Salon · Athwalines", score: 18, status: "ready" },
      { label: "Salon · Ring Road", score: 27, status: "generating" },
      { label: "Beauty parlour · Vesu", score: 34, status: "queued" },
      { label: "Salon · Adajan", score: 41, status: "queued" },
    ],
    statusLabels: {
      ready: "demo ready",
      generating: "generating",
      queued: "queued",
    },
    footer: "grounded from public listings — nothing invented",
  },
  chips: {
    language: { gujarati: "નમસ્તે", label: "Gujarati & English" },
    firewall: "0 invented claims",
  },
  ariaConsole:
    "Illustration of the Lumora operator console: a scan for salons in Surat lists shops without websites sorted by lowest presence score, one with a demo ready to share.",
} as const;

export type ConsoleRowStatus = (typeof HERO.console.rows)[number]["status"];
