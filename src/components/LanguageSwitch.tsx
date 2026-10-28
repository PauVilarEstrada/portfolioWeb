import React from "react";
import { useI18n } from "../i18n/LanguageContext";
import "../css/LanguageSwitch.css";

export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t.meta.switchLabel}>
      <span className={`lang-thumb lang-thumb--${lang}`} aria-hidden="true" />
      <button type="button" className={lang === "es" ? "is-active" : undefined} onClick={() => setLang("es")} aria-pressed={lang === "es"} lang="es" title="Castellano">ES</button>
      <button type="button" className={lang === "en" ? "is-active" : undefined} onClick={() => setLang("en")} aria-pressed={lang === "en"} lang="en" title="English">EN</button>
    </div>
  );
}
