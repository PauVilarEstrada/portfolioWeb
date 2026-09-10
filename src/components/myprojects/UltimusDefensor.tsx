import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import udLogo from "./assets/logosApps/ultimusdefensorlogo.png";
import portada from "./assets/ultimusdefensor/portada.png";
import chatbot1 from "./assets/ultimusdefensor/chatbot_bluesentinel.png";
import chatbot2 from "./assets/ultimusdefensor/chatbot_bluesentinel_2.png";
import mitreCoverage from "./assets/ultimusdefensor/mitre_cobertura.png";
import vistaEjecutiva1 from "./assets/ultimusdefensor/vista_ejectuiva_1.png";
import vistaEjecutiva2 from "./assets/ultimusdefensor/vista_ejecutiva_2.png";
import modelHealth from "./assets/ultimusdefensor/salud_de_modelos.png";
import origenes from "./assets/ultimusdefensor/origenes_de_amenaza.png";
import informes from "./assets/ultimusdefensor/informes.png";

const TEAM = [
  { n: "Adrià Garzón", u: "https://www.linkedin.com/in/adria-garzon/" },
  { n: "Joel Mateos", u: "https://www.linkedin.com/in/joel-mateos-ab36501b9/" },
  { n: "Alex Montes", u: "https://www.linkedin.com/in/alex-montes-terraz-9857a1288/" },
  { n: "Alejandro Soriano", u: "https://www.linkedin.com/in/alejandro-soriano-mata-96a8792a8/" },
  { n: "Pau Vilar", u: "https://www.linkedin.com/in/pau-vilar/" },
];

const DEMO = "https://drive.google.com/file/d/13rt9_dGvuwnIcSyVd4cBmkYH3SqQZw4R/view?usp=sharing";

export default function UltimusDefensor() {
  const { t, lang } = useI18n();
  const c = t.pages.ultimus;
  const g = t.pages.common;

  return (
    <div key={lang} className="pp-page lang-fade" style={{ "--pp-color": "#38bdf8", "--pp-glow": "rgba(56, 189, 248, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={udLogo} alt={c.title} className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">{c.overviewTitle}</h2>
          <p className="pp-text">{rt(c.overviewP1)}</p>
          <p className="pp-text">{rt(c.overviewP2)}</p>
          <div className="pp-gallery c1"><img src={portada} alt={c.title} loading="lazy" /></div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.teamTitle}</h2>
          <p className="pp-text">{rt(c.teamP)}</p>
          <div className="pp-team">
            {TEAM.map(m => (
              <a key={m.n} href={m.u} target="_blank" rel="noopener noreferrer">{m.n}</a>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.assistantTitle}</h2>
          <p className="pp-text">{rt(c.assistantP)}</p>
          <ol className="pp-steps">
            {c.assistantModes.map(m => <li key={m}>{rt(m)}</li>)}
          </ol>
          <div className="pp-gallery c2">
            <img src={chatbot1} alt="BlueSentinel" loading="lazy" />
            <img src={chatbot2} alt="BlueSentinel" loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.pipelineTitle}</h2>
          <p className="pp-text">{rt(c.pipelineP)}</p>
          <ol className="pp-steps">
            {c.pipelineSteps.map(s => <li key={s}>{rt(s)}</li>)}
          </ol>
          <div className="pp-gallery c2">
            <img src={mitreCoverage} alt="MITRE ATT&CK" loading="lazy" />
            <img src={modelHealth} alt="Model health" loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.dashboardsTitle}</h2>
          <p className="pp-text">{c.dashboardsP}</p>
          <ul className="pp-features">
            {c.dashboards.map(d => <li key={d}>{d}</li>)}
          </ul>
          <div className="pp-gallery c2">
            <img src={vistaEjecutiva1} alt="" loading="lazy" />
            <img src={vistaEjecutiva2} alt="" loading="lazy" />
            <img src={origenes} alt="" loading="lazy" />
            <img src={informes} alt="" loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.techTitle}</h2>
          <div className="pp-tech-grid">
            {c.tech.map(x => <span key={x} className="pp-tech-badge">{x}</span>)}
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.availabilityTitle}</h2>
          <p className="pp-text">{rt(c.availabilityP1)}</p>
          <p className="pp-text">{c.availabilityP2}</p>
          <div className="pp-contact-box">
            <p>Email: <a href="mailto:pvilardev@gmail.com">pvilardev@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pau-vilar</a></p>
            <p>Demo: <a href={DEMO} target="_blank" rel="noopener noreferrer">{c.demoLabel}</a></p>
          </div>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
