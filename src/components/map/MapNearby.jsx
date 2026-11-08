import { NEARBY } from "../../data/mapData.js";

export default function MapNearby({ village, landmarks, gq }) {
  if (!village) {
    return (
      <div className="mg-near" id="mg-near">
        <h4>आस-पास</h4>
        <span style={{ color: "var(--mut)" }}>किसी गाँव पर टैप करें — landmarks और Google Maps की nearby search यहाँ दिखेंगी।</span>
      </div>
    );
  }
  const lms = landmarks.filter((l) => l.near.indexOf(village.id) > -1);
  return (
    <div className="mg-near" id="mg-near">
      <h4>{village.n} के आस-पास / रास्ते में</h4>
      {lms.length
        ? lms.map((l) => <span className="lm" key={l.id}>{l.ic} {l.n}</span>)
        : <span style={{ color: "var(--mut)" }}>कोई confirmed landmark नहीं जुड़ा।</span>}
      <div style={{ marginTop: 8 }}>
        <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/search/?api=1&query=" + gq()}>📍 Google Maps में खोलें</a>
        <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination=" + gq() + "&travelmode=driving"}>🧭 रास्ता</a>
      </div>
      <div style={{ marginTop: 4 }}>
        {NEARBY.map((n) => (
          <a key={n[0]} target="_blank" rel="noopener noreferrer"
             href={"https://www.google.com/maps/search/" + encodeURIComponent(n[0]) + "+near+" + gq().replace(/^.*?near/, "")}>{n[1]}</a>
        ))}
      </div>
    </div>
  );
}
