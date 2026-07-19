import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/primitives/browser-frame";
import { Container } from "@/components/primitives/container";
import { DemoSiteMockup } from "@/components/primitives/demo-site-mockup";
import { PhoneFrame } from "@/components/primitives/phone-frame";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { SHOWCASE } from "@/content/showcase";

export function ProductShowcase() {
  return (
    <section
      id="showcase"
      className="scroll-mt-24 overflow-x-clip bg-night-900 py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow={SHOWCASE.eyebrow}
          eyebrowGujarati={SHOWCASE.eyebrowGujarati}
          title={
            <>
              {SHOWCASE.titleStart} <Serif>{SHOWCASE.titleAccent}</Serif>
            </>
          }
          lede={SHOWCASE.lede}
        />
        <Reveal className="relative mx-auto mt-16 max-w-4xl">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-brand-500/[0.22] via-transparent to-aqua-500/[0.18] blur-3xl"
          />
          <div role="img" aria-label={SHOWCASE.ariaDesktop}>
            <div aria-hidden>
              <BrowserFrame address={SHOWCASE.address} className="lg:mr-44">
                <DemoSiteMockup variant="desktop" />
              </BrowserFrame>
            </div>
          </div>
          <div
            role="img"
            aria-label={SHOWCASE.ariaMobile}
            className="absolute -bottom-12 -right-2 hidden lg:block"
          >
            <div aria-hidden>
              <PhoneFrame className="w-56 rotate-2">
                <DemoSiteMockup variant="mobile" />
              </PhoneFrame>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-16 max-w-xl text-center text-sm leading-relaxed text-ink-faint lg:mt-20">
            {SHOWCASE.caption}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
