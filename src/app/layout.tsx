import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { fraunces, inter, interTight, notoGujarati } from "./fonts";
import "./globals.css";

const TITLE = "Lumora — websites for invisible local businesses";
const DESCRIPTION =
  "Lumora finds local shops with no website, scores their digital presence, and generates an honest Gujarati-or-English demo site — ready before the first conversation.";

export const metadata: Metadata = {
  // RFC-2606 placeholder — swap for the real domain at deploy time. Without a
  // base, Next absolutizes og/twitter image URLs against localhost:3000, which
  // the verify harness rightly rejects as a baked foreign origin.
  metadataBase: new URL("https://lumora.invalid"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Lumora",
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      name: "Lumora",
      description: DESCRIPTION,
      inLanguage: ["en", "gu"],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#0E0D14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${fraunces.variable} ${notoGujarati.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <noscript>
          {/* Motion entrances SSR at opacity 0; without JS, force them visible. */}
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-inverse"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
