import { useI18n } from "../i18n/I18nProvider.jsx";
import { OPEN_MIN, CLOSE_MIN } from "../data/officeConfig.js";
import { playGuide } from "../utils/audioGuide.js";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Live open/closed pill — IST time (server-synced), Sunday + holiday aware.
 * Props: ist (useIndiaTime().ist), syncState, office (getOfficeStatus result)
 */
export default function OfficeStatus({ ist, syncState, office, onOpenCalendar }) {
  const { t, lang, locale } = useI18n();
  const { status, holiday, next } = office;
  const cls = status === "open" ? "open" : status === "holiday" ? "holiday" : "closed";
  const label = { open: t("statusOpen"), before: t("statusBefore"), after: t("statusAfter"), holiday: t("statusHoliday"), sunday: t("statusSunday") }[status];

  let nextTxt = "";
  if (status === "open") {
    nextTxt = `${t("closesAt")}: ${pad(CLOSE_MIN / 60)}:00`;
  } else if (next) {
    const day = next.today ? t("today") : new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" }).format(Date.UTC(next.y, next.m - 1, next.d));
    nextTxt = `${t("opensNext")}: ${day}, ${pad(OPEN_MIN / 60)}:00 AM`;
  }
  const clock = `${pad(ist.hh)}:${pad(ist.mm)}:${pad(ist.ss)}`;
  const syncLbl = syncState === "synced" ? t("synced") : syncState === "device" ? t("deviceTime") : t("syncing");

  return (
    <div className="status-card" id="status">
      <div className={"status-pill " + cls}><span className="dot" />{label}{holiday ? ` · ${holiday[lang]}` : ""}</div>
      <div className="status-meta">
        <b className="clock">{clock}</b> <small>{t("ist")}</small>
        <small className="sync">{syncLbl}</small>
      </div>
      <button className="cal-open" onClick={() => { playGuide("calendar"); onOpenCalendar(); }}>{t("openCalendar")}</button>
      <div className="status-next">{t("openHours")}: {t("hours")}{nextTxt ? ` · ${nextTxt}` : ""}</div>
    </div>
  );
}
