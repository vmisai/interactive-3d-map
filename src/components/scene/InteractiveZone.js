import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const InteractiveZone = ({ modelPath, position, onClick, isActive, color }) => {
  const cleanPath = modelPath.replace(/^(\.\.\/|\.\/)/, "/");
  const { scene } = useGLTF(process.env.PUBLIC_URL + cleanPath);
  const roomScene = useMemo(() => scene.clone(true), [scene]);
  const highlightOpacity = useRef(0);

  useEffect(() => {
    roomScene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshStandardMaterial({
        color,
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
  }, [roomScene, color]);

  useFrame(({ clock }, delta) => {
    const targetOpacity = isActive
      ? 0.68 + Math.sin(clock.elapsedTime * 2.4) * 0.1
      : 0;

    highlightOpacity.current = THREE.MathUtils.damp(
      highlightOpacity.current,
      targetOpacity,
      isActive ? 7 : 10,
      delta
    );

    roomScene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      child.material.userData.baseOpacity = highlightOpacity.current;
      child.material.emissive?.set(color);
      child.material.emissiveIntensity = isActive ? 0.08 : 0;
    });
  });

  return (
    <primitive
      object={roomScene}
      position={position}
      scale={[0.05, 0.05, 0.05]}
      onClick={onClick}
    />
  );
};

export default InteractiveZone;
