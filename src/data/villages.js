// Page data (detail card + list). Map coordinates alag file (mapData.js) mein hain.
export const G = {
  c: ["केंद्र", "#12303d"],
  s: ["दक्षिण", "#d3202a"],
  n: ["उत्तर / उत्तर-पूर्व", "#2f6fe0"],
  w: ["पश्चिम", "#2f9e44"],
};

export const V = [
  { id: "magtora", n: "Magtora (Main)", g: "c", d: 0, a: 0, s: "गाँव की सड़क (मुख्य सड़क से जुड़ी)", st: ["मगटोरा शाखा डाकघर पूरे नेटवर्क का केंद्र-बिंदु है", "जलालाबाद रोड से एक छोटी सड़क पूर्व की ओर डाकघर तक जाती है"] },
  { id: "kudra", n: "Kudra", g: "s", d: 1.3, a: 0, s: "मुख्य पक्की सड़क", st: ["मगटोरा से जलालाबाद रोड पर सीधे दक्षिण चलें", "1.3 km पर Kudra मुख्य सड़क पर ही आता है"] },
  { id: "bhulbhulaganj", n: "Bhulbhulaganj", g: "s", d: 2.0, a: 1, s: "पतली पक्की branch सड़क", st: ["Kudra से थोड़ा आगे बढ़ें", "मगटोरा से आते हुए दायीं ओर की सड़क लें", "यह सीधे Bhulbhulaganj को जोड़ती है (Kudra से ~0.7 km)"] },
  { id: "jatav-gautiya", n: "Jatav Gautiya", g: "s", d: null, a: 0, s: "पतली पक्की सड़क", st: ["Kudra से सीधे आगे चलें", "Faridapur से 300 m पहले दायीं ओर पतली पक्की सड़क जाती है", "यह Jatav Gautiya को जोड़ती है (नोटबुक: Kudra से ~1 km)"] },
  { id: "faridapur", n: "Faridapur", g: "s", d: 2.6, a: 0, s: "मुख्य पक्की सड़क", st: ["Kudra से सीधे जलालाबाद रोड पर चलते रहें", "Kudra से 1.3 km आगे Faridapur आता है"] },
  { id: "kahar-gautiya", n: "Kahar Gautiya", g: "s", d: 3.6, a: 1, s: "पतली पक्की सड़क", st: ["Faridapur में घुसते ही थोड़ा आगे शराब का ठेका मिलेगा", "ठेके से ~10 कदम आगे दायीं ओर सड़क मुड़ती है", "रास्ते में मंदिर पड़ता है; सड़क पक्की है", "Faridapur से ~1 km पर Kahar Gautiya"] },
  { id: "umarpur", n: "Umarpur", g: "s", d: 4.6, a: 1, s: "Kahar Gautiya से आगे की branch", st: ["ऊपर बताए अनुसार Kahar Gautiya पहुँचें", "Kahar Gautiya से आगे उसी रास्ते पर Umarpur पड़ता है (~1 km)"] },
  { id: "maghreta", n: "Maghreta", g: "n", d: 0.8, a: 0, s: "पतली पक्की लेन", st: ["Maghreta के लिए सिर्फ़ एक पतली पक्की सड़क है", "पहले स्कूल आता है", "स्कूल से लगा हुआ ही गाँव है"] },
  { id: "kona-yakubpur", n: "Kona Yakubpur", g: "n", d: 2.9, a: 0, s: "कच्चा / मिट्टी का रास्ता", st: ["मुख्य सड़क तक पहुँचने से पहले ही मुड़ना है", "आगे का रास्ता कच्चा, मिट्टी वाला है"] },
  { id: "rapra", n: "Rapra", g: "w", d: 0.95, a: 0, s: "कच्चा रास्ता + पतली पक्की सड़क", st: ["पहले कच्चा रास्ता", "फिर एक पतली पक्की सड़क बनी है जो Rapra को जोड़ती है"] },
  { id: "chachhuapur", n: "Chachhuapur", g: "w", d: 1.65, a: 1, s: "Rapra की तरफ़ से, मिश्रित रास्ता", st: ["Rapra की ओर से जाएँ", "Rapra से ~0.7 km आगे Chachhuapur"] },
];

// distance label: "1.3 km", "2.0 km*" (a = anumaanit), "अपुष्ट"
export const fd = (v) => (v.d === null ? "अपुष्ट" : v.d === 0 ? "0 km" : v.d + " km" + (v.a ? "*" : ""));

export const TABS = [["all", "सभी"], ["s", "दक्षिण"], ["n", "उत्तर"], ["w", "पश्चिम"]];
