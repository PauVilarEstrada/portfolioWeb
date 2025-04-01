import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/pacman.css";

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
    <section className="pacman-container">
      <h1>Pacman Clone</h1>
      <p>
        This Pacman Clone is a reimagined version of the iconic arcade game, built from scratch to
        feature modern design, improved gameplay, and additional custom levels. Includes 
        character selection, level switching, and responsive controls.
      </p>

      <div className="image-gallery">
        <img src={pacmanInicio} alt="Pacman Start Menu" />
        <img src={pacmanElegir} alt="Pacman Character Selection" />
        <img src={pacmanCustom} alt="Pacman Custom Level" />
        <img src={pacmanMap} alt="Pacman Main Map" />
        <img src={pacmanMap2} alt="Pacman Map 2" />
        <img src={pacmanLevel2} alt="Pacman Level 2" />
        <img src={pacmanLevel2Map} alt="Pacman Level 2 Map" />
        <img src={pacmanSettings} alt="Pacman Settings" />
        <img src={pacmanStop} alt="Pacman Pause Menu" />
      </div>

      <h2>📌 Features</h2>
      <ul className="pacman-features">
        <li>🕹️ Classic arcade gameplay with smoother controls.</li>
        <li>🎨 Custom level support with multiple maps.</li>
        <li>👾 Character selection and theme customization.</li>
        <li>📱 Responsive UI and mobile-friendly layout.</li>
        <li>🧠 Smart ghost AI with increasing difficulty.</li>
      </ul>

      <h2>🧠 Technical Architecture</h2>
      <p>
        The game is implemented using Java with a structured object-oriented design.
        Each entity (Pacman, ghosts, walls, pellets) is modularized. Movement, collision,
        map loading, and state transitions are all handled programmatically.
      </p>

      <h2>🖥️ Source Code</h2>
      <div className="code-gallery">
        <img src={pacmanCod1} alt="Pacman Code 1" className="code-image" />
        <img src={pacmanCod2} alt="Pacman Code 2" className="code-image" />
        <img src={pacmanCod3} alt="Pacman Code 3" className="code-image" />
        <img src={pacmanCod4} alt="Pacman Code 4" className="code-image" />
      </div>

      <h2>🔗 GitHub Repository</h2>
      <p>
        You can explore the full source code on GitHub:
        <br />
        <a href="https://github.com/PauVilarEstrada/pacman" target="_blank" rel="noopener noreferrer">
          Pacman GitHub Repository
        </a>
      </p>

      <Link to="/projects" className="pacman-back-link">🔙 Back to Projects</Link>
    </section>
  );
}
