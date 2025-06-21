import { gsap } from 'gsap';
import { BlurFilter } from 'pixi.js';

export default function blur(target, params = {}, options = {}) {
  const {
    from = 0,
    to = 8,
    duration = 1,
    removeAfter = false
  } = params;

  // Gunakan options object, bukan angka!
  const filter = new BlurFilter({ strength: from });

  // Tambahkan filter tanpa mutasi array "frozen"
  target.filters = [ ...(target.filters || []), filter ];

  // console.log("blur", target);

  return gsap.to(filter, {
    strength: to, // PixiJS v8+: gunakan 'strength', bukan 'blur'
    duration,
    ...options,
    onComplete: () => {
      if (removeAfter) {
        target.filters = (target.filters || []).filter(f => f !== filter);
      }
      if (typeof options.onComplete === "function") options.onComplete();
    }
  });
}
