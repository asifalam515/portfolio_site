import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Layers, Cpu, Workflow, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Code2,
    title: "Clean & Maintainable Code",
    description: "Every line should be intentional. I write code that reads like well-structured prose — clear naming, single responsibilities, and minimal complexity.",
    detail: "Follows SOLID principles, DRY patterns, and meaningful abstractions.",
  },
  {
    icon: Cpu,
    title: "Scalability & Performance",
    description: "I architect systems that handle growth gracefully. From database indexing to frontend bundle optimization, performance is built in — not bolted on.",
    detail: "Lazy loading, caching strategies, and efficient algorithms.",
  },
  {
    icon: Layers,
    title: "Reusable Components",
    description: "Building composable, well-tested components that serve as the foundation for rapid development and consistent user experiences.",
    detail: "Component libraries, design systems, and shared utilities.",
  },
  {
    icon: Workflow,
    title: "Clear & Simple APIs",
    description: "APIs should be intuitive and self-documenting. I design endpoints that make integration effortless and reduce cognitive overhead.",
    detail: "RESTful conventions, proper status codes, and typed contracts.",
  },
  {
    icon: Sparkles,
    title: "Continuous Improvement",
    description: "Technology evolves rapidly. I stay curious, experiment with new tools, and continuously refine my craft through deliberate practice.",
    detail: "Regular learning, code reviews, and open source contributions.",
  },
];

const EngineeringPhilosophy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="philosophy" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// philosophy</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            How I Think as an{" "}
            <span className="gradient-text">Engineer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide my approach to building software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`glass-card p-7 cursor-default transition-all duration-300 ${
                  i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                } ${isHovered ? "scale-[1.03]" : ""}`}
                style={{
                  boxShadow: isHovered ? "var(--shadow-glow-lg)" : undefined,
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    isHovered ? "bg-primary/20 scale-110" : "bg-primary/10"
                  }`}
                >
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {principle.description}
                </p>
                <motion.div
                  initial={false}
                  animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-primary/80 code-font pt-2 border-t border-border/50">
                    {principle.detail}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringPhilosophy;
