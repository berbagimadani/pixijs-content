import { gsap } from 'gsap';

export default function fadeInOut(target, params = {}, options = {}) {
  const { duration = 1 } = params;
  gsap.fromTo(target, { alpha: 0 }, { alpha: 1, duration: duration / 2, ...options })
    .to(target, { alpha: 0, duration: duration / 2 });
}
