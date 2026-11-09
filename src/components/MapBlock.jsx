import React, { useMemo, useState } from "react";
const points = {
  magtora: [550, 300],
  kudra: [400, 450],
  bhulbhulaganj: [246, 486],
  jatav: [262, 578],
  faridapur: [400, 610],
  kahar: [206, 648],
  umarpur: [114, 560],
  maghreta: [560, 108],
  kona: [718, 104],
  rapra: [232, 356],
  chachhuapur: [142, 278],
};
export default function MapBlock({ villages, selectedId, onSelect, hindi }) {
  const [zoom, setZoom] = useState(1),
    size = 800 / zoom,
    viewBox = useMemo(
      () => `${(800 - size) / 2} ${(720 - size) / 2} ${size} ${size}`,
      [size],
    );
  return (
    <div className="map-component">
      <div className="map-tools">
        <button onClick={() => setZoom((z) => Math.min(2.8, z + 0.25))}>
          +
        </button>
        <button onClick={() => setZoom((z) => Math.max(1, z - 0.25))}>−</button>
        <button onClick={() => setZoom(1)}>⤢</button>
      </div>
      <svg viewBox={viewBox} role="img" aria-label="Magtora village road map">
        <path
          className="road main"
          d="M400 700L400 420Q402 300 470 230Q520 192 650 186L760 235"
        />
        <path className="road north" d="M560 196V112" />
        <path className="road dirt" d="M640 188Q690 160 718 108M400 332H318" />
        <path
          className="road west"
          d="M318 332Q260 348 232 356Q165 350 142 278"
        />
        <path
          className="road south"
          d="M400 492Q320 496 246 486M400 566Q320 566 262 578M400 640Q340 662 270 652L206 648M206 648Q130 640 114 560"
        />
        <g className="post-office">
          <rect x="490" y="318" width="120" height="84" rx="10" />
          <rect x="482" y="306" width="136" height="16" rx="4" />
          <rect x="505" y="328" width="90" height="24" rx="4" />
          <text x="550" y="346" textAnchor="middle">
            {hindi ? "भारतीय डाक" : "India Post"}
          </text>
          <rect x="540" y="362" width="20" height="40" />
        </g>
        {villages.map((v) => {
          const p = points[v.id] || points.magtora;
          return (
            <g
              key={v.id}
              className={`map-marker ${selectedId === v.id ? "selected" : ""}`}
              onClick={() => onSelect(v.id)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => e.key === "Enter" && onSelect(v.id)}
            >
              <circle className="pin" cx={p[0]} cy={p[1]} r="12" />
              <circle cx={p[0]} cy={p[1] - 2} r="4" fill="white" />
              <text x={p[0] + 16} y={p[1] - 8}>
                {v.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
