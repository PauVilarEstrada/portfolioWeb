import type { Dict } from "./en";

export const es: Dict = {
  meta: {
    title: "Pau Vilar — Desarrollador Full Stack e Ingeniero de IA",
    switchLabel: "Cambiar idioma",
  },

  nav: {
    home: "Inicio",
    work: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
    hint: "pasa el ratón para navegar",
  },

  home: {
    badge: "Disponible para trabajar · Barcelona",
    name: "Pau Vilar i Estrada",
    roles: [
      "Desarrollador Full Stack",
      "Ingeniero de IA y Big Data",
      "Ingeniero de Machine Learning",
      "Formador en IA",
    ],
    tagline:
      "Construyo software que llega a producción — **sistemas de IA**, **pipelines de datos**, **plataformas web** y un **juego publicado en Google Play**. Diez años como portero de waterpolo de élite me enseñaron el resto: aparecer cada día, iterar y rendir bajo presión.",
    stats: [
      { n: "9", l: "Proyectos" },
      { n: "20+", l: "Tecnologías" },
      { n: "3", l: "Productos online" },
      { n: "Máster", l: "IA y Big Data" },
    ],
    ctaWork: "Ver mis proyectos",
    ctaContact: "Hablemos",
    scroll: "scroll",
    terminalTitle: "consola-ia",
    terminal: [
      { cmd: "$ ./bienvenida.sh", out: "👋  ¡Bienvenido al portfolio de Pau!" },
      { cmd: "$ git push origin --all", out: "✓  9 proyectos publicados en GitHub" },
      { cmd: "$ cat contacto.txt", out: "📧  pvilardev@gmail.com — respondo rápido" },
      { cmd: "$ open linkedin.com/in/pau-vilar", out: "🔗  Últimas novedades en LinkedIn ↗" },
      { cmd: "$ whoami", out: "Ingeniero de IA · Full Stack · Portero de waterpolo 🤽" },
      { cmd: "$ grep -r 'contratar' ./candidatos/", out: "✓  Coincidencia → pau_vilar.json 🎯" },
    ],

    featuredTitle: ["Proyectos", "destacados"],
    featuredLink: "Ver todos los proyectos →",

    timelineTitle: ["Experiencia y", "formación"],
    timelineLink: "Perfil completo →",
    timeline: [
      {
        date: "2026 – Actualidad",
        icon: "🤽",
        role: "Portero · División de Honor",
        org: "Club Natació Catalunya",
        desc: "Fichado para la nueva temporada por el CN Catalunya, compitiendo en la máxima liga española y en la Copa del Rey.",
        active: true,
      },
      {
        date: "2026",
        icon: "🧠",
        role: "Formador en IA — Sistemas Agénticos",
        org: "Cambra de Comerç de Barcelona",
        desc: "Diseño e imparto formación en IA agéntica, automatización y orquestación multiagente para empresas.",
        active: true,
      },
      {
        date: "2025 – 2026",
        icon: "🎓",
        role: "Máster en IA y Big Data — finalizado",
        org: "Monlau Formación Profesional",
        desc: "Finalizado con Matrícula de Honor. ML, LLMs, pipelines de big data y sistemas agénticos. Proyecto final: Ultimus Defensor.",
        active: true,
      },
      {
        date: "2025",
        icon: "💼",
        role: "Desarrollador Full Stack Junior",
        org: "Sycai Medical · Prácticas",
        desc: "Modernicé la plataforma interna, rediseñé las bases de datos en AWS y containericé los despliegues con Docker.",
        active: false,
      },
      {
        date: "2023 – 2026",
        icon: "🥅",
        role: "Portero",
        org: "CN Sant Andreu · División de Honor",
        desc: "Tres temporadas en la máxima liga española y en la EuroCup. Anteriormente CN Barcelona — Champions League.",
        active: false,
      },
      {
        date: "2023 – 2025",
        icon: "💻",
        role: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
        org: "INS Poblenou",
        desc: "Ciclo superior en desarrollo full-stack, apps móviles, bases de datos e ingeniería del software.",
        active: false,
      },
    ],

    techTitle: ["Stack", "técnico"],
    techSubtitle: "Lo que uso en el día a día",

    focusTitle: ["A qué me", "dedico"],
    focus: [
      {
        icon: "🧠",
        h: "IA y Machine Learning",
        p: "Detección de anomalías, gradient boosting, regresión cuantílica y asistentes con LLM — modelos que salen con su incertidumbre incluida, no un notebook de demo.",
      },
      {
        icon: "⚙️",
        h: "Ingeniería full-stack",
        p: "React y TypeScript delante, FastAPI, Node y Spring detrás, PostgreSQL y Redis debajo, y Docker envolviéndolo todo.",
      },
      {
        icon: "📊",
        h: "Ingeniería de datos",
        p: "Ingerir, limpiar, cachear y servir. Feature stores sin fuga temporal, scrapers con rate limit y pipelines que aguantan un día real de producción.",
      },
      {
        icon: "📱",
        h: "Móvil y videojuegos",
        p: "React Native y Unity. MINDFLOW está publicado en Google Play: 4 modos, 1.200 niveles verificados y 100% offline.",
      },
    ],

    cta: {
      eyebrow: "Trabajemos juntos",
      title: "¿Tienes un proyecto en mente?",
      body:
        "Estoy abierto a **posiciones junior, prácticas y colaboraciones** en desarrollo de software, ingeniería de IA y análisis de datos. Cuéntame qué estás construyendo — respondo rápido.",
      cv: "Descargar CV",
    },
  },

  projectsPage: {
    title: ["Mis", "proyectos"],
    subtitle: "Nueve cosas que he construido, desde plataformas de IA hasta juegos arcade. Entra en cualquiera para ver la historia completa.",
  },

  projects: {
    ultimus: {
      name: "Ultimus Defensor — BlueSentinel",
      short: "Ultimus Defensor",
      desc:
        "Plataforma BlueTeam con IA: detección MITRE ATT&CK, cascada Isolation Forest + XGBoost y un asistente de seguridad con LLM sobre más de 1.000 documentos.",
      tags: ["IA / ML", "Ciberseguridad", "MITRE"],
    },
    nba: {
      name: "NBA Vision",
      short: "NBA Vision",
      desc:
        "Laboratorio full-stack de analítica NBA: proyecciones por regresión cuantílica, pronósticos Elo y un simulador posesión a posesión. En Vercel y bilingüe.",
      tags: ["React", "XGBoost", "Simulación"],
    },
    mindflow: {
      name: "MINDFLOW — Brain Puzzle Games",
      short: "MINDFLOW",
      desc:
        "Mi primer juego móvil publicado: 4 modos de puzzle, 1.200 niveles verificados y totalmente offline. Disponible en Google Play.",
      tags: ["React Native", "TypeScript", "Android"],
    },
    kdd: {
      name: "Sistema de detección de intrusiones (KDD'99)",
      short: "Detección de intrusiones KDD'99",
      desc:
        "IDS con machine learning: pipeline de clasificación jerárquica, ingeniería del dataset y cuadros de mando analíticos — más de 5M de registros procesados.",
      tags: ["ML", "Big Data", "Python"],
    },
    ecommerce: {
      name: "Plataforma E-Commerce",
      short: "Plataforma E-Commerce",
      desc:
        "Tienda full-stack: autenticación JWT, carrito persistente, panel de administración, imágenes en Cloudinary y caché Redis en las rutas calientes.",
      tags: ["React", "Node.js", "MongoDB"],
    },
    pacman: {
      name: "Pacman Remake",
      short: "Pacman",
      desc:
        "El clásico arcade reconstruido en Java: mapas personalizados cargados desde ficheros, personajes seleccionables e IA de fantasmas que aprieta según tu puntuación.",
      tags: ["Java", "POO", "IA de juego"],
    },
    flappy: {
      name: "Flappy Bird — clon mejorado",
      short: "Flappy Bird",
      desc:
        "Unity y C#: físicas 2D ajustadas a mano, obstáculos procedurales con object pooling y ranking online. Un botón, partidas infinitas.",
      tags: ["Unity", "C#", "Physics2D"],
    },
  },

  experience: {
    pageTitle: "Experiencia",
    pageSubtitle:
      "Ingeniería, docencia y deporte de élite — las tres vías que llevo en paralelo.",

    trainer: {
      title: "FORMADOR EN IA",
      titleHighlight: "· Cambra de Comerç de Barcelona",
      subtitle:
        "**Formador en IA** en la **Cambra de Comerç de Barcelona** — diseño e imparto formación en **sistemas de IA agéntica, flujos de automatización y soluciones de IA para empresa** dirigida a profesionales y compañías de Cataluña.",
      blocks: [
        {
          h: "🎓 Programas impartidos",
          p: "La Cambra de Comerç es una de las instituciones que lidera la transformación digital del tejido empresarial catalán. Mis cursos cubren todo el ciclo de vida de los sistemas agénticos — arquitectura, orquestación, despliegue e impacto de negocio — con práctica real, no diapositivas.",
        },
      ],
      topicsTitle: "💡 Qué enseño",
      topics: [
        "**Arquitectura de agentes** — planificación, bucles de razonamiento e integración de herramientas (ReAct, chain-of-thought, reflexión)",
        "**Automatización de negocio** — pipelines de principio a fin sobre procesos que las empresas ejecutan de verdad",
        "**Orquestación multiagente** — patrones supervisor, agentes en paralelo y protocolos de traspaso",
        "**Memoria y estado** — contexto a corto plazo, memoria vectorial a largo plazo y estrategias de recuperación",
        "**Listo para producción** — evaluación, observabilidad y guardarraíles para sistemas autónomos",
      ],
    },

    sycai: {
      title: "EXPERIENCIA EN",
      titleHighlight: "SYCAI MEDICAL",
      subtitle:
        "Sycai Medical es una startup de Barcelona que desarrolla herramientas de IA para radiólogos. Su tecnología ayuda a detectar y monitorizar **lesiones abdominales precancerosas** de forma temprana, cuando el tratamiento todavía cambia el desenlace.",
      blocks: [
        {
          h: "🚀 Desarrollador Full Stack Junior · prácticas de 6 meses",
          p: "Modernicé el software interno de la empresa: **reconstruí la plataforma** saliendo de su stack heredado, **rediseñé las bases de datos** y sustituí herramientas obsoletas por otras mantenibles.",
        },
        {
          h: "🔧 Infraestructura AWS y cloud",
          p: "Trabajé en la parte de **AWS** — escalabilidad, seguridad y coste — rediseñé esquemas de base de datos, containericé servicios con **Docker** y contribuí a la **automatización de despliegues**.",
        },
        {
          h: "🏆 Sobre Sycai Medical",
          p: "Fundada en **2020 en Barcelona**, Sycai se especializa en **IA médica**, ayudando a radiólogos a leer estudios de **TAC y resonancia**. Se integra con los **sistemas PACS hospitalarios** vía **DICOM**, y ha ganado varios premios de innovación además de financiación de aceleradoras europeas y ayudas health-tech.",
        },
      ],
      techTitle: "⚡ Tecnologías utilizadas",
      achievementsTitle: "💡 Logros principales",
      achievements: [
        { b: "Migré la plataforma interna", r: " desde sistemas heredados a una arquitectura full-stack moderna." },
        { b: "Rediseñé las bases de datos en AWS", r: " mejorando el rendimiento de las consultas y reduciendo coste." },
        { b: "Construí entornos con Docker", r: " para despliegues cloud reproducibles y escalables." },
        { b: "Mejoré la integración con PACS hospitalarios", r: " acortando el circuito de trabajo de los radiólogos." },
      ],
    },

    waterpolo: {
      title: "CARRERA PROFESIONAL EN WATERPOLO",
      subtitle:
        "Portero de élite en la **División de Honor** — la máxima liga nacional — y en las **principales competiciones europeas de clubes**.",
      currentBadge: "Club actual",
      pastBadge: "Anterior",
      clubs: [
        {
          name: "Club Natació Catalunya",
          years: "2026 – Actualidad",
          current: true,
          p: "Fichado como **portero** del **CN Catalunya** para la nueva temporada, compitiendo en lo más alto del waterpolo español:",
          bullets: [
            "**División de Honor** — la máxima liga profesional española · LEWATERPOLO",
            "**Copa del Rey** — el torneo de copa más prestigioso del país",
          ],
        },
        {
          name: "CN Sant Andreu",
          years: "2023 – 2026",
          current: false,
          p: "**Portero titular** del **CN Sant Andreu** durante tres temporadas en la élite española y europea:",
          bullets: [
            "**División de Honor** — la máxima liga profesional española · LEWATERPOLO",
            "**Copa del Rey** — el torneo de copa más prestigioso del país",
            "**EuroCup** — la segunda competición continental de clubes",
          ],
        },
        {
          name: "CN Barcelona",
          years: "2019 – 2023",
          current: false,
          p: "**Portero** del **CN Barcelona**, el club **más laureado** del waterpolo español:",
          bullets: [
            "**División de Honor** — la máxima liga profesional española · LEWATERPOLO",
            "**Copa del Rey** — el torneo de copa más prestigioso del país",
            "**Champions League** — la máxima competición de clubes de Europa",
            "**EuroCup** — la segunda competición continental de clubes",
          ],
        },
      ],
      achievementsTitle: "💡 Lo que me ha dado el deporte",
      achievements: [
        { b: "Tres clubes de élite, una liga", r: " — la máxima división española, con competición europea cada temporada." },
        { b: "Minutos en Champions League", r: " frente a los mejores clubes de Europa y, por extensión, del mundo." },
        { b: "Sangre fría bajo presión", r: " — el trabajo de un portero es el siguiente lanzamiento, nunca el anterior." },
        { b: "Una carrera dual sostenida", r: " — deporte a tiempo completo y estudios a tiempo completo, durante una década." },
      ],
    },

    studies: {
      title: "FORMACIÓN",
      master: {
        h: "🤖 Máster en Inteligencia Artificial y Big Data · 2025 – 2026",
        statusBadge: "Finalizado · Matrícula de Honor",
        p1: "**Finalizado** en **Monlau Formación Profesional** con **Matrícula de Honor**, la máxima distinción académica. Un programa muy exigente que recorre toda la IA y la ingeniería de datos moderna: aprendizaje supervisado y no supervisado, LLMs, sistemas agénticos, pipelines de datos en producción y despliegue real de modelos.",
        p2: "Culminó con **Ultimus Defensor**, una plataforma completa de ciberseguridad con IA que combina detección de anomalías, clasificación MITRE ATT&CK y un asistente BlueTeam basado en LLM.",
        areasTitle: "📚 Áreas principales",
        areas: [
          "**Modelos de IA** — redes neuronales, PLN, visión por computador, sistemas expertos y ética",
          "**Machine learning** — supervisado, no supervisado, ensembles y evaluación de modelos",
          "**Sistemas Big Data** — computación distribuida, pipelines de datos y procesamiento en tiempo real",
          "**Big Data aplicado** — ingeniería de datos en producción, analítica y cuadros de mando",
          "**Programación de IA** — Python, frameworks de ML, diseño de APIs y despliegue",
          "**Proyecto final** — Ultimus Defensor: plataforma de IA completa para operaciones BlueTeam",
        ],
      },
      dam: {
        h: "Desarrollo de Aplicaciones Multiplataforma (DAM) · 2023 – 2025",
        statusBadge: "Finalizado",
        p1: "**Ciclo formativo de grado superior** en el **INS Poblenou**, centrado en diseñar, construir y desplegar software en múltiples plataformas.",
        p2: "Me dio la base que sigo usando cada día: **ingeniería del software**, **desarrollo full-stack**, **bases de datos** y **gestión del ciclo de vida**, siempre con proyectos con forma de producción.",
        techTitle: "👨‍💻 Tecnologías y herramientas",
      },
      bac: {
        h: "Bachillerato de Ciencias Sociales · 2019 – 2021",
        p1: "Cursado en el **Centro de Alto Rendimiento (INS CAR)**, un centro pensado exclusivamente para deportistas de élite de nivel nacional.",
        p2: "Allí compaginé **seis horas de entrenamiento diarias** con la carga académica completa — de ahí salieron la gestión del tiempo, la disciplina y la calma bajo presión.",
        p3: "El INS CAR acoge a los mejores deportistas de España de múltiples disciplinas, incluida la **selección española de waterpolo**.",
      },
      certificationsTitle: "CERTIFICACIONES",
      certifications: [
        "**Google y Banco Santander:** Inteligencia Artificial y Productividad (oct. 2024)",
        "**IBM:** Python (ago. 2024)",
      ],
      languagesTitle: "IDIOMAS",
      languages: [
        { l: "Español", v: "Nativo" },
        { l: "Catalán", v: "Nativo" },
        { l: "Inglés", v: "B1" },
      ],
    },
  },

  contact: {
    title: "Hablemos",
    eyebrow: "Contacto",
    lead:
      "Hola — soy **Pau Vilar**, desarrollador al que le gusta construir cosas robustas, guiadas por datos y, sobre todo, terminadas.",
    paragraphs: [
      "Tengo el **CFGS en Desarrollo de Aplicaciones Multiplataforma (DAM)** y el **Máster en Inteligencia Artificial y Big Data**, finalizado con **Matrícula de Honor**. Me centro en **productos con IA**, **sistemas agénticos** y **análisis de datos** — machine learning que acaba delante de un usuario, no en un notebook.",
      "En paralelo soy **portero profesional de waterpolo**, esta temporada en el **Club Natació Catalunya**, en **División de Honor** y **Copa del Rey**. Diez años compaginando deporte de élite y formación técnica son la razón de que no me ponga nervioso cuando aprieta una entrega.",
      "Estoy abierto a **posiciones junior, prácticas y colaboraciones** en desarrollo de software, ingeniería de IA y análisis de datos. Si mi perfil te encaja, escríbeme — respondo rápido.",
    ],
    cardsTitle: "Dónde encontrarme",
    cards: [
      { k: "email", h: "Email", p: "La vía más rápida para llegar a mí.", cta: "pvilardev@gmail.com" },
      { k: "linkedin", h: "LinkedIn", p: "Trayectoria, novedades y un sitio donde saludar.", cta: "linkedin.com/in/pau-vilar" },
      { k: "github", h: "GitHub", p: "Todos los proyectos de esta web, con su código.", cta: "github.com/PauVilarEstrada" },
      { k: "cv", h: "CV", p: "Una página, en PDF, siempre actualizado.", cta: "Descargar CV" },
    ],
    lookingTitle: "Qué estoy buscando",
    looking: [
      "Ingeniería de IA / ML",
      "Desarrollo full-stack",
      "Ingeniería de datos",
      "Posiciones junior y prácticas",
      "Barcelona o remoto",
    ],
  },
};
