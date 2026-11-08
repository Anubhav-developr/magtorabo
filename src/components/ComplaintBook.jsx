import { useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";

const RECEIVER = "anubhavm1234@gmail.com";

export default function ComplaintBook() {
  const { lang } = useI18n();
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [sent, setSent] = useState(false);
  const hi = lang === "hi";

  const submit = (e) => {
    e.preventDefault();
    const subject = `${hi ? "शिकायत पुस्तिका" : "Complaint Book"} — ${form.name || (hi ? "नया संदेश" : "New message")}`;
    const body = `${hi ? "नाम" : "Name"}: ${form.name}\n${hi ? "मोबाइल" : "Mobile"}: ${form.mobile || "-"}\n\n${hi ? "शिकायत" : "Complaint"}:\n${form.message}`;
    window.location.href = `mailto:${RECEIVER}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return <section className="complaint-book card">
    <div className="complaint-heading"><div><span className="complaint-kicker">{hi ? "आपकी आवाज़ महत्वपूर्ण है" : "Your voice matters"}</span><h2>📝 {hi ? "शिकायत पुस्तिका" : "Complaint Book"}</h2><p>{hi ? "डाकघर से जुड़ी समस्या या सुझाव हमें लिखकर भेजें।" : "Send us a complaint or suggestion about the post office."}</p></div><div className="complaint-seal" aria-hidden="true">✉</div></div>
    <form onSubmit={submit}>
      <div className="complaint-fields"><label>{hi ? "नाम" : "Name"}<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={hi ? "अपना नाम लिखें" : "Enter your name"} /></label><label>{hi ? "मोबाइल नंबर" : "Mobile number"}<input inputMode="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder={hi ? "वैकल्पिक" : "Optional"} /></label></div>
      <label>{hi ? "शिकायत / सुझाव" : "Complaint / suggestion"}<textarea required rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={hi ? "अपनी बात यहाँ लिखें…" : "Write your message here…"} /></label>
      <div className="complaint-actions"><button type="submit">✈️ {hi ? "शिकायत भेजें" : "Send complaint"}</button><small>{hi ? `यह संदेश ${RECEIVER} पर भेजा जाएगा।` : `This message will be sent to ${RECEIVER}.`}</small></div>
      {sent && <p className="complaint-note">{hi ? "आपका email app खुल रहा है। शिकायत भेजने के लिए Send दबाएँ।" : "Your email app is opening. Press Send to submit the complaint."}</p>}
    </form>
  </section>;
}
