"use client";

import { useState } from "react";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-serif text-[22px] font-normal lowercase tracking-tight text-ink",
        className,
      )}
    >
      cronify
      <span className="text-lime">.</span>
    </span>
  );
}

/**
 * Measured Solidroad navbar: transparent strip over the hero photo, cream
 * 14px links, ghost pill + solid cream pill on the right, 66px tall.
 * Scrolled state gains the dark blurred backdrop (body surface #0E0D14).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 75));

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "theme-hero fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        solid
          ? "border-b border-white/[0.08] bg-[#0E0D14]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-black/[0.02] backdrop-blur-[8px]",
      )}
    >
      <div className="mx-auto flex h-[66px] w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-10 lg:px-14">
        <a
          href="#main"
          aria-label="Cronify — back to start"
          className="rounded-md"
        >
          <Wordmark />
        </a>

        <div className="hidden items-center gap-16 lg:flex">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {SITE.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 font-serif text-sm text-ink/90 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={SITE.secondaryCta.href}
              className="inline-flex h-[34px] items-center rounded-full border border-ink/40 px-3.5 font-sans text-xs text-ink transition-colors hover:border-ink/70"
            >
              {SITE.secondaryCta.label}
            </a>
            <a
              href={SITE.cta.href}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-full bg-[#FBF7EB] px-3.5 font-sans text-xs text-[#2D2C29] transition-colors hover:bg-white"
            >
              {SITE.cta.label}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-nav"
            className="overflow-hidden border-t border-white/[0.08] lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-1 px-5 py-4 sm:px-10">
              {SITE.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 font-sans text-base text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={SITE.cta.href}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#FBF7EB] font-sans text-sm font-medium text-[#2D2C29]"
              >
                {SITE.cta.label} <span aria-hidden>&nbsp;→</span>
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
