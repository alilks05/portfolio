// components/StoryCadStage.tsx
"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------
   Clone model, center it, scale it, and control opacity safely
------------------------------------------------------------- */
function CloneWithOpacity({
  src,
  opacity,
  baseRotationDeg = [0, 0, 0],
  targetSize = 2.6,
  color,
}: {
  src: string;
  opacity: number;
  baseRotationDeg?: [number, number, number];
  targetSize?: number;
  color?: string;
}) {
  const { scene } = useGLTF(src);
  const [scale, setScale] = useState(1);

  // Clone scene + clone materials so multiple models don’t fight
  const cloned = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material = obj.material.map((m: any) => m.clone());
        } else {
          obj.material = obj.material.clone();
        }
      }
    });

    return root;
  }, [scene]);

  // ✅ CENTER + SCALE MODEL
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    // move model so its center sits at (0,0,0)
    cloned.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      setScale(targetSize / maxDim);
    }
  }, [cloned, targetSize]);

  // Apply opacity cleanly
  useEffect(() => {
    cloned.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];

        mats.forEach((m: any) => {
          m.transparent = true;
          m.opacity = opacity;
          m.depthWrite = opacity > 0.5;
          
          m.needsUpdate = true;
        });
      }
    });
  }, [cloned, opacity]);

  const baseRot = useMemo(() => {
    const [x, y, z] = baseRotationDeg;
    return new THREE.Euler(
      THREE.MathUtils.degToRad(x),
      THREE.MathUtils.degToRad(y),
      THREE.MathUtils.degToRad(z)
    );
  }, [baseRotationDeg]);

  // ✅ small perf win (don’t render if basically invisible)
  if (opacity <= 0.001) return null;

  return (
    <group rotation={baseRot} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
}

/* -------------------------------------------------------------
   Rotating stage (Apple-style scroll rotation)
------------------------------------------------------------- */
function RotatingStage({
  jetsonSrc,
  jetsonHubSrc,
  turretSrc,
  aerostimSrc,
  voltSrc,
  sippuffSrc,
  vexSrc,
  yawDeg,
  jetsonHubMix,
  diskMix,
  aerostimMix,
  voltMix,
  sippuffMix,
  vexMix,
  jetsonRotationDeg,
  jetsonHubRotationDeg,
  turretRotationDeg,
  aerostimRotationDeg,
  voltRotationDeg,
  sippuffRotationDeg,
  vexRotationDeg,
}: {
  jetsonSrc: string;
  jetsonHubSrc: string,
  turretSrc: string;
  aerostimSrc: string;
  voltSrc: string;
  sippuffSrc: string;
  vexSrc: string;

  yawDeg: number;

diskMix: number;
jetsonHubMix: string;
aerostimMix: number;
voltMix: number;
sippuffMix: number;
vexMix: number;

  jetsonRotationDeg?: [number, number, number];
  jetsonHubRotationDeg?: [number, number, number];
  turretRotationDeg?: [number, number, number];
  aerostimRotationDeg?: [number, number, number];
  voltRotationDeg?: [number, number, number];
  sippuffRotationDeg?: [number, number, number];
  vexRotationDeg?: [number, number, number];
}) {
  const stageRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (stageRef.current) {
      stageRef.current.rotation.y = THREE.MathUtils.degToRad(yawDeg);
    }
  });

  // ✅ 5-way blend (each stage fades out when the next fades in)
  const jetsonOpacity = 1 - jetsonHubMix;
const jetsonHubOpacity = jetsonHubMix * (1 - diskMix);
const turretOpacity = diskMix * (1 - aerostimMix);
const aerostimOpacity = aerostimMix * (1 - voltMix);
const voltOpacity = voltMix * (1 - sippuffMix);
const sippuffOpacity = sippuffMix * (1 - vexMix);
const vexOpacity = vexMix;

  return (
    <group ref={stageRef}>
      <Suspense fallback={null}>
        <Environment preset="warehouse" />

        <CloneWithOpacity
  src={jetsonSrc}
  opacity={jetsonOpacity}
  baseRotationDeg={jetsonRotationDeg}
  targetSize={2.8}
/>

        {/* JetsonHub CAD */}
<CloneWithOpacity
  src={jetsonHubSrc}
  opacity={jetsonHubOpacity}
  baseRotationDeg={jetsonHubRotationDeg}
  targetSize={2.8}
/>

        {/* Turret CAD */}
        <CloneWithOpacity
          src={turretSrc}
          opacity={turretOpacity}
          baseRotationDeg={turretRotationDeg}
          targetSize={2.8}
        />

        {/* Aerostim / Aerocardia CAD */}
        <CloneWithOpacity
          src={aerostimSrc}
          opacity={aerostimOpacity}
          baseRotationDeg={aerostimRotationDeg}
          targetSize={2.8}
        />

        {/* Volt CAD */}
        <CloneWithOpacity
          src={voltSrc}
          opacity={voltOpacity}
          baseRotationDeg={voltRotationDeg}
          targetSize={2.8}
        />

        {/* SipPuff CAD */}
        <CloneWithOpacity
          src={sippuffSrc}
          opacity={sippuffOpacity}
          baseRotationDeg={sippuffRotationDeg}
          targetSize={2.8}
        />

        {/* VEX CAD */}
        <CloneWithOpacity
          src={vexSrc}
          opacity={vexOpacity}
          baseRotationDeg={vexRotationDeg}
          targetSize={2.8}
        />
      </Suspense>
    </group>
  );
}

/* -------------------------------------------------------------
   Exported Stage Component
------------------------------------------------------------- */
export default function StoryCadStage({
  jetsonSrc,
  jetsonHubSrc,
  turretSrc,
  aerostimSrc,
  voltSrc,
  sippuffSrc,
  vexSrc,
  height = 520,
  orbitDeg = 45,
  diskMix = 0,
  jetsonHubMix = 0,
  aerostimMix = 0,
  voltMix = 0,
  sippuffMix = 0,
  vexMix = 0,
  jetsonRotationDeg = [0, 0, 0],
  jetsonHubRotationDeg = [0, 0, 0],
  turretRotationDeg = [0, 0, 0],
  aerostimRotationDeg = [0, 0, 0],
  voltRotationDeg = [0, 0, 0],
  sippuffRotationDeg = [0, 0, 0],
  vexRotationDeg = [0, 0, 0],
}: {
  jetsonSrc: string;
  jetsonHubSrc: string;
  turretSrc: string;
  aerostimSrc: string;
  voltSrc: string;
  sippuffSrc: string;
  vexSrc: string;
  height?: number;
  orbitDeg?: number;
  jetsonHubMix?: number;
  diskMix?: number;
aerostimMix?: number;
voltMix?: number;
sippuffMix?: number;
vexMix?: number;

  jetsonRotationDeg?: [number, number, number];
  jetsonHubRotationDeg?: [number, number, number];
  turretRotationDeg?: [number, number, number];
  aerostimRotationDeg?: [number, number, number];
  voltRotationDeg?: [number, number, number];
  sippuffRotationDeg?: [number, number, number];
  vexRotationDeg?: [number, number, number];
}) {
  return (
    <div style={{ width: "100%", height, background: "transparent" }}>
      <Canvas
        camera={{
          position: [0, 0.3, 6.7],
          fov: 28,
          near: 0.1,
          far: 200,
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 3]} intensity={1.3} />

        <RotatingStage
        jetsonSrc={jetsonSrc}
        jetsonHubSrc={jetsonHubSrc}
          turretSrc={turretSrc}
          aerostimSrc={aerostimSrc}
          voltSrc={voltSrc}
          sippuffSrc={sippuffSrc}
          vexSrc={vexSrc}
          yawDeg={orbitDeg}

          diskMix={diskMix}
          jetsonHubMix={jetsonHubMix}
          aerostimMix={aerostimMix}
          voltMix={voltMix}
          sippuffMix={sippuffMix}
          vexMix={vexMix}

          jetsonRotationDeg={jetsonRotationDeg}
          jetsonHubRotationDeg={jetsonHubRotationDeg}
          turretRotationDeg={turretRotationDeg}
          aerostimRotationDeg={aerostimRotationDeg}
          voltRotationDeg={voltRotationDeg}
          sippuffRotationDeg={sippuffRotationDeg}
          vexRotationDeg={vexRotationDeg}
        />

        {/* Lock interaction (Apple-style) */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

/* Preload models */
useGLTF.preload(
  "/models/A908 - Rivian Topper - Manual Tonneau - Tall Proto-compressed.glb"
);
useGLTF.preload("/models/JetsonHub.glb");
useGLTF.preload("/models/turret30kgservos.glb");
useGLTF.preload("/models/aerostim.glb");
useGLTF.preload("/models/funnel.glb");
useGLTF.preload("/models/sipandpuff.glb");
useGLTF.preload("/models/Full_robot_v3.glb");
