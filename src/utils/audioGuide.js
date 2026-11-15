const GUIDE_FILES = { welcome: "/audio/welcome.wav", calendar: "/audio/calendar.wav", complaint: "/audio/complaint.wav", links: "/audio/links.wav", village: "/audio/village.wav", magtora: "/audio/magtora.wav" };
let currentAudio = null;
const played = new Set();
let welcomed = false;
const audioCache = new Map();
let audioContext = null;

function resumeAudioOutput() {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume();
  } catch { /* Web Audio is optional; HTMLAudio fallback still works. */ }
}

// Page load ke waqt audio objects warm kar dete hain, taaki first click par network/decode delay kam ho.
Object.entries(GUIDE_FILES).forEach(([key, src]) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audioCache.set(key, audio);
  audio.load();
});

// Desktop browsers often keep a tab's media output locked until a real gesture.
// Unlock the output on the first gesture, without starting any guide early.
if (typeof window !== "undefined") {
  const unlock = () => { resumeAudioOutput(); window.removeEventListener("pointerdown", unlock, true); window.removeEventListener("keydown", unlock, true); };
  window.addEventListener("pointerdown", unlock, true);
  window.addEventListener("keydown", unlock, true);
}

export function playGuide(key, { once = true } = {}) {
  if (once && played.has(key)) return;
  const src = GUIDE_FILES[key]; if (!src) return;
  resumeAudioOutput();
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
  const audio = new Audio(src); audio.volume = 0.86; audio.preload = "auto"; currentAudio = audio;
  audio.play().then(() => played.add(key)).catch(() => {
    // A fresh element bypasses a stale preload failure seen in desktop Chrome/Edge.
    const retry = new Audio(src); retry.volume = 0.86; currentAudio = retry;
    retry.play().then(() => played.add(key)).catch(() => {});
  });
}
export function enableAudio() {
  resumeAudioOutput();
  if (!played.has("welcome")) {
    welcomed = true;
    playGuide("welcome");
  }
}
export function playContext(key) {
  if (played.has(key)) return;
  const play = (name) => new Promise((resolve) => {
    const src = GUIDE_FILES[name];
    if (!src) return resolve();
    resumeAudioOutput();
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    const audio = audioCache.get(name) || new Audio(src);
    audio.preload = "auto"; audio.volume = 0.86; audio.currentTime = 0; currentAudio = audio;
    audio.onended = resolve;
    audio.onerror = resolve;
    audio.play().catch(() => {
      const retry = new Audio(src); retry.preload = "auto"; retry.volume = 0.86; currentAudio = retry;
      retry.onended = resolve; retry.onerror = resolve; retry.play().catch(resolve);
    });
  });
  const start = welcomed ? Promise.resolve() : play("welcome").then(() => { welcomed = true; });
  start.then(() => { if (!played.has(key)) { play(key).then(() => played.add(key)); } });
}
export const guideFiles = GUIDE_FILES;
