import Timeline from "../components/Timeline";

export const metadata = {
  title: "Ali Lakhani – Portfolio",
  description:
    "Portfolio of Ali Lakhani – hardware, software, data, and embedded systems projects.",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div>
          <div className="hero-pill-row">
            <div className="pill">Mechatronics Engineering</div>
            <div className="pill">Hardware · Software · Data</div>
          </div>

          <h1 className="hero-title">
            Building systems at the intersection of hardware, software, and
            data analysis.
          </h1>

          <p className="hero-subtitle">
            I'm a University of Waterloo Mechatronics Engineering student. I've
            developed, tested, and deployed electromechanical systems in a
            variety of internships and projects. Most recently, I've
            experimented with data analysis tools for a medical-standard
            wearable.
          </p>

          <div className="hero-buttons">
          <a className="btn-main" href="#timeline">
              View timeline ↓
            </a>
            <a className="btn-ghost" href="/projects">
              View projects
            </a>
            <a className="btn-ghost" href="/projects#contact">
              Get In Touch
            </a>
          </div>

          <p className="hero-meta">
            Currently exploring roles in{" "}
            <strong>
              mechatronics engineering, data-involved roles, embedded systems, systems engineering and more. 
            </strong>
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />
    </main>
  );
}
