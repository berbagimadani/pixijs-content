import { gsap } from 'gsap';
import { parseProps } from '../utils/index.js';

export default class TimelineFactory {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
  }

  async create(data) {
    const master = gsap.timeline();
    for (const scene of data.scenes) {
      await this.sceneManager.loadScene(scene);
      const tl = this._buildSceneTimeline(scene);
      master.add(tl);
      master.add(() => this.sceneManager.clear());
    }
    return master;
  }

  _buildSceneTimeline(sceneData) {
    const tl = gsap.timeline();
    if (sceneData.transitionIn && sceneData.transitionIn.duration) {
      tl.from(this.sceneManager.layers, {
        alpha: 0,
        duration: sceneData.transitionIn.duration,
        stagger: 0
      });
    }

    sceneData.layers.forEach((layerData, index) => {
      const layer = this.sceneManager.layers[index];
      parseProps(layer, layerData.props);
      (layerData.animations || []).forEach(anim => {
        tl.to(layer, { ...anim.to, duration: anim.duration, ease: anim.easing }, anim.at);
      });
    });

    if (sceneData.transitionOut && sceneData.transitionOut.duration) {
      tl.to(this.sceneManager.layers, {
        alpha: 0,
        duration: sceneData.transitionOut.duration,
        stagger: 0
      }, sceneData.duration - sceneData.transitionOut.duration);
    }

    tl.to({}, { duration: sceneData.duration });
    return tl;
  }
}
