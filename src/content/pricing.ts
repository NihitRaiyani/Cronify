/**
 * Copy for the pricing section. Amounts are in ₹ only and read as pilot
 * pricing; every plan fact is structural.
 */

export const PRICING = {
  eyebrow: "Pricing",
  eyebrowGujarati: "કિંમત",
  title: "Pricing for agencies of all sizes",
  lede: "Start prospecting and scoring for free. Upgrade when you're ready to generate demos and launch campaigns at scale.",
  billing: {
    monthly: "Billed monthly",
    yearly: "Billed yearly",
  },
  plans: [
    {
      icon: "walk",
      label: "Prospector",
      price: { monthly: "Free", yearly: "Free" },
      suffix: "forever",
      spec: "Layers 01–03 · Lead discovery",
      cta: "Start free",
      features: [
        "Discover invisible shops in your city",
        "Presence score from 0 to 100",
        "Secure workspace isolation",
        "100 scoring runs a month",
        "One user seat",
      ],
    },
    {
      icon: "run",
      label: "Growth Agency",
      price: { monthly: "₹3,900", yearly: "₹3,100" },
      suffix: "/month",
      spec: "Layers 01–06 · Full generation",
      cta: "Start growing",
      features: [
        "Everything in Prospector",
        "Automated website generation",
        "Live split-screen editor",
        "WhatsApp delivery",
        "Basic SEO optimization",
        "Three user seats",
      ],
    },
    {
      icon: "grow",
      label: "Scale",
      price: { monthly: "Custom", yearly: "Custom" },
      suffix: "",
      spec: "All eight layers · Complete pipeline",
      cta: "Talk to us",
      features: [
        "Everything in Growth",
        "AI Voice Agent conversations",
        "Sequenced WhatsApp campaigns",
        "Full pipeline CRM & Leads",
        "White-label options",
        "Dedicated account manager",
      ],
    },
  ],
} as const;
