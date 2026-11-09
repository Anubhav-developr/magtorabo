import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";

export default function IndiaPostPulse() {
  const { lang } = useI18n();
  const hi = lang === "hi";
  const messages = hi
    ? ["डाक सेवा आपके गाँव तक", "शाहजहाँपुर से मगटोरा तक", "आपकी चिट्ठी, हमारी जिम्मेदारी"]
    : ["Postal service for your village", "From Shahjahanpur to Magtora", "Your mail, our responsibility"];
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => setIndex(i => (i + 1) % messages.length), 3600); return () => clearInterval(timer); }, [messages.length]);
  return <section className="post-pulse" aria-label={hi ? "इंडिया पोस्ट सेवा अपडेट" : "India Post service update"}>
    <div className="pulse-copy"><span className="pulse-kicker">INDIA POST · SHAHJAHANPUR</span><h2>{hi ? "डाक का सफर जारी है" : "The postal journey continues"}</h2><p key={index}>{messages[index]}</p></div>
    <div className="pulse-route" aria-hidden="true"><span className="route-line"/><i className="route-dot one"/><i className="route-dot two"/><i className="route-dot three"/><span className="route-envelope">✉</span><b className="route-pin">●</b></div>
    <div className="pulse-stats"><span><b>11</b>{hi ? " गाँव" : " villages"}</span><span><b>10–2</b>{hi ? " सेवा समय" : " service hours"}</span></div>
  </section>;
}
