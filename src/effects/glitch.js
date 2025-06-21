import { gsap } from 'gsap';

export default function glitch(target, params = {}, options = {}) {
  const {
    amount = 18,
    times = 16,
    duration = 1,
    alphaMin = 0.5,
    alphaMax = 1
  } = params;

  const tl = gsap.timeline(options);
  const frameDuration = duration / times;
  const original = {
    x: target.x,
    y: target.y,
    skewX: target.skew && target.skew.x ? target.skew.x : 0,
    skewY: target.skew && target.skew.y ? target.skew.y : 0,
    alpha: target.alpha,
  };

  for (let i = 0; i < times; i++) {
    tl.add(() => {
      // Acak property
      target.x = original.x + (Math.random() - 0.5) * amount;
      target.y = original.y + (Math.random() - 0.5) * amount * 0.5;
      target.alpha = alphaMin + Math.random() * (alphaMax - alphaMin);
      // Untuk PixiJS 6+, bisa coba juga:
      if (target.skew) {
        target.skew.x = (Math.random() - 0.5) * 0.4;
        target.skew.y = (Math.random() - 0.5) * 0.4;
      }
    }, i * frameDuration);
  }
  // Reset semua property ke nilai awal
  tl.add(() => {
    target.x = original.x;
    target.y = original.y;
    target.alpha = original.alpha;
    if (target.skew) {
      target.skew.x = original.skewX;
      target.skew.y = original.skewY;
    }
  }, duration);

  return tl;
}
