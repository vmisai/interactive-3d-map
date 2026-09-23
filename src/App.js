import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import LoadingScreen from "./components/loading/LoadingScreen";
import Footer from "./components/layout/Footer";
import Scene from "./components/scene/Scene";
import Sidebar from "./components/sidebar/Sidebar";
import BurgerMenu from "./components/layout/BurgerMenu";
import MapTutorial from "./components/tutorial/MapTutorial";

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeFloor, setActiveFloor] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [routeFrom, setRouteFrom] = useState(null);
  const [routeTo, setRouteTo] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleAssetsReady = useCallback(() => setAssetsReady(true), []);
  const handleLoadingFinished = useCallback(() => setShowLoadingScreen(false), []);

  useEffect(() => {
    if (showLoadingScreen || !assetsReady || window.localStorage.getItem("map-tutorial-complete-v1")) return undefined;
    const timer = window.setTimeout(() => setShowTutorial(true), 420);
    return () => window.clearTimeout(timer);
  }, [assetsReady, showLoadingScreen]);

  const finishTutorial = useCallback(() => {
    window.localStorage.setItem("map-tutorial-complete-v1", "true");
    setShowTutorial(false);
  }, []);

  const closeSidebar = () => setActiveRoom(null);

  const handleCreateRoute = (from, to) => {
    setRouteFrom(from);
    setRouteTo(to);
  };

  const handleRouteHere = (roomId) => {
    setRouteFrom(null);
    setRouteTo(roomId);
    setIsRouteMode(true);
    setIsMenuOpen(true);
    setActiveRoom(null);
  };

  return (
    <Router>
      <div className="App">
        <div className={`map-app-content ${assetsReady ? "is-ready" : ""} ${activeRoom ? "has-room-panel" : ""}`} aria-hidden={showLoadingScreen}>
            <BurgerMenu
                onRoomClick={setActiveRoom}
                selectedRoom={activeRoom}
                onCreateRoute={handleCreateRoute}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                isRouteMode={isRouteMode}
                setIsRouteMode={setIsRouteMode}
                routeFrom={routeFrom}
                setRouteFrom={setRouteFrom}
                routeTo={routeTo}
                setRouteTo={setRouteTo}
            />
            <Scene
                setActiveRoom={setActiveRoom}
                activeRoom={activeRoom}
                activeFloor={activeFloor}
                onFloorChange={setActiveFloor}
                routeFrom={routeFrom}
                routeTo={routeTo}
                setRouteFrom={setRouteFrom}
                setIsRouteMode={setIsRouteMode}
                setIsMenuOpen={setIsMenuOpen}
            />
            <Sidebar
                room={activeRoom}
                closeSidebar={closeSidebar}
                onRouteHere={handleRouteHere}
            />
            <Footer />
            {showTutorial && <MapTutorial onClose={finishTutorial} />}
        </div>
        {showLoadingScreen && (
          <LoadingScreen
            onReady={handleAssetsReady}
            onFinished={handleLoadingFinished}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
