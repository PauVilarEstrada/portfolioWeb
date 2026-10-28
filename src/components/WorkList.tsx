import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/WorkList.css";
import { useI18n } from "../i18n/LanguageContext";
import { PROJECTS, type ProjectKey } from "../data/projects";
import ProjectCover from "./ProjectCover";

/** How quickly the floating preview catches up with the pointer (0–1 per frame). */
const FOLLOW = 0.16;
const PREVIEW_HALF_W = 180;
const PREVIEW_HALF_H = 120;

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches === true;

export default function WorkList({ keys }: { keys: ProjectKey[] }) {
  const { t } = useI18n();
  const items = keys
    .map(k => PROJECTS.find(p => p.key === k))
    .filter((p): p is (typeof PROJECTS)[number] => Boolean(p));

  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const enabled = canHover();

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * FOLLOW;
      current.current.y += (target.current.y - current.current.y) * FOLLOW;
      if (previewRef.current) {
        previewRef.current.style.transform =
          `translate3d(${current.current.x - PREVIEW_HALF_W}px, ${current.current.y - PREVIEW_HALF_H}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  const onMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
    if (active === null) current.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="work" onMouseMove={enabled ? onMove : undefined} onMouseLeave={() => setActive(null)}>
      <ul className="work-list">
        {items.map((meta, i) => {
          const p = t.projects[meta.key];
          return (
            <li key={meta.key} className={active !== null && active !== i ? "is-dim" : undefined}>
              <Link
                to={meta.path}
                className="work-row"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ "--accent": meta.color } as React.CSSProperties}
              >
                <span className="work-thumb">
                  <ProjectCover meta={meta} alt="" />
                </span>
                <span className="work-name">{p.short}</span>
                <span className="work-desc">{p.desc}</span>
                <span className="work-meta">
                  <span className="work-context">{p.context}</span>
                  <span className="work-arrow" aria-hidden="true"><FiArrowUpRight /></span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {enabled && createPortal(
        <div ref={previewRef} className={`work-preview${active !== null ? " is-on" : ""}`} aria-hidden="true">
          {items.map((meta, i) => (
            <div key={meta.key} className={`work-preview-item${active === i ? " is-active" : ""}`}>
              <ProjectCover meta={meta} alt="" />
            </div>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
}
