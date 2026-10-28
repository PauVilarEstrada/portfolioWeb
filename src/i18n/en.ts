import { pagesEn } from "./pages.en";

export const en = {
  pages: pagesEn,
  meta: {
    title: "Pau Vilar",
    description:
      "Pau Vilar, AI lead and coordinator and IT consultant at Brontobyte Cloud. Private AI for companies, n8n automation, AI training and custom software.",
    switchLabel: "Change language",
  },

  nav: {
    play: "Game",
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

  intro: {
    save: "PAU SAVES IT!",
    label: "Pau Vilar, water polo goalkeeper and AI lead",
  },

  notFound: {
    title: "Offside",
    lead: "This page doesn't exist or has moved. While you're here, take a few penalties before heading back.",
    home: "Back to home",
    projects: "See projects",
  },

  play: {
    title: "Game",
    lead:
      "A corner to play in. Swim through my projects and my water polo career, take penalties against Pau, build an automation like the ones I make at Brontobyte Cloud or play with the site's animations.",
    count: "games",
    index: { swim: "Pool of projects", penalties: "Penalties", puzzle: "Automation puzzle", lab: "PV playground" },
    swim: {
      title: "Pool of projects",
      lead:
        "A match against three defenders. Reach each mystery buoy with the ball to find out what it hides (a project, a club or a stage of what I do) and, once you have them all, score in the goal on the right.",
      start: "Start the match",
      controls: "Arrow keys or WASD to swim and Space to shoot. On a phone, press and drag towards where you want to go.",
      found: "found",
      panelTitle: "What you've found",
      panelEmpty:
        "Swim with the ball to a buoy marked “?” to see what's there. If a defender touches you, they steal the ball: get it back and carry on.",
      open: "See project",
      more: "See experience",
      newTab: "opens in a new tab",
      masterLabel: "Master's in AI",
      kinds: { project: "Project", club: "Water polo", work: "Work", study: "Education" },
      hints: {
        needBall: "You need the ball to open this buoy.",
        stolen: "Ball stolen! Get it back.",
        notYet: "Find every buoy first.",
        tooFar: "Get closer to the goal to shoot.",
        goalReady: "You've found them all! Now score in the goal on the right.",
      },
      shoot: "Shoot",
      goal: "GOOOAL!",
      goalText: "You've found my projects, my water polo career and what I do at Brontobyte Cloud. Thanks for playing.",
      again: "Play again",
      time: "Time",
      best: "Best",
      soundOn: "Turn sound on",
      soundOff: "Mute",
      fallback: "Your browser can't show the 3D game.",
    },
    penalties: {
      title: "Penalties against Pau",
      lead: "Five shots against the keeper. Your best score is kept in this browser.",
    },
    puzzle: {
      title: "Automation puzzle",
      lead:
        "Build each automation by picking the pieces in order: what triggers it, where the data comes from, what orchestrates it, what decides, what understands it and what it does at the end. The pieces are mixed up and some are traps. They are examples of the kind of work I do with n8n and private AI.",
      types: {
        trigger: "Trigger",
        source: "Data",
        flow: "Orchestration",
        logic: "Logic",
        ai: "AI",
        action: "Action",
        notify: "Alert",
      },
      nodes: {
        cron: "Every morning",
        mailIn: "An email arrives",
        form: "Web form",
        webhook: "Webhook",
        gmail: "Gmail",
        outlook: "Outlook (M365)",
        zoho: "Zoho CRM",
        veeam: "Veeam",
        drive: "Google Drive",
        bitdefender: "Bitdefender",
        n8n: "n8n",
        ifNode: "Condition (IF)",
        filter: "Filter",
        approve: "Human approval",
        llm: "Private LLM",
        rag: "Knowledge base",
        crm: "Update Zoho CRM",
        ticket: "Open a ticket",
        save: "Save to Drive",
        reply: "Draft a reply",
        teams: "Teams alert",
        email: "Email alert",
      },
      scenario: "Challenge",
      of: "of",
      next: "Next challenge",
      restart: "Start again",
      wrong: "That piece doesn't go there. Check which kind of piece comes next.",
      done: "Automation built!",
      mistakes: "mistakes",
      allDone:
        "You've built all six. That's how I work at Brontobyte Cloud: n8n connects the company's apps and a private LLM understands their data, without it leaving the data centre.",
      scenarios: [
        {
          goal: "Every morning, a summary of customer emails in Teams.",
          path: ["cron", "gmail", "n8n", "llm", "teams"],
          explain: "First thing in the morning, n8n collects the new emails, the private LLM summarises them and the team gets the summary in Teams.",
        },
        {
          goal: "Score every new CRM lead and only flag the ones worth chasing.",
          path: ["webhook", "zoho", "n8n", "llm", "ifNode", "teams"],
          explain: "Zoho tells n8n about each new lead, the LLM scores it and the condition only lets the good ones through to the Teams channel.",
        },
        {
          goal: "Check the backups every morning and open a ticket if something failed.",
          path: ["cron", "veeam", "n8n", "filter", "llm", "ticket"],
          explain: "n8n reads the Veeam jobs, keeps the failed ones, the LLM explains the likely cause and a ticket is opened with everything.",
        },
        {
          goal: "File the documents sent through the web form in Drive and the CRM.",
          path: ["form", "n8n", "llm", "save", "crm", "email"],
          explain: "The LLM reads each document and extracts the data, n8n files it in Drive, updates the customer record and confirms by email.",
        },
        {
          goal: "Answer customers from the company's documentation, checked by a person.",
          path: ["mailIn", "outlook", "n8n", "rag", "llm", "approve", "reply"],
          explain: "When a question arrives, n8n searches the knowledge base, the LLM drafts the answer and a person approves it before it goes out.",
        },
        {
          goal: "Spot threats on the computers, explain them and alert the engineer on call.",
          path: ["webhook", "bitdefender", "n8n", "ifNode", "llm", "ticket", "email"],
          explain: "Bitdefender sends the incident, the condition drops the minor ones, the LLM explains it plainly, a ticket is opened and the engineer is alerted.",
        },
      ],
    },
    lab: {
      title: "PV playground",
      lead: "The site's animations, to play with: move the pointer over PV, blow it up, or watch the intro and the page curtain again.",
      explode: "Blow up PV",
      intro: "Replay the intro",
      curtain: "Show the curtain",
    },
  },

  footer: {
    playTitle: "Game",
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
    game: {
      title: "Take a penalty against Pau",
      hint: "Click or tap inside the goal to shoot. Keyboard: arrows to aim, Enter to shoot.",
      label: "Water polo penalty mini-game. Pau Vilar is in goal.",
      goal: "Goal!",
      save: "Saved by Pau!",
      miss: "Wide",
      goals: "Goals",
      saves: "Saves",
      shot: "Shot",
      of: "of",
      best: "Best",
      again: "Another round",
      resultWin: "You beat Pau!",
      resultLose: "Pau wins. Another round?",
      resultDraw: "It's a draw.",
    },

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
