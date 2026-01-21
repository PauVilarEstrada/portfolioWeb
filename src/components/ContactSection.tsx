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
          Hi! I’m <strong>Pau Vilar</strong>, a software developer with a strong interest in
          building robust, data-driven and well-structured digital solutions.
        </p>

        <p>
          I have <strong>graduated in Multiplatform Application Development (DAM)</strong> and I am
          currently pursuing a <strong>Master’s degree in Artificial Intelligence & Big Data</strong>,
          where I focus on Machine Learning, data analysis, and applied AI projects.
        </p>

        <p>
          Alongside my academic and technical path, I work as a{" "}
          <strong>professional water polo goalkeeper</strong>, competing with{" "}
          <strong>Club Natació Sant Andreu</strong> in Spain’s top league. Balancing high-performance
          sport with advanced technical training has strengthened my discipline, consistency,
          and ability to perform under pressure.
        </p>

        <p>
          I am open to new opportunities, including <strong>junior roles, internships, and
          collaborations</strong> in software development, data engineering, or AI-related projects.
          If you think my profile could be a good fit, feel free to reach out by email or connect
          with me on LinkedIn.
        </p>

        <p>
          You can find my <strong>GitHub and LinkedIn</strong> links at the top right of the page.
          I’m constantly learning and working on new projects.
        </p>

        <div className="quick-contact">
          <p>
            📧{" "}
            <a href="mailto:pvilardev@gmail.com" className="email-link">
              pvilardev@gmail.com
            </a>
          </p>

          <a
            href={`${import.meta.env.BASE_URL}VILAR_ESTRADA_PAU.pdf`}
            download
            className="download-btn"
          >
            <FaDownload /> DOWNLOAD MY CV
          </a>
        </div>
      </div>
    </section>
  );
}
