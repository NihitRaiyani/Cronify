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
import { Container } from "@/components/primitives/container";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-xl font-bold lowercase tracking-tight text-ink",
        className,
      )}
    >
      lumora
      <span className="text-gradient-brand">.</span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        solid
          ? "border-b border-white/[0.06] bg-night-900/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <a
          href="#main"
          aria-label="Lumora — back to start"
          className="rounded-md"
        >
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {SITE.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            className="h-10 rounded-full bg-ink px-5 text-sm font-semibold text-night-900 hover:bg-white"
          >
            <a href={SITE.cta.href}>{SITE.cta.label}</a>
          </Button>
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
      </Container>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-nav"
            className="overflow-hidden border-t border-white/[0.06] lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-col gap-1 py-4">
              {SITE.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-base text-ink-dim transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <Button
                asChild
                className="mt-2 h-11 rounded-full bg-ink text-sm font-semibold text-night-900 hover:bg-white"
              >
                <a href={SITE.cta.href} onClick={() => setOpen(false)}>
                  {SITE.cta.label}
                </a>
              </Button>
            </Container>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
