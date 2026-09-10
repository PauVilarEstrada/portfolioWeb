import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/showcase.css";
import { useI18n } from "../../i18n/LanguageContext";
import { rt } from "../../i18n/rich";
import ecommerceLogo from "./assets/logosApps/logo-ecommerce.png";
import ecommerceHome from "./assets/ecommerce-home.webp";
import ecommerceShoes from "./assets/ecommerce-shoes.webp";
import ecommerceCart from "./assets/ecommerce-cart.webp";
import ecommerceSection from "./assets/ecommerce-sections.webp";
import ecommerceDashboard from "./assets/ecommerce-dashboard.webp";

const LIVE = "https://ecommerce-yrau.onrender.com";
const REPO = "https://github.com/PauVilarEstrada/e-commerceWeb";
const DEMO = "https://drive.google.com/file/d/1sJ-6Kzjrt_wjCOIrZHy65XSubOJSV1DN/view?usp=sharing";

const TECH = ["React", "Vite", "Tailwind CSS", "Zustand", "Framer Motion", "Node.js", "Express",
  "MongoDB", "Mongoose", "Cloudinary", "Redis / Upstash", "JWT", "Cookie Parser", "Render", "MongoDB Atlas"];

export default function Ecommerce() {
  const { t, lang } = useI18n();
  const c = t.pages.ecommerce;
  const g = t.pages.common;

  return (
    <div key={lang} className="pp-page lang-fade" style={{ "--pp-color": "#a78bfa", "--pp-glow": "rgba(167, 139, 250, 0.2)" }}>

      <header className="pp-hero">
        <img src={ecommerceLogo} alt={c.title} className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">{c.label}</span>
          <h1 className="pp-title">{c.title}</h1>
          <p className="pp-subtitle">{rt(c.subtitle)}</p>
          <div className="pp-tags">
            {c.tags.map(x => <span key={x} className="pp-tag">{x}</span>)}
          </div>
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={LIVE} target="_blank" rel="noopener noreferrer">{c.ctaLive}</a>
            <a className="pp-btn-secondary" href={REPO} target="_blank" rel="noopener noreferrer">{g.repo}</a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <div className="sc-specs">
            {c.specs.map(sp => (
              <div key={sp.l} className="sc-spec">
                <span className="sc-spec-value">{sp.v}</span>
                <span className="sc-spec-label">{sp.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.storefrontTitle}</h2>
          <p className="pp-text">{c.storefrontP}</p>
          <div className="sc-shot sc-shot--pad">
            <img src={ecommerceHome} alt={c.storefrontTitle} loading="lazy" />
          </div>
          <p className="sc-caption">{c.storefrontCaption}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.flowTitle}</h2>
          <div className="sc-split">
            <div className="sc-split-media"><img src={ecommerceShoes} alt={c.catH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.catKicker}</span>
              <h3>{c.catH}</h3>
              <p>{c.catP}</p>
            </div>
          </div>
          <div className="sc-split reverse">
            <div className="sc-split-media"><img src={ecommerceCart} alt={c.cartH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.cartKicker}</span>
              <h3>{c.cartH}</h3>
              <p>{c.cartP}</p>
            </div>
          </div>
          <div className="sc-split">
            <div className="sc-split-media"><img src={ecommerceSection} alt={c.authH} loading="lazy" /></div>
            <div className="sc-split-body">
              <span className="sc-kicker">{c.authKicker}</span>
              <h3>{c.authH}</h3>
              <p>{c.authP}</p>
            </div>
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.adminTitle}</h2>
          <p className="pp-text">{c.adminP}</p>
          <div className="sc-shot sc-shot--pad">
            <img src={ecommerceDashboard} alt={c.adminTitle} loading="lazy" />
          </div>
          <p className="sc-caption">{c.adminCaption}</p>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.featuresTitle}</h2>
          <div className="sc-cards">
            {c.features.map(f => (
              <div key={f.t} className="sc-card">
                <span className="sc-card-icon">{f.icon}</span>
                <h4>{f.t}</h4>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{c.archTitle}</h2>
          <div className="sc-flow">
            {c.flow.map(f => (
              <div key={f.t} className="sc-flow-step">
                <h4>{f.t}</h4>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pp-section">
          <h2 className="pp-section-title">{g.tech}</h2>
          <div className="pp-tech-grid">
            {TECH.map(x => <span key={x} className="pp-tech-badge">{x}</span>)}
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">{c.tryTitle}</h2>
          <p className="pp-text">{c.tryP}</p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={LIVE} target="_blank" rel="noopener noreferrer">{c.liveBtn}</a>
            <a className="pp-btn-secondary" href={REPO} target="_blank" rel="noopener noreferrer">{g.repo}</a>
            <a className="pp-btn-secondary" href={DEMO} target="_blank" rel="noopener noreferrer">{c.demoBtn}</a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">{g.back}</Link>
      </div>
    </div>
  );
}
