import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const routes = [
  { route: "/", file: "index.html", marker: "Bienvenido a Paradigm by DW Medical", title: "Paradigm by DW Medical", description: "Telemedicina personalizada en Maryland, Virginia y Washington, D. C." },
  { route: "/about/", file: "about/index.html", marker: "La atención médica de calidad debe ser accesible, personal y conveniente.", title: "Nuestra filosofía | DWMedLLC", description: "Conozca nuestro enfoque de telemedicina personalizada." },
  { route: "/dr-wallis/", file: "dr-wallis/index.html", marker: "Qué puede esperar:", title: "Dra. Denise D. Wallis, MD | DWMedLLC", description: "Conozca a la Dra. Denise D. Wallis, MD, FAAFP." },
  { route: "/services/", file: "services/index.html", marker: "Servicios de salud adaptados a usted", title: "Servicios | DWMedLLC", description: "Servicios de salud adaptados a usted." },
  { route: "/services/longevity/", file: "services/longevity/index.html", marker: "Longevidad y medicina preventiva", title: "Longevidad y medicina preventiva | DWMedLLC", description: "Atención de longevidad y medicina preventiva." },
  { route: "/services/medical-second-opinion/", file: "services/medical-second-opinion/index.html", marker: "Segunda opinión médica", title: "Segunda opinión médica | DWMedLLC", description: "Orientación médica experta para pacientes en EE. UU. e internacionales." },
  { route: "/services/urgent-care/", file: "services/urgent-care/index.html", marker: "Atención urgente limitada", title: "Atención urgente limitada | DWMedLLC", description: "Atención virtual rápida para problemas médicos comunes." },
  { route: "/services/weight-management/", file: "services/weight-management/index.html", marker: "Control del peso", title: "Control del peso | DWMedLLC", description: "Atención médica del peso y la salud metabólica." },
  { route: "/services/womens-health/", file: "services/womens-health/index.html", marker: "Menopausia y salud de la mujer", title: "Menopausia y salud de la mujer | DWMedLLC", description: "Atención integral para la menopausia y la salud de la mujer." },
  { route: "/privacy/", file: "privacy/index.html", marker: "Política de privacidad", title: "Política de privacidad | DWMedLLC", description: "Política de privacidad del sitio web de DW Medical." },
  { route: "/faq/", file: "faq/index.html", marker: "Preguntas frecuentes", title: "Preguntas frecuentes | DWMedLLC", description: "Preguntas frecuentes sobre servicios, tarifas y telemedicina." },
  { route: "/contact/", file: "contact/index.html", marker: "Volver a la página de inicio", title: "Contacto | DWMedLLC", description: "Información de contacto de DW Medical." },
];

const injectedPattern = /\n?<!-- DW LOCALIZATION START -->[\s\S]*?<!-- DW LOCALIZATION END -->\n?/g;
const staticServicePages = {
  "/services/longevity/": {
    title: "Longevidad y medicina preventiva",
    kicker: "Viva mejor y por más tiempo, a su manera",
    description: "La atención de longevidad se centra en reducir riesgos, mantener la función y preservar la calidad de vida.",
    offers: ["Evaluación del riesgo cardiometabólico", "Estrategia de pruebas preventivas", "Salud ósea y muscular", "Orientación sobre suplementos basada en evidencia"],
    why: "Al abordar las causas fundamentales antes de que aparezcan síntomas, con frecuencia podemos ralentizar o revertir procesos iniciales como la disfunción metabólica, la resistencia a la insulina o la niebla mental.",
    who: "Este servicio es ideal para adultos que desean adelantarse a las enfermedades crónicas, optimizar su rendimiento, mejorar su energía o invertir de forma intencional en su bienestar a largo plazo.",
    note: "La atención se basa en la ciencia, no en intervenciones extremas o experimentales."
  },
  "/services/womens-health/": {
    title: "Menopausia y salud de la mujer",
    kicker: "La menopausia no debe desviar su vida: recuperemos su equilibrio",
    description: "La menopausia afecta casi todos los sistemas del cuerpo, no solo las hormonas. La atención se aborda con tiempo, matices y respeto por su complejidad.",
    offers: ["Sofocos y sudores nocturnos", "Alteraciones del sueño y fatiga", "Niebla mental y cambios de ánimo", "Aumento de peso y cambios metabólicos", "Salud sexual y vaginal", "Consideraciones de salud a largo plazo"],
    why: "Paradigm by DW Medical ofrece un enfoque moderno, integral y basado en evidencia para la perimenopausia, la menopausia y otras etapas de transición.",
    who: "Este servicio está diseñado para mujeres que buscan una médica que escuche, comprenda los matices de la atención hormonal y ofrezca soluciones personalizadas.",
    note: "Los planes pueden incluir opciones hormonales y no hormonales cuando corresponda. No se recetan sustancias controladas ni se ofrece atención para el TDAH."
  },
  "/services/weight-management/": {
    title: "Control del peso",
    kicker: "Pérdida de peso sostenible, diseñada para usted",
    description: "El control del peso es medicina preventiva y una base de la salud a largo plazo.",
    offers: ["Evaluación médica integral", "Evaluación de factores metabólicos y hormonales", "Uso cuidadoso de medicamentos cuando corresponda", "Estrategias sostenibles basadas en la fisiología"],
    why: "Nuestro enfoque integra medicina basada en evidencia con apoyo personalizado para mejorar la salud metabólica, sentirse mejor y mantener resultados duraderos.",
    who: "Este programa es ideal para adultos que han intentado perder peso sin éxito duradero, personas con resistencia a la insulina o prediabetes y quienes presentan cambios relacionados con la edad, el estrés o las hormonas.",
    note: "La Dra. Wallis está en proceso de obtener la certificación en medicina de la obesidad."
  },
  "/services/medical-second-opinion/": {
    title: "Segunda opinión médica",
    kicker: "Acceso global a orientación médica experta de EE. UU.",
    description: "La Dra. Wallis integra información de distintas especialidades para ofrecer una explicación clara y coherente de casos médicos complejos.",
    offers: ["Revisión detallada de expedientes", "Explicación clara de los hallazgos", "Interpretación médica coherente", "Orientación sobre los próximos pasos"],
    why: "Nuestro servicio permite recibir una revisión experta e imparcial de una médica formada y certificada en EE. UU., mediante un proceso virtual sencillo.",
    who: "Está diseñado para pacientes con diagnósticos graves o complejos, quienes afrontan una cirugía o tratamiento de alto riesgo y personas con síntomas sin resolver.",
    note: "Disponible para pacientes en EE. UU. e internacionales."
  },
  "/services/urgent-care/": {
    title: "Atención urgente limitada",
    kicker: "Atención virtual rápida dirigida por una médica para problemas comunes",
    description: "Disponible para ciertas afecciones sencillas que pueden manejarse de forma segura por telemedicina.",
    offers: ["Infecciones de las vías respiratorias superiores", "Sinusitis", "Infecciones urinarias", "Exacerbaciones leves del asma", "Bronquitis"],
    why: "El acceso rápido a una médica puede evitar visitas innecesarias a urgencias sin comprometer los estándares médicos.",
    who: "Es ideal para personas que buscan atención rápida para problemas comunes no emergentes y valoran una comunicación clara y eficiente.",
    note: "No se ofrece manejo del dolor, atención para TDAH ni sustancias controladas. Normalmente hay citas en 24–48 horas. Tarifa fija: $59."
  }
};

for (const page of routes) {
  const original = readFileSync(page.file, "utf8").replace(injectedPattern, "\n");
  const english = localizeDocument(original, page, "en");
  const spanish = localizeDocument(original, page, "es");
  const spanishFile = page.file === "index.html" ? "es/index.html" : `es/${page.file}`;

  writeFileSync(page.file, english, "utf8");
  mkdirSync(dirname(spanishFile), { recursive: true });
  writeFileSync(spanishFile, spanish, "utf8");
}

function localizeDocument(source, page, language) {
  const englishHref = page.route;
  const spanishHref = page.route === "/" ? "/es/" : `/es${page.route}`;
  const isSpanish = language === "es";
  if (isSpanish && staticServicePages[page.route]) {
    return renderStaticDocument(page, staticServicePages[page.route], englishHref, spanishHref);
  }
  let html = source
    .replace(/<html lang="[^"]*"/, `<html lang="${language}"`)
    .replace(/<html(?![^>]*\blang=)/, `<html lang="${language}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${isSpanish ? page.title : extractTitle(source)}</title>`);

  if (isSpanish) {
    html = html.replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${page.description}">`,
    );
  }

  const headInjection = `<!-- DW LOCALIZATION START -->
  <link rel="alternate" hreflang="en" href="${englishHref}">
  <link rel="alternate" hreflang="es" href="${spanishHref}">
  <link rel="alternate" hreflang="x-default" href="${englishHref}">
  <link rel="stylesheet" href="/assets/localization/language-switcher.css">
  <script src="/assets/localization/translations.js"></script>
  <script>document.documentElement.dataset.dwRoute=${JSON.stringify(page.route)};</script>
  ${isSpanish ? `<script type="application/json" data-spanish-route-marker>${JSON.stringify(page.marker)}</script>` : ""}
  <!-- DW LOCALIZATION END -->`;

  const bodyInjection = `<!-- DW LOCALIZATION START -->
  <div data-language-switcher-source hidden>
    <a href="${englishHref}" hreflang="en"${!isSpanish ? ' aria-current="page"' : ""}>EN</a>
    <a href="${spanishHref}" hreflang="es"${isSpanish ? ' aria-current="page"' : ""}>ES</a>
  </div>
  <script src="/assets/localization/language-switcher.js" defer></script>
  <!-- DW LOCALIZATION END -->`;

  return html
    .replace("</head>", `${headInjection}\n</head>`)
    .replace("</body>", `${bodyInjection}\n</body>`);
}

function renderStaticDocument(page, service, englishHref, spanishHref) {
  return `<!doctype html>
<!-- Made in Framer · localized static service page -->
<html lang="es" data-dw-route="${page.route}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="generator" content="Framer">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="alternate" hreflang="en" href="${englishHref}">
  <link rel="alternate" hreflang="es" href="${spanishHref}">
  <link rel="alternate" hreflang="x-default" href="${englishHref}">
  <link rel="stylesheet" href="/assets/localization/language-switcher.css">
  <script src="/assets/localization/translations.js"></script>
  <script>document.documentElement.dataset.dwRoute=${JSON.stringify(page.route)};</script>
  <script type="application/json" data-spanish-route-marker>${JSON.stringify(page.marker)}</script>
</head>
<body>
  ${renderStaticService(service)}
  <div data-language-switcher-source hidden>
    <a href="${englishHref}" hreflang="en">EN</a>
    <a href="${spanishHref}" hreflang="es" aria-current="page">ES</a>
  </div>
  <script src="/assets/localization/language-switcher.js" defer></script>
</body>
</html>`;
}

function extractTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "DWMedLLC";
}

function renderStaticService(service) {
  return `<div id="main" class="dw-static-page">
    <header class="dw-static-header">
      <a href="/es/" class="dw-static-brand">Paradigm <span>by DW Medical</span></a>
      <nav><a href="/es/services/">Servicios</a><a href="/es/about/">Nuestra filosofía</a><a href="/es/faq/">Tarifas/Seguro</a></nav>
      <a class="dw-static-button" href="https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_1_113462">Reserve una llamada de orientación</a>
    </header>
    <main>
      <section class="dw-static-hero"><p>Servicios / ${service.title}</p><h1>${service.title}</h1><h2>${service.kicker}</h2><p>${service.description}</p></section>
      <section class="dw-static-grid">
        <div><h3>Lo que ofrecemos</h3><ul>${service.offers.map((item) => `<li>${item}</li>`).join("")}</ul><p class="dw-static-note">${service.note}</p></div>
        <div><h3>Por qué es importante</h3><p>${service.why}</p><h3>Para quién es</h3><p>${service.who}</p></div>
      </section>
      <section class="dw-static-callout"><h2>Programe una llamada de orientación</h2><p>Una conversación breve y gratuita permite confirmar que este enfoque sea adecuado antes de programar una consulta médica.</p><a class="dw-static-button dw-static-button--light" href="https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_1_113462">Programar llamada</a></section>
    </main>
    <footer class="dw-static-footer"><strong>DW Medical LLC</strong><p>Paradigm by DW Medical es una práctica de telemedicina de pago directo dirigida por una médica.</p><div><a href="/es/">Inicio</a><a href="/es/services/">Servicios</a><a href="/es/about/">Nuestra filosofía</a><a href="/es/privacy/">Política de privacidad</a></div><p>admin@paradigmbydw.com · +1 (571) 582-5870</p><p>©2025 LW Medical. Todos los derechos reservados.</p></footer>
  </div>`;
}
