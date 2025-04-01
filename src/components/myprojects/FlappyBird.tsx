import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/flappyBird.css";
import flappy1 from "./assets/flappyBird1.png";
import flappy2 from "./assets/flappyBird2.png";
import flappy3 from "./assets/flappyBird3.png";
import flappyCod from "./assets/flappyBirdcod.png";
import flappyCod2 from "./assets/FlappyBirdcod2.png";
import flappyGeneral from "./assets/FlappyBirdGeneral.png";

export default function FlappyBird() {
  return (
    <section className="flappybird-container">
      <h1>Flappy Bird Clone</h1>
      <p>
        Flappy Bird is a classic arcade-style game where you control a bird navigating
        through vertical pipe obstacles. The goal is to survive as long as possible without
        colliding with the pipes or the ground.
      </p>
      
      <div className="image-gallery">
        <img src={flappy1} alt="Flappy Bird Start Screen" className="gameplay-image" />
        <img src={flappy2} alt="Flappy Bird Gameplay" className="gameplay-image" />
        <img src={flappy3} alt="Flappy Bird Game Over" className="gameplay-image" />
      </div>
      
      <h2>📌 Features</h2>
      <ul className="flappy-features">
        <li>🎮 Smooth and responsive controls.</li>
        <li>🔄 Procedurally generated obstacles.</li>
        <li>📈 Online leaderboard for competition.</li>
      </ul>
      
      <h2>⚙️ Technical Implementation</h2>
      <p>
        The game was developed using Unity and C#. The mechanics involve applying
        physics to simulate realistic movement, handling collision detection, and dynamically
        spawning and destroying objects to optimize performance.
      </p>
      
      <h3>🔧 Core Mechanics</h3>
      <ul>
        <li><strong>Gravity & Jumping:</strong> Implemented using Rigidbody2D.</li>
        <li><strong>Obstacle Spawning:</strong> Uses prefabs and randomization.</li>
        <li><strong>Collision Detection:</strong> Managed via OnTriggerEnter2D.</li>
        <li><strong>Score System:</strong> Increments on passing obstacles.</li>
        <li><strong>Game State Management:</strong> Controls play/pause conditions.</li>
      </ul>
      
      <h2>🛠️ Challenges & Solutions</h2>
      <ul>
        <li>⚠️ Collision issues were solved with precise hitbox adjustments.</li>
        <li>⚖️ Balancing difficulty required iterative fine-tuning.</li>
        <li>🧩 Implementing procedural generation enhanced replayability.</li>
      </ul>
      
      <h2>📜 Source Code & Technical View</h2>
      <div className="code-gallery">
        <img src={flappyCod} alt="Flappy Bird Code 1" className="code-image1" />
        <img src={flappyCod2} alt="Flappy Bird Code 2" className="code-image2" />
      </div>
      
      <h2>🔗 GitHub Repository</h2>
      <p>
        The full source code for the Flappy Bird Clone is available on GitHub:
        <br />
        <a href="https://github.com/PauVilarEstrada/Flappy-Bird" target="_blank" rel="noopener noreferrer">
          Flappy Bird GitHub Repository
        </a>
      </p>
      
      <Link to="/projects" className="flappy-back-link">🔙 Back to Projects</Link>
    </section>
  );
}