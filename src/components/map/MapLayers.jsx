const LAYERS = [["landmarks", "📍 Landmarks"], ["labels", "🔤 नाम"], ["google", "🗺️ Google Maps view"]];

export default function MapLayers({ layers, onToggle }) {
  return (
    <div className="mg-layers" id="mg-layers">
      {LAYERS.map(([key, label]) => (
        <button key={key} className={"mg-chip" + (layers[key] ? " on" : "")} onClick={() => onToggle(key)}>{label}</button>
      ))}
    </div>
  );
}
