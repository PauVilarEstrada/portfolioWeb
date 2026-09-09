import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import cursorIcon from "../assets/cursor_1.png";
import githubIconWhite from "../assets/githublogoblanco.png";
import linkedinIcon from "../assets/linkedinlogo.png";
import LanguageSwitch from "./LanguageSwitch";
import { useI18n } from "../i18n/LanguageContext";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <div className="social-container">
        <LanguageSwitch compact />
        <a href="https://github.com/PauVilarEstrada" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src={githubIconWhite} alt="GitHub" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>

      <nav
        className={`nav-container ${isExpanded ? "expanded" : "collapsed"}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="nav-logo">
          <img src={cursorIcon} alt="Logo" className="nav-icon" />
        </div>

        {isExpanded && (
          <ul className="nav-links">
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/projects">{t.nav.work}</Link></li>
            <li><Link to="/experience">{t.nav.experience}</Link></li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
          </ul>
        )}

        <div className="nav-toggle">
          <div className="toggle-circle"></div>
        </div>
      </nav>
    </>
  );
}
