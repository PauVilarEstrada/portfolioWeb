import React from "react";
import "../css/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <h1>Pau Vilar I Estrada</h1>
      <h2>Full Stack Developer &nbsp;·&nbsp; AI &amp; Big Data</h2>
      <p className="hero-instruction">
        Hover or tap the <span className="highlight">circle</span> at the top to navigate through my work.
      </p>

      <div className="hero-scroll">
        <span>scroll</span>
        <div className="scroll-dot" />
      </div>
    </section>
  );
}
