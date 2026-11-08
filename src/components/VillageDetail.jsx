import { G } from "../data/villages.js";

export default function VillageDetail({ village: v }) {
  if (!v) {
    return (
      <section className="card detail" id="detail" aria-live="polite">
        <div className="empty"><big>📍</big>नक्शे या सूची से कोई गाँव चुनें,<br />रास्ता और दूरी यहाँ दिखेगी।</div>
      </section>
    );
  }
  const gr = G[v.g];
  return (
    <section className="card detail" id="detail" aria-live="polite">
      <div className="dh">
        <div>
          <h3>{v.n}</h3>
          <span className="badge" style={{ background: gr[1] }}>{gr[0]} दिशा</span>
        </div>
        <div className="dist">
          <b>{v.d === null ? "–" : v.d}</b>
          <small>{v.d === null ? "दूरी अपुष्ट" : "km मगटोरा से" + (v.a ? " (अनुमानित)" : "")}</small>
        </div>
      </div>
      <span className="chip">🛣️ {v.s}</span>
      <ol className="steps">
        {v.st.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
      {v.a ? <div className="warn">* नोटबुक के जुड़े हुए खंडों से निकाली गई दूरी।</div> : null}
    </section>
  );
}
