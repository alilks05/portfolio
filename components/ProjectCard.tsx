"use client";

import { useState, ReactNode } from "react";

type ProjectSection = {
  key: string;
  label: string;
  content: ReactNode;
};

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectCardProps = {
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  techSummary?: string;
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export default function ProjectCard({
  title,
  subtitle,
  image,
  imageAlt,
  techSummary,
  sections,
  links,
}: ProjectCardProps) {
  const [activeKey, setActiveKey] = useState(
    sections[0]?.key ?? "overview"
  );

  const activeSection =
    sections.find((s) => s.key === activeKey) ?? sections[0];

  return (
    <article className="project project-shell">
      <div className="project-header-line">
        <div>
          <h3 className="project-title">{title}</h3>
          <p className="project-subtitle">{subtitle}</p>
        </div>
        {techSummary && (
          <span className="project-tag project-tag-pill">
            {techSummary}
          </span>
        )}
      </div>

      <div className="project-main">
        <div className="project-media">
          {image && (
            <div className="project-media-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={imageAlt ?? title} />
            </div>
          )}

          {links && links.length > 0 && (
            <div className="project-links-row">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-chip"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="project-content">
          <div className="project-tabs">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveKey(section.key)}
                className={
                  "project-tab" +
                  (section.key === activeKey
                    ? " project-tab--active"
                    : "")
                }
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="project-body">
            {activeSection?.content}
          </div>
        </div>
      </div>
    </article>
  );
}
