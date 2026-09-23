import React, { createContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { navigationNodes } from "../../navigation/navigationNodes";

const forEachMaterial = (object, callback) => {
  object.traverse((child) => {
    if (!child.isMesh || !child.material) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach(callback);
  });
};

export const FloorInteractionContext = createContext(true);

export const FloorLayer = ({ active, children }) => {
  const groupRef = useRef();
  const opacityRef = useRef(active ? 1 : 0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    opacityRef.current = THREE.MathUtils.damp(
      opacityRef.current,
      active ? 1 : 0,
      5,
      delta
    );

    const layerOpacity = opacityRef.current;
    group.visible = active || layerOpacity > 0.01;
    group.position.y = (1 - layerOpacity) * 0.18;

    forEachMaterial(group, (material) => {
      if (material.userData.baseOpacity === undefined) {
        material.userData.baseOpacity = material.opacity;
      }
      material.transparent = true;
      material.opacity = material.userData.baseOpacity * layerOpacity;
      material.depthWrite = material.userData.baseOpacity > 0.95 && layerOpacity > 0.45;
    });
  });

  return (
    <FloorInteractionContext.Provider value={active}>
      <group ref={groupRef}>{children}</group>
    </FloorInteractionContext.Provider>
  );
};

export const CameraFocus = ({ roomId, controlsRef }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const cameraPosition = useRef(new THREE.Vector3());
  const isMoving = useRef(false);

  useEffect(() => {
    const controls = controlsRef.current;
    const coordinates = navigationNodes[roomId];
    if (!controls || !coordinates) return;

    targetPosition.current.set(coordinates[0], coordinates[1] + 0.15, coordinates[2]);

    const viewDirection = camera.position.clone().sub(controls.target);
    if (viewDirection.lengthSq() < 0.001) {
      viewDirection.set(0.35, 0.7, 1);
    }
    viewDirection.normalize();

    const currentDistance = camera.position.distanceTo(controls.target);
    const focusDistance = THREE.MathUtils.clamp(currentDistance, 11, 17);
    cameraPosition.current
      .copy(targetPosition.current)
      .addScaledVector(viewDirection, focusDistance);

    isMoving.current = true;
  }, [roomId, camera, controlsRef]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !isMoving.current) return;

    const easing = 1 - Math.exp(-3.4 * delta);
    camera.position.lerp(cameraPosition.current, easing);
    controls.target.lerp(targetPosition.current, easing);
    controls.update();

    if (
      camera.position.distanceToSquared(cameraPosition.current) < 0.002 &&
      controls.target.distanceToSquared(targetPosition.current) < 0.002
    ) {
      camera.position.copy(cameraPosition.current);
      controls.target.copy(targetPosition.current);
      controls.update();
      isMoving.current = false;
    }
  });

  return null;
};
