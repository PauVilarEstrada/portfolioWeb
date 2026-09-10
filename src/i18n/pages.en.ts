export const pagesEn = {
  common: {
    back: "Back to Projects",
    repo: "Source on GitHub ↗",
    live: "Open the live site ↗",
    tech: "Tech stack",
  },

  pacman: {
    label: "Java Game · Object-Oriented Design",
    title: "Pacman Remake",
    subtitle:
      "The 1980 arcade classic rebuilt from scratch in **Java** — same rules, modern shell: selectable characters, **custom maps loaded from files**, ghost AI that gets meaner as your score climbs, and a clean state machine behind the whole thing.",
    tags: ["Java", "OOP", "Game Loop", "Ghost AI", "Custom Levels"],
    ctaHow: "How it works",
    specs: [
      { v: "Java", l: "Language" },
      { v: "OOP", l: "Architecture" },
      { v: "Grid", l: "Tile engine" },
      { v: "4", l: "Ghosts" },
      { v: "∞", l: "Custom maps" },
    ],
    gameTitle: "The game",
    gameP:
      "Clear the board without getting caught. The maze is a grid of tiles, pellets sit on the walkable ones, and four ghosts hunt you from four different directions. Eat a power pellet and the hunt inverts for a few seconds — the part of Pacman that makes it a game about timing rather than reflexes.",
    gameCaption: "The main board — pellets, power pellets, and four ghosts on patrol.",
    menuTitle: "Start here: menu and characters",
    menuKicker: "Main menu",
    menuH: "One screen, everything reachable",
    menuP:
      "Start, choose a character, load a custom map or open the settings — no submenus to get lost in. The menu is its own state in the machine, so the game world is not even instantiated until you press play.",
    charKicker: "Character select",
    charH: "Pick who eats the dots",
    charP:
      "Characters are pure presentation — sprite set and colour — swapped at spawn time. The physics, the hitbox and the speed stay identical, so picking a favourite never changes the difficulty.",
    mapsTitle: "Custom maps — the board is data, not code",
    mapsP:
      "A level is a grid file. The parser reads it into a tile matrix and the renderer draws whatever it finds, which means a new maze is a text file away: draw the walls, drop the pellets, mark the spawn points, play it. The bundled levels are just the first few written that way.",
    mapsKicker: "Custom level",
    mapsH: "Load your own maze",
    mapsP2:
      "Because walls, pellets and spawns are all just tile types, the game validates a map on load — a maze with no pellets or no spawn simply never starts, instead of crashing halfway through the first frame.",
    mapCap1: "A second layout — tighter corridors, fewer escape routes",
    mapCap2: "Level two, built from the same tile vocabulary",
    ghostTitle: "The ghosts are the difficulty curve",
    ghostKicker: "Chase & scatter",
    ghostH: "Four hunters, four angles",
    ghostP1:
      "Each ghost targets a *tile* rather than the player himself — one aims at you, one aims ahead of you, one at the corner you are heading for. Because their targets differ, they naturally pincer instead of forming a queue behind you.",
    ghostP2:
      "They also cycle between chasing and scattering to their home corners, which is what gives the board its rhythm: pressure, breathing room, pressure. As the score climbs, the chase phases lengthen and the scatter phases shrink.",
    howTitle: "How it is built",
    howP:
      "The whole thing is plain Java with a structured object-oriented design — no engine, no framework. Every mechanic below is written by hand, which is exactly why the project was worth building.",
    build: [
      { t: "Entity system", p: "Pacman, the ghosts, the walls and the pellets all extend a base entity that owns a position, a velocity and a render method. Adding a new actor means subclassing it, not editing the loop." },
      { t: "Game loop", p: "A fixed-step loop advances every entity, resolves collisions and redraws the board. Input is queued rather than applied instantly, so a turn buffered just before a junction still registers — that is what makes the controls feel tight." },
      { t: "Map parser", p: "Levels are plain grid files: walls, pellets, power pellets, spawn points. The parser turns a file into a tile matrix, which is why adding a new map needs no code at all." },
      { t: "Collision", p: "AABB checks against the tile grid for walls, and against entity boxes for pellets and ghosts — cheap, deterministic, and immune to the tunnelling you get from raw distance checks." },
      { t: "Ghost AI", p: "Each ghost alternates chase and scatter, targeting a tile rather than the player directly, so the four of them converge from different angles. The chase radius widens as the score climbs." },
      { t: "State machine", p: "Play, pause, level-clear, game-over and restart are explicit states with explicit transitions — no boolean flags scattered through the loop." },
    ],
    extrasTitle: "Everything else the game needs",
    extrasP:
      "The parts nobody notices until they are missing: a pause that actually freezes the simulation rather than hiding it, and settings that apply without a restart.",
    extrasCap1: "Settings — applied live, no restart",
    extrasCap2: "Pause — a real state, so the loop stops advancing",
    playTitle: "Play it",
    playOutro: "The full source — entities, tile parser, ghost AI and all — is on GitHub.",
  },

  flappy: {
    label: "Unity Game · C# / Physics2D",
    title: "Flappy Bird — Improved Clone",
    subtitle:
      "One button, one bird, an endless wall of pipes. Built from scratch in **Unity** with hand-tuned 2D physics, a **pooled procedural obstacle generator** and an **online leaderboard** — the simplest possible game, treated as a real engineering problem in *game feel*.",
    tags: ["Unity", "C#", "Physics2D", "Object Pooling", "Leaderboard"],
    ctaDemo: "Watch it played",
    specs: [
      { v: "Unity", l: "Engine" },
      { v: "C#", l: "Language" },
      { v: "2D", l: "Physics" },
      { v: "∞", l: "Procedural pipes" },
      { v: "Online", l: "Leaderboard" },
    ],
    demoTitle: "See it running",
    demoP:
      "The clip below is the game as it plays: the flap, the pipe cadence, the score ticking over as each gap is cleared, and the run ending the moment a hitbox says it does.",
    demoCaption: "Full gameplay demo — recorded from a live build.",
    demoFallback: "Your browser does not support embedded video.",
    screensTitle: "Three screens, one rule",
    startKicker: "Start",
    startH: "No tutorial, no options wall",
    startP:
      "The bird hovers, the pipes wait, and one tap starts the run. Everything the player needs to know is taught by the first two seconds of play — which is the entire design brief of the original.",
    playKicker: "In play",
    playH: "Every gap is generated, none are unfair",
    playP:
      "Vertical offsets are randomised inside bounds that guarantee a reachable path from the previous gap. Random is easy; *random and always survivable* is the part that took the tuning.",
    overKicker: "Game over",
    overH: "Score, best, and straight back in",
    overP:
      "Death resolves in one frame and the restart path resets the world from a single entry point, so you are flying again before the frustration has time to land.",
    howTitle: "How the loop is built",
    loop: [
      { t: "Gravity and the flap", p: "A Rigidbody2D falls under a tuned gravity scale; a tap replaces the vertical velocity outright instead of adding to it, so every flap has exactly the same height no matter how fast you were already falling. That single decision is what separates a bird that feels controllable from one that feels slippery." },
      { t: "Pipes that never repeat", p: "Obstacles come from a prefab pool with a randomised vertical offset and a fixed horizontal speed. Recycling pipes off-screen rather than instantiating new ones keeps allocation flat, so the frame rate does not degrade as the run gets long." },
      { t: "Scoring by trigger", p: "An invisible trigger zone sits in the gap between each pipe pair. Passing through it increments the counter — no distance maths, no double counting, and it works identically at any speed." },
      { t: "Collision, honestly", p: "OnTriggerEnter2D against a polygon hitbox traced to the sprite rather than a lazy box. A death has to feel fair: if the player can see daylight between the bird and the pipe, they must not die." },
      { t: "Game state", p: "An enum-driven state machine covers ready, playing, paused, dead and restart. The world is reset from a single entry point, which is why a restart never inherits a half-finished animation or a stale score." },
      { t: "The leaderboard", p: "Scores are submitted at death and read back on the menu, so a run is measured against everyone else's rather than against your own last attempt." },
    ],
    hardTitle: "What was actually hard",
    hard: [
      { icon: "🎯", h: "Collisions that feel fair", p: "A rectangular hitbox on a round bird kills you on gaps you visibly cleared. Tracing a polygon collider to the sprite fixed the complaint that the game was cheating." },
      { icon: "⚖️", h: "Difficulty balance", p: "Pipe speed and gap size are two knobs that fight each other. Getting from “trivial” to “impossible” without ever passing through “boring” was iterative tuning, not a formula." },
      { icon: "🔁", h: "Procedural, but fair", p: "A seeded random offset with clamped deltas keeps every layout varied and every layout survivable — no two consecutive gaps further apart than a single flap can cover." },
      { icon: "📉", h: "Keeping the frame rate flat", p: "Pooling and recycling pipes instead of instantiating them means a five-minute run allocates no more than a five-second one." },
    ],
    playTitle: "Play it",
    playOutro: "The full Unity project — scripts, prefabs and scenes — is on GitHub.",
  },

  ecommerce: {
    label: "Full Stack Web Application · React + Node.js",
    title: "E-Commerce Platform",
    subtitle:
      "A complete online shop, front to back: browse a catalogue, fill a cart that survives a reload, sign in securely, and manage the whole inventory from an **admin dashboard** — with **Redis caching** on the hot paths and product imagery served from a CDN.",
    tags: ["React", "Node.js", "MongoDB", "Redis", "Cloudinary", "JWT", "Zustand"],
    ctaLive: "Open the live shop ↗",
    specs: [
      { v: "MERN", l: "Stack" },
      { v: "JWT", l: "Auth" },
      { v: "Redis", l: "Hot-path cache" },
      { v: "CDN", l: "Image delivery" },
      { v: "REST", l: "API" },
    ],
    storefrontTitle: "The storefront",
    storefrontP:
      "The shop opens on featured products — the one query every visitor triggers and almost nobody changes, which is exactly why it is the query that sits in Redis.",
    storefrontCaption: "Landing page — featured products served from cache.",
    flowTitle: "From browsing to checkout",
    catKicker: "Catalogue",
    catH: "Filter first, fetch second",
    catP:
      "Categories and filters are part of the route, so a listing is shareable, back-button friendly, and answered by a targeted query rather than by shipping the whole catalogue to the browser and hiding most of it.",
    cartKicker: "Cart",
    cartH: "Persistent, reconciled, honest",
    cartP:
      "The cart is stored per user and restored on the next visit. Totals are recomputed on the server at checkout time — the client's number is a preview, never the source of truth.",
    authKicker: "Accounts",
    authH: "Sign in without the footguns",
    authP:
      "Passwords are hashed before they touch the database and the session token lives in an http-only cookie. Role is carried in the token, so the admin surface is gated by the API, not merely hidden in the UI.",
    adminTitle: "The admin side",
    adminP:
      "A shop is only half a project without the tooling to run it. The dashboard creates, edits, deletes and features products, uploads their imagery, and reflects every change on the storefront immediately — the cached keys are invalidated on write.",
    adminCaption: "Admin dashboard — inventory management against the same REST API.",
    featuresTitle: "What it does",
    features: [
      { icon: "🔐", t: "Authentication that survives a refresh", p: "Registration and login issue a JWT stored in an http-only cookie rather than local storage, so a reload keeps you signed in and a stray script cannot read the token." },
      { icon: "🛒", t: "A cart that remembers", p: "Cart state lives in Zustand and is persisted per user, so items added on one visit are still there on the next — and quantities reconcile against real stock before checkout." },
      { icon: "🗂️", t: "Browsing that narrows fast", p: "Category routes and filters drive server-side queries instead of filtering a giant client payload, so the listing stays quick as the catalogue grows." },
      { icon: "🖼️", t: "Product images on a CDN", p: "Uploads go to Cloudinary and the database stores only the URL. The API never proxies binaries, and images are served from an edge close to the buyer." },
      { icon: "⚡", t: "Redis on the hot path", p: "The featured-products query is the most requested and least changing thing on the site, so it is cached in Redis (Upstash) and invalidated on write instead of hitting MongoDB on every page load." },
      { icon: "🛠️", t: "A real admin panel", p: "Create, update, delete and feature products from the browser — the same REST API the storefront reads, behind a role check." },
    ],
    archTitle: "How it is put together",
    flow: [
      { t: "Client", p: "React + Vite, styled with Tailwind, animated with Framer Motion. Zustand holds the two pieces of state that cross the whole app — cart and session — so no prop drilling and no context spaghetti." },
      { t: "API", p: "Express exposes a RESTful surface: products, categories, cart, auth, admin. Middleware handles token verification and role checks in one place rather than per route." },
      { t: "Data", p: "MongoDB via Mongoose, hosted on Atlas. Schemas validate before write, so a malformed product never reaches the collection." },
      { t: "Cache", p: "Redis sits in front of the read-heavy endpoints. Writes invalidate the affected keys, which keeps the cache from being the reason a price looks wrong." },
      { t: "Media", p: "Cloudinary stores and transforms product imagery; the app holds URLs only." },
      { t: "Deploy", p: "Deployed on Render against MongoDB Atlas and Upstash — a live, publicly reachable build rather than a localhost demo." },
    ],
    tryTitle: "Try it",
    tryP:
      "The shop is deployed and open source. The free Render instance sleeps when idle, so the first load after a while can take a few seconds to wake up.",
    liveBtn: "Live app ↗",
    demoBtn: "Demo video ↗",
  },
  nba: {
    label: "Full-Stack Sports Analytics · ML & Simulation",
    title: "NBA Vision",
    subtitle:
      "A full-stack **NBA analytics, projection and simulation lab**. Compare players and teams, project a line against a specific defence, forecast a game, and build a roster under a budget to play a real NBA team with a **possession-level simulator** — in English and Castellano.",
    tags: ["React + TypeScript", "FastAPI", "XGBoost", "Quantile Regression", "Monte Carlo", "PostgreSQL", "Bilingual"],
    ctaLive: "Visit the live site ↗",
    glance: [
      { v: "14", l: "Routes" },
      { v: "4", l: "Models" },
      { v: "124", l: "Players indexed" },
      { v: "1,230", l: "Games simulated" },
      { v: "2", l: "Languages" },
      { v: "0", l: "Setup steps" },
    ],
    whatTitle: "What it is",
    whatP1:
      "NBA Vision answers the questions a fan actually asks — *is he any good, what will he do tonight, who wins this game, could my team beat theirs* — and answers each one with a number, the uncertainty around it, and the reasoning that produced it.",
    whatP2:
      "It runs with **zero setup**: install the frontend and you get the whole site against a bundled demo league of 124 players and a calibrated baseline model. Add the backend and it swaps to live stats.nba.com data, PostgreSQL caching and trained models — **the API contract is identical, so nothing in the UI changes**.",
    sectionsTitle: "Eleven sections, one season",
    sectionsP:
      "Everything on the site describes one season — currently **2025-26** — named in the header and on every profile, so no page has to caveat itself.",
    routes: [
      { path: "/players", what: "Index plus a seven-tab profile: overview, Scouting AI, shooting, advanced, splits, game log, career and honours." },
      { path: "/season", what: "Both conference tables with the play-in picture, fourteen leaderboards and scored MVP / DPOY / ROY / MIP / 6MOY races." },
      { path: "/league", what: "Simulates all 1,230 games, the play-in, the bracket and the Finals — with a franchise you invent replacing a real team." },
      { path: "/rookies", what: "The draft class: board with pick, school and country, plus a scored Rookie of the Year race." },
      { path: "/compare", what: "Two to four players scored category by category, with percentile bars, radar overlay and both trophy cases." },
      { path: "/teams", what: "Roster, team stats, matchup defence by position, arena and gate, cap sheet against the tax line, franchise history." },
      { path: "/head-to-head", what: "Every meeting between a player and one opponent, home and away plotted separately." },
      { path: "/predict/player", what: "Points, rebounds, assists and threes against a chosen defence, with an 80% interval and an over/under." },
      { path: "/predict/team", what: "Score, spread, total and win probability — playoffs switch models and add an exact best-of-seven probability." },
      { path: "/simulate", what: "Two real teams, possession by possession. Rule a player out and watch the minutes redistribute, then replay the game." },
      { path: "/builder", what: "A budget, the league priced at market value, and your roster playing a real NBA team at one second per game minute." },
    ],
    playersTitle: "Player pages — from the box score to the percentile",
    playersP1:
      "Every player gets a seven-tab profile. **Scouting AI** finds statistically similar players by weighted nearest-neighbour search over a twelve-axis percentile vector, labels an archetype and writes a scouting report.",
    playersP2:
      "The report is **rule-based on purpose**. A k-means label of “cluster 4” explains nothing; a threshold that fires *“Rim protector — anchors the paint on both glass and shot-blocking”* explains itself. Every sentence is triggered by a percentile threshold, so nothing in it is invented prose.",
    assistantTitle: "The assistant: AI that cannot contradict the page",
    assistantP1:
      "Player and team pages carry a floating assistant that answers questions about *that* player or *that* team, in either language. Ask about anybody else and it says so, and links you to the right page.",
    assistantP2:
      "It runs **entirely in the browser**: no model, no API key, no network call. Answers are composed by rules from the same objects the charts read, so the panel **cannot contradict the page it sits on**, and it works offline.",
    assistantBullets: [
      "Grounded by construction — same data objects as the charts, so no hallucinated numbers",
      "Zero inference cost and zero latency: nothing leaves the browser",
      "Refuses anything outside the open page instead of improvising",
      "Bilingual: the same answer is generated from language-free tokens",
    ],
    modelsTitle: "How the AI works — four separable models",
    modelsP: "Four models, kept separable so each can be inspected, replaced or disabled on its own.",
    models: [
      {
        n: "01",
        title: "Player projection — gradient-boosted quantile regression",
        body: "For each target (points, rebounds, assists, minutes, threes) one XGBoost mean model plus seven quantile models from 0.05 to 0.95. Quantile heads rather than “mean ± k·σ” because dispersion is conditional: a bench guard on a minutes leash and a 38-minute star at foul-trouble risk have completely different shapes. Box scores are visibly non-Gaussian, so assuming normal residuals would systematically misprice the tails.",
        tags: ["XGBoost", "Quantile regression", "80% intervals"],
      },
      {
        n: "02",
        title: "Sequence head — LSTM / Transformer",
        body: "A rolling average is a lossy summary: a player trending up and a player oscillating around the same mean have identical ten-game averages and different next-game distributions. A 2-layer LSTM reads the last 25 games and emits monotone quantiles by construction, trained with the pinball loss — so the deep head speaks the same language as the XGBoost heads and the two fuse in quantile space.",
        tags: ["PyTorch", "LSTM", "Pinball loss"],
      },
      {
        n: "03",
        title: "Team model — Elo + four factors + learned correction",
        body: "Elo with a margin-of-victory multiplier gives a calibrated prior; expected possessions come from both teams' pace, points from the offence-vs-defence clash, plus home advantage and rest. An XGBoost model then corrects the residual. Playoffs get separate artefacts and structural adjustments, and the best-of-seven probability is computed exactly by enumerating all 2⁷ paths.",
        tags: ["Elo", "Four factors", "XGBoost residual"],
      },
      {
        n: "04",
        title: "Game simulator — possession-level Monte Carlo",
        body: "Rather than sampling a final score it plays the game: alternating possessions, a shooter drawn from live usage weights, the shot resolved against the defence, offensive rebounds keeping the possession alive, fatigue accumulating. That buys a live box score that adds up by construction, play-by-play with real actors, and clock-accurate events — which is what makes the one-second-per-game-minute replay possible.",
        tags: ["Monte Carlo", "Web Worker", "Calibrated to 226 PPG"],
      },
    ],
    leakageTitle: "The one rule that matters: no leakage",
    leakageP1:
      "**Every feature must be computable strictly before tip-off.** Rolling windows are shifted by one game, opponent ratings are as of the day before, and the feature store is built by walking each player's games in order, writing features from games `0..i-1` with game `i`'s box score as the label. Any other ordering produces a model that looks brilliant offline and is worthless live.",
    leakageP2:
      "Validation uses `GroupKFold` by season, and every run reports its cross-validated MAE next to the MAE of simply predicting the player's last-ten average. **A model that does not beat that baseline is not a model, it is a slower average**, and it does not get promoted.",
    simTitle: "Simulation — play the game, don't sample the score",
    simP1:
      "The simulator resolves real possessions, so the play-by-play has real actors and the box score adds up by construction. Rule a player out and his minutes redistribute, the ratings move and the forecast changes. A 200-run confidence sweep runs in a **Web Worker**, so the page stays at 60fps while it computes.",
    simP2:
      "Above a single game the granularity changes: a full 82-game season for 30 teams resolves from the ratings model plus a seeded draw, finishing 1,230 games in milliseconds and still landing within a point of the real league-average total.",
    builderTitle: "The builder — and why cap hit is the wrong price",
    builderP1:
      "Cap hit is what a player *is paid*; market value is what he is *worth*. They diverge constantly — rookie-scale stars are the largest surplus in the sport — so a budget priced off cap hit alone would sell a 22-year-old franchise centre for pocket change.",
    builderP2:
      "Prices are rescaled so the most expensive player always costs about 38% of whatever budget you pick — a $10M team and a $50M team face the same shape of decision.",
    dataTitle: "Where the data comes from",
    dataP1:
      "Everything that scrapes runs in an **offline worker**, never in a request handler, behind per-source rate limits and a tiered cache — a week for the player index, twelve hours for season splits, a day for contracts, sixty seconds for anything live.",
    dataHeaders: ["Source", "What it provides", "How it is used"],
    sources: [
      ["stats.nba.com (via nba_api)", "Official and advanced stats", "Async provider plus batch ingest, ~0.6 req/s behind a token bucket"],
      ["Basketball-Reference", "Historical & advanced metrics — PER, TS%, WS, BPM, VORP", "3.2 s between requests, single worker"],
      ["Spotrac / HoopsHype", "Contracts, cap hits, options", "Scraped daily by the offline worker"],
      ["RealGM", "Trades and transactions", "The most complete free transaction tracker"],
      ["NBA.com/draft", "Draft and rookie class", "drafthistory endpoint plus BRef draft history"],
      ["SportsDataIO / Sportradar", "Structured JSON alternative", "Optional: set a key and the ingest job switches over"],
      ["cdn.nba.com", "Headshots and team logos", "Hotlinkable; falls back to an initials tile"],
    ],
    dataP2:
      "**Why a backend proxy is not optional:** stats.nba.com sends no CORS header, so a browser can never call it directly. It fingerprints clients and rate-limits hard enough to ban a datacentre IP within minutes. The API process is the only thing that talks to it.",
    archTitle: "Architecture — two runtimes, one contract",
    archSteps: [
      "**Ingest worker (offline, rate-limited):** teams → players → games → advanced metrics → contracts → feature store, nightly.",
      "**PostgreSQL:** normalised entities, a point-in-time-correct feature store, a model registry and a prediction log. Training reads only the feature store, which makes the “no leakage” guarantee auditable.",
      "**Trainer:** writes artefacts plus their metrics, inactive by default. Promotion is deliberate and gated on beating the incumbent.",
      "**FastAPI:** read-through cache with per-key locks and the model registry in front of the trained artefacts.",
      "**React frontend:** one module knows whether a backend exists. Unset the API URL and it runs a TypeScript port of the baseline model against a bundled league; set it and it calls FastAPI. Identical shapes.",
    ],
    archP:
      "That is what lets the site be a finished, demoable product before a single model has been trained — and why “swap in the real model” is a config change, not a refactor.",
    i18nTitle: "Bilingual by construction",
    i18nP1:
      "The site is fully bilingual. The language changes the copy, the number and currency formats (`113,5` and `55,2 M$` in Spanish), dates, ordinals and *the sentences the models generate*: the play-by-play re-narrates itself, and scouting reports and award components are written at render time from language-free tokens.",
    i18nP2:
      "Completeness is enforced by the compiler rather than by review: the Spanish dictionary is **typed against the English one**, so a missing or misspelt key fails the build.",
    rulesTitle: "The honesty rules this project follows",
    rules: [
      "**No projection ships without its uncertainty** — every forecast carries an interval and an over/under built from predicted quantiles",
      "**Every mocked number is labelled** — with no trained artefact loaded the response is tagged as mock and the UI shows a badge",
      "**Colour never carries meaning alone** — legend, direct labels and a table view on every chart, with a palette validated for colour-vision deficiency",
      "**No dual-axis charts** — two measures on different scales get two charts",
      "**Deterministic output** — projections and simulations are seeded, so the same question always gives the same answer",
      "**Nothing blocks the main thread** — simulations run in a Web Worker; every async surface has a loading state",
      "**Reconstructed metrics say so** — in demo mode advanced metrics are approximations and attendance is modelled; every panel that shows them says it",
    ],
    seeTitle: "See it for yourself",
    seeP:
      "The site is deployed and open source. Everything above runs in the browser against the bundled demo league — no backend, no API key, no sign-up.",
    disclaimer:
      "NBA Vision is a portfolio project. It is not affiliated with or endorsed by the NBA. Imagery © NBA, served from cdn.nba.com.",
  },
  ultimus: {
    label: "Master's Final Project · AI Cybersecurity Platform",
    title: "Ultimus Defensor — BlueSentinel",
    subtitle:
      "An end-to-end **AI-powered cybersecurity platform** combining anomaly detection, MITRE ATT&CK threat classification and an intelligent BlueTeam assistant — built as the final project of a Master's in **Artificial Intelligence & Big Data**.",
    tags: ["AI / ML", "Cybersecurity", "MITRE ATT&CK", "Isolation Forest", "XGBoost", "LLM / RAG", "Python", "Big Data"],
    overviewTitle: "Project overview",
    overviewP1:
      "**Ultimus Defensor** is a cybersecurity platform built for BlueTeam analysts. It joins a **real-time anomaly detection pipeline** to an **AI assistant (BlueSentinel)** that identifies, classifies and explains threats using the MITRE ATT&CK framework.",
    overviewP2:
      "The platform ingests security logs from several sources, detects anomalies with a specialised ensemble, maps what it finds to MITRE ATT&CK techniques, and explains the result through a conversational assistant grounded in a curated corpus of **more than 1,000 cybersecurity documents**.",
    teamTitle: "Team & collaboration",
    teamP:
      "Built as a **five-person group project** for the Master's in AI & Big Data. Each member owned a different part: ML pipeline, RAG system, frontend, data engineering and integration.",
    assistantTitle: "BlueSentinel — the AI BlueTeam assistant",
    assistantP:
      "BlueSentinel is a conversational assistant specialised in cybersecurity, powered by an **LLM with RAG (retrieval-augmented generation)** over a curated corpus of security documents. It works in two modes:",
    assistantModes: [
      "**Consultant mode:** general cybersecurity Q&A — threat explanations, mitigation strategies, MITRE technique detail and BlueTeam best practice.",
      "**Log mode:** paste raw logs, SIEM alerts or a suspicious snippet and get structured analysis back: technique identified (MITRE ID), tactic, how the attack works and the response actions to take.",
    ],
    pipelineTitle: "ML detection pipeline — Isolation Forest → XGBoost",
    pipelineP:
      "The detection system is a **two-stage cascade** that processes real security logs and maps the anomalies it finds to MITRE ATT&CK techniques:",
    pipelineSteps: [
      "**Stage 1 — Isolation Forest ensemble:** five specialised unsupervised models (process, network, file, general, other) flag anomalous behaviour without a single label. Each one focuses on a different data domain.",
      "**Stage 2 — XGBoost classifier:** the anomalous samples are classified into one of **twelve MITRE ATT&CK techniques**, with a confidence score and its technique mapping.",
      "**Output:** structured JSON with the techniques detected, confidence levels, anomaly rates, job IDs and per-source attribution. Exportable as CSV or JSON.",
    ],
    dashboardsTitle: "Dashboards & analytics",
    dashboardsP: "Beyond detection, the platform gives a security team the views it actually works from:",
    dashboards: [
      "Executive view — risk summary and KPIs at a glance",
      "Threat origins — geolocation and source attribution",
      "Attack reports — exportable incident summaries",
      "Model health — per-model performance metrics",
      "MITRE coverage — a heatmap of mapped techniques",
      "Detection queue — real-time log processing status",
    ],
    techTitle: "Key technologies",
    tech: ["Python", "Isolation Forest", "XGBoost", "LLM + RAG", "MITRE ATT&CK", "FastAPI", "React", "TypeScript", "Docker", "Big Data pipelines", "COMISET dataset", "JSON / CSV"],
    availabilityTitle: "Availability — academic & confidential",
    availabilityP1:
      "This project is **not publicly available on GitHub**. It was the final Master's project and it involves proprietary security datasets, trained models and LLM configuration kept private for academic integrity and data-protection reasons.",
    availabilityP2:
      "If you'd like the full technical report, the methodology or a walkthrough, just ask me directly.",
    demoLabel: "Watch the demo video →",
  },
  kdd: {
    label: "Academic Project · ML / Big Data Research",
    title: "Intrusion Detection System — KDD Cup '99",
    subtitle:
      "A machine-learning IDS joining **cybersecurity**, **big data** and **artificial intelligence** in one end-to-end workflow: dataset engineering, exploratory analysis, model evaluation and a hierarchical detection pipeline.",
    tags: ["AI", "Big Data", "Cybersecurity", "Machine Learning", "Neural Networks", "EDA / BI"],
    overviewTitle: "Project overview",
    overviewP:
      "The project designs an **intrusion detection system** built on **predictive classification**. Using KDD Cup '99 as the benchmark, we built the whole experimental workflow: large-scale consolidation, controlled reduction and specialisation, exploratory analysis, evaluation of several ML approaches, and a final **hierarchical pipeline** that improves interpretability and operational robustness.",
    teamTitle: "Team & collaboration",
    teamP:
      "A **five-person group project** for the Master's programme. I worked across data preparation, analysis, modelling and integration.",
    dataTitle: "Dataset engineering",
    dataP1:
      "The original dataset holds **more than 5 million network connection records**. KDD'99 is famous for redundancy and distribution bias — training straight on the full set inflates performance and makes the conclusions worth less.",
    dataP2:
      "So we applied a controlled process of cleaning, reduction and task-specific design, ending with a set of specialised subsets aligned to each detection objective.",
    dataBullets: [
      "**Main reduced dataset (~42,301 records):** the shared baseline for classical ML and general analysis.",
      "**Specialised subsets for hierarchical detection:** one per stage (R2L/U2R vs the rest; DoS vs Probe).",
      "**Neural-network dataset (~1.1M records):** a larger alternative, since those architectures benefit from sample size.",
      "**19 derived datasets in total**, built from different filtering and relabelling strategies.",
    ],
    edaTitle: "Exploratory data analysis",
    edaP:
      "The EDA drove the feature handling and the model choice. The data mixes variable types, extreme outliers, heavy tails and attack families with very different behavioural signatures.",
    edaBullets: [
      "**Class distribution** and imbalance, especially the R2L/U2R minority attacks.",
      "**Outliers and skew** in the continuous variables, which motivated log transforms and robust preprocessing.",
      "**Separability signals:** traffic-volume patterns for DoS/Probe against authentication indicators for R2L/U2R.",
      "**Feature redundancy** and correlation structure, to avoid inflating dimensionality.",
    ],
    modelTitle: "Modelling approach",
    modelP: "We implemented and compared a deliberately diverse set of models, to weigh each inductive bias against each subtask.",
    modelBullets: [
      "**Supervised:** KNN, decision tree, random forest, XGBoost, SVM, logistic regression.",
      "**Unsupervised (exploratory):** K-Means and DBSCAN, used to inspect structure and density.",
      "**MLP:** trained on the larger dataset and tested with imbalance handling (oversampling).",
      "**Multiclass experiments:** different label groupings, to study the granularity-versus-learnability trade-off.",
    ],
    pipelineTitle: "Final solution: a hierarchical detection pipeline",
    pipelineP:
      "A **multi-stage pipeline** shaped like the way IDS decisions are actually made: start broad, then specialise. It improves interpretability and lets the rare but high-impact attack families get dedicated handling.",
    pipelineSteps: [
      "**Stage 1 — binary detection:** normal versus attack, with a decision tree.",
      "**Stage 2 — targeted filtering:** R2L/U2R versus other attacks, with a specialised decision tree.",
      "**Stage 3 — network attack family:** DoS versus Probe, with a random forest ensemble.",
    ],
    outputsTitle: "Outputs & deliverables",
    outputs: [
      "**Power BI dashboard:** interactive exploration — class distributions, protocol and service patterns, variable relationships.",
      "**Tableau visualisations:** complementary analysis and presentation material.",
      "**Web interface:** a consolidation layer presenting the hierarchical inference output.",
    ],
    whyTitle: "Why the project matters",
    why: [
      "**End-to-end scope:** data engineering → EDA → modelling → evaluation → deliverables.",
      "**Methodologically honest:** it names the dataset's limitations instead of riding the redundancy to a better-looking number.",
      "**Operational thinking:** the hierarchy mirrors how a real IDS decision is taken.",
      "**Balance:** performance, efficiency and explainability treated as simultaneous constraints.",
    ],
    noticeTitle: "Ethical & legal notice",
    noticeP1:
      "This work is **strictly academic**, for research and educational evaluation. KDD Cup '99 is a historical benchmark — it is **not suitable** as training data for a production IDS on a modern network without contemporary validation and legally obtained data.",
    noticeP2:
      "The full report, the internal datasets and the implementation details are not published here. Ask me directly for the complete methodology, results and artefacts.",
  },
  mindflow: {
    label: "Live on Google Play · Android game · Solo project",
    title: "MINDFLOW — Brain Puzzle Games",
    subtitle:
      "My **first published mobile game**: four logic puzzle modes in one offline, completely silent Android app built with **React Native and TypeScript**. Over 1,200 generated and solution-verified levels, bilingual, ad-supported — designed, built, tested and shipped to the Play Store end to end.",
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Android", "AdMob", "Offline-first", "i18n", "Published"],
    ctaStore: "Download on Google Play ↗",
    ctaModes: "See the game modes",
    glanceTitle: "At a glance",
    glance: [
      { v: "4", l: "Game modes" },
      { v: "1,200", l: "Verified levels" },
      { v: "100%", l: "Offline play" },
      { v: "ES / EN", l: "Full localisation" },
    ],
    whyTitle: "Why I built it",
    whyP1:
      "Almost every puzzle game I opened was doing the opposite of what I wanted from one. Loud loops, countdown timers, a login screen, an energy bar, a connection requirement. Games that ask for your attention rather than give you somewhere to rest it.",
    whyP2:
      "**MINDFLOW is the version I wanted to exist**: no audio at all, no timers, no account, no internet needed. Just a board and a problem that has a real solution. The whole app is built around roughly **30 calm minutes a day** — enough to train focus and logical reasoning without turning into another thing pulling at you. Its tagline is exactly that idea: *train your mind, rest your head*.",
    whyP3:
      "The other half of the reason was personal. I wanted to take one project all the way through the parts of shipping that a portfolio repo never teaches you: store policies, a privacy policy and terms that actually resolve, GDPR ad consent, release signing, a closed test with real testers, crash monitoring and a Play Console review. **This is the first app I have published**, and going from an empty React Native project to a live listing taught me more than the code itself did.",
    modesTitle: "Four games, one app",
    modesP:
      "Three level-based logic modes and one endless score mode. Each has its own rules, its own board renderer and its own independent progress, lives and hints — so getting stuck in one never blocks the others.",
    modes: [
      {
        name: "Path Painter",
        kind: "400 levels",
        text: "A **one-line drawing puzzle**. Paint every free cell of the grid with a single continuous stroke, from the start point to the goal, without lifting your finger or crossing your own path.",
        rules: [
          "Every level is a verified Hamiltonian path — a solution always exists",
          "Obstacles block cells and reshape the route",
          "The stored solution doubles as the hint system",
        ],
      },
      {
        name: "Arrow Puzzle",
        kind: "400 levels",
        text: "A **planning puzzle**. Each line slides off the board in the direction it points — but only if nothing is in the way. Find the order that clears the whole grid without a single collision.",
        rules: [
          "A collision costs one life and resets the board",
          "Order matters more than speed: no timers anywhere",
          "The hint reveals which line to pull next",
        ],
      },
      {
        name: "Color Minesweeper",
        kind: "400 levels",
        text: "Minesweeper rebuilt around **pure deduction**. There is exactly one bomb per row, one per column and one per colour — so there is always a logical path to the answer and never a guess.",
        rules: [
          "Tap to mark a cell safe, double tap to flag a bomb",
          "Every level was brute-forced to guarantee a unique solution",
          "A wrong flag costs a life; three lives per attempt",
        ],
      },
      {
        name: "Break Infinite Blocks",
        kind: "Endless mode",
        text: "The endless one. Drag pieces from an arsenal of **40 shapes** onto an 8×8 board; complete rows and columns to clear them. Chain clears across consecutive drops and the multiplier climbs.",
        rules: [
          "Combo ladder: x1 → x5 → x10 → x50 → x100 → x200",
          "Line preview shows what a drop is about to break",
          "Every batch of 3 pieces guarantees at least one playable",
          "One rewarded second chance per run; all-time and daily records saved",
        ],
      },
    ],
    modesNote:
      "**Note:** the four boards above are illustrative diagrams I drew to explain each mode's rules — they are not screenshots of the final game. For the real in-game visuals, see the",
    modesNoteLink: "Google Play listing",
    levelsTitle: "Levels, lives & progression",
    levelsP:
      "Each of the three level-based modes ships **400 levels** — **1,200 in total**. They are not hand-drawn one by one: they are generated by scripts and then **verified by brute force**, so every Path Painter level has a valid single-stroke solution and every Color Minesweeper board has exactly one solution. That verified solution is what the hint system reads from, which means a hint can never point somewhere wrong.",
    levelsBullets: [
      "**Levels 1–2 of each mode** are guided tutorials, with a six-card interactive walkthrough on first launch (skippable, replayable from Settings)",
      "**3 lives** and **3 hint stars** per mode, tracked independently",
      "Extra hints can be earned by watching a rewarded video — always the player's choice, never forced",
      "Progress, stars and records are saved automatically and survive offline",
      "A wellbeing tracker records daily streak, time played and levels cleared per day",
    ],
    adsP:
      "Monetisation is deliberately back-loaded: the early levels are completely ad-free, and the interstitial cadence only tightens as the player goes deeper.",
    adsHeaders: ["Levels", "Interstitial cadence", "Intent"],
    adsRows: [
      ["1 – 10", "None", "Let the player fall in first"],
      ["11 – 30", "Every 5 levels", "Introduce ads gently"],
      ["31 – 60", "Every 3 levels", "Engaged player"],
      ["61 – 130", "Every 2 levels", "Committed player"],
      ["131 +", "Every level", "Deep-run monetisation"],
    ],
    adsNote:
      "Offline, the counter is stored and the pending ad is only shown once the device reconnects — the game never blocks on a network it does not have.",
    archTitle: "Architecture & engineering notes",
    archP:
      "The rule I held to throughout: **game logic never lives in a component**. Board state, line-clearing, combo maths and level validation are pure TypeScript modules with unit tests; the React Native components only render and handle gestures.",
    archBullets: [
      "**State:** Redux Toolkit slices per domain — game, settings, progress, endless mode",
      "**Persistence:** everything through a single `StorageService` over AsyncStorage, with a deliberately small interface so it can move to SQLite without touching the app",
      "**Rendering:** custom lightweight UI instead of a component library — full control of the minimal style and far fewer native dependencies",
      "**Performance:** the 8×8 board is memoised and the dragged piece moves via `Animated.setValue`, so dragging never triggers a re-render per frame",
      "**Feedback without sound:** a `HapticService` carries the whole feedback channel — success, error, combo, game over",
      "**Ads:** `AdService` loads the SDK defensively (if the module is missing the game simply runs ad-free) and Google UMP consent is requested before initialising",
      "**Theming:** light, dark and system, following the device appearance live",
      "**i18n:** full Spanish and English via i18next, switchable in Settings",
    ],
    shipTitle: "From closed test to production",
    shipP:
      "Google Play now requires a 14-day closed test before a new personal developer account can publish. I ran it as a product loop rather than a formality: every piece of feedback became a tracked change, shipped in a new build and re-verified before applying for production access.",
    shipSteps: [
      "**Zero crashes, zero functional bugs** reported across the tested devices and Android versions. The feedback was all about onboarding, presentation and personalisation.",
      "**Five shipped changes:** a System theme option that follows the device live · an interactive six-card walkthrough on first launch · a “Rate this app” entry point using the native in-app review sheet · an ASO rewrite of the title, short and full descriptions in both languages · new store screenshots built around one game mode per shot.",
      "**Compliance in place before release:** published privacy policy and terms, UMP ad-consent flow with a user-accessible “manage consent” option, and Crashlytics wired for post-release monitoring.",
    ],
    shipNote:
      "The app went out as a signed **Android App Bundle** and is now on version **1.1.1**, with post-release fixes driven by real Crashlytics reports rather than guesses.",
    downloadTitle: "Download & availability",
    downloadP:
      "MINDFLOW is **published and free on the Google Play Store**, worldwide, for Android. No account, no sign-up and no internet connection required to play.",
    storeMeta: "com.pvilar.mindflow · v1.1.1 · Free · Android",
    storeBtn: "Get it on Google Play ↗",
    storeListing: "Store listing:",
  },
};
export type PagesDict = typeof pagesEn;
