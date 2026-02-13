"use client";

import { useEffect, useState } from "react";
import type { Project } from "./projectTypes";

export default function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  const [tab, setTab] = useState<"mechanical" | "hardware">("mechanical");
  const [showPhotos, setShowPhotos] = useState(false);

  const tabs = project?.tabs ?? [];
  const hasTabs = tabs.length > 0;

  // ✅ Reset state safely
  useEffect(() => {
    if (!open) return;

    setTab("mechanical");
    setShowPhotos(!hasTabs); // auto gallery if no tabs
  }, [open, project?.id, hasTabs]);

  // ✅ ESC + scroll lock
  useEffect(() => {
    if (!open) return;
  
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
  
    document.addEventListener("keydown", onKeyDown);
  
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
  
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
  
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [open, onClose]);
  

  // ✅ Early return AFTER hooks
  if (!open || !project) return null;

  const activeTab = tabs.find((t) => t.key === tab) ?? tabs[0];

  return (
    <div
      className="cs-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cs-card" onMouseDown={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="cs-topbar">

          {hasTabs && (
            <>
              <div className="cs-cornerCad">
                {project.cornerCad?.src ? (
                  <img
                    src={project.cornerCad.src}
                    alt={project.cornerCad.alt ?? "CAD preview"}
                    className="cs-cornerCadImg"
                  />
                ) : (
                  <div className="cs-cornerCadPlaceholder">
                    Full 3d cad in corner
                  </div>
                )}
              </div>

              <div className="cs-tabs">
                <button
                  className={`cs-tab ${tab === "mechanical" ? "active" : ""}`}
                  onClick={() => setTab("mechanical")}
                  type="button"
                >
                  Mechanical
                </button>
                <button
                  className={`cs-tab ${tab === "hardware" ? "active" : ""}`}
                  onClick={() => setTab("hardware")}
                  type="button"
                >
                  Hardware
                </button>
              </div>

              <button
                className="cs-photosBtn"
                type="button"
                onClick={() => setShowPhotos((v) => !v)}
              >
                {showPhotos ? (
                  <>
                    view
                    <br />
                    descriptions
                  </>
                ) : (
                  <>
                    view more
                    <br />
                    photos
                  </>
                )}
              </button>
            </>
          )}

          <button
            className="cs-close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cs-body">
          {hasTabs && !showPhotos ? (
            <div className="cs-blocks">
              {activeTab?.blocks?.map((b, idx) => {
                const hasMedia = !!b.leftMedia;

                return (
                  <div
                    key={idx}
                    className="cs-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: hasMedia
                        ? "minmax(240px, 380px) 1fr"
                        : "1fr",
                      gap: 18,
                      alignItems: "start",
                    }}
                  >
                    {hasMedia && (
                      <div className="cs-left">
                        {b.leftMedia.type === "image" && (
                          <img
                            className="cs-leftMedia"
                            src={b.leftMedia.src}
                            alt={b.leftMedia.alt ?? b.title}
                          />
                        )}

                        {b.leftMedia.type === "video" && (
                          <video
                            className="cs-leftMedia"
                            src={b.leftMedia.src}
                            poster={b.leftMedia.poster}
                            controls
                            playsInline
                          />
                        )}

                        {b.leftMedia.type === "cad" && (
                          <model-viewer
                            src={b.leftMedia.src}
                            poster={b.leftMedia.poster}
                            className="cs-leftMedia cs-leftCad"
                            camera-controls
                            auto-rotate
                            alt={b.leftMedia.alt ?? b.title}
                          />
                        )}
                      </div>
                    )}

                    <div className="cs-right">
                      <div className="cs-heading">{b.title}</div>
                      <ul className="cs-bullets">
                        {b.bullets.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="cs-photosGrid">
              {(project.gallery ?? []).map((img, i) => (
                <img
                  key={img.src + i}
                  className="cs-photo"
                  src={img.src}
                  alt={img.alt ?? ""}
                />
              ))}
              {(!project.gallery || project.gallery.length === 0) && (
                <div className="cs-empty">
                  No photos set for this project.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
