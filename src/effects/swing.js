import { gsap } from 'gsap';

export default function swing(target, params = {}, options = {}) {
  const {
    amplitude = 20, // derajat ayunan (+/-)
    duration = 2,
    repeat = 1
  } = params;

  // Simpel: rotasi bolak-balik dengan easing
  const tl = gsap.timeline(options);
  for (let i = 0; i < repeat; i++) {
    tl.to(target, { rotation: amplitude * Math.PI/180, duration: duration/4, ease: "sine.inOut" });
    tl.to(target, { rotation: -amplitude * Math.PI/180, duration: duration/2, ease: "sine.inOut" });
    tl.to(target, { rotation: 0, duration: duration/4, ease: "sine.inOut" });
  }
  return tl;
}
