import { useI18n } from "../i18n/I18nProvider.jsx";

export default function Header() {
  const { t } = useI18n();
  const title = t("title");
  const i = title.lastIndexOf(" ");
  return (
    <header>
      <div className="profile-cover" aria-hidden="true"><img src="/assets/magtora-cover-banner.png" alt="" /></div>
      <div className="top">
        <div>
          <h1>{title.slice(0, i)} <span>{title.slice(i + 1)}</span></h1>
          <p className="sub">{t("sub")}</p>
        </div>
        <div className="stats">
          <div className="stat"><b>11</b><small>{t("all") === "सभी" ? "गाँव" : "Villages"}</small></div>
          <div className="stat"><b>4.6 km</b><small>{t("all") === "सभी" ? "सबसे दूर (Umarpur)" : "Farthest (Umarpur)"}</small></div>
          <div className="stat"><b>3</b><small>{t("all") === "सभी" ? "दिशाएँ" : "Directions"}</small></div>
        </div>
      </div>
    </header>
  );
}
