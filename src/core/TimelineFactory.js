import { gsap } from 'gsap';
import { parseProps } from '../utils/index.js';

export default class TimelineFactory {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
  }

  async create(data) {
    const master = gsap.timeline();

    // preload all scene layers but keep them off stage
    const scenes = [];
    for (const scene of data.scenes) {
      await this.sceneManager.loadScene(scene);
      // Clone the layers for each scene
      scenes.push({ data: scene, layers: [...this.sceneManager.layers] });
      this.sceneManager.clear();
    }

    for (const { data: sceneData, layers } of scenes) {
      // Add layers to stage before animation
      master.add(() => {
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
      });
    }

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
      (layerData.animations || []).forEach(anim => {
        tl.to(layer, { ...anim.to, duration: anim.duration, ease: anim.easing }, anim.at);
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
    if (holdDuration > 0) {
      tl.to({}, { duration: holdDuration });
    }

    return tl;
  }
}
