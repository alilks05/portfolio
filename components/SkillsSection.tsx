"use client";

export default function SkillsSection() {
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
          WHAT I WORK WITH
        </div>

        <h2
          style={{
            fontSize: 48,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Skills
        </h2>

        <p
          style={{
            opacity: 0.6,
            marginBottom: 100,
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          Tools and technologies I use across mechanical design,
          embedded systems, and software engineering.
        </p>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
          }}
        >
          {[
            {
              title: "Mechanical & Design",
              skills: [
                "SolidWorks",
                "Fusion360",
                "Inventor",
                "AutoCAD",
                "Catia",
                "DFM/DFA",
                "GD&T",
                "Tolerance Analysis",
              ],
            },
            {
              title: "Hardware & Embedded",
              skills: [
                "Altium",
                "KiCad",
                "STM32",
                "ESP32",
                "Arduino",
                "Sensor Integration (I²C/SPI/UART)",
              ],
            },
            {
              title: "Analysis & Testing",
              skills: [
                "SimulationX",
                "Ansys",
                "FEA",
                "Statistical Analysis",
                "MATLAB",
                "Python",
              ],
            },
            {
              title: "Software",
              skills: [
                "Python",
                "Embedded C",
                "C++",
                "JavaScript",
                "React",
                "Node.js",
                "TypeScript",
                "SQL",
                "VHDL",
                "PLC",
              ],
            },
          ].map((group, i) => (
            <div
              key={i}
              style={{
                padding: "40px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: 2,
                  opacity: 0.5,
                  marginBottom: 20,
                }}
              >
                {group.title.toUpperCase()}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {group.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 999,
                      fontSize: 13,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
