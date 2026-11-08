import { useEffect, useRef, useState } from "react";

export default function StartupAnimation({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const audioRef = useRef(null);
  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/startup-audio.wav');
      audioRef.current.preload = 'auto';
      audioRef.current.volume = 0.82;
    }
    audioRef.current.play().catch(() => {});
  };
  useEffect(() => {
    audioRef.current = new Audio('/assets/startup-audio.wav');
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.82;
    const unlock = () => playAudio();
    document.addEventListener('pointerdown', unlock, { once: true, passive: true });
    document.addEventListener('wheel', unlock, { once: true, passive: true });
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    const exitTimer = setTimeout(() => setLeaving(true), 1900);
    const doneTimer = setTimeout(() => { playAudio(); onDone(); }, 2350);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  // App ke live clock updates se timer reset nahi hona chahiye.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div className={`startup-screen${leaving ? " is-leaving" : ""}`} onClick={playAudio} role="status" aria-label="पोस्ट ऑफिस मगटोरा खुल रहा है">
    <div className="startup-content">
      <div className="postal-emblem" aria-hidden="true"><div className="emblem-ring"/><div className="emblem-wing left"/><div className="emblem-wing right"/><div className="emblem-body"/><div className="emblem-line"/></div>
      <div className="startup-route" aria-hidden="true"><span/><i/><b/><em/></div>
      <div className="startup-copy"><span className="startup-kicker">INDIA POST · DIGITAL DESK</span><h1>मगटोरा <strong>डाकघर</strong></h1><p>आपके गाँवों तक, आपकी सेवा में</p></div>
      <div className="startup-loader"><span/><span/><span/></div>
    </div>
  </div>;
}
