import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/mindflow.css";
import mfLogo from "./assets/logosApps/mindflowlogo.webp";
import mfFeature from "./assets/mindflow/mindflow_feature.webp";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.pvilar.mindflow&hl=es_419";

/* ═══════════════════════════════════════════════════
   Hand-drawn SVG boards — one per game mode
   ═══════════════════════════════════════════════════ */

const cellRect = (
  x: number,
  y: number,
  size: number,
  key: string,
  fill = "#191B26",
) => (
  <rect
    key={key}
    x={x}
    y={y}
    width={size}
    height={size}
    rx={4}
    fill={fill}
    stroke="rgba(255,255,255,0.07)"
    strokeWidth={1}
  />
);

/* ── 1. Path Painter ────────────────────────────── */
function PathPainterBoard() {
  const ox = 90;
  const oy = 20;
  const s = 28;
  const cx = (c: number) => ox + c * s + s / 2;
  const cy = (r: number) => oy + r * s + s / 2;

  const trail: Array<[number, number]> = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
    [4, 1], [3, 1], [2, 1], [1, 1], [0, 1],
    [0, 2], [1, 2],
  ];
  const points = trail.map(([r, c]) => `${cx(c)},${cy(r)}`).join(" ");

  const cells = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) continue;
      cells.push(cellRect(ox + c * s, oy + r * s, s, `pp-${r}-${c}`));
    }
  }

  return (
    <svg className="mf-board" viewBox="0 0 320 180" role="img"
      aria-label="Path Painter board: a single stroke painting every cell">
      {cells}
      {/* obstacle */}
      <rect x={ox + 2 * s} y={oy + 2 * s} width={s} height={s} rx={4}
        fill="#0B0C12" stroke="rgba(255,255,255,0.12)" />
      <path d={`M${ox + 2 * s + 9} ${oy + 2 * s + 9} l10 10 M${ox + 2 * s + 19} ${oy + 2 * s + 9} l-10 10`}
        stroke="#4A4F5C" strokeWidth={2} strokeLinecap="round" />
      {/* painted stroke */}
      <polyline points={points} fill="none" stroke="#6C9BFF" strokeOpacity={0.28}
        strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={points} fill="none" stroke="#6C9BFF" strokeWidth={9}
        strokeLinecap="round" strokeLinejoin="round" />
      {/* start */}
      <circle cx={cx(0)} cy={cy(0)} r={7} fill="#0E0F17" stroke="#6C9BFF" strokeWidth={3} />
      {/* head of the stroke */}
      <circle cx={cx(2)} cy={cy(1)} r={6} fill="#fff" />
      {/* goal */}
      <circle cx={cx(4)} cy={cy(4)} r={9} fill="none" stroke="#5FD6A6" strokeWidth={2.5} strokeDasharray="4 3" />
      <circle cx={cx(4)} cy={cy(4)} r={3.5} fill="#5FD6A6" />
    </svg>
  );
}

/* ── 2. Arrow Puzzle ────────────────────────────── */
type Arrow = {
  r: number; c: number; len: number;
  dir: "up" | "down" | "left" | "right";
  color: string;
};

function ArrowPuzzleBoard() {
  const ox = 90;
  const oy = 20;
  const s = 28;

  const arrows: Arrow[] = [
    { r: 0, c: 0, len: 2, dir: "right", color: "#5FD6A6" },
    { r: 1, c: 3, len: 2, dir: "down", color: "#6C9BFF" },
    { r: 2, c: 0, len: 2, dir: "left", color: "#FF7B7B" },
    { r: 3, c: 1, len: 2, dir: "up", color: "#FFD35C" },
    { r: 4, c: 2, len: 2, dir: "right", color: "#C08BFF" },
  ];

  const cells = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      cells.push(cellRect(ox + c * s, oy + r * s, s, `ap-${r}-${c}`));
    }
  }

  const renderArrow = (a: Arrow, i: number) => {
    const horizontal = a.dir === "left" || a.dir === "right";
    const w = horizontal ? a.len * s - 10 : s - 12;
    const h = horizontal ? s - 12 : a.len * s - 10;
    const x = ox + a.c * s + (horizontal ? 5 : 6);
    const y = oy + a.r * s + (horizontal ? 6 : 5);

    const tipMap = {
      right: `${x + w - 2},${y + h / 2 - 6} ${x + w + 7},${y + h / 2} ${x + w - 2},${y + h / 2 + 6}`,
      left: `${x + 2},${y + h / 2 - 6} ${x - 7},${y + h / 2} ${x + 2},${y + h / 2 + 6}`,
      down: `${x + w / 2 - 6},${y + h - 2} ${x + w / 2},${y + h + 7} ${x + w / 2 + 6},${y + h - 2}`,
      up: `${x + w / 2 - 6},${y + 2} ${x + w / 2},${y - 7} ${x + w / 2 + 6},${y + 2}`,
    };

    return (
      <g key={`arrow-${i}`}>
        <rect x={x} y={y} width={w} height={h} rx={7} fill={a.color} fillOpacity={0.22}
          stroke={a.color} strokeWidth={2} />
        <polygon points={tipMap[a.dir]} fill={a.color} />
      </g>
    );
  };

  return (
    <svg className="mf-board" viewBox="0 0 320 180" role="img"
      aria-label="Arrow Puzzle board: coloured lines sliding off the grid">
      {cells}
      {arrows.map(renderArrow)}
      {/* exit hint */}
      <path d={`M${ox + 5 * s + 6} ${oy + s / 2} h16`} stroke="#5FD6A6" strokeWidth={2}
        strokeLinecap="round" strokeDasharray="3 4" />
    </svg>
  );
}

/* ── 3. Color Minesweeper ───────────────────────── */
function ColorMinesweeperBoard() {
  const ox = 100;
  const oy = 27;
  const s = 30;
  const palette = ["#6C9BFF", "#5FD6A6", "#FF7B7B", "#FFD35C"];
  const grid = [
    [0, 1, 2, 3],
    [1, 0, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0],
  ];
  const bombs = new Set(["0,2", "1,0"]);
  const safe = new Set(["0,0", "0,1", "1,1", "2,0", "3,0"]);

  const nodes: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = ox + c * s;
      const y = oy + r * s;
      const key = `${r},${c}`;
      const color = palette[grid[r][c]];
      nodes.push(
        <rect key={`cm-${key}`} x={x} y={y} width={s - 2} height={s - 2} rx={5}
          fill={color} fillOpacity={0.2} stroke={color} strokeOpacity={0.55} strokeWidth={1.5} />,
      );
      if (bombs.has(key)) {
        nodes.push(
          <circle key={`b-${key}`} cx={x + s / 2 - 1} cy={y + s / 2 - 1} r={7}
            fill="#FF7B7B" stroke="#0E0F17" strokeWidth={1.5} />,
        );
      } else if (safe.has(key)) {
        nodes.push(
          <path key={`s-${key}`}
            d={`M${x + 9} ${y + 9} l10 10 M${x + 19} ${y + 9} l-10 10`}
            stroke="#8E93A3" strokeWidth={2.2} strokeLinecap="round" />,
        );
      }
    }
  }

  return (
    <svg className="mf-board" viewBox="0 0 320 180" role="img"
      aria-label="Color Minesweeper board: one bomb per row, column and colour">
      {nodes}
      <text x={ox} y={oy - 10} fill="#8E93A3" fontSize={9} fontFamily="monospace"
        letterSpacing="1.5">1 BOMB / ROW · COLUMN · COLOUR</text>
    </svg>
  );
}

/* ── 4. Break Infinite Blocks ───────────────────── */
function BreakBlocksBoard() {
  const ox = 62;
  const oy = 16;
  const s = 18;
  const filled: Record<string, string> = {};
  const seed: Array<[number, number, string]> = [
    [1, 1, "#6C9BFF"], [1, 2, "#6C9BFF"], [2, 5, "#FFD35C"], [2, 6, "#FFD35C"],
    [3, 0, "#5FD6A6"], [3, 1, "#5FD6A6"], [3, 6, "#C08BFF"],
    [4, 0, "#FF7B7B"], [4, 1, "#FF7B7B"], [4, 2, "#FFD35C"], [4, 3, "#5FD6A6"],
    [4, 4, "#6C9BFF"], [4, 5, "#C08BFF"], [4, 6, "#FFD35C"],
    [5, 2, "#6C9BFF"], [5, 6, "#5FD6A6"], [6, 3, "#FF7B7B"], [6, 4, "#FF7B7B"],
  ];
  seed.forEach(([r, c, col]) => { filled[`${r},${c}`] = col; });

  const nodes: React.ReactNode[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const x = ox + c * s;
      const y = oy + r * s;
      const col = filled[`${r},${c}`];
      nodes.push(
        <rect key={`bb-${r}-${c}`} x={x} y={y} width={s - 2} height={s - 2} rx={3.5}
          fill={col || "#191B26"} fillOpacity={col ? 0.95 : 1}
          stroke={col ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.06)"} strokeWidth={1} />,
      );
    }
  }

  // row 4 is one cell away from clearing — highlight it
  const clearY = oy + 4 * s - 3;

  return (
    <svg className="mf-board" viewBox="0 0 320 180" role="img"
      aria-label="Break Infinite Blocks board: a row about to clear with a combo multiplier">
      {nodes}
      <rect x={ox - 4} y={clearY} width={8 * s + 6} height={s + 4} rx={6}
        fill="none" stroke="#FFD35C" strokeWidth={1.6} strokeDasharray="5 4" />
      {/* dragged piece */}
      <g opacity={0.95}>
        <rect x={ox + 7 * s} y={oy + 4 * s} width={s - 2} height={s - 2} rx={3.5}
          fill="#FFD35C" stroke="rgba(0,0,0,0.35)" />
        <rect x={ox + 7 * s} y={oy + 3 * s} width={s - 2} height={s - 2} rx={3.5}
          fill="#FFD35C" fillOpacity={0.45} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 2" />
      </g>
      {/* combo + score readout */}
      <text x={216} y={36} fill="#FFD35C" fontSize={17} fontWeight="700"
        fontFamily="'Space Grotesk', sans-serif">x50</text>
      <text x={216} y={50} fill="#8E93A3" fontSize={8} fontFamily="monospace"
        letterSpacing="1.4">COMBO</text>
      <text x={216} y={78} fill="#F0F1F6" fontSize={14} fontWeight="700"
        fontFamily="'Space Grotesk', sans-serif">12,480</text>
      <text x={216} y={91} fill="#8E93A3" fontSize={8} fontFamily="monospace"
        letterSpacing="1.4">SCORE</text>
      <text x={216} y={119} fill="#5FD6A6" fontSize={11} fontWeight="700"
        fontFamily="'Space Grotesk', sans-serif">+128</text>
      <text x={216} y={131} fill="#8E93A3" fontSize={8} fontFamily="monospace"
        letterSpacing="1.4">4 LINES</text>
      <text x={10} y={26} fill="#8E93A3" fontSize={9} fontFamily="monospace"
        letterSpacing="1.4">8 × 8</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════ */

const BOARDS = [<PathPainterBoard />, <ArrowPuzzleBoard />, <ColorMinesweeperBoard />, <BreakBlocksBoard />];
const ACCENTS = ["#6C9BFF", "#5FD6A6", "#FF7B7B", "#FFD35C"];
const TECH = ["React Native 0.73", "TypeScript", "Redux Toolkit", "React Navigation", "react-native-svg",
  "i18next", "AsyncStorage", "Google Mobile Ads", "Google UMP", "Firebase Crashlytics", "Jest", "Gradle / AAB"];

export default function MindFlow() {
  const { t, lang } = useI18n();
  const c = t.pages.mindflow;
  const g = t.pages.common;

  return (
    <div
      key={lang}
      className="pp-page lang-fade"
      style={{ "--pp-color": "#6C9BFF", "--pp-glow": "rgba(108, 155, 255, 0.22)" } as React.CSSProperties}
    >
      <header className="pp-hero">
        <img src={mfLogo} alt="MINDFLOW" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              {c.ctaStore}
            </a>
            <a className="pp-btn-secondary" href="#modes">{c.ctaModes}</a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">{c.glanceTitle}</h2>
          <div className="mf-stats">
            {c.glance.map(s => (
              <div className="mf-stat" key={s.l}>
                <span className="mf-stat-value">{s.v}</span>
                <span className="mf-stat-label">{s.l}</span>
              </div>
            ))}
          </div>
          <div className="pp-gallery c1">
            <img src={mfFeature} alt="MINDFLOW" loading="lazy" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.whyTitle}</h2>
          <p className="pp-text">{c.whyP1}</p>
          <p className="pp-text">{rt(c.whyP2)}</p>
          <p className="pp-text">{rt(c.whyP3)}</p>
        </div>

        <div className="pp-section" id="modes">
          <h2 className="pp-section-title">{c.modesTitle}</h2>
          <p className="pp-text">{c.modesP}</p>
          <div className="mf-modes">
            {c.modes.map((m, i) => (
              <article
                key={m.name}
                className="mf-mode"
                style={{ "--mf-accent": ACCENTS[i] } as React.CSSProperties}
              >
                <div className="mf-mode-head">
                  <span className="mf-mode-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mf-mode-name">{m.name}</h3>
                  <span className="mf-mode-kind">{m.kind}</span>
                </div>
                {BOARDS[i]}
                <p className="mf-mode-text">{rt(m.text)}</p>
                <ul className="mf-mode-rules">
                  {m.rules.map(r => <li key={r}>{r}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mf-note">
            {rt(c.modesNote)}{" "}
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">{c.modesNoteLink}</a>.
          </p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.levelsTitle}</h2>
          <p className="pp-text">{rt(c.levelsP)}</p>
          <ul className="pp-features">
            {c.levelsBullets.map(b => <li key={b}>{rt(b)}</li>)}
          </ul>
          <p className="pp-text" style={{ marginTop: "1.4rem" }}>{c.adsP}</p>
          <div className="mf-table-wrap">
            <table className="mf-table">
              <thead>
                <tr>{c.adsHeaders.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {c.adsRows.map(r => (
                  <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pp-text" style={{ marginTop: "1.1rem" }}>{c.adsNote}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.archTitle}</h2>
          <p className="pp-text">{rt(c.archP)}</p>
          <ul className="pp-features">
            {c.archBullets.map(b => <li key={b}>{rt(b)}</li>)}
          </ul>
          <div className="pp-tech-grid">
            {TECH.map(x => <span key={x} className="pp-tech-badge">{x}</span>)}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.shipTitle}</h2>
          <p className="pp-text">{c.shipP}</p>
          <ol className="pp-steps">
            {c.shipSteps.map(s => <li key={s}>{rt(s)}</li>)}
          </ol>
          <p className="pp-text" style={{ marginTop: "1.2rem" }}>{rt(c.shipNote)}</p>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.downloadTitle}</h2>
          <p className="pp-text">{rt(c.downloadP)}</p>
          <div className="mf-store">
            <img src={mfLogo} alt="MINDFLOW" className="mf-store-icon" />
            <div className="mf-store-meta">
              <strong>MINDFLOW: Brain Puzzle Games</strong>
              <span>{c.storeMeta}</span>
            </div>
            <a className="pp-btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              {c.storeBtn}
            </a>
          </div>
          <div className="pp-contact-box" style={{ marginTop: "1.4rem" }}>
            <p>
              {c.storeListing}{" "}
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                play.google.com/store/apps/details?id=com.pvilar.mindflow
              </a>
            </p>
            <p>Email: <a href="mailto:pvilardev@gmail.com">pvilardev@gmail.com</a></p>
            <p>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/pau-vilar
              </a>
            </p>
          </div>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
