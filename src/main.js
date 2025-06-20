import AppManager from './core/AppManager.js';
import timeline from './templates/timelineTemplate.json';
import registerEffects from './effects/register.js';

registerEffects();

const appManager = await AppManager.create();

document.body.appendChild(appManager.view);

const tl = await appManager.loadTimeline(timeline);
tl.play();
