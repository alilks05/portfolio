"use client";

type TimelineItem = {
  id: string;
  title: string;
  role?: string;
  company?: string;
  start: string;
  end?: string;
  link?: string;
};

const items: TimelineItem[] = [
    {
        id: "westpark",
        title: "R&D Eng Intern",
        company: "West Park Healthcare Center",
        start: "Summer 2023",
        end: "",
      },
  {
    id: "lightci",
    title: "Software Eng Intern",
    company: "LightCI",
    start: "Summer 2024",
    end: "",
  },
  
  
  {
    id: "volt",
    title: "Manufacturing Eng Intern",
    company: "Volt Carbon Technologies",
    start: "Spring 2025",
    end: "",
  },
  {
    id: "vitruvius",
    title: "Hardware & Systems Eng Intern",
    company: "Vitruvius Innovation",
    start: "Fall 2025",
    end: "",
  },
  
];

export default function Timeline() {
  return (
    <section id="timeline" className="timeline-inline">
  <h2 className="section-title">
    <span>01</span> · Timeline
  </h2>

  <div className="timeline-inline-shell">
  

    <div className="timeline-inline-grid">
        
      {items.map((item) => (
        <div key={item.id} className="timeline-inline-item">

          <p className="timeline-inline-date">
            {item.start} {item.end ? `– ${item.end}` : ""}
          </p>
          <h3 className="timeline-inline-title">{item.company}</h3>
          <p className="timeline-inline-company">{item.title}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
