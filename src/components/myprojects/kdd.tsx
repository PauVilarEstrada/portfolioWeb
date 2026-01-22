import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/kdd.css";
import kdd from "../myprojects/assets/logosApps/kdd.png";

export default function Clav() {
  return (
    <section className="clav-container">
      <header className="clav-hero">
        <div className="clav-hero-text">
          <h1>Intrusion Detection System (IDS) — KDD Cup ’99 (Academic Project)</h1>
          <p className="clav-subtitle">
            A Machine Learning–driven Intrusion Detection System combining <strong>Cybersecurity</strong>,{" "}
            <strong>Big Data</strong>, and <strong>Artificial Intelligence</strong> through an end-to-end workflow:
            dataset engineering, EDA, model evaluation, and a hierarchical detection pipeline.
          </p>

          <div className="clav-meta">
            <span className="clav-tag">AI</span>
            <span className="clav-tag">Big Data</span>
            <span className="clav-tag">Cybersecurity</span>
            <span className="clav-tag">Machine Learning</span>
            <span className="clav-tag">Neural Networks</span>
            <span className="clav-tag">EDA / BI</span>
          </div>
        </div>

        <div className="clav-hero-media">
          <img src={kdd} alt="KDD Cup 99 - IDS Project" className="clav-cover" />
        </div>
      </header>

      <div className="clav-section">
        <h2>Project Overview</h2>
        <p>
          This project explores the design of an <strong>Intrusion Detection System (IDS)</strong> based on{" "}
          <strong>predictive classification</strong>. Using KDD Cup ’99 as a benchmark dataset, we built a full
          experimental workflow: large-scale data consolidation, controlled reduction and specialization of datasets,
          exploratory analysis, evaluation of multiple ML approaches, and a final{" "}
          <strong>hierarchical pipeline</strong> that improves interpretability and operational robustness.
        </p>
      </div>

      <div className="clav-section">
        <h2>Team & Collaboration</h2>
        <p>
          This is a <strong>group project (5 members)</strong> developed as part of a Master’s program. I contributed
          as a team member across data preparation, analysis, modeling, and project integration.
        </p>
        <ul className="clav-list">
          <li>Adrià Garzón</li>
          <li>Joel Mateos</li>
          <li>Alex Montes</li>
          <li>Alejandro Soriano</li>
          <li>Pau Vilar</li>
        </ul>
      </div>

      <div className="clav-section">
        <h2>Dataset Engineering (Why multiple datasets)</h2>
        <p>
          The original unified dataset contains <strong>more than 5 million network connection records</strong>.
          However, KDD’99 is known for issues such as redundancy and distribution biases. Training directly on the
          full dataset can inflate performance and reduce the credibility of conclusions.
        </p>

        <p>
          To address this, we applied a controlled process of cleaning, reduction, and task-specific dataset design.
          The result is not a single “magic dataset”, but a set of specialized subsets aligned with each detection
          objective.
        </p>

        <h3>Key datasets used</h3>
        <ul className="clav-list">
          <li>
            <strong>Main reduced dataset (~42,301 records):</strong> common baseline for classical ML experiments and
            general analysis (attack vs normal).
          </li>
          <li>
            <strong>Specialized subsets for hierarchical detection:</strong> datasets tailored to each stage (e.g.,
            separating R2L/U2R vs other attacks; DoS vs Probe after filtering).
          </li>
          <li>
            <strong>Neural network dataset (~1.1M records):</strong> a larger alternative dataset used because neural
            architectures typically benefit from greater sample sizes and class exposure.
          </li>
          <li>
            <strong>Total derived datasets:</strong> a complete workflow of <strong>19 datasets</strong> created from
            different filtering/relabeling strategies to ensure each model is trained on data aligned with its task.
          </li>
        </ul>
      </div>

      <div className="clav-section">
        <h2>Exploratory Data Analysis (EDA)</h2>
        <p>
          The EDA phase was not cosmetic: it guided feature handling and model choice. The dataset includes mixed
          variable types (categorical + numerical), extreme outliers, heavy-tailed distributions (e.g., bytes and
          durations), and attack families with different behavioral signatures.
        </p>

        <h3>What we analyzed</h3>
        <ul className="clav-list">
          <li>
            <strong>Class distribution</strong> and imbalance patterns (especially for minority attacks such as R2L/U2R).
          </li>
          <li>
            <strong>Outliers and skewness</strong> in continuous variables (duration, src_bytes, dst_bytes), motivating
            log transforms and robust preprocessing.
          </li>
          <li>
            <strong>Separability signals</strong>: traffic-volume patterns for DoS/Probe vs authentication/content signals
            for R2L/U2R.
          </li>
          <li>
            <strong>Feature redundancy</strong> and correlation structure to avoid duplicated information that inflates
            dimensionality without adding predictive power.
          </li>
        </ul>

        <p>
          The EDA conclusions directly supported splitting the problem: DoS/Probe is largely “network traffic behavior”,
          while R2L/U2R relies more on authentication/content indicators—meaning a single global classifier can be
          misleading.
        </p>
      </div>

      <div className="clav-section">
        <h2>Modeling Approach</h2>
        <p>
          We implemented and evaluated a diverse set of models to compare inductive biases and suitability for intrusion
          detection. The goal was not “use everything”, but understand what works under each subtask and why.
        </p>

        <h3>Models evaluated (classical ML + exploratory unsupervised)</h3>
        <ul className="clav-list">
          <li>
            <strong>Supervised:</strong> KNN, Decision Tree, Random Forest, XGBoost, SVM, Logistic Regression, Linear
            Regression (as baseline).
          </li>
          <li>
            <strong>Unsupervised (exploratory):</strong> K-Means, DBSCAN — used to inspect structure/density rather than
            replace supervised detection.
          </li>
        </ul>

        <h3>Neural Networks</h3>
        <ul className="clav-list">
          <li>
            <strong>MLP (Multilayer Perceptron):</strong> trained using a larger dataset and compared against classical
            baselines, including experiments with imbalance handling (oversampling).
          </li>
          <li>
            <strong>Multiclass/Taxonomy experiments:</strong> tested different label groupings to study the trade-off
            between granularity and learnability.
          </li>
        </ul>
      </div>

      <div className="clav-section">
        <h2>Final Solution: Hierarchical Detection Pipeline</h2>
        <p>
          The final architecture is a <strong>multi-stage pipeline</strong> designed to reflect how IDS decisions are
          often made operationally: start broad, then specialize. This structure improves interpretability and allows
          dedicated handling of low-frequency but high-impact attack families.
        </p>

        <ol className="clav-steps">
          <li>
            <strong>Stage 1 — Binary detection:</strong> Normal vs Attack (Decision Tree).
          </li>
          <li>
            <strong>Stage 2 — Targeted filtering:</strong> R2L/U2R vs other attacks (specialized Decision Tree).
          </li>
          <li>
            <strong>Stage 3 — Network attack family:</strong> DoS vs Probe (Random Forest ensemble).
          </li>
        </ol>

        <p>
          This decomposition is based on observed dataset structure: DoS/Probe presents strong traffic-pattern signals,
          while R2L/U2R depends on different feature groups, making specialization both technically justified and easier
          to explain.
        </p>
      </div>

      <div className="clav-section">
        <h2>Outputs & Deliverables</h2>
        <p>
          Beyond modeling, the project includes deliverables aimed at analysis and communication—important for any
          real-world security workflow.
        </p>

        <ul className="clav-list">
          <li>
            <strong>Power BI dashboard:</strong> interactive exploratory views (class distributions, protocol/service
            patterns, relationships among key variables).
          </li>
          <li>
            <strong>Tableau visualizations:</strong> complementary analysis and presentation.
          </li>
          <li>
            <strong>Web interface:</strong> a visual consolidation layer to present the hierarchical inference outputs.
          </li>
        </ul>
      </div>

      <div className="clav-section clav-ethics">
        <h2>Ethical & Legal Notice (Academic Use Only)</h2>
        <p>
          This work is <strong>strictly academic</strong> and intended for research and educational evaluation only.
          The KDD Cup ’99 dataset is a historical benchmark derived from simulated traffic; it is useful for methodology
          and comparative modeling, but it is <strong>not suitable</strong> as a production IDS training source for modern
          networks without contemporary validation and legally obtained data.
        </p>

        <p>
          For that reason, I will <strong>not publish the full report</strong>, internal datasets, or implementation
          details in this portfolio. If you are interested in the complete work (methodology, results, and artifacts),
          please contact me via email or LinkedIn.
        </p>

        <div className="clav-contact-box">
          <p>
            📧 Email:{" "}
            <a href="mailto:pvilardev@gmail.com" className="clav-email">
              pvilardev@gmail.com
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/pauvilardev" className="clav-linkedin">
              linkedin.com/in/pauvilardev
            </a>
          </p>
        </div>
      </div>

      <div className="clav-section">
        <h2>Why this project matters</h2>
        <ul className="clav-list">
          <li>
            <strong>End-to-end scope:</strong> data engineering → EDA → modeling → evaluation → delivery artifacts.
          </li>
          <li>
            <strong>Methodologically honest:</strong> recognizes dataset limitations and avoids “inflated” conclusions
            caused by redundancy.
          </li>
          <li>
            <strong>Operational thinking:</strong> hierarchical detection reflects realistic IDS decision workflows.
          </li>
          <li>
            <strong>Balance:</strong> performance, efficiency, and explainability are treated as simultaneous constraints.
          </li>
        </ul>
      </div>

      <Link to="/projects" className="clav-back-link">
        🔙 Back to Projects
      </Link>
    </section>
  );
}
