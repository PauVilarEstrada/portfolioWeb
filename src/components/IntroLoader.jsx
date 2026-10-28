import React, { useEffect, useRef, useState } from "react";
import "../css/IntroLoader.css";
import { useI18n } from "../i18n/LanguageContext";

const SEEN_KEY = "pv-intro-seen";
/** Must match the exit animations in IntroLoader.css. */
const EXIT_MS = { wipe: 800, burst: 1500 };
/** A short pause after the intro has gone before the hero's WebGL scene starts. */
const HERO_DELAY_MS = 120;
const whenIdle = cb => (window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 1000 }) : window.setTimeout(cb, 200));

function shouldPlay() {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false;
  } catch { /* storage blocked: play once per page load */ }
  const play = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Set synchronously so the page underneath holds its entrance from the very first frame.
  if (play) document.documentElement.classList.add("intro-open");
  return play;
}

/** First-visit intro: the pool diorama fills, the keeper saves and the ball bursts through to the site. Esc, Enter, Space or a click skips it. */
export default function IntroLoader() {
  const { t } = useI18n();
  const [active, setActive] = useState(shouldPlay);
  // "wipe" when skipped, "burst" when the ball hits the lens
  const [leaving, setLeaving] = useState(null);
  const stage = useRef(null);
  const app = useRef(null);
  const closing = useRef(false);

  const close = kind => {
    if (closing.current) return;
    closing.current = true;
    app.current?.stop?.();
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
    const mode = kind === "impact" ? "burst" : "wipe";
    setLeaving(mode);
    document.documentElement.classList.remove("intro-open");
    // The hero's WebGL starts only once the intro has left, so the two never fight over the frame.
    window.setTimeout(() => {
      setActive(false);
      window.setTimeout(() => window.dispatchEvent(new Event("pv:intro-done")), HERO_DELAY_MS);
    }, EXIT_MS[mode]);
  };

  // The Game page can play the intro again.
  useEffect(() => {
    const replay = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      closing.current = false;
      setLeaving(null);
      document.documentElement.classList.add("intro-open");
      setActive(true);
    };
    window.addEventListener("pv:replay-intro", replay);
    return () => window.removeEventListener("pv:replay-intro", replay);
  }, []);

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("intro-open");
    let cancelled = false;
    import("../three/poolScene").then(({ createPoolScene }) => {
      if (cancelled || closing.current || !stage.current) return;
      app.current = createPoolScene(stage.current, {
        onDone: close,
        labels: { home: "PV", away: "RIVAL", save: t.intro.save },
      });
    }).catch(() => close());
    const onKey = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("intro-open");
      // Free the scene's GPU memory once the browser is idle, not in the middle of the exit.
      const scene = app.current;
      app.current = null;
      if (scene) whenIdle(() => scene.dispose());
    };
    // The scene only takes the scoreboard label once, when it starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div className={`intro${leaving ? ` is-${leaving}` : ""}`} role="dialog" aria-label={t.intro.label} onClick={() => close()}>
      <div ref={stage} className="intro-stage" aria-hidden="true" />
      <div className="intro-ui">
        <div className="intro-top">
          <span className="intro-mark">PV</span>
          <span>Pau Vilar</span>
        </div>
      </div>
    </div>
  );
}
