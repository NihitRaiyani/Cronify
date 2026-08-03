"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

import { AiWorkflow } from "@/components/sections/ai-workflow";
import { BuiltFor } from "@/components/sections/built-for";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FromTheField } from "@/components/sections/from-the-field";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Integrations } from "@/components/sections/integrations";
import { Pricing } from "@/components/sections/pricing";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { SectionDivider } from "@/components/primitives/section-divider";
import { CronifyNavbar } from "@/components/sections/cronify-navbar";
import { CronifyHero } from "@/components/sections/cronify-hero";

/** Measured Agentify detail: two vertical hairlines running the body at the
 *  1280 container edges. Decorative only; sections render above them. */
function PageLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[1280px] -translate-x-1/2 border-x border-edge min-[1360px]:block"
    />
  );
}

export default function Home() {
  return (
    // The 'root' prop tells Lenis to take over the document's main scrollbar
    <ReactLenis root options={{ lerp: 1.0, duration: 1.5, smoothWheel: true }}>
      <CronifyNavbar />
      <main id="main">
        <CronifyHero />
        {/* body order mirrors the measured reference */}
        <div className="relative overflow-hidden">
          <PageLines />
          <SectionDivider />
          <BuiltFor />
          <SectionDivider />
          <Features />
          <SectionDivider />
          <HowItWorks />
          <SectionDivider />
          <AiWorkflow />
          <SectionDivider />
          <ProductShowcase />
          <SectionDivider />
          <Pricing />
          <SectionDivider />
          <Integrations />
          <SectionDivider />
          <FromTheField />
          <SectionDivider />
          <Faq />
          <SectionDivider />
          <FinalCta />
        </div>
      </main>
      <Footer />
    </ReactLenis>
  );
}