import { gsap } from 'gsap';
import { BlurFilter } from 'pixi.js';

export default function blur(target, params = {}, options = {}) {
  const { strength = 8, duration = 1 } = params;
  if (!target.filters) target.filters = [];
  const filter = new BlurFilter(0);
  target.filters.push(filter);
  gsap.to(filter, { blur: strength, duration, yoyo: true, repeat: 1, ...options });
}
