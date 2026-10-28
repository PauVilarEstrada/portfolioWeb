import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../theme/ThemeContext";
import { useI18n } from "../i18n/LanguageContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle${dark ? " is-dark" : ""}`}
      onClick={toggle}
      aria-label={dark ? t.nav.themeLight : t.nav.themeDark}
      title={dark ? t.nav.themeLight : t.nav.themeDark}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <FiSun />
        <FiMoon />
      </span>
    </button>
  );
}
