import AppManager from './core/AppManager.js';
import template from './templates/sampleTemplate.json';
import registerEffects from './effects/register.js';

registerEffects();

const appManager = await AppManager.create();

document.body.appendChild(appManager.view);

await appManager.loadTemplate(template);
