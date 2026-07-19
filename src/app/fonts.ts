import localFont from "next/font/local";

// Measured substitutions (refs/measurements.md): Inter ← FT Regola Neue/Matter,
// Inter Tight ← Agentify headings (exact family), Fraunces ← ABC Arizona Mix.

export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

export const interTight = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});

export const fraunces = localFont({
  src: "../fonts/fraunces-latin-wght-normal.woff2",
  variable: "--font-serif",
  weight: "100 900",
  display: "swap",
});

export const notoGujarati = localFont({
  src: "../fonts/noto-sans-gujarati-gujarati-wght-normal.woff2",
  variable: "--font-gujarati",
  weight: "100 900",
  display: "swap",
  preload: false,
});
