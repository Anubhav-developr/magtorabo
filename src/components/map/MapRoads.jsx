import { ROADS } from "../../data/mapData.js";

export default function MapRoads({ highlighted }) {
  return (
    <>
      <g id="mg-roads">
        {ROADS.map((r, i) => (
          <path
            key={i}
            className={"rd " + r.cls + (r.id && highlighted.includes(r.id) ? " hl" : "")}
            d={r.d}
            style={r.style}
            opacity={r.opacity}
          />
        ))}
      </g>
      <path className="cl" d="M400,698 L400,422 Q402,302 470,232 Q520,194 650,188" />
    </>
  );
}
