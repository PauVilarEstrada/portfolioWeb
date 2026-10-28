import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Matrix4,
  PerspectiveCamera,
  Plane,
  Points,
  PointsMaterial,
  Raycaster,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { siN8n, siOllama, siPython, siLangchain, siDocker, siPostgresql, siFastapi, siReact, siGoogle, siZoho, siVeeam, siBitdefender } from "simple-icons";
import { readThemeColors, onThemeChange } from "./themeColors";

/**
 * Hero background: a particle field that assembles into "PV" and scatters
 * under the pointer, wrapped in a slowly turning graph of the tools Pau
 * connects (apps → n8n → private LLM), with data pulses running into PV.
 */

/** @typedef {{ label: string, icon: { path: string, hex: string } | null }} NodeDef */

/** @type {NodeDef[]} */
const NODES = [
  { label: "n8n", icon: siN8n },
  { label: "LLM privado", icon: siOllama },
  { label: "Python", icon: siPython },
  { label: "LangChain", icon: siLangchain },
  { label: "Docker", icon: siDocker },
  { label: "PostgreSQL", icon: siPostgresql },
  { label: "FastAPI", icon: siFastapi },
  { label: "React", icon: siReact },
  { label: "Google Workspace", icon: siGoogle },
  { label: "Microsoft 365", icon: null },
  { label: "Zoho", icon: siZoho },
  { label: "Veeam", icon: siVeeam },
  { label: "Bitdefender", icon: siBitdefender },
];

/** Tuning knobs. Distances are world units; the camera sees ~6.3 units of height. */
const CFG = {
  fov: 35,
  cameraZ: 10,
  particlesDesktop: 6000,
  particlesMobile: 2200,
  ambientShare: 0.14,
  glyphWidth: 2.7,
  glyphDepth: 0.35,
  spring: 0.045,
  damping: 0.86,
  repelRadius: 0.9,
  repelForce: 0.06,
  drift: 0.035,
  ringRadius: 2.05,
  nodeScale: 0.46,
  nodeSpin: 0.06,
  pulseSpeed: 0.28,
  parallax: 0.35,
  parallaxEase: 0.05,
  maxDpr: 2,
  mobileBreakpoint: 720,
  greenShare: 0.12,
  pointSize: 2.4,
};

/** Points sampled from "PV" drawn on an offscreen canvas, centred on the origin. */
function sampleGlyph(count, width) {
  const W = 640;
  const H = 360;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  const out = new Float32Array(count * 3);
  if (!ctx) return out;
  ctx.fillStyle = "#000";
  ctx.font = `700 300px "Archivo", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PV", W / 2, H / 2 + 12);
  const data = ctx.getImageData(0, 0, W, H).data;
  const filled = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  const scale = width / W;
  for (let i = 0; i < count; i++) {
    const k = (Math.floor(Math.random() * (filled.length / 2))) * 2;
    out[i * 3] = (filled[k] - W / 2) * scale + (Math.random() - 0.5) * scale * 2;
    out[i * 3 + 1] = -(filled[k + 1] - H / 2) * scale + (Math.random() - 0.5) * scale * 2;
    out[i * 3 + 2] = (Math.random() - 0.5) * CFG.glyphDepth;
  }
  return out;
}

/** A round white plate with the brand mark (or a text monogram) and its label underneath. */
function nodeTexture(def, ink) {
  const S = 256;
  const LABEL_W = 420;
  const c = document.createElement("canvas");
  c.width = LABEL_W;
  c.height = S + 72;
  const ctx = c.getContext("2d");
  const r = S * 0.36;
  ctx.beginPath();
  ctx.arc(LABEL_W / 2, S / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(12,22,17,0.12)";
  ctx.stroke();
  if (def.icon) {
    const p = new Path2D(def.icon.path);
    const size = r * 1.05;
    ctx.save();
    ctx.translate(LABEL_W / 2 - size / 2, S / 2 - size / 2);
    ctx.scale(size / 24, size / 24);
    const hex = def.icon.hex.toUpperCase();
    ctx.fillStyle = hex === "FFFFFF" ? "#0c1611" : `#${hex}`;
    ctx.fill(p);
    ctx.restore();
  } else {
    ctx.fillStyle = "#0c1611";
    ctx.font = `700 ${Math.round(r * 0.62)}px "Archivo", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("M365", LABEL_W / 2, S / 2 + 2);
  }
  ctx.fillStyle = ink;
  ctx.font = `600 34px "Archivo", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(def.label, LABEL_W / 2, S + 46);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Even spread of n points on a sphere, flattened a little so the graph reads as a ring. */
function fibonacciSphere(n, radius) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push(new Vector3(Math.cos(th) * rad * radius, y * radius * 0.72, Math.sin(th) * rad * radius));
  }
  return pts;
}

/** @param {HTMLElement} container @returns {{ dispose: () => void }} */
export function createHeroScene(container) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    container.dataset.webgl = "off";
    return { dispose: () => {} };
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => container.clientWidth < CFG.mobileBreakpoint;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CFG.maxDpr));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(CFG.fov, 1, 0.1, 100);
  camera.position.z = CFG.cameraZ;

  // Everything orbits this rig, which is placed to the right of the hero copy.
  const rig = new Group();
  scene.add(rig);

  let colors = readThemeColors();

  // ── Particles ────────────────────────────────────────────
  const count = isMobile() ? CFG.particlesMobile : CFG.particlesDesktop;
  const glyphCount = Math.floor(count * (1 - CFG.ambientShare));
  const home = new Float32Array(count * 3);
  home.set(sampleGlyph(glyphCount, CFG.glyphWidth));
  for (let i = glyphCount; i < count; i++) {
    // Ambient dust drifting around the glyph
    const a = Math.random() * Math.PI * 2;
    const d = 1.6 + Math.random() * 2.6;
    home[i * 3] = Math.cos(a) * d * 1.3;
    home[i * 3 + 1] = Math.sin(a) * d * 0.8;
    home[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    seed[i] = Math.random() * Math.PI * 2;
    if (reduce) {
      pos[i * 3] = home[i * 3];
      pos[i * 3 + 1] = home[i * 3 + 1];
      pos[i * 3 + 2] = home[i * 3 + 2];
    } else {
      // Start scattered so the glyph assembles on load
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
  }
  const green = new Float32Array(count);
  for (let i = 0; i < count; i++) green[i] = Math.random() < CFG.greenShare ? 1 : 0;

  const pGeo = new BufferGeometry();
  pGeo.setAttribute("position", new BufferAttribute(pos, 3));
  pGeo.setAttribute("aGreen", new BufferAttribute(green, 1));
  pGeo.setAttribute("aSeed", new BufferAttribute(seed, 1));
  const pMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uInk: { value: new Color(colors.ink) },
      uGreen: { value: new Color(colors.green) },
      uSize: { value: CFG.pointSize * renderer.getPixelRatio() },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute float aGreen;
      attribute float aSeed;
      uniform float uSize;
      uniform float uTime;
      varying float vGreen;
      varying float vAlpha;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aSeed * 6.0);
        gl_PointSize = uSize * (10.0 / -mv.z) * (0.8 + aGreen * 0.6);
        vGreen = aGreen;
        vAlpha = twinkle;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uInk;
      uniform vec3 uGreen;
      varying float vGreen;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.15, d) * vAlpha;
        gl_FragColor = vec4(mix(uInk, uGreen, vGreen), a * (0.55 + vGreen * 0.45));
      }`,
  });
  const points = new Points(pGeo, pMat);
  rig.add(points);

  // ── Network ──────────────────────────────────────────────
  const net = new Group();
  rig.add(net);
  const nodePos = fibonacciSphere(NODES.length, CFG.ringRadius);
  const textures = NODES.map(n => nodeTexture(n, colors.ink));
  const sprites = NODES.map((_, i) => {
    const mat = new SpriteMaterial({ map: textures[i], transparent: true, depthWrite: false });
    const s = new Sprite(mat);
    s.scale.set(CFG.nodeScale * (420 / 256), CFG.nodeScale * (328 / 256), 1);
    s.position.copy(nodePos[i]);
    net.add(s);
    return s;
  });

  // Edges: every node to the centre, plus each node to its nearest neighbour.
  const edges = [];
  const origin = new Vector3();
  nodePos.forEach(p => edges.push([p, origin]));
  const lineArr = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => {
    lineArr.set([a.x, a.y, a.z, b.x * 0.18, b.y * 0.18, b.z * 0.18], i * 6);
    if (b !== origin) lineArr.set([b.x, b.y, b.z], i * 6 + 3);
  });
  const lGeo = new BufferGeometry();
  lGeo.setAttribute("position", new BufferAttribute(lineArr, 3));
  const lMat = new LineBasicMaterial({ color: colors.ink, transparent: true, opacity: 0.12 });
  net.add(new LineSegments(lGeo, lMat));

  // Pulses travel from each node into PV.
  const pulseArr = new Float32Array(NODES.length * 3);
  const pulseGeo = new BufferGeometry();
  pulseGeo.setAttribute("position", new BufferAttribute(pulseArr, 3));
  const pulseMat = new PointsMaterial({
    color: colors.green,
    size: 0.11,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  net.add(new Points(pulseGeo, pulseMat));
  const pulsePhase = NODES.map(() => Math.random());

  // ── Layout ───────────────────────────────────────────────
  const layout = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const viewH = 2 * CFG.cameraZ * Math.tan(MathUtils.degToRad(CFG.fov / 2));
    const viewW = viewH * camera.aspect;
    if (isMobile()) {
      rig.position.set(viewW * 0.04, viewH * 0.26, 0);
      rig.scale.setScalar(0.5);
    } else {
      // Right third of the hero, centred on the band between the nav and the rule
      rig.position.set(viewW * 0.3, viewH * 0.13, 0);
      rig.scale.setScalar(Math.min(0.95, Math.max(0.62, viewW / 12)));
    }
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(container);

  // ── Pointer ──────────────────────────────────────────────
  const ndc = new Vector2(9, 9);
  const pointerLocal = new Vector3(99, 99, 0);
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  const tilt = new Vector2();
  const onPointer = e => {
    const r = container.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const onLeave = () => ndc.set(9, 9);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  // ── Theme ────────────────────────────────────────────────
  const stopTheme = onThemeChange(() => {
    colors = readThemeColors();
    pMat.uniforms.uInk.value.set(colors.ink);
    pMat.uniforms.uGreen.value.set(colors.green);
    lMat.color.set(colors.ink);
    pulseMat.color.set(colors.green);
    NODES.forEach((n, i) => {
      textures[i].dispose();
      textures[i] = nodeTexture(n, colors.ink);
      sprites[i].material.map = textures[i];
      sprites[i].material.needsUpdate = true;
    });
    if (reduce) renderer.render(scene, camera);
  });

  // ── Loop ─────────────────────────────────────────────────
  let raf = 0;
  let running = false;
  let lastT = 0;
  let t0 = performance.now();
  const inv = new Matrix4();

  const step = () => {
    const t = (performance.now() - t0) / 1000;
    pMat.uniforms.uTime.value = t;
    lastT = t;

    // Pointer in the rig's local space
    if (Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1) {
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        inv.copy(rig.matrixWorld).invert();
        pointerLocal.copy(hit).applyMatrix4(inv);
      }
      tilt.x += (ndc.y * CFG.parallax - tilt.x) * CFG.parallaxEase;
      tilt.y += (ndc.x * CFG.parallax - tilt.y) * CFG.parallaxEase;
    } else {
      pointerLocal.set(99, 99, 0);
      tilt.multiplyScalar(1 - CFG.parallaxEase);
    }

    const R = CFG.repelRadius;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const s = seed[i];
      const hx = home[ix] + Math.sin(t * 0.6 + s) * CFG.drift;
      const hy = home[ix + 1] + Math.cos(t * 0.5 + s * 1.3) * CFG.drift;
      const hz = home[ix + 2];
      vel[ix] += (hx - pos[ix]) * CFG.spring;
      vel[ix + 1] += (hy - pos[ix + 1]) * CFG.spring;
      vel[ix + 2] += (hz - pos[ix + 2]) * CFG.spring;
      const dx = pos[ix] - pointerLocal.x;
      const dy = pos[ix + 1] - pointerLocal.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R * R && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        const f = ((R - d) / R) * CFG.repelForce;
        vel[ix] += (dx / d) * f;
        vel[ix + 1] += (dy / d) * f;
        vel[ix + 2] += f * 0.5;
      }
      vel[ix] *= CFG.damping;
      vel[ix + 1] *= CFG.damping;
      vel[ix + 2] *= CFG.damping;
      pos[ix] += vel[ix];
      pos[ix + 1] += vel[ix + 1];
      pos[ix + 2] += vel[ix + 2];
    }
    pGeo.attributes.position.needsUpdate = true;

    net.rotation.y = t * CFG.nodeSpin + tilt.y;
    net.rotation.x = 0.18 + tilt.x * 0.6;
    points.rotation.y = tilt.y * 0.35;
    points.rotation.x = tilt.x * 0.25;

    NODES.forEach((_, i) => {
      const k = (pulsePhase[i] + t * CFG.pulseSpeed) % 1;
      const p = nodePos[i];
      pulseArr[i * 3] = p.x * (1 - k) + p.x * 0.18 * k;
      pulseArr[i * 3 + 1] = p.y * (1 - k) + p.y * 0.18 * k;
      pulseArr[i * 3 + 2] = p.z * (1 - k) + p.z * 0.18 * k;
    });
    pulseGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  };

  const loop = () => {
    step();
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (running || reduce) return;
    running = true;
    t0 = performance.now() - (lastT * 1000);
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  // Only animate while the hero is on screen and the tab is visible.
  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !document.hidden) start(); else stop();
  });
  io.observe(container);
  const onVis = () => (document.hidden || !visible ? stop() : start());
  document.addEventListener("visibilitychange", onVis);

  if (reduce) {
    rig.updateMatrixWorld();
    step();
  } else {
    start();
  }

  return {
    dispose: () => {
      stop();
      io.disconnect();
      ro.disconnect();
      stopTheme();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      pGeo.dispose();
      pMat.dispose();
      lGeo.dispose();
      lMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      textures.forEach(tx => tx.dispose());
      sprites.forEach(s => s.material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
