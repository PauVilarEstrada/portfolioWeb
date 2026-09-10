import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Every route change starts at the top — otherwise a project page opens mid-scroll. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.location.hash) return; // let in-page anchors work
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0); // older browsers without the options object
    }
  }, [pathname]);

  return null;
}
