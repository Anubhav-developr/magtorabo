import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { BASE, CITY, DEFAULT_LANDMARKS, DEFAULT_VILLAGES } from "../../data/mapData.js";
import { useMapView } from "./useMapView.js";
import MapRoads from "./MapRoads.jsx";
import PostOfficeBuilding from "./PostOfficeBuilding.jsx";
import MapLandmarks from "./MapLandmarks.jsx";
import MapPins from "./MapPins.jsx";
import MapToolbar from "./MapToolbar.jsx";
import MapLayers from "./MapLayers.jsx";
import MapNearby from "./MapNearby.jsx";

/**
 * Props
 *  villages / landmarks / city : optional (default = block ka data)
 *  selectedId                  : controlled selection (null = koi nahi)
 *  onSelect(id)                : pin click / Enter / Space par
 *  dimIds                      : filter ke time halke dikhane wale pins
 * Ref API : select(id), zoomIn(), zoomOut(), reset()
 */
const MapBlock = forwardRef(function MapBlock(
  { villages = DEFAULT_VILLAGES, landmarks = DEFAULT_LANDMARKS, city = CITY, selectedId = null, onSelect, dimIds = [] },
  ref
) {
  const svgRef = useRef(null), stageRef = useRef(null);
  const [layers, setLayers] = useState({ landmarks: true, labels: true, google: false });
  const { view, viewRef, zoomIn, zoomOut, reset, animateTo } = useMapView(svgRef, stageRef);

  const sel = villages.find((v) => v.id === selectedId) || null;
  const gq = (extra) => encodeURIComponent((extra ? extra + " near " : "") + (sel ? sel.n + ", " : "Magtora, ") + city);

  // select hone par us gaon par fly-to (pehli render par nahi)
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (sel) {
      const cur = viewRef.current;
      animateTo({ x: sel.x - cur.w / 2, y: sel.y - cur.h / 2, w: Math.min(cur.w, 360) });
    }
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  useImperativeHandle(ref, () => ({ select: (id) => onSelect && onSelect(id), zoomIn, zoomOut, reset }));

  const highlighted = sel ? sel.r : [];
  const svgClass = [sel ? "has" : "", !layers.landmarks ? "hide-lm" : "", !layers.labels ? "hide-lb" : ""].filter(Boolean).join(" ");

  return (
    <div className={"mgmap" + (layers.google ? " gview" : "")} id="mg-map-root">
      <div className="mg-stage" id="mg-stage" ref={stageRef}>
        <svg
          id="mg-svg"
          ref={svgRef}
          className={svgClass}
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          style={{ "--k": (view.w / BASE.w).toFixed(3) }} // pins/labels screen-size constant rakhta hai
          role="group"
          aria-label="Magtora B.O. village map"
        >
          <MapRoads highlighted={highlighted} />
          <PostOfficeBuilding />
          <MapLandmarks landmarks={landmarks} />
          <MapPins villages={villages} selectedId={selectedId} dimIds={dimIds} onSelect={(id) => onSelect && onSelect(id)} />
        </svg>
        <iframe
          id="mg-gframe"
          title="Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={layers.google ? "https://www.google.com/maps?q=" + gq() + "&z=15&output=embed" : undefined} // key ki zarurat nahi
        />
        <MapToolbar zoomLabel={Math.round((BASE.w / view.w) * 100) + "%"} onIn={zoomIn} onOut={zoomOut} onFit={reset} />
      </div>
      <MapLayers layers={layers} onToggle={(k) => setLayers((s) => ({ ...s, [k]: !s[k] }))} />
      <MapNearby village={sel} landmarks={landmarks} gq={gq} />
    </div>
  );
});

export default MapBlock;
