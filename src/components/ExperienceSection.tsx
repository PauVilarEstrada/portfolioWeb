import React from "react";
import "../css/ExperienceSection.css";
import { useI18n } from "../i18n/LanguageContext";
import { rt } from "../i18n/rich";
import Reveal from "./Reveal";

// Company logo
import sycaiLogo from "../assets/logoSycai.png";

// Tech logos
import awsLogo from "../assets/awslogo.png";
import dockerLogo from "../assets/dockerlogo.png";
import flaskLogo from "../assets/flasklogo.png";
import javaLogo from "../assets/javalogo.png";
import javascriptLogo from "../assets/javascriptlogo.webp";
import angularLogo from "../assets/angularlogo.webp";
import reactLogo from "../assets/reactlogo.webp";
import sqlLogo from "../assets/sqllogo.png";
import gitLogo from "../assets/gitlogo.png";
import githubLogo from "../assets/githublogo.png";
import htmlLogo from "../assets/htmllogo.png";
import xmlLogo from "../assets/xmllogo.png";
import nodejsLogo from "../assets/nodejslogo.png";
import typeScriptLogo from "../assets/typescriptlogo.png";
import TailwindLogo from "../assets/tailwindlogo.svg";
import pythonLogo from "../assets/pythonlogo.webp";
import sqliteLogo from "../assets/sqlitelogo.png";
import virtualboxLogo from "../assets/Virtualboxlogo.png";
import figmaLogo from "../assets/figmalogo.png";
import djangoLogo from "../assets/djangologo.svg";
import bashLogo from "../assets/bashlogo.png";
import springbootLogo from "../assets/springbootlogo.png";
import hibernateLogo from "../assets/hibernatelogo.svg";
import bootstrapLogo from "../assets/bootstraplogo.png";
import kotlinLogo from "../assets/kotlinlogo.png";

// Water polo clubs & competitions
import cncLogo from "../assets/logo_cnc.png";
import cnbLogo from "../assets/cnb.png";
import cnsaLogo from "../assets/cnsa_new.png";
import lewaterpoloLogo from "../assets/lewaterpolo.png";
import eurocupLogo from "../assets/logoeurocup.png";
import championsLogo from "../assets/championslogo.webp";

// Water polo photos
import waterpoloImg1 from "../public/PauVilar_NegroPerfil.JPG";
import waterpoloImg2 from "../public/PauVilar_NegroLado.JPG";
import teamPhoto from "../public/sananFotoEquipo.jpg";

// Education logos & photos
import insPoblenouLogo from "../assets/poblenoulogo.png";
import insCarLogo from "../assets/insCARlogo.png";
import monlauLogo from "../assets/monlaulogo.svg";
import carLogo from "../assets/CARlogo.png";
import carGeneral from "../assets/car_general.png";
import carPiscinaFora from "../assets/carpiscinafora.jpg";

const SYCAI_TECH = [
  { n: "React", l: reactLogo }, { n: "Flask", l: flaskLogo },
  { n: "JavaScript", l: javascriptLogo }, { n: "TypeScript", l: typeScriptLogo },
  { n: "Java", l: javaLogo }, { n: "Python", l: pythonLogo },
  { n: "Angular", l: angularLogo }, { n: "SQL", l: sqlLogo },
  { n: "Docker", l: dockerLogo }, { n: "AWS", l: awsLogo },
  { n: "Git", l: gitLogo }, { n: "GitHub", l: githubLogo },
  { n: "HTML", l: htmlLogo }, { n: "Tailwind", l: TailwindLogo },
  { n: "XML", l: xmlLogo }, { n: "Node.js", l: nodejsLogo },
];

const DAM_TECH = [
  { n: "Java", l: javaLogo }, { n: "JavaScript", l: javascriptLogo },
  { n: "TypeScript", l: typeScriptLogo }, { n: "Python", l: pythonLogo },
  { n: "Kotlin", l: kotlinLogo }, { n: "React", l: reactLogo },
  { n: "Angular", l: angularLogo }, { n: "Flask", l: flaskLogo },
  { n: "Django", l: djangoLogo }, { n: "Spring Boot", l: springbootLogo },
  { n: "Hibernate", l: hibernateLogo }, { n: "SQL", l: sqlLogo },
  { n: "SQLite", l: sqliteLogo }, { n: "Docker", l: dockerLogo },
  { n: "VirtualBox", l: virtualboxLogo }, { n: "Bash", l: bashLogo },
  { n: "Git", l: gitLogo }, { n: "GitHub", l: githubLogo },
  { n: "HTML", l: htmlLogo }, { n: "Bootstrap", l: bootstrapLogo },
  { n: "Tailwind", l: TailwindLogo }, { n: "Figma", l: figmaLogo },
];

const CLUB_LOGOS = [cncLogo, cnsaLogo, cnbLogo];

export default function ExperienceSection() {
  const { t, lang } = useI18n();
  const e = t.experience;

  return (
    <section className="experience-section lang-fade" key={lang}>

      {/* ── PAGE HEADER ── */}
      <Reveal className="exp-page-head">
        <h1>{e.pageTitle}</h1>
        <p>{e.pageSubtitle}</p>
      </Reveal>

      {/* ── AI TRAINER ── */}
      <Reveal className="experience-container">
        <h2>{e.trainer.title} <span className="highlight">{e.trainer.titleHighlight}</span></h2>
        <p className="subtitle">{rt(e.trainer.subtitle)}</p>

        <div className="experience-content">
          {e.trainer.blocks.map(b => (
            <React.Fragment key={b.h}>
              <h3>{b.h}</h3>
              <p>{rt(b.p)}</p>
            </React.Fragment>
          ))}

          <h3>{e.trainer.topicsTitle}</h3>
          <ul className="achievements">
            {e.trainer.topics.map(topic => (
              <li key={topic}><span className="achievements-text">{rt(topic)}</span></li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="section-divider"></div>

      {/* ── SYCAI MEDICAL ── */}
      <Reveal className="experience-container">
        <img src={sycaiLogo} alt="Sycai Medical" className="company-logo" />
        <h2>{e.sycai.title} <span className="highlight">{e.sycai.titleHighlight}</span></h2>
        <p className="subtitle">{rt(e.sycai.subtitle)}</p>

        <div className="experience-content">
          {e.sycai.blocks.map(b => (
            <React.Fragment key={b.h}>
              <h3>{b.h}</h3>
              <p>{rt(b.p)}</p>
            </React.Fragment>
          ))}

          <h3>{e.sycai.techTitle}</h3>
          <div className="tech-list-container">
            <ul className="tech-list">
              {SYCAI_TECH.map(tech => (
                <li key={tech.n}><img src={tech.l} alt={tech.n} /> {tech.n}</li>
              ))}
            </ul>
          </div>

          <h3>{e.sycai.achievementsTitle}</h3>
          <ul className="achievements">
            {e.sycai.achievements.map(a => (
              <li key={a.b}>
                <span className="highlight-text">{a.b}</span>
                <span className="achievements-text">{a.r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="section-divider"></div>

      {/* ── WATER POLO ── */}
      <Reveal className="experience-container">
        <h2>{e.waterpolo.title}</h2>
        <p className="subtitle">{rt(e.waterpolo.subtitle)}</p>

        <div className="club-grid">
          {e.waterpolo.clubs.map((club, i) => (
            <article key={club.name} className={`club-card${club.current ? " club-card--current" : ""}`}>
              <span className={`club-status${club.current ? " is-current" : ""}`}>
                {club.current ? e.waterpolo.currentBadge : e.waterpolo.pastBadge}
              </span>
              <img src={CLUB_LOGOS[i]} alt={club.name} className="club-logo" />
              <h3>{club.name}</h3>
              <span className="club-years">{club.years}</span>
              <p>{rt(club.p)}</p>
              <ul className="styled-list">
                {club.bullets.map(b => <li key={b}>{rt(b)}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <h3>{e.waterpolo.achievementsTitle}</h3>
        <ul className="achievements">
          {e.waterpolo.achievements.map(a => (
            <li key={a.b}>
              <span className="highlight-text">{a.b}</span>
              <span className="achievements-text">{a.r}</span>
            </li>
          ))}
        </ul>

        <div className="image-gallery">
          <img src={waterpoloImg1} alt="Pau Vilar" loading="lazy" />
          <img src={teamPhoto} alt="Team" loading="lazy" />
          <img src={waterpoloImg2} alt="Pau Vilar" loading="lazy" />
        </div>

        <div className="competition-gallery">
          <img src={lewaterpoloLogo} alt="LEWATERPOLO — División de Honor" loading="lazy" />
          <img src={eurocupLogo} alt="EuroCup" loading="lazy" />
          <img src={championsLogo} alt="Champions League" loading="lazy" />
        </div>
      </Reveal>

      <div className="section-divider"></div>

      {/* ── STUDIES ── */}
      <Reveal className="experience-container">
        <h2>{e.studies.title}</h2>

        {/* Master */}
        <div className="study-item">
          <img src={monlauLogo} alt="Monlau Formación Profesional" className="studiesPB-logo" />
          <h3>{e.studies.master.h}</h3>
          <span className="study-badge study-badge--honors">{e.studies.master.statusBadge}</span>
          <p>{rt(e.studies.master.p1)}</p>
          <p>{rt(e.studies.master.p2)}</p>
          <h3>{e.studies.master.areasTitle}</h3>
          <ul className="achievements">
            {e.studies.master.areas.map(a => (
              <li key={a}><span className="achievements-text">{rt(a)}</span></li>
            ))}
          </ul>
        </div>

        <div className="small-section-divider"></div>

        {/* DAM */}
        <div className="study-item">
          <img src={insPoblenouLogo} alt="INS Poblenou" className="studiesPB-logo" />
          <h3>{e.studies.dam.h}</h3>
          <span className="study-badge">{e.studies.dam.statusBadge}</span>
          <p>{rt(e.studies.dam.p1)}</p>
          <p>{rt(e.studies.dam.p2)}</p>

          <h3>{e.studies.dam.techTitle}</h3>
          <div className="tech-list-container">
            <ul className="tech-list">
              {DAM_TECH.map(tech => (
                <li key={tech.n}><img src={tech.l} alt={tech.n} /> {tech.n}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="small-section-divider"></div>

        {/* Baccalaureate */}
        <div className="study-item">
          <img src={insCarLogo} alt="INS CAR" className="studiesCAR-logo" />
          <h3>{e.studies.bac.h}</h3>
          <p>{rt(e.studies.bac.p1)}</p>
          <p>{rt(e.studies.bac.p2)}</p>
          <p>{rt(e.studies.bac.p3)}</p>
        </div>

        <div className="image-gallery landscape">
          <img src={carGeneral} alt="CAR" loading="lazy" />
          <img src={carLogo} alt="CAR" className="car-logo-img" loading="lazy" />
          <img src={carPiscinaFora} alt="CAR" loading="lazy" />
        </div>

        <div className="small-section-divider"></div>

        <div className="certifications">
          <h3>{e.studies.certificationsTitle}</h3>
          <ul className="styled-list">
            {e.studies.certifications.map(c => <li key={c}>{rt(c)}</li>)}
          </ul>
        </div>

        <div className="small-section-divider"></div>

        <div className="languages">
          <h3>{e.studies.languagesTitle}</h3>
          <div className="lang-grid">
            {e.studies.languages.map(l => (
              <div key={l.l} className="lang-item">
                <span className="lang-name">{l.l}</span>
                <span className="lang-level">{l.v}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

    </section>
  );
}
