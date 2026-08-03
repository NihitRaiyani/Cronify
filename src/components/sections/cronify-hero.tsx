"use client";

import * as m from "motion/react-m";
import { CronifyDashboard } from "./cronify-dashboard";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AButton } from "@/components/primitives/a-button";

const HERO_EASE = [0.16, 1, 0.3, 1] as const;

export function CronifyHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#0b0b0c] pt-[120px] pb-[80px] lg:pt-[100px] lg:pb-[100px] overflow-hidden flex items-center"
    >
      {/* Subtle background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#ccff00]/[0.01] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#ccff00]/[0.01] rounded-full blur-[180px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Text Column (Span 5 on XL, otherwise full-width) */}
          <div className="xl:col-span-5 max-w-[620px] xl:max-w-none">
            <Stagger inView={false} step={0.08} className="flex flex-col gap-6">

              <StaggerItem duration={0.8} ease={HERO_EASE}>
                <h1 className="font-sans text-[36px] sm:text-[46px] md:text-[54px] xl:text-[42px] font-semibold leading-[1.1] tracking-tight text-white">
                  Accounting Practice Management That Turns Your Firm Data into Intelligence
                </h1>
              </StaggerItem>

              <StaggerItem duration={0.8} ease={HERO_EASE}>
                <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-white/60 font-normal">
                  Cronify unifies operational, performance, and client data across the
                  practice management platform and connected third-party systems, so
                  firms can predict risk earlier, optimize execution, improve margin,
                  and accelerate growth.
                </p>
              </StaggerItem>

              <StaggerItem duration={0.8} ease={HERO_EASE}>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <AButton href="#demo">
                    Demo
                  </AButton>
                  <AButton href="#features" variant="light" arrow={false}>
                    Explore Features
                  </AButton>
                </div>
              </StaggerItem>

            </Stagger>
          </div>

          {/* Right Visual Column (Span 7 on XL) */}
          <div className="xl:col-span-7 w-full flex justify-center xl:justify-end">
            <m.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full max-w-[680px] xl:max-w-none"
            >
              <CronifyDashboard />
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
