import React from "react";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";

const Sidebar = ({ room, closeSidebar }) => {

  const { t, i18n } = useTranslation();
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
      title: "rooms.auditorium.clerk",
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

   const { title, image, text, features = [] } = roomInfo[room] || {};

   return (
    <div className="sidebar">
      <button className="close-btn" onClick={closeSidebar} aria-label="Close sidebar">
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
  </svg>
</button>

      {title && <h2>{title}</h2>}
      {features.length > 0 && (
          <div className="sidebar-features">
            {features.includes("projector") && (
                <span className="feature-badge badge-projector">
              <svg className="badge-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12h20M2 16h20M6 12v4M18 12v4M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8zM7 19h10" />
              </svg>
                  {t("rooms.features.projector")}
            </span>
            )}
            {features.includes("pc") && (
                <span className="feature-badge badge-pc">
              <svg className="badge-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="12" rx="2" />
                <path d="M12 15v4M7 21h10" />
              </svg>
                  {t("rooms.features.pc")}
            </span>
            )}
          </div>
      )}
      {image && <img src={image} alt={title} />}
      {text && (
        <div
          className="sidebar-text"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
};

export default Sidebar;
