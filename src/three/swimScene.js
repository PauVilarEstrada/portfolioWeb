import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, HemisphereLight, DirectionalLight, PMREMGenerator,
  PlaneGeometry, BoxGeometry, CylinderGeometry, TorusGeometry, RingGeometry, SphereGeometry, Mesh, Group, Sprite,
  SpriteMaterial, MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, LineBasicMaterial, ShaderMaterial,
  CanvasTexture, InstancedMesh, Object3D, SRGBColorSpace, DoubleSide, Vector2, Vector3, Vector4, MathUtils,
  PCFShadowMap, NeutralToneMapping,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { readThemeColors, onThemeChange } from "./themeColors";
import {
  tileTexture, floorTexture, deckTexture, surfaceShader, withCaustics, ballTexture,
  buildGoal, buildPlayer, poseArm, treadLegs, POSE, clamp01, easeOut, easeInOut,
} from "./poolScene";

/**
 * "Pool of projects", a small water polo game. Pau (red cap, number 1)
 * swims with the ball at his hands; every mystery buoy hides a project, a club
 * or a step of his career and only opens when he reaches it with the ball.
 * Three defenders chase him and steal the ball on contact. Once every buoy is
 * found, he has to score past the keeper at the far goal.
 *
 * Controls: arrow keys / WASD while the canvas has focus, Space to shoot;
 * on touch screens, press and drag towards where to swim.
 *
 * Stations come in as { x, z, color, logo?, monogram?, label }. The scene calls
 * onNear(index | null) for the found buoy in reach, onDiscover(index),
 * onHint(kind) and onGoal(); `sfx` is the sound kit from the page.
 */

const ARENA = { halfL: 13, halfW: 7.5, depth: 2, rim: 7, level: -0.12 };
const SPEED = 4.2; // metres per second at full input
const ACCEL = 6;
const DRAG = 2.4;
const TURN = 9;
const REACH = 1.6; // how close a buoy has to be to open
const BUOY_RADIUS = 0.75; // swimmers are kept this far from a buoy's centre
const START = new Vector3(-11.4, 0, 0);
const LANES = [-5, -2.5, 0, 2.5, 5];
const GOAL_X = ARENA.halfL - 1.3;
const SHOOT_FROM = GOAL_X - 6.5; // shots only count from inside 6.5 m
const RIVALS = [
  { home: new Vector3(-4.5, 0, -1.5), number: "4" },
  { home: new Vector3(1.5, 0, 2.5), number: "6" },
  { home: new Vector3(6, 0, -1), number: "9" },
];
const RIVAL_SPEED = { base: 2.4, perFind: 0.1, max: 3.6 };
const CHASE_RADIUS = 5.5;
const STEAL_RADIUS = 0.85;
const NEUTRAL = "#f2efe8";
const CONFETTI = ["#1f5fbf", "#ffffff", "#e0323b", "#fcdd09", "#3cbf63"];
const KEYS = {
  ArrowUp: [0, -1], KeyW: [0, -1],
  ArrowDown: [0, 1], KeyS: [0, 1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0],
  ArrowRight: [1, 0], KeyD: [1, 0],
};

/** White plate with the station's logo, a monogram in its colour, or a question mark while hidden. */
function plateTexture(station, hidden) {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d");
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  const r = S * 0.44;
  const ring = hidden ? "#c9c3b6" : station.color;
  const base = () => {
    ctx.clearRect(0, 0, S, S);
    ctx.shadowColor = "rgba(12,22,17,0.22)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 8;
    ctx.strokeStyle = ring;
    ctx.stroke();
  };
  base();
  const text = (value, color, size) => {
    ctx.fillStyle = color;
    ctx.font = `800 ${size}px "Archivo", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(value, S / 2, S / 2 + 6);
  };
  if (hidden) {
    text("?", "#0c1611", 132);
  } else if (station.logo) {
    const img = new Image();
    img.onload = () => {
      base();
      const size = r * 1.25;
      const k = Math.min(size / img.width, size / img.height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, r - 6, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, S / 2 - (img.width * k) / 2, S / 2 - (img.height * k) / 2, img.width * k, img.height * k);
      ctx.restore();
      tex.needsUpdate = true;
    };
    img.src = station.logo;
  } else {
    text(station.monogram, station.color, station.monogram.length > 2 ? 64 : 84);
  }
  return tex;
}

/** Name pill floating over a found buoy. */
function labelTexture(text, ink, paper) {
  const H = 64;
  const font = `600 32px "Archivo", system-ui, sans-serif`;
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  ctx.font = font;
  const W = Math.ceil(ctx.measureText(text).width) + 40;
  c.width = W;
  c.height = H;
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, H / 2);
  ctx.fill();
  ctx.font = font;
  ctx.fillStyle = paper;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2 + 2);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return { tex, aspect: W / H };
}

/** Shortest signed difference between two angles. */
const angleDelta = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

export function createSwimGame(container, { stations, onNear, onDiscover, onHint, onGoal, sfx }) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true });
  } catch {
    return null;
  }
  const mobile = container.clientWidth < 720;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.toneMapping = NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  container.appendChild(renderer.domElement);

  let colors = readThemeColors();
  const paper = new Color(colors.paper);
  const scene = new Scene();
  scene.background = paper;
  const pmrem = new PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envMap;
  scene.environmentIntensity = 0.55;

  const baseFov = mobile ? 55 : 42;
  const camera = new PerspectiveCamera(baseFov, 1, 0.1, 120);
  const chaseOffset = mobile ? new Vector3(0, 8.5, 8.5) : new Vector3(0, 7.2, 7.8);

  const sunDir = new Vector3(-0.5, 1, 0.4).normalize();
  scene.add(new HemisphereLight("#ffffff", "#a9c6d4", 0.9));
  const sun = new DirectionalLight("#fff6ea", 2.1);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 12, bottom: -12, near: 1, far: 50 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  sun.position.copy(sunDir).multiplyScalar(20);
  scene.add(sun);
  scene.add(sun.target);

  const { halfL, halfW, depth, rim, level } = ARENA;
  const L = halfL * 2;
  const W = halfW * 2;
  const caustics = { uCTime: { value: 0 }, uCLevel: { value: level } };

  // ── Basin, deck and coping ──
  const floor = new Mesh(new PlaneGeometry(L, W), withCaustics(new MeshStandardMaterial({ map: floorTexture(L, W, LANES, 48), roughness: 0.35 }), caustics));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -depth;
  floor.receiveShadow = true;
  scene.add(floor);
  [
    [L, 0, -halfW, 0],
    [L, 0, halfW, Math.PI],
    [W, -halfL, 0, Math.PI / 2],
    [W, halfL, 0, -Math.PI / 2],
  ].forEach(([len, x, z, rot]) => {
    const wall = new Mesh(new PlaneGeometry(len, depth), withCaustics(new MeshStandardMaterial({ map: tileTexture(len / 2, depth / 2), roughness: 0.35 }), caustics));
    wall.position.set(x, -depth / 2, z);
    wall.rotation.y = rot;
    wall.receiveShadow = true;
    scene.add(wall);
  });
  const deckBase = paper.r + paper.g + paper.b < 1.2 ? "#c9cfca" : "#efece5";
  [
    [L + rim * 2, rim, 0, -(halfW + rim / 2)],
    [L + rim * 2, rim, 0, halfW + rim / 2],
    [rim, W, -(halfL + rim / 2), 0],
    [rim, W, halfL + rim / 2, 0],
  ].forEach(([sx, sz, x, z]) => {
    const deck = new Mesh(new BoxGeometry(sx, 0.4, sz), new MeshStandardMaterial({ map: deckTexture(sx, sz, deckBase), roughness: 0.7 }));
    deck.position.set(x, -0.2, z);
    deck.receiveShadow = true;
    scene.add(deck);
  });
  const coping = new MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.35, clearcoat: 0.4 });
  [
    [L + 0.2, 0, -halfW, Math.PI / 2],
    [L + 0.2, 0, halfW, Math.PI / 2],
    [W + 0.2, -halfL, 0, 0],
    [W + 0.2, halfL, 0, 0],
  ].forEach(([len, x, z, rot]) => {
    const m = new Mesh(new CylinderGeometry(0.1, 0.1, len, 16), coping);
    m.rotation.set(Math.PI / 2, 0, rot);
    m.position.set(x, 0, z);
    m.castShadow = true;
    scene.add(m);
  });

  // ── Water ──
  const height = {
    uTime: { value: 0 },
    uAmp: { value: 0.025 },
    uBodies: { value: new Vector4(START.x, START.z, 99, 99) },
    uBodyAmp: { value: new Vector2(0.6, 0) },
  };
  const water = new ShaderMaterial({
    uniforms: {
      ...height,
      uDepth: { value: depth },
      uShallow: { value: new Color("#3cc5e6") },
      uDeep: { value: new Color("#0b6aae") },
      uSky: { value: paper.clone().lerp(new Color("#ffffff"), 0.7) },
      uSun: { value: sunDir },
    },
    vertexShader: surfaceShader.vertex,
    fragmentShader: surfaceShader.fragment,
    transparent: true,
    depthWrite: false,
  });
  const surface = new Mesh(new PlaneGeometry(L, W, mobile ? 90 : 180, mobile ? 52 : 104), water);
  surface.rotation.x = -Math.PI / 2;
  surface.position.y = level;
  surface.renderOrder = 2;
  scene.add(surface);

  // ── Goals; the one on the right is the target ──
  const goalMats = {
    frame: new MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.25, clearcoat: 0.6, emissive: "#3cbf63", emissiveIntensity: 0 }),
    net: new LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.6 }),
  };
  const goals = [1, -1].map(side => {
    const goal = buildGoal(side, side > 0 ? goalMats : { frame: new MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.25, clearcoat: 0.6 }), net: goalMats.net });
    goal.position.set(side * GOAL_X, level, 0);
    scene.add(goal);
    return goal;
  });
  const target = goals[0];
  const net = target.children.find(o => o.isLineSegments);
  const marker = new Mesh(new RingGeometry(1.6, 1.75, 64), new MeshBasicMaterial({ color: "#3cbf63", transparent: true, opacity: 0, side: DoubleSide, depthWrite: false }));
  marker.rotation.x = -Math.PI / 2;
  marker.position.set(GOAL_X - 2.2, level + 0.02, 0);
  marker.renderOrder = 3;
  scene.add(marker);

  // ── Buoys: neutral with a question mark until reached with the ball ──
  const buoys = stations.map(st => {
    const group = new Group();
    group.position.set(st.x, level, st.z);
    const discMat = new MeshPhysicalMaterial({ color: NEUTRAL, roughness: 0.3, clearcoat: 0.7 });
    const disc = new Mesh(new CylinderGeometry(0.5, 0.56, 0.2, 32), discMat);
    disc.castShadow = true;
    group.add(disc);
    const halo = new Mesh(new TorusGeometry(0.82, 0.035, 10, 64), new MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.85 }));
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.03;
    group.add(halo);
    const mystery = plateTexture(st, true);
    // Sprites draw after the water and leave the depth buffer alone, so the water still shows round them.
    const plate = new Sprite(new SpriteMaterial({ map: mystery, transparent: true, depthWrite: false }));
    plate.renderOrder = 5;
    plate.position.y = 1.05;
    plate.scale.setScalar(0.95);
    group.add(plate);
    const label = labelTexture(st.label, colors.ink, colors.paper);
    const tag = new Sprite(new SpriteMaterial({ map: label.tex, transparent: true, opacity: 0, depthWrite: false }));
    tag.renderOrder = 6;
    tag.position.y = 1.78;
    tag.scale.set(0.3 * label.aspect, 0.3, 1);
    tag.visible = false;
    group.add(tag);
    scene.add(group);
    return { st, group, discMat, halo, plate, mystery, tag, label, found: false, reveal: 0, phase: Math.random() * Math.PI * 2, pop: 0 };
  });
  const revealColor = new Color();
  const neutral = new Color(NEUTRAL);

  // ── Swimmers ──
  const makeSwimmer = (player, start, yaw) => {
    scene.add(player.root);
    return { p: player, pos: start.clone(), vel: new Vector3(), yaw, stroke: Math.random() * 6, lastStroke: 0 };
  };
  const pau = makeSwimmer(buildPlayer({ cap: "#e0323b", capInk: "#ffffff", guard: "#c4232c", number: "1", suit: "#1d2c52" }), START, Math.PI / 2);
  const rivals = RIVALS.map((r, i) => ({
    ...makeSwimmer(buildPlayer({ cap: "#f6f6f2", capInk: "#1f5fbf", guard: "#dfe3e8", number: r.number, suit: "#1f5fbf" }), r.home, -Math.PI / 2),
    home: r.home,
    angle: (i * Math.PI * 2) / RIVALS.length,
    stun: 0,
  }));
  const keeper = makeSwimmer(buildPlayer({ cap: "#e0323b", capInk: "#1f5fbf", guard: "#c4232c", number: "13", suit: "#1f5fbf" }), new Vector3(GOAL_X - 0.6, 0, 0), -Math.PI / 2);

  /** Head-up front crawl when moving, eggbeater and sculling when still. */
  const animateSwimmer = (s, dt, t, ownSound) => {
    const speed = Math.hypot(s.vel.x, s.vel.z);
    if (speed > 0.25) s.yaw += angleDelta(s.yaw, Math.atan2(s.vel.x, s.vel.z)) * Math.min(1, TURN * dt);
    const swim = clamp01((speed / SPEED) * 1.4);
    s.stroke += dt * (4 + 6 * swim);
    const { p } = s;
    p.root.position.set(s.pos.x, level - 0.1 - swim * 0.22 + Math.sin(t * 5 + s.stroke * 0.1) * 0.025, s.pos.z);
    p.root.rotation.y = s.yaw;
    p.body.rotation.x = swim * 1.05;
    if (swim > 0.15) {
      [p.right, p.left].forEach((arm, i) => {
        const side = i === 0 ? 1 : -1;
        arm.shoulder.rotation.set(-(s.stroke + i * Math.PI), 0, side * 0.22);
        arm.elbow.rotation.set(0, 0, side * 0.25);
        arm.wrist.rotation.set(0, 0, 0);
      });
      p.legs.forEach((leg, i) => {
        const side = i === 0 ? 1 : -1;
        leg.hip.rotation.set(0.1 + Math.sin(s.stroke * 2 + i * Math.PI) * 0.35, 0, side * 0.12);
        leg.knee.rotation.set(0.25 + Math.max(0, Math.sin(s.stroke * 2 + i * Math.PI)) * 0.4, 0, 0);
      });
      if (ownSound && swim > 0.4 && Math.floor(s.stroke / Math.PI) !== s.lastStroke) {
        s.lastStroke = Math.floor(s.stroke / Math.PI);
        sfx?.stroke();
      }
    } else {
      const wobble = Math.sin(t * 6) * 0.08;
      poseArm(p.right, 1, POSE.down, POSE.scull, 1, wobble);
      poseArm(p.left, -1, POSE.down, POSE.scull, 1, -wobble);
      treadLegs(p.legs, t);
    }
    return swim;
  };

  const clampToPool = v => {
    v.x = MathUtils.clamp(v.x, -halfL + 0.7, halfL - 0.7);
    v.z = MathUtils.clamp(v.z, -halfW + 0.7, halfW - 0.7);
  };
  const keepOffBuoys = v => buoys.forEach(b => {
    const dx = v.x - b.group.position.x;
    const dz = v.z - b.group.position.z;
    const d = Math.hypot(dx, dz);
    if (d < BUOY_RADIUS && d > 1e-4) {
      v.x = b.group.position.x + (dx / d) * BUOY_RADIUS;
      v.z = b.group.position.z + (dz / d) * BUOY_RADIUS;
    }
  });

  // ── Ball ──
  const ball = new Mesh(new SphereGeometry(0.2, 32, 20), new MeshPhysicalMaterial({ map: ballTexture(), roughness: 0.35, clearcoat: 0.6 }));
  ball.castShadow = true;
  scene.add(ball);
  const ballState = { owner: "pau", pos: new Vector3(), vel: new Vector3(), from: new Vector3(), to: new Vector3(), t: 0 };
  let guard = 0; // seconds Pau can't lose the ball again after getting it
  let found = 0;
  let goalReady = false;
  let scored = false;
  let celebrate = 0;

  // ── Particles: droplets, sparkles and confetti ──
  const PARTS = 260;
  const parts = new InstancedMesh(new BoxGeometry(0.07, 0.07, 0.07), new MeshStandardMaterial({ roughness: 0.4 }), PARTS);
  parts.frustumCulled = false;
  const pPos = new Float32Array(PARTS * 3);
  const pVel = new Float32Array(PARTS * 3);
  const pLife = new Float32Array(PARTS);
  const pSpin = new Float32Array(PARTS);
  const pFloat = new Uint8Array(PARTS); // confetti drifts down slowly
  const dummy = new Object3D();
  const tint = new Color();
  dummy.scale.setScalar(0);
  dummy.updateMatrix();
  for (let i = 0; i < PARTS; i++) {
    parts.setMatrixAt(i, dummy.matrix);
    parts.setColorAt(i, tint.set("#ffffff"));
  }
  scene.add(parts);
  let pNext = 0;
  const emit = (kind, x, y, z, count) => {
    for (let n = 0; n < count; n++) {
      const i = pNext;
      pNext = (pNext + 1) % PARTS;
      const a = Math.random() * Math.PI * 2;
      const sp = kind === "confetti" ? 1 + Math.random() * 2.5 : 0.6 + Math.random() * 1.6;
      pPos.set([x + (kind === "confetti" ? (Math.random() - 0.5) * 3 : 0), y, z + (kind === "confetti" ? (Math.random() - 0.5) * 3 : 0)], i * 3);
      pVel.set([Math.cos(a) * sp, (kind === "confetti" ? 3 : 2.5) + Math.random() * 3, Math.sin(a) * sp], i * 3);
      pLife[i] = kind === "confetti" ? 3.5 : 1.4;
      pSpin[i] = Math.random() * 10;
      pFloat[i] = kind === "confetti" ? 1 : 0;
      const color = kind === "drop" ? "#eafaff" : kind === "spark" ? (n % 2 ? "#fcdd09" : "#3cbf63") : CONFETTI[n % CONFETTI.length];
      parts.setColorAt(i, tint.set(color));
    }
    parts.instanceColor.needsUpdate = true;
  };

  // Wake rings.
  const ringGeo = new RingGeometry(0.2, 0.26, 48);
  const rings = Array.from({ length: 12 }, () => {
    const m = new Mesh(ringGeo, new MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, side: DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.visible = false;
    m.renderOrder = 3;
    m.userData = { born: -1, grow: 3.5 };
    scene.add(m);
    return m;
  });
  let ringNext = 0;
  let lastRing = 0;
  const ripple = (t, x, z, grow = 3.5) => {
    const r = rings[ringNext];
    ringNext = (ringNext + 1) % rings.length;
    r.userData.born = t;
    r.userData.grow = grow;
    r.position.set(x, level + 0.015, z);
    r.visible = true;
  };

  // ── Input ──
  const held = new Set();
  const drag = new Vector2();
  let dragging = false;
  const onKeyDown = e => {
    if (e.code === "Space") {
      e.preventDefault();
      shoot();
      return;
    }
    if (!KEYS[e.code]) return;
    e.preventDefault();
    held.add(e.code);
  };
  const onKeyUp = e => held.delete(e.code);
  const onBlur = () => held.clear();
  const setDrag = e => {
    const r = container.getBoundingClientRect();
    drag.set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  };
  const onDown = e => {
    if (e.target !== renderer.domElement) return;
    dragging = true;
    container.focus({ preventScroll: true });
    renderer.domElement.setPointerCapture?.(e.pointerId);
    setDrag(e);
  };
  const onMove = e => { if (dragging) setDrag(e); };
  const onUp = () => { dragging = false; };
  container.addEventListener("keydown", onKeyDown);
  container.addEventListener("keyup", onKeyUp);
  container.addEventListener("blur", onBlur);
  renderer.domElement.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  const input = new Vector2();
  const readInput = () => {
    input.set(0, 0);
    held.forEach(code => {
      input.x += KEYS[code][0];
      input.y += KEYS[code][1];
    });
    if (dragging && drag.length() > 0.04) input.copy(drag);
    if (input.lengthSq() > 1) input.normalize();
    return input;
  };

  // ── Shooting ──
  function shoot() {
    if (scored || ballState.owner === "shot") return;
    if (!goalReady) { onHint("notYet"); return; }
    if (ballState.owner !== "pau") { onHint("needBall"); return; }
    if (pau.pos.x < SHOOT_FROM) { onHint("tooFar"); return; }
    ballState.owner = "shot";
    ballState.t = 0;
    ballState.from.copy(ball.position);
    // Aim at the corner the keeper is furthest from.
    ballState.to.set(GOAL_X + 0.35, level + 0.75, keeper.pos.z > 0 ? -0.95 : 0.95);
    sfx?.kick();
  }

  // ── Layout and theme ──
  const layout = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(container);
  const stopTheme = onThemeChange(() => {
    colors = readThemeColors();
    scene.background.set(colors.paper);
    buoys.forEach(b => {
      b.label.tex.dispose();
      b.label = labelTexture(b.st.label, colors.ink, colors.paper);
      b.tag.material.map = b.label.tex;
      b.tag.material.needsUpdate = true;
    });
  });

  // ── Loop ──
  let raf = 0;
  let running = false;
  let near = null;
  let warnedNoBall = null;
  let lastT = performance.now();
  let clock = 0;
  const camPos = new Vector3(0, 26, 19);
  const camLook = new Vector3(0, level, 0);
  const wantPos = new Vector3();
  const wantLook = new Vector3();
  const forward = new Vector3();
  camera.position.copy(camPos);
  camera.lookAt(camLook);

  const frame = now => {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    clock += dt;
    const t = clock;
    guard = Math.max(0, guard - dt);

    // Pau.
    const dir = scored ? input.set(0, 0) : readInput();
    if (dir.lengthSq() > 0) {
      const k = Math.min(1, ACCEL * dt);
      pau.vel.x += (dir.x * SPEED - pau.vel.x) * k;
      pau.vel.z += (dir.y * SPEED - pau.vel.z) * k;
    } else {
      pau.vel.multiplyScalar(Math.exp(-DRAG * dt));
    }
    pau.pos.addScaledVector(pau.vel, dt);
    clampToPool(pau.pos);
    keepOffBuoys(pau.pos);
    const swim = animateSwimmer(pau, dt, t, true);
    forward.set(Math.sin(pau.yaw), 0, Math.cos(pau.yaw));

    // Rivals: patrol their zone, chase Pau when he has the ball nearby, steal on contact.
    const rivalSpeed = Math.min(RIVAL_SPEED.max, RIVAL_SPEED.base + found * RIVAL_SPEED.perFind);
    rivals.forEach(r => {
      r.stun = Math.max(0, r.stun - dt);
      const toPau = Math.hypot(pau.pos.x - r.pos.x, pau.pos.z - r.pos.z);
      let tx;
      let tz;
      if (!scored && r.stun === 0 && ballState.owner === "pau" && toPau < CHASE_RADIUS) {
        tx = pau.pos.x + pau.vel.x * 0.3;
        tz = pau.pos.z + pau.vel.z * 0.3;
      } else {
        r.angle += dt * 0.35;
        tx = r.home.x + Math.cos(r.angle) * 2.6;
        tz = r.home.z + Math.sin(r.angle) * 2.2;
      }
      const dx = tx - r.pos.x;
      const dz = tz - r.pos.z;
      const d = Math.hypot(dx, dz) || 1;
      const sp = r.stun > 0 ? 0.6 : rivalSpeed;
      const k = Math.min(1, 4 * dt);
      r.vel.x += ((dx / d) * sp * Math.min(1, d) - r.vel.x) * k;
      r.vel.z += ((dz / d) * sp * Math.min(1, d) - r.vel.z) * k;
      r.pos.addScaledVector(r.vel, dt);
      clampToPool(r.pos);
      keepOffBuoys(r.pos);
      animateSwimmer(r, dt, t, false);
      if (!scored && ballState.owner === "pau" && guard === 0 && toPau < STEAL_RADIUS) {
        // Stolen: the ball squirts away and the defender backs off for a moment.
        ballState.owner = null;
        ballState.pos.copy(ball.position);
        const ax = (pau.pos.x - r.pos.x) / (toPau || 1);
        const az = (pau.pos.z - r.pos.z) / (toPau || 1);
        ballState.vel.set(ax * 3.2 - az * (Math.random() - 0.5) * 2, 0, az * 3.2 + ax * (Math.random() - 0.5) * 2);
        r.stun = 1.8;
        guard = 0.8;
        emit("drop", pau.pos.x, level, pau.pos.z, 18);
        ripple(t, pau.pos.x, pau.pos.z, 5);
        sfx?.whistle();
        sfx?.splash();
        onHint("stolen");
      }
    });

    // Keeper: tracks the ball across the goal mouth.
    const kz = MathUtils.clamp(ball.position.z * 0.6, -0.9, 0.9);
    if (ballState.owner === "shot") {
      // Dives late, towards where the ball is going.
      const k = clamp01((ballState.t - 0.18) / 0.4);
      keeper.vel.z = 0;
      keeper.pos.z = MathUtils.lerp(keeper.pos.z, ballState.to.z * 0.55, k * 0.25);
      keeper.p.body.rotation.z = -Math.sign(ballState.to.z) * easeOut(k) * 0.5;
      poseArm(keeper.p.right, 1, POSE.ready, POSE.reach, easeOut(k));
      poseArm(keeper.p.left, -1, POSE.ready, POSE.brace, easeOut(k));
    } else {
      keeper.vel.z = (kz - keeper.pos.z) * 2.5;
      keeper.pos.z += keeper.vel.z * dt;
      keeper.vel.set(0, 0, 0);
    }
    keeper.p.root.position.set(keeper.pos.x, level - 0.1 + Math.sin(t * 5) * 0.03, keeper.pos.z);
    keeper.p.root.rotation.y = -Math.PI / 2;
    treadLegs(keeper.p.legs, t);
    if (ballState.owner !== "shot" && !scored) {
      const wobble = Math.sin(t * 7) * 0.06;
      poseArm(keeper.p.right, 1, POSE.down, POSE.ready, 1, wobble);
      poseArm(keeper.p.left, -1, POSE.down, POSE.ready, 1, -wobble);
    }

    // Ball.
    if (ballState.owner === "pau") {
      ball.position.set(pau.pos.x + forward.x * 0.62, level + 0.12 + Math.sin(t * 6) * 0.02, pau.pos.z + forward.z * 0.62);
      ball.rotation.x += dt * swim * 9;
    } else if (ballState.owner === "shot") {
      ballState.t += dt;
      const k = clamp01(ballState.t / 0.55);
      ball.position.lerpVectors(ballState.from, ballState.to, easeInOut(k));
      ball.position.y += Math.sin(k * Math.PI) * 0.5;
      ball.rotation.z -= dt * 18;
      if (k >= 1 && !scored) {
        scored = true;
        celebrate = t;
        ballState.owner = "net";
        emit("confetti", GOAL_X - 1.5, level + 2.5, 0, 160);
        emit("drop", GOAL_X, level + 0.5, ballState.to.z, 24);
        ripple(t, GOAL_X - 0.2, ballState.to.z, 6);
        sfx?.whistle(true);
        sfx?.cheer();
        onGoal();
      }
    } else if (ballState.owner === "net") {
      ball.position.set(GOAL_X + 0.55, level + 0.15 + Math.sin(t * 4) * 0.02, ballState.to.z * 0.8);
    } else {
      ballState.pos.addScaledVector(ballState.vel, dt);
      ballState.vel.multiplyScalar(Math.exp(-1.6 * dt));
      clampToPool(ballState.pos);
      ball.position.set(ballState.pos.x, level + 0.1 + Math.sin(t * 4) * 0.015, ballState.pos.z);
      ball.rotation.x += dt * ballState.vel.length() * 4;
      if (Math.hypot(pau.pos.x - ballState.pos.x, pau.pos.z - ballState.pos.z) < 0.8) {
        ballState.owner = "pau";
        guard = 1;
        sfx?.pick();
      }
    }

    // Buoys: bob, reveal when reached with the ball, report the found one in reach.
    let nearest = null;
    let nearestDist = REACH;
    buoys.forEach((b, i) => {
      b.group.position.y = level + Math.sin(t * 1.6 + b.phase) * 0.04;
      b.halo.rotation.z = t * 0.6;
      b.halo.scale.setScalar(1 + Math.sin(t * 2.4 + b.phase) * 0.04);
      b.pop = Math.max(0, b.pop - dt * 2.2);
      b.plate.scale.setScalar(0.95 * (1 + Math.sin(b.pop * Math.PI) * 0.3));
      if (b.found && b.reveal < 1) {
        b.reveal = Math.min(1, b.reveal + dt * 2);
        b.discMat.color.copy(neutral).lerp(revealColor.set(b.st.color), b.reveal);
        b.tag.material.opacity = b.reveal;
      }
      const d = Math.hypot(pau.pos.x - b.group.position.x, pau.pos.z - b.group.position.z);
      if (d < REACH && !b.found) {
        if (ballState.owner === "pau") {
          b.found = true;
          b.pop = 1;
          b.tag.visible = true;
          b.plate.material.map = plateTexture(b.st, false);
          b.plate.material.needsUpdate = true;
          b.halo.material.color.set("#3cbf63");
          found += 1;
          emit("spark", b.group.position.x, level + 0.4, b.group.position.z, 36);
          ripple(t, b.group.position.x, b.group.position.z, 5);
          sfx?.chime();
          onDiscover(i);
        } else if (warnedNoBall !== i) {
          warnedNoBall = i;
          onHint("needBall");
        }
      }
      if (d >= REACH && warnedNoBall === i) warnedNoBall = null;
      if (b.found && d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    if (nearest !== near) {
      near = nearest;
      onNear(near);
    }
    if (!goalReady && found === buoys.length) {
      goalReady = true;
      sfx?.whistle();
      onHint("goalReady");
    }
    if (goalReady && !scored) {
      goalMats.frame.emissiveIntensity = 0.35 + Math.sin(t * 4) * 0.25;
      marker.material.opacity = 0.35 + Math.sin(t * 4) * 0.2;
    } else {
      marker.material.opacity = 0;
    }
    if (net && scored) {
      const age = t - celebrate;
      net.scale.x = 1 + Math.sin(age * 18) * 0.12 * Math.exp(-age * 2.5);
    }

    // Water, wake and particles.
    height.uTime.value = t;
    height.uBodies.value.set(pau.pos.x, pau.pos.z, keeper.pos.x, keeper.pos.z);
    height.uBodyAmp.value.set(0.5 + swim, 0.4);
    caustics.uCTime.value = t;
    if (swim > 0.3 && t - lastRing > 0.22) {
      lastRing = t;
      ripple(t, pau.pos.x - forward.x * 0.6, pau.pos.z - forward.z * 0.6);
    }
    rings.forEach(r => {
      if (r.userData.born < 0) return;
      const age = t - r.userData.born;
      r.scale.setScalar(1 + age * r.userData.grow);
      r.material.opacity = Math.max(0, 0.6 - age * 0.75);
      if (r.material.opacity === 0) { r.userData.born = -1; r.visible = false; }
    });
    for (let i = 0; i < PARTS; i++) {
      if (pLife[i] <= 0) continue;
      const j = i * 3;
      pLife[i] -= dt;
      pVel[j + 1] -= (pFloat[i] ? 3 : 9.8) * dt;
      pPos[j] += pVel[j] * dt;
      pPos[j + 1] += pVel[j + 1] * dt;
      pPos[j + 2] += pVel[j + 2] * dt;
      if (pPos[j + 1] < level) pLife[i] = 0;
      dummy.position.set(pPos[j], pPos[j + 1], pPos[j + 2]);
      dummy.rotation.set(t * pSpin[i], t * pSpin[i] * 0.7, 0);
      dummy.scale.setScalar(pLife[i] > 0 ? 1 : 0);
      dummy.updateMatrix();
      parts.setMatrixAt(i, dummy.matrix);
    }
    parts.instanceMatrix.needsUpdate = true;

    // Camera: fly in from above, then chase with a little look-ahead; orbit the goal after scoring.
    const speedK = clamp01(Math.hypot(pau.vel.x, pau.vel.z) / SPEED);
    if (scored) {
      const a = (t - celebrate) * 0.35 - Math.PI / 2;
      wantPos.set(GOAL_X - 2 + Math.sin(a) * 7, 4.5, Math.cos(a) * 7);
      wantLook.set(GOAL_X - 0.5, level + 0.6, 0);
    } else {
      const zoom = (1 + speedK * 0.18) * (nearestDist < REACH ? 0.85 : 1);
      wantPos.copy(pau.pos).addScaledVector(chaseOffset, zoom).addScaledVector(pau.vel, 0.35);
      wantLook.set(pau.pos.x + pau.vel.x * 0.4, level, pau.pos.z - 1.2 + pau.vel.z * 0.4);
    }
    const intro = easeInOut(clamp01(t / 2.2));
    const follow = 1 - Math.exp(-(intro < 1 ? 1.2 + intro * 3 : 3.2) * dt);
    camPos.lerp(wantPos, follow);
    camLook.lerp(wantLook, follow);
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    const fov = baseFov + speedK * 4;
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov += (fov - camera.fov) * Math.min(1, 3 * dt);
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running) return;
    running = true;
    lastT = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !document.hidden) start(); else stop();
  });
  io.observe(container);
  const onVis = () => (document.hidden || !visible ? stop() : start());
  document.addEventListener("visibilitychange", onVis);
  start();

  return {
    shoot,
    dispose: () => {
      stop();
      io.disconnect();
      ro.disconnect();
      stopTheme();
      document.removeEventListener("visibilitychange", onVis);
      container.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("keyup", onKeyUp);
      container.removeEventListener("blur", onBlur);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        const list = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        list.forEach(m => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      });
      buoys.forEach(b => b.mystery.dispose());
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
