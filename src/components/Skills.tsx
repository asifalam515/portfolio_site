import { api } from "@/services/api";
import type { Skill } from "@/types";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools",
};

const categoryBaseLevel: Record<string, number> = {
  frontend: 90,
  backend: 84,
  tools: 80,
};

const skillLevelOverrides: Record<string, number> = {
  React: 94,
  TypeScript: 92,
  "Tailwind CSS": 92,
  "Next.js": 89,
  "Node.js": 88,
  Express: 86,
  Prisma: 84,
  "MongoDB / PostgreSQL": 85,
  Git: 90,
  Docker: 80,
  Linux: 82,
  "REST APIs": 89,
};

const AnimatedCounter = ({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 900;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value]);

  return <span>{count}</span>;
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.getSkills().then(setSkills);
  }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const categoryCount = Object.keys(grouped).length;
  const averageLevel = useMemo(() => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, skill) => {
      const fallback = categoryBaseLevel[skill.category] ?? 80;
      return sum + (skillLevelOverrides[skill.name] ?? fallback);
    }, 0);
    return Math.round(total / skills.length);
  }, [skills]);

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">
            // skills
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-3 mb-10"
        >
          <div className="glass-card-static rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Skills</p>
            <p className="text-2xl font-bold gradient-text">
              <AnimatedCounter value={skills.length} inView={inView} />
            </p>
          </div>
          <div className="glass-card-static rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Categories</p>
            <p className="text-2xl font-bold gradient-text">
              <AnimatedCounter value={categoryCount} inView={inView} />
            </p>
          </div>
          <div className="glass-card-static rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Avg Proficiency
            </p>
            <p className="text-2xl font-bold gradient-text">
              <AnimatedCounter value={averageLevel} inView={inView} />%
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([cat, items], ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + ci * 0.15 }}
              className="glass-card p-8"
            >
              <h3 className="text-lg font-semibold mb-6 gradient-text">
                {categoryLabels[cat] || cat}
              </h3>
              <div className="space-y-4">
                {items.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + ci * 0.15 + si * 0.08,
                    }}
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-lg hover:bg-primary/5 transition-colors group cursor-default"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="text-xl inline-flex"
                          whileHover={{
                            rotate: [-6, 6, -2, 0],
                            scale: 1.18,
                            y: -1,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[11px] code-font text-muted-foreground">
                        {skillLevelOverrides[skill.name] ??
                          categoryBaseLevel[skill.category] ??
                          80}
                        %
                      </span>
                    </div>

                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0, opacity: 0.8 }}
                        animate={
                          inView
                            ? {
                                width: `${skillLevelOverrides[skill.name] ?? categoryBaseLevel[skill.category] ?? 80}%`,
                                opacity: 1,
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.75,
                          delay: 0.34 + ci * 0.15 + si * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
