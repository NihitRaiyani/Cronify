import { BuiltFor } from "@/components/sections/built-for";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Navbar } from "@/components/sections/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <BuiltFor />
        <Features />
        <HowItWorks />
      </main>
    </>
  );
}
