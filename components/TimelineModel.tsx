"use client";

import CadViewer from "./CadViewer"; // relative import
// CadViewer itself is a client component that registers <model-viewer>

export default function TimelineModel({
  src,
  height = 350,
  alt = "3D model",
}: {
  src: string;
  height?: number;
  alt?: string;
}) {
  return <CadViewer src={src} height={height} alt={alt} />;
}
