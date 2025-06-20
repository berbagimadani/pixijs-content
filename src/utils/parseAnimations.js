import { gsap } from 'gsap';

export default function parseAnimations(target, animations = [], effects = {}) {
  animations.forEach(anim => {
    const { type, params, options } = anim;
    if (effects[type]) {
      effects[type](target, params, options);
    } else {
      gsap.to(target, { ...params, ...options });
    }
  });
}
