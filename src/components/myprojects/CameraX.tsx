import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import cameraLogo from "./assets/logosApps/cameralogo.png";
import cameraX1 from "./assets/CameraXFoto.png";
import cameraX2 from "./assets/CameraXcod.png";
import cameraX3 from "./assets/CameraXGaleria.png";
import cameraX4 from "./assets/CameraXSelfie.png";

export default function CameraX() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#22d3ee", "--pp-glow": "rgba(34, 211, 238, 0.2)" } as React.CSSProperties}>

      <header className="pp-hero">
        <img src={cameraLogo} alt="CameraX" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Android Application · Kotlin / CameraX</span>
          <h1 className="pp-title">CameraX</h1>
          <p className="pp-subtitle">
            An advanced photography application leveraging Android's <strong>CameraX library</strong> to deliver
            seamless photo and video capturing with professional-level controls, real-time feedback, and gallery
            integration.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">Android</span>
            <span className="pp-tag">CameraX</span>
            <span className="pp-tag">Kotlin</span>
            <span className="pp-tag">Camera2 API</span>
            <span className="pp-tag">Lifecycle</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Screenshots</h2>
          <div className="pp-gallery c3">
            <img src={cameraX1} alt="CameraX Main Interface" />
            <img src={cameraX3} alt="CameraX Gallery Access" />
            <img src={cameraX4} alt="CameraX Selfie Mode" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Features</h2>
          <ul className="pp-features">
            <li><strong>AI-powered image enhancement</strong> for superior photo quality.</li>
            <li><strong>Advanced filters</strong> and real-time color correction pipeline.</li>
            <li><strong>Cloud storage integration</strong> for easy cross-device access.</li>
            <li><strong>Instant photo capture</strong> with notification feedback system.</li>
            <li><strong>Video recording</strong> with start/stop notifications.</li>
            <li><strong>Front and rear camera switching</strong> on demand.</li>
            <li><strong>Flash toggle</strong> with real-time user feedback.</li>
            <li><strong>Gallery shortcut</strong> — quick access to the last captured media.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Technical Implementation</h2>
          <p className="pp-text">
            Built using CameraX's modular and flexible API, ensuring compatibility with the latest Android
            versions and optimizing performance for a smooth user experience. Core methods:
          </p>
          <ul className="pp-features">
            <li><strong>startCamera()</strong> — Initializes the camera and binds use cases to lifecycle.</li>
            <li><strong>takePhoto()</strong> — Captures and saves an image with a unique filename.</li>
            <li><strong>captureVideo()</strong> — Starts/stops video recording with user prompts.</li>
            <li><strong>switchCamera()</strong> — Toggles between front and rear cameras.</li>
            <li><strong>toggleFlash()</strong> — Enables/disables flash with UI notification.</li>
            <li><strong>loadThumbnail()</strong> — Loads the most recent captured media preview.</li>
            <li><strong>openGallery()</strong> — Opens Google Photos for saved media viewing.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Dependencies</h2>
          <div className="pp-tech-grid">
            {[
              "camera-core",
              "camera-camera2",
              "camera-lifecycle",
              "camera-video",
              "camera-view",
              "camera-extensions",
            ].map(d => (
              <span key={d} className="pp-tech-badge">androidx.camera:{d}</span>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Source Code Preview</h2>
          <div className="pp-gallery c1">
            <img src={cameraX2} alt="CameraX Source Code" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Repository</h2>
          <div className="pp-actions">
            <a
              href="https://github.com/PauVilarEstrada/Project-Camera-X-"
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
