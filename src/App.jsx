import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import IntroLoader from "./components/IntroLoader";
import DocumentMeta from "./components/DocumentMeta";
import HomePage from "./components/HomePage";

import "./index.css";

// Everything except the home page loads on demand, and is prefetched once the browser is idle
// so the page-transition curtain never reveals a loading state.
const loaders = {
  projects: () => import("./components/ProjectsSection"),
  experience: () => import("./components/ExperienceSection"),
  contact: () => import("./components/ContactSection"),
  tactiq: () => import("./components/myprojects/Tactiq360"),
  nba: () => import("./components/myprojects/NBAVision"),
  mindflow: () => import("./components/myprojects/MindFlow"),
  ultimus: () => import("./components/myprojects/UltimusDefensor"),
  flappy: () => import("./components/myprojects/FlappyBird"),
  pacman: () => import("./components/myprojects/Pacman"),
  ecommerce: () => import("./components/myprojects/Ecommerce"),
  kdd: () => import("./components/myprojects/kdd"),
};
const ProjectsSection = lazy(loaders.projects);
const ExperienceSection = lazy(loaders.experience);
const ContactSection = lazy(loaders.contact);
const Tactiq360 = lazy(loaders.tactiq);
const NBAVision = lazy(loaders.nba);
const MindFlow = lazy(loaders.mindflow);
const UltimusDefensor = lazy(loaders.ultimus);
const FlappyBird = lazy(loaders.flappy);
const Pacman = lazy(loaders.pacman);
const Ecommerce = lazy(loaders.ecommerce);
const KDD = lazy(loaders.kdd);

/** Wait for the first paint to settle before prefetching the other pages. */
const PREFETCH_DELAY_MS = 2500;

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const id = window.setTimeout(() => Object.values(loaders).forEach(load => load()), PREFETCH_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <DocumentMeta />
      <IntroLoader />
      <NavBar />
      <main id="main" tabIndex={-1}>
        <PageTransition>
          {location => (
            <>
              <ScrollToTop location={location} />
              <Suspense fallback={<RouteFallback />}>
                <div key={location.pathname} className="page-enter">
                  <Routes location={location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsSection />} />
                    <Route path="/experience" element={<ExperienceSection />} />
                    <Route path="/contact" element={<ContactSection />} />
                    <Route path="/projects/tactiq360" element={<Tactiq360 />} />
                    <Route path="/projects/nbavision" element={<NBAVision />} />
                    <Route path="/projects/mindflow" element={<MindFlow />} />
                    <Route path="/projects/ultimusdefensor" element={<UltimusDefensor />} />
                    <Route path="/projects/flappybird" element={<FlappyBird />} />
                    <Route path="/projects/pacman" element={<Pacman />} />
                    <Route path="/projects/ecommerce" element={<Ecommerce />} />
                    <Route path="/projects/kdd" element={<KDD />} />
                    {/* Old links and typos land on the home page instead of a blank screen */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </Suspense>
            </>
          )}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
