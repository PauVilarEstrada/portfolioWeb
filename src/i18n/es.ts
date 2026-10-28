import type { Dict } from "./en";
import { pagesEs } from "./pages.es";

export const es: Dict = {
  pages: pagesEs,
  meta: {
    title: "Pau Vilar",
    description:
      "Pau Vilar, responsable y coordinador de IA y consultor IT en Brontobyte Cloud. IA privada para empresas, automatización con n8n, formación en IA y software a medida.",
    switchLabel: "Cambiar idioma",
  },

  nav: {
    play: "Juego",
    home: "Inicio",
    work: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
    skip: "Saltar al contenido",
    menu: "Menú",
    close: "Cerrar menú",
    homeLabel: "Pau Vilar, ir al inicio",
    themeDark: "Cambiar a tema oscuro",
    themeLight: "Cambiar a tema claro",
  },

  intro: {
    save: "¡PARADA DE PAU!",
    label: "Pau Vilar, portero de waterpolo y responsable de IA",
  },

  notFound: {
    title: "Fuera de juego",
    lead: "Esta página no existe o se ha movido. Ya que estás aquí, tira unos penaltis antes de volver.",
    home: "Volver al inicio",
    projects: "Ver proyectos",
  },

  play: {
    title: "Juego",
    lead:
      "Un rincón para jugar. Recorre a nado mis proyectos y mi trayectoria en el waterpolo, lánzale penaltis a Pau, monta una automatización como las que hago en Brontobyte Cloud o juega con las animaciones de la web.",
    count: "juegos",
    index: { swim: "Piscina de proyectos", penalties: "Penaltis", puzzle: "Puzzle de automatización", lab: "Zona PV" },
    swim: {
      title: "Piscina de proyectos",
      lead:
        "Un partido contra tres defensas. Llega con el balón a cada boya misteriosa para descubrir qué esconde (un proyecto, un club o una etapa de lo que hago) y, cuando las tengas todas, marca en la portería de la derecha.",
      start: "Empezar el partido",
      controls: "Flechas o WASD para nadar y Espacio para chutar. En el móvil, mantén pulsado y arrastra hacia donde quieras ir.",
      found: "descubiertas",
      panelTitle: "Lo que vas descubriendo",
      panelEmpty:
        "Nada con el balón hasta una boya con «?» para descubrir qué hay. Si un defensa te toca, te roba el balón: recupéralo y sigue.",
      open: "Ver proyecto",
      more: "Ver experiencia",
      newTab: "se abre en otra pestaña",
      masterLabel: "Máster IA y Big Data",
      kinds: { project: "Proyecto", club: "Waterpolo", work: "Trabajo", study: "Formación" },
      hints: {
        needBall: "Necesitas el balón para abrir esta boya.",
        stolen: "¡Te han robado el balón! Recupéralo.",
        notYet: "Primero descubre todas las boyas.",
        tooFar: "Acércate más a la portería para chutar.",
        goalReady: "¡Las tienes todas! Ahora marca en la portería de la derecha.",
      },
      shoot: "Chutar",
      goal: "¡GOOOL!",
      goalText: "Has descubierto mis proyectos, mi trayectoria en el waterpolo y lo que hago en Brontobyte Cloud. Gracias por jugar.",
      again: "Jugar otra vez",
      time: "Tiempo",
      best: "Récord",
      soundOn: "Activar sonido",
      soundOff: "Silenciar",
      fallback: "Tu navegador no puede mostrar el juego en 3D.",
    },
    penalties: {
      title: "Penaltis contra Pau",
      lead: "Cinco tiros contra el portero. Tu mejor marca se guarda en este navegador.",
    },
    puzzle: {
      title: "Puzzle de automatización",
      lead:
        "Monta cada automatización eligiendo las piezas en orden: qué la dispara, de dónde salen los datos, qué la orquesta, qué decide, qué entiende y qué hace al final. Las piezas están mezcladas y hay trampas. Son ejemplos del tipo de trabajo que hago con n8n e IA privada.",
      types: {
        trigger: "Disparador",
        source: "Datos",
        flow: "Orquestación",
        logic: "Lógica",
        ai: "IA",
        action: "Acción",
        notify: "Aviso",
      },
      nodes: {
        cron: "Cada mañana",
        mailIn: "Llega un email",
        form: "Formulario web",
        webhook: "Webhook",
        gmail: "Gmail",
        outlook: "Outlook (M365)",
        zoho: "Zoho CRM",
        veeam: "Veeam",
        drive: "Google Drive",
        bitdefender: "Bitdefender",
        n8n: "n8n",
        ifNode: "Condición (IF)",
        filter: "Filtrar",
        approve: "Aprobación humana",
        llm: "LLM privado",
        rag: "Base de conocimiento",
        crm: "Actualizar Zoho CRM",
        ticket: "Crear ticket",
        save: "Guardar en Drive",
        reply: "Borrador de respuesta",
        teams: "Aviso en Teams",
        email: "Aviso por email",
      },
      scenario: "Reto",
      of: "de",
      next: "Siguiente reto",
      restart: "Volver a empezar",
      wrong: "Esa pieza no va ahí. Fíjate en qué tipo de pieza toca ahora.",
      done: "¡Automatización montada!",
      mistakes: "fallos",
      allDone:
        "Has montado las seis. Así trabajo en Brontobyte Cloud: n8n conecta las aplicaciones de la empresa y un LLM privado entiende sus datos, sin que salgan del centro de datos.",
      scenarios: [
        {
          goal: "Cada mañana, un resumen de los correos de clientes en Teams.",
          path: ["cron", "gmail", "n8n", "llm", "teams"],
          explain: "A primera hora, n8n recoge los correos nuevos, el LLM privado los resume y el equipo recibe el resumen en Teams.",
        },
        {
          goal: "Puntuar cada lead nuevo del CRM y avisar solo de los que valen la pena.",
          path: ["webhook", "zoho", "n8n", "llm", "ifNode", "teams"],
          explain: "Zoho avisa a n8n de cada lead nuevo, el LLM lo puntúa y la condición deja pasar solo los buenos al canal de Teams.",
        },
        {
          goal: "Revisar las copias de seguridad cada mañana y abrir un ticket si algo ha fallado.",
          path: ["cron", "veeam", "n8n", "filter", "llm", "ticket"],
          explain: "n8n lee los trabajos de Veeam, se queda con los fallidos, el LLM explica la causa probable y se abre un ticket con todo.",
        },
        {
          goal: "Pasar a Drive y al CRM los documentos que llegan por el formulario web.",
          path: ["form", "n8n", "llm", "save", "crm", "email"],
          explain: "El LLM lee cada documento y extrae los datos, n8n lo archiva en Drive, actualiza la ficha del cliente y confirma por email.",
        },
        {
          goal: "Contestar a los clientes con la documentación de la empresa, revisado por una persona.",
          path: ["mailIn", "outlook", "n8n", "rag", "llm", "approve", "reply"],
          explain: "Cuando llega una consulta, n8n busca en la base de conocimiento, el LLM redacta la respuesta y una persona la aprueba antes de enviarla.",
        },
        {
          goal: "Detectar amenazas en los equipos, explicarlas y avisar al técnico de guardia.",
          path: ["webhook", "bitdefender", "n8n", "ifNode", "llm", "ticket", "email"],
          explain: "Bitdefender envía el incidente, la condición descarta lo leve, el LLM lo explica en claro, se abre un ticket y el técnico recibe el aviso.",
        },
      ],
    },
    lab: {
      title: "Zona PV",
      lead: "Las animaciones de la web, para trastear: pasa el ratón por PV, hazlo explotar o vuelve a ver la intro y el telón entre páginas.",
      explode: "Explotar PV",
      intro: "Repetir la intro",
      curtain: "Ver el telón",
    },
  },

  footer: {
    playTitle: "Juego",
    title: "¿Hablamos de tu proyecto?",
    body:
      "IA privada, automatización, formación o software a medida. Si tienes algo concreto en mente, o simplemente quieres conocernos, escríbeme.",
    cta: "Escríbeme",
    secondary: "Ver formas de contacto",
    navTitle: "Navegación",
    elsewhereTitle: "En otros sitios",
    rights: "Pau Vilar i Estrada",
    place: "Catalunya, España",
    top: "Volver arriba",
    localTime: "Hora local en Catalunya",
  },

  home: {
    badge: "Disponible para proyectos · ",
    badgeLabel: "Disponible para proyectos. Ir a contacto",
    nameLines: ["Pau Vilar", "i Estrada"],
    rolePre: "Responsable y coordinador de IA · Consultor IT en",
    company: "Brontobyte Cloud",
    intro:
      "Diseño y construyo IA privada, automatizaciones y software a medida para empresas. Si tienes un proyecto concreto, hablemos.",
    ctaPrimary: "Proponer un proyecto",
    ctaSecondary: "Ver proyectos",
    scroll: "Desliza",

    servicesTitle: "En qué puedo ayudarte",
    servicesLead:
      "Proyectos concretos, con un alcance claro. Puedo entrar como consultor, como desarrollador o como formador.",
    services: [
      {
        h: "IA privada y asistentes internos",
        p: "LLMs que consultan la documentación y las aplicaciones de tu empresa, con RAG y control de accesos, desplegados en infraestructura controlada.",
        tags: ["LLM", "RAG", "IMPLEMAI"],
      },
      {
        h: "Automatización de procesos",
        p: "Flujos con n8n y agentes que conectan Microsoft 365, Zoho, CRMs y APIs para quitar trabajo repetitivo de en medio.",
        tags: ["n8n", "Agentes", "APIs"],
      },
      {
        h: "Software a medida",
        p: "Aplicaciones web y móviles de punta a punta: React y React Native delante, FastAPI, Node o Spring detrás, todo en contenedores.",
        tags: ["React", "React Native", "FastAPI"],
      },
      {
        h: "Formación en IA agéntica",
        p: "Cursos y talleres prácticos para equipos: arquitectura de agentes, automatización y cómo llevarlos a producción con garantías.",
        tags: ["Talleres", "Empresas", "Agentes"],
      },
    ],

    workTitle: "Proyectos seleccionados",
    workLead: "Plataformas de IA, analítica de datos, web y un juego publicado en Google Play.",
    workLink: "Todos los proyectos",

    careerTitle: "Trayectoria",
    careerLink: "Experiencia completa",
    careerExpLabel: "Experiencia",
    careerEduLabel: "Formación",
    careerExp: [
      { year: "2026 – hoy", role: "Responsable y coordinador de IA · Consultor IT", org: "Brontobyte Cloud", badge: "" },
      { year: "2026", role: "Formador en IA agéntica", org: "Cambra de Comerç de Barcelona", badge: "" },
      { year: "2025", role: "Desarrollador Full Stack", org: "Sycai Medical", badge: "" },
    ],
    careerEdu: [
      { year: "2025 – 2026", role: "Máster en IA y Big Data", org: "Monlau Formación Profesional", badge: "Matrícula de Honor" },
      { year: "2023 – 2025", role: "CFGS Desarrollo de Aplicaciones Multiplataforma", org: "INS Poblenou", badge: "" },
      { year: "2019 – 2021", role: "Bachillerato de Ciencias Sociales", org: "INS CAR, Centro de Alto Rendimiento", badge: "" },
    ],

    sportTitle: "Deporte de élite, a la vez",
    sportLead:
      "Llevo más de diez años como portero de waterpolo en la máxima liga española, con Champions League y EuroCup, compaginándolo con los estudios y ahora con el trabajo. De ahí vienen buena parte de mis hábitos profesionales.",
    sport: [
      { h: "Calma con el reloj corriendo", p: "Un penalti en el último minuto y una incidencia en producción se gestionan igual: pensar claro y decidir." },
      { h: "Constancia", p: "Entrenar a las seis de la mañana durante años enseña que el trabajo poco vistoso es el que termina los proyectos." },
      { h: "Comunicación de equipo", p: "Un portero lee toda la piscina y no deja de hablar. Lo mismo hace que un traspaso o una revisión funcionen." },
    ],
    sportLink: "Carrera deportiva",
    game: {
      title: "Lánzale un penalti a Pau",
      hint: "Haz clic o toca dentro de la portería para lanzar. Con teclado: flechas para apuntar y Enter para tirar.",
      label: "Mini-juego de penaltis de waterpolo. Pau Vilar es el portero.",
      goal: "¡Gol!",
      save: "¡Parada de Pau!",
      miss: "Fuera",
      goals: "Goles",
      saves: "Paradas",
      shot: "Tiro",
      of: "de",
      best: "Récord",
      again: "Otra tanda",
      resultWin: "¡Has ganado a Pau!",
      resultLose: "Gana Pau. ¿Otra tanda?",
      resultDraw: "Empate.",
    },

    stackTitle: "Herramientas",
    stackLead: "Lo que uso a diario, agrupado por para qué sirve.",
    stack: [
      { h: "IA y datos", items: ["Python", "LLMs y RAG", "LLMs locales (Ollama)", "n8n", "Agentes", "PyTorch", "scikit-learn", "XGBoost", "pandas", "Big Data"] },
      { h: "Lenguajes y backend", items: ["Java", "JavaScript", "TypeScript", "C#", "Kotlin", "SQL", "Bash", "FastAPI", "Flask", "Django", "Node.js", "Spring Boot", "Hibernate"] },
      { h: "Frontend, móvil y juegos", items: ["React", "React Native", "Angular", "HTML y CSS", "Tailwind", "Bootstrap", "Unity", "Figma"] },
      { h: "Datos e infraestructura", items: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Docker", "AWS", "Linux", "VirtualBox", "Git"] },
      { h: "Entorno de empresa", items: ["Microsoft 365", "Google Workspace", "Zoho", "Veeam", "Bitdefender GravityZone"] },
    ],
  },

  projectsPage: {
    title: "Proyectos",
    lead:
      "Una selección de lo que he construido: plataformas de IA, analítica de datos, aplicaciones web y juegos. Cada proyecto tiene su página con qué hace, cómo está hecho y qué decisiones tomé.",
    filters: { all: "Todos", ai: "IA y datos", web: "Web", games: "Juegos y móvil" },
    featured: "Proyecto destacado",
    cols: { project: "Proyecto", type: "Tipo", stack: "Stack", status: "Estado" },
    count: "proyectos",
    pinned: "Fijado",
    open: "Ver proyecto",
    empty: "No hay proyectos en esta categoría.",
  },

  projects: {
    tactiq: {
      name: "TactiQ 360",
      short: "TactiQ 360",
      desc:
        "SaaS multi-club para gestionar equipos de fútbol: convocatorias, pizarra, acta en directo sin cobertura, estadísticas automáticas e informes en PDF.",
      tags: ["SaaS", "React", "FastAPI"],
      cat: "web",
      context: "En producción",
      kind: "SaaS de gestión deportiva",
    },
    ultimus: {
      name: "Ultimus Defensor: BlueSentinel",
      short: "Ultimus Defensor",
      desc:
        "Plataforma BlueTeam con IA: detección MITRE ATT&CK, cascada Isolation Forest + XGBoost y un asistente de seguridad con LLM sobre más de 1.000 documentos.",
      tags: ["IA / ML", "Ciberseguridad", "LLM"],
      cat: "ai",
      context: "Proyecto final del máster",
      kind: "Ciberseguridad con IA",
    },
    nba: {
      name: "NBA Vision",
      short: "NBA Vision",
      desc:
        "Laboratorio full-stack de analítica NBA: proyecciones por regresión cuantílica, pronósticos Elo y un simulador posesión a posesión. Publicado en Vercel y bilingüe.",
      tags: ["React", "XGBoost", "Simulación"],
      cat: "ai",
      context: "En producción",
      kind: "Analítica y predicción",
    },
    mindflow: {
      name: "MINDFLOW: Brain Puzzle Games",
      short: "MINDFLOW",
      desc:
        "Juego móvil publicado en Google Play: 4 modos de puzzle, 1.200 niveles verificados y totalmente offline.",
      tags: ["React Native", "TypeScript", "Android"],
      cat: "games",
      context: "Google Play",
      kind: "Juego móvil",
    },
    kdd: {
      name: "Sistema de detección de intrusiones (KDD'99)",
      short: "Detección de intrusiones KDD'99",
      desc:
        "IDS con machine learning: clasificación jerárquica, ingeniería del dataset y cuadros de mando analíticos sobre más de 5 millones de registros.",
      tags: ["ML", "Big Data", "Python"],
      cat: "ai",
      context: "Proyecto del máster",
      kind: "Detección con machine learning",
    },
    pacman: {
      name: "Pacman Remake",
      short: "Pacman",
      desc:
        "El clásico arcade reconstruido en Java: mapas personalizados cargados desde ficheros, personajes seleccionables e IA de fantasmas.",
      tags: ["Java", "POO", "IA de juego"],
      cat: "games",
      context: "Código en GitHub",
      kind: "Juego arcade",
    },
    flappy: {
      name: "Flappy Bird, clon mejorado",
      short: "Flappy Bird",
      desc:
        "Unity y C#: físicas 2D ajustadas a mano, obstáculos procedurales con object pooling y ranking online.",
      tags: ["Unity", "C#", "Physics2D"],
      cat: "games",
      context: "Código en GitHub",
      kind: "Juego arcade",
    },
  },

  experience: {
    pageTitle: "Experiencia",
    pageLead:
      "Consultoría e IA en empresa, formación, desarrollo de producto y deporte de élite. Todo a la vez durante los últimos años, y cada parte ha mejorado las otras.",
    indexTitle: "En esta página",
    index: {
      bronto: "Brontobyte Cloud",
      trainer: "Cambra de Comerç",
      sycai: "Sycai Medical",
      sport: "Waterpolo",
      education: "Formación",
    },
    labels: {
      current: "Actual",
      highlights: "Responsabilidades",
      achievements: "Resultados",
      topics: "Qué enseño",
      stack: "Tecnologías",
      website: "Web",
    },

    bronto: {
      org: "Brontobyte Cloud",
      role: "Responsable y coordinador de IA · Consultor IT",
      period: "2026 – actualidad",
      location: "Girona",
      summary:
        "Responsable y coordinador del departamento de IA. Desarrollo soluciones de **IA privada** para clientes y para la propia Brontobyte Cloud, y aporto al proyecto **IMPLEMAI**, con el que ayudamos a las empresas a trabajar con sus datos en un entorno controlado y a automatizar procesos.",
      about:
        "Brontobyte Cloud es un proveedor europeo de ciberseguridad, cloud y protección de datos con sede en Girona. Trabaja a través de partners, con infraestructura bajo jurisdicción europea y certificaciones **ISO/IEC 27001** y **ENS categoría media**.",
      highlights: [
        "Coordino el departamento de IA: prioridades, hoja de ruta y relación con el resto de áreas técnicas.",
        "Diseño y despliego entornos de **IA privada** para clientes: un LLM que consulta las aplicaciones de la empresa y ejecuta automatizaciones.",
        "Construyo automatizaciones con **n8n** sobre Microsoft 365, Zoho y aplicaciones cloud de cliente.",
        "Desarrollo herramientas internas de IA para los equipos de Brontobyte Cloud.",
      ],
      quote:
        "Brontobyte Cloud sigue creciendo y nos hace mucha ilusión dar la bienvenida a Pau Vilar i Estrada, que se incorpora a nuestro equipo como consultor de IA y soluciones IT. Su formación en desarrollo de software, inteligencia artificial y Big Data nos permitirá sumar conocimiento y capacidad en diferentes ámbitos de la compañía.",
      quoteSource: "Brontobyte Cloud en LinkedIn, traducido del catalán",
      implemai: {
        title: "IMPLEMAI, IA privada para empresas",
        lead:
          "El proyecto de IA privada de Brontobyte Cloud. Según lo que necesita cada empresa, montamos un entorno con un LLM que consulta todas las aplicaciones de la compañía y automatiza procesos, sin que los datos salgan de nuestro centro de datos.",
        facts: [
          { h: "Centro de datos propio en Madrid", p: "Máquinas virtuales dedicadas sobre GPUs NVIDIA RTX PRO 6000 Blackwell con 96 GB de VRAM." },
          { h: "Un LLM conectado a tu empresa", p: "Consultas en lenguaje natural sobre tus aplicaciones y automatizaciones sobre ellas, orquestadas con n8n." },
          { h: "Cloud y on-premise", p: "Cualquier aplicación cloud se integra vía n8n. Las on-premise se estudian caso por caso." },
          { h: "Tus datos no salen de ahí", p: "No entrenamos modelos con ellos, no los usamos para otra cosa y no los vendemos." },
        ],
      },
      certsLabel: "Certificaciones de la empresa",
      website: "brontobytecloud.com",
    },

    trainer: {
      org: "Cambra de Comerç de Barcelona",
      role: "Formador en IA agéntica",
      period: "2026",
      location: "Barcelona",
      summary:
        "Diseño e imparto formación en **sistemas de IA agéntica, automatización y soluciones de IA para empresa**, dirigida a profesionales y compañías de Cataluña. Cubro todo el ciclo de vida: arquitectura, orquestación, despliegue e impacto en el negocio, siempre con práctica real.",
      topics: [
        "**Arquitectura de agentes**: planificación, bucles de razonamiento e integración de herramientas.",
        "**Automatización de negocio**: pipelines de principio a fin sobre procesos reales.",
        "**Orquestación multiagente**: patrón supervisor, agentes en paralelo y traspasos.",
        "**Memoria y estado**: contexto a corto plazo, memoria vectorial y recuperación.",
        "**Producción**: evaluación, observabilidad y guardarraíles.",
      ],
    },

    sycai: {
      org: "Sycai Medical",
      role: "Desarrollador Full Stack · Prácticas de 6 meses",
      period: "2025",
      location: "Barcelona",
      summary:
        "Startup de Barcelona que desarrolla IA para radiólogos: ayuda a detectar y monitorizar **lesiones abdominales precancerosas** en TAC y resonancia, integrada con los sistemas **PACS** hospitalarios vía **DICOM**.",
      achievements: [
        "**Migré la plataforma interna** desde sistemas heredados a una arquitectura full-stack moderna.",
        "**Rediseñé las bases de datos en AWS**, mejorando el rendimiento de las consultas y reduciendo coste.",
        "**Containericé servicios con Docker** para despliegues cloud reproducibles.",
        "**Mejoré la integración con PACS**, acortando el circuito de trabajo de los radiólogos.",
      ],
    },

    sport: {
      title: "Carrera deportiva",
      lead:
        "Portero de waterpolo en la **División de Honor**, la máxima liga española, y en las principales competiciones europeas de clubes.",
      currentBadge: "Club actual",
      clubs: [
        {
          name: "Club Natació Catalunya",
          years: "2026 – actualidad",
          current: true,
          p: "Portero del CN Catalunya en lo más alto del waterpolo español.",
          comps: ["División de Honor", "Copa del Rey"],
        },
        {
          name: "CN Sant Andreu",
          years: "2023 – 2026",
          current: false,
          p: "Portero titular durante tres temporadas en la élite española y europea.",
          comps: ["División de Honor", "Copa del Rey", "EuroCup"],
        },
        {
          name: "CN Barcelona",
          years: "2019 – 2023",
          current: false,
          p: "Portero del club más laureado del waterpolo español.",
          comps: ["División de Honor", "Copa del Rey", "Champions League", "EuroCup"],
        },
      ],
      lessonsTitle: "Lo que me ha dado el deporte",
      lessons: [
        "**Sangre fría bajo presión**: el trabajo de un portero es el siguiente lanzamiento, nunca el anterior.",
        "**Una carrera dual sostenida** durante una década: deporte y estudios, ambos a tiempo completo.",
        "**Minutos en Champions League** frente a los mejores clubes de Europa.",
      ],
    },

    education: {
      title: "Formación",
      items: [
        {
          h: "Máster en Inteligencia Artificial y Big Data",
          org: "Monlau Formación Profesional",
          period: "2025 – 2026",
          badge: "Matrícula de Honor",
          p: "Aprendizaje supervisado y no supervisado, LLMs, sistemas agénticos, pipelines de datos en producción y despliegue de modelos. Proyecto final: **Ultimus Defensor**, plataforma de ciberseguridad con IA.",
        },
        {
          h: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
          org: "INS Poblenou",
          period: "2023 – 2025",
          badge: "",
          p: "Ingeniería del software, desarrollo full-stack, bases de datos y gestión del ciclo de vida, siempre con proyectos con forma de producción.",
        },
        {
          h: "Bachillerato de Ciencias Sociales",
          org: "INS CAR, Centro de Alto Rendimiento",
          period: "2019 – 2021",
          badge: "",
          p: "Centro para deportistas de élite de nivel nacional: seis horas de entrenamiento diarias junto a la carga académica completa.",
        },
      ],
      certificationsTitle: "Certificaciones",
      certifications: [
        "**Google y Banco Santander**: Inteligencia Artificial y Productividad (2024)",
        "**IBM**: Python (2024)",
      ],
      languagesTitle: "Idiomas",
      languages: [
        { l: "Catalán", v: "Nativo" },
        { l: "Español", v: "Nativo" },
        { l: "Inglés", v: "B1" },
      ],
    },
  },

  contact: {
    title: "Hablemos",
    lead:
      "Abierto a **colaboraciones, formación y proyectos concretos** de IA, automatización y software. Cuéntame qué tienes entre manos y vemos cómo encaja.",
    routesTitle: "Dos formas de trabajar juntos",
    routes: [
      {
        h: "Empresas: IA privada e IT",
        p: "Entornos de IA privada, automatización con n8n e infraestructura IT para tu empresa, a través de Brontobyte Cloud, donde coordino el área de IA.",
        tag: "Con Brontobyte Cloud",
      },
      {
        h: "Formación en IA y desarrollo",
        p: "Si tu empresa o tú queréis entender la IA, aprender a usarla en algo concreto o montar una herramienta a medida, puedo ayudaros directamente.",
        tag: "Conmigo",
      },
    ],
    reasonsTitle: "¿En qué te puedo ayudar?",
    reasons: [
      { h: "Formación en IA", p: "Cursos y talleres para empresas y particulares: desde entender la IA generativa hasta agentes y automatización aplicados a tu caso." },
      { h: "Un entorno de IA privada", p: "Que un LLM trabaje con los datos de tu empresa sin que salgan de un entorno controlado." },
      { h: "Automatizar un proceso", p: "Quitarte de encima tareas repetitivas entre aplicaciones con n8n o agentes." },
      { h: "Una aplicación a medida", p: "Una web, una app móvil o una herramienta interna, de punta a punta." },
      { h: "Conocernos", p: "Sin proyecto concreto todavía. Un café o una llamada también está bien." },
    ],
    formTitle: "Cuéntame tu proyecto",
    formNote: "Al enviar se abrirá tu cliente de correo con el mensaje preparado.",
    form: {
      name: "Nombre",
      company: "Empresa (opcional)",
      topic: "Tema",
      topics: ["Formación en IA", "IA privada", "Automatización", "Software a medida", "Conocernos"],
      message: "Mensaje",
      messagePlaceholder: "Qué necesitas, plazos aproximados y cualquier contexto útil.",
      submit: "Preparar correo",
      subject: "Proyecto",
      required: "Completa tu nombre y el mensaje.",
    },
    channelsTitle: "Contacto directo",
    channels: [
      { k: "email", h: "Email", cta: "pvilardev@gmail.com" },
      { k: "linkedin", h: "LinkedIn", cta: "linkedin.com/in/pau-vilar" },
      { k: "github", h: "GitHub", cta: "github.com/PauVilarEstrada" },
      { k: "cv", h: "CV en PDF", cta: "Descargar" },
    ],
    basedIn: "Desde Catalunya, en remoto o presencial.",
  },
};
