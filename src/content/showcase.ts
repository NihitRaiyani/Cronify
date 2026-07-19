export const SHOWCASE = {
  eyebrow: "Product",
  eyebrowGujarati: "પ્રોડક્ટ",
  titleStart: "What a shop",
  titleAccent: "receives.",
  lede: "A one-page site generated from public facts, rendered in the shop's language. Sections without grounded facts stay hidden — recreated here as an illustration.",
  address: "generated demo · draft — for operator review",
  caption:
    "Illustrative recreation of a generated demo site. The structure, the INDICATIVE price badges, and the hidden-section rule match the real render — no real shop is shown.",
  ariaDesktop:
    "Illustration of a generated demo website for a clinic: bilingual placeholder name, arched photo, two services with indicative rupee ranges, and a note that ungrounded sections stay hidden.",
  ariaMobile:
    "The same generated demo website shown at phone size with stacked sections.",
  mock: {
    brandGujarati: "તમારું ક્લિનિક",
    brandLatin: "Your clinic here",
    whatWhere: "Clinic · Rajkot",
    navLinks: ["Home", "Services", "Visit"],
    navCta: "Book",
    heroCta1: "Book a visit",
    heroCta2: "See services",
    photoNote: "photo from the listing",
    servicesTitle: "Services",
    servicesNote: "Representative services — not a live price list",
    services: [
      { name: "Consultation", range: "₹260–380", badge: "INDICATIVE" },
      { name: "Dental implant", range: "₹31,250–38,750", badge: "INDICATIVE" },
    ],
    hiddenNote: "testimonials hidden — no real reviews scraped",
    contactTitle: "Visit",
    contactLine: "address & hours — from the listing",
    langChip: "ગુજરાતી / English",
  },
} as const;
