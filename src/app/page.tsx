import { AiWorkflow } from "@/components/sections/ai-workflow";
import { BuiltFor } from "@/components/sections/built-for";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FromTheField } from "@/components/sections/from-the-field";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Integrations } from "@/components/sections/integrations";
import { Navbar } from "@/components/sections/navbar";
import { Pricing } from "@/components/sections/pricing";
import { ProductShowcase } from "@/components/sections/product-showcase";

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
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {/* body order mirrors the measured reference */}
        <div className="relative">
          <PageLines />
          <BuiltFor />
          <Features />
          <HowItWorks />
          <AiWorkflow />
          <ProductShowcase />
          <Pricing />
          <Integrations />
          <FromTheField />
          <Faq />
          <FinalCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
