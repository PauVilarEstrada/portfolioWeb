import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/showcase.css";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import pacmanLogo from "./assets/logosApps/pacmanlogo.png";
import pacmanInicio from "./assets/PacmanInicio.png";
import pacmanElegir from "./assets/PacmanElegir.png";
import pacmanCustom from "./assets/PacmanCustom.png";
import pacmanLevel2 from "./assets/PacmanLevel2.png";
import pacmanLevel2Map from "./assets/PacmanLevel2Map.png";
import pacmanMap2 from "./assets/PacmanMap2.png";
import pacmanMap from "./assets/PacmanMap.png";
import pacmanSettings from "./assets/PacmanSettings.png";
import pacmanStop from "./assets/PacmanStop.png";

const REPO = "https://github.com/PauVilarEstrada/pacman";

export default function Pacman() {
  const { t, lang } = useI18n();
  const c = t.pages.pacman;
  const g = t.pages.common;

  return (
    <div key={lang} className="pp-page lang-fade" style={{ "--pp-color": "#facc15", "--pp-glow": "rgba(250, 204, 21, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={pacmanLogo} alt={c.title} className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">{g.repo}</a>
            <a className="pp-btn-secondary" href="#how">{c.ctaHow}</a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <div className="sc-specs">
            {c.specs.map(sp => (
              <div key={sp.l} className="sc-spec">
                <span className="sc-spec-value">{sp.v}</span>
                <span className="sc-spec-label">{sp.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.gameTitle}</h2>
          <p className="pp-text">{c.gameP}</p>
          <div className="sc-shot sc-shot--pad">
            <img src={pacmanMap} alt={c.gameTitle} loading="lazy" />
          </div>
          <p className="sc-caption">{c.gameCaption}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.menuTitle}</h2>
          <div className="sc-split">
            <div className="sc-split-media"><img src={pacmanInicio} alt={c.menuH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.menuKicker}</span>
              <h3>{c.menuH}</h3>
              <p>{c.menuP}</p>
            </div>
          </div>
          <div className="sc-split reverse">
            <div className="sc-split-media"><img src={pacmanElegir} alt={c.charH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.charKicker}</span>
              <h3>{c.charH}</h3>
              <p>{c.charP}</p>
            </div>
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.mapsTitle}</h2>
          <p className="pp-text">{c.mapsP}</p>
          <div className="sc-split">
            <div className="sc-split-media"><img src={pacmanCustom} alt={c.mapsH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.mapsKicker}</span>
              <h3>{c.mapsH}</h3>
              <p>{c.mapsP2}</p>
            </div>
          </div>
          <div className="sc-strip">
            <figure>
              <img src={pacmanMap2} alt={c.mapCap1} loading="lazy" />
              <figcaption>{c.mapCap1}</figcaption>
            </figure>
            <figure>
              <img src={pacmanLevel2Map} alt={c.mapCap2} loading="lazy" />
              <figcaption>{c.mapCap2}</figcaption>
            </figure>
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.ghostTitle}</h2>
          <div className="sc-split reverse">
            <div className="sc-split-media"><img src={pacmanLevel2} alt={c.ghostH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.ghostKicker}</span>
              <h3>{c.ghostH}</h3>
              <p>{rt(c.ghostP1)}</p>
              <p>{c.ghostP2}</p>
            </div>
          </div>
        </div>

        <div className="pp-section" id="how">
          <h2 className="pp-section-title">{c.howTitle}</h2>
          <p className="pp-text">{c.howP}</p>
          <div className="sc-flow">
            {c.build.map(b => (
              <div key={b.t} className="sc-flow-step">
                <h4>{b.t}</h4>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.extrasTitle}</h2>
          <p className="pp-text">{c.extrasP}</p>
          <div className="sc-strip">
            <figure>
              <img src={pacmanSettings} alt={c.extrasCap1} loading="lazy" />
              <figcaption>{c.extrasCap1}</figcaption>
            </figure>
            <figure>
              <img src={pacmanStop} alt={c.extrasCap2} loading="lazy" />
              <figcaption>{c.extrasCap2}</figcaption>
            </figure>
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.playTitle}</h2>
          <p className="pp-text">{c.playOutro}</p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">
              github.com/PauVilarEstrada/pacman ↗
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
