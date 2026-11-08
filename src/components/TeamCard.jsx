import { useI18n } from "../i18n/I18nProvider.jsx";
import { TEAM_LABELS, MOBILE_PLACEHOLDER } from "../data/team.js";

// Ek member ka card (aapke app.js ka team-grid article)
export default function TeamCard({ member }) {
  const { lang, t } = useI18n();
  const l = TEAM_LABELS[lang];
  const digits = member.mobile.replace(/\D/g, "");
  const tel = digits ? "tel:+" + (digits.length === 10 ? "91" + digits : digits) : null;
  const wa = digits ? "https://wa.me/" + (digits.length === 10 ? "91" + digits : digits) : null;
  return (
    <article className="member">
      <div className="photo">
        {member.photo ? <img src={member.photo} alt={member.name[lang]} /> : <>{member.short}<br />{t("photo")}</>}
      </div>
      <h3>{member.name[lang]}</h3>
      <small>{member.role[lang]}</small>
      <p><b>{l.mobile}</b><br />{member.mobile || MOBILE_PLACEHOLDER}</p>
      <p><b>{l.email}</b><br />{member.email}</p>
      <p><b>{l.hours}</b><br />{t("hours")}</p>
      <div className="actions">
        <a href={tel || undefined} aria-disabled={!tel}>{t("call")}</a>
        <a href={wa || undefined} aria-disabled={!wa} target="_blank" rel="noopener noreferrer">{t("whatsapp")}</a>
      </div>
    </article>
  );
}
