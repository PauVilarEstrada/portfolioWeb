import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import pacmanLogo from "./assets/logosApps/pacmanlogo.png";
import pacmanInicio from "./assets/PacmanInicio.png";
import pacmanElegir from "./assets/PacmanElegir.png";
import pacmanCustom from "./assets/PacmanCustom.png";
import pacmanLevel2 from "./assets/PacmanLevel2.png";
import pacmanLevel2Map from "./assets/PacmanLevel2Map.png";
import pacmanMap2 from "./assets/PacmanMap2.png";
import pacmanMap from "./assets/PacmanMap.png";
import pacmanSettings from "./assets/PacmanSettings.png";
import pacmanStop from "./assets/PacmanStop.png";
import pacmanCod1 from "./assets/Pacmancod.png";
import pacmanCod2 from "./assets/Pacmancod2.png";
import pacmanCod3 from "./assets/Pacmancod3.png";
import pacmanCod4 from "./assets/Pacmancod4.png";

export default function Pacman() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#facc15", "--pp-glow": "rgba(250, 204, 21, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={pacmanLogo} alt="Pacman" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Java Game · Object-Oriented Design</span>
          <h1 className="pp-title">Pacman Remake</h1>
          <p className="pp-subtitle">
            A reimagined version of the iconic arcade game — built from scratch with modern design,
            improved gameplay, <strong>custom levels</strong>, character selection, and smart ghost AI
            with increasing difficulty.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Java</span>
            <span className="pp-tag">OOP</span>
            <span className="pp-tag">Game Dev</span>
            <span className="pp-tag">Ghost AI</span>
            <span className="pp-tag">Custom Levels</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Screenshots</h2>
          <div className="pp-gallery c3">
            <img src={pacmanInicio} alt="Start Menu" />
            <img src={pacmanElegir} alt="Character Selection" />
            <img src={pacmanCustom} alt="Custom Level" />
            <img src={pacmanMap} alt="Main Map" />
            <img src={pacmanMap2} alt="Map 2" />
            <img src={pacmanLevel2} alt="Level 2" />
            <img src={pacmanLevel2Map} alt="Level 2 Map" />
            <img src={pacmanSettings} alt="Settings" />
            <img src={pacmanStop} alt="Pause Menu" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Features</h2>
          <ul className="pp-features">
            <li><strong>Classic arcade gameplay</strong> with smoother and more responsive controls.</li>
            <li><strong>Custom level support</strong> with multiple distinct maps.</li>
            <li><strong>Character selection</strong> and theme customization.</li>
            <li><strong>Responsive UI</strong> with mobile-friendly layout considerations.</li>
            <li><strong>Smart ghost AI</strong> with increasing difficulty as score climbs.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Technical Architecture</h2>
          <p className="pp-text">
            Implemented in <strong>Java</strong> with a structured object-oriented design. Each entity
            (Pacman, ghosts, walls, pellets) is modularized into its own class. Movement, collision, map
            loading, and state transitions are all handled programmatically via game loop and event dispatch.
          </p>
          <ul className="pp-features">
            <li><strong>Entity system:</strong> each game object extends a base entity with position, velocity, and render methods.</li>
            <li><strong>Ghost AI:</strong> pathfinding with difficulty-scaling chase radius and scatter patterns.</li>
            <li><strong>Map loading:</strong> grid-based tile system with custom level file parser.</li>
            <li><strong>Collision:</strong> AABB-based detection for walls, pellets, and ghosts.</li>
            <li><strong>State machine:</strong> clean play/pause/gameover/win state transitions.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Source Code Preview</h2>
          <div className="pp-gallery c2">
            <img src={pacmanCod1} alt="Code 1" />
            <img src={pacmanCod2} alt="Code 2" />
            <img src={pacmanCod3} alt="Code 3" />
            <img src={pacmanCod4} alt="Code 4" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Repository</h2>
          <div className="pp-actions">
            <a
              href="https://github.com/PauVilarEstrada/pacman"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-btn-primary"
            >
              GitHub →
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
