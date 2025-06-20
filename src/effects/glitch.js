import { gsap } from 'gsap';

export default function glitch(target, params = {}, options = {}) {
  const { amount = 5, duration = 0.1, repeat = 20 } = params;
  return gsap.to(target, {
    pixi: { skewX: () => (Math.random() - 0.5) * amount },
    repeat,
    yoyo: true,
    duration,
    ...options
  });
}
