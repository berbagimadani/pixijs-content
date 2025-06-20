import * as PIXI from 'pixi.js';
import { parseProps } from '../utils/index.js';

export default class LayerFactory {
  static async create(data, app) {
    let layer;
    switch (data.type) {
      case 'text':
        layer = new PIXI.Text(data.text || '', data.style || {});
        break;
      case 'sprite':
        await PIXI.Assets.load(data.texture);
        layer = PIXI.Sprite.from(data.texture);
        break;
      case 'image':
        await PIXI.Assets.load(data.src);
        layer = PIXI.Sprite.from(data.src);
        break;
      default:
        layer = new PIXI.Container();
    }

    parseProps(layer, data.props);
    return layer;
  }
}
