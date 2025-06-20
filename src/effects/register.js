import EffectRegistry from '../core/EffectRegistry.js';
import effects from './index.js';

export default function registerEffects() {
  Object.entries(effects).forEach(([name, handler]) => {
    EffectRegistry.register(name, handler);
  });
}
