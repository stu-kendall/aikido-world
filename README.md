# Aikido World

A browser-local theme park adventure introducing Aikido Code, Cloud, Attack, and Protect. Independent educational prototype. No backend, account collection, or analytics. Game progress is stored in localStorage.

## Run

Serve `dist/` with any static web server. For example, `python3 -m http.server 4173 --directory dist`.

## Check

Run `node --check dist/game.js` and `node check-game.cjs`. The functional check exercises both ride choices, full playthroughs, all recovery choices, persistence, guide content, and safe park naming.

## Files

- `dist/index.html`: responsive game shell and accessible dialogs.
- `dist/styles.css`: visual design, responsive layouts, animations, and motion preferences.
- `dist/game.js`: chapters, interaction logic, SVG park, progress, and product field guide.

Product explanations use Aikido’s public Code, Cloud, Attack, and Protect pages. All guest counts and park outcomes are fictional. The story intentionally distinguishes proposed fixes, testing, deployment, pentest validation, and runtime mitigation. Product names in the guide link to official sources; no private onboarding information appears in the app.

The font stylesheet uses Google Fonts, with local sans-serif fallbacks. Sound is off by default; optional effects are generated locally. Native keyboard buttons, keyboard-accessible map markers, dialog focus behavior, motion pause, and operating-system reduced-motion preferences are supported.
