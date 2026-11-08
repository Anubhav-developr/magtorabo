import { G, V, TABS, fd } from "../data/villages.js";
import { useI18n } from "../i18n/I18nProvider.jsx";

export default function VillageList({ selectedId, filter, onFilter, query, onQuery, onPick }) {
  const { t } = useI18n();
  const TAB_KEY = { all: "all", s: "south", n: "north", w: "west" };
  const q = query.trim().toLowerCase();
  const rows = V.filter((v) => (filter === "all" || v.g === filter) && (!q || v.n.toLowerCase().indexOf(q) > -1));
  return (
    <section className="card listcard">
      <div className="tools">
        <input id="q" type="search" placeholder={t("search")} aria-label="Search villages" value={query} onChange={(e) => onQuery(e.target.value)} />
        <div className="tabs" id="tabs">
          {TABS.map(([key]) => (
            <button key={key} className={filter === key ? "on" : ""} onClick={() => onFilter(key)}>{t(TAB_KEY[key])}</button>
          ))}
        </div>
      </div>
      <div id="list">
        {rows.length ? rows.map((v) => (
          <button key={v.id} className={"item" + (selectedId === v.id ? " on" : "")} data-id={v.id} onClick={() => onPick(v.id)}>
            <span className="n">{V.indexOf(v) + 1}</span>
            <span className="t"><b>{v.n}</b><small>{G[v.g][0]} • {v.s}</small></span>
            <span className="d">{fd(v)}</span>
          </button>
        )) : <div className="empty">कोई गाँव नहीं मिला</div>}
      </div>
    </section>
  );
}
