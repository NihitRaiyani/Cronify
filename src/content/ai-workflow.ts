export const AI_WORKFLOW = {
  eyebrow: "AI, fenced",
  eyebrowGujarati: "મર્યાદામાં",
  titleStart: "One model call,",
  titleAccent: "fenced in.",
  lede: "Generation is template injection, not website-writing. The model formats verified facts into a fixed shape — it never decides what is true.",
  pipeline: [
    { key: "facts", label: "Scraped facts", sub: "name · photos · hours" },
    { key: "prompt", label: "Grounded prompt", sub: "invention forbidden" },
    { key: "slice", label: "Validated slice", sub: "fixed JSON shape" },
    { key: "merge", label: "Deterministic merge", sub: "code, not model" },
  ],
  neverTitle: "What the model may never do",
  nevers: [
    "Invent services, prices, or reviews",
    "Add credentials, awards, or partners",
    "Praise — unearned claims are stripped on sight",
    "Fill a gap — a missing fact hides its section",
  ],
  redactedIntro: "The claim firewall, doing its job:",
  // Redacted on purpose: rendering the banned terms would trip the page's own
  // fabrication scan — the blocks are the point.
  redacted: ["pre████r", "#█", "wor██-c██ss", "aw███-wi████g", "★★★★★"],
  selfNote: "The same rule applies to every sentence on this page.",
} as const;
