const GUIDE_FILES = { welcome: "/audio/welcome.wav", calendar: "/audio/calendar.wav", complaint: "/audio/complaint.wav", links: "/audio/links.wav", village: "/audio/village.wav", magtora: "/audio/magtora.wav" };
let currentAudio = null;
const played = new Set();
export function playGuide(key, { once = true } = {}) {
  if (once && played.has(key)) return;
  const src = GUIDE_FILES[key]; if (!src) return;
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
  const audio = new Audio(src); audio.volume = 0.86; currentAudio = audio;
  audio.play().then(() => played.add(key)).catch(() => {});
}
export const guideFiles = GUIDE_FILES;
