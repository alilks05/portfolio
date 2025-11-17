"use client";
import React from "react";
import ModelViewerClient from "./ModelViewerClient";

// TS-safe alias so we don’t rely on JSX intrinsic typings
const ModelViewer: any = "model-viewer";

export default function CadViewer({
  src,
  alt = "3D model",
  height = 380,
}: {
  src: string;
  alt?: string;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(148,163,184,0.3)",
        background:
          "radial-gradient(circle at 30% 0%, #0b1120 0%, #020617 40%, #000 100%)",
      }}
    >
      {/* Registers <model-viewer> on the client (once) */}
      <ModelViewerClient />

      <ModelViewer
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", display: "block" }}
        camera-controls
        auto-rotate
        environment-image="neutral"
        exposure="1"
        shadow-intensity="1"
        camera-orbit="45deg 65deg 3m"
        ar
        ar-modes="webxr scene-viewer quick-look"
      />
    </div>
  );
}
