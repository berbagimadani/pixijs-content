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

  loadScene(data) {
    this.clear();
    data.layers.forEach(layerData => {
      const layer = LayerFactory.create(layerData, this.app);
      this.app.stage.addChild(layer);
      parseAnimations(layer, layerData.animations, EffectRegistry.effects);
      this.layers.push(layer);
    });
  }
}
