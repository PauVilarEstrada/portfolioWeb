import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import { useI18n } from "../i18n/LanguageContext";
import { rt } from "../i18n/rich";
import Reveal from "./Reveal";

const FLOAT_SYMBOLS = [
  "const", "async", "import", "function", "return",
  "class", "await", "export", "interface", "{ }",
  "<AI/>", "01010", "while", "=>", "null", "type",
];

// Project logos
import mindflowLogo from "./myprojects/assets/logosApps/mindflowlogo.png";
import udLogo from "./myprojects/assets/logosApps/ultimusdefensorlogo.png";
import kddLogo from "./myprojects/assets/logosApps/kdd.png";
import nbaLogo from "./myprojects/assets/logosApps/nbavisionlogo.png";

// Tech logos
import pythonLogo from "../assets/pythonlogo.webp";
import reactLogo from "../assets/reactlogo.webp";
import dockerLogo from "../assets/dockerlogo.png";
import awsLogo from "../assets/awslogo.png";
import flaskLogo from "../assets/flasklogo.png";
import javaLogo from "../assets/javalogo.png";
import javascriptLogo from "../assets/javascriptlogo.webp";
import typeScriptLogo from "../assets/typescriptlogo.png";
import angularLogo from "../assets/angularlogo.webp";
import sqlLogo from "../assets/sqllogo.png";
import gitLogo from "../assets/gitlogo.png";
import kotlinLogo from "../assets/kotlinlogo.png";
import springbootLogo from "../assets/springbootlogo.png";
import TailwindLogo from "../assets/tailwindlogo.svg";
import nodejsLogo from "../assets/nodejslogo.png";
import djangoLogo from "../assets/djangologo.svg";
import bashLogo from "../assets/bashlogo.png";

// Social icons
import githubIconWhite from "../assets/githublogoblanco.png";
import linkedinIcon from "../assets/linkedinlogo.png";

const PROJECT_META = [
  { key: "ultimus", logo: udLogo, path: "/projects/ultimusdefensor", color: "#38bdf8", featured: true },
  { key: "nba", logo: nbaLogo, path: "/projects/nbavision", color: "#ef4444" },
  { key: "mindflow", logo: mindflowLogo, path: "/projects/mindflow", color: "#6c9bff" },
  { key: "kdd", logo: kddLogo, path: "/projects/kdd", color: "#22c55e" },
] as const;

const techStack = [
  { name: "Python", logo: pythonLogo },
  { name: "React", logo: reactLogo },
  { name: "TypeScript", logo: typeScriptLogo },
  { name: "JavaScript", logo: javascriptLogo },
  { name: "Java", logo: javaLogo },
  { name: "Docker", logo: dockerLogo },
  { name: "AWS", logo: awsLogo },
  { name: "Flask", logo: flaskLogo },
  { name: "Angular", logo: angularLogo },
  { name: "SQL", logo: sqlLogo },
  { name: "Node.js", logo: nodejsLogo },
  { name: "Kotlin", logo: kotlinLogo },
  { name: "Spring Boot", logo: springbootLogo },
  { name: "Tailwind", logo: TailwindLogo },
  { name: "Django", logo: djangoLogo },
  { name: "Git", logo: gitLogo },
  { name: "Bash", logo: bashLogo },
];

const techRowA = techStack.slice(0, 9);
const techRowB = techStack.slice(9);

const MARQUEE_BADGES = [
  "Google Play", "Vercel", "Render", "GitHub", "Matrícula de Honor",
  "División de Honor", "XGBoost", "FastAPI", "React Native", "Docker",
];

export default function HomePage() {
  const { t, lang } = useI18n();
  const [roleIdx, setRoleIdx] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const [termIdx, setTermIdx] = useState(0);
  const [termText, setTermText] = useState("");
  const [termOut, setTermOut] = useState("");
  const [termPhase, setTermPhase] = useState<"typing" | "output" | "pause">("typing");

  const roles = t.home.roles;
  const terminalLines = t.home.terminal;

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % roles.length);
        setFadeState("in");
      }, 500);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Reset the terminal when the language changes
  useEffect(() => {
    setTermIdx(0); setTermText(""); setTermOut(""); setTermPhase("typing");
  }, [lang]);

  useEffect(() => {
    const current = terminalLines[termIdx];
    if (!current) return;
    if (termPhase === "typing") {
      if (termText.length < current.cmd.length) {
        const to = setTimeout(() => setTermText(current.cmd.slice(0, termText.length + 1)), 38);
        return () => clearTimeout(to);
      }
      const to = setTimeout(() => { setTermOut(current.out); setTermPhase("output"); }, 500);
      return () => clearTimeout(to);
    }
    if (termPhase === "output") {
      const to = setTimeout(() => setTermPhase("pause"), 2200);
      return () => clearTimeout(to);
    }
    const to = setTimeout(() => {
      setTermText(""); setTermOut("");
      setTermIdx(i => (i + 1) % terminalLines.length);
      setTermPhase("typing");
    }, 400);
    return () => clearTimeout(to);
  }, [termText, termPhase, termIdx, terminalLines]);

  return (
    <div key={lang} className="lang-fade">
      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="hero-orb hero-orb--a" aria-hidden="true" />
        <div className="hero-orb hero-orb--b" aria-hidden="true" />

        <div className="hero-float-code" aria-hidden="true">
          {FLOAT_SYMBOLS.map((sym, i) => (
            <span key={i} className={`hfc hfc-${i}`}>{sym}</span>
          ))}
        </div>

        <div className="hero-content">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            {t.home.badge}
          </span>

          <h1 className="hero-name" data-text={t.home.name}>{t.home.name}</h1>

          <div className="hero-role-wrap">
            <p className={`hero-role ${fadeState === "out" ? "fade-out" : "fade-in"}`}>
              <span className="hero-role-prompt">&gt;</span> {roles[roleIdx]}
            </p>
          </div>

          <p className="hero-tagline">{rt(t.home.tagline)}</p>

          <div className="hero-ctas">
            <Link to="/projects" className="btn-primary">{t.home.ctaWork}</Link>
            <Link to="/contact" className="btn-secondary">{t.home.ctaContact}</Link>
          </div>

          <div className="hero-stats">
            {t.home.stats.map(s => (
              <div className="hero-stat" key={s.l}>
                <span className="hero-stat-number">{s.n}</span>
                <span className="hero-stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-terminal" aria-hidden="true">
          <div className="hero-terminal-bar">
            <div className="hero-terminal-dot" />
            <div className="hero-terminal-dot" />
            <div className="hero-terminal-dot" />
            <span className="hero-terminal-title">{t.home.terminalTitle}</span>
          </div>
          <div className="hero-terminal-body">
            <div className="hero-terminal-cmd">
              {termText}<span className="hero-terminal-cursor" />
            </div>
            {termOut && <div className="hero-terminal-output">{termOut}</div>}
          </div>
        </div>

        <div className="home-scroll-hint">
          <span>{t.home.scroll}</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── BADGE MARQUEE ── */}
      <div className="badge-marquee" aria-hidden="true">
        <div className="badge-marquee-inner">
          {[...MARQUEE_BADGES, ...MARQUEE_BADGES].map((b, i) => (
            <span key={i} className="badge-chip">{b}<i>◆</i></span>
          ))}
        </div>
      </div>

      {/* ── WHAT I DO ── */}
      <section className="home-section">
        <Reveal className="home-section-header">
          <h2 className="home-section-title">
            {t.home.focusTitle[0]} <span>{t.home.focusTitle[1]}</span>
          </h2>
        </Reveal>

        <div className="focus-grid">
          {t.home.focus.map((f, i) => (
            <Reveal key={f.h} className="focus-card" delay={i * 90}>
              <span className="focus-icon">{f.icon}</span>
              <h3>{f.h}</h3>
              <p>{f.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="home-section">
        <Reveal className="home-section-header">
          <h2 className="home-section-title">
            {t.home.featuredTitle[0]} <span>{t.home.featuredTitle[1]}</span>
          </h2>
          <Link to="/projects" className="home-section-link">{t.home.featuredLink}</Link>
        </Reveal>

        <div className="projects-grid">
          {PROJECT_META.map((meta, i) => {
            const p = (t.projects as any)[meta.key];
            return (
              <Reveal key={meta.path} delay={i * 80} className={meta.featured ? "grid-wide" : ""}>
                <Link
                  to={meta.path}
                  className={`proj-card${meta.featured ? " proj-card--featured proj-card--wide" : ""}`}
                  style={{ "--proj-color": meta.color } as React.CSSProperties}
                >
                  {meta.featured && <span className="proj-featured-badge">★ Featured</span>}
                  <div className="proj-card-top">
                    <img src={meta.logo} alt={p.short} className="proj-logo" />
                    <span className="proj-arrow">↗</span>
                  </div>
                  <p className="proj-name">{p.short}</p>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map((tag: string) => (
                      <span key={tag} className="proj-tag">{tag}</span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      <section className="home-section exp-bg">
        <Reveal className="home-section-header">
          <h2 className="home-section-title">
            {t.home.timelineTitle[0]} <span>{t.home.timelineTitle[1]}</span>
          </h2>
          <Link to="/experience" className="home-section-link">{t.home.timelineLink}</Link>
        </Reveal>

        <div className="timeline">
          {t.home.timeline.map((item, i) => (
            <Reveal key={i} className="timeline-item" delay={i * 70}>
              <div className={`timeline-dot ${item.active ? "" : "dim"}`} />
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-role"><span className="timeline-icon">{item.icon}</span>{item.role}</div>
              <div className="timeline-org">{item.org}</div>
              <div className="timeline-desc">{item.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="home-section tech-bg">
        <Reveal className="home-section-header" >
          <h2 className="home-section-title">
            {t.home.techTitle[0]} <span>{t.home.techTitle[1]}</span>
          </h2>
          <span className="home-section-note">{t.home.techSubtitle}</span>
        </Reveal>

        <div className="tech-marquee">
          <div className="tech-marquee-inner">
            {[...techRowA, ...techRowA, ...techRowA].map((tech, i) => (
              <span key={i} className="tech-chip">
                <img src={tech.logo} alt={tech.name} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
        <div className="tech-marquee tech-marquee--reverse">
          <div className="tech-marquee-inner">
            {[...techRowB, ...techRowB, ...techRowB].map((tech, i) => (
              <span key={i} className="tech-chip">
                <img src={tech.logo} alt={tech.name} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="home-section contact-bg">
        <Reveal className="contact-cta-box">
          <p className="contact-cta-eyebrow">{t.home.cta.eyebrow}</p>
          <h2>{t.home.cta.title}</h2>
          <p>{rt(t.home.cta.body)}</p>

          <div className="hero-ctas">
            <a href="mailto:pvilardev@gmail.com" className="btn-primary">
              <FaEnvelope style={{ marginRight: "8px" }} />
              pvilardev@gmail.com
            </a>
            <a href={`${import.meta.env.BASE_URL}VILAR_PAU.pdf`} download className="btn-secondary">
              <FaDownload style={{ marginRight: "8px" }} />
              {t.home.cta.cv}
            </a>
          </div>

          <div className="contact-social-row">
            <a href="https://github.com/PauVilarEstrada" target="_blank" rel="noopener noreferrer">
              <img src={githubIconWhite} alt="GitHub" className="contact-social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="contact-social-icon" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
