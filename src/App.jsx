import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import CameraX from "../src/components/myprojects/CameraX";
import FlappyBird from "../src/components/myprojects/FlappyBird";
import Pacman from "../src/components/myprojects/Pacman";
import TheMovieDB from "../src/components/myprojects/TheMovieDB";

import "./index.css";

function AppContent() {
  const location = useLocation();
  const hideHero = [
    "/projects",
    "/projects/camerax",
    "/projects/flappybird",
    "/projects/pacman",
    "/projects/themoviedb",
    "/experience",
    "/contact"
  ].includes(location.pathname);

  return (
    <div className="app-container">
      <NavBar />
      {!hideHero && <Hero />}
      <Routes>
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/projects/camerax" element={<CameraX />} />
        <Route path="/projects/flappybird" element={<FlappyBird />} />
        <Route path="/projects/pacman" element={<Pacman />} />
        <Route path="/projects/themoviedb" element={<TheMovieDB />} />
      </Routes>
    </div>
  );
}

export default AppContent; // 👈 ya no exportas una función que incluye <Router>
