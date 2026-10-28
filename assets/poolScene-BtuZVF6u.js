import{S as ut,B as Ge,M as X,a as Et,P as Wt,b as y,I as De,O as Fe,c as zt,W as At,N as Ct,d as kt,r as Lt,C as j,e as It,f as Rt,V as A,H as Bt,D as Gt,g as O,h as ve,i as Le,j as tt,k as Ot,l as ot,m as Dt,n as q,L as Ft,o as F,R as _t,p as jt,q as Ut,s as Nt,G as _,t as Vt,T as at,u as Ee,v as ht,w as Ht,F as qt}from"./themeColors-BPJWbFoY.js";class Yt extends ut{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const s=new Ge;s.deleteAttribute("uv");const o=new X({side:Et}),n=new X,l=new Wt(16777215,900,28,2);l.position.set(.418,16.199,.3),this.add(l);const r=new y(s,o);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const c=new De(s,n,6),t=new Fe;t.position.set(-10.906,2.009,1.846),t.rotation.set(0,-.195,0),t.scale.set(2.328,7.905,4.651),t.updateMatrix(),c.setMatrixAt(0,t.matrix),t.position.set(-5.607,-.754,-.758),t.rotation.set(0,.994,0),t.scale.set(1.97,1.534,3.955),t.updateMatrix(),c.setMatrixAt(1,t.matrix),t.position.set(6.167,.857,7.803),t.rotation.set(0,.561,0),t.scale.set(3.927,6.285,3.687),t.updateMatrix(),c.setMatrixAt(2,t.matrix),t.position.set(-2.017,.018,6.124),t.rotation.set(0,.333,0),t.scale.set(2.002,4.566,2.064),t.updateMatrix(),c.setMatrixAt(3,t.matrix),t.position.set(2.291,-.756,-2.621),t.rotation.set(0,-.286,0),t.scale.set(1.546,1.552,1.496),t.updateMatrix(),c.setMatrixAt(4,t.matrix),t.position.set(-2.193,-.369,-5.547),t.rotation.set(0,.516,0),t.scale.set(3.875,3.487,2.986),t.updateMatrix(),c.setMatrixAt(5,t.matrix),this.add(c);const v=new y(s,ie(50));v.position.set(-16.116,14.37,8.208),v.scale.set(.1,2.428,2.739),this.add(v);const b=new y(s,ie(50));b.position.set(-16.109,18.021,-8.207),b.scale.set(.1,2.425,2.751),this.add(b);const M=new y(s,ie(17));M.position.set(14.904,12.198,-1.832),M.scale.set(.15,4.265,6.331),this.add(M);const L=new y(s,ie(43));L.position.set(-.462,8.89,14.52),L.scale.set(4.38,5.441,.088),this.add(L);const E=new y(s,ie(20));E.position.set(3.235,11.486,-12.541),E.scale.set(2.5,2,.1),this.add(E);const W=new y(s,ie(100));W.position.set(0,20,0),W.scale.set(1,.1,1),this.add(W)}dispose(){const s=new Set;this.traverse(o=>{o.isMesh&&(s.add(o.geometry),s.add(o.material))});for(const o of s)o.dispose()}}function ie(a){return new zt({color:0,emissive:16777215,emissiveIntensity:a})}const w={fillStart:.15,fillEnd:2.2,surface:2,surfaced:2.7,windUp:2.75,throw:3.05,release:3.12,save:3.55,hold:3.8,recover:4.25,end:4.75},h={halfL:6,halfW:3.5,rim:2,slab:.5,full:-.16},oe=-2.2,Te=oe-h.slab,mt=h.halfW,we=-3.5,Oe={x:5.05,width:2.6,height:1,depth:.8},me=new A(4.35,0,.1),Ie=new A(-.6,0,.75),nt=9.8,st=1.3,Re=.17,$t=a=>Math.min(1,Math.max(0,a)),G=(a,s,o)=>$t((a-s)/(o-s)),Be=a=>1-Math.pow(1-a,3),Kt=a=>a*a*a,rt=a=>a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2,Zt=a=>1+2.4*Math.pow(a-1,3)+1.4*Math.pow(a-1,2),it=a=>a*a*a*(a*(a*6-15)+10),ce=(a,s,o)=>{const n=document.createElement("canvas");n.width=a,n.height=s,o(n.getContext("2d"),a,s);const l=new Ut(n);return l.colorSpace=Nt,l.anisotropy=8,l},wt=(a,s,o,n,l,r)=>{a.fillStyle=l,a.fillRect(0,0,s,o);const c=s/r;a.fillStyle=n;for(let t=0;t<r;t++)for(let v=0;v<Math.round(o/c);v++)a.fillRect(t*c+1.5,v*c+1.5,c-3,c-3)};function Xt(a,s){const o=ce(256,256,(n,l,r)=>wt(n,l,r,"#e4f5f8","#bcdbe3",8));return o.wrapS=o.wrapT=ht,o.repeat.set(a,s),o}function Jt(){const a=h.halfL*2,s=h.halfW*2,o=128;return ce(a*o,s*o,(n,l,r)=>{wt(n,l,r,"#e4f5f8","#bcdbe3",a*4),n.fillStyle="#1c4f87",[-1.75,0,1.75].forEach(c=>{const t=(c+h.halfW)*o;n.fillRect(1.5*o,t-.125*o,(a-3)*o,.25*o),[1.5,a-1.5].forEach(v=>n.fillRect(v*o-.125*o,t-.5*o,.25*o,o))})})}function Qt(a,s,o){const n=ce(256,256,(l,r,c)=>{l.fillStyle=o,l.fillRect(0,0,r,c),l.strokeStyle="rgba(0,0,0,0.06)",l.lineWidth=2,l.strokeRect(1,1,r-2,c-2)});return n.wrapS=n.wrapT=ht,n.repeat.set(a,s),n}const eo=(a,s,o)=>ce(512,256,(n,l,r)=>{n.fillStyle=a,n.fillRect(0,0,l,r),n.fillStyle=o,n.font='800 96px "Archivo", system-ui, sans-serif',n.textAlign="center",n.textBaseline="middle",[.25,.5,.75].forEach(c=>n.fillText(s,c*l,r*.62))}),to=()=>ce(256,128,(a,s,o)=>{a.fillStyle="#f9cf2e",a.fillRect(0,0,s,o),a.strokeStyle="#2453d4",a.lineWidth=10,[32,96,160,224].forEach(n=>{a.beginPath(),a.moveTo(n,0),a.bezierCurveTo(n+30,40,n-30,88,n,o),a.stroke()})}),oo=()=>ce(256,256,(a,s,o)=>{const n=a.createRadialGradient(s/2,o/2,0,s/2,o/2,s/2);n.addColorStop(0,"rgba(0,0,0,1)"),n.addColorStop(.55,"rgba(0,0,0,0.45)"),n.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=n,a.fillRect(0,0,s,o)}),ao=`
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
`,vt=`
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
`,ct={vertex:`
    ${vt}
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
    }`,fragment:`
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
    }`},lt={vertex:`
    ${vt}
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
    }`,fragment:`
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
    }`};function ft(a,s){return a.onBeforeCompile=o=>{Object.assign(o.uniforms,s),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
vCWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vCWorld;
        uniform float uCTime;
        uniform float uCLevel;
        ${ao}`).replace("#include <color_fragment>",`#include <color_fragment>
        float cUnder = step(vCWorld.y, uCLevel);
        diffuseColor.rgb *= mix(vec3(1.0), vec3(0.72, 0.9, 0.96), cUnder * 0.65);`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        vec2 cuv = vCWorld.y < -2.15 ? vCWorld.xz : vec2(vCWorld.x + vCWorld.z, vCWorld.y * 2.0);
        totalEmissiveRadiance += vec3(0.75, 0.95, 1.0) * caustic(cuv * 0.32, uCTime * 0.55) * 0.42 * cUnder;`)},a}function no(a,s,o,n){const l=[],r=(t,v)=>l.push(...t,...v);for(let t=0;t<=s+1e-6;t+=n)r([o,t,-2.6/2],[o,t,a/2]);for(let t=-2.6/2;t<=a/2+1e-6;t+=n)r([o,0,t],[o,s,t]),r([0,s,t],[o,s,t]);for(let t=0;t<=o+1e-6;t+=n)r([t,s,-2.6/2],[t,s,a/2]),r([t,0,-2.6/2],[t,s,-2.6/2]),r([t,0,a/2],[t,s,a/2]);const c=new Ht;return c.setAttribute("position",new qt(l,3)),c}function dt(a,s){const o=new _,{width:n,height:l,depth:r}=Oe,c=.065,t=new ve(c,c,l,16);[-2.6/2,n/2].forEach(M=>{const L=new y(t,s.frame);L.position.set(0,l/2,M),o.add(L)});const v=new y(new ve(c,c,n+c*2,16),s.frame);v.rotation.x=Math.PI/2,v.position.y=l,o.add(v);const b=new y(new q(.09,n,6,14),s.float);return b.rotation.x=Math.PI/2,b.position.set(r*.55,.02,0),o.add(b),o.add(new Vt(no(n,l,r,.18),s.net)),o.traverse(M=>{M.isMesh&&(M.castShadow=!0)}),o.position.x=a*Oe.x,o.rotation.y=a>0?0:Math.PI,o}function so(){const s=[we+.32,mt-.32],o=Math.floor((h.halfL*2-.5)/.26),n=new F(.09,16,12);n.scale(1.3,.8,.8);const l=new De(n,new O({roughness:.3,clearcoat:.6}),o*s.length),r=new Fe,c={red:new j("#e0323b"),yellow:new j("#f9cf2e"),white:new j("#ffffff")};let t=0;return s.forEach(v=>{for(let b=0;b<o;b++){const M=-5.75+b*.26;r.position.set(M,0,v),r.updateMatrix(),l.setMatrixAt(t,r.matrix);const L=Oe.x-Math.abs(M);l.setColorAt(t,L<2?c.red:L<5?c.yellow:c.white),t+=1}}),l.castShadow=!0,l}function pt({cap:a,capInk:s,guard:o,number:n,suit:l}){const r=new O({color:"#f2bf9a",roughness:.42,clearcoat:.35,clearcoatRoughness:.35}),c=new O({color:l,roughness:.3,clearcoat:.6}),t=new O({map:eo(a,n,s),roughness:.3,clearcoat:.7}),v=new O({color:o,roughness:.25,clearcoat:.8}),b=new O({color:"#1a1410",roughness:.1,clearcoat:1}),M=new X({color:"#f5f5f5",roughness:.5}),L=new X({color:"#f29a86",roughness:.7,transparent:!0,opacity:.55}),E=new _,W=new _;E.add(W);const f=(P,T,z,C=0,We=0,ye=0)=>{const J=new y(T,z);return J.position.set(C,We,ye),J.castShadow=!0,P.add(J),J};f(W,new q(.3,.35,10,28),r,0,-.25,0).scale.z=.86,f(W,new F(.312,36,18,0,Math.PI*2,Math.PI*.45,Math.PI*.55),c,0,-.425,0).scale.z=.88;const I=new _;I.position.y=.5,W.add(I),f(I,new F(.3,40,30),r),f(I,new F(.312,48,24,Math.PI/2,Math.PI*2,0,Math.PI*.55),t,0,.01,-.01);const ae=new ve(.105,.105,.07,28);ae.rotateZ(Math.PI/2),[-1,1].forEach(P=>f(I,ae,v,P*.29,-.035,-.02)),f(I,new at(.308,.014,8,56,Math.PI),M,0,-.035,0).rotation.set(-.5,0,Math.PI);const Y=new F(.036,18,14),_e=new q(.012,.06,4,8);[-1,1].forEach(P=>{f(I,Y,b,P*.1,.02,.272).scale.set(1,1.3,.55),f(I,_e,b,P*.1,.11,.262).rotation.set(-.3,0,Math.PI/2+P*.22),f(I,new F(.05,14,10),L,P*.17,-.07,.235).scale.set(1,.6,.3)}),f(I,new F(.04,16,12),r,0,-.04,.3),f(I,new at(.055,.011,6,20,Math.PI*.8),b,0,-.115,.27).rotation.set(.25,0,Math.PI+Math.PI*.1);const ne=new q(.1,.22,6,16);ne.translate(0,-.11,0);const le=new q(.095,.16,6,16);le.translate(0,-.08,0);const U=new F(.125,20,16),fe=new F(.05,12,10),$=P=>{const T=new _;T.position.set(P*.33,.1,0),W.add(T),f(T,ne,r);const z=new _;z.position.y=-.22,T.add(z),f(z,le,r);const C=new _;return C.position.y=-.16,z.add(C),f(C,U,r,0,-.09,0).scale.set(1,1.1,.78),f(C,fe,r,-P*.1,-.04,.05),{shoulder:T,elbow:z,wrist:C}},de=new q(.12,.18,6,14);de.translate(0,-.09,0);const K=new q(.11,.18,6,14);K.translate(0,-.09,0);const se=new q(.085,.1,6,12);se.rotateX(Math.PI/2),se.translate(0,-.03,.08);const N=P=>{const T=new _;T.position.set(P*.14,-.62,0),W.add(T),f(T,de,r);const z=new _;z.position.y=-.18,T.add(z),f(z,K,r);const C=new _;return C.position.y=-.18,z.add(C),f(C,se,r),{hip:T,knee:z}};return{root:E,body:W,head:I,right:$(1),left:$(-1),legs:[N(1),N(-1)]}}const R={down:[.15,.35,.25,0],ready:[-.3,1.25,1.35,0],reach:[-.2,2.8,.12,0],brace:[-.25,1.85,.6,0],scull:[-.75,.85,.7,0],cock:[.75,2.55,.9,.6],follow:[-1.35,1.7,.15,0]};function te(a,s,o,n,l,r=0){const c=t=>Ee.lerp(o[t],n[t],l);a.shoulder.rotation.set(c(0),0,s*(c(1)+r)),a.elbow.rotation.set(c(3),0,s*c(2)),a.wrist.rotation.set(0,0,s*r)}function ro(a,s){a.forEach((o,n)=>{const l=n===0?1:-1,r=s*6.4+n*Math.PI;o.hip.rotation.set(-1.15+Math.sin(r)*.14,0,l*.6),o.knee.rotation.set(1.45+Math.sin(r)*.35,0,l*Math.cos(r)*.3)})}function co(a,{onDone:s}){let o;try{o=new At({antialias:!0,alpha:!1})}catch{return s(),{stop:()=>{},dispose:()=>{}}}const n=a.clientWidth<720;o.setPixelRatio(Math.min(window.devicePixelRatio||1,n?1.5:2)),o.toneMapping=Ct,o.shadowMap.enabled=!0,o.shadowMap.type=kt,a.appendChild(o.domElement);const l=Lt(),r=new j(l.paper),c=r.r+r.g+r.b<1.2,t=new ut;t.background=r;const v=new It(o),b=v.fromScene(new Yt,.04).texture;t.environment=b,t.environmentIntensity=.55;const M=new Rt(n?58:30,1,.1,200),L=new A(-.55,1,.45).normalize();t.add(new Bt("#ffffff","#a9c6d4",.9));const E=new Gt("#fff6ea",2.2);E.position.copy(L).multiplyScalar(18),E.castShadow=!0,E.shadow.mapSize.set(n?1024:2048,n?1024:2048),Object.assign(E.shadow.camera,{left:-10,right:10,top:9,bottom:-9,near:1,far:45}),E.shadow.bias=-4e-4,E.shadow.normalBias=.03,E.shadow.radius=5,t.add(E),t.add(E.target);const W={uCTime:{value:0},uCLevel:{value:oe-1}},f=new X({color:c?"#2d3d35":"#24332b",roughness:.85}),I=c?"#c9cfca":"#efece5",ae=(e,d)=>ft(new X({map:Xt(e/2,d/2),roughness:.35}),W),ge=(e,d)=>new X({map:Qt(e,d,I),roughness:.7}),Y=2.7;[[[h.halfL*2+h.rim*2,Y,h.rim],[0,Te/2,we-h.rim/2],e=>[f,f,ge(e[0],e[2]),f,ae(e[0],Y),f]],[[h.rim,Y,h.halfW*2],[-7,Te/2,0],e=>[ae(e[2],Y),f,ge(e[0],e[2]),f,f,f]],[[h.rim,Y,h.halfW*2],[h.halfL+h.rim/2,Te/2,0],e=>[f,ae(e[2],Y),ge(e[0],e[2]),f,f,f]]].forEach(([e,d,m])=>{const u=new y(new Ge(...e),m(e));u.position.set(...d),u.castShadow=!0,u.receiveShadow=!0,t.add(u)});const je=ft(new X({map:Jt(),roughness:.35}),W),ne=new y(new Ge(h.halfL*2,h.slab,h.halfW*2),[f,f,je,f,f,f]);ne.position.set(0,oe-h.slab/2,0),ne.receiveShadow=!0,t.add(ne);const le=new O({color:"#ffffff",roughness:.35,clearcoat:.4}),U=.1;[[h.halfL*2+U*2,0,we,Math.PI/2],[h.halfW*2+U,-6,U/2,0],[h.halfW*2+U,h.halfL,U/2,0]].forEach(([e,d,m,u])=>{const x=new y(new ve(U,U,e,16),le);x.rotation.set(Math.PI/2,0,u),x.position.set(d,0,m),x.castShadow=!0,t.add(x)});const fe=new y(new Le(26,15),new tt({map:oo(),color:"#000000",transparent:!0,opacity:c?.55:.2,depthWrite:!1}));fe.rotation.x=-Math.PI/2,fe.position.y=Te-.9,t.add(fe);const $={uTime:{value:0},uAmp:{value:.06},uBodies:{value:new Ot(me.x,me.z,Ie.x,Ie.z)},uBodyAmp:{value:new Dt}},de=new ot({uniforms:{...$,uDepth:{value:0},uShallow:{value:new j("#3cc5e6")},uDeep:{value:new j("#0b6aae")},uSky:{value:r.clone().lerp(new j("#ffffff"),.7)},uSun:{value:L}},vertexShader:ct.vertex,fragmentShader:ct.fragment,transparent:!0,depthWrite:!1}),K=new y(new Le(h.halfL*2,h.halfW*2,n?72:144,n?42:84),de);K.rotation.x=-Math.PI/2,K.renderOrder=2,t.add(K);const se=new ot({uniforms:{...$,uSpan:{value:0},uTop:{value:new j("#46c8e6")},uDeep:{value:new j("#0a4f8c")},uLine:{value:new j("#e8fbff")}},vertexShader:lt.vertex,fragmentShader:lt.fragment,transparent:!0,depthWrite:!1}),N=new y(new Le(h.halfL*2,1,n?72:144,1),se);N.position.z=mt+.002,N.renderOrder=3,t.add(N);const P=[-2.6,2.6],T=new O({color:"#d8f4fb",roughness:.1,transparent:!0,opacity:.85,depthWrite:!1}),z=new ve(.12,.16,1,18,1,!0);z.translate(0,-.5,0);const C=we+.28,We=P.map(e=>{const d=new y(new q(.1,.25,6,14),le);d.rotation.x=Math.PI/2,d.position.set(e,-.12,we+.12),d.castShadow=!0,t.add(d);const m=new y(z,T);return m.position.set(e,-.14,C),m.renderOrder=4,t.add(m),m}),ye={frame:new O({color:"#ffffff",roughness:.25,clearcoat:.6}),float:new O({color:"#f9cf2e",roughness:.3,clearcoat:.6}),net:new Ft({color:"#ffffff",transparent:!0,opacity:.6})},J=[dt(1,ye),dt(-1,ye)];J.forEach(e=>t.add(e));const Ue=so();t.add(Ue);const k=pt({cap:"#e0323b",capInk:"#ffffff",guard:"#c4232c",number:"1",suit:"#1d2c52"});k.root.position.copy(me),k.root.rotation.y=-Math.PI/2,t.add(k.root);const B=pt({cap:"#f6f6f2",capInk:"#1d2c52",guard:"#dfe3e8",number:"7",suit:"#1f7a43"});B.root.position.copy(Ie),B.root.rotation.y=Math.PI/2+.12,t.add(B.root),[k.root,B.root].forEach(e=>{e.visible=!1,e.scale.setScalar(st)});const S=new y(new F(Re,32,20),new O({map:to(),roughness:.35,clearcoat:.6}));S.castShadow=!0,S.visible=!1,t.add(S);const V=new A,Ne=new A,g={phase:"held",pos:new A,vel:new A,at:0},gt=new _t(.2,.27,56),ze=Array.from({length:14},()=>{const e=new y(gt,new tt({color:"#ffffff",transparent:!0,opacity:0,side:jt,depthWrite:!1}));return e.rotation.x=-Math.PI/2,e.visible=!1,e.renderOrder=5,e.userData={born:-1,x:0,z:0,strength:1},t.add(e),e});let Ae=0;const pe=(e,d,m,u=1)=>{const x=ze[Ae];Ae=(Ae+1)%ze.length,Object.assign(x.userData,{born:e,x:d,z:m,strength:u}),x.visible=!0},Q=120,ue=new De(new F(.04,10,8),new O({color:"#eafaff",roughness:.1,clearcoat:1}),Q);ue.frustumCulled=!1;const Z=new Float32Array(Q*3),he=new Float32Array(Q*3),Me=new Uint8Array(Q),ee=new Fe;ee.scale.setScalar(0),ee.updateMatrix();for(let e=0;e<Q;e++)ue.setMatrixAt(e,ee.matrix);t.add(ue);let Ce=0;const xe=(e,d,m,u,x)=>{for(let H=0;H<u;H++){const D=Ce;Ce=(Ce+1)%Q;const re=Math.random()*Math.PI*2,Se=(.4+Math.random()*.9)*x;Z.set([e+Math.cos(re)*.2,d,m+Math.sin(re)*.2],D*3),he.set([Math.cos(re)*Se,(1.8+Math.random()*2)*x,Math.sin(re)*Se],D*3),Me[D]=1}},yt=n?new A(-6,17,33):new A(-12,12,27),Mt=n?new A(-2.5,11.5,26):new A(-5,7,19),xt=n?new A(0,-1.6,-.6):new A(0,-1.4,-.6),bt=n?new A(1.2,-1.2,0):new A(1.4,-1.5,0),Ve=new A,He=()=>{const e=a.clientWidth,d=a.clientHeight;o.setSize(e,d,!1),M.aspect=e/d,M.updateProjectionMatrix()};He();const qe=new ResizeObserver(He);qe.observe(a);let be=0,Ye=!1;const ke=[!1,!1];let $e=0,Ke=0,Ze=0;const St=performance.now(),Xe=(e,d,m,u,x)=>{const H=G(m,x,x+.7);if(e.root.visible=m>=x,!e.root.visible)return 0;e.root.position.y=Ee.lerp(u-1.8,u-.1,Zt(H))+Math.sin(m*5.2+d)*.03,ro(e.legs,m+d*.4);const D=e.root.position.y+.5*st;return!ke[d]&&D>u&&(ke[d]=!0,pe(m,e.root.position.x,e.root.position.z,1.5),pe(m+.12,e.root.position.x,e.root.position.z,1),xe(e.root.position.x,u,e.root.position.z,30,1)),H},Je=()=>{const e=(performance.now()-St)/1e3,d=Math.min(.05,e-Ze);Ze=e;const m=it(G(e,w.fillStart,w.fillEnd)),u=Ee.lerp(oe+.02,h.full,m),x=u-oe,H=e>w.fillStart;K.visible=N.visible=H,K.position.y=u,N.scale.y=x,N.position.y=oe+x/2,$.uTime.value=e,$.uAmp.value=Ee.lerp(.05,.02,m),de.uniforms.uDepth.value=x,se.uniforms.uSpan.value=x,W.uCTime.value=e,W.uCLevel.value=H?u:oe-1,J.forEach(i=>{i.position.y=u}),Ue.position.y=u;const D=H?1-G(e,w.fillEnd-.35,w.fillEnd):0;We.forEach(i=>{i.visible=D>0,i.scale.y=Math.max(.01,-.14-u),i.scale.x=i.scale.z=.35+.65*D}),T.opacity=.85*D,D>0&&e-Ke>.07&&(Ke=e,P.forEach(i=>xe(i,u,C,2,.45*D)),Math.floor(e*2.4)!==Math.floor((e-d)*2.4)&&P.forEach(i=>pe(e,i,C+.15,.6)));const re=it(G(e,0,w.save+.4));M.position.lerpVectors(yt,Mt,re),M.position.x+=Math.sin(e*.7)*.04,Ve.lerpVectors(xt,bt,rt(G(e,0,w.save+.4))),M.lookAt(Ve);const Se=Xe(k,0,e,u,w.surface+.1),Pt=Xe(B,1,e,u,w.surface);if($.uBodyAmp.value.set(Se,Pt),k.root.visible){const i=Be(G(e,w.surface+.45,w.surfaced+.1)),p=Be(G(e,w.save-.3,w.save))*(1-G(e,w.hold,w.recover)),Pe=Math.sin(e*7)*.06*(1-p);te(k.right,1,R.down,R.ready,i,Pe),te(k.left,-1,R.down,R.ready,i,-Pe),p>0&&(te(k.right,1,R.ready,R.reach,p),te(k.left,-1,R.ready,R.brace,p)),k.body.position.y=p*.42,k.body.rotation.z=-p*.32,k.root.position.z=me.z+p*.3,ke[0]&&p===0&&e-$e>.8&&($e=e,pe(e,me.x,k.root.position.z,.5))}if(B.root.visible){const i=rt(G(e,w.surface+.2,w.windUp+.25)),p=Kt(G(e,w.throw-.1,w.release+.06));te(B.right,1,R.down,R.scull,Be(G(e,w.surface+.2,w.surfaced)),Math.sin(e*6)*.08),te(B.left,-1,R.down,R.cock,i),p>0&&te(B.left,-1,R.cock,R.follow,p),B.body.rotation.x=p*.3-i*.12,B.body.position.y=i*.12*(1-p)}if(B.root.visible&&g.phase==="held")S.visible=!0,B.left.wrist.getWorldPosition(V),S.position.copy(V),S.position.y+=.12,e>=w.release&&(g.phase="flight",Ne.copy(S.position));else if(g.phase==="flight"){k.right.wrist.getWorldPosition(V),V.y+=.14;const i=G(e,w.release,w.save);S.position.lerpVectors(Ne,V,i),S.position.y+=Math.sin(i*Math.PI)*.45,S.rotation.z-=d*16,i>=1&&(g.phase="rebound",g.pos.copy(V),g.vel.set(-1.7,3,1.5),g.at=e,xe(V.x,V.y,V.z,12,.45))}else if(g.phase==="rebound"){const i=e-g.at,p=g.pos.y+g.vel.y*i-.5*nt*i*i;S.position.set(g.pos.x+g.vel.x*i,p,g.pos.z+g.vel.z*i),S.rotation.x+=d*10,p<=u+Re*.3&&(g.phase="floating",g.at=e,g.pos.copy(S.position),pe(e,S.position.x,S.position.z,1.2),xe(S.position.x,u,S.position.z,26,.75))}else if(g.phase==="floating"){const i=e-g.at;S.position.set(g.pos.x-i*.2,u+Re*.5+Math.sin(i*5)*.015,g.pos.z+i*.12)}ze.forEach(i=>{const{born:p,x:Pe,z:Tt,strength:Qe}=i.userData;if(p<0||e<p)return;const et=e-p;i.position.set(Pe,u+.015,Tt),i.scale.setScalar(1+et*4*Qe),i.material.opacity=Math.max(0,.8-et*.9)*Math.min(1,Qe),i.material.opacity===0&&(i.userData.born=-1,i.visible=!1)});for(let i=0;i<Q;i++){if(!Me[i])continue;const p=i*3;he[p+1]-=nt*d,Z[p]+=he[p]*d,Z[p+1]+=he[p+1]*d,Z[p+2]+=he[p+2]*d,Z[p+1]<u&&(Me[i]=0),ee.position.set(Z[p],Z[p+1],Z[p+2]),ee.scale.setScalar(Me[i]?1:0),ee.updateMatrix(),ue.setMatrixAt(i,ee.matrix)}if(ue.instanceMatrix.needsUpdate=!0,o.render(t,M),e>=w.end){Ye||(Ye=!0,s());return}be=requestAnimationFrame(Je)};return be=requestAnimationFrame(Je),{stop:()=>cancelAnimationFrame(be),dispose:()=>{cancelAnimationFrame(be),qe.disconnect(),t.traverse(e=>{e.geometry&&e.geometry.dispose(),(Array.isArray(e.material)?e.material:e.material?[e.material]:[]).forEach(m=>{m.map&&m.map.dispose(),m.dispose()})}),b.dispose(),v.dispose(),o.dispose(),o.domElement.remove()}}}export{co as createPoolScene};
