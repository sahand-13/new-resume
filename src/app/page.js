"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ThreeHero from "../components/ThreeHero";
import KineticStory from "../components/KineticStory";
import Iconify from "../components/Iconify";
import styles from "./professional.module.css";
import scrollStyles from "./scroll-experience.module.css";
import profileStyles from "./profile-scene.module.css";
import responsive from "./responsive.module.css";
import bilingual from "./bilingual.module.css";
import rtlProgress from "./rtl-progress.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { resumeTranslations } from "../content/resumeTranslations";

function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={reduce ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .6, delay, ease: [0.16, 1, .3, 1] }}>{children}</motion.div>;
}

function ScrollScene({ children, className, id, label, variant, watermark }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const isFinal = variant === "contact";
  const y = useTransform(scrollYProgress, [0, .18, .8, 1], reduce ? [0, 0, 0, 0] : ["12vh", "0vh", "0vh", isFinal ? "0vh" : "-12vh"]);
  const scale = useTransform(scrollYProgress, [0, .18, .78, 1], reduce ? [1, 1, 1, 1] : [.94, 1, 1, isFinal ? 1 : .965]);
  const opacity = useTransform(scrollYProgress, [0, .14, .84, 1], reduce ? [1, 1, 1, 1] : [.72, 1, 1, isFinal ? 1 : .72]);
  const radius = useTransform(scrollYProgress, [0, .18, .82, 1], reduce ? [0, 0, 0, 0] : [32, 0, 0, isFinal ? 0 : 32]);
  const rotate = useTransform(scrollYProgress, [0, .18, .82, 1], reduce ? [0, 0, 0, 0] : variant === "profile" ? [-2.5, 0, 0, 1] : variant === "work" ? [1.8, 0, 0, -1.2] : [0, 0, 0, 0]);
  const blur = useTransform(scrollYProgress, [0, .16, .84, 1], reduce ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(5px)", "blur(0px)", "blur(0px)", isFinal ? "blur(0px)" : "blur(4px)"]);
  return <div ref={ref} className={scrollStyles.sceneTrack}>
    <motion.section id={id} data-scene={variant} data-watermark={watermark} aria-label={label} className={`${className} ${scrollStyles.scene} js-scene`} style={{ y, scale, opacity, rotate, filter: blur, borderRadius: radius }}>
      <span className={scrollStyles.sceneIndex} aria-hidden="true">{label}</span>{children}
    </motion.section>
  </div>;
}

export default function Home() {
  const pageRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { language, direction } = useLanguage();
  const t = resumeTranslations[language];
  const currentProjects = t.projects.map(([title, copy, tags], index) => ({ number: `0${index + 1}`, title, copy, tags }));
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: .001 });

  useEffect(() => {
    if (reduce) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(".js-hero-copy", { yPercent: -18, opacity: .2, ease: "none", scrollTrigger: { trigger: ".js-hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".js-hero-visual", { scale: .92 }, { scale: 1.06, ease: "none", scrollTrigger: { trigger: ".js-hero", start: "top top", end: "bottom top", scrub: 1.2 } });
      if (window.innerWidth > 900) gsap.utils.toArray(".js-scene").forEach((scene) => {
        const heading = scene.querySelector(".js-scene-heading");
        const items = scene.querySelectorAll(".js-scene-item");
        const theme = scene.dataset.scene;
        if (heading) gsap.fromTo(heading, { yPercent: theme === "contact" ? 90 : 55, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", ease: "none", scrollTrigger: { trigger: scene, start: "top 78%", end: "top 32%", scrub: .8 } });
        if (theme === "profile") gsap.fromTo(items, { xPercent: 18, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 66%", end: "top 24%", scrub: 1 } });
        if (theme === "work") items.forEach((item, index) => gsap.fromTo(item, { xPercent: index % 2 ? 18 : -18, skewX: index % 2 ? -4 : 4, opacity: 0 }, { xPercent: 0, skewX: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 88%", end: "top 55%", scrub: .65 } }));
        if (theme === "skills") gsap.fromTo(items, { rotateY: -55, rotateX: 18, z: -120, opacity: 0, transformOrigin: "left center" }, { rotateY: 0, rotateX: 0, z: 0, opacity: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 68%", end: "top 18%", scrub: .9 } });
        if (theme === "contact") gsap.fromTo(items, { scale: .72, opacity: 0, letterSpacing: "10px" }, { scale: 1, opacity: 1, letterSpacing: "0px", ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 70%", end: "top 25%", scrub: .8 } });
      });
    }, pageRef);
    return () => context.revert();
  }, [reduce]);

  return <main id="main-content" dir={direction} className={`${styles.page} ${responsive.page} ${language === "fa" ? bilingual.rtl : ""}`} ref={pageRef}>
    <motion.div className={`${scrollStyles.progress} ${language === "fa" ? rtlProgress.progress : ""}`} style={{ scaleX: smoothProgress }} />
    <section className={`${styles.hero} ${scrollStyles.hero} js-hero`} id="about">
      <div className={`${styles.heroCopy} js-hero-copy`}><Reveal><p className={styles.kicker}><span /> {t.available}</p><h1>{t.heroStart} <em>{t.heroEm}</em></h1><p className={styles.lead}>{t.lead}</p><div className={styles.actions}><a href="mailto:golkar.sahand@gmail.com">{t.conversation} <Iconify icon="solar:arrow-right-up-linear" /></a><a href="#work">{t.viewWork} ↓</a></div></Reveal></div>
      <Reveal delay={.1} className={`${styles.heroVisual} js-hero-visual`}><ThreeHero label={t.threeLabel} /><div className={styles.visualLabel}><span>{t.name}</span><span>{t.role}</span></div></Reveal>
    </section>
    <KineticStory />
    <ScrollScene className={`${styles.summary} ${profileStyles.scene}`} label={t.profileLabel} variant="profile">
      <Reveal className={`js-scene-heading ${profileStyles.heading}`}><p className={styles.kicker}>{t.profileKicker}</p><h2>{t.profileStart} <em>{t.profileEm}</em></h2><span className={profileStyles.code}>{t.profileCode}</span></Reveal>
      <Reveal className={`js-scene-item ${profileStyles.body}`}><div className={profileStyles.statement}><span>{t.short}</span><p>{t.profileCopy}</p></div><div className={profileStyles.profileMetrics}>{t.metrics.map(([label, value, copy]) => <article key={label}><small>{label}</small><strong>{value}</strong><p>{copy}</p></article>)}</div></Reveal>
    </ScrollScene>
    <ScrollScene className={styles.work} id="work" label={t.workLabel} variant="work" watermark={t.projectsWatermark}>
      <Reveal className="js-scene-heading"><p className={styles.kicker}>{t.workKicker}</p><h2>{t.workStart}<br /><em>{t.workEm}</em></h2></Reveal>
      <div className={styles.projects}>{currentProjects.map((project) => <div className="js-scene-item" key={project.number}><motion.article className={styles.project} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.copy}</p><div>{project.tags.map((tag) => <b key={tag}>{tag}</b>)}</div></div><Iconify icon="solar:arrow-right-up-linear" /></motion.article></div>)}</div>
    </ScrollScene>
    <ScrollScene className={styles.skillSection} id="skills" label={t.skillsLabel} variant="skills">
      <Reveal className="js-scene-heading"><p className={styles.kicker}>{t.skillsKicker}</p><h2>{t.skillsStart}<br /><em>{t.skillsEm}</em></h2></Reveal>
      <div className={styles.skills}>{t.skills.map(([title, detail], index) => <div className="js-scene-item" key={title}><motion.article whileHover={{ y: -7 }} className={styles.skill}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></motion.article></div>)}</div>
    </ScrollScene>
    <ScrollScene className={styles.contact} id="contact" label={t.contactLabel} variant="contact">
      <Reveal className="js-scene-heading"><p className={styles.kicker}>{t.contactKicker}</p><h2>{t.contactStart}<br />{t.contactEnd}</h2></Reveal>
      <div className="js-scene-item"><a className={styles.email} href="mailto:golkar.sahand@gmail.com">golkar.sahand@gmail.com <Iconify icon="solar:arrow-right-up-linear" /></a><div className={styles.links}><a href="https://github.com/sahand-13" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sahand-golkar-8a79b5210" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="tel:+989359550274">+98 935 955 0274</a></div></div>
    </ScrollScene>
  </main>;
}
