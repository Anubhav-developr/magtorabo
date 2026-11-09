/**
 * Holiday data — data-driven rakha hai taaki aap official list se aasaani se update kar sako.
 *
 * ⚠️ Sirf wahi dates daali hain jo pakki hain. Baaki (Holi, Eid, Ram Navami, Muharram, Janmashtami,
 *    Milad-un-Nabi, Mahavir Jayanti, Buddha Purnima, Good Friday ...) ki dates DoP/DoPT ki official
 *    gazetted list (OM) se milakar `DATED` mein jodo. UP ke local / optional holiday bhi yahin jod sakte ho.
 */
// Har saal repeat hone wale (MM-DD)
export const FIXED = {
  "01-26": { hi: "गणतंत्र दिवस", en: "Republic Day" },
  "08-15": { hi: "स्वतंत्रता दिवस", en: "Independence Day" },
  "10-02": { hi: "गांधी जयंती", en: "Gandhi Jayanti" },
  "12-25": { hi: "क्रिसमस", en: "Christmas" },
};

// Saal-specific (YYYY-MM-DD) — yahan aur jodo
export const DATED = {
  "2026-03-21": { hi: "ईद-उल-फितर", en: "Id-ul-Fitr" },
  "2026-03-31": { hi: "महावीर जयंती", en: "Mahavir Jayanti" },
  "2026-04-03": { hi: "गुड फ्राइडे", en: "Good Friday" },
  "2026-05-01": { hi: "बुद्ध पूर्णिमा", en: "Buddha Purnima" },
  "2026-05-27": { hi: "ईद-उल-जुहा", en: "Id-ul-Zuha" },
  "2026-06-26": { hi: "मुहर्रम", en: "Muharram" },
  "2026-08-26": { hi: "ईद-ए-मिलाद", en: "Prophet Mohammad's Birthday" },
  "2026-10-20": { hi: "दशहरा", en: "Dussehra" },
  "2026-11-08": { hi: "दीपावली", en: "Diwali" },
  "2026-11-24": { hi: "गुरु नानक जयंती", en: "Guru Nanak Jayanti" },
  "2027-03-10": { hi: "ईद-उल-फितर", en: "Eid-ul-Fitr" },
  "2027-03-22": { hi: "होली", en: "Holi" },
  "2027-03-26": { hi: "गुड फ्राइडे", en: "Good Friday" },
  "2027-04-19": { hi: "महावीर जयंती", en: "Mahavir Jayanti" },
  "2027-05-17": { hi: "बकरीद", en: "Bakri Id / Eid ul-Adha" },
  "2027-05-20": { hi: "बुद्ध पूर्णिमा", en: "Buddha Purnima" },
  "2027-06-15": { hi: "मुहर्रम", en: "Muharram" },
  "2027-08-15": { hi: "स्वतंत्रता दिवस और ईद-ए-मिलाद", en: "Independence Day and Milad un Nabi" },
  "2027-10-10": { hi: "दशहरा", en: "Dussehra" },
  "2027-10-29": { hi: "दीपावली", en: "Diwali" },
  "2027-11-14": { hi: "गुरु नानक जयंती", en: "Guru Nanak's Birthday" },
};

export const holidayOn = (ymd) => DATED[ymd] || FIXED[ymd.slice(5)] || null;
