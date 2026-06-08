import React from "react";
import { Link } from "react-router-dom";
import "./css/ultimusdefensor.css";
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
    <section className="ud-container">
      <header className="ud-hero">
        <div className="ud-hero-text">
          <h1>Ultimus Defensor — BlueSentinel (Master's Final Project)</h1>
          <p className="ud-subtitle">
            An end-to-end <strong>AI-powered cybersecurity platform</strong> combining anomaly detection,
            MITRE ATT&amp;CK threat classification, and an intelligent BlueTeam assistant — built as
            the final project of a Master's degree in <strong>Artificial Intelligence &amp; Big Data</strong>.
          </p>
          <div className="ud-meta">
            <span className="ud-tag">AI / Machine Learning</span>
            <span className="ud-tag">Cybersecurity</span>
            <span className="ud-tag">MITRE ATT&amp;CK</span>
            <span className="ud-tag">Isolation Forest</span>
            <span className="ud-tag">XGBoost</span>
            <span className="ud-tag">LLM / RAG</span>
            <span className="ud-tag">Python</span>
            <span className="ud-tag">Big Data</span>
          </div>
        </div>
        <div className="ud-hero-logo">
          <img src={udLogo} alt="Ultimus Defensor Logo" className="ud-logo" />
        </div>
      </header>

      {/* Project overview */}
      <div className="ud-section">
        <h2>Project Overview</h2>
        <p>
          <strong>Ultimus Defensor</strong> is a comprehensive cybersecurity platform designed for BlueTeam
          analysts. It integrates a <strong>real-time anomaly detection pipeline</strong> with an{" "}
          <strong>AI-powered assistant (BlueSentinel)</strong> capable of identifying, classifying, and
          explaining cyber threats using the MITRE ATT&amp;CK framework.
        </p>
        <p>
          The platform processes security logs from multiple sources, detects anomalies using a specialized
          ensemble ML pipeline, maps findings to MITRE ATT&amp;CK techniques, and provides expert-level
          explanations through a conversational AI assistant grounded in a curated knowledge base of{" "}
          <strong>+1,000 cybersecurity documents</strong>.
        </p>
        <div className="ud-gallery-full">
          <img src={portada} alt="Ultimus Defensor Platform Overview" />
        </div>
      </div>

      {/* Team */}
      <div className="ud-section">
        <h2>Team &amp; Collaboration</h2>
        <p>
          Developed as a <strong>group project (5 members)</strong> for the Master's in AI &amp; Big Data.
          Each member contributed across different components: ML pipeline, RAG system, frontend, data
          engineering, and integration.
        </p>
        <ul className="ud-list">
          <li><a href="https://www.linkedin.com/in/adria-garzon/" target="_blank" rel="noopener noreferrer">Adrià Garzón</a></li>
          <li><a href="https://www.linkedin.com/in/joel-mateos-ab36501b9/" target="_blank" rel="noopener noreferrer">Joel Mateos</a></li>
          <li><a href="https://www.linkedin.com/in/alex-montes-terraz-9857a1288/" target="_blank" rel="noopener noreferrer">Alex Montes</a></li>
          <li><a href="https://www.linkedin.com/in/alejandro-soriano-mata-96a8792a8/" target="_blank" rel="noopener noreferrer">Alejandro Soriano</a></li>
          <li><a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer">Pau Vilar</a></li>
        </ul>
      </div>

      {/* BlueSentinel AI Assistant */}
      <div className="ud-section">
        <h2>BlueSentinel — AI BlueTeam Assistant</h2>
        <p>
          BlueSentinel is a conversational AI assistant specialized in cybersecurity, powered by an{" "}
          <strong>LLM with RAG (Retrieval-Augmented Generation)</strong> over a curated corpus of security
          documents. It operates in two modes:
        </p>
        <ul className="ud-steps">
          <li>
            <strong>Consultor Mode:</strong> General cybersecurity Q&amp;A — threat explanations,
            mitigation strategies, MITRE technique details, and BlueTeam best practices.
          </li>
          <li>
            <strong>Log Mode:</strong> Paste raw logs, SIEM alerts, or suspicious code snippets and receive
            structured analysis: technique identification (MITRE ID), tactic classification, attack mechanics,
            and recommended response actions.
          </li>
        </ul>
        <div className="ud-gallery">
          <img src={chatbot1} alt="BlueSentinel Chat Interface - Main" />
          <img src={chatbot2} alt="BlueSentinel Chat Interface - Log Analysis" />
        </div>
      </div>

      {/* Detection Pipeline */}
      <div className="ud-section">
        <h2>ML Detection Pipeline — Isolation Forest → XGBoost</h2>
        <p>
          The anomaly detection system is built as a <strong>two-stage cascade pipeline</strong> that
          processes real security logs and maps detected anomalies to MITRE ATT&amp;CK techniques:
        </p>
        <ul className="ud-steps">
          <li>
            <strong>Stage 1 — Isolation Forest Ensemble:</strong> 5 specialized unsupervised models
            (process, network, file, general, other log types) detect anomalous behavior without
            requiring labeled data. Each model focuses on a different data domain.
          </li>
          <li>
            <strong>Stage 2 — XGBoost Classifier:</strong> Anomalous samples are passed to a supervised
            XGBoost model trained to classify behavior into one of <strong>12 MITRE ATT&amp;CK
            techniques</strong>, producing a confidence score and technique mapping.
          </li>
          <li>
            <strong>Output:</strong> Structured JSON with detected techniques, confidence levels,
            anomaly rates, job IDs, and detailed per-source attribution. Exportable as CSV or JSON.
          </li>
        </ul>
        <div className="ud-gallery">
          <img src={mitreCoverage} alt="MITRE ATT&CK Coverage Dashboard" />
          <img src={modelHealth} alt="Model Health Dashboard" />
        </div>
      </div>

      {/* Platform dashboards */}
      <div className="ud-section">
        <h2>Platform Dashboards &amp; Analytics</h2>
        <p>
          Beyond detection, Ultimus Defensor provides rich analytical views for security operations:
        </p>
        <ul className="ud-list">
          <li>Executive View — risk summary &amp; KPIs</li>
          <li>Threat Origins — geolocation &amp; source mapping</li>
          <li>Attack Reports — exportable incident summaries</li>
          <li>Model Health — per-model performance metrics</li>
          <li>MITRE Coverage — mapped technique heatmap</li>
          <li>Detection Queue — real-time log processing status</li>
        </ul>
        <div className="ud-gallery">
          <img src={vistaEjecutiva1} alt="Executive Dashboard 1" />
          <img src={vistaEjecutiva2} alt="Executive Dashboard 2" />
          <img src={origenes} alt="Threat Origins Dashboard" />
          <img src={informes} alt="Reports Dashboard" />
        </div>
      </div>

      {/* Tech stack */}
      <div className="ud-section">
        <h2>Key Technologies</h2>
        <ul className="ud-list">
          <li>Python</li>
          <li>Isolation Forest</li>
          <li>XGBoost</li>
          <li>LLM + RAG</li>
          <li>MITRE ATT&amp;CK</li>
          <li>FastAPI</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>Docker</li>
          <li>Big Data pipelines</li>
          <li>COMISET Dataset</li>
          <li>JSON / CSV</li>
        </ul>
      </div>

      {/* No GitHub notice */}
      <div className="ud-section ud-notice">
        <h2>Availability — Academic &amp; Confidential</h2>
        <p>
          This project is <strong>not publicly available on GitHub</strong>. It was developed as the final
          Master's project and involves proprietary security datasets, trained ML models, and LLM
          configurations that are kept private for academic integrity and data protection reasons.
        </p>
        <p>
          If you are interested in the full technical report, methodology, or a detailed walkthrough of the
          system, feel free to reach out directly.
        </p>
        <div className="ud-contact-box">
          <p>📧 Email: <a href="mailto:pvilardev@gmail.com" className="ud-email">pvilardev@gmail.com</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/pau-vilar/" className="ud-email" target="_blank" rel="noopener noreferrer">linkedin.com/in/pau-vilar</a></p>
          <p>🎬 Demo: <a href="https://drive.google.com/file/d/13rt9_dGvuwnIcSyVd4cBmkYH3SqQZw4R/view?usp=sharing" className="ud-email" target="_blank" rel="noopener noreferrer">Watch Demo Video</a></p>
        </div>
      </div>

      <Link to="/projects" className="ud-back-link">← Back to Projects</Link>
    </section>
  );
}
