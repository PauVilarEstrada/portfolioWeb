import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "pv-theme";

/** Light unless the visitor already chose dark. index.html applies the same rule before first paint. */
function initialTheme(): Theme {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "dark") return "dark";
  } catch { /* storage blocked */ }
  return "light";
}

type Ctx = { theme: Theme; toggle: () => void };
const ThemeContext = createContext<Ctx>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignore */ }
    const meta = document.head.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) meta.content = theme === "dark" ? "#0b120e" : "#f3f4f0";
  }, [theme]);

  const value = useMemo<Ctx>(() => ({
    theme,
    toggle: () => setTheme(t => (t === "light" ? "dark" : "light")),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
