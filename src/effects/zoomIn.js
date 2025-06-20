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

  return gsap.fromTo(
    target,
    { scale: from, alpha: alphaFrom },
    { scale: to, alpha: alphaTo, duration, ease, ...options }
  );
}
