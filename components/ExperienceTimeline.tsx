"use client";

import { useState } from "react";

type Experience = {
  company: string;
  role: string;
  date: string;
  description: string;
  tags: string[];
};

const experiences: Experience[] = [
  {
    company: "Jetson",
    role: "Hardware Systems Engineering Intern",
    date: "May 2026 – Aug 2026",
    description:
      "Develop a LoRa based smarthub system to enable communication between Jetson HVAC units. In collaboration with Rivian designed a fleet service truck to be rolled out in 11+ Jetson locations across North America.",
    tags: ["Hardware Product Design" ,"SolidWorks", "Altium", "STM32", "C"],
  },
  {
      company: "Aerocardia",
      role: "Mechatronics Engineering Intern",
      date: "Sep 2025 – Dec 2025",
      description:
        "Designed a Venturi-based medical device enclosure in SolidWorks and integrated custom ESP32 PCBs designed in Altium. Processed and validated sensor data using MATLAB and Python.",
      tags: ["SolidWorks", "Altium", "ESP32", "MATLAB", "Python"],
    },
    {
      company: "Solid Ultra Battery",
      role: "Manufacturing Engineering Intern",
      date: "Jan 2025 – Mar 2025",
      description:
        "Designed and tested lithium-ion battery systems and graphite process equipment in Catia. Built Python tools to automate lab data extraction and analysis.",
      tags: ["Catia", "Python", "DFM/DFA"],
    },
    {
      company: "LightCI",
      role: "Software Engineering Intern",
      date: "2024",
      description:
        "Developed a Node.js backend to analyze exam question bias and built React dashboards to visualize statistics and LLM feedback.",
      tags: ["Node.js", "React", "SQL", "JavaScript"],
    },
    {
      company: "West Park Healthcare Centre",
      role: "R&D Engineering Intern",
      date: "Jul 2023 – Aug 2023",
      description:
        "Engineered a mouth-controlled assistive device using Arduino and custom PCBs designed in KiCad to improve accessibility for patients.",
      tags: ["Arduino", "KiCad", "Sensor Integration"],
    },
  ];
  
  

export default function ExperienceTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section
      style={{
        padding: "20px 0",
        background: "#05070d",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            letterSpacing: 2,
            fontSize: 14,
            opacity: 0.45,
            marginBottom: 12,
          }}
        >
          WHERE I’VE WORKED
        </div>

        <h2
          style={{
            fontSize: 48,
            fontWeight: 600,
            marginBottom: 100,
          }}
        >
          Experience
        </h2>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(255,255,255,0.08)",
            }}
          />

          {experiences.map((exp, i) => {
            const isActive = i === active;

            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    margin: "0 auto",
                    background: isActive
                      ? "linear-gradient(135deg, #4cc9f0, #4361ee)"
                      : "rgba(255,255,255,0.25)",
                    boxShadow: isActive
                      ? "0 0 18px rgba(76,201,240,0.8)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                />

                <div
                  style={{
                    marginTop: 28,
                    fontSize: 18,
                    fontWeight: isActive ? 600 : 400,
                    opacity: isActive ? 1 : 0.6,
                    transition: "all 0.3s ease",
                  }}
                >
                  {exp.company}
                </div>

                <div
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    opacity: 0.4,
                  }}
                >
                  {exp.date}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Card */}
        <div
          style={{
            marginTop: 100,
            padding: "40px 48px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            textAlign: "left",
            transition: "all 0.4s ease",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 26 }}>
            {experiences[active].company}
          </h3>

          <div style={{ marginTop: 6, opacity: 0.7 }}>
            {experiences[active].role}
          </div>

          <div style={{ marginTop: 4, opacity: 0.4, fontSize: 14 }}>
            {experiences[active].date}
          </div>

          <p style={{ marginTop: 24, lineHeight: 1.7, opacity: 0.85 }}>
            {experiences[active].description}
          </p>

          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {experiences[active].tags.map((tag, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  background: "rgba(76,201,240,0.1)",
                  border: "1px solid rgba(76,201,240,0.3)",
                  color: "#4cc9f0",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
