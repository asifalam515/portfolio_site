const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME ?? "asifalam515";
const API_BASE = "https://api.github.com";

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  name: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}`);
  if (!res.ok) throw new Error("Failed to fetch GitHub profile");
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const repos: GitHubRepo[] = await res.json();
  // Sort by stars desc, take top 6
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}
