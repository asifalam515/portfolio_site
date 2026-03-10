import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Monitor, Server, Database, HardDrive } from "lucide-react";

const layers = [
  {
    id: "frontend",
    icon: Monitor,
    title: "Frontend Layer",
    tech: "React + TypeScript",
    description: "Interactive user interfaces built with React and TypeScript. Component-driven architecture with state management, routing, and responsive design.",
    color: "primary",
  },
  {
    id: "api",
    icon: Server,
    title: "API Layer",
    tech: "Node.js + Express",
    description: "RESTful API endpoints handling business logic, authentication, validation, and middleware. Clean separation of concerns with controller-service patterns.",
    color: "secondary",
  },
  {
    id: "orm",
    icon: Database,
    title: "Data Layer",
    tech: "Prisma ORM",
    description: "Type-safe database access with Prisma. Schema-driven development with migrations, relations, and efficient query building.",
    color: "primary",
  },
  {
    id: "database",
    icon: HardDrive,
    title: "Database Layer",
    tech: "PostgreSQL",
    description: "Relational database with ACID compliance. Optimized queries, indexing strategies, and data integrity through constraints.",
    color: "secondary",
  },
];

const SystemArchitecture = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section id="architecture" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// architecture</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            System <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How I build full-stack applications — from pixels to database.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Interactive architecture stack */}
          <div className="relative space-y-4">
            {layers.map((layer, i) => {
              const isActive = activeLayer === layer.id;
              const Icon = layer.icon;

              return (
                <div key={layer.id}>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                    onMouseEnter={() => setActiveLayer(layer.id)}
                    onMouseLeave={() => setActiveLayer(null)}
                    className={`glass-card p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                      isActive ? "scale-[1.02]" : ""
                    }`}
                    style={{
                      boxShadow: isActive ? "var(--shadow-glow-lg)" : undefined,
                    }}
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isActive ? "bg-primary/20 scale-110" : "bg-primary/10"
                        }`}
                      >
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-lg">{layer.title}</h3>
                          <span className="text-xs code-font text-primary px-2 py-0.5 rounded-full bg-primary/10">
                            {layer.tech}
                          </span>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                            {layer.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connection line between layers */}
                  {i < layers.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                      className="flex justify-center py-1"
                    >
                      <div className="w-px h-8 animated-line rounded-full" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Data flow label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="text-center mt-8"
          >
            <span className="text-xs text-muted-foreground code-font">
              ↕ Request / Response Flow
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;
