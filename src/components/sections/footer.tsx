import { AtSign, Camera, Globe, type LucideIcon } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { FOOTER } from "@/content/footer";
import { cn } from "@/lib/utils";

/** Neutral glyphs — same no-real-logos rule as the integrations web. */
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Facebook: Globe,
  Instagram: Camera,
  X: AtSign,
};

/**
 * Footer: measured Agentify section_footer — one continuous dark green-black
 * band (#081b0c) that starts flush against the CTA section (no divider,
 * measured seam), pad-top 100 to a giant centered ghost wordmark (180px,
 * background-clip:text gradient #445043 34% → #1d3521 80% so the glyph
 * bottoms melt into the band), then ~56px to the enclosed 4-column panel and
 * a hairline-topped bottom bar. No scroll entrance animations (measured).
 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-x-clip bg-[#081b0c] pt-[100px]"
    >
      <Container>
        <div className="text-center">
          {/* ref treatment: ghost wordmark — gradient falls to near-band color */}
          <p
            className="bg-clip-text font-serif text-[64px] leading-[1.25] text-transparent sm:text-[110px] lg:text-[180px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #445043 34%, #1d3521 80%)",
            }}
          >
            {FOOTER.wordmark}.
          </p>
        </div>

        {/* ref: measured footer-middle_element — a 1160px bordered panel inset
            60px in the container; brand cell 2fr + three 1fr link columns,
            hairlines (not gaps) doing all separation, link-column headers in
            their own hairline-bottomed row */}
        <div className="mx-auto mt-14 w-full max-w-[1160px] border border-edge">
          <div className="grid max-lg:divide-y max-lg:divide-edge lg:grid-cols-[2fr_1fr_1fr_1fr] lg:divide-x lg:divide-edge">
            {/* brand cell: wordmark, one-line blurb, Contact + social chips */}
            <div className="p-6">
              <p className="font-serif text-[28px] leading-none text-ink">
                {FOOTER.wordmark}
                <span className="text-lime">.</span>
              </p>
              <p className="mt-6 max-w-[394px] font-sans text-base leading-6 text-ink-muted">
                {FOOTER.blurb}
              </p>
              <p className="mt-2 font-gujarati text-sm leading-relaxed text-lime/80">
                {FOOTER.gujarati}
              </p>
              <h3 className="mt-8 font-sans text-2xl font-medium text-ink">
                {FOOTER.contactTitle}
              </h3>
              <div className="mt-4 flex gap-3">
                {FOOTER.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-11 place-items-center rounded-full border border-[#2b2a30] bg-[#08111b] text-lime transition-colors duration-[350ms] hover:border-lime"
                    >
                      <Icon className="size-5" strokeWidth={1.6} />
                    </a>
                  );
                })}
              </div>
            </div>

            {FOOTER.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="border-b border-edge px-6 pb-4 pt-7 font-sans text-[22px] font-medium leading-none text-ink">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-6 p-6">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "font-sans text-lg leading-[1.4] transition-colors duration-[350ms]",
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
        </div>

        {/* ref: 88px bottom bar, pad 32/0, 16px text */}
        <div className="mt-14 flex min-h-[88px] flex-col gap-2 border-t border-edge py-8 font-sans text-base text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
