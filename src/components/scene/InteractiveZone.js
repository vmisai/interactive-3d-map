import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTranslation } from "react-i18next";
import * as THREE from "three";
import { FloorInteractionContext } from "./SceneEffects";

const IDLE_COLOR = new THREE.Color("#39434c");
const HOVER_COLOR = new THREE.Color("#2d8290");

const ADMIN_ROOMS = new Set([
  "rector",
  "academiccouncil",
  "prorector",
  "assistantrector",
  "rectorsroom",
  "ViceRectorResearch",
  "vivat",
]);

const ROOM_ALIASES = {
  def: "dekanat_economic",
  dekanef: "dekan_economic",
  kIEl: "kIEI",
  kcyber: "cybernetics",
  "museum(rector)": "museum",
  "oldprints(1)": "oldprints1",
  "oldprints(2)": "oldprints2",
};

const SECTION_LABELS = new Set(["idzdn", "khistory", "kinternationalrelations"]);

const getModelId = (modelPath) => {
  const fileName = modelPath.split("/").pop() || "";
  return fileName.replace(/\.glb$/i, "");
};

const humanizeRoomId = (roomId) => roomId
  .replace(/[()]/g, " ")
  .replace(/[_-]+/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const InteractiveZone = ({ modelPath, position, onClick, isActive, color }) => {
  const { t } = useTranslation();
  const isFloorInteractive = useContext(FloorInteractionContext);
  const cleanPath = modelPath.replace(/^(\.\.\/|\.\/)/, "/");
  const { scene } = useGLTF(process.env.PUBLIC_URL + cleanPath);
  const roomScene = useMemo(() => scene.clone(true), [scene]);
  const highlightOpacity = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const selectedColor = useMemo(() => new THREE.Color(color || "#e8a261"), [color]);

  const roomId = useMemo(() => getModelId(modelPath), [modelPath]);
  const translationId = ROOM_ALIASES[roomId] || roomId;
  const roomLabel = (() => {
    const fallback = humanizeRoomId(translationId);

    if (ADMIN_ROOMS.has(translationId)) {
      return t(`rooms.admin.${translationId}`, { defaultValue: fallback });
    }
    if (translationId === "dekanat_economic" || translationId === "dekan_economic") {
      return t(`rooms.economic.${translationId}`, { defaultValue: fallback });
    }
    if (SECTION_LABELS.has(translationId)) {
      return t(`rooms.sections.${translationId}`, { defaultValue: fallback });
    }
    return t(`rooms.auditorium.${translationId}`, { defaultValue: fallback });
  })();

  const labelPosition = useMemo(() => {
    const box = new THREE.Box3().setFromObject(roomScene);
    const center = box.getCenter(new THREE.Vector3());
    return [center.x, box.max.y + 7, center.z];
  }, [roomScene]);

  useEffect(() => {
    roomScene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshStandardMaterial({
        color: IDLE_COLOR,
        roughness: 0.72,
        metalness: 0.02,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      child.material.userData.baseOpacity = 0;
    });

    return () => {
      roomScene.traverse((child) => {
        if (child.isMesh) child.material?.dispose();
      });
    };
  }, [roomScene]);

  useEffect(() => () => {
    document.body.style.cursor = "default";
  }, []);

  useEffect(() => {
    roomScene.traverse((child) => {
      if (!child.isMesh) return;
      if (!child.userData.interactiveRaycast) {
        child.userData.interactiveRaycast = child.raycast;
      }
      child.raycast = isFloorInteractive
        ? child.userData.interactiveRaycast
        : () => null;
    });

    if (!isFloorInteractive) setIsHovered(false);
  }, [roomScene, isFloorInteractive]);

  useFrame(({ clock }, delta) => {
    const pulse = Math.sin(clock.elapsedTime * 2.6) * 0.055;
    const targetOpacity = isActive ? 0.5 + pulse : isHovered ? 0.25 : 0.065;
    const targetColor = isActive ? selectedColor : isHovered ? HOVER_COLOR : IDLE_COLOR;

    highlightOpacity.current = THREE.MathUtils.damp(
      highlightOpacity.current,
      targetOpacity,
      isActive ? 6 : 10,
      delta
    );

    roomScene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      child.material.userData.baseOpacity = highlightOpacity.current;
      child.material.color.lerp(targetColor, 1 - Math.exp(-9 * delta));
      child.material.emissive?.lerp(targetColor, 1 - Math.exp(-7 * delta));
      child.material.emissiveIntensity = isActive ? 0.24 + pulse : isHovered ? 0.07 : 0;
    });
  });

  const handlePointerOver = (event) => {
    if (!isFloorInteractive) return;
    event.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event) => {
    if (!isFloorInteractive) return;
    event.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = "default";
  };

  const handleClick = (event) => {
    if (!isFloorInteractive) return;
    event.stopPropagation();
    onClick?.();
  };

  return (
    <group
      position={position}
      scale={[0.05, 0.05, 0.05]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={roomScene} />
      {isHovered && (
        <Html
          position={labelPosition}
          center
          distanceFactor={13}
          style={{ pointerEvents: "none" }}
        >
          <div className="room-hover-label">{roomLabel}</div>
        </Html>
      )}
    </group>
  );
};

export default InteractiveZone;
