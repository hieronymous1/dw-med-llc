(function () {
  const storageKey = "dw-language";
  const language = document.documentElement.lang === "es" ? "es" : "en";
  const route = document.documentElement.dataset.dwRoute || "/";
  const englishHref = route;
  const spanishHref = route === "/" ? "/es/" : `/es${route}`;
  const translations = window.DW_TRANSLATIONS || { common: {}, byRoute: {} };
  const routeTranslations = translations.byRoute[route] || {};
  const dictionary = { ...translations.common, ...routeTranslations };
  const replacements = Object.entries(dictionary).sort((a, b) => b[0].length - a[0].length);
  let translating = false;

  function translateText(root) {
    if (language !== "es" || translating) return;
    translating = true;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      if (node.parentElement?.closest("script, style, noscript, [data-language-switcher]")) continue;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (!trimmed) continue;
      let translated = raw;
      for (const [english, spanish] of replacements) {
        if (translated.includes(english)) translated = translated.split(english).join(spanish);
      }
      if (translated !== raw) {
        node.nodeValue = translated;
      }
    }
    translating = false;
  }

  function localizeLinks(root) {
    if (language !== "es") return;
    for (const anchor of root.querySelectorAll?.('a[href^="/"], a[href^="./"], a[href^="../"]') || []) {
      if (anchor.closest("[data-language-switcher]")) continue;
      let url;
      try {
        url = new URL(anchor.getAttribute("href"), window.location.origin);
      } catch {
        continue;
      }
      if (url.origin !== window.location.origin || url.pathname.startsWith("/es/")) continue;
      url.pathname = url.pathname === "/" ? "/es/" : `/es${url.pathname}`;
      anchor.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function addSwitcher() {
    if (document.querySelector("[data-language-switcher]")) return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const wrapper = document.createElement("div");
    wrapper.className = "dw-language-switcher";
    wrapper.dataset.languageSwitcher = "";
    wrapper.innerHTML = `
      <nav class="dw-language-switcher__control" aria-label="${language === "es" ? "Idioma" : "Language"}">
        <a href="${englishHref}" lang="en" hreflang="en" aria-label="View this page in English"${language === "en" ? ' aria-current="page"' : ""}>EN</a>
        <a href="${spanishHref}" lang="es" hreflang="es" aria-label="Ver esta página en español"${language === "es" ? ' aria-current="page"' : ""}>ES</a>
      </nav>`;
    footer.insertAdjacentElement("afterend", wrapper);

    for (const link of wrapper.querySelectorAll("a")) {
      link.addEventListener("click", () => {
        try {
          localStorage.setItem(storageKey, link.lang);
        } catch {
          // Navigation remains functional when storage is unavailable.
        }
      });
    }
  }

  function update(root = document) {
    if (language === "es" && translations.titles?.[route]) {
      document.title = translations.titles[route];
    }
    translateText(root);
    localizeLinks(root);
    addSwitcher();
  }

  update();
  document.addEventListener("DOMContentLoaded", () => update());
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) update(node);
      }
    }
    addSwitcher();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
