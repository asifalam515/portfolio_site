import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Github, Monitor, Server } from "lucide-react";
import { api } from "@/services/api";
import type { Project } from "@/types";

const TILT = 8; // max degrees

const ProjectCard = ({ project, index, inView }: { project: Project; index: number; inView: boolean }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [TILT, -TILT]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-TILT, TILT]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => navigate(`/project/${project.id}`)}
        style={{ rotateX, rotateY }}
        className="glass-card relative overflow-hidden cursor-pointer group"
      >
        {/* Dynamic glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(500px circle at ${x}% ${y}%, hsl(var(--primary) / 0.12), transparent 50%)`
            ),
          }}
        />

        {/* Gradient border glow */}
        <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            padding: "1px",
            background: "var(--gradient-primary)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image placeholder */}
            <div className="lg:w-2/5 aspect-video rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50 group-hover:border-primary/20 transition-colors">
              <div className="text-muted-foreground text-sm code-font">
                {project.title} Preview
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/5 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {project.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary code-font"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.githubClientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <Monitor size={14} />
                  Client Code
                </a>
                <a
                  href={project.githubServerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <Server size={14} />
                  Server Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium btn-primary-gradient !py-2 !px-4"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// projects</p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
