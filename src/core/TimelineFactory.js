import { gsap } from 'gsap';
import { parsePropsResponsive, computeResponsiveProps } from '../utils/index.js';
import EffectRegistry from './EffectRegistry.js';

// Pastikan ini dijalankan setelah ketiga script di atas dimuat!

gsap.registerPlugin(PixiPlugin);

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
      }, 0);
    }

    // Cari waktu selesai animasi terlama (agar transitionOut bisa tepat di akhir)
    let maxAnimTime = 0;

    (sceneData.layers || []).forEach((layerData, index) => {
      const layer = layers[index];
      if (!layer) return;
      parsePropsResponsive(
        layer,
        layerData.props,
        this.sceneManager.app.baseWidth || this.sceneManager.app.renderer.width,
        this.sceneManager.app.baseHeight || this.sceneManager.app.renderer.height
      );

      (layerData.animations || []).forEach(anim => {
        // Penentuan waktu mulai animasi: gunakan anim.at jika ada, jika tidak default 0 (paralel)
        const at = typeof anim.at === 'number' ? anim.at : 0;

        if (anim.group && Array.isArray(anim.group)) {
          anim.group.forEach(subAnim => {
            // Panggil handler effect, seperti anim biasa
            const subAt = typeof subAnim.at === 'number' ? at + subAnim.at : at;
            // ... lanjutkan seperti handler biasa
            // Misal:
            if (subAnim.type && EffectRegistry.effects[subAnim.type]) {
              const tween = EffectRegistry.effects[subAnim.type](layer, subAnim.params || {}, subAnim.options || {});
              if (tween) tl.add(tween, subAt);
            } else if (subAnim.to) {
              tl.to(layer, { ...subAnim.to, duration: subAnim.duration, ease: subAnim.easing }, subAt);
            }
          });
        } else {

          // Ambil durasi dari parameter (params), atau duration langsung (untuk tween manual)
          let effectDuration = anim.duration || 0;
          if (anim.params && anim.params.duration) effectDuration = anim.params.duration;
          if (anim.options && anim.options.delay) effectDuration += anim.options.delay;

          const animEnd = at + effectDuration;
          if (animEnd > maxAnimTime) maxAnimTime = animEnd;

          if (anim.type) {
            const effect = EffectRegistry.effects[anim.type];
            if (effect) {
              const tween = effect(
                layer,
                anim.params || {},
                { ...(anim.options || {}) }
              );
              if (tween) tl.add(tween, at);
            }
          } else {
            const toProps = computeResponsiveProps(
              anim.to || {},
              this.sceneManager.app.baseWidth || this.sceneManager.app.renderer.width,
              this.sceneManager.app.baseHeight || this.sceneManager.app.renderer.height
            );
            tl.to(
              layer,
              { ...toProps, duration: effectDuration, ease: anim.easing },
              at
            );
          }

        }

      });
    });

    // Transition Out (letakkan di akhir semua animasi)
    if (sceneData.transitionOut && sceneData.transitionOut.duration) {
      tl.to(
        layers,
        {
          alpha: 0,
          duration: sceneData.transitionOut.duration,
          stagger: 0
        },
        maxAnimTime
      );
      maxAnimTime += sceneData.transitionOut.duration;
    }

    //console.log(`Scene will end at ${maxAnimTime} seconds`);

    // TIDAK PERLU holdDuration dummy!
    return tl;
  } 
}
