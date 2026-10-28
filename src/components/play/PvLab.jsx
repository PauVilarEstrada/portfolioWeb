import React, { useEffect, useRef } from "react";
import { FiZap, FiRotateCcw, FiFilm } from "react-icons/fi";
import { useI18n } from "../../i18n/LanguageContext";

/** The hero's PV particles and logo orbits, full size, with buttons to replay the site's animations. */
export default function PvLab() {
  const { t } = useI18n();
  const l = t.play.lab;
  const box = useRef(null);
  const app = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try { await document.fonts.load('700 300px "Archivo"'); } catch { /* use the fallback font */ }
      const { createHeroScene } = await import("../../three/heroScene");
      if (cancelled || !box.current) return;
      app.current = createHeroScene(box.current, { centered: true });
      box.current.classList.add("is-ready");
    })();
    return () => {
      cancelled = true;
      app.current?.dispose();
    };
  }, []);

  return (
    <div className="lab">
      <div ref={box} className="lab-stage" aria-hidden="true" />
      <div className="lab-actions">
        <button type="button" className="btn btn--primary" onClick={() => app.current?.explode()}>
          <FiZap aria-hidden="true" /> {l.explode}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => window.dispatchEvent(new Event("pv:replay-intro"))}>
          <FiRotateCcw aria-hidden="true" /> {l.intro}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => window.dispatchEvent(new CustomEvent("pv:curtain", { detail: { title: t.play.title } }))}
        >
          <FiFilm aria-hidden="true" /> {l.curtain}
        </button>
      </div>
    </div>
  );
}
