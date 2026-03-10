import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Rocket, BookOpen, Zap } from "lucide-react";

const milestones = [
  {
    year: "2021",
    title: "Started Learning Programming",
    description: "Began with Python and C, discovering the joy of problem-solving through code.",
    icon: BookOpen,
  },
  {
    year: "2022",
    title: "Completed Web Development Bootcamp",
    description: "Intensive program covering HTML, CSS, JavaScript, and modern frontend frameworks.",
    icon: Code,
  },
  {
    year: "2023",
    title: "Built MERN Stack Applications",
    description: "Developed multiple full-stack projects with MongoDB, Express, React, and Node.js.",
    icon: Rocket,
  },
  {
    year: "2024",
    title: "Building Full Stack SaaS Products",
    description: "Creating production-ready applications with TypeScript, Prisma, and modern DevOps practices.",
    icon: Zap,
  },
];

const DeveloperJourney = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// journey</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Developer <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From curiosity to building production applications.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Animated gradient line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-6 top-0 bottom-0 w-px origin-top animated-line"
          />

          <div className="space-y-16">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  className="relative pl-20"
                >
                  {/* Dot with glow */}
                  <div className="absolute left-0 top-1">
                    <div className="glow-dot" />
                  </div>

                  {/* Year badge */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.2, type: "spring" }}
                    className="inline-block text-xs code-font text-primary bg-primary/10 px-3 py-1 rounded-full mb-3"
                  >
                    {milestone.year}
                  </motion.span>

                  <div className="glass-card p-6 group hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
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

export default DeveloperJourney;
