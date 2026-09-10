import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext";

const ROUTE_KEYS: Record<string, string> = {
  "/projects": "work",
  "/experience": "experience",
  "/contact": "contact",
};

const PROJECT_KEYS: Record<string, string> = {
  "/projects/ultimusdefensor": "ultimus",
  "/projects/nbavision": "nba",
  "/projects/mindflow": "mindflow",
  "/projects/kdd": "kdd",
  "/projects/ecommerce": "ecommerce",
  "/projects/pacman": "pacman",
  "/projects/flappybird": "flappy",
};

/** Keeps <title>, the meta description and og:* in sync with the route and the language. */
export default function DocumentMeta() {
  const { pathname } = useLocation();
  const { t, lang } = useI18n();

  useEffect(() => {
    const base = t.meta.title;
    let title = base;

    const projectKey = PROJECT_KEYS[pathname];
    if (projectKey) {
      const p = (t.projects as any)[projectKey];
      title = `${p.short} — Pau Vilar`;
    } else {
      const navKey = ROUTE_KEYS[pathname];
      if (navKey) title = `${(t.nav as any)[navKey]} — Pau Vilar`;
    }

    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.content = content;
    };
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[property="og:locale"]', lang === "es" ? "es_ES" : "en_GB");
  }, [pathname, t, lang]);

  return null;
}
