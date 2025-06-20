import AppManager from './core/AppManager.js';
import template from './templates/sampleTemplate.json';
import registerEffects from './effects/register.js';

registerEffects();

const appManager = new AppManager({
  width: 800,
  height: 600,
  backgroundColor: 0x000000
});

document.body.appendChild(appManager.view);

appManager.loadTemplate(template);
