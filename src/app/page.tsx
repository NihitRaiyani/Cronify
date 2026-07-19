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

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <BuiltFor />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <AiWorkflow />
        <Integrations />
        <Pricing />
        <FromTheField />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
