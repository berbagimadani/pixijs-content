import * as PIXI from 'pixi.js';
import { parseProps } from '../utils/index.js';

export default class LayerFactory {
  static create(data, app) {
    let layer;
    switch (data.type) {
      case 'text':
        layer = new PIXI.Text(data.text || '', data.style || {});
        break;
      case 'sprite':
        layer = PIXI.Sprite.from(data.texture);
        break;
      default:
        layer = new PIXI.Container();
    }

    parseProps(layer, data.props);
    return layer;
  }
}
