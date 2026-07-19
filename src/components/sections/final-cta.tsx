import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { FINAL_CTA } from "@/content/final-cta";

/**
 * Closing CTA: measured Agentify section_cta — a full-width lime panel with
 * sharp corners, dark 44/64px display heading, muted dark sub, and two
 * offset-frame buttons centered beneath. Solid lime is our accepted
 * deviation from the ref's light panel; the edge stripe texture and the
 * ~590px vertical air follow the ref. Motion per animations.md: h2 scrubbed
 * word-reveal, para + buttons blur-rise.
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative scroll-mt-24 overflow-x-clip pt-[140px]"
    >
      <Container>
        <div className="relative bg-lime p-12 text-center lg:px-20 lg:py-32">
          {/* ref signature: stripe texture at the panel edges fading to center */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 40px)",
              maskImage:
                "linear-gradient(90deg, black 0%, transparent 24%, transparent 76%, black 100%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-[20ch] font-display text-[44px] font-semibold leading-[1.2] text-ink-inverse lg:text-[64px]">
              <WordReveal text={FINAL_CTA.title} />
            </h2>
            <Reveal>
              <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-6 text-ink-inverse/80">
                {FINAL_CTA.sub}
              </p>
            </Reveal>
            <Reveal margin="0px 0px -15% 0px">
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
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
