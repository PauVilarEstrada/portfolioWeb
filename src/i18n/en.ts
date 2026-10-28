import { pagesEn } from "./pages.en";

export const en = {
  pages: pagesEn,
  meta: {
    title: "Pau Vilar — AI Lead & IT Consultant at Brontobyte Cloud",
    description:
      "Pau Vilar, AI lead and coordinator and IT consultant at Brontobyte Cloud. Private AI for companies, n8n automation, AI training and custom software.",
    switchLabel: "Change language",
  },

  nav: {
    home: "Home",
    work: "Projects",
    experience: "Experience",
    contact: "Contact",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close menu",
    homeLabel: "Pau Vilar, go to home",
    themeDark: "Switch to dark theme",
    themeLight: "Switch to light theme",
  },

  footer: {
    title: "Shall we talk about your project?",
    body:
      "Private AI, automation, training or custom software. If you have something specific in mind, or just want to meet, write to me.",
    cta: "Write to me",
    secondary: "See contact options",
    navTitle: "Navigation",
    elsewhereTitle: "Elsewhere",
    rights: "Pau Vilar i Estrada",
    place: "Catalonia, Spain",
    top: "Back to top",
    localTime: "Local time in Catalonia",
  },

  home: {
    badge: "Available for new projects · ",
    badgeLabel: "Available for projects. Go to contact",
    nameLines: ["Pau Vilar", "i Estrada"],
    rolePre: "AI Lead & Coordinator · IT Consultant at",
    company: "Brontobyte Cloud",
    intro:
      "I design and build private AI, automations and custom software for companies. If you have a specific project in mind, let's talk.",
    ctaPrimary: "Propose a project",
    ctaSecondary: "See projects",
    scroll: "Scroll",

    servicesTitle: "How I can help",
    servicesLead:
      "Specific projects with a clear scope. I can come in as a consultant, a developer or a trainer.",
    services: [
      {
        h: "Private AI and internal assistants",
        p: "LLMs that query your company's documents and applications, with RAG and access control, deployed on infrastructure you control.",
        tags: ["LLM", "RAG", "IMPLEMAI"],
      },
      {
        h: "Process automation",
        p: "n8n flows and agents connecting Microsoft 365, Zoho, CRMs and APIs to take repetitive work off your plate.",
        tags: ["n8n", "Agents", "APIs"],
      },
      {
        h: "Custom software",
        p: "End-to-end web and mobile apps: React and React Native up front, FastAPI, Node or Spring behind, all containerised.",
        tags: ["React", "React Native", "FastAPI"],
      },
      {
        h: "Agentic AI training",
        p: "Hands-on courses and workshops for teams: agent architecture, automation and how to take them to production safely.",
        tags: ["Workshops", "Companies", "Agents"],
      },
    ],

    workTitle: "Selected projects",
    workLead: "AI platforms, data analytics, web and a game published on Google Play.",
    workLink: "All projects",

    careerTitle: "Career",
    careerLink: "Full experience",
    careerExpLabel: "Experience",
    careerEduLabel: "Education",
    careerExp: [
      { year: "2026 – now", role: "AI Lead & Coordinator · IT Consultant", org: "Brontobyte Cloud", badge: "" },
      { year: "2026", role: "Agentic AI trainer", org: "Barcelona Chamber of Commerce", badge: "" },
      { year: "2025", role: "Full Stack Developer", org: "Sycai Medical", badge: "" },
    ],
    careerEdu: [
      { year: "2025 – 2026", role: "Master's in AI & Big Data", org: "Monlau Formación Profesional", badge: "Highest honours" },
      { year: "2023 – 2025", role: "Higher Diploma in Multiplatform App Development", org: "INS Poblenou", badge: "" },
      { year: "2019 – 2021", role: "Baccalaureate in Social Sciences", org: "INS CAR, High Performance Centre", badge: "" },
    ],

    sportTitle: "Elite sport, at the same time",
    sportLead:
      "For more than ten years I've been a water polo goalkeeper in Spain's top league, with Champions League and EuroCup games, alongside my studies and now my work. Many of my professional habits come from there.",
    sport: [
      { h: "Calm with the clock running", p: "A last-minute penalty and a production incident are handled the same way: think clearly and decide." },
      { h: "Consistency", p: "Training at six in the morning for years teaches you that the unglamorous work is what finishes projects." },
      { h: "Team communication", p: "A goalkeeper reads the whole pool and never stops talking. It's the same thing that makes a handover or a review work." },
    ],
    sportLink: "Sports career",

    stackTitle: "Tools",
    stackLead: "What I use day to day, grouped by what it's for.",
    stack: [
      { h: "AI and data", items: ["Python", "LLMs & RAG", "Local LLMs (Ollama)", "n8n", "Agents", "PyTorch", "scikit-learn", "XGBoost", "pandas", "Big Data"] },
      { h: "Languages and backend", items: ["Java", "JavaScript", "TypeScript", "C#", "Kotlin", "SQL", "Bash", "FastAPI", "Flask", "Django", "Node.js", "Spring Boot", "Hibernate"] },
      { h: "Frontend, mobile and games", items: ["React", "React Native", "Angular", "HTML & CSS", "Tailwind", "Bootstrap", "Unity", "Figma"] },
      { h: "Data and infrastructure", items: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Docker", "AWS", "Linux", "VirtualBox", "Git"] },
      { h: "Workplace stack", items: ["Microsoft 365", "Google Workspace", "Zoho", "Veeam", "Bitdefender GravityZone"] },
    ],
  },

  projectsPage: {
    title: "Projects",
    lead:
      "A selection of what I've built: AI platforms, data analytics, web applications and games. Each project has its own page covering what it does, how it's built and the decisions behind it.",
    filters: { all: "All", ai: "AI and data", web: "Web", games: "Games and mobile" },
    featured: "Featured project",
    cols: { project: "Project", type: "Type", stack: "Stack", status: "Status" },
    count: "projects",
    pinned: "Pinned",
    open: "View project",
    empty: "There are no projects in this category.",
  },

  projects: {
    tactiq: {
      name: "TactiQ 360",
      short: "TactiQ 360",
      desc:
        "Multi-club SaaS for football teams: call-ups, tactics board, an offline live match report, automatic stats and PDF reports.",
      tags: ["SaaS", "React", "FastAPI"],
      cat: "web",
      context: "Live",
      kind: "Sports management SaaS",
    },
    ultimus: {
      name: "Ultimus Defensor: BlueSentinel",
      short: "Ultimus Defensor",
      desc:
        "AI-powered BlueTeam platform: MITRE ATT&CK detection, an Isolation Forest + XGBoost cascade and an LLM security assistant grounded in 1,000+ documents.",
      tags: ["AI / ML", "Cybersecurity", "LLM"],
      cat: "ai",
      context: "Master's final project",
      kind: "AI cybersecurity",
    },
    nba: {
      name: "NBA Vision",
      short: "NBA Vision",
      desc:
        "Full-stack NBA analytics lab: quantile-regression player projections, Elo game forecasts and a possession-level simulator. Live on Vercel, bilingual.",
      tags: ["React", "XGBoost", "Simulation"],
      cat: "ai",
      context: "Live",
      kind: "Analytics and forecasting",
    },
    mindflow: {
      name: "MINDFLOW: Brain Puzzle Games",
      short: "MINDFLOW",
      desc:
        "Mobile game published on Google Play: 4 puzzle modes, 1,200 verified levels, fully offline.",
      tags: ["React Native", "TypeScript", "Android"],
      cat: "games",
      context: "Google Play",
      kind: "Mobile game",
    },
    kdd: {
      name: "Intrusion Detection System (KDD'99)",
      short: "KDD'99 Intrusion Detection",
      desc:
        "Machine-learning IDS: hierarchical classification, dataset engineering and analytical dashboards over 5M+ records.",
      tags: ["ML", "Big Data", "Python"],
      cat: "ai",
      context: "Master's project",
      kind: "Machine-learning detection",
    },
    ecommerce: {
      name: "E-commerce platform",
      short: "E-commerce platform",
      desc:
        "Full-stack shop: JWT auth, persistent cart, admin dashboard, Cloudinary images and Redis caching on the hot paths.",
      tags: ["React", "Node.js", "MongoDB"],
      cat: "web",
      context: "Deployed",
      kind: "Online shop",
    },
    pacman: {
      name: "Pacman Remake",
      short: "Pacman",
      desc:
        "The arcade classic rebuilt in Java: custom maps loaded from files, selectable characters and ghost AI.",
      tags: ["Java", "OOP", "Game AI"],
      cat: "games",
      context: "Code on GitHub",
      kind: "Arcade game",
    },
    flappy: {
      name: "Flappy Bird, improved clone",
      short: "Flappy Bird",
      desc:
        "Unity and C#: hand-tuned 2D physics, pooled procedural obstacles and an online leaderboard.",
      tags: ["Unity", "C#", "Physics2D"],
      cat: "games",
      context: "Code on GitHub",
      kind: "Arcade game",
    },
  },

  experience: {
    pageTitle: "Experience",
    pageLead:
      "Consulting and AI inside a company, teaching, product development and elite sport. All at once over the last few years, and each one has made me better at the others.",
    indexTitle: "On this page",
    index: {
      bronto: "Brontobyte Cloud",
      trainer: "Chamber of Commerce",
      sycai: "Sycai Medical",
      sport: "Water polo",
      education: "Education",
    },
    labels: {
      current: "Current",
      highlights: "Responsibilities",
      achievements: "Results",
      topics: "What I teach",
      stack: "Technologies",
      website: "Website",
    },

    bronto: {
      org: "Brontobyte Cloud",
      role: "AI Lead & Coordinator · IT Consultant",
      period: "2026 – present",
      location: "Girona",
      summary:
        "I lead and coordinate the AI department. I build **private AI** solutions for clients and for Brontobyte Cloud itself, and contribute to **IMPLEMAI**, the project that helps companies work with their data in a controlled environment and automate processes.",
      about:
        "Brontobyte Cloud is a European cybersecurity, cloud and data protection provider based in Girona. It works through partners, with infrastructure under European jurisdiction and **ISO/IEC 27001** and **ENS (medium level)** certifications.",
      highlights: [
        "I coordinate the AI department: priorities, roadmap and alignment with the other technical areas.",
        "I design and deploy **private AI** environments for clients: an LLM that queries the company's applications and runs automations.",
        "I build automations with **n8n** on Microsoft 365, Zoho and client cloud applications.",
        "I develop internal AI tools for Brontobyte Cloud's teams.",
      ],
      quote:
        "Brontobyte Cloud keeps growing and we're delighted to welcome Pau Vilar i Estrada, who joins our team as an AI and IT solutions consultant. His background in software development, artificial intelligence and Big Data will add knowledge and capacity across different areas of the company.",
      quoteSource: "Brontobyte Cloud on LinkedIn, translated from Catalan",
      implemai: {
        title: "IMPLEMAI, private AI for companies",
        lead:
          "Brontobyte Cloud's private AI project. Based on what each company needs, we set up an environment with an LLM that queries all of the company's applications and automates processes, without the data ever leaving our data centre.",
        facts: [
          { h: "Our own data centre in Madrid", p: "Dedicated virtual machines on NVIDIA RTX PRO 6000 Blackwell GPUs with 96 GB of VRAM." },
          { h: "An LLM connected to your company", p: "Natural-language questions about your applications, and automations on top of them, orchestrated with n8n." },
          { h: "Cloud and on-premise", p: "Any cloud application integrates through n8n. On-premise applications are assessed case by case." },
          { h: "Your data stays there", p: "We don't train models on it, we don't use it for anything else and we don't sell it." },
        ],
      },
      certsLabel: "Company certifications",
      website: "brontobytecloud.com",
    },

    trainer: {
      org: "Barcelona Chamber of Commerce",
      role: "Agentic AI trainer",
      period: "2026",
      location: "Barcelona",
      summary:
        "I design and deliver training on **agentic AI systems, automation and enterprise AI solutions** for professionals and companies across Catalonia. The courses cover the whole lifecycle: architecture, orchestration, deployment and business impact, always hands-on.",
      topics: [
        "**Agent architecture**: planning, reasoning loops and tool integration.",
        "**Business automation**: end-to-end pipelines on real processes.",
        "**Multi-agent orchestration**: supervisor pattern, parallel agents and handoffs.",
        "**Memory and state**: short-term context, vector memory and retrieval.",
        "**Production**: evaluation, observability and guardrails.",
      ],
    },

    sycai: {
      org: "Sycai Medical",
      role: "Full Stack Developer · 6-month internship",
      period: "2025",
      location: "Barcelona",
      summary:
        "Barcelona startup building AI for radiologists: it helps detect and monitor **precancerous abdominal lesions** on CT and MRI, integrated with hospital **PACS** systems over **DICOM**.",
      achievements: [
        "**Migrated the internal platform** from legacy systems to a modern full-stack architecture.",
        "**Redesigned the AWS databases**, improving query performance and cutting cost.",
        "**Containerised services with Docker** for reproducible cloud deployments.",
        "**Improved the PACS integration**, shortening radiologists' workflow.",
      ],
    },

    sport: {
      title: "Sports career",
      lead:
        "Water polo goalkeeper in the **División de Honor**, Spain's top league, and in Europe's main club competitions.",
      currentBadge: "Current club",
      clubs: [
        {
          name: "Club Natació Catalunya",
          years: "2026 – present",
          current: true,
          p: "Goalkeeper for CN Catalunya at the top of Spanish water polo.",
          comps: ["División de Honor", "Copa del Rey"],
        },
        {
          name: "CN Sant Andreu",
          years: "2023 – 2026",
          current: false,
          p: "Starting goalkeeper for three seasons in the Spanish and European elite.",
          comps: ["División de Honor", "Copa del Rey", "EuroCup"],
        },
        {
          name: "CN Barcelona",
          years: "2019 – 2023",
          current: false,
          p: "Goalkeeper for the most decorated club in Spanish water polo.",
          comps: ["División de Honor", "Copa del Rey", "Champions League", "EuroCup"],
        },
      ],
      lessonsTitle: "What sport has given me",
      lessons: [
        "**Composure under pressure**: a goalkeeper's job is the next shot, never the last one.",
        "**A sustained dual career** for a decade: sport and studies, both full time.",
        "**Champions League minutes** against Europe's best clubs.",
      ],
    },

    education: {
      title: "Education",
      items: [
        {
          h: "Master's in Artificial Intelligence and Big Data",
          org: "Monlau Formación Profesional",
          period: "2025 – 2026",
          badge: "Highest honours",
          p: "Supervised and unsupervised learning, LLMs, agentic systems, production data pipelines and model deployment. Final project: **Ultimus Defensor**, an AI cybersecurity platform.",
        },
        {
          h: "Higher Diploma in Multiplatform App Development (DAM)",
          org: "INS Poblenou",
          period: "2023 – 2025",
          badge: "",
          p: "Software engineering, full-stack development, databases and lifecycle management, always with production-shaped projects.",
        },
        {
          h: "Baccalaureate in Social Sciences",
          org: "INS CAR, High Performance Centre",
          period: "2019 – 2021",
          badge: "",
          p: "A school for national-level elite athletes: six hours of training a day alongside a full academic load.",
        },
      ],
      certificationsTitle: "Certifications",
      certifications: [
        "**Google and Banco Santander**: Artificial Intelligence and Productivity (2024)",
        "**IBM**: Python (2024)",
      ],
      languagesTitle: "Languages",
      languages: [
        { l: "Catalan", v: "Native" },
        { l: "Spanish", v: "Native" },
        { l: "English", v: "B1" },
      ],
    },
  },

  contact: {
    title: "Let's talk",
    lead:
      "Open to **collaborations, training and specific projects** in AI, automation and software. Tell me what you're working on and we'll see how it fits.",
    routesTitle: "Two ways to work together",
    routes: [
      {
        h: "Companies: private AI and IT",
        p: "Private AI environments, n8n automation and IT infrastructure for your company, through Brontobyte Cloud, where I coordinate the AI area.",
        tag: "With Brontobyte Cloud",
      },
      {
        h: "AI training and development",
        p: "If your company or you want to understand AI, learn to use it for something specific or build a custom tool, I can help you directly.",
        tag: "With me",
      },
    ],
    reasonsTitle: "How can I help?",
    reasons: [
      { h: "AI training", p: "Courses and workshops for companies and individuals: from understanding generative AI to agents and automation applied to your case." },
      { h: "A private AI environment", p: "An LLM that works with your company's data without it leaving a controlled environment." },
      { h: "Automate a process", p: "Taking repetitive work between applications off your plate with n8n or agents." },
      { h: "A custom application", p: "A website, a mobile app or an internal tool, end to end." },
      { h: "Just to meet", p: "No specific project yet. A coffee or a call is fine too." },
    ],
    formTitle: "Tell me about your project",
    formNote: "Sending opens your email client with the message ready to go.",
    form: {
      name: "Name",
      company: "Company (optional)",
      topic: "Topic",
      topics: ["AI training", "Private AI", "Automation", "Custom software", "Just to meet"],
      message: "Message",
      messagePlaceholder: "What you need, rough timelines and any useful context.",
      submit: "Prepare email",
      subject: "Project",
      required: "Add your name and a message.",
    },
    channelsTitle: "Direct contact",
    channels: [
      { k: "email", h: "Email", cta: "pvilardev@gmail.com" },
      { k: "linkedin", h: "LinkedIn", cta: "linkedin.com/in/pau-vilar" },
      { k: "github", h: "GitHub", cta: "github.com/PauVilarEstrada" },
      { k: "cv", h: "CV as PDF", cta: "Download" },
    ],
    basedIn: "Based in Catalonia, remote or on site.",
  },
};

export type Dict = typeof en;
