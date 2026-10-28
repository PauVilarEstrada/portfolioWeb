import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/NotFound.css";
import { useI18n } from "../i18n/LanguageContext";
import PenaltyGame from "./game/PenaltyGame";

/** Unknown routes: a way back, and the penalty game to pass the time. */
export default function NotFound() {
  const { t, lang } = useI18n();
  const n = t.notFound;

  return (
    <div className="notfound lang-fade" key={lang}>
      <header className="container page-head">
        <h1 className="page-head-title">{n.title}</h1>
        <div className="page-head-row">
          <p className="page-head-meta">404</p>
          <p className="page-head-lead">{n.lead}</p>
        </div>
        <div className="notfound-actions">
          <Link to="/" className="btn btn--primary">
            {n.home} <FiArrowUpRight aria-hidden="true" />
          </Link>
          <Link to="/projects" className="btn btn--ghost">{n.projects}</Link>
        </div>
      </header>
      <div className="container notfound-game">
        <PenaltyGame />
      </div>
    </div>
  );
}
