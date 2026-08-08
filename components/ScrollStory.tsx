// components/ScrollStory.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import StoryCadStage from "./StoryCadStage";
import ProjectModal from "./ProjectModal";
import type { Project } from "./projectTypes";

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function segProgress(p: number, a: number, b: number) {
  return clamp01((p - a) / (b - a));
}

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);
  const TIMELINE_END = 0.93; // ends animation earlier to remove dead tail

  // modal state
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const openModal = (proj: Project) => {
    setSelected(proj);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  // ✅ Scroll mapping that ends with sticky (no dead scroll)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (open) return;

    const onScroll = () => {
      const vh = window.innerHeight;

      const startY = el.offsetTop - vh * 0.2;
      const endY = el.offsetTop + el.offsetHeight - vh * 0.25;

      const t = (window.scrollY - startY) / (endY - startY);
      const clamped = clamp01(t);

      // finish the animation earlier to avoid dead tail
      const timelineP = clamp01(clamped / TIMELINE_END);
      setP(timelineP);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /**
   * TIMELINE BREAKPOINTS
   */

  // --- TIMELINE (edit these) ---
  const SECTION_HEIGHT_VH = 620;
  const segWeights = [1, 1, 1, 1, 1, 1]; // [jetson, disk, aerostim, volt, sippuff, vex]

  const sum = segWeights.reduce((a, b) => a + b, 0);
  const w = segWeights.map((x) => x / sum);

  const B0 = 0;
  const B1 = w[0];
  const B2 = w[0] + w[1];
  const B3 = w[0] + w[1] + w[2];
  const B4 = w[0] + w[1] + w[2] + w[3];
  const B5 = w[0] + w[1] + w[2] + w[3] + w[4];
  const B6 = 1;

  const TURNS_PER_MODEL = 1.0;
  const DEG_PER_TURN = 360;

  let segIndex = 0;
  if (p >= B5) segIndex = 5;
  else if (p >= B4) segIndex = 4;
  else if (p >= B3) segIndex = 3;
  else if (p >= B2) segIndex = 2;
  else if (p >= B1) segIndex = 1;

  const segStarts = [B0, B1, B2, B3, B4, B5];
  const segEnds = [B1, B2, B3, B4, B5, B6];

  const localRaw = segProgress(p, segStarts[segIndex], segEnds[segIndex]);
  const localT = smoothstep(0, 1, localRaw);

  const completedTurns = segIndex * TURNS_PER_MODEL;
  const currentTurns = localT * TURNS_PER_MODEL;
  const orbitDeg = 45 + (completedTurns + currentTurns) * DEG_PER_TURN;

  const d1 = B1 - B0;
  const d2 = B2 - B1;
  const d3 = B3 - B2;
  const d4 = B4 - B3;
  const d5 = B5 - B4;
  const d6 = B6 - B5;

  // CAD transitions
  const diskMix = smoothstep(B1, B1 + d2 * 0.25, p);
  const aerostimMix = smoothstep(B2, B2 + d3 * 0.25, p);
  const voltMix = smoothstep(B3, B3 + d4 * 0.25, p);
  const sippuffMix = smoothstep(B4, B4 + d5 * 0.25, p);
  const vexMix = smoothstep(B5, B5 + d6 * 0.25, p);

  // Text transitions
  const jetsonText = 1 - smoothstep(B1, B1 + d2 * 0.25, p);

  const diskText =
    smoothstep(B1, B1 + d2 * 0.25, p) *
    (1 - smoothstep(B2, B2 + d3 * 0.25, p));

  const aerocardiaText =
    smoothstep(B2, B2 + d3 * 0.25, p) *
    (1 - smoothstep(B3, B3 + d4 * 0.25, p));

  const voltText =
    smoothstep(B3, B3 + d4 * 0.25, p) *
    (1 - smoothstep(B4, B4 + d5 * 0.25, p));

  const sippuffText =
    smoothstep(B4, B4 + d5 * 0.25, p) *
    (1 - smoothstep(B5, B5 + d6 * 0.25, p));

  const vexText = smoothstep(B5, B5 + d6 * 0.25, p);


  return (
    <>
      <div
        ref={sectionRef}
        style={{ height: `${SECTION_HEIGHT_VH}vh`, padding: "120px 0" }}
      >
        <div
          style={{
            position: "sticky",
            top: "12vh",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr minmax(360px, 520px) 1fr",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* LEFT CALLOUTS */}
          <div style={{ transition: "opacity 200ms linear" }}>
            {voltText > 0.02 ? (
              <div style={{ opacity: voltText }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
                  Volt Carbon Technologies: Graphite Extraction and Lithium Ion
                  Battery Design
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    lineHeight: 1.7,
                    opacity: 0.75,
                  }}
                >
                  <li>
                    Designing manufacturing processes for raw material
                    extraction and EV battery design.
                  </li>
                </ul>

                <button
                  type="button"
                  className="view-more-btn"
                  style={{ marginTop: 12 }}
                  onClick={() =>
                    openModal({
                      id: "voltcarbon",
                      title: "Graphite Extraction",
                      cornerCad: {
                        src: "/images/airseperator.png",
                        alt: "Full CAD",
                      },
                      tabs: [
                        {
                          key: "mechanical",
                          label: "Mechanical",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/airseperator.png",
                                alt: "Air Classifier",
                              },
                              title: "Graphite Air Classifier",
                              bullets: [
                                "Uses aerodynamic principles to blow crushed, sieved graphitic ore through an air classifer chamber.",
                                "The air classifier chamber uses the low density of graphite to separate it from the high density components in the crushed ore.",
                                "Uses an industrial centrifugal fan to blow the crushed ore through the system.",
                                "Extensive testing + Python scripting to determine chamber count.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/funnel.png",
                                alt: "Magnetic Separator",
                              },
                              title: "Iron Magnetic Separator",
                              bullets: [
                                "Neodymium magnet funnel to remove iron.",
                                "Designed with DFA for easy magnet insertion.",
                                "DFM for repeatable manufacturing.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/voltCar.png",
                                alt: "LIB Car Demo",
                              },
                              title: "Lithium Ion Battery Car Demo Tester",
                              bullets: [
                                "Remote control car for demo testing.",
                                "Uses L298N motor controllers.",
                                "Tests Volt’s custom batteries.",
                              ],
                            },
                          ],
                        },
                        {
                          key: "hardware",
                          label: "Hardware",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/tga.jpeg",
                                alt: "TGA data extractor",
                              },
                              title: "TGA & XRF Data Extractor",
                              bullets: [
                                "Thermogravimetric Analysis + XRF.",
                                "Python pipeline for raw data processing.",
                              ],
                            },
                          ],
                        },
                      ],
                      gallery: [
                        { src: "/images/airseperator.png", alt: "Photo 1" },
                        { src: "/images/funnel.png", alt: "Photo 2" },
                        { src: "/images/voltCar.png", alt: "Photo 3" },
                      ],
                    })
                  }
                >
                  View more
                </button>
              </div>
            ) : jetsonText > 0.02 ? (
              <div style={{ opacity: jetsonText }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
                  Jetson: Rivian R1T Fleet Vehicles
                </div>

                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    lineHeight: 1.7,
                    opacity: 0.75,
                  }}
                >
                  <li>
                    Designed a Rivian R1T fleet service truck system for deployment
                    across 11+ Jetson locations in North America.
                  </li>
                </ul>

                {/* <button
                  type="button"
                  className="view-more-btn"
                  style={{ marginTop: 12 }}
                  onClick={() =>
                    openModal({
                      id: "jetson-rivian",
                      title: "Jetson: Rivian R1T Fleet Vehicles",
                      cornerCad: {
                        src: "/images/jetson-rivian-1.jpeg",
                        alt: "Rivian R1T fleet vehicle",
                      },
                      tabs: [
                        {
                          key: "mechanical",
                          label: "Mechanical",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/jetson-rivian-1.jpeg",
                                alt: "Rivian R1T fleet storage system",
                              },
                              title: "Fleet Storage System",
                              bullets: [
                                "Designed a truck-bed storage system for Jetson's Rivian R1T service fleet.",
                                "Developed SolidWorks CAD concepts around technician storage, vehicle packaging, and field use.",
                                "Performed material selection and tolerance analysis throughout the design process.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/jetson-rivian-2.jpeg",
                                alt: "Rivian R1T storage system prototype",
                              },
                              title: "Prototype & Manufacturing",
                              bullets: [
                                "Worked with manufacturing partners to turn CAD concepts into physical prototypes.",
                                "Iterated the design based on manufacturability, fit, and installation requirements.",
                                "Coordinated the design with Rivian and external manufacturing partners.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/jetson-rivian-3.jpeg",
                                alt: "Rivian R1T pilot installation",
                              },
                              title: "Pilot Installation & Validation",
                              bullets: [
                                "Validated the system through pilot installations and testing at Jetson's Denver lab.",
                                "Used installation feedback to identify changes before broader fleet deployment.",
                                "Designed the system for rollout across 11+ Jetson locations in North America.",
                              ],
                            },
                          ],
                        },
                        {
                          key: "hardware",
                          label: "Hardware",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/jetson-lora-1.jpeg",
                                alt: "Jetson LoRa SmartHub hardware",
                              },
                              title: "LoRa SmartHub",
                              bullets: [
                                "Designed a custom LoRa-based PCB in Altium around an STM32F446.",
                                "Developed the schematic and PCB layout for the wireless communication system.",
                                "Integrated the hardware with existing Jetson HVAC products.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/jetson-lora-2.jpeg",
                                alt: "Jetson HVAC wireless communication system",
                              },
                              title: "Wireless HVAC Communication",
                              bullets: [
                                "Developed a wireless bridge to replace the existing wired RS-485 connection between HVAC systems.",
                                "Reverse engineered the existing communication protocol to support integration with Jetson hardware.",
                                "Developed C firmware for the STM32-based system.",
                              ],
                            },
                          ],
                        },
                      ],
                      gallery: [
                        { src: "/images/r1.png", alt: "Rivian R1T" },
                        { src: "/images/r2.png", alt: "Rivian R1T storage system" },
                        { src: "/images/r3.png", alt: "Rivian R1T pilot installation" },
                        { src: "/images/r4.PNG", alt: "Jetson LoRa SmartHub hardware" },
                        { src: "/images/r5.jpg", alt: "Jetson HVAC hardware" },
                      ],
                    })
                  }
                >
                  View more
                </button> */}
              </div>
            ) : (
              <div style={{ opacity: diskText }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
                  Vision-Guided Autonomous Disk Launcher
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    lineHeight: 1.7,
                    opacity: 0.75,
                  }}
                >
                  <li>
                    A stationary, camera guided turret that automatically aims
                    and launches disks at a detected target.
                  </li>
                </ul>

                {/* ✅ Disk Launcher View more + sections (restored) */}
                <button
                  type="button"
                  className="view-more-btn"
                  style={{ marginTop: 12 }}
                  onClick={() =>
                    openModal({
                      id: "disk-launcher",
                      title: "Vision-Guided Autonomous Disk Launcher",
                      cornerCad: { src: "/images/fullShooter.png", alt: "Full CAD" },
                      tabs: [
                        {
                          key: "mechanical",
                          label: "Mechanical",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/flywheelOring.png",
                                alt: "Flywheel & Oring",
                              },
                              title: "Fly Wheels and O-ring",
                              bullets: [
                                "Designed a PLA dual-flywheel system to accelerate disks using stored rotational energy.",
                                "Used a custom SLA printed O-ring interface to improve grip and reduce slip while damping vibrations.",
                                "Tuned spacing and alignment so disks feed consistently without jamming or excessive drag.",
                                "Iterated geometry and mounting to keep the system balanced at speed and minimize wobble.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "video",
                                src: "/videos/disk-launcher-demo.MP4",
                                poster: "/images/turret.png",
                              },
                              title: "The Turret",
                              bullets: [
                                "Built a pan-tilt turret driven by high-torque metal-gear servos to support fast, repeatable aiming.",
                                "Added a ball-bearing supported pan joint so radial loads are carried by the bearing, not the servo gearbox.",
                                "Used a sandwich style support on the tilt axis to keep the servo output shaft from taking bending load.",
                                "Designed the structure to stay rigid under dynamic motion (less flex improves accuracy).",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/magazine.png",
                                alt: "Magazine CAD",
                              },
                              title: "The Magazine (in development)",
                              bullets: [
                                "Designed a magazine that stores multiple disks and controls single-disk release into the flywheel intake.",
                                "Implemented a mechanical feed/trigger mechanism to deliver one disk at a time with consistent orientation.",
                                "Added guides/retainers so disks don’t tilt or double-feed during motion and vibration.",
                                "Built for fast reload and easy servicing while keeping the feed path constrained and repeatable.",
                              ],
                            },
                          ],
                        },
                        {
                          key: "hardware",
                          label: "Hardware",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/motor.png",
                                alt: "Motors + drivers",
                              },
                              title: "Motors and Motor Controllers Used",
                              bullets: [
                                "Selected compact DC motors for the flywheels to achieve high RPM in a small footprint while keeping the system lightweight.",
                                "Used dedicated DC motor drivers to deliver stable current to the flywheels and maintain repeatable launch performance.",
                                "Controlled the motor system with an ESP32-S3 for reliable PWM output, timing control, and modular expansion.",
                                "Structured the electronics so the launcher subsystem can run independently from the vision/aiming stack.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/servos.jpeg",
                                alt: "Servos",
                              },
                              title: "Pan and Tilt Servos Turret",
                              bullets: [
                                "Used high-torque metal-gear servos for pan/tilt to handle turret moment loads and fast direction changes.",
                                "Drove servos through a dedicated I2C PWM driver for clean, stable control signals.",
                                "Designed the mechanical supports (bearing + sandwich mounts) so servo gears aren’t overloaded by side loads.",
                                "Tuned motion profiles (speed/accel) to reduce overshoot and improve aim stability.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "video",
                                src: "/videos/disk-launcher-demo.mp4",
                                poster: "/images/turret.png",
                              },
                              title: "Camera Vision System (in development)",
                              bullets: [
                                "Used a Raspberry Pi camera + Raspberry Pi 5 compute to detect targets and output aim commands in real time.",
                                "Ran the perception loop on the Pi so vision processing stays isolated from low-level motor control.",
                                "Integrated the system as a closed loop: detect → compute offset → command pan/tilt → recheck and refine.",
                                "Designed the pipeline for fast iteration (swap models/thresholds without rewriting the entire stack).",
                              ],
                            },
                          ],
                        },
                      ],
                      gallery: [
                        { src: "/images/disk1.jpeg", alt: "Photo 1" },
                        { src: "/images/disk2.png", alt: "Photo 2" },
                        { src: "/images/disk3.png", alt: "Photo 3" },
                      ],
                    })
                  }
                >
                  View more
                </button>
              </div>
            )}
          </div>

          {/* CENTER CAD */}
          {!open ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StoryCadStage
                jetsonSrc="/models/A908 - Rivian Topper - Manual Tonneau - Tall Proto-compressed.glb"
                turretSrc="/models/turret30kgservos.glb"
                aerostimSrc="/models/aerostim.glb"
                voltSrc="/models/funnel.glb"
                sippuffSrc="/models/sipandpuff.glb"
                vexSrc="/models/Full_Robot_v3.glb"
                height={480}
                orbitDeg={orbitDeg}
                diskMix={diskMix}
                aerostimMix={aerostimMix}
                voltMix={voltMix}
                sippuffMix={sippuffMix}
                vexMix={vexMix}
                jetsonRotationDeg={[45, 0, 0]}
                turretRotationDeg={[90, 0, 0]}
                aerostimRotationDeg={[0, 0, 0]}
                voltRotationDeg={[10, 0, 0]}
                sippuffRotationDeg={[-20, 0, 0]}
                vexRotationDeg={[0, 0, 0]}
              />
            </div>
          ) : (
            <div style={{ height: 480 }} />
          )}

          {/* RIGHT CALLOUTS */}
          <div style={{ transition: "opacity 200ms linear" }}>
            {vexText > 0.02 ? (
    <div style={{ opacity: vexText }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
        VEX Robotics — Design Team Captain
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, opacity: 0.75 }}>
        <li>Led mechanical design and CAD of full robot assemblies for competition.</li>
      </ul>

      <button
        type="button"
        className="view-more-btn"
        style={{ marginTop: 12 }}
        onClick={() =>
          openModal({
            id: "vex",
            title: "VEX Robotics",
            gallery: [
              { src: "/images/vex1.JPG", alt: "VEX photo 1" },
              { src: "/images/vex2.JPG", alt: "VEX photo 2" },
              { src: "/images/vex3.JPG", alt: "VEX photo 3" },
              { src: "/images/vex4.JPG", alt: "VEX photo 4" },
            ],
          })
        }
        
      >
        View more
      </button>
    </div>
  ) : sippuffText > 0.02 ? (
              <div style={{ opacity: sippuffText }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
                  Sip-and-Puff Mouth-Controlled Controller
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    lineHeight: 1.7,
                    opacity: 0.75,
                  }}
                >
                  <li>
                    Built a pressure-based sip-and-puff controller system for
                    accessible input and assistive device interaction.
                  </li>
                </ul>

                {/* ✅ Sip&Puff View more + sections (restored) */}
                <button
                  type="button"
                  className="view-more-btn"
                  style={{ marginTop: 12 }}
                  onClick={() =>
                    openModal({
                      id: "vex",
                      title: "VEX Robotics",
                      gallery: [
                        { src: "/images/sipNpuff.jpg", alt: "Sip and puff" },
                        
                      ],
                    })
                  }
                >
                  View more
                </button>
              </div>
            ) : (
              <div style={{ opacity: aerocardiaText }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
                  Aerocardia: Heart & Lung Diagnostic Device
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    lineHeight: 1.7,
                    opacity: 0.75,
                  }}
                >
                  <li>
                    Engineered a Venturi flow tube with 7 sensors measuring heart
                    and lung performance.
                  </li>
                </ul>

                {/* ✅ Aerocardia View more + sections (restored) */}
                <button
                  type="button"
                  className="view-more-btn"
                  style={{ marginTop: 12 }}
                  onClick={() =>
                    openModal({
                      id: "aerocardia",
                      title: "Aerocardia: Heart & Lung Diagnostic Device",
                      cornerCad: { src: "/images/aerostim-prototype-2.png", alt: "Full CAD" },
                      tabs: [
                        {
                          key: "mechanical",
                          label: "Mechanical",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aerostim-prototype-3.png",
                                alt: "Mechanical Enclosure",
                              },
                              title: "Mechanical Enclosure",
                              bullets: [
                                "Designed a compact, handheld enclosure to package the Venturi tube and all internal electronics.",
                                "Applied DFM principles: simplified geometry, print-friendly orientations, consistent wall thickness, and reduced support needs.",
                                "Integrated cantilevered snap-fits for open/close access, plus dedicated snap retention features for the internal battery.",
                                "FDM printed in PLA to achieve the toughness and stiffness required for a protective handheld enclosure.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aerostim-prototype.png",
                                alt: "Venturi Tube",
                              },
                              title: "Venturi Tube",
                              bullets: [
                                "Designed a short, modular Venturi geometry to maximize pressure differential between two measurement points.",
                                "Used Ansys Fluent to identify the geometry that produces maximum ΔP while maintaining compact form factor.",
                                "Built an instantaneous volume-flow model: Ansys-informed baseline regression + coefficient fitting using calibrated and real-world tests.",
                                "Validated against a calibrated spirometer and processed datasets in Python and MATLAB to achieve <10% instantaneous flow error.",
                                "Designed snap fits, screw fits, and friction fits to mount O₂, CO₂, pressure PCB, and main PCB with DFA-focused assembly alignment.",
                                "SLA printed the Venturi tube to achieve the precision required for repeatable flow characteristics and tight tolerances.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aeroPPG.jpg",
                                alt: "PPG Lip Mount",
                              },
                              title: "PPG Lip Mount",
                              bullets: [
                                "Designed a TPU lip interface to form-fit reliably on a patient’s lip for stable PPG readings.",
                                "Aligned the geometry to be error-proof and reduce placement variability during measurement.",
                                "Created a slide-in module that seats into a PLA lip guard mounted to the enclosure for easy replacement and cleaning.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aerostim-prototype-4.png",
                                alt: "PPG Pacifier",
                              },
                              title: "PPG Pacifier",
                              bullets: [
                                "Designed a custom infant pacifier with an integrated PPG sensor at the lip to measure SpO₂ and heart rate.",
                                "Modeled a custom nipple shape for improved ergonomics and consistent positioning.",
                                "Prioritized modularity and water resistance to support safe, repeatable use and easier servicing.",
                              ],
                            },
                          ],
                        },
                        {
                          key: "hardware",
                          label: "Hardware / Software",
                          blocks: [
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aerostim-prototype-6.png",
                                alt: "Custom PCBs",
                              },
                              title: "PCB Boards",
                              bullets: [
                                "Designed and implemented a custom ESP32 mini board with wireless charging support, connected to a PPG sensor.",
                                "Revised the main device PCB: added onboard 6-axis IMU, onboard atmospheric pressure sensor, and connectors for four external sensor boards.",
                                "Designed power architecture to support an external battery and USB-C charging for standalone field use.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aerostim-prototype.png",
                                alt: "ESP-IDF firmware",
                              },
                              title: "ESP-IDF Firmware",
                              bullets: [
                                "Implemented ESP32 firmware integrating 7 sensors with different sampling frequencies and streaming data over BLE.",
                                "Built sensor-specific calibration pathways; most sensors stream raw data, while PPG uses windowed collection + averaging for robust SpO₂/HR extraction.",
                                "Solved multi-rate synchronization so the user receives a reliable unified data packet at consistent intervals.",
                              ],
                            },
                            {
                              leftMedia: {
                                type: "image",
                                src: "/images/aerostim-prototype-7.png",
                                alt: "React Native app and dashboard",
                              },
                              title: "React Native App + Dashboard",
                              bullets: [
                                "Built a React Native (Expo) app that connects via BLE and displays real-time patient metrics with the ability to save and review sessions.",
                                "Computed instantaneous volume flow in-app using the calibrated Venturi equation derived from testing and simulation.",
                                "Developed an online dashboard with a Supabase backend for user accounts and encrypted storage of historical experiment/session data.",
                                "Visualized trends over time so users can review respiratory and sensor metrics across multiple measurements.",
                              ],
                            },
                          ],
                        },
                      ],
                      gallery: [
                        { src: "/images/aerostim-prototype-2.png", alt: "Aerocardia - photo 1" },
                        { src: "/images/aerostim-prototype-3.png", alt: "Aerocardia - photo 2" },
                        { src: "/images/aerostim-prototype-4.png", alt: "Aerocardia - photo 3" },
                        { src: "/images/aerostim-prototype-5.png", alt: "Aerocardia - photo 4" },
                        { src: "/images/aerostim-prototype.png", alt: "Aerocardia - photo 5" },
                        { src: "/images/aerostim-prototype-6.png", alt: "Aerocardia - photo 6" },
                        { src: "/images/aerostim-prototype-7.png", alt: "Aerocardia - photo 7" },
                        { src: "/images/aeroPPG.jpg", alt: "Aerocardia - photo 8" },
                      ],
                    })
                  }
                >
                  View more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProjectModal open={open} onClose={closeModal} project={selected} />
    </>
  );
}