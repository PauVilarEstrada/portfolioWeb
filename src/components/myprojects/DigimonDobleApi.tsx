import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import digimonLogo from "./assets/logosApps/logodigimon.png";
import digimon1 from "../../assets/DigiList1.png";
import digimon2 from "../../assets/DigiClick.png";
import digimon3 from "../../assets/DigiDiferentClick.png";
import digimon4 from "../../assets/DigiClickLado.png";
import digimon5 from "../../assets/DigiGrid.png";
import digimon6 from "../../assets/DigiGridLado.png";
import digimon7 from "../../assets/DigiSearch.png";
import digimonCode1 from "../../assets/DigiCode1.png";
import digimonCode2 from "../../assets/DigiCode2.png";

export default function DigimonDobleApi() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#f97316", "--pp-glow": "rgba(249, 115, 22, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={digimonLogo} alt="Digimon" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Android Application · Java / Dual API</span>
          <h1 className="pp-title">Double API — Digimon App</h1>
          <p className="pp-subtitle">
            An Android app connecting to <strong>two different Digimon APIs</strong> to deliver a complete
            experience — detailed Digimon info, evolutions, levels, types, attributes, and descriptions, all
            cached locally for offline access.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Android</span>
            <span className="pp-tag">Java</span>
            <span className="pp-tag">REST API</span>
            <span className="pp-tag">Glide</span>
            <span className="pp-tag">RecyclerView</span>
            <span className="pp-tag">SharedPreferences</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Screenshots</h2>
          <div className="pp-gallery c3">
            <img src={digimon1} alt="Digimon List View" />
            <img src={digimon2} alt="Detail View" />
            <img src={digimon3} alt="Options Click" />
            <img src={digimon4} alt="Portrait Layout" />
            <img src={digimon5} alt="Grid View" />
            <img src={digimon6} alt="Grid Portrait" />
            <img src={digimon7} alt="Search" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Features</h2>
          <ul className="pp-features">
            <li><strong>Search by Digimon name</strong> with real-time filtering.</li>
            <li><strong>Detailed view</strong> with extended info from the secondary API.</li>
            <li><strong>Toggle between list and grid view</strong> seamlessly.</li>
            <li><strong>Local cache with SharedPreferences</strong> for offline-first experience.</li>
            <li><strong>Filter by level</strong> — Mega, Rookie, Champion, and more.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Technical Architecture</h2>
          <p className="pp-text">
            Built with <strong>Android Studio + Java</strong>. Uses Glide for efficient image loading,
            RecyclerView for dynamic listings, and AsyncTask for API calls. Handles two different endpoints to
            combine basic and advanced Digimon information.
          </p>
          <ul className="pp-features">
            <li><strong>MainActivity:</strong> Manages view state and API request orchestration.</li>
            <li><strong>DigimonAdapter:</strong> Handles both list and grid RecyclerView visualizations.</li>
            <li><strong>DigimonDetailActivity:</strong> Displays detailed info and evolutions from secondary API.</li>
            <li><strong>EvolutionAdapter:</strong> Renders evolution chain data from the secondary endpoint.</li>
            <li><strong>GetDigimonDetails:</strong> Manages networking, JSON parsing, and local data caching.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Code Preview</h2>
          <div className="pp-gallery c2">
            <img src={digimonCode1} alt="Java Code — Details" />
            <img src={digimonCode2} alt="Java Code — Adapter" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Repository</h2>
          <div className="pp-actions">
            <a
              href="https://github.com/PauVilarEstrada/Doble-API-Digimon-PokeDigimon"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-btn-primary"
            >
              GitHub →
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
