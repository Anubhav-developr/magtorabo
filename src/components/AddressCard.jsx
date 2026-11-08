import { useI18n } from "../i18n/I18nProvider.jsx";
import { MAPS_DIR_URL, MAPS_SEARCH_URL } from "../data/links.js";

export default function AddressCard() {
  const { t } = useI18n();
  return (
    <div className="address">
      <h3>📍 {t("title")}</h3>
      <p><b>{t("pin")}:</b> 242221</p>
      <p><b>{t("address")}:</b> {t("addressText")}</p>
      <div className="actions">
        <a href={MAPS_SEARCH_URL} target="_blank" rel="noopener noreferrer">{t("maps")}</a>
        <a href={MAPS_DIR_URL} target="_blank" rel="noopener noreferrer">{t("directions")}</a>
      </div>
    </div>
  );
}
