# Specification

## Summary
**Goal:** Make language switching work instantly and consistently across the entire app (Game Zone, Quiz Zone, and Coloring Zone) for all supported languages (tr, en, es, fr, de, it, ru, pt, zh, ja).

**Planned changes:**
- Fix app-wide language switching so changing the language from the header immediately re-renders the currently open screen (including Game/Quiz/Coloring) without navigation or refresh, while keeping existing localStorage persistence.
- Audit Game Zone, Quiz Zone, and Coloring Zone pages/components to remove/replace hard-coded English UI strings with the existing translation system so all user-facing text renders in the selected language.
- Add/repair missing translation keys/mappings so es/fr/de/it/ru/pt/zh/ja do not silently fall back to English for strings used in Game/Quiz/Coloring (including sub-features like Daily Surprise card labels and in-game category labels).
- Verify backend endpoints used by Game/Quiz/Coloring honor the requested language where localized content is supported, and ensure backend responses don’t unintentionally force English-only output for supported languages.

**User-visible outcome:** Selecting any supported language updates all visible UI text immediately across the app (including Game Zone, Quiz Zone, and Coloring Zone), and non-English languages no longer get stuck showing English strings.
