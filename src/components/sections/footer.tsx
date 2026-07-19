import { Container } from "@/components/primitives/container";
import { Wordmark } from "@/components/sections/navbar";
import { FOOTER } from "@/content/footer";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-night-950 py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10">
          <div className="flex max-w-sm flex-col items-start gap-5">
            <a
              href="#main"
              aria-label="Lumora — back to start"
              className="rounded-md"
            >
              <Wordmark />
            </a>
            <p className="text-sm leading-relaxed text-ink-dim">
              {FOOTER.oneLiner}
            </p>
            <p className="text-sm leading-relaxed text-ink-faint">
              {FOOTER.rulePlain}{" "}
              <span className="font-serif italic text-ink-dim">
                {FOOTER.ruleSerif}
              </span>
            </p>
          </div>

          {FOOTER.columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-4 lg:pt-1.5"
            >
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-dim transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-[13px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            {FOOTER.copyright}
            <span className="font-gujarati text-sm leading-none text-aqua-300/80">
              {FOOTER.copyrightGujarati}
            </span>
          </p>
          <p>{FOOTER.honesty}</p>
        </div>
      </Container>
    </footer>
  );
}
