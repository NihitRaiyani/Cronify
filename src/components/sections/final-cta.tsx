import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { FINAL_CTA } from "@/content/final-cta";

/**
 * Closing CTA: measured Agentify section_cta — a full-width lime panel with
 * sharp corners, dark 44/64px display heading, muted dark sub, and two
 * offset-frame buttons (dark fill + white fill) centered beneath.
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative scroll-mt-24 overflow-x-clip pt-[140px]"
    >
      <Container>
        <Reveal>
          <div className="bg-lime p-12 text-center lg:p-20">
            <h2 className="mx-auto max-w-[20ch] font-display text-[44px] font-semibold leading-[1.2] text-ink-inverse lg:text-[64px]">
              {FINAL_CTA.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-6 text-ink-inverse/80">
              {FINAL_CTA.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <a
                href={FINAL_CTA.primary.href}
                className="relative inline-flex h-12 items-center justify-center gap-2 bg-[#0C0C0C] px-6 font-sans text-base font-medium text-lime transition-transform duration-200 after:pointer-events-none after:absolute after:-inset-1 after:border after:border-[#0C0C0C] after:content-[''] hover:-translate-y-0.5"
              >
                {FINAL_CTA.primary.label}
                <ArrowUpRight className="size-4" strokeWidth={2.4} />
              </a>
              <AButton href={FINAL_CTA.secondary.href} variant="light">
                {FINAL_CTA.secondary.label}
              </AButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
