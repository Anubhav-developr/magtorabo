import { useEffect, useRef, useState } from "react";
import { V } from "./data/villages.js";
import { useIndiaTime } from "./hooks/useIndiaTime.js";
import { getOfficeStatus } from "./hooks/useOfficeStatus.js";
import Toolbar from "./components/Toolbar.jsx";
import Header from "./components/Header.jsx";
import TeamSection from "./components/TeamSection.jsx";
import MapCard from "./components/MapCard.jsx";
import VillageDetail from "./components/VillageDetail.jsx";
import VillageList from "./components/VillageList.jsx";
import HolidayCalendar from "./components/HolidayCalendar.jsx";
import QuickLinks from "./components/QuickLinks.jsx";
import Footer from "./components/Footer.jsx";
import StartupAnimation from "./components/StartupAnimation.jsx";
import ComplaintBook from "./components/ComplaintBook.jsx";
import IndiaPostPulse from "./components/IndiaPostPulse.jsx";
import IndiaPostNews from "./components/IndiaPostNews.jsx";
import PostalJourney from "./components/PostalJourney.jsx";
import { playGuide } from "./utils/audioGuide.js";

// "#kudra" -> "kudra" (valid id ho tabhi), warna null
const idFromHash = () => {
  const id = location.hash.replace("#", "");
  return V.some((v) => v.id === id) ? id : null;
};

export default function App() {
  const [booting, setBooting] = useState(true);
  const [selectedId, setSelectedId] = useState(idFromHash);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [calOpen, setCalOpen] = useState(false);
  const mapRef = useRef(null); // mapRef.current.zoomIn() / zoomOut() / reset() / select(id)

  // ek hi time source: status + calendar dono ke liye (IST, server-synced)
  const { ist, state: syncState } = useIndiaTime();
  const office = getOfficeStatus(ist);

  const go = (id) => {
    try { history.replaceState(null, "", "#" + id); } catch (e) { location.hash = id; }
    setSelectedId(id);
    playGuide(id === "magtora" ? "magtora" : "village");
  };

  useEffect(() => {
    const onHash = () => setSelectedId(idFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const dimIds = filter === "all" ? [] : V.filter((v) => v.g !== filter && v.g !== "c").map((v) => v.id);
  const selected = V.find((v) => v.id === selectedId) || null;

  return (
    <>
      {booting && <StartupAnimation onDone={() => setBooting(false)} />}
      <Toolbar />
      <Header />
      <IndiaPostPulse />
      <main className="wide">
        <TeamSection ist={ist} syncState={syncState} office={office} onOpenCalendar={() => setCalOpen(true)} />
      </main>
      <main className="map-layout">
        <MapCard ref={mapRef} selectedId={selectedId} onSelect={go} dimIds={dimIds} />
        <div className="side">
          <VillageDetail village={selected} />
          <VillageList
            selectedId={selectedId}
            filter={filter} onFilter={setFilter}
            query={query} onQuery={setQuery}
            onPick={go}
          />
        </div>
        <div className="updates-after-villages">
          <IndiaPostNews />
          <PostalJourney />
        </div>
      </main>
      <main className="wide">
        <ComplaintBook />
        <QuickLinks />
      </main>
      <HolidayCalendar open={calOpen} onClose={() => setCalOpen(false)} ist={ist} />
      <Footer />
    </>
  );
}
