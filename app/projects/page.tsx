import TimelineModel from "../../components/TimelineModel"; // ✅ server imports client child is fine

export const metadata = {
  title: "Timeline – Ali Lakhani",
};

export default function ProjectsPage() {


  const timeline = [
    {
      year: "2025",
      title: "Aerocardia – Biomedical Engineering Startup",
      subtitle: "Venturi-based respiratory monitoring & wearable systems",
      desc: [
        "At Aerocardia, I’m developing a Venturi-based wearable device capable of estimating VO₂ Max, Respiratory Exchange Ratio (RER), and lung volume using low-pressure airflow sensors integrated into a compact mouthpiece.",
        "Designed firmware in ESP-IDF (C / FreeRTOS), built a React Native companion app for BLE data visualization, and designed the Venturi and PPG modules in CAD.",
      ],
      modelSrc: "/models/Aerostim.glb",
      tech: "ESP-IDF · React Native · Sensors · CAD · BLE",
    },
    {
      year: "2024",
      title: "West Park Healthcare Centre",
      subtitle: "Biomedical Engineering Internship",
      desc: [
        "Developed a sip-and-puff gaming controller using Adafruit CircuitPython for patients with limited mobility.",
        "Assisted with calibration and maintenance of medical equipment and prototyping of prosthetic components in SolidWorks.",
      ],
      tech: "CircuitPython · PCB · Assistive Tech",
    },
    {
      year: "2023",
      title: "LightCI",
      subtitle: "Software Engineering Internship",
      desc: [
        "Built a full-stack feedback analysis system using Node.js, Express.js, and an LLM backend to analyze instructor question bias.",
        "Implemented data visualizations, feedback dashboards, and integrated natural language analysis pipelines.",
      ],
      tech: "Node.js · Express.js · React · LLMs",
    },
  ];

  return (
    <main>
      <section id="timeline">
        <h2 className="section-title">
          <span>01</span> · Timeline
        </h2>
        <div className="timeline-container">
          {timeline.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h3 className="timeline-year">{item.year}</h3>
                <h4 className="timeline-title">{item.title}</h4>
                <h5 className="timeline-subtitle">{item.subtitle}</h5>

                {/* Only Aerocardia has a model */}
                {item.modelSrc && (
                  <div className="timeline-model">
                    <TimelineModel src={item.modelSrc} height={350} alt={`${item.title} model`} />
                  </div>
                )}

                {item.desc.map((p, i) => (
                  <p key={i} className="timeline-desc">{p}</p>
                ))}
                <div className="timeline-tech">{item.tech}</div>
              </div>
            </div>
          ))}
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
                I’d love to connect about internships, projects, or collaborations in embedded systems, medtech, robotics, or data tooling.
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
          <div className="footer">Designed &amp; coded by Ali Lakhani · © </div>
        </div>
      </section>
    </main>
  );
}
