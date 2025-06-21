export function computeResponsiveProps(props = {}, stageWidth, stageHeight) {
  const out = {};
  for (const key in props) {
    let val = props[key];

    if (typeof val === "string" && val.endsWith("%")) {
      const num = parseFloat(val) / 100;
      if (key === "x") val = stageWidth * num;
      if (key === "y") val = stageHeight * num;
      if (key === "scale") val = num;
    }

    if (key === "anchor" && typeof val === "object") {
      out[key] = {
        x:
          val.x && typeof val.x === "string" && val.x.endsWith("%")
            ? parseFloat(val.x) / 100
            : val.x,
        y:
          val.y && typeof val.y === "string" && val.y.endsWith("%")
            ? parseFloat(val.y) / 100
            : val.y
      };
      continue;
    }

    out[key] = val;
  }
  return out;
}

export function parsePropsResponsive(layer, props = {}, stageWidth, stageHeight) {
  if (!layer) return;
  // Simpan originalProps untuk re-responsive saat resize
  if (!layer.originalProps) layer.originalProps = JSON.parse(JSON.stringify(props));

  const converted = computeResponsiveProps(props, stageWidth, stageHeight);

  for (const key in converted) {
    const val = converted[key];

    if (key === "scale" && layer.scale && layer.scale.set) {
      layer.scale.set(val, val);
      continue;
    }
    if (key === "anchor" && typeof val === "object" && layer.anchor && layer.anchor.set) {
      layer.anchor.set(val.x || 0, val.y || 0);
      continue;
    }
    if (layer[key] !== undefined) layer[key] = val;
  }
}
