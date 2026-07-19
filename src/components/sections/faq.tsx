import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/content/faq";

/** Measured Agentify FAQ: centered heading block, then a narrow ~768px
 *  accordion — sharp corners, items split by border-edge hairlines,
 *  18px w500 white triggers, 16/26 white/75 answers. */
export function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-x-clip pt-[140px]"
    >
      <Container>
        <SectionHeading
          eyebrow={FAQ.eyebrow}
          eyebrowGujarati={FAQ.eyebrowGujarati}
          title={FAQ.title}
          lede={FAQ.lede}
        />
        <Reveal className="mx-auto mt-[60px] max-w-[768px]">
          <Accordion
            type="single"
            collapsible
            className="border-y border-edge"
          >
            {FAQ.items.map((item) => (
              <AccordionItem
                key={item.key}
                value={item.key}
                className="rounded-none border-b border-edge last:border-b-0"
              >
                <AccordionTrigger className="gap-6 rounded-none border-0 py-6 font-display text-lg font-medium leading-snug tracking-tight text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-ink">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[42rem] pb-6 font-sans text-base leading-[26px] text-white/75">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
