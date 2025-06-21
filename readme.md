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

## Loading Timelines

`AppManager` can build a GSAP timeline from a JSON file. The example template at `src/templates/timelineTemplate.json` describes two scenes. Load it using `loadTimeline` and play the resulting timeline:

```javascript
import AppManager from './core/AppManager.js';
import timeline from './templates/timelineTemplate.json';
import registerEffects from './effects/register.js';

registerEffects();

const appManager = await AppManager.create();
document.body.appendChild(appManager.view);

const tl = await appManager.loadTimeline(timeline);
tl.play();
```

This reads the template, builds each scene and plays them back to back.

## Animations

Each layer can provide an `animations` array describing how it should change
over time. Every object in this array is executed at the time given by its
`at` property. If `at` is omitted the animations run sequentially. The `at`
field may also contain a GSAP position string such as `"+=1"` for precise
scheduling.

Example of two animations applied to one layer:

```json
{
  "layers": [
    {
      "type": "sprite",
      "texture": "bunny.png",
      "animations": [
        { "type": "zoomIn", "params": { "from": 1, "to": 2, "duration": 0.5 } },
        { "at": "+=0.5", "to": { "rotation": 90 }, "duration": 0.5 }
      ]
    }
  ]
}
```

The layer first zooms in and then rotates.
