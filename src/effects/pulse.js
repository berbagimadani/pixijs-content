import { gsap } from 'gsap';

export default function pulse(target, params = {}, options = {}) {
  const {
    from = 1,
    to = 1.2,
    duration = 1,
    repeat = 2,
    ease = "power1.inOut"
  } = params;

  const tl = gsap.timeline(options);

  // Atur scale awal
  if (target.scale && target.scale.set) target.scale.set(from, from);

  for (let i = 0; i < repeat; i++) {
    tl.to(target.scale, { x: to, y: to, duration: duration/2, ease }, "+=0");
    tl.to(target.scale, { x: from, y: from, duration: duration/2, ease }, "+=0");
  }
  return tl;
}
