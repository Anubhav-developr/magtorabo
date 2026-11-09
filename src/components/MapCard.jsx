import { forwardRef } from "react";
import MapBlock from "./map/MapBlock.jsx";
import { useI18n } from "../i18n/I18nProvider.jsx";

const LEGEND = [["var(--main)", "मुख्य सड़क"], ["var(--red)", "दक्षिण"], ["var(--blue)", "उत्तर"], ["var(--green)", "पश्चिम"], ["var(--dirt)", "कच्चा"]];

const MapCard = forwardRef(function MapCard({ selectedId, onSelect, dimIds }, ref) {
  const { t } = useI18n();
  return (
    <section className="card mapwrap">
      <div className="mhead">
        <h2>{t("map")} · {t("tapHint")}</h2>
        <div className="legend">
          {LEGEND.map(([c, label]) => (
            <span key={label}><i style={{ background: c }} />{label}</span>
          ))}
        </div>
      </div>
      <MapBlock ref={ref} selectedId={selectedId} onSelect={onSelect} dimIds={dimIds} />
    </section>
  );
});

export default MapCard;
