export const identity = {
  name: "Jeries Shomaly",
  title: "Full Stack Developer",
  subtitle:
    "I build AI platforms and the data systems behind them, from streaming backends to the interfaces people use every day.",
  about:
    "I'm a Full Stack Developer with about 2.5 years of production experience, including my internship. Most of my recent work is on GENIE, an AI-agent platform, where I built its data-protection layer, the trainer feedback loop, and streamed answers end to end. Before that I worked on the backend of a high-volume ad-tech data platform. I care about systems that behave predictably, and I write the tests to prove it.",
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
    skills: ["RAG", "LlamaIndex", "OpenAI APIs", "Self-hosted LLMs (vLLM)", "Vector search", "AI agents", "LLM guardrails"],
  },
  {
    id: "infra",
    label: "infra & tooling",
    cvLabel: "Infra & Tooling",
    skills: ["Git", "AWS S3", "AWS ECS", "Docker", "PM2", "Scheduled jobs", "Vercel", "pytest"],
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
      "Led Genie Shield, the outbound data-protection layer of an AI-agent platform: detectors, policy engine, a human approval queue and the admin console, covered by 181 unit tests.",
      "Built the Trainer Loop across Flask and Next.js/Payload: negative feedback becomes an LLM-diagnosed, editable fix that ships as a Q&A entry or a new prompt version.",
      "Built streamed answers end to end with a typed Server-Sent Events contract, from the Flask API through the Next.js BFF to the embeddable chat widget.",
      "Built tenant and agent analytics (quality, engagement, security, cost) and a web-search fallback with per-tenant confidence thresholds.",
      "Redesigned the metrics precompute in a nightly ad-tech pipeline so each record group is processed exactly once, not re-computed in every batch it touched.",
      "Fixed a silent out-of-memory failure in a nightly job (~10× lower peak memory) and added a backfill to repair the data it had skipped.",
      "Built an async export system (background job → progress tracking → S3 download) for large datasets.",
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

export type FlowStep = { label: string; mine?: boolean };

export type Story = {
  title: string;
  problem: string;
  solution: string;
  result: string;
};

// Public-safe by design: no client names, colleague names, prompts, hostnames or real volumes.
export type CaseStudy = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  role: string;
  period: string;
  tech: string[];
  flow: FlowStep[];
  stories: Story[];
  alsoBuilt: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "genie",
    name: "GENIE",
    tagline: "Multi-tenant AI-agent platform",
    summary:
      "Organizations get topic-specific AI agents (HR, finance, support and more), each with its own knowledge base, prompt versions and permissions. Employees ask questions in a chat app, an embeddable website widget or WhatsApp. Admins and trainers manage the agents from a console.",
    role: "Full-stack developer, across the Python backend and the Next.js/Payload app",
    period: "Nov 2025 — Present",
    tech: ["Python", "Flask", "LlamaIndex", "Milvus", "OpenAI", "vLLM", "Next.js", "Payload CMS", "MongoDB", "SSE"],
    flow: [
      { label: "Chat · widget · WhatsApp" },
      { label: "Next.js BFF + streaming", mine: true },
      { label: "Agent router" },
      { label: "Knowledge retrieval" },
      { label: "Genie Shield", mine: true },
      { label: "Web-search fallback", mine: true },
      { label: "LLM (cloud or self-hosted)" },
      { label: "Analytics · Trainer loop", mine: true },
    ],
    stories: [
      {
        title: "Genie Shield: nothing sensitive leaves the organization",
        problem:
          "When the knowledge base had no answer, the user's question was sent as-is to an external web search, private details included.",
        solution:
          "Before anything leaves, the question is rewritten without private details and scanned for sensitive data. Each query is then allowed, blocked, or held for an admin to approve.",
        result:
          "Sensitive data stays inside the organization, and users see exactly what was sent out. Covered by 181 unit tests.",
      },
      {
        title: "Trainer Loop: from 👎 to a shipped fix",
        problem:
          "Negative feedback piled up with no path to actually improving the agent that produced the bad answer.",
        solution:
          "Each 👎 becomes a review item. An LLM analyzer works out whether the knowledge base was missing an answer or the prompt was at fault, and drafts a fix. The trainer edits it and approves, and approval goes out through the existing Q&A and prompt-version APIs into a learning log. Conversation text reaches the model only in transit and is never stored in analytics.",
        result:
          "I designed the plan and built it across both stacks, so one review screen covers the whole path from complaint to deployed fix.",
      },
      {
        title: "Streamed answers, end to end",
        problem:
          "Without streaming, nothing appeared until routing, retrieval and generation had all finished.",
        solution:
          "A typed Server-Sent Events contract: routing, sources, tokens, suggestions, then done or error, with keepalives and cancellation. I implemented it in the Flask API, the Next.js BFF (including the auth-token exchange) and the embeddable widget.",
        result:
          "Sources and tokens appear as they're produced, and the chat app and the widget both consume one documented contract.",
      },
    ],
    alsoBuilt: [
      "Tenant and agent analytics (quality, engagement, security, cost) with period-over-period deltas",
      "Customer-success hub that drafts replies with a cited source for each answer",
      "Chat app redesign: mobile, Hebrew RTL and English, dark mode, search, favourites",
      "Follow-up question resolution and server-side conversation memory",
    ],
  },
  {
    id: "adops",
    name: "Ad-Ops Analytics Platform",
    tagline: "Data pipeline and dashboard for a video ad network",
    summary:
      "Tracks ads.txt compliance and daily ad delivery across hundreds of thousands of publisher-advertiser combinations. Nightly jobs ingest reports from S3, crawl ads.txt files and precompute metrics for a large, filterable dashboard with bulk edits and exports.",
    role: "One of two main backend developers",
    period: "Jul 2025 — Aug 2026",
    tech: ["Node.js", "Express", "MySQL", "Sequelize", "AWS S3", "Docker", "AWS ECS", "React"],
    flow: [
      { label: "Daily reports · ads.txt crawler · CSV" },
      { label: "Ingestion jobs", mine: true },
      { label: "MySQL" },
      { label: "Aggregation & precompute", mine: true },
      { label: "REST API" },
      { label: "Dashboard · async exports", mine: true },
    ],
    stories: [
      {
        title: "Process each group once, not once per batch",
        problem:
          "The sort-order metrics were computed batch by batch. Rows that belonged together were often split across batches, so they were fetched and recomputed again and again. That made the nightly run take hours.",
        solution:
          "One upfront grouping query. Advertiser metadata is cached once and reused across all six reporting windows, and each group is processed exactly once per window. The results land in a precomputed table that the dashboard sorts and paginates from directly.",
        result:
          "The redundant per-batch work is gone, and dashboard sorting reads from a single precomputed table instead of being computed per request.",
      },
      {
        title: "The nightly job that failed silently",
        problem:
          "A nightly job ran out of memory partway through and stopped without an error. Long-tail publishers quietly went missing rows for advertisers added weeks earlier.",
        solution:
          "Raw queries that select only the needed columns, unused associations dropped, batches of 500, and a yield to the event loop between batches so garbage collection can run. I also added a backfill job to repair the rows that had been skipped.",
        result: "About 10× lower peak memory, a sweep that completes, and the missing data restored.",
      },
    ],
    alsoBuilt: [
      "Async export system: background job → progress tracking → S3 download, replacing exports that ran out of memory",
      "'Not serving' metric that flags combinations that should be earning but aren't",
      "CSV import that validates first and returns the failed rows instead of aborting",
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
