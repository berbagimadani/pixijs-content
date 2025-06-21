import { gsap } from 'gsap';

export default function flicker(target, params = {}, options = {}) {
  const {
    duration = 1,
    repeat = 5,
    alphaFrom = 1,
    alphaTo = 0.2,
    frequency = 0.1 // waktu antara nyala-mati (detik)
  } = params;

  // Total repeat otomatis jika tidak di-set
  const flickerCount = repeat * 2 || Math.floor(duration / frequency);

  const tl = gsap.timeline(options);

  for (let i = 0; i < flickerCount; i++) {
    tl.to(target, {
      alpha: i % 2 === 0 ? alphaTo : alphaFrom,
      duration: frequency,
      overwrite: false
    }, i * frequency);
  }
  // Pastikan alpha balik normal di akhir
  tl.to(target, { alpha: alphaFrom }, flickerCount * frequency);

  return tl;
}
