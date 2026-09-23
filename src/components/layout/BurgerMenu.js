import React, { useState, useEffect } from "react";
import "./BurgerMenu.css";
import { useTranslation } from "react-i18next";
import { bfs } from "../../navigation/pathfinding";
import { analyzeRoute } from "../../navigation/routeUtils";

const MenuIcon = ({ type }) => {
  const paths = {
    classrooms: <><path d="M4 5h16v11H4z"/><path d="M8 20h8M12 16v4"/><path d="M8 9h8M8 12h5"/></>,
    admin: <><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-5h6v5M8 10h.01M12 10h.01M16 10h.01"/></>,
    museums: <><path d="m3 9 9-5 9 5"/><path d="M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16"/></>,
    cafes: <><path d="M5 8h11v5a5 5 0 0 1-10 0z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2M7 4v2M11 4v2M15 4v2M4 20h15"/></>,
    facilities: <><path d="M4 7h16v12H4z"/><path d="M8 7V4h8v3M8 11h8M8 15h5"/></>,
  };

  return <svg className="menu-type-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[type] || paths.facilities}</svg>;
};

const classifyRoom = (roomId, adminIds) => {
  if (adminIds.has(roomId) || ["dekanrgm", "drgm", "studentdepartment", "clerk", "careercounselor"].includes(roomId)) return "admin";
  if (/^a\d/i.test(roomId) || roomId === "trainingclass") return "classrooms";
  if (["museum", "oldprints(1)", "oldprints(2)", "church", "monastery", "hall"].includes(roomId)) return "museums";
  if (["cafe", "vivat"].includes(roomId)) return "cafes";
  return "facilities";
};

const BurgerMenu = ({
                      onRoomClick,
                      onCreateRoute,
                      isMenuOpen,
                      setIsMenuOpen,
                      isRouteMode,
                      setIsRouteMode,
                      routeFrom,
                      setRouteFrom,
                      routeTo,
                      setRouteTo,
                      selectedRoom
                    }) => {
  const [openSections, setOpenSections] = useState({
    admin: false,
    classrooms: false,
    museums: false,
    cafes: false,
    facilities: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { i18n, t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const rooms = React.useMemo(() => ({
    admin: [
      { id: "rector", name: t("rooms.admin.rector") },
      { id: "academiccouncil", name: t("rooms.admin.academiccouncil") },
      { id: "prorector", name: t("rooms.admin.prorector") },
      { id: "assistantrector", name: t("rooms.admin.assistantrector") },
      { id: "rectorsroom", name: t("rooms.admin.rectorsroom") },
      { id: "ViceRectorResearch", name: t("rooms.admin.ViceRectorResearch") },
    ],
    economic: [
      { id: "dekanat_economic", name: t("rooms.economic.dekanat_economic") },
      { id: "dekan_economic", name: t("rooms.economic.dekan_economic") },
    ],
    auditorium: [
      { id: "a1", name: t("rooms.auditorium.a1") },
      { id: "a2", name: t("rooms.auditorium.a2") },
      { id: "a3", name: t("rooms.auditorium.a3") },
      { id: "a4", name: t("rooms.auditorium.a4") },
      { id: "a5", name: t("rooms.auditorium.a5") },
      { id: "a6", name: t("rooms.auditorium.a6") },
      { id: "a8", name: t("rooms.auditorium.a8") },
      { id: "a8a", name: t("rooms.auditorium.a8a") },
      { id: "a10", name: t("rooms.auditorium.a10") },
      { id: "a15", name: t("rooms.auditorium.a15") },
      { id: "a16", name: t("rooms.auditorium.a16") },
      { id: "a17", name: t("rooms.auditorium.a17") },
      { id: "a24", name: t("rooms.auditorium.a24") },
      { id: "a25", name: t("rooms.auditorium.a25") },
      { id: "a34", name: t("rooms.auditorium.a34") },
      { id: "a35", name: t("rooms.auditorium.a35") },
      { id: "a36", name: t("rooms.auditorium.a36") },
      { id: "a19", name: t("rooms.auditorium.a19") },
      { id: "a46", name: t("rooms.auditorium.a46") },
      { id: "a47", name: t("rooms.auditorium.a47") },
      { id: "a48", name: t("rooms.auditorium.a48") },
      { id: "a49", name: t("rooms.auditorium.a49") },
      { id: "a50", name: t("rooms.auditorium.a50") },
      { id: "a51", name: t("rooms.auditorium.a51") },
      { id: "a53", name: t("rooms.auditorium.a53") },
      { id: "a54", name: t("rooms.auditorium.a54") },
      { id: "a55", name: t("rooms.auditorium.a55") },
      { id: "a56", name: t("rooms.auditorium.a56") },
      { id: "a57", name: t("rooms.auditorium.a57") },
      { id: "atc", name: t("rooms.auditorium.atc") },
      { id: "cafe", name: t("rooms.auditorium.cafe") },
      { id: "church", name: t("rooms.auditorium.church") },
      { id: "dekanrgm", name: t("rooms.auditorium.dekanrgm") },
      { id: "drgm", name: t("rooms.auditorium.drgm") },
      { id: "emit", name: t("rooms.auditorium.emit") },
      { id: "informdepartment", name: t("rooms.auditorium.informdepartment") },
      { id: "infotechnologycenter", name: t("rooms.auditorium.infotechnologycenter") },
      { id: "kIEI", name: t("rooms.auditorium.kIEI") },
      { id: "kKryvytska", name: t("rooms.auditorium.kKryvytska") },
      { id: "kregionalstudies", name: t("rooms.auditorium.kregionalstudies") },
      { id: "monastery", name: t("rooms.auditorium.monastery") },
      { id: "museum", name: t("rooms.auditorium.museum") },
      { id: "oldprints(1)", name: t("rooms.auditorium.oldprints1") },
      { id: "oldprints(2)", name: t("rooms.auditorium.oldprints2") },
      { id: "p1", name: t("rooms.auditorium.p1") },
      { id: "p2", name: t("rooms.auditorium.p2") },
      { id: "p3", name: t("rooms.auditorium.p3") },
      { id: "studentdepartment", name: t("rooms.auditorium.studentdepartment") },
      { id: "trainingclass", name: t("rooms.auditorium.trainingclass") },
      { id: "a7", name: t("rooms.auditorium.a7") },
      { id: "a7а", name: t("rooms.auditorium.a7a") },
      { id: "a14", name: t("rooms.auditorium.a14") },
      { id: "a18", name: t("rooms.auditorium.a18") },
      { id: "a20", name: t("rooms.auditorium.a20") },
      { id: "a21", name: t("rooms.auditorium.a21") },
      { id: "a22", name: t("rooms.auditorium.a22") },
      { id: "a23", name: t("rooms.auditorium.a23") },
      { id: "a29", name: t("rooms.auditorium.a29") },
      { id: "a30", name: t("rooms.auditorium.a30") },
      { id: "a31", name: t("rooms.auditorium.a31") },
      { id: "a32", name: t("rooms.auditorium.a32") },
      { id: "a38", name: t("rooms.auditorium.a38") },
      { id: "a39", name: t("rooms.auditorium.a39") },
      { id: "a41", name: t("rooms.auditorium.a41") },
      { id: "a43", name: t("rooms.auditorium.a43") },
      { id: "a61", name: t("rooms.auditorium.a61") },
      { id: "a62", name: t("rooms.auditorium.a62") },
      { id: "a63", name: t("rooms.auditorium.a63") },
      { id: "a64", name: t("rooms.auditorium.a64") },
      { id: "a65", name: t("rooms.auditorium.a65") },
      { id: "a66", name: t("rooms.auditorium.a66") },
      { id: "a67", name: t("rooms.auditorium.a67") },
      { id: "a68", name: t("rooms.auditorium.a68") },
      { id: "a69", name: t("rooms.auditorium.a69") },
      { id: "a70", name: t("rooms.auditorium.a70") },
      { id: "a71", name: t("rooms.auditorium.a71") },
      { id: "a72", name: t("rooms.auditorium.a72") },
      { id: "a73", name: t("rooms.auditorium.a73") },
      { id: "a74", name: t("rooms.auditorium.a74") },
      { id: "kf", name: t("rooms.auditorium.kf") },
      { id: "p4", name: t("rooms.auditorium.p4") },
      { id: "hall", name: t("rooms.auditorium.hall") },
      { id: "loft", name: t("rooms.auditorium.loft") },
      { id: "skladtzn", name: t("rooms.auditorium.skladtzn") },
      { id: "tzn", name: t("rooms.auditorium.tzn") },
      { id: "kpolit", name: t("rooms.auditorium.kpolit") },
      { id: "kreligions", name: t("rooms.auditorium.kreligions") },
      { id: "careercounselor", name: t("rooms.auditorium.careercounselor") },
      { id: "idzdn", name: t("rooms.auditorium.idzdn") },
      { id: "khistory", name: t("rooms.auditorium.khistory") },
      { id: "kinternationalrelations", name: t("rooms.auditorium.kinternationalrelations") },
      { id: "p5", name: t("rooms.auditorium.p5") },
      { id: "vivat", name: t("rooms.admin.vivat") },
      { id: "clerk", name: t("rooms.auditorium.clerk") },
      { id: "a12", name: t("rooms.auditorium.a12") },
      { id: "a11", name: t("rooms.auditorium.a11") },
      { id: "a13", name: t("rooms.auditorium.a13") },
      { id: "a9", name: t("rooms.auditorium.a9") },
    ]
  }), [t]);

  const hiddenEntrances = React.useMemo(() => [
    { id: "main_entrance", name: t("entrances.main_entrance") },
    { id: "side_entrance_1", name: t("entrances.side_entrance_1") },
    { id: "side_entrance_2", name: t("entrances.side_entrance_2") },
    { id: "side_entrance_3", name: t("entrances.side_entrance_3") },
    { id: "side_entrance_4", name: t("entrances.side_entrance_4") },
    { id: "side_entrance_5", name: t("entrances.side_entrance_5") },
  ], [t]);


  const allRooms = React.useMemo(() => {
    return [...Object.values(rooms).flat(), ...hiddenEntrances];
  }, [rooms, hiddenEntrances]);

  const categorizedRooms = React.useMemo(() => {
    const adminIds = new Set([...rooms.admin, ...rooms.economic].map((room) => room.id));
    return allRooms.map((room) => ({
      ...room,
      category: classifyRoom(room.id, adminIds),
    }));
  }, [allRooms, rooms.admin, rooms.economic]);

  const roomGroups = React.useMemo(() => categorizedRooms.reduce((groups, room) => {
    groups[room.category].push(room);
    return groups;
  }, { admin: [], classrooms: [], museums: [], cafes: [], facilities: [] }), [categorizedRooms]);

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase(i18n.language);
  const searchResults = React.useMemo(() => {
    if (!normalizedSearch) return [];
    return categorizedRooms.filter((room) => room.name.toLocaleLowerCase(i18n.language).includes(normalizedSearch));
  }, [categorizedRooms, normalizedSearch, i18n.language]);

  const sectionOrder = ["classrooms", "admin", "museums", "cafes", "facilities"];

  const routeSummary = React.useMemo(() => {
    if (!routeFrom || !routeTo) return null;
    return analyzeRoute(bfs(routeFrom, routeTo));
  }, [routeFrom, routeTo]);

  const handleRoomSelection = (roomId) => {
    if (!isRouteMode) {
      onRoomClick(roomId);
      setIsMenuOpen(false);
      return;
    }

    if (!routeFrom) {
      setRouteFrom(roomId);
      onCreateRoute(roomId, routeTo);
    } else if (!routeTo) {
      setRouteTo(roomId);
      onCreateRoute(routeFrom, roomId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".burger-menu") && !event.target.closest(".burger-toggle")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsMenuOpen]);

  return (
      <div className="top-controls">
        <button className="burger-toggle" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? (
              <svg className="burger-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
          ) : (
              <svg className="burger-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
          )}
        </button>

        {isMenuOpen && (
            <div className="burger-menu">
              <div className="language-switcher">
                <button className={i18n.language === "ua" ? "active" : ""} onClick={() => i18n.changeLanguage("ua")}>UA</button>
                <button className={i18n.language === "en" ? "active" : ""} onClick={() => i18n.changeLanguage("en")}>EN</button>
              </div>

              <div className="menu-primary-tools">
                <div className="search-wrapper">
                  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input type="search" placeholder={t("rooms.placeholder")} className="search-input" value={searchTerm} onChange={handleSearchChange} />
                </div>

              {!isRouteMode && (
                  <button className="route-mode-btn" onClick={() => {
                    setIsRouteMode(true);
                    setRouteFrom(null);
                    setRouteTo(null);
                    onCreateRoute(null, null);
                  }}>
                    {t("route.create")}
                  </button>
              )}

              {isRouteMode && (
                  <div className="modern-route-card">
                    <div className="route-timeline-wrapper">
                      <div className="route-visual-line">
                        <div className="circle-from"></div>
                        <div className="connecting-line"></div>
                        <div className="circle-to"></div>
                      </div>

                      <div className="route-text-fields">
                        <div className="route-field-group">
                          <span className="field-label">{t("route.from")}</span>
                          <p className={routeFrom ? "point-filled" : "point-empty"}>
                            {routeFrom ? allRooms.find(r => r.id === routeFrom)?.name || routeFrom : t("route.chooseFrom")}
                          </p>
                        </div>

                        <div className="route-field-group">
                          <span className="field-label">{t("route.to")}</span>
                          <p className={routeTo ? "point-filled" : "point-empty"}>
                            {routeTo ? allRooms.find(r => r.id === routeTo)?.name || routeTo : t("route.chooseTo")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {routeSummary && (
                      <div className="route-summary" aria-label={t("route.summary")}>
                        <div className="route-summary-item">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>
                          <span>{t("route.walkingTime")}</span>
                          <strong>{t("route.minutes", { count: routeSummary.walkingMinutes })}</strong>
                        </div>
                        <div className="route-summary-item">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17h3v-3h4v-4h3V7"/><path d="m14 7 3-3 3 3"/></svg>
                          <span>{t("route.floorChangesLabel")}</span>
                          <strong>{routeSummary.floorChanges}</strong>
                        </div>
                        <div className="route-summary-item">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18h4v-4h4v-4h4V6h3"/></svg>
                          <span>{t("route.stairsLabel")}</span>
                          <strong>{routeSummary.staircases}</strong>
                        </div>
                      </div>
                    )}

                    <button className="modern-cancel-route-btn" onClick={() => {
                      setIsRouteMode(false);
                      setRouteFrom(null);
                      setRouteTo(null);
                      onCreateRoute(null, null);
                    }}>
                      {t("route.cancel")}
                    </button>
                  </div>
              )}
              </div>

              {normalizedSearch ? (
                <div className="search-results" aria-live="polite">
                  <div className="search-results-heading">
                    <span>{t("rooms.searchResults")}</span>
                    <strong>{searchResults.length}</strong>
                  </div>
                  {searchResults.length > 0 ? searchResults.map((room) => (
                    <button
                      key={room.id}
                      className={`search-result-btn ${selectedRoom === room.id ? "selected" : ""}`}
                      onClick={() => handleRoomSelection(room.id)}
                    >
                      <span className={`menu-icon-shell icon-${room.category}`}><MenuIcon type={room.category} /></span>
                      <span className="search-result-copy">
                        <strong>{room.name}</strong>
                        <small>{t(`rooms.sections.${room.category}`)}</small>
                      </span>
                      <svg className="result-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                    </button>
                  )) : <p className="search-empty">{t("rooms.noResults")}</p>}
                </div>
              ) : sectionOrder.map((section) => {
                const isOpen = openSections[section];
                return (
                    <div className="menu-section" key={section}>
                      <button className={`accordion-toggle ${isOpen ? "active" : ""}`} onClick={() => toggleSection(section)}>
                        <span className={`menu-icon-shell icon-${section}`}><MenuIcon type={section} /></span>
                        <span className="category-label">{t(`rooms.sections.${section}`)}</span>
                        <span className="category-count">{roomGroups[section].length}</span>
                        <svg className="accordion-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {isOpen && (
                          <div className="accordion-content">
                            {roomGroups[section].map((room) => (
                                    <button key={room.id}
                                            className={`room-btn ${selectedRoom === room.id ? "selected" : ""}`}
                                            onClick={() => handleRoomSelection(room.id)}>
                                      {room.name}
                                    </button>
                                ))}
                          </div>
                      )}
                    </div>
                );
              })}
            </div>
        )}
      </div>
  );
};

export default BurgerMenu;
