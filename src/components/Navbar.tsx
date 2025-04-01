import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import cursorIcon from "../assets/cursor_1.png"; 
import githubIcon from "../assets/githublogo.png";
import githubIconWhite from "../assets/githublogoblanco.png"; 
import linkedinIcon from "../assets/linkedinlogo.png"; 

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  

  return (
    <>
      {/* Redes Sociales - Fuera del NavBar pero en la misma altura */}
      <div className="social-container">
        <a href="https://github.com/PauVilarEstrada" target="_blank" rel="noopener noreferrer">
          <img src={githubIconWhite} alt="GitHub" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>

      {/* NavBar Normal */}
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
            <li><Link to="/projects">Work</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        )}

        <div className="nav-toggle">
          <div className="toggle-circle"></div>
        </div>
      </nav>
    </>
  );
}
