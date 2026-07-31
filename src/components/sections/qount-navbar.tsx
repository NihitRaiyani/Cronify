"use client";

import { useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Product", href: "#product" },
  { label: "Practice Intelligence", href: "#intelligence" },
  { label: "Pricing", href: "#pricing" },
  { label: "Qount", href: "#qount" },
  { label: "Resources", href: "#resources" },
];

export function QountNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 20);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-white/[0.08] bg-[#0b0b0c]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-4 px-6 md:px-10">
        {/* Logo */}
        <a href="#" className="flex items-center rounded-md outline-none">
          <span className="font-sans text-[20px] font-bold tracking-[0.1em] text-white">
            LOGO
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 font-sans text-[14px] font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#demo"
            className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 font-sans text-xs font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Get Demo
          </a>
          <a
            href="#contact"
            className="inline-flex h-9 items-center justify-center rounded-full bg-[#ccff00] px-5 font-sans text-xs font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          >
            Contact us
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            className="overflow-hidden border-t border-white/[0.08] bg-[#0b0b0c] lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-2 px-6 py-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg py-2.5 font-sans text-base font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="#demo"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white font-sans text-sm font-semibold text-black"
                >
                  Get Demo
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#ccff00] font-sans text-sm font-semibold text-black"
                >
                  Contact us
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
