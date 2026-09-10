"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./KineticStory.module.css";
import responsive from "./KineticStoryResponsive.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { resumeTranslations } from "../content/resumeTranslations";

function Chapter({ chapter, progress, range, reduced }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [reduced ? 0 : 70, 0, 0, reduced ? 0 : -70]);
  const scale = useTransform(progress, range, [reduced ? 1 : 0.96, 1, 1, reduced ? 1 : 1.03]);

  return (
    <motion.article className={`${styles.chapter} ${responsive.chapter}`} style={{ opacity, y, scale }}>
      <div className={styles.meta}><span>{chapter.number} / 03</span><span>{chapter.label}</span></div>
      <h2>{chapter.title}</h2>
      <p>{chapter.copy}</p>
    </motion.article>
  );
}

export default function KineticStory() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { language, direction } = useLanguage();
  const t = resumeTranslations[language];
  const chapters = t.chapters.map(([label, title, copy], index) => ({ number: `0${index + 1}`, label, title, copy }));
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 155]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-12%"]);
  const background = useTransform(scrollYProgress, [0, 0.48, 1], ["#0b1713", "#18342b", "#0b1713"]);
  const counter = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["01", "02", "03", "03"]);

  return (
    <motion.section ref={ref} id="process" dir={direction} className={`${styles.story} ${responsive.story}`} style={{ background }} aria-label={t.processLabel}>
      <div className={`${styles.sticky} ${responsive.sticky}`}>
        <motion.div className={styles.wordmark} style={{ x: wordX }} aria-hidden="true">{t.wordmark}</motion.div>
        <motion.div className={`${styles.orbit} ${responsive.orbit}`} style={{ rotate }} aria-hidden="true"><i /><i /><i /></motion.div>
        <div className={`${styles.chapters} ${responsive.chapters}`}>
          <Chapter chapter={chapters[0]} progress={scrollYProgress} range={[0, 0.08, 0.25, 0.39]} reduced={reduced} />
          <Chapter chapter={chapters[1]} progress={scrollYProgress} range={[0.28, 0.4, 0.57, 0.71]} reduced={reduced} />
          <Chapter chapter={chapters[2]} progress={scrollYProgress} range={[0.61, 0.73, 0.92, 1]} reduced={reduced} />
        </div>
        <div className={`${styles.rail} ${responsive.rail}`} aria-hidden="true"><motion.span style={{ scaleY: scrollYProgress }} /></div>
        <motion.div className={`${styles.counter} ${responsive.counter}`} aria-hidden="true">{counter}</motion.div>
        <span className={`${styles.scrollHint} ${responsive.scrollHint}`}>{t.scroll}</span>
      </div>
    </motion.section>
  );
}
