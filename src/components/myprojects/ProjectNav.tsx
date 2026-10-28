import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { useI18n } from "../../i18n/LanguageContext";
import { PROJECTS, type ProjectKey } from "../../data/projects";
import ProjectCover from "../ProjectCover";

/** End-of-page navigation shared by every project page: back to the index, or on to the next project. */
export default function ProjectNav({ current }: { current: ProjectKey }) {
  const { t } = useI18n();
  const g = t.pages.common;
  const idx = PROJECTS.findIndex(p => p.key === current);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const p = t.projects[next.key];

  return (
    <nav className="pp-next" aria-label={g.next}>
      <Link to={next.path} className="pp-next-link" style={{ "--accent": next.color } as React.CSSProperties}>
        <span className="pp-next-label">{g.next}</span>
        <span className="pp-next-name">
          {p.short}
          <span className="pp-next-arrow" aria-hidden="true"><FiArrowUpRight /></span>
        </span>
        <span className="pp-next-desc">{p.desc}</span>
        <span className="pp-next-media"><ProjectCover meta={next} alt="" /></span>
      </Link>
      <Link to="/projects" className="pp-back">
        <FiArrowLeft aria-hidden="true" /> {g.back}
      </Link>
    </nav>
  );
}
