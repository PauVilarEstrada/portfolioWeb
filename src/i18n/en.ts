import { pagesEn } from "./pages.en";

export const en = {
  pages: pagesEn,
  meta: {
    title: "Pau Vilar — Full Stack & AI Engineer",
    description:
      "Portfolio of Pau Vilar — full-stack developer and AI & Big Data engineer. AI platforms, data pipelines, web apps and a game live on Google Play. Also a professional water polo goalkeeper in Spain's División de Honor.",
    switchLabel: "Change language",
  },

  nav: {
    home: "Home",
    work: "Work",
    experience: "Experience",
    contact: "Contact",
    skip: "Skip to content",
    hint: "hover or tap to navigate",
  },

  home: {
    name: "Pau Vilar i Estrada",
    roles: [
      "Full Stack Developer",
      "AI & Big Data Engineer",
      "Machine Learning Engineer",
      "AI Educator & Trainer",
    ],
    tagline:
      "I'm a developer from Barcelona, and what I enjoy most is watching something I built end up in somebody's hands — **AI systems**, **data pipelines**, **web platforms**, and a **game that's live on Google Play**. Ten years in goal as an elite water polo keeper taught me the rest: keep turning up, keep iterating, and stay calm when it actually counts.",
    stats: [
      { n: "9", l: "Projects shipped" },
      { n: "20+", l: "Technologies" },
      { n: "3", l: "Products live" },
      { n: "MSc", l: "AI & Big Data" },
    ],
    ctaWork: "View my work",
    ctaContact: "Get in touch",
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

    dualTitle: ["A dual", "career"],
    dualLead:
      "For ten years I have trained twice a day as an elite goalkeeper while studying software full time. Very few people get to build both habits at once — and it shows in how I work.",
    dual: [
      {
        h: "Calm when it counts",
        p: "A penalty in the last minute gives you no rehearsal. Neither does a production incident at 6pm on a Friday. I have spent a decade learning to think clearly with the clock running.",
      },
      {
        h: "Consistency beats motivation",
        p: "Six in the morning, every morning, for years. Shipping software is the same discipline: the unglamorous, repeated work is what actually gets a project finished.",
      },
      {
        h: "Built for a team",
        p: "A goalkeeper reads the whole pool and talks non-stop. That is the same instinct that makes code reviews, stand-ups and handovers work instead of being a formality.",
      },
      {
        h: "Feedback without ego",
        p: "In sport you get corrected every single day: you adapt or you sit on the bench. I bring exactly that attitude to a review comment.",
      },
    ],
    careerTitle: ["Career", "& education"],
    careerLink: "Full profile →",
    careerNowLabel: "Right now",
    careerExpLabel: "Experience",
    careerEduLabel: "Education",
    careerNow: [
      {
        role: "Goalkeeper · División de Honor",
        org: "Club Natació Catalunya",
        meta: "2026 – Present",
        note: "Spain's top league and the Copa del Rey.",
      },
      {
        role: "AI Trainer — Agentic Systems",
        org: "Cambra de Comerç de Barcelona",
        meta: "2026",
        note: "Training companies on agentic AI and automation.",
      },
    ],
    careerExp: [
      { year: "2025", role: "Junior Full Stack Developer", org: "Sycai Medical · Internship" },
      { year: "2023 – 2026", role: "Goalkeeper", org: "CN Sant Andreu · División de Honor & EuroCup" },
      { year: "2019 – 2023", role: "Goalkeeper", org: "CN Barcelona · Champions League" },
    ],
    careerEdu: [
      { year: "2025 – 2026", role: "Master's in AI & Big Data", org: "Monlau Formación Profesional", badge: "Matrícula de Honor" },
      { year: "2023 – 2025", role: "Multiplatform App Development (DAM)", org: "INS Poblenou", badge: "" },
      { year: "2019 – 2021", role: "Baccalaureate · Social Sciences", org: "INS CAR — High-Performance Centre", badge: "" },
    ],

    techTitle: ["Tech", "Stack"],
    techSubtitle: "What I reach for, day to day",

    focusTitle: ["What I", "do"],
    focus: [
      {
        icon: "🧠",
        h: "AI & Machine Learning",
        p: "Anomaly detection, gradient boosting, quantile regression, LLM assistants. I care less about the leaderboard score than about a model you can trust in production — so mine ship with their uncertainty attached, never as a pretty notebook.",
      },
      {
        icon: "⚙️",
        h: "Full-stack engineering",
        p: "React and TypeScript up front, FastAPI, Node or Spring behind it, PostgreSQL and Redis underneath and Docker around the whole thing. I like owning a feature end to end, from the button to the query plan.",
      },
      {
        icon: "📊",
        h: "Data engineering",
        p: "Ingest, clean, cache, serve. It is the least glamorous half of any AI project and usually the half that decides whether it works — so I build pipelines that survive a real production day, not just a demo.",
      },
      {
        icon: "📱",
        h: "Mobile & games",
        p: "React Native and Unity. MINDFLOW is on Google Play with four modes and 1,200 hand-verified levels, fully offline — the most useful lesson in polish I have had, because players notice everything.",
      },
    ],

    cta: {
      eyebrow: "Let's work together",
      title: "Got a project in mind?",
      body:
        "I'm looking for **junior roles, internships and collaborations** in software development, AI engineering and data analysis. If you're building something and think I could help, tell me about it — I read everything and I answer quickly.",
      cv: "Download CV",
    },
  },

  projectsPage: {
    title: ["My", "Projects"],
    subtitle: "Nine things I have built, from AI platforms to arcade games. Each one has its own page with the story behind it — what it does, how it works and what I learned making it. Have a look around.",
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
      "Engineering, teaching and elite sport, all running at once for the past few years. It sounds like a lot, and it is — but each one has made me better at the other two.",

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
      "Hi, I'm **Pau Vilar** — a developer who likes building things that are solid, data-driven and, above all, actually finished. Thanks for making it this far down the page.",
    paragraphs: [
      "I hold a **Higher Diploma in Multiplatform Application Development (DAM)** and a **Master's in Artificial Intelligence & Big Data**, which I finished with **Matrícula de Honor**. What I care about is **AI-driven products**, **agentic systems** and **data analysis** — machine learning that ends up in front of a real user rather than in a notebook nobody opens again.",
      "Alongside all that I'm a **professional water polo goalkeeper**, this season with **Club Natació Catalunya** in Spain's **División de Honor** and the **Copa del Rey**. Ten years of training at six in the morning before class is probably why deadlines don't rattle me much.",
      "I'm open to **junior roles, internships and collaborations** in software development, AI engineering and data analysis. If any of this sounds like a fit, drop me a line — even if it's just to say hello or ask what something on this site does. I always reply.",
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
