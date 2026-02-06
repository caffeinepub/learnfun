# Specification

## Summary
**Goal:** Fix the audio mute toggles so switching Background Music or SFX to Off reliably silences the app immediately and prevents audio from resuming until re-enabled.

**Planned changes:**
- Update the background-music mute toggle behavior so turning it Off immediately stops any currently playing track and prevents background music from restarting on navigation (both Android WebView bridge mode and web fallback).
- In web fallback mode, ensure the HTMLAudioElement is paused and reset to time 0 when Background Music is toggled Off.
- In Android WebView bridge mode, attempt to stop/pause background music through the bridge when possible; if not available, block any further background playback attempts while muted.
- Update the audio service so background-music mute state changes trigger stop behavior immediately (without relying on a later “start” call).
- Ensure the SFX mute toggle prevents any new sound effects from playing while Off, and resumes normal SFX playback when turned On.

**User-visible outcome:** When users switch Background Music or SFX to Off, audio is fully silenced right away and stays muted across the app until turned back On.
