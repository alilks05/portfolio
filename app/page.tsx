import ProjectCard from "../components/ProjectCard";

export const metadata = {
  title: "Ali Lakhani – Portfolio",
  description:
    "Portfolio of Ali Lakhani – hardware, software, data, and embedded systems projects.",
};

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="page">
      {/* Nav */}
      <header className="nav">
        <div className="logo">
          <div className="logo-mark">A</div>
          <span>Ali&nbsp;Lakhani</span>
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div>
            <div className="hero-pill-row">
              <div className="pill">Mechatronics Engineering</div>
              <div className="pill">Hardware · Software · Data</div>
            </div>
            <h1 className="hero-title">
              Building systems at the intersection of hardware, software, and
              measurement.
            </h1>
            <p className="hero-subtitle">
              I’m Ali, a Mechatronics Engineering student focused on embedded
              systems, medical and industrial hardware, and the software that
              makes data from those systems useful.
            </p>

            <div className="hero-buttons">
              <a className="btn-main" href="#projects">
                View projects ↓
              </a>
              <a className="btn-ghost" href="#contact">
                Get in touch
              </a>
            </div>

            <p className="hero-meta">
              Currently exploring roles in{" "}
              <strong>
                embedded systems, robotics, medtech, and data-heavy engineering
                tools.
              </strong>
            </p>
          </div>

          <aside className="hero-card">
            <h3>Snapshot</h3>
            <div className="hero-card-grid">
              <div className="hero-card-block">
                <h3>Focus Areas</h3>
                <div className="tag-row">
                  <span className="tag">Venturi flow sensing</span>
                  <span className="tag">Assistive devices</span>
                  <span className="tag">Control &amp; digital logic</span>
                  <span className="tag">Data extraction tools</span>
                </div>
              </div>
              <div className="hero-card-block">
                <h3>Tech</h3>
                <div className="tag-row">
                  <span className="tag">C / C++ · ESP-IDF</span>
                  <span className="tag">Adafruit CircuitPython</span>
                  <span className="tag">React / JS</span>
                  <span className="tag">Python</span>
                  <span className="tag">FPGA · VHDL</span>
                  <span className="tag">PLC · TIA Portal</span>
                </div>
              </div>
            </div>
            <div className="hero-card-footer">
              <span>
                Favourite challenges:{" "}
                <strong>turning raw sensor data into reliable metrics.</strong>
              </span>
              <span>Location: Canada 🇨🇦</span>
            </div>
          </aside>
        </section>

        {/* About */}
        <section id="about">
          <h2 className="section-title">
            <span>01</span> · About
          </h2>
          <div className="section-card">
            <p className="about-text">
              I’m a Mechatronics Engineering student who likes working across
              the stack: designing hardware, writing embedded firmware, and
              building software tools to visualize and interpret data. My
              projects range from a Venturi-based wearable breathing tube that
              estimates VO₂ Max and RER from a single puff, to assistive gaming
              controllers and industrial separation systems.
              <br />
              <br />
              I’m especially interested in applications where good engineering
              directly impacts people: respiratory monitoring, accessibility
              devices, and smarter tools for materials and manufacturing.
            </p>
          </div>
        </section>

        {/* Projects – each project has its own slider */}
        <section id="projects">
          <h2 className="section-title">
            <span>02</span> · Projects
          </h2>
          <div className="section-card">
            <div className="projects-list">
              {/* Venturi project */}
              <ProjectCard
                title="Venturi-Based Wearable Breathing Tube"
                subtitle="Estimating VO₂ Max, RER, and lung volume from a single breath."
                image="/venturi-tube.png"
                imageAlt="Venturi-based wearable breathing tube CAD"
                techSummary="ESP-IDF · Sensors · Medtech"
                links={[
                  // add real links if you have them
                  // { label: "GitHub", href: "https://github.com/..." },
                ]}
                sections={[
                  {
                    key: "overview",
                    label: "Overview",
                    content: (
                      <>
                        <p className="project-desc">
                          Developed a Venturi-based wearable tube capable of
                          measuring respiratory performance metrics such as VO₂
                          Max, Respiratory Exchange Ratio (RER), and lung volume
                          from a single, effortless puff of air.
                        </p>
                        <p className="project-desc">
                          The device is designed to be compact and low-pressure,
                          making it suitable for non-athlete users while still
                          providing meaningful performance metrics.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "hardware",
                    label: "Hardware",
                    content: (
                      <>
                        <p className="project-desc">
                          • Modified a compact Venturi flow channel for
                          low-pressure human breath (&lt; 3 kPa) using Ansys and
                          experimental calibration to maintain linearity between
                          differential pressure and volumetric flow.
                        </p>
                        <p className="project-desc">
                          • Integrated multiple pressure and temperature sensors
                          along the Venturi constriction to compute differential
                          pressure and mass flow in real time.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "software",
                    label: "Software",
                    content: (
                      <>
                        <p className="project-desc">
                          • Implemented firmware in C / FreeRTOS (ESP-IDF) to
                          synchronize 50 Hz sampling across sensors.
                        </p>
                        <p className="project-desc">
                          • Built a React Native companion app to visualize live
                          flow data, derived respiratory metrics, and historical
                          trends.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "data",
                    label: "Data",
                    content: (
                      <>
                        <p className="project-desc">
                          • Calibrated the system using ground-truth flow
                          sources and curve fitting to map sensor readings to
                          volumetric flow and VO₂ estimates.
                        </p>
                        <p className="project-desc">
                          • Implemented on-device and app-level filtering for
                          noise rejection and breath event detection.
                        </p>
                      </>
                    ),
                  },
                ]}
              />

              {/* Sip-and-puff controller */}
              <ProjectCard
                title="Mouth-Controlled Gaming Controller"
                subtitle="Sip-and-puff interface for quadriplegic players."
                image="/sip-and-puff.png"
                imageAlt="Sip-and-puff controller assembly"
                techSummary="Assistive Device · CircuitPython"
                links={[
                  {
                    label: "GitHub",
                    href: "https://github.com/alilks/sip-and-puff",
                  },
                ]}
                sections={[
                  {
                    key: "overview",
                    label: "Overview",
                    content: (
                      <>
                        <p className="project-desc">
                          Designed an accessible gaming controller that uses a
                          sip-and-puff interface, enabling users with limited
                          mobility to trigger game controls using breath.
                        </p>
                        <p className="project-desc">
                          Built and tested with quadriplegic users to validate
                          comfort, responsiveness, and reliability.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "hardware",
                    label: "Hardware",
                    content: (
                      <>
                        <p className="project-desc">
                          • Moisture-resistant pressure sensor modules connected
                          via flexible tubing for reliable sip/puff detection.
                        </p>
                        <p className="project-desc">
                          • Designed housing to keep the sensor electronics
                          isolated while making the mouthpiece easy to replace
                          and clean.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "software",
                    label: "Software",
                    content: (
                      <>
                        <p className="project-desc">
                          • Implemented Adafruit CircuitPython firmware to read
                          pressure changes, classify them as “sip” or “puff”,
                          and map them to button events.
                        </p>
                        <p className="project-desc">
                          • Tuned thresholds and debounce logic to reduce false
                          triggers while keeping latency low.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "data",
                    label: "Data",
                    content: (
                      <>
                        <p className="project-desc">
                          • Logged sensor readings to tune classification
                          thresholds for different users and mouthpiece
                          geometries.
                        </p>
                        <p className="project-desc">
                          • Evaluated repeatability and error rates across test
                          sessions to refine the control scheme.
                        </p>
                      </>
                    ),
                  },
                ]}
              />

              {/* Control systems / PLC / FPGA */}
              <ProjectCard
                title="Control Systems & Digital Logic"
                subtitle="PLC state machine and FPGA-based synchronous logic."
                image="/control-systems.png"
                imageAlt="PLC and FPGA system diagram"
                techSummary="PLC · VHDL · Intel DE10-Lite"
                sections={[
                  {
                    key: "overview",
                    label: "Overview",
                    content: (
                      <>
                        <p className="project-desc">
                          Implemented a multi-state electromechanical control
                          system using a PLC and recreated key control logic on
                          an FPGA for comparison and learning.
                        </p>
                        <p className="project-desc">
                          Combined ladder logic, state diagrams, and VHDL to
                          build a consistent, testable control pipeline.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "hardware",
                    label: "Hardware",
                    content: (
                      <>
                        <p className="project-desc">
                          • Used an Intel DE10-Lite development board to
                          implement digital logic for counters and simple state
                          machines.
                        </p>
                        <p className="project-desc">
                          • Integrated sensors (including a color sensor) and
                          actuators into the PLC-controlled electromechanical
                          setup.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "software",
                    label: "Software",
                    content: (
                      <>
                        <p className="project-desc">
                          • Programmed ladder logic in Siemens TIA Portal to
                          control directional jogging, halting, and state
                          transitions across five operational modes.
                        </p>
                        <p className="project-desc">
                          • Wrote VHDL for a 3-bit synchronous counter and a
                          configurable state machine deployed to the FPGA.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "data",
                    label: "Data",
                    content: (
                      <>
                        <p className="project-desc">
                          • Observed and logged state transitions, timing
                          margins, and error conditions to debug both PLC and
                          FPGA behavior.
                        </p>
                        <p className="project-desc">
                          • Compared PLC scan times with FPGA hardware speed to
                          understand real-time tradeoffs.
                        </p>
                      </>
                    ),
                  },
                ]}
              />

              {/* TGA data tool */}
              <ProjectCard
                title="Thermogravimetric Analysis (TGA) Data Extractor"
                subtitle="Python toolchain for graphite flake characterization."
                image="/tga-tool.png"
                imageAlt="Example TGA data plot"
                techSummary="Python · Data Processing"
                links={[
                  {
                    label: "GitHub",
                    href: "https://github.com/alilks05/TGA-data-extraction",
                  },
                ]}
                sections={[
                  {
                    key: "overview",
                    label: "Overview",
                    content: (
                      <>
                        <p className="project-desc">
                          Built a Python tool to process thermogravimetric
                          analysis data from multiple text files and generate a
                          clean CSV summary for graphite flake samples.
                        </p>
                        <p className="project-desc">
                          Automates what would otherwise be a slow, manual
                          extraction process across many TGA runs.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "hardware",
                    label: "Hardware",
                    content: (
                      <>
                        <p className="project-desc">
                          • Integrated with existing TGA lab setups by adapting
                          to the exported text file formats from the
                          instrumentation.
                        </p>
                        <p className="project-desc">
                          • Focused on the software layer while respecting the
                          limits and noise characteristics of the measurement
                          hardware.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "software",
                    label: "Software",
                    content: (
                      <>
                        <p className="project-desc">
                          • Script searches for all <code>.txt</code> files in a
                          directory tree, parses mass values at 25°C, 550°C,
                          800°C, and 1000°C, and writes results into a single
                          CSV.
                        </p>
                        <p className="project-desc">
                          • Uses a modular structure so additional temperature
                          points or derived metrics can be added easily.
                        </p>
                      </>
                    ),
                  },
                  {
                    key: "data",
                    label: "Data",
                    content: (
                      <>
                        <p className="project-desc">
                          • Computes moisture and volatiles, combustibles,
                          graphite combustion, ash content, total mass loss, and
                          carbon percentage from the TGA curves.
                        </p>
                        <p className="project-desc">
                          • Outputs a dated CSV report to track batches over
                          time and compare runs.
                        </p>
                      </>
                    ),
                  },
                ]}
              />

              {/* Software-only apps (Task manager / OCR / MCQ) could also be merged
                  into one ProjectCard each if you want – you can add them below
                  using the same pattern. */}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <h2 className="section-title">
            <span>03</span> · Contact
          </h2>
          <div className="section-card">
            <div className="contact-grid">
              <div className="contact-main">
                <p>
                  I’d love to connect about internships, projects, or
                  collaborations in embedded systems, medtech, robotics, or data
                  tooling.
                </p>
                <p style={{ marginTop: 8 }}>
                  <strong>
                    → Email me at{" "}
                    <a href="mailto:a6lakhan@uwaterloo.ca">
                      a6lakhan@uwaterloo.ca
                    </a>
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
                    <span className="chip-value">
                      Canada · open to relocation
                    </span>
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
    </div>
  );
}
