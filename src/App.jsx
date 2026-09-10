import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import DocumentMeta from "./components/DocumentMeta";
import HomePage from "./components/HomePage";

import "./index.css";

// Project pages are heavy and rarely the first screen — load them on demand.
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
const ExperienceSection = lazy(() => import("./components/ExperienceSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));
const NBAVision = lazy(() => import("./components/myprojects/NBAVision"));
const MindFlow = lazy(() => import("./components/myprojects/MindFlow"));
const UltimusDefensor = lazy(() => import("./components/myprojects/UltimusDefensor"));
const FlappyBird = lazy(() => import("./components/myprojects/FlappyBird"));
const Pacman = lazy(() => import("./components/myprojects/Pacman"));
const Ecommerce = lazy(() => import("./components/myprojects/Ecommerce"));
const KDD = lazy(() => import("./components/myprojects/kdd"));

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="route-fallback-dot" />
      <span className="route-fallback-dot" />
      <span className="route-fallback-dot" />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <ScrollToTop />
      <DocumentMeta />
      <NavBar />
      <main id="main">
      <Suspense fallback={<RouteFallback />}>
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
          {/* Anything else (old links, typos) lands on the home page instead of a blank screen */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      </main>
    </div>
  );
}
