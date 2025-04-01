import React from "react";
import "../css/ContactSection.css";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import githubIconWhite from "../assets/githublogoblanco.png";
import linkedinIcon from "../assets/linkedinlogo.png";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Let's Connect</h2>
        <p className="intro-paragraph">
          Hey! I’m <strong>Pau Vilar</strong> — a 22-year-old software developer passionate about crafting smart, creative and user-focused digital experiences.
        </p>
        <p>
          I recently completed my Higher National Diploma in <strong>Multiplatform App Development (DAM)</strong> and I’m diving into a <strong>Master’s in Big Data & Artificial Intelligence</strong> — an area that truly excites me.
        </p>
        <p>
          Beyond tech, I’m also a <strong>professional water polo goalkeeper</strong> competing in Spain’s top league. The discipline, teamwork, and perseverance I’ve gained through sport translate directly into how I approach projects and challenges in tech.
        </p>
        <p>
          I’m currently exploring new opportunities — whether it's freelance work, creative collaborations, or full-time roles. If you think we’d vibe well, feel free to <strong>drop me an email</strong> or connect with me on <strong>LinkedIn</strong>.
        </p>
        <p>
          You can always find my <strong>GitHub and LinkedIn links at the top right of every page</strong>. Feel free to explore — I’m always building something new!
        </p>

        <div className="quick-contact">
          <p>
            📧 <a href="mailto:pvilardev@gmail.com" className="email-link">pvilardev@gmail.com</a>
          </p>
          <a href="./src/public/CV_PAUVILAR.pdf" download className="download-btn">
            <FaDownload /> Download My CV
          </a>
        </div>
      </div>
    </section>
  );
}