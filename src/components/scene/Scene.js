import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import InteractiveZone from "./InteractiveZone";
import { useGLTF } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import { useLoader } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import "./Scene.css";
import { bfs } from "../../navigation/pathfinding";
import RoutePath from "../../navigation/RoutePath";
import { Html, Billboard } from "@react-three/drei";
import { navigationNodes } from "../../navigation/navigationNodes";

const getNodeFloor = (nodeId, nodesObj) => {
    const node = nodesObj[nodeId];
    if (!node) return 1;
    const yCoord = node[1];
    return yCoord > 0.5 ? 2 : 1;
};

const FloorModel1 = () => {
    const { t } = useTranslation();
    const { scene, error, isLoading } = useGLTF(process.env.PUBLIC_URL + "/models/floor1.glb");
    const colorMap = useLoader(THREE.TextureLoader, "/textures/diffuse2.jpg");
    const normalMap = useLoader(THREE.TextureLoader, "/textures/normal2.jpg");
    const roughnessMap = useLoader(THREE.TextureLoader, "/textures/rought2.jpg");
    useEffect(() => {
        if (!scene) return;

        [colorMap, normalMap, roughnessMap].forEach((map) => {
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.repeat.set(8, 8);
        });

        scene.traverse((child) => {
            if (child.isMesh && child.name === "Cube030") {
                    child.material.map = colorMap;
                    child.material.normalMap = normalMap;
                    child.material.roughnessMap = roughnessMap;

                    child.material.needsUpdate = true;
                }

        });
}, [scene, colorMap, normalMap, roughnessMap]);

  if (error) {
    console.error("Error loading floor1 model:", error);
  }
  if (isLoading) {
    return <div>{t("floor.loadingFirst")}</div>;
  }
  return <primitive object={scene} scale={0.05} />;
};

const FloorModel2 = () => {
    const { t } = useTranslation();
    const { scene, error, isLoading } = useGLTF(process.env.PUBLIC_URL + "/models/floor2.glb");
    const colorMap = useLoader(THREE.TextureLoader, "/textures/diffuse.jpg");
    const normalMap = useLoader(THREE.TextureLoader, "/textures/normal_gl.jpg");
    const roughnessMap = useLoader(THREE.TextureLoader, "/textures/rough.jpg");

    useEffect(() => {
        if (!scene) return;
        [colorMap, normalMap, roughnessMap].forEach((map) => {
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.repeat.set(8, 8);
        });
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.map = colorMap;
                child.material.normalMap = normalMap;
                child.material.roughnessMap = roughnessMap;
                child.material.needsUpdate = true;
            }
        });
    }, [scene]);

  if (error) {
    console.error("Error loading floor2 model:", error);
  }
  if (isLoading) {
    return <div>{t("floor.loadingSecond")}</div>;
  }
  return <primitive object={scene} scale={0.05} />;
};

const MapIconMarker = ({ position, iconUrl, label, onClick, variant = "entrance" }) => {
    return (
        <group position={[position[0], position[1] + 0.2, position[2]]}>
            <Billboard follow={true}>
                <Html
                    center
                    distanceFactor={15}
                    style={{
                        pointerEvents: 'auto',
                        zIndex: 1
                    }}
                >
                    <div className={`modern-pin-container pin-variant-${variant}`} onClick={onClick}>
                        <div className="modern-pin">
                            <img src={iconUrl} alt={label} className="modern-pin-icon"/>
                        </div>
                        <div className="modern-pin-label">{label}</div>
                    </div>
                </Html>
            </Billboard>
        </group>
    );
};

const Scene = ({
                   setActiveRoom, activeRoom, activeFloor, onFloorChange, routeFrom, routeTo,
                   setRouteFrom,
                   setIsRouteMode,
                   setIsMenuOpen }) => {
  const [currentFloor, setCurrentFloor] = useState(activeFloor);
  const controlsRef = useRef();
  const [route, setRoute] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentFloor(activeFloor);
  }, [activeFloor]);

    useEffect(() => {
        if (!routeFrom || !routeTo) {
            setRoute(null);
            return;
        }
        const path = bfs(routeFrom, routeTo);
        setRoute(path);
    }, [routeFrom, routeTo]);

    const handleEntranceClick = (entranceId) => {
        setRouteFrom(entranceId);
        setIsRouteMode(true);
        setIsMenuOpen(true);
    };

  const renderInteractiveZones = () => {
    if (currentFloor === 1) {
      return (
        <>
          <InteractiveZone
            id="a1"
            modelPath="../models/a1.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a1")}
            isActive={activeRoom === "a1"}
          />
          <InteractiveZone
            modelPath="../models/a2.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a2")}
            isActive={activeRoom === "a2"}
          />
          <InteractiveZone
            modelPath="../models/a3.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a3")}
            isActive={activeRoom === "a3"}
          />
          <InteractiveZone
            modelPath="../models/a4.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a4")}
            isActive={activeRoom === "a4"}
          />
          <InteractiveZone
            modelPath="../models/a5.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a5")}
            isActive={activeRoom === "a5"}
          />
          <InteractiveZone
            modelPath="../models/a8.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a8")}
            isActive={activeRoom === "a8"}
          />
          <InteractiveZone
            modelPath="../models/a8a.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a8a")}
            isActive={activeRoom === "a8a"}
          />
          <InteractiveZone
            modelPath="../models/a15.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a15")}
            isActive={activeRoom === "a15"}
          />
          <InteractiveZone
            modelPath="../models/a16.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a16")}
            isActive={activeRoom === "a16"}
          />
          <InteractiveZone
            modelPath="../models/a17.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a17")}
            isActive={activeRoom === "a17"}
          />
          <InteractiveZone
            modelPath="../models/a24.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a24")}
            isActive={activeRoom === "a24"}
          />
          <InteractiveZone
            modelPath="../models/a25.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a25")}
            isActive={activeRoom === "a25"}
          />
          <InteractiveZone
            modelPath="../models/a34.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a34")}
            isActive={activeRoom === "a34"}
          />
          <InteractiveZone
            modelPath="../models/a35.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a35")}
            isActive={activeRoom === "a35"}
          />
          <InteractiveZone
            modelPath="../models/a36.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a36")}
            isActive={activeRoom === "a36"}
          />
          <InteractiveZone
            modelPath="../models/a46.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a46")}
            isActive={activeRoom === "a46"}
          />
          <InteractiveZone
            modelPath="../models/a47.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a47")}
            isActive={activeRoom === "a47"}
          />
          <InteractiveZone
            modelPath="../models/a48.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a48")}
            isActive={activeRoom === "a48"}
          />
          <InteractiveZone
            modelPath="../models/a49.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a49")}
            isActive={activeRoom === "a49"}
          />
          <InteractiveZone
            modelPath="../models/a50.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a50")}
            isActive={activeRoom === "a50"}
          />
          <InteractiveZone
            modelPath="../models/a51.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a51")}
            isActive={activeRoom === "a51"}
          />
          <InteractiveZone
            modelPath="../models/a53.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a53")}
            isActive={activeRoom === "a53"}
          />
          <InteractiveZone
            modelPath="../models/a54.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a54")}
            isActive={activeRoom === "a54"}
          />
          <InteractiveZone
            modelPath="../models/a55.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a55")}
            isActive={activeRoom === "a55"}
          />
          <InteractiveZone
            modelPath="../models/a56.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a56")}
            isActive={activeRoom === "a56"}
          />
          <InteractiveZone
            modelPath="../models/a57.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a57")}
            isActive={activeRoom === "a57"}
          />
          <InteractiveZone
            modelPath="../models/academiccouncil.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("academiccouncil")}
            isActive={activeRoom === "academiccouncil"}
          />
          <InteractiveZone
            modelPath="../models/assistantrector.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("assistantrector")}
            isActive={activeRoom === "assistantrector"}
          />
          <InteractiveZone
            modelPath="../models/atc.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("atc")}
            isActive={activeRoom === "atc"}
          />
          <InteractiveZone
            modelPath="../models/cafe.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("cafe")}
            isActive={activeRoom === "cafe"}
          />
          <InteractiveZone
            modelPath="../models/church.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("church")}
            isActive={activeRoom === "church"}
          />
          <InteractiveZone
            modelPath="../models/clerk.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("clerk")}
            isActive={activeRoom === "clerk"}
          />
          <InteractiveZone
            modelPath="../models/def.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("def")}
            isActive={activeRoom === "def"}
          />
          <InteractiveZone
            modelPath="../models/dekanef.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("dekanef")}
            isActive={activeRoom === "dekanef"}
          />
          <InteractiveZone
            modelPath="../models/dekanrgm.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("dekanrgm")}
            isActive={activeRoom === "dekanrgm"}
          />
          <InteractiveZone
            modelPath="../models/drgm.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("drgm")}
            isActive={activeRoom === "drgm"}
          />
          <InteractiveZone
            modelPath="../models/informdepartment.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("informdepartment")}
            isActive={activeRoom === "informdepartment"}
          />
          <InteractiveZone
            modelPath="../models/infotechnologycenter.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("infotechnologycenter")}
            isActive={activeRoom === "infotechnologycenter"}
          />
          <InteractiveZone
            modelPath="../models/kcyber.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kcyber")}
            isActive={activeRoom === "kcyber"}
          />
          <InteractiveZone
            modelPath="../models/kIEl.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kIEI")}
            isActive={activeRoom === "kIEI"}
          />
          <InteractiveZone
            modelPath="../models/kKryvytska.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kKryvytska")}
            isActive={activeRoom === "kKryvytska"}
          />
          <InteractiveZone
            modelPath="../models/kregionalstudies.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kregionalstudies")}
            isActive={activeRoom === "kregionalstudies"}
          />
          <InteractiveZone
            modelPath="../models/monastery.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("monastery")}
            isActive={activeRoom === "monastery"}
          />
          <InteractiveZone
            modelPath="../models/museum.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("museum")}
            isActive={activeRoom === "museum"}
          />
          <InteractiveZone
            modelPath="../models/museum(rector).glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("museum(rector)")}
            isActive={activeRoom === "museum(rector)"}
          />
          <InteractiveZone
            modelPath="../models/oldprints(1).glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("oldprints(1)")}
            isActive={activeRoom === "oldprints(1)"}
          />
          <InteractiveZone
            modelPath="../models/oldprints(2).glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("oldprints(2)")}
            isActive={activeRoom === "oldprints(2)"}
          />
          <InteractiveZone
            modelPath="../models/p1.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("p1")}
            isActive={activeRoom === "p1"}
          />
          <InteractiveZone
            modelPath="../models/p2.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("p2")}
            isActive={activeRoom === "p2"}
          />
          <InteractiveZone
            modelPath="../models/p5.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("p5")}
            isActive={activeRoom === "p5"}
          />
          <InteractiveZone
            modelPath="../models/prorector.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("prorector")}
            isActive={activeRoom === "prorector"}
          />
          <InteractiveZone
            modelPath="../models/rector.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("rector")}
            isActive={activeRoom === "rector"}
          />
          <InteractiveZone
            modelPath="../models/rectorsroom.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("rectorsroom")}
            isActive={activeRoom === "rectorsroom"}
          />
          <InteractiveZone
            modelPath="../models/studentdepartment.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("studentdepartment")}
            isActive={activeRoom === "studentdepartment"}
          />
          <InteractiveZone
            modelPath="../models/trainingclass.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("trainingclass")}
            isActive={activeRoom === "trainingclass"}
          />
          <InteractiveZone
            modelPath="../models/ViceRectorResearch.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("ViceRectorResearch")}
            isActive={activeRoom === "ViceRectorResearch"}
          />
          <InteractiveZone
            modelPath="../models/vivat.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("vivat")}
            isActive={activeRoom === "vivat"}
          />
        </>
      );
    } else if (currentFloor === 2) {
      return (
        <>
          <InteractiveZone
            modelPath="../models/a6.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a6")}
            isActive={activeRoom === "a6"}
          />
          <InteractiveZone
            modelPath="../models/a7.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a7")}
            isActive={activeRoom === "a7"}
          />
          <InteractiveZone
            modelPath="../models/a7a.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a7a")}
            isActive={activeRoom === "a7a"}
          />
          <InteractiveZone
            modelPath="../models/a9.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a9")}
            isActive={activeRoom === "a9"}
          />
          <InteractiveZone
            modelPath="../models/a10.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a10")}
            isActive={activeRoom === "a10"}
          />
          <InteractiveZone
            modelPath="../models/a11.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a11")}
            isActive={activeRoom === "a11"}
          />
          <InteractiveZone
            modelPath="../models/a12.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a12")}
            isActive={activeRoom === "a12"}
          />
          <InteractiveZone
            modelPath="../models/a13.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a13")}
            isActive={activeRoom === "a13"}
          />
          <InteractiveZone
            modelPath="../models/a14.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a14")}
            isActive={activeRoom === "a14"}
          />
          <InteractiveZone
            modelPath="../models/a18.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a18")}
            isActive={activeRoom === "a18"}
          />
          <InteractiveZone
            modelPath="../models/a19.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a19")}
            isActive={activeRoom === "a19"}
          />
          <InteractiveZone
            modelPath="../models/a20.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a20")}
            isActive={activeRoom === "a20"}
          />
          <InteractiveZone
            modelPath="../models/a21.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a21")}
            isActive={activeRoom === "a21"}
          />
          <InteractiveZone
            modelPath="../models/a22.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a22")}
            isActive={activeRoom === "a22"}
          />
          <InteractiveZone
            modelPath="../models/a23.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a23")}
            isActive={activeRoom === "a23"}
          />
          <InteractiveZone
            modelPath="../models/a29.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a29")}
            isActive={activeRoom === "a29"}
          />
          <InteractiveZone
            modelPath="../models/a30.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a30")}
            isActive={activeRoom === "a30"}
          />
          <InteractiveZone
            modelPath="../models/a31.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a31")}
            isActive={activeRoom === "a31"}
          />
          <InteractiveZone
            modelPath="../models/a32.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a32")}
            isActive={activeRoom === "a32"}
          />
          <InteractiveZone
            modelPath="../models/a38.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a38")}
            isActive={activeRoom === "a38"}
          />
          <InteractiveZone
            modelPath="../models/a39.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a39")}
            isActive={activeRoom === "a39"}
          />
          <InteractiveZone
            modelPath="../models/a41.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a41")}
            isActive={activeRoom === "a41"}
          />
          <InteractiveZone
            modelPath="../models/a43.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a43")}
            isActive={activeRoom === "a43"}
          />
          <InteractiveZone
            modelPath="../models/a61.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a61")}
            isActive={activeRoom === "a61"}
          />
          <InteractiveZone
            modelPath="../models/a62.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a62")}
            isActive={activeRoom === "a62"}
          />
          <InteractiveZone
            modelPath="../models/a63.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a63")}
            isActive={activeRoom === "a63"}
          />
          <InteractiveZone
            modelPath="../models/a64.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a64")}
            isActive={activeRoom === "a64"}
          />
          <InteractiveZone
            modelPath="../models/a65.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a65")}
            isActive={activeRoom === "a65"}
          />
          <InteractiveZone
            modelPath="../models/a66.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a66")}
            isActive={activeRoom === "a66"}
          />
          <InteractiveZone
            modelPath="../models/a67.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a67")}
            isActive={activeRoom === "a67"}
          />
          <InteractiveZone
            modelPath="../models/a68.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a68")}
            isActive={activeRoom === "a68"}
          />
          <InteractiveZone
            modelPath="../models/a69.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a69")}
            isActive={activeRoom === "a69"}
          />
          <InteractiveZone
            modelPath="../models/a70.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a70")}
            isActive={activeRoom === "a70"}
          />
          <InteractiveZone
            modelPath="../models/a71.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a71")}
            isActive={activeRoom === "a71"}
          />
          <InteractiveZone
            modelPath="../models/a72.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a72")}
            isActive={activeRoom === "a72"}
          />
          <InteractiveZone
            modelPath="../models/a73.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a73")}
            isActive={activeRoom === "a73"}
          />
          <InteractiveZone
            modelPath="../models/a74.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("a74")}
            isActive={activeRoom === "a74"}
          />
          <InteractiveZone
            modelPath="../models/careercounselor.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("careercounselor")}
            isActive={activeRoom === "careercounselor"}
          />
          <InteractiveZone
            modelPath="../models/hall.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("hall")}
            isActive={activeRoom === "hall"}
          />
          <InteractiveZone
            modelPath="../models/idzdn.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("idzdn")}
            isActive={activeRoom === "idzdn"}
          />
          <InteractiveZone
            modelPath="../models/kf.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kf")}
            isActive={activeRoom === "kf"}
          />
          <InteractiveZone
            modelPath="../models/khistory.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("khistory")}
            isActive={activeRoom === "khistory"}
          />
          <InteractiveZone
            modelPath="../models/kinternationalrelations.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kinternationalrelations")}
            isActive={activeRoom === "kinternationalrelations"}
          />
          <InteractiveZone
            modelPath="../models/kL.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kL")}
            isActive={activeRoom === "kL"}
          />
          <InteractiveZone
            modelPath="../models/kpolit.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kpolit")}
            isActive={activeRoom === "kpolit"}
          />
          <InteractiveZone
            modelPath="../models/kreligions.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("kreligions")}
            isActive={activeRoom === "kreligions"}
          />
          <InteractiveZone
            modelPath="../models/loft.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("loft")}
            isActive={activeRoom === "loft"}
          />
          <InteractiveZone
            modelPath="../models/methoddepartment.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("methoddepartment")}
            isActive={activeRoom === "methoddepartment"}
          />
          <InteractiveZone
            modelPath="../models/monastery.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("monastery")}
            isActive={activeRoom === "monastery"}
          />
          <InteractiveZone
            modelPath="../models/p3.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("p3")}
            isActive={activeRoom === "p3"}
          />
          <InteractiveZone
            modelPath="../models/p4.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("p4")}
            isActive={activeRoom === "p4"}
          />
          <InteractiveZone
            modelPath="../models/skladtzn.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("skladtzn")}
            isActive={activeRoom === "skladtzn"}
          />
          <InteractiveZone
            modelPath="../models/tzn.glb"
            position={[0, 0, 0]}
            color="#e88d33"
            onClick={() => setActiveRoom("tzn")}
            isActive={activeRoom === "tzn"}
          />
            <InteractiveZone
                modelPath="../models/vivat.glb"
                position={[0, 0, 0]}
                color="#e88d33"
                onClick={() => setActiveRoom("vivat")}
                isActive={activeRoom === "vivat"}
            />
        </>
      );
    }
  };
    const zoomIn = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyIn(1.2);
            controlsRef.current.update();
        }
    };

    const zoomOut = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyOut(1.2);
            controlsRef.current.dollyOut(1.2);
            controlsRef.current.update();
        }
    };
  return (
      <div style={{position: "relative", height: "100vh"}}>
          <div className="button-container">
              <button
                  className={`floor-button ${currentFloor === 1 ? "active" : ""}`}
                  onClick={() => onFloorChange(1)}>
                  {t("floor.first")}
              </button>
              <button
                  className={`floor-button ${currentFloor === 2 ? "active" : ""}`}
                  onClick={() => onFloorChange(2)}>
                  {t("floor.second")}
              </button>
          </div>

          <Canvas style={{height: "100vh", position: "relative", zIndex: 1}}  camera={{ position: [0, 15, 20], fov: 50 }} >
             <color attach="background" args={["#e3d7c9"]}/>
              <ambientLight intensity={0.5}/>
              <directionalLight position={[10, 10, 5]}/>
              <group visible={currentFloor === 1}>
                  <FloorModel1/>
              </group>
              <group visible={currentFloor === 2}>
                  <FloorModel2/>
              </group>
              {renderInteractiveZones()}

              {currentFloor === 1 && (
                  <>
                     <MapIconMarker
                          position={[8, 0.7, 8.5]}
                          iconUrl="/icon/exit.png"
                          label={t("labels.main_entrance")}
                          onClick={() => handleEntranceClick("main_entrance")}
                      />
                      <MapIconMarker
                          position={[10.7, 0.7, 2.2]}
                          iconUrl="/icon/exit.png"
                          label={t("labels.side_entrance_1")}
                          onClick={() => handleEntranceClick("side_entrance_1")}
                      />
                      <MapIconMarker
                          position={[2, 0.7, 6]}
                          iconUrl="/icon/exit.png"
                          label={t("labels.side_entrance_2")}
                          onClick={() => handleEntranceClick("side_entrance_2")}
                      />
                      <MapIconMarker
                          position={[-4, 0.7, 6.5]}
                          iconUrl="/icon/exit.png"
                          label={t("labels.side_entrance_3")}
                          onClick={() => handleEntranceClick("side_entrance_3")}
                      />
                      <MapIconMarker
                          position={[13.2, 0.7, -16.5]}
                          iconUrl="/icon/exit.png"
                          label={t("labels.side_entrance_4")}
                          onClick={() => handleEntranceClick("side_entrance_4")}
                      />
                      <MapIconMarker
                          position={[9, 0.7, -18.5]}
                          iconUrl="/icon/exit.png"
                          label={t("labels.side_entrance_5")}
                          onClick={() => handleEntranceClick("side_entrance_5")}
                      />
                      <MapIconMarker position={[10.5, 0.7, 13.8]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[7, 0.7, 5.5]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[12.5, 0.7, 0]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[12.5, 0.7, -7]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[10.2, 0.7, -13.5]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[10.5, 0.7, -19]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                     <MapIconMarker position={[4, 0.7, 5.5]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                </>
              )}

              {currentFloor === 2 && (
                  <>
                      <MapIconMarker position={[10.5, 0.9, 13.8]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[7, 0.9, 5.5]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[12.5, 0.9, 0]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[12.5, 0.9, -7]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[10.2, 0.9, -13.5]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[10.5, 0.9, -19]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[4, 0.9, 5.5]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[-2.2, 0.9, -1]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />
                      <MapIconMarker position={[-5.5, 0.9, -1]} iconUrl="/icon/stairs.png" label={t("labels.stairs")} onClick={() => onFloorChange(2)} variant="stairs" />

                  </>
              )}

              {(() => {
                  if (!route || route.length === 0) return null;
                  const currentFloorNodes = route.filter(nodeId => getNodeFloor(nodeId, navigationNodes) === currentFloor);
                  if (currentFloorNodes.length < 2) return null;
                  const pathCoordinates = currentFloorNodes.map(nodeId => {
                      const coords = navigationNodes[nodeId];
                      if (!coords) return [0, 0, 0];
                      return [coords[0], coords[1] + 0.02, coords[2]];
                  });

                  const isStartOnThisFloor = getNodeFloor(route[0], navigationNodes) === currentFloor;
                  const isEndOnThisFloor = getNodeFloor(route[route.length - 1], navigationNodes) === currentFloor;

                  return (
                      <RoutePath
                          path={pathCoordinates}
                          showStartCircle={isStartOnThisFloor}
                          showEndPin={isEndOnThisFloor}
                      />
                  );
              })()}

              <CameraControls ref={controlsRef}/>
          </Canvas>
          <div style={{
              position: "absolute",
              left: 20,
              bottom: 80,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
          }}>
              <div className="zoom-controls">
                  <button className="zoom-button" onClick={zoomIn} aria-label="Zoom in">-</button>
                  <button className="zoom-button" onClick={zoomOut} aria-label="Zoom out">+</button>
              </div>
          </div>
      </div>
  );
};

export default Scene;
