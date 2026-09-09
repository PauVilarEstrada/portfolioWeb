import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/nbavision.css";

import nbaLogo from "./assets/logosApps/nbavisionlogo.png";
import shotHero from "./assets/nbavision/hero.webp";
import shotInside from "./assets/nbavision/whats-inside.webp";
import shotPlayer from "./assets/nbavision/player-overview.webp";
import shotScouting from "./assets/nbavision/scouting-ai.webp";
import shotAssistant from "./assets/nbavision/assistant.webp";
import shotStandings from "./assets/nbavision/season-standings.webp";
import shotAwards from "./assets/nbavision/award-races.webp";
import shotPredictPlayer from "./assets/nbavision/predict-player.webp";
import shotPredictTeam from "./assets/nbavision/predict-team.webp";
import shotSimulate from "./assets/nbavision/simulate.webp";
import shotSimulatePbp from "./assets/nbavision/simulate-pbp.webp";
import shotBuilder from "./assets/nbavision/builder.webp";
import shotLeague from "./assets/nbavision/league-sim.webp";
import shotCompare from "./assets/nbavision/compare.webp";
import shotTeam from "./assets/nbavision/team-page.webp";
import shotRookies from "./assets/nbavision/rookies.webp";
import shotH2H from "./assets/nbavision/head-to-head.webp";
import shotEs from "./assets/nbavision/bilingual-es.webp";

const LIVE_URL = "https://nba-woat.vercel.app/";
const REPO_URL = "https://github.com/PauVilarEstrada/NBA";

const GLANCE = [
  { value: "14", label: "Routes" },
  { value: "4", label: "Models" },
  { value: "124", label: "Players indexed" },
  { value: "1,230", label: "Games simulated" },
  { value: "2", label: "Languages" },
  { value: "0", label: "Setup steps" },
];

const ROUTES = [
  { path: "/players", what: "Index and a seven-tab player profile: overview, Scouting AI, shooting, advanced, splits, game log, career and honours." },
  { path: "/season", what: "Both conference tables with the play-in picture, fourteen leaderboards, and scored MVP / DPOY / ROY / MIP / 6MOY races." },
  { path: "/league", what: "Simulates all 1,230 games, then the play-in, the bracket and the Finals — with a franchise you invent replacing a real team." },
  { path: "/rookies", what: "The current draft class: draft board with pick, school and country, plus a scored Rookie of the Year race." },
  { path: "/compare", what: "Two to four players scored category by category, with percentile bars, radar overlay and both trophy cases." },
  { path: "/teams", what: "Roster, team stats, matchup defence by position, arena & gate, cap sheet against the tax line, and franchise history." },
  { path: "/head-to-head", what: "Every meeting between a player and one opponent, home and away plotted separately." },
  { path: "/predict/player", what: "Points / rebounds / assists / threes against a chosen defence, with an 80% interval and an over/under." },
  { path: "/predict/team", what: "Score, spread, total and win probability — playoffs switch to a different model and add an exact best-of-seven probability." },
  { path: "/simulate", what: "Two real teams, possession by possession. Rule a player out and watch minutes redistribute, then replay the game." },
  { path: "/builder", what: "A budget, the league priced at market value, and your roster playing a real NBA team at 1 second per game minute." },
];

const MODELS = [
  {
    n: "01",
    title: "Player projection — gradient-boosted quantile regression",
    body: "For each target (points, rebounds, assists, minutes, threes) one XGBoost mean model plus seven quantile models at 0.05 → 0.95. Quantile heads rather than “mean ± k·σ” because dispersion is conditional: a bench guard on a minutes leash and a 38-minute star at foul-trouble risk have completely different shapes. Box scores are visibly non-Gaussian — points are right-skewed, minutes are bimodal because of blowouts — so assuming normal residuals would systematically misprice the tails.",
    tags: ["XGBoost", "Quantile regression", "80% intervals"],
  },
  {
    n: "02",
    title: "Sequence head — LSTM / Transformer",
    body: "A rolling average is a lossy summary: a player trending up over four games and a player oscillating around the same mean have identical ten-game averages and different next-game distributions. A 2-layer LSTM (or a causal Transformer encoder on larger histories) reads the last 25 games and emits monotone quantiles by construction, trained with the pinball loss — so the deep head speaks the same language as the XGBoost heads and the two are fused in quantile space.",
    tags: ["PyTorch", "LSTM", "Pinball loss"],
  },
  {
    n: "03",
    title: "Team model — Elo + four factors + learned correction",
    body: "Elo with a margin-of-victory multiplier gives a calibrated prior; expected possessions come from both teams' pace, points from the offence-vs-defence rating clash, plus home advantage (≈2.4 pts post-2020) and rest adjustments; an XGBoost model then corrects the residual. Playoffs get separate trained artefacts — pace ×0.972, defensive rating −2.1, home advantage 3.1, star usage +6%, variance ×0.92 — and the best-of-seven probability is computed exactly by enumerating all 2⁷ paths under the 2-2-1-1-1 split.",
    tags: ["Elo", "Four factors", "XGBoost residual"],
  },
  {
    n: "04",
    title: "Game simulator — possession-level Monte Carlo",
    body: "Rather than sampling a final score it plays the game: alternating possessions, a shooter drawn from live usage weights, the shot resolved against the defence's efficiency profile, offensive rebounds keeping the possession alive (second-chance points are ~12% of NBA scoring), fatigue accumulating with minutes. That buys a live box score that adds up to the final score by construction, play-by-play text with real actors, and clock-accurate events — which is what makes the one-second-per-game-minute replay possible.",
    tags: ["Monte Carlo", "Web Worker", "Calibrated to 226 PPG"],
  },
];

const SOURCES = [
  ["stats.nba.com (via nba_api)", "Official and advanced stats", "Async provider + batch ingest, ~0.6 req/s behind a token bucket"],
  ["Basketball-Reference", "Historical & advanced metrics — PER, TS%, WS, BPM, VORP", "3.2 s between requests, single worker, comment-embedded tables parsed"],
  ["Spotrac / HoopsHype", "Contracts, cap hits, options", "Scraped daily by the offline worker, never from a request"],
  ["RealGM", "Trades and transactions", "Most complete free transaction tracker"],
  ["NBA.com/draft", "Draft and rookie class", "drafthistory endpoint + BRef draft history"],
  ["SportsDataIO / Sportradar", "Structured JSON alternative", "Optional: set a key and the ingest job switches over transparently"],
  ["cdn.nba.com", "Headshots and team logos", "Hotlinkable; falls back to an initials tile on the team colour"],
];

const TECH = [
  "React 18", "TypeScript", "Vite", "TailwindCSS", "Recharts", "Zustand", "Framer Motion",
  "Web Workers", "FastAPI", "Python", "PostgreSQL", "Redis", "SQLAlchemy + Alembic",
  "XGBoost", "scikit-learn", "PyTorch", "pandas / NumPy", "nba_api", "Docker", "Vercel",
];

export default function NBAVision() {
  return (
    <div
      className="pp-page nba-page"
      style={{ "--pp-color": "#ef4444", "--pp-glow": "rgba(239, 68, 68, 0.2)" } as React.CSSProperties}
    >
      <header className="pp-hero">
        <img src={nbaLogo} alt="NBA Vision" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Full-Stack Sports Analytics · ML &amp; Simulation</span>
          <h1 className="pp-title">NBA Vision</h1>
          <p className="pp-subtitle">
            A full-stack <strong>NBA analytics, projection and simulation lab</strong>. Search and compare
            players and teams, project a player's line against a specific defence, forecast a full game,
            and build a roster under a budget to play a real NBA team with a{" "}
            <strong>possession-level simulator</strong> and a live timelapse replay — in{" "}
            <strong>English and Castellano</strong>.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">React + TypeScript</span>
            <span className="pp-tag">FastAPI</span>
            <span className="pp-tag">XGBoost</span>
            <span className="pp-tag">Quantile Regression</span>
            <span className="pp-tag">Monte Carlo</span>
            <span className="pp-tag">PostgreSQL</span>
            <span className="pp-tag">Bilingual</span>
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
              Visit the live site ↗
            </a>
            <a className="pp-btn-secondary" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              Source on GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        {/* AT A GLANCE */}
        <div className="pp-section">
          <div className="nba-stats">
            {GLANCE.map(s => (
              <div key={s.label} className="nba-stat">
                <span className="nba-stat-value">{s.value}</span>
                <span className="nba-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="pp-section">
          <h2 className="pp-section-title">What it is</h2>
          <p className="pp-text">
            NBA Vision answers the questions a fan actually asks — <em>is he any good, how does he score,
            what will he do tonight, who wins this game, could my team beat theirs</em> — and answers each of
            them with a number, the uncertainty around that number, and the reasoning that produced it.
          </p>
          <p className="pp-text">
            It runs with <strong>zero setup</strong>. <code>cd frontend &amp;&amp; npm install &amp;&amp; npm run dev</code>{" "}
            gives you the whole site against a built-in demo league of 124 players across all 30 teams and a
            calibrated baseline model. Add the backend and it swaps to live stats.nba.com data, PostgreSQL
            caching and trained models — <strong>the API contract is identical, so nothing in the UI changes</strong>.
          </p>
          <div className="pp-gallery c1">
            <img src={shotHero} alt="NBA Vision home page" loading="lazy" />
          </div>
          <div className="pp-gallery c1">
            <img src={shotInside} alt="Overview of every section of the site" loading="lazy" />
          </div>
        </div>

        {/* THE SECTIONS */}
        <div className="pp-section">
          <h2 className="pp-section-title">Eleven sections, one season</h2>
          <p className="pp-text">
            Everything on the site describes one season — currently <strong>2025-26</strong> — named in the
            header chip and on every profile, so no page has to caveat itself.
          </p>
          <div className="nba-routes">
            {ROUTES.map(r => (
              <div key={r.path} className="nba-route">
                <code className="nba-route-path">{r.path}</code>
                <p className="nba-route-what">{r.what}</p>
              </div>
            ))}
          </div>
          <div className="pp-gallery c2">
            <img src={shotStandings} alt="Season standings and play-in picture" loading="lazy" />
            <img src={shotTeam} alt="Team page with roster and cap sheet" loading="lazy" />
            <img src={shotRookies} alt="Rookie class and Rookie of the Year race" loading="lazy" />
            <img src={shotH2H} alt="Head-to-head history split by venue" loading="lazy" />
          </div>
        </div>

        {/* PLAYER PAGES */}
        <div className="pp-section">
          <h2 className="pp-section-title">Player pages — from the box score to the percentile</h2>
          <p className="pp-text">
            Every player gets a seven-tab profile. The overview plots the game log against his season mean and
            renders a skill radar; <strong>Scouting AI</strong> finds statistically similar players by weighted
            nearest-neighbour search over a twelve-axis percentile vector, labels an archetype, writes a
            scouting report and shows all eighteen tracked percentiles.
          </p>
          <p className="pp-text">
            The report is <strong>rule-based on purpose</strong>. A k-means label of “cluster 4” explains
            nothing; a threshold that fires <em>“Rim protector — anchors the paint on both glass and
            shot-blocking”</em> explains itself. Every sentence is triggered by a percentile threshold, so
            nothing in it is invented prose.
          </p>
          <div className="pp-gallery c2">
            <img src={shotPlayer} alt="Player overview tab" loading="lazy" />
            <img src={shotScouting} alt="Scouting AI tab" loading="lazy" />
          </div>
          <div className="pp-gallery c1">
            <img src={shotCompare} alt="Comparing players category by category" loading="lazy" />
          </div>
        </div>

        {/* THE ASSISTANT */}
        <div className="pp-section nba-highlight">
          <h2 className="pp-section-title">The assistant: AI that cannot contradict the page</h2>
          <p className="pp-text">
            Player and team pages carry a floating assistant that answers questions about <em>that</em> player
            or <em>that</em> team — its numbers, and what to make of them — in either language. Ask it about
            anybody else and it says so, and links you to the right page.
          </p>
          <p className="pp-text">
            It runs <strong>entirely in the browser</strong>: no model, no API key, no network call. Answers
            are composed by rules from the same objects the charts read, so the panel{" "}
            <strong>cannot contradict the page it sits on</strong>, and it works offline. Suggestion chips make
            it usable without typing, and it says plainly when it did not understand rather than guessing.
          </p>
          <ul className="pp-features">
            <li>Grounded by construction — same data objects as the charts, so no hallucinated numbers</li>
            <li>Zero inference cost and zero latency: nothing leaves the browser</li>
            <li>Refuses anything outside the open page instead of improvising</li>
            <li>Bilingual: the same answer is generated from language-free tokens in EN or ES</li>
          </ul>
          <div className="pp-gallery c1">
            <img src={shotAssistant} alt="The in-page assistant answering about a player" loading="lazy" />
          </div>
        </div>

        {/* THE MODELS */}
        <div className="pp-section">
          <h2 className="pp-section-title">How the AI works — four separable models</h2>
          <p className="pp-text">
            Four models, kept separable so each can be inspected, replaced or disabled on its own.
          </p>
          <div className="nba-models">
            {MODELS.map(m => (
              <article key={m.n} className="nba-model">
                <span className="nba-model-n">{m.n}</span>
                <h3 className="nba-model-title">{m.title}</h3>
                <p className="nba-model-body">{m.body}</p>
                <div className="nba-model-tags">
                  {m.tags.map(t => <span key={t} className="pp-tech-badge">{t}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="pp-gallery c2">
            <img src={shotPredictPlayer} alt="Player projection with an 80% interval" loading="lazy" />
            <img src={shotPredictTeam} alt="Game forecast with spread, total and win probability" loading="lazy" />
          </div>
        </div>

        {/* NO LEAKAGE */}
        <div className="pp-section nba-callout">
          <h2 className="pp-section-title">The one rule that matters: no leakage</h2>
          <p className="pp-text">
            <strong>Every feature must be computable strictly before tip-off.</strong> Rolling windows are
            shifted by one game, opponent ratings are as of the day before, and the feature store is built by
            walking each player's games in chronological order, writing the features from games{" "}
            <code>0..i-1</code> with game <code>i</code>'s box score as the label. Any other ordering produces
            a model that looks brilliant offline and is worthless live.
          </p>
          <p className="pp-text">
            Validation uses <code>GroupKFold</code> grouped by season, so games from the same week never land
            in both folds — and every run reports its cross-validated MAE <em>next to</em> the MAE of simply
            predicting the player's last-ten average. <strong>A model that does not beat that baseline is not a
            model, it is a slower average</strong>, and it does not get promoted. Every served prediction is
            written to a <code>prediction_log</code> with its inputs and outputs so it can be scored against
            reality once the game is played.
          </p>
        </div>

        {/* SIMULATION */}
        <div className="pp-section">
          <h2 className="pp-section-title">Simulation — play the game, don't sample the score</h2>
          <p className="pp-text">
            The game simulator resolves real possessions, so the play-by-play has real actors and the box score
            adds up to the final score by construction. Rule any player out for injury and his minutes
            redistribute, the team ratings move and the forecast changes. A 200-run confidence sweep runs in a{" "}
            <strong>Web Worker</strong>, so the pre-game screen keeps animating at 60fps while it computes.
          </p>
          <p className="pp-text">
            Above a single game the granularity changes: a full 82-game season for 30 teams is resolved from
            the ratings model plus a seeded normal draw, which finishes 1,230 games in milliseconds and still
            reproduces the right league-wide totals — the simulated average total lands within a point of the
            real 226.
          </p>
          <div className="pp-gallery c2">
            <img src={shotSimulate} alt="Simulated game result and box score" loading="lazy" />
            <img src={shotSimulatePbp} alt="Possession-level play-by-play" loading="lazy" />
            <img src={shotLeague} alt="Full season simulation with a custom franchise" loading="lazy" />
            <img src={shotAwards} alt="Award races with every component shown" loading="lazy" />
          </div>
        </div>

        {/* BUILDER + MARKET VALUE */}
        <div className="pp-section">
          <h2 className="pp-section-title">The builder — and why cap hit is the wrong price</h2>
          <p className="pp-text">
            Cap hit is what a player <em>is paid</em>; market value is what he is <em>worth</em>. They diverge
            constantly — rookie-scale stars are the largest surplus in the sport — so a fantasy budget priced
            off cap hit alone would sell a 22-year-old franchise centre for pocket change. Prices blend both,
            with production scored on an exponent that reflects how much faster superstar pay rises than
            superstar production, an age curve peaking at 26-28, and true shooting counted{" "}
            <em>relative to league average</em>.
          </p>
          <p className="pp-text">
            Prices are then rescaled so the most expensive player always costs about 38% of whatever budget you
            pick — a $10M team and a $50M team face the same shape of decision.
          </p>
          <div className="pp-gallery c1">
            <img src={shotBuilder} alt="Team builder with market-value pricing" loading="lazy" />
          </div>
        </div>

        {/* DATA */}
        <div className="pp-section">
          <h2 className="pp-section-title">Where the data comes from</h2>
          <p className="pp-text">
            Everything that scrapes runs in an <strong>offline worker</strong>, never in a request handler,
            behind per-source rate limits and a tiered read-through cache — a week for the player index, twelve
            hours for season splits, a day for contracts, sixty seconds for anything live.
          </p>
          <div className="nba-table-wrap">
            <table className="nba-table">
              <thead>
                <tr><th>Source</th><th>What it provides</th><th>How it is used</th></tr>
              </thead>
              <tbody>
                {SOURCES.map(([a, b, c]) => (
                  <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pp-text">
            <strong>Why a backend proxy is not optional:</strong> stats.nba.com sends no CORS header, so a
            browser can never call it directly. It also fingerprints clients — without the exact
            Referer / Origin / token header set it returns an empty 200 or hangs — and rate-limits hard enough
            to ban a datacentre IP within minutes. The API process is the only thing that talks to it.
          </p>
        </div>

        {/* ARCHITECTURE */}
        <div className="pp-section">
          <h2 className="pp-section-title">Architecture — two runtimes, one contract</h2>
          <ol className="pp-steps">
            <li>
              <strong>Ingest worker (offline, rate-limited):</strong> teams → players → games → advanced
              metrics → contracts → feature store, on a nightly schedule.
            </li>
            <li>
              <strong>PostgreSQL:</strong> normalised entities, a point-in-time-correct feature store, a model
              registry and a prediction log. Training reads only the feature store, which is what makes the
              “no leakage” guarantee auditable instead of aspirational.
            </li>
            <li>
              <strong>Trainer:</strong> writes artefacts plus a row with its metrics and feature list, inactive
              by default. Promotion is deliberate and gated on beating the incumbent; a partial unique index
              enforces at most one active model per name and season type.
            </li>
            <li>
              <strong>FastAPI:</strong> read-through cache with per-key locks (a cold key is fetched once, not
              once per concurrent request) and the model registry in front of the trained artefacts.
            </li>
            <li>
              <strong>React frontend:</strong> one module knows whether a backend exists. Unset the API URL and
              it runs a TypeScript port of the baseline model and simulator against a bundled seeded league;
              set it and it calls FastAPI. Both return identical shapes.
            </li>
          </ol>
          <p className="pp-text">
            That is what lets the site be a finished, demoable product before a single model has been trained —
            and it is why “swap in the real model” is a config change, not a refactor.
          </p>
        </div>

        {/* BILINGUAL */}
        <div className="pp-section">
          <h2 className="pp-section-title">Bilingual by construction</h2>
          <p className="pp-text">
            The site is fully bilingual — English and Castellano — switched from the header. The language
            changes the copy, the number and currency formats (<code>113,5</code> and <code>55,2 M$</code> in
            Spanish), dates, ordinals, and <em>the sentences the models generate</em>: the play-by-play
            re-narrates itself, and the scouting reports, award components and loader stages are all written at
            render time from language-free tokens.
          </p>
          <p className="pp-text">
            Completeness is enforced by the compiler rather than by review: the Spanish dictionary is{" "}
            <strong>typed against the English one</strong>, so a missing or misspelt key fails the build.
          </p>
          <div className="pp-gallery c1">
            <img src={shotEs} alt="The same player page in Spanish" loading="lazy" />
          </div>
        </div>

        {/* HONESTY RULES */}
        <div className="pp-section">
          <h2 className="pp-section-title">The honesty rules this project follows</h2>
          <ul className="pp-features">
            <li><strong>No projection ships without its uncertainty</strong> — every forecast carries an interval and an over/under built from predicted quantiles, never a bare point estimate</li>
            <li><strong>Every mocked number is labelled</strong> — with no trained artefact loaded the response is tagged as mock and the UI renders a visible badge</li>
            <li><strong>Colour never carries meaning alone</strong> — legend, direct labels and a table view on every chart; the palette was validated for colour-vision deficiency on both surfaces</li>
            <li><strong>No dual-axis charts</strong> — two measures on different scales get two charts</li>
            <li><strong>Deterministic output</strong> — projections and simulations are seeded, so the same question always gives the same answer</li>
            <li><strong>Nothing blocks the main thread</strong> — simulations run in a Web Worker; every async surface has a loading state and a render error shows a readable panel, never a blank page</li>
            <li><strong>Reconstructed metrics say so</strong> — in demo mode advanced metrics are calibrated approximations, rosters are the top of each rotation, and attendance is modelled; every panel that shows them says it</li>
          </ul>
        </div>

        {/* TECH */}
        <div className="pp-section">
          <h2 className="pp-section-title">Tech stack</h2>
          <div className="pp-tech-grid">
            {TECH.map(t => <span key={t} className="pp-tech-badge">{t}</span>)}
          </div>
        </div>

        {/* LINKS */}
        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">See it for yourself</h2>
          <p className="pp-text">
            The site is deployed and open source. Everything above runs in the browser against the bundled demo
            league — no backend, no API key, no sign-up.
          </p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
              nba-woat.vercel.app ↗
            </a>
            <a className="pp-btn-secondary" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              github.com/PauVilarEstrada/NBA ↗
            </a>
          </div>
          <p className="pp-text nba-disclaimer">
            NBA Vision is a portfolio project. It is not affiliated with or endorsed by the NBA. Imagery © NBA,
            served from cdn.nba.com.
          </p>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
