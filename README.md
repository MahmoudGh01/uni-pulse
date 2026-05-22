# UniPulse

UniPulse is a playful Campus + City Event Board prototype built with Expo and React Native. It helps students quickly discover what is happening around campus and nearby downtown spots, filter events by category, and save events they care about.

The current build intentionally prioritizes functionality and rubric coverage over polished visual design.

## Tech Stack

- Expo SDK 54
- React Native + TypeScript
- Expo Router (file-based routing)
- ESLint + Prettier

## Quick Start

```bash
npm install
npm run start
```

Then open:

- iOS simulator with `i`
- Android emulator with `a`
- Web with `w`

## Scripts

- `npm run start` - Start Expo with a cleared cache
- `npm run android` - Launch Android target
- `npm run ios` - Launch iOS target
- `npm run web` - Launch web target
- `npm run lint` - Run typecheck, ESLint, and Prettier checks

## Current Prototype Features

- Three core UI components on the main view: Header, EventFlasher, and EventFeed
- Category filtering via React state (`All`, `Campus`, `City`, `Club`)
- Search input for quickly narrowing event cards
- Save/unsave behavior with a live saved counter
- Simulated event loading using `useEffect` + a public API (`jsonplaceholder`)
- Chaotic "Panic Button" that flashes random surprise event messages

## Project Structure

- `app/(tabs)/index.tsx` - Core UniPulse screen and components
- `app/(tabs)/_layout.tsx` - Tabs configuration
- `app/_layout.tsx` - Root navigation and app providers

## Potential Future Features

- Persist saved events and last-used filters with AsyncStorage
- Add geolocation-based "Near Me" event filtering
- Send local push reminders before saved events start
- Integrate an interactive map view with event pins
- Add real backend sync (create/join events, live updates, moderation)

## Notes

- This project avoids external UI libraries on purpose and uses core React Native components only.
- If API fetching fails, the app falls back to local sample events so the prototype still works.
