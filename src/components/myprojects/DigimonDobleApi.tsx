import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/digimonDobleApi.css";
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
    <section className="digimon-container">
      <h1>Double API - Digimon App</h1>
      <p>
        This Android app connects to two different Digimon APIs to deliver a complete experience.
        You can view detailed information about each Digimon, including evolutions, levels, types,
        attributes, and descriptions.
      </p>

      <div className="image-gallery">
        <img src={digimon1} alt="Digimon List View" className="gameplay-image" />
        <img src={digimon2} alt="Digimon Detail View" className="gameplay-image" />
        <img src={digimon3} alt="Digimon Evolution View" className="gameplay-image" />
        <img src={digimon4} alt="Digimon Evolution View" className="gameplay-image" />
        <img src={digimon5} alt="Digimon Evolution View" className="gameplay-image" />
        <img src={digimon6} alt="Digimon Evolution View" className="gameplay-image" />
        <img src={digimon7} alt="Digimon Evolution View" className="gameplay-image" />
      </div>

      <h2>📌 Features</h2>
      <ul className="digimon-features">
        <li>🔍 Search by Digimon name.</li>
        <li>🧬 Detailed view with extended info.</li>
        <li>🔁 Toggle between list and grid view.</li>
        <li>🧠 Local cache with SharedPreferences.</li>
        <li>⚙️ Filter by level (Mega, Rookie, Champion...)</li>
      </ul>

      <h2>⚙️ Technical Architecture</h2>
      <p>
        Developed using Android Studio and Java. The app uses Glide for image loading,
        RecyclerView for dynamic listings, and AsyncTask for API calls. It handles two
        different endpoints to combine both basic and advanced information about each Digimon.
      </p>

      <h3>🔧 Main Components</h3>
      <ul>
        <li><strong>MainActivity:</strong> Manages views and API requests.</li>
        <li><strong>DigimonAdapter:</strong> Handles both list and grid visualizations.</li>
        <li><strong>DigimonDetailActivity:</strong> Displays detailed Digimon info and evolutions.</li>
        <li><strong>EvolutionAdapter:</strong> Renders evolution data from secondary API.</li>
        <li><strong>GetDigimonDetails:</strong> Manages networking and local data caching.</li>
      </ul>

      <h2>📜 Code Preview</h2>
      <div className="code-gallery">
        <img src={digimonCode1} alt="Java Code - Details" className="code-image1" />
        <img src={digimonCode2} alt="Java Code - Adapter" className="code-image2" />
      </div>

      <h2>🔗 GitHub Repository</h2>
      <p>
        You can check out the full source code on GitHub:
        <br />
        <a href="https://github.com/PauVilarEstrada/Doble-API-Digimon-PokeDigimon" target="_blank" rel="noopener noreferrer">
          Double API Digimon - GitHub Repo
        </a>
      </p>

      <Link to="/projects" className="digimon-back-link">🔙 Back to Projects</Link>
    </section>
  );
}
