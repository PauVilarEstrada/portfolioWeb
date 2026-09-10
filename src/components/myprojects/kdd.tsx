import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import kddLogo from "./assets/logosApps/kdd.webp";

const TEAM = [
  { n: "Adrià Garzón", u: "https://www.linkedin.com/in/adria-garzon/" },
  { n: "Joel Mateos", u: "https://www.linkedin.com/in/joel-mateos-ab36501b9/" },
  { n: "Alex Montes", u: "https://www.linkedin.com/in/alex-montes-terraz-9857a1288/" },
  { n: "Alejandro Soriano", u: "https://www.linkedin.com/in/alejandro-soriano-mata-96a8792a8/" },
  { n: "Pau Vilar", u: "https://www.linkedin.com/in/pau-vilar/" },
];

export default function KDD() {
  const { t, lang } = useI18n();
  const c = t.pages.kdd;
  const g = t.pages.common;

  return (
    <div key={lang} className="pp-page lang-fade" style={{ "--pp-color": "#22c55e", "--pp-glow": "rgba(34, 197, 94, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={kddLogo} alt={c.title} className="pp-hero-logo" />
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
          <p className="pp-text">{rt(c.overviewP)}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.teamTitle}</h2>
          <p className="pp-text">{rt(c.teamP)}</p>
          <div className="pp-team">
            {TEAM.map(m => <a key={m.n} href={m.u} target="_blank" rel="noopener noreferrer">{m.n}</a>)}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.dataTitle}</h2>
          <p className="pp-text">{rt(c.dataP1)}</p>
          <p className="pp-text">{c.dataP2}</p>
          <ul className="pp-features">
            {c.dataBullets.map(b => <li key={b}>{rt(b)}</li>)}
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.edaTitle}</h2>
          <p className="pp-text">{c.edaP}</p>
          <ul className="pp-features">
            {c.edaBullets.map(b => <li key={b}>{rt(b)}</li>)}
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.modelTitle}</h2>
          <p className="pp-text">{c.modelP}</p>
          <ul className="pp-features">
            {c.modelBullets.map(b => <li key={b}>{rt(b)}</li>)}
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.pipelineTitle}</h2>
          <p className="pp-text">{rt(c.pipelineP)}</p>
          <ol className="pp-steps">
            {c.pipelineSteps.map(s => <li key={s}>{rt(s)}</li>)}
          </ol>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.outputsTitle}</h2>
          <ul className="pp-features">
            {c.outputs.map(o => <li key={o}>{rt(o)}</li>)}
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.whyTitle}</h2>
          <ul className="pp-features">
            {c.why.map(w => <li key={w}>{rt(w)}</li>)}
          </ul>
        </div>

        <div className="pp-section pp-notice" style={{ "--pp-color": "#ef4444", "--pp-glow": "rgba(239, 68, 68, 0.2)" } as React.CSSProperties}>
          <h2 className="pp-section-title">{c.noticeTitle}</h2>
          <p className="pp-text">{rt(c.noticeP1)}</p>
          <p className="pp-text">{c.noticeP2}</p>
          <div className="pp-contact-box">
            <p>Email: <a href="mailto:pvilardev@gmail.com" style={{ color: "#22c55e" }}>pvilardev@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e" }}>linkedin.com/in/pau-vilar</a></p>
          </div>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
