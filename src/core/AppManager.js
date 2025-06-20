import { Application } from 'pixi.js';
import SceneManager from './SceneManager.js';

export default class AppManager {
  constructor(app, sceneManager) {
    this.app = app;
    this.sceneManager = sceneManager;
  }

  static async create(options = {}) {
    const app = new Application();
    await app.init({
      width: 1920,
      height: 1080,
      backgroundColor: 0x000000,
      antialias: true,
      preserveDrawingBuffer: true,
      ...options
    });

    const sceneManager = new SceneManager(app); 
    
    return new AppManager(app, sceneManager);
  }
  
  get view() {
    return this.app.canvas;
  }

  async loadTemplate(template) {
    await this.sceneManager.loadScene(template);
  }
}
