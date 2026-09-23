import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";
import { navigationNodes } from "../../navigation/navigationNodes";

const ADMIN_ROOMS = new Set([
  "rector", "academiccouncil", "prorector", "assistantrector",
  "rectorsroom", "ViceRectorResearch", "vivat",
]);

const ECONOMIC_ROOMS = new Set(["def", "dekanef", "dekan_economic", "dekanat_economic"]);

const SECOND_FLOOR_ROOMS = new Set([
  "a6", "a7", "a7a", "a9", "a10", "a11", "a12", "a13", "a14",
  "a18", "a19", "a20", "a21", "a22", "a23", "a29", "a30", "a31",
  "a32", "a38", "a39", "a41", "a43", "a61", "a62", "a63", "a64",
  "a65", "a66", "a67", "a68", "a69", "a70", "a71", "a72", "a73",
  "a74", "careercounselor", "hall", "idzdn", "kf", "khistory",
  "kinternationalrelations", "kL", "kpolit", "kreligions", "loft",
  "methoddepartment", "p3", "p4", "skladtzn", "tzn",
]);

const humanizeRoomId = (roomId) => roomId
  .replace(/[()]/g, " ")
  .replace(/[_-]+/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getRoomFloor = (roomId) => {
  const node = navigationNodes[roomId];
  if (node) return node[1] > 0.5 ? 2 : 1;
  return SECOND_FLOOR_ROOMS.has(roomId) ? 2 : 1;
};

const Sidebar = ({ room, closeSidebar, onRouteHere }) => {

  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => setImageFailed(false), [room]);

  if (!room) return null;
  const roomInfo = {
    a1: {
      title: t("rooms.auditorium.a1"),
      image: "../images/a1.jpg",
      text: "",
    },
    a2: {
      title: t("rooms.auditorium.a2"),
      image: "../images/a2.jpg",
      text: "",
      features: ["projector"]
    },
    a3: {
      title: t("rooms.auditorium.a3"),
      image: "",
      text: "",
    },
    a4: {
      title: t("rooms.auditorium.a4"),
      image: "../images/a4.jpg",
      text: "",
    },
    a5: {
      title: t("rooms.auditorium.a5"),
      image: "",
      text: "",
    },
    a8: {
      title: t("rooms.auditorium.a8"),
      image: "../images/a8.jpg",
      text: "",
      features: ["projector"]
    },
    a8a: {
      title: t("rooms.auditorium.a8a"),
      image: "",
      text: "",
    },
    a15: {
      title: t("rooms.auditorium.a15"),
      image: "",
      text: "",
    },
    a16: {
      title: t("rooms.auditorium.a16"),
      image: "../images/a16.jpg",
      text: "",
      features: ["projector"]
    },
    a17: {
      title: t("rooms.auditorium.a17"),
      image: "../images/a17.jpg",
      text: "",
      features: ["projector"]
    },
    a24: {
      title: t("rooms.auditorium.a24"),
      image: "../images/a24.jpg",
      text: "",
      features: ["projector"]
    },
    a25: {
      title: t("rooms.auditorium.a25"),
      image: "",
      text: "",
    },
    a34: {
      title: t("rooms.auditorium.a34"),
      image: "",
      text: "",
    },
    a35: {
      title: t("rooms.auditorium.a35"),
      image: "",
      text: "",
    },
    a36: {
      title: t("rooms.auditorium.a36"),
      image: "",
      text: "",
    },
    a19: {
      title: t("rooms.auditorium.a19"),
      image: "../images/a19.jpg",
      text: "",
      features: ["pc"]
    },
    a46: {
      title: t("rooms.auditorium.a46"),
      image: "../images/a46.jpg",
      text: "",
    },
    a47: {
      title: t("rooms.auditorium.a47"),
      image: "../images/a47.jpg",
      text: "",
    },
    a48: {
      title: t("rooms.auditorium.a48"),
      image: "../images/a48.jpg",
      text: "",
    },
    a49: {
      title: t("rooms.auditorium.a49"),
      image: "../images/a49.jpg",
      text: "",
    },
    a50: {
      title: t("rooms.auditorium.a50"),
      image: "../images/a50.jpg",
      text: "",
    },
    a51: {
      title: t("rooms.auditorium.a51"),
      image: "../images/a51.jpg",
      text: "",
    },
    a53: {
      title: t("rooms.auditorium.a53"),
      image: "../images/a53.jpg",
      text: "",
    },
    a54: {
      title: t("rooms.auditorium.a54"),
      image: "../images/a54.jpg",
      text: "",
    },
    a55: {
      title: t("rooms.auditorium.a55"),
      image: "",
      text: "",
    },
    a56: {
      title: t("rooms.auditorium.a56"),
      image: "",
      text: "",
    },
    a57: {
      title: t("rooms.auditorium.a57"),
      image: "",
      text: "",
    },
    academiccouncil: {
      title: t("rooms.admin.academiccouncil"),
      image: "",
      text: t("rooms.descriptions.academiccouncil", "")
    },
    assistantrector: {
      title: t("rooms.admin.assistantrector"),
      image: "",
      text: t("rooms.descriptions.assistantrector", "")},
    atc: {
      title: t("rooms.auditorium.atc"),
      image: "",
      text: "",
    },
    cafe: {
      title: t("rooms.auditorium.cafe"),
      image: "",
      text: "",
    },
    church: {
      title: t("rooms.auditorium.church"),
      image: "../images/church.jpg",
      text: "",
    },
    clerk: {
      title: t("rooms.auditorium.clerk"),
      image: "",
      text: "",
    },
    def: {
      title: t("rooms.economic.dekanat_economic"),
      image: "",
      text: "",
    },
    dekan_economic: {
      title: t("rooms.economic.dekan_economic"),
      image: "../images/novosel.jpg",
      text: t("rooms.descriptions.dekan_economic", "")
    },
    dekanat_economic: {
      title: t("rooms.economic.dekanat_economic"),
      image: "",
      text: t("rooms.descriptions.dekanat_economic", "")
    },
    dekanef: {
      title: t("rooms.economic.dekan_economic"),
      image: "",
      text: "",
    },
    dekanrgm: {
      title: t("rooms.auditorium.dekanrgm"),
      image: "",
      text: "",
    },
    drgm: {
      title: t("rooms.auditorium.drgm"),
      image: "",
      text: "",
    },
    emit: {
      title: t("rooms.auditorium.emit"),
      image: "",
      text: "",
    },
    informdepartment: {
      title: t("rooms.auditorium.informdepartment"),
      image: "",
      text: "",
    },
    infotechnologycenter: {
      title: t("rooms.auditorium.infotechnologycenter"),
      image: "",
      text: "",
    },
    kcyber: {
      title: t("rooms.auditorium.cybernetics"),
      image: "",
      text: "",
    },
    kIEI: {
      title: t("rooms.auditorium.kIEI"),
      image: "",
      text: "",
    },
    kKryvytska: {
      title: t("rooms.auditorium.kKryvytska"),
      image: "",
      text: "",
    },
    kregionalstudies: {
      title: t("rooms.auditorium.kregionalstudies"),
      image: "",
      text: "",
    },
    monastery: {
      title: t("rooms.auditorium.monastery"),
      image: "../images/monastery.png",
      text: "",
    },
    museum: {
      title: t("rooms.auditorium.museum"),
      image: "../images/museum.png",
      text: "",
    },
    "museum(rector)": {
      title: t("rooms.auditorium.museum"),
      image: "../images/museum1.png",
      text: "",
    },
    "oldprints(1)": {
      title: t("rooms.auditorium.oldprints1"),
      image: "../images/starodruky2.jpg",
      text: "",
    },
    "oldprints(2)": {
      title: t("rooms.auditorium.oldprints2"),
      image: "../images/starodruky1.jpg",
      text: "",
    },
    p1: {
      title: t("rooms.auditorium.p1"),
      image: "../images/p1.jpg",
      text: "",
      features: ["projector"]
    },
    p2: {
      title: t("rooms.auditorium.p2"),
      image: "../images/p2.jpg",
      text: "",
    },
    p5: {
      title: t("rooms.auditorium.p5"),
      image: "../images/p5.jpg",
      text: "",
      features: ["projector"]
    },
    prorector: {
      title: t("rooms.admin.prorector"),
      image: "",
      text: t("rooms.descriptions.prorector", "") },
    rector: {
      title: t("rooms.admin.rector"),
      image: "../images/rectors.jpg",
      text: "",
    },
    rectorsroom: {
      title: t("rooms.admin.rectorsroom"),
      image: "",
      text: t("rooms.descriptions.rectorsroom", "")
    },
    studentdepartment: {
      title: t("rooms.auditorium.studentdepartment"),
      image: "",
      text: "",
    },
    trainingclass: {
      title: t("rooms.auditorium.trainingclass"),
      image: "",
      text: "",
    },
    ViceRectorResearch: {
      title: t("rooms.admin.ViceRectorResearch"),
      image: "",
      text: t("rooms.descriptions.ViceRectorResearch", "")
    },
    vivat: {
      title: t("rooms.admin.vivat"),
      image: "",
      text: "",
    },
    a6: {
      title: t("rooms.auditorium.a6"),
      image: "../images/a6.jpg",
      text: "",
      features: ["projector"]
    },
    a7: {
      title: t("rooms.auditorium.a7"),
      image: "../images/a7.jpg",
      text: "",
      features: ["projector"]
    },
    a7a: {
      title: t("rooms.auditorium.a7a"),
      image: "",
      text: "",
    },
    a9: {
      title: t("rooms.auditorium.a9"),
      image: "../images/a9.jpg",
      text: "",
    },
    a10: {
      title: t("rooms.auditorium.a10"),
      image: "../images/a10.jpg",
      text: "",
    },
    a11: {
      title: t("rooms.auditorium.a11"),
      image: "../images/a11.jpg",
      text: "",
    },
    a12: {
      title: t("rooms.auditorium.a12"),
      image: "../images/a12.jpg",
      text: "",
    },
    a13: {
      title: t("rooms.auditorium.a13"),
      image: "../images/a13.jpg",
      text: "",
    },
    a14: {
      title: t("rooms.auditorium.a14"),
      image: "",
      text: "",
    },
    a18: {
      title: t("rooms.auditorium.a18"),
      image: "../images/a18.jpg",
      text: "",
      features: ["projector"]
    },
    a20: {
      title: t("rooms.auditorium.a20"),
      image: "../images/a20.jpg",
      text: "",
      features: ["pc"]
    },
    a21: {
      title: t("rooms.auditorium.a21"),
      image: "../images/a21.jpg",
      text: "",
      features: ["pc"]
    },
    a22: {
      title: t("rooms.auditorium.a22"),
      image: "../images/a22.jpg",
      text: "",
      features: ["pc"]
    },
    a23: {
      title: t("rooms.auditorium.a23"),
      image: "../images/a23.jpg",
      text: "",
      features: ["pc"]
    },
    a29: {
      title: t("rooms.auditorium.a29"),
      image: "",
      text: "",
    },
    a30: {
      title: t("rooms.auditorium.a30"),
      image: "",
      text: "",
    },
    a31: {
      title: t("rooms.auditorium.a31"),
      image: "",
      text: "",
    },
    a32: {
      title: t("rooms.auditorium.a32"),
      image: "",
      text: "",
    },
    a38: {
      title: t("rooms.auditorium.a38"),
      image: "",
      text: "",
    },
    a39: {
      title: t("rooms.auditorium.a39"),
      image: "",
      text: "",
    },
    a41: {
      title: t("rooms.auditorium.a41"),
      image: "",
      text: "",
    },
    a43: {
      title: t("rooms.auditorium.a43"),
      image: "",
      text: "",
    },
    a61: {
      title: t("rooms.auditorium.a61"),
      image: "",
      text: "",
    },
    a62: {
      title: t("rooms.auditorium.a62"),
      image: "",
      text: "",
    },
    a63: {
      title: t("rooms.auditorium.a63"),
      image: "",
      text: "",
    },
    a64: {
      title: t("rooms.auditorium.a64"),
      image: "",
      text: "",
    },
    a65: {
      title: t("rooms.auditorium.a65"),
      image: "",
      text: "",
    },
    a66: {
      title: t("rooms.auditorium.a66"),
      image: "",
      text: "",
    },
    a67: {
      title: t("rooms.auditorium.a67"),
      image: "",
      text: "",
    },
    a68: {
      title: t("rooms.auditorium.a68"),
      image: "",
      text: "",
    },
    a69: {
      title: t("rooms.auditorium.a69"),
      image: "",
      text: "",
    },
    a70: {
      title: t("rooms.auditorium.a70"),
      image: "",
      text: "",
    },
    a71: {
      title: t("rooms.auditorium.a71"),
      image: "",
      text: "",
    },
    a72: {
      title: t("rooms.auditorium.a72"),
      image: "",
      text: "",
    },
    a73: {
      title: t("rooms.auditorium.a73"),
      image: "",
      text: "",
    },
    a74: {
      title: t("rooms.auditorium.a74"),
      image: "",
      text: "",
    },
    kf: {
      title: t("rooms.auditorium.kf"),
      image: "",
      text: "",
    },
    p4: {
      title: t("rooms.auditorium.p4"),
      image: "",
      text: "",
    },
    hall: {
      title: t("rooms.auditorium.hall"),
      image: "",
      text: "",
    },
    loft: {
      title: t("rooms.auditorium.loft"),
      image: "",
      text: "",
    },
    skladtzn: {
      title: t("rooms.auditorium.skladtzn"),
      image: "",
      text: "",
    },
    tzn: {
      title: t("rooms.auditorium.tzn"),
      image: "",
      text: "",
    },
    kpolit: {
      title: t("rooms.auditorium.kpolit"),
      image: "",
      text: "",
    },
    kreligions: {
      title: t("rooms.auditorium.kreligions"),
      image: "",
      text: "",
    },
    careercounselor: {
      title: t("rooms.auditorium.careercounselor"),
      image: "",
      text: "",
    },
    p3: {
      title: t("rooms.auditorium.p3"),
      image: "",
      text: "",
    },
    idzdn: {
      title: t("rooms.auditorium.idzdn"),
      image: "",
      text: "",
    },
    khistory: {
      title: t("rooms.auditorium.khistory"),
      image: "",
      text: "",
    },kinternationalrelations: {
      title: t("rooms.auditorium.kinternationalrelations"),
      image: "",
      text: "",
    },

  };

   const roomEntry = roomInfo[room] || {};
   const title = roomEntry.title || humanizeRoomId(room);
   const image = roomEntry.image;
   const text = roomEntry.text;
   const features = roomEntry.features || [];
   const floor = getRoomFloor(room);
   const roomNumberMatch = room.match(/^a(\d+[a-z]?)$/i);
   const roomNumber = roomNumberMatch
     ? `№${roomNumberMatch[1].toUpperCase()}`
     : /^[p]\d+$/i.test(room)
       ? room.toUpperCase()
       : t("sidebar.notAssigned");
   const category = ADMIN_ROOMS.has(room)
     ? t("sidebar.categories.administration")
     : ECONOMIC_ROOMS.has(room)
       ? t("sidebar.categories.economic")
       : /^a\d/i.test(room) || /^p\d/i.test(room)
         ? t("sidebar.categories.auditorium")
         : t("sidebar.categories.service");
   const equipment = features.length
     ? features.map((feature) => t(`rooms.features.${feature}`)).join(", ")
     : t("sidebar.equipmentFallback");

   return (
    <aside className="sidebar" aria-label={t("sidebar.roomDetails")}>
      <button className="sheet-handle" onClick={closeSidebar} aria-label={t("sidebar.close")}>
        <span aria-hidden="true" />
      </button>
      <button className="close-btn" onClick={closeSidebar} aria-label={t("sidebar.close")}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
        </svg>
      </button>

      <div className="sidebar-scroll-content">
        <div className="room-hero">
          {image && !imageFailed ? (
            <img src={image} alt={title} onError={() => setImageFailed(true)} />
          ) : (
            <div className="room-photo-fallback" role="img" aria-label={t("sidebar.photoUnavailable")}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" />
                <circle cx="9" cy="9" r="1.5" />
                <path d="m5 17 4.5-4.5 3 3 2-2L20 19" />
              </svg>
              <span>{t("sidebar.photoUnavailable")}</span>
            </div>
          )}
          <span className="room-floor-chip">{floor === 1 ? t("floor.first") : t("floor.second")}</span>
        </div>

        <header className="room-card-header">
          <p className="room-category-eyebrow">{category}</p>
          <h2>{title}</h2>
        </header>

        <dl className="room-meta-grid">
          <div className="room-meta-item">
            <dt>{t("sidebar.roomNumber")}</dt>
            <dd>{roomNumber}</dd>
          </div>
          <div className="room-meta-item">
            <dt>{t("sidebar.category")}</dt>
            <dd>{category}</dd>
          </div>
          <div className="room-meta-item">
            <dt>{t("sidebar.floor")}</dt>
            <dd>{floor === 1 ? t("floor.first") : t("floor.second")}</dd>
          </div>
          <div className="room-meta-item room-meta-wide">
            <dt>{t("sidebar.equipment")}</dt>
            <dd>{equipment}</dd>
          </div>
          <div className="room-meta-item room-meta-wide">
            <dt>{t("sidebar.accessibility")}</dt>
            <dd>{t("sidebar.accessibilityFallback")}</dd>
          </div>
        </dl>

        <section className="room-description">
          <h3>{t("sidebar.about")}</h3>
          {text ? (
            <div className="sidebar-text" dangerouslySetInnerHTML={{ __html: text }} />
          ) : (
            <p className="room-description-fallback">{t("sidebar.descriptionFallback")}</p>
          )}
        </section>
      </div>

      <div className="sidebar-actions">
        <button className="route-here-btn" onClick={() => onRouteHere(room)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="6" r="2" />
            <path d="M8 18h3a3 3 0 0 0 3-3v-6a3 3 0 0 1 3-3" />
          </svg>
          {t("sidebar.routeHere")}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
