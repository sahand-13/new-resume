"use client";

import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import profile from "../../../assets/profile/profile.jpg";
import { useLanguage } from "../../../contexts/LanguageContext";
import { resumeTranslations } from "../../../content/resumeTranslations";
import styles from "../portfolio.module.css";
import languageStyles from "./languages.module.css";
import switchStyles from "./LanguageSwitcher.module.css";
import rtlStyles from "../rtl-layout.module.css";

const sectionIds = ["about", "process", "work", "skills", "contact"];

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const [active, setActive] = useState("about");
  const { language, direction, setLanguage } = useLanguage();
  const t = resumeTranslations[language];
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    sectionIds.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const contents = <>
    <a href="#about" className={styles.brand} onClick={onCloseSidebar}>SG<span>.</span><small>{t.engineer}</small></a>
    <div className={switchStyles.switcher} role="group" aria-label={t.chooseLanguage}>
      <button aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      <button lang="fa" aria-pressed={language === "fa"} onClick={() => setLanguage("fa")}>فارسی</button>
    </div>
    <div className={styles.identity}>
      <img src={profile.src} alt="Sahand Golkar" width="76" height="76" />
      <h2>{t.name}</h2><p>{t.role}</p><span className={styles.location}>{t.location}</span>
    </div>
    <div className={styles.navLabel}>{t.explore}</div>
    <nav aria-label={t.explore} className={styles.nav}>
      {sectionIds.map((id, index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => { setActive(id); onCloseSidebar?.(); }}><span>0{index + 1}</span>{t.nav[index]}<i aria-hidden="true">↗</i></a>)}
    </nav>
    <div className={styles.sidebarNote}><span>{t.focus}</span><p>{t.focusLines[0]}<br />{t.focusLines[1]}<br />{t.focusLines[2]}</p></div>
    <section className={languageStyles.languages} aria-labelledby="language-heading">
      <div className={languageStyles.title} id="language-heading">{t.languages}</div>
      <div className={languageStyles.item}><div className={languageStyles.row}><span className={languageStyles.code}>FA</span><span className={languageStyles.name}>{t.persian}</span><span className={languageStyles.level}>{t.native}</span></div><div className={languageStyles.track} role="img" aria-label={`${t.persian}: ${t.native}`}><span /></div></div>
      <div className={languageStyles.item}><div className={languageStyles.row}><span className={languageStyles.code}>EN</span><span className={languageStyles.name}>{t.english}</span><span className={languageStyles.level}>{t.professional}</span></div><div className={languageStyles.track} role="img" aria-label={`${t.english}: ${t.proficiency}`}><span /></div><p className={languageStyles.note}>{t.proficiency}</p></div>
    </section>
    <div className={styles.sidebarFooter}><a href="mailto:golkar.sahand@gmail.com">{t.talk} <span>↗</span></a><div><a href="https://github.com/sahand-13" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sahand-golkar-8a79b5210" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><p>{t.built}</p></div>
  </>;

  return <>
    <aside id="resume-sidebar" className={`${styles.sidebar} ${language === "fa" ? rtlStyles.sidebarRight : ""}`} aria-label={t.explore} dir={direction}>{contents}</aside>
    <Drawer anchor={language === "fa" ? "right" : "left"} open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: { width: "min(320px, 88vw)", background: "#152d26", color: "#f4efe4" } }}>
      <div className={styles.drawerContent} dir={direction}><button className={styles.close} onClick={onCloseSidebar} aria-label={t.close}>{t.close} ×</button>{contents}</div>
    </Drawer>
  </>;
}
