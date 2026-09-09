import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../css/ProjectsSection.css";
import { useI18n } from "../i18n/LanguageContext";

import pacmanLogo from "../components/myprojects/assets/logosApps/pacmanlogo.png";
import flappyLogo from "../components/myprojects/assets/logosApps/flappybirdLogoSection.png";
import ecommerceLogo from "../components/myprojects/assets/logosApps/logo-ecommerce.png";
import kddLogo from "../components/myprojects/assets/logosApps/kdd.png";
import udLogo from "../components/myprojects/assets/logosApps/ultimusdefensorlogo.png";
import mindflowLogo from "../components/myprojects/assets/logosApps/mindflowlogo.png";
import nbaLogo from "../components/myprojects/assets/logosApps/nbavisionlogo.png";

type ProjectMeta = {
  key: "ultimus" | "nba" | "mindflow" | "kdd" | "ecommerce" | "pacman" | "flappy";
  image: string;
  path: string;
  featured?: boolean;
};

const PROJECTS: ProjectMeta[] = [
  { key: "ultimus", image: udLogo, path: "/projects/ultimusdefensor", featured: true },
  { key: "nba", image: nbaLogo, path: "/projects/nbavision" },
  { key: "mindflow", image: mindflowLogo, path: "/projects/mindflow" },
  { key: "kdd", image: kddLogo, path: "/projects/kdd" },
  { key: "ecommerce", image: ecommerceLogo, path: "/projects/ecommerce" },
  { key: "pacman", image: pacmanLogo, path: "/projects/pacman" },
  { key: "flappy", image: flappyLogo, path: "/projects/flappybird" },
];

const PS_SYMBOLS = ["const", "async", "import", "class", "await", "<AI/>", "01010", "=>"];

export default function ProjectsSection() {
  const { t, lang } = useI18n();

  return (
    <section className="projects-section">
      <div className="ps-float-code" aria-hidden="true">
        {PS_SYMBOLS.map((sym, i) => <span key={i}>{sym}</span>)}
      </div>

      <div className="ps-head lang-fade" key={lang}>
        <h2>
          {t.projectsPage.title[0]} <span className="ps-head-accent">{t.projectsPage.title[1]}</span>
        </h2>
        <p className="ps-sub">{t.projectsPage.subtitle}</p>
      </div>

      <Swiper
        key={lang}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3600, disableOnInteraction: false }}
        loop={true}
        initialSlide={0}
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
        {PROJECTS.map((meta) => {
          const p = (t.projects as any)[meta.key];
          return (
            <SwiperSlide key={meta.path} className="project-slide">
              <Link to={meta.path} className="project-link">
                <div className={`project-card${meta.featured ? " project-card--featured" : ""}`}>
                  {meta.featured && <span className="project-featured-badge">★ Featured</span>}
                  <img src={meta.image} alt={p.name} className="project-logo" />
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
