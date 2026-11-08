import { useI18n } from "../i18n/I18nProvider.jsx";
import { TEAM } from "../data/team.js";
import OfficeStatus from "./OfficeStatus.jsx";
import TeamCard from "./TeamCard.jsx";
import AddressCard from "./AddressCard.jsx";

export default function TeamSection({ ist, syncState, office, onOpenCalendar }) {
  const { t } = useI18n();
  return (
    <section className="card team">
      <h2>{t("team")}</h2>
      <OfficeStatus ist={ist} syncState={syncState} office={office} onOpenCalendar={onOpenCalendar} />
      <div className="team-grid">
        {TEAM.map((m) => <TeamCard key={m.id} member={m} />)}
      </div>
      <AddressCard />
    </section>
  );
}
