// Office timing + weekly off (aapke app.js: 10:00–14:00 => 600–840 minutes)
export const TZ = "Asia/Kolkata";
export const OPEN_MIN = 10 * 60;       // 10:00 AM
export const CLOSE_MIN = 14 * 60;      // 2:00 PM
export const WEEKLY_OFF = [0];         // 0 = Sunday. Saturday bhi band ho toh [0, 6]
export const TIME_SYNC_EVERY_MS = 30 * 60 * 1000;
