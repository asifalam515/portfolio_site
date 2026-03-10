import { projects, skills, experiences, githubActivity } from "@/data/mockData";
import type { Project, Skill, Experience, GitHubActivity, ContactForm } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getProjects(): Promise<Project[]> {
    await delay(300);
    return projects;
  },

  async getProjectById(id: string): Promise<Project | undefined> {
    await delay(200);
    return projects.find((p) => p.id === id);
  },

  async getSkills(): Promise<Skill[]> {
    await delay(200);
    return skills;
  },

  async getExperiences(): Promise<Experience[]> {
    await delay(200);
    return experiences;
  },

  async getGitHubActivity(): Promise<GitHubActivity> {
    await delay(300);
    return githubActivity;
  },

  async submitContact(data: ContactForm): Promise<{ success: boolean }> {
    await delay(500);
    console.log("Contact form submitted:", data);
    return { success: true };
  },
};
