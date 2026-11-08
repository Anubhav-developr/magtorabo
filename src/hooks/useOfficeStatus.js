import { OPEN_MIN, CLOSE_MIN, WEEKLY_OFF } from "../data/officeConfig.js";
import { holidayOn } from "../data/holidays.js";
import { ymdOf } from "./useIndiaTime.js";

const pad = (n) => String(n).padStart(2, "0");
const addDays = (y, m, d, n) => { const t = new Date(Date.UTC(y, m - 1, d + n)); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate(), dow: t.getUTCDay() }; };

export const isWorkingDay = (y, m, d, dow) => !WEEKLY_OFF.includes(dow) && !holidayOn(ymdOf(y, m, d));

/** status: open | before | after | holiday | sunday  (+ next opening day) */
export function getOfficeStatus(ist) {
  const hol = holidayOn(ist.ymd);
  const off = WEEKLY_OFF.includes(ist.dow);
  let status;
  if (hol) status = "holiday";
  else if (off) status = "sunday";
  else if (ist.minutes < OPEN_MIN) status = "before";
  else if (ist.minutes < CLOSE_MIN) status = "open";
  else status = "after";

  // agla khulne ka din
  let next = null;
  const startOffset = status === "before" ? 0 : 1;
  for (let i = startOffset; i < 60; i++) {
    const c = addDays(ist.y, ist.m, ist.d, i);
    if (isWorkingDay(c.y, c.m, c.d, c.dow)) { next = { ...c, today: i === 0, ymd: `${c.y}-${pad(c.m)}-${pad(c.d)}` }; break; }
  }
  return { status, holiday: hol, isOpen: status === "open", next };
}

// aane wale holidays (Sunday par padne wale bhi, flag ke saath)
export function upcomingHolidays(ist, days = 120, limit = 5) {
  const out = [];
  for (let i = 0; i <= days && out.length < limit; i++) {
    const c = addDays(ist.y, ist.m, ist.d, i);
    const h = holidayOn(ymdOf(c.y, c.m, c.d));
    if (h) out.push({ ...c, ymd: ymdOf(c.y, c.m, c.d), name: h, onSunday: c.dow === 0 });
  }
  return out;
}
