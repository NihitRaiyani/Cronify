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
        {/* measured: the footer has no scroll entrance animations */}
        <div className="border-b border-edge text-center">
          {/* ref treatment: giant wordmark with a gradient background-clip fade */}
          <p className="bg-gradient-to-b from-white via-white/70 to-white/25 bg-clip-text font-serif text-[64px] leading-none text-transparent sm:text-[110px] lg:text-[180px]">
            {FOOTER.wordmark}
            <span className="text-lime">.</span>
          </p>
        </div>

        {/* ref: link area is an enclosed bordered panel with internal column
            hairlines — the borders, not gaps, do the separation */}
        <div className="mt-12 grid border border-edge max-lg:divide-y max-lg:divide-edge lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:divide-x lg:divide-edge">
            <div className="flex max-w-md flex-col gap-4 p-8">
              <p className="font-sans text-base leading-6 text-ink-muted">
                {FOOTER.description}
              </p>
              <p className="font-gujarati text-sm leading-relaxed text-lime/80">
                {FOOTER.gujarati}
              </p>
            </div>

            {FOOTER.columns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="p-8">
                <h3 className="mb-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-ink-muted">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "font-sans text-sm transition-colors duration-[350ms]",
                          "accent" in link && link.accent
                            ? "text-lime hover:text-lime/80"
                            : "text-ink-muted hover:text-white",
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

        <div className="mt-14 flex flex-col gap-2 border-t border-edge pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
