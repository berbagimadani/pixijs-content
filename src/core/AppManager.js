import { Application } from 'pixi.js';
import SceneManager from './SceneManager.js';
import TimelineFactory from './TimelineFactory.js';

export default class AppManager {
  constructor(app, sceneManager, timelineFactory, baseWidth, baseHeight) {
    this.app = app;
    this.sceneManager = sceneManager;
    this.timelineFactory = timelineFactory;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
  }

  static async create(options = {}) {
    const {
      width = 1920,
      height = 1080,
      responsive = false,
      ...rest
    } = options;

    const app = new Application();
    await app.init({
      width,
      height,
      backgroundColor: "#ccc",
      antialias: true,
      preserveDrawingBuffer: true,
      ...rest
    });

    const sceneManager = new SceneManager(app);
    const timelineFactory = new TimelineFactory(sceneManager);

    const manager = new AppManager(app, sceneManager, timelineFactory, width, height);

    if (responsive) manager.enableResponsive();

    return manager;
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

  enableResponsive() {
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.min(w / this.baseWidth, h / this.baseHeight);
      this.app.renderer.resize(w, h);
      this.app.stage.scale.set(scale);
    };

    window.addEventListener('resize', resize);
    resize();
  }
}
