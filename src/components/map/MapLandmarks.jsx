export default function MapLandmarks({ landmarks }) {
  return (
    <g id="mg-landmarks">
      {landmarks.map((l) => (
        <g key={l.id} className="lm-g" transform={`translate(${l.x},${l.y})`}>
          <g className="sc" style={{ transformOrigin: "0 0" }}>
            <text fontSize="20" textAnchor="middle" y="6">{l.ic}</text>
            <text x="0" y="24" textAnchor="middle">{l.n}</text>
          </g>
        </g>
      ))}
    </g>
  );
}
