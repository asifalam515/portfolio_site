import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, BookOpen, Code, Download } from "lucide-react";
import { api } from "@/services/api";
import type { Experience as ExperienceType } from "@/types";

const typeIcons = {
  education: GraduationCap,
  course: BookOpen,
  bootcamp: Code,
};

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [items, setItems] = useState<ExperienceType[]>([]);

  useEffect(() => {
    api.getExperiences().then(setItems);
  }, []);

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// journey</p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            Education & <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {items.map((item, i) => {
              const Icon = typeIcons[item.type] || BookOpen;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>

                  <div className="glass-card p-6">
                    <p className="text-xs text-primary code-font mb-1">{item.period}</p>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.institution}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    {item.certificateUrl && (
                      <a
                        href={item.certificateUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                      >
                        <Download size={14} />
                        Download Certificate
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
