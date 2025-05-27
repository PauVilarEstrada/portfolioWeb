import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/ecommerce.css";

import ecommerceHome from "./assets/ecommerce-home.png";
import ecommerceShoes from "./assets/ecommerce-shoes.png";
import ecommerceCart from "./assets/ecommerce-cart.png";
import ecommerceSection from "./assets/ecommerce-sections.png";
import ecommerceDashboard from "./assets/ecommerce-dashboard.png";

export default function Ecommerce() {
  return (
    <section className="ecommerce-container">
      <h1>🛒 E-Commerce Web</h1>
      
      <p>
        A full-stack e-commerce platform built to simulate a real online shopping experience. 
        Users can browse products, manage a shopping cart, and securely place orders. 
        The application includes an admin dashboard, image uploads, authentication, 
        and performance enhancements via caching.
      </p>

      <div className="image-gallery">
        <img src={ecommerceHome} alt="Home Page showcasing featured products" className="gallery-image" />
        <img src={ecommerceShoes} alt="Product Category Page with filters" className="gallery-image" />
        <img src={ecommerceCart} alt="Shopping Cart interface with dynamic state" className="gallery-image" />
        <img src={ecommerceSection} alt="Login and Registration page" className="gallery-image" />
        <img src={ecommerceDashboard} alt="Admin Dashboard for managing products" className="gallery-image" />
      </div>

      <h2>🔧 Technologies Used</h2>
      <ul className="ecommerce-features">
        <li>⚛️ <strong>Frontend:</strong> React, Vite, Tailwind CSS</li>
        <li>🧠 Zustand for global state, Framer Motion for animations</li>
        <li>🌐 <strong>Backend:</strong> Node.js, Express, MongoDB (Mongoose)</li>
        <li>☁️ Cloudinary for image upload, Redis (Upstash) for featured product caching</li>
        <li>🔐 Authentication via JWT and Cookie Parser</li>
        <li>🚀 Deployment handled with Render and MongoDB Atlas</li>
      </ul>

      <h2>🎯 Core Features</h2>
      <ul className="ecommerce-features">
        <li>🔐 Secure user registration, login, and session management</li>
        <li>🛍️ Product browsing with filtering by category</li>
        <li>🧺 Dynamic shopping cart with persistent state</li>
        <li>🖼️ Image uploads for products via Cloudinary</li>
        <li>🛠️ Admin panel to create, update, delete and feature products</li>
        <li>⚡ Featured product caching with Redis for speed</li>
        <li>📱 Fully responsive design for mobile and desktop devices</li>
        <li>💳 Stripe-ready placeholder for future payment integration</li>
      </ul>

      <h2>🧠 Architecture & Approach</h2>
      <p>
        The application follows a component-based architecture on the frontend, 
        with Zustand managing shared state like the shopping cart. 
        The backend exposes a RESTful API built with Express, 
        connecting to MongoDB via Mongoose and storing image URLs using Cloudinary. 
        Featured products are cached using Redis (Upstash) to enhance performance.
      </p>

      <h2>🔗 Project Links</h2>
      <p>
        <a href="https://ecommerce-yrau.onrender.com" target="_blank" rel="noopener noreferrer">
          🌐 Live Web Application
        </a>
        <br />
        <a href="https://github.com/PauVilarEstrada/e-commerceWeb" target="_blank" rel="noopener noreferrer">
          💻 Source Code on GitHub
        </a>
        <br />
        <a href="https://drive.google.com/file/d/1sJ-6Kzjrt_wjCOIrZHy65XSubOJSV1DN/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          🎥 Demo Video (Google Drive)
        </a>
      </p>

      <Link to="/projects" className="ecommerce-back-link">
        🔙 Back to Projects
      </Link>
    </section>
  );
}
