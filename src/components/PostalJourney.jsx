import { useI18n } from "../i18n/I18nProvider.jsx";

export default function PostalJourney() {
  const { lang } = useI18n();
  const hi = lang === "hi";
  return <section className="postal-journey" aria-label={hi ? "डाक यात्रा animation" : "Postal journey animation"}>
    <div className="journey-head"><span>✦ {hi ? "डाक यात्रा" : "POSTAL JOURNEY"}</span><b>{hi ? "हर संदेश की अपनी मंज़िल" : "Every message has a destination"}</b></div>
    <div className="journey-track"><div className="journey-line"/><div className="journey-progress"/><div className="journey-envelope">✉</div><div className="journey-stop start"><i>⌂</i><b>{hi ? "मगटोरा" : "Magtora"}</b><small>{hi ? "शाखा डाकघर" : "Branch office"}</small></div><div className="journey-stop middle"><i>✦</i><b>{hi ? "जलालाबाद" : "Jalalabad"}</b><small>{hi ? "छँटाई केंद्र" : "Sorting point"}</small></div><div className="journey-stop end"><i>✓</i><b>{hi ? "शाहजहाँपुर" : "Shahjahanpur"}</b><small>{hi ? "सुरक्षित डिलीवरी" : "Safe delivery"}</small></div></div>
    <p>{hi ? "आपकी डाक सही रास्ते पर है" : "Your mail is on the right route"}<span>● ● ●</span></p>
  </section>;
}
