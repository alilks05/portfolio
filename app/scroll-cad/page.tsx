import ScrollStory from "../../components/ScrollStory";
import ExperienceTimeline from "../../components/ExperienceTimeline";
import SkillsSection from "../../components/SkillsSection";
import ContactSection from "../../components/ContactSection";



export const metadata = {
  title: "Ali Lakhani – Portfolio",
  description:
    "Portfolio of Ali Lakhani – hardware, software, data, and embedded systems projects.",
};

export default function HomePage() {
  return (
    <main>
      {/* INTRO HEADER */}
      <section className="hero">
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
  <a className="btn-main" href="#story">
    Scroll ↓
  </a>

  <a
  className="btn-ghost"
  href="/Ali_Lakhani_Resume.pdf"
  download
  
  
>
  View Resume
</a>


  <a className="btn-ghost" href="#contact">
    Get in touch
  </a>
</div>

        </div>

        <div className="hero-right">
          <img
            src="/images/profile.jpeg"
            alt="Ali Lakhani"
            className="hero-photo"
          />
        </div>
      </section>

      {/* APPLE-STYLE SCROLL STORY */}
      <section id="story">
        <ScrollStory />
      </section>

      

      <section id="experiences">
      <ExperienceTimeline />
      </section>
      <section id="skills">
<SkillsSection />
</section>
<section id="contact">
<ContactSection />
</section>

    </main>
  );
}
