import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Monitor, Server } from "lucide-react";
import { api } from "@/services/api";
import type { Project } from "@/types";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    if (id) {
      api.getProjectById(id).then((p) => {
        setProject(p || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button onClick={() => navigate("/")} className="btn-primary-gradient">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="nav-blur sticky top-0 z-50">
        <div className="container-narrow flex items-center h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      <div className="container-narrow section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary code-font">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={project.githubClientUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-glow flex items-center gap-2 text-sm">
                <Monitor size={16} /> Client Code
              </a>
              <a href={project.githubServerUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-glow flex items-center gap-2 text-sm">
                <Server size={16} /> Server Code
              </a>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary-gradient flex items-center gap-2 text-sm">
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>

          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 mb-16"
          >
            <div className="aspect-video rounded-lg bg-muted/30 flex items-center justify-center">
              <span className="text-muted-foreground code-font text-sm">Project Screenshot</span>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div key={i} className="glass-card p-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Architecture</h2>
            <div className="glass-card p-8">
              <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
            </div>
          </motion.div>

          {/* Screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {project.screenshots.map((_, i) => (
                <div key={i} className="glass-card p-3">
                  <div className="aspect-video rounded-lg bg-muted/30 flex items-center justify-center">
                    <span className="text-muted-foreground code-font text-xs">Screenshot {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
