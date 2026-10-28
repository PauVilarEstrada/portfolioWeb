import React from "react";
import "../../css/Play.css";
import { useI18n } from "../../i18n/LanguageContext";
import PenaltyGame from "../game/PenaltyGame";
import SwimGame from "./SwimGame";
import AutomationPuzzle from "./AutomationPuzzle";
import PvLab from "./PvLab";

/** The Game page: pool of projects, penalties, automation puzzle and the PV playground. */
export default function PlayPage() {
  const { t, lang } = useI18n();
  const p = t.play;
  const sections = [
    { id: "swim", title: p.swim.title, lead: p.swim.lead, body: <SwimGame /> },
    { id: "penalties", title: p.penalties.title, lead: p.penalties.lead, body: <PenaltyGame record headless /> },
    { id: "puzzle", title: p.puzzle.title, lead: p.puzzle.lead, body: <AutomationPuzzle /> },
    { id: "lab", title: p.lab.title, lead: p.lab.lead, body: <PvLab /> },
  ];

  return (
    <div className="play-page lang-fade" key={lang}>
      <header className="container page-head">
        <h1 className="page-head-title">{p.title}</h1>
        <div className="page-head-row">
          <p className="page-head-meta">{sections.length} {p.count}</p>
          <p className="page-head-lead">{p.lead}</p>
        </div>
        <nav className="play-index" aria-label={p.title}>
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}>
              <span>{String(i + 1).padStart(2, "0")}</span> {p.index[s.id]}
            </a>
          ))}
        </nav>
      </header>

      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className="container play-section" aria-labelledby={`${s.id}-title`}>
          <div className="play-section-head">
            <span className="play-section-n">{String(i + 1).padStart(2, "0")}</span>
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            <p>{s.lead}</p>
          </div>
          {s.body}
        </section>
      ))}
    </div>
  );
}
