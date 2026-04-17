// ─── Resume Data ──────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Update this file to reflect any changes to the resume.

export const RESUME = {
  name: "Divyesh Odedara",
  role: "Backend Software Engineer",
  email: "divyeshvisana123@gmail.com",
  phone: "+91 81601 90702",
  linkedin: "https://www.linkedin.com/in/divyesh-odedara/",
  github: "https://github.com/divyeshodedara",
  leetcode: "https://leetcode.com/u/DIVYESH_ODEDARA/",

  summary:
    "Computer Science undergraduate passionate about backend engineering. " +
    "Hands-on experience building production-ready systems using Node.js, " +
    "Express, MongoDB, Redis, and Socket.IO. Skilled at designing secure " +
    "REST APIs, real-time architectures, and scalable data pipelines.",

  education: {
    institution: "Nirma University",
    degree: "B.Tech Computer Science & Engineering",
    cgpa: 8.78,
    period: "2023 – 2027",
  },

  skills: {
    languages: ["JavaScript", "C++", "C", "Python", "Java", "SQL"],
    backend: ["Node.js", "Express.js", "Socket.IO", "REST APIs", "JWT", "Mongoose"],
    frontend: ["React.js", "TanStack Query", "Tailwind CSS"],
    databases: ["MongoDB", "Redis"],
    devops: ["Docker", "Cloudflare Workers", "Cloudflare Pages", "Vercel"],
  },

  techStack: [
    "Node.js",
    "Express.js",
    "Socket.IO",
    "Redis",
    "MongoDB",
    "Docker",
    "Cloudflare",
    "React.js",
    "TanStack Query",
    "JWT",
    "Multer",
    "Sharp",
    "n8n",
    "Mongoose",
  ],

  competitive: {
    leetcode: {
      solved: 450,
      rating: 1756,
      percentile: "Top 10%",
      globalRank: 3018,
      contest: "Weekly Contest 471",
    },
    codechef: {
      maxRating: 1545,
    },
  },

  projects: [
    {
      id: "socially",
      name: "Socially",
      tagline: "Real-time social platform",
      status: "production",
      description:
        "Full-stack social platform with real-time bidirectional messaging via Socket.IO, " +
        "Redis-backed authentication caching to eliminate redundant DB lookups, " +
        "layered security with JWT HttpOnly cookies, bcrypt (cost 12), and 8 granular " +
        "rate limiters. Image pipeline via Multer → Sharp → Cloudinary.",
      stack: [
        "Node.js",
        "Socket.IO",
        "Redis",
        "MongoDB",
        "JWT",
        "bcrypt",
        "Docker",
        "Cloudinary",
        "TanStack Query v5",
        "Multer",
        "Sharp",
      ],
      github: "https://github.com/divyeshodedara/socially",
      architecture: {
        nodes: ["Client", "Node.js + Socket.IO", "Redis Cache", "MongoDB"],
        flows: [
          { from: 0, to: 1, label: "WebSocket", bidirectional: true, speed: "fast" },
          { from: 1, to: 2, label: "cache-aside", bidirectional: false, speed: "medium" },
          { from: 2, to: 3, label: "cache miss → persist", bidirectional: false, speed: "slow" },
        ],
      },
    },
    {
      id: "subman",
      name: "Subscription Manager",
      tagline: "Automated workflow system",
      status: "production",
      description:
        "Robust subscription management system with real-world business logic, " +
        "normalized MongoDB data modeling, and automated lifecycle workflows via n8n. " +
        "Expiry reminders, renewal tracking, and audit trails built on Express.js.",
      stack: ["Node.js", "Express.js", "n8n", "MongoDB"],
      github: "https://github.com/divyeshodedara/subscription-manager",
      timeline: [
        { step: "HTTP Request", detail: "Express.js router & middleware chain" },
        { step: "Auth & Validation", detail: "JWT verification + Zod schema guards" },
        { step: "Database Layer", detail: "Mongoose ODM + normalized schema" },
        { step: "n8n Automation", detail: "Webhook trigger → email workflow" },
        { step: "Response", detail: "Structured JSON payload + audit log" },
      ],
    },
  ],
} as const;
