/**
 * Decorative step vignettes for How It Works — pure inline SVG/CSS, aria-hidden
 * (each step's meaning is carried by its visible heading + body text).
 */

const PIN_POSITIONS = [
  { x: 74, y: 96, hot: true },
  { x: 178, y: 62, hot: false },
  { x: 236, y: 138, hot: true },
  { x: 320, y: 84, hot: false },
  { x: 138, y: 196, hot: true },
  { x: 296, y: 210, hot: false },
];

export function DiscoverVisual() {
  return (
    <svg aria-hidden viewBox="0 0 400 280" className="h-auto w-full">
      {/* street grid */}
      <g stroke="rgba(232,237,248,0.07)" strokeWidth="1.5" fill="none">
        <path d="M0 70 H400 M0 160 H400 M0 236 H400" />
        <path d="M96 0 V280 M208 0 V280 M312 0 V280" />
        <path d="M0 20 C120 44 280 10 400 40" strokeDasharray="3 6" />
      </g>
      {PIN_POSITIONS.map((p, i) => (
        <g key={i}>
          {p.hot ? (
            <>
              <circle cx={p.x} cy={p.y} r="16" fill="rgba(245,158,11,0.12)" />
              <circle cx={p.x} cy={p.y} r="9" fill="rgba(245,158,11,0.25)" />
              <circle cx={p.x} cy={p.y} r="4" fill="#FBBF24" />
            </>
          ) : (
            <>
              <circle cx={p.x} cy={p.y} r="4" fill="rgba(232,237,248,0.25)" />
              <path
                d={`M${p.x + 8} ${p.y - 10} l6 6 M${p.x + 14} ${p.y - 10} l-6 6`}
                stroke="rgba(232,237,248,0.28)"
                strokeWidth="1.5"
              />
            </>
          )}
        </g>
      ))}
      {/* legend chips */}
      <g fontFamily="var(--font-sans)" fontSize="11">
        <rect x="16" y="244" rx="10" width="132" height="24" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.35)" />
        <circle cx="30" cy="256" r="3" fill="#FBBF24" />
        <text x="40" y="260" fill="#FCD34D">no website found</text>
        <rect x="158" y="244" rx="10" width="104" height="24" fill="rgba(232,237,248,0.04)" stroke="rgba(232,237,248,0.12)" />
        <text x="172" y="260" fill="rgba(151,163,188,0.9)">has a site — skip</text>
      </g>
    </svg>
  );
}

const SCORE_SIGNALS = [
  { label: "website", max: 40, fill: 0 },
  { label: "reviews", max: 25, fill: 9 },
  { label: "photos", max: 10, fill: 4 },
  { label: "social", max: 10, fill: 0 },
  { label: "rating", max: 5, fill: 4 },
  { label: "description", max: 5, fill: 5 },
  { label: "hours", max: 5, fill: 5 },
];

export function ScoreVisual() {
  const score = SCORE_SIGNALS.reduce((s, x) => s + x.fill, 0); // 27
  const r = 74;
  const circumference = Math.PI * r; // semicircle
  return (
    <div aria-hidden className="flex items-center gap-7">
      <svg viewBox="0 0 200 130" className="w-[44%] shrink-0">
        <defs>
          <linearGradient id="score-arc" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path
          d={`M ${100 - r} 112 A ${r} ${r} 0 0 1 ${100 + r} 112`}
          fill="none"
          stroke="rgba(232,237,248,0.08)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={`M ${100 - r} 112 A ${r} ${r} 0 0 1 ${100 + r} 112`}
          fill="none"
          stroke="url(#score-arc)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
        />
        <text
          x="100"
          y="98"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="40"
          fontWeight="600"
          fill="#E8EDF8"
        >
          {score}
        </text>
        <text
          x="100"
          y="120"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="10"
          letterSpacing="2"
          fill="rgba(91,104,128,1)"
        >
          PRESENCE / 100
        </text>
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {SCORE_SIGNALS.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 text-right text-[10px] uppercase tracking-wider text-ink-faint">
              {s.label}
            </span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 to-aqua-400"
                style={{ width: `${(s.fill / s.max) * 100}%` }}
              />
            </span>
            <span className="w-10 shrink-0 text-[10px] tabular-nums text-ink-faint">
              {s.fill}/{s.max}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SLICE_ROWS = [
  { k: "name", v: "{shop name}", state: "fact" },
  { k: "name_local", v: "{ગુજરાતી લિપિ}", state: "fact", gujarati: true },
  { k: "about", v: "from the listing", state: "fact" },
  { k: "tagline", v: "empty — no fact", state: "empty" },
  { k: "reviews", v: "empty — none scraped", state: "empty" },
];

export function GenerateVisual() {
  return (
    <div aria-hidden className="grid items-center gap-4 sm:grid-cols-[1.05fr_auto_0.95fr]">
      {/* validated content slice */}
      <div className="rounded-xl border border-white/[0.07] bg-night-900/70 p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          content slice · validated
        </p>
        <ul className="space-y-2 text-[12px]">
          {SLICE_ROWS.map((row) => (
            <li key={row.k} className="flex items-center gap-2">
              <span className="text-brand-300">{row.k}</span>
              <span className="text-ink-faint">:</span>
              <span
                className={
                  row.state === "empty"
                    ? "italic text-ink-faint"
                    : row.gujarati
                      ? "font-gujarati text-aqua-300"
                      : "text-ink-dim"
                }
              >
                {row.v}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <svg viewBox="0 0 40 24" className="mx-auto w-9 rotate-90 text-ink-faint sm:rotate-0">
        <path
          d="M2 12 H30 M24 5 l8 7 -8 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animate-dash"
        />
      </svg>
      {/* rendered template */}
      <div className="rounded-xl border border-white/[0.07] bg-night-900/70 p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          frozen template · render
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-md bg-white/[0.05] px-2.5 py-1.5">
            <span className="size-2 rounded-full bg-aqua-400/70" />
            <span className="h-1.5 w-14 rounded-full bg-white/[0.14]" />
            <span className="ml-auto h-1.5 w-8 rounded-full bg-white/[0.09]" />
          </div>
          <div className="rounded-md bg-gradient-to-br from-brand-500/[0.18] to-aqua-500/[0.1] px-2.5 py-3">
            <span className="font-gujarati text-[13px] text-ink">
              {"{દુકાનનું નામ}"}
            </span>
            <div className="mt-1.5 h-1.5 w-24 rounded-full bg-white/[0.14]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 rounded-md bg-white/[0.05]" />
            <div className="h-9 rounded-md bg-white/[0.05]" />
          </div>
          <div className="rounded-md border border-dashed border-white/[0.12] px-2.5 py-2 text-center text-[10px] italic text-ink-faint">
            section hidden — no grounded facts
          </div>
        </div>
      </div>
    </div>
  );
}

const QR_GRID = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 1, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 1,
  0, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 1, 1,
  1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 0, 1, 0, 1,
];

export function ShareVisual() {
  const statuses = ["draft", "reviewed", "approved"];
  return (
    <div aria-hidden className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        {statuses.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span
              className={
                i === 2
                  ? "rounded-full border border-aqua-400/40 bg-aqua-500/[0.12] px-3.5 py-1.5 text-xs font-medium text-aqua-300"
                  : "rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-faint"
              }
            >
              {s}
            </span>
            {i < 2 ? (
              <svg viewBox="0 0 24 8" className="w-6 text-ink-faint">
                <path
                  d="M0 4 H18 M14 1 l5 3 -5 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-night-900/70 px-4 py-3.5">
          <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-aqua-300">
            <path
              d="M6.5 9.5 L9.5 6.5 M5 11 a2.5 2.5 0 0 1 0-3.5 l2-2 M11 5 a2.5 2.5 0 0 1 0 3.5 l-2 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="truncate text-sm text-ink-dim">
            one link — shared by the operator, never auto-sent
          </span>
        </div>
        <div className="grid shrink-0 grid-cols-7 gap-[3px] rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
          {QR_GRID.map((bit, i) => (
            <span
              key={i}
              className={bit ? "size-[5px] rounded-[1px] bg-ink/80" : "size-[5px]"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
