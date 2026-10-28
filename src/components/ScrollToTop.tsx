import { useEffect } from "react";
import type { Location } from "react-router-dom";

/** Lazy pages need a moment to mount before an in-page anchor exists. */
const HASH_RETRY_MS = 60;
const HASH_MAX_TRIES = 30;

/** Scrolls to the anchor in the shown location's hash. Scrolling to the top is done by PageTransition. */
export default function ScrollToTop({ location }: { location: Location }) {
  const { pathname, hash } = location;

  useEffect(() => {
    if (!hash) return;
    let tries = 0;
    const id = window.setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > HASH_MAX_TRIES) {
        window.clearInterval(id);
        el?.scrollIntoView({ block: "start" });
      }
    }, HASH_RETRY_MS);
    return () => window.clearInterval(id);
  }, [pathname, hash]);

  return null;
}
