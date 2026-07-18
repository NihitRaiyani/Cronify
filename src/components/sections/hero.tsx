"use client";

import { ArrowDown } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Aurora } from "@/components/primitives/aurora";
import { Container } from "@/components/primitives/container";
import { Eyebrow, Serif } from "@/components/primitives/section-heading";
import { Button } from "@/components/ui/button";
import { HERO } from "@/content/hero";
import { SITE } from "@/content/site";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section className="relative overflow-x-clip bg-night-950">
      <Aurora />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night-900"
      />
      <Container className="relative grid items-center gap-16 pb-24 pt-32 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:gap-10 lg:pb-32 lg:pt-44">
        <Stagger inView={false} className="flex max-w-xl flex-col items-start gap-6">
          <StaggerItem>
            <Eyebrow gujarati={HERO.eyebrowGujarati}>{HERO.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.025em] text-ink sm:text-6xl xl:text-[3.9rem]">
              {HERO.titleLine1}
              <br />
              {HERO.titleLine2}{" "}
              <Serif className="pr-1 text-[1.08em]">{HERO.titleAccent}</Serif>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-lg text-base leading-relaxed text-ink-dim sm:text-lg">
              {HERO.sub}
            </p>
          </StaggerItem>
          <StaggerItem className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-ink px-7 text-[15px] font-semibold text-night-900 shadow-[0_12px_40px_-12px_rgba(232,237,248,0.5)] hover:bg-white"
            >
              <a href={SITE.cta.href}>{SITE.cta.label}</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-12 rounded-full border border-white/[0.1] px-6 text-[15px] text-ink hover:border-white/[0.2] hover:bg-white/[0.04]"
            >
              <a href={SITE.secondaryCta.href}>
                {SITE.secondaryCta.label}
                <ArrowDown className="size-4" />
              </a>
            </Button>
          </StaggerItem>
          <StaggerItem>
            <dl className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
              {HERO.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline gap-1.5">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="flex items-baseline gap-1.5">
                    <span className="font-display text-lg font-semibold text-ink">
                      {fact.value}
                    </span>
                    <span className="text-sm text-ink-faint">{fact.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </Stagger>

        <Stagger inView={false} delay={0.25} className="relative">
          <StaggerItem y={36} className="lg:pl-4">
            <HeroVisual />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
