export const identity = {
  name: "Jeries Shomaly",
  title: "Full Stack Developer",
  subtitle:
    "I build AI platforms and the data systems behind them, from streaming backends to the interfaces people use every day.",
  about:
    "I'm a Full Stack Developer with about 2.5 years of production experience, including my internship. Most of my recent work is on GENIE, an AI-agent platform, where I've built security, feedback and streaming features across the whole stack. Before that I worked on the backend of an ad-tech data platform. I care about systems that behave predictably, and I write the tests to prove it.",
  email: "jeries.shomaly.98@hotmail.com",
  linkedin: "https://www.linkedin.com/in/jeries-shomaly-a28b93235",
  // personal account only. The work GitHub account must never be linked here.
  github: "https://github.com/jeriesshomaly8" as string | null,
  languages: [
    { name: "Hebrew", level: "native" },
    { name: "Arabic", level: "native" },
    { name: "English", level: "professional" },
  ],
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeriesshomaly.com";

// Each stat must be traceable to a commit or a test count, because interviewers will ask.
export const heroStats = [
  { value: 2.5, decimals: 1, suffix: "+", label: "years in production" },
  { value: 181, decimals: 0, label: "tests on the security layer I built" },
  { value: 10, decimals: 0, prefix: "~", suffix: "×", label: "lower peak memory, nightly job" },
];

export const primaryStack = ["TypeScript", "React", "Next.js", "Node.js", "Python", "Flask"];

export const skillGroups = [
  {
    id: "frontend",
    label: "frontend",
    cvLabel: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Payload CMS", "Angular", "Tailwind CSS", "RTL / i18n"],
  },
  {
    id: "backend",
    label: "backend",
    cvLabel: "Backend",
    skills: ["Node.js", "Express.js", "Python", "Flask", "REST APIs", "Server-Sent Events", "Swagger / OpenAPI", "C# / .NET"],
  },
  {
    id: "databases",
    label: "databases",
    cvLabel: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Sequelize", "Milvus", "Supabase"],
  },
  {
    id: "ai",
    label: "ai & retrieval",
    cvLabel: "AI & Retrieval",
    skills: ["RAG", "LlamaIndex", "OpenAI APIs", "Vector search", "AI agents", "LLM guardrails"],
  },
  {
    id: "infra",
    label: "infra & tooling",
    cvLabel: "Infra & Tooling",
    skills: ["Git", "AWS S3", "Docker", "PM2", "Scheduled jobs", "Vercel", "pytest"],
  },
  {
    id: "games",
    label: "game dev",
    cvLabel: "Game Dev",
    skills: ["Unity", "C#"],
  },
];

export const experience = [
  {
    role: "Software Developer",
    company: "Comrax LTD",
    period: "Jan 2025 — Present",
    bullets: [
      "Led the design and build of a data-protection layer for an AI-agent platform, including an approval flow and an admin console, backed by 181 unit tests.",
      "Built a feedback-review workflow across the Python backend and the Next.js app that turns negative user feedback into approved fixes.",
      "Built real-time streaming of AI answers from the backend to the web app and an embeddable chat widget.",
      "Built analytics dashboards for admins, and redesigned the chat app for mobile, Hebrew RTL and dark mode.",
      "Redesigned a slow step in a nightly data pipeline so related data is processed once instead of repeatedly.",
      "Fixed a nightly job that was silently running out of memory (~10× lower peak memory) and repaired the data it had missed.",
      "Built a background export system for large datasets.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Comrax LTD",
    period: "Oct 2023 — Jun 2024",
    bullets: [
      "Developed frontend features for a computerized examination platform used by CET.",
      "Worked with relational and NoSQL databases: PostgreSQL, MySQL, MongoDB Atlas.",
      "Built game functionality and statistics dashboards with Unity, C#, React, and Node.js.",
    ],
  },
];

export const education = {
  degree: "B.Sc. in Information Systems",
  school: "University of Haifa",
  period: "2020 — 2024",
  coursework:
    "Data Structures & Algorithms, Operating Systems, Computer Networks, C, Java, Python, OOP, Software Engineering, Software Architecture, Database Systems, Web Development",
};

// Public-safe by design: what I built and the outcome, never how the products work internally,
// who the clients are, or business details.
export type Story = {
  title: string;
  did: string;
  result: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  role: string;
  period: string;
  tech: string[];
  stories: Story[];
  alsoBuilt: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "genie",
    name: "GENIE",
    tagline: "AI-agent platform",
    summary:
      "A multi-tenant AI assistant platform. I work across both halves of it: the Python backend and the Next.js web app.",
    role: "Full-stack developer",
    period: "Nov 2025 — Present",
    tech: ["Python", "Flask", "LlamaIndex", "OpenAI", "Next.js", "Payload CMS", "MongoDB", "SSE"],
    stories: [
      {
        title: "Data-protection layer",
        did: "Led the design and build of a security layer that checks AI requests before anything leaves the system. It includes an approval flow and an admin console.",
        result: "Backed by 181 unit tests.",
      },
      {
        title: "Trainer feedback loop",
        did: "Built a review workflow that turns negative user feedback into a fix an admin can edit and approve. I wrote the plan and built both the backend and the UI.",
        result: "Feedback goes from a complaint to a shipped fix on one screen.",
      },
      {
        title: "Streamed answers",
        did: "Built real-time streaming of AI answers from the backend through to the web app and the embeddable chat widget.",
        result: "Answers appear as they're generated, and every client uses one shared contract.",
      },
    ],
    alsoBuilt: [
      "Analytics dashboards for admins",
      "Chat app redesign: mobile, Hebrew RTL and English, dark mode",
      "Tooling that helps the support team draft replies",
      "Conversation memory, so follow-up questions work",
    ],
  },
  {
    id: "adtech",
    name: "Ad-Tech Data Platform",
    tagline: "Data pipeline and analytics dashboard",
    summary:
      "A data platform with nightly processing jobs and a large analytics dashboard. I was one of its two main backend developers.",
    role: "Backend developer",
    period: "Jul 2025 — Aug 2026",
    tech: ["Node.js", "Express", "MySQL", "Sequelize", "AWS S3", "Docker", "React"],
    stories: [
      {
        title: "Faster nightly processing",
        did: "Redesigned a slow step in the nightly pipeline so related data is processed once, not over and over.",
        result: "A large amount of redundant work removed from every nightly run.",
      },
      {
        title: "A job that failed silently",
        did: "Found and fixed a nightly job that was running out of memory without reporting an error, and added a job to repair the data it had missed.",
        result: "About 10× lower peak memory, and the missing data restored.",
      },
    ],
    alsoBuilt: [
      "Background export system for large datasets",
      "New dashboard metrics",
      "CSV import that checks every row and reports the ones that fail",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  url?: string;
  contribution?: string;
};

export const professionalProjects: Project[] = [
  {
    id: "itest",
    name: "iTest",
    tagline: "Computerized examination platform — CET",
    description:
      "A computerized examination platform used by the Center for Educational Technology (CET).",
    tech: ["React", "Tailwind CSS"],
    url: "https://itest.cet.ac.il/",
    contribution: "Frontend development (internship)",
  },
  {
    id: "amit-bagan",
    name: "Amit BaGan",
    tagline: "Educational game + stats dashboard",
    description:
      "A Unity-based game paired with a React dashboard and Node.js backend for displaying game statistics.",
    tech: ["Unity", "C#", "React", "Node.js"],
    contribution: "Game logic, dashboard, and backend",
  },
  {
    id: "igm",
    name: "Teachers' Organization",
    tagline: "Organization website — ארגון המורים",
    description: "The Israeli Teachers' Organization website.",
    tech: ["JavaScript", "Bootstrap", "Vite"],
    url: "https://www.igm.org.il/site/pg/igm_home",
    contribution: "Main developer",
  },
  {
    id: "renoweld",
    name: "RenoWeld",
    tagline: "Trilingual business site (he/ar/en)",
    description:
      "A trilingual, fully RTL-aware business website for a renovation and welding professional: services, completed projects, and contact.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://renoweld-site.vercel.app/",
    contribution: "Designed and built solo, end-to-end",
  },
];

export const sideProjects: Project[] = [
  {
    id: "meos",
    name: "MeOS",
    tagline: "AI personal-memory app · in development",
    description:
      "Write things down in plain language and an AI pass turns them into structured people, dates and reminders. Nothing is saved until you approve it. Row-level security keeps every user's data private, and push notifications deliver the reminders.",
    tech: ["Next.js", "TypeScript", "Supabase", "Gemini", "Vitest"],
    url: "https://github.com/jeriesshomaly8/meos",
  },
];

export const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "contact", label: "Contact" },
];
