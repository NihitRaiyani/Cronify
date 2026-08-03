export const INTEGRATIONS = {
  eyebrow: "Plugs in",
  eyebrowGujarati: "જોડાણ",
  titleLines: ["The pipeline that plugs", "into the local internet"],
  lede: "Every layer of the journey — Accounts through Leads — taps into the public and private surfaces you need to close deals.",
  hub: "cronify",
  tiles: [
    { key: "maps", label: "Map listings" },
    { key: "reviews", label: "Reviews" },
    { key: "photos", label: "Photos" },
    { key: "hours", label: "Business hours" },
    { key: "qr", label: "QR share" },
    { key: "chat", label: "Chat follow-ups" },
    { key: "score", label: "Score signals" },
    { key: "demo", label: "Demo links" },
  ],
} as const;

export type IntegrationTileKey = (typeof INTEGRATIONS.tiles)[number]["key"];
