"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ThreeHero from "../components/ThreeHero";
import Iconify from "../components/Iconify";
import styles from "./professional.module.css";
import scrollStyles from "./scroll-experience.module.css";

const projects = [
  { number: "01", title: "Authorization platform", copy: "Implemented OpenID Connect Authorization Code Flow and a dynamic organizational role, group, and permission model across .NET APIs and React interfaces.", tags: ["OpenID Connect", "OAuth 2.0", "RBAC", ".NET + React"] },
  { number: "02", title: "Configurable workflow engine", copy: "Built a schema-driven form system that renders fields from backend data, including permission-aware visibility and edit controls at field level.", tags: ["Dynamic forms", "Workflow", "React", "Authorization"] },
  { number: "03", title: "Connected application services", copy: "Developed gRPC microservices with Consul discovery and real-time chat with SignalR, WebSocket, and JWT authentication.", tags: ["gRPC", "Consul", "SignalR", "JWT"] },
];

const skills = [
  ["Backend", "C#, ASP.NET Core, EF Core, gRPC, SignalR, Redis"],
  ["Frontend", "React, Next.js, TypeScript, Redux, Recoil"],
  ["Architecture", "Clean Architecture, CQRS, SOLID, Microservices"],
  ["Delivery", "Docker, GitLab CI/CD, Grafana, Loki, Prometheus"],
  ["Data", "SQL Server, PostgreSQL, Prisma ORM, S3 Object Storage"],
  ["Security", "OpenID Connect, OAuth 2.0, JWT, dynamic authorization"],
];

function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={reduce ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .6, delay, ease: [0.16, 1, .3, 1] }}>{children}</motion.div>;
}

export default function Home() {
  const pageRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: .001 });
  useEffect(() => {
    if (reduce) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(".js-hero-copy", { yPercent: -18, opacity: .2, ease: "none", scrollTrigger: { trigger: ".js-hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".js-hero-visual", { scale: .92 }, { scale: 1.06, ease: "none", scrollTrigger: { trigger: ".js-hero", start: "top top", end: "bottom top", scrub: 1.2 } });
      gsap.utils.toArray(".js-project").forEach((card, index) => gsap.from(card, { x: index % 2 ? 36 : -36, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 86%", once: true } }));
    }, pageRef);
    return () => context.revert();
  }, [reduce]);
  return <main id="main-content" className={styles.page} ref={pageRef}>
    <motion.div className={scrollStyles.progress} style={{ scaleX: smoothProgress }} />
    <section className={`${styles.hero} ${scrollStyles.hero} js-hero`} id="about">
      <div className={`${styles.heroCopy} js-hero-copy`}><Reveal><p className={styles.kicker}><span /> AVAILABLE FOR REMOTE OPPORTUNITIES</p><h1>Full-stack engineering for products that need to <em>last.</em></h1><p className={styles.lead}>I’m Sahand Golkar, a Full-Stack Developer with four years of experience building secure, scalable applications with .NET and React.</p><div className={styles.actions}><a href="mailto:golkar.sahand@gmail.com">Start a conversation <Iconify icon="solar:arrow-right-up-linear" /></a><a href="#work">View project experience ↓</a></div></Reveal></div>
      <Reveal delay={.1} className={`${styles.heroVisual} js-hero-visual`}><ThreeHero /><div className={styles.visualLabel}><span>SAHAND GOLKAR</span><span>FULL-STACK DEVELOPER</span></div></Reveal>
    </section>
    <section className={styles.summary}><Reveal><p className={styles.kicker}>PROFILE</p><h2>Thoughtful systems.<br /><em>Useful interfaces.</em></h2></Reveal><Reveal delay={.08}><div className={styles.summaryText}><p>I work across backend architecture, frontend delivery, and the platform practices that keep a product reliable in production. My focus is turning complex requirements into clear, maintainable software.</p><div className={styles.metrics}><div><strong>4+</strong><span>years of professional<br />development</span></div><div><strong>.NET</strong><span>backend and system<br />architecture</span></div><div><strong>React</strong><span>responsive product<br />interfaces</span></div></div></div></Reveal></section>
    <section className={styles.work} id="work"><Reveal><p className={styles.kicker}>SELECTED PROJECT EXPERIENCE</p><h2>Built for work<br />that <em>matters.</em></h2></Reveal><div className={styles.projects}>{projects.map((project, index) => <Reveal key={project.number} delay={index * .06}><motion.article className={styles.project} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}><span>{project.number}</span><div><h3>{project.title}</h3><p>{project.copy}</p><div>{project.tags.map((tag) => <b key={tag}>{tag}</b>)}</div></div><Iconify icon="solar:arrow-right-up-linear" /></motion.article></Reveal>)}</div></section>
    <section className={styles.skillSection} id="skills"><Reveal><p className={styles.kicker}>CAPABILITIES</p><h2>Technical range.<br /><em>Product focus.</em></h2></Reveal><div className={styles.skills}>{skills.map(([title, detail], index) => <Reveal key={title} delay={index * .045}><motion.article whileHover={{ y: -7 }} className={styles.skill}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></motion.article></Reveal>)}</div></section>
    <section className={styles.contact} id="contact"><Reveal><p className={styles.kicker}>LET’S CONNECT</p><h2>Have a product<br />to build?</h2><a className={styles.email} href="mailto:golkar.sahand@gmail.com">golkar.sahand@gmail.com <Iconify icon="solar:arrow-right-up-linear" /></a><div className={styles.links}><a href="https://github.com/sahand-13" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sahand-golkar-8a79b5210" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="tel:+989359550274">+98 935 955 0274</a></div></Reveal></section>
  </main>;
}
