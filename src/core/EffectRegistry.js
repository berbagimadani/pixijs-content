export default class EffectRegistry {
  static effects = {};

  static register(name, handler) {
    this.effects[name] = handler;
  }
}
