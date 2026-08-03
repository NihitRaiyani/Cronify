export const HOW_IT_WORKS = {
  eyebrow: "The wedge",
  eyebrowGujarati: "કેવી રીતે",
  title: "Eight layers, one automated journey",
  lede: "A complete pipeline to find, generate, and sell. From an invisible shop to a closed deal, powered by a demo-first approach.",
  panel: {
    heading: "Stop cold pitching.\nStart demoing.",
    cta: { label: "Start your trial", href: "#" },
  },
  layers: [
    {
      key: "accounts",
      number: "01",
      title: "Accounts & Access",
      body: "Secure operator login, workspaces, and data isolation so your agency only sees your own businesses and leads.",
    },
    {
      key: "discovery",
      number: "02",
      title: "Discovery & Data",
      body: "Automatically find local businesses with no website. Clean and de-duplicate the data.",
    },
    {
      key: "scoring",
      number: "03",
      title: "Presence Scoring",
      body: "Score each business on how present it is online (reviews, photos, hours). The lower the score, the bigger the opportunity.",
    },
    {
      key: "generation",
      number: "04",
      title: "Website Generation",
      body: "Turn a business into a finished, personalized demo automatically — right industry, right language, real data.",
    },
    {
      key: "whatsapp",
      number: "05",
      title: "WhatsApp & Voice",
      body: "Send the finished demo straight to WhatsApp, with an AI agent that can call and converse with leads.",
    },
    {
      key: "seo",
      number: "06",
      title: "SEO",
      body: "Make every generated site rank — on-page optimization, local keywords, metadata, and schema markup.",
    },
    {
      key: "campaigns",
      number: "07",
      title: "Campaigns",
      body: "Run sequenced outreach at scale, following up on demos until you get a booked conversation.",
    },
    {
      key: "leads",
      number: "08",
      title: "Marketing & Leads",
      body: "The growth engine: capture, organize, and nurture leads end-to-end, full pipeline from invisible shop to paying customer.",
    },
  ],
} as const;

export type LayerKey = (typeof HOW_IT_WORKS.layers)[number]["key"];
