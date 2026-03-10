import { Experience, GitHubActivity, Project, Skill } from "@/types";

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory, Stripe payments, and admin dashboard.",
    longDescription:
      "Built a scalable e-commerce solution handling thousands of concurrent users. Features include real-time inventory tracking, secure payment processing via Stripe, an admin dashboard with analytics, and a recommendation engine powered by collaborative filtering.",
    features: [
      "Real-time inventory management",
      "Stripe payment integration",
      "Admin analytics dashboard",
      "Product recommendation engine",
      "Order tracking system",
      "Multi-language support",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Redis",
      "Docker",
    ],
    architecture:
      "Microservices architecture with API gateway, separate services for auth, products, orders, and payments. Uses Redis for caching and WebSockets for real-time updates.",
    githubClientUrl: "https://github.com/asif/ecommerce-client",
    githubServerUrl: "https://github.com/asif/ecommerce-server",
    liveUrl: "https://ecommerce-demo.vercel.app",
    image: "/placeholder.svg",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "devops-dashboard",
    title: "DevOps Dashboard",
    description:
      "Real-time monitoring dashboard for microservices with alerting and log aggregation.",
    longDescription:
      "A comprehensive DevOps monitoring solution that provides real-time visibility into microservice health, performance metrics, and log aggregation. Includes customizable alerting rules and incident management workflows.",
    features: [
      "Real-time service health monitoring",
      "Custom alerting rules",
      "Log aggregation and search",
      "Performance metrics visualization",
      "Incident management",
      "Team collaboration tools",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Express",
      "MongoDB",
      "Docker",
      "WebSocket",
      "D3.js",
    ],
    architecture:
      "Event-driven architecture using message queues. Frontend uses SSR for fast initial load. Backend services communicate via Redis pub/sub for real-time updates.",
    githubClientUrl: "https://github.com/asif/devops-client",
    githubServerUrl: "https://github.com/asif/devops-server",
    liveUrl: "https://devops-dash.vercel.app",
    image: "/placeholder.svg",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "ai-content-studio",
    title: "AI Content Studio",
    description:
      "AI-powered content creation platform with GPT integration and collaborative editing.",
    longDescription:
      "An intelligent content creation platform that leverages GPT models for assisted writing, image generation, and content optimization. Features real-time collaboration, version history, and SEO analysis tools.",
    features: [
      "AI-assisted writing with GPT",
      "Real-time collaborative editing",
      "SEO analysis and optimization",
      "Content scheduling and publishing",
      "Version history and rollback",
      "Multi-format export",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "OpenAI API",
      "Socket.io",
      "AWS S3",
    ],
    architecture:
      "Monolithic backend with modular service layer. Uses WebSockets for real-time collaboration and queues for async AI processing. Content stored in PostgreSQL with S3 for media.",
    githubClientUrl: "https://github.com/asif/ai-studio-client",
    githubServerUrl: "https://github.com/asif/ai-studio-server",
    liveUrl: "https://ai-studio.vercel.app",
    image: "/placeholder.svg",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
];

export const skills: Skill[] = [
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "TypeScript", icon: "🔷", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Express", icon: "⚡", category: "backend" },
  { name: "Prisma", icon: "🔺", category: "backend" },
  { name: "MongoDB / PostgreSQL", icon: "🗄️", category: "backend" },
  { name: "Git", icon: "🔀", category: "tools" },
  { name: "Docker", icon: "🐳", category: "tools" },
  { name: "Linux", icon: "🐧", category: "tools" },
  { name: "REST APIs", icon: "🔌", category: "tools" },
];

export const experiences: Experience[] = [
  {
    id: "bsc-physics",
    title: "BSc in Physics",
    institution: "University",
    period: "2020 — 2024",
    description:
      "Strong foundation in analytical thinking, mathematical modeling, and problem-solving that translates directly into software engineering.",
    type: "education",
  },
  {
    id: "cse-fundamentals",
    title: "CSE Fundamentals Course",
    institution: "Online Academy",
    period: "2023",
    description:
      "Comprehensive course covering data structures, algorithms, OOP, databases, and system design.",
    type: "course",
    certificateUrl: "/certificates/cse-fundamentals.pdf",
  },
  {
    id: "web-dev-bootcamp",
    title: "Web Development Bootcamp",
    institution: "Udemy",
    period: "2023 — 2024",
    description:
      "Intensive full-stack web development program covering React, Node.js, databases, deployment, and real-world project building.",
    type: "bootcamp",
    certificateUrl: "/certificates/web-dev-bootcamp.pdf",
  },
];

export const githubActivity: GitHubActivity = {
  repos: [
    {
      name: "react-component-lib",
      description: "A collection of reusable React components with TypeScript",
      stars: 128,
      forks: 34,
      language: "TypeScript",
      url: "https://github.com/asif/react-component-lib",
    },
    {
      name: "express-api-starter",
      description: "Production-ready Express.js API boilerplate with Prisma",
      stars: 89,
      forks: 21,
      language: "TypeScript",
      url: "https://github.com/asif/express-api-starter",
    },
    {
      name: "docker-dev-env",
      description: "Docker development environment for full-stack projects",
      stars: 56,
      forks: 12,
      language: "Dockerfile",
      url: "https://github.com/asif/docker-dev-env",
    },
    {
      name: "nextjs-blog",
      description: "Modern blog platform built with Next.js and MDX",
      stars: 73,
      forks: 18,
      language: "TypeScript",
      url: "https://github.com/asif/nextjs-blog",
    },
  ],
  contributions: 847,
  profileUrl: "https://github.com/asif",
};
