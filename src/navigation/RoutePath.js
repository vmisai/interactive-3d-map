import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const RoutePath = ({
  path,
  showStartCircle,
  showEndPin,
  startLabel,
  destinationLabel,
  floorChange,
  onFloorChange,
}) => {
  const dashRef = useRef();
  const startPulseRef = useRef();
  const endPulseRef = useRef();

  const points = useMemo(() => {
    if (!path || path.length < 2) return [];

    const curvePath = new THREE.CurvePath();
    const vectors = path.map((point) => new THREE.Vector3(point[0], point[1], point[2]));

    for (let index = 0; index < vectors.length - 1; index += 1) {
      curvePath.add(new THREE.LineCurve3(vectors[index], vectors[index + 1]));
    }

    return curvePath.getPoints(Math.max(160, vectors.length * 24));
  }, [path]);

  const layerPoints = useMemo(() => {
    if (!points.length) return {};
    return {
      glowOuter: points.map((point) => new THREE.Vector3(point.x, point.y + 0.012, point.z)),
      glowInner: points.map((point) => new THREE.Vector3(point.x, point.y + 0.018, point.z)),
      core: points.map((point) => new THREE.Vector3(point.x, point.y + 0.024, point.z)),
      dash: points.map((point) => new THREE.Vector3(point.x, point.y + 0.031, point.z)),
    };
  }, [points]);

  useFrame(({ clock }, delta) => {
    const dashMaterial = dashRef.current?.material;
    if (dashMaterial) {
      dashMaterial.dashOffset -= delta * 0.65;
    }

    const pulse = 1 + Math.sin(clock.elapsedTime * 3.2) * 0.11;
    startPulseRef.current?.scale.setScalar(pulse);
    endPulseRef.current?.scale.setScalar(2 - pulse);
  });

  if (points.length === 0) return null;

  const startPoint = path[0];
  const endPoint = points[points.length - 1];

  return (
    <group>
      <Line points={layerPoints.glowOuter} color="#148cff" lineWidth={9} transparent opacity={0.12} />
      <Line points={layerPoints.glowInner} color="#25d5ff" lineWidth={5.2} transparent opacity={0.3} />
      <Line points={layerPoints.core} color="#087ff5" lineWidth={2.8} />
      <Line
        ref={dashRef}
        points={layerPoints.dash}
        color="#f7fdff"
        lineWidth={1.45}
        dashed
        dashSize={0.11}
        gapSize={0.095}
      />

      {showStartCircle && (
        <group position={[startPoint[0], startPoint[1] + 0.02, startPoint[2]]}>
          <mesh ref={startPulseRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.14, 0.24, 40]} />
            <meshBasicMaterial color="#21c979" transparent opacity={0.28} depthWrite={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
            <circleGeometry args={[0.12, 40]} />
            <meshBasicMaterial color="#10a965" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
            <circleGeometry args={[0.045, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <Html position={[0, 0.42, 0]} center distanceFactor={13} style={{ pointerEvents: "none" }}>
            <span className="route-point-label route-point-start">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/></svg>
              {startLabel}
            </span>
          </Html>
        </group>
      )}

      {showEndPin && (
        <group position={[endPoint.x, endPoint.y + 0.02, endPoint.z]}>
          <mesh ref={endPulseRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 0.26, 40]} />
            <meshBasicMaterial color="#ff6b45" transparent opacity={0.3} depthWrite={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[0, 0.01, 0]}>
            <planeGeometry args={[0.18, 0.18]} />
            <meshBasicMaterial color="#f04f32" side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
            <circleGeometry args={[0.035, 28]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <Html position={[0, 0.42, 0]} center distanceFactor={13} style={{ pointerEvents: "none" }}>
            <span className="route-point-label route-point-end">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 20V5"/><path d="M7 6h10l-2.5 3L17 12H7"/></svg>
              {destinationLabel}
            </span>
          </Html>
        </group>
      )}

      {floorChange && (
        <Html
          position={[floorChange.position[0], floorChange.position[1] + 0.36, floorChange.position[2]]}
          center
          distanceFactor={12}
          style={{ pointerEvents: "auto" }}
        >
          <button
            className="route-floor-change"
            onClick={(event) => {
              event.stopPropagation();
              onFloorChange?.(floorChange.nextFloor);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 19h4v-4h4v-4h4V7" />
              <path d="m15 7 4-4 4 4" />
            </svg>
            {floorChange.label}
          </button>
        </Html>
      )}
    </group>
  );
};

export default RoutePath;
