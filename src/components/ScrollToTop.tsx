import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Lazy pages need a moment to mount before an in-page anchor exists. */
const HASH_RETRY_MS = 60;
const HASH_MAX_TRIES = 30;

/** Every route change starts at the top, unless the URL points at an anchor. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let tries = 0;
      const id = window.setInterval(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el || ++tries > HASH_MAX_TRIES) {
          window.clearInterval(id);
          el?.scrollIntoView({ block: "start" });
        }
      }, HASH_RETRY_MS);
      return () => window.clearInterval(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
