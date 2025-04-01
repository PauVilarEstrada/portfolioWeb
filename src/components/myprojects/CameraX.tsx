import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/cameraX.css";
import cameraLogo from "../myprojects/assets/logosApps/cameralogo.png";
import cameraX1 from "./assets/CameraXFoto.png";
import cameraX2 from "./assets/CameraXcod.png";
import cameraX3 from "./assets/CameraXGaleria.png";
import cameraX4 from "./assets/CameraXSelfie.png";

export default function CameraX() {
  return (
    <section className="camerax-container">
      <h1>CameraX</h1>
      <p>
        CameraX is an advanced photography application designed to enhance image 
        quality and provide professional-level editing tools. It utilizes Android's CameraX 
        library to deliver seamless photo and video capturing capabilities.
      </p>
      
      <div className="image-gallery">
        <img src={cameraX1} alt="Main CameraX Interface" />
        <img src={cameraX3} alt="CameraX Gallery Access" />
        <img src={cameraX4} alt="CameraX Selfie Mode" />
      </div>
      
      <h2>📌 Features</h2>
      <ul className="camerax-features">
        <li>📷 AI-powered image enhancement for superior quality.</li>
        <li>🎨 Advanced filters and real-time color correction.</li>
        <li>🔄 Cloud storage integration for easy access.</li>
        <li>📸 Instant photo capture with a notification feedback system.</li>
        <li>🎥 Video recording with start/stop notifications.</li>
        <li>🔁 Front and rear camera switching.</li>
        <li>⚡ Flash toggle with real-time user feedback.</li>
        <li>🖼️ Quick access to the last captured photo/video via a gallery shortcut.</li>
      </ul>
      
      <h2>⚙️ Technical Implementation</h2>
      <p>
        The application is built using CameraX, leveraging its modular and flexible API to
        manage camera functions efficiently. It ensures compatibility with the latest 
        Android versions and optimizes performance for a smooth user experience.
      </p>
      
      <h3>🔧 Core Methods</h3>
      <ul>
        <li><strong>startCamera()</strong> - Initializes the camera and binds use cases.</li>
        <li><strong>takePhoto()</strong> - Captures and saves an image with a unique filename.</li>
        <li><strong>captureVideo()</strong> - Starts/stops video recording with user prompts.</li>
        <li><strong>switchCamera()</strong> - Toggles between front and rear cameras.</li>
        <li><strong>toggleFlash()</strong> - Enables/disables the flash with a UI notification.</li>
        <li><strong>loadThumbnail()</strong> - Loads the most recent captured media preview.</li>
        <li><strong>openGallery()</strong> - Opens Google Photos for viewing saved images/videos.</li>
      </ul>
      
      <h2>📂 Storage & Permissions</h2>
      <p>
        Captured photos and videos are stored locally in the device's gallery, ensuring easy 
        access. The app requests the necessary permissions for camera usage, video 
        recording, and external storage access upon launch.
      </p>
      
      <h2>📜 Dependencies</h2>
      <ul>
        <li><strong>androidx.camera:camera-core</strong> - Core CameraX functionality.</li>
        <li><strong>androidx.camera:camera-camera2</strong> - Integration with Camera2 API.</li>
        <li><strong>androidx.camera:camera-lifecycle</strong> - Efficient lifecycle management.</li>
        <li><strong>androidx.camera:camera-video</strong> - Video capturing support.</li>
        <li><strong>androidx.camera:camera-view</strong> - UI preview implementation.</li>
        <li><strong>androidx.camera:camera-extensions</strong> - Additional CameraX features.</li>
      </ul>
      
      <h2>🔗 GitHub Repository</h2>
      <p>
        The full source code for CameraX can be found on GitHub:
        <br />
        <a href="https://github.com/PauVilarEstrada/Project-Camera-X-" target="_blank" rel="noopener noreferrer">
          CameraX GitHub Repository
        </a>
      </p>
      
      <h2>📜 Source Code</h2>
      <div className="code-section">
        <img src={cameraX2} alt="CameraX Source Code" className="code-image" />
      </div>
      
      <Link to="/projects" className="camerax-back-link">🔙 Back to Projects</Link>
    </section>
  );
}
