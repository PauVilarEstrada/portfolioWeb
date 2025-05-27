import React from "react";
import { Link } from "react-router-dom";
import "../myprojects/css/ecommerce.css";
import ecommerceHome from "../../assets/ecommerce-home.png";
import ecommerceShoes from "../../assets/ecommerce-shoes.png";
import ecommerceCart from "../../assets/ecommerce-cart.png";
import ecommerceSection from "../../assets/ecommerce-sections.png";
import ecommerceDashboard from "../../assets/ecommerce-dashboard.png";

export default function Ecommerce() {
  return (
    <section className="ecommerce-container">
      <h1>🛒 E-Commerce Web Application</h1>
      <p>
        This full-stack e-commerce application allows users to browse and buy products,
        manage their accounts, and place orders with ease. Built with modern technologies
        and deployed on Render.
      </p>

      <div className="image-gallery">
        <img src={ecommerceHome} alt="Home Page" className="gallery-image" />
        <img src={ecommerceShoes} alt="Product Page" className="gallery-image" />
        <img src={ecommerceCart} alt="Shopping Cart" className="gallery-image" />
        <img src={ecommerceSection} alt="Login Page" className="gallery-image" />
        <img src={ecommerceDashboard} alt="Admin Dashboard" className="gallery-image" />
      </div>

      <h2>🔧 Technologies Used</h2>
      <ul className="ecommerce-features">
        <li>⚛️ React + Vite + Tailwind CSS</li>
        <li>🧠 Zustand + Framer Motion</li>
        <li>🌐 Node.js, Express & MongoDB</li>
        <li>☁️ Cloudinary + Redis</li>
        <li>🔐 JWT Authentication + Cookie Parser</li>
        <li>🚀 Deployed on Render</li>
      </ul>

      <h2>🎯 Key Features</h2>
      <ul className="ecommerce-features">
        <li>👤 User Authentication & Profile Management</li>
        <li>🛍️ Product Browsing & Admin Management</li>
        <li>🛒 Shopping Cart & Order Processing</li>
        <li>📱 Fully Responsive Design</li>
      </ul>

      <h2>🧠 Architecture</h2>
      <p>
        Component-based UI with Zustand for state, RESTful APIs, and performance optimized
        with Redis caching. Uses Cloudinary for image hosting and Mongoose for MongoDB integration.
      </p>

      <h2>🔗 Links</h2>
      <p>
        <a href="https://ecommerce-yrau.onrender.com" target="_blank" rel="noopener noreferrer">
          🌐 Live Web
        </a>
        <br />
        <a href="https://github.com/PauVilarEstrada/e-commerceWeb" target="_blank" rel="noopener noreferrer">
          💻 GitHub Repository
        </a>
      </p>

      <Link to="/projects" className="ecommerce-back-link">🔙 Back to Projects</Link>
    </section>
  );
}
