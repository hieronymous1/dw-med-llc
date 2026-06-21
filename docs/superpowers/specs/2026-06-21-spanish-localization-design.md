# Spanish Localization Design

## Goal

Add a complete Spanish version of the mirrored DW Medical site and a footer language control that switches between English and Spanish while preserving the visitor's current page.

## Scope

The implementation covers all 12 checked-in routes:

- Home
- About / philosophy
- Doctor profile
- Services overview
- Five service detail pages
- FAQ
- Contact
- Privacy

Navigation, calls to action, footer content, headings, body copy, legal copy, page titles, and meta descriptions are translated. Brand names, clinician credentials, email addresses, phone numbers, street addresses, and third-party policy names remain unchanged where appropriate.

## Architecture

The existing English routes remain canonical and unchanged:

```text
/
/about/
/services/
...
```

Spanish pages are emitted as paired static routes:

```text
/es/
/es/about/
/es/services/
...
```

The production pages are mirrored Framer exports. Localization therefore runs as a deterministic post-processing build step over those checked-in English files. It does not depend on the stale custom site generator or on runtime machine translation.

Each localized page receives:

- `lang="es"` on the root document
- A translated `<title>` and meta description
- Reciprocal `hreflang="en"` and `hreflang="es"` links
- A small shared localization stylesheet
- A footer EN/ES segmented control
- A shared language-navigation script

## Footer Control

The selected design is a compact segmented control:

```text
[ EN | ES ]
```

It appears in the footer's bottom legal row. The active language is visually filled and exposed through `aria-current="page"`. Each option is a real link, so it remains usable without JavaScript, supports keyboard navigation, and gives search engines explicit paired routes.

The control:

- Preserves the equivalent current route
- Uses `EN` and `ES` as concise visible labels
- Provides full accessible labels such as “View this page in Spanish”
- Meets a minimum 44px interaction target on narrow screens
- Uses the footer's existing black/white visual language

## Preference Behavior

When a visitor activates a language link, the shared script stores `en` or `es` in `localStorage`. Storage is an enhancement only:

- Navigation works without JavaScript
- Storage failures are ignored safely
- The site does not automatically redirect on first visit
- A stored preference is used only when the visitor later returns to the root English or Spanish homepage

This avoids surprising route changes while still remembering an explicit user choice.

## Content Handling

Translations are maintained in a checked-in JavaScript data file keyed by route and exact source string. The localization build:

1. Reads each English page.
2. Replaces approved English copy in rendered text and Framer hydration data.
3. Rewrites internal route references to the Spanish equivalents.
4. Adds language metadata and the footer control.
5. Writes the Spanish page under `/es/`.

The build fails if a required translation is missing, preventing partially translated pages from being shipped silently.

## Security and Privacy

The feature makes no network requests and sends no visitor content anywhere. It stores only the two-character language preference. Translated strings are static, reviewed source data; no untrusted HTML is inserted at runtime.

## Testing

Automated tests verify:

- All 12 English routes still exist
- All 12 Spanish routes are generated
- Spanish pages use `lang="es"`
- Page titles and descriptions are translated
- Every page includes reciprocal English/Spanish links
- Footer controls point to equivalent routes
- Active-language semantics are correct
- Representative page-specific Spanish copy appears on every route
- No Spanish route retains required English UI labels
- The mirrored Framer metadata and assets remain intact

Browser verification covers desktop and mobile footer layouts, keyboard focus, switching in both directions, route preservation, and persistence.

