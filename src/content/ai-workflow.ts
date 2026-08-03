/** Workflow tabs section — four working modes over the eight-layer journey.
 *  Honest structural truths preserved: one fenced generation step, the claim
 *  firewall, validated content only, draft → review → approve, seven public
 *  signals, the 0–100 score, Gujarati/English. */
export const AI_WORKFLOW = {
  title: "Your entire agency workflow, inside one tool",
  lede: "Everything an agency needs to source, pitch, and close web design clients at scale without the cold outreach.",
  modes: [
    {
      key: "discovery",
      label: "Prospecting",
      icon: "radar",
      heading:
        "Find invisible local businesses and prioritize them by their presence score.",
      points: [
        "Automatically build lead lists in your workspace.",
        "Spot the businesses with the lowest presence scores.",
        "Clean, de-duplicated data ready for outreach.",
      ],
    },
    {
      key: "scoring",
      label: "Generation",
      icon: "gauge",
      heading:
        "Turn an invisible prospect into a finished demo website in seconds.",
      points: [
        "Generate fully responsive, personalized demo sites.",
        "Split-screen editor to refine and tweak any section.",
        "Fully SEO-optimized to rank locally upon delivery.",
      ],
    },
    {
      key: "drafting",
      label: "Pitching",
      icon: "pen",
      heading:
        "Send the finished demo straight to their WhatsApp, powered by AI voice.",
      points: [
        "Instant delivery of the finished pitch directly via WhatsApp.",
        "Voice agents can call and talk to leads in their own language.",
        "Skip the cold email and send them a product they can see.",
      ],
    },
    {
      key: "conversations",
      label: "Closing",
      icon: "chat",
      heading:
        "Run automated campaigns and nurture the lead until they close.",
      points: [
        "Follow up with sequenced messages automatically.",
        "End-to-end pipeline view of your leads.",
        "Turn the pitch into a booked sales conversation.",
      ],
    },
  ],
} as const;
