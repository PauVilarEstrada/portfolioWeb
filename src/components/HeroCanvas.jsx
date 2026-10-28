import React, { useEffect, useRef } from "react";

/** Gives the hero copy a moment to paint before the WebGL scene loads. */
const START_DELAY_MS = 250;

/** Mounts the three.js hero scene (loaded on demand) behind the hero copy. */
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    let app;
    let cancelled = false;
    const start = async () => {
      // The particle glyph is drawn with Archivo, so wait for it to be ready.
      try { await document.fonts.load('700 300px "Archivo"'); } catch { /* use the fallback font */ }
      const { createHeroScene } = await import("../three/heroScene");
      if (!cancelled && ref.current) {
        app = createHeroScene(ref.current);
        ref.current.classList.add("is-ready");
      }
    };
    const id = window.setTimeout(start, START_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      app?.dispose();
    };
  }, []);

  return <div ref={ref} className="hero-canvas" aria-hidden="true" />;
}
