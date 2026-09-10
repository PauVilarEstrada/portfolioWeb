import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import HomePage from "./components/HomePage";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import FlappyBird from "./components/myprojects/FlappyBird";
import Pacman from "./components/myprojects/Pacman";
import Ecommerce from "./components/myprojects/Ecommerce";
import KDD from "./components/myprojects/kdd";
import UltimusDefensor from "./components/myprojects/UltimusDefensor";
import MindFlow from "./components/myprojects/MindFlow";
import NBAVision from "./components/myprojects/NBAVision";

import "./index.css";

function AppContent() {
  return (
    <div className="app-container">
      <CustomCursor />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/projects/nbavision" element={<NBAVision />} />
        <Route path="/projects/mindflow" element={<MindFlow />} />
        <Route path="/projects/ultimusdefensor" element={<UltimusDefensor />} />
        <Route path="/projects/flappybird" element={<FlappyBird />} />
        <Route path="/projects/pacman" element={<Pacman />} />
        <Route path="/projects/ecommerce" element={<Ecommerce />} />
        <Route path="/projects/kdd" element={<KDD />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
