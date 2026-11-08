import { useCallback, useEffect, useRef, useState } from "react";
import { BASE, MIN_W, MAX_W } from "../../data/mapData.js";

/**
 * Zoom / pan / pinch / wheel / fly-to — original block ke setView, zoomAt,
 * animateTo aur bindGestures ka same logic.
 */
export function useMapView(svgRef, stageRef) {
  const [view, setViewState] = useState({ x: 0, y: 0, w: BASE.w, h: BASE.h });
  const viewRef = useRef(view);

  const setView = useCallback((v) => {
    const w = Math.max(MIN_W, Math.min(MAX_W, v.w)), h = (w * BASE.h) / BASE.w;
    const x = Math.max(-40, Math.min(BASE.w - w + 40, v.x)), y = Math.max(-40, Math.min(BASE.h - h + 40, v.y));
    viewRef.current = { x, y, w, h };
    setViewState(viewRef.current);
  }, []);

  const zoomAt = useCallback((f, cx, cy) => { // f>1 zoom in; (cx,cy) svg coordinates
    const v = viewRef.current;
    let nw = v.w / f; nw = Math.max(MIN_W, Math.min(MAX_W, nw));
    const r = nw / v.w;
    setView({ x: cx - (cx - v.x) * r, y: cy - (cy - v.y) * r, w: nw });
  }, [setView]);

  const center = useCallback(() => ({ x: viewRef.current.x + viewRef.current.w / 2, y: viewRef.current.y + viewRef.current.h / 2 }), []);

  const animateTo = useCallback((t, ms) => { // smooth fly-to
    const a = viewRef.current, st = performance.now(); ms = ms || 450;
    (function step(n) {
      const k = Math.min(1, (n - st) / ms), e = 1 - Math.pow(1 - k, 3);
      setView({ x: a.x + (t.x - a.x) * e, y: a.y + (t.y - a.y) * e, w: a.w + (t.w - a.w) * e });
      if (k < 1) requestAnimationFrame(step);
    })(st);
  }, [setView]);

  const zoomIn = useCallback(() => { const c = center(); zoomAt(1.5, c.x, c.y); }, [center, zoomAt]);
  const zoomOut = useCallback(() => { const c = center(); zoomAt(1 / 1.5, c.x, c.y); }, [center, zoomAt]);
  const reset = useCallback(() => animateTo({ x: 0, y: 0, w: BASE.w }), [animateTo]);

  // gestures (native listeners: wheel ko passive:false chahiye)
  useEffect(() => {
    const svg = svgRef.current, stage = stageRef.current;
    if (!svg || !stage) return;
    const toSvg = (ev) => { const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    const ptrs = new Map(); let last = null, pinch = null, moved = false;

    const onWheel = (e) => { e.preventDefault(); const p = toSvg(e); zoomAt(e.deltaY < 0 ? 1.2 : 1 / 1.2, p.x, p.y); };
    const onDbl = (e) => { const p = toSvg(e); zoomAt(e.shiftKey ? 0.5 : 2, p.x, p.y); };
    const onDown = (e) => {
      if (e.target.closest(".mg-tools") || e.target.closest(".v")) return;
      stage.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, e); moved = false;
      if (ptrs.size === 1) last = { x: e.clientX, y: e.clientY };
      if (ptrs.size === 2) { const a = [...ptrs.values()]; pinch = Math.hypot(a[0].clientX - a[1].clientX, a[0].clientY - a[1].clientY); }
    };
    const onMove = (e) => {
      if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, e);
      if (ptrs.size === 2) {
        const a = [...ptrs.values()], d = Math.hypot(a[0].clientX - a[1].clientX, a[0].clientY - a[1].clientY);
        const mid = toSvg({ clientX: (a[0].clientX + a[1].clientX) / 2, clientY: (a[0].clientY + a[1].clientY) / 2 });
        if (pinch) zoomAt(d / pinch, mid.x, mid.y); pinch = d; moved = true; return;
      }
      if (ptrs.size === 1 && last) {
        const dx = e.clientX - last.x, dy = e.clientY - last.y; if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        const v = viewRef.current, sc = v.w / stage.clientWidth;
        setView({ x: v.x - dx * sc, y: v.y - dy * sc, w: v.w }); last = { x: e.clientX, y: e.clientY };
      }
    };
    const up = (e) => { ptrs.delete(e.pointerId); pinch = null; last = ptrs.size ? { x: [...ptrs.values()][0].clientX, y: [...ptrs.values()][0].clientY } : null; };
    const onClickCapture = (e) => { if (e.target.closest && e.target.closest(".v")) return; if (moved) { e.stopPropagation(); e.preventDefault(); } }; // drag ke baad accidental select nahi

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("dblclick", onDbl);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("click", onClickCapture, true);
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("dblclick", onDbl);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("click", onClickCapture, true);
    };
  }, [svgRef, stageRef, zoomAt, setView]);

  return { view, viewRef, zoomIn, zoomOut, reset, animateTo };
}
