/**
 * Tiny synthesised sound kit for the pool game (Web Audio, no audio files):
 * strokes, a chime when a buoy is found, the referee's whistle, a kick and
 * a crowd cheer. The context is created on the first sound after a click.
 */
export function createSfx() {
  let ctx = null;
  let master = null;
  let noise = null;
  let muted = false;

  const ensure = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.45;
      master.connect(ctx.destination);
      const len = ctx.sampleRate * 2;
      noise = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const play = fn => {
    if (muted) return;
    const c = ensure();
    if (c) fn(c, c.currentTime);
  };

  const envelope = (c, t, peak, attack, release) => {
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
    g.connect(master);
    return g;
  };

  const tone = (c, t, freq, { type = "sine", peak = 0.2, attack = 0.01, release = 0.3, glide } = {}) => {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, t + attack + release);
    o.connect(envelope(c, t, peak, attack, release));
    o.start(t);
    o.stop(t + attack + release + 0.05);
  };

  const hiss = (c, t, { freq = 1000, q = 0.8, peak = 0.2, attack = 0.03, release = 0.25 } = {}) => {
    const src = c.createBufferSource();
    src.buffer = noise;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    src.connect(f).connect(envelope(c, t, peak, attack, release));
    src.start(t, Math.random());
    src.stop(t + attack + release + 0.05);
  };

  return {
    unlock: () => { if (!muted) ensure(); },
    setMuted: m => { muted = m; },
    stroke: () => play((c, t) => hiss(c, t, { freq: 700 + Math.random() * 600, peak: 0.12, release: 0.2 })),
    splash: () => play((c, t) => hiss(c, t, { freq: 500, q: 0.5, peak: 0.3, release: 0.5 })),
    pick: () => play((c, t) => tone(c, t, 520, { type: "triangle", peak: 0.15, release: 0.15, glide: 880 })),
    chime: () => play((c, t) => [660, 880, 1320].forEach((f, i) => tone(c, t + i * 0.09, f, { peak: 0.16, release: 0.45 }))),
    kick: () => play((c, t) => tone(c, t, 140, { type: "sine", peak: 0.5, release: 0.18, glide: 50 })),
    whistle: (long = false) => play((c, t) => {
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = 2900;
      const lfo = c.createOscillator();
      lfo.frequency.value = 26;
      const depth = c.createGain();
      depth.gain.value = 140;
      lfo.connect(depth).connect(o.frequency);
      const dur = long ? 0.9 : 0.3;
      o.connect(envelope(c, t, 0.12, 0.02, dur));
      o.start(t);
      lfo.start(t);
      o.stop(t + dur + 0.1);
      lfo.stop(t + dur + 0.1);
    }),
    cheer: () => play((c, t) => {
      hiss(c, t, { freq: 1100, q: 0.4, peak: 0.35, attack: 0.35, release: 2.2 });
      hiss(c, t + 0.1, { freq: 2400, q: 0.6, peak: 0.12, attack: 0.3, release: 1.8 });
    }),
  };
}
