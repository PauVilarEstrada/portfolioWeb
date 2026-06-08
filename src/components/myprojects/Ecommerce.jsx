import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import ecommerceLogo from "./assets/logosApps/logo-ecommerce.png";
import ecommerceHome from "./assets/ecommerce-home.png";
import ecommerceShoes from "./assets/ecommerce-shoes.png";
import ecommerceCart from "./assets/ecommerce-cart.png";
import ecommerceSection from "./assets/ecommerce-sections.png";
import ecommerceDashboard from "./assets/ecommerce-dashboard.png";

export default function Ecommerce() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#a78bfa", "--pp-glow": "rgba(167, 139, 250, 0.2)" }}>

      <header className="pp-hero">
        <img src={ecommerceLogo} alt="E-Commerce" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Full Stack Web Application · React + Node.js</span>
          <h1 className="pp-title">E-Commerce Platform</h1>
          <p className="pp-subtitle">
            A full-stack e-commerce platform simulating a real online shopping experience — product browsing,
            cart management, secure authentication, <strong>admin dashboard</strong>, image uploads, and
            performance caching via Redis.
          </p>
          <div className="pp-tags">
            <span className="pp-tag">React</span>
            <span className="pp-tag">Node.js</span>
            <span className="pp-tag">MongoDB</span>
            <span className="pp-tag">Redis</span>
            <span className="pp-tag">Cloudinary</span>
            <span className="pp-tag">JWT</span>
            <span className="pp-tag">Zustand</span>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <h2 className="pp-section-title">Screenshots</h2>
          <div className="pp-gallery c2">
            <img src={ecommerceHome} alt="Home — featured products" />
            <img src={ecommerceShoes} alt="Product category with filters" />
            <img src={ecommerceCart} alt="Shopping cart interface" />
            <img src={ecommerceSection} alt="Login and registration" />
          </div>
          <div className="pp-gallery c1" style={{ marginTop: 12 }}>
            <img src={ecommerceDashboard} alt="Admin dashboard" />
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Core Features</h2>
          <ul className="pp-features">
            <li><strong>Secure authentication</strong> — user registration, login, and session management via JWT.</li>
            <li><strong>Product browsing</strong> with category filtering and dynamic listings.</li>
            <li><strong>Dynamic shopping cart</strong> with persistent state across sessions.</li>
            <li><strong>Image uploads</strong> for products via Cloudinary CDN.</li>
            <li><strong>Admin panel</strong> — create, update, delete, and feature products.</li>
            <li><strong>Redis caching (Upstash)</strong> for featured product speed optimization.</li>
            <li><strong>Fully responsive design</strong> for mobile and desktop devices.</li>
            <li><strong>Stripe-ready</strong> placeholder for future payment integration.</li>
          </ul>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Tech Stack</h2>
          <div className="pp-tech-grid">
            {["React", "Vite", "Tailwind CSS", "Zustand", "Framer Motion", "Node.js", "Express", "MongoDB", "Mongoose", "Cloudinary", "Redis / Upstash", "JWT", "Cookie Parser", "Render", "MongoDB Atlas"].map(t => (
              <span key={t} className="pp-tech-badge">{t}</span>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Architecture</h2>
          <p className="pp-text">
            Component-based frontend with <strong>Zustand</strong> managing shared state (cart, auth). The
            backend exposes a <strong>RESTful API</strong> built with Express, connecting to MongoDB via
            Mongoose, storing image URLs through Cloudinary, and caching featured products in Redis (Upstash)
            to reduce database load on hot paths.
          </p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">Links</h2>
          <div className="pp-actions">
            <a href="https://ecommerce-yrau.onrender.com" target="_blank" rel="noopener noreferrer" className="pp-btn-primary">
              Live App →
            </a>
            <a href="https://github.com/PauVilarEstrada/e-commerceWeb" target="_blank" rel="noopener noreferrer" className="pp-btn-secondary">
              GitHub
            </a>
            <a href="https://drive.google.com/file/d/1sJ-6Kzjrt_wjCOIrZHy65XSubOJSV1DN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="pp-btn-secondary">
              Demo Video
            </a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
