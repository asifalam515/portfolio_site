import { useGSAPScopedAnimation } from "@/hooks/use-gsap-scoped-animation";
import { api } from "@/services/api";
import type { Project } from "@/types";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Monitor, Server } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TILT = 8; // max degrees

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [TILT, -TILT]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-TILT, TILT]),
    springConfig,
  );
  const hoverY = useSpring(0, springConfig);
  const cardScale = useSpring(1, springConfig);
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  // Animation Added: pointer-driven 3D tilt/lift/glow card interaction.
  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
      hoverY.set(-8);
      cardScale.set(1.01);
    },
    [cardScale, hoverY, mouseX, mouseY],
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    hoverY.set(0);
    cardScale.set(1);
  }, [cardScale, hoverY, mouseX, mouseY]);

  return (
    <motion.div
      layout
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      data-project-card
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => navigate(`/project/${project.id}`)}
        whileTap={{ scale: 0.995 }}
        style={{
          rotateX,
          rotateY,
          y: hoverY,
          scale: cardScale,
          boxShadow:
            "0 24px 52px -28px hsl(var(--foreground) / 0.42), 0 0 52px -26px hsl(var(--primary) / 0.32)",
        }}
        className="glass-card relative overflow-hidden cursor-pointer group"
      >
        {/* Dynamic glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(500px circle at ${x}% ${y}%, hsl(var(--primary) / 0.12), transparent 50%)`,
            ),
          }}
        />

        {/* Gradient border glow */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            padding: "1px",
            background: "var(--gradient-primary)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Project Image */}
            <div className="lg:w-2/5 aspect-video rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/20 transition-colors">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
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
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
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
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  // Animation Added: scroll-triggered heading + grid stagger entrance.
  const setupProjectsAnimation = useCallback(
    ({ reducedMotion }: { reducedMotion: boolean }) => {
      if (projects.length === 0) return;

      if (reducedMotion) {
        gsap.set("[data-projects-heading], [data-project-card]", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.set("[data-projects-heading]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-project-card]", { autoAlpha: 0, y: 36, scale: 0.985 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      timeline
        .to("[data-projects-heading]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
        })
        .to(
          "[data-project-card]",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            stagger: 0.12,
          },
          "-=0.28",
        );
    },
    [projects.length],
  );

  useGSAPScopedAnimation({
    scopeRef: sectionRef,
    setup: setupProjectsAnimation,
    deps: [projects.length],
    enabled: projects.length > 0,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <section id="projects" className="section-padding" ref={sectionRef}>
      <div className="container-narrow">
        <motion.div
          initial={false}
          className="text-center mb-16"
          data-projects-heading
        >
          <p className="text-sm font-medium text-primary code-font mb-3">
            // projects
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <motion.div layout className="space-y-10">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
