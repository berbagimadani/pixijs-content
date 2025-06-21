import { gsap } from 'gsap';

export default function typewriter(target, params = {}, options = {}) {
  const {
    duration = 2,
    delay = 0,
    text // opsional, fallback ke target.text
  } = params;

  // Pastikan text awalnya kosong dan alpha 1
  const fullText = text !== undefined ? text : (target.text || "");
  target.text = "";
  target.alpha = 1;

  const charCount = fullText.length;
  const charDuration = duration / (charCount || 1);

  const tl = gsap.timeline(options);

  for (let i = 1; i <= charCount; i++) {
    tl.add(() => {
    // console.log('typewriter step', i, target.text)

      target.text = fullText.slice(0, i);
    }, delay + (i - 1) * charDuration);
  }

  return tl;
}
