import AppManager from './core/AppManager.js';
import timeline from './templates/timelineTemplate.json';
import sample from './templates/sampleTemplate.json';
import registerEffects from './effects/register.js';
 

registerEffects(); 
 
// const playBtn = document.getElementById("timeline-play");
//     const stopBtn = document.getElementById("timeline-stop");
//     const seekbar = document.getElementById("timeline-seekbar");
//     const timeLabel = document.getElementById("timeline-time");
//     const statusLabel = document.getElementById("timeline-status");
//     let userSeeking = false; 

//     playBtn.onclick = () => {
//         masterTimeline.play();
//         statusLabel.textContent = "Playing...";
//     };
//     stopBtn.onclick = () => {
//         masterTimeline.pause();
//         statusLabel.textContent = "Stopped";
//     };

//     masterTimeline.eventCallback("onUpdate", () => {
//         if (!userSeeking) {
//         seekbar.value = masterTimeline.time().toFixed(2);
//         timeLabel.textContent = `${masterTimeline.time().toFixed(2)}s`;
//         }
//     });

//     seekbar.oninput = () => {
//         userSeeking = true;
//         masterTimeline.time(+seekbar.value, false);
//         timeLabel.textContent = `${(+seekbar.value).toFixed(2)}s`;
//     };
//     seekbar.onchange = () => {
//         userSeeking = false;
//     };


// const appManager = await AppManager.create({ width: 1200, height: 700  }); 
// document.getElementById("pixi-container").appendChild(appManager.view); 
// const tl = await appManager.loadTimeline(timeline);
//const tl = await appManager.loadTemplate(sample);

(async () => {
  const appManager = await AppManager.create({ width: 1200, height: 700 });
  document.getElementById("pixi-container").appendChild(appManager.view);
  const tl = await appManager.loadTimeline(timeline); 
 
setTimeout(() => {
    tl[0].play();
console.log(tl[0])
}, 2000);

  // --- play/stop/seek handler, renderTimeline dsb
})();
 