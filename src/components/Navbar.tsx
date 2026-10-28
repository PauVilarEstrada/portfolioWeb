import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import LanguageSwitch from "./LanguageSwitch";
import { useI18n } from "../i18n/LanguageContext";
import { SOCIAL } from "../data/projects";

/** Past this many pixels the bar tucks away while scrolling down. */
const HIDE_AFTER = 240;
/** Ignore scroll jitter smaller than this. */
const SCROLL_SLACK = 4;
const SHADOW_AFTER = 12;

export default function NavBar() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/projects", label: t.nav.work },
    { to: "/experience", label: t.nav.experience },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => { setOpen(false); }, [pathname]);

  // Tuck the bar away while reading downwards, bring it back on any upward scroll.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SHADOW_AFTER);
      setHidden(y > HIDE_AFTER && y > lastY.current + SCROLL_SLACK);
      if (y < lastY.current - SCROLL_SLACK || y < HIDE_AFTER) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <a className="skip-link" href="#main">{t.nav.skip}</a>

      <header className={`nav${hidden && !open ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav-pill" aria-label={t.nav.menu}>
          <Link to="/" className="nav-brand" aria-label={t.nav.homeLabel}>
            <span className="nav-mark" aria-hidden="true">PV</span>
            <span className="nav-name">Pau Vilar</span>
          </Link>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} className={isActive(l.to) ? "is-active" : undefined} end={l.to === "/"}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-end">
            <LanguageSwitch />
            <button
              ref={toggleRef}
              type="button"
              className={`nav-toggle${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-controls="nav-sheet"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen(o => !o)}
            >
              <span /><span />
            </button>
          </div>
        </nav>
      </header>

      <div id="nav-sheet" className={`nav-sheet${open ? " is-open" : ""}`} inert={!open}>
        <ul className="nav-sheet-links">
          {links.map((l, i) => (
            <li key={l.to} style={{ "--i": i } as React.CSSProperties}>
              <Link to={l.to} className={isActive(l.to) ? "is-active" : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-sheet-foot">
          <a href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
          <div>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
