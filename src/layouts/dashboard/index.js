"use client";

import { useState } from "react";
import NavbarVertical from "./navbar/NavbarVertical";
import styles from "./portfolio.module.css";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  return <div className={styles.shell}>
    <a className={styles.skip} href="#main-content">Skip to content</a>
    <header className={styles.mobileHeader}>
      <a href="#about">SG<span>.</span></a>
      <button aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="resume-sidebar" onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu ☰"}</button>
    </header>
    <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
    <div className={styles.content}>{children}</div>
  </div>;
}
