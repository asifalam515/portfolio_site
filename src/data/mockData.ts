import { Experience, GitHubActivity, Project, Skill } from "@/types";

export const projects: Project[] = [
  {
    id: "eventra-platform",
    title: "Eventra -Event Management Platform",
    description:
      "Eventra is a secure event management platform where users can create, manage, and join public or private events with authentication.It includes payments, invitations, reviews, and admin controls for a complete SaaS experience.",
    longDescription:
      "Eventra  is a modern event discovery and event management frontend built with Next.js App Router. It provides public event browsing, event details, authentication flows, and role-based dashboard experiences for admin, moderator, and user roles. The platform allows users to explore upcoming events, view detailed information, and manage their event participation. Admins can create and manage events, while moderators can oversee user interactions and content.",
    features: [
      "JWT-based authentication and role management (Admin/User)",
      "Create, manage, and join public or private events",
      "Payment integration for paid event registration",
      "Invitation system with approval workflow",
      "Reviews and ratings for events",
      "Admin dashboard for event and user management",
    ],
    techStack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "WebSocket"],
    architecture:
      "Eventra follows a modular full-stack architecture with a Next.js frontend and an Express.js backend using Prisma ORM with PostgreSQL.It uses REST APIs, JWT-based authentication, and a layered structure (controller → service → database) for scalability and maintainability.",
    githubClientUrl: "https://github.com/asifalam515/eventra_client",
    githubServerUrl: "https://github.com/asifalam515/eventra_server",
    liveUrl: "https://eventra-client.vercel.app/",
    image: "/eventra/image.png",
    screenshots: [
      "/eventra/image.png",
      "/eventra/image-copy.png",
      "/eventra/image-copy-2.png",
    ],
  },
  {
    id: "mentora-platform",
    title: "Mentora – Online Tutor Marketplace",
    description:
      "A full-stack platform where students connect with expert tutors, book sessions, and leave reviews.",
    longDescription:
      "Mentora is a full-stack online tutoring marketplace designed to connect students with expert tutors across various subjects. The platform allows learners to discover qualified tutors, explore their profiles, check availability, and book tutoring sessions seamlessly",
    features: [
      "Modern landing page showcasing featured tutors",
      "Search tutors by subject, expertise, price, and rating",
      "Filter tutors by category",
      "View detailed tutor profiles",
      "Read student reviews and ratings",
      "Responsive UI for desktop and mobile",
    ],
    techStack: [
      "Next Js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Zod",
    ],
    architecture:
      " Frontend : React + TypeScript client that handles UI, user interaction, and communicates with APIs.Backend: Node.js + Express REST API managing authentication, business logic, and role-based access.Database: PostgreSQL managed via Prisma ORM to store users, tutors, bookings, reviews, and availability",
    githubClientUrl: "https://github.com/asifalam515/mentora_client",
    githubServerUrl: "https://github.com/asifalam515/Mentora_server",
    liveUrl: "https://skill-bridge-4216.vercel.app",
    image: "/mentora/image.png",
    screenshots: [
      "/mentora/image.png",
      "/mentora/image%20copy.png",
      "/mentora/image%20copy%202.png",
      "/mentora/image%20copy%203.png",
    ],
  },

  {
    id: "focus-hub",
    title: "Focus Hub - AI-Powered Productivity Platform",
    description:
      "FocusHub is a full-stack productivity app that combines GTD task management, habit tracking, reading progress, and Pomodoro-based focus into one smart dashboard.",
    longDescription:
      "FocusHub is a full-stack productivity and knowledge management platform inspired by GTD methodology. It allows users to capture tasks in an inbox, organize them into projects and next actions, and track progress through habits, goals, and reading. The app includes Pomodoro-based focus tracking, analytics dashboards, and progress insights to improve productivity. Built with React, Express, PostgreSQL, and Prisma, it delivers a modern, scalable solution for personal growth and time management",
    features: [
      "GTD Task Management System – Capture tasks in Inbox, organize into Next Actions, and track completion.",
      "Project & Context Organization – Group tasks by projects and filter using contexts like work, personal, or learning.",
      "Habit & Goal Tracking – Monitor daily habits, streaks, and progress toward long-term goals",
      "Reading & Knowledge Tracker – Track books, reading progress, notes, and summaries",
      "Pomodoro Focus Timer – Built-in timer to track deep work sessions and productivity",
      "Analytics Dashboard – Visual insights on tasks, habits, and productivity trends over time",
    ],
    techStack: ["React", "TypeScript", "OpenAI API", "Socket.io"],
    architecture:
      "Monolithic backend with modular service layer. Uses WebSockets for real-time collaboration and queues for async AI processing. Content stored in PostgreSQL with S3 for media.",
    githubClientUrl: "https://github.com/asifalam515/focus_flowHub_client",
    githubServerUrl: "https://github.com/asifalam515/ai-studio-server",
    liveUrl: "https://adjustable-table-builder.vercel.app/",
    image: "/focus-hub/image.png",
    screenshots: [
      "/focus-hub/image.png",
      "/focus-hub/image%20copy.png",
      "/focus-hub/image%20copy%202.png",
      "/focus-hub/image%20copy%203.png",
    ],
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
      url: "https://github.com/asifalam515/react-component-lib",
    },
    {
      name: "express-api-starter",
      description: "Production-ready Express.js API boilerplate with Prisma",
      stars: 89,
      forks: 21,
      language: "TypeScript",
      url: "https://github.com/asifalam515/express-api-starter",
    },
    {
      name: "docker-dev-env",
      description: "Docker development environment for full-stack projects",
      stars: 56,
      forks: 12,
      language: "Dockerfile",
      url: "https://github.com/asifalam515/docker-dev-env",
    },
    {
      name: "nextjs-blog",
      description: "Modern blog platform built with Next.js and MDX",
      stars: 73,
      forks: 18,
      language: "TypeScript",
      url: "https://github.com/asifalam515/nextjs-blog",
    },
  ],
  contributions: 847,
  profileUrl: "https://github.com/asifalam515",
};
