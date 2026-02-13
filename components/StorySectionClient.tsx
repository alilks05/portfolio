"use client";

import { useEffect, useState } from "react";
import ScrollCadSection from "../app/scroll-cad/ScrollCadSection";
import AutoScrollGallery from "./AutoScrollGallery";
import ThreeCadViewer from "./ThreeCadViewer";

export default function StorySectionClient() {
  const [open, setOpen] = useState(false);

  // Freeze background scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* ===================== */}
      {/* STORY SECTION */}
      {/* ===================== */}
      <section id="story" className="storySection">
        <div className="storyGrid">
          {/* LEFT COLUMN — SCROLLING POINTS */}
          <div className="storyPoints">
            <h2 className="storyTitle">Vision-Guided Autonomous Disk Launcher</h2>

            <div className="pointCard">
              <h3>Mechanical architecture</h3>
              <p>
                Designed the complete disk-launching mechanism including structural
                layout, flywheel geometry, and servo-driven pan-tilt architecture.
              </p>
            </div>

            <div className="pointCard">
              <h3>Actuator sizing</h3>
              <p>
                Performed torque, inertia, and acceleration calculations to select
                high-torque servos while maintaining stability and repeatability.
              </p>
            </div>

            <div className="pointCard">
              <h3>Experimental validation</h3>
              <p>
                Built test rigs to characterize launch velocity, repeatability, and
                mechanical failure modes across multiple iterations.
              </p>
            </div>

            <div className="pointCard">
              <h3>System integration</h3>
              <p>
                Designed interfaces that reliably connect vision-based targeting with
                physical actuation constraints.
              </p>
            </div>

            {/* ✅ VIEW MORE BUTTON */}
            <button className="viewMoreBtn" onClick={() => setOpen(true)}>
              View more
            </button>
          </div>

          {/* RIGHT COLUMN — STICKY ROTATING CAD */}
          <div className="storyCadSticky">
            <ScrollCadSection />
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* MODAL OVERLAY */}
      {/* ===================== */}
      {open && (
        <div className="modalOverlay" onMouseDown={() => setOpen(false)}>
          <div
            className="modalCard"
            onMouseDown={(e) => e.stopPropagation()} // keep clicks inside
          >
            <button className="modalClose" onClick={() => setOpen(false)}>
              ✕
            </button>

            {/* Top row: CAD (top-left small) + points */}
            <div className="modalTop">
              <div className="modalCad">
                <ThreeCadViewer
                  src="/models/aerostim.glb"
                  height={200}
                  orbitDeg={35}
                  orbitPhiDeg={65}
                  orbitRadius={3.0}
                  rotationDeg={[0, 0, 0]}
                />
              </div>

              <div className="modalBullets">
                <h2 className="modalTitle">Aerostim — Details</h2>

                <ul className="modalList">
                  <li>
                    Designed a full mechanical enclosure system including a Venturi flow
                    tube, universal-fit mouthpiece, and multi-part shell housing all
                    internal sensors and PCBs using SolidWorks, applying DFM/DFA to
                    ensure manufacturability, simplified geometry, and fast assembly.
                  </li>
                  <li>
                    Developed and deployed embedded firmware for a multi-sensor system,
                    designing custom modular PCBs (including a wireless-charging-compatible
                    PPG board) and integrating 7+ sensors into a mechanically constrained
                    enclosure, managing timing, power, and data integrity across the full
                    electromechanical stack.
                  </li>
                  <li>
                    Designed and validated mechanical enclosures and flow-critical components
                    using first-principles analysis and iterative testing to ensure repeatable
                    performance under real-world operating conditions.
                  </li>
                  <li>
                    Engineered a high-resolution air volume-flow meter based on the Venturi effect,
                    achieving 0.01 g/s resolution and reducing turbulent noise to within 1 Pa;
                    processing 468,000+ data points in MATLAB and Python to derive an accurate
                    real-time volume-flow.
                  </li>
                </ul>
              </div>
            </div>

            {/* Gallery below */}
            <div className="modalGallery">
              <AutoScrollGallery
                items={[
                  // ✅ Replace these with your real files
                  { type: "image", src: "/images/aerostim-prototype.png", alt: "Aerostim prototype" },
                  { type: "image", src: "/images/aerostim-prototype-2.png", alt: "Aerostim angle 2" },
                  { type: "video", src: "/videos/disk-launcher-demo.mp4" },
                  { type: "image", src: "/images/aerostim-prototype-3.png", alt: "Aerostim close-up" },
                ]}
                photoHoldMs={2200}
                videoMaxMs={4500}
                width={900}
                height={460}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
