import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import cursorIcon from "../assets/cursor_1.png";
import githubIconWhite from "../assets/githublogoblanco.png";
import linkedinIcon from "../assets/linkedinlogo.png";
import LanguageSwitch from "./LanguageSwitch";
import { useI18n } from "../i18n/LanguageContext";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useI18n();
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/projects", label: t.nav.work },
    { to: "/experience", label: t.nav.experience },
    { to: "/contact", label: t.nav.contact },
  ];

  // Collapse whenever the route changes
  useEffect(() => { setIsExpanded(false); }, [pathname]);

  // Collapse on outside tap / Escape (touch devices have no mouseleave)
  useEffect(() => {
    if (!isExpanded) return;
    const onDown = (ev: Event) => {
      if (navRef.current && !navRef.current.contains(ev.target as Node)) setIsExpanded(false);
    };
    const onKey = (ev: KeyboardEvent) => { if (ev.key === "Escape") setIsExpanded(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isExpanded]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <a className="skip-link" href="#main">{t.nav.skip}</a>

      <div className={`social-container${isExpanded ? " is-dimmed" : ""}`}>
        <LanguageSwitch compact />
        <a href="https://github.com/PauVilarEstrada" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src={githubIconWhite} alt="GitHub" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>

      <nav
        ref={navRef}
        className={`nav-container ${isExpanded ? "expanded" : "collapsed"}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        aria-label="Pau Vilar"
      >
        <button
          type="button"
          className="nav-logo"
          aria-expanded={isExpanded}
          aria-label={t.nav.hint}
          onClick={() => setIsExpanded(v => !v)}
        >
          <img src={cursorIcon} alt="" className="nav-icon" />
          <span className="nav-logo-pulse" aria-hidden="true" />
        </button>

        <div className="nav-links-wrap">
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={isActive(l.to) ? "is-active" : undefined}
                  tabIndex={isExpanded ? 0 : -1}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
