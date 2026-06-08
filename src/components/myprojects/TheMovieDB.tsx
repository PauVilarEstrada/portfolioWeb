import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import movieLogo from "./assets/logosApps/moviedblogo.png";
import tmdbLayout from "./assets/TMDBLayout.png";
import tmdbDetails from "./assets/TMDBDetails.png";
import tmdbFilms from "./assets/TMDBFilms.png";
import tmdbCodPhone from "./assets/TMDBcodPhone.png";
import tmdbXML from "./assets/TMDBXML.png";
import tmdbXML2 from "./assets/TMDBXML2.png";
import tmdbXML3 from "./assets/TMDBXML3.png";

export default function TheMovieDB() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#fb923c", "--pp-glow": "rgba(251, 146, 60, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={movieLogo} alt="The Movie DB" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Android Application · Java / MVVM</span>
          <h1 className="pp-title">The Movie DB App</h1>
          <p className="pp-subtitle">
            A feature-rich Android application consuming <strong>TheMovieDB API</strong> to present popular,
            top-rated, and upcoming movies — with favorites, offline cache, real-time search, and an
            adaptive layout for phones and tablets.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Android</span>
            <span className="pp-tag">Java</span>
            <span className="pp-tag">MVVM</span>
            <span className="pp-tag">Retrofit</span>
            <span className="pp-tag">Room DB</span>
            <span className="pp-tag">LiveData</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Screenshots</h2>
          <div className="pp-gallery c3">
            <img src={tmdbLayout} alt="App Layout" />
            <img src={tmdbDetails} alt="Movie Details" />
            <img src={tmdbFilms} alt="Movie List" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Features</h2>
          <ul className="pp-features">
            <li><strong>Browse popular, top-rated, and upcoming movies</strong> from TMDB API.</li>
            <li><strong>Real-time search</strong> with instant filtering across the catalogue.</li>
            <li><strong>Save favorites locally</strong> via Room DB — persisted across sessions.</li>
            <li><strong>Adaptive layout</strong> for phones and tablets (dual-pane on large screens).</li>
            <li><strong>Offline cache</strong> of last-seen movie list for no-connection access.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Architecture — MVVM</h2>
          <p className="pp-text">
            Built with clean <strong>MVVM architecture</strong> for clear separation of concerns and
            testability. Retrofit handles all API communication and JSON deserialization, Room DB provides
            local persistence, and LiveData drives reactive UI updates without lifecycle leaks.
          </p>
          <ul className="pp-features">
            <li><strong>ViewModel:</strong> Holds UI state, survives configuration changes.</li>
            <li><strong>Retrofit:</strong> REST client with Gson converter for TMDB API calls.</li>
            <li><strong>Room DB:</strong> SQLite abstraction for favorites persistence.</li>
            <li><strong>LiveData:</strong> Observable data streams that respect lifecycle automatically.</li>
            <li><strong>RecyclerView + ViewHolder:</strong> Optimized list rendering with view recycling.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Source Code Preview</h2>
          <div className="pp-gallery c1">
            <img src={tmdbCodPhone} alt="Source Code Mobile" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">UI Layouts (XML)</h2>
          <div className="pp-gallery c3">
            <img src={tmdbXML} alt="XML Layout 1" />
            <img src={tmdbXML2} alt="XML Layout 2" />
            <img src={tmdbXML3} alt="XML Layout 3" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Repository</h2>
          <div className="pp-actions">
            <a
              href="https://github.com/PauVilarEstrada/TheMovieDB"
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
