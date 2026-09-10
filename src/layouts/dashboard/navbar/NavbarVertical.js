"use client";

import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import profile from "../../../assets/profile/profile.jpg";
import styles from "../portfolio.module.css";

const sections = [
  ["about", "Introduction"],
  ["work", "Project experience"],
  ["skills", "Technical skills"],
  ["contact", "Get in touch"],
];

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const contents = (
    <>
      <a href="#about" className={styles.brand} onClick={onCloseSidebar}>
        SG<span>.</span>
        <small>SOFTWARE ENGINEER</small>
      </a>
      <div className={styles.identity}>
        <img src={profile.src} alt="Sahand Golkar" width="76" height="76" />
        <h2>Sahand Golkar</h2>
        <p>Full-Stack Developer</p>
        <span className={styles.location}>Karaj, Iran</span>
      </div>
      <div className={styles.navLabel}>EXPLORE</div>
      <nav aria-label="Resume sections" className={styles.nav}>
        {sections.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => {
              setActive(id);
              onCloseSidebar?.();
            }}
          >
            <span>0{index + 1}</span>
            {label}
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </nav>
      <div className={styles.sidebarNote}>
        <span>CORE FOCUS</span>
        <p>
          .NET & React
          <br />
          Secure applications.
          <br />
          Connected systems.
        </p>
      </div>
      <div className={styles.sidebarFooter}>
        <a href="mailto:golkar.sahand@gmail.com">
          Let’s talk <span>↗</span>
        </a>
        <div>
          <a
            href="https://github.com/sahand-13"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/sahand-golkar-8a79b5210"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <p>Built with care. By Sahand.</p>
      </div>
    </>
  );

  return (
    <>
      <aside
        id="resume-sidebar"
        className={styles.sidebar}
        aria-label="Profile and navigation"
      >
        {contents}
      </aside>
      <Drawer
        open={isOpenSidebar}
        onClose={onCloseSidebar}
        PaperProps={{
          sx: {
            width: "min(320px, 88vw)",
            background: "#152d26",
            color: "#f4efe4",
          },
        }}
      >
        <div className={styles.drawerContent}>
          <button
            className={styles.close}
            onClick={onCloseSidebar}
            aria-label="Close navigation"
          >
            Close ×
          </button>
          {contents}
        </div>
      </Drawer>
    </>
  );
}
