import React from "react";
import { useI18n } from "../i18n/LanguageContext";
import "../css/LanguageSwitch.css";

export default function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`lang-switch${compact ? " lang-switch--compact" : ""}`}
      role="group"
      aria-label={t.meta.switchLabel}
    >
      <span className={`lang-thumb lang-thumb--${lang}`} aria-hidden="true" />
      <button
        type="button"
        className={`lang-opt${lang === "en" ? " is-active" : ""}`}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        title="English"
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-opt${lang === "es" ? " is-active" : ""}`}
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        title="Castellano"
      >
        ES
      </button>
    </div>
  );
}
