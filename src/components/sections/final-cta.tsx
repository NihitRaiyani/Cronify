import { Reveal } from "@/components/motion/reveal";
import { WordReveal } from "@/components/motion/word-reveal";
import { AButton } from "@/components/primitives/a-button";
import { Container } from "@/components/primitives/container";
import { FINAL_CTA } from "@/content/final-cta";

/**
 * Closing CTA: measured Agentify section_cta — a light panel (593px tall,
 * pad 140/24) inside the container: white center glow with horizontal striped
 * bands at the edges, lime toward the top corners falling to teal at the
 * bottom, sharp corners; dark 44/64px display heading, muted dark sub, then
 * lime + white offset-frame buttons centered beneath. All art is our own CSS
 * gradient rebuild of the measured panel. Motion per animations.md: h2
 * scrubbed word-reveal, para + buttons blur-rise. No bottom padding — the
 * footer band follows immediately (measured seam).
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative scroll-mt-24 overflow-x-clip pt-[140px]"
    >
      <Container>
        <div className="relative bg-[#eef5f1] p-12 text-center lg:px-20 lg:py-[140px]">
          {/* lime→teal wash, visible only near the panel edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #d9f56d 0%, #a9ec85 45%, #3fd899 100%)",
              maskImage:
                "linear-gradient(90deg, black 0%, transparent 28%, transparent 72%, black 100%)",
            }}
          />
          {/* horizontal band structure over the wash, fading to the center */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.5) 0 2px, transparent 2px 26px)",
              maskImage:
                "linear-gradient(90deg, black 0%, transparent 30%, transparent 70%, black 100%)",
            }}
          />
          {/* white center glow the heading sits on */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 62% 135% at 50% 48%, #f7fbf9 55%, rgba(247,251,249,0) 100%)",
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
                <AButton href={FINAL_CTA.primary.href} variant="lime">
                  {FINAL_CTA.primary.label}
                </AButton>
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
