import { useEffect, useState } from "react";
import { TZ, TIME_SYNC_EVERY_MS } from "../data/officeConfig.js";

const pad = (n) => String(n).padStart(2, "0");
const DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "short", hour12: false });

/** epoch ms -> IST parts (device timezone se independent) */
export function toIST(ms) {
  const p = Object.fromEntries(fmt.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  const hh = +p.hour % 24, mm = +p.minute;
  return { y: +p.year, m: +p.month, d: +p.day, hh, mm, ss: +p.second, dow: DOW[p.weekday], minutes: hh * 60 + mm, ymd: `${p.year}-${p.month}-${p.day}` };
}
export const ymdOf = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

/**
 * Time sync: same-origin HEAD request ke `Date` header se server time leta hai,
 * device clock ka offset nikaalta hai. Fail ho toh device clock (state="device").
 * state: "syncing" | "synced" | "device"
 */
export function useIndiaTime() {
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState("syncing");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let dead = false;
    async function sync() {
      try {
        const t0 = Date.now();
        const r = await fetch(location.href.split("#")[0], { method: "HEAD", cache: "no-store" });
        const t1 = Date.now();
        const d = r.headers.get("date");
        if (!d) throw new Error("no date header");
        if (!dead) { setOffset(new Date(d).getTime() - (t0 + t1) / 2); setState("synced"); }
      } catch (e) {
        if (!dead) { setOffset(0); setState("device"); }
      }
    }
    sync();
    const iv = setInterval(sync, TIME_SYNC_EVERY_MS);
    return () => { dead = true; clearInterval(iv); };
  }, []);

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const ms = now + offset;
  return { ms, ist: toIST(ms), state };
}
