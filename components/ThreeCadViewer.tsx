"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function FitOnce({ box }: { box: THREE.Box3 | null }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!box) return;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // set camera near/far safely for big CAD
    camera.near = 0.01;
    camera.far = 5000;

    // distance based on bounding size
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const dist = (maxDim / 2) / Math.tan(fov / 2);

    // Put camera in a reasonable starting place looking at model
    camera.position.set(center.x + dist, center.y + dist * 0.2, center.z + dist);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  }, [box, camera]);

  return null;
}

function Model({
  src,
  rotationDeg,
  onBoxReady,
}: {
  src: string;
  rotationDeg: [number, number, number];
  onBoxReady: (box: THREE.Box3) => void;
}) {
  const { scene } = useGLTF(src);

  const rot = useMemo(() => {
    const [x, y, z] = rotationDeg;
    return new THREE.Euler(
      THREE.MathUtils.degToRad(x),
      THREE.MathUtils.degToRad(y),
      THREE.MathUtils.degToRad(z)
    );
  }, [rotationDeg]);

  useEffect(() => {
    // compute bounds once model is loaded
    const box = new THREE.Box3().setFromObject(scene);
    onBoxReady(box);
  }, [scene, onBoxReady]);

  return (
    <Center>
      <group rotation={rot}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function ScrollOrbit({
  orbitDeg,
  orbitPhiDeg,
  orbitRadius,
}: {
  orbitDeg: number;
  orbitPhiDeg: number;
  orbitRadius: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const theta = THREE.MathUtils.degToRad(orbitDeg);
    const phi = THREE.MathUtils.degToRad(orbitPhiDeg);

    const x = orbitRadius * Math.sin(phi) * Math.cos(theta);
    const z = orbitRadius * Math.sin(phi) * Math.sin(theta);
    const y = orbitRadius * Math.cos(phi);

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ThreeCadViewer({
  src,
  height = 420,
  rotationDeg = [0, 0, 0],
  orbitDeg = 45,
  orbitPhiDeg = 65,
  orbitRadius = 3.2,
}: {
  src: string;
  height?: number;
  rotationDeg?: [number, number, number];
  orbitDeg?: number;
  orbitPhiDeg?: number;
  orbitRadius?: number;
}) {
  const [box, setBox] = useState<THREE.Box3 | null>(null);

  return (
    <div style={{ width: "100%", height, background: "transparent" }}>
      <Canvas camera={{ fov: 35 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 6]} intensity={1.2} />
        <Suspense fallback={null}>
          <Environment preset="warehouse" />

          <FitOnce box={box} />

          {/* ✅ scroll controls camera position every frame */}
          <ScrollOrbit
            orbitDeg={orbitDeg}
            orbitPhiDeg={orbitPhiDeg}
            orbitRadius={orbitRadius}
          />

          <Model
            src={src}
            rotationDeg={rotationDeg as [number, number, number]}
            onBoxReady={(b) => setBox(b)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
