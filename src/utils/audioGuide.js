const GUIDE_FILES = { welcome: "/audio/welcome.wav", calendar: "/audio/calendar.wav", complaint: "/audio/complaint.wav", links: "/audio/links.wav", village: "/audio/village.wav", magtora: "/audio/magtora.wav" };
let currentAudio = null;
const played = new Set();
let welcomed = false;
const audioCache = new Map();

// Page load ke waqt audio objects warm kar dete hain, taaki first click par network/decode delay kam ho.
Object.entries(GUIDE_FILES).forEach(([key, src]) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audioCache.set(key, audio);
  audio.load();
});
export function playGuide(key, { once = true } = {}) {
  if (once && played.has(key)) return;
  const src = GUIDE_FILES[key]; if (!src) return;
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
  const audio = new Audio(src); audio.volume = 0.86; currentAudio = audio;
  audio.play().then(() => played.add(key)).catch(() => {});
}
export function playContext(key) {
  if (played.has(key)) return;
  const play = (name) => new Promise((resolve) => {
    const src = GUIDE_FILES[name];
    if (!src) return resolve();
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    const audio = audioCache.get(name) || new Audio(src);
    audio.preload = "auto"; audio.volume = 0.86; audio.currentTime = 0; currentAudio = audio;
    audio.onended = resolve;
    audio.onerror = resolve;
    audio.play().catch(resolve);
  });
  const start = welcomed ? Promise.resolve() : play("welcome").then(() => { welcomed = true; });
  start.then(() => { if (!played.has(key)) { play(key).then(() => played.add(key)); } });
}
export const guideFiles = GUIDE_FILES;
