export const INTEGRATIONS = {
  eyebrow: "Runs on",
  eyebrowGujarati: "આધાર",
  titleStart: "A small,",
  titleAccent: "honest stack.",
  lede: "No invented partnerships and no logo wall — this is the actual machinery behind every scan, score, and demo.",
  orbit: {
    outer: [
      "Google Maps data · Apify",
      "Groq · Llama 3.3 70B",
      "Supabase",
      "WhatsApp share · guardrailed",
      "QR codes",
    ],
    inner: ["Next.js", "FastAPI", "Clerk", "Pinecone"],
  },
  roles: [
    {
      title: "Discovery",
      body: "Google Maps listings scraped through Apify actors — including the shops whose only link is a Linktree or wa.me.",
    },
    {
      title: "Generation",
      body: "One Groq call (Llama 3.3 70B, JSON mode) per shop, validated against a fixed content schema.",
    },
    {
      title: "Data & memory",
      body: "Supabase stores every listing with per-operator isolation; Pinecone keeps a brand-memory index of scraped facts.",
    },
    {
      title: "Handover",
      body: "A single demo link, a QR for the counter, and a guardrailed WhatsApp self-send for phone previews — never auto-sent to owners.",
    },
  ],
} as const;
