import React from "react";
import { Link } from "react-router-dom";
import "./css/project-page.css";
import "./css/showcase.css";
import ecommerceLogo from "./assets/logosApps/logo-ecommerce.png";
import ecommerceHome from "./assets/ecommerce-home.png";
import ecommerceShoes from "./assets/ecommerce-shoes.png";
import ecommerceCart from "./assets/ecommerce-cart.png";
import ecommerceSection from "./assets/ecommerce-sections.png";
import ecommerceDashboard from "./assets/ecommerce-dashboard.png";

const LIVE = "https://ecommerce-yrau.onrender.com";
const REPO = "https://github.com/PauVilarEstrada/e-commerceWeb";
const DEMO = "https://drive.google.com/file/d/1sJ-6Kzjrt_wjCOIrZHy65XSubOJSV1DN/view?usp=sharing";

const SPECS = [
  { v: "MERN", l: "Stack" },
  { v: "JWT", l: "Auth" },
  { v: "Redis", l: "Hot-path cache" },
  { v: "CDN", l: "Image delivery" },
  { v: "REST", l: "API" },
];

const FEATURES = [
  {
    icon: "🔐",
    t: "Authentication that survives a refresh",
    p: "Registration and login issue a JWT stored in an http-only cookie rather than local storage, so a reload keeps you signed in and a stray script cannot read the token.",
  },
  {
    icon: "🛒",
    t: "A cart that remembers",
    p: "Cart state lives in Zustand and is persisted per user, so items added on one visit are still there on the next — and quantities reconcile against real stock before checkout.",
  },
  {
    icon: "🗂️",
    t: "Browsing that narrows fast",
    p: "Category routes and filters drive server-side queries instead of filtering a giant client payload, so the listing stays quick as the catalogue grows.",
  },
  {
    icon: "🖼️",
    t: "Product images on a CDN",
    p: "Uploads go to Cloudinary and the database stores only the URL. The API never proxies binaries, and images are served from an edge close to the buyer.",
  },
  {
    icon: "⚡",
    t: "Redis on the hot path",
    p: "The featured-products query is the most requested and least changing thing on the site, so it is cached in Redis (Upstash) and invalidated on write instead of hitting MongoDB on every page load.",
  },
  {
    icon: "🛠️",
    t: "A real admin panel",
    p: "Create, update, delete and feature products from the browser — the same REST API the storefront reads, behind a role check.",
  },
];

const FLOW = [
  {
    t: "Client",
    p: "React + Vite, styled with Tailwind, animated with Framer Motion. Zustand holds the two pieces of state that cross the whole app — cart and session — so no prop drilling and no context spaghetti.",
  },
  {
    t: "API",
    p: "Express exposes a RESTful surface: products, categories, cart, auth, admin. Middleware handles token verification and role checks in one place rather than per route.",
  },
  {
    t: "Data",
    p: "MongoDB via Mongoose, hosted on Atlas. Schemas validate before write, so a malformed product never reaches the collection.",
  },
  {
    t: "Cache",
    p: "Redis sits in front of the read-heavy endpoints. Writes invalidate the affected keys, which keeps the cache from being the reason a price looks wrong.",
  },
  {
    t: "Media",
    p: "Cloudinary stores and transforms product imagery; the app holds URLs only.",
  },
  {
    t: "Deploy",
    p: "Deployed on Render against MongoDB Atlas and Upstash — a live, publicly reachable build rather than a localhost demo.",
  },
];

export default function Ecommerce() {
  return (
    <div className="pp-page" style={{ "--pp-color": "#a78bfa", "--pp-glow": "rgba(167, 139, 250, 0.2)" }}>

      <header className="pp-hero">
        <img src={ecommerceLogo} alt="E-Commerce" className="pp-hero-logo" />
        <div className="pp-hero-content">
          <span className="pp-hero-label">Full Stack Web Application · React + Node.js</span>
          <h1 className="pp-title">E-Commerce Platform</h1>
          <p className="pp-subtitle">
            A complete online shop, front to back: browse a catalogue, fill a cart that survives a reload, sign
            in securely, and manage the whole inventory from an <strong>admin dashboard</strong> — with{" "}
            <strong>Redis caching</strong> on the hot paths and product imagery served from a CDN.
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
          <div className="pp-actions" style={{ marginTop: "1.4rem" }}>
            <a className="pp-btn-primary" href={LIVE} target="_blank" rel="noopener noreferrer">
              Open the live shop ↗
            </a>
            <a className="pp-btn-secondary" href={REPO} target="_blank" rel="noopener noreferrer">
              Source on GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="pp-body">

        <div className="pp-section">
          <div className="sc-specs">
            {SPECS.map(s => (
              <div key={s.l} className="sc-spec">
                <span className="sc-spec-value">{s.v}</span>
                <span className="sc-spec-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STOREFRONT */}
        <div className="pp-section">
          <h2 className="pp-section-title">The storefront</h2>
          <p className="pp-text">
            The shop opens on featured products — the one query that every visitor triggers and almost nobody
            changes, which is exactly why it is the query that sits in Redis.
          </p>
          <div className="sc-shot sc-shot--pad">
            <img src={ecommerceHome} alt="Home page with featured products" loading="lazy" />
          </div>
          <p className="sc-caption">Landing page — featured products served from cache.</p>
        </div>

        {/* BROWSE + CART */}
        <div className="pp-section">
          <h2 className="pp-section-title">From browsing to checkout</h2>
          <div className="sc-split">
            <div className="sc-split-media">
              <img src={ecommerceShoes} alt="Category listing with filters" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Catalogue</span>
              <h3>Filter first, fetch second</h3>
              <p>
                Categories and filters are part of the route, so a listing is shareable, back-button friendly,
                and answered by a targeted query rather than by shipping the whole catalogue to the browser and
                hiding most of it.
              </p>
            </div>
          </div>
          <div className="sc-split reverse">
            <div className="sc-split-media">
              <img src={ecommerceCart} alt="Shopping cart" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Cart</span>
              <h3>Persistent, reconciled, honest</h3>
              <p>
                The cart is stored per user and restored on the next visit. Totals are recomputed on the server
                at checkout time — the client's number is a preview, never the source of truth.
              </p>
            </div>
          </div>
          <div className="sc-split">
            <div className="sc-split-media">
              <img src={ecommerceSection} alt="Login and registration" loading="lazy" />
            </div>
            <div className="sc-split-body">
              <span className="sc-kicker">Accounts</span>
              <h3>Sign in without the footguns</h3>
              <p>
                Passwords are hashed before they touch the database and the session token lives in an http-only
                cookie. Role is carried in the token, so the admin surface is gated by the API, not merely
                hidden in the UI.
              </p>
            </div>
          </div>
        </div>

        {/* ADMIN */}
        <div className="pp-section">
          <h2 className="pp-section-title">The admin side</h2>
          <p className="pp-text">
            A shop is only half a project without the tooling to run it. The dashboard creates, edits, deletes
            and features products, uploads their imagery, and reflects every change on the storefront
            immediately — the cached keys are invalidated on write.
          </p>
          <div className="sc-shot sc-shot--pad">
            <img src={ecommerceDashboard} alt="Admin dashboard" loading="lazy" />
          </div>
          <p className="sc-caption">Admin dashboard — inventory management against the same REST API.</p>
        </div>

        {/* FEATURES */}
        <div className="pp-section">
          <h2 className="pp-section-title">What it does</h2>
          <div className="sc-cards">
            {FEATURES.map(f => (
              <div key={f.t} className="sc-card">
                <span className="sc-card-icon">{f.icon}</span>
                <h4>{f.t}</h4>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="pp-section">
          <h2 className="pp-section-title">How it is put together</h2>
          <div className="sc-flow">
            {FLOW.map(f => (
              <div key={f.t} className="sc-flow-step">
                <h4>{f.t}</h4>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TECH */}
        <div className="pp-section">
          <h2 className="pp-section-title">Tech stack</h2>
          <div className="pp-tech-grid">
            {["React", "Vite", "Tailwind CSS", "Zustand", "Framer Motion", "Node.js", "Express", "MongoDB", "Mongoose", "Cloudinary", "Redis / Upstash", "JWT", "Cookie Parser", "Render", "MongoDB Atlas"].map(t => (
              <span key={t} className="pp-tech-badge">{t}</span>
            ))}
          </div>
        </div>

        <div className="pp-section pp-notice">
          <h2 className="pp-section-title">Try it</h2>
          <p className="pp-text">
            The shop is deployed and open source. The free Render instance sleeps when idle, so the first load
            after a while can take a few seconds to wake up.
          </p>
          <div className="pp-actions">
            <a className="pp-btn-primary" href={LIVE} target="_blank" rel="noopener noreferrer">Live app ↗</a>
            <a className="pp-btn-secondary" href={REPO} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="pp-btn-secondary" href={DEMO} target="_blank" rel="noopener noreferrer">Demo video ↗</a>
          </div>
        </div>

        <Link to="/projects" className="pp-back">Back to Projects</Link>
      </div>
    </div>
  );
}
