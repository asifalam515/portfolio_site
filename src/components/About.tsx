import professionalPhoto from "@/assets/professional.jpg";
import { useGSAPScopedAnimation } from "@/hooks/use-gsap-scoped-animation";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { useCallback, useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation Added: orchestrated About timeline (heading, image reveal, bio, cards).
  const setupAboutAnimation = useCallback(
    ({ reducedMotion }: { reducedMotion: boolean }) => {
      if (reducedMotion) {
        gsap.set(
          "[data-about-heading], [data-about-photo-shell], [data-about-photo-img], [data-about-bio], [data-about-card]",
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            clipPath: "inset(0 0 0% 0 round 1rem)",
          },
        );
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.set("[data-about-heading]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-about-photo-shell]", {
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0 round 1rem)",
      });
      gsap.set("[data-about-photo-img]", { scale: 1.08, autoAlpha: 0.6 });
      gsap.set("[data-about-bio]", { autoAlpha: 0, x: 24 });
      gsap.set("[data-about-card]", { autoAlpha: 0, y: 24 });

      timeline
        .to("[data-about-heading]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
        })
        .to(
          "[data-about-photo-shell]",
          {
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0 round 1rem)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.32",
        )
        .to(
          "[data-about-photo-img]",
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.05,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          "[data-about-bio]",
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.72,
          },
          "-=0.62",
        )
        .to(
          "[data-about-card]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.58,
            stagger: 0.1,
          },
          "-=0.35",
        );
    },
    [],
  );

  useGSAPScopedAnimation({
    scopeRef: sectionRef,
    setup: setupAboutAnimation,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <section id="about" className="section-padding" ref={sectionRef}>
      <div className="container-narrow">
        <div className="text-center mb-16" data-about-heading>
          <p className="text-sm font-medium text-primary code-font mb-3">
            // about me
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Passionate about building{" "}
            <span className="gradient-text">great software</span>
          </h2>
        </div>

        {/* Photo + Bio Row */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mb-16">
          {/* Photo */}
          {/* Animation Added: clip-path image reveal target */}
          <div className="relative shrink-0 group" data-about-photo-shell>
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
                  data-about-photo-img
                />
              </div>
            </div>
            {/* Decorative dot accent */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary/80 border-4 border-background" />
          </div>

          {/* Bio text */}
          {/* Animation Added: horizontal reveal target */}
          <div className="text-center md:text-left" data-about-bio>
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
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 text-center group hover:scale-[1.02] transition-transform duration-300"
              data-about-card
            >
              {/* Animation Added: staggered card reveal target */}
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
