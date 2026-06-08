import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";

const FLOAT_SYMBOLS = [
  "const", "async", "import", "function", "return",
  "class", "await", "export", "interface", "{ }",
  "<AI/>", "01010", "while", "=>", "null", "type",
];
import { FaDownload, FaEnvelope } from "react-icons/fa";

// Project logos
import udLogo from "./myprojects/assets/logosApps/ultimusdefensorlogo.png";
import kddLogo from "./myprojects/assets/logosApps/kdd.png";
import ecommerceLogo from "./myprojects/assets/logosApps/logo-ecommerce.png";
import pacmanLogo from "./myprojects/assets/logosApps/pacmanlogo.png";

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

const ROLES = [
  "Full Stack Developer",
  "AI & Big Data Engineer",
  "Machine Learning Engineer",
  "AI Educator & Trainer",
];

const featuredProjects = [
  {
    name: "Ultimus Defensor",
    desc: "AI-powered BlueTeam platform with MITRE ATT&CK detection pipeline — Isolation Forest + XGBoost + LLM assistant.",
    tags: ["AI / ML", "Cybersecurity", "MITRE"],
    logo: udLogo,
    path: "/projects/ultimusdefensor",
    color: "#38bdf8",
  },
  {
    name: "KDD'99 Intrusion Detection",
    desc: "Machine Learning IDS with hierarchical pipeline, dataset engineering and BI dashboards — 5M+ records processed.",
    tags: ["ML", "Big Data", "Python"],
    logo: kddLogo,
    path: "/projects/kdd",
    color: "#22c55e",
  },
  {
    name: "Ecommerce Platform",
    desc: "Full-stack shop with authentication, cart, admin panel, order management and real-time stock control.",
    tags: ["React", "Node.js", "SQL"],
    logo: ecommerceLogo,
    path: "/projects/ecommerce",
    color: "#a78bfa",
  },
  {
    name: "Pacman Remake",
    desc: "Classic arcade game rebuilt from scratch with custom ghost AI, collision system and level generation.",
    tags: ["Java", "Game Dev", "OOP"],
    logo: pacmanLogo,
    path: "/projects/pacman",
    color: "#facc15",
  },
];

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

const timelineItems = [
  {
    date: "2026",
    role: "AI Trainer — Agentic Systems",
    org: "Cambra de Comerç de Barcelona",
    desc: "Designed and delivered training programs in agentic AI, automation workflows, and multi-agent orchestration for business professionals.",
    active: true,
  },
  {
    date: "2025 – 2026",
    role: "Master's in AI & Big Data",
    org: "Academic Program",
    desc: "Completed a full Master's covering ML, LLMs, Big Data pipelines, and agentic systems. Final project: Ultimus Defensor.",
    active: true,
  },
  {
    date: "2025",
    role: "Junior Full Stack Developer",
    org: "Sycai Medical · Internship",
    desc: "Modernized internal platform, redesigned AWS databases, implemented Docker deployments and cloud infrastructure.",
    active: false,
  },
  {
    date: "2023 – Present",
    role: "Professional Goalkeeper",
    org: "CN Sant Andreu · División de Honor",
    desc: "Competing at Spain's top water polo league and EuroCup. Previously CN Barcelona — Champions League.",
    active: false,
  },
  {
    date: "2023 – 2025",
    role: "Multiplatform App Development (DAM)",
    org: "INS Poblenou",
    desc: "Higher National Diploma focused on full-stack development, mobile apps, databases, and software engineering.",
    active: false,
  },
];

const TERMINAL_LINES = [
  { cmd: "$ ./welcome.sh", out: "👋  Welcome to Pau's portfolio!" },
  { cmd: "$ git push origin --all --force-with-lease", out: "✓  All projects uploaded to GitHub" },
  { cmd: "$ cat contact.txt", out: "📧  pvilardev@gmail.com — I reply fast!" },
  { cmd: "$ open linkedin.com/in/pau-vilar", out: "🔗  Latest updates on my LinkedIn ↗" },
  { cmd: "$ whoami", out: "AI Engineer · Full Stack · Water Polo GK 🤽" },
  { cmd: "$ grep -r 'hire' ./candidates/", out: "✓  Match found → pau_vilar.json 🎯" },
];

export default function HomePage() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const [termIdx, setTermIdx] = useState(0);
  const [termText, setTermText] = useState("");
  const [termOut, setTermOut] = useState("");
  const [termPhase, setTermPhase] = useState<"typing" | "output" | "pause">("typing");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setFadeState("in");
      }, 500);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const current = TERMINAL_LINES[termIdx];
    if (termPhase === "typing") {
      if (termText.length < current.cmd.length) {
        const t = setTimeout(() => setTermText(current.cmd.slice(0, termText.length + 1)), 38);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => { setTermOut(current.out); setTermPhase("output"); }, 500);
        return () => clearTimeout(t);
      }
    } else if (termPhase === "output") {
      const t = setTimeout(() => setTermPhase("pause"), 2200);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTermText(""); setTermOut("");
        setTermIdx((i) => (i + 1) % TERMINAL_LINES.length);
        setTermPhase("typing");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [termText, termPhase, termIdx]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="home-hero">

        {/* Floating code symbols — decorative background */}
        <div className="hero-float-code" aria-hidden="true">
          {FLOAT_SYMBOLS.map((sym, i) => (
            <span key={i} className={`hfc hfc-${i}`}>{sym}</span>
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-name" data-text="Pau Vilar I Estrada">Pau Vilar I Estrada</h1>

          <div className="hero-role-wrap">
            <p className={`hero-role ${fadeState === "out" ? "fade-out" : "fade-in"}`}>
              {ROLES[roleIdx]}
            </p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">8+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">17+</span>
              <span className="hero-stat-label">Technologies</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">AI</span>
              <span className="hero-stat-label">Educator</span>
            </div>
          </div>

          <div className="hero-ctas">
            <Link to="/projects" className="btn-primary">View my work</Link>
            <Link to="/contact" className="btn-secondary">Get in touch</Link>
          </div>
        </div>

        {/* Terminal AI widget — visible on wide screens only */}
        <div className="hero-terminal" aria-hidden="true">
          <div className="hero-terminal-bar">
            <div className="hero-terminal-dot" />
            <div className="hero-terminal-dot" />
            <div className="hero-terminal-dot" />
            <span className="hero-terminal-title">ai-console</span>
          </div>
          <div className="hero-terminal-body">
            <div className="hero-terminal-cmd">
              {termText}<span className="hero-terminal-cursor" />
            </div>
            {termOut && <div className="hero-terminal-output">{termOut}</div>}
          </div>
        </div>

        <div className="home-scroll-hint">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">
            Featured <span>Projects</span>
          </h2>
          <Link to="/projects" className="home-section-link">
            See all projects →
          </Link>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="proj-card"
              style={{ "--proj-color": p.color } as React.CSSProperties}
            >
              <div className="proj-card-top">
                <img src={p.logo} alt={p.name} className="proj-logo" />
                <span className="proj-arrow">↗</span>
              </div>
              <p className="proj-name">{p.name}</p>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map((t) => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      <section className="home-section exp-bg">
        <div className="home-section-header">
          <h2 className="home-section-title">
            Experience &amp; <span>Education</span>
          </h2>
          <Link to="/experience" className="home-section-link">
            Full profile →
          </Link>
        </div>

        <div className="timeline">
          {timelineItems.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className={`timeline-dot ${item.active ? "" : "dim"}`} />
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-org">{item.org}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="home-section tech-bg">
        <div className="home-section-header" style={{ padding: "0 2rem", marginBottom: "32px" }}>
          <h2 className="home-section-title">Tech <span>Stack</span></h2>
        </div>
        <div className="tech-marquee">
          {/* Duplicated for seamless loop */}
          <div className="tech-marquee-inner">
            {[...techStack, ...techStack].map((tech, i) => (
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
        <div className="contact-cta-box">
          <p className="contact-cta-eyebrow">Let's work together</p>
          <h2>Got a project in mind?</h2>
          <p>
            I'm open to junior roles, internships, and collaborations in{" "}
            <strong style={{ color: "var(--text)" }}>software development</strong>,{" "}
            <strong style={{ color: "var(--text)" }}>AI engineering</strong>, and{" "}
            <strong style={{ color: "var(--text)" }}>data analysis</strong>.
            Feel free to reach out — I reply fast.
          </p>

          <div className="hero-ctas">
            <a href="mailto:pvilardev@gmail.com" className="btn-primary">
              <FaEnvelope style={{ marginRight: "8px" }} />
              pvilardev@gmail.com
            </a>
            <a
              href={`${import.meta.env.BASE_URL}VILAR_PAU.pdf`}
              download
              className="btn-secondary"
            >
              <FaDownload style={{ marginRight: "8px" }} />
              Download CV
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
        </div>
      </section>
    </>
  );
}
