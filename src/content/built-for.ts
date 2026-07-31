export const BUILT_FOR = {
  kicker: "Cronify — built for the shops on every main road",
  kickerGujarati: "દરેક બજારની દુકાન માટે",
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
