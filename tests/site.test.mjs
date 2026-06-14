import { existsSync, readFileSync } from "node:fs";
import assert from "node:assert/strict";

const routes = [
  "index.html",
  "about/index.html",
  "dr-wallis/index.html",
  "services/index.html",
  "services/longevity/index.html",
  "services/medical-second-opinion/index.html",
  "services/urgent-care/index.html",
  "services/weight-management/index.html",
  "services/womens-health/index.html",
  "privacy/index.html",
  "faq/index.html",
  "contact/index.html",
];

const routeSpecificCopy = new Map([
  ["index.html", "Paradigm by DW Medical"],
  ["about/index.html", "Quality healthcare should be accessible, personal, and convenient."],
  ["dr-wallis/index.html", "Paradigm by DW Medical"],
  ["services/index.html", "Healthcare Services Tailored to You"],
  ["contact/index.html", "Contact Us"],
]);

for (const file of routes) {
  assert.equal(existsSync(file), true, `Missing page: ${file}`);
  const html = readFileSync(file, "utf8");

  assert.match(html, /<!-- Made in Framer/, `${file} should be a mirrored Framer page`);
  assert.match(html, /meta name="generator" content="Framer/, `${file} should preserve Framer metadata`);
  assert.match(html, /framerusercontent\.com\/sites\//, `${file} should preserve production asset URLs`);
  assert.match(html, /Telemedicine in the DC area/, `${file} should preserve site metadata`);

  const expectedCopy = routeSpecificCopy.get(file);
  if (expectedCopy) {
    assert.match(
      html,
      new RegExp(expectedCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `${file} missing route-specific copy`,
    );
  }
}

const home = readFileSync("index.html", "utf8");
assert.match(home, /Book a Discovery Call/, "Home page should include the production CTA");
assert.match(home, /Core Areas of Care/, "Home page should include the production care section");
assert.match(home, /Published Jun 14, 2026, 11:12 AM UTC/, "Home page should match the mirrored publish timestamp");

console.log("Mirrored Framer site smoke test passed.");
