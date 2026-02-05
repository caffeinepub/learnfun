# Specification

## Summary
**Goal:** Add a complete Spanish (es) UI translation pack by replacing the current Spanish fallback with an explicit Spanish dictionary.

**Planned changes:**
- Update `frontend/src/lib/translations.ts` to define an explicit `es` translations entry (not referencing `commonTranslations`).
- Provide Spanish values for every key currently present in `commonTranslations`, preserving any existing emojis/icons in the strings.
- Keep all other language entries unchanged.

**User-visible outcome:** When selecting “Español” in the in-app language selector, UI labels (e.g., Home, Welcome, Back, Loading, Game Zone, Quiz Zone, Coloring Section) appear in Spanish.
