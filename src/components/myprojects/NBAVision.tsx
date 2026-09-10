import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/nbavision.css";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";

import nbaLogo from "./assets/logosApps/nbavisionlogo.png";
import shotHero from "./assets/nbavision/hero.webp";
import shotInside from "./assets/nbavision/whats-inside.webp";
import shotPlayer from "./assets/nbavision/player-overview.webp";
import shotScouting from "./assets/nbavision/scouting-ai.webp";
import shotAssistant from "./assets/nbavision/assistant.webp";
import shotStandings from "./assets/nbavision/season-standings.webp";
import shotAwards from "./assets/nbavision/award-races.webp";
import shotPredictPlayer from "./assets/nbavision/predict-player.webp";
import shotPredictTeam from "./assets/nbavision/predict-team.webp";
import shotSimulate from "./assets/nbavision/simulate.webp";
import shotSimulatePbp from "./assets/nbavision/simulate-pbp.webp";
import shotBuilder from "./assets/nbavision/builder.webp";
import shotLeague from "./assets/nbavision/league-sim.webp";
import shotCompare from "./assets/nbavision/compare.webp";
import shotTeam from "./assets/nbavision/team-page.webp";
import shotRookies from "./assets/nbavision/rookies.webp";
import shotH2H from "./assets/nbavision/head-to-head.webp";
import shotEs from "./assets/nbavision/bilingual-es.webp";

const LIVE_URL = "https://nba-woat.vercel.app/";
const REPO_URL = "https://github.com/PauVilarEstrada/NBA";

const TECH = [
  "React 18", "TypeScript", "Vite", "TailwindCSS", "Recharts", "Zustand", "Framer Motion",
  "Web Workers", "FastAPI", "Python", "PostgreSQL", "Redis", "SQLAlchemy + Alembic",
  "XGBoost", "scikit-learn", "PyTorch", "pandas / NumPy", "nba_api", "Docker", "Vercel",
];

export default function NBAVision() {
  const { t, lang } = useI18n();
  const c = t.pages.nba;
  const g = t.pages.common;

  return (
    <div
      key={lang}
      className="pp-page nba-page lang-fade"
      style={{ "--pp-color": "#ef4444", "--pp-glow": "rgba(239, 68, 68, 0.2)" } as React.CSSProperties}
    >
      <header className="pp-hero">
        <img src={nbaLogo} alt={c.title} className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={LIVE_URL} target="_blank" rel="noopener noreferrer">{c.ctaLive}</a>
            <a className="pp-btn-secondary" href={REPO_URL} target="_blank" rel="noopener noreferrer">{g.repo}</a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <div className="nba-stats">
            {c.glance.map(s => (
              <div key={s.l} className="nba-stat">
                <span className="nba-stat-value">{s.v}</span>
                <span className="nba-stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.whatTitle}</h2>
          <p className="pp-text">{rt(c.whatP1)}</p>
          <p className="pp-text">{rt(c.whatP2)}</p>
          <div className="pp-gallery c1"><img src={shotHero} alt={c.title} loading="lazy" /></div>
          <div className="pp-gallery c1"><img src={shotInside} alt={c.sectionsTitle} loading="lazy" /></div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.sectionsTitle}</h2>
          <p className="pp-text">{rt(c.sectionsP)}</p>
          <div className="nba-routes">
            {c.routes.map(r => (
              <div key={r.path} className="nba-route">
                <code className="nba-route-path">{r.path}</code>
                <p className="nba-route-what">{r.what}</p>
              </div>
            ))}
          </div>
          <div className="pp-gallery c2">
            <img src={shotStandings} alt={c.routes[1].path} loading="lazy" />
            <img src={shotTeam} alt={c.routes[5].path} loading="lazy" />
            <img src={shotRookies} alt={c.routes[3].path} loading="lazy" />
            <img src={shotH2H} alt={c.routes[6].path} loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.playersTitle}</h2>
          <p className="pp-text">{rt(c.playersP1)}</p>
          <p className="pp-text">{rt(c.playersP2)}</p>
          <div className="pp-gallery c2">
            <img src={shotPlayer} alt={c.playersTitle} loading="lazy" />
            <img src={shotScouting} alt={c.playersTitle} loading="lazy" />
          </div>
          <div className="pp-gallery c1"><img src={shotCompare} alt={c.routes[4].path} loading="lazy" /></div>
        </div>

        <div className="pp-section nba-highlight">
          <h2 className="pp-section-title">{c.assistantTitle}</h2>
          <p className="pp-text">{rt(c.assistantP1)}</p>
          <p className="pp-text">{rt(c.assistantP2)}</p>
          <ul className="pp-features">
            {c.assistantBullets.map(b => <li key={b}>{rt(b)}</li>)}
          </ul>
          <div className="pp-gallery c1"><img src={shotAssistant} alt={c.assistantTitle} loading="lazy" /></div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.modelsTitle}</h2>
          <p className="pp-text">{c.modelsP}</p>
          <div className="nba-models">
            {c.models.map(m => (
              <article key={m.n} className="nba-model">
                <span className="nba-model-n">{m.n}</span>
                <h3 className="nba-model-title">{m.title}</h3>
                <p className="nba-model-body">{m.body}</p>
                <div className="nba-model-tags">
                  {m.tags.map(x => <span key={x} className="pp-tech-badge">{x}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="pp-gallery c2">
            <img src={shotPredictPlayer} alt={c.routes[7].path} loading="lazy" />
            <img src={shotPredictTeam} alt={c.routes[8].path} loading="lazy" />
          </div>
        </div>

        <div className="pp-section nba-callout">
          <h2 className="pp-section-title">{c.leakageTitle}</h2>
          <p className="pp-text">{rt(c.leakageP1)}</p>
          <p className="pp-text">{rt(c.leakageP2)}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.simTitle}</h2>
          <p className="pp-text">{rt(c.simP1)}</p>
          <p className="pp-text">{rt(c.simP2)}</p>
          <div className="pp-gallery c2">
            <img src={shotSimulate} alt={c.simTitle} loading="lazy" />
            <img src={shotSimulatePbp} alt={c.simTitle} loading="lazy" />
            <img src={shotLeague} alt={c.routes[2].path} loading="lazy" />
            <img src={shotAwards} alt={c.routes[1].path} loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.builderTitle}</h2>
          <p className="pp-text">{rt(c.builderP1)}</p>
          <p className="pp-text">{rt(c.builderP2)}</p>
          <div className="pp-gallery c1"><img src={shotBuilder} alt={c.builderTitle} loading="lazy" /></div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.dataTitle}</h2>
          <p className="pp-text">{rt(c.dataP1)}</p>
          <div className="nba-table-wrap">
            <table className="nba-table">
              <thead>
                <tr>{c.dataHeaders.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {c.sources.map(row => (
                  <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pp-text">{rt(c.dataP2)}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.archTitle}</h2>
          <ol className="pp-steps">
            {c.archSteps.map(s => <li key={s}>{rt(s)}</li>)}
          </ol>
          <p className="pp-text">{c.archP}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.i18nTitle}</h2>
          <p className="pp-text">{rt(c.i18nP1)}</p>
          <p className="pp-text">{rt(c.i18nP2)}</p>
          <div className="pp-gallery c1"><img src={shotEs} alt={c.i18nTitle} loading="lazy" /></div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.rulesTitle}</h2>
          <ul className="pp-features">
            {c.rules.map(r => <li key={r}>{rt(r)}</li>)}
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{g.tech}</h2>
          <div className="pp-tech-grid">
            {TECH.map(x => <span key={x} className="pp-tech-badge">{x}</span>)}
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.seeTitle}</h2>
          <p className="pp-text">{c.seeP}</p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={LIVE_URL} target="_blank" rel="noopener noreferrer">nba-woat.vercel.app ↗</a>
            <a className="pp-btn-secondary" href={REPO_URL} target="_blank" rel="noopener noreferrer">github.com/PauVilarEstrada/NBA ↗</a>
          </div>
          <p className="pp-text nba-disclaimer">{c.disclaimer}</p>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
