import { AiWorkflow } from "@/components/sections/ai-workflow";
import { BuiltFor } from "@/components/sections/built-for";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Integrations } from "@/components/sections/integrations";
import { Navbar } from "@/components/sections/navbar";
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
      </main>
    </>
  );
}
