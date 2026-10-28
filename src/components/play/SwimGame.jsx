import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import { PROJECTS } from "../../data/projects";

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

/** "Pool of projects": the 3D swim game, loaded when the visitor presses start. */
export default function SwimGame() {
  const { t } = useI18n();
  const s = t.play.swim;
  const stations = useStations();
  const stage = useRef(null);
  const game = useRef(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [near, setNear] = useState(null);
  const [found, setFound] = useState(() => new Set());

  useEffect(() => () => game.current?.dispose(), []);

  const start = async () => {
    setStarted(true);
    const { createSwimGame } = await import("../../three/swimScene");
    if (!stage.current) return;
    game.current = createSwimGame(stage.current, {
      stations,
      onNear: i => setNear(i),
      onDiscover: i => setFound(prev => new Set(prev).add(i)),
    });
    if (!game.current) setFailed(true);
    stage.current.focus();
  };

  const card = near === null ? null : stations[near];
  const allFound = found.size === stations.length;

  return (
    <div className="swim">
      <div ref={stage} className={`swim-stage${started ? " is-started" : ""}`} tabIndex={started ? 0 : -1} aria-label={`${s.title}. ${s.controls}`}>
        {!started && (
          <button type="button" className="btn btn--primary swim-start" onClick={start}>
            <FiPlay aria-hidden="true" /> {s.start}
          </button>
        )}
        {failed && <p className="swim-fallback">{s.fallback}</p>}
        {started && !failed && (
          <p className="swim-progress" aria-live="polite">
            {allFound ? s.done : `${found.size}/${stations.length} ${s.found}`}
          </p>
        )}
        {started && !failed && !card && !allFound && <p className="swim-hint">{s.hint}</p>}
        {card && (
          <article className="swim-card" style={{ "--accent": card.color }} aria-live="polite">
            <p className="swim-card-sub">{card.sub}</p>
            <h3>{card.title}</h3>
            <p className="swim-card-body">{rt(card.body)}</p>
            <Link to={card.link.to} className="swim-card-link">
              {card.link.label} <FiArrowUpRight aria-hidden="true" />
            </Link>
          </article>
        )}
      </div>
      <p className="swim-help">{s.controls}</p>
    </div>
  );
}
