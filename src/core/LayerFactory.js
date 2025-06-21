import * as PIXI from 'pixi.js';
import { parsePropsResponsive } from '../utils/index.js';

export default class LayerFactory {
  static async create(data, app) {
    let layer;
    switch (data.type) {
      case 'text':
        layer = new PIXI.Text({ text: data.text || '', style: data.style || {} });
        break; 
      case 'sprite':
        if (!data.texture) throw new Error('Sprite layer missing "texture" property!');
        await PIXI.Assets.load(data.texture);
        layer = PIXI.Sprite.from(data.texture);
        break;
      case 'image':
        if (!data.src) throw new Error('Image layer missing "src" property!');
        await PIXI.Assets.load(data.src);
        layer = PIXI.Sprite.from(data.src);
        break;

      default:
        layer = new PIXI.Container();
    }

    parsePropsResponsive(
      layer,
      data.props,
      app.baseWidth || app.renderer.width,
      app.baseHeight || app.renderer.height
    );
    return layer;
  }
}
