"use client";

import { useState } from "react";
import NavbarVertical from "./navbar/NavbarVertical";
import styles from "./portfolio.module.css";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import { resumeTranslations } from "../../content/resumeTranslations";
import rtlStyles from "./rtl-layout.module.css";

export default function DashboardLayout({ children }) {
  return <LanguageProvider><DashboardShell>{children}</DashboardShell></LanguageProvider>;
}

function DashboardShell({ children }) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const t = resumeTranslations[language];
  return <div className={styles.shell}>
    <a className={styles.skip} href="#main-content">{t.skip}</a>
    <header className={styles.mobileHeader}>
      <a href="#about">SG<span>.</span></a>
      <button aria-label={open ? t.close : t.menu} aria-expanded={open} aria-controls="resume-sidebar" onClick={() => setOpen(!open)}>{open ? `${t.close} ×` : `${t.menu} ☰`}</button>
    </header>
    <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
    <div className={`${styles.content} ${language === "fa" ? rtlStyles.contentRight : ""}`}>{children}</div>
  </div>;
}
