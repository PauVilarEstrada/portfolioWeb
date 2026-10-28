/**
 * Water polo penalty shoot-out on a 2D canvas. The player aims inside the goal
 * (pointer or arrow keys) and shoots; the goalkeeper — Pau, red cap number 1 —
 * reads the shot after a short delay and dives. Five shots per round.
 *
 * Coordinates: the goal mouth is x ∈ [-1, 1] (post to post), y ∈ [0, 1]
 * (water line to crossbar). Anything outside is wide.
 */

const SHOTS_PER_ROUND = 5;
const FLIGHT_MS = 620;
const REACTION = 0.32; // share of the flight before the keeper commits
const RESULT_MS = 1300;
const REACH_X = 0.36;
const REACH_HIGH_X = 0.15; // top corners are only reachable near the keeper
const HIGH = 0.78;
const AIM_STEP = 0.08;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = t => 1 - Math.pow(1 - t, 3);

export function createPenaltyGame(canvas, { colors, onState }) {
  const ctx = canvas.getContext("2d");
  let W = 0;
  let H = 0;
  let dpr = 1;
  let raf = 0;

  const state = {
    shots: 0,
    goals: 0,
    saves: 0,
    phase: "aim", // aim | flight | result | over
    aim: { x: 0.35, y: 0.55 },
    showAim: false,
    shot: null, // { x, y, start }
    keeper: { x: 0, lean: 0, from: 0, to: 0, dive: 0 },
    outcome: null, // goal | save | miss
    resultAt: 0,
  };

  // Goal geometry in canvas pixels, recomputed on resize.
  let G = { cx: 0, top: 0, water: 0, half: 0, h: 0 };
  const toPx = (x, y) => ({ px: G.cx + x * G.half, py: G.water - y * G.h });
  const fromPx = (px, py) => ({ x: (px - G.cx) / G.half, y: (G.water - py) / G.h });

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const half = Math.min(W * 0.36, H * 0.62);
    G = { cx: W / 2, half, h: half * 0.62, water: H * 0.62, top: H * 0.62 - half * 0.62 };
    draw(performance.now());
  };

  const emit = () => onState({ ...state, aim: undefined, shot: undefined, keeper: undefined });

  // ── Drawing ─────────────────────────────────────────────
  const drawWater = t => {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, colors.waterTop);
    g.addColorStop(1, colors.waterBottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      const y = G.water + 18 + i * ((H - G.water) / 8);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 16) {
        const yy = y + Math.sin(x * 0.02 + t * 0.002 + i) * 3;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  };

  const drawGoal = () => {
    const { cx, half, top, water } = G;
    // Net
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    const step = half / 9;
    for (let x = cx - half; x <= cx + half + 1; x += step) {
      ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x + (x - cx) * 0.06, water - 4); ctx.stroke();
    }
    for (let y = top; y <= water; y += step) {
      ctx.beginPath(); ctx.moveTo(cx - half, y); ctx.lineTo(cx + half, y); ctx.stroke();
    }
    // Frame
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(5, half * 0.035);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx - half, water + 6);
    ctx.lineTo(cx - half, top);
    ctx.lineTo(cx + half, top);
    ctx.lineTo(cx + half, water + 6);
    ctx.stroke();
    // Water line over the posts
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(0, water, W, 3);
  };

  const drawKeeper = t => {
    const k = state.keeper;
    const { px, py } = toPx(k.x, 0);
    const s = G.half * 0.16; // head radius
    const bob = Math.sin(t * 0.008) * s * 0.08 * (state.phase === "aim" ? 1 : 0.2);
    const lift = k.dive * s * 0.9;
    const wy = py + s * 0.62 - lift * 0.2;
    // Everything below the waterline stays hidden
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, wy);
    ctx.clip();
    ctx.save();
    ctx.translate(px, py - s * 1.1 + bob - lift);
    ctx.rotate(k.lean * 0.5);
    // Shoulders and arms
    ctx.fillStyle = colors.skin;
    const armUp = 0.35 + k.dive * 1.1;
    [-1, 1].forEach(side => {
      ctx.save();
      ctx.translate(side * s * 1.05, s * 0.9);
      ctx.rotate(side * (Math.PI / 2 + armUp) * (side === Math.sign(k.lean || 1) ? 1 : 0.7));
      ctx.beginPath();
      ctx.roundRect(-s * 0.22, 0, s * 0.44, s * 2.2, s * 0.22);
      ctx.fill();
      ctx.restore();
    });
    ctx.beginPath();
    ctx.ellipse(0, s * 1.35, s * 1.3, s * 0.85, 0, Math.PI, 0);
    ctx.fill();
    // Head and cap
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = "#1b1b1b";
    [-1, 1].forEach(side => {
      ctx.beginPath();
      ctx.arc(side * s * 0.34, s * 0.18, s * 0.09, 0, Math.PI * 2);
      ctx.fill();
    });
    // Red goalkeeper cap with ear guards and the number 1
    ctx.fillStyle = "#d8262f";
    ctx.beginPath();
    ctx.arc(0, -s * 0.02, s * 1.05, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    [-1, 1].forEach(side => {
      ctx.beginPath();
      ctx.arc(side * s * 0.98, s * 0.12, s * 0.26, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${Math.round(s * 0.78)}px Archivo, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("1", 0, -s * 0.5);
    ctx.restore();
    ctx.restore();
    // Ripples where the keeper meets the water
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    [1, 1.35].forEach((k, i) => {
      ctx.globalAlpha = i ? 0.45 : 1;
      ctx.beginPath();
      ctx.ellipse(px, wy, s * 1.6 * k, s * 0.32 * k, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  };

  const drawBall = t => {
    const sh = state.shot;
    const start = { px: W / 2 + G.half * 0.15, py: H - 28 };
    let px = start.px;
    let py = start.py;
    let r = Math.max(14, G.half * 0.085);
    if (sh) {
      const k = clamp((t - sh.start) / FLIGHT_MS, 0, 1);
      const e = easeOut(k);
      const end = toPx(sh.x, sh.y);
      px = start.px + (end.px - start.px) * e;
      py = start.py + (end.py - start.py) * e - Math.sin(k * Math.PI) * G.h * 0.35;
      r *= 1 - e * 0.55;
      if (state.outcome === "save" && k >= 1) {
        // Parried away
        const dt = (t - sh.start - FLIGHT_MS) / 1000;
        px = end.px + Math.sign(sh.x - state.keeper.x || 1) * dt * G.half * 1.6;
        py = end.py - dt * G.h * 1.4 + dt * dt * G.h * 3;
      }
    }
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(t * 0.01);
    ctx.fillStyle = "#f6c929";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = Math.max(2, r * 0.18);
    [-0.45, 0.45].forEach(o => {
      ctx.beginPath();
      ctx.arc(o * r * 2.2, 0, r * 1.6, Math.PI * 0.8, Math.PI * 1.2);
      ctx.stroke();
    });
    ctx.restore();
  };

  const drawAim = () => {
    if (state.phase !== "aim" || !state.showAim) return;
    const { px, py } = toPx(state.aim.x, state.aim.y);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(px, py, 16, 0, Math.PI * 2);
    ctx.moveTo(px - 24, py); ctx.lineTo(px - 8, py);
    ctx.moveTo(px + 8, py); ctx.lineTo(px + 24, py);
    ctx.moveTo(px, py - 24); ctx.lineTo(px, py - 8);
    ctx.moveTo(px, py + 8); ctx.lineTo(px, py + 24);
    ctx.stroke();
  };

  const draw = t => {
    if (!W) return;
    ctx.clearRect(0, 0, W, H);
    drawWater(t);
    drawGoal();
    drawKeeper(t);
    drawAim();
    drawBall(t);
  };

  // ── Game logic ──────────────────────────────────────────
  const keeperGuess = target => {
    // Reads the shot imperfectly: aims for the target with some error, sometimes guesses.
    const read = Math.random() < 0.58;
    const err = (Math.random() - 0.5) * 0.6;
    return clamp(read ? target.x + err : (Math.random() * 2 - 1), -0.85, 0.85);
  };

  const decide = (sh, keeperX) => {
    if (Math.abs(sh.x) > 1 || sh.y > 1 || sh.y < 0) return "miss";
    const dx = Math.abs(sh.x - keeperX);
    if (sh.y > HIGH) return dx < REACH_HIGH_X ? "save" : "goal";
    return dx < REACH_X ? "save" : "goal";
  };

  const shoot = (x, y) => {
    if (state.phase !== "aim") return;
    const sh = { x, y, start: performance.now() };
    state.shot = sh;
    state.phase = "flight";
    const k = state.keeper;
    k.from = k.x;
    k.to = keeperGuess(sh);
    state.outcome = decide(sh, k.to);
    loop();
    emit();
  };

  const tick = t => {
    const k = state.keeper;
    if (state.phase === "flight" || state.phase === "result") {
      const p = clamp((t - state.shot.start) / FLIGHT_MS, 0, 1);
      const m = clamp((p - REACTION) / (1 - REACTION), 0, 1);
      const e = easeOut(m);
      k.x = k.from + (k.to - k.from) * e;
      k.lean = Math.sign(k.to - k.from) * e * 0.9;
      k.dive = e * (state.shot.y > 0.5 ? 1 : 0.5);
      if (state.phase === "flight" && p >= 1) {
        state.phase = "result";
        state.resultAt = t;
        state.shots += 1;
        if (state.outcome === "goal") state.goals += 1;
        if (state.outcome === "save") state.saves += 1;
        emit();
      }
      if (state.phase === "result" && t - state.resultAt > RESULT_MS) {
        state.shot = null;
        k.x = 0; k.lean = 0; k.dive = 0;
        state.outcome = null;
        state.phase = state.shots >= SHOTS_PER_ROUND ? "over" : "aim";
        emit();
      }
    } else {
      k.x += (Math.sin(t * 0.0012) * 0.18 - k.x) * 0.05;
    }
  };

  const loop = () => {
    cancelAnimationFrame(raf);
    const frame = t => {
      tick(t);
      draw(t);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  };

  // ── Input ───────────────────────────────────────────────
  const onPointerMove = e => {
    const r = canvas.getBoundingClientRect();
    const p = fromPx(e.clientX - r.left, e.clientY - r.top);
    state.aim = { x: clamp(p.x, -1.25, 1.25), y: clamp(p.y, -0.2, 1.3) };
    state.showAim = true;
  };
  const onPointerDown = e => {
    onPointerMove(e);
    shoot(state.aim.x, state.aim.y);
  };
  const onKey = e => {
    if (state.phase !== "aim") return;
    const a = state.aim;
    const moves = { ArrowLeft: [-AIM_STEP, 0], ArrowRight: [AIM_STEP, 0], ArrowUp: [0, AIM_STEP], ArrowDown: [0, -AIM_STEP] };
    if (moves[e.key]) {
      e.preventDefault();
      state.aim = { x: clamp(a.x + moves[e.key][0], -1.1, 1.1), y: clamp(a.y + moves[e.key][1], 0, 1.1) };
      state.showAim = true;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      shoot(a.x, a.y);
    }
  };
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("keydown", onKey);
  canvas.addEventListener("focus", () => { state.showAim = true; });

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // Animate only while the game is on screen.
  const io = new IntersectionObserver(([en]) => (en.isIntersecting ? loop() : cancelAnimationFrame(raf)));
  io.observe(canvas);
  resize();
  emit();

  return {
    restart: () => {
      Object.assign(state, { shots: 0, goals: 0, saves: 0, phase: "aim", shot: null, outcome: null });
      emit();
      loop();
    },
    setColors: c => { Object.assign(colors, c); },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("keydown", onKey);
    },
  };
}

export { SHOTS_PER_ROUND };
