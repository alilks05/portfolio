"use client";

import { useEffect, useRef, useState } from "react";
import ThreeCadViewer from "../../components/ThreeCadViewer";

/**
 * Clamp value between 0 and 1
 */
function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function ScrollCadSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 scroll progress

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      /**
       * When top of section is near bottom of viewport → progress = 0
       * When section scrolls past → progress = 1
       */
      const start = vh * 0.2;
      const end = -vh * 0.8;

      const t = (rect.top - start) / (end - start);
      setProgress(clamp01(t));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Scroll → rotation
   * 360deg = one full Apple-style rotation
   */
  const orbitDeg = 45 + progress * 360;

  return (
    <section
      ref={sectionRef}
      style={{
        height: "220vh", // controls scroll distance
        padding: "120px 0",
      }}
    >
      {/* Sticky centered container */}
      <div
        style={{
          position: "sticky",
          top: "20vh",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Text */}
        <h1
          style={{
            fontSize: 48,
            margin: 0,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Aerostim
        </h1>

        <p
          style={{
            marginTop: 14,
            maxWidth: 640,
            fontSize: 18,
            opacity: 0.75,
          }}
        >
          Scroll to explore the system. The model rotates as you move,
          revealing the full mechanical design.
        </p>

        {/* Spacer */}
        <div style={{ height: 48 }} />

        {/* Centered CAD */}
        
<ThreeCadViewer
  src="/models/turret30kgservos.glb"
  height={420}
  orbitDeg={orbitDeg}
  orbitPhiDeg={65}
  orbitRadius={0.39}
  rotationDeg={[90, 0, 0]}
/>




      </div>
    </section>
  );
}
