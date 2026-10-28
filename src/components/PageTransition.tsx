import React, { useEffect, useRef, useState } from "react";
import { useLocation, type Location } from "react-router-dom";
import "../css/PageTransition.css";
import { useI18n } from "../i18n/LanguageContext";
import { routeTitle } from "../data/routes";

/** Must match the transition durations in PageTransition.css. */
const COVER_MS = 650;
const HOLD_MS = 140;
const REVEAL_MS = 750;

type Phase = "idle" | "cover" | "reveal";

/**
 * Renders the page for the *shown* location. On a pathname change a curtain
 * carrying the destination's name covers the screen, the page swaps beneath it,
 * and the curtain leaves upwards.
 */
export default function PageTransition({ children }: { children: (location: Location) => React.ReactNode }) {
  const location = useLocation();
  const { t } = useI18n();
  const [shown, setShown] = useState<Location>(location);
  const [phase, setPhase] = useState<Phase>("idle");
  const [title, setTitle] = useState("");
  const shownPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === shownPath.current) {
      setShown(location); // same page, only the hash or query changed
      return;
    }
    const swap = () => {
      shownPath.current = location.pathname;
      setShown(location);
      if (!location.hash) window.scrollTo(0, 0);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swap();
      return;
    }
    setTitle(routeTitle(location.pathname, t));
    setPhase("cover");
    const swapTimer = window.setTimeout(() => { swap(); setPhase("reveal"); }, COVER_MS + HOLD_MS);
    const doneTimer = window.setTimeout(() => setPhase("idle"), COVER_MS + HOLD_MS + REVEAL_MS);
    return () => { window.clearTimeout(swapTimer); window.clearTimeout(doneTimer); };
    // t only changes with the language; the curtain title is read at navigation time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // The Game page can run the curtain on demand, without leaving the page.
  useEffect(() => {
    const play = (e: Event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setTitle((e as CustomEvent<{ title?: string }>).detail?.title ?? "");
      setPhase("cover");
      window.setTimeout(() => setPhase("reveal"), COVER_MS + HOLD_MS);
      window.setTimeout(() => setPhase("idle"), COVER_MS + HOLD_MS + REVEAL_MS);
    };
    window.addEventListener("pv:curtain", play);
    return () => window.removeEventListener("pv:curtain", play);
  }, []);

  return (
    <>
      {children(shown)}
      <div className={`curtain is-${phase}`} aria-hidden="true">
        <div className="curtain-inner">
          <span className="curtain-mark">PV</span>
          <span className="curtain-title">{title}</span>
        </div>
      </div>
    </>
  );
}
