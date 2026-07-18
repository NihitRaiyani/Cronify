import localFont from "next/font/local";

export const instrumentSans = localFont({
  src: "../fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "400 700",
  display: "swap",
});

export const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const notoGujarati = localFont({
  src: "../fonts/noto-sans-gujarati-gujarati-wght-normal.woff2",
  variable: "--font-gujarati",
  weight: "100 900",
  display: "swap",
  preload: false,
});
