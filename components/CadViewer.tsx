"use client";

import React, { useEffect, useMemo, useRef } from "react";
import ModelViewerClient from "./ModelViewerClient";

const ModelViewer: any = "model-viewer";

export default function CadViewer({
  src,
  alt = "3D model",
  height = 380,
  orbitDeg,
  orbitPhiDeg = 65,
  orbitRadius = "3m",
  cameraControls = true,
  rotation,
}: {
  src: string;
  alt?: string;
  height?: number;
  orbitDeg?: number;
  orbitPhiDeg?: number;
  orbitRadius?: string;
  cameraControls?: boolean;
  rotation?: string; // e.g. "90deg 0deg 0deg"
}) {
  const mvRef = useRef<any>(null);

  const cameraOrbit = useMemo(() => {
    return `${orbitDeg ?? 45}deg ${orbitPhiDeg}deg ${orbitRadius}`;
  }, [orbitDeg, orbitPhiDeg, orbitRadius]);

  // ✅ Apply rotation as an attribute (reliable for web components)
  useEffect(() => {
    const el = mvRef.current;
    if (!el) return;

    if (rotation) {
      el.setAttribute("rotation", rotation);
    } else {
      // if you want: remove it when not provided
      el.removeAttribute("rotation");
    }
  }, [rotation]);

  // ✅ Also apply camera-orbit reliably (same reason)
  useEffect(() => {
    const el = mvRef.current;
    if (!el) return;
    el.setAttribute("camera-orbit", cameraOrbit);
  }, [cameraOrbit]);

  return (
    <div
      style={{
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <ModelViewerClient />
  
      <ModelViewer
        ref={mvRef}
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        camera-target="0m 0m 0m"            // ✅ forces center pivot
        min-camera-orbit="auto auto 2m"     // optional stability
        max-camera-orbit="auto auto 6m"
        {...(cameraControls ? { "camera-controls": true } : {})}
        environment-image="neutral"
        exposure="1"
        shadow-intensity="0"
        ar
        ar-modes="webxr scene-viewer quick-look"
      />
    </div>
  );
  
}
