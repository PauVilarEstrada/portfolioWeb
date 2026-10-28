import React, { useEffect, useRef, useState } from "react";
import "../css/IntroLoader.css";
import { useI18n } from "../i18n/LanguageContext";

const SEEN_KEY = "pv-intro-seen";
/** Must match the exit transition in IntroLoader.css. */
const EXIT_MS = 800;

function shouldPlay() {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false;
  } catch { /* storage blocked: play once per page load */ }
  const play = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Set synchronously so the page underneath holds its entrance from the very first frame.
  if (play) document.documentElement.classList.add("intro-open");
  return play;
}

/** First-visit intro: the water polo pool scene with a 0–100 counter. Skippable. */
export default function IntroLoader() {
  const { t } = useI18n();
  const [active, setActive] = useState(shouldPlay);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const stage = useRef(null);
  const app = useRef(null);
  const closing = useRef(false);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
    setProgress(1);
    setLeaving(true);
    document.documentElement.classList.remove("intro-open");
    window.dispatchEvent(new Event("pv:intro-done"));
    window.setTimeout(() => setActive(false), EXIT_MS);
  };

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("intro-open");
    let cancelled = false;
    import("../three/poolScene").then(({ createPoolScene }) => {
      if (cancelled || !stage.current) return;
      app.current = createPoolScene(stage.current, {
        onProgress: p => setProgress(p),
        onDone: close,
      });
    }).catch(close);
    const onKey = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("intro-open");
      app.current?.dispose();
      app.current = null;
    };
  }, [active]);

  if (!active) return null;
  const pct = Math.round(progress * 100);

  return (
    <div className={`intro${leaving ? " is-leaving" : ""}`} role="dialog" aria-label={t.intro.label} onClick={close}>
      <div ref={stage} className="intro-stage" aria-hidden="true" />
      <div className="intro-ui">
        <div className="intro-top">
          <span className="intro-mark">PV</span>
          <span>Pau Vilar</span>
        </div>
        <div className="intro-bottom">
          <div>
            <p className="intro-status">{t.intro.status}</p>
            <p className="intro-count" aria-live="off">{String(pct).padStart(3, "0")}</p>
          </div>
          <button type="button" className="intro-skip" onClick={e => { e.stopPropagation(); close(); }} autoFocus>
            {t.intro.skip}
          </button>
        </div>
        <span className="intro-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
