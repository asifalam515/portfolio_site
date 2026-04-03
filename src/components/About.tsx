import professionalPhoto from "@/assets/professional.jpg";
import { motion, useInView } from "framer-motion";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { useRef } from "react";

const strengths = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, well-structured code that scales.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Optimizing every layer for speed and efficiency.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Turning complex challenges into elegant solutions.",
  },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">
            // about me
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Passionate about building{" "}
            <span className="gradient-text">great software</span>
          </h2>
        </motion.div>

        {/* Photo + Bio Row */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mb-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative shrink-0 group"
          >
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            {/* Border frame */}
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-primary/50 via-muted/20 to-secondary/50">
              <div className="rounded-2xl overflow-hidden bg-background">
                <img
                  src={professionalPhoto}
                  alt="Asibul — Full Stack Developer"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-cover object-top rounded-2xl"
                  loading="eager"
                />
              </div>
            </div>
            {/* Decorative dot accent */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary/80 border-4 border-background" />
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-center md:text-left"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              I'm a full-stack developer with a background in Physics, bringing
              analytical rigor to every line of code. I believe in building
              applications that are not just functional, but scalable,
              performant, and delightful to use.
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Available for work
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground/70">
                Based in Bangladesh
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card p-8 text-center group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
