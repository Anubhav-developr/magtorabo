export default function MapToolbar({ zoomLabel, onIn, onOut, onFullscreen, onReset, isFullscreen }) {
  const stop = (handler) => (event) => { event.preventDefault(); event.stopPropagation(); handler?.(); };
  return (
    <>
      <div className="mg-tools">
        <button type="button" id="mg-in" aria-label="Zoom in" onPointerDown={(e) => e.stopPropagation()} onClick={stop(onIn)}>+</button>
        <button type="button" id="mg-out" aria-label="Zoom out" onPointerDown={(e) => e.stopPropagation()} onClick={stop(onOut)}>−</button>
        <button type="button" id="mg-fit" aria-label={isFullscreen ? "Close fullscreen map" : "Open fullscreen map"} style={{ fontSize: "15px" }} onPointerDown={(e) => e.stopPropagation()} onClick={stop(onFullscreen)}>{isFullscreen ? "×" : "⤢"}</button>
        {isFullscreen && <button type="button" aria-label="Reset map view" onPointerDown={(e) => e.stopPropagation()} onClick={stop(onReset)}>↺</button>}
      </div>
      <div className="mg-zoom" id="mg-zoomlbl">{zoomLabel}</div>
    </>
  );
}
