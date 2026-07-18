export const BUILT_FOR = {
  kicker: "Built for the shops on every main road",
  kickerGujarati: "દરેક બજારની દુકાન માટે",
  note: "Six templates, each shaped for a real category. A shop that fits none of them gets no demo — Lumora never fakes a fit.",
  verticals: [
    { key: "restaurant", label: "Restaurants & cafés", gujarati: "રેસ્ટોરન્ટ" },
    { key: "clinic", label: "Clinics", gujarati: "ક્લિનિક" },
    { key: "gym", label: "Gyms & fitness", gujarati: "જિમ" },
    { key: "clothing", label: "Clothing & boutiques", gujarati: "કપડાંની દુકાન" },
    { key: "salon", label: "Salons & spas", gujarati: "સલૂન" },
    { key: "electronics", label: "Electronics & mobile", gujarati: "ઇલેક્ટ્રોનિક્સ" },
  ],
} as const;

export type VerticalKey = (typeof BUILT_FOR.verticals)[number]["key"];
