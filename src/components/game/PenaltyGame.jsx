import React, { useEffect, useRef, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import "../../css/PenaltyGame.css";
import { useI18n } from "../../i18n/LanguageContext";
import { useTheme } from "../../theme/ThemeContext";

const PALETTES = {
  light: { waterTop: "#2b93cc", waterBottom: "#0d5b91", skin: "#e5b48f", accent: "#ffffff" },
  dark: { waterTop: "#13608f", waterBottom: "#06263d", skin: "#d9a983", accent: "#74d993" },
};
const SHOTS = 5;
const BEST_KEY = "pv-penalty-best";

const readBest = () => {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
};

/** Water polo penalty mini-game: five shots against Pau in goal. `record` keeps the best score in this browser; `headless` drops the title when the page already has one. */
export default function PenaltyGame({ record = false, headless = false }) {
  const { t } = useI18n();
  const { theme } = useTheme();
  const g = t.home.game;
  const canvas = useRef(null);
  const game = useRef(null);
  const [s, setS] = useState({ shots: 0, goals: 0, saves: 0, phase: "aim", outcome: null });
  const [best, setBest] = useState(readBest);

  useEffect(() => {
    if (!record || s.phase !== "over" || s.goals <= best) return;
    setBest(s.goals);
    try { localStorage.setItem(BEST_KEY, String(s.goals)); } catch { /* storage blocked */ }
  }, [record, s.phase, s.goals, best]);

  useEffect(() => {
    let cancelled = false;
    import("./penaltyGame").then(({ createPenaltyGame }) => {
      if (cancelled || !canvas.current) return;
      game.current = createPenaltyGame(canvas.current, {
        colors: { ...PALETTES[document.documentElement.dataset.theme === "dark" ? "dark" : "light"] },
        onState: next => setS(next),
      });
    });
    return () => { cancelled = true; game.current?.dispose(); };
  }, []);

  useEffect(() => { game.current?.setColors(PALETTES[theme]); }, [theme]);

  const result = s.goals > s.saves ? g.resultWin : s.goals < s.saves ? g.resultLose : g.resultDraw;
  const toast = s.phase === "result" ? (s.outcome === "goal" ? g.goal : s.outcome === "save" ? g.save : g.miss) : null;

  return (
    <div className="pgame">
      <div className="pgame-head">
        {headless ? <span /> : <h3>{g.title}</h3>}
        <dl className="pgame-score" aria-live="polite">
          <div><dt>{g.goals}</dt><dd>{s.goals}</dd></div>
          <div><dt>{g.saves}</dt><dd>{s.saves}</dd></div>
          {record && <div><dt>{g.best}</dt><dd>{best}</dd></div>}
          <div><dt>{g.shot}</dt><dd>{Math.min(s.shots + (s.phase === "aim" || s.phase === "flight" ? 1 : 0), SHOTS)} {g.of} {SHOTS}</dd></div>
        </dl>
      </div>

      <div className="pgame-stage">
        <canvas ref={canvas} tabIndex={0} aria-label={`${g.label} ${g.hint}`} />
        <div className="pgame-pips" aria-hidden="true">
          {Array.from({ length: SHOTS }, (_, i) => (
            <span key={i} className={i < s.shots ? "is-done" : undefined} />
          ))}
        </div>
        {toast && <p className={`pgame-toast is-${s.outcome}`} role="status">{toast}</p>}
        {s.phase === "over" && (
          <div className="pgame-over">
            <p>{result}</p>
            <button type="button" className="btn btn--light" onClick={() => game.current?.restart()}>
              <FiRotateCcw aria-hidden="true" /> {g.again}
            </button>
          </div>
        )}
      </div>
      <p className="pgame-hint">{g.hint}</p>
    </div>
  );
}
