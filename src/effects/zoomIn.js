import { gsap } from 'gsap';

export default function zoomIn(target, params = {}, options = {}) {
  const {
    from = 0,
    to = 1,
    alphaFrom = 0,
    alphaTo = 1,
    duration = 0.5,
    ease = 'power2.out'
  } = params;

  // Set scale awal benar
  if (target.scale && typeof target.scale.set === 'function') {
    target.scale.set(from, from);
  } else {
    // fallback, jarang terjadi di PixiJS modern
    target.scale = from;
  }
  target.alpha = alphaFrom;

  const tl = gsap.timeline();
  tl.to(target.scale, { x: to, y: to, duration, ease, ...options }, 0);
  tl.to(target, { alpha: alphaTo, duration, ease, ...options }, 0);
  return tl;
}
