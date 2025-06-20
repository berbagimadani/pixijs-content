export default function parseProps(target, props = {}) {
  Object.entries(props).forEach(([key, value]) => {
    if (typeof target[key] === 'object' && target[key] !== null) {
      Object.assign(target[key], value);
    } else if (key in target) {
      target[key] = value;
    }
  });
}
