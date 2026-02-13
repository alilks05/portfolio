"use client";

export default function ContactSection() {
  const contactItems = [
    {
      label: "EMAIL",
      value: "a6lakhan@uwaterloo.ca",
      href: "mailto:a6lakhan@uwaterloo.ca",
    },
    {
      label: "GITHUB",
      value: "@alilks05",
      href: "https://github.com/alilks05",
    },
    {
      label: "LINKEDIN",
      value: "/in/ali-lakhani-a676b7175/",
      href: "https://www.linkedin.com/in/ali-lakhani-a676b7175/",
    },
    {
      label: "LOCATION",
      value: "Canada · open to relocation",
      href: null,
    },
  ];

  return (
    <section
      style={{
        padding: "0px 0",
        background: "#05070d",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Section Label */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: 2,
            marginBottom: 40,
            opacity: 0.7,
          }}
        >
          {/* <span style={{ color: "#4cc9f0" }}>02</span> · CONTACT */}
        </div>

        {/* Main Card */}
        <div
          style={{
            borderRadius: 32,
            padding: "60px",
            background:
              "linear-gradient(135deg, rgba(10,20,40,0.9), rgba(5,10,20,0.95))",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 60,
          }}
        >
          {/* LEFT SIDE */}
          <div>
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.6,
                opacity: 0.85,
              }}
            >
              I’d love to connect about internships, projects, or collaborations
              in embedded systems, robotics, or data engineering.
            </p>

            <div style={{ marginTop: 40 }}>
              <a
                href="mailto:a6lakhan@uwaterloo.ca"
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#ffffff",
                }}
              >
                → Email me at a6lakhan@uwaterloo.ca
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {contactItems.map((item, i) =>
              item.href ? (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "14px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    fontSize: 14,
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      letterSpacing: 2,
                      opacity: 0.5,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ opacity: 0.9 }}>{item.value}</span>
                </a>
              ) : (
                <div
                  key={i}
                  style={{
                    padding: "14px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <span
                    style={{
                      letterSpacing: 2,
                      opacity: 0.5,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ opacity: 0.9 }}>{item.value}</span>
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: 40,
              textAlign: "right",
              opacity: 0.4,
              fontSize: 14,
            }}
          >
            Designed & coded by Ali Lakhani · © 2026
          </div>
        </div>
      </div>
    </section>
  );
}
