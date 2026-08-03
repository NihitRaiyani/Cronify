/**
 * Copy for the field-notes section — the honest stand-in for testimonials.
 * Illustrative scenes from the perspective of an agency using the eight-layer journey.
 */

export const FROM_THE_FIELD = {
  eyebrow: "From the field",
  eyebrowGujarati: "જમીન પરથી",
  title: "From the field",
  lede: "These are not client quotes. Early access is still opening, so instead: illustrative notes — the scenes our pipeline is designed around, written as we picture them happening for your agency.",
  notes: [
    {
      layerTag: "Layer 03 — Score",
      body: "An agency owner opens their Cronify workspace. They see 12 salons in their area with a presence score below 40. Instead of cold-calling them with a generic pitch, they select the lowest three and hit 'Generate'.",
      scenario: "Agency Owner — illustrative",
      area: "Athwalines, Surat",
    },
    {
      layerTag: "Layer 05 — WhatsApp",
      body: "A salon owner receives a WhatsApp message with a link. It's not a pitch for a service—it's a finished, beautiful website for their own salon, in Gujarati. The AI voice agent follows up, and the owner books a call.",
      scenario: "Freelance Designer — illustrative",
      area: "Adajan, Surat",
    },
    {
      layerTag: "Layer 08 — Leads",
      body: "The pipeline view shows 4 demos sent, 2 conversations opened, and 1 deal closed—all without sending a single cold email or writing a line of code before the contract was signed.",
      scenario: "Web Agency — illustrative",
      area: "Katargam, Surat",
    },
  ],
} as const;
