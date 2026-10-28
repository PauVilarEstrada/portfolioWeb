import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, HemisphereLight, DirectionalLight, PMREMGenerator,
  PlaneGeometry, BoxGeometry, CylinderGeometry, TorusGeometry, RingGeometry, Mesh, Group, Sprite, SpriteMaterial,
  MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, LineBasicMaterial, ShaderMaterial, CanvasTexture,
  SRGBColorSpace, DoubleSide, Vector2, Vector3, Vector4, MathUtils, PCFShadowMap, NeutralToneMapping,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { readThemeColors, onThemeChange } from "./themeColors";
import {
  tileTexture, floorTexture, deckTexture, surfaceShader, withCaustics,
  buildGoal, buildPlayer, poseArm, treadLegs, POSE, clamp01,
} from "./poolScene";

/**
 * "Pool of projects": swim Pau (red cap, number 1) around a pool and stop at
 * each buoy to read about a project, a club or a step of his career. Arrow
 * keys or WASD move him while the canvas has focus; on touch screens, drag
 * from the centre of the pool in the direction to swim.
 *
 * Stations come in as { x, z, color, logo?, monogram?, label } and the scene
 * reports `onNear(index | null)` and `onDiscover(index)`; the cards live in React.
 */

const ARENA = { halfL: 13, halfW: 7.5, depth: 2, rim: 7, level: -0.12 };
const SPEED = 4.2; // metres per second at full input
const ACCEL = 6;
const DRAG = 2.4;
const TURN = 9;
const REACH = 1.6; // how close a buoy has to be to open its card
const BUOY_RADIUS = 0.75; // the swimmer is kept this far from a buoy's centre
const START = new Vector3(0, 0, 3);
const LANES = [-5, -2.5, 0, 2.5, 5];
const KEYS = {
  ArrowUp: [0, -1], KeyW: [0, -1],
  ArrowDown: [0, 1], KeyS: [0, 1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0],
  ArrowRight: [1, 0], KeyD: [1, 0],
};

/** White plate with the station's logo, or a monogram in its colour. */
function plateTexture(station) {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d");
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  const r = S * 0.44;
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
    ctx.strokeStyle = station.color;
    ctx.stroke();
  };
  base();
  if (station.logo) {
    const img = new Image();
    img.onload = () => {
      base();
      const size = r * 1.25;
      const k = Math.min(size / img.width, size / img.height);
      const w = img.width * k;
      const h = img.height * k;
      ctx.save();
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, r - 6, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, S / 2 - w / 2, S / 2 - h / 2, w, h);
      ctx.restore();
      tex.needsUpdate = true;
    };
    img.src = station.logo;
  } else {
    ctx.fillStyle = station.color;
    ctx.font = `800 ${station.monogram.length > 2 ? 64 : 84}px "Archivo", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(station.monogram, S / 2, S / 2 + 4);
  }
  return tex;
}

/** Name pill floating over a buoy. */
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

export function createSwimGame(container, { stations, onNear, onDiscover }) {
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

  const camera = new PerspectiveCamera(mobile ? 55 : 42, 1, 0.1, 120);
  const camOffset = mobile ? new Vector3(0, 8.5, 8.5) : new Vector3(0, 7.2, 7.8);

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

  // ── Goals at both ends ──
  const goalMats = {
    frame: new MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.25, clearcoat: 0.6 }),
    net: new LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.6 }),
  };
  [1, -1].forEach(side => {
    const goal = buildGoal(side, goalMats);
    goal.position.set(side * (halfL - 1.3), level, 0);
    scene.add(goal);
  });

  // ── Buoys ──
  const ink = colors.ink;
  const buoys = stations.map(st => {
    const group = new Group();
    group.position.set(st.x, level, st.z);
    const disc = new Mesh(new CylinderGeometry(0.5, 0.56, 0.2, 32), new MeshPhysicalMaterial({ color: st.color, roughness: 0.3, clearcoat: 0.7 }));
    disc.castShadow = true;
    group.add(disc);
    const halo = new Mesh(new TorusGeometry(0.82, 0.035, 10, 64), new MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.85 }));
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.03;
    group.add(halo);
    const plate = new Sprite(new SpriteMaterial({ map: plateTexture(st), transparent: true }));
    plate.position.y = 1.05;
    plate.scale.setScalar(0.95);
    group.add(plate);
    const label = labelTexture(st.label, ink, colors.paper);
    const tag = new Sprite(new SpriteMaterial({ map: label.tex, transparent: true }));
    tag.position.y = 1.78;
    tag.scale.set(0.3 * label.aspect, 0.3, 1);
    group.add(tag);
    scene.add(group);
    return { group, halo, plate, tag, label, found: false, phase: Math.random() * Math.PI * 2, pop: 0 };
  });

  // ── Swimmer ──
  const pau = buildPlayer({ cap: "#e0323b", capInk: "#ffffff", guard: "#c4232c", number: "1", suit: "#1d2c52" });
  scene.add(pau.root);
  const pos = START.clone();
  const vel = new Vector3();
  let yaw = Math.PI; // facing the far end (-z)
  let stroke = 0;

  // Wake rings.
  const ringGeo = new RingGeometry(0.2, 0.26, 48);
  const rings = Array.from({ length: 10 }, () => {
    const m = new Mesh(ringGeo, new MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, side: DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.visible = false;
    m.renderOrder = 3;
    m.userData.born = -1;
    scene.add(m);
    return m;
  });
  let ringNext = 0;
  let lastRing = 0;

  // ── Input ──
  const held = new Set();
  const drag = new Vector2();
  let dragging = false;
  const onKeyDown = e => {
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
    dragging = true;
    container.setPointerCapture?.(e.pointerId);
    setDrag(e);
  };
  const onMove = e => { if (dragging) setDrag(e); };
  const onUp = () => { dragging = false; };
  container.addEventListener("keydown", onKeyDown);
  container.addEventListener("keyup", onKeyUp);
  container.addEventListener("blur", onBlur);
  container.addEventListener("pointerdown", onDown);
  container.addEventListener("pointermove", onMove);
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
    buoys.forEach((b, i) => {
      b.label.tex.dispose();
      b.label = labelTexture(stations[i].label, colors.ink, colors.paper);
      b.tag.material.map = b.label.tex;
      b.tag.material.needsUpdate = true;
    });
  });

  // ── Loop ──
  let raf = 0;
  let running = false;
  let near = null;
  let lastT = performance.now();
  let clock = 0;
  const camTarget = new Vector3();
  const lookAt = new Vector3();
  camera.position.copy(pos).add(camOffset);

  const frame = now => {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    clock += dt;
    const t = clock;

    // Movement: accelerate towards the input, glide to a stop without it.
    const dir = readInput();
    if (dir.lengthSq() > 0) {
      const k = Math.min(1, ACCEL * dt);
      vel.x += (dir.x * SPEED - vel.x) * k;
      vel.z += (dir.y * SPEED - vel.z) * k;
    } else {
      vel.multiplyScalar(Math.exp(-DRAG * dt));
    }
    pos.addScaledVector(vel, dt);
    pos.x = MathUtils.clamp(pos.x, -halfL + 0.7, halfL - 0.7);
    pos.z = MathUtils.clamp(pos.z, -halfW + 0.7, halfW - 0.7);
    buoys.forEach(b => {
      const dx = pos.x - b.group.position.x;
      const dz = pos.z - b.group.position.z;
      const d = Math.hypot(dx, dz);
      if (d < BUOY_RADIUS && d > 1e-4) {
        pos.x = b.group.position.x + (dx / d) * BUOY_RADIUS;
        pos.z = b.group.position.z + (dz / d) * BUOY_RADIUS;
      }
    });
    const speed = Math.hypot(vel.x, vel.z);
    if (speed > 0.25) yaw += angleDelta(yaw, Math.atan2(vel.x, vel.z)) * Math.min(1, TURN * dt);

    // Swimmer: head-up front crawl when moving, eggbeater and sculling when still.
    const swim = clamp01(speed / SPEED * 1.4);
    stroke += dt * (4 + 6 * swim);
    pau.root.position.set(pos.x, level - 0.1 - swim * 0.22 + Math.sin(t * 5) * 0.025, pos.z);
    pau.root.rotation.y = yaw;
    pau.body.rotation.x = swim * 1.05;
    if (swim > 0.15) {
      [pau.right, pau.left].forEach((arm, i) => {
        const s = i === 0 ? 1 : -1;
        arm.shoulder.rotation.set(-(stroke + i * Math.PI), 0, s * 0.22);
        arm.elbow.rotation.set(0, 0, s * 0.25);
        arm.wrist.rotation.set(0, 0, 0);
      });
      pau.legs.forEach((leg, i) => {
        const s = i === 0 ? 1 : -1;
        leg.hip.rotation.set(0.1 + Math.sin(stroke * 2 + i * Math.PI) * 0.35, 0, s * 0.12);
        leg.knee.rotation.set(0.25 + Math.max(0, Math.sin(stroke * 2 + i * Math.PI)) * 0.4, 0, 0);
      });
    } else {
      const wobble = Math.sin(t * 6) * 0.08;
      poseArm(pau.right, 1, POSE.down, POSE.scull, 1, wobble);
      poseArm(pau.left, -1, POSE.down, POSE.scull, 1, -wobble);
      treadLegs(pau.legs, t);
    }

    // Water.
    height.uTime.value = t;
    height.uBodies.value.set(pos.x, pos.z, 99, 99);
    height.uBodyAmp.value.set(0.5 + swim, 0);
    caustics.uCTime.value = t;
    if (swim > 0.3 && t - lastRing > 0.22) {
      lastRing = t;
      const r = rings[ringNext];
      ringNext = (ringNext + 1) % rings.length;
      r.userData.born = t;
      r.position.set(pos.x - Math.sin(yaw) * 0.6, level + 0.015, pos.z - Math.cos(yaw) * 0.6);
      r.visible = true;
    }
    rings.forEach(r => {
      if (r.userData.born < 0) return;
      const age = t - r.userData.born;
      r.scale.setScalar(1 + age * 3.5);
      r.material.opacity = Math.max(0, 0.6 - age * 0.75);
      if (r.material.opacity === 0) { r.userData.born = -1; r.visible = false; }
    });

    // Buoys: bob, spin the halo, open the nearest card.
    let nearest = null;
    let best = REACH;
    buoys.forEach((b, i) => {
      b.group.position.y = level + Math.sin(t * 1.6 + b.phase) * 0.04;
      b.halo.rotation.z = t * 0.6;
      b.halo.scale.setScalar(1 + Math.sin(t * 2.4 + b.phase) * 0.04);
      b.pop = Math.max(0, b.pop - dt * 2.2);
      b.plate.scale.setScalar(0.95 * (1 + Math.sin(b.pop * Math.PI) * 0.25));
      const d = Math.hypot(pos.x - b.group.position.x, pos.z - b.group.position.z);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    if (nearest !== near) {
      near = nearest;
      onNear(near);
      if (near !== null && !buoys[near].found) {
        const b = buoys[near];
        b.found = true;
        b.pop = 1;
        b.halo.material.color.set("#3cbf63");
        onDiscover(near);
      }
    }

    // Camera: chase from above and behind, eased.
    camTarget.copy(pos).add(camOffset);
    camera.position.lerp(camTarget, 1 - Math.exp(-4 * dt));
    lookAt.set(pos.x, level, pos.z - 1.2);
    camera.lookAt(lookAt);

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
    dispose: () => {
      stop();
      io.disconnect();
      ro.disconnect();
      stopTheme();
      document.removeEventListener("visibilitychange", onVis);
      container.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("keyup", onKeyUp);
      container.removeEventListener("blur", onBlur);
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        const list = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        list.forEach(m => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      });
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
