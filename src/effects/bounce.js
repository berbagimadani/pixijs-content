import { gsap } from 'gsap';

export default function bounce(target, params = {}, options = {}) {
  const { from = 0.5, to = 1, duration = 1 } = params;
  gsap.fromTo(target.scale, { x: from, y: from }, {
    x: to, y: to,
    ease: 'elastic.out(1, 0.3)',
    duration,
    ...options
  });
}
