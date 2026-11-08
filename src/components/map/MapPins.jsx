// Label offsets — aapke edited block ke hisaab se (maghreta / kona alag)
function labelPos(v) {
  let lx = v.x > 600 ? -24 : 16, ly = -18, anchor = v.x > 600 ? "end" : "start";
  if (v.id === "maghreta") { lx = 18; ly = -42; anchor = "start"; }
  if (v.id === "kona-yakubpur") { lx = -22; ly = -62; anchor = "end"; }
  return { lx, ly, anchor };
}

export default function MapPins({ villages, selectedId, dimIds, onSelect }) {
  return (
    <g id="mg-pins">
      {villages.map((v) => {
        const { lx, ly, anchor } = labelPos(v);
        const cls = "v" + (selectedId === v.id ? " on" : "") + (dimIds.includes(v.id) ? " dim" : "");
        return (
          <g
            key={v.id}
            className={cls}
            tabIndex={0}
            role="button"
            aria-label={v.n}
            data-id={v.id}
            transform={`translate(${v.x},${v.y})`}
            onClick={(e) => { e.stopPropagation(); onSelect(v.id); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(v.id); } }}
          >
            <g className="sc" style={{ transformOrigin: "0 0" }}>
              <path className="pin" d="M0,0 c-4,-9 -12,-15 -12,-24 a12,12 0 1 1 24,0 c0,9 -8,15 -12,24z" />
              <circle cx="0" cy="-24" r="4" fill="#fff" />
              <text className="lb" x={lx} y={ly} textAnchor={anchor}>{v.n}</text>
            </g>
          </g>
        );
      })}
    </g>
  );
}
