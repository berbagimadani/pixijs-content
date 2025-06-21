// === Timeline Preview Vanilla JS ===
// Anda harus punya:
// - window.timelineData: JSON footage (scenes, layers, animations)
// - window.masterTimeline: GSAP timeline (hasil dari TimelineFactory.create)
// Panggil renderTimeline(window.timelineData) setelah data siap!

const PIXELS_PER_SECOND = 90;
let totalDuration = 0;
let userSeeking = false;

// Render timeline bar (scene/layer/animasi visual)
function renderTimeline(timelineData) {
  const timelineBar = document.getElementById('timeline-bar');
  timelineBar.innerHTML = '';
  totalDuration = timelineData.scenes.reduce((sum, s) => sum + (s.duration || 0), 0);

  document.getElementById('timeline-seekbar').max = totalDuration;
  document.getElementById('timeline-seekbar').value = 0;
  document.getElementById('timeline-time').textContent = `0.00s`;

  // --- Scene grid
  const scenesDiv = document.createElement('div');
  scenesDiv.className = 'flex relative';
  scenesDiv.style.minWidth = `${totalDuration * PIXELS_PER_SECOND}px`;

  let currentSceneStart = 0;
  timelineData.scenes.forEach((scene, i) => {
    const sceneDiv = document.createElement('div');
    sceneDiv.className = 'bg-gray-100 border rounded-xl mr-2 px-2 py-1 flex-shrink-0 relative';
    sceneDiv.style.width = (scene.duration * PIXELS_PER_SECOND) + "px";

    // Scene label
    const label = document.createElement('span');
    label.className = 'text-xs text-gray-500 absolute left-1 top-0';
    label.textContent = `Scene ${i+1} (${scene.duration}s)`;
    sceneDiv.appendChild(label);

    // --- Layers
    scene.layers.forEach((layer, j) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'h-7 flex items-center relative mb-1';

      // Layer type label
      const typeLabel = document.createElement('span');
      typeLabel.className = 'text-[10px] text-gray-400 min-w-[65px]';
      typeLabel.textContent = layer.type;
      layerDiv.appendChild(typeLabel);

      // Anim bar wrapper
      const animWrap = document.createElement('div');
      animWrap.className = 'relative flex-1 h-6 ml-1';

      // Helper flatten animasi: support group/nested
      function flattenAnims(anims, parentAt = 0) {
        const result = [];
        for (const anim of anims) {
          if (anim.group && Array.isArray(anim.group)) {
            // Nested group
            result.push(...flattenAnims(anim.group, parentAt + (anim.at || 0)));
          } else {
            result.push({
              ...anim,
              at: (anim.at || 0) + parentAt
            });
          }
        }
        return result;
      }
      const flatAnims = flattenAnims(layer.animations || []);

      flatAnims.forEach(anim => {
        const duration = anim.params?.duration || anim.duration || 0.7;
        const at = anim.at || 0;
        const color =
          anim.type === "zoomIn" ? "#22c55e" :
          anim.type === "pulse" ? "#fde047" :
          anim.type === "shake" ? "#ef4444" :
          anim.type === "swing" ? "#2563eb" :
          anim.type === "blur" ? "#9333ea" :
          anim.type === "typewriter" ? "#222" :
          anim.type === "flicker" ? "#1db954" :
          anim.type === "glitch" ? "#7289da" :
          anim.type === "spinClose" ? "#fb7185" :
          anim.type === "bounce" ? "#fbbf24" :
          "#888";

        const bar = document.createElement('div');
        bar.title = `${anim.type} (${duration}s)`;
        bar.className = 'absolute rounded-lg flex items-center justify-center text-xs px-1 text-white shadow';
        bar.style.left = (at * PIXELS_PER_SECOND) + "px";
        bar.style.width = (duration * PIXELS_PER_SECOND) + "px";
        bar.style.height = "22px";
        bar.style.top = "0";
        bar.style.background = color;
        bar.style.opacity = "0.86";
        bar.textContent = anim.type;
        animWrap.appendChild(bar);
      });

      layerDiv.appendChild(animWrap);
      sceneDiv.appendChild(layerDiv);
    });
    scenesDiv.appendChild(sceneDiv);
    currentSceneStart += scene.duration;
  });

  timelineBar.appendChild(scenesDiv);
}
 
 