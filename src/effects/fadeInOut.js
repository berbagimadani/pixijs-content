import { gsap } from 'gsap';

export default function fadeInOut(target, params = {}, options = {}) {
  const { duration = 1 } = params;
  const tl = gsap.timeline(options);
  tl.fromTo(target, { alpha: 0 }, { alpha: 1, duration: duration / 2 })
    .to(target, { alpha: 0, duration: duration / 2 });
  return tl;
}
