import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import "../css/Footer.css";
import { useI18n } from "../i18n/LanguageContext";
import { SOCIAL } from "../data/projects";

/** The clock only shows minutes, so a 20-second tick is precise enough. */
const CLOCK_TICK_MS = 20000;

function useCatalanTime(lang: string) {
  const format = () =>
    new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
      hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid", timeZoneName: "short",
    }).format(new Date());
  const [now, setNow] = useState(format);
  useEffect(() => {
    setNow(format());
    const id = window.setInterval(() => setNow(format()), CLOCK_TICK_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return now;
}

export default function Footer() {
  const { t, lang } = useI18n();
  const { pathname } = useLocation();
  const time = useCatalanTime(lang);
  const f = t.footer;
  // The contact page already is the call to action.
  const showCta = pathname !== "/contact";

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className={`footer${showCta ? "" : " footer--compact"}`}>
      <div className="container">
        {showCta && (
          <div className="footer-cta">
            <h2 className="footer-title">{f.title}</h2>
            <div className="footer-cta-row">
              <p className="footer-body">{f.body}</p>
              <div className="footer-actions">
                <a className="btn btn--light" href={`mailto:${SOCIAL.email}`}>
                  {f.cta} <FiArrowUpRight aria-hidden="true" />
                </a>
                <Link className="btn btn--ghost-light" to="/contact">{f.secondary}</Link>
              </div>
            </div>
            <a className="footer-mail" href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
          </div>
        )}

        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-mark" aria-hidden="true">PV</span>
            <p>{f.rights}<br /><span>{f.place}</span></p>
          </div>
          <nav aria-label={f.navTitle}>
            <h3>{f.navTitle}</h3>
            <ul>
              <li><Link to="/">{t.nav.home}</Link></li>
              <li><Link to="/projects">{t.nav.work}</Link></li>
              <li><Link to="/experience">{t.nav.experience}</Link></li>
              <li><Link to="/contact">{t.nav.contact}</Link></li>
            </ul>
          </nav>
          <div>
            <h3>{f.elsewhereTitle}</h3>
            <ul>
              <li><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={SOCIAL.brontobyte} target="_blank" rel="noopener noreferrer">Brontobyte Cloud</a></li>
              <li><a href={`mailto:${SOCIAL.email}`}>Email</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {f.rights}</span>
          <span className="footer-clock" title={f.localTime}>
            <span className="footer-clock-dot" aria-hidden="true" />
            <span className="sr-only">{f.localTime}: </span>{time}
          </span>
          <button type="button" className="footer-top" onClick={toTop}>
            {f.top} <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
