import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Activity, Users, BookOpen } from "lucide-react";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  type GitHubProfile,
  type GitHubRepo,
} from "@/services/github";

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-400",
  HTML: "bg-orange-400",
  CSS: "bg-purple-400",
  Java: "bg-red-400",
  "C++": "bg-pink-400",
  C: "bg-slate-400",
  Shell: "bg-emerald-400",
  Dockerfile: "bg-cyan-400",
};

const GitHubSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchGitHubProfile(), fetchGitHubRepos()])
      .then(([p, r]) => {
        setProfile(p);
        setRepos(r);
      })
      .catch((err) => {
        console.error("GitHub fetch error:", err);
        setError("Failed to load GitHub data.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Deterministic contribution grid
  const contributions = Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const seed = (w * 7 + d) * 2654435761;
      return (seed >>> 0) % 5;
    })
  );
  const intensityClasses = [
    "bg-muted/30",
    "bg-primary/15",
    "bg-primary/30",
    "bg-primary/50",
    "bg-primary/80",
  ];

  return (
    <section id="github" className="section-padding" ref={ref}>
      <div className="container-narrow">
        {/* Header — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// open source</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I actively build projects and share my code on GitHub.
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Loaded content */}
        {!loading && !error && (
          <>
            {/* Profile card */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-6 sm:p-8 mb-10"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src={profile.avatar_url}
                    alt={profile.login}
                    className="w-20 h-20 rounded-full border-2 border-primary/30"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold">{profile.name || profile.login}</h3>
                    <p className="text-sm text-muted-foreground code-font mb-2">@{profile.login}</p>
                    {profile.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <p className="text-2xl font-bold gradient-text">{profile.public_repos}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen size={12} /> Repos
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold gradient-text">{profile.followers}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users size={12} /> Followers
                      </p>
                    </div>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-glow text-sm flex items-center gap-2 !px-5 !py-2"
                  >
                    <ExternalLink size={14} />
                    View Profile
                  </a>
                </div>
              </motion.div>
            )}

            {/* Contribution graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-card p-6 mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-primary" />
                <span className="text-sm font-medium">Contribution Graph</span>
                <span className="text-xs text-muted-foreground ml-auto code-font">placeholder</span>
              </div>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-[700px]">
                  {contributions.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((intensity, di) => (
                        <div
                          key={`${wi}-${di}`}
                          className={`w-[11px] h-[11px] rounded-sm ${intensityClasses[intensity]} hover:ring-1 hover:ring-primary/50 transition-all cursor-default`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-xs text-muted-foreground">Less</span>
                {intensityClasses.map((cls, i) => (
                  <div key={i} className={`w-[11px] h-[11px] rounded-sm ${cls}`} />
                ))}
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </motion.div>

            {/* Repository grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="glass-card gradient-border p-6 group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold code-font text-sm group-hover:text-primary transition-colors truncate pr-2">
                      {repo.name}
                    </h3>
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${langColors[repo.language] || "bg-primary"}`}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubSection;
