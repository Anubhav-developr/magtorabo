import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";

const ITEMS = [
  { hi: "India Post — News & Updates", en: "India Post — News & Updates", noteHi: "आधिकारिक विभागीय समाचार और घोषणाएँ", noteEn: "Official departmental news and announcements", url: "https://www.indiapost.gov.in/media/newsandupdates" },
  { hi: "उत्तर प्रदेश Postal Circle", en: "Uttar Pradesh Postal Circle", noteHi: "UP Circle की आधिकारिक जानकारी और notices", noteEn: "Official UP Circle information and notices", url: "https://www.indiapost.gov.in/sites/PostalCircles/UttarPradesh" },
  { hi: "Shahjahanpur Division updates", en: "Shahjahanpur Division updates", noteHi: "GDS और विभागीय updates official portal पर देखें", noteEn: "View GDS and departmental updates on the official portal", url: "https://www.indiapost.gov.in/gdsonlineengagement" },
];

export default function IndiaPostNews() {
  const { lang } = useI18n();
  const hi = lang === "hi";
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = setInterval(() => setActive(i => (i + 1) % ITEMS.length), 4500); return () => clearInterval(timer); }, []);
  const item = ITEMS[active];
  return <section className="india-news" aria-live="polite"><div className="news-heading"><div><span>INDIA POST · OFFICIAL UPDATES</span><h3>📰 {hi ? "डाक समाचार और अपडेट" : "Postal news & updates"}</h3></div><i>{active + 1} / {ITEMS.length}</i></div><div className="news-rotator"><a className="news-item news-featured" href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}><b>{hi ? item.hi : item.en}</b><small>{hi ? item.noteHi : item.noteEn}</small><em>↗</em><span className="news-read">{hi ? "Official page खोलें" : "Open official page"}</span></a></div><div className="news-dots" aria-label={hi ? "समाचार चुनें" : "Choose update"}>{ITEMS.map((_, i) => <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`${hi ? "समाचार" : "Update"} ${i + 1}`} />)}</div><p className="news-note">{hi ? "Official India Post links से update देखें · card अपने-आप rotate होता है।" : "Updates link to official India Post pages · cards rotate automatically."}</p></section>;
}
