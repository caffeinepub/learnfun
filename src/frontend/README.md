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

The application uses a dual-bridge Android audio architecture for optimal performance and independence between background music and sound effects.

### Android WebView Bridge API

The app requires two separate JavaScript bridge objects for audio playback:

#### 1. Background Music Bridge: `window.BackgroundAudio`

