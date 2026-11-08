// Map block data — magtora-map-block.html (aapka edited version) se as-is.
export const BASE = { w: 800, h: 720 };
export const MIN_W = 140;
export const MAX_W = 800;
export const CITY = "Shahjahanpur, Uttar Pradesh";

export const DEFAULT_VILLAGES = [
  { id: "magtora", n: "Magtora", x: 550, y: 300, r: ["spur"] },
  { id: "kudra", n: "Kudra", x: 400, y: 450, r: ["main"] },
  { id: "bhulbhulaganj", n: "Bhulbhulaganj", x: 246, y: 486, r: ["main", "bhul"] },
  { id: "jatav-gautiya", n: "Jatav Gautiya", x: 262, y: 578, r: ["main", "jatav"] },
  { id: "faridapur", n: "Faridapur", x: 400, y: 610, r: ["main"] },
  { id: "kahar-gautiya", n: "Kahar Gautiya", x: 206, y: 648, r: ["main", "kahar"] },
  { id: "umarpur", n: "Umarpur", x: 114, y: 560, r: ["main", "kahar", "umar"] },
  { id: "maghreta", n: "Maghreta", x: 560, y: 108, r: ["main", "lane"] },
  { id: "kona-yakubpur", n: "Kona Yakubpur", x: 718, y: 104, r: ["main", "kona"] },
  { id: "rapra", n: "Rapra", x: 232, y: 356, r: ["main", "rdirt", "rpaved"] },
  { id: "chachhuapur", n: "Chachhuapur", x: 142, y: 278, r: ["main", "rdirt", "rpaved", "chach"] },
];

// near = kin gaon ke raste mein padta hai
export const DEFAULT_LANDMARKS = [
  { id: "school", n: "विद्यालय", ic: "🏫", x: 560, y: 145, near: ["maghreta"] },
  { id: "theka", n: "शराब का ठेका", ic: "🏪", x: 400, y: 628, near: ["faridapur", "kahar-gautiya", "umarpur"] },
  { id: "mandir", n: "मंदिर", ic: "🛕", x: 310, y: 664, near: ["kahar-gautiya", "umarpur"] },
];

// Google Maps "aas-paas" searches
export const NEARBY = [["school", "स्कूल"], ["temple", "मंदिर"], ["ATM", "ATM"], ["hospital", "अस्पताल"], ["petrol pump", "पेट्रोल पंप"], ["bank", "बैंक"], ["post office", "डाकघर"], ["medical store", "दवाई"]];

// SVG roads — id = data-r (highlight ke liye), id nahi = sirf decoration
export const ROADS = [
  { id: "main", cls: "main", d: "M400,700 L400,420 Q402,300 470,230 Q520,192 650,186" },
  { cls: "main", d: "M650,186 L760,235", opacity: 0.9 },
  { id: "spur", cls: "main", style: { strokeWidth: 10 }, d: "M401,372 L490,372" },
  { id: "lane", cls: "blue", d: "M560,196 L560,112" },
  { id: "kona", cls: "dirt", d: "M640,188 Q690,160 718,108" },
  { id: "rdirt", cls: "dirt", d: "M400,332 L318,332" },
  { id: "rpaved", cls: "green", d: "M318,332 Q260,348 232,356" },
  { id: "chach", cls: "green", d: "M232,356 Q165,350 150,300 L142,278" },
  { id: "bhul", cls: "red", d: "M400,492 Q320,496 246,486" },
  { id: "jatav", cls: "red", d: "M400,566 Q320,566 262,578" },
  { id: "kahar", cls: "red", d: "M400,640 Q340,662 270,652 L206,648" },
  { id: "umar", cls: "red", d: "M206,648 Q130,640 114,560" },
];
