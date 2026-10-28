import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiPlay, FiRotateCcw, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import { PROJECTS } from "../../data/projects";
import { createSfx } from "./sfx";

// Where each buoy floats (x, z in metres): projects on the left half, work and
// study in the middle, the clubs near the goal on the right.
const PROJECT_SPOTS = {
  ultimus: [-9.5, -4.5],
  tactiq: [-5.5, -5],
  nba: [-2, -4.2],
  mindflow: [-9.5, 0],
  kdd: [-5.5, -0.6],
  pacman: [-9, 4.6],
  flappy: [-5, 4.2],
};
const CLUB_SPOTS = [[6.5, 4.2], [8.6, 0], [6.5, -4.2]]; // current club first, as in the copy
const CAREER_COLOR = "#e0323b";
const WORK_COLOR = "#2f9e57";
const STUDY_COLOR = "#6d5bd0";

/** "CN Sant Andreu" → "CNSA", "Club Natació Catalunya" → "CNC". */
const clubMonogram = name => `CN${name.replace(/^(Club Natació|CN)\s+/, "").split(/\s+/).map(w => w[0]).join("")}`;

function useStations() {
  const { t } = useI18n();
  return useMemo(() => {
    const s = t.play.swim;
    const e = t.experience;
    const projects = PROJECTS.filter(m => PROJECT_SPOTS[m.key]).map(m => {
      const p = t.projects[m.key];
      const [x, z] = PROJECT_SPOTS[m.key];
      return {
        x, z, color: m.color, logo: m.logo, label: p.short,
        title: p.short, sub: `${s.kinds.project} · ${p.kind}`, body: p.desc,
        link: { to: m.path, label: s.open },
      };
    });
    const clubs = e.sport.clubs.map((c, i) => ({
      x: CLUB_SPOTS[i][0], z: CLUB_SPOTS[i][1], color: CAREER_COLOR, monogram: clubMonogram(c.name), label: c.name,
      title: c.name, sub: `${s.kinds.club} · ${c.years}`, body: `${c.p} ${c.comps.join(" · ")}.`,
      link: { to: "/experience#sport", label: s.more },
    }));
    const master = e.education.items[0];
    const career = [
      {
        x: 2.5, z: -4.6, color: WORK_COLOR, monogram: "bc", label: e.bronto.org,
        title: e.bronto.role, sub: `${s.kinds.work} · ${e.bronto.org} · ${e.bronto.period}`, body: e.bronto.summary,
        link: { to: "/experience#bronto", label: s.more },
      },
      {
        x: 2.5, z: 4.8, color: WORK_COLOR, monogram: "CC", label: e.trainer.org,
        title: e.trainer.role, sub: `${s.kinds.work} · ${e.trainer.org} · ${e.trainer.period}`, body: e.trainer.summary,
        link: { to: "/experience#trainer", label: s.more },
      },
      {
        x: -1.5, z: 0.8, color: STUDY_COLOR, monogram: "IA", label: s.masterLabel,
        title: master.h, sub: `${s.kinds.study} · ${master.org} · ${master.period}`, body: master.p,
        link: { to: "/experience#education", label: s.more },
      },
    ];
    return [...projects, ...career, ...clubs];
  }, [t]);
}

const BEST_KEY = "pv-swim-best";
const SOUND_KEY = "pv-sound";
/** How long a hint stays up. */
const HINT_MS = 2600;
const TICK_MS = 250;

const store = {
  get: key => { try { return localStorage.getItem(key); } catch { return null; } },
  set: (key, value) => { try { localStorage.setItem(key, value); } catch { /* storage blocked */ } },
};
const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
/** Links open in a new tab so the match isn't lost. */
const pageUrl = to => `${import.meta.env.BASE_URL}${to.replace(/^\//, "")}`;

/** "Pool of projects": the water polo game, loaded when the visitor presses start; the panel tells what each buoy hides. */
export default function SwimGame() {
  const { t } = useI18n();
  const s = t.play.swim;
  const stations = useStations();
  const stage = useRef(null);
  const game = useRef(null);
  const sfx = useRef(null);
  const startedAt = useRef(0);
  const hintTimer = useRef(0);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [found, setFound] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [hint, setHint] = useState(null);
  const [won, setWon] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState(() => Number(store.get(BEST_KEY)) || 0);
  const [muted, setMuted] = useState(() => store.get(SOUND_KEY) === "off");

  const goalReady = found.size === stations.length;

  useEffect(() => () => {
    game.current?.dispose();
    window.clearTimeout(hintTimer.current);
  }, []);

  useEffect(() => {
    if (!started || won || failed) return undefined;
    const id = window.setInterval(() => setElapsed((performance.now() - startedAt.current) / 1000), TICK_MS);
    return () => window.clearInterval(id);
  }, [started, won, failed]);

  const showHint = kind => {
    setHint(kind);
    window.clearTimeout(hintTimer.current);
    if (kind !== "goalReady") hintTimer.current = window.setTimeout(() => setHint(null), HINT_MS);
  };

  const launch = async () => {
    const { createSwimGame } = await import("../../three/swimScene");
    if (!stage.current) return;
    startedAt.current = performance.now();
    game.current = createSwimGame(stage.current, {
      stations,
      sfx: sfx.current,
      onNear: i => { if (i !== null) setSelected(i); },
      onDiscover: i => {
        setFound(prev => new Set(prev).add(i));
        setSelected(i);
      },
      onHint: showHint,
      onGoal: () => {
        const time = (performance.now() - startedAt.current) / 1000;
        setWon(true);
        setHint(null);
        setElapsed(time);
        setBest(prev => {
          if (prev && prev <= time) return prev;
          store.set(BEST_KEY, String(time));
          return time;
        });
      },
    });
    if (!game.current) setFailed(true);
    stage.current.focus({ preventScroll: true });
  };

  const start = () => {
    sfx.current = sfx.current || createSfx();
    sfx.current.setMuted(muted);
    sfx.current.unlock();
    setStarted(true);
    launch();
  };

  const restart = () => {
    game.current?.dispose();
    game.current = null;
    setFound(new Set());
    setSelected(null);
    setHint(null);
    setWon(false);
    setElapsed(0);
    launch();
  };

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    sfx.current?.setMuted(next);
    store.set(SOUND_KEY, next ? "off" : "on");
  };

  const current = selected === null ? null : stations[selected];

  return (
    <div className="swim">
      <div className="swim-layout">
        <div ref={stage} className={`swim-stage${started ? " is-started" : ""}`} tabIndex={started ? 0 : -1} aria-label={`${s.title}. ${s.controls}`}>
          {!started && (
            <button type="button" className="btn btn--primary swim-start" onClick={start}>
              <FiPlay aria-hidden="true" /> {s.start}
            </button>
          )}
          {failed && <p className="swim-fallback">{s.fallback}</p>}
          {started && !failed && (
            <>
              <p className="swim-hud">
                <span>{found.size}/{stations.length} {s.found}</span>
                <span>{s.time} {clock(elapsed)}</span>
                {best > 0 && <span>{s.best} {clock(best)}</span>}
              </p>
              <button type="button" className="swim-sound" onClick={toggleSound} aria-label={muted ? s.soundOn : s.soundOff} title={muted ? s.soundOn : s.soundOff}>
                {muted ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
              </button>
              {hint && !won && <p className="swim-toast" role="status">{s.hints[hint]}</p>}
              {goalReady && !won && (
                <button type="button" className="btn btn--primary swim-shoot" onClick={() => game.current?.shoot()}>
                  {s.shoot}
                </button>
              )}
              {won && (
                <div className="swim-goal" role="status">
                  <p className="swim-goal-title">{s.goal}</p>
                  <p>{s.goalText}</p>
                  <p className="swim-goal-time">{s.time} {clock(elapsed)} · {s.best} {clock(best)}</p>
                  <button type="button" className="btn btn--light" onClick={restart}>
                    <FiRotateCcw aria-hidden="true" /> {s.again}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="swim-panel" aria-live="polite">
          <div className="swim-panel-head">
            <h3>{s.panelTitle}</h3>
            <span>{found.size}/{stations.length}</span>
          </div>
          {current ? (
            <article key={selected} className="swim-info" style={{ "--accent": current.color }}>
              <p className="swim-info-sub">{current.sub}</p>
              <h4>{current.title}</h4>
              <p className="swim-info-body">{rt(current.body)}</p>
              <a href={pageUrl(current.link.to)} target="_blank" rel="noopener noreferrer" className="swim-info-link">
                {current.link.label} <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only"> ({s.newTab})</span>
              </a>
            </article>
          ) : (
            <p className="swim-panel-empty">{s.panelEmpty}</p>
          )}
          {found.size > 0 && (
            <ul className="swim-found">
              {[...found].map(i => (
                <li key={i}>
                  <button
                    type="button"
                    className={i === selected ? "is-active" : undefined}
                    style={{ "--accent": stations[i].color }}
                    onClick={() => setSelected(i)}
                  >
                    {stations[i].label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
      <p className="swim-help">{s.controls}</p>
    </div>
  );
}
