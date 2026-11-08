import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";

const RECEIVER = "anubhavm1234@gmail.com";

export default function ComplaintBook() {
  const { lang } = useI18n();
  const hi = lang === "hi";
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ category: "", name: "", relation: "", relativeName: "", village: "", mobile: "", message: "" });
  const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  useEffect(() => {
    if (!open) return;
    const closeOnEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEsc);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEsc); document.body.style.overflow = old; };
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    const subject = `${hi ? "शिकायत पुस्तिका" : "Complaint Book"} — ${form.category}`;
    const body = `${hi ? "शिकायत का प्रकार" : "Complaint type"}: ${form.category}\n${hi ? "नाम" : "Name"}: ${form.name}\n${hi ? "सम्बन्ध" : "Relation"}: ${form.relation || "-"}\n${hi ? "सम्बन्धित व्यक्ति का नाम" : "Related person's name"}: ${form.relativeName || "-"}\n${hi ? "गाँव" : "Village"}: ${form.village}\n${hi ? "मोबाइल" : "Mobile"}: ${form.mobile || "-"}\n\n${hi ? "विवरण" : "Description"}:\n${form.message}`;
    window.location.href = `mailto:${RECEIVER}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const close = () => { setOpen(false); setSent(false); };
  return <>
    <section className="complaint-book card"><div className="complaint-heading"><div><span className="complaint-kicker">{hi ? "आपकी आवाज़ महत्वपूर्ण है" : "Your voice matters"}</span><h2>📝 {hi ? "शिकायत पुस्तिका" : "Complaint Book"}</h2><p>{hi ? "समस्या, वित्तीय शिकायत या डाक संबंधी जानकारी दर्ज करें।" : "Report an issue, financial concern or mail-related problem."}</p></div><div className="complaint-seal">✉</div></div><button className="complaint-trigger" onClick={() => setOpen(true)}>✍️ {hi ? "शिकायत दर्ज करें" : "Register a complaint"}<span>→</span></button></section>
    {open && <div className="complaint-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="complaint-modal" role="dialog" aria-modal="true" aria-labelledby="complaint-title"><button className="complaint-close" onClick={close} aria-label={hi ? "बंद करें" : "Close"}>×</button><div className="modal-heading"><span className="complaint-kicker">{hi ? "शिकायत पुस्तिका" : "Complaint Book"}</span><h2 id="complaint-title">{hi ? "हम आपकी मदद करेंगे" : "We are here to help"}</h2><p>{hi ? "कृपया नीचे सही जानकारी भरें।" : "Please provide the details below."}</p></div><form onSubmit={submit}>
      <label className="category-label">{hi ? "शिकायत का प्रकार" : "Complaint type"}<select required value={form.category} onChange={update("category")}><option value="">{hi ? "पहले शिकायत का प्रकार चुनें" : "Choose complaint type first"}</option><option>{hi ? "💰 वित्तीय समस्या" : "💰 Financial issue"}</option><option>{hi ? "📬 डाक नहीं मिली" : "📬 Mail not received"}</option><option>{hi ? "⏳ डाक पहुँचने में देरी" : "⏳ Delivery delay"}</option><option>{hi ? "👥 सेवा/स्टाफ संबंधी" : "👥 Service / staff issue"}</option><option>{hi ? "💡 अन्य सुझाव" : "💡 Other suggestion"}</option></select></label>
      <div className="complaint-fields"><label>{hi ? "आपका नाम" : "Your name"}<input required value={form.name} onChange={update("name")} /></label><label>{hi ? "सम्बन्ध" : "Relation"}<select value={form.relation} onChange={update("relation")}><option value="">{hi ? "चुनें" : "Choose"}</option><option>{hi ? "पिता" : "Father"}</option><option>{hi ? "पति" : "Husband"}</option><option>{hi ? "पत्नी" : "Wife"}</option><option>{hi ? "अभिभावक" : "Guardian"}</option></select></label></div>
      <div className="complaint-fields"><label>{hi ? "पिता/पति/पत्नी का नाम" : "Father/Husband/Wife name"}<input value={form.relativeName} onChange={update("relativeName")} /></label><label>{hi ? "गाँव" : "Village"}<input required value={form.village} onChange={update("village")} /></label></div>
      <label>{hi ? "मोबाइल नंबर" : "Mobile number"}<input inputMode="tel" value={form.mobile} onChange={update("mobile")} /></label><label>{hi ? "विवरण लिखें" : "Write details"}<textarea required rows="5" value={form.message} onChange={update("message")} placeholder={hi ? "अपनी शिकायत या समस्या विस्तार से लिखें…" : "Describe your complaint or issue…"} /></label>
      <button className="complaint-submit" type="submit">✈️ {hi ? "शिकायत भेजें" : "Send complaint"}</button><small className="complaint-email-note">{hi ? `यह शिकायत ${RECEIVER} पर भेजी जाएगी।` : `This complaint will be sent to ${RECEIVER}.`}</small>{sent && <p className="complaint-note">{hi ? "आपका email app खुल रहा है। भेजने के लिए Send दबाएँ।" : "Your email app is opening. Press Send to submit."}</p>}
    </form></section></div>}
  </>;
}
