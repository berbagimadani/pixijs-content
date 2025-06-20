import * as PIXI from 'pixi.js';
import SceneManager from './SceneManager.js';

export default class AppManager {
  constructor(options) {
    this.app = new PIXI.Application(options);
    this.sceneManager = new SceneManager(this.app);
  }

  get view() {
    return this.app.view;
  }

  loadTemplate(template) {
    this.sceneManager.loadScene(template);
  }
}
