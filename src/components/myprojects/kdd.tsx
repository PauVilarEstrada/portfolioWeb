import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import kdd from "./assets/logosApps/kdd.png";

export default function KDD() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#22c55e", "--pp-glow": "rgba(34, 197, 94, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={kdd} alt="KDD Cup 99 IDS" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Academic Project · ML / Big Data Research</span>
          <h1 className="pp-title">Intrusion Detection System — KDD Cup '99</h1>
          <p className="pp-subtitle">
            A Machine Learning–driven IDS combining <strong>Cybersecurity</strong>, <strong>Big Data</strong>,
            and <strong>Artificial Intelligence</strong> through an end-to-end workflow: dataset engineering,
            EDA, model evaluation, and a hierarchical detection pipeline.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">AI</span>
            <span className="pp-tag">Big Data</span>
            <span className="pp-tag">Cybersecurity</span>
            <span className="pp-tag">Machine Learning</span>
            <span className="pp-tag">Neural Networks</span>
            <span className="pp-tag">EDA / BI</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Project Overview</h2>
          <p className="pp-text">
            This project explores the design of an <strong>Intrusion Detection System (IDS)</strong> based on{" "}
            <strong>predictive classification</strong>. Using KDD Cup '99 as a benchmark dataset, we built a
            full experimental workflow: large-scale data consolidation, controlled reduction and specialization,
            exploratory analysis, evaluation of multiple ML approaches, and a final{" "}
            <strong>hierarchical pipeline</strong> that improves interpretability and operational robustness.
          </p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Team &amp; Collaboration</h2>
          <p className="pp-text">
            A <strong>group project (5 members)</strong> developed as part of a Master's program. I contributed
            across data preparation, analysis, modeling, and project integration.
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
          <h2 className="pp-section-title">Dataset Engineering</h2>
          <p className="pp-text">
            The original dataset contains <strong>more than 5 million network connection records</strong>.
            KDD'99 is known for redundancy and distribution biases — training directly on the full dataset can
            inflate performance and reduce conclusion credibility.
          </p>
          <p className="pp-text">
            We applied a controlled process of cleaning, reduction, and task-specific dataset design, resulting
            in a set of specialized subsets aligned with each detection objective.
          </p>
          <ul className="pp-features">
            <li><strong>Main reduced dataset (~42,301 records):</strong> common baseline for classical ML and general analysis.</li>
            <li><strong>Specialized subsets for hierarchical detection:</strong> tailored datasets for each stage (R2L/U2R vs others; DoS vs Probe).</li>
            <li><strong>Neural network dataset (~1.1M records):</strong> larger alternative, since architectures benefit from greater sample sizes.</li>
            <li><strong>Total: 19 derived datasets</strong> created from different filtering/relabeling strategies.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Exploratory Data Analysis (EDA)</h2>
          <p className="pp-text">
            The EDA phase directly guided feature handling and model choice. The dataset includes mixed variable
            types, extreme outliers, heavy-tailed distributions, and attack families with different behavioral
            signatures.
          </p>
          <ul className="pp-features">
            <li><strong>Class distribution</strong> and imbalance patterns (especially R2L/U2R minority attacks).</li>
            <li><strong>Outliers and skewness</strong> in continuous variables, motivating log transforms and robust preprocessing.</li>
            <li><strong>Separability signals:</strong> traffic-volume patterns for DoS/Probe vs authentication indicators for R2L/U2R.</li>
            <li><strong>Feature redundancy</strong> and correlation structure to avoid inflated dimensionality.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Modeling Approach</h2>
          <p className="pp-text">
            We implemented and evaluated a diverse set of models to compare inductive biases and suitability
            for each subtask.
          </p>
          <ul className="pp-features">
            <li><strong>Supervised:</strong> KNN, Decision Tree, Random Forest, XGBoost, SVM, Logistic Regression.</li>
            <li><strong>Unsupervised (exploratory):</strong> K-Means, DBSCAN — used to inspect structure and density.</li>
            <li><strong>MLP (Multilayer Perceptron):</strong> trained on larger dataset, tested with imbalance handling (oversampling).</li>
            <li><strong>Multiclass experiments:</strong> different label groupings to study granularity vs. learnability trade-offs.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Final Solution: Hierarchical Detection Pipeline</h2>
          <p className="pp-text">
            A <strong>multi-stage pipeline</strong> designed to reflect how IDS decisions are made operationally:
            start broad, then specialize. This structure improves interpretability and allows dedicated handling
            of low-frequency but high-impact attack families.
          </p>
          <ol className="pp-steps">
            <li><strong>Stage 1 — Binary detection:</strong> Normal vs. Attack using Decision Tree.</li>
            <li><strong>Stage 2 — Targeted filtering:</strong> R2L/U2R vs. other attacks with a specialized Decision Tree.</li>
            <li><strong>Stage 3 — Network attack family:</strong> DoS vs. Probe using a Random Forest ensemble.</li>
          </ol>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Outputs &amp; Deliverables</h2>
          <ul className="pp-features">
            <li><strong>Power BI dashboard:</strong> interactive exploratory views — class distributions, protocol/service patterns, variable relationships.</li>
            <li><strong>Tableau visualizations:</strong> complementary analysis and presentation artifacts.</li>
            <li><strong>Web interface:</strong> visual consolidation layer presenting hierarchical inference outputs.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Why This Project Matters</h2>
          <ul className="pp-features">
            <li><strong>End-to-end scope:</strong> data engineering → EDA → modeling → evaluation → delivery artifacts.</li>
            <li><strong>Methodologically honest:</strong> recognizes dataset limitations, avoids inflated conclusions from redundancy.</li>
            <li><strong>Operational thinking:</strong> hierarchical detection reflects realistic IDS decision workflows.</li>
            <li><strong>Balance:</strong> performance, efficiency, and explainability treated as simultaneous constraints.</li>
          </ul>
        </div>

        <div className="pp-section pp-notice" style={{ "--pp-color": "#ef4444", "--pp-glow": "rgba(239, 68, 68, 0.2)" } as React.CSSProperties}>
          <h2 className="pp-section-title">Ethical &amp; Legal Notice</h2>
          <p className="pp-text">
            This work is <strong>strictly academic</strong> and intended for research and educational evaluation
            only. KDD Cup '99 is a historical benchmark — it is <strong>not suitable</strong> as a production
            IDS training source for modern networks without contemporary validation and legally obtained data.
          </p>
          <p className="pp-text">
            The full report, internal datasets, and implementation details are not published in this portfolio.
            Contact me directly for the complete methodology, results, and artifacts.
          </p>
          <div className="pp-contact-box">
            <p>Email: <a href="mailto:pvilardev@gmail.com" style={{ color: "#22c55e" }}>pvilardev@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/pau-vilar/" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e" }}>linkedin.com/in/pau-vilar</a></p>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
