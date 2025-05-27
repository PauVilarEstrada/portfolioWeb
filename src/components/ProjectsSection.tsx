import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../css/ProjectsSection.css";
import pacmanLogo from "../components/myprojects/assets/logosApps/pacmanlogo.png";
import flappyLogo from "../components/myprojects/assets/logosApps/flappybirdLogoSection.png";
import cameraXLogo from "../components/myprojects/assets/logosApps/cameralogo.png";
import movieLogo from "../components/myprojects/assets/logosApps/moviedblogo.png";
import digimonLogo from "../components/myprojects/assets/logosApps/logodigimon.png";
import ecommerceLogo from "../components/myprojects/assets/logosApps/logo-ecommerce.png";



const projects = [
  {
    name: "Ecommerce",
    description: "Full-stack shop with auth, cart, admin & orders",
    image: ecommerceLogo,
    path: "/projects/ecommerce",
  },
  {
    name: "Pacman",
    description: "A remake of the legendary Pacman",
    image: pacmanLogo,
    path: "/projects/pacman",
  },
  {
    name: "Flappy Bird",
    description: "Improved clone of the classic game",
    image: flappyLogo,
    path: "/projects/flappybird",
  },
  {
    name: "Digimon APP",
    description: "Doble API'S app android",
    image: digimonLogo,
    path: "/projects/digimon",
  },
  {
    name: "CameraX",
    description: "Advanced photography app",
    image: cameraXLogo,
    path: "/projects/camerax",
  },
  {
    name: "TheMovieDB",
    description: "Movie database app with API integration",
    image: movieLogo,
    path: "/projects/themoviedb",
  }
];


export default function ProjectsSection() {
  return (
    <section className="projects-section">
      <h2>My Projects</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="projects-swiper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="project-slide">
            <Link to={project.path} className="project-link">
              <div className="project-card">
                <img src={project.image} alt={project.name} className="project-logo" />
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
