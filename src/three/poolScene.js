import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, HemisphereLight, DirectionalLight, PMREMGenerator,
  PlaneGeometry, BoxGeometry, CylinderGeometry, ConeGeometry, CircleGeometry, SpotLight, AdditiveBlending, SphereGeometry, CapsuleGeometry, RingGeometry, TorusGeometry,
  BufferGeometry, Float32BufferAttribute, LineSegments, LineBasicMaterial, InstancedMesh, Object3D, Mesh,
  MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, ShaderMaterial, Group, Vector2, Vector3, Vector4,
  CanvasTexture, SRGBColorSpace, RepeatWrapping, DoubleSide, MathUtils, PCFShadowMap, NeutralToneMapping,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { readThemeColors } from "./themeColors";

/**
 * Intro loader: a cut-away diorama of a water polo pool floating on the page,
 * with a stand of cheering fans, banners, flags, floodlights and a scoreboard.
 * The empty basin fills through two spouts, then two toy-like players surface:
 * a shooter in a white cap and the goalkeeper (Pau, red cap number 1). The
 * shooter fires at the top corner, the keeper tips it away and the ball flies
 * straight into the camera. `onDone("impact")` fires as it fills the screen.
 */

/** Timeline in seconds. */
const T = {
  fillStart: 0.15,
  fillEnd: 2.2,
  surface: 2.0,
  surfaced: 2.7,
  windUp: 2.75,
  throw: 3.05,
  release: 3.12,
  save: 3.55,
  impact: 4.1,
};

// Diorama, in metres. The pool runs along x; the front (+z) is cut away.
const POOL = { halfL: 6, halfW: 3.5, depth: 2.2, rim: 2, slab: 0.5, full: -0.16 };
const FLOOR = -POOL.depth;
const BASE = FLOOR - POOL.slab;
const FRONT = POOL.halfW;
const BACK = -POOL.halfW;
const GOAL = { x: 5.05, width: 2.6, height: 1, depth: 0.8 };
const KEEPER = new Vector3(4.35, 0, 0.1);
const SHOOTER = new Vector3(-0.6, 0, 0.75);
const GRAVITY = 9.8;
/** Players are drawn a little larger than life so they read at diorama scale. */
const PLAYER_SCALE = 1.3;
const BALL_R = 0.17;

export const clamp01 = t => Math.min(1, Math.max(0, t));
export const span = (t, a, b) => clamp01((t - a) / (b - a));
export const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeIn = t => t * t * t;
export const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = t => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
export const smoother = t => t * t * t * (t * (t * 6 - 15) + 10);

// ── Canvas textures ──

export const canvasTexture = (w, h, draw) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

/** Square pool tiles, n per row. */
export const drawTiles = (ctx, w, h, base, grout, n) => {
  ctx.fillStyle = grout;
  ctx.fillRect(0, 0, w, h);
  const s = w / n;
  ctx.fillStyle = base;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < Math.round(h / s); j++) ctx.fillRect(i * s + 1.5, j * s + 1.5, s - 3, s - 3);
  }
};

/** One texture repeat covers 2 m (8 × 25 cm tiles). */
export function tileTexture(repeatX, repeatY) {
  const tex = canvasTexture(256, 256, (ctx, w, h) => drawTiles(ctx, w, h, "#e4f5f8", "#bcdbe3", 8));
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  return tex;
}

/** Pool floor: tiles plus the dark lane lines with their T ends (px = pixels per metre). */
export function floorTexture(L = POOL.halfL * 2, W = POOL.halfW * 2, lanes = [-1.75, 0, 1.75], px = 128) {
  return canvasTexture(L * px, W * px, (ctx, w, h) => {
    drawTiles(ctx, w, h, "#e4f5f8", "#bcdbe3", L * 4);
    ctx.fillStyle = "#1c4f87";
    lanes.forEach(z => {
      const y = (z + W / 2) * px;
      ctx.fillRect(1.5 * px, y - 0.125 * px, (L - 3) * px, 0.25 * px);
      [1.5, L - 1.5].forEach(x => ctx.fillRect(x * px - 0.125 * px, y - 0.5 * px, 0.25 * px, px));
    });
  });
}

/** Deck: large pale slabs, one per metre. */
export function deckTexture(repeatX, repeatY, base) {
  const tex = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
  });
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  return tex;
}

/** Cap with the number on both sides and the back (the seam sits at the front). */
export const capTexture = (bg, number, ink) => canvasTexture(512, 256, (ctx, w, h) => {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = ink;
  ctx.font = '800 96px "Archivo", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  [0.25, 0.5, 0.75].forEach(u => ctx.fillText(number, u * w, h * 0.62));
});

export const ballTexture = () => canvasTexture(256, 128, (ctx, w, h) => {
  ctx.fillStyle = "#f9cf2e";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#2453d4";
  ctx.lineWidth = 10;
  [32, 96, 160, 224].forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 30, 40, x - 30, 88, x, h);
    ctx.stroke();
  });
});

/** Soft round shadow for the diorama to float over. */
const shadowTexture = () => canvasTexture(256, 256, (ctx, w, h) => {
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  g.addColorStop(0, "rgba(0,0,0,1)");
  g.addColorStop(0.55, "rgba(0,0,0,0.45)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
});

// ── Shaders ──

export const CAUSTIC_GLSL = /* glsl */ `
  float caustic(vec2 uv, float time) {
    vec2 p = mod(uv * 6.28318530718, 6.28318530718) - 250.0;
    vec2 i = p;
    float c = 1.0;
    float inten = 0.005;
    for (int n = 0; n < 4; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= 4.0;
    c = 1.17 - pow(c, 1.4);
    return pow(abs(c), 8.0);
  }
`;

/** Shared swell, plus rings around the two players (xz in uBodies, strength in uBodyAmp). */
export const HEIGHT_GLSL = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform vec4 uBodies;
  uniform vec2 uBodyAmp;
  float ring(vec2 p, vec2 c, float a) {
    float r = distance(p, c);
    return sin(r * 8.0 - uTime * 6.0) * 0.03 * exp(-r * 1.1) * a;
  }
  float height(vec2 p) {
    float h = sin(p.x * 1.2 + uTime * 1.4) * 0.5
            + cos(p.y * 1.7 + uTime * 1.1) * 0.4
            + sin((p.x + p.y) * 3.1 + uTime * 2.3) * 0.2
            + sin((p.x - p.y) * 5.3 - uTime * 3.0) * 0.08;
    return h * uAmp + ring(p, uBodies.xy, uBodyAmp.x) + ring(p, uBodies.zw, uBodyAmp.y);
  }
`;

export const surfaceShader = {
  vertex: /* glsl */ `
    ${HEIGHT_GLSL}
    varying vec3 vWorld;
    varying vec3 vN;
    void main() {
      vec4 w = modelMatrix * vec4(position, 1.0);
      float e = 0.05;
      float h0 = height(w.xz);
      float hx = height(w.xz + vec2(e, 0.0));
      float hz = height(w.xz + vec2(0.0, e));
      w.y += h0;
      vN = normalize(vec3(-(hx - h0) / e, 1.0, -(hz - h0) / e));
      vWorld = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragment: /* glsl */ `
    uniform float uDepth;
    uniform vec3 uShallow;
    uniform vec3 uDeep;
    uniform vec3 uSky;
    uniform vec3 uSun;
    varying vec3 vWorld;
    varying vec3 vN;
    void main() {
      vec3 n = normalize(vN);
      vec3 v = normalize(cameraPosition - vWorld);
      float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
      vec3 h = normalize(normalize(uSun) + v);
      float spec = pow(max(dot(n, h), 0.0), 160.0) * 1.1;
      float k = clamp(uDepth / 2.2, 0.0, 1.0);
      vec3 col = mix(uShallow, uDeep, 0.12 + 0.3 * k);
      col = mix(col, uSky, fres * 0.6) + spec;
      float alpha = clamp(mix(0.38, 0.76, k) + fres * 0.25 + spec, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

/** The cut face of the water: depth gradient, drifting light shafts, bubbles and a bright meniscus. */
const sectionShader = {
  vertex: /* glsl */ `
    ${HEIGHT_GLSL}
    uniform float uSpan;
    varying vec3 vWorld;
    varying float vEdge;
    void main() {
      vec4 w = modelMatrix * vec4(position, 1.0);
      float top = step(0.5, uv.y);
      w.y += height(w.xz) * top;
      vEdge = (1.0 - uv.y) * uSpan;
      vWorld = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragment: /* glsl */ `
    uniform float uTime;
    uniform float uSpan;
    uniform vec3 uTop;
    uniform vec3 uDeep;
    uniform vec3 uLine;
    varying vec3 vWorld;
    varying float vEdge;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
    void main() {
      float d = clamp(vEdge / 2.2, 0.0, 1.0);
      vec3 col = mix(uTop, uDeep, smoothstep(0.0, 1.0, d));
      float shaft = (sin(vWorld.x * 1.4 + vWorld.y * 0.7 + uTime * 0.5) * 0.5 + 0.5)
                  * (sin(vWorld.x * 3.1 - vWorld.y * 0.5 - uTime * 0.8) * 0.5 + 0.5);
      col += pow(shaft, 3.0) * 0.16 * (1.0 - d);
      vec2 g = vec2(vWorld.x * 2.4, vWorld.y * 2.4 - uTime * 0.9);
      vec2 id = floor(g);
      float r = hash(id);
      vec2 f = fract(g) - 0.5 + vec2(sin(uTime * 2.0 + r * 6.28) * 0.18, 0.0);
      float bubble = step(0.86, r) * (1.0 - smoothstep(0.05, 0.085, length(f))) * step(0.08, vEdge);
      col = mix(col, vec3(1.0), bubble * 0.55);
      float line = 1.0 - smoothstep(0.0, 0.07, vEdge);
      col = mix(col, uLine, line * 0.85);
      float alpha = mix(0.62, 0.94, d) + line * 0.3 + bubble * 0.3;
      gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

/** Adds animated caustics and a wet tint under the water line to a standard material. */
export function withCaustics(material, uniforms) {
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vCWorld;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvCWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>
        varying vec3 vCWorld;
        uniform float uCTime;
        uniform float uCLevel;
        ${CAUSTIC_GLSL}`)
      .replace("#include <color_fragment>", `#include <color_fragment>
        float cUnder = step(vCWorld.y, uCLevel);
        diffuseColor.rgb *= mix(vec3(1.0), vec3(0.72, 0.9, 0.96), cUnder * 0.65);`)
      .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
        vec2 cuv = vCWorld.y < -2.15 ? vCWorld.xz : vec2(vCWorld.x + vCWorld.z, vCWorld.y * 2.0);
        totalEmissiveRadiance += vec3(0.75, 0.95, 1.0) * caustic(cuv * 0.32, uCTime * 0.55) * 0.42 * cUnder;`);
  };
  return material;
}

// ── Builders ──

/** Wire net: back, top and both sides. */
export function netGeometry(w, h, d, step) {
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

export function buildGoal(side, mats) {
  const g = new Group();
  const { width: w, height: h, depth: d } = GOAL;
  const r = 0.065;
  const post = new CylinderGeometry(r, r, h, 16);
  [-w / 2, w / 2].forEach(z => {
    const m = new Mesh(post, mats.frame);
    m.position.set(0, h / 2, z);
    g.add(m);
  });
  const bar = new Mesh(new CylinderGeometry(r, r, w + r * 2, 16), mats.frame);
  bar.rotation.x = Math.PI / 2;
  bar.position.y = h;
  g.add(bar);
  g.add(new LineSegments(netGeometry(w, h, d, 0.18), mats.net));
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  g.position.x = side * GOAL.x;
  g.rotation.y = side > 0 ? 0 : Math.PI;
  return g;
}

/** Lane ropes along both long sides: red within 2 m of the goal, yellow to 5 m, white between. */
function buildRopes() {
  const spacing = 0.26;
  const z = [BACK + 0.32, FRONT - 0.32];
  const per = Math.floor((POOL.halfL * 2 - 0.5) / spacing);
  const geo = new SphereGeometry(0.09, 16, 12);
  geo.scale(1.3, 0.8, 0.8);
  const mesh = new InstancedMesh(geo, new MeshPhysicalMaterial({ roughness: 0.3, clearcoat: 0.6 }), per * z.length);
  const dummy = new Object3D();
  const colors = { red: new Color("#e0323b"), yellow: new Color("#f9cf2e"), white: new Color("#ffffff") };
  let i = 0;
  z.forEach(zz => {
    for (let k = 0; k < per; k++) {
      const x = -POOL.halfL + 0.25 + k * spacing;
      dummy.position.set(x, 0, zz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const fromGoal = GOAL.x - Math.abs(x);
      mesh.setColorAt(i, fromGoal < 2 ? colors.red : fromGoal < 5 ? colors.yellow : colors.white);
      i += 1;
    }
  });
  mesh.castShadow = true;
  return mesh;
}

/**
 * Toy-like water polo player, modelled facing +z: big head with a numbered
 * cap, ear guards and chin strap, a friendly face, rounded body and
 * bendable mitten arms; short legs for the eggbeater under the water.
 */
export function buildPlayer({ cap, capInk, guard, number, suit }) {
  const skin = new MeshPhysicalMaterial({ color: "#f2bf9a", roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.35 });
  const suitMat = new MeshPhysicalMaterial({ color: suit, roughness: 0.3, clearcoat: 0.6 });
  const capMat = new MeshPhysicalMaterial({ map: capTexture(cap, number, capInk), roughness: 0.3, clearcoat: 0.7 });
  const guardMat = new MeshPhysicalMaterial({ color: guard, roughness: 0.25, clearcoat: 0.8 });
  const eyeMat = new MeshPhysicalMaterial({ color: "#1a1410", roughness: 0.1, clearcoat: 1 });
  const strapMat = new MeshStandardMaterial({ color: "#f5f5f5", roughness: 0.5 });
  const blushMat = new MeshStandardMaterial({ color: "#f29a86", roughness: 0.7, transparent: true, opacity: 0.55 });

  const root = new Group();
  const body = new Group();
  root.add(body);
  const add = (parent, geo, mat, x = 0, y = 0, z = 0) => {
    const m = new Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    parent.add(m);
    return m;
  };

  add(body, new CapsuleGeometry(0.3, 0.35, 10, 28), skin, 0, -0.25, 0).scale.z = 0.86;
  add(body, new SphereGeometry(0.312, 36, 18, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), suitMat, 0, -0.425, 0).scale.z = 0.88;

  const head = new Group();
  head.position.y = 0.5;
  body.add(head);
  add(head, new SphereGeometry(0.3, 40, 30), skin);
  add(head, new SphereGeometry(0.312, 48, 24, Math.PI / 2, Math.PI * 2, 0, Math.PI * 0.55), capMat, 0, 0.01, -0.01);
  const guardGeo = new CylinderGeometry(0.105, 0.105, 0.07, 28);
  guardGeo.rotateZ(Math.PI / 2);
  [-1, 1].forEach(s => add(head, guardGeo, guardMat, s * 0.29, -0.035, -0.02));
  const strap = add(head, new TorusGeometry(0.308, 0.014, 8, 56, Math.PI), strapMat, 0, -0.035, 0);
  strap.rotation.set(-0.5, 0, Math.PI);
  const eye = new SphereGeometry(0.036, 18, 14);
  const brow = new CapsuleGeometry(0.012, 0.06, 4, 8);
  [-1, 1].forEach(s => {
    add(head, eye, eyeMat, s * 0.1, 0.02, 0.272).scale.set(1, 1.3, 0.55);
    const b = add(head, brow, eyeMat, s * 0.1, 0.11, 0.262);
    b.rotation.set(-0.3, 0, Math.PI / 2 + s * 0.22);
    add(head, new SphereGeometry(0.05, 14, 10), blushMat, s * 0.17, -0.07, 0.235).scale.set(1, 0.6, 0.3);
  });
  add(head, new SphereGeometry(0.04, 16, 12), skin, 0, -0.04, 0.3);
  const mouth = add(head, new TorusGeometry(0.055, 0.011, 6, 20, Math.PI * 0.8), eyeMat, 0, -0.115, 0.27);
  mouth.rotation.set(0.25, 0, Math.PI + Math.PI * 0.1);

  const upper = new CapsuleGeometry(0.1, 0.22, 6, 16);
  upper.translate(0, -0.11, 0);
  const fore = new CapsuleGeometry(0.095, 0.16, 6, 16);
  fore.translate(0, -0.08, 0);
  const hand = new SphereGeometry(0.125, 20, 16);
  const thumb = new SphereGeometry(0.05, 12, 10);
  const makeArm = s => {
    const shoulder = new Group();
    shoulder.position.set(s * 0.33, 0.1, 0);
    body.add(shoulder);
    add(shoulder, upper, skin);
    const elbow = new Group();
    elbow.position.y = -0.22;
    shoulder.add(elbow);
    add(elbow, fore, skin);
    const wrist = new Group();
    wrist.position.y = -0.16;
    elbow.add(wrist);
    add(wrist, hand, skin, 0, -0.09, 0).scale.set(1, 1.1, 0.78);
    add(wrist, thumb, skin, -s * 0.1, -0.04, 0.05);
    return { shoulder, elbow, wrist };
  };

  const thigh = new CapsuleGeometry(0.12, 0.18, 6, 14);
  thigh.translate(0, -0.09, 0);
  const shin = new CapsuleGeometry(0.11, 0.18, 6, 14);
  shin.translate(0, -0.09, 0);
  const foot = new CapsuleGeometry(0.085, 0.1, 6, 12);
  foot.rotateX(Math.PI / 2);
  foot.translate(0, -0.03, 0.08);
  const makeLeg = s => {
    const hip = new Group();
    hip.position.set(s * 0.14, -0.62, 0);
    body.add(hip);
    add(hip, thigh, skin);
    const knee = new Group();
    knee.position.y = -0.18;
    hip.add(knee);
    add(knee, shin, skin);
    const ankle = new Group();
    ankle.position.y = -0.18;
    knee.add(ankle);
    add(ankle, foot, skin);
    return { hip, knee };
  };

  return { root, body, head, right: makeArm(1), left: makeArm(-1), legs: [makeLeg(1), makeLeg(-1)] };
}

/** Arm poses: [shoulder x, shoulder z, elbow z, elbow x], mirrored by side. */
export const POSE = {
  down: [0.15, 0.35, 0.25, 0],
  ready: [-0.3, 1.25, 1.35, 0],
  reach: [-0.2, 2.8, 0.12, 0],
  brace: [-0.25, 1.85, 0.6, 0],
  scull: [-0.75, 0.85, 0.7, 0],
  cock: [0.75, 2.55, 0.9, 0.6],
  follow: [-1.35, 1.7, 0.15, 0],
};

export function poseArm(arm, s, a, b, k, wobble = 0) {
  const p = i => MathUtils.lerp(a[i], b[i], k);
  arm.shoulder.rotation.set(p(0), 0, s * (p(1) + wobble));
  arm.elbow.rotation.set(p(3), 0, s * p(2));
  arm.wrist.rotation.set(0, 0, s * wobble);
}

export function treadLegs(legs, t) {
  legs.forEach((leg, i) => {
    const s = i === 0 ? 1 : -1;
    const ph = t * 6.4 + i * Math.PI;
    leg.hip.rotation.set(-1.15 + Math.sin(ph) * 0.14, 0, s * 0.6);
    leg.knee.rotation.set(1.45 + Math.sin(ph) * 0.35, 0, s * Math.cos(ph) * 0.3);
  });
}

// ── Stands, crowd, banners, flags and scoreboard ──

const STANDS = { rows: 4, depth: 0.7, rise: 0.36, halfX: POOL.halfL + POOL.rim, front: BACK - POOL.rim };
const SHIRTS = ["#1f5fbf", "#1f5fbf", "#1f5fbf", "#f4f6f8", "#f4f6f8", "#f4f6f8", "#d42a32", "#f6c929", "#16233f"];
const SKIN = ["#f2c3a0", "#e0a47c", "#c68660", "#8d5a3b", "#f5d0b5"];
const pick = list => list[Math.floor(Math.random() * list.length)];

/** Senyera: nine stripes, five gold and four red. */
export const senyeraTexture = () => canvasTexture(270, 180, (ctx, w, h) => {
  for (let i = 0; i < 9; i++) {
    ctx.fillStyle = i % 2 ? "#da121a" : "#fcdd09";
    ctx.fillRect(0, (i * h) / 9, w, h / 9 + 1);
  }
});

/** Blue and white club stripes. */
export const clubTexture = () => canvasTexture(270, 180, (ctx, w, h) => {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 ? "#ffffff" : "#1f5fbf";
    ctx.fillRect((i * w) / 6, 0, w / 6 + 1, h);
  }
});

const bannerTexture = (text, bg, ink, edge) => canvasTexture(1024, 180, (ctx, w, h) => {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  if (edge) {
    ctx.strokeStyle = edge;
    ctx.lineWidth = 16;
    ctx.strokeRect(8, 8, w - 16, h - 16);
  }
  ctx.fillStyle = ink;
  ctx.font = '800 112px "Archivo", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + 6);
});

/** A flag on a pole; `update` waves the cloth. */
export function buildFlag(tex, w, h, poleH, poleMat) {
  const group = new Group();
  const pole = new Mesh(new CylinderGeometry(0.03, 0.03, poleH, 10), poleMat);
  pole.position.y = poleH / 2;
  pole.castShadow = true;
  group.add(pole);
  const geo = new PlaneGeometry(w, h, 18, 10);
  geo.translate(w / 2, 0, 0);
  const base = geo.attributes.position.array.slice();
  const cloth = new Mesh(geo, new MeshStandardMaterial({ map: tex, side: DoubleSide, roughness: 0.8 }));
  cloth.position.y = poleH - h / 2 - 0.04;
  cloth.castShadow = true;
  group.add(cloth);
  const update = (t, phase) => {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const u = x / w;
      p.setZ(i, Math.sin(u * 5 - t * 6 + phase + y * 1.5) * 0.12 * u);
      p.setY(i, y - u * u * 0.04);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();
  };
  return { group, update };
}

/** Fans standing on the rows: instanced bodies, heads and arms; `update` makes them cheer. */
function buildCrowd() {
  const fans = [];
  for (let r = 0; r < STANDS.rows; r++) {
    const y = STANDS.rise * (r + 1);
    const z = STANDS.front - STANDS.depth * (r + 0.5);
    for (let x = -STANDS.halfX + 0.45; x <= STANDS.halfX - 0.45; x += 0.5) {
      if (Math.random() < 0.14) continue;
      fans.push({
        x: x + (Math.random() - 0.5) * 0.12,
        y,
        z: z + (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
        clap: Math.random() < 0.4,
        shirt: pick(SHIRTS),
        skin: pick(SKIN),
      });
    }
  }
  const n = fans.length;
  const bodyGeo = new CapsuleGeometry(0.13, 0.2, 4, 12);
  bodyGeo.translate(0, 0.23, 0);
  const headGeo = new SphereGeometry(0.115, 16, 12);
  headGeo.translate(0, 0.6, 0);
  const armGeo = new CapsuleGeometry(0.042, 0.2, 4, 8);
  armGeo.translate(0, -0.13, 0);
  const bodies = new InstancedMesh(bodyGeo, new MeshStandardMaterial({ roughness: 0.6 }), n);
  const heads = new InstancedMesh(headGeo, new MeshStandardMaterial({ roughness: 0.5 }), n);
  const arms = new InstancedMesh(armGeo, new MeshStandardMaterial({ roughness: 0.6 }), n * 2);
  const c = new Color();
  fans.forEach((f, i) => {
    bodies.setColorAt(i, c.set(f.shirt));
    heads.setColorAt(i, c.set(f.skin));
    arms.setColorAt(i * 2, c.set(f.shirt));
    arms.setColorAt(i * 2 + 1, c);
  });
  const meshes = [bodies, heads, arms];
  meshes.forEach(m => {
    m.castShadow = true;
    m.frustumCulled = false;
  });
  const d = new Object3D();
  const update = (t, cheer) => {
    fans.forEach((f, i) => {
      const jump = cheer * Math.abs(Math.sin(t * 8 + f.phase)) * 0.2;
      const bob = Math.max(0, Math.sin(t * 3.2 + f.phase)) * 0.035 + jump;
      d.position.set(f.x, f.y + bob, f.z);
      d.rotation.set(0, 0, 0);
      d.updateMatrix();
      bodies.setMatrixAt(i, d.matrix);
      heads.setMatrixAt(i, d.matrix);
      [-1, 1].forEach((s, k) => {
        const wave = 2.55 + Math.sin(t * 7 + f.phase + k) * 0.35;
        const up = MathUtils.lerp(wave, 2.8 + Math.sin(t * 10 + f.phase) * 0.25, cheer);
        const clapping = f.clap && cheer === 0;
        d.position.set(f.x + s * 0.15, f.y + bob + 0.4, f.z);
        d.rotation.set(clapping ? -1.25 : 0, 0, clapping ? -s * Math.max(0, Math.sin(t * 9 + f.phase)) * 0.35 : s * up);
        d.updateMatrix();
        arms.setMatrixAt(i * 2 + k, d.matrix);
      });
    });
    meshes.forEach(m => { m.instanceMatrix.needsUpdate = true; });
  };
  return { meshes, fans, update };
}

/** Soft additive light cone; fades along its length and towards its edges. */
const beamShader = {
  vertex: /* glsl */ `
    uniform float uLength;
    varying float vAlong;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    void main() {
      vAlong = clamp(length(position) / uLength, 0.0, 1.0);
      vec4 w = modelMatrix * vec4(position, 1.0);
      vWorld = w.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,
  fragment: /* glsl */ `
    uniform vec3 uColor;
    uniform float uStrength;
    varying float vAlong;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    void main() {
      vec3 v = normalize(cameraPosition - vWorld);
      float edge = pow(abs(dot(normalize(vNormalW), v)), 1.6);
      float a = (1.0 - vAlong) * (1.0 - vAlong) * edge * uStrength;
      gl_FragColor = vec4(uColor * a, a);
    }`,
};

/** Floodlight mast with a six-lamp head; `aim` points the head, its beam and its spot light. */
function buildFloodlight(height, poleMat, strength) {
  const group = new Group();
  const mast = new Mesh(new CylinderGeometry(0.06, 0.09, height, 12), poleMat);
  mast.position.y = height / 2;
  mast.castShadow = true;
  group.add(mast);
  const head = new Group();
  head.position.y = height;
  group.add(head);
  const housing = new Mesh(new BoxGeometry(1.05, 0.66, 0.14), new MeshPhysicalMaterial({ color: "#26302b", roughness: 0.4, clearcoat: 0.4 }));
  housing.castShadow = true;
  head.add(housing);
  const lamp = new CircleGeometry(0.12, 24);
  const lampMat = new MeshBasicMaterial({ color: "#fff8e1", toneMapped: false });
  for (let i = 0; i < 6; i++) {
    const m = new Mesh(lamp, lampMat);
    m.position.set(((i % 3) - 1) * 0.32, (Math.floor(i / 3) - 0.5) * 0.3, 0.075);
    head.add(m);
  }
  const length = 9;
  const beamGeo = new ConeGeometry(1.9, length, 40, 1, true);
  beamGeo.translate(0, -length / 2, 0);
  beamGeo.rotateX(-Math.PI / 2);
  const beam = new Mesh(beamGeo, new ShaderMaterial({
    uniforms: { uLength: { value: length }, uColor: { value: new Color("#fff3d6") }, uStrength: { value: strength } },
    vertexShader: beamShader.vertex,
    fragmentShader: beamShader.fragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
  }));
  beam.renderOrder = 6;
  head.add(beam);
  const spot = new SpotLight("#fff4dc", 90, 0, 0.42, 0.7, 2);
  head.add(spot);
  head.add(spot.target);
  spot.target.position.set(0, 0, 1);
  const aim = point => {
    group.updateMatrixWorld(true);
    head.lookAt(point);
  };
  return { group, aim };
}

/** LED scoreboard on two posts; `draw` repaints the screen only when its content changes. */
function buildScoreboard(labels, height) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext("2d");
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  const font = (weight, size) => `${weight} ${size}px "Archivo", system-ui, sans-serif`;
  let last = "";
  const draw = (clock, flash) => {
    const key = `${clock}|${flash}`;
    if (key === last) return;
    last = key;
    const { width: w, height: h } = c;
    ctx.fillStyle = "#0b100d";
    ctx.fillRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#e9f1ec";
    ctx.font = font(700, 60);
    ctx.fillText(labels.home, w * 0.2, h * 0.15);
    ctx.fillText(labels.away, w * 0.8, h * 0.15);
    ctx.fillStyle = "#ffb627";
    ctx.font = font(800, 180);
    ctx.fillText("3", w * 0.2, h * 0.47);
    ctx.fillText("2", w * 0.8, h * 0.47);
    ctx.fillStyle = "#e9f1ec";
    ctx.font = font(700, 54);
    ctx.fillText("Q4", w * 0.5, h * 0.18);
    ctx.fillStyle = "#ff5a4e";
    ctx.font = font(700, 110);
    ctx.fillText(clock, w * 0.5, h * 0.47);
    ctx.fillStyle = flash === 1 ? "#3cbf63" : flash === 2 ? "#1f7a43" : "#15201a";
    ctx.fillRect(28, h * 0.74, w - 56, h * 0.2);
    ctx.fillStyle = flash ? "#ffffff" : "#3f5a4a";
    ctx.font = font(800, 66);
    ctx.fillText(flash ? labels.save : "WATERPOLO", w * 0.5, h * 0.845);
    tex.needsUpdate = true;
  };
  const frame = new MeshPhysicalMaterial({ color: "#1b2420", roughness: 0.4, clearcoat: 0.5 });
  const screen = new MeshBasicMaterial({ map: tex, toneMapped: false });
  const group = new Group();
  const W = 3.4;
  const H = 1.7;
  const board = new Mesh(new BoxGeometry(W, H, 0.18), [frame, frame, frame, frame, screen, frame]);
  board.castShadow = true;
  group.add(board);
  const postLen = height - H / 2;
  [-1.2, 1.2].forEach(x => {
    const post = new Mesh(new CylinderGeometry(0.06, 0.06, postLen, 12), frame);
    post.position.set(x, -H / 2 - postLen / 2, -0.03);
    post.castShadow = true;
    group.add(post);
  });
  draw("0:08", 0);
  return { group, draw };
}

// ── Scene ──

const DEFAULT_LABELS = { home: "PV", away: "RIVAL", save: "SAVE!" };

export function createPoolScene(container, { onDone, labels = DEFAULT_LABELS }) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    onDone();
    return { stop: () => {}, dispose: () => {} };
  }
  const mobile = container.clientWidth < 720;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.toneMapping = NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  container.appendChild(renderer.domElement);

  const colors = readThemeColors();
  const paper = new Color(colors.paper);
  const dark = paper.r + paper.g + paper.b < 1.2;
  const scene = new Scene();
  scene.background = paper;
  const pmrem = new PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envMap;
  scene.environmentIntensity = 0.55;

  const camera = new PerspectiveCamera(mobile ? 58 : 30, 1, 0.1, 200);

  const sunDir = new Vector3(-0.55, 1, 0.45).normalize();
  scene.add(new HemisphereLight("#ffffff", "#a9c6d4", 0.9));
  const sun = new DirectionalLight("#fff6ea", 2.2);
  sun.position.copy(sunDir).multiplyScalar(18);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 60 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  sun.shadow.radius = 5;
  scene.add(sun);
  scene.add(sun.target);

  const caustics = { uCTime: { value: 0 }, uCLevel: { value: FLOOR - 1 } };

  // ── The block: back block and end blocks over a floor slab; the front face is the cut ──
  const section = new MeshStandardMaterial({ color: dark ? "#2d3d35" : "#24332b", roughness: 0.85 });
  const deckBase = dark ? "#c9cfca" : "#efece5";
  const tileFace = (w, h) => withCaustics(new MeshStandardMaterial({ map: tileTexture(w / 2, h / 2), roughness: 0.35 }), caustics);
  const deckFace = (w, h) => new MeshStandardMaterial({ map: deckTexture(w, h, deckBase), roughness: 0.7 });
  const fullH = -BASE;
  const blocks = [
    // [size, centre, faces in BoxGeometry order: +x, -x, +y, -y, +z, -z]
    [[POOL.halfL * 2 + POOL.rim * 2, fullH, POOL.rim], [0, BASE / 2, BACK - POOL.rim / 2],
      s => [section, section, deckFace(s[0], s[2]), section, tileFace(s[0], fullH), section]],
    [[POOL.rim, fullH, POOL.halfW * 2], [-(POOL.halfL + POOL.rim / 2), BASE / 2, 0],
      s => [tileFace(s[2], fullH), section, deckFace(s[0], s[2]), section, section, section]],
    [[POOL.rim, fullH, POOL.halfW * 2], [POOL.halfL + POOL.rim / 2, BASE / 2, 0],
      s => [section, tileFace(s[2], fullH), deckFace(s[0], s[2]), section, section, section]],
  ];
  blocks.forEach(([size, pos, faces]) => {
    const m = new Mesh(new BoxGeometry(...size), faces(size));
    m.position.set(...pos);
    m.castShadow = true;
    m.receiveShadow = true;
    scene.add(m);
  });
  const floorMat = withCaustics(new MeshStandardMaterial({ map: floorTexture(), roughness: 0.35 }), caustics);
  const slab = new Mesh(new BoxGeometry(POOL.halfL * 2, POOL.slab, POOL.halfW * 2), [section, section, floorMat, section, section, section]);
  slab.position.set(0, FLOOR - POOL.slab / 2, 0);
  slab.receiveShadow = true;
  scene.add(slab);

  // Rounded white coping on the three walls.
  const coping = new MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.35, clearcoat: 0.4 });
  const copeR = 0.1;
  [
    [POOL.halfL * 2 + copeR * 2, 0, BACK, Math.PI / 2],
    [POOL.halfW * 2 + copeR, -POOL.halfL, copeR / 2, 0],
    [POOL.halfW * 2 + copeR, POOL.halfL, copeR / 2, 0],
  ].forEach(([len, x, z, rot]) => {
    const m = new Mesh(new CylinderGeometry(copeR, copeR, len, 16), coping);
    m.rotation.set(Math.PI / 2, 0, rot);
    m.position.set(x, 0, z);
    m.castShadow = true;
    scene.add(m);
  });

  // Contact shadow under the floating block.
  const ground = new Mesh(
    new PlaneGeometry(26, 15),
    new MeshBasicMaterial({ map: shadowTexture(), color: "#000000", transparent: true, opacity: dark ? 0.55 : 0.2, depthWrite: false }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, BASE - 0.9, -2.4);
  ground.scale.set(1.05, 1.35, 1);
  scene.add(ground);

  // ── Water: top surface and the cut section ──
  const height = {
    uTime: { value: 0 },
    uAmp: { value: 0.06 },
    uBodies: { value: new Vector4(KEEPER.x, KEEPER.z, SHOOTER.x, SHOOTER.z) },
    uBodyAmp: { value: new Vector2() },
  };
  const surfaceMat = new ShaderMaterial({
    uniforms: {
      ...height,
      uDepth: { value: 0 },
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
  const surface = new Mesh(new PlaneGeometry(POOL.halfL * 2, POOL.halfW * 2, mobile ? 72 : 144, mobile ? 42 : 84), surfaceMat);
  surface.rotation.x = -Math.PI / 2;
  surface.renderOrder = 2;
  scene.add(surface);

  const sectionMat = new ShaderMaterial({
    uniforms: {
      ...height,
      uSpan: { value: 0 },
      uTop: { value: new Color("#46c8e6") },
      uDeep: { value: new Color("#0a4f8c") },
      uLine: { value: new Color("#e8fbff") },
    },
    vertexShader: sectionShader.vertex,
    fragmentShader: sectionShader.fragment,
    transparent: true,
    depthWrite: false,
  });
  const sectionMesh = new Mesh(new PlaneGeometry(POOL.halfL * 2, 1, mobile ? 72 : 144, 1), sectionMat);
  sectionMesh.position.z = FRONT + 0.002;
  sectionMesh.renderOrder = 3;
  scene.add(sectionMesh);

  // ── Spouts on the back wall, pouring while the pool fills ──
  const SPOUTS = [-2.6, 2.6];
  const streamMat = new MeshPhysicalMaterial({ color: "#d8f4fb", roughness: 0.1, transparent: true, opacity: 0.85, depthWrite: false });
  const streamGeo = new CylinderGeometry(0.12, 0.16, 1, 18, 1, true);
  streamGeo.translate(0, -0.5, 0);
  const spoutZ = BACK + 0.28;
  const streams = SPOUTS.map(x => {
    const pipe = new Mesh(new CapsuleGeometry(0.1, 0.25, 6, 14), coping);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(x, -0.12, BACK + 0.12);
    pipe.castShadow = true;
    scene.add(pipe);
    const m = new Mesh(streamGeo, streamMat);
    m.position.set(x, -0.14, spoutZ);
    m.renderOrder = 4;
    scene.add(m);
    return m;
  });

  // ── Floating kit ──
  const mats = {
    frame: new MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.25, clearcoat: 0.6 }),
    net: new LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.6 }),
  };
  const goals = [buildGoal(1, mats), buildGoal(-1, mats)];
  goals.forEach(g => scene.add(g));
  const ropes = buildRopes();
  scene.add(ropes);

  // ── Stands behind the back deck ──
  const riser = new MeshStandardMaterial({ color: dark ? "#b9c0bb" : "#dcd8cf", roughness: 0.8 });
  for (let r = 0; r < STANDS.rows; r++) {
    const top = STANDS.rise * (r + 1);
    const size = [STANDS.halfX * 2, top - BASE, STANDS.depth];
    const seats = new MeshStandardMaterial({ map: deckTexture(size[0], 1, dark ? "#7d93b8" : "#a9c1e3"), roughness: 0.6 });
    const row = new Mesh(new BoxGeometry(...size), [section, section, seats, section, riser, section]);
    row.position.set(0, (top + BASE) / 2, STANDS.front - STANDS.depth * (r + 0.5));
    row.castShadow = true;
    row.receiveShadow = true;
    scene.add(row);
  }
  const parapet = new Mesh(new BoxGeometry(STANDS.halfX * 2, 0.55, 0.12), riser);
  parapet.position.set(0, 0.275, STANDS.front + 0.06);
  parapet.castShadow = true;
  scene.add(parapet);
  [
    ["VAMOS PAU!", "#1f5fbf", "#ffffff"],
    ["PAU #1", "#ffffff", "#1f5fbf", "#d42a32"],
    ["AMUNT PAU!", "#fcdd09", "#da121a"],
  ].forEach(([text, bg, ink, edge], i) => {
    const banner = new Mesh(new PlaneGeometry(2.4, 0.42), new MeshStandardMaterial({ map: bannerTexture(text, bg, ink, edge), roughness: 0.7 }));
    banner.position.set((i - 1) * 4.7, 0.29, STANDS.front + 0.125);
    banner.rotation.z = (i - 1) * 0.025;
    scene.add(banner);
  });

  const crowd = buildCrowd();
  crowd.meshes.forEach(m => scene.add(m));

  const poleMat = new MeshPhysicalMaterial({ color: "#e9ece9", roughness: 0.3, clearcoat: 0.5 });
  const standsTop = STANDS.rise * STANDS.rows;
  const standsBack = STANDS.front - STANDS.depth * STANDS.rows;
  const flags = [
    [senyeraTexture(), -STANDS.halfX + 0.25],
    [clubTexture(), STANDS.halfX - 1.6],
  ].map(([tex, x]) => {
    const flag = buildFlag(tex, 1.35, 0.9, 3.2, poleMat);
    flag.group.position.set(x, standsTop, standsBack + 0.25);
    scene.add(flag.group);
    return flag;
  });
  // A few fans wave small flags.
  const handFlags = crowd.fans.filter((_, i) => i % 17 === 6).map((fan, i) => {
    const flag = buildFlag(i % 2 ? clubTexture() : senyeraTexture(), 0.55, 0.36, 1, poleMat);
    flag.group.position.set(fan.x + 0.17, fan.y + 0.3, fan.z + 0.05);
    scene.add(flag.group);
    return { ...flag, phase: Math.random() * Math.PI * 2 };
  });

  // Floodlights on the back corners, aimed down at the water.
  [-1, 1].forEach(side => {
    const light = buildFloodlight(7.6, poleMat, dark ? 0.32 : 0.16);
    light.group.position.set(side * (STANDS.halfX - 0.35), BASE, standsBack - 0.45);
    scene.add(light.group);
    light.aim(new Vector3(side * 2.4, -0.4, 0.4));
  });

  const board = buildScoreboard(labels, 2.3);
  board.group.position.set(0, standsTop + 2.3, standsBack - 0.15);
  scene.add(board.group);

  // ── Players ──
  const keeper = buildPlayer({ cap: "#e0323b", capInk: "#ffffff", guard: "#c4232c", number: "1", suit: "#1d2c52" });
  keeper.root.position.copy(KEEPER);
  keeper.root.rotation.y = -Math.PI / 2; // faces the field (-x); its right arm is on the camera side
  scene.add(keeper.root);
  const shooter = buildPlayer({ cap: "#f6f6f2", capInk: "#1d2c52", guard: "#dfe3e8", number: "7", suit: "#1f7a43" });
  shooter.root.position.copy(SHOOTER);
  shooter.root.rotation.y = Math.PI / 2 + 0.12; // faces the keeper (+x); its left arm is on the camera side
  scene.add(shooter.root);
  [keeper.root, shooter.root].forEach(r => {
    r.visible = false;
    r.scale.setScalar(PLAYER_SCALE);
  });

  // ── Ball ──
  const ball = new Mesh(new SphereGeometry(BALL_R, 32, 20), new MeshPhysicalMaterial({ map: ballTexture(), roughness: 0.35, clearcoat: 0.6 }));
  ball.castShadow = true;
  ball.visible = false;
  scene.add(ball);
  const hand = new Vector3();
  const from = new Vector3();
  const ballState = { phase: "held", pos: new Vector3() };
  const aim = new Vector3();
  const target = new Vector3();

  // ── Splashes: rings on the water and droplets ──
  const ringGeo = new RingGeometry(0.2, 0.27, 56);
  const rings = Array.from({ length: 14 }, () => {
    const m = new Mesh(ringGeo, new MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, side: DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.visible = false;
    m.renderOrder = 5;
    m.userData = { born: -1, x: 0, z: 0, strength: 1 };
    scene.add(m);
    return m;
  });
  let ringNext = 0;
  const ripple = (now, x, z, strength = 1) => {
    const r = rings[ringNext];
    ringNext = (ringNext + 1) % rings.length;
    Object.assign(r.userData, { born: now, x, z, strength });
    r.visible = true;
  };

  const DROPS = 120;
  const drops = new InstancedMesh(new SphereGeometry(0.04, 10, 8), new MeshPhysicalMaterial({ color: "#eafaff", roughness: 0.1, clearcoat: 1 }), DROPS);
  drops.frustumCulled = false;
  const dropPos = new Float32Array(DROPS * 3);
  const dropVel = new Float32Array(DROPS * 3);
  const dropAlive = new Uint8Array(DROPS);
  const dummy = new Object3D();
  dummy.scale.setScalar(0);
  dummy.updateMatrix();
  for (let i = 0; i < DROPS; i++) drops.setMatrixAt(i, dummy.matrix);
  scene.add(drops);
  let dropNext = 0;
  const burst = (x, y, z, count, power) => {
    for (let n = 0; n < count; n++) {
      const i = dropNext;
      dropNext = (dropNext + 1) % DROPS;
      const a = Math.random() * Math.PI * 2;
      const sp = (0.4 + Math.random() * 0.9) * power;
      dropPos.set([x + Math.cos(a) * 0.2, y, z + Math.sin(a) * 0.2], i * 3);
      dropVel.set([Math.cos(a) * sp, (1.8 + Math.random() * 2) * power, Math.sin(a) * sp], i * 3);
      dropAlive[i] = 1;
    }
  };

  // ── Camera: one shot that slowly closes in on the goal ──
  const camFrom = mobile ? new Vector3(-6, 21, 41) : new Vector3(-14, 14, 31);
  const camTo = mobile ? new Vector3(-3, 15, 34) : new Vector3(-7, 9, 24);
  const lookFrom = mobile ? new Vector3(0, 0.2, -2.6) : new Vector3(0, 0, -2.6);
  const lookTo = mobile ? new Vector3(1, 0.2, -2.2) : new Vector3(1, 0.1, -2.2);
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
  const surfacedFlags = [false, false];
  let lastRipple = 0;
  let lastSpray = 0;
  let lastT = 0;
  const t0 = performance.now();

  const animatePlayer = (p, idx, t, level, startAt) => {
    const emerge = span(t, startAt, startAt + 0.7);
    p.root.visible = t >= startAt;
    if (!p.root.visible) return 0;
    p.root.position.y = MathUtils.lerp(level - 1.8, level - 0.1, easeOutBack(emerge)) + Math.sin(t * 5.2 + idx) * 0.03;
    treadLegs(p.legs, t + idx * 0.4);
    const headY = p.root.position.y + 0.5 * PLAYER_SCALE;
    if (!surfacedFlags[idx] && headY > level) {
      surfacedFlags[idx] = true;
      ripple(t, p.root.position.x, p.root.position.z, 1.5);
      ripple(t + 0.12, p.root.position.x, p.root.position.z, 1);
      burst(p.root.position.x, level, p.root.position.z, 30, 1);
    }
    return emerge;
  };

  const frame = () => {
    const t = (performance.now() - t0) / 1000;
    const dt = Math.min(0.05, t - lastT);
    lastT = t;

    // Water level.
    const fill = smoother(span(t, T.fillStart, T.fillEnd));
    const level = MathUtils.lerp(FLOOR + 0.02, POOL.full, fill);
    const depth = level - FLOOR;
    const wet = t > T.fillStart;
    surface.visible = sectionMesh.visible = wet;
    surface.position.y = level;
    sectionMesh.scale.y = depth;
    sectionMesh.position.y = FLOOR + depth / 2;
    height.uTime.value = t;
    height.uAmp.value = MathUtils.lerp(0.05, 0.02, fill);
    surfaceMat.uniforms.uDepth.value = depth;
    sectionMat.uniforms.uSpan.value = depth;
    caustics.uCTime.value = t;
    caustics.uCLevel.value = wet ? level : FLOOR - 1;
    goals.forEach(g => { g.position.y = level; });
    ropes.position.y = level;

    // Spouts.
    const pour = wet ? 1 - span(t, T.fillEnd - 0.35, T.fillEnd) : 0;
    streams.forEach(m => {
      m.visible = pour > 0;
      m.scale.y = Math.max(0.01, -0.14 - level);
      m.scale.x = m.scale.z = 0.35 + 0.65 * pour;
    });
    streamMat.opacity = 0.85 * pour;
    if (pour > 0 && t - lastSpray > 0.07) {
      lastSpray = t;
      SPOUTS.forEach(x => burst(x, level, spoutZ, 2, 0.45 * pour));
      if (Math.floor(t * 2.4) !== Math.floor((t - dt) * 2.4)) SPOUTS.forEach(x => ripple(t, x, spoutZ + 0.15, 0.6));
    }

    // Camera.
    const ck = smoother(span(t, 0, T.save + 0.4));
    camera.position.lerpVectors(camFrom, camTo, ck);
    camera.position.x += Math.sin(t * 0.7) * 0.04;
    look.lerpVectors(lookFrom, lookTo, easeInOut(span(t, 0, T.save + 0.4)));
    camera.lookAt(look);

    // Players.
    const kEmerge = animatePlayer(keeper, 0, t, level, T.surface + 0.1);
    const sEmerge = animatePlayer(shooter, 1, t, level, T.surface);
    height.uBodyAmp.value.set(kEmerge, sEmerge);

    if (keeper.root.visible) {
      const ready = easeOut(span(t, T.surface + 0.45, T.surfaced + 0.1));
      const reach = easeOut(span(t, T.save - 0.3, T.save));
      const wobble = Math.sin(t * 7) * 0.06 * (1 - reach);
      poseArm(keeper.right, 1, POSE.down, POSE.ready, ready, wobble);
      poseArm(keeper.left, -1, POSE.down, POSE.ready, ready, -wobble);
      if (reach > 0) {
        poseArm(keeper.right, 1, POSE.ready, POSE.reach, reach);
        poseArm(keeper.left, -1, POSE.ready, POSE.brace, reach);
      }
      keeper.body.position.y = reach * 0.42;
      keeper.body.rotation.z = -reach * 0.32;
      keeper.root.position.z = KEEPER.z + reach * 0.3;
      if (surfacedFlags[0] && reach === 0 && t - lastRipple > 0.8) {
        lastRipple = t;
        ripple(t, KEEPER.x, keeper.root.position.z, 0.5);
      }
    }

    if (shooter.root.visible) {
      const cock = easeInOut(span(t, T.surface + 0.2, T.windUp + 0.25));
      const swing = easeIn(span(t, T.throw - 0.1, T.release + 0.06));
      poseArm(shooter.right, 1, POSE.down, POSE.scull, easeOut(span(t, T.surface + 0.2, T.surfaced)), Math.sin(t * 6) * 0.08);
      poseArm(shooter.left, -1, POSE.down, POSE.cock, cock);
      if (swing > 0) poseArm(shooter.left, -1, POSE.cock, POSE.follow, swing);
      shooter.body.rotation.x = swing * 0.3 - cock * 0.12;
      shooter.body.position.y = cock * 0.12 * (1 - swing);
    }

    // Ball: held overhead by the shooter, thrown at the top corner, met by the keeper's hand.
    if (shooter.root.visible && ballState.phase === "held") {
      ball.visible = true;
      shooter.left.wrist.getWorldPosition(hand);
      ball.position.copy(hand);
      ball.position.y += 0.12;
      if (t >= T.release) {
        ballState.phase = "flight";
        from.copy(ball.position);
      }
    } else if (ballState.phase === "flight") {
      keeper.right.wrist.getWorldPosition(hand);
      hand.y += 0.14;
      const k = span(t, T.release, T.save);
      ball.position.lerpVectors(from, hand, k);
      ball.position.y += Math.sin(k * Math.PI) * 0.45;
      ball.rotation.z -= dt * 16;
      if (k >= 1) {
        ballState.phase = "incoming";
        ballState.pos.copy(hand);
        burst(hand.x, hand.y, hand.z, 12, 0.45);
      }
    } else if (ballState.phase === "incoming") {
      // Tipped away by the keeper, straight into the lens.
      const k = span(t, T.save, T.impact);
      camera.getWorldDirection(aim);
      target.copy(camera.position).addScaledVector(aim, 0.22);
      ball.position.lerpVectors(ballState.pos, target, Math.pow(k, 2.2));
      ball.position.y += Math.sin(k * Math.PI) * 0.8 * (1 - k);
      ball.rotation.x += dt * 14;
      ball.rotation.y += dt * 9;
    }

    // Crowd, flags and scoreboard.
    const cheer = span(t, T.save, T.save + 0.2);
    crowd.update(t, cheer);
    flags.forEach((f, i) => f.update(t, i * 1.7));
    handFlags.forEach(f => {
      f.update(t, f.phase);
      f.group.rotation.z = Math.sin(t * 3 + f.phase) * 0.4 - 0.1;
    });
    board.draw(`0:0${Math.max(0, Math.ceil(8 - t))}`, t >= T.save ? (Math.floor((t - T.save) * 8) % 2) + 1 : 0);

    // Rings and droplets.
    rings.forEach(r => {
      const { born, x, z, strength } = r.userData;
      if (born < 0 || t < born) return;
      const age = t - born;
      r.position.set(x, level + 0.015, z);
      r.scale.setScalar(1 + age * 4 * strength);
      r.material.opacity = Math.max(0, 0.8 - age * 0.9) * Math.min(1, strength);
      if (r.material.opacity === 0) { r.userData.born = -1; r.visible = false; }
    });
    for (let i = 0; i < DROPS; i++) {
      if (!dropAlive[i]) continue;
      const j = i * 3;
      dropVel[j + 1] -= GRAVITY * dt;
      dropPos[j] += dropVel[j] * dt;
      dropPos[j + 1] += dropVel[j + 1] * dt;
      dropPos[j + 2] += dropVel[j + 2] * dt;
      if (dropPos[j + 1] < level) dropAlive[i] = 0;
      dummy.position.set(dropPos[j], dropPos[j + 1], dropPos[j + 2]);
      dummy.scale.setScalar(dropAlive[i] ? 1 : 0);
      dummy.updateMatrix();
      drops.setMatrixAt(i, dummy.matrix);
    }
    drops.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
    if (t >= T.impact) {
      if (!finished) { finished = true; onDone("impact"); }
      return;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    /** Freeze on the current frame (used while the loader slides away). */
    stop: () => cancelAnimationFrame(raf),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
