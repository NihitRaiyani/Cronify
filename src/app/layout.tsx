import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
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
        <noscript>
          {/* Motion entrances SSR at opacity 0; without JS, force them visible. */}
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night-900"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
