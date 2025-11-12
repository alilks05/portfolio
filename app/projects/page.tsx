import ProjectCard from "../../components/ProjectCard";

export const metadata = {
  title: "Projects – Ali Lakhani",
};

export default function ProjectsPage() {
  const year = new Date().getFullYear();

  return (
    <main>
      {/* About (optional on this page) */}
      <section id="about">
        <h2 className="section-title"><span>01</span> · About</h2>
        <div className="section-card">
          <p className="about-text">
            I’m a Mechatronics Engineering student who likes working across
            the stack: designing hardware, writing embedded firmware, and
            building software tools to visualize and interpret data. My
            projects range from a Venturi-based wearable breathing tube that
            estimates VO₂ Max and RER from a single puff, to assistive gaming
            controllers and industrial systems.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <h2 className="section-title"><span>02</span> · Projects</h2>
        <div className="section-card">
          <div className="projects-list">
            {/* Venturi */}
            <ProjectCard
              title="Venturi-Based Wearable Breathing Tube"
              subtitle="Estimating VO₂ Max, RER, and lung volume from a single breath."
              image="/venturi-tube.png"
              imageAlt="Venturi-based wearable breathing tube CAD"
              techSummary="ESP-IDF · Sensors · Medtech"
              sections={[
                {
                  key: "overview",
                  label: "Overview",
                  content: (
                    <>
                      <p className="project-desc">
                        Developed a Venturi-based wearable tube capable of
                        measuring respiratory performance metrics such as VO₂
                        Max, RER, and lung volume from a single, effortless breath.
                      </p>
                      <p className="project-desc">
                        Compact, low-pressure design suitable for non-athlete users
                        while still providing actionable metrics.
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
                        • Modified a compact Venturi channel for human breath (&lt; 3 kPa)
                        using Ansys and experimental calibration to preserve linearity.
                      </p>
                      <p className="project-desc">
                        • Multiple pressure/temperature sensors across the constriction
                        for differential pressure and mass-flow in real time.
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
                        • Firmware in C / FreeRTOS (ESP-IDF) with synchronized 50 Hz sampling.
                      </p>
                      <p className="project-desc">
                        • React Native app visualizes live flow and derived metrics.
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
                        • Calibration via ground-truth flow sources and curve fitting
                        for volumetric flow and VO₂ estimates.
                      </p>
                      <p className="project-desc">
                        • On-device + app filters for noise rejection and breath detection.
                      </p>
                    </>
                  ),
                },
              ]}
            />

            {/* Sip-and-puff */}
            <ProjectCard
              title="Mouth-Controlled Gaming Controller"
              subtitle="Sip-and-puff interface for quadriplegic players."
              image="/sip-and-puff.png"
              imageAlt="Sip-and-puff controller assembly"
              techSummary="Assistive Device · CircuitPython"
              sections={[
                {
                  key: "overview",
                  label: "Overview",
                  content: (
                    <>
                      <p className="project-desc">
                        Accessible controller using breath to trigger inputs; validated
                        with quadriplegic users for comfort and responsiveness.
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
                        • Moisture-resistant pressure sensor modules via flexible tubing.
                      </p>
                      <p className="project-desc">
                        • Replaceable mouthpiece; electronics isolated in housing.
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
                        • CircuitPython firmware detects sip/puff and maps to button events.
                      </p>
                      <p className="project-desc">
                        • Tuned thresholds/debounce to minimize false triggers.
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
                        • Logged sensor readings to adapt thresholds for different users.
                      </p>
                      <p className="project-desc">
                        • Measured repeatability and error rates across sessions.
                      </p>
                    </>
                  ),
                },
              ]}
            />

            {/* Control systems */}
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
                        Multistate electromechanical system on PLC; mirrored key logic on FPGA
                        to compare behavior and timing.
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
                        • Intel DE10-Lite for counters and small state machines.
                      </p>
                      <p className="project-desc">
                        • Integrated sensors/actuators including a color sensor in PLC setup.
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
                        • Ladder logic in Siemens TIA Portal for jogging/halting and transitions.
                      </p>
                      <p className="project-desc">
                        • VHDL 3-bit synchronous counter + configurable FSM on FPGA.
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
                        • Logged state transitions, timing margins, error conditions.
                      </p>
                      <p className="project-desc">
                        • Compared PLC scan time vs FPGA determinism for RT tradeoffs.
                      </p>
                    </>
                  ),
                },
              ]}
            />

            {/* TGA tool */}
            <ProjectCard
              title="TGA Data Extractor"
              subtitle="Python toolchain for graphite flake characterization."
              image="/tga-tool.png"
              imageAlt="Example TGA data plot"
              techSummary="Python · Data Processing"
              sections={[
                {
                  key: "overview",
                  label: "Overview",
                  content: (
                    <>
                      <p className="project-desc">
                        Processes multiple TGA text exports and produces a clean CSV summary.
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
                        • Adapts to exported formats from existing lab instrumentation.
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
                        • Parses mass at 25/550/800/1000°C; modular code to add metrics easily.
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
                        • Computes moisture/volatiles, combustibles, graphite combustion,
                        ash content, total loss, and carbon %.
                      </p>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact on this page */}
      <section id="contact">
        <h2 className="section-title"><span>03</span> · Contact</h2>
        <div className="section-card">
          <div className="contact-grid">
            <div className="contact-main">
              <p>
                I’d love to connect about internships, projects, or collaborations in
                embedded systems, medtech, robotics, or data tooling.
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
                    <a href="https://github.com/alilks" target="_blank" rel="noreferrer">
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
          <div className="footer">Designed &amp; coded by Ali Lakhani · © {year}</div>
        </div>
      </section>
    </main>
  );
}
