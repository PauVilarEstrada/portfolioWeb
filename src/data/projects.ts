import tactiqLogo from "../components/myprojects/assets/tactiq360/tactiq360-logo.svg";
import tactiqCover from "../components/myprojects/assets/tactiq360/panorama.webp";
import udLogo from "../components/myprojects/assets/logosApps/ultimusdefensorlogo.webp";
import nbaLogo from "../components/myprojects/assets/logosApps/nbavisionlogo.png";
import mindflowLogo from "../components/myprojects/assets/logosApps/mindflowlogo.webp";
import kddLogo from "../components/myprojects/assets/logosApps/kdd.webp";
import ecommerceLogo from "../components/myprojects/assets/logosApps/logo-ecommerce.png";
import pacmanLogo from "../components/myprojects/assets/logosApps/pacmanlogo.png";
import flappyLogo from "../components/myprojects/assets/logosApps/flappybirdLogoSection.png";

import udCover from "../components/myprojects/assets/ultimusdefensor/vista_ejectuiva_1.webp";
import nbaCover from "../components/myprojects/assets/nbavision/hero.webp";
import mindflowCover from "../components/myprojects/assets/mindflow/mindflow_feature.webp";
import ecommerceCover from "../components/myprojects/assets/ecommerce-home.webp";
import pacmanCover from "../components/myprojects/assets/PacmanMap.webp";
import flappyCover from "../components/myprojects/assets/flappyBird2.webp";

export type ProjectKey = "tactiq" | "ultimus" | "nba" | "mindflow" | "kdd" | "ecommerce" | "pacman" | "flappy";

export type ProjectMeta = {
  key: ProjectKey;
  path: string;
  logo: string;
  /** Screenshot used as the cover; projects without one get a logo cover. */
  cover?: string;
  color: string;
  /** Short, language-neutral stack line for the projects index. */
  stack: string;
};

export const PROJECTS: ProjectMeta[] = [
  { key: "tactiq", path: "/projects/tactiq360", logo: tactiqLogo, cover: tactiqCover, color: "#2563eb", stack: "React · FastAPI · PostgreSQL" },
  { key: "ultimus", path: "/projects/ultimusdefensor", logo: udLogo, cover: udCover, color: "#38bdf8", stack: "Python · XGBoost · LLM" },
  { key: "nba", path: "/projects/nbavision", logo: nbaLogo, cover: nbaCover, color: "#ef4444", stack: "React · FastAPI · XGBoost" },
  { key: "mindflow", path: "/projects/mindflow", logo: mindflowLogo, cover: mindflowCover, color: "#6c9bff", stack: "React Native · TypeScript" },
  { key: "kdd", path: "/projects/kdd", logo: kddLogo, color: "#22c55e", stack: "Python · scikit-learn · Big Data" },
  { key: "ecommerce", path: "/projects/ecommerce", logo: ecommerceLogo, cover: ecommerceCover, color: "#a78bfa", stack: "React · Node.js · MongoDB" },
  { key: "pacman", path: "/projects/pacman", logo: pacmanLogo, cover: pacmanCover, color: "#facc15", stack: "Java" },
  { key: "flappy", path: "/projects/flappybird", logo: flappyLogo, cover: flappyCover, color: "#4ade80", stack: "Unity · C#" },
];

export const SOCIAL = {
  email: "pvilardev@gmail.com",
  linkedin: "https://www.linkedin.com/in/pau-vilar/",
  github: "https://github.com/PauVilarEstrada",
  brontobyte: "https://www.brontobytecloud.com/",
  cv: `${import.meta.env.BASE_URL}VILAR_PAU.pdf`,
};
