import type { Metadata, Viewport } from "next";
import {
  bricolage,
  instrumentSans,
  instrumentSerif,
  notoGujarati,
} from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumora — websites for invisible local businesses",
  description:
    "Lumora finds local shops with no website, scores their digital presence, and generates an honest Gujarati-or-English demo site — ready before the first conversation.",
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${bricolage.variable} ${instrumentSerif.variable} ${notoGujarati.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
