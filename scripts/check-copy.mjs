#!/usr/bin/env node
/**
 * check-copy.mjs — static copy-firewall scan over the content modules.
 *
 * All visible copy lives in src/content/*.ts, so scanning those files catches
 * firewall violations before the runtime scan (scripts/verify-landing.mjs,
 * which checks the rendered page and is authoritative).
 *
 * Fails on: banned claim terms (word-boundaried, case-insensitive), fake-brand
 * strings, and any literal "$" (₹ is the only currency allowed).
 */
import fs from "node:fs";
import path from "node:path";

const BANNED_CLAIMS = [
  "premier", "best", "leading", "top", "#1", "finest", "award-winning",
  "award winning", "trusted", "premium", "exclusive", "renowned", "authentic",
  "luxury", "expert", "specialist", "certified", "official", "authorized",
  "established", "quality", "superior", "unmatched", "world-class", "world class",
];
const FAKE_BRANDS = [
  "AuraPrecision", "CyberPulse", "VÉLOURS PARIS", "VELOURS PARIS", "L'Étoile",
  "L'Etoile", "AURA SILK PARISIENNE", "AURA SILK", "concierge@auraprecision.med",
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const contentDir = path.join(process.cwd(), "src", "content");

if (!fs.existsSync(contentDir)) {
  console.log("check-copy: src/content does not exist yet — nothing to scan.");
  process.exit(0);
}

const files = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
  .map((f) => path.join(contentDir, f));

const violations = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const term of BANNED_CLAIMS) {
      const rx = new RegExp(`(?<!\\w)${esc(term)}(?!\\w)`, "i");
      if (rx.test(line)) {
        violations.push({ file: path.basename(file), line: i + 1, kind: "claim", term, text: line.trim().slice(0, 90) });
      }
    }
    for (const brand of FAKE_BRANDS) {
      if (line.toLowerCase().includes(brand.toLowerCase())) {
        violations.push({ file: path.basename(file), line: i + 1, kind: "fake-brand", term: brand, text: line.trim().slice(0, 90) });
      }
    }
    if (line.includes("$") && !line.includes("${")) {
      violations.push({ file: path.basename(file), line: i + 1, kind: "dollar", term: "$", text: line.trim().slice(0, 90) });
    }
  });
}

if (violations.length) {
  console.error(`check-copy: ${violations.length} violation(s):`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line} [${v.kind}] "${v.term}" → ${v.text}`);
  }
  process.exit(1);
}
console.log(`check-copy: clean (${files.length} content file(s) scanned).`);
