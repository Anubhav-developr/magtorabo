import { useI18n } from "../i18n/I18nProvider.jsx";
import { DIGIPIN_URL, POSTPATH_URL } from "../data/links.js";
import { playGuide } from "../utils/audioGuide.js";

export default function QuickLinks() {
  const { t } = useI18n();
  const items = [
    { key: "digipin", icon: "🧭", url: DIGIPIN_URL, title: t("digipin"), desc: t("digipinDesc") },
    { key: "postpath", icon: "🛣️", url: POSTPATH_URL, title: t("postpath"), desc: t("postpathDesc") },
  ];
  return (
    <section className="card links">
      <h2>🔗 {t("quickLinks")}</h2>
      <div className="link-grid">
        {items.map((it) => (
          <a key={it.key} className="link-tile" onClick={() => playGuide("links")} href={it.url || undefined} aria-disabled={!it.url} target="_blank" rel="noopener noreferrer">
            <span className="ic">{it.icon}</span>
            <span><b>{it.title}</b><small>{it.url ? it.desc : t("linkNotSet")}</small></span>
          </a>
        ))}
      </div>
    </section>
  );
}
