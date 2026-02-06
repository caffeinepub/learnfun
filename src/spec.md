# Specification

## Summary
**Goal:** Add offline-capable loading for the React app via a service worker, and ensure Android WebView uses bridge-only audio mode reliably, with updated Kotlin WebView documentation.

**Planned changes:**
- Add a service worker served from the app origin that precaches the app shell and key static assets, plus runtime caching for offline navigation.
- Register the service worker from a non-immutable entry point (e.g., `frontend/index.html`) so it installs and controls production builds without changing `frontend/src/main.tsx`.
- Detect Android WebView at runtime (via `window.Android`) and set `window.__AUDIO_CONFIG__.androidOnly = true` early enough to prevent web-audio fallback when running with the JS bridge.
- Update `frontend/README.md` with a copy/paste-ready Kotlin `MainActivity` example configuring WebView for offline-friendly caching and reliable audio playback, loading `https://learnfun-h93.caffeine.xyz/` and exposing `AndroidAudio` + `BackgroundAudio` JS interfaces.

**User-visible outcome:** After opening once online, the app can be reloaded offline without a blank screen (app shell renders and cached routes still work), and audio behaves correctly inside Android WebView using the native bridge while remaining unchanged in normal browsers.
