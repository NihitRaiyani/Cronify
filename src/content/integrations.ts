export const INTEGRATIONS = {
  eyebrow: "Plugs in",
  eyebrowGujarati: "જોડાણ",
  titleLines: ["Meets the shop", "where it already is"],
  lede: "Every layer of the journey — Discover through Grow — feeds the everyday surfaces a small shop already runs on.",
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
