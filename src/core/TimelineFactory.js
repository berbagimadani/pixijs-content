import { gsap } from 'gsap';
import { parseProps } from '../utils/index.js';
import EffectRegistry from './EffectRegistry.js';

export default class TimelineFactory {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
  }

  async create(data) {
    const master = gsap.timeline();

    // preload all scene layers but keep them off stage
    const scenes = [];
    for (const scene of data.scenes) {
      await this.sceneManager.loadScene(scene, { applyAnimations: false });
      // Clone the layers for each scene
      scenes.push({ data: scene, layers: [...this.sceneManager.layers] });
      this.sceneManager.clear();
    }

    scenes.forEach(({ data: sceneData, layers }, idx) => {
      // Add layers to stage before animation
      master.add(() => {
        console.log(`Scene ${idx + 1} start`);
        this.sceneManager.layers = layers;
        layers.forEach(layer => this.sceneManager.app.stage.addChild(layer));
      });

      // Pass layers explicitly!
      const tl = this._buildSceneTimeline(sceneData, layers);
      master.add(tl);

      // Remove layers from stage after animation
      master.add(() => {
        layers.forEach(layer => this.sceneManager.app.stage.removeChild(layer));
        this.sceneManager.layers = [];
        console.log(`Scene ${idx + 1} end`);
      });
    });

    master.eventCallback('onComplete', () => {
      console.log('Timeline finished');
    });

    return master;
  }

  _buildSceneTimeline(sceneData, layers) {
    const tl = gsap.timeline();

    // Guard: pastikan layers valid dan tidak kosong
    if (!layers || !layers.length) {
      console.warn('No layers to animate for scene:', sceneData);
      return tl;
    }

    // Transition In
    if (sceneData.transitionIn && sceneData.transitionIn.duration) {
      tl.from(layers, {
        alpha: 0,
        duration: sceneData.transitionIn.duration,
        stagger: 0
      });
    }

    // Layer Animations
    sceneData.layers.forEach((layerData, index) => {
      const layer = layers[index];
      if (!layer) return; // Guard if index mismatch
      parseProps(layer, layerData.props);

      // keep track of the running time for this layer so that
      // animations without an explicit `at` value chain sequentially
      let currentTime = 0;

      (layerData.animations || []).forEach(anim => {
        // determine where this animation should start: use the
        // provided `at` if present, otherwise fall back to currentTime
        const position = typeof anim.at === 'number' ? anim.at : currentTime;

        if (anim.type) {
          const effect = EffectRegistry.effects[anim.type];
          if (effect) {
            const tween = effect(
              layer,
              anim.params || {},
              { paused: true, ...(anim.options || {}) }
            );
            if (tween) {
              // add the effect tween at the resolved position
              tl.add(tween, position);
              // advance the current time for sequencing
              currentTime = position + tween.duration();
            }
          }
        } else {
          tl.to(
            layer,
            { ...anim.to, duration: anim.duration, ease: anim.easing },
            position
          );
          // update the running time based on this animation's duration
          currentTime = position + (anim.duration || 0);
        }
      });
    });

    // Transition Out
    if (sceneData.transitionOut && sceneData.transitionOut.duration) {
      tl.to(layers, {
        alpha: 0,
        duration: sceneData.transitionOut.duration,
        stagger: 0
      }, sceneData.duration - sceneData.transitionOut.duration);
    }

    // Hold for scene duration
    //tl.to({}, { duration: sceneData.duration });
    
    // Hold so the scene lasts at least the specified duration
    const holdDuration = Math.max(sceneData.duration - tl.duration(), 0);
    console.log(holdDuration, sceneData.duration, tl.duration());
    if (holdDuration > 0) {
      tl.to({}, { duration: holdDuration });
    }

    return tl;
  }
}
