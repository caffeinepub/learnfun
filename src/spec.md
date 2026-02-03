# Specification

## Summary
**Goal:** Make the Coloring Canvas touch gestures feel natural by pinch-zooming toward the touched area (pinch midpoint), enabling reliable zoom-out back to full view, and preventing page-level zoom/scroll from interfering.

**Planned changes:**
- Update pinch gesture math so scaling is centered on the pinch focal point (midpoint), keeping the content under the midpoint stable while zooming.
- Ensure pinch zoom-out works smoothly and can consistently return to the default 1x full-view state without getting stuck.
- Add/adjust touch-friendly canvas repositioning while zoomed (e.g., two-finger pan or equivalent) without interfering with single-finger drawing.
- Refine touch handling (e.g., touch-action and preventDefault usage) so gestures transform the canvas viewport rather than triggering browser page zoom/scroll, avoiding jitter and sudden jumps.
- Maintain compatibility with existing zoom controls (buttons and double-tap zoom toggle) so they continue to work without conflicts with pinch gestures.

**User-visible outcome:** On touch devices, users can pinch-zoom into the exact area they intend (zoom follows their fingers), smoothly zoom back out to the full canvas, and pan around the zoomed canvas—while single-finger interaction remains dedicated to drawing and existing zoom controls still behave as expected.
