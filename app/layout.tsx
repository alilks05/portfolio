import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ali Lakhani – Portfolio",
  description:
    "Portfolio of Ali Lakhani – hardware, software, data, and embedded systems projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          {/* Nav (shared) */}
          <header className="nav">
            <div className="logo">
              <div className="logo-mark">A</div>
              <span>Ali&nbsp;Lakhani</span>
            </div>
            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <a href="#contact">Contact</a>
              {/* optional separate /contact page later */}
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
