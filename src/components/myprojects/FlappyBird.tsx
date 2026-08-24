import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import flappyLogo from "./assets/logosApps/flappybirdLogoSection.png";
import flappy1 from "./assets/flappyBird1.png";
import flappy2 from "./assets/flappyBird2.png";
import flappy3 from "./assets/FlappyBird3.png";
import flappyCod from "./assets/flappyBirdcod.png";
import flappyCod2 from "./assets/FlappyBirdcod2.png";

export default function FlappyBird() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#4ade80", "--pp-glow": "rgba(74, 222, 128, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={flappyLogo} alt="Flappy Bird" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Unity Game · C# / Physics2D</span>
          <h1 className="pp-title">Flappy Bird Clone</h1>
          <p className="pp-subtitle">
            A classic arcade-style game where you control a bird navigating through procedurally generated
            pipe obstacles. Built from scratch in <strong>Unity</strong> with custom physics, a global
            leaderboard, and polished game state management.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Unity</span>
            <span className="pp-tag">C#</span>
            <span className="pp-tag">Physics2D</span>
            <span className="pp-tag">Game Dev</span>
            <span className="pp-tag">Leaderboard</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Screenshots</h2>
          <div className="pp-gallery c3">
            <img src={flappy1} alt="Start Screen" />
            <img src={flappy2} alt="Gameplay" />
            <img src={flappy3} alt="Game Over" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Features</h2>
          <ul className="pp-features">
            <li><strong>Smooth responsive controls</strong> tuned for satisfying game feel.</li>
            <li><strong>Procedurally generated obstacles</strong> for infinite replayability.</li>
            <li><strong>Online leaderboard</strong> for competitive play.</li>
            <li><strong>Score system</strong> that increments on successfully passing obstacles.</li>
            <li><strong>Polished game state management</strong> — play, pause, and game-over transitions.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Technical Implementation</h2>
          <p className="pp-text">
            Physics mechanics use <strong>Rigidbody2D</strong> to simulate realistic gravity and jumps.
            Obstacles use prefabs with randomization for variation. Collision is handled via{" "}
            <strong>OnTriggerEnter2D</strong> for pixel-perfect responses.
          </p>
          <ol className="pp-steps">
            <li><strong>Gravity &amp; Jumping:</strong> Rigidbody2D force application with tuned gravity scale.</li>
            <li><strong>Obstacle Spawning:</strong> Prefab pool with random vertical offset and fixed horizontal speed.</li>
            <li><strong>Collision Detection:</strong> Managed via OnTriggerEnter2D for precise hitbox control.</li>
            <li><strong>Score System:</strong> Trigger zone between pipes increments score counter on pass.</li>
            <li><strong>Game State:</strong> Enum-driven state machine for play/pause/gameover/restart.</li>
          </ol>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Challenges &amp; Solutions</h2>
          <ul className="pp-features">
            <li><strong>Collision accuracy:</strong> Resolved with precise polygon hitbox adjustments on the bird sprite.</li>
            <li><strong>Difficulty balance:</strong> Required iterative fine-tuning of pipe speed and gap size curves.</li>
            <li><strong>Procedural generation:</strong> Implemented seeded random vertical offset for fair yet varied layouts.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Source Code Preview</h2>
          <div className="pp-gallery c2">
            <img src={flappyCod} alt="Flappy Bird Code 1" />
            <img src={flappyCod2} alt="Flappy Bird Code 2" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Repository</h2>
          <div className="pp-actions">
            <a
              href="https://github.com/PauVilarEstrada/Flappy-Bird"
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
