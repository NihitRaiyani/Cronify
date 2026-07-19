import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/primitives/container";
import { SectionHeading, Serif } from "@/components/primitives/section-heading";
import { Wordmark } from "@/components/sections/navbar";
import { INTEGRATIONS } from "@/content/integrations";

/* Precomputed orbit positions (percent of the square), no runtime math. */
const OUTER_POS = [
  { left: "50%", top: "9%" },
  { left: "89%", top: "37.3%" },
  { left: "74.1%", top: "83.2%" },
  { left: "25.9%", top: "83.2%" },
  { left: "11%", top: "37.3%" },
];
const INNER_POS = [
  { left: "68.4%", top: "31.6%" },
  { left: "68.4%", top: "68.4%" },
  { left: "31.6%", top: "68.4%" },
  { left: "31.6%", top: "31.6%" },
];

export function Integrations() {
  return (
    <section className="bg-night-900 py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow={INTEGRATIONS.eyebrow}
              eyebrowGujarati={INTEGRATIONS.eyebrowGujarati}
              title={
                <>
                  {INTEGRATIONS.titleStart}{" "}
                  <Serif>{INTEGRATIONS.titleAccent}</Serif>
                </>
              }
              lede={INTEGRATIONS.lede}
            />
            <Stagger className="mt-10 space-y-5">
              {INTEGRATIONS.roles.map((role) => (
                <StaggerItem key={role.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-2 h-px w-6 shrink-0 bg-gradient-to-r from-brand-400 to-aqua-400"
                  />
                  <p className="text-sm leading-relaxed text-ink-dim">
                    <span className="font-display font-semibold text-ink">
                      {role.title}
                    </span>{" "}
                    — {role.body}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="relative mx-auto aspect-square w-full max-w-[500px]">
            {/* rings */}
            <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
              <circle
                cx="50"
                cy="50"
                r="41"
                fill="none"
                stroke="rgba(232,237,248,0.07)"
                strokeWidth="0.25"
              />
              <circle
                cx="50"
                cy="50"
                r="26"
                fill="none"
                stroke="rgba(232,237,248,0.07)"
                strokeWidth="0.25"
              />
            </svg>
            <div
              aria-hidden
              className="absolute inset-0 animate-[spin_70s_linear_infinite]"
            >
              <svg viewBox="0 0 100 100" className="size-full">
                <circle
                  cx="50"
                  cy="50"
                  r="33.5"
                  fill="none"
                  stroke="rgba(103,232,249,0.16)"
                  strokeWidth="0.25"
                  strokeDasharray="0.8 5"
                />
              </svg>
            </div>
            {/* center medallion */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="glass grid place-items-center rounded-full px-7 py-6 shadow-[0_0_80px_-16px_rgba(79,70,229,0.55)]">
                <Wordmark />
              </div>
            </div>
            {INTEGRATIONS.orbit.outer.map((label, i) => (
              <span
                key={label}
                style={OUTER_POS[i]}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/[0.09] bg-night-800/85 px-3.5 py-1.5 text-xs text-ink-dim backdrop-blur-md"
              >
                {label}
              </span>
            ))}
            {INTEGRATIONS.orbit.inner.map((label, i) => (
              <span
                key={label}
                style={INNER_POS[i]}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-aqua-400/20 bg-aqua-500/[0.08] px-3 py-1.5 text-xs text-aqua-300/90 backdrop-blur-md"
              >
                {label}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
