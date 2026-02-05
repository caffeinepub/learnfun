# Specification

## Summary
**Goal:** Add complete French (fr) and German (de) UI translation packs by replacing the current fallback behavior with explicit per-language dictionaries.

**Planned changes:**
- Update `frontend/src/lib/translations.ts` to replace `fr: commonTranslations` with a full French dictionary containing translated values for every existing key in `commonTranslations`, preserving any existing emojis/symbols.
- Update `frontend/src/lib/translations.ts` to replace `de: commonTranslations` with a full German dictionary containing translated values for every existing key in `commonTranslations`, preserving any existing emojis/symbols.

**User-visible outcome:** When selecting French or German, the UI displays fully translated strings (with the same emojis/symbols as other languages) instead of falling back to the shared/common translations.
