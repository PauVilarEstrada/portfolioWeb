import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import CameraX from "../src/components/myprojects/CameraX";
import FlappyBird from "../src/components/myprojects/FlappyBird";
import Pacman from "../src/components/myprojects/Pacman";
import TheMovieDB from "../src/components/myprojects/TheMovieDB";
import DigimonDobleApi from "../src/components/myprojects/DigimonDobleApi";
import Ecommerce from "../src/components/myprojects/Ecommerce";

import "./index.css";

function AppContent() {
  const location = useLocation();
  const hideHero = [
    "/projects",
    "/projects/camerax",
    "/projects/flappybird",
    "/projects/pacman",
      "/projects/ecommerce",
    "/projects/themoviedb",
    "/projects/digimon",
    "/experience",
    "/contact"
  ].includes(location.pathname);
   // Oculta Hero en "Experience"
  

  return (
    <div className="app-container">
      <NavBar />
      {!hideHero && <Hero />} {/* Oculta Hero solo en /experience */}
      <Routes>
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/projects/camerax" element={<CameraX />} />
        <Route path="/projects/flappybird" element={<FlappyBird />} />
        <Route path="/projects/pacman" element={<Pacman />} />
        <Route path="/projects/themoviedb" element={<TheMovieDB />} />
        <Route path="/projects/digimon" element={<DigimonDobleApi />} />
        <Route path="/projects/ecommerce" element={<Ecommerce />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}