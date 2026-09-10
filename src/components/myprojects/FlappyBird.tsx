import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/showcase.css";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import flappyLogo from "./assets/logosApps/flappybirdLogoSection.png";
import flappy1 from "./assets/flappyBird1.png";
import flappy2 from "./assets/flappyBird2.png";
import flappy3 from "./assets/FlappyBird3.png";
import flappyGeneral from "./assets/FlappyBirdGeneral.png";
import flappyVideo from "./assets/DemostracioVideoFlappyBird.mp4";

const REPO = "https://github.com/PauVilarEstrada/Flappy-Bird";

export default function FlappyBird() {
  const { t, lang } = useI18n();
  const c = t.pages.flappy;
  const g = t.pages.common;

  return (
    <div key={lang} className="pp-page lang-fade" style={{ "--pp-color": "#4ade80", "--pp-glow": "rgba(74, 222, 128, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={flappyLogo} alt={c.title} className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">{g.repo}</a>
            <a className="pp-btn-secondary" href="#demo">{c.ctaDemo}</a>
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

        <div className="pp-section" id="demo">
          <h2 className="pp-section-title">{c.demoTitle}</h2>
          <p className="pp-text">{c.demoP}</p>
          <div className="sc-shot">
            <video controls preload="none" poster={flappy2} playsInline>
              <source src={flappyVideo} type="video/mp4" />
              {c.demoFallback}
            </video>
          </div>
          <p className="sc-caption">{c.demoCaption}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.screensTitle}</h2>
          <div className="sc-split">
            <div className="sc-split-media"><img src={flappy1} alt={c.startH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.startKicker}</span>
              <h3>{c.startH}</h3>
              <p>{c.startP}</p>
            </div>
          </div>
          <div className="sc-split reverse">
            <div className="sc-split-media"><img src={flappy2} alt={c.playH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.playKicker}</span>
              <h3>{c.playH}</h3>
              <p>{rt(c.playP)}</p>
            </div>
          </div>
          <div className="sc-split">
            <div className="sc-split-media"><img src={flappy3} alt={c.overH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.overKicker}</span>
              <h3>{c.overH}</h3>
              <p>{c.overP}</p>
            </div>
          </div>
        </div>

        <div className="pp-section" id="how">
          <h2 className="pp-section-title">{c.howTitle}</h2>
          <div className="sc-flow">
            {c.loop.map(l => (
              <div key={l.t} className="sc-flow-step">
                <h4>{l.t}</h4>
                <p>{l.p}</p>
              </div>
            ))}
          </div>
          <div className="sc-shot sc-shot--pad">
            <img src={flappyGeneral} alt={c.title} loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.hardTitle}</h2>
          <div className="sc-cards">
            {c.hard.map(h => (
              <div key={h.h} className="sc-card">
                <span className="sc-card-icon">{h.icon}</span>
                <h4>{h.h}</h4>
                <p>{h.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.playTitle}</h2>
          <p className="pp-text">{c.playOutro}</p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">
              github.com/PauVilarEstrada/Flappy-Bird ↗
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
