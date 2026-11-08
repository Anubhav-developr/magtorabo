import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../i18n/I18nProvider.jsx";
import { holidayOn } from "../data/holidays.js";
import { WEEKLY_OFF } from "../data/officeConfig.js";
import { ymdOf } from "../hooks/useIndiaTime.js";
import { upcomingHolidays } from "../hooks/useOfficeStatus.js";

const pad = (n) => String(n).padStart(2, "0");
const FOCUSABLE = 'button,[href],input,[tabindex]:not([tabindex="-1"])';

/**
 * Calendar popup (modal).
 * Props: open, onClose, ist (useIndiaTime().ist)
 * Esc / bahar click / ✕ se band hota hai; background scroll lock; focus trap; band hone par focus wapas.
 */
export default function HolidayCalendar({ open, onClose, ist }) {
  const { t, lang, locale } = useI18n();
  const [cur, setCur] = useState({ y: ist.y, m: ist.m }); // m: 1-12
  const [picked, setPicked] = useState(ist.ymd);
  const dlg = useRef(null), lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    setCur({ y: ist.y, m: ist.m }); setPicked(ist.ymd);       // har baar aaj se shuru
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab" && dlg.current) {                     // focus trap
        const f = [...dlg.current.querySelectorAll(FOCUSABLE)].filter((x) => !x.disabled);
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const id = setTimeout(() => dlg.current && dlg.current.focus(), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const first = new Date(Date.UTC(cur.y, cur.m - 1, 1)).getUTCDay();
  const dim = new Date(Date.UTC(cur.y, cur.m, 0)).getUTCDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];
  const fmt = (o, ms) => new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...o }).format(ms);
  const monthName = fmt({ month: "long" }, Date.UTC(cur.y, cur.m - 1, 1));
  const wd = Array.from({ length: 7 }, (_, i) => fmt({ weekday: "short" }, Date.UTC(2023, 0, 1 + i))); // 2023-01-01 = Sunday
  const move = (n) => setCur(({ y, m }) => { const d = new Date(Date.UTC(y, m - 1 + n, 1)); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 }; });

  const [py, pm, pd] = picked.split("-").map(Number);
  const pDow = new Date(Date.UTC(py, pm - 1, pd)).getUTCDay();
  const pHol = holidayOn(picked), pOff = WEEKLY_OFF.includes(pDow);
  const kind = pHol ? "hol" : pOff ? "off" : "work";
  const kindText = pHol ? `🎉 ${pHol[lang]} — ${t("closedDay")}` : pOff ? `🚫 ${t("statusSunday")}` : `✅ ${t("workDay")}`;
  const up = upcomingHolidays(ist);

  return createPortal(
    <div className="cal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cal-modal" role="dialog" aria-modal="true" aria-labelledby="cal-title" tabIndex={-1} ref={dlg}>
        <div className="cal-top">
          <button className="cal-x" onClick={onClose} aria-label={t("close")}>✕</button>
          <div className="cal-kicker" id="cal-title">📅 {t("calendar")}</div>
          <div className="cal-month">
            <button className="nav" aria-label={t("prev")} onClick={() => move(-1)}>‹</button>
            <div><b>{monthName}</b><span>{cur.y}</span></div>
            <button className="nav" aria-label={t("next")} onClick={() => move(1)}>›</button>
          </div>
          <button className="cal-today" onClick={() => { setCur({ y: ist.y, m: ist.m }); setPicked(ist.ymd); }}>{t("today")}</button>
        </div>

        <div className="cal-body">
          <div className="cal-grid" key={cur.y + "-" + cur.m}>
            {wd.map((w, i) => <div key={i} className={"wd" + (WEEKLY_OFF.includes(i) ? " off" : "")}>{w}</div>)}
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const ymd = ymdOf(cur.y, cur.m, d), dow = (first + d - 1) % 7;
              const cls = ["day", ymd === ist.ymd && "today", ymd === picked && "picked", holidayOn(ymd) && "hol", WEEKLY_OFF.includes(dow) && "off"].filter(Boolean).join(" ");
              return <button key={i} className={cls} onClick={() => setPicked(ymd)} aria-label={ymd} aria-pressed={ymd === picked}>{d}</button>;
            })}
          </div>

          <div className="cal-legend">
            <span><i className="lg today" />{t("today")}</span>
            <span><i className="lg hol" />{t("legendHoliday")}</span>
            <span><i className="lg off" />{t("legendSunday")}</span>
          </div>

          <div className={"cal-pick " + kind}>
            <small>{t("selectedDay")}</small>
            <b>{fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, Date.UTC(py, pm - 1, pd))}</b>
            <div>{kindText}</div>
          </div>

          <h3 className="cal-up-h">{t("upcoming")}</h3>
          {up.length ? (
            <ul className="cal-up">
              {up.map((h) => (
                <li key={h.ymd}>
                  <button onClick={() => { setCur({ y: h.y, m: h.m }); setPicked(h.ymd); }}>
                    <span className="dt"><b>{pad(h.d)}</b><i>{fmt({ month: "short" }, Date.UTC(h.y, h.m - 1, h.d))}</i></span>
                    <span className="nm">{h.name[lang]}<small>{fmt({ weekday: "long" }, Date.UTC(h.y, h.m - 1, h.d))}</small></span>
                  </button>
                </li>
              ))}
            </ul>
          ) : <div className="warn">{t("noUpcoming")}</div>}
          <div className="warn">{t("holidayNote")}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
