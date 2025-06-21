import AppManager from './core/AppManager.js';
import timeline from './templates/timelineTemplate.json';
import sample from './templates/sampleTemplate.json';
import registerEffects from './effects/register.js';

registerEffects(); 

const appManager = await AppManager.create({ responsive: false, width: 400, height: 700  }); 

document.body.appendChild(appManager.view);

const tl = await appManager.loadTimeline(timeline);
//const tl = await appManager.loadTemplate(sample);
//tl.play();
