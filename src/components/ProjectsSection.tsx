import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiPaperclip } from "react-icons/fi";
import "../css/ProjectsSection.css";
import { useI18n } from "../i18n/LanguageContext";
import { PROJECTS } from "../data/projects";

type Filter = "all" | "ai" | "web" | "games";
const FILTERS: Filter[] = ["all", "ai", "web", "games"];
/** Index numbers are shown with two digits: 01, 02… */
const INDEX_DIGITS = 2;

export default function ProjectsSection() {
  const { t, lang } = useI18n();
  const pp = t.projectsPage;
  const [filter, setFilter] = useState<Filter>("all");

  const matches = (f: Filter) => PROJECTS.filter(m => f === "all" || t.projects[m.key].cat === f);
  const visible = matches(filter);

  return (
    <div className="projects-page lang-fade" key={lang}>
      <header className="container page-head">
        <h1 className="page-head-title">{pp.title}</h1>
        <div className="page-head-row">
          <p className="page-head-meta">{PROJECTS.length} {pp.count}</p>
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
              {pp.filters[f]} <span className="filter-count">{matches(f).length}</span>
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="pindex" key={filter}>
            <div className="pindex-head" aria-hidden="true">
              <span />
              <span>{pp.cols.project}</span>
              <span>{pp.cols.type}</span>
              <span>{pp.cols.stack}</span>
              <span>{pp.cols.status}</span>
              <span />
            </div>
            <ol className="pindex-list">
              {visible.map((meta, i) => {
                const p = t.projects[meta.key];
                const n = i + 1;
                return (
                  <li key={meta.key} className={meta.pinned ? "is-pinned" : undefined} style={{ "--i": i, "--accent": meta.color } as React.CSSProperties}>
                    <Link to={meta.path} className="prow">
                      {meta.pinned ? (
                        <span className="prow-pin">
                          <FiPaperclip aria-hidden="true" /> {pp.pinned}
                        </span>
                      ) : null}
                      <span className="prow-n">{String(n).padStart(INDEX_DIGITS, "0")}</span>
                      <span className="prow-main">
                        <span className="prow-logo"><img src={meta.logo} alt="" loading="lazy" /></span>
                        <span className="prow-text">
                          <span className="prow-name">{p.short}</span>
                          <span className="prow-desc">{p.desc}</span>
                        </span>
                      </span>
                      <span className="prow-kind">{p.kind}</span>
                      <span className="prow-stack">{meta.stack}</span>
                      <span className="prow-status">{p.context}</span>
                      <span className="prow-arrow" aria-hidden="true"><FiArrowUpRight /></span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : (
          <p className="gallery-empty">{pp.empty}</p>
        )}
      </div>
    </div>
  );
}
