import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/ProjectsSection.css";
import { useI18n } from "../i18n/LanguageContext";
import { PROJECTS } from "../data/projects";
import ProjectCover from "./ProjectCover";

type Filter = "all" | "ai" | "web" | "games";
const FILTERS: Filter[] = ["all", "ai", "web", "games"];

export default function ProjectsSection() {
  const { t, lang } = useI18n();
  const pp = t.projectsPage;
  const [filter, setFilter] = useState<Filter>("all");

  const visible = PROJECTS.filter(m => filter === "all" || t.projects[m.key].cat === filter);
  const [featured, ...rest] = visible;
  const count = (f: Filter) => PROJECTS.filter(m => f === "all" || t.projects[m.key].cat === f).length;

  return (
    <div className="projects-page lang-fade" key={lang}>
      <header className="container page-head">
        <h1 className="page-head-title">{pp.title}</h1>
        <div className="page-head-row">
          <p className="page-head-lead">{pp.lead}</p>
        </div>
      </header>

      <div className="container">
        <div className="filters" role="group" aria-label={pp.title}>
          {FILTERS.map(f => (
            <button
              key={f}
              type="button"
              className={`filter${filter === f ? " is-active" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {pp.filters[f]} <span className="filter-count">{count(f)}</span>
            </button>
          ))}
        </div>

        {featured ? (
          <div className="gallery" key={filter}>
            <ProjectTile meta={featured} wide label={filter === "all" ? pp.featured : undefined} />
            {rest.map(meta => <ProjectTile key={meta.key} meta={meta} />)}
          </div>
        ) : (
          <p className="gallery-empty">{pp.empty}</p>
        )}
      </div>
    </div>
  );
}

function ProjectTile({ meta, wide = false, label }: { meta: (typeof PROJECTS)[number]; wide?: boolean; label?: string }) {
  const { t } = useI18n();
  const p = t.projects[meta.key];

  return (
    <Link to={meta.path} className={`tile${wide ? " tile--wide" : ""}`} style={{ "--accent": meta.color } as React.CSSProperties}>
      <span className="tile-media">
        <ProjectCover meta={meta} alt={p.name} eager={wide} />
        <span className="tile-cta" aria-hidden="true">
          {t.projectsPage.open} <FiArrowUpRight />
        </span>
      </span>
      <span className="tile-body">
        <span className="tile-top">
          <span className="tile-name">{p.short}</span>
          <span className="tile-context">{label ?? p.context}</span>
        </span>
        <span className="tile-desc">{p.desc}</span>
        <span className="tags">
          {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </span>
      </span>
    </Link>
  );
}
