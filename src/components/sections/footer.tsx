import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { FOOTER } from "@/content/footer";
import { cn } from "@/lib/utils";

/**
 * Footer: measured Agentify section_footer — a giant centered wordmark over a
 * hairline rule, then a 4-column link grid (description + three nav groups)
 * and a hairline-topped bottom bar.
 */
export function Footer() {
  return (
    <footer id="footer" className="relative overflow-x-clip pb-10 pt-[100px]">
      <Container>
        <Reveal>
          <div className="border-b border-edge text-center">
            <p className="font-serif text-[64px] leading-none text-ink sm:text-[110px] lg:text-[180px]">
              {FOOTER.wordmark}
              <span className="text-lime">.</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="flex max-w-md flex-col gap-4">
              <p className="font-sans text-base leading-6 text-ink-muted">
                {FOOTER.description}
              </p>
              <p className="font-gujarati text-sm leading-relaxed text-lime/80">
                {FOOTER.gujarati}
              </p>
            </div>

            {FOOTER.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="mb-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-ink-muted">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "font-sans text-base transition-colors",
                          "accent" in link && link.accent
                            ? "text-lime hover:text-lime/80"
                            : "text-white/80 hover:text-white",
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-2 border-t border-edge pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
