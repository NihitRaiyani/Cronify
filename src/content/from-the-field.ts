/**
 * Copy for the field-notes section — the honest stand-in for testimonials.
 * Nothing here is a client quote: every card is an illustrative scene from
 * the eight-layer journey, labelled as such in the lede and in each footer.
 * No real people, no real businesses — only neighbourhood areas.
 */

export const FROM_THE_FIELD = {
  eyebrow: "From the field",
  eyebrowGujarati: "જમીન પરથી",
  title: "From the field",
  lede: "These are not client quotes. Early access is still opening, so instead: illustrative notes — the scenes the eight-layer journey is designed around, written as we picture them happening.",
  notes: [
    {
      layerTag: "Layer 03 — Score",
      body: "A salon owner opens their scorecard for the first time. The 18 out of 100 stings for a second — then each of the seven public signals is spelled out underneath: no site, no hours, photos years old. The number stops being a verdict and starts being a to-do list.",
      scenario: "Salon owner — illustrative",
      area: "Athwalines, Surat",
    },
    {
      layerTag: "Layer 06 — Share",
      body: "A draft goes live and a small QR card lands next to the billing counter. A regular scans it while paying and the shop's page opens on her phone — Gujarati first, English a tap away. The owner watches someone read about the shop, in the shop.",
      scenario: "Bakery counter — illustrative",
      area: "Adajan, Surat",
    },
    {
      layerTag: "Layer 07 — Converse",
      body: "An enquiry arrives at nine in the evening, in Gujarati, asking about batch timings. A reply is drafted from the page content the owner already approved; they read it, tap approve, and the answer goes out the same day — in the language it came in.",
      scenario: "Tuition class — illustrative",
      area: "Katargam, Surat",
    },
  ],
} as const;
