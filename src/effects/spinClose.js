import { gsap } from 'gsap';

export default function spinClose(target, params = {}, options = {}) {
  const {
    rotation = 180,
    to = 0,
    duration = 0.5,
    ease = 'power2.in'
  } = params;

  const tl = gsap.timeline();
  tl.to(target, { rotation, duration, ease, ...options }, 0);
  tl.to(target.scale, { x: to, y: to, duration, ease, ...options }, 0);
  tl.to(target, { alpha: 0, duration, ease, ...options }, 0);
  return tl;
}
