"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { FROM_THE_FIELD } from "@/content/from-the-field";

/**
 * Field-notes section — the measured testimonial slot rebuilt to the ref's
 * featured composition: hairline-celled 2-col with a collage cell (our own
 * dusk photography, grayscale, re-cropped per note) beside one dominant
 * ~26px pull-quote with author row and prev/next arrows (500ms slide, no
 * autoplay — measured). Honesty rules kept: lime layer tags instead of
 * stars, every scene labelled illustrative.
 */
export function FromTheField() {
  const [index, setIndex] = useState(0);
  const count = FROM_THE_FIELD.notes.length;
  const note = FROM_THE_FIELD.notes[index];
  // three different crops of our own panorama — one scene per note
  const crop = ["25% 60%", "55% 45%", "80% 65%"][index % 3];

  return (
    <section id="from-the-field" className="relative overflow-x-clip pt-[140px]">
      <Container>
        <SectionHeading
          eyebrow={FROM_THE_FIELD.eyebrow}
          eyebrowGujarati={FROM_THE_FIELD.eyebrowGujarati}
          title={FROM_THE_FIELD.title}
          lede={FROM_THE_FIELD.lede}
        />

        {/* measured: the slider itself is static on scroll — interaction only */}
        <div className="mt-[60px] grid border border-edge divide-edge max-lg:divide-y lg:grid-cols-[0.45fr_1.05fr] lg:divide-x">
          {/* collage cell — two stacked crops of our own photography,
              color over B&W (ref signature) */}
          <div className="relative min-h-[320px] overflow-hidden p-6 lg:min-h-[480px]">
            <AnimatePresence initial={false} mode="popLayout">
              <m.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex h-full flex-col gap-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-dusk-panorama-1920.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-1/2 min-h-0 w-full flex-1 border border-black/40 object-cover"
                  style={{ objectPosition: crop }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-dusk-panorama-1920.webp"
                  alt=""
                  width={1920}
                  height={1080}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-1/2 min-h-0 w-full flex-1 border border-black/40 object-cover grayscale"
                  style={{ objectPosition: `${(75 - index * 25) % 100}% 40%` }}
                />
              </m.div>
            </AnimatePresence>
          </div>

          {/* featured note cell */}
          <div className="flex flex-col p-8 lg:p-12" aria-live="polite">
            <span
              aria-hidden
              className="font-display text-[64px] font-bold leading-[0.8] text-check"
            >
              &ldquo;
            </span>
            <span className="mt-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-lime">
              {note.layerTag}
            </span>
            <AnimatePresence initial={false} mode="wait">
              <m.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-1 flex-col"
              >
                <p className="mt-6 flex-1 font-display text-xl font-semibold leading-[1.4] text-ink lg:text-[26px]">
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
                  {/* prev/next — measured hover: bg→lime, text→dark,
                      border→#44ce93, 350ms */}
                  <span className="ml-auto flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Previous field note"
                      onClick={() => setIndex((i) => (i - 1 + count) % count)}
                      className="flex size-11 items-center justify-center border border-edge text-ink transition-[background-color,color,border-color] duration-[350ms] hover:border-[#44ce93] hover:bg-lime hover:text-ink-inverse"
                    >
                      <ArrowLeft className="size-4" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next field note"
                      onClick={() => setIndex((i) => (i + 1) % count)}
                      className="flex size-11 items-center justify-center border border-edge text-ink transition-[background-color,color,border-color] duration-[350ms] hover:border-[#44ce93] hover:bg-lime hover:text-ink-inverse"
                    >
                      <ArrowRight className="size-4" strokeWidth={2} />
                    </button>
                  </span>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
