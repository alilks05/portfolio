"use client";

import { useEffect, useRef, useState } from "react";
import ThreeCadViewer from "./ThreeCadViewer";

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function IntroScrollCad() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress 0→1 while this section passes through viewport
      const start = vh * 0.25;
      const end = -vh * 0.75;

      const t = (rect.top - start) / (end - start);
      setProgress(clamp01(t));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const orbitDeg = 45 + progress * 360;

  return (
    <section
      ref={sectionRef}
      style={{
        height: "200vh",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "14vh",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, letterSpacing: "0.12em", opacity: 0.7 }}>
          INTRO
        </div>

        <h1 style={{ fontSize: 52, margin: "10px 0 0", fontWeight: 700 }}>
          Aerostim
        </h1>

        <p style={{ marginTop: 14, maxWidth: 720, fontSize: 18, opacity: 0.75 }}>
          Scroll to explore. The CAD rotates with your scroll.
        </p>

        <div style={{ height: 42 }} />

        <div style={{ width: "min(980px, 100%)" }}>
          <ThreeCadViewer
            src="/models/turret30kgservos.glb"     // <- change to whatever model you want
            height={480}
            orbitDeg={orbitDeg}
            orbitPhiDeg={65}
            orbitRadius={1.9}             // <- smaller = bigger model
            rotationDeg={[0, 0, 0]}       // <- set per model if needed
          />
        </div>

        <div style={{ height: 16 }} />

        <a href="#hero" style={{ opacity: 0.7, fontSize: 14 }}>
          Continue ↓
        </a>
      </div>
    </section>
  );
}
