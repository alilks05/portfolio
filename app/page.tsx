import CadViewer from "../components/CadViewer";

export const metadata = {
  title: "Ali Lakhani – Portfolio",
  description:
    "Portfolio of Ali Lakhani – hardware, software, data, and embedded systems projects.",
};

export default function HomePage() {
  const year = new Date().getFullYear();

  const timeline = [
    {
      year: "2025",
      role: "Mechatronics Engineering Intern",
      company: "Vitruvius Innovation",
      location: "Montréal, QC",
      subtitle:
        "Engineering a complete respiratory and biometric sensing system, capturing key health metrics (VO₂ Max, RER, lung volume) while integrating embedded pressure, CO₂, O₂, and humidity sensors as well as a lip-mounted PPG module to measure heart rate and blood oxygenation (SpO₂).",
      // CAD + photo
      modelSrc: "/models/aerostim.glb",
      photoSrc: "/images/aerostim-prototype.png",
      photoAlt: "Aerostim prototype on benchtop rig",
      photoCaption: "Prototype assembly with Venturi tube, sensors, and PCB stack.",
      sections: {
        hardware: {
          bullets: [
            "Engineered a Venturi flow tube with three pressure sensors, validated through ANSYS and real-world tests.",
            "Designed a universal mouthpiece and sensor shell housing pressure, humidity, O₂, CO₂, and a lip-mounted PPG module.",
            "Applied DFA by integrating the main PCB and sensors directly into the tube for simple, fast assembly.",
            "Optimized DFM with proper draft angles, material choices, and simplified geometry for manufacturability.",
          ],
          tech: "CAD · Sensors · Venturi flow · PPG",
        },
        software: {
          bullets: [
            "Implemented ESP-IDF firmware (C / FreeRTOS) for synchronized multi-sensor sampling and BLE streaming.",
            "Built a React Native companion app for real-time visualization of flow, breathing metrics, and experiment logs.",
          ],
          tech: "ESP-IDF · FreeRTOS · BLE · React Native",
        },
        data: {
          bullets: [
            "Calibrated against ground-truth flow sources and fitted curves to map ΔP → volumetric flow.",
            "Prototyped algorithms for breath segmentation, noise filtering, and VO₂ / RER estimation from single-breath tests.",
          ],
          tech: "Signal processing · Curve fitting · Experimental design",
        },
      },
    },
    {
      year: "2023",
      role: "Biomedical Engineering Intern",
      company: "West Park Healthcare Centre",
      location: "Toronto, ON",
      subtitle: "Assistive devices & equipment calibration",
      // CAD + photo
      modelSrc: "/models/sipandpuff.glb",
      photoSrc: "/images/sipandpuff.jpg",
      photoAlt: "Sip-and-puff controller prototype",
      photoCaption: "TPU mouthpiece and controller electronics during testing.",
      sections: {
        hardware: {
          bullets: [
            "Designed and prototyped a sip-and-puff gaming controller for quadriplegic users using moisture-resistant pressure sensors.",
            "Assisted with maintenance and calibration of clinical devices and prototyped prosthetic components in SolidWorks.",
          ],
          tech: "Pressure sensing · PCB · SolidWorks · Assistive devices",
        },
        software: {
          bullets: [
            "Wrote Adafruit CircuitPython firmware to classify sip vs puff patterns and map them to button events.",
            "Tuned thresholds and debounce logic to minimize false triggers while keeping latency low for gameplay.",
          ],
          tech: "CircuitPython · Embedded control · Input mapping",
        },
        data: {
          bullets: [
            "Logged sensor traces from multiple users to refine classification thresholds.",
            "Evaluated repeatability and error rates to improve reliability for clinical use.",
          ],
          tech: "Data logging · Threshold tuning · Usability testing",
        },
      },
    },
    {
      year: "2024",
      role: "Software Engineering Intern (LLM)",
      company: "LightCI",
      location: "Remote",
      subtitle: "Bias analysis for MCQ banks; dashboards & pipelines",
      // “CAD” here can be a 3D-ish UI mock or system diagram; photo is dashboard or dev setup
    
      photoSrc: "/images/aiquality.png",
      
      photoAlt: "Bias analysis dashboard for exam questions",
      photoCaption: "Web dashboard showing LLM-powered bias analysis for question banks.",
      sections: {
        hardware: {
          bullets: [
            "Worked primarily in software; integrated with existing infra instead of custom hardware.",
          ],
          tech: "Cloud infra · Dev tooling (no custom hardware)",
        },
        software: {
          bullets: [
            "Built a Node.js / Express backend that communicates with an LLM to analyze exam question bias.",
            "Developed web UIs and dashboards to track job status, show question statistics, and present LLM feedback.",
          ],
          tech: "Node.js · Express · React · LLMs",
        },
        data: {
          bullets: [
            "Parsed MCQ banks from CSV, JSON, and Google Sheets and computed bias scores (option length, complexity, key patterns).",
            "Visualized distributions and flagged questions for instructors, closing the loop with actionable feedback.",
          ],
          tech: "Data pipelines · Visualization · EdTech analytics",
        },
      },
    },
    {
      year: "2023 – Present",
      role: "BASc, Mechatronics Engineering",
      company: "University of Waterloo",
      location: "Waterloo, ON",
      subtitle: "Embedded systems, control, data tools",
      photoSrc: "/images/waterloo-lab-bench.jpg",
      photoAlt: "Control systems lab setup at the University of Waterloo",
      photoCaption: "FPGA, PLC, and sensor-actuator rigs used in control and embedded labs.",
      sections: {
        hardware: {
          bullets: [
            "Designed and built control systems labs using PLCs, FPGAs, and sensor-actuator setups.",
            "Prototyped mechanisms and fixtures in VEX and CAD for course and side projects.",
          ],
          tech: "PLC · VHDL · VEX · CAD",
        },
        software: {
          bullets: [
            "Implemented embedded C/C++ on STM32/ESP32 and wrote supporting tooling in Python and React.",
            "Completed course projects in digital logic, control, and systems modeling.",
          ],
          tech: "C/C++ · Embedded · React · Python",
        },
        data: {
          bullets: [
            "Built data tooling for labs and side projects (Python scripts, dashboards, CSV/Excel processing).",
          ],
          tech: "Python · Data processing · Experiment tooling",
        },
      },
    },
    {
      year: "2022 – 2023",
      role: "Design Team Captain",
      company: "VEX Robotics",
      location: "Toronto, ON",
      subtitle: "Drive bases, intakes, robust mechanisms",
      modelSrc: "/models/Aerostim.glb",
      photoSrc: "/images/vex-robot.jpg",
      photoAlt: "VEX competition robot on field",
      photoCaption: "Competition-ready VEX robot with optimized intake and scoring mechanism.",
      sections: {
        hardware: {
          bullets: [
            "Led CAD and construction of drive bases, intakes, and scoring mechanisms for VEX robots.",
            "Optimized for serviceability and durability under competition loads.",
          ],
          tech: "VEX · CAD · Mechanical design",
        },
        software: {
          bullets: [
            "Collaborated with programmers on control loops and driver tuning (while focusing primarily on design).",
          ],
          tech: "Control tuning · Collaboration with software",
        },
        data: {
          bullets: [
            "Used match and practice performance data to drive mechanical iteration decisions.",
          ],
          tech: "Cycle-time analysis · Iterative design",
        },
      },
    },
  ];
  

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        {/* Left Column: Text */}
  <div className="hero-left">
    <div className="hero-pill-row">
      <div className="pill">Mechatronics Engineering</div>
      <div className="pill">Hardware · Software · Data</div>
    </div>

    <h1 className="hero-title">
    I'm a University of Waterloo Mechatronics Engineering student
    </h1>

    <p className="hero-subtitle">
    Building systems at the intersection of hardware, software, and data analysis!
    </p>

    <div className="hero-buttons">
      <a className="btn-main" href="#timeline">View timeline ↓</a>
      <a className="btn-ghost" href="#contact">Get in touch</a>
    </div>

    <p className="hero-meta">
      Currently exploring roles in <strong>embedded systems, robotics, medtech, and data-heavy engineering tools.</strong>
    </p>
  </div>

  {/* Right Column: Photo */}
  <div className="hero-right">
    <img
      src="/images/profile.jpeg"
      alt="Ali Lakhani"
      className="hero-photo"
    />
  </div>
</section>

      {/* Vertical Timeline */}
      <section id="timeline">
        <h2 className="section-title">
          <span>01</span> · Timeline
        </h2>

        <div className="timeline-container">
        {timeline.map((item, idx) => {
  const group = `timeline-${idx}`;
  const hwId = `${group}-hw`;
  const swId = `${group}-sw`;
  const dataId = `${group}-data`;

  return (
    <div key={idx} className="timeline-item">
      <div className="timeline-marker" />

      <div className="timeline-content">
        {/* Header */}
        <div className="timeline-head">
          <h3 className="timeline-year">{item.year}</h3>

          <div className="timeline-role">
            <strong>{item.role}</strong> · {item.company}
            {item.location && <span className="timeline-loc"> · {item.location}</span>}
          </div>

          {item.subtitle && (
            <div className="timeline-subtitle">{item.subtitle}</div>
          )}
        </div>

        {/* Tab radios (hidden) */}
        <input
          type="radio"
          id={hwId}
          name={group}
          className="timeline-tab-input"
          defaultChecked
        />
        <input
          type="radio"
          id={swId}
          name={group}
          className="timeline-tab-input"
        />
        <input
          type="radio"
          id={dataId}
          name={group}
          className="timeline-tab-input"
        />

        {/* Full-width tab header row */}
        <div className="timeline-tab-header">
          <label htmlFor={hwId} className="timeline-tab-label">
            Hardware
          </label>
          <label htmlFor={swId} className="timeline-tab-label">
            Software
          </label>
          <label htmlFor={dataId} className="timeline-tab-label">
            Data
          </label>
        </div>

        {/* Main row: left = panel text, right = CAD */}
        <div className="timeline-main">
          <div className="timeline-main-left">
            <div className="timeline-tab-body">
              {/* Hardware panel */}
              <div className="timeline-panel timeline-panel-hardware">
                <ul className="timeline-bullets">
                  {item.sections.hardware.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="timeline-tech">
                  {item.sections.hardware.tech}
                </div>
              </div>

              {/* Software panel */}
              <div className="timeline-panel timeline-panel-software">
                <ul className="timeline-bullets">
                  {item.sections.software.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="timeline-tech">
                  {item.sections.software.tech}
                </div>
              </div>

              {/* Data panel */}
              <div className="timeline-panel timeline-panel-data">
                <ul className="timeline-bullets">
                  {item.sections.data.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="timeline-tech">
                  {item.sections.data.tech}
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-main-right">
  {(item.modelSrc || item.photoSrc) && (
    <div className="timeline-media-col">
      {item.modelSrc && (
        <div className="timeline-model">
          <CadViewer
            src={item.modelSrc}
            height={300}
            alt={`${item.company} hardware model`}
          />
        </div>
      )}

      {item.photoSrc && (
        <figure className="timeline-photo">
          {/* if you're using next/image you can swap this for <Image> */}
          <img
            src={item.photoSrc}
            alt={item.photoAlt || `${item.company} prototype`}
          />
          {item.photoCaption && (
            <figcaption>{item.photoCaption}</figcaption>
          )}
        </figure>
      )}
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
})}

        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2 className="section-title">
          <span>02</span> · Contact
        </h2>
        <div className="section-card">
          <div className="contact-grid">
            <div className="contact-main">
              <p>
                I’d love to connect about internships, projects, or collaborations in embedded
                systems, medtech, robotics, or data tooling.
              </p>
              <p style={{ marginTop: 8 }}>
                <strong>
                  → Email me at{" "}
                  <a href="mailto:a6lakhan@uwaterloo.ca">a6lakhan@uwaterloo.ca</a>
                </strong>
              </p>
            </div>
            <div>
              <div className="contact-links">
                <div className="contact-chip">
                  <span className="chip-label">Email</span>
                  <span className="chip-value">a6lakhan@uwaterloo.ca</span>
                </div>
                <div className="contact-chip">
                  <span className="chip-label">GitHub</span>
                  <span className="chip-value">
                    <a
                      href="https://github.com/alilks"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @alilks
                    </a>
                  </span>
                </div>
                <div className="contact-chip">
                  <span className="chip-label">LinkedIn</span>
                  <span className="chip-value">
                    <a
                      href="https://www.linkedin.com/in/ali-lakhani-a676b7175/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      /in/ali-lakhani-a676b7175/
                    </a>
                  </span>
                </div>
                <div className="contact-chip">
                  <span className="chip-label">Location</span>
                  <span className="chip-value">Canada · open to relocation</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            Designed &amp; coded by Ali Lakhani · © {year}
          </div>
        </div>
      </section>
    </main>
  );
}
