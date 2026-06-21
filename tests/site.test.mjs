import { existsSync, readFileSync } from "node:fs";
import assert from "node:assert/strict";

const routes = [
  "",
  "about/",
  "dr-wallis/",
  "services/",
  "services/longevity/",
  "services/medical-second-opinion/",
  "services/urgent-care/",
  "services/weight-management/",
  "services/womens-health/",
  "privacy/",
  "faq/",
  "contact/",
];

const representativeSpanish = new Map([
  ["", "Bienvenido a Paradigm by DW Medical"],
  ["about/", "La atención médica de calidad debe ser accesible, personal y conveniente."],
  ["dr-wallis/", "Qué puede esperar:"],
  ["services/", "Servicios de salud adaptados a usted"],
  ["services/longevity/", "Longevidad y medicina preventiva"],
  ["services/medical-second-opinion/", "Segunda opinión médica"],
  ["services/urgent-care/", "Atención urgente limitada"],
  ["services/weight-management/", "Control del peso"],
  ["services/womens-health/", "Menopausia y salud de la mujer"],
  ["privacy/", "Política de privacidad"],
  ["faq/", "Preguntas frecuentes"],
  ["contact/", "Volver a la página de inicio"],
]);

for (const route of routes) {
  const englishPath = route ? `${route}index.html` : "index.html";
  const spanishPath = route ? `es/${route}index.html` : "es/index.html";

  assert.equal(existsSync(englishPath), true, `Missing English page: ${englishPath}`);
  assert.equal(existsSync(spanishPath), true, `Missing Spanish page: ${spanishPath}`);

  const english = readFileSync(englishPath, "utf8");
  const spanish = readFileSync(spanishPath, "utf8");
  const englishHref = route ? `/${route}` : "/";
  const spanishHref = route ? `/es/${route}` : "/es/";

  assert.match(english, /<!-- Made in Framer/, `${englishPath} should preserve Framer markup`);
  assert.match(spanish, /<!-- Made in Framer/, `${spanishPath} should preserve Framer markup`);
  assert.match(english, /<html[^>]+lang="en"/, `${englishPath} should declare English`);
  assert.match(spanish, /<html[^>]+lang="es"/, `${spanishPath} should declare Spanish`);
  assert.match(english, /data-language-switcher/, `${englishPath} should include the language control`);
  assert.match(spanish, /data-language-switcher/, `${spanishPath} should include the language control`);
  assert.match(english, new RegExp(`href="${escapeRegex(spanishHref)}"`), `${englishPath} missing Spanish route`);
  assert.match(spanish, new RegExp(`href="${escapeRegex(englishHref)}"`), `${spanishPath} missing English route`);
  assert.match(english, /hreflang="en"/, `${englishPath} missing English hreflang`);
  assert.match(english, /hreflang="es"/, `${englishPath} missing Spanish hreflang`);
  assert.match(spanish, /hreflang="en"/, `${spanishPath} missing English hreflang`);
  assert.match(spanish, /hreflang="es"/, `${spanishPath} missing Spanish hreflang`);
  assert.match(
    spanish,
    new RegExp(escapeRegex(representativeSpanish.get(route))),
    `${spanishPath} missing representative Spanish copy`,
  );
}

const sharedScript = readFileSync("assets/localization/language-switcher.js", "utf8");
assert.match(sharedScript, /localStorage\.setItem/, "Language choice should be remembered");
assert.match(sharedScript, /dw-language/, "Language preference should use a scoped storage key");

console.log("Bilingual Framer site tests passed.");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
