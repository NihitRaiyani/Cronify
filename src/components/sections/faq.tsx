import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-night-950 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={FAQ.eyebrow}
            eyebrowGujarati={FAQ.eyebrowGujarati}
            title={
              <>
                {FAQ.titleStart} <Serif>{FAQ.titleAccent}</Serif>
              </>
            }
            lede={FAQ.lede}
          />
          <Reveal className="mt-12">
            <Accordion type="single" collapsible className="gap-3">
              {FAQ.items.map((item) => (
                <AccordionItem
                  key={item.key}
                  value={item.key}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6"
                >
                  <AccordionTrigger className="gap-4 py-5 font-display text-base font-semibold tracking-tight text-ink hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-ink-dim">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
