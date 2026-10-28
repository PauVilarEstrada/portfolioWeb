/** Reads the live design tokens so the WebGL scenes follow the light/dark theme. */
export function readThemeColors() {
  const cs = getComputedStyle(document.documentElement);
  const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  return {
    ink: get("--ink", "#0c1611"),
    green: get("--green", "#2fa24f"),
    paper: get("--paper", "#f3f4f0"),
  };
}

/** Calls back whenever <html data-theme> changes. Returns an unsubscribe function. */
export function onThemeChange(callback) {
  const mo = new MutationObserver(callback);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
