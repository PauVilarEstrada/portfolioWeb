import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";
type Dict = typeof en;

const DICTS: Record<Lang, Dict> = { en, es };
const STORAGE_KEY = "pv-lang";

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch { /* private mode */ }
  if (typeof navigator !== "undefined") {
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("es") || nav.startsWith("ca")) return "es";
  }
  return "en";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void; t: Dict };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang: setLangState,
    toggle: () => setLangState(l => (l === "en" ? "es" : "en")),
    t: DICTS[lang],
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useI18n = () => useContext(LanguageContext);
