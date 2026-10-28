import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import "./css/project-page.css";
import "./css/showcase.css";
import "./css/tactiq.css";
import { useI18n } from "../../i18n/LanguageContext";
import ProjectNav from "./ProjectNav";
import { rt } from "../../i18n/rich";

import logo from "./assets/tactiq360/tactiq360-logo.svg";
import shotPanorama from "./assets/tactiq360/panorama.webp";
import shotTeam from "./assets/tactiq360/team-home.webp";
import shotLive from "./assets/tactiq360/live-report.webp";
import shotLineup from "./assets/tactiq360/lineup.webp";
import shotStats from "./assets/tactiq360/stats.webp";
import shotSquad from "./assets/tactiq360/squad.webp";
import mLive from "./assets/tactiq360/m-live-report.webp";
import mTeam from "./assets/tactiq360/m-team.webp";
import mStats from "./assets/tactiq360/m-stats.webp";

const LIVE_URL = "https://tactiq360.vercel.app";

export default function Tactiq360() {
  const { t, lang } = useI18n();
  const c = t.pages.tactiq;
  const g = t.pages.common;
  const cap = c.shotCaptions;

  return (
    <div key={lang} className="pp-page lang-fade" style={{ "--pp-color": "#2563eb" } as React.CSSProperties}>
      <header className="pp-hero">
        <Link to="/projects" className="pp-crumb">{g.back}</Link>
        <img src={logo} alt={c.title} className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={LIVE_URL} target="_blank" rel="noopener noreferrer">{c.ctaLive}</a>
            <a className="pp-btn-secondary" href="#plans">{c.ctaPlans}</a>
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
          <figure className="pp-figure pp-figure--wide">
            <img src={shotPanorama} alt={cap.panorama} loading="lazy" />
            <figcaption>{cap.panorama}</figcaption>
          </figure>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.forTitle}</h2>
          <p className="pp-text">{c.forP}</p>
          <dl className="tq-audiences">
            {c.audiences.map(a => (
              <div key={a.h}>
                <dt>{a.h}</dt>
                <dd>{a.p}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.whatTitle}</h2>
          <p className="pp-text">{rt(c.whatP1)}</p>
          <p className="pp-text">{rt(c.whatP2)}</p>
          <figure className="pp-figure">
            <img src={shotTeam} alt={cap.team} loading="lazy" />
            <figcaption>{cap.team}</figcaption>
          </figure>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.profilesTitle}</h2>
          <p className="pp-text">{c.profilesP}</p>
          <ol className="tq-chain" aria-hidden="true">
            {c.profiles.map(p => <li key={p.h}>{p.h}</li>)}
          </ol>
          <div className="tq-roles">
            {c.profiles.map(p => (
              <article key={p.h} className="tq-role">
                <h3>{p.h}</h3>
                <p className="tq-role-sub">{p.sub}</p>
                <p className="tq-role-sees">{p.sees}</p>
                <ul>
                  {p.can.map(x => <li key={x}><FiCheck aria-hidden="true" />{x}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="tq-note">{c.profilesNote}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.matchdayTitle}</h2>
          <p className="pp-text">{c.matchdayP}</p>
          <ol className="pp-steps">
            {c.matchday.map(s => <li key={s}>{rt(s)}</li>)}
          </ol>
          <div className="pp-gallery c2">
            <figure className="pp-figure">
              <img src={shotLineup} alt={cap.lineup} loading="lazy" />
              <figcaption>{cap.lineup}</figcaption>
            </figure>
            <figure className="pp-figure">
              <img src={shotLive} alt={cap.live} loading="lazy" />
              <figcaption>{cap.live}</figcaption>
            </figure>
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.liveTitle}</h2>
          <p className="pp-text">{rt(c.liveP1)}</p>
          <p className="pp-text">{c.liveP2}</p>
          <figure className="tq-phones">
            <div>
              <img src={mLive} alt={cap.live} loading="lazy" />
              <img src={mTeam} alt={cap.team} loading="lazy" />
              <img src={mStats} alt={cap.stats} loading="lazy" />
            </div>
            <figcaption>{cap.mobile}</figcaption>
          </figure>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.statsTitle}</h2>
          <p className="pp-text">{c.statsP}</p>
          <ul className="pp-features">
            {c.statsBullets.map(b => <li key={b}>{b}</li>)}
          </ul>
          <div className="pp-gallery c2">
            <figure className="pp-figure">
              <img src={shotStats} alt={cap.stats} loading="lazy" />
              <figcaption>{cap.stats}</figcaption>
            </figure>
            <figure className="pp-figure">
              <img src={shotSquad} alt={cap.squad} loading="lazy" />
              <figcaption>{cap.squad}</figcaption>
            </figure>
          </div>
        </div>

        <div className="pp-section" id="plans">
          <h2 className="pp-section-title">{c.plansTitle}</h2>
          <p className="pp-text">{c.plansP}</p>
          <div className="tq-plans">
            {c.plans.map((pl, i) => (
              <article key={pl.name} className={`tq-plan${i === c.plans.length - 1 ? " tq-plan--featured" : ""}`}>
                <header>
                  <h3>{pl.name}</h3>
                  {i === c.plans.length - 1 ? <span className="tq-plan-flag">{c.plansFeatured}</span> : null}
                </header>
                <p className="tq-plan-for">{pl.for}</p>
                <p className="tq-plan-price"><strong>{pl.price}</strong><span>{pl.per}</span></p>
                <p className="tq-plan-yearly">{pl.yearly}</p>
                <p className="tq-plan-extra">{pl.extra}</p>
                <ul>
                  {pl.features.map(f => <li key={f}><FiCheck aria-hidden="true" />{f}</li>)}
                </ul>
                <p className="tq-plan-example">{pl.example}</p>
              </article>
            ))}
          </div>
          <p className="tq-note">{c.plansNote}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.onboardTitle}</h2>
          <p className="pp-text">{c.onboardP}</p>
          <ol className="tq-onboard">
            {c.onboard.map(o => (
              <li key={o.h}>
                <h3>{o.h}</h3>
                <p>{o.p}</p>
              </li>
            ))}
          </ol>
          <p className="tq-note">{c.onboardNote}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.mobileTitle}</h2>
          <p className="pp-text">{c.mobileP}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.archTitle}</h2>
          <ul className="pp-features">
            {c.archSteps.map(s => <li key={s}>{rt(s)}</li>)}
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.qualityTitle}</h2>
          <div className="sc-specs">
            {c.quality.map(q => (
              <div key={q.l} className="sc-spec">
                <span className="sc-spec-value">{q.v}</span>
                <span className="sc-spec-label">{q.l}</span>
              </div>
            ))}
          </div>
          <p className="pp-text">{c.qualityP}</p>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.ctaTitle}</h2>
          <p className="pp-text">{c.ctaP}</p>
          <div className="pp-actions">
            <Link className="pp-btn-primary" to="/contact">{c.ctaContact} <FiArrowUpRight aria-hidden="true" /></Link>
            <a className="pp-btn-secondary" href={LIVE_URL} target="_blank" rel="noopener noreferrer">tactiq360.vercel.app</a>
          </div>
        </div>

        <ProjectNav current="tactiq" />
      </div>
    </div>
  );
}
