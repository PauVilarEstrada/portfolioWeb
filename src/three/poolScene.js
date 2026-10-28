import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, Fog, HemisphereLight, DirectionalLight,
  PlaneGeometry, BoxGeometry, CylinderGeometry, SphereGeometry, CapsuleGeometry, RingGeometry,
  BufferGeometry, Float32BufferAttribute, LineSegments, LineBasicMaterial,
  Mesh, MeshStandardMaterial, MeshBasicMaterial, ShaderMaterial, Group, Vector3,
  CanvasTexture, SRGBColorSpace, DoubleSide, MathUtils,
} from "three";
import { readThemeColors } from "./themeColors";

/**
 * Intro loader: a low-poly water polo pool. A shot comes from midfield, the
 * goalkeeper (Pau, red cap number 1) gets a hand to it, and the camera dives
 * into the water. `onProgress` reports 0–1 for the counter; `onDone` fires
 * when the dive has finished.
 */

/** Timeline in seconds. */
const T = {
  shotStart: 0.55,
  save: 1.45,
  diveStart: 2.15,
  end: 3.0,
};

const POOL = { length: 20, width: 12, deckHeight: 0.25, goalX: 9, goalWidth: 3, goalHeight: 0.9, goalDepth: 0.8 };
const KEEPER_X = 8.25;
const GRAVITY = 9.8;

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = t => Math.min(1, Math.max(0, t));

/** Red goalkeeper cap with a white "1". */
function capTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#d8262f";
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 84px "Archivo", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("1", 64, 70);
  ctx.fillText("1", 192, 70);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Yellow ball with the classic blue seams. */
function ballTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f6c929";
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = "#1d4ed8";
  ctx.lineWidth = 10;
  [32, 96, 160, 224].forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 30, 40, x - 30, 88, x, 128);
    ctx.stroke();
  });
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Wire-frame net: back, top and both sides of the goal. */
function netGeometry(w, h, d, step) {
  const pts = [];
  const line = (a, b) => pts.push(...a, ...b);
  for (let y = 0; y <= h + 1e-6; y += step) line([d, y, -w / 2], [d, y, w / 2]);
  for (let z = -w / 2; z <= w / 2 + 1e-6; z += step) {
    line([d, 0, z], [d, h, z]);
    line([0, h, z], [d, h, z]);
  }
  for (let x = 0; x <= d + 1e-6; x += step) {
    line([x, h, -w / 2], [x, h, w / 2]);
    line([x, 0, -w / 2], [x, h, -w / 2]);
    line([x, 0, w / 2], [x, h, w / 2]);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(pts, 3));
  return g;
}

function buildGoal(side, white, netMat) {
  const g = new Group();
  const { goalWidth: w, goalHeight: h, goalDepth: d } = POOL;
  const post = new CylinderGeometry(0.06, 0.06, h, 12);
  [-w / 2, w / 2].forEach(z => {
    const m = new Mesh(post, white);
    m.position.set(0, h / 2, z);
    g.add(m);
  });
  const bar = new Mesh(new CylinderGeometry(0.06, 0.06, w + 0.12, 12), white);
  bar.rotation.x = Math.PI / 2;
  bar.position.y = h;
  g.add(bar);
  g.add(new LineSegments(netGeometry(w, h, d, 0.25), netMat));
  g.position.x = side * POOL.goalX;
  g.rotation.y = side > 0 ? 0 : Math.PI;
  return g;
}

/** Stylised goalkeeper: head with cap, shoulders above the water, two arms. */
function buildKeeper() {
  const skin = new MeshStandardMaterial({ color: "#e5b48f", roughness: 0.7 });
  const suit = new MeshStandardMaterial({ color: "#0c1611", roughness: 0.6 });
  const cap = new MeshStandardMaterial({ map: capTexture(), roughness: 0.5 });
  const keeper = new Group();

  const torso = new Mesh(new CapsuleGeometry(0.3, 0.45, 6, 16), skin);
  torso.position.y = 0.05;
  keeper.add(torso);
  const head = new Mesh(new SphereGeometry(0.2, 24, 16), skin);
  head.position.y = 0.62;
  keeper.add(head);
  const trunks = new Mesh(new CylinderGeometry(0.31, 0.3, 0.3, 16), suit);
  trunks.position.y = -0.38;
  keeper.add(trunks);
  const capMesh = new Mesh(new SphereGeometry(0.212, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.56), cap);
  capMesh.position.y = 0.64;
  capMesh.rotation.y = -Math.PI / 2;
  keeper.add(capMesh);

  const armGeo = new CapsuleGeometry(0.075, 0.62, 4, 10);
  armGeo.translate(0, 0.38, 0); // pivot at the shoulder
  const makeArm = z => {
    const pivot = new Group();
    pivot.position.set(0, 0.32, z);
    const arm = new Mesh(armGeo, skin);
    pivot.add(arm);
    keeper.add(pivot);
    return pivot;
  };
  const left = makeArm(0.32);
  const right = makeArm(-0.32);
  keeper.position.set(KEEPER_X, 0, 0);
  keeper.rotation.y = Math.PI; // facing the field
  return { keeper, left, right };
}

export function createPoolScene(container, { onProgress, onDone }) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    onDone();
    return { dispose: () => {} };
  }
  const mobile = container.clientWidth < 720;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  container.appendChild(renderer.domElement);

  const colors = readThemeColors();
  const paper = new Color(colors.paper);
  const underwater = new Color("#0b5687");
  const scene = new Scene();
  scene.background = new Color(colors.paper);
  scene.fog = new Fog(colors.paper, 18, 42);

  const camera = new PerspectiveCamera(mobile ? 52 : 40, 1, 0.05, 100);

  scene.add(new HemisphereLight("#ffffff", "#9fb8c8", 1.6));
  const sun = new DirectionalLight("#ffffff", 1.6);
  sun.position.set(-6, 12, 6);
  scene.add(sun);

  // ── Deck and pool walls ──
  const deck = new MeshStandardMaterial({ color: "#f4f5f1", roughness: 0.9 });
  const coping = new MeshStandardMaterial({ color: "#ffffff", roughness: 0.6 });
  const { length: L, width: W, deckHeight: DH } = POOL;
  const rim = 6;
  [
    [L + rim * 2, rim, 0, -(W / 2 + rim / 2)],
    [L + rim * 2, rim, 0, W / 2 + rim / 2],
    [rim, W, -(L / 2 + rim / 2), 0],
    [rim, W, L / 2 + rim / 2, 0],
  ].forEach(([sx, sz, x, z]) => {
    const m = new Mesh(new BoxGeometry(sx, DH * 2, sz), deck);
    m.position.set(x, 0, z);
    scene.add(m);
  });
  [
    [L + 0.5, 0.25, 0, -W / 2 - 0.12],
    [L + 0.5, 0.25, 0, W / 2 + 0.12],
    [0.25, W, -L / 2 - 0.12, 0],
    [0.25, W, L / 2 + 0.12, 0],
  ].forEach(([sx, sz, x, z]) => {
    const m = new Mesh(new BoxGeometry(sx, 0.08, sz), coping);
    m.position.set(x, DH + 0.04, z);
    scene.add(m);
  });

  // Field markers on the side walls: red at 2 m, yellow at 5 m, from each goal line.
  [[2, "#d8262f"], [5, "#f6c929"]].forEach(([d, color]) => {
    const mat = new MeshBasicMaterial({ color });
    [-1, 1].forEach(side => {
      [-1, 1].forEach(edge => {
        const m = new Mesh(new BoxGeometry(0.5, 0.1, 0.1), mat);
        m.position.set(side * (POOL.goalX - d), DH + 0.09, edge * (W / 2 + 0.12));
        scene.add(m);
      });
    });
  });

  // ── Water ──
  const water = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDeep: { value: new Color("#0f6aa8") }, uShallow: { value: new Color("#4fc1e3") } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      varying float vH;
      void main() {
        vUv = uv;
        vec3 p = position;
        float h = sin(p.x * 1.3 + uTime * 1.4) * 0.03 + cos(p.y * 1.7 + uTime * 1.1) * 0.025;
        p.z += h;
        vH = h;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      varying vec2 vUv;
      varying float vH;
      void main() {
        vec2 q = vUv * vec2(20.0, 12.0);
        float c = sin(q.x * 2.1 + uTime * 0.9) * sin(q.y * 2.4 - uTime * 0.7);
        c += sin((q.x + q.y) * 1.3 + uTime * 1.2) * 0.5;
        float caustic = smoothstep(0.75, 1.25, c);
        vec3 col = mix(uDeep, uShallow, 0.45 + vH * 6.0);
        col += caustic * 0.18;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const waterMesh = new Mesh(new PlaneGeometry(L, W, mobile ? 40 : 80, mobile ? 24 : 48), water);
  waterMesh.rotation.x = -Math.PI / 2;
  scene.add(waterMesh);

  // ── Goals, keeper, ball ──
  const white = new MeshStandardMaterial({ color: "#ffffff", roughness: 0.4 });
  const netMat = new LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.7 });
  scene.add(buildGoal(1, white, netMat));
  scene.add(buildGoal(-1, white, netMat));
  const { keeper, left, right } = buildKeeper();
  scene.add(keeper);

  const ball = new Mesh(new SphereGeometry(0.12, 24, 16), new MeshStandardMaterial({ map: ballTexture(), roughness: 0.5 }));
  scene.add(ball);
  const shotFrom = new Vector3(0.5, 0.35, 1.2);
  const shotTo = new Vector3(KEEPER_X + 0.05, 1.05, -0.62);
  const rebound = { pos: new Vector3(), vel: new Vector3() };

  const splash = new Mesh(new RingGeometry(0.1, 0.16, 40), new MeshBasicMaterial({ color: "#ffffff", transparent: true, side: DoubleSide }));
  splash.rotation.x = -Math.PI / 2;
  splash.visible = false;
  scene.add(splash);
  let splashAt = -1;

  // ── Camera path ──
  const camStart = mobile ? new Vector3(-4, 9, 14) : new Vector3(-7, 7.5, 12);
  const camMid = mobile ? new Vector3(3.5, 3.4, 6.5) : new Vector3(3.2, 3.2, 6.2);
  const lookStart = new Vector3(1.5, 0, 0);
  const lookMid = new Vector3(KEEPER_X, 0.4, -0.2);
  const diveTarget = new Vector3(KEEPER_X - 1.2, -0.6, 0.3);
  const cam = new Vector3();
  const look = new Vector3();

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

  let raf = 0;
  let finished = false;
  const t0 = performance.now();

  const frame = () => {
    const t = (performance.now() - t0) / 1000;
    water.uniforms.uTime.value = t;
    onProgress(clamp01(t / T.end));

    // Camera: wide establishing shot → close on the keeper → dive into the water.
    if (t < T.diveStart) {
      const k = easeInOut(clamp01(t / T.diveStart));
      cam.lerpVectors(camStart, camMid, k);
      look.lerpVectors(lookStart, lookMid, k);
    } else {
      const k = easeInOut(clamp01((t - T.diveStart) / (T.end - T.diveStart)));
      cam.lerpVectors(camMid, diveTarget, k);
      look.lerpVectors(lookMid, new Vector3(KEEPER_X + 2, -2, 0), k);
    }
    camera.position.copy(cam);
    camera.lookAt(look);
    // Below the surface the world turns pool blue.
    const under = clamp01(-cam.y / 0.35);
    scene.background.copy(paper).lerp(underwater, under);
    scene.fog.color.copy(scene.background);
    scene.fog.near = MathUtils.lerp(18, 0.5, under);
    scene.fog.far = MathUtils.lerp(42, 9, under);

    // Keeper: eggbeater bob, then the save.
    keeper.position.y = Math.sin(t * 5) * 0.03;
    const reach = clamp01((t - (T.save - 0.35)) / 0.3) * (1 - clamp01((t - T.save - 0.45) / 0.5));
    right.rotation.x = MathUtils.lerp(0.9, 2.75, reach);
    right.rotation.z = MathUtils.lerp(0.2, -0.15, reach);
    left.rotation.x = -0.9 + Math.sin(t * 6) * 0.15;
    keeper.position.z = MathUtils.lerp(0, -0.25, reach);

    // Ball: arcing shot, then deflected up and away.
    if (t < T.shotStart) {
      ball.position.copy(shotFrom);
      ball.position.y += Math.sin(t * 4) * 0.02;
    } else if (t < T.save) {
      const k = (t - T.shotStart) / (T.save - T.shotStart);
      ball.position.lerpVectors(shotFrom, shotTo, k);
      ball.position.y += Math.sin(k * Math.PI) * 0.7;
      ball.rotation.z -= 0.25;
    } else {
      if (rebound.vel.lengthSq() === 0) {
        rebound.pos.copy(shotTo);
        rebound.vel.set(-3.2, 4.2, 1.6);
      }
      const dt = t - T.save;
      ball.position.set(
        rebound.pos.x + rebound.vel.x * dt,
        Math.max(0.1, rebound.pos.y + rebound.vel.y * dt - 0.5 * GRAVITY * dt * dt),
        rebound.pos.z + rebound.vel.z * dt,
      );
      ball.rotation.x += 0.3;
      if (ball.position.y <= 0.1 && splashAt < 0) {
        splashAt = t;
        splash.position.set(ball.position.x, 0.04, ball.position.z);
        splash.visible = true;
      }
    }
    if (splashAt >= 0) {
      const s = (t - splashAt) * 6 + 1;
      splash.scale.setScalar(s);
      splash.material.opacity = Math.max(0, 1 - (t - splashAt) * 1.4);
    }

    renderer.render(scene, camera);
    if (t >= T.end) {
      if (!finished) { finished = true; onDone(); }
      return;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
