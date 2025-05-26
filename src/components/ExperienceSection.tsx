import React from "react";
import "../css/ExperienceSection.css";

// Sycai Medical Logos & Tech Stack
import sycaiLogo from "../assets/logoSycai.png";
import awsLogo from "../assets/awslogo.png";
import dockerLogo from "../assets/dockerlogo.png";
import flaskLogo from "../assets/flasklogo.png";
import javaLogo from "../assets/javalogo.png";
import javascriptLogo from "../assets/javascriptlogo.webp";
import angularLogo from "../assets/angularlogo.webp";
import reactLogo from "../assets/reactlogo.webp";
import sqlLogo from "../assets/sqllogo.png";
import gitLogo from "../assets/gitlogo.png";
import githubLogo from "../assets/githublogo.png";
import htmlLogo from "../assets/htmllogo.png";
import xmlLogo from "../assets/xmllogo.png";
import nodejsLogo from "../assets/nodejslogo.png";
import typeScriptLogo from "../assets/typescriptlogo.png";
import TailwindLogo from "../assets/tailwindlogo.svg";
import pythonLogo from "../assets/pythonlogo.webp";

// Water Polo Clubs & Competitions
import cnbLogo from "../assets/cnb.png";
import cnsaLogo from "../assets/cnsa_new.png";
import lewaterpoloLogo from "../assets/lewaterpolo.png";
import eurocupLogo from "../assets/logoeurocup.png";
import championsLogo from "../assets/championslogo.webp";

// Water Polo Photos
import waterpoloImg1 from "../public/PauVilar_NegroPerfil.JPG";
import waterpoloImg2 from "../public/PauVilar_NegroLado.JPG";
import teamPhoto from "../public/sananFotoEquipo.jpg";

// Logos de centros educativos
import insPoblenouLogo from "../assets/poblenoulogo.png";
import insCarLogo from "../assets/insCARlogo.png";

import sqliteLogo from "../assets/sqlitelogo.png";
import virtualboxLogo from "../assets/virtualboxlogo.png";
import figmaLogo from "../assets/figmalogo.png";
import djangoLogo from "../assets/djangologo.svg";
import junitLogo from "../assets/junitlogo.png";
import bashLogo from "../assets/bashlogo.png";
import springbootLogo from "../assets/springbootlogo.png";
import hibernateLogo from "../assets/hibernatelogo.svg";
import bootstrapLogo from "../assets/bootstraplogo.png";
import kotlinLogo from "../assets/kotlinlogo.png";

import carLogo from "../assets/CARlogo.png";
import carGeneral from "../assets/car_general.png";
import carPiscinaFora from "../assets/carpiscinafora.jpg";


export default function ExperienceSection() {
  return (
    <section className="experience-section">
      {/* 🔹 Sycai Medical Experience */}
      <div className="experience-container">
        <img src={sycaiLogo} alt="Sycai Medical Logo" className="company-logo" />
        <h2>EXPERIENCE AT <span className="highlight">SYCAI MEDICAL</span></h2>
        <p className="subtitle">
          Sycai Medical is a Barcelona-based startup that develops AI-powered tools for radiologists. Its innovative technology helps detect and monitor <strong>precancerous abdominal lesions</strong> at early stages, significantly improving diagnosis and treatment efficiency.
        </p>

        <div className="experience-container">
          <h3>🚀 Junior Full Stack Developer Internship (6 months)</h3>
          <p>
            As a <strong>Junior Full Stack Developer</strong>, I was responsible for <strong>modernizing</strong> the company’s internal software infrastructure, <strong>redesigning databases</strong>, and <strong>upgrading outdated technologies</strong> into a modern stack.
          </p>

          <h3>🔧 AWS Infrastructure & Cloud Optimization</h3>
          <p>
            I worked on optimizing cloud-based solutions using <strong>AWS</strong>, improving scalability, security, and efficiency. I also <strong>redesigned databases</strong>, implemented <strong>Docker-based containerized solutions</strong>, and contributed to <strong>deployment automation</strong>.
          </p>

          <h3>🏆 About Sycai Medical</h3>
          <p>
            Founded in <strong>2020 in Barcelona</strong>, Sycai Medical specializes in <strong>medical AI</strong>, helping radiologists analyze <strong>CT scans and MRI images</strong>. Their technology seamlessly integrates with <strong>hospital PACS systems</strong>, utilizing <strong>DICOM standards</strong> for interoperability. Sycai has won <strong>multiple innovation awards</strong>, receiving funding from <strong>European startup accelerators</strong> and <strong>health-tech grants</strong>.
          </p>

          <h3>⚡ Technologies Used</h3>
          <div className="tech-list-container">
            <ul className="tech-list animated-list">
              <li><img src={reactLogo} alt="React" /> React</li>
              <li><img src={flaskLogo} alt="Flask" /> Flask</li>
              <li><img src={javascriptLogo} alt="JavaScript" /> JavaScript</li>
              <li><img src={typeScriptLogo} alt="TypeScript" /> TypeScript</li>
              <li><img src={javaLogo} alt="Java" /> Java</li>
              <li><img src={pythonLogo} alt="Python" /> Python</li>
              <li><img src={angularLogo} alt="Angular" /> Angular</li>
              <li><img src={sqlLogo} alt="SQL" /> SQL</li>
              <li><img src={dockerLogo} alt="Docker" /> Docker</li>
              <li><img src={awsLogo} alt="AWS" /> AWS</li>
              <li><img src={gitLogo} alt="Git" /> Git</li>
              <li><img src={githubLogo} alt="GitHub" /> GitHub</li>
              <li><img src={htmlLogo} alt="HTML" /> HTML</li>
              <li><img src={TailwindLogo} alt="Tailwind" /> Tailwind</li>
              <li><img src={xmlLogo} alt="XML" /> XML</li>
              <li><img src={nodejsLogo} alt="Node.js" /> Node.js</li>
            </ul>
          </div>

          <h3>💡 Key Achievements</h3>
          <ul className="achievements">
  <li>
    <span className="highlight-text">Migrated the company's internal platform</span>
    <span className="achievements-text">from legacy systems to a modern full-stack architecture.</span>
  </li>
  <li>
    <span className="highlight-text">Redesigned AWS databases</span>
    <span className="achievements-text">optimizing performance and reducing costs.</span>
  </li>
  <li>
    <span className="highlight-text">Developed Docker-based environments</span>
    <span className="achievements-text">for scalable cloud deployments.</span>
  </li>
  <li>
    <span className="highlight-text">Enhanced hospital PACS integration</span>
    <span className="achievements-text">improving efficiency for radiologists.</span>
  </li>
</ul>

        </div>
      </div>

       {/* 🔹 Separation Space */}
       <div className="section-divider"></div>


     {/* 🔹 Water Polo Experience */}
<div className="experience-container">
  <h2>PROFESSIONAL WATER POLO CAREER</h2>
  <p className="subtitle">
    Elite-level goalkeeper competing in <strong>Spain's División de Honor (DHM)</strong> and <strong>top-tier European competitions</strong>.
  </p>

  {/* 🔹 Clubs Section */}
  <div className="clubs">
    <div className="club">
      <img src={cnsaLogo} alt="CN Sant Andreu Logo" className="club-logo" />
      <h3>CN Sant Andreu (2023 - Present)</h3>
      <p>
      <strong>Starting Goalkeeper</strong> for <strong>CN Sant Andreu</strong>, one of Spain's top professional water polo clubs. 
        Competing at the highest national and international levels:
      </p>
      <ul className="styled-list">
        <li><strong>🏆 División de Honor (DHM) 🏆</strong> The premier Spanish professional league. <strong>⭐ LEWATERPOLO ⭐</strong></li>
        <li><strong>👑 Copa del Rey 👑</strong> Spain’s most prestigious domestic cup tournament.</li>
        <li><strong>🌍 EuroCup 🌍</strong> The <strong>second-most important</strong> club competition in Europe.</li>
      </ul>
    </div>
    <div className="small-section-divider"></div>

    <div className="club">
      <img src={cnbLogo} alt="CN Barcelona Logo" className="club-logo" />
      <h3>CN Barcelona (2019 - 2023)</h3>
      <p>
        Former <strong>Goalkeeper</strong> at <strong>CN Barcelona</strong>, the <strong>most decorated</strong> water polo club in Spain, competing in:
      </p>
      <ul className="styled-list">
      <li><strong>🏆 División de Honor (DHM) 🏆</strong> The premier Spanish professional league. <strong>⭐ LEWATERPOLO ⭐</strong></li>
      <li><strong>👑 Copa del Rey 👑</strong> Spain’s most prestigious domestic cup tournament.</li>
      <li><strong>🥇 Champions League 🥇</strong> The <strong>top-tier</strong> club competition in European water polo.</li>
      <li><strong>🌍 EuroCup 🌍</strong> The <strong>second-most important</strong> club competition in Europe.</li>
      </ul>
    </div>
  </div>

  {/* 🔹 Key Achievements */}
  <h3>💡 Key Achievements</h3>
  <ul className="achievements">
  <li>
    <span className="highlight-text">Represented two elite clubs</span> 
    <span className="achievements-text">in Spain’s highest division and European competitions.</span>
  </li>
  <li>
    <span className="highlight-text">Competed in the Champions League</span> 
    <span className="achievements-text">facing the best water polo clubs in Europe and the world.</span>
  </li>
  <li>
    <span className="highlight-text">Gained extensive experience</span> 
    <span className="achievements-text">in high-pressure matches, improving decision-making and leadership skills.</span>
  </li>
  <li>
    <span className="highlight-text">Developed strong teamwork and discipline</span> 
    <span className="achievements-text">balancing a demanding sports career with professional growth.</span>
  </li>
  <li>
    <span className="highlight-text">Developed mental resilience and problem-solving abilities</span>
  </li>
  <li>
    <span className="highlight-text">Demonstrated leadership, discipline, and adaptability</span> 
    <span className="achievements-text">in elite competitions, valuable traits for any professional setting.</span>
  </li>
  <li>
    <span className="highlight-text">Balanced a dual career in sports and academics</span> 
    <span className="achievements-text">mastering time management and goal-oriented discipline.</span>
  </li>
</ul>


  {/* 🔹 Image Gallery */}
  <div className="image-gallery">
    <img src={waterpoloImg1} alt="Water Polo Action" />
    <img src={teamPhoto} alt="Team Photo" />
    <img src={waterpoloImg2} alt="Water Polo Action" />
  </div>

  {/* 🔹 Competition Logos */}
  <div className="image-gallery">
    <img src={lewaterpoloLogo} alt="DHM Logo" className="small-logo"/>
    <img src={eurocupLogo} alt="EuroCup Logo" />
    <img src={championsLogo} alt="Champions League Logo" />
  </div>
</div>

{/* 🔹 Separation Space */}
<div className="section-divider"></div>

 {/* 🔹 Studies */}
 <div className="experience-container">
        <h2>STUDIES</h2>

        {/* 🔹 Multiplatform Application Development */}
        <div className="studies">
          <div className="study-item">
            <img src={insPoblenouLogo} alt="INS Poblenou Logo" className="studiesPB-logo" />
            <h3>Multiplatform Application Development (2023 - 2025)</h3>
            <p>
              I am currently studying <strong>Multiplatform Application Development</strong> at <strong>INS Poblenou</strong>, where I have specialized in full-stack development and application creation for various environments.
            </p>
            <p>
              Throughout these years, I have acquired extensive knowledge in modern technologies and development methodologies, including:
            </p>
            <h3>👨🏽‍💻 Technologies learned</h3>
            <div className="tech-list-container">
              <ul className="tech-list animated-list">
                {/* Lenguajes de Programación */}
                <li><img src={reactLogo} alt="React" /> React</li>
                <li><img src={flaskLogo} alt="Flask" /> Flask</li>
                <li><img src={javascriptLogo} alt="JavaScript" /> JavaScript</li>
                <li><img src={typeScriptLogo} alt="TypeScript" /> TypeScript</li>
                <li><img src={javaLogo} alt="Java" /> Java</li>
                <li><img src={pythonLogo} alt="Python" /> Python</li>
                <li><img src={angularLogo} alt="Angular" /> Angular</li>
                <li><img src={nodejsLogo} alt="Node.js" /> Node.js</li>
                <li><img src={kotlinLogo} alt="Kotlin" /> Kotlin</li>
                
                {/* Bases de Datos */}
                <li><img src={sqlLogo} alt="SQL" /> SQL</li>
                <li><img src={sqliteLogo} alt="SQLite" /> SQLite</li>
                
                {/* Frameworks y Librerías */}
                <li><img src={springbootLogo} alt="Spring Boot" /> Spring Boot</li>
                <li><img src={hibernateLogo} alt="Hibernate" /> Hibernate</li>
                <li><img src={djangoLogo} alt="Django" /> Django</li>
                <li><img src={junitLogo} alt="JUnit" /> JUnit</li>
                
                {/* Git y Control de Versiones */}
                <li><img src={gitLogo} alt="Git" /> Git</li>
                <li><img src={githubLogo} alt="GitHub" /> GitHub</li>
                
                {/* Infraestructura y DevOps */}
                <li><img src={dockerLogo} alt="Docker" /> Docker</li>
                <li><img src={virtualboxLogo} alt="VirtualBox" /> VirtualBox</li>
                <li><img src={bashLogo} alt="Bash" /> Bash</li>
                
                {/* Estilos y Frontend */}
                <li><img src={bootstrapLogo} alt="Bootstrap" /> Bootstrap</li>
                <li><img src={TailwindLogo} alt="Tailwind" /> Tailwind</li>
                <li><img src={htmlLogo} alt="HTML" /> HTML</li>
                <li><img src={xmlLogo} alt="XML" /> XML</li>
                
                {/* Diseño y Herramientas */}
                <li><img src={figmaLogo} alt="Figma" /> Figma</li>
              </ul>
            </div>
            <p>
              Additionally, I have worked on real projects applying best development practices such as <strong>clean architecture</strong> and <strong>code security</strong>, incorporating testing tools and CI/CD pipelines.
            </p>
          </div>
        </div>
        <div className="small-section-divider"></div>

        {/* 🔹 Social Sciences Baccalaureate */}
        <div className="studies">
          <div className="study-item">
            <img src={insCarLogo} alt="INS CAR Logo" className="studiesCAR-logo" />
            <h3>Social Sciences Baccalaureate (2019 - 2021)</h3>
            <p>
              I completed my <strong>Social Sciences Baccalaureate</strong> at the <strong>High-Performance Center (INS CAR)</strong>, an institution exclusively designed for elite athletes at the national level.
            </p>
            <p>
              At this center, I had the opportunity to balance <strong>6 hours of daily training</strong> with my academic studies, developing exceptional skills in <strong>time management, discipline, and working under pressure</strong>.
            </p>
            <p>
              INS CAR hosts the top athletes in Spain across various disciplines, including the <strong>Spanish national water polo team</strong>. Thanks to this education, I not only strengthened my knowledge in subjects like economics and applied mathematics but also gained key skills for high-performance environments in any professional setting.
            </p>
          </div>
        </div>

        
  {/* 🔹 Image Gallery */}
  <div className="image-gallery">
    <img src={carGeneral} alt="CAR FLY" />
    <img src={carLogo} alt="CAR LOGO" />
    <img src={carPiscinaFora} alt="CAR EXTERIOR POOL" />
  </div>



        <div className="small-section-divider"></div>

        {/* 🔹 Certifications */}
        <div className="certifications">
          <h3>CERTIFICATIONS</h3>
          <ul className="styled-list">
            <li><strong>Google & Banco Santander:</strong> Artificial Intelligence and Productivity (Oct 2024)</li>
            <li><strong>IBM:</strong> Python (Aug 2024)</li>
          </ul>
        </div>

        {/* 🔹 Separation Space */}
<div className="small-section-divider"></div>

        {/* 🔹 Languages */}
        <div className="languages">
          <h3>LANGUAGES</h3>
          <ul className="styled-list">
            <li><strong>Spanish</strong>Native</li>
            <li><strong>Catalan</strong>Native</li>
            <li><strong>English</strong>B1</li>

          </ul>
        </div>
      </div>


    </section>

  );
}