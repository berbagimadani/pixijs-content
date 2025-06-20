import { gsap } from 'gsap';

export default function shake(target, params = {}, options = {}) {
  const { x = 10, y = 10, duration = 0.2, repeat = 5 } = params;
  return gsap.fromTo(
    target,
    { x: `-=${x}`, y: `-=${y}` },
    {
      x: `+=${x}`,
      y: `+=${y}`,
      duration,
      repeat,
      yoyo: true,
      ...options
    }
  );
}
