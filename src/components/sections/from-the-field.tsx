import { User } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { FROM_THE_FIELD } from "@/content/from-the-field";

/**
 * Field-notes section — the measured testimonial slot (section_testimonial:
 * centered heading, three ~340px cards in hairline cells), reworked honestly:
 * lime "Layer 0X" tags instead of stars, illustrative scenes instead of
 * quotes, neutral avatar circles instead of portraits.
 */
export function FromTheField() {
  return (
    <section
      id="from-the-field"
      className="relative overflow-x-clip pt-[140px]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={FROM_THE_FIELD.eyebrow}
            eyebrowGujarati={FROM_THE_FIELD.eyebrowGujarati}
            title={FROM_THE_FIELD.title}
            lede={FROM_THE_FIELD.lede}
          />
        </Reveal>

        <Stagger className="mt-[60px] grid divide-y divide-edge border border-edge lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {FROM_THE_FIELD.notes.map((note) => (
            <StaggerItem
              key={note.layerTag}
              className="flex min-h-[340px] max-w-full flex-col p-8"
            >
              <span className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-lime">
                {note.layerTag}
              </span>
              <p className="mt-6 flex-1 font-sans text-base leading-[26px] text-ink">
                {note.body}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10"
                >
                  <User className="size-5 text-ink-muted" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-sans text-base leading-6 text-ink">
                    {note.scenario}
                  </span>
                  <span className="font-sans text-sm leading-5 text-ink-muted">
                    {note.area}
                  </span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
