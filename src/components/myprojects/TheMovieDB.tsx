import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/themoviedb.css";
import tmdbLayout from "./assets/TMDBLayout.png";
import tmdbDetails from "./assets/TMDBDetails.png";
import tmdbFilms from "./assets/TMDBFilms.png";
import tmdbCodPhone from "./assets/TMDBcodPhone.png";
import tmdbXML from "./assets/TMDBXML.png";
import tmdbXML2 from "./assets/TMDBXML2.png";
import tmdbXML3 from "./assets/TMDBXML3.png";

export default function TheMovieDB() {
  return (
    <section className="themoviedb-container">
      <h1>The Movie DB App</h1>
      <p>
        The Movie DB is a feature-rich Android application that consumes TheMovieDB API
        to present users with popular, top-rated, and upcoming movies. The app allows users
        to explore details of films, manage favorites, and enjoy an intuitive layout optimized
        for mobile experience.
      </p>

      <div className="image-gallery">
        <img src={tmdbLayout} alt="TMDB App Layout" />
        <img src={tmdbDetails} alt="TMDB Movie Details" />
        <img src={tmdbFilms} alt="TMDB Movie List" />
      </div>

      <h2>📌 Features</h2>
      <ul className="themoviedb-features">
        <li>🎬 Browse popular, top-rated, and upcoming movies.</li>
        <li>🔍 Search functionality with real-time filtering.</li>
        <li>⭐ Save favorites locally with shared preferences.</li>
        <li>📱 Adaptive layout for phones and tablets.</li>
        <li>💾 Offline cache for last seen movie list.</li>
      </ul>

      <h2>⚙️ Technical Implementation</h2>
      <p>
        The project was developed using Java and Android Studio. It integrates RESTful API
        calls via Retrofit and handles JSON responses to dynamically populate the UI. 
        RecyclerView and ViewHolder patterns were used for optimized performance.
      </p>

      <h3>🧠 Architecture</h3>
      <ul>
        <li><strong>MVVM Pattern:</strong> Clean separation of concerns for scalability.</li>
        <li><strong>Retrofit:</strong> Handles API requests and data parsing.</li>
        <li><strong>Room DB:</strong> Used for local persistence (favorites).</li>
        <li><strong>LiveData & ViewModel:</strong> For reactive UI updates.</li>
      </ul>

      <h2>🖥️ Source Code</h2>
<div className="code-block">
  <img src={tmdbCodPhone} alt="TMDB Code Mobile" />
</div>

<h2>📱 UI Layouts (XML)</h2>
<div className="code-gallery">
  <img src={tmdbXML} alt="TMDB XML Layout 1" className="code-image" />
  <img src={tmdbXML2} alt="TMDB XML Layout 2" className="code-image" />
  <img src={tmdbXML3} alt="TMDB XML Layout 3" className="code-image" />
</div>


      <h2>🔗 GitHub Repository</h2>
      <p>
        You can explore the full source code on GitHub:
        <br />
        <a href="https://github.com/PauVilarEstrada/TheMovieDB" target="_blank" rel="noopener noreferrer">
          TheMovieDB GitHub Repository
        </a>
      </p>

      <Link to="/projects" className="themoviedb-back-link">🔙 Back to Projects</Link>
    </section>
  );
}
