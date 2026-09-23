import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingScreen from "./components/loading/LoadingScreen";
import Footer from "./components/layout/Footer";
import Scene from "./components/scene/Scene";
import Sidebar from "./components/sidebar/Sidebar";
import BurgerMenu from "./components/layout/BurgerMenu";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeFloor, setActiveFloor] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [routeFrom, setRouteFrom] = useState(null);
  const [routeTo, setRouteTo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
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
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
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
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
