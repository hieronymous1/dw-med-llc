# Spanish Localization Implementation Plan

1. Replace the obsolete smoke test with route-aware bilingual assertions and run it to confirm the Spanish feature is absent.
2. Add translation data for shared UI and every route.
3. Add a localization build script that creates paired `/es/` pages from the mirrored English pages.
4. Add the accessible footer segmented control and shared language preference script.
5. Generate all Spanish pages and run the full test suite.
6. Serve the static site locally and verify desktop/mobile behavior in a browser.
7. Review the diff for accidental changes to mirrored English content.
8. Commit with a conventional message and push `main` to GitHub.
