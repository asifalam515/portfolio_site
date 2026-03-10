import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { api } from "@/services/api";
import type { Skill } from "@/types";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools",
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

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// skills</p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
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
                    transition={{ duration: 0.4, delay: 0.3 + ci * 0.15 + si * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group cursor-default"
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
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
