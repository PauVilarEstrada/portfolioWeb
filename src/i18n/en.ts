export const en = {
  meta: {
    title: "Pau Vilar — Full Stack & AI Engineer",
    switchLabel: "Change language",
  },

  nav: {
    home: "Home",
    work: "Work",
    experience: "Experience",
    contact: "Contact",
    hint: "hover to navigate",
  },

  home: {
    badge: "Open to work · Barcelona",
    name: "Pau Vilar i Estrada",
    roles: [
      "Full Stack Developer",
      "AI & Big Data Engineer",
      "Machine Learning Engineer",
      "AI Educator & Trainer",
    ],
    tagline:
      "I build software that actually ships — **AI systems**, **data pipelines**, **web platforms** and a **game live on Google Play**. Ten years as an elite water polo goalkeeper taught me the rest: show up, iterate, perform under pressure.",
    stats: [
      { n: "9", l: "Projects shipped" },
      { n: "20+", l: "Technologies" },
      { n: "3", l: "Products live" },
      { n: "MSc", l: "AI & Big Data" },
    ],
    ctaWork: "View my work",
    ctaContact: "Get in touch",
    scroll: "scroll",
    terminalTitle: "ai-console",
    terminal: [
      { cmd: "$ ./welcome.sh", out: "👋  Welcome to Pau's portfolio!" },
      { cmd: "$ git push origin --all", out: "✓  9 projects live on GitHub" },
      { cmd: "$ cat contact.txt", out: "📧  pvilardev@gmail.com — I reply fast" },
      { cmd: "$ open linkedin.com/in/pau-vilar", out: "🔗  Latest updates on LinkedIn ↗" },
      { cmd: "$ whoami", out: "AI Engineer · Full Stack · Water Polo GK 🤽" },
      { cmd: "$ grep -r 'hire' ./candidates/", out: "✓  Match found → pau_vilar.json 🎯" },
    ],

    featuredTitle: ["Featured", "Projects"],
    featuredLink: "See all projects →",

    timelineTitle: ["Experience &", "Education"],
    timelineLink: "Full profile →",
    timeline: [
      {
        date: "2026 – Present",
        icon: "🤽",
        role: "Goalkeeper · División de Honor",
        org: "Club Natació Catalunya",
        desc: "Signed for the new season at CN Catalunya, competing in Spain's top league and the Copa del Rey.",
        active: true,
      },
      {
        date: "2026",
        icon: "🧠",
        role: "AI Trainer — Agentic Systems",
        org: "Cambra de Comerç de Barcelona",
        desc: "Designing and delivering training in agentic AI, automation workflows and multi-agent orchestration for businesses.",
        active: true,
      },
      {
        date: "2025 – 2026",
        icon: "🎓",
        role: "Master's in AI & Big Data — completed",
        org: "Monlau Formación Profesional",
        desc: "Graduated with Matrícula de Honor. ML, LLMs, big-data pipelines and agentic systems. Final project: Ultimus Defensor.",
        active: true,
      },
      {
        date: "2025",
        icon: "💼",
        role: "Junior Full Stack Developer",
        org: "Sycai Medical · Internship",
        desc: "Modernised the internal platform, redesigned AWS databases and containerised deployments with Docker.",
        active: false,
      },
      {
        date: "2023 – 2026",
        icon: "🥅",
        role: "Goalkeeper",
        org: "CN Sant Andreu · División de Honor",
        desc: "Three seasons in Spain's top league and the EuroCup. Previously CN Barcelona — Champions League.",
        active: false,
      },
      {
        date: "2023 – 2025",
        icon: "💻",
        role: "Multiplatform App Development (DAM)",
        org: "INS Poblenou",
        desc: "Higher diploma in full-stack development, mobile apps, databases and software engineering.",
        active: false,
      },
    ],

    techTitle: ["Tech", "Stack"],
    techSubtitle: "What I reach for, day to day",

    focusTitle: ["What I", "do"],
    focus: [
      {
        icon: "🧠",
        h: "AI & Machine Learning",
        p: "Anomaly detection, gradient boosting, quantile regression and LLM assistants — models that ship with their uncertainty attached, not just a demo notebook.",
      },
      {
        icon: "⚙️",
        h: "Full-stack engineering",
        p: "React and TypeScript on the front, FastAPI, Node and Spring on the back, PostgreSQL and Redis underneath, Docker around it.",
      },
      {
        icon: "📊",
        h: "Data engineering",
        p: "Ingest, clean, cache and serve. Point-in-time feature stores, rate-limited scrapers and pipelines that survive a real production day.",
      },
      {
        icon: "📱",
        h: "Mobile & games",
        p: "React Native and Unity. MINDFLOW is published on Google Play: 4 modes, 1,200 verified levels, fully offline.",
      },
    ],

    cta: {
      eyebrow: "Let's work together",
      title: "Got a project in mind?",
      body:
        "I'm open to **junior roles, internships and collaborations** in software development, AI engineering and data analysis. Tell me what you're building — I reply fast.",
      cv: "Download CV",
    },
  },

  projectsPage: {
    title: ["My", "Projects"],
    subtitle: "Nine things I built, from AI platforms to arcade games. Click any card for the full story.",
  },

  projects: {
    ultimus: {
      name: "Ultimus Defensor — BlueSentinel",
      short: "Ultimus Defensor",
      desc:
        "AI-powered BlueTeam platform: MITRE ATT&CK detection, an Isolation Forest + XGBoost cascade, and an LLM security assistant grounded in 1,000+ documents.",
      tags: ["AI / ML", "Cybersecurity", "MITRE"],
    },
    nba: {
      name: "NBA Vision",
      short: "NBA Vision",
      desc:
        "Full-stack NBA analytics lab: quantile-regression player projections, Elo game forecasts and a possession-level simulator. Live on Vercel, bilingual.",
      tags: ["React", "XGBoost", "Simulation"],
    },
    mindflow: {
      name: "MINDFLOW — Brain Puzzle Games",
      short: "MINDFLOW",
      desc:
        "My first published mobile game: 4 puzzle modes, 1,200 verified levels, fully offline. Live on Google Play.",
      tags: ["React Native", "TypeScript", "Android"],
    },
    kdd: {
      name: "Intrusion Detection System (KDD'99)",
      short: "KDD'99 Intrusion Detection",
      desc:
        "Machine-learning IDS with a hierarchical classification pipeline, dataset engineering and analytical dashboards — 5M+ records processed.",
      tags: ["ML", "Big Data", "Python"],
    },
    ecommerce: {
      name: "E-Commerce Platform",
      short: "E-Commerce Platform",
      desc:
        "Full-stack shop: JWT auth, persistent cart, admin dashboard, Cloudinary images and Redis caching on the hot paths.",
      tags: ["React", "Node.js", "MongoDB"],
    },
    pacman: {
      name: "Pacman Remake",
      short: "Pacman",
      desc:
        "The arcade classic rebuilt in Java: custom maps loaded from files, selectable characters and ghost AI that sharpens as you score.",
      tags: ["Java", "OOP", "Game AI"],
    },
    flappy: {
      name: "Flappy Bird — Improved Clone",
      short: "Flappy Bird",
      desc:
        "Unity and C#: hand-tuned 2D physics, pooled procedural obstacles and an online leaderboard. One button, infinite runs.",
      tags: ["Unity", "C#", "Physics2D"],
    },
  },

  experience: {
    pageTitle: "Experience",
    pageSubtitle:
      "Engineering, teaching and elite sport — the three tracks I've been running at the same time.",

    trainer: {
      title: "AI TRAINER",
      titleHighlight: "· Cambra de Comerç de Barcelona",
      subtitle:
        "**AI Trainer & Educator** at the **Barcelona Chamber of Commerce** — I design and deliver training in **agentic AI systems, automation workflows and AI-powered business solutions** for professionals and companies across Catalonia.",
      blocks: [
        {
          h: "🎓 Training programmes delivered",
          p: "The Cambra de Comerç is one of the institutions driving digital transformation for Catalan businesses. My courses cover the full lifecycle of agentic systems — architecture, orchestration, deployment and business impact — taught hands-on, with real workflows rather than slideware.",
        },
      ],
      topicsTitle: "💡 What I teach",
      topics: [
        "**Agent architecture** — planning, reasoning loops and tool integration (ReAct, chain-of-thought, reflection)",
        "**Business automation** — end-to-end pipelines built around processes companies actually run",
        "**Multi-agent orchestration** — supervisor patterns, parallel agents and handoff protocols",
        "**Memory & state** — short-term context, long-term vector memory and retrieval strategies",
        "**Production readiness** — evaluation, observability and guardrails for autonomous systems",
      ],
    },

    sycai: {
      title: "EXPERIENCE AT",
      titleHighlight: "SYCAI MEDICAL",
      subtitle:
        "Sycai Medical is a Barcelona startup building AI tools for radiologists. Its technology helps detect and monitor **precancerous abdominal lesions** early, when treatment still changes the outcome.",
      blocks: [
        {
          h: "🚀 Junior Full Stack Developer · 6-month internship",
          p: "I modernised the company's internal software: **rebuilding the platform** off its legacy stack, **redesigning the databases** and replacing outdated tooling with a maintainable modern one.",
        },
        {
          h: "🔧 AWS infrastructure & cloud",
          p: "I worked on the **AWS** side — scalability, security and cost — redesigned database schemas, containerised services with **Docker** and contributed to **deployment automation**.",
        },
        {
          h: "🏆 About Sycai Medical",
          p: "Founded in **2020 in Barcelona**, Sycai specialises in **medical AI**, helping radiologists read **CT and MRI** studies. It integrates with **hospital PACS systems** over **DICOM**, and has won multiple innovation awards plus funding from European accelerators and health-tech grants.",
        },
      ],
      techTitle: "⚡ Technologies used",
      achievementsTitle: "💡 Key achievements",
      achievements: [
        { b: "Migrated the internal platform", r: " from legacy systems to a modern full-stack architecture." },
        { b: "Redesigned AWS databases", r: " improving query performance and cutting cost." },
        { b: "Built Docker environments", r: " for reproducible, scalable cloud deployments." },
        { b: "Improved hospital PACS integration", r: " shortening the loop for radiologists." },
      ],
    },

    waterpolo: {
      title: "PROFESSIONAL WATER POLO CAREER",
      subtitle:
        "Elite goalkeeper in **Spain's División de Honor** — the highest national league — and in **top European club competitions**.",
      currentBadge: "Current club",
      pastBadge: "Previous",
      clubs: [
        {
          name: "Club Natació Catalunya",
          years: "2026 – Present",
          current: true,
          p: "Signed as **goalkeeper** for **CN Catalunya** for the new season, competing at the very top of Spanish water polo:",
          bullets: [
            "**División de Honor** — Spain's premier professional league · LEWATERPOLO",
            "**Copa del Rey** — the country's most prestigious domestic cup",
          ],
        },
        {
          name: "CN Sant Andreu",
          years: "2023 – 2026",
          current: false,
          p: "**Starting goalkeeper** at **CN Sant Andreu**, three seasons at the top of the Spanish and European game:",
          bullets: [
            "**División de Honor** — Spain's premier professional league · LEWATERPOLO",
            "**Copa del Rey** — the country's most prestigious domestic cup",
            "**EuroCup** — Europe's second continental club competition",
          ],
        },
        {
          name: "CN Barcelona",
          years: "2019 – 2023",
          current: false,
          p: "**Goalkeeper** at **CN Barcelona**, the **most decorated** water polo club in Spain:",
          bullets: [
            "**División de Honor** — Spain's premier professional league · LEWATERPOLO",
            "**Copa del Rey** — the country's most prestigious domestic cup",
            "**Champions League** — the top club competition in European water polo",
            "**EuroCup** — Europe's second continental club competition",
          ],
        },
      ],
      achievementsTitle: "💡 What the sport taught me",
      achievements: [
        { b: "Three elite clubs, one league", r: " — Spain's highest division, plus European competition every season." },
        { b: "Champions League minutes", r: " against the best clubs in Europe and, by extension, the world." },
        { b: "Composure under pressure", r: " — a goalkeeper's entire job is the next shot, not the last one." },
        { b: "A dual career, sustained", r: " — full-time sport alongside full-time study, for a decade." },
      ],
    },

    studies: {
      title: "STUDIES",
      master: {
        h: "🤖 Master's in Artificial Intelligence & Big Data · 2025 – 2026",
        statusBadge: "Completed · Matrícula de Honor",
        p1: "**Completed** at **Monlau Formación Profesional**, graduating with **Matrícula de Honor** — the highest academic distinction. A high-intensity programme across the full span of modern AI and data engineering: supervised and unsupervised learning, LLMs, agentic systems, production data pipelines and real ML deployment.",
        p2: "It culminated in **Ultimus Defensor**, an end-to-end AI cybersecurity platform combining anomaly detection, MITRE ATT&CK classification and an LLM-powered BlueTeam assistant.",
        areasTitle: "📚 Key areas of study",
        areas: [
          "**AI models** — neural networks, NLP, computer vision, expert systems, AI ethics",
          "**Machine learning** — supervised, unsupervised, ensembles, model evaluation",
          "**Big data systems** — distributed computing, data pipelines, real-time processing",
          "**Applied big data** — production data engineering, analytics, BI dashboards",
          "**AI programming** — Python, ML frameworks, API design, deployment",
          "**Final project** — Ultimus Defensor: a complete AI platform for BlueTeam operations",
        ],
      },
      dam: {
        h: "Multiplatform Application Development (DAM) · 2023 – 2025",
        statusBadge: "Completed",
        p1: "**Higher National Diploma** at **INS Poblenou**, focused on designing, building and deploying software across platforms.",
        p2: "It gave me the foundation I still use daily: **software engineering**, **full-stack development**, **databases** and **application lifecycle management**, all through production-shaped projects.",
        techTitle: "👨‍💻 Core technologies & tools",
      },
      bac: {
        h: "Social Sciences Baccalaureate · 2019 – 2021",
        p1: "Completed at the **High-Performance Centre (INS CAR)**, an institution built exclusively for national-level elite athletes.",
        p2: "There I combined **six hours of daily training** with a full academic load — which is where the time management, discipline and calm under pressure actually came from.",
        p3: "INS CAR hosts Spain's top athletes across disciplines, including the **national water polo team**.",
      },
      certificationsTitle: "CERTIFICATIONS",
      certifications: [
        "**Google & Banco Santander:** Artificial Intelligence and Productivity (Oct 2024)",
        "**IBM:** Python (Aug 2024)",
      ],
      languagesTitle: "LANGUAGES",
      languages: [
        { l: "Spanish", v: "Native" },
        { l: "Catalan", v: "Native" },
        { l: "English", v: "B1" },
      ],
    },
  },

  contact: {
    title: "Let's Connect",
    eyebrow: "Contact",
    lead:
      "Hi — I'm **Pau Vilar**, a developer who likes building things that are robust, data-driven and actually finished.",
    paragraphs: [
      "I hold a **Higher Diploma in Multiplatform Application Development (DAM)** and a **Master's in Artificial Intelligence & Big Data**, completed with **Matrícula de Honor**. My focus is **AI-driven products**, **agentic systems** and **data analysis** — machine learning that ends up in front of a user, not in a notebook.",
      "Alongside that I'm a **professional water polo goalkeeper**, this season with **Club Natació Catalunya** in Spain's **División de Honor** and the **Copa del Rey**. Ten years of balancing elite sport with technical study is the reason I'm calm when a deadline gets loud.",
      "I'm open to **junior roles, internships and collaborations** in software development, AI engineering and data analysis. If my profile looks like a fit, write to me — I reply fast.",
    ],
    cardsTitle: "Where to find me",
    cards: [
      { k: "email", h: "Email", p: "The fastest way to reach me.", cta: "pvilardev@gmail.com" },
      { k: "linkedin", h: "LinkedIn", p: "Background, updates and a way to say hello.", cta: "linkedin.com/in/pau-vilar" },
      { k: "github", h: "GitHub", p: "Every project on this site, with its source.", cta: "github.com/PauVilarEstrada" },
      { k: "cv", h: "CV", p: "One page, PDF, always up to date.", cta: "Download CV" },
    ],
    lookingTitle: "What I'm looking for",
    looking: [
      "AI / ML engineering",
      "Full-stack development",
      "Data engineering",
      "Junior roles & internships",
      "Barcelona or remote",
    ],
  },
};

export type Dict = typeof en;
