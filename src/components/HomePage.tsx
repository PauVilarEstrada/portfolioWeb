import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import "../css/HomePage.css";
import { useI18n } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import WorkList from "./WorkList";
import HeroCanvas from "./HeroCanvas";
import { SOCIAL } from "../data/projects";

import brontoMark from "../assets/brontobyte/brontobyte-mark.webp";
import teamPhoto from "../public/sananFotoEquipo.webp";
import portrait from "../public/PauVilar_NegroPerfil.webp";

/** The badge text is written once in the dictionary and repeated to close the circle. */
const BADGE_REPEAT = 2;
const FEATURED = ["ultimus", "tactiq", "nba", "mindflow", "kdd"] as const;

function RotatingBadge({ text, label }: { text: string; label: string }) {
  return (
    <Link to="/contact" className="hero-badge" aria-label={label}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="hero-badge-ring">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="486" lengthAdjust="spacing">{text.repeat(BADGE_REPEAT)}</textPath>
        </text>
      </svg>
      <span className="hero-badge-core" aria-hidden="true">
        <FiArrowUpRight />
      </span>
    </Link>
  );
}

export default function HomePage() {
  const { t, lang } = useI18n();
  const h = t.home;

  const marquee = h.stack.flatMap(g => g.items);

  return (
    <div className="home lang-fade" key={lang}>
      {/* ── HERO ── */}
      <section className="hero">
        <HeroCanvas />
        <div className="container hero-inner">
          <h1 className="hero-name">
            {h.nameLines.map((l, i) => (
              <span key={l} className={`hero-line hero-line--${i}`}>
                <span className="hero-line-text">{l}</span>
              </span>
            ))}
          </h1>

          <div className="hero-badge-wrap">
            <RotatingBadge text={h.badge} label={h.badgeLabel} />
          </div>

          <div className="hero-rule" aria-hidden="true" />

          <div className="hero-foot">
            <p className="hero-role">
              {h.rolePre}{" "}
              <a className="hero-company" href={SOCIAL.brontobyte} target="_blank" rel="noopener noreferrer">
                <img src={brontoMark} alt="" width="40" height="40" />
                {h.company}
              </a>
            </p>

            <div className="hero-side">
              <p className="hero-intro">{h.intro}</p>
              <div className="hero-ctas">
                <Link to="/contact" className="btn btn--primary">
                  {h.ctaPrimary} <FiArrowUpRight aria-hidden="true" />
                </Link>
                <Link to="/projects" className="btn btn--ghost">{h.ctaSecondary}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <Reveal className="sec-head">
            <h2 className="h-section">{h.servicesTitle}</h2>
            <p className="sec-lead">{h.servicesLead}</p>
          </Reveal>

          <ul className="services">
            {h.services.map(s => (
              <li key={s.h} className="service">
                <h3 className="service-title">{s.h}</h3>
                <div className="service-body">
                  <p>{s.p}</p>
                  <ul className="tags">
                    {s.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section className="section">
        <div className="container">
          <Reveal className="sec-head">
            <h2 className="h-section">{h.workTitle}</h2>
            <p className="sec-lead">{h.workLead}</p>
          </Reveal>

          <WorkList keys={[...FEATURED]} />

          <div className="home-more">
            <Link to="/projects" className="link-u">
              {h.workLink} <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAREER ── */}
      <section className="section">
        <div className="container">
          <Reveal className="sec-head">
            <h2 className="h-section">{h.careerTitle}</h2>
            <Link to="/experience" className="link-u sec-action">
              {h.careerLink} <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="career">
            {[
              { label: h.careerExpLabel, items: h.careerExp },
              { label: h.careerEduLabel, items: h.careerEdu },
            ].map(col => (
              <div key={col.label} className="career-col">
                <h3 className="career-label">{col.label}</h3>
                <ol className="timeline">
                  {col.items.map((r, i) => (
                    <li key={r.year + r.role} className={i === 0 ? "is-now" : undefined}>
                      <span className="timeline-year">{r.year}</span>
                      <span className="timeline-role">{r.role}</span>
                      <span className="timeline-org">{r.org}</span>
                      {r.badge ? <span className="tag tag--green timeline-badge">{r.badge}</span> : null}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPORT ── */}
      <section className="section">
        <div className="container sport">
          <div className="sport-media">
            <img src={teamPhoto} alt="CN Sant Andreu" loading="lazy" className="sport-photo" />
            <img src={portrait} alt="Pau Vilar" loading="lazy" className="sport-portrait" />
          </div>
          <div className="sport-text">
            <h2 className="h-section">{h.sportTitle}</h2>
            <p className="sec-lead">{h.sportLead}</p>
            <dl className="sport-points">
              {h.sport.map(s => (
                <div key={s.h}>
                  <dt>{s.h}</dt>
                  <dd>{s.p}</dd>
                </div>
              ))}
            </dl>
            <Link to="/experience#sport" className="link-u">
              {h.sportLink} <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="section tools">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map(k => (
              <span key={k} className="marquee-group">
                {marquee.map(item => (
                  <span key={item} className="marquee-item">{item}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="sec-head sec-head--tight">
            <h2 className="h-section">{h.stackTitle}</h2>
            <p className="sec-lead">{h.stackLead}</p>
          </div>
          <div className="tool-groups">
            {h.stack.map(g => (
              <div key={g.h} className="tool-group">
                <h3>{g.h}</h3>
                <ul>
                  {g.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
