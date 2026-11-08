export default function MapToolbar({ zoomLabel, onIn, onOut, onFit }) {
  return (
    <>
      <div className="mg-tools">
        <button id="mg-in" aria-label="Zoom in" onClick={onIn}>+</button>
        <button id="mg-out" aria-label="Zoom out" onClick={onOut}>−</button>
        <button id="mg-fit" aria-label="Reset view" style={{ fontSize: "15px" }} onClick={onFit}>⤢</button>
      </div>
      <div className="mg-zoom" id="mg-zoomlbl">{zoomLabel}</div>
    </>
  );
}
