import { Application } from 'pixi.js';
import SceneManager from './SceneManager.js';
import TimelineFactory from './TimelineFactory.js';

export default class AppManager {
  constructor(app, sceneManager, timelineFactory) {
    this.app = app;
    this.sceneManager = sceneManager;
    this.timelineFactory = timelineFactory;
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
    const timelineFactory = new TimelineFactory(sceneManager);

    return new AppManager(app, sceneManager, timelineFactory);
  }
  
  get view() {
    return this.app.canvas;
  }

  async loadTemplate(template) {
    await this.sceneManager.loadScene(template);
  }

  async loadTimeline(timelineData) {
    return this.timelineFactory.create(timelineData);
  }
}
