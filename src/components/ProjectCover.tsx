import React from "react";
import type { ProjectMeta } from "../data/projects";

/** A project's screenshot, or — for projects without one — its logo on a dark plate. */
export default function ProjectCover({ meta, alt, eager = false }: { meta: ProjectMeta; alt: string; eager?: boolean }) {
  if (meta.cover) {
    return (
      <img
        className="cover-img"
        src={meta.cover}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }
  return (
    <span className="cover-logo" style={{ "--accent": meta.color } as React.CSSProperties}>
      <img src={meta.logo} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </span>
  );
}
