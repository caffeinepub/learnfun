# LearnFun Frontend

A children's educational application built with React, TypeScript, and Tailwind CSS.

## Features

- Multiple age groups (3-5, 6-8, 9-12, 13-15)
- Eight interactive games
- Quiz zone with randomized questions
- Coloring section with age-appropriate templates
- Multi-language support (9 languages)
- Responsive design for all devices
- Background music and sound effects
- Offline support via Service Worker

## Offline Support

The application includes a Service Worker that enables offline functionality:

- **App Shell Caching**: The main HTML and core assets are cached for offline access
- **Asset Caching**: Images and static resources use stale-while-revalidate strategy
- **Navigation Fallback**: When offline, navigation requests serve the cached app shell

After visiting the app once while online, users can reload and navigate the app even when offline.

## Sound System

The application includes a comprehensive sound system that works both on web and Android WebView, with support for one-shot sound effects and looping background audio.

### For APK Packagers

When building the Android APK, include the following sound files in the `res/raw/` folder:

#### One-Shot Sound Effects
- `tap_click` - Button/tap interaction sound
- `card_flip` - Memory card flip sound
- `match_success` - Successful match sound
- `match_fail` - Failed match sound
- `quiz_correct` - Correct quiz answer sound
- `quiz_wrong` - Wrong quiz answer sound
- `level_complete` - Level completion sound
- `celebration` - Celebration modal sound

#### Looping Background/Ambient Tracks
- `bg_playful_melody` - Cheerful, playful background music (default track)
- `bg_happy_adventure` - Upbeat adventure theme
- `bg_gentle_wonder` - Soft, wonder-filled ambient track
- `bg_cheerful_exploration` - Bright exploration music
- `bg_magical_journey` - Magical, enchanting background
- `bg_sunny_playground` - Light, sunny playground atmosphere
- `bg_dreamy_clouds` - Calm, dreamy ambient sound
- `bg_curious_discovery` - Curious, discovery-themed music

**Important:** 
- File names must be lowercase with only letters, numbers, and underscores
- Do not include file extensions in the resource names
- Supported formats: `.mp3`, `.wav`, `.ogg`
- Background tracks should be designed to loop seamlessly
- Recommended: Keep background music volume lower than SFX for better UX

### Android WebView Bridge-Only Mode

For APK builds that should only use Android native audio (no web fallback), the app automatically detects the Android WebView bridge and enables bridge-only mode. This prevents web audio fallback when the Android bridge or required methods are not available.

**Manual Override (Optional):**

You can also enable Android-only mode via environment variable at build time:

