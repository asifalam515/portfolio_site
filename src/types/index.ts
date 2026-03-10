export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  architecture: string;
  githubClientUrl: string;
  githubServerUrl: string;
  liveUrl: string;
  image: string;
  screenshots: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tools";
}

export interface Experience {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  type: "education" | "course" | "bootcamp";
  certificateUrl?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export interface GitHubActivity {
  repos: GitHubRepo[];
  contributions: number;
  profileUrl: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
