# Specification

## Summary
**Goal:** Fix language switching so changing the app language updates all user-visible text across every page and game immediately, without a page reload.

**Planned changes:**
- Ensure the current language is stored and consumed via React state/context so all pages and components re-render with the selected language in the same render cycle.
- Replace/remove hardcoded non-localized strings across pages, games, and shared components so all user-facing text comes from the existing translation system (or language-aware data).
- Make generated/in-game text (including ProblemSolvingGame scenarios/options and any fallback content) language-aware so it updates when the language changes.
- Update language-dependent React Query usage so localized backend-sourced content refetches/recomputes on language change (e.g., by including the current language in query keys and refreshing derived state).

**User-visible outcome:** Switching languages updates 100% of visible UI text (including games, quizzes, coloring areas, and any open dialogs/modals) instantly across the app, with no stale-language content and no page reload.
