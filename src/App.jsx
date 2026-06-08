import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import CustomCursor from "./components/CustomCursor";
import NavHint from "./components/NavHint";
import HomePage from "./components/HomePage";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import CameraX from "./components/myprojects/CameraX";
import FlappyBird from "./components/myprojects/FlappyBird";
import Pacman from "./components/myprojects/Pacman";
import TheMovieDB from "./components/myprojects/TheMovieDB";
import DigimonDobleApi from "./components/myprojects/DigimonDobleApi";
import Ecommerce from "./components/myprojects/Ecommerce";
import KDD from "./components/myprojects/KDD";
import UltimusDefensor from "./components/myprojects/UltimusDefensor";

import "./index.css";

function AppContent() {
  return (
    <div className="app-container">
      <CustomCursor />
      <NavHint />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/projects/ultimusdefensor" element={<UltimusDefensor />} />
        <Route path="/projects/camerax" element={<CameraX />} />
        <Route path="/projects/flappybird" element={<FlappyBird />} />
        <Route path="/projects/pacman" element={<Pacman />} />
        <Route path="/projects/themoviedb" element={<TheMovieDB />} />
        <Route path="/projects/digimon" element={<DigimonDobleApi />} />
        <Route path="/projects/ecommerce" element={<Ecommerce />} />
        <Route path="/projects/kdd" element={<KDD />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
