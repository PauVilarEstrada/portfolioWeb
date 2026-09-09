import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/showcase.css";
import flappyLogo from "./assets/logosApps/flappybirdLogoSection.png";
import flappy1 from "./assets/flappyBird1.png";
import flappy2 from "./assets/flappyBird2.png";
import flappy3 from "./assets/FlappyBird3.png";
import flappyGeneral from "./assets/FlappyBirdGeneral.png";
import flappyVideo from "./assets/DemostracioVideoFlappyBird.mp4";

const REPO = "https://github.com/PauVilarEstrada/Flappy-Bird";

const SPECS = [
  { v: "Unity", l: "Engine" },
  { v: "C#", l: "Language" },
  { v: "2D", l: "Physics" },
  { v: "∞", l: "Procedural pipes" },
  { v: "Online", l: "Leaderboard" },
];

const LOOP = [
  {
    t: "Gravity and the flap",
    p: "A Rigidbody2D falls under a tuned gravity scale; a tap replaces the vertical velocity outright instead of adding to it, so every flap has exactly the same height no matter how fast you were already falling. That single decision is what separates a bird that feels controllable from one that feels slippery.",
  },
  {
    t: "Pipes that never repeat",
    p: "Obstacles come from a prefab pool with a randomised vertical offset and a fixed horizontal speed. Recycling pipes off-screen rather than instantiating new ones keeps allocation flat, so the frame rate does not degrade as the run gets long.",
  },
  {
    t: "Scoring by trigger",
    p: "An invisible trigger zone sits in the gap between each pipe pair. Passing through it increments the counter — no distance maths, no double counting, and it works identically at any speed.",
  },
  {
    t: "Collision, honestly",
    p: "OnTriggerEnter2D against a polygon hitbox traced to the sprite rather than a lazy box. A death has to feel fair: if the player can see daylight between the bird and the pipe, they must not die.",
  },
  {
    t: "Game state",
    p: "An enum-driven state machine covers ready, playing, paused, dead and restart. The world is reset from a single entry point, which is why a restart never inherits a half-finished animation or a stale score.",
  },
  {
    t: "The leaderboard",
    p: "Scores are submitted at death and read back on the menu, so a run is measured against everyone else's rather than against your own last attempt.",
  },
];

export default function FlappyBird() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#4ade80", "--pp-glow": "rgba(74, 222, 128, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={flappyLogo} alt="Flappy Bird" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Unity Game · C# / Physics2D</span>
          <h1 className="pp-title">Flappy Bird — Improved Clone</h1>
          <p className="pp-subtitle">
            One button, one bird, an endless wall of pipes. Built from scratch in <strong>Unity</strong> with
            hand-tuned 2D physics, a <strong>pooled procedural obstacle generator</strong> and an{" "}
            <strong>online leaderboard</strong> — the simplest possible game, treated as a real engineering
            problem in <em>game feel</em>.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Unity</span>
            <span className="pp-tag">C#</span>
            <span className="pp-tag">Physics2D</span>
            <span className="pp-tag">Object Pooling</span>
            <span className="pp-tag">Leaderboard</span>
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">
              Source on GitHub ↗
            </a>
            <a className="pp-btn-secondary" href="#demo">Watch it played</a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <div className="sc-specs">
            {SPECS.map(s => (
              <div key={s.l} className="sc-spec">
                <span className="sc-spec-value">{s.v}</span>
                <span className="sc-spec-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DEMO VIDEO */}
        <div className="pp-section" id="demo">
          <h2 className="pp-section-title">See it running</h2>
          <p className="pp-text">
            The clip below is the game as it plays: the flap, the pipe cadence, the score ticking over as each
            gap is cleared, and the run ending the moment a hitbox says it does.
          </p>
          <div className="sc-shot">
            <video controls preload="none" poster={flappy2} playsInline>
              <source src={flappyVideo} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
          <p className="sc-caption">Full gameplay demo — recorded from a live build.</p>
        </div>

        {/* GAMEPLAY */}
        <div className="pp-section">
          <h2 className="pp-section-title">Three screens, one rule</h2>
          <div className="sc-split">
            <div className="sc-split-media">
              <img src={flappy1} alt="Start screen" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Start</span>
              <h3>No tutorial, no options wall</h3>
              <p>
                The bird hovers, the pipes wait, and one tap starts the run. Everything the player needs to
                know is taught by the first two seconds of play — which is the entire design brief of the
                original.
              </p>
            </div>
          </div>
          <div className="sc-split reverse">
            <div className="sc-split-media">
              <img src={flappy2} alt="Gameplay" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">In play</span>
              <h3>Every gap is generated, none are unfair</h3>
              <p>
                Vertical offsets are randomised inside bounds that guarantee a reachable path from the previous
                gap. Random is easy; <em>random and always survivable</em> is the part that took the tuning.
              </p>
            </div>
          </div>
          <div className="sc-split">
            <div className="sc-split-media">
              <img src={flappy3} alt="Game over screen" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Game over</span>
              <h3>Score, best, and straight back in</h3>
              <p>
                Death resolves in one frame and the restart path resets the world from a single entry point, so
                you are flying again before the frustration has time to land.
              </p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="pp-section" id="how">
          <h2 className="pp-section-title">How the loop is built</h2>
          <div className="sc-flow">
            {LOOP.map(l => (
              <div key={l.t} className="sc-flow-step">
                <h4>{l.t}</h4>
                <p>{l.p}</p>
              </div>
            ))}
          </div>
          <div className="sc-shot sc-shot--pad">
            <img src={flappyGeneral} alt="Flappy Bird overview" loading="lazy" />
          </div>
        </div>

        {/* CHALLENGES */}
        <div className="pp-section">
          <h2 className="pp-section-title">What was actually hard</h2>
          <div className="sc-cards">
            <div className="sc-card">
              <span className="sc-card-icon">🎯</span>
              <h4>Collisions that feel fair</h4>
              <p>
                A rectangular hitbox on a round bird kills you on gaps you visibly cleared. Tracing a polygon
                collider to the sprite fixed the complaint that the game was cheating.
              </p>
            </div>
            <div className="sc-card">
              <span className="sc-card-icon">⚖️</span>
              <h4>Difficulty balance</h4>
              <p>
                Pipe speed and gap size are two knobs that fight each other. Getting from "trivial" to
                "impossible" without ever passing through "boring" was iterative tuning, not a formula.
              </p>
            </div>
            <div className="sc-card">
              <span className="sc-card-icon">🔁</span>
              <h4>Procedural, but fair</h4>
              <p>
                A seeded random offset with clamped deltas keeps every layout varied and every layout
                survivable — no two consecutive gaps further apart than a single flap can cover.
              </p>
            </div>
            <div className="sc-card">
              <span className="sc-card-icon">📉</span>
              <h4>Keeping the frame rate flat</h4>
              <p>
                Pooling and recycling pipes instead of instantiating them means a five-minute run allocates no
                more than a five-second one.
              </p>
            </div>
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">Play it</h2>
          <p className="pp-text">The full Unity project — scripts, prefabs and scenes — is on GitHub.</p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">
              github.com/PauVilarEstrada/Flappy-Bird ↗
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
