# PixiJS Data-Driven Footage Maker

This project demonstrates a modular architecture for creating animations using **PixiJS** and **GSAP**. Scenes are generated from JSON templates so new effects and layers can be added with minimal code changes.

## Directory Structure

```
src/
  core/            # application and scene management
  effects/         # reusable animation effects
  templates/       # JSON templates describing scenes
  utils/           # helper functions for property and animation parsing
  TimelineFactory  # builds GSAP timelines from template scenes
  main.js          # entry file used by Vite
```

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

This serves the project using Vite.
