/** Workflow tabs section — four working modes over the eight-layer journey.
 *  Honest structural truths preserved: one fenced generation step, the claim
 *  firewall, validated content only, draft → review → approve, seven public
 *  signals, the 0–100 score, Gujarati/English. */
export const AI_WORKFLOW = {
  title: "One journey, four working modes",
  lede: "Eight layers run underneath, from discover to grow. Pick the mode that meets your day — the journey stays the same.",
  modes: [
    {
      key: "discovery",
      label: "Discovery runs",
      icon: "radar",
      heading:
        "Finds a business in public map listings and reads what it already shows the world.",
      points: [
        "Starts from public map listings, not private data.",
        "Reads seven public signals for every business.",
        "Builds understanding before anything is written.",
      ],
    },
    {
      key: "scoring",
      label: "Scoring desk",
      icon: "gauge",
      heading:
        "Turns seven public signals into one presence score you can read at a glance.",
      points: [
        "Scores land on a plain 0–100 scale.",
        "Each signal shows its share of the score.",
        "The same rubric applies to every business.",
      ],
    },
    {
      key: "drafting",
      label: "Draft studio",
      icon: "pen",
      heading:
        "Drafts pages from verified facts and holds every one for human review.",
      points: [
        "One fenced generation step formats verified facts.",
        "A claim firewall strips unearned praise on sight.",
        "Every page moves through draft, review, approve.",
      ],
    },
    {
      key: "conversations",
      label: "Conversations",
      icon: "chat",
      heading:
        "Shares approved pages and keeps the replies coming in Gujarati and English.",
      points: [
        "Replies come in Gujarati or English.",
        "Answers draw only on approved, validated content.",
        "Every conversation feeds the next round of growth.",
      ],
    },
  ],
} as const;
