import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/mindflow.css";
import mfLogo from "./assets/logosApps/mindflowlogo.png";
import mfFeature from "./assets/mindflow/mindflow_feature.png";

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
   Mode data
   ═══════════════════════════════════════════════════ */

const MODES = [
  {
    accent: "#6C9BFF",
    name: "Path Painter",
    kind: "400 levels",
    board: <PathPainterBoard />,
    text: (
      <>
        A <strong>one-line drawing puzzle</strong>. Paint every free cell of the grid with a
        single continuous stroke, from the start point to the goal, without lifting your
        finger or crossing your own path.
      </>
    ),
    rules: [
      "Every level is a verified Hamiltonian path — a solution always exists",
      "Obstacles block cells and reshape the route",
      "The stored solution doubles as the hint system",
    ],
  },
  {
    accent: "#5FD6A6",
    name: "Arrow Puzzle",
    kind: "400 levels",
    board: <ArrowPuzzleBoard />,
    text: (
      <>
        A <strong>planning puzzle</strong>. Each line slides off the board in the direction it
        points — but only if nothing is in the way. Find the order that clears the whole grid
        without a single collision.
      </>
    ),
    rules: [
      "A collision costs one life and resets the board",
      "Order matters more than speed: no timers anywhere",
      "The hint reveals which line to pull next",
    ],
  },
  {
    accent: "#FF7B7B",
    name: "Color Minesweeper",
    kind: "400 levels",
    board: <ColorMinesweeperBoard />,
    text: (
      <>
        Minesweeper rebuilt around <strong>pure deduction</strong>. There is exactly one bomb
        per row, one per column and one per colour — so there is always a logical path to the
        answer and never a guess.
      </>
    ),
    rules: [
      "Tap to mark a cell safe, double tap to flag a bomb",
      "Every level was brute-forced to guarantee a unique solution",
      "A wrong flag costs a life; three lives per attempt",
    ],
  },
  {
    accent: "#FFD35C",
    name: "Break Infinite Blocks",
    kind: "Endless mode",
    board: <BreakBlocksBoard />,
    text: (
      <>
        The endless one. Drag pieces from an arsenal of <strong>40 shapes</strong> onto an 8×8
        board; complete rows and columns to clear them. Chain clears across consecutive drops
        and the multiplier climbs.
      </>
    ),
    rules: [
      "Combo ladder: x1 → x5 → x10 → x50 → x100 → x200",
      "Line preview shows what a drop is about to break",
      "Every batch of 3 pieces guarantees at least one playable",
      "One rewarded second chance per run; all-time and daily records saved",
    ],
  },
];

/* ═══════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════ */

export default function MindFlow() {
  return (
    <div
      className="pp-page"
      style={{ "--pp-color": "#6C9BFF", "--pp-glow": "rgba(108, 155, 255, 0.22)" } as React.CSSProperties}
    >
      <header className="pp-hero">
        <img src={mfLogo} alt="MINDFLOW" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Live on Google Play · Android Game · Solo project</span>
          <h1 className="pp-title">MINDFLOW — Brain Puzzle Games</h1>
          <p className="pp-subtitle">
            My <strong>first published mobile game</strong>: four logic puzzle modes in one
            offline, completely silent Android app built with{" "}
            <strong>React Native and TypeScript</strong>. Over 1,200 generated and
            solution-verified levels, bilingual, ad-supported — designed, built, tested and
            shipped to the Play Store end to end.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">React Native</span>
            <span className="pp-tag">TypeScript</span>
            <span className="pp-tag">Redux Toolkit</span>
            <span className="pp-tag">Android</span>
            <span className="pp-tag">AdMob</span>
            <span className="pp-tag">Offline-first</span>
            <span className="pp-tag">i18n</span>
            <span className="pp-tag">Published</span>
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              Download on Google Play ↗
            </a>
            <a className="pp-btn-secondary" href="#modes">See the game modes</a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        {/* ── AT A GLANCE ───────────────────────── */}
        <div className="pp-section">
          <h2 className="pp-section-title">At a Glance</h2>
          <div className="mf-stats">
            <div className="mf-stat">
              <span className="mf-stat-value">4</span>
              <span className="mf-stat-label">Game modes</span>
            </div>
            <div className="mf-stat">
              <span className="mf-stat-value">1,200</span>
              <span className="mf-stat-label">Verified levels</span>
            </div>
            <div className="mf-stat">
              <span className="mf-stat-value">100%</span>
              <span className="mf-stat-label">Offline play</span>
            </div>
            <div className="mf-stat">
              <span className="mf-stat-value">ES / EN</span>
              <span className="mf-stat-label">Full localisation</span>
            </div>
          </div>
          <div className="pp-gallery c1">
            <img src={mfFeature} alt="MINDFLOW — Train your mind, rest your head" />
          </div>
        </div>

        {/* ── WHY ───────────────────────────────── */}
        <div className="pp-section">
          <h2 className="pp-section-title">Why I Built It</h2>
          <p className="pp-text">
            Almost every puzzle game I opened was doing the opposite of what I wanted from one.
            Loud loops, countdown timers, a login screen, an energy bar, a connection
            requirement. Games that ask for your attention rather than give you somewhere to
            rest it.
          </p>
          <p className="pp-text">
            <strong>MINDFLOW is the version I wanted to exist</strong>: no audio at all, no
            timers, no account, no internet needed. Just a board and a problem that has a real
            solution. The whole app is built around roughly{" "}
            <strong>30 calm minutes a day</strong> — enough to train focus and logical
            reasoning without turning into another thing pulling at you. Its tagline is exactly
            that idea: <em>train your mind, rest your head</em>.
          </p>
          <p className="pp-text">
            The other half of the reason was personal. I wanted to take one project all the way
            through the parts of shipping that a portfolio repo never teaches you: store
            policies, a privacy policy and terms that actually resolve, GDPR ad consent,
            release signing, a closed test with real testers, crash monitoring, and a Play
            Console review. <strong>This is the first app I have published</strong>, and going
            from an empty React Native project to a live listing taught me more than the code
            itself did.
          </p>
        </div>

        {/* ── MODES ─────────────────────────────── */}
        <div className="pp-section" id="modes">
          <h2 className="pp-section-title">Four Games, One App</h2>
          <p className="pp-text">
            Three level-based logic modes and one endless score mode. Each has its own rules,
            its own board renderer and its own independent progress, lives and hints — so
            getting stuck in one never blocks the others.
          </p>
          <div className="mf-modes">
            {MODES.map((m, i) => (
              <article
                key={m.name}
                className="mf-mode"
                style={{ "--mf-accent": m.accent } as React.CSSProperties}
              >
                <div className="mf-mode-head">
                  <span className="mf-mode-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mf-mode-name">{m.name}</h3>
                  <span className="mf-mode-kind">{m.kind}</span>
                </div>
                {m.board}
                <p className="mf-mode-text">{m.text}</p>
                <ul className="mf-mode-rules">
                  {m.rules.map(r => <li key={r}>{r}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mf-note">
            <strong>Note:</strong> the four boards above are illustrative diagrams I drew to
            explain each mode's rules — they are not screenshots of the final game. For the real
            in-game visuals, see the{" "}
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              Google Play listing
            </a>.
          </p>
        </div>

        {/* ── LEVELS ────────────────────────────── */}
        <div className="pp-section">
          <h2 className="pp-section-title">Levels, Lives &amp; Progression</h2>
          <p className="pp-text">
            Each of the three level-based modes ships <strong>400 levels</strong> —{" "}
            <strong>1,200 in total</strong>. They are not hand-drawn one by one: they are
            generated by scripts and then <strong>verified by brute force</strong>, so every
            Path Painter level has a valid single-stroke solution and every Color Minesweeper
            board has exactly one solution. That verified solution is what the hint system
            reads from, which means a hint can never point somewhere wrong.
          </p>
          <ul className="pp-features">
            <li><strong>Levels 1–2 of each mode</strong> are guided tutorials, with a six-card interactive walkthrough on first launch (skippable, replayable from Settings)</li>
            <li><strong>3 lives</strong> and <strong>3 hint stars</strong> per mode, tracked independently</li>
            <li>Extra hints can be earned by watching a rewarded video — always the player's choice, never forced</li>
            <li>Progress, stars and records are saved automatically and survive offline</li>
            <li>A wellbeing tracker records daily streak, time played and levels cleared per day</li>
          </ul>
          <p className="pp-text" style={{ marginTop: "1.4rem" }}>
            Monetisation is deliberately back-loaded: the early levels are completely ad-free,
            and the interstitial cadence only tightens as the player goes deeper.
          </p>
          <div className="mf-table-wrap">
            <table className="mf-table">
              <thead>
                <tr>
                  <th>Levels</th>
                  <th>Interstitial cadence</th>
                  <th>Intent</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1 – 10</td><td>None</td><td>Let the player fall in first</td></tr>
                <tr><td>11 – 30</td><td>Every 5 levels</td><td>Introduce ads gently</td></tr>
                <tr><td>31 – 60</td><td>Every 3 levels</td><td>Engaged player</td></tr>
                <tr><td>61 – 130</td><td>Every 2 levels</td><td>Committed player</td></tr>
                <tr><td>131 +</td><td>Every level</td><td>Deep-run monetisation</td></tr>
              </tbody>
            </table>
          </div>
          <p className="pp-text" style={{ marginTop: "1.1rem" }}>
            Offline, the counter is stored and the pending ad is only shown once the device
            reconnects — the game never blocks on a network it does not have.
          </p>
        </div>

        {/* ── ENGINEERING ───────────────────────── */}
        <div className="pp-section">
          <h2 className="pp-section-title">Architecture &amp; Engineering Notes</h2>
          <p className="pp-text">
            The rule I held to throughout: <strong>game logic never lives in a component</strong>.
            Board state, line-clearing, combo maths and level validation are pure TypeScript
            modules with unit tests; the React Native components only render and handle gestures.
          </p>
          <ul className="pp-features">
            <li><strong>State:</strong> Redux Toolkit slices per domain — game, settings, progress, endless mode</li>
            <li><strong>Persistence:</strong> everything through a single <code>StorageService</code> over AsyncStorage, with a deliberately small interface so it can move to SQLite without touching the app</li>
            <li><strong>Rendering:</strong> custom lightweight UI instead of a component library — full control of the minimal style and far fewer native dependencies</li>
            <li><strong>Performance:</strong> the 8×8 board is memoised and the dragged piece moves via <code>Animated.setValue</code>, so dragging never triggers a re-render per frame</li>
            <li><strong>Feedback without sound:</strong> a <code>HapticService</code> carries the whole feedback channel — success, error, combo, game over</li>
            <li><strong>Ads:</strong> <code>AdService</code> loads the SDK defensively (if the module is missing the game simply runs ad-free) and Google UMP consent is requested before initialising</li>
            <li><strong>Theming:</strong> light, dark and system, following the device appearance live</li>
            <li><strong>i18n:</strong> full Spanish and English via i18next, switchable in Settings</li>
          </ul>
          <div className="pp-tech-grid">
            {["React Native 0.73", "TypeScript", "Redux Toolkit", "React Navigation", "react-native-svg", "i18next", "AsyncStorage", "Google Mobile Ads", "Google UMP", "Firebase Crashlytics", "Jest", "Gradle / AAB"].map(t => (
              <span key={t} className="pp-tech-badge">{t}</span>
            ))}
          </div>
        </div>

        {/* ── SHIPPING ──────────────────────────── */}
        <div className="pp-section">
          <h2 className="pp-section-title">From Closed Test to Production</h2>
          <p className="pp-text">
            Google Play now requires a 14-day closed test before a new personal developer
            account can publish. I ran it as a product loop rather than a formality: every
            piece of feedback became a tracked change, shipped in a new build and re-verified
            before applying for production access.
          </p>
          <ol className="pp-steps">
            <li>
              <strong>Zero crashes, zero functional bugs</strong> reported across the tested
              devices and Android versions. The feedback was all about onboarding, presentation
              and personalisation.
            </li>
            <li>
              <strong>Five shipped changes:</strong> a System theme option that follows the
              device live · an interactive six-card walkthrough on first launch · a "Rate this
              app" entry point using the native in-app review sheet · an ASO rewrite of the
              title, short and full descriptions in both languages · new store screenshots
              built around one game mode per shot.
            </li>
            <li>
              <strong>Compliance in place before release:</strong> published privacy policy and
              terms, UMP ad-consent flow with a user-accessible "manage consent" option, and
              Crashlytics wired for post-release monitoring.
            </li>
          </ol>
          <p className="pp-text" style={{ marginTop: "1.2rem" }}>
            The app went out as a signed <strong>Android App Bundle</strong> and is now on
            version <strong>1.1.1</strong>, with post-release fixes driven by real Crashlytics
            reports rather than guesses.
          </p>
        </div>

        {/* ── DOWNLOAD ──────────────────────────── */}
        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">Download &amp; Availability</h2>
          <p className="pp-text">
            MINDFLOW is <strong>published and free on the Google Play Store</strong>, worldwide,
            for Android. No account, no sign-up and no internet connection required to play.
          </p>
          <div className="mf-store">
            <img src={mfLogo} alt="MINDFLOW icon" className="mf-store-icon" />
            <div className="mf-store-meta">
              <strong>MINDFLOW: Brain Puzzle Games</strong>
              <span>com.pvilar.mindflow · v1.1.1 · Free · Android</span>
            </div>
            <a className="pp-btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              Get it on Google Play ↗
            </a>
          </div>
          <div className="pp-contact-box" style={{ marginTop: "1.4rem" }}>
            <p>
              Store listing:{" "}
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

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
