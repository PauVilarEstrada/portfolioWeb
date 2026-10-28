import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  LineDashedMaterial,
  LineLoop,
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
 * under the pointer, circled by the tools Pau works with on two tilted
 * orbits, like a small planetary system. Nodes in front are larger and
 * sharper, nodes behind PV fade back; data pulses run from each node into
 * PV, and a node's name shows when the pointer is over it.
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
  glyphWidth: 3.1,
  glyphDepth: 0.35,
  spring: 0.045,
  damping: 0.86,
  repelRadius: 0.9,
  repelForce: 0.06,
  drift: 0.035,
  nodeScale: 0.6,
  nodeHover: 1.18,
  labelOffset: 0.4,
  labelHeight: 0.2,
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

/** Two orbits: the AI core close in, the company stack further out, turning the other way. */
const ORBITS = [
  { radius: 2.0, tiltX: 0.38, roll: -0.16, speed: 0.13, nodes: [0, 1, 2, 3, 4, 5] },
  { radius: 2.65, tiltX: 0.5, roll: 0.2, speed: -0.085, nodes: [6, 7, 8, 9, 10, 11, 12] },
];

/** A round white plate with the brand mark, or a text monogram. */
function nodeTexture(def) {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d");
  const r = S * 0.42;
  ctx.shadowColor = "rgba(12,22,17,0.18)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(12,22,17,0.1)";
  ctx.stroke();
  if (def.icon) {
    const p = new Path2D(def.icon.path);
    const size = r * 0.95;
    ctx.save();
    ctx.translate(S / 2 - size / 2, S / 2 - size / 2);
    ctx.scale(size / 24, size / 24);
    const hex = def.icon.hex.toUpperCase();
    ctx.fillStyle = hex === "FFFFFF" ? "#0c1611" : `#${hex}`;
    ctx.fill(p);
    ctx.restore();
  } else {
    ctx.fillStyle = "#0c1611";
    ctx.font = `700 ${Math.round(r * 0.56)}px "Archivo", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("M365", S / 2, S / 2 + 2);
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Name pill shown on hover: ink background, paper text. Returns the texture and its aspect ratio. */
function labelTexture(text, ink, paper) {
  const H = 72;
  const font = `600 34px "Archivo", system-ui, sans-serif`;
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  ctx.font = font;
  const W = Math.ceil(ctx.measureText(text).width) + 48;
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

  // ── Orbits ───────────────────────────────────────────────
  const net = new Group();
  rig.add(net);
  const nodeTextures = NODES.map(n => nodeTexture(n));
  const labels = NODES.map(n => labelTexture(n.label, colors.ink, colors.paper));
  const nodes = [];
  const pathMats = [];
  const pulseSets = [];
  ORBITS.forEach(orbit => {
    const group = new Group();
    group.rotation.set(orbit.tiltX, 0, orbit.roll);
    net.add(group);

    const path = [];
    const SEG = 160;
    for (let k = 0; k < SEG; k++) {
      const a = (k / SEG) * Math.PI * 2;
      path.push(Math.cos(a) * orbit.radius, 0, Math.sin(a) * orbit.radius);
    }
    const pathGeo = new BufferGeometry();
    pathGeo.setAttribute("position", new BufferAttribute(new Float32Array(path), 3));
    const pathMat = new LineDashedMaterial({ color: colors.ink, transparent: true, opacity: 0.22, dashSize: 0.07, gapSize: 0.07, depthWrite: false });
    const loop = new LineLoop(pathGeo, pathMat);
    loop.computeLineDistances();
    group.add(loop);
    pathMats.push(pathMat);

    orbit.nodes.forEach((idx, k) => {
      const sprite = new Sprite(new SpriteMaterial({ map: nodeTextures[idx], transparent: true, depthTest: false, depthWrite: false }));
      group.add(sprite);
      const label = new Sprite(new SpriteMaterial({ map: labels[idx].tex, transparent: true, depthTest: false, depthWrite: false, opacity: 0 }));
      label.scale.set(CFG.labelHeight * labels[idx].aspect, CFG.labelHeight, 1);
      group.add(label);
      nodes.push({ idx, orbit, sprite, label, base: (k / orbit.nodes.length) * Math.PI * 2, hover: 0, front: 0 });
    });

    // Pulses run from each node of this orbit into PV.
    const arr = new Float32Array(orbit.nodes.length * 3);
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(arr, 3));
    const mat = new PointsMaterial({ color: colors.green, size: 0.1, transparent: true, opacity: 0.9, depthWrite: false });
    const pts = new Points(geo, mat);
    pts.renderOrder = 2;
    group.add(pts);
    pulseSets.push({ orbit, arr, geo, mat, phase: orbit.nodes.map(() => Math.random()) });
  });
  points.renderOrder = 1;
  const sprites = nodes.map(n => n.sprite);

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
      rig.position.set(0, viewH * 0.25, 0);
      rig.scale.setScalar(Math.min(0.5, viewW / 7.4));
    } else {
      // Right of the hero copy, centred on the band between the nav and the rule
      rig.position.set(viewW * 0.31, viewH * 0.2, 0);
      rig.scale.setScalar(Math.min(0.62, Math.max(0.48, viewW / 17)));
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
    pathMats.forEach(m => m.color.set(colors.ink));
    pulseSets.forEach(p => p.mat.color.set(colors.green));
    nodes.forEach(n => {
      labels[n.idx].tex.dispose();
      labels[n.idx] = labelTexture(NODES[n.idx].label, colors.ink, colors.paper);
      n.label.material.map = labels[n.idx].tex;
      n.label.material.needsUpdate = true;
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

    net.rotation.y = tilt.y * 0.6;
    net.rotation.x = tilt.x * 0.5;
    points.rotation.y = tilt.y * 0.35;
    points.rotation.x = tilt.x * 0.25;

    // Hover: the node under the pointer grows and shows its name.
    let hovered = null;
    if (Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1) {
      const hits = raycaster.intersectObjects(sprites, false);
      if (hits.length) hovered = hits[0].object;
    }
    container.style.cursor = hovered ? "default" : "";

    nodes.forEach(n => {
      const { orbit } = n;
      const a = n.base + t * orbit.speed;
      const x = Math.cos(a) * orbit.radius;
      const z = Math.sin(a) * orbit.radius;
      n.front = Math.sin(a); // +1 nearest the camera, -1 behind PV
      const depth = (n.front + 1) / 2;
      n.hover += ((n.sprite === hovered ? 1 : 0) - n.hover) * 0.18;
      const size = CFG.nodeScale * (0.72 + depth * 0.36) * (1 + (CFG.nodeHover - 1) * n.hover);
      n.sprite.position.set(x, 0, z);
      n.sprite.scale.set(size, size, 1);
      n.sprite.material.opacity = 0.3 + depth * 0.7;
      n.sprite.renderOrder = n.front > 0 ? 3 : 0;
      n.label.position.set(x, -CFG.labelOffset * (0.8 + depth * 0.4), z);
      n.label.material.opacity = n.hover;
      n.label.renderOrder = 4;
    });

    pulseSets.forEach(set => {
      set.orbit.nodes.forEach((_, k) => {
        const n = nodes.find(m => m.orbit === set.orbit && m.idx === set.orbit.nodes[k]);
        const f = (set.phase[k] + t * CFG.pulseSpeed) % 1;
        const p = n.sprite.position;
        set.arr[k * 3] = p.x * (1 - f) * 0.92;
        set.arr[k * 3 + 1] = 0;
        set.arr[k * 3 + 2] = p.z * (1 - f) * 0.92;
      });
      set.geo.attributes.position.needsUpdate = true;
    });

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
      net.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      nodeTextures.forEach(tx => tx.dispose());
      labels.forEach(l => l.tex.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
