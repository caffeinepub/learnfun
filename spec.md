# Specification

## Summary
**Goal:** Make language switching fully immediate and 100% complete across the entire app (all screens, games, and UI strings) for all 10 supported languages (tr, en, es, fr, de, it, ru, pt, zh, ja), with no leftover English (or other-language) text.

**Planned changes:**
- Audit the frontend for hardcoded user-facing strings and route all visible text through the existing translation system (useTranslation + translations dictionary), focusing on Memory Card Game, Logic Puzzle Game, and Problem Solving Game.
- Ensure language selection updates all currently visible UI text instantly (no refresh/navigation required) across shared components and zones (Game Zone, Quiz Zone, Coloring Zone), including sub-features like Daily Surprise labels and in-game category/theme labels.
- Fill translation-key coverage in `frontend/src/lib/translations.ts` so every key used by the app has values for all 10 languages (preventing silent fallback to English), and add a development-time warning when keys are missing for the active language.
- Update backend encouragement-message localization so `getEncouragementMessage` returns non-empty, localized messages for all 10 languages without falling back to an English hardcoded message.

**User-visible outcome:** Users can switch to any of the 10 languages and immediately see every screen, game UI, labels, and messages fully translated with no untranslated English text remaining anywhere in the app.
