export function parsePropsResponsive(layer, props, stageWidth, stageHeight) {
  // Simpan originalProps untuk re-responsive saat resize
  if (!layer.originalProps) layer.originalProps = JSON.parse(JSON.stringify(props));

  for (const key in props) {
    let val = props[key];

    if (typeof val === "string" && val.endsWith("%")) {
      const num = parseFloat(val) / 100;
      if (key === "x") val = stageWidth * num;
      if (key === "y") val = stageHeight * num;
      if (key === "scale") val = num;
    }

    if (key === "scale" && layer.scale && layer.scale.set) {
      layer.scale.set(val, val);
      continue;
    }
    if (key === "anchor" && typeof val === "object" && layer.anchor && layer.anchor.set) {
      layer.anchor.set(
        val.x && typeof val.x === "string" && val.x.endsWith("%") ? parseFloat(val.x) / 100 : (val.x || 0),
        val.y && typeof val.y === "string" && val.y.endsWith("%") ? parseFloat(val.y) / 100 : (val.y || 0)
      );
      continue;
    }
    if (layer[key] !== undefined) layer[key] = val;
  }
}
