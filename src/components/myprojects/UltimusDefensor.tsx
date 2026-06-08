import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import udLogo from "./assets/logosApps/ultimusdefensorlogo.png";
import portada from "./assets/ultimusdefensor/portada.png";
import chatbot1 from "./assets/ultimusdefensor/chatbot_bluesentinel.png";
import chatbot2 from "./assets/ultimusdefensor/chatbot_bluesentinel_2.png";
import mitreCoverage from "./assets/ultimusdefensor/mitre_cobertura.png";
import vistaEjecutiva1 from "./assets/ultimusdefensor/vista_ejectuiva_1.png";
import vistaEjecutiva2 from "./assets/ultimusdefensor/vista_ejecutiva_2.png";
import modelHealth from "./assets/ultimusdefensor/salud_de_modelos.png";
import origenes from "./assets/ultimusdefensor/origenes_de_amenaza.png";
import informes from "./assets/ultimusdefensor/informes.png";

export default function UltimusDefensor() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#38bdf8", "--pp-glow": "rgba(56, 189, 248, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={udLogo} alt="Ultimus Defensor" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Master's Final Project · AI Cybersecurity Platform</span>
          <h1 className="pp-title">Ultimus Defensor — BlueSentinel</h1>
          <p className="pp-subtitle">
            An end-to-end <strong>AI-powered cybersecurity platform</strong> combining anomaly detection,
            MITRE ATT&amp;CK threat classification, and an intelligent BlueTeam assistant — built as the
            final project of a Master's in <strong>Artificial Intelligence &amp; Big Data</strong>.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">AI / ML</span>
            <span className="pp-tag">Cybersecurity</span>
            <span className="pp-tag">MITRE ATT&CK</span>
            <span className="pp-tag">Isolation Forest</span>
            <span className="pp-tag">XGBoost</span>
            <span className="pp-tag">LLM / RAG</span>
            <span className="pp-tag">Python</span>
            <span className="pp-tag">Big Data</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Project Overview</h2>
          <p className="pp-text">
            <strong>Ultimus Defensor</strong> is a comprehensive cybersecurity platform designed for BlueTeam
            analysts. It integrates a <strong>real-time anomaly detection pipeline</strong> with an{" "}
            <strong>AI-powered assistant (BlueSentinel)</strong> capable of identifying, classifying, and
            explaining cyber threats using the MITRE ATT&amp;CK framework.
          </p>
          <p className="pp-text">
            The platform processes security logs from multiple sources, detects anomalies using a specialized
            ensemble ML pipeline, maps findings to MITRE ATT&amp;CK techniques, and provides expert-level
            explanations through a conversational AI assistant grounded in a curated knowledge base of{" "}
            <strong>+1,000 cybersecurity documents</strong>.
          </p>
          <div className="pp-gallery c1">
            <img src={portada} alt="Ultimus Defensor Platform Overview" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Team &amp; Collaboration</h2>
          <p className="pp-text">
            Developed as a <strong>group project (5 members)</strong> for the Master's in AI &amp; Big Data.
            Each member contributed across different components: ML pipeline, RAG system, frontend, data
            engineering, and integration.
          </p>
          <div className="pp-team">
            <a href="https://www.linkedin.com/in/adria-garzon/" target="_blank" rel="noopener noreferrer">Adrià Garzón</a>
            <a href="https://www.linkedin.com/in/joel-mateos-ab36501b9/" target="_blank" rel="noopener noreferrer">Joel Mateos</a>
            <a href="https://www.linkedin.com/in/alex-montes-terraz-9857a1288/" target="_blank" rel="noopener noreferrer">Alex Montes</a>
            <a href="https://www.linkedin.com/in/alejandro-soriano-mata-96a8792a8/" target="_blank" rel="noopener noreferrer">Alejandro Soriano</a>
            <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">Pau Vilar</a>
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">BlueSentinel — AI BlueTeam Assistant</h2>
          <p className="pp-text">
            BlueSentinel is a conversational AI assistant specialized in cybersecurity, powered by an{" "}
            <strong>LLM with RAG (Retrieval-Augmented Generation)</strong> over a curated corpus of security
            documents. It operates in two modes:
          </p>
          <ol className="pp-steps">
            <li>
              <strong>Consultor Mode:</strong> General cybersecurity Q&amp;A — threat explanations,
              mitigation strategies, MITRE technique details, and BlueTeam best practices.
            </li>
            <li>
              <strong>Log Mode:</strong> Paste raw logs, SIEM alerts, or suspicious code snippets and receive
              structured analysis: technique identification (MITRE ID), tactic classification, attack mechanics,
              and recommended response actions.
            </li>
          </ol>
          <div className="pp-gallery c2">
            <img src={chatbot1} alt="BlueSentinel Chat Interface" />
            <img src={chatbot2} alt="BlueSentinel Log Analysis" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">ML Detection Pipeline — Isolation Forest → XGBoost</h2>
          <p className="pp-text">
            The anomaly detection system is a <strong>two-stage cascade pipeline</strong> that processes real
            security logs and maps detected anomalies to MITRE ATT&amp;CK techniques:
          </p>
          <ol className="pp-steps">
            <li>
              <strong>Stage 1 — Isolation Forest Ensemble:</strong> 5 specialized unsupervised models
              (process, network, file, general, other) detect anomalous behavior without labeled data. Each
              model focuses on a different data domain.
            </li>
            <li>
              <strong>Stage 2 — XGBoost Classifier:</strong> Anomalous samples are classified into one of{" "}
              <strong>12 MITRE ATT&amp;CK techniques</strong>, producing a confidence score and technique
              mapping.
            </li>
            <li>
              <strong>Output:</strong> Structured JSON with detected techniques, confidence levels, anomaly
              rates, job IDs, and per-source attribution. Exportable as CSV or JSON.
            </li>
          </ol>
          <div className="pp-gallery c2">
            <img src={mitreCoverage} alt="MITRE ATT&CK Coverage Dashboard" />
            <img src={modelHealth} alt="Model Health Dashboard" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Platform Dashboards &amp; Analytics</h2>
          <p className="pp-text">
            Beyond detection, Ultimus Defensor provides rich analytical views for security operations:
          </p>
          <ul className="pp-features">
            <li>Executive View — risk summary &amp; KPIs at a glance</li>
            <li>Threat Origins — geolocation &amp; source attribution mapping</li>
            <li>Attack Reports — exportable incident summaries</li>
            <li>Model Health — per-model performance metrics</li>
            <li>MITRE Coverage — mapped technique heatmap</li>
            <li>Detection Queue — real-time log processing status</li>
          </ul>
          <div className="pp-gallery c2">
            <img src={vistaEjecutiva1} alt="Executive Dashboard 1" />
            <img src={vistaEjecutiva2} alt="Executive Dashboard 2" />
            <img src={origenes} alt="Threat Origins Dashboard" />
            <img src={informes} alt="Reports Dashboard" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Key Technologies</h2>
          <div className="pp-tech-grid">
            {["Python", "Isolation Forest", "XGBoost", "LLM + RAG", "MITRE ATT&CK", "FastAPI", "React", "TypeScript", "Docker", "Big Data Pipelines", "COMISET Dataset", "JSON / CSV"].map(t => (
              <span key={t} className="pp-tech-badge">{t}</span>
            ))}
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">Availability — Academic &amp; Confidential</h2>
          <p className="pp-text">
            This project is <strong>not publicly available on GitHub</strong>. It was developed as the final
            Master's project and involves proprietary security datasets, trained ML models, and LLM
            configurations kept private for academic integrity and data protection reasons.
          </p>
          <p className="pp-text">
            If you are interested in the full technical report, methodology, or a detailed walkthrough,
            feel free to reach out directly.
          </p>
          <div className="pp-contact-box">
            <p>Email: <a href="mailto:pvilardev@gmail.com">pvilardev@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pau-vilar</a></p>
            <p>Demo: <a href="https://drive.google.com/file/d/13rt9_dGvuwnIcSyVd4cBmkYH3SqQZw4R/view?usp=sharing" target="_blank" rel="noopener noreferrer">Watch Demo Video →</a></p>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
