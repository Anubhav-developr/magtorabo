import { useI18n } from "../i18n/I18nProvider.jsx";

const ITEMS = [
  { hi: "India Post — News & Updates", en: "India Post — News & Updates", noteHi: "आधिकारिक विभागीय समाचार और घोषणाएँ", noteEn: "Official departmental news and announcements", url: "https://www.indiapost.gov.in/media/newsandupdates" },
  { hi: "उत्तर प्रदेश Postal Circle", en: "Uttar Pradesh Postal Circle", noteHi: "UP Circle की आधिकारिक जानकारी और notices", noteEn: "Official UP Circle information and notices", url: "https://www.indiapost.gov.in/sites/PostalCircles/UttarPradesh" },
  { hi: "Shahjahanpur Division updates", en: "Shahjahanpur Division updates", noteHi: "GDS और विभागीय updates official portal पर देखें", noteEn: "View GDS and departmental updates on the official portal", url: "https://www.indiapost.gov.in/gdsonlineengagement" },
];

export default function IndiaPostNews() {
  const { lang } = useI18n();
  const hi = lang === "hi";
  return <section className="india-news"><div className="news-heading"><div><span>INDIA POST · OFFICIAL UPDATES</span><h3>📰 {hi ? "डाक समाचार और अपडेट" : "Postal news & updates"}</h3></div><i>LIVE LINKS</i></div><div className="news-list">{ITEMS.map((item) => <a className="news-item" href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}><b>{hi ? item.hi : item.en}</b><small>{hi ? item.noteHi : item.noteEn}</small><em>↗</em></a>)}</div><p className="news-note">{hi ? "अपडेट official India Post pages से देखें · local notices के लिए Shahjahanpur Division से पुष्टि करें।" : "Open official India Post pages for updates · confirm local notices with Shahjahanpur Division."}</p></section>;
}
