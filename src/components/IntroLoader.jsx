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
    setLeaving(kind === "impact" ? "burst" : "wipe");
    document.documentElement.classList.remove("intro-open");
    window.dispatchEvent(new Event("pv:intro-done"));
    window.setTimeout(() => setActive(false), EXIT_MS);
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
      app.current?.dispose();
      app.current = null;
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
