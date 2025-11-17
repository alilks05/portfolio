"use client";
import { useEffect } from "react";

export default function ModelViewerClient() {
  useEffect(() => {
    // Register the web component only once (StrictMode-safe)
    if (typeof window !== "undefined" && !customElements.get("model-viewer")) {
      import("@google/model-viewer");
    }
  }, []);
  return null;
}
