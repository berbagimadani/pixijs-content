import { gsap } from 'gsap';

export default function spinClose(target, params = {}, options = {}) {
  const {
    rotation = 180,
    to = 0,
    duration = 0.5,
    ease = 'power2.in'
  } = params;

  return gsap.to(target, {
    rotation,
    scale: to,
    alpha: 0,
    duration,
    ease,
    ...options
  });
}
