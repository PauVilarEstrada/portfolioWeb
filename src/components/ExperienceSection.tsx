import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/ExperienceSection.css";
import { useI18n } from "../i18n/LanguageContext";
import { rt } from "../i18n/rich";
import { SOCIAL } from "../data/projects";

import brontoMark from "../assets/brontobyte/brontobyte-mark.webp";
import implemaiLogo from "../assets/brontobyte/implemai.svg";
import certEns from "../assets/brontobyte/cert-ens.webp";
import certIso from "../assets/brontobyte/cert-iso27001.webp";
import sycaiLogo from "../assets/logoSycai.png";

import cncLogo from "../assets/logo_cnc.webp";
import cnbLogo from "../assets/cnb.png";
import cnsaLogo from "../assets/cnsa_new.webp";
import lewaterpoloLogo from "../assets/lewaterpolo.png";
import eurocupLogo from "../assets/logoeurocup.webp";
import championsLogo from "../assets/championslogo.webp";

import photoFront from "../public/PauVilar_NegroPerfil.webp";
import photoSide from "../public/PauVilar_NegroLado.webp";
import teamPhoto from "../public/sananFotoEquipo.webp";

import monlauLogo from "../assets/monlaulogo.svg";
import poblenouLogo from "../assets/poblenoulogo.png";
import insCarLogo from "../assets/insCARlogo.png";

const SECTIONS = ["bronto", "trainer", "sycai", "sport", "education"] as const;
type SectionId = (typeof SECTIONS)[number];

const SYCAI_TECH = ["React", "TypeScript", "Angular", "Flask", "Python", "Java", "Node.js", "SQL", "Docker", "AWS", "Tailwind", "Git"];
const CLUB_LOGOS = [cncLogo, cnsaLogo, cnbLogo];
const EDU_LOGOS = [monlauLogo, poblenouLogo, insCarLogo];
const COMPETITIONS = [
  { src: lewaterpoloLogo, alt: "LEWATERPOLO, División de Honor", dark: false },
  { src: eurocupLogo, alt: "LEN EuroCup", dark: false },
  { src: championsLogo, alt: "LEN Champions League", dark: true },
];

/** Highlights the index entry of the section currently in the reading band. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("bronto");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id as SectionId); }),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

function EntryHead({ logo, dark, initials, org, role, period, location, current }: {
  logo?: string; dark?: boolean; initials?: string; org: string; role: string; period: string; location: string; current?: string;
}) {
  return (
    <header className="xp-head">
      <span className={`logo-disc xp-logo${dark ? " logo-disc--dark" : ""}`}>
        {logo ? <img src={logo} alt="" /> : <span className="xp-initials">{initials}</span>}
      </span>
      <div className="xp-title">
        <h2>{org}</h2>
        <p>{role}</p>
      </div>
      <ul className="xp-meta tags">
        {current ? <li className="tag tag--green">{current}</li> : null}
        <li className="tag">{period}</li>
        <li className="tag">{location}</li>
      </ul>
    </header>
  );
}

export default function ExperienceSection() {
  const { t, lang } = useI18n();
  const e = t.experience;
  const active = useActiveSection();

  return (
    <div className="xp-page lang-fade" key={lang}>
      <header className="container page-head">
        <h1 className="page-head-title">{e.pageTitle}</h1>
        <div className="page-head-row">
          <p className="page-head-lead">{e.pageLead}</p>
        </div>
      </header>

      <div className="container xp-layout">
        <nav className="xp-index" aria-label={e.indexTitle}>
          <p>{e.indexTitle}</p>
          <ul>
            {SECTIONS.map(id => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? "is-active" : undefined}>{e.index[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="xp-main">
          {/* ── Brontobyte Cloud ── */}
          <article id="bronto" className="xp">
            <EntryHead logo={brontoMark} org={e.bronto.org} role={e.bronto.role} period={e.bronto.period} location={e.bronto.location} current={e.labels.current} />
            <div className="xp-body">
              <p className="xp-summary">{rt(e.bronto.summary)}</p>
              <p className="xp-text">{rt(e.bronto.about)}</p>

              <h3 className="xp-sub">{e.labels.highlights}</h3>
              <ul className="dot-list">
                {e.bronto.highlights.map(x => <li key={x}>{rt(x)}</li>)}
              </ul>

              <figure className="xp-quote">
                <blockquote>{e.bronto.quote}</blockquote>
                <figcaption>{e.bronto.quoteSource}</figcaption>
              </figure>

              <section className="implemai" aria-labelledby="implemai-title">
                <div className="implemai-head">
                  <span className="implemai-logo"><img src={implemaiLogo} alt="IMPLEMAI" /></span>
                  <h3 id="implemai-title">{e.bronto.implemai.title}</h3>
                  <p>{e.bronto.implemai.lead}</p>
                </div>
                <dl className="implemai-facts">
                  {e.bronto.implemai.facts.map(f => (
                    <div key={f.h}>
                      <dt>{f.h}</dt>
                      <dd>{f.p}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <div className="xp-certs">
                <p>{e.bronto.certsLabel}</p>
                <div className="xp-cert-row">
                  <img src={certEns} alt="ENS, Esquema Nacional de Seguridad, categoría media" loading="lazy" />
                  <img src={certIso} alt="ISO 27001, EQA organización certificada" loading="lazy" />
                  <a className="link-u" href={SOCIAL.brontobyte} target="_blank" rel="noopener noreferrer">
                    {e.bronto.website} <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* ── Chamber of Commerce ── */}
          <article id="trainer" className="xp">
            <EntryHead initials="CC" org={e.trainer.org} role={e.trainer.role} period={e.trainer.period} location={e.trainer.location} />
            <div className="xp-body">
              <p className="xp-summary">{rt(e.trainer.summary)}</p>
              <h3 className="xp-sub">{e.labels.topics}</h3>
              <ul className="dot-list">
                {e.trainer.topics.map(x => <li key={x}>{rt(x)}</li>)}
              </ul>
            </div>
          </article>

          {/* ── Sycai Medical ── */}
          <article id="sycai" className="xp">
            <EntryHead logo={sycaiLogo} dark org={e.sycai.org} role={e.sycai.role} period={e.sycai.period} location={e.sycai.location} />
            <div className="xp-body">
              <p className="xp-summary">{rt(e.sycai.summary)}</p>
              <h3 className="xp-sub">{e.labels.achievements}</h3>
              <ul className="dot-list">
                {e.sycai.achievements.map(x => <li key={x}>{rt(x)}</li>)}
              </ul>
              <h3 className="xp-sub">{e.labels.stack}</h3>
              <ul className="tags">
                {SYCAI_TECH.map(x => <li key={x} className="tag">{x}</li>)}
              </ul>
            </div>
          </article>

          {/* ── Water polo ── */}
          <article id="sport" className="xp">
            <header className="xp-section-head">
              <h2>{e.sport.title}</h2>
              <p>{rt(e.sport.lead)}</p>
            </header>

            <div className="xp-photos">
              <img src={photoFront} alt="Pau Vilar" loading="lazy" />
              <img src={teamPhoto} alt="CN Sant Andreu" loading="lazy" />
              <img src={photoSide} alt="Pau Vilar" loading="lazy" />
            </div>

            <ol className="clubs">
              {e.sport.clubs.map((c, i) => (
                <li key={c.name} className="club">
                  <span className="logo-disc club-logo"><img src={CLUB_LOGOS[i]} alt="" /></span>
                  <div className="club-main">
                    <h3>{c.name}</h3>
                    <p>{c.p}</p>
                    <ul className="tags">
                      {c.comps.map(x => <li key={x} className="tag">{x}</li>)}
                    </ul>
                  </div>
                  <div className="club-side">
                    <span className="club-years">{c.years}</span>
                    {c.current ? <span className="tag tag--green">{e.sport.currentBadge}</span> : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="xp-competitions">
              {COMPETITIONS.map(c => (
                <span key={c.alt} className={`logo-disc comp-logo${c.dark ? " logo-disc--dark" : ""}`}>
                  <img src={c.src} alt={c.alt} loading="lazy" />
                </span>
              ))}
            </div>

            <h3 className="xp-sub">{e.sport.lessonsTitle}</h3>
            <ul className="dot-list">
              {e.sport.lessons.map(x => <li key={x}>{rt(x)}</li>)}
            </ul>
          </article>

          {/* ── Education ── */}
          <article id="education" className="xp">
            <header className="xp-section-head">
              <h2>{e.education.title}</h2>
            </header>

            <ol className="edu">
              {e.education.items.map((it, i) => (
                <li key={it.h} className="edu-item">
                  <span className="logo-disc edu-logo"><img src={EDU_LOGOS[i]} alt="" /></span>
                  <div className="edu-main">
                    <span className="edu-period">{it.period}</span>
                    <h3>{it.h}</h3>
                    <p className="edu-org">{it.org}</p>
                    <p className="edu-text">{rt(it.p)}</p>
                    {it.badge ? <span className="tag tag--green">{it.badge}</span> : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="edu-extra">
              <div>
                <h3 className="xp-sub">{e.education.certificationsTitle}</h3>
                <ul className="dot-list">
                  {e.education.certifications.map(c => <li key={c}>{rt(c)}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="xp-sub">{e.education.languagesTitle}</h3>
                <dl className="langs">
                  {e.education.languages.map(l => (
                    <div key={l.l}><dt>{l.l}</dt><dd>{l.v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
