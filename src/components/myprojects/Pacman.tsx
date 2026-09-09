import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/showcase.css";
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

const REPO = "https://github.com/PauVilarEstrada/pacman";

const SPECS = [
  { v: "Java", l: "Language" },
  { v: "OOP", l: "Architecture" },
  { v: "Grid", l: "Tile engine" },
  { v: "4", l: "Ghosts" },
  { v: "∞", l: "Custom maps" },
];

const BUILD = [
  {
    t: "Entity system",
    p: "Pacman, the ghosts, the walls and the pellets all extend a base entity that owns a position, a velocity and a render method. Adding a new actor means subclassing it, not editing the loop.",
  },
  {
    t: "Game loop",
    p: "A fixed-step loop advances every entity, resolves collisions and redraws the board. Input is queued rather than applied instantly, so a turn buffered just before a junction still registers — that is what makes the controls feel tight.",
  },
  {
    t: "Map parser",
    p: "Levels are plain grid files: walls, pellets, power pellets, spawn points. The parser turns a file into a tile matrix, which is why adding a new map needs no code at all.",
  },
  {
    t: "Collision",
    p: "AABB checks against the tile grid for walls, and against entity boxes for pellets and ghosts — cheap, deterministic, and immune to the tunnelling you get from raw distance checks.",
  },
  {
    t: "Ghost AI",
    p: "Each ghost alternates chase and scatter, targeting a tile rather than the player directly, so the four of them converge from different angles. The chase radius widens as the score climbs, so the board gets progressively meaner.",
  },
  {
    t: "State machine",
    p: "Play, pause, level-clear, game-over and restart are explicit states with explicit transitions — no boolean flags scattered through the loop.",
  },
];

export default function Pacman() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#facc15", "--pp-glow": "rgba(250, 204, 21, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={pacmanLogo} alt="Pacman" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Java Game · Object-Oriented Design</span>
          <h1 className="pp-title">Pacman Remake</h1>
          <p className="pp-subtitle">
            The 1980 arcade classic rebuilt from scratch in <strong>Java</strong> — same rules, modern shell:
            selectable characters, <strong>custom maps loaded from files</strong>, ghost AI that gets meaner as
            your score climbs, and a clean state machine behind the whole thing.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Java</span>
            <span className="pp-tag">OOP</span>
            <span className="pp-tag">Game Loop</span>
            <span className="pp-tag">Ghost AI</span>
            <span className="pp-tag">Custom Levels</span>
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">
              Source on GitHub ↗
            </a>
            <a className="pp-btn-secondary" href="#how">How it works</a>
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

        {/* THE GAME */}
        <div className="pp-section">
          <h2 className="pp-section-title">The game</h2>
          <p className="pp-text">
            Clear the board without getting caught. The maze is a grid of tiles, pellets sit on the walkable
            ones, and four ghosts hunt you from four different directions. Eat a power pellet and the hunt
            inverts for a few seconds — the part of Pacman that makes it a game about timing rather than
            reflexes.
          </p>
          <div className="sc-shot sc-shot--pad">
            <img src={pacmanMap} alt="Pacman gameplay on the main map" loading="lazy" />
          </div>
          <p className="sc-caption">The main board — pellets, power pellets, and four ghosts on patrol.</p>
        </div>

        {/* MENU + CHARACTERS */}
        <div className="pp-section">
          <h2 className="pp-section-title">Start here: menu and characters</h2>
          <div className="sc-split">
            <div className="sc-split-media">
              <img src={pacmanInicio} alt="Start menu" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Main menu</span>
              <h3>One screen, everything reachable</h3>
              <p>
                Start, choose a character, load a custom map or open the settings — no submenus to get lost in.
                The menu is its own state in the machine, so the game world is not even instantiated until you
                press play.
              </p>
            </div>
          </div>
          <div className="sc-split reverse">
            <div className="sc-split-media">
              <img src={pacmanElegir} alt="Character selection screen" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Character select</span>
              <h3>Pick who eats the dots</h3>
              <p>
                Characters are pure presentation — sprite set and colour — swapped at spawn time. The physics,
                the hitbox and the speed stay identical, so picking a favourite never changes the difficulty.
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOM LEVELS */}
        <div className="pp-section">
          <h2 className="pp-section-title">Custom maps — the board is data, not code</h2>
          <p className="pp-text">
            A level is a grid file. The parser reads it into a tile matrix and the renderer draws whatever it
            finds, which means a new maze is a text file away: draw the walls, drop the pellets, mark the spawn
            points, play it. The bundled levels are just the first few written that way.
          </p>
          <div className="sc-split">
            <div className="sc-split-media">
              <img src={pacmanCustom} alt="Custom level editor / loader" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Custom level</span>
              <h3>Load your own maze</h3>
              <p>
                Because walls, pellets and spawns are all just tile types, the game validates a map on load —
                a maze with no pellets or no spawn simply never starts, instead of crashing halfway through the
                first frame.
              </p>
            </div>
          </div>
          <div className="sc-strip">
            <figure>
              <img src={pacmanMap2} alt="Alternative map layout" loading="lazy" />
              <figcaption>A second layout — tighter corridors, fewer escape routes</figcaption>
            </figure>
            <figure>
              <img src={pacmanLevel2Map} alt="Level two map" loading="lazy" />
              <figcaption>Level two, built from the same tile vocabulary</figcaption>
            </figure>
          </div>
        </div>

        {/* GHOST AI */}
        <div className="pp-section">
          <h2 className="pp-section-title">The ghosts are the difficulty curve</h2>
          <div className="sc-split reverse">
            <div className="sc-split-media">
              <img src={pacmanLevel2} alt="Level two gameplay with ghosts closing in" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Chase &amp; scatter</span>
              <h3>Four hunters, four angles</h3>
              <p>
                Each ghost targets a <em>tile</em> rather than the player himself — one aims at you, one aims
                ahead of you, one at the corner you are heading for. Because their targets differ, they
                naturally pincer instead of forming a queue behind you.
              </p>
              <p>
                They also cycle between chasing and scattering to their home corners, which is what gives the
                board its rhythm: pressure, breathing room, pressure. As the score climbs, the chase phases
                lengthen and the scatter phases shrink.
              </p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="pp-section" id="how">
          <h2 className="pp-section-title">How it is built</h2>
          <p className="pp-text">
            The whole thing is plain Java with a structured object-oriented design — no engine, no framework.
            Every mechanic below is written by hand, which is exactly why the project was worth building.
          </p>
          <div className="sc-flow">
            {BUILD.map(b => (
              <div key={b.t} className="sc-flow-step">
                <h4>{b.t}</h4>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SETTINGS / PAUSE */}
        <div className="pp-section">
          <h2 className="pp-section-title">Everything else the game needs</h2>
          <p className="pp-text">
            The parts nobody notices until they are missing: a pause that actually freezes the simulation
            rather than hiding it, and settings that apply without a restart.
          </p>
          <div className="sc-strip">
            <figure>
              <img src={pacmanSettings} alt="Settings screen" loading="lazy" />
              <figcaption>Settings — applied live, no restart</figcaption>
            </figure>
            <figure>
              <img src={pacmanStop} alt="Pause menu" loading="lazy" />
              <figcaption>Pause — a real state, so the loop stops advancing</figcaption>
            </figure>
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">Play it</h2>
          <p className="pp-text">
            The full source — entities, tile parser, ghost AI and all — is on GitHub.
          </p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={REPO} target="_blank" rel="noopener noreferrer">
              github.com/PauVilarEstrada/pacman ↗
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
