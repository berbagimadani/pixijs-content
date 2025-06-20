import LayerFactory from './LayerFactory.js';
import { parseProps, parseAnimations } from '../utils/index.js';
import EffectRegistry from './EffectRegistry.js';

export default class SceneManager {
  constructor(app) {
    this.app = app;
    this.layers = [];
  }

  clear() {
    this.layers.forEach(layer => this.app.stage.removeChild(layer));
    this.layers = [];
  }

  async loadScene(data) {
    this.clear();
    for (const layerData of data.layers) {
      const layer = await LayerFactory.create(layerData, this.app);
      this.app.stage.addChild(layer);
      if (Array.isArray(layerData.animations) && layerData.animations.length && layerData.animations[0].type) {
        parseAnimations(layer, layerData.animations, EffectRegistry.effects);
      }
      this.layers.push(layer);
    }
  }
}
